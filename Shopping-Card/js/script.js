
document.addEventListener("DOMContentLoaded", function () {
  // Get all the buttons and elements we need
  const plusButtons = document.querySelectorAll(".fa-plus-circle");
  const minusButtons = document.querySelectorAll(".fa-minus-circle");
  const deleteButtons = document.querySelectorAll(".fa-trash-alt");
  const heartButtons = document.querySelectorAll(".fa-heart");
  const totalPriceElement = document.querySelector(".total");

  // Calculate and update the total price
  function updateTotalPrice() {
    let total = 0;
    const cards = document.querySelectorAll(".list-products > .card-body");

    cards.forEach((card) => {
      const unitPriceText = card.querySelector(".unit-price").textContent;
      const unitPrice = parseFloat(unitPriceText.replace("$", "").trim());
      const quantity = parseInt(card.querySelector(".quantity").textContent);
      total += unitPrice * quantity;
    });

    totalPriceElement.textContent = total + " $";
  }

  // Plus button: increase quantity by 1
  plusButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const card = button.closest(".card-body");
      const quantityElement = card.querySelector(".quantity");
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
      updateTotalPrice();
    });
  });

  // Minus button: decrease quantity by 1 but it won't go below 0
  minusButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const card = button.closest(".card-body");
      const quantityElement = card.querySelector(".quantity");
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        updateTotalPrice();
      }
    });
  });

  // Delete button: remove item from cart
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const cardContainer = button.closest(".list-products > .card-body");
      cardContainer.remove();
      updateTotalPrice();
    });
  });

  // Heart button: toggle like on/off
  heartButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      if (button.style.color === "red") {
        button.style.color = "black";
      } else {
        button.style.color = "red";
      }
    });
  });
});
