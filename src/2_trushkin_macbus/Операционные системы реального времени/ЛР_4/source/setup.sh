#!/bin/bash
cat <<EOF > metrics.log
001 CPU_Temp Normal Value: 45
002 Mem_Usage High Value: 85
003 Disk_IO ERROR Value: 99
004 Net_Load Normal Value: 20
005 DB_Query ERROR Value: 150
EOF
grep "ERROR" metrics.log
grep "^[0-9]" metrics.log
tail -n 3 metrics.log
tail -c 20 metrics.log
grep "Value" metrics.log | sort -n -k 4
who | wc -l
last | head -n 3