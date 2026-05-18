# Mini Banking System

This checkpoint explains how a small banking system can handle concurrent transfers safely and how its data can be distributed across branches.

## Part 1: Transaction Management

### 1. Concurrency Issue

When two users transfer money at the same time and both transfers involve the same account, the main concurrency issue is a **lost update**.

Example:

- Account A starts with a balance of 1000.
- Transaction 1 wants to transfer 200 from Account A.
- Transaction 2 wants to transfer 300 from Account A.
- Both transactions read the balance as 1000 before either transaction commits.

If Transaction 1 writes 800 and Transaction 2 later writes 700, the first update is lost. The correct final balance should be 500, but the database may store 700.

A **dirty read** could also happen if one transaction reads a balance that another transaction has changed but not committed yet. If the first transaction rolls back, the second transaction has used invalid data.

### 2. Locking Mechanism

Use a simple locking strategy:

- Use a **shared lock** when a user only views a balance.
- Use an **exclusive lock** when a transaction updates an account balance.

For a money transfer, the system should place an exclusive lock on the accounts involved before changing their balances.

Simple rule:

```text
A transaction must hold an exclusive lock before it updates an account balance.
```

This prevents two transactions from updating the same account at the same time.

### 3. Locking Type

Use **pessimistic locking**.

Pessimistic locking assumes that conflicts may happen, so it locks the data before the update starts. This is a good choice for banking because account balances must always be correct. It is better for one transaction to wait than to allow two transfers to overwrite each other.

Optimistic locking can be useful in systems where conflicts are rare, but banking transfers need stronger protection because they involve money and immediate consistency.

### 4. Transaction Schedule

Unsafe schedule without locking:

| Step | Transaction 1 | Transaction 2 | Safe? |
| --- | --- | --- | --- |
| 1 | Read Account A balance = 1000 |  | No |
| 2 |  | Read Account A balance = 1000 | No |
| 3 | Subtract 200 |  | No |
| 4 |  | Subtract 300 | No |
| 5 | Write Account A balance = 800 |  | No |
| 6 |  | Write Account A balance = 700 | No |

This schedule is **not safe** because Transaction 2 overwrites Transaction 1's update. The final balance becomes 700 instead of 500.

Safe schedule with exclusive locking:

| Step | Transaction 1 | Transaction 2 | Safe? |
| --- | --- | --- | --- |
| 1 | Lock Account A with exclusive lock | Wait | Yes |
| 2 | Read Account A balance = 1000 | Wait | Yes |
| 3 | Subtract 200 | Wait | Yes |
| 4 | Write Account A balance = 800 | Wait | Yes |
| 5 | Commit and unlock Account A | Wait | Yes |
| 6 |  | Lock Account A with exclusive lock | Yes |
| 7 |  | Read Account A balance = 800 | Yes |
| 8 |  | Subtract 300 | Yes |
| 9 |  | Write Account A balance = 500 | Yes |
| 10 |  | Commit and unlock Account A | Yes |

This schedule is **safe** because Transaction 2 waits until Transaction 1 finishes. Waiting does not make the schedule unsafe. It protects the account from lost updates.

## Part 2: Distributed Database Planning

The bank has three branches:

- Tunis
- Sousse
- Sfax

### 1. Horizontal Fragmentation

The `Customers` table can be split by branch.

```text
Customers_Tunis  = customers where branch = 'Tunis'
Customers_Sousse = customers where branch = 'Sousse'
Customers_Sfax   = customers where branch = 'Sfax'
```

This is horizontal fragmentation because each fragment has the same columns but different rows.

Benefit:

- Tunis branch mostly works with Tunis customers.
- Sousse branch mostly works with Sousse customers.
- Sfax branch mostly works with Sfax customers.

This improves local access speed and reduces pressure on one central database.

### 2. Vertical Fragmentation

One useful vertical separation is moving login/contact data into another table.

Main customer table:

```text
Customers(customer_id, name, branch, phone, address)
```

Separated table:

```text
Customer_Login(customer_id, email, password_hash)
```

This is vertical fragmentation because the customer columns are split into two tables.

Reason:

- General customer profile data is used by branch staff.
- Login data is more sensitive and can be protected separately.
- Email or login changes can be managed without changing the main customer record.

### 3. Data Replication

Replicate important data across all branches:

| Data | Replicate? | Reason |
| --- | --- | --- |
| Basic customer info | Yes | Any branch may need to identify and serve a customer. |
| Account balances | Yes, with strict consistency | Branches need accurate balances for transfers and withdrawals. |
| Transaction history | Partially | Recent history is useful everywhere, but full history can become too large. |

Customer information and account balances should be available across all branches because customers may visit any branch. Account balances must be synchronized carefully because wrong balances can cause serious banking errors.

Full transaction history should not always be replicated everywhere because it grows quickly. It is better to replicate recent or important transaction records and keep older history in a central archive.

### 4. Transaction History Allocation

Use **dynamic allocation** for transaction history.

Reason:

- Transaction history grows every day.
- Some branches may generate more transactions than others.
- Recent records may need fast access.
- Older records can be moved to central or archive storage.

Dynamic allocation is better than static allocation because the system can adapt as transaction volume changes.

## Final Recommendation

For the mini banking system:

- Use exclusive locks for balance updates.
- Use shared locks for balance views.
- Use pessimistic locking for transfers.
- Fragment customers horizontally by branch.
- Separate sensitive login data vertically.
- Replicate customer identity data and account balances.
- Use dynamic allocation for transaction history.

This design protects account balances, improves branch performance, and keeps distributed data easier to manage.
