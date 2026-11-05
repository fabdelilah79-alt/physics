/* ===== Physique, chapitre 5 — L'énergie thermique, le transfert thermique : titre, parties 1 et 2 ===== */

const frc = (v, n = 1) => fr(v, n) + ' °C';
// théière marocaine (centre du bas en (x, y), échelle s)
function teapot(f, parent, x, y, s = 1){
  const g = f.g({parent}); g.setAttribute('transform', `translate(${x},${y}) scale(${s})`);
  const silver = f.lg(uid('tp'), [[0, '#6b7785'], [.3, '#f2f5f8'], [.6, '#aeb9c6'], [1, '#4a5560']], 0, 0, 1, 0);
  f.path('M-58,-60 C-110,-70 -128,-128 -150,-150 L-143,-156 C-118,-138 -96,-104 -54,-92 Z', {fill: silver, stroke: '#3b4654', 'stroke-width': 1.5, parent: g});   // bec
  f.path('M58,-112 C112,-112 112,-30 54,-34', {stroke: '#4a5560', 'stroke-width': 10, fill: 'none', parent: g});                                      // anse
  f.path('M-70,0 C-84,-56 -66,-112 -36,-122 L36,-122 C66,-112 84,-56 70,0 Z', {fill: silver, stroke: '#3b4654', 'stroke-width': 1.5, parent: g});  // corps
  f.path('M-34,-122 C-30,-150 30,-150 34,-122 Z', {fill: silver, stroke: '#3b4654', 'stroke-width': 1.5, parent: g});                              // couvercle
  f.path('M0,-150 l-8,-12 l8,-14 l8,14 z', {fill: '#d9b45a', stroke: '#7a5a1c', 'stroke-width': 1, parent: g});
  f.path('M-64,-26 C-20,-16 20,-16 64,-26', {stroke: '#d9b45a', 'stroke-width': 4, fill: 'none', opacity: .8, parent: g});
  return g;
}
// chauffe-eau solaire sur un toit (silhouette) : pied en (x, y)
function solarHeater(f, parent, x, y, s = 1, col = '#0e1c33'){
  const g = f.g({parent}); g.setAttribute('transform', `translate(${x},${y}) scale(${s})`);
  f.path('M-50,0 L-30,-46 L46,-46 L26,0 Z', {fill: '#173a63', stroke: col, 'stroke-width': 2, parent: g});
  for (let k = 1; k < 5; k++) f.line(-50 + k * 15.2, 0, -30 + k * 15.2, -46, {stroke: '#4f7fb3', 'stroke-width': 1, parent: g});
  f.rect(-36, -66, 84, 18, {rx: 9, fill: col, parent: g});
  return g;
}

