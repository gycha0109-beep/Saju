#!/usr/bin/env python3
from __future__ import annotations

import hashlib
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
LOD = 'https://data.riss.kr/resource/Thesis/000016939654'
RISS = 'https://www.riss.kr/link?id=T16939654'
OUT = Path('acquisition-shin-jaeeok-2024')
PRIVATE = Path('acquisition-shin-jaeeok-2024-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/9.0; public-resource-verification)'
MAX = 45 * 1024 * 1024
KEYWORDS = (
    '배우자','부부','남편','아내','처','妻','夫','혼인','결혼',
    '남명','여명','재성','관성','정재','편재','정관','편관',
    '육친궁','육친성','배우자궁','일지','日支','성별','남녀'
)

class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append((code,newurl))
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url: str, limit: int = MAX) -> tuple[dict, bytes]:
    rd=Redirects(); opener=build_opener(rd)
    meta={'requestedUrl':url,'status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bytes':0,'sha256':None,'error':None}
    try:
        req=Request(url,headers={'User-Agent':UA,'Accept':'text/html,application/ld+json,application/rdf+xml,application/pdf,*/*;q=0.5'})
        with opener.open(req,timeout=30) as r:
            body=r.read(limit)
            meta.update({'status':getattr(r,'status',None),'finalUrl':r.geturl(),'redirectChain':rd.chain,'contentType':r.headers.get('Content-Type'),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest()})
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


def is_pdf(meta: dict, body: bytes) -> bool:
    return body.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower()


def extract_urls(text: str) -> list[str]:
    vals=re.findall(r'https?://[^\s"\'<>]+',text)
    return sorted(set(v.replace('&amp;','&').rstrip(').,;') for v in vals))


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
        n=rec['pageCount']
        targets=[]
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


def main() -> int:
    report={'purpose':'public RISS/dCollection thesis acquisition only; no login/paywall/auth bypass','candidate':{'author':AUTHOR,'year':2024,'title':TITLE,'rissId':RISS_ID},'initial':[],'discoveredUcis':[],'discoveredDcollectionUrls':[],'orgViewProbes':[],'pdf':None,'fullLengthPdfAcquired':False}
    bodies=[]
    for u in (LOD,RISS):
        m,b=fetch(u); report['initial'].append(m); bodies.append((m.get('finalUrl') or u,b))
    text='\n'.join(decode(b) for _,b in bodies if b)
    report['discoveredUcis']=sorted(set(re.findall(r'I804:[0-9]+-[0-9]+',text)))
    all_urls=extract_urls(text)
    dc=[u for u in all_urls if 'dcollection.net' in u.lower()]
    report['discoveredDcollectionUrls']=dc

    hosts=sorted(set((urlparse(u).scheme or 'https',urlparse(u).netloc) for u in dc if urlparse(u).netloc.endswith('dcollection.net')))
    items=set()
    for u in report['discoveredUcis']:
        if '-' in u: items.add(u.rsplit('-',1)[-1])
    for u in dc:
        mm=re.search(r'/(?:srchDetail|orgView)/([0-9A-Za-z_-]+)',u)
        if mm: items.add(mm.group(1))

    # Known institutional host fallback is bounded to Kongju National University's dCollection family only.
    for host in ('kongju.dcollection.net','knu.dcollection.net'):
        if not any(h==host for _,h in hosts): hosts.append(('https',host))

    for scheme,host in hosts:
        for item in sorted(items):
            u=f'{scheme}://{host}/common/orgView/{item}'
            m,b=fetch(u)
            rec=dict(m); rec['item']=item; rec['host']=host
            if is_pdf(m,b):
                PRIVATE.joinpath('shin-jaeeok-2024.pdf').write_bytes(b)
                report['pdf']=inspect_pdf(b,m.get('finalUrl') or u); report['orgViewProbes'].append(rec); break
            txt=decode(b) if b else ''
            rec['signals']=[x for x in extract_urls(txt) if 'dcollection' in x.lower() or '.pdf' in x.lower()][:30]
            report['orgViewProbes'].append(rec)
            for pu in extract_urls(txt):
                if not ('.pdf' in pu.lower() or 'public_resource' in pu.lower()): continue
                pm,pb=fetch(pu)
                if is_pdf(pm,pb):
                    PRIVATE.joinpath('shin-jaeeok-2024.pdf').write_bytes(pb)
                    report['pdf']=inspect_pdf(pb,pm.get('finalUrl') or pu); break
            if report['pdf']: break
        if report['pdf']: break

    report['fullLengthPdfAcquired']=bool(report['pdf'] and report['pdf'].get('pageCount',0) >= 60)
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'candidate':report['candidate'],'discoveredUcis':report['discoveredUcis'],'discoveredDcollectionUrls':report['discoveredDcollectionUrls'],'pdf':report['pdf'],'fullLengthPdfAcquired':report['fullLengthPdfAcquired']},ensure_ascii=False,indent=2))
    return 0

if __name__=='__main__':
    raise SystemExit(main())
