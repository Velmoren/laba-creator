#!/bin/bash
# 11. Сканирую PATH
IFS=':'
for f in $PATH; do
    if [[ -d "$f" ]]; then
        ls -ld "$f"
    fi
done
