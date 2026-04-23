#!/bin/bash
# 11. PATH security audit
IFS=':'
for d in $PATH; do
    [[ -d "$d" ]] && ls -ld "$d"
done
