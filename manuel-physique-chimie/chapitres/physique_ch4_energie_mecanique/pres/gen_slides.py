"""Écrit src/slides.html (physique, chapitre 4 : Énergie potentielle de pesanteur et énergie mécanique).
Formules entre $…$ (converties par build.py) ; tableaux de mesures générés par mtab()."""
import pathlib
SRC = pathlib.Path(__file__).resolve().parent / "src"

BULB = ('<svg class="bulb" viewBox="0 0 120 120"><circle cx="60" cy="60" r="57" fill="#e89b00"/>'
        '<path d="M60,22 a24,24 0 0 1 14,43 q-4,4 -4,10 v4 h-20 v-4 q0,-6 -4,-10 a24,24 0 0 1 14,-43 z" fill="#fff"/>'
        '<rect x="50" y="83" width="20" height="6" rx="3" fill="#fff"/><rect x="52" y="92" width="16" height="6" rx="3" fill="#fff"/></svg>')
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




def E(k, i=""):
    return "E_{\\u{" + k + "}" + i + "}"


EC, EPP, EM = E("C"), E("pp"), E("m")
W = r"W_{A→B}(\vec{P})"
P1 = ("Partie 1", "Partie 1 · Énergie potentielle")
P2 = ("Partie 2", "Partie 2 · Conservation")
P3 = ("Partie 3", "Partie 3 · Frottements")
EX = ("Exercices", "Exercices et bilan")
S = []

T_DOC4 = mtab([("Position", [rf"$M_{i}$" for i in range(1, 9)]), ("$t$ (ms)", ["0", "60", "120", "180", "240", "300", "360", "420"]),
               ("$d_i$ (cm)", ["—", "1,30", "2,30", "3,50", "4,60", "5,90", "7,10", "—"]),
               ("$D_i$ (cm)", ["14,5", "14,0", "13,2", "11,7", "9,7", "7,1", "3,8", "0"])], "wide")
T_REP3 = mtab([("Position", [rf"$M_{i}$" for i in range(1, 9)]), (r"$V_i$ (m·s<sup>−1</sup>)", ["—", "0,108", "0,192", "0,292", "0,383", "0,492", "0,592", "—"]),
               (f"${E('C', 'i')}$ (mJ)", ["—", "4,30", "13,4", "31,1", "53,8", "88,5", "128", "—"]),
               (f"${E('pp', 'i')}$ (mJ)", ["181", "174", "164", "146", "121", "88,4", "47,3", "0"]),
               (f"${E('m', 'i')}$ (mJ)", ["—", "179", "178", "177", "175", "177", "175", "—"])], "wide")
T_DOC5 = mtab([("Position", [rf"$P_{i}$" for i in range(1, 6)]), ("$t$ (ms)", ["0", "120", "240", "360", "480"]),
               (r"$V$ (m·s<sup>−1</sup>)", ["0,100", "0,268", "0,436", "0,604", "0,773"]), ("$h$ (cm)", ["3,64", "3,25", "2,52", "1,43", "0"])])
T_REP5 = mtab([("Position", [rf"$P_{i}$" for i in range(1, 6)]), (f"${EC}$ (mJ)", ["3,66", "26,3", "69,6", "134", "219"]),
               (f"${EPP}$ (mJ)", ["261", "233", "181", "103", "0"]), (f"${EM}$ (mJ)", ["265", "259", "250", "236", "219"])])

# ================= TITRE =================
S.append('''<section class="slide s-title" data-kind="titre" data-group="Début" data-menu="Titre du chapitre">
  <div class="fig-full fig bare" data-scene="titre"></div>
  <div class="title-block">
    <div class="eyebrow">PHYSIQUE · TRAVAIL MÉCANIQUE ET ÉNERGIE</div>
    <div class="chapter">Chapitre 4</div>
    <h1>Énergie potentielle de pesanteur et énergie mécanique</h1>
    <div class="plan">
      <span><b>1</b>Travail du poids et énergie potentielle de pesanteur</span>
      <span><b>2</b>Énergie mécanique et sa conservation</span>
      <span><b>3</b>Non-conservation de l’énergie mécanique</span>
    </div>
    <div class="hint">Appuyez sur → (ou cliquez sur la flèche en bas à droite) pour avancer · F : plein écran</div>
  </div>
</section>
''')

# ================= PARTIE 1 =================
S.append(slide("situation", "Situation de départ", "Partie 1 — Une énergie liée à l’altitude", *P1, "Situation de départ", cols(".9fr", "1.1fr",
    situ("L’<b>eau retenue en altitude</b> derrière un barrage peut, en descendant, faire tourner les turbines d’une centrale. Un <b>rocher au sommet d’une falaise</b> possède une énergie liée à son altitude, qui se transforme en énergie cinétique dès qu’il se détache.",
         ["Comment exprimer cette énergie de position ?", "Quel lien a-t-elle avec le travail du poids ?"]),
    "    " + fig("barrage"))))

