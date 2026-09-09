#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener

ROOT=Path('acquisition-jung-jaeheon-2012')
DISPATCH_HTML=ROOT/'riss-fulltext-dispatch-response.html'
REPORT=ROOT/'public-route-report.json'
UA='Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Jung-2012-RISS-authored-dCollection)'
TITLE_SIGNAL='가족관계 변동을 중심으로'
AUTHOR='정재헌'
EXPECTED_ITEM='000001272735'


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def allowed(url:str)->bool:
    h=(urlparse(url).hostname or '').lower()
    return h in {'www.riss.kr','riss.kr','dongbang.dcollection.net'} or h.endswith('.dcollection.net')


def decode(body:bytes,ctype='')->str:
    m=re.search(r'charset=([A-Za-z0-9._-]+)',ctype or '',re.I)
    for enc in ([m.group(1)] if m else [])+['utf-8','cp949','euc-kr']:
        try:return body.decode(enc)
        except Exception:pass
    return body.decode('utf-8',errors='replace')


def sha(body:bytes)->str:
    return hashlib.sha256(body).hexdigest()


def fetch(opener,url,referer=None,max_bytes=20_000_000):
    assert allowed(url),f'outside bounded allowlist: {url}'
    headers={'User-Agent':UA,'Accept':'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8'}
    if referer:headers['Referer']=referer
    req=Request(url,headers=headers)
    meta={'requestedUrl':url,'status':None,'location':None,'contentType':'','contentDisposition':'','bytes':0,'sha256':None,'pdfMagic':False,'error':None}
    body=b''
    try:
        with opener.open(req,timeout=35) as resp:
            body=resp.read(max_bytes+1); assert len(body)<=max_bytes
            meta.update({'status':getattr(resp,'status',None),'location':resp.headers.get('Location'),'contentType':resp.headers.get('Content-Type',''),'contentDisposition':resp.headers.get('Content-Disposition',''),'bytes':len(body),'sha256':sha(body),'pdfMagic':body.startswith(b'%PDF-')})
    except HTTPError as exc:
        body=exc.read(max_bytes+1); assert len(body)<=max_bytes
        meta.update({'status':exc.code,'location':exc.headers.get('Location'),'contentType':exc.headers.get('Content-Type',''),'contentDisposition':exc.headers.get('Content-Disposition',''),'bytes':len(body),'sha256':sha(body),'pdfMagic':body.startswith(b'%PDF-'),'error':f'HTTPError: {exc.code}'})
    return meta,body


def literals(base,text):
    out=[]
    pats=[r'''(?:href|src)\s*=\s*(["'])(.*?)\1''',r'''["'](https?://[^"']+)["']''']
    for idx,pat in enumerate(pats):
        for m in re.finditer(pat,text,re.I|re.S):
            raw=html.unescape((m.group(2) if idx==0 else m.group(1)).strip())
            if not raw or raw.lower().startswith(('javascript:','mailto:','#')):continue
            u=urljoin(base,raw)
            if allowed(u) and u not in out:out.append(u)
    return out


def interesting(u:str)->bool:
    low=u.lower()
    if any(x in low for x in ['login','signin','member','auth','purchase','payment']):return False
    return EXPECTED_ITEM in u or any(x in low for x in ['.pdf','download','viewer','view','file','fulltext','origin','orgper','orgview','dclo'])


def same_exact_item_https_redirect(source:str, location:str|None)->str|None:
    if not location:return None
    target=urljoin(source,location)
    s=urlparse(source); t=urlparse(target)
    if s.hostname != t.hostname:return None
    if t.scheme != 'https':return None
    if EXPECTED_ITEM not in target:return None
    if t.path != s.path:return None
    return target


dispatch=DISPATCH_HTML.read_text(encoding='utf-8')
report=json.loads(REPORT.read_text(encoding='utf-8'))
assert TITLE_SIGNAL in dispatch,'exact thesis title signal absent from RISS popup'

dc_match=re.search(r'''["'](https?://dongbang\.dcollection\.net/[^"']*sItemId=000001272735[^"']*)["']''',dispatch,re.I)
assert dc_match,'RISS popup did not author exact dCollection item URL'
dcollection_url=html.unescape(dc_match.group(1))
iframe_match=re.search(r'''<iframe\b[^>]*\bsrc\s*=\s*(["'])(Downloading\.do\?[^"']+)\1''',dispatch,re.I|re.S)
assert iframe_match,'RISS popup did not author exact Downloading.do iframe URL'
iframe_url=urljoin('https://www.riss.kr/search/download/FullTextDownload.do',html.unescape(iframe_match.group(2)))

ctx=ssl.create_default_context()
opener=build_opener(HTTPSHandler(context=ctx),HTTPCookieProcessor(CookieJar()),NoRedirect())
out={'rissAuthoredDcollectionUrl':dcollection_url,'rissAuthoredIframeUrl':iframe_url,'rissIframe':None,'dcollectionEntry':None,'dcollectionHttpsRedirect':None,'followedLiteralPages':[],'directPdfAcquired':False,'pdf':None,'contentDownloadExecuted':True,'guessedOpaqueIdentifierCount':0,'loginBypass':False,'institutionAuthBypass':False,'paywallBypass':False,'drmRequestExecuted':False,'decryptionActionExecuted':False,'disposition':'ROUTE_REVIEW_PENDING'}

# Inspect exact RISS-authored iframe without following redirects.
im,ib=fetch(opener,iframe_url,report['rissDispatcher']['request']['requestedUrl'])
out['rissIframe']=im
if ib and not im['pdfMagic']:
    it=decode(ib,im['contentType']); (ROOT/'riss-downloading-response.html').write_text(it,encoding='utf-8')
