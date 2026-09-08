#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import subprocess
import time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, Request, build_opener

OUT = Path('acquisition-eum-jonghee-2019')
PRIVATE = Path('acquisition-eum-jonghee-2019-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)

TITLE = '四柱命理 宮星에 관한 硏究 : 宮에 따른 十星작용을 중심으로'
AUTHOR = '음종희'
YEAR = 2019
INSTITUTION = '경기대학교 예술대학원'
DBPIA_NODE = 'T15047469'
KKNOWLEDGE_ID = '281111307'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/16.0; public-resource-verification)'
MAX_BODY = 20 * 1024 * 1024
ATTEMPTS = 3
TIMEOUT = 30

RISS_SEARCH = 'https://www.riss.kr/search/Search.do?isDetailSearch=N&searchGubun=true&viewYn=OP&query=' + quote(TITLE)
KKNOWLEDGE = f'https://k-knowledge.kr/srch/read.jsp?id={KKNOWLEDGE_ID}'
NANET_SEARCH = 'https://dl.nanet.go.kr/search/searchInnerList.do?queryText=' + quote(TITLE + ':ALL_NI_TOC:AND') + '&searchType=INNER_SEARCH&resultType=INNER_SEARCH_LIST&pageNum=1&pageSize=10'

ALLOWED_HOST_SUFFIXES = (
    'riss.kr',
    'data.riss.kr',
    'dcollection.net',
    'kyonggi.ac.kr',
    'nanet.go.kr',
    'k-knowledge.kr',
)

DISCOVERY_TERMS = re.compile(r'orgView|dcollection|fulltext|fullText|original|download|viewer|handler|pdf|원문|T\d{7,}', re.I)
SEMANTIC_TERMS = [
    '夫妻', '夫', '妻', '배우자', '부부', '아내', '남편',
    '財星', '재성', '正財', '정재', '偏財', '편재',
    '官星', '관성', '正官', '정관', '偏官', '편관',
    '宮', '궁', '十星', '십성', '六親', '六親', '육친',
    '男命', '남명', '女命', '여명', '남자', '여자', '성별', '현대',
]


class TrackingRedirect(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[str] = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return any(host == s or host.endswith('.' + s) for s in ALLOWED_HOST_SUFFIXES)


def fetch(url: str, referer: str | None = None) -> tuple[dict, bytes, str]:
    assert allowed(url), f'host outside bounded public acquisition allowlist: {url}'
    tracker = TrackingRedirect()
    opener = build_opener(HTTPCookieProcessor(CookieJar()), tracker)
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/json,application/xml,application/pdf,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
    }
    if referer:
        headers['Referer'] = referer
    attempts = []
    last = None
    for attempt in range(1, ATTEMPTS + 1):
        meta = {
            'requestedUrl': url,
            'status': None,
            'finalUrl': None,
            'redirectChain': [],
            'contentType': None,
            'bytes': 0,
            'sha256': None,
            'startsPdf': False,
            'error': None,
            'attempt': attempt,
        }
        try:
            with opener.open(Request(url, headers=headers), timeout=TIMEOUT) as resp:
                body = resp.read(MAX_BODY + 1)
                if len(body) > MAX_BODY:
                    body = body[:MAX_BODY]
                    meta['truncated'] = True
                final_url = resp.geturl()
                meta.update({
                    'status': getattr(resp, 'status', None),
                    'finalUrl': final_url,
                    'redirectChain': list(tracker.chain),
                    'contentType': resp.headers.get('Content-Type'),
                    'bytes': len(body),
                    'sha256': hashlib.sha256(body).hexdigest(),
                    'startsPdf': body.startswith(b'%PDF-'),
                })
                attempts.append({'attempt': attempt, 'status': meta['status'], 'finalUrl': final_url, 'bytes': len(body), 'error': None})
                meta['attempts'] = attempts
                text = '' if body.startswith(b'%PDF-') else decode(body)
                return meta, body, text
        except Exception as exc:
            meta['error'] = f'{type(exc).__name__}: {exc}'
            last = meta
            attempts.append({'attempt': attempt, 'status': None, 'finalUrl': None, 'bytes': 0, 'error': meta['error']})
            if attempt < ATTEMPTS:
                time.sleep(attempt)
    assert last is not None
    last['attempts'] = attempts
    return last, b'', ''


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 5000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def identity_score(text: str) -> int:
    t = re.sub(r'\s+', '', html.unescape(text))
    score = 0
    for needle in ('四柱命理宮星에관한硏究', '宮에따른十星작용을중심으로', AUTHOR, '경기대학교'):
        if re.sub(r'\s+', '', needle) in t:
            score += 1
    return score


