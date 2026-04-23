#!/bin/bash
# Сценарий 9: Поиск объектов по идентификатору inode
# Автор: Трушкин
if [[ -z "$1" ]]; then exit 1; fi
inode_num=$(ls -i "$1" | awk '{print $1}')
echo "Поиск дубликатов для дескриптора $inode_num:"
find . -inum "$inode_num"
