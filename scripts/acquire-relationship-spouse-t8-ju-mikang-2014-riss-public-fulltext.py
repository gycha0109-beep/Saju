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
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
OPENER = urllib.request.build_opener(
    urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()),
    urllib.request.HTTPSHandler(context=ssl.create_default_context()),
)


def fetch(url: str, *, referer: str | None = None, timeout: int = 60, max_bytes: int = 20_000_000):
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    try:
        with OPENER.open(urllib.request.Request(url, headers=headers), timeout=timeout) as resp:
            body = resp.read(max_bytes + 1)
            if len(body) > max_bytes:
                raise RuntimeError('bounded response limit exceeded')
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
        body = exc.read(max_bytes + 1)
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
    raw_targets: list[str] = []
    patterns = [
        r'(?is)(?:document\.|window\.)?location\.href\s*=\s*["\']([^"\']+)["\']',
        r'(?is)location\.replace\(\s*["\']([^"\']+)["\']',
        r'(?is)(?:href|src)\s*=\s*["\']([^"\']+)["\']',
    ]
    for pattern in patterns:
        raw_targets.extend(re.findall(pattern, text))
    out: list[str] = []
    for raw in raw_targets:
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


report: dict[str, object] = {
    'candidate': {
        'title': TITLE,
        'author': AUTHOR,
        'year': YEAR,
        'institution': '동방문화대학원대학교',
        'department': '미래예측학과 명리학',
        'degree': '석사',
        'rissId': RISS_ID,
        'rissControl': RISS_CONTROL,
        'printedPages': 71,
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlyPageAuthoredPublicRoutesInspected': True,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'accessControlBypass': False,
    },
    'hops': [],
    'fullLengthPdfAcquired': False,
    'semanticDisposition': 'PENDING_DIRECT_BODY_OR_ACCESS_BOUNDARY',
}

riss = fetch(RISS_URL, timeout=30, max_bytes=8_000_000)
riss_body = riss.pop('body')
riss_saved, riss_kind = save('riss-detail', riss, riss_body)
riss_html = decode(riss_body, str(riss.get('contentType') or ''))
riss_text = visibleish(riss_html)
assert AUTHOR in riss_text, 'exact author not observed'
assert TITLE in riss_text, 'exact title not observed'
assert str(YEAR) in riss_text, 'year not observed'
assert RISS_ID in riss_html or RISS_ID in riss_text, 'RISS id not observed'
fields = form_fields(riss_html)
script_srcs = [html.unescape(x) for x in re.findall(r'(?is)<script\b[^>]*\bsrc=["\']([^"\']+)["\']', riss_html)]
search_common = next((urllib.parse.urljoin(RISS_URL, src) for src in script_srcs if 'searchCommon.js' in src), None)
dispatcher_verified = False
if search_common:
    js = fetch(search_common, referer=RISS_URL, timeout=30, max_bytes=5_000_000)
    js_body = js.pop('body')
    js_saved, js_kind = save('riss-search-common', js, js_body)
    js_text = decode(js_body, str(js.get('contentType') or ''))
    dispatcher_verified = bool(
        re.search(r'function\s+fulltextDownload\s*\(', js_text)
        and re.search(r'loginFlag\.value\s*=\s*["\']1["\']', js_text)
        and 'FullTextDownload.do' in js_text
    )
    report['hops'].append({'name': 'searchCommonJs', **js, 'saved': js_saved, 'kind': js_kind, 'dispatcherVerified': dispatcher_verified})
report['hops'].insert(0, {'name': 'rissDetail', **riss, 'saved': riss_saved, 'kind': riss_kind, 'formFields': fields, 'dispatcherVerified': dispatcher_verified})

