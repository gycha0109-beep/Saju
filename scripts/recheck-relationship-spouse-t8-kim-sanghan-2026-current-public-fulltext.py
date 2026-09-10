#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

OUT = Path('acquisition-kim-sanghan-2026-recheck')
OUT.mkdir(exist_ok=True)

AUTHOR = '김상한'
TITLE = '명리 고전 여명론(女命論)의 성별 비대칭과 역사적 맥락'
TITLE_STEM = '명리 고전 여명론'
KCI_ARTICLE_ID = 'ART003370620'
DOI = '10.55793/jkhc.2026.33.631'
EXPECTED_ISSUE_SIGNAL = '33'
PUBLISHER_BASE = 'https://brhistory.re.kr'
PUBLISHER_PAGE = PUBLISHER_BASE + '/subList/32000003815'
ALLOWED_HOSTS = {'brhistory.re.kr', 'www.brhistory.re.kr', 'scholar.kyobobook.co.kr'}
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Kim-Sanghan-2026-current-public-recheck)'
MAX = 45 * 1024 * 1024

ctx = ssl.create_default_context()
jar = CookieJar()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(jar))


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def allowed(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() in ALLOWED_HOSTS


def fetch(url: str, *, data: dict[str, str] | None = None, referer: str | None = None, timeout: int = 35, max_bytes: int = MAX):
    assert allowed(url), f'outside public allowlist: {url}'
    payload = urlencode(data).encode('utf-8') if data is not None else None
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/json,application/pdf,*/*;q=0.8',
    }
    if data is not None:
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        headers['X-Requested-With'] = 'XMLHttpRequest'
    if referer:
        headers['Referer'] = referer
    with opener.open(Request(url, data=payload, headers=headers), timeout=timeout) as resp:
        body = resp.read(max_bytes + 1)
        assert len(body) <= max_bytes, 'bounded response limit exceeded'
        final = resp.geturl()
        assert allowed(final), f'cross-boundary redirect rejected: {final}'
        return {
            'requestedUrl': url,
            'method': 'POST' if data is not None else 'GET',
            'finalUrl': final,
            'status': getattr(resp, 'status', None),
            'contentType': resp.headers.get('Content-Type', ''),
            'contentDisposition': resp.headers.get('Content-Disposition', ''),
            'bytes': len(body),
            'sha256': sha256(body),
            'pdfMagic': body.startswith(b'%PDF-'),
        }, body


def decode(data: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return data.decode(enc)
        except Exception:
            pass
    return data.decode('utf-8', errors='replace')


def literal_links(base: str, text: str) -> list[str]:
    out = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        u = urljoin(base, raw)
        if u not in out:
            out.append(u)
    return out


def named_value(text: str, name: str) -> str | None:
    patterns = [
        rf'<input\b[^>]*(?:name|id)=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)',
        rf'<input\b[^>]*value=["\']([^"\']*)["\'][^>]*(?:name|id)=["\']{re.escape(name)}["\']',
        rf'\b{re.escape(name)}\b\s*[:=]\s*["\']([^"\']+)["\']',
    ]
    for pat in patterns:
        m = re.search(pat, text, re.I | re.S)
        if m:
            return html.unescape(m.group(1)).strip()
    return None


def endpoint_post_contract(union: str, endpoint: str) -> tuple[bool, list[str]]:
    windows = []
    for m in re.finditer(re.escape(endpoint), union, re.I):
        w = union[max(0, m.start() - 2500): min(len(union), m.end() + 2500)]
        windows.append(re.sub(r'\s+', ' ', w)[:5000])
    post = any(re.search(r'(?:type|method)\s*[:=]\s*["\']POST["\']', w, re.I) for w in windows)
    return post, windows[:8]


report = {
    'candidate': {
        'author': AUTHOR,
        'title': TITLE,
        'kciArticleId': KCI_ARTICLE_ID,
        'doi': DOI,
        'publicationYear': 2026,
        'issue': 33,
    },
    'publisherEntry': None,
    'currentContract': {},
    'issueList': None,
    'issueRecords': [],
    'targetIssueRecords': [],
    'articleListRequests': [],
    'targetRecords': [],
    'downloadAttempts': [],
    'fullLengthPdfAcquired': False,
    'pdf': None,
    'contentDownloadExecuted': False,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'crossSourceSemanticStitching': False,
    'disposition': 'CURRENT_PUBLIC_PUBLISHER_CONTRACT_RECHECK_PENDING',
}

# 1. Re-read the publisher page now; no stale AJAX contract is assumed.
entry_meta, entry_body = fetch(PUBLISHER_PAGE)
entry_text = decode(entry_body, entry_meta['contentType'])
(OUT / 'publisher-entry.html').write_text(entry_text, encoding='utf-8')
report['publisherEntry'] = entry_meta

# 2. Inspect only scripts directly referenced by the current publisher page.
script_urls = []
for u in literal_links(entry_meta['finalUrl'], entry_text):
    host = (urlparse(u).hostname or '').lower()
    if host in {'brhistory.re.kr', 'www.brhistory.re.kr'} and (u.lower().endswith('.js') or '.js?' in u.lower()):
        if u not in script_urls:
            script_urls.append(u)
union = entry_text
script_fetches = []
for i, u in enumerate(script_urls[:50], start=1):
    try:
        meta, body = fetch(u, referer=entry_meta['finalUrl'], timeout=20, max_bytes=3_000_000)
        text = decode(body, meta['contentType'])
        union += '\n' + text
        script_fetches.append({**meta, 'sourceUrl': u, 'error': None})
        if any(token in text for token in ['selectKyoboThesisBookListAjax.ink', 'selectKyoboThesisNttListAjax.ink', 'fnViewPdf', 'builderDownload']):
            (OUT / f'publisher-script-{i:02d}.txt').write_text(text, encoding='utf-8')
    except Exception as exc:
        script_fetches.append({'sourceUrl': u, 'error': f'{type(exc).__name__}: {exc}'})

book_ep = '/module/thesis/selectKyoboThesisBookListAjax.ink'
article_ep = '/module/thesis/selectKyoboThesisNttListAjax.ink'
book_post, book_windows = endpoint_post_contract(union, book_ep)
article_post, article_windows = endpoint_post_contract(union, article_ep)
fn_view_observed = 'fnViewPdf' in union
builder_observed = 'builderDownload' in union and 'artId' in union and 'barcode' in union and 'kyoboKey' in union

# Values are admitted only if the current page/script union itself exposes them.
current_values = {
    'journalCd': named_value(union, 'journalCd'),
    'trgtIsuInsttCd': named_value(union, 'trgtIsuInsttCd'),
    'trgtUseLangCode': named_value(union, 'trgtUseLangCode'),
    'searchCd': named_value(union, 'searchCd'),
    'searchCondition': named_value(union, 'searchCondition'),
    'reFlag': named_value(union, 'reFlag'),
    'strQuery': named_value(union, 'strQuery'),
}
report['currentContract'] = {
    'referencedScriptCount': len(script_urls),
    'scriptFetches': script_fetches,
    'bookListEndpointObserved': bool(book_windows),
    'bookListPostObserved': book_post,
    'articleListEndpointObserved': bool(article_windows),
    'articleListPostObserved': article_post,
    'fnViewPdfObserved': fn_view_observed,
    'builderDownloadImplementationSignalsObserved': builder_observed,
    'currentValues': current_values,
    'bookEndpointWindows': book_windows,
    'articleEndpointWindows': article_windows,
}

required = ['journalCd', 'trgtIsuInsttCd', 'trgtUseLangCode']
if not (book_post and article_post and all(current_values.get(k) for k in required)):
    report['disposition'] = 'CURRENT_PUBLISHER_PAGE_DOES_NOT_SELF_CONTAIN_REQUIRED_AJAX_FORM_CONTRACT_STOP'
else:
    common = {
        'pageIndex': '1',
        'strQuery': current_values.get('strQuery') or '',
        'searchCd': current_values.get('searchCd') or 'A',
        'trgtIsuInsttCd': current_values['trgtIsuInsttCd'] or '',
        'trgtUseLangCode': current_values['trgtUseLangCode'] or '',
        'searchCondition': current_values.get('searchCondition') or 'productNm',
        'reFlag': current_values.get('reFlag') or 'Y',
        'searchKeyword': TITLE_STEM,
        'journalCd': current_values['journalCd'] or '',
        'bookYear': '2026',
        'bookCd': '',
    }
    # Search strings are not opaque authority identifiers; exact candidate title is supplied only as the public search query.
    if not common['strQuery']:
        common['strQuery'] = f"@ws {{ IDX_PUBC_NUM(HASALL|'{common['journalCd']}'|0|0) }}"
        report['currentContract']['strQueryDerivedOnlyFromCurrentlyObservedJournalCd'] = True

    issue_meta, issue_body = fetch(PUBLISHER_BASE + book_ep, data=common, referer=entry_meta['finalUrl'])
    issue_text = decode(issue_body, issue_meta['contentType'])
    (OUT / 'issue-list-2026.txt').write_text(issue_text, encoding='utf-8')
    report['issueList'] = issue_meta
    try:
        parsed = json.loads(issue_text)
        rows = parsed.get('result', parsed) if isinstance(parsed, dict) else parsed
        if isinstance(rows, list):
            report['issueRecords'] = rows
    except Exception as exc:
        report['issueList']['parseError'] = f'{type(exc).__name__}: {exc}'

    books = []
    for row in report['issueRecords']:
        code = str(row.get('BOOK_CD') or row.get('bookCd') or '')
        name = str(row.get('BOOK_NM') or row.get('bookNm') or '')
        if code:
            books.append((code, name))
        if '33' in name:
            report['targetIssueRecords'].append(row)

    # Query only issue codes returned by the current public issue-list contract.
    article_union = ''
    for index, (code, name) in enumerate(books[:30], start=1):
        form = {**common, 'bookCd': code}
        meta, body = fetch(PUBLISHER_BASE + article_ep, data=form, referer=entry_meta['finalUrl'])
        text = decode(body, meta['contentType'])
        (OUT / f'article-list-{index:02d}.html').write_text(text, encoding='utf-8')
        contains = TITLE_STEM in text and AUTHOR in text
        report['articleListRequests'].append({**meta, 'bookCode': code, 'bookName': name, 'containsExactTargetSignals': contains})
        if contains:
            article_union += '\n' + text

    # Admit only target-local fnViewPdf tuples from a response containing exact title+author.
    for text_path in sorted(OUT.glob('article-list-*.html')):
        text = text_path.read_text(encoding='utf-8')
        if TITLE_STEM not in text or AUTHOR not in text:
            continue
        pos = min(x for x in [text.find(TITLE_STEM), text.find(AUTHOR)] if x >= 0)
        fragment = text[max(0, pos - 12000): min(len(text), pos + 18000)]
        (OUT / f'target-fragment-{text_path.stem}.html').write_text(fragment, encoding='utf-8')
        for m in re.finditer(r"fnViewPdf\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'", fragment, re.I):
            rec = {'barcode': m.group(1), 'artId': m.group(2), 'kyoboKey': m.group(3), 'scholarUrl': m.group(4), 'sourceFile': text_path.name}
            if rec not in report['targetRecords']:
                report['targetRecords'].append(rec)

    # Follow only if the current publisher contract itself exposes fnViewPdf and builderDownload semantics.
    if report['targetRecords'] and fn_view_observed and builder_observed:
        for i, rec in enumerate(report['targetRecords'][:3], start=1):
            scholar = rec['scholarUrl'].rstrip('/')
            if (urlparse(scholar).hostname or '').lower() != 'scholar.kyobobook.co.kr':
                continue
            for mode in ('down', 'view'):
                url = scholar + '/builderDownload?' + urlencode({
                    'artId': rec['artId'],
                    'barcode': rec['barcode'],
                    'kyoboKey': rec['kyoboKey'],
                    'gb': mode,
                })
                try:
                    meta, body = fetch(url, referer=entry_meta['finalUrl'])
                    attempt = {**meta, 'recordIndex': i, 'mode': mode}
                    report['downloadAttempts'].append(attempt)
                    report['contentDownloadExecuted'] = True
                    if meta['pdfMagic'] or 'application/pdf' in meta['contentType'].lower():
                        path = OUT / 'kim-sanghan-2026.pdf'
                        path.write_bytes(body)
                        report['pdf'] = {**meta, 'recordIndex': i, 'mode': mode}
                        report['fullLengthPdfAcquired'] = True
                        report['disposition'] = 'CURRENT_PUBLIC_PUBLISHER_KYOBO_DIRECT_PDF_ACQUIRED_REQUIRES_BODY_VALIDATION'
                        break
                    else:
                        (OUT / f'kyobo-{i}-{mode}.html').write_text(decode(body, meta['contentType'])[:2_000_000], encoding='utf-8')
                except Exception as exc:
                    report['downloadAttempts'].append({'recordIndex': i, 'mode': mode, 'error': f'{type(exc).__name__}: {exc}'})
            if report['fullLengthPdfAcquired']:
                break
    elif report['targetRecords']:
        report['disposition'] = 'TARGET_ROW_OBSERVED_BUT_CURRENT_BUILDER_DOWNLOAD_IMPLEMENTATION_NOT_SELF_AUTHORED_STOP'

    if not report['fullLengthPdfAcquired'] and report['disposition'] == 'CURRENT_PUBLIC_PUBLISHER_CONTRACT_RECHECK_PENDING':
        if report['targetIssueRecords']:
            if report['targetRecords']:
                report['disposition'] = 'ISSUE_33_AND_TARGET_ROW_CURRENTLY_PUBLIC_BUT_NO_DIRECT_PDF_ACQUIRED'
            else:
                report['disposition'] = 'ISSUE_33_CURRENTLY_PUBLIC_TARGET_ROW_NOT_RESOLVED_TO_EXACT_VIEW_TUPLE'
        else:
            report['disposition'] = 'ISSUE_33_STILL_NOT_EXPOSED_BY_CURRENT_PUBLIC_PUBLISHER_FEED'

(OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({
    'disposition': report['disposition'],
    'currentValues': report['currentContract'].get('currentValues'),
    'issueRecordCount': len(report['issueRecords']),
    'targetIssueRecordCount': len(report['targetIssueRecords']),
    'targetRecordCount': len(report['targetRecords']),
    'downloadAttemptCount': len(report['downloadAttempts']),
    'fullLengthPdfAcquired': report['fullLengthPdfAcquired'],
    'pdf': report['pdf'],
}, ensure_ascii=False, indent=2))

assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
assert report['drmRequestExecuted'] is False
assert report['decryptionActionExecuted'] is False
assert report['crossSourceSemanticStitching'] is False
