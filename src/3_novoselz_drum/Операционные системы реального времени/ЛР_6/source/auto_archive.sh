#!/bin/bash
# Backup script for cron
tar -czf /home/novoselz/cron_archives/backup_$(date +%Y%m%d_%H%M%S).tar.gz /home/novoselz/workspace