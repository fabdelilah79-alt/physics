/* ===== Physique, chapitre 8 — partie 2 : le champ électrostatique ===== */

// boule chargée en relief (charge ponctuelle schématisée)
function pcharge(f, parent, x, y, s, r = 15, lab){
  const g = f.g({parent});
  f.circ(x, y, r, {fill: f.rg(uid('pc'), [[0, '#ffffff'], [.4, s > 0 ? '#ff8a96' : '#7fb2ff'], [1, s > 0 ? '#a3122a' : '#123e8a']], .35, .3, .75), parent: g});
  f.T(x, y + r * .45, s > 0 ? '+' : '−', {cls: 'lbl-b', anchor: 'middle', size: r * 1.35, fill: '#ffffff', parent: g});
  if (lab) f.T(x, y - r - 9, M(lab, 21), {cls: 'm', anchor: 'middle', size: 21, parent: g});
  return g;
}
// champ créé en (x, y) par des charges [[x, y, q], …] (unités arbitraires)
function efield(ch, x, y){ let ex = 0, ey = 0; ch.forEach(([cx, cy, q]) => { const dx = x - cx, dy = y - cy, r2 = dx * dx + dy * dy + 1e-6, r3 = r2 * Math.sqrt(r2); ex += q * dx / r3; ey += q * dy / r3; }); return [ex, ey]; }
// lignes de champ partant des charges positives (intégration pas à pas)
function fieldLines(ch, n, box, o = {}){
  const lines = [];
  ch.filter(c => c[2] > 0).forEach(([cx, cy, q]) => {
    for (let k = 0; k < n; k++){
      const a = 2 * Math.PI * (k + .5) / n; let x = cx + 18 * Math.cos(a), y = cy + 18 * Math.sin(a); const pts = [[x, y]];
      for (let i = 0; i < 900; i++){
        const [ex, ey] = efield(ch, x, y), e = Math.hypot(ex, ey); x += 3 * ex / e; y += 3 * ey / e; pts.push([x, y]);
        if (x < box[0] || x > box[2] || y < box[1] || y > box[3]) break;
        if (ch.some(([qx, qy, qq]) => qq < 0 && Math.hypot(x - qx, y - qy) < 16)) break;
      }
      lines.push(pts);
    }
  });
  return lines;
}
// ligne de champ dessinée avec une flèche au milieu (dans le sens du champ)
function drawLine(f, parent, pts, col = C.red, w = 1.6, o = {}){
  const d = pts.map((p, i) => (i ? 'L' : 'M') + f2(p[0]) + ',' + f2(p[1])).join('');
  f.path(d, {stroke: col, 'stroke-width': w, fill: 'none', opacity: o.op || 1, parent});
  const m = Math.floor(pts.length * (o.at || .5)), a = pts[Math.max(0, m - 1)], b = pts[Math.min(pts.length - 1, m + 1)];
  if (pts.length > 6){ const ang = Math.atan2(b[1] - a[1], b[0] - a[0]); const [x, y] = pts[m];
    f.path(`M${f2(x - 7 * Math.cos(ang) + 4.5 * Math.sin(ang))},${f2(y - 7 * Math.sin(ang) - 4.5 * Math.cos(ang))} L${f2(x + 3 * Math.cos(ang))},${f2(y + 3 * Math.sin(ang))} L${f2(x - 7 * Math.cos(ang) - 4.5 * Math.sin(ang))},${f2(y - 7 * Math.sin(ang) + 4.5 * Math.cos(ang))} Z`, {fill: col, parent}); }
}

