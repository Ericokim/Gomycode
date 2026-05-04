// Iteration 2: refactored procedural code.
// Improvements from iteration 1:
// - renamed unclear variables
// - removed dead code
// - extracted money formatting
// - extracted product creation
// - extracted subtotal and discount calculation
// - kept the same cart scenario and output

const cartItems = [];

function formatMoney(amount) {
  return `${amount.toFixed(2)} TND`;
}

function createProduct(name, price, quantity) {
  return { name, price, quantity };
}

function addItem(product) {
  cartItems.push(product);
}

function updatePrice(productName, newPrice) {
  const product = cartItems.find((item) => item.name === productName);
  if (product) {
    product.price = newPrice;
    console.log(`Price changed for ${productName}`);
  }
}

function getSubtotal() {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getDiscount(subtotal) {
  return subtotal > 50 ? subtotal * 0.1 : 0;
}

function printCart() {
  console.log("Iteration 2 - Refactored Cart");

  for (const item of cartItems) {
    console.log(`${item.name} x${item.quantity} = ${formatMoney(item.price * item.quantity)}`);
  }

  const subtotal = getSubtotal();
  const discount = getDiscount(subtotal);
  console.log(`Discount: ${formatMoney(discount)}`);
  console.log(`Total: ${formatMoney(subtotal - discount)}`);
}

addItem(createProduct("Keyboard", 30, 1));
addItem(createProduct("Mouse", 15, 2));
printCart();
updatePrice("Keyboard", 25);
printCart();
