"""Écrit src/slides.html (physique, chapitre 7 : L’énergie thermique, le transfert thermique — sciences mathématiques).
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

def info(html):
    return f'<div class="card small" style="border:1.5px solid #0e8f8a66"><p style="margin:0"><b>Information.</b> {html}</p></div>'

T_D1 = mtab([("Masse d’eau (g)", ["150", "300"]), ("Énergie reçue (kJ)", ["12,6", "25,1"])])
T_D2 = mtab([("$Δθ$ (°C)", ["10,0", "20,0", "30,0"]), ("Énergie reçue (kJ)", ["8,37", "16,7", "25,1"])])
T_D3 = mtab([("Corps", ["eau", "fer"]), ("$Δθ$ (°C)", ["6,0", "55,8"])])
T_C = ('<table class="mtab"><tr><th>Corps</th><th>eau</th><th>glace</th><th>aluminium</th><th>fer</th><th>cuivre</th><th>plomb</th></tr>'
       '<tr><th>$c$ (J·kg<sup>−1</sup>·°C<sup>−1</sup>)</th><td>4185</td><td>2090</td><td>897</td><td>450</td><td>385</td><td>130</td></tr></table>')
T_L = ('<table class="mtab"><tr><th>Changement d’état</th><th>$θ$ (°C)</th><th>$L$ (J·kg<sup>−1</sup>)</th></tr>'
       '<tr><th>fusion de la glace</th><td>0</td><td>3,34×10<sup>5</sup></td></tr><tr><th>vaporisation de l’eau</th><td>100</td><td>2,26×10<sup>6</sup></td></tr>'
       '<tr><th>fusion du plomb</th><td>327</td><td>2,50×10<sup>4</sup></td></tr></table>')

# ================= TITRE =================
S.append('''<section class="slide s-title" data-kind="titre" data-group="Début" data-menu="Titre du chapitre">
  <div class="fig-full fig bare" data-scene="titre"></div>
  <div class="title-block">
    <div class="eyebrow">PHYSIQUE · TRAVAIL MÉCANIQUE ET ÉNERGIE</div>
    <div class="chapter">Chapitre 7</div>
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
    situ(r"Un corps au repos dont le volume ne varie pas n’échange pas de travail ($W = 0$) : d’après le premier principe, $ΔU = Q$. Or l’énergie nécessaire pour une même élévation de température varie beaucoup d’un corps à l’autre (eau, métal…).",
         ["De quelles grandeurs dépend la chaleur $Q$ reçue par un corps dont la température varie sans changement d’état ?"]),
    "    " + fig("thermoplongeur", None, '{"exp":1}'))))

S.append(slide("activite", "Activité 1", "Influence de la masse et de Δθ", *P1, "Activité 1 · docs 1 et 2", cols("1fr", "1fr",
    "    <div class=\"stack center\">\n      " + card(r"Thermoplongeurs <b>identiques</b> reliés à des <b>joulemètres</b> : l’énergie électrique mesurée est entièrement transférée au corps sous forme de chaleur. Corps pris à $θ_i = 20,0~\u{°C}$.<br><b>Doc 1.</b> Eau chauffée jusqu’à $40,0~\u{°C}$. <b>Doc 2.</b> $200~\u{g}$ d’eau, plusieurs $Δθ$.", "small") + "\n      " + T_D1 + "\n      " + T_D2 + "\n    </div>",
    "    " + fig("thermoplongeur", doc(1, "Thermoplongeurs et joulemètres"), '{"exp":1}'))))

S.append(slide("activite", "Activité 1", "Influence de la nature du corps", *P1, "Activité 1 · doc 3", cols("1fr", "1fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 3.</b> Même énergie, $5,02~\u{kJ}$, fournie à $200~\u{g}$ d’eau et à un cylindre de fer de $200~\u{g}$ (résistance dans un logement du cylindre).", "small") + "\n      " + T_D3 + "\n      " +
    info(rf"$Q$ : chaleur <b>reçue</b> par le corps ($Q > 0$ s’il reçoit de l’énergie, $Q < 0$ s’il en cède). Sans changement d’état, $Q$ est égale au produit de la masse $m$, de $Δθ = θ_f − θ_i$ et d’un coefficient $c$ qui ne dépend que de la nature du corps : sa <b>chaleur massique</b>, en ${CU}$ (eau : 4185 ; fer : 450). $C = m·c$ : <b>capacité thermique</b>.") + "\n    </div>",
    "    " + fig("thermoplongeur", doc(3, "Eau et fer : même énergie reçue"), '{"exp":3}'))))

S.append(slide("questions", "Questions", "Activité 1 — Masse, Δθ et nature du corps", *P1, "Questions 1 et 2", cols("1.2fr", ".8fr",
    qlist(q(1, "Docs 1 et 2 : montrer que $Q$ est proportionnelle à $m$, puis à $Δθ$.",
            "Masse double ⇒ énergie double : $Q$ <b>proportionnelle à $m$</b>. $Δθ$ double, triple ⇒ énergie double, triple : $Q$ <b>proportionnelle à $Δθ$</b>.", "Établir."),
          q(2, "Doc 3 : combien de fois $Δθ$ du fer est-il plus grand que celui de l’eau ? Comparer au rapport des chaleurs massiques.",
            r"$\frac{55,8}{6,0} ≈ 9,3$ et $\frac{4185}{450} ≈ 9,3$ : la chaleur massique du fer est environ 9 fois plus petite, donc $Δθ = \frac{Q}{m·c}$ est 9 fois plus grand.", "Interpréter.")),
    "    " + fig("thermoplongeur", None, '{"exp":3}'))))

S.append(slide("questions", "Questions", "Activité 1 — Expression de Q et énergie interne", *P1, "Questions 3 et 4", cols("1.25fr", ".75fr",
    qlist(q(3, r"À l’aide de l’information, écrire $Q$. Que représente $c$ si $m = 1~\u{kg}$ et $Δθ = 1~\u{°C}$ ? Et $C = m·c$ ? Unités ?",
            rf"$Q = m·c·Δθ = m·c·(θ_f − θ_i)$. $c$ : énergie qui élève de $1~\u{{°C}}$ la température de $1~\u{{kg}}$ du corps ; $C$ : énergie qui élève de $1~\u{{°C}}$ celle du corps, $Q = C·Δθ$. $c$ en ${CU}$, $C$ en ${MU}$.", "Écrire."),
          q(4, "Signe de $Q$ quand le corps se refroidit ? Pour un corps au repos qui n’échange pas de travail, que vaut $ΔU$ ?",
            r"Refroidissement : $θ_f < θ_i$, $Q < 0$, le corps <b>cède</b> de la chaleur. $W = 0$ : $ΔU = Q = m·c·Δθ$.", "Relier.")),
    "    " + fig("transfert"))))

S.append(slide("retenir", "À retenir", "La chaleur et la quantité de chaleur", *P1, "À retenir · Q = m·c·Δθ", ("", "",
    rf"""    <div class="stack center" style="flex:1">
      <div style="display:grid;grid-template-columns:1.35fr .65fr;gap:22px;align-items:center">
      <div class="stack"><div class="def"><h3>La chaleur, un mode de transfert d’énergie</h3><p style="margin:0">La chaleur (ou <b>transfert thermique</b>) est un transfert d’énergie à l’échelle microscopique entre deux corps de températures différentes ; il se fait spontanément du corps <b>chaud</b> vers le corps <b>froid</b>.</p></div>
      <div class="def"><h3>Quantité de chaleur</h3><p style="margin:0 0 8px">Un corps pur de masse $m$ et de chaleur massique $c$, dont la température passe de $θ_i$ à $θ_f$ sans changement d’état, échange la quantité de chaleur :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Q = m·c·Δθ = m·c·(θ_f − θ_i)$</span></div>
        <p style="margin:8px 0 0">$Q$ en <b>joules (J)</b>, $m$ en <b>kg</b>, $c$ en <b>${CU}$</b>, $Δθ$ en <b>°C</b> (ou en K).</p></div></div>
      <div class="fig" data-scene="transfert" style="height:250px"></div></div>
      {T_C}
    </div>""")))

S.append(slide("retenir", "À retenir", "Capacité thermique, signe de Q, énergie interne", *P1, "À retenir · capacité thermique", cols("1.2fr", ".8fr",
    rf"""    <div class="stack center">
      <div class="def"><h3>Capacité thermique, signe de $Q$, énergie interne</h3><p style="margin:0 0 8px">Capacité thermique d’un corps : $C = m·c$ ; d’un calorimètre et de ses accessoires : $μ$, en <b>${MU}$</b>, et</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Q = μ·(θ_f − θ_i)$</span></div>
        <p style="margin:8px 0 0">$Q > 0$ : le système <b>reçoit</b> de la chaleur ; $Q < 0$ : il en <b>cède</b>. Pour un corps au repos qui n’échange pas de travail : <b>$ΔU = Q$</b>.</p></div>
    </div>""", "    " + fig("transfert"))))

S.append(slide("application", "Application", "Un bloc de fer qui refroidit", *P1, "Application · bloc de fer", ("", "",
    "    " + card(rf"Bloc de fer : $m = 800~\u{{g}}$, sorti d’un four à $θ_i = 320~\u{{°C}}$, refroidi jusqu’à $θ_f = 20~\u{{°C}}$ ; $c_{{\u{{Fe}}}} = 450~{CU}$.", "small") + "\n" +
    qlist(q(1, "Calculer la capacité thermique $C$ du bloc.", rf"$C = m·c_{{\u{{Fe}}}} = 0,800×450 = 360~{MU}$"),
          q(2, "Calculer $Q$ et interpréter son signe.", r"$Q = C·(θ_f − θ_i) = 360×(20 − 320) = −1,08×10^5~\u{J}$ : le bloc <b>cède</b> $108~\u{kJ}$ à l’air.")))))

# ================= PARTIE 2 =================
S.append(slide("situation", "Situation de départ", "Partie 2 — Mélanger des corps chauds et froids", *P2, "Situation de départ", cols(".85fr", "1.15fr",
    situ("Dans une enceinte isolée, deux corps de températures différentes échangent de la chaleur, du <b>chaud</b> vers le <b>froid</b>, jusqu’à ce que leurs températures soient <b>égales</b>.",
         ["Comment mesurer la capacité thermique d’un calorimètre, puis la chaleur massique d’un métal ?"]),
    "    " + fig("equilibre"))))

S.append(slide("activite", "Activité 2", "Le calorimètre — étape 1", *P2, "Activité 2 · doc 4", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 4.</b> Un <b>calorimètre</b> est une enceinte thermiquement isolée. Les corps qu’il contient échangent de la chaleur jusqu’à l’<b>équilibre thermique</b> (même température pour tous, constante). L’énergie cédée par les corps qui se refroidissent est entièrement reçue par ceux qui s’échauffent ; le bilan ne dépend que des états initial et final. Le calorimètre reçoit $Q = μ·(θ_f − θ_i)$, $μ$ : sa <b>capacité thermique</b>.<br><b>Étape 1.</b> $m_1 = 250~\u{g}$ d’eau à $θ_1 = 16,5~\u{°C}$ ; on verse $m_2 = 200~\u{g}$ d’eau à $θ_2 = 52,0~\u{°C}$ ; équilibre : $θ_{e1} = 31,5~\u{°C}$.", "small") + "\n    </div>",
    "    " + fig("calorimetre", doc(4, "Calorimètre de Berthelot (coupe)"), '{"labels":1,"mode":"eau","th0":16.5,"th1":31.5}'))))

S.append(slide("activite", "Activité 2", "Étape 2 — chaleur massique du cuivre", *P2, "Activité 2 · étape 2", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(rf"<b>Étape 2.</b> Le calorimètre vidé reçoit $m_e = 300~\u{{g}}$ d’eau à $θ_0 = 19,0~\u{{°C}}$. On y plonge un cylindre de cuivre ($m_{{\u{{Cu}}}} = 250~\u{{g}}$) sorti d’une étuve à $θ_m = 96,0~\u{{°C}}$. Équilibre : $θ_{{e2}} = 24,2~\u{{°C}}$. $c_e = 4185~{CU}$.") + "\n    </div>",
    "    " + fig("calorimetre", doc(4, "Le cylindre de cuivre dans le calorimètre"), '{"mode":"metal","metal":"#c8794a","th0":19,"th1":24.2}'))))

S.append(slide("questions", "Questions", "Activité 2 — Équation calorimétrique et μ", *P2, "Questions 1 et 2", cols("1.3fr", ".7fr",
    qlist(q(1, "D’après le doc 4 : quand des corps sont-ils en équilibre thermique ? Que vaut la somme $Q_1 + Q_2 + …$ (<b>équation calorimétrique</b>) ?",
            "Quand ils ont tous la même température, constante. L’énergie cédée par les uns est reçue par les autres : $ΣQ_i = 0$.", "Définir."),
          q(2, "Étape 1 : exprimer les chaleurs échangées ; en déduire $μ$.",
            rf"$Q_1 = (μ + m_1·c_e)(θ_{{e1}} − θ_1)$ ; $Q_2 = m_2·c_e·(θ_{{e1}} − θ_2)$ ; $Q_1 + Q_2 = 0$<br>$μ = \frac{{m_2·c_e·(θ_2 − θ_{{e1}})}}{{θ_{{e1}} − θ_1}} − m_1·c_e = 1143,9 − 1046,3 ≈ 98~{MU}$", "Calculer.")),
    "    " + fig("calorimetre", None, '{"mode":"eau","th0":16.5,"th1":31.5}'))))

S.append(slide("questions", "Questions", "Activité 2 — Chaleur massique du cuivre", *P2, "Questions 3 et 4", cols("1.35fr", ".65fr",
    qlist(q(3, "Étape 2 : exprimer les chaleurs échangées par {calorimètre + eau} et par le cuivre.",
            r"$Q_{ce} = (μ + m_e·c_e)(θ_{e2} − θ_0) > 0$ ; $Q_{\u{Cu}} = m_{\u{Cu}}·c_{\u{Cu}}·(θ_{e2} − θ_m) < 0$", "Exprimer."),
          q(4, r"En déduire $c_{\u{Cu}}$ (avec $μ$ de la question 2) ; comparer au tableau.",
            rf"$c_{{\u{{Cu}}}} = \frac{{(98 + 0,300×4185)×5,2}}{{0,250×71,8}} ≈ 392~{CU}$, proche de 385.", "Déterminer.")),
    "    " + fig("calorimetre", None, '{"mode":"metal","metal":"#c8794a","th0":19,"th1":24.2}'))))

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
    "    " + fig("calorimetre", None, '{"mode":"deux","th0":18,"th1":26.5}'))))

S.append(slide("application", "Application", "Trois corps dans un calorimètre", *P2, "Application · trois corps", cols("1.3fr", ".7fr",
    "    <div class=\"stack\">\n      " + card(rf"Calorimètre : $μ = 85~{MU}$, $m_1 = 200~\u{{g}}$ d’eau à $θ_1 = 18,0~\u{{°C}}$. On y introduit une bille de fer ($m_2 = 100~\u{{g}}$, $θ_2 = 80,0~\u{{°C}}$) et un bloc de cuivre ($m_3 = 150~\u{{g}}$, $θ_3 = 120,0~\u{{°C}}$). $c_e = 4185$ ; $c_{{\u{{Fe}}}} = 450$ ; $c_{{\u{{Cu}}}} = 390~{CU}$.", "small") + "\n" +
    qlist(q(1, "Écrire l’équation calorimétrique.", r"$(μ + m_1·c_e)(θ_e − θ_1) + m_2·c_{\u{Fe}}(θ_e − θ_2) + m_3·c_{\u{Cu}}(θ_e − θ_3) = 0$"),
          q(2, "Exprimer, puis calculer $θ_e$.", r"$C_1 = 922$, $C_2 = 45$, $C_3 = 58,5~\u{J·°C^{−1}}$ : $θ_e = \frac{922×18,0 + 45×80,0 + 58,5×120,0}{1025,5} ≈ 26,5~\u{°C}$")) + "\n    </div>",
    "    " + fig("calorimetre", None, '{"mode":"deux","th0":18,"th1":26.5}'))))

# ================= PARTIE 3 =================
S.append(slide("situation", "Situation de départ", "Partie 3 — La glace qui fond", *P3, "Situation de départ", cols(".9fr", "1.1fr",
    situ(r"Quand la glace atteint $0~\u{°C}$, l’énergie qu’elle reçoit ne fait plus monter sa température : elle sert à rompre les liaisons entre les molécules pour la faire passer à l’état liquide.",
         ["Comment exprimer la chaleur reçue pendant un changement d’état, et comment la mesurer ?"]),
    "    " + fig("courbeGlace"))))

S.append(slide("activite", "Activité 3", "Courbe d’échauffement et chaleur latente", *P3, "Activité 3 · doc 5", cols("1fr", "1fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 5.</b> On chauffe à puissance constante $100~\u{g}$ de glace prise à $−10~\u{°C}$ et on relève sa température.<br><b>Chaleur latente.</b> À pression constante, un corps pur change d’état à température constante ($θ_{\u{fus}} = 0~\u{°C}$ pour la glace). La chaleur échangée est proportionnelle à la masse $m$ qui change d’état : $Q = m·L$, $L$ : <b>chaleur latente</b>. La fusion se fait en recevant de la chaleur ; la solidification, inverse, cède exactement la même quantité.", "small") + "\n    </div>",
    "    " + fig("courbeGlace", doc(5, "Température de la glace chauffée")))))

S.append(slide("activite", "Activité 3", "Mesurer la chaleur latente de fusion de la glace", *P3, "Activité 3 · doc 6", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(rf"<b>Doc 6.</b> Calorimètre : $μ = 75~{MU}$, $m_1 = 350~\u{{g}}$ d’eau à $θ_1 = 24,0~\u{{°C}}$. On y introduit $m_2 = 50~\u{{g}}$ de glace fondante ($0,0~\u{{°C}}$). Après fusion complète : $θ_e = 11,4~\u{{°C}}$. $c_e = 4185~{CU}$.") + "\n    </div>",
    "    " + fig("calorimetre", doc(6, "De la glace dans le calorimètre"), '{"mode":"glace","th0":24,"th1":11.4}'))))

S.append(slide("questions", "Questions", "Activité 3 — Le palier et la chaleur latente", *P3, "Questions 1 et 2", cols("1.15fr", ".85fr",
    qlist(q(1, "Doc 5 : décrire les trois parties de la courbe. La glace reçoit-elle de l’énergie pendant le palier ?",
            r"La glace s’échauffe de $−10$ à $0~\u{°C}$ ; la température reste à $0~\u{°C}$ pendant la <b>fusion</b> ; puis l’eau liquide s’échauffe. Pendant le palier, l’énergie reçue sert à <b>changer l’état</b>.", "Exploiter."),
          q(2, r"D’après $Q = m·L$, que représente $L$ si $m = 1~\u{kg}$ ? Unité ? Relation entre $L_s$ et $L_f$ ?",
            r"Chaleur à échanger avec $1~\u{kg}$ pour un changement d’état complet, en $\u{J·kg^{−1}}$. La solidification cède ce que la fusion reçoit : $L_s = −L_f$.", "Définir.")),
    "    " + fig("courbeGlace", None, '{"labels":1}'))))

S.append(slide("questions", "Questions", "Activité 3 — Calcul de L<sub>f</sub>", *P3, "Questions 3 à 5", cols("1.4fr", ".6fr",
    qlist(q(3, "Doc 6 : les deux étapes subies par la glace ; exprimer la chaleur totale $Q_g$ qu’elle reçoit.",
            r"Fusion à $0~\u{°C}$ : $m_2·L_f$ ; échauffement de l’eau de fusion jusqu’à $θ_e$ : $m_2·c_e·(θ_e − θ_{\u{fus}})$<br>$Q_g = m_2·L_f + m_2·c_e·(θ_e − θ_{\u{fus}})$", "Décrire."),
          q(4, "Exprimer la chaleur $Q_{ce}$ cédée par le calorimètre et l’eau.", r"$Q_{ce} = (μ + m_1·c_e)(θ_e − θ_1) < 0$", "Exprimer."),
          q(5, "Calculer $L_f$.", r"$L_f = \frac{(μ + m_1·c_e)(θ_1 − θ_e)}{m_2} − c_e·(θ_e − θ_{\u{fus}}) = \frac{1539,75×12,6}{0,050} − 4185×11,4 ≈ 3,40×10^5~\u{J·kg^{−1}}$", "Calculer.")),
    "    " + fig("calorimetre", None, '{"mode":"glace","th0":24,"th1":11.4}'))))

S.append(slide("retenir", "À retenir", "Chaleur latente de changement d’état", *P3, "À retenir · Q = m·L", cols("1.15fr", ".85fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Changement d’état d’un corps pur</h3><p style="margin:0">À pression constante, un corps pur change d’état à <b>température constante</b> (palier). L’énergie reçue ou cédée sert au <b>changement d’état</b>.</p></div>
      <div class="def"><h3>Chaleur latente</h3><p style="margin:0 0 8px">Une masse $m$ d’un corps pur qui change complètement d’état échange la quantité de chaleur :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$Q = m·L$</span></div>
        <p style="margin:8px 0 0">$L$ : chaleur latente, en <b>$\u{J·kg^{−1}}$</b>.<br>Fusion : <b>$Q = +m·L_f > 0$</b> ; solidification : <b>$Q = −m·L_f < 0$</b>, soit <b>$L_s = −L_f$</b>.</p></div>
    </div>""", '    <div class="stack center">' + fig("courbeGlace", None, '{"labels":1}').replace('class="fig"', 'class="fig" style="height:330px;flex:none"') + T_L + "</div>")))

