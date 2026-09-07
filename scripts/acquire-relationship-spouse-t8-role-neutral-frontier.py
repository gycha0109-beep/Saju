#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition-role-neutral-frontier')
PRIVATE = Path('acquisition-role-neutral-frontier-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)

UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/2.0; public-resource-verification)'
MAX_TEXT = 6 * 1024 * 1024
MAX_PDF = 40 * 1024 * 1024
ALLOWED = ('riss.kr', 'data.riss.kr', 'dcollection.net')

TARGETS = {
    'song-jaewoo-2023': {
        'title': '명리학 육친론 비교연구 : (연해자평, 적천수, 궁통보감을 중심으로)',
        'riss_id': 'T16680125',
        'uci': 'I804:44032-200000668457',
        'lod': 'https://data.riss.kr/resource/Thesis/000016680125',
        'riss_detail': 'https://www.riss.kr/search/detail/DetailView.do?control_no=105b810f6d2f3decffe0bdc3ef48d419&p_mat_type=be54d9b8bc7cdb09',
        'target_phrases': ['육친 활용 제안', '실질적인 역할', '성별이나 가계도', '남편', '아내'],
        'printed_targets': [57, 58, 59, 60, 61, 62],
    },
    'jung-sua-2025': {
        'title': '명리학의 궁성(宮星)에 관한 연구',
        'riss_id': 'T17210085',
        'uci': None,
        'lod': 'https://data.riss.kr/resource/Thesis/000017210085',
        'riss_detail': 'https://www.riss.kr/search/Search.do?isDetailSearch=N&searchGubun=true&viewYn=OP&query=' + quote('명리학의 궁성(宮星)에 관한 연구 정수아'),
        'target_phrases': ['財星', '官星', '배우자', '남편', '아내', '현대', '사회적 관계'],
        'printed_targets': [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 92],
    },
}

class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[str] = []
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return any(host == d or host.endswith('.' + d) for d in ALLOWED)


def fetch(url: str, max_bytes: int = MAX_TEXT) -> dict:
    tracker = Redirects()
    opener = build_opener(tracker)
    req = Request(url, headers={'User-Agent': UA, 'Accept': 'text/html,application/pdf,application/ld+json,application/rdf+xml,*/*;q=0.5'})
    result = {'requestedUrl': url, 'redirectChain': [], 'status': None, 'finalUrl': None, 'contentType': None, 'bodyBytes': 0, 'sha256': None, 'error': None, 'body': b''}
    try:
        with opener.open(req, timeout=35) as resp:
            ctype = resp.headers.get('Content-Type') or ''
            limit = MAX_PDF if 'pdf' in ctype.lower() else max_bytes
            body = resp.read(limit + 1)
            if len(body) > limit:
                body = body[:limit]
            result.update({
                'redirectChain': tracker.chain,
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'contentType': ctype,
                'bodyBytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'body': body,
            })
    except Exception as exc:
        result['redirectChain'] = tracker.chain
        result['error'] = f'{type(exc).__name__}: {exc}'
    return result


def is_pdf(result: dict) -> bool:
    return 'pdf' in (result.get('contentType') or '').lower() or (result.get('body') or b'').startswith(b'%PDF-')


def text(body: bytes) -> str:
    return body.decode('utf-8', errors='replace')


def extract_links(html: str, base: str) -> set[str]:
    out: set[str] = set()
    for raw in re.findall(r'https?://[^\s"\'<>]+', html):
        out.add(raw.replace('&amp;', '&').rstrip(').,;'))
    for raw in re.findall(r'(?:href|src)=["\']([^"\']+)["\']', html, flags=re.I):
        out.add(urljoin(base, raw.replace('&amp;', '&')))
    # dCollection commonly exposes item ids through JS orgView('...') rather than hrefs.
    for item_id in re.findall(r'orgView\s*\(\s*["\']?([0-9A-Za-z_-]+)', html, flags=re.I):
        p = urlparse(base)
        if p.hostname and p.hostname.endswith('dcollection.net'):
            out.add(f'{p.scheme}://{p.netloc}/common/orgView/{item_id}')
    # If we have a srchDetail item, probe the canonical common/orgView route too.
    for item_id in re.findall(r'/srch/srchDetail/([0-9A-Za-z_-]+)', html):
        p = urlparse(base)
        if p.hostname and p.hostname.endswith('dcollection.net'):
            out.add(f'{p.scheme}://{p.netloc}/common/orgView/{item_id}')
    return {u for u in out if allowed(u)}


