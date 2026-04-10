/* Скрипт выполнения запросов - ЛР 2 */
CREATE TABLE subject (
    sub_id VARCHAR(15) PRIMARY KEY,
    name VARCHAR(150),
    lec_hours INTEGER
);
INSERT INTO subject VALUES ('SUB1', 'Проектирование БД', 34), ('SUB2', 'Компьютерные сети', 51), ('SUB3', 'Основы алгоритмизации', 68);

CREATE TABLE scholar (
    stud_id SERIAL PRIMARY KEY,
    fullname VARCHAR(100),
    enrollment_year INTEGER
);
INSERT INTO scholar (fullname, enrollment_year) VALUES ('Смирнов Алексей', 2022), ('Кузнецова Елена', 2023), ('Морозов Дмитрий', 2022);

CREATE TABLE testing (
    stud_id INTEGER REFERENCES scholar(stud_id),
    sub_id VARCHAR(15) REFERENCES subject(sub_id),
    grade INTEGER,
    PRIMARY KEY(stud_id, sub_id)
);
INSERT INTO testing VALUES (1, 'SUB1', 5), (1, 'SUB2', 3), (2, 'SUB1', 4), (3, 'SUB3', 5);

SELECT * FROM subject;
SELECT DISTINCT enrollment_year FROM scholar;
SELECT sc.fullname, t.grade FROM scholar sc INNER JOIN testing t ON sc.stud_id = t.stud_id WHERE t.sub_id = 'SUB1';
SELECT s.name, COUNT(t.grade) AS exam_count FROM subject s LEFT OUTER JOIN testing t ON s.sub_id = t.sub_id GROUP BY s.name HAVING COUNT(t.grade) > 0;

/* Работа с транзакциями */
CREATE TABLE stud_groups (
    group_code VARCHAR(15) PRIMARY KEY,
    monitor_id INTEGER NOT NULL
);
ALTER TABLE scholar ADD COLUMN group_code VARCHAR(15);
BEGIN;
INSERT INTO stud_groups VALUES ('B-202', 1);
UPDATE scholar SET group_code = 'B-202';
COMMIT;

CREATE VIEW excellent_grades AS 
SELECT sc.fullname, s.name, t.grade 
FROM scholar sc 
JOIN testing t ON sc.stud_id=t.stud_id 
JOIN subject s ON t.sub_id=s.sub_id 
WHERE t.grade = 5;
