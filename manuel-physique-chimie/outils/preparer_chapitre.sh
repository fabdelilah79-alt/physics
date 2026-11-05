#!/bin/sh
# Assemble un dossier de travail complet pour un chapitre : fichiers communs + fichiers du chapitre.
# Usage : outils/preparer_chapitre.sh chapitres/physique_ch3_travail_energie_cinetique /chemin/travail
set -e
RACINE=$(cd "$(dirname "$0")/.." && pwd); CH=$(cd "$1" && pwd); T=$2; C=$RACINE/commun
mkdir -p "$T/livre/images" "$T/livre/fonts" "$T/livre/figures_html" "$T/pres/src" "$T/pres/fonts" "$T/fiches/images" "$T/fiches/fonts" "$T/icons"
# communs
cp "$C/livre/preamble.tex" "$C/livre/build_livre.sh" "$T/livre/"; cp "$C/livre/figures_html/book_style.css" "$T/livre/figures_html/"
cp "$C/charte/polices/ttf/"* "$T/livre/fonts/"; cp "$C/charte/polices/ttf/"* "$T/fiches/fonts/"; cp "$C/charte/polices/woff/"* "$T/pres/fonts/"
cp "$C/icones/png/"ic_*.png "$T/livre/images/"; cp "$C/icones/png/"*.png "$T/fiches/images/"; cp "$C/icones/make_icons.py" "$T/icons/"
cp "$C/presentation/src/"* "$T/pres/src/"; cp "$C/presentation/build.py" "$C/presentation/shoot.py" "$T/pres/"
cp "$C/fiches_pedagogiques/"*.tex "$T/fiches/"
# chapitre (écrase les modèles s'il a ses propres versions)
cp -r "$CH/livre/." "$T/livre/"; cp -r "$CH/pres/." "$T/pres/"; cp -r "$CH/fiches/." "$T/fiches/"
[ -f "$T/livre/figures_html/render_book.py" ] || cp "$C/livre/figures_html/render_book.py" "$T/livre/figures_html/"
[ -f "$T/livre/chapitre.tex" ] || cp "$C/livre/chapitre.tex" "$T/livre/"
[ -f "$T/pres/presentation.json" ] || cp "$C/presentation/presentation.json" "$T/pres/"
chmod +x "$T/livre/build_livre.sh"
echo "Dossier de travail prêt : $T"
