/* ===== Physique, chapitre 8 — parties 3 et 4 : potentiel électrique, énergie potentielle électrostatique ===== */

// plaque métallique verticale (vue de profil) : x centre, y haut, h hauteur, signe (couleur du bord)
function plate(f, parent, x, y, h, s){
  const g = f.g({parent});
  f.rect(x - 5, y, 10, h, {rx: 2, fill: f.lg(uid('pm'), [[0, '#7c8896'], [.45, '#eef2f6'], [1, '#5d6978']], 0, 0, 1, 0), stroke: '#3b4654', 'stroke-width': .8, parent: g});
  for (let k = 0; k < Math.floor(h / 26); k++) f.T(x + (s > 0 ? 14 : -14), y + 20 + k * 26, s > 0 ? '+' : '−', {cls: 'lbl-b', anchor: 'middle', size: 15, fill: s > 0 ? C.red : C.blue, parent: g});
  return g;
}
// générateur haute tension (boîtier + afficheur) ; renvoie les bornes [x+, y], [x−, y]
function hvGen(f, parent, x, y, w, txt){
  const g = caseBox(f, parent, x, y, w, 46, {c1: '#f2f5f8', c2: '#aeb9c6'});
  f.T(x + 10, y + 17, 'HAUTE TENSION', {cls: 'lbl-b', size: 10, fill: '#1f5fa8', parent: g});
  const t = lcd(f, g, x + 10, y + 21, 86, 20, {size: 14}); t.textContent = txt || '';
  f.circ(x + w - 46, y + 30, 7, {fill: '#d62839', stroke: '#7a0f1c', parent: g}); f.circ(x + w - 20, y + 30, 7, {fill: '#1b2430', stroke: '#000', parent: g});
  f.T(x + w - 46, y + 15, '+', {cls: 'lbl-b', anchor: 'middle', size: 12, fill: '#d62839', parent: g}); f.T(x + w - 20, y + 15, '−', {cls: 'lbl-b', anchor: 'middle', size: 12, fill: '#1b2430', parent: g});
  return [[x + w - 46, y + 30], [x + w - 20, y + 30]];
}
const wire = (f, parent, d, col) => f.path(d, {stroke: col, 'stroke-width': 3, fill: 'none', 'stroke-linejoin': 'round', parent});