if fields and dispatcher_verified:
    fields['loginFlag'] = '1'
    popup_url = urllib.parse.urljoin(RISS_URL, '/search/download/FullTextDownload.do') + '?' + urllib.parse.urlencode(fields)
    popup = fetch(popup_url, referer=RISS_URL, timeout=45, max_bytes=8_000_000)
    popup_body = popup.pop('body')
    popup_saved, popup_kind = save('riss-fulltext-popup', popup, popup_body)
    popup_text = decode(popup_body, str(popup.get('contentType') or ''))
    popup_targets = authored_targets(popup_text, str(popup.get('finalUrl') or popup_url))
    report['hops'].append({'name': 'rissFulltextPopup', **popup, 'saved': popup_saved, 'kind': popup_kind, 'authoredTargets': popup_targets, 'boundedText': visibleish(popup_text)[:4000]})
    downloading = next((u for u in popup_targets if 'Downloading.do' in u), None)
    if downloading:
        down = fetch(downloading, referer=str(popup.get('finalUrl') or popup_url), timeout=90, max_bytes=10_000_000)
        down_body = down.pop('body')
        down_saved, down_kind = save('riss-downloading', down, down_body)
        down_text = decode(down_body, str(down.get('contentType') or ''))
        down_targets = authored_targets(down_text, str(down.get('finalUrl') or downloading))
        report['hops'].append({'name': 'rissDownloading', **down, 'saved': down_saved, 'kind': down_kind, 'authoredTargets': down_targets, 'boundedText': visibleish(down_text)[:5000]})
        dc_url = next((u for u in down_targets if 'dcollection' in u.lower()), None)
        if dc_url:
            parsed = urllib.parse.urlsplit(dc_url)
            if parsed.scheme == 'http':
                dc_url = urllib.parse.urlunsplit(('https', parsed.netloc, parsed.path, parsed.query, parsed.fragment))
            dc = fetch(dc_url, referer=str(down.get('finalUrl') or downloading), timeout=90, max_bytes=10_000_000)
            dc_body = dc.pop('body')
            dc_saved, dc_kind = save('dcollection-item', dc, dc_body)
            dc_text = decode(dc_body, str(dc.get('contentType') or ''))
            drm = js_value(dc_text, 'drm')
            msg = js_value(dc_text, 'msg')
            agree = js_value(dc_text, 'agree')
            path = public_pdf_path(dc_text)
            targets = authored_targets(dc_text, str(dc.get('finalUrl') or dc_url))
            viewer = next((u for u in targets if ('viewer' in u.lower() or 'pdf' in u.lower()) and '/public_resource/pdf/' in u), None)
            if not path and viewer:
                q = urllib.parse.parse_qs(urllib.parse.urlsplit(viewer).query)
                raw = q.get('file', [None])[0]
                if raw and '/public_resource/pdf/' in raw:
                    path = raw
            report['hops'].append({'name': 'dcollectionItem', **dc, 'saved': dc_saved, 'kind': dc_kind, 'sourceContract': {'drm': drm, 'msg': msg, 'agree': agree, 'authoredPublicPdfPath': path, 'authoredTargets': targets[:50]}})
            permitted = bool(path and drm == 'N' and msg in (None, ''))
            if permitted:
                pdf_url = urllib.parse.urljoin(str(dc.get('finalUrl') or dc_url), path)
                pdf = fetch(pdf_url, referer=str(dc.get('finalUrl') or dc_url), timeout=120, max_bytes=20_000_000)
                pdf_body = pdf.pop('body')
                pdf_saved, pdf_kind = save('ju-mikang-2014-fulltext', pdf, pdf_body)
                is_pdf = pdf_body.startswith(b'%PDF-')
                report['hops'].append({'name': 'publicPdf', **pdf, 'saved': pdf_saved, 'kind': pdf_kind, 'isPdf': is_pdf})
                if is_pdf:
                    (ROOT / 'candidate.pdf').write_bytes(pdf_body)
                    report['fullLengthPdfAcquired'] = True
                    report['pdfSha256'] = hashlib.sha256(pdf_body).hexdigest()
                    report['pdfBytes'] = len(pdf_body)
                    report['semanticDisposition'] = 'DIRECT_BODY_READY_FOR_RENDER_REVIEW'

if not report['fullLengthPdfAcquired']:
    report['semanticDisposition'] = 'ACCESS_BOUNDARY_ONLY_NO_BODY_LEVEL_DECISION'

(ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
