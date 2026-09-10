#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import http.cookiejar
import json
import re
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path('acquisition-jo-manseop-2007')
ROOT.mkdir(parents=True, exist_ok=True)
TITLE = '명리이론과 궁합의 상관관계 연구'
AUTHOR = '조만섭'
YEAR = 2007
NANET_CONTROL = 'KDMT1200725555'
NANET_URL = f'https://dl.nanet.go.kr/detail/{NANET_CONTROL}'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
JAR = http.cookiejar.CookieJar()
OPENER = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(JAR))


def fetch(url: str, *, referer: str | None = None, timeout: int = 60, max_bytes: int = 25_000_000):
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/javascript,application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
    }
    if referer:
        headers['Referer'] = referer
    req = urllib.request.Request(url, headers=headers)
    try:
        with OPENER.open(req, timeout=timeout) as resp:
            body = resp.read(max_bytes + 1)
            if len(body) > max_bytes:
                raise RuntimeError('bounded response limit exceeded')
            return {
                'ok': True,
                'status': getattr(resp, 'status', 200),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type', ''),
                'contentDisposition': resp.headers.get('Content-Disposition', ''),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'body': body,
            }
    except urllib.error.HTTPError as exc:
        body = exc.read(max_bytes + 1)
        return {
            'ok': False,
            'status': exc.code,
            'finalUrl': exc.geturl(),
            'contentType': exc.headers.get('Content-Type', '') if exc.headers else '',
            'contentDisposition': exc.headers.get('Content-Disposition', '') if exc.headers else '',
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
            'body': body,
            'error': f'HTTPError: {exc}',
        }


def decode(body: bytes, content_type: str = '') -> str:
    m = re.search(r'charset=([\w.-]+)', content_type or '', re.I)
    encs = ([m.group(1)] if m else []) + ['utf-8', 'euc-kr', 'cp949']
    for enc in encs:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def visibleish(text: str) -> str:
    text = re.sub(r'(?is)<script\b.*?</script>', ' ', text)
    text = re.sub(r'(?is)<style\b.*?</style>', ' ', text)
    text = re.sub(r'(?s)<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()


def save(name: str, meta: dict, body: bytes) -> tuple[str, str]:
    ct = str(meta.get('contentType') or '').lower()
    if body.startswith(b'%PDF-'):
        suffix = 'pdf'
    elif 'html' in ct or b'<html' in body[:4096].lower() or b'<!doctype' in body[:4096].lower():
        suffix = 'html'
    elif 'javascript' in ct:
        suffix = 'js'
    else:
        suffix = 'bin'
    path = ROOT / f'{name}.{suffix}'
    path.write_bytes(body)
    return str(path), suffix


def strip_tags(fragment: str) -> str:
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'(?s)<[^>]+>', ' ', fragment))).strip()


