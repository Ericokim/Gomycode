function validateOrder(req, res, next) {
  const { customerName, items } = req.body;

  if (!customerName || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Customer name and cart items are required." });
  }

  next();
}

module.exports = { validateOrder };

