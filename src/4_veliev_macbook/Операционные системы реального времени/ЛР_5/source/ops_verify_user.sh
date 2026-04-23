#!/bin/bash
# 4. Identity verification
read -p "Enter Engineer ID: " id
if [[ "$id" == "$USER" ]]; then
    echo "STATUS: AUTH_SUCCESS"
else
    echo "STATUS: AUTH_FAILURE"
fi
