"""Écrit src/slides.html (physique, chapitre 6 : Le travail et l’énergie interne).
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




P1 = ("Partie 1", "Partie 1 · Effets du travail")
P2 = ("Partie 2", "Partie 2 · Forces pressantes")
P3 = ("Partie 3", "Partie 3 · Énergie interne")
P4 = ("Partie 4", "Partie 4 · Premier principe")
EX = ("Exercices", "Exercices et bilan")
EM, EC, EPP, ET = r"E_{\u{m}}", r"E_{\u{C}}", r"E_{\u{pp}}", r"E_{\u{tot}}"
ECM, EPM = r"E_{\u{C,mic}}", r"E_{\u{p,mic}}"
S = []

def info(html):
    return f'<div class="card small" style="border:1.5px solid #0e8f8a66"><p style="margin:0"><b>Information.</b> {html}</p></div>'

# ================= TITRE =================
S.append('''<section class="slide s-title" data-kind="titre" data-group="Début" data-menu="Titre du chapitre">
  <div class="fig-full fig bare" data-scene="titre"></div>
  <div class="title-block">
    <div class="eyebrow">PHYSIQUE · TRAVAIL MÉCANIQUE ET ÉNERGIE</div>
    <div class="chapter">Chapitre 6</div>
    <h1>Le travail et l’énergie interne</h1>
    <div class="plan">
      <span><b>1</b>Quelques effets du travail reçu</span>
      <span><b>2</b>Travail des forces pressantes</span>
      <span><b>3</b>L’énergie interne</span>
      <span><b>4</b>Le premier principe de la thermodynamique</span>
    </div>
    <div class="hint">Appuyez sur → (ou cliquez sur la flèche en bas à droite) pour avancer · F : plein écran</div>
  </div>
</section>
''')

# ================= PARTIE 1 =================
S.append(slide("situation", "Situation de départ", "Partie 1 — Que produit un travail reçu ?", *P1, "Situation de départ", rows(
    situ("Un solide qui reçoit un travail moteur sur un plan lisse prend de la vitesse. Mais <b>frotter ses mains</b> les réchauffe, <b>tirer sur un ressort</b> l’allonge, <b>frotter deux blocs de glace</b> les fait fondre : le système reçoit un travail sans que sa vitesse ni son altitude ne changent.",
         ["Quels autres effets un travail reçu peut-il produire ?"]),
    [fig("effets")], "1fr")))

S.append(slide("activite", "Activité 1", "Quatre expériences", *P1, "Activité 1 · doc 1", rows(
    "    " + card(r"<b>Doc 1.</b> (a) On perce une plaque d’acier : la température de la zone percée s’élève fortement. (b) Un opérateur étire un ressort ; lâché, le ressort reprend sa longueur. (c) On frotte deux blocs de glace à $0~\u{°C}$ : une partie de la glace devient liquide, à température constante. (d) On frotte une allumette : elle s’enflamme, le phosphore brûle.", "small"),
    [fig("effets", doc(1, "Quatre systèmes qui reçoivent un travail"))], "1fr")))

S.append(slide("activite", "Activité 1", "Le ressort et le travail d’une force variable", *P1, "Activité 1 · doc 2", cols("1.1fr", ".9fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 2.</b> Ressort de raideur $k$, fixé à une extrémité. L’opérateur exerce sur l’autre extrémité une force $\vec{F}$ parallèle à l’axe, de même sens que le déplacement, d’intensité proportionnelle à l’allongement $x$ : $F = k·x$. Le ressort exerce sur l’opérateur la force de rappel $\vec{T} = −\vec{F}$.", "small") + "\n      " +
    info(r"<b>Travail d’une force variable.</b> Quand une force parallèle au déplacement a une intensité variable, son travail est égal à l’<b>aire</b> comprise entre la courbe $F = f(x)$, l’axe des abscisses et les deux verticales qui limitent le déplacement.") + "\n    </div>",
    "    " + fig("ressortApp", doc(2, "Un ressort étiré")))))

S.append(slide("questions", "Questions", "Activité 1 — Échauffement et déformation", *P1, "Questions 1 et 2", cols("1.25fr", ".75fr",
    qlist(q(1, "Doc 1 (a) : quel est l’effet du travail reçu par la plaque percée ?", "Une <b>élévation de la température</b> de la plaque.", "Identifier."),
          q(2, r"Doc 1 (b) et doc 2 : effet du travail reçu par le ressort ? Tracer $F = f(x)$ ; à l’aide de l’information, exprimer $W_{0→x}(\vec{F})$, puis le travail de $\vec{F}$ et de $\vec{T}$ entre $x_1$ et $x_2$.",
            r"<b>Déformation élastique</b>. $F = k·x$ : droite passant par l’origine ; aire du triangle : $W_{0→x}(\vec{F}) = \frac{1}{2}k·x^2$<br>$W_{1→2}(\vec{F}) = \frac{1}{2}k·x_2^2 − \frac{1}{2}k·x_1^2$ ; $\vec{T} = −\vec{F}$ ⇒ $W_{1→2}(\vec{T}) = \frac{1}{2}k·x_1^2 − \frac{1}{2}k·x_2^2$", "Établir.")),
    "    " + fig("graphFx", "Le travail est l’aire du triangle"))))

S.append(slide("questions", "Questions", "Activité 1 — Changements d’état et bilan", *P1, "Questions 3 et 4", rows(
    qlist(q(3, "Doc 1 (c) et (d) : nature des transformations provoquées par le travail reçu ?", "(c) La glace fond : <b>changement d’état physique</b>. (d) L’allumette brûle : <b>transformation chimique</b> (combustion).", "Préciser."),
          q(4, "Résumer les effets d’un travail reçu, en dehors d’une variation de vitesse.", "<b>Élévation de température</b>, <b>déformation élastique</b>, <b>changement d’état physique</b> ou <b>transformation chimique</b>.", "Classer.")),
    [fig("effets")], "1fr")))

S.append(slide("retenir", "À retenir", "Effets du travail ; travail pour déformer un ressort", *P1, "À retenir · effets et ressort", cols("1.3fr", ".7fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Effets du travail reçu par un système</h3><p style="margin:0">En dehors d’une variation de vitesse, le travail reçu par un système peut provoquer : une <b>élévation de température</b> (frottement, perçage, compression rapide d’un gaz) ; une <b>déformation élastique</b> (ressort, arc, lame) ; un <b>changement d’état physique</b> ou une <b>transformation chimique</b> (fusion de la glace, allumette).</p></div>
      <div class="def"><h3>Travail pour déformer un ressort</h3><p style="margin:0 0 8px">Pour faire passer l’allongement (ou la compression) d’un ressort de raideur $k$ de $x_1$ à $x_2$, la force extérieure $\vec{F}$ effectue le travail :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$W_{1→2}(\vec{F}) = \frac{1}{2}k·x_2^2 − \frac{1}{2}k·x_1^2$</span></div>
        <p style="margin:8px 0 0">Le travail de la force de rappel $\vec{T}$ du ressort est l’<b>opposé</b> : $W_{1→2}(\vec{T}) = \frac{1}{2}k·x_1^2 − \frac{1}{2}k·x_2^2$.</p></div>
    </div>""", "    " + fig("graphFx"))))

