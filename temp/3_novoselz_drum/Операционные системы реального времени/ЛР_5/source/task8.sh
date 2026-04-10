#!/usr/local/bin/bash
# Novoselz Task 8: Keyword counter in text
read -p "File: " F
read -p "Pattern: " P
if [ -f "$F" ] && [[ $(file -bi "$F") == text/* ]]; then
    TOTAL=$(grep -o "$P" "$F" | wc -l)
    echo "Occurrences of '$P' in '$F': $TOTAL"
else
    echo "Invalid target: Must be a text file."
fi
