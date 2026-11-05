"""Écrit src/slides.html (physique, chapitre 5 : L’énergie thermique, le transfert thermique).
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




CU = r"\u{J·kg^{−1}·°C^{−1}}"
MU = r"\u{J·°C^{−1}}"
P1 = ("Partie 1", "Partie 1 · Chaleur massique")
P2 = ("Partie 2", "Partie 2 · Calorimétrie")
P3 = ("Partie 3", "Partie 3 · Changement d’état")
P4 = ("Partie 4", "Partie 4 · Rayonnement")
EX = ("Exercices", "Exercices et bilan")
S = []

T_EXP2 = mtab([("$Δθ$ (°C)", ["10", "20", "30"]), ("Durée (min)", ["4,0", "8,0", "12,0"])])
T_EXP3 = mtab([("Liquide", ["eau", "huile"]), ("$Δθ$ (°C)", ["10,0", "20,9"])])
T_C = ('<table class="mtab"><tr><th>Corps</th><th>eau</th><th>glace</th><th>huile</th><th>aluminium</th><th>fer</th><th>cuivre</th><th>plomb</th></tr>'
       '<tr><th>$c$ (J·kg<sup>−1</sup>·°C<sup>−1</sup>)</th><td>4185</td><td>2090</td><td>≈ 2000</td><td>897</td><td>450</td><td>385</td><td>129</td></tr></table>')
T_L = ('<table class="mtab"><tr><th>Changement d’état</th><th>$θ$ (°C)</th><th>$L$ (J·kg<sup>−1</sup>)</th></tr>'
       '<tr><th>fusion de la glace</th><td>0</td><td>3,34×10<sup>5</sup></td></tr><tr><th>vaporisation de l’eau</th><td>100</td><td>2,26×10<sup>6</sup></td></tr>'
       '<tr><th>fusion de l’étain</th><td>232</td><td>5,90×10<sup>4</sup></td></tr></table>')
T_PL = mtab([("$t$ (min)", ["0", "2", "4", "6", "8", "10"]), ("$θ$ noire (°C)", ["20,0", "28,5", "34,6", "39,0", "42,1", "44,3"]),
             ("$θ$ blanche (°C)", ["20,0", "22,6", "24,4", "25,7", "26,6", "27,3"])])

# ================= TITRE =================
S.append('''<section class="slide s-title" data-kind="titre" data-group="Début" data-menu="Titre du chapitre">
  <div class="fig-full fig bare" data-scene="titre"></div>
  <div class="title-block">
    <div class="eyebrow">PHYSIQUE · TRAVAIL MÉCANIQUE ET ÉNERGIE</div>
    <div class="chapter">Chapitre 5</div>
    <h1>L’énergie thermique : le transfert thermique</h1>
    <div class="plan">
      <span><b>1</b>Quantité de chaleur et chaleur massique</span>
      <span><b>2</b>Équilibre thermique et calorimétrie</span>
      <span><b>3</b>Chaleur latente de changement d’état</span>
      <span><b>4</b>Le rayonnement</span>
    </div>
    <div class="hint">Appuyez sur → (ou cliquez sur la flèche en bas à droite) pour avancer · F : plein écran</div>
  </div>
</section>
''')

# ================= PARTIE 1 =================
S.append(slide("situation", "Situation de départ", "Partie 1 — De quoi dépend la chaleur reçue ?", *P1, "Situation de départ", cols(".9fr", "1.1fr",
    situ("Sur un même réchaud, porter à ébullition une <b>grande casserole</b> d’eau demande bien plus de temps qu’une <b>petite tasse</b>. Et un objet en <b>métal</b> s’échauffe beaucoup plus vite que la même masse d’eau. La chaleur est un mode de transfert d’énergie.",
         ["De quelles grandeurs dépend la quantité de chaleur reçue par un corps dont la température varie ?"]),
    "    " + fig("chauffage", None, '{"exp":1}'))))

S.append(slide("activite", "Activité 1", "Influence de la masse et de Δθ", *P1, "Activité 1 · docs 1 et 2", cols("1fr", "1fr",
    "    <div class=\"stack center\">\n      " + card(r"Réchauds électriques <b>identiques</b> : même énergie par minute, donc <b>énergie reçue proportionnelle à la durée</b> de chauffage. Liquides pris à $θ_i = 20,0~\u{°C}$.<br><b>Doc 1.</b> Pour élever la température de $Δθ = 15~\u{°C}$ : $3,0~\u{min}$ pour $100~\u{g}$ d’eau, $6,0~\u{min}$ pour $200~\u{g}$ d’eau.<br><b>Doc 2.</b> $200~\u{g}$ d’eau : durée de chauffage selon $Δθ = θ_f − θ_i$.", "small") + "\n      " + T_EXP2 + "\n    </div>",
    "    " + fig("chauffage", doc(1, "Deux masses d’eau sur des réchauds identiques"), '{"exp":1}'))))

S.append(slide("activite", "Activité 1", "Influence de la nature du corps", *P1, "Activité 1 · doc 3", cols("1fr", "1fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 3.</b> On chauffe pendant la <b>même durée</b> de $4,0~\u{min}$ (donc avec la même énergie) $200~\u{g}$ d’eau et $200~\u{g}$ d’huile végétale.") + "\n      " + T_EXP3 + "\n      " + card(rf"<b>Information.</b> $Q$ : chaleur <b>reçue</b> par un corps ($Q > 0$ s’il reçoit de l’énergie, $Q < 0$ s’il en cède). Sans changement d’état, $Q$ est égale au produit de la masse $m$, de $Δθ = θ_f − θ_i$ et d’un coefficient $c$ qui ne dépend que de la nature du corps : sa <b>chaleur massique</b>, en ${CU}$ (eau : 4185 ; huile : ≈ 2000). $C = m·c$ est la <b>capacité thermique</b> du corps.", "small") + "\n    </div>",
    "    " + fig("chauffage", doc(3, "Eau et huile, même durée de chauffage"), '{"exp":3}'))))

S.append(slide("questions", "Questions", "Activité 1 — Masse, Δθ et nature du corps", *P1, "Questions 1 et 2", cols("1.2fr", ".8fr",
    qlist(q(1, "Docs 1 et 2 : montrer que $Q$ est proportionnelle à la masse $m$, puis à $Δθ = θ_f − θ_i$.",
            "Masse double ⇒ durée double ⇒ énergie double : $Q$ est <b>proportionnelle à $m$</b>.<br>$Δθ$ double, triple ⇒ durée double, triple : $Q$ est <b>proportionnelle à $Δθ$</b>.", "Établir."),
          q(2, "Doc 3 : pour même masse et même énergie, $Δθ$ est-il le même pour l’eau et l’huile ? Expliquer à l’aide des chaleurs massiques de l’information.",
            "Non : $Δθ$ est environ 2 fois plus grand pour l’huile. Sa <b>chaleur massique</b> (≈ 2000) est environ 2 fois plus petite que celle de l’eau (4185) : pour la même énergie, $Δθ = \frac{Q}{m·c}$ est 2 fois plus grand.", "Interpréter.")),
    "    " + fig("chauffage", doc(3, "Même énergie, Δθ différents"), '{"exp":3}'))))

S.append(slide("questions", "Questions", "Activité 1 — Expression de Q", *P1, "Questions 3 et 4", cols("1.25fr", ".75fr",
    qlist(q(3, "À l’aide de l’information, écrire l’expression de $Q$ pour un corps pur de masse $m$ dont la température passe de $θ_i$ à $θ_f$ (sans changement d’état). Unités ?",
            rf"$Q = m·c·Δθ = m·c·(θ_f − θ_i)$ : $Q$ en J, $m$ en kg, $Δθ$ en °C (ou K, même écart), $c$ en ${CU}$.", "Écrire."),
          q(4, r"Que représente $c$ si $m = 1~\u{kg}$ et $Δθ = 1~\u{°C}$ ? Que représente $C = m·c$ ? Signe de $Q$ quand le corps se refroidit ?",
            rf"$c$ : énergie qui élève de $1~\u{{°C}}$ la température de $1~\u{{kg}}$ du corps. $C = m·c$ (en ${MU}$) : $Q = C·Δθ$.<br>$θ_f > θ_i$ : $Q > 0$, le corps <b>reçoit</b> ; $θ_f < θ_i$ : $Q < 0$, il <b>cède</b>.", "Définir.")),
    "    " + fig("transfert"))))

S.append(slide("retenir", "À retenir", "La chaleur et la quantité de chaleur", *P1, "À retenir · Q = m·c·Δθ", ("", "",
    rf"""    <div class="stack center" style="flex:1">
      <div style="display:grid;grid-template-columns:1.35fr .65fr;gap:22px;align-items:center">
      <div class="stack"><div class="def"><h3>La chaleur, un mode de transfert d’énergie</h3><p style="margin:0">La chaleur (ou <b>transfert thermique</b>) est un transfert d’énergie à l’échelle microscopique ; il se fait spontanément du corps <b>chaud</b> vers le corps <b>froid</b>.</p></div>
      <div class="def"><h3>Quantité de chaleur</h3><p style="margin:0 0 8px">Un corps pur de masse $m$ et de chaleur massique $c$, dont la température passe de $θ_i$ à $θ_f$ sans changement d’état, échange la quantité de chaleur :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Q = m·c·Δθ = m·c·(θ_f − θ_i)$</span></div>
        <p style="margin:8px 0 0">$Q$ en <b>joules (J)</b>, $m$ en <b>kg</b>, $c$ en <b>${CU}$</b>, $Δθ$ en <b>°C</b> (ou en K).</p></div></div>
      <div class="fig" data-scene="transfert" style="height:250px"></div></div>
      {T_C}
    </div>""")))

S.append(slide("retenir", "À retenir", "Capacité thermique et signe de Q", *P1, "À retenir · capacité thermique", cols("1.2fr", ".8fr",
    rf"""    <div class="stack center">
      <div class="def"><h3>Capacité thermique et signe de $Q$</h3><p style="margin:0 0 8px">La capacité thermique d’un corps, ou d’un calorimètre et de ses accessoires, est l’énergie qui élève sa température de $1~\u{{°C}}$ : $C = m·c$, notée $μ$ pour un calorimètre, en <b>${MU}$</b>, et</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Q = μ·(θ_f − θ_i)$</span></div>
        <p style="margin:8px 0 0">$Q > 0$ : le système <b>reçoit</b> de la chaleur ($θ_f > θ_i$) ; $Q < 0$ : le système <b>cède</b> de la chaleur ($θ_f < θ_i$).</p></div>
    </div>""", "    " + fig("transfert"))))

S.append(slide("application", "Application", "Un chauffe-eau électrique", *P1, "Application · chauffe-eau", cols("1.3fr", ".7fr",
    "    <div class=\"stack\">\n      " + card(rf"Chauffe-eau : $V = 100~\u{{L}}$ d’eau à $θ_i = 15~\u{{°C}}$, chauffée jusqu’à $θ_f = 65~\u{{°C}}$ ; $ρ = 1,0~\u{{kg·L^{{−1}}}}$ ; $c_e = 4185~{CU}$.", "small") + "\n" +
    qlist(q(1, "Calculer la masse $m$ d’eau et sa capacité thermique $C$.", rf"$m = ρ·V = 100~\u{{kg}}$ ; $C = m·c_e = 100×4185 ≈ 4,19×10^5~{MU}$"),
          q(2, "Calculer la chaleur $Q$ reçue par l’eau ; justifier son signe.", r"$Q = m·c_e·(θ_f − θ_i) = 100×4185×(65 − 15) ≈ 2,09×10^7~\u{J}$ (≈ 20,9 MJ)<br>$Q > 0$ : l’eau reçoit de la chaleur, sa température s’élève.")) + "\n    </div>",
    "    " + fig("chauffeEau"))))

# ================= PARTIE 2 =================
S.append(slide("situation", "Situation de départ", "Partie 2 — Mélanger des corps chauds et froids", *P2, "Situation de départ", cols(".85fr", "1.15fr",
    situ("Quand on plonge un morceau de <b>métal brûlant</b> dans de l’<b>eau froide</b>, le métal se refroidit, l’eau et le récipient se réchauffent, jusqu’à une <b>température finale commune</b>.",
         ["Comment exploiter ce phénomène pour mesurer la capacité thermique d’un récipient, puis la chaleur massique d’un métal ?"]),
    "    " + fig("equilibre"))))

S.append(slide("activite", "Activité 2", "Le calorimètre — protocole 1", *P2, "Activité 2 · doc 4", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 4.</b> Un <b>calorimètre</b> est une enceinte thermiquement isolée : les corps qu’il contient échangent de la chaleur jusqu’à l’<b>équilibre thermique</b> (même température pour tous, constante). L’énergie cédée par les corps qui se refroidissent est entièrement reçue par ceux qui s’échauffent ; le bilan ne dépend que des états initial et final. Le calorimètre reçoit $Q = μ·(θ_f − θ_i)$, $μ$ : sa <b>capacité thermique</b>.<br><b>Protocole 1 ($μ$ du calorimètre).</b> $m_1 = 200~\u{g}$ d’eau froide à $θ_1 = 18,0~\u{°C}$ ; on ajoute $m_2 = 200~\u{g}$ d’eau tiède à $θ_2 = 42,5~\u{°C}$ ; équilibre : $θ_e = 29,5~\u{°C}$.", "small") + "\n    </div>",
    "    " + fig("calorimetre", doc(4, "Calorimètre de Berthelot (coupe)"), '{"labels":1,"mode":"eau","th0":18,"th1":29.5}'))))

S.append(slide("activite", "Activité 2", "Protocole 2 — chaleur massique de l’aluminium", *P2, "Activité 2 · protocole 2", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(rf"<b>Protocole 2.</b> Un cylindre d’aluminium ($m_m = 150~\u{{g}}$) est maintenu dans l’eau bouillante à $θ_m = 100,0~\u{{°C}}$, puis introduit dans le <b>même calorimètre</b>, qui contient $m_e = 250~\u{{g}}$ d’eau à $θ_0 = 20,0~\u{{°C}}$. Équilibre : $θ'_e = 28,3~\u{{°C}}$. $c_e = 4185~{CU}$.") + "\n    </div>",
    "    " + fig("calorimetre", doc(4, "Le bloc d’aluminium dans le calorimètre"), '{"mode":"metal","th0":20,"th1":28.3}'))))

S.append(slide("questions", "Questions", "Activité 2 — Équation calorimétrique", *P2, "Questions 1 et 2", cols("1.25fr", ".75fr",
    qlist(q(1, "D’après le doc 4 : quand des corps sont-ils en équilibre thermique ? Que vaut la somme $Q_1 + Q_2 + …$ des chaleurs échangées (<b>équation calorimétrique</b>) ? De quels états dépend le bilan ?",
            "Quand leurs températures sont <b>égales et constantes</b>. Dans une enceinte isolée : $ΣQ_i = 0$. Le bilan ne dépend que de l’<b>état initial</b> et de l’<b>état final</b>.", "Définir."),
          q(2, "Protocole 1 : exprimer $Q_1$ reçue par le calorimètre et l’eau froide, et $Q_2$ cédée par l’eau tiède.",
            r"$Q_1 = (μ + m_1·c_e)(θ_e − θ_1) > 0$ ; $Q_2 = m_2·c_e·(θ_e − θ_2) < 0$", "Exprimer.")),
    "    " + fig("calorimetre", None, '{"mode":"eau","th0":18,"th1":29.5}'))))

S.append(slide("questions", "Questions", "Activité 2 — μ et c de l’aluminium", *P2, "Questions 3 et 4", cols("1.35fr", ".65fr",
    qlist(q(3, "Calculer la capacité thermique $μ$ du calorimètre.",
            rf"$Q_1 + Q_2 = 0$ ⇒ $μ = \frac{{m_2·c_e·(θ_2 − θ_e)}}{{θ_e − θ_1}} − m_1·c_e = 0,200×4185×(\frac{{13,0}}{{11,5}} − 1) ≈ 109~{MU}$", "Calculer."),
          q(4, "Protocole 2 : bilan des chaleurs ; calculer $c_m$ de l’aluminium et la comparer au tableau.",
            rf"$Q_r = (μ + m_e·c_e)(θ'_e − θ_0)$ ; $Q_c = m_m·c_m·(θ'_e − θ_m)$ ; $Q_r + Q_c = 0$<br>$c_m = \frac{{(109 + 0,250×4185)×8,3}}{{0,150×71,7}} ≈ 892~{CU}$, très proche de 897.", "Déterminer.")),
    "    " + fig("calorimetre", None, '{"mode":"metal","th0":20,"th1":28.3}'))))

S.append(slide("retenir", "À retenir", "Équilibre thermique et équation calorimétrique", *P2, "À retenir · ΣQ = 0", cols("1.2fr", ".8fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Équilibre thermique</h3><p style="margin:0">Des corps de températures différentes, mis en contact dans une enceinte isolée, échangent de la chaleur jusqu’à atteindre une même <b>température d’équilibre</b> $θ_e$.</p></div>
      <div class="def"><h3>Équation calorimétrique</h3><p style="margin:0 0 8px">Dans un système <b>thermiquement isolé</b>, la somme algébrique des quantités de chaleur échangées par toutes ses parties, entre l’état initial et l’état d’équilibre, est <b>nulle</b> :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$ΣQ_i = Q_1 + Q_2 + … + Q_n = 0$</span></div>
        <p style="margin:8px 0 0">Le bilan calorimétrique ne dépend que de l’<b>état initial</b> et de l’<b>état final</b> du système.</p></div>
    </div>""", "    " + fig("equilibre"))))

