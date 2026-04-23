#!/bin/bash
# OSRV Lab 6: Automated Research Data Backup
# Author: Trushkin
# Intended for execution via crontab

SOURCE="/home/trushkin/trushkin_research"
DESTINATION="/home/trushkin/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

mkdir -p "$DESTINATION"
tar -czf "$DESTINATION/academic_v7_backup_$TIMESTAMP.tar.gz" "$SOURCE"
echo "Backup cycle completed successfully at $TIMESTAMP"
