#!/bin/bash
# OSRV: automated infrastructure sync
# Scheduled via crontab
SOURCE="/home/veliev/devops_infrastructure"
DEST="/home/veliev/backups/infra_sync"
mkdir -p "$DEST"
rsync -a "$SOURCE/" "$DEST/"
echo "SYNC_SUCCESS: $(date)"
