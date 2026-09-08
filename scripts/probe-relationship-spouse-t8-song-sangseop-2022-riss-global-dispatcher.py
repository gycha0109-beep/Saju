#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT=Path('acquisition-song-sangseop-2022'); OUT.mkdir(exist_ok=True)
SEARCH='https://www.riss.kr/search/Search.do?colName=bib_t&isDetailSearch=Y&queryText=znCreator%2C%EC%86%A1%EC%83%81%EC%84%AD&searchGubun=true'
DETAIL='https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=6188af0cf49b0838ffe0bdc3ef48d419&keyword='
CONTROL='6188af0cf49b0838ffe0bdc3ef48d419'
MAT='be54d9b8bc7cdb09'; SUB='b51fa0b5ced94fec'; KIND='a8cb3aaead67ab5b'
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/22.4; current-global-dispatcher-observation)'
MAX=12*1024*1024

GLOBAL_PATTERNS={
 'functionDeclaration':r'function\s+fulltextDownload\s*\([^)]*\)',
 'varFunction':r'(?:var|let|const)\s+fulltextDownload\s*=\s*function\s*\([^)]*\)',
 'plainFunctionAssignment':r'(?<![:.\w])fulltextDownload\s*=\s*function\s*\([^)]*\)',
 'windowFunctionAssignment':r'window(?:\.fulltextDownload|\[["\']fulltextDownload["\']\])\s*=\s*function\s*\([^)]*\)',
 'arrowAssignment':r'(?:(?:var|let|const)\s+|window\.)?fulltextDownload\s*=\s*\([^)]*\)\s*=>',
}
WRAPPER_PATTERN=r'(?<![\w.])fulltextDownload\s*:\s*function\s*\([^)]*\)'
ROUTE_PATTERNS=(r'/search/download/FullTextDownload\.do',r'redirectURL',r'document\.f',r'\.submit\s*\(')

def dec(b):
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')
def compact(s,n=7000): return re.sub(r'\s+',' ',html.unescape(s)).strip()[:n]
def fetch(op,u,ref=None):
    h={'User-Agent':UA,'Accept':'text/html,application/javascript,*/*;q=0.5'}
    if ref:h['Referer']=ref
    m={'requestedUrl':u,'status':None,'finalUrl':None,'contentType':None,'bytes':0,'sha256':None,'error':None}
    try:
        with op.open(Request(u,headers=h),timeout=35) as r:
            b=r.read(MAX);m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),contentType=r.headers.get('Content-Type'),bytes=len(b),sha256=hashlib.sha256(b).hexdigest());return m,b,dec(b)
    except Exception as e:m['error']=f'{type(e).__name__}: {e}';return m,b'', ''
def form_f(t):
    m=re.search(r'<form\b[^>]*(?:id|name)=["\']f["\'][^>]*>.*?</form>',t,re.I|re.S);return m.group(0) if m else ''
def fields(block):
    d={}
    for tag in re.findall(r'<input\b[^>]*>',block,re.I|re.S):
        nm=re.search(r'\bname\s*=\s*["\']([^"\']+)',tag,re.I); val=re.search(r'\bvalue\s*=\s*["\']([^"\']*)',tag,re.I)
        if nm and nm.group(1) not in d:d[nm.group(1)]=html.unescape(val.group(1) if val else '')
    return d
def clips(source,text,pattern,kind,cap=12):
    out=[]
    for m in re.finditer(pattern,text,re.I|re.S):
        out.append({'source':source,'kind':kind,'match':compact(m.group(0),800),'context':compact(text[max(0,m.start()-1100):min(len(text),m.start()+5200)],6300)})
        if len(out)>=cap:break
    return out

def main():
    op=build_opener(HTTPCookieProcessor(CookieJar()))
    pages=[]; script_urls=[]; source_texts=[]
    for u in (SEARCH,DETAIL):
        m,b,t=fetch(op,u);assert m['status']==200
        pages.append({'url':u,'meta':m,'formFields':fields(form_f(t))})
        source_texts.append((m.get('finalUrl') or u,t))
        for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)',t,re.I):
            su=urljoin(m.get('finalUrl') or u,html.unescape(raw))
            if su not in script_urls:script_urls.append(su)
    sources=[]
    for su,st in source_texts:
        sources.append((su,st,{'status':200,'page':True}))
    for su in script_urls[:220]:
        sm,sb,st=fetch(op,su,DETAIL)
        if sb:sources.append((sm.get('finalUrl') or su,st,sm))

    global_defs=[]; wrappers=[]; route_contexts=[]
    for su,st,meta in sources:
        for kind,pat in GLOBAL_PATTERNS.items():global_defs.extend(clips(su,st,pat,kind))
        wrappers.extend(clips(su,st,WRAPPER_PATTERN,'ButtonSetOrObjectWrapper'))
        for pat in ROUTE_PATTERNS:route_contexts.extend(clips(su,st,pat,'routeSignal',cap=5))

    search_fields=pages[0]['formFields']; detail_fields=pages[1]['formFields']
    assert CONTROL in source_texts[0][1] and CONTROL in source_texts[1][1]
    assert search_fields.get('redirectURL')=='/search/download/FullTextDownload.do'
    assert search_fields.get('control_no','')==''
    assert detail_fields.get('control_no')==CONTROL
    assert detail_fields.get('p_mat_type')==MAT and detail_fields.get('p_submat_type')==SUB and detail_fields.get('fulltext_kind')==KIND
    exact_call=bool(re.search(r"ButtonSet\.fulltextDownload\(\s*'6188af0cf49b0838ffe0bdc3ef48d419'\s*,\s*'be54d9b8bc7cdb09'\s*,\s*'b51fa0b5ced94fec'\s*,\s*'a8cb3aaead67ab5b'",source_texts[0][1],re.I))
    rep={
      'purpose':'current search+detail+static-script union inspection for the global RISS fulltext dispatcher; no content request',
      'target':{'rissId':'T16377357','controlNo':CONTROL,'pMatType':MAT,'pSubmatType':SUB,'fulltextKind':KIND},
      'pages':pages,'scriptUrls':script_urls,'sourceCount':len(sources),
      'exactTargetButtonSetCallObserved':exact_call,
      'searchFormRedirectURL':search_fields.get('redirectURL'),
      'buttonSetWrapperFound':bool(wrappers),'buttonSetWrappers':wrappers[:16],
      'globalFulltextFunctionFound':bool(global_defs),'globalFulltextDefinitions':global_defs[:16],
      'routeContexts':route_contexts[:40],
      'guessedOpaqueIdentifierCount':0,'contentDownloadExecuted':False,
    }
    (OUT/'riss-global-dispatcher.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({k:rep[k] for k in ('target','exactTargetButtonSetCallObserved','searchFormRedirectURL','buttonSetWrapperFound','globalFulltextFunctionFound','globalFulltextDefinitions','guessedOpaqueIdentifierCount','contentDownloadExecuted')},ensure_ascii=False,indent=2))
    assert exact_call and rep['buttonSetWrapperFound']
    assert rep['guessedOpaqueIdentifierCount']==0 and rep['contentDownloadExecuted'] is False

if __name__=='__main__':main()
