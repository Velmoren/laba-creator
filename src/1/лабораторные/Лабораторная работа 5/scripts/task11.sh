#!/usr/local/bin/bash
# Задание 11: PATH и права доступа
echo "Анализ каталогов в PATH:"
IFS=':' read -ra ADDR <<< "$PATH"
for i in "${ADDR[@]}"; do
  if [ -d "$i" ]; then
    ls -ld "$i"
  fi
done
