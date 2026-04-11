#!/bin/bash

echo "User file ownership statistics:"
echo "Current user ($USER) files: $(find . -user $USER | wc -l)"
