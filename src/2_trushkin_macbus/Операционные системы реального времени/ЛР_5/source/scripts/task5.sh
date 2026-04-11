#!/bin/bash

read -p "Enter filename: " fname
if [ -e "$fname" ]; then
    file "$fname"
else
    echo "File not found"
fi
