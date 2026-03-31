#!/usr/local/bin/bash
# Задание 8: Подсчет слова в ISO-8859 text
file=$1
word=$2
if [ -z "$file" ] || [ -z "$word" ]; then
  echo "Использование: $0 <filename> <word>"
  exit 1
fi

type=$(file "$file")
if [[ "$type" == *"ISO-8859 text"* ]] || [[ "$type" == *"ASCII text"* ]]; then
  count=$(grep -o "$word" "$file" | wc -l)
  echo "Слово '$word' встречается в файле $count раз."
else
  echo "Файл не является текстом (найден тип: $type). Подсчет не производится."
fi
