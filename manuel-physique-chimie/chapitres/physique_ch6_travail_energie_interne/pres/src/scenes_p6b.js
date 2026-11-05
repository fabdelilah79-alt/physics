/* ===== Physique, chapitre 6 — énergie interne, premier principe, exercices ===== */

/* ---------- Activité 3, doc 4 (et situation 3) : bouteille immobile et agitation des molécules ---------- */
SCENES.molecules = (host, o = {}) => {
  const W = 620, H = 340, f = new Fig(host, W, H, {label: 'Bouteille de gaz immobile au sol ; à la loupe, ses molécules sont en agitation permanente et interagissent'});
  const sc = labScene(f, 300), d = realDefs(f);
  // bouteille
  const bx = 120;
  shadowEll(f, sc, bx, 302, 44, 6);
  f.rect(bx - 40, 90, 80, 210, {rx: 30, fill: f.lg('bt6', [[0, '#7a141c'], [.35, '#e0535c'], [1, '#5a0d16']], 0, 0, 1, 0), stroke: '#3a080e', 'stroke-width': 1, parent: sc});
  f.rect(bx - 12, 60, 24, 34, {rx: 4, fill: d.metal, parent: sc}); f.rect(bx - 22, 52, 44, 12, {rx: 4, fill: '#3b4654', parent: sc});
  f.T(bx, 210, 'GAZ', {cls: 'lbl-b', anchor: 'middle', size: 15, fill: '#ffffff', parent: sc});
  tag(f, sc, bx, 30, 'bouteille immobile au sol', {size: 14, w: 176});
  // loupe
  const lx = 420, ly = 160, R = 120;
  f.path(`M${bx + 30},150 L${lx - R * .9},${ly - 50} M${bx + 30},220 L${lx - R * .9},${ly + 50}`, {stroke: C.ink2, 'stroke-width': 1.2, 'stroke-dasharray': '5 4', parent: sc});
  f.circ(bx + 20, 185, 22, {fill: 'none', stroke: C.ink2, 'stroke-width': 1.5, parent: sc});
  const cp = f.clip(uid('lp'), c => f.el('circle', {cx: lx, cy: ly, r: R}, c));
  const inner = f.g({parent: sc, 'clip-path': cp});
  f.circ(lx, ly, R, {fill: f.rg('lpb', [[0, '#ffffff'], [1, '#dbe9f7']]), parent: inner});
  const links = f.g({parent: inner});
  const r = rng(8), P = [...Array(14)].map(() => ({x: r(), y: r(), a: r() * 6.28, w: .6 + r(), g: f.g({parent: inner})}));
  P.forEach(p => { f.circ(-8, 0, 10, {fill: f.rg(uid('o'), [[0, '#ffb3b3'], [1, '#c2321f']], .35, .3, .8), parent: p.g}); f.circ(8, 0, 10, {fill: f.rg(uid('o2'), [[0, '#ffb3b3'], [1, '#c2321f']], .35, .3, .8), parent: p.g});
    p.v = vec(f, inner, 0, 0, 0, 0, C.orange, 2); });
  f.circ(lx, ly, R, {fill: 'none', stroke: '#3b4654', 'stroke-width': 10, parent: sc});
  f.line(lx + R * .72, ly + R * .72, lx + R * 1.05, ly + R * 1.05, {stroke: '#1b2a41', 'stroke-width': 16, 'stroke-linecap': 'round', parent: sc});
  tag(f, sc, lx, 318, 'agitation et interactions des molécules', {size: 13, w: 250});
  f.frame();
  const fold = u => { const m = ((u % 2) + 2) % 2; return m > 1 ? 2 - m : m; };
  return {update(t){
    const tt = o.book ? 1.3 : t;
    const pos = P.map(p => [lx - 95 + 190 * fold(p.x + Math.cos(p.a) * p.w * tt * .18), ly - 95 + 190 * fold(p.y + Math.sin(p.a) * p.w * tt * .18)]);
    P.forEach((p, i) => { const [x, y] = pos[i]; setT(p.g, x, y, (tt * 90 * p.w + i * 40) % 360);
      const dx = Math.cos(p.a) * 30 * p.w, dy = Math.sin(p.a) * 30 * p.w; setVec(p.v, x, y, x + dx, y + dy); });
    links.innerHTML = '';
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++){ const dd = Math.hypot(pos[i][0] - pos[j][0], pos[i][1] - pos[j][1]);
      if (dd < 70) f.line(pos[i][0], pos[i][1], pos[j][0], pos[j][1], {stroke: C.purple, 'stroke-width': 1.2, 'stroke-dasharray': '3 3', opacity: .7, parent: links}); }
  }};
};

