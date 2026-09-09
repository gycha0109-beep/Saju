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

class SameSiteRedirect:
    pass


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


def anchor_candidates(text: str):
    rows = []
    for m in re.finditer(r'<a\b([^>]*)>(.*?)</a>', text, re.I | re.S):
        attrs, inner = m.group(1), m.group(2)
        hm = re.search(r'\bhref\s*=\s*(["\'])(.*?)\1', attrs, re.I | re.S)
        if not hm:
            continue
        href = html.unescape(hm.group(2).strip())
        label = re.sub(r'<[^>]+>', ' ', inner)
        label = re.sub(r'\s+', ' ', html.unescape(label)).strip()
        absolute = urljoin(PAGE_URL, href)
        if not host_ok(absolute):
            continue
        low = (href + ' ' + label).lower()
        if '.pdf' in low or 'download.php' in low or 'file_download' in low:
            rows.append({'href': href, 'url': absolute, 'label': label})
    # exact-page authored links only; dedupe while preserving order
    seen = set()
    out = []
    for row in rows:
        if row['url'] in seen:
            continue
        seen.add(row['url'])
        out.append(row)
    return out


def main():
    opener = build_opener(HTTPSHandler(context=ssl.create_default_context()), HTTPCookieProcessor(CookieJar()))
    page_meta, page_body = fetch(opener, PAGE_URL, max_bytes=4_000_000)
    page_text = decode(page_body, page_meta['contentType'])
    (OUT / 'author-page.html').write_text(page_text, encoding='utf-8')

    title_observed = EXPECTED_TITLE in page_text
    author_observed = EXPECTED_AUTHOR in page_text
    assert title_observed and author_observed, 'exact author/title not observed on source page'

    candidates = anchor_candidates(page_text)
    attempts = []
    selected = None
    selected_body = None
    for row in candidates:
        try:
            meta, body = fetch(opener, row['url'], referer=PAGE_URL, max_bytes=12_000_000)
            is_pdf = body.startswith(b'%PDF-')
            attempts.append({**row, **meta, 'pdfMagic': is_pdf})
            if is_pdf:
                selected = {**row, **meta, 'pdfMagic': True}
                selected_body = body
                break
        except Exception as exc:
            attempts.append({**row, 'error': f'{type(exc).__name__}: {exc}', 'pdfMagic': False})

    assert selected is not None and selected_body is not None, 'no exact page-authored public PDF attachment resolved'
    pdf_path = OUT / 'kim-mantae-2025.pdf'
    pdf_path.write_bytes(selected_body)
    (OUT / 'pdf-url.txt').write_text(selected['finalUrl'] + '\n', encoding='utf-8')

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
        'pageAuthoredAttachmentCandidates': candidates,
        'attempts': attempts,
        'selectedPdf': selected,
        'fullLengthPdfAcquired': True,
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
    }
    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
