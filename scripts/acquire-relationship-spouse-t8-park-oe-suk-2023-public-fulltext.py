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

ROOT = Path('acquisition-park-oe-suk-2023')
ROOT.mkdir(parents=True, exist_ok=True)
TITLE = '四柱命理學 古典에 나타난 六親의 原理와 關係에 대한 硏究'
AUTHOR = '박외숙'
YEAR = 2023
RISS_ID = 'T16818829'
RISS_CONTROL = 'b4338a3915d9039bffe0bdc3ef48d419'
NANET_CONTROL = 'KDMT12023000053361'
RISS_URL = f'https://m.riss.kr/search/detail/DetailView.do?control_no={RISS_CONTROL}&p_mat_type=be54d9b8bc7cdb09'
NANET_URL = f'https://dl.nanet.go.kr/detail/{NANET_CONTROL}'
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
    elif 'javascript' in content_type or prefix.endswith('script'):
        suffix = 'js'
    else:
        suffix = 'bin'
    path = ROOT / f'{prefix}.{suffix}'
    path.write_bytes(body)
    return str(path), suffix


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
        'author': AUTHOR,
        'year': YEAR,
        'institution': '경기대학교 대학원',
        'department': '동양문화학과',
        'degree': '박사',
        'pages': 'vi, 190 p.',
        'rissId': RISS_ID,
        'rissControl': RISS_CONTROL,
        'nanetControl': NANET_CONTROL,
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
riss_path, riss_kind = persist('riss-detail-response', riss, riss_body) if riss_body else ('', '')
riss_html = decode(riss_body, str(riss.get('contentType') or '')) if riss_body else ''
riss_text = visibleish(riss_html) if riss_html else ''
riss_fields = form_fields(riss_html)
riss_fields['loginFlag'] = '1'
riss_entry: dict[str, object] = {
    'name': 'rissDetail',
    **riss,
    'saved': riss_path,
    'kind': riss_kind,
    'identityMarkers': {
        'titleExact': TITLE in riss_text or TITLE in riss_html,
        'authorExact': AUTHOR in riss_text or AUTHOR in riss_html,
        'year': str(YEAR) in riss_text,
        'rissId': RISS_ID in riss_html,
    },
    'accessMarkers': {
        'originalView': '원문보기' in riss_text,
        'download': '다운로드' in riss_text,
        'fulltextDownloadOnclick': 'fulltextDownload()' in riss_html,
    },
    'formFields': riss_fields,
}
report['hops'].append(riss_entry)

popup_entry: dict[str, object] = {'name': 'rissFulltextPopup', 'ok': False}
downloading_entry: dict[str, object] = {'name': 'rissDownloading', 'ok': False}
dcollection_entry: dict[str, object] = {'name': 'dcollectionItem', 'ok': False}
pdf_entry: dict[str, object] = {'name': 'publicPdf', 'ok': False}