def authored_records(text: str, base: str) -> list[dict[str, str]]:
    records: list[dict[str, str]] = []
    seen: set[tuple[str, str, str]] = set()
    for m in re.finditer(r'(?is)<a\b([^>]*)>(.*?)</a>', text):
        attrs, inner = m.group(1), m.group(2)
        href = re.search(r'\bhref\s*=\s*["\']([^"\']+)["\']', attrs, re.I)
        onclick = re.search(r'\bonclick\s*=\s*["\']([^"\']+)["\']', attrs, re.I)
        raw = html.unescape(href.group(1).strip()) if href else ''
        label = strip_tags(inner)
        if raw and not raw.lower().startswith(('javascript:', '#')):
            url = urllib.parse.urljoin(base, raw)
            key = ('anchor', label, url)
            if key not in seen:
                seen.add(key)
                records.append({'kind':'anchor','label':label,'url':url,'raw':raw})
        if onclick:
            code = html.unescape(onclick.group(1))
            for quoted in re.findall(r'["\']([^"\']+)["\']', code):
                if '/' in quoted or quoted.startswith(('http:', 'https:')):
                    url = urllib.parse.urljoin(base, quoted)
                    key = ('onclick', label, url)
                    if key not in seen:
                        seen.add(key)
                        records.append({'kind':'onclick','label':label,'url':url,'raw':quoted,'code':code[:1000]})
    for m in re.finditer(r'(?is)<(?:button|input)\b([^>]*)>', text):
        attrs = m.group(1)
        onclick = re.search(r'\bonclick\s*=\s*["\']([^"\']+)["\']', attrs, re.I)
        value = re.search(r'\bvalue\s*=\s*["\']([^"\']*)["\']', attrs, re.I)
        label = html.unescape(value.group(1)) if value else ''
        if onclick:
            code = html.unescape(onclick.group(1))
            for quoted in re.findall(r'["\']([^"\']+)["\']', code):
                if '/' in quoted or quoted.startswith(('http:', 'https:')):
                    url = urllib.parse.urljoin(base, quoted)
                    key = ('onclick', label, url)
                    if key not in seen:
                        seen.add(key)
                        records.append({'kind':'onclick','label':label,'url':url,'raw':quoted,'code':code[:1000]})
    for pattern, kind in [
        (r'(?is)(?:window\.)?open\(\s*["\']([^"\']+)["\']', 'script-window-open'),
        (r'(?is)(?:document\.|window\.)?location(?:\.href)?\s*=\s*["\']([^"\']+)["\']', 'script-location'),
        (r'(?is)location\.replace\(\s*["\']([^"\']+)["\']', 'script-location-replace'),
    ]:
        for raw in re.findall(pattern, text):
            raw = html.unescape(raw.strip())
            if not raw or raw.lower().startswith(('javascript:', '#')):
                continue
            url = urllib.parse.urljoin(base, raw)
            key = (kind, '', url)
            if key not in seen:
                seen.add(key)
                records.append({'kind':kind,'label':'','url':url,'raw':raw})
    return records


def candidate_score(rec: dict[str, str]) -> int:
    label = rec.get('label', '').lower()
    url = rec.get('url', '').lower()
    score = 0
    for token in ['원문', '다운로드', 'download', 'pdf', 'fulltext', 'viewer', 'view']:
        if token in label:
            score += 5
        if token in url:
            score += 2
    if NANET_CONTROL.lower() in url:
        score += 3
    return score


report: dict[str, object] = {
    'candidate': {
        'title': TITLE,
        'author': AUTHOR,
        'year': YEAR,
        'institution': '경기대학교 국제·문화대학원',
        'degree': '석사',
        'nanetControl': NANET_CONTROL,
        'extent': 'vi, 135 p.',
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'onlyPageAuthoredPublicRoutesInspected': True,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'accessControlBypass': False,
    },
    'hops': [],
    'authoredRecords': [],
    'followedCandidateCount': 0,
    'fullLengthPdfAcquired': False,
    'semanticDisposition': 'PENDING_DIRECT_BODY_OR_ACCESS_BOUNDARY',
}

landing = fetch(NANET_URL, timeout=45, max_bytes=10_000_000)
landing_body = landing.pop('body')
landing_saved, landing_kind = save('nanet-detail', landing, landing_body)
landing_text = decode(landing_body, str(landing.get('contentType') or ''))
visible = visibleish(landing_text)
identity_observed = TITLE in visible and AUTHOR in visible and str(YEAR) in visible
records = authored_records(landing_text, str(landing.get('finalUrl') or NANET_URL))
report['authoredRecords'] = records
report['hops'].append({'name':'nanetDetail', **landing, 'saved':landing_saved, 'kind':landing_kind, 'identityObserved':identity_observed, 'authoredRecordCount':len(records)})
assert identity_observed, 'exact NANET title/author/year identity not observed on fetched landing page'

