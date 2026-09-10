#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import http.cookiejar
import json
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path('acquisition-ju-mikang-2014')
ROOT.mkdir(parents=True, exist_ok=True)
TITLE = '자평사주 궁합론 연구'
AUTHOR = '주미강'
YEAR = 2014
RISS_ID = 'T13562621'
RISS_CONTROL = '25a5a7cc644554ffffe0bdc3ef48d419'
RISS_URL = f'https://m.riss.kr/search/detail/DetailView.do?control_no={RISS_CONTROL}&p_mat_type=be54d9b8bc7cdb09'
EXPECTED_RISS_AUTHORED_DCOLLECTION_ITEM = '000001771167'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
JAR = http.cookiejar.CookieJar()


def opener(insecure_tls: bool = False):
    ctx = ssl._create_unverified_context() if insecure_tls else ssl.create_default_context()
    return urllib.request.build_opener(
        urllib.request.HTTPCookieProcessor(JAR), urllib.request.HTTPSHandler(context=ctx)
    )


def fetch(url: str, *, referer: str | None = None, timeout: int = 60, max_bytes: int = 20_000_000, insecure_tls: bool = False):
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    try:
        with opener(insecure_tls).open(urllib.request.Request(url, headers=headers), timeout=timeout) as resp:
            body = resp.read(max_bytes + 1)
            if len(body) > max_bytes:
                raise RuntimeError('bounded response limit exceeded')
            return {
                'ok': True, 'status': getattr(resp, 'status', 200), 'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type', ''),
                'contentDisposition': resp.headers.get('Content-Disposition', ''),
                'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest(), 'body': body,
                'tlsVerificationDisabled': insecure_tls,
            }
    except urllib.error.HTTPError as exc:
        body = exc.read(max_bytes + 1)
        return {
            'ok': False, 'status': exc.code, 'finalUrl': exc.geturl(),
            'contentType': exc.headers.get('Content-Type', '') if exc.headers else '',
            'contentDisposition': exc.headers.get('Content-Disposition', '') if exc.headers else '',
            'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest(), 'body': body,
            'error': f'HTTPError: {exc}', 'tlsVerificationDisabled': insecure_tls,
        }


