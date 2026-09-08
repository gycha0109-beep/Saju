#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener

OUT = Path('acquisition-na-hyukjin-2017')
OUT.mkdir(exist_ok=True)
FALLBACK = OUT / 'nanet-viewer-fallback.json'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/19.7; public-resource-verification)'
MAX = 12 * 1024 * 1024
ATTEMPTS = 3
DOCVIEWER_HOST = 'docviewer.nanet.go.kr'
ROUTE_HINT = re.compile(r'api|asset|book|content|document|doc|file|image|img|manifest|page|pdf|reader|text|tile|view', re.I)
REQUEST_HINT = re.compile(r'fetch\s*\(|axios\.|XMLHttpRequest|\.ajax\s*\(|\.get\s*\(|\.post\s*\(', re.I)
FOCUS_TOKENS = (
    'VUE_APP_BASE_URL', 'VUE_APP_MORE_PATH', 'VUE_APP_PDF_DOWN_URL', 'VUE_APP_USE_SEC',
    '/docinfo/', '/page/', '/pagec/', '/regDoc', '/download/', 'drm', 'aes-256-cbc',
)


def decode(data: bytes) -> str:
    for enc in ('utf-8','euc-kr','cp949'):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            pass
    return data.decode('utf-8', errors='replace')


def compact(text: str, limit: int=16000) -> str:
    return re.sub(r'\s+',' ',html.unescape(text)).strip()[:limit]


def access_boundary(text: str) -> dict[str,bool]:
    return {
        'login': bool(re.search(r'로그인|login|sign.?in', text, re.I)),
        'institutionAuth': bool(re.search(r'기관.?인증|소속기관|institutional|institution.?auth', text, re.I)),
        'purchase': bool(re.search(r'구매|결제|유료|purchase|payment|paywall', text, re.I)),
        'drmOrDedicatedViewer': bool(re.search(r'DRM|전용.?뷰어|dedicated.?viewer|ezPDF|Fasoo|MarkAny|MaWebDRM|aes-256-cbc', text, re.I)),
    }


def merge_boundary(base: dict[str,bool], incoming: dict[str,bool]) -> None:
    for k in base:
        base[k] = bool(base[k] or incoming.get(k))


def fetch(url: str, referer: str | None=None) -> tuple[dict, str]:
    p=urlparse(url)
    assert p.scheme=='https' and p.hostname==DOCVIEWER_HOST
    opener=build_opener()
    attempts=[]
    last=None
    for attempt in range(1,ATTEMPTS+1):
        headers={'User-Agent':UA,'Accept':'text/html,application/javascript,application/json,text/plain,*/*;q=0.5','Accept-Language':'ko-KR,ko;q=0.9,en;q=0.7'}
        if referer:
            headers['Referer']=referer
        meta={'requestedUrl':url,'method':'GET','status':None,'finalUrl':None,'contentType':None,'bytes':0,'sha256':None,'error':None,'attempt':attempt}
        try:
            with opener.open(Request(url,headers=headers),timeout=30) as r:
                body=r.read(MAX)
                final=r.geturl()
                meta.update({'status':getattr(r,'status',None),'finalUrl':final,'contentType':r.headers.get('Content-Type'),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest()})
                attempts.append({'attempt':attempt,'status':meta['status'],'finalUrl':final,'bytes':len(body),'error':None})
                meta['attempts']=attempts
                return meta, decode(body)
        except Exception as exc:
            meta['error']=f'{type(exc).__name__}: {exc}'
            attempts.append({'attempt':attempt,'status':None,'finalUrl':None,'bytes':0,'error':meta['error']})
            last=meta
            if attempt<ATTEMPTS:
                time.sleep(attempt)
    assert last is not None
    last['attempts']=attempts
    return last,''


def same_host(url: str) -> bool:
    p=urlparse(url)
    return p.scheme=='https' and p.hostname==DOCVIEWER_HOST


def scripts(base: str, text: str) -> list[str]:
    out=[]
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)', text, re.I):
        u=urljoin(base,html.unescape(raw))
        if same_host(u) and u not in out:
            out.append(u)
    return out[:80]


def route_literals(source: str, text: str) -> list[str]:
    out=[]
    for raw in re.findall(r'''["']([^"'\r\n]{1,900})["']''',html.unescape(text)):
        v=raw.strip()
        if not ROUTE_HINT.search(v) or v.startswith(('javascript:','#','mailto:','data:')):
            continue
        if not (v.startswith('/') or v.startswith('https://')):
            continue
        u=urljoin(source,v)
        if same_host(u) and u not in out:
            out.append(u)
    return out[:200]


def focus(source: str, text: str) -> list[dict]:
    out=[]
    decoded=html.unescape(text)
    for token in FOCUS_TOKENS:
        found=0
        for m in re.finditer(re.escape(token),decoded,re.I):
            window=compact(decoded[max(0,m.start()-900):min(len(decoded),m.end()+1800)],2800)
            rec={'source':source,'token':token,'window':window,'routeLiterals':route_literals(source,window)}
            if rec not in out:
                out.append(rec)
            found+=1
            if found>=6:
                break
    return out[:120]


