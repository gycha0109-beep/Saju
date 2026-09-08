#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import io
import json
import re
from collections import deque
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, Request, build_opener

import pymupdf
from pypdf import PdfReader

OUT = Path('acquisition-hong-yooseon-2022')
PRIVATE = Path('acquisition-hong-yooseon-2022-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)

AUTHOR = '홍유선'
TITLE = '이데올로기적 접근을 통한 육친 간 상극관계 해석: 부부, 부자, 고부를 중심으로'
TITLE_SHORT = '이데올로기적 접근을 통한 육친 간 상극관계 해석'
ARTI = 'ART003089059'
RISS_ID = 'A108419413'
DOI = '10.54385/cbt.2022.2.2.75'
KCI_DETAIL = f'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'
KCI_ORIGINAL = f'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}'
RISS_LINK = f'https://www.riss.kr/link?id={RISS_ID}'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/17.0; public-resource-verification)'
MAX_TEXT = 5 * 1024 * 1024
MAX_PDF = 45 * 1024 * 1024
MAX_PROBES = 70

ALLOWED_HOST_SUFFIXES = (
    'kci.go.kr',
    'riss.kr',
    'acci.asia',
    'kyobobook.co.kr',
    'dbpia.co.kr',
    'nanet.go.kr',
    'k-knowledge.kr',
)

DISCOVERY_RE = re.compile(
    r'원문|미리보기|preview|orte|original|full.?text|download|pdf|file|viewer|article|학술|journal|publisher|doi|riss|kyobo|dbpia',
    re.I,
)
SEMANTIC_TERMS = (
    '부부', '배우자', '아내', '남편', '妻', '夫', '재성', '財星', '관성', '官星',
    '정재', '正財', '편재', '偏財', '정관', '正官', '편관', '偏官',
    '육친', '六親', '십성', '十星', '의무', '역할', '이데올로기', '가부장', '사회', '현대', '성별',
)