def decode(body: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([\w.-]+)', content_type or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def visibleish(text: str) -> str:
    text = re.sub(r'(?is)<script\b.*?</script>', ' ', text)
    text = re.sub(r'(?is)<style\b.*?</style>', ' ', text)
    text = re.sub(r'(?s)<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()


def save(name: str, meta: dict, body: bytes):
    ct = str(meta.get('contentType') or '').lower()
    if body.startswith(b'%PDF-'):
        suffix = 'pdf'
    elif 'html' in ct or b'<html' in body[:4096].lower() or b'<!doctype' in body[:4096].lower():
        suffix = 'html'
    elif 'javascript' in ct:
        suffix = 'js'
    else:
        suffix = 'bin'
    path = ROOT / f'{name}.{suffix}'
    path.write_bytes(body)
    return str(path), suffix


def form_fields(text: str) -> dict[str, str]:
    form = re.search(r'(?is)<form\b[^>]*\bname=["\']f["\'][^>]*>(.*?)</form>', text)
    if not form:
        return {}
    out: dict[str, str] = {}
    for tag in re.findall(r'(?is)<input\b[^>]*>', form.group(1)):
        n = re.search(r'\bname\s*=\s*["\']([^"\']+)["\']', tag, re.I)
        if not n:
            continue
        v = re.search(r'\bvalue\s*=\s*["\']([^"\']*)["\']', tag, re.I)
        out[html.unescape(n.group(1))] = html.unescape(v.group(1)) if v else ''
    return out


def authored_targets(text: str, base: str) -> list[str]:
    raws: list[str] = []
    for pattern in [
        r'(?is)(?:document\.|window\.)?location\.href\s*=\s*["\']([^"\']+)["\']',
        r'(?is)location\.replace\(\s*["\']([^"\']+)["\']',
        r'(?is)(?:href|src)\s*=\s*["\']([^"\']+)["\']',
    ]:
        raws.extend(re.findall(pattern, text))
    out: list[str] = []
    for raw in raws:
        raw = html.unescape(raw.strip())
        if not raw or raw.lower().startswith(('javascript:', '#')):
            continue
        u = urllib.parse.urljoin(base, raw)
        if u not in out:
            out.append(u)
    return out


def js_value(text: str, name: str) -> str | None:
    for pattern in [
        rf'(?is)\bvar\s+{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\b{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
    ]:
        m = re.search(pattern, text)
        if m:
            return html.unescape(m.group(1))
    return None


def public_pdf_path(text: str) -> str | None:
    patterns = [
        r'(?is)["\'](/public_resource/pdf/[^"\']+\.pdf(?:\?[^"\']*)?)["\']',
        r'(?is)file\s*=\s*(["\'])(/public_resource/pdf/.*?\.pdf(?:\?.*?)?)\1',
    ]
    for pattern in patterns:
        m = re.search(pattern, text)
        if m:
            return html.unescape(m.group(2) if m.lastindex and m.lastindex >= 2 else m.group(1))
    return None


def dcollection_item(url: str) -> str | None:
    for pattern in [r'[?&]sItemId=([0-9]+)', r'/common/orgView/([0-9]+)(?:$|[/?#])']:
        m = re.search(pattern, url)
        if m:
            return m.group(1)
    return None


report: dict[str, object] = {
    'candidate': {
        'title': TITLE, 'author': AUTHOR, 'year': YEAR,
        'institution': '동방문화대학원대학교', 'degree': '석사',
        'rissId': RISS_ID, 'rissControl': RISS_CONTROL, 'extent': 'ix, 71 p.',
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlyPageAuthoredPublicRoutesInspected': True,
        'tlsVerificationDisabledOnlyForExactRissAuthoredDcollectionRoute': True,
        'loginBypass': False, 'institutionAuthBypass': False, 'paywallBypass': False,
        'drmRequestExecuted': False, 'decryptionActionExecuted': False, 'accessControlBypass': False,
    },
    'hops': [], 'fullLengthPdfAcquired': False,
    'semanticDisposition': 'PENDING_DIRECT_BODY_OR_ACCESS_BOUNDARY',
}

riss = fetch(RISS_URL, timeout=30, max_bytes=8_000_000)
riss_body = riss.pop('body')
riss_saved, riss_kind = save('riss-detail', riss, riss_body)
riss_html = decode(riss_body, str(riss.get('contentType') or ''))
riss_text = visibleish(riss_html)
assert AUTHOR in riss_text and TITLE in riss_text and str(YEAR) in riss_text, 'exact RISS identity not observed'
assert RISS_ID in riss_html or RISS_ID in riss_text, 'exact RISS id not observed'
fields = form_fields(riss_html)
script_srcs = [html.unescape(x) for x in re.findall(r'(?is)<script\b[^>]*\bsrc=["\']([^"\']+)["\']', riss_html)]
search_common = next((urllib.parse.urljoin(RISS_URL, src) for src in script_srcs if 'searchCommon.js' in src), None)
dispatcher_verified = False
if search_common:
    js = fetch(search_common, referer=RISS_URL, timeout=30, max_bytes=5_000_000)
    js_body = js.pop('body')
    js_saved, js_kind = save('riss-search-common', js, js_body)
    js_text = decode(js_body, str(js.get('contentType') or ''))
    dispatcher_verified = bool(re.search(r'function\s+fulltextDownload\s*\(', js_text) and re.search(r'loginFlag\.value\s*=\s*["\']1["\']', js_text) and 'FullTextDownload.do' in js_text)
    report['hops'].append({'name':'searchCommonJs', **js, 'saved':js_saved, 'kind':js_kind, 'dispatcherVerified':dispatcher_verified})
report['hops'].insert(0, {'name':'rissDetail', **riss, 'saved':riss_saved, 'kind':riss_kind, 'dispatcherVerified':dispatcher_verified})

assert fields and dispatcher_verified, 'current page-authored RISS fulltext dispatcher not established'
fields['loginFlag'] = '1'
popup_url = urllib.parse.urljoin(RISS_URL, '/search/download/FullTextDownload.do') + '?' + urllib.parse.urlencode(fields)
popup = fetch(popup_url, referer=RISS_URL, timeout=45, max_bytes=8_000_000)
popup_body = popup.pop('body')
popup_saved, popup_kind = save('riss-fulltext-popup', popup, popup_body)
popup_text = decode(popup_body, str(popup.get('contentType') or ''))
popup_targets = authored_targets(popup_text, str(popup.get('finalUrl') or popup_url))
report['hops'].append({'name':'rissFulltextPopup', **popup, 'saved':popup_saved, 'kind':popup_kind, 'authoredTargets':popup_targets})
downloading = next((u for u in popup_targets if 'Downloading.do' in u), None)
assert downloading, 'RISS popup did not author Downloading.do target'

down = fetch(downloading, referer=str(popup.get('finalUrl') or popup_url), timeout=90, max_bytes=10_000_000)
down_body = down.pop('body')
down_saved, down_kind = save('riss-downloading', down, down_body)
down_text = decode(down_body, str(down.get('contentType') or ''))
down_targets = authored_targets(down_text, str(down.get('finalUrl') or downloading))
dc_candidates = [u for u in down_targets if 'dcollection' in u.lower()]
assert len(set(dc_candidates)) == 1, f'expected one exact RISS-authored dCollection target, got {dc_candidates}'
dc_url = dc_candidates[0]
item = dcollection_item(dc_url)
assert item == EXPECTED_RISS_AUTHORED_DCOLLECTION_ITEM, f'unexpected same-run dCollection item: {item}'
report['hops'].append({'name':'rissDownloading', **down, 'saved':down_saved, 'kind':down_kind, 'exactDcollectionTarget':dc_url, 'itemId':item})
parsed = urllib.parse.urlsplit(dc_url)
if parsed.scheme == 'http':
    dc_url = urllib.parse.urlunsplit(('https', parsed.netloc, parsed.path, parsed.query, parsed.fragment))

# The institution currently presents an invalid TLS chain. Disable certificate verification only after
# the exact URL has been authored by this same run's RISS Downloading.do response. This does not alter
# authentication, authorization, DRM, paywall, path, item id, or content semantics.
current_url = dc_url
pdf_path = None
drm = None
msg = None
for idx in range(1, 4):
    dc = fetch(current_url, referer=str(down.get('finalUrl') or downloading), timeout=90, max_bytes=12_000_000, insecure_tls=True)
    dc_body = dc.pop('body')
    dc_saved, dc_kind = save(f'dcollection-item-{idx}', dc, dc_body)
    dc_text = decode(dc_body, str(dc.get('contentType') or ''))
    current_item = dcollection_item(str(dc.get('finalUrl') or current_url)) or item
    assert current_item == item, f'dCollection redirect changed item identity: {current_item}'
    drm = js_value(dc_text, 'drm') if drm is None else drm
    msg = js_value(dc_text, 'msg') if msg is None else msg
    pdf_path = public_pdf_path(dc_text) or pdf_path
    targets = authored_targets(dc_text, str(dc.get('finalUrl') or current_url))
    report['hops'].append({'name':f'dcollectionItem{idx}', **dc, 'saved':dc_saved, 'kind':dc_kind, 'itemId':current_item, 'drm':drm, 'msg':msg, 'authoredPublicPdfPath':pdf_path, 'authoredTargets':targets[:50]})
    if pdf_path:
        break
    next_dc = next((u for u in targets if 'dcollection' in u.lower() and (dcollection_item(u) in (None, item)) and u != current_url), None)
    if not next_dc:
        break
    current_url = next_dc

if pdf_path and drm == 'N' and msg in (None, ''):
    pdf_url = urllib.parse.urljoin(current_url, pdf_path)
    assert urllib.parse.urlsplit(pdf_url).hostname == urllib.parse.urlsplit(current_url).hostname, 'cross-host PDF rejected'
    pdf = fetch(pdf_url, referer=current_url, timeout=120, max_bytes=20_000_000, insecure_tls=True)
    pdf_body = pdf.pop('body')
    pdf_saved, pdf_kind = save('ju-mikang-2014-fulltext', pdf, pdf_body)
    is_pdf = pdf_body.startswith(b'%PDF-')
    report['hops'].append({'name':'publicPdf', **pdf, 'saved':pdf_saved, 'kind':pdf_kind, 'isPdf':is_pdf, 'itemId':item})
    if is_pdf:
        (ROOT/'candidate.pdf').write_bytes(pdf_body)
        report['fullLengthPdfAcquired'] = True
        report['pdfSha256'] = hashlib.sha256(pdf_body).hexdigest()
        report['pdfBytes'] = len(pdf_body)
        report['semanticDisposition'] = 'DIRECT_BODY_READY_FOR_RENDER_REVIEW'

if not report['fullLengthPdfAcquired']:
    report['semanticDisposition'] = 'ACCESS_BOUNDARY_ONLY_NO_BODY_LEVEL_DECISION'
(ROOT/'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
