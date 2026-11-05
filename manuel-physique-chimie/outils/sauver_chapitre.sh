#!/bin/sh
# Range un dossier de travail dans le dépôt : fichiers propres au chapitre -> chapitres/<nom>,
# améliorations des fichiers communs (bibliothèques, moteur, modèles) -> commun/.
# Usage : outils/sauver_chapitre.sh /chemin/travail chapitres/<nom>
set -e
RACINE=$(cd "$(dirname "$0")/.." && pwd); T=$(cd "$1" && pwd); mkdir -p "$2"; CH=$(cd "$2" && pwd); C=$RACINE/commun
mkdir -p "$CH/livre/images" "$CH/livre/figures_html" "$CH/pres/src" "$CH/fiches/images"
# propres au chapitre
for f in body.tex chapitre.tex fiche_unique.tex; do [ -f "$T/livre/$f" ] && cp "$T/livre/$f" "$CH/livre/"; done
cp "$T/livre/figures_html/render_book.py" "$CH/livre/figures_html/"
for f in "$T/livre/images/"*; do case $(basename "$f") in ic_*) ;; *) cp "$f" "$CH/livre/images/";; esac; done
cp "$T/pres/src/"scenes_*.js "$CH/pres/src/"; [ -f "$T/pres/src/slides.html" ] && cp "$T/pres/src/slides.html" "$CH/pres/src/"
for f in gen_slides.py presentation.json; do [ -f "$T/pres/$f" ] && cp "$T/pres/$f" "$CH/pres/"; done
cp "$T/fiches/"contenu_*.tex "$CH/fiches/"; for f in "$T/fiches/images/"opener_*; do [ -f "$f" ] && cp "$f" "$CH/fiches/images/"; done
# communs (améliorations réutilisables)
cp "$T/pres/src/figlib.js" "$T/pres/src/realisme.js" "$T/pres/src/engine.js" "$T/pres/src/style.css" "$C/presentation/src/"
cp "$T/pres/build.py" "$T/pres/shoot.py" "$C/presentation/"
cp "$T/livre/preamble.tex" "$T/livre/build_livre.sh" "$C/livre/"; cp "$T/livre/figures_html/book_style.css" "$C/livre/figures_html/"
cp "$T/fiches/entete_fiche.tex" "$T/fiches/outils_fiche.tex" "$C/fiches_pedagogiques/"
echo "Chapitre rangé dans $CH ; fichiers communs mis à jour. Vérifier avec : git status"
