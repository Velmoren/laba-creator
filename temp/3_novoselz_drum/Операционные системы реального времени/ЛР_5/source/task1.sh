#!/usr/local/bin/bash
# Novoselz Task 1: Script params display
echo "--- Script Arguments Analysis ---"
echo "Total count: $#"
echo "List: $@"
for i in $(seq 1 $#); do
    echo "Param $i: ${!i}"
done
