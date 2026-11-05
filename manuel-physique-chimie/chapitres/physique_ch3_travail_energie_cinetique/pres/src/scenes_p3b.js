/* ===== Physique, chapitre 3 — parties 3 et 4, applications et exercices ===== */

// palier en fonte (support d'axe) : axe en (x, yAxe), pied sur la paillasse en yBas
function pillar(f, parent, x, yAxe, yBas, w = 40){
  const g = f.g({parent});
  f.path(`M${x - w * .32},${yAxe} L${x - w * .6},${yBas - 10} L${x + w * .6},${yBas - 10} L${x + w * .32},${yAxe} Z`, {fill: f.lg(uid('pl'), [[0, '#5d6978'], [.4, '#8a96a8'], [1, '#3b4654']], 0, 0, 1, 0), stroke: '#2b3440', 'stroke-width': 1, parent: g});
  f.rect(x - w, yBas - 12, 2 * w, 12, {rx: 3, fill: '#2b3440', parent: g});
  f.circ(x, yAxe, w * .42, {fill: '#3b4654', stroke: '#2b3440', 'stroke-width': 1, parent: g});
  return g;
}
// flèche courbe (rotation ou couple) : centre, rayon, angles en degrés (sens trigonométrique si a2 > a1)
function curvedArrow(f, parent, cx, cy, r, a1, a2, col = C.green, w = 2.6){
  const mk = {[C.green]: 'green', [C.red]: 'red', [C.purple]: 'purple', [C.orange]: 'orange', [C.blue]: 'blue'}[col] || 'ink';
  return f.path(arcD(cx, cy, r, a1, a2), {stroke: col, 'stroke-width': w, 'marker-end': f.mk(mk), parent});
}
// flèche de vecteur au-dessus du caractère n° idx d'un texte déjà placé
function arrowOver(f, parent, textEl, idx, col = C.ink){
  try {
    const b = textEl.getExtentOfChar(idx), y = b.y - 2, x0 = b.x + 1, x1 = b.x + b.width + 1;
    f.path(`M${f2(x0)},${f2(y)} L${f2(x1)},${f2(y)} M${f2(x1 - 3.5)},${f2(y - 3)} L${f2(x1)},${f2(y)} L${f2(x1 - 3.5)},${f2(y + 3)}`, {stroke: col, 'stroke-width': 1.4, parent});
  } catch (e) {}
}

/* ---------- Activité 3, doc 6 : chute libre et cellule photoélectrique ---------- */
SCENES.chuteLibre = (host, o = {}) => {
  const W = 460, H = 530, f = new Fig(host, W, H, {label: 'Une bille retenue par un électroaimant tombe et traverse le faisceau d’une cellule photoélectrique reliée à un chronomètre'});
  const sc = labScene(f, 500), d = realDefs(f);
  const X = 200, Y0 = 101, K = 260, HS = [.2, .4, .6, .8, 1, 1.2, 1.4], DT = ['8,70', '6,38', '5,18', '4,48', '4,05', '3,70', '3,48'];
  standClamp(f, sc, 74, 500, 58, X, {top: 26});
  // électroaimant
  f.rect(X - 17, 62, 34, 28, {rx: 4, fill: f.lg('coil', [[0, '#a35a1f'], [.45, '#e9a46a'], [1, '#7a3f12']], 0, 0, 1, 0), stroke: '#5a2e0c', 'stroke-width': 1, parent: sc});
  for (let y = 66; y < 88; y += 4) f.line(X - 16, y, X + 16, y, {stroke: '#7a3f12', 'stroke-width': .8, opacity: .7, parent: sc});
  f.rect(X - 8, 88, 16, 4, {fill: '#5d6978', parent: sc});
  f.path(`M${X + 17},70 C${X + 60},66 ${X + 90},30 ${W + 10},26`, {stroke: '#d62839', 'stroke-width': 2.4, parent: sc});
  // règle graduée
  const rx = 268;
  f.rect(rx, Y0 - 6, 14, 1.42 * K + 18, {rx: 2, fill: f.lg('rule', [[0, '#fff3c4'], [1, '#e8cf7a']], 0, 0, 1, 0), stroke: '#a68a2c', 'stroke-width': .8, parent: sc});
  for (let k = 0; k <= 14; k++){ const y = Y0 + k * .1 * K; f.line(rx, y, rx + (k % 2 ? 6 : 10), y, {stroke: '#5a4a1a', 'stroke-width': 1, parent: sc}); }
  HS.forEach((h, i) => f.T(rx + 20, Y0 + h * K + 6, M('A_' + (i + 1), 16), {cls: 'm', size: 16, parent: sc}));
  f.line(X + 10, Y0, rx, Y0, {stroke: '#8a96a8', 'stroke-width': 1, 'stroke-dasharray': '3 3', parent: sc});
  // cote h
  const hArr = f.path('', {stroke: C.ink, 'stroke-width': 1.4, 'marker-start': f.mk('ink'), 'marker-end': f.mk('ink'), parent: sc});
  const hLab = f.T(0, 0, M('h', 20), {cls: 'm', anchor: 'end', size: 20, parent: sc});
  // bille
  const bl = f.g({parent: sc}); ball(f, bl, 0, 0, 9);
  // cellule photoélectrique (fourche en U vue en perspective)
  const gate = f.g({parent: sc});
  f.path(`M-33,-6 L-18,-26 L48,-26 L33,-6`, {stroke: '#5d6978', 'stroke-width': 8, 'stroke-linejoin': 'round', fill: 'none', parent: gate});
  f.path(`M-33,-6 L-18,-26 L48,-26 L33,-6`, {stroke: '#8a96a8', 'stroke-width': 2, 'stroke-linejoin': 'round', fill: 'none', parent: gate});
  f.rect(-42, -14, 18, 22, {rx: 3, fill: f.lg('gL', [[0, '#5d6978'], [1, '#2b3440']]), parent: gate}); f.rect(24, -14, 18, 22, {rx: 3, fill: f.lg('gR', [[0, '#5d6978'], [1, '#2b3440']]), parent: gate});
  f.circ(-24, -3, 2.6, {fill: '#ff5b5b', stroke: 'none', parent: gate});
  const beam = f.line(-24, -3, 24, -3, {stroke: '#ff3b3b', 'stroke-width': 1.6, 'stroke-dasharray': '4 3', parent: gate});
  const cable = f.path('', {stroke: '#1b2a41', 'stroke-width': 2.2, parent: sc});
  const chrono = display(f, sc, 322, 160, 126, 66, 'CHRONOMÈTRE');
  f.T(385, 244, M('Δt', 17), {cls: 'm', anchor: 'middle', size: 17, parent: sc});
  if (!o.book) f.T(322, 270, 'animation ralentie', {cls: 'lbl-s', size: 12, parent: sc});
  f.frame();
  const S = 2.5, tf = Math.sqrt(2 * (500 - 9 - Y0) / K / 10) * S, per = tf + 1.1;
  const place = (k, yb) => {
    const yg = Y0 + HS[k] * K + 3;
    setT(gate, X, yg);
    f.set(cable, {d: `M${X + 42},${yg} C${X + 90},${yg} ${306},${232} ${322},${210}`});
    f.set(hArr, {d: `M${X - 52},${Y0} L${X - 52},${yg - 3}`}); f.set(hLab, {x: X - 58, y: (Y0 + yg) / 2 + 7});
    setT(bl, X, yb);
    return yg;
  };
  return {update(t){
    if (o.book){ place(2, Y0 + 70); chrono.textContent = '0,00 ms'; return; }
    const n = Math.floor(t / per) % 7, tt = t % per, fall = Math.min(tt, tf) / S;
    const yb = Math.min(500 - 9, Y0 + .5 * 10 * fall * fall * K);
    const yg = place(n, yb);
    const passed = yb > yg + 9;
    chrono.textContent = passed ? DT[n] + ' ms' : '0,00 ms';
    beam.setAttribute('opacity', Math.abs(yb - yg + 3) < 9 ? .15 : 1);
  }};
};