if im['pdfMagic']:
    (ROOT/'jung-jaeheon-2012.pdf').write_bytes(ib); out['directPdfAcquired']=True; out['pdf']={**im,'source':'RISS Downloading.do'}

# Inspect exact public dCollection item authored by RISS.
if not out['directPdfAcquired']:
    dm,db=fetch(opener,dcollection_url,report['rissDispatcher']['request']['requestedUrl'])
    out['dcollectionEntry']=dm
    # dCollection currently canonicalizes its RISS-authored HTTP item to HTTPS. Follow only this
    # same-host, same-path, same-item redirect once; do not enable generic redirect following.
    redirected=same_exact_item_https_redirect(dcollection_url,dm.get('location')) if dm.get('status') in {301,302,303,307,308} else None
    if redirected:
        rm,rb=fetch(opener,redirected,dcollection_url)
        out['dcollectionHttpsRedirect']={'from':dcollection_url,'to':redirected,'response':rm}
        dm,db=rm,rb
    if dm['pdfMagic'] or 'application/pdf' in dm['contentType'].lower():
        (ROOT/'jung-jaeheon-2012.pdf').write_bytes(db); out['directPdfAcquired']=True; out['pdf']={**dm,'source':'RISS-authored dCollection item'}
    else:
        dt=decode(db,dm['contentType']); (ROOT/'dcollection-entry.html').write_text(dt,encoding='utf-8')
        entry_base=dm['requestedUrl']
        entry_identity=(TITLE_SIGNAL in dt or AUTHOR in dt or EXPECTED_ITEM in dt)
        candidates=[u for u in literals(entry_base,dt) if interesting(u)]
        # Follow only literal same-site content-looking URLs from the exact item page, at most one level.
        for i,u in enumerate(candidates[:20],start=1):
            try:
                cm,cb=fetch(opener,u,entry_base)
                # Permit the same narrowly-scoped HTTP->HTTPS canonicalization for literal dCollection pages.
                rr=same_exact_item_https_redirect(u,cm.get('location')) if cm.get('status') in {301,302,303,307,308} else None
                if rr:
                    cm2,cb2=fetch(opener,rr,u)
                    out['followedLiteralPages'].append({**cm,'sourceUrl':u,'canonicalHttps':rr})
                    cm,cb=cm2,cb2
                rec={**cm,'sourceUrl':u}
                out['followedLiteralPages'].append(rec)
                if cm['pdfMagic'] or 'application/pdf' in cm['contentType'].lower():
                    (ROOT/'jung-jaeheon-2012.pdf').write_bytes(cb); out['directPdfAcquired']=True; out['pdf']={**cm,'source':u}; break
                ct=decode(cb,cm['contentType'])
                (ROOT/f'dcollection-follow-{i:02d}.html').write_text(ct,encoding='utf-8')
                lower=ct.lower()
                if any(x in lower for x in ['drm','fasoo','markany','softcamp']):
                    out['disposition']='DCOLLECTION_DRM_SIGNAL_OBSERVED_STOP_NO_REPLAY'; break
                if any(x in lower for x in ['로그인','login required','회원인증','기관인증']):
                    out['disposition']='DCOLLECTION_LOGIN_OR_AUTH_BOUNDARY_STOP_NO_BYPASS'; break
                # Second-level direct PDF literal only; do not replay generic viewer APIs.
                for pu in literals(cm['requestedUrl'],ct):
                    if '.pdf' not in pu.lower():continue
                    if not allowed(pu):continue
                    pm,pb=fetch(opener,pu,cm['requestedUrl'])
                    out['followedLiteralPages'].append({**pm,'sourceUrl':pu})
                    if pm['pdfMagic'] or 'application/pdf' in pm['contentType'].lower():
                        (ROOT/'jung-jaeheon-2012.pdf').write_bytes(pb); out['directPdfAcquired']=True; out['pdf']={**pm,'source':pu}; break
                if out['directPdfAcquired']:break
            except Exception as exc:
                out['followedLiteralPages'].append({'sourceUrl':u,'error':f'{type(exc).__name__}: {exc}'})
        if not entry_identity and not out['directPdfAcquired'] and out['disposition']=='ROUTE_REVIEW_PENDING':
            out['disposition']='DCOLLECTION_ITEM_FETCHED_WITHOUT_IDENTITY_BODY_SIGNAL_STOP'

if out['directPdfAcquired']:
    out['disposition']='RISS_AUTHORED_DCOLLECTION_DIRECT_PDF_ACQUIRED'
elif out['disposition']=='ROUTE_REVIEW_PENDING':
    loc=(out['rissIframe'] or {}).get('location')
    if loc:
        out['disposition']='RISS_IFRAME_REDIRECT_OBSERVED_NO_UNSAFE_FOLLOW'
    else:
        out['disposition']='RISS_AUTHORED_DCOLLECTION_ROUTE_NO_DIRECT_PDF_OBSERVED'

(ROOT/'dcollection-route-report.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
report['dcollectionRoute']=out
report['semanticDisposition']='DIRECT_PDF_ACQUIRED_REQUIRES_PAGE_COUNT_AND_BODY_REVIEW' if out['directPdfAcquired'] else 'ACCESS_BOUNDARY_PENDING_DCOLLECTION_CLASSIFICATION'
REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(out,ensure_ascii=False,indent=2))

assert out['guessedOpaqueIdentifierCount']==0
assert out['loginBypass'] is False
assert out['institutionAuthBypass'] is False
assert out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False
assert out['decryptionActionExecuted'] is False
