/* ===== Physique, chapitre 4 — Énergie potentielle de pesanteur et énergie mécanique : titre, parties 1 et 2 ===== */

// couleurs des énergies (graphes et histogrammes)
const EN = {c: C.blue, pp: C.green, m: C.purple, q: C.red};

// histogramme d'énergies : items = [{lab, col}] ; renvoie une fonction set([valeurs entre 0 et 1])
function eBars(f, parent, x, y, H, items, o = {}){
  const bw = o.bw || 32, gap = o.gap || 20, W = items.length * (bw + gap) + gap;
  const g = f.g({parent});
  f.rect(x, y - H - 34, W, H + 68, {rx: 10, fill: '#ffffff', opacity: .93, stroke: '#d5dfea', 'stroke-width': .8, parent: g});
  if (o.title) f.T(x + W / 2, y - H - 14, o.title, {cls: 'lbl-b', anchor: 'middle', size: 13, fill: C.ink2, parent: g});
  const bars = items.map((it, i) => {
    const bx = x + gap + i * (bw + gap);
    f.rect(bx, y - H, bw, H, {rx: 3, fill: tint(it.col, .88), parent: g});
    const r = f.rect(bx, y, bw, 0, {rx: 3, fill: f.lg(uid('eb'), [[0, tint(it.col, .25)], [1, it.col]], 0, 0, 1, 0), parent: g});
    f.T(bx + bw / 2, y + 25, M(it.lab, 19), {cls: 'm', anchor: 'middle', size: 19, fill: it.col, parent: g});
    return r;
  });
  f.line(x + 8, y, x + W - 8, y, {stroke: C.ink, 'stroke-width': 1.4, parent: g});
  const set = vals => bars.forEach((r, i) => { const h = clamp(vals[i], 0, 1) * H; r.setAttribute('y', f2(y - h)); r.setAttribute('height', f2(h)); });
  set(items.map(() => 0));
  return set;
}

// mouvement d'un point sur une piste y = Y(x) (repère SVG), poids g (px/s²), frottement de valeur constante fk (par unité de masse)
// renvoie {x[], v[], q[]} échantillonnés tous les dt (déterministe)
function simTrack(Y, x0, vx0, g, fk, T, dt = 1 / 240){
  const d1 = x => (Y(x + .5) - Y(x - .5)), d2 = x => (Y(x + .5) - 2 * Y(x) + Y(x - .5)) / .25;
  let x = x0, vx = vx0, q = 0, stopped = false; const X = [], V = [], Q = [];
  const h = x => -Y(x);   // altitude (vers le haut)
  for (let t = 0; t <= T + 1e-9; t += dt){
    const hp = -d1(x), hpp = -d2(x), n = Math.sqrt(1 + hp * hp);
    X.push(x); V.push(Math.abs(vx) * n); Q.push(q);
    if (stopped) continue;
    let s = Math.sign(vx);
    if (Math.abs(vx) < 1e-3){ if (g * Math.abs(hp) <= fk * n){ stopped = true; vx = 0; continue; } s = -Math.sign(hp); }
    const ax = (-g * hp - fk * s * n - vx * vx * hp * hpp) / (n * n);
    const vx2 = vx + ax * dt;
    if (fk > 0 && Math.sign(vx2) !== Math.sign(vx) && vx !== 0){ vx = 0; continue; }
    q += fk * Math.abs(vx) * n * dt;
    vx = vx2; x += vx * dt;
  }
  return {X, V, Q, dt, h};
}

// solide (S) : bloc métallique bleu, base au centre (0, 0)
function blockS(f, parent, w = 44, h = 28, o = {}){
  const g = f.g({parent});
  f.rect(-w / 2, -h, w, h, {rx: 5, fill: f.lg(uid('bk'), [[0, '#6fa2e6'], [.45, '#2f6fc0'], [1, '#173f73']]), stroke: '#123461', 'stroke-width': 1, parent: g});
  f.rect(-w / 2 + 3, -h + 3, w - 6, 4, {rx: 2, fill: '#ffffff', opacity: .35, parent: g});
  if (o.label !== false) f.T(0, -h / 2 + 5, o.label || '(S)', {cls: 'lbl-b', anchor: 'middle', size: 12, fill: '#ffffff', parent: g});
  return g;
}

