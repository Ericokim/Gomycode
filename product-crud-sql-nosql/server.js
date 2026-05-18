require("dotenv").config();

const app = require("./app");
const connectMongo = require("./config/mongo");

const PORT = process.env.PORT || 3000;

connectMongo().catch((error) => {
  console.log(`MongoDB connection failed: ${error.message}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
