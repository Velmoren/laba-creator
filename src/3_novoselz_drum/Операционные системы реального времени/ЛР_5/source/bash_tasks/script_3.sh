#!/bin/bash

find ~ -maxdepth 1 > my_home_content.log
echo "Total objects in home: $(wc -l < my_home_content.log)"
