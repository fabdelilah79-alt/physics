/* ===== Physique, chapitre 7 — changement d’état, rayonnement, exercices ===== */

// thermomètre à liquide (réservoir noirci si o.black) : bas du réservoir en (x, y), hauteur h ; renvoie la colonne (rect)
function glassThermo(f, parent, x, y, h, o = {}){
  const g = f.g({parent});
  f.rect(x - 7, y - h, 14, h - 10, {rx: 7, fill: f.lg(uid('gt'), [[0, '#ffffff', .7], [.5, '#e3f0fa', .4], [1, '#ffffff', .7]], 0, 0, 1, 0), stroke: '#8fa6bb', 'stroke-width': 1, parent: g});
  for (let k = 1; k < 9; k++) f.line(x + 3, y - 22 - k * (h - 40) / 9, x + 7, y - 22 - k * (h - 40) / 9, {stroke: '#5d7f96', 'stroke-width': .8, parent: g});
  const col = f.rect(x - 2, y - 20, 4, 10, {fill: '#d62839', parent: g});
  f.circ(x, y - 6, 10, {fill: o.black ? f.rg(uid('bk'), [[0, '#5d6978'], [1, '#0b0f14']], .35, .3, .8) : f.rg(uid('rd'), [[0, '#ff8a8a'], [1, '#a3161f']], .35, .3, .8), stroke: '#2b3440', 'stroke-width': .8, parent: g});
  return {g, set: hh => { col.setAttribute('y', f2(y - 14 - hh)); col.setAttribute('height', f2(hh)); }};
}
// lampe infrarouge sur pied, orientée vers la droite (ang en degrés) : centre du réflecteur (x, y)
function irLamp(f, parent, x, y, ang = 0, o = {}){
  const g = f.g({parent}); g.setAttribute('transform', `translate(${x},${y}) rotate(${ang})`);
  f.path('M-34,-10 L0,-34 L0,34 L-34,10 Z', {fill: f.lg(uid('rf'), [[0, '#5d6978'], [.5, '#e9eef3'], [1, '#3b4654']]), stroke: '#2b3440', 'stroke-width': 1, parent: g});
  f.ell(0, 0, 8, 34, {fill: '#ffb38a', stroke: '#2b3440', 'stroke-width': 1, parent: g});
  const glow = f.ell(4, 0, 18, 38, {fill: '#ff5a2a', opacity: .5, filter: realDefs(f).blur6, parent: g});
  f.rect(-48, -6, 16, 12, {rx: 3, fill: '#2b3440', parent: g});
  return {g, glow};
}
// rayon ondulé (onde électromagnétique) de (x1, y1) à (x2, y2), décalé de la phase ph
function wavy(f, parent, x1, y1, x2, y2, ph = 0, col = '#d62839', amp = 6){
  const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  let d = ''; for (let s = 0; s <= L - 12; s += 3) d += (s ? 'L' : 'M') + f2(s) + ',' + f2(amp * Math.sin(s / 9 - ph));
  const g = f.g({parent}); g.setAttribute('transform', `translate(${f2(x1)},${f2(y1)}) rotate(${f2(a)})`);
  f.path(d, {stroke: col, 'stroke-width': 2.2, fill: 'none', parent: g}); f.path(`M${f2(L - 14)},-6 L${f2(L)},0 L${f2(L - 14)},6 Z`, {fill: col, parent: g});
  return g;
}

