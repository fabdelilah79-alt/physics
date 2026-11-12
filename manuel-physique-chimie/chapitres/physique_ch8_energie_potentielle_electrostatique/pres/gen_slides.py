"""Écrit src/slides.html (physique, chapitre 8 : L’énergie potentielle électrostatique — sciences mathématiques).
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



P1 = ("Partie 1", "Partie 1 · Électrisation, loi de Coulomb")
P2 = ("Partie 2", "Partie 2 · Champ électrostatique")
P3 = ("Partie 3", "Partie 3 · Travail et potentiel")
P4 = ("Partie 4", "Partie 4 · Énergie potentielle électrostatique")
EX = ("Exercices", "Exercices et bilan")
S = []
K = r"9×10^9~\u{N·m^2·C^{−2}}"

def info(html, title="Information."):
    return f'<div class="card small" style="border:1.5px solid #0e8f8a66"><p style="margin:0"><b>{title}</b> {html}</p></div>'

def stack(*items, cls="stack center"):
    return f'    <div class="{cls}">\n      ' + "\n      ".join(items) + "\n    </div>"

T_D6 = mtab([("$q_i$ (nC)", ["+2,0", "+5,0", "−4,0"]), ("$F_i$ (N)", ["1,0×10<sup>−5</sup>", "2,5×10<sup>−5</sup>", "2,0×10<sup>−5</sup>"]), (r"sens de $\vec{F}_i$", [r"$\vec{u}$", r"$\vec{u}$", r"$−\vec{u}$"])])

# ================= TITRE =================
S.append('''<section class="slide s-title" data-kind="titre" data-group="Début" data-menu="Titre du chapitre">
  <div class="fig-full fig bare" data-scene="titre"></div>
  <div class="title-block">
    <div class="eyebrow">PHYSIQUE · ÉLECTRICITÉ</div>
    <div class="chapter">Chapitre 8</div>
    <h1>L’énergie potentielle électrostatique</h1>
    <div class="plan">
      <span><b>1</b>Électrisation et loi de Coulomb</span>
      <span><b>2</b>Le champ électrostatique</span>
      <span><b>3</b>Travail de la force électrostatique et potentiel</span>
      <span><b>4</b>Énergie potentielle électrostatique</span>
    </div>
    <div class="hint">Appuyez sur → (ou cliquez sur la flèche en bas à droite) pour avancer · F : plein écran</div>
  </div>
</section>
''')

# ================= PARTIE 1 =================
S.append(slide("situation", "Situation de départ", "Partie 1 — Comment un corps s’électrise-t-il ?", *P1, "Situation de départ", cols(".85fr", "1.15fr",
    situ("Une règle en plastique frottée avec un tissu de laine attire à distance de petits morceaux de papier ; par temps sec, on ressent parfois une petite décharge en touchant une poignée métallique.",
         ["Que gagne un corps frotté ?", "Comment l’expliquer à l’échelle de l’atome ?", "Quelle force s’exerce entre deux corps chargés ?"]),
    "    " + fig("frottement"))))

S.append(slide("activite", "Activité 1", "Électrisation par frottement : deux sortes de charges", *P1, "Activité 1 · docs 1 et 2", rows(
    "    " + card("<b>Doc 1.</b> Une règle en plastique frottée avec la laine attire de petits morceaux de papier ; non frottée, elle ne les attire pas. <b>Doc 2.</b> Un bâton frotté, suspendu par un étrier, peut tourner ; on approche de l’une de ses extrémités un second bâton frotté (verre frotté avec la soie, ébonite avec une fourrure).", "small"),
    [fig("frottement", doc(1, "Règle frottée")), fig("batons", doc(2, "Vues de face et de dessus · verre-verre et ébonite-ébonite : répulsion · verre-ébonite : attraction"))], ".8fr 1.2fr")))

S.append(slide("activite", "Activité 1", "Électrisation par contact et par influence", *P1, "Activité 1 · doc 3 et information 1", cols(".95fr", "1.05fr",
    stack(card("<b>Doc 3.</b> Pendule électrostatique : boule légère et conductrice suspendue à un fil isolant. (a) L’ébonite chargée <b>touche</b> la boule neutre : la boule est repoussée. (b) Le verre chargé est <b>approché sans contact</b> : la boule neutre est attirée.", "small"),
          info(r"La matière est formée d’atomes neutres : noyau positif (protons), électrons négatifs. Lors d’une électrisation, <b>seuls des électrons se déplacent</b> : perte d’électrons ⇒ charge positive ; gain ⇒ charge négative. Dans un métal, des électrons <b>libres</b> peuvent se déplacer. Convention : verre frotté <b>positif</b>, ébonite frottée <b>négative</b>. $q = ±n·e$ avec $e = 1,6×10^{−19}~\u{C}$.", "Information 1.")),
    "    " + fig("pendule", doc(3, "Contact (a) et influence (b)")))))

S.append(slide("activite", "Activité 1", "La loi de Coulomb", *P1, "Activité 1 · doc 4", cols("1.15fr", ".85fr",
    stack(card(r"<b>Doc 4. Loi de Coulomb (1785).</b> Deux corps ponctuels $A$ et $B$, de charges $q_A$ et $q_B$, immobiles dans le vide à la distance $d = AB$, exercent l’un sur l’autre deux forces $\vec{F}_{A/B}$ (exercée par $A$ sur $B$) et $\vec{F}_{B/A}$ :<br>• portées par la droite $(AB)$, de sens opposés : $\vec{F}_{A/B} = −\vec{F}_{B/A}$ ;<br>• de même intensité $F = K·\frac{|q_A|·|q_B|}{AB^2}$, avec $K = \frac{1}{4πε_0} = " + K + r"$ ;<br>• attractives ou répulsives selon le signe des charges (doc 2).")),
    "    " + fig("coulomb", doc(4, "Deux charges ponctuelles"), '{"forces":false,"mode":"meme"}'))))

S.append(slide("questions", "Questions", "Activité 1 — Charges et électrisation", *P1, "Questions 1 et 2", cols("1.3fr", ".7fr",
    qlist(q(1, "Doc 1 : que gagne la règle frottée ? Doc 2 : montrer qu’il existe deux sortes de charges ; énoncer la règle d’attraction et de répulsion.",
            "La règle frottée attire des corps légers : elle est <b>électrisée</b>. Verre-verre et ébonite-ébonite se repoussent, verre-ébonite s’attirent : <b>deux sortes</b> de charges (positives, négatives). Même signe : <b>répulsion</b> ; signes contraires : <b>attraction</b>.", "Exploiter."),
          q(2, "Interpréter le frottement du verre, le contact (3a) et l’influence (3b) : pourquoi la boule reste-t-elle neutre et pourquoi est-elle attirée ?",
            r"Frottement : le verre <b>cède des électrons</b> à la soie (il devient positif). Contact : l’ébonite cède des électrons à la boule, qui devient négative et est repoussée. Influence : les électrons libres migrent vers la face proche du verre ; aucun électron n’entre ni ne sort, la boule reste <b>neutre</b>. Les charges négatives sont plus proches : l’attraction (en $1/d^2$) l’emporte.", "Interpréter.")),
    "    " + fig("pendule"))))

S.append(slide("questions", "Questions", "Activité 1 — Les forces de Coulomb", *P1, "Questions 3 et 4", cols("1.2fr", ".8fr",
    qlist(q(3, r"Caractéristiques de $\vec{F}_{A/B}$ et $\vec{F}_{B/A}$ ; unités.",
            r"$\vec{F}_{A/B}$ appliquée en $B$, $\vec{F}_{B/A}$ en $A$ ; droite d’action $(AB)$ ; sens opposés ; même intensité $F = K·\frac{|q_A|·|q_B|}{AB^2}$ : $F$ en N, $q$ en C, $AB$ en m.", "Préciser."),
          q(4, r"Représenter les deux forces si $q_A·q_B > 0$, puis si $q_A·q_B < 0$.",
            r"$q_A·q_B > 0$ : <b>répulsion</b>, vecteurs dirigés vers l’extérieur de $[AB]$. $q_A·q_B < 0$ : <b>attraction</b>, vecteurs dirigés l’un vers l’autre (figure).", "Représenter.")),
    "    " + fig("coulomb"))))

S.append(slide("retenir", "À retenir", "Électrisation", *P1, "À retenir · électrisation", cols("1.25fr", ".75fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Électrisation</h3><p style="margin:0">Un corps peut s’électriser par <b>frottement</b>, par <b>contact</b> ou par <b>influence</b>. Toute électrisation d’un solide résulte d’un transfert ou d’un déplacement d’<b>électrons</b>. Il existe deux sortes de charges : deux charges de même signe se <b>repoussent</b>, deux charges de signes contraires s’<b>attirent</b>. Une charge est un multiple de $e = 1,6×10^{−19}~\u{C}$.</p></div>
    </div>""", "    " + fig("pendule"))))