if riss_fields:
    popup_url = urllib.parse.urljoin(RISS_URL, '/search/download/FullTextDownload.do') + '?' + urllib.parse.urlencode(riss_fields)
    popup = fetch(popup_url, 40, referer=RISS_URL)
    popup_body = popup.pop('body')
    popup_path, popup_kind = persist('riss-fulltext-popup-response', popup, popup_body) if popup_body else ('', '')
    popup_html = decode(popup_body, str(popup.get('contentType') or '')) if popup_body and popup_kind == 'html' else ''
    popup_targets = navigation_targets(popup_html, str(popup.get('finalUrl') or popup_url)) if popup_html else []
    popup_entry = {
        'name': 'rissFulltextPopup',
        **popup,
        'saved': popup_path,
        'kind': popup_kind,
        'navigationTargets': popup_targets,
        'boundedText': visibleish(popup_html)[:6000] if popup_html else '',
    }
    report['hops'].append(popup_entry)

    downloading_target = next((x['absoluteUrl'] for x in popup_targets if 'Downloading.do' in x['absoluteUrl']), None)
    if downloading_target:
        downloading = fetch(downloading_target, 90, referer=str(popup.get('finalUrl') or popup_url))
        downloading_body = downloading.pop('body')
        downloading_path, downloading_kind = persist('riss-downloading-response', downloading, downloading_body) if downloading_body else ('', '')
        downloading_html = decode(downloading_body, str(downloading.get('contentType') or '')) if downloading_body and downloading_kind == 'html' else ''
        downloading_targets = navigation_targets(downloading_html, str(downloading.get('finalUrl') or downloading_target)) if downloading_html else []
        downloading_entry = {
            'name': 'rissDownloading',
            **downloading,
            'saved': downloading_path,
            'kind': downloading_kind,
            'navigationTargets': downloading_targets,
            'boundedText': visibleish(downloading_html)[:8000] if downloading_html else '',
        }
        report['hops'].append(downloading_entry)

        dcollection_target = next((x['absoluteUrl'] for x in downloading_targets if 'dcollection' in x['absoluteUrl'].lower()), None)
        if dcollection_target:
            item_match = re.search(r'[?&]sItemId=([0-9]+)', dcollection_target)
            item_id = item_match.group(1) if item_match else None
            dcollection = fetch(dcollection_target, 90, referer=str(downloading.get('finalUrl') or downloading_target))
            dcollection_body = dcollection.pop('body')
            dcollection_path, dcollection_kind = persist('dcollection-item-response', dcollection, dcollection_body) if dcollection_body else ('', '')
            dcollection_html = decode(dcollection_body, str(dcollection.get('contentType') or '')) if dcollection_body and dcollection_kind == 'html' else ''
            pdf_path = dcollection_pdf_path(dcollection_html) if dcollection_html else None
            drm = js_value(dcollection_html, 'drm') if dcollection_html else None
            agree = js_value(dcollection_html, 'agree') if dcollection_html else None
            file_real_name = js_value(dcollection_html, 'fileRealName') if dcollection_html else None
            file_size_raw = js_value(dcollection_html, 'fileSize') if dcollection_html else None
            file_size = int(file_size_raw) if file_size_raw and file_size_raw.isdigit() else None
            dcollection_entry = {
                'name': 'dcollectionItem',
                **dcollection,
                'saved': dcollection_path,
                'kind': dcollection_kind,
                'sourceProvenance': {
                    'fromRissDownloadingResponse': True,
                    'rawTarget': dcollection_target,
                    'itemId': item_id,
                },
                'sourceContract': {
                    'drm': drm,
                    'agree': agree,
                    'fileRealName': file_real_name,
                    'expectedFileSize': file_size,
                    'authoredPublicPdfPath': pdf_path,
                },
                'boundedText': visibleish(dcollection_html)[:10000] if dcollection_html else '',
            }
            report['hops'].append(dcollection_entry)

            if pdf_path:
                pdf_url = urllib.parse.urljoin(str(dcollection.get('finalUrl') or dcollection_target), pdf_path)
                public_pdf = fetch(pdf_url, 120, referer=str(dcollection.get('finalUrl') or dcollection_target))
                public_pdf_body = public_pdf.pop('body')
                pdf_saved, pdf_kind = persist('park-oe-suk-2023-fulltext', public_pdf, public_pdf_body) if public_pdf_body else ('', '')
                pdf_entry = {
                    'name': 'publicPdf',
                    **public_pdf,
                    'saved': pdf_saved,
                    'kind': pdf_kind,
                    'isPdf': public_pdf_body[:5] == b'%PDF-',
                    'pdfHeader': public_pdf_body[:8].decode('ascii', errors='replace') if public_pdf_body else '',
                    'sourceContract': {
                        'itemId': item_id,
                        'authoredPublicPdfPath': pdf_path,
                        'authoredPublicPdfUrl': pdf_url,
                        'expectedFileSize': file_size,
                        'sizeMatchesServerMetadata': file_size == len(public_pdf_body) if file_size is not None else None,
                    },
                }
                report['hops'].append(pdf_entry)

nanet = fetch(NANET_URL, 12)
nanet_body = nanet.pop('body')
nanet_path, nanet_kind = persist('nanet-detail-response', nanet, nanet_body) if nanet_body else ('', '')
nanet_html = decode(nanet_body, str(nanet.get('contentType') or '')) if nanet_body and nanet_kind == 'html' else ''
nanet_text = visibleish(nanet_html) if nanet_html else ''
report['nanet'] = {
    **nanet,
    'saved': nanet_path,
    'kind': nanet_kind,
    'identityMarkers': {
        'titleExact': TITLE in nanet_text or TITLE in nanet_html,
        'authorExact': AUTHOR in nanet_text or AUTHOR in nanet_html,
        'control': NANET_CONTROL in str(nanet.get('finalUrl') or NANET_URL) or NANET_CONTROL in nanet_html,
    },
    'accessMarkers': {
        'electronicMaterial': '전자자료' in nanet_text,
        'originalView': '원문보기' in nanet_text,
        'download': '다운로드' in nanet_text,
    },
}

ri = riss_entry['identityMarkers']
item_provenance = dcollection_entry.get('sourceProvenance', {}) if isinstance(dcollection_entry, dict) else {}
source_contract = dcollection_entry.get('sourceContract', {}) if isinstance(dcollection_entry, dict) else {}
report['identityDisposition'] = (
    'EXACT_RISS_IDENTITY_CONFIRMED'
    if ri['titleExact'] and ri['authorExact'] and ri['year']
    else 'IDENTITY_NOT_CONFIRMED'
)
report['rissFulltextPopupFetched'] = bool(popup_entry.get('ok'))
report['rissDownloadingHopFetched'] = bool(downloading_entry.get('ok'))
report['dcollectionTargetRecoveredFromRiss'] = bool(item_provenance.get('fromRissDownloadingResponse') and item_provenance.get('itemId'))
report['dcollectionItemFetched'] = bool(dcollection_entry.get('ok'))
report['dcollectionPublicPdfContractRecovered'] = bool(source_contract.get('authoredPublicPdfPath'))
report['publicPdfAcquired'] = bool(pdf_entry.get('ok') and pdf_entry.get('isPdf'))
report['fulltextDisposition'] = (
    'PUBLIC_PDF_ACQUIRED_FROM_DCOLLECTION_AUTHORED_TARGET'
    if report['publicPdfAcquired']
    else 'SITE_AUTHORED_CHAIN_EXHAUSTED_NO_PUBLIC_PDF_BODY_YET'
)
report['semanticDisposition'] = 'NO_BODY_LEVEL_DECISION_YET'

out = ROOT / 'report.json'
out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(out.read_text(encoding='utf-8'))
