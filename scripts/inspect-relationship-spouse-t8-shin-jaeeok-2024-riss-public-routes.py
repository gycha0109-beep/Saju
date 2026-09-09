#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

ROOT=Path('acquisition-shin-jaeeok-2024')
REPORT=ROOT/'report.json'
AUTHOR='신재억'
TITLE_SIGNAL='命理學 六親論 宮'
EXPECTED_CONTROL='49df877f9b4f8a08ffe0bdc3ef48d419'
EXPECTED_MAT='be54d9b8bc7cdb09'
EXPECTED_SUBMAT='f1a8c7a1de0e08b8'
EXPECTED_KIND='a8cb3aaead67ab5b'
UA='Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Shin-Jaeeok-2024-public-routes)'

ctx=ssl.create_default_context()
opener=build_opener(HTTPSHandler(context=ctx),HTTPCookieProcessor(CookieJar()))


def sha(b:bytes)->str:return hashlib.sha256(b).hexdigest()
def decode(b:bytes,ctype='')->str:
    m=re.search(r'charset=([A-Za-z0-9._-]+)',ctype or '',re.I)
    for enc in ([m.group(1)] if m else [])+['utf-8','cp949','euc-kr']:
        try:return b.decode(enc)
        except Exception:pass
    return b.decode('utf-8',errors='replace')
def fetch(url:str,referer=None,timeout=30,max_bytes=5_000_000):
    assert (urlparse(url).hostname or '').lower() in {'www.riss.kr','riss.kr'}
    h={'User-Agent':UA,'Accept':'text/html,application/xhtml+xml,application/json,*/*;q=0.8'}
    if referer:h['Referer']=referer
    with opener.open(Request(url,headers=h),timeout=timeout) as resp:
        b=resp.read(max_bytes+1); assert len(b)<=max_bytes
        return {'requestedUrl':url,'finalUrl':resp.geturl(),'status':getattr(resp,'status',None),'contentType':resp.headers.get('Content-Type',''),'bytes':len(b),'sha256':sha(b)},b
def links(base,text):
    out=[]
    for m in re.finditer(r'''(?:href|src)\s*=\s*(["'])(.*?)\1''',text,re.I|re.S):
        raw=html.unescape(m.group(2).strip())
        if not raw or raw.lower().startswith(('javascript:','mailto:','#')):continue
        u=urljoin(base,raw)
        if u not in out:out.append(u)
    return out
def first(patterns,text):
    for p in patterns:
        m=re.search(p,text,re.I|re.S)
        if m:return html.unescape(m.group(1)).strip()
    return None
def document_f(text):
    m=re.search(r'<form\b[^>]*(?:id=["\']f["\']|name=["\']f["\'])[^>]*>',text,re.I|re.S); assert m,'document.f not found'
    e=text.find('</form>',m.end()); assert e>=0
    return text[m.start():e+7]
def hidden_fields(block):
    out={}
    for m in re.finditer(r'<input\b[^>]*>',block,re.I|re.S):
        tag=html.unescape(m.group(0)); nm=re.search(r'\bname\s*=\s*["\']([^"\']+)',tag,re.I)
        if not nm:continue
        vm=re.search(r'\bvalue\s*=\s*["\']([^"\']*)',tag,re.I)
        out[nm.group(1)]=vm.group(1) if vm else ''
    return out

j=json.loads(REPORT.read_text(encoding='utf-8'))
row=j.get('resolvedExactRow') or {}
assert row.get('control')==EXPECTED_CONTROL,row
assert row.get('identityObserved') is True,row
url=row['detailUrl']
m,b=fetch(url)
t=decode(b,m['contentType']); (ROOT/'riss-detail.html').write_text(t,encoding='utf-8')
assert AUTHOR in t and TITLE_SIGNAL in t and '2024' in t
assert 'T16939654' in t and 'I804:44004-000000033581' in t
assert 'fulltextDownload();' in t

f=hidden_fields(document_f(t))
form_tuple={k:f.get(k) for k in ['control_no','p_mat_type','p_submat_type','fulltext_kind']}
assert form_tuple=={'control_no':EXPECTED_CONTROL,'p_mat_type':EXPECTED_MAT,'p_submat_type':EXPECTED_SUBMAT,'fulltext_kind':EXPECTED_KIND},form_tuple

doc_control=first([r'id=["\']controlNo["\'][^>]*value=["\'](\d+)',r'value=["\'](\d+)["\'][^>]*id=["\']controlNo["\']'],t)
national=f.get('nationalLibraryLocalBibno','') or None
assert doc_control=='16939654',doc_control

script_urls=[]
for u in links(m['finalUrl'],t):
    h=(urlparse(u).hostname or '').lower()
    if h in {'www.riss.kr','riss.kr'} and (u.lower().endswith('.js') or '.js?' in u.lower()) and u not in script_urls:script_urls.append(u)
union=t; fetches=[]; impl=[]
for i,u in enumerate(script_urls[:45],1):
    try:
        sm,sb=fetch(u,m['finalUrl'],20,3_000_000); st=decode(sb,sm['contentType']); union+='\n'+st
        fetches.append({**sm,'sourceUrl':u,'error':None})
        if 'fulltextDownload' in st or 'originalCheck' in st:
            fn=ROOT/f'riss-script-{i:02d}.txt'; fn.write_text(st,encoding='utf-8'); impl.append(fn.name)
    except Exception as exc:fetches.append({'sourceUrl':u,'error':f'{type(exc).__name__}: {exc}'})

global_defs=len(re.findall(r'(?:function\s+fulltextDownload\s*\(|\bfulltextDownload\s*[:=]\s*function\s*\()',union,re.I))
site_dispatch=('function fulltextDownload()' in union and '/search/download/FullTextDownload.do?' in union and 'jQuery(form).serialize()' in union)
original=('originalCheck.do' in union and 'controlNo' in union and 'docType' in union)
out={
 'candidate':j['candidate'],
 'exactRow':{'control':EXPECTED_CONTROL,'rissId':'T16939654','uci':'I804:44004-000000033581','formTuple':form_tuple},
 'detail':{**m,'docControlNo':doc_control,'nationalLibraryLocalBibno':national},
 'rissStaticInspection':{'referencedScriptCount':len(script_urls),'scriptFetches':fetches,'globalFulltextDownloadDefinitionCount':global_defs,'siteAuthoredDispatcherImplementationObserved':site_dispatch,'originalCheckContractObserved':original,'materialScriptFiles':impl},
 'fullLengthPdfAcquired':False,'contentDownloadExecuted':False,'guessedOpaqueIdentifierCount':0,'loginBypass':False,'institutionAuthBypass':False,'paywallBypass':False,'drmRequestExecuted':False,'decryptionActionExecuted':False,'crossSourceSemanticStitching':False,'semanticDisposition':'RISS_EXACT_DISPATCHER_READY_FOR_SINGLE_REPLAY' if site_dispatch else 'NO_SITE_AUTHORED_DISPATCHER_STOP'
}
(ROOT/'public-route-report.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(out,ensure_ascii=False,indent=2))
assert out['guessedOpaqueIdentifierCount']==0 and out['contentDownloadExecuted'] is False
assert out['loginBypass'] is False and out['institutionAuthBypass'] is False and out['paywallBypass'] is False
assert out['drmRequestExecuted'] is False and out['decryptionActionExecuted'] is False
