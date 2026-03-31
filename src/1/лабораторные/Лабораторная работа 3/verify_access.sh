#!/bin/sh
# Проверка прав доступа для ЛР3 (ОСРВ FreeBSD)

echo "--- 1. Создание файла и текущие права ---"
touch test_file
ls -l test_file

echo "--- 2. Изменение прав буквами (u+x, g-r) ---"
chmod u+x,g-r test_file
ls -l test_file

echo "--- 3. Изменение прав цифрами (755) ---"
chmod 755 test_file
ls -l test_file

echo "--- 4. Попытка смены владельца (через sudo/su) ---"
# Это сработает только если скрипт запущен от root
chown root:wheel test_file 2>/dev/null || echo "Ошибка: Нужны права root для смены владельца"
ls -l test_file