S.append(slide("application", "Application", "La glace fond-elle entièrement ?", *P3, "Application · fusion partielle", ("", "",
    "    " + card(rf"Glace : $m = 250~\u{{g}}$ à $θ_1 = −20,0~\u{{°C}}$ ; on lui fournit $Q_{{\u{{tot}}}} = 60,0~\u{{kJ}}$ dans une enceinte isolée. $c_g = 2090~{CU}$ ; $L_f = 3,34×10^5~\u{{J·kg^{{−1}}}}$.", "small") + "\n" +
    '    <div class="fig" data-scene="fusionPartielle" style="height:170px;flex:none"></div>\n' +
    qlist(q(1, "Calculer $Q_1$ (glace de −20 à 0 °C) et $Q_2$ (fusion de toute la glace).", r"$Q_1 = 0,250×2090×20,0 = 10450~\u{J}$ ; $Q_2 = 0,250×3,34×10^5 = 83500~\u{J}$"),
          q(2, r"Comparer $Q_{\u{tot}}$ à $Q_1$ et $Q_1 + Q_2$ ; état final ?", r"$Q_1 < Q_{\u{tot}} < Q_1 + Q_2$ : fusion <b>partielle</b>, mélange eau + glace à $0~\u{°C}$ ; $m_{\u{liq}} = \frac{60000 − 10450}{3,34×10^5} ≈ 148~\u{g}$ ; $m_{\u{sol}} ≈ 102~\u{g}$")))))

