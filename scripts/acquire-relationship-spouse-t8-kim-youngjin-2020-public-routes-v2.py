#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

OUT=Path('acquisition-kim-youngjin-2020');OUT.mkdir(exist_ok=True)
AUTHOR='김영진';TITLE='사주명리학의 宮과 星에 관한 연구';RISS_ID='T15521643'
RISS_LINK=f'https://www.riss.kr/link?id={RISS_ID}'
NANET_SEARCHES=[
 'https://dl.nanet.go.kr/search/searchInnerList.do?'+urlencode({'searchQuery':TITLE,'searchType':'INNER_SEARCH','searchClass':'S','queryText':TITLE+':ALL_NI_TOC:AND','pageNum':'1','pageSize':'50','hanjaYn':'Y','resultType':'INNER_SEARCH_LIST'}),
 'https://dl.nanet.go.kr/search/searchInnerList.do?'+urlencode({'searchQuery':'경기대학교 행정·사회복지대학원','searchType':'INNER_SEARCH','searchClass':'S','queryText':'경기대학교 행정·사회복지대학원:PUB^PUB_WS^DP_PUB_WS:AND','pageNum':'5','pageSize':'10','hanjaYn':'Y','resultType':'INNER_SEARCH_LIST'}),
]
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/23.1; Kim-Youngjin-public-link)';MAX=20*1024*1024

class RR(HTTPRedirectHandler):
    def __init__(self):super().__init__();self.chain=[]
    def redirect_request(self,req,fp,code,msg,headers,newurl):self.chain.append({'code':code,'url':newurl});return super().redirect_request(req,fp,code,msg,headers,newurl)
def dec(b):
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')
def allowed(u):return (urlparse(u).hostname or '').lower() in {'www.riss.kr','riss.kr','dl.nanet.go.kr','docviewer.nanet.go.kr'}
def fetch(op,rr,u,data=None,ref=None,limit=MAX):
    assert allowed(u),u;h={'User-Agent':UA,'Accept':'text/html,application/json,application/javascript,application/pdf,*/*;q=0.5','Accept-Language':'ko-KR,ko;q=0.9'}
    if data is not None:h.update({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-Requested-With':'XMLHttpRequest'})
    if ref:h['Referer']=ref
    last=None
    for n in range(1,4):
        rr.chain.clear();m={'requestedUrl':u,'method':'POST' if data is not None else 'GET','status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bytes':0,'sha256':None,'error':None,'attempt':n}
        try:
            with op.open(Request(u,data=data,headers=h),timeout=40) as r:
                b=r.read(limit);m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirectChain=list(rr.chain),contentType=r.headers.get('Content-Type'),bytes=len(b),sha256=hashlib.sha256(b).hexdigest());return m,b,('' if b.startswith(b'%PDF-') else dec(b))
        except Exception as e:m['error']=f'{type(e).__name__}: {e}';last=m;time.sleep(n)
    return last,b'', ''
def scripts(t,base,hosts):
    out=[]
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)',t,re.I):
        u=urljoin(base,html.unescape(raw));
        if (urlparse(u).hostname or '').lower() in hosts and u not in out:out.append(u)
    return out[:120]
def hidden(t,name):
    for p in (rf'id=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)',rf'name=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)'):
        m=re.search(p,t,re.I|re.S)
        if m:return html.unescape(m.group(1))
    return None
def compact(s,n=3000):return re.sub(r'\s+',' ',html.unescape(s)).strip()[:n]
def original_contract(t):
    n=re.sub(r'\s+','',t);return 'functionoriginalCheck(goOri)' in n and 'data:{controlNo:controlNo,docType:docType}' in n and 'url:goOri' in n
def nanet_controls(t):
    p=t.find(TITLE)
    if p<0:return []
    frag=html.unescape(t[max(0,p-22000):p+32000]);out=[]
    for x in re.findall(r'\b(KDMT\d{10,})\b',frag):
        if x not in out:out.append(x)
    return out