/* ---------- Application 3 : bille qui tombe et s'immobilise au sol ---------- */
SCENES.billeChute = (host, o = {}) => {
  const W = 360, H = 400, f = new Fig(host, W, H, {label: 'Bille métallique lâchée de 5,0 m qui s’immobilise sur le sol après le choc'});
  const sc = outdoor(f, 360, {ground: 'road', noHills: true}), K = 60;
  f.line(60, 360, 60, 360 - 5 * K, {stroke: C.purple, 'stroke-width': 1.5, 'marker-start': f.mk('purple'), 'marker-end': f.mk('purple'), parent: sc});
  f.T(70, 360 - 2.5 * K, M('h = 5,0 \\m', 18), {cls: 'm', size: 18, fill: C.purple, parent: sc});
  f.line(56, 360 - 5 * K, 230, 360 - 5 * K, {stroke: C.ink2, 'stroke-width': 1, 'stroke-dasharray': '4 4', parent: sc});
  f.T(236, 360 - 5 * K + 5, 'A', {cls: 'lbl-b', size: 16, parent: sc}); f.T(236, 352, 'B', {cls: 'lbl-b', size: 16, parent: sc});
  const b = f.g({parent: sc}); ball(f, b, 0, 0, 13);
  const warm = f.circ(0, 0, 13, {fill: '#ff5a2a', opacity: 0, parent: b});
  tag(f, sc, 280, 40, 'm = 200 g', {size: 14, w: 74});
  f.frame();
  return {update(t){
    const c = o.book ? 0 : t % 4, u = clamp(c / 1.2, 0, 1), y = 360 - 13 - (5 * K - 13) * (1 - u * u);
    setT(b, 180, o.book ? 360 - 5 * K : y); warm.setAttribute('opacity', f2(u >= 1 ? .45 : 0));
  }};
};

