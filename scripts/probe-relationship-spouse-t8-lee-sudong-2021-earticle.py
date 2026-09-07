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

from pypdf import PdfReader

TITLE = '명리학 육친론의 근원적 고찰'
DOI = '10.38113/jstc.2021.11.55.255'
OUT = Path('acquisition-lee-sudong-2021')
OUT.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/8.1; public-resource-verification)'
SEARCH = 'https://www.earticle.net/Search/Result?djl=&page=8&ps=1D20&q=' + quote('이수동') + '&sf=3'
MAX = 12 * 1024 * 1024


class RedirectRecorder(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain = []

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


def compact(text: str, limit: int = 7000) -> str:
    return re.sub(r'\s+', ' ', text).strip()[:limit]


def fetch(opener, rd, url: str, referer: str | None = None) -> tuple[dict, bytes]:
    rd.chain.clear()
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/pdf,*/*;q=0.8'}
    if referer:
        headers['Referer'] = referer
    meta = {'requestedUrl': url, 'status': None, 'finalUrl': None, 'redirectChain': [], 'contentType': None, 'bytes': 0, 'sha256': None, 'error': None}
    try:
        with opener.open(Request(url, headers=headers), timeout=35) as r:
            data = r.read(MAX)
            meta.update({
                'status': getattr(r, 'status', None),
                'finalUrl': r.geturl(),
                'redirectChain': rd.chain.copy(),
                'contentType': r.headers.get('Content-Type'),
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
    out = []
    for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', text, re.I):
        u = urljoin(base, raw.replace('&amp;', '&'))
        if u not in out:
            out.append(u)
    return out


def main() -> int:
    jar = CookieJar()
    rd = RedirectRecorder()
    opener = build_opener(HTTPCookieProcessor(jar), rd)
    report: dict = {
        'purpose': 'public eArticle/NRF linked-route probe only; no login/paywall/auth bypass',
        'title': TITLE,
        'doi': DOI,
        'searchUrl': SEARCH,
        'search': {},
        'titleContexts': [],
        'candidateLinks': [],
        'probes': [],
        'pdfs': [],
        'fullLengthPdfAcquired': False,
    }

    meta, data = fetch(opener, rd, SEARCH)
    report['search'] = meta
    if not data:
        (OUT / 'earticle-route-signals.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return 0

    text = decode(data)
    low = text.lower()
    for needle in (TITLE, DOI, '원문보기'):
        start = 0
        while len(report['titleContexts']) < 16:
            idx = low.find(needle.lower(), start)
            if idx < 0:
                break
            report['titleContexts'].append({'needle': needle, 'context': compact(text[max(0, idx-2200): min(len(text), idx+3200)])})
            start = idx + len(needle)

    links = hrefs(text, meta.get('finalUrl') or SEARCH)
    candidate: list[str] = []
    for u in links:
        ul = u.lower()
        if urlparse(u).netloc.endswith('earticle.net') and any(k in ul for k in ('article', 'detail', 'view', 'original', 'download', 'paper', 'search')):
            candidate.append(u)
    # Also derive hrefs from the immediate source neighborhood around the exact title.
    idx = text.find(TITLE)
    if idx >= 0:
        for u in hrefs(text[max(0, idx-5000): min(len(text), idx+7000)], meta.get('finalUrl') or SEARCH):
            if urlparse(u).netloc.endswith('earticle.net') and u not in candidate:
                candidate.append(u)
    # Skip the current search URL and cap public exploration.
    candidate = [u for u in candidate if u != SEARCH][:24]
    report['candidateLinks'] = candidate

    for u in candidate:
        m, b = fetch(opener, rd, u, meta.get('finalUrl') or SEARCH)
        rec = dict(m)
        if is_pdf(m, b):
            try:
                reader = PdfReader(io.BytesIO(b))
                pdf = {
                    'sourceUrl': m.get('finalUrl') or u,
                    'sha256': hashlib.sha256(b).hexdigest(),
                    'bytes': len(b),
                    'pageCount': len(reader.pages),
                    'encrypted': bool(reader.is_encrypted),
                }
                report['pdfs'].append(pdf)
            except Exception as e:
                rec['pdfInspectError'] = f'{type(e).__name__}: {e}'
        elif b:
            t = decode(b)
            hits = []
            for needle in (TITLE, DOI, '원문보기', '무료', 'NRF', 'KCI', 'download', 'pdf'):
                j = t.lower().find(needle.lower())
                if j >= 0:
                    hits.append({'needle': needle, 'context': compact(t[max(0, j-900):min(len(t), j+1800)], 3500)})
            rec['signals'] = hits[:16]
            # Only one extra hop for explicit public fulltext-looking links on a target-bearing detail page.
            if TITLE in t or DOI in t:
                for v in hrefs(t, m.get('finalUrl') or u):
                    vl = v.lower()
                    if any(k in vl for k in ('download', 'original', 'fulltext', '.pdf')) and v not in candidate and len(report['probes']) < 30:
                        mm, bb = fetch(opener, rd, v, m.get('finalUrl') or u)
                        rr = dict(mm)
                        rr['origin'] = 'detail-explicit-fulltext-link'
                        if is_pdf(mm, bb):
                            try:
                                reader = PdfReader(io.BytesIO(bb))
                                report['pdfs'].append({
                                    'sourceUrl': mm.get('finalUrl') or v,
                                    'sha256': hashlib.sha256(bb).hexdigest(),
                                    'bytes': len(bb),
                                    'pageCount': len(reader.pages),
                                    'encrypted': bool(reader.is_encrypted),
                                })
                            except Exception as e:
                                rr['pdfInspectError'] = f'{type(e).__name__}: {e}'
                        elif bb:
                            rr['bodySample'] = compact(decode(bb), 3500)
                        report['probes'].append(rr)
        report['probes'].append(rec)
        if len(report['probes']) >= 30:
            break

    report['fullLengthPdfAcquired'] = any(p.get('pageCount', 0) >= 20 for p in report['pdfs'])
    (OUT / 'earticle-route-signals.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
