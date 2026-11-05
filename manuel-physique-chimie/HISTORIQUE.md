# Historique des chapitres

| Chapitre | Contenu | État |
|---|---|---|
| Physique ch1 | Rotation d'un solide autour d'un axe fixe | livré (modèle d'origine du livre : archives/modeles_ch1) |
| Physique ch2 | Travail et puissance d'une force | livré ; doc 3 « produit scalaire » ajouté, question 3 reformulée |
| Physique ch3 | Travail et énergie cinétique (5 h) | livré — sources complètes dans chapitres/physique_ch3_travail_energie_cinetique |
| Chimie ch1–ch5 | dont « Grandeurs physiques liées aux quantités de matière » | fiches pédagogiques dans archives/fiches_pedagogiques |

## Décisions techniques à retenir
- XeLaTeX (LuaLaTeX peut être cassé). Version élève : `\def\versioneleve{1}` écrit avec `printf`, pas `echo`.
- `\trou` : `\advance\troumax by -14mm\relax` (le `\relax` est indispensable).
- Étiquettes enumitem : pastille via la commande robuste `\pastille` (une tikz brute dans `label=` boucle avec certaines versions d'enumitem).
- Titres d'encart : `coltitle=#2` (sinon titre blanc invisible avec les tcolorbox récentes).
- `\needspace` juste après une boîte insécable peut forcer une page à moitié vide : regrouper bandeau
  « Exercices » + vrai/faux dans une minipage.
- Fiche pédagogique : `\tete` remplace `\th` ; `\frise[durée]{…}` ; cellule de durée sans `\\` ;
  `\partie` suivi de `\\*` pour ne jamais rester seul en bas de page.
- Dans les SVG, une couleur de texte passée en paramètre doit aller dans `style` (les classes CSS l'emportent sur l'attribut `fill`) : corrigé dans figlib.js.
- Présentation : `fig` dans une grille centrée n'a pas de hauteur propre → donner une hauteur fixe à la rangée.
