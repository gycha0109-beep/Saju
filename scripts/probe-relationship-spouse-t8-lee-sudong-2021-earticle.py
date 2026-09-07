#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import io
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

import pymupdf
from pypdf import PdfReader

TITLE = '명리학 육친론의 근원적 고찰'
DOI = '10.38113/jstc.2021.11.55.255'
OUT = Path('acquisition-lee-sudong-2021')
PRIVATE = Path('acquisition-lee-sudong-2021-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/8.2; public-resource-verification)'
SEARCH = 'https://www.earticle.net/Search/Result?djl=&page=8&ps=1D20&q=' + quote('이수동') + '&sf=3'
TARGET = 'https://www.earticle.net/Public/View/5/3688156'
MAX = 45 * 1024 * 1024
KEYWORDS = ('배우자','부부','남편','아내','처','妻','夫','남명','여명','재성','관성','정재','편재','정관','편관','육친','십신','성별','남녀')
ACCESS_MARKERS = ('로그인','소속기관','기관인증','구매','결제','유료','IP대역','아이디','password','accountconnect')


class RedirectRecorder(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[tuple[int, str]] = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append((code, newurl))
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def decode(data: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            pass
    return data.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 5000) -> str:
    return re.sub(r'\s+', ' ', text).strip()[:limit]


def fetch(opener, rd, url: str, referer: str | None = None) -> tuple[dict, bytes]:
    rd.chain.clear()
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/pdf,*/*;q=0.8'}
    if referer:
        headers['Referer'] = referer
    meta = {'requestedUrl': url, 'status': None, 'finalUrl': None, 'redirectChain': [], 'contentType': None, 'contentDisposition': None, 'bytes': 0, 'sha256': None, 'error': None}
    try:
        with opener.open(Request(url, headers=headers), timeout=40) as r:
            data = r.read(MAX)
            meta.update({
                'status': getattr(r, 'status', None),
                'finalUrl': r.geturl(),
                'redirectChain': rd.chain.copy(),
                'contentType': r.headers.get('Content-Type'),
                'contentDisposition': r.headers.get('Content-Disposition'),
                'bytes': len(data),
                'sha256': hashlib.sha256(data).hexdigest(),
            })
            return meta, data
    except Exception as e:
        meta['redirectChain'] = rd.chain.copy()
        meta['error'] = f'{type(e).__name__}: {e}'
        return meta, b''


def is_pdf(meta: dict, data: bytes) -> bool:
    return data.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower()


def hrefs(text: str, base: str) -> list[str]:
    out: list[str] = []
    for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', text, re.I):
        u = urljoin(base, raw.replace('&amp;', '&'))
        if u not in out:
            out.append(u)
    return out


def contexts(text: str, needles: tuple[str, ...], limit: int = 30) -> list[dict]:
    out: list[dict] = []
    low = text.lower()
    for needle in needles:
        start = 0
        while len(out) < limit:
            idx = low.find(needle.lower(), start)
            if idx < 0:
                break
            out.append({'needle': needle, 'context': compact(text[max(0, idx-900):min(len(text), idx+1800)], 3500)})
            start = idx + len(needle)
    return out


def inspect_pdf(data: bytes, source_url: str, label: str) -> dict:
    rec: dict = {
        'sourceUrl': source_url,
        'sha256': hashlib.sha256(data).hexdigest(),
        'bytes': len(data),
        'pageCount': 0,
        'encrypted': None,
        'textHealthy': False,
        'keywordHits': [],
        'renderedPages': [],
        'error': None,
    }
    try:
        reader = PdfReader(io.BytesIO(data))
        rec['pageCount'] = len(reader.pages)
        rec['encrypted'] = bool(reader.is_encrypted)
        hit_pages: set[int] = set()
        korean = 0
        for i, page in enumerate(reader.pages, 1):
            text = (page.extract_text() or '').replace('\x00', ' ')
            korean += len(re.findall(r'[가-힣]', text))
            lines = [x.strip() for x in text.splitlines() if x.strip()]
            snippets: list[str] = []
            for n, line in enumerate(lines):
                if any(k in line for k in KEYWORDS):
                    lo = max(0, n-2); hi = min(len(lines), n+3)
                    snippets.append(' / '.join(lines[lo:hi])[:1800])
            if snippets:
                hit_pages.add(i)
                rec['keywordHits'].append({'physicalPdfPage': i, 'snippets': snippets[:10]})
        rec['textHealthy'] = korean >= 150
        n = rec['pageCount']
        if n <= 3:
            targets = list(range(1, n+1))
        elif rec['textHealthy'] and hit_pages:
            targets: list[int] = []
            for p in sorted(hit_pages):
                for q in (p-1, p, p+1):
                    if 1 <= q <= n and q not in targets:
                        targets.append(q)
            targets = targets[:20]
        else:
            targets = sorted({p for p in (1,2,3,5,8,11,14,17,20,23,26,29,32,n) if 1 <= p <= n})[:14]
        doc = pymupdf.open(stream=data, filetype='pdf')
        try:
            for p in targets:
                pix = doc.load_page(p-1).get_pixmap(matrix=pymupdf.Matrix(1.25,1.25), alpha=False)
                f = OUT / f'rendered-earticle-{label}-p{p:03d}.png'
                pix.save(f)
                rec['renderedPages'].append({'physicalPdfPage':p,'file':f.name,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size})
        finally:
            doc.close()
    except Exception as e:
        rec['error'] = f'{type(e).__name__}: {e}'
    return rec


def main() -> int:
    jar = CookieJar(); rd = RedirectRecorder(); opener = build_opener(HTTPCookieProcessor(jar), rd)
    report: dict = {
        'purpose': 'exact public eArticle/NRF linked-route probe only; no login/paywall/auth bypass',
        'title': TITLE,
        'doi': DOI,
        'searchUrl': SEARCH,
        'targetViewUrl': TARGET,
        'search': {},
        'targetView': {},
        'targetSignals': [],
        'explicitPublicFulltextLinks': [],
        'accessControlObserved': False,
        'probes': [],
        'pdfs': [],
        'fullLengthPdfAcquired': False,
    }

    # Seed only the same public search session that exposed the exact target row.
    search_meta, search_data = fetch(opener, rd, SEARCH)
    report['search'] = search_meta
    search_text = decode(search_data) if search_data else ''
    assert TITLE in search_text
    assert 'Public/View/5/3688156' in search_text

    target_meta, target_data = fetch(opener, rd, TARGET, search_meta.get('finalUrl') or SEARCH)
    report['targetView'] = target_meta

    if is_pdf(target_meta, target_data):
        (PRIVATE / 'earticle-target.pdf').write_bytes(target_data)
        report['pdfs'].append(inspect_pdf(target_data, target_meta.get('finalUrl') or TARGET, 'target'))
    elif target_data:
        text = decode(target_data)
        report['targetSignals'] = contexts(text, (TITLE, DOI, '원문보기', '다운로드', '무료', 'NRF', 'file1.earticle.net', 'PDF', '로그인', '소속기관', '기관인증', '구매', '결제', 'IP대역'), 40)
        low = text.lower()
        report['accessControlObserved'] = any(m.lower() in low for m in ACCESS_MARKERS)

        # Only follow links explicitly exposed by this exact target page as original/PDF/download resources.
        # Never follow login, account-connect, purchase, or institution-auth routes.
        explicit: list[str] = []
        for u in hrefs(text, target_meta.get('finalUrl') or TARGET):
            ul = u.lower()
            if any(k in ul for k in ('login','account','connect','purchase','buy','payment','member','auth')):
                continue
            if any(k in ul for k in ('download','original','fulltext','.pdf','file1.earticle.net')):
                explicit.append(u)
        report['explicitPublicFulltextLinks'] = explicit[:12]

        if not report['accessControlObserved']:
            for idx, u in enumerate(explicit[:8], 1):
                m, b = fetch(opener, rd, u, target_meta.get('finalUrl') or TARGET)
                rec = dict(m); rec['origin'] = 'exact-target-explicit-public-fulltext-link'
                if is_pdf(m, b):
                    (PRIVATE / f'earticle-explicit-{idx:02d}.pdf').write_bytes(b)
                    report['pdfs'].append(inspect_pdf(b, m.get('finalUrl') or u, f'explicit-{idx:02d}'))
                elif b:
                    t = decode(b)
                    rec['signals'] = contexts(t, (TITLE, DOI, '로그인','소속기관','기관인증','구매','결제','IP대역','PDF','download'), 16)
                    rec['bodySample'] = compact(t, 3500)
                    if any(marker.lower() in t.lower() for marker in ACCESS_MARKERS):
                        report['accessControlObserved'] = True
                report['probes'].append(rec)
                if report['accessControlObserved']:
                    break

    report['fullLengthPdfAcquired'] = any(p.get('pageCount', 0) >= 20 for p in report['pdfs'])
    (OUT / 'earticle-route-signals.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
