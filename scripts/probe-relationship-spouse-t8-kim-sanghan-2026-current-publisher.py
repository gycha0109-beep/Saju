#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener

OUT = Path('acquisition-kim-sanghan-2026-current')
OUT.mkdir(exist_ok=True)

AUTHOR = '김상한'
TITLE = '명리 고전 여명론(女命論)의 성별 비대칭과 역사적 맥락'
TITLE_SIGNAL = '명리 고전 여명론'
ARTI_ID = 'ART003370620'
PUBLISHER_HOME = 'https://brhistory.re.kr/subList/32000003815'
KCI_DETAIL = f'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI_ID}'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/20.0; current-public-provenance-only)'
MAX = 20 * 1024 * 1024
ATTEMPTS = 3
TIMEOUT = 35
ALLOWED_HOSTS = ('brhistory.re.kr', 'www.kci.go.kr')


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return any(host == h or host.endswith('.' + h) for h in ALLOWED_HOSTS)


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 5000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def fetch(url: str, *, data: bytes | None = None, referer: str | None = None) -> tuple[dict, bytes, str]:
    assert allowed(url), f'outside strict current-public allowlist: {url}'
    opener = build_opener()
    attempts = []
    last = None
    for attempt in range(1, ATTEMPTS + 1):
        headers = {
            'User-Agent': UA,
            'Accept': 'text/html,application/json,application/javascript,application/pdf,*/*;q=0.5',
            'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
        }
        if referer:
            headers['Referer'] = referer
        if data is not None:
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
            headers['X-Requested-With'] = 'XMLHttpRequest'
        meta = {
            'requestedUrl': url,
            'method': 'POST' if data is not None else 'GET',
            'status': None,
            'finalUrl': None,
            'contentType': None,
            'bytes': 0,
            'sha256': None,
            'error': None,
            'attempt': attempt,
        }
        try:
            with opener.open(Request(url, data=data, headers=headers), timeout=TIMEOUT) as resp:
                body = resp.read(MAX)
                meta.update({
                    'status': getattr(resp, 'status', None),
                    'finalUrl': resp.geturl(),
                    'contentType': resp.headers.get('Content-Type'),
                    'bytes': len(body),
                    'sha256': hashlib.sha256(body).hexdigest(),
                })
                attempts.append({'attempt': attempt, 'status': meta['status'], 'bytes': len(body), 'error': None})
                meta['attempts'] = attempts
                return meta, body, decode(body)
        except Exception as exc:
            meta['error'] = f'{type(exc).__name__}: {exc}'
            attempts.append({'attempt': attempt, 'status': None, 'bytes': 0, 'error': meta['error']})
            last = meta
            if attempt < ATTEMPTS:
                time.sleep(attempt)
    assert last is not None
    last['attempts'] = attempts
    return last, b'', ''


def scripts(text: str, base: str) -> list[str]:
    out = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        u = urljoin(base, html.unescape(raw))
        if allowed(u) and u not in out:
            out.append(u)
    return out[:100]


def field_values(text: str, field: str) -> list[str]:
    decoded = html.unescape(text)
    vals = []
    patterns = [
        rf'name\s*=\s*["\']{re.escape(field)}["\'][^>]*value\s*=\s*["\']([^"\']+)',
        rf'value\s*=\s*["\']([^"\']+)["\'][^>]*name\s*=\s*["\']{re.escape(field)}["\']',
        rf'\b{re.escape(field)}\b\s*[:=]\s*["\']([^"\']+)["\']',
    ]
    for pat in patterns:
        for v in re.findall(pat, decoded, re.I | re.S):
            v = compact(v, 500)
            if v and v not in vals:
                vals.append(v)
    return vals[:30]


def parse_book_records(text: str) -> list[dict]:
    try:
        data = json.loads(text)
    except Exception:
        return []
    rows = data.get('result', data) if isinstance(data, dict) else data
    if not isinstance(rows, list):
        return []
    out = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        normalized = {str(k): v for k, v in row.items()}
        out.append(normalized)
    return out[:100]


def row_value(row: dict, *keys: str) -> str | None:
    lower = {str(k).lower(): v for k, v in row.items()}
    for key in keys:
        val = lower.get(key.lower())
        if val is not None and str(val).strip():
            return str(val).strip()
    return None


