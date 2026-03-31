#!/usr/local/bin/bash
# Задание 4: Сравнение имени пользователя
read -p "Введите имя пользователя: " input_name
if [ "$input_name" = "$USER" ]; then
  echo "верно"
else
  echo "неверно"
fi