# ================= PARTIE 4 =================
S.append(slide("situation", "Situation de départ", "Partie 4 — La chaleur du Soleil", *P4, "Situation de départ", cols(".9fr", "1.1fr",
    situ("La conduction et la convection ont besoin de <b>matière</b> pour transporter l’énergie. Pourtant, le Soleil chauffe la Terre à travers <b>150 millions de kilomètres de vide</b>.",
         ["Comment l’énergie peut-elle se propager sans support matériel ?"]),
    "    " + fig("soleilTerre"))))

S.append(slide("activite", "Activité 4", "Un capteur sous vide", *P4, "Activité 4 · doc 7", cols(".95fr", "1.05fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 7.</b> Un capteur thermique à surface noircie (thermomètre à réservoir noirci) est placé sous une cloche où l’on a fait le <b>vide</b>. Une lampe extérieure (visible et infrarouge) l’éclaire : dès l’allumage, sa température s’élève.", "small") + "\n      " +
    info("La lumière visible et l’infrarouge sont des <b>ondes électromagnétiques</b> : elles transportent de l’énergie, se propagent en ligne droite et même dans le vide. Ce mode de transfert s’appelle le <b>rayonnement</b>. Un corps qui absorbe un rayonnement voit son énergie interne augmenter.") + "\n    </div>",
    "    " + fig("cloche", doc(7, "Capteur sous une cloche à vide")))))

