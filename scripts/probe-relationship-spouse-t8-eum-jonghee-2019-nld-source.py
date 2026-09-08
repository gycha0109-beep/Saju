#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-eum-jonghee-2019')
OUT.mkdir(exist_ok=True)

AUTHOR = '음종희'
TITLE_SIGNAL = '四柱命理 宮星'
KKNOWLEDGE = 'https://k-knowledge.kr/srch/read.jsp?id=281111307'
EXPECTED_UNICNO = '142462'
EXPECTED_KEY_ID = 'CAT-000147672'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/16.2; public-resource-verification)'
MAX = 12 * 1024 * 1024

ALLOWED = ('k-knowledge.kr', 'nld.go.kr')
ROUTE_HINT = re.compile(r'원문|original|download|viewer|view|file|pdf|fulltext|content|source|link', re.I)
ACTION_HINT = re.compile(r'doActionExt|download|viewer|view|file|content|auth|login', re.I)


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


def compact(text: str, limit: int = 9000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def boundary(text: str) -> dict[str, bool]:
    return {
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|소속기관|institutional|institution.?auth', text, re.I)),
        'purchase': bool(re.search(r'구매|결제|유료|purchase|payment|paywall', text, re.I)),
        'drm': bool(re.search(r'\bDRM\b|전용.?뷰어|ezPDF|Fasoo', text, re.I)),
    }


def fetch(opener, url: str, referer: str | None = None, data: dict[str, str] | None = None) -> tuple[dict, bytes, str]:
    assert allowed(url), f'outside bounded official-source allowlist: {url}'
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/json,application/pdf,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
    }
    body_data = None
    if referer:
        headers['Referer'] = referer
    if data is not None:
        body_data = urlencode(data).encode('utf-8')
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        headers['X-Requested-With'] = 'XMLHttpRequest'
    meta = {
        'requestedUrl': url,
        'method': 'POST' if data is not None else 'GET',
        'requestFields': sorted(data.keys()) if data is not None else [],
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'bytes': 0,
        'sha256': None,
        'startsPdf': False,
        'error': None,
    }
    try:
        with opener.open(Request(url, data=body_data, headers=headers), timeout=35) as resp:
            body = resp.read(MAX)
            text = '' if body.startswith(b'%PDF-') else decode(body)
            meta.update({
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'startsPdf': body.startswith(b'%PDF-'),
                'accessBoundary': boundary(text) if text else None,
            })
            return meta, body, text
    except Exception as exc:
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b'', ''


def source_urls(text: str, base: str) -> list[str]:
    vals: list[str] = []
    decoded = html.unescape(text)
    for raw in re.findall(r'https?://[^\s\"\'<>]+', decoded):
        url = raw.rstrip(').,;')
        if allowed(url) and url not in vals:
            vals.append(url)
    for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', decoded, re.I):
        url = urljoin(base, raw)
        if allowed(url) and url not in vals:
            vals.append(url)
    for raw in re.findall(r'''["']([^"'\r\n]{1,1200})["']''', decoded):
        if not (raw.startswith('/') or raw.startswith('http')):
            continue
        url = urljoin(base, raw)
        if allowed(url) and url not in vals:
            vals.append(url)
    return vals


def interesting(text: str, base: str) -> list[dict]:
    rows = []
    decoded = html.unescape(text)
    for n, line in enumerate(decoded.splitlines(), start=1):
        if ROUTE_HINT.search(line) or AUTHOR in line or TITLE_SIGNAL in line or EXPECTED_KEY_ID in line or EXPECTED_UNICNO in line:
            urls = []
            for raw in re.findall(r'https?://[^\s\"\'<>]+', line):
                url = raw.rstrip(').,;')
                if allowed(url) and url not in urls:
                    urls.append(url)
            for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', line, re.I):
                url = urljoin(base, raw)
                if allowed(url) and url not in urls:
                    urls.append(url)
            rows.append({'line': n, 'text': compact(line, 3200), 'urls': urls})
    return rows[:1000]


def windows(text: str, pattern: str, before: int = 1200, after: int = 6500, cap: int = 8) -> list[str]:
    out = []
    for m in re.finditer(pattern, text, re.I | re.S):
        value = compact(text[max(0, m.start() - before): min(len(text), m.start() + after)], before + after)
        if value not in out:
            out.append(value)
        if len(out) >= cap:
            break
    return out


def inspect_script(source: str, text: str) -> dict:
    defs = []
    for pat in (
        r'function\s+doActionExt\s*\([^)]*\)',
        r'(?:var|let|const)\s+doActionExt\s*=\s*(?:function\s*)?\(',
        r'doActionExt\s*:\s*function\s*\(',
    ):
        vals = windows(text, pat)
        if vals:
            defs.extend(vals)
    routes = []
    for raw in re.findall(r'''["']([^"'\r\n]{1,1200})["']''', html.unescape(text)):
        if not ACTION_HINT.search(raw):
            continue
        if not (raw.startswith('/') or raw.startswith('http')):
            continue
        url = urljoin(source, raw)
        if allowed(url) and url not in routes:
            routes.append(url)
    return {'source': source, 'doActionExtWindows': defs[:12], 'routeLiterals': routes[:200]}


