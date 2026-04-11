#!/bin/bash

read -p "Find links for file: " f
inode_val=$(stat -f %i "$f")
echo "Searching for inode $inode_val in current subtree..."
find . -inum "$inode_val"