/* ---------- Doc 8 : pendule chargé entre deux plaques ; repère, points A et B ---------- */
SCENES.condensateur = (host, o = {}) => {
  const W = 640, H = 380, f = new Fig(host, W, H, {label: 'Deux plaques parallèles verticales N (−) et P (+) reliées à un générateur haute tension ; une boule chargée positivement est déviée vers N'});
  const sc = labScene(f, 330);
  const xN = 150, xP = 470, yT = 70, h = 240;
  // potence isolante au-dessus des plaques
  standClamp(f, sc, 590, 330, 40, 300, {top: 24});
  plate(f, sc, xN, yT, h, -1); plate(f, sc, xP, yT, h, 1);
  f.rect(xN - 14, yT + h, 28, 330 - yT - h, {fill: '#c8b089', parent: sc}); f.rect(xP - 14, yT + h, 28, 330 - yT - h, {fill: '#c8b089', parent: sc});
  // lignes de champ (de P vers N)
  const fl = f.g({parent: sc, opacity: .5});
  for (let k = 0; k < 6; k++){ const y = yT + 22 + k * 40; f.path(`M${xP - 10},${y} L${xN + 10},${y}`, {stroke: C.red, 'stroke-width': 1.3, 'marker-end': f.mk('red'), parent: fl}); }
  // pendule
  const pv = {px: 300, py: 44, L: 160};
  const th = f.path('', {stroke: '#9c8f6a', 'stroke-width': 1.4, parent: sc}), bl = f.g({parent: sc});
  f.circ(0, 0, 11, {fill: f.rg('pbc', [[0, '#ffffff'], [.4, '#d7dde4'], [1, '#7c8896']], .35, .3, .75), stroke: '#5d6978', 'stroke-width': .8, parent: bl}); chg(f, bl, 0, 0, 1, 4.6);
  const Fv = vec(f, sc, 0, 0, 0, 0, C.red, 3); const Fl = vlab(f, sc, 0, 0, 'F', C.red, 20);
  // repère et points A, B
  const O = [xN, 300];
  vec(f, sc, O[0], O[1], O[0] + 42, O[1], C.ink, 2.4); vec(f, sc, O[0], O[1], O[0], O[1] - 42, C.ink, 2.4);
  f.path(`M${O[0]},${O[1]} L${xP + 40},${O[1]}`, {stroke: C.ink, 'stroke-width': 1, 'stroke-dasharray': '4 4', 'marker-end': f.mk('ink'), parent: sc});
  f.T(xP + 44, O[1] + 20, M('x'), {cls: 'm', anchor: 'middle', size: 19, parent: sc});
  f.T(O[0] - 10, O[1] + 18, M('O'), {cls: 'm', anchor: 'end', size: 19, parent: sc}); vlab(f, sc, O[0] + 26, O[1] + 24, 'i', C.ink, 19); vlab(f, sc, O[0] - 14, O[1] - 26, 'j', C.ink, 19);
  const A = [410, 120], B = [230, 240];
  f.path(`M${A[0]},${A[1]} L${B[0]},${B[1]}`, {stroke: C.orange, 'stroke-width': 2, 'stroke-dasharray': '7 5', parent: sc});
  f.path(`M${A[0]},${A[1]} C${A[0] - 20},${A[1] + 120} ${B[0] + 120},${B[1] + 40} ${B[0]},${B[1]}`, {stroke: C.orange, 'stroke-width': 2, 'stroke-dasharray': '2 5', parent: sc});
  [[A, 'A'], [B, 'B']].forEach(([p, n]) => { f.dot(p[0], p[1], {r: 4.5, fill: C.orange, parent: sc}); f.T(p[0] + 10, p[1] - 8, M(n, 20), {cls: 'm', size: 20, parent: sc}); });
  const mov = f.g({parent: sc}); f.circ(0, 0, 7, {fill: '#ffd166', stroke: C.orange, 'stroke-width': 1.2, parent: mov}); f.T(0, 4.5, '+', {cls: 'lbl-b', anchor: 'middle', size: 12, fill: C.orange, parent: mov});
  vlab(f, sc, 236, 58, 'E', C.red, 22);
  [[xN, 'N'], [xP, 'P']].forEach(([x, n]) => f.T(x, yT - 10, M(n, 21), {cls: 'm', anchor: 'middle', size: 21, parent: sc}));
  const [tp, tm] = hvGen(f, sc, 220, 334, 200, o.U || '');
  wire(f, sc, `M${xP + 6},${yT + h - 10} L${xP + 30},${yT + h - 10} L${xP + 30},${372} L${tp[0]},${372} L${tp[0]},${tp[1] + 7}`, '#d62839');
  wire(f, sc, `M${xN - 6},${yT + h - 10} L${xN - 30},${yT + h - 10} L${xN - 30},${376} L${tm[0]},${376} L${tm[0]},${tm[1] + 7}`, '#1b2430');
  f.frame();
  const bez = (u) => { const P0 = A, P1 = [A[0] - 20, A[1] + 120], P2 = [B[0] + 120, B[1] + 40], P3 = B, v = 1 - u;
    return [0, 1].map(i => v * v * v * P0[i] + 3 * v * v * u * P1[i] + 3 * v * u * u * P2[i] + u * u * u * P3[i]); };
  return {update(t){
    const a = o.book ? -9 : -9 * (1 - Math.exp(-t * .8) * Math.cos(t * 2.2));
    const bx = pv.px + pv.L * Math.sin(rad(a)), by = pv.py + pv.L * Math.cos(rad(a));
    th.setAttribute('d', `M${pv.px},${pv.py} L${f2(bx)},${f2(by)}`); setT(bl, bx, by);
    setVec(Fv, bx, by, bx - 46, by); Fl.setAttribute('transform', `translate(${f2(bx - 30)},${f2(by - 14)})`);
    const p = o.book ? -1 : t % 8;
    if (p < 0 || p > 7){ mov.setAttribute('opacity', 0); return; }
    mov.setAttribute('opacity', 1);
    const q = p < 3.5 ? ease(p / 3) : ease((p - 3.5) / 3), pt = p < 3.5 ? [lerp(A[0], B[0], Math.min(q, 1)), lerp(A[1], B[1], Math.min(q, 1))] : bez(Math.min(q, 1));
    setT(mov, pt[0], pt[1]);
  }};
};

