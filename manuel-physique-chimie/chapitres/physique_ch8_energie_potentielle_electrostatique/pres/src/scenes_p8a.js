/* ===== Physique, chapitre 8 — L’énergie potentielle électrostatique (sciences mathématiques) : titre et partie 1 ===== */

// signe d'une charge dans un petit disque : rouge (+) ou bleu (−)
function chg(f, parent, x, y, s, r = 7){
  const g = f.g({parent}), col = s > 0 ? C.red : C.blue;
  f.circ(x, y, r, {fill: '#ffffff', stroke: col, 'stroke-width': 1.3, parent: g});
  f.line(x - r * .55, y, x + r * .55, y, {stroke: col, 'stroke-width': 1.8, parent: g});
  if (s > 0) f.line(x, y - r * .55, x, y + r * .55, {stroke: col, 'stroke-width': 1.8, parent: g});
  return g;
}
// bâton horizontal (le long de l'axe x local, de 0 à L) : 'verre', 'ebonite' ou 'regle' ; o.signs : nombre de charges sur le bout frotté (côté x = 0)
function stick(f, parent, L, kind, o = {}){
  const g = f.g({parent}), r = o.r || 7;
  if (kind === 'verre'){
    f.rect(0, -r, L, 2 * r, {rx: r, fill: f.lg(uid('ve'), [[0, '#ffffff', .9], [.35, '#d9eef7', .75], [1, '#8fb3c9', .8]]), stroke: '#7d9fb5', 'stroke-width': 1, parent: g});
    f.rect(r, -r + 2.5, L - 2 * r, 2.2, {rx: 1, fill: '#ffffff', opacity: .9, parent: g});
  } else if (kind === 'ebonite'){
    f.rect(0, -r, L, 2 * r, {rx: r, fill: f.lg(uid('eb'), [[0, '#5a5f66'], [.3, '#2a2e33'], [1, '#0c0e10']]), stroke: '#000000', 'stroke-width': 1, parent: g});
    f.rect(r, -r + 2.5, L - 2 * r, 2, {rx: 1, fill: '#ffffff', opacity: .35, parent: g});
  } else {   // règle en plastique transparent
    f.rect(0, -r, L, 2 * r, {rx: 2, fill: f.lg(uid('rg'), [[0, '#fff8d8', .85], [1, '#e8d58a', .85]]), stroke: '#b59a3a', 'stroke-width': 1, parent: g});
    for (let x = 6; x < L - 4; x += 6) f.line(x, -r, x, -r + ((x / 6) % 5 ? 4 : 7), {stroke: '#6b5a1c', 'stroke-width': .8, parent: g});
  }
  if (o.signs){ const n = o.signs; for (let i = 0; i < n; i++) chg(f, g, 12 + i * (o.gap || 15), 0, o.sgn || 1, 5.2); }
  return g;
}
// pendule électrostatique : potence, fil isolant, petite boule légère ; pivot (px, py), longueur L
function pendulum(f, parent, x, baseY, py, L, o = {}){
  const g = f.g({parent}), px = o.armX ?? x + 90, r = o.r || 13;
  standClamp(f, g, x, baseY, py, px + 10, {top: py - 30});
  const th = f.path(`M${px},${py + 4} L${px},${py + 4 + L}`, {stroke: '#9c8f6a', 'stroke-width': 1.4, parent: g});
  const b = f.g({parent: g});
  f.circ(0, 0, r, {fill: f.rg(uid('pb'), [[0, '#ffffff'], [.4, o.col || '#d7dde4'], [1, o.dark || '#7c8896']], .35, .3, .75), stroke: '#5d6978', 'stroke-width': .8, parent: b});
  const sg = f.g({parent: b});
  return {g, b, sg, r, px, py: py + 4, L,
    set(ang){ const a = rad(ang), bx = px + L * Math.sin(a), by = py + 4 + L * Math.cos(a); setVec(th, px, py + 4, bx, by); setT(b, bx, by); return [bx, by]; },
    signs(list){ sg.innerHTML = ''; list.forEach(([dx, dy, s]) => chg(f, sg, dx, dy, s, 4.6)); }};
}
// main qui tient un bâton horizontal par-dessous : centre du bâton tenu en (x, y)
function holdStick(f, parent, x, y, s = 1, top = false){ return top ? fist(f, parent, x, y - 9 * s, 90, s, {sleeve: '#3b4f6b'}) : fist(f, parent, x, y + 9 * s, -90, s, {sleeve: '#3b4f6b'}); }

