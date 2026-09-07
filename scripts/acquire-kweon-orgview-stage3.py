#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition-stage3')
OUT.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/1.0; public-route-verification)'
ROOT = 'https://skuniv.dcollection.net/common/orgView/200000508213'
MAX = 8 * 1024 * 1024

class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[str] = []
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url: str) -> tuple[dict, bytes]:
    red = Redirects()
    op = build_opener(red)
    req = Request(url, headers={'User-Agent': UA, 'Accept': 'text/html,application/pdf,*/*;q=0.5'})
    meta = {'requestedUrl': url, 'status': None, 'finalUrl': None, 'contentType': None, 'redirectChain': [], 'error': None}
    try:
        with op.open(req, timeout=30) as r:
            body = r.read(MAX)
            meta.update({
                'status': getattr(r, 'status', None),
                'finalUrl': r.geturl(),
                'contentType': r.headers.get('Content-Type'),
                'redirectChain': red.chain,
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
            })
            return meta, body
    except Exception as exc:
        meta['redirectChain'] = red.chain
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b''


def candidate_urls(src: str, base: str) -> list[str]:
    vals = set()
    for v in re.findall(r'(?:href|src)=[\"\']([^\"\']+)[\"\']', src, flags=re.I):
        vals.add(urljoin(base, v))
    for v in re.findall(r'https?://[^\s\"\'<>]+', src):
        vals.add(v.replace('&amp;', '&').rstrip(').,;'))
    for v in re.findall(r'[\"\']([^\"\']*(?:pdf|download|viewer|original|source|multiView|orgView)[^\"\']*)[\"\']', src, flags=re.I):
        if v.startswith('/') or v.startswith('http://') or v.startswith('https://'):
            vals.add(urljoin(base, v))
    result = []
    for u in vals:
        host = (urlparse(u).hostname or '').lower()
        if host.endswith('dcollection.net'):
            result.append(u)
    return sorted(set(result))


def main() -> int:
    meta, body = fetch(ROOT)
    report = {'purpose': 'exact Kweon public orgView probe; no authentication or access-control bypass', 'root': meta, 'candidates': []}
    if body:
        ctype = (meta.get('contentType') or '').lower()
        if body.startswith(b'%PDF-') or 'application/pdf' in ctype:
            (OUT / 'kweon-orgview.pdf').write_bytes(body)
            report['root']['directPdfAcquired'] = True
        else:
            src = body.decode('utf-8', errors='replace')
            (OUT / 'kweon-orgview.html.txt').write_text(src, encoding='utf-8')
            report['root']['directPdfAcquired'] = False
            report['root']['interestingLines'] = [
                {'line': n, 'text': line[:2000]}
                for n, line in enumerate(src.splitlines(), 1)
                if re.search(r'원문|저작권|동의|관내|download|pdf|viewer|source|multiView|original|로그인|login', line, re.I)
            ][:1000]
            for i, url in enumerate(candidate_urls(src, meta.get('finalUrl') or ROOT)[:80]):
                m, b = fetch(url)
                rec = {'index': i, **m, 'directPdfAcquired': False}
                if b:
                    ct = (m.get('contentType') or '').lower()
                    if b.startswith(b'%PDF-') or 'application/pdf' in ct:
                        path = OUT / f'candidate-{i:03d}.pdf'
                        path.write_bytes(b)
                        rec['directPdfAcquired'] = True
                        rec['savedAs'] = path.name
                    elif 'text' in ct or 'html' in ct or 'javascript' in ct or not ct:
                        txt = b.decode('utf-8', errors='replace')
                        path = OUT / f'candidate-{i:03d}.txt'
                        path.write_text(txt, encoding='utf-8')
                        rec['interestingLines'] = [
                            {'line': n, 'text': line[:1000]}
                            for n, line in enumerate(txt.splitlines(), 1)
                            if re.search(r'원문|저작권|동의|관내|download|pdf|viewer|source|multiView|original|로그인|login', line, re.I)
                        ][:300]
                report['candidates'].append(rec)
    (OUT / 'kweon-orgview-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    lines = [f"root status={meta.get('status')} final={meta.get('finalUrl')} type={meta.get('contentType')} pdf={report['root'].get('directPdfAcquired', False)} error={meta.get('error')}"]
    for rec in report['candidates']:
        if rec.get('directPdfAcquired') or rec.get('status') not in (200, None) or rec.get('error'):
            lines.append(f"candidate status={rec.get('status')} final={rec.get('finalUrl')} type={rec.get('contentType')} pdf={rec.get('directPdfAcquired')} error={rec.get('error')}")
    (OUT / 'kweon-orgview-summary.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print('\n'.join(lines))
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
