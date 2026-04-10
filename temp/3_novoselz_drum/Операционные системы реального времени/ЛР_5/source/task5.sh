#!/usr/local/bin/bash
# Novoselz Task 5: Dynamic file type detection
echo "--- File Type Checker ---"
read -p "Path to object: " OBJ_PATH
if [ -e "$OBJ_PATH" ]; then
    DESC=$(file -b "$OBJ_PATH")
    echo "Object '$OBJ_PATH' is: $DESC"
else
    echo "Error: Path not found."
fi