/* ---------- Titre (et bandeau du livre) : orage au-dessus d'une ville, éclairs ---------- */
function bolt(f, parent, x0, y0, len, seed, w = 3){
  const R = rng(seed); let x = x0, y = y0, d = `M${x},${y}`; const br = [];
  while (y < y0 + len){ x += (R() - .5) * 46; y += 18 + R() * 22; d += ` L${f2(x)},${f2(y)}`; if (R() < .18) br.push([x, y]); }
  const g = f.g({parent});
  f.path(d, {stroke: '#9fd3ff', 'stroke-width': w * 4, fill: 'none', opacity: .35, filter: realDefs(f).blur6, parent: g});
  f.path(d, {stroke: '#ffffff', 'stroke-width': w, fill: 'none', 'stroke-linejoin': 'round', parent: g});
  br.forEach(([bx, by], k) => { let xx = bx, yy = by, dd = `M${f2(xx)},${f2(yy)}`; for (let i = 0; i < 4; i++){ xx += (R() - .3) * 30 * (k % 2 ? 1 : -1); yy += 14 + R() * 12; dd += ` L${f2(xx)},${f2(yy)}`; }
    f.path(dd, {stroke: '#d6ecff', 'stroke-width': w * .5, fill: 'none', parent: g}); });
  return g;
}
SCENES.titre = (host, o = {}) => {
  const W = o.W || 1600, H = o.H || 900, f = new Fig(host, W, H, {par: 'xMidYMid slice', label: 'Un orage la nuit : des éclairs jaillissent entre les nuages chargés et le sol'});
  const s = H / 900, d = realDefs(f);
  f.rect(0, 0, W, H, {fill: f.lg('skyT', [[0, '#070b1c'], [.5, '#1a2550'], [1, '#3d3a6b']])});
  const glow = f.circ(W * .7, H * .25, 380 * s, {fill: '#8fb9ff', opacity: .25, filter: d.blur6});
  const R = rng(7);
  for (let k = 0; k < 14; k++){ const cx = W * (.3 + .75 * R()), cy = H * (.05 + .22 * R()), rr = (90 + 120 * R()) * s;
    f.ell(cx, cy, rr * 1.6, rr * .55, {fill: f.rg(uid('nu'), [[0, '#4a5480'], [1, '#1a2040', 0]]), opacity: .9}); }
  const b1 = bolt(f, null, W * .66, H * .2, H * .52, 11, 3.2 * s), b2 = bolt(f, null, W * .86, H * .16, H * .44, 23, 2.4 * s);
  // ville et minaret en silhouette
  const city = '#0a0d1e', yC = H * .78;
  f.path(`M0,${yC} L${W * .1},${yC} L${W * .1},${yC - 50 * s} L${W * .22},${yC - 50 * s} L${W * .22},${yC - 20 * s} L${W * .36},${yC - 20 * s} L${W * .36},${yC - 80 * s} L${W * .5},${yC - 80 * s} L${W * .5},${yC - 35 * s} L${W * .62},${yC - 35 * s} L${W * .62},${yC - 70 * s} L${W * .8},${yC - 70 * s} L${W * .8},${yC - 30 * s} L${W},${yC - 30 * s} L${W},${H} L0,${H} Z`, {fill: city});
  f.rect(W * .56, yC - 230 * s, 34 * s, 200 * s, {fill: city}); f.rect(W * .56 - 6 * s, yC - 240 * s, 46 * s, 14 * s, {fill: city});
  f.rect(W * .56 + 8 * s, yC - 285 * s, 18 * s, 46 * s, {fill: city}); f.path(`M${W * .56 + 17 * s},${yC - 300 * s} l-9,15 l18,0 Z`, {fill: city});
  // fenêtres éclairées
  for (let k = 0; k < 40; k++){ const x = W * (.12 + .86 * R()), y = yC - (10 + 50 * R()) * s; f.rect(x, y, 5 * s, 7 * s, {fill: '#ffd166', opacity: .35 + .4 * R()}); }
  f.rect(0, 0, W, H, {fill: f.lg('veilT', [[0, '#05060f', .9], [.38, '#05060f', .55], [.56, '#05060f', 0]], 0, 0, 1, 0)});
  if (o.book){
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22} L${W},${H} L0,${H} Z`, {fill: '#ffffff', stroke: 'none'});
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22}`, {stroke: '#f07f1e', 'stroke-width': 5});
  }
  return {update(t){
    if (o.book){ b1.setAttribute('opacity', 1); b2.setAttribute('opacity', .8); glow.setAttribute('opacity', .3); return; }
    const p = t % 5, a = p < .12 || (p > .25 && p < .4) ? 1 : 0, q = (t + 2.3) % 6.5, b = q < .1 || (q > .2 && q < .3) ? 1 : 0;
    b1.setAttribute('opacity', a); b2.setAttribute('opacity', b); glow.setAttribute('opacity', .12 + .3 * Math.max(a, b));
  }};
};