S.append(slide("methode", "Méthode", "Résoudre un problème de calorimétrie", *P2, "Méthode", cols("1.3fr", ".7fr",
    r"""    <div class="method"><h3>Méthode : résoudre un problème de calorimétrie</h3>
      <ol class="steps"><li>Faire la liste des <b>corps</b> du système (sans oublier le calorimètre) avec leur <b>température initiale</b>.</li><li>Pour chaque corps, écrire $Q = m·c·(θ_e − θ_i)$, ou $Q = μ·(θ_e − θ_i)$ : toujours « <b>finale moins initiale</b> ».</li><li>Ajouter, s’il y a lieu, la chaleur d’un <b>changement d’état</b> ($±m·L$).</li><li>Écrire l’<b>équation calorimétrique</b> $ΣQ_i = 0$ et résoudre.</li><li><b>Vérifier</b> que la température d’équilibre est comprise entre les températures initiales extrêmes.</li></ol></div>""",
    "    " + fig("calorimetre", None, '{"mode":"metal","metal":"#c8794a","th0":16,"th1":20.2}'))))

S.append(slide("application", "Application", "Un échantillon de cuivre", *P2, "Application · cuivre", cols("1.3fr", ".7fr",
    "    <div class=\"stack\">\n      " + card(rf"Calorimètre : $μ = 120~{MU}$, $m_1 = 300~\u{{g}}$ d’eau à $θ_1 = 16,0~\u{{°C}}$. On y plonge $m_2 = 200~\u{{g}}$ de cuivre à $θ_2 = 95,0~\u{{°C}}$. $c_e = 4185$ et $c_{{\u{{Cu}}}} = 385~{CU}$.", "small") + "\n" +
    qlist(q(1, "Exprimer les chaleurs échangées en fonction de $θ_e$.", r"$Q_1 = (μ + m_1·c_e)(θ_e − θ_1)$ ; $Q_2 = m_2·c_{\u{Cu}}·(θ_e − θ_2)$"),
          q(2, "Calculer la température d’équilibre $θ_e$.", r"$Q_1 + Q_2 = 0$ ; $μ + m_1·c_e = 1375,5$ ; $m_2·c_{\u{Cu}} = 77$<br>$θ_e = \frac{1375,5×16,0 + 77×95,0}{1375,5 + 77} ≈ 20,2~\u{°C}$")) + "\n    </div>",
    "    " + fig("calorimetre", None, '{"mode":"metal","metal":"#c8794a","th0":16,"th1":20.2}'))))

