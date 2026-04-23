#!/bin/bash
# 3. Infrastructure inventory
target="infra_inventory.log"
ls -la ~ > "$target"
echo "EXPORT_SUCCESS: $(wc -l < "$target") objects indexed."
