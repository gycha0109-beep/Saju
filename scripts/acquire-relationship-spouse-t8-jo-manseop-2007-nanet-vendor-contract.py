#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path('acquisition-jo-manseop-2007')
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'


def fetch(url: str, referer: str, attempts: int = 3, timeout: int = 25, max_bytes: int = 12_000_000):
    headers = {'User-Agent': UA, 'Accept': 'application/javascript,text/javascript,*/*;q=0.8', 'Referer': referer}
    for attempt in range(1, attempts + 1):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=timeout) as response:
                body = response.read(max_bytes + 1)
                if len(body) > max_bytes:
                    raise RuntimeError('bounded response limit exceeded')
                return {
                    'status': getattr(response, 'status', 200),
                    'finalUrl': response.geturl(),
                    'contentType': response.headers.get('Content-Type', ''),
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


def decode(body: bytes) -> str:
    for encoding in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(encoding)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def contexts(text: str, terms: tuple[str, ...], cap: int = 180):
    out = []
    seen = set()
    for term in terms:
        for match in re.finditer(re.escape(term), text, re.I):
            fragment = re.sub(r'\s+', ' ', text[max(0, match.start()-420):min(len(text), match.end()+900)])
            if fragment not in seen:
                seen.add(fragment)
                out.append({'term': term, 'context': fragment})
            if len(out) >= cap:
                return out
    return out


report_path = ROOT / 'report.json'
report = json.loads(report_path.read_text(encoding='utf-8'))
reader_contract = report.get('readerContract') or {}
reader_url = reader_contract.get('readerUrl')
assert reader_url and urllib.parse.urlsplit(reader_url).hostname == 'docviewer.nanet.go.kr'
targets = (reader_contract.get('response') or {}).get('authoredTargets') or []
vendor_urls = [
    item['url'] for item in targets
    if item.get('kind') == 'src'
    and re.fullmatch(r'https://docviewer\.nanet\.go\.kr/reader/js/chunk-vendors\.[0-9a-f]+\.js', item.get('url', ''))
]
assert len(vendor_urls) == 1, f'exact reader-authored vendor JS not uniquely observed: {vendor_urls}'
vendor_url = vendor_urls[0]
response = fetch(vendor_url, reader_url)
body = response.pop('body')
saved = ROOT / 'nanet-reader-vendor.js'
saved.write_bytes(body)
text = decode(body)
observed_contexts = contexts(text, ('randomUUID', 'getRandomValues', 'uuid', 'UUID', 'Math.random', 'crypto', 'xxxxxxxx-xxxx', 'xxxxxxxx'))
report['uuidVendorContract'] = {
    'vendorUrlAuthoredByReaderResponse': True,
    'vendorUrl': vendor_url,
    'vendorResponse': {**response, 'saved': str(saved)},
    'uuidContexts': observed_contexts,
    'documentApiRequestExecuted': False,
}
report['semanticDisposition'] = 'PUBLIC_READER_UUID_VENDOR_CONTRACT_INSPECTED_NO_BODY_LEVEL_DECISION'
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({
    'vendorUrl': vendor_url,
    'status': response.get('status'),
    'bytes': response.get('bytes'),
    'sha256': response.get('sha256'),
    'uuidContexts': observed_contexts,
    'documentApiRequestExecuted': False,
}, ensure_ascii=False, indent=2))
