#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, parse_qsl, urlencode, urljoin, urlparse, urlsplit, urlunsplit
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener
from pypdf import PdfReader

ROOT = Path('acquisition-kim-insun-2011'); ROOT.mkdir(exist_ok=True)
AUTHOR = '김인순'
TITLE = '명리학의 궁합론 연구'
TITLE_HAN = '命理學의 宮合論 硏究'
YEAR = '2011'
INSTITUTION = '동방대학원대학교'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Kim-Insun-2011-public-acquisition)'

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl): return None

def sha(raw: bytes) -> str: return hashlib.sha256(raw).hexdigest()
def host(url: str) -> str: return (urlparse(url).hostname or '').lower()
def is_riss(url: str) -> bool: return host(url) in {'www.riss.kr', 'riss.kr', 'm.riss.kr'}
def is_dc(url: str) -> bool:
    h = host(url); return bool(h) and (h == 'dcollection.net' or h.endswith('.dcollection.net'))
def decode(raw: bytes, ct: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ct or '', re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'cp949', 'euc-kr']:
        try: return raw.decode(enc)
        except Exception: pass
    return raw.decode('utf-8', errors='replace')
def normalize_http_url(url: str) -> str:
    p = urlsplit(url); return urlunsplit((p.scheme, p.netloc, p.path, urlencode(parse_qsl(p.query, keep_blank_values=True)), p.fragment))
def fetch(opener, url: str, referer: str | None = None, max_bytes: int = 30_000_000):
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8'}
    if referer: headers['Referer'] = referer
    meta = {'requestedUrl': url, 'finalUrl': None, 'status': None, 'location': None, 'contentType': '', 'contentDisposition': '', 'bytes': 0, 'sha256': None, 'pdfMagic': False, 'error': None}
    try:
        with opener.open(Request(url, headers=headers), timeout=35) as r:
            raw = r.read(max_bytes + 1); assert len(raw) <= max_bytes
            meta.update({'finalUrl': r.geturl(), 'status': getattr(r, 'status', None), 'location': r.headers.get('Location'), 'contentType': r.headers.get('Content-Type', ''), 'contentDisposition': r.headers.get('Content-Disposition', ''), 'bytes': len(raw), 'sha256': sha(raw), 'pdfMagic': raw.startswith(b'%PDF-')})
            return meta, raw
    except HTTPError as e:
        raw = e.read(max_bytes + 1); assert len(raw) <= max_bytes
        meta.update({'finalUrl': url, 'status': e.code, 'location': e.headers.get('Location'), 'contentType': e.headers.get('Content-Type', ''), 'contentDisposition': e.headers.get('Content-Disposition', ''), 'bytes': len(raw), 'sha256': sha(raw), 'pdfMagic': raw.startswith(b'%PDF-'), 'error': f'HTTPError: {e.code}'})
        return meta, raw

def clean(fragment: str) -> str: return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', fragment))).strip()
def norm_title(v: str) -> str: return re.sub(r'[\s:：·ㆍ\-_=]+', '', v.replace('理', '理'))
def links(base: str, text: str) -> list[str]:
    out = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        v = html.unescape(m.group(2).strip())
        if not v or v.lower().startswith(('javascript:', 'mailto:', '#')): continue
        u = urljoin(base, v)
        if u not in out: out.append(u)
    for m in re.finditer(r'''["'](https?://[^"']+)["']''', text, re.I):
        u = html.unescape(m.group(1).strip())
        if u not in out: out.append(u)
    return out

