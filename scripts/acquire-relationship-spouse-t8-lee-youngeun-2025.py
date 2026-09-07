#!/usr/bin/env python3
from __future__ import annotations

import hashlib, json, re
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT=Path('acquisition-lee-youngeun-2025'); OUT.mkdir(exist_ok=True)
PRIVATE=Path('acquisition-lee-youngeun-2025-private'); PRIVATE.mkdir(exist_ok=True)
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/4.0; public-resource-verification)'
MAX=45*1024*1024
TITLE='『적천수천미』 ｢여명장｣의 현대적 고찰 - 부성용신론(夫星用神論)을 중심으로'
KY_ARTICLE='https://scholar.kyobobook.co.kr/article/detail/4010070551816'
PUBLISHER='https://brhistory.re.kr'

class RD(HTTPRedirectHandler):
    def __init__(self): super().__init__(); self.chain=[]
    def redirect_request(self,req,fp,code,msg,headers,newurl): self.chain.append(newurl); return super().redirect_request(req,fp,code,msg,headers,newurl)

def fetch(url,data=None,referer=None,ajax=False):
    rd=RD(); op=build_opener(rd)
    h={'User-Agent':UA,'Accept':'text/html,application/json,application/pdf,*/*;q=0.5'}
    if data is not None:h['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
    if referer:h['Referer']=referer
    if ajax:h['X-Requested-With']='XMLHttpRequest'
    m={'requestedUrl':url,'method':'POST' if data is not None else 'GET','status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bodyBytes':0,'sha256':None,'error':None}
    try:
        with op.open(Request(url,data=data,headers=h),timeout=35) as r:
            b=r.read(MAX);m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirectChain=rd.chain,contentType=r.headers.get('Content-Type'),bodyBytes=len(b),sha256=hashlib.sha256(b).hexdigest());return m,b
    except Exception as e:m['redirectChain']=rd.chain;m['error']=f'{type(e).__name__}: {e}';return m,b''
def dec(b):
    for enc in ('utf-8','euc-kr','cp949'):
        try:return b.decode(enc)
        except UnicodeDecodeError: pass
    return b.decode('utf-8',errors='replace')
def pdf(m,b):return b.startswith(b'%PDF-') or 'pdf' in (m.get('contentType') or '').lower()
def links(src,base):
    vals=set(re.findall(r'https?://[^\s"\'<>]+',src))
    vals.update(urljoin(base,x.replace('&amp;','&')) for x in re.findall(r'(?:href|src|action)=["\']([^"\']+)',src,re.I))
    for pat in (r'["\']([^"\']*(?:builderDownload|download|pdf|viewer|fulltext|original|article|file)[^"\']*)["\']',r'url\s*[:=]\s*["\']([^"\']+)["\']'):
        for x in re.findall(pat,src,re.I):
            if x.startswith('/') or x.startswith('http'):vals.add(urljoin(base,x.replace('&amp;','&')))
    return sorted(x.rstrip(').,;') for x in vals)

def save_text(label,b):
    t=dec(b);(OUT/f'{label}.txt').write_text(t,encoding='utf-8');return t

