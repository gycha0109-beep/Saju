#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, time
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener

OUT=Path('acquisition-kim-sanghan-2026-current'); OUT.mkdir(exist_ok=True)
HOME='https://brhistory.re.kr/subList/32000003815'
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/20.1; public-contract-context)'
MAX=8*1024*1024
TOKENS=('selectKyoboThesisNttListAjax.ink','selectKyoboThesisBookListAjax.ink','sysmoduleSeq','journalCd','trgtIsuInsttCd','strQuery','pubcNumYsno','serialize','fnViewPdf','builderDownload')

def dec(b):
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')

def compact(s,lim=9000):return re.sub(r'\s+',' ',html.unescape(s)).strip()[:lim]

def fetch(u,ref=None):
    assert (urlparse(u).hostname or '').endswith('brhistory.re.kr')
    h={'User-Agent':UA,'Accept':'text/html,application/javascript,*/*;q=0.5'}
    if ref:h['Referer']=ref
    last=None
    for n in range(1,4):
        m={'url':u,'status':None,'finalUrl':None,'bytes':0,'sha256':None,'error':None,'attempt':n}
        try:
            with build_opener().open(Request(u,headers=h),timeout=30) as r:
                b=r.read(MAX);m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),bytes=len(b),sha256=hashlib.sha256(b).hexdigest());return m,dec(b)
        except Exception as e:
            m['error']=f'{type(e).__name__}: {e}';last=m;time.sleep(n)
    return last,''

def scripts(t,b):
    out=[]
    for x in re.findall(r'<script[^>]+src=["\']([^"\']+)',t,re.I):
        u=urljoin(b,html.unescape(x));host=(urlparse(u).hostname or '')
        if host.endswith('brhistory.re.kr') and u not in out:out.append(u)
    return out[:120]

def windows(src,t):
    out=[]
    d=html.unescape(t)
    for tok in TOKENS:
        for m in list(re.finditer(re.escape(tok),d,re.I))[:12]:
            w=compact(d[max(0,m.start()-3500):min(len(d),m.end()+6500)],10000)
            rec={'source':src,'token':tok,'window':w}
            if rec not in out:out.append(rec)
    return out[:200]

def forms(t):
    out=[]
    for m in re.finditer(r'<form\b[^>]*>.*?</form>',t,re.I|re.S):
        block=m.group(0)
        if any(tok.lower() in block.lower() for tok in TOKENS):out.append(compact(block,15000))
    return out[:30]

def main():
    hm,ht=fetch(HOME);base=hm.get('finalUrl') or HOME
    rep={'purpose':'current publisher HTML/static JS context only; no AJAX/content request','home':hm,'scripts':[],'contexts':[],'forms':[],'guessedOpaqueIdentifierCount':0,'contentActionExecuted':False}
    rep['contexts']+=windows(base,ht);rep['forms']+=forms(ht)
    for u in scripts(ht,base):
        m,t=fetch(u,base);rep['scripts'].append(m)
        if t:
            rep['contexts']+=windows(m.get('finalUrl') or u,t);rep['forms']+=forms(t)
    # dedupe
    seen=set();ctx=[]
    for r in rep['contexts']:
        k=(r['source'],r['token'],r['window'])
        if k not in seen:seen.add(k);ctx.append(r)
    rep['contexts']=ctx[:240]
    rep['forms']=list(dict.fromkeys(rep['forms']))[:50]
    (OUT/'publisher-contract-context.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    focus={tok:[r for r in rep['contexts'] if r['token']==tok][:6] for tok in TOKENS}
    print(json.dumps({'home':hm,'focus':focus,'forms':rep['forms'],'guessedOpaqueIdentifierCount':0,'contentActionExecuted':False},ensure_ascii=False,indent=2))
    assert hm['status']==200 and rep['guessedOpaqueIdentifierCount']==0 and rep['contentActionExecuted'] is False
    return 0
if __name__=='__main__':raise SystemExit(main())