S.append(slide("activite", "Activité 1", "Repérage d’un solide et énergie potentielle de pesanteur", *P1, "Activité 1 · doc 1", cols("1.15fr", ".85fr",
    "    <div class=\"stack center\">\n      " + card(rf"<b>Doc 1.</b> Un solide (S) de masse $m$ est au voisinage de la Terre ($g$ uniforme). Son centre d’inertie $G$ est repéré par sa cote $z$ sur un axe $Oz$ <b>vertical orienté vers le haut</b>.<br>Il possède une <b>énergie potentielle de pesanteur</b> (admise) : ${EPP} = m·g·z + C$, où $C$ est une constante. On choisit une position $G_0$ d’altitude $z_0$, l’<b>état de référence</b>, où l’on pose ${EPP} = 0$.<br>Le solide passe de A (altitude $z_A$) à B (altitude $z_B$) ; la dénivellation est $h$.", "small")
    + '\n      <div class="rappel small"><b>Rappel.</b> Travail du poids de A à B (axe $Oz$ vers le haut) : $W_{A→B}(\\vec{P}) = m·g·(z_A − z_B)$. Il est moteur quand le solide descend, résistant quand il monte ; il ne dépend pas du chemin suivi.</div>\n    </div>',
    "    " + fig("repere", doc(1, "Une caisse soulevée de A vers B")))))

S.append(slide("questions", "Questions", "Activité 1 — Énergie potentielle et état de référence", *P1, "Questions 1 à 3", cols("1.15fr", ".85fr",
    qlist(q(1, "Qu’est-ce que l’énergie potentielle de pesanteur ? Quelle est son unité ?",
            "C’est l’énergie que possède un solide du fait de sa <b>position par rapport à la Terre</b>, avec laquelle il est en interaction. Unité : le <b>joule (J)</b>.", "Définir."),
          q(2, rf"Qu’est-ce que l’état de référence ? Exprimer $C$ en fonction de $m$, $g$ et $z_0$.",
            rf"Position choisie arbitrairement où ${EPP} = 0$. Pour $z = z_0$ : $m·g·z_0 + C = 0$ ⇒ $C = −m·g·z_0$", "Déterminer."),
          q(3, rf"En déduire ${EPP}$ en fonction de $m$, $g$, $z$ et $z_0$, puis pour $z_0 = 0$.",
            rf"${EPP} = m·g·(z − z_0)$ ; si $z_0 = 0$ : ${EPP} = m·g·z$", "Établir.")),
    "    " + fig("repere", doc(1, "Axe Oz et état de référence")))))

S.append(slide("questions", "Questions", "Activité 1 — Signe de Epp et travail du poids", *P1, "Questions 4 et 5", cols("1.15fr", ".85fr",
    qlist(q(4, rf"Quel est le signe de ${EPP}$ au-dessus et au-dessous de l’état de référence ? Comment varie ${EPP}$ quand $z$ augmente ?",
            rf"$z > z_0$ : ${EPP} > 0$ ; $z < z_0$ : ${EPP} < 0$. ${EPP}$ <b>augmente</b> avec l’altitude.", "Discuter."),
          q(5, rf"Exprimer $Δ{EPP} = {E('pp', 'B')} − {E('pp', 'A')}$ et démontrer la relation avec $W_{{A→B}}(\vec{{P}})$.",
            rf"$Δ{EPP} = (m·g·z_B + C) − (m·g·z_A + C) = m·g·(z_B − z_A)$<br>Or $W_{{A→B}}(\vec{{P}}) = m·g·(z_A − z_B)$ ⇒ $Δ{EPP} = −W_{{A→B}}(\vec{{P}})$", "Démontrer.")),
    "    " + fig("figEpp", "Epp en fonction de z"))))

S.append(slide("retenir", "À retenir", "Énergie potentielle de pesanteur", *P1, "À retenir · Epp", cols("1.25fr", ".75fr",
    rf"""    <div class="stack center">
      <div class="def"><h3>Énergie potentielle de pesanteur</h3><p style="margin:0 0 8px">L’axe $Oz$ étant vertical et orienté vers le <b>haut</b>, un solide de masse $m$ dont le centre d’inertie est à l’altitude $z$ possède l’énergie potentielle de pesanteur :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">${EPP} = m·g·z + C$  soit  ${EPP} = m·g·(z − z_0)$</span></div>
        <p style="margin:8px 0 0">${EPP}$ en <b>joules (J)</b>, $m$ en <b>kg</b>, $g$ en <b>$\u{{N·kg^{{−1}}}}$</b>, $z$ et $z_0$ en <b>mètres (m)</b>. $z_0$ est l’altitude de l’<b>état de référence</b>, où ${EPP} = 0$ et $C = −m·g·z_0$.<br>${EPP}$ est <b>positive</b> au-dessus de l’état de référence, <b>négative</b> au-dessous ; elle <b>augmente</b> avec l’altitude.</p></div>
    </div>""", "    " + fig("figEpp"))))

S.append(slide("retenir", "À retenir", "Variation de l’énergie potentielle de pesanteur", *P1, "À retenir · ΔEpp", cols("1.2fr", ".8fr",
    rf"""    <div class="stack center">
      <div class="def"><h3>Variation de l’énergie potentielle de pesanteur</h3><p style="margin:0 0 10px">Quand le solide passe de A (altitude $z_A$) à B (altitude $z_B$), la variation de son énergie potentielle de pesanteur <b>ne dépend pas de l’état de référence choisi</b> et elle est égale à l’<b>opposé du travail de son poids</b> :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Δ{EPP} = {E('pp', 'B')} − {E('pp', 'A')} = m·g·(z_B − z_A) = −W_{{A→B}}(\vec{{P}})$</span></div></div>
    </div>""", "    " + fig("repere"))))

