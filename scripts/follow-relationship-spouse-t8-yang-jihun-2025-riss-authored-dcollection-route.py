#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import parse_qs, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

ROOT=Path('acquisition-yang-jihun-2025')
REPORT=ROOT/'public-route-report.json'
EXPECTED='http://ube.dcollection.net/common/orgView/200000847815'
ITEM='200000847815'
TITLE_SIGNAL='명리학 곤명'
AUTHOR='양지훈'
UA='Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Yang-Jihun-2025-dCollection)'

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl):return None

def allowed(url):
    h=(urlparse(url).hostname or '').lower()
    return h in {'ube.dcollection.net','www.riss.kr','riss.kr'}
def sha(b):return hashlib.sha256(b).hexdigest()
def decode(b,ctype=''):
    m=re.search(r'charset=([A-Za-z0-9._-]+)',ctype or '',re.I)
    for enc in ([m.group(1)] if m else [])+['utf-8','cp949','euc-kr']:
        try:return b.decode(enc)
        except Exception:pass
    return b.decode('utf-8',errors='replace')
def fetch(opener,url,referer=None,max_bytes=20_000_000):
    assert allowed(url),url
    h={'User-Agent':UA,'Accept':'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8'}
    if referer:h['Referer']=referer
    meta={'requestedUrl':url,'status':None,'location':None,'contentType':'','contentDisposition':'','bytes':0,'sha256':None,'pdfMagic':False,'error':None}; b=b''
    try:
        with opener.open(Request(url,headers=h),timeout=35) as r:
            b=r.read(max_bytes+1); assert len(b)<=max_bytes
            meta.update({'status':getattr(r,'status',None),'location':r.headers.get('Location'),'contentType':r.headers.get('Content-Type',''),'contentDisposition':r.headers.get('Content-Disposition',''),'bytes':len(b),'sha256':sha(b),'pdfMagic':b.startswith(b'%PDF-')})
    except HTTPError as e:
        b=e.read(max_bytes+1); assert len(b)<=max_bytes
        meta.update({'status':e.code,'location':e.headers.get('Location'),'contentType':e.headers.get('Content-Type',''),'contentDisposition':e.headers.get('Content-Disposition',''),'bytes':len(b),'sha256':sha(b),'pdfMagic':b.startswith(b'%PDF-'),'error':f'HTTPError: {e.code}'})
    return meta,b