/* ---------- Activité 3, doc 7 : mobile autoporteur sur une table inclinée ---------- */
SCENES.tableAir = (host, o = {}) => {
  const W = 560, H = 330, f = new Fig(host, W, H, {label: 'Mobile autoporteur lâché sans vitesse sur une table à coussin d’air inclinée d’un angle alpha'});
  const sc = labScene(f, 296), d = realDefs(f);
  const A = 10, ca = Math.cos(rad(A)), sa = Math.sin(rad(A)), P0 = [52, 112], L = 470;
  const at = (s, n = 0) => [P0[0] + s * ca + n * sa, P0[1] + s * sa - n * ca];   // n : distance au-dessus de la table
  const P1 = at(L);
  // pieds et cale
  f.rect(at(30)[0] - 6, at(30)[1] + 12, 12, 296 - at(30)[1] - 12 - 30, {fill: d.metal, parent: sc});
  f.rect(at(30)[0] - 26, 266, 52, 30, {rx: 2, fill: f.lg('cale', [[0, '#d9a066'], [1, '#9c6633']]), stroke: '#6b4220', 'stroke-width': 1, parent: sc});
  f.T(at(30)[0], 286, 'cale', {cls: 'lbl-b', anchor: 'middle', size: 13, fill: '#ffffff', parent: sc});
  f.rect(P1[0] - 36, P1[1] + 12, 12, 296 - P1[1] - 12, {fill: d.metal, parent: sc});
  shadowEll(f, sc, (P0[0] + P1[0]) / 2, 298, 240, 5, .25);
  // plateau (verre épais)
  const pl = f.g({parent: sc}); pl.setAttribute('transform', `translate(${P0[0]},${P0[1]}) rotate(${A})`);
  f.rect(0, 0, L, 14, {rx: 2, fill: f.lg('glass', [[0, '#e9f4fb'], [.5, '#bcd6e6'], [1, '#8fb3c9']]), stroke: '#5d7f96', 'stroke-width': 1, parent: pl});
  f.rect(0, 0, L, 3, {fill: '#ffffff', opacity: .7, parent: pl});
  f.rect(0, -5, L, 5, {fill: '#fffdf3', stroke: '#c9c3a8', 'stroke-width': .6, parent: pl});
  // angle alpha
  f.line(P0[0], P0[1], P0[0] + 112, P0[1], {stroke: C.ink2, 'stroke-width': 1.3, 'stroke-dasharray': '6 4', parent: sc});
  f.angleArc(P0[0], P0[1], 92, -A, 0, C.green, {noArrow: true, w: 2.2, parent: sc});
  f.T(P0[0] + 100, P0[1] + 14, M('α', 22), {cls: 'm', size: 22, fill: C.green, parent: sc});
  // trace des positions (animation)
  const dots = f.g({parent: sc});
  // mobile autoporteur
  const mob = f.g({parent: sc});
  f.rect(-30, -26, 60, 21, {rx: 6, fill: f.lg('pk', [[0, '#5d6978'], [.5, '#c3ccd6'], [1, '#3b4654']], 0, 0, 1, 0), stroke: '#2b3440', 'stroke-width': 1, parent: mob});
  f.rect(-33, -7, 66, 7, {rx: 3, fill: '#1b2a41', parent: mob});
  f.rect(-5, -36, 10, 11, {fill: '#3b4654', parent: mob});
  f.circ(0, -15, 3.5, {fill: '#ffffff', stroke: '#1b2a41', 'stroke-width': 1.2, parent: mob});
  const hose = f.path('', {stroke: '#2b3440', 'stroke-width': 7, parent: sc});
  const hose2 = f.path('', {stroke: '#6f7c8c', 'stroke-width': 3, parent: sc});
  // forces (pour la correction)
  const forces = f.g({parent: sc}); if (!o.forces) forces.setAttribute('display', 'none');
  const vP = vec(f, forces, 0, 0, 0, 0, C.red, 3.4), vR = vec(f, forces, 0, 0, 0, 0, C.red, 3.4);
  const lP = f.g({parent: forces}), lR = f.g({parent: forces});
  vlab(f, lP, 0, 0, 'P', C.red, 22, 'start'); vlab(f, lR, 0, 0, 'R', C.red, 22, 'end');
  tag(f, sc, 440, 34, 'table à coussin d’air', {size: 14, w: 160});
  f.frame();
  const acc = 9.81 * sa * 260, S = 2.2, Tm = Math.sqrt(2 * 240 / acc) * S;
  const pos = s => {
    const [x, y] = at(s, 5); setT(mob, x, y, A);
    const [hx, hy] = at(s, 41);
    f.set(hose, {d: `M${f2(hx)},${f2(hy)} C${f2(hx - 4)},${f2(hy - 50)} ${f2(hx - 90)},-10 ${f2(hx - 170)},-30`}); f.set(hose2, {d: hose.getAttribute('d')});
    const [gx, gy] = at(s, 20);
    setVec(vP, gx, gy, gx, gy + 80); setT(lP, gx + 10, gy + 82);
    const [rx2, ry2] = at(s, 20 + 79);
    setVec(vR, gx, gy, rx2, ry2); setT(lR, rx2 - 8, ry2 + 4);
  };
  return {update(t){
    if (o.book || o.forces){ pos(o.forces ? 260 : 190); return; }
    const tt = t % (Tm + 1.4), u = Math.min(tt, Tm) / S, s = 190 + .5 * acc * u * u;
    pos(s);
    const n = Math.floor(u / .12);
    if (dots.childNodes.length !== n + 1){
      dots.innerHTML = '';
      for (let i = 0; i <= n; i++){ const si = 190 + .5 * acc * (i * .12) ** 2; const [x, y] = at(si, 2.5); f.circ(x, y, 2.2, {fill: '#1b2a41', stroke: 'none', parent: dots}); }
    }
  }};
};

