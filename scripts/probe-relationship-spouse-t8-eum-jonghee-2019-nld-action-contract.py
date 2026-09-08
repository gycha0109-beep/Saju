#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-eum-jonghee-2019')
OUT.mkdir(exist_ok=True)

DETAIL = 'https://www.nld.go.kr/home/dataDetailSojang.do?target=SJ&unicno=142462&key_id=CAT-000147672&org_id=cef199863d474b0d82031fd214432e7a'
COMMON_JS = 'https://www.nld.go.kr/js/egov/common/common.js'
METADATA = 'https://www.nld.go.kr/home/getDetailInfo.do'
AUTHOR = '음종희'
TITLE_SIGNAL = '四柱命理 宮星'
EXPECTED_UCCNO = 'CAT-000147672'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/16.5; public-resource-verification)'
MAX = 10 * 1024 * 1024


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 18000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def fetch(opener, url: str, *, referer: str | None = None, data: dict[str, str] | None = None) -> tuple[dict, bytes, str]:
    headers = {
        'User-Agent': UA,
        'Accept': 'text/html,application/javascript,application/json,*/*;q=0.5',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.7',
    }
    payload = None
    if referer:
        headers['Referer'] = referer
    if data is not None:
        payload = urlencode(data).encode('utf-8')
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        headers['X-Requested-With'] = 'XMLHttpRequest'
    meta = {
        'requestedUrl': url,
        'method': 'POST' if data is not None else 'GET',
        'requestFields': sorted(data.keys()) if data else [],
        'status': None,
        'finalUrl': None,
        'contentType': None,
        'bytes': 0,
        'sha256': None,
        'error': None,
    }
    try:
        with opener.open(Request(url, data=payload, headers=headers), timeout=35) as r:
            body = r.read(MAX)
            text = decode(body)
            meta.update({
                'status': getattr(r, 'status', None),
                'finalUrl': r.geturl(),
                'contentType': r.headers.get('Content-Type'),
                'bytes': len(body),
                'sha256': hashlib.sha256(body).hexdigest(),
            })
            return meta, body, text
    except Exception as exc:
        meta['error'] = f'{type(exc).__name__}: {exc}'
        return meta, b'', ''


def function_window(text: str, name: str) -> str | None:
    m = re.search(rf'function\s+{re.escape(name)}\s*\([^)]*\)\s*\{{', text, re.I)
    if not m:
        return None
    start = m.start()
    brace = text.find('{', m.start())
    depth = 0
    quote = None
    esc = False
    for i in range(brace, min(len(text), brace + 60000)):
        ch = text[i]
        if quote:
            if esc:
                esc = False
            elif ch == '\\':
                esc = True
            elif ch == quote:
                quote = None
            continue
        if ch in ('"', "'"):
            quote = ch
            continue
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                return compact(text[start:i + 1], 30000)
    return compact(text[start:start + 30000], 30000)


def context_windows(text: str, token: str, cap: int = 12) -> list[str]:
    out = []
    for m in re.finditer(re.escape(token), text, re.I):
        value = compact(text[max(0, m.start() - 1800): min(len(text), m.start() + 9000)], 11000)
        if value not in out:
            out.append(value)
        if len(out) >= cap:
            break
    return out


def routes(window: str | None, base: str) -> list[str]:
    if not window:
        return []
    out = []
    for raw in re.findall(r'''["']([^"'\r\n]{1,1600})["']''', html.unescape(window)):
        if not (raw.startswith('/') or raw.startswith('http')):
            continue
        if not re.search(r'file|view|download|login|session|auth|content|path|reader|epub|audio', raw, re.I):
            continue
        url = urljoin(base, raw)
        if url not in out:
            out.append(url)
    return out[:200]


