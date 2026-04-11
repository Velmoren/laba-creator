#!/bin/bash

filename=$1
pattern=$2
[ -z "$2" ] && echo "Err: missing args" && exit
echo "Occurrences: $(grep -o "$pattern" "$filename" | wc -l)"
