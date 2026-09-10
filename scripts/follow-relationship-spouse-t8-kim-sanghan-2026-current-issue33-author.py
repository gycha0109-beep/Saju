#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import parse_qs, urlencode, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

OUT = Path('acquisition-kim-sanghan-2026-recheck')
SOURCE = OUT / 'issue33-current-data-manage.html'
BASE = 'https://brhistory.re.kr'
AUTHOR = '김상한'
TITLE_STEM = '명리 고전 여명론'
ISSUE_NAME = '제33호'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Kim-Sanghan-2026-issue33-author-search)'
ctx = ssl.create_default_context()


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def make_opener(no_redirect: bool = False):
    hs = [HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar())]
    if no_redirect:
        hs.append(NoRedirect())
    return build_opener(*hs)


def decode(data: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return data.decode(enc)
        except Exception:
            pass
    return data.decode('utf-8', errors='replace')


def fetch(url: str, *, data: dict[str, str] | None = None, referer: str | None = None, no_redirect: bool = False, max_bytes: int = 45 * 1024 * 1024):
    host = (urlparse(url).hostname or '').lower()
    assert host in {'brhistory.re.kr', 'www.brhistory.re.kr', 'scholar.kyobobook.co.kr'}
    payload = urlencode(data).encode('utf-8') if data is not None else None
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/json,application/pdf,*/*;q=0.8'}
    if data is not None:
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        headers['X-Requested-With'] = 'XMLHttpRequest'
    if referer:
        headers['Referer'] = referer
    req = Request(url, data=payload, headers=headers)
    body = b''
    try:
        with make_opener(no_redirect).open(req, timeout=35) as resp:
            body = resp.read(max_bytes + 1)
            assert len(body) <= max_bytes
            return {
                'requestedUrl': url,
                'method': 'POST' if data is not None else 'GET',
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'location': resp.headers.get('Location'),
                'contentType': resp.headers.get('Content-Type', ''),
                'contentDisposition': resp.headers.get('Content-Disposition', ''),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'pdfMagic': body.startswith(b'%PDF-'),
                'error': None,
            }, body
    except HTTPError as exc:
        body = exc.read(max_bytes + 1)
        assert len(body) <= max_bytes
        return {
            'requestedUrl': url,
            'method': 'POST' if data is not None else 'GET',
            'status': exc.code,
            'finalUrl': url,
            'location': exc.headers.get('Location'),
            'contentType': exc.headers.get('Content-Type', ''),
            'contentDisposition': exc.headers.get('Content-Disposition', ''),
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
            'pdfMagic': body.startswith(b'%PDF-'),
            'error': f'HTTPError: {exc.code}',
        }, body


def input_value(text: str, name: str) -> str | None:
    for pat in [
        rf'<input\b[^>]*name=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)',
        rf'<input\b[^>]*value=["\']([^"\']*)["\'][^>]*name=["\']{re.escape(name)}["\']',
    ]:
        m = re.search(pat, text, re.I | re.S)
        if m:
            return html.unescape(m.group(1))
    return None


def option_value(text: str, select_name: str, label: str) -> str | None:
    sm = re.search(rf'<select\b[^>]*name=["\']{re.escape(select_name)}["\'][^>]*>(.*?)</select>', text, re.I | re.S)
    if not sm:
        return None
    for m in re.finditer(r'<option\b[^>]*value=["\']([^"\']*)["\'][^>]*>(.*?)</option>', sm.group(1), re.I | re.S):
        text_label = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', m.group(2)))).strip()
        if text_label == label:
            return html.unescape(m.group(1)).strip()
    return None


text = SOURCE.read_text(encoding='utf-8')
assert '/module/thesis/selectKyoboThesisNttListAjax.ink' in text
assert re.search(r"function\s+fnSearch\s*\([^)]*\).*?fnInit\(\s*['\"]A['\"]\s*\)", text, re.I | re.S)
assert 'builderDownload?artId=' in text and 'fnViewPdf' in text

form = {
    'pageIndex': '1',
    'strQuery': input_value(text, 'strQuery') or '',
    'searchCd': 'A',
    'trgtIsuInsttCd': input_value(text, 'trgtIsuInsttCd') or '',
    'trgtUseLangCode': input_value(text, 'trgtUseLangCode') or '',
    'searchCondition': option_value(text, 'searchCondition', '저자 명') or '',
    'reFlag': option_value(text, 'reFlag', '포함') or '',
    'searchKeyword': AUTHOR,
    'journalCd': option_value(text, 'journalCd', '역사와 융합') or '',
    'bookYear': option_value(text, 'bookYear', '2026') or '',
    'bookCd': option_value(text, 'bookCd', ISSUE_NAME) or '',
}
assert all(form.values()), form
assert form['bookCd'] == '1096294'

meta, body = fetch(BASE + '/module/thesis/selectKyoboThesisNttListAjax.ink', data=form, referer=BASE + '/subList/32000003815')
result_text = decode(body, meta['contentType'])
(OUT / 'issue33-author-search.html').write_text(result_text, encoding='utf-8')

# Require both candidate author and title stem in one bounded result neighborhood.
records = []
for m in re.finditer(re.escape(AUTHOR), result_text):
    fragment = result_text[max(0, m.start() - 12000): min(len(result_text), m.end() + 18000)]
    if TITLE_STEM not in fragment:
        continue
    for vm in re.finditer(r"fnViewPdf\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'", fragment, re.I):
        rec = {'barcode': vm.group(1), 'artId': vm.group(2), 'kyoboKey': vm.group(3), 'scholarUrl': vm.group(4)}
        if rec not in records:
            records.append(rec)
    (OUT / 'issue33-author-target-fragment.html').write_text(fragment, encoding='utf-8')
    break

literal_urls = []
frag_path = OUT / 'issue33-author-target-fragment.html'
if frag_path.exists():
    fragment = frag_path.read_text(encoding='utf-8')
    for m in re.finditer(r'''href=["'](https://scholar\.kyobobook\.co\.kr/builderDownload\?[^"']+)["']''', fragment, re.I):
        u = html.unescape(m.group(1))
        q = parse_qs(urlparse(u).query)
        if all(q.get(k) for k in ['artId', 'barcode', 'kyoboKey', 'gb']) and u not in literal_urls:
            literal_urls.append(u)

report = {
    'candidate': {'author': AUTHOR, 'titleStem': TITLE_STEM, 'issueName': ISSUE_NAME, 'year': 2026},
    'currentForm': form,
    'searchResponse': meta,
    'authorObserved': AUTHOR in result_text,
    'titleStemObserved': TITLE_STEM in result_text,
    'exactTargetRecords': records,
    'literalBuilderDownloadUrls': literal_urls,
    'contentAttempt': None,
    'directPdfAcquired': False,
    'contentDownloadExecuted': False,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'disposition': 'AUTHOR_SEARCH_NO_EXACT_TARGET_ROW',
}

if records and literal_urls:
    literal = next((u for u in literal_urls if parse_qs(urlparse(u).query).get('gb') == ['down']), literal_urls[0])
    cm, cb = fetch(literal, referer=BASE + '/subList/32000003815', no_redirect=True)
    report['contentAttempt'] = cm
    report['contentDownloadExecuted'] = True
    if cm['pdfMagic'] or 'application/pdf' in cm['contentType'].lower():
        (OUT / 'kim-sanghan-2026.pdf').write_bytes(cb)
        report['directPdfAcquired'] = True
        report['disposition'] = 'EXACT_PUBLISHER_AUTHORED_LITERAL_KYOBO_PDF_ACQUIRED'
    elif cm.get('location'):
        report['disposition'] = 'EXACT_KYOBO_REDIRECT_OBSERVED_NO_FOLLOW_PENDING_REVIEW'
    else:
        response = decode(cb, cm['contentType'])
        (OUT / 'issue33-author-kyo-response.html').write_text(response[:2_000_000], encoding='utf-8')
        low = response.lower()
        if any(x in low for x in ['로그인', 'login', '구매', '결제', '기관인증', '소속기관']):
            report['disposition'] = 'KYOBO_LOGIN_PURCHASE_OR_INSTITUTION_BOUNDARY_STOP_NO_BYPASS'
        else:
            report['disposition'] = 'KYOBO_NON_PDF_RESPONSE_REVIEW_REQUIRED'
elif records:
    report['disposition'] = 'EXACT_TARGET_ROW_OBSERVED_WITHOUT_LITERAL_DOWNLOAD_URL_STOP'

(OUT / 'issue33-author-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))

assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
assert report['drmRequestExecuted'] is False
assert report['decryptionActionExecuted'] is False
