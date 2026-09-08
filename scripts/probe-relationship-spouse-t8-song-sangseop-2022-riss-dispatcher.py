#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin
from urllib.request import HTTPCookieProcessor, Request, build_opener

OUT = Path('acquisition-song-sangseop-2022'); OUT.mkdir(exist_ok=True)
DETAIL = 'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=6188af0cf49b0838ffe0bdc3ef48d419&keyword='
CONTROL_NO = '6188af0cf49b0838ffe0bdc3ef48d419'
P_MAT_TYPE = 'be54d9b8bc7cdb09'
P_SUBMAT_TYPE = 'b51fa0b5ced94fec'
FULLTEXT_KIND = 'a8cb3aaead67ab5b'
DOC_CONTROL_NO = '16377357'
DOC_TYPE = 'T'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/22.2; public-resource-verification)'
MAX = 12 * 1024 * 1024


def dec(b: bytes) -> str:
    for e in ('utf-8','euc-kr','cp949'):
        try: return b.decode(e)
        except UnicodeDecodeError: pass
    return b.decode('utf-8', errors='replace')


def compact(s: str, lim: int = 12000) -> str:
    return re.sub(r'\s+',' ',html.unescape(s)).strip()[:lim]


def fetch(opener, url: str, data: bytes | None = None, referer: str | None = None):
    h={'User-Agent':UA,'Accept':'text/html,application/javascript,application/json,*/*;q=0.5'}
    if referer: h['Referer']=referer
    if data is not None:
        h['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
        h['X-Requested-With']='XMLHttpRequest'
    m={'requestedUrl':url,'method':'POST' if data is not None else 'GET','status':None,'finalUrl':None,'contentType':None,'bytes':0,'sha256':None,'error':None}
    try:
        with opener.open(Request(url,data=data,headers=h),timeout=35) as r:
            b=r.read(MAX); m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),contentType=r.headers.get('Content-Type'),bytes=len(b),sha256=hashlib.sha256(b).hexdigest()); return m,b
    except Exception as e:
        m['error']=f'{type(e).__name__}: {e}'; return m,b''


def hidden(text: str, key: str) -> str | None:
    for tag in re.findall(r'<input\b[^>]*>',text,re.I|re.S):
        if not re.search(rf'\b(?:id|name)\s*=\s*["\']{re.escape(key)}["\']',tag,re.I): continue
        m=re.search(r'\bvalue\s*=\s*["\']([^"\']*)["\']',tag,re.I)
        if m: return html.unescape(m.group(1))
    return None


def contexts(text: str, pats: tuple[str,...], cap: int = 24):
    out=[]
    for pat in pats:
        for m in re.finditer(pat,text,re.I|re.S):
            c=compact(text[max(0,m.start()-900):min(len(text),m.start()+4200)],5200)
            rec={'pattern':pat,'context':c}
            if rec not in out: out.append(rec)
            if len(out)>=cap: return out
    return out


def original_contract(text: str) -> bool:
    n=re.sub(r'\s+','',text)
    return 'functionoriginalCheck(goOri)' in n and 'data:{controlNo:controlNo,docType:docType}' in n and 'url:goOri' in n


def main():
    opener=build_opener(HTTPCookieProcessor(CookieJar()))
    dm,db=fetch(opener,DETAIL); assert dm['status']==200
    dt=dec(db)
    assert CONTROL_NO in dt and P_MAT_TYPE in dt and P_SUBMAT_TYPE in dt and FULLTEXT_KIND in dt
    assert '송상섭' in dt and ('滴天隨' in dt or '滴天髓' in dt) and 'T16377357' in dt
    form={k:hidden(dt,k) for k in ('control_no','p_mat_type','p_submat_type','fulltext_kind','t_gubun')}
    assert form['control_no']==CONTROL_NO and form['p_mat_type']==P_MAT_TYPE and form['p_submat_type']==P_SUBMAT_TYPE and form['fulltext_kind']==FULLTEXT_KIND
    assert re.search(r'onclick=["\'][^"\']*fulltextDownload\s*\(\s*\)',dt,re.I)

    scripts=[]
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)',dt,re.I):
        u=urljoin(dm['finalUrl'] or DETAIL,html.unescape(raw))
        if u not in scripts: scripts.append(u)

    pats=(r'function\s+fulltextDownload\s*\([^)]*\)',r'fulltextDownload\s*:\s*function\s*\([^)]*\)',r'window\.fulltextDownload\s*=',r'FullTextDownload\.do',r'redirectURL',r'document\.f',r'\.submit\s*\(',r'function\s+originalCheck\s*\([^)]*\)',r'/detail/originalCheck\.do')
    sources=[{'source':dm['finalUrl'] or DETAIL,'meta':dm,'contexts':contexts(dt,pats)}]
    source_texts=[(dm['finalUrl'] or DETAIL,dt)]
    for u in scripts[:180]:
        sm,sb=fetch(opener,u,referer=DETAIL)
        if not sb: continue
        st=dec(sb)
        if not re.search(r'fulltextDownload|FullTextDownload|redirectURL|originalCheck|document\.f|\.submit\s*\(',st,re.I): continue
        sources.append({'source':sm['finalUrl'] or u,'meta':sm,'contexts':contexts(st,pats)})
        source_texts.append((sm['finalUrl'] or u,st))

    endpoint=None; contract=False
    for su,st in source_texts:
        contract = contract or original_contract(st)
        if endpoint is None:
            m=re.search(r'(/detail/originalCheck\.do)',st,re.I)
            if m: endpoint=urljoin(su,m.group(1))

    original=None; body=None
    if endpoint and contract:
        payload=urlencode({'controlNo':DOC_CONTROL_NO,'docType':DOC_TYPE}).encode('ascii')
        original,ob=fetch(opener,endpoint,data=payload,referer=DETAIL)
        body=compact(dec(ob),4000) if ob else None

    fulltext_impl=[]
    for src in sources:
        for c in src['contexts']:
            if re.search(r'function\s+fulltextDownload|fulltextDownload\s*:\s*function|window\.fulltextDownload',c['context'],re.I):
                fulltext_impl.append({'source':src['source'],'context':c['context']})

    report={
      'purpose':'inspect current site-authored RISS dispatcher and original-existence contract; no guessed submit/content action',
      'target':{'rissId':'T16377357','controlNo':CONTROL_NO,'docControlNo':DOC_CONTROL_NO,'docType':DOC_TYPE,'uci':'I804:45008-200000631721'},
      'detail':dm,'form':form,'pageAuthoredFulltextCall':True,'scriptUrls':scripts,
      'originalCheckUrl':endpoint,'originalCheckContractFound':contract,'originalCheck':original,'originalCheckBody':body,
      'fulltextDispatcherImplementation':fulltext_impl,
      'sources':sources,
      'guessedOpaqueIdentifierCount':0,'contentDownloadExecuted':False,
    }
    (OUT/'riss-dispatcher.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({k:report[k] for k in ('target','form','originalCheckUrl','originalCheckContractFound','originalCheck','originalCheckBody','fulltextDispatcherImplementation','guessedOpaqueIdentifierCount','contentDownloadExecuted')},ensure_ascii=False,indent=2))
    assert report['originalCheckContractFound']
    assert report['originalCheck'] and report['originalCheck']['status']==200
    assert report['guessedOpaqueIdentifierCount']==0 and report['contentDownloadExecuted'] is False

if __name__=='__main__': main()
