#!/bin/bash
IFS=:; for d in $PATH; do [ -d "$d" ] && ls -ld "$d"; done
