#!/usr/local/bin/bash
# Задание 10: Файлы пользователя и общее число остальных
target_user=$1
dir=$2
if [ -z "$target_user" ] || [ -z "$dir" ]; then
  echo "Использование: $0 <username> <directory>"
  exit 1
fi

echo "Файлы пользователя $target_user в каталоге $dir:"
find "$dir" -user "$target_user" -maxdepth 1
others_count=$(find "$dir" ! -user "$target_user" -maxdepth 1 | wc -l)
echo "Общее число остальных файлов и каталогов: $((others_count - 1))" # -1 for the directory itself
