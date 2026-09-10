#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
import ssl
import urllib.error
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path('acquisition-yoon-sangheum-2023')
ROOT.mkdir(parents=True, exist_ok=True)

TITLE = '성역할과 유전자 관점의 육친론'
AUTHOR = '윤상흠'
DOI = '10.35203/EACT.2023.15.33'

SOURCES = [
    ('kci', 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003042567'),
    ('riss', 'https://m.riss.kr/search/detail/DetailView.do?control_no=37b95c18ae24bef64884a65323211ff0&p_mat_type=1a0202e37d52c72d'),
    ('koreascholar', 'https://db.koreascholar.com/Article/Detail/428909'),
    ('doi', f'https://doi.org/{DOI}'),
]

UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()


def fetch(url: str) -> dict[str, object]:
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': UA,
            'Accept': 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8',
            'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30, context=CTX) as resp:
            body = resp.read()
            content_type = resp.headers.get('Content-Type', '')
            final_url = resp.geturl()
            status = getattr(resp, 'status', 200)
            return {
                'ok': True,
                'status': status,
                'finalUrl': final_url,
                'contentType': content_type,
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
                'body': body,
            }
    except urllib.error.HTTPError as exc:
        body = exc.read()
        return {
            'ok': False,
            'status': exc.code,
            'finalUrl': exc.geturl(),
            'contentType': exc.headers.get('Content-Type', '') if exc.headers else '',
            'bytes': len(body),
            'sha256': hashlib.sha256(body).hexdigest(),
            'body': body,
            'error': f'HTTPError: {exc}',
        }
    except Exception as exc:  # noqa: BLE001
        return {
            'ok': False,
            'status': None,
            'finalUrl': url,
            'contentType': '',
            'bytes': 0,
            'sha256': None,
            'body': b'',
            'error': f'{type(exc).__name__}: {exc}',
        }


def decode_html(body: bytes, content_type: str) -> str:
    charset = None
    match = re.search(r'charset=([\w-]+)', content_type, re.I)
    if match:
        charset = match.group(1)
    for encoding in [charset, 'utf-8', 'euc-kr', 'cp949']:
        if not encoding:
            continue
        try:
            return body.decode(encoding)
        except (UnicodeDecodeError, LookupError):
            pass
    return body.decode('utf-8', errors='replace')


def visibleish_text(html: str) -> str:
    text = re.sub(r'(?is)<script\b.*?</script>', ' ', html)
    text = re.sub(r'(?is)<style\b.*?</style>', ' ', text)
    text = re.sub(r'(?s)<[^>]+>', ' ', text)
    text = unescape(text)
    return re.sub(r'\s+', ' ', text).strip()


def extract_authored_links(html: str, base_url: str) -> list[dict[str, str]]:
    links: list[dict[str, str]] = []
    pattern = re.compile(r'(?is)<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>')
    for href, inner in pattern.findall(html):
        text = visibleish_text(inner)[:300]
        href_decoded = unescape(href).strip()
        if not href_decoded or href_decoded.lower().startswith(('javascript:', 'mailto:', '#')):
            continue
        absolute = urllib.parse.urljoin(base_url, href_decoded)
        haystack = f'{text} {href_decoded}'.lower()
        if any(token in haystack for token in ('원문', 'fulltext', 'full-text', '.pdf', 'pdf', 'download', '다운로드', 'article/detail')):
            links.append({'text': text, 'href': href_decoded, 'absoluteUrl': absolute})
    dedup: dict[str, dict[str, str]] = {}
    for link in links:
        dedup.setdefault(link['absoluteUrl'], link)
    return list(dedup.values())[:100]


def snippets(text: str, terms: tuple[str, ...]) -> dict[str, list[str]]:
    out: dict[str, list[str]] = {}
    lower = text.lower()
    for term in terms:
        needle = term.lower()
        found: list[str] = []
        start = 0
        while len(found) < 5:
            idx = lower.find(needle, start)
            if idx < 0:
                break
            found.append(text[max(0, idx - 220): min(len(text), idx + len(term) + 420)])
            start = idx + len(needle)
        if found:
            out[term] = found
    return out


report: dict[str, object] = {
    'candidate': {
        'author': AUTHOR,
        'year': 2023,
        'title': '성역할과 유전자 관점의 육친론 ― 남명 기준의 財星과 官星을 위주로 ―',
        'journal': '동방문화와 사상',
        'issue': '15',
        'pages': '33-55',
        'doi': DOI,
        'kciArticleId': 'ART003042567',
        'rissControl': '37b95c18ae24bef64884a65323211ff0',
        'koreaScholarArticleId': '428909',
    },
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'onlySiteAuthoredPublicRoutesInspected': True,
    },
    'sources': [],
}

for name, url in SOURCES:
    result = fetch(url)
    body = result.pop('body')
    entry: dict[str, object] = {'name': name, 'requestedUrl': url, **result}
    if body:
        suffix = 'pdf' if b'%PDF-' in body[:1024] else 'html'
        (ROOT / f'{name}-response.{suffix}').write_bytes(body)
        if suffix == 'html':
            html = decode_html(body, str(result.get('contentType') or ''))
            text = visibleish_text(html)
            entry['identityMarkers'] = {
                'title': TITLE in text,
                'author': AUTHOR in text,
                'doi': DOI.lower() in text.lower(),
            }
            entry['accessMarkers'] = {
                'paidOriginalView': '유료원문보기' in text,
                'institutionSubscription': ('구독 기관' in text) or ('기관 인증' in text),
                'purchase6000Won': ('6,000원' in text) or ('6000원' in text),
                'kciPreview': 'KCI 원문 미리보기' in text,
                'fulltextFinder': '원문 찾아보기' in text,
            }
            entry['authoredFulltextCandidates'] = extract_authored_links(html, str(result.get('finalUrl') or url))
            entry['boundedSnippets'] = snippets(
                text,
                ('유료원문보기', 'KCI 원문 미리보기', '원문 찾아보기', '구독 기관', '6,000원', 'PDF', '원문보기'),
            )
    report['sources'].append(entry)

# Fresh web-index evidence already indicates the RISS record exposes this as paid fulltext.
# Preserve that as a fail-closed hypothesis until a site-authored public route actually returns the body.
report['fulltextDisposition'] = 'PUBLIC_BODY_NOT_YET_ESTABLISHED_DO_NOT_BYPASS_OR_INFER_FROM_ABSTRACT'
report['semanticDisposition'] = 'ABSTRACT_ONLY_NO_SPOUSE_SELECTOR_ADMISSION_DECISION'

path = ROOT / 'report.json'
path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(path.read_text(encoding='utf-8'))