S.append(slide("retenir", "À retenir", "Loi de Coulomb", *P1, "À retenir · loi de Coulomb", cols("1.1fr", ".9fr",
    rf"""    <div class="stack center">
      <div class="def"><h3>Loi de Coulomb</h3><p style="margin:0 0 8px">Deux charges ponctuelles $q_A$ et $q_B$, immobiles dans le vide à la distance $AB$, exercent l’une sur l’autre deux forces portées par $(AB)$, opposées ($\vec{{F}}_{{A/B}} = −\vec{{F}}_{{B/A}}$), d’intensité :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$F = K·\frac{{|q_A|·|q_B|}}{{AB^2}}$</span></div>
        <p style="margin:8px 0 0">avec $K = \frac{{1}}{{4πε_0}} = {K}$.</p></div>
    </div>""", "    " + fig("coulomb"))))

S.append(slide("application", "Application", "L’atome d’hydrogène", *P1, "Application · atome d’hydrogène", cols("1.35fr", ".65fr",
    stack(card(r"Électron ($q_e = −e$, $m_e = 9,1×10^{−31}~\u{kg}$) à $d = 0,53×10^{−10}~\u{m}$ du proton ($q_p = +e$, $m_p = 1,7×10^{−27}~\u{kg}$) ; $e = 1,6×10^{−19}~\u{C}$ ; $K = " + K + r"$ ; $G = 6,7×10^{−11}~\u{N·m^2·kg^{−2}}$.", "small"),
          qlist(q(1, "Calculer $F_e$ et $F_G$.", r"$F_e = K·\frac{e^2}{d^2} ≈ 8,2×10^{−8}~\u{N}$ ; $F_G = G·\frac{m_p·m_e}{d^2} ≈ 3,7×10^{−47}~\u{N}$"),
                q(2, r"Calculer $\frac{F_e}{F_G}$ et conclure.", r"$\frac{F_e}{F_G} ≈ 2,2×10^{39}$ : à l’échelle de l’atome, la gravitation est <b>négligeable</b> devant l’interaction électrostatique.")), cls="stack"),
    "    " + fig("hydrogene"))))

# ================= PARTIE 2 =================
S.append(slide("situation", "Situation de départ", "Partie 2 — Une propriété de l’espace", *P2, "Situation de départ", cols(".85fr", "1.15fr",
    situ("Une charge électrique agit à distance, sans contact, sur toute autre charge placée dans son voisinage : elle crée autour d’elle un <i>champ électrostatique</i>.",
         ["Comment caractériser ce champ en un point ?", "Comment le calculer pour une charge ponctuelle ?", "Comment visualiser sa forme dans l’espace ?"]),
    "    " + fig("sphere"))))