S.append(slide("activite", "Activité 4", "Conduction, convection et absorption", *P4, "Activité 4 · doc 8", rows(
    "    " + card("<b>Doc 8.</b> <b>Conduction</b> : dans un solide, de proche en proche, sans déplacement de matière. <b>Convection</b> : dans un liquide ou un gaz, la matière chaude se déplace. Ces deux modes ont besoin de matière. Une surface <b>sombre et mate absorbe</b> la plus grande partie du rayonnement reçu ; une surface brillante ou blanche le <b>réfléchit</b>. Une <b>vitre</b> laisse passer la lumière visible mais arrête une grande partie de l’infrarouge émis par les objets chauds.", "small"),
    [fig("modes")], "1fr")))

S.append(slide("questions", "Questions", "Activité 4 — Le rayonnement", *P4, "Questions 1 à 3", cols("1.35fr", ".65fr",
    qlist(q(1, "Doc 7 : pourquoi l’énergie ne peut-elle pas arriver au capteur par l’air ? Nommer le mode de transfert.",
            "Il n’y a plus d’air : aucun transfert par la matière. Le capteur absorbe les <b>ondes électromagnétiques</b> de la lampe : c’est le <b>rayonnement</b>.", "Interpréter."),
          q(2, "Doc 8 : différence essentielle entre le rayonnement et la conduction ou la convection ?",
            "Conduction et convection ont besoin de matière ; le rayonnement se propage <b>même dans le vide</b>.", "Comparer."),
          q(3, "Pourquoi les tubes d’un capteur solaire sont-ils noirs mats et placés sous une vitre ?",
            "Le noir mat <b>absorbe</b> au maximum le rayonnement solaire ; la vitre laisse entrer la lumière mais <b>arrête l’infrarouge</b> émis par les tubes chauds : elle limite les pertes (effet de serre).", "Expliquer.")),
    "    " + fig("panneauSolaire"))))