S.append(slide("application", "Application", "Étirer un ressort", *P1, "Application · ressort", rows(
    "    " + card(r"Ressort : $ℓ_0 = 15~\u{cm}$, $k = 200~\u{N·m^{−1}}$ ; un opérateur fait passer sa longueur de $ℓ_1 = 18~\u{cm}$ à $ℓ_2 = 25~\u{cm}$.", "small") + "\n" +
    qlist(q(1, r"Calculer $x_1$ et $x_2$ en mètres ($x = ℓ − ℓ_0$).", r"$x_1 = 0,03~\u{m}$ ; $x_2 = 0,10~\u{m}$"),
          q(2, r"Calculer $W_{1→2}(\vec{F})$, puis $W_{1→2}(\vec{T})$.", r"$W_{1→2}(\vec{F}) = \frac{1}{2}×200×(0,10^2 − 0,03^2) = 0,91~\u{J}$ ; $W_{1→2}(\vec{T}) = −0,91~\u{J}$")),
    [fig("ressortApp")], "1fr")))

# ================= PARTIE 2 =================
S.append(slide("situation", "Situation de départ", "Partie 2 — La pompe bouchée", *P2, "Situation de départ", cols(".95fr", "1.05fr",
    situ("On bouche la sortie d’une pompe à vélo et on enfonce rapidement le piston : le volume de l’air diminue et le cylindre <b>s’échauffe</b>. Par le piston, l’opérateur exerce sur l’air une <b>force pressante</b> qui travaille.",
         ["Comment exprimer ce travail en fonction de la pression et de la variation de volume du gaz ?"]),
    "    " + fig("pompe"))))

