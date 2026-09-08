#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-na-hyukjin-2017')
OUT.mkdir(exist_ok=True)

AUTHOR = '나혁진'
TITLE = '명리 궁합론의 현대적 재해석에 관한 연구'
RISS_ID = 'T14398372'
NANET_CONTROL = 'KDMT1201802345'
RISS_LINK = f'https://www.riss.kr/link?id={RISS_ID}'
NANET_DETAIL = f'https://dl.nanet.go.kr/detail/{NANET_CONTROL}'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/19.3; public-resource-verification)'
MAX = 12 * 1024 * 1024
ATTEMPTS = 3


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return host == 'www.riss.kr' or host.endswith('.riss.kr') or host == 'dl.nanet.go.kr' or host.endswith('.nanet.go.kr')


def decode(body: bytes) -> str:
    for enc in ('utf-8', 'euc-kr', 'cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def compact(text: str, limit: int = 6000) -> str:
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()[:limit]


def fetch(opener, url: str, *, data: bytes | None = None, referer: str | None = None) -> tuple[dict, str]:
    assert allowed(url), f'outside bounded public dispatcher allowlist: {url}'
    attempts = []
    last = None
    for attempt in range(1, ATTEMPTS + 1):
        headers = {
            'User-Agent': UA,
            'Accept': 'text/html,application/xhtml+xml,application/javascript,application/json,*/*;q=0.5',
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
            with opener.open(Request(url, data=data, headers=headers), timeout=35) as resp:
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
                return meta, decode(body)
        except Exception as exc:
            meta['error'] = f'{type(exc).__name__}: {exc}'
            attempts.append({'attempt': attempt, 'status': None, 'bytes': 0, 'error': meta['error']})
            last = meta
            if attempt < ATTEMPTS:
                time.sleep(attempt)
    assert last is not None
    last['attempts'] = attempts
    return last, ''


def hidden_value(text: str, element_id: str) -> str | None:
    for tag in re.findall(r'<input\b[^>]*>', text, re.I | re.S):
        if not re.search(rf'\bid\s*=\s*["\']{re.escape(element_id)}["\']', tag, re.I):
            continue
        m = re.search(r'\bvalue\s*=\s*["\']([^"\']*)["\']', tag, re.I)
        if m:
            return html.unescape(m.group(1))
    return None


def scripts(text: str, base: str) -> list[str]:
    out: list[str] = []
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        url = urljoin(base, html.unescape(raw))
        if allowed(url) and url not in out:
            out.append(url)
    return out[:140]


def ctx(text: str, pattern: str, before: int = 900, after: int = 5000) -> str | None:
    m = re.search(pattern, text, re.I | re.S)
    if not m:
        return None
    return compact(text[max(0, m.start()-before):min(len(text), m.start()+after)], before+after)


def write_report(report: dict) -> None:
    (OUT / 'dispatcher-probe.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')


def main() -> int:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    report = {
        'purpose': 'same-run site-authored RISS originalCheck and anonymous NANET viewer bootstrap for Na Hyukjin 2017; availability-neutral bounded retry',
        'guessedOpaqueIdentifierCount': 0,
        'downloadActionExecuted': False,
        'riss': {},
        'nanet': {'surfaceUnavailable': False},
    }

    # RISS current public contract.
    rm, rt = fetch(opener, RISS_LINK)
    rbase = rm.get('finalUrl') or RISS_LINK
    doc_control = hidden_value(rt, 'controlNo')
    doc_type = hidden_value(rt, 'docType')
    go_ori_observed = '/detail/originalCheck.do' in rt
    original_contract = None
    original_contract_source = None
    for url in scripts(rt, rbase):
        jm, jt = fetch(opener, url, referer=rbase)
        if not jt or 'originalCheck' not in jt:
            continue
        normalized = re.sub(r'\s+', '', jt)
        if ('functionoriginalCheck(goOri)' in normalized and
            'data:{controlNo:controlNo,docType:docType}' in normalized and
            'url:goOri' in normalized):
            original_contract = ctx(jt, r'function\s+originalCheck\s*\([^)]*\)', 700, 3800)
            original_contract_source = jm.get('finalUrl') or url
            break
    report['riss'].update({
        'detail': rm,
        'docControlNo': doc_control,
        'docType': doc_type,
        'goOriObserved': go_ori_observed,
        'originalCheckContractObserved': bool(original_contract),
        'originalCheckContractSource': original_contract_source,
        'originalCheckContractContext': original_contract,
    })
    assert rm['status'] == 200 and TITLE in rt and AUTHOR in rt
    assert doc_control == '14398372' and doc_type == 'T'
    assert go_ori_observed and original_contract

    endpoint = urljoin(rbase, '/detail/originalCheck.do')
    payload = urlencode({'controlNo': doc_control, 'docType': doc_type}).encode('ascii')
    om, ot = fetch(opener, endpoint, data=payload, referer=rbase)
    report['riss']['originalCheck'] = om
    report['riss']['originalCheckBody'] = compact(ot, 4000)
    assert om['status'] == 200

    # NANET current public surface. Availability failure is not a semantic/access negative.
    nm, nt = fetch(opener, NANET_DETAIL)
    if not nt:
        report['nanet'].update({'surfaceUnavailable': True, 'detail': nm})
        write_report(report)
        print(json.dumps({
            'rissOriginalCheckBody': report['riss']['originalCheckBody'],
            'nanetSurfaceUnavailable': True,
            'guessedOpaqueIdentifierCount': 0,
            'downloadActionExecuted': False,
        }, ensure_ascii=False, indent=2))
        return 0

    nbase = nm.get('finalUrl') or NANET_DETAIL
    report['nanet']['surfaceUnavailable'] = False
    target_view = re.search(rf'viewDoc\s*\(\s*this\s*,\s*["\']{NANET_CONTROL}["\']\s*,\s*["\']1["\']\s*\)', nt, re.I)
    target_download = re.search(rf'downloadDoc\s*\(\s*this\s*,\s*["\']{NANET_CONTROL}["\']\s*,\s*["\']1["\']\s*\)', nt, re.I)
    view_context = None
    download_context = None
    dispatcher_source = None
    for url in scripts(nt, nbase):
        jm, jt = fetch(opener, url, referer=nbase)
        if not jt:
            continue
        vc = ctx(jt, r'function\s+viewDoc\s*\([^)]*\)', 500, 6500)
        dc = ctx(jt, r'function\s+downloadDoc\s*\([^)]*\)', 500, 4500)
        if vc and dc and '/view/callViewer.do' in jt and '/file/fileDownload.do' in jt:
            view_context = vc
            download_context = dc
            dispatcher_source = jm.get('finalUrl') or url
            break
    view_public_contract = bool(view_context and 'viewDocBySingleCount(controlNo)' in view_context and '/view/callViewer.do?controlNo=' in view_context)
    download_login_gate = bool(download_context and re.search(r'if\s*\(\s*!isLogin\s*\)', download_context) and '/login.do' in download_context)
    report['nanet'].update({
        'detail': nm,
        'targetViewCallObserved': bool(target_view),
        'targetDownloadCallObserved': bool(target_download),
        'dispatcherSource': dispatcher_source,
        'viewContext': view_context,
        'downloadContext': download_context,
        'viewPublicContractObserved': view_public_contract,
        'downloadLoginGateObserved': download_login_gate,
    })
    assert nm['status'] == 200 and TITLE in nt and AUTHOR in nt and NANET_CONTROL in nt
    assert target_view and target_download
    assert view_public_contract and download_login_gate

    viewer_url = f'https://dl.nanet.go.kr/view/callViewer.do?controlNo={NANET_CONTROL}&orgId=dl&linkSysId=NADL'
    vm, vt = fetch(opener, viewer_url, referer=nbase)
    report['nanet']['viewer'] = vm
    report['nanet']['viewerBody'] = compact(vt, 10000)
    replace = re.search(r'location\.replace\s*\(\s*["\']([^"\']+)["\']\s*\)', vt, re.I)
    report['nanet']['viewerNextHop'] = html.unescape(replace.group(1)) if replace else None
    report['nanet']['viewerLoginBoundary'] = bool(re.search(r'로그인|/login\.do|loginForm', vt, re.I))
    report['nanet']['viewerInstitutionBoundary'] = bool(re.search(r'협정기관|기관.?인증|소속기관', vt, re.I))
    report['nanet']['viewerDrmSignal'] = bool(re.search(r'\bDRM\b|Fasoo|ezPDF', vt, re.I))
    assert vm['status'] == 200

    write_report(report)
    print(json.dumps({
        'rissOriginalCheckBody': report['riss']['originalCheckBody'],
        'nanetSurfaceUnavailable': report['nanet']['surfaceUnavailable'],
        'nanetTargetViewCallObserved': report['nanet']['targetViewCallObserved'],
        'nanetTargetDownloadCallObserved': report['nanet']['targetDownloadCallObserved'],
        'nanetViewPublicContractObserved': report['nanet']['viewPublicContractObserved'],
        'nanetDownloadLoginGateObserved': report['nanet']['downloadLoginGateObserved'],
        'nanetViewer': report['nanet']['viewer'],
        'nanetViewerNextHop': report['nanet']['viewerNextHop'],
        'nanetViewerLoginBoundary': report['nanet']['viewerLoginBoundary'],
        'nanetViewerInstitutionBoundary': report['nanet']['viewerInstitutionBoundary'],
        'nanetViewerDrmSignal': report['nanet']['viewerDrmSignal'],
        'guessedOpaqueIdentifierCount': report['guessedOpaqueIdentifierCount'],
        'downloadActionExecuted': report['downloadActionExecuted'],
    }, ensure_ascii=False, indent=2))
    assert report['guessedOpaqueIdentifierCount'] == 0
    assert report['downloadActionExecuted'] is False
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
