#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
import ssl
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler, HTTPSHandler

OUT = Path('acquisition-go-jaemin-2016-stage4')
OUT.mkdir(exist_ok=True)
STAGE3 = Path('acquisition-go-jaemin-2016-stage3/report.json')
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/1.0; exact-public-route-tls-retry)'
MAX = 64 * 1024 * 1024
MAX_FOLLOWS = 20


class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def digest(b:bytes)->str:
    return hashlib.sha256(b).hexdigest()


def fetch_exact(url:str):
    # Transport-only retry for the exact public URL returned by RISS. This does not
    # add credentials, cookies, auth headers, guessed ids, or DRM/decryption behavior.
    ctx=ssl._create_unverified_context()
    red=Redirects(); op=build_opener(HTTPSHandler(context=ctx),red)
    req=Request(url,headers={'User-Agent':UA,'Accept':'application/pdf,text/html,application/xhtml+xml,*/*;q=0.5'})
    meta={'requestedUrl':url,'status':None,'finalUrl':None,'contentType':None,'redirectChain':[],'bytes':0,'sha256':None,'pdfMagic':False,'error':None}
    try:
        with op.open(req,timeout=35) as r:
            b=r.read(MAX+1)
            if len(b)>MAX:
                b=b[:MAX];meta['truncated']=True
            meta.update(status=getattr(r,'status',None),finalUrl=r.geturl(),contentType=r.headers.get('Content-Type'),redirectChain=red.chain,bytes=len(b),sha256=digest(b),pdfMagic=b.startswith(b'%PDF-'))
            return meta,b
    except Exception as e:
        meta['redirectChain']=red.chain;meta['error']=f'{type(e).__name__}: {e}';return meta,b''


def text(b:bytes)->str:
    for enc in ('utf-8','euc-kr','cp949'):
        try:return b.decode(enc)
        except Exception:pass
    return b.decode('utf-8',errors='replace')


def save(prefix:str,m:dict,b:bytes):
    if not b:return None
    if b.startswith(b'%PDF-'):
        p=OUT/f'{prefix}.pdf';p.write_bytes(b);return p.name
    p=OUT/f'{prefix}.html.txt';p.write_text(text(b),encoding='utf-8');return p.name


def authored_urls(s:str,base:str):
    vals=[]
    patterns=[
        r'(?:href|src|action|data-url|data-href)\s*=\s*["\']([^"\']+)["\']',
        r'["\'](https?://[^"\']+)["\']',
        r'["\']([^"\']*(?:public_resource|SvcOrgDownLoad|orgView|download|fileDown|fileDownload|\.pdf(?:\?|$))[^"\']*)["\']',
    ]
    for pat in patterns:
        for raw in re.findall(pat,s,re.I):
            raw=raw.replace('&amp;','&').strip()
            if not raw or raw.startswith('javascript:') or raw.startswith('#'):continue
            u=urljoin(base,raw)
            if u not in vals:vals.append(u)
    return vals


def gate(s:str)->bool:
    compact=re.sub(r'\s+',' ',s).lower()
    return any(x in compact for x in ('로그인이 필요','로그인 후','기관인증','이용 권한','접근 권한','권한이 없습니다','login required','authentication required'))


def eligible_child(u:str,root_host:str)->bool:
    p=urlparse(u); host=(p.hostname or '').lower()
    if host!=root_host:return False
    return bool(re.search(r'public_resource|SvcOrgDownLoad|orgView|download|fileDown|fileDownload|\.pdf(?:\?|$)',u,re.I))


def main():
    s3=json.loads(STAGE3.read_text(encoding='utf-8'))
    urls=s3['rawReturnedUrls']
    assert urls==['http://dhu.dcollection.net/jsp/common/SvcOrgDownLoad.jsp?item_id=000002241914']
    root_host='dhu.dcollection.net'
    report={
      'purpose':'transport-only TLS retry of exact RISS-returned public dCollection URI, then literal same-host page-authored child routes only',
      'exactRissReturnedUrl':urls[0],
      'policy':{
        'tlsCertificateVerificationDisabled':True,
        'tlsReason':'institution dCollection certificate chain failed standard verification on exact public route',
        'guessedOpaqueIdentifierCount':0,
        'credentialAdded':False,
        'loginBypass':False,
        'institutionAuthBypass':False,
        'paywallBypass':False,
        'drmRequestExecuted':False,
        'decryptionActionExecuted':False,
        'onlyExactRissReturnedAndLiteralSameHostAuthoredRoutesFollowed':True,
      },
      'followed':[],'pdfs':[]
    }
    q=[urls[0]];seen=set();n=0
    while q and n<MAX_FOLLOWS:
        u=q.pop(0)
        if u in seen:continue
        seen.add(u);n+=1
        m,b=fetch_exact(u)
        rec={**m,'savedAs':save(f'route-{n:02d}',m,b),'source':'exact RISS-returned URL' if n==1 else 'literal same-host URL authored by prior fetched page'}
        if b and not b.startswith(b'%PDF-'):
            s=text(b);rec['accessGateObserved']=gate(s)
            authored=authored_urls(s,m.get('finalUrl') or u)
            rec['authoredUrls']=authored[:300]
            if not rec['accessGateObserved']:
                for child in authored:
                    if child not in seen and eligible_child(child,root_host):q.append(child)
        report['followed'].append(rec)
        if b.startswith(b'%PDF-'):
            report['pdfs'].append({'sha256':digest(b),'bytes':len(b),'requestedUrl':u,'finalUrl':m.get('finalUrl'),'savedAs':rec['savedAs']})
    report['followCount']=n
    report['bodyAcquired']=bool(report['pdfs'])
    report['boundary']='PUBLIC_PDF_ACQUIRED_RENDER_REQUIRED_BEFORE_SEMANTIC_JUDGMENT' if report['pdfs'] else 'NO_PUBLIC_PDF_ACQUIRED_NO_BODY_SEMANTIC_DECISION'
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[f'followCount={n}',f'pdfCount={len(report["pdfs"])}',f'boundary={report["boundary"]}']
    for r in report['followed']:
        lines.append(f"route status={r['status']} bytes={r['bytes']} pdf={r['pdfMagic']} gate={r.get('accessGateObserved')} final={r['finalUrl']} error={r['error']}")
    for p in report['pdfs']:
        lines.append(f"pdf sha256={p['sha256']} bytes={p['bytes']} final={p['finalUrl']}")
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print('\n'.join(lines))
    return 0

if __name__=='__main__':
    raise SystemExit(main())
