#!/bin/bash
sudo groupadd developers
sudo useradd -m tester
sudo usermod -aG developers veliev
touch secure.txt
sudo chown veliev:developers secure.txt
chmod 660 secure.txt
id veliev
ls -l secure.txt