def same_nld_script(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return host == 'www.nld.go.kr' or host.endswith('.nld.go.kr')


def assigned_string(text: str, name: str) -> str | None:
    m = re.search(rf'\b(?:var|let|const)\s+{re.escape(name)}\s*=\s*["\']([^"\']*)["\']', text)
    return html.unescape(m.group(1)) if m else None


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'inspect target-specific NLD action/session permission contract without executing download/view/content actions',
        'detail': None,
        'metadata': None,
        'targetMetadata': None,
        'derivedSiteAuthoredCalls': None,
        'commonJs': None,
        'doActionExt': None,
        'doAction': None,
        'doActionRoutes': [],
        'checkSession': None,
        'checkSessionDefinitionObserved': False,
        'checkSessionSources': [],
        'anonymousSession': {
            'userId': None,
            'userid': None,
            'requiresLogin': False,
            'loginMessageObserved': False,
            'returnsFalseBeforeAuthorityCheck': False,
        },
        'checkAccessAuthority': None,
        'getSelectActionType': None,
        'accessAuthorityGateObserved': False,
        'scriptUrls': [],
        'loginOrSessionGateObserved': False,
        'contentActionExecuted': False,
    }

    dm, _db, dt = fetch(opener, DETAIL)
    report['detail'] = dm
    assert dm['status'] == 200
    assert AUTHOR in dt or TITLE_SIGNAL in dt or EXPECTED_UCCNO in dt
    assert 'doActionExt' in dt and '/home/getDetailInfo.do' in dt

    # The target detail page itself authors the effective session gate. This must
    # be inspected before any content action is even considered.
    inline_check_session = function_window(dt, 'checkSession')
    assert inline_check_session is not None, 'target detail page no longer exposes checkSession'
    report['checkSession'] = inline_check_session
    report['checkSessionDefinitionObserved'] = True
    report['checkSessionSources'].append({
        'source': dm.get('finalUrl') or DETAIL,
        'kind': 'target-detail-inline',
        'namedFunction': inline_check_session,
        'definitionContexts': context_windows(dt, 'checkSession')[:4],
        'routeLiterals': routes(inline_check_session, dm.get('finalUrl') or DETAIL),
    })
    report['anonymousSession']['userId'] = assigned_string(dt, 'USER_ID')
    report['anonymousSession']['userid'] = assigned_string(dt, 'userid')
    normalized_check = re.sub(r'\s+', '', inline_check_session)
    report['anonymousSession']['loginMessageObserved'] = '로그인 후 이용하실 수 있습니다' in inline_check_session
    report['anonymousSession']['returnsFalseBeforeAuthorityCheck'] = (
        'returnfalse;' in normalized_check
        and normalized_check.find('returnfalse;') < normalized_check.find('checkAccessAuthority')
    )
    report['anonymousSession']['requiresLogin'] = (
        report['anonymousSession']['userId'] == ''
        and report['anonymousSession']['userid'] == ''
        and report['anonymousSession']['loginMessageObserved']
        and report['anonymousSession']['returnsFalseBeforeAuthorityCheck']
        and "if(''!='Y')" in normalized_check
    )

    mm, _mb, mt = fetch(
        opener,
        METADATA,
        referer=DETAIL,
        data={'target': 'SJ', 'unicno': '142462', 'uccno': '', 'rowCnt': '1', 'searchWd': '', 'reQuery': ''},
    )
    report['metadata'] = mm
    payload = json.loads(mt)
    assert payload.get('list'), 'NLD target metadata list missing'
    row = payload['list'][0]
    joined = json.dumps(row, ensure_ascii=False)
    assert AUTHOR in joined and TITLE_SIGNAL in joined
    gwons = row.get('gwonList') or []
    assert gwons, 'NLD target metadata has no volume/action row'
    gwon = gwons[0]
    assert gwon.get('ucCno') == EXPECTED_UCCNO
    assert gwon.get('dataTypeCode') == 'DT'
    assert gwon.get('target_div_code') == 'SP'
    report['targetMetadata'] = {
        'title': row.get('title'),
        'sub_title': row.get('sub_title'),
        'author100': row.get('author100'),
        'publisher': row.get('publisher'),
        'contentTypeCode': row.get('contentTypeCode'),
        'dataTypeCode': gwon.get('dataTypeCode'),
        'ucCno': gwon.get('ucCno'),
        'targetDivCode': gwon.get('target_div_code'),
    }
    report['derivedSiteAuthoredCalls'] = {
        'download': "doActionExt('DT','01|CAT-000147672','SP')",
        'view': "doActionExt('DT','08|CAT-000147672','SP')",
        'braille': "doActionExt('DT','09|CAT-000147672','SP')",
        'basis': 'same NLD detail-page UI template + target getDetailInfo metadata; no action executed',
    }

    jm, _jb, jt = fetch(opener, COMMON_JS, referer=DETAIL)
    report['commonJs'] = jm
    assert jm['status'] == 200 and 'doActionExt' in jt and 'function doAction' in jt
    report['doActionExt'] = function_window(jt, 'doActionExt')
    report['doAction'] = function_window(jt, 'doAction')
    report['doActionRoutes'] = routes(report['doAction'], jm.get('finalUrl') or COMMON_JS)
    report['checkAccessAuthority'] = function_window(jt, 'checkAccessAuthority')
    report['getSelectActionType'] = function_window(jt, 'getSelectActionType')
    report['accessAuthorityGateObserved'] = (
        report['checkAccessAuthority'] is not None
        and report['getSelectActionType'] is not None
        and '회원님께서는 본 서비스를 이용할 수 있는 권한이 없습니다' in report['checkAccessAuthority']
    )

    script_urls = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', dt, re.I):
        url = urljoin(dm.get('finalUrl') or DETAIL, html.unescape(raw))
        if same_nld_script(url) and url not in script_urls:
            script_urls.append(url)
    if COMMON_JS not in script_urls:
        script_urls.append(COMMON_JS)
    report['scriptUrls'] = script_urls[:80]

    # Preserve any additional same-host checkSession definitions/usages for
    # provenance, but the target detail inline definition above is authoritative
    # for the anonymous page that generated these target actions.
    for url in report['scriptUrls']:
        sm, _sb, st = fetch(opener, url, referer=DETAIL)
        if not st or 'checkSession' not in st:
            continue
        named = function_window(st, 'checkSession')
        contexts = context_windows(st, 'checkSession')
        definitionish = [
            x for x in contexts
            if re.search(r'function\s+checkSession|checkSession\s*=\s*(?:function|\([^)]*\)\s*=>)|checkSession\s*:\s*function', x, re.I)
        ]
        report['checkSessionSources'].append({
            'source': sm.get('finalUrl') or url,
            'kind': 'same-host-static-script',
            'meta': sm,
            'namedFunction': named,
            'definitionContexts': definitionish[:8],
            'allContexts': contexts[:12],
            'routeLiterals': routes(' '.join(contexts), sm.get('finalUrl') or url),
        })

    permission_text = ' '.join([
        report['doActionExt'] or '',
        report['doAction'] or '',
        report['checkSession'] or '',
        report['checkAccessAuthority'] or '',
        report['getSelectActionType'] or '',
    ])
    report['loginOrSessionGateObserved'] = bool(re.search(
        r'checkSession|goLogin|login|로그인|user_id|userId|session|checkAccessAuthority',
        permission_text,
        re.I,
    ))

    path = OUT / 'nld-action-contract.json'
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({
        'targetMetadata': report['targetMetadata'],
        'derivedSiteAuthoredCalls': report['derivedSiteAuthoredCalls'],
        'commonJs': report['commonJs'],
        'doActionExt': report['doActionExt'],
        'doAction': report['doAction'],
        'checkSession': report['checkSession'],
        'anonymousSession': report['anonymousSession'],
        'checkAccessAuthority': report['checkAccessAuthority'],
        'getSelectActionType': report['getSelectActionType'],
        'accessAuthorityGateObserved': report['accessAuthorityGateObserved'],
        'doActionRoutes': report['doActionRoutes'],
        'checkSessionDefinitionObserved': report['checkSessionDefinitionObserved'],
        'loginOrSessionGateObserved': report['loginOrSessionGateObserved'],
        'contentActionExecuted': report['contentActionExecuted'],
    }, ensure_ascii=False, indent=2))

    assert report['doActionExt'] is not None
    assert report['doAction'] is not None
    assert 'checkSession' in report['doAction'], 'NLD doAction no longer gates through checkSession'
    assert report['checkSessionDefinitionObserved'] is True
    assert report['anonymousSession']['requiresLogin'] is True, 'anonymous target page no longer exposes a fail-closed login gate'
    assert report['checkAccessAuthority'] is not None
    assert report['getSelectActionType'] is not None
    assert report['accessAuthorityGateObserved'] is True
    assert report['contentActionExecuted'] is False
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
