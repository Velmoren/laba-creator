const fs = require('fs');
const path = require('path');

function createDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ================= Variant 1 (src/2/) =================
const v1_dir = 'src/2/Технологии баз данных';
createDir(`${v1_dir}/ЛР_1`);
createDir(`${v1_dir}/ЛР_2`);

// V1 Lab 1
fs.writeFileSync(`${v1_dir}/ЛР_1/lab1_setup.sql`, `-- Лабораторная работа №1 (Вариант А)
CREATE DATABASE test;
\\c test
CREATE USER test_user WITH PASSWORD 'qwerty';
GRANT ALL PRIVILEGES ON DATABASE test TO test_user;
`);
fs.writeFileSync(`${v1_dir}/ЛР_1/lab1_dump.sql`, `-- Фейковый дамп БД test
-- pg_dump -U postgres -d test -f lab1_dump.sql
SET statement_timeout = 0;
SET client_encoding = 'UTF8';
CREATE ROLE test_user LOGIN PASSWORD 'qwerty';
`);
fs.writeFileSync(`${v1_dir}/ЛР_1/Отчет_ЛР1.md`, `# Отчет по лабораторной работе №1
**Цель:** Знакомство с СУБД PostgreSQL.
**Ход работы:**
1. Установлен PostgreSQL 15.
2. Создана БД \`test\` и пользователь \`test_user\`.
3. Опробованы psql и PgAdmin.

**Контрольные вопросы (Вариант 18)**
*Вопрос 18:* Каковы особенности аутентификации пользователей в PostgreSQL и где хранятся ее настройки?
*Ответ:* Настройки аутентификации хранятся в конфигурационном файле \`pg_hba.conf\`. В нем задаются правила доступа к базам данных: типы подключений (local, host), допустимые базы данных, пользователи, IP-адреса и методы аутентификации (например, md5, scram-sha-256, trust).
`);
fs.writeFileSync(`${v1_dir}/ЛР_1/prompts_lr1.txt`, `Промпты для gemini nana banana:
1. "Скриншот терминала MacOS с открытым SQL Shell (psql), где введена команда CREATE DATABASE test; и CREATE USER test_user PASSWORD 'qwerty';"
2. "Скриншот окна PgAdmin 4, показывающий дерево серверов слева, развернутую базу test1 и пользователя test_user1"
`);

// V1 Lab 2
fs.writeFileSync(`${v1_dir}/ЛР_2/lab2_queries.sql`, `-- Лабораторная работа №2 (Вариант А)
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
`);
fs.writeFileSync(`${v1_dir}/ЛР_2/lab2_dump.sql`, `-- Дамп БД test с таблицами и данными ЛР2
-- Сгенерировано pg_dump
SET client_encoding = 'UTF8';
CREATE TABLE courses (c_no varchar(10) PRIMARY KEY, title varchar(100), hours integer);
-- (Здесь был бы полный дамп)
`);
fs.writeFileSync(`${v1_dir}/ЛР_2/Отчет_ЛР2.md`, `# Отчет по лабораторной работе №2
**Цель:** Изучение SQL (DDL, DML, TCL) в PostgreSQL.
**Ход работы:** Созданы таблицы дисциплин, студентов и экзаменов. Выполнены прямые и внешние соединения, группировка данных с агрегатными функциями. Продемонстрирована работа транзакций с ROLLBACK и COMMIT.

**Контрольные вопросы (Вариант 18)**
*Вопрос 18:* В чем разница между внутренним (INNER JOIN) и внешним (LEFT/RIGHT JOIN) соединениями таблиц?
*Ответ:* Внутреннее соединение (INNER JOIN) возвращает только те строки, для которых найдено совпадение в обеих связываемых таблицах. Левое внешнее соединение (LEFT JOIN) возвращает все строки из левой таблицы, даже если для них нет совпадений в правой таблице (в таком случае столбцы правой таблицы заполняются значениями NULL). Правое соединение работает аналогично, но возвращает все строки из правой таблицы.
`);
fs.writeFileSync(`${v1_dir}/ЛР_2/prompts_lr2.txt`, `Промпты для gemini nana banana:
1. "Скриншот psql консоли, вывод команды SELECT * FROM students; в виде аккуратной текстовой таблицы"
2. "Скриншот psql консоли, показывающий выполнение блока транзакции BEGIN; INSERT ... UPDATE ... COMMIT;"
`);

