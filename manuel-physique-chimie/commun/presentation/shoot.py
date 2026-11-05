"""Captures de contrôle : chaque diapositive, toutes réponses ouvertes ; signale les débordements et la taille du texte."""
import sys, pathlib
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / 'captures'; OUT.mkdir(exist_ok=True, parents=True)
only = [int(x) for x in sys.argv[1:]]
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1600, 'height': 900})
    errs = []
    pg.on('pageerror', lambda e: errs.append('PAGEERR ' + str(e)))
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.goto(sorted((ROOT / 'dist').glob('*.html'))[0].resolve().as_uri())
    pg.wait_for_timeout(800)
    n = pg.evaluate('window.__pres.count')
    for i in range(n):
        if only and (i + 1) not in only: continue
        pg.evaluate(f'window.__pres.go({i})')
        pg.wait_for_timeout(1500)
        pg.evaluate('window.__pres.revealAll()')
        pg.wait_for_timeout(500)
        pg.screenshot(path=str(OUT / f's{i+1:02d}.png'))
        ov = pg.evaluate('''() => { const s = document.querySelectorAll('.slide')[%d]; const b = s.querySelector('.sbody'); if(!b) return null;
             const r = b.getBoundingClientRect(); let worst = 0; b.querySelectorAll('*').forEach(e => { const q = e.getBoundingClientRect(); if (q.height>0) worst = Math.max(worst, q.bottom - r.bottom); }); return Math.round(worst); }''' % i)
        fs = pg.evaluate("document.querySelectorAll('.slide')[%d].style.getPropertyValue('--sfs')" % i)
        print(f'slide {i+1}: overflow {ov} fs {fs}')
    print('errors:', errs[:10])
    b.close()
