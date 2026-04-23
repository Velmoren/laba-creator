#!/bin/bash
# 8. Считаю вхождения слова
word=$1; file=$2
if [[ -f "$file" ]]; then
    echo "Слово '$word' встретилось в '$file' столько раз: $(grep -c "$word" "$file")"
else
    echo "Файла не существует."
fi
