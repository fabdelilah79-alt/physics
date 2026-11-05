"""Génère les icônes rondes du livre (ic_*.png) et de la fiche pédagogique (fi_*.png) : cercle coloré + pictogramme blanc.
Export PNG 256 × 256 à fond transparent (Playwright)."""
import pathlib, sys
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).resolve().parent
OUTS = [pathlib.Path(p) for p in sys.argv[1:]] or [HERE / 'out']
for o in OUTS: o.mkdir(parents=True, exist_ok=True)

S = 'stroke="#fff" stroke-width="5.2" fill="none" stroke-linecap="round" stroke-linejoin="round"'
G = {  # pictogrammes dessinés dans un carré 0..64 (centre 32, 32)
 'loupe': f'<circle {S} cx="28" cy="28" r="12"/><path {S} d="M37 37l10 10"/>',
 'question': f'<path {S} d="M24 24a8 8 0 1 1 11.3 7.3c-2 .9-3.3 2.6-3.3 4.8V38"/><circle cx="32" cy="46.5" r="3.2" fill="#fff"/>',
 'check': f'<path {S} stroke-width="6" d="M19 33l9 9 17-19"/>',
 'star': '<path fill="#fff" d="M32 13l5.9 12.2 13.4 1.9-9.7 9.4 2.3 13.3L32 43.5l-11.9 6.3 2.3-13.3-9.7-9.4 13.4-1.9z"/>',
 'crayon': f'<path {S} d="M19 46l2.5-9.5L40 18l7 7-18.5 18.5L19 46zM36 22l7 7"/>',
 'liste': f'<rect {S} x="20" y="16" width="25" height="33" rx="4"/><path {S} d="M26 16v-3h13v3M26 28h13M26 35h13M26 42h7"/>',
 'ampoule': f'<path {S} d="M26 45h12M28 50.5h8M32 14a13 13 0 0 0-8 23.3c1.7 1.3 2.4 2.8 2.4 4.7h11.2c0-1.9.7-3.4 2.4-4.7A13 13 0 0 0 32 14z"/>',
 'engrenage': f'<circle {S} cx="32" cy="32" r="7"/><path {S} d="M32 13v6M32 45v6M13 32h6M45 32h6M18.6 18.6l4.2 4.2M41.2 41.2l4.2 4.2M18.6 45.4l4.2-4.2M41.2 22.8l4.2-4.2"/>',
 'rappel': f'<path {S} d="M17 32a15 15 0 1 0 4.4-10.6M17 15v8.5h8.5"/>',
 'info': f'<circle cx="32" cy="19.5" r="3.6" fill="#fff"/><path {S} stroke-width="6" d="M32 29v17"/>',
 'cible': f'<circle {S} cx="31" cy="33" r="14"/><circle {S} cx="31" cy="33" r="6.5"/><path {S} d="M31 33l14-14M40 15l5 4-4 1z"/>',
 'reseau': f'<circle {S} cx="32" cy="18" r="5"/><circle {S} cx="18" cy="44" r="5"/><circle {S} cx="46" cy="44" r="5"/><path {S} d="M29.5 22.5l-9 17M34.5 22.5l9 17M23 44h18"/>',
 'drapeau': f'<path {S} d="M22 50V14M22 16c8-5 14 5 22 0v18c-8 5-14-5-22 0"/>',
 'marches': f'<path {S} d="M14 48h10V38h10V28h10V18h8"/><path {S} d="M14 48h38"/>',
 'boite': f'<rect {S} x="13" y="25" width="38" height="23" rx="4"/><path {S} d="M25 25v-6h14v6M13 34h38M30 34v5h4v-5"/>',
 'livre': f'<path {S} d="M32 20c-5-3-11-4-17-3v29c6-1 12 0 17 3 5-3 11-4 17-3V17c-6-1-12 0-17 3zM32 20v29"/>',
 'chemin': f'<circle {S} cx="18" cy="45" r="4"/><circle {S} cx="46" cy="19" r="4"/><path {S} d="M22 45h14a7 7 0 0 0 0-14H28a7 7 0 0 1 0-14h14"/>',
 'toque': f'<path {S} d="M10 26l22-10 22 10-22 10zM20 31v9c0 3 6 6 12 6s12-3 12-6v-9M50 28v11"/>',
 'horloge': f'<circle {S} cx="32" cy="32" r="17"/><path {S} d="M32 22v11l7 5"/>',
 'prof': f'<circle {S} cx="32" cy="23" r="8"/><path {S} d="M17 49c1.5-8 7.5-12 15-12s13.5 4 15 12"/>',
 'maison': f'<path {S} d="M14 31l18-15 18 15M19 27v21h26V27M28 48V37h8v11"/>',
 'evaluation': f'<rect {S} x="17" y="13" width="30" height="38" rx="4"/><path {S} d="M23 25l3 3 5-6M23 37l3 3 5-6M36 26h6M36 38h6"/>',
}
ICONS = {
 # livre (rubriques)
 'ic_activite': ('#0e8f8a', 'loupe'), 'ic_questions': ('#1f5fa8', 'question'), 'ic_reponses': ('#1f9d74', 'check'),
 'ic_retenir': ('#d62839', 'star'), 'ic_application': ('#6c4ab6', 'crayon'), 'ic_exercices': ('#f07f1e', 'liste'),
 'ic_situation': ('#f4a300', 'ampoule'), 'ic_methode': ('#f07f1e', 'engrenage'), 'ic_rappel': ('#6f7c8c', 'rappel'),
 'ic_savoir': ('#0b84c6', 'info'), 'ic_corrige': ('#1f9d74', 'check'),
 # fiche pédagogique
 'fi_cible': ('#d62839', 'cible'), 'fi_reseau': ('#0e8f8a', 'reseau'), 'fi_drapeau': ('#1f5fa8', 'drapeau'),
 'fi_marches': ('#1f9d74', 'marches'), 'fi_boite': ('#f07f1e', 'boite'), 'fi_livre': ('#51627a', 'livre'),
 'fi_chemin': ('#1b2a41', 'chemin'), 'fi_toque': ('#6c4ab6', 'toque'), 'fi_horloge': ('#f4a300', 'horloge'),
 'fi_prof': ('#0b84c6', 'prof'), 'fi_maison': ('#f07f1e', 'maison'), 'fi_evaluation': ('#1b2a41', 'evaluation'),
}
def mix(c, k, to=255):
    h = c.lstrip('#'); r = [int(h[i:i+2], 16) for i in (0, 2, 4)]
    return '#' + ''.join(f'{round(v + (to - v) * k):02x}' for v in r)
def svg(col, glyph):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="256" height="256">
<defs><radialGradient id="g" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="{mix(col, .28)}"/><stop offset="1" stop-color="{mix(col, .22, 0)}"/></radialGradient></defs>
<circle cx="32" cy="32" r="30.5" fill="url(#g)"/><circle cx="32" cy="32" r="28.6" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.6"/>
{G[glyph]}</svg>'''
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 300, 'height': 300})
    for name, (col, glyph) in ICONS.items():
        pg.set_content(f'<html><body style="margin:0;background:transparent">{svg(col, glyph)}</body></html>')
        el = pg.query_selector('svg')
        for o in OUTS: el.screenshot(path=str(o / f'{name}.png'), omit_background=True)
    b.close()
print(len(ICONS), 'icônes')
