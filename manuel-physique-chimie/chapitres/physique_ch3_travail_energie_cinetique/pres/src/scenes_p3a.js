/* ===== Physique, chapitre 3 — Travail et énergie cinétique : titre, parties 1 et 2 ===== */

// éolienne : pied en (x, y), hauteur du mât hm ; renvoie le rotor (à faire tourner)
function windTurbine(f, parent, x, y, hm, o = {}){
  const g = f.g({parent});
  const c1 = o.dark ? '#26334a' : '#eef2f6', c2 = o.dark ? '#141d2c' : '#b8c2cf';
  f.path(`M${x - hm * .035},${y} L${x - hm * .016},${y - hm} L${x + hm * .016},${y - hm} L${x + hm * .035},${y} Z`, {fill: f.lg(uid('mat'), [[0, c1], [1, c2]], 0, 0, 1, 0), stroke: 'none', parent: g});
  f.rect(x - hm * .05, y - hm - hm * .035, hm * .14, hm * .07, {rx: hm * .03, fill: o.dark ? '#1b2638' : '#dfe6ee', stroke: o.dark ? 'none' : '#8a96a8', 'stroke-width': .8, parent: g});
  const rot = f.g({parent: g}); setT(rot, x, y - hm);
  for (let k = 0; k < 3; k++){
    const b = f.g({parent: rot}); b.setAttribute('transform', `rotate(${k * 120})`);
    f.path(`M0,-${hm * .03} C${hm * .1},-${hm * .05} ${hm * .42},-${hm * .02} ${hm * .55},0 C${hm * .42},${hm * .015} ${hm * .1},${hm * .035} 0,${hm * .03} Z`, {fill: o.dark ? '#2b3a52' : '#f7f9fb', stroke: o.dark ? '#0d1420' : '#9aa7b6', 'stroke-width': .8, parent: b});
  }
  f.circ(0, 0, hm * .045, {fill: o.dark ? '#33435c' : '#ffffff', stroke: o.dark ? 'none' : '#8a96a8', 'stroke-width': .8, parent: rot});
  return {g, rot, x, y: y - hm};
}
// train à grande vitesse vu de profil, nez vers la droite ; (x, y) = bas de caisse à l'avant
function train(f, parent, x, y, s = 1, o = {}){
  const g = f.g({parent}); g.setAttribute('transform', `translate(${x},${y}) scale(${s})`);
  const body = o.dark ? ['#e8edf3', '#9aa7b6'] : ['#ffffff', '#c3ccd6'];
  for (let c = 0; c < 3; c++){
    const x0 = -150 - c * 152;
    if (c === 0) f.path(`M${x0},-8 L${x0},-58 Q${x0},-64 ${x0 + 8},-64 L60,-64 Q120,-62 152,-20 Q156,-10 146,-8 Z`, {fill: f.lg(uid('tr'), [[0, body[0]], [1, body[1]]]), stroke: '#5d6978', 'stroke-width': 1.2, parent: g});
    else f.rect(x0, -64, 148, 56, {rx: 6, fill: f.lg(uid('tr'), [[0, body[0]], [1, body[1]]]), stroke: '#5d6978', 'stroke-width': 1.2, parent: g});
    for (let w = x0 + 12; w < x0 + 136; w += 22) f.rect(w, -52, 15, 13, {rx: 3, fill: '#2b3a52', parent: g});
    f.rect(x0, -30, c === 0 ? 290 : 148, 7, {fill: '#1f5fa8', parent: g});
    [x0 + 28, x0 + 120].forEach(wx => f.circ(wx, -6, 8, {fill: '#1b1f24', stroke: 'none', parent: g}));
  }
  f.path('M70,-60 Q112,-56 136,-30 L96,-30 Q86,-52 70,-56 Z', {fill: '#2b3a52', parent: g});
  f.circ(146, -16, 3, {fill: '#fff6c8', stroke: 'none', parent: g});
  return g;
}

/* ---------- Titre (et bandeau d'ouverture du livre) : éoliennes et train à grande vitesse au crépuscule ---------- */
SCENES.titre = (host, o = {}) => {
  const W = o.W || 1600, H = o.H || 900, f = new Fig(host, W, H, {par: 'xMidYMid slice', label: 'Au crépuscule, des éoliennes tournent pendant qu’un train à grande vitesse passe sur un viaduc'});
  const s = H / 900, d = realDefs(f);
  f.rect(0, 0, W, H, {fill: f.lg('dusk', [[0, '#0a1a38'], [.5, '#21477a'], [.8, '#e0875a'], [1, '#f6b26b']])});
  f.circ(W * .74, H * .72, 80 * s, {fill: '#ffd38a', stroke: 'none', opacity: .9, filter: d.blur6});
  f.path(`M0,${H * .74} C${W * .2},${H * .62} ${W * .4},${H * .7} ${W * .58},${H * .64} C${W * .76},${H * .58} ${W * .9},${H * .66} ${W},${H * .62} L${W},${H} L0,${H} Z`, {fill: '#1c3152', stroke: 'none'});
  const tb = [[.56, .64, 300], [.73, .6, 360], [.9, .63, 260]].map(([x, y, hm]) => windTurbine(f, null, W * x, H * y, hm * s, {dark: true}));
  f.path(`M0,${H * .82} C${W * .3},${H * .77} ${W * .6},${H * .8} ${W},${H * .76} L${W},${H} L0,${H} Z`, {fill: '#13243f', stroke: 'none'});
  // viaduc
  const vy = H * .8;
  f.rect(0, vy, W, 16 * s, {fill: '#2a3c5a'});
  for (let x = 40 * s; x < W; x += 170 * s) f.path(`M${x},${vy + 16 * s} L${x},${H} M${x + 18 * s},${vy + 16 * s} L${x + 18 * s},${H}`, {stroke: '#22324d', 'stroke-width': 3 * s});
  const tg = f.g({});
  train(f, tg, 0, 0, 1.15 * s, {dark: true});
  f.rect(0, 0, W, H, {fill: f.lg('veil', [[0, '#050d20', .9], [.38, '#050d20', .55], [.56, '#050d20', 0]], 0, 0, 1, 0)});
  if (o.book){
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22} L${W},${H} L0,${H} Z`, {fill: '#ffffff', stroke: 'none'});
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22}`, {stroke: '#f07f1e', 'stroke-width': 5});
  }
  return {update(t){
    tb.forEach((q, i) => setT(q.rot, q.x, q.y, (o.book ? 20 + i * 37 : t * (55 + 9 * i)) % 360));
    const k = o.book ? .70 : ((t * .12) % 1.4);
    setT(tg, -500 * s + k * (W + 1000 * s), vy, 0, 1);
  }};
};

