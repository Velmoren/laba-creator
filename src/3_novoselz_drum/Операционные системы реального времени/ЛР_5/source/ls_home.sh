#!/bin/bash
# 3. Сохраняю список файлов
target="home_inventory.txt"
ls ~ > $target
echo "Готово! В твоем домашнем каталоге $(wc -l < $target) объектов."