def public_urls(text: str, base: str) -> list[str]:
    vals = set()
    for raw in re.findall(r'https?://[^\s\"\'<>]+', html.unescape(text)):
        vals.add(raw)
    for raw in re.findall(r'(?:href|src|action)=[\"\']([^\"\']+)[\"\']', text, re.I):
        vals.add(urljoin(base, html.unescape(raw)))
    # Site-authored JavaScript often embeds public routes in quoted literals.
    for raw in re.findall(r'''["']([^"'\r\n]{1,800})["']''', html.unescape(text)):
        if raw.startswith('/') and DISCOVERY_TERMS.search(raw):
            vals.add(urljoin(base, raw))
        elif raw.startswith(('http://', 'https://')) and DISCOVERY_TERMS.search(raw):
            vals.add(raw)
    out = []
    for url in vals:
        url = url.replace('&amp;', '&').rstrip(').,;')
        if allowed(url) and url not in out:
            out.append(url)
    return sorted(out)


def interesting_lines(text: str) -> list[dict]:
    rows = []
    for n, line in enumerate(text.splitlines(), start=1):
        if DISCOVERY_TERMS.search(line) or AUTHOR in line or '四柱命理 宮星' in line:
            rows.append({'line': n, 'text': compact(line, 2500)})
    return rows[:800]


def extract_target_ids(text: str) -> dict:
    cleaned = html.unescape(text)
    thesis_ids = sorted(set(re.findall(r'\bT\d{7,9}\b', cleaned)))
    item_ids = sorted(set(re.findall(r'(?<!\d)(?:000000\d{5,9}|200000\d{6,12})(?!\d)', cleaned)))
    control_nos = sorted(set(re.findall(r'(?i)(?:control[_-]?no|controlNo)[^A-Za-z0-9]{0,20}([A-Za-z0-9]{12,64})', cleaned)))
    uci = sorted(set(re.findall(r'I804:[0-9-]+', cleaned)))
    return {'thesisIds': thesis_ids, 'dcollectionItemIds': item_ids, 'controlNos': control_nos, 'uci': uci}


def candidate_relation_urls(text: str, base: str, require_identity: bool) -> list[str]:
    if require_identity and identity_score(text) < 2:
        return []
    out = []
    for url in public_urls(text, base):
        low = url.lower()
        if any(k in low for k in ('dcollection', 'orgview', '/handler/', '/link?id=t', 'fulltext', 'original', 'download', 'viewer', '.pdf')):
            if url not in out:
                out.append(url)
    return out[:100]


def save_text(label: str, text: str) -> None:
    if text:
        (OUT / f'{label}.txt').write_text(text[:2_000_000], encoding='utf-8')


