#!/usr/local/bin/bash
# Novoselz Task 6: Filter files by today's date
MONTH_DAY=$(date "+%b %d")
echo "Filtering files from: $MONTH_DAY"
ls -l | grep "$MONTH_DAY" | awk '{print $9}'
