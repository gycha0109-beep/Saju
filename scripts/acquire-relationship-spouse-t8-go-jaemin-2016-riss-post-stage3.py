#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition-go-jaemin-2016-stage3')
OUT.mkdir(exist_ok=True)
BASE = 'https://www.riss.kr'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/1.0; public-route-verification)'
MAX = 20 * 1024 * 1024

ORIGINAL_CHECK = BASE + '/detail/originalCheck.do'
TTS_DISCOVERY = BASE + '/search/download/newTtsView.do'
ORIGINAL_CHECK_DATA = {'controlNo': '14040293', 'docType': 'T'}
TTS_DATA = {
    'control_no': '01535e75dd09ae73ffe0bdc3ef48d419',
    'p_mat_type': 'be54d9b8bc7cdb09',
    's_mat_type': 'be54d9b8bc7cdb09',
    'mat_subtype_cd': 'b51fa0b5ced94fec',
    'imageFormat': 'a8cb3aaead67ab5b',
}


class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def digest(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def request(url: str, data: dict | None = None):
    red=Redirects(); op=build_opener(red)
    body=None
    headers={'User-Agent':UA,'Accept':'text/html,application/json,application/pdf,*/*;q=0.5'}
    if data is not None:
        body=urlencode(data).encode('ascii')
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
    req=Request(url,data=body,headers=headers,method='POST' if data is not None else 'GET')
    meta={'requestedUrl':url,'method':'POST' if data is not None else 'GET','status':None,'finalUrl':None,'contentType':None,'redirectChain':[],'bytes':0,'sha256':None,'pdfMagic':False,'error':None}
    try:
        with op.open(req,timeout=30) as r:
            b=r.read(MAX+1)
            if len(b)>MAX:
                b=b[:MAX]; meta['truncated']=True
            meta.update(status=getattr(r,'status',None),finalUrl=r.geturl(),contentType=r.headers.get('Content-Type'),redirectChain=red.chain,bytes=len(b),sha256=digest(b),pdfMagic=b.startswith(b'%PDF-'))
            return meta,b
    except Exception as e:
        meta['redirectChain']=red.chain; meta['error']=f'{type(e).__name__}: {e}'; return meta,b''


def text(b:bytes)->str:
    for enc in ('utf-8','euc-kr','cp949'):
        try:return b.decode(enc)
        except Exception:pass
    return b.decode('utf-8',errors='replace')


def exact_urls(s:str, base:str):
    vals=set()
    for raw in re.findall(r'(?:href|src|action|data-url|data-href)\s*=\s*["\']([^"\']+)["\']',s,re.I):
        vals.add(urljoin(base,raw.replace('&amp;','&')))
    for raw in re.findall(r'https?://[^\s"\'<>]+',s,re.I):
        vals.add(raw.replace('&amp;','&').rstrip(').,;'))
    return sorted(vals)


def login_or_access_gate(s:str)->bool:
    t=re.sub(r'\s+',' ',s).lower()
    signals=('로그인이 필요','로그인 후','기관인증','원문 이용 권한','접근 권한','권한이 없습니다','login required','authentication required')
    return any(x.lower() in t for x in signals)


def save(prefix:str,meta:dict,b:bytes):
    if not b:return None
    if b.startswith(b'%PDF-'):
        p=OUT/f'{prefix}.pdf';p.write_bytes(b);return p.name
    p=OUT/f'{prefix}.txt';p.write_text(text(b),encoding='utf-8');return p.name


def main():
    report={
        'purpose':'execute only exact candidate-page-authored RISS POST contracts; use raw server-returned literal URI without JS URI rewrites',
        'contracts':{
            'originalCheck':{'url':ORIGINAL_CHECK,'data':ORIGINAL_CHECK_DATA},
            'ttsDiscovery':{'url':TTS_DISCOVERY,'data':TTS_DATA},
        },
        'policy':{
            'guessedOpaqueIdentifierCount':0,
            'ttsUriRewriteApplied':False,
            'loginBypass':False,
            'institutionAuthBypass':False,
            'paywallBypass':False,
            'drmRequestExecuted':False,
            'decryptionActionExecuted':False,
            'onlyRawServerReturnedLiteralUriFollowed':True,
        },
        'originalCheck':{},'ttsDiscovery':{},'rawReturnedUrls':[],'followed':[],'pdfs':[]
    }

    om,ob=request(ORIGINAL_CHECK,ORIGINAL_CHECK_DATA)
    report['originalCheck']={**om,'savedAs':save('original-check',om,ob)}
    if ob:
        try: report['originalCheck']['json']=json.loads(text(ob))
        except Exception: report['originalCheck']['text']=text(ob)[:4000]

    tm,tb=request(TTS_DISCOVERY,TTS_DATA)
    report['ttsDiscovery']={**tm,'savedAs':save('tts-discovery',tm,tb)}
    raw=text(tb).strip() if tb else ''
    report['ttsDiscovery']['rawText']=raw[:12000]

    urls=[]
    # Follow only literal http(s) URLs present verbatim in the server response.
    for u in re.findall(r'https?://[^\s"\'<>]+',raw,re.I):
        u=u.replace('&amp;','&').rstrip(').,;')
        if u not in urls:urls.append(u)
    report['rawReturnedUrls']=urls

    for idx,u in enumerate(urls[:10],1):
        m,b=request(u)
        rec={**m,'source':'literal URL from raw newTtsView response','savedAs':save(f'raw-route-{idx:02d}',m,b),'accessGateObserved':False}
        if b and not b.startswith(b'%PDF-'):
            s=text(b)
            rec['accessGateObserved']=login_or_access_gate(s)
            rec['authoredUrls']=exact_urls(s,m.get('finalUrl') or u)[:200]
        report['followed'].append(rec)
        if b.startswith(b'%PDF-'):
            report['pdfs'].append({'sha256':digest(b),'bytes':len(b),'finalUrl':m.get('finalUrl'),'savedAs':rec['savedAs']})

    report['bodyAcquired']=bool(report['pdfs'])
    report['boundary']='PUBLIC_PDF_ACQUIRED_RENDER_REQUIRED_BEFORE_SEMANTIC_JUDGMENT' if report['pdfs'] else 'NO_PUBLIC_PDF_ACQUIRED_NO_BODY_SEMANTIC_DECISION'
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[
        f"originalCheck={report['originalCheck'].get('json', report['originalCheck'].get('text'))}",
        f"ttsRaw={raw[:1000]}",
        f"rawReturnedUrls={len(urls)}",
        f"followed={len(report['followed'])}",
        f"pdfs={len(report['pdfs'])}",
        f"boundary={report['boundary']}",
    ]
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print('\n'.join(lines))
    return 0

if __name__=='__main__':
    raise SystemExit(main())