/* ---------- Activité 3, doc 8 : enregistrement à l'échelle 1 (60 px = 1 cm) ---------- */
SCENES.enregistrement = (host, o = {}) => {
  const W = 930, H = 130, f = new Fig(host, W, H, {label: 'Enregistrement des positions M0 à M7 du centre d’inertie du mobile, à intervalles de temps égaux, à l’échelle 1'});
  const S = [0, .3, 1.2, 2.7, 4.8, 7.4, 10.7, 14.6], X = s => 30 + 60 * s, Y = 60;
  const sc = f.card('#fffdf7');
  f.line(18, Y, W - 18, Y, {stroke: '#c9c3a8', 'stroke-width': 1, 'stroke-dasharray': '2 4', parent: sc});
  const pts = S.map((s, i) => {
    const g = f.g({parent: sc});
    f.circ(X(s), Y, 6.5, {fill: 'none', stroke: '#1b2a41', 'stroke-width': 1.1, parent: g});
    f.dot(X(s), Y, {r: 2.4, fill: '#1b2a41', parent: g});
    f.T(X(s), i % 2 ? Y + 31 : Y - 16, M('M_' + i, 18), {cls: 'm', anchor: 'middle', size: 18, parent: g});
    return g;
  });
  f.line(X(13.6), 112, X(14.6), 112, {stroke: C.ink, 'stroke-width': 2, parent: sc});
  [X(13.6), X(14.6)].forEach(x => f.line(x, 106, x, 118, {stroke: C.ink, 'stroke-width': 2, parent: sc}));
  f.T(X(13.6) - 10, 118, '1 cm', {cls: 'lbl-b', anchor: 'end', size: 15, parent: sc});
  vec(f, sc, 30, 112, 140, 112, C.ink2, 1.8); f.T(150, 117, 'sens du mouvement', {cls: 'lbl-s', size: 13, parent: sc});
  const puck = f.circ(0, Y, 13, {fill: f.rg('pkk', [[0, '#c3ccd6', .8], [1, '#3b4654', .8]], .4, .35, .7), stroke: '#1b2a41', 'stroke-width': 1, parent: sc});
  f.frame();
  return {update(t){
    if (o.book){ pts.forEach(g => g.setAttribute('opacity', 1)); puck.setAttribute('display', 'none'); return; }
    const per = 7 * .55 + 1.6, tt = t % per, k = Math.min(tt / .55, 7);
    pts.forEach((g, i) => g.setAttribute('opacity', i <= k + 1e-6 ? 1 : 0));
    const i = Math.min(6, Math.floor(k)), sk = k >= 7 ? S[7] : S[i] + (S[i + 1] - S[i]) * (k - i);
    puck.setAttribute('cx', f2(X(sk))); puck.setAttribute('display', tt > 7 * .55 + .9 ? 'none' : 'inline');
  }};
};