/* ---------- Situation de départ 1 : camion lourd et petite voiture ---------- */
SCENES.camionVoiture = (host, o = {}) => {
  const W = 620, H = 340, f = new Fig(host, W, H, {label: 'Un camion lourd roule vite et une petite voiture roule lentement sur une route'});
  const sc = outdoor(f, 200, {ground: 'road'});
  const marks = f.g({parent: sc}); for (let x = 0; x < W + 80; x += 80) f.rect(x, 268, 40, 5, {fill: '#ffffff', opacity: .8, parent: marks});
  const tg = f.g({parent: sc}); const T = truck(f, tg, 0, 0, .78, '#d62839');
  const cg = f.g({parent: sc}); const Cr = car(f, cg, 0, 0, .62, '#0e8f8a');
  tag(f, sc, 160, 34, 'camion : grande masse, grande vitesse', {size: 14, w: 290});
  tag(f, sc, 470, 34, 'voiture : petite masse, faible vitesse', {size: 14, w: 270});
  f.frame();
  return {update(t){
    const xt = o.book ? 330 : -180 + ((t * 170) % (W + 360)), xc = o.book ? 120 : -100 + ((t * 45) % (W + 200));
    setT(tg, xt, 232); T.spin(xt * 2.4); setT(cg, xc, 290); Cr.spin(xc * 4.2);
  }};
};

