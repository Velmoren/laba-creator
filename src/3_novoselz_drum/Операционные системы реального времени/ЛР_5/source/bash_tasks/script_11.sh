#!/bin/bash

echo "System PATH Security Audit:"
echo $PATH | tr ':' '\n' | while read d; do
    [ -d "$d" ] && printf "%-30s %s\n" "$d" "$(ls -ld "$d" | cut -d' ' -f1)"
done
