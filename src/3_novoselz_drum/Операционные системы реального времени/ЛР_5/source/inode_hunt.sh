#!/bin/bash
# 9. Охота за инодами
inode=$(ls -i "$1" | awk '{print $1}')
echo "Ищу все файлы с инодом $inode в текущей папке:"
find . -inum "$inode"