/* ---------- Doc 5 : mettre en évidence le champ électrostatique (pendules chargés autour d'une sphère chargée) ---------- */
SCENES.sphere = (host, o = {}) => {
  const W = 660, H = 330, f = new Fig(host, W, H, {label: 'Des pendules portant une charge positive sont déviés près d’une sphère chargée positivement, d’autant plus qu’ils en sont proches'});
  const sc = labScene(f, 290), d = realDefs(f);
  const sx = 330, sy = 190, sr = 42;
  // pied isolant et sphère métallique chargée
  f.rect(sx - 6, sy + sr - 4, 12, 290 - sy - sr, {fill: f.lg('pied', [[0, '#c8b089'], [.5, '#f0e2c4'], [1, '#a28a62']], 0, 0, 1, 0), parent: sc});
  f.ell(sx, 290, 46, 8, {fill: '#2b3440', parent: sc});
  f.circ(sx, sy, sr, {fill: f.rg('sph', [[0, '#ffffff'], [.35, '#d7dde4'], [1, '#5d6978']], .35, .3, .75), stroke: '#3b4654', 'stroke-width': 1, parent: sc});
  for (let k = 0; k < 10; k++){ const a = rad(k * 36 + 18); chg(f, sc, sx + (sr - 9) * Math.cos(a), sy - (sr - 9) * Math.sin(a), 1, 5); }
  // trois pendules : chacun avec potence, boule chargée positivement
  const P = [[190, -1, 1.2], [470, 1, 1.2], [596, 1, .4]].map(([x, side, k], i) => {
    const pv = pendulum(f, sc, side < 0 ? x - 120 : x + (i === 1 ? 70 : 44), 290, 60, 130, {armX: x, r: 11});
    return {pv, side, k};
  });
  tag(f, sc, sx, 316, 'sphère chargée sur pied isolant', {size: 13, w: 196});
  tag(f, sc, 156, 316, 'boules chargées (+)', {size: 13, w: 120});
  f.frame();
  return {update(t){
    const u = o.book ? 1 : ease(clamp(((t % 8) - .8) / 2.2, 0, 1));
    P.forEach(p => { p.pv.set(p.side * 14 * p.k * u); p.pv.signs([[0, 0, 1]]); });
  }};
};

/* ---------- Doc 6 : charges témoins placées au même point P ---------- */
SCENES.champTest = (host, o = {}) => {
  const W = 600, H = 220, f = new Fig(host, W, H, {label: 'Une charge source q en A ; différentes charges témoins placées au même point P subissent des forces différentes'});
  const ax = 90, py = 120, px = 380;
  f.line(40, py, 560, py, {stroke: '#c9d6e6', 'stroke-width': 1.4, 'stroke-dasharray': '6 5'});
  pcharge(f, null, ax, py, 1, 17); f.T(ax, py - 30, M('A'), {cls: 'm', anchor: 'middle', size: 21}); f.T(ax, py + 46, M('q > 0', 19), {cls: 'm', anchor: 'middle', size: 19, fill: C.purple});
  vec(f, null, ax + 24, py + 30, ax + 84, py + 30, C.ink, 2.4); vlab(f, null, ax + 54, py + 56, 'u', C.ink, 21);
  f.path(`M${ax},${py - 62} L${px},${py - 62}`, {stroke: C.ink2, 'stroke-width': 1.2, 'marker-end': f.mk('ink2'), 'marker-start': f.mk('ink2')}); f.T((ax + px) / 2, py - 70, M('r = AP', 19), {cls: 'm', anchor: 'middle', size: 19});
  const tc = f.g({}), tq = f.T(px, py + 44, '', {cls: 'm', anchor: 'middle', size: 19, fill: C.purple});
  const F = vec(f, null, px, py, px + 60, py), FL = f.g({});
  f.T(px - 4, py - 22, M('P'), {cls: 'm', anchor: 'end', size: 21});
  const tests = [['q_1 = +2,0 \\nC', 1, 40], ['q_2 = +5,0 \\nC', 1, 100], ['q_3 = −4,0 \\nC', -1, 80]];
  return {update(t){
    const k = o.book ? -1 : Math.floor(t / 2.5) % 3;
    tc.innerHTML = ''; FL.innerHTML = '';
    if (k < 0){ pcharge(f, tc, px, py, 1, 10); tq.innerHTML = M('q_i', 19); setVec(F, px, py, px + 70, py); vlab(f, FL, px + 40, py - 16, 'F_i', C.red, 21); return; }
    const [lab, s, L] = tests[k]; pcharge(f, tc, px, py, s, 10); tq.innerHTML = M(lab, 19);
    setVec(F, px, py, px + s * L, py); vlab(f, FL, px + s * (L / 2 + 6), py - 16, `F_${k + 1}`, C.red, 21);
  }};
};

