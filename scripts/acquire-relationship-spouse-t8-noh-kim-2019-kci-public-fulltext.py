#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

OUT = Path('acquisition-noh-kim-2019')
OUT.mkdir(exist_ok=True)
ARTICLE_ID = 'ART002459146'
TITLE = '평등 가족시대에 가부장적 육친론(六親論)의 재해석 -가족에서 처(妻)를 중심으로-'
DOI = '10.22143/HSS21.10.2.15'
DETAIL = (
    'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci'
    f'?sereArticleSearchBean.artiId={ARTICLE_ID}'
)
HOST = 'www.kci.go.kr'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Noh-Kim-2019-public-contract)'


def host_ok(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() in {'www.kci.go.kr', 'kci.go.kr'}


def decode(body: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', content_type or '', re.I)
    candidates = [m.group(1)] if m else []
    candidates += ['utf-8', 'euc-kr', 'cp949']
    for enc in candidates:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def fetch(opener, url: str, *, referer: str | None = None, max_bytes: int = 6_000_000):
    assert host_ok(url), f'non-KCI host rejected: {url}'
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8',
    }
    if referer:
        headers['Referer'] = referer
    with opener.open(Request(url, headers=headers), timeout=30) as resp:
        final_url = resp.geturl()
        assert host_ok(final_url), f'cross-host redirect rejected: {final_url}'
        body = resp.read(max_bytes + 1)
        assert len(body) <= max_bytes, 'bounded response limit exceeded'
        return {
            'requestedUrl': url,
            'finalUrl': final_url,
            'status': getattr(resp, 'status', None),
            'contentType': resp.headers.get('Content-Type', ''),
            'contentDisposition': resp.headers.get('Content-Disposition', ''),
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
            'pdfMagic': body.startswith(b'%PDF-'),
        }, body


def script_urls(text: str, base: str):
    values = []
    for m in re.finditer(r'<script\b[^>]*\bsrc\s*=\s*(["\'])(.*?)\1', text, re.I | re.S):
        u = urljoin(base, html.unescape(m.group(2).strip()))
        if host_ok(u):
            values.append(u)
    return list(dict.fromkeys(values))[:80]


def extract_contract(text: str, source: str):
    file_ids = []
    patterns = [
        r"fncDown\(\s*['\"]([^'\"]+)['\"]",
        r"orteFileId\s*[:=]\s*['\"]([^'\"]+)['\"]",
        r"['\"](KCI_FI\d+)['\"]",
    ]
    for pat in patterns:
        for m in re.finditer(pat, text, re.I):
            value = m.group(1)
            if value not in file_ids:
                file_ids.append(value)

    route_markers = [
        'ciSereArtiOrteView.kci',
        'ciSereArtiOrteServHistIFrame.kci',
        'artiPreView.kci',
        'poDownload.kci',
        'fncDown',
    ]
    observed = {marker: marker in text for marker in route_markers}

    article_urls = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        if ARTICLE_ID in raw or 'artiPreView.kci' in raw or 'poDownload.kci' in raw:
            absolute = urljoin(DETAIL, raw)
            if host_ok(absolute) and absolute not in article_urls:
                article_urls.append(absolute)

    snippets = []
    for term in [ARTICLE_ID, 'KCI_FI', 'orteFileId', 'fncDown', 'ciSereArtiOrteView.kci', 'artiPreView.kci', 'poDownload.kci']:
        for m in re.finditer(re.escape(term), text, re.I):
            snippets.append({
                'source': source,
                'term': term,
                'context': re.sub(r'\s+', ' ', text[max(0, m.start()-450):min(len(text), m.end()+900)]),
            })
            if sum(1 for row in snippets if row['term'] == term) >= 8:
                break
    return file_ids, observed, article_urls, snippets


def main():
    opener = build_opener(HTTPSHandler(context=ssl.create_default_context()), HTTPCookieProcessor(CookieJar()))
    detail_meta, detail_body = fetch(opener, DETAIL)
    detail_text = decode(detail_body, detail_meta['contentType'])
    (OUT / 'detail.html').write_text(detail_text, encoding='utf-8')

    assert '노희범' in detail_text and '김성덕' in detail_text, 'exact authors not observed'
    assert '평등 가족시대에 가부장적 육친론' in detail_text, 'exact title stem not observed'
    assert DOI in detail_text, 'exact DOI not observed'

    sources = [('detail', detail_text)]
    script_fetches = []
    for i, url in enumerate(script_urls(detail_text, DETAIL), start=1):
        try:
            meta, body = fetch(opener, url, referer=DETAIL, max_bytes=3_000_000)
            text = decode(body, meta['contentType'])
            sources.append((url, text))
            script_fetches.append({**meta, 'sourceUrl': url, 'error': None})
            (OUT / f'script-{i:02d}.txt').write_text(text, encoding='utf-8')
        except Exception as exc:
            script_fetches.append({'sourceUrl': url, 'error': f'{type(exc).__name__}: {exc}'})

    file_ids = []
    markers = {}
    article_urls = []
    snippets = []
    for source, text in sources:
        ids, obs, urls, snips = extract_contract(text, source)
        for value in ids:
            if value not in file_ids:
                file_ids.append(value)
        for key, value in obs.items():
            markers[key] = markers.get(key, False) or value
        for url in urls:
            if url not in article_urls:
                article_urls.append(url)
        snippets.extend(snips)

    # An original-view request is allowed only if the current detail/static source explicitly authors the route literal.
    original_view = None
    original_sources = []
    if markers.get('ciSereArtiOrteView.kci'):
        original_url = (
            'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiOrteView.kci'
            f'?sereArticleSearchBean.artiId={ARTICLE_ID}'
        )
        try:
            meta, body = fetch(opener, original_url, referer=DETAIL)
            text = decode(body, meta['contentType'])
            original_view = meta
            (OUT / 'original-view.html').write_text(text, encoding='utf-8')
            original_sources.append(('original-view', text))
        except Exception as exc:
            original_view = {'requestedUrl': original_url, 'error': f'{type(exc).__name__}: {exc}'}

    for source, text in original_sources:
        ids, obs, urls, snips = extract_contract(text, source)
        for value in ids:
            if value not in file_ids:
                file_ids.append(value)
        for key, value in obs.items():
            markers[key] = markers.get(key, False) or value
        for url in urls:
            if url not in article_urls:
                article_urls.append(url)
        snippets.extend(snips)

    # Only replay fully authored article-specific URLs found literally in the current KCI source.
    content_attempts = []
    full_pdf = None
    full_pdf_meta = None
    for url in article_urls:
        if ARTICLE_ID not in url and 'artiPreView.kci' not in url:
            continue
        try:
            meta, body = fetch(opener, url, referer=DETAIL, max_bytes=12_000_000)
            content_attempts.append(meta)
            if meta['pdfMagic']:
                name = 'candidate.pdf'
                (OUT / name).write_bytes(body)
                full_pdf = name
                full_pdf_meta = meta
                break
        except Exception as exc:
            content_attempts.append({'requestedUrl': url, 'error': f'{type(exc).__name__}: {exc}'})

    report = {
        'candidate': {
            'authors': ['노희범', '김성덕'],
            'year': 2019,
            'title': TITLE,
            'kci': ARTICLE_ID,
            'doi': DOI,
            'printedPages': '201-212',
        },
        'detail': detail_meta,
        'scriptFetches': script_fetches,
        'routeMarkersObserved': markers,
        'htmlOrScriptDiscoveredOrteFileIds': file_ids,
        'fallbackOrteFileIdsTried': [],
        'originalView': original_view,
        'siteAuthoredArticleSpecificUrls': article_urls,
        'contentAttempts': content_attempts,
        'pdfFile': full_pdf,
        'pdfMeta': full_pdf_meta,
        'fullLengthPdfAcquired': False,
        'contentDownloadExecuted': bool(content_attempts),
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'semanticDisposition': 'PENDING_DIRECT_BODY_OR_ACCESS_BOUNDARY',
    }
    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT / 'contract-snippets.json').write_text(json.dumps(snippets, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