/* ---------- Graphes Ec = f(W(P)) ---------- */
function graphScene(host, o, G){
  const W = 520, H = 400, f = new Fig(host, W, H, {label: G.label});
  const ox = 84, oy = 340, LX = 396, LY = 296;
  const X = v => ox + v / G.xmax * LX, Y = v => oy - v / G.ymax * LY;
  for (let v = 0; v <= G.xmax + 1e-9; v += G.dx / 2) f.line(X(v), oy, X(v), oy - LY, {stroke: Math.abs(v / G.dx - Math.round(v / G.dx)) < 1e-6 ? '#c9d6e6' : '#e6edf5', 'stroke-width': 1});
  for (let v = 0; v <= G.ymax + 1e-9; v += G.dy / 2) f.line(ox, Y(v), ox + LX, Y(v), {stroke: Math.abs(v / G.dy - Math.round(v / G.dy)) < 1e-6 ? '#c9d6e6' : '#e6edf5', 'stroke-width': 1});
  f.line(ox, oy, ox + LX + 22, oy, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  f.line(ox, oy, ox, oy - LY - 22, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  for (let v = G.dx; v <= G.xmax + 1e-9; v += G.dx){ f.line(X(v), oy, X(v), oy + 5, {stroke: C.ink, 'stroke-width': 1.4}); f.T(X(v), oy + 24, fr(v, G.nx), {cls: 'lbl', anchor: 'middle', size: 16}); }
  for (let v = G.dy; v <= G.ymax + 1e-9; v += G.dy){ f.line(ox - 5, Y(v), ox, Y(v), {stroke: C.ink, 'stroke-width': 1.4}); f.T(ox - 9, Y(v) + 6, fr(v, G.ny), {cls: 'lbl', anchor: 'end', size: 16}); }
  f.T(ox - 9, oy + 22, '0', {cls: 'lbl', anchor: 'end', size: 16});
  const xt = f.T(ox + LX + 20, oy - 12, M(G.xtitle, 22), {cls: 'm', anchor: 'end', size: 22});
  const yt = f.T(ox + 8, oy - LY - 14, M(G.ytitle, 22), {cls: 'm', anchor: 'start', size: 22});
  requestAnimationFrame(() => arrowOver(f, null, xt, 2, C.ink));
  if (o.empty) return {update(){}};
  const n = G.x.length, mx = G.x.reduce((a, b) => a + b) / n, my = G.y.reduce((a, b) => a + b) / n;
  const a = G.x.reduce((s, x, i) => s + (x - mx) * (G.y[i] - my), 0) / G.x.reduce((s, x) => s + (x - mx) ** 2, 0), b = my - a * mx;
  const x2 = G.xmax * .98, line = f.line(X(0), Y(b), X(x2), Y(a * x2 + b), {stroke: C.red, 'stroke-width': 2.4});
  const pts = G.x.map((x, i) => { const g = f.g({}); const px = X(x), py = Y(G.y[i]);
    f.path(`M${f2(px - 6)},${f2(py - 6)} L${f2(px + 6)},${f2(py + 6)} M${f2(px - 6)},${f2(py + 6)} L${f2(px + 6)},${f2(py - 6)}`, {stroke: C.blue, 'stroke-width': 2.4, parent: g}); return g; });
  const bl = f.g({}); f.circ(X(0), Y(b), 5, {fill: '#ffffff', stroke: C.red, 'stroke-width': 2, parent: bl});
  f.T(X(0) + G.boff[0], Y(b) + G.boff[1], M(G.blab, 20), {cls: 'm', anchor: G.boff[2] || 'start', size: 20, fill: C.red, parent: bl});
  const len = Math.hypot(X(x2) - X(0), Y(a * x2 + b) - Y(b)); line.setAttribute('stroke-dasharray', f2(len));
  return {update(t){
    const tt = o.book ? 99 : t % (n * .45 + 4);
    pts.forEach((g, i) => g.setAttribute('opacity', tt > i * .45 ? 1 : 0));
    const k = clamp((tt - n * .45) / 1.4, 0, 1);
    line.setAttribute('stroke-dashoffset', f2(len * (1 - k))); bl.setAttribute('opacity', k >= 1 ? 1 : 0);
  }};
}
SCENES.graphChute = (host, o = {}) => graphScene(host, o, {label: 'Énergie cinétique de la bille en fonction du travail du poids : droite de coefficient directeur voisin de 1',
  x: [0, .048, .096, .144, .192, .240, .288], y: [.051, .0955, .145, .194, .237, .284, .321],
  xmax: .32, ymax: .36, dx: .04, dy: .04, nx: 2, ny: 2, xtitle: 'W(P) (\\J)', ytitle: 'E_{\\C} (\\J)', blab: 'E_{\\C1}', boff: [12, 20]});
SCENES.graphTable = (host, o = {}) => graphScene(host, o, {label: 'Énergie cinétique du mobile en fonction du travail du poids : droite de coefficient directeur voisin de 1',
  x: [0, 11.4, 30.5, 57.2, 90.2, 132], y: [3.66, 14.6, 32.9, 56.1, 88.5, 132],
  xmax: 140, ymax: 140, dx: 20, dy: 20, nx: 0, ny: 0, xtitle: 'W(P) (10^{−3} \\J)', ytitle: 'E_{\\C} (10^{−3} \\J)', blab: 'E_{\\C1}', boff: [-10, 6, 'end']});

/* ---------- Application 3 : un skieur sur une piste inclinée ---------- */
SCENES.skieur = (host, o = {}) => {
  const W = 540, H = 330, f = new Fig(host, W, H, {label: 'Un skieur part sans vitesse du point A et descend une piste rectiligne inclinée de 20 degrés jusqu’au point B'});
  const sc = outdoor(f, H, {noHills: true});
  f.path(`M0,150 L80,70 L150,120 L230,40 L330,110 L420,50 L540,120 L540,240 L0,240 Z`, {fill: '#c7d6e6', stroke: 'none', parent: sc});
  f.path(`M80,70 L100,90 L88,88 L70,80 Z M230,40 L255,64 L238,60 L220,52 Z M420,50 L446,74 L430,70 L410,60 Z`, {fill: '#ffffff', stroke: 'none', parent: sc});
  const A = [70, 92], ang = 20, ca = Math.cos(rad(ang)), sa = Math.sin(rad(ang)), Lp = 400, B = [A[0] + Lp * ca, A[1] + Lp * sa];
  f.path(`M0,${A[1]} L${A[0]},${A[1]} L${f2(B[0])},${f2(B[1])} L${W},${f2(B[1])} L${W},${H} L0,${H} Z`, {fill: f.lg('snow', [[0, '#ffffff'], [1, '#d6e4f1']]), stroke: '#b9cde0', 'stroke-width': 1.2, parent: sc});
  [[470, B[1]], [505, B[1]], [30, A[1]]].forEach(([x, y]) => { f.rect(x - 3, y - 14, 6, 14, {fill: '#6b4f2e', parent: sc}); f.path(`M${x},${y - 56} L${x + 15},${y - 12} L${x - 15},${y - 12} Z`, {fill: '#2f6e4a', stroke: 'none', parent: sc}); });
  f.line(A[0], A[1], A[0] + 210, A[1], {stroke: C.ink2, 'stroke-width': 1.3, 'stroke-dasharray': '6 4', parent: sc});
  f.angleArc(A[0], A[1], 150, -ang, 0, C.green, {noArrow: true, w: 2.2, parent: sc});
  f.T(A[0] + 162, A[1] + 34, M('α', 22), {cls: 'm', size: 22, fill: C.green, parent: sc});
  [[A, 'A', -4, 28], [B, 'B', 4, 26]].forEach(([p, n, dx, dy]) => { f.dot(p[0], p[1], {r: 5, parent: sc}); f.T(p[0] + dx, p[1] + dy, n, {cls: 'lbl-b', anchor: 'middle', size: 18, parent: sc}); });
  if (!o.plain){
    tag(f, sc, 300, 300, M('m = 80 \\k\\g ; α = 20° ; AB = 50 \\m', 17), {cls: 'm', size: 17, w: 280});
  }
  const sk = f.g({parent: sc}), vV = vec(f, sc, 0, 0, 0, 0, C.orange, 3.2), lV = f.g({parent: sc}); vlab(f, lV, 0, 0, 'V', '#c45f00', 20, 'start');
  skier(f, sk, 0, 0, .62, ang, {col: '#d62839'});
  f.frame();
  const acc = 9.8 * sa, Lm = 50, Tr = Math.sqrt(2 * Lm / acc), S = 3.4 / Tr;
  return {update(t){
    let u, v;
    if (o.book){ u = 0; v = 0; } else { const tt = t % (3.4 + 1.2); const tr = Math.min(tt, 3.4) / S; u = .5 * acc * tr * tr / Lm; v = acc * tr; }
    const d = 10 + u * (Lp - 60), x = A[0] + d * ca, y = A[1] + d * sa;
    sk.setAttribute('transform', `translate(${f2(x)},${f2(y)})`);
    const g0 = [x + 40 * sa, y - 40 * ca], L = v * 4.2;
    vV.setAttribute('display', L > 4 ? 'inline' : 'none'); lV.setAttribute('display', L > 4 ? 'inline' : 'none');
    setVec(vV, g0[0], g0[1], g0[0] + L * ca, g0[1] + L * sa); setT(lV, g0[0] + L * ca + 4, g0[1] + L * sa - 8);
  }};
};

/* ---------- Activité 4, doc 9 : volant entraîné par un moteur ---------- */
SCENES.volant = (host, o = {}) => {
  const W = 440, H = 350, f = new Fig(host, W, H, {label: 'Volant d’inertie en fonte tournant autour d’un axe fixe, entraîné par un moteur électrique par l’intermédiaire d’une courroie'});
  const sc = labScene(f, 316), d = realDefs(f);
  const cx = 170, cy = 158, R = 120, mc = [362, 262], rp = 30, rm = 15;
  pillar(f, sc, cx, cy, 316, 44);
  shadowEll(f, sc, cx + 8, cy + 14, R, R * .95, .2);
  const wh = f.g({parent: sc});
  f.circ(0, 0, R - 11, {fill: 'none', stroke: f.lg('rim', [[0, '#8a96a8'], [.5, '#3b4654'], [1, '#1b2430']]), 'stroke-width': 22, parent: wh});
  f.circ(0, 0, R, {fill: 'none', stroke: '#1b2430', 'stroke-width': 1.4, parent: wh}); f.circ(0, 0, R - 22, {fill: 'none', stroke: '#1b2430', 'stroke-width': 1.2, parent: wh});
  for (let k = 0; k < 6; k++){ const b = f.g({parent: wh}); b.setAttribute('transform', `rotate(${k * 60})`);
    f.path(`M0,-9 L${R - 20},-6 L${R - 20},6 L0,9 Z`, {fill: f.lg('spk', [[0, '#6f7c8c'], [1, '#2b3440']]), stroke: '#1b2430', 'stroke-width': .8, parent: b}); }
  f.circ(0, 0, rp, {fill: f.rg('hub', [[0, '#c3ccd6'], [1, '#3b4654']], .4, .35, .7), stroke: '#1b2430', 'stroke-width': 1.2, parent: wh});
  f.rect(R - 30, -7, 14, 14, {rx: 3, fill: '#d62839', parent: wh});
  setT(wh, cx, cy);
  // moteur électrique et courroie
  const dx = mc[0] - cx, dy = mc[1] - cy, dd = Math.hypot(dx, dy), th = Math.atan2(dy, dx), be = Math.acos((rp - rm) / dd);
  const tp = (c, r, s) => [c[0] + r * Math.cos(th + s * be), c[1] + r * Math.sin(th + s * be)];
  [1, -1].forEach(s => { const a = tp([cx, cy], rp + 2, s), b = tp(mc, rm + 2, s); f.line(a[0], a[1], b[0], b[1], {stroke: '#1b1f24', 'stroke-width': 4, parent: sc}); });
  caseBox(f, sc, mc[0] - 50, mc[1] - 40, 100, 80, {c1: '#4f7fbf', c2: '#1f4f8f'});
  for (let x = mc[0] - 40; x <= mc[0] + 40; x += 10) f.line(x, mc[1] - 34, x, mc[1] + 34, {stroke: '#173f73', 'stroke-width': 2, opacity: .6, parent: sc});
  f.rect(mc[0] - 54, mc[1] + 40, 108, 10, {rx: 3, fill: '#2b3440', parent: sc});
  const mp = f.g({parent: sc}); f.circ(0, 0, rm + 2, {fill: '#1b1f24', stroke: 'none', parent: mp}); f.circ(0, 0, rm - 3, {fill: d.metal, stroke: 'none', parent: mp}); f.line(0, 0, rm - 4, 0, {stroke: '#3b4654', 'stroke-width': 2, parent: mp});
  f.circ(cx, cy, rp + 2, {fill: 'none', stroke: '#1b1f24', 'stroke-width': 4, parent: sc});
  tag(f, sc, mc[0], mc[1] + 74, 'moteur', {size: 14, w: 56});
  f.circ(cx, cy, 6, {fill: '#ffffff', stroke: '#1b2a41', 'stroke-width': 1.6, parent: sc});
  f.T(cx - 34, cy + 4, M('(Δ)', 18), {cls: 'm', anchor: 'end', size: 18, fill: '#ffffff', parent: sc});
  curvedArrow(f, sc, cx, cy, R + 16, 130, 60, C.green, 2.8);
  f.T(cx + 92, cy - R + 14, M('ω', 22), {cls: 'm', size: 22, fill: C.green, parent: sc});
  tag(f, sc, 74, 32, M('J_{Δ}', 19), {cls: 'm', size: 19, w: 26});
  const disp = o.book ? null : display(f, sc, 300, 22, 130, 62, 'VITESSE ANGULAIRE');
  if (!o.book) f.T(300, 104, 'animation ralentie', {cls: 'lbl-s', size: 12, parent: sc});
  f.frame();
  let th0 = 0;
  return {update(t, dt = 0){
    const tt = t % 8, w = o.book ? 0 : 6 + 14 * ease(seg(tt, .5, 6.5));
    th0 += (dt || 0) * w * 10;
    setT(wh, cx, cy, o.book ? 8 : th0); setT(mp, mc[0], mc[1], o.book ? 0 : th0 * rp / rm);
    if (disp) disp.textContent = fr(w, 1) + ' rad/s';
  }};
};

/* ---------- Application 4 : poulie mise en rotation par un couple moteur ---------- */
SCENES.poulieApp = (host, o = {}) => {
  const W = 440, H = 330, f = new Fig(host, W, H, {label: 'Poulie homogène de 2,0 kg et de rayon 10 cm soumise à un couple moteur de moment 0,50 newton mètre pendant 10 tours'});
  const sc = labScene(f, 300), d = realDefs(f);
  const cx = 160, cy = 150, R = 100;
  pillar(f, sc, cx, cy, 300, 36);
  shadowEll(f, sc, cx + 6, cy + 12, R, R * .95, .2);
  const p = f.g({parent: sc});
  f.circ(0, 0, R, {fill: f.rg('pou', [[0, '#eef2f6'], [.85, '#aeb9c6'], [1, '#6f7c8c']], .4, .35, .75), stroke: '#3b4654', 'stroke-width': 1.6, parent: p});
  f.circ(0, 0, R - 9, {fill: 'none', stroke: '#6f7c8c', 'stroke-width': 3, parent: p});
  f.circ(0, 0, R - 26, {fill: 'none', stroke: '#c3ccd6', 'stroke-width': 1.2, parent: p});
  for (let k = 0; k < 4; k++){ const [x, y] = P(0, 0, R * .55, k * 90); f.circ(x, y, 13, {fill: '#5d6978', stroke: '#3b4654', 'stroke-width': 1, parent: p}); }
  f.rect(-5, -R + 2, 10, 20, {rx: 3, fill: '#d62839', parent: p});
  f.circ(0, 0, 16, {fill: '#3b4654', stroke: 'none', parent: p});
  f.circ(cx, cy, 5, {fill: '#ffffff', stroke: '#1b2a41', 'stroke-width': 1.5, parent: sc});
  f.T(cx + 20, cy + 36, M('(Δ)', 18), {cls: 'm', size: 18, parent: sc});
  curvedArrow(f, sc, cx, cy, R + 18, 150, 30, C.purple, 3);
  f.T(cx + 74, cy - R - 16, M('M_{Δ}', 21), {cls: 'm', size: 21, fill: C.purple, parent: sc});
  const cnt = display(f, sc, 296, 24, 132, 62, 'COMPTEUR DE TOURS');
  if (!o.plain){
    tag(f, sc, 362, 128, M('M = 2,0 \\k\\g', 16), {cls: 'm', size: 16, w: 92});
    tag(f, sc, 362, 160, M('r = 10 \\c\\m', 16), {cls: 'm', size: 16, w: 80});
    tag(f, sc, 362, 192, M('M_{Δ} = 0,50 \\N·\\m', 16), {cls: 'm', size: 16, w: 118});
  }
  if (!o.book) f.T(296, 230, 'animation ralentie', {cls: 'lbl-s', size: 12, parent: sc});
  f.frame();
  const acc = .5 / .01, Tr = Math.sqrt(2 * 20 * Math.PI / acc), S = 3;
  return {update(t){
    if (o.book){ setT(p, cx, cy, 0); cnt.textContent = '0 tour'; return; }
    const tt = t % (Tr * S + 1.5), tr = Math.min(tt, Tr * S) / S, th = .5 * acc * tr * tr;
    setT(p, cx, cy, th * 180 / Math.PI / 8);
    const n = Math.min(10, th / (2 * Math.PI)); cnt.textContent = fr(n, 1) + ' tours';
  }};
};

/* ---------- Exercice 1 : solide sur une piste (100 px = 1 m) ---------- */
SCENES.piste = (host, o = {}) => {
  const W = 720, H = 270, f = new Fig(host, W, H, {label: 'Piste formée d’un plan incliné AB de 2,0 m à 30 degrés, puis d’une partie horizontale rugueuse passant par C et D'});
  const sc = f.card(f.lg('ps', [[0, '#f2f6fb'], [1, '#e3eaf2']]));
  const K = 100, al = 30, A = [50, 66], B = [A[0] + 2 * K * Math.cos(rad(al)), A[1] + 2 * K * Math.sin(rad(al))], Cx = B[0] + 2.5 * K, Dx = B[0] + 5 / 1.2 * K, yb = B[1];
  f.path(`M${A[0] - 20},${A[1]} L${A[0]},${A[1]} L${f2(B[0])},${f2(yb)} L${W},${f2(yb)} L${W},${H} L${A[0] - 20},${H} Z`, {fill: f.lg('blk', [[0, '#b9a183'], [1, '#8c6f4d']]), stroke: '#5a4636', 'stroke-width': 1.4, parent: sc});
  for (let x = B[0] + 6; x < W; x += 9) f.line(x, yb + 1, x - 6, yb + 7, {stroke: '#5a4636', 'stroke-width': 1.2, parent: sc});
  f.line(B[0], yb, B[0] - 190, yb, {stroke: C.ink2, 'stroke-width': 1.2, 'stroke-dasharray': '6 4', parent: sc});
  f.angleArc(B[0], yb, 56, 150, 180, C.green, {noArrow: true, w: 2.2, parent: sc});
  f.T(B[0] - 72, yb - 9, M('α', 21), {cls: 'm', anchor: 'middle', size: 21, fill: C.green, parent: sc});
  [[A, 'A', -34, 8], [[B[0], yb], 'B', 0, 30], [[Cx, yb], 'C', 0, 30], [[Dx, yb], 'D', 0, 30]].forEach(([p, n, dx, dy]) => {
    f.dot(p[0], p[1], {r: 4.5, parent: sc}); f.T(p[0] + dx, p[1] + dy, n, {cls: 'lbl-b', anchor: 'middle', size: 18, parent: sc}); });
  f.T(A[0] + 128, A[1] + 30, M('AB = 2,0 \\m', 17), {cls: 'm', size: 17, transform: `rotate(${al} ${A[0] + 128} ${A[1] + 30})`, parent: sc});
  f.line(B[0], yb + 46, Cx, yb + 46, {stroke: C.ink, 'stroke-width': 1.3, 'marker-start': f.mk('ink'), 'marker-end': f.mk('ink'), parent: sc});
  f.T((B[0] + Cx) / 2, yb + 68, M('BC = 2,5 \\m', 17), {cls: 'm', anchor: 'middle', size: 17, parent: sc});
  tag(f, sc, (Cx + W) / 2 + 20, yb + 66, 'partie rugueuse', {size: 14, w: 116});
  const S = f.g({parent: sc}); f.rect(-16, -24, 32, 24, {rx: 3, fill: f.lg('sol', [[0, '#5b8ed6'], [1, '#1f4f8f']]), stroke: '#173f73', 'stroke-width': 1, parent: S});
  f.T(0, -7, '(S)', {cls: 'lbl-b', anchor: 'middle', size: 12, fill: '#ffffff', parent: S});
  const fv = vec(f, sc, 0, 0, 0, 0, C.red, 3.2), fl = f.g({parent: sc}); vlab(f, fl, 0, 0, 'f', C.red, 21, 'end');
  const disp = o.final ? display(f, sc, 560, 18, 140, 62, 'VITESSE') : null;
  f.frame();
  const t1 = Math.sqrt(2 * 2 / 5), vB = 5 * t1, t2 = vB / 2.4, Sl = 1.5;
  return {update(t){
    let s, v, phase;   // s : abscisse curviligne (m) depuis A
    if (o.book){ s = 0; v = 0; phase = 0; }
    else { const tr = (t % ((t1 + t2) * Sl + 1.6)) / Sl;
      if (tr < t1){ s = 2.5 * tr * tr; v = 5 * tr; phase = 1; } else { const u = Math.min(tr - t1, t2); s = 2 + vB * u - 1.2 * u * u; v = vB - 2.4 * u; phase = 2; } }
    let x, y, a;
    if (s <= 2){ x = A[0] + s * K * Math.cos(rad(al)); y = A[1] + s * K * Math.sin(rad(al)); a = al; } else { x = B[0] + (s - 2) * K; y = yb; a = 0; }
    setT(S, x, y, a);
    const show = o.final && phase === 2 && v > .05;
    fv.setAttribute('display', show ? 'inline' : 'none'); fl.setAttribute('display', show ? 'inline' : 'none');
    if (show){ setVec(fv, x - 16, y - 12, x - 76, y - 12); setT(fl, x - 80, y - 20); }
    if (disp) disp.textContent = fr(Math.max(0, v), 2) + ' m/s';
  }};
};

/* ---------- Exercice 2 : freinage d'un cylindre ---------- */
SCENES.frein = (host, o = {}) => {
  const W = 320, H = 340, f = new Fig(host, W, H, {label: 'Cylindre homogène en rotation autour de son axe, freiné par un patin qui exerce une force de frottement tangentielle'});
  const sc = labScene(f, 312), d = realDefs(f);
  const cx = 150, cy = 190, R = 86;
  pillar(f, sc, cx, cy, 312, 34);
  shadowEll(f, sc, cx + 6, cy + 10, R, R * .95, .2);
  const cyl = f.g({parent: sc});
  f.circ(0, 0, R, {fill: f.rg('cyf', [[0, '#eef2f6'], [.8, '#b4bfcc'], [1, '#7c8896']], .4, .35, .75), stroke: '#3b4654', 'stroke-width': 1.6, parent: cyl});
  f.circ(0, 0, R - 8, {fill: 'none', stroke: '#c3ccd6', 'stroke-width': 1.2, parent: cyl});
  f.rect(-5, R - 26, 10, 20, {rx: 3, fill: '#d62839', parent: cyl});
  f.circ(0, 0, 12, {fill: '#3b4654', stroke: 'none', parent: cyl});
  setT(cyl, cx, cy);
  // patin de frein et levier
  f.rect(cx - 30, cy - R - 16, 60, 16, {rx: 4, fill: f.lg('pat', [[0, '#5a4636'], [1, '#2b2018']]), parent: sc});
  f.rect(cx - 4, cy - R - 62, 8, 47, {fill: d.metal, parent: sc});
  f.rect(cx - 12, cy - R - 66, 24, 8, {rx: 3, fill: '#3b4654', parent: sc});
  vec(f, sc, cx - 26, cy - R - 82, cx - 26, cy - R - 50, C.ink2, 2.4);
  f.circ(cx, cy, 5, {fill: '#ffffff', stroke: '#1b2a41', 'stroke-width': 1.5, parent: sc});
  f.T(cx + 18, cy + 28, M('(Δ)', 18), {cls: 'm', size: 18, parent: sc});
  f.line(cx, cy, cx - R, cy, {stroke: '#1b2a41', 'stroke-width': 1.3, 'stroke-dasharray': '5 4', parent: sc});
  f.T(cx - R / 2, cy - 7, M('R', 19), {cls: 'm', anchor: 'middle', size: 19, parent: sc});
  // force de frottement tangentielle (au point de contact, opposée à la rotation horaire)
  vec(f, sc, cx, cy - R, cx - 70, cy - R, C.red, 3.4); vlab(f, sc, cx - 76, cy - R + 24, 'f', C.red, 22, 'middle');
  f.dot(cx, cy - R, {r: 3.5, fill: C.red, parent: sc});
  curvedArrow(f, sc, cx, cy, R + 16, 20, -40, C.green, 2.8);
  f.T(cx + R + 6, cy + 46, M('ω', 22), {cls: 'm', size: 22, fill: C.green, parent: sc});
  const disp = o.book ? null : display(f, sc, 196, 14, 116, 56, 'tr/min');
  if (!o.book) f.T(12, 330 - 4, 'animation ralentie', {cls: 'lbl-s', size: 11, fill: '#ffffff', parent: sc});
  f.frame();
  const w0 = 10 * Math.PI, al = 5, ts = w0 / al, S = 2;
  return {update(t){
    if (o.book){ setT(cyl, cx, cy, 30); return; }
    const tt = t % (ts * S + 1.5), tr = Math.min(tt, ts * S) / S, w = Math.max(0, w0 - al * tr), th = w0 * tr - .5 * al * tr * tr;
    setT(cyl, cx, cy, th * 180 / Math.PI / 4);
    disp.textContent = Math.round(w * 60 / (2 * Math.PI));
  }};
};

/* ---------- Exercice 3 : treuil et charge ---------- */
SCENES.treuilCorps = (host, o = {}) => {
  const W = 300, H = 450, f = new Fig(host, W, H, {label: 'Treuil : cylindre mobile autour d’un axe horizontal, un fil enroulé porte un corps S qui descend d’une hauteur h'});
  const sc = labScene(f, 430), d = realDefs(f);
  const cx = 118, cy = 92, r = 50, K = 140, h = 1.5, sx = cx + r, top0 = 170;
  pillar(f, sc, cx, cy, 430, 30);
  const cyl = f.g({parent: sc});
  f.circ(0, 0, r, {fill: f.rg('tr', [[0, '#eef2f6'], [.8, '#b4bfcc'], [1, '#7c8896']], .4, .35, .75), stroke: '#3b4654', 'stroke-width': 1.6, parent: cyl});
  f.circ(0, 0, r - 6, {fill: 'none', stroke: '#c9a46a', 'stroke-width': 3, opacity: .7, parent: cyl});
  f.rect(-4, -r + 4, 8, 16, {rx: 3, fill: '#d62839', parent: cyl});
  f.circ(0, 0, 9, {fill: '#3b4654', stroke: 'none', parent: cyl});
  f.circ(cx, cy, 4, {fill: '#ffffff', stroke: '#1b2a41', 'stroke-width': 1.4, parent: sc});
  f.T(cx - 30, cy - r - 10, '(C)', {cls: 'lbl-b', anchor: 'middle', size: 17, parent: sc});
  f.T(cx - 16, cy + 22, M('(Δ)', 16), {cls: 'm', anchor: 'end', size: 16, parent: sc});
  const fil = f.line(sx, cy, sx, top0, {stroke: '#6b4f2e', 'stroke-width': 2.4, parent: sc});
  const ghost = f.g({parent: sc, opacity: .45});
  f.rect(sx - 24, top0 + h * K, 48, 44, {rx: 4, fill: 'none', stroke: '#1b2a41', 'stroke-width': 1.4, 'stroke-dasharray': '5 4', parent: ghost});
  const Sg = f.g({parent: sc}); weight(f, Sg, 0, 0, 48, 44); f.T(0, 34, '(S)', {cls: 'lbl-b', anchor: 'middle', size: 14, parent: Sg});
  f.line(sx + 34, top0, sx + 60, top0, {stroke: C.ink2, 'stroke-width': 1, 'stroke-dasharray': '3 3', parent: sc});
  f.line(sx + 34, top0 + h * K, sx + 60, top0 + h * K, {stroke: C.ink2, 'stroke-width': 1, 'stroke-dasharray': '3 3', parent: sc});
  f.line(sx + 52, top0, sx + 52, top0 + h * K, {stroke: C.ink, 'stroke-width': 1.4, 'marker-start': f.mk('ink'), 'marker-end': f.mk('ink'), parent: sc});
  f.T(sx + 62, top0 + h * K / 2 + 7, M('h', 21), {cls: 'm', size: 21, parent: sc});
  const vV = vec(f, sc, 0, 0, 0, 0, C.orange, 3), lV = f.g({parent: sc}); vlab(f, lV, 0, 0, 'V', '#c45f00', 19, 'end');
  if (!o.book) f.T(10, 446 - 2, 'animation ralentie', {cls: 'lbl-s', size: 11, fill: '#ffffff', parent: sc});
  f.frame();
  const acc = 10 / 3, Tr = Math.sqrt(2 * h / acc), S = 2.6;
  return {update(t){
    let y = 0, v = 0;
    if (!o.book){ const tt = t % (Tr * S + 1.4), tr = Math.min(tt, Tr * S) / S; y = .5 * acc * tr * tr; v = acc * tr; }
    const yt = top0 + y * K;
    setT(Sg, sx, yt - 8); f.set(fil, {y2: yt});
    setT(cyl, cx, cy, (y / (r / K)) * 180 / Math.PI);
    const L = v * 14; vV.setAttribute('display', L > 3 ? 'inline' : 'none'); lV.setAttribute('display', L > 3 ? 'inline' : 'none');
    setVec(vV, sx - 34, yt + 10, sx - 34, yt + 10 + L); setT(lV, sx - 40, yt + 16 + L / 2);
  }};
};
