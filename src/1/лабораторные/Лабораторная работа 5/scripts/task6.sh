#!/usr/local/bin/bash
# Задание 6: Файлы в каталоге, созданные в один день
dir=$1
if [ -z "$dir" ]; then
  dir="."
fi
echo "Группировка файлов по дате создания в $dir:"
ls -l "$dir" | grep -v '^d' | awk '{print $6, $7, $9}' | sort | awk '
{
  date = $1 " " $2
  if (date == prev_date) {
    files = files ", " $3
  } else {
    if (prev_date != "") print prev_date ": " files
    prev_date = date
    files = $3
  }
}
END { if (prev_date != "") print prev_date ": " files }'
