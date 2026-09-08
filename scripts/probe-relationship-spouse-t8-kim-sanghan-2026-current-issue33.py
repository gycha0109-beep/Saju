#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, time
from pathlib import Path
from urllib.parse import urlencode, urlparse
from urllib.request import Request, build_opener

OUT=Path('acquisition-kim-sanghan-2026-current');OUT.mkdir(exist_ok=True)
HOME='https://brhistory.re.kr/subList/32000003815'
ENDPOINT='https://brhistory.re.kr/module/thesis/selectKyoboThesisNttListAjax.ink'
AUTHOR='김상한';TITLE='명리 고전 여명론';UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/20.3; current-issue33-target)';MAX=16*1024*1024

def dec(b):
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')
def compact(s,lim=12000):return re.sub(r'\s+',' ',html.unescape(s)).strip()[:lim]
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
def attrs(tag):
    return {k.lower():html.unescape(v) for k,_,v in re.findall(r'''([:\w-]+)\s*=\s*(["'])(.*?)\2''',tag,re.S)}
def form_block(t):
    m=re.search(r'<form\b[^>]*(?:id|name)=["\']thesisNttFrm["\'][^>]*>.*?</form>',t,re.I|re.S)
    return m.group(0) if m else None
def options(block,name):
    m=re.search(rf'<select\b[^>]*name=["\']{re.escape(name)}["\'][^>]*>(.*?)</select>',block,re.I|re.S)
    if not m:return []
    out=[]
    for om in re.finditer(r'<option\b([^>]*)>(.*?)</option>',m.group(1),re.I|re.S):
        a=attrs(om.group(1));out.append({'value':a.get('value',''),'text':compact(om.group(2),500),'selected':bool(re.search(r'\bselected\b',om.group(1),re.I))})
    return out
def serialized_defaults(block):
    d={}
    for im in re.finditer(r'<input\b([^>]*)>',block,re.I|re.S):
        a=attrs(im.group(1));name=a.get('name')
        if not name or a.get('disabled') is not None:continue
        typ=a.get('type','text').lower()
        if typ in ('submit','button','image','reset','file'):continue
        if typ in ('checkbox','radio') and not re.search(r'\bchecked\b',im.group(1),re.I):continue
        d[name]=a.get('value','')
    for sm in re.finditer(r'<select\b([^>]*)>(.*?)</select>',block,re.I|re.S):
        a=attrs(sm.group(1));name=a.get('name')
        if not name:continue
        opts=[]
        for om in re.finditer(r'<option\b([^>]*)>(.*?)</option>',sm.group(2),re.I|re.S):
            oa=attrs(om.group(1));opts.append((oa.get('value',''),bool(re.search(r'\bselected\b',om.group(1),re.I))))
        selected=[v for v,s in opts if s]
        d[name]=selected[0] if selected else (opts[0][0] if opts else '')
    return d
def tuples(fragment):
    out=[]
    for m in re.finditer(r"fnViewPdf\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'",fragment,re.I):
        r={'barcode':m.group(1),'artId':m.group(2),'kyoboKey':m.group(3),'scholarUrl':m.group(4)}
        if r not in out:out.append(r)
    return out
def target_fragment(t):
    d=html.unescape(t);idx=d.find(TITLE)
    if idx<0:idx=d.find(AUTHOR)
    return d[max(0,idx-16000):idx+26000] if idx>=0 else None
def main():
    # Exact current bootstrap authored by HOME.
    hm,ht=fetch(HOME);assert hm['status']==200
    bootstrap={'journalCd':'','sysmoduleSeq':'10000000221','pubcNumYsno':'N'}
    am,at=fetch(ENDPOINT,urlencode(bootstrap).encode(),HOME);assert am['status']==200
    fb=form_block(at);assert fb,'current thesisNttFrm missing'
    defaults=serialized_defaults(fb)
    jopts=options(fb,'journalCd');yopts=options(fb,'bookYear');bopts=options(fb,'bookCd');sopts=options(fb,'searchCondition');ropts=options(fb,'reFlag')
    assert any(x['value']=='3444' and x['selected'] for x in jopts)
    assert any(x['value']=='2026' for x in yopts)
    assert any(x['value']=='1096294' and re.search(r'제?\s*33\s*호',x['text']) for x in bopts)
    assert any(x['value']=='productNm' for x in sopts)
    assert any(x['value']=='Y' for x in ropts)
    assert defaults.get('trgtIsuInsttCd')=='20885'
    form=dict(defaults)
    form.update({'journalCd':'3444','bookYear':'2026','bookCd':'1096294','searchCondition':'productNm','reFlag':'Y','searchKeyword':TITLE,'pageIndex':'1','searchCd':'A'})
    tm,tt=fetch(ENDPOINT,urlencode(form).encode('utf-8'),HOME)
    frag=target_fragment(tt)
    recs=tuples(frag or '')
    hrefs=[]
    if frag:
        for u in re.findall(r'href=["\'](https://scholar\.kyobobook\.co\.kr/builderDownload\?[^"\']+)["\']',frag,re.I):
            u=html.unescape(u)
            if u not in hrefs:hrefs.append(u)
        (OUT/'current-issue33-target-fragment.html').write_text(frag,encoding='utf-8')
    rep={'purpose':'exact current issue33 title-filter form replay; target tuple discovery only, no content download','bootstrap':{'meta':am,'contract':bootstrap},'currentFormDefaults':defaults,'observedOptions':{'journalCd':jopts,'bookYear':yopts,'bookCd':bopts,'searchCondition':sopts,'reFlag':ropts},'issue33Query':{'meta':tm,'form':form},'targetObserved':bool(frag and AUTHOR in frag and TITLE in frag),'targetTuples':recs,'targetBuilderDownloadHrefs':hrefs,'guessedOpaqueIdentifierCount':0,'contentDownloadExecuted':False}
    (OUT/'current-issue33.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(rep,ensure_ascii=False,indent=2))
    assert tm['status']==200
    assert rep['guessedOpaqueIdentifierCount']==0 and rep['contentDownloadExecuted'] is False
    return 0
if __name__=='__main__':raise SystemExit(main())
