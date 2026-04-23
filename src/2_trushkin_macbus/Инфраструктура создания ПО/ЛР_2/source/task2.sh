#!/bin/bash
# Сценарий для ЛР №2 по Инфраструктуре создания ПО
# Студент: Трушкин (macbus)

# 1. Сборка в ручном режиме через hsh-shell
hsh-shell <<EOF
rpmbuild -bb /usr/src/RPM/SPECS/HelloUniverse.spec
exit
EOF

# 2. Сборка из SRPMS
hsh --verbose ~/RPM/SRPMS/HelloUniverse-1.0-alt1.src.rpm

# 3. Сборка из архива (GEAR-style)
tar -cvzf pkg.tar HelloUniverse-1.0/
hsh --verbose ./pkg.tar
