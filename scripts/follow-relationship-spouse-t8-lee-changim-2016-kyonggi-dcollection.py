#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path('acquisition-lee-changim-2016')
REPORT = ROOT / 'report.json'
SOURCE = ROOT / 'hop-02.html'
PDF = ROOT / 'lee-changim-2016.pdf'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Lee-Changim-2016-Kyonggi-follow)'
CTX = ssl.create_default_context()
OPENER = urllib.request.build_opener(urllib.request.HTTPSHandler(context=CTX))


def fetch(url: str, referer: str | None = None, timeout: int = 60, max_bytes: int = 20_000_000) -> dict[str, object]:
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
            body = resp.read(max_bytes + 1)
            if len(body) > max_bytes:
                raise RuntimeError('bounded response limit exceeded')
            return {
                'ok': True,
                'status': getattr(resp, 'status', 200),
                'requestedUrl': url,
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
            'requestedUrl': url,
            'finalUrl': exc.geturl(),
            'contentType': exc.headers.get('Content-Type', '') if exc.headers else '',
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
            'body': body,
            'error': f'HTTPError: {exc}',
        }
    except Exception as exc:  # noqa: BLE001
        return {
            'ok': False,
            'status': None,
            'requestedUrl': url,
            'finalUrl': url,
            'contentType': '',
            'bytes': 0,
            'sha256': None,
            'body': b'',
            'error': f'{type(exc).__name__}: {exc}',
        }


def decode(body: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def unique_authored_dcollection_urls(raw: str) -> list[str]:
    decoded = html.unescape(raw)
    urls = re.findall(r'https?://dcollection\.kyonggi\.ac\.kr/[^"\'<>\s]+', decoded, re.I)
    return list(dict.fromkeys(urls))


def unique_public_pdf_urls(raw: str, base: str) -> list[str]:
    decoded = html.unescape(raw)
    candidates: list[str] = []
    for match in re.findall(r'''(?is)["']([^"']*(?:/public_resource/pdf/[^"']+\.pdf|\.pdf(?:\?[^"']*)?))["']''', decoded):
        target = match.strip()
        if not target or target.lower().startswith('javascript:'):
            continue
        absolute = urllib.parse.urljoin(base, target)
        host = (urllib.parse.urlparse(absolute).hostname or '').lower()
        if host != 'dcollection.kyonggi.ac.kr':
            continue
        if '/public_resource/pdf/' not in absolute.lower():
            continue
        candidates.append(absolute)
    return list(dict.fromkeys(candidates))


report = json.loads(REPORT.read_text(encoding='utf-8'))
assert SOURCE.exists(), 'RISS Downloading.do response is missing'
source_raw = SOURCE.read_text(encoding='utf-8')
authored = unique_authored_dcollection_urls(source_raw)
assert len(authored) == 1, f'exactly one unique RISS-authored Kyonggi dCollection route required, got {authored}'
url = authored[0]
report['rissAuthoredDcollectionUrl'] = url
report['rissAuthoredDcollectionItemId'] = urllib.parse.parse_qs(urllib.parse.urlparse(url).query).get('sItemId', [None])[0]

item = fetch(url, referer=str(report['hops'][-1].get('finalUrl') or report['hops'][-1].get('requestedUrl')))
body = item.pop('body')
item_record = {**item, 'source': 'exact-riss-authored-kyonggi-dcollection-route'}
report['hops'].append(item_record)

if not item.get('ok'):
    report['dcollectionFollowDisposition'] = 'EXACT_PAGE_AUTHORED_ROUTE_FETCH_FAILED_WITH_STANDARD_TLS_AND_HTTP_POLICY'
    report['fulltextDisposition'] = 'CURRENT_PAGE_AUTHORED_CHAIN_EXHAUSTED_WITHOUT_DIRECT_PDF'
    report['semanticDisposition'] = 'NO_DIRECT_BODY_ACQUIRED_NO_BODY_LEVEL_DECISION'
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(REPORT.read_text(encoding='utf-8'))
    raise SystemExit(0)

ctype = str(item.get('contentType') or '')
raw = decode(body, ctype)
(ROOT / 'dcollection-item.html').write_text(raw, encoding='utf-8')
report['dcollectionFinalUrl'] = item.get('finalUrl')
report['dcollectionDrmNObserved'] = bool(re.search(r'''(?is)\bdrm\b[^\r\n]{0,80}["']?N["']?''', raw))
report['dcollectionAgreeYObserved'] = bool(re.search(r'''(?is)\bagree\b[^\r\n]{0,80}["']?Y["']?''', raw))
pdf_urls = unique_public_pdf_urls(raw, str(item.get('finalUrl') or url))
report['dcollectionPageAuthoredPublicPdfUrls'] = pdf_urls

if len(pdf_urls) > 1:
    raise RuntimeError(f'ambiguous multiple unique public PDF targets: {pdf_urls}')
if not pdf_urls:
    report['dcollectionFollowDisposition'] = 'EXACT_DCOLLECTION_PAGE_FETCHED_NO_UNIQUE_PUBLIC_PDF_LITERAL'
    report['fulltextDisposition'] = 'CURRENT_PAGE_AUTHORED_CHAIN_EXHAUSTED_WITHOUT_DIRECT_PDF'
    report['semanticDisposition'] = 'NO_DIRECT_BODY_ACQUIRED_NO_BODY_LEVEL_DECISION'
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(REPORT.read_text(encoding='utf-8'))
    raise SystemExit(0)

pdf_url = pdf_urls[0]
pdf_result = fetch(pdf_url, referer=str(item.get('finalUrl') or url))
pdf_body = pdf_result.pop('body')
report['hops'].append({**pdf_result, 'source': 'unique-dcollection-page-authored-public-pdf'})
if not pdf_result.get('ok') or pdf_body[:5] != b'%PDF-':
    report['dcollectionFollowDisposition'] = 'PAGE_AUTHORED_PDF_LITERAL_DID_NOT_RETURN_PDF'
    report['fulltextDisposition'] = 'CURRENT_PAGE_AUTHORED_CHAIN_EXHAUSTED_WITHOUT_DIRECT_PDF'
    report['semanticDisposition'] = 'NO_DIRECT_BODY_ACQUIRED_NO_BODY_LEVEL_DECISION'
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(REPORT.read_text(encoding='utf-8'))
    raise SystemExit(0)

PDF.write_bytes(pdf_body)
report['publicPdfAcquired'] = True
report['pdfSha256'] = hashlib.sha256(pdf_body).hexdigest()
report['pdfBytes'] = len(pdf_body)
report['dcollectionFollowDisposition'] = 'PUBLIC_PDF_ACQUIRED_FROM_EXACT_RISS_AUTHORED_KYONGGI_ROUTE'
report['fulltextDisposition'] = 'PUBLIC_PDF_ACQUIRED_FROM_CURRENT_PAGE_AUTHORED_CHAIN'
report['semanticDisposition'] = 'FULL_BODY_ACQUIRED_PENDING_RENDER_FIRST_DIRECT_REVIEW'
REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(REPORT.read_text(encoding='utf-8'))
