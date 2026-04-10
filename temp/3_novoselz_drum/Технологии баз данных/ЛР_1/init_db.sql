/* Скрипт инициализации БД - ЛР 1 */
CREATE DATABASE practice_db;
\c practice_db
CREATE USER db_admin WITH PASSWORD 'admin123';
ALTER DATABASE practice_db OWNER TO db_admin;