S.append(slide("activite", "Activité 2", "Des pendules déviés, des charges témoins", *P2, "Activité 2 · docs 5 et 6", cols("1fr", "1fr",
    stack(card("<b>Doc 5.</b> Sphère chargée positivement sur un pied isolant ; des pendules chargés positivement, placés à sa hauteur, sont déviés en s’éloignant d’elle, d’autant plus qu’ils en sont proches.", "small"),
          card(r"<b>Doc 6.</b> Charge source $q = +50~\u{nC}$ en $A$ ; charges témoins $q_i$ placées au point $P$ ($r = AP = 30~\u{cm}$) ; $\vec{u}$ unitaire de $A$ vers $P$. En $P'$ ($AP' = 60~\u{cm}$), $q_1 = +2,0~\u{nC}$ subit $2,5×10^{−6}~\u{N}$.", "small"), T_D6),
    stack('<div class="fig" data-scene="sphere" style="height:340px"><div class="cap">' + doc(5, "Pendules déviés à distance") + '</div></div>', '<div class="fig" data-scene="champTest" style="height:250px"><div class="cap">' + doc(6, "Charge source et charges témoins") + '</div></div>', cls="stack"))))

S.append(slide("activite", "Activité 2", "Vecteur champ, spectres électrostatiques", *P2, "Activité 2 · information 2, doc 7", rows(
    "    " + info(r"Il règne un champ électrostatique en un point si une charge $q$ placée en ce point subit une force $\vec{F}$. Le <b>vecteur champ</b> est défini par $\vec{F} = q·\vec{E}$ ; $E$ en $\u{N·C^{−1}}$ ou $\u{V·m^{−1}}$. Plusieurs charges : la force totale est la <b>somme vectorielle</b> des forces. <b>Doc 7.</b> Grains de semoule sur l’huile, électrodes reliées à une haute tension : les grains dessinent les <b>lignes de champ</b> (pour une seule pointe, l’autre borne est reliée à un anneau contre la paroi), tangentes en chaque point à $\vec{E}$, orientées dans le sens de $\vec{E}$. <b>Information 3.</b> Champ <b>uniforme</b> : $\vec{E}$ a même direction, même sens et même intensité en tout point ; lignes de champ parallèles.", "Information 2."),
    [fig("spectres", doc(7, "Spectres électrostatiques (vue de dessus)"))], "1fr")))

S.append(slide("questions", "Questions", "Activité 2 — Le champ en un point", *P2, "Questions 1 et 2", cols("1.3fr", ".7fr",
    qlist(q(1, "Doc 5 : qu’est-ce qui montre que l’espace autour de la sphère possède une propriété particulière ? Variation avec la distance ?",
            "Les boules chargées sont déviées <b>sans contact</b> : il règne un <b>champ électrostatique</b>. Les plus proches sont les plus déviées : l’effet <b>diminue avec la distance</b> ; déviation suivant la droite passant par le centre de la sphère.", "Observer."),
          q(2, r"Doc 6 : calculer $\frac{F_i}{|q_i|}$. Dépend-il de $q_i$ ? Caractéristiques de $\vec{E}$ en $P$ ; sens de $\vec{F}$ et $\vec{E}$ selon le signe de $q_i$.",
            r"$\frac{1,0×10^{−5}}{2,0×10^{−9}} = \frac{2,5×10^{−5}}{5,0×10^{−9}} = \frac{2,0×10^{−5}}{4,0×10^{−9}} = 5,0×10^3~\u{N·C^{−1}}$ : indépendant de $q_i$. $\vec{E}$ porté par $(AP)$, sens de $\vec{u}$, $E = 5,0×10^3~\u{N·C^{−1}}$. $q > 0$ : même sens ; $q < 0$ : sens contraires.", "Calculer.")),
    stack(fig("champTest"), cls="stack"))))

S.append(slide("questions", "Questions", "Activité 2 — Charge ponctuelle et superposition", *P2, "Questions 3 et 4", cols("1.35fr", ".65fr",
    qlist(q(3, r"Avec la loi de Coulomb, établir $\vec{E}$ créé par $q$ à la distance $r$ ; vérifier en $P$ et $P'$. Sens si $q > 0$ ? si $q < 0$ ?",
            r"$\vec{F}_i = K·\frac{q·q_i}{r^2}\vec{u} = q_i·\vec{E}$ ⇒ $\vec{E} = K·\frac{q}{r^2}\vec{u}$, $E = K·\frac{|q|}{r^2}$. En $P$ : $\frac{9×10^9×50×10^{−9}}{0,30^2} = 5,0×10^3~\u{N·C^{−1}}$ ; en $P'$ : $1,25×10^3~\u{N·C^{−1}} = \frac{E}{4}$. $q > 0$ : <b>centrifuge</b> ; $q < 0$ : <b>centripète</b>.", "Établir."),
          q(4, r"Exprimer $\vec{E}(M)$ créé par plusieurs charges.",
            r"$\vec{F} = Σ\vec{F}_i = q·Σ\vec{E}_i$ ⇒ $\vec{E}(M) = \vec{E}_1(M) + \vec{E}_2(M) + … $ : <b>principe de superposition</b>.", "Déduire.")),
    "    " + fig("champTest"))))

S.append(slide("questions", "Questions", "Activité 2 — Lignes de champ", *P2, "Question 5", rows(
    qlist(q(5, "Doc 7 : décrire les lignes de champ en (a), (b), (c). D’où partent-elles ? Justifier que le champ est uniforme entre les plaques ; son sens ?",
            "(a) demi-droites <b>radiales</b> ; (b) courbes allant d’une électrode à l’autre ; (c) entre les plaques, droites <b>parallèles</b>, perpendiculaires aux plaques. Les lignes partent des charges positives et aboutissent aux charges négatives. Entre les plaques, $\vec{E}$ garde direction, sens et intensité : champ <b>uniforme</b>, de la plaque <b>positive</b> vers la plaque <b>négative</b>.", "Décrire.")),
    [fig("spectres")], "1fr")))

