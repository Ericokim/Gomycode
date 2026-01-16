function initCart() {
  const cartList = document.querySelector(".cart-list");
  const totalAmountEl = document.querySelector(".total-amount");
  const debugEl = document.querySelector(".cart-debug");

  if (!cartList || !totalAmountEl) return;

  // Format number as currency
  function formatCurrency(num) {
    return `$${num.toFixed(2)}`;
  }

  // Calculate total
  function calculateTotal() {
    let total = 0;
    let itemCount = 0;

    const items = cartList.querySelectorAll(".cart-item");
    items.forEach((item) => {
      const price = parseFloat(item.dataset.price) || 0;
      const qtyText = item.querySelector(".qty").textContent;
      const qty = parseInt(qtyText, 10) || 1;
      total += price * qty;
      itemCount++;
    });

    totalAmountEl.textContent = formatCurrency(total);

    if (debugEl) {
      debugEl.textContent = `Items: ${itemCount} • Total: ${formatCurrency(
        total
      )}`;
    }
  }

  // Remove item with animation
  function removeItemWithAnimation(item) {
    if (!item) return;

    item.classList.add("removing");

    setTimeout(() => {
      if (item.parentElement) {
        item.parentElement.removeChild(item);
      }
      calculateTotal();
    }, 420);
  }

  // Setup event listeners for one item
  function wireItem(item) {
    const plus = item.querySelector(".qty-btn.plus");
    const minus = item.querySelector(".qty-btn.minus");
    const qtyEl = item.querySelector(".qty");
    const deleteBtn = item.querySelector(".delete-btn");
    const likeBtn = item.querySelector(".like-btn");

    // Plus button - increase quantity
    plus.addEventListener("click", () => {
      let currentQty = parseInt(qtyEl.textContent, 10);
      if (isNaN(currentQty)) currentQty = 1;

      if (currentQty < 10) {
        currentQty += 1;
        qtyEl.textContent = currentQty;
        calculateTotal();
      }
    });

    // Minus button - decrease quantity (minimum 1)
    minus.addEventListener("click", () => {
      let currentQty = parseInt(qtyEl.textContent, 10);
      if (isNaN(currentQty)) currentQty = 1;

      if (currentQty > 1) {
        currentQty -= 1;
        qtyEl.textContent = currentQty;
        calculateTotal();
      }
    });

    // Delete button
    deleteBtn.addEventListener("click", () => {
      removeItemWithAnimation(item);
    });

    // Like button
    if (likeBtn) {
      likeBtn.addEventListener("click", () => {
        const isLiked = likeBtn.classList.contains("liked");

        if (isLiked) {
          likeBtn.classList.remove("liked");
          likeBtn.setAttribute("aria-pressed", "false");
        } else {
          likeBtn.classList.add("liked");
          likeBtn.setAttribute("aria-pressed", "true");
        }
      });
    }
  }

  // Setup all items in the cart
  const allItems = cartList.querySelectorAll(".cart-item");
  allItems.forEach((item) => {
    wireItem(item);
  });

  // Calculate initial total on page load
  calculateTotal();
}

// Run when page is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCart);
} else {
  initCart();
}