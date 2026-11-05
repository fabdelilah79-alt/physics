"""Écrit src/slides.html (physique, chapitre 3 : Travail et énergie cinétique).
Formules entre $…$ (converties par build.py) ; tableaux de mesures générés par mtab()."""
import pathlib
SRC = pathlib.Path(__file__).resolve().parent / "src"

BULB = ('<svg class="bulb" viewBox="0 0 120 120"><circle cx="60" cy="60" r="57" fill="#e89b00"/>'
        '<path d="M60,22 a24,24 0 0 1 14,43 q-4,4 -4,10 v4 h-20 v-4 q0,-6 -4,-10 a24,24 0 0 1 14,-43 z" fill="#fff"/>'
        '<rect x="50" y="83" width="20" height="6" rx="3" fill="#fff"/><rect x="52" y="92" width="16" height="6" rx="3" fill="#fff"/></svg>')
EC = r"E_{\u{C}}"


def mtab(rows, cls=""):
    """Tableau de mesures : rows = [(en-tête, [valeurs])]."""
    return f'<table class="mtab {cls}">' + "".join(f"<tr><th>{h}</th>" + "".join(f"<td>{v}</td>" for v in vals) + "</tr>" for h, vals in rows) + "</table>"


def q(n, text, ans, kw=None):
    kw = f'<span class="kw">{kw}</span> ' if kw else ""
    return (f'<div class="q"><div class="qh"><span class="qn">{n}</span><div class="qt">{kw}{text}</div></div>'
            f'<div class="ans"><div class="ans-in"><div class="ans-box">{ans}</div></div></div></div>')


def slide(kind, chip, title, part, group, menu, body):
    return (f'<section class="slide" data-kind="{kind}" data-chip="{chip}" data-title="{title}" data-part="{part}" '
            f'data-group="{group}" data-menu="{menu}">\n  <div class="sbody{body[0]}"{body[1]}>\n{body[2]}\n  </div>\n</section>\n')


def cols(c1, c2, left, right, extra=""):
    return (" cols", f' style="--c1:{c1};--c2:{c2}{extra}"', left + "\n" + right)


def rows(top, figs, gridcols="1fr 1fr"):
    return ("", "", top + f'\n    <div style="display:grid;grid-template-columns:{gridcols};gap:24px;flex:1;min-height:0">\n      ' + "\n      ".join(figs) + "\n    </div>")


def fig(scene, cap=None, opts=None):
    o = f" data-opts='{opts}'" if opts else ""
    c = f'<div class="cap">{cap}</div>' if cap else ""
    return f'<div class="fig" data-scene="{scene}"{o}>{c}</div>'


def doc(n, text):
    return f'<span class="doc">Doc {n}</span>{text}'


def vf(letter, ans, text, exp):
    return (f'<div class="vf" data-answer="{ans}"><span class="qn">{letter}</span><div>{text}</div><div class="vfb">'
            f'<button type="button" data-v="vrai">Vrai</button><button type="button" data-v="faux">Faux</button></div>'
            f'<div class="vf-exp">{exp}</div></div>')


def qlist(*items):
    return '    <div class="qlist">\n      ' + "\n      ".join(items) + "\n    </div>"


def situ(text, problems):
    li = "".join(f"<li>{p}</li>" for p in problems)
    return f'''    <div class="stack center">
      <div class="card situ">{BULB}
        <p>{text}</p>
        <ul class="problems">{li}</ul>
      </div>
    </div>'''


def card(html, cls=""):
    return f'<div class="card {cls}"><p style="margin:0">{html}</p></div>'


P1 = ("Partie 1", "Partie 1 · Translation")
P2 = ("Partie 2", "Partie 2 · Rotation")
P3 = ("Partie 3", "Partie 3 · Théorème (expérience)")
P4 = ("Partie 4", "Partie 4 · Généralisation")
EX = ("Exercices", "Exercices et bilan")
S = []

T_HV = mtab([(r"$h$ (m)", ["2,5", "1,3", "0,5"]), (r"$V$ (m·s<sup>−1</sup>)", ["7,0", "5,0", "3,1"])])
T_CHUTE = mtab([("Point", [rf"$A_{i}$" for i in range(1, 8)]), (r"$h$ (m)", ["0,20", "0,40", "0,60", "0,80", "1,00", "1,20", "1,40"]),
                (r"$Δt$ (ms)", ["8,70", "6,38", "5,18", "4,48", "4,05", "3,70", "3,48"])], "wide")
T_dD = mtab([("Point", [rf"$M_{i}$" for i in range(1, 7)]), (r"$d_i$ (cm)", ["1,2", "2,4", "3,6", "4,7", "5,9", "7,2"]),
             (r"$D_i$ (cm)", ["0", "0,9", "2,4", "4,5", "7,1", "10,4"])])
T_CHUTE_R = mtab([("Point", [rf"$A_{i}$" for i in range(1, 8)]), (r"$V_i$ (m·s<sup>−1</sup>)", ["2,07", "2,82", "3,47", "4,02", "4,44", "4,86", "5,17"]),
                  (rf"${EC}$ (J)", ["0,051", "0,096", "0,145", "0,194", "0,237", "0,284", "0,321"]),
                  (r"$W(\vec{P})$ (J)", ["0", "0,048", "0,096", "0,144", "0,192", "0,240", "0,288"])], "wide")
T_TABLE_R = mtab([("Point", [rf"$M_{i}$" for i in range(1, 7)]), (r"$V_i$ (m·s<sup>−1</sup>)", ["0,100", "0,200", "0,300", "0,392", "0,492", "0,600"]),
                  (rf"${EC}$ (10<sup>−3</sup> J)", ["3,66", "14,6", "32,9", "56,1", "88,5", "132"]),
                  (r"$W(\vec{P})$ (10<sup>−3</sup> J)", ["0", "11,4", "30,5", "57,2", "90,2", "132"])], "wide")
