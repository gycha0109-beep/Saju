#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-na-hyukjin-2017')
OUT.mkdir(exist_ok=True)

AUTHOR = '나혁진'
TITLE = '명리 궁합론의 현대적 재해석에 관한 연구'
RISS_ID = 'T14398372'
NANET_CONTROL = 'KDMT1201802345'
RISS_LINK = f'https://www.riss.kr/link?id={RISS_ID}'
NANET_DETAIL = f'https://dl.nanet.go.kr/detail/{NANET_CONTROL}'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/19.5; public-resource-verification)'
MAX = 12 * 1024 * 1024
ATTEMPTS = 3
TIMEOUT = 35


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


def compact(text: str, limit: int = 5000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def fetch(opener, url: str, *, data: bytes | None = None, referer: str | None = None) -> tuple[dict, str]:
    assert allowed(url), f'outside bounded public dispatcher allowlist: {url}'
    attempts = []
    last = None
    for attempt in range(1, ATTEMPTS + 1):
        headers = {
            'User-Agent': UA,
            'Accept': 'text/html,application/xhtml+xml,application/javascript,application/json,*/*;q=0.5',
            'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
        }
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
            'attempt': attempt,
        }
        try:
            with opener.open(Request(url, data=data, headers=headers), timeout=TIMEOUT) as resp:
                body = resp.read(MAX)
                meta.update({
                    'status': getattr(resp, 'status', None),
                    'finalUrl': resp.geturl(),
                    'contentType': resp.headers.get('Content-Type'),
                    'bytes': len(body),
                    'sha256': hashlib.sha256(body).hexdigest(),
                })
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


def hidden_value(text: str, element_id: str) -> str | None:
    for tag in re.findall(r'<input\b[^>]*>', text, re.I | re.S):
        if not re.search(rf'\bid\s*=\s*["\']{re.escape(element_id)}["\']', tag, re.I):
            continue
        m = re.search(r'\bvalue\s*=\s*["\']([^"\']*)["\']', tag, re.I)
        if m:
            return html.unescape(m.group(1))
    return None


def script_urls(text: str, base: str) -> list[str]:
    out = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        url = urljoin(base, html.unescape(raw))
        if allowed(url) and url not in out:
            out.append(url)
    return out[:140]


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'RISS originalCheck plus exact NANET target-button evidence; static dispatcher/viewer verification is isolated in the fallback probe',
        'guessedOpaqueIdentifierCount': 0,
        'downloadActionExecuted': False,
        'riss': {},
        'nanet': {},
    }

    rm, rt = fetch(opener, RISS_LINK)
    rbase = rm.get('finalUrl') or RISS_LINK
    doc_control = hidden_value(rt, 'controlNo')
    doc_type = hidden_value(rt, 'docType')
    contract_source = None
    contract_context = None
    for url in script_urls(rt, rbase):
        jm, jt = fetch(opener, url, referer=rbase)
        if not jt or 'originalCheck' not in jt:
            continue
        normalized = re.sub(r'\s+', '', jt)
        if ('functionoriginalCheck(goOri)' in normalized and
            'data:{controlNo:controlNo,docType:docType}' in normalized and
            'url:goOri' in normalized):
            contract_source = jm.get('finalUrl') or url
            m = re.search(r'function\s+originalCheck\s*\([^)]*\)', jt, re.I)
            if m:
                contract_context = compact(jt[max(0, m.start()-500):m.start()+3500], 4500)
            break

    report['riss'] = {
        'detail': rm,
        'docControlNo': doc_control,
        'docType': doc_type,
        'goOriObserved': '/detail/originalCheck.do' in rt,
        'originalCheckContractObserved': contract_source is not None,
        'originalCheckContractSource': contract_source,
        'originalCheckContractContext': contract_context,
    }
    assert rm['status'] == 200 and TITLE in rt and AUTHOR in rt
    assert doc_control == '14398372' and doc_type == 'T'
    assert report['riss']['goOriObserved'] and report['riss']['originalCheckContractObserved']

    payload = urlencode({'controlNo': doc_control, 'docType': doc_type}).encode('ascii')
    om, ot = fetch(opener, urljoin(rbase, '/detail/originalCheck.do'), data=payload, referer=rbase)
    report['riss']['originalCheck'] = om
    report['riss']['originalCheckBody'] = compact(ot, 4000)
    assert om['status'] == 200
    assert report['riss']['originalCheckBody'] == '{"flag":"T"}'

    nm, nt = fetch(opener, NANET_DETAIL)
    surface_unavailable = not bool(nt)
    target_view = bool(re.search(rf'viewDoc\s*\(\s*this\s*,\s*["\']{NANET_CONTROL}["\']\s*,\s*["\']1["\']\s*\)', nt, re.I)) if nt else False
    target_download = bool(re.search(rf'downloadDoc\s*\(\s*this\s*,\s*["\']{NANET_CONTROL}["\']\s*,\s*["\']1["\']\s*\)', nt, re.I)) if nt else False
    report['nanet'] = {
        'detail': nm,
        'surfaceUnavailable': surface_unavailable,
        'identityObserved': bool(nt and TITLE in nt and AUTHOR in nt),
        'controlObserved': bool(nt and NANET_CONTROL in nt),
        'targetViewCallObserved': target_view,
        'targetDownloadCallObserved': target_download,
    }
    if nt:
        assert nm['status'] == 200
        assert report['nanet']['identityObserved'] and report['nanet']['controlObserved']
        assert target_view and target_download

    (OUT / 'dispatcher-probe.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({
        'rissOriginalCheck': report['riss']['originalCheck'],
        'rissOriginalCheckBody': report['riss']['originalCheckBody'],
        'nanetSurfaceUnavailable': surface_unavailable,
        'nanetTargetViewCallObserved': target_view,
        'nanetTargetDownloadCallObserved': target_download,
        'guessedOpaqueIdentifierCount': 0,
        'downloadActionExecuted': False,
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
