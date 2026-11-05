#!/bin/sh
# Crée le squelette d'un nouveau chapitre à partir du chapitre exemple, puis un dossier de travail.
# Usage : outils/nouveau_chapitre.sh physique_ch4_<titre> /chemin/travail
set -e
RACINE=$(cd "$(dirname "$0")/.." && pwd); N=$1; T=$2; CH=$RACINE/chapitres/$N
[ -e "$CH" ] && { echo "Le chapitre $N existe déjà"; exit 1; }
mkdir -p "$CH/livre/figures_html" "$CH/pres/src" "$CH/fiches" "$CH/programme" "$CH/cours"
cp "$RACINE/commun/livre/chapitre.tex" "$CH/livre/"; cp "$RACINE/commun/livre/figures_html/render_book.py" "$CH/livre/figures_html/"
cp "$RACINE/commun/presentation/presentation.json" "$CH/pres/"; cp "$RACINE/commun/presentation/gen_slides_exemple.py" "$CH/pres/gen_slides.py"
echo "À adapter : livre/chapitre.tex, pres/presentation.json, la liste FIGS de render_book.py ; écrire body.tex, scenes_*.js, gen_slides.py, contenu_*.tex"
"$RACINE/outils/preparer_chapitre.sh" "$CH" "$T"
