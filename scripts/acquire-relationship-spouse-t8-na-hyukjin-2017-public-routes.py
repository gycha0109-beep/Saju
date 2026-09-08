#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
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
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/19.0; public-resource-verification)'
MAX = 12 * 1024 * 1024

ALLOWED = ('riss.kr', 'nanet.go.kr')
TOKENS = re.compile(r'fulltext|original|download|viewer|viewDoc|downloadDoc|newViewerCall|callViewer|fileDownload|login|로그인|원문', re.I)


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return any(host == s or host.endswith('.' + s) for s in ALLOWED)


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 6000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def fetch(opener, url: str, referer: str | None = None) -> tuple[dict, str]:
    assert allowed(url), f'outside bounded public acquisition allowlist: {url}'
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/json,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
    }
    if referer:
        headers['Referer'] = referer
    meta = {
        'requestedUrl': url,
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'bytes': 0,
        'sha256': None,
        'error': None,
    }
    try:
        with opener.open(Request(url, headers=headers), timeout=40) as resp:
            body = resp.read(MAX)
            meta.update({
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
            })
            return meta, decode(body)
    except Exception as exc:
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, ''


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


def script_urls(text: str, base: str) -> list[str]:
    out: list[str] = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        url = urljoin(base, html.unescape(raw))
        if allowed(url) and url not in out:
            out.append(url)
    return out[:120]


def windows(text: str, patterns: tuple[str, ...], cap: int = 60) -> list[str]:
    out: list[str] = []
    for pattern in patterns:
        for m in re.finditer(pattern, text, re.I | re.S):
            value = compact(text[max(0, m.start()-1000):min(len(text), m.start()+4200)], 5200)
            if value not in out:
                out.append(value)
            if len(out) >= cap:
                return out
    return out


