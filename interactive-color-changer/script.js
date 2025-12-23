document.addEventListener("DOMContentLoaded", function () {
  // Get the elements we need
  const colorBox = document.getElementById("color-box");
  const changeColorBtn = document.getElementById("change-color-btn");

  // Generate a random hex color
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    // Build a 6-character hex code
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
  }

  // Change the box color when button is clicked
  changeColorBtn.addEventListener("click", function () {
    const newColor = getRandomColor();
    colorBox.style.backgroundColor = newColor;
  });
});