T_J = ('<table class="mtab jtab"><tr><th>Solide (axe de symétrie)</th><th style="text-align:center">$J_Δ$</th></tr>' + "".join(f"<tr><th>{a}</th><td>{b}</td></tr>" for a, b in [
    ("Disque ou cylindre plein de rayon $r$", r"$\frac{1}{2}m·r^2$"), ("Anneau (cerceau) de rayon $r$", r"$m·r^2$"),
    ("Sphère pleine de rayon $r$", r"$\frac{2}{5}m·r^2$"), ("Tige de longueur $l$, axe au milieu", r"$\frac{1}{12}m·l^2$"),
    ("Tige de longueur $l$, axe à une extrémité", r"$\frac{1}{3}m·l^2$")]) + "</table>")

# ================= TITRE =================
S.append('''<section class="slide s-title" data-kind="titre" data-group="Début" data-menu="Titre du chapitre">
  <div class="fig-full fig bare" data-scene="titre"></div>
  <div class="title-block">
    <div class="eyebrow">PHYSIQUE · TRAVAIL MÉCANIQUE ET ÉNERGIE</div>
    <div class="chapter">Chapitre 3</div>
    <h1>Travail et énergie cinétique</h1>
    <div class="plan">
      <span><b>1</b>Énergie cinétique d’un solide en translation</span>
      <span><b>2</b>Énergie cinétique d’un solide en rotation</span>
      <span><b>3</b>Théorème de l’énergie cinétique : étude expérimentale</span>
      <span><b>4</b>Généralisation et méthode</span>
    </div>
    <div class="hint">Appuyez sur → (ou cliquez sur la flèche en bas à droite) pour avancer · F : plein écran</div>
  </div>
</section>
''')

# ================= PARTIE 1 =================
S.append(slide("situation", "Situation de départ", "Partie 1 — L’énergie d’un corps en mouvement", *P1, "Situation de départ", cols(".9fr", "1.1fr",
    situ("Lors d’un choc, un <b>camion lourd lancé à vive allure</b> provoque des dégâts bien plus importants qu’une <b>petite voiture qui roule lentement</b>. Un corps en mouvement possède donc une énergie liée à son mouvement.",
         ["De quelles grandeurs dépend cette énergie ?", "Comment la calculer pour un solide en translation ?"]),
    "    " + fig("camionVoiture"))))

S.append(slide("activite", "Activité 1", "Trois solides en mouvement", *P1, "Activité 1 · doc 1", rows(
    "    " + card(r"<b>Doc 1.</b> On repère deux points A et B d’un solide en mouvement : la cabine d’un <b>ascenseur</b>, une cabine de <b>téléphérique</b> et une nacelle de <b>grande roue</b>. On suit le vecteur $\vec{AB}$ au cours du mouvement.", "small"),
    [fig("translations", doc(1, "On suit le vecteur AB"))], "1fr")))

S.append(slide("activite", "Activité 1", "Chute d’objets et empreintes dans la pâte", *P1, "Activité 1 · docs 2 et 3", rows(
    '    <div style="display:grid;grid-template-columns:1fr auto;gap:22px;align-items:center">'
    + card(r"<b>Doc 2.</b> Tube de Newton : une plume, du liège et une bille tombent d’abord avec de l’air, puis après avoir fait le <b>vide</b>.<br><b>Doc 3.</b> Des billes lâchées sans vitesse initiale s’enfoncent dans de la pâte à modeler. Série 1 : même bille, trois hauteurs $h$ ($V$ : vitesse juste avant l’impact). Série 2 : trois masses ($58$, $230$ et $530~\u{g}$), même hauteur.", "small")
    + T_HV + "</div>",
    [fig("tubeNewton", doc(2, "Tube de Newton")), fig("pate", doc(3, "Empreintes dans la pâte (coupe)"))], ".55fr 1.45fr")))

S.append(slide("questions", "Questions", "Activité 1 — La translation et la chute libre", *P1, "Questions 1 et 2", cols("1.1fr", ".9fr",
    qlist(q(1, r"Comment évolue le vecteur $\vec{AB}$ pour chaque solide du doc 1 ? Définir la translation et ses trois types.",
            r"$\vec{AB}$ garde la <b>même direction</b>, le <b>même sens</b> et la <b>même longueur</b>. Translation <b>rectiligne</b> (ascenseur), <b>curviligne</b> (téléphérique), <b>circulaire</b> (nacelle).", "Observer."),
          q(2, "Qu’est-ce qu’une chute libre ? Quel est l’intérêt du tube de Newton ?",
            "Un corps en chute libre n’est soumis qu’à son <b>poids</b>. Le vide supprime l’action de l’air : la plume, le liège et la bille tombent <b>ensemble</b>.", "Définir.")),
    "    " + fig("tubeNewton", doc(2, "Avec air, puis dans le vide")))))

S.append(slide("questions", "Questions", "Activité 1 — De quoi dépend l’énergie de la bille ?", *P1, "Questions 3 à 5", cols("1fr", "1fr",
    qlist(q(3, r"Série 1 : comment varie $V$ quand $h$ augmente ? Comment varie la déformation avec $V$ ?",
            r"$V$ augmente avec $h$ (de $3,1$ à $7,0~\u{m·s^{−1}}$) ; l’empreinte est d’autant plus <b>profonde</b> que $V$ est grande.", "Exploiter."),
          q(4, "Série 2 : comment la déformation varie-t-elle avec la masse $m$ ?",
            "Pour une même hauteur, l’empreinte est d’autant plus profonde que la <b>masse</b> est grande.", "Comparer."),
          q(5, "De quelles grandeurs dépend l’énergie acquise par la bille ? Donner l’expression de l’énergie cinétique.",
            rf"De $m$ et de $V$ : ${EC} = \frac{{1}}{{2}}m·V^2$, en joules ($\u{{J}}$).", "Conclure.")),
    "    " + fig("pate", doc(3, "Empreintes dans la pâte")))))

