# CleanKart: Refactor & Iterate an Online Shopping Cart

## Overview

CleanKart shows how a messy shopping cart can be improved through small refactoring iterations. The project starts with rough procedural code, then cleans the structure, and finally introduces design patterns.

Each iteration uses the same scenario so the changes are easy to compare:

1. Add a Keyboard and Mouse.
2. Print the cart and discount.
3. Drop the Keyboard price.
4. Print the cart again.

## Files

| File | Purpose |
|------|---------|
| `src/messy-cart.js` | Intentionally messy starting version with code smells |
| `src/refactored-cart.js` | Refactored version with better naming and extracted helpers |
| `src/patterns-cart.js` | Final version using Strategy, Observer, and Builder |
| `report.md` | Summary report explaining changes and design improvements |
| `projectplan.md` | Plan, checklist, and review |

Read the summary report here: [report.md](report.md)

## Run Each Iteration

```bash
npm run messy
npm run refactored
npm run patterns
```

## Expected Output

### Messy Version

```text
Iteration 1 - Messy Cart
Keyboard x1 = 30.00 TND
Mouse x2 = 30.00 TND
Discount: 6.00 TND
Total: 54.00 TND
Price changed for Keyboard
Iteration 1 - Messy Cart
Keyboard x1 = 25.00 TND
Mouse x2 = 30.00 TND
Discount: 5.50 TND
Total: 49.50 TND
```

### Refactored Version

```text
Iteration 2 - Refactored Cart
Keyboard x1 = 30.00 TND
Mouse x2 = 30.00 TND
Discount: 6.00 TND
Total: 54.00 TND
Price changed for Keyboard
Iteration 2 - Refactored Cart
Keyboard x1 = 25.00 TND
Mouse x2 = 30.00 TND
Discount: 5.50 TND
Total: 49.50 TND
```

### Pattern-Based Version

```text
Iteration 3 - Pattern-Based Cart
Keyboard x1 = 30.00 TND
Mouse x2 = 30.00 TND
Discount: 6.00 TND
Total: 54.00 TND
Price drop alert: Keyboard changed from 30.00 TND to 25.00 TND
Iteration 3 - Pattern-Based Cart
Keyboard x1 = 25.00 TND
Mouse x2 = 30.00 TND
Discount: 5.50 TND
Total: 49.50 TND
```

## Code Smells Identified

- Global state
- Unclear names
- Repeated total and discount calculations
- Mixed business logic and output formatting
- Tight coupling between price changes and printing
- Dead variable in the messy version

## Refactoring Steps Tracked

### Iteration 1: Messy Code

The first version intentionally keeps poor naming, global state, repeated math, and mixed responsibilities. Comments in the file identify the smells.

### Iteration 2: Refactored Code

The second version keeps the same behavior but applies small refactoring steps:

- Rename unclear variables.
- Remove dead code.
- Extract money formatting.
- Extract product creation.
- Extract subtotal and discount calculations.

### Iteration 3: Pattern-Based Code

The final version keeps the same scenario and adds design patterns only after the code is easier to understand.

## Patterns Used

- **Strategy:** discount calculation can be swapped without rewriting the cart.
- **Observer:** price-drop notifications are separate from price update logic.
- **Builder:** products with several fields, such as SKU, name, price, quantity, category, and description, are created step by step with readable chained methods.