/* ---------- Doc 1 : règle frottée qui attire des petits morceaux de papier ---------- */
SCENES.frottement = (host, o = {}) => {
  const W = 620, H = 330, f = new Fig(host, W, H, {label: 'Une règle en plastique frottée sur un tissu de laine attire à distance de petits morceaux de papier'});
  const sc = labScene(f, 270), d = realDefs(f);
  // tissu de laine
  shadowEll(f, sc, 140, 274, 100, 8, .3);
  f.path('M50,272 C70,250 110,246 150,250 C190,246 220,252 236,272 Z', {fill: f.lg('lai', [[0, '#c0504d'], [1, '#7e2a28']]), stroke: '#5e1f1d', 'stroke-width': 1, parent: sc});
  for (let k = 0; k < 9; k++) f.path(`M${66 + k * 18},268 q6,-10 12,0`, {stroke: '#e07b77', 'stroke-width': 1.2, fill: 'none', opacity: .7, parent: sc});
  tag(f, sc, 140, 306, 'tissu de laine', {size: 13, w: 90});
  // morceaux de papier
  const R = rng(5), bits = [];
  for (let k = 0; k < 11; k++){
    const x0 = 370 + R() * 170, g = f.g({parent: sc}), w = 11 + R() * 8, h = 7 + R() * 6;
    f.path(`M${-w / 2},${-h / 2} L${w / 2},${-h / 2 + R() * 2} L${w / 2 - 1},${h / 2} L${-w / 2 + 1},${h / 2 - R() * 2} Z`, {fill: '#ffffff', stroke: '#9aa7b6', 'stroke-width': .6, parent: g});
    bits.push({g, x0, y0: 268 - h / 2, rot: R() * 60 - 30, up: k % 3 !== 2, delay: R() * .8, dx: (R() - .5) * 30});
  }
  tag(f, sc, 455, 306, 'petits morceaux de papier', {size: 13, w: 160});
  // règle tenue à la main
  const rule = f.g({parent: sc}); stick(f, rule, 200, 'regle', {r: 9}); holdStick(f, rule, 180, 0, 1, true);
  const lab = tag(f, sc, 0, 0, 'règle en plastique', {size: 13, w: 112});
  if (!o.book) f.T(12, H - 8, 'animation ralentie', {cls: 'lbl-s', size: 12, fill: '#ffffff', parent: sc});
  f.frame();
  return {update(t){
    const p = o.book ? 8 : t % 11;
    let rx, ry;
    if (p < 3){ rx = 40 + 30 * Math.sin(p * 7); ry = 238; }                                   // frottement sur la laine
    else if (p < 5){ const u = ease((p - 3) / 2); rx = lerp(40 + 30 * Math.sin(21), 340, u); ry = lerp(238, 205, u); }
    else { rx = 340; ry = 205; }
    setT(rule, rx, ry); lab.setAttribute('transform', `translate(${f2(rx + 70)},${f2(ry - 40)})`);
    bits.forEach(b => {
      const u = b.up ? ease(clamp((p - 5.2 - b.delay) / .6, 0, 1)) : 0, yTop = ry + 9 + 4;
      const x = lerp(b.x0, clamp(b.x0 + b.dx, rx + 30, rx + 190), u), y = lerp(b.y0, yTop, u);
      setT(b.g, x, y, b.rot * (1 - u) + (u ? 5 : 0));
    });
  }};
};

