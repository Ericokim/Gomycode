# Initial NoSQL Schema Design

## 1. Requirements

The initial database must support:

- Product browsing and full-text search.
- Order storage with customer information, purchased items, payment details, and delivery status.
- Thousands of transactions per second.
- Efficient indexes based on query patterns.
- A reasonable balance between scalability and consistency.

## 2. Chosen Design

The main database model is **document-based** because products and orders naturally fit as JSON-like documents. The design also uses:

- **Search index** for product search.
- **Key-value store** for carts and sessions.
- **Atomic reservation records** for inventory consistency.

## 3. Key Entities

| Entity | Purpose |
| --- | --- |
| `users` | Customer profile and default address |
| `products` | Product catalog, pricing, search fields, inventory summary |
| `orders` | Customer order snapshot, purchased items, payment, delivery status |
| `inventory_reservations` | Temporary inventory locks during checkout |
| `carts` | Fast temporary shopping cart state |

## 4. Users Collection

```json
{
  "_id": "user_1001",
  "name": "Amina Yusuf",
  "email": "amina@example.com",
  "phone": "+254700000000",
  "defaultAddress": {
    "line1": "Westlands",
    "city": "Nairobi",
    "country": "KE"
  },
  "createdAt": "2026-06-24T09:00:00Z",
  "updatedAt": "2026-06-24T09:00:00Z"
}
```

Indexes:

```text
unique: email
index: phone
```

## 5. Products Collection

```json
{
  "_id": "prod_2001",
  "sku": "LAP-14-PRO",
  "name": "14 inch Pro Laptop",
  "description": "Lightweight laptop for software development and design work.",
  "categoryId": "cat_laptops",
  "categoryName": "Laptops",
  "brand": "TechPro",
  "tags": ["laptop", "developer", "portable"],
  "price": 1200,
  "currency": "USD",
  "status": "active",
  "inventory": {
    "available": 48,
    "reserved": 2,
    "warehouseId": "wh_nairobi_01"
  },
  "rating": {
    "average": 4.6,
    "count": 183
  },
  "createdAt": "2026-06-24T09:00:00Z",
  "updatedAt": "2026-06-24T09:00:00Z"
}
```

Indexes:

```text
unique: sku
compound: categoryId, status, price
compound: brand, status
full-text: name, description, tags, categoryName, brand
```

Why this works:

- Product browsing is fast because category and brand filters are indexed.
- Product search is fast because text-heavy fields are stored in a search index.
- Product reads can be eventually consistent because small catalog delays are acceptable.

## 6. Orders Collection

Orders embed customer and item snapshots. This preserves historical accuracy even if user addresses or product prices change later.

```json
{
  "_id": "order_3001",
  "orderNumber": "ORD-20260624-000001",
  "customer": {
    "userId": "user_1001",
    "name": "Amina Yusuf",
    "email": "amina@example.com",
    "phone": "+254700000000"
  },
  "items": [
    {
      "productId": "prod_2001",
      "sku": "LAP-14-PRO",
      "name": "14 inch Pro Laptop",
      "quantity": 1,
      "unitPrice": 1200,
      "lineTotal": 1200
    }
  ],
  "totals": {
    "subtotal": 1200,
    "deliveryFee": 15,
    "tax": 0,
    "grandTotal": 1215,
    "currency": "USD"
  },
  "payment": {
    "status": "paid",
    "provider": "card",
    "transactionId": "txn_9001"
  },
  "delivery": {
    "status": "processing",
    "address": {
      "line1": "Westlands",
      "city": "Nairobi",
      "country": "KE"
    },
    "trackingNumber": null
  },
  "statusHistory": [
    {
      "status": "created",
      "at": "2026-06-24T09:15:00Z"
    },
    {
      "status": "paid",
      "at": "2026-06-24T09:16:00Z"
    }
  ],
  "createdAt": "2026-06-24T09:15:00Z",
  "updatedAt": "2026-06-24T09:16:00Z"
}
```

Indexes:

```text
unique: orderNumber
compound: customer.userId, createdAt desc
compound: delivery.status, updatedAt
compound: payment.status, createdAt
```

Consistency strategy:

1. Reserve inventory atomically.
2. Create order document.
3. Confirm payment.
4. Update delivery status.
5. Release reservation if payment fails.

Order data needs stronger consistency than product data because customers must see correct payment and delivery states.

## 7. Inventory Reservations Collection

```json
{
  "_id": "reservation_4001",
  "productId": "prod_2001",
  "orderId": "order_3001",
  "quantity": 1,
  "status": "confirmed",
  "expiresAt": "2026-06-24T09:30:00Z",
  "createdAt": "2026-06-24T09:15:00Z"
}
```

Indexes:

```text
compound: productId, status
ttl: expiresAt
```

## 8. Carts as Key-Value Data

```json
{
  "key": "cart:user_1001",
  "ttlSeconds": 604800,
  "value": {
    "items": [
      {
        "productId": "prod_2001",
        "quantity": 1
      }
    ],
    "updatedAt": "2026-06-24T09:10:00Z"
  }
}
```

Key-value storage works well here because carts are frequently updated, temporary, and usually retrieved by one user id.

## 9. Initial Scalability Decisions

| Decision | Benefit | Trade-off |
| --- | --- | --- |
| Embed item snapshots in orders | Fast order reads and historical accuracy | Duplicates product data |
| Use search index for products | Fast full-text search | Search results may lag slightly |
| Use Redis-style carts | Very fast cart access | Cart data is less queryable |
| Use only necessary order indexes | Faster writes | Fewer ad hoc order queries |
