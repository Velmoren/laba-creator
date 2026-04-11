#!/bin/bash

file=$1
if [ -f "$file" ]; then
    inode=$(ls -i "$file" | awk '{print $1}')
    echo "Searching for hard links with inode $inode..."
    find / -inum "$inode" 2>/dev/null
else
    echo "Usage: $0 <file>"
fi
