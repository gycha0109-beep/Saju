#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

OUT=Path('acquisition-kim-sanghan-2026-current');OUT.mkdir(exist_ok=True)
ARTI='ART003370620';AUTHOR='김상한';TITLE_SIGNAL='명리 고전 여명론';DOI='10.55793/jkhc.2026.33.631'
BASE='https://www.kci.go.kr/kciportal/'
DETAIL=f'{BASE}ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'
ORIGINAL=f'{BASE}ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}'
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/20.5; current-kci-exact-no-fallback)';MAX=45*1024*1024

class RR(HTTPRedirectHandler):
    def __init__(self):super().__init__();self.chain=[]
    def redirect_request(self,req,fp,code,msg,headers,newurl):self.chain.append({'code':code,'url':newurl});return super().redirect_request(req,fp,code,msg,headers,newurl)

def dec(b):
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')
def allowed(u):return (urlparse(u).hostname or '').lower()=='www.kci.go.kr'
def fetch(op,rr,u,ref=None,limit=3_000_000):
    assert allowed(u),u
    h={'User-Agent':UA,'Accept':'text/html,application/javascript,application/pdf,*/*;q=0.6'}
    if ref:h['Referer']=ref
    last=None
    for n in range(1,4):
        rr.chain.clear();m={'requestedUrl':u,'status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bytes':0,'sha256':None,'error':None,'attempt':n}
        try:
            with op.open(Request(u,headers=h),timeout=40) as r:
                b=r.read(limit);m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirectChain=list(rr.chain),contentType=r.headers.get('Content-Type'),bytes=len(b),sha256=hashlib.sha256(b).hexdigest());return m,b,('' if b.startswith(b'%PDF-') else dec(b))
        except Exception as e:m['error']=f'{type(e).__name__}: {e}';last=m;time.sleep(n)
    return last,b'', ''
def scripts(t,base):
    out=[]
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)',t,re.I):
        u=urljoin(base,html.unescape(raw))
        if allowed(u) and u not in out:out.append(u)
    return out[:80]
def file_ids(t):
    ids=set(re.findall(r'(KCI_FI\d+)',t))
    ids.update(re.findall(r"orteFileId\s*[=:]\s*[\"']([A-Za-z0-9_-]+)",t,re.I))
    ids.update(re.findall(r"fncDown\(\s*[\"']([^\"']+)[\"']",t,re.I))
    return sorted(x for x in ids if re.fullmatch(r'KCI_FI\d+',x))
def preview_urls(t,base):
    out=[]
    for raw in re.findall(r'(["\'])([^"\']*artiPreView\.kci[^"\']*)\1',t,re.I):
        u=urljoin(base,html.unescape(raw[1]).replace('&amp;','&'))
        if ARTI in u and allowed(u) and u not in out:out.append(u)
    return out[:10]
def main():
    jar=CookieJar();rr=RR();op=build_opener(HTTPCookieProcessor(jar),rr)
    dm,db,dt=fetch(op,rr,DETAIL);assert dm['status']==200 and AUTHOR in dt and TITLE_SIGNAL in dt
    om,ob,ot=fetch(op,rr,ORIGINAL,DETAIL);assert om['status']==200
    union=dt+'\n'+ot
    script_meta=[]
    for u in scripts(dt,dm.get('finalUrl') or DETAIL)+scripts(ot,om.get('finalUrl') or ORIGINAL):
        if any(x.get('requestedUrl')==u for x in script_meta):continue
        sm,sb,st=fetch(op,rr,u,DETAIL,limit=2_000_000);script_meta.append(sm)
        if st:union+='\n'+st
    ids=file_ids(union)
    backend_literal='ciSereArtiOrteServHistIFrame.kci'
    backend_observed=backend_literal in union
    previews=preview_urls(union,om.get('finalUrl') or ORIGINAL)
    rep={'purpose':'strict current KCI exact-body probe; no guessed/fallback file id','candidate':{'author':AUTHOR,'kci':ARTI,'doi':DOI},'detail':dm,'originalView':om,'scriptFetches':script_meta,'htmlDiscoveredOrteFileIds':ids,'backendContractObserved':backend_observed,'previewUrlsObserved':previews,'contentAttempts':[],'pdfs':[],'guessedOpaqueIdentifierCount':0,'fallbackOrteFileIdsTried':[],'contentActionExecuted':False,'fullLengthPdfAcquired':False}
    # Only current HTML/static-JS-discovered ids are admissible. No deterministic fallback.
    if ids and backend_observed:
        for fid in ids:
            u=f'{BASE}ci/sereArticleSearch/ciSereArtiOrteServHistIFrame.kci?sereArticleSearchBean.artiId={ARTI}&sereArticleSearchBean.orteFileId={fid}'
            mm,b,t=fetch(op,rr,u,DETAIL,limit=MAX);mm['orteFileId']=fid;mm['origin']='current-html-or-static-js-discovered';mm['startsPdf']=b.startswith(b'%PDF-');rep['contentAttempts'].append(mm);rep['contentActionExecuted']=True
            if b.startswith(b'%PDF-') or 'pdf' in (mm.get('contentType') or '').lower():
                p=OUT/f'current-kci-{fid}.pdf';p.write_bytes(b);rep['pdfs'].append({'orteFileId':fid,'file':p.name,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b),'sourceUrl':mm.get('finalUrl')})
            elif t:
                mm['boundedBodySample']=re.sub(r'\s+',' ',t).strip()[:4000]
    # Public article-specific preview is inspected only when its exact URL is present in current site sources.
    rep['previewAttempts']=[]
    for idx,u in enumerate(previews[:3]):
        mm,b,t=fetch(op,rr,u,DETAIL,limit=MAX);mm['startsPdf']=b.startswith(b'%PDF-');rep['previewAttempts'].append(mm)
        if b.startswith(b'%PDF-') or 'pdf' in (mm.get('contentType') or '').lower():
            p=OUT/f'current-kci-preview-{idx}.pdf';p.write_bytes(b);rep['pdfs'].append({'orteFileId':None,'file':p.name,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b),'sourceUrl':mm.get('finalUrl'),'previewOnly':True})
    rep['fullLengthPdfAcquired']=any((not p.get('previewOnly')) and p['bytes']>500_000 for p in rep['pdfs'])
    (OUT/'current-kci-exact.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'htmlDiscoveredOrteFileIds':ids,'backendContractObserved':backend_observed,'previewUrlsObserved':previews,'contentAttempts':rep['contentAttempts'],'pdfs':rep['pdfs'],'fullLengthPdfAcquired':rep['fullLengthPdfAcquired'],'guessedOpaqueIdentifierCount':0,'fallbackOrteFileIdsTried':[]},ensure_ascii=False,indent=2))
    assert rep['guessedOpaqueIdentifierCount']==0 and rep['fallbackOrteFileIdsTried']==[]
    return 0
if __name__=='__main__':raise SystemExit(main())
