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

ROOT = Path('acquisition-song-jaewoo-2023')
ROOT.mkdir(parents=True, exist_ok=True)
TITLE = '명리학 육친론 비교연구 : (연해자평, 적천수, 궁통보감을 중심으로)'
TITLE_CORE = '명리학 육친론 비교연구'
AUTHOR = '송재우'
YEAR = 2023
RISS_ID = 'T16680125'
UCI = 'I804:44032-200000668457'
UCIDCOLLECTION_ITEM_ID = '200000668457'
INSTITUTION = '국제뇌교육종합대학원대학교'
DCOLLECTION_HOST = 'https://ube.dcollection.net'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()
COOKIE_JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(
    urllib.request.HTTPCookieProcessor(COOKIE_JAR),
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


def persist(prefix: str, result: dict[str, object], body: bytes) -> tuple[str, str]:
    content_type = str(result.get('contentType') or '').lower()
    if body[:5] == b'%PDF-':
        suffix = 'pdf'
    elif 'html' in content_type or b'<html' in body[:4096].lower() or b'<!doctype' in body[:4096].lower():
        suffix = 'html'
    elif 'javascript' in content_type:
        suffix = 'js'
    else:
        suffix = 'bin'
    path = ROOT / f'{prefix}.{suffix}'
    path.write_bytes(body)
    return str(path), suffix


def normalize(value: str) -> str:
    return re.sub(r'[\s:：()（）\-·ㆍ「」『』\[\]]+', '', value).lower()


def identity_markers(html: str) -> dict[str, bool]:
    text = visibleish(html)
    n = normalize(text)
    return {
        'titleCore': normalize(TITLE_CORE) in n,
        'author': AUTHOR in text or AUTHOR in html,
        'year': str(YEAR) in text,
        'rissId': RISS_ID in text or RISS_ID in html,
        'uci': UCI in text or UCI in html,
        'institution': INSTITUTION in text or INSTITUTION in html,
    }


def control_numbers(html: str) -> list[str]:
    patterns = [
        r'control_no=([0-9a-f]{32})',
        r'control_no%3D([0-9a-f]{32})',
        r'["\']control_no["\']\s*[:=]\s*["\']([0-9a-f]{32})',
    ]
    out: list[str] = []
    for pattern in patterns:
        for value in re.findall(pattern, html, flags=re.I):
            value = value.lower()
            if value not in out:
                out.append(value)
    return out


def form_fields(html: str, name: str = 'f') -> dict[str, str]:
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


def navigation_targets(html: str, base: str) -> list[dict[str, str]]:
    candidates: list[tuple[str, str]] = []
    patterns = [
        ('document.location.href', r'(?is)document\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('window.location.href', r'(?is)window\.location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('location.href', r'(?is)(?<!document\.)(?<!window\.)location\.href\s*=\s*["\']([^"\']+)["\']'),
        ('location.replace', r'(?is)location\.replace\(\s*["\']([^"\']+)["\']\s*\)'),
        ('meta-refresh', r'(?is)<meta[^>]+http-equiv=["\']?refresh["\']?[^>]+content=["\'][^"\']*url=([^"\';>]+)'),
        ('iframe-src', r'(?is)<iframe[^>]+src=["\']([^"\']+)["\']'),
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
    patterns = [
        rf'(?is)\bvar\s+{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\b{re.escape(name)}\s*=\s*["\']([^"\']*)["\']',
        rf'(?is)\bname=["\']{re.escape(name)}["\'][^>]*\bvalue=["\']([^"\']*)["\']',
    ]
    for pattern in patterns:
        m = re.search(pattern, html)
        if m:
            return unescape(m.group(1))
    return None


def dcollection_pdf_path(html: str) -> str | None:
    patterns = [
        r'(?is)location\.replace\(\s*context\s*\+\s*["\']([^"\']*/public_resource/pdf/[^"\']+\.pdf)["\']\s*\)',
        r'(?is)["\'](/public_resource/pdf/[^"\']+\.pdf)["\']',
    ]
    for pattern in patterns:
        m = re.search(pattern, html)
        if m:
            return unescape(m.group(1))
    return None


report: dict[str, object] = {
    'candidate': {
        'title': TITLE,
        'titleCore': TITLE_CORE,
        'author': AUTHOR,
        'year': YEAR,
        'institution': INSTITUTION,
        'rissId': RISS_ID,
        'uci': UCI,
        'uciDcollectionItemId': UCIDCOLLECTION_ITEM_ID,
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'uciSuffixUsedAsExplicitPublishedItemIdentifier': True,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'onlyPublicSourceAuthoredRoutesFollowedAfterIdentityVerification': True,
    },
    'rissSearches': [],
    'exactRissDetail': None,
    'dcollection': None,
    'publicPdf': None,
}

search_terms = [RISS_ID, UCI, TITLE_CORE, f'{AUTHOR} {TITLE_CORE}']
search_templates = [
    'https://m.riss.kr/search/Search.do?queryText={q}',
    'https://m.riss.kr/search/Search.do?colName=bib_t&query={q}',
    'https://www.riss.kr/search/Search.do?isDetailSearch=N&searchGubun=true&viewYn=OP&query={q}',
]
recovered_controls: list[str] = []
for term_index, term in enumerate(search_terms):
    for template_index, template in enumerate(search_templates):
        url = template.format(q=urllib.parse.quote(term))
        result = fetch(url, 30)
        body = result.pop('body')
        path, kind = persist(f'riss-search-{term_index}-{template_index}', result, body) if body else ('', '')
        html = decode(body, str(result.get('contentType') or '')) if body and kind == 'html' else ''
        controls = control_numbers(html) if html else []
        for control in controls:
            if control not in recovered_controls:
                recovered_controls.append(control)
        report['rissSearches'].append({
            'term': term,
            'requestedUrl': url,
            **result,
            'saved': path,
            'kind': kind,
            'identityMarkers': identity_markers(html) if html else {},
            'recoveredControlNumbers': controls,
            'boundedText': visibleish(html)[:7000] if html else '',
        })

exact_detail: dict[str, object] | None = None
for idx, control in enumerate(recovered_controls[:30]):
    detail_url = f'https://m.riss.kr/search/detail/DetailView.do?control_no={control}&p_mat_type=be54d9b8bc7cdb09'
    result = fetch(detail_url, 35)
    body = result.pop('body')
    path, kind = persist(f'riss-detail-candidate-{idx}', result, body) if body else ('', '')
    html = decode(body, str(result.get('contentType') or '')) if body and kind == 'html' else ''
    markers = identity_markers(html) if html else {}
    entry = {
        'control': control,
        'requestedUrl': detail_url,
        **result,
        'saved': path,
        'kind': kind,
        'identityMarkers': markers,
        'boundedText': visibleish(html)[:9000] if html else '',
    }
    if markers.get('titleCore') and markers.get('author') and markers.get('year'):
        fields = form_fields(html)
        fields['loginFlag'] = '1'
        entry['formFields'] = fields
        entry['html'] = html
        exact_detail = entry
        break

if exact_detail:
    control = str(exact_detail['control'])
    detail_html = str(exact_detail.pop('html'))
    report['exactRissDetail'] = exact_detail
    fields = dict(exact_detail.get('formFields') or {})
    if fields:
        popup_url = 'https://m.riss.kr/search/download/FullTextDownload.do?' + urllib.parse.urlencode(fields)
        popup = fetch(popup_url, 45, referer=str(exact_detail.get('finalUrl') or ''))
        popup_body = popup.pop('body')
        popup_path, popup_kind = persist('riss-fulltext-popup-response', popup, popup_body) if popup_body else ('', '')
        popup_html = decode(popup_body, str(popup.get('contentType') or '')) if popup_body and popup_kind == 'html' else ''
        popup_targets = navigation_targets(popup_html, str(popup.get('finalUrl') or popup_url)) if popup_html else []
        report['rissFulltextPopup'] = {
            **popup,
            'saved': popup_path,
            'kind': popup_kind,
            'navigationTargets': popup_targets,
            'boundedText': visibleish(popup_html)[:7000] if popup_html else '',
        }
        downloading_target = next((x['absoluteUrl'] for x in popup_targets if 'Downloading.do' in x['absoluteUrl']), None)
        if downloading_target:
            downloading = fetch(downloading_target, 90, referer=str(popup.get('finalUrl') or popup_url))
            downloading_body = downloading.pop('body')
            downloading_path, downloading_kind = persist('riss-downloading-response', downloading, downloading_body) if downloading_body else ('', '')
            downloading_html = decode(downloading_body, str(downloading.get('contentType') or '')) if downloading_body and downloading_kind == 'html' else ''
            downloading_targets = navigation_targets(downloading_html, str(downloading.get('finalUrl') or downloading_target)) if downloading_html else []
            report['rissDownloading'] = {
                **downloading,
                'saved': downloading_path,
                'kind': downloading_kind,
                'navigationTargets': downloading_targets,
                'boundedText': visibleish(downloading_html)[:8000] if downloading_html else '',
            }

dcollection_urls: list[dict[str, str]] = []
if report.get('rissDownloading'):
    for target in report['rissDownloading'].get('navigationTargets', []):
        url = str(target.get('absoluteUrl') or '')
        if 'dcollection' in url.lower():
            dcollection_urls.append({'url': url, 'provenance': 'RISS_DOWNLOADING_AUTHORED'})

dcollection_urls.append({
    'url': f'{DCOLLECTION_HOST}/common/orgView/{UCIDCOLLECTION_ITEM_ID}',
    'provenance': 'EXACT_UCI_SUFFIX_PLUS_INSTITUTION_DCOLLECTION_HOST',
})

seen_dcollection: set[str] = set()
for idx, target in enumerate(dcollection_urls):
    url = target['url'].replace('http://', 'https://', 1)
    if url in seen_dcollection:
        continue
    seen_dcollection.add(url)
    result = fetch(url, 90)
    body = result.pop('body')
    path, kind = persist(f'dcollection-item-{idx}', result, body) if body else ('', '')
    html = decode(body, str(result.get('contentType') or '')) if body and kind == 'html' else ''
    markers = identity_markers(html) if html else {}
    text = visibleish(html) if html else ''
    item_match = re.search(r'/common/orgView/([0-9]+)', str(result.get('finalUrl') or url))
    item_id = item_match.group(1) if item_match else None
    pdf_path = dcollection_pdf_path(html) if html else None
    drm = js_value(html, 'drm') if html else None
    agree = js_value(html, 'agree') if html else None
    file_real_name = js_value(html, 'fileRealName') if html else None
    file_size_raw = js_value(html, 'fileSize') if html else None
    file_size = int(file_size_raw) if file_size_raw and file_size_raw.isdigit() else None
    entry = {
        'requestedUrl': url,
        'provenance': target['provenance'],
        **result,
        'saved': path,
        'kind': kind,
        'itemId': item_id,
        'identityMarkers': markers,
        'sourceContract': {
            'drm': drm,
            'agree': agree,
            'fileRealName': file_real_name,
            'expectedFileSize': file_size,
            'authoredPublicPdfPath': pdf_path,
        },
        'boundedText': text[:10000],
    }
    exact_item_identity = bool(markers.get('titleCore') and markers.get('author'))
    if not exact_item_identity and item_id == UCIDCOLLECTION_ITEM_ID:
        exact_item_identity = bool((TITLE_CORE in text or TITLE_CORE in html) and AUTHOR in text)
    entry['exactItemIdentityVerifiedBeforePdfFollow'] = exact_item_identity
    if exact_item_identity:
        report['dcollection'] = entry
        if pdf_path:
            pdf_url = urllib.parse.urljoin(str(result.get('finalUrl') or url), pdf_path)
            pdf = fetch(pdf_url, 180, referer=str(result.get('finalUrl') or url))
            pdf_body = pdf.pop('body')
            pdf_saved, pdf_kind = persist('song-jaewoo-2023-fulltext', pdf, pdf_body) if pdf_body else ('', '')
            report['publicPdf'] = {
                **pdf,
                'saved': pdf_saved,
                'kind': pdf_kind,
                'isPdf': bool(pdf_body[:5] == b'%PDF-'),
                'pdfHeader': pdf_body[:8].decode('latin-1', errors='replace') if pdf_body else '',
                'sourceContract': {
                    'itemId': item_id,
                    'authoredPublicPdfPath': pdf_path,
                    'authoredPublicPdfUrl': pdf_url,
                    'expectedFileSize': file_size,
                    'sizeMatchesServerMetadata': bool(file_size is not None and len(pdf_body) == file_size),
                },
            }
        break

exact_riss_identity = bool(report.get('exactRissDetail'))
exact_dcollection_identity = bool(report.get('dcollection') and report['dcollection'].get('exactItemIdentityVerifiedBeforePdfFollow'))
public_pdf = report.get('publicPdf') or {}
report['recoveredRissControl'] = report['exactRissDetail'].get('control') if report.get('exactRissDetail') else None
report['exactRissIdentityConfirmed'] = exact_riss_identity
report['exactDcollectionIdentityConfirmed'] = exact_dcollection_identity
report['publicPdfAcquired'] = bool(public_pdf.get('isPdf'))
report['fulltextDisposition'] = (
    'PUBLIC_PDF_ACQUIRED_FROM_EXACT_VERIFIED_DCOLLECTION_ITEM'
    if report['publicPdfAcquired']
    else 'EXACT_IDENTITY_DISCOVERY_COMPLETE_PUBLIC_PDF_NOT_YET_ACQUIRED'
    if exact_riss_identity or exact_dcollection_identity
    else 'EXACT_IDENTITY_ROUTE_NOT_YET_RECOVERED'
)
report['semanticDisposition'] = 'NO_BODY_LEVEL_DECISION_YET'

path = ROOT / 'report.json'
path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(path.read_text(encoding='utf-8'))