S.append(slide("retenir", "À retenir", "Vecteur champ électrostatique", *P2, "À retenir · F = q·E", cols("1fr", "1fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Vecteur champ électrostatique</h3><p style="margin:0 0 8px">Une charge $q$ placée en un point où règne un champ $\vec{E}$ subit la force :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$\vec{F} = q·\vec{E}$</span> &nbsp; soit $F = |q|·E$</div>
        <p style="margin:8px 0 0">$E$ en <b>$\u{N·C^{−1}}$ ou $\u{V·m^{−1}}$</b>. Si $q > 0$, $\vec{F}$ et $\vec{E}$ ont le <b>même sens</b> ; si $q < 0$, ils sont de <b>sens contraires</b>.</p></div>
    </div>""", r"""    <div class="stack center">
      <div class="def"><h3>Champ créé par une charge ponctuelle</h3><p style="margin:0 0 8px">À la distance $r$ d’une charge $q$ ($\vec{u}$ unitaire, dirigé de la charge vers le point) :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$\vec{E} = K·\frac{q}{r^2}\vec{u}$</span> &nbsp; $E = K·\frac{|q|}{r^2}$</div>
        <p style="margin:8px 0 0">Champ <b>centrifuge</b> si $q > 0$, <b>centripète</b> si $q < 0$.</p></div>
    </div>""")))

S.append(slide("retenir", "À retenir", "Superposition, lignes de champ, champ uniforme", *P2, "À retenir · lignes de champ", rows(
    r"""    <div class="def"><h3>Superposition, lignes de champ, champ uniforme</h3><p style="margin:0">Plusieurs charges : <b>$\vec{E}(M) = Σ\vec{E}_i(M)$</b>. Une ligne de champ est <b>tangente</b> en chacun de ses points au vecteur $\vec{E}$ ; elle est orientée dans le sens de $\vec{E}$, des charges <b>positives</b> vers les charges <b>négatives</b>. Entre deux plaques métalliques planes et parallèles soumises à une tension continue, le champ est <b>uniforme</b> : perpendiculaire aux plaques, dirigé de la plaque <b>positive</b> vers la plaque <b>négative</b>.</p></div>""",
    [fig("lignes")], "1fr")))

S.append(slide("methode", "Méthode", "Déterminer le champ créé par plusieurs charges", *P2, "Méthode", cols("1.25fr", ".75fr",
    r"""    <div class="method"><h3>Méthode : déterminer le champ créé par plusieurs charges</h3>
      <ol class="steps"><li>Représenter au point $M$ le champ $\vec{E}_i$ de chaque charge : sur la droite (charge, $M$), <b>fuyant</b> la charge si elle est positive, <b>vers</b> la charge si elle est négative.</li><li>Calculer chaque intensité $E_i = K·\frac{|q_i|}{r_i^2}$ (distances en mètres).</li><li>Additionner les vecteurs : directement s’ils sont colinéaires, sinon par projection sur deux axes (ou avec les propriétés de la figure : diagonale d’un carré, triangle équilatéral…).</li><li>Donner les caractéristiques du champ résultant : direction, sens, intensité.</li></ol></div>""",
    "    " + fig("champO", None, '{"final":1}'))))

S.append(slide("application", "Application", "Le champ au milieu de deux charges opposées", *P2, "Application · champ en O", rows(
    "    " + card(r"$q_A = +2,0~\u{µC}$ en $A$, $q_B = −2,0~\u{µC}$ en $B$ ; $AB = 2a = 10~\u{cm}$ ; $K = " + K + r"$.", "small") + "\n" +
    qlist(q(1, r"Représenter $\vec{E}_A$ et $\vec{E}_B$ en $O$, milieu de $[AB]$.", r"$q_A > 0$ : $\vec{E}_A$ fuit $A$ (de $A$ vers $B$) ; $q_B < 0$ : $\vec{E}_B$ dirigé vers $B$. Même direction, même sens, même intensité."),
          q(2, r"Caractéristiques de $\vec{E}(O)$.", r"$E(O) = \frac{2K·|q_A|}{a^2} = \frac{2×9×10^9×2,0×10^{−6}}{0,050^2} = 1,44×10^7~\u{V·m^{−1}}$, porté par $(AB)$, de $A$ vers $B$.")),
    [fig("champO", None, '{"final":1}')], "1fr")))

# ================= PARTIE 3 =================
S.append(slide("situation", "Situation de départ", "Partie 3 — Le travail de la force électrostatique", *P3, "Situation de départ", cols(".85fr", "1.15fr",
    situ(r"Le travail du poids ne dépend que de la différence d’altitude : $W_{A→B}(\vec{P}) = m·g·(z_A − z_B)$. Une particule chargée entre deux plaques chargées subit, elle aussi, une force constante.",
         ["Comment calculer le travail de la force électrostatique ?", "Quelle grandeur électrique joue le rôle de l’altitude ?"]),
    "    " + fig("condensateur"))))

S.append(slide("activite", "Activité 3", "Une boule chargée entre deux plaques", *P3, "Activité 3 · doc 8, rappel, information 4", cols("1.05fr", ".95fr",
    stack(card(r"<b>Doc 8.</b> Plaques verticales parallèles $N$ et $P$, distantes de $d$ ; $U_{PN} = V_P − V_N > 0$. Champ uniforme $\vec{E}$, perpendiculaire aux plaques, de $P$ vers $N$. Axe $(Ox)$ de $N$ vers $P$ ($O$ sur $N$) : $\vec{E} = −E\vec{i}$. Boule de charge $q > 0$ allant de $A(x_A ; y_A)$ à $B(x_B ; y_B)$ par deux chemins.", "small"),
          info(r"$W_{A→B}(\vec{F}) = \vec{F}·\vec{AB} = F_x·(x_B − x_A) + F_y·(y_B − y_A)$.", "Rappel (chapitre 2)."),
          info(r"<b>Potentiel électrique</b> $V$ (en volts), défini à une constante près. Dans un champ uniforme : $U_{AB} = V_A − V_B = \vec{E}·\vec{AB}$. <b>Surface équipotentielle</b> : points de même potentiel.", "Information 4."), cls="stack"),
    "    " + fig("condensateur", doc(8, "Champ uniforme entre deux plaques")))))

S.append(slide("questions", "Questions", "Activité 3 — Travail et potentiel", *P3, "Questions 1 et 2", cols("1.3fr", ".7fr",
    qlist(q(1, r"Exprimer $W_{A→B}(\vec{F})$ en fonction de $q$, $E$, $x_A$, $x_B$. Dépend-il du chemin ?",
            r"$\vec{F} = −q·E\vec{i}$ : $W_{A→B}(\vec{F}) = −q·E·(x_B − x_A) = q·E·(x_A − x_B)$. Il ne dépend que de $A$ et $B$ : la force électrostatique est <b>conservative</b>.", "Établir."),
          q(2, r"Exprimer $V_A − V_B$, puis $W_{A→B}(\vec{F})$ en fonction de $q$ et de $V_A − V_B$.",
            r"$V_A − V_B = \vec{E}·\vec{AB} = E·x_A − E·x_B$ ; donc $W_{A→B}(\vec{F}) = q·(V_A − V_B) = q·U_{AB}$.", "Exprimer.")),
    "    " + fig("condensateur"))))

S.append(slide("questions", "Questions", "Activité 3 — Potentiels et équipotentielles", *P3, "Questions 3 à 5", cols("1.35fr", ".65fr",
    qlist(q(3, r"Calculer $V_P − V_N$. Quelle plaque a le potentiel le plus élevé ? Sens de $\vec{E}$ et potentiels ?",
            r"$V_P − V_N = E·d > 0$ : $P$ a le potentiel le plus élevé ; $\vec{E}$ va de $P$ vers $N$ : sens des potentiels <b>décroissants</b>.", "Montrer."),
          q(4, r"$C$ de même potentiel que $A$ : montrer $\vec{AC} ⊥ \vec{E}$. Forme des équipotentielles ? Travail sur l’une d’elles ?",
            r"$V_A − V_C = \vec{E}·\vec{AC} = 0$ ⇒ $\vec{AC} ⊥ \vec{E}$ : plans <b>parallèles aux plaques</b>, perpendiculaires aux lignes de champ ; $W = q·(V_A − V_C) = 0$.", "Démontrer."),
          q(5, r"Relation entre $E$, $U_{PN}$ et $d$.", r"$U_{PN} = E·d$ ⇒ $E = \frac{U_{PN}}{d}$ (d’où l’unité $\u{V·m^{−1}}$).", "Établir.")),
    "    " + fig("equipot"))))

S.append(slide("retenir", "À retenir", "Travail de la force électrostatique, potentiel", *P3, "À retenir · W = q(VA − VB)", cols("1.15fr", ".85fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Travail de la force électrostatique</h3><p style="margin:0 0 8px">La force électrostatique est <b>conservative</b> : son travail ne dépend pas du <b>chemin suivi</b>.</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$W_{A→B}(\vec{F}) = q·(V_A − V_B) = q·U_{AB}$</span></div>
        <p style="margin:8px 0 0">(relation admise valable même si le champ n’est pas uniforme)</p></div>
      <div class="def"><h3>Potentiel dans un champ uniforme</h3><p style="margin:0"><b>$V_A − V_B = \vec{E}·\vec{AB}$</b> ; entre deux plaques distantes de $d$ : <b>$E = \frac{U}{d}$</b>. $\vec{E}$ est toujours orienté dans le sens des potentiels <b>décroissants</b>. Les surfaces équipotentielles sont <b>perpendiculaires</b> aux lignes de champ (plans parallèles aux plaques) ; sur une équipotentielle, le travail est <b>nul</b>.</p></div>
    </div>""", "    " + fig("equipot"))))

