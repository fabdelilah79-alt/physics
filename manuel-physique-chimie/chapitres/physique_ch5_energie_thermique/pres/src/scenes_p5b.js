/* ===== Physique, chapitre 5 — changement d'état, rayonnement, exercices ===== */

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

/* ---------- Application 3 : les étapes de glace à -15 °C à eau à 20 °C ---------- */
SCENES.etapesGlace = (host, o = {}) => {
  const W = 680, H = 230, f = new Fig(host, W, H, {label: o.final ? 'Trois étapes : échauffement de la glace, fusion à 0 °C, échauffement de l’eau liquide' : 'État initial : glace à moins 15 °C ; état final : eau liquide à 20 °C'});
  const box = (x, kind, th) => { const g = f.g({});
    f.rect(x - 62, 40, 124, 130, {rx: 12, fill: '#ffffff', stroke: '#c9d6e6', 'stroke-width': 1.5, parent: g});
    if (kind === 'g'){ iceCube(f, g, x - 30, 62, 34, -8); iceCube(f, g, x - 2, 70, 30, 10); }
    else if (kind === 'm'){ beaker3D(f, g, x, 134, 64, 66, {level: .5, noShadow: true, noGrad: true}); iceCube(f, g, x - 14, 96, 24, 8); }
    else beaker3D(f, g, x, 134, 64, 66, {level: .55, noShadow: true, noGrad: true});
    f.T(x, 158, th, {cls: 'lbl-b', anchor: 'middle', size: 15, parent: g}); return g; };
  const arrow = (x1, x2, q, txt) => { const g = f.g({}); vec(f, g, x1, 105, x2, 105, C.orange, 3); f.T((x1 + x2) / 2, 92, M(q, 20), {cls: 'm', anchor: 'middle', size: 20, fill: '#c45f00', parent: g});
    f.T((x1 + x2) / 2, 196, txt, {cls: 'lbl-s', anchor: 'middle', size: 13, fill: C.ink2, parent: g}); return g; };
  if (o.final){
    box(80, 'g', 'glace −15 °C'); box(253, 'g', 'glace 0 °C'); box(426, 'm', 'eau 0 °C'); box(600, 'e', 'eau 20 °C');
    arrow(144, 189, 'Q_1', 'échauffement'); arrow(317, 362, 'Q_2', 'fusion'); arrow(490, 536, 'Q_3', 'échauffement');
  } else {
    box(120, 'g', 'glace −15 °C'); box(560, 'e', 'eau 20 °C');
    arrow(190, 490, '?', 'quelles étapes ?');
    f.T(120, 30, 'état initial', {cls: 'lbl-b', anchor: 'middle', size: 14, fill: C.purple}); f.T(560, 30, 'état final', {cls: 'lbl-b', anchor: 'middle', size: 14, fill: C.purple});
  }
  return {update(){}};
};

/* ---------- Activité 4, doc 6 : thermomètre sous une cloche à vide éclairé par une lampe infrarouge ---------- */
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

