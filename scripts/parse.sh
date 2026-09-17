#!/usr/bin/env bash
# Lance `npx figma connect parse` sur les stacks sélectionnées et agrège le résultat.
# Usage : scripts/parse.sh [angular] [html] [react] [vue] [--all]
set -uo pipefail
cd "$(dirname "$0")/.."
# shellcheck source=./lib-select-stacks.sh
source scripts/lib-select-stacks.sh
select_stacks "$@"

log_dir="$(mktemp -d)"
failed=()
for stack in "${SELECTED_STACKS[@]}"; do
  echo "── parse ($stack) ────────────────────────────────────────────"
  if (cd "$stack" && npx figma connect parse) > "$log_dir/parse-$stack.log" 2>&1; then
    echo "✅ $stack"
  else
    echo "❌ $stack (voir $log_dir/parse-$stack.log)"
    failed+=("$stack")
  fi
done

echo
if [ "${#failed[@]}" -eq 0 ]; then
  echo "Toutes les stacks parsent sans erreur : ${SELECTED_STACKS[*]}"
  exit 0
else
  echo "Échec sur : ${failed[*]}"
  exit 1
fi
