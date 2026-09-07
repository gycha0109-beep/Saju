#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-shin-jaeeok-2024')
OUT.mkdir(exist_ok=True)

DETAIL = 'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=49df877f9b4f8a08ffe0bdc3ef48d419'
TTS = 'https://www.riss.kr/search/download/newTtsView.do'
CONTROL_NO = '49df877f9b4f8a08ffe0bdc3ef48d419'
P_MAT_TYPE = 'be54d9b8bc7cdb09'
S_MAT_TYPE = 'be54d9b8bc7cdb09'
MAT_SUBTYPE = 'f1a8c7a1de0e08b8'
IMAGE_FORMAT = 'a8cb3aaead67ab5b'
ITEM_ID = '000000033581'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/9.4; public-resource-verification)'
MAX = 8 * 1024 * 1024


def fetch(opener, url: str, *, data: bytes | None = None, referer: str | None = None) -> tuple[dict, bytes]:
    headers = {'User-Agent': UA, 'Accept': 'text/html,text/plain,application/json,*/*;q=0.5'}
    if referer:
        headers['Referer'] = referer
    if data is not None:
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        headers['X-Requested-With'] = 'XMLHttpRequest'
    meta = {
        'requestedUrl': url,
        'method': 'POST' if data is not None else 'GET',
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'bytes': 0,
        'sha256': None,
        'error': None,
    }
    try:
        with opener.open(Request(url, data=data, headers=headers), timeout=35) as r:
            body = r.read(MAX)
            meta.update({
                'status': getattr(r, 'status', None),
                'finalUrl': r.geturl(),
                'contentType': r.headers.get('Content-Type'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
            })
            return meta, body
    except Exception as e:
        meta['error'] = f'{type(e).__name__}: {e}'
        return meta, b''


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    detail_meta, detail_body = fetch(opener, DETAIL)
    detail_text = decode(detail_body) if detail_body else ''
    exact_call = (
        "newTtsPopupView('49df877f9b4f8a08ffe0bdc3ef48d419',"
        "'be54d9b8bc7cdb09','be54d9b8bc7cdb09','f1a8c7a1de0e08b8','a8cb3aaead67ab5b')"
    )
    assert exact_call in detail_text

    payload = urlencode({
        'control_no': CONTROL_NO,
        'p_mat_type': P_MAT_TYPE,
        's_mat_type': S_MAT_TYPE,
        'mat_subtype_cd': MAT_SUBTYPE,
        'imageFormat': IMAGE_FORMAT,
    }).encode('ascii')
    tts_meta, tts_body = fetch(opener, TTS, data=payload, referer=DETAIL)
    body_text = decode(tts_body).strip() if tts_body else ''

    urls = []
    for value in re.findall(r'https?://[^\s"\'<>]+', body_text.replace('\\/', '/')):
        value = value.rstrip(';,.)')
        if value not in urls:
            urls.append(value)

    report = {
        'purpose': 'read the exact source URI returned by the target-specific public RISS TTS dispatcher; no auth bypass',
        'exactDetailCall': exact_call,
        'payload': {
            'control_no': CONTROL_NO,
            'p_mat_type': P_MAT_TYPE,
            's_mat_type': S_MAT_TYPE,
            'mat_subtype_cd': MAT_SUBTYPE,
            'imageFormat': IMAGE_FORMAT,
        },
        'detail': detail_meta,
        'tts': tts_meta,
        'ttsBody': body_text[:5000],
        'exposedUrls': urls[:20],
        'targetItemPresent': ITEM_ID in body_text,
    }
    (OUT / 'riss-tts-uri.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
