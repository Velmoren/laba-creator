-- Фейковый дамп БД test
-- pg_dump -U postgres -d test -f lab1_dump.sql
SET statement_timeout = 0;
SET client_encoding = 'UTF8';
CREATE ROLE test_user LOGIN PASSWORD 'qwerty';
