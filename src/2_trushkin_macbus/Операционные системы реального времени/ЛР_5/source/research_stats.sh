#!/bin/bash
# Сценарий 10: Статистический анализ распределения владения
# Автор: Трушкин
user_total=$(find . -user "$USER" | wc -l)
system_total=$(find . | wc -l)
echo "Объектов исследователя: $user_total"
echo "Объектов прочих субъектов: $((system_total - user_total))"
