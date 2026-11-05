"""Assemble la présentation en un seul fichier HTML autonome (hors ligne).
- dist/<fichier>.html (titre et nom dans presentation.json)
Les formules sont écrites entre $...$ dans src/slides.html et converties ici en HTML :
\\frac{}{}, \\vec{}, \\arc{}, \\sqrt{}, \\u{} (texte droit : unités, cos, sin), _ indice, ^ exposant."""
import base64, re, pathlib, json

ROOT = pathlib.Path(__file__).resolve().parent
SRC, DIST, FONTS = ROOT / "src", ROOT / "dist", ROOT / "fonts"
DIST.mkdir(exist_ok=True)

OPS = set("=≈+−×→⇒<>≤≥⟹")
LOWER_GREEK = set("αβγδεζηθικλμνξοπρστυφχψωϑϕ")

def group(s, i):
    assert s[i] == "{", s[i:i+20]
    d = 0
    for j in range(i, len(s)):
        if s[j] == "{": d += 1
        elif s[j] == "}":
            d -= 1
            if d == 0: return s[i+1:j], j + 1
    raise ValueError("accolade non fermée : " + s)

def math(s, up=False):
    out, i, buf = [], 0, ""
    def flush():
        nonlocal buf
        if buf:
            out.append(buf if up else f"<var>{buf}</var>")
            buf = ""
    while i < len(s):
        c = s[i]
        if c.isascii() and c.isalpha() or c in LOWER_GREEK:
            buf += c; i += 1; continue
        flush()
        if c == "\\":
            m = re.match(r"\\([a-zA-Z]+)", s[i:]); cmd = m.group(1); i += len(m.group(0))
            if cmd == "frac":
                a, i = group(s, i); b, i = group(s, i)
                out.append(f'<span class="frac"><span>{math(a, up)}</span><span>{math(b, up)}</span></span>')
            elif cmd in ("arc", "vec"):
                a, i = group(s, i); out.append(f'<span class="{cmd}">{math(a, up)}</span>')
            elif cmd == "sqrt":
                a, i = group(s, i); out.append(f'<span class="sqrt"><span class="rad">√</span><span class="radicand">{math(a, up)}</span></span>')
            elif cmd == "u":
                a, i = group(s, i); out.append(f'<span class="unit">{math(a, True)}</span>')
            else:
                raise ValueError("commande inconnue \\" + cmd)
        elif c in "_^":
            i += 1
            if s[i] == "{": a, i = group(s, i)
            else: a, i = s[i], i + 1
            tag = "sub" if c == "_" else "sup"
            out.append(f"<{tag}>{math(a, up)}</{tag}>")
        elif c == "~":
            out.append("&nbsp;"); i += 1
        elif c == " ":
            if i > 0 and s[i-1] in ",;": out.append(" ")
            i += 1
        elif c in OPS:
            out.append(f'<span class="op">{ {"<": "&lt;", ">": "&gt;"}.get(c, c)}</span>'); i += 1
        elif c == "·":
            out.append('<span class="dot">·</span>'); i += 1
        else:
            out.append(c); i += 1
    flush()
    return "".join(out)

def convert(html):
    return re.sub(r"\$(.+?)\$", lambda m: f'<span class="eq">{math(m.group(1))}</span>', html, flags=re.S)

def b64(p): return base64.b64encode(p.read_bytes()).decode()

faces = []
for fam, file, weight, style in [
    ("PoppinsE", "Poppins-Regular.woff", 400, "normal"), ("PoppinsE", "Poppins-Medium.woff", 500, "normal"),
    ("PoppinsE", "Poppins-Bold.woff", 700, "normal"),
    ("PagellaE", "Pagella-regular.woff", 400, "normal"), ("PagellaE", "Pagella-italic.woff", 400, "italic"),
    ("PagellaE", "Pagella-bold.woff", 700, "normal")]:
    faces.append(f"@font-face{{font-family:'{fam}';src:url(data:font/woff;base64,{b64(FONTS / file)}) format('woff');"
                 f"font-weight:{weight};font-style:{style};font-display:block}}")
css = "\n".join(faces) + "\n" + (SRC / "style.css").read_text()
slides = convert((SRC / "slides.html").read_text())
CFG = json.loads((ROOT / "presentation.json").read_text())
scenes = sorted(p.name for p in SRC.glob("scenes_*.js"))
js = "\n".join((SRC / f).read_text() for f in ["figlib.js", "realisme.js", *scenes, "engine.js"])

full = f"""<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{CFG["titre"]}</title>
<style>
{css}
</style>
</head><body>
<div id="viewport"><div id="stage">
{slides}
</div></div>
<script>
{js}
</script>
</body></html>
"""
(DIST / (CFG["fichier"] + ".html")).write_text(full)
print("ok", len(full) // 1024, "Ko")
