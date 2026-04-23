#!/bin/bash
# 2. Arithmetic unit
A=20; B=150; C=100
D=$(((A*2 + B/3)*C))
echo "DEPLOYMENT_METRIC_VALUE: $D"