S.append(slide("application", "Application", "Ranger un dictionnaire", *P1, "Application · dictionnaire", cols("1.15fr", ".85fr",
    "    <div class=\"stack\">\n      " + card(r"Dictionnaire : $m = 600~\u{g}$ ; sur une table à $h_1 = 80~\u{cm}$ du sol, puis rangé sur une étagère à $h_2 = 2,00~\u{m}$ du sol ; $g = 10~\u{N·kg^{−1}}$.", "small") + "\n" +
    qlist(q(1, rf"Référence : le sol ($z_0 = 0$). Calculer ${E('pp', '1')}$ et ${E('pp', '2')}$.", rf"${E('pp', '1')} = 0,600×10×0,80 = 4,8~\u{{J}}$ ; ${E('pp', '2')} = 0,600×10×2,00 = 12,0~\u{{J}}$"),
          q(2, r"Référence : la table ($z_0 = h_1$). Calculer de nouveau ces énergies.", r"$E'_{\u{pp}1} = 0$ ; $E'_{\u{pp}2} = 0,600×10×(2,00 − 0,80) = 7,2~\u{J}$"),
          q(3, rf"Calculer $Δ{EPP}$ dans les deux cas ; en déduire $W(\vec{{P}})$.", rf"$Δ{EPP} = 12,0 − 4,8 = 7,2 − 0 = +7,2~\u{{J}}$ : indépendante de la référence.<br>$W(\vec{{P}}) = −Δ{EPP} = −7,2~\u{{J}}$ (travail résistant)")) + "\n    </div>",
    "    " + fig("appDico"))))

# ================= PARTIE 2 =================
S.append(slide("situation", "Situation de départ", "Partie 2 — L’énergie mécanique", *P2, "Situation de départ", cols(".85fr", "1.15fr",
    situ("Quand une bille tombe en <b>chute libre</b>, ou qu’un solide descend une <b>rampe parfaitement lisse</b>, son altitude diminue tandis que sa vitesse augmente. L’énergie potentielle de pesanteur perdue semble se transformer en énergie cinétique.",
         ["Quelle grandeur réunit ces deux énergies ?", "Dans quelles conditions reste-t-elle constante ?"]),
    "    " + fig("rampe"))))

S.append(slide("activite", "Activité 2", "Étude théorique : la chute libre", *P2, "Activité 2 · doc 2", cols("1.3fr", ".7fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 2.</b> Un solide (S) en <b>chute libre</b> n’est soumis qu’à son <b>poids</b> $\vec{P}$. Il passe du point A (altitude $z_A$, vitesse $V_A$) au point B (altitude $z_B$, vitesse $V_B$).") + "\n" +
    qlist(q(1, rf"Écrire l’expression de l’énergie mécanique ${EM}$ d’un solide en translation, de masse $m$ et de vitesse $V$, à l’altitude $z$.",
            rf"${EM} = {EC} + {EPP} = \frac{{1}}{{2}}m·V^2 + m·g·z + C$", "Définir.")) + "\n    </div>",
    "    " + fig("chuteBille", doc(2, "Chute libre de A à B")))))

S.append(slide("questions", "Questions", "Activité 2 — Conservation en chute libre", *P2, "Question 2", cols("1.3fr", ".7fr",
    qlist(q(2, rf"Appliquer le théorème de l’énergie cinétique entre A et B, puis utiliser $Δ{EPP} = −{W}$ pour montrer que ${E('m', 'B')} = {E('m', 'A')}$. Que dire du poids ?",
            rf"Seul le poids agit : $Δ{EC} = {W}$ et $Δ{EPP} = −{W}$ ⇒ $Δ{EC} = −Δ{EPP}$<br>${E('C', 'B')} + {E('pp', 'B')} = {E('C', 'A')} + {E('pp', 'A')}$, soit ${E('m', 'B')} = {E('m', 'A')}$ : l’énergie mécanique se <b>conserve</b> ; le poids est une <b>force conservative</b>.", "Démontrer.")),
    "    " + fig("chuteBille", doc(2, "Seul le poids agit")))))

S.append(slide("activite", "Activité 2", "Étude expérimentale : le plan incliné sans frottement", *P2, "Activité 2 · docs 3 et 4", rows(
    '    <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:24px;align-items:stretch;height:300px;flex:none">'
    + card(r"<b>Doc 3.</b> Mobile autoporteur : $m = 732~\u{g}$, lâché sur une table à coussin d’air inclinée de $α = 10°$ ; frottements négligeables ; $g = 9,8~\u{N·kg^{−1}}$. Positions $M_1, …, M_8$ du centre d’inertie toutes les $τ = 60~\u{ms}$.<br>Référence : plan horizontal passant par $M_8$. $d_i = M_{i−1}M_{i+1}$ ; $D_i = M_iM_8$ ; altitude de $M_i$ : $h_i = D_i·\u{sin}α$.", "small")
    + fig("tableAir4", doc(3, "Table à coussin d’air inclinée")) + "</div>",
    [fig("enreg4", doc(4, "Enregistrement à l’échelle 1")), '<div style="display:grid;place-items:center">' + T_DOC4 + "</div>"], "1fr")))

