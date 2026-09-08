#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse, urlencode
from urllib.request import Request, build_opener, HTTPCookieProcessor

OUT=Path('acquisition-song-sangseop-2022');OUT.mkdir(exist_ok=True)
AUTHOR='송상섭'
TITLE='命理學의 六親論 硏究'
TITLE_ALT='命理學의 六親論 硏究'
SEARCH='https://www.riss.kr/search/Search.do?colName=bib_t&isDetailSearch=Y&queryText=znCreator%2C%EC%86%A1%EC%83%81%EC%84%AD&searchGubun=true'
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/22.0; exact-public-identity-discovery)'
MAX=8*1024*1024

def allowed(u:str)->bool:
    h=(urlparse(u).hostname or '').lower()
    return h in {'www.riss.kr','riss.kr','www.riss4u.net','riss4u.net'}
def dec(b:bytes)->str:
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')
def fetch(op,u,ref=None,limit=MAX):
    assert allowed(u),u
    h={'User-Agent':UA,'Accept':'text/html,application/json,application/javascript,*/*;q=0.5','Accept-Language':'ko-KR,ko;q=0.9'}
    if ref:h['Referer']=ref
    last=None
    for n in range(1,4):
        m={'requestedUrl':u,'status':None,'finalUrl':None,'contentType':None,'bytes':0,'sha256':None,'error':None,'attempt':n}
        try:
            with op.open(Request(u,headers=h),timeout=40) as r:
                b=r.read(limit);m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),contentType=r.headers.get('Content-Type'),bytes=len(b),sha256=hashlib.sha256(b).hexdigest());return m,b,dec(b)
        except Exception as e:m['error']=f'{type(e).__name__}: {e}';last=m;time.sleep(n)
    return last,b'', ''
def compact(s,n=8000):return re.sub(r'\s+',' ',html.unescape(s)).strip()[:n]
def hidden(t,name):
    for p in (rf'id=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)',rf'name=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)'):
        m=re.search(p,t,re.I|re.S)
        if m:return html.unescape(m.group(1))
    return None
def title_pos(t):
    for tok in (TITLE,TITLE_ALT,'滴天隨闡微'):
        p=t.find(tok)
        if p>=0:return p
    return -1
def candidate_links(t,base):
    p=title_pos(t)
    if p<0:return []
    frag=t[max(0,p-14000):p+22000]
    out=[]
    for m in re.finditer(r'href=["\']([^"\']+)["\']',frag,re.I):
        raw=html.unescape(m.group(1));u=urljoin(base,raw)
        if not allowed(u):continue
        if ('DetailView.do' in u or '/link?' in u or '/link?id=' in u) and u not in out:out.append(u)
    # javascript wrappers may contain detail URLs as quoted arguments.
    for raw in re.findall(r'(["\'])(/search/detail/DetailView\.do\?[^"\']+)\1',frag,re.I):
        u=urljoin(base,html.unescape(raw[1]));
        if allowed(u) and u not in out:out.append(u)
    return out[:30]
def target_identity(t):
    return AUTHOR in t and ('滴天隨闡微' in t) and ('2022' in t) and ('원광대학교' in t or '圓光大學校' in t)
def main():
    op=build_opener(HTTPCookieProcessor(CookieJar()))
    sm,sb,st=fetch(op,SEARCH);assert sm['status']==200
    (OUT/'riss-search.html').write_text(st,encoding='utf-8')
    links=candidate_links(st,sm.get('finalUrl') or SEARCH)
    probes=[];chosen=None;chosen_text=''
    for u in links:
        mm,b,t=fetch(op,u,ref=SEARCH);rec={'meta':mm,'identityMatch':target_identity(t),'rissIds':sorted(set(re.findall(r'\bT\d{7,12}\b',t))),'controlNos':sorted(set(re.findall(r'control_no=([a-f0-9]{20,64})',html.unescape(t),re.I)))};probes.append(rec)
        if rec['identityMatch'] and chosen is None:
            chosen=mm.get('finalUrl') or u;chosen_text=t;(OUT/'riss-detail.html').write_text(t,encoding='utf-8')
    # Fallback: search result itself sometimes embeds exact detail control/id in target result block.
    if chosen is None:
        p=title_pos(st);frag=st[max(0,p-20000):p+30000] if p>=0 else ''
        controls=re.findall(r'control_no=([a-f0-9]{20,64})',html.unescape(frag),re.I)
        for c in controls[:10]:
            u=f'https://www.riss.kr/search/detail/DetailView.do?control_no={c}&p_mat_type=be54d9b8bc7cdb09'
            mm,b,t=fetch(op,u,ref=SEARCH);rec={'meta':mm,'identityMatch':target_identity(t),'rissIds':sorted(set(re.findall(r'\bT\d{7,12}\b',t))),'controlNos':[c]};probes.append(rec)
            if rec['identityMatch']:
                chosen=mm.get('finalUrl') or u;chosen_text=t;(OUT/'riss-detail.html').write_text(t,encoding='utf-8');break
    assert chosen is not None, 'exact Song Sangseop target detail not resolved from current public RISS result'
    detail=chosen_text
    riss_ids=sorted(set(re.findall(r'(?:riss\.kr/link\?id=|/link\?id=)(T\d+)',detail,re.I)))
    if not riss_ids:riss_ids=sorted(set(re.findall(r'\bT\d{7,12}\b',detail)))
    controls=sorted(set(re.findall(r'control_no=([a-f0-9]{20,64})',html.unescape(chosen+detail),re.I)))
    doc_control=hidden(detail,'controlNo') or hidden(detail,'docControlNo')
    doc_type=hidden(detail,'docType')
    ucis=sorted(set(re.findall(r'I804:[A-Za-z0-9-]+',detail)))
    ext=[]
    for u in re.findall(r'https?://[^\s"\'<>]+',html.unescape(detail)):
        u=u.rstrip(').,;')
        h=(urlparse(u).hostname or '').lower()
        if 'dcollection' in h and u not in ext:ext.append(u)
    tuple_hits=[]
    for m in re.finditer(r"ButtonSet\.fulltextDownload\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'",detail,re.I):
        rec={'controlNo':m.group(1),'pMatType':m.group(2),'pSubmatType':m.group(3),'fulltextKind':m.group(4)}
        if rec not in tuple_hits:tuple_hits.append(rec)
    rep={'purpose':'resolve exact Song Sangseop 2022 public RISS identity only; no opaque guessing/content action','search':sm,'candidateLinks':links,'probes':probes,'target':{'detailUrl':chosen,'rissIds':riss_ids,'controlNos':controls,'docControlNo':doc_control,'docType':doc_type,'ucis':ucis,'dcollectionUrls':ext,'fulltextTuples':tuple_hits},'guessedOpaqueIdentifierCount':0,'contentActionExecuted':False}
    (OUT/'riss-identity.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'target':rep['target'],'guessedOpaqueIdentifierCount':0,'contentActionExecuted':False},ensure_ascii=False,indent=2))
    assert riss_ids and doc_control and doc_type=='T'
    return 0
if __name__=='__main__':raise SystemExit(main())
