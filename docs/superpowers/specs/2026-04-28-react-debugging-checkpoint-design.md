# React Debugging Checkpoint — Design Spec

**Date:** 2026-04-28  
**Project:** `react-debugging-checkpoint`  
**Stack:** React 18, TypeScript, Create React App  
**Theme:** Shopping Cart  
**Approach:** Option B — Feature-folder structure, `buggy` branch → `main` fix workflow

---

## Goal

Build a realistic React + TypeScript Shopping Cart app that contains 8 intentional senior-level bugs. The debugging workflow — using React Developer Tools — identifies, fixes, and documents each issue. The `buggy` branch ships the broken version; `main` holds the fixed version with a `DEBUGGING.md` documenting every fix.

---

## Architecture

```
react-debugging-checkpoint/
├── public/
├── src/
│   ├── types/
│   │   └── index.ts              # Product, CartItem, CartContextValue interfaces
│   ├── data/
│   │   └── products.ts           # 6 hardcoded products (catalog)
│   ├── hooks/
│   │   └── useCart.ts            # Cart logic: add, remove, updateQty, total
│   ├── components/
│   │   ├── Header/
│   │   │   └── Header.tsx        # App title + cart item count badge
│   │   ├── ProductList/
│   │   │   └── ProductList.tsx   # Grid of ProductCard components
│   │   ├── ProductCard/
│   │   │   └── ProductCard.tsx   # Single product: image, name, price, Add btn
│   │   ├── Cart/
│   │   │   └── Cart.tsx          # Cart sidebar: CartItem list + total
│   │   └── CartItem/
│   │       └── CartItem.tsx      # Single cart row: name, qty controls, line total
│   └── App.tsx                   # Composes all components, owns useCart state
├── DEBUGGING.md                  # Documents all 8 bugs, DevTools steps, fixes
└── README.md
```

---

## TypeScript Types

```ts
// src/types/index.ts

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  total: number;
}
```

---

## Data Flow

- `App.tsx` owns all state via the `useCart` hook
- Props flow **down** (no Context, no Redux) — intentional for DevTools prop inspection
- `App` → `Header`: passes `itemCount` (total quantity across all cart items)
- `App` → `ProductList`: passes `products` catalog + `addToCart`
- `App` → `Cart`: passes `cartItems`, `removeFromCart`, `updateQuantity`, `total`
- `ProductList` → `ProductCard`: passes individual `product` + `addToCart`
- `Cart` → `CartItem`: passes individual `cartItem`, `onRemove`, `onUpdateQuantity`

---

## Bug Inventory

| # | File | Bug Type | Description |
|---|------|----------|-------------|
| 1 | `useCart.ts` | State mutation | `addToCart` mutates the array in-place — same reference, React skips re-render |
| 2 | `useCart.ts` | Wrong initial qty | New items added with `quantity: 0` instead of `1` |
| 3 | `useCart.ts` | Stale closure | `updateQuantity` uses direct assignment instead of functional updater `prev =>` |
| 4 | `useCart.ts` | Incorrect total (NaN) | `total` computed as `item.price * item.quantity` where `price` is cast to `string` |
| 5 | `ProductCard.tsx` | TypeScript type mismatch | `price` prop typed as `string` in interface, product data passes `number` |
| 6 | `ProductList.tsx` | Wrong key prop | `key={index}` instead of `key={product.id}` in `.map()` |
| 7 | `CartItem.tsx` | Missing prop | `onRemove` typed as optional, never passed from `Cart.tsx` — button silently no-ops |
| 8 | `Header.tsx` | Wrong derived value | Badge shows `cartItems.length` instead of summed `quantity` across all items |

---

## Branching Strategy

- **`buggy` branch** — all 8 bugs present; app renders without crashing but behavior is wrong
- **`main` branch** — fixed version; each fix accompanied by a comment explaining the root cause
- **`DEBUGGING.md`** — for each bug: symptom, React DevTools inspection step, fix applied

---

## Success Criteria

- App scaffolds and runs with `npm start` on both branches
- All 8 bugs are observable via React Developer Tools (component tree, props panel, state panel)
- Each bug is fixed on `main` with no TypeScript errors (`tsc --noEmit` passes)
- `DEBUGGING.md` documents every bug with enough detail to be a standalone reference
