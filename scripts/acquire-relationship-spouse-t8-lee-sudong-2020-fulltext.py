#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import io
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import unquote, urljoin
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

import pymupdf
from pypdf import PdfReader

ARTI = 'ART002630397'
DOI = '10.33645/cnc.2020.09.42.9.755'
TITLE = '명리학 육친론의 이론체계 고찰 - 궁위론과 십성론을 중심으로-'
KCI_BASE = 'https://www.kci.go.kr/kciportal/'
KCI_DETAIL = f'{KCI_BASE}ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'
KCI_ORIGINAL = f'{KCI_BASE}ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}'
KCI_PREVIEW = f'{KCI_BASE}ci/sereArticleSearch/artiPreView.kci?sereArticleSearchBean.artiId={ARTI}&v=2019'
KY_BARCODE = '4010027924050'
KY_DETAIL = f'https://scholar.kyobobook.co.kr/article/detail/{KY_BARCODE}'
RISS_ID = 'A107064519'
DBPIA_NODE = 'NODE11887585'
DBPIA_DETAIL = f'https://www.dbpia.co.kr/journal/articleDetail?nodeId={DBPIA_NODE}'
OUT = Path('acquisition-lee-sudong-2020')
PRIVATE = Path('acquisition-lee-sudong-2020-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/12.0; public-resource-verification)'
MAX_BYTES = 45 * 1024 * 1024
KEYWORDS = (
    '배우자','배우자궁','부부','남편','아내','妻','夫','처','남명','여명','남자','여자',
    '재성','관성','정재','편재','정관','편관','십성','육친','궁위','일지','일주','용신','희신','기신'
)
SIGNAL_RE = re.compile(
    r'원문|pdf|download|viewer|pdfView|pdfViewer|builderDownload|fnViewPdf|orteFileId|KCI_FI|'
    r'ART002630397|4010027924050|NODE11887585|artId|kyoboKey|구매|결제|로그인|기관인증|유료',
    re.I,
)


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


def bounded_signals(text: str, limit: int = 80) -> list[str]:
    out: list[str] = []
    for line in text.splitlines():
        if SIGNAL_RE.search(line):
            s = re.sub(r'\s+', ' ', line).strip()
            if s and s not in out:
                out.append(s[:2600])
            if len(out) >= limit:
                break
    return out


def access_boundary(text: str) -> dict:
    return {
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'purchase': bool(re.search(r'구매|결제|이용권|유료|purchase|paywall|payment', text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|institution|소속기관|institutional', text, re.I)),
    }


def fetch(opener, rd, url: str, referer: str | None = None, limit: int = 3_000_000) -> tuple[dict, bytes, str]:
    rd.chain.clear()
    headers = {'User-Agent': UA, 'Accept': 'text/html,application/pdf,*/*;q=0.7'}
    if referer:
        headers['Referer'] = referer
    try:
        with opener.open(Request(url, headers=headers), timeout=40) as r:
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
    meta['signals'] = bounded_signals(text)
    if text:
        meta['accessBoundary'] = access_boundary(text)
    return meta, data, text


def extract_kci_ids(text: str) -> set[str]:
    ids = set(re.findall(r'(KCI_FI\d+)', text))
    ids.update(re.findall(r"orteFileId[=:\"'\s]+([A-Za-z0-9_-]+)", text, flags=re.I))
    return {x for x in ids if x.startswith('KCI_FI')}


def extract_kyobo_pdf_urls(text: str) -> list[dict]:
    out: list[dict] = []
    for m in re.finditer(r"fnViewPdf\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'", text):
        barcode, art_id, key, base = m.groups()
        if base.startswith('https://scholar.kyobobook.co.kr'):
            out.append({'source': 'fnViewPdf', 'url': f'{base}/builderDownload?artId={art_id}&barcode={barcode}&kyoboKey={key}&gb=view'})
            out.append({'source': 'fnViewPdf', 'url': f'{base}/builderDownload?artId={art_id}&barcode={barcode}&kyoboKey={key}&gb=down'})
    for raw in re.findall(r'''(?:href|src)=["']([^"']*builderDownload\?[^"']+)["']''', text, flags=re.I):
        url = unquote(html.unescape(raw))
        if url.startswith('/'):
            url = 'https://scholar.kyobobook.co.kr' + url
        if url.startswith('https://scholar.kyobobook.co.kr/'):
            out.append({'source': 'builderDownload-html', 'url': url})
    return dedupe_routes(out)


def extract_dbpia_public_routes(text: str) -> tuple[list[dict], list[str]]:
    """Follow only viewer/download routes signaled by this exact DBpia detail page."""
    out: list[dict] = []
    call_signals: list[str] = []
    decoded = html.unescape(text)

    for raw in re.findall(r'''(?:href|src|action|data-url|data-href)\s*=\s*["']([^"']+)["']''', decoded, re.I):
        low = raw.lower()
        if not re.search(r'pdf|viewer|download', low):
            continue
        url = urljoin('https://www.dbpia.co.kr/', raw)
        if url.startswith('https://www.dbpia.co.kr/') or url.startswith('https://dbpia.co.kr/'):
            out.append({'source': 'dbpia-detail-attribute', 'url': url})

    for raw in re.findall(r'''["']([^"']*(?:pdfView|pdfViewer|pdf/view|download)[^"']*)["']''', decoded, re.I):
        if raw.startswith('javascript:'):
            continue
        url = urljoin('https://www.dbpia.co.kr/', raw)
        if url.startswith('https://www.dbpia.co.kr/') or url.startswith('https://dbpia.co.kr/'):
            out.append({'source': 'dbpia-detail-script-string', 'url': url})

    for m in re.finditer(r'[^\n]{0,500}(?:pdfView|pdfViewer|download)[^\n]{0,900}', decoded, re.I):
        s = re.sub(r'\s+', ' ', m.group(0)).strip()
        if DBPIA_NODE in s or 'nodeId' in s:
            call_signals.append(s[:1800])
        if len(call_signals) >= 20:
            break

    # DBpia detail pages commonly expose viewer invocation by function name plus the exact node id,
    # without a literal href. Only when both are present in this article's own HTML do we probe the
    # standard public viewer route. This is a viewer request, not a download/authentication bypass.
    if DBPIA_NODE in decoded and re.search(r'pdfView|pdfViewer', decoded, re.I):
        out.append({
            'source': 'dbpia-detail-signaled-standard-viewer',
            'url': f'https://www.dbpia.co.kr/pdf/pdfView.do?nodeId={DBPIA_NODE}',
        })

    return dedupe_routes(out), call_signals


def dedupe_routes(routes: list[dict]) -> list[dict]:
    seen: set[str] = set()
    out: list[dict] = []
    for route in routes:
        url = route['url']
        if url not in seen:
            seen.add(url)
            out.append(route)
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
        for i, page in enumerate(reader.pages, 1):
            try:
                text = (page.extract_text() or '').replace('\x00', ' ')
            except Exception:
                text = ''
            korean += len(re.findall(r'[가-힣]', text))
            lines = [x.strip() for x in text.splitlines() if x.strip()]
            snippets: list[str] = []
            for n, line in enumerate(lines):
                if any(k in line for k in KEYWORDS):
                    snippets.append(' / '.join(lines[max(0, n - 2):min(len(lines), n + 3)])[:1900])
            if snippets:
                hit_pages.append(i)
                rec['keywordHits'].append({'physicalPdfPage': i, 'snippets': snippets[:12]})
        rec['textHealthy'] = korean >= 150
        n = rec['pageCount']
        if n <= 3:
            targets = list(range(1, n + 1))
        elif rec['textHealthy'] and hit_pages:
            targets = []
            for p in hit_pages:
                for q in (p - 1, p, p + 1):
                    if 1 <= q <= n and q not in targets:
                        targets.append(q)
            targets = targets[:22]
        else:
            targets = sorted({1, 2, 3, 5, 8, 11, 14, 17, 20, 23, 26, n})[:14]
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


def maybe_record_pdf(report: dict, data: bytes, label: str, url: str) -> bool:
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
        'purpose': 'public KCI/Kyobo/DBpia acquisition only; no login/paywall/auth bypass',
        'candidate': {
            'author': '이수동',
            'year': 2020,
            'title': TITLE,
            'kciArticleId': ARTI,
            'doi': DOI,
            'kyoboArticleBarcode': KY_BARCODE,
            'rissId': RISS_ID,
            'dbpiaNodeId': DBPIA_NODE,
            'printedPages': '755-780',
            'expectedPages': 26,
        },
        'surfaces': [],
        'htmlDiscoveredKciFileIds': [],
        'fallbackKciFileIdsTried': [],
        'kyoboSiteAuthoredPdfRoutes': [],
        'dbpiaSiteAuthoredViewerRoutes': [],
        'dbpiaViewerCallSignals': [],
        'downloadAttempts': [],
        'pdfs': [],
        'fullLengthPdfAcquired': False,
    }

    texts: dict[str, str] = {}
    for label, url, referer in [
        ('kci-detail', KCI_DETAIL, None),
        ('kci-original', KCI_ORIGINAL, KCI_DETAIL),
        ('kyobo-detail', KY_DETAIL, None),
        ('dbpia-detail', DBPIA_DETAIL, None),
    ]:
        meta, data, text = fetch(opener, rd, url, referer, 5_000_000)
        meta['label'] = label
        report['surfaces'].append(meta)
        texts[label] = text
        maybe_record_pdf(report, data, label, meta.get('finalUrl') or url)

    joined = '\n'.join(texts.values())
    html_ids = extract_kci_ids(joined)
    fallback = {'KCI_FI002630397'} - html_ids
    report['htmlDiscoveredKciFileIds'] = sorted(html_ids)
    report['fallbackKciFileIdsTried'] = sorted(fallback)
    for fid in sorted(html_ids | fallback):
        url = f'{KCI_BASE}ci/sereArticleSearch/ciSereArtiOrteServHistIFrame.kci?sereArticleSearchBean.artiId={ARTI}&sereArticleSearchBean.orteFileId={fid}'
        meta, data, text = fetch(opener, rd, url, KCI_DETAIL, MAX_BYTES)
        meta.update({'origin': 'html-discovered' if fid in html_ids else 'deterministic-fallback', 'orteFileId': fid, 'startsPdf': data.startswith(b'%PDF-')})
        if not maybe_record_pdf(report, data, fid.lower(), meta.get('finalUrl') or url) and text:
            meta['bodySample'] = re.sub(r'\s+', ' ', text).strip()[:4000]
        report['downloadAttempts'].append(meta)

    preview_meta, preview_data, _ = fetch(opener, rd, KCI_PREVIEW, KCI_DETAIL, MAX_BYTES)
    preview_meta['label'] = 'kci-preview'
    report['surfaces'].append(preview_meta)
    if preview_data.startswith(b'%PDF-'):
        report['pdfs'].append(inspect_pdf(preview_data, 'preview-control', preview_meta.get('finalUrl') or KCI_PREVIEW))

    kyobo_routes = extract_kyobo_pdf_urls(texts.get('kyobo-detail', ''))
    report['kyoboSiteAuthoredPdfRoutes'] = kyobo_routes
    for i, route in enumerate(kyobo_routes[:16], 1):
        meta, data, text = fetch(opener, rd, route['url'], KY_DETAIL, MAX_BYTES)
        meta.update({'origin': route['source'], 'startsPdf': data.startswith(b'%PDF-')})
        if not maybe_record_pdf(report, data, f'kyobo-{i:02d}', meta.get('finalUrl') or route['url']) and text:
            meta['bodySample'] = re.sub(r'\s+', ' ', text).strip()[:4000]
        report['downloadAttempts'].append(meta)

    dbpia_routes, call_signals = extract_dbpia_public_routes(texts.get('dbpia-detail', ''))
    report['dbpiaSiteAuthoredViewerRoutes'] = dbpia_routes
    report['dbpiaViewerCallSignals'] = call_signals
    for i, route in enumerate(dbpia_routes[:20], 1):
        meta, data, text = fetch(opener, rd, route['url'], DBPIA_DETAIL, MAX_BYTES)
        meta.update({'origin': route['source'], 'startsPdf': data.startswith(b'%PDF-')})
        if not maybe_record_pdf(report, data, f'dbpia-{i:02d}', meta.get('finalUrl') or route['url']) and text:
            meta['bodySample'] = re.sub(r'\s+', ' ', text).strip()[:4500]
        report['downloadAttempts'].append(meta)

    report['fullLengthPdfAcquired'] = any(p.get('pageCount', 0) >= 22 for p in report['pdfs'])
    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')

    lines = [
        f'candidate={report["candidate"]}',
        f'htmlDiscoveredKciFileIds={report["htmlDiscoveredKciFileIds"]}',
        f'fallbackKciFileIdsTried={report["fallbackKciFileIdsTried"]}',
        f'kyoboSiteAuthoredPdfRoutes={report["kyoboSiteAuthoredPdfRoutes"]}',
        f'dbpiaSiteAuthoredViewerRoutes={report["dbpiaSiteAuthoredViewerRoutes"]}',
        f'dbpiaViewerCallSignals={report["dbpiaViewerCallSignals"]}',
        f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}',
    ]
    for surface in report['surfaces']:
        lines.append('SURFACE ' + json.dumps(surface, ensure_ascii=False, sort_keys=True))
    for attempt in report['downloadAttempts']:
        lines.append('ATTEMPT ' + json.dumps(attempt, ensure_ascii=False, sort_keys=True))
    for pdf in report['pdfs']:
        lines.append(
            f'PDF sha={pdf["sha256"]} bytes={pdf["bytes"]} pages={pdf["pageCount"]} '
            f'encrypted={pdf["encrypted"]} textHealthy={pdf["textHealthy"]} url={pdf["sourceUrl"]}'
        )
        for hit in pdf.get('keywordHits', [])[:24]:
            lines.append(f'PAGE {hit["physicalPdfPage"]}: ' + ' || '.join(hit['snippets'][:8]))
        lines.append(f'RENDERED={pdf.get("renderedPages", [])}')
    (OUT / 'summary.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print('\n'.join(lines))

    candidate = report['candidate']
    assert candidate['kciArticleId'] == ARTI
    assert candidate['doi'] == DOI
    assert candidate['kyoboArticleBarcode'] == KY_BARCODE
    assert candidate['rissId'] == RISS_ID
    assert candidate['dbpiaNodeId'] == DBPIA_NODE
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
