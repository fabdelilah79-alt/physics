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
- **Vérifier la justesse physique de chaque détail de chaque figure et animation**, au même titre que le texte.
  Pour chaque objet, se demander : « est-ce ainsi dans la réalité ? ». Exemples d’erreurs déjà commises :
  allumette enflammée du côté du bois (c’est la **tête** qui frotte le frottoir et qui s’enflamme) ; glace qui fond
  loin de la **zone frottée** (l’eau apparaît au contact, puis coule) ; forces de contact dessinées depuis le centre
  d’inertie (elles partent du **milieu de la surface de contact**). Vérifier aussi : sens des mouvements et des
  rotations, sens et point d’application des vecteurs, orientation des objets (avant, haut, côté actif), niveaux de
  liquide horizontaux, cohérence des valeurs affichées avec les données, causes et effets au bon endroit et au bon moment.
- Avant la livraison, relire chaque figure et chaque animation avec cette liste ; corriger avant d’envoyer.
- **Montages électriques** (remarque de l’enseignant sur le chapitre 8) : chaque fil part d’un point métallique réel (plaque, électrode,
  anode, cathode) et arrive **par le dessus** dans la bonne borne du générateur (+ rouge, − noire), avec une fiche ; aucun fil ne passe
  derrière ou à travers un boîtier, aucun croisement de fils, ordre des bornes choisi pour éviter les croisements. Un montage doit être
  complet et possible : par exemple, un spectre « une seule pointe » demande une seconde électrode (anneau contre la paroi).
- **Contacts entre corps** : un contact n’est dessiné que s’il existe (bâton qui touche la boule au contact, règle posée sur le tissu) ;
  sinon garder un écart visible (influence, attraction à distance) ; une main tient toujours l’objet, entièrement dans le cadre.
- **Mouvements en trois dimensions** (rotation autour d’un fil vertical…) : ajouter une **vue de dessus** au lieu d’une perspective ambiguë ;
  placer la cause (bâton approché) de façon qu’elle produise réellement l’effet (force décalée par rapport à l’axe de rotation).
- **Contrôle des animations** : capturer chaque scène animée à plusieurs instants (début, contact, fin) et vérifier chaque image
  avec la liste ci-dessus, pas seulement l’état figé du livre ; la présentation est vue par les élèves, une faute de dessin y induit une fausse idée.

## Contenu
- **Chaque question d’activité doit pouvoir être traitée avec les seuls documents fournis** (et les prérequis réels des élèves).
  Toute notion nouvelle qu’une question demande d’écrire, de nommer ou d’utiliser (expression d’une grandeur, nom d’un
  phénomène, définition, convention de signe, relation comme l’équation calorimétrique…) figure dans un document ou dans un
  encadré « Information » de l’activité, avant les questions. Les questions renvoient alors à ce document
  (« à l’aide de l’information… », « d’après le doc n… ») et font raisonner : montrer, exploiter, interpréter, déduire.
  Ne jamais demander « Définir X » ou « Écrire l’expression de X » si rien ne permet à l’élève de le trouver.
  Relire chaque question avant la livraison en se demandant : « avec quoi l’élève répond-il ? ». Même règle pour la fiche
  d’activités et la présentation (les cartes des documents reprennent les informations).
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
