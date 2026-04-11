#!/bin/bash

read -p "Enter username: " input_user
if [ "$input_user" == "$USER" ]; then
    echo "Access granted for $USER"
else
    echo "User mismatch"
fi
