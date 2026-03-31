#!/bin/sh
# Скрипт подготовки структуры для Лабораторной работы №1 (ОСРВ FreeBSD)

echo "Создание структуры каталогов..."
mkdir -p root_dir/D1/D3/D6 root_dir/D2/D4 root_dir/D2/D5

echo "Создание файлов..."
touch root_dir/HD
touch root_dir/D1/D3/HD_D3
touch root_dir/D1/D3/D6/HD_D6
echo "Original Content of HD_D4" > root_dir/D2/D4/HD_D4
touch root_dir/D2/D5/HD_D5

echo "Создание ссылок..."
# Жесткая ссылка
ln root_dir/D2/D4/HD_D4 root_dir/D2/D4/HD1_D4
# Символическая ссылка
ln -s HD_D4 root_dir/D2/D4/SL_D4

echo "Структура успешно создана в каталоге 'root_dir'!"
ls -R root_dir