S.append(slide("application", "Application", "Un électron entre deux plaques", *P3, "Application · électron", ("", "",
    "    " + card(r"Plaques $P$ et $N$ distantes de $d = 10~\u{cm}$ ; champ uniforme $E = 3,0×10^4~\u{V·m^{−1}}$ ; $e = 1,6×10^{−19}~\u{C}$.", "small") + "\n" +
    qlist(q(1, r"Calculer $U_{PN} = V_P − V_N$.", r"$U_{PN} = E·d = 3,0×10^4×0,10 = 3,0×10^3~\u{V}$"),
          q(2, r"Travail $W_{N→P}(\vec{F})$ pour un électron ($q = −e$) de $N$ à $P$ : moteur ou résistant ?", r"$W_{N→P}(\vec{F}) = q·(V_N − V_P) = (−e)(−U_{PN}) = 1,6×10^{−19}×3000 = 4,8×10^{−16}~\u{J} > 0$ : <b>moteur</b>, l’électron est attiré par la plaque positive.")))))

# ================= PARTIE 4 =================
S.append(slide("situation", "Situation de départ", "Partie 4 — L’énergie d’une particule chargée", *P4, "Situation de départ", cols(".85fr", "1.15fr",
    situ("Dans le canon à électrons d’un oscilloscope, des électrons presque immobiles sont accélérés jusqu’à des dizaines de milliers de kilomètres par seconde : ils possèdent une énergie liée à leur position dans le champ.",
         ["Comment définir cette énergie potentielle électrostatique ?", "Comment l’énergie se conserve-t-elle au cours du mouvement ?"]),
    "    " + fig("canon"))))