S.append(slide("activite", "Activité 2", "Compression d’un gaz à pression constante", *P2, "Activité 2 · doc 3", cols("1.05fr", ".95fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 3.</b> Gaz parfait dans un cylindre de section $S$ fermé par un piston mobile sans frottement. La force pressante $\vec{F}$ est dirigée vers l’intérieur ; la pression $P$ reste constante (<b>isobare</b>). Le piston passe de $x_1$ ($V_1$) à $x_2$ ($V_2 < V_1$) : il parcourt $ℓ$ dans le sens de $\vec{F}$. Volume balayé : $S·ℓ = V_1 − V_2 = −ΔV$, avec $ΔV = V_2 − V_1$.", "small") + "\n      " +
    r'<div class="rappel small"><b>Rappel.</b> $P = \frac{F}{S}$ : $P$ en Pa, $F$ en N, $S$ en $\u{m^2}$ ; $1~\u{bar} = 10^5~\u{Pa}$ ; $1~\u{L} = 10^{−3}~\u{m^3}$.</div>' + "\n      " +
    info("<b>Convention de signe.</b> Le travail <b>reçu</b> par le gaz est compté positivement, le travail <b>cédé</b> négativement. Volume constant : transformation <b>isochore</b> ; augmentation de volume : <b>détente</b>.") + "\n    </div>",
    "    " + fig("cylindre", doc(3, "Gaz comprimé par un piston")))))

S.append(slide("questions", "Questions", "Activité 2 — Le travail des forces pressantes", *P2, "Questions 1 à 3", cols("1.3fr", ".7fr",
    qlist(q(1, "À l’aide du rappel, exprimer $F$ en fonction de $P$ et de $S$.", r"$F = P·S$", "Exprimer."),
          q(2, r"Exprimer $W$ en fonction de $P$, $S$ et $ℓ$, puis, avec le doc 3, en fonction de $P$ et $ΔV$.", r"Même sens : $W = F·ℓ = P·S·ℓ$ ; or $S·ℓ = −ΔV$ ⇒ $W = −P·ΔV = −P·(V_2 − V_1)$", "Établir."),
          q(3, "Signe de $W$ pour une compression, une détente, une transformation isochore ? Interpréter avec la convention.",
            r"Compression : $ΔV < 0$, $W > 0$, le gaz <b>reçoit</b> du travail. Détente : $ΔV > 0$, $W < 0$, le gaz <b>cède</b> du travail. Isochore : $W = 0$.", "Discuter.")),
    "    " + fig("cylindre"))))

