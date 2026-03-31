#!/usr/local/bin/bash
# Задание 1: Вывод параметров с их номерами
i=1
for arg in "$@"; do
  echo "Параметр #$i: $arg"
  i=$((i+1))
done
