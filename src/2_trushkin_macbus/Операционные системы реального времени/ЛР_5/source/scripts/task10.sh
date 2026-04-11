#!/bin/bash

u_count=$(find . -user "$USER" | wc -l)
total=$(find . | wc -l)
other=$((total - u_count))
echo "My files: $u_count"
echo "Other files: $other"