def main():
    rr=RR();op=build_opener(HTTPCookieProcessor(CookieJar()),rr)
    rep={'purpose':'Kim Youngjin 2020 exact current public RISS canonical-link and NANET bounded acquisition; no bypass','candidate':{'author':AUTHOR,'title':TITLE,'riss':RISS_ID},'riss':{},'nanet':{},'docviewer':{},'guessedOpaqueIdentifierCount':0,'loginBypass':False,'drmRequestExecuted':False,'contentAssetActionExecuted':False,'fullLengthPdfAcquired':False}

    # RISS canonical public identifier -> exact current detail.
    rm,rb,rt=fetch(op,rr,RISS_LINK);assert rm['status']==200 and AUTHOR in rt and TITLE in rt
    rep['riss']['link']=rm;(OUT/'riss-detail.html').write_text(rt,encoding='utf-8')
    final=rm.get('finalUrl') or RISS_LINK;rep['riss']['detailUrl']=final
    rep['riss']['rissIds']=sorted(set(re.findall(r'\bT\d{7,12}\b',rt)))
    if RISS_ID not in rep['riss']['rissIds']:rep['riss']['rissIds'].append(RISS_ID)
    rep['riss']['controls']=sorted(set(re.findall(r'control_no=([a-f0-9]{16,64})',html.unescape(final+rt),re.I)))
    dc=hidden(rt,'controlNo') or hidden(rt,'docControlNo');dt=hidden(rt,'docType');rep['riss']['docControlNo']=dc;rep['riss']['docType']=dt
    rep['riss']['ucis']=sorted(set(re.findall(r'I804:[A-Za-z0-9-]+',rt)))
    tuples=[]
    for m in re.finditer(r"ButtonSet\.fulltextDownload\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'",rt,re.I):
        x={'controlNo':m.group(1),'pMatType':m.group(2),'pSubmatType':m.group(3),'fulltextKind':m.group(4)}
        if x not in tuples:tuples.append(x)
    rep['riss']['fulltextTuples']=tuples
    union=rt;sf=[]
    for u in scripts(rt,final,{'www.riss.kr','riss.kr'}):
        mm,b,t=fetch(op,rr,u,ref=final,limit=3_000_000);sf.append(mm)
        if t:union+='\n'+t
    rep['riss']['scriptFetches']=sf;rep['riss']['originalCheck']=None
    if dc and dt and '/detail/originalCheck.do' in union and original_contract(union):
        mm,b,t=fetch(op,rr,'https://www.riss.kr/detail/originalCheck.do',data=urlencode({'controlNo':dc,'docType':dt}).encode(),ref=final,limit=100000);mm['body']=compact(t,2000);rep['riss']['originalCheck']=mm

    # NANET public searches -> exact current control only if the title-local result exposes it.
    search_records=[];controls=[]
    for idx,u in enumerate(NANET_SEARCHES,1):
        mm,b,t=fetch(op,rr,u);cs=nanet_controls(t);search_records.append({'meta':mm,'controls':cs,'titleObserved':TITLE in t})
        if t:(OUT/f'nanet-search-{idx}.html').write_text(t,encoding='utf-8')
        for c in cs:
            if c not in controls:controls.append(c)
    rep['nanet']['searches']=search_records;rep['nanet']['candidateControls']=controls;probes=[]
    for c in controls[:10]:
        u=f'https://dl.nanet.go.kr/detail/{c}';mm,b,t=fetch(op,rr,u,ref=NANET_SEARCHES[0],limit=4_000_000);match=bool(mm['status']==200 and AUTHOR in t and TITLE in t);probes.append({'control':c,'meta':mm,'identityMatch':match})
        if match and 'control' not in rep['nanet']:
            rep['nanet']['control']=c;rep['nanet']['detail']=mm;(OUT/'nanet-detail.html').write_text(t,encoding='utf-8')
            rep['nanet']['viewButtonObserved']=bool(re.search(rf"viewDoc\([^\)]*['\"]{re.escape(c)}['\"]",t,re.I));rep['nanet']['downloadButtonObserved']=bool(re.search(rf"downloadDoc\([^\)]*['\"]{re.escape(c)}['\"]",t,re.I))
    rep['nanet']['probes']=probes

    if rep['nanet'].get('control'):
        c=rep['nanet']['control'];im,ib,it=fetch(op,rr,'https://dl.nanet.go.kr/script/search/inner.js',ref=f'https://dl.nanet.go.kr/detail/{c}',limit=3_000_000);rep['nanet']['innerJs']=im
        dispatcher=bool('viewDocBySingleCount' in it and '/view/callViewer.do' in it and 'orgId=dl' in it and 'linkSysId=NADL' in it);rep['nanet']['viewerDispatcherObserved']=dispatcher;rep['nanet']['downloadLoginGateObserved']=bool('downloadDoc' in it and '/login.do' in it)
        if rep['nanet'].get('viewButtonObserved') and dispatcher:
            vu=f'https://dl.nanet.go.kr/view/callViewer.do?controlNo={c}&orgId=dl&linkSysId=NADL';vm,vb,vt=fetch(op,rr,vu,ref=f'https://dl.nanet.go.kr/detail/{c}',limit=2_000_000);rep['nanet']['viewerBootstrap']=vm
            hops=[]
            for pat in [r"location\.replace\(\s*['\"]([^'\"]+)",r"location\.href\s*=\s*['\"]([^'\"]+)"]:
                for x in re.findall(pat,vt,re.I):
                    u=urljoin(vm.get('finalUrl') or vu,html.unescape(x));
                    if allowed(u) and u not in hops:hops.append(u)
            rep['nanet']['viewerNextHops']=hops;dv=[u for u in hops if (urlparse(u).hostname or '').lower()=='docviewer.nanet.go.kr']
            if dv:
                du=dv[0];dm,db,dtxt=fetch(op,rr,du,ref=vu,limit=3_000_000);rep['docviewer']['html']=dm;alltxt=dtxt
                for su in scripts(dtxt,dm.get('finalUrl') or du,{'docviewer.nanet.go.kr'}):
                    mm,b,t=fetch(op,rr,su,ref=du,limit=8_000_000)
                    if t:alltxt+='\n'+t
                signals=[tok for tok in ['VUE_APP_MORE_PATH','VUE_APP_USE_SEC','drm','aes-256-cbc','/docinfo/','/page/','/pagec/','/regDoc'] if tok.lower() in alltxt.lower()];rep['docviewer']['protectedContentSignals']=signals;rep['docviewer']['disposition']='DRM_OR_DEDICATED_VIEWER_SIGNAL_OBSERVED_STOP_NO_REPLAY' if any(x.lower() in {'drm','vue_app_more_path','vue_app_use_sec','aes-256-cbc'} for x in signals) else 'PUBLIC_VIEWER_STATIC_ONLY_NO_CONTENT_REPLAY'

    (OUT/'report.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    s={'rissFinalUrl':final,'rissIds':rep['riss']['rissIds'],'rissControls':rep['riss']['controls'],'docControlNo':dc,'docType':dt,'ucis':rep['riss']['ucis'],'fulltextTuples':tuples,'originalCheck':rep['riss']['originalCheck'],'nanetCandidateControls':controls,'nanetExactControl':rep['nanet'].get('control'),'viewerNextHops':rep['nanet'].get('viewerNextHops',[]),'docviewerDisposition':rep['docviewer'].get('disposition'),'protectedContentSignals':rep['docviewer'].get('protectedContentSignals',[]),'fullLengthPdfAcquired':False,'guessedOpaqueIdentifierCount':0,'contentAssetActionExecuted':False};(OUT/'summary.txt').write_text(json.dumps(s,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps(s,ensure_ascii=False,indent=2))
    assert RISS_ID in rep['riss']['rissIds']
    assert rep['guessedOpaqueIdentifierCount']==0 and rep['drmRequestExecuted'] is False and rep['contentAssetActionExecuted'] is False
    return 0
if __name__=='__main__':raise SystemExit(main())
