#!/usr/local/bin/bash
# Задание 3: Список файлов в домашнем каталоге
output_file="home_files.txt"
ls -p ~ | grep -v / | sort > "$output_file"
echo "Список файлов сохранен в $output_file"
echo "Содержимое (алфавитный порядок):"
cat "$output_file"
echo "Общее количество файлов: $(wc -l < "$output_file")"
