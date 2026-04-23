#!/bin/bash
# Сценарий для ЛР №1 по Инфраструктуре создания ПО
# Студент: Трушкин (macbus)

# 1. Установка пакета
sudo apt-get update
sudo apt-get install -y HelloUniverse

# 2. Проверка запуска
HelloUniverse

# 3. Инспекция метаданных
rpm -qi HelloUniverse

# 4. Удаление пакета
sudo apt-get remove -y HelloUniverse