/* ---------- Activité 4, doc 7 : plaque noire mate et plaque blanche brillante ---------- */
SCENES.plaques = (host, o = {}) => {
  const W = 600, H = 360, f = new Fig(host, W, H, {label: 'Une lampe infrarouge éclaire à la même distance une plaque noire mate et une plaque blanche brillante munies de thermomètres'});
  const sc = labScene(f, 320), d = realDefs(f), cx = 300;
  const plate = (x, col, lab) => { f.rect(x - 4, 150, 8, 170, {fill: d.metal, parent: sc}); f.rect(x - 26, 312, 52, 8, {rx: 3, fill: '#3b4654', parent: sc});
    f.rect(x - 9, 110, 18, 130, {rx: 2, fill: col === 'n' ? f.lg(uid('pn'), [[0, '#2b3440'], [1, '#0b0f14']], 0, 0, 1, 0) : f.lg(uid('pw'), [[0, '#ffffff'], [.5, '#e9eef3'], [1, '#c3ccd6']], 0, 0, 1, 0), stroke: '#3b4654', 'stroke-width': 1, parent: sc});
    tag(f, sc, x, 346, lab, {size: 14, w: lab.length * 7.6}); };
  plate(130, 'n', 'plaque noire mate'); plate(470, 'b', 'plaque blanche brillante');
  f.rect(cx - 4, 150, 8, 170, {fill: d.metal, parent: sc}); f.rect(cx - 28, 312, 56, 8, {rx: 3, fill: '#3b4654', parent: sc});
  f.rect(cx - 14, 160, 28, 18, {rx: 3, fill: '#3b4654', parent: sc});
  f.circ(cx, 150, 34, {fill: '#ff5a2a', opacity: .45, filter: d.blur6, parent: sc});
  f.ell(cx, 138, 20, 26, {fill: f.rg('bulb', [[0, '#fff1c9'], [.6, '#ffb38a'], [1, '#d9483b']], .4, .35, .8), stroke: '#8e1f16', 'stroke-width': 1, parent: sc});
  tag(f, sc, cx, 196, 'lampe', {size: 13, w: 44});
  const dN = display(f, sc, 30, 24, 100, 62, 'θ noire (°C)', {noShadow: true}), dB = display(f, sc, 470, 24, 100, 62, 'θ blanche (°C)', {noShadow: true});
  f.line(80, 86, 120, 150, {stroke: '#2b3440', 'stroke-width': 2, parent: sc}); f.line(520, 86, 480, 150, {stroke: '#2b3440', 'stroke-width': 2, parent: sc});
  const chrono = display(f, sc, cx - 55, 24, 110, 58, 'DURÉE', {noShadow: true});
  const rays = f.g({parent: sc});
  tag(f, sc, cx, 236, 'même distance des deux plaques', {size: 13, w: 200});
  if (!o.book) f.T(cx, H - 8, 'animation accélérée', {cls: 'lbl-s', size: 12, anchor: 'middle', fill: '#ffffff', parent: sc});
  f.frame();
  return {update(t){
    const tm = o.book ? 0 : Math.min((t % 12) / 1, 10), ph = o.book ? 0 : t * 6;
    rays.innerHTML = ''; [-20, 0, 20].forEach(dy => { wavy(f, rays, cx - 30, 140 + dy, 150, 160 + dy * 1.4, ph, '#d62839', 4); wavy(f, rays, cx + 30, 140 + dy, 450, 160 + dy * 1.4, ph, '#d62839', 4); });
    dN.textContent = fr(20 + 30 * (1 - Math.exp(-tm / 6)), 1); dB.textContent = fr(20 + 9 * (1 - Math.exp(-tm / 6)), 1);
    chrono.textContent = fr(tm, 0) + ' min';
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

/* ---------- Application 4 : bouteille isolante (coupe) ---------- */
SCENES.thermos = (host, o = {}) => {
  const W = 400, H = 420, f = new Fig(host, W, H, {label: 'Bouteille isolante en coupe : double paroi de verre argentée avec du vide entre les deux parois, bouchon, liquide chaud'});
  const sc = f.card(f.lg('th', [[0, '#f2f6fb'], [1, '#e3eaf2']]));
  const cx = 150, x0 = cx - 80, y0 = 80, w = 160, h = 300;
  f.rect(x0 - 14, y0 - 10, w + 28, h + 24, {rx: 26, fill: f.lg('ext', [[0, '#7a2a3a'], [.4, '#c2455a'], [1, '#5a1a28']], 0, 0, 1, 0), parent: sc});
  f.rect(x0, y0, w, h, {rx: 22, fill: f.lg('arg', [[0, '#8a96a8'], [.3, '#ffffff'], [.6, '#c3ccd6'], [1, '#7c8896']], 0, 0, 1, 0), parent: sc});
  f.rect(x0 + 8, y0 + 8, w - 16, h - 16, {rx: 18, fill: '#fbfdff', parent: sc});
  for (let i = 0; i < 26; i++) f.circ(x0 + 12 + (i % 2 ? w - 24 : 0) + (i % 4 < 2 ? 1 : -1) * 2, y0 + 20 + i * 10.5, 1, {fill: '#8a96a8', parent: sc});
  f.rect(x0 + 16, y0 + 16, w - 32, h - 32, {rx: 14, fill: f.lg('arg2', [[0, '#7c8896'], [.3, '#f4f7fa'], [.6, '#c3ccd6'], [1, '#8a96a8']], 0, 0, 1, 0), parent: sc});
  f.rect(x0 + 22, y0 + 70, w - 44, h - 92, {rx: 10, fill: liquidGrad(f, '#c8742a'), parent: sc});
  f.rect(x0 + 30, y0 - 34, w - 60, 54, {rx: 8, fill: f.lg('bch', [[0, '#3b4654'], [1, '#1b2430']]), parent: sc});
  const callout = (x1, y1, y2, txt) => { f.line(x1, y1, 262, y2, {stroke: C.ink2, 'stroke-width': 1.2, parent: sc}); f.dot(x1, y1, {r: 3, fill: C.ink2, parent: sc}); tag(f, sc, 266, y2 + 5, txt, {size: 14, w: txt.length * 8, anchor: 'start'}); };
  callout(cx + 30, y0 - 10, 60, 'bouchon');
  callout(x0 + w - 12, y0 + 90, 130, 'vide');
  callout(x0 + w - 4, y0 + 160, 200, 'parois argentées');
  callout(cx + 20, y0 + 230, 270, 'liquide chaud');
  const rays = f.g({parent: sc}); if (!o.final) rays.setAttribute('display', 'none');
  f.frame();
  return {update(t){
    rays.innerHTML = ''; if (!o.final) return;
    const ph = t * 6; [y0 + 120, y0 + 190].forEach(y => { wavy(f, rays, cx, y, x0 + w - 20, y - 20, ph, '#d62839', 4); wavy(f, rays, x0 + w - 20, y - 16, cx + 10, y - 50, ph, '#d62839', 4); });
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

/* ---------- Exercice 3 : four solaire parabolique ---------- */
SCENES.fourSolaire = (host, o = {}) => {
  const W = 520, H = 400, f = new Fig(host, W, H, {label: 'Four solaire parabolique : le miroir concentre le rayonnement du Soleil sur un creuset contenant de l’étain'});
  const sc = outdoor(f, 350), d = realDefs(f);
  const cx = 230, cy = 230, R = 150;
  // le four est orienté vers le Soleil : les rayons arrivent parallèlement à l'axe du miroir
  f.circ(cx, -6, 34, {fill: f.rg('s3', [[0, '#fff6d6'], [.6, '#ffd166'], [1, '#f6a13a']]), parent: sc});   // miroir parabolique (coupe), foyer en F
  const F = [cx, cy - 95];
  let dm = '';
  dm = ''; for (let k = 0; k <= 40; k++){ const x = -R + 2 * R * k / 40, y = x * x / (4 * 95); dm += (k ? 'L' : 'M') + f2(cx + x) + ',' + f2(cy - y); }
  f.path(dm, {stroke: '#9aa7b6', 'stroke-width': 10, fill: 'none', parent: sc});
  f.path(dm, {stroke: '#ffffff', 'stroke-width': 3, fill: 'none', opacity: .8, parent: sc});
  f.path(`M${cx - 10},${cy} L${cx - 30},350 M${cx + 10},${cy} L${cx + 30},350`, {stroke: '#3b4654', 'stroke-width': 6, parent: sc});
  f.line(cx, cy, cx, F[1] + 24, {stroke: '#3b4654', 'stroke-width': 3, parent: sc});
  // creuset
  f.path(`M${F[0] - 20},${F[1] - 14} L${F[0] + 20},${F[1] - 14} L${F[0] + 15},${F[1] + 16} L${F[0] - 15},${F[1] + 16} Z`, {fill: f.lg('cr', [[0, '#5d6978'], [1, '#1b2430']], 0, 0, 1, 0), parent: sc});
  f.ell(F[0], F[1] - 14, 20, 5, {fill: '#d9dee4', parent: sc});
  const glow = f.circ(F[0], F[1], 26, {fill: '#ffd166', opacity: .5, filter: d.blur6, parent: sc});
  tag(f, sc, F[0] + 96, F[1] - 30, 'creuset : étain', {size: 14, w: 104});
  tag(f, sc, cx + 160, cy + 50, 'miroir parabolique', {size: 14, w: 130});
  const rays = f.g({parent: sc});
  f.frame();
  return {update(t){
    rays.innerHTML = '';
    [-120, -70, 70, 120].forEach(x => { const y = x * x / (4 * 95); const p = [cx + x, cy - y];
      f.line(p[0], 30, p[0], p[1], {stroke: '#f4a300', 'stroke-width': 1.8, opacity: .9, parent: rays});
      vec(f, rays, p[0], p[1], lerp(p[0], F[0], .85), lerp(p[1], F[1], .85), '#f07f1e', 1.8); });
    glow.setAttribute('opacity', f2(o.book ? .5 : .4 + .2 * Math.sin(t * 5)));
  }};
};