def target_fragment(text: str) -> str | None:
    decoded = html.unescape(text)
    idx = decoded.find(TITLE_SIGNAL)
    if idx < 0:
        idx = decoded.find(AUTHOR)
    if idx < 0:
        return None
    return decoded[max(0, idx - 12000): idx + 18000]


def fn_view_tuples(text: str) -> list[dict]:
    out = []
    for m in re.finditer(r"fnViewPdf\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'", text, re.I):
        rec = {'barcode': m.group(1), 'artId': m.group(2), 'kyoboKey': m.group(3), 'scholarUrl': m.group(4)}
        if rec not in out:
            out.append(rec)
    return out[:20]


def main() -> int:
    report = {
        'purpose': 'strict current-public reacquisition discovery for Kim Sanghan 2026; no stale publisher ids, no guessed file ids, no content download in this stage',
        'candidate': {'author': AUTHOR, 'title': TITLE, 'kci': ARTI_ID, 'year': 2026, 'issue': '10(4) / 통권 33호', 'pages': '631-665'},
        'guessedOpaqueIdentifierCount': 0,
        'contentDownloadExecuted': False,
        'kci': {},
        'publisher': {},
    }

    km, kb, kt = fetch(KCI_DETAIL)
    report['kci']['detail'] = km
    report['kci']['identityObserved'] = bool(kt and ARTI_ID in (km.get('finalUrl') or KCI_DETAIL) and AUTHOR in kt and TITLE_SIGNAL in kt)
    report['kci']['issue33Observed'] = bool(re.search(r'(통권\s*33호|10\s*\(\s*4\s*\)|no\.\s*4)', kt, re.I))
    report['kci']['previewUrls'] = []
    for raw in re.findall(r'(?:https?://[^\s"\'<>]+artiPreView\.kci[^\s"\'<>]*|/kciportal/[^"\']*artiPreView\.kci[^"\']*)', html.unescape(kt), re.I):
        u = urljoin(km.get('finalUrl') or KCI_DETAIL, raw.replace('&amp;', '&'))
        if ARTI_ID in u and u not in report['kci']['previewUrls']:
            report['kci']['previewUrls'].append(u)
    if kt:
        (OUT / 'kci-detail.html').write_text(kt[:3_000_000], encoding='utf-8')

    pm, pb, pt = fetch(PUBLISHER_HOME)
    pbase = pm.get('finalUrl') or PUBLISHER_HOME
    report['publisher']['home'] = pm
    report['publisher']['moduleContractsObserved'] = {
        'bookList': 'selectKyoboThesisBookListAjax.ink' in pt,
        'articleList': 'selectKyoboThesisNttListAjax.ink' in pt,
        'fnViewPdf': 'fnViewPdf' in pt,
        'builderDownload': 'builderDownload' in pt,
    }
    fields = {}
    for name in ('journalCd', 'sysmoduleSeq', 'trgtIsuInsttCd', 'strQuery', 'pubcNumYsno'):
        fields[name] = field_values(pt, name)
    report['publisher']['currentObservedFields'] = fields
    report['publisher']['homeTargetSignal'] = bool(AUTHOR in pt or TITLE_SIGNAL in pt)
    if pt:
        (OUT / 'publisher-home.html').write_text(pt[:3_000_000], encoding='utf-8')

    # Same-host static scripts may author the current form values/contracts. They are discovery evidence only.
    source_texts = [pt]
    script_meta = []
    for u in scripts(pt, pbase):
        sm, sb, st = fetch(u, referer=pbase)
        script_meta.append(sm)
        if st:
            source_texts.append(st)
    report['publisher']['scriptFetches'] = script_meta
    union = '\n'.join(source_texts)
    for name in fields:
        for v in field_values(union, name):
            if v not in fields[name]:
                fields[name].append(v)
    report['publisher']['currentObservedFields'] = fields
    report['publisher']['moduleContractsObserved'] = {
        'bookList': 'selectKyoboThesisBookListAjax.ink' in union,
        'articleList': 'selectKyoboThesisNttListAjax.ink' in union,
        'fnViewPdf': 'fnViewPdf' in union,
        'builderDownload': 'builderDownload' in union,
    }

    # Do not reuse old codes. Proceed only if one unambiguous current value is actually observed for each opaque field.
    opaque_required = ('journalCd', 'sysmoduleSeq', 'trgtIsuInsttCd')
    current = {}
    for name in opaque_required:
        vals = [v for v in fields.get(name, []) if re.fullmatch(r'[A-Za-z0-9_-]{2,80}', v)]
        if len(vals) == 1:
            current[name] = vals[0]
    report['publisher']['currentOpaqueContract'] = current
    contract_verified = (
        report['publisher']['moduleContractsObserved']['bookList'] and
        report['publisher']['moduleContractsObserved']['articleList'] and
        all(name in current for name in opaque_required)
    )
    report['publisher']['contractVerified'] = contract_verified
    report['publisher']['bookRecords'] = []
    report['publisher']['issue33Records'] = []
    report['publisher']['articleListProbes'] = []
    report['publisher']['targetRecords'] = []

    if contract_verified:
        book_endpoint = urljoin(pbase, '/module/thesis/selectKyoboThesisBookListAjax.ink')
        base_form = {
            'journalCd': current['journalCd'],
            'sysmoduleSeq': current['sysmoduleSeq'],
            'trgtIsuInsttCd': current['trgtIsuInsttCd'],
            'bookYear': '2026',
        }
        bm, bb, bt = fetch(book_endpoint, data=urlencode(base_form).encode('utf-8'), referer=pbase)
        report['publisher']['bookListProbe'] = bm
        books = parse_book_records(bt)
        report['publisher']['bookRecords'] = books
        issue33 = []
        for row in books:
            name = row_value(row, 'BOOK_NM', 'bookNm', 'BOOK_NAME', 'bookName') or ''
            code = row_value(row, 'BOOK_CD', 'bookCd', 'BOOK_CODE', 'bookCode')
            if code and (re.search(r'제?\s*33\s*호', name) or '2026.08' in name or '2026-08' in name):
                issue33.append({'bookCode': code, 'bookName': name, 'raw': row})
        report['publisher']['issue33Records'] = issue33

        article_endpoint = urljoin(pbase, '/module/thesis/selectKyoboThesisNttListAjax.ink')
        responses = []
        for rec in issue33[:10]:
            form = {**base_form, 'bookCd': rec['bookCode'], 'searchKeyword': TITLE_SIGNAL, 'searchCondition': 'productNm'}
            am, ab, at = fetch(article_endpoint, data=urlencode(form).encode('utf-8'), referer=pbase)
            probe = dict(am)
            probe['bookCode'] = rec['bookCode']
            probe['bookName'] = rec['bookName']
            probe['containsTarget'] = bool(AUTHOR in at or TITLE_SIGNAL in at)
            report['publisher']['articleListProbes'].append(probe)
            if probe['containsTarget']:
                responses.append(at)
        joined = '\n'.join(responses)
        frag = target_fragment(joined)
        if frag:
            (OUT / 'publisher-target-fragment.html').write_text(frag, encoding='utf-8')
            report['publisher']['targetRecords'] = fn_view_tuples(frag)

    (OUT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    summary = {
        'kciIdentityObserved': report['kci']['identityObserved'],
        'kciIssue33Observed': report['kci']['issue33Observed'],
        'publisherHomeStatus': report['publisher']['home'].get('status'),
        'publisherModuleContracts': report['publisher']['moduleContractsObserved'],
        'publisherCurrentObservedFields': report['publisher']['currentObservedFields'],
        'publisherCurrentOpaqueContract': report['publisher']['currentOpaqueContract'],
        'publisherContractVerified': report['publisher']['contractVerified'],
        'publisherIssue33Records': report['publisher']['issue33Records'],
        'publisherTargetRecords': report['publisher']['targetRecords'],
        'guessedOpaqueIdentifierCount': 0,
        'contentDownloadExecuted': False,
    }
    (OUT / 'summary.txt').write_text(json.dumps(summary, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(summary, ensure_ascii=False, indent=2))

    assert km['status'] == 200 and report['kci']['identityObserved']
    assert report['guessedOpaqueIdentifierCount'] == 0
    assert report['contentDownloadExecuted'] is False
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
