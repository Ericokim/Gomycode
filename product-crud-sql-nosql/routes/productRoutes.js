const express = require("express");

function createProductRouter(controller) {
  const router = express.Router();

  router.post("/", controller.createProduct);
  router.get("/", controller.getAllProducts);
  router.get("/:id", controller.getProductById);
  router.put("/:id", controller.updateProduct);
  router.delete("/:id", controller.deleteProduct);

  return router;
}

module.exports = createProductRouter;
