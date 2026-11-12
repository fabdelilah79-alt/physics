# Historique des chapitres

| Chapitre | Contenu | État |
|---|---|---|
| Physique ch1 | Rotation d'un solide autour d'un axe fixe | livré (modèle d'origine du livre : archives/modeles_ch1) |
| Physique ch2 | Travail et puissance d'une force | livré ; doc 3 « produit scalaire » ajouté, question 3 reformulée |
| Physique ch3 | Travail et énergie cinétique (5 h) | livré — sources complètes dans chapitres/physique_ch3_travail_energie_cinetique |
| Physique ch4 | Énergie potentielle de pesanteur et énergie mécanique (§ 3.2 et 3.3, 5 h) | livré — chapitres/physique_ch4_energie_mecanique (livrables/ : PDF, HTML, .tex) ; application 3 corrigée (AB = 0,40 m), doc 5 « débit d’air réduit » ajouté, « livre » de l’application 1 remplacé par un dictionnaire ; doc 6 corrigé (R, R_N et f appliquées au milieu I du contact) |
| Physique ch5 | L’énergie thermique : le transfert thermique (§ 4, 4 h) | livré — chapitres/physique_ch5_energie_thermique ; μ du protocole 2 rendu cohérent (109 au lieu de 60, θ'e = 28,3 °C), θe du glaçon 13,3 °C (Lf ≈ 3,35×10⁵), températures de fusion notées θ_fus, docs 2, 3 et 8 complétés ; puis activités revues pour que chaque question soit traitable avec les documents (encadré « Information » chaleur massique, compléments des docs 4, 6, 7, 8, doc 9 conduction/convection ajouté) |
| Physique ch6 | Le travail et l’énergie interne (§ 4, filière sciences mathématiques, 4 h) | livré — chapitres/physique_ch6_travail_energie_interne ; encadrés « Information » (aire sous F(x), convention de signe, énergie interne/fonction d’état, ΔU = m·c·Δθ), doc 5 « expérience de Joule » ajouté avec données ; doc 1 corrigé (allumette enflammée par la tête frottée, glace qui fond dans la zone frottée) |
| Physique ch7 | L’énergie thermique : le transfert thermique (§ 5, filière sciences mathématiques, 5 h) | livré — chapitres/physique_ch7_energie_thermique_sm ; activité 1 complétée (joulemètres, tableaux de mesures), μ étape 2 rendu cohérent (98 au lieu de 90), exercice 1 θ'e = 38,6 °C et θ''e = 23,9 °C, exercice 3 V0 = 350 m/s ; encadrés « Information » et doc 8 (conduction, convection, absorption) ajoutés ; figures vérifiées (glace qui flotte, cylindre de fer de 200 g à l’échelle, ballon du capteur solaire au-dessus du capteur) |
| Physique ch8 | L’énergie potentielle électrostatique (Électricité § 1, filière sciences mathématiques, 10 h = 8 h + 2 h d’exercices) | livré — chapitres/physique_ch8_energie_potentielle_electrostatique ; application 1 corrigée (F_G ≈ 3,7×10⁻⁴⁷ N, rapport ≈ 2,2×10³⁹) ; doc 6 « charges témoins » ajouté avec mesures (E = 5,0×10³ N/C) ; encadrés « Information » 1 à 5 (charges, vecteur champ, champ uniforme, potentiel, Epe/TEC/électron-volt), rappel du produit scalaire, méthode de superposition ; fiche pédagogique en 5 séances de 2 h |
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
- Ch4 : `simTrack` (mouvement sur une piste y = Y(x), avec ou sans frottement, déterministe) et `eBars` (histogramme des énergies)
  sont définis dans `chapitres/physique_ch4_energie_mecanique/pres/src/scenes_p4a.js` ; à déplacer dans realisme.js s’ils resservent.
- Dans une scène, protéger les indices de tableau calculés à partir de `t` (`clamp(…, 0, n − 1)`) : l’engine peut appeler `update` avec un `t` négatif.
- Conteneur neuf : installer `texlive-xetex texlive-latex-extra texlive-lang-french texlive-science texlive-fonts-extra texlive-pictures fonts-texgyre poppler-utils`
  et le paquet Python `playwright` à la version du Playwright Node installé (navigateurs déjà dans /opt/pw-browsers).
- Orientations (§ 3.2) : en sciences expérimentales, se limiter aux situations où la constante de Epp est nulle ; le ch4 garde la question
  « référence sur la table » (application 1) pour montrer que ΔEpp ne dépend pas de la référence.
- Ch5 : verrerie et appareils de thermique ajoutés à `commun/presentation/src/realisme.js` : `liquidGrad`, `beaker3D`, `hotPlate`,
  `probeThermo` (thermomètre numérique à sonde), `iceCube`, `metalBlock`, `calorimeter` (Berthelot en coupe), `steam`.
  `glassThermo`, `irLamp`, `wavy` (rayonnement) sont dans les scènes du ch5 (à déplacer dans realisme.js s’ils resservent).
- Dans gen_slides.py, toute chaîne contenant `\u{…}` doit être brute (`r"…"`), sinon Python lit `\u` comme un échappement Unicode.
- Ch6 : `spring` (ressort hélicoïdal horizontal, `set(x1, x2)`) ajouté à `commun/presentation/src/realisme.js` ;
  `gasParticles` (particules de gaz déterministes dans un rectangle) est dans les scènes du ch6.
- Ch7 : `build_livre.sh` doit recevoir le nom de base (`./build_livre.sh physique_ch7`) : sans argument il écrase `chapitre.tex` (données du chapitre).
  `thermoplongeur` (béchers + joulemètres, cylindre de fer chauffé), `courbeQ` (θ = f(Q)), `panneauSolaire` (thermosiphon), `balle` sont dans les scènes du ch7.
- Ch8 : scènes `chg`, `stick` (verre, ébonite, règle), `pendulum` (pendule électrostatique), `holdStick` (main qui tient un bâton), `pcharge`, `efield`/`fieldLines`/`drawLine` (lignes de champ), `plate`, `hvGen` (générateur haute tension) dans `chapitres/physique_ch8_energie_potentielle_electrostatique/pres/src/scenes_p8*.js`.
- Fiche pédagogique : dans `\frise`, une étiquette ne doit contenir ni virgule ni barre oblique (séparateurs de la liste).
- Révision des figures et animations des chapitres 4 à 7 (contrôle à plusieurs instants) :
  ch4 : bille retenue par l'électroaimant, rocher qui tombe sans traverser la falaise et reste au sol, main qui porte le dictionnaire,
  caisse et solide qui franchissent le creux sans traverser la piste (`bridgeCorner`), cale à la bonne hauteur sous la table, bille qui ne s'enfonce plus dans le sol ;
  ch5 et ch7 : versement réaliste de l'eau tiède par l'orifice du couvercle (`pourBeaker`, surface horizontale calculée par aire),
  bloc métallique et bille sans contact avec l'agitateur, glaçon entre l'agitateur et la sonde, montée du niveau quand le bloc est immergé,
  tube de puisage d'eau chaude en haut du chauffe-eau, Soleil dans l'axe du four solaire ; ch7 : rayons solaires parallèles, vecteur V0 masqué dans le bois, cordons d'alimentation des joulemètres ;
  ch6 : perceuse à colonne et sonde posée sur la plaque, montants de l'expérience de Joule écartés (masses libres), pas d'agitateur sous les palettes,
  poignée de pompe toujours visible ; cycle de l'exercice 2 tracé avec une vraie adiabatique (P·V^1,4 = cte, P_B ≈ 3,96×10⁵ Pa) et données recalculées :
  W_AB = +480 J, ΔU_BC = −1230 J, ΔU_CA = +750 J, Q_CA = +1050 J (livre, présentation, fiche pédagogique).