/* ---------- À retenir : champ uniforme, plans équipotentiels, potentiels décroissants ---------- */
SCENES.equipot = (host, o = {}) => {
  const W = 560, H = 312, f = new Fig(host, W, H, {label: 'Champ uniforme entre deux plaques : lignes de champ de P vers N, plans équipotentiels parallèles aux plaques'});
  const xN = 110, xP = 430, yT = 50, h = 200;
  for (let k = 0; k < 6; k++){ const y = yT + 18 + k * 33; f.path(`M${xP - 10},${y} L${xN + 10},${y}`, {stroke: C.red, 'stroke-width': 1.4, 'marker-end': f.mk('red')}); }
  const V = ['V_N = 0', '100 \\V', '200 \\V', '300 \\V', 'V_P = 400 \\V'];
  [0, 1, 2, 3, 4].forEach(i => { const x = lerp(xN, xP, i / 4);
    if (i > 0 && i < 4) f.line(x, yT - 6, x, yT + h + 6, {stroke: C.blue, 'stroke-width': 1.8, 'stroke-dasharray': '7 5'});
    f.T(x, yT + h + 30, M(V[i], 16), {cls: 'm', anchor: 'middle', size: 16, fill: C.blue}); });
  plate(f, null, xN, yT, h, -1); plate(f, null, xP, yT, h, 1);
  f.T(xN, yT - 12, M('N', 20), {cls: 'm', anchor: 'middle', size: 20}); f.T(xP, yT - 12, M('P', 20), {cls: 'm', anchor: 'middle', size: 20});
  const xa = lerp(xN, xP, .5);
  [[xa, 92, 'A'], [xa, 196, 'C']].forEach(([x, y, n]) => { f.dot(x, y, {r: 4.5}); f.T(x + 9, y - 7, M(n, 19), {cls: 'm', size: 19}); });
  vec(f, null, 330, 30, 230, 30, C.red, 3.2); vlab(f, null, 360, 36, 'E', C.red, 21);
  f.T(W / 2, H - 8, 'plans équipotentiels (tirets bleus) ⟂ lignes de champ ; E vers les potentiels décroissants', {cls: 'lbl-s', anchor: 'middle', size: 12.5});
  return {update(){}};
};

