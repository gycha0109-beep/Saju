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
ROOT.mkdir(parents=True, exist_ok=True)

TITLE = '官星의 十干別 特性에 관한 硏究'
TITLE_KO = '관성의 십간별 특성에 관한 연구'
AUTHOR = '전수현'
YEAR = 2016
RISS_CONTROL = '648380763c455520ffe0bdc3ef48d419'
RISS_URL = f'https://m.riss.kr/search/detail/DetailView.do?control_no={RISS_CONTROL}&p_mat_type=be54d9b8bc7cdb09'
NANET_SEARCH_URL = 'https://dl.nanet.go.kr/search/searchInnerList.do?queryText=%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90+%EB%AC%B8%ED%99%94%EC%98%88%EC%88%A0%EB%8C%80%ED%95%99%EC%9B%90%3APUB%5EPUB_WS%5EDP_PUB_WS%3AAND&zone=PUB%5EPUB_WS%5EDP_PUB_WS'

UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()


def fetch(url: str, method: str = 'GET', data: bytes | None = None, headers: dict[str, str] | None = None) -> dict[str, object]:
    h = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, data=data, method=method, headers=h)
    try:
        with urllib.request.urlopen(req, timeout=30, context=CTX) as resp:
            body = resp.read()
            return {
                'ok': True,
                'status': getattr(resp, 'status', 200),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type', ''),
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
            'bytes': 0,
            'sha256': None,
            'body': b'',
            'error': f'{type(exc).__name__}: {exc}',
        }


def decode(body: bytes, content_type: str) -> str:
    charset = None
    m = re.search(r'charset=([\w-]+)', content_type, re.I)
    if m:
        charset = m.group(1)
    for enc in [charset, 'utf-8', 'euc-kr', 'cp949']:
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


def title_block(html: str, radius: int = 14000) -> str:
    for needle in (TITLE, TITLE_KO, AUTHOR):
        idx = html.find(needle)
        if idx >= 0:
            return html[max(0, idx-radius): min(len(html), idx+len(needle)+radius)]
    return ''


def extract_anchor_contracts(block: str, base: str) -> list[dict[str, str]]:
    out: list[dict[str, str]] = []
    pat = re.compile(r'(?is)<a\b([^>]*)>(.*?)</a>')
    for attrs, inner in pat.findall(block):
        text = visibleish(inner)[:500]
        href_m = re.search(r'(?is)\bhref\s*=\s*["\']([^"\']*)["\']', attrs)
        onclick_m = re.search(r'(?is)\bonclick\s*=\s*["\']([^"\']*)["\']', attrs)
        href = unescape(href_m.group(1)).strip() if href_m else ''
        onclick = unescape(onclick_m.group(1)).strip() if onclick_m else ''
        hay = f'{text} {href} {onclick}'.lower()
        if any(x in hay for x in ('원문', '다운로드', 'download', 'viewer', 'detail', '목차', '官星', '전수현')):
            absolute = ''
            if href and not href.lower().startswith(('javascript:', '#', 'mailto:')):
                absolute = urllib.parse.urljoin(base, href)
            out.append({'text': text, 'href': href, 'absoluteUrl': absolute, 'onclick': onclick})
    dedup: dict[tuple[str, str, str], dict[str, str]] = {}
    for row in out:
        dedup[(row['text'], row['href'], row['onclick'])] = row
    return list(dedup.values())[:200]


def js_function_fragments(html: str, names: set[str]) -> dict[str, list[str]]:
    found: dict[str, list[str]] = {}
    for name in sorted(names):
        snippets: list[str] = []
        for m in re.finditer(rf'(?is)function\s+{re.escape(name)}\s*\([^)]*\)\s*\{{', html):
            snippets.append(html[m.start(): min(len(html), m.start()+5000)])
        if snippets:
            found[name] = snippets[:5]
    return found


report: dict[str, object] = {
    'candidate': {
        'title': TITLE,
        'author': AUTHOR,
        'year': YEAR,
        'institution': '경기대학교 문화예술대학원',
        'degree': '석사',
        'pages': 'vi, 114 p.',
        'rissControl': RISS_CONTROL,
        'nanetCallNumber': 'TM 181 -16-52',
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'onlySiteAuthoredPublicRoutesInspected': True,
    },
    'sources': [],
}

for name, url in [('riss', RISS_URL), ('nanet_search', NANET_SEARCH_URL)]:
    result = fetch(url)
    body = result.pop('body')
    entry: dict[str, object] = {'name': name, 'requestedUrl': url, **result}
    if body:
        suffix = 'pdf' if body[:5] == b'%PDF-' else 'html'
        (ROOT / f'{name}-response.{suffix}').write_bytes(body)
        if suffix == 'html':
            html = decode(body, str(result.get('contentType') or ''))
            text = visibleish(html)
            entry['identityMarkers'] = {
                'titleExact': TITLE in text or TITLE in html,
                'authorExact': AUTHOR in text or AUTHOR in html,
                'year': str(YEAR) in text,
            }
            entry['accessMarkers'] = {
                'electronicMaterial': '전자자료' in text,
                'originalView': '원문보기' in text,
                'download': '다운로드' in text,
                'login': '로그인' in text,
                'institutionVisit': '협정기관' in text,
            }
            if name == 'nanet_search':
                block = title_block(html)
                (ROOT / 'nanet-title-block.html').write_text(block, encoding='utf-8')
                contracts = extract_anchor_contracts(block, str(result.get('finalUrl') or url))
                entry['exactTitleAnchorContracts'] = contracts
                function_names: set[str] = set()
                for c in contracts:
                    onclick = c.get('onclick', '')
                    for fn in re.findall(r'([A-Za-z_$][\w$]*)\s*\(', onclick):
                        function_names.add(fn)
                entry['referencedJsFunctions'] = js_function_fragments(html, function_names)
                entry['boundedTitleBlock'] = visibleish(block)[:12000]
    report['sources'].append(entry)

nanet = next((s for s in report['sources'] if s.get('name') == 'nanet_search'), {})
riss = next((s for s in report['sources'] if s.get('name') == 'riss'), {})
report['identityDisposition'] = (
    'EXACT_IDENTITY_CONFIRMED'
    if nanet.get('identityMarkers', {}).get('titleExact') and nanet.get('identityMarkers', {}).get('authorExact')
    and riss.get('identityMarkers', {}).get('titleExact') and riss.get('identityMarkers', {}).get('authorExact')
    else 'IDENTITY_NOT_YET_CONFIRMED'
)
report['fulltextDisposition'] = 'PUBLIC_ROUTE_CONTRACT_DISCOVERY_PENDING_BODY_FETCH'
report['semanticDisposition'] = 'NO_BODY_LEVEL_DECISION_YET'

path = ROOT / 'report.json'
path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(path.read_text(encoding='utf-8'))
