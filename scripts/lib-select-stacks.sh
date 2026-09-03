#!/usr/bin/env bash
# Fonction partagée : détermine la liste des stacks à traiter.
# - Arguments passés (angular html react vue, ou --all) -> sélection directe.
# - Aucun argument -> prompt interactif (tout coché par défaut).
# Usage : source ce fichier puis appeler `select_stacks "$@"`, résultat dans $SELECTED_STACKS (array).

ALL_STACKS=(angular html react vue)

select_stacks() {
  if [ "$#" -gt 0 ]; then
    if [ "$1" = "--all" ]; then
      SELECTED_STACKS=("${ALL_STACKS[@]}")
      return
    fi
    for arg in "$@"; do
      valid=false
      for s in "${ALL_STACKS[@]}"; do
        [ "$arg" = "$s" ] && valid=true
      done
      if [ "$valid" = false ]; then
        echo "Stack inconnue : '$arg' (attendu : ${ALL_STACKS[*]})" >&2
        exit 1
      fi
    done
    SELECTED_STACKS=("$@")
    return
  fi

  if [ ! -t 0 ]; then
    # Pas de terminal interactif (CI, pipe) : on prend tout par défaut.
    SELECTED_STACKS=("${ALL_STACKS[@]}")
    return
  fi

  echo "Quelles stacks souhaitez-vous traiter ? (Entrée = toutes)"
  SELECTED_STACKS=()
  for s in "${ALL_STACKS[@]}"; do
    read -r -p "  $s ? [O/n] " reply
    reply="${reply:-o}"
    case "$reply" in
      [oOyY]*) SELECTED_STACKS+=("$s") ;;
    esac
  done

  if [ "${#SELECTED_STACKS[@]}" -eq 0 ]; then
    echo "Aucune stack sélectionnée, abandon." >&2
    exit 1
  fi
}
