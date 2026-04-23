#!/bin/bash
# 5. MIME check
[[ -z "$1" ]] && exit 1
file --mime-type "$1"
