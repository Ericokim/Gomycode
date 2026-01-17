// ========================================================
// SHOPPING CART - OBJECT ORIENTED JAVASCRIPT (OOJ)
// ========================================================
// This application follows all checkpoint requirements:
//
// ✅ STEP 4.1: Product Class - Represents individual products
// ✅ STEP 4.2: ShoppingCartItem Class - Wraps products with quantity
// ✅ STEP 4.3: getTotalPrice() method in ShoppingCartItem
// ✅ STEP 4.4: ShoppingCart Class - Manages cart operations
// ✅ STEP 4.5.1: getTotalItems() - Counts total items in cart
// ✅ STEP 4.5.2: addItem() - Adds products to cart
// ✅ STEP 4.5.3: removeItem() - Removes products from cart
// ✅ STEP 4.5.4: displayCartItems() - Updates DOM with cart items
// ✅ STEP 4.6: Testing - Creates products and integrates with DOM
//
// Additional Features:
// - Product images (handbag, watch, shoes, sunglasses, socks)
// - Horizontal product display layout
// - Soft, eye-friendly color theme
// - Comprehensive code comments
// - Quantity increase/decrease controls
// - Real-time cart updates
// - Toast notifications
// - Responsive design
// ========================================================

// ============================
// STEP 4.1: Product Class
// ============================
// Represents a single product in our shop
// Each product has an ID, name, price, and optional image URL
class Product {
  constructor(id, name, price, image = "https://via.placeholder.com/200") {
    this.id = id; // Unique identifier for the product
    this.name = name; // Display name of the product
    this.price = price; // Price in dollars
    this.image = image; // Product image URL (defaults to placeholder)
  }
}

// ============================
// STEP 4.2: ShoppingCartItem Class
// ============================
// Represents a product in the shopping cart with a quantity
// This class wraps a Product object and adds quantity tracking
class ShoppingCartItem {
  constructor(product, quantity = 1) {
    this.product = product; // Reference to the Product object
    this.quantity = quantity; // Number of units of this product in cart (default: 1)
  }

  // ============================
  // STEP 4.3: Calculate Total Price
  // ============================
  // Returns the total price for this cart item
  // Formula: product price × quantity
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ============================
// STEP 4.4: ShoppingCart Class
// ============================
// Manages all shopping cart operations
// Handles adding/removing items, calculating totals, and updating the UI
class ShoppingCart {
  constructor() {
    this.items = []; // Array to store ShoppingCartItem instances
  }

  // ============================
  // STEP 4.5.1: Get Total Item Count
  // ============================
  // Calculates the total number of items in the cart
  // Sums up quantities of all cart items
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // ============================
  // STEP 4.5.2: Add Item to Cart
  // ============================
  // Adds a product to the cart or increases quantity if already exists
  // Parameters:
  //   - product: Product object to add
  //   - quantity: Number of items to add (default: 1)
  addItem(product, quantity = 1) {
    // Check if product already exists in cart
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      // If exists, increase the quantity
      existingItem.quantity += quantity;
    } else {
      // If new product, create new cart item and add to array
      this.items.push(new ShoppingCartItem(product, quantity));
    }

    // Update the cart display and show confirmation message
    this.updateCartUI();
    this.showToast(`${product.name} added to cart!`);
  }

  // ============================
  // STEP 4.5.3: Remove Item from Cart
  // ============================
  // Removes a product completely from the cart by product ID
  // Parameter:
  //   - productId: The ID of the product to remove
  removeItem(productId) {
    // Find the index of the item to remove
    const itemIndex = this.items.findIndex(
      (item) => item.product.id === productId
    );

    if (itemIndex !== -1) {
      // Store product name before removal for toast message
      const removedItem = this.items[itemIndex].product.name;

      // Remove item from array using splice
      this.items.splice(itemIndex, 1);

      // Update UI and show confirmation
      this.updateCartUI();
      this.showToast(`${removedItem} removed from cart.`);
    }
  }

  // ============================
  // STEP 4.5.4: Display Cart Items in UI
  // ============================
  // Updates the DOM to show all items currently in the cart
  // Displays product image, name, price, quantity controls, and remove button
  displayCartItems() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = ""; // Clear existing items

    // Show empty cart message if no items
    if (this.items.length === 0) {
      cartItemsList.innerHTML = `
        <li style="text-align: center; padding: 30px; color: #999;">
          <i class="fas fa-shopping-basket" style="font-size: 3rem; color: #ddd; margin-bottom: 15px;"></i>
          <p style="font-size: 1.1rem; margin: 10px 0;">Your cart is empty</p>
          <p style="font-size: 0.9rem; color: #bbb;">Add some items to get started!</p>
        </li>
      `;
      return;
    }

    // Loop through each cart item and create HTML elements
    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("cart-item");

