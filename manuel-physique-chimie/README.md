# Manuel de physique-chimie — kit de production des chapitres

1re année du baccalauréat, Sciences expérimentales (option française).
Pour chaque cours (.docx + captures du programme), on produit :

1. le **livre** LaTeX : version professeur + version élève à compléter (même source) ;
2. la **présentation animée** hors ligne (un seul fichier HTML, 1600 × 900) ;
3. la **fiche d'activités** à coller dans le cahier ;
4. la **fiche pédagogique** (A4 paysage).

Ce dépôt garde tout ce qui est commun (charte, polices, icônes, styles, moteurs, modèles)
pour ne plus rien reconstruire d'un chapitre à l'autre.

## Organisation

```
commun/                     fichiers partagés par tous les chapitres
  charte/                   couleurs (couleurs.md, .tex, .css) et polices (TTF pour LaTeX, WOFF pour le web)
  icones/                   make_icons.py + icônes ic_* (rubriques du livre) et fi_* (fiche pédagogique)
  livre/                    preamble.tex (charte, rubriques, macros \rep \trou \cel …), chapitre.tex (exemple),
                            build_livre.sh, figures_html/ (render_book.py, book_style.css)
  presentation/             src/ (figlib.js, realisme.js, engine.js, style.css), build.py, shoot.py,
                            presentation.json (exemple), gen_slides_exemple.py (helpers + exemple complet)
  fiches_pedagogiques/      entete_fiche.tex + outils_fiche.tex (modèles)
  fiche_activites/          fiche_unique_exemple.tex
chapitres/<nom>/            uniquement ce qui est propre au chapitre
  livre/                    body.tex, chapitre.tex, fiche_unique.tex, images/ (figures exportées), figures_html/render_book.py
  pres/                     src/scenes_*.js, gen_slides.py, src/slides.html, presentation.json
  fiches/                   contenu_*.tex, images/opener_*.jpg
  cours/, programme/        cours de l'enseignant et captures du programme
archives/                   modèles et contenus des chapitres précédents (ch1 rotation, fiches ch1–ch5, cours .docx)
outils/                     preparer_chapitre.sh, sauver_chapitre.sh, nouveau_chapitre.sh
CONSIGNES.md                exigences de l'enseignant (à relire avant chaque chapitre)
HISTORIQUE.md               chapitres réalisés et décisions importantes
```

## Travailler sur un chapitre

Les commandes se lancent depuis le dossier `manuel-physique-chimie/` (branche `manuel-physique-chimie` du dépôt `physics`).

```sh
cd manuel-physique-chimie
# nouveau chapitre : squelette + dossier de travail complet
outils/nouveau_chapitre.sh physique_ch4_energie_potentielle /tmp/travail
# reprendre un chapitre existant
outils/preparer_chapitre.sh chapitres/physique_ch3_travail_energie_cinetique /tmp/travail

cd /tmp/travail/pres && python3 gen_slides.py && python3 build.py && python3 shoot.py
cd /tmp/travail/livre/figures_html && python3 render_book.py      # figures du livre (PNG ×4)
cd /tmp/travail/livre && ./build_livre.sh physique_ch4             # livres professeur et élève
cd /tmp/travail/livre && xelatex fiche_unique.tex && xelatex fiche_unique.tex
cd /tmp/travail/fiches && cat entete_fiche.tex outils_fiche.tex contenu_*.tex > Fiche_pedagogique.tex && xelatex Fiche_pedagogique.tex

# ranger le travail dans le dépôt (chapitre + améliorations des fichiers communs)
outils/sauver_chapitre.sh /tmp/travail chapitres/physique_ch4_energie_potentielle
git add -A && git commit -m "Chapitre 4 : …"
```

Outils nécessaires : TeX Live avec XeLaTeX (TeX Gyre Pagella, Latin Modern Math), Python 3, Playwright + Chromium.
