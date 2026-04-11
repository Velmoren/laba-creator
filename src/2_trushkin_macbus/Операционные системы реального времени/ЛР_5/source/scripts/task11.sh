#!/bin/bash

IFS=':' read -ra ADDR <<< "$PATH"
for i in "${ADDR[@]}"; do
    if [ -d "$i" ]; then
        echo "Dir: $i | Permissions: $(ls -ld "$i" | awk '{print $1}')"
    fi
done