/* ---------- Activité 1, doc 1 : trois solides en translation ---------- */
SCENES.translations = (host, o = {}) => {
  const PW = 290, PH = 300, G = 15, W = 3 * PW + 2 * G, H = PH;
  const f = new Fig(host, W, H, {label: 'Ascenseur, cabine de téléphérique et nacelle de grande roue : le vecteur AB garde la même direction, le même sens et la même longueur'});
  const d = realDefs(f);
  const panel = (i, key, title, bg) => {
    const g = f.g({}); g.setAttribute('transform', `translate(${i * (PW + G)},0)`);
    const cp = f.clip(uid('pn'), c => f.el('rect', {x: 0, y: 0, width: PW, height: PH, rx: 14}, c));
    const inner = f.g({parent: g, 'clip-path': cp});
    f.rect(0, 0, PW, PH, {fill: bg, parent: inner});
    f.rect(.75, .75, PW - 1.5, PH - 1.5, {rx: 14, fill: 'none', stroke: '#c9d6e6', 'stroke-width': 1.5, parent: g});
    const top = f.g({parent: g});
    f.rect(0, 0, PW, 44, {fill: '#ffffff', opacity: .82, parent: inner});
    f.circ(22, 22, 14, {fill: '#1f5fa8', stroke: '#ffffff', 'stroke-width': 2, parent: top}); f.T(22, 28, key, {cls: 'lbl-b', anchor: 'middle', size: 16, fill: '#ffffff', parent: top});
    f.T(44, 28, title, {cls: 'lbl-b', size: 15, fill: '#1b2a41', parent: top});
    return {inner, top};
  };
  const AB = (parent, x, ya, yb, lab) => { const g = f.g({parent});
    vec(f, g, x, ya, x, yb + 5, C.red, 2.6); f.dot(x, ya, {r: 3.6, fill: '#1b2a41', parent: g}); f.dot(x, yb, {r: 3.6, fill: '#1b2a41', parent: g});
    if (lab){ f.T(x + 7, ya + 2, 'A', {cls: 'lbl-b', size: 13, parent: g}); f.T(x + 7, yb + 9, 'B', {cls: 'lbl-b', size: 13, parent: g}); }
    return g; };
  // a) ascenseur
  const pa = panel(0, 'a', 'Ascenseur', f.lg('bgA', [[0, '#eef3f8'], [1, '#dbe4ee']]));
  for (let y = 74; y < PH; y += 56) f.rect(0, y, PW, 2, {fill: '#c3cfdc', parent: pa.inner});
  f.rect(95, 44, 100, PH, {fill: '#c8d2de', parent: pa.inner}); f.rect(95, 44, 5, PH, {fill: '#9aa7b6', parent: pa.inner}); f.rect(190, 44, 5, PH, {fill: '#9aa7b6', parent: pa.inner});
  f.line(145, 44, 145, PH, {stroke: '#5d6978', 'stroke-width': 1.5, parent: pa.inner});
  const cabA = (parent, op) => { const g = f.g({parent}); g.setAttribute('opacity', op);
    f.rect(-40, -60, 80, 60, {rx: 4, fill: f.lg(uid('cab'), [[0, '#f4f6f9'], [1, '#aeb9c6']], 0, 0, 1, 0), stroke: '#5d6978', 'stroke-width': 1.4, parent: g});
    f.rect(-3, -60, 6, 60, {fill: '#7c8896', parent: g}); AB(g, 22, -6, -54, op === 1); return g; };
  const ghostsA = [250, 175].map(y => { const g = cabA(pa.inner, .35); setT(g, 145, y); return g; });
  const liveA = cabA(pa.inner, 1);
  // b) téléphérique
  const pb = panel(1, 'b', 'Téléphérique', f.lg('bgB', [[0, '#bfe0f7'], [1, '#eef7fd']]));
  f.path(`M0,${PH} L0,220 L110,120 L170,170 L290,90 L290,${PH} Z`, {fill: '#9cc7a6', stroke: 'none', parent: pb.inner});
  f.path(`M130,${PH} L210,160 L250,190 L290,170 L290,${PH} Z`, {fill: '#7fb069', stroke: 'none', parent: pb.inner});
  const cab = t => [lerp(10, 280, t), 230 - 160 * t + 22 * Math.sin(Math.PI * t)];
  let dc = ''; for (let i = 0; i <= 40; i++){ const [x, y] = cab(i / 40); dc += (i ? 'L' : 'M') + f2(x) + ',' + f2(y); }
  f.path(dc, {stroke: '#3b4654', 'stroke-width': 2, parent: pb.inner});
  const cabB = (parent, op) => { const g = f.g({parent}); g.setAttribute('opacity', op);
    f.line(0, 0, 0, 20, {stroke: '#3b4654', 'stroke-width': 2, parent: g}); f.circ(0, 0, 4, {fill: '#3b4654', stroke: 'none', parent: g});
    f.rect(-24, 20, 48, 46, {rx: 7, fill: f.lg(uid('cb'), [[0, '#ef5b5b'], [1, '#b81f2a']]), stroke: '#7a141c', 'stroke-width': 1, parent: g});
    f.rect(-18, 28, 36, 16, {rx: 3, fill: '#dcefff', parent: g}); AB(g, -10, 62, 26, op === 1); return g; };
  [.2, .5].forEach(t => { const [x, y] = cab(t); const g = cabB(pb.inner, .35); setT(g, x, y); });
  const liveB = cabB(pb.inner, 1);
  // c) grande roue (nacelles en translation circulaire)
  const pc = panel(2, 'c', 'Nacelle de grande roue', f.lg('bgC', [[0, '#ffd9a8'], [1, '#fff3e3']]));
  const cx = 150, cy = 165, R = 92;
  f.path(`M${cx - 60},${PH} L${cx},${cy} L${cx + 60},${PH}`, {stroke: '#3b4654', 'stroke-width': 6, parent: pc.inner});
  const wheel = f.g({parent: pc.inner});
  f.circ(0, 0, R, {stroke: '#3b4654', 'stroke-width': 4, parent: wheel});
  for (let k = 0; k < 8; k++){ const [x, y] = P(0, 0, R, k * 45); f.line(0, 0, x, y, {stroke: '#6f7c8c', 'stroke-width': 1.6, parent: wheel}); }
  setT(wheel, cx, cy);
  f.circ(cx, cy, 7, {fill: '#3b4654', stroke: '#ffffff', 'stroke-width': 2, parent: pc.inner});
  const nac = (parent, op) => { const g = f.g({parent}); g.setAttribute('opacity', op);
    f.circ(0, 0, 3.5, {fill: '#3b4654', stroke: 'none', parent: g}); f.line(0, 0, 0, 10, {stroke: '#3b4654', 'stroke-width': 2, parent: g});
    f.rect(-17, 10, 34, 30, {rx: 6, fill: f.lg(uid('nc'), [[0, '#6aa9e8'], [1, '#1f5fa8']]), stroke: '#174a85', 'stroke-width': 1, parent: g}); AB(g, -6, 37, 14, op === 1); return g; };
  [200, 140].forEach(a => { const [x, y] = P(cx, cy, R, a); const g = nac(pc.inner, .35); setT(g, x, y); });
  const liveC = nac(pc.inner, 1);
  [pa, pb, pc].forEach(p => p.inner.parentNode.appendChild(p.top));
  return {update(t){
    const ka = o.book ? .9 : .5 - .5 * Math.cos(t * .9);
    setT(liveA, 145, lerp(250, 100, ka));
    const kb = o.book ? .8 : (t * .12) % 1; const [bx, by] = cab(kb); setT(liveB, bx, by);
    const a = o.book ? 80 : 200 - (t * 30) % 360; setT(wheel, cx, cy, -(a - 200)); const [nx, ny] = P(cx, cy, R, a); setT(liveC, nx, ny);
  }};
};

