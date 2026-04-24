#!/bin/bash
echo 'echo "Params: $1, $2"' > task1.sh
echo 'echo "Result: $(( ($1*2 + $2/2) * $3 ))"' > task2.sh
echo 'ls ~ > list.txt && wc -l list.txt' > task3.sh
echo 'read -p "Username: " val; [ "$val" == "$USER" ] && echo "Match" || echo "No match"' > task4.sh
echo 'file "$1"' > task5.sh
echo 'find . -maxdepth 1 -mtime 0' > task6.sh
echo '[ -L "$1" ] && readlink -f "$1" || echo "Not a link"' > task7.sh
echo 'grep -c "$1" "$2"' > task8.sh
echo 'find . -inum $(ls -i "$1" | awk "{print \$1}")' > task9.sh
echo 'find ~ -user "$USER" | wc -l' > task10.sh
echo 'IFS=:; for d in $PATH; do [ -d "$d" ] && ls -ld "$d"; done' > task11.sh
chmod +x task*.sh