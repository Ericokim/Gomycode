const getPassedStudents = (students) =>
  students.filter((student) => student.grade >= 10);

const formatStudent = (student) => `${student.name} - Grade: ${student.grade}`;

const calculateAverageGrade = (students) => {
  if (students.length === 0) {
    return 0;
  }

  const total = students.reduce((sum, student) => sum + student.grade, 0);
  return total / students.length;
};

export { getPassedStudents, formatStudent, calculateAverageGrade };
