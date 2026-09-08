#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-na-hyukjin-2017')
OUT.mkdir(exist_ok=True)

AUTHOR = '나혁진'
TITLE = '명리 궁합론의 현대적 재해석에 관한 연구'
RISS_ID = 'T14398372'
RISS_CONTROL = '1f8b683fad900548ffe0bdc3ef48d419'
RISS_MAT = 'be54d9b8bc7cdb09'
NANET_CONTROL = 'KDMT1201802345'
RISS_LINK = f'https://www.riss.kr/link?id={RISS_ID}'
NANET_DETAIL = f'https://dl.nanet.go.kr/detail/{NANET_CONTROL}'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/19.2; public-resource-verification)'
MAX = 10 * 1024 * 1024
ATTEMPTS = 3


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return host == 'www.riss.kr' or host.endswith('.riss.kr') or host == 'dl.nanet.go.kr' or host.endswith('.nanet.go.kr')


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def fetch(url: str, referer: str | None = None) -> tuple[dict, str]:
    assert allowed(url)
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    attempts = []
    last = None
    for attempt in range(1, ATTEMPTS + 1):
        meta = {'requestedUrl': url, 'status': None, 'finalUrl': None, 'contentType': None, 'bytes': 0, 'sha256': None, 'error': None, 'attempt': attempt}
        headers = {'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,*/*;q=0.5', 'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7'}
        if referer:
            headers['Referer'] = referer
        try:
            with opener.open(Request(url, headers=headers), timeout=35) as resp:
                body = resp.read(MAX)
                meta.update({'status': getattr(resp, 'status', None), 'finalUrl': resp.geturl(), 'contentType': resp.headers.get('Content-Type'), 'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest()})
                attempts.append({'attempt': attempt, 'status': meta['status'], 'bytes': len(body), 'error': None})
                meta['attempts'] = attempts
                return meta, decode(body)
        except Exception as exc:
            meta['error'] = f'{type(exc).__name__}: {exc}'
            attempts.append({'attempt': attempt, 'status': None, 'bytes': 0, 'error': meta['error']})
            last = meta
            if attempt < ATTEMPTS:
                time.sleep(attempt)
    assert last is not None
    last['attempts'] = attempts
    return last, ''


def identity(text: str) -> bool:
    norm = re.sub(r'\s+', '', html.unescape(text))
    return re.sub(r'\s+', '', TITLE) in norm and AUTHOR in norm


def hidden_value(text: str, element_id: str) -> str | None:
    for tag in re.findall(r'<input\b[^>]*>', text, re.I | re.S):
        if not re.search(rf'\bid\s*=\s*["\']{re.escape(element_id)}["\']', tag, re.I):
            continue
        m = re.search(r'\bvalue\s*=\s*["\']([^"\']*)["\']', tag, re.I)
        if m:
            return html.unescape(m.group(1))
    return None


def main() -> int:
    report = {
        'purpose': 'fast exact public identity baseline for Na Hyukjin 2017; bounded retry; no content action',
        'candidate': {'author': AUTHOR, 'title': TITLE, 'year': 2017, 'rissId': RISS_ID, 'rissControlExpected': RISS_CONTROL, 'rissMatExpected': RISS_MAT, 'nanetControl': NANET_CONTROL},
        'guessedOpaqueIdentifierCount': 0,
        'contentActionExecuted': False,
        'fullLengthPdfAcquired': False,
        'riss': {},
        'nanet': {},
    }

    rm, rt = fetch(RISS_LINK)
    report['riss'] = {
        'meta': rm,
        'identityObserved': identity(rt),
        'finalControlObserved': RISS_CONTROL in (rm.get('finalUrl') or '') or RISS_CONTROL in rt,
        'finalMatObserved': RISS_MAT in (rm.get('finalUrl') or '') or RISS_MAT in rt,
        'docControlNo': hidden_value(rt, 'controlNo'),
        'docType': hidden_value(rt, 'docType'),
        'surfaceUnavailable': not bool(rt),
    }

    nm, nt = fetch(NANET_DETAIL, rm.get('finalUrl') or RISS_LINK)
    report['nanet'] = {
        'meta': nm,
        'identityObserved': identity(nt),
        'controlObserved': NANET_CONTROL in nt or NANET_CONTROL in (nm.get('finalUrl') or ''),
        'surfaceUnavailable': not bool(nt),
        'targetViewCallObserved': bool(re.search(rf'viewDoc\s*\(\s*this\s*,\s*["\']{NANET_CONTROL}["\']\s*,\s*["\']1["\']', nt, re.I)),
        'targetDownloadCallObserved': bool(re.search(rf'downloadDoc\s*\(\s*this\s*,\s*["\']{NANET_CONTROL}["\']\s*,\s*["\']1["\']', nt, re.I)),
    }

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT / 'summary.txt').write_text('\n'.join([
        f'candidate={AUTHOR} 2017 {TITLE}',
        f'rissIdentity={report["riss"]["identityObserved"]}',
        f'rissDocControlNo={report["riss"]["docControlNo"]}',
        f'rissDocType={report["riss"]["docType"]}',
        f'nanetIdentity={report["nanet"]["identityObserved"]}',
        f'nanetSurfaceUnavailable={report["nanet"]["surfaceUnavailable"]}',
        f'nanetTargetViewCallObserved={report["nanet"]["targetViewCallObserved"]}',
        f'nanetTargetDownloadCallObserved={report["nanet"]["targetDownloadCallObserved"]}',
        'guessedOpaqueIdentifierCount=0',
        'contentActionExecuted=false',
        'fullLengthPdfAcquired=false',
    ]) + '\n', encoding='utf-8')
    print((OUT / 'summary.txt').read_text())

    assert rm['status'] == 200 and report['riss']['identityObserved']
    assert report['riss']['finalControlObserved'] and report['riss']['finalMatObserved']
    assert report['riss']['docControlNo'] == '14398372' and report['riss']['docType'] == 'T'
    # NANET network availability is evidence-neutral; if the surface responds with the target, require exact identity/calls.
    if not report['nanet']['surfaceUnavailable']:
        assert nm['status'] == 200
        assert report['nanet']['identityObserved'] and report['nanet']['controlObserved']
        assert report['nanet']['targetViewCallObserved'] and report['nanet']['targetDownloadCallObserved']
    assert report['guessedOpaqueIdentifierCount'] == 0
    assert report['contentActionExecuted'] is False
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
