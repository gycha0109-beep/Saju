#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

OUT=Path('acquisition-kim-youngjin-2020');OUT.mkdir(exist_ok=True)
AUTHOR='김영진';TITLE='사주명리학의 宮과 星에 관한 연구';YEAR='2020'
RISS_SEARCH='https://www.riss.kr/search/Search.do?colName=bib_t&isDetailSearch=Y&queryText=znCreator%2C%EA%B9%80%EC%98%81%EC%A7%84&searchGubun=true'
NANET_SEARCH='https://dl.nanet.go.kr/search/searchInnerList.do?'+urlencode({'searchQuery':TITLE,'searchType':'INNER_SEARCH','searchClass':'S','queryText':TITLE+':ALL_NI_TOC:AND','pageNum':'1','pageSize':'50','hanjaYn':'Y','resultType':'INNER_SEARCH_LIST'})
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/23.0; Kim-Youngjin-current-public-only)';MAX=20*1024*1024

class RR(HTTPRedirectHandler):
    def __init__(self):super().__init__();self.chain=[]
    def redirect_request(self,req,fp,code,msg,headers,newurl):self.chain.append({'code':code,'url':newurl});return super().redirect_request(req,fp,code,msg,headers,newurl)

def dec(b):
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')
def allowed(u):
    h=(urlparse(u).hostname or '').lower()
    return h in {'www.riss.kr','riss.kr','dl.nanet.go.kr','docviewer.nanet.go.kr'}
def fetch(op,rr,u,data=None,ref=None,limit=MAX):
    assert allowed(u),u
    h={'User-Agent':UA,'Accept':'text/html,application/json,application/javascript,application/pdf,*/*;q=0.5','Accept-Language':'ko-KR,ko;q=0.9'}
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
        u=urljoin(base,html.unescape(raw));h=(urlparse(u).hostname or '').lower()
        if h in hosts and u not in out:out.append(u)
    return out[:120]
def hidden(t,name):
    for p in (rf'id=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)',rf'name=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)'):
        m=re.search(p,t,re.I|re.S)
        if m:return html.unescape(m.group(1))
    return None
def compact(s,n=5000):return re.sub(r'\s+',' ',html.unescape(s)).strip()[:n]
def riss_links(t,base):
    p=t.find(TITLE)
    if p<0:return []
    frag=t[max(0,p-18000):p+26000];out=[]
    for raw in re.findall(r'href=["\']([^"\']*DetailView\.do[^"\']*)',frag,re.I):
        u=urljoin(base,html.unescape(raw))
        if allowed(u) and u not in out:out.append(u)
    for raw in re.findall(r'(["\'])(/search/detail/DetailView\.do\?[^"\']+)\1',frag,re.I):
        u=urljoin(base,html.unescape(raw[1]));
        if allowed(u) and u not in out:out.append(u)
    return out[:20]
def identity(t):return AUTHOR in t and TITLE in t and YEAR in t and '경기대학교' in t
def original_contract(t):
    n=re.sub(r'\s+','',t)
    return 'functionoriginalCheck(goOri)' in n and 'data:{controlNo:controlNo,docType:docType}' in n and 'url:goOri' in n
def nanet_control_from_search(t):
    p=t.find(TITLE)
    if p<0:return []
    frag=html.unescape(t[max(0,p-22000):p+30000]);out=[]
    for x in re.findall(r'\b(KDMT\d{10,})\b',frag):
        if x not in out:out.append(x)
    return out
