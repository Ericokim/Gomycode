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

console.log("Procedural Shopping Cart");
addItem("Apple", 2, 1.5);
addItem("Orange", 3, 2.0);
viewCart();

console.log("\nAfter removing Apple:");
removeItem("Apple");
viewCart();

console.log("\nAfter clearing cart:");
clearCart();
viewCart();