S.append(slide("questions", "Questions", "Activité 2 — Exploiter l’enregistrement", *P2, "Question 3", ("", "",
    qlist(q(3, rf"Exprimer $V_i$, ${E('C', 'i')}$ et ${E('pp', 'i')}$ en $M_i$ ; les calculer, puis ${E('m', 'i')} = {E('C', 'i')} + {E('pp', 'i')}$. Que remarque-t-on ?",
            rf"$V_i = \frac{{d_i}}{{2τ}}$ ; ${E('C', 'i')} = \frac{{1}}{{2}}m·V_i^2$ ; ${E('pp', 'i')} = m·g·D_i·\u{{sin}}α$. En $M_2$ : $V_2 = \frac{{1,30×10^{{−2}}}}{{0,120}} ≈ 0,108~\u{{m·s^{{−1}}}}$ ; ${E('pp', '2')} ≈ 174~\u{{mJ}}$" + T_REP3 +
            rf"${EC}$ augmente, ${EPP}$ diminue, mais ${EM}$ reste pratiquement constante, voisine de $177~\u{{mJ}}$.", "Calculer.")))))

S.append(slide("questions", "Questions", "Activité 2 — Les trois courbes", *P2, "Questions 4 et 5", cols("1.05fr", ".95fr",
    qlist(q(4, rf"Tracer ${EC}$, ${EPP}$ et ${EM}$ en fonction du temps. Interpréter.",
            rf"${EPP}(t)$ décroît pendant que ${EC}(t)$ croît : l’énergie potentielle se transforme en énergie cinétique. ${EM}(t)$ est pratiquement <b>horizontale</b> : pas de perte d’énergie mécanique.", "Interpréter."),
          q(5, rf"Le mobile est soumis à $\vec{{P}}$ et à $\vec{{R}}_N$. À quelle condition l’énergie mécanique se conserve-t-elle ?",
            rf"$\vec{{R}}_N$ est perpendiculaire au déplacement : $W(\vec{{R}}_N) = 0$. ${EM}$ se conserve si le solide n’est soumis qu’à son <b>poids</b>, ou si les autres forces ont un <b>travail nul</b> (pas de frottement).", "Formuler.")),
    "    " + fig("graphEnergies", "Énergies du mobile"))))

S.append(slide("retenir", "À retenir", "Énergie mécanique", *P2, "À retenir · Em", ("", "",
    rf"""    <div class="stack center" style="flex:1">
      <div class="def"><h3>Énergie mécanique</h3><p style="margin:0 0 10px">L’énergie mécanique d’un solide, à un instant donné, est la <b>somme de son énergie cinétique et de son énergie potentielle de pesanteur</b> :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">${EM} = {EC} + {EPP} = \frac{{1}}{{2}}m·V^2 + m·g·z + C$</span></div>
        <p style="margin:10px 0 0">Elle s’exprime en <b>joules (J)</b>.</p></div>
      <div class="fig" data-scene="graphEnergies" style="height:330px;flex:none;width:100%"></div>
    </div>""")))

S.append(slide("retenir", "À retenir", "Conservation de l’énergie mécanique", *P2, "À retenir · conservation", cols("1.1fr", ".9fr",
    rf"""    <div class="stack center">
      <div class="def"><h3>Conservation de l’énergie mécanique</h3><p style="margin:0 0 10px">Lorsqu’un solide est en <b>chute libre</b>, ou glisse <b>sans frottement</b> (les forces autres que le poids ont un travail <b>nul</b>), son énergie mécanique se <b>conserve</b>.</p>
        <p style="margin:0 0 10px">Au cours du mouvement, l’énergie potentielle de pesanteur se transforme en <b>énergie cinétique</b> quand le solide descend, et inversement quand il <b>monte</b>.</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Δ{EM} = 0$ ⟺ ${E('C', 'B')} + {E('pp', 'B')} = {E('C', 'A')} + {E('pp', 'A')}$ ⟺ $Δ{EC} = −Δ{EPP}$</span></div></div>
    </div>""", "    " + fig("rampe"))))

S.append(slide("methode", "Méthode", "Utiliser la conservation de l’énergie mécanique", *P2, "Méthode", rows(
    r"""    <div class="method"><h3>Méthode : utiliser la conservation de l’énergie mécanique</h3>
      <ol class="steps"><li>Définir le <b>système</b> et faire le <b>bilan des forces</b> extérieures.</li><li>Vérifier que l’énergie mécanique se <b>conserve</b> : seul le poids travaille (chute libre, glissement sans frottement).</li><li>Choisir l’<b>état de référence</b> de l’énergie potentielle de pesanteur.</li><li>Écrire l’énergie mécanique dans l’<b>état initial</b> et dans l’<b>état final</b>.</li><li>Écrire leur <b>égalité</b> et résoudre pour trouver la grandeur cherchée (vitesse, altitude, distance).</li></ol></div>""",
    [fig("appBille", None, '{"final":1}'), fig("ex1Rampe")], ".8fr 1.2fr")))

