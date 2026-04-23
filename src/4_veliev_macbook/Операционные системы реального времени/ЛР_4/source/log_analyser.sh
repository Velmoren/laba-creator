#!/bin/bash
cat <<EOF > system_data.txt
001 Disk_Unit Active Price: 50
002 Mem_Block Active Price: 30
003 CPU_Core Inactive Price: 150
004 Net_Interface Active Price: 40
005 Power_Supply Active Price: 60
EOF

grep "Active" system_data.txt
grep "^[0-9]" system_data.txt

tail -n 3 system_data.txt
tail -c 15 system_data.txt

grep "Price" system_data.txt | sort -n -k 4

who | wc -l
last | head -n 3
