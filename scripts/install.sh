#!/usr/bin/env bash
# Installe les dépendances npm des stacks sélectionnées.
# Usage : scripts/install.sh [angular] [html] [react] [vue] [--all]
set -euo pipefail
cd "$(dirname "$0")/.."
# shellcheck source=./lib-select-stacks.sh
source scripts/lib-select-stacks.sh
select_stacks "$@"

for stack in "${SELECTED_STACKS[@]}"; do
  echo "── npm install ($stack) ──────────────────────────────────────"
  (cd "$stack" && npm install)
done

echo
echo "Terminé : ${SELECTED_STACKS[*]}"
