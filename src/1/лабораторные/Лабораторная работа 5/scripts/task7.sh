#!/usr/local/bin/bash
# Задание 7: Цепочка ссылок
file=$1
if [ -z "$file" ]; then
  echo "Использование: $0 <filename>"
  exit 1
fi

if [ -L "$file" ]; then
  echo "Файл является ссылкой."
  current="$file"
  while [ -L "$current" ]; do
    next=$(readlink "$current")
    echo "$current -> $next"
    current="$next"
  done
else
  echo "Файл не является символической ссылкой."
fi
