/* ===== Physique, chapitre 4 — expérience de la table inclinée, graphes, partie 3 et exercices ===== */

// positions du centre d'inertie du mobile : distance D_i = M_iM_8 (cm)
const D4 = [14.5, 14.0, 13.2, 11.7, 9.7, 7.1, 3.8, 0];

/* ---------- Activité 2, doc 3 : mobile autoporteur sur une table à coussin d'air inclinée ---------- */
SCENES.tableAir4 = (host, o = {}) => {
  const W = 600, H = 340, f = new Fig(host, W, H, {label: 'Mobile autoporteur sur une table à coussin d’air inclinée : positions M1 à M8, altitude hi de Mi au-dessus du plan horizontal de référence passant par M8'});
  const sc = labScene(f, 306), d = realDefs(f);
  const A = 10, ca = Math.cos(rad(A)), sa = Math.sin(rad(A)), P0 = [40, 92], L = 520;
  const at = (s, n = 0) => [P0[0] + s * ca + n * sa, P0[1] + s * sa - n * ca];
  const P1 = at(L), K = 24, s8 = 470, sOf = Dc => s8 - Dc * K;
  f.rect(at(30)[0] - 6, at(30)[1] + 12, 12, 306 - at(30)[1] - 12 - 30, {fill: d.metal, parent: sc});
  f.rect(at(30)[0] - 26, 276, 52, 30, {rx: 2, fill: f.lg('cale', [[0, '#d9a066'], [1, '#9c6633']]), stroke: '#6b4220', 'stroke-width': 1, parent: sc});
  f.T(at(30)[0], 296, 'cale', {cls: 'lbl-b', anchor: 'middle', size: 13, fill: '#ffffff', parent: sc});
  f.rect(P1[0] - 36, P1[1] + 12, 12, 306 - P1[1] - 12, {fill: d.metal, parent: sc});
  shadowEll(f, sc, (P0[0] + P1[0]) / 2, 308, 250, 5, .25);
  const pl = f.g({parent: sc}); pl.setAttribute('transform', `translate(${P0[0]},${P0[1]}) rotate(${A})`);
  f.rect(0, 0, L, 14, {rx: 2, fill: f.lg('glass', [[0, '#e9f4fb'], [.5, '#bcd6e6'], [1, '#8fb3c9']]), stroke: '#5d7f96', 'stroke-width': 1, parent: pl});
  f.rect(0, 0, L, 3, {fill: '#ffffff', opacity: .7, parent: pl});
  f.rect(0, -5, L, 5, {fill: '#fffdf3', stroke: '#c9c3a8', 'stroke-width': .6, parent: pl});
  // angle alpha
  f.line(P0[0], P0[1], P0[0] + 100, P0[1], {stroke: C.ink2, 'stroke-width': 1.3, 'stroke-dasharray': '6 4', parent: sc});
  f.angleArc(P0[0], P0[1], 84, -A, 0, C.green, {noArrow: true, w: 2.2, parent: sc});
  f.T(P0[0] + 92, P0[1] + 13, M('α', 21), {cls: 'm', size: 21, fill: C.green, parent: sc});
  // positions enregistrées
  const dots = D4.map((Dc, i) => { const [x, y] = at(sOf(Dc), 2.5); return f.circ(x, y, 2.6, {fill: '#1b2a41', stroke: 'none', parent: sc}); });
  const lab = (i, dy, dx = 0) => { const [x, y] = at(sOf(D4[i - 1]), 2.5); f.T(x + dx, y + dy, M('M_' + i, 17), {cls: 'm', anchor: 'middle', size: 17, parent: sc}); };
  const [x8, y8] = at(s8, 2.5), i5 = 5, [x5, y5] = at(sOf(D4[i5 - 1]), 2.5);
  // plan de référence passant par M8 et altitude h_i de M_i
  if (!o.reduit){
    f.line(x5 - 10, y8, x8 + 50, y8, {stroke: C.green, 'stroke-width': 1.4, 'stroke-dasharray': '7 4', parent: sc});
    tag(f, sc, 330, y8 + 52, 'E<tspan dy="4" style="font-size:10px">pp</tspan><tspan dy="-4"> = 0 (plan horizontal passant par M</tspan><tspan dy="4" style="font-size:10px">8</tspan><tspan dy="-4">)</tspan>', {size: 13, w: 268, fill: C.green, anchor: 'middle'});
    f.line(x5, y5, x5, y8, {stroke: C.purple, 'stroke-width': 1.5, 'marker-start': f.mk('purple'), 'marker-end': f.mk('purple'), parent: sc});
    f.T(x5 - 8, (y5 + y8) / 2 + 8, M('h_i', 19), {cls: 'm', anchor: 'end', size: 19, fill: C.purple, parent: sc});
    const [u1, v1] = at(sOf(D4[i5 - 1]), 30), [u2, v2] = at(s8, 30);
    f.line(u1, v1, u2, v2, {stroke: C.ink2, 'stroke-width': 1.3, 'marker-start': f.mk('ink2'), 'marker-end': f.mk('ink2'), parent: sc});
    f.T((u1 + u2) / 2 + 4, (v1 + v2) / 2 - 8, M('D_i', 19), {cls: 'm', anchor: 'middle', size: 19, fill: C.ink2, parent: sc});
    lab(1, 38); lab(5, -10, 12); lab(8, -10, 8);
  }
  // mobile
  const mob = f.g({parent: sc});
  f.rect(-28, -25, 56, 20, {rx: 6, fill: f.lg('pk', [[0, '#5d6978'], [.5, '#c3ccd6'], [1, '#3b4654']], 0, 0, 1, 0), stroke: '#2b3440', 'stroke-width': 1, parent: mob});
  f.rect(-31, -7, 62, 7, {rx: 3, fill: '#1b2a41', parent: mob});
  f.rect(-5, -34, 10, 10, {fill: '#3b4654', parent: mob});
  f.circ(0, -15, 3.2, {fill: '#ffffff', stroke: '#1b2a41', 'stroke-width': 1.2, parent: mob});
  const hose = f.path('', {stroke: '#2b3440', 'stroke-width': 6, parent: sc});
  tag(f, sc, 470, 30, o.reduit ? 'débit d’air réduit' : 'table à coussin d’air', {size: 14, w: o.reduit ? 130 : 160, fill: o.reduit ? C.red : C.ink});
  f.frame();
  const acc = (o.reduit ? 1.40 : 1.70) * K * 100, slow = 6;
  if (!o.book) f.T(12, H - 8, 'animation ralentie', {cls: 'lbl-s', size: 12, fill: '#ffffff', parent: sc});
  const pos = s => { const [x, y] = at(s, 5); setT(mob, x, y, A); const [hx, hy] = at(s, 38); f.set(hose, {d: `M${f2(hx)},${f2(hy)} C${f2(hx - 4)},${f2(hy - 50)} ${f2(hx - 90)},-10 ${f2(hx - 170)},-30`}); };
  const s1 = sOf(D4[0]);
  return {update(t){
    if (o.book){ pos(s1); dots.forEach(c => c.setAttribute('opacity', 1)); return; }
    const Tm = Math.sqrt(2 * (s8 + 20 - s1) / acc) * slow, tt = t % (Tm + 1.5), u = Math.min(tt, Tm) / slow;
    const s = s1 + .5 * acc * u * u; pos(Math.min(s, s8 + 20));
    dots.forEach((c, i) => c.setAttribute('opacity', o.reduit ? 0 : sOf(D4[i]) <= s + 1 ? 1 : .15));
  }};
};

