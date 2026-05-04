// Iteration 1: intentionally messy starting code.
// Same scenario used in every iteration:
// - Add Keyboard and Mouse
// - Calculate discount
// - Drop Keyboard price
// - Print cart again
//
// Code smells intentionally left here:
// - global mutable state
// - unclear names: c, n, p, q, t
// - repeated discount math
// - mixed business logic and console output
// - dead variable
// - tight coupling between price update and printing

let c = [];
let unusedTax = 0; // dead code smell: declared but never used

function add(n, p, q) {
  c.push({ n: n, p: p, q: q });
}

function show() {
  console.log("Iteration 1 - Messy Cart");
  let t = 0;

  for (let i = 0; i < c.length; i++) {
    let line = c[i].p * c[i].q;
    t = t + line;
    console.log(c[i].n + " x" + c[i].q + " = " + line.toFixed(2) + " TND");
  }

  if (t > 50) {
    console.log("Discount: " + (t * 0.1).toFixed(2) + " TND");
    console.log("Total: " + (t - t * 0.1).toFixed(2) + " TND");
  } else {
    console.log("Discount: 0.00 TND");
    console.log("Total: " + t.toFixed(2) + " TND");
  }
}

function changePrice(name, newPrice) {
  for (let i = 0; i < c.length; i++) {
    if (c[i].n === name) {
      c[i].p = newPrice;
      console.log("Price changed for " + name);
    }
  }
}

add("Keyboard", 30, 1);
add("Mouse", 15, 2);
show();
changePrice("Keyboard", 25);
show();
