#!/bin/bash

ls ~ > home_files.txt
count=$(wc -l < home_files.txt)
echo "Home directory has $count files. List saved to home_files.txt"
