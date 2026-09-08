#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, time
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

OUT=Path('acquisition-park-oesuk-2023');OUT.mkdir(exist_ok=True)
TITLE='四柱命理學 古典에 나타난 六親의 原理와 關係에 대한 硏究';AUTHOR='박외숙'
RISS_ID='T16818829';RISS_CONTROL='b4338a3915d9039bffe0bdc3ef48d419'
RISS_DETAIL=f'https://www.riss.kr/search/detail/DetailView.do?control_no={RISS_CONTROL}&p_mat_type=be54d9b8bc7cdb09'
NANET_CONTROL='KDMT12023000053361';NANET_DETAIL=f'https://dl.nanet.go.kr/detail/{NANET_CONTROL}'
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/21.0; Park-Oesuk-current-public-only)';MAX=20*1024*1024

class RR(HTTPRedirectHandler):
    def __init__(self):super().__init__();self.chain=[]
    def redirect_request(self,req,fp,code,msg,headers,newurl):self.chain.append({'code':code,'url':newurl});return super().redirect_request(req,fp,code,msg,headers,newurl)

def decode(b):
    for e in ('utf-8','euc-kr','cp949'):
        try:return b.decode(e)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')
def allowed(u):
    h=(urlparse(u).hostname or '').lower()
    return h in {'www.riss.kr','dl.nanet.go.kr','docviewer.nanet.go.kr'}
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
                b=r.read(limit);m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirectChain=list(rr.chain),contentType=r.headers.get('Content-Type'),bytes=len(b),sha256=hashlib.sha256(b).hexdigest());return m,b,('' if b.startswith(b'%PDF-') else decode(b))
        except Exception as e:m['error']=f'{type(e).__name__}: {e}';last=m;time.sleep(n)
    return last,b'', ''
def scripts(t,base,hosts):
    out=[]
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)',t,re.I):
        u=urljoin(base,html.unescape(raw));h=(urlparse(u).hostname or '').lower()
        if h in hosts and u not in out:out.append(u)
    return out[:100]
def hidden(t,name):
    pats=[rf'id=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)',rf'name=["\']{re.escape(name)}["\'][^>]*value=["\']([^"\']*)']
    for p in pats:
        m=re.search(p,t,re.I|re.S)
        if m:return html.unescape(m.group(1))
    return None