def inspect_pdf(key: str, pdf: bytes, source_url: str, cfg: dict, report: dict) -> None:
    path = PRIVATE / f'{key}.pdf'
    path.write_bytes(pdf)
    report['pdfAcquired'] = True
    report['pdfSourceUrl'] = source_url
    report['pdfSha256'] = hashlib.sha256(pdf).hexdigest()
    report['pdfBytes'] = len(pdf)
    try:
        info = subprocess.run(['pdfinfo', str(path)], check=True, capture_output=True, text=True).stdout
        report['pdfInfo'] = info
        m = re.search(r'^Pages:\s*(\d+)', info, flags=re.M)
        report['pdfPageCount'] = int(m.group(1)) if m else None
    except Exception as exc:
        report['pdfInfoError'] = f'{type(exc).__name__}: {exc}'

    txt = PRIVATE / f'{key}.txt'
    try:
        subprocess.run(['pdftotext', '-layout', str(path), str(txt)], check=True, capture_output=True, text=True)
        pages = txt.read_text(encoding='utf-8', errors='replace').split('\f')
    except Exception as exc:
        report['pdfTextError'] = f'{type(exc).__name__}: {exc}'
        return

    matches = []
    outdir = OUT / f'{key}-matched-pages'
    outdir.mkdir(exist_ok=True)
    for physical, page in enumerate(pages, 1):
        normalized = page.replace(' ', '')
        hit = [p for p in cfg['target_phrases'] if p.replace(' ', '') in normalized]
        if not hit:
            continue
        # Save only bounded text and rendered page for inspection, not full PDF text.
        (outdir / f'physical-{physical:03d}.txt').write_text(page[:9000], encoding='utf-8')
        prefix = outdir / f'physical-{physical:03d}'
        try:
            subprocess.run(['pdftoppm', '-f', str(physical), '-l', str(physical), '-png', '-r', '150', str(path), str(prefix)], check=True, capture_output=True, text=True)
        except Exception:
            pass
        matches.append({'physicalPage': physical, 'phrases': hit})
    report['phraseMatches'] = matches


def probe(key: str, cfg: dict) -> dict:
    report = {
        'title': cfg['title'], 'rissId': cfg['riss_id'], 'uci': cfg['uci'],
        'pdfAcquired': False, 'probes': [], 'discoveredUrls': [], 'phraseMatches': [],
    }
    queue = [cfg['lod'], cfg['riss_detail']]
    seen: set[str] = set()
    discovered: set[str] = set()
    while queue and len(seen) < 80 and not report['pdfAcquired']:
        url = queue.pop(0)
        if url in seen or not allowed(url):
            continue
        seen.add(url)
        result = fetch(url)
        body = result.pop('body', b'')
        report['probes'].append(result)
        result['body'] = body
        if is_pdf(result):
            inspect_pdf(key, body, result.get('finalUrl') or url, cfg, report)
            break
        if not body:
            continue
        html = text(body)
        base = result.get('finalUrl') or url
        links = extract_links(html, base)
        # Public PDF paths are sometimes embedded in JS/HTML without quotes useful to href regex.
        for raw in re.findall(r'https?://[^\s"\'<>]*public_resource/pdf/[^\s"\'<>]+', html):
            if allowed(raw):
                links.add(raw)
        for u in sorted(links):
            if u not in discovered:
                discovered.add(u)
                if len(discovered) <= 70:
                    queue.append(u)
    report['discoveredUrls'] = sorted(discovered)
    return report


def main() -> int:
    aggregate = {'purpose': 'public fulltext acquisition only; no access-control bypass', 'authorityEffect': 'NONE_UNTIL_DIRECT_BODY_REVIEW', 'targets': {}}
    for key, cfg in TARGETS.items():
        aggregate['targets'][key] = probe(key, cfg)
    (OUT / 'report.json').write_text(json.dumps(aggregate, ensure_ascii=False, indent=2), encoding='utf-8')
    lines = []
    for key, r in aggregate['targets'].items():
        lines.append(f'[{key}] pdf={r["pdfAcquired"]} probes={len(r["probes"])} discovered={len(r["discoveredUrls"])} matches={len(r["phraseMatches"])} sha={r.get("pdfSha256")}')
        for p in r['probes']:
            lines.append(f'  {p["requestedUrl"]} -> {p["status"]} {p["finalUrl"]} {p["contentType"]} err={p["error"]}')
    (OUT / 'summary.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print('\n'.join(lines))
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