class RedirectRecorder(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[dict] = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append({'status': code, 'url': newurl})
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return any(host == suffix or host.endswith('.' + suffix) for suffix in ALLOWED_HOST_SUFFIXES)


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 6000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def access_boundary(text: str) -> dict[str, bool]:
    return {
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'purchase': bool(re.search(r'유료.?원문|구매|결제|이용권|purchase|payment|paywall', text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|소속기관|institution.?auth', text, re.I)),
        'drm': bool(re.search(r'\bDRM\b|전용.?뷰어|Fasoo|ezPDF', text, re.I)),
    }


def identity_score(text: str) -> int:
    normalized = re.sub(r'\s+', '', html.unescape(text))
    score = 0
    for needle in (AUTHOR, TITLE_SHORT, ARTI, RISS_ID, DOI):
        if re.sub(r'\s+', '', needle) in normalized:
            score += 1
    return score


def fetch(opener, tracker: RedirectRecorder, url: str, referer: str | None = None) -> tuple[dict, bytes, str]:
    assert allowed(url), f'outside bounded public acquisition allowlist: {url}'
    tracker.chain.clear()
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/json,application/pdf,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
    }
    if referer:
        headers['Referer'] = referer
    meta = {
        'requestedUrl': url,
        'status': None,
        'finalUrl': None,
        'redirectChain': [],
        'contentType': None,
        'contentDisposition': None,
        'bytes': 0,
        'sha256': None,
        'startsPdf': False,
        'error': None,
    }
    try:
        with opener.open(Request(url, headers=headers), timeout=35) as resp:
            ctype = resp.headers.get('Content-Type') or ''
            limit = MAX_PDF if 'pdf' in ctype.lower() else MAX_TEXT
            body = resp.read(limit)
            meta.update({
                'status': getattr(resp, 'status', None),
                'finalUrl': resp.geturl(),
                'redirectChain': list(tracker.chain),
                'contentType': ctype,
                'contentDisposition': resp.headers.get('Content-Disposition'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'startsPdf': body.startswith(b'%PDF-'),
            })
            text = '' if body.startswith(b'%PDF-') else decode(body)
            if text:
                meta['identityScore'] = identity_score(text)
                meta['accessBoundary'] = access_boundary(text)
            else:
                meta['identityScore'] = None
                meta['accessBoundary'] = None
            return meta, body, text
    except Exception as exc:
        meta['redirectChain'] = list(tracker.chain)
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b'', ''


def extract_observed_urls(text: str, base: str) -> list[dict]:
    decoded = html.unescape(text)
    found: dict[str, set[str]] = {}

    def add(raw: str, basis: str) -> None:
        raw = raw.strip().replace('&amp;', '&').rstrip(').,;')
        if not raw:
            return
        url = urljoin(base, raw)
        if not allowed(url):
            return
        found.setdefault(url, set()).add(basis)

    for raw in re.findall(r'https?://[^\s"\'<>]+', decoded):
        add(raw, 'literal-url')
    for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', decoded, re.I):
        add(raw, 'html-attribute')
    for raw in re.findall(r'''["']([^"'\r\n]{1,1600})["']''', decoded):
        if (raw.startswith('/') or raw.startswith('http')) and DISCOVERY_RE.search(raw):
            add(raw, 'script-literal')

    # Some KCI/RISS controls author a relative route plus the target article id
    # in the same onclick/form expression. Preserve that exact combination only.
    for m in re.finditer(r'(?is)(.{0,500}(?:ART003089059|A108419413).{0,900})', decoded):
        window = m.group(1)
        for raw in re.findall(r'''["']([^"'\r\n]{1,1000})["']''', window):
            if (raw.startswith('/') or raw.startswith('http')) and DISCOVERY_RE.search(raw):
                add(raw, 'target-window-script-literal')

    return [
        {'url': url, 'basis': sorted(bases)}
        for url, bases in sorted(found.items())
    ]


def should_follow(url: str, source_identity_score: int, basis: list[str]) -> bool:
    low = url.lower()
    if any(token.lower() in low for token in (ARTI, RISS_ID, '003089059', 'a108419413')):
        return True
    if source_identity_score >= 2 and DISCOVERY_RE.search(url):
        # Only GET public navigation/file routes actually authored on a target-identity page.
        return True
    if 'target-window-script-literal' in basis:
        return True
    return False


def inspect_pdf(body: bytes, source_url: str, label: str) -> dict:
    rec = {
        'sourceUrl': source_url,
        'label': label,
        'sha256': hashlib.sha256(body).hexdigest(),
        'bytes': len(body),
        'pages': None,
        'encrypted': None,
        'textChars': 0,
        'koreanChars': 0,
        'semanticHits': [],
        'renderedPages': [],
        'error': None,
    }
    try:
        reader = PdfReader(io.BytesIO(body))
        rec['pages'] = len(reader.pages)
        rec['encrypted'] = bool(reader.is_encrypted)
        hit_pages: list[int] = []
        for i, page in enumerate(reader.pages, start=1):
            try:
                text = (page.extract_text() or '').replace('\x00', ' ')
            except Exception:
                text = ''
            rec['textChars'] += len(text)
            rec['koreanChars'] += len(re.findall(r'[가-힣]', text))
            terms = [term for term in SEMANTIC_TERMS if term in text]
            if terms:
                hit_pages.append(i)
                rec['semanticHits'].append({
                    'physicalPdfPage': i,
                    'terms': terms,
                    'excerpt': compact(text, 5000),
                })
        # Bounded rendering only. Full PDF remains runner-private.
        targets: list[int] = []
        if rec['pages'] and rec['pages'] <= 3:
            targets = list(range(1, rec['pages'] + 1))
        elif hit_pages:
            for p in hit_pages:
                for q in (p - 1, p, p + 1):
                    if rec['pages'] and 1 <= q <= rec['pages'] and q not in targets:
                        targets.append(q)
            targets = targets[:20]
        elif rec['pages']:
            targets = [p for p in (1, 2, 3, rec['pages']) if 1 <= p <= rec['pages']]

        doc = pymupdf.open(stream=body, filetype='pdf')
        try:
            for p in targets:
                pix = doc.load_page(p - 1).get_pixmap(matrix=pymupdf.Matrix(1.25, 1.25), alpha=False)
                path = OUT / f'{label}-p{p:03d}.png'
                pix.save(path)
                rec['renderedPages'].append({
                    'physicalPdfPage': p,
                    'file': path.name,
                    'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                })
        finally:
            doc.close()
    except Exception as exc:
        rec['error'] = f'{type(exc).__name__}: {exc}'
    return rec


def main() -> int:
    tracker = RedirectRecorder()
    opener = build_opener(HTTPCookieProcessor(CookieJar()), tracker)
    report = {
        'purpose': 'Hong Yooseon 2022 bounded public-route fulltext acquisition; no opaque-id guessing and no authentication/paywall/DRM bypass',
        'candidate': {
            'author': AUTHOR,
            'year': 2022,
            'title': TITLE,
            'kciArticleId': ARTI,
            'rissId': RISS_ID,
            'doi': DOI,
            'publication': '문화·경영·기술 2(2)',
            'printedPages': '75-89',
            'expectedArticlePages': 15,
        },
        'seedUrls': [KCI_DETAIL, KCI_ORIGINAL, RISS_LINK],
        'guessedOpaqueIdentifierCount': 0,
        'probes': [],
        'siteAuthoredCandidateUrls': [],
        'pdfs': [],
        'fullLengthPdfAcquired': False,
        'semanticDisposition': 'UNDECIDED_PENDING_DIRECT_BODY',
    }

    queue = deque([
        ('kci-detail', KCI_DETAIL, None, 'explicit-target-seed'),
        ('kci-original-view', KCI_ORIGINAL, KCI_DETAIL, 'explicit-target-seed'),
        ('riss-link', RISS_LINK, KCI_DETAIL, 'explicit-target-seed'),
    ])
    seen: set[str] = set()
    observed_urls: dict[str, dict] = {}

    while queue and len(seen) < MAX_PROBES:
        label, url, referer, origin = queue.popleft()
        if url in seen or not allowed(url):
            continue
        seen.add(url)
        meta, body, text = fetch(opener, tracker, url, referer)
        rec = dict(meta)
        rec.update({'label': label, 'origin': origin})
        rec['observedUrls'] = []

        if body and (body.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower()):
            pdf_label = f'pdf-{len(report["pdfs"])+1:02d}'
            (PRIVATE / f'{pdf_label}.pdf').write_bytes(body)
            pdf_rec = inspect_pdf(body, meta.get('finalUrl') or url, pdf_label)
            report['pdfs'].append(pdf_rec)
            rec['directPdf'] = True
        else:
            rec['directPdf'] = False
            if text:
                source_base = meta.get('finalUrl') or url
                observed = extract_observed_urls(text, source_base)
                rec['observedUrls'] = observed[:250]
                if (meta.get('identityScore') or 0) >= 2 or any(token in text for token in (ARTI, RISS_ID, TITLE_SHORT)):
                    safe = re.sub(r'[^A-Za-z0-9._-]+', '-', label)[:80]
                    (OUT / f'{safe}.txt').write_text(text[:2_000_000], encoding='utf-8')
                for item in observed:
                    u = item['url']
                    basis = item['basis']
                    if u not in observed_urls:
                        observed_urls[u] = {
                            'url': u,
                            'basis': basis,
                            'firstObservedOn': source_base,
                            'sourceIdentityScore': meta.get('identityScore'),
                        }
                    if u not in seen and should_follow(u, int(meta.get('identityScore') or 0), basis):
                        queue.append((f'discovered-{len(observed_urls):03d}', u, source_base, 'site-authored-target-route'))

        report['probes'].append(rec)

    report['siteAuthoredCandidateUrls'] = list(observed_urls.values())[:500]
    report['fullLengthPdfAcquired'] = any(
        isinstance(p.get('pages'), int) and p['pages'] >= 12 and p.get('bytes', 0) > 100_000
        for p in report['pdfs']
    )
    if report['fullLengthPdfAcquired']:
        report['semanticDisposition'] = 'DIRECT_BODY_ACQUIRED_REQUIRES_BOUNDED_REVIEW'
    else:
        report['semanticDisposition'] = 'ACCESS_OR_DISCOVERY_BOUNDARY_ONLY_NO_BODY_VERDICT'

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    lines = [
        f'candidate={report["candidate"]}',
        f'guessedOpaqueIdentifierCount={report["guessedOpaqueIdentifierCount"]}',
        f'probeCount={len(report["probes"])}',
        f'siteAuthoredCandidateUrlCount={len(report["siteAuthoredCandidateUrls"])}',
        f'pdfCount={len(report["pdfs"])}',
        f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}',
        f'semanticDisposition={report["semanticDisposition"]}',
    ]
    for p in report['pdfs']:
        lines.append(f'PDF pages={p.get("pages")} bytes={p.get("bytes")} sha={p.get("sha256")} source={p.get("sourceUrl")}')
    for p in report['probes']:
        if p.get('error') or p.get('directPdf') or (p.get('identityScore') or 0) >= 2:
            lines.append(
                f'PROBE {p.get("label")} status={p.get("status")} score={p.get("identityScore")} '
                f'type={p.get("contentType")} bytes={p.get("bytes")} boundary={p.get("accessBoundary")} '
                f'final={p.get("finalUrl")} err={p.get("error")}'
            )
    (OUT / 'summary.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print('\n'.join(lines))

    assert report['candidate']['kciArticleId'] == ARTI
    assert report['candidate']['rissId'] == RISS_ID
    assert report['guessedOpaqueIdentifierCount'] == 0
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
