// Iteration 3: final version with design patterns.
// Same cart scenario as iterations 1 and 2, now with:
// - Builder for flexible Product creation
// - Strategy for discount calculation
// - Observer for price-drop notifications

function formatMoney(amount) {
  return `${amount.toFixed(2)} TND`;
}

// Builder Pattern: creates complex product objects step by step.
class ProductBuilder {
  constructor() {
    this.product = {
      sku: "",
      name: "",
      price: 0,
      quantity: 1,
      category: "general",
      description: "",
    };
  }

  setSku(sku) {
    this.product.sku = sku;
    return this;
  }

  setName(name) {
    this.product.name = name;
    return this;
  }

  setPrice(price) {
    this.product.price = price;
    return this;
  }

  setQuantity(quantity) {
    this.product.quantity = quantity;
    return this;
  }

  setCategory(category) {
    this.product.category = category;
    return this;
  }

  setDescription(description) {
    this.product.description = description;
    return this;
  }

  build() {
    return { ...this.product };
  }
}

// Strategy Pattern: discount behavior is selected from interchangeable functions.
const discountStrategies = {
  noDiscount: () => 0,
  tenPercentOver50: (subtotal) => (subtotal > 50 ? subtotal * 0.1 : 0),
};

// Observer Pattern: subscribers are notified only when a price drops.
class PriceDropNotifier {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(product, oldPrice, newPrice) {
    if (newPrice >= oldPrice) return;

    for (const observer of this.observers) {
      observer(product, oldPrice, newPrice);
    }
  }
}

class ShoppingCart {
  constructor(discountStrategy, notifier) {
    this.items = [];
    this.discountStrategy = discountStrategy;
    this.notifier = notifier;
  }

  addItem(product) {
    this.items.push(product);
  }

  updatePrice(productName, newPrice) {
    const product = this.items.find((item) => item.name === productName);
    if (!product) return;

    const oldPrice = product.price;
    product.price = newPrice;
    this.notifier.notify(product, oldPrice, newPrice);
  }

  getSubtotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  printCart() {
    console.log("Iteration 3 - Pattern-Based Cart");

    for (const item of this.items) {
      console.log(`${item.name} x${item.quantity} = ${formatMoney(item.price * item.quantity)}`);
    }

    const subtotal = this.getSubtotal();
    const discount = this.discountStrategy(subtotal);
    console.log(`Discount: ${formatMoney(discount)}`);
    console.log(`Total: ${formatMoney(subtotal - discount)}`);
  }
}

const notifier = new PriceDropNotifier();
notifier.subscribe((product, oldPrice, newPrice) => {
  console.log(`Price drop alert: ${product.name} changed from ${formatMoney(oldPrice)} to ${formatMoney(newPrice)}`);
});

const cart = new ShoppingCart(discountStrategies.tenPercentOver50, notifier);

const keyboard = new ProductBuilder()
  .setSku("KB-001")
  .setName("Keyboard")
  .setPrice(30)
  .setQuantity(1)
  .setCategory("electronics")
  .setDescription("Compact USB keyboard")
  .build();

const mouse = new ProductBuilder()
  .setSku("MS-001")
  .setName("Mouse")
  .setPrice(15)
  .setQuantity(2)
  .setCategory("electronics")
  .setDescription("Wireless mouse")
  .build();

cart.addItem(keyboard);
cart.addItem(mouse);
cart.printCart();
cart.updatePrice("Keyboard", 25);
cart.printCart();
