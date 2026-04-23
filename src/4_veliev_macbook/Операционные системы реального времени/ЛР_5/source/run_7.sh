#!/bin/bash
[ -L "$1" ] && readlink -f "$1" || echo "Not a link"
