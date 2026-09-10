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

ROOT = Path('acquisition-jeon-suhyun-2016')
ROOT.mkdir(parents=True, exist_ok=True)
RISS_CONTROL = '648380763c455520ffe0bdc3ef48d419'
RISS_URL = f'https://m.riss.kr/search/detail/DetailView.do?control_no={RISS_CONTROL}&p_mat_type=be54d9b8bc7cdb09'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()
COOKIE_JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(
    urllib.request.HTTPCookieProcessor(COOKIE_JAR),
    urllib.request.HTTPSHandler(context=CTX),
)


def fetch(url: str, referer: str | None = None, timeout: int = 60) -> dict[str, object]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
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
    except Exception as exc:  # noqa: BLE001
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


def form_fields(html: str, name: str) -> dict[str, str]:
    form = re.search(rf'(?is)<form\b[^>]*\bname=["\']{re.escape(name)}["\'][^>]*>(.*?)</form>', html)
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


def authored_navigation_targets(html: str, base: str) -> list[dict[str, str]]:
    candidates: list[tuple[str, str]] = []
    patterns = [
        ('document.location.href', r'(?is)document\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('window.location.href', r'(?is)window\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('location.href', r'(?is)(?<!document\.)(?<!window\.)location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('meta-refresh', r'(?is)<meta[^>]+http-equiv=["\']?refresh["\']?[^>]+content=["\'][^"\']*url=([^"\';>]+)'),
        ('iframe-src', r'(?is)<iframe[^>]+src=["\']([^"\']+)["\']'),
        ('frame-src', r'(?is)<frame[^>]+src=["\']([^"\']+)["\']'),
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


def persist(prefix: str, result: dict[str, object], body: bytes) -> tuple[str, str]:
    is_pdf = body[:5] == b'%PDF-'
    content_type = str(result.get('contentType') or '').lower()
    if is_pdf:
        suffix = 'pdf'
    elif 'html' in content_type or b'<html' in body[:4096].lower() or b'<!doctype' in body[:4096].lower():
        suffix = 'html'
    else:
        suffix = 'bin'
    path = ROOT / f'{prefix}.{suffix}'
    path.write_bytes(body)
    return str(path), suffix


report: dict[str, object] = {
    'candidate': {'author': '전수현', 'year': 2016, 'rissControl': RISS_CONTROL},
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlyServerAuthoredValuesUsed': True,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
    },
    'hops': [],
}

# Hop 1: exact RISS detail page.
detail = fetch(RISS_URL, timeout=30)
detail_body = detail.pop('body')
detail_path, detail_kind = persist('follow-detail', detail, detail_body) if detail_body else ('', '')
detail_html = decode(detail_body, str(detail.get('contentType') or '')) if detail_body else ''
fields = form_fields(detail_html, 'f')
fields['loginFlag'] = '1'
report['hops'].append({'name': 'detail', **detail, 'saved': detail_path,
                       'kind': detail_kind, 'formFields': fields})

# Hop 2: exact site-authored fulltextDownload() popup request.
popup_url = urllib.parse.urljoin(RISS_URL, '/search/download/FullTextDownload.do') + '?' + urllib.parse.urlencode(fields)
popup = fetch(popup_url, referer=RISS_URL, timeout=30)
popup_body = popup.pop('body')
popup_path, popup_kind = persist('follow-popup', popup, popup_body) if popup_body else ('', '')
popup_html = decode(popup_body, str(popup.get('contentType') or '')) if popup_body else ''
popup_targets = authored_navigation_targets(popup_html, str(popup.get('finalUrl') or popup_url))
report['hops'].append({'name': 'fulltextPopup', **popup, 'saved': popup_path,
                       'kind': popup_kind, 'navigationTargets': popup_targets,
                       'boundedText': visibleish(popup_html)[:6000] if popup_html else ''})

# Hop 3: the first navigation target is emitted directly by the popup itself.
# No identifier is guessed or synthesized here.
download_result: dict[str, object] | None = None
if popup_targets:
    target = popup_targets[0]['absoluteUrl']
    downloading = fetch(target, referer=str(popup.get('finalUrl') or popup_url), timeout=90)
    downloading_body = downloading.pop('body')
    downloading_path, downloading_kind = persist('follow-downloading', downloading, downloading_body) if downloading_body else ('', '')
    downloading_html = decode(downloading_body, str(downloading.get('contentType') or '')) if downloading_body and downloading_kind == 'html' else ''
    next_targets = authored_navigation_targets(downloading_html, str(downloading.get('finalUrl') or target)) if downloading_html else []
    download_result = {
        'name': 'downloading', **downloading, 'saved': downloading_path,
        'kind': downloading_kind,
        'navigationTargets': next_targets,
        'boundedText': visibleish(downloading_html)[:12000] if downloading_html else '',
    }
    report['hops'].append(download_result)

report['popupNavigationContractRecovered'] = bool(popup_targets)
report['downloadingHopFetched'] = bool(download_result and download_result.get('ok'))
report['publicPdfAcquired'] = bool(download_result and download_result.get('kind') == 'pdf')
report['finalObservedUrl'] = download_result.get('finalUrl') if download_result else popup.get('finalUrl')
report['finalObservedContentType'] = download_result.get('contentType') if download_result else popup.get('contentType')
report['finalObservedBytes'] = download_result.get('bytes') if download_result else popup.get('bytes')
report['fulltextDisposition'] = (
    'PUBLIC_PDF_ACQUIRED_FROM_SITE_AUTHORED_CHAIN'
    if report['publicPdfAcquired']
    else 'SITE_AUTHORED_DOWNLOADING_HOP_REACHED_PENDING_NEXT_CONTRACT_INSPECTION'
)

out = ROOT / 'follow-report.json'
out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(out.read_text(encoding='utf-8'))