S.append(slide("activite", "Activité 4", "Le canon à électrons", *P4, "Activité 4 · doc 9, information 5", cols("1fr", "1fr",
    stack(card(r"<b>Doc 9.</b> Dans le vide, la cathode $C$ chauffée émet des électrons de vitesse pratiquement nulle ; $U_{AC} = V_A − V_C > 0$ : ils sont accélérés vers l’anode percée $A$, puis frappent l’écran. Poids ($≈ 9×10^{−30}~\u{N}$) négligeable devant la force électrostatique ($≈ 10^{−14}~\u{N}$) ; pas de frottement.", "small"),
          info(r"<b>Énergie potentielle électrostatique</b> (par analogie avec $E_{\u{pp}} = m·g·z + C$) : $E_{\u{pe}} = q·V + C$, $C$ dépend de la référence ($E_{\u{pe}} = 0$). <b>Théorème de l’énergie cinétique</b> : $ΔE_{\u{C}} = ΣW_{A→B}$. <b>Électron-volt</b> : énergie reçue par une charge $e$ accélérée sous $1~\u{V}$ ; keV, MeV, GeV.", "Information 5."), cls="stack"),
    "    " + fig("canon", doc(9, "Canon à électrons (dans le vide)")))))

S.append(slide("questions", "Questions", "Activité 4 — Énergie potentielle et travail", *P4, "Questions 1 et 2", cols("1.3fr", ".7fr",
    qlist(q(1, r"Unité de $E_{\u{pe}}$ ? Comment déterminer $C$ ? Expression si $E_{\u{pe}} = 0$ là où $V = 0$ ?",
            r"$E_{\u{pe}}$ en <b>joules</b> (C×V = J). $C$ se déduit de la référence : $0 = q×0 + C$ ⇒ $C = 0$ et $E_{\u{pe}} = q·V$.", "Préciser."),
          q(2, r"Exprimer $ΔE_{\u{pe}}$ de $A$ à $B$ et comparer à $W_{A→B}(\vec{F})$.",
            r"$ΔE_{\u{pe}} = q·(V_B − V_A) = −q·(V_A − V_B)$ ⇒ <b>$ΔE_{\u{pe}} = −W_{A→B}(\vec{F})$</b>.", "Démontrer.")),
    "    " + fig("canon"))))

S.append(slide("questions", "Questions", "Activité 4 — Conservation, électron-volt", *P4, "Questions 3 et 4", cols("1.3fr", ".7fr",
    qlist(q(3, r"Théorème de l’énergie cinétique : montrer que $E = E_{\u{C}} + E_{\u{pe}}$ se conserve.",
            r"Seule $\vec{F}$ travaille : $E_{\u{C}}(B) − E_{\u{C}}(A) = W_{A→B}(\vec{F}) = E_{\u{pe}}(A) − E_{\u{pe}}(B)$ ⇒ $E_{\u{C}}(B) + E_{\u{pe}}(B) = E_{\u{C}}(A) + E_{\u{pe}}(A)$ : l’énergie totale est <b>constante</b>.", "Démontrer."),
          q(4, "Valeur de 1 eV en joules ; keV, MeV, GeV. Intérêt ?",
            r"$1~\u{eV} = 1,6×10^{−19}~\u{C}×1~\u{V} = 1,6×10^{−19}~\u{J}$ ; $1~\u{keV} = 1,6×10^{−16}~\u{J}$ ; $1~\u{MeV} = 1,6×10^{−13}~\u{J}$ ; $1~\u{GeV} = 1,6×10^{−10}~\u{J}$. Nombres simples à l’échelle des particules.", "Calculer.")),
    "    " + fig("canon"))))

S.append(slide("retenir", "À retenir", "Énergie potentielle électrostatique", *P4, "À retenir · Epe = q·V + C", cols("1fr", "1fr",
    r"""    <div class="stack center">
      <div class="def"><h3>Énergie potentielle électrostatique</h3><p style="margin:0 0 8px">Une charge $q$ placée en un point de potentiel $V$ possède l’énergie potentielle électrostatique :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$E_{\u{pe}} = q·V + C$</span></div>
        <p style="margin:8px 0 0">($E_{\u{pe}} = q·V$ si $E_{\u{pe}} = 0$ là où $V = 0$) ; $E_{\u{pe}}$ en <b>joules (J)</b>. Entre deux points : <b>$ΔE_{\u{pe}} = q·(V_B − V_A) = −W_{A→B}(\vec{F})$</b>.</p></div>
    </div>""", r"""    <div class="stack center">
      <div class="def"><h3>Conservation de l’énergie totale</h3><p style="margin:0 0 8px">Particule chargée soumise à la seule force électrostatique : $E = E_{\u{C}} + E_{\u{pe}}$ se <b>conserve</b> :</p>
        <div class="big-eq" style="justify-content:center"><span class="boxeq">$\frac{1}{2}m·v_A^2 + q·V_A = \frac{1}{2}m·v_B^2 + q·V_B$</span></div>
        <p style="margin:8px 0 0">soit $ΔE_{\u{C}} = −ΔE_{\u{pe}}$.</p></div>
      <div class="def"><h3>L’électron-volt</h3><p style="margin:0"><b>$1~\u{eV} = 1,6×10^{−19}~\u{J}$</b> ; $1~\u{keV} = 10^3~\u{eV}$ ; $1~\u{MeV} = 10^6~\u{eV}$ ; $1~\u{GeV} = 10^9~\u{eV}$.</p></div>
    </div>""")))

