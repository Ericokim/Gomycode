const ShoppingCart = (() => {
  let cart = [];

  function formatMoney(amount) {
    return `${amount.toFixed(2)} TND`;
  }

  function addItem(name, quantity, price) {
    cart.push({ name, quantity, price });
  }

  function removeItem(name) {
    cart = cart.filter((item) => item.name !== name);
  }

  function clearCart() {
    cart = [];
  }

  function viewCart() {
    if (cart.length === 0) {
      console.log("Cart is empty");
      return;
    }

    let total = 0;

    for (const item of cart) {
      const itemTotal = item.quantity * item.price;
      total += itemTotal;
      console.log(`${item.name} (x${item.quantity}) - ${formatMoney(itemTotal)}`);
    }

    console.log(`Total: ${formatMoney(total)}`);
  }

  return {
    addItem,
    viewCart,
    removeItem,
    clearCart,
  };
})();

console.log("Module Pattern Shopping Cart");
ShoppingCart.addItem("Apple", 2, 1.5);
ShoppingCart.addItem("Orange", 3, 2.0);
ShoppingCart.viewCart();

console.log("\nAfter removing Apple:");
ShoppingCart.removeItem("Apple");
ShoppingCart.viewCart();

console.log("\nAfter clearing cart:");
ShoppingCart.clearCart();
ShoppingCart.viewCart();