S.append(slide("retenir", "À retenir", "Le rayonnement", *P4, "À retenir · rayonnement", ("", "",
    r"""    <div class="stack center" style="flex:1">
      <div class="def"><h3>Le rayonnement</h3><p style="margin:0">Le rayonnement est un mode de transfert d’énergie assuré par des <b>ondes électromagnétiques</b> (infrarouge, lumière visible, ultraviolet). Il ne nécessite <b>aucun support matériel</b> : il se propage dans le <b>vide</b> et dans les milieux transparents.<br>Tout corps émet un rayonnement qui dépend de sa <b>température</b> et de l’état de sa surface. Un corps qui absorbe un rayonnement voit son <b>énergie interne</b> augmenter : il s’échauffe ou change d’état. Les surfaces <b>sombres et mates</b> sont les meilleurs absorbeurs.</p></div>
      <div class="fig" data-scene="modes" style="height:320px;flex:none;width:100%"></div>
    </div>""")))

S.append(slide("application", "Application", "Un capteur solaire", *P4, "Application · capteur solaire", cols("1.2fr", ".8fr",
    "    <div class=\"stack\">\n      " + card(rf"Capteur : $S = 2,5~\u{{m^2}}$, exposé $Δt = 2,0~\u{{h}}$ ; puissance reçue par mètre carré $P_s = 800~\u{{W·m^{{−2}}}}$ ; il transfère $η = 65$ % de l’énergie reçue à $m = 150~\u{{kg}}$ d’eau à $θ_i = 18,0~\u{{°C}}$ ; $c_e = 4185~{CU}$.", "small") + "\n" +
    qlist(q(1, r"Calculer $E_{\u{ray}} = P_s·S·Δt$, puis la chaleur $Q$ transférée à l’eau.", r"$E_{\u{ray}} = 800×2,5×7200 = 1,44×10^7~\u{J}$ ; $Q = 0,65×1,44×10^7 = 9,36×10^6~\u{J}$"),
          q(2, r"Calculer la température finale $θ_f$ de l’eau.", r"$θ_f = θ_i + \frac{Q}{m·c_e} = 18,0 + \frac{9,36×10^6}{150×4185} ≈ 32,9~\u{°C}$")) + "\n    </div>",
    "    " + fig("panneauSolaire"))))