# ================= PARTIE 3 =================
S.append(slide("situation", "Situation de départ", "Partie 3 — La glace qui fond", *P3, "Situation de départ", cols(".9fr", "1.1fr",
    situ(r"On chauffe de la glace sortie d’un congélateur à $−10~\u{°C}$ : sa température monte jusqu’à $0~\u{°C}$, puis <b>reste constante</b> pendant toute la fusion, alors que la glace continue de recevoir de la chaleur. La relation $Q = m·c·Δθ$ donnerait $Q = 0$ !",
         ["Comment calculer l’énergie reçue pendant un changement d’état ?"]),
    "    " + fig("courbeGlace"))))

S.append(slide("activite", "Activité 3", "Courbe d’échauffement et chaleur latente", *P3, "Activité 3 · doc 5", cols("1fr", "1fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 5.</b> On chauffe à puissance constante $100~\u{g}$ de glace prise à $−10~\u{°C}$ et on relève sa température.<br><b>Chaleur latente.</b> À pression constante, un corps pur change d’état à température constante ($θ_{\u{fus}} = 0~\u{°C}$ pour la glace sous la pression atmosphérique normale). La chaleur échangée est proportionnelle à la masse $m$ qui change d’état : $Q = m·L$, où $L$ est la <b>chaleur latente</b>. La fusion se fait en recevant de la chaleur ; la solidification, inverse, en cède autant.", "small") + "\n    </div>",
    "    " + fig("courbeGlace", doc(5, "Température de la glace chauffée")))))

