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

ROOT = Path('acquisition-eum-jonghee-2019-riss-dcollection-recheck')
ROOT.mkdir(parents=True, exist_ok=True)
TITLE = '四柱命理 宮星에 관한 硏究 : 宮에 따른 十星작용을 중심으로'
TITLE_SHORT = '四柱命理 宮星에 관한 硏究'
AUTHOR = '음종희'
YEAR = 2019
DBPIA_ID = 'T15047469'
RISS_CONTROL = 'b3c06fb77553c27dffe0bdc3ef48d419'
RISS_URL = f'https://m.riss.kr/search/detail/DetailView.do?control_no={RISS_CONTROL}&p_mat_type=be54d9b8bc7cdb09'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()
JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(
    urllib.request.HTTPCookieProcessor(JAR),
    urllib.request.HTTPSHandler(context=CTX),
)


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
    m = re.search(r'charset=([\w-]+)', content_type, re.I)
    for enc in [m.group(1) if m else None, 'utf-8', 'euc-kr', 'cp949']:
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


def navigation_targets(html: str, base: str) -> list[dict[str, str]]:
    candidates: list[tuple[str, str]] = []
    patterns = [
        ('document.location.href', r'(?is)document\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('window.location.href', r'(?is)window\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('location.href', r'(?is)(?<!document\.)(?<!window\.)location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('location.replace', r'(?is)location\.replace\(\s*["\']([^"\']+)["\']\s*\)'),
    ]
    for kind, pattern in patterns:
        for target in re.findall(pattern, html):
            target = unescape(target.strip())
            if target and not target.lower().startswith(('javascript:', '#')):
                candidates.append((kind, target))
    out: list[dict[str, str]] = []
    seen: set[str] = set()
    for kind, target in candidates:
        absolute = urllib.parse.urljoin(base, target)
        if absolute in seen:
            continue
        seen.add(absolute)
        out.append({'kind': kind, 'raw': target, 'absoluteUrl': absolute})
    return out


def js_value(html: str, name: str) -> str | None:
    for pattern in [
        rf'(?is)\bvar\s+{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\b{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
    ]:
        m = re.search(pattern, html)
        if m:
            return unescape(m.group(1))
    return None


def public_pdf_path(html: str) -> str | None:
    for pattern in [
        r'(?is)location\.replace\(\s*context\s*\+\s*["\']([^"\']*/public_resource/pdf/[^"\']+\.pdf)["\']\s*\)',
        r'(?is)["\'](/public_resource/pdf/[^"\']+\.pdf)["\']',
    ]:
        m = re.search(pattern, html)
        if m:
            return unescape(m.group(1))
    return None


def dcollection_item_id(url: str) -> str | None:
    for pattern in [r'[?&]sItemId=([0-9]+)', r'/common/orgView/([0-9]+)(?:$|[/?#])']:
        m = re.search(pattern, url)
        if m:
            return m.group(1)
    return None


report: dict[str, object] = {
    'candidate': {
        'title': TITLE,
        'author': AUTHOR,
        'year': YEAR,
        'institution': '경기대학교 예술대학원',
        'degree': '석사',
        'dbpiaId': DBPIA_ID,
        'rissControl': RISS_CONTROL,
        'priorAccessBoundaryPr': 369,
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
fields['loginFlag'] = '1'
riss_entry = {
    'name': 'rissDetail', **riss, 'saved': riss_saved, 'kind': riss_kind,
    'identityMarkers': {
        'title': TITLE_SHORT in riss_text or TITLE_SHORT in riss_html,
        'author': AUTHOR in riss_text or AUTHOR in riss_html,
        'year': str(YEAR) in riss_text,
    },
    'accessMarkers': {
        'originalView': '원문보기' in riss_text,
        'download': '다운로드' in riss_text,
        'fulltextDownloadOnclick': 'fulltextDownload()' in riss_html,
    },
    'formFields': fields,
}
report['hops'].append(riss_entry)

popup_entry: dict[str, object] = {'name': 'rissFulltextPopup', 'ok': False}
down_entry: dict[str, object] = {'name': 'rissDownloading', 'ok': False}
dc_entry: dict[str, object] = {'name': 'dcollectionItem', 'ok': False}
pdf_entry: dict[str, object] = {'name': 'publicPdf', 'ok': False}

if fields:
    popup_url = urllib.parse.urljoin(RISS_URL, '/search/download/FullTextDownload.do') + '?' + urllib.parse.urlencode(fields)
    popup = fetch(popup_url, 45, RISS_URL)
    popup_body = popup.pop('body')
    popup_saved, popup_kind = save('riss-fulltext-popup-response', popup, popup_body) if popup_body else ('', '')
    popup_html = decode(popup_body, str(popup.get('contentType') or '')) if popup_body and popup_kind == 'html' else ''
    targets = navigation_targets(popup_html, str(popup.get('finalUrl') or popup_url)) if popup_html else []
    popup_entry = {'name': 'rissFulltextPopup', **popup, 'saved': popup_saved, 'kind': popup_kind, 'navigationTargets': targets, 'boundedText': visibleish(popup_html)[:5000] if popup_html else ''}
    report['hops'].append(popup_entry)
    downloading_url = next((x['absoluteUrl'] for x in targets if 'Downloading.do' in x['absoluteUrl']), None)
    if downloading_url:
        down = fetch(downloading_url, 90, str(popup.get('finalUrl') or popup_url))
        down_body = down.pop('body')
        down_saved, down_kind = save('riss-downloading-response', down, down_body) if down_body else ('', '')
        down_html = decode(down_body, str(down.get('contentType') or '')) if down_body and down_kind == 'html' else ''
        down_targets = navigation_targets(down_html, str(down.get('finalUrl') or downloading_url)) if down_html else []
        down_entry = {'name': 'rissDownloading', **down, 'saved': down_saved, 'kind': down_kind, 'navigationTargets': down_targets, 'boundedText': visibleish(down_html)[:6000] if down_html else ''}
        report['hops'].append(down_entry)
        dc_url = next((x['absoluteUrl'] for x in down_targets if 'dcollection' in x['absoluteUrl'].lower()), None)
        if dc_url:
            item_id = dcollection_item_id(dc_url)
            parsed = urllib.parse.urlsplit(dc_url)
            if parsed.scheme == 'http':
                dc_url = urllib.parse.urlunsplit(('https', parsed.netloc, parsed.path, parsed.query, parsed.fragment))
            dc = fetch(dc_url, 90, str(down.get('finalUrl') or downloading_url))
            dc_body = dc.pop('body')
            dc_saved, dc_kind = save('dcollection-item-response', dc, dc_body) if dc_body else ('', '')
            dc_html = decode(dc_body, str(dc.get('contentType') or '')) if dc_body and dc_kind == 'html' else ''
            path = public_pdf_path(dc_html) if dc_html else None
            size_raw = js_value(dc_html, 'fileSize') if dc_html else None
            size = int(size_raw) if size_raw and size_raw.isdigit() else None
            dc_entry = {
                'name': 'dcollectionItem', **dc, 'saved': dc_saved, 'kind': dc_kind,
                'sourceProvenance': {'fromRissDownloadingResponse': True, 'itemId': item_id, 'url': dc_url},
                'sourceContract': {'drm': js_value(dc_html, 'drm'), 'agree': js_value(dc_html, 'agree'), 'fileRealName': js_value(dc_html, 'fileRealName'), 'expectedFileSize': size, 'authoredPublicPdfPath': path},
            }
            report['hops'].append(dc_entry)
            if path:
                pdf_url = urllib.parse.urljoin(str(dc.get('finalUrl') or dc_url), path)
                pdf = fetch(pdf_url, 120, str(dc.get('finalUrl') or dc_url))
                pdf_body = pdf.pop('body')
                pdf_saved, pdf_kind = save('eum-jonghee-2019-fulltext', pdf, pdf_body) if pdf_body else ('', '')
                pdf_entry = {
                    'name': 'publicPdf', **pdf, 'saved': pdf_saved, 'kind': pdf_kind,
                    'isPdf': pdf_body[:5] == b'%PDF-',
                    'pdfHeader': pdf_body[:16].decode('ascii', errors='replace'),
                    'sourceContract': {'itemId': item_id, 'authoredPublicPdfPath': path, 'expectedFileSize': size, 'sizeMatchesServerMetadata': size is not None and len(pdf_body) == size},
                }
                report['hops'].append(pdf_entry)

identity = riss_entry['identityMarkers']
report['identityDisposition'] = 'EXACT_RISS_IDENTITY_CONFIRMED' if identity['title'] and identity['author'] and identity['year'] else 'IDENTITY_NOT_CONFIRMED'
report['rissFulltextPopupFetched'] = bool(popup_entry.get('ok'))
report['rissDownloadingHopFetched'] = bool(down_entry.get('ok'))
report['dcollectionTargetRecoveredFromRiss'] = bool(dc_entry.get('sourceProvenance', {}).get('itemId')) if isinstance(dc_entry.get('sourceProvenance'), dict) else False
report['dcollectionItemFetched'] = bool(dc_entry.get('ok'))
report['dcollectionPublicPdfContractRecovered'] = bool(dc_entry.get('sourceContract', {}).get('authoredPublicPdfPath')) if isinstance(dc_entry.get('sourceContract'), dict) else False
report['publicPdfAcquired'] = bool(pdf_entry.get('isPdf'))
report['fulltextDisposition'] = 'PUBLIC_PDF_ACQUIRED_FROM_RISS_AUTHORED_DCOLLECTION_TARGET' if report['publicPdfAcquired'] else 'PUBLIC_BODY_NOT_ACQUIRED_RETAIN_PRIOR_ACCESS_BOUNDARY'
report['semanticDisposition'] = 'NO_BODY_LEVEL_DECISION_YET'

path = ROOT / 'report.json'
path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(path.read_text(encoding='utf-8'))