# ================= EXERCICES =================
S.append(slide("quiz", "Vrai ou faux ?", "Je vérifie mes connaissances", *EX, "Vrai ou faux ?", ("", "",
    '    <div class="vflist">\n      ' + "\n      ".join([
        vf("a", "faux", "La chaleur passe spontanément d’un corps froid vers un corps chaud.", "Faux : du corps chaud vers le corps froid."),
        vf("b", "vrai", "Pour une même énergie reçue, 1 kg de fer s’échauffe plus que 1 kg d’eau.", r"Vrai : $c_{\u{Fe}} = 450 < c_{\u{eau}} = 4185$."),
        vf("c", "vrai", "Un corps qui cède de la chaleur sans échanger de travail voit son énergie interne diminuer.", r"Vrai : $ΔU = Q < 0$."),
        vf("d", "faux", "Pendant la fusion de la glace sous pression constante, la température augmente.", "Faux : elle reste constante (palier)."),
        vf("e", "vrai", "La chaleur latente de solidification de l’eau est l’opposée de sa chaleur latente de fusion.", r"Vrai : $L_s = −L_f$."),
        vf("f", "faux", "Le rayonnement a besoin d’un milieu matériel pour se propager.", "Faux : il se propage même dans le vide.")]) + "\n    </div>")))

