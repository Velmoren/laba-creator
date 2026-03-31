#!/bin/sh
# Скрипт для создания имитации дисков
dd if=/dev/zero of=usb_test.img bs=1M count=10
mdconfig -a -t vnode -f usb_test.img -u 0
newfs /dev/md0
# Теперь можно монтировать: mount /dev/md0 /mnt