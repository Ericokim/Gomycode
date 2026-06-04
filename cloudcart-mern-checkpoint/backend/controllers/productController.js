const Product = require("../models/Product");
const starterProducts = require("../data/products");
const { isMemoryMode } = require("../config/appState");

const memoryProducts = starterProducts.map((product) => ({
  ...product,
  _id: product.name.toLowerCase().replaceAll(" ", "-")
}));

async function getProducts(req, res) {
  if (isMemoryMode()) {
    return res.json(memoryProducts);
  }

  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
}

module.exports = { getProducts, memoryProducts };