/* ---------- Doc 2 : bâtons suspendus — répulsion ou attraction (vue en perspective cavalière) ---------- */
SCENES.batons = (host, o = {}) => {
  const W = 960, H = 300, f = new Fig(host, W, H, {label: 'Bâton suspendu par un étrier : verre et verre se repoussent, ébonite et ébonite se repoussent, verre et ébonite s’attirent'});
  const sc = labScene(f, 262), d = realDefs(f);
  const cases = [['verre', 'verre', -1, 'verre frotté · verre frotté'], ['ebonite', 'ebonite', -1, 'ébonite frottée · ébonite frottée'], ['verre', 'ebonite', 1, 'verre frotté · ébonite frottée']];
  const k = .5 * Math.SQRT1_2;   // profondeur z (vers l'arrière) dessinée vers le haut à droite
  const prj = (cx, cy, x, z) => [cx + x + k * z, cy - k * z];
  const Ls = 140, Lh = 80;
  const items = cases.map(([s1, s2, att, lab], i) => {
    const x0 = 14 + i * 318, cx = x0 + 120, cy = 160;
    if (i) f.line(x0 - 8, 14, x0 - 8, 258, {stroke: '#c9d6e6', 'stroke-width': 1.2, 'stroke-dasharray': '5 5', parent: sc});
    standClamp(f, sc, x0 + 22, 262, 52, cx + 6, {top: 36});
    f.line(cx, 56, cx, cy - 12, {stroke: '#9c8f6a', 'stroke-width': 1.4, parent: sc});
    f.path(`M${cx - 11},${cy - 12} L${cx},${cy - 2} L${cx + 11},${cy - 12}`, {stroke: '#5d6978', 'stroke-width': 1.6, fill: 'none', parent: sc});
    const arc = f.path('', {stroke: C.orange, 'stroke-width': 2.6, fill: 'none', 'stroke-dasharray': '6 4', 'marker-end': f.mk('orange'), parent: sc});
    const ghost = f.g({parent: sc, opacity: .28}); const gs = stick(f, ghost, Ls, s1); setT(gs, cx - Ls / 2, cy);
    const rodG = f.g({parent: sc}); stick(f, rodG, Ls, s1);
    // bâton approché (tenu à la main), en avant (z < 0) du bout droit
    const [hx, hy] = prj(cx, cy, Ls / 2 + 10, -64);
    const hand = f.g({parent: sc}); const h2 = stick(f, hand, Lh, s2); setT(h2, hx, hy); holdStick(f, hand, hx + Lh - 12, hy, .85);
    tag(f, sc, x0 + 150, 288, lab, {size: 13, w: lab.length * 6.6});
    return {cx, cy, rodG, arc, att};
  });
  f.frame();
  return {update(t){
    const p = o.book ? 1 : ease(clamp(((t % 7) - 1) / 2.5, 0, 1));
    items.forEach(it => {
      // rotation autour du fil vertical : attraction, le bout droit vient vers l'avant (z < 0) ; répulsion, il part vers l'arrière
      const phi = rad(it.att * 30 * p), xr = Ls / 2 * Math.cos(phi), zr = -Ls / 2 * Math.sin(phi);
      const [x1, y1] = prj(it.cx, it.cy, -xr, -zr), [x2, y2] = prj(it.cx, it.cy, xr, zr);
      const len = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      it.rodG.setAttribute('transform', `translate(${f2(x1)},${f2(y1)}) rotate(${f2(ang)}) scale(${f2(len / Ls)},1)`);
      let dd = ''; const N = 14;
      for (let i = 0; i <= N; i++){ const b = rad(it.att * 30 * p * i / N), [x, y] = prj(it.cx, it.cy, (Ls / 2 + 4) * Math.cos(b), -(Ls / 2 + 4) * Math.sin(b)); dd += (i ? ' L' : 'M') + f2(x) + ',' + f2(y - 16); }
      it.arc.setAttribute('d', p > .15 ? dd : '');
    });
  }};
};