/* ---------- Titre (et bandeau d'ouverture du livre) : barrage et montagnes russes au crépuscule ---------- */
SCENES.titre = (host, o = {}) => {
  const W = o.W || 1600, H = o.H || 900, f = new Fig(host, W, H, {par: 'xMidYMid slice', label: 'Au crépuscule, un barrage retient un lac en altitude pendant qu’un wagon de montagnes russes dévale une piste'});
  const s = H / 900, d = realDefs(f);
  f.rect(0, 0, W, H, {fill: f.lg('dusk', [[0, '#0a1a38'], [.5, '#21477a'], [.8, '#e0875a'], [1, '#f6b26b']])});
  f.circ(W * .8, H * .5, 70 * s, {fill: '#ffd38a', stroke: 'none', opacity: .85, filter: d.blur6});
  // montagnes et lac de retenue
  f.path(`M${W * .42},${H * .62} L${W * .55},${H * .3} L${W * .64},${H * .44} L${W * .72},${H * .26} L${W * .86},${H * .46} L${W * .94},${H * .34} L${W},${H * .42} L${W},${H * .7} L${W * .42},${H * .7} Z`, {fill: '#1c3152', stroke: 'none'});
  f.path(`M${W * .62},${H * .47} Q${W * .7},${H * .43} ${W * .8},${H * .47} L${W * .8},${H * .5} L${W * .62},${H * .5} Z`, {fill: f.lg('lake', [[0, '#5b8fc7'], [1, '#2a4d7d']]), stroke: 'none'});
  // barrage (voûte en béton) et lâcher d'eau
  f.path(`M${W * .615},${H * .5} L${W * .805},${H * .5} L${W * .79},${H * .64} L${W * .63},${H * .64} Z`, {fill: f.lg('dam', [[0, '#9aa7b6'], [1, '#4a5868']]), stroke: '#2b3440', 'stroke-width': 1.2 * s});
  const jets = [.68, .71, .74].map(k => f.path(`M${W * k},${H * .505} Q${W * k + 6 * s},${H * .58} ${W * k + 4 * s},${H * .64}`, {stroke: '#dff1ff', 'stroke-width': 5 * s, opacity: .8, 'stroke-dasharray': `${14 * s} ${10 * s}`}));
  f.path(`M0,${H * .74} C${W * .25},${H * .66} ${W * .45},${H * .72} ${W * .62},${H * .66} C${W * .8},${H * .62} ${W * .92},${H * .68} ${W},${H * .64} L${W},${H} L0,${H} Z`, {fill: '#152844', stroke: 'none'});
  // montagnes russes
  const Y = x => H * .9 - H * .3 * Math.exp(-(((x - W * .36) / (W * .1)) ** 2)) - H * .17 * Math.exp(-(((x - W * .66) / (W * .085)) ** 2)) - H * .1 * Math.exp(-(((x - W * .93) / (W * .06)) ** 2));
  let dt = '';
  for (let x = -20; x <= W + 20; x += 8) dt += (x < 0 ? 'M' : 'L') + f2(x) + ',' + f2(Y(x));
  const sup = f.g({});
  for (let x = 10; x < W; x += 46 * s) f.line(x, Y(x) + 4, x, H, {stroke: '#0e1c33', 'stroke-width': 4 * s, parent: sup});
  f.path(dt, {stroke: '#0e1c33', 'stroke-width': 12 * s});
  f.path(dt, {stroke: '#f07f1e', 'stroke-width': 3 * s, opacity: .9});
  const wg = f.g({});
  [0, -1].forEach(k => {
    const c = f.g({parent: wg}); c.setAttribute('transform', `translate(${k * 46 * s},0)`);
    f.rect(-20 * s, -30 * s, 40 * s, 22 * s, {rx: 5 * s, fill: '#d62839', stroke: '#5a0d16', 'stroke-width': 1, parent: c});
    f.circ(-10 * s, -6 * s, 6 * s, {fill: '#111827', parent: c}); f.circ(10 * s, -6 * s, 6 * s, {fill: '#111827', parent: c});
  });
  const sim = simTrack(Y, W * .36 + 2, 30 * s, 900 * s, 0, 4.2);
  f.rect(0, 0, W, H, {fill: f.lg('veil', [[0, '#050d20', .9], [.38, '#050d20', .55], [.56, '#050d20', 0]], 0, 0, 1, 0)});
  if (o.book){
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22} L${W},${H} L0,${H} Z`, {fill: '#ffffff', stroke: 'none'});
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22}`, {stroke: '#f07f1e', 'stroke-width': 5});
  }
  const place = x => { const a = Math.atan2(Y(x + 1) - Y(x - 1), 2) * 180 / Math.PI; setT(wg, x, Y(x) - 2 * s, a); };
  return {update(t){
    jets.forEach((j, i) => j.setAttribute('stroke-dashoffset', f2(o.book ? i * 7 : -t * 60 * s)));
    if (o.book){ place(W * .52); return; }
    const k = clamp(Math.floor((((t % 4.2) + 4.2) % 4.2) / sim.dt), 0, sim.X.length - 1); place(sim.X[k]);
  }};
};

