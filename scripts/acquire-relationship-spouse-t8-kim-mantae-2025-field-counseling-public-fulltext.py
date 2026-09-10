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

OUT = Path('acquisition-kim-mantae-2025-field-counseling')
OUT.mkdir(exist_ok=True)
PAGE_URL = 'https://www.namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=295'
EXPECTED_TITLE = '현대 사주명리 상담의 현장론적 연구'
EXPECTED_AUTHOR = '김만태'
EXPECTED_YEAR = '2025'
EXPECTED_ATTACHMENT_NAME = '현대 사주명리 상담의 현장론적 연구(김만태).pdf'
KCI_ID = 'ART003182973'
DOI = '10.35303/spf.2025.02.45.135'
ALLOWED_HOSTS = {'namestory.kr', 'www.namestory.kr'}
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; Kim-Mantae-2025-field-counseling)'


def host_ok(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() in ALLOWED_HOSTS


def decode(body: bytes, content_type: str = '') -> str:
    candidates: list[str] = []
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


def fetch(opener, url: str, referer: str | None = None, max_bytes: int = 16_000_000):
    assert host_ok(url), f'non-author-site URL rejected: {url}'
    headers = {'User-Agent': UA, 'Accept': '*/*', 'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6'}
    if referer:
        headers['Referer'] = referer
    with opener.open(Request(url, headers=headers), timeout=45) as resp:
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


def compact(text: str, limit: int = 4000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def page_authored_download_candidates(text: str) -> tuple[list[dict], dict]:
    function_match = re.search(
        r'function\s+file_download\s*\(\s*link\s*,\s*file\s*\)\s*\{(?P<body>.*?)\}',
        text,
        re.I | re.S,
    )
    function_body = function_match.group('body') if function_match else ''
    function_contract = {
        'definitionObserved': bool(function_match),
        'documentLocationHrefAssignedFromLink': bool(
            re.search(r'document\s*\.\s*location\s*\.\s*href\s*=\s*link\b', function_body, re.I)
        ),
        'snippet': compact(function_match.group(0), 1200) if function_match else '',
    }

    rows: list[dict] = []
    call_re = re.compile(
        r'file_download\s*\(\s*(["\'])(?P<link>.*?)\1\s*,\s*(["\'])(?P<file>.*?)\3\s*\)',
        re.I | re.S,
    )
    for m in call_re.finditer(text):
        link = html.unescape(m.group('link').strip())
        filename = html.unescape(m.group('file').strip())
        absolute = urljoin(PAGE_URL, link)
        rows.append({
            'rawLink': link,
            'fileName': filename,
            'url': absolute if host_ok(absolute) else None,
            'sameAuthorSite': host_ok(absolute),
            'exactAttachmentName': filename == EXPECTED_ATTACHMENT_NAME,
            'pageOffset': m.start(),
        })
    return rows, function_contract


def main():
    opener = build_opener(HTTPSHandler(context=ssl.create_default_context()), HTTPCookieProcessor(CookieJar()))
    page_meta, page_body = fetch(opener, PAGE_URL, max_bytes=4_000_000)
    page_text = decode(page_body, page_meta['contentType'])
    (OUT / 'author-page.html').write_text(page_text, encoding='utf-8')

    title_observed = EXPECTED_TITLE in page_text
    author_observed = EXPECTED_AUTHOR in page_text
    year_observed = EXPECTED_YEAR in page_text
    calls, function_contract = page_authored_download_candidates(page_text)
    function_safe = bool(
        function_contract['definitionObserved']
        and function_contract['documentLocationHrefAssignedFromLink']
    )

    attempts: list[dict] = []
    selected: dict | None = None
    selected_body: bytes | None = None
    if title_observed and author_observed and year_observed and function_safe:
        for row in calls:
            url = row.get('url')
            if not url or not row['sameAuthorSite'] or not row['exactAttachmentName']:
                continue
            try:
                meta, body = fetch(opener, url, referer=PAGE_URL)
                is_pdf = body.startswith(b'%PDF-')
                attempt = {**row, **meta, 'pdfMagic': is_pdf}
                attempts.append(attempt)
                if is_pdf:
                    selected = attempt
                    selected_body = body
                    break
            except Exception as exc:
                attempts.append({**row, 'error': f'{type(exc).__name__}: {exc}', 'pdfMagic': False})

    report = {
        'candidate': {
            'author': EXPECTED_AUTHOR,
            'year': 2025,
            'title': EXPECTED_TITLE,
            'journal': '실천민속학 연구',
            'volume': 45,
            'pages': '135-166',
            'doi': DOI,
            'kci': KCI_ID,
        },
        'sourcePage': page_meta,
        'titleObserved': title_observed,
        'authorObserved': author_observed,
        'yearObserved': year_observed,
        'fileDownloadFunctionContract': function_contract,
        'pageAuthoredFileDownloadCalls': calls,
        'attempts': attempts,
        'selectedPdf': selected,
        'fullLengthPdfAcquired': selected is not None,
        'policy': {
            'guessedOpaqueIdentifierCount': 0,
            'onlyPageAuthoredSameSiteAttachmentExecuted': True,
            'loginBypass': False,
            'institutionAuthBypass': False,
            'paywallBypass': False,
            'drmRequestExecuted': False,
            'decryptionActionExecuted': False,
        },
        'semanticDisposition': 'NO_SPOUSE_BODY_LEVEL_DECISION_YET',
    }
    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))

    assert title_observed, 'exact title not observed on author source page'
    assert author_observed, 'exact author not observed on author source page'
    assert year_observed, 'publication year not observed on author source page'
    assert function_safe, 'page-authored file_download routing contract not established'
    assert selected is not None and selected_body is not None, 'exact page-authored PDF did not resolve'

    pdf_path = OUT / 'kim-mantae-2025-field-counseling-fulltext.pdf'
    pdf_path.write_bytes(selected_body)
    (OUT / 'pdf-url.txt').write_text(str(selected['finalUrl']) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
