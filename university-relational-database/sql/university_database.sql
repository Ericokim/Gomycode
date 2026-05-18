DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS Course_Instructors;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Instructors;
DROP TABLE IF EXISTS Students;

CREATE TABLE Students (
  student_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  age INT NOT NULL CHECK (age > 17)
);

CREATE TABLE Instructors (
  instructor_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL
);

CREATE TABLE Courses (
  course_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL UNIQUE,
  credits INT NOT NULL CHECK (credits > 0)
);

CREATE TABLE Course_Instructors (
  course_id INT NOT NULL,
  instructor_id INT NOT NULL,
  PRIMARY KEY (course_id, instructor_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Enrollments (
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  grade CHAR(1),
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES Students(student_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CHECK (grade IN ('A', 'B', 'C', 'D', 'F') OR grade IS NULL)
);

INSERT INTO Students (name, email, age) VALUES
  ('Alice Smith', 'alice@example.com', 20),
  ('Bob Johnson', 'bob@example.com', 22),
  ('Charlie Brown', 'charlie@example.com', 19),
  ('Diana Prince', 'diana@example.com', 21);

INSERT INTO Instructors (name, department) VALUES
  ('Dr. Emily White', 'Computer Science'),
  ('Prof. John Black', 'Mathematics'),
  ('Dr. Sarah Green', 'Physics');

INSERT INTO Courses (title, credits) VALUES
  ('Database Systems', 3),
  ('Calculus I', 4),
  ('Physics I', 4);

INSERT INTO Course_Instructors (course_id, instructor_id) VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (3, 3);

INSERT INTO Enrollments (student_id, course_id, grade) VALUES
  (1, 1, 'A'),
  (1, 2, 'B'),
  (2, 1, 'C'),
  (3, 3, 'B');

SELECT Students.name
FROM Students
JOIN Enrollments ON Students.student_id = Enrollments.student_id
JOIN Courses ON Enrollments.course_id = Courses.course_id
WHERE Courses.title = 'Database Systems';

SELECT Courses.title, Instructors.name
FROM Courses
JOIN Course_Instructors ON Courses.course_id = Course_Instructors.course_id
JOIN Instructors ON Course_Instructors.instructor_id = Instructors.instructor_id
ORDER BY Courses.course_id, Instructors.instructor_id;

SELECT Students.name
FROM Students
LEFT JOIN Enrollments ON Students.student_id = Enrollments.student_id
WHERE Enrollments.course_id IS NULL;

UPDATE Students
SET email = 'alice_new@example.com'
WHERE student_id = 1;

SELECT student_id, name, email
FROM Students
WHERE student_id = 1;

DELETE FROM Courses
WHERE course_id = 2;

SELECT course_id, title, credits
FROM Courses
ORDER BY course_id;
