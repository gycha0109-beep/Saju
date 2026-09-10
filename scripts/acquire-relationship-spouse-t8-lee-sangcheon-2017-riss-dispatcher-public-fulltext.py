#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import http.cookiejar
import json
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path('acquisition-lee-sangcheon-2017-riss-dispatcher-recheck')
ROOT.mkdir(parents=True, exist_ok=True)
TITLE = '『적천수천미』 「육친론」에 관한 연구'
AUTHOR = '이상천'
YEAR = 2017
RISS_CONTROL = '7dedd951a2b45b77ffe0bdc3ef48d419'
RISS_MAT = 'be54d9b8bc7cdb09'
NANET_CONTROL = 'KDMT1201802346'
RISS_URL = f'https://m.riss.kr/search/detail/DetailView.do?control_no={RISS_CONTROL}&p_mat_type={RISS_MAT}'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()
JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(JAR), urllib.request.HTTPSHandler(context=CTX))


def fetch(url: str, timeout: int = 90, referer: str | None = None) -> dict[str, object]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    try:
        with OPENER.open(urllib.request.Request(url, headers=headers), timeout=timeout) as resp:
            body = resp.read()
            return {
                'ok': True,
                'status': getattr(resp, 'status', 200),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type', ''),
                'contentDisposition': resp.headers.get('Content-Disposition', ''),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'body': body,
            }
    except urllib.error.HTTPError as exc:
        body = exc.read()
        return {
            'ok': False,
            'status': exc.code,
            'finalUrl': exc.geturl(),
            'contentType': exc.headers.get('Content-Type', '') if exc.headers else '',
            'contentDisposition': exc.headers.get('Content-Disposition', '') if exc.headers else '',
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
            'body': body,
            'error': f'HTTPError: {exc}',
        }
    except Exception as exc:
        return {'ok': False, 'status': None, 'finalUrl': url, 'contentType': '', 'contentDisposition': '', 'bytes': 0, 'sha256': None, 'body': b'', 'error': f'{type(exc).__name__}: {exc}'}


