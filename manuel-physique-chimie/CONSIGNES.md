# Consignes de l'enseignant (à respecter pour chaque chapitre)

## Livraison
- **Recevoir seulement les fichiers, sans publication en ligne** (pas d'artefact publié).
- Livrer : PDF professeur + PDF élève + archive des sources du livre ; présentation HTML + sources ;
  fiche d'activités PDF + .tex ; fiche pédagogique PDF + .tex (+ modèles s'ils ont changé).
- Terminer par la liste des changements faits par rapport au texte de l'enseignant et des
  informations de la fiche pédagogique déduites faute de capture.
- Ne modifier un chapitre déjà livré que sur demande explicite (« les autres cours sont bien »).

## Classe réelle (fiche pédagogique)
- Le livre est un **projet personnel** : ne jamais le citer dans la fiche pédagogique
  (ni rubrique propre au livre : « Le saviez-vous ? », trous, corrigés).
- Les élèves travaillent **sur le cahier** : fiche d'activités collée, réponses, « À retenir » recopié,
  applications et exercices dans le cahier. **Pas d'ardoise.**
- Vérifier par `pdftotext` que « livre » et « ardoise » n'apparaissent pas dans la fiche pédagogique.
- Durée : 2 h par défaut, sinon celle indiquée (ex. 5 h → séances 2 h + 2 h + 1 h, une frise par séance).

## Figures
- Figures **réalistes** (bibliothèque realisme.js), orientation vérifiée avec soin (« sois prudent à tous »).
- Voiture : **type coupé**, avant clairement à droite, roues qui tournent dans le bon sens.
- **Mains** correctes (poing qui serre, paume à plat…) : fonctions `fist`, `handFlat`.
- Une figure de document ne montre pas la réponse d'une question (mode `o.book`).
- Points d'application : le poids au centre d'inertie G ; les forces de contact (réaction R, composante normale R_N,
  frottement f) au milieu I de la surface de contact entre le solide et le support (point marqué « I »).
- Document de mesure à l'échelle exacte (60 px = 1 cm) avec barre d'échelle ; « imprimer à 100 % ».
- Contrôler chaque figure exportée sur une planche (lisibilité, chevauchements, couleurs).

## Contenu
- Reformuler le cours comme un livre d'élève ; corriger les incohérences numériques, garder
  3 chiffres significatifs dans les calculs intermédiaires ; recalculer tout par script.
- Quand une notion n'est pas connue des élèves (ex. produit scalaire), ajouter un document qui l'explique
  et nommer précisément les objets dans les questions (« produit scalaire de F et de AB »).
- Respecter les orientations officielles (limites du programme, notations).
- Présentation : les diapositives « À retenir » et « Méthode » reprennent **le texte complet du livre** (pas de résumé) ; répartir sur deux diapositives si nécessaire.

## Économie (consommation)
- Une conversation par chapitre ; cloner ce dépôt au début au lieu de reconstruire les modèles.
- Donner toutes les consignes dans le premier message ; regrouper les corrections.
- Une seule passe de contrôle visuel en fin de travail, en images réduites, sauf demande contraire.