S.append(slide("retenir", "À retenir", "Énergie cinétique d’un solide en translation", *P1, "À retenir · translation", cols("1.3fr", ".7fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Mouvement de translation</h3><p style="margin:0">Un solide est en translation si tout vecteur $\vec{AB}$ joignant deux de ses points garde la <b>même direction</b>, le <b>même sens</b> et la <b>même longueur</b> au cours du mouvement. La translation peut être <b>rectiligne</b>, <b>curviligne</b> ou <b>circulaire</b>.</p></div>
      <div class="def"><h3>Énergie cinétique d’un solide en translation</h3><p style="margin:0 0 8px">Un solide de masse $m$ en translation à la vitesse $V$ (dans un référentiel donné) possède l’énergie cinétique :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$EC = \frac{1}{2}m·V^2$</span></div>
        <p style="margin:8px 0 0">$EC$ en joules (<b>J</b>), $m$ en <b>kilogrammes (kg)</b>, $V$ en <b>$\u{m·s^{−1}}$</b>. L’énergie cinétique est une grandeur <b>positive</b> ; elle est proportionnelle au <b>carré de la vitesse</b>.</p></div>
    </div>""".replace("EC", EC), "    " + fig("figEc"))))
S.append(slide("application", "Application", "Une voiture qui accélère", *P1, "Application · voiture", cols("1.15fr", ".85fr",
    "    <div class=\"stack\">\n      " + card(r"Voiture de masse $m = 1,2~\u{t}$ ; $V_1 = 54~\u{km·h^{−1}}$, puis $V_2 = 108~\u{km·h^{−1}}$.") + "\n" +
    qlist(q(1, "Convertir dans les unités SI.", r"$m = 1200~\u{kg}$ ; $V_1 = \frac{54}{3,6} = 15~\u{m·s^{−1}}$ ; $V_2 = 30~\u{m·s^{−1}}$"),
          q(2, rf"Calculer $E_{{\u{{C}}1}}$ et $E_{{\u{{C}}2}}$.", r"$E_{\u{C}1} = \frac{1}{2}×1200×15^2 = 1,35×10^5~\u{J}$ ; $E_{\u{C}2} = \frac{1}{2}×1200×30^2 = 5,40×10^5~\u{J}$"),
          q(3, "Quel est l’effet du doublement de la vitesse ?", r"$\frac{E_{\u{C}2}}{E_{\u{C}1}} = 4$ : quand la vitesse double, l’énergie cinétique est <b>multipliée par 4</b>.")) + "\n    </div>",
    "    " + fig("voitureApp"))))

# ================= PARTIE 2 =================
S.append(slide("situation", "Situation de départ", "Partie 2 — L’énergie d’un solide qui tourne", *P2, "Situation de départ", cols("1fr", ".85fr",
    situ("Une <b>éolienne</b>, le rotor d’une turbine ou un <b>volant d’inertie</b> tournent autour d’un axe fixe : leur centre d’inertie reste immobile. Ils stockent pourtant beaucoup d’énergie. Or les points d’un solide qui tourne n’ont pas tous la même vitesse.",
         ["Comment calculer l’énergie cinétique d’un solide en rotation ?"]),
    "    " + fig("eolienne"))))

S.append(slide("activite", "Activité 2", "Un solide en rotation : des points à des vitesses différentes", *P2, "Activité 2 · doc 4", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 4.</b> Un solide indéformable tourne autour d’un axe fixe $(Δ)$ à la vitesse angulaire $ω$. On le décompose en petits éléments $M_i$, de masses $m_i$, situés à la distance $r_i$ de l’axe.") + "\n      " +
    card(r"Chaque élément décrit un cercle à la vitesse $V_i = r_i·ω$. L’énergie cinétique du solide est la <b>somme</b> des énergies cinétiques de ses éléments.") + "\n    </div>",
    "    " + fig("pointsRot", doc(4, "Points d’un solide en rotation")))))

S.append(slide("activite", "Activité 2", "La répartition de la matière autour de l’axe", *P2, "Activité 2 · doc 5", rows(
    "    " + card(r"<b>Doc 5.</b> Des solides homogènes de <b>même masse</b> tournent autour d’un axe $(Δ)$. À vitesse angulaire égale, leur énergie cinétique dépend de leur forme et de la position de l’axe, c’est-à-dire de la <b>répartition de la matière</b> autour de l’axe.", "small"),
    [fig("solides", doc(5, "Solides homogènes et axe de rotation"))], "1fr")))

S.append(slide("questions", "Questions", "Activité 2 — Le moment d’inertie", *P2, "Questions 1 à 4", cols("1.25fr", ".75fr",
    qlist(q(1, r"Exprimer $E_{\u{C}i}$ d’un élément en fonction de $m_i$, $r_i$ et $ω$.", r"$E_{\u{C}i} = \frac{1}{2}m_i·V_i^2 = \frac{1}{2}m_i·r_i^2·ω^2$", "Exprimer."),
          q(2, rf"Établir l’expression de ${EC} = Σ E_{{\u{{C}}i}}$.", r"Même $ω$ pour tous les éléments : $E_{\u{C}} = \frac{1}{2}(Σ m_i·r_i^2)·ω^2$", "Établir."),
          q(3, r"$J_Δ = Σ m_i·r_i^2$ est le <b>moment d’inertie</b>. De quoi dépend-il ? Unité ?", r"De la <b>masse</b>, des dimensions et de la <b>répartition de la matière</b> autour de l’axe. Unité : $\u{kg·m^2}$.", "Identifier."),
          q(4, "Écrire l’énergie cinétique d’un solide en rotation.", rf"${EC} = \frac{{1}}{{2}}J_Δ·ω^2$", "Formuler.")),
    "    " + fig("pointsRot", doc(4, "$V_i = r_i·ω$")))))

S.append(slide("retenir", "À retenir", "Énergie cinétique d’un solide en rotation", *P2, "À retenir · rotation", cols("1fr", "1fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Énergie cinétique d’un solide en rotation</h3><p style="margin:0 0 8px">Pour un solide en rotation autour d’un axe fixe $(Δ)$ à la vitesse angulaire $ω$ :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$EC = \frac{1}{2}J_Δ·ω^2$</span></div>
        <p style="margin:8px 0 0">$EC$ en joules, $ω$ en <b>$\u{rad·s^{−1}}$</b>, $J_Δ$ : <b>moment d’inertie</b> du solide par rapport à l’axe $(Δ)$, en <b>$\u{kg·m^2}$</b>.</p>
        <p style="margin:8px 0 0">$J_Δ = Σ m_i·r_i^2$ dépend de la <b>masse</b> du solide et de la <b>répartition de la matière autour de l’axe</b>.</p></div>
      <div class="rappel"><b>Rappel.</b> Vitesse angulaire et fréquence de rotation : $ω = 2π·f = \frac{2π·N}{60}$ ($N$ en tours par minute) ; vitesse d’un point situé à la distance $r$ de l’axe : $V = r·ω$.</div>
    </div>""".replace("EC", EC),
    '    <div class="stack center"><div class="def"><h3>Moments d’inertie de solides homogènes de masse $m$</h3>' + T_J + "</div></div>")))
