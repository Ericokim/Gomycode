const mongoose = require("mongoose");

async function connectMongo() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log("MONGO_URI is not set. MongoDB routes need it to connect.");
    return;
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

module.exports = connectMongo;