def access_signals(text: str) -> dict:
    return {
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'institution': bool(re.search(r'협정기관|기관.?인증|소속기관', text, re.I)),
        'onsite': bool(re.search(r'서울관|전자자료|정기간행물실|관내', text, re.I)),
        'drmOrViewer': bool(re.search(r'DRM|전용.?뷰어|viewer|ezPDF|Fasoo', text, re.I)),
        'originalViewLabel': '원문보기' in text,
        'downloadLabel': '다운로드' in text,
    }


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'bounded public route inspection for Na Hyukjin 2017; no protected content action or opaque-id guessing',
        'candidate': {
            'author': AUTHOR,
            'title': TITLE,
            'year': 2017,
            'rissId': RISS_ID,
            'rissControlExpected': RISS_CONTROL,
            'rissMatExpected': RISS_MAT,
            'nanetControl': NANET_CONTROL,
        },
        'guessedOpaqueIdentifierCount': 0,
        'contentActionExecuted': False,
        'fullLengthPdfAcquired': False,
        'riss': {},
        'nanet': {},
    }

    rm, rt = fetch(opener, RISS_LINK)
    report['riss']['meta'] = rm
    report['riss']['identityObserved'] = identity(rt)
    report['riss']['finalControlObserved'] = RISS_CONTROL in (rm.get('finalUrl') or '') or RISS_CONTROL in rt
    report['riss']['finalMatObserved'] = RISS_MAT in (rm.get('finalUrl') or '') or RISS_MAT in rt
    report['riss']['docControlNo'] = hidden_value(rt, 'controlNo')
    report['riss']['docType'] = hidden_value(rt, 'docType')
    report['riss']['accessSignals'] = access_signals(rt)
    report['riss']['targetWindows'] = windows(rt, (
        r'ButtonSet\.fulltextDownload\s*\([^;]{0,1200}\)',
        r'fulltextDownload\s*\([^;]{0,1200}\)',
        r'originalCheck',
        r'FullTextDownload\.do',
        r'redirectURL',
    ))
    riss_base = rm.get('finalUrl') or RISS_LINK
    riss_scripts = script_urls(rt, riss_base)
    report['riss']['scriptUrls'] = riss_scripts
    riss_script_windows = []
    for url in riss_scripts:
        jm, jt = fetch(opener, url, riss_base)
        if not jt or not TOKENS.search(jt):
            continue
        for value in windows(jt, (
            r'function\s+fulltextDownload\s*\([^)]*\)',
            r'fulltextDownload\s*:\s*function\s*\([^)]*\)',
            r'function\s+originalCheck\s*\([^)]*\)',
            r'FullTextDownload\.do',
            r'/detail/originalCheck\.do',
            r'redirectURL',
        ), cap=20):
            if value not in riss_script_windows:
                riss_script_windows.append(value)
    report['riss']['scriptWindows'] = riss_script_windows[:80]
    if rt:
        (OUT / 'riss-detail.html').write_text(rt[:3_000_000], encoding='utf-8')

    nm, nt = fetch(opener, NANET_DETAIL)
    report['nanet']['meta'] = nm
    report['nanet']['identityObserved'] = identity(nt)
    report['nanet']['controlObserved'] = NANET_CONTROL in nt or NANET_CONTROL in (nm.get('finalUrl') or '')
    report['nanet']['accessSignals'] = access_signals(nt)
    report['nanet']['targetWindows'] = windows(nt, (
        rf'viewDoc\s*\([^;]{{0,1600}}{NANET_CONTROL}[^;]{{0,1600}}\)',
        rf'downloadDoc\s*\([^;]{{0,1600}}{NANET_CONTROL}[^;]{{0,1600}}\)',
        r'function\s+viewDoc\s*\([^)]*\)',
        r'function\s+downloadDoc\s*\([^)]*\)',
        r'newViewerCall',
        r'callViewer\.do',
        r'fileDownload\.do',
    ))
    nanet_base = nm.get('finalUrl') or NANET_DETAIL
    nanet_scripts = script_urls(nt, nanet_base)
    report['nanet']['scriptUrls'] = nanet_scripts
    nanet_script_windows = []
    for url in nanet_scripts:
        jm, jt = fetch(opener, url, nanet_base)
        if not jt or not TOKENS.search(jt):
            continue
        for value in windows(jt, (
            r'function\s+viewDoc\s*\([^)]*\)',
            r'function\s+downloadDoc\s*\([^)]*\)',
            r'function\s+newViewerCall\s*\([^)]*\)',
            r'callViewer\.do',
            r'fileDownload\.do',
            r'if\s*\(\s*!?isLogin',
        ), cap=24):
            if value not in nanet_script_windows:
                nanet_script_windows.append(value)
    report['nanet']['scriptWindows'] = nanet_script_windows[:100]
    if nt:
        (OUT / 'nanet-detail.html').write_text(nt[:3_000_000], encoding='utf-8')

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT / 'summary.txt').write_text(
        '\n'.join([
            f'candidate={AUTHOR} 2017 {TITLE}',
            f'rissIdentity={report["riss"]["identityObserved"]}',
            f'rissControlObserved={report["riss"]["finalControlObserved"]}',
            f'rissDocControlNo={report["riss"]["docControlNo"]}',
            f'rissDocType={report["riss"]["docType"]}',
            f'nanetIdentity={report["nanet"]["identityObserved"]}',
            f'nanetControlObserved={report["nanet"]["controlObserved"]}',
            f'nanetAccess={json.dumps(report["nanet"]["accessSignals"], ensure_ascii=False)}',
            'guessedOpaqueIdentifierCount=0',
            'contentActionExecuted=false',
            'fullLengthPdfAcquired=false',
        ]) + '\n',
        encoding='utf-8',
    )

    print((OUT / 'summary.txt').read_text())
    assert rm['status'] == 200 and report['riss']['identityObserved']
    assert report['riss']['finalControlObserved'] and report['riss']['finalMatObserved']
    assert nm['status'] == 200 and report['nanet']['identityObserved'] and report['nanet']['controlObserved']
    assert report['guessedOpaqueIdentifierCount'] == 0
    assert report['contentActionExecuted'] is False
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