S.append(slide("application", "Application", "Une bille lancée vers le haut", *P2, "Application · bille", cols("1.2fr", ".8fr",
    "    <div class=\"stack\">\n      " + card(r"Bille d’acier : $m = 100~\u{g}$, lancée verticalement vers le haut depuis A ($z_A = 1,2~\u{m}$) avec $V_A = 6,0~\u{m·s^{−1}}$ ; résistance de l’air négligeable ; référence : le sol ($z_0 = 0$) ; $g = 10~\u{N·kg^{−1}}$.", "small") + "\n" +
    qlist(q(1, rf"Calculer ${E('C', 'A')}$, ${E('pp', 'A')}$ et ${E('m', 'A')}$.", rf"${E('C', 'A')} = \frac{{1}}{{2}}×0,100×6,0^2 = 1,8~\u{{J}}$ ; ${E('pp', 'A')} = 0,100×10×1,2 = 1,2~\u{{J}}$ ; ${E('m', 'A')} = 3,0~\u{{J}}$"),
          q(2, "Justifier la conservation de l’énergie mécanique ; calculer l’altitude maximale $z_B$.",
            rf"Chute libre : seul le poids agit, ${EM}$ se conserve. Au sommet, $V_B = 0$ : $m·g·z_B = {E('m', 'A')}$ ⇒ $z_B = \frac{{3,0}}{{0,100×10}} = 3,0~\u{{m}}$")) + "\n    </div>",
    "    " + fig("appBille", None, '{"final":1}'))))

# ================= PARTIE 3 =================
S.append(slide("situation", "Situation de départ", "Partie 3 — Et avec des frottements ?", *P3, "Situation de départ", cols(".9fr", "1.1fr",
    situ("Un <b>skieur</b> qui descend une pente, ou une <b>caisse</b> qui glisse sur un sol rugueux, subit des frottements qui freinent son mouvement et <b>échauffent</b> les surfaces en contact. L’augmentation de l’énergie cinétique ne compense plus la diminution de l’énergie potentielle.",
         ["Comment varie alors l’énergie mécanique ?", "Que devient l’énergie « perdue » ?"]),
    "    " + fig("caisseRugueuse"))))

S.append(slide("activite", "Activité 3", "Étude expérimentale : débit d’air réduit", *P3, "Activité 3 · doc 5", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 5.</b> Même dispositif ($m = 732~\u{g}$, $α = 10°$, $g = 9,8~\u{N·kg^{−1}}$), mais on <b>réduit modérément le débit d’air</b> : le mobile frotte un peu sur la table. On mesure sa vitesse $V$ et l’altitude $h$ de son centre d’inertie au-dessus de $P_5$ (état de référence). Entre $P_1$ et $P_5$, il parcourt $P_1P_5 = 20,9~\u{cm}$.", "small") + "\n      " + T_DOC5 + "\n    </div>",
    "    " + fig("tableAir4", doc(5, "Débit d’air réduit"), '{"reduit":1}'))))

S.append(slide("questions", "Questions", "Activité 3 — L’énergie mécanique diminue", *P3, "Question 1", cols("1.25fr", ".75fr",
    qlist(q(1, rf"Calculer ${EC}$, ${EPP}$ et ${EM}$ en chaque position. Comment évolue l’énergie mécanique ?",
            rf"${EC} = \frac{{1}}{{2}}m·V^2$ ; ${EPP} = m·g·h$. En $P_1$ : ${EC} = 3,66~\u{{mJ}}$ ; ${EPP} = 0,732×9,8×0,0364 ≈ 261~\u{{mJ}}$" + T_REP5 + "L’énergie mécanique <b>diminue</b> : elle ne se conserve pas.", "Exploiter.")),
    "    " + fig("tableAir4", doc(5, "Mobile freiné"), '{"reduit":1}'))))

S.append(slide("activite", "Activité 3", "Étude théorique : glissement avec frottement", *P3, "Activité 3 · doc 6", cols("1fr", "1fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 6.</b> Un solide (S) de masse $m$ glisse de A (altitude $z_A$) vers B (altitude $z_B$) sur un plan incliné d’un angle $α$. Il est soumis à son poids $\vec{P}$ et à la réaction $\vec{R}$ du plan, qui se décompose en une composante normale $\vec{R}_N$ et une force de frottement $\vec{f}$, parallèle au plan, opposée au mouvement, d’intensité constante $f$ :<br><span style=\"display:block;text-align:center;margin-top:8px\">$\vec{R} = \vec{R}_N + \vec{f}$</span>") + "\n    </div>",
    "    " + fig("planFrott", doc(6, "Glissement avec frottement de A vers B")))))

S.append(slide("questions", "Questions", "Activité 3 — Variation de l’énergie mécanique", *P3, "Questions 2 et 3", cols("1.2fr", ".8fr",
    qlist(q(2, rf"Exprimer $Δ{EM} = {E('m', 'B')} − {E('m', 'A')}$ en fonction de $Δ{EC}$ et $Δ{EPP}$.",
            rf"$Δ{EM} = ({E('C', 'B')} − {E('C', 'A')}) + ({E('pp', 'B')} − {E('pp', 'A')}) = Δ{EC} + Δ{EPP}$", "Exprimer."),
          q(3, rf"Appliquer le théorème de l’énergie cinétique, puis utiliser $Δ{EPP} = −{W}$ pour exprimer $Δ{EM}$ en fonction de $W_{{A→B}}(\vec{{R}})$.",
            rf"$Δ{EC} = {W} + W_{{A→B}}(\vec{{R}}) = −Δ{EPP} + W_{{A→B}}(\vec{{R}})$<br>⇒ $Δ{EM} = Δ{EC} + Δ{EPP} = W_{{A→B}}(\vec{{R}})$", "Établir.")),
    "    " + fig("planFrott", doc(6, "Forces sur le solide")))))

