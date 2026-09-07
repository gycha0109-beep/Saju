#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import io
import json
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

import pymupdf
from pypdf import PdfReader

TITLE = '命理學 六親論 宮‧星의 변화 사례 硏究'
AUTHOR = '신재억'
RISS_ID = 'T16939654'
UCI = 'I804:44004-000000033581'
ITEM_ID = '000000033581'
LOD = 'https://data.riss.kr/resource/Thesis/000016939654'
RISS = 'https://www.riss.kr/link?id=T16939654'
OUT = Path('acquisition-shin-jaeeok-2024')
PRIVATE = Path('acquisition-shin-jaeeok-2024-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/9.1; public-resource-verification)'
MAX = 45 * 1024 * 1024
KEYWORDS = (
    '배우자','부부','남편','아내','처','妻','夫','혼인','결혼',
    '남명','여명','재성','관성','정재','편재','정관','편관',
    '육친궁','육친성','배우자궁','일지','日支','성별','남녀'
)
ROUTE_NEEDLES = (UCI, ITEM_ID, '원문보기', '원문', 'dcollection', 'orgView', 'srchDetail', 'fullText', 'pdf', 'identifier', 'relation')
ACCESS_MARKERS = ('로그인','기관인증','소속기관','구매','결제','유료','password','signin','login')
# Bounded institution-specific candidates only. No unrelated university host is probed.
KONGJU_BASES = (
    'https://kongju.dcollection.net',
    'https://dcollection.kongju.ac.kr',
    'https://dc.kongju.ac.kr',
)

class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append((code,newurl))
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url: str, limit: int = MAX, referer: str | None = None) -> tuple[dict, bytes]:
    rd=Redirects(); opener=build_opener(rd)
    headers={'User-Agent':UA,'Accept':'text/html,application/ld+json,application/rdf+xml,application/pdf,*/*;q=0.5'}
    if referer: headers['Referer']=referer
    meta={'requestedUrl':url,'status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'contentDisposition':None,'bytes':0,'sha256':None,'error':None}
    try:
        req=Request(url,headers=headers)
        with opener.open(req,timeout=30) as r:
            body=r.read(limit)
            meta.update({
                'status':getattr(r,'status',None),
                'finalUrl':r.geturl(),
                'redirectChain':rd.chain,
                'contentType':r.headers.get('Content-Type'),
                'contentDisposition':r.headers.get('Content-Disposition'),
                'bytes':len(body),
                'sha256':hashlib.sha256(body).hexdigest(),
            })
            return meta,body
    except Exception as e:
        meta['redirectChain']=rd.chain
        meta['error']=f'{type(e).__name__}: {e}'
        return meta,b''


def decode(body: bytes) -> str:
    for enc in ('utf-8','euc-kr','cp949'):
        try: return body.decode(enc)
        except UnicodeDecodeError: pass
    return body.decode('utf-8',errors='replace')


def compact(text: str, limit: int = 4500) -> str:
    return re.sub(r'\s+',' ',html.unescape(text)).strip()[:limit]


def contexts(text: str, needles=ROUTE_NEEDLES, limit: int = 24) -> list[dict]:
    out=[]; low=text.lower()
    for needle in needles:
        start=0
        while len(out)<limit:
            idx=low.find(needle.lower(),start)
            if idx<0: break
            out.append({'needle':needle,'context':compact(text[max(0,idx-1200):min(len(text),idx+2400)],3600)})
            start=idx+len(needle)
    return out


def is_pdf(meta: dict, body: bytes) -> bool:
    return body.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower()


def extract_urls(text: str, base: str | None = None) -> list[str]:
    # Normalize common escaped URL forms before extraction.
    normalized=html.unescape(text).replace('\\/','/')
    vals=re.findall(r'https?://[^\s"\'<>]+',normalized)
    if base:
        for raw in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']',normalized,re.I):
            vals.append(urljoin(base,raw))
    return sorted(set(v.rstrip(').,;') for v in vals))


def inspect_pdf(body: bytes, url: str) -> dict:
    rec={'url':url,'sha256':hashlib.sha256(body).hexdigest(),'bytes':len(body),'pageCount':0,'encrypted':None,'textHealthy':False,'keywordHits':[],'renderedPages':[],'error':None}
    try:
        reader=PdfReader(io.BytesIO(body))
        rec['pageCount']=len(reader.pages)
        rec['encrypted']=bool(reader.is_encrypted)
        korean=0; hit_pages=[]
        for i,p in enumerate(reader.pages,1):
            txt=(p.extract_text() or '').replace('\x00',' ')
            korean += len(re.findall(r'[가-힣]',txt))
            lines=[x.strip() for x in txt.splitlines() if x.strip()]
            snippets=[]
            for n,line in enumerate(lines):
                if any(k in line for k in KEYWORDS):
                    lo=max(0,n-2); hi=min(len(lines),n+3)
                    snippets.append(' / '.join(lines[lo:hi])[:1600])
            if snippets:
                hit_pages.append(i)
                rec['keywordHits'].append({'physicalPdfPage':i,'snippets':snippets[:12]})
        rec['textHealthy']=korean >= 300
        n=rec['pageCount']; targets=[]
        if rec['textHealthy'] and hit_pages:
            for p in hit_pages:
                for q in (p-1,p,p+1):
                    if 1 <= q <= n and q not in targets: targets.append(q)
            targets=targets[:24]
        else:
            targets=sorted({p for p in (1,2,3,26,31,39,45,52,60,68,71,n) if 1 <= p <= n})
        doc=pymupdf.open(stream=body,filetype='pdf')
        try:
            for p in targets:
                pix=doc.load_page(p-1).get_pixmap(matrix=pymupdf.Matrix(1.25,1.25),alpha=False)
                f=OUT/f'rendered-p{p:03d}.png'; pix.save(f)
                rec['renderedPages'].append({'physicalPdfPage':p,'file':f.name,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size})
        finally:
            doc.close()
    except Exception as e:
        rec['error']=f'{type(e).__name__}: {e}'
    return rec


