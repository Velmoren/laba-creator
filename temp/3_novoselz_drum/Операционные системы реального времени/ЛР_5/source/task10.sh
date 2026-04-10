#!/usr/local/bin/bash
# Novoselz Task 10: Ownership stats
MY_COUNT=$(find . -maxdepth 1 -user $(whoami) | wc -l)
OTHER_COUNT=$(find . -maxdepth 1 ! -user $(whoami) | wc -l)
echo "Current directory ownership summary:"
echo "Owned by me: $MY_COUNT"
echo "Owned by others: $OTHER_COUNT"
