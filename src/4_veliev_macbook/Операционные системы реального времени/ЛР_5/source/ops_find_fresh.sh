#!/bin/bash
# 6. Recent artifacts search
echo "Searching for artifacts modified < 24h..."
find . -maxdepth 1 -type f -mtime -1
