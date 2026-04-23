#!/bin/bash
# 7. Symlink resolver
if [[ -L "$1" ]]; then
    echo "LINK_DETECTED: Target -> $(readlink -f "$1")"
else
    echo "PRIMARY_OBJECT_DETECTED"
fi
