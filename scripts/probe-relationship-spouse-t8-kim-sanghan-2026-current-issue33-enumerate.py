#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, time
from pathlib import Path
from urllib.parse import urlencode, urlparse
from urllib.request import Request, build_opener

OUT=Path('acquisition-kim-sanghan-2026-current');OUT.mkdir(exist_ok=True)
HOME='https://brhistory.re.kr/subList/32000003815'
ENDPOINT='https://brhistory.re.kr/module/thesis/selectKyoboThesisNttListAjax.ink'
AUTHOR='김상한';TITLE_SIGNAL='명리 고전 여명론';ISSUE='1096294';UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/20.4; current-issue33-enumeration)';MAX=20*1024*1024

def dec(b):
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')
def fetch(u,data=None,ref=None):
    assert (urlparse(u).hostname or '').endswith('brhistory.re.kr')
    h={'User-Agent':UA,'Accept':'text/html,application/json,*/*;q=0.5'}
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
def attrs(tag):return {k.lower():html.unescape(v) for k,_,v in re.findall(r'''([:\w-]+)\s*=\s*(["'])(.*?)\2''',tag,re.S)}
def form_block(t):
    m=re.search(r'<form\b[^>]*(?:id|name)=["\']thesisNttFrm["\'][^>]*>.*?</form>',t,re.I|re.S);return m.group(0) if m else None
def defaults(block):
    d={}
    for im in re.finditer(r'<input\b([^>]*)>',block,re.I|re.S):
        a=attrs(im.group(1));n=a.get('name')
        if n and a.get('type','text').lower() not in ('submit','button','image','reset','file'):d[n]=a.get('value','')
    for sm in re.finditer(r'<select\b([^>]*)>(.*?)</select>',block,re.I|re.S):
        a=attrs(sm.group(1));n=a.get('name')
        if not n:continue
        opts=[]
        for om in re.finditer(r'<option\b([^>]*)>(.*?)</option>',sm.group(2),re.I|re.S):
            oa=attrs(om.group(1));opts.append((oa.get('value',''),bool(re.search(r'\bselected\b',om.group(1),re.I))))
        sel=[v for v,s in opts if s];d[n]=sel[0] if sel else (opts[0][0] if opts else '')
    return d
def result_count(t):
    m=re.search(r'결과검색\s*:\s*<span[^>]*>\s*([0-9,]+)\s*</span>',t,re.I|re.S)
    return int(m.group(1).replace(',','')) if m else None
def cards(t):
    # Result cards expose individual title/author text and fnViewPdf calls in the same surrounding block.
    starts=[m.start() for m in re.finditer(r'<div\b[^>]*class=["\'][^"\']*schr0[123][^"\']*["\']',t,re.I)]
    out=[]
    for i,s in enumerate(starts):
        e=starts[i+1] if i+1<len(starts) else min(len(t),s+30000)
        frag=html.unescape(t[s:e])
        plain=re.sub(r'<[^>]+>',' ',frag);plain=re.sub(r'\s+',' ',plain).strip()
        tuples=[]
        for m in re.finditer(r"fnViewPdf\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'",frag,re.I):
            r={'barcode':m.group(1),'artId':m.group(2),'kyoboKey':m.group(3),'scholarUrl':m.group(4)}
            if r not in tuples:tuples.append(r)
        hrefs=[]
        for u in re.findall(r'href=["\'](https://scholar\.kyobobook\.co\.kr/builderDownload\?[^"\']+)["\']',frag,re.I):
            u=html.unescape(u)
            if u not in hrefs:hrefs.append(u)
        out.append({'text':plain[:12000],'containsAuthor':AUTHOR in plain,'containsTitleSignal':TITLE_SIGNAL in plain,'tuples':tuples,'builderDownloadHrefs':hrefs})
    return out
def main():
    hm,ht=fetch(HOME);assert hm['status']==200
    bootstrap={'journalCd':'','sysmoduleSeq':'10000000221','pubcNumYsno':'N'}
    am,at=fetch(ENDPOINT,urlencode(bootstrap).encode(),HOME);assert am['status']==200
    fb=form_block(at);assert fb
    base=defaults(fb)
    assert base.get('trgtIsuInsttCd')=='20885'
    common=dict(base);common.update({'journalCd':'3444','bookYear':'2026','bookCd':ISSUE,'pageIndex':'1'})

    probes=[]
    # Exact issue selection with no text filter: normal UI state.
    all_form=dict(common);all_form.update({'searchCondition':'all','searchKeyword':'','reFlag':'Y','searchCd':''})
    mm,tt=fetch(ENDPOINT,urlencode(all_form).encode('utf-8'),HOME);assert mm['status']==200
    (OUT/'current-issue33-all.html').write_text(tt,encoding='utf-8')
    all_cards=cards(tt);probes.append({'kind':'issue33-all','meta':mm,'form':all_form,'resultCount':result_count(tt),'cards':all_cards})

    # Explicit current UI author search, still within issue33.
    af=dict(common);af.update({'searchCondition':'authorNm','searchKeyword':AUTHOR,'reFlag':'Y','searchCd':'A'})
    ameta,atext=fetch(ENDPOINT,urlencode(af).encode('utf-8'),HOME);assert ameta['status']==200
    (OUT/'current-issue33-author.html').write_text(atext,encoding='utf-8')
    author_cards=cards(atext);probes.append({'kind':'issue33-author','meta':ameta,'form':af,'resultCount':result_count(atext),'cards':author_cards})

    target=[]
    for p in probes:
        for c in p['cards']:
            if c['containsAuthor'] or c['containsTitleSignal']:
                rec={'probe':p['kind'],**c}
                if rec not in target:target.append(rec)
    rep={'purpose':'current issue33 enumeration and current UI author search; discovery only, no content action','bootstrap':{'meta':am,'contract':bootstrap},'probes':probes,'targetCards':target,'guessedOpaqueIdentifierCount':0,'contentDownloadExecuted':False}
    (OUT/'current-issue33-enumerate.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'probes':[{'kind':p['kind'],'resultCount':p['resultCount'],'cards':len(p['cards'])} for p in probes],'targetCards':target,'guessedOpaqueIdentifierCount':0,'contentDownloadExecuted':False},ensure_ascii=False,indent=2))
    assert rep['guessedOpaqueIdentifierCount']==0 and rep['contentDownloadExecuted'] is False
    return 0
if __name__=='__main__':raise SystemExit(main())
