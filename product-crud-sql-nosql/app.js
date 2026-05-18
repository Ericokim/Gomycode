const express = require("express");
const noSQLController = require("./controllers/NoSQLcontroller");
const sqlController = require("./controllers/SQLcontroller");
const createProductRouter = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Product CRUD SQL and NoSQL API",
    noSQLRoutes: "/nosql/products",
    sqlRoutes: "/sql/products"
  });
});

app.use("/nosql/products", createProductRouter(noSQLController));
app.use("/sql/products", createProductRouter(sqlController));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something went wrong",
    error: err.message
  });
});

module.exports = app;