/* ---------- Doc 9 : canon à électrons ---------- */
SCENES.canon = (host, o = {}) => {
  const W = 680, H = 300, f = new Fig(host, W, H, {label: 'Canon à électrons : les électrons émis par la cathode chauffée sont accélérés vers l’anode, dans le vide'});
  const sc = labScene(f, 268), d = realDefs(f);
  const cy = 120, xC = 120, xA = 330, xS = 610;
  // ampoule de verre (vide)
  f.path(`M70,${cy - 52} L470,${cy - 52} C520,${cy - 52} 560,${cy - 96} 610,${cy - 96} L622,${cy - 96} L622,${cy + 96} L610,${cy + 96} C560,${cy + 96} 520,${cy + 52} 470,${cy + 52} L70,${cy + 52} C44,${cy + 52} 44,${cy - 52} 70,${cy - 52} Z`, {fill: f.lg('amp', [[0, '#ffffff', .55], [.5, '#dfeefa', .25], [1, '#ffffff', .5]], 0, 0, 0, 1), stroke: '#8fa6bb', 'stroke-width': 1.6, parent: sc});
  f.path(`M80,${cy - 44} L460,${cy - 44}`, {stroke: '#ffffff', 'stroke-width': 3, opacity: .7, parent: sc});
  // écran fluorescent
  f.rect(xS, cy - 90, 8, 180, {fill: '#b8e6c4', stroke: '#5d9f73', 'stroke-width': .8, parent: sc});
  const spot = f.circ(xS + 2, cy, 9, {fill: '#7dff9e', filter: d.blur4, parent: sc});
  // cathode (filament chauffé) et anode percée
  f.rect(xC - 8, cy - 30, 10, 60, {rx: 2, fill: d.metal, stroke: '#3b4654', 'stroke-width': .8, parent: sc});
  f.path(`M${xC - 22},${cy - 14} q-6,4 0,8 q6,4 0,8 q-6,4 0,8`, {stroke: '#ff9a3a', 'stroke-width': 2.4, fill: 'none', parent: sc});
  f.circ(xC - 20, cy, 14, {fill: '#ff9a3a', opacity: .35, filter: d.blur4, parent: sc});
  f.rect(xA - 5, cy - 46, 10, 38, {fill: d.metal, stroke: '#3b4654', 'stroke-width': .8, parent: sc}); f.rect(xA - 5, cy + 8, 10, 38, {fill: d.metal, stroke: '#3b4654', 'stroke-width': .8, parent: sc});
  f.T(xC + 16, cy + 46, M('C', 20), {cls: 'm', anchor: 'middle', size: 20, parent: sc}); f.T(xA + 16, cy + 62, M('A', 20), {cls: 'm', anchor: 'middle', size: 20, parent: sc});
  tag(f, sc, xC - 10, cy - 66, 'cathode chauffée', {size: 13, w: 104}); tag(f, sc, xA, cy - 66, 'anode percée', {size: 13, w: 82}); tag(f, sc, 470, cy - 28, 'vide', {size: 13, w: 30});
  tag(f, sc, xS - 20, cy + 116, 'écran', {size: 13, w: 38});
  vec(f, sc, 270, cy - 26, 180, cy - 26, C.red, 3); vlab(f, sc, 226, cy - 34, 'E', C.red, 20);
  // générateur : + à l'anode, − à la cathode
  const [tp, tm] = hvGen(f, sc, 150, 214, 200, o.U || '');
  wire(f, sc, `M${xA},${cy + 46} L${xA},${200} L${tp[0]},${200} L${tp[0]},${tp[1] - 7}`, '#d62839');
  wire(f, sc, `M${xC - 3},${cy + 30} L${xC - 3},${190} L${70},${190} L${70},${282} L${tm[0]},${282} L${tm[0]},${tm[1] + 7}`, '#1b2430');
  f.T(260, 194, M('U_{AC}', 18), {cls: 'm', anchor: 'middle', size: 18, parent: sc});
  // électrons
  const R = rng(9), el = []; for (let k = 0; k < 9; k++){ const g = f.g({parent: sc}); f.circ(0, 0, 4.2, {fill: '#3f8ae0', stroke: '#123e8a', 'stroke-width': .8, parent: g}); el.push({g, ph: k / 9, dy: (R() - .5) * 6}); }
  tag(f, sc, 220, cy + 30, 'électrons', {size: 13, w: 60});
  if (!o.book) f.T(12, H - 8, 'animation très ralentie', {cls: 'lbl-s', size: 12, fill: '#ffffff', parent: sc});
  f.frame();
  // position le long du canon : accélération uniforme de C à A (x ∝ t²), puis vitesse constante (2 fois plus de distance par unité de temps)
  const pos = (u) => { const T1 = .62; if (u < T1){ const s = u / T1; return xC + 6 + (xA - xC - 6) * s * s; } const v = 2 * (xA - xC - 6) / T1; return xA + v * (u - T1); };
  return {update(t){
    el.forEach(e => { const u = o.book ? (e.ph * 1.1) % 1.05 : ((t * .32 + e.ph) % 1.05); const x = Math.min(pos(u), xS - 6);
      setT(e.g, x, cy + e.dy * (x < xA ? 1 : .5)); e.g.setAttribute('opacity', x >= xS - 6 ? 0 : 1); });
    spot.setAttribute('opacity', o.book ? .9 : .7 + .3 * Math.sin(t * 6));
  }};
};

