# University Relational Database

This checkpoint designs and queries a normalized university relational database for students, instructors, courses, and enrollments.

## Links

- SQL Fiddle: https://sqlfiddle.com/mysql/online-compiler?id=6efe6345-a954-486d-9c48-45329dbb9d94
- dbdiagram: https://dbdiagram.io/d/University-Relational-Database-6a0b2d249f1f8ec47b4299c7

## ERD

![University Relational Database](<University Relational Database.png>)

## Folder Structure

```text
university-relational-database/
  README.md
  projectplan.md
  University Relational Database.png
  output/
    query_results.txt
  sql/
    university_database.sql
```

## Schema Design

The database is normalized to 3NF:

- `Students` stores student information only.
- `Instructors` stores instructor information only.
- `Courses` stores course information only.
- `Course_Instructors` connects courses and instructors, allowing a course to have more than one instructor.
- `Enrollments` connects students and courses, plus the student's grade.

## Tables

### Students

- `student_id` primary key
- `name` required
- `email` required and unique
- `age` required with `CHECK (age > 17)`

### Instructors

- `instructor_id` primary key
- `name` required
- `department` required

### Courses

- `course_id` primary key
- `title` required and unique
- `credits` required with `CHECK (credits > 0)`

### Course_Instructors

- `course_id` foreign key to `Courses`
- `instructor_id` foreign key to `Instructors`
- Composite primary key: `(course_id, instructor_id)`

### Enrollments

- `student_id` foreign key to `Students`
- `course_id` foreign key to `Courses`
- `grade` checked against valid grade values
- Composite primary key: `(student_id, course_id)`

## SQL File

| File | Purpose |
| --- | --- |
| `sql/university_database.sql` | Creates tables, inserts sample data, and runs all required queries. |
| `output/query_results.txt` | Saved query results. |

## Run

Use this file in SQL Fiddle:

```text
sql/university_database.sql
```

Or run locally with MySQL:

```bash
mysql -u root -p < sql/university_database.sql
```

## Required Queries Covered

- Retrieve all students enrolled in `Database Systems`.
- List all courses along with instructor names.
- Find students who are not enrolled in any course.
- Update the email address of a student.
- Delete a course by its ID.
