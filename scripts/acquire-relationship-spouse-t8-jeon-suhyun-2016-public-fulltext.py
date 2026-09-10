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
AUTHOR = '전수현'
YEAR = 2016
RISS_CONTROL = '648380763c455520ffe0bdc3ef48d419'
RISS_URL = f'https://m.riss.kr/search/detail/DetailView.do?control_no={RISS_CONTROL}&p_mat_type=be54d9b8bc7cdb09'
NANET_SEARCH_URL = 'https://dl.nanet.go.kr/search/searchInnerList.do?queryText=%EA%B2%BD%EA%B8%B0%EB%8C%80%ED%95%99%EA%B5%90+%EB%AC%B8%ED%99%94%EC%98%88%EC%88%A0%EB%8C%80%ED%95%99%EC%9B%90%3APUB%5EPUB_WS%5EDP_PUB_WS%3AAND&zone=PUB%5EPUB_WS%5EDP_PUB_WS'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()


def fetch(url: str, timeout: int = 20) -> dict[str, object]:
    req = urllib.request.Request(url, headers={
        'User-Agent': UA,
        'Accept': 'text/html,application/javascript,application/pdf;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as resp:
            body = resp.read()
            return {'ok': True, 'status': getattr(resp, 'status', 200), 'finalUrl': resp.geturl(),
                    'contentType': resp.headers.get('Content-Type', ''), 'bytes': len(body),
                    'sha256': hashlib.sha256(body).hexdigest(), 'body': body}
    except urllib.error.HTTPError as exc:
        body = exc.read()
        return {'ok': False, 'status': exc.code, 'finalUrl': exc.geturl(),
                'contentType': exc.headers.get('Content-Type', '') if exc.headers else '',
                'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest(), 'body': body,
                'error': f'HTTPError: {exc}'}
    except Exception as exc:  # noqa: BLE001
        return {'ok': False, 'status': None, 'finalUrl': url, 'contentType': '', 'bytes': 0,
                'sha256': None, 'body': b'', 'error': f'{type(exc).__name__}: {exc}'}


def decode(body: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([\w-]+)', content_type, re.I)
    for enc in [m.group(1) if m else None, 'utf-8', 'euc-kr', 'cp949']:
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


def function_fragments(js: str, name: str) -> list[str]:
    out: list[str] = []
    for m in re.finditer(rf'(?is)(?:function\s+{re.escape(name)}\s*\([^)]*\)\s*\{{|{re.escape(name)}\s*=\s*function\s*\([^)]*\)\s*\{{)', js):
        out.append(js[m.start(): min(len(js), m.start()+9000)])
    return out[:5]


report: dict[str, object] = {
    'candidate': {'title': TITLE, 'author': AUTHOR, 'year': YEAR,
                  'institution': '경기대학교 문화예술대학원', 'degree': '석사',
                  'pages': 'vi, 114 p.', 'rissControl': RISS_CONTROL,
                  'nanetCallNumber': 'TM 181 -16-52'},
    'policy': {'guessedOpaqueIdentifierCount': 0, 'loginBypass': False,
               'institutionAuthBypass': False, 'paywallBypass': False,
               'drmRequestExecuted': False, 'decryptionActionExecuted': False,
               'onlySiteAuthoredPublicRoutesInspected': True},
    'sources': [],
}

riss = fetch(RISS_URL, 25)
riss_body = riss.pop('body')
riss_entry: dict[str, object] = {'name': 'riss', 'requestedUrl': RISS_URL, **riss}
riss_html = ''
if riss_body:
    (ROOT / 'riss-response.html').write_bytes(riss_body)
    riss_html = decode(riss_body, str(riss.get('contentType') or ''))
    text = visibleish(riss_html)
    riss_entry['identityMarkers'] = {'titleExact': TITLE in text or TITLE in riss_html,
                                     'authorExact': AUTHOR in text or AUTHOR in riss_html,
                                     'year': str(YEAR) in text}
    riss_entry['accessMarkers'] = {'originalView': '원문보기' in text,
                                   'download': '다운로드' in text,
                                   'fulltextDownloadOnclick': 'fulltextDownload()' in riss_html,
                                   'login': '로그인' in text}
    srcs = re.findall(r'(?is)<script[^>]+src=["\']([^"\']+)', riss_html)
    authored_srcs = [urllib.parse.urljoin(str(riss.get('finalUrl') or RISS_URL), s)
                     for s in srcs if s.startswith('/') and ('detail' in s.lower() or 'search' in s.lower())]
    riss_entry['siteAuthoredScriptUrls'] = authored_srcs
    script_contracts = []
    for i, url in enumerate(dict.fromkeys(authored_srcs)):
        js_result = fetch(url, 15)
        js_body = js_result.pop('body')
        js_text = decode(js_body, str(js_result.get('contentType') or '')) if js_body else ''
        if js_body:
            (ROOT / f'riss-script-{i}.js').write_bytes(js_body)
        fragments = function_fragments(js_text, 'fulltextDownload')
        if fragments:
            script_contracts.append({'url': url, 'fetch': js_result,
                                     'fulltextDownloadFragments': fragments})
    riss_entry['fulltextDownloadContracts'] = script_contracts
report['sources'].append(riss_entry)

# NANET is a corroborating public holding surface. It may rate-limit cloud runners;
# its failure must not erase the exact RISS identity already established above.
nanet = fetch(NANET_SEARCH_URL, 8)
nanet_body = nanet.pop('body')
nanet_entry: dict[str, object] = {'name': 'nanet_search', 'requestedUrl': NANET_SEARCH_URL, **nanet}
if nanet_body:
    (ROOT / 'nanet-search-response.html').write_bytes(nanet_body)
    html = decode(nanet_body, str(nanet.get('contentType') or ''))
    text = visibleish(html)
    nanet_entry['identityMarkers'] = {'titleExact': TITLE in text or TITLE in html,
                                      'authorExact': AUTHOR in text or AUTHOR in html,
                                      'callNumber': 'TM 181 -16-52' in text}
    nanet_entry['accessMarkers'] = {'electronicMaterial': '전자자료' in text,
                                    'originalView': '원문보기' in text,
                                    'download': '다운로드' in text}
report['sources'].append(nanet_entry)

ri = riss_entry.get('identityMarkers', {})
report['identityDisposition'] = ('EXACT_RISS_IDENTITY_CONFIRMED'
                                 if ri.get('titleExact') and ri.get('authorExact') and ri.get('year')
                                 else 'IDENTITY_NOT_CONFIRMED')
report['rissFulltextFunctionContractRecovered'] = bool(riss_entry.get('fulltextDownloadContracts'))
report['fulltextDisposition'] = 'RISS_SITE_AUTHORED_FULLTEXT_FUNCTION_CONTRACT_DISCOVERED_PENDING_FOLLOW'
report['semanticDisposition'] = 'NO_BODY_LEVEL_DECISION_YET'

path = ROOT / 'report.json'
path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(path.read_text(encoding='utf-8'))
