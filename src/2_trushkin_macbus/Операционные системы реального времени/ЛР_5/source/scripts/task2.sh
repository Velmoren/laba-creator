#!/bin/bash

read -p "Enter A: " A
read -p "Enter B: " B
read -p "Enter C: " C
D=$(( (A*2 + B/3) * C ))
echo "Result D = (A*2 + B/3)*C is: $D"
