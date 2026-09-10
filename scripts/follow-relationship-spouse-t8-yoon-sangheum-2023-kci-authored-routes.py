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
ARTI_ID = 'ART003042567'
TITLE = '성역할과 유전자 관점의 육친론'
AUTHOR = '윤상흠'
KCI_BASE = 'https://www.kci.go.kr'
UA = 'Mozilla/5.0 (compatible; SajuResearchPublicRouteVerifier/1.0; +https://github.com/gycha0109-beep/Saju)'
CTX = ssl.create_default_context()

PREVIEW_URL = f'{KCI_BASE}/kciportal/ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI_ID}'
RISS_INFO_URL = f'{KCI_BASE}/kciportal/ci/sereArticleSearch/ciSereArtiRissInfo.kci'


def request(url: str, *, data: bytes | None = None, accept: str = '*/*') -> dict[str, object]:
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            'User-Agent': UA,
            'Accept': accept,
            'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.6',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' if data is not None else 'text/plain',
        },
        method='POST' if data is not None else 'GET',
    )
    try:
        with urllib.request.urlopen(req, timeout=30, context=CTX) as resp:
            body = resp.read()
            return {
                'ok': True,
                'status': getattr(resp, 'status', 200),
                'finalUrl': resp.geturl(),
                'contentType': resp.headers.get('Content-Type', ''),
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


def decode(body: bytes, content_type: str) -> str:
    match = re.search(r'charset=([\w-]+)', content_type, re.I)
    choices = [match.group(1) if match else None, 'utf-8', 'euc-kr', 'cp949']
    for encoding in choices:
        if not encoding:
            continue
        try:
            return body.decode(encoding)
        except (UnicodeDecodeError, LookupError):
            pass
    return body.decode('utf-8', errors='replace')


def visibleish(html: str) -> str:
    text = re.sub(r'(?is)<script\b.*?</script>', ' ', html)
    text = re.sub(r'(?is)<style\b.*?</style>', ' ', text)
    text = re.sub(r'(?s)<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', unescape(text)).strip()


def body_record(name: str, result: dict[str, object]) -> tuple[dict[str, object], bytes]:
    body = result.pop('body')
    record = {'name': name, **result}
    return record, body


def save(name: str, body: bytes, content_type: str) -> str | None:
    if not body:
        return None
    suffix = 'pdf' if b'%PDF-' in body[:1024] else ('xml' if 'xml' in content_type.lower() else 'html')
    path = ROOT / f'{name}-response.{suffix}'
    path.write_bytes(body)
    return str(path)


report: dict[str, object] = {
    'candidate': {'author': AUTHOR, 'title': TITLE, 'kciArticleId': ARTI_ID},
    'policy': {
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'onlyKciAuthoredRoutesFollowed': True,
    },
    'kciPageContract': {},
}

# Confirm what the exact KCI article page actually enables. The ScienceON tab is present only in a commented block
# for this item, so it is not treated as an active authored route.
kci_page = ROOT / 'kci-response.html'
if kci_page.exists():
    html = decode(kci_page.read_bytes(), 'text/html; charset=UTF-8')
    report['kciPageContract'] = {
        'previewFunctionObserved': "ciSereArtiOrteView.kci" in html,
        'rissInfoPostObserved': "ciSereArtiRissInfo.kci" in html,
        'scienceOnLiteralObserved': 'ScienceON' in html,
        'scienceOnTabCommentedOut': bool(re.search(r'<!--\s*<li[^>]*fncSearchArtiKistiOrte\(\).*?ScienceON.*?</li>\s*-->', html, re.S)),
    }

preview_result, preview_body = body_record(
    'kci-preview',
    request(PREVIEW_URL, accept='text/html,application/pdf;q=0.9,*/*;q=0.8'),
)
preview_result['requestedUrl'] = PREVIEW_URL
preview_result['savedAs'] = save('kci-preview', preview_body, str(preview_result.get('contentType') or ''))
preview_text = decode(preview_body, str(preview_result.get('contentType') or '')) if preview_body else ''
preview_result['isPdf'] = b'%PDF-' in preview_body[:1024]
preview_result['identityMarkers'] = {
    'title': TITLE in visibleish(preview_text) if preview_text else False,
    'author': AUTHOR in visibleish(preview_text) if preview_text else False,
}
preview_result['orteFileIds'] = sorted(set(re.findall(r'orteFileId["\'\s:=+]+([A-Za-z0-9._-]+)', preview_text)))[:50]
preview_result['pdfLikeAuthoredPaths'] = sorted(
    set(
        urllib.parse.urljoin(PREVIEW_URL, unescape(path))
        for path in re.findall(r'(?i)(?:href|src)=["\']([^"\']+(?:\.pdf|OrteServHistIFrame|download)[^"\']*)["\']', preview_text)
        if not path.lower().startswith(('javascript:', 'data:'))
    )
)[:50]
report['kciPreview'] = preview_result

post_data = urllib.parse.urlencode({'sereArticleSearchBean.artiId': ARTI_ID}).encode('utf-8')
riss_result, riss_body = body_record(
    'kci-riss-info',
    request(RISS_INFO_URL, data=post_data, accept='application/xml,text/xml,*/*;q=0.8'),
)
riss_result['requestedUrl'] = RISS_INFO_URL
riss_result['savedAs'] = save('kci-riss-info', riss_body, str(riss_result.get('contentType') or ''))
riss_text = decode(riss_body, str(riss_result.get('contentType') or '')) if riss_body else ''
riss_urls = [unescape(x.strip()) for x in re.findall(r'<url>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</url>', riss_text, re.S | re.I)]
riss_result['siteReturnedUrls'] = riss_urls[:20]
report['kciRissInfo'] = riss_result

followed: list[dict[str, object]] = []
for idx, url in enumerate(riss_urls[:5], start=1):
    if not url.startswith(('http://', 'https://')):
        continue
    followed_result, followed_body = body_record(
        f'kci-riss-target-{idx}',
        request(url, accept='text/html,application/pdf;q=0.9,*/*;q=0.8'),
    )
    followed_result['requestedUrl'] = url
    followed_result['savedAs'] = save(f'kci-riss-target-{idx}', followed_body, str(followed_result.get('contentType') or ''))
    followed_result['isPdf'] = b'%PDF-' in followed_body[:1024]
    if followed_body and not followed_result['isPdf']:
        target_text = visibleish(decode(followed_body, str(followed_result.get('contentType') or '')))
        followed_result['accessMarkers'] = {
            'title': TITLE in target_text,
            'author': AUTHOR in target_text,
            'paid': any(marker in target_text for marker in ('유료원문보기', '구매하기', '6,000원', '기관 인증', '구독 기관')),
            'login': '로그인' in target_text,
            'originalView': '원문보기' in target_text,
        }
    followed.append(followed_result)
report['kciRissTargets'] = followed

public_pdf = bool(preview_result['isPdf']) or any(bool(item.get('isPdf')) for item in followed)
report['publicBodyAcquired'] = public_pdf
report['fulltextDisposition'] = (
    'SITE_AUTHORED_PUBLIC_PDF_BODY_ACQUIRED'
    if public_pdf
    else 'NO_SITE_AUTHORED_PUBLIC_PDF_BODY_ACQUIRED_DO_NOT_BYPASS'
)
report['semanticDisposition'] = (
    'DIRECT_BODY_READY_FOR_REVIEW'
    if public_pdf
    else 'ACCESS_BOUNDARY_ONLY_NO_BODY_LEVEL_SPOUSE_SELECTOR_DECISION'
)

path = ROOT / 'kci-authored-route-report.json'
path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(path.read_text(encoding='utf-8'))