/* ---------- Exercice 3 : déplacement d'une particule α dans un champ uniforme ---------- */
SCENES.repere = (host, o = {}) => {
  const W = 440, H = 250, f = new Fig(host, W, H, {label: 'Repère en centimètres : la particule α va de A(2 ; 0) à B(4 ; 2) dans un champ uniforme dirigé selon l’axe x'});
  const X = x => 60 + x * 60, Y = y => 200 - y * 60;
  for (let x = 0; x <= 5; x++) f.line(X(x), Y(0), X(x), Y(2.8), {stroke: '#e3eaf2', 'stroke-width': 1});
  for (let y = 0; y <= 2; y++) f.line(X(0), Y(y), X(5.6), Y(y), {stroke: '#e3eaf2', 'stroke-width': 1});
  f.path(`M${X(0)},${Y(0)} L${X(5.8)},${Y(0)}`, {stroke: C.ink, 'stroke-width': 1.4, 'marker-end': f.mk('ink')}); f.path(`M${X(0)},${Y(0)} L${X(0)},${Y(3)}`, {stroke: C.ink, 'stroke-width': 1.4, 'marker-end': f.mk('ink')});
  for (let x = 1; x <= 5; x++) f.T(X(x), Y(0) + 20, String(x), {cls: 'lbl-s', anchor: 'middle', size: 13}); for (let y = 1; y <= 2; y++) f.T(X(0) - 8, Y(y) + 5, String(y), {cls: 'lbl-s', anchor: 'end', size: 13});
  f.T(X(5.8), Y(0) + 22, M('x (\\cm)', 16), {cls: 'm', anchor: 'end', size: 16}); f.T(X(0) + 8, Y(3) + 4, M('y (\\cm)', 16), {cls: 'm', size: 16}); f.T(X(0) - 8, Y(0) + 20, M('O', 18), {cls: 'm', anchor: 'end', size: 18});
  const A = [X(2), Y(0)], B = [X(4), Y(2)];
  vec(f, null, A[0], A[1], B[0], B[1], C.orange, 2.6);
  f.dot(A[0], A[1], {r: 4.5}); f.dot(B[0], B[1], {r: 4.5}); f.T(A[0] - 6, A[1] - 10, M('A', 19), {cls: 'm', anchor: 'end', size: 19}); f.T(B[0] + 8, B[1] - 6, M('B', 19), {cls: 'm', size: 19});
  vec(f, null, X(.3), Y(2.55), X(1.6), Y(2.55), C.red, 3); vlab(f, null, X(1.9), Y(2.45), 'E', C.red, 20);
  return {update(){}};
};

/* ---------- Exercice 4 : pendule dévié entre les plaques, point M ---------- */
SCENES.ex4 = (host, o = {}) => {
  const W = 520, H = 300, f = new Fig(host, W, H, {label: 'Pendule électrostatique entre deux plaques verticales N et P distantes de 8 cm ; point M à 5 cm de N'});
  const xN = 110, xP = 430, yT = 50, h = 200, cm = (xP - xN) / 8;
  for (let k = 0; k < 6; k++){ const y = yT + 18 + k * 33; f.path(`M${xP - 10},${y} L${xN + 10},${y}`, {stroke: C.red, 'stroke-width': 1.2, opacity: .45, 'marker-end': f.mk('red')}); }
  plate(f, null, xN, yT, h, -1); plate(f, null, xP, yT, h, 1);
  f.T(xN, yT - 12, M('N', 20), {cls: 'm', anchor: 'middle', size: 20}); f.T(xP, yT - 12, M('P', 20), {cls: 'm', anchor: 'middle', size: 20});
  const px = 300, py = 40, L = 130, a = -5.7 * 2.2;   // angle exagéré pour la lisibilité
  const bx = px + L * Math.sin(rad(a)), by = py + L * Math.cos(rad(a));
  f.line(px - 30, py, px + 30, py, {stroke: '#3b4654', 'stroke-width': 4});
  f.line(px, py, px, py + L + 16, {stroke: '#9fb7cf', 'stroke-width': 1.1, 'stroke-dasharray': '4 4'});
  f.line(px, py, bx, by, {stroke: '#9c8f6a', 'stroke-width': 1.4});
  f.angleArc(px, py, 60, -90, -90 + a, C.green); f.T(px - 24, py + 98, M('α', 19), {cls: 'm', anchor: 'end', size: 19, fill: C.green});
  ball(f, null, bx, by, 10); chg(f, null, bx, by, 1, 4.2);
  const xM = xN + 5 * cm, yM = 214; f.dot(xM, yM, {r: 4.5}); f.T(xM + 8, yM - 8, M('M', 19), {cls: 'm', size: 19});
  f.path(`M${xN},${yT + h + 22} L${xM},${yT + h + 22}`, {stroke: C.ink2, 'stroke-width': 1.1, 'marker-end': f.mk('ink2'), 'marker-start': f.mk('ink2')}); f.T((xN + xM) / 2, yT + h + 16, M('x_M = 5,0 \\cm', 15), {cls: 'm', anchor: 'middle', size: 15});
  f.path(`M${xN},${yT + h + 42} L${xP},${yT + h + 42}`, {stroke: C.ink2, 'stroke-width': 1.1, 'marker-end': f.mk('ink2'), 'marker-start': f.mk('ink2')}); f.T((xN + xP) / 2, yT + h + 38, M('d = 8,0 \\cm', 15), {cls: 'm', anchor: 'middle', size: 15});
  f.T(W / 2 + 90, 24, M('U_{PN} = 400 \\V', 16), {cls: 'm', anchor: 'middle', size: 16});
  return {update(){}};
};
