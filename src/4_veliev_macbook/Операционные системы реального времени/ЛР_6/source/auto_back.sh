#!/bin/bash
SRC="/home/veliev/projects"
DST="/home/veliev/backups"
mkdir -p "$DST"
if [ "$(ls -A $SRC)" ]; then
    tar -czf "$DST/backup_$(date +%Y%m%d_%H%M).tar.gz" "$SRC"
fi
