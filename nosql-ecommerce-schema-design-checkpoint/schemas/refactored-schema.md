# Refactored NoSQL Schema Design

## 1. New Requirements

The company now needs:

- Large-scale analytical queries for product trends and sales data.
- High availability and partition tolerance.
- Better write scaling as user traffic grows.
- A schema that uses sharding, replication, and denormalization.

## 2. Refactored Strategy

The refactor separates operational workloads from analytical workloads.

| Workload | Store | Purpose |
| --- | --- | --- |
| Product browsing | Document database + search index | Fast customer-facing reads |
| Checkout and orders | Sharded document database | High-throughput transactional writes |
| Carts and cache | Key-value store | Low-latency temporary state |
| Analytics events | Wide-column database | High-volume append-only events |
| Reports | Denormalized summary collections | Fast trend and sales queries |

## 3. Sharding

### Products

```text
collection: products
shard key: categoryId + hashed(_id)
```

Reason:

- Category browsing remains efficient.
- Large categories are still distributed across shards.

### Orders

```text
collection: orders
shard key: hashed(orderNumber)
```

Reason:

- Checkout writes are distributed evenly.
- Hot customers or popular regions do not overload one shard.

Secondary index for customer history:

```text
compound: customer.userId, createdAt desc
```

### Analytics Events

```text
table: order_events_by_day
partition key: eventDate
clustering keys: eventTime, orderId
```

Reason:

- Event data is append-heavy.
- Daily partitions support trend analysis.
- Wide-column storage handles high write volume.

## 4. Replication

| Data | Replication Strategy | Consistency Choice |
| --- | --- | --- |
| Products | Multi-region read replicas | Eventual consistency |
| Orders | Replica set with majority writes | Stronger consistency |
| Inventory reservations | Majority writes / atomic updates | Strong consistency |
| Carts | Redis replication with TTL | Eventual recovery |
| Analytics events | Multi-node replication | Eventual consistency |

This design prioritizes strict consistency only where it matters most: orders, payments, delivery status, and inventory reservations.

## 5. Denormalized Analytics Collections

### Daily Sales by Product

```json
{
  "_id": "2026-06-24:prod_2001",
  "date": "2026-06-24",
  "productId": "prod_2001",
  "sku": "LAP-14-PRO",
  "productName": "14 inch Pro Laptop",
  "categoryId": "cat_laptops",
  "categoryName": "Laptops",
  "unitsSold": 246,
  "grossRevenue": 295200,
  "orderCount": 238,
  "refundCount": 3,
  "updatedAt": "2026-06-24T23:59:00Z"
}
```

Indexes:

```text
compound: date, grossRevenue desc
compound: categoryId, date
compound: productId, date
```

### Daily Sales by Category

```json
{
  "_id": "2026-06-24:cat_laptops",
  "date": "2026-06-24",
  "categoryId": "cat_laptops",
  "categoryName": "Laptops",
  "unitsSold": 1250,
  "grossRevenue": 1489000,
  "orderCount": 1108,
  "topProducts": [
    {
      "productId": "prod_2001",
      "name": "14 inch Pro Laptop",
      "unitsSold": 246,
      "grossRevenue": 295200
    }
  ],
  "updatedAt": "2026-06-24T23:59:00Z"
}
```

Indexes:

```text
compound: date, grossRevenue desc
compound: categoryId, date
```

### Customer Order Summary

```json
{
  "_id": "user_1001",
  "customerId": "user_1001",
  "totalOrders": 14,
  "lifetimeValue": 3840,
  "lastOrderAt": "2026-06-24T09:15:00Z",
  "favoriteCategories": [
    {
      "categoryId": "cat_laptops",
      "orderCount": 5
    }
  ],
  "updatedAt": "2026-06-24T09:20:00Z"
}
```

## 6. Wide-Column Event Table

```text
table: order_events_by_day

partition key:
- event_date

clustering columns:
- event_time
- order_id

columns:
- customer_id
- event_type
- product_ids
- category_ids
- order_total
- payment_status
- delivery_status
```

Example row:

```json
{
  "event_date": "2026-06-24",
  "event_time": "2026-06-24T09:16:00Z",
  "order_id": "order_3001",
  "customer_id": "user_1001",
  "event_type": "order_paid",
  "product_ids": ["prod_2001"],
  "category_ids": ["cat_laptops"],
  "order_total": 1215,
  "payment_status": "paid",
  "delivery_status": "processing"
}
```

## 7. Refactored Write Flow

1. Customer checks out.
2. API reserves inventory with an atomic write.
3. API creates the order with majority write concern.
4. API publishes `order_created` and `order_paid` events.
5. Event consumers write to the analytics event table.
6. Aggregation workers update daily product and category summaries.
7. Search and reporting views update asynchronously.

## 8. Trade-Offs

| Refactor | Improvement | Trade-off |
| --- | --- | --- |
| Sharding | More write throughput and partition tolerance | Cross-shard queries are harder |
| Replication | Higher availability and fault tolerance | Replication lag can happen |
| Denormalization | Faster analytics queries | Duplicate data must be maintained |
| Event-driven analytics | Checkout stays fast | Reports become eventually consistent |
| Wide-column events | Handles high-velocity data | Adds another database model |

## 9. Result

The refactored design improves scalability by distributing products, orders, and analytics events across nodes. It improves availability through replication. It improves query performance by using separate schemas for operational queries and analytical queries.