/* ---------- Activité 1, doc 2 : tube de Newton ---------- */
SCENES.tubeNewton = (host, o = {}) => {
  const W = 420, H = 440, f = new Fig(host, W, H, {label: 'Tube de Newton : avec de l’air, la plume tombe lentement ; dans le vide, la plume, le liège et la bille tombent ensemble'});
  const sc = labScene(f, 380), d = realDefs(f);
  const tubes = [[110, 'Avec air', false], [300, 'Dans le vide', true]].map(([x, lab, vide]) => {
    const g = f.g({parent: sc});
    f.rect(x - 46, 60, 92, 300, {rx: 36, fill: vide ? '#eef6ff' : '#f4f9ff', opacity: .55, stroke: '#9fb3c8', 'stroke-width': 2, parent: g});
    f.rect(x - 36, 72, 7, 276, {rx: 3.5, fill: '#ffffff', opacity: .75, parent: g});
    f.rect(x - 30, 40, 60, 24, {rx: 5, fill: '#5d6978', parent: g}); f.rect(x - 30, 356, 60, 24, {rx: 5, fill: '#5d6978', parent: g});
    if (vide){ f.rect(x - 5, 26, 10, 16, {fill: '#3b4654', parent: g}); f.rect(x - 14, 22, 28, 7, {rx: 3, fill: '#d62839', parent: g}); }
    tag(f, g, x, 418, lab, {size: 15, fill: vide ? '#1f5fa8' : '#51627a'});
    const plume = f.g({parent: g}); f.path('M-15,5 Q-4,-12 15,-6 Q4,4 -15,5 Z', {fill: f.lg(uid('pl'), [[0, '#fffaf0'], [1, '#d9cdb4']]), stroke: '#6f7c8c', 'stroke-width': 1.1, parent: plume});
    f.path('M-17,6 Q0,-2 16,-6', {stroke: '#5d6978', 'stroke-width': 1.2, parent: plume});
    const liege = f.g({parent: g}); f.rect(-10, -7, 20, 14, {rx: 4, fill: f.lg(uid('lg'), [[0, '#d9a066'], [1, '#a66b33']]), parent: liege});
    const bil = f.g({parent: g}); ball(f, bil, 0, 0, 9);
    return {x, vide, plume, liege, bil};
  });
  f.frame();
  const fall = (k, y0 = 82, y1 = 336) => lerp(y0, y1, Math.min(1, k * k));
  return {update(t){
    const tt = o.book ? 1.1 : (t % 4.2) * .9;
    tubes.forEach(q => {
      const kb = tt / 1.25, kl = q.vide ? kb : tt / 1.45, kp = q.vide ? kb : tt / 3.4;
      setT(q.bil, q.x + 24, fall(kb)); setT(q.liege, q.x + 1, fall(kl)); setT(q.plume, q.x - 22 + (q.vide ? 0 : 6 * Math.sin(tt * 4)), fall(kp) - 2, q.vide ? 0 : 12 * Math.sin(tt * 3));
    });
  }};
};

/* ---------- Activité 1, doc 3 : billes et pâte à modeler ---------- */
SCENES.pate = (host, o = {}) => {
  const PW = 440, G = 20, W = 2 * PW + G, H = 320, f = new Fig(host, W, H, {label: 'Série 1 : la même bille lâchée de trois hauteurs ; série 2 : trois billes de masses différentes lâchées de la même hauteur. Coupe des empreintes dans la pâte à modeler.'});
  const d = realDefs(f), items = [];
  [[0, 'Série 1 : même bille, trois hauteurs'], [1, 'Série 2 : même hauteur, trois masses']].forEach(([s, title]) => {
    const g = f.g({}); g.setAttribute('transform', `translate(${s * (PW + G)},0)`);
    const cp = f.clip(uid('pp'), c => f.el('rect', {x: 0, y: 0, width: PW, height: H, rx: 14}, c));
    const inner = f.g({parent: g, 'clip-path': cp});
    f.rect(0, 0, PW, H, {fill: f.lg(uid('pw'), [[0, '#f2f6fb'], [1, '#dbe4ee']]), parent: inner});
    f.rect(0, 262, PW, H - 262, {fill: f.lg(uid('pb'), [[0, '#4a5868'], [1, '#2b3440']]), parent: inner}); f.rect(0, 262, PW, 4, {fill: '#9aa7b6', parent: inner});
    f.rect(.75, .75, PW - 1.5, H - 1.5, {rx: 14, fill: 'none', stroke: '#c9d6e6', 'stroke-width': 1.5, parent: g});
    f.T(16, 28, title, {cls: 'lbl-b', size: 15, parent: g});
    const cols = [80, 220, 360];
    const hs = s === 0 ? [2.5, 1.3, .5] : [1.3, 1.3, 1.3], rs = s === 0 ? [11, 11, 11] : [8, 13, 17];
    const labs = s === 0 ? ['h_1 = 2,5 \\m', 'h_2 = 1,3 \\m', 'h_3 = 0,5 \\m'] : ['58 \\g', '230 \\g', '530 \\g'];
    const depth = s === 0 ? [26, 15, 7] : [8, 17, 27];
    cols.forEach((x, i) => {
      const top = 208, y0 = top - 20 - hs[i] * 52;
      f.line(x - 30, y0 + 2 * rs[i], x - 30, top, {stroke: '#1f9d74', 'stroke-width': 1.6, 'marker-start': f.mk('green'), 'marker-end': f.mk('green'), parent: inner});
      // bloc de pâte en coupe avec cratère
      const dp = depth[i], w = 46 + rs[i];
      f.path(`M${x - 50},${top} L${x - w / 2},${top} Q${x},${top + dp * 2} ${x + w / 2},${top} L${x + 50},${top} L${x + 50},262 L${x - 50},262 Z`, {fill: f.lg(uid('pt'), [[0, '#7cc86e'], [1, '#3f8f3a']]), stroke: '#2f6e2c', 'stroke-width': 1.2, parent: inner});
      f.path(`M${x - w / 2},${top} Q${x},${top + dp * 2} ${x + w / 2},${top}`, {stroke: '#245a22', 'stroke-width': 2, parent: inner});
      const ghost = f.g({parent: inner}); ghost.setAttribute('opacity', .55); ball(f, ghost, x, y0 + rs[i], rs[i]);
      const bl = f.g({parent: inner}); ball(f, bl, 0, 0, rs[i]);
      tag(f, inner, x, 249, M(labs[i], 15), {cls: 'm', size: 15, w: s === 0 ? 84 : 48});
      items.push({bl, x, y0: y0 + rs[i], y1: top + dp - rs[i] + 4, k: hs[i]});
    });
  });
  return {update(t){
    const tt = o.book ? 9 : t % 3.2;
    items.forEach(q => { const k = clamp(tt / (.5 + .5 * Math.sqrt(q.k)), 0, 1); setT(q.bl, q.x, lerp(q.y0, q.y1, k * k)); q.bl.setAttribute('opacity', o.book ? 0 : 1); });
  }};
};

