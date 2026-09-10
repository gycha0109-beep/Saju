#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path('acquisition-jeon-suhyun-2016')
ITEM_HTML = ROOT / 'dcollection-item-response.html'
ITEM_REPORT = ROOT / 'dcollection-report.json'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()


def fetch(url: str, referer: str, timeout: int = 90) -> dict[str, object]:
    req = urllib.request.Request(url, headers={
        'User-Agent': UA,
        'Accept': 'application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
        'Referer': referer,
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as resp:
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


html = ITEM_HTML.read_text(encoding='utf-8', errors='replace')
item_report = json.loads(ITEM_REPORT.read_text(encoding='utf-8'))
base = item_report['fetch']['finalUrl']
assert base == 'https://dcollection.kyonggi.ac.kr/common/orgView/000000043819'

# This is the dCollection page's own JavaScript contract. Do not derive a path
# from filePath/fileSaveName; follow only the explicit location.replace target.
drm_m = re.search(r"var\s+drm\s*=\s*['\"]([^'\"]+)['\"]", html)
agree_m = re.search(r"var\s+agree\s*=\s*['\"]([^'\"]+)['\"]", html)
ext_m = re.search(r"var\s+ext\s*=\s*['\"]([^'\"]+)['\"]", html)
replace_targets = re.findall(
    r'location\.replace\(\s*context\s*\+\s*["\']([^"\']+)["\']\s*\+\s*sPage\s*\)',
    html,
    flags=re.I,
)
public_pdf_targets = [unescape(t) for t in replace_targets if '/public_resource/pdf/' in t]
assert drm_m and drm_m.group(1) == 'N', 'unexpected DRM state'
assert agree_m and agree_m.group(1) == 'Y', 'unexpected agreement state'
assert ext_m and ext_m.group(1).lower() == '.pdf', 'unexpected source extension'
assert public_pdf_targets, 'dCollection page did not author a public PDF location.replace target'

# Both code branches in this page may repeat the same public target; dedupe it.
public_pdf_path = list(dict.fromkeys(public_pdf_targets))[0]
assert public_pdf_path.startswith('/public_resource/pdf/000000043819_')
assert public_pdf_path.endswith('.pdf')
pdf_url = urllib.parse.urljoin(base, public_pdf_path)

result = fetch(pdf_url, referer=base, timeout=90)
body = result.pop('body')
is_pdf = body.startswith(b'%PDF-')
if body:
    suffix = 'pdf' if is_pdf else 'bin'
    (ROOT / f'jeon-suhyun-2016-fulltext.{suffix}').write_bytes(body)

form = item_report.get('forms', [{}])[0].get('fields', {})
expected_size = int(form.get('fileSize', '0') or '0')
report = {
    'candidate': {'author': '전수현', 'year': 2016, 'itemId': '000000043819'},
    'sourceContract': {
        'itemPage': base,
        'drm': drm_m.group(1),
        'agree': agree_m.group(1),
        'ext': ext_m.group(1),
        'authoredPublicPdfPath': public_pdf_path,
        'authoredPublicPdfUrl': pdf_url,
        'expectedFileSizeFromServerForm': expected_size,
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlyPageAuthoredPublicPdfTargetFollowed': True,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
    },
    'fetch': result,
    'isPdf': is_pdf,
    'pdfHeader': body[:8].decode('latin-1', errors='replace') if body else '',
    'sizeMatchesServerMetadata': bool(expected_size and len(body) == expected_size),
    'fulltextDisposition': 'PUBLIC_PDF_ACQUIRED_FROM_DCOLLECTION_AUTHORED_TARGET' if is_pdf else 'PUBLIC_PDF_TARGET_RETURNED_NON_PDF',
}
out = ROOT / 'public-pdf-report.json'
out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(out.read_text(encoding='utf-8'))