S.append(slide("application", "Application", "Un disque qui tourne", *P2, "Application · disque", cols("1.2fr", ".8fr",
    "    <div class=\"stack\">\n      " + card(r"Disque homogène : $m = 4,0~\u{kg}$, $r = 20~\u{cm}$ ; il tourne autour de son axe à $N = 600~\u{tr/min}$.") + "\n" +
    qlist(q(1, r"Calculer $J_Δ$.", r"$J_Δ = \frac{1}{2}m·r^2 = \frac{1}{2}×4,0×0,20^2 = 0,080~\u{kg·m^2}$"),
          q(2, r"Calculer $ω$.", r"$ω = \frac{2π×600}{60} = 20π ≈ 62,8~\u{rad·s^{−1}}$"),
          q(3, "Calculer l’énergie cinétique.", rf"${EC} = \frac{{1}}{{2}}×0,080×(20π)^2 ≈ 158~\u{{J}}$")) + "\n    </div>",
    "    " + fig("disqueApp"))))

# ================= PARTIE 3 =================
S.append(slide("situation", "Situation de départ", "Partie 3 — Travail et variation de l’énergie cinétique", *P3, "Situation de départ", cols("1fr", "1fr",
    situ("Quand un solide <b>tombe</b> ou <b>glisse</b> sur un plan incliné, sa vitesse augmente : son énergie cinétique augmente. Dans le même temps, les forces qui s’exercent sur lui <b>travaillent</b>.",
         ["Quelle relation existe-t-il entre la variation de l’énergie cinétique et le travail des forces ?"]),
    "    " + fig("skieur", None, '{"plain":1}'))))

S.append(slide("activite", "Activité 3", "Chute libre d’une bille", *P3, "Activité 3 · doc 6", cols("1.25fr", ".75fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 6.</b> Une bille d’acier ($m = 24~\u{g}$, diamètre $d = 1,8~\u{cm}$) retenue par un électroaimant tombe sans vitesse initiale. Une cellule photoélectrique reliée à un chronomètre mesure la durée $Δt$ d’occultation du faisceau en $A_1$ … $A_7$, à la distance $h$ sous le départ. $g = 10~\u{N·kg^{−1}}$.", "small") + "\n      " + T_CHUTE + "\n    </div>",
    "    " + fig("chuteLibre", doc(6, "Chute libre et cellule photoélectrique")))))

S.append(slide("activite", "Activité 3", "Mobile autoporteur sur une table inclinée", *P3, "Activité 3 · docs 7 et 8", rows(
    '    <div style="display:grid;grid-template-columns:1.15fr .85fr;gap:24px;align-items:stretch;height:330px;flex:none">'
    + card(r"<b>Doc 7.</b> Un mobile autoporteur ($m = 732~\u{g}$) est lâché sans vitesse initiale sur une table à coussin d’air inclinée de $α = 10°$ ; frottements négligeables. On enregistre les positions $M_0, M_1, …, M_7$ de son centre d’inertie toutes les $τ = 60~\u{ms}$.<br>On note $d_i = M_{i−1}M_{i+1}$ et $D_i = M_1M_i$.", "small")
    + fig("tableAir", doc(7, "Table à coussin d’air inclinée")) + "</div>",
    [fig("enregistrement", doc(8, "Enregistrement à l’échelle 1")), '<div style="display:grid;place-items:center">' + T_dD + "</div>"], "1.55fr .45fr")))

