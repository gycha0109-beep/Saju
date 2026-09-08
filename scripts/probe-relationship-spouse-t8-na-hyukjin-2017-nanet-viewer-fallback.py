#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, build_opener

OUT = Path('acquisition-na-hyukjin-2017')
OUT.mkdir(exist_ok=True)

CONTROL = 'KDMT1201802345'
STATIC = 'https://dl.nanet.go.kr/script/search/inner.js'
VIEWER = f'https://dl.nanet.go.kr/view/callViewer.do?controlNo={CONTROL}&orgId=dl&linkSysId=NADL'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/19.6; public-resource-verification)'
MAX = 12 * 1024 * 1024
ATTEMPTS = 3


def allowed(url: str) -> bool:
    host = (urlparse(url).hostname or '').lower()
    return host == 'dl.nanet.go.kr' or host.endswith('.nanet.go.kr')


def decode(body: bytes) -> str:
    for enc in ('utf-8','euc-kr','cp949'):
        try:
            return body.decode(enc)
        except UnicodeDecodeError:
            pass
    return body.decode('utf-8', errors='replace')


def fetch(url: str, referer: str | None = None) -> tuple[dict, str]:
    assert allowed(url)
    opener = build_opener()
    attempts=[]
    last=None
    for attempt in range(1, ATTEMPTS+1):
        headers={'User-Agent':UA,'Accept':'text/html,application/javascript,*/*;q=0.5','Accept-Language':'ko-KR,ko;q=0.9,en;q=0.7'}
        if referer:
            headers['Referer']=referer
        meta={'requestedUrl':url,'method':'GET','status':None,'finalUrl':None,'contentType':None,'bytes':0,'sha256':None,'error':None,'attempt':attempt}
        try:
            with opener.open(Request(url, headers=headers), timeout=35) as resp:
                body=resp.read(MAX)
                meta.update({'status':getattr(resp,'status',None),'finalUrl':resp.geturl(),'contentType':resp.headers.get('Content-Type'),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest()})
                attempts.append({'attempt':attempt,'status':meta['status'],'bytes':len(body),'error':None})
                meta['attempts']=attempts
                return meta, decode(body)
        except Exception as exc:
            meta['error']=f'{type(exc).__name__}: {exc}'
            attempts.append({'attempt':attempt,'status':None,'bytes':0,'error':meta['error']})
            last=meta
            if attempt<ATTEMPTS:
                time.sleep(attempt)
    assert last is not None
    last['attempts']=attempts
    return last,''


def compact(text: str, limit: int=9000) -> str:
    return re.sub(r'\s+',' ',html.unescape(text)).strip()[:limit]


def context(text: str, pattern: str, before: int=600, after: int=6000) -> str | None:
    m=re.search(pattern,text,re.I|re.S)
    if not m:
        return None
    return compact(text[max(0,m.start()-before):min(len(text),m.start()+after)], before+after)


def main() -> int:
    report={
        'purpose':'fresh public NANET static-dispatcher verification plus anonymous viewer bootstrap for already-public target control; no download/login bypass',
        'targetControl':CONTROL,
        'guessedOpaqueIdentifierCount':0,
        'downloadActionExecuted':False,
        'static':{},
        'viewer':{},
    }
    sm,st=fetch(STATIC)
    normalized=re.sub(r'\s+','',st) if st else ''
    view_ctx=context(st,r'function\s+viewDoc\s*\([^)]*\)',500,7000) if st else None
    download_ctx=context(st,r'function\s+downloadDoc\s*\([^)]*\)',500,5000) if st else None
    view_contract=bool(
        st and
        re.search(r'function\s+viewDoc\s*\([^)]*\)',st,re.I) and
        'viewDocBySingleCount(controlNo)' in normalized and
        '/view/callViewer.do?controlNo=' in st
    )
    download_login_gate=bool(
        st and
        re.search(r'function\s+downloadDoc\s*\([^)]*\)',st,re.I) and
        'if(!isLogin)' in normalized and
        '/login.do' in st and
        '/file/fileDownload.do' in st
    )
    report['static']={
        'meta':sm,
        'viewContractObserved':view_contract,
        'downloadLoginGateObserved':download_login_gate,
        'viewContext':view_ctx,
        'downloadContext':download_ctx,
    }
    assert sm['status']==200
    assert view_contract
    assert download_login_gate

    vm,vt=fetch(VIEWER, referer='https://dl.nanet.go.kr/')
    replace=re.search(r'location\.replace\s*\(\s*["\']([^"\']+)["\']\s*\)',vt,re.I) if vt else None
    next_hop=html.unescape(replace.group(1)) if replace else None
    report['viewer']={
        'meta':vm,
        'body':compact(vt,12000) if vt else None,
        'nextHop':next_hop,
        'loginBoundary':bool(re.search(r'로그인|/login\.do|loginForm',vt,re.I)) if vt else False,
        'institutionBoundary':bool(re.search(r'협정기관|기관.?인증|소속기관',vt,re.I)) if vt else False,
        'drmSignal':bool(re.search(r'\bDRM\b|Fasoo|ezPDF',vt,re.I)) if vt else False,
        'surfaceUnavailable':not bool(vt),
    }
    (OUT/'nanet-viewer-fallback.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({
        'staticStatus':sm.get('status'),
        'viewContractObserved':view_contract,
        'downloadLoginGateObserved':download_login_gate,
        'viewer':vm,
        'viewerNextHop':next_hop,
        'viewerSurfaceUnavailable':report['viewer']['surfaceUnavailable'],
        'viewerLoginBoundary':report['viewer']['loginBoundary'],
        'viewerInstitutionBoundary':report['viewer']['institutionBoundary'],
        'viewerDrmSignal':report['viewer']['drmSignal'],
        'guessedOpaqueIdentifierCount':0,
        'downloadActionExecuted':False,
    },ensure_ascii=False,indent=2))
    if vt:
        assert vm['status']==200
    assert report['guessedOpaqueIdentifierCount']==0
    assert report['downloadActionExecuted'] is False
    return 0


if __name__=='__main__':
    raise SystemExit(main())
