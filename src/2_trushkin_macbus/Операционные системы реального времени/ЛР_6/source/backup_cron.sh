#!/bin/bash
# Backup script for cron
mkdir -p /home/trushkin/lab6/backups
tar -czf /home/trushkin/lab6/backups/backup_$(date +%Y%m%d_%H%M%S).tar.gz /home/trushkin/lab1
echo "Backup created at $(date)" >> /home/trushkin/lab6/cron.log
