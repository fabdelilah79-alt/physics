/* ===== figlib.js — petite bibliothèque SVG commune aux figures du livre et de la présentation =====
   Échelle : 60 px = 1 cm imprimé. Étiquettes Poppins, grandeurs en Pagella italique (classe .m). */
const C = {ink: '#1b2a41', ink2: '#51627a', blue: '#1f5fa8', sky: '#8ec5ff', orange: '#f07f1e', red: '#d62839', green: '#1f9d74',
  purple: '#6c4ab6', teal: '#0e8f8a', amber: '#f4a300', cyan: '#0b84c6', grey: '#8a96a8', yellow: '#ffc93c'};
const SVGNS = 'http://www.w3.org/2000/svg';
const f2 = v => (Math.round(v * 100) / 100).toString();
const fr = (v, n = 2) => (+v).toFixed(n).replace('.', ',');   // nombre à la française
const ease = x => x < 0 ? 0 : x > 1 ? 1 : 0.5 - 0.5 * Math.cos(Math.PI * x);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rad = d => d * Math.PI / 180;
// point d'un cercle (angle en degrés, sens trigonométrique, y vers le haut)
const P = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a))];
// arc de cercle de a1 à a2 (degrés, sens trigonométrique)
function arcD(cx, cy, r, a1, a2){
  const [x1, y1] = P(cx, cy, r, a1), [x2, y2] = P(cx, cy, r, a2);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0, sweep = a2 > a1 ? 0 : 1;
  return `M${f2(x1)},${f2(y1)} A${r},${r} 0 ${large} ${sweep} ${f2(x2)},${f2(y2)}`;
}
// couleurs : mélange vers le noir (shade) ou vers le blanc (tint)
function hex2rgb(h){ h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); }
function rgb2hex(r){ return '#' + r.map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join(''); }
const shade = (c, k) => rgb2hex(hex2rgb(c).map(v => v * (1 - k)));
const tint = (c, k) => rgb2hex(hex2rgb(c).map(v => v + (255 - v) * k));

/* Écriture mathématique dans les figures : M('z_A'), M('G_{AB}'), M('V^2'), M('AB = 2,0 \\m')
   lettres en italique ; \x = lettre droite (unités) ; chiffres et symboles droits ; _ indice ; ^ exposant. */
function M(s, size = 23){
  const esc = c => c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : c;
  const isL = c => /[A-Za-zα-ωΑ-Ωϑϕ]/.test(c);
  let out = '', i = 0, pend = 0;   // pend : décalage vertical à rattraper
  const run = (txt, o = {}) => {
    let a = '';
    if (o.it === false) a += ' font-style="normal"';
    if (o.dy || pend) a += ` dy="${f2((o.dy || 0) + pend)}"`;
    if (o.fs) a += ` style="font-size:${f2(o.fs)}px"`;
    pend = 0;
    out += `<tspan${a}>${txt}</tspan>`;
  };
  const grp = () => { if (s[i] === '{'){ let d = 0, j = i; for (; j < s.length; j++){ if (s[j] === '{') d++; else if (s[j] === '}'){ d--; if (!d) break; } } const g = s.slice(i + 1, j); i = j + 1; return g; } return s[i++]; };
  const script = (g, dy) => {
    const fs = size * 0.68; let k = 0, first = true;
    while (k < g.length){
      let c = g[k], up = false;
      if (c === '\\'){ up = true; c = g[++k]; }
      run(esc(c), {it: up || !isL(c) ? false : undefined, dy: first ? dy : 0, fs}); first = false; k++;
    }
    pend = -dy;
  };
  while (i < s.length){
    const c = s[i];
    if (c === '_'){ i++; script(grp(), size * 0.24); continue; }
    if (c === '^'){ i++; script(grp(), -size * 0.38); continue; }
    if (c === '\\'){ run(esc(s[i + 1]), {it: false}); i += 2; continue; }
    if (isL(c)){ let j = i; while (j < s.length && isL(s[j])) j++; run(s.slice(i, j)); i = j; continue; }
    let j = i; while (j < s.length && !isL(s[j]) && !'_^\\'.includes(s[j])) j++;
    run(s.slice(i, j).split('').map(esc).join(''), {it: false}); i = j;
  }
  if (pend) out += `<tspan dy="${f2(pend)}"></tspan>`;
  return out;
}