S.append(slide("application", "Application", "Le canon à électrons", *P4, "Application · canon à électrons", cols("1.3fr", ".7fr",
    stack(card(r"$U_{AC} = V_A − V_C = 3000~\u{V}$ ; électrons : $q = −e = −1,6×10^{−19}~\u{C}$, $m_e = 9,1×10^{−31}~\u{kg}$, vitesse nulle à la cathode.", "small"),
          qlist(q(1, r"$ΔE_{\u{pe}}$ entre $C$ et $A$ (eV, J), puis $E_{\u{C}}(A)$.", r"$ΔE_{\u{pe}} = −e·U_{AC} = −3000~\u{eV} = −4,8×10^{−16}~\u{J}$ ; $E_{\u{C}}(A) = −ΔE_{\u{pe}} = 3000~\u{eV} = 4,8×10^{−16}~\u{J}$"),
                q(2, "Vitesse $v_A$ à l’anode.", r"$v_A = \sqrt{\frac{2e·U_{AC}}{m_e}} = \sqrt{\frac{2×4,8×10^{−16}}{9,1×10^{−31}}} ≈ 3,25×10^7~\u{m·s^{−1}}$")), cls="stack"),
    "    " + fig("canon", None, '{"U":"3000 V"}'))))

# ================= EXERCICES =================
S.append(slide("quiz", "Vrai ou faux ?", "Je vérifie mes connaissances", *EX, "Vrai ou faux ?", ("", "",
    '    <div class="vflist">\n      ' + "\n      ".join([
        vf("a", "faux", "Lors d’une électrisation par frottement, des protons passent d’un corps à l’autre.", "Faux : seuls des électrons se déplacent."),
        vf("b", "faux", "Deux corps portant des charges de même signe s’attirent.", "Faux : ils se repoussent."),
        vf("c", "vrai", "Si la distance entre deux charges double, la force de Coulomb est divisée par 4.", r"Vrai : $F$ varie comme $\frac{1}{d^2}$."),
        vf("d", "faux", "Le champ créé par une charge ponctuelle négative est centrifuge.", "Faux : il est centripète."),
        vf("e", "faux", "Entre deux plaques chargées, le champ va de la plaque négative vers la plaque positive.", "Faux : de la plaque positive vers la négative."),
        vf("f", "faux", "Le travail de la force électrostatique dépend du chemin suivi.", "Faux : il ne dépend que des points de départ et d’arrivée."),
        vf("g", "vrai", "Un électron accéléré sous 100 V gagne une énergie cinétique de 100 eV.", r"Vrai : $E_{\u{C}} = e·U = 100~\u{eV}$.")]) + "\n    </div>")))

S.append(slide("exercice", "Exercice 1", "Champ créé par une charge ponctuelle", *EX, "Exercice 1 · énoncé", ("", "",
    stack(card(r"$K = " + K + r"$ ; $e = 1,6×10^{−19}~\u{C}$.", "small"),
          r'''<ol class="exlist small"><li>Intensité $E_p$ du champ d’un proton à $r = 10~\u{µm}$.</li><li>Une charge $q > 0$ crée $E_1 = 10~\u{N·C^{−1}}$ à $x_1 = 1,0~\u{cm}$ : calculer $q$.</li><li>Calculer $E$ à $x = 2,0$ ; $3,0$ ; $4,0$ et $5,0~\u{cm}$ ; allure de $E = f(x)$.</li></ol>''', cls="stack"))))

S.append(slide("exercice", "Correction", "Exercice 1 — Charge ponctuelle", *EX, "Exercice 1 · correction", cols("1.3fr", ".7fr",
    qlist(q(1, '<span class="kw">Proton</span>', r"$E_p = K·\frac{e}{r^2} = \frac{9×10^9×1,6×10^{−19}}{(1,0×10^{−5})^2} = 14,4~\u{N·C^{−1}}$"),
          q(2, '<span class="kw">Charge</span>', r"$q = \frac{E_1·x_1^2}{K} = \frac{10×0,010^2}{9×10^9} ≈ 1,11×10^{−13}~\u{C}$"),
          q(3, '<span class="kw">Courbe</span>', r"$E = E_1·(\frac{x_1}{x})^2$ : $2,50$ ; $1,11$ ; $0,625$ ; $0,400~\u{N·C^{−1}}$. Courbe décroissante, tend vers 0 : $E$ varie comme $\frac{1}{x^2}$.")),
    "    " + fig("courbeE"))))

S.append(slide("exercice", "Exercice 2", "Superposition de champs", *EX, "Exercice 2 · énoncé", cols("1fr", "1fr",
    stack(card(r"Dans le vide ; $K = \frac{1}{4πε_0}$.", "small"),
          r'''<ol class="exlist small"><li>$+q$ en $A$, $−q$ en $B$, $AB = 2a$ : champ $\vec{E}(M)$ en $M$ de la médiatrice tel que $MA = MB = 2a$ (direction, sens, intensité).</li><li>Carré $ABCD$ de côté $a$ : $+q$ en $A$, $−q$ en $B$, $+q$ en $C$. Intensité de $\vec{E}(D)$.</li></ol>''', cls="stack"),
    "    " + fig("ex2geo"))))

S.append(slide("exercice", "Correction", "Exercice 2 — Superposition", *EX, "Exercice 2 · correction", cols("1.1fr", ".9fr",
    qlist(q(1, '<span class="kw">Triangle équilatéral</span>', r"$E_A = E_B = \frac{K·q}{4a^2}$ ; composantes perpendiculaires à $(AB)$ opposées : $E(M) = 2E_A\u{cos}60° = \frac{K·q}{4a^2}$, parallèle à $(AB)$, de $A$ vers $B$."),
          q(2, '<span class="kw">Carré</span>', r"$E_A = E_C = \frac{K·q}{a^2}$ ⊥ : somme $\frac{\sqrt{2}K·q}{a^2}$ de $B$ vers $D$ ; $E_B = \frac{K·q}{2a^2}$ vers $B$ ⇒ $E(D) = (\sqrt{2} − \frac{1}{2})\frac{K·q}{a^2} ≈ 0,914\frac{K·q}{a^2}$, de $B$ vers $D$.")),
    "    " + fig("ex2geo", None, '{"final":1}'))))

