#!/bin/bash
read -p "Username: " val
[ "$val" == "$USER" ] && echo "Match" || echo "No match"
