"""Exporte les figures du livre depuis les scènes de la présentation (état figé o.book).
PNG ×4 à fond transparent (60 px = 1 cm imprimé), bandeau d'ouverture en JPEG."""
import json, pathlib, sys
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / 'images'
# Liste des figures du chapitre : (nom du fichier, scène, options). Exemple du chapitre 3 de physique.
FIGS = [  # nom de fichier, scène, options
 ('doc1_thermoplongeurs', 'thermoplongeur', {'exp': 1}), ('doc3_eau_fer', 'thermoplongeur', {'exp': 3}), ('fig_transfert', 'transfert', {}),
 ('doc4_calorimetre', 'calorimetre', {'labels': 1, 'mode': 'eau', 'th0': 16.5}), ('app2_fer_cuivre', 'calorimetre', {'mode': 'deux', 'th0': 18}),
 ('doc5_courbe', 'courbeGlace', {}), ('fig_courbe', 'courbeGlace', {'labels': 1}), ('doc6_glacon', 'calorimetre', {'mode': 'glace', 'th0': 24}),
 ('app3_fusion', 'fusionPartielle', {}),
 ('doc7_cloche', 'cloche', {}), ('fig_modes', 'modes', {}), ('app4_panneau', 'panneauSolaire', {}),
 ('ex2_courbe', 'courbeQ', {}), ('ex3_balle', 'balle', {}),
]
PRES = HERE.parent.parent / 'pres' / 'src'
CSS = (HERE / 'book_style.css').read_text()
scripts = ''.join(f'<script src="{(PRES / n).as_uri()}"></script>' for n in ['figlib.js', 'realisme.js'] + sorted(p.name for p in PRES.glob('scenes_*.js')))
(HERE / 'book.html').write_text(f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>{CSS}</style>{scripts}</head>
<body><div id="host"></div><script>
window.renderScene = async (name, opts, w) => {{
  await document.fonts.ready;
  const host = document.getElementById('host'); host.innerHTML = '';
  const sc = SCENES[name](host, Object.assign({{book: true}}, opts || {{}}));
  const svg = host.querySelector('svg'); const vb = svg.viewBox.baseVal;
  svg.setAttribute('width', w || vb.width); svg.setAttribute('height', (w || vb.width) * vb.height / vb.width);
  sc.update(0, 0); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); sc.update(0, 0);
}};
</script></body></html>''')
only = sys.argv[1:]
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(device_scale_factor=4, viewport={'width': 1400, 'height': 900})
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.goto((HERE / 'book.html').as_uri()); pg.wait_for_timeout(300)
    for fn, scene, opts in FIGS:
        if only and fn not in only and 'opener' not in only: continue
        if only and fn not in only: continue
        pg.evaluate('([n, o]) => window.renderScene(n, o)', [scene, opts])
        pg.wait_for_timeout(120)
        pg.query_selector('#host svg').screenshot(path=str(OUT / f'{fn}.png'), omit_background=True)
        print('ok', fn)
    if not only or 'opener' in only:
        pg.set_viewport_size({'width': 1260, 'height': 660})
        pg2 = b.new_page(device_scale_factor=2, viewport={'width': 1260, 'height': 660})
        pg2.goto((HERE / 'book.html').as_uri()); pg2.wait_for_timeout(300)
        pg2.evaluate('() => window.renderScene("titre", {W: 1260, H: 660})')
        pg2.wait_for_timeout(150)
        pg2.query_selector('#host svg').screenshot(path=str(OUT / 'opener.jpg'), type='jpeg', quality=92)
        print('ok opener')
    print('errors:', errs)
    b.close()