S.append(slide("exercice", "Exercice 1", "Trois opérations dans un calorimètre", *EX, "Exercice 1 · énoncé", cols("1.35fr", ".65fr",
    "    <div class=\"stack\">\n      " + card(rf"Calorimètre avec $m_1 = 200~\u{{g}}$ d’eau à $20,0~\u{{°C}}$ ; $c_e = 4185~{CU}$.<br><b>1.</b> On ajoute $100~\u{{g}}$ d’eau à $65,0~\u{{°C}}$ : $θ_e = 33,8~\u{{°C}}$. <b>2.</b> On plonge $120~\u{{g}}$ d’aluminium à $100,0~\u{{°C}}$ : $θ'_e = 38,6~\u{{°C}}$. <b>3.</b> On introduit $50~\u{{g}}$ de glace à $0,0~\u{{°C}}$ ; après fusion : $θ''_e = 23,9~\u{{°C}}$.", "small") +
    r'''
      <ol class="exlist small"><li>Calculer $μ$ (opération 1).</li><li>Calculer $c_{\u{Al}}$ (opération 2).</li><li>Calculer $L_f$ (opération 3), avec tous les corps présents.</li></ol>
    </div>''', "    " + fig("calorimetre", None, '{"mode":"metal","metal":"#c9cfd6","th0":33.8,"th1":38.6}'))))

S.append(slide("exercice", "Correction", "Exercice 1 — Trois opérations", *EX, "Exercice 1 · correction", ("", "",
    qlist(q(1, '<span class="kw">Capacité thermique</span>', rf"$μ = \frac{{m_2·c_e(θ_2 − θ_e)}}{{θ_e − θ_1}} − m_1·c_e = 946,2 − 837,0 ≈ 109~{MU}$"),
          q(2, '<span class="kw">Aluminium</span>', rf"$C_1 = μ + 0,300×4185 ≈ 1365~{MU}$ ; $c_{{\u{{Al}}}} = \frac{{1365×4,8}}{{0,120×61,4}} ≈ 889~{CU}$"),
          q(3, '<span class="kw">Glace</span>', r"$C_2 = C_1 + m_{\u{Al}}·c_{\u{Al}} ≈ 1471~\u{J·°C^{−1}}$ ; $C_2(θ''_e − θ'_e) + m_g·L_f + m_g·c_e·θ''_e = 0$ ⇒ $L_f = \frac{1471×14,7}{0,050} − 4185×23,9 ≈ 3,33×10^5~\u{J·kg^{−1}}$")))))

S.append(slide("exercice", "Exercice 2", "Le graphe θ = f(Q) de la glace", *EX, "Exercice 2 · énoncé", cols("1.2fr", ".8fr",
    "    <div class=\"stack\">\n      " + card(rf"Glace de masse $m$ à $−20,0~\u{{°C}}$, chauffée dans une enceinte isolée : $Q_1 = 8,36~\u{{kJ}}$, $Q_2 = 75,16~\u{{kJ}}$, $Q_3 = 108,64~\u{{kJ}}$ ; température finale $40,0~\u{{°C}}$ ; $c_g = 2090~{CU}$.", "small") +
    r'''
      <ol class="exlist small"><li>Interpréter les trois parties de la courbe.</li><li>Calculer $m$ (partie $[0 ; Q_1]$).</li><li>Calculer $L_f$ (palier).</li><li>Calculer $c_e$ (partie $[Q_2 ; Q_3]$).</li></ol>
    </div>''', "    " + fig("courbeQ"))))