/* ---------- Activité 4, doc 5 (et situation 4) : expérience de Joule ---------- */
SCENES.joule = (host, o = {}) => {
  const W = 620, H = 400, f = new Fig(host, W, H, {label: 'Expérience de Joule : des masses qui descendent font tourner des palettes dans l’eau d’un récipient isolé ; un thermomètre mesure l’élévation de température'});
  const sc = labScene(f, 370), d = realDefs(f), cx = 310;
  const cal = calorimeter(f, sc, cx, 368, 200, 180, {level: .7});
  const th = probeThermo(f, sc, cal.probeX + 30, 118, cal.yIn - 10, {title: 'θ (°C)', h: 52});
  // axe des palettes
  const ax = f.rect(cx - 4, 70, 8, cal.yIn - 80, {fill: d.metal, parent: sc});
  const pal = f.g({parent: sc});
  // poulies et masses
  const bar = 70; f.rect(60, bar - 6, 500, 10, {rx: 4, fill: '#5d6978', parent: sc});
  [[110, -1], [510, 1]].forEach(([px]) => { f.rect(px - 4, bar, 8, 300, {fill: d.metal, parent: sc}); f.rect(px - 30, 362, 60, 8, {rx: 3, fill: '#3b4654', parent: sc}); });
  const drum = f.g({parent: sc}); setT(drum, cx, 90); f.rect(-30, -10, 60, 20, {rx: 6, fill: '#6b4f2e', parent: drum});
  const cordL = f.path('', {stroke: '#6b4f2e', 'stroke-width': 2.5, fill: 'none', parent: sc}), cordR = f.path('', {stroke: '#6b4f2e', 'stroke-width': 2.5, fill: 'none', parent: sc});
  const mL = f.g({parent: sc}), mR = f.g({parent: sc}); weight(f, mL, 0, 0, 40, 46, {label: '10 kg'}); weight(f, mR, 0, 0, 40, 46, {label: '10 kg'});
  [130, 490].forEach(x => f.circ(x, bar + 16, 12, {fill: f.rg(uid('pl'), [[0, '#e9eef3'], [1, '#5d6978']], .4, .35, .7), stroke: '#3b4654', 'stroke-width': 1, parent: sc}));
  vec(f, sc, 578, 200, 578, 270, C.red, 2.6); f.T(578, 290, 'chute', {cls: 'lbl-b', anchor: 'middle', size: 13, fill: C.red, parent: sc});
  tag(f, sc, cx, 34, 'eau : m = 1,5 kg (récipient isolé)', {size: 14, w: 232});
  if (!o.book) f.T(12, H - 6, 'animation ralentie', {cls: 'lbl-s', size: 12, fill: '#ffffff', parent: sc});
  f.frame();
  return {update(t){
    const c = o.book ? 0 : t % 7, u = clamp(c / 5, 0, 1), yM = 130 + 150 * u, a = (o.book ? 0 : t) * 160;
    setT(mL, 130 - 12, yM); setT(mR, 490 + 12, yM);
    f.set(cordL, {d: `M118,${f2(yM)} L118,${bar + 16} L${cx - 30},90`}); f.set(cordR, {d: `M502,${f2(yM)} L502,${bar + 16} L${cx + 30},90`});
    pal.innerHTML = ''; const yP = cal.yIn - 50;
    for (let k = 0; k < 4; k++){ const ph = (a + k * 90) * Math.PI / 180, wv = 70 * Math.cos(ph); f.rect(cx + Math.min(0, wv), yP - 18 + k * 0, Math.abs(wv), 36, {fill: '#c3ccd6', opacity: .5 + .5 * Math.sin(ph) ** 2, stroke: '#5d6978', 'stroke-width': .8, parent: pal}); }
    th.textContent = fr(18 + .94 * u, 2);
  }};
};

/* ---------- À retenir 4 : bilan d'énergie d'un système (convention de signe) ---------- */
SCENES.bilanUWQ = (host, o = {}) => {
  const W = 520, H = 280, f = new Fig(host, W, H, {label: 'Le système reçoit le travail W et la chaleur Q, comptés positivement quand ils entrent ; son énergie interne varie de ΔU = W + Q'});
  f.rect(170, 70, 180, 140, {rx: 16, fill: f.lg('sys', [[0, '#e9e3f7'], [1, '#c9bdf0']]), stroke: C.purple, 'stroke-width': 2});
  f.T(260, 120, 'système', {cls: 'lbl-b', anchor: 'middle', size: 17, fill: C.purple});
  f.T(260, 160, M('ΔU = W + Q', 24), {cls: 'm', anchor: 'middle', size: 24, fill: C.ink});
  f.T(260, 40, 'milieu extérieur', {cls: 'lbl-b', anchor: 'middle', size: 15, fill: C.ink2});
  const arrows = [[30, 110, 165, 110, C.blue, 'W > 0', 'travail reçu'], [30, 175, 165, 175, C.red, 'Q > 0', 'chaleur reçue'], [355, 110, 490, 110, C.blue, 'W < 0', 'travail cédé'], [355, 175, 490, 175, C.red, 'Q < 0', 'chaleur cédée']];
  const A = arrows.map(([x1, y1, x2, y2, col, t1, t2]) => { const g = f.g({}); vec(f, g, x1, y1, x2, y2, col, 3.2);
    f.T((x1 + x2) / 2, y1 - 10, M(t1, 19), {cls: 'm', anchor: 'middle', size: 19, fill: col, parent: g}); f.T((x1 + x2) / 2, y1 + 24, t2, {cls: 'lbl-s', anchor: 'middle', size: 13, fill: C.ink2, parent: g}); return g; });
  return {update(t){ A.forEach((g, i) => g.setAttribute('opacity', o.book ? 1 : f2(clamp((t % 8) - i * .8, 0, 1)))); }};
};

