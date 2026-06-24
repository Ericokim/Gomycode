# Initial NoSQL Schema Design

## Requirements

- Users can browse and search products.
- Orders store customer details, purchased items, payment state, and delivery status.
- The system must handle high write volume during checkout.
- Indexes should match common query patterns.

## Selected Model

The core design uses a **document database** such as MongoDB. Products, users, and orders are stored as JSON-like documents. Carts are treated as key-value data, and product search uses a text/search index.

## Collections

| Collection | Purpose | Source Example |
| --- | --- | --- |
| `users` | Customer profile and addresses | `sample-data/users.json` |
| `products` | Catalog, search fields, category, price, stock | `sample-data/products.json` |
| `orders` | Customer, items, payment, delivery, order status | `sample-data/orders.json` |
| `order_events` | Append-only order activity for audit and analytics | generated in `src/seed.js` |
| `customer_orders` | Denormalized customer order history view | generated in `src/seed.js` |

## Relationships

- Orders reference `userId` but embed a customer snapshot so old orders remain accurate if the user profile changes.
- Orders embed item snapshots so historical prices and product names remain accurate.
- Product documents keep category data close to the product for fast browsing.
- `customer_orders` duplicates key order fields for quick customer order history reads.

## Indexes

The runnable index definitions live in [src/createIndexes.js](../src/createIndexes.js).

| Query Pattern | Collection | Index |
| --- | --- | --- |
| Find user by email | `users` | unique `email` |
| Search products | `products` | text index on `name`, `description`, `tags` |
| Browse active products by category and price | `products` | `categoryId`, `status`, `price` |
| Filter products by brand | `products` | `brand`, `status` |
| View customer order history | `orders` | `userId`, `createdAt` |
| Track delivery status | `orders` | `delivery.status`, `updatedAt` |
| Read customer order summary | `customer_orders` | `userId`, `createdAt` |

## Consistency and Scalability

- Product browsing can use eventual consistency because small catalog delays are acceptable.
- Order creation needs stronger consistency because payment, stock, and delivery status must be correct.
- Order documents are write-optimized by keeping only necessary indexes.
- Customer and item snapshots avoid joins during order reads.
- Carts are best stored as key-value records with TTL because they are temporary and frequently updated.

## Initial Trade-Offs

| Decision | Benefit | Trade-off |
| --- | --- | --- |
| Embed item snapshots in orders | Fast reads and historical accuracy | Product data is duplicated |
| Use text indexes for search | Fast product discovery | Search index may lag briefly |
| Denormalize customer order view | Fast order history | Extra write/update path |
| Keep order indexes focused | Better write throughput | Less flexible ad hoc querying |