S.append(slide("exercice", "Correction", "Exercice 2 — Le graphe θ = f(Q)", *EX, "Exercice 2 · correction", cols("1.35fr", ".65fr",
    qlist(q(1, '<span class="kw">Interprétation</span>', r"$[0 ; Q_1]$ : la glace s’échauffe ; $[Q_1 ; Q_2]$ : fusion à $0~\u{°C}$ ; $[Q_2 ; Q_3]$ : l’eau liquide s’échauffe."),
          q(2, '<span class="kw">Masse</span>', r"$m = \frac{Q_1}{c_g·Δθ} = \frac{8360}{2090×20,0} = 0,200~\u{kg}$"),
          q(3, '<span class="kw">Chaleur latente</span>', r"$L_f = \frac{Q_2 − Q_1}{m} = \frac{66800}{0,200} = 3,34×10^5~\u{J·kg^{−1}}$"),
          q(4, '<span class="kw">Chaleur massique de l’eau</span>', rf"$c_e = \frac{{Q_3 − Q_2}}{{m·Δθ}} = \frac{{33480}}{{0,200×40,0}} = 4185~{CU}$")),
    "    " + fig("courbeQ"))))

S.append(slide("exercice", "Exercice 3", "Une balle de plomb qui fond", *EX, "Exercice 3 · énoncé", rows(
    "    " + card(rf"Balle de plomb : $m = 50~\u{{g}}$, $θ_0 = 27,0~\u{{°C}}$, $V_0 = 350~\u{{m·s^{{−1}}}}$ horizontale ; elle s’immobilise dans un bloc de bois fixe ; $η = 80$ % de l’énergie mécanique perdue est reçue par la balle (chaleur $Q$). Plomb : $θ_{{\u{{fus}}}} = 327,0~\u{{°C}}$ ; $c_{{\u{{Pb}}}} = 130~{CU}$ ; $L_f = 2,50×10^4~\u{{J·kg^{{−1}}}}$.", "small"),
    [fig("balle"), r'''<ol class="exlist small"><li>$ΔE_{\u{m}}$ de la balle, puis $Q$.</li><li>$Q_1$ jusqu’à $327,0~\u{°C}$.</li><li>Montrer qu’une partie fond ; masse fondue $m_{\u{f}}$.</li><li>Vitesse minimale $V_{\u{min}}$ pour une fusion totale.</li></ol>'''], "1.4fr .6fr")))

S.append(slide("exercice", "Correction", "Exercice 3 — Une balle de plomb qui fond", *EX, "Exercice 3 · correction", ("", "",
    qlist(q(1, '<span class="kw">Énergie</span>', r"$ΔE_{\u{m}} = ΔE_{\u{C}} = 0 − \frac{1}{2}×0,050×350^2 ≈ −3,06×10^3~\u{J}$ ; $Q = 0,80×3062,5 = 2450~\u{J}$"),
          q(2, '<span class="kw">Jusqu’à la fusion</span>', r"$Q_1 = 0,050×130×300 = 1950~\u{J}$"),
          q(3, '<span class="kw">Fusion partielle</span>', r"$Q_1 < Q < Q_1 + m·L_f = 3200~\u{J}$ : une partie fond ; $m_{\u{f}} = \frac{Q − Q_1}{L_f} = \frac{500}{2,50×10^4} = 0,020~\u{kg} = 20~\u{g}$"),
          q(4, '<span class="kw">Fusion totale</span>', r"$η·\frac{1}{2}m·V_{\u{min}}^2 = 3200~\u{J}$ ⇒ $V_{\u{min}} = \sqrt{\frac{2×3200}{0,80×0,050}} = 400~\u{m·s^{−1}}$")))))

S.append(slide("bilan", "L’essentiel", "Ce qu’il faut retenir du chapitre", "Bilan", "Exercices et bilan", "L’essentiel du chapitre", ("", "",
    rf'''    <div class="bilan">
      <div class="bil"><h3>La chaleur</h3><p>transfert d’énergie, spontanément du corps chaud vers le corps froid ; $ΔU = Q$ si $W = 0$</p></div>
      <div class="bil"><h3>Quantité de chaleur</h3><span class="eq-wrap">$Q = m·c·(θ_f − θ_i)$</span><p>$c$ en ${CU}$ ; $Q > 0$ reçue, $Q < 0$ cédée</p></div>
      <div class="bil"><h3>Capacité thermique</h3><span class="eq-wrap">$Q = μ·(θ_f − θ_i)$</span><p>$C = m·c$ ; $μ$ en ${MU}$</p></div>
      <div class="bil"><h3>Calorimétrie</h3><span class="eq-wrap">$ΣQ_i = 0$</span><p>système isolé ; seuls comptent les états initial et final</p></div>
      <div class="bil"><h3>Changement d’état</h3><span class="eq-wrap">$Q = ±m·L$</span><p>à température constante ; $L_s = −L_f$</p></div>
      <div class="bil"><h3>Rayonnement</h3><p>ondes électromagnétiques, même dans le vide ; surfaces sombres = bons absorbeurs</p></div>
    </div>''')))

(SRC / "slides.html").write_text("\n".join(S))
print(len(S), "diapositives")