let FIGN = 0;
class Fig {
  constructor(host, w, h, o = {}){
    this.w = w; this.h = h; this.pid = 'f' + (++FIGN) + '_';
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('class', 'fig-svg');
    svg.setAttribute('preserveAspectRatio', o.par || 'xMidYMid meet');
    if (o.label){ svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', o.label); }
    host.appendChild(svg);
    this.svg = svg;
    this.defs = this.el('defs', {});
    this._mk = {};
  }
  _p(o){ const p = o.parent; delete o.parent; return p || this.svg; }
  el(tag, attrs = {}, parent = this.svg){
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attrs){ const v = attrs[k]; if (v === undefined || v === null) continue; e.setAttribute(k, typeof v === 'number' ? f2(v) : v); }
    parent.appendChild(e);
    return e;
  }
  set(e, attrs){ for (const k in attrs) e.setAttribute(k, typeof attrs[k] === 'number' ? f2(attrs[k]) : attrs[k]); return e; }
  g(o = {}){ o = Object.assign({}, o); const p = this._p(o); return this.el('g', o, p); }
  line(x1, y1, x2, y2, o = {}){ o = Object.assign({}, o); const p = this._p(o);
    return this.el('line', Object.assign({x1, y1, x2, y2, stroke: C.ink, 'stroke-width': 2, 'stroke-linecap': 'round'}, o), p); }
  path(d, o = {}){ o = Object.assign({}, o); const p = this._p(o);
    return this.el('path', Object.assign({d, fill: 'none', stroke: C.ink, 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}, o), p); }
  circ(cx, cy, r, o = {}){ o = Object.assign({}, o); const p = this._p(o);
    return this.el('circle', Object.assign({cx, cy, r, fill: 'none', stroke: C.ink, 'stroke-width': 2}, o), p); }
  rect(x, y, w, h, o = {}){ o = Object.assign({}, o); const p = this._p(o); return this.el('rect', Object.assign({x, y, width: w, height: h}, o), p); }
  ell(cx, cy, rx, ry, o = {}){ o = Object.assign({}, o); const p = this._p(o); return this.el('ellipse', Object.assign({cx, cy, rx, ry}, o), p); }
  poly(pts, o = {}){ o = Object.assign({}, o); const p = this._p(o); return this.el('polygon', Object.assign({points: pts.map(q => q.map(f2).join(',')).join(' ')}, o), p); }
  dot(x, y, o = {}){ o = Object.assign({r: 4.5, fill: C.ink, stroke: 'none'}, o); const p = this._p(o); const r = o.r; delete o.r; return this.el('circle', Object.assign({cx: x, cy: y, r}, o), p); }
  // texte : html (peut contenir les <tspan> produits par M()) ; o : cls, anchor, size, fill, weight, parent, style
  T(x, y, html, o = {}){
    o = Object.assign({}, o); const p = this._p(o);
    const a = {x, y, class: o.cls || 'lbl', 'text-anchor': o.anchor || 'start'};
    let st = o.style || '';
    if (o.size) st += `font-size:${o.size}px;`;
    if (o.fill){ a.fill = o.fill; st += `fill:${o.fill};`; }
    if (o.weight) st += `font-weight:${o.weight};`;
    if (st) a.style = st;
    if (o.transform) a.transform = o.transform;
    if (o.opacity !== undefined) a.opacity = o.opacity;
    const t = this.el('text', a, p);
    t.innerHTML = html;
    return t;
  }
  TM(x, y, s, o = {}){ return this.T(x, y, M(s, o.size || 23), Object.assign({cls: 'm'}, o)); }
  // dégradés et découpes (identifiants préfixés : plusieurs figures par page)
  lg(id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1){
    const gid = this.pid + id;
    if (!this.svg.querySelector('#' + gid)){
      const g = this.el('linearGradient', {id: gid, x1, y1, x2, y2}, this.defs);
      stops.forEach(s => this.el('stop', {offset: s[0], 'stop-color': s[1], 'stop-opacity': s[2] === undefined ? 1 : s[2]}, g));
    }
    return `url(#${gid})`;
  }
  rg(id, stops, cx = .5, cy = .5, r = .5, fx, fy){
    const gid = this.pid + id;
    if (!this.svg.querySelector('#' + gid)){
      const g = this.el('radialGradient', {id: gid, cx, cy, r, fx: fx === undefined ? cx : fx, fy: fy === undefined ? cy : fy}, this.defs);
      stops.forEach(s => this.el('stop', {offset: s[0], 'stop-color': s[1], 'stop-opacity': s[2] === undefined ? 1 : s[2]}, g));
    }
    return `url(#${gid})`;
  }
  clip(id, build){
    const gid = this.pid + id;
    const c = this.el('clipPath', {id: gid}, this.defs); build(c);
    return `url(#${gid})`;
  }
  // pointes de flèche
  mk(name){
    if (this._mk[name]) return this._mk[name];
    const cols = {red: C.red, blue: C.blue, green: C.green, orange: C.orange, ink: C.ink, purple: C.purple, ink2: C.ink2, white: '#ffffff',
      'big-red': '#ff6b7a', teal: C.teal, amber: C.amber, cyan: C.cyan, grey: C.grey};
    const big = name.startsWith('big');
    const id = this.pid + 'mk_' + name;
    const m = this.el('marker', {id, viewBox: '0 0 10 10', refX: 8.6, refY: 5, markerWidth: big ? 4.2 : 5.2, markerHeight: big ? 4.2 : 5.2, orient: 'auto-start-reverse', markerUnits: 'strokeWidth'}, this.defs);
    this.el('path', {d: 'M0,0.6 L10,5 L0,9.4 L2.6,5 Z', fill: cols[name] || C.ink}, m);
    return (this._mk[name] = `url(#${id})`);
  }
  // arc d'angle (degrés, sens trigonométrique) de a1 à a2
  angleArc(cx, cy, r, a1, a2, color = C.green, o = {}){
    o = Object.assign({}, o); const p = this._p(o);
    const a = {d: arcD(cx, cy, r, a1, a2), fill: 'none', stroke: color, 'stroke-width': o.w || 2.2, 'stroke-linecap': 'round'};
    if (!o.noArrow) a['marker-end'] = this.mk({[C.green]: 'green', [C.red]: 'red', [C.blue]: 'blue', [C.orange]: 'orange', [C.purple]: 'purple'}[color] || 'ink');
    return this.el('path', a, p);
  }
  // fond de « document » arrondi + découpe : renvoie le groupe découpé
  card(fill){
    const cp = this.clip('card', c => this.el('rect', {x: 0, y: 0, width: this.w, height: this.h, rx: 16}, c));
    const g = this.el('g', {'clip-path': cp});
    this.el('rect', {x: 0, y: 0, width: this.w, height: this.h, fill: fill || '#f6f9fd'}, g);
    return g;
  }
  frame(){ this.el('rect', {x: .75, y: .75, width: this.w - 1.5, height: this.h - 1.5, rx: 16, fill: 'none', stroke: '#c9d6e6', 'stroke-width': 1.5}); }
}
