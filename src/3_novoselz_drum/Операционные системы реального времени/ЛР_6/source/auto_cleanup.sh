#!/bin/bash
# Скрипт для чистки временных файлов
# Запись в дневнике: надеюсь, место не кончится
rm -f /home/novoselz/tmp/*.tmp
echo "Cleanup done for Novoselz at $(date)" >> /home/novoselz/cleanup_history.log