def metadata_subset(payload: dict) -> dict:
    items = []
    for row in payload.get('list') or []:
        item = {
            k: row.get(k)
            for k in (
                'title', 'sub_title', 'author100', 'author110', 'publisher', 'ucCno',
                'dataTypeCode', 'contentTypeCode', 'target_div_code', 'volume_no',
                'volume_title', 'multipart', 'sign'
            )
        }
        item['gwonList'] = [
            {
                k: g.get(k)
                for k in ('volumeNo', 'volumeTitle', 'multipart', 'dataTypeCode', 'ucCno', 'target_div_code', 'sign')
            }
            for g in (row.get('gwonList') or [])
        ][:100]
        items.append(item)
    return {'list': items[:100]}


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'follow only exact official NLD source/metadata contracts authored on the target public pages; no content action, auth, or access-control bypass',
        'target': {'author': AUTHOR, 'kKnowledgeId': '281111307'},
        'kKnowledge': None,
        'sourceRelationObserved': False,
        'sourceUrl': None,
        'nldDetail': None,
        'nldInterestingLines': [],
        'nldCandidateUrls': [],
        'getDetailInfoContractObserved': False,
        'getDetailInfo': None,
        'getDetailInfoPayload': None,
        'metadataTargetMatched': False,
        'scriptUrls': [],
        'scriptInspections': [],
        'doActionExtObserved': False,
        'contentActionExecuted': False,
    }

    km, _kb, kt = fetch(opener, KKNOWLEDGE)
    report['kKnowledge'] = km
    assert AUTHOR in kt and TITLE_SIGNAL in kt, 'K-knowledge target identity mismatch'

    candidates = []
    for url in source_urls(kt, km.get('finalUrl') or KKNOWLEDGE):
        if 'nld.go.kr/home/dataDetailSojang.do' not in url:
            continue
        if f'unicno={EXPECTED_UNICNO}' in url and f'key_id={EXPECTED_KEY_ID}' in url:
            candidates.append(url)
    assert candidates, 'exact NLD source relation disappeared from target K-knowledge page'
    source_url = candidates[0]
    report['sourceRelationObserved'] = True
    report['sourceUrl'] = source_url

    nm, _nb, nt = fetch(opener, source_url, KKNOWLEDGE)
    report['nldDetail'] = nm
    if nt:
        assert AUTHOR in nt or TITLE_SIGNAL in nt or EXPECTED_KEY_ID in nt, 'NLD source detail identity mismatch'
        report['nldInterestingLines'] = interesting(nt, nm.get('finalUrl') or source_url)
        urls = []
        for row in report['nldInterestingLines']:
            for url in row['urls']:
                if url not in urls:
                    urls.append(url)
        report['nldCandidateUrls'] = urls[:200]
        (OUT / 'nld-detail.txt').write_text(nt[:2_000_000], encoding='utf-8')

        normalized = re.sub(r'\s+', '', nt)
        report['getDetailInfoContractObserved'] = (
            'url:"/home/getDetailInfo.do"' in normalized
            and "unicno='142462'" in normalized
            and "target:'SJ'" in normalized
        )
        if report['getDetailInfoContractObserved']:
            metadata_url = urljoin(nm.get('finalUrl') or source_url, '/home/getDetailInfo.do')
            mm, _mb, mt = fetch(
                opener,
                metadata_url,
                source_url,
                data={
                    'target': 'SJ',
                    'unicno': EXPECTED_UNICNO,
                    'uccno': '',
                    'rowCnt': '1',
                    'searchWd': '',
                    'reQuery': '',
                },
            )
            report['getDetailInfo'] = mm
            if mt:
                try:
                    payload = json.loads(mt)
                except json.JSONDecodeError:
                    payload = None
                if isinstance(payload, dict):
                    report['getDetailInfoPayload'] = metadata_subset(payload)
                    joined = json.dumps(report['getDetailInfoPayload'], ensure_ascii=False)
                    report['metadataTargetMatched'] = AUTHOR in joined or TITLE_SIGNAL in joined
                    (OUT / 'nld-get-detail-info.json').write_text(
                        json.dumps(report['getDetailInfoPayload'], ensure_ascii=False, indent=2),
                        encoding='utf-8',
                    )

        script_urls = []
        for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', nt, re.I):
            url = urljoin(nm.get('finalUrl') or source_url, html.unescape(raw))
            if allowed(url) and urlparse(url).hostname and urlparse(url).hostname.endswith('nld.go.kr') and url not in script_urls:
                script_urls.append(url)
        report['scriptUrls'] = script_urls[:80]
        for url in report['scriptUrls']:
            sm, _sb, st = fetch(opener, url, source_url)
            if not st or 'doActionExt' not in st:
                continue
            rec = inspect_script(sm.get('finalUrl') or url, st)
            rec['meta'] = sm
            report['scriptInspections'].append(rec)
            if rec['doActionExtWindows']:
                report['doActionExtObserved'] = True

    path = OUT / 'nld-source.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({
        'sourceRelationObserved': report['sourceRelationObserved'],
        'sourceUrl': report['sourceUrl'],
        'nldDetail': report['nldDetail'],
        'getDetailInfoContractObserved': report['getDetailInfoContractObserved'],
        'getDetailInfo': report['getDetailInfo'],
        'getDetailInfoPayload': report['getDetailInfoPayload'],
        'metadataTargetMatched': report['metadataTargetMatched'],
        'doActionExtObserved': report['doActionExtObserved'],
        'scriptInspections': [
            {'source': x['source'], 'doActionExtWindows': x['doActionExtWindows'], 'routeLiterals': x['routeLiterals']}
            for x in report['scriptInspections']
        ],
        'contentActionExecuted': report['contentActionExecuted'],
    }, ensure_ascii=False, indent=2))

    assert report['sourceRelationObserved'] is True
    assert report['getDetailInfoContractObserved'] is True, 'site-authored NLD metadata contract disappeared'
    assert report['getDetailInfo'] and report['getDetailInfo']['status'] == 200, 'public NLD target metadata request failed'
    assert report['getDetailInfoPayload'] is not None, 'public NLD target metadata was not JSON'
    assert report['metadataTargetMatched'] is True, 'NLD metadata response did not match target identity'
    assert report['contentActionExecuted'] is False
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