S.append(slide("questions", "Questions", "Activité 3 — Exploiter la chute libre", *P3, "Question 1", cols("1.55fr", ".45fr",
    qlist(q(1, rf"Calculer en chaque point $V_i = \frac{{d}}{{Δt}}$, $E_{{\u{{C}}i}}$ et $W_{{A_1→A_i}}(\vec{{P}}) = m·g·(h_i − h_1)$.",
            r"En $A_1$ : $V_1 = \frac{0,018}{8,70×10^{−3}} ≈ 2,07~\u{m·s^{−1}}$ ; $E_{\u{C}1} = \frac{1}{2}×0,024×2,07^2 ≈ 0,051~\u{J}$" + T_CHUTE_R, "Calculer.")), "    " + fig("chuteLibre", doc(6, "Mesure de Δt")))))

S.append(slide("questions", "Questions", "Activité 3 — La courbe Ec = f(W)", *P3, "Question 2", cols("1.05fr", ".95fr",
    qlist(q(2, rf"Tracer ${EC} = f(W(\vec{{P}}))$. Interpréter l’ordonnée à l’origine et le coefficient directeur. Conclure.",
            rf"Droite ${EC} = a·W(\vec{{P}}) + b$ : $b = E_{{\u{{C}}1}} ≈ 0,051~\u{{J}}$ ; $a ≈ 0,95 ≈ 1$.<br>Donc $ΔE_{{\u{{C}}}} = E_{{\u{{C}}i}} − E_{{\u{{C}}1}} = W_{{A_1→A_i}}(\vec{{P}})$", "Analyser.")),
    "    " + fig("graphChute", "Ec en fonction de W(P)"))))

S.append(slide("questions", "Questions", "Activité 3 — Le mobile sur le plan incliné", *P3, "Questions 3 et 4", cols("1.15fr", ".85fr",
    qlist(q(3, r"Faire le bilan des forces sur le mobile. Exprimer la somme de leurs travaux entre $M_1$ et $M_i$.",
            r"Poids $\vec{P}$ et réaction $\vec{R}$, perpendiculaire au plan : $W(\vec{R}) = 0$.<br>$Σ W = W(\vec{P}) = m·g·D_i·\u{sin}α$", "Inventorier."),
          q(4, r"Exprimer $V_i$ en fonction de $d_i$ et $τ$ ; calculer $E_{\u{C}i}$ et $W(\vec{P})$.",
            r"$V_i = \frac{d_i}{2τ}$ ; en $M_1$ : $V_1 = \frac{1,2×10^{−2}}{0,120} = 0,10~\u{m·s^{−1}}$" + T_TABLE_R, "Calculer.")),
    "    " + fig("tableAir", "Forces sur le mobile", '{"forces":1}'))))

S.append(slide("questions", "Questions", "Activité 3 — Généraliser", *P3, "Question 5", cols("1.05fr", ".95fr",
    qlist(q(5, rf"La courbe ${EC} = f(W(\vec{{P}}))$ du mobile est une droite. Écrire son équation et conclure.",
            rf"$a ≈ 0,96 ≈ 1$ ; $b ≈ 3×10^{{−3}}~\u{{J}}$, voisin de $E_{{\u{{C}}1}} ≈ 3,7×10^{{−3}}~\u{{J}}$, donc ${EC} − E_{{\u{{C}}1}} = W(\vec{{P}})$.<br>Comme $W(\vec{{R}}) = 0$ : $ΔE_{{\u{{C}}}} = Σ W_{{M_1→M_i}}(\vec{{F}}_{{\u{{ext}}}})$", "Généraliser.")),
    "    " + fig("graphTable", "Mobile autoporteur"))))

S.append(slide("retenir", "À retenir", "Théorème de l’énergie cinétique (solide en translation)", *P3, "À retenir · théorème", ("", "",
    r"""    <div class="stack center" style="flex:1">
      <div class="def"><h3>Théorème de l’énergie cinétique (solide en translation)</h3><p style="margin:0 0 10px">Dans un <b>référentiel galiléen</b>, la variation de l’énergie cinétique d’un solide en translation entre deux positions A et B est égale à la <b>somme des travaux des forces extérieures qui lui sont appliquées entre ces deux positions</b> :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$ΔEC = E_{\u{C}B} − E_{\u{C}A} = \frac{1}{2}m·V_B^2 − \frac{1}{2}m·V_A^2 = Σ W_{A→B}(\vec{F}_{\u{ext}})$</span></div>
        <p style="margin:10px 0 0">Si la somme des travaux est positive (travail moteur), l’énergie cinétique <b>augmente</b> ; si elle est négative (travail résistant), l’énergie cinétique <b>diminue</b>. Le référentiel terrestre est considéré comme galiléen.</p></div>
      <div class="fig" data-scene="tableAir" data-opts='{"forces":1}' style="height:250px;flex:none;width:100%"></div>""".replace("EC", EC) + """
    </div>""")))
S.append(slide("application", "Application", "La descente d’un skieur", *P3, "Application · skieur", cols("1.1fr", ".9fr",
    "    <div class=\"stack\">\n      " + card(r"Skieur et équipement : $m = 80~\u{kg}$ ; départ sans vitesse en A ; piste rectiligne inclinée de $α = 20°$ ; $AB = 50~\u{m}$ ; frottements négligeables ; $g = 9,8~\u{N·kg^{−1}}$.") + "\n" +
    qlist(q(1, "Bilan des forces et travail de chacune entre A et B.", r"Poids $\vec{P}$ : $W(\vec{P}) = m·g·AB·\u{sin}α = 80×9,8×50×\u{sin}20° ≈ 1,34×10^4~\u{J}$<br>Réaction $\vec{R}$ perpendiculaire à la piste : $W(\vec{R}) = 0$"),
          q(2, r"Calculer la vitesse $V_B$.", r"$\frac{1}{2}m·V_B^2 − 0 = W(\vec{P})$ ⇒ $V_B = \sqrt{2g·AB·\u{sin}α} ≈ 18,3~\u{m·s^{−1}}$")) + "\n    </div>",
    "    " + fig("skieur"))))

