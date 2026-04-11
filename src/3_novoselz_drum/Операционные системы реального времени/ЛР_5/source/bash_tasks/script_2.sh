#!/bin/bash

echo "Math computation: (A*2 + B/3)*C"
read -p "val A: " vA
read -p "val B: " vB
read -p "val C: " vC
result=$(( (vA*2 + vB/3) * vC ))
echo "Final value: $result"
