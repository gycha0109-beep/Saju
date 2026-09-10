#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import parse_qs, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition-go-jaemin-2016')
OUT.mkdir(exist_ok=True)

DETAIL = 'https://www.riss.kr/search/detail/DetailView.do?control_no=01535e75dd09ae73ffe0bdc3ef48d419&p_mat_type=be54d9b8bc7cdb09'
EXPECTED_TITLE = '四柱命理의 宮星과 格局用神論 硏究'
EXPECTED_AUTHOR = '고재민'
EXPECTED_YEAR = '2016'
EXPECTED_RISS_ID = 'T14040293'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/1.0; public-route-verification)'
MAX_BYTES = 16 * 1024 * 1024
MAX_FOLLOWS = 30


class TrackingRedirect(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[str] = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def fetch(url: str) -> tuple[dict, bytes]:
    tracker = TrackingRedirect()
    opener = build_opener(tracker)
    req = Request(url, headers={
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/pdf,application/javascript,*/*;q=0.4',
    })
    meta = {
        'requestedUrl': url,
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'redirectChain': [],
        'bytes': 0,
        'sha256': None,
        'pdfMagic': False,
        'error': None,
    }
    try:
        with opener.open(req, timeout=30) as r:
            body = r.read(MAX_BYTES + 1)
            if len(body) > MAX_BYTES:
                body = body[:MAX_BYTES]
                meta['truncated'] = True
            meta.update({
                'status': getattr(r, 'status', None),
                'finalUrl': r.geturl(),
                'contentType': r.headers.get('Content-Type'),
                'redirectChain': tracker.chain,
                'bytes': len(body),
                'sha256': sha256(body),
                'pdfMagic': body.startswith(b'%PDF-'),
            })
            return meta, body
    except Exception as exc:
        meta['redirectChain'] = tracker.chain
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b''


def decode_text(body: bytes, content_type: str | None) -> str:
    candidates = []
    if content_type:
        m = re.search(r'charset\s*=\s*([^;\s]+)', content_type, re.I)
        if m:
            candidates.append(m.group(1).strip('"\''))
    candidates.extend(['utf-8', 'euc-kr', 'cp949'])
    for enc in candidates:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def exact_authored_urls(text: str, base: str) -> list[str]:
    vals: set[str] = set()
    for raw in re.findall(r'(?:href|src|action|data-url|data-href)\s*=\s*["\']([^"\']+)["\']', text, re.I):
        vals.add(urljoin(base, raw.replace('&amp;', '&')))
    for raw in re.findall(r'https?://[^\s"\'<>]+', text, re.I):
        vals.add(raw.replace('&amp;', '&').rstrip(').,;'))
    for raw in re.findall(r'["\']([^"\']*(?:dcollection|orgView|handler|fulltext|original|download|viewer|multiView|fileDown|fileDownload|source)[^"\']*)["\']', text, re.I):
        if raw.startswith('/') or raw.startswith('http://') or raw.startswith('https://'):
            vals.add(urljoin(base, raw.replace('&amp;', '&')))
    return sorted(vals)


def is_exact_riss_link(url: str) -> bool:
    p = urlparse(url)
    if (p.hostname or '').lower() not in {'www.riss.kr', 'riss.kr'}:
        return False
    if p.path != '/link':
        return False
    return parse_qs(p.query).get('id') == [EXPECTED_RISS_ID]


def is_literal_external_fulltext_candidate(url: str) -> bool:
    p = urlparse(url)
    host = (p.hostname or '').lower()
    if not host:
        return False
    if host in {'www.riss.kr', 'riss.kr', 'm.riss.kr'}:
        return False
    return bool(re.search(r'dcollection|repository|library|archive|nld\.go\.kr|dhu\.ac\.kr|dhu\.edu|daegu|fulltext|thesis', url, re.I))


def is_same_repository_candidate(url: str, root_url: str) -> bool:
    a = (urlparse(url).hostname or '').lower()
    b = (urlparse(root_url).hostname or '').lower()
    if not a or a != b:
        return False
    return bool(re.search(r'orgView|handler|fulltext|original|download|viewer|multiView|fileDown|fileDownload|\.pdf(?:$|\?)', url, re.I))


def save_response(prefix: str, meta: dict, body: bytes) -> str | None:
    if not body:
        return None
    if body.startswith(b'%PDF-'):
        p = OUT / f'{prefix}.pdf'
        p.write_bytes(body)
        return p.name
    text = decode_text(body, meta.get('contentType'))
    p = OUT / f'{prefix}.html.txt'
    p.write_text(text, encoding='utf-8')
    return p.name


def main() -> int:
    report: dict = {
        'purpose': 'Go Jaemin 2016 exact-public-route discovery/acquisition from candidate-authored RISS surface only',
        'candidate': {
            'title': EXPECTED_TITLE,
            'author': EXPECTED_AUTHOR,
            'year': 2016,
            'rissId': EXPECTED_RISS_ID,
            'rissControl': '01535e75dd09ae73ffe0bdc3ef48d419',
        },
        'policy': {
            'guessedOpaqueIdentifierCount': 0,
            'loginBypass': False,
            'institutionAuthBypass': False,
            'paywallBypass': False,
            'drmRequestExecuted': False,
            'decryptionActionExecuted': False,
            'onlyLiteralPageAuthoredRoutesFollowed': True,
        },
        'detail': {},
        'authoredRoutes': [],
        'followedRoutes': [],
        'pdfs': [],
        'bodyAcquired': False,
    }

    meta, body = fetch(DETAIL)
    report['detail'] = meta
    if not body:
        raise RuntimeError(f'RISS detail fetch failed: {meta}')
    detail_text = decode_text(body, meta.get('contentType'))
    (OUT / 'riss-detail.html.txt').write_text(detail_text, encoding='utf-8')

    normalized = re.sub(r'\s+', ' ', detail_text)
    report['identityObserved'] = {
        'title': EXPECTED_TITLE in detail_text or '四柱命理의 宮星과 格局用神論' in detail_text,
        'author': EXPECTED_AUTHOR in detail_text or '高在民' in detail_text,
        'year': EXPECTED_YEAR in detail_text,
        'rissId': EXPECTED_RISS_ID in detail_text,
        'originalViewLabel': '원문보기' in detail_text,
    }
    if not all(report['identityObserved'][k] for k in ('title', 'author', 'year', 'rissId')):
        raise RuntimeError(f'exact RISS identity not observed: {report["identityObserved"]}')

    authored = exact_authored_urls(detail_text, meta.get('finalUrl') or DETAIL)
    report['authoredRoutes'] = authored

    seeds: list[str] = []
    for u in authored:
        if is_exact_riss_link(u) or is_literal_external_fulltext_candidate(u):
            seeds.append(u)

    # The canonical RISS record visibly authors https://www.riss.kr/link?id=T14040293.
    # Execute it only if that exact literal relation was actually observed in this fetched body.
    if not any(is_exact_riss_link(u) for u in authored):
        report['exactRissLinkObserved'] = False
    else:
        report['exactRissLinkObserved'] = True

    seen: set[str] = set()
    queue = list(dict.fromkeys(seeds))
    follows = 0

    while queue and follows < MAX_FOLLOWS:
        url = queue.pop(0)
        if url in seen:
            continue
        seen.add(url)
        follows += 1
        m, b = fetch(url)
        rec = {**m, 'source': 'literal_page_authored_route'}
        rec['savedAs'] = save_response(f'route-{follows:02d}', m, b)
        report['followedRoutes'].append(rec)
        if not b:
            continue
        if b.startswith(b'%PDF-'):
            report['pdfs'].append({
                'requestedUrl': url,
                'finalUrl': m.get('finalUrl'),
                'sha256': sha256(b),
                'bytes': len(b),
                'savedAs': rec['savedAs'],
            })
            report['bodyAcquired'] = True
            continue

        text = decode_text(b, m.get('contentType'))
        root = m.get('finalUrl') or url
        root_host = (urlparse(root).hostname or '').lower()

        # Only expand a repository/institution page through literal same-host routes authored by that page.
        # Never construct an opaque item id or alter a route parameter.
        if root_host and root_host not in {'www.riss.kr', 'riss.kr', 'm.riss.kr'}:
            for candidate in exact_authored_urls(text, root):
                if candidate not in seen and is_same_repository_candidate(candidate, root):
                    queue.append(candidate)

    report['followCount'] = follows
    report['bodyAcquired'] = bool(report['pdfs'])
    report['semanticDecisionAuthorized'] = bool(report['pdfs'])
    report['boundary'] = (
        'PUBLIC_PDF_ACQUIRED_RENDER_REQUIRED_BEFORE_SEMANTIC_JUDGMENT'
        if report['pdfs']
        else 'NO_PUBLIC_PDF_ACQUIRED_NO_BODY_SEMANTIC_DECISION'
    )

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    summary = [
        f"identity={report['identityObserved']}",
        f"exactRissLinkObserved={report.get('exactRissLinkObserved')}",
        f"followCount={follows}",
        f"bodyAcquired={report['bodyAcquired']}",
        f"pdfCount={len(report['pdfs'])}",
        f"boundary={report['boundary']}",
    ]
    for pdf in report['pdfs']:
        summary.append(f"pdf sha256={pdf['sha256']} bytes={pdf['bytes']} final={pdf['finalUrl']}")
    (OUT / 'summary.txt').write_text('\n'.join(summary) + '\n', encoding='utf-8')
    print('\n'.join(summary))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
