#!/bin/bash
# 6. Поиск свежака
echo "Ищу файлы, которые менялись за последние 24 часа..."
find . -maxdepth 1 -type f -mtime -1
