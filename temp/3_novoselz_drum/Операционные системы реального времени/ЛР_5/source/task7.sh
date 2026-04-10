#!/usr/local/bin/bash
# Novoselz Task 7: Symlink resolver
read -p "Link path: " LNK
if [ -h "$LNK" ]; then
    echo "RESOLVING LINK: $LNK"
    realpath "$LNK"
else
    echo "NOT A LINK: $LNK"
fi