S.append(slide("questions", "Questions", "Activité 3 — Frottements et chaleur", *P3, "Questions 4 à 6", cols("1.3fr", ".7fr",
    qlist(q(4, rf"Avec $\vec{{R}} = \vec{{R}}_N + \vec{{f}}$, montrer que $Δ{EM} = W_{{A→B}}(\vec{{f}}) = −f·AB$. Signe ?",
            rf"$W(\vec{{R}}_N) = 0$ ($\vec{{R}}_N$ ⊥ déplacement) ; $W(\vec{{f}}) = −f·AB$ ⇒ $Δ{EM} = −f·AB < 0$ : ${EM}$ <b>diminue</b>.", "Démontrer."),
          q(5, rf"Que devient l’énergie « perdue » ? Relation entre $Δ{EM}$, $W(\vec{{f}})$ et la chaleur $Q$ ?",
            rf"Elle est transformée en <b>énergie thermique</b> (chaleur $Q > 0$) : $Δ{EM} = W_{{A→B}}(\vec{{f}}) = −Q$", "Interpréter."),
          q(6, "Doc 5 : en déduire la chaleur $Q$ dégagée entre $P_1$ et $P_5$ et l’intensité $f$ des frottements.",
            r"$Q = −ΔE_{\u{m}} = 265 − 219 = 46~\u{mJ}$ ; $f = \frac{Q}{P_1P_5} = \frac{0,046}{0,209} ≈ 0,22~\u{N}$", "Estimer.")),
    "    " + fig("rampe", None, '{"frott":1}'))))

S.append(slide("retenir", "À retenir", "Non-conservation de l’énergie mécanique", *P3, "À retenir · frottements", cols("1.15fr", ".85fr",
    rf"""    <div class="stack center">
      <div class="def"><h3>Non-conservation de l’énergie mécanique</h3><p style="margin:0 0 8px">Lorsqu’un solide en mouvement est soumis à des <b>forces de frottement</b>, son énergie mécanique ne se conserve pas : elle <b>diminue</b>. Entre deux positions A et B, sa variation est égale au <b>travail des forces de frottement</b> :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Δ{EM} = {E('m', 'B')} − {E('m', 'A')} = Δ{EC} + Δ{EPP} = W_{{A→B}}(\vec{{f}}) = −f·AB < 0$</span></div></div>
      <div class="def"><h3>Transformation en énergie thermique</h3><p style="margin:0 0 8px">Une partie de l’énergie mécanique est transformée en <b>énergie thermique</b> (chaleur $Q$), cédée au milieu extérieur :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Δ{EM} = −Q$  soit  $Q = −Δ{EM} = f·AB$</span></div>
        <p style="margin:8px 0 0">$Q$ s’exprime en <b>joules (J)</b> ; elle est <b>positive</b>.</p></div>
    </div>""", "    " + fig("rampe", None, '{"frott":1}'))))

S.append(slide("application", "Application", "Un solide freiné sur un plan incliné", *P3, "Application · plan incliné", cols("1.2fr", ".8fr",
    "    <div class=\"stack\">\n      " + card(r"Solide (S) : $m = 0,20~\u{kg}$ ; plan incliné de $α = 30°$, avec frottement ; $V_A = 1,0~\u{m·s^{−1}}$, $V_B = 2,0~\u{m·s^{−1}}$ (B plus bas que A) ; $AB = L = 0,40~\u{m}$ ; $g = 10~\u{N·kg^{−1}}$.", "small") + "\n" +
    qlist(q(1, rf"Calculer $Δ{EC}$ et $Δ{EPP}$ entre A et B ; en déduire $Δ{EM}$.",
            rf"$Δ{EC} = \frac{{1}}{{2}}×0,20×(2,0^2 − 1,0^2) = 0,30~\u{{J}}$ ; $Δ{EPP} = −m·g·L·\u{{sin}}α = −0,40~\u{{J}}$ ; $Δ{EM} = −0,10~\u{{J}}$"),
          q(2, rf"Montrer que $Δ{EM} = W_{{A→B}}(\vec{{f}})$ ; en déduire $Q$ et $f$.",
            rf"$Δ{EC} = W(\vec{{P}}) + W(\vec{{R}}_N) + W(\vec{{f}})$ avec $W(\vec{{P}}) = −Δ{EPP}$ et $W(\vec{{R}}_N) = 0$ ⇒ $Δ{EM} = W(\vec{{f}})$<br>$Q = 0,10~\u{{J}}$ ; $f = \frac{{Q}}{{AB}} = \frac{{0,10}}{{0,40}} = 0,25~\u{{N}}$")) + "\n    </div>",
    "    " + fig("planFrott", None, '{"app":1}'))))

