#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import http.cookiejar
import json
import re
import ssl
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path('acquisition-na-hyukjin-2017-riss-dispatcher-recheck')
BASE_REPORT = ROOT / 'report.json'
OUT_REPORT = ROOT / 'public-pdf-followup.json'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()
JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(JAR), urllib.request.HTTPSHandler(context=CTX))


def fetch(url: str, timeout: int = 120, referer: str | None = None) -> dict[str, object]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    req = urllib.request.Request(url, headers=headers)
    with OPENER.open(req, timeout=timeout) as resp:
        body = resp.read()
        return {
            'status': getattr(resp, 'status', 200),
            'finalUrl': resp.geturl(),
            'contentType': resp.headers.get('Content-Type', ''),
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
            'body': body,
        }


def decode(body: bytes, content_type: str) -> str:
    match = re.search(r'charset=([\w-]+)', content_type, re.I)
    for enc in [match.group(1) if match else None, 'utf-8', 'euc-kr', 'cp949']:
        if not enc:
            continue
        try:
            return body.decode(enc)
        except (UnicodeDecodeError, LookupError):
            pass
    return body.decode('utf-8', errors='replace')


def js_value(html: str, name: str) -> str | None:
    for pattern in [
        rf'(?is)\bvar\s+{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\blet\s+{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\b{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
    ]:
        match = re.search(pattern, html)
        if match:
            return unescape(match.group(1))
    return None


def input_value(html: str, name: str) -> str | None:
    for tag in re.findall(r'(?is)<input\b[^>]*>', html):
        nm = re.search(r'(?is)\bname\s*=\s*["\']([^"\']+)["\']', tag)
        if not nm or unescape(nm.group(1)) != name:
            continue
        vm = re.search(r'(?is)\bvalue\s*=\s*["\']([^"\']*)["\']', tag)
        return unescape(vm.group(1)) if vm else ''
    return None


def public_pdf_path(html: str) -> str | None:
    active = re.findall(r'(?is)(?<!//)location\.replace\(\s*["\'](/public_resource/pdf/[^"\']+\.pdf)["\']\s*\+?\s*sPage?[^)]*\)', html)
    if active:
        return unescape(active[-1])
    paths = re.findall(r'(?is)["\'](/public_resource/pdf/[^"\']+\.pdf)["\']', html)
    return unescape(paths[-1]) if paths else None


base = json.loads(BASE_REPORT.read_text(encoding='utf-8'))
assert base['candidate']['rissId'] == 'T14398372'
assert base['candidate']['rissControl'] == '1f8b683fad900548ffe0bdc3ef48d419'
assert base['dispatcherContractVerified'] is True
assert base['dcollectionTargetRecoveredFromRiss'] is True
assert base['policy']['guessedOpaqueIdentifierCount'] == 0

dc_hop = next(x for x in base['hops'] if x['name'] == 'dcollectionItem')
item_id = dc_hop['sourceProvenance']['itemId']
dc_url = dc_hop['finalUrl']
assert item_id == '000002321514'
assert dc_url == 'https://ube.dcollection.net/common/orgView/000002321514'

item = fetch(dc_url, 90)
item_body = item.pop('body')
item_html = decode(item_body, str(item['contentType']))
(ROOT / 'dcollection-item-followup-response.html').write_bytes(item_body)

drm = js_value(item_html, 'drm')
msg = js_value(item_html, 'msg')
ext = js_value(item_html, 'ext')
path = public_pdf_path(item_html)
file_size_raw = input_value(item_html, 'fileSize')
file_real_name = input_value(item_html, 'fileRealName')
file_save_name = input_value(item_html, 'fileSaveName')
expected_size = int(file_size_raw) if file_size_raw and file_size_raw.isdigit() else None

drm_branch = bool(re.search(r"(?is)if\s*\([^)]*drm\s*==\s*['\"]Y['\"][^)]*\)", item_html))
else_public_redirect = bool(re.search(r"(?is)drm\s*==\s*['\"]Y['\"].{0,8000}\}\s*else\s*\{.{0,3000}(?<!//)\s*location\.replace\(\s*['\"]/public_resource/pdf/", item_html))
contract_ok = bool(
    drm == 'N'
    and msg in (None, '')
    and ext == '.pdf'
    and path
    and drm_branch
    and else_public_redirect
    and expected_size is not None
    and file_real_name
    and file_save_name == '000002321514.pdf'
)

pdf_record: dict[str, object] | None = None
if contract_ok:
    pdf_url = urllib.parse.urljoin(dc_url, path)
    pdf = fetch(pdf_url, 120, dc_url)
    pdf_body = pdf.pop('body')
    pdf_path = ROOT / 'na-hyukjin-2017-fulltext.pdf'
    pdf_path.write_bytes(pdf_body)
    pdf_record = {
        **pdf,
        'url': pdf_url,
        'saved': str(pdf_path),
        'isPdf': pdf_body[:5] == b'%PDF-',
        'pdfHeader': pdf_body[:16].decode('latin1', errors='replace'),
        'sizeMatchesServerMetadata': expected_size == len(pdf_body),
    }

report = {
    'candidate': base['candidate'],
    'provenance': {
        'sameRunRissDispatcherVerified': True,
        'sameRunDcollectionTargetRecoveredFromRiss': True,
        'itemId': item_id,
        'itemUrl': dc_url,
    },
    'sourceContract': {
        'drm': drm,
        'msg': msg,
        'ext': ext,
        'drmBranchOnlyWhenY': drm_branch,
        'nonDrmElsePublicRedirect': else_public_redirect,
        'authoredPublicPdfPath': path,
        'fileRealName': file_real_name,
        'fileSaveName': file_save_name,
        'expectedFileSize': expected_size,
        'contractAllowsPublicPdf': contract_ok,
    },
    'publicPdf': pdf_record,
    'publicPdfAcquired': bool(pdf_record and pdf_record['isPdf'] and pdf_record['sizeMatchesServerMetadata']),
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'nanetDrmRouteReplayed': False,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
    },
}
OUT_REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(OUT_REPORT.read_text(encoding='utf-8'))
