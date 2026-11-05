/* ===== engine.js — moteur de la présentation (scène 1600 × 900) =====
   → / espace / clic sur la flèche : réponse suivante puis diapositive suivante ; ← : précédente
   F plein écran · A tout afficher · M plan · B écran noir · T thème clair / sombre */
(function(){
  const stage = document.getElementById('stage');
  const slides = [...stage.querySelectorAll('.slide')];
  const W = 'stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  const ICON = {
    situation: `<svg viewBox="0 0 24 24"><path ${W} d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.8.6 1.1 1.3 1.1 2.2h5c0-.9.3-1.6 1.1-2.2A6 6 0 0 0 12 3z"/></svg>`,
    activite: `<svg viewBox="0 0 24 24"><circle ${W} cx="10.5" cy="10.5" r="6"/><path ${W} d="M15 15l5 5"/></svg>`,
    questions: `<svg viewBox="0 0 24 24"><path ${W} d="M9 9a3 3 0 1 1 4.2 2.8c-.8.4-1.2 1-1.2 1.9V15"/><circle cx="12" cy="18.6" r="1.3" fill="#fff"/></svg>`,
    retenir: `<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>`,
    application: `<svg viewBox="0 0 24 24"><path ${W} d="M4 20l1-4L16 5l3 3L8 19l-4 1zM14 7l3 3"/></svg>`,
    methode: `<svg viewBox="0 0 24 24"><circle ${W} cx="12" cy="12" r="3"/><path ${W} d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>`,
    quiz: `<svg viewBox="0 0 24 24"><rect ${W} x="4" y="4" width="16" height="16" rx="4"/><path ${W} d="M8 12l3 3 5-6"/></svg>`,
    exercice: `<svg viewBox="0 0 24 24"><rect ${W} x="5" y="4" width="14" height="17" rx="2"/><path ${W} d="M9 4V2.8h6V4M8.5 10h7M8.5 14h7M8.5 17.5h4"/></svg>`,
    bilan: `<svg viewBox="0 0 24 24"><circle ${W} cx="12" cy="12" r="8.5"/><path ${W} d="M8 12.3l2.7 2.7 5.3-5.6"/></svg>`,
    rappel: `<svg viewBox="0 0 24 24"><path ${W} d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4.5h4.5"/></svg>`,
  };
  const S = 'stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  const UI = {
    menu: `<svg viewBox="0 0 24 24"><path ${S} d="M5 7h14M5 12h14M5 17h14"/></svg>`,
    theme: `<svg viewBox="0 0 24 24"><path ${S} d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/></svg>`,
    full: `<svg viewBox="0 0 24 24"><path ${S} d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>`,
    prev: `<svg viewBox="0 0 24 24"><path ${S} d="M15 5l-7 7 7 7"/></svg>`,
    next: `<svg viewBox="0 0 24 24"><path ${S} d="M9 5l7 7-7 7"/></svg>`,
    pause: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7 5h3.4v14H7zM13.6 5H17v14h-3.4z"/></svg>`,
    play: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5l11 7-11 7z"/></svg>`,
    restart: `<svg viewBox="0 0 24 24"><path ${S} d="M5 12a7 7 0 1 0 2.1-5M5 4v4.5h4.5"/></svg>`,
  };

  /* ---------- en-têtes ---------- */
  slides.forEach(s => {
    if (s.classList.contains('s-title')) return;
    const k = s.dataset.kind || 'activite';
    const h = document.createElement('div'); h.className = 'shead';
    h.innerHTML = `<span class="chip k-${k}"><span class="ic">${ICON[k] || ICON.activite}</span>${s.dataset.chip || ''}</span><h2>${s.dataset.title || ''}</h2><span class="spart">${s.dataset.part || ''}</span>`;
    s.insertBefore(h, s.firstChild);
  });

  /* ---------- figures ---------- */
  const figs = [];
  stage.querySelectorAll('.fig[data-scene]').forEach(el => {
    const host = document.createElement('div'); host.className = 'host';
    el.insertBefore(host, el.firstChild);
    const ctl = document.createElement('div'); ctl.className = 'figctl';
    ctl.innerHTML = `<button type="button" title="Pause">${UI.pause}</button><button type="button" title="Recommencer">${UI.restart}</button>`;
    el.appendChild(ctl);
    const F = {el, host, api: null, t: 0, paused: false, slide: el.closest('.slide')};
    const [bp, br] = ctl.querySelectorAll('button');
    bp.onclick = e => { e.stopPropagation(); F.paused = !F.paused; bp.innerHTML = F.paused ? UI.play : UI.pause; };
    br.onclick = e => { e.stopPropagation(); F.t = 0; if (F.paused){ F.paused = false; bp.innerHTML = UI.pause; } };
    figs.push(F);
  });
  function initFig(F){
    if (F.api) return;
    const name = F.el.dataset.scene, fn = SCENES[name];
    if (!fn){ console.error('scène inconnue : ' + name); return; }
    let o = {}; try { o = F.el.dataset.opts ? JSON.parse(F.el.dataset.opts) : {}; } catch (e){ console.error(e); }
    F.api = fn(F.host, o) || {update(){}};
    F.api.update(0, 0);
  }

  /* ---------- questions, vrai / faux ---------- */
  stage.querySelectorAll('.q').forEach(q => q.addEventListener('click', () => q.classList.toggle('open')));
  stage.querySelectorAll('.vf').forEach(v => v.querySelectorAll('.vfb button').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); answerVF(v, b.dataset.v); })));
  function answerVF(v, choice){
    const good = v.dataset.answer;
    v.querySelectorAll('.vfb button').forEach(b => { b.classList.remove('good', 'bad'); if (b.dataset.v === good) b.classList.add('good'); else if (b.dataset.v === choice) b.classList.add('bad'); });
    v.classList.add('done');
  }
  function pending(s){ return [...s.querySelectorAll('.q:not(.open), .vf:not(.done)')]; }
  function revealAll(s = slides[cur]){ s.querySelectorAll('.q').forEach(q => q.classList.add('open')); s.querySelectorAll('.vf:not(.done)').forEach(v => answerVF(v, v.dataset.answer)); }

  /* ---------- ajustement du texte (toutes réponses ouvertes) ---------- */
  const fitted = new Set();
  function fitSlide(s){
    const body = s.querySelector('.sbody'); if (!body || fitted.has(s)) return;
    fitted.add(s);
    const wasActive = s.classList.contains('active');
    s.classList.add('measuring');
    let fs = 25; s.style.setProperty('--sfs', fs + 'px');
    const over = () => {
      const r = body.getBoundingClientRect(), sc = stage.getBoundingClientRect().width / 1600;
      let worst = -1e9;
      body.querySelectorAll('.q, .card, .def, .vf, .method, .rappel, .bil, .exlist li, .mtab, .qlist').forEach(e => { worst = Math.max(worst, e.getBoundingClientRect().bottom); });
      return (worst - r.bottom) / sc;
    };
    while (fs > 17 && over() > 0){ fs -= .5; s.style.setProperty('--sfs', fs + 'px'); }
    s.classList.remove('measuring');
    if (wasActive) s.classList.add('active');
  }

  /* ---------- pied de page ---------- */
  const foot = document.createElement('div'); foot.id = 'foot';
  foot.innerHTML = `<div class="grp"></div><div class="ctl"><button type="button" class="txt" data-a="all">Tout afficher</button><button type="button" data-a="menu" title="Plan (M)">${UI.menu}</button><button type="button" data-a="theme" title="Thème (T)">${UI.theme}</button><button type="button" data-a="full" title="Plein écran (F)">${UI.full}</button><button type="button" data-a="prev" title="Précédente">${UI.prev}</button><span class="cnt"></span><button type="button" data-a="next" title="Suivante (→)">${UI.next}</button></div>`;
  stage.appendChild(foot);
  const prog = document.createElement('div'); prog.id = 'prog'; stage.appendChild(prog);
  const menu = document.createElement('div'); menu.id = 'menu'; stage.appendChild(menu);
  const black = document.createElement('div'); black.id = 'black'; stage.appendChild(black);
  let mh = '<div class="box">', lastG = null;
  slides.forEach((s, i) => { const g = s.dataset.group || 'Début'; if (g !== lastG){ mh += `<h4>${g}</h4>`; lastG = g; } mh += `<a data-i="${i}">${i + 1}. ${s.dataset.menu || s.dataset.title || ''}</a>`; });
  menu.innerHTML = mh + '</div>';
  menu.addEventListener('click', e => { const a = e.target.closest('a'); if (a){ go(+a.dataset.i); menu.classList.remove('on'); } else if (e.target === menu) menu.classList.remove('on'); });
  foot.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    ({all: () => revealAll(), menu: () => menu.classList.toggle('on'), theme: () => document.body.classList.toggle('dark'),
      full: toggleFull, prev: () => go(cur - 1), next: next})[b.dataset.a]();
  });
  function toggleFull(){ if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); else document.exitFullscreen(); }

  /* ---------- navigation ---------- */
  let cur = 0;
  function go(i){
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[cur].classList.remove('active');
    cur = i; const s = slides[cur];
    fitSlide(s);
    s.classList.add('active');
    figs.filter(F => F.slide === s).forEach(initFig);
    foot.querySelector('.grp').textContent = s.dataset.group || '';
    foot.querySelector('.cnt').textContent = `${cur + 1} / ${slides.length}`;
    foot.querySelector('[data-a="all"]').style.display = s.querySelector('.q, .vf') ? '' : 'none';
    stage.classList.toggle('title-on', s.classList.contains('s-title'));
    prog.style.width = (100 * (cur + 1) / slides.length) + '%';
    menu.querySelectorAll('a').forEach(a => a.classList.toggle('cur', +a.dataset.i === cur));
    try { history.replaceState(null, '', '#' + (cur + 1)); } catch (e){}
  }
  function next(){
    const p = pending(slides[cur]);
    if (p.length){ const e = p[0]; if (e.classList.contains('q')) e.classList.add('open'); else answerVF(e, e.dataset.answer); return; }
    go(cur + 1);
  }
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key;
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'Enter'){ e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace'){ e.preventDefault(); go(cur - 1); }
    else if (k === 'Home') go(0); else if (k === 'End') go(slides.length - 1);
    else if (k === 'f' || k === 'F') toggleFull();
    else if (k === 'a' || k === 'A') revealAll();
    else if (k === 'm' || k === 'M') menu.classList.toggle('on');
    else if (k === 'b' || k === 'B' || k === '.') black.classList.toggle('on');
    else if (k === 't' || k === 'T') document.body.classList.toggle('dark');
    else if (k === 'Escape'){ menu.classList.remove('on'); black.classList.remove('on'); }
  });
  let tx = null;
  stage.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive: true});
  stage.addEventListener('touchend', e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 60){ dx < 0 ? next() : go(cur - 1); } tx = null; });

  /* ---------- mise à l'échelle ---------- */
  function fit(){
    const k = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    stage.style.transform = `scale(${k})`;
  }
  window.addEventListener('resize', fit); fit();

  /* ---------- animation ---------- */
  let last = performance.now();
  function loop(now){
    const dt = Math.min(.1, (now - last) / 1000); last = now;
    figs.forEach(F => { if (!F.api || F.slide !== slides[cur]) return; if (!F.paused) F.t += dt; try { F.api.update(F.t, dt); } catch (e){ console.error(e); } });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  const h = parseInt((location.hash || '').slice(1), 10);
  go(isNaN(h) ? 0 : h - 1);
  window.__pres = {get count(){ return slides.length; }, go, revealAll: () => revealAll(), next};
})();
