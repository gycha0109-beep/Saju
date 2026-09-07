#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition-stage2')
OUT.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/1.0; public-route-verification)'
MAX_BODY = 8 * 1024 * 1024

PROBES = {
    'kim-orgview': 'http://dcollection.kyonggi.ac.kr/common/orgView/000000055103',
    'kim-riss-link': 'http://www.riss.kr/link?id=T15521643',
    'kim-riss-searchbtn-js': 'https://www.riss.kr/discovery/search/js/searchBtn.js?20260907',
    'kim-riss-searchcommon-js': 'https://www.riss.kr/search/js/searchCommon.js?20260907',
    'kweon-detail': 'https://skuniv.dcollection.net/srch/srchDetail/200000508213',
    'kweon-handler': 'http://www.dcollection.net/handler/skuniv/200000508213',
    'kweon-common-js': 'https://skuniv.dcollection.net/script/commons/common.js',
    'kweon-search-js': 'https://skuniv.dcollection.net/script/search/search.js',
}

INTEREST = re.compile(
    r'orgView|fulltextDownload|FullTextDownload|original|download|pdf|viewer|handler|multiView|srchOriginal|fileDown|fileDownload|원문',
    re.I,
)

class TrackingRedirect(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[str] = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url: str) -> tuple[dict, bytes]:
    tracker = TrackingRedirect()
    opener = build_opener(tracker)
    req = Request(url, headers={'User-Agent': UA, 'Accept': 'text/html,application/javascript,application/pdf,*/*;q=0.5'})
    meta = {
        'requestedUrl': url,
        'redirectChain': [],
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'contentLengthHeader': None,
        'sha256': None,
        'bodyBytes': 0,
        'truncated': False,
        'error': None,
    }
    try:
        with opener.open(req, timeout=30) as resp:
            body = resp.read(MAX_BODY + 1)
            if len(body) > MAX_BODY:
                body = body[:MAX_BODY]
                meta['truncated'] = True
            meta.update({
                'redirectChain': tracker.chain,
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type'),
                'contentLengthHeader': resp.headers.get('Content-Length'),
                'sha256': hashlib.sha256(body).hexdigest(),
                'bodyBytes': len(body),
            })
            return meta, body
    except Exception as exc:
        meta['redirectChain'] = tracker.chain
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b''


def text(body: bytes) -> str:
    return body.decode('utf-8', errors='replace')


def extract_interesting_lines(src: str) -> list[dict]:
    rows = []
    for n, line in enumerate(src.splitlines(), start=1):
        if INTEREST.search(line):
            rows.append({'line': n, 'text': line[:2000]})
    return rows[:1000]


def extract_urls(src: str, base: str) -> list[str]:
    vals = set(re.findall(r'https?://[^\s\"\'<>]+', src))
    vals.update(urljoin(base, v) for v in re.findall(r'(?:href|src)=[\"\']([^\"\']+)[\"\']', src, flags=re.I))
    for pattern in (
        r'[\"\']([^\"\']*(?:download|original|viewer|handler|fulltext|pdf)[^\"\']*)[\"\']',
        r'url\s*[:=]\s*[\"\']([^\"\']+)[\"\']',
    ):
        for v in re.findall(pattern, src, flags=re.I):
            if v.startswith('/') or v.startswith('http://') or v.startswith('https://'):
                vals.add(urljoin(base, v))
    return sorted(v.replace('&amp;', '&').rstrip(').,;') for v in vals)


def main() -> int:
    report = {'purpose': 'targeted public fulltext-route inspection only; no auth/paywall bypass', 'probes': {}}
    followups: dict[str, str] = {}

    for label, url in PROBES.items():
        meta, body = fetch(url)
        src = text(body)
        safe_label = re.sub(r'[^a-zA-Z0-9._-]+', '-', label)
        if body:
            ctype = (meta.get('contentType') or '').lower()
            if body.startswith(b'%PDF-') or 'application/pdf' in ctype:
                (OUT / f'{safe_label}.pdf').write_bytes(body)
                meta['directPdfAcquired'] = True
            else:
                (OUT / f'{safe_label}.txt').write_text(src, encoding='utf-8')
                meta['directPdfAcquired'] = False
        else:
            meta['directPdfAcquired'] = False
        base = meta.get('finalUrl') or url
        meta['interestingLines'] = extract_interesting_lines(src)
        urls = extract_urls(src, base)
        meta['candidateUrls'] = urls[:500]
        for i, candidate in enumerate(urls):
            low = candidate.lower()
            if any(k in low for k in ('download', 'original', 'viewer', 'handler', 'fulltext', '.pdf')):
                followups[f'{safe_label}-candidate-{i:03d}'] = candidate
        report['probes'][label] = meta

    report['candidateFollowups'] = []
    seen = set()
    for label, url in list(followups.items())[:80]:
        if url in seen:
            continue
        seen.add(url)
        meta, body = fetch(url)
        src = text(body)
        record = {'label': label, **meta}
        if body:
            ctype = (meta.get('contentType') or '').lower()
            if body.startswith(b'%PDF-') or 'application/pdf' in ctype:
                path = OUT / f'{label}.pdf'
                path.write_bytes(body)
                record['directPdfAcquired'] = True
                record['savedAs'] = path.name
            elif 'text' in ctype or 'javascript' in ctype or 'json' in ctype or 'xml' in ctype or not ctype:
                path = OUT / f'{label}.txt'
                path.write_text(src, encoding='utf-8')
                record['directPdfAcquired'] = False
                record['interestingLines'] = extract_interesting_lines(src)
        report['candidateFollowups'].append(record)

    (OUT / 'stage2-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    summary = []
    for label, meta in report['probes'].items():
        summary.append(f'[{label}] status={meta["status"]} final={meta["finalUrl"]} type={meta["contentType"]} directPdf={meta["directPdfAcquired"]} interesting={len(meta.get("interestingLines", []))}')
    for rec in report['candidateFollowups']:
        if rec.get('directPdfAcquired') or rec.get('status') not in (200, None):
            summary.append(f'[followup] status={rec.get("status")} final={rec.get("finalUrl")} type={rec.get("contentType")} directPdf={rec.get("directPdfAcquired", False)} error={rec.get("error")}')
    (OUT / 'stage2-summary.txt').write_text('\n'.join(summary) + '\n', encoding='utf-8')
    print('\n'.join(summary))
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
