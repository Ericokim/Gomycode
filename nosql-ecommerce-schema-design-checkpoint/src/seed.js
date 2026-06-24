import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { clearCollections, withDb, toDates } from "./db.js";
import { analyticsCollections, collections, operationalCollections } from "./collections.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(dirname, "../sample-data");

async function readJson(fileName) {
  const file = await fs.readFile(path.join(dataDir, fileName), "utf8");
  return JSON.parse(file);
}

await withDb(async (db) => {
  const users = toDates(await readJson("users.json"), ["createdAt"]);
  const products = toDates(await readJson("products.json"));
  const orders = toDates(await readJson("orders.json"));

  await clearCollections(db, [...operationalCollections, ...analyticsCollections]);

  await db.collection(collections.users).insertMany(users);
  await db.collection(collections.products).insertMany(products);
  await db.collection(collections.orders).insertMany(orders);

  const orderEvents = orders.map((order) => ({
    _id: `event_${order._id}`,
    orderId: order._id,
    userId: order.userId,
    eventType: "ORDER_CREATED",
    payload: {
      totalAmount: order.totalAmount,
      items: order.items
    },
    createdAt: order.createdAt
  }));

  const customerOrders = orders.map((order) => ({
    _id: `${order.userId}_${order._id}`,
    userId: order.userId,
    orderId: order._id,
    orderStatus: order.orderStatus,
    deliveryStatus: order.delivery.status,
    totalAmount: order.totalAmount,
    createdAt: order.createdAt
  }));

  await db.collection(collections.orderEvents).insertMany(orderEvents);
  await db.collection(collections.customerOrders).insertMany(customerOrders);

  console.log("Seeded users, products, orders, order events, and customer order view.");
});