/* ---------- Doc 7 : spectres électrostatiques (grains de semoule sur l'huile de paraffine) ---------- */
// o.only : 'a' | 'b' | 'c' (un seul spectre) ; o.final : grains alignés
SCENES.spectres = (host, o = {}) => {
  const list = o.only ? [o.only] : ['a', 'b', 'c'], n = list.length;
  const W = n * 300, H = 330, f = new Fig(host, W, H, {label: 'Spectres électrostatiques : grains de semoule alignés sur l’huile autour d’électrodes reliées à une haute tension'});
  const sc = labScene(f, 330);
  const panes = list.map((kind, i) => {
    const cx = 150 + i * 300, cy = 158, R = 128;
    shadowEll(f, sc, cx + 4, cy + R - 2, R, 12, .3);
    f.circ(cx, cy, R + 6, {fill: f.lg(uid('bt'), [[0, '#ffffff', .9], [1, '#cfdbe6', .9]]), stroke: '#8fa6bb', 'stroke-width': 1.2, parent: sc});
    f.circ(cx, cy, R, {fill: f.rg(uid('hu'), [[0, '#fff6d8'], [1, '#f0dfa8']]), parent: sc});
    let ch = [], plates = null;
    if (kind === 'a') ch = [[cx, cy, 1]];
    else if (kind === 'b') ch = [[cx - 52, cy, 1], [cx + 52, cy, -1]];
    else plates = [cx - 48, cx + 48];
    const R0 = rng(31 + i), grains = [];
    for (let k = 0; k < 520; k++){
      const rr = R * Math.sqrt(R0()) * (kind === 'a' ? .9 : .96), a = 2 * Math.PI * R0(), x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
      if (ch.some(c => Math.hypot(x - c[0], y - c[1]) < 12)) continue;
      let ang, aligned = true;
      if (plates){ const inside = x > plates[0] + 6 && x < plates[1] - 6 && Math.abs(y - cy) < 82; if (Math.abs(x - plates[0]) < 6 || Math.abs(x - plates[1]) < 6) continue;
        if (inside) ang = 0; else { aligned = false; ang = R0() * 180; } }
      else { const [ex, ey] = efield(ch, x, y); ang = Math.atan2(ey, ex) * 180 / Math.PI; }
      const g = f.g({parent: sc}); f.rect(-4.5, -1.2, 9, 2.4, {rx: 1.2, fill: '#b98a3c', parent: g});
      grains.push({g, x, y, ang, a0: R0() * 180, aligned});
    }
    // électrodes et fils vers le générateur haute tension
    if (plates) plates.forEach((px, j) => { f.rect(px - 4, cy - 86, 8, 172, {rx: 2, fill: f.lg(uid('pl'), [[0, '#7c8896'], [.5, '#e9eef3'], [1, '#5d6978']], 0, 0, 1, 0), stroke: '#3b4654', 'stroke-width': .8, parent: sc});
      f.path(`M${px},${cy - 86} L${px},${cy - R - 14}`, {stroke: j ? '#1f5fa8' : '#d62839', 'stroke-width': 2.4, parent: sc}); });
    // (a) l'autre borne du générateur est reliée à un anneau métallique posé contre la paroi : champ radial entre la pointe et l'anneau
    if (kind === 'a'){ f.circ(cx, cy, R - 5, {fill: 'none', stroke: '#5d6978', 'stroke-width': 5.5, parent: sc}); f.circ(cx, cy, R - 5, {fill: 'none', stroke: '#d7dde4', 'stroke-width': 2, parent: sc});
      f.path(`M${cx + (R - 5) * .5},${cy - (R - 5) * .866} C${cx + 70},${cy - R - 2} ${cx + 66},${cy - R - 8} ${cx + 72},${cy - R - 14}`, {stroke: '#1f5fa8', 'stroke-width': 2.4, fill: 'none', parent: sc}); }
    ch.forEach(([x, y, q]) => { f.circ(x, y, 7, {fill: f.rg(uid('el'), [[0, '#ffffff'], [1, '#5d6978']], .35, .3, .75), stroke: '#3b4654', 'stroke-width': .8, parent: sc});
      f.path(`M${x},${y - 7} C${x},${y - 60} ${x + (q > 0 ? -10 : 10)},${cy - R + 10} ${x + (q > 0 ? -16 : 16)},${cy - R - 14}`, {stroke: q > 0 ? '#d62839' : '#1f5fa8', 'stroke-width': 2.4, fill: 'none', parent: sc}); });
    tag(f, sc, cx, 318, {a: '(a) une pointe au centre d’un anneau', b: '(b) deux électrodes ponctuelles', c: '(c) deux plaques parallèles'}[kind], {size: 12, w: 240});
    return grains;
  });
  f.frame();
  return {update(t){
    const u = o.book ? 1 : ease(clamp(((t % 9) - 1) / 2.5, 0, 1));
    panes.forEach(gr => gr.forEach(g => { const a = g.aligned ? g.a0 + (((g.ang - g.a0) % 180 + 270) % 180 - 90) * u : g.a0; setT(g.g, g.x, g.y, a); }));
  }};
};