/* ---------- À retenir 1 : énergie cinétique d'un solide en translation ---------- */
SCENES.figEc = (host, o = {}) => {
  const W = 420, H = 240, f = new Fig(host, W, H, {label: 'Voiture de masse m en translation à la vitesse V'});
  const sc = outdoor(f, 170, {ground: 'road', noHills: true});
  const marks = f.g({parent: sc}); for (let x = 0; x < W + 80; x += 80) f.rect(x, 206, 40, 5, {fill: '#ffffff', opacity: .8, parent: marks});
  const cg = f.g({parent: sc}); const Cr = car(f, cg, 0, 0, .8, '#1f5fa8'); setT(cg, 190, 198);
  const G = [190 + 3, 198 - 34];
  f.line(G[0], G[1], G[0] + 150, G[1], {stroke: '#ffffff', 'stroke-width': 8, opacity: .85, parent: sc});
  vec(f, sc, G[0], G[1], G[0] + 150, G[1], C.orange, 3.6); vlab(f, sc, G[0] + 160, G[1] - 10, 'V', '#c45f00', 23, 'start');
  f.circ(G[0], G[1], 5, {fill: '#ffffff', stroke: '#1b2a41', 'stroke-width': 1.6, parent: sc}); f.T(G[0] - 8, G[1] - 9, 'G', {cls: 'lbl-b', anchor: 'end', size: 16, fill: '#ffffff', parent: sc});
  tag(f, sc, 120, 112, M('m', 22), {cls: 'm', size: 22, w: 20});
  f.frame();
  return {update(t){ const k = o.book ? 0 : t; marks.setAttribute('transform', `translate(${f2(-(k * 160) % 80)},0)`); Cr.spin(k * 400); }};
};

/* ---------- Application 1 : une voiture qui accélère ---------- */
SCENES.voitureApp = (host, o = {}) => {
  const W = 540, H = 300, f = new Fig(host, W, H, {label: 'Une voiture de 1,2 t accélère de 54 à 108 km/h'});
  const sc = outdoor(f, 200, {ground: 'road'});
  const marks = f.g({parent: sc}); for (let x = 0; x < W + 80; x += 80) f.rect(x, 262, 40, 5, {fill: '#ffffff', opacity: .8, parent: marks});
  const trees = f.g({parent: sc}); for (let x = 30; x < W + 160; x += 160){ f.rect(x - 4, 150, 8, 50, {fill: '#6b4f2e', parent: trees}); f.circ(x, 142, 26, {fill: '#4f8f45', stroke: 'none', parent: trees}); }
  const cg = f.g({parent: sc}); const Cr = car(f, cg, 0, 0, .95, '#d62839'); setT(cg, 300, 246);
  vec(f, sc, 300, 150, 410, 150, C.orange, 3); vlab(f, sc, 418, 158, 'V', '#c45f00', 22, 'start');
  // compteur de vitesse
  const g = f.g({parent: sc}), gx = 82, gy = 84;
  f.circ(gx, gy, 58, {fill: '#1b2430', stroke: '#8a96a8', 'stroke-width': 3, parent: g});
  for (let v = 0; v <= 160; v += 20){ const a = 220 - v * 260 / 160; const [x1, y1] = P(gx, gy, 48, a), [x2, y2] = P(gx, gy, 39, a); f.line(x1, y1, x2, y2, {stroke: '#ffffff', 'stroke-width': 1.6, parent: g}); }
  const needle = f.line(gx, gy, gx, gy - 40, {stroke: '#ff6b2b', 'stroke-width': 3, parent: g}); f.circ(gx, gy, 5, {fill: '#d9dee5', stroke: 'none', parent: g});
  const sp = f.T(gx, gy + 30, '', {cls: 'lbl-b', anchor: 'middle', size: 13, fill: '#ffffff', parent: g});
  tag(f, sc, 455, 40, M('m = 1,2 \\t', 18), {cls: 'm', size: 18, w: 76});
  f.frame();
  let x = 0;
  return {update(t, dt = 0){
    const tt = o.book ? 0 : t % 8, v = o.book ? 54 : 54 + 54 * ease(seg(tt, 1.5, 5.5));
    const [nx, ny] = P(gx, gy, 40, 220 - v * 260 / 160); f.set(needle, {x2: nx, y2: ny}); sp.textContent = Math.round(v) + ' km/h';
    x += (dt || 0) * v * 3;
    marks.setAttribute('transform', `translate(${f2(-x % 80)},0)`); trees.setAttribute('transform', `translate(${f2(-(x * .4) % 160)},0)`); Cr.spin(x * 2.6);
  }};
};

