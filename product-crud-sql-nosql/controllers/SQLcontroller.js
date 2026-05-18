const pool = require("../config/mysql");

async function createProduct(req, res, next) {
  try {
    const { name, price, category = null, inStock = true } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const [result] = await pool.execute(
      "INSERT INTO products (name, price, category, inStock) VALUES (?, ?, ?, ?)",
      [name, price, category, inStock]
    );

    return res.status(201).json({
      id: result.insertId,
      name,
      price,
      category,
      inStock
    });
  } catch (error) {
    return next(error);
  }
}

async function getAllProducts(req, res, next) {
  try {
    const [products] = await pool.execute("SELECT * FROM products");
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const [products] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(products[0]);
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { name, price, category = null, inStock = true } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const [result] = await pool.execute(
      "UPDATE products SET name = ?, price = ?, category = ?, inStock = ? WHERE id = ?",
      [name, price, category, inStock, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      id: Number(req.params.id),
      name,
      price,
      category,
      inStock
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const [result] = await pool.execute(
      "DELETE FROM products WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
