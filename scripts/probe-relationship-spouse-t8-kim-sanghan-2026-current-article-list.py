#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, time
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener

OUT=Path('acquisition-kim-sanghan-2026-current');OUT.mkdir(exist_ok=True)
HOME='https://brhistory.re.kr/subList/32000003815'
ENDPOINT='https://brhistory.re.kr/module/thesis/selectKyoboThesisNttListAjax.ink'
AUTHOR='김상한';TITLE='명리 고전 여명론';UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/20.2; current-site-authored-bootstrap)';MAX=16*1024*1024

def dec(b):
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')
def compact(s,lim=8000):return re.sub(r'\s+',' ',html.unescape(s)).strip()[:lim]
def fetch(u,data=None,ref=None):
    assert (urlparse(u).hostname or '').endswith('brhistory.re.kr')
    h={'User-Agent':UA,'Accept':'text/html,application/json,application/javascript,*/*;q=0.5'}
    if data is not None:h.update({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-Requested-With':'XMLHttpRequest'})
    if ref:h['Referer']=ref
    last=None
    for n in range(1,4):
        m={'requestedUrl':u,'method':'POST' if data is not None else 'GET','status':None,'finalUrl':None,'bytes':0,'sha256':None,'error':None,'attempt':n}
        try:
            with build_opener().open(Request(u,data=data,headers=h),timeout=35) as r:
                b=r.read(MAX);m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),bytes=len(b),sha256=hashlib.sha256(b).hexdigest());return m,dec(b)
        except Exception as e:m['error']=f'{type(e).__name__}: {e}';last=m;time.sleep(n)
    return last,''
def windows(t,tok):
    out=[];d=html.unescape(t)
    for m in list(re.finditer(re.escape(tok),d,re.I))[:20]:out.append(compact(d[max(0,m.start()-2200):min(len(d),m.end()+5000)],7200))
    return list(dict.fromkeys(out))[:20]
def fields(t,name):
    out=[];d=html.unescape(t)
    pats=[rf'name\s*=\s*["\']{re.escape(name)}["\'][^>]*value\s*=\s*["\']([^"\']*)',rf'value\s*=\s*["\']([^"\']*)["\'][^>]*name\s*=\s*["\']{re.escape(name)}["\']',rf'\b{re.escape(name)}\b\s*[:=]\s*["\']([^"\']*)["\']']
    for p in pats:
        for v in re.findall(p,d,re.I|re.S):
            v=compact(v,500)
            if v not in out:out.append(v)
    return out[:30]
def tuples(t):
    out=[]
    for m in re.finditer(r"fnViewPdf\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'",t,re.I):
        r={'barcode':m.group(1),'artId':m.group(2),'kyoboKey':m.group(3),'scholarUrl':m.group(4)}
        if r not in out:out.append(r)
    return out[:30]
def main():
    hm,ht=fetch(HOME)
    norm=re.sub(r'\s+','',ht)
    assert hm['status']==200
    assert "fnTabLink('dataManage','N','005')" in norm
    assert "pageUrl='/module/thesis/selectKyoboThesisNttListAjax.ink'" in norm
    assert "data:{journalCd:journalCd,sysmoduleSeq:'10000000221',pubcNumYsno:pubcNumYsno}" in norm
    form={'journalCd':'','sysmoduleSeq':'10000000221','pubcNumYsno':'N'}
    am,at=fetch(ENDPOINT,urlencode(form).encode('utf-8'),HOME)
    rep={'purpose':'exact current site-authored article-list bootstrap; no stale ids and no content download','home':hm,'bootstrapContract':form,'articleList':am,'containsTarget':bool(AUTHOR in at or TITLE in at),'targetTuples':tuples(at),'fields':{},'contexts':{},'guessedOpaqueIdentifierCount':0,'contentDownloadExecuted':False}
    for name in ('journalCd','sysmoduleSeq','trgtIsuInsttCd','bookCd','bookYear','strQuery','pubcNumYsno','searchCondition','searchKeyword','pageIndex'):
        rep['fields'][name]=fields(at,name)
    for tok in ('selectKyoboThesisBookListAjax.ink','selectKyoboThesisNttListAjax.ink','fnViewPdf','builderDownload','bookCd','bookYear','journalCd','strQuery','검색','2026','제33호'):
        rep['contexts'][tok]=windows(at,tok)
    if at:(OUT/'current-article-list.html').write_text(at[:5_000_000],encoding='utf-8')
    (OUT/'current-article-list.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(rep,ensure_ascii=False,indent=2))
    assert am['status']==200 and rep['guessedOpaqueIdentifierCount']==0 and rep['contentDownloadExecuted'] is False
    return 0
if __name__=='__main__':raise SystemExit(main())
