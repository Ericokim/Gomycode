import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "ecommerce_nosql_design";

export async function withDb(work) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    return await work(client.db(dbName));
  } finally {
    await client.close();
  }
}

export async function clearCollections(db, names) {
  await Promise.all(names.map((name) => db.collection(name).deleteMany({})));
}

export async function replaceCollection(db, name, records) {
  await db.collection(name).deleteMany({});

  if (records.length) {
    await db.collection(name).insertMany(records);
  }
}

export function toDates(records, fields = ["createdAt", "updatedAt"]) {
  return records.map((record) => {
    const copy = { ...record };

    for (const field of fields) {
      if (copy[field]) {
        copy[field] = new Date(copy[field]);
      }
    }

    return copy;
  });
}
