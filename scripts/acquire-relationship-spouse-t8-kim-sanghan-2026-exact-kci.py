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

ARTI = 'ART003370620'
DOI = '10.55793/jkhc.2026.33.631'
TITLE = '명리 고전 여명론(女命論)의 성별 비대칭과 역사적 맥락'
BASE = 'https://www.kci.go.kr/kciportal/'
DETAIL = f'{BASE}ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'
ORIGINAL_VIEW = f'{BASE}ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}'
PREVIEW = f'{BASE}ci/sereArticleSearch/artiPreView.kci?sereArticleSearchBean.artiId={ARTI}&v=2019'
OUT = Path('acquisition-kim-sanghan-2026')
PRIVATE = Path('acquisition-kim-sanghan-2026-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/7.2; public-resource-verification)'
MAX_BYTES = 45 * 1024 * 1024
KEYWORDS = (
    '배우자', '남편', '아내', '부부', '혼인', '결혼', '여명', '남명', '재성', '관성',
    '정재', '편재', '정관', '편관', '성별', '비대칭', '현대', '차별', '도덕', '정절',
)
SIGNAL_RE = re.compile(r'원문|orte|file|download|preview|pdf|KCI_FI|ART003370620', re.I)


class RedirectRecorder(HTTPRedirectHandler):
    def __init__(self):
        super().__init__()
        self.chain: list[tuple[int, str]] = []

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append((code, newurl))
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def decode_html(data: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            pass
    return data.decode('utf-8', errors='replace')


def bounded_signals(text: str, limit: int = 30) -> list[str]:
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


def render_pages(data: bytes, label: str, targets: list[int], scale: float) -> list[dict]:
    rendered: list[dict] = []
    doc = pymupdf.open(stream=data, filetype='pdf')
    try:
        for p in targets:
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
                result['keywordHits'].append({'physicalPdfPage': i, 'snippets': snippets[:10]})
        result['textExtractionHealthy'] = korean_chars >= 150

        if result['pageCount'] <= 3:
            targets = list(range(1, result['pageCount'] + 1))
            scale = 1.5
        elif result['textExtractionHealthy'] and hit_pages:
            targets: list[int] = []
            for p in sorted(hit_pages):
                for q in (p - 1, p, p + 1):
                    if 1 <= q <= result['pageCount'] and q not in targets:
                        targets.append(q)
            targets = targets[:18]
            scale = 1.45
        else:
            n = result['pageCount']
            seeds = [1, 2, 3, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, n]
            targets = sorted({p for p in seeds if 1 <= p <= n})[:14]
            scale = 1.05
        result['renderedPages'] = render_pages(data, label, targets, scale)
    except Exception as e:
        result['error'] = f'{type(e).__name__}: {e}'
    return result


def fetch_text_surface(opener, rd, url: str, referer: str | None = None) -> tuple[dict, bytes, str]:
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
    text = decode_html(data) if not data.startswith(b'%PDF-') else ''
    meta['signals'] = bounded_signals(text)
    return meta, data, text


def main() -> int:
    jar = CookieJar()
    rd = RedirectRecorder()
    opener = build_opener(HTTPCookieProcessor(jar), rd)
    report: dict = {
        'purpose': 'public KCI exact-backend reacquisition only; no login/paywall/auth bypass',
        'candidate': {
            'author': '김상한',
            'year': 2026,
            'title': TITLE,
            'kciArticleId': ARTI,
            'doi': DOI,
            'printedPages': '631-665',
        },
        'detail': {},
        'originalView': {},
        'htmlDiscoveredOrteFileIds': [],
        'fallbackOrteFileIdsTried': [],
        'downloadAttempts': [],
        'pdfs': [],
        'fullLengthPdfAcquired': False,
    }

    detail_meta, detail_bytes, detail_text = fetch_text_surface(opener, rd, DETAIL)
    detail_meta['cookies'] = [(c.name, c.domain) for c in jar]
    report['detail'] = detail_meta

    original_meta, original_bytes, original_text = fetch_text_surface(opener, rd, ORIGINAL_VIEW, DETAIL)
    report['originalView'] = original_meta

    html_ids = extract_file_ids(detail_text) | extract_file_ids(original_text)
    fallback_ids = {'KCI_FI003370620'} - html_ids
    report['htmlDiscoveredOrteFileIds'] = sorted(html_ids)
    report['fallbackOrteFileIdsTried'] = sorted(fallback_ids)
    ids = sorted(html_ids | fallback_ids)

    for file_id in ids:
        rd.chain.clear()
        url = (
            f'{BASE}ci/sereArticleSearch/ciSereArtiOrteServHistIFrame.kci?'
            f'sereArticleSearchBean.artiId={ARTI}&sereArticleSearchBean.orteFileId={file_id}'
        )
        meta: dict = {
            'orteFileId': file_id,
            'origin': 'html-discovered' if file_id in html_ids else 'deterministic-fallback',
            'requestedUrl': url,
        }
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
                text = decode_html(data)
                meta['boundedBodySample'] = re.sub(r'\s+', ' ', text).strip()[:3500]
                meta['signals'] = bounded_signals(text)
        except Exception as e:
            meta['error'] = f'{type(e).__name__}: {e}'
        report['downloadAttempts'].append(meta)

    try:
        rd.chain.clear()
        with opener.open(Request(PREVIEW, headers={'User-Agent': UA, 'Referer': DETAIL}), timeout=35) as r:
            data = r.read(MAX_BYTES)
            if data.startswith(b'%PDF-') or 'pdf' in (r.headers.get('Content-Type') or '').lower():
                report['pdfs'].append(inspect_pdf(data, 'preview-control', r.geturl(), None))
    except Exception as e:
        report['previewError'] = f'{type(e).__name__}: {e}'

    report['fullLengthPdfAcquired'] = any(p.get('pageCount', 0) >= 20 for p in report['pdfs'])

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    lines = [
        f'candidate={report["candidate"]}',
        f'htmlDiscoveredOrteFileIds={report["htmlDiscoveredOrteFileIds"]}',
        f'fallbackOrteFileIdsTried={report["fallbackOrteFileIdsTried"]}',
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
        for hit in p.get('keywordHits', [])[:20]:
            lines.append(f'PAGE {hit["physicalPdfPage"]}: ' + ' || '.join(hit['snippets'][:6]))
        lines.append(f'RENDERED={p.get("renderedPages", [])}')
    (OUT / 'summary.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print('\n'.join(lines))

    assert report['candidate']['kciArticleId'] == ARTI
    assert report['candidate']['doi'] == DOI
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