/* ---------- Exercice 2 : cycle dans le diagramme (V, P) ---------- */
SCENES.cycle = (host, o = {}) => {
  const W = 460, H = 340, f = new Fig(host, W, H, {label: 'Cycle A, B, C : compression adiabatique de A à B, refroidissement isochore de B à C, détente isobare de C à A'});
  const ox = 70, oy = 290, X = v => ox + v * 80, Y = p => oy - p * 70;   // V en L, P en 10^5 Pa
  for (let v = 1; v <= 4.5; v += .5) f.line(X(v), oy, X(v), Y(3.6), {stroke: '#e6edf5', 'stroke-width': 1});
  for (let p = .5; p <= 3.5; p += .5) f.line(ox, Y(p), X(4.6), Y(p), {stroke: '#e6edf5', 'stroke-width': 1});
  f.line(ox, oy, X(4.8), oy, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')}); f.line(ox, oy, ox, Y(3.8), {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  f.T(X(4.8), oy + 24, M('V (\\L)', 19), {cls: 'm', anchor: 'end', size: 19}); f.T(ox + 8, Y(3.75), M('P (10^5 \\P\\a)', 19), {cls: 'm', size: 19});
  [1, 2, 3, 4].forEach(v => f.T(X(v), oy + 20, String(v), {cls: 'lbl', anchor: 'middle', size: 14}));
  [1, 1.5, 2, 3].forEach(p => f.T(ox - 8, Y(p) + 5, fr(p, p % 1 ? 1 : 0), {cls: 'lbl', anchor: 'end', size: 14}));
  const A = [4, 1.5], B = [2, 3.0], Cc = [2, 1.5];
  let dAB = ''; for (let k = 0; k <= 20; k++){ const v = lerp(4, 2, k / 20), p = 1.5 * Math.pow(4 / v, 1.0); dAB += (k ? 'L' : 'M') + f2(X(v)) + ',' + f2(Y(p)); }
  f.path(dAB, {stroke: C.orange, 'stroke-width': 3}); f.line(X(2), Y(3), X(2), Y(1.5), {stroke: C.orange, 'stroke-width': 3}); f.line(X(2), Y(1.5), X(4), Y(1.5), {stroke: C.orange, 'stroke-width': 3});
  [[A, 'A', 10, -8], [B, 'B', -14, -6], [Cc, 'C', -16, 18]].forEach(([p, n, dx, dy]) => { f.dot(X(p[0]), Y(p[1]), {r: 5}); f.T(X(p[0]) + dx, Y(p[1]) + dy, n, {cls: 'lbl-b', size: 17}); });
  vec(f, null, X(3.2), Y(1.9) - 2, X(2.9), Y(2.15) - 4, C.orange, 2.4); vec(f, null, X(2), Y(2.4), X(2), Y(2.0), C.orange, 2.4); vec(f, null, X(2.8), Y(1.5), X(3.2), Y(1.5), C.orange, 2.4);
  tag(f, null, X(3.5), Y(2.6), 'adiabatique', {size: 13, w: 82}); tag(f, null, X(1.45), Y(2.3), 'isochore', {size: 13, w: 60}); tag(f, null, X(3), Y(1.5) + 26, 'isobare', {size: 13, w: 56});
  const dot = f.dot(0, 0, {r: 7, fill: C.red});
  return {update(t){
    const u = o.book ? 0 : (t % 6) / 6; let v, p;
    if (u < 1 / 3){ const k = u * 3; v = lerp(4, 2, k); p = 1.5 * 4 / v; } else if (u < 2 / 3){ const k = u * 3 - 1; v = 2; p = lerp(3, 1.5, k); } else { const k = u * 3 - 2; v = lerp(2, 4, k); p = 1.5; }
    dot.setAttribute('cx', f2(X(v))); dot.setAttribute('cy', f2(Y(p))); dot.setAttribute('opacity', o.book ? 0 : 1);
  }};
};