/* ---------- Situation de départ 1 : barrage hydroélectrique et rocher au sommet d'une falaise ---------- */
SCENES.barrage = (host, o = {}) => {
  const W = 640, H = 350, f = new Fig(host, W, H, {label: 'L’eau d’un barrage descend dans une conduite forcée et fait tourner une turbine ; un rocher tombe du haut d’une falaise'});
  const sc = outdoor(f, 300, {noHills: true}), d = realDefs(f);
  f.path('M0,300 L0,70 L60,40 L130,64 L170,120 L250,300 Z', {fill: '#8a9bb0', stroke: 'none', parent: sc});
  f.path('M0,110 L120,110 L120,300 L0,300 Z', {fill: f.lg('lac', [[0, '#5b8fc7'], [1, '#24497a']]), parent: sc});
  f.path('M116,104 L142,104 L170,300 L116,300 Z', {fill: f.lg('dam1', [[0, '#c3ccd6'], [1, '#7c8896']], 0, 0, 1, 0), stroke: '#4a5868', 'stroke-width': 1.2, parent: sc});
  f.rect(0, 108, 118, 3, {fill: '#dff1ff', opacity: .7, parent: sc});
  // conduite forcée et centrale
  const pipe = 'M120,150 L150,150 Q170,150 182,170 L232,262 Q240,276 256,276 L262,276';
  f.path(pipe, {stroke: '#3b4654', 'stroke-width': 16, fill: 'none', parent: sc});
  f.path(pipe, {stroke: '#8a96a8', 'stroke-width': 11, fill: 'none', parent: sc});
  const flow = f.path(pipe, {stroke: '#bfe3ff', 'stroke-width': 5, fill: 'none', 'stroke-dasharray': '10 9', parent: sc});
  f.rect(258, 232, 92, 68, {rx: 3, fill: f.lg('cen', [[0, '#eef2f6'], [1, '#b4bfcc']]), stroke: '#5d6978', 'stroke-width': 1.2, parent: sc});
  f.path('M252,234 L304,212 L356,234 Z', {fill: '#d62839', stroke: '#7a141c', 'stroke-width': 1, parent: sc});
  f.circ(304, 264, 21, {fill: '#1b2a41', parent: sc});
  const turb = f.g({parent: sc}); setT(turb, 304, 264);
  for (let k = 0; k < 6; k++) f.path('M0,0 L17,-5 L17,5 Z', {fill: '#ffc93c', transform: `rotate(${k * 60})`, parent: turb});
  f.circ(0, 0, 4, {fill: '#ffffff', parent: turb});
  const out = f.path('M350,292 Q360,295 372,293', {stroke: '#7fc4ff', 'stroke-width': 6, 'stroke-dasharray': '12 8', parent: sc});
  // falaise et rocher
  f.path('M470,300 L470,96 Q471,92 476,92 L640,88 L640,300 Z', {fill: f.lg('fal', [[0, '#b08a64'], [1, '#7a5a3c']], 0, 0, 1, 0), stroke: '#5a4030', 'stroke-width': 1.2, parent: sc});
  for (let y = 130; y < 300; y += 26) f.path(`M470,${y} q20,6 40,-2 t40,4`, {stroke: '#6b4f36', 'stroke-width': 1.2, fill: 'none', opacity: .6, parent: sc});
  const rock = f.g({parent: sc}), rk0 = f.g({parent: rock}); rk0.setAttribute('transform', 'translate(0,16)');   // rocher centré sur l'origine (rayon ≈ 20)
  f.path('M-22,0 Q-26,-22 -6,-30 Q14,-34 22,-16 Q26,-2 14,2 Z', {fill: f.rg('rk', [[0, '#b7b0a6'], [1, '#5f574d']], .35, .3, .8), stroke: '#3f3830', 'stroke-width': 1, parent: rk0});
  tag(f, sc, 120, 30, 'eau retenue en altitude', {size: 14, w: 168});
  tag(f, sc, 330, 200, 'centrale : turbine', {size: 14, w: 132});
  tag(f, sc, 552, 60, 'rocher au sommet', {size: 14, w: 130});
  f.frame();
  return {update(t){
    const tt = o.book ? 0 : t;
    flow.setAttribute('stroke-dashoffset', f2(-tt * 70)); out.setAttribute('stroke-dashoffset', f2(-tt * 40));
    setT(turb, 304, 264, tt * 240);
    const r = 19, yTop = 91 - r, vx = 60;   // centre du rocher posé sur le sommet ; vitesse horizontale au bord (px/s)
    if (o.book){ setT(rock, 540, yTop); return; }
    const c = t % 5, u = c - 1;   // roule jusqu'au bord (1 s), puis chute (parabole) jusqu'au sol, où il reste
    let x = 560, y = yTop, a = 0;
    if (u > 0 && u <= 1){ x = 560 - 90 * u; a = -(90 * u) / r * 57.3; }
    else if (u > 1){ const w = u - 1, wl = Math.sqrt(2 * (300 - r - yTop) / 300); const ww = Math.min(w, wl);
      x = 470 - vx * ww; y = yTop + 150 * ww * ww; a = -90 / r * 57.3 - 200 * ww; }
    setT(rock, x, y, a);
  }};
};

