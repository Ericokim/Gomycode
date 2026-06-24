import { replaceCollection, withDb } from "./db.js";
import { collections } from "./collections.js";

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function toWeekKey(date) {
  const firstDay = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const dayOffset = Math.floor((date - firstDay) / 86400000);
  const week = String(Math.ceil((dayOffset + firstDay.getUTCDay() + 1) / 7)).padStart(2, "0");
  return `${date.getUTCFullYear()}-W${week}`;
}

await withDb(async (db) => {
  const orders = await db.collection(collections.orders).find({ payment: { $exists: true } }).toArray();
  const productSales = new Map();
  const categorySales = new Map();
  const trends = new Map();

  for (const order of orders) {
    const date = toDateKey(order.createdAt);
    const week = toWeekKey(order.createdAt);

    for (const item of order.items) {
      const productKey = `${date}_${item.productId}`;
      const categoryKey = `${date}_${item.categoryId}`;
      const trendKey = `${item.productId}_${week}`;

      const productMetric = productSales.get(productKey) || {
        _id: productKey,
        date,
        productId: item.productId,
        productName: item.name,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        unitsSold: 0,
        totalRevenue: 0,
        orderCount: 0
      };
      productMetric.unitsSold += item.quantity;
      productMetric.totalRevenue += item.totalPrice;
      productMetric.orderCount += 1;
      productSales.set(productKey, productMetric);

      const categoryMetric = categorySales.get(categoryKey) || {
        _id: categoryKey,
        date,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        unitsSold: 0,
        totalRevenue: 0,
        orderCount: 0
      };
      categoryMetric.unitsSold += item.quantity;
      categoryMetric.totalRevenue += item.totalPrice;
      categoryMetric.orderCount += 1;
      categorySales.set(categoryKey, categoryMetric);

      const trendMetric = trends.get(trendKey) || {
        _id: trendKey,
        productId: item.productId,
        productName: item.name,
        week,
        views: item.quantity * 120,
        cartAdds: item.quantity * 18,
        unitsSold: 0,
        revenue: 0,
        trendScore: 0
      };
      trendMetric.unitsSold += item.quantity;
      trendMetric.revenue += item.totalPrice;
      trendMetric.trendScore = Number((trendMetric.unitsSold * 10 + trendMetric.cartAdds * 0.5).toFixed(2));
      trends.set(trendKey, trendMetric);
    }
  }

  await Promise.all([
    replaceCollection(db, collections.dailyProductSales, [...productSales.values()]),
    replaceCollection(db, collections.dailyCategorySales, [...categorySales.values()]),
    replaceCollection(db, collections.productTrends, [...trends.values()])
  ]);

  console.log("Generated pre-aggregated analytics collections.");
  console.table([...productSales.values()]);
  console.table([...categorySales.values()]);
  console.table([...trends.values()]);
});