def render_semantic_pages(pdf: bytes, source_url: str, report: dict) -> None:
    pdf_path = PRIVATE / 'eum-jonghee-2019.pdf'
    pdf_path.write_bytes(pdf)
    report['fullLengthPdfAcquired'] = True
    report['pdf'] = {
        'sourceUrl': source_url,
        'sha256': hashlib.sha256(pdf).hexdigest(),
        'bytes': len(pdf),
        'pages': None,
        'encrypted': None,
    }
    info = subprocess.run(['pdfinfo', str(pdf_path)], capture_output=True, text=True)
    report['pdf']['pdfinfoExit'] = info.returncode
    if info.returncode == 0:
        m = re.search(r'^Pages:\s+(\d+)', info.stdout, re.M)
        if m:
            report['pdf']['pages'] = int(m.group(1))
        enc = re.search(r'^Encrypted:\s+([^\r\n]+)', info.stdout, re.M)
        if enc:
            report['pdf']['encrypted'] = enc.group(1).strip()
    txt_path = PRIVATE / 'eum-jonghee-2019.txt'
    text_run = subprocess.run(['pdftotext', '-layout', str(pdf_path), str(txt_path)], capture_output=True, text=True)
    report['pdf']['pdftotextExit'] = text_run.returncode
    if text_run.returncode != 0 or not txt_path.exists():
        return
    full_text = txt_path.read_text(encoding='utf-8', errors='replace')
    report['pdf']['textChars'] = len(full_text)
    pages = full_text.split('\f')
    matches = []
    render_dir = OUT / 'semantic-pages'
    render_dir.mkdir(exist_ok=True)
    # Preserve only bounded pages with spouse/gender terms, plus likely thesis body pp.30-51 by printed-number signals.
    for physical, page in enumerate(pages, start=1):
        normalized = re.sub(r'\s+', '', page)
        terms = [term for term in SEMANTIC_TERMS if re.sub(r'\s+', '', term) in normalized]
        printed = None
        for pat in (r'(?m)^\s*[-–—]?\s*(\d{1,3})\s*[-–—]?\s*$', r'(?m)^\s*(\d{1,3})\s*$'):
            nums = re.findall(pat, page[:2500])
            if nums:
                printed = int(nums[-1])
                break
        target_range = printed is not None and 30 <= printed <= 52
        spouse_signal = any(x in terms for x in ('夫妻','妻','배우자','부부','아내','남편','財星','재성','正財','정재','官星','관성','正官','정관','男命','남명','女命','여명','남자','여자','성별'))
        if not (target_range or spouse_signal):
            continue
        excerpt = page[:9000]
        txt_name = f'physical-{physical:03d}-printed-{printed if printed is not None else "unknown"}.txt'
        (render_dir / txt_name).write_text(excerpt, encoding='utf-8')
        prefix = render_dir / f'physical-{physical:03d}'
        render = subprocess.run(['pdftoppm','-f',str(physical),'-l',str(physical),'-png','-r','140',str(pdf_path),str(prefix)], capture_output=True, text=True)
        pngs = [p.name for p in sorted(render_dir.glob(f'{prefix.name}-*.png'))]
        matches.append({'physicalPage': physical, 'printedPageGuess': printed, 'terms': terms, 'textFile': txt_name, 'renderedFiles': pngs, 'renderExit': render.returncode})
        if len(matches) >= 30:
            break
    report['semanticPages'] = matches


