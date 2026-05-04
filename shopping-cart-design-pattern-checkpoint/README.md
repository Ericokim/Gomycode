# Shopping Cart - Procedural Programming and Design Pattern

## Objective

This project demonstrates the difference between procedural programming and refactoring with a design pattern in JavaScript.

The same shopping cart behavior is implemented twice:

1. `procedural-cart.js` uses a global cart array and standalone functions.
2. `module-cart.js` uses the Module Pattern to keep cart data private.

## Features

- Add items by name, quantity, and price
- View all items in the cart
- Calculate and display the total price
- Remove an item by name
- Clear all items from the cart

## Files

| File | Purpose |
|------|---------|
| `procedural-cart.js` | Procedural version using global state and functions |
| `module-cart.js` | Refactored version using the Module Pattern |
| [`reflection.md`](reflection.md) | Reflection report |

Read the reflection report here: [reflection.md](reflection.md)

## Run the Procedural Version

```bash
node procedural-cart.js
```

Expected output:

```text
Procedural Shopping Cart
Apple (x2) - 3.00 TND
Orange (x3) - 6.00 TND
Total: 9.00 TND

After removing Apple:
Orange (x3) - 6.00 TND
Total: 6.00 TND

After clearing cart:
Cart is empty
```

## Run the Module Pattern Version

```bash
node module-cart.js
```

Expected output:

```text
Module Pattern Shopping Cart
Apple (x2) - 3.00 TND
Orange (x3) - 6.00 TND
Total: 9.00 TND

After removing Apple:
Orange (x3) - 6.00 TND
Total: 6.00 TND

After clearing cart:
Cart is empty
```

## Design Pattern Used

The refactored version uses the **Module Pattern**.

The cart array is private inside a closure:

```js
const ShoppingCart = (() => {
  let cart = [];

  return {
    addItem,
    viewCart,
    removeItem,
    clearCart,
  };
})();
```

This avoids global scope pollution and exposes only the operations needed to use the cart.
