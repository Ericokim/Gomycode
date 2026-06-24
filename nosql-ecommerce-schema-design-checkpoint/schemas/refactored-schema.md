# Refactored NoSQL Schema Design

## New Requirements

- Run analytical queries for product trends and sales.
- Guarantee high availability and partition tolerance.
- Scale reads and writes as traffic grows.
- Use sharding, replication, and denormalization where useful.

## Refactored Strategy

The refactor keeps operational data separate from analytical data.

| Workload | Store / Collection | Strategy |
| --- | --- | --- |
| Product browsing | `products` | read replicas, category/text indexes |
| Checkout | `orders` | sharded writes, majority write concern |
| Order activity | `order_events` | append-only event records |
| Customer history | `customer_orders` | denormalized read model |
| Product analytics | `daily_product_sales` | pre-aggregated sales by product |
| Category analytics | `daily_category_sales` | pre-aggregated sales by category |
| Trend reporting | `product_trends` | weekly pre-computed trend scores |

## Sharding

| Data | Shard Key | Reason |
| --- | --- | --- |
| `products` | `categoryId + hashed(_id)` | keeps category browsing useful while spreading large categories |
| `orders` | `hashed(_id)` or hashed order number | distributes high-volume checkout writes |
| analytics events | `event_date` partition | supports daily trend scans and high write volume |

Customer order history is still handled through the `userId + createdAt` index and `customer_orders` read model.

## Replication

| Data | Consistency Choice | Reason |
| --- | --- | --- |
| Products | eventual consistency | product browsing tolerates slight lag |
| Search index | eventual consistency | search can lag behind writes briefly |
| Orders | stronger consistency / majority writes | payment and delivery state must be reliable |
| Inventory reservations | strong consistency / atomic writes | prevents overselling |
| Analytics | eventual consistency | reports can lag without affecting checkout |

## Denormalized Analytics

The analytics script [src/analyticsAggregation.js](../src/analyticsAggregation.js) builds these collections from `orders`:

| Collection | Query Supported |
| --- | --- |
| `daily_product_sales` | units sold and revenue by product per day |
| `daily_category_sales` | units sold and revenue by category per day |
| `product_trends` | weekly views, cart adds, sales, revenue, and trend score |

This prevents dashboards from scanning the raw `orders` collection.

## Refactored Write Flow

1. Customer checks out.
2. API creates an order document.
3. API writes an order event.
4. Customer history view is updated.
5. Background analytics job updates pre-aggregated reporting collections.
6. Product search and dashboard views update asynchronously.

## Trade-Offs

| Refactor | Improvement | Trade-off |
| --- | --- | --- |
| Sharding | higher throughput and partition tolerance | cross-shard queries are harder |
| Replication | better availability | replicas can briefly lag |
| Denormalization | faster reads and analytics | duplicated data must be maintained |
| Event-driven analytics | checkout stays fast | reports become eventually consistent |

## Result

The refactored design improves scalability by distributing operational writes, improves availability through replication, and improves query performance by separating transactional and analytical workloads.
