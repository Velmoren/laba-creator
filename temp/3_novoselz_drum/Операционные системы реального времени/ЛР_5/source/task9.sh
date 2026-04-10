#!/usr/local/bin/bash
# Novoselz Task 9: Inode link tracker
read -p "Target file: " TF
if [ -f "$TF" ]; then
    NODE=$(stat -f "%i" "$TF")
    echo "Inode: $NODE. Finding links..."
    find / -inum "$NODE" 2>/dev/null
else
    echo "File not accessible."
fi