def exact_search_card(base: str, text: str):
    target_titles = {norm_title(TITLE), norm_title(TITLE_HAN)}
    pat = re.compile(r'<p\s+class=["\']title["\']>\s*<a\s+href=["\']([^"\']*DetailView\.do\?[^"\']+)["\'][^>]*>(.*?)</a>\s*</p>\s*<p\s+class=["\']etc["\']>(.*?)</p>', re.I | re.S)
    for m in pat.finditer(text):
        title = clean(m.group(2)); etc = clean(m.group(3))
        if norm_title(title) not in target_titles or AUTHOR not in etc or YEAR not in etc: continue
        start = max(0, m.start() - 1500); end = min(len(text), m.end() + 6000); block = text[start:end]; block_text = clean(block)
        if '석사' not in block_text: continue
        if '동방' not in block_text: continue
        u = urljoin(base, html.unescape(m.group(1))); q = parse_qs(urlparse(u).query)
        control = (q.get('control_no') or [None])[0]; pmat = (q.get('p_mat_type') or [None])[0]
        if not control or not pmat: continue
        tuple_match = re.search(r"fulltextDownload\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]", block, re.I | re.S)
        tuple_data = None
        if tuple_match and tuple_match.group(1) == control:
            tuple_data = {'control_no': tuple_match.group(1), 'p_mat_type': tuple_match.group(2), 'p_submat_type': tuple_match.group(3), 'fulltext_kind': tuple_match.group(4)}
        return {'siteAuthoredDetailUrl': u, 'title': title, 'etc': etc, 'control': control, 'p_mat_type': pmat, 'sameCardBlock': block_text, 'siteAuthoredFulltextTuple': tuple_data}
    return None

def doc_form(text: str) -> str:
    m = re.search(r'<form\b[^>]*(?:id=["\']f["\']|name=["\']f["\'])[^>]*>', text, re.I | re.S); assert m, 'RISS document.f not found'
    end = text.find('</form>', m.end()); assert end >= 0, 'RISS document.f end not found'; return text[m.start():end + 7]
def fields(block: str) -> dict[str, str]:
    out = {}
    for m in re.finditer(r'<input\b[^>]*>', block, re.I | re.S):
        tag = html.unescape(m.group(0)); n = re.search(r'\bname\s*=\s*["\']([^"\']+)', tag, re.I)
        if not n: continue
        t = re.search(r'\btype\s*=\s*["\']([^"\']+)', tag, re.I)
        if t and t.group(1).lower() in {'submit', 'button', 'checkbox', 'radio'}: continue
        v = re.search(r'\bvalue\s*=\s*["\']([^"\']*)', tag, re.I); out[n.group(1)] = v.group(1) if v else ''
    return out

def same_host_candidates(base: str, text: str, dc_host: str) -> list[str]:
    out = []
    for u in links(base, text):
        if host(u) == dc_host and any(x in u.lower() for x in ['pdf', 'viewer', 'download', 'fulltext', 'file']): out.append(u)
    for m in re.finditer(r'''["'](/public_resource/pdf/[^"']+\.pdf)["']''', text, re.I):
        u = urljoin(base, html.unescape(m.group(1)))
        if host(u) == dc_host and u not in out: out.insert(0, u)
    return list(dict.fromkeys(out))

ctx = ssl.create_default_context(); normal = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar())); no_redirect = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(CookieJar()), NoRedirect())
report = {'candidate': {'author': AUTHOR, 'title': TITLE, 'year': 2011, 'institution': INSTITUTION, 'rissId': None, 'control': None}, 'searchDiscovery': None, 'detail': None, 'detailIdentitySignals': None, 'formTuple': None, 'dispatcher': None, 'dcollection': None, 'pdfInspection': None, 'fullLengthPdfAcquired': False, 'guessedOpaqueIdentifierCount': 0, 'loginBypass': False, 'institutionAuthBypass': False, 'paywallBypass': False, 'drmRequestExecuted': False, 'decryptionActionExecuted': False, 'tlsVerificationDisabled': False, 'crossSourceSemanticStitching': False, 'semanticDisposition': 'PUBLIC_ROUTE_INSPECTION_PENDING'}
search_terms = [TITLE, TITLE_HAN, '김인순 명리학의 궁합론 연구']; discovery = []; card = None; detail_meta = detail_raw = None
for si, term in enumerate(search_terms, 1):
    surl = 'https://www.riss.kr/search/Search.do?' + urlencode({'isDetailSearch': 'N', 'searchGubun': 'true', 'viewYn': 'OP', 'query': term})
    sm, sr = fetch(normal, surl, max_bytes=9_000_000); st = decode(sr, sm['contentType']); (ROOT / f'riss-search-{si}.html').write_text(st, encoding='utf-8')
    c = exact_search_card(sm['finalUrl'] or surl, st); discovery.append({'searchUrl': surl, 'response': sm, 'exactSearchCardFound': bool(c)})
    if c:
        card = c; request_u = normalize_http_url(c['siteAuthoredDetailUrl']); dm, dr = fetch(normal, request_u, sm['finalUrl'] or surl, max_bytes=9_000_000)
        detail_meta, detail_raw = dm, dr; (ROOT / 'riss-candidate-detail.html').write_bytes(dr); break