def main():
    rep={'purpose':'public Lee Youngeun 2025 fulltext acquisition only; no auth/paywall bypass','candidate':{'author':'이영은','year':2025,'title':TITLE,'doi':'10.55793/jkhc.2025.24.305','kyoboArticleId':'4010070551816'},'probes':[],'issueRecords':[],'targetRecords':[],'pdfs':[]}

    # 1. Exact public Kyobo Scholar detail.
    m,b=fetch(KY_ARTICLE);m['label']='kyobo-detail';t=save_text('kyobo-detail',b) if b else '';m['containsTarget']='적천수천미' in t and '이영은' in t;m['interestingLines']=[{'line':n,'text':line[:3500]} for n,line in enumerate(t.splitlines(),1) if re.search(r'4010070551816|적천수천미|이영은|builderDownload|원문보기|원문저장|pdf|download|barcode|artId|kyoboKey|viewer|fulltext',line,re.I)][:500];m['candidateUrls']=links(t,m.get('finalUrl') or KY_ARTICLE)[:500];rep['probes'].append(m)

    # Public routes exposed directly on detail HTML.
    candidate=[]
    for u in m.get('candidateUrls',[]):
        low=u.lower()
        if any(k in low for k in ('builderdownload','download','pdf','viewer','fulltext','original')):candidate.append(('kyobo-html',u))

    # 2. Reproduce publisher's exact 2025 issue feed / target search.
    referer=PUBLISHER+'/subList/32000003815'
    common={'pageIndex':'1','strQuery':"@ws { IDX_PUBC_NUM(HASALL|'3444'|0|0) }",'searchCd':'A','trgtIsuInsttCd':'20885','trgtUseLangCode':'SC00000016','searchCondition':'productNm','reFlag':'Y','searchKeyword':'적천수천미 여명장','journalCd':'3444','bookYear':'2025','bookCd':''}
    ep_book=PUBLISHER+'/module/thesis/selectKyoboThesisBookListAjax.ink'
    ep_list=PUBLISHER+'/module/thesis/selectKyoboThesisNttListAjax.ink'
    mm,bb=fetch(ep_book,urlencode(common).encode(),referer,True);tt=save_text('publisher-book-list-2025',bb) if bb else '';mm['label']='publisher-book-list-2025';rep['probes'].append(mm)
    try:
        j=json.loads(tt);records=j.get('result',j if isinstance(j,list) else []);rep['issueRecords']=records if isinstance(records,list) else []
    except Exception:rep['bookParseError']=True

    books=[]
    for row in rep['issueRecords']:
        code=str(row.get('BOOK_CD') or row.get('bookCd') or '');name=str(row.get('BOOK_NM') or row.get('bookNm') or '')
        if code:books.append((code,name))
    # Always query all 2025 issue ids returned; target should be issue 24.
    combined=''
    for code,name in books[:30]:
        form={**common,'bookCd':code}
        pm,pb=fetch(ep_list,urlencode(form).encode(),referer,True);pt=save_text(f'publisher-issue-{code}',pb) if pb else '';pm['label']=f'publisher-issue-{code}';pm['bookName']=name;pm['containsTarget']='적천수천미' in pt and '이영은' in pt;rep['probes'].append(pm)
        if pm['containsTarget']:
            combined+='\n'+pt
            idx=pt.find('적천수천미');frag=pt[max(0,idx-12000):idx+18000];(OUT/f'target-fragment-{code}.html').write_text(frag,encoding='utf-8')
            for vm in re.findall(r"fnViewPdf\('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'",frag):
                rec={'bookCd':code,'bookName':name,'barcode':vm[0],'artId':vm[1],'kyoboKey':vm[2],'scholarBase':vm[3]}
                rec['viewUrl']=f'{vm[3]}/builderDownload?artId={vm[1]}&barcode={vm[0]}&kyoboKey={vm[2]}&gb=view'
                rec['downloadUrl']=f'{vm[3]}/builderDownload?artId={vm[1]}&barcode={vm[0]}&kyoboKey={vm[2]}&gb=down'
                rep['targetRecords'].append(rec);candidate.extend([('publisher-view',rec['viewUrl']),('publisher-download',rec['downloadUrl'])])
            # Also parse any direct Scholar article detail ids.
            for u in links(frag,referer):
                if 'scholar.kyobobook.co.kr' in u and any(k in u.lower() for k in ('download','pdf','viewer','article')):candidate.append(('publisher-link',u))

    # 3. Follow only explicitly exposed public original/view/download routes. Stop on login/paywall HTML.
    seen=set()
    for i,(origin,u) in enumerate(candidate[:100]):
        if u in seen:continue
        seen.add(u);fm,fb=fetch(u,referer=KY_ARTICLE);fm['label']=f'followup-{i:03d}';fm['origin']=origin;fm['directPdf']=pdf(fm,fb)
        if fm['directPdf']:
            p=PRIVATE/f'candidate-{len(rep["pdfs"])+1:02d}.pdf';p.write_bytes(fb);rec={'sourceUrl':fm.get('finalUrl') or u,'sha256':hashlib.sha256(fb).hexdigest(),'bytes':len(fb),'savedAs':p.name,'origin':origin};rep['pdfs'].append(rec);fm['savedAs']=p.name
        elif fb:
            ft=dec(fb);fm['accessBoundary']={'login':bool(re.search(r'로그인|login|sign.?in',ft,re.I)),'purchase':bool(re.search(r'구매|결제|purchase|paywall|이용권',ft,re.I)),'containsTarget':'적천수천미' in ft or '4010070551816' in ft};(OUT/f'followup-{i:03d}.txt').write_text(ft[:2000000],encoding='utf-8')
        rep['probes'].append(fm)
        # Keep all direct PDFs for identity verification; no access-control circumvention attempted.

    rep['directPdfAcquired']=len(rep['pdfs'])>0
    (OUT/'report.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[f'directPdfAcquired={rep["directPdfAcquired"]}',f'issueRecords={[(r.get("BOOK_CD"),r.get("BOOK_NM")) for r in rep["issueRecords"]]}',f'targetRecords={rep["targetRecords"]}']
    for p in rep['pdfs']:lines.append(f'PDF sha={p["sha256"]} bytes={p["bytes"]} origin={p["origin"]} url={p["sourceUrl"]}')
    for x in rep['probes']:
        if x.get('containsTarget') or x.get('directPdf') or x.get('accessBoundary') or x.get('error'):lines.append(f'PROBE {x["label"]} status={x["status"]} type={x["contentType"]} bytes={x["bodyBytes"]} pdf={x.get("directPdf")} target={x.get("containsTarget")} boundary={x.get("accessBoundary")} final={x["finalUrl"]} err={x["error"]}')
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8');print('\n'.join(lines));return 0
if __name__=='__main__':raise SystemExit(main())