def main():
    jar=CookieJar();rr=RR();op=build_opener(HTTPCookieProcessor(jar),rr)
    rep={'purpose':'Park Oesuk 2023 exact public RISS/NANET acquisition; no login/auth/DRM bypass','candidate':{'author':AUTHOR,'title':TITLE,'riss':RISS_ID,'rissControl':RISS_CONTROL,'uci':'I804:41002-000000057593','nanet':NANET_CONTROL,'extent':'vi, 190 p.'},'guessedOpaqueIdentifierCount':0,'loginBypass':False,'drmRequestExecuted':False,'contentAssetActionExecuted':False,'riss':{},'nanet':{},'docviewer':{},'fullLengthPdfAcquired':False}

    # RISS exact target + site-authored originalCheck only.
    rm,rb,rt=fetch(op,rr,RISS_DETAIL);rep['riss']['detail']=rm
    rep['riss']['identityObserved']=bool(rm['status']==200 and AUTHOR in rt and '六親' in rt)
    dc=hidden(rt,'controlNo') or hidden(rt,'docControlNo');dt=hidden(rt,'docType')
    rep['riss']['docControlNo']=dc;rep['riss']['docType']=dt
    union=rt;sm=[]
    for u in scripts(rt,rm.get('finalUrl') or RISS_DETAIL,{'www.riss.kr'}):
        mm,b,t=fetch(op,rr,u,ref=RISS_DETAIL,limit=2_000_000);sm.append(mm)
        if t:union+='\n'+t
    rep['riss']['scriptFetches']=sm
    exact_contract=bool('/detail/originalCheck.do' in union and 'controlNo' in union and 'docType' in union and dc and dt)
    rep['riss']['originalCheckContractObserved']=exact_contract
    rep['riss']['originalCheck']=None
    if exact_contract:
        u='https://www.riss.kr/detail/originalCheck.do';data=urlencode({'controlNo':dc,'docType':dt}).encode('utf-8')
        mm,b,t=fetch(op,rr,u,data=data,ref=RISS_DETAIL,limit=100000);mm['body']=re.sub(r'\s+',' ',t).strip()[:2000];rep['riss']['originalCheck']=mm

    # National Assembly exact target buttons and current public static dispatcher.
    nm,nb,nt=fetch(op,rr,NANET_DETAIL);rep['nanet']['detail']=nm
    rep['nanet']['identityObserved']=bool(nm['status']==200 and AUTHOR in nt and NANET_CONTROL in nt)
    view_pat=rf"viewDoc\([^\)]*['\"]{re.escape(NANET_CONTROL)}['\"][^\)]*['\"]1['\"]"
    down_pat=rf"downloadDoc\([^\)]*['\"]{re.escape(NANET_CONTROL)}['\"][^\)]*['\"]1['\"]"
    rep['nanet']['viewButtonObserved']=bool(re.search(view_pat,nt,re.I));rep['nanet']['downloadButtonObserved']=bool(re.search(down_pat,nt,re.I))
    inner='https://dl.nanet.go.kr/script/search/inner.js';im,ib,it=fetch(op,rr,inner,ref=NANET_DETAIL,limit=3_000_000);rep['nanet']['innerJs']=im
    dispatcher=bool('viewDocBySingleCount' in it and '/view/callViewer.do' in it and 'orgId=dl' in it and 'linkSysId=NADL' in it)
    login_gate=bool('downloadDoc' in it and ('!isLogin' in it or 'isLogin' in it) and '/login.do' in it)
    rep['nanet']['viewerDispatcherObserved']=dispatcher;rep['nanet']['downloadLoginGateObserved']=login_gate
    rep['nanet']['viewerBootstrap']=None
    if rep['nanet']['viewButtonObserved'] and dispatcher:
        vu=f'https://dl.nanet.go.kr/view/callViewer.do?controlNo={NANET_CONTROL}&orgId=dl&linkSysId=NADL'
        vm,vb,vt=fetch(op,rr,vu,ref=NANET_DETAIL,limit=2_000_000);rep['nanet']['viewerBootstrap']=vm
        hops=[]
        for pat in [r"location\.replace\(\s*['\"]([^'\"]+)",r"location\.href\s*=\s*['\"]([^'\"]+)"]:
            for x in re.findall(pat,vt,re.I):
                u=urljoin(vm.get('finalUrl') or vu,html.unescape(x));
                if u not in hops:hops.append(u)
        rep['nanet']['viewerNextHops']=hops
        dv=[u for u in hops if (urlparse(u).hostname or '').lower()=='docviewer.nanet.go.kr']
        if dv:
            du=dv[0];dm,db,dtxt=fetch(op,rr,du,ref=vu,limit=3_000_000);rep['docviewer']['html']=dm;alltxt=dtxt;dsm=[]
            for su in scripts(dtxt,dm.get('finalUrl') or du,{'docviewer.nanet.go.kr'}):
                mm,b,t=fetch(op,rr,su,ref=du,limit=8_000_000);dsm.append(mm)
                if t:alltxt+='\n'+t
            rep['docviewer']['scriptFetches']=dsm
            signals=[]
            for token in ['VUE_APP_MORE_PATH','VUE_APP_USE_SEC','drm','aes-256-cbc','/docinfo/','/page/','/pagec/','/regDoc']:
                if token.lower() in alltxt.lower():signals.append(token)
            rep['docviewer']['protectedContentSignals']=signals
            rep['docviewer']['disposition']='DRM_OR_DEDICATED_VIEWER_SIGNAL_OBSERVED_STOP_NO_REPLAY' if any(x.lower() in {'drm','vue_app_more_path','vue_app_use_sec','aes-256-cbc'} for x in signals) else 'PUBLIC_VIEWER_STATIC_ONLY_NO_CONTENT_REPLAY'

    (OUT/'report.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    summary={'rissIdentity':rep['riss'].get('identityObserved'),'rissDocControlNo':dc,'rissDocType':dt,'rissOriginalCheck':rep['riss'].get('originalCheck'),'nanetIdentity':rep['nanet'].get('identityObserved'),'viewButtonObserved':rep['nanet'].get('viewButtonObserved'),'downloadButtonObserved':rep['nanet'].get('downloadButtonObserved'),'viewerDispatcherObserved':rep['nanet'].get('viewerDispatcherObserved'),'downloadLoginGateObserved':rep['nanet'].get('downloadLoginGateObserved'),'viewerNextHops':rep['nanet'].get('viewerNextHops',[]),'docviewerDisposition':rep['docviewer'].get('disposition'),'protectedContentSignals':rep['docviewer'].get('protectedContentSignals',[]),'fullLengthPdfAcquired':False,'guessedOpaqueIdentifierCount':0,'drmRequestExecuted':False}
    (OUT/'summary.txt').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(json.dumps(summary,ensure_ascii=False,indent=2))
    assert rep['candidate']['riss']==RISS_ID and rep['candidate']['nanet']==NANET_CONTROL
    assert rep['guessedOpaqueIdentifierCount']==0 and rep['drmRequestExecuted'] is False and rep['contentAssetActionExecuted'] is False
    assert rep['riss']['identityObserved'] is True and rep['nanet']['identityObserved'] is True
    return 0
if __name__=='__main__':raise SystemExit(main())
