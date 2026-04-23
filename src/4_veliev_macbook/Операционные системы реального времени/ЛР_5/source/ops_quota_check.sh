#!/bin/bash
# 10. Quota check
u_files=$(find . -user "$USER" | wc -l)
total=$(find . | wc -l)
echo "OWNER_COUNT: $u_files"
echo "SYSTEM_COUNT: $((total - u_files))"
