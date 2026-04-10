-- Лабораторная работа №2 (Вариант А)
CREATE TABLE courses (c_no VARCHAR(10) PRIMARY KEY, title VARCHAR(100), hours INT);
INSERT INTO courses VALUES ('C1', 'Базы данных', 36), ('C2', 'Сети ЭВМ', 36), ('C3', 'Программирование', 72);

CREATE TABLE students (s_id INT PRIMARY KEY, name VARCHAR(50), start_year INT);
INSERT INTO students VALUES (1, 'Иванов Иван', 2021), (2, 'Петров Петр', 2022), (3, 'Сидорова Анна', 2021);

CREATE TABLE exams (s_id INT REFERENCES students(s_id), c_no VARCHAR(10) REFERENCES courses(c_no), score INT, PRIMARY KEY(s_id, c_no));
INSERT INTO exams VALUES (1, 'C1', 5), (1, 'C2', 4), (2, 'C1', 3), (3, 'C3', 5);

SELECT * FROM courses;
SELECT DISTINCT start_year FROM students;
SELECT s.name, e.score FROM students s JOIN exams e ON s.s_id = e.s_id WHERE e.c_no = 'C1';
SELECT c.title, AVG(e.score) FROM courses c LEFT JOIN exams e ON c.c_no = e.c_no GROUP BY c.title HAVING AVG(e.score) > 3;

-- Транзакции
CREATE TABLE groups (g_no VARCHAR(10) PRIMARY KEY, head_s_id INT NOT NULL);
ALTER TABLE students ADD COLUMN g_no VARCHAR(10);
BEGIN;
INSERT INTO groups VALUES ('A-101', 3);
UPDATE students SET g_no = 'A-101';
COMMIT;

CREATE VIEW high_scores AS SELECT s.name, c.title, e.score FROM students s JOIN exams e ON s.s_id=e.s_id JOIN courses c ON e.c_no=c.c_no WHERE e.score = 5;
