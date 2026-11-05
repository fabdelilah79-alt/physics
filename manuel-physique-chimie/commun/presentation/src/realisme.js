/* ===== realisme.js — décors et matériel dessinés de façon réaliste + outils communs des scènes ===== */
let RZ = 0; const uid = p => p + (++RZ);
const SCENES = {};
function rng(seed){ let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
const lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
function setT(g, x, y, ang = 0, s = 1){ g.setAttribute('transform', `translate(${f2(x)},${f2(y)}) rotate(${f2(ang)}) scale(${f2(s)})`); }

// filtres et dégradés réutilisables
function realDefs(f){
  if (f._rd) return f._rd;
  const id = p => f.pid + p;
  const blur = (n, s) => { const fl = f.el('filter', {id: id(n), x: '-50%', y: '-50%', width: '200%', height: '200%'}, f.defs); f.el('feGaussianBlur', {stdDeviation: s}, fl); return `url(#${id(n)})`; };
  const gr = f.el('filter', {id: id('grain'), x: 0, y: 0, width: '100%', height: '100%'}, f.defs);
  f.el('feTurbulence', {type: 'fractalNoise', baseFrequency: .9, numOctaves: 2, seed: 3, result: 'n'}, gr);
  f.el('feColorMatrix', {in: 'n', type: 'matrix', values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .35 0', result: 'a'}, gr);
  f.el('feComposite', {in: 'a', in2: 'SourceGraphic', operator: 'in', result: 'b'}, gr);
  f.el('feMerge', {}, gr).innerHTML = '<feMergeNode in="SourceGraphic"/><feMergeNode in="b"/>';
  f._rd = {
    blur2: blur('b2', 2), blur4: blur('b4', 4), blur6: blur('b6', 6),
    grain: `url(#${id('grain')})`,
    metal: f.lg('metalV', [[0, '#7c8896'], [.35, '#e9eef3'], [.6, '#aeb9c6'], [1, '#5d6978']], 0, 0, 1, 0),
    metalH: f.lg('metalH', [[0, '#7c8896'], [.35, '#e9eef3'], [.6, '#aeb9c6'], [1, '#5d6978']]),
  };
  return f._rd;
}
function shadowEll(f, parent, cx, y, rx, ry, op = .22){
  const d = realDefs(f);
  return f.ell(cx, y, rx, ry, {fill: '#0b1220', opacity: op, filter: d.blur4, parent});
}
// décor de laboratoire : mur carrelé clair + paillasse sombre (bord supérieur en y = benchY)
function labScene(f, benchY){
  const sc = f.card(f.lg('wall', [[0, '#f2f6fb'], [1, '#dbe4ee']]));
  for (let x = 46; x < f.w; x += 46) f.rect(x, 0, 1.1, benchY, {fill: '#ccd7e3', parent: sc});
  for (let y = 46; y < benchY; y += 46) f.rect(0, y, f.w, 1.1, {fill: '#ccd7e3', parent: sc});
  f.rect(0, benchY, f.w, f.h - benchY, {fill: f.lg('bench', [[0, '#4a5868'], [1, '#2b3440']]), parent: sc});
  f.rect(0, benchY, f.w, 5, {fill: '#9aa7b6', parent: sc});
  return sc;
}
// boîtier d'appareil (dégradé vertical, coins arrondis)
function caseBox(f, parent, x, y, w, h, o = {}){
  const g = f.g({parent});
  if (!o.noShadow) shadowEll(f, g, x + w / 2, y + h + 4, w * .48, 6, .25);
  f.rect(x, y, w, h, {rx: 10, fill: f.lg(uid('cb'), [[0, o.c1 || '#eef2f6'], [1, o.c2 || '#b4bfcc']]), stroke: '#8a96a8', 'stroke-width': 1.2, parent: g});
  f.rect(x + 2, y + 2, w - 4, 6, {rx: 3, fill: '#ffffff', opacity: .5, parent: g});
  return g;
}
// écran LCD vert ; renvoie l'élément texte (aligné à droite)
function lcd(f, parent, x, y, w, h, o = {}){
  f.rect(x, y, w, h, {rx: 5, fill: '#1b2430', parent});
  f.rect(x + 3, y + 3, w - 6, h - 6, {rx: 3, fill: f.lg(uid('lcd'), [[0, '#c9f2d4'], [1, '#8fd6a3']], 0, 0, 1, 0), parent});
  return f.T(x + w - 9, y + h / 2 + (o.size || 22) * .36, '', {cls: 'lcd', anchor: 'end', size: o.size || 22, parent});
}
// afficheur simple : boîtier + titre + écran ; renvoie le texte de l'écran
function display(f, parent, x, y, w, h, title, o = {}){
  const g = caseBox(f, parent, x, y, w, h, {c1: o.c1 || '#eef2f6', c2: o.c2 || '#b4bfcc', noShadow: o.noShadow});
  f.T(x + 10, y + 18, title, {cls: 'lbl-b', size: 11, fill: '#1f5fa8', parent: g});
  return lcd(f, g, x + 8, y + 24, w - 16, h - 32, {size: Math.min(22, (h - 32) * .62)});
}
// potence de laboratoire : tige verticale sur socle, noix et bras horizontal jusqu'à armX
function standClamp(f, parent, x, baseY, clampY, armX, o = {}){
  const d = realDefs(f), g = f.g({parent});
  f.rect(x - 60, baseY - 10, 150, 12, {rx: 4, fill: f.lg(uid('sc'), [[0, '#5d6978'], [1, '#2b3440']]), parent: g});
  f.rect(x - 4, o.top || 40, 8, baseY - (o.top || 40) - 8, {fill: d.metal, parent: g});
  const a = Math.min(x, armX), b = Math.max(x, armX);
  f.rect(a, clampY - 4, b - a, 8, {fill: d.metalH, parent: g});
  f.rect(x - 9, clampY - 10, 18, 20, {rx: 3, fill: '#3b4654', parent: g});
  return g;
}

/* ---------- vecteurs, étiquettes ---------- */
function vec(f, parent, x1, y1, x2, y2, col = C.red, w = 3.4){
  const mk = {[C.red]: 'red', [C.blue]: 'blue', [C.green]: 'green', [C.orange]: 'orange', [C.ink]: 'ink', [C.purple]: 'purple', [C.ink2]: 'ink2', '#ffffff': 'white', [C.teal]: 'teal'}[col] || 'red';
  return f.path(`M${f2(x1)},${f2(y1)} L${f2(x2)},${f2(y2)}`, {stroke: col, 'stroke-width': w, 'marker-end': f.mk(mk), parent});
}
function setVec(p, x1, y1, x2, y2){ p.setAttribute('d', `M${f2(x1)},${f2(y1)} L${f2(x2)},${f2(y2)}`); }
// nom de vecteur avec flèche au-dessus : txt = 'F', 'AB', 'P', 'F_1', 'R_N'
function vlab(f, parent, x, y, txt, col = C.ink, size = 23, anchor = 'middle'){
  const g = f.g({parent});
  f.T(x, y, M(txt, size), {cls: 'm', anchor, size, fill: col, parent: g});
  const base = txt.replace(/_\{?[^}]*\}?/, '').replace(/[\\{}]/g, ''), w = base.length * size * .58;
  const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w - size * .2 : x;
  f.path(`M${f2(x0)},${f2(y - size * .86)} L${f2(x0 + w + 2)},${f2(y - size * .86)}`, {stroke: col, 'stroke-width': 1.6, parent: g});
  f.path(`M${f2(x0 + w - 3)},${f2(y - size * .86 - 3.4)} L${f2(x0 + w + 2.5)},${f2(y - size * .86)} L${f2(x0 + w - 3)},${f2(y - size * .86 + 3.4)}`, {stroke: col, 'stroke-width': 1.6, fill: 'none', parent: g});
  return g;
}
// étiquette sur fond blanc
function tag(f, parent, x, y, html, o = {}){
  const sz = o.size || 15, est = (o.w || html.replace(/<[^>]+>/g, '').length * sz * .6);
  const g = f.g({parent}), ax = o.anchor === 'end' ? -est : o.anchor === 'start' ? 0 : -est / 2;
  f.rect(x + ax - 6, y - sz - 2, est + 12, sz * 1.45 + 2, {rx: 7, fill: '#ffffff', opacity: o.op || .9, stroke: o.stroke || '#d5dfea', 'stroke-width': .8, parent: g});
  f.T(x, y, html, {cls: o.cls || 'lbl-b', anchor: o.anchor || 'middle', size: sz, fill: o.fill || '#1b2a41', parent: g});
  return g;
}
// décor extérieur : ciel, collines, sol (herbe, route ou parquet)
function outdoor(f, groundY, o = {}){
  const sc = f.card(f.lg(uid('sky'), o.night ? [[0, '#0b1d3a'], [1, '#2a5c8a']] : [[0, '#a9d4f5'], [.75, '#e3f1fb'], [1, '#f6fbff']]));
  if (!o.noHills){
    f.path(`M0,${groundY} C${f.w * .15},${groundY - 70} ${f.w * .35},${groundY - 40} ${f.w * .5},${groundY - 55} C${f.w * .7},${groundY - 75} ${f.w * .85},${groundY - 30} ${f.w},${groundY - 50} L${f.w},${groundY} Z`, {fill: '#b9d8c2', opacity: .8, stroke: 'none', parent: sc});
    f.path(`M0,${groundY} C${f.w * .25},${groundY - 30} ${f.w * .6},${groundY - 10} ${f.w},${groundY - 28} L${f.w},${groundY} Z`, {fill: '#9cc7a6', opacity: .9, stroke: 'none', parent: sc});
  }
  const kind = o.ground || 'grass';
  if (kind === 'road'){
    f.rect(0, groundY, f.w, f.h - groundY, {fill: f.lg(uid('road'), [[0, '#5d6670'], [1, '#3a4149']]), parent: sc});
    f.rect(0, groundY, f.w, 5, {fill: '#c9ced4', parent: sc});
  } else if (kind === 'snow'){
    f.rect(0, groundY, f.w, f.h - groundY, {fill: f.lg(uid('sn'), [[0, '#ffffff'], [1, '#dfe9f3']]), parent: sc});
  } else {
    f.rect(0, groundY, f.w, f.h - groundY, {fill: f.lg(uid('gr'), [[0, '#7fb069'], [1, '#5a8c4a']]), parent: sc});
    f.rect(0, groundY, f.w, 3, {fill: '#a8d08d', parent: sc});
  }
  return sc;
}
// caisse en bois (coin bas-gauche en (x, y)), w × h
function crate(f, parent, x, y, w, h, o = {}){
  const g = f.g({parent});
  if (!o.noShadow) shadowEll(f, g, x + w / 2 + 3, y + 2, w * .55, 5, .28);
  const col = o.col || '#c58b4e';
  f.rect(x, y - h, w, h, {rx: 3, fill: f.lg(uid('cr'), [[0, tint(col, .15)], [1, shade(col, .18)]]), stroke: shade(col, .45), 'stroke-width': 1.4, parent: g});
  const n = Math.max(3, Math.round(h / 16));
  for (let i = 1; i < n; i++) f.line(x + 3, y - h + i * h / n, x + w - 3, y - h + i * h / n, {stroke: shade(col, .35), 'stroke-width': 1, opacity: .7, parent: g});
  f.rect(x, y - h, 9, h, {fill: shade(col, .12), stroke: shade(col, .45), 'stroke-width': 1, parent: g});
  f.rect(x + w - 9, y - h, 9, h, {fill: shade(col, .12), stroke: shade(col, .45), 'stroke-width': 1, parent: g});
  f.path(`M${x + 9},${y - 6} L${x + w - 9},${y - h + 6}`, {stroke: shade(col, .3), 'stroke-width': 7, opacity: .55, parent: g});
  f.rect(x + 2, y - h + 2, w - 4, 3, {rx: 1.5, fill: '#ffffff', opacity: .25, parent: g});
  return g;
}
// masse marquée métallique (crochet en haut) : centre haut en (x, y)
function weight(f, parent, x, y, w = 44, h = 50, o = {}){
  const g = f.g({parent});
  f.path(`M${x},${y} l0,8`, {stroke: '#5d6978', 'stroke-width': 3, parent: g});
  f.rect(x - w / 2, y + 8, w, h, {rx: 6, fill: f.lg(uid('wt'), [[0, '#8a96a8'], [.4, '#e3e8ee'], [1, '#5d6978']], 0, 0, 1, 0), stroke: '#3b4654', 'stroke-width': 1.2, parent: g});
  if (o.label) f.T(x, y + 8 + h / 2 + 6, o.label, {cls: 'lbl-b', anchor: 'middle', size: 13, fill: '#1b2a41', parent: g});
  return g;
}
// corde
function rope(f, parent, d, o = {}){ f.path(d, {stroke: '#6b4f2e', 'stroke-width': o.w || 4, fill: 'none', parent}); f.path(d, {stroke: '#c9a46a', 'stroke-width': (o.w || 4) - 1.6, fill: 'none', 'stroke-dasharray': '3 3', parent}); }
// bille d'acier
function ball(f, parent, x, y, r, o = {}){
  return f.circ(x, y, r, {fill: f.rg(uid('ball'), [[0, '#ffffff'], [.35, o.mid || '#c9d1da'], [1, o.dark || '#4a5560']], .35, .3, .75), stroke: o.dark || '#3b4654', 'stroke-width': .8, parent});
}

// voiture de type coupé vue de profil, AVANT VERS LA DROITE ; (x, y) = milieu du bas de caisse ; échelle s
function car(f, parent, x, y, s = 1, col = '#d62839', o = {}){
  const g = f.g({parent});
  if (!o.noShadow) shadowEll(f, g, x, y + 4 * s, 126 * s, 6 * s, .35);
  const b = f.g({parent: g});
  b.setAttribute('transform', `translate(${x},${y}) scale(${s})`);
  if (o.race) f.path('M-112,-54 L-122,-68 L-96,-68 L-92,-56 Z', {fill: '#1b1f24', stroke: 'none', parent: b});
  f.path('M-116,-12 L-122,-16 Q-127,-21 -126,-31 L-124,-46 Q-122,-53 -112,-54 L-94,-55 Q-74,-72 -44,-81 Q-18,-88 4,-86 Q22,-84 34,-75 L54,-58 Q92,-55 120,-47 Q131,-44 133,-35 L132,-21 Q130,-12 120,-12 Z',
    {fill: f.lg(uid('car'), [[0, tint(col, .3)], [.45, col], [1, shade(col, .38)]]), stroke: shade(col, .5), 'stroke-width': 1.4, parent: b});
  f.path('M-86,-56 Q-64,-72 -38,-79 Q-16,-84 4,-83 Q18,-81 28,-73 L44,-59 Z', {fill: f.lg(uid('win'), [[0, '#dcefff'], [1, '#7fa9cf']]), stroke: '#2b3440', 'stroke-width': 1.2, parent: b});
  f.line(-30, -80, -34, -57, {stroke: shade(col, .45), 'stroke-width': 4, parent: b});
  f.path('M-36,-55 L-38,-17 M52,-56 L54,-17', {stroke: shade(col, .45), 'stroke-width': 1.2, fill: 'none', parent: b});
  f.rect(-28, -47, 13, 3.5, {rx: 1.7, fill: shade(col, .5), parent: b});
  f.path('M40,-61 L50,-68 L56,-66 L50,-59 Z', {fill: shade(col, .3), stroke: 'none', parent: b});
  f.path('M-104,-33 L122,-35', {stroke: '#ffffff', 'stroke-width': 2, opacity: .35, parent: b});
  f.path('M110,-46 L128,-41 Q133,-38 130,-36 L111,-39 Z', {fill: '#fff6c8', stroke: '#b08a2a', 'stroke-width': .8, parent: b});
  f.rect(118, -27, 13, 5, {rx: 2, fill: '#1b1f24', parent: b});
  f.rect(-127, -45, 8, 9, {rx: 2.5, fill: '#e0262f', stroke: '#8e1218', 'stroke-width': .6, parent: b});
  if (o.race){
    f.path('M-122,-26 L131,-28', {stroke: '#ffffff', 'stroke-width': 5, opacity: .9, parent: b});
    f.circ(8, -34, 11, {fill: '#ffffff', stroke: '#1b1f24', 'stroke-width': 1.2, parent: b});
    f.T(8, -29, '7', {cls: 'lbl-b', anchor: 'middle', size: 14, fill: '#1b1f24', parent: b});
  }
  const wheels = [-74, 78].map(wx => {
    f.path(`M${wx - 27},-12 A27,27 0 0 1 ${wx + 27},-12 Z`, {fill: '#14181d', stroke: 'none', parent: b});
    const w = f.g({parent: b}); setT(w, wx, -12);
    f.circ(0, 0, 22, {fill: '#1b1f24', stroke: 'none', parent: w}); f.circ(0, 0, 13, {fill: f.rg(uid('rim'), [[0, '#eef2f6'], [1, '#7c8896']]), stroke: 'none', parent: w});
    for (let k = 0; k < 5; k++) f.line(0, 0, 11 * Math.cos(k * 1.2566), 11 * Math.sin(k * 1.2566), {stroke: '#5d6978', 'stroke-width': 2.4, parent: w});
    f.circ(0, 0, 3, {fill: '#3b4654', stroke: 'none', parent: w}); return {w, x: wx}; });
  return {g, b, wheels, spin(a){ wheels.forEach(q => setT(q.w, q.x, -12, a)); }};
}
// camion vu de profil, avant vers la droite ; (x, y) = milieu du bas de caisse
function truck(f, parent, x, y, s = 1, col = '#1f5fa8'){
  const g = f.g({parent}); shadowEll(f, g, x, y + 4 * s, 170 * s, 7 * s, .35);
  const b = f.g({parent: g}); b.setAttribute('transform', `translate(${x},${y}) scale(${s})`);
  f.rect(-170, -128, 230, 108, {rx: 6, fill: f.lg(uid('tb'), [[0, '#f4f6f9'], [1, '#c3ccd6']]), stroke: '#7c8896', 'stroke-width': 1.4, parent: b});
  for (let k = -150; k < 50; k += 28) f.line(k, -122, k, -26, {stroke: '#aeb9c6', 'stroke-width': 1.2, parent: b});
  f.path('M66,-20 L66,-104 Q66,-112 74,-112 L126,-112 Q136,-112 142,-102 L166,-64 Q172,-56 172,-46 L172,-26 Q172,-20 164,-20 Z', {fill: f.lg(uid('tc'), [[0, tint(col, .3)], [1, shade(col, .3)]]), stroke: shade(col, .5), 'stroke-width': 1.4, parent: b});
  f.path('M112,-104 L134,-104 L156,-66 L112,-66 Z', {fill: f.lg(uid('tw'), [[0, '#dcefff'], [1, '#7fa9cf']]), stroke: '#2b3440', 'stroke-width': 1.2, parent: b});
  f.path('M164,-44 L174,-42 L174,-34 L164,-34 Z', {fill: '#fff6c8', stroke: 'none', parent: b});
  f.rect(-172, -36, 6, 10, {rx: 2, fill: '#e0262f', parent: b});
  f.rect(-170, -24, 342, 8, {fill: '#2b3440', parent: b});
  const wheels = [-130, -86, 130].map(wx => { const w = f.g({parent: b}); setT(w, wx, -12);
    f.circ(0, 0, 24, {fill: '#1b1f24', stroke: 'none', parent: w}); f.circ(0, 0, 13, {fill: f.rg(uid('trim'), [[0, '#eef2f6'], [1, '#7c8896']]), stroke: 'none', parent: w});
    for (let k = 0; k < 6; k++) f.line(0, 0, 11 * Math.cos(k * 1.047), 11 * Math.sin(k * 1.047), {stroke: '#5d6978', 'stroke-width': 2.2, parent: w});
    return {w, x: wx}; });
  return {g, b, spin(a){ wheels.forEach(q => setT(q.w, q.x, -12, a)); }};
}
// main qui serre (poing) : avant-bras vers -x
function fist(f, parent, x, y, ang = 0, s = 1, o = {}){
  const g = f.g({parent}); g.setAttribute('transform', `translate(${x},${y}) rotate(${ang}) scale(${o.mirror ? -s : s},${s})`);
  const skin = '#e3b48b', gr = f.lg(uid('fs'), [[0, tint(skin, .25)], [1, shade(skin, .2)]]), st = shade(skin, .35);
  f.rect(-64, -10, 46, 20, {rx: 6, fill: o.sleeve || '#1f5fa8', parent: g});
  f.rect(-22, -8, 12, 16, {fill: skin, parent: g});
  f.rect(-14, -13, 24, 26, {rx: 9, fill: gr, stroke: st, 'stroke-width': .8, parent: g});
  for (let i = 0; i < 4; i++) f.rect(3, -13 + i * 6.5, 13, 6.5, {rx: 3.2, fill: gr, stroke: st, 'stroke-width': .7, parent: g});
  f.rect(-9, -17, 19, 7, {rx: 3.5, fill: gr, stroke: st, 'stroke-width': .7, parent: g});
  return g;
}
// personnage simple debout ou accroupi (ski) ; pieds en (0, 0) ; o.pose : 'stand' | 'ski'
function skier(f, parent, x, y, s = 1, ang = 0, o = {}){
  const g = f.g({parent}); g.setAttribute('transform', `translate(${x},${y}) rotate(${ang}) scale(${s})`);
  const skin = '#e3b48b', cloth = o.col || '#d62839', cap = {'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none'};
  f.rect(-46, -2, 104, 5, {rx: 2.5, fill: '#1b2a41', parent: g});                                      // skis
  f.path('M58,0 q8,0 10,-6', {stroke: '#1b2a41', 'stroke-width': 4, parent: g});
  f.path('M-4,-4 L6,-30 L-10,-52', {stroke: '#2b3440', 'stroke-width': 12, ...cap, parent: g});       // jambes fléchies
  f.path('M-10,-52 L8,-86', {stroke: cloth, 'stroke-width': 22, ...cap, parent: g});                    // buste penché vers l'avant
  f.circ(16, -100, 11, {fill: f.rg(uid('sh'), [[0, tint(skin, .3)], [1, shade(skin, .15)]], .4, .35, .7), stroke: 'none', parent: g});
  f.path('M5,-104 Q15,-118 28,-104 Z', {fill: '#1f5fa8', stroke: 'none', parent: g});                    // bonnet
  f.path('M6,-80 L26,-62 L36,-62', {stroke: shade(cloth, .15), 'stroke-width': 8, ...cap, parent: g});   // bras
  f.line(36, -62, 4, -2, {stroke: '#5d6978', 'stroke-width': 2.4, parent: g});                          // bâton
  return g;
}

/* ---------- Verrerie et appareils de thermique (ajoutés au chapitre 5 de physique) ---------- */
// liquide en dégradé (couleur de base col)
function liquidGrad(f, col){ return f.lg(uid('lq'), [[0, tint(col, .3), .85], [.5, col, .9], [1, shade(col, .18), .92]], 0, 0, 1, 0); }
// bécher en perspective : centre du fond (cx, yb), largeur w, hauteur h ; o.level (0..1), o.liq (couleur)
// renvoie {content (groupe pour le liquide et les objets, sous les parois), front, yl (surface du liquide), rx, ry}
function beaker3D(f, parent, cx, yb, w, h, o = {}){
  const g = f.g({parent}), rx = w / 2, ry = Math.max(4, w * .1), yt = yb - h, glass = '#7d93a8';
  if (!o.noShadow) shadowEll(f, g, cx, yb + 3, rx * 1.05, ry * .7, .25);
  f.path(`M${f2(cx - rx)},${f2(yt)} L${f2(cx - rx)},${f2(yb)} A${f2(rx)},${f2(ry)} 0 0 0 ${f2(cx + rx)},${f2(yb)} L${f2(cx + rx)},${f2(yt)} Z`,
    {fill: f.lg(uid('gl'), [[0, '#ffffff', .45], [.5, '#e3f0fa', .2], [1, '#ffffff', .45]], 0, 0, 1, 0), stroke: 'none', parent: g});
  f.ell(cx, yt, rx, ry, {fill: '#eef6fc', opacity: .35, stroke: 'none', parent: g});
  const content = f.g({parent: g});
  let yl = yb;
  if (o.level){
    yl = yb - h * o.level; const c = o.liq || '#9fd3f5';
    f.path(`M${f2(cx - rx + 2)},${f2(yl)} L${f2(cx - rx + 2)},${f2(yb)} A${f2(rx - 2)},${f2(ry - 1)} 0 0 0 ${f2(cx + rx - 2)},${f2(yb)} L${f2(cx + rx - 2)},${f2(yl)} Z`, {fill: liquidGrad(f, c), stroke: 'none', parent: content});
    f.ell(cx, yl, rx - 2, ry - 1, {fill: tint(c, .4), stroke: shade(c, .2), 'stroke-width': .8, opacity: .95, parent: content});
  }
  const front = f.g({parent: g});
  f.line(cx - rx, yt, cx - rx, yb, {stroke: glass, 'stroke-width': 1.8, parent: front});
  f.line(cx + rx, yt, cx + rx, yb, {stroke: glass, 'stroke-width': 1.8, parent: front});
  f.path(`M${f2(cx - rx)},${f2(yb)} A${f2(rx)},${f2(ry)} 0 0 0 ${f2(cx + rx)},${f2(yb)}`, {stroke: glass, 'stroke-width': 1.8, fill: 'none', parent: front});
  f.ell(cx, yt, rx, ry, {fill: 'none', stroke: glass, 'stroke-width': 1.8, parent: front});
  f.path(`M${f2(cx - rx - 1)},${f2(yt)} q-7,-2 -9,-8`, {stroke: glass, 'stroke-width': 1.8, fill: 'none', parent: front});   // bec
  f.rect(cx - rx + w * .1, yt + ry + 5, Math.max(3, w * .055), h * .72, {rx: 2, fill: '#ffffff', opacity: .6, parent: front});
  if (!o.noGrad) for (let k = 1; k <= 4; k++){ const y = yb - h * k / 5; f.line(cx + rx * .5, y, cx + rx * (k % 2 ? .72 : .82), y, {stroke: '#5d7f96', 'stroke-width': 1, parent: front}); }
  return {g, content, front, yl, rx, ry, yt, yb, cx};
}
// plaque chauffante électrique : centre du bas (cx, yb), largeur w ; renvoie {g, top, glow}
function hotPlate(f, parent, cx, yb, w, o = {}){
  const g = f.g({parent}), h = o.h || 34;
  if (!o.noShadow) shadowEll(f, g, cx, yb + 2, w * .55, 5, .3);
  f.rect(cx - w / 2, yb - h, w, h, {rx: 6, fill: f.lg(uid('hp'), [[0, '#eef2f6'], [1, '#9aa7b6']]), stroke: '#5d6978', 'stroke-width': 1, parent: g});
  f.rect(cx - w / 2 + 4, yb - h - 7, w - 8, 9, {rx: 3, fill: '#2b3440', parent: g});
  const glow = f.rect(cx - w / 2 + 9, yb - h - 5, w - 18, 4, {rx: 2, fill: '#ff5a2a', opacity: 0, filter: realDefs(f).blur2, parent: g});
  f.circ(cx + w / 2 - 16, yb - h / 2, 8, {fill: f.rg(uid('kn'), [[0, '#ffffff'], [1, '#5d6978']], .35, .3, .8), stroke: '#3b4654', 'stroke-width': .8, parent: g});
  const led = f.circ(cx - w / 2 + 14, yb - h / 2, 3.2, {fill: '#7c8896', parent: g});
  const set = on => { glow.setAttribute('opacity', on ? .9 : 0); led.setAttribute('fill', on ? '#ff3b30' : '#7c8896'); };
  set(!!o.on);
  return {g, top: yb - h - 7, set};
}
// thermomètre numérique à sonde : boîtier en (x, yTop), sonde jusqu'à yTip ; renvoie le texte de l'écran
function probeThermo(f, parent, x, yTop, yTip, o = {}){
  const w = o.w || 96, h = o.h || 62, g = f.g({parent});
  f.rect(x - 2.5, yTop + h - 4, 5, yTip - (yTop + h - 4), {rx: 2.5, fill: f.lg(uid('pr'), [[0, '#7c8896'], [.4, '#e9eef3'], [1, '#5d6978']], 0, 0, 1, 0), parent: g});
  f.line(x, yTop + h + 2, x, yTop + h + 14, {stroke: '#1b2a41', 'stroke-width': 7, 'stroke-linecap': 'round', parent: g});
  return display(f, g, x - w / 2, yTop, w, h, o.title || 'θ (°C)', {noShadow: true});
}
// glaçon translucide (coin haut gauche en (x, y), côté s, angle a)
function iceCube(f, parent, x, y, s, a = 0){
  const g = f.g({parent}); g.setAttribute('transform', `translate(${f2(x)},${f2(y)}) rotate(${f2(a)})`);
  f.rect(0, 0, s, s, {rx: s * .18, fill: f.lg(uid('ic'), [[0, '#f4fbff', .95], [.6, '#c9e7f7', .85], [1, '#9fcde8', .9]]), stroke: '#8fbcd8', 'stroke-width': 1, parent: g});
  f.path(`M${f2(s * .18)},${f2(s * .25)} L${f2(s * .55)},${f2(s * .2)}`, {stroke: '#ffffff', 'stroke-width': s * .08, 'stroke-linecap': 'round', opacity: .9, parent: g});
  f.circ(s * .7, s * .62, s * .07, {fill: '#ffffff', opacity: .7, parent: g});
  return g;
}
// bloc (cylindre) métallique vu de face : centre du haut (x, y), largeur w, hauteur h, couleur col ; o.hook : fil de suspension
function metalBlock(f, parent, x, y, w, h, col = '#b8c2cc', o = {}){
  const g = f.g({parent}), ry = w * .16;
  if (o.hook) f.line(x, y - o.hook, x, y, {stroke: '#3b4654', 'stroke-width': 1.4, parent: g});
  f.path(`M${f2(x - w / 2)},${f2(y)} L${f2(x - w / 2)},${f2(y + h)} A${f2(w / 2)},${f2(ry)} 0 0 0 ${f2(x + w / 2)},${f2(y + h)} L${f2(x + w / 2)},${f2(y)} Z`,
    {fill: f.lg(uid('mb'), [[0, shade(col, .35)], [.35, tint(col, .55)], [.65, col], [1, shade(col, .45)]], 0, 0, 1, 0), stroke: shade(col, .5), 'stroke-width': .9, parent: g});
  f.ell(x, y, w / 2, ry, {fill: tint(col, .3), stroke: shade(col, .5), 'stroke-width': .9, parent: g});
  return g;
}
// calorimètre de Berthelot en coupe : centre du bas (cx, yb), largeur w, hauteur h ; o.level (0..1) du liquide
// renvoie {content (groupe dans le vase intérieur), yl (surface du liquide), xL, xR, yIn (fond intérieur), lidY, stir (agitateur), probeX}
function calorimeter(f, parent, cx, yb, w, h, o = {}){
  const g = f.g({parent}), d = realDefs(f), t = h * .0;
  if (!o.noShadow) shadowEll(f, g, cx, yb + 3, w * .55, 6, .3);
  f.rect(cx - w / 2, yb - h, w, h, {rx: 10, fill: f.lg(uid('cx'), [[0, '#5d6978'], [.3, '#c3ccd6'], [.7, '#9aa7b6'], [1, '#3b4654']], 0, 0, 1, 0), stroke: '#2b3440', 'stroke-width': 1.2, parent: g});
  const e1 = 9, e2 = w * .13;
  f.rect(cx - w / 2 + e1, yb - h + 2, w - 2 * e1, h - e1 - 2, {rx: 6, fill: f.lg(uid('is'), [[0, '#f3e3b8'], [1, '#d9c28a']]), parent: g});
  const r = rng(11); for (let i = 0; i < 70; i++) f.circ(cx - w / 2 + e1 + 2 + r() * (w - 2 * e1 - 4), yb - h + 6 + r() * (h - e1 - 10), 1 + r() * 1.6, {fill: '#c2a866', opacity: .55, parent: g});
  const xL = cx - w / 2 + e2, xR = cx + w / 2 - e2, yIn = yb - e2 * .9;
  f.rect(xL - 3, yb - h + 4, xR - xL + 6, yIn - (yb - h + 4) + 3, {rx: 4, fill: f.lg(uid('vi'), [[0, '#8a96a8'], [.4, '#f4f7fa'], [1, '#7c8896']], 0, 0, 1, 0), parent: g});
  f.rect(xL, yb - h + 4, xR - xL, yIn - (yb - h + 4), {rx: 3, fill: '#f7fbfe', parent: g});
  const content = f.g({parent: g}); let yl = yIn;
  if (o.level){ yl = yIn - (yIn - (yb - h + 4)) * o.level; f.rect(xL, yl, xR - xL, yIn - yl, {rx: 2, fill: liquidGrad(f, o.liq || '#9fd3f5'), parent: content});
    f.rect(xL, yl, xR - xL, 2.5, {fill: '#ffffff', opacity: .7, parent: content}); }
  // couvercle, agitateur, thermomètre
  const lidY = yb - h - 12;
  f.rect(cx - w / 2 - 5, lidY, w + 10, 16, {rx: 5, fill: f.lg(uid('ld'), [[0, '#3b4654'], [1, '#1b2430']]), parent: g});
  const sx = cx - (xR - xL) * .25, probeX = cx + (xR - xL) * .22;
  const stir = f.g({parent: g});
  f.rect(sx - 2, lidY - 34, 4, yIn - 10 - (lidY - 34), {fill: f.lg(uid('ag'), [[0, '#7c8896'], [.5, '#eef2f6'], [1, '#5d6978']], 0, 0, 1, 0), parent: stir});
  f.rect(sx - 9, lidY - 42, 18, 10, {rx: 4, fill: '#d62839', parent: stir});
  f.ell(sx, yIn - 12, (xR - xL) * .18, 4, {fill: 'none', stroke: '#7c8896', 'stroke-width': 3, parent: stir});
  return {g, content, yl, xL, xR, yIn, lidY, stir, probeX, sx};
}
// petits filets de vapeur au-dessus d'un point (animés par setT de phase)
function steam(f, parent, x, y, n = 3, o = {}){
  const g = f.g({parent, opacity: o.op || .7});
  const P = [...Array(n)].map((_, i) => f.path(`M${f2(x + (i - (n - 1) / 2) * (o.gap || 14))},${f2(y)} q-7,-12 0,-24 t0,-24`, {stroke: '#ffffff', 'stroke-width': 4, 'stroke-linecap': 'round', fill: 'none', filter: realDefs(f).blur2, parent: g}));
  return {g, update(t){ P.forEach((p, i) => { const k = ((t * .6 + i / n) % 1); p.setAttribute('transform', `translate(0,${f2(-k * 18)})`); p.setAttribute('opacity', f2(Math.sin(Math.PI * k))); }); }};
}

/* ---------- Ressort hélicoïdal (ajouté au chapitre 6 de physique) ---------- */
// ressort horizontal d'extrémités x1 et x2 à la hauteur y ; n spires, rayon r ; renvoie set(x1, x2)
function spring(f, parent, x1, y, x2, o = {}){
  const g = f.g({parent}), n = o.n || 12, r = o.r || 12, col = o.col || '#5d6978';
  const back = f.path('', {stroke: shade(col, .35), 'stroke-width': o.w || 2.4, fill: 'none', parent: g});
  const front = f.path('', {stroke: f.lg(uid('sp'), [[0, tint(col, .5)], [.5, col], [1, shade(col, .3)]], 0, 0, 0, 1), 'stroke-width': (o.w || 2.4) + .6, fill: 'none', 'stroke-linecap': 'round', parent: g});
  const set = (a, b) => {
    const L = b - a, e = Math.min(14, L * .08), p = (L - 2 * e) / n; let db = '', df = `M${f2(a)},${f2(y)} L${f2(a + e)},${f2(y)}`;
    for (let k = 0; k < n; k++){ const x0 = a + e + k * p;
      df += ` Q${f2(x0 + p * .25)},${f2(y - 1.6 * r)} ${f2(x0 + p * .5)},${f2(y - r * .05)}`;
      db += `M${f2(x0 + p * .5)},${f2(y - r * .05)} Q${f2(x0 + p * .75)},${f2(y + 1.6 * r)} ${f2(x0 + p)},${f2(y)} `; }
    df += ` M${f2(b - e)},${f2(y)} L${f2(b)},${f2(y)}`;
    back.setAttribute('d', db); front.setAttribute('d', df);
  };
  set(x1, x2);
  return {g, set};
}