/* ---------- Situation de départ 2 : une éolienne ---------- */
SCENES.eolienne = (host, o = {}) => {
  const W = 480, H = 440, f = new Fig(host, W, H, {label: 'Éolienne : le rotor tourne autour d’un axe fixe'});
  const sc = outdoor(f, 380, {ground: 'grass'});
  const T1 = windTurbine(f, sc, 300, 392, 230);
  const T2 = windTurbine(f, sc, 96, 384, 130);
  tag(f, sc, 240, 424, 'le rotor tourne autour d’un axe fixe', {size: 14, w: 270});
  f.circ(T1.x, T1.y, 9, {fill: 'none', stroke: '#d62839', 'stroke-width': 2, parent: sc});
  f.T(T1.x + 16, T1.y + 34, M('(Δ)', 18), {cls: 'm', size: 18, fill: '#d62839', parent: sc});
  f.frame();
  return {update(t){ setT(T1.rot, T1.x, T1.y, o.book ? 15 : t * 60); setT(T2.rot, T2.x, T2.y, o.book ? 70 : 40 + t * 85); }};
};

/* ---------- Activité 2, doc 4 : un solide en rotation = ensemble de points ---------- */
SCENES.pointsRot = (host, o = {}) => {
  const W = 440, H = 430, f = new Fig(host, W, H, {label: 'Disque en rotation autour de l’axe Δ : trois éléments M1, M2, M3 situés à des distances r1, r2, r3 de l’axe ont des vitesses V1, V2, V3 proportionnelles à leur distance'});
  const cx = 215, cy = 220, R = 170;
  f.circ(cx + 4, cy + 8, R, {fill: '#0b1220', opacity: .12, stroke: 'none', filter: realDefs(f).blur4});
  const disk = f.g({});
  f.circ(0, 0, R, {fill: f.rg('dk', [[0, '#f7fafd'], [.8, '#dbe5f0'], [1, '#b8c6d6']], .4, .35, .75), stroke: '#6f7c8c', 'stroke-width': 2, parent: disk});
  for (let k = 0; k < 6; k++){ const [x, y] = P(0, 0, R - 10, k * 60); f.line(0, 0, x, y, {stroke: '#c3cfdc', 'stroke-width': 1, parent: disk}); }
  setT(disk, cx, cy);
  const pts = [[62, '1', 25], [112, '2', 135], [160, '3', 245]].map(([r, n, a0]) => {
    const g = f.g({});
    f.line(0, 0, r, 0, {stroke: '#1b2a41', 'stroke-width': 1.3, 'stroke-dasharray': '5 4', parent: g});
    vec(f, g, r, 0, r, -r * .5, C.red, 3);
    f.dot(r, 0, {r: 6, fill: '#1f5fa8', parent: g});
    return {g, r, n, a0, m: f.g({}), v: f.g({}), rl: f.g({})};
  });
  pts.forEach(q => {
    f.T(0, 0, M('M_' + q.n, 19), {cls: 'm', anchor: 'middle', size: 19, fill: '#1f5fa8', parent: q.m});
    vlab(f, q.v, 0, 0, 'V_' + q.n, '#d62839', 19);
    f.T(0, 0, M('r_' + q.n, 17), {cls: 'm', anchor: 'middle', size: 17, parent: q.rl});
  });
  f.circ(cx, cy, 8, {fill: '#ffffff', stroke: '#1b2a41', 'stroke-width': 2}); f.dot(cx, cy, {r: 3});
  f.T(cx - 14, cy + 30, M('(Δ)', 19), {cls: 'm', anchor: 'end', size: 19});
  f.path(arcD(cx, cy, R + 18, 100, 150), {stroke: '#1f9d74', 'stroke-width': 2.6, 'marker-end': f.mk('green')});
  f.T(cx - 92, cy - R - 4, M('ω', 22), {cls: 'm', size: 22, fill: '#1f9d74'});
  // coordonnées écran d'un point repéré en polaire (rayon r, angle a) + décalage tangent (sens de rotation)
  const at = (r, a, t = 0) => [cx + r * Math.cos(rad(a)) - t * Math.sin(rad(a)), cy - r * Math.sin(rad(a)) - t * Math.cos(rad(a))];
  return {update(t){
    const a = o.book ? 0 : t * 22;
    setT(disk, cx, cy, -a);
    pts.forEach(q => {
      const ang = q.a0 + a; setT(q.g, cx, cy, -ang);
      const [mx, my] = at(q.r + 18, ang, -12); setT(q.m, mx, my + 7);
      const [vx, vy] = at(q.r + 12, ang, q.r * .5 + 14); setT(q.v, vx, vy + 7);
      const [rx, ry] = at(q.r * .55, ang, -14); setT(q.rl, rx, ry + 6);
    });
  }};
};