# Fetch page-authored external JavaScript only to discover literal routes/functions. No guessed endpoint is constructed.
script_srcs = []
for src in re.findall(r'(?is)<script\b[^>]*\bsrc=["\']([^"\']+)["\']', landing_text):
    raw = html.unescape(src.strip())
    if not raw or raw.lower().startswith(('javascript:', 'data:')):
        continue
    u = urllib.parse.urljoin(str(landing.get('finalUrl') or NANET_URL), raw)
    if u not in script_srcs:
        script_srcs.append(u)
for idx, js_url in enumerate(script_srcs[:12], start=1):
    js = fetch(js_url, referer=str(landing.get('finalUrl') or NANET_URL), timeout=30, max_bytes=5_000_000)
    js_body = js.pop('body')
    js_saved, js_kind = save(f'nanet-script-{idx}', js, js_body)
    report['hops'].append({'name':f'nanetScript{idx}', **js, 'saved':js_saved, 'kind':js_kind, 'url':js_url})

candidates = sorted((r for r in records if candidate_score(r) > 0), key=candidate_score, reverse=True)
report['candidateAuthoredRecords'] = candidates[:50]

# Bounded GET-only follow of literal page-authored candidates. Dynamic function parameters are not guessed.
followed = 0
for idx, rec in enumerate(candidates[:10], start=1):
    url = rec['url']
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme not in ('http', 'https'):
        continue
    # Do not follow generic navigation/search/account links merely because they contain a weak token.
    if candidate_score(rec) < 4:
        continue
    got = fetch(url, referer=str(landing.get('finalUrl') or NANET_URL), timeout=60, max_bytes=25_000_000)
    body = got.pop('body')
    saved, kind = save(f'candidate-hop-{idx}', got, body)
    is_pdf = body.startswith(b'%PDF-')
    followed += 1
    report['hops'].append({'name':f'candidateHop{idx}', **got, 'saved':saved, 'kind':kind, 'sourceRecord':rec, 'isPdf':is_pdf})
    if is_pdf:
        (ROOT/'candidate.pdf').write_bytes(body)
        report['fullLengthPdfAcquired'] = True
        report['pdfSha256'] = hashlib.sha256(body).hexdigest()
        report['pdfBytes'] = len(body)
        report['semanticDisposition'] = 'DIRECT_BODY_READY_FOR_RENDER_REVIEW'
        break
    text = decode(body, str(got.get('contentType') or ''))
    nested = authored_records(text, str(got.get('finalUrl') or url))
    report.setdefault('nestedAuthoredRecords', []).append({'source':url,'records':nested[:100]})
    nested_pdf = [r for r in nested if '.pdf' in r.get('url','').lower() or 'pdf' in r.get('label','').lower()]
    for nidx, nrec in enumerate(nested_pdf[:3], start=1):
        nurl = nrec['url']
        ngot = fetch(nurl, referer=str(got.get('finalUrl') or url), timeout=90, max_bytes=25_000_000)
        nbody = ngot.pop('body')
        nsaved, nkind = save(f'candidate-hop-{idx}-nested-{nidx}', ngot, nbody)
        nis_pdf = nbody.startswith(b'%PDF-')
        report['hops'].append({'name':f'candidateHop{idx}Nested{nidx}', **ngot, 'saved':nsaved, 'kind':nkind, 'sourceRecord':nrec, 'isPdf':nis_pdf})
        if nis_pdf:
            (ROOT/'candidate.pdf').write_bytes(nbody)
            report['fullLengthPdfAcquired'] = True
            report['pdfSha256'] = hashlib.sha256(nbody).hexdigest()
            report['pdfBytes'] = len(nbody)
            report['semanticDisposition'] = 'DIRECT_BODY_READY_FOR_RENDER_REVIEW'
            break
    if report['fullLengthPdfAcquired']:
        break

report['followedCandidateCount'] = followed
if not report['fullLengthPdfAcquired']:
    report['semanticDisposition'] = 'PUBLIC_CONTRACT_PROBE_ONLY_NO_BODY_LEVEL_DECISION'
(ROOT/'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