def main() -> int:
    report = {
        'purpose': 'bounded public fulltext acquisition for Eum Jonghee 2019; no login, paywall, institutional auth, DRM, or guessed identifier bypass',
        'candidate': {
            'author': AUTHOR,
            'year': YEAR,
            'title': TITLE,
            'institution': INSTITUTION,
            'dbpiaNode': DBPIA_NODE,
            'kKnowledgeId': KKNOWLEDGE_ID,
        },
        'probes': [],
        'observedIds': {'thesisIds': [], 'dcollectionItemIds': [], 'controlNos': [], 'uci': []},
        'siteAuthoredCandidateUrls': [],
        'fullLengthPdfAcquired': False,
        'pdf': None,
        'semanticPages': [],
        'accessBoundary': None,
    }
    seeds = [
        ('riss-search', RISS_SEARCH),
        ('k-knowledge', KKNOWLEDGE),
        ('nanet-search', NANET_SEARCH),
    ]
    queue = [(label, url, None, True) for label, url in seeds]
    seen: set[str] = set()
    discovered: list[str] = []
    pdf_done = False

    while queue and len(seen) < 80:
        label, url, referer, require_identity = queue.pop(0)
        if url in seen or not allowed(url):
            continue
        seen.add(url)
        meta, body, text = fetch(url, referer)
        rec = dict(meta)
        rec['label'] = label
        rec['identityScore'] = identity_score(text) if text else 0
        rec['interestingLines'] = interesting_lines(text) if text else []
        rec['observedIds'] = extract_target_ids(text) if text and rec['identityScore'] >= 2 else {'thesisIds': [], 'dcollectionItemIds': [], 'controlNos': [], 'uci': []}
        report['probes'].append(rec)
        if text:
            save_text(re.sub(r'[^A-Za-z0-9._-]+','-',label), text)
            if rec['identityScore'] >= 2:
                for key, vals in rec['observedIds'].items():
                    for value in vals:
                        if value not in report['observedIds'][key]:
                            report['observedIds'][key].append(value)
                for candidate in candidate_relation_urls(text, meta.get('finalUrl') or url, True):
                    if candidate not in discovered:
                        discovered.append(candidate)
                        queue.append((f'discovered-{len(discovered):03d}', candidate, meta.get('finalUrl') or url, False))
        if body and (body.startswith(b'%PDF-') or 'application/pdf' in (meta.get('contentType') or '').lower()):
            # A PDF is admitted only when reached from a target-identity page/relation chain.
            if not pdf_done and (referer is not None or rec['identityScore'] >= 2):
                render_semantic_pages(body, meta.get('finalUrl') or url, report)
                pdf_done = True

        # If an exact RISS T-id was observed on an identity-matching surface, follow only standard public identity URLs derived from that exposed id.
        if rec['identityScore'] >= 2:
            for tid in rec['observedIds']['thesisIds']:
                for candidate in (
                    f'https://www.riss.kr/link?id={tid}',
                    f'https://data.riss.kr/resource/Thesis/{tid[1:]}',
                ):
                    if candidate not in seen and candidate not in discovered:
                        discovered.append(candidate)
                        queue.append((f'riss-id-{tid}', candidate, meta.get('finalUrl') or url, False))

    report['siteAuthoredCandidateUrls'] = discovered
    report['observedIds'] = {k: sorted(set(v)) for k, v in report['observedIds'].items()}

    # Explicit access-boundary signals from target-matching non-PDF surfaces.
    boundary_text = ' '.join(
        line['text']
        for p in report['probes'] if p.get('identityScore', 0) >= 2
        for line in p.get('interestingLines', [])
    )
    report['accessBoundary'] = {
        'login': bool(re.search(r'로그인|login|sign.?in', boundary_text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|소속기관|institution', boundary_text, re.I)),
        'purchase': bool(re.search(r'구매|결제|유료|purchase|payment|paywall', boundary_text, re.I)),
        'drm': bool(re.search(r'\bDRM\b|복호화|암호화|전용.?뷰어', boundary_text, re.I)),
    }

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    summary = [
        f'candidate={AUTHOR} {YEAR} {TITLE}',
        f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}',
        f'observedIds={json.dumps(report["observedIds"], ensure_ascii=False)}',
        f'siteAuthoredCandidateUrls={len(discovered)}',
        f'probes={len(report["probes"])}',
        f'accessBoundary={json.dumps(report["accessBoundary"], ensure_ascii=False)}',
    ]
    if report['pdf']:
        summary.append('pdf=' + json.dumps(report['pdf'], ensure_ascii=False))
        summary.append(f'semanticPages={len(report["semanticPages"])}')
    (OUT / 'summary.txt').write_text('\n'.join(summary) + '\n', encoding='utf-8')
    print('\n'.join(summary))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