/* ---------- Activité 1, doc 1 : solide déplacé de A vers B sur un axe vertical ascendant ---------- */
SCENES.repere = (host, o = {}) => {
  const W = 560, H = 380, f = new Fig(host, W, H, {label: 'Une caisse soulevée par un treuil passe de la position A à la position B ; axe Oz vertical orienté vers le haut et état de référence'});
  const sc = f.card(f.lg('wall', [[0, '#f2f6fb'], [1, '#dde6f0']])), d = realDefs(f);
  const yO = 340, yA = 236, yB = 120, y0 = 290, xs = 300;
  f.rect(0, yO, W, H - yO, {fill: f.lg('flr', [[0, '#b9a183'], [1, '#8c6f4d']]), parent: sc});
  f.rect(0, yO, W, 4, {fill: '#d8c3a2', parent: sc});
  // potence, poulie et treuil
  f.rect(468, 22, 14, yO - 22, {fill: d.metal, parent: sc});
  f.rect(250, 18, 236, 14, {rx: 3, fill: d.metalH, stroke: '#5d6978', 'stroke-width': .8, parent: sc});
  f.circ(xs + 2, 42, 14, {fill: f.rg('pu', [[0, '#e9eef3'], [1, '#5d6978']], .4, .35, .7), stroke: '#3b4654', 'stroke-width': 1, parent: sc});
  f.circ(xs + 2, 42, 3, {fill: '#1b2a41', parent: sc});
  f.rect(430, 278, 70, 46, {rx: 6, fill: f.lg('tr', [[0, '#5d6978'], [.5, '#c3ccd6'], [1, '#3b4654']]), stroke: '#2b3440', 'stroke-width': 1, parent: sc});
  f.circ(465, 301, 15, {fill: '#6b4f2e', stroke: '#3b2a18', 'stroke-width': 1, parent: sc});
  f.T(465, 340 - 4 + 30, 'treuil', {cls: 'lbl-b', anchor: 'middle', size: 13, fill: '#ffffff', parent: sc});
  const rope1 = f.path('', {stroke: '#6b4f2e', 'stroke-width': 3, parent: sc});
  rope(f, sc, `M${xs + 16},42 L465,286`, {w: 3});
  // axe Oz
  f.line(90, yO + 20, 90, 30, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink'), parent: sc});
  f.T(102, 42, M('z', 22), {cls: 'm', size: 22, parent: sc});
  for (let y = yO; y > 50; y -= 20) f.line(84, y, 90, y, {stroke: C.ink, 'stroke-width': 1, parent: sc});
  f.T(76, yO + 6, 'O', {cls: 'lbl-b', anchor: 'end', size: 16, parent: sc});
  vec(f, sc, 90, yO, 90, yO - 44, C.ink, 2.6); vlab(f, sc, 112, yO - 20, 'k', C.ink, 20, 'middle');
  // niveaux
  const lev = (y, txt, col, dash) => { f.line(90, y, 400, y, {stroke: col, 'stroke-width': 1.3, 'stroke-dasharray': dash, parent: sc}); f.T(80, y + 7, M(txt, 20), {cls: 'm', anchor: 'end', size: 20, fill: col, parent: sc}); };
  lev(y0, 'z_0', C.green, '7 4'); lev(yA, 'z_A', C.ink, '4 4'); lev(yB, 'z_B', C.ink, '4 4');
  tag(f, sc, 190, y0 - 8, 'état de référence', {size: 13, w: 118, fill: C.green});
  f.dot(150, y0, {r: 4, fill: C.green, parent: sc}); f.T(150, y0 + 22, M('G_0', 18), {cls: 'm', anchor: 'middle', size: 18, fill: C.green, parent: sc});
  f.line(395, yA, 395, yB, {stroke: C.purple, 'stroke-width': 1.6, 'marker-start': f.mk('purple'), 'marker-end': f.mk('purple'), parent: sc});
  f.T(404, (yA + yB) / 2 + 7, M('h', 22), {cls: 'm', size: 22, fill: C.purple, parent: sc});
  // caisse : fantôme en B, caisse mobile
  const box = (op) => { const g = f.g({parent: sc}); g.setAttribute('opacity', op);
    crate(f, g, -36, 28, 72, 56, {noShadow: true}); f.dot(0, 0, {r: 4, fill: '#1b2a41', parent: g}); f.T(9, -6, 'G', {cls: 'lbl-b', size: 14, fill: '#ffffff', parent: g}); return g; };
  const gB = box(.35); setT(gB, xs, yB);
  f.T(xs + 48, yB + 6, 'B', {cls: 'lbl-b', size: 18, parent: sc}); f.T(xs + 48, yA + 6, 'A', {cls: 'lbl-b', size: 18, parent: sc});
  const gM = box(1);
  f.frame();
  return {update(t){
    let y = yA;
    if (!o.book){ const c = t % 7; y = c < 1 ? yA : c < 3.5 ? lerp(yA, yB, ease((c - 1) / 2.5)) : c < 4.5 ? yB : c < 6.5 ? lerp(yB, yA, ease((c - 4.5) / 2)) : yA; }
    setT(gM, xs, y); f.set(rope1, {d: `M${xs},${y - 28} L${xs},42`});
    gB.setAttribute('opacity', o.book || Math.abs(y - yB) > 2 ? .35 : 0);
  }};
};

/* ---------- À retenir 1 : Epp en fonction de z ---------- */
SCENES.figEpp = (host, o = {}) => {
  const W = 470, H = 330, f = new Fig(host, W, H, {label: 'Énergie potentielle de pesanteur en fonction de l’altitude : droite qui s’annule à l’altitude de référence'});
  const ox = 60, oy = 200, x0 = 190;
  f.line(ox, oy, 440, oy, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  f.line(ox, 316, ox, 26, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  f.T(436, oy + 30, M('z', 22), {cls: 'm', anchor: 'end', size: 22});
  f.T(ox + 10, 34, M('E_{\\p\\p}', 22), {cls: 'm', size: 22});
  f.T(ox - 8, oy + 22, '0', {cls: 'lbl', anchor: 'end', size: 16});
  f.line(x0, oy - 5, x0, oy + 5, {stroke: C.ink, 'stroke-width': 1.6});
  f.T(x0, oy + 30, M('z_0', 21), {cls: 'm', anchor: 'middle', size: 21, fill: C.green});
  if (o.empty) return {update(){}};
  const k = .62, Y = x => oy - k * (x - x0), xa = 70, xb = 420;
  f.path(`M${x0},${oy} L${xb},${f2(Y(xb))} L${xb},${oy} Z`, {fill: tint(C.green, .82), stroke: 'none', opacity: .8});
  f.path(`M${xa},${oy} L${xa},${f2(Y(xa))} L${x0},${oy} Z`, {fill: tint(C.red, .82), stroke: 'none', opacity: .8});
  const ln = f.line(xa, Y(xa), xb, Y(xb), {stroke: C.blue, 'stroke-width': 3});
  f.T(372, 178, M('E_{\\p\\p} > 0', 20), {cls: 'm', anchor: 'middle', size: 20, fill: C.green});
  f.T(150, 282, M('E_{\\p\\p} < 0', 20), {cls: 'm', anchor: 'middle', size: 20, fill: C.red});
  tag(f, null, 300, 296, 'état de référence : E<tspan dy="4" style="font-size:11px">pp</tspan><tspan dy="-4"> = 0 en z</tspan><tspan dy="4" style="font-size:11px">0</tspan>', {size: 14, w: 236});
  const len = Math.hypot(xb - xa, Y(xb) - Y(xa)); ln.setAttribute('stroke-dasharray', f2(len));
  return {update(t){ ln.setAttribute('stroke-dashoffset', f2(o.book ? 0 : len * (1 - clamp((t % 5) / 2, 0, 1)))); }};
};

/* ---------- Application 1 : un dictionnaire rangé sur une étagère ---------- */
SCENES.appDico = (host, o = {}) => {
  const W = 520, H = 380, f = new Fig(host, W, H, {label: 'Un dictionnaire posé sur une table à 80 cm du sol est rangé sur une étagère à 2,00 m du sol'});
  const sc = f.card(f.lg('cw', [[0, '#f6efe2'], [1, '#e8dcc6']])), d = realDefs(f);
  const yF = 350, K = 120, yT = yF - .8 * K, yS = yF - 2 * K;
  f.rect(0, yF, W, H - yF, {fill: f.lg('fl', [[0, '#a7896a'], [1, '#7a5f45']]), parent: sc});
  f.rect(0, yF, W, 3, {fill: '#cdb593', parent: sc});
  // tableau mural (décor)
  f.rect(40, 40, 170, 100, {rx: 4, fill: '#24543f', stroke: '#6b4f2e', 'stroke-width': 5, parent: sc});
  f.path('M60,80 q20,-18 40,0 t40,0', {stroke: '#ffffff', 'stroke-width': 1.5, opacity: .6, fill: 'none', parent: sc});
  // table
  shadowEll(f, sc, 160, yF + 2, 110, 5);
  f.rect(50, yT, 220, 12, {rx: 3, fill: f.lg('tb', [[0, '#d9a066'], [1, '#9c6633']]), stroke: '#6b4220', 'stroke-width': 1, parent: sc});
  [62, 248].forEach(x => f.rect(x, yT + 12, 10, yF - yT - 12, {fill: '#7a4f28', parent: sc}));
  // étagère
  f.rect(300, yS, 170, 10, {rx: 2, fill: f.lg('et', [[0, '#d9a066'], [1, '#9c6633']]), stroke: '#6b4220', 'stroke-width': 1, parent: sc});
  [318, 450].forEach(x => f.path(`M${x},${yS + 10} l0,26 l14,-26 z`, {fill: '#5d6978', parent: sc}));
  [[330, '#1f5fa8', 50], [346, '#1f9d74', 44], [362, '#6c4ab6', 52]].forEach(([x, c, h]) => f.rect(x, yS - h, 14, h, {rx: 2, fill: c, stroke: shade(c, .4), 'stroke-width': .8, parent: sc}));
  // cotes
  const cote = (x, y, txt) => { f.line(x, yF, x, y, {stroke: C.purple, 'stroke-width': 1.5, 'marker-start': f.mk('purple'), 'marker-end': f.mk('purple'), parent: sc});
    f.T(x + 8, (yF + y) / 2 + 6, M(txt, 19), {cls: 'm', size: 19, fill: C.purple, parent: sc}); };
  cote(285, yT, 'h_1'); cote(482, yS, 'h_2');
  f.line(270, yT, 292, yT, {stroke: C.purple, 'stroke-width': 1, 'stroke-dasharray': '3 3', parent: sc});
  tag(f, sc, 140, yF + 22, 'sol', {size: 13, w: 26});
  const book = (op) => { const g = f.g({parent: sc}); g.setAttribute('opacity', op);
    f.rect(-34, -20, 68, 20, {rx: 2, fill: '#fbf7ee', stroke: '#b9ad94', 'stroke-width': .8, parent: g});
    f.rect(-36, -24, 72, 5, {rx: 2, fill: '#b81f2a', parent: g}); f.rect(-36, -2, 72, 4, {rx: 2, fill: '#b81f2a', parent: g});
    f.rect(-38, -24, 6, 26, {rx: 2, fill: '#8e1520', parent: g}); return g; };
  const ghost = book(.3); setT(ghost, 422, yS);
  const bk = book(1);
  const hand = f.g({parent: sc}); fist(f, hand, 0, 0, -90, .8, {sleeve: '#3b4f6b'});   // la main qui porte le livre
  f.frame();
  return {update(t){
    let x = 170, y = yT;
    if (!o.book){ const c = t % 7, u = c < 1 ? 0 : c < 3.6 ? ease((c - 1) / 2.6) : c < 4.6 ? 1 : c < 6.6 ? 1 - ease((c - 4.6) / 2) : 0;
      x = lerp(170, 422, u); y = lerp(yT, yS, u) - 60 * Math.sin(Math.PI * u); }
    setT(bk, x, y);
    const moving = !o.book && Math.abs(y - yT) > .5 && Math.abs(y - yS) > .5; hand.setAttribute('display', moving ? 'inline' : 'none'); setT(hand, x, y + 13); ghost.setAttribute('opacity', o.book ? .3 : 0);
  }};
};

/* ---------- Situations 2 et 3, À retenir 2 et 3 : solide sur une rampe en U, avec ou sans frottement ---------- */
SCENES.rampe = (host, o = {}) => {
  const W = 660, H = 360, fr_ = !!o.frott, f = new Fig(host, W, H, {label: fr_ ? 'Solide glissant avec frottement dans une rampe en U : l’énergie mécanique diminue et se transforme en chaleur' : 'Solide glissant sans frottement dans une rampe en U : l’énergie potentielle et l’énergie cinétique s’échangent, l’énergie mécanique reste constante'});
  const sc = labScene(f, 330), d = realDefs(f);
  const xc = 215, hw = 185, Hh = 210, yb = 300, Y = x => { const u = clamp((x - xc) / hw, -1, 1); return yb - Hh * u * u; };
  let dt = '', fill = `M${xc - hw},330`;
  for (let x = xc - hw; x <= xc + hw + .1; x += 4){ dt += (x === xc - hw ? 'M' : 'L') + f2(x) + ',' + f2(Y(x)); fill += ` L${f2(x)},${f2(Y(x))}`; }
  fill += ` L${xc + hw},330 Z`;
  f.path(fill, {fill: fr_ ? f.lg('rp1', [[0, '#c9a77c'], [1, '#8c6a45']]) : f.lg('rp0', [[0, '#e9eef3'], [1, '#9aa7b6']]), stroke: 'none', parent: sc});
  f.path(dt, {stroke: fr_ ? '#5a4030' : '#3b4654', 'stroke-width': 4, parent: sc});
  if (fr_) for (let x = xc - hw + 8; x < xc + hw; x += 9) f.line(x, Y(x) + 3, x - 4, Y(x) + 9, {stroke: '#5a4030', 'stroke-width': 1, opacity: .7, parent: sc});
  f.line(20, yb, 420, yb, {stroke: C.green, 'stroke-width': 1.3, 'stroke-dasharray': '7 4', parent: sc});
  tag(f, sc, 100, yb + 22, 'E<tspan dy="4" style="font-size:10px">pp</tspan><tspan dy="-4"> = 0</tspan>', {size: 14, w: 56, fill: C.green});
  tag(f, sc, 120, 30, fr_ ? 'avec frottement' : 'sans frottement', {size: 15, w: 132, fill: fr_ ? C.red : C.blue});
  const glow = f.ell(0, 0, 26, 7, {fill: f.rg('hot', [[0, '#ffd166', .95], [.5, '#f07f1e', .7], [1, '#d62839', 0]]), stroke: 'none', filter: d.blur2, parent: sc});
  const S = blockS(f, sc, 42, 28);
  const items = [{lab: 'E_{\\C}', col: EN.c}, {lab: 'E_{\\p\\p}', col: EN.pp}, {lab: 'E_{\\m}', col: EN.m}];
  if (fr_) items.push({lab: 'Q', col: EN.q});
  const set = eBars(f, sc, fr_ ? 432 : 452, 252, 176, items, {bw: fr_ ? 30 : 34, gap: fr_ ? 18 : 22, title: 'Énergies'});
  f.frame();
  const g = 600, x0 = xc - hw * .92, sim = simTrack(Y, x0, 0, g, fr_ ? 30 : 0, fr_ ? 12 : 6), E0 = g * (yb - Y(x0)), per = fr_ ? 13.5 : sim.dt * (sim.X.length - 1);
  return {update(t){
    const tt = o.book ? (o.tb !== undefined ? o.tb : fr_ ? 2.0 : .45) : ((t % per) + per) % per;
    const k = clamp(Math.floor(tt / sim.dt), 0, sim.X.length - 1), x = sim.X[k], v = sim.V[k];
    const yp = (Y(x + .5) - Y(x - .5)), n = Math.hypot(1, yp), a = Math.atan(yp) * 180 / Math.PI;
    setT(S, x + yp / n * 1, Y(x) - 1 / n * 1, a);
    if (fr_){ glow.setAttribute('cx', f2(x)); glow.setAttribute('cy', f2(Y(x))); glow.setAttribute('opacity', f2(clamp(v / 300, 0, 1))); } else glow.setAttribute('opacity', 0);
    const ec = .5 * v * v / E0, ep = g * (yb - Y(x)) / E0, q = sim.Q[k] / E0;
    set(fr_ ? [ec, ep, ec + ep, q] : [ec, ep, ec + ep]);
  }};
};

/* ---------- Activité 2, doc 2 : chute libre d'une bille entre A et B ---------- */
SCENES.chuteBille = (host, o = {}) => {
  const W = 380, H = 420, f = new Fig(host, W, H, {label: 'Bille en chute libre passant de la position A, d’altitude zA, à la position B, d’altitude zB, soumise uniquement à son poids'});
  const sc = labScene(f, 392), d = realDefs(f);
  const xb = 220, yA = 96, yB = 318, yO = 392;
  standClamp(f, sc, 330, 392, 54, xb);
  f.rect(xb - 16, 58, 32, 26, {rx: 4, fill: f.lg('em', [[0, '#d9483b'], [1, '#8e1f16']], 0, 0, 1, 0), stroke: '#5a120c', 'stroke-width': 1, parent: sc});
  f.rect(xb - 3, 54, 6, 5, {fill: '#3b4654', parent: sc});   // fixation de l'électroaimant au bras
  f.T(xb + 22, 78, 'électroaimant', {cls: 'lbl-s', size: 12, parent: sc});
  f.line(60, yO, 60, 24, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink'), parent: sc});
  f.T(72, 34, M('z', 22), {cls: 'm', size: 22, parent: sc});
  [[yA, 'z_A', 'A'], [yB, 'z_B', 'B']].forEach(([y, z, n]) => {
    f.line(60, y, xb - 14, y, {stroke: C.ink2, 'stroke-width': 1.2, 'stroke-dasharray': '5 4', parent: sc});
    f.T(52, y + 7, M(z, 20), {cls: 'm', anchor: 'end', size: 20, parent: sc});
    f.T(xb - 30, y - 6, n, {cls: 'lbl-b', anchor: 'end', size: 17, parent: sc});
  });
  const ghosts = f.g({parent: sc});
  const bG = f.g({parent: sc}); ball(f, bG, 0, 0, 12);
  const vP = vec(f, sc, 0, 0, 0, 0, C.red, 3.2), lP = f.g({parent: sc}); vlab(f, lP, 0, 0, 'P', C.red, 21, 'start');
  if (!o.book) f.T(10, H - 8, 'animation ralentie', {cls: 'lbl-s', size: 12, fill: '#ffffff', parent: sc});
  f.frame();
  const Tf = 2.4;
  const put = y => { setT(bG, xb, y); setVec(vP, xb, y + 13, xb, y + 66); setT(lP, xb + 9, y + 54); };
  return {update(t){
    if (o.book){ put(yA); ghosts.innerHTML = ''; ball(f, ghosts, xb, yB, 12).setAttribute('opacity', .35); return; }
    const c = t % (Tf + 1.2), u = Math.min(c, Tf) / Tf, y = yA + (yB - yA) * u * u;
    put(y);
    const n = Math.floor(u * 6 + 1e-6);
    if (ghosts.childNodes.length !== n){ ghosts.innerHTML = ''; for (let i = 0; i < n; i++){ const yy = yA + (yB - yA) * (i / 6) ** 2; ball(f, ghosts, xb, yy, 12).setAttribute('opacity', .25); } }
  }};
};