# ================= EXERCICES =================
S.append(slide("quiz", "Vrai ou faux ?", "Je vérifie mes connaissances", *EX, "Vrai ou faux ?", ("", "",
    '    <div class="vflist">\n      ' + "\n      ".join([
        vf("a", "faux", "L’énergie potentielle de pesanteur d’un solide est toujours positive.", rf"Faux : ${EPP} < 0$ au-dessous de l’état de référence."),
        vf("b", "faux", "La variation de l’énergie potentielle de pesanteur entre deux positions dépend de l’état de référence choisi.", rf"Faux : $Δ{EPP} = m·g·(z_B − z_A)$ ne dépend pas de $z_0$."),
        vf("c", "vrai", "Quand un solide monte, le travail de son poids est résistant et son énergie potentielle de pesanteur augmente.", rf"Vrai : $Δ{EPP} = −W(\vec{{P}}) > 0$."),
        vf("d", "vrai", "L’énergie mécanique d’un solide en chute libre se conserve.", "Vrai : seul le poids travaille."),
        vf("e", "faux", "Un solide qui glisse sans frottement sur un plan incliné garde une énergie cinétique constante.", rf"Faux : c’est ${EM}$ qui reste constante ; ${EC}$ augmente quand le solide descend."),
        vf("f", "faux", "En présence de frottements, l’énergie mécanique d’un solide augmente.", rf"Faux : elle diminue, $Δ{EM} = −Q < 0$.")]) + "\n    </div>")))

S.append(slide("exercice", "Exercice 1", "Remontée d’un plan incliné", *EX, "Exercice 1 · énoncé", rows(
    "    " + card(r"Objet (S), point matériel de masse $m = 2,00~\u{kg}$ : glisse sans frottement sur la piste horizontale (HA), puis aborde en A la piste (AB) inclinée de $α = 20°$ ; $V_A = 8,00~\u{m·s^{−1}}$ ; pas de frottement sur (AB) ; $g = 9,81~\u{N·kg^{−1}}$.", "small"),
    [fig("ex1Rampe"), r'''<ol class="exlist small"><li>Référence : le plan horizontal de (HA). Calculer $E_{\u{m}A}$.</li><li>L’objet s’arrête en B ($V_B = 0$) : exprimer $E_{\u{m}B}$ en fonction de $m$, $g$, $L = AB$ et $α$.</li><li>Par conservation de l’énergie mécanique, calculer $L = AB$.</li></ol>'''], "1.3fr .7fr")))

S.append(slide("exercice", "Correction", "Exercice 1 — Remontée d’un plan incliné", *EX, "Exercice 1 · correction", ("", "",
    '    <div class="fig" data-scene="ex1Rampe" data-opts=\'{"final":1}\' style="height:180px;flex:none"></div>\n' +
    qlist(q(1, '<span class="kw">En A</span>', rf"${E('pp', 'A')} = 0$ : ${E('m', 'A')} = \frac{{1}}{{2}}m·V_A^2 = \frac{{1}}{{2}}×2,00×8,00^2 = 64,0~\u{{J}}$"),
          q(2, '<span class="kw">En B</span>', rf"$V_B = 0$ et $z_B = L·\u{{sin}}α$ : ${E('m', 'B')} = m·g·L·\u{{sin}}α$"),
          q(3, '<span class="kw">Conservation</span>', rf"${E('m', 'B')} = {E('m', 'A')}$ ⇒ $L = \frac{{V_A^2}}{{2g·\u{{sin}}α}} = \frac{{8,00^2}}{{2×9,81×\u{{sin}}20°}} ≈ 9,54~\u{{m}}$")))))

S.append(slide("exercice", "Exercice 2", "Une piste horizontale et un demi-cercle", *EX, "Exercice 2 · énoncé", cols("1.2fr", ".8fr",
    "    <div class=\"stack\">\n      " + card(r"Solide ponctuel : $m = 0,50~\u{kg}$, lancé de A sur la piste horizontale AB ($AB = 1,0~\u{m}$), prolongée en B par un <b>tube</b> en demi-cercle vertical de centre O et de rayon $R = 1,0~\u{m}$ ; sommet C à l’altitude $2R$ ; ${EPP} = 0$ au niveau de AB ; $g = 9,81~\u{N·kg^{−1}}$.".replace("{EPP}", EPP), "small") +
    r'''
      <ol class="exlist small"><li>Sans frottement : vitesse minimale $V_{\u{min}}$ en A pour atteindre C (vitesse pratiquement nulle en C).</li><li>Frottements équivalents à une force d’intensité constante $f = 1,0~\u{N}$, tangente à la trajectoire et opposée au mouvement, sur tout ABC : nouvelle vitesse minimale $V'_{\u{min}}$.</li></ol>
    </div>''', "    " + fig("ex2Looping"))))

