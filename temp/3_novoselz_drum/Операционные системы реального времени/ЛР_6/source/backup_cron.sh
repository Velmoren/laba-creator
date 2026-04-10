#!/usr/local/bin/bash
# Novoselz Backup Manager
# Task: Compress labs and move to safe location
WORK_DIR="/home/novoselz/osrv_labs"
BACKUP_PATH="/home/novoselz/backups"
FILE_NAME="labs_snapshot_$(date +%d_%m_%H_%M).tar.gz"

mkdir -p "$BACKUP_PATH"

if [ -d "$WORK_DIR" ]; then
    echo "Processing backup for: $WORK_DIR"
    tar -czf "$BACKUP_PATH/$FILE_NAME" "$WORK_DIR"
    echo "Success: $FILE_NAME created in $BACKUP_PATH"
else
    echo "Source folder not found: $WORK_DIR"
fi
