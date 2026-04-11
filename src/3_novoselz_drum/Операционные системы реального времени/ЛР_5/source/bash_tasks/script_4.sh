#!/bin/bash

echo -n "Who are you? "
read guest
[[ "$guest" == "$USER" ]] && echo "Hello, master $USER" || echo "Intruder alert!"
