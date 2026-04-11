#!/bin/bash

echo "Probing file type..."
read -p "Path: " p
[ -f "$p" ] && file "$p" || echo "Invalid path"