/* ---------- Activité 3, doc 4 (et situation 3) : courbe d'échauffement de la glace ---------- */
SCENES.courbeGlace = (host, o = {}) => {
  const W = 540, H = 380, f = new Fig(host, W, H, {label: 'Température de la glace en fonction du temps : elle monte jusqu’à 0 °C, reste constante pendant la fusion, puis remonte'});
  const ox = 74, oy = 250, LX = 420, X = t => ox + t / 17 * LX, Y = th => oy - th / 40 * 200;
  for (let t = 0; t <= 17; t++) f.line(X(t), Y(-12.5), X(t), Y(37.5), {stroke: t % 2 ? '#eef3f8' : '#d5dfea', 'stroke-width': 1});
  for (let th = -10; th <= 35; th += 5) f.line(ox, Y(th), ox + LX, Y(th), {stroke: th % 10 ? '#eef3f8' : '#d5dfea', 'stroke-width': 1});
  f.line(ox, Y(0), ox + LX + 20, Y(0), {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  f.line(ox, Y(-14), ox, Y(38) - 18, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  for (let t = 2; t <= 16; t += 2) f.T(X(t), Y(0) + 20, String(t), {cls: 'lbl', anchor: 'middle', size: 15});
  for (let th = -10; th <= 30; th += 10) if (th) f.T(ox - 8, Y(th) + 5, String(th), {cls: 'lbl', anchor: 'end', size: 15});
  f.T(ox - 8, Y(0) + 18, '0', {cls: 'lbl', anchor: 'end', size: 15});
  f.T(ox + LX + 18, Y(0) - 10, M('t (\\m\\i\\n)', 20), {cls: 'm', anchor: 'end', size: 20});
  f.T(ox + 8, Y(38) - 14, M('θ (°\\C)', 20), {cls: 'm', size: 20});
  const P = [[0, -10], [.7, 0], [11.8, 0], [16, 30]], pts = [];
  for (let i = 0; i < 3; i++) for (let k = 0; k <= 20; k++){ const u = k / 20; pts.push([lerp(P[i][0], P[i + 1][0], u), lerp(P[i][1], P[i + 1][1], u)]); }
  const crv = f.path(pts.map((p, i) => (i ? 'L' : 'M') + f2(X(p[0])) + ',' + f2(Y(p[1]))).join(''), {stroke: C.blue, 'stroke-width': 3});
  const len = pts.reduce((s, p, i) => i ? s + Math.hypot(X(p[0]) - X(pts[i - 1][0]), Y(p[1]) - Y(pts[i - 1][1])) : 0, 0); crv.setAttribute('stroke-dasharray', f2(len));
  const lab = f.g({}); if (!o.labels) lab.setAttribute('display', 'none');
  tag(f, lab, X(1.8), Y(-8) + 4, 'glace', {size: 14, w: 42});
  tag(f, lab, X(6.2), Y(0) - 14, 'palier : fusion (glace + eau)', {size: 14, w: 190});
  tag(f, lab, X(13.2), Y(24), 'eau liquide', {size: 14, w: 78});
  tag(f, null, X(10.6), Y(-9), 'glace (100 g) chauffée à puissance constante', {size: 13, w: 270});
  return {update(t){ const k = o.book ? 1 : clamp((t % 8) / 5.5, 0, 1); crv.setAttribute('stroke-dashoffset', f2(len * (1 - k))); lab.setAttribute('opacity', k >= 1 ? 1 : 0); }};
};

/* ---------- Activité 4, doc 6 : capteur (thermomètre à réservoir noirci) sous une cloche à vide éclairé par une lampe infrarouge ---------- */
SCENES.cloche = (host, o = {}) => {
  const W = 560, H = 380, f = new Fig(host, W, H, {label: 'Une lampe infrarouge éclaire, à travers une cloche en verre où l’on a fait le vide, un thermomètre dont le réservoir est noirci'});
  const sc = labScene(f, 340), d = realDefs(f), cx = 320;
  // platine et cloche
  shadowEll(f, sc, cx, 342, 120, 6);
  f.rect(cx - 120, 320, 240, 20, {rx: 4, fill: d.metalH, stroke: '#3b4654', 'stroke-width': 1, parent: sc});
  const th = glassThermo(f, sc, cx, 300, 170, {black: true});
  f.rect(cx - 30, 300, 60, 20, {rx: 3, fill: '#5d6978', parent: sc});
  f.path(`M${cx - 100},320 L${cx - 100},140 C${cx - 100},40 ${cx + 100},40 ${cx + 100},140 L${cx + 100},320 Z`, {fill: f.lg('cl', [[0, '#ffffff', .45], [.5, '#e3f0fa', .12], [1, '#ffffff', .45]], 0, 0, 1, 0), stroke: '#8fa6bb', 'stroke-width': 2, parent: sc});
  f.path(`M${cx - 80},300 L${cx - 80},150 C${cx - 80},90 ${cx - 40},70 ${cx - 20},66`, {stroke: '#ffffff', 'stroke-width': 6, fill: 'none', opacity: .55, parent: sc});
  f.circ(cx, 52, 12, {fill: f.rg('bt', [[0, '#ffffff'], [1, '#8fa6bb']], .35, .3, .8), stroke: '#5d7f96', 'stroke-width': 1, parent: sc});
  // pompe à vide
  f.path(`M${cx + 120},332 C${cx + 160},332 ${cx + 150},300 ${cx + 190},300`, {stroke: '#2b3440', 'stroke-width': 7, fill: 'none', parent: sc});
  caseBox(f, sc, cx + 160, 250, 76, 56, {}); f.T(cx + 198, 282, 'pompe', {cls: 'lbl-b', anchor: 'middle', size: 13, parent: sc});
  tag(f, sc, cx, 26, 'vide', {size: 14, w: 36, fill: C.purple});
  // lampe
  f.rect(48, 150, 8, 190, {fill: d.metal, parent: sc}); f.rect(24, 330, 56, 10, {rx: 3, fill: '#3b4654', parent: sc});
  const lamp = irLamp(f, sc, 90, 160, 18);
  tag(f, sc, 92, 92, 'lampe infrarouge', {size: 14, w: 118});
  const rays = f.g({parent: sc});
  if (!o.book) f.T(12, H - 8, 'animation ralentie', {cls: 'lbl-s', size: 12, fill: '#ffffff', parent: sc});
  f.frame();
  return {update(t){
    const ph = o.book ? 0 : t * 6; rays.innerHTML = '';
    [[-14, -12], [0, 0], [14, 12]].forEach(([dy0, dy1]) => wavy(f, rays, 128, 175 + dy0, cx - 14, 290 + dy1 * .3, ph, '#d62839', 5));
    th.set(o.book ? 22 : 22 + 90 * clamp((t % 9) / 7, 0, 1));
  }};
};

/* ---------- À retenir 4 : les trois modes de transfert thermique ---------- */
SCENES.modes = (host, o = {}) => {
  const PW = 300, G = 16, W = 3 * PW + 2 * G, H = 300, f = new Fig(host, W, H, {label: 'Trois modes de transfert thermique : conduction dans une tige métallique, convection dans l’eau chauffée, rayonnement du Soleil vers la Terre à travers le vide'});
  const d = realDefs(f);
  const panel = (i, title, bg) => { const g = f.g({}); g.setAttribute('transform', `translate(${i * (PW + G)},0)`);
    const cp = f.clip(uid('mp'), c => f.el('rect', {x: 0, y: 0, width: PW, height: H, rx: 14}, c)); const inner = f.g({parent: g, 'clip-path': cp});
    f.rect(0, 0, PW, H, {fill: bg, parent: inner}); f.rect(.75, .75, PW - 1.5, H - 1.5, {rx: 14, fill: 'none', stroke: '#c9d6e6', 'stroke-width': 1.5, parent: g});
    f.rect(0, 0, PW, 40, {fill: '#ffffff', opacity: .85, parent: inner}); f.T(PW / 2, 27, title, {cls: 'lbl-b', anchor: 'middle', size: 16, fill: C.ink, parent: g}); return inner; };
  // conduction
  const p1 = panel(0, 'Conduction', f.lg('m1', [[0, '#f2f6fb'], [1, '#dbe4ee']]));
  const rod = f.rect(30, 140, 240, 18, {rx: 4, fill: f.lg('rod', [[0, '#d62839'], [.5, '#f4a300'], [1, '#9aa7b6']], 0, 0, 1, 0), stroke: '#3b4654', 'stroke-width': 1, parent: p1});
  const flame = f.path('M44,200 C30,180 40,166 48,160 C50,176 62,176 60,190 C66,182 66,172 64,166 C78,180 72,200 56,206 Z', {fill: f.lg('fl', [[0, '#ffd166'], [1, '#f07f1e']]), parent: p1});
  f.rect(26, 206, 50, 30, {rx: 4, fill: '#5d6978', parent: p1});
  const atoms = [...Array(9)].map((_, k) => f.circ(50 + k * 26, 149, 4, {fill: '#1b2a41', parent: p1}));
  f.T(PW / 2, 270, 'de proche en proche, sans', {cls: 'lbl-s', anchor: 'middle', size: 13, fill: C.ink2, parent: p1});
  f.T(PW / 2, 288, 'déplacement de matière', {cls: 'lbl-s', anchor: 'middle', size: 13, fill: C.ink2, parent: p1});
  // convection
  const p2 = panel(1, 'Convection', f.lg('m2', [[0, '#f2f6fb'], [1, '#dbe4ee']]));
  const bk = beaker3D(f, p2, 150, 214, 150, 140, {level: .8, noShadow: true});
  f.rect(70, 214, 160, 22, {rx: 4, fill: '#3b4654', parent: p2}); f.rect(80, 210, 140, 5, {rx: 2, fill: '#ff5a2a', opacity: .8, parent: p2});
  const loopL = f.path('M150,200 C150,120 100,110 100,150 C100,190 130,200 150,200', {stroke: C.red, 'stroke-width': 2.4, fill: 'none', 'stroke-dasharray': '10 8', parent: bk.content});
  const loopR = f.path('M150,200 C150,120 200,110 200,150 C200,190 170,200 150,200', {stroke: C.red, 'stroke-width': 2.4, fill: 'none', 'stroke-dasharray': '10 8', parent: bk.content});
  f.T(PW / 2, 270, 'avec déplacement de matière', {cls: 'lbl-s', anchor: 'middle', size: 13, fill: C.ink2, parent: p2});
  f.T(PW / 2, 288, '(liquides et gaz)', {cls: 'lbl-s', anchor: 'middle', size: 13, fill: C.ink2, parent: p2});
  // rayonnement
  const p3 = panel(2, 'Rayonnement', '#0b1430');
  const r = rng(5); for (let i = 0; i < 40; i++) f.circ(r() * PW, 40 + r() * 200, .8 + r(), {fill: '#ffffff', opacity: .7, parent: p3});
  f.circ(40, 140, 60, {fill: '#ffd38a', opacity: .5, filter: d.blur6, parent: p3});
  f.circ(30, 140, 46, {fill: f.rg('sn', [[0, '#fff6d6'], [.6, '#ffd166'], [1, '#f6a13a']]), parent: p3});
  f.circ(250, 140, 26, {fill: f.rg('ea', [[0, '#7fc4ff'], [.6, '#1f5fa8'], [1, '#0d2b55']], .35, .3, .8), parent: p3});
  f.path('M238,128 q8,-6 14,2 q6,8 -2,12 q-8,2 -12,-6 z', {fill: '#5aa06a', parent: p3});
  const rays = f.g({parent: p3});
  f.T(PW / 2, 236, 'vide', {cls: 'lbl-b', anchor: 'middle', size: 14, fill: '#ffffff', parent: p3});
  f.T(PW / 2, 270, 'ondes électromagnétiques,', {cls: 'lbl-s', anchor: 'middle', size: 13, fill: '#dbe4ee', parent: p3});
  f.T(PW / 2, 288, 'même dans le vide', {cls: 'lbl-s', anchor: 'middle', size: 13, fill: '#dbe4ee', parent: p3});
  return {update(t){
    const tt = o.book ? .8 : t;
    atoms.forEach((a, k) => { const amp = 3.2 * Math.exp(-k / 3); a.setAttribute('cy', f2(149 + amp * Math.sin(tt * 18 + k))); });
    flame.setAttribute('transform', `translate(0,${f2(o.book ? 0 : Math.sin(t * 9) * 1.5)})`);
    [loopL, loopR].forEach(p => p.setAttribute('stroke-dashoffset', f2(-tt * 30)));
    rays.innerHTML = ''; [-20, 0, 20].forEach(dy => wavy(f, rays, 84, 140 + dy, 220, 140 + dy * .4, tt * 6, '#ffb38a', 4));
  }};
};

/* ---------- Situation 4 : le Soleil chauffe la Terre à travers le vide ---------- */
SCENES.soleilTerre = (host, o = {}) => {
  const W = 640, H = 330, f = new Fig(host, W, H, {label: 'Le rayonnement du Soleil traverse le vide spatial et chauffe la Terre'});
  const sc = f.card('#070d24'), d = realDefs(f);
  const r = rng(9); for (let i = 0; i < 90; i++) f.circ(r() * W, r() * H, .6 + r() * 1.2, {fill: '#ffffff', opacity: .3 + .6 * r(), parent: sc});
  f.circ(30, 165, 150, {fill: '#ffd38a', opacity: .4, filter: d.blur6, parent: sc});
  f.circ(10, 165, 110, {fill: f.rg('sol', [[0, '#fff6d6'], [.6, '#ffd166'], [1, '#f07f1e']]), parent: sc});
  f.circ(540, 165, 56, {fill: f.rg('ter', [[0, '#7fc4ff'], [.6, '#1f5fa8'], [1, '#0d2b55']], .35, .3, .8), parent: sc});
  f.path('M510,140 q20,-14 34,4 q12,18 -6,26 q-20,4 -28,-14 z M552,176 q14,-6 20,6 q2,12 -12,12 z', {fill: '#5aa06a', parent: sc});
  tag(f, sc, 320, 300, 'vide spatial : aucune matière', {size: 15, w: 210, fill: C.purple});
  tag(f, sc, 540, 260, 'Terre', {size: 14, w: 40}); tag(f, sc, 70, 300, 'Soleil', {size: 14, w: 46});
  const rays = f.g({parent: sc});
  f.frame();
  return {update(t){ rays.innerHTML = ''; const ph = o.book ? 0 : t * 6; [-50, -18, 18, 50].forEach(dy => wavy(f, rays, 140, 165 + dy * 1.6, 476, 165 + dy * .7, ph, '#ffb38a', 6)); }};
};


/* ---------- Exercice 2 : température de la glace en fonction de la chaleur reçue ---------- */
SCENES.courbeQ = (host, o = {}) => {
  const W = 540, H = 380, f = new Fig(host, W, H, {label: 'Température en fonction de la chaleur reçue : montée de moins 20 à 0 °C, palier de fusion, puis montée jusqu’à 40 °C'});
  const ox = 74, oy = 250, LX = 410, X = q => ox + q / 120 * LX, Y = th => oy - th / 45 * 190;
  for (let q = 0; q <= 120; q += 10) f.line(X(q), Y(-22), X(q), Y(44), {stroke: q % 20 ? '#eef3f8' : '#d5dfea', 'stroke-width': 1});
  for (let th = -20; th <= 40; th += 5) f.line(ox, Y(th), ox + LX, Y(th), {stroke: th % 10 ? '#eef3f8' : '#d5dfea', 'stroke-width': 1});
  f.line(ox, Y(0), ox + LX + 22, Y(0), {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  f.line(ox, Y(-24), ox, Y(46) - 16, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  for (let q = 20; q <= 120; q += 20) f.T(X(q), Y(0) + 20, String(q), {cls: 'lbl', anchor: 'middle', size: 14});
  for (let th = -20; th <= 40; th += 10) if (th) f.T(ox - 8, Y(th) + 5, String(th), {cls: 'lbl', anchor: 'end', size: 14});
  f.T(ox + LX + 20, Y(0) - 10, M('Q (\\k\\J)', 20), {cls: 'm', anchor: 'end', size: 20}); f.T(ox + 8, Y(46) - 12, M('θ (°\\C)', 20), {cls: 'm', size: 20});
  const P = [[0, -20], [8.36, 0], [75.16, 0], [108.64, 40]];
  const crv = f.path(P.map((p, i) => (i ? 'L' : 'M') + f2(X(p[0])) + ',' + f2(Y(p[1]))).join(''), {stroke: C.blue, 'stroke-width': 3});
  [[8.36, 'Q_1'], [75.16, 'Q_2'], [108.64, 'Q_3']].forEach(([q, n]) => { f.line(X(q), Y(0), X(q), Y(-20), {stroke: C.ink2, 'stroke-width': 1, 'stroke-dasharray': '4 3'}); f.T(X(q), Y(-20) + 20, M(n, 17), {cls: 'm', anchor: 'middle', size: 17}); });
  let len = 0; for (let i = 1; i < P.length; i++) len += Math.hypot(X(P[i][0]) - X(P[i - 1][0]), Y(P[i][1]) - Y(P[i - 1][1])); crv.setAttribute('stroke-dasharray', f2(len));
  return {update(t){ crv.setAttribute('stroke-dashoffset', f2(o.book ? 0 : len * (1 - clamp((t % 8) / 5.5, 0, 1)))); }};
};

/* ---------- Application 3 : glace à -20 °C qui reçoit 60,0 kJ (fusion partielle) ---------- */
SCENES.fusionPartielle = (host, o = {}) => {
  const W = 640, H = 230, f = new Fig(host, W, H, {label: o.final ? 'État final : mélange d’eau liquide et de glace à 0 °C' : 'Glace à moins 20 °C qui reçoit 60,0 kJ : quel est l’état final ?'});
  const box = (x, title) => { const g = f.g({}); f.rect(x - 90, 30, 180, 160, {rx: 12, fill: '#ffffff', stroke: '#c9d6e6', 'stroke-width': 1.5, parent: g}); f.T(x, 212, title, {cls: 'lbl-b', anchor: 'middle', size: 14, fill: C.purple, parent: g}); return g; };
  const gi = box(120, 'état initial'); iceCube(f, gi, 78, 70, 48, -6); iceCube(f, gi, 118, 84, 44, 9); f.T(120, 172, 'glace 250 g · −20 °C', {cls: 'lbl-b', anchor: 'middle', size: 14, parent: gi});
  vec(f, null, 222, 110, 410, 110, C.orange, 3.2); f.T(316, 96, M('Q_{\\t\\o\\t} = 60,0 \\k\\J', 19), {cls: 'm', anchor: 'middle', size: 19, fill: '#c45f00'});
  f.T(316, 136, 'enceinte isolée', {cls: 'lbl-s', anchor: 'middle', size: 13, fill: C.ink2});
  const gf = box(520, 'état final');
  if (o.final){ const bk = beaker3D(f, gf, 520, 160, 110, 108, {level: .55, noShadow: true, noGrad: true}); iceCube(f, bk.content, 488, 98, 30, -8); iceCube(f, bk.content, 518, 102, 26, 12);
    f.T(520, 50, 'eau + glace à 0 °C', {cls: 'lbl-b', anchor: 'middle', size: 14, parent: gf}); }
  else f.T(520, 125, '?', {cls: 'lbl-b', anchor: 'middle', size: 54, fill: C.purple, parent: gf});
  return {update(){}};
};

/* ---------- Application 4 : capteur solaire thermique ---------- */
SCENES.panneauSolaire = (host, o = {}) => {
  const W = 620, H = 380, f = new Fig(host, W, H, {label: 'Capteur solaire thermique : vitre, tubes absorbeurs noirs, circuit d’eau relié à un ballon de stockage'});
  const sc = outdoor(f, 330), d = realDefs(f);
  f.circ(70, 60, 34, {fill: f.rg('s7', [[0, '#fff6d6'], [.6, '#ffd166'], [1, '#f6a13a']]), parent: sc});
  // panneau incliné (vue de profil en coupe)
  const P0 = [180, 300], ang = -32, L = 300, ca = Math.cos(rad(ang)), sa = Math.sin(rad(ang));
  const pan = f.g({parent: sc}); pan.setAttribute('transform', `translate(${P0[0]},${P0[1]}) rotate(${ang})`);
  f.rect(0, -36, L, 36, {rx: 4, fill: f.lg('cad7', [[0, '#c3ccd6'], [1, '#7c8896']]), stroke: '#3b4654', 'stroke-width': 1.2, parent: pan});
  f.rect(6, -30, L - 12, 22, {fill: '#1b1f24', parent: pan});
  for (let k = 0; k < 9; k++) f.circ(22 + k * 32, -19, 8, {fill: f.rg(uid('tb'), [[0, '#5d6978'], [1, '#05070a']], .35, .3, .8), parent: pan});
  f.rect(0, -40, L, 5, {fill: '#dff1ff', opacity: .75, stroke: '#8fb3c9', 'stroke-width': .8, parent: pan});
  f.path(`M${P0[0] + 20},302 L${P0[0] + 20},330 M${P0[0] + L * ca - 20},${P0[1] + L * sa + 2} L${P0[0] + L * ca - 20},330`, {stroke: '#5d6978', 'stroke-width': 5, parent: sc});
  // ballon et circuit d'eau
  /* thermosiphon : le ballon est placé plus haut que le capteur (l'eau chaude, moins dense, monte seule) */
  f.path('M515,140 L515,330 M575,140 L575,330 M515,240 L575,240', {stroke: '#5d6978', 'stroke-width': 5, parent: sc});
  f.rect(500, 30, 90, 116, {rx: 40, fill: f.lg('bal7', [[0, '#c3ccd6'], [.4, '#ffffff'], [1, '#9aa7b6']], 0, 0, 1, 0), stroke: '#5d6978', 'stroke-width': 1.2, parent: sc});
  const hot = `M${f2(P0[0] + L * ca - 6)},${f2(P0[1] + L * sa - 20)} C470,110 470,62 502,62`, cold = `M545,146 C545,350 260,350 ${P0[0] + 14},${P0[1] - 10}`;
  f.path(hot, {stroke: '#d62839', 'stroke-width': 7, fill: 'none', parent: sc}); f.path(cold, {stroke: '#1f5fa8', 'stroke-width': 7, fill: 'none', parent: sc});
  const fh = f.path(hot, {stroke: '#ffc2c8', 'stroke-width': 2.5, fill: 'none', 'stroke-dasharray': '8 10', parent: sc}), fc = f.path(cold, {stroke: '#bfe3ff', 'stroke-width': 2.5, fill: 'none', 'stroke-dasharray': '8 10', parent: sc});
  tag(f, sc, 545, 100, 'eau', {size: 13, w: 30});
  const call = (x1, y1, x2, y2, txt) => { f.line(x1, y1, x2, y2, {stroke: C.ink2, 'stroke-width': 1.2, parent: sc}); tag(f, sc, x2, y2 - 4, txt, {size: 13, w: txt.length * 7.2}); };
  call(P0[0] + 120 * ca + 26 * Math.sin(rad(-ang)), P0[1] + 120 * sa - 42, 300, 150, 'vitre');
  call(P0[0] + 200 * ca + 14, P0[1] + 200 * sa - 14, 330, 300, 'tubes absorbeurs noirs');
  const rays = f.g({parent: sc});
  f.frame();
  return {update(t){
    const ph = o.book ? 0 : t;
    fh.setAttribute('stroke-dashoffset', f2(-ph * 30)); fc.setAttribute('stroke-dashoffset', f2(-ph * 30));
    rays.innerHTML = ''; [60, 140, 220].forEach(s => { const x = P0[0] + s * ca, y = P0[1] + s * sa - 40; const sx = 100, sy = 80;
      vec(f, rays, lerp(sx, x, .2), lerp(sy, y, .2), x - 4, y - 6, C.amber, 2.2); });
  }};
};

/* ---------- Exercice 3 : balle de plomb qui s'enfonce dans un bloc de bois fixe ---------- */
SCENES.balle = (host, o = {}) => {
  const W = 640, H = 270, f = new Fig(host, W, H, {label: 'Une balle de plomb horizontale s’enfonce dans un bloc de bois fixe et s’immobilise en s’échauffant'});
  const sc = labScene(f, 240), d = realDefs(f);
  const bx = 430;
  f.rect(bx + 40, 60, 14, 180, {fill: d.metal, parent: sc}); f.rect(bx + 10, 232, 80, 10, {rx: 3, fill: '#3b4654', parent: sc});
  const ball_ = f.g({parent: sc});
  f.path('M-22,-7 L6,-7 Q20,-7 24,0 Q20,7 6,7 L-22,7 Z', {fill: f.lg('pb7', [[0, '#c3ccd6'], [.4, '#8a96a8'], [1, '#4a5560']], 0, 0, 0, 1), stroke: '#2b3440', 'stroke-width': 1, parent: ball_});
  const hotB = f.path('M-22,-7 L6,-7 Q20,-7 24,0 Q20,7 6,7 L-22,7 Z', {fill: '#ff7a3a', opacity: 0, parent: ball_});
  // bloc de bois (dessiné après la balle : la balle entre dedans)
  f.rect(bx, 90, 90, 110, {rx: 3, fill: f.lg('bois7', [[0, '#d9a066'], [1, '#9c6633']], 0, 0, 1, 0), stroke: '#6b4220', 'stroke-width': 1.2, parent: sc});
  for (let k = 0; k < 6; k++) f.path(`M${bx + 6},${100 + k * 17} q40,6 78,-2`, {stroke: '#8c5a2a', 'stroke-width': 1, fill: 'none', opacity: .6, parent: sc});
  const hole = f.circ(bx, 145, 7, {fill: '#2b1a10', opacity: 0, parent: sc}), glow = f.circ(bx + 18, 145, 22, {fill: '#ff7a3a', opacity: 0, filter: d.blur6, parent: sc});
  const vV = vec(f, sc, 0, 0, 0, 0, C.orange, 3), lV = f.g({parent: sc}); vlab(f, lV, 0, 0, 'V_0', '#c45f00', 20, 'middle');
  tag(f, sc, bx + 45, 76, 'bloc de bois fixe', {size: 13, w: 108}); tag(f, sc, 120, 110, 'balle de plomb (50 g)', {size: 13, w: 132});
  if (!o.book) f.T(12, H - 8, 'animation ralentie', {cls: 'lbl-s', size: 12, fill: '#ffffff', parent: sc});
  f.frame();
  return {update(t){
    const c = o.book ? 0 : t % 5, u = clamp(c / 2, 0, 1), x = lerp(80, bx + 30, u);
    setT(ball_, x, 145); const inside = x > bx - 20; hole.setAttribute('opacity', inside ? 1 : 0);
    const heat = clamp((c - 2) / 1.5, 0, 1); glow.setAttribute('opacity', f2(.6 * heat)); hotB.setAttribute('opacity', f2(.6 * heat));
    vV.setAttribute('display', u < 1 ? 'inline' : 'none'); lV.setAttribute('display', u < 1 ? 'inline' : 'none');
    setVec(vV, x + 28, 145, x + 88, 145); setT(lV, x + 60, 130);
  }};
};
