# Reflection Report

The main challenge during the refactor was keeping the behavior exactly the same while changing the structure of the code. In the procedural version, the cart is stored in a global variable, so every function can access and change it directly. That makes the first version easy to understand, but it also means the cart data is exposed and can be changed from anywhere in the file. During the refactor, I had to move the cart data into a private scope without changing how users add, view, remove, or clear items.

Using the Module Pattern improved the code by encapsulating the cart data inside a closure. The refactored version exposes only the operations that are needed: `addItem`, `viewCart`, `removeItem`, and `clearCart`. This reduces accidental changes to the cart and makes the code easier to maintain. If new behavior is added later, such as discounts or tax calculation, it can be added inside the module without spreading cart logic across the whole program.

I would choose a design pattern over procedural code when the code starts to grow, when shared data needs protection, or when several parts of an application depend on the same behavior. Procedural code is fine for small scripts and simple tasks, but a pattern becomes useful when structure, maintainability, and scalability matter.
