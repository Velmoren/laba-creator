#!/bin/bash

echo "--- Arguments Analysis ---"
for i in $(seq 1 $#); do
    echo "Arg $i: ${!i}"
done