/* ---------- À retenir : lignes de champ (charge positive, négative, deux charges, plaques) ---------- */
SCENES.lignes = (host, o = {}) => {
  const W = 960, H = 260, f = new Fig(host, W, H, {label: 'Lignes de champ : radiales pour une charge ponctuelle, courbes de + vers − pour deux charges, parallèles entre deux plaques'});
  const box = (x0) => [x0 + 6, 18, x0 + 234, 214];
  // (a) charge positive, (b) charge négative
  [[1, 0], [-1, 240]].forEach(([s, x0]) => { const cx = x0 + 120, cy = 116;
    for (let k = 0; k < 12; k++){ const a = rad(k * 30 + 15), p1 = [cx + 22 * Math.cos(a), cy + 22 * Math.sin(a)], p2 = [cx + 96 * Math.cos(a), cy + 96 * Math.sin(a)];
      const pts = []; for (let i = 0; i <= 20; i++){ const u = i / 20; pts.push(s > 0 ? [lerp(p1[0], p2[0], u), lerp(p1[1], p2[1], u)] : [lerp(p2[0], p1[0], u), lerp(p2[1], p1[1], u)]); }
      drawLine(f, null, pts, C.red, 1.5, {at: .6}); }
    pcharge(f, null, cx, cy, s, 15);
    f.T(cx, 246, s > 0 ? 'charge positive : centrifuge' : 'charge négative : centripète', {cls: 'lbl-b', anchor: 'middle', size: 14, fill: C.ink2}); });
  // (c) deux charges opposées
  { const x0 = 480, ch = [[x0 + 70, 116, 1], [x0 + 170, 116, -1]];
    fieldLines(ch, 14, box(x0)).forEach(l => drawLine(f, null, l, C.red, 1.4, {at: .45}));
    pcharge(f, null, ch[0][0], 116, 1, 13); pcharge(f, null, ch[1][0], 116, -1, 13);
    f.T(x0 + 120, 246, 'deux charges opposées', {cls: 'lbl-b', anchor: 'middle', size: 14, fill: C.ink2}); }
  // (d) deux plaques parallèles
  { const x0 = 720, xp = x0 + 50, xn = x0 + 190;
    for (let k = 0; k < 7; k++){ const y = 40 + k * 25; drawLine(f, null, [[xp + 6, y], [lerp(xp + 6, xn - 6, .5), y], [xn - 6, y]].flatMap((p, i, a) => i < a.length - 1 ? Array.from({length: 4}, (_, j) => [lerp(p[0], a[i + 1][0], j / 4), y]) : [p]), C.red, 1.5); }
    f.rect(xp - 8, 26, 9, 178, {rx: 2, fill: '#d62839'}); f.rect(xn - 1, 26, 9, 178, {rx: 2, fill: '#1f5fa8'});
    f.T(xp - 4, 20, M('P'), {cls: 'm', anchor: 'middle', size: 20}); f.T(xn + 4, 20, M('N'), {cls: 'm', anchor: 'middle', size: 20});
    for (let k = 0; k < 7; k++){ f.T(xp - 18, 46 + k * 25, '+', {cls: 'lbl-b', anchor: 'middle', size: 15, fill: C.red}); f.T(xn + 18, 46 + k * 25, '−', {cls: 'lbl-b', anchor: 'middle', size: 15, fill: C.blue}); }
    f.T(x0 + 120, 246, 'champ uniforme entre deux plaques', {cls: 'lbl-b', anchor: 'middle', size: 14, fill: C.ink2}); }
  [240, 480, 720].forEach(x => f.line(x, 14, x, 228, {stroke: '#c9d6e6', 'stroke-width': 1.2, 'stroke-dasharray': '5 5'}));
  return {update(){}};
};

