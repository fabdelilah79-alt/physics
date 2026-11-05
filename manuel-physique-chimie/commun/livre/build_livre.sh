#!/bin/sh
# Construit le livre du professeur et le livre de l'élève — XeLaTeX, deux passes.
# Usage : ./build_livre.sh physique_ch3   (nom de base des PDF)
set -e
cd "$(dirname "$0")"
N=${1:-chapitre}
cat preamble.tex body.tex > $N.tex
{ printf '%s\n' '\def\versioneleve{1}'; cat preamble.tex body.tex; } > ${N}_eleve.tex
for f in $N ${N}_eleve; do
  xelatex -interaction=nonstopmode $f.tex > /dev/null || true
  xelatex -interaction=nonstopmode $f.tex | grep -E "^!|Output written" || true
done
grep -c Overfull $N.log ${N}_eleve.log || true