/* ---------- Activité 2, doc 5 : solides homogènes et axe de rotation ---------- */
SCENES.solides = (host, o = {}) => {
  const CW = 280, CH = 205, W = 3 * CW, H = 2 * CH, f = new Fig(host, W, H, {label: 'Disque, anneau, cylindre, sphère, tige tournant autour de son milieu et tige tournant autour d’une extrémité, avec leur axe de rotation Δ'});
  const metal = (id, c) => f.lg(id, [[0, shade(c, .25)], [.35, tint(c, .45)], [.65, c], [1, shade(c, .35)]], 0, 0, 1, 0);
  const cells = [];
  const cell = (i, title, draw) => {
    const x0 = (i % 3) * CW, y0 = Math.floor(i / 3) * CH, g = f.g({}); g.setAttribute('transform', `translate(${x0},${y0})`);
    f.rect(6, 6, CW - 12, CH - 12, {rx: 14, fill: '#f6f9fd', stroke: '#c9d6e6', 'stroke-width': 1.3, parent: g});
    f.T(CW / 2, CH - 16, title.replace(/ ([rl])$/, ' <tspan class="mf" font-style="italic" font-weight="400" style="font-size:17px">$1</tspan>'), {cls: 'lbl-b', anchor: 'middle', size: 18, parent: g});
    const live = draw(g); cells.push(live);
  };
  const axis = (g, x, y1, y2) => { f.line(x, y1, x, y2, {stroke: '#d62839', 'stroke-width': 1.6, 'stroke-dasharray': '7 4', parent: g}); f.T(x + 8, y1 + 12, M('(Δ)', 16), {cls: 'm', size: 16, fill: '#d62839', parent: g}); };
  const turn = (g, x, y, rx) => { f.path(`M${x - rx},${y} A${rx},${rx * .28} 0 0 0 ${x + rx},${y}`, {stroke: '#1f9d74', 'stroke-width': 2, 'marker-end': f.mk('green'), parent: g}); };
  const Y1 = 16, Y2 = 172, YT = 46;
  // disque (axe perpendiculaire au plan, passant par le centre)
  cell(0, 'Disque', g => {
    const cx = 140, cy = 112; axis(g, cx, Y1, Y2);
    f.ell(cx, cy + 6, 92, 26, {fill: shade('#9aa7b6', .25), parent: g}); f.rect(cx - 92, cy, 184, 6, {fill: shade('#9aa7b6', .25), parent: g});
    f.ell(cx, cy, 92, 26, {fill: f.rg('dsk', [[0, '#eef2f6'], [1, '#9aa7b6']], .4, .3, .8), stroke: '#6f7c8c', 'stroke-width': 1.2, parent: g});
    f.line(cx, cy, cx + 92, cy, {stroke: '#1b2a41', 'stroke-width': 1.2, 'stroke-dasharray': '4 3', parent: g}); f.T(cx + 50, cy - 5, M('r', 17), {cls: 'm', size: 17, parent: g});
    const mk = f.circ(0, 0, 5, {fill: '#d62839', stroke: 'none', parent: g});
    turn(g, cx, YT, 34);
    return a => f.set(mk, {cx: cx + 72 * Math.cos(rad(a)), cy: cy + 20 * Math.sin(rad(a))});
  });
  // anneau
  cell(1, 'Anneau (cerceau)', g => {
    const cx = 140, cy = 112; axis(g, cx, Y1, Y2);
    f.ell(cx, cy, 92, 26, {fill: 'none', stroke: '#8a6c55', 'stroke-width': 9, parent: g});
    f.ell(cx, cy, 92, 26, {fill: 'none', stroke: '#c9a27a', 'stroke-width': 4, parent: g});
    f.line(cx, cy, cx + 92, cy, {stroke: '#1b2a41', 'stroke-width': 1.2, 'stroke-dasharray': '4 3', parent: g}); f.T(cx + 50, cy - 5, M('r', 17), {cls: 'm', size: 17, parent: g});
    const mk = f.circ(0, 0, 5, {fill: '#d62839', stroke: 'none', parent: g});
    turn(g, cx, YT, 34);
    return a => f.set(mk, {cx: cx + 92 * Math.cos(rad(a)), cy: cy + 26 * Math.sin(rad(a))});
  });
  // cylindre plein
  cell(2, 'Cylindre plein', g => {
    const cx = 140, top = 82, bot = 152; axis(g, cx, Y1, Y2);
    f.ell(cx, bot, 52, 14, {fill: shade('#9aa7b6', .3), parent: g});
    f.rect(cx - 52, top, 104, bot - top, {fill: metal('cyl', '#9aa7b6'), parent: g});
    f.ell(cx, top, 52, 14, {fill: f.rg('cyt', [[0, '#eef2f6'], [1, '#aeb9c6']], .4, .3, .8), stroke: '#6f7c8c', 'stroke-width': 1, parent: g});
    f.line(cx, top, cx + 52, top, {stroke: '#1b2a41', 'stroke-width': 1.2, 'stroke-dasharray': '4 3', parent: g}); f.T(cx + 26, top - 4, M('r', 17), {cls: 'm', anchor: 'middle', size: 17, parent: g});
    const mk = f.rect(0, top + 8, 5, bot - top - 2, {fill: '#d62839', opacity: .85, parent: g});
    turn(g, cx, YT, 30);
    return a => { const c = Math.cos(rad(a)), s = Math.sin(rad(a)); f.set(mk, {x: cx + 46 * c - 2.5}); mk.setAttribute('opacity', s > 0 ? .85 : 0); };
  });
  // sphère
  cell(3, 'Sphère pleine', g => {
    const cx = 140, cy = 116, R = 50; axis(g, cx, Y1, Y2);
    f.circ(cx, cy, R, {fill: f.rg('sph', [[0, '#ffffff'], [.4, '#c9d1da'], [1, '#5d6978']], .35, .3, .8), stroke: '#3b4654', 'stroke-width': 1, parent: g});
    f.ell(cx, cy, R, 13, {fill: 'none', stroke: '#8a96a8', 'stroke-width': 1, 'stroke-dasharray': '3 3', parent: g});
    f.line(cx, cy, cx - R, cy, {stroke: '#1b2a41', 'stroke-width': 1.2, 'stroke-dasharray': '4 3', parent: g}); f.T(cx - 26, cy - 5, M('r', 17), {cls: 'm', anchor: 'middle', size: 17, parent: g});
    const mk = f.circ(0, 0, 5, {fill: '#d62839', stroke: 'none', parent: g});
    turn(g, cx, YT, 26);
    return a => { const s = Math.sin(rad(a)); f.set(mk, {cx: cx + R * Math.cos(rad(a)), cy: cy + 13 * s}); mk.setAttribute('opacity', s > -.2 ? 1 : .25); };
  });
  // tige, axe au milieu
  cell(4, 'Tige, axe au milieu', g => {
    const cx = 140, cy = 108; axis(g, cx, Y1, Y2);
    const rod = f.g({parent: g});
    f.rect(-100, -5, 200, 10, {rx: 5, fill: f.lg('rod1', [[0, '#c9a27a'], [1, '#7a5c45']]), stroke: '#5a4636', 'stroke-width': .8, parent: rod});
    f.line(cx - 100, cy + 24, cx + 100, cy + 24, {stroke: '#1b2a41', 'stroke-width': 1.2, 'marker-start': f.mk('ink'), 'marker-end': f.mk('ink'), parent: g});
    f.T(cx + 50, cy + 44, M('l', 17), {cls: 'm', anchor: 'middle', size: 17, parent: g});
    turn(g, cx, YT, 30);
    return a => rod.setAttribute('transform', `translate(${cx},${cy}) scale(${f2(Math.cos(rad(a)))},1)`);
  });
  // tige, axe à une extrémité
  cell(5, 'Tige, axe à une extrémité', g => {
    const cx = 60, cy = 108; axis(g, cx, Y1, Y2);
    const rod = f.g({parent: g});
    f.rect(0, -5, 200, 10, {rx: 5, fill: f.lg('rod2', [[0, '#c9a27a'], [1, '#7a5c45']]), stroke: '#5a4636', 'stroke-width': .8, parent: rod});
    f.line(cx, cy + 24, cx + 200, cy + 24, {stroke: '#1b2a41', 'stroke-width': 1.2, 'marker-start': f.mk('ink'), 'marker-end': f.mk('ink'), parent: g});
    f.T(cx + 100, cy + 44, M('l', 17), {cls: 'm', anchor: 'middle', size: 17, parent: g});
    turn(g, cx, YT, 30);
    return a => rod.setAttribute('transform', `translate(${cx},${cy}) scale(${f2(Math.cos(rad(a)))},1)`);
  });
  return {update(t){ const a = o.book ? -20 : -t * 70; cells.forEach(fn => fn(a)); }};
};

