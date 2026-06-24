import { withDb } from "./db.js";
import { collections } from "./collections.js";

const indexSpecs = {
  [collections.users]: [
    { key: { email: 1 }, unique: true, name: "unique_user_email" },
    { key: { phone: 1 }, name: "user_phone_lookup" }
  ],
  [collections.products]: [
    { key: { name: "text", description: "text", tags: "text" }, name: "product_text_search" },
    { key: { categoryId: 1, status: 1, price: 1 }, name: "product_category_status_price" },
    { key: { brand: 1, status: 1 }, name: "product_brand_status" }
  ],
  [collections.orders]: [
    { key: { userId: 1, createdAt: -1 }, name: "orders_by_customer_recent" },
    { key: { orderStatus: 1 }, name: "orders_by_status" },
    { key: { "delivery.status": 1, updatedAt: -1 }, name: "orders_by_delivery_status" },
    { key: { createdAt: -1 }, name: "recent_orders" }
  ],
  [collections.orderEvents]: [
    { key: { orderId: 1, createdAt: 1 }, name: "events_by_order" },
    { key: { eventType: 1 }, name: "events_by_type" },
    { key: { createdAt: -1 }, name: "recent_events" }
  ],
  [collections.customerOrders]: [
    { key: { userId: 1, createdAt: -1 }, name: "customer_order_history" }
  ],
  [collections.dailyProductSales]: [
    { key: { date: 1 }, name: "daily_product_sales_by_date" },
    { key: { productId: 1, date: -1 }, name: "daily_product_sales_by_product" },
    { key: { categoryId: 1, date: -1 }, name: "daily_product_sales_by_category" }
  ],
  [collections.dailyCategorySales]: [
    { key: { date: 1 }, name: "daily_category_sales_by_date" },
    { key: { categoryId: 1, date: -1 }, name: "daily_category_sales_by_category" }
  ],
  [collections.productTrends]: [
    { key: { week: 1, trendScore: -1 }, name: "weekly_product_trends" },
    { key: { productId: 1 }, name: "trend_by_product" }
  ]
};

await withDb(async (db) => {
  for (const [name, indexes] of Object.entries(indexSpecs)) {
    await db.collection(name).createIndexes(indexes);
  }

  console.log("Created indexes for operational and analytics collections.");
});
