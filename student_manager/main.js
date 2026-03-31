import students from "./students.js";
import {
  getPassedStudents,
  formatStudent,
  calculateAverageGrade,
} from "./utils.js";

// Select the elements where content will be shown
const showAllButton = document.getElementById("show-all");
const showPassedButton = document.getElementById("show-passed");
const resultsContainer = document.getElementById("results");
const averageGradeText = document.getElementById("average-grade");

// Display students and show their average grade
const renderStudents = (studentList) => {
  resultsContainer.innerHTML = studentList
    .map((student) => `<div class="student-card">${formatStudent(student)}</div>`)
    .join("");

  averageGradeText.textContent = `Average Grade: ${calculateAverageGrade(
    studentList
  ).toFixed(2)}`;
};

// Show all students
showAllButton.addEventListener("click", () => {
  renderStudents(students);
});

// Show only students who passed
showPassedButton.addEventListener("click", () => {
  renderStudents(getPassedStudents(students));
});

// Show all students when the page first loads
renderStudents(students);
