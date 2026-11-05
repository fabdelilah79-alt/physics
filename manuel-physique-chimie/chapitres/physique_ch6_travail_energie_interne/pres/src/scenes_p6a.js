/* ===== Physique, chapitre 6 — Le travail et l'énergie interne : titre, parties 1 et 2 ===== */

// particules de gaz dans un rectangle (x, y, w, h) : mouvement déterministe (rebonds par repliement) ; renvoie update(t, w)
function gasParticles(f, parent, x, y, w, h, n = 26, o = {}){
  const r = rng(o.seed || 3), P = [...Array(n)].map(() => ({x: r(), y: r(), vx: (r() - .5) * 2, vy: (r() - .5) * 2,
    c: f.circ(0, 0, o.r || 5, {fill: f.rg(uid('gp'), [[0, '#ffffff'], [.5, o.col || '#6fa2e6'], [1, shade(o.col || '#1f5fa8', .3)]], .35, .3, .8), parent})}));
  const fold = u => { const m = ((u % 2) + 2) % 2; return m > 1 ? 2 - m : m; };
  return (t, ww = w, speed = 1) => P.forEach(p => {
    const rr = o.r || 5;
    p.c.setAttribute('cx', f2(x + rr + fold(p.x + p.vx * t * .25 * speed) * (ww - 2 * rr)));
    p.c.setAttribute('cy', f2(y + rr + fold(p.y + p.vy * t * .25 * speed) * (h - 2 * rr)))});
}

/* ---------- Titre (et bandeau du livre) : moteur à piston en coupe, gaz chaud, volant qui tourne ---------- */
SCENES.titre = (host, o = {}) => {
  const W = o.W || 1600, H = o.H || 900, f = new Fig(host, W, H, {par: 'xMidYMid slice', label: 'Moteur à piston en coupe : le gaz chaud pousse le piston, la bielle fait tourner le volant'});
  const s = H / 900, d = realDefs(f);
  f.rect(0, 0, W, H, {fill: f.lg('bg6', [[0, '#101a33'], [.6, '#2b2350'], [1, '#5a2a3a']])});
  for (let k = 0; k < 14; k++) f.circ(W * (.45 + .04 * k), H * (.15 + .05 * (k % 5)), 2 * s, {fill: '#ffc93c', opacity: .25});
  // cylindre vertical, piston, bielle, volant
  const cx = W * .7, top = H * .14, cw = 230 * s, ch = 330 * s, wy = H * .78, R = 95 * s;
  f.rect(cx - cw / 2 - 26 * s, top - 20 * s, cw + 52 * s, ch + 20 * s, {rx: 10 * s, fill: f.lg('cyl6', [[0, '#3b4654'], [.3, '#9aa7b6'], [.7, '#5d6978'], [1, '#2b3440']], 0, 0, 1, 0)});
  for (let k = 0; k < 6; k++) f.rect(cx - cw / 2 - 40 * s, top + k * 46 * s, cw + 80 * s, 12 * s, {rx: 4 * s, fill: '#4a5560'});
  f.rect(cx - cw / 2, top, cw, ch, {fill: '#120a1c'});
  const gas = f.rect(cx - cw / 2, top, cw, 100 * s, {fill: f.lg('gas6', [[0, '#ffd166'], [.5, '#f07f1e'], [1, '#d62839']])});
  const glow = f.circ(cx, top + 40 * s, 120 * s, {fill: '#ff8a3a', opacity: .35, filter: d.blur6});
  const pis = f.g({});
  f.rect(-cw / 2 + 4 * s, 0, cw - 8 * s, 70 * s, {rx: 6 * s, fill: f.lg('pis6', [[0, '#7c8896'], [.4, '#e9eef3'], [1, '#5d6978']], 0, 0, 1, 0), parent: pis});
  [14, 28].forEach(yy => f.rect(-cw / 2 + 4 * s, yy * s, cw - 8 * s, 4 * s, {fill: '#3b4654', parent: pis}));
  const rod = f.line(0, 0, 0, 0, {stroke: '#c3ccd6', 'stroke-width': 22 * s, 'stroke-linecap': 'round'});
  const wheel = f.g({}); setT(wheel, cx, wy);
  f.circ(0, 0, R * 1.6, {fill: 'none', stroke: '#3b4654', 'stroke-width': 26 * s, parent: wheel});
  f.circ(0, 0, R * 1.6, {fill: 'none', stroke: '#8a96a8', 'stroke-width': 8 * s, parent: wheel});
  for (let k = 0; k < 6; k++) f.line(0, 0, R * 1.6 * Math.cos(k * Math.PI / 3), R * 1.6 * Math.sin(k * Math.PI / 3), {stroke: '#5d6978', 'stroke-width': 10 * s, parent: wheel});
  f.circ(0, 0, 22 * s, {fill: '#c3ccd6', parent: wheel});
  const pin = f.circ(0, 0, 14 * s, {fill: '#e9eef3', stroke: '#3b4654', 'stroke-width': 2});
  f.rect(0, 0, W, H, {fill: f.lg('veil6', [[0, '#050d20', .92], [.4, '#050d20', .55], [.58, '#050d20', 0]], 0, 0, 1, 0)});
  if (o.book){
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22} L${W},${H} L0,${H} Z`, {fill: '#ffffff', stroke: 'none'});
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22}`, {stroke: '#f07f1e', 'stroke-width': 5});
  }
  const Lr = 250 * s;
  return {update(t){
    const a = o.book ? 1.1 : t * 2.2, px = cx + R * Math.sin(a), py = wy - R * Math.cos(a);
    const yp = py - Math.sqrt(Lr * Lr - (px - cx) ** 2);   // tête de bielle (axe du piston)
    setT(pis, cx, yp - 40 * s); f.set(rod, {x1: cx, y1: yp, x2: px, y2: py}); pin.setAttribute('cx', f2(px)); pin.setAttribute('cy', f2(py));
    setT(wheel, cx, wy, a * 180 / Math.PI);
    f.set(gas, {height: f2(Math.max(10, yp - 40 * s - top))}); glow.setAttribute('opacity', f2(.2 + .25 * (1 + Math.cos(a)) / 2));
  }};
};

