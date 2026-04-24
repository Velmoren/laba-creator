#!/bin/bash
echo "Academic text in nano" > document_nano.txt
echo "Academic text in vim" > document_vim.txt
mkdir -p lab1/project/src lab1/project/bin
ln document_nano.txt lab1/project/hard_lnk
ln -s $(pwd)/document_nano.txt lab1/project/soft_lnk
ls -li document_nano.txt lab1/project/