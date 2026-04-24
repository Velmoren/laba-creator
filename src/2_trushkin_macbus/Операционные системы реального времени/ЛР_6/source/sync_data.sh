#!/bin/bash
SRC="/home/trushkin/lab1"
DST="/home/trushkin/backups"
mkdir -p "$DST"
tar -czf "$DST/archive_$(date +%Y%m%d_%H%M).tar.gz" "$SRC"