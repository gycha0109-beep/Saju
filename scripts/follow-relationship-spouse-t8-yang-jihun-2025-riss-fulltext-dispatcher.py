#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

ROOT=Path('acquisition-yang-jihun-2025')
DETAIL=ROOT/'riss-detail.html'; REPORT=ROOT/'public-route-report.json'
EXPECTED={'control_no':'a0a78b8578ab695effe0bdc3ef48d419','p_mat_type':'be54d9b8bc7cdb09','p_submat_type':'f1a8c7a1de0e08b8','fulltext_kind':'a8cb3aaead67ab5b'}
UA='Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Yang-Jihun-2025-RISS-dispatch)'
class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl):return None

def sha(b):return hashlib.sha256(b).hexdigest()
def decode(b,ctype=''):
    m=re.search(r'charset=([A-Za-z0-9._-]+)',ctype or '',re.I)
    for enc in ([m.group(1)] if m else [])+['utf-8','cp949','euc-kr']:
        try:return b.decode(enc)
        except Exception:pass
    return b.decode('utf-8',errors='replace')
def form_block(t):
    m=re.search(r'<form\b[^>]*(?:id=["\']f["\']|name=["\']f["\'])[^>]*>',t,re.I|re.S); assert m
    e=t.find('</form>',m.end()); assert e>=0
    return t[m.start():e+7]
def fields(block):
    out={}
    for m in re.finditer(r'<input\b[^>]*>',block,re.I|re.S):
        tag=html.unescape(m.group(0)); nm=re.search(r'\bname\s*=\s*["\']([^"\']+)',tag,re.I)
        if not nm:continue
        typ=re.search(r'\btype\s*=\s*["\']([^"\']+)',tag,re.I)
        if typ and typ.group(1).lower() in {'submit','button','checkbox','radio'}:continue
        vm=re.search(r'\bvalue\s*=\s*["\']([^"\']*)',tag,re.I)
        out[nm.group(1)]=vm.group(1) if vm else ''
    return out
def urls(base,t):
    out=[]
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''',t,re.I|re.S):
        raw=html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:','mailto:','#')):continue
        u=urljoin(base,raw)
        if u not in out:out.append(u)
    for m in re.finditer(r'''["'](https?://[^"']+)["']''',t,re.I):
        u=html.unescape(m.group(1).strip())
        if u not in out:out.append(u)
    return out

t=DETAIL.read_text(encoding='utf-8'); j=json.loads(REPORT.read_text(encoding='utf-8'))
static=j['rissStaticInspection']; assert static['siteAuthoredDispatcherImplementationObserved'] is True
impl_ok=False
for p in ROOT.glob('riss-script-*.txt'):
    s=p.read_text(encoding='utf-8',errors='replace')
    if 'function fulltextDownload()' in s and '/search/download/FullTextDownload.do?' in s and 'jQuery(form).serialize()' in s:
        impl_ok=True; break
assert impl_ok
f=fields(form_block(t))
for k,v in EXPECTED.items():assert f.get(k)==v,(k,f.get(k))
f['loginFlag']='1'; f['content_page']=''
endpoint='https://www.riss.kr/search/download/FullTextDownload.do'
request_url=endpoint+'?'+urlencode(f)
ctx=ssl.create_default_context(); opener=build_opener(HTTPSHandler(context=ctx),HTTPCookieProcessor(CookieJar()),NoRedirect())
req=Request(request_url,headers={'User-Agent':UA,'Referer':j['detail']['finalUrl'],'Accept':'text/html,application/pdf,*/*;q=0.8'})
meta={'requestedUrl':request_url,'status':None,'location':None,'contentType':'','contentDisposition':'','bytes':0,'sha256':None,'pdfMagic':False,'error':None}; b=b''
try:
    with opener.open(req,timeout=35) as r:
        b=r.read(20_000_001); assert len(b)<=20_000_000
        meta.update({'status':getattr(r,'status',None),'location':r.headers.get('Location'),'contentType':r.headers.get('Content-Type',''),'contentDisposition':r.headers.get('Content-Disposition',''),'bytes':len(b),'sha256':sha(b),'pdfMagic':b.startswith(b'%PDF-')})
except HTTPError as e:
    b=e.read(20_000_001); assert len(b)<=20_000_000
    meta.update({'status':e.code,'location':e.headers.get('Location'),'contentType':e.headers.get('Content-Type',''),'contentDisposition':e.headers.get('Content-Disposition',''),'bytes':len(b),'sha256':sha(b),'pdfMagic':b.startswith(b'%PDF-'),'error':f'HTTPError: {e.code}'})
out={'dispatcherImplementationObserved':True,'serializedFormFields':f,'request':meta,'literalUrls':[],'sameOriginPdfUrls':[],'externalUrls':[],'directPdfAcquired':False,'contentDownloadExecuted':True,'guessedOpaqueIdentifierCount':0,'loginBypass':False,'institutionAuthBypass':False,'paywallBypass':False,'drmRequestExecuted':False,'decryptionActionExecuted':False,'disposition':'RESPONSE_REVIEW_REQUIRED'}
if meta['pdfMagic'] or 'application/pdf' in meta['contentType'].lower():
    (ROOT/'yang-jihun-2025.pdf').write_bytes(b); out['directPdfAcquired']=True; out['disposition']='RISS_DISPATCHER_DIRECT_PDF_ACQUIRED'
else:
    rt=decode(b,meta['contentType']); (ROOT/'riss-fulltext-dispatch-response.html').write_text(rt,encoding='utf-8')
    us=urls(endpoint,rt); out['literalUrls']=us[:150]
    for u in us:
        host=(urlparse(u).hostname or '').lower(); low=u.lower()
        if host in {'www.riss.kr','riss.kr'} and '.pdf' in low:out['sameOriginPdfUrls'].append(u)
        elif host and host not in {'www.riss.kr','riss.kr'}:out['externalUrls'].append(u)
    if meta['location']:out['disposition']='RISS_DISPATCHER_REDIRECT_OBSERVED_NO_FOLLOW_PENDING_REVIEW'
    elif any('dcollection' in (urlparse(u).hostname or '').lower() for u in out['externalUrls']):out['disposition']='RISS_DISPATCHER_AUTHORED_DCOLLECTION_ROUTE_PENDING_SAFE_FOLLOW'
    elif out['sameOriginPdfUrls']:out['disposition']='RISS_DISPATCHER_AUTHORED_PDF_LITERAL_PENDING_SAFE_FETCH'
    elif any(x in rt.lower() for x in ['drm','fasoo','markany','softcamp']):out['disposition']='RISS_DISPATCHER_DRM_SIGNAL_STOP_NO_REPLAY'
    elif any(x in rt.lower() for x in ['로그인','login required','회원인증','기관인증']):out['disposition']='RISS_DISPATCHER_LOGIN_OR_AUTH_BOUNDARY_STOP_NO_BYPASS'
    else:out['disposition']='RISS_DISPATCHER_NO_DIRECT_BODY_ROUTE_OBSERVED'
(ROOT/'riss-dispatcher-report.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
j['rissDispatcher']=out; j['contentDownloadExecuted']=True; j['semanticDisposition']='DIRECT_PDF_ACQUIRED_REQUIRES_BODY_REVIEW' if out['directPdfAcquired'] else 'ACCESS_OR_ROUTE_CLASSIFICATION_PENDING'
REPORT.write_text(json.dumps(j,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(out,ensure_ascii=False,indent=2))
assert out['guessedOpaqueIdentifierCount']==0
assert out['loginBypass'] is False and out['institutionAuthBypass'] is False and out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False and out['decryptionActionExecuted'] is False
