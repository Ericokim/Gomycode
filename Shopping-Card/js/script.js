document.addEventListener("DOMContentLoaded", function () {
  const plusButtons = document.querySelectorAll(".fa-plus-circle");
  const minusButtons = document.querySelectorAll(".fa-minus-circle");
  const deleteButtons = document.querySelectorAll(".fa-trash-alt");
  const heartButtons = document.querySelectorAll(".fa-heart");
  const totalPriceElement = document.querySelector(".total");

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

  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const cardContainer = button.closest(".list-products > .card-body");
      cardContainer.remove();
      updateTotalPrice();
    });
  });

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
