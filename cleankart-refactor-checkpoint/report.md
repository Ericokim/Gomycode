# CleanKart Summary Report

## What Changed and Why

CleanKart starts with a deliberately messy shopping cart in `src/messy-cart.js`. That version uses global state, unclear variable names, repeated total and discount calculations, a dead variable, and mixes business logic with console output. It is runnable, but it is hard to maintain.

In `src/refactored-cart.js`, the code is cleaned in small steps while keeping the same Keyboard and Mouse scenario. Variable names are made meaningful, dead code is removed, repeated formatting and subtotal logic are extracted into helper functions, and product creation is separated from cart operations. This makes the program easier to read and reduces duplication.

The final version, `src/patterns-cart.js`, introduces design patterns after the code is already clearer. This keeps the refactor incremental instead of jumping straight into abstractions.

## Clean Code Principles Followed

- Clear naming: `cartItems`, `getSubtotal`, `updatePrice`, and `discountStrategy`.
- Small functions: formatting, subtotal, discount, and printing are separated.
- DRY: repeated money formatting and total calculation are extracted.
- KISS: the project uses no external dependencies and avoids unnecessary framework code.
- Runnable iterations: each version can be executed independently with Node.js.

## How Patterns Improved the Design

- **Strategy:** discount logic is injected into the cart, so discounts can change without editing cart behavior.
- **Observer:** price-drop notifications are separate from price updates, so new notification behavior can be added without changing `ShoppingCart`.
- **Builder:** products with several fields, such as SKU, name, price, quantity, category, and description, can be created clearly and flexibly.

Together, these patterns make the final cart easier to extend while keeping the core shopping cart logic focused.
