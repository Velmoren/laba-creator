#!/bin/bash
# 10. Моя статистика файлов
my=$(find . -user "$USER" | wc -l)
all=$(find . | wc -l)
echo "Твоих файлов: $my. Чужих: $((all - my))"
