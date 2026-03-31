import students from "./students.js";
import {
  getPassedStudents,
  formatStudent,
  calculateAverageGrade,
} from "./utils.js";

const showAllButton = document.getElementById("show-all");
const showPassedButton = document.getElementById("show-passed");
const resultsContainer = document.getElementById("results");
const averageGradeText = document.getElementById("average-grade");

const renderStudents = (studentList) => {
  resultsContainer.innerHTML = studentList
    .map((student) => `<div class="student-card">${formatStudent(student)}</div>`)
    .join("");

  averageGradeText.textContent = `Average Grade: ${calculateAverageGrade(
    studentList
  ).toFixed(2)}`;
};

showAllButton.addEventListener("click", () => {
  renderStudents(students);
});

showPassedButton.addEventListener("click", () => {
  renderStudents(getPassedStudents(students));
});

renderStudents(students);
