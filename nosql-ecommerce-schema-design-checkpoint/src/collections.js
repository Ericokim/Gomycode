export const collections = {
  users: "users",
  products: "products",
  orders: "orders",
  orderEvents: "order_events",
  customerOrders: "customer_orders",
  dailyProductSales: "daily_product_sales",
  dailyCategorySales: "daily_category_sales",
  productTrends: "product_trends"
};

export const operationalCollections = [
  collections.users,
  collections.products,
  collections.orders,
  collections.orderEvents,
  collections.customerOrders
];

export const analyticsCollections = [
  collections.dailyProductSales,
  collections.dailyCategorySales,
  collections.productTrends
];