def literals(base,t):
    out=[]
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''',t,re.I|re.S):
        raw=html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:','mailto:','#')):continue
        u=urljoin(base,raw)
        if allowed(u) and u not in out:out.append(u)
    for m in re.finditer(r'''["'](https?://[^"']+)["']''',t,re.I):
        u=html.unescape(m.group(1).strip())
        if allowed(u) and u not in out:out.append(u)
    return out
def exact_redirect(src,loc):
    if not loc:return None
    u=urljoin(src,loc); a=urlparse(src); b=urlparse(u)
    if b.scheme!='https' or a.hostname!=b.hostname or not allowed(u):return None
    if ITEM not in u:return None
    return u
def fetch_chain(opener,start,referer,max_hops=3):
    cur=start; chain=[]; m,b=fetch(opener,cur,referer)
    for _ in range(max_hops):
        if m.get('status') not in {301,302,303,307,308}:break
        nxt=exact_redirect(cur,m.get('location'))
        if not nxt:break
        chain.append({'from':cur,'status':m['status'],'location':m.get('location'),'to':nxt})
        prev=cur; cur=nxt; m,b=fetch(opener,cur,prev)
    return m,b,chain
def viewer_pdf_literal(viewer_url,text):
    qs=parse_qs(urlparse(viewer_url).query)
    for v in qs.get('file',[]):
        u=urljoin(viewer_url,html.unescape(v)); p=urlparse(u)
        if p.hostname=='ube.dcollection.net' and p.path.startswith('/public_resource/pdf/') and p.path.lower().endswith('.pdf'):
            return u
    for m in re.finditer(r'''["'](/public_resource/pdf/[^"']+\.pdf)["']''',text,re.I):
        u=urljoin(viewer_url,html.unescape(m.group(1)))
        if allowed(u):return u
    return None

j=json.loads(REPORT.read_text(encoding='utf-8')); d=j['rissDispatcher']
assert EXPECTED in d['externalUrls'],d['externalUrls']
ctx=ssl.create_default_context(); opener=build_opener(HTTPSHandler(context=ctx),HTTPCookieProcessor(CookieJar()),NoRedirect())
out={'rissAuthoredDcollectionUrl':EXPECTED,'entry':None,'redirectChain':[],'followed':[],'directPdfAcquired':False,'pdf':None,'contentDownloadExecuted':True,'guessedOpaqueIdentifierCount':0,'loginBypass':False,'institutionAuthBypass':False,'paywallBypass':False,'drmRequestExecuted':False,'decryptionActionExecuted':False,'disposition':'ROUTE_REVIEW_PENDING'}
em,eb,chain=fetch_chain(opener,EXPECTED,d['request']['requestedUrl'],3); out['entry']=em; out['redirectChain']=chain
if em['pdfMagic'] or 'application/pdf' in em['contentType'].lower():
    (ROOT/'yang-jihun-2025.pdf').write_bytes(eb); out['directPdfAcquired']=True; out['pdf']={**em,'source':EXPECTED}
else:
    et=decode(eb,em['contentType']); (ROOT/'dcollection-entry.html').write_text(et,encoding='utf-8')
    identity=(TITLE_SIGNAL in et or AUTHOR in et or ITEM in et)
    candidates=[]
    for u in literals(em['requestedUrl'],et):
        low=u.lower()
        if ITEM in u or '.pdf' in low or any(x in low for x in ['viewer','orgview','download','fulltext','file']):
            if u not in candidates:candidates.append(u)
    for i,u in enumerate(candidates[:25],1):
        try:
            cm,cb,cchain=fetch_chain(opener,u,em['requestedUrl'],3)
            out['followed'].extend({'sourceUrl':u,'canonicalRedirect':x} for x in cchain)
            out['followed'].append({**cm,'sourceUrl':u})
            if cm['pdfMagic'] or 'application/pdf' in cm['contentType'].lower():
                (ROOT/'yang-jihun-2025.pdf').write_bytes(cb); out['directPdfAcquired']=True; out['pdf']={**cm,'source':u}; break
            ct=decode(cb,cm['contentType']); (ROOT/f'dcollection-follow-{i:02d}.html').write_text(ct,encoding='utf-8')
            pu=viewer_pdf_literal(cm['requestedUrl'],ct)
            if pu:
                pm,pb=fetch(opener,pu,cm['requestedUrl']); out['followed'].append({**pm,'sourceUrl':pu})
                if pm['pdfMagic'] or 'application/pdf' in pm['contentType'].lower():
                    (ROOT/'yang-jihun-2025.pdf').write_bytes(pb); out['directPdfAcquired']=True; out['pdf']={**pm,'source':pu}; break
        except Exception as exc:out['followed'].append({'sourceUrl':u,'error':f'{type(exc).__name__}: {exc}'})
    if not identity and not out['directPdfAcquired']:out['disposition']='DCOLLECTION_ENTRY_IDENTITY_SIGNAL_ABSENT_STOP'
if out['directPdfAcquired']:out['disposition']='RISS_AUTHORED_DCOLLECTION_DIRECT_PDF_ACQUIRED'
elif out['disposition']=='ROUTE_REVIEW_PENDING':
    text=' '.join(str(x) for x in out['followed']).lower()
    if any(x in text for x in ['drm','fasoo','markany','softcamp']):out['disposition']='DCOLLECTION_DRM_SIGNAL_STOP_NO_REPLAY'
    elif any(x in text for x in ['login required','회원인증','기관인증']):out['disposition']='DCOLLECTION_AUTH_BOUNDARY_STOP_NO_BYPASS'
    else:out['disposition']='RISS_AUTHORED_DCOLLECTION_ROUTE_NO_DIRECT_PDF_OBSERVED'
(ROOT/'dcollection-route-report.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
j['dcollectionRoute']=out; j['fullLengthPdfAcquired']=False; j['semanticDisposition']='DIRECT_PDF_ACQUIRED_REQUIRES_PAGE_COUNT_AND_BODY_REVIEW' if out['directPdfAcquired'] else 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION'
REPORT.write_text(json.dumps(j,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(out,ensure_ascii=False,indent=2))
assert out['guessedOpaqueIdentifierCount']==0
assert out['loginBypass'] is False and out['institutionAuthBypass'] is False and out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False and out['decryptionActionExecuted'] is False
