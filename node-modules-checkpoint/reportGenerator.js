function generateReport(name, scores) {
  const total = scores.reduce((sum, score) => sum + score, 0);
  const average = total / scores.length;
  const status = average >= 10 ? "Pass" : "Fail";

  return [
    "Student Report",
    "--------------",
    `Name: ${name}`,
    `Scores: ${scores.join(", ")}`,
    `Average: ${average.toFixed(2)}`,
    `Status: ${status}`,
  ].join("\n");
}

module.exports = generateReport;