/* ---------- Activité 1, doc 1 (et situation 1) : quelques effets du travail reçu ---------- */
SCENES.effets = (host, o = {}) => {
  const PW = 250, G = 14, W = 4 * PW + 3 * G, H = 300, f = new Fig(host, W, H, {label: 'Quatre expériences : perçage d’une plaque d’acier, ressort étiré, deux blocs de glace frottés, allumette frottée sur son frottoir'});
  const d = realDefs(f);
  const panel = (i, key, title) => { const g = f.g({}); g.setAttribute('transform', `translate(${i * (PW + G)},0)`);
    const cp = f.clip(uid('ep'), c => f.el('rect', {x: 0, y: 0, width: PW, height: H, rx: 14}, c)); const inner = f.g({parent: g, 'clip-path': cp});
    f.rect(0, 0, PW, H, {fill: f.lg(uid('eb'), [[0, '#f2f6fb'], [1, '#dbe4ee']]), parent: inner}); f.rect(0, 250, PW, 50, {fill: f.lg(uid('ebe'), [[0, '#4a5868'], [1, '#2b3440']]), parent: inner});
    f.rect(.75, .75, PW - 1.5, H - 1.5, {rx: 14, fill: 'none', stroke: '#c9d6e6', 'stroke-width': 1.5, parent: g});
    f.rect(0, 0, PW, 40, {fill: '#ffffff', opacity: .85, parent: inner});
    f.circ(20, 20, 13, {fill: C.blue, parent: g}); f.T(20, 26, key, {cls: 'lbl-b', anchor: 'middle', size: 15, fill: '#ffffff', parent: g});
    f.T(40, 26, title, {cls: 'lbl-b', size: 14, fill: C.ink, parent: g}); return inner; };
  // a) perçage
  const pa = panel(0, 'a', 'Perçage d’une plaque');
  f.rect(30, 200, 190, 50, {rx: 3, fill: f.lg('ac', [[0, '#c3ccd6'], [1, '#7c8896']]), stroke: '#3b4654', 'stroke-width': 1, parent: pa});
  const hot = f.ell(125, 200, 30, 8, {fill: '#ff5a2a', opacity: .0, filter: d.blur4, parent: pa});
  const drill = f.g({parent: pa});
  f.rect(95, 60, 60, 70, {rx: 10, fill: f.lg('dr', [[0, '#1f5fa8'], [1, '#123461']]), parent: drill});
  f.rect(118, 130, 14, 18, {fill: '#3b4654', parent: drill});
  const bit = f.path('M121,148 L129,148 L127,198 L125,203 L123,198 Z', {fill: d.metal, parent: drill});
  const spir = f.path('', {stroke: '#5d6978', 'stroke-width': 1.2, fill: 'none', parent: drill});
  const ta = display(f, pa, 160, 50, 82, 56, 'θ (°C)', {noShadow: true});
  // b) ressort
  const pb = panel(1, 'b', 'Ressort étiré');
  f.rect(14, 120, 14, 110, {fill: '#8a96a8', parent: pb}); for (let y = 124; y < 230; y += 10) f.line(14, y, 4, y + 8, {stroke: '#5d6978', 'stroke-width': 1.2, parent: pb});
  const sp = spring(f, pb, 28, 170, 120, {n: 10, r: 11});
  const hook = f.g({parent: pb}); f.rect(0, -12, 50, 24, {rx: 5, fill: f.lg('dy', [[0, '#eef2f6'], [1, '#9aa7b6']]), stroke: '#5d6978', 'stroke-width': 1, parent: hook});
  f.T(25, 5, 'dyn.', {cls: 'lbl-b', anchor: 'middle', size: 11, parent: hook});
  const vF = vec(f, pb, 0, 0, 0, 0, C.red, 3); const lF = f.g({parent: pb}); vlab(f, lF, 0, 0, 'F', C.red, 20, 'middle');
  // c) glace
  const pc = panel(2, 'c', 'Blocs de glace frottés');
  iceCube(f, pc, 60, 170, 80, 0); const ice2 = f.g({parent: pc}); iceCube(f, ice2, 0, 0, 70, 0);
  const drops = [...Array(4)].map((_, k) => f.ell(70 + k * 22, 252, 7, 3, {fill: '#9fd3f5', opacity: .8, parent: pc}));
  tag(f, pc, 125, 80, 'glace à 0 °C', {size: 14, w: 92});
  // d) allumette
  const pd = panel(3, 'd', 'Allumette frottée');
  f.rect(30, 200, 190, 40, {rx: 4, fill: '#c2452d', stroke: '#7a2a1a', 'stroke-width': 1, parent: pd});
  f.rect(40, 208, 170, 24, {rx: 3, fill: '#5a3a2a', parent: pd}); const rr = rng(4); for (let i = 0; i < 60; i++) f.circ(42 + rr() * 166, 210 + rr() * 20, .9, {fill: '#2b1a10', parent: pd});
  const match = f.g({parent: pd});
  f.rect(-4, -90, 8, 90, {rx: 2, fill: '#e8c98a', stroke: '#b8935a', 'stroke-width': .8, parent: match});
  f.ell(0, -94, 7, 9, {fill: '#a3161f', parent: match});
  const flame = f.path('M0,-100 C-12,-118 -6,-136 0,-150 C6,-136 12,-118 0,-100 Z', {fill: f.lg('fl6', [[0, '#fff1c9'], [.5, '#ffb347'], [1, '#f07f1e']]), parent: match});
  f.frame();
  return {update(t){
    const tt = o.book ? 2.6 : t % 6;
    // a
    const k = clamp(tt / 4, 0, 1); ta.textContent = fr(20 + 45 * k, 1); hot.setAttribute('opacity', f2(.8 * k));
    setT(drill, 0, 4 * k); let ds = ''; for (let y = 152; y < 196; y += 8){ const ph = (o.book ? 0 : t * 30) + y; ds += `M121,${y} L129,${y + 4 + Math.sin(ph) }`; } spir.setAttribute('d', ds);
    // b
    const xe = 120 + 70 * clamp(tt / 3, 0, 1); sp.set(28, xe); setT(hook, xe, 170); setVec(vF, xe + 50, 170, xe + 50 + 20 + (xe - 120) * .5, 170); setT(lF, xe + 68 + (xe - 120) * .25, 156);
    // c
    const kc = o.book ? .5 : tt; setT(ice2, 70 + 20 * Math.sin(kc * 6), 104); drops.forEach((e, i) => e.setAttribute('opacity', f2(clamp(tt / 2 - i * .4, 0, .85))));
    // d
    const u = clamp(tt / 1.6, 0, 1); setT(match, lerp(60, 190, u), 214, 18); flame.setAttribute('opacity', u >= 1 ? 1 : 0);
  }};
};

