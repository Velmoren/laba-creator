#!/bin/bash
echo "--- Filesystems status ---"
df -h --total
echo "--- Directory Size ---"
sudo du -sh /home/veliev
echo "--- Active mounts ---"
mount | grep -E 'sd[a-z]'
