#!/bin/bash

echo "Files modified today in current dir:"
find . -maxdepth 1 -type f -mtime 0
