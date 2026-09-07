#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import io
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

import pymupdf
from pypdf import PdfReader

ARTI = 'ART002782388'
DOI = '10.38113/jstc.2021.11.55.255'
TITLE = '명리학 육친론의 근원적 고찰'
BASE = 'https://www.kci.go.kr/kciportal/'
DETAIL = f'{BASE}ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'
ORIGINAL_VIEW = f'{BASE}ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}'
PREVIEW = f'{BASE}ci/sereArticleSearch/artiPreView.kci?sereArticleSearchBean.artiId={ARTI}&v=2019'
OUT = Path('acquisition-lee-sudong-2021')
PRIVATE = Path('acquisition-lee-sudong-2021-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/8.0; public-resource-verification)'
MAX_BYTES = 45 * 1024 * 1024
KEYWORDS = (
    '배우자', '배우자궁', '부부', '남편', '아내', '처', '妻', '夫', '혼인', '결혼',
    '남명', '여명', '건명', '곤명', '재성', '관성', '정재', '편재', '정관', '편관',
    '육친', '십신', '천간통변도', '음양', '남녀', '성별',
)
SIGNAL_RE = re.compile(r'원문|orte|file|download|preview|pdf|KCI_FI|ART002782388', re.I)


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
            pass
    return data.decode('utf-8', errors='replace')


def bounded_signals(text: str, limit: int = 40) -> list[str]:
    out: list[str] = []
    for line in text.splitlines():
        if SIGNAL_RE.search(line):
            compact = re.sub(r'\s+', ' ', line).strip()
            if compact and compact not in out:
                out.append(compact[:2200])
        if len(out) >= limit:
            break
    return out


def extract_file_ids(text: str) -> set[str]:
    ids = set(re.findall(r'(KCI_FI\d+)', text))
    ids.update(re.findall(r"orteFileId[=:\"'\s]+([A-Za-z0-9_\-]+)", text, flags=re.I))
    return {x for x in ids if x.startswith('KCI_FI')}


def render_pages(data: bytes, label: str, pages: list[int], scale: float = 1.35) -> list[dict]:
    rendered: list[dict] = []
    doc = pymupdf.open(stream=data, filetype='pdf')
    try:
        for p in pages:
            if not (1 <= p <= doc.page_count):
                continue
            pix = doc.load_page(p - 1).get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
            f = OUT / f'rendered-{label}-p{p:03d}.png'
            pix.save(f)
            rendered.append({
                'physicalPdfPage': p,
                'file': f.name,
                'sha256': hashlib.sha256(f.read_bytes()).hexdigest(),
                'bytes': f.stat().st_size,
            })
    finally:
        doc.close()
    return rendered


def inspect_pdf(data: bytes, label: str, source_url: str, file_id: str | None) -> dict:
    result: dict = {
        'label': label,
        'orteFileId': file_id,
        'sourceUrl': source_url,
        'sha256': hashlib.sha256(data).hexdigest(),
        'bytes': len(data),
        'pageCount': 0,
        'encrypted': None,
        'textExtractionHealthy': False,
        'keywordHits': [],
        'renderedPages': [],
        'error': None,
    }
    try:
        reader = PdfReader(io.BytesIO(data))
        result['pageCount'] = len(reader.pages)
        result['encrypted'] = bool(reader.is_encrypted)
        korean_chars = 0
        hit_pages: set[int] = set()
        for i, page in enumerate(reader.pages, 1):
            text = (page.extract_text() or '').replace('\x00', ' ')
            korean_chars += len(re.findall(r'[가-힣]', text))
            lines = [x.strip() for x in text.splitlines() if x.strip()]
            snippets: list[str] = []
            for n, line in enumerate(lines):
                if any(k in line for k in KEYWORDS):
                    lo = max(0, n - 2)
                    hi = min(len(lines), n + 3)
                    snippets.append(' / '.join(lines[lo:hi])[:1800])
            if snippets:
                hit_pages.add(i)
                result['keywordHits'].append({'physicalPdfPage': i, 'snippets': snippets[:12]})
        result['textExtractionHealthy'] = korean_chars >= 150

        if result['pageCount'] <= 3:
            targets = list(range(1, result['pageCount'] + 1))
        elif result['textExtractionHealthy'] and hit_pages:
            targets: list[int] = []
            for p in sorted(hit_pages):
                for q in (p - 1, p, p + 1):
                    if 1 <= q <= result['pageCount'] and q not in targets:
                        targets.append(q)
            targets = targets[:20]
        else:
            n = result['pageCount']
            seeds = [1, 2, 3, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, n]
            targets = sorted({p for p in seeds if 1 <= p <= n})[:14]
        result['renderedPages'] = render_pages(data, label, targets)
    except Exception as e:
        result['error'] = f'{type(e).__name__}: {e}'
    return result


def fetch_surface(opener, rd, url: str, referer: str | None = None) -> tuple[dict, bytes, str]:
    rd.chain.clear()
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/pdf,*/*;q=0.7'}
    if referer:
        headers['Referer'] = referer
    with opener.open(Request(url, headers=headers), timeout=35) as r:
        data = r.read(2_000_000)
        meta = {
            'status': getattr(r, 'status', None),
            'finalUrl': r.geturl(),
            'redirectChain': rd.chain.copy(),
            'contentType': r.headers.get('Content-Type'),
            'bytes': len(data),
            'sha256': hashlib.sha256(data).hexdigest(),
        }
    text = '' if data.startswith(b'%PDF-') else decode(data)
    meta['signals'] = bounded_signals(text)
    return meta, data, text


def main() -> int:
    jar = CookieJar()
    rd = RedirectRecorder()
    opener = build_opener(HTTPCookieProcessor(jar), rd)
    report: dict = {
        'purpose': 'public fulltext acquisition only; no login/paywall/auth bypass',
        'candidate': {
            'author': '이수동',
            'year': 2021,
            'title': TITLE,
            'journal': '도교문화연구 55집',
            'kciArticleId': ARTI,
            'doi': DOI,
            'printedPages': '255-288',
        },
        'detail': {},
        'originalView': {},
        'htmlDiscoveredOrteFileIds': [],
        'downloadAttempts': [],
        'pdfs': [],
        'fullLengthPdfAcquired': False,
    }

    detail_meta, _, detail_text = fetch_surface(opener, rd, DETAIL)
    detail_meta['cookies'] = [(c.name, c.domain) for c in jar]
    report['detail'] = detail_meta

    original_meta, original_bytes, original_text = fetch_surface(opener, rd, ORIGINAL_VIEW, DETAIL)
    report['originalView'] = original_meta

    html_ids = extract_file_ids(detail_text) | extract_file_ids(original_text)
    report['htmlDiscoveredOrteFileIds'] = sorted(html_ids)

    # If the original-view endpoint itself returns a PDF, inspect it directly.
    if original_bytes.startswith(b'%PDF-') or 'pdf' in (original_meta.get('contentType') or '').lower():
        (PRIVATE / 'original-view.pdf').write_bytes(original_bytes)
        report['pdfs'].append(inspect_pdf(original_bytes, 'original-view', original_meta['finalUrl'], None))

    for file_id in sorted(html_ids):
        rd.chain.clear()
        url = (
            f'{BASE}ci/sereArticleSearch/ciSereArtiOrteServHistIFrame.kci?'
            f'sereArticleSearchBean.artiId={ARTI}&sereArticleSearchBean.orteFileId={file_id}'
        )
        meta: dict = {'orteFileId': file_id, 'requestedUrl': url}
        try:
            with opener.open(Request(url, headers={
                'User-Agent': UA,
                'Referer': DETAIL,
                'Accept': 'application/pdf,text/html,*/*;q=0.7',
            }), timeout=40) as r:
                data = r.read(MAX_BYTES)
                meta.update({
                    'status': getattr(r, 'status', None),
                    'finalUrl': r.geturl(),
                    'redirectChain': rd.chain.copy(),
                    'contentType': r.headers.get('Content-Type'),
                    'contentDisposition': r.headers.get('Content-Disposition'),
                    'bytes': len(data),
                    'sha256': hashlib.sha256(data).hexdigest(),
                    'startsPdf': data.startswith(b'%PDF-'),
                })
            if data.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower():
                (PRIVATE / f'{file_id}.pdf').write_bytes(data)
                report['pdfs'].append(inspect_pdf(data, file_id.lower(), meta['finalUrl'], file_id))
            elif data:
                text = decode(data)
                meta['boundedBodySample'] = re.sub(r'\s+', ' ', text).strip()[:3500]
                meta['signals'] = bounded_signals(text)
        except Exception as e:
            meta['error'] = f'{type(e).__name__}: {e}'
        report['downloadAttempts'].append(meta)

    # Preview control is always inspected separately so a one-page preview cannot be mistaken for fulltext.
    try:
        rd.chain.clear()
        with opener.open(Request(PREVIEW, headers={'User-Agent': UA, 'Referer': DETAIL}), timeout=35) as r:
            data = r.read(MAX_BYTES)
            if data.startswith(b'%PDF-') or 'pdf' in (r.headers.get('Content-Type') or '').lower():
                report['pdfs'].append(inspect_pdf(data, 'preview-control', r.geturl(), None))
    except Exception as e:
        report['previewError'] = f'{type(e).__name__}: {e}'

    # Bibliographic length is 34 printed pages. >=20 physical PDF pages distinguishes plausible full body.
    report['fullLengthPdfAcquired'] = any(p.get('pageCount', 0) >= 20 for p in report['pdfs'])

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    lines = [
        f'candidate={report["candidate"]}',
        f'htmlDiscoveredOrteFileIds={report["htmlDiscoveredOrteFileIds"]}',
        f'detailSignals={report["detail"].get("signals", [])}',
        f'originalViewSignals={report["originalView"].get("signals", [])}',
        f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}',
    ]
    for a in report['downloadAttempts']:
        lines.append('ATTEMPT ' + json.dumps(a, ensure_ascii=False, sort_keys=True))
    for p in report['pdfs']:
        lines.append(
            f'PDF fileId={p.get("orteFileId")} sha={p["sha256"]} bytes={p["bytes"]} '
            f'pages={p["pageCount"]} encrypted={p["encrypted"]} textHealthy={p["textExtractionHealthy"]} '
            f'url={p["sourceUrl"]}'
        )
        for hit in p.get('keywordHits', [])[:25]:
            lines.append(f'PAGE {hit["physicalPdfPage"]}: ' + ' || '.join(hit['snippets'][:8]))
        lines.append(f'RENDERED={p.get("renderedPages", [])}')
    (OUT / 'summary.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print('\n'.join(lines))

    assert report['candidate']['kciArticleId'] == ARTI
    assert report['candidate']['doi'] == DOI
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
