#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition')
PRIVATE = Path('acquisition-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)

UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/1.0; public-resource-verification)'
MAX_BODY = 5 * 1024 * 1024
ALLOWED_DISCOVERY_DOMAINS = (
    'data.riss.kr',
    'riss.kr',
    'www.riss.kr',
    'dcollection.net',
)

TARGETS = {
    'kim-youngjin-2020': {
        'title': '사주명리학의 宮과 星에 관한 연구',
        'lod_urls': [
            'https://data.riss.kr/resource/Thesis/000015521643',
        ],
        'riss_search': 'https://www.riss.kr/search/Search.do?isDetailSearch=N&searchGubun=true&viewYn=OP&query=' + quote('사주명리학의 宮과 星에 관한 연구'),
        'target_phrases': [
            '가족관계도',
            '궁과 성에 육친 관계 해석',
            '사회변화에 따른 궁과 성의 활용',
            '궁과 성의 발전적 활용방안',
        ],
    },
    'kweon-sujeong-2021': {
        'title': '명리 십신의 관계변화와 재해석 : 현대 가족관계와 사회관계를 중심으로',
        'lod_urls': [
            'https://data.riss.kr/resource/Thesis/000015948798',
        ],
        'riss_search': 'https://www.riss.kr/search/Search.do?isDetailSearch=N&searchGubun=true&viewYn=OP&query=' + quote('명리 십신의 관계변화와 재해석 현대 가족관계와 사회관계를 중심으로'),
        'target_phrases': [
            '남녀의 존비 관계에서 상대적 관계로의 변화',
            '혼인관의 인식 전환',
            '혼인 형태의 변화',
            '동성애 동거 가족',
            '배우자궁',
        ],
    },
}

class TrackingRedirect(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[str] = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url: str, accept: str = '*/*') -> dict:
    tracker = TrackingRedirect()
    opener = build_opener(tracker)
    req = Request(url, headers={'User-Agent': UA, 'Accept': accept})
    result = {
        'requestedUrl': url,
        'accept': accept,
        'redirectChain': [],
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'contentLengthHeader': None,
        'sha256': None,
        'bodyBytes': 0,
        'bodyTruncated': False,
        'error': None,
    }
    try:
        with opener.open(req, timeout=30) as resp:
            body = resp.read(MAX_BODY + 1)
            truncated = len(body) > MAX_BODY
            if truncated:
                body = body[:MAX_BODY]
            result.update({
                'redirectChain': tracker.chain,
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type'),
                'contentLengthHeader': resp.headers.get('Content-Length'),
                'sha256': hashlib.sha256(body).hexdigest(),
                'bodyBytes': len(body),
                'bodyTruncated': truncated,
                'body': body,
            })
    except Exception as exc:
        result['redirectChain'] = tracker.chain
        result['error'] = f'{type(exc).__name__}: {exc}'
        result['body'] = b''
    return result


def text_from_body(body: bytes) -> str:
    return body.decode('utf-8', errors='replace')


def extract_urls(text: str, base_url: str) -> list[str]:
    raw = set(re.findall(r'https?://[^\s\"\'<>]+', text))
    raw.update(urljoin(base_url, m) for m in re.findall(r'(?:href|src)=[\"\']([^\"\']+)[\"\']', text, flags=re.I))
    cleaned = []
    for url in raw:
        url = url.replace('&amp;', '&').rstrip(').,;')
        host = (urlparse(url).hostname or '').lower()
        if any(host == d or host.endswith('.' + d) for d in ALLOWED_DISCOVERY_DOMAINS):
            cleaned.append(url)
    return sorted(set(cleaned))


def looks_like_pdf(result: dict) -> bool:
    ctype = (result.get('contentType') or '').lower()
    body = result.get('body') or b''
    return 'application/pdf' in ctype or body.startswith(b'%PDF-')


def save_probe_body(target_key: str, label: str, result: dict) -> None:
    body = result.get('body') or b''
    if not body:
        return
    ctype = (result.get('contentType') or '').lower()
    if 'text/' in ctype or 'json' in ctype or 'xml' in ctype or 'rdf' in ctype or 'html' in ctype:
        path = OUT / f'{target_key}-{label}.txt'
        path.write_text(text_from_body(body), encoding='utf-8')


