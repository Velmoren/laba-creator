#!/bin/bash
find . -inum $(ls -i "$1" | awk '{print $1}')