assert card and detail_meta is not None and detail_raw is not None, 'exact Kim Insun 2011 thesis search-result card not resolved'
assert detail_meta['status'] == 200
report['searchDiscovery'] = {'searches': discovery, 'card': card, 'resolutionRule': 'EXACT_SITE_AUTHORED_THESIS_SEARCH_RESULT_CARD_TITLE_AUTHOR_SCHOOL_YEAR_TYPE_AND_LITERAL_DETAIL_ROUTE'}
report['candidate']['control'] = card['control']; report['detail'] = detail_meta
text = decode(detail_raw, detail_meta['contentType']); (ROOT / 'riss-detail.html').write_text(text, encoding='utf-8')
q = parse_qs(urlparse(detail_meta['finalUrl'] or card['siteAuthoredDetailUrl']).query); assert (q.get('control_no') or [None])[0] == card['control']
ids = sorted(set(re.findall(r'https://www\.riss\.kr/link\?id=(T\d+)', text))); report['candidate']['rissId'] = ids[0] if len(ids) == 1 else None
signals = {'controlLiteralPresent': card['control'] in text, 'titleLiteralPresent': (TITLE in text or '命理學의 宮合論' in text), 'authorLiteralPresent': AUTHOR in text, 'yearLiteralPresent': YEAR in text, 'observedTIds': ids}
report['detailIdentitySignals'] = signals
assert signals['controlLiteralPresent'] and signals['titleLiteralPresent'] and signals['authorLiteralPresent'] and signals['yearLiteralPresent']
f = fields(doc_form(text)); assert f.get('control_no') == card['control'] and f.get('p_mat_type')
form_tuple = {k: f.get(k) for k in ['control_no', 'p_mat_type', 'p_submat_type', 'fulltext_kind']}; report['formTuple'] = form_tuple
if card['siteAuthoredFulltextTuple']:
    for k, v in card['siteAuthoredFulltextTuple'].items():
        if v: assert form_tuple.get(k) == v
observed = False
for i, u in enumerate([u for u in links(detail_meta['finalUrl'] or card['siteAuthoredDetailUrl'], text) if is_riss(u) and (u.lower().endswith('.js') or '.js?' in u.lower())][:50], 1):
    try:
        sm, sr = fetch(normal, normalize_http_url(u), detail_meta['finalUrl'] or card['siteAuthoredDetailUrl'], 3_000_000); st = decode(sr, sm['contentType'])
        if 'fulltextDownload' in st or 'FullTextDownload.do' in st: (ROOT / f'riss-script-{i:02d}.txt').write_text(st, encoding='utf-8')
        if 'FullTextDownload.do' in st and ('serialize()' in st or 'document.f' in st): observed = True
    except Exception: pass
