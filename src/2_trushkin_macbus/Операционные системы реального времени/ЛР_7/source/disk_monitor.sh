#!/bin/bash
echo "--- FS status ---"
df -h --total
echo "--- Mounts ---"
mount | grep -E 'sd[a-z]'