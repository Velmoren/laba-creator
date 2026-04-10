#!/usr/local/bin/bash
# Novoselz Task 3: Home directory snapshot
TARGET_FILE="$HOME/snapshot_files.txt"
ls -Ap $HOME | grep -v / > "$TARGET_FILE"
LINES=$(wc -l < "$TARGET_FILE")
echo "Snapshot created at $TARGET_FILE. Total files found: $LINES"