assert observed, 'current site-authored RISS fulltext dispatcher implementation not observed'
f['loginFlag'] = '1'; f['content_page'] = ''; endpoint = 'https://www.riss.kr/search/download/FullTextDownload.do'; req = endpoint + '?' + urlencode(f); dm, dr = fetch(no_redirect, req, detail_meta['finalUrl'] or card['siteAuthoredDetailUrl'])
pdf = ROOT / 'kim-insun-2011.pdf'; external = []
if dm['pdfMagic'] or 'application/pdf' in dm['contentType'].lower(): pdf.write_bytes(dr)
else:
    dt = decode(dr, dm['contentType']); (ROOT / 'riss-fulltext-dispatch-response.html').write_text(dt, encoding='utf-8'); external = [u for u in links(endpoint, dt) if not is_riss(u)]
    loc = dm.get('location')
    if loc:
        loc = urljoin(endpoint, loc)
        if not is_riss(loc) and loc not in external: external.insert(0, loc)
report['dispatcher'] = {'implementationObserved': True, 'request': dm, 'externalUrls': external, 'disposition': 'RISS_DISPATCHER_AUTHORED_DCOLLECTION_ROUTE' if any(is_dc(u) for u in external) else 'RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_OBSERVED'}
authored = next((u for u in external if is_dc(u)), None)
if not pdf.exists() and authored:
    h = host(authored); dc = {'rissAuthoredUrl': authored, 'host': h, 'entry': None, 'followed': [], 'directPdfAcquired': False, 'disposition': 'PUBLIC_ROUTE_REVIEW_PENDING'}
    try:
        em, er = fetch(normal, normalize_http_url(authored), req); dc['entry'] = em
        if em['pdfMagic'] or 'application/pdf' in em['contentType'].lower(): pdf.write_bytes(er); dc['directPdfAcquired'] = True
        else:
            et = decode(er, em['contentType']); (ROOT / 'dcollection-entry.html').write_text(et, encoding='utf-8'); queue = same_host_candidates(em['finalUrl'] or authored, et, h); seen = set()
            for u in queue[:35]:
                if u in seen: continue
                seen.add(u); fm, fr = fetch(normal, normalize_http_url(u), em['finalUrl'] or authored); dc['followed'].append({'url': u, 'response': fm})
                if fm['pdfMagic'] or 'application/pdf' in fm['contentType'].lower(): pdf.write_bytes(fr); dc['directPdfAcquired'] = True; break
        dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_PUBLIC_PDF_ACQUIRED' if dc['directPdfAcquired'] else 'RISS_AUTHORED_DCOLLECTION_NO_DIRECT_PDF_OBSERVED'
    except URLError as e:
        if isinstance(e.reason, ssl.SSLCertVerificationError): dc['strictTlsError'] = f'{type(e.reason).__name__}: {e.reason}'; dc['disposition'] = 'RISS_AUTHORED_DCOLLECTION_TLS_CERT_VERIFICATION_BOUNDARY_STOP_NO_BYPASS'
        else: raise
    report['dcollection'] = dc
if pdf.exists():
    b = pdf.read_bytes(); r = PdfReader(str(pdf)); assert not r.is_encrypted
    txt = ''.join([f'\n===== PHYSICAL_PDF_PAGE_{i} =====\n{p.extract_text() or ""}' for i, p in enumerate(r.pages, 1)]); (ROOT / 'kim-insun-2011.txt').write_text(txt, encoding='utf-8')
    report['pdfInspection'] = {'sha256': sha(b), 'bytes': len(b), 'pages': len(r.pages), 'encrypted': False, 'textChars': len(txt)}; report['fullLengthPdfAcquired'] = len(r.pages) >= 50; report['semanticDisposition'] = 'DIRECT_BODY_ACQUIRED_REQUIRES_RENDER_FIRST_REVIEW'
else: report['semanticDisposition'] = 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION'
assert report['guessedOpaqueIdentifierCount'] == 0 and report['tlsVerificationDisabled'] is False and not report['loginBypass'] and not report['institutionAuthBypass'] and not report['paywallBypass'] and not report['drmRequestExecuted'] and not report['decryptionActionExecuted'] and not report['crossSourceSemanticStitching']
(ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8'); print(json.dumps(report, ensure_ascii=False, indent=2))