def main():
    jar=CookieJar();rr=RR();op=build_opener(HTTPCookieProcessor(jar),rr)
    rep={'purpose':'Kim Youngjin 2020 exact public RISS/NANET acquisition discovery and bounded viewer probe; no login/auth/DRM bypass','candidate':{'author':AUTHOR,'title':TITLE,'year':2020,'knownPublicIndexId':'T15521643'},'guessedOpaqueIdentifierCount':0,'loginBypass':False,'drmRequestExecuted':False,'contentAssetActionExecuted':False,'riss':{},'nanet':{},'docviewer':{},'fullLengthPdfAcquired':False}

    # RISS: resolve exact current target only from current public author-search.
    sm,sb,st=fetch(op,rr,RISS_SEARCH);assert sm['status']==200
    rep['riss']['search']=sm;(OUT/'riss-search.html').write_text(st,encoding='utf-8')
    links=riss_links(st,sm.get('finalUrl') or RISS_SEARCH);rep['riss']['candidateLinks']=links
    chosen=None;rt='';probes=[]
    for u in links:
        mm,b,t=fetch(op,rr,u,ref=RISS_SEARCH);rec={'meta':mm,'identityMatch':identity(t),'rissIds':sorted(set(re.findall(r'\bT\d{7,12}\b',t))),'controls':sorted(set(re.findall(r'control_no=([a-f0-9]{16,64})',html.unescape((mm.get('finalUrl') or '')+t),re.I)))};probes.append(rec)
        if rec['identityMatch'] and chosen is None:chosen=mm.get('finalUrl') or u;rt=t
    rep['riss']['probes']=probes
    assert chosen is not None,'exact Kim Youngjin target not resolved from current RISS search'
    (OUT/'riss-detail.html').write_text(rt,encoding='utf-8')
    rep['riss']['detailUrl']=chosen
    rep['riss']['rissIds']=sorted(set(re.findall(r'\bT\d{7,12}\b',rt)))
    rep['riss']['controls']=sorted(set(re.findall(r'control_no=([a-f0-9]{16,64})',html.unescape(chosen+rt),re.I)))
    rep['riss']['docControlNo']=hidden(rt,'controlNo') or hidden(rt,'docControlNo');rep['riss']['docType']=hidden(rt,'docType')
    rep['riss']['ucis']=sorted(set(re.findall(r'I804:[A-Za-z0-9-]+',rt)))
    tuples=[]
    for m in re.finditer(r"ButtonSet\.fulltextDownload\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'",rt,re.I):
        x={'controlNo':m.group(1),'pMatType':m.group(2),'pSubmatType':m.group(3),'fulltextKind':m.group(4)}
        if x not in tuples:tuples.append(x)
    rep['riss']['fulltextTuples']=tuples
    union=rt;sf=[]
    for u in scripts(rt,chosen,{'www.riss.kr','riss.kr'}):
        mm,b,t=fetch(op,rr,u,ref=chosen,limit=3_000_000);sf.append(mm)
        if t:union+='\n'+t
    rep['riss']['scriptFetches']=sf
    dc=rep['riss']['docControlNo'];dt=rep['riss']['docType'];rep['riss']['originalCheck']=None
    if dc and dt and '/detail/originalCheck.do' in union and original_contract(union):
        mm,b,t=fetch(op,rr,'https://www.riss.kr/detail/originalCheck.do',data=urlencode({'controlNo':dc,'docType':dt}).encode(),ref=chosen,limit=100000);mm['body']=compact(t,2000);rep['riss']['originalCheck']=mm

    # NANET: resolve current exact control only from a public exact-title search; no guessed control number.
    nm,nb,nt=fetch(op,rr,NANET_SEARCH);rep['nanet']['search']=nm
    if nt:(OUT/'nanet-search.html').write_text(nt,encoding='utf-8')
    controls=nanet_control_from_search(nt);rep['nanet']['candidateControls']=controls
    exact=[]
    for c in controls[:10]:
        u=f'https://dl.nanet.go.kr/detail/{c}';mm,b,t=fetch(op,rr,u,ref=NANET_SEARCH,limit=4_000_000);match=bool(mm['status']==200 and AUTHOR in t and TITLE in t)
        exact.append({'control':c,'meta':mm,'identityMatch':match})
        if match and 'control' not in rep['nanet']:
            rep['nanet']['control']=c;rep['nanet']['detail']=mm;(OUT/'nanet-detail.html').write_text(t,encoding='utf-8')
            rep['nanet']['viewButtonObserved']=bool(re.search(rf"viewDoc\([^\)]*['\"]{re.escape(c)}['\"]",t,re.I));rep['nanet']['downloadButtonObserved']=bool(re.search(rf"downloadDoc\([^\)]*['\"]{re.escape(c)}['\"]",t,re.I))
    rep['nanet']['probes']=exact

    # If exact current NANET control was resolved, follow only its public viewer bootstrap and stop at protected-content signals.
    if rep['nanet'].get('control'):
        c=rep['nanet']['control'];inner='https://dl.nanet.go.kr/script/search/inner.js';im,ib,it=fetch(op,rr,inner,ref=f'https://dl.nanet.go.kr/detail/{c}',limit=3_000_000);rep['nanet']['innerJs']=im
        dispatcher=bool('viewDocBySingleCount' in it and '/view/callViewer.do' in it and 'orgId=dl' in it and 'linkSysId=NADL' in it);rep['nanet']['viewerDispatcherObserved']=dispatcher
        rep['nanet']['downloadLoginGateObserved']=bool('downloadDoc' in it and '/login.do' in it)
        if rep['nanet'].get('viewButtonObserved') and dispatcher:
            vu=f'https://dl.nanet.go.kr/view/callViewer.do?controlNo={c}&orgId=dl&linkSysId=NADL';vm,vb,vt=fetch(op,rr,vu,ref=f'https://dl.nanet.go.kr/detail/{c}',limit=2_000_000);rep['nanet']['viewerBootstrap']=vm
            hops=[]
            for pat in [r"location\.replace\(\s*['\"]([^'\"]+)",r"location\.href\s*=\s*['\"]([^'\"]+)"]:
                for x in re.findall(pat,vt,re.I):
                    u=urljoin(vm.get('finalUrl') or vu,html.unescape(x));
                    if allowed(u) and u not in hops:hops.append(u)
            rep['nanet']['viewerNextHops']=hops
            dv=[u for u in hops if (urlparse(u).hostname or '').lower()=='docviewer.nanet.go.kr']
            if dv:
                du=dv[0];dm,db,dtxt=fetch(op,rr,du,ref=vu,limit=3_000_000);rep['docviewer']['html']=dm;alltxt=dtxt;dsm=[]
                for su in scripts(dtxt,dm.get('finalUrl') or du,{'docviewer.nanet.go.kr'}):
                    mm,b,t=fetch(op,rr,su,ref=du,limit=8_000_000);dsm.append(mm)
                    if t:alltxt+='\n'+t
                rep['docviewer']['scriptFetches']=dsm;signals=[]
                for tok in ['VUE_APP_MORE_PATH','VUE_APP_USE_SEC','drm','aes-256-cbc','/docinfo/','/page/','/pagec/','/regDoc']:
                    if tok.lower() in alltxt.lower():signals.append(tok)
                rep['docviewer']['protectedContentSignals']=signals
                rep['docviewer']['disposition']='DRM_OR_DEDICATED_VIEWER_SIGNAL_OBSERVED_STOP_NO_REPLAY' if any(x.lower() in {'drm','vue_app_more_path','vue_app_use_sec','aes-256-cbc'} for x in signals) else 'PUBLIC_VIEWER_STATIC_ONLY_NO_CONTENT_REPLAY'

    (OUT/'report.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    summary={'rissIds':rep['riss'].get('rissIds'),'rissControls':rep['riss'].get('controls'),'rissDocControlNo':dc,'rissDocType':dt,'rissUcis':rep['riss'].get('ucis'),'rissFulltextTuples':tuples,'rissOriginalCheck':rep['riss'].get('originalCheck'),'nanetCandidateControls':controls,'nanetExactControl':rep['nanet'].get('control'),'nanetViewerNextHops':rep['nanet'].get('viewerNextHops',[]),'docviewerDisposition':rep['docviewer'].get('disposition'),'protectedContentSignals':rep['docviewer'].get('protectedContentSignals',[]),'fullLengthPdfAcquired':False,'guessedOpaqueIdentifierCount':0,'contentAssetActionExecuted':False}
    (OUT/'summary.txt').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps(summary,ensure_ascii=False,indent=2))
    assert 'T15521643' in rep['riss']['rissIds']
    assert rep['guessedOpaqueIdentifierCount']==0 and rep['drmRequestExecuted'] is False and rep['contentAssetActionExecuted'] is False
    return 0
if __name__=='__main__':raise SystemExit(main())
