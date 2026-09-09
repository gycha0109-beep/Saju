#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

ROOT = Path('acquisition-yoon-sangheum-2023')
RISS_TARGET = ROOT / 'riss-target.html'
UA = 'Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Yoon-2023-RISS-paid-provider-boundary)'


def riss_host(url: str) -> bool:
    return (urlparse(url).hostname or '').lower() in {'www.riss.kr', 'riss.kr'}


def fetch(opener, url: str, referer: str, max_bytes: int = 3_000_000):
    assert riss_host(url), f'non-RISS URL rejected: {url}'
    req = Request(url, headers={'User-Agent': UA, 'Referer': referer, 'Accept': 'text/javascript,text/html,*/*;q=0.8'})
    with opener.open(req, timeout=30) as resp:
        final = resp.geturl()
        assert riss_host(final), f'cross-host redirect rejected: {final}'
        body = resp.read(max_bytes + 1)
        assert len(body) <= max_bytes, 'bounded response limit exceeded'
        return {
            'requestedUrl': url,
            'finalUrl': final,
            'status': getattr(resp, 'status', None),
            'contentType': resp.headers.get('Content-Type', ''),
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
        }, body


def decode(body: bytes, ctype: str = '') -> str:
    m = re.search(r'charset=([A-Za-z0-9._-]+)', ctype, re.I)
    for enc in ([m.group(1)] if m else []) + ['utf-8', 'euc-kr', 'cp949']:
        try:
            return body.decode(enc)
        except Exception:
            pass
    return body.decode('utf-8', errors='replace')


def main():
    text = RISS_TARGET.read_text(encoding='utf-8')
    report = json.loads((ROOT / 'report.json').read_text(encoding='utf-8'))
    provider = report['rissProvider']
    final_url = provider['rissTarget']['finalUrl']

    exact_paid_provider = (
        "alt='유료'" in text or 'alt="유료"' in text
    ) and '코리아스칼라' in text and 'db.koreascholar.com' in text
    assert exact_paid_provider, 'expected explicit paid KoreaScholar provider label not observed'

    onclicks = []
    for m in re.finditer(r"ButtonSet\.urlDownload\(([^)]*)\)", text, re.I):
        value = re.sub(r'\s+', ' ', m.group(0))
        if value not in onclicks:
            onclicks.append(value)
    assert onclicks, 'RISS original-view ButtonSet.urlDownload contract not observed'

    script_urls = []
    for m in re.finditer(r'<script\b[^>]*\bsrc\s*=\s*(["\'])(.*?)\1', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        u = urljoin(final_url, raw)
        if riss_host(u) and u not in script_urls:
            script_urls.append(u)

    opener = build_opener(HTTPSHandler(context=ssl.create_default_context()), HTTPCookieProcessor(CookieJar()))
    fetches = []
    function_contexts = []
    for i, u in enumerate(script_urls[:25], start=1):
        try:
            meta, body = fetch(opener, u, final_url)
            s = decode(body, meta['contentType'])
            fetches.append({**meta, 'sourceUrl': u, 'error': None})
            if 'urlDownload' in s or 'ButtonSet' in s:
                (ROOT / f'riss-script-{i:02d}.txt').write_text(s, encoding='utf-8')
            for m in re.finditer(r'(?:ButtonSet\s*[.=]|urlDownload\s*[:=]|urlDownload\s*\()', s, re.I):
                ctx = re.sub(r'\s+', ' ', s[max(0, m.start()-800):min(len(s), m.end()+2400)])
                if 'urlDownload' in ctx and ctx not in function_contexts:
                    function_contexts.append(ctx)
        except Exception as exc:
            fetches.append({'sourceUrl': u, 'error': f'{type(exc).__name__}: {exc}'})

    # We intentionally do not invoke ButtonSet.urlDownload or any KoreaScholar content endpoint.
    # The exact RISS page itself marks the provider as paid; absence of a separately authored free
    # article/PDF URL means acquisition stops at this public paywall handoff boundary.
    free_article_urls = []
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''', text, re.I | re.S):
        raw = html.unescape(m.group(2).strip())
        low = raw.lower()
        if ('pdf' in low or 'download' in low or 'fulltext' in low) and 'koreascholar' not in low:
            u = urljoin(final_url, raw)
            if riss_host(u) and u not in free_article_urls:
                free_article_urls.append(u)

    out = {
        'exactPaidKoreaScholarProviderObserved': exact_paid_provider,
        'providerHomepage': 'http://db.koreascholar.com',
        'rissOriginalViewOnclickContracts': onclicks,
        'sameOriginScriptFetches': fetches,
        'urlDownloadFunctionContextCount': len(function_contexts),
        'urlDownloadFunctionContexts': function_contexts[:12],
        'separatelyAuthoredFreeRissArticleOrPdfUrls': free_article_urls,
        'originalViewInvoked': False,
        'koreaScholarContentRequestExecuted': False,
        'contentDownloadExecuted': False,
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'disposition': 'RISS_EXPLICIT_PAID_KOREASCHOLAR_PROVIDER_STOP_NO_PAYWALL_BYPASS',
    }
    (ROOT / 'riss-paid-provider-boundary.json').write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
    report['rissPaidProviderBoundary'] = out
    report['semanticDisposition'] = 'ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION'
    (ROOT / 'report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
