#!/bin/bash
# 9. Inode mapper
inode_id=$(ls -i "$1" | awk '{print $1}')
echo "MAPPING_INODE: $inode_id"
find . -inum "$inode_id"
