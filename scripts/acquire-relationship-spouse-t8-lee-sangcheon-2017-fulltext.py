#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import io
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import quote, unquote, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, Request, build_opener

import pymupdf
from pypdf import PdfReader

AUTHOR = '이상천'
YEAR = 2017
TITLE = '『적천수천미』 「육친론」에 관한 연구'
ENGLISH_TITLE = 'A study of Yukchinlon in Jeokcheonsuchoenmi'
NANET_CONTROL = 'KDMT1201802346'
NANET_DETAIL = f'https://dl.nanet.go.kr/SearchDetailView.do?cn={NANET_CONTROL}'
NANET_DETAIL_ALT = f'https://dl.nanet.go.kr/detail/{NANET_CONTROL}'
UBE_THESES = 'https://www.ube.ac.kr/hmpg/biz/kor/mjgd/KukhakListOfTheses.do'
RISS_SEARCH = (
    'https://www.riss.kr/search/Search.do?isDetailSearch=N&searchGubun=true&viewYn=OP&'
    f'query={quote(TITLE)}&queryText=&iStartCount=0&iGroupView=5&colName=bib_t'
)
OUT = Path('acquisition-lee-sangcheon-2017')
PRIVATE = Path('acquisition-lee-sangcheon-2017-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/13.0; public-resource-verification)'
MAX_BYTES = 55 * 1024 * 1024

KEYWORDS = (
    '부처', '夫妻', '배우자', '남편', '아내', '처', '妻', '夫', '남명', '여명', '남자', '여자',
    '육친', '六親', '재해석', '현대', '근대', '사회역할', '가부장', '남존여비', '관성', '재성',
    '용신', '희신', '일지', '배우자궁', '성별', '동성', '결혼', '혼인',
)
SIGNAL_RE = re.compile(
    r'KDMT1201802346|적천수|육친|六親|원문|original|full.?text|pdf|download|viewer|view|file|'
    r'로그인|login|기관.?인증|구매|결제|유료|DRM|전자자료|원문보기|다운로드',
    re.I,
)
ROUTE_RE = re.compile(r'pdf|download|viewer|original|full.?text|file|원문', re.I)


class RedirectRecorder(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[tuple[int, str]] = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append((code, newurl))
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def decode(data: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            continue
    return data.decode('utf-8', errors='replace')


def access_boundary(text: str) -> dict[str, bool]:
    return {
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|소속기관|institutional|institution.?auth', text, re.I)),
        'purchase': bool(re.search(r'구매|결제|유료|이용권|purchase|payment|paywall', text, re.I)),
        'drmOrDedicatedViewer': bool(re.search(r'DRM|전용.?뷰어|dedicated.?viewer|ezPDF|Fasoo', text, re.I)),
    }


def bounded_signals(text: str, limit: int = 120) -> list[str]:
    out: list[str] = []
    for line in text.splitlines():
        if SIGNAL_RE.search(line):
            s = re.sub(r'\s+', ' ', line).strip()
            if s and s not in out:
                out.append(s[:3000])
            if len(out) >= limit:
                break
    return out


def fetch(opener, rd: RedirectRecorder, url: str, referer: str | None = None, limit: int = 6_000_000):
    rd.chain.clear()
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/pdf,application/octet-stream,*/*;q=0.7',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
    }
    if referer:
        headers['Referer'] = referer
    try:
        with opener.open(Request(url, headers=headers), timeout=45) as r:
            data = r.read(limit)
            meta = {
                'requestedUrl': url,
                'status': getattr(r, 'status', None),
                'finalUrl': r.geturl(),
                'redirectChain': rd.chain.copy(),
                'contentType': r.headers.get('Content-Type'),
                'contentDisposition': r.headers.get('Content-Disposition'),
                'bytes': len(data),
                'sha256': hashlib.sha256(data).hexdigest(),
                'error': None,
            }
    except Exception as e:
        return {
            'requestedUrl': url,
            'status': None,
            'finalUrl': None,
            'redirectChain': rd.chain.copy(),
            'contentType': None,
            'contentDisposition': None,
            'bytes': 0,
            'sha256': None,
            'error': f'{type(e).__name__}: {e}',
        }, b'', ''
    text = '' if data.startswith(b'%PDF-') else decode(data)
    if text:
        meta['signals'] = bounded_signals(text)
        meta['accessBoundary'] = access_boundary(text)
    return meta, data, text


def same_public_host(url: str, base_url: str) -> bool:
    p = urlparse(url)
    b = urlparse(base_url)
    return p.scheme in ('http', 'https') and p.hostname == b.hostname


def extract_site_authored_routes(text: str, base_url: str, control_token: str | None = None) -> list[dict]:
    decoded = html.unescape(text)
    out: list[dict] = []

    attrs = re.findall(
        r'''(?:href|src|action|data-url|data-href|data-download-url|data-view-url)\s*=\s*["']([^"']+)["']''',
        decoded,
        re.I,
    )
    for raw in attrs:
        if raw.startswith(('javascript:', '#', 'mailto:')):
            continue
        if not ROUTE_RE.search(raw):
            continue
        url = urljoin(base_url, unquote(raw))
        if same_public_host(url, base_url):
            out.append({'source': 'html-attribute', 'url': url})

    for raw in re.findall(r'''["']([^"']{1,900})["']''', decoded):
        if not ROUTE_RE.search(raw):
            continue
        if '/' not in raw and not raw.startswith('http'):
            continue
        if control_token and control_token not in raw and control_token not in decoded:
            continue
        url = urljoin(base_url, unquote(raw))
        if same_public_host(url, base_url):
            out.append({'source': 'script-string', 'url': url})

    # Preserve article-specific JavaScript call fragments for manual adjudication,
    # but do not synthesize unknown endpoints from them.
    seen: set[str] = set()
    deduped: list[dict] = []
    for route in out:
        url = route['url']
        if url in seen:
            continue
        seen.add(url)
        deduped.append(route)
    return deduped[:60]


def extract_call_signals(text: str, token: str, limit: int = 40) -> list[str]:
    out: list[str] = []
    for m in re.finditer(r'[^\n]{0,900}' + re.escape(token) + r'[^\n]{0,1400}', html.unescape(text), re.I):
        s = re.sub(r'\s+', ' ', m.group(0)).strip()
        if s and s not in out:
            out.append(s[:2600])
        if len(out) >= limit:
            break
    return out


def inspect_pdf(data: bytes, label: str, url: str) -> dict:
    rec = {
        'label': label,
        'sourceUrl': url,
        'sha256': hashlib.sha256(data).hexdigest(),
        'bytes': len(data),
        'pageCount': 0,
        'encrypted': None,
        'textHealthy': False,
        'keywordHits': [],
        'renderedPages': [],
        'error': None,
    }
    try:
        reader = PdfReader(io.BytesIO(data))
        rec['pageCount'] = len(reader.pages)
        rec['encrypted'] = bool(reader.is_encrypted)
        korean = 0
        hit_pages: list[int] = []
        all_text: list[str] = []
        for i, page in enumerate(reader.pages, 1):
            try:
                text = (page.extract_text() or '').replace('\x00', ' ')
            except Exception:
                text = ''
            all_text.append(text)
            korean += len(re.findall(r'[가-힣]', text))
            lines = [x.strip() for x in text.splitlines() if x.strip()]
            snippets: list[str] = []
            for n, line in enumerate(lines):
                if any(k in line for k in KEYWORDS):
                    snippets.append(' / '.join(lines[max(0, n - 2):min(len(lines), n + 3)])[:1900])
            if snippets:
                hit_pages.append(i)
                rec['keywordHits'].append({'physicalPdfPage': i, 'snippets': snippets[:14]})
        rec['textHealthy'] = korean >= 250

        n = rec['pageCount']
        targets: list[int] = []
        if n <= 4:
            targets = list(range(1, n + 1))
        elif rec['textHealthy'] and hit_pages:
            for p in hit_pages:
                for q in (p - 1, p, p + 1):
                    if 1 <= q <= n and q not in targets:
                        targets.append(q)
            # Always include opening/closing anchors; body review can expand later.
            for q in (1, 2, 3, max(1, n - 4), max(1, n - 3), max(1, n - 2), max(1, n - 1), n):
                if 1 <= q <= n and q not in targets:
                    targets.append(q)
            targets = targets[:36]
        else:
            step = max(1, n // 12)
            targets = sorted(set([1, 2, 3, n] + list(range(1, n + 1, step))))[:20]

        doc = pymupdf.open(stream=data, filetype='pdf')
        try:
            for p in targets:
                pix = doc.load_page(p - 1).get_pixmap(matrix=pymupdf.Matrix(1.25, 1.25), alpha=False)
                f = OUT / f'rendered-{label}-p{p:03d}.png'
                pix.save(f)
                rec['renderedPages'].append({
                    'physicalPdfPage': p,
                    'file': f.name,
                    'sha256': hashlib.sha256(f.read_bytes()).hexdigest(),
                    'bytes': f.stat().st_size,
                })
        finally:
            doc.close()
    except Exception as e:
        rec['error'] = f'{type(e).__name__}: {e}'
    return rec


def maybe_pdf(report: dict, data: bytes, label: str, url: str) -> bool:
    if not data.startswith(b'%PDF-'):
        return False
    (PRIVATE / f'{label}.pdf').write_bytes(data)
    report['pdfs'].append(inspect_pdf(data, label, url))
    return True


def main() -> int:
    jar = CookieJar()
    rd = RedirectRecorder()
    opener = build_opener(HTTPCookieProcessor(jar), rd)
    report = {
        'purpose': 'public scholarly fulltext acquisition only; no login, institutional authentication, purchase, DRM, or access-control bypass',
        'candidate': {
            'author': AUTHOR,
            'year': YEAR,
            'title': TITLE,
            'englishTitle': ENGLISH_TITLE,
            'institution': '국제뇌교육종합대학원대학교',
            'degree': '석사',
            'department': '국학과 명리전공',
            'advisor': '김기승',
            'publicationDate': '2017.2',
            'nanetControlNo': NANET_CONTROL,
            'nanetCallNo': 'TM 181.211 -17-21',
            'bibliographicExtent': 'vi, 62 p. ; 26 cm',
            'spouseChapterToc': 'II.3.1 부처(夫妻) p.37; III.2.1 부처(夫妻) p.51',
        },
        'surfaces': [],
        'siteAuthoredRoutes': [],
        'callSignals': [],
        'routeAttempts': [],
        'pdfs': [],
        'fullLengthPdfAcquired': False,
    }

    surfaces = [
        ('nanet-detail', NANET_DETAIL, None),
        ('nanet-detail-alt', NANET_DETAIL_ALT, NANET_DETAIL),
        ('ube-theses', UBE_THESES, None),
        ('riss-title-search', RISS_SEARCH, None),
    ]
    texts: dict[str, str] = {}
    for label, url, referer in surfaces:
        meta, data, text = fetch(opener, rd, url, referer, 8_000_000)
        meta['label'] = label
        report['surfaces'].append(meta)
        texts[label] = text
        maybe_pdf(report, data, label, meta.get('finalUrl') or url)

    route_specs: list[dict] = []
    for label in ('nanet-detail', 'nanet-detail-alt'):
        text = texts.get(label, '')
        base = NANET_DETAIL if label == 'nanet-detail' else NANET_DETAIL_ALT
        route_specs.extend(extract_site_authored_routes(text, base, NANET_CONTROL))
        report['callSignals'].extend(extract_call_signals(text, NANET_CONTROL))

    # UBE is used for identity corroboration only unless its exact thesis list emits a fulltext route.
    route_specs.extend(extract_site_authored_routes(texts.get('ube-theses', ''), UBE_THESES, AUTHOR))
    # RISS search result may reveal an exact thesis detail/fulltext URL; only follow site-authored routes.
    route_specs.extend(extract_site_authored_routes(texts.get('riss-title-search', ''), RISS_SEARCH, AUTHOR))

    seen: set[str] = set()
    routes: list[dict] = []
    for route in route_specs:
        if route['url'] in seen:
            continue
        seen.add(route['url'])
        routes.append(route)
    report['siteAuthoredRoutes'] = routes

    for i, route in enumerate(routes[:70], 1):
        ref = NANET_DETAIL if 'nanet.go.kr' in route['url'] else None
        meta, data, text = fetch(opener, rd, route['url'], ref, MAX_BYTES)
        meta.update({'origin': route['source'], 'startsPdf': data.startswith(b'%PDF-')})
        if not maybe_pdf(report, data, f'route-{i:02d}', meta.get('finalUrl') or route['url']) and text:
            meta['bodySample'] = re.sub(r'\s+', ' ', text).strip()[:5000]
        report['routeAttempts'].append(meta)

    report['fullLengthPdfAcquired'] = any(p.get('pageCount', 0) >= 50 for p in report['pdfs'])
    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')

    lines = [
        f'candidate={report["candidate"]}',
        f'siteAuthoredRoutes={report["siteAuthoredRoutes"]}',
        f'callSignals={report["callSignals"]}',
        f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}',
    ]
    for s in report['surfaces']:
        lines.append('SURFACE ' + json.dumps(s, ensure_ascii=False, sort_keys=True))
    for a in report['routeAttempts']:
        lines.append('ATTEMPT ' + json.dumps(a, ensure_ascii=False, sort_keys=True))
    for p in report['pdfs']:
        lines.append(
            f'PDF sha={p["sha256"]} bytes={p["bytes"]} pages={p["pageCount"]} '
            f'encrypted={p["encrypted"]} textHealthy={p["textHealthy"]} url={p["sourceUrl"]}'
        )
        for hit in p.get('keywordHits', [])[:48]:
            lines.append(f'PAGE {hit["physicalPdfPage"]}: ' + ' || '.join(hit['snippets'][:8]))
        lines.append(f'RENDERED={p.get("renderedPages", [])}')
    (OUT / 'summary.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print('\n'.join(lines))

    c = report['candidate']
    assert c['author'] == AUTHOR
    assert c['year'] == YEAR
    assert c['nanetControlNo'] == NANET_CONTROL
    assert '부처(夫妻)' in c['spouseChapterToc']
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
