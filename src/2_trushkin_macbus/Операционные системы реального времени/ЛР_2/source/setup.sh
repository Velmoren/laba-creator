#!/bin/bash
mkdir -p lab2/records lab2/binaries
touch lab2/records/data.csv lab2/binaries/app.bin
tar -cf dataset.tar lab2/
touch update.log
tar -rvf dataset.tar update.log
gzip -k dataset.tar
bzip2 -k dataset.tar
ls -lh dataset.tar*