/* ---------- Activité 2, doc 4 : enregistrement à l'échelle 1 (60 px = 1 cm) ---------- */
SCENES.enreg4 = (host, o = {}) => {
  const W = 930, H = 130, f = new Fig(host, W, H, {label: 'Enregistrement des positions M1 à M8 du centre d’inertie du mobile, toutes les 60 ms, à l’échelle 1'});
  const X = Dc => 30 + 60 * (14.5 - Dc), Y = 60;
  const sc = f.card('#fffdf7');
  f.line(18, Y, W - 18, Y, {stroke: '#c9c3a8', 'stroke-width': 1, 'stroke-dasharray': '2 4', parent: sc});
  const pts = D4.map((Dc, i) => {
    const g = f.g({parent: sc});
    f.circ(X(Dc), Y, 6.5, {fill: 'none', stroke: '#1b2a41', 'stroke-width': 1.1, parent: g});
    f.dot(X(Dc), Y, {r: 2.4, fill: '#1b2a41', parent: g});
    f.T(X(Dc), i % 2 ? Y + 31 : Y - 16, M('M_' + (i + 1), 18), {cls: 'm', anchor: 'middle', size: 18, parent: g});
    return g;
  });
  f.line(760, 112, 820, 112, {stroke: C.ink, 'stroke-width': 2, parent: sc});
  [760, 820].forEach(x => f.line(x, 106, x, 118, {stroke: C.ink, 'stroke-width': 2, parent: sc}));
  f.T(750, 118, '1 cm', {cls: 'lbl-b', anchor: 'end', size: 15, parent: sc});
  vec(f, sc, 110, 112, 220, 112, C.ink2, 1.8); f.T(230, 117, 'sens du mouvement', {cls: 'lbl-s', size: 13, parent: sc});
  const puck = f.circ(0, Y, 13, {fill: f.rg('pkk', [[0, '#c3ccd6', .8], [1, '#3b4654', .8]], .4, .35, .7), stroke: '#1b2a41', 'stroke-width': 1, parent: sc});
  f.frame();
  return {update(t){
    if (o.book){ pts.forEach(g => g.setAttribute('opacity', 1)); puck.setAttribute('display', 'none'); return; }
    const per = 7 * .55 + 1.6, tt = t % per, k = Math.min(tt / .55, 7);
    pts.forEach((g, i) => g.setAttribute('opacity', i <= k + 1e-6 ? 1 : 0));
    const i = Math.min(6, Math.floor(k)), Dk = k >= 7 ? 0 : D4[i] + (D4[i + 1] - D4[i]) * (k - i);
    puck.setAttribute('cx', f2(X(Dk))); puck.setAttribute('display', tt > 7 * .55 + .9 ? 'none' : 'inline');
  }};
};