def render_pdf_targets(target_key: str, pdf_bytes: bytes, phrases: list[str], source_url: str, report: dict) -> None:
    pdf_path = PRIVATE / f'{target_key}.pdf'
    pdf_path.write_bytes(pdf_bytes)
    report['pdfAcquired'] = True
    report['pdfSha256'] = hashlib.sha256(pdf_bytes).hexdigest()
    report['pdfBytes'] = len(pdf_bytes)
    report['pdfSourceUrl'] = source_url

    try:
        info = subprocess.run(['pdfinfo', str(pdf_path)], check=True, capture_output=True, text=True).stdout
        report['pdfInfo'] = info
    except Exception as exc:
        report['pdfInfoError'] = f'{type(exc).__name__}: {exc}'

    txt_path = PRIVATE / f'{target_key}.txt'
    try:
        subprocess.run(['pdftotext', '-layout', str(pdf_path), str(txt_path)], check=True, capture_output=True, text=True)
        text = txt_path.read_text(encoding='utf-8', errors='replace')
    except Exception as exc:
        report['pdfTextExtractionError'] = f'{type(exc).__name__}: {exc}'
        return

    pages = text.split('\f')
    matches = []
    page_dir = OUT / f'{target_key}-target-pages'
    page_dir.mkdir(exist_ok=True)
    for physical_page, page_text in enumerate(pages, start=1):
        matched = [phrase for phrase in phrases if phrase.replace(' ', '') in page_text.replace(' ', '')]
        if not matched:
            continue
        excerpt = page_text[:12000]
        (page_dir / f'physical-page-{physical_page:03d}.txt').write_text(excerpt, encoding='utf-8')
        prefix = page_dir / f'physical-page-{physical_page:03d}'
        try:
            subprocess.run([
                'pdftoppm', '-f', str(physical_page), '-l', str(physical_page),
                '-png', '-r', '150', str(pdf_path), str(prefix)
            ], check=True, capture_output=True, text=True)
            rendered = sorted(page_dir.glob(f'{prefix.name}-*.png'))
            matches.append({
                'physicalPage': physical_page,
                'phrases': matched,
                'renderedFiles': [p.name for p in rendered],
            })
        except Exception as exc:
            matches.append({
                'physicalPage': physical_page,
                'phrases': matched,
                'renderError': f'{type(exc).__name__}: {exc}',
            })
    report['targetPhraseMatches'] = matches


def probe_target(key: str, target: dict) -> dict:
    report = {
        'target': key,
        'title': target['title'],
        'probes': [],
        'discoveredUrls': [],
        'pdfAcquired': False,
        'targetPhraseMatches': [],
    }
    queue: list[tuple[str, str, str]] = []
    for i, url in enumerate(target['lod_urls']):
        for j, accept in enumerate(('text/html,*/*;q=0.8', 'application/ld+json,application/json;q=0.9,*/*;q=0.1', 'application/rdf+xml,application/xml;q=0.9,*/*;q=0.1')):
            queue.append((f'lod-{i}-{j}', url, accept))
    queue.append(('riss-search', target['riss_search'], 'text/html,*/*;q=0.8'))

    seen = set()
    discovered = set()
    pdf_done = False
    while queue and len(seen) < 40:
        label, url, accept = queue.pop(0)
        identity = (url, accept)
        if identity in seen:
            continue
        seen.add(identity)
        result = fetch(url, accept)
        body = result.pop('body', b'')
        probe_record = dict(result)
        report['probes'].append(probe_record)
        result['body'] = body
        save_probe_body(key, re.sub(r'[^a-zA-Z0-9._-]+', '-', label), result)

        if looks_like_pdf(result) and not pdf_done:
            render_pdf_targets(key, body, target['target_phrases'], result.get('finalUrl') or url, report)
            pdf_done = True
            continue

        if not body:
            continue
        text = text_from_body(body)
        for candidate in extract_urls(text, result.get('finalUrl') or url):
            if candidate not in discovered:
                discovered.add(candidate)
                if len(discovered) <= 30:
                    queue.append((f'discovered-{len(discovered):02d}', candidate, 'text/html,application/pdf,*/*;q=0.5'))

    report['discoveredUrls'] = sorted(discovered)
    return report


def main() -> int:
    aggregate = {
        'purpose': 'public scholarly fulltext acquisition probe only; no authentication/paywall bypass',
        'authorityEffect': 'NONE_UNTIL_DIRECT_BODY_REVIEW',
        'targets': {},
    }
    for key, target in TARGETS.items():
        aggregate['targets'][key] = probe_target(key, target)
    report_path = OUT / 'acquisition-report.json'
    report_path.write_text(json.dumps(aggregate, ensure_ascii=False, indent=2), encoding='utf-8')

    summary_lines = []
    for key, item in aggregate['targets'].items():
        summary_lines.append(f'[{key}] pdfAcquired={item["pdfAcquired"]} discoveredUrls={len(item["discoveredUrls"])} probes={len(item["probes"])} targetMatches={len(item.get("targetPhraseMatches", []))}')
        for p in item['probes']:
            summary_lines.append(f'  {p["requestedUrl"]} -> status={p["status"]} final={p["finalUrl"]} type={p["contentType"]} error={p["error"]}')
    (OUT / 'acquisition-summary.txt').write_text('\n'.join(summary_lines) + '\n', encoding='utf-8')
    print('\n'.join(summary_lines))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
