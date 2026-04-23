#!/bin/bash
mkdir -p lab2/data lab2/configs
touch lab2/data/file.db lab2/configs/main.conf
tar -cf backup.tar lab2/
touch extra.log
tar -rvf backup.tar extra.log
gzip -k backup.tar
bzip2 -k backup.tar
ls -lh backup.tar*