# ================= PARTIE 4 =================
S.append(slide("situation", "Situation de départ", "Partie 4 — Du solide en translation au solide en rotation", *P4, "Situation de départ", cols("1fr", ".8fr",
    situ("Le théorème a été vérifié pour un solide en translation. Une <b>poulie</b> qui soulève une charge, un <b>treuil</b> ou une <b>meule</b> qu’on freine sont des solides en <b>rotation</b> autour d’un axe fixe.",
         ["Le théorème s’applique-t-il encore ?", "Comment l’utiliser avec méthode ?"]),
    "    " + fig("treuilCorps"))))

S.append(slide("activite", "Activité 4", "Un volant entraîné par un moteur", *P4, "Activité 4 · doc 9", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 9.</b> Un volant de moment d’inertie $J_Δ$ tourne autour d’un axe fixe $(Δ)$, dans un référentiel galiléen. Sous l’action de forces extérieures, sa vitesse angulaire passe de $ω_1$ (instant $t_1$) à $ω_2$ (instant $t_2$).") + "\n      " +
    card("Chaque élément de matière subit une variation d’énergie cinétique égale au travail des forces qui s’exercent sur lui. En additionnant ces relations pour tous les éléments, on obtient une relation pour le solide entier, <b>valable même si les forces ou leurs moments ne sont pas constants</b>.", "small") + "\n    </div>",
    "    " + fig("volant", doc(9, "Volant entraîné par un moteur")))))

S.append(slide("questions", "Questions", "Activité 4 — Généraliser le théorème", *P4, "Questions 1 à 3", cols("1.3fr", ".7fr",
    qlist(q(1, r"Écrire le théorème pour le volant dont la vitesse angulaire passe de $ω_1$ à $ω_2$.", r"$ΔE_{\u{C}} = \frac{1}{2}J_Δ·ω_2^2 − \frac{1}{2}J_Δ·ω_1^2 = Σ W_{1→2}(\vec{F}_{\u{ext}})$", "Écrire."),
          q(2, "Énoncer le théorème pour un solide en translation ou en rotation. Reste-t-il valable si les forces varient ?", "La variation de l’énergie cinétique entre deux instants est égale à la somme des travaux des forces extérieures. <b>Oui</b> : il reste valable même si les forces ou leurs moments ne sont pas constants.", "Énoncer."),
          q(3, "Quelles étapes suivre pour appliquer ce théorème ?", "Système ; référentiel galiléen ; état initial et état final ; bilan des forces ; travail de chaque force ; écrire le théorème et résoudre.", "Ordonner.")),
    "    " + fig("volant"))))

S.append(slide("retenir", "À retenir", "Théorème de l’énergie cinétique", *P4, "À retenir · généralisation", ("", "",
    r"""    <div class="stack center" style="flex:1"><div class="def"><h3>Théorème de l’énergie cinétique</h3><p style="margin:0 0 10px">Dans un référentiel galiléen, la variation de l’énergie cinétique d’un solide indéformable (en translation ou en rotation autour d’un axe fixe) entre deux instants $t_1$ et $t_2$ est égale à la <b>somme des travaux de toutes les forces extérieures appliquées au solide entre ces deux instants</b> :</p>
      <div class="big-eq" style="justify-content:center"><span class="boxeq">$ΔEC = E_{\u{C}2} − E_{\u{C}1} = Σ W_{1→2}(\vec{F}_{\u{ext}})$</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:14px">
        <div><h3>Translation</h3><span class="eq-wrap">$\frac{1}{2}m·V_2^2 − \frac{1}{2}m·V_1^2 = Σ W_{1→2}(\vec{F}_{\u{ext}})$</span></div>
        <div><h3>Rotation autour d’un axe fixe</h3><span class="eq-wrap">$\frac{1}{2}J_Δ·ω_2^2 − \frac{1}{2}J_Δ·ω_1^2 = Σ W_{1→2}(\vec{F}_{\u{ext}})$</span></div>
      </div>
      <p style="margin:14px 0 0">Le théorème reste valable même si les forces ou leurs moments ne sont <b>pas constants</b>.</p></div></div>""".replace("EC", EC))))
S.append(slide("methode", "Méthode", "Appliquer le théorème de l’énergie cinétique", *P4, "Méthode", rows(
    r"""    <div class="method"><h3>Méthode : appliquer le théorème de l’énergie cinétique</h3>
      <ol class="steps"><li>Définir le <b>système</b> étudié.</li><li>Choisir le <b>référentiel</b> (le référentiel terrestre est supposé galiléen).</li><li>Préciser l’<b>état initial</b> et l’<b>état final</b> (positions, vitesses).</li><li>Faire le <b>bilan des forces</b> extérieures appliquées au système.</li><li>Calculer le <b>travail</b> de chaque force entre l’état initial et l’état final (une force perpendiculaire au déplacement, ou dont la droite d’action coupe l’axe de rotation, ne travaille pas).</li><li>Écrire le <b>théorème</b> avec l’expression de $E_{\u{C}}$ adaptée (translation ou rotation) et résoudre.</li></ol></div>""",
    [fig("skieur", None, '{"plain":1}'), fig("poulieApp", None, '{"plain":1}')], "1.2fr .8fr")))
