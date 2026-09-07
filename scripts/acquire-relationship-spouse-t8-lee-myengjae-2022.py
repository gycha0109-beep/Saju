#!/usr/bin/env python3
from __future__ import annotations

import hashlib, io, json, re
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request, build_opener, HTTPRedirectHandler

import pymupdf
from pypdf import PdfReader

OUT = Path('acquisition-lee-myengjae-2022'); OUT.mkdir(exist_ok=True)
PRIVATE = Path('acquisition-lee-myengjae-2022-private'); PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/6.1; public-resource-verification)'
MAX = 35 * 1024 * 1024
ARTI = 'ART002833924'
TITLE = '자평명리학의 육친론 고찰'
DOI = '10.35955/JCH.2022.04.80.273'
KEYWORDS = ('배우자','부부','남편','아내','처','妻','夫','배우자궁','부처궁','夫妻','남명','여명','건명','곤명','남녀','재성','관성','육친')

class RD(HTTPRedirectHandler):
    def __init__(self): super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)

def fetch(url, referer=None):
    rd=RD(); op=build_opener(rd)
    h={'User-Agent':UA,'Accept':'text/html,application/pdf,*/*;q=0.7'}
    if referer: h['Referer']=referer
    meta={'requestedUrl':url,'status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bytes':0,'sha256':None,'error':None}
    try:
        with op.open(Request(url,headers=h),timeout=40) as r:
            b=r.read(MAX)
            meta.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirectChain=rd.chain,contentType=r.headers.get('Content-Type'),bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
            return meta,b
    except Exception as e:
        meta['redirectChain']=rd.chain; meta['error']=f'{type(e).__name__}: {e}'
        return meta,b''

def dec(b):
    for enc in ('utf-8','euc-kr','cp949'):
        try:return b.decode(enc)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')

def is_pdf(meta,b): return b.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower()

def candidate_links(text, base):
    out=set()
    for x in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']', text, re.I):
        u=urljoin(base,x.replace('&amp;','&'))
        if any(k in u.lower() for k in ('pdf','preview','download','orterview','artipreview','file','original')):
            out.add(u)
    for x in re.findall(r'https?://[^\s"\'<>]+', text):
        if any(k in x.lower() for k in ('pdf','preview','download','file')): out.add(x.rstrip(').,;'))
    return sorted(out)

def inspect_pdf(b, label):
    result={'pageCount':0,'encrypted':None,'hits':[],'textSamples':[],'rendered':[],'error':None}
    try:
        reader=PdfReader(io.BytesIO(b)); result['pageCount']=len(reader.pages); result['encrypted']=bool(reader.is_encrypted)
        hit_pages=[]
        for i,page in enumerate(reader.pages,1):
            text=(page.extract_text() or '').replace('\x00',' ')
            compact=' / '.join(x.strip() for x in text.splitlines() if x.strip())
            if i <= 3:
                result['textSamples'].append({'physicalPdfPage':i,'sample':compact[:4000]})
            lines=[x.strip() for x in text.splitlines() if x.strip()]
            snippets=[]
            for n,line in enumerate(lines):
                if any(k in line for k in KEYWORDS):
                    lo=max(0,n-2); hi=min(len(lines),n+3)
                    snippets.append(' / '.join(lines[lo:hi])[:2200])
            if snippets:
                result['hits'].append({'physicalPdfPage':i,'snippets':snippets[:14]}); hit_pages.append(i)
        doc=pymupdf.open(stream=b,filetype='pdf')
        try:
            targets=[]
            if doc.page_count <= 3:
                targets.extend(range(1, doc.page_count + 1))
            for i in hit_pages:
                for p in (i-1,i,i+1):
                    if 1 <= p <= doc.page_count and p not in targets: targets.append(p)
            targets=targets[:14]
            for p in targets:
                pix=doc.load_page(p-1).get_pixmap(matrix=pymupdf.Matrix(1.65,1.65),alpha=False)
                f=OUT/f'rendered-{label}-p{p:03d}.png'; pix.save(f)
                result['rendered'].append({'physicalPdfPage':p,'file':f.name,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size})
        finally: doc.close()
    except Exception as e:
        result['error']=f'{type(e).__name__}: {e}'
    return result

def main():
    base='https://www.kci.go.kr/kciportal/'
    roots=[
      f'{base}landing/article.kci?arti_id={ARTI}',
      f'{base}ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}',
      f'{base}ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}',
      f'{base}ci/sereArticleSearch/artiPreView.kci?sereArticleSearchBean.artiId={ARTI}&v=2019',
      f'https://doi.org/{DOI}',
    ]
    report={'purpose':'public fulltext acquisition only; no login/paywall/auth bypass','candidate':{'author':'이명재','year':2022,'title':TITLE,'kciArticleId':ARTI,'doi':DOI},'probes':[],'pdfs':[]}
    queue=[('root',u,None) for u in roots]; seen=set()
    while queue and len(seen)<80:
        origin,u,ref=queue.pop(0)
        if u in seen: continue
        seen.add(u); m,b=fetch(u,ref); m['origin']=origin; m['directPdf']=is_pdf(m,b)
        if m['directPdf']:
            candidate_no=len(report['pdfs'])+1
            label=f'candidate-{candidate_no:02d}'
            p=PRIVATE/f'{label}.pdf'; p.write_bytes(b)
            ins=inspect_pdf(b,label)
            rec={'origin':origin,'sourceUrl':m.get('finalUrl') or u,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b),'savedAs':p.name,**ins}
            report['pdfs'].append(rec); m['savedAs']=p.name
        elif b:
            text=dec(b); m['containsTitle']=TITLE in text; m['containsArticleId']=ARTI in text; links=candidate_links(text,m.get('finalUrl') or u); m['candidateLinkCount']=len(links); m['candidateLinks']=links[:80]
            for link in links[:40]: queue.append((f'html:{origin}',link,m.get('finalUrl') or u))
        report['probes'].append(m)
    report['directPdfAcquired']=bool(report['pdfs'])
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[f'directPdfAcquired={report["directPdfAcquired"]}',f'candidate={report["candidate"]}']
    for p in report['pdfs']:
        lines.append(f'PDF sha={p["sha256"]} bytes={p["bytes"]} pages={p["pageCount"]} encrypted={p["encrypted"]} origin={p["origin"]} url={p["sourceUrl"]}')
        lines.append(f'TEXT_SAMPLES={p["textSamples"]}')
        lines.append(f'RENDERED={p["rendered"]}')
        for hit in p['hits']:
            lines.append(f'PAGE {hit["physicalPdfPage"]}: ' + ' || '.join(hit['snippets'][:8]))
    for m in report['probes']:
        if m.get('directPdf') or m.get('containsTitle') or m.get('error'):
            lines.append(f'PROBE origin={m["origin"]} status={m["status"]} type={m["contentType"]} bytes={m["bytes"]} pdf={m.get("directPdf")} title={m.get("containsTitle")} final={m["finalUrl"]} err={m["error"]}')
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8'); print('\n'.join(lines)); return 0

if __name__=='__main__': raise SystemExit(main())
