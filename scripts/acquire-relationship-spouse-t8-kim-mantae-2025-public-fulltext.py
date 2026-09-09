#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener
from http.cookiejar import CookieJar

OUT = Path('acquisition-kim-mantae-2025')
OUT.mkdir(exist_ok=True)
PAGE_URL = 'https://www.namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=418'
EXPECTED_TITLE = '배우자 인연의 중시로서 궁합(宮合)에 관한 고찰'
EXPECTED_AUTHOR = '김만태'
ALLOWED_HOSTS = {'namestory.kr', 'www.namestory.kr'}
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/2.0; Kim-Mantae-2025-public-fulltext)'


def host_ok(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() in ALLOWED_HOSTS


def decode(body: bytes, content_type: str = '') -> str:
    candidates = []
    m = re.search(r'charset=([A-Za-z0-9._-]+)', content_type or '', re.I)
    if m:
        candidates.append(m.group(1))
    candidates += ['utf-8', 'cp949', 'euc-kr']
    for enc in candidates:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def fetch(opener, url: str, referer: str | None = None, max_bytes: int = 10_000_000):
    assert host_ok(url), f'non-author-site URL rejected: {url}'
    headers = {'User-Agent': UA, 'Accept': '*/*'}
    if referer:
        headers['Referer'] = referer
    with opener.open(Request(url, headers=headers), timeout=30) as resp:
        final_url = resp.geturl()
        assert host_ok(final_url), f'cross-site redirect rejected: {final_url}'
        body = resp.read(max_bytes + 1)
        assert len(body) <= max_bytes, 'response exceeded bounded size'
        return {
            'requestedUrl': url,
            'finalUrl': final_url,
            'status': getattr(resp, 'status', None),
            'contentType': resp.headers.get('Content-Type', ''),
            'contentDisposition': resp.headers.get('Content-Disposition', ''),
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
        }, body


def compact(text: str, limit: int = 5000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def discovery_contexts(text: str) -> list[dict]:
    rows = []
    needles = ['.pdf', 'download.php', 'file_download', '다운로드', '첨부', 'wr_id=418']
    for needle in needles:
        for m in re.finditer(re.escape(needle), text, re.I):
            lo = max(0, m.start() - 1200)
            hi = min(len(text), m.end() + 2200)
            rows.append({'needle': needle, 'offset': m.start(), 'snippet': compact(text[lo:hi])})
            if sum(1 for r in rows if r['needle'] == needle) >= 12:
                break
    return rows


def literal_url_candidates(text: str) -> list[dict]:
    rows = []
    # Only exact literal attributes/URLs authored by the fetched page are considered.
    patterns = [
        r'\bhref\s*=\s*(["\'])(.*?)\1',
        r'\b(?:src|data-url|data-href)\s*=\s*(["\'])(.*?)\1',
    ]
    for pattern in patterns:
        for m in re.finditer(pattern, text, re.I | re.S):
            raw = html.unescape(m.group(2).strip())
            low = raw.lower()
            if not any(k in low for k in ('.pdf', 'download.php', 'file_download', 'download')):
                continue
            if raw.lower().startswith('javascript:'):
                rows.append({'raw': raw, 'url': None, 'kind': 'javascript-literal'})
                continue
            absolute = urljoin(PAGE_URL, raw)
            rows.append({
                'raw': raw,
                'url': absolute if host_ok(absolute) else None,
                'kind': 'same-site-literal' if host_ok(absolute) else 'rejected-non-author-site',
            })
    # Also capture exact same-site absolute URL literals containing download/pdf tokens.
    for m in re.finditer(r'https?://[^\s\'"<>]+', text, re.I):
        raw = html.unescape(m.group(0).rstrip('),.;'))
        if any(k in raw.lower() for k in ('.pdf', 'download.php', 'file_download')):
            rows.append({'raw': raw, 'url': raw if host_ok(raw) else None, 'kind': 'absolute-literal'})
    seen = set()
    out = []
    for row in rows:
        key = (row['raw'], row.get('url'))
        if key in seen:
            continue
        seen.add(key)
        out.append(row)
    return out[:100]


def main():
    opener = build_opener(HTTPSHandler(context=ssl.create_default_context()), HTTPCookieProcessor(CookieJar()))
    page_meta, page_body = fetch(opener, PAGE_URL, max_bytes=4_000_000)
    page_text = decode(page_body, page_meta['contentType'])
    (OUT / 'author-page.html').write_text(page_text, encoding='utf-8')

    title_observed = EXPECTED_TITLE in page_text
    author_observed = EXPECTED_AUTHOR in page_text
    contexts = discovery_contexts(page_text)
    literals = literal_url_candidates(page_text)
    (OUT / 'attachment-discovery.json').write_text(
        json.dumps({'contexts': contexts, 'literalCandidates': literals}, ensure_ascii=False, indent=2),
        encoding='utf-8',
    )

    attempts = []
    selected = None
    selected_body = None
    for row in literals:
        url = row.get('url')
        if not url or row['kind'] == 'rejected-non-author-site':
            continue
        try:
            meta, body = fetch(opener, url, referer=PAGE_URL, max_bytes=12_000_000)
            is_pdf = body.startswith(b'%PDF-')
            attempts.append({**row, **meta, 'pdfMagic': is_pdf})
            if is_pdf:
                selected = {**row, **meta, 'pdfMagic': True}
                selected_body = body
                break
        except Exception as exc:
            attempts.append({**row, 'error': f'{type(exc).__name__}: {exc}', 'pdfMagic': False})

    report = {
        'candidate': {
            'author': EXPECTED_AUTHOR,
            'year': 2025,
            'title': EXPECTED_TITLE,
            'doi': '10.58936/gcr.2025.9.5.3.143',
            'kci': 'ART003250308',
        },
        'sourcePage': page_meta,
        'titleObserved': title_observed,
        'authorObserved': author_observed,
        'pageAuthoredLiteralCandidates': literals,
        'attempts': attempts,
        'selectedPdf': selected,
        'fullLengthPdfAcquired': selected is not None,
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
    }
    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))

    assert title_observed and author_observed, 'exact author/title not observed on source page'
    assert selected is not None and selected_body is not None, 'no exact page-authored public PDF attachment resolved'
    pdf_path = OUT / 'kim-mantae-2025.pdf'
    pdf_path.write_bytes(selected_body)
    (OUT / 'pdf-url.txt').write_text(selected['finalUrl'] + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