S.append(slide("application", "Application", "Une poulie mise en rotation", *P4, "Application · poulie", cols("1.15fr", ".85fr",
    "    <div class=\"stack\">\n      " + card(r"Poulie homogène (disque) : $M = 2,0~\u{kg}$, $r = 10~\u{cm}$, sans frottement autour de son axe fixe. Au repos, elle reçoit un couple moteur de moment constant $\mathcal{M}_Δ$ = $0,50~\u{N·m}$ pendant 10 tours.".replace(r"\mathcal{M}_Δ", "ℳ_Δ"), "small") + "\n" +
    qlist(q(1, r"Calculer $J_Δ$.", r"$J_Δ = \frac{1}{2}M·r^2 = \frac{1}{2}×2,0×0,10^2 = 1,0×10^{−2}~\u{kg·m^2}$"),
          q(2, "Bilan des actions et somme des travaux pour 10 tours.", r"Poids et réaction de l’axe : droites d’action qui coupent l’axe, $W = 0$. Couple : $W = ℳ_Δ·Δθ = 0,50×20π ≈ 31,4~\u{J}$"),
          q(3, r"Calculer $ω_2$ au bout de 10 tours.", r"$\frac{1}{2}J_Δ·ω_2^2 − 0 = 31,4$ ⇒ $ω_2 = \sqrt{\frac{2×31,4}{0,010}} ≈ 79,3~\u{rad·s^{−1}}$")) + "\n    </div>",
    "    " + fig("poulieApp"))))

# ================= EXERCICES =================
S.append(slide("quiz", "Vrai ou faux ?", "Je vérifie mes connaissances", *EX, "Vrai ou faux ?", ("", "",
    '    <div class="vflist">\n      ' + "\n      ".join([
        vf("a", "faux", "Si la vitesse d’un solide en translation double, son énergie cinétique double.", rf"Faux : ${EC}$ est proportionnelle à $V^2$ ; elle est multipliée par 4."),
        vf("b", "vrai", "L’énergie cinétique est une grandeur toujours positive ou nulle.", r"Vrai : $m > 0$ et $V^2 ≥ 0$ (ou $J_Δ > 0$ et $ω^2 ≥ 0$)."),
        vf("c", "faux", "Le moment d’inertie d’un solide ne dépend que de sa masse.", "Faux : il dépend aussi de la répartition de la matière autour de l’axe."),
        vf("d", "faux", r"Dans $E_{\u{C}} = \frac{1}{2}J_Δ·ω^2$, la vitesse angulaire s’exprime en tours par minute.", r"Faux : $ω$ s’exprime en $\u{rad·s^{−1}}$."),
        vf("e", "vrai", "Si la somme des travaux des forces extérieures est nulle, la vitesse finale est égale à la vitesse initiale.", r"Vrai : $ΔE_{\u{C}} = 0$."),
        vf("f", "faux", "Le théorème de l’énergie cinétique ne s’applique que si les forces sont constantes.", "Faux : il reste valable si les forces ou leurs moments varient.")]) + "\n    </div>")))

S.append(slide("exercice", "Exercice 1", "Un solide sur une piste", *EX, "Exercice 1 · énoncé", rows(
    "    " + card(r"Solide (S) de masse $m = 500~\u{g}$, lâché sans vitesse en A. Partie AB inclinée de $α = 30°$, $AB = 2,0~\u{m}$, sans frottement ; partie horizontale rugueuse à partir de B : frottements équivalents à une force $\vec{f}$ opposée au mouvement, $f = 1,2~\u{N}$ ; $BC = 2,5~\u{m}$ ; $g = 10~\u{N·kg^{−1}}$.", "small"),
    [fig("piste"), r'''<ol class="exlist small"><li>Travail du poids entre A et B.</li><li>Énergie cinétique et vitesse en B.</li><li>Bilan des forces entre B et C ; travail de chacune.</li><li>Vitesse $V_C$ en C.</li><li>(S) s’arrête en D : calculer BD.</li></ol>'''], "1.35fr .65fr")))

S.append(slide("exercice", "Correction", "Exercice 1 — Un solide sur une piste", *EX, "Exercice 1 · correction", ("", "",
    '    <div class="fig" data-scene="piste" data-opts=\'{"final":1}\' style="height:215px;flex:none"></div>\n' +
    qlist(q(1, '<span class="kw">De A à B</span>', r"$W(\vec{P}) = m·g·AB·\u{sin}α = 0,50×10×2,0×0,5 = 5,0~\u{J}$ ; $W(\vec{R}) = 0$ ⇒ $E_{\u{C}B} = 5,0~\u{J}$, $V_B = \sqrt{\frac{2E_{\u{C}B}}{m}} = \sqrt{20} ≈ 4,47~\u{m·s^{−1}}$"),
          q(2, '<span class="kw">De B à C</span>', r"$W(\vec{P}) = W(\vec{R}_N) = 0$ ; $W(\vec{f}) = −f·BC = −3,0~\u{J}$ ⇒ $E_{\u{C}C} = 2,0~\u{J}$, $V_C = \sqrt{8} ≈ 2,83~\u{m·s^{−1}}$"),
          q(3, '<span class="kw">Arrêt en D</span>', r"$0 − E_{\u{C}B} = −f·BD$ ⇒ $BD = \frac{5,0}{1,2} ≈ 4,17~\u{m}$")))))

S.append(slide("exercice", "Exercice 2", "Le freinage d’un cylindre", *EX, "Exercice 2 · énoncé", cols("1.3fr", ".7fr",
    "    <div class=\"stack\">\n      " + card(r"Cylindre homogène : $M = 10~\u{kg}$, $R = 20~\u{cm}$ ; il tourne à $N_0 = 300~\u{tr/min}$ autour de son axe fixe $(Δ)$. On coupe le moteur et on applique une force de frottement tangentielle constante $f = 5,0~\u{N}$ jusqu’à l’arrêt. Frottements sur l’axe négligeables.", "small") +
    r'''
      <ol class="exlist small"><li>Calculer $J_Δ$ et $ω_0$.</li><li>Calculer l’énergie cinétique au début du freinage.</li><li>Moment de $\vec{f}$ par rapport à $(Δ)$ et son travail pour une rotation $Δθ$.</li><li>Calculer $Δθ$ et le nombre de tours avant l’arrêt.</li></ol>
    </div>''', "    " + fig("frein"))))