S.append(slide("activite", "Activité 3", "Mesurer la chaleur latente de fusion de la glace", *P3, "Activité 3 · doc 6", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(rf"<b>Doc 6.</b> Calorimètre : $μ = 80~{MU}$, $m_1 = 300~\u{{g}}$ d’eau à $θ_1 = 25,0~\u{{°C}}$. On y introduit un glaçon de masse $m_2 = 40~\u{{g}}$ pris à $θ_{{\u{{fus}}}} = 0,0~\u{{°C}}$ (glace fondante). Après fusion complète : $θ_e = 13,3~\u{{°C}}$. $c_e = 4185~{CU}$.") + "\n    </div>",
    "    " + fig("calorimetre", doc(6, "Un glaçon dans le calorimètre"), '{"mode":"glace","th0":25,"th1":13.3}'))))

S.append(slide("questions", "Questions", "Activité 3 — Le palier et la chaleur latente", *P3, "Questions 1 et 2", cols("1.15fr", ".85fr",
    qlist(q(1, "Doc 5 : décrire les trois parties de la courbe. La glace reçoit-elle de l’énergie pendant le palier ?",
            r"La glace s’échauffe de $−10$ à $0~\u{°C}$ ; la température reste à $0~\u{°C}$ pendant la <b>fusion</b> (palier) ; puis l’eau liquide s’échauffe. Pendant le palier, la glace reçoit de l’énergie, qui sert à <b>changer son état</b>.", "Exploiter."),
          q(2, r"D’après $Q = m·L$, que représente $L$ si $m = 1~\u{kg}$ ? Son unité ? Signe de $Q$ pour une fusion, une solidification ?",
            r"Chaleur à échanger avec $1~\u{kg}$ d’un corps pur pour qu’il change complètement d’état (température et pression constantes). $Q = m·L$, $L$ en $\u{J·kg^{−1}}$. Fusion, vaporisation : $Q > 0$ ; solidification, liquéfaction : $Q = −m·L < 0$.", "Définir.")),
    "    " + fig("courbeGlace", None, '{"labels":1}'))))

