#!/bin/bash

read -p "Enter file to check for symlink: " target
if [ -L "$input_file" ]; then
    echo "$target is a symbolic link."
    echo "Points to: $(readlink -f $target)"
else
    echo "Not a symbolic link"
fi
