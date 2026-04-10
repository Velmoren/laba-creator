-- Лабораторная работа №1 (Вариант А)
CREATE DATABASE test;
\c test
CREATE USER test_user WITH PASSWORD 'qwerty';
GRANT ALL PRIVILEGES ON DATABASE test TO test_user;