def maybe_take_pdf(report: dict, meta: dict, body: bytes, label: str) -> bool:
    if not is_pdf(meta,body): return False
    p=PRIVATE/f'{label}.pdf'; p.write_bytes(body)
    report['pdf']=inspect_pdf(body,meta.get('finalUrl') or meta.get('requestedUrl') or label)
    return True


def main() -> int:
    report={
        'purpose':'public RISS/Kongju dCollection thesis acquisition only; no login/paywall/auth bypass',
        'candidate':{'author':AUTHOR,'year':2024,'title':TITLE,'rissId':RISS_ID,'uci':UCI,'itemId':ITEM_ID},
        'initial':[], 'initialSignals':[], 'discoveredUcis':[], 'discoveredUrls':[],
        'candidateRouteProbes':[], 'pdf':None, 'fullLengthPdfAcquired':False,
    }
    bodies=[]
    for label,u in (('lod',LOD),('riss',RISS)):
        m,b=fetch(u); report['initial'].append({'label':label,**m}); txt=decode(b) if b else ''
        report['initialSignals'].append({'label':label,'signals':contexts(txt)})
        bodies.append((m.get('finalUrl') or u,txt))
    joined='\n'.join(t for _,t in bodies)
    report['discoveredUcis']=sorted(set(re.findall(r'I804:[0-9]+-[0-9]+',joined)))
    report['discoveredUrls']=extract_urls(joined)

    # Exact UCI from RISS is required before institution route probing.
    if UCI not in report['discoveredUcis']:
        (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
        print(json.dumps(report,ensure_ascii=False,indent=2)); return 0

    # First include any Kongju/dCollection route that RISS itself exposed.
    route_candidates=[]
    for u in report['discoveredUrls']:
        ul=u.lower()
        if ('dcollection' in ul or 'kongju' in ul) and ITEM_ID in u:
            route_candidates.append(u)

    # Then bounded exact institution/item route shapes used by dCollection deployments.
    for base in KONGJU_BASES:
        for path in (
            f'/common/orgView/{ITEM_ID}',
            f'/srch/srchDetail/{ITEM_ID}',
            f'/srch/srchDetailView/{ITEM_ID}',
        ):
            route_candidates.append(base+path)
    route_candidates=list(dict.fromkeys(route_candidates))[:18]

    for idx,u in enumerate(route_candidates,1):
        m,b=fetch(u,referer=RISS); rec={'label':f'route-{idx:02d}',**m}
        if maybe_take_pdf(report,m,b,f'route-{idx:02d}'):
            report['candidateRouteProbes'].append(rec); break
        txt=decode(b) if b else ''
        low=txt.lower()
        rec['accessControlObserved']=any(x.lower() in low for x in ACCESS_MARKERS)
        rec['signals']=contexts(txt)
        rec['bodySample']=compact(txt,2600) if txt else None
        urls=extract_urls(txt,m.get('finalUrl') or u)
        rec['exposedUrls']=[x for x in urls if ITEM_ID in x or 'public_resource' in x.lower() or '.pdf' in x.lower()][:30]
        report['candidateRouteProbes'].append(rec)
        if rec['accessControlObserved']:
            continue
        for j,pu in enumerate(rec['exposedUrls'][:8],1):
            pm,pb=fetch(pu,referer=m.get('finalUrl') or u)
            # Do not follow an auth/purchase route even if hidden behind a generic link.
            if any(x in (pm.get('finalUrl') or '').lower() for x in ('login','signin','purchase','payment','auth')):
                continue
            if maybe_take_pdf(report,pm,pb,f'route-{idx:02d}-link-{j:02d}'):
                break
        if report['pdf']: break

    report['fullLengthPdfAcquired']=bool(report['pdf'] and report['pdf'].get('pageCount',0) >= 60)
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({
        'candidate':report['candidate'],
        'discoveredUcis':report['discoveredUcis'],
        'initialSignals':report['initialSignals'],
        'candidateRouteProbes':report['candidateRouteProbes'],
        'pdf':report['pdf'],
        'fullLengthPdfAcquired':report['fullLengthPdfAcquired'],
    },ensure_ascii=False,indent=2))
    return 0

if __name__=='__main__':
    raise SystemExit(main())
