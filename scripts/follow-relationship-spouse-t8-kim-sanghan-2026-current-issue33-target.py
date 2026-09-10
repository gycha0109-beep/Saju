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
from urllib.parse import parse_qs, urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

OUT = Path('acquisition-kim-sanghan-2026-recheck')
OUT.mkdir(exist_ok=True)
BASE = 'https://brhistory.re.kr'
ENTRY = BASE + '/subList/32000003815'
TARGET_TITLE_STEM = '명리 고전 여명론'
TARGET_AUTHOR = '김상한'
EXPECTED_ISSUE_NAME = '제33호'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Kim-Sanghan-2026-issue33-target)'
ctx = ssl.create_default_context()


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def opener(*, redirect: bool = True):
    handlers = [HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar())]
    if not redirect:
        handlers.append(NoRedirect())
    return build_opener(*handlers)


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def decode(data: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return data.decode(enc)
        except Exception:
            pass
    return data.decode('utf-8', errors='replace')


def fetch(url: str, *, data: dict[str, str] | None = None, referer: str | None = None, follow_redirects: bool = True, max_bytes: int = 45 * 1024 * 1024):
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
        with opener(redirect=follow_redirects).open(req, timeout=35) as resp:
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
                'sha256': sha256(body),
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
            'sha256': sha256(body),
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


def option_value(text: str, select_name: str, option_text: str) -> str | None:
    sm = re.search(rf'<select\b[^>]*name=["\']{re.escape(select_name)}["\'][^>]*>(.*?)</select>', text, re.I | re.S)
    if not sm:
        return None
    block = sm.group(1)
    for m in re.finditer(r'<option\b[^>]*value=["\']([^"\']*)["\'][^>]*>(.*?)</option>', block, re.I | re.S):
        label = re.sub(r'<[^>]+>', ' ', m.group(2))
        label = re.sub(r'\s+', ' ', html.unescape(label)).strip()
        if label == option_text:
            return html.unescape(m.group(1)).strip()
    return None


def selected_or_first(text: str, select_name: str) -> str | None:
    sm = re.search(rf'<select\b[^>]*name=["\']{re.escape(select_name)}["\'][^>]*>(.*?)</select>', text, re.I | re.S)
    if not sm:
        return None
    block = sm.group(1)
    m = re.search(r'<option\b[^>]*selected=["\']selected["\'][^>]*value=["\']([^"\']*)', block, re.I | re.S)
    if not m:
        m = re.search(r'<option\b[^>]*value=["\']([^"\']*)["\']', block, re.I | re.S)
    return html.unescape(m.group(1)).strip() if m else None


# Reproduce the currently observed first-stage contract fresh.
em, eb = fetch(ENTRY)
et = decode(eb, em['contentType'])
assert re.search(r"fnTabLink\(\s*['\"]dataManage['\"]\s*,\s*['\"]N['\"]\s*,\s*['\"]005['\"]\s*\)", et)
first_form = {'journalCd': '', 'sysmoduleSeq': '10000000221', 'pubcNumYsno': 'N'}
fm, fb = fetch(BASE + '/module/thesis/selectKyoboThesisNttListAjax.ink', data=first_form, referer=em['finalUrl'])
ft = decode(fb, fm['contentType'])
(OUT / 'issue33-current-data-manage.html').write_text(ft, encoding='utf-8')

# All values below are read from the current returned form/options, not copied from the old PR.
str_query = input_value(ft, 'strQuery')
inst = input_value(ft, 'trgtIsuInsttCd')
lang = input_value(ft, 'trgtUseLangCode')
journal = option_value(ft, 'journalCd', '역사와 융합')
year = option_value(ft, 'bookYear', '2026')
issue_code = option_value(ft, 'bookCd', EXPECTED_ISSUE_NAME)
search_condition = option_value(ft, 'searchCondition', '논문 명')
include_flag = option_value(ft, 'reFlag', '포함')
assert all([str_query, inst, lang, journal, year, issue_code, search_condition, include_flag]), {
    'strQuery': str_query, 'inst': inst, 'lang': lang, 'journal': journal, 'year': year,
    'issueCode': issue_code, 'searchCondition': search_condition, 'includeFlag': include_flag,
}
assert '/module/thesis/selectKyoboThesisNttListAjax.ink' in ft
assert re.search(r"function\s+fnSearch\s*\([^)]*\).*?fnInit\(\s*['\"]A['\"]\s*\)", ft, re.I | re.S)
assert re.search(r"function\s+fnInit\s*\([^)]*\).*?type\s*:\s*['\"]POST['\"].*?/module/thesis/selectKyoboThesisNttListAjax\.ink.*?serialize\(\)", ft, re.I | re.S)

query_form = {
    'pageIndex': '1',
    'strQuery': str_query,
    'searchCd': 'A',
    'trgtIsuInsttCd': inst,
    'trgtUseLangCode': lang,
    'searchCondition': search_condition,
    'reFlag': include_flag,
    'searchKeyword': TARGET_TITLE_STEM,
    'journalCd': journal,
    'bookYear': year,
    'bookCd': issue_code,
}
qm, qb = fetch(BASE + '/module/thesis/selectKyoboThesisNttListAjax.ink', data=query_form, referer=fm['finalUrl'])
qt = decode(qb, qm['contentType'])
(OUT / 'issue33-target-search.html').write_text(qt, encoding='utf-8')

# Exact candidate row must contain both title stem and author before any content route is admitted.
positions = [p for p in [qt.find(TARGET_TITLE_STEM), qt.find(TARGET_AUTHOR)] if p >= 0]
report = {
    'candidate': {'author': TARGET_AUTHOR, 'titleStem': TARGET_TITLE_STEM, 'year': 2026, 'issueName': EXPECTED_ISSUE_NAME},
    'currentForm': query_form,
    'issueCodeDirectlyObserved': issue_code,
    'searchResponse': qm,
    'exactTitleObserved': TARGET_TITLE_STEM in qt,
    'exactAuthorObserved': TARGET_AUTHOR in qt,
    'targetFragment': None,
    'literalBuilderDownloadUrls': [],
    'fnViewPdfTuples': [],
    'contentAttempt': None,
    'directPdfAcquired': False,
    'contentDownloadExecuted': False,
    'guessedOpaqueIdentifierCount': 0,
    'loginBypass': False,
    'institutionAuthBypass': False,
    'paywallBypass': False,
    'drmRequestExecuted': False,
    'decryptionActionExecuted': False,
    'disposition': 'EXACT_TARGET_ROW_NOT_OBSERVED_IN_CURRENT_ISSUE33_SEARCH',
}

if report['exactTitleObserved'] and report['exactAuthorObserved']:
    center = min(positions)
    fragment = qt[max(0, center - 16000): min(len(qt), center + 26000)]
    report['targetFragment'] = 'issue33-target-fragment.html'
    (OUT / 'issue33-target-fragment.html').write_text(fragment, encoding='utf-8')
    for m in re.finditer(r'''href=["'](https://scholar\.kyobobook\.co\.kr/builderDownload\?[^"']+)["']''', fragment, re.I):
        u = html.unescape(m.group(1))
        qs = parse_qs(urlparse(u).query)
        if all(qs.get(k) for k in ['artId', 'barcode', 'kyoboKey', 'gb']) and u not in report['literalBuilderDownloadUrls']:
            report['literalBuilderDownloadUrls'].append(u)
    for m in re.finditer(r"fnViewPdf\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'", fragment, re.I):
        rec = {'barcode': m.group(1), 'artId': m.group(2), 'kyoboKey': m.group(3), 'scholarUrl': m.group(4)}
        if rec not in report['fnViewPdfTuples']:
            report['fnViewPdfTuples'].append(rec)
    report['disposition'] = 'EXACT_TARGET_ROW_OBSERVED_NO_LITERAL_CONTENT_URL'

    # Prefer the exact literal publisher-authored 원문저장 URL. Do not synthesize identifiers.
    literal = next((u for u in report['literalBuilderDownloadUrls'] if parse_qs(urlparse(u).query).get('gb') == ['down']), None)
    if literal:
        cm, cb = fetch(literal, referer=qm['finalUrl'], follow_redirects=False)
        report['contentAttempt'] = cm
        report['contentDownloadExecuted'] = True
        if cm['pdfMagic'] or 'application/pdf' in cm['contentType'].lower():
            (OUT / 'kim-sanghan-2026.pdf').write_bytes(cb)
            report['directPdfAcquired'] = True
            report['disposition'] = 'EXACT_PUBLISHER_AUTHORED_LITERAL_KYOBO_PDF_ACQUIRED'
        elif cm.get('location'):
            report['disposition'] = 'EXACT_PUBLISHER_AUTHORED_KYOBO_REDIRECT_OBSERVED_NO_FOLLOW_PENDING_REVIEW'
        else:
            (OUT / 'issue33-kyo-download-response.html').write_text(decode(cb, cm['contentType'])[:2_000_000], encoding='utf-8')
            lower = decode(cb, cm['contentType']).lower()
            if any(x in lower for x in ['로그인', 'login', '구매', '결제', '기관인증', '소속기관']):
                report['disposition'] = 'KYOBO_LOGIN_PURCHASE_OR_INSTITUTION_BOUNDARY_STOP_NO_BYPASS'
            else:
                report['disposition'] = 'KYOBO_NON_PDF_RESPONSE_REVIEW_REQUIRED'

(OUT / 'issue33-target-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))

assert report['guessedOpaqueIdentifierCount'] == 0
assert report['loginBypass'] is False
assert report['institutionAuthBypass'] is False
assert report['paywallBypass'] is False
assert report['drmRequestExecuted'] is False
assert report['decryptionActionExecuted'] is False