S.append(slide("exercice", "Correction", "Exercice 2 — Une piste horizontale et un demi-cercle", *EX, "Exercice 2 · correction", ("", "",
    qlist(q(1, '<span class="kw">Sans frottement</span>', rf"${E('m', 'A')} = {E('m', 'C')}$, $V_C = 0$, $z_C = 2R$ : $\frac{{1}}{{2}}m·V_{{\u{{min}}}}^2 = m·g·2R$ ⇒ $V_{{\u{{min}}}} = 2\sqrt{{g·R}} = 2\sqrt{{9,81×1,0}} ≈ 6,26~\u{{m·s^{{−1}}}}$"),
          q(2, '<span class="kw">Avec frottement</span>', rf"Trajet : $AB + πR ≈ 4,14~\u{{m}}$ ; ${E('m', 'C')} − {E('m', 'A')} = −f·(AB + πR)$<br>$\frac{{1}}{{2}}m·V'^2_{{\u{{min}}}} = 2m·g·R + f·(AB + πR) = 9,81 + 4,14 = 13,95~\u{{J}}$ ⇒ $V'_{{\u{{min}}}} = \sqrt{{\frac{{13,95}}{{0,25}}}} ≈ 7,47~\u{{m·s^{{−1}}}}$")))))

S.append(slide("exercice", "Exercice 3", "Bilan énergétique d’un skieur", *EX, "Exercice 3 · énoncé", rows(
    "    " + card(r"Skieur : $m = 70~\u{kg}$, part sans vitesse de A ; piste inclinée $AB = 100~\u{m}$, dénivellation $h = 30~\u{m}$ ; puis piste horizontale $BC = 50~\u{m}$, arrêt en C. Référence : le niveau de BC ; $g = 10~\u{N·kg^{−1}}$. Frottements : force constante parallèle à la piste sur chaque tronçon.", "small"),
    [fig("ex3Ski"), r'''<ol class="exlist small"><li>Calculer $E_{\u{pp}A}$ et $E_{\u{m}A}$.</li><li>Sans frottement sur AB : vitesse $V_{B,\u{th}}$ en B ?</li><li>En réalité $V_B = 20~\u{m·s^{−1}}$ : $E_{\u{m}B}$, $ΔE_{\u{m}}$, $Q_1$ et $f_1$ sur AB.</li><li>$Q_2$ et $f_2$ sur BC.</li></ol>'''], "1.35fr .65fr")))

S.append(slide("exercice", "Correction", "Exercice 3 — Bilan énergétique d’un skieur", *EX, "Exercice 3 · correction", ("", "",
    qlist(q(1, '<span class="kw">En A</span>', rf"${E('pp', 'A')} = m·g·h = 70×10×30 = 2,1×10^4~\u{{J}}$ ; $V_A = 0$ ⇒ ${E('m', 'A')} = 2,1×10^4~\u{{J}}$"),
          q(2, '<span class="kw">Sans frottement</span>', rf"$\frac{{1}}{{2}}m·V_{{B,\u{{th}}}}^2 = {E('m', 'A')}$ ⇒ $V_{{B,\u{{th}}}} = \sqrt{{600}} ≈ 24,5~\u{{m·s^{{−1}}}}$"),
          q(3, '<span class="kw">Sur AB</span>', rf"${E('m', 'B')} = \frac{{1}}{{2}}×70×20^2 = 1,4×10^4~\u{{J}}$ ; $Δ{EM} = −7,0×10^3~\u{{J}}$ ; $Q_1 = 7,0×10^3~\u{{J}}$ ; $f_1 = \frac{{7000}}{{100}} = 70~\u{{N}}$"),
          q(4, '<span class="kw">Sur BC</span>', rf"${E('m', 'C')} = 0$ ; $Δ{EM} = −1,4×10^4~\u{{J}} = −f_2·BC$ ⇒ $Q_2 = 1,4×10^4~\u{{J}}$ ; $f_2 = \frac{{14000}}{{50}} = 280~\u{{N}}$")))))

S.append(slide("bilan", "L’essentiel", "Ce qu’il faut retenir du chapitre", "Bilan", "Exercices et bilan", "L’essentiel du chapitre", ("", "",
    rf'''    <div class="bilan">
      <div class="bil"><h3>Énergie potentielle de pesanteur</h3><span class="eq-wrap">${EPP} = m·g·(z − z_0)$</span><p>axe $Oz$ vers le haut ; ${EPP} = 0$ à l’état de référence</p></div>
      <div class="bil"><h3>Travail du poids</h3><span class="eq-wrap">$Δ{EPP} = −W_{{A→B}}(\vec{{P}})$</span><p>indépendante de l’état de référence</p></div>
      <div class="bil"><h3>Énergie mécanique</h3><span class="eq-wrap">${EM} = {EC} + {EPP}$</span><p>en joules</p></div>
      <div class="bil"><h3>Conservation</h3><span class="eq-wrap">$Δ{EM} = 0$</span><p>chute libre ou glissement sans frottement : $Δ{EC} = −Δ{EPP}$</p></div>
      <div class="bil"><h3>Frottements</h3><span class="eq-wrap">$Δ{EM} = W(\vec{{f}}) = −f·AB$</span><p>l’énergie mécanique diminue</p></div>
      <div class="bil"><h3>Énergie thermique</h3><span class="eq-wrap">$Δ{EM} = −Q$</span><p>$Q = f·AB > 0$ : chaleur cédée au milieu extérieur</p></div>
    </div>''')))

(SRC / "slides.html").write_text("\n".join(S))
print(len(S), "diapositives")
