#!/bin/bash

read -p "Check symlink: " s
if [[ -h "$s" ]]; then
    echo "Symlink detected."
    ls -l "$s"
else
    echo "Regular file or dir"
fi
