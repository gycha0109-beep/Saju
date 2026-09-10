#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path('acquisition-jo-manseop-2007')
API_BASE = 'https://docviewer.nanet.go.kr/api/v1/'
API_PATH = 'drm'
DOCINFO_PATH = '/docinfo/'
UCOD_VERSION = '1.0.27'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'


def uuid_v4_from_secure_random() -> str:
    data = bytearray(os.urandom(16))
    data[6] = (data[6] & 0x0F) | 0x40
    data[8] = (data[8] & 0x3F) | 0x80
    h = data.hex()
    value = f'{h[0:8]}-{h[8:12]}-{h[12:16]}-{h[16:20]}-{h[20:32]}'
    assert re.fullmatch(r'[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}', value)
    return value


def fetch(url: str, *, referer: str, request_uuid: str, attempts: int = 3, timeout: int = 25, max_bytes: int = 5_000_000):
    headers = {
        'User-Agent': UA,
        'Accept': 'application/json,text/plain,*/*',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
        'Referer': referer,
        'X-UCOD-UUID': request_uuid,
        'X-UCOD-VERSION': UCOD_VERSION,
    }
    for attempt in range(1, attempts + 1):
        try:
            request = urllib.request.Request(url, headers=headers, method='GET')
            with urllib.request.urlopen(request, timeout=timeout) as response:
                body = response.read(max_bytes + 1)
                if len(body) > max_bytes:
                    raise RuntimeError('bounded response limit exceeded')
                return {
                    'status': getattr(response, 'status', 200),
                    'finalUrl': response.geturl(),
                    'contentType': response.headers.get('Content-Type', ''),
                    'contentDisposition': response.headers.get('Content-Disposition', ''),
                    'bytes': len(body),
                    'sha256': hashlib.sha256(body).hexdigest(),
                    'attempt': attempt,
                    'body': body,
                }
        except urllib.error.HTTPError as exc:
            body = exc.read(max_bytes + 1)
            return {
                'status': exc.code,
                'finalUrl': exc.geturl(),
                'contentType': exc.headers.get('Content-Type', '') if exc.headers else '',
                'contentDisposition': exc.headers.get('Content-Disposition', '') if exc.headers else '',
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'attempt': attempt,
                'error': f'HTTPError: {exc}',
                'body': body,
            }
        except (urllib.error.URLError, TimeoutError, OSError):
            if attempt == attempts:
                raise
            time.sleep(attempt * 2)
    raise RuntimeError('unreachable fetch state')


report_path = ROOT / 'report.json'
report = json.loads(report_path.read_text(encoding='utf-8'))
reader = report.get('readerContract') or {}
reader_url = reader.get('readerUrl')
assert reader.get('readerUrlAuthoredByViewerResponse') is True
assert reader.get('opaqueReaderIdGuessed') is False
assert reader_url and urllib.parse.urlsplit(reader_url).hostname == 'docviewer.nanet.go.kr'
cert_id = urllib.parse.urlsplit(reader_url).path.rsplit('/', 1)[-1]
assert re.fullmatch(r'[0-9a-f]{32}', cert_id), 'current viewer-authored certId shape invalid'
app = reader.get('appContract') or {}
assert app.get('indexUrlAuthoredByReaderResponse') is True
vendor = report.get('uuidVendorContract') or {}
assert vendor.get('vendorUrlAuthoredByReaderResponse') is True
assert vendor.get('documentApiRequestExecuted') is False

index_path = ROOT / 'nanet-reader-index.js'
vendor_path = ROOT / 'nanet-reader-vendor.js'
index_text = index_path.read_text(encoding='utf-8', errors='replace')
vendor_text = vendor_path.read_text(encoding='utf-8', errors='replace')
assert 'https://docviewer.nanet.go.kr/api/v1/' in index_text
assert '/docinfo/' in index_text
assert 'X-UCOD-UUID' in index_text and 'X-UCOD-VERSION' in index_text
assert '1.0.27' in index_text
assert '0xadee:function' in vendor_text
module_start = vendor_text.index('0xadee:function')
module_end_match = re.search(r',0x[0-9a-f]+:function\(', vendor_text[module_start + 20:])
assert module_end_match is not None
module_end = module_start + 20 + module_end_match.start()
uuid_module = vendor_text[module_start:module_end]
assert 'new Uint8Array(0x10)' in uuid_module
assert '0xf&_0x380d4c[0x6]|0x40' in uuid_module
assert '0x3f&_0x380d4c[0x8]|0x80' in uuid_module
assert 'getRandomValues' in uuid_module

request_uuid = uuid_v4_from_secure_random()
docinfo_url = urllib.parse.urljoin(API_BASE, API_PATH + DOCINFO_PATH + cert_id)
response = fetch(docinfo_url, referer=reader_url, request_uuid=request_uuid)
body = response.pop('body')
content_type = str(response.get('contentType') or '').lower()
if 'json' in content_type:
    suffix = 'json'
else:
    suffix = 'bin'
saved = ROOT / f'nanet-docinfo.{suffix}'
saved.write_bytes(body)
parsed = None
if suffix == 'json':
    try:
        parsed = json.loads(body.decode('utf-8'))
    except Exception:
        parsed = None

report['documentMetadataContract'] = {
    'apiBaseLiteralFromReaderIndex': API_BASE,
    'apiPathLiteralFromReaderIndex': API_PATH,
    'docInfoPathLiteralFromReaderIndex': DOCINFO_PATH,
    'certIdDerivedFromCurrentViewerAuthoredReaderUrl': True,
    'certId': cert_id,
    'uuidAlgorithmRecoveredExactlyFromReaderAuthoredVendor': True,
    'uuidVersion': 4,
    'ucodVersionLiteralFromReaderIndex': UCOD_VERSION,
    'requestMethod': 'GET',
    'requestUrl': docinfo_url,
    'requestUuid': request_uuid,
    'response': {**response, 'saved': str(saved), 'json': parsed},
    'pageApiRequestExecuted': False,
    'contentPayloadRequestExecuted': False,
    'downloadRouteExecuted': False,
    'decryptionActionExecuted': False,
}
report['uuidVendorContract']['documentApiRequestExecuted'] = True
report['semanticDisposition'] = 'PUBLIC_READER_DOCINFO_OBSERVED_NO_BODY_LEVEL_DECISION'
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({
    'certId': cert_id,
    'requestUrl': docinfo_url,
    'requestUuid': request_uuid,
    'ucodVersion': UCOD_VERSION,
    'status': response.get('status'),
    'contentType': response.get('contentType'),
    'bytes': response.get('bytes'),
    'sha256': response.get('sha256'),
    'json': parsed,
    'pageApiRequestExecuted': False,
    'contentPayloadRequestExecuted': False,
    'downloadRouteExecuted': False,
    'decryptionActionExecuted': False,
}, ensure_ascii=False, indent=2))
