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

ROOT = Path('acquisition-song-sangseop-2022-riss-dispatcher-recheck')
ROOT.mkdir(parents=True, exist_ok=True)
TITLE = '命理學의 六親論 硏究 : -滴天隨闡微를 中心으로-'
TITLE_SHORT = '命理學의 六親論 硏究'
AUTHOR = '송상섭'
YEAR = 2022
RISS_ID = 'T16377357'
RISS_CONTROL = '6188af0cf49b0838ffe0bdc3ef48d419'
RISS_URL = f'https://m.riss.kr/search/detail/DetailView.do?control_no={RISS_CONTROL}&p_mat_type=be54d9b8bc7cdb09'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()
JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(JAR), urllib.request.HTTPSHandler(context=CTX))


def fetch(url: str, timeout: int = 30, referer: str | None = None) -> dict[str, object]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    req = urllib.request.Request(url, headers=headers)
    try:
        with OPENER.open(req, timeout=timeout) as resp:
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
        return {
            'ok': False,
            'status': None,
            'finalUrl': url,
            'contentType': '',
            'contentDisposition': '',
            'bytes': 0,
            'sha256': None,
            'body': b'',
            'error': f'{type(exc).__name__}: {exc}',
        }


def decode(body: bytes, content_type: str = '') -> str:
    match = re.search(r'charset=([\w-]+)', content_type, re.I)
    for enc in [match.group(1) if match else None, 'utf-8', 'euc-kr', 'cp949']:
        if not enc:
            continue
        try:
            return body.decode(enc)
        except (UnicodeDecodeError, LookupError):
            pass
    return body.decode('utf-8', errors='replace')


def visibleish(html: str) -> str:
    text = re.sub(r'(?is)<script\b.*?</script>', ' ', html)
    text = re.sub(r'(?is)<style\b.*?</style>', ' ', text)
    text = re.sub(r'(?s)<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', unescape(text)).strip()


def save(prefix: str, result: dict[str, object], body: bytes) -> tuple[str, str]:
    content_type = str(result.get('contentType') or '').lower()
    if body[:5] == b'%PDF-':
        suffix = 'pdf'
    elif 'html' in content_type or b'<html' in body[:4096].lower() or b'<!doctype' in body[:4096].lower():
        suffix = 'html'
    elif 'javascript' in content_type or prefix.endswith('js'):
        suffix = 'js'
    else:
        suffix = 'bin'
    path = ROOT / f'{prefix}.{suffix}'
    path.write_bytes(body)
    return str(path), suffix


def exact_form_fields(html: str) -> dict[str, str]:
    form = re.search(r'(?is)<form\b[^>]*\bname=["\']f["\'][^>]*>(.*?)</form>', html)
    if not form:
        return {}
    fields: dict[str, str] = {}
    for tag in re.findall(r'(?is)<input\b[^>]*>', form.group(1)):
        nm = re.search(r'(?is)\bname\s*=\s*["\']([^"\']+)["\']', tag)
        if not nm:
            continue
        vm = re.search(r'(?is)\bvalue\s*=\s*["\']([^"\']*)["\']', tag)
        fields[unescape(nm.group(1))] = unescape(vm.group(1)) if vm else ''
    return fields


def input_value(html: str, name: str) -> str | None:
    for tag in re.findall(r'(?is)<input\b[^>]*>', html):
        nm = re.search(r'(?is)\bname\s*=\s*["\']([^"\']+)["\']', tag)
        if not nm or unescape(nm.group(1)) != name:
            continue
        vm = re.search(r'(?is)\bvalue\s*=\s*["\']([^"\']*)["\']', tag)
        return unescape(vm.group(1)) if vm else ''
    return None