S.append(slide("questions", "Questions", "Activité 3 — Calcul de L<sub>f</sub>", *P3, "Questions 3 à 5", cols("1.4fr", ".6fr",
    qlist(q(3, "Doc 6 : les deux étapes subies par le glaçon ; exprimer la chaleur totale $Q_g$ qu’il reçoit.",
            r"Fusion à $0~\u{°C}$ : $m_2·L_f$ ; échauffement de l’eau de fusion de $0~\u{°C}$ à $θ_e$ : $m_2·c_e·(θ_e − θ_{\u{fus}})$<br>$Q_g = m_2·L_f + m_2·c_e·(θ_e − θ_{\u{fus}})$", "Décrire."),
          q(4, "Exprimer la chaleur $Q_{ce}$ cédée par le calorimètre et l’eau.", r"$Q_{ce} = (μ + m_1·c_e)(θ_e − θ_1) < 0$", "Exprimer."),
          q(5, "Calculer la chaleur latente de fusion de la glace $L_f$.",
            r"$Q_g + Q_{ce} = 0$ ⇒ $L_f = \frac{(μ + m_1·c_e)(θ_1 − θ_e)}{m_2} − c_e·(θ_e − θ_{\u{fus}}) = \frac{1335,5×11,7}{0,040} − 4185×13,3 ≈ 3,35×10^5~\u{J·kg^{−1}}$", "Calculer.")),
    "    " + fig("calorimetre", None, '{"mode":"glace","th0":25,"th1":13.3}'))))