/* ---------- Application 2 : disque en rotation ---------- */
SCENES.disqueApp = (host, o = {}) => {
  const W = 440, H = 320, f = new Fig(host, W, H, {label: 'Disque homogène de 4,0 kg et de rayon 20 cm tournant à 600 tours par minute autour d’un axe passant par son centre'});
  const sc = labScene(f, 290), d = realDefs(f);
  const cx = 170, cy = 150, R = 110;
  f.rect(cx - 8, cy, 16, 140, {fill: d.metal, parent: sc}); f.rect(cx - 50, 280, 100, 12, {rx: 4, fill: '#3b4654', parent: sc});
  shadowEll(f, sc, cx + 6, cy + 10, R, R * .9, .18);
  const disk = f.g({parent: sc});
  f.circ(0, 0, R, {fill: f.rg('dq', [[0, '#f5f8fb'], [.8, '#c3ccd6'], [1, '#8a96a8']], .4, .35, .75), stroke: '#5d6978', 'stroke-width': 2, parent: disk});
  f.circ(0, 0, R - 10, {fill: 'none', stroke: '#9aa7b6', 'stroke-width': 1.2, parent: disk});
  f.rect(-6, -R + 4, 12, 26, {rx: 4, fill: '#d62839', parent: disk});
  f.circ(0, 0, 14, {fill: '#3b4654', stroke: 'none', parent: disk});
  setT(disk, cx, cy);
  f.line(cx, cy, cx + R, cy, {stroke: '#1b2a41', 'stroke-width': 1.4, 'stroke-dasharray': '5 4', parent: sc}); f.T(cx + 55, cy - 6, M('r', 20), {cls: 'm', anchor: 'middle', size: 20, parent: sc});
  f.circ(cx, cy, 5, {fill: '#ffffff', stroke: '#1b2a41', 'stroke-width': 1.5, parent: sc});
  f.path(arcD(cx, cy, R + 16, 120, 60), {stroke: '#1f9d74', 'stroke-width': 2.6, 'marker-end': f.mk('green'), parent: sc});
  const tach = display(f, sc, 288, 24, 144, 62, 'TACHYMÈTRE'); tach.textContent = '600 tr/min';
  tag(f, sc, 365, 146, M('m = 4,0 \\k\\g', 17), {cls: 'm', size: 17, w: 90});
  tag(f, sc, 365, 180, M('r = 20 \\c\\m', 17), {cls: 'm', size: 17, w: 80});
  if (!o.book) f.T(300, 116 - 10, 'animation ralentie', {cls: 'lbl-s', size: 12, parent: sc});
  f.frame();
  return {update(t){ setT(disk, cx, cy, o.book ? 0 : t * 150); }};
};