/* ---------- Doc 3 : électrisation par contact et par influence (pendule électrostatique) ---------- */
SCENES.pendule = (host, o = {}) => {
  const W = 800, H = 340, f = new Fig(host, W, H, {label: 'Pendule électrostatique : une boule touchée par l’ébonite chargée est repoussée ; une boule neutre est attirée à distance par le verre chargé'});
  const sc = labScene(f, 300);
  const L = 150, py = 60;
  // (a) contact : ébonite (−) à droite de la boule
  const pa = pendulum(f, sc, 40, 300, py, L, {armX: 200}), pb = pendulum(f, sc, 440, 300, py, L, {armX: 600});
  const ra = f.g({parent: sc}); stick(f, ra, 150, 'ebonite', {signs: 4, sgn: -1, gap: 13}); holdStick(f, ra, 135, 0, .9);
  const rb = f.g({parent: sc}); stick(f, rb, 150, 'verre', {signs: 4, sgn: 1, gap: 13}); holdStick(f, rb, 135, 0, .9);
  tag(f, sc, 200, 330, '(a) contact avec l’ébonite chargée', {size: 13, w: 210}); tag(f, sc, 600, 330, '(b) influence du verre chargé', {size: 13, w: 180});
  f.line(400, 14, 400, 296, {stroke: '#c9d6e6', 'stroke-width': 1.2, 'stroke-dasharray': '5 5', parent: sc});
  f.frame();
  return {update(t){
    const p = o.book ? 9 : t % 10;
    // (a) : approche (0-2 s), contact (2-3 s), la boule chargée est repoussée (3-5 s)
    let xa, aa, sa;
    if (p < 2){ xa = lerp(330, 200 + 13 + 1, ease(p / 2)); aa = 0; sa = []; }
    else if (p < 3){ xa = 214; aa = 0; sa = [[4, -3, -1]]; }
    else { const u = ease(clamp((p - 3) / 2, 0, 1)); aa = -16 * u; xa = 214 + 26 * u; sa = [[-4, -4, -1], [4, 3, -1]]; }
    const [bx, by] = pa.set(aa); pa.signs(sa); setT(ra, Math.max(xa, bx + 13 + 1), by);
    // (b) : le verre s'approche sans toucher ; les électrons libres migrent du côté du bâton ; la boule est attirée
    const u = o.book ? 1 : ease(clamp(p / 3, 0, 1)), ab = 10 * u;
    const [cx, cy] = pb.set(ab); setT(rb, lerp(740, cx + 13 + 34, u), cy);
    pb.signs(u > .3 ? [[7, -5, -1], [7, 5, -1], [-7, -5, 1], [-7, 5, 1]] : []);
  }};
};

