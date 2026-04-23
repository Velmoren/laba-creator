#!/bin/bash
# Сценарий 11: Верификация путей в переменной окружения PATH
# Автор: Трушкин
IFS=':'
for folder in $PATH; do
    if [[ -d "$folder" ]]; then
        ls -ld "$folder"
    fi
done