def decode(body: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([\w-]+)', content_type, re.I)
    for enc in [m.group(1) if m else None, 'utf-8', 'euc-kr', 'cp949']:
        if not enc:
            continue
        try:
            return body.decode(enc)
        except (UnicodeDecodeError, LookupError):
            pass
    return body.decode('utf-8', errors='replace')


def save(name: str, result: dict[str, object], body: bytes) -> str:
    ct = str(result.get('contentType') or '').lower()
    if body[:5] == b'%PDF-': suffix = 'pdf'
    elif 'javascript' in ct or name.endswith('js'): suffix = 'js'
    elif 'html' in ct or b'<html' in body[:4096].lower(): suffix = 'html'
    else: suffix = 'bin'
    path = ROOT / f'{name}.{suffix}'
    path.write_bytes(body)
    return str(path)


def visible(html: str) -> str:
    x = re.sub(r'(?is)<script\b.*?</script>|<style\b.*?</style>', ' ', html)
    x = re.sub(r'(?s)<[^>]+>', ' ', x)
    return re.sub(r'\s+', ' ', unescape(x)).strip()


def form_fields(html: str) -> dict[str, str]:
    form = re.search(r'(?is)<form\b[^>]*\bname=["\']f["\'][^>]*>(.*?)</form>', html)
    if not form: return {}
    out: dict[str, str] = {}
    for tag in re.findall(r'(?is)<input\b[^>]*>', form.group(1)):
        n = re.search(r'(?is)\bname\s*=\s*["\']([^"\']+)["\']', tag)
        if not n: continue
        v = re.search(r'(?is)\bvalue\s*=\s*["\']([^"\']*)["\']', tag)
        out[unescape(n.group(1))] = unescape(v.group(1)) if v else ''
    return out


def nav_targets(html: str, base: str) -> list[str]:
    found: list[str] = []
    for pattern in [
        r'(?is)document\.location\.href\s*=\s*["\']([^"\']+)["\']',
        r'(?is)location\.replace\(\s*["\']([^"\']+)["\']\s*\)',
    ]:
        for raw in re.findall(pattern, html):
            url = urllib.parse.urljoin(base, unescape(raw.strip()))
            if url not in found: found.append(url)
    return found


def js_value(html: str, name: str) -> str | None:
    for pattern in [
        rf'(?is)\bvar\s+{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\b{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
    ]:
        m = re.search(pattern, html)
        if m: return unescape(m.group(1))
    return None


def input_value(html: str, name: str) -> str | None:
    for tag in re.findall(r'(?is)<input\b[^>]*>', html):
        nm = re.search(r'(?is)\bname\s*=\s*["\']([^"\']+)["\']', tag)
        if not nm or unescape(nm.group(1)) != name: continue
        vm = re.search(r'(?is)\bvalue\s*=\s*["\']([^"\']*)["\']', tag)
        return unescape(vm.group(1)) if vm else ''
    return None


def public_pdf_path(html: str) -> str | None:
    paths = re.findall(r'(?is)["\'](/public_resource/pdf/[^"\']+\.pdf)["\']', html)
    return unescape(paths[-1]) if paths else None


def dcollection_item_id(url: str) -> str | None:
    for pattern in [r'[?&]sItemId=([0-9]+)', r'/common/orgView/([0-9]+)(?:$|[/?#])']:
        m = re.search(pattern, url)
        if m: return m.group(1)
    return None

report: dict[str, object] = {
    'candidate': {
        'title': TITLE,
        'author': AUTHOR,
        'year': YEAR,
        'institution': '국제뇌교육종합대학원대학교',
        'rissControl': RISS_CONTROL,
        'nanetControl': NANET_CONTROL,
        'priorAccessBoundaryPr': 368,
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlySiteAuthoredPublicRoutesInspected': True,
        'nanetDrmRouteReplayed': False,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
    },
    'hops': [],
}

riss = fetch(RISS_URL, 45)
riss_body = riss.pop('body')
riss_html = decode(riss_body, str(riss.get('contentType') or ''))
riss_saved = save('riss-detail-response', riss, riss_body)
riss_text = visible(riss_html)
fields = form_fields(riss_html)
script_srcs = [unescape(x) for x in re.findall(r'(?is)<script\b[^>]*\bsrc=["\']([^"\']+)["\']', riss_html)]
search_common_url = next((urllib.parse.urljoin(RISS_URL, x) for x in script_srcs if 'searchCommon.js' in x), None)
assert riss['status'] == 200 and AUTHOR in riss_text and str(YEAR) in riss_text
assert '육친론' in riss_text and '적천수천미' in riss_text
assert search_common_url

js = fetch(search_common_url, 45, RISS_URL)
js_body = js.pop('body')
js_text = decode(js_body, str(js.get('contentType') or ''))
js_saved = save('riss-search-common-js', js, js_body)
dispatcher_verified = bool(re.search(r'function\s+fulltextDownload\s*\(', js_text) and re.search(r'loginFlag\.value\s*=\s*["\']1["\']', js_text) and 'FullTextDownload.do' in js_text)
assert dispatcher_verified

report['hops'].append({'name':'rissDetail', **riss, 'saved':riss_saved, 'formFields':fields, 'identityConfirmed':True})
report['hops'].append({'name':'searchCommonJs', **js, 'saved':js_saved, 'dispatcherVerified':True})

fields['loginFlag'] = '1'
popup_url = urllib.parse.urljoin(RISS_URL, '/search/download/FullTextDownload.do') + '?' + urllib.parse.urlencode(fields)
popup = fetch(popup_url, 60, RISS_URL)
popup_body = popup.pop('body')
popup_html = decode(popup_body, str(popup.get('contentType') or ''))
popup_saved = save('riss-fulltext-popup-response', popup, popup_body)
popup_targets = nav_targets(popup_html, str(popup.get('finalUrl') or popup_url))
report['hops'].append({'name':'rissFulltextPopup', **popup, 'saved':popup_saved, 'targets':popup_targets})
down_url = next((x for x in popup_targets if 'Downloading.do' in x), None)
assert down_url

down = fetch(down_url, 90, popup_url)
down_body = down.pop('body')
down_html = decode(down_body, str(down.get('contentType') or ''))
down_saved = save('riss-downloading-response', down, down_body)
down_targets = nav_targets(down_html, str(down.get('finalUrl') or down_url))
report['hops'].append({'name':'rissDownloading', **down, 'saved':down_saved, 'targets':down_targets})
dc_url = next((x for x in down_targets if 'dcollection' in x.lower()), None)
assert dc_url
item_id = dcollection_item_id(dc_url)
assert item_id
parts = urllib.parse.urlsplit(dc_url)
if parts.scheme == 'http': dc_url = urllib.parse.urlunsplit(('https', parts.netloc, parts.path, parts.query, parts.fragment))

dc = fetch(dc_url, 90, down_url)
dc_body = dc.pop('body')
dc_html = decode(dc_body, str(dc.get('contentType') or ''))
dc_saved = save('dcollection-item-response', dc, dc_body)
path = public_pdf_path(dc_html)
drm = js_value(dc_html, 'drm')
msg = js_value(dc_html, 'msg')
ext = js_value(dc_html, 'ext')
file_size_raw = input_value(dc_html, 'fileSize')
file_save_name = input_value(dc_html, 'fileSaveName')
expected_size = int(file_size_raw) if file_size_raw and file_size_raw.isdigit() else None
drm_branch = bool(re.search(r"(?is)if\s*\([^)]*drm\s*==\s*['\"]Y['\"][^)]*\)", dc_html))
non_drm_else = bool(path and drm == 'N' and msg in (None, '') and re.search(r"(?is)drm\s*==\s*['\"]Y['\"].{0,9000}\}\s*else\s*\{.{0,4000}(?<!//)\s*location\.replace", dc_html))
contract = {
    'itemId': item_id,
    'itemUrl': str(dc.get('finalUrl') or dc_url),
    'drm': drm,
    'msg': msg,
    'ext': ext,
    'fileSaveName': file_save_name,
    'expectedFileSize': expected_size,
    'authoredPublicPdfPath': path,
    'drmBranchOnlyWhenY': drm_branch,
    'nonDrmElsePublicRedirect': non_drm_else,
}
report['hops'].append({'name':'dcollectionItem', **dc, 'saved':dc_saved, 'sourceContract':contract})

pdf_record = None
contract_ok = bool(path and drm == 'N' and msg in (None, '') and ext == '.pdf' and drm_branch and non_drm_else and expected_size)
if contract_ok:
    pdf_url = urllib.parse.urljoin(str(dc.get('finalUrl') or dc_url), path)
    pdf = fetch(pdf_url, 120, str(dc.get('finalUrl') or dc_url))
    pdf_body = pdf.pop('body')
    pdf_saved = save('lee-sangcheon-2017-fulltext', pdf, pdf_body)
    pdf_record = {
        **pdf,
        'saved': pdf_saved,
        'url': pdf_url,
        'isPdf': pdf_body[:5] == b'%PDF-',
        'sizeMatchesServerMetadata': len(pdf_body) == expected_size,
    }
    report['hops'].append({'name':'publicPdf', **pdf_record})

report['dispatcherContractVerified'] = dispatcher_verified
report['dcollectionTargetRecoveredFromRiss'] = True
report['publicPdfAcquired'] = bool(pdf_record and pdf_record['isPdf'] and pdf_record['sizeMatchesServerMetadata'])
report['semanticDisposition'] = 'NO_BODY_LEVEL_DECISION_YET'
(ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print((ROOT / 'report.json').read_text(encoding='utf-8'))
