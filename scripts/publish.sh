#!/usr/bin/env bash
# Publie vers Figma Dev Mode les stacks sélectionnées, avec le label adapté à chacune.
# Nécessite FIGMA_ACCESS_TOKEN dans l'environnement.
# Usage : scripts/publish.sh [angular] [html] [react] [vue] [--all]
set -uo pipefail
cd "$(dirname "$0")/.."
# shellcheck source=./lib-select-stacks.sh
source scripts/lib-select-stacks.sh
select_stacks "$@"

if [ -z "${FIGMA_ACCESS_TOKEN:-}" ]; then
  echo "FIGMA_ACCESS_TOKEN n'est pas défini. Exemple :" >&2
  echo "  export FIGMA_ACCESS_TOKEN=\"\$(cut -d= -f2- 'angular/.env/token code connect.txt' | tr -d '[:space:]')\"" >&2
  exit 1
fi

# Label lu depuis scripts/stacks.json (source de vérité partagée avec desktop/src/main/stacks.js) :
# évite de dupliquer ce mapping stack->label en dur dans ce script.
label_for() {
  node -e "console.log(require('./scripts/stacks.json').find(s => s.id === process.argv[1]).label)" "$1"
}

log_dir="$(mktemp -d)"
failed=()
for stack in "${SELECTED_STACKS[@]}"; do
  label="$(label_for "$stack")"
  echo "── publish ($stack, label \"$label\") ───────────────────────"
  if (cd "$stack" && FIGMA_ACCESS_TOKEN="$FIGMA_ACCESS_TOKEN" npx figma connect publish --label "$label") \
      > "$log_dir/publish-$stack.log" 2>&1; then
    echo "✅ $stack"
  else
    echo "❌ $stack (voir $log_dir/publish-$stack.log)"
    failed+=("$stack")
  fi
done

echo
if [ "${#failed[@]}" -eq 0 ]; then
  echo "Publication réussie : ${SELECTED_STACKS[*]}"
  exit 0
else
  echo "Échec sur : ${failed[*]}"
  exit 1
fi
