import { withDb } from "./db.js";
import { collections } from "./collections.js";

await withDb(async (db) => {
  const products = db.collection(collections.products);
  const orders = db.collection(collections.orders);

  const searchResults = await products
    .find(
      { $text: { $search: "wireless mouse" }, status: "ACTIVE" },
      { projection: { score: { $meta: "textScore" }, name: 1, price: 1, brand: 1 } }
    )
    .sort({ score: { $meta: "textScore" } })
    .toArray();

  const categoryResults = await products
    .find({ categoryId: "cat_001", status: "ACTIVE" })
    .sort({ price: 1 })
    .toArray();

  const customerOrders = await orders
    .find({ userId: "user_001" })
    .sort({ createdAt: -1 })
    .project({ customer: 1, items: 1, totalAmount: 1, orderStatus: 1, delivery: 1 })
    .toArray();

  await orders.updateOne(
    { _id: "order_001" },
    {
      $set: {
        "delivery.status": "SHIPPED",
        updatedAt: new Date()
      }
    }
  );

  const shippedOrders = await orders
    .find({ "delivery.status": "SHIPPED" })
    .project({ _id: 1, userId: 1, "delivery.status": 1, totalAmount: 1 })
    .toArray();

  console.log("Product search results:");
  console.table(searchResults);
  console.log("Category browse results:");
  console.table(categoryResults.map(({ _id, name, price, brand }) => ({ _id, name, price, brand })));
  console.log("Customer order history:");
  console.dir(customerOrders, { depth: null });
  console.log("Orders with SHIPPED delivery status:");
  console.table(shippedOrders);
});
