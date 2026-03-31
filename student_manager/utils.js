// Return only students with a grade of 10 or more
const getPassedStudents = (students) =>
  students.filter((student) => student.grade >= 10);

// Turn a student object into simple text
const formatStudent = (student) => `${student.name} - Grade: ${student.grade}`;

// Calculate the average grade using reduce
const calculateAverageGrade = (students) => {
  if (students.length === 0) {
    return 0;
  }

  const total = students.reduce((sum, student) => sum + student.grade, 0);
  return total / students.length;
};

export { getPassedStudents, formatStudent, calculateAverageGrade };
