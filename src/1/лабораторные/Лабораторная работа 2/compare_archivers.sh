#!/bin/sh
# Демонстрация архивации и сжатия для ЛР2 (ОСРВ FreeBSD)

echo "--- 1. Создание архива из файлов в разных каталогах ---"
tar -cf multi.tar root_dir/D1/D3/HD_D3 root_dir/D2/D4/HD_D4

echo "--- 2. Создание архива всего каталога ---"
tar -cf dir.tar root_dir/D1/D3

echo "--- 3. Создание архива с подкаталогами ---"
tar -cf full.tar root_dir

echo "--- 4. Проверка размеров (tar не сжимает!) ---"
ls -lh multi.tar dir.tar full.tar

echo "--- 5. Сжатие архива (gzip vs bzip2) ---"
gzip -k full.tar
bzip2 -k full.tar

echo "--- 6. Итоговое сравнение размеров ---"
ls -lh full.tar*