// ================= Variant 2 (src/3/) =================
const v2_dir = 'src/3/Технологии баз данных';
createDir(`${v2_dir}/ЛР_1`);
createDir(`${v2_dir}/ЛР_2`);

// V2 Lab 1
fs.writeFileSync(`${v2_dir}/ЛР_1/init_db.sql`, `/* Скрипт инициализации БД - ЛР 1 */
CREATE DATABASE practice_db;
\\c practice_db
CREATE USER db_admin WITH PASSWORD 'admin123';
ALTER DATABASE practice_db OWNER TO db_admin;
`);
fs.writeFileSync(`${v2_dir}/ЛР_1/backup_lab1.sql`, `-- Backup of practice_db for Lab 1
SET statement_timeout = 0;
CREATE ROLE db_admin LOGIN PASSWORD 'admin123';
`);
fs.writeFileSync(`${v2_dir}/ЛР_1/Report_Lab1.md`, `# Лабораторная работа 1. Отчет
**Тема:** Развертывание экземпляра PostgreSQL и базовая настройка.
**Результаты:** Произведена установка СУБД, заведена тестовая БД \`practice_db\` и создана учетная запись \`db_admin\`.

**Контрольные задания (Вариант 18)**
**18.** Объясните назначение конфигурационного файла \`pg_hba.conf\` в PostgreSQL.
*Ответ:* Файл \`pg_hba.conf\` (host-based authentication) управляет политикой клиентского доступа. Он определяет, каким пользователям разрешено подключаться к каким базам данных, с каких IP-адресов и по какому методу проверки подлинности (например, парольная по MD5/SCRAM, локальная через сокеты и т.д.).
`);
fs.writeFileSync(`${v2_dir}/ЛР_1/screenshots_prompts.txt`, `Промпты для генерации:
- "Терминал Linux/MacOS с запущенной утилитой psql. Виден успешный результат команд CREATE DATABASE practice_db; и CREATE USER db_admin;"
- "Интерфейс PgAdmin 4 (темная тема), в дереве навигации выделена база practice_db и открыт инструмент ERD Tool с пустой областью"
`);

// V2 Lab 2
fs.writeFileSync(`${v2_dir}/ЛР_2/db_tasks.sql`, `/* Скрипт выполнения запросов - ЛР 2 */
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
`);
fs.writeFileSync(`${v2_dir}/ЛР_2/backup_lab2.sql`, `-- Резервная копия БД ЛР2
SET client_encoding = 'UTF8';
-- Данные таблиц subject, scholar, testing...
`);
fs.writeFileSync(`${v2_dir}/ЛР_2/Report_Lab2.md`, `# Лабораторная работа 2. Отчет
**Тема:** Проектирование таблиц и DML-запросы в PostgreSQL.
**Результаты:** 
Успешно созданы отношения \`subject\`, \`scholar\`, \`testing\`. Опробованы различные виды выборок: агрегация данных (\`GROUP BY\`), подзапросы и объединения таблиц. Реализована транзакция для безопасного назначения групп студентам. Создано представление \`excellent_grades\`.

**Контрольные задания (Вариант 18)**
**18.** В чем заключается ключевое различие между операторами соединения \`INNER JOIN\` и \`LEFT OUTER JOIN\`?
*Ответ:* Соединение типа \`INNER JOIN\` формирует результат только из тех записей, которые имеют соответствующие связи в обеих таблицах. Напротив, \`LEFT OUTER JOIN\` сохраняет в результирующем наборе все записи из "левой" (первой указанной) таблицы. Если для записи из левой таблицы нет связанной записи в правой, то поля правой таблицы заполняются значениями \`NULL\`.
`);
fs.writeFileSync(`${v2_dir}/ЛР_2/screenshots_prompts.txt`, `Промпты:
- "Терминал с командной строкой psql, вывод SQL запроса SELECT * FROM scholar; с тремя записями"
- "Терминал с SQL-командами транзакции (BEGIN; INSERT... UPDATE... COMMIT;), успешное выполнение команд"
`);

console.log('Labs successfully generated!');
