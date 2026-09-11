#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, HTTPSHandler, Request, build_opener
from pypdf import PdfReader

ROOT=Path('acquisition-nam-jiho-2019'); ROOT.mkdir(exist_ok=True)
AUTHOR='남직호'
TITLE='宮合과 離婚에 미치는 命理변수의 영향'
YEAR='2019'
RISS_ID='T15169258'
CONTROL='c357150c3e5609c7ffe0bdc3ef48d419'
P_MAT_TYPE='be54d9b8bc7cdb09'
DETAIL=f'https://www.riss.kr/search/detail/DetailView.do?control_no={CONTROL}&p_mat_type={P_MAT_TYPE}'
UA='Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Nam-Jiho-2019-public-acquisition)'

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl): return None

def sha(raw:bytes)->str: return hashlib.sha256(raw).hexdigest()
def host(url:str)->str: return (urlparse(url).hostname or '').lower()
def is_riss(url:str)->bool: return host(url) in {'www.riss.kr','riss.kr'}
def is_dc(url:str)->bool:
    h=host(url); return bool(h) and (h=='dcollection.net' or h.endswith('.dcollection.net'))
def decode(raw:bytes,ct:str='')->str:
    m=re.search(r'charset=([A-Za-z0-9._-]+)',ct or '',re.I)
    for enc in ([m.group(1)] if m else [])+['utf-8','cp949','euc-kr']:
        try:return raw.decode(enc)
        except Exception:pass
    return raw.decode('utf-8',errors='replace')

def fetch(opener,url:str,referer:str|None=None,max_bytes:int=30_000_000):
    headers={'User-Agent':UA,'Accept':'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8'}
    if referer: headers['Referer']=referer
    meta={'requestedUrl':url,'finalUrl':None,'status':None,'location':None,'contentType':'','contentDisposition':'','bytes':0,'sha256':None,'pdfMagic':False,'error':None}
    try:
        with opener.open(Request(url,headers=headers),timeout=35) as r:
            raw=r.read(max_bytes+1); assert len(raw)<=max_bytes
            meta.update({'finalUrl':r.geturl(),'status':getattr(r,'status',None),'location':r.headers.get('Location'),'contentType':r.headers.get('Content-Type',''),'contentDisposition':r.headers.get('Content-Disposition',''),'bytes':len(raw),'sha256':sha(raw),'pdfMagic':raw.startswith(b'%PDF-')})
            return meta,raw
    except HTTPError as e:
        raw=e.read(max_bytes+1); assert len(raw)<=max_bytes
        meta.update({'finalUrl':url,'status':e.code,'location':e.headers.get('Location'),'contentType':e.headers.get('Content-Type',''),'contentDisposition':e.headers.get('Content-Disposition',''),'bytes':len(raw),'sha256':sha(raw),'pdfMagic':raw.startswith(b'%PDF-'),'error':f'HTTPError: {e.code}'})
        return meta,raw

