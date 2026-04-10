#!/usr/local/bin/bash
# Novoselz Task 11: PATH environment audit
echo "--- System PATH Directory Audit ---"
IFS=':'
for d in $PATH; do
    if [ -d "$d" ]; then
        echo "DIR: $d | PERMS: $(ls -ld "$d" | awk '{print $1}')"
    fi
done