/* ---------- Doc 4 et À retenir : deux charges ponctuelles, forces de Coulomb ---------- */
// o.forces : afficher les forces ; o.mode : 'meme' (même signe), 'oppose', 'deux' (les deux schémas)
SCENES.coulomb = (host, o = {}) => {
  const mode = o.mode || 'deux', two = mode === 'deux';
  const W = 560, H = two ? 330 : 160, f = new Fig(host, W, H, {label: 'Deux charges ponctuelles A et B : forces de Coulomb opposées, portées par la droite (AB)'});
  const rows = two ? [[1, 1, 90], [1, -1, 250]] : [[1, mode === 'oppose' ? -1 : 1, 70]];
  const vs = [];
  rows.forEach(([sa, sb, y], i) => {
    const xa = 190, xb = 370;
    f.line(40, y, 520, y, {stroke: '#c9d6e6', 'stroke-width': 1.4, 'stroke-dasharray': '6 5'});
    [[xa, sa, 'A', 'q_A'], [xb, sb, 'B', 'q_B']].forEach(([x, s, n, q]) => {
      f.circ(x, y, 15, {fill: f.rg(uid('ch'), [[0, '#ffffff'], [.4, s > 0 ? '#ff8a96' : '#7fb2ff'], [1, s > 0 ? '#a3122a' : '#123e8a']], .35, .3, .75)});
      f.T(x, y + 7, s > 0 ? '+' : '−', {cls: 'lbl-b', anchor: 'middle', size: 21, fill: '#ffffff'});
      f.T(x, y - 24, M(n), {cls: 'm', anchor: 'middle', size: 21});
      f.T(x, y + 42, M(q, 19), {cls: 'm', anchor: 'middle', size: 19, fill: C.purple});
    });
    if (two) f.T(30, y - 52, i ? 'Charges de signes contraires : attraction' : 'Charges de même signe : répulsion', {cls: 'lbl-b', size: 15, fill: C.ink2});
    if (o.forces !== false){
      const rep = sa * sb > 0, Lf = rep ? 95 : 70;
      // F_{B/A} appliquée en A, F_{A/B} appliquée en B
      const va = vec(f, null, xa, y, xa + (rep ? -Lf : Lf), y), vb = vec(f, null, xb, y, xb + (rep ? Lf : -Lf), y);
      vlab(f, null, xa + (rep ? -62 : 46), y + 40, 'F_{B/A}', C.red, 21); vlab(f, null, xb + (rep ? 62 : -46), y + 40, 'F_{A/B}', C.red, 21);
      vs.push({va, vb, xa, xb, y, rep, Lf});
    } else {
      f.path(`M190,${y + 56} L370,${y + 56}`, {stroke: C.ink2, 'stroke-width': 1.2, 'marker-end': f.mk('ink2'), 'marker-start': f.mk('ink2')});
      f.T(280, y + 78, M('d = AB', 19), {cls: 'm', anchor: 'middle', size: 19});
    }
  });
  return {update(t){
    const u = o.book ? 1 : .55 + .45 * Math.abs(Math.sin(t * 1.4));
    vs.forEach(v => { setVec(v.va, v.xa, v.y, v.xa + (v.rep ? -1 : 1) * v.Lf * u, v.y); setVec(v.vb, v.xb, v.y, v.xb + (v.rep ? 1 : -1) * v.Lf * u, v.y); });
  }};
};

/* ---------- Application 1 : l'atome d'hydrogène ---------- */
SCENES.hydrogene = (host, o = {}) => {
  const W = 440, H = 260, f = new Fig(host, W, H, {label: 'Atome d’hydrogène : un électron à la distance d du proton'});
  const cx = 160, cy = 135, r = 120, d = realDefs(f);
  f.circ(cx, cy, r, {fill: 'none', stroke: '#9fb7cf', 'stroke-width': 1.4, 'stroke-dasharray': '6 6'});
  f.circ(cx, cy, 70, {fill: '#8ec5ff', opacity: .12, filter: d.blur6});
  f.circ(cx, cy, 22, {fill: f.rg('pr', [[0, '#ffd0d6'], [.45, '#e5485a'], [1, '#8a0f20']], .35, .3, .75)});
  f.T(cx, cy + 7, '+', {cls: 'lbl-b', anchor: 'middle', size: 20, fill: '#ffffff'});
  const e = f.g({}); f.circ(0, 0, 10, {fill: f.rg('el', [[0, '#d7ecff'], [.45, '#3f8ae0'], [1, '#123e8a']], .35, .3, .75), parent: e}); f.T(0, 5, '−', {cls: 'lbl-b', anchor: 'middle', size: 16, fill: '#ffffff', parent: e});
  const dl = f.path('', {stroke: C.ink2, 'stroke-width': 1.2, 'marker-end': f.mk('ink2'), 'marker-start': f.mk('ink2')}), dt = f.T(0, 0, M('d', 21), {cls: 'm', anchor: 'middle', size: 21});
  tag(f, null, cx, cy + 50, 'proton', {size: 13, w: 46}); const te = tag(f, null, 0, 0, 'électron', {size: 13, w: 54});
  return {update(t){
    const a = o.book ? rad(25) : t * .9, x = cx + r * Math.cos(a), y = cy - r * Math.sin(a);
    setT(e, x, y); setVec(dl, cx + 24 * Math.cos(a), cy - 24 * Math.sin(a), x - 12 * Math.cos(a), y + 12 * Math.sin(a));
    dt.setAttribute('x', f2(cx + 62 * Math.cos(a) - 14 * Math.sin(a))); dt.setAttribute('y', f2(cy - 62 * Math.sin(a) - 14 * Math.cos(a) + 6));
    te.setAttribute('transform', `translate(${f2(x + 8)},${f2(y - 18)})`);
  }};
};
