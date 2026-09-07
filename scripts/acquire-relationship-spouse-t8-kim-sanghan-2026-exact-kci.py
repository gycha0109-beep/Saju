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
EXPECTED_PRINTED_PAGES = '631-665'
BASE = 'https://www.kci.go.kr/kciportal/'
DETAIL = f'{BASE}ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'
PREVIEW = f'{BASE}ci/sereArticleSearch/artiPreView.kci?sereArticleSearchBean.artiId={ARTI}&v=2019'
OUT = Path('acquisition-kim-sanghan-2026')
PRIVATE = Path('acquisition-kim-sanghan-2026-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/7.0; public-resource-verification)'
MAX_BYTES = 45 * 1024 * 1024
KEYWORDS = (
    '배우자', '남편', '아내', '부부', '혼인', '결혼', '여명', '남명', '재성', '관성',
    '정재', '편재', '정관', '편관', '성별', '비대칭', '현대', '차별', '도덕', '정절',
)


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


def pdf_record(data: bytes, label: str, source_url: str) -> dict:
    rec: dict = {
        'label': label,
        'sourceUrl': source_url,
        'bytes': len(data),
        'sha256': hashlib.sha256(data).hexdigest(),
        'pageCount': 0,
        'encrypted': None,
        'textExtractionHealthy': False,
        'keywordHits': [],
        'renderedPages': [],
        'error': None,
    }
    try:
        reader = PdfReader(io.BytesIO(data))
        rec['pageCount'] = len(reader.pages)
        rec['encrypted'] = bool(reader.is_encrypted)
        hit_pages: set[int] = set()
        healthy_chars = 0
        for i, page in enumerate(reader.pages, 1):
            text = (page.extract_text() or '').replace('\x00', ' ')
            healthy_chars += len(re.findall(r'[가-힣]', text))
            lines = [x.strip() for x in text.splitlines() if x.strip()]
            snippets = []
            for n, line in enumerate(lines):
                if any(k in line for k in KEYWORDS):
                    lo = max(0, n - 2)
                    hi = min(len(lines), n + 3)
                    snippets.append(' / '.join(lines[lo:hi])[:1800])
            if snippets:
                hit_pages.add(i)
                rec['keywordHits'].append({'physicalPdfPage': i, 'snippets': snippets[:10]})
        rec['textExtractionHealthy'] = healthy_chars >= 150

        doc = pymupdf.open(stream=data, filetype='pdf')
        try:
            targets: list[int] = []
            if rec['pageCount'] <= 3:
                targets = list(range(1, rec['pageCount'] + 1))
            elif rec['textExtractionHealthy'] and hit_pages:
                for p in sorted(hit_pages):
                    for q in (p - 1, p, p + 1):
                        if 1 <= q <= doc.page_count and q not in targets:
                            targets.append(q)
                targets = targets[:18]
            else:
                # Broken Korean text layer: retain only a low-resolution contact sheet for navigation
                # plus first/last full page. Full article bytes stay ephemeral and are never uploaded.
                targets = [1, doc.page_count]
                thumbs = []
                for p in range(doc.page_count):
                    pix = doc.load_page(p).get_pixmap(matrix=pymupdf.Matrix(0.28, 0.28), alpha=False)
                    thumbs.append(pix)
                if thumbs:
                    width = max(x.width for x in thumbs)
                    cols = 4
                    rows = (len(thumbs) + cols - 1) // cols
                    height = max(x.height for x in thumbs)
                    sheet = pymupdf.Pixmap(pymupdf.csRGB, pymupdf.IRect(0, 0, width * cols, height * rows), 0)
                    sheet.clear_with(255)
                    for idx, pix in enumerate(thumbs):
                        x = (idx % cols) * width
                        y = (idx // cols) * height
                        sheet.copy(pix, pymupdf.IRect(x, y, x + pix.width, y + pix.height))
                    f = OUT / f'contact-sheet-{label}.png'
                    sheet.save(f)
                    rec['contactSheet'] = {
                        'file': f.name,
                        'sha256': hashlib.sha256(f.read_bytes()).hexdigest(),
                        'bytes': f.stat().st_size,
                    }
            for p in targets:
                pix = doc.load_page(p - 1).get_pixmap(matrix=pymupdf.Matrix(1.55, 1.55), alpha=False)
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
            'printedPages': EXPECTED_PRINTED_PAGES,
        },
        'detail': {},
        'discoveredOrteFileIds': [],
        'downloadAttempts': [],
        'pdfs': [],
        'fullLengthPdfAcquired': False,
    }

    with opener.open(Request(DETAIL, headers={'User-Agent': UA}), timeout=35) as r:
        detail_bytes = r.read(2_000_000)
        detail_url = r.geturl()
        report['detail'] = {
            'status': getattr(r, 'status', None),
            'finalUrl': detail_url,
            'contentType': r.headers.get('Content-Type'),
            'bytes': len(detail_bytes),
            'sha256': hashlib.sha256(detail_bytes).hexdigest(),
            'cookies': [(c.name, c.domain) for c in jar],
        }

    html = decode_html(detail_bytes)
    ids = set(re.findall(r'(KCI_FI\d+)', html))
    ids.update(re.findall(r'orteFileId[=:\"\'\s]+([A-Za-z0-9_\-]+)', html, flags=re.I))
    # Deterministic fallback discovered from another KCI article's exact public backend pattern.
    ids.add('KCI_FI003370620')
    ids = {x for x in ids if x.startswith('KCI_FI')}
    report['discoveredOrteFileIds'] = sorted(ids)

    def attempt_download(file_id: str, origin: str) -> None:
        rd.chain.clear()
        url = (
            f'{BASE}ci/sereArticleSearch/ciSereArtiOrteServHistIFrame.kci?'
            f'sereArticleSearchBean.artiId={ARTI}&sereArticleSearchBean.orteFileId={file_id}'
        )
        meta = {'origin': origin, 'orteFileId': file_id, 'requestedUrl': url}
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
                private = PRIVATE / f'{file_id}.pdf'
                private.write_bytes(data)
                rec = pdf_record(data, file_id.lower(), meta['finalUrl'])
                rec['orteFileId'] = file_id
                report['pdfs'].append(rec)
        except Exception as e:
            meta['error'] = f'{type(e).__name__}: {e}'
        report['downloadAttempts'].append(meta)

    for file_id in sorted(ids):
        attempt_download(file_id, 'detail-html-or-deterministic-fallback')

    # Keep the known article-specific preview as a control, not as fulltext.
    try:
        rd.chain.clear()
        with opener.open(Request(PREVIEW, headers={'User-Agent': UA, 'Referer': DETAIL}), timeout=35) as r:
            data = r.read(MAX_BYTES)
            if data.startswith(b'%PDF-') or 'pdf' in (r.headers.get('Content-Type') or '').lower():
                rec = pdf_record(data, 'preview-control', r.geturl())
                rec['orteFileId'] = None
                report['pdfs'].append(rec)
    except Exception as e:
        report['previewError'] = f'{type(e).__name__}: {e}'

    # Published article is 35 printed pages. A >=20-page KCI PDF is treated as full-length candidate;
    # semantic authority still requires direct-body review and a separate permanent evidence PR.
    report['fullLengthPdfAcquired'] = any(p.get('pageCount', 0) >= 20 for p in report['pdfs'])

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    lines = [
        f'candidate={report["candidate"]}',
        f'discoveredOrteFileIds={report["discoveredOrteFileIds"]}',
        f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}',
    ]
    for a in report['downloadAttempts']:
        lines.append(
            'ATTEMPT ' + json.dumps(a, ensure_ascii=False, sort_keys=True)
        )
    for p in report['pdfs']:
        lines.append(
            f'PDF fileId={p.get("orteFileId")} sha={p["sha256"]} bytes={p["bytes"]} '
            f'pages={p["pageCount"]} encrypted={p["encrypted"]} textHealthy={p["textExtractionHealthy"]} '
            f'url={p["sourceUrl"]}'
        )
        for hit in p.get('keywordHits', [])[:20]:
            lines.append(f'PAGE {hit["physicalPdfPage"]}: ' + ' || '.join(hit['snippets'][:6]))
        lines.append(f'RENDERED={p.get("renderedPages", [])}')
        if p.get('contactSheet'):
            lines.append(f'CONTACT_SHEET={p["contactSheet"]}')
    (OUT / 'summary.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print('\n'.join(lines))

    assert report['candidate']['kciArticleId'] == ARTI
    assert report['candidate']['doi'] == DOI
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
