# 🍇 Shop Grape - Object-Oriented Shopping Cart

A modern, fully-featured shopping cart application built with Object-Oriented JavaScript (OOJ), featuring a beautiful soft pastel UI and professional Font Awesome icons.


## Description

Shop Grape is a responsive e-commerce shopping cart interface that demonstrates advanced Object-Oriented Programming principles in JavaScript. The application features a clean, eye-friendly design with soft pastel colors and smooth animations, providing an excellent user experience for online shopping.

This project implements all the core functionality of a modern shopping cart system, including:

- Adding/removing products
- Quantity management
- Real-time price calculations
- Persistent cart state during the session
- Toast notifications for user feedback

## ✨ Features

### Design & UI

- **Soft Eye-Friendly Theme**: Pastel gradient background (pink, blue, cream) designed for comfortable viewing
- **Professional Icons**: Font Awesome 6.5.1 integration for crisp, scalable icons
- **Premium Typography**: Google Fonts (Poppins) for elegant text rendering
- **Smooth Animations**: Hover effects, slide-ins, and bounce animations
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile
- **Horizontal Product Display**: Modern flex layout with smooth scrolling on mobile

### Shopping Cart Functionality

- **Add to Cart**: Quick add with visual feedback and toast notifications
- **Quantity Controls**: Intuitive +/- buttons with Font Awesome icons
- **Remove Items**: One-click removal with confirmation toast
- **Real-time Updates**: Instant cart badge and total price updates
- **Empty Cart Detection**: Friendly message with icon when cart is empty
- **Checkout Process**: Complete checkout flow with total calculation

### Product Catalog

- **5 Premium Products**:
  - Designer Handbag ($129.99)
  - Luxury Watch ($249.99)
  - Running Shoes ($89.99)
  - Stylish Sunglasses ($79.99)
  - Cozy Socks ($14.99)
- **High-Quality Images**: Professional product photos from Unsplash
- **Product Cards**: Interactive cards with hover effects and shimmer animation

### Technical Features

- **Object-Oriented Architecture**: Clean OOP design with three main classes
- **ES6+ JavaScript**: Modern JavaScript syntax and features
- **Modular Code**: Separation of concerns (HTML/CSS/JS)
- **Comprehensive Comments**: Detailed documentation throughout the codebase
- **Performance Optimized**: Efficient DOM manipulation and event handling

## Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs directly in the browser!

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ericokim/Gomycode.git
   cd Gomycode/shop-grape
   ```

2. **Open in browser**

   ```bash
   # Simply open index.html in your browser
   # Windows
   start index.html

   # macOS
   open index.html

   # Linux
   xdg-open index.html
   ```

   Or drag and drop `index.html` into your browser window.

3. **That's it!** No build process or dependencies to install.

## Usage

### Basic Shopping Flow

1. **Browse Products**: View the 5 available products displayed horizontally
2. **Add to Cart**: Click the "Add to Cart" button on any product
3. **View Cart**: Click the cart button in the header (shows item count badge)
4. **Adjust Quantities**: Use + and - buttons in the cart sidebar
5. **Remove Items**: Click the trash icon to remove items
6. **Checkout**: Click the "Checkout" button to complete your purchase

### Cart Operations

```javascript
// The shopping cart is managed through the ShoppingCart class

// Add an item
cart.addItem(product, quantity);

// Remove an item
cart.removeItem(productId);

// Increase quantity
cart.increaseQuantity(productId);

// Decrease quantity
cart.decreaseQuantity(productId);

// Get total items
const totalItems = cart.getTotalItems();

// Get total price
const totalPrice = cart.getTotalPrice();
```

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        User Opens App                        │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              Products Loaded & Displayed                     │
│  (5 products with images in horizontal layout)              │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   User Browses Products                      │
│              (Hover effects, view details)                   │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
         ┌──────────────────┐  ┌─────────────┐
         │ Click Add to Cart│  │ View Cart   │
         └────────┬─────────┘  └──────┬──────┘
                  │                   │
                  ▼                   ▼
         ┌──────────────────┐  ┌─────────────────┐
         │ Product Added    │  │ Cart Sidebar    │
         │ Toast Shown      │  │ Opens           │
         │ Badge Updated    │  └──────┬──────────┘
         └────────┬─────────┘         │
                  │                   ▼
                  │         ┌─────────────────────┐
                  │         │ Adjust Quantities   │
                  │         │ (+/- buttons)       │
                  │         └──────┬──────────────┘
                  │                │
                  │                ▼
                  │         ┌─────────────────────┐
                  │         │ Remove Items        │
                  │         │ (Trash icon)        │
                  │         └──────┬──────────────┘
                  │                │
                  └────────┬───────┘
                           ▼
                  ┌─────────────────┐
                  │ View Total      │
                  │ (Real-time)     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Click Checkout  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Checkout Alert  │
                  │ Cart Cleared    │
                  └─────────────────┘
```

## Architecture

### Class Structure

```javascript
// Product Class (Step 4.1)
class Product {
  constructor(id, name, price, image)
  // Properties: id, name, price, image
}

// ShoppingCartItem Class (Step 4.2)
class ShoppingCartItem {
  constructor(product, quantity)
  getTotalPrice() // Step 4.3
  // Properties: product, quantity
}

// ShoppingCart Class (Step 4.4)
class ShoppingCart {
  constructor()
  getTotalItems()        // Step 4.5.1
  addItem()             // Step 4.5.2
  removeItem()          // Step 4.5.3
  displayCartItems()    // Step 4.5.4
  increaseQuantity()
  decreaseQuantity()
  getTotalPrice()
  updateCartUI()
  showToast()
  // Properties: items[]
}
```

### File Structure

```
shop-grape/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript logic (OOP)
└── README.md          # This file
```

## Contributing

Contributions are welcome! Here's how you can help:

### Steps to Contribute

1. **Fork the repository**

   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**

   - Follow the existing code style
   - Add comments for new functionality
   - Test thoroughly in multiple browsers

4. **Commit your changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to the branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Link any related issues
   - Wait for review

### Contribution Guidelines

- **Code Style**: Follow ES6+ JavaScript standards
- **Comments**: Add comprehensive comments for new code
- **Testing**: Test on Chrome, Firefox, Safari, and Edge
- **Responsiveness**: Ensure mobile compatibility
- **Accessibility**: Maintain ARIA labels and keyboard navigation

### Ideas for Contribution

- [ ] Add local storage persistence
- [ ] Implement product search/filter
- [ ] Add product categories
- [ ] Create product detail modal
- [ ] Add discount/coupon system
- [ ] Implement user authentication
- [ ] Add payment gateway integration
- [ ] Create order history page
- [ ] Add wishlist functionality
- [ ] Implement product reviews

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Eric Kimathi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Author

**Eric Kimathi**

- GitHub: [@Ericokim](https://github.com/Ericokim)
- Repository: [Gomycode](https://github.com/Ericokim/Gomycode)

## Acknowledgments

- **Font Awesome** - For the beautiful icon library
- **Google Fonts** - For the Poppins font family
- **Unsplash** - For high-quality product images
- **GoMyCode** - For the checkpoint requirements and learning opportunity



