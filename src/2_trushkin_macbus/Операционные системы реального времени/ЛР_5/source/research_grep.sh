#!/bin/bash
# Сценарий 8: Частотный анализ паттерна в текстовом потоке
# Автор: Трушкин
word=$1; file=$2
if [[ -f "$file" ]]; then
    count=$(grep -c "$word" "$file")
    echo "Частота паттерна '$word' в файле '$file': $count"
else
    echo "Ошибка: целевой файл не обнаружен."
fi