S.append(slide("exercice", "Exercice 3", "Une particule α dans un champ uniforme", *EX, "Exercice 3 · énoncé", cols("1.2fr", ".8fr",
    stack(card(r"Repère $(O, \vec{i}, \vec{j}, \vec{k})$, unité : le cm ; $\vec{E} = E\vec{i}$, $E = 1,0×10^3~\u{V·m^{−1}}$. Particule α ($q = +2e$, $e = 1,6×10^{−19}~\u{C}$) de $A(2 ; 0 ; 0)$ à $B(4 ; 2 ; 0)$.", "small"),
          r'''<ol class="exlist small"><li>Travail $W_{A→B}(\vec{F})$.</li><li>$E_{\u{pe}}(B)$, avec $E_{\u{pe}}(A) = 0$.</li><li>Particule α au repos accélérée sous $U = 1,0×10^6~\u{V}$ : énergie cinétique en MeV puis en J.</li></ol>''', cls="stack"),
    "    " + fig("repere"))))

S.append(slide("exercice", "Correction", "Exercice 3 — La particule α", *EX, "Exercice 3 · correction", cols("1.3fr", ".7fr",
    qlist(q(1, '<span class="kw">Travail</span>', r"$W_{A→B}(\vec{F}) = q·E·(x_B − x_A) = 3,2×10^{−19}×1,0×10^3×0,020 = 6,4×10^{−18}~\u{J}$"),
          q(2, '<span class="kw">Énergie potentielle</span>', r"$E_{\u{pe}}(B) = E_{\u{pe}}(A) − W_{A→B}(\vec{F}) = −6,4×10^{−18}~\u{J}$"),
          q(3, '<span class="kw">Accélération</span>', r"$E_{\u{C}} = q·U = 2e×1,0×10^6~\u{V} = 2,0~\u{MeV} = 3,2×10^{−13}~\u{J}$")),
    "    " + fig("repere"))))

S.append(slide("exercice", "Exercice 4", "Pendule et ion entre deux plaques", *EX, "Exercice 4 · énoncé", cols("1.15fr", ".85fr",
    stack(card(r"Plaques verticales $N$ et $P$, $d = 8,0~\u{cm}$, $U_{PN} = 400~\u{V}$ ; $g = 10~\u{N·kg^{−1}}$.", "small"),
          r'''<ol class="exlist small"><li>Calculer $E$. Pendule ($m = 0,20~\u{g}$, $q = +40~\u{nC}$) en équilibre : angle $α$ avec la verticale.</li><li>Axe $(Ox)$ de $N$ vers $P$, $V_N = 0$, $E_{\u{pe}} = 0$ sur $N$ : $V_M$ et $E_{\u{pe}}(M)$ pour $x_M = 5,0~\u{cm}$.</li><li>Ion $\u{Li}^+$ ($q' = +e$, $m = 1,16×10^{−26}~\u{kg}$) lâché en $M$ : vers quelle plaque ? Vitesse $v_N$ en $N$.</li></ol>''', cls="stack"),
    "    " + fig("ex4"))))

S.append(slide("exercice", "Correction", "Exercice 4 — Pendule et ion", *EX, "Exercice 4 · correction", cols("1.35fr", ".65fr",
    qlist(q(1, '<span class="kw">Champ et équilibre</span>', r"$E = \frac{400}{0,080} = 5,0×10^3~\u{V·m^{−1}}$ ; $\u{tan}α = \frac{q·E}{m·g} = \frac{40×10^{−9}×5,0×10^3}{0,20×10^{−3}×10} = 0,10$ ⇒ $α ≈ 5,7°$ (vers $N$)."),
          q(2, '<span class="kw">Potentiel et énergie</span>', r"$V_N − V_M = \vec{E}·\vec{NM} = −E·x_M$ ⇒ $V_M = 250~\u{V}$ ; $E_{\u{pe}}(M) = q·V_M = 1,0×10^{−5}~\u{J}$"),
          q(3, '<span class="kw">Ion lithium</span>', r"$q' > 0$ : vers $N$. $\frac{1}{2}m·v_N^2 = e·V_M$ ⇒ $v_N = \sqrt{\frac{2×1,6×10^{−19}×250}{1,16×10^{−26}}} ≈ 8,30×10^4~\u{m·s^{−1}}$")),
    "    " + fig("ex4"))))

S.append(slide("bilan", "L’essentiel", "Ce qu’il faut retenir du chapitre", "Bilan", "Exercices et bilan", "L’essentiel du chapitre", ("", "",
    r'''    <div class="bilan">
      <div class="bil"><h3>Électrisation</h3><p>frottement, contact, influence : transfert ou déplacement d’électrons ; même signe : répulsion</p></div>
      <div class="bil"><h3>Loi de Coulomb</h3><span class="eq-wrap">$F = K·\frac{|q_A|·|q_B|}{AB^2}$</span><p>$K = 9×10^9$ S.I.</p></div>
      <div class="bil"><h3>Champ électrostatique</h3><span class="eq-wrap">$\vec{F} = q·\vec{E}$</span><p>charge ponctuelle : $E = K·\frac{|q|}{r^2}$ ; superposition</p></div>
      <div class="bil"><h3>Champ uniforme</h3><span class="eq-wrap">$E = \frac{U}{d}$</span><p>$V_A − V_B = \vec{E}·\vec{AB}$ ; $\vec{E}$ vers les potentiels décroissants</p></div>
      <div class="bil"><h3>Travail</h3><span class="eq-wrap">$W_{A→B} = q·(V_A − V_B)$</span><p>force conservative</p></div>
      <div class="bil"><h3>Énergie</h3><span class="eq-wrap">$E_{\u{pe}} = q·V + C$</span><p>$ΔE_{\u{pe}} = −W$ ; $E_{\u{C}} + E_{\u{pe}}$ constante ; $1~\u{eV} = 1,6×10^{−19}~\u{J}$</p></div>
    </div>''')))

(SRC / "slides.html").write_text("\n".join(S))
print(len(S), "diapositives")