/* ---------- Réponse 2 / À retenir 1 : graphe F = k·x, le travail est l'aire du triangle ---------- */
SCENES.graphFx = (host, o = {}) => {
  const W = 460, H = 330, f = new Fig(host, W, H, {label: 'Intensité de la force en fonction de l’allongement : droite passant par l’origine ; le travail est l’aire du triangle sous la droite'});
  const ox = 70, oy = 280, X = v => ox + v * 320, Y = v => oy - v * 220;
  for (let i = 1; i <= 10; i++){ f.line(X(i / 10), oy, X(i / 10), Y(1.05), {stroke: '#e6edf5', 'stroke-width': 1}); f.line(ox, Y(i / 10), X(1.05), Y(i / 10), {stroke: '#e6edf5', 'stroke-width': 1}); }
  f.line(ox, oy, X(1.12), oy, {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  f.line(ox, oy, ox, Y(1.15), {stroke: C.ink, 'stroke-width': 1.8, 'marker-end': f.mk('ink')});
  f.T(X(1.12), oy + 26, M('x', 22), {cls: 'm', anchor: 'end', size: 22}); f.T(ox + 10, Y(1.12), M('F', 22), {cls: 'm', size: 22});
  f.T(ox - 8, oy + 20, '0', {cls: 'lbl', anchor: 'end', size: 16});
  if (o.empty) return {update(){}};
  const tri = f.path(`M${ox},${oy} L${X(.8)},${Y(.8)} L${X(.8)},${oy} Z`, {fill: tint(C.purple, .75), stroke: 'none', opacity: .85});
  const ln = f.line(ox, oy, X(1), Y(1), {stroke: C.blue, 'stroke-width': 3});
  f.line(X(.8), oy, X(.8), Y(.8), {stroke: C.ink2, 'stroke-width': 1.2, 'stroke-dasharray': '5 4'}); f.line(ox, Y(.8), X(.8), Y(.8), {stroke: C.ink2, 'stroke-width': 1.2, 'stroke-dasharray': '5 4'});
  f.T(X(.8), oy + 24, M('x', 20), {cls: 'm', anchor: 'middle', size: 20}); f.T(ox - 8, Y(.8) + 7, M('k·x', 20), {cls: 'm', anchor: 'end', size: 20});
  tag(f, null, X(.54), Y(.2), M('aire = W = ½ k·x^2', 17), {cls: 'm', size: 17, w: 150, fill: C.purple});
  f.T(X(.9), Y(1) - 4, M('F = k·x', 20), {cls: 'm', anchor: 'end', size: 20, fill: C.blue});
  return {update(t){ tri.setAttribute('opacity', o.book ? .85 : f2(.85 * clamp((t % 6 - 1) / 2, 0, 1))); }};
};

/* ---------- Application 1 : ressort étiré de 18 cm à 25 cm ---------- */
SCENES.ressortApp = (host, o = {}) => {
  const W = 620, H = 230, f = new Fig(host, W, H, {label: 'Ressort de longueur à vide 15 cm étiré lentement de 18 cm à 25 cm le long d’une règle graduée'});
  const sc = f.card(f.lg('ra', [[0, '#f2f6fb'], [1, '#e3eaf2']])), K = 20, x0 = 50;   // 20 px = 1 cm
  f.rect(26, 60, 24, 110, {fill: '#8a96a8', parent: sc}); for (let y = 64; y < 170; y += 10) f.line(26, y, 16, y + 8, {stroke: '#5d6978', 'stroke-width': 1.2, parent: sc});
  // règle
  f.rect(x0, 150, 28 * K + 10, 34, {rx: 3, fill: '#fff6d6', stroke: '#c9b46a', 'stroke-width': 1, parent: sc});
  for (let c = 0; c <= 28; c++){ f.line(x0 + c * K, 150, x0 + c * K, 150 + (c % 5 ? 8 : 14), {stroke: C.ink, 'stroke-width': c % 5 ? .8 : 1.4, parent: sc}); if (c % 5 === 0) f.T(x0 + c * K, 178, String(c), {cls: 'lbl', anchor: 'middle', size: 13, parent: sc}); }
  f.T(x0 + 28 * K + 6, 178, 'cm', {cls: 'lbl-b', size: 12, parent: sc});
  const sp = spring(f, sc, x0, 110, x0 + 15 * K, {n: 12, r: 12});
  const end = f.g({parent: sc}); f.circ(0, 0, 6, {fill: '#3b4654', parent: end}); f.line(0, 0, 0, 40, {stroke: C.ink2, 'stroke-width': 1, 'stroke-dasharray': '3 3', parent: end});
  const vF = vec(f, sc, 0, 0, 0, 0, C.red, 3), lF = f.g({parent: sc}); vlab(f, lF, 0, 0, 'F', C.red, 20, 'middle');
  [[15, 'ℓ_0'], [18, 'ℓ_1'], [25, 'ℓ_2']].forEach(([c, n]) => { f.line(x0 + c * K, 66, x0 + c * K, 84, {stroke: C.purple, 'stroke-width': 1.4, parent: sc}); f.T(x0 + c * K, 60, M(n, 19), {cls: 'm', anchor: 'middle', size: 19, fill: C.purple, parent: sc}); });
  tag(f, sc, 470, 34, M('k = 200 \\N·\\m^{−1}', 17), {cls: 'm', size: 17, w: 120});
  f.frame();
  return {update(t){
    const L = o.book ? 18 : 18 + 7 * clamp(((t % 6) - 1) / 3.5, 0, 1), xe = x0 + L * K;
    sp.set(x0, xe); setT(end, xe, 110); setVec(vF, xe + 6, 110, xe + 30 + (L - 15) * 4, 110); setT(lF, xe + 22 + (L - 15) * 2, 96);
  }};
};

/* ---------- Situation 2 : pompe à vélo bouchée, compression rapide ---------- */
SCENES.pompe = (host, o = {}) => {
  const W = 560, H = 360, f = new Fig(host, W, H, {label: 'Pompe à vélo dont la sortie est bouchée : on enfonce le piston, l’air est comprimé et le cylindre s’échauffe'});
  const sc = labScene(f, 330), d = realDefs(f), cx = 230, top = 70, h = 230, w = 80;
  f.rect(cx - 70, 318, 140, 14, {rx: 4, fill: '#2b3440', parent: sc});
  f.rect(cx - w / 2 - 6, top, w + 12, h, {rx: 8, fill: f.lg('pb', [[0, '#9aa7b6'], [.35, '#eef2f6'], [1, '#5d6978']], 0, 0, 1, 0), stroke: '#3b4654', 'stroke-width': 1, parent: sc});
  const heat = f.rect(cx - w / 2 - 6, top + 120, w + 12, h - 120, {rx: 8, fill: '#ff5a2a', opacity: 0, filter: d.blur4, parent: sc});
  f.rect(cx - w / 2, top + 4, w, h - 8, {rx: 4, fill: '#f7fbfe', opacity: .9, parent: sc});
  const gasR = f.rect(cx - w / 2, 0, w, 0, {fill: '#cfe6fb', parent: sc});
  const gp = f.g({parent: sc}); const upd = gasParticles(f, gp, 0, 0, w, 100, 18, {r: 4});
  const pis = f.g({parent: sc});
  f.rect(cx - w / 2, -14, w, 14, {rx: 3, fill: '#3b4654', parent: pis}); f.rect(cx - 5, -150, 10, 136, {fill: d.metal, parent: pis});
  f.rect(cx - 60, -166, 120, 18, {rx: 9, fill: '#1b2a41', parent: pis});
  f.rect(cx + w / 2 + 6, top + h - 30, 46, 14, {fill: '#3b4654', parent: sc}); f.rect(cx + w / 2 + 50, top + h - 36, 14, 26, {rx: 4, fill: '#d62839', parent: sc});
  tag(f, sc, cx + 140, top + h - 50, 'sortie bouchée', {size: 14, w: 104});
  vec(f, sc, cx + 110, 40, cx + 110, 100, C.red, 3); f.T(cx + 122, 72, 'on enfonce', {cls: 'lbl-b', size: 13, fill: C.red, parent: sc});
  const disp = display(f, sc, 420, 160, 110, 60, 'θ paroi (°C)', {noShadow: true});
  f.frame();
  return {update(t){
    const k = o.book ? .5 : clamp(((t % 6) - .8) / 1.2, 0, 1), yp = lerp(top + 40, top + 150, k);
    setT(pis, 0, yp); f.set(gasR, {y: f2(yp), height: f2(top + h - 4 - yp)});
    gp.setAttribute('transform', `translate(${cx - w / 2},${f2(yp)})`); upd(o.book ? 1 : t, w, 1 + 2 * k);
    gp.querySelectorAll('circle').forEach(c => c.setAttribute('cy', f2(+c.getAttribute('cy') * (top + h - 4 - yp) / 100)));
    heat.setAttribute('opacity', f2(.55 * k)); disp.textContent = fr(20 + 9 * k, 1);
  }};
};

/* ---------- Activité 2, doc 2 / applications : gaz dans un cylindre fermé par un piston ---------- */
SCENES.cylindre = (host, o = {}) => {
  const W = 620, H = 290, f = new Fig(host, W, H, {label: 'Gaz enfermé dans un cylindre horizontal de section S fermé par un piston ; la force pressante F pousse le piston de x1 à x2'});
  const det = !!o.detente, sc = f.card(f.lg('cy6', [[0, '#f2f6fb'], [1, '#e3eaf2']])), d = realDefs(f);
  const y0 = 70, hC = 130, xL = 50, xR = 560, x1 = det ? 250 : 400, x2 = det ? 400 : 250;
  f.rect(xL - 10, y0 - 10, xR - xL + 10, 10, {fill: f.lg('cw1', [[0, '#c3ccd6'], [1, '#7c8896']]), parent: sc});
  f.rect(xL - 10, y0 + hC, xR - xL + 10, 10, {fill: f.lg('cw2', [[0, '#7c8896'], [1, '#c3ccd6']]), parent: sc});
  f.rect(xL - 10, y0 - 10, 10, hC + 20, {fill: '#7c8896', parent: sc});
  const gasR = f.rect(xL, y0, 0, hC, {fill: det ? '#ffd9b8' : '#cfe6fb', parent: sc});
  const gp = f.g({parent: sc}); const upd = gasParticles(f, gp, xL, y0, 200, hC, 26, {r: 4.5, col: det ? '#f07f1e' : '#6fa2e6'});
  const pis = f.g({parent: sc}); f.rect(0, 0, 22, hC, {rx: 3, fill: f.lg('pi6', [[0, '#5d6978'], [.5, '#e9eef3'], [1, '#3b4654']], 0, 0, 1, 0), parent: pis}); f.rect(22, hC / 2 - 6, 70, 12, {fill: d.metal, parent: pis});
  // axe et positions
  f.line(xL, 240, xR + 30, 240, {stroke: C.ink, 'stroke-width': 1.5, 'marker-end': f.mk('ink'), parent: sc}); f.T(xR + 34, 246, M('x', 20), {cls: 'm', anchor: 'end', size: 20, parent: sc});
  [[x1, 'x_1'], [x2, 'x_2']].forEach(([x, n]) => { f.line(x, 205, x, 248, {stroke: C.ink2, 'stroke-width': 1.2, 'stroke-dasharray': '4 3', parent: sc}); f.T(x, 270, M(n, 19), {cls: 'm', anchor: 'middle', size: 19, parent: sc}); });
  f.line(x2, 225, x1, 225, {stroke: C.purple, 'stroke-width': 1.4, 'marker-start': f.mk('purple'), 'marker-end': f.mk('purple'), parent: sc});
  f.T((x1 + x2) / 2, 220, M('ℓ', 19), {cls: 'm', anchor: 'middle', size: 19, fill: C.purple, parent: sc});
  f.T(xL, y0 - 18, det ? 'gaz chauffé à pression constante' : 'gaz', {cls: 'lbl-b', size: 14, fill: C.ink2, parent: sc});
  f.T(xL + 10, y0 + hC + 34, 'section S', {cls: 'lbl-b', size: 14, parent: sc});
  const vF = vec(f, sc, 0, 0, 0, 0, C.red, 3.4), lF = f.g({parent: sc}); vlab(f, lF, 0, 0, 'F', C.red, 21, 'middle');
  if (o.vals) tag(f, sc, 470, 30, o.vals, {size: 14, w: o.vals.length * 7.4});
  f.frame();
  return {update(t){
    const k = o.book ? 0 : clamp(((t % 6) - 1) / 3, 0, 1), xp = lerp(x1, x2, ease(k));
    setT(pis, xp, y0); f.set(gasR, {width: f2(xp - xL)}); upd(o.book ? 1 : t, xp - xL, det ? 1.4 : 1);
    setVec(vF, xp + 130, y0 + hC / 2 - 30, xp + 96, y0 + hC / 2 - 30); setT(lF, xp + 116, y0 + hC / 2 - 42);
  }};
};
