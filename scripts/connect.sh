#!/usr/bin/env bash
# Lance une commande `figma connect` (parse, publish ou unpublish) sur les stacks sélectionnées.
# Les familles de components/ servent les quatre stacks : scripts/catalog.mjs génère, pour la
# stack visée, le lot et la config (URLs du figma.config.json racine) dans .codeconnect/.
# Usage : scripts/connect.sh <parse|publish|unpublish> [angular] [html] [react] [vue] [--all]
set -uo pipefail
cd "$(dirname "$0")/.."

command="${1:-}"
case "$command" in
  parse|publish|unpublish) shift ;;
  *)
    echo "Usage : scripts/connect.sh <parse|publish|unpublish> [stacks...|--all]" >&2
    exit 1
    ;;
esac

# shellcheck source=./lib-select-stacks.sh
source scripts/lib-select-stacks.sh
select_stacks "$@"

# Le token se range une seule fois dans .env à la racine (cf. .env.example). Le CLI ne lit que
# le .env du dossier courant : on le charge ici pour qu'il vaille quelle que soit la commande.
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

if [ "$command" != "parse" ] && [ -z "${FIGMA_ACCESS_TOKEN:-}" ]; then
  echo "FIGMA_ACCESS_TOKEN n'est pas défini : copiez .env.example en .env et renseignez votre token." >&2
  exit 1
fi

# Label lu depuis scripts/stacks.json (source de vérité partagée avec desktop/src/main/stacks.js).
label_for() {
  node -e "console.log(require('./scripts/stacks.json').find(s => s.id === process.argv[1]).label)" "$1"
}

log_dir="$(mktemp -d)"
failed=()
for stack in "${SELECTED_STACKS[@]}"; do
  if ! config="$(node scripts/catalog.mjs prepare "$stack")"; then
    echo "❌ $stack (préparation du catalogue)"
    failed+=("$stack")
    continue
  fi
  args=(connect "$command" --dir . --config "$config" --skip-update-check)
  [ "$command" != "parse" ] && args+=(--label "$(label_for "$stack")")
  echo "── $command ($stack) ────────────────────────────────────────"
  if npx figma "${args[@]}" > "$log_dir/$command-$stack.log" 2>&1; then
    echo "✅ $stack"
  else
    echo "❌ $stack (voir $log_dir/$command-$stack.log)"
    failed+=("$stack")
  fi
done

echo
if [ "${#failed[@]}" -eq 0 ]; then
  echo "$command réussi : ${SELECTED_STACKS[*]}"
  exit 0
else
  echo "Échec sur : ${failed[*]}"
  exit 1
fi