/* ---------- Titre (et bandeau du livre) : soleil couchant, toits avec chauffe-eau solaires, théière fumante ---------- */
SCENES.titre = (host, o = {}) => {
  const W = o.W || 1600, H = o.H || 900, f = new Fig(host, W, H, {par: 'xMidYMid slice', label: 'Au coucher du soleil, des chauffe-eau solaires sur les toits et une théière fumante'});
  const s = H / 900, d = realDefs(f);
  f.rect(0, 0, W, H, {fill: f.lg('sky5', [[0, '#1b1440'], [.45, '#7a2f55'], [.75, '#e0703a'], [1, '#f6b26b']])});
  const sx = W * .72, sy = H * .52;
  const rays = f.g({}); for (let k = 0; k < 18; k++) f.path(`M0,0 L${f2(W)},-${f2(30 * s)} L${f2(W)},${f2(30 * s)} Z`, {fill: '#ffd38a', opacity: .07, transform: `rotate(${k * 20})`, parent: rays});
  f.circ(sx, sy, 130 * s, {fill: '#ffd38a', opacity: .5, filter: d.blur6});
  f.circ(sx, sy, 86 * s, {fill: f.rg('sun5', [[0, '#fff6d6'], [.6, '#ffd166'], [1, '#f6a13a']])});
  // toits
  const roof = '#2a1630', yR = H * .7;
  f.path(`M0,${yR} L${W * .12},${yR} L${W * .12},${yR - 60 * s} L${W * .3},${yR - 60 * s} L${W * .3},${yR - 20 * s} L${W * .45},${yR - 20 * s} L${W * .45},${yR - 90 * s} L${W * .6},${yR - 90 * s} L${W * .6},${yR - 40 * s} L${W * .78},${yR - 40 * s} L${W * .78},${yR - 110 * s} L${W * .9},${yR - 110 * s} L${W * .9},${yR - 50 * s} L${W},${yR - 50 * s} L${W},${H} L0,${H} Z`, {fill: roof});
  f.path(`M${W * .52},${yR - 90 * s} a${46 * s},${40 * s} 0 0 1 ${92 * s},0 Z`, {fill: roof});
  f.rect(W * .84 - 6 * s, yR - 170 * s, 12 * s, 60 * s, {fill: roof});
  [[.2, 60], [.37, 20], [.68, 40], [.95, 50]].forEach(([k, h]) => solarHeater(f, null, W * k, yR - h * s, 1.1 * s, roof));
  // premier plan : plateau et théière
  f.path(`M${W * .55},${H * .95} Q${W * .75},${H * .86} ${W},${H * .9} L${W},${H} L${W * .55},${H} Z`, {fill: '#120a1c'});
  f.ell(W * .84, H * .93, 190 * s, 24 * s, {fill: f.lg('tray', [[0, '#d9b45a'], [1, '#7a5a1c']])});
  teapot(f, null, W * .84, H * .91, 1.25 * s);
  const st = steam(f, null, W * .84, H * .91 - 200 * s, 3, {gap: 18 * s});
  [-130, 120].forEach((dx, i) => { const gx = W * .84 + dx * s;
    f.path(`M${gx - 22 * s},${H * .91 - 60 * s} L${gx + 22 * s},${H * .91 - 60 * s} L${gx + 16 * s},${H * .91} L${gx - 16 * s},${H * .91} Z`, {fill: f.lg(uid('ve'), [[0, '#b8573a', .9], [1, '#6b2a1a', .9]]), stroke: '#f2d39b', 'stroke-width': 2 * s}); });
  f.rect(0, 0, W, H, {fill: f.lg('veil5', [[0, '#0b0618', .9], [.38, '#0b0618', .55], [.56, '#0b0618', 0]], 0, 0, 1, 0)});
  if (o.book){
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22} L${W},${H} L0,${H} Z`, {fill: '#ffffff', stroke: 'none'});
    f.path(`M0,${H - 40} C${W * .24},${H - 2} ${W * .63},${H - 70} ${W},${H - 22}`, {stroke: '#f07f1e', 'stroke-width': 5});
  }
  return {update(t){ setT(rays, sx, sy, o.book ? 8 : t * 4); st.update(o.book ? .3 : t); }};
};

/* ---------- Activité 1, docs 1 et 2 (et situation 1) : chauffage de deux béchers sur des plaques identiques ---------- */
SCENES.chauffage = (host, o = {}) => {
  const exp = o.exp || 1, W = 600, H = 370;
  const L = exp === 1 ? [{lab: '100 g d’eau', lev: .3, liq: '#9fd3f5', rate: 5}, {lab: '200 g d’eau', lev: .58, liq: '#9fd3f5', rate: 2.5}]
                      : [{lab: '200 g d’eau', lev: .58, liq: '#9fd3f5', rate: 2.5}, {lab: '200 g d’huile', lev: .64, liq: '#f2c94c', rate: 5.23}];
  const f = new Fig(host, W, H, {label: exp === 1 ? 'Deux béchers contenant 100 g et 200 g d’eau sont chauffés par deux plaques identiques ; des thermomètres mesurent leur température' : 'Un bécher de 200 g d’eau et un bécher de 200 g d’huile sont chauffés par deux plaques identiques'});
  const sc = labScene(f, 312);
  const tmax = exp === 1 ? 6 : 4, xs = [160, 440], disp = [];
  L.forEach((b, i) => {
    const pl = hotPlate(f, sc, xs[i], 312, 150, {on: true});
    const bk = beaker3D(f, sc, xs[i], pl.top, 112, 128, {level: b.lev, liq: b.liq});
    disp.push(probeThermo(f, sc, xs[i] + 18, 30, pl.top - 12, {title: 'θ (°C)'}));
    tag(f, sc, xs[i], 344, b.lab, {size: 15, w: 112});
  });
  const chrono = display(f, sc, 230, 22, 140, 62, 'DURÉE', {noShadow: true});
  if (!o.book) f.T(W - 12, H - 6, 'animation accélérée', {cls: 'lbl-s', size: 12, anchor: 'end', fill: '#ffffff', parent: sc});
  f.frame();
  return {update(t){
    const tm = o.book ? 0 : Math.min((t % (tmax * .9 + 2)) / .9, tmax);   // minutes de chauffage
    L.forEach((b, i) => { disp[i].textContent = fr(20 + b.rate * tm, 1); });
    const sec = Math.round(tm * 60); chrono.textContent = Math.floor(sec / 60) + ' min ' + String(sec % 60).padStart(2, '0');
  }};
};

/* ---------- À retenir 1 : transfert thermique du corps chaud vers le corps froid ---------- */
SCENES.transfert = (host, o = {}) => {
  const W = 480, H = 230, f = new Fig(host, W, H, {label: 'Deux corps en contact : la chaleur passe spontanément du corps chaud vers le corps froid'});
  const blk = (x, c1, c2, txt, th) => { f.rect(x, 50, 170, 120, {rx: 10, fill: f.lg(uid('bl'), [[0, c1], [1, c2]]), stroke: shade(c2, .3), 'stroke-width': 1.2});
    f.T(x + 85, 98, txt, {cls: 'lbl-b', anchor: 'middle', size: 16, fill: '#ffffff'}); f.T(x + 85, 130, M(th, 22), {cls: 'm', anchor: 'middle', size: 22, fill: '#ffffff'}); };
  blk(60, '#f2785c', '#c2321f', 'corps chaud', 'θ_1'); blk(250, '#6aa8e6', '#1f5fa8', 'corps froid', 'θ_2');
  f.T(240, 210, M('θ_1 > θ_2', 21), {cls: 'm', anchor: 'middle', size: 21});
  vec(f, null, 150, 36, 330, 36, C.orange, 3.4);
  f.T(240, 20, 'transfert thermique Q', {cls: 'lbl-b', anchor: 'middle', size: 15, fill: '#c45f00'});
  const dots = [...Array(9)].map(() => f.circ(0, 0, 4, {fill: '#ffd166', stroke: '#c45f00', 'stroke-width': 1}));
  return {update(t){ dots.forEach((c, i) => { const k = o.book ? i / 9 : (t * .35 + i / 9) % 1; c.setAttribute('cx', f2(160 + 160 * k)); c.setAttribute('cy', f2(80 + 60 * ((i * 37) % 9) / 9)); c.setAttribute('opacity', f2(Math.sin(Math.PI * k))); }); }};
};

/* ---------- Application 1 : chauffe-eau électrique de 100 L ---------- */
SCENES.chauffeEau = (host, o = {}) => {
  const W = 400, H = 420, f = new Fig(host, W, H, {label: 'Chauffe-eau électrique de 100 litres en coupe : résistance chauffante, thermostat, arrivée d’eau froide et sortie d’eau chaude'});
  const sc = f.card(f.lg('mur', [[0, '#f6efe2'], [1, '#e8dcc6']])), d = realDefs(f);
  for (let y = 30; y < H; y += 40) f.line(0, y, W, y, {stroke: '#e0d2b8', 'stroke-width': 1, parent: sc});
  const x0 = 110, y0 = 40, w = 160, h = 300;
  shadowEll(f, sc, x0 + w / 2 + 8, y0 + h / 2, w * .55, h * .5, .18);
  f.rect(x0, y0, w, h, {rx: 70, fill: f.lg('ce', [[0, '#c3ccd6'], [.35, '#ffffff'], [1, '#9aa7b6']], 0, 0, 1, 0), stroke: '#7c8896', 'stroke-width': 1.4, parent: sc});
  // fenêtre de coupe
  f.rect(x0 + 22, y0 + 50, w - 44, h - 100, {rx: 18, fill: liquidGrad(f, '#7fb8e6'), stroke: '#5d7f96', 'stroke-width': 1, parent: sc});
  const coil = f.path(`M${x0 + 50},${y0 + h - 60} ` + [...Array(8)].map((_, k) => `q12,-10 0,-20`).join(' '), {stroke: '#d62839', 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round', parent: sc});
  f.line(x0 + 50, y0 + h - 60, x0 + 50, y0 + h - 30, {stroke: '#5d6978', 'stroke-width': 5, parent: sc});
  const glowC = f.rect(x0 + 38, y0 + 80, 26, 180, {rx: 13, fill: '#ff8a3a', opacity: .3, filter: d.blur6, parent: sc});
  // tuyaux
  f.path(`M${x0 + 50},${y0 + h} L${x0 + 50},${y0 + h + 50} L20,${y0 + h + 50}`, {stroke: '#1f5fa8', 'stroke-width': 10, fill: 'none', parent: sc});
  f.path(`M${x0 + w - 50},${y0 + h} L${x0 + w - 50},${y0 + h + 50} L${W - 20},${y0 + h + 50}`, {stroke: '#d62839', 'stroke-width': 10, fill: 'none', parent: sc});
  tag(f, sc, 70, y0 + h + 30, 'eau froide', {size: 13, w: 66});
  tag(f, sc, W - 60, y0 + h + 30, 'eau chaude', {size: 13, w: 72});
  const th = display(f, sc, x0 + w / 2 - 50, y0 + h - 48, 100, 58, 'THERMOSTAT', {noShadow: true});
  tag(f, sc, x0 + w / 2, 30, 'V = 100 L', {size: 15, w: 70});
  f.frame();
  return {update(t){ const k = o.book ? 0 : clamp((t % 8) / 6, 0, 1); th.textContent = fr(15 + 50 * k, 0) + ' °C'; glowC.setAttribute('opacity', o.book ? .3 : .25 + .2 * Math.sin(t * 4)); }};
};

/* ---------- Situation 2 : bloc de métal chaud plongé dans l'eau froide ---------- */
SCENES.equilibre = (host, o = {}) => {
  const W = 660, H = 360, f = new Fig(host, W, H, {label: 'Un bloc de métal chaud est plongé dans l’eau froide : les deux températures tendent vers une même valeur d’équilibre'});
  const sc = labScene(f, 320);
  const bk = beaker3D(f, sc, 150, 320, 150, 170, {level: .55});
  const blk = f.g({parent: bk.content}); metalBlock(f, blk, 0, 0, 52, 62, '#c9cfd6', {hook: 160});
  const tm = probeThermo(f, sc, 214, 40, 300, {title: 'θ eau (°C)'});
  const tb = display(f, sc, 30, 24, 100, 62, 'θ métal (°C)', {noShadow: true});
  // graphe
  const gx = 330, gy = 290, GW = 300, GH = 220;
  f.rect(gx - 10, gy - GH - 30, GW + 30, GH + 64, {rx: 10, fill: '#ffffff', opacity: .95, stroke: '#d5dfea', 'stroke-width': .8, parent: sc});
  f.line(gx, gy, gx + GW, gy, {stroke: C.ink, 'stroke-width': 1.5, 'marker-end': f.mk('ink'), parent: sc});
  f.line(gx, gy, gx, gy - GH, {stroke: C.ink, 'stroke-width': 1.5, 'marker-end': f.mk('ink'), parent: sc});
  f.T(gx + GW, gy + 22, M('t', 20), {cls: 'm', anchor: 'end', size: 20, parent: sc}); f.T(gx + 8, gy - GH + 4, M('θ', 20), {cls: 'm', size: 20, parent: sc});
  const Y = th => gy - (th - 10) / 95 * GH, X = u => gx + u * (GW - 10);
  const cm = f.path('', {stroke: C.red, 'stroke-width': 2.6, parent: sc}), cw = f.path('', {stroke: C.blue, 'stroke-width': 2.6, parent: sc});
  const eq = f.line(gx, Y(28.3), gx + GW - 10, Y(28.3), {stroke: C.green, 'stroke-width': 1.3, 'stroke-dasharray': '6 4', parent: sc});
  const leq = f.T(gx + GW - 12, Y(28.3) - 8, M('θ_{\\e}', 19), {cls: 'm', anchor: 'end', size: 19, fill: C.green, parent: sc});
  f.T(gx + 40, Y(95) + 4, 'métal', {cls: 'lbl-b', size: 13, fill: C.red, parent: sc}); f.T(gx + 40, Y(18), 'eau', {cls: 'lbl-b', size: 13, fill: C.blue, parent: sc});
  f.frame();
  const thM = u => 28.3 + 71.7 * Math.exp(-u * 5), thW = u => 28.3 - 8.3 * Math.exp(-u * 5);
  return {update(t){
    const c = o.book ? 3 : t % 8, drop = clamp(c / 1.2, 0, 1), u = clamp((c - 1.2) / 5, 0, 1);
    setT(blk, 150, lerp(bk.yl - 150, bk.yl + 20, ease(drop)));
    tb.textContent = fr(u > 0 ? thM(u) : 100, 1); tm.textContent = fr(u > 0 ? thW(u) : 20, 1);
    let a = '', b = ''; const n = 40; for (let i = 0; i <= n; i++){ const v = u * i / n; a += (i ? 'L' : 'M') + f2(X(v)) + ',' + f2(Y(thM(v))); b += (i ? 'L' : 'M') + f2(X(v)) + ',' + f2(Y(thW(v))); }
    cm.setAttribute('d', a); cw.setAttribute('d', b); eq.setAttribute('opacity', u > .8 ? 1 : 0); leq.setAttribute('opacity', u > .8 ? 1 : 0);
  }};
};

/* ---------- Activités 2 et 3, applications, exercices : calorimètre de Berthelot ---------- */
// o.mode : 'eau' (eau tiède ajoutée), 'metal' (bloc métallique), 'glace' (glaçon) ; o.th0 / o.th1 : températures affichées ; o.labels : légendes ; o.metal : couleur
SCENES.calorimetre = (host, o = {}) => {
  const W = o.labels ? 520 : 420, H = 430, f = new Fig(host, W, H, {label: 'Calorimètre de Berthelot en coupe : enceinte isolée, vase intérieur contenant de l’eau, couvercle, agitateur et thermomètre'});
  const sc = labScene(f, 400), cx = 190;
  const cal = calorimeter(f, sc, cx, 398, 220, 220, {level: .55});
  const th = probeThermo(f, sc, cal.probeX, 34, cal.yIn - 10, {title: 'θ (°C)'});
  const mode = o.mode || 'eau', in_ = f.g({parent: cal.content});
  let ice = null;
  if (mode === 'metal') metalBlock(f, in_, cx - 4, cal.yIn - 58, 50, 46, o.metal || '#c9cfd6', {hook: cal.yIn - 58 - cal.lidY + 4});
  if (mode === 'glace'){ ice = f.g({parent: in_}); iceCube(f, ice, -20, -20, 40, 12); }
  if (mode === 'eau' && !o.labels){ const bk = beaker3D(f, sc, 380, 398, 66, 80, {level: .6, liq: '#f6b48f'}); tag(f, sc, 380, 300, 'eau tiède', {size: 13, w: 64}); }
  if (o.labels){
    const call = (x1, y1, x2, y2, txt) => { f.line(x1, y1, x2, y2, {stroke: C.ink2, 'stroke-width': 1.2, parent: sc}); f.dot(x1, y1, {r: 3, fill: C.ink2, parent: sc}); tag(f, sc, x2 + 4, y2 + 5, txt, {size: 15, w: txt.length * 8.6, anchor: 'start'}); };
    call(cal.probeX + 40, 60, 372, 60, 'thermomètre');
    call(cal.sx, cal.lidY - 38, 372, 112, 'agitateur');
    call(cx + 100, cal.lidY + 6, 372, 164, 'couvercle');
    call(cal.xR - 6, cal.yl + 40, 372, 216, 'vase intérieur');
    call(cx + 104, 300, 372, 268, 'isolant');
    call(cal.xR - 30, cal.yIn - 30, 372, 320, 'eau');
  }
  f.frame();
  const th0 = o.th0 !== undefined ? o.th0 : 18, th1 = o.th1 !== undefined ? o.th1 : 29.5;
  return {update(t){
    const c = o.book ? 0 : t % 9, u = clamp((c - 1) / 6, 0, 1);
    th.textContent = fr(th0 + (th1 - th0) * (1 - Math.exp(-u * 4)) / (1 - Math.exp(-4)), 1);
    setT(cal.stir, 0, o.book ? 0 : -14 * Math.abs(Math.sin(t * 2.4)));
    if (ice){ const k = 1 - .9 * u; setT(ice, cx - 30, cal.yl + 6, 12 * (1 - u), k); ice.setAttribute('opacity', u > .97 ? 0 : 1); }
  }};
};