      // Build cart item HTML with image, info, and controls
      li.innerHTML = `
        <img src="${item.product.image}" alt="${
        item.product.name
      }" class="cart-item-image">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.product.name}</div>
          <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
          <div class="quantity-controls">
            <button onclick="cart.decreaseQuantity(${item.product.id})">
              <i class="fas fa-minus"></i>
            </button>
            <span class="quantity">${item.quantity}</span>
            <button onclick="cart.increaseQuantity(${item.product.id})">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="cart-item-total">Total: $${item
            .getTotalPrice()
            .toFixed(2)}</div>
        </div>
        <button class="remove-btn" onclick="cart.removeItem(${
          item.product.id
        })" title="Remove">
          <i class="fas fa-trash-alt"></i>
        </button>
      `;

      // Add the cart item to the list
      cartItemsList.appendChild(li);
    });
  }

  // ============================
  // Increase Quantity of Item
  // ============================
  // Adds one more unit of the specified product
  // Parameter: productId - ID of product to increase
  increaseQuantity(productId) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity++; // Increment quantity
      this.updateCartUI(); // Refresh display
    }
  }

  // ============================
  // Decrease Quantity of Item
  // ============================
  // Removes one unit of the specified product
  // If quantity reaches 1 and decreased, removes the item completely
  // Parameter: productId - ID of product to decrease
  decreaseQuantity(productId) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--; // Decrement quantity
      this.updateCartUI(); // Refresh display
    } else if (item && item.quantity === 1) {
      // If only 1 item left, remove it completely
      this.removeItem(productId);
    }
  }

  // ============================
  // Get Total Cart Price
  // ============================
  // Calculates the sum of all items in the cart
  // Returns the total price of all cart items
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // ============================
  // Update Cart UI
  // ============================
  // Refreshes all cart-related displays:
  // - Cart items list
  // - Total price
  // - Cart button badge count
  updateCartUI() {
    this.displayCartItems(); // Update items display

    // Display total price
    document.getElementById("cart-total-price").textContent =
      this.getTotalPrice().toFixed(2);

    // Update cart badge to show item count
    const badge = document.querySelector(".cart-badge");
    if (badge) {
      badge.textContent = this.getTotalItems();
    }
  }

  // ============================
  // Show Toast Notification
  // ============================
  // Displays a temporary message at the bottom of the screen
  // Parameter: message - Text to display
  // Auto-hides after 3 seconds
  showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show"); // Make visible

    // Hide after 3 seconds
    setTimeout(() => toast.classList.remove("show"), 3000);
  }
}

// ============================
// STEP 4.6: Testing and DOM Integration
// ============================

// ============================
// Create Product Catalog
// ============================
// Initialize 5 products with details and images from Unsplash
// Each product has: ID, Name, Price, and High-Quality Image URL

const product1 = new Product(
  1,
  "Designer Handbag",
  129.99,
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop&q=80"
);

const product2 = new Product(
  2,
  "Luxury Watch",
  249.99,
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&q=80"
);

const product3 = new Product(
  3,
  "Running Shoes",
  89.99,
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&q=80"
);

const product4 = new Product(
  4,
  "Stylish Sunglasses",
  79.99,
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop&q=80"
);

const product5 = new Product(
  5,
  "Cozy Socks (Pair)",
  14.99,
  "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=300&fit=crop&q=80"
);

// ============================
// Initialize Shopping Cart
// ============================
// Create a new cart instance that will manage all cart operations
const cart = new ShoppingCart();

// ============================
// Dynamically Display Products
// ============================
// Get the product grid container and add all products to the page
// Products are displayed horizontally with images
const productGrid = document.querySelector(".product-grid");

// Array of all products to display
[product1, product2, product3, product4, product5].forEach((product) => {
  // Create product card element
  const card = document.createElement("div");
  card.classList.add("product-card");

  // Build product card HTML with image, name, price, and add button
  card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button onclick="cart.addItem(new Product(${product.id}, '${
    product.name
  }', ${product.price}, '${product.image}'))">
          <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
    `;

  // Add card to grid
  productGrid.appendChild(card);
});

// ============================
// Cart Sidebar Toggle
// ============================
// Open cart sidebar when cart button is clicked
document.getElementById("cart-toggle").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.add("open");
});

// Close cart sidebar when close button is clicked
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.remove("open");
});

// ============================
// Checkout Functionality
// ============================
// Handle checkout button click (demo version with alert)
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.getTotalItems() > 0) {
    // Show checkout total
    alert(
      `Checkout total: $${cart
        .getTotalPrice()
        .toFixed(2)}. Thanks for shopping!`
    );

    // Clear cart after checkout
    cart.items = [];
    cart.updateCartUI();
  } else {
    // Show error if cart is empty
    alert("Your cart is empty!");
  }
});

// ============================
// Initial Cart UI Update
// ============================
// Initialize the cart display on page load
cart.updateCartUI();