/* ---------- Application 2 : champ au milieu O de deux charges opposées ---------- */
SCENES.champO = (host, o = {}) => {
  const W = 560, H = 200, f = new Fig(host, W, H, {label: 'Charges +q en A et −q en B ; champ électrostatique au milieu O'});
  const xa = 110, xb = 450, y = 100, xo = 280;
  f.line(40, y, 520, y, {stroke: '#c9d6e6', 'stroke-width': 1.4, 'stroke-dasharray': '6 5'});
  pcharge(f, null, xa, y, 1, 16); pcharge(f, null, xb, y, -1, 16);
  f.T(xa, y - 28, M('A'), {cls: 'm', anchor: 'middle', size: 21}); f.T(xb, y - 28, M('B'), {cls: 'm', anchor: 'middle', size: 21});
  f.T(xa, y + 44, M('q_A = +2,0 µ\\C', 18), {cls: 'm', anchor: 'middle', size: 18, fill: C.purple}); f.T(xb, y + 44, M('q_B = −2,0 µ\\C', 18), {cls: 'm', anchor: 'middle', size: 18, fill: C.purple});
  f.dot(xo, y, {r: 4.5}); f.T(xo - 6, y + 26, M('O'), {cls: 'm', anchor: 'middle', size: 21});
  f.path(`M${xa},${y + 66} L${xb},${y + 66}`, {stroke: C.ink2, 'stroke-width': 1.2, 'marker-end': f.mk('ink2'), 'marker-start': f.mk('ink2')}); f.T(xo, y + 86, M('AB = 2a = 10 \\cm', 18), {cls: 'm', anchor: 'middle', size: 18});
  const vs = [];
  if (o.final){
    const ea = vec(f, null, xo, y - 22, xo + 70, y - 22, C.red, 3), eb = vec(f, null, xo, y - 44, xo + 70, y - 44, C.blue, 3), et = vec(f, null, xo, y, xo + 140, y, C.green, 3.6);
    vlab(f, null, xo - 10, y - 16, 'E_A', C.red, 19, 'end'); vlab(f, null, xo - 10, y - 38, 'E_B', C.blue, 19, 'end'); vlab(f, null, xo + 76, y + 30, 'E(O)', C.green, 19);
    vs.push(ea, eb, et);
  }
  return {update(t){ if (!vs.length) return; const u = o.book ? 1 : ease(clamp((t % 6) / 2, 0, 1));
    setVec(vs[0], xo, y - 22, xo + 70 * u, y - 22); setVec(vs[1], xo, y - 44, xo + 70 * u, y - 44); setVec(vs[2], xo, y, xo + 140 * clamp(u * 1.2 - .2, .01, 1), y); }};
};

/* ---------- Exercice 2 : triangle équilatéral et carré ---------- */
// o.final : vecteurs champs et champ résultant
SCENES.ex2geo = (host, o = {}) => {
  const W = 680, H = 300, f = new Fig(host, W, H, {label: 'Triangle équilatéral ABM et carré ABCD portant des charges ponctuelles'});
  // (1) triangle
  const A = [60, 240], B = [260, 240], Mp = [160, 240 - 200 * Math.sqrt(3) / 2];
  f.path(`M${A[0]},${A[1]} L${B[0]},${B[1]} L${Mp[0]},${Mp[1]} Z`, {stroke: '#9fb7cf', 'stroke-width': 1.3, fill: 'none', 'stroke-dasharray': '6 5'});
  f.line(160, 250, 160, 60, {stroke: '#c9d6e6', 'stroke-width': 1, 'stroke-dasharray': '3 4'});
  pcharge(f, null, A[0], A[1], 1, 13); pcharge(f, null, B[0], B[1], -1, 13); f.dot(Mp[0], Mp[1], {r: 4.5});
  f.T(A[0] - 6, A[1] + 34, M('A (+q)', 19), {cls: 'm', anchor: 'middle', size: 19}); f.T(B[0] + 6, B[1] + 34, M('B (−q)', 19), {cls: 'm', anchor: 'middle', size: 19}); f.T(Mp[0] - 14, Mp[1] - 8, M('M', 21), {cls: 'm', anchor: 'end', size: 21});
  f.T(160, 292, M('AB = MA = MB = 2a', 17), {cls: 'm', anchor: 'middle', size: 17});
  // (2) carré
  const s = 140, x0 = 420, y0 = 70, Q = {A: [x0, y0, 1], B: [x0 + s, y0, -1], C: [x0 + s, y0 + s, 1]}, D = [x0, y0 + s];
  f.rect(x0, y0, s, s, {stroke: '#9fb7cf', 'stroke-width': 1.3, fill: 'none', 'stroke-dasharray': '6 5'});
  Object.entries(Q).forEach(([n, [x, y, q]]) => { pcharge(f, null, x, y, q, 13); f.T(x + (x > x0 ? 22 : -22), y + (y > y0 ? 30 : -14), M(`${n} (${q > 0 ? '+' : '−'}q)`, 19), {cls: 'm', anchor: x > x0 ? 'start' : 'end', size: 19}); });
  f.dot(D[0], D[1], {r: 4.5}); f.T(D[0] + (o.final ? 10 : -14), D[1] + 24, M('D', 21), {cls: 'm', anchor: o.final ? 'start' : 'end', size: 21});
  f.T(x0 + s / 2, y0 + s + 52, M('côté a', 17), {cls: 'm', anchor: 'middle', size: 17});
  f.line(330, 14, 330, 286, {stroke: '#c9d6e6', 'stroke-width': 1.2, 'stroke-dasharray': '5 5'});
  if (o.final){
    const L = 62, c60 = .5, s60 = Math.sqrt(3) / 2;
    vec(f, null, Mp[0], Mp[1], Mp[0] + L * c60, Mp[1] - L * s60, C.red, 2.6); vec(f, null, Mp[0], Mp[1], Mp[0] + L * c60, Mp[1] + L * s60, C.blue, 2.6); vec(f, null, Mp[0], Mp[1], Mp[0] + L, Mp[1], C.green, 3.2);
    vlab(f, null, Mp[0] + 44, Mp[1] - 52, 'E_A', C.red, 18); vlab(f, null, Mp[0] + 44, Mp[1] + 66, 'E_B', C.blue, 18); vlab(f, null, Mp[0] + 88, Mp[1] + 6, 'E', C.green, 18);
    const k = 52, kb = 26;   // E_B = E_A / 2
    vec(f, null, D[0], D[1], D[0], D[1] + k, C.red, 2.6); vec(f, null, D[0], D[1], D[0] - k, D[1], C.red, 2.6);
    vec(f, null, D[0], D[1], D[0] + kb * Math.SQRT1_2, D[1] - kb * Math.SQRT1_2, C.blue, 2.6);
    vec(f, null, D[0], D[1], D[0] - (k * Math.SQRT2 - kb) * Math.SQRT1_2, D[1] + (k * Math.SQRT2 - kb) * Math.SQRT1_2, C.green, 3.2);
    vlab(f, null, D[0] + 24, D[1] + 62, 'E_A', C.red, 17); vlab(f, null, D[0] - 46, D[1] - 10, 'E_C', C.red, 17); vlab(f, null, D[0] + 36, D[1] - 22, 'E_B', C.blue, 17);
  }
  return {update(){}};
};

