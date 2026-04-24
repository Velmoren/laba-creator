#!/bin/bash
sudo groupadd researchers
sudo useradd -m scientist
sudo usermod -aG researchers trushkin
touch classified.dat
sudo chown trushkin:researchers classified.dat
chmod 660 classified.dat
id trushkin
ls -l classified.dat