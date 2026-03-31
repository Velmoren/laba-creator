#!/usr/local/bin/bash
# Задание 5: Тип файла
read -p "Введите имя файла в текущем каталоге: " filename
if [ -e "$filename" ]; then
  file "$filename"
else
  echo "Файл не найден"
fi