S.append(slide("retenir", "À retenir", "Chaleur latente de changement d’état", *P3, "À retenir · Q = m·L", cols("1.15fr", ".85fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Changement d’état d’un corps pur</h3><p style="margin:0">À pression constante, un corps pur change d’état à <b>température constante</b> (palier). L’énergie reçue ou cédée sert au <b>changement d’état</b>.</p></div>
      <div class="def"><h3>Chaleur latente</h3><p style="margin:0 0 8px">Une masse $m$ d’un corps pur qui change complètement d’état échange la quantité de chaleur :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Q = m·L$</span></div>
        <p style="margin:8px 0 0">$L$ : chaleur latente de changement d’état, en <b>$\u{J·kg^{−1}}$</b>.<br>Fusion : <b>$Q = +m·L_f > 0$</b> ; solidification : <b>$Q = −m·L_f < 0$</b>.</p></div>
    </div>""", '    <div class="stack center">' + fig("courbeGlace", None, '{"labels":1}').replace('class="fig"', 'class="fig" style="height:330px;flex:none"') + T_L + "</div>")))

S.append(slide("application", "Application", "De la glace à l’eau tiède", *P3, "Application · glace", ("", "",
    "    " + card(rf"Bloc de glace : $m = 500~\u{{g}}$ à $θ_1 = −15,0~\u{{°C}}$, chauffé jusqu’à de l’eau liquide à $θ_2 = 20,0~\u{{°C}}$. $θ_{{\u{{fus}}}} = 0,0~\u{{°C}}$ ; $c_g = 2090$ et $c_e = 4185~{CU}$ ; $L_f = 3,34×10^5~\u{{J·kg^{{−1}}}}$.", "small") + "\n" +
    '    <div class="fig" data-scene="etapesGlace" style="height:190px;flex:none"></div>\n' +
    qlist(q(1, "Identifier les trois étapes successives.", r"Échauffement de la glace ($−15 → 0~\u{°C}$) ; fusion à $0~\u{°C}$ ; échauffement de l’eau liquide ($0 → 20~\u{°C}$)."),
          q(2, r"Calculer la chaleur de chaque étape, puis $Q_{\u{tot}}$.", r"$Q_1 = 0,500×2090×15,0 ≈ 1,57×10^4~\u{J}$ ; $Q_2 = 0,500×3,34×10^5 = 1,67×10^5~\u{J}$ ; $Q_3 = 0,500×4185×20,0 ≈ 4,19×10^4~\u{J}$ ; $Q_{\u{tot}} ≈ 2,25×10^5~\u{J}$")))))

# ================= PARTIE 4 =================
S.append(slide("situation", "Situation de départ", "Partie 4 — La chaleur du Soleil", *P4, "Situation de départ", cols(".9fr", "1.1fr",
    situ("La Terre reçoit en permanence de l’énergie du <b>Soleil</b>, alors que l’espace qui les sépare est presque <b>vide de matière</b>. Et près d’un radiateur infrarouge, sans le toucher, on ressent tout de suite la chaleur.",
         ["Comment l’énergie thermique peut-elle se propager sans support matériel ?"]),
    "    " + fig("soleilTerre"))))

S.append(slide("activite", "Activité 4", "Un thermomètre sous vide", *P4, "Activité 4 · doc 7", cols(".9fr", "1.1fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 7.</b> Un thermomètre au réservoir <b>noirci</b> est placé sous une cloche en verre où l’on a fait le <b>vide</b> : plus d’air autour de lui. Une lampe infrarouge, à l’extérieur, est dirigée vers le réservoir. Dès l’allumage, la température indiquée augmente rapidement.<br>La lampe émet lumière et infrarouge : des <b>ondes électromagnétiques</b> qui transportent de l’énergie, même dans le vide. Ce mode de transfert s’appelle le <b>rayonnement</b>.") + "\n    </div>",
    "    " + fig("cloche", doc(7, "Thermomètre sous une cloche à vide")))))

S.append(slide("activite", "Activité 4", "Plaque noire et plaque blanche", *P4, "Activité 4 · doc 8", rows(
    "    " + card(r"<b>Doc 8.</b> Deux plaques métalliques identiques, l’une peinte en <b>noir mat</b>, l’autre en <b>blanc brillant</b>, sont placées à la <b>même distance</b> d’une lampe ; un thermomètre est fixé sur chaque plaque. Une surface <b>absorbe</b> une partie du rayonnement reçu et <b>réfléchit</b> le reste.<br><b>Doc 9.</b> Dans un solide, la chaleur se propage de proche en proche sans déplacement de matière : <b>conduction</b>. Dans un liquide ou un gaz, la matière chaude se déplace : <b>convection</b>. Ces deux modes ont besoin de matière.", "small"),
    [fig("plaques", doc(8, "Plaque noire et plaque blanche")), '<div style="display:grid;place-items:center">' + T_PL + "</div>"], "1.1fr .9fr")))

S.append(slide("questions", "Questions", "Activité 4 — Le rayonnement", *P4, "Questions 1 à 3", cols("1.4fr", ".6fr",
    qlist(q(1, "Doc 7 : pourquoi l’énergie ne peut-elle pas arriver au thermomètre par l’air ? Par quel mode de transfert la reçoit-il ?",
            "Le vide empêche les transferts qui ont besoin de matière. Le réservoir absorbe l’énergie transportée par les <b>ondes électromagnétiques</b> (infrarouge, lumière) émises par la lampe : c’est le <b>rayonnement</b>.", "Expliquer."),
          q(2, "Doc 8 : comparer l’échauffement des deux plaques. Laquelle absorbe le plus le rayonnement ? Laquelle le réfléchit le plus ?",
            r"En 10 min : $+24,3~\u{°C}$ (noire) contre $+7,3~\u{°C}$ (blanche). Une surface <b>sombre et mate absorbe</b> la plus grande partie du rayonnement ; une surface blanche ou brillante en <b>réfléchit</b> la plus grande partie.", "Comparer."),
          q(3, "Exemples de rayonnement d’après les documents. D’après le doc 9, quelle différence essentielle avec la conduction et la convection ?",
            "Soleil → Terre, chauffe-eau solaires, fours infrarouges, caméras thermiques. Conduction : de proche en proche, sans déplacement de matière ; convection : avec déplacement de matière (liquide, gaz) ; rayonnement : ondes électromagnétiques, <b>même dans le vide</b>.", "Distinguer.")),
    "    " + fig("plaques"))))

S.append(slide("retenir", "À retenir", "Le rayonnement", *P4, "À retenir · rayonnement", ("", "",
    r"""    <div class="stack center" style="flex:1">
      <div class="def"><h3>Le rayonnement</h3><p style="margin:0">Le rayonnement est un mode de transfert d’énergie assuré par des <b>ondes électromagnétiques</b> (infrarouge, lumière visible). Contrairement à la conduction et à la convection, il ne nécessite <b>aucun support matériel</b> : il se propage même dans le <b>vide</b>.<br>Tout corps émet un rayonnement d’autant plus intense que sa <b>température</b> est élevée, et absorbe une partie du rayonnement qu’il reçoit ; les surfaces <b>sombres et mates</b> sont les meilleurs absorbeurs.</p></div>
      <div class="fig" data-scene="modes" style="height:330px;flex:none;width:100%"></div>
    </div>""")))

S.append(slide("application", "Application", "La bouteille isolante", *P4, "Application · bouteille isolante", cols("1.3fr", ".7fr",
    "    <div class=\"stack\">\n      " + card("Bouteille isolante (« thermos ») : double paroi de verre avec le <b>vide</b> entre les deux parois ; faces des parois <b>argentées</b>, réfléchissantes comme un miroir.", "small") + "\n" +
    qlist(q(1, "Quel est l’intérêt du vide entre les deux parois ?", "Il supprime l’air : il empêche les transferts par <b>conduction</b> et par <b>convection</b>."),
          q(2, "Quel est le rôle des parois argentées vis-à-vis du rayonnement ?", "Le vide n’arrête pas le rayonnement ; les parois argentées le <b>réfléchissent</b>, vers l’intérieur si le liquide est chaud, vers l’extérieur s’il est froid.")) + "\n    </div>",
    "    " + fig("thermos", None, '{"final":1}'))))

# ================= EXERCICES =================
S.append(slide("quiz", "Vrai ou faux ?", "Je vérifie mes connaissances", *EX, "Vrai ou faux ?", ("", "",
    '    <div class="vflist">\n      ' + "\n      ".join([
        vf("a", "faux", "La chaleur passe spontanément d’un corps froid vers un corps chaud.", "Faux : du corps chaud vers le corps froid."),
        vf("b", "vrai", "Pour une même énergie reçue, 1 kg d’eau s’échauffe moins que 1 kg de cuivre.", r"Vrai : $c_{\u{eau}} = 4185 > c_{\u{Cu}} = 385$."),
        vf("c", "faux", "Une quantité de chaleur $Q < 0$ signifie que le corps reçoit de l’énergie.", "Faux : le corps cède de l’énergie."),
        vf("d", "vrai", "Pendant la fusion de la glace sous pression constante, la température reste égale à 0 °C.", "Vrai : un corps pur change d’état à température constante."),
        vf("e", "vrai", "L’équation calorimétrique $ΣQ_i = 0$ suppose que le système est thermiquement isolé.", "Vrai : sinon une partie de la chaleur est échangée avec l’extérieur."),
        vf("f", "faux", "Le rayonnement ne peut pas se propager dans le vide.", "Faux : il se propage même dans le vide.")]) + "\n    </div>")))

S.append(slide("exercice", "Exercice 1", "Calorimètre et chaleur massique du plomb", *EX, "Exercice 1 · énoncé", cols("1.35fr", ".65fr",
    "    <div class=\"stack\">\n      " + card(rf"<b>Expérience 1.</b> Calorimètre avec $m_1 = 150~\u{{g}}$ d’eau à $θ_1 = 17,5~\u{{°C}}$ ; on verse $m_2 = 150~\u{{g}}$ d’eau à $θ_2 = 50,0~\u{{°C}}$ ; équilibre : $θ_{{e1}} = 32,5~\u{{°C}}$.<br><b>Expérience 2.</b> Le calorimètre contient $300~\u{{g}}$ d’eau à $32,5~\u{{°C}}$ ; on y plonge $m_{{\u{{Pb}}}} = 400~\u{{g}}$ de plomb à $θ_3 = 98,0~\u{{°C}}$ ; équilibre : $θ_{{e2}} = 35,0~\u{{°C}}$. $c_e = 4185~{CU}$.", "small") +
    r'''
      <ol class="exlist small"><li>Calculer la capacité thermique $μ$ du calorimètre (expérience 1).</li><li>Exprimer les chaleurs échangées dans l’expérience 2 en fonction de $c_{\u{Pb}}$.</li><li>Calculer $c_{\u{Pb}}$ et la comparer au tableau.</li></ol>
    </div>''', "    " + fig("calorimetre", None, '{"mode":"metal","metal":"#7c8896","th0":32.5,"th1":35}'))))

S.append(slide("exercice", "Correction", "Exercice 1 — Calorimètre et plomb", *EX, "Exercice 1 · correction", ("", "",
    qlist(q(1, '<span class="kw">Capacité thermique</span>', rf"$(μ + m_1·c_e)(θ_{{e1}} − θ_1) + m_2·c_e·(θ_{{e1}} − θ_2) = 0$ ⇒ $μ = 0,150×4185×(\frac{{17,5}}{{15,0}} − 1) ≈ 105~{MU}$"),
          q(2, '<span class="kw">Expérience 2</span>', r"$Q_r = (μ + M_e·c_e)(θ_{e2} − θ_{e1})$ avec $M_e = 0,300~\u{kg}$ ; $Q_{\u{Pb}} = m_{\u{Pb}}·c_{\u{Pb}}·(θ_{e2} − θ_3)$"),
          q(3, '<span class="kw">Chaleur massique du plomb</span>', rf"$Q_r + Q_{{\u{{Pb}}}} = 0$ ⇒ $c_{{\u{{Pb}}}} = \frac{{(104,6 + 1255,5)×2,5}}{{0,400×63,0}} ≈ 135~{CU}$, voisine de 129.")))))

S.append(slide("exercice", "Exercice 2", "Un morceau de glace dans un calorimètre", *EX, "Exercice 2 · énoncé", cols("1.35fr", ".65fr",
    "    <div class=\"stack\">\n      " + card(rf"Calorimètre : $μ = 100~{MU}$, $m_1 = 400~\u{{g}}$ d’eau à $θ_1 = 30,0~\u{{°C}}$. On y introduit $m_2 = 60~\u{{g}}$ de glace à $θ_2 = −10,0~\u{{°C}}$. $c_e = 4185$ ; $c_g = 2090~{CU}$ ; $θ_{{\u{{fus}}}} = 0,0~\u{{°C}}$ ; $L_f = 3,34×10^5~\u{{J·kg^{{−1}}}}$.", "small") +
    r'''
      <ol class="exlist small"><li>Calculer $Q_n$ (glace de −10 °C à eau à 0 °C) et $|Q_d|$ (calorimètre et eau de 30 °C à 0 °C). Toute la glace fond-elle ?</li><li>Exprimer $Q_g$ et $Q_{ce}$ en fonction de $θ_e$ ($θ_e > 0~\u{°C}$).</li><li>Calculer $θ_e$.</li></ol>
    </div>''', "    " + fig("calorimetre", None, '{"mode":"glace","th0":30,"th1":15.8}'))))

S.append(slide("exercice", "Correction", "Exercice 2 — Un morceau de glace", *EX, "Exercice 2 · correction", ("", "",
    qlist(q(1, '<span class="kw">La glace fond-elle ?</span>', r"$Q_n = 0,060×2090×10,0 + 0,060×3,34×10^5 = 1254 + 20040 = 21294~\u{J}$ ; $|Q_d| = (100 + 0,400×4185)×30,0 = 53220~\u{J}$<br>$|Q_d| > Q_n$ : toute la glace fond, $θ_e > 0~\u{°C}$."),
          q(2, '<span class="kw">Expressions</span>', r"$Q_g = 21294 + m_2·c_e·(θ_e − θ_{\u{fus}})$ ; $Q_{ce} = (μ + m_1·c_e)(θ_e − θ_1)$"),
          q(3, '<span class="kw">Température d’équilibre</span>', r"$Q_g + Q_{ce} = 0$ ⇒ $θ_e = \frac{53220 − 21294}{1774 + 251,1} ≈ 15,8~\u{°C}$")))))

S.append(slide("exercice", "Exercice 3", "Un four solaire", *EX, "Exercice 3 · énoncé", cols("1.25fr", ".75fr",
    "    <div class=\"stack\">\n      " + card(rf"Four solaire : creuset isolé contenant $m = 500~\u{{g}}$ d’étain solide à $θ_i = 22,0~\u{{°C}}$ ; puissance absorbée $P = 250~\u{{W}}$. Étain : $θ_{{\u{{fus}}}} = 232,0~\u{{°C}}$ ; $c_s = 228~{CU}$ ; $L_f = 5,90×10^4~\u{{J·kg^{{−1}}}}$.", "small") +
    r'''
      <ol class="exlist small"><li>Chaleur $Q_1$ pour porter l’étain solide à sa température de fusion.</li><li>Chaleur $Q_2$ pour faire fondre tout l’étain.</li><li>$Q_{\u{tot}}$, puis la durée $Δt$ sachant que $Q_{\u{tot}} = P·Δt$.</li></ol>
    </div>''', "    " + fig("fourSolaire"))))

S.append(slide("exercice", "Correction", "Exercice 3 — Un four solaire", *EX, "Exercice 3 · correction", cols("1.3fr", ".7fr",
    qlist(q(1, '<span class="kw">Échauffement</span>', r"$Q_1 = 0,500×228×(232,0 − 22,0) = 23940~\u{J}$"),
          q(2, '<span class="kw">Fusion</span>', r"$Q_2 = m·L_f = 0,500×5,90×10^4 = 29500~\u{J}$"),
          q(3, '<span class="kw">Durée</span>', r"$Q_{\u{tot}} = 53440~\u{J}$ ; $Δt = \frac{Q_{\u{tot}}}{P} = \frac{53440}{250} ≈ 214~\u{s}$, soit environ 3 min 34 s")),
    "    " + fig("fourSolaire"))))

S.append(slide("bilan", "L’essentiel", "Ce qu’il faut retenir du chapitre", "Bilan", "Exercices et bilan", "L’essentiel du chapitre", ("", "",
    rf'''    <div class="bilan">
      <div class="bil"><h3>La chaleur</h3><p>transfert d’énergie, spontanément du corps chaud vers le corps froid</p></div>
      <div class="bil"><h3>Quantité de chaleur</h3><span class="eq-wrap">$Q = m·c·(θ_f − θ_i)$</span><p>$c$ en ${CU}$ ; $Q > 0$ reçue, $Q < 0$ cédée</p></div>
      <div class="bil"><h3>Capacité thermique</h3><span class="eq-wrap">$Q = μ·(θ_f − θ_i)$</span><p>$C = m·c$ ; $μ$ en ${MU}$</p></div>
      <div class="bil"><h3>Calorimétrie</h3><span class="eq-wrap">$ΣQ_i = 0$</span><p>système isolé ; seuls comptent les états initial et final</p></div>
      <div class="bil"><h3>Changement d’état</h3><span class="eq-wrap">$Q = ±m·L$</span><p>à température constante ; $L$ en $\u{{J·kg^{{−1}}}}$</p></div>
      <div class="bil"><h3>Rayonnement</h3><p>ondes électromagnétiques, même dans le vide ; surfaces sombres = bons absorbeurs</p></div>
    </div>''')))

(SRC / "slides.html").write_text("\n".join(S))
print(len(S), "diapositives")