/* ---------- Réponse 4 : Ec(t), Epp(t) et Em(t) ---------- */
SCENES.graphEnergies = (host, o = {}) => {
  const W = 560, H = 400, f = new Fig(host, W, H, {label: 'Énergie cinétique croissante, énergie potentielle de pesanteur décroissante et énergie mécanique constante en fonction du temps'});
  const ox = 78, oy = 340, LX = 430, LY = 296, xmax = 420, ymax = 200;
  const X = v => ox + v / xmax * LX, Y = v => oy - v / ymax * LY;
  for (let v = 0; v <= xmax; v += 30) f.line(X(v), oy, X(v), oy - LY, {stroke: v % 60 ? '#e6edf5' : '#c9d6e6', 'stroke-width': 1});
  for (let v = 0; v <= ymax; v += 12.5) f.line(ox, Y(v), ox + LX, Y(v), {stroke: v % 25 ? '#e6edf5' : '#c9d6e6', 'stroke-width': 1});
  f.line(ox, oy, ox + LX + 22, oy, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  f.line(ox, oy, ox, oy - LY - 22, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  for (let v = 60; v <= xmax; v += 60){ f.line(X(v), oy, X(v), oy + 5, {stroke: C.ink, 'stroke-width': 1.4}); f.T(X(v), oy + 24, String(v), {cls: 'lbl', anchor: 'middle', size: 16}); }
  for (let v = 25; v <= ymax; v += 25){ f.line(ox - 5, Y(v), ox, Y(v), {stroke: C.ink, 'stroke-width': 1.4}); f.T(ox - 9, Y(v) + 6, String(v), {cls: 'lbl', anchor: 'end', size: 16}); }
  f.T(ox - 9, oy + 22, '0', {cls: 'lbl', anchor: 'end', size: 16});
  f.T(ox + LX + 20, oy - 12, M('t (\\m\\s)', 22), {cls: 'm', anchor: 'end', size: 22});
  f.T(ox + 8, oy - LY - 12, M('E (\\m\\J)', 22), {cls: 'm', anchor: 'start', size: 22});
  if (o.empty) return {update(){}};
  const T = [60, 120, 180, 240, 300, 360], Ec = [4.30, 13.4, 31.1, 53.8, 88.5, 128], Ep = [174, 164, 146, 121, 88.4, 47.3];
  const Em = Ec.map((v, i) => v + Ep[i]);
  const series = [[Ec, EN.c], [Ep, EN.pp], [Em, EN.m]].map(([vals, col]) => {
    const g = f.g({});
    const pl = f.path(vals.map((v, i) => (i ? 'L' : 'M') + f2(X(T[i])) + ',' + f2(Y(v))).join(' '), {stroke: col, 'stroke-width': 2.2, opacity: .85, parent: g});
    const marks = vals.map((v, i) => { const px = X(T[i]), py = Y(v);
      return f.path(`M${f2(px - 6)},${f2(py - 6)} L${f2(px + 6)},${f2(py + 6)} M${f2(px - 6)},${f2(py + 6)} L${f2(px + 6)},${f2(py - 6)}`, {stroke: col, 'stroke-width': 2.4, parent: g}); });
    return {pl, marks};
  });
  // légende
  const lg = f.g({}); f.rect(ox + 16, Y(140) - 4, 214, 98, {rx: 8, fill: '#ffffff', opacity: .92, stroke: '#d5dfea', 'stroke-width': .8, parent: lg});
  [['E_{\\C}', 'énergie cinétique', EN.c], ['E_{\\p\\p}', 'énergie potentielle', EN.pp], ['E_{\\m}', 'énergie mécanique', EN.m]].forEach(([s, t2, col], i) => {
    const y = Y(140) + 22 + i * 30; f.line(ox + 28, y - 6, ox + 54, y - 6, {stroke: col, 'stroke-width': 3, parent: lg});
    f.T(ox + 62, y, M(s, 19), {cls: 'm', size: 19, fill: col, parent: lg}); f.T(ox + 104, y - 1, t2, {cls: 'lbl', size: 13, fill: C.ink2, parent: lg}); });
  return {update(t){
    const tt = o.book ? 99 : t % 7;
    series.forEach((s, j) => { s.marks.forEach((m, i) => m.setAttribute('opacity', tt > i * .45 + j * .2 ? 1 : 0)); s.pl.setAttribute('opacity', tt > 3.2 ? .85 : 0); });
  }};
};

/* ---------- Application 2 : bille lancée verticalement vers le haut ---------- */
SCENES.appBille = (host, o = {}) => {
  const W = 460, H = 420, f = new Fig(host, W, H, {label: 'Bille d’acier lancée verticalement vers le haut depuis le point A situé à 1,2 m du sol'});
  const sc = outdoor(f, 384), d = realDefs(f);
  const yG = 384, K = 95, xb = 170, yA = yG - 1.2 * K, yB = yG - 3 * K;
  // mât gradué
  f.rect(70, yG - 3.5 * K - 6, 26, 3.5 * K + 6, {rx: 3, fill: '#fffdf3', stroke: '#8a96a8', 'stroke-width': 1, parent: sc});
  for (let k = 0; k <= 35; k++){ const y = yG - k * K / 10; f.line(70, y, k % 5 ? 78 : 86, y, {stroke: C.ink, 'stroke-width': k % 10 ? .8 : 1.6, parent: sc}); }
  [0, 1, 2, 3].forEach(k => f.T(64, yG - k * K + 5, k + ' m', {cls: 'lbl-b', anchor: 'end', size: 14, parent: sc}));
  f.line(96, yA, xb - 16, yA, {stroke: C.ink2, 'stroke-width': 1.2, 'stroke-dasharray': '5 4', parent: sc});
  f.T(xb - 22, yA - 8, 'A', {cls: 'lbl-b', anchor: 'end', size: 17, parent: sc});
  tag(f, sc, 110, yG + 24, 'sol : E<tspan dy="4" style="font-size:10px">pp</tspan><tspan dy="-4"> = 0</tspan>', {size: 13, w: 92, fill: C.green, anchor: 'start'});
  const top = f.g({parent: sc});
  f.line(96, yB, xb + 30, yB, {stroke: C.purple, 'stroke-width': 1.3, 'stroke-dasharray': '6 4', parent: top});
  f.T(xb + 36, yB + 6, 'B (sommet)', {cls: 'lbl-b', size: 15, fill: C.purple, parent: top});
  if (!o.final) top.setAttribute('display', 'none');
  const ghosts = f.g({parent: sc});
  const bG = f.g({parent: sc}); ball(f, bG, 0, 0, 11);
  const vV = vec(f, sc, 0, 0, 0, 0, C.orange, 3.2), lV = f.g({parent: sc}); vlab(f, lV, 0, 0, 'V', '#c45f00', 20, 'start');
  const lab0 = f.T(xb + 18, yA - 54, M('V_A', 20), {cls: 'm', size: 20, fill: '#c45f00', parent: sc});
  const set = o.final ? eBars(f, sc, 290, 300, 190, [{lab: 'E_{\\C}', col: EN.c}, {lab: 'E_{\\p\\p}', col: EN.pp}, {lab: 'E_{\\m}', col: EN.m}], {bw: 30, gap: 16, title: 'Énergies'}) : null;
  if (o.final) f.T(W - 10, H - 8, 'animation ralentie', {cls: 'lbl-s', size: 12, anchor: 'end', parent: sc});
  f.frame();
  const g = 10, vA = 6, zA = 1.2, Tup = vA / g, Tdn = Math.sqrt(2 * 3 / g), Tt = Tup + Tdn, slow = 2.2;
  const put = (z, v) => { const y = yG - z * K; setT(bG, xb, y); const L = v * 9;
    vV.setAttribute('display', Math.abs(L) > 4 ? 'inline' : 'none'); lV.setAttribute('display', Math.abs(L) > 4 && !o.book ? 'inline' : 'none');
    setVec(vV, xb, y - Math.sign(L) * 12, xb, y - Math.sign(L) * 12 - L); setT(lV, xb + 10, y - L / 2); };
  return {update(t){
    if (!o.final){ put(zA, vA); lab0.setAttribute('display', 'inline'); lV.setAttribute('display', 'none'); return; }
    lab0.setAttribute('display', 'none');
    const c = (t % (Tt * slow + 1.2)) / slow, u = Math.min(c, Tt);
    let z, v;
    if (u < Tup){ z = zA + vA * u - .5 * g * u * u; v = vA - g * u; } else { const w = u - Tup; z = 3 - .5 * g * w * w; v = -g * w; }
    if (z < 0){ z = 0; v = 0; }
    put(z, v);
    const Em = .5 * vA * vA + g * zA; set([.5 * v * v / Em * .9, g * z / Em * .9, (.5 * v * v + g * z) / Em * .9]);
  }};
};

/* ---------- Situation de départ 3 : caisse qui glisse sur un sol rugueux ---------- */
SCENES.caisseRugueuse = (host, o = {}) => {
  const W = 640, H = 340, f = new Fig(host, W, H, {label: 'Une caisse descend une rampe puis glisse sur un sol rugueux en s’échauffant, et s’arrête'});
  const sc = labScene(f, 300), d = realDefs(f);
  const A = [40, 110], al = 24, L = 250, ca = Math.cos(rad(al)), sa = Math.sin(rad(al)), B = [A[0] + L * ca, A[1] + L * sa], yb = B[1];
  f.path(`M${A[0]},${A[1]} L${f2(B[0])},${f2(yb)} L${W},${f2(yb)} L${W},300 L${A[0]},300 Z`, {fill: f.lg('bet', [[0, '#b7b0a6'], [1, '#7d756b']]), stroke: '#4f4840', 'stroke-width': 1.2, parent: sc});
  const r = rng(7); for (let i = 0; i < 160; i++){ const x = B[0] + r() * (W - B[0]), y = yb + 2 + r() * 12; f.circ(x, y, .8 + r() * 1.4, {fill: '#4f4840', opacity: .5, parent: sc}); }
  for (let i = 0; i < 40; i++){ const s = r() * L, [x, y] = [A[0] + s * ca, A[1] + s * sa + 3 + r() * 6]; f.circ(x, y, .8 + r() * 1.2, {fill: '#4f4840', opacity: .4, parent: sc}); }
  tag(f, sc, 470, yb + 40, 'sol rugueux', {size: 14, w: 90});
  const glow = f.ell(0, 0, 34, 8, {fill: f.rg('hot3', [[0, '#ffd166', .95], [.5, '#f07f1e', .7], [1, '#d62839', 0]]), stroke: 'none', filter: d.blur2, parent: sc});
  const cr = f.g({parent: sc}); crate(f, cr, -30, 0, 60, 46, {noShadow: true});
  const heat = f.g({parent: sc}); [-14, 0, 14].forEach(dx => f.path(`M${dx},-6 q-6,-10 0,-20 t0,-20`, {stroke: '#f07f1e', 'stroke-width': 2.4, fill: 'none', opacity: .8, parent: heat}));
  const disp = display(f, sc, 476, 24, 140, 62, 'VITESSE');
  tag(f, sc, 330, 60, 'les surfaces en contact s’échauffent', {size: 14, w: 250});
  f.frame();
  // modèle (unités du dessin) : descente avec frottement, puis freinage sur le sol
  const a1 = 120, a2 = -150, t1 = Math.sqrt(2 * L / a1), vB = a1 * t1, t2 = -vB / a2, dB = -vB * vB / (2 * a2);
  return {update(t){
    let s, v;
    if (o.book){ s = L + dB * .45; v = 0; }
    else { const c = t % (t1 + t2 + 1.6); if (c < t1){ s = .5 * a1 * c * c; v = a1 * c; } else { const u = Math.min(c - t1, t2); s = L + vB * u + .5 * a2 * u * u; v = vB + a2 * u; } }
    let x, y, a;
    if (s <= L){ x = A[0] + s * ca; y = A[1] + s * sa; a = al; } else { x = B[0] + (s - L); y = yb; a = 0; }
    setT(cr, x, y, a); setT(heat, x, y - 48, 0); heat.setAttribute('opacity', f2(clamp(v / 200, 0, 1) * (s > L ? 1 : .4)));
    glow.setAttribute('cx', f2(x)); glow.setAttribute('cy', f2(y)); glow.setAttribute('opacity', f2(clamp(v / 180, 0, 1)));
    disp.textContent = fr(Math.max(0, v) / 60, 2) + ' m/s';
  }};
};

/* ---------- Activité 3, doc 5 (et application 3) : solide glissant avec frottement sur un plan incliné ---------- */
SCENES.planFrott = (host, o = {}) => {
  const W = 580, H = 340, f = new Fig(host, W, H, {label: o.app ? 'Solide glissant de A vers B sur un plan incliné de 30 degrés, avec frottement' : 'Solide glissant avec frottement de A vers B sur un plan incliné : poids P, réaction R du plan, composante normale RN et force de frottement f'});
  const sc = f.card(f.lg('pf', [[0, '#f2f6fb'], [1, '#e3eaf2']]));
  const al = 30, ca = Math.cos(rad(al)), sa = Math.sin(rad(al)), A = [120, 70], Lp = 360, B = [A[0] + Lp * ca, A[1] + Lp * sa];
  const d = [ca, sa], n = [sa, -ca];
  f.path(`M${A[0]},${A[1]} L${f2(B[0])},${f2(B[1])} L${A[0]},${f2(B[1])} Z`, {fill: f.lg('wd', [[0, '#d9b98f'], [1, '#a57a4e']]), stroke: '#5a4030', 'stroke-width': 1.4, parent: sc});
  f.line(30, B[1], W - 20, B[1], {stroke: '#5a4030', 'stroke-width': 2, parent: sc});
  for (let x = 36; x < W - 20; x += 12) f.line(x, B[1] + 1, x - 7, B[1] + 8, {stroke: '#5a4030', 'stroke-width': 1, parent: sc});
  f.angleArc(B[0], B[1], 70, 150, 180, C.green, {noArrow: true, w: 2.2, parent: sc});
  f.T(B[0] - 88, B[1] - 12, M('α', 21), {cls: 'm', anchor: 'middle', size: 21, fill: C.green, parent: sc});
  [[A, 'A', -2, -14], [B, 'B', 14, -10]].forEach(([p, t2, dx, dy]) => { f.dot(p[0], p[1], {r: 4.5, parent: sc}); f.T(p[0] + dx, p[1] + dy, t2, {cls: 'lbl-b', anchor: 'middle', size: 18, parent: sc}); });
  // altitudes
  f.line(60, B[1] + 6, 60, 30, {stroke: C.ink, 'stroke-width': 1.6, 'marker-end': f.mk('ink'), parent: sc});
  f.T(70, 40, M('z', 21), {cls: 'm', size: 21, parent: sc});
  f.line(60, A[1], A[0] - 8, A[1], {stroke: C.ink2, 'stroke-width': 1.1, 'stroke-dasharray': '4 4', parent: sc});
  f.T(52, A[1] + 7, M('z_A', 19), {cls: 'm', anchor: 'end', size: 19, parent: sc});
  f.T(52, B[1] + 2, M('z_B', 19), {cls: 'm', anchor: 'end', size: 19, parent: sc});
  if (o.app){
    f.T(A[0] + 150, A[1] + 70, M('AB = 0,40 \\m', 18), {cls: 'm', size: 18, transform: `rotate(${al} ${A[0] + 150} ${A[1] + 70})`, parent: sc});
    tag(f, sc, 420, 48, M('V_A = 1,0 \\m/\\s ; V_B = 2,0 \\m/\\s', 17), {cls: 'm', size: 17, w: 236});
  }
  const S = blockS(f, sc, 48, 30);
  const F = f.g({parent: sc}); if (o.app) F.setAttribute('display', 'none');
  const vP = vec(f, F, 0, 0, 0, 0, C.red, 3.2), vN = vec(f, F, 0, 0, 0, 0, C.red, 3.2), vf = vec(f, F, 0, 0, 0, 0, C.red, 3.2);
  const vR = vec(f, F, 0, 0, 0, 0, C.red, 2.2); vR.setAttribute('stroke-dasharray', '7 4');
  const dsh = f.path('', {stroke: C.red, 'stroke-width': 1, 'stroke-dasharray': '3 3', parent: F});
  const lP = f.g({parent: F}), lN = f.g({parent: F}), lf = f.g({parent: F}), lR = f.g({parent: F});
  vlab(f, lP, 0, 0, 'P', C.red, 21, 'start'); vlab(f, lN, 0, 0, 'R_N', C.red, 21, 'start');
  const dG = f.g({parent: F}), dI = f.g({parent: F});
  f.dot(0, 0, {r: 3.4, fill: '#ffffff', parent: dG}); f.dot(0, 0, {r: 3.6, fill: C.ink, parent: dI});
  f.T(-20, 20, 'I', {cls: 'lbl-b', size: 15, fill: '#ffffff', parent: dI}); vlab(f, lf, 0, 0, 'f', C.red, 21, 'end'); vlab(f, lR, 0, 0, 'R', C.red, 21, 'end');
  const mv = f.g({parent: sc}); vec(f, mv, 0, 0, 56 * ca, 56 * sa, C.orange, 2.4); 
  f.frame();
  const put = s => {
    const x = A[0] + s * d[0], y = A[1] + s * d[1]; setT(S, x, y, al);
    // P : appliqué au centre d'inertie G ; R, R_N et f (forces de contact) : appliqués au milieu I de la surface de contact
    const G = [x + 15 * n[0], y + 15 * n[1]], I = [x, y];
    setVec(vP, G[0], G[1], G[0], G[1] + 96); setT(lP, G[0] + 8, G[1] + 90);
    const N = [I[0] + 84 * n[0], I[1] + 84 * n[1]], Fv = [I[0] - 44 * d[0], I[1] - 44 * d[1]], R = [N[0] - 44 * d[0], N[1] - 44 * d[1]];
    setVec(vN, I[0], I[1], N[0], N[1]); setT(lN, N[0] + 6, N[1] + 2);
    setVec(vf, I[0], I[1], Fv[0], Fv[1]); setT(lf, Fv[0] - 4, Fv[1] + 20);
    setVec(vR, I[0], I[1], R[0], R[1]); setT(lR, R[0] - 6, R[1] + 2);
    f.set(dsh, {d: `M${f2(N[0])},${f2(N[1])} L${f2(R[0])},${f2(R[1])} L${f2(Fv[0])},${f2(Fv[1])}`});
    setT(dI, I[0], I[1]); setT(dG, G[0], G[1]);
    setT(mv, x + 34 * n[0] + 40 * d[0], y + 34 * n[1] + 40 * d[1], 0);
  };
  return {update(t){
    if (o.book){ put(o.app ? 40 : 130); return; }
    const c = t % 4.6, u = Math.min(c, 3.6) / 3.6, s = 30 + (Lp - 70) * (o.app ? .33 * u + .67 * u * u : u * u);
    put(s);
  }};
};

/* ---------- Exercice 1 : remontée sur une piste inclinée ---------- */
SCENES.ex1Rampe = (host, o = {}) => {
  const W = 640, H = 270, f = new Fig(host, W, H, {label: 'Objet glissant sur une piste horizontale HA puis remontant une piste inclinée de 20 degrés jusqu’au point B où il s’arrête'});
  const sc = f.card(f.lg('e1', [[0, '#f2f6fb'], [1, '#e3eaf2']]));
  const al = 20, ca = Math.cos(rad(al)), sa = Math.sin(rad(al)), A = [240, 220], Lp = 330, B = [A[0] + Lp * ca, A[1] - Lp * sa];
  f.path(`M20,220 L${A[0]},220 L${f2(B[0] + 30 * ca)},${f2(B[1] - 30 * sa)} L${f2(B[0] + 30 * ca)},250 L20,250 Z`, {fill: f.lg('e1g', [[0, '#c9d3de'], [1, '#9aa7b6']]), stroke: '#5d6978', 'stroke-width': 1.4, parent: sc});
  f.line(A[0], A[1], A[0] + 130, A[1], {stroke: C.ink2, 'stroke-width': 1.2, 'stroke-dasharray': '6 4', parent: sc});
  f.angleArc(A[0], A[1], 100, 0, al, C.green, {noArrow: true, w: 2.2, parent: sc});
  f.T(A[0] + 112, A[1] - 12, M('α', 21), {cls: 'm', size: 21, fill: C.green, parent: sc});
  [[[40, 220], 'H', 0, 24], [A, 'A', -4, 26], [B, 'B', -8, -16]].forEach(([p, t2, dx, dy]) => { f.dot(p[0], p[1], {r: 4.5, parent: sc}); f.T(p[0] + dx, p[1] + dy, t2, {cls: 'lbl-b', anchor: 'middle', size: 18, parent: sc}); });
  tag(f, sc, 160, 40, 'sans frottement', {size: 14, w: 120});
  tag(f, sc, 470, 250 - 8, 'état de référence : plan horizontal passant par HA', {size: 12, w: 300, fill: C.green});
  if (o.final){ const m = [(A[0] + B[0]) / 2 - 20 * sa, (A[1] + B[1]) / 2 - 20 * ca]; f.T(m[0] - 20, m[1] - 6, M('L ≈ 9,54 \\m', 18), {cls: 'm', anchor: 'middle', size: 18, fill: C.purple, transform: `rotate(${-al} ${m[0]} ${m[1]})`, parent: sc}); }
  const S = blockS(f, sc, 40, 26);
  const vV = vec(f, sc, 0, 0, 0, 0, C.orange, 3), lV = f.g({parent: sc}); vlab(f, lV, 0, 0, 'V_A', '#c45f00', 19, 'middle');
  f.frame();
  const v0 = 160, dec = v0 * v0 / (2 * Lp), t1 = (A[0] - 60) / v0, t2 = v0 / dec;
  return {update(t){
    let x, y, a = 0, v = 0, onA = false;
    const c = o.book ? -1 : t % (t1 + 2 * t2 + 1.4);
    if (c < 0){ x = A[0] - 70; y = A[1]; v = v0; onA = true; }
    else if (c < t1){ x = 60 + v0 * c; y = A[1]; v = v0; onA = c > t1 - .45; }
    else { const u = c - t1; let s; if (u < t2){ s = v0 * u - .5 * dec * u * u; v = v0 - dec * u; } else { const w = u - t2; s = Math.max(0, Lp - .5 * dec * w * w); v = -dec * w; }
      if (s <= 0){ x = A[0] + (u - 2 * t2) * v0 * -1; y = A[1]; } else { x = A[0] + s * ca; y = A[1] - s * sa; a = -al; } }
    setT(S, x, y, a);
    const show = onA || o.book; vV.setAttribute('display', show ? 'inline' : 'none'); lV.setAttribute('display', show ? 'inline' : 'none');
    if (show){ setVec(vV, x + 22, y - 13, x + 82, y - 13); setT(lV, x + 54, y - 22); }
  }};
};

/* ---------- Exercice 2 : piste horizontale prolongée par un demi-cercle vertical (tube) ---------- */
SCENES.ex2Looping = (host, o = {}) => {
  const W = 540, H = 340, f = new Fig(host, W, H, {label: 'Piste horizontale AB prolongée en B par un tube en demi-cercle vertical de centre O et de rayon R, de sommet C'});
  const sc = f.card(f.lg('e2', [[0, '#f2f6fb'], [1, '#e3eaf2']]));
  const yb = 300, A = [70, yb], B = [290, yb], R = 120, O = [290, yb - R], Cp = [290, yb - 2 * R];
  f.rect(20, yb, W - 40, 14, {fill: '#9aa7b6', stroke: '#5d6978', 'stroke-width': 1, parent: sc});
  const arcP = `M${B[0]},${B[1]} A${R},${R} 0 0 0 ${Cp[0]},${Cp[1]}`;
  f.path(arcP, {stroke: '#9aa7b6', 'stroke-width': 30, opacity: .45, parent: sc});
  f.path(`M${B[0]},${B[1] + 14} A${R + 14},${R + 14} 0 0 0 ${Cp[0]},${Cp[1] - 14}`, {stroke: '#5d6978', 'stroke-width': 2, parent: sc});
  f.path(arcP, {stroke: '#5d6978', 'stroke-width': 2, parent: sc});
  f.path(`M${B[0]},${B[1] - 14} A${R - 14},${R - 14} 0 0 0 ${Cp[0]},${Cp[1] + 14}`, {stroke: '#5d6978', 'stroke-width': 2, parent: sc});
  f.dot(O[0], O[1], {r: 4, parent: sc}); f.T(O[0] - 12, O[1] + 6, 'O', {cls: 'lbl-b', anchor: 'end', size: 17, parent: sc});
  f.line(O[0], O[1], O[0] + R * Math.cos(rad(-30)), O[1] - R * Math.sin(rad(-30)), {stroke: C.ink2, 'stroke-width': 1.3, parent: sc});
  f.T(O[0] + 52, O[1] + 46, M('R', 20), {cls: 'm', size: 20, fill: C.ink2, parent: sc});
  [[A, 'A', 0, 30], [B, 'B', 0, 34], [Cp, 'C', 0, -22]].forEach(([p, t2, dx, dy]) => { f.dot(p[0], p[1], {r: 4.5, parent: sc}); f.T(p[0] + dx, p[1] + dy, t2, {cls: 'lbl-b', anchor: 'middle', size: 18, parent: sc}); });
  f.line(470, yb, 470, Cp[1], {stroke: C.purple, 'stroke-width': 1.4, 'marker-start': f.mk('purple'), 'marker-end': f.mk('purple'), parent: sc});
  f.line(Cp[0] + 18, Cp[1], 478, Cp[1], {stroke: C.purple, 'stroke-width': 1, 'stroke-dasharray': '3 3', parent: sc});
  f.T(462, (yb + Cp[1]) / 2 + 6, M('2R', 19), {cls: 'm', anchor: 'end', size: 19, fill: C.purple, parent: sc});
  tag(f, sc, 165, 50, 'tube : le solide ne peut pas quitter la piste', {size: 13, w: 270});
  const S = f.g({parent: sc}); f.circ(0, 0, 10, {fill: f.rg('s2', [[0, '#9cc3f5'], [1, '#173f73']], .35, .3, .8), stroke: '#123461', 'stroke-width': 1, parent: S});
  f.frame();
  // abscisse curviligne (px) : AB puis arc (vitesse ~ conservation de l'énergie, animation)
  const LAB = B[0] - A[0], Larc = Math.PI * R, g = 400, v0 = Math.sqrt(2 * g * 2 * R) * 1.004;
  const pos = s => { if (s <= LAB) return [A[0] + s, yb - 10];
    const th = (s - LAB) / R, a = -Math.PI / 2 + th; return [O[0] + (R - 0) * Math.cos(a) * 1, O[1] - (R) * Math.sin(a) * 1].map((v, i) => v + (i ? 10 * Math.sin(a) : -10 * Math.cos(a))); };
  // intégration simple (aller jusqu'en C puis retour)
  const traj = []; let s = 0, dir = 1; for (let k = 0; k < 2400; k++){ const z = s <= LAB ? 0 : R * (1 - Math.cos((s - LAB) / R)); const v = Math.sqrt(Math.max(v0 * v0 - 2 * g * z, 30)); s += dir * v / 240; if (s >= LAB + Larc){ s = LAB + Larc; dir = -1; } if (s < 0) break; traj.push(s); }
  return {update(t){
    const k = o.book ? 0 : Math.max(0, Math.floor((t % (traj.length / 240 + 1)) * 240));
    const [x, y] = pos(traj[Math.min(k, traj.length - 1)] || 0); setT(S, x, y);
  }};
};

/* ---------- Exercice 3 : descente d'un skieur puis arrêt sur le plat ---------- */
SCENES.ex3Ski = (host, o = {}) => {
  const W = 660, H = 300, f = new Fig(host, W, H, {label: 'Skieur partant sans vitesse du sommet A d’une piste inclinée de 100 m et de dénivellation 30 m, puis s’arrêtant en C après 50 m sur le plat'});
  const sc = outdoor(f, H, {noHills: true});
  f.path('M0,140 L90,60 L170,110 L260,40 L360,100 L450,50 L560,110 L660,70 L660,220 L0,220 Z', {fill: '#c7d6e6', stroke: 'none', parent: sc});
  const K = 3.6, A = [60, 74], hgt = 30 * K, Lp = 100 * K, ca = Math.sqrt(1 - .09), sa = .3, B = [A[0] + Lp * ca, A[1] + hgt], Cx = B[0] + 50 * K;
  f.path(`M0,${A[1]} L${A[0]},${A[1]} L${f2(B[0])},${f2(B[1])} L${W},${f2(B[1])} L${W},${H} L0,${H} Z`, {fill: f.lg('sn3', [[0, '#ffffff'], [1, '#d6e4f1']]), stroke: '#b9cde0', 'stroke-width': 1.2, parent: sc});
  [[A, 'A', 0, -12], [B, 'B', 0, 26], [[Cx, B[1]], 'C', 0, 26]].forEach(([p, t2, dx, dy]) => { f.dot(p[0], p[1], {r: 5, parent: sc}); f.T(p[0] + dx, p[1] + dy, t2, {cls: 'lbl-b', anchor: 'middle', size: 18, parent: sc}); });
  f.line(30, A[1], 30, B[1], {stroke: C.purple, 'stroke-width': 1.4, 'marker-start': f.mk('purple'), 'marker-end': f.mk('purple'), parent: sc});
  f.line(30, B[1], B[0] - 10, B[1], {stroke: C.purple, 'stroke-width': 1, 'stroke-dasharray': '3 3', parent: sc});
  f.T(38, (A[1] + B[1]) / 2 + 6, M('h = 30 \\m', 17), {cls: 'm', size: 17, fill: C.purple, parent: sc});
  const ang = Math.asin(sa) * 180 / Math.PI, mid = [(A[0] + B[0]) / 2 + 14, (A[1] + B[1]) / 2 - 16];
  f.T(mid[0], mid[1], M('AB = 100 \\m', 17), {cls: 'm', anchor: 'middle', size: 17, transform: `rotate(${f2(ang)} ${f2(mid[0])} ${f2(mid[1])})`, parent: sc});
  f.line(B[0], B[1] + 40, Cx, B[1] + 40, {stroke: C.ink, 'stroke-width': 1.3, 'marker-start': f.mk('ink'), 'marker-end': f.mk('ink'), parent: sc});
  f.T((B[0] + Cx) / 2, B[1] + 62, M('BC = 50 \\m', 17), {cls: 'm', anchor: 'middle', size: 17, parent: sc});
  tag(f, sc, 560, 34, 'état de référence : niveau BC', {size: 13, w: 196, fill: C.green});
  const sk = f.g({parent: sc}); skier(f, sk, 0, 0, .5, 0, {col: '#1f5fa8'});
  if (!o.book) f.T(W - 10, H - 8, 'animation accélérée', {cls: 'lbl-s', size: 12, anchor: 'end', parent: sc});
  f.frame();
  const a1 = 2, t1 = 10, a2 = -4, t2 = 5, sp = 3;
  return {update(t){
    let x, y, a;
    const c = o.book ? 0 : (t * sp) % (t1 + t2 + 4);
    if (c < t1){ const s = .5 * a1 * c * c * K; x = A[0] + 6 + s * ca; y = A[1] + s * sa; a = ang; }
    else { const u = Math.min(c - t1, t2), s = (20 * u + .5 * a2 * u * u) * K; x = B[0] + s; y = B[1]; a = 0; }
    setT(sk, x, y, a);
  }};
};