S.append(slide("exercice", "Correction", "Exercice 2 — Le freinage d’un cylindre", *EX, "Exercice 2 · correction", cols("1.35fr", ".65fr",
    qlist(q(1, '<span class="kw">Inertie et vitesse</span>', r"$J_Δ = \frac{1}{2}M·R^2 = 0,20~\u{kg·m^2}$ ; $ω_0 = \frac{2π×300}{60} = 10π ≈ 31,4~\u{rad·s^{−1}}$"),
          q(2, '<span class="kw">Énergie initiale</span>', r"$E_{\u{C}0} = \frac{1}{2}×0,20×(10π)^2 ≈ 98,7~\u{J}$"),
          q(3, '<span class="kw">Travail du frottement</span>', r"$ℳ_Δ(\vec{f}) = −f·R = −1,0~\u{N·m}$ ; $W(\vec{f}) = −1,0·Δθ$ (poids et réaction de l’axe : $W = 0$)"),
          q(4, '<span class="kw">Arrêt</span>', r"$0 − E_{\u{C}0} = −1,0·Δθ$ ⇒ $Δθ ≈ 98,7~\u{rad}$, soit $n = \frac{Δθ}{2π} ≈ 15,7$ tours")),
    "    " + fig("frein", None, '{"final":1}'))))

S.append(slide("exercice", "Exercice 3", "Un treuil et une charge", *EX, "Exercice 3 · énoncé", cols("1.35fr", ".65fr",
    "    <div class=\"stack\">\n      " + card(r"Treuil : cylindre homogène (C), $M = 4,0~\u{kg}$, $r = 10~\u{cm}$, sans frottement autour de $(Δ)$. Un fil inextensible enroulé sans glisser porte un corps (S) de masse $m = 1,0~\u{kg}$. Lâché sans vitesse, (S) descend de $h = 1,5~\u{m}$ ; $g = 10~\u{N·kg^{−1}}$.", "small") +
    r'''
      <ol class="exlist small"><li>Calculer $J_Δ$.</li><li>Relations entre $V$ et $ω$, puis entre $h$ et $Δθ$.</li><li>Théorème appliqué à (S), puis à (C), avec la tension $T$ du fil.</li><li>Calculer $V$ après la descente, puis $T$.</li></ol>
    </div>''', "    " + fig("treuilCorps"))))

S.append(slide("exercice", "Correction", "Exercice 3 — Un treuil et une charge", *EX, "Exercice 3 · correction", cols("1.4fr", ".6fr",
    qlist(q(1, '<span class="kw">Inertie et relations</span>', r"$J_Δ = \frac{1}{2}M·r^2 = 2,0×10^{−2}~\u{kg·m^2}$ ; $V = r·ω$ ; $h = r·Δθ$"),
          q(2, '<span class="kw">Théorème pour (S) et (C)</span>', r"(S) : $\frac{1}{2}m·V^2 = m·g·h − T·h$ (1) ; (C) : $\frac{1}{2}J_Δ·ω^2 = T·r·Δθ = T·h$ (2)"),
          q(3, '<span class="kw">Vitesse et tension</span>', r"(1) + (2) : $\frac{1}{2}(m + \frac{M}{2})V^2 = m·g·h$ ⇒ $V = \sqrt{10} ≈ 3,16~\u{m·s^{−1}}$ ; $T = \frac{M·V^2}{4h} ≈ 6,67~\u{N}$")),
    "    " + fig("treuilCorps", None, '{"final":1}'))))

S.append(slide("bilan", "L’essentiel", "Ce qu’il faut retenir du chapitre", "Bilan", "Exercices et bilan", "L’essentiel du chapitre", ("", "",
    rf'''    <div class="bilan">
      <div class="bil"><h3>Translation</h3><p>Tout vecteur $\vec{{AB}}$ du solide reste constant : rectiligne, curviligne ou circulaire.</p></div>
      <div class="bil"><h3>Énergie cinétique (translation)</h3><span class="eq-wrap">${EC} = \frac{{1}}{{2}}m·V^2$</span><p>en joules ; $V$ en $\u{{m·s^{{−1}}}}$</p></div>
      <div class="bil"><h3>Énergie cinétique (rotation)</h3><span class="eq-wrap">${EC} = \frac{{1}}{{2}}J_Δ·ω^2$</span><p>$ω$ en $\u{{rad·s^{{−1}}}}$</p></div>
      <div class="bil"><h3>Moment d’inertie</h3><span class="eq-wrap">$J_Δ = Σ m_i·r_i^2$</span><p>disque : $\frac{{1}}{{2}}m·r^2$ ; anneau : $m·r^2$</p></div>
      <div class="bil"><h3>Théorème de l’énergie cinétique</h3><span class="eq-wrap">$ΔE_{{\u{{C}}}} = Σ W(\vec{{F}}_{{\u{{ext}}}})$</span><p>référentiel galiléen ; forces constantes ou non</p></div>
      <div class="bil"><h3>Méthode</h3><p>Système, référentiel, états initial et final, bilan des forces, travaux, théorème.</p></div>
    </div>''')))

(SRC / "slides.html").write_text("\n".join(S))
print(len(S), "diapositives")