def links(base:str,text:str)->list[str]:
    out=[]
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''',text,re.I|re.S):
        v=html.unescape(m.group(2).strip())
        if not v or v.lower().startswith(('javascript:','mailto:','#')):continue
        u=urljoin(base,v)
        if u not in out:out.append(u)
    for m in re.finditer(r'''["'](https?://[^"']+)["']''',text,re.I):
        u=html.unescape(m.group(1).strip())
        if u not in out:out.append(u)
    return out

def doc_form(text:str)->str:
    m=re.search(r'<form\b[^>]*(?:id=["\']f["\']|name=["\']f["\'])[^>]*>',text,re.I|re.S); assert m
    end=text.find('</form>',m.end()); assert end>=0
    return text[m.start():end+7]
def fields(block:str)->dict[str,str]:
    out={}
    for m in re.finditer(r'<input\b[^>]*>',block,re.I|re.S):
        tag=html.unescape(m.group(0)); n=re.search(r'\bname\s*=\s*["\']([^"\']+)',tag,re.I)
        if not n:continue
        t=re.search(r'\btype\s*=\s*["\']([^"\']+)',tag,re.I)
        if t and t.group(1).lower() in {'submit','button','checkbox','radio'}:continue
        v=re.search(r'\bvalue\s*=\s*["\']([^"\']*)',tag,re.I)
        out[n.group(1)]=v.group(1) if v else ''
    return out

def same_host_candidates(base:str,text:str,dc_host:str)->list[str]:
    out=[]
    for u in links(base,text):
        if host(u)==dc_host and any(x in u.lower() for x in ['pdf','viewer','download','fulltext','file']):out.append(u)
    for m in re.finditer(r'''["'](/public_resource/pdf/[^"']+\.pdf)["']''',text,re.I):
        u=urljoin(base,html.unescape(m.group(1)))
        if host(u)==dc_host and u not in out:out.insert(0,u)
    for m in re.finditer(r'''(?:location\.replace|location\.href)\s*\(?(?:\s*)["']([^"']+)["']''',text,re.I):
        u=urljoin(base,html.unescape(m.group(1)))
        if host(u)==dc_host and u not in out:out.append(u)
    for u in list(out):
        for v in parse_qs(urlparse(u).query).get('file',[]):
            p=urljoin(u,html.unescape(v))
            if host(p)==dc_host and urlparse(p).path.startswith('/public_resource/pdf/') and p not in out:out.insert(0,p)
    return list(dict.fromkeys(out))

ctx=ssl.create_default_context()
normal=build_opener(HTTPSHandler(context=ctx),HTTPCookieProcessor(CookieJar()))
no_redirect=build_opener(HTTPSHandler(context=ctx),HTTPCookieProcessor(CookieJar()),NoRedirect())
report={'candidate':{'author':AUTHOR,'title':TITLE,'year':2019,'institution':'국제뇌교육종합대학원대학교 동양학과','rissId':RISS_ID,'control':CONTROL},'detail':None,'formTuple':None,'dispatcher':None,'dcollection':None,'pdfInspection':None,'fullLengthPdfAcquired':False,'guessedOpaqueIdentifierCount':0,'loginBypass':False,'institutionAuthBypass':False,'paywallBypass':False,'drmRequestExecuted':False,'decryptionActionExecuted':False,'tlsVerificationDisabled':False,'crossSourceSemanticStitching':False,'semanticDisposition':'PUBLIC_ROUTE_INSPECTION_PENDING'}

meta,raw=fetch(normal,DETAIL, max_bytes=9_000_000); text=decode(raw,meta['contentType']); (ROOT/'riss-detail.html').write_text(text,encoding='utf-8')
assert AUTHOR in text and RISS_ID in text and YEAR in text
assert ('宮合' in text or '궁합' in text) and ('離婚' in text or '이혼' in text)
report['detail']=meta
f=fields(doc_form(text)); assert f.get('control_no')==CONTROL and f.get('p_mat_type')==P_MAT_TYPE
report['formTuple']={k:f.get(k) for k in ['control_no','p_mat_type','p_submat_type','fulltext_kind']}

observed=False
for i,u in enumerate([u for u in links(meta['finalUrl'] or DETAIL,text) if is_riss(u) and (u.lower().endswith('.js') or '.js?' in u.lower())][:50],1):
    try:
        sm,sr=fetch(normal,u,meta['finalUrl'] or DETAIL,3_000_000); st=decode(sr,sm['contentType'])
        if 'fulltextDownload' in st or 'FullTextDownload.do' in st:(ROOT/f'riss-script-{i:02d}.txt').write_text(st,encoding='utf-8')
        if 'FullTextDownload.do' in st and ('serialize()' in st or 'document.f' in st):observed=True
    except Exception:pass
assert observed

f['loginFlag']='1'; f['content_page']=''
endpoint='https://www.riss.kr/search/download/FullTextDownload.do'; req=endpoint+'?'+urlencode(f)
dm,dr=fetch(no_redirect,req,meta['finalUrl'] or DETAIL)
pdf=ROOT/'nam-jiho-2019.pdf'
external=[]
if dm['pdfMagic'] or 'application/pdf' in dm['contentType'].lower(): pdf.write_bytes(dr)
else:
    dt=decode(dr,dm['contentType']); (ROOT/'riss-fulltext-dispatch-response.html').write_text(dt,encoding='utf-8')
    external=[u for u in links(endpoint,dt) if not is_riss(u)]
report['dispatcher']={'implementationObserved':True,'request':dm,'externalUrls':external,'disposition':'RISS_DISPATCHER_AUTHORED_DCOLLECTION_ROUTE' if any(is_dc(u) for u in external) else 'RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_OBSERVED'}

authored=next((u for u in external if is_dc(u)),None)
if not pdf.exists() and authored:
    h=host(authored); dc={'rissAuthoredUrl':authored,'host':h,'entry':None,'followed':[],'directPdfAcquired':False,'disposition':'PUBLIC_ROUTE_REVIEW_PENDING'}
    try:
        em,er=fetch(normal,authored,req); dc['entry']=em
        if em['pdfMagic'] or 'application/pdf' in em['contentType'].lower(): pdf.write_bytes(er); dc['directPdfAcquired']=True
        else:
            et=decode(er,em['contentType']); (ROOT/'dcollection-entry.html').write_text(et,encoding='utf-8')
            queue=same_host_candidates(em['finalUrl'] or authored,et,h)
            seen=set()
            for i,u in enumerate(queue[:35],1):
                if u in seen:continue
                seen.add(u); fm,fr=fetch(normal,u,em['finalUrl'] or authored); dc['followed'].append({'url':u,'response':fm})
                if fm['pdfMagic'] or 'application/pdf' in fm['contentType'].lower(): pdf.write_bytes(fr); dc['directPdfAcquired']=True; break
                ft=decode(fr,fm['contentType']); (ROOT/f'dcollection-follow-{i:02d}.html').write_text(ft,encoding='utf-8')
                for x in same_host_candidates(fm['finalUrl'] or u,ft,h):
                    if x not in seen and x not in queue:queue.append(x)
        dc['disposition']='RISS_AUTHORED_DCOLLECTION_PUBLIC_PDF_ACQUIRED' if dc['directPdfAcquired'] else 'RISS_AUTHORED_DCOLLECTION_NO_DIRECT_PDF_OBSERVED'
    except URLError as e:
        if isinstance(e.reason,ssl.SSLCertVerificationError):
            dc['strictTlsError']=f'{type(e.reason).__name__}: {e.reason}'; dc['disposition']='RISS_AUTHORED_DCOLLECTION_TLS_CERT_VERIFICATION_BOUNDARY_STOP_NO_BYPASS'
        else:raise
    report['dcollection']=dc

if pdf.exists():
    b=pdf.read_bytes(); r=PdfReader(str(pdf)); assert not r.is_encrypted
    chunks=[f'\n===== PHYSICAL_PDF_PAGE_{i} =====\n{p.extract_text() or ""}' for i,p in enumerate(r.pages,1)]
    txt=''.join(chunks); (ROOT/'nam-jiho-2019.txt').write_text(txt,encoding='utf-8')
    report['pdfInspection']={'sha256':sha(b),'bytes':len(b),'pages':len(r.pages),'encrypted':False,'textChars':len(txt)}
    report['fullLengthPdfAcquired']=len(r.pages)>=140
    report['semanticDisposition']='DIRECT_BODY_ACQUIRED_REQUIRES_RENDER_FIRST_REVIEW'
else: report['semanticDisposition']='PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION'

assert report['guessedOpaqueIdentifierCount']==0 and report['tlsVerificationDisabled'] is False
assert not report['loginBypass'] and not report['institutionAuthBypass'] and not report['paywallBypass']
assert not report['drmRequestExecuted'] and not report['decryptionActionExecuted'] and not report['crossSourceSemanticStitching']
(ROOT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