def navigation_targets(html: str, base: str) -> list[dict[str, str]]:
    candidates: list[tuple[str, str]] = []
    for kind, pattern in [
        ('document.location.href', r'(?is)document\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('window.location.href', r'(?is)window\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('location.href', r'(?is)(?<!document\.)(?<!window\.)location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('location.replace', r'(?is)location\.replace\(\s*["\']([^"\']+)["\']\s*\)'),
    ]:
        for target in re.findall(pattern, html):
            target = unescape(target.strip())
            if target and not target.lower().startswith(('javascript:', '#')):
                candidates.append((kind, target))
    out: list[dict[str, str]] = []
    seen: set[str] = set()
    for kind, target in candidates:
        absolute = urllib.parse.urljoin(base, target)
        if absolute not in seen:
            seen.add(absolute)
            out.append({'kind': kind, 'raw': target, 'absoluteUrl': absolute})
    return out


def js_value(html: str, name: str) -> str | None:
    for pattern in [
        rf'(?is)\b(?:var|let|const)\s+{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\b{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
    ]:
        match = re.search(pattern, html)
        if match:
            return unescape(match.group(1))
    return None


def active_public_pdf_path(html: str) -> str | None:
    for raw_line in html.splitlines():
        line = raw_line.strip()
        if not line or line.startswith('//'):
            continue
        match = re.search(r"location\.replace\(\s*['\"](/public_resource/pdf/[^'\"]+\.pdf)['\"]\s*\+\s*sPage", line)
        if match:
            return unescape(match.group(1))
    return None


def item_id(url: str) -> str | None:
    for pattern in [r'[?&]sItemId=([0-9]+)', r'/common/orgView/([0-9]+)(?:$|[/?#])']:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


report: dict[str, object] = {
    'candidate': {
        'title': TITLE,
        'author': AUTHOR,
        'year': YEAR,
        'institution': '원광대학교 일반대학원',
        'degree': '박사',
        'rissId': RISS_ID,
        'rissControl': RISS_CONTROL,
        'priorAccessBoundaryPr': 374,
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlySiteAuthoredPublicRoutesInspected': True,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
    },
    'hops': [],
}

riss = fetch(RISS_URL, 30)
riss_body = riss.pop('body')
riss_saved, riss_kind = save('riss-detail-response', riss, riss_body) if riss_body else ('', '')
riss_html = decode(riss_body, str(riss.get('contentType') or '')) if riss_body else ''
riss_text = visibleish(riss_html) if riss_html else ''
fields = exact_form_fields(riss_html)

script_srcs = [unescape(src) for src in re.findall(r'(?is)<script\b[^>]*\bsrc=["\']([^"\']+)["\']', riss_html)]
search_common_url = next((urllib.parse.urljoin(RISS_URL, src) for src in script_srcs if 'searchCommon.js' in src), None)
dispatcher_verified = False
if search_common_url:
    js = fetch(search_common_url, 30, RISS_URL)
    js_body = js.pop('body')
    js_saved, js_kind = save('riss-search-common-js', js, js_body) if js_body else ('', '')
    js_text = decode(js_body, str(js.get('contentType') or '')) if js_body else ''
    dispatcher_verified = bool(
        re.search(r'function\s+fulltextDownload\s*\(', js_text)
        and re.search(r'loginFlag\.value\s*=\s*["\']1["\']', js_text)
        and 'FullTextDownload.do' in js_text
    )
    report['hops'].append({
        'name': 'searchCommonJs', **js, 'saved': js_saved, 'kind': js_kind,
        'authoredByDetailPage': True,
        'globalFulltextDownloadFound': bool(re.search(r'function\s+fulltextDownload\s*\(', js_text)),
        'loginFlagOneObserved': bool(re.search(r'loginFlag\.value\s*=\s*["\']1["\']', js_text)),
        'dispatcherRouteObserved': 'FullTextDownload.do' in js_text,
    })

identity_markers = {
    'title': TITLE_SHORT in riss_text or TITLE_SHORT in riss_html,
    'author': AUTHOR in riss_text or AUTHOR in riss_html,
    'year': str(YEAR) in riss_text,
}
report['hops'].insert(0, {
    'name': 'rissDetail', **riss, 'saved': riss_saved, 'kind': riss_kind,
    'identityMarkers': identity_markers,
    'formFields': fields,
    'dispatcherContractVerifiedFromPageAuthoredScript': dispatcher_verified,
})

popup_entry: dict[str, object] = {'name': 'rissFulltextPopup', 'ok': False}
down_entry: dict[str, object] = {'name': 'rissDownloading', 'ok': False}
dc_entry: dict[str, object] = {'name': 'dcollectionItem', 'ok': False}
pdf_entry: dict[str, object] = {'name': 'publicPdf', 'ok': False}

if fields and dispatcher_verified:
    fields['loginFlag'] = '1'
    popup_url = urllib.parse.urljoin(RISS_URL, '/search/download/FullTextDownload.do') + '?' + urllib.parse.urlencode(fields)
    popup = fetch(popup_url, 45, RISS_URL)
    popup_body = popup.pop('body')
    popup_saved, popup_kind = save('riss-fulltext-popup-response', popup, popup_body) if popup_body else ('', '')
    popup_html = decode(popup_body, str(popup.get('contentType') or '')) if popup_body and popup_kind == 'html' else ''
    targets = navigation_targets(popup_html, str(popup.get('finalUrl') or popup_url)) if popup_html else []
    popup_entry = {'name': 'rissFulltextPopup', **popup, 'saved': popup_saved, 'kind': popup_kind, 'navigationTargets': targets, 'boundedText': visibleish(popup_html)[:4000] if popup_html else ''}
    report['hops'].append(popup_entry)
    downloading_url = next((x['absoluteUrl'] for x in targets if 'Downloading.do' in x['absoluteUrl']), None)
    if downloading_url:
        down = fetch(downloading_url, 90, str(popup.get('finalUrl') or popup_url))
        down_body = down.pop('body')
        down_saved, down_kind = save('riss-downloading-response', down, down_body) if down_body else ('', '')
        down_html = decode(down_body, str(down.get('contentType') or '')) if down_body and down_kind == 'html' else ''
        down_targets = navigation_targets(down_html, str(down.get('finalUrl') or downloading_url)) if down_html else []
        down_entry = {'name': 'rissDownloading', **down, 'saved': down_saved, 'kind': down_kind, 'navigationTargets': down_targets, 'boundedText': visibleish(down_html)[:5000] if down_html else ''}
        report['hops'].append(down_entry)
        dc_url = next((x['absoluteUrl'] for x in down_targets if 'dcollection' in x['absoluteUrl'].lower()), None)
        if dc_url:
            recovered_item_id = item_id(dc_url)
            parsed = urllib.parse.urlsplit(dc_url)
            if parsed.scheme == 'http':
                dc_url = urllib.parse.urlunsplit(('https', parsed.netloc, parsed.path, parsed.query, parsed.fragment))
            dc = fetch(dc_url, 90, str(down.get('finalUrl') or downloading_url))
            dc_body = dc.pop('body')
            dc_saved, dc_kind = save('dcollection-item-response', dc, dc_body) if dc_body else ('', '')
            dc_html = decode(dc_body, str(dc.get('contentType') or '')) if dc_body and dc_kind == 'html' else ''
            path = active_public_pdf_path(dc_html) if dc_html else None
            drm = js_value(dc_html, 'drm') if dc_html else None
            agree = js_value(dc_html, 'agree') if dc_html else None
            msg = js_value(dc_html, 'msg') if dc_html else None
            size_raw = input_value(dc_html, 'fileSize') if dc_html else None
            expected_size = int(size_raw) if size_raw and size_raw.isdigit() else None
            non_drm_branch = bool(
                re.search(r"if\s*\(\s*!isAdmin\s*&&\s*!isStaff\s*&&\s*drm\s*==\s*['\"]Y['\"]\s*\)", dc_html)
                and path
                and drm == 'N'
            )
            dc_entry = {
                'name': 'dcollectionItem', **dc, 'saved': dc_saved, 'kind': dc_kind,
                'sourceProvenance': {'fromRissDownloadingResponse': True, 'itemId': recovered_item_id, 'url': dc_url},
                'sourceContract': {
                    'drm': drm,
                    'agree': agree,
                    'agreeVariablePresent': agree is not None,
                    'messageGateValue': msg,
                    'messageGateEmpty': msg == '',
                    'activeNonDrmPublicPdfRedirect': non_drm_branch,
                    'expectedFileSize': expected_size,
                    'authoredPublicPdfPath': path,
                },
            }
            report['hops'].append(dc_entry)
            if path and drm == 'N' and non_drm_branch and msg == '' and expected_size is not None:
                pdf_url = urllib.parse.urljoin(str(dc.get('finalUrl') or dc_url), path)
                pdf = fetch(pdf_url, 120, str(dc.get('finalUrl') or dc_url))
                pdf_body = pdf.pop('body')
                pdf_saved, pdf_kind = save('song-sangseop-2022-fulltext', pdf, pdf_body) if pdf_body else ('', '')
                pdf_entry = {
                    'name': 'publicPdf', **pdf, 'saved': pdf_saved, 'kind': pdf_kind,
                    'isPdf': pdf_body[:5] == b'%PDF-',
                    'pdfHeader': pdf_body[:16].decode('ascii', errors='replace'),
                    'sourceContract': {
                        'itemId': recovered_item_id,
                        'authoredPublicPdfPath': path,
                        'expectedFileSize': expected_size,
                        'sizeMatchesServerMetadata': len(pdf_body) == expected_size,
                    },
                }
                report['hops'].append(pdf_entry)

report['identityDisposition'] = 'EXACT_RISS_IDENTITY_CONFIRMED' if all(identity_markers.values()) else 'IDENTITY_NOT_CONFIRMED'
report['dispatcherContractVerified'] = dispatcher_verified
report['rissFulltextPopupFetched'] = bool(popup_entry.get('ok'))
report['rissDownloadingHopFetched'] = bool(down_entry.get('ok'))
report['dcollectionTargetRecoveredFromRiss'] = bool(dc_entry.get('sourceProvenance', {}).get('itemId')) if isinstance(dc_entry.get('sourceProvenance'), dict) else False
report['dcollectionItemFetched'] = bool(dc_entry.get('ok'))
report['dcollectionPublicPdfContractRecovered'] = bool(dc_entry.get('sourceContract', {}).get('activeNonDrmPublicPdfRedirect')) if isinstance(dc_entry.get('sourceContract'), dict) else False
report['publicPdfAcquired'] = bool(pdf_entry.get('isPdf'))
report['fulltextDisposition'] = 'PUBLIC_PDF_ACQUIRED_FROM_PAGE_AUTHORED_NON_DRM_DCOLLECTION_BRANCH' if report['publicPdfAcquired'] else 'PUBLIC_BODY_NOT_ACQUIRED_RETAIN_PRIOR_ACCESS_BOUNDARY'
report['semanticDisposition'] = 'NO_BODY_LEVEL_DECISION_YET'

report_path = ROOT / 'report.json'
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(report_path.read_text(encoding='utf-8'))
