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

OUT = Path('acquisition-lee-kim-2019-ten-star-quantification')
OUT.mkdir(exist_ok=True)
ARTICLE_ID = 'ART002438633'
TITLE = '사주 십성(十星)의 계량화(計量化)와 활용에 대한 고찰'
DOI = '10.33645/cc.2019.02.41.1.887'
ENTRY = f'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id={ARTICLE_ID}'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Lee-Kim-2019-KCI-public-contract)'


def host_ok(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() in {'www.kci.go.kr', 'kci.go.kr'}


def decode(body: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', content_type or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def fetch(opener, url: str, *, referer: str | None = None, max_bytes: int = 16_000_000):
    assert host_ok(url), f'non-KCI host rejected: {url}'
    headers = {
        'User-Agent': UA,
        'Accept': 'application/pdf,text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
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


def same_kci_urls(text: str, base: str) -> list[str]:
    values: list[str] = []
    for pat in [r'<script\b[^>]*\bsrc\s*=\s*(["\'])(.*?)\1', r'(?:href|src)\s*=\s*(["\'])(.*?)\1']:
        for m in re.finditer(pat, text, re.I | re.S):
            raw = html.unescape(m.group(2).strip())
            if not raw or raw.startswith(('javascript:', '#')):
                continue
            u = urljoin(base, raw)
            if host_ok(u) and u not in values:
                values.append(u)
    return values[:120]


def inspect_source(text: str, source: str):
    ids: list[str] = []
    for pat in [
        r"fncDown\(\s*['\"](KCI_FI\d+)['\"]",
        r"orteFileId\s*[:=]\s*['\"](KCI_FI\d+)['\"]",
        r"['\"](KCI_FI\d+)['\"]",
    ]:
        for m in re.finditer(pat, text, re.I):
            value = m.group(1)
            if value not in ids:
                ids.append(value)
    markers = {
        key: key in text
        for key in [
            'fncDown',
            'ciSereArtiOrteView.kci',
            'ciSereArtiOrteServHistIFrame.kci',
            'artiPreView.kci',
            'poDownload.kci',
        ]
    }
    snippets = []
    for term in [ARTICLE_ID, 'KCI_FI', 'orteFileId', 'fncDown', 'ciSereArtiOrteServHistIFrame.kci', 'artiPreView.kci', 'poDownload.kci']:
        shown = 0
        for m in re.finditer(re.escape(term), text, re.I):
            snippets.append({
                'source': source,
                'term': term,
                'context': re.sub(r'\s+', ' ', text[max(0, m.start()-500):min(len(text), m.end()+1100)]),
            })
            shown += 1
            if shown >= 8:
                break
    return ids, markers, snippets


def main():
    opener = build_opener(HTTPSHandler(context=ssl.create_default_context()), HTTPCookieProcessor(CookieJar()))
    entry_meta, entry_body = fetch(opener, ENTRY, max_bytes=8_000_000)
    entry_text = decode(entry_body, entry_meta['contentType'])
    (OUT / 'detail.html').write_text(entry_text, encoding='utf-8')

    assert ARTICLE_ID in entry_text, 'exact KCI article id not observed on current landing page'
    assert '이재승' in entry_text and '김만태' in entry_text, 'exact authors not observed on current landing page'
    assert '사주 십성' in entry_text and '계량화' in entry_text, 'exact title stem not observed on current landing page'

    sources: list[tuple[str, str]] = [('landing', entry_text)]
    fetched_urls: list[str] = []
    script_fetches = []
    for i, url in enumerate(same_kci_urls(entry_text, ENTRY), start=1):
        low = url.lower()
        if not any(token in low for token in ['.js', 'article', 'serearti', 'preview', 'orte']):
            continue
        try:
            meta, body = fetch(opener, url, referer=ENTRY, max_bytes=5_000_000)
            text = decode(body, meta['contentType'])
            fetched_urls.append(url)
            sources.append((url, text))
            script_fetches.append({**meta, 'sourceUrl': url, 'error': None})
            (OUT / f'script-{i:02d}.txt').write_text(text, encoding='utf-8')
        except Exception as exc:
            script_fetches.append({'sourceUrl': url, 'error': f'{type(exc).__name__}: {exc}'})

    file_ids: list[str] = []
    markers: dict[str, bool] = {}
    snippets = []
    for source, text in sources:
        ids, obs, snips = inspect_source(text, source)
        for value in ids:
            if value not in file_ids:
                file_ids.append(value)
        for key, value in obs.items():
            markers[key] = markers.get(key, False) or value
        snippets.extend(snips)

    original_meta = None
    original_text = ''
    authored_original_urls: list[str] = []
    for source, text in sources:
        for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
            raw = html.unescape(m.group(2).strip())
            if 'ciSereArtiOrteView.kci' not in raw:
                continue
            u = urljoin(source if source.startswith('http') else ENTRY, raw)
            if host_ok(u) and (ARTICLE_ID in u or 'artiId=' not in u) and u not in authored_original_urls:
                authored_original_urls.append(u)
    for u in authored_original_urls[:3]:
        try:
            original_meta, body = fetch(opener, u, referer=ENTRY, max_bytes=7_000_000)
            original_text = decode(body, original_meta['contentType'])
            (OUT / 'original-view.html').write_text(original_text, encoding='utf-8')
            ids, obs, snips = inspect_source(original_text, 'original-view')
            for value in ids:
                if value not in file_ids:
                    file_ids.append(value)
            for key, value in obs.items():
                markers[key] = markers.get(key, False) or value
            snippets.extend(snips)
            break
        except Exception as exc:
            original_meta = {'requestedUrl': u, 'error': f'{type(exc).__name__}: {exc}'}

    route_match = re.search(
        r'orteDownFrame\.location\.href\s*=\s*["\']([^"\']*ciSereArtiOrteServHistIFrame\.kci\?[^"\']*orteFileId=)["\']\s*\+\s*orteFileId',
        '\n'.join(text for _, text in sources) + '\n' + original_text,
        re.I,
    )

    attempts = []
    selected = None
    concrete_file_id = file_ids[0] if len(file_ids) == 1 else None
    concrete_url = None
    followed_contract = False
    if concrete_file_id and route_match:
        prefix = html.unescape(route_match.group(1))
        concrete_url = urljoin(ENTRY, prefix + concrete_file_id)
        meta, body = fetch(opener, concrete_url, referer=ENTRY)
        attempts.append(meta)
        followed_contract = True
        if meta['pdfMagic']:
            (OUT / 'candidate.pdf').write_bytes(body)
            selected = meta
        else:
            service_text = decode(body, meta['contentType'])
            (OUT / 'download-service.html').write_text(service_text, encoding='utf-8')
            literal_urls = []
            for m in re.finditer(r'''["']([^"']+)["']''', service_text):
                raw = html.unescape(m.group(1).strip())
                low = raw.lower()
                if not ('download' in low or 'orte' in low or '.pdf' in low):
                    continue
                if '+' in raw or '${' in raw or raw.startswith('javascript:'):
                    continue
                u = urljoin(concrete_url, raw)
                if host_ok(u) and u not in literal_urls:
                    literal_urls.append(u)
            for u in literal_urls[:20]:
                try:
                    m2, b2 = fetch(opener, u, referer=concrete_url)
                    attempts.append(m2)
                    if m2['pdfMagic']:
                        (OUT / 'candidate.pdf').write_bytes(b2)
                        selected = m2
                        break
                except Exception as exc:
                    attempts.append({'requestedUrl': u, 'error': f'{type(exc).__name__}: {exc}'})

    report = {
        'candidate': {
            'authors': ['이재승', '김만태'],
            'year': 2019,
            'title': TITLE,
            'journal': '문화와융합',
            'volume': 41,
            'issue': 1,
            'printedPages': '887-924',
            'kci': ARTICLE_ID,
            'doi': DOI,
        },
        'entry': entry_meta,
        'entryContract': 'current KCI landing/article.kci arti_id route',
        'scriptFetches': script_fetches,
        'fetchedSameKciUrls': fetched_urls,
        'authoredOriginalUrls': authored_original_urls,
        'originalView': original_meta,
        'routeMarkersObserved': markers,
        'siteAuthoredConcreteFileIds': file_ids,
        'concreteFileIdFollowed': concrete_file_id,
        'siteAuthoredConcreteDownloadServiceUrl': concrete_url,
        'concreteDownloadAttempts': attempts,
        'followedConcreteContract': followed_contract,
        'pdfFile': 'candidate.pdf' if selected else None,
        'pdfMeta': selected,
        'fallbackOrteFileIdsTried': [],
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'accessControlBypass': False,
        'semanticDisposition': 'DIRECT_BODY_READY_FOR_REVIEW' if selected else 'ACCESS_BOUNDARY_ONLY_NO_BODY_LEVEL_DECISION',
    }
    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT / 'contract-snippets.json').write_text(json.dumps(snippets, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