def request_windows(source: str, text: str) -> list[dict]:
    out=[]
    decoded=html.unescape(text)
    for m in REQUEST_HINT.finditer(decoded):
        window=compact(decoded[max(0,m.start()-700):min(len(decoded),m.start()+2200)],3000)
        rec={'window':window,'routeLiterals':route_literals(source,window)}
        if rec not in out:
            out.append(rec)
    return out[:80]


def main() -> int:
    assert FALLBACK.exists(), 'nanet viewer fallback evidence required first'
    f=json.loads(FALLBACK.read_text(encoding='utf-8'))
    next_hop=(f.get('viewer') or {}).get('nextHop')
    report={
        'purpose':'inspect only exact public NANET docviewer HTML/static JS; no asset replay, download, DRM request, decryption, or guessed route',
        'targetControl':f.get('targetControl'),
        'siteAuthoredDocviewerUrl':next_hop,
        'viewerSurface':None,
        'viewerSurfaceAvailable':False,
        'viewerScripts':[],
        'scriptFetchSummary':{'attempted':0,'succeeded':0,'failed':0},
        'routeLiterals':[],
        'requestContracts':[],
        'focusedContexts':[],
        'accessBoundary':None,
        'scriptAccessBoundary':{'login':False,'institutionAuth':False,'purchase':False,'drmOrDedicatedViewer':False},
        'nextHopDisposition':None,
        'guessedOpaqueIdentifierCount':0,
        'contentAssetActionExecuted':False,
    }
    if not next_hop:
        report['nextHopDisposition']='NO_SITE_AUTHORED_DOCVIEWER_LITERAL_OBSERVED'
    else:
        p=urlparse(next_hop)
        assert p.scheme=='https' and p.hostname==DOCVIEWER_HOST
        assert re.fullmatch(r'/reader/[A-Za-z0-9_-]+',p.path) and not p.query and not p.fragment
        meta,text=fetch(next_hop, referer='https://dl.nanet.go.kr/')
        report['viewerSurface']=meta
        report['viewerSurfaceAvailable']=bool(text)
        if not text:
            report['nextHopDisposition']='DOCVIEWER_SURFACE_UNAVAILABLE'
        else:
            final=meta.get('finalUrl') or next_hop
            assert same_host(final)
            report['accessBoundary']=access_boundary(text)
            ss=scripts(final,text)
            report['viewerScripts']=ss
            routes=route_literals(final,text)
            contracts=[{'source':final,'kind':'html','requests':request_windows(final,text)}]
            contexts=focus(final,text)
            ok=bad=0
            for u in ss:
                sm,st=fetch(u,final)
                if not st:
                    bad+=1
                    continue
                ok+=1
                merge_boundary(report['scriptAccessBoundary'],access_boundary(st))
                for r in route_literals(u,st):
                    if r not in routes:
                        routes.append(r)
                req=request_windows(u,st)
                if req:
                    contracts.append({'source':u,'kind':'script','meta':sm,'requests':req})
                for c in focus(u,st):
                    if c not in contexts:
                        contexts.append(c)
            report['scriptFetchSummary']={'attempted':len(ss),'succeeded':ok,'failed':bad}
            report['routeLiterals']=routes[:240]
            report['requestContracts']=contracts
            report['focusedContexts']=contexts[:120]
            b=report['accessBoundary'] or {}
            sb=report['scriptAccessBoundary']
            if b.get('login') or b.get('institutionAuth') or b.get('purchase'):
                report['nextHopDisposition']='ACCESS_BOUNDARY_SIGNAL_ON_DOCVIEWER_SURFACE'
            elif sb.get('drmOrDedicatedViewer'):
                report['nextHopDisposition']='DRM_OR_DEDICATED_VIEWER_SIGNAL_OBSERVED_STOP_NO_REPLAY'
            elif routes or any(x.get('requests') for x in contracts):
                report['nextHopDisposition']='PUBLIC_VIEWER_CONTRACTS_OBSERVED_REVIEW_BEFORE_REPLAY'
            else:
                report['nextHopDisposition']='PUBLIC_VIEWER_SURFACE_NO_EXPLICIT_ASSET_CONTRACT_OBSERVED'
    (OUT/'nanet-docviewer.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({
        'siteAuthoredDocviewerUrl':report['siteAuthoredDocviewerUrl'],
        'viewerSurface':report['viewerSurface'],
        'viewerSurfaceAvailable':report['viewerSurfaceAvailable'],
        'scriptFetchSummary':report['scriptFetchSummary'],
        'accessBoundary':report['accessBoundary'],
        'scriptAccessBoundary':report['scriptAccessBoundary'],
        'focusedContexts':report['focusedContexts'],
        'nextHopDisposition':report['nextHopDisposition'],
        'guessedOpaqueIdentifierCount':0,
        'contentAssetActionExecuted':False,
    },ensure_ascii=False,indent=2))
    assert report['guessedOpaqueIdentifierCount']==0
    assert report['contentAssetActionExecuted'] is False
    return 0


if __name__=='__main__':
    raise SystemExit(main())
