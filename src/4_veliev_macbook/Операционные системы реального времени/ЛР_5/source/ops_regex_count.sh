#!/bin/bash
# 8. Pattern statistics
pattern=$1; target=$2
if [[ -f "$target" ]]; then
    echo "PATTERN_COUNT: $(grep -c "$pattern" "$target")"
else
    echo "ERROR: TARGET_NOT_FOUND"
fi