S.append(slide("retenir", "À retenir", "Travail des forces pressantes", *P2, "À retenir · W = −P·ΔV", cols("1.2fr", ".8fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Travail des forces pressantes</h3><p style="margin:0 0 8px">Quand un gaz subit une transformation sous une pression extérieure <b>constante</b> $P$, et que son volume passe de $V_i$ à $V_f$, le travail des forces pressantes reçu par le gaz est :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$W = −P·(V_f − V_i) = −P·ΔV$</span></div>
        <p style="margin:8px 0 0">$W$ en <b>joules (J)</b>, $P$ en <b>pascals (Pa)</b>, $V$ en <b>$\u{m^3}$</b>.<br>Compression ($ΔV < 0$) : <b>$W > 0$</b>, le gaz <b>reçoit</b> du travail. Détente ($ΔV > 0$) : <b>$W < 0$</b>, le gaz <b>cède</b> du travail. Isochore ($ΔV = 0$) : <b>$W = 0$</b>.</p></div>
    </div>""", "    " + fig("cylindre"))))

S.append(slide("application", "Application", "Un gaz chauffé qui se détend", *P2, "Application · détente", cols("1.15fr", ".85fr",
    "    <div class=\"stack\">\n      " + card(r"$V_1 = 2,5~\u{L}$ de gaz parfait sous $P = 1,0×10^5~\u{Pa}$ (constante) ; chauffé jusqu’à $V_2 = 4,0~\u{L}$.", "small") + "\n" +
    qlist(q(1, r"Convertir $V_1$ et $V_2$ en $\u{m^3}$.", r"$V_1 = 2,5×10^{−3}~\u{m^3}$ ; $V_2 = 4,0×10^{−3}~\u{m^3}$"),
          q(2, "Calculer $W$. Le gaz a-t-il reçu ou cédé du travail ?", r"$W = −1,0×10^5×1,5×10^{−3} = −150~\u{J}$ : détente, le gaz <b>cède</b> $150~\u{J}$.")) + "\n    </div>",
    "    " + fig("cylindre", None, '{"detente":1}'))))

# ================= PARTIE 3 =================
S.append(slide("situation", "Situation de départ", "Partie 3 — Une énergie cachée dans la matière", *P3, "Situation de départ", cols(".95fr", "1.05fr",
    situ(rf"Une bouteille de gaz <b>immobile</b> sur le sol : ${EC} = 0$ et, sol pris comme référence, ${EPP} = 0$ : son énergie mécanique est nulle. Pourtant, ses molécules <b>s’agitent sans cesse</b> et interagissent.",
         ["Quelle énergie la matière possède-t-elle à l’échelle microscopique ?"]),
    "    " + fig("molecules"))))

S.append(slide("activite", "Activité 3", "La matière à l’échelle microscopique", *P3, "Activité 3 · doc 4", cols("1.05fr", ".95fr",
    "    <div class=\"stack center\">\n      " + card(rf"<b>Doc 4.</b> À l’échelle <b>macroscopique</b> : mouvement d’ensemble (vitesse $V$) et position (altitude $z$), énergie mécanique ${EM} = {EC} + {EPP}$. À l’échelle <b>microscopique</b> : <b>agitation thermique</b> des particules, énergie cinétique microscopique ${ECM}$, d’autant plus grande que la température est élevée ; <b>interactions</b> entre particules, énergie potentielle microscopique ${EPM}$, liée à l’état physique et à la structure chimique.", "small") + "\n      " +
    info(rf"La somme des énergies cinétique et potentielle microscopiques de toutes les particules est l’<b>énergie interne</b> $U$ (en J). Elle ne dépend que de l’état du système : c’est une <b>fonction d’état</b>. L’énergie totale ${ET}$ est la somme de l’énergie mécanique et de l’énergie interne.") + "\n    </div>",
    "    " + fig("molecules", doc(4, "Agitation et interactions des molécules")))))

S.append(slide("questions", "Questions", "Activité 3 — L’énergie interne", *P3, "Questions 1 à 4", cols("1.35fr", ".65fr",
    qlist(q(1, "Doc 4 : qu’observe-t-on aux échelles macroscopique et microscopique ? Les deux formes d’énergie microscopique ?",
            rf"Macroscopique : mouvement et position d’ensemble (${EM}$). Microscopique : ${ECM}$ (agitation thermique, liée à la température) et ${EPM}$ (interactions, liée à l’état physique et aux liaisons).", "Distinguer."),
          q(2, "Expression de l’énergie interne $U$ ; unité ?", rf"$U = {ECM} + {EPM}$, en joules", "Écrire."),
          q(3, rf"Expression de ${ET}$ en fonction de ${EC}$, ${EPP}$ et $U$.", rf"${ET} = {EM} + U = {EC} + {EPP} + U$", "Écrire."),
          q(4, rf"Relation entre $Δ{ET}$, $Δ{EM}$ et $ΔU$ ; cas d’un système au repos ?", rf"$Δ{ET} = Δ{EM} + ΔU$ ; au repos ($Δ{EC} = Δ{EPP} = 0$) : $Δ{ET} = ΔU$", "Établir.")),
    "    " + fig("molecules"))))

S.append(slide("retenir", "À retenir", "Énergie interne et énergie totale", *P3, "À retenir · énergie interne", cols("1.2fr", ".8fr",
    rf"""    <div class="stack center">
      <div class="def"><h3>Énergie interne</h3><p style="margin:0 0 8px">L’énergie interne $U$ d’un système est la somme de l’énergie <b>cinétique microscopique</b> (agitation thermique) et de l’énergie <b>potentielle microscopique</b> (interactions) de toutes ses particules :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$U = {ECM} + {EPM}$</span></div>
        <p style="margin:8px 0 0">en <b>joules (J)</b>. $U$ est une <b>fonction d’état</b> : elle ne dépend que de l’état du système.</p></div>
      <div class="def"><h3>Énergie totale</h3>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">${ET} = {EM} + U = {EC} + {EPP} + U$  et  $Δ{ET} = Δ{EM} + ΔU$</span></div>
        <p style="margin:8px 0 0">Pour un système au repos à l’échelle macroscopique ($Δ{EM} = 0$) : <b>$Δ{ET} = ΔU$</b>.</p></div>
    </div>""", "    " + fig("molecules"))))

S.append(slide("application", "Application", "Une bille qui tombe et s’immobilise", *P3, "Application · bille", cols("1.3fr", ".7fr",
    "    <div class=\"stack\">\n      " + card(rf"Bille : $m = 200~\u{{g}}$, lâchée sans vitesse de $h = 5,0~\u{{m}}$ ; elle s’immobilise sur un sol isolant. Toute l’énergie mécanique perdue devient énergie interne de la bille : $Δ{ET} = 0$. $g = 10~\u{{N·kg^{{−1}}}}$ ; référence : le sol.", "small") + "\n" +
    qlist(q(1, rf"Calculer $Δ{EM}$ entre le lâcher et l’immobilisation.", rf"$V_A = V_B = 0$ : $Δ{EM} = m·g·(z_B − z_A) = −0,200×10×5,0 = −10~\u{{J}}$"),
          q(2, "En déduire $ΔU$. Effet observé ?", rf"$Δ{EM} + ΔU = 0$ ⇒ $ΔU = +10~\u{{J}}$ : la température de la bille <b>s’élève</b>.")) + "\n    </div>",
    "    " + fig("billeChute"))))

# ================= PARTIE 4 =================
S.append(slide("situation", "Situation de départ", "Partie 4 — Chauffer de l’eau sans flamme", *P4, "Situation de départ", cols(".9fr", "1.1fr",
    situ("Pour élever la température de l’eau d’un récipient posé sur une table, on peut la <b>chauffer</b> (chaleur $Q$), y faire passer un <b>courant</b> dans une résistance (travail électrique) ou l’<b>agiter</b> avec des palettes (travail mécanique).",
         ["Comment relier la variation de l’énergie interne d’un système au repos au travail et à la chaleur qu’il échange ?"]),
    "    " + fig("joule"))))

S.append(slide("activite", "Activité 4", "L’expérience de Joule", *P4, "Activité 4 · doc 5", cols("1fr", "1fr",
    "    <div class=\"stack center\">\n      " + card(r"<b>Doc 5.</b> Récipient isolé ($Q = 0$) contenant $1,5~\u{kg}$ d’eau, agitée par des palettes entraînées par la chute lente, à vitesse constante, de deux masses de $10~\u{kg}$. Les masses descendent de $h = 1,5~\u{m}$ ; on recommence 20 fois. Le travail du poids des masses est intégralement transmis à l’eau. La température passe de $18,00~\u{°C}$ à $18,94~\u{°C}$ ; $g = 9,8~\u{N·kg^{−1}}$.", "small") + "\n      " +
    info(r"Un corps de masse $m$ qui s’échauffe sans changer d’état voit son énergie interne augmenter de $ΔU = m·c·Δθ$ ($c$ : chaleur massique ; eau : $4185~\u{J·kg^{−1}·°C^{−1}}$).") + "\n    </div>",
    "    " + fig("joule", doc(5, "Expérience de Joule")))))

S.append(slide("activite", "Activité 4", "Les échanges d’énergie et le premier principe", *P4, "Activité 4 · doc 6", cols("1.25fr", ".75fr",
    "    <div class=\"stack center\">\n      " + card(rf"<b>Doc 6.</b> Système fermé au repos ($Δ{EM} = 0$), d’un état initial ($U_1$) à un état final ($U_2$). Échanges avec l’extérieur : le <b>travail</b> $W$ (forces pressantes $−P·ΔV$, agitateur, travail électrique $W_e = U·I·Δt$) et la <b>chaleur</b> $Q$ (conduction, convection, rayonnement). Énergie <b>reçue</b> comptée positivement, énergie <b>cédée</b> négativement.<br>Le <b>premier principe de la thermodynamique</b> : $ΔU = U_2 − U_1 = W + Q$.<br><b>Adiabatique</b> : $Q = 0$. Système <b>isolé</b> : $W = 0$ et $Q = 0$. <b>Cycle</b> : retour à l’état initial.", "small") + "\n    </div>",
    "    " + fig("bilanUWQ", doc(6, "Convention de signe")))))

S.append(slide("questions", "Questions", "Activité 4 — Le premier principe", *P4, "Questions 1 à 3", cols("1.35fr", ".65fr",
    qlist(q(1, "Doc 6 : sous quelles formes un système au repos échange-t-il de l’énergie ? Convention de signe ?", "Travail $W$ (forces pressantes, agitateur, électrique) et chaleur $Q$ (conduction, convection, rayonnement). Reçue : $> 0$ ; cédée : $< 0$.", "Inventorier."),
          q(2, "Écrire la relation du premier principe pour un système au repos.", r"$ΔU = U_2 − U_1 = W + Q$", "Écrire."),
          q(3, "Doc 5 : calculer $W$ reçu par l’eau, puis $ΔU$ avec l’information. Comparer.", r"$W = 20×20×9,8×1,5 = 5880~\u{J}$ ; $ΔU = 1,5×4185×0,94 ≈ 5900~\u{J}$ : $ΔU ≈ W$, avec $Q = 0$ : c’est bien $ΔU = W + Q$.", "Vérifier.")),
    "    " + fig("joule"))))

S.append(slide("questions", "Questions", "Activité 4 — Cycles et cas particuliers", *P4, "Questions 4 et 5", cols("1.3fr", ".7fr",
    qlist(q(4, "$U$ étant une fonction d’état, de quoi dépend $ΔU$ ? Que vaut $ΔU$ sur un cycle ? Conséquence pour $W$ et $Q$ ?", r"$ΔU$ ne dépend que des états <b>initial et final</b>. Cycle : $ΔU = 0$ ⇒ $W + Q = 0$, soit $W = −Q$.", "Déduire."),
          q(5, "Premier principe pour une transformation adiabatique, puis pour un système isolé.", r"Adiabatique ($Q = 0$) : $ΔU = W$. Isolé ($W = Q = 0$) : $ΔU = 0$, l’énergie interne se conserve.", "Simplifier.")),
    "    " + fig("bilanUWQ"))))

S.append(slide("retenir", "À retenir", "Le premier principe de la thermodynamique", *P4, "À retenir · ΔU = W + Q", cols("1.2fr", ".8fr",
    rf"""    <div class="stack center">
      <div class="def"><h3>Premier principe de la thermodynamique</h3><p style="margin:0 0 8px">Pour un système fermé au repos à l’échelle macroscopique, qui passe d’un état initial à un état final, la variation de son énergie interne est égale à la <b>somme du travail et de la chaleur échangés avec le milieu extérieur</b> :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$ΔU = U_f − U_i = W + Q$</span></div>
        <p style="margin:8px 0 0">Énergie reçue : <b>positive</b> ; énergie cédée : <b>négative</b>.</p></div>
      <div class="def"><h3>Propriétés</h3><p style="margin:0">$ΔU$ ne dépend que de l’<b>état initial</b> et de l’<b>état final</b> ($U$ est une fonction d’état). Cycle : <b>$ΔU = 0$</b>, donc $W + Q = 0$. Transformation adiabatique : <b>$ΔU = W$</b>. Système isolé : <b>$ΔU = 0$</b>. Si l’énergie mécanique varie : <b>$Δ{ET} = Δ{EM} + ΔU = W + Q$</b>.</p></div>
    </div>""", "    " + fig("bilanUWQ"))))

S.append(slide("methode", "Méthode", "Appliquer le premier principe", *P4, "Méthode", cols("1.3fr", ".7fr",
    r"""    <div class="method"><h3>Méthode : appliquer le premier principe</h3>
      <ol class="steps"><li>Définir le <b>système</b> et vérifier qu’il est au repos à l’échelle macroscopique.</li><li>Faire la liste des <b>échanges</b> : travaux (forces pressantes $−P·ΔV$, électrique $U·I·Δt$, mécanique) et chaleur.</li><li>Donner à chacun son <b>signe</b> : positif s’il est reçu, négatif s’il est cédé.</li><li>Écrire $ΔU = W + Q$ (adiabatique : $Q = 0$ ; isochore : $W_{\u{pressantes}} = 0$ ; cycle : $ΔU = 0$) et conclure.</li></ol></div>""",
    "    " + fig("bilanUWQ"))))

S.append(slide("application", "Application", "Un gaz comprimé qui se refroidit", *P4, "Application · premier principe", cols("1.3fr", ".7fr",
    "    <div class=\"stack\">\n      " + card(r"Un gaz est comprimé : les forces pressantes effectuent sur lui un travail $|W| = 450~\u{J}$ ; en même temps, il cède à l’extérieur une chaleur $|Q| = 180~\u{J}$.", "small") + "\n" +
    qlist(q(1, "Signes de $W$ et de $Q$ ?", r"Compression : $W = +450~\u{J}$ (reçu) ; chaleur cédée : $Q = −180~\u{J}$"),
          q(2, "Calculer $ΔU$. L’énergie interne a-t-elle augmenté ?", r"$ΔU = W + Q = 450 − 180 = +270~\u{J}$ : elle a <b>augmenté</b>.")) + "\n    </div>",
    "    " + fig("cylindre"))))

# ================= EXERCICES =================
S.append(slide("quiz", "Vrai ou faux ?", "Je vérifie mes connaissances", *EX, "Vrai ou faux ?", ("", "",
    '    <div class="vflist">\n      ' + "\n      ".join([
        vf("a", "faux", "Un système qui reçoit un travail voit toujours sa vitesse augmenter.", "Faux : il peut aussi s’échauffer, se déformer, changer d’état ou se transformer chimiquement."),
        vf("b", "vrai", "Lors d’une compression, le travail des forces pressantes reçu par le gaz est positif.", r"Vrai : $ΔV < 0$, donc $W = −P·ΔV > 0$."),
        vf("c", "faux", "L’énergie interne d’un système immobile est nulle.", "Faux : c’est son énergie mécanique qui est nulle ; ses particules ont une énergie microscopique."),
        vf("d", "vrai", "Au cours d’une transformation isochore, le travail des forces pressantes est nul.", r"Vrai : $ΔV = 0$."),
        vf("e", "vrai", "Au cours d’un cycle, la variation de l’énergie interne est nulle.", "Vrai : l’état final est l’état initial."),
        vf("f", "faux", "Au cours d’une transformation adiabatique, l’énergie interne ne varie pas.", r"Faux : $ΔU = W$, qui n’est pas nul en général.")]) + "\n    </div>")))

S.append(slide("exercice", "Exercice 1", "Compression isobare d’un gaz parfait", *EX, "Exercice 1 · énoncé", cols("1.3fr", ".7fr",
    "    <div class=\"stack\">\n      " + card(r"Cylindre horizontal de section $S = 50~\u{cm^2}$, piston sans frottement. Gaz : $V_1 = 3,0~\u{L}$ sous $P = 2,0~\u{bar}$ (constante), à $27~\u{°C}$. On le refroidit lentement jusqu’à $V_2 = 1,8~\u{L}$ ; il cède une chaleur $|Q| = 600~\u{J}$.", "small") +
    r'''
      <ol class="exlist small"><li>Calculer $F$ et la distance $ℓ$ parcourue par le piston.</li><li>Calculer $W$ et justifier son signe.</li><li>Calculer $ΔU$ (premier principe).</li></ol>
    </div>''', "    " + fig("cylindre"))))

S.append(slide("exercice", "Correction", "Exercice 1 — Compression isobare", *EX, "Exercice 1 · correction", ("", "",
    qlist(q(1, '<span class="kw">Force et déplacement</span>', r"$F = P·S = 2,0×10^5×5,0×10^{−3} = 1000~\u{N}$ ; $ℓ = \frac{|ΔV|}{S} = \frac{1,2×10^{−3}}{5,0×10^{−3}} = 0,24~\u{m}$"),
          q(2, '<span class="kw">Travail</span>', r"$W = −P·(V_2 − V_1) = −2,0×10^5×(−1,2×10^{−3}) = +240~\u{J}$ : compression, le gaz reçoit du travail."),
          q(3, '<span class="kw">Premier principe</span>', r"$Q = −600~\u{J}$ ; $ΔU = W + Q = 240 − 600 = −360~\u{J}$")))))

S.append(slide("exercice", "Exercice 2", "Un cycle de trois transformations", *EX, "Exercice 2 · énoncé", cols("1.2fr", ".8fr",
    "    <div class=\"stack\">\n      " + card(r"$A→B$ : compression adiabatique, $W_{AB} = +350~\u{J}$. $B→C$ : refroidissement isochore, $ΔU_{BC} = −550~\u{J}$. $C→A$ : détente isobare sous $P = 1,5×10^5~\u{Pa}$, de $V_C = 2,0~\u{L}$ à $V_A = 4,0~\u{L}$.", "small") +
    r'''
      <ol class="exlist small"><li>Déterminer $ΔU_{AB}$.</li><li>Justifier $W_{BC} = 0$ ; en déduire $Q_{BC}$.</li><li>Calculer $W_{CA}$.</li><li>Sur le cycle : calculer $ΔU_{CA}$, puis $Q_{CA}$.</li></ol>
    </div>''', "    " + fig("cycle"))))

S.append(slide("exercice", "Correction", "Exercice 2 — Le cycle", *EX, "Exercice 2 · correction", cols("1.35fr", ".65fr",
    qlist(q(1, '<span class="kw">A → B</span>', r"$ΔU_{AB} = W_{AB} + Q_{AB} = +350~\u{J}$"),
          q(2, '<span class="kw">B → C</span>', r"$ΔV = 0$ ⇒ $W_{BC} = 0$ ; $Q_{BC} = ΔU_{BC} = −550~\u{J}$"),
          q(3, '<span class="kw">C → A</span>', r"$W_{CA} = −1,5×10^5×2,0×10^{−3} = −300~\u{J}$"),
          q(4, '<span class="kw">Cycle</span>', r"$ΔU_{CA} = −(350 − 550) = +200~\u{J}$ ; $Q_{CA} = ΔU_{CA} − W_{CA} = 200 + 300 = +500~\u{J}$")),
    "    " + fig("cycle"))))

S.append(slide("exercice", "Exercice 3", "Travail électrique et travail mécanique", *EX, "Exercice 3 · énoncé", ("", "",
    "    " + card(r"Calorimètre isolé contenant de l’huile, une résistance et un dispositif à ressort. Système au repos, capacité thermique $C_{\u{tot}} = 800~\u{J·°C^{−1}}$ : $ΔU = C_{\u{tot}}·Δθ$.", "small") + "\n" +
    r'''    <ol class="exlist small"><li>Travail électrique $W_e$ : $I = 2,5~\u{A}$, $U_{AB} = 24~\u{V}$, $Δt = 4~\u{min}$.</li><li>Travail mécanique $W_m$ : dix compressions du ressort ($k = 500~\u{N·m^{−1}}$) de $0$ à $8,0~\u{cm}$, l’énergie de chaque détente étant dissipée dans l’huile.</li><li>Calculer $ΔU$, puis l’élévation de température $Δθ$.</li></ol>''')))

S.append(slide("exercice", "Correction", "Exercice 3 — Travail électrique et mécanique", *EX, "Exercice 3 · correction", ("", "",
    qlist(q(1, '<span class="kw">Travail électrique</span>', r"$W_e = U_{AB}·I·Δt = 24×2,5×240 = 14400~\u{J}$"),
          q(2, '<span class="kw">Travail mécanique</span>', r"$W_m = 10×\frac{1}{2}k·x_f^2 = 10×\frac{1}{2}×500×0,080^2 = 16~\u{J}$"),
          q(3, '<span class="kw">Premier principe</span>', r"$Q = 0$ : $ΔU = W_e + W_m = 14416~\u{J}$ ; $Δθ = \frac{ΔU}{C_{\u{tot}}} = \frac{14416}{800} ≈ 18,0~\u{°C}$")))))

S.append(slide("bilan", "L’essentiel", "Ce qu’il faut retenir du chapitre", "Bilan", "Exercices et bilan", "L’essentiel du chapitre", ("", "",
    rf'''    <div class="bilan">
      <div class="bil"><h3>Effets du travail</h3><p>élévation de température, déformation élastique, changement d’état, transformation chimique</p></div>
      <div class="bil"><h3>Ressort</h3><span class="eq-wrap">$W = \frac{{1}}{{2}}k·x_2^2 − \frac{{1}}{{2}}k·x_1^2$</span><p>aire sous la courbe $F = k·x$</p></div>
      <div class="bil"><h3>Forces pressantes</h3><span class="eq-wrap">$W = −P·ΔV$</span><p>compression : $W > 0$ ; détente : $W < 0$</p></div>
      <div class="bil"><h3>Énergie interne</h3><span class="eq-wrap">$U = {ECM} + {EPM}$</span><p>fonction d’état ; ${ET} = {EM} + U$</p></div>
      <div class="bil"><h3>Premier principe</h3><span class="eq-wrap">$ΔU = W + Q$</span><p>énergie reçue positive, cédée négative</p></div>
      <div class="bil"><h3>Cas particuliers</h3><p>cycle : $ΔU = 0$ ; adiabatique : $ΔU = W$ ; isolé : $ΔU = 0$</p></div>
    </div>''')))

(SRC / "slides.html").write_text("\n".join(S))
print(len(S), "diapositives")
