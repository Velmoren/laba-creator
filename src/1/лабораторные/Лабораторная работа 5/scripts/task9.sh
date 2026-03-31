#!/usr/local/bin/bash
# Задание 9: Жесткие ссылки на один файл
dir=$1
if [ -z "$dir" ]; then
  dir="."
fi
echo "Поиск жестких ссылок в $dir:"
ls -li "$dir" | awk '{print $1, $9}' | sort | uniq -d -f 1 --all-repeated=separate
