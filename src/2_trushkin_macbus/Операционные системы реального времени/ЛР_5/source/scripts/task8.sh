#!/bin/bash

file=$1
word=$2
if [ -f "$file" ]; then
    res=$(grep -c "$word" "$file")
    echo "Word '$word' found $res times in $file"
else
    echo "Usage: $0 <file> <word>"
fi
