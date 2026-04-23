#!/bin/bash
echo "Ubuntu Lab 1 - Nano" > lab1_nano.txt
echo "Ubuntu Lab 1 - Vim" > lab1_vim.txt
mkdir -p projects/lab1/source projects/lab1/docs
ln lab1_nano.txt projects/lab1/hard_link
ln -s /home/veliev/lab1_nano.txt projects/lab1/soft_link
ls -li lab1_nano.txt projects/lab1/