/* ---------- Exercice 1 (correction) : E = f(x) ---------- */
SCENES.courbeE = (host, o = {}) => {
  const W = 460, H = 300, f = new Fig(host, W, H, {label: 'Intensité du champ en fonction de la distance : décroissance en 1/x²'});
  const X = x => 60 + x * 72, Y = e => 250 - e * 21;
  for (let x = 0; x <= 5; x++) f.line(X(x), Y(0), X(x), Y(10.5), {stroke: '#e3eaf2', 'stroke-width': 1});
  for (let e = 0; e <= 10; e += 2) { f.line(X(0), Y(e), X(5.4), Y(e), {stroke: '#e3eaf2', 'stroke-width': 1}); f.T(X(0) - 8, Y(e) + 5, String(e), {cls: 'lbl-s', anchor: 'end', size: 13}); }
  for (let x = 1; x <= 5; x++) f.T(X(x), Y(0) + 20, String(x), {cls: 'lbl-s', anchor: 'middle', size: 13});
  f.path(`M${X(0)},${Y(0)} L${X(5.5)},${Y(0)}`, {stroke: C.ink, 'stroke-width': 1.4, 'marker-end': f.mk('ink')}); f.path(`M${X(0)},${Y(0)} L${X(0)},${Y(11.3)}`, {stroke: C.ink, 'stroke-width': 1.4, 'marker-end': f.mk('ink')});
  f.T(X(5.5), Y(0) + 22, M('x (\\cm)', 17), {cls: 'm', anchor: 'end', size: 17}); f.T(X(0) + 10, Y(11), M('E (\\N/\\C)', 17), {cls: 'm', size: 17});
  const pts = []; for (let x = .97; x <= 5.2; x += .05) pts.push([X(x), Y(10 / (x * x))]);
  const cv = f.path(pts.map((p, i) => (i ? 'L' : 'M') + f2(p[0]) + ',' + f2(p[1])).join(''), {stroke: C.blue, 'stroke-width': 2.6, fill: 'none'});
  const L = pts.reduce((s, p, i) => i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0, 0); cv.setAttribute('stroke-dasharray', f2(L));
  [1, 2, 3, 4, 5].forEach(x => f.dot(X(x), Y(10 / (x * x)), {r: 4, fill: C.orange}));
  return {update(t){ cv.setAttribute('stroke-dashoffset', f2(L * (1 - (o.book ? 1 : clamp((t % 6) / 3, 0, 1))))); }};
};
