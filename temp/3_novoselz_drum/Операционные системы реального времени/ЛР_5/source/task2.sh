#!/usr/local/bin/bash
# Novoselz Task 2: Math formula execution
# D=(A*2 + B/3)*C
read -p "Enter A: " VAL_A
read -p "Enter B: " VAL_B
read -p "Enter C: " VAL_C
RESULT=$(( (VAL_A * 2 + VAL_B / 3) * VAL_C ))
echo "Calculation result for ($VAL_A*2 + $VAL_B/3)*$VAL_C is: $RESULT"
