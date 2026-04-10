#!/usr/local/bin/bash
# Novoselz Task 4: User identity verification
printf "Who are you? "
read WHOAMI
if [[ "$WHOAMI" == "$(whoami)" ]]; then
    echo "Identity verified: Welcome, $WHOAMI."
else
    echo "Identity mismatch! You claimed to be $WHOAMI, but system says $(whoami)."
fi
