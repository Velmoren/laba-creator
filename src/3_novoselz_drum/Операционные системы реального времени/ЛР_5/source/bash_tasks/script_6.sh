#!/bin/bash

echo "Scanning for today's updates..."
ls -l | grep "$(date '+%b %e')"
