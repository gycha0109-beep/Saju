#!/usr/bin/env python3
from __future__ import annotations

import hashlib, io, json, re
from pathlib import Path
from urllib.parse import urlencode, urljoin
from urllib.request import Request, build_opener, HTTPRedirectHandler
from pypdf import PdfReader

OUT = Path('acquisition-lee-ockhwa-2024'); OUT.mkdir(exist_ok=True)
PRIVATE = Path('acquisition-lee-ockhwa-2024-private'); PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/5.0; public-resource-verification)'
MAX = 45 * 1024 * 1024
TITLE = '명리사상에 나타난 육친가변성'
KCI_ARTICLE = 'ART003150783'
DOI = '10.55793/jkhc.2024.23.177'
KY_ARTICLE_ID = '4010070433587'
KY_ARTICLE = f'https://scholar.kyobobook.co.kr/article/detail/{KY_ARTICLE_ID}'
PUBLISHER = 'https://brhistory.re.kr'
KEYWORDS = ('배우자', '부부', '남편', '아내', '처', '남명', '여명', '일지', '일명', '동성', '성별', '육친가변')

class RD(HTTPRedirectHandler):
    def __init__(self): super().__init__(); self.chain=[]
    def redirect_request(self,req,fp,code,msg,headers,newurl):
        self.chain.append(newurl)
        return super().redirect_request(req,fp,code,msg,headers,newurl)

def fetch(url,data=None,referer=None,ajax=False):
    rd=RD(); op=build_opener(rd)
    h={'User-Agent':UA,'Accept':'text/html,application/json,application/pdf,*/*;q=0.5'}
    if data is not None: h['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
    if referer: h['Referer']=referer
    if ajax: h['X-Requested-With']='XMLHttpRequest'
    m={'requestedUrl':url,'method':'POST' if data is not None else 'GET','status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bodyBytes':0,'sha256':None,'error':None}
    try:
        with op.open(Request(url,data=data,headers=h),timeout=35) as r:
            b=r.read(MAX)
            m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirectChain=rd.chain,contentType=r.headers.get('Content-Type'),bodyBytes=len(b),sha256=hashlib.sha256(b).hexdigest())
            return m,b
    except Exception as e:
        m['redirectChain']=rd.chain; m['error']=f'{type(e).__name__}: {e}'
        return m,b''

def dec(b):
    for enc in ('utf-8','euc-kr','cp949'):
        try:return b.decode(enc)
        except UnicodeDecodeError:pass
    return b.decode('utf-8',errors='replace')

def pdf(m,b): return b.startswith(b'%PDF-') or 'pdf' in (m.get('contentType') or '').lower()

def links(src,base):
    vals=set(re.findall(r'https?://[^\s"\'<>]+',src))
    vals.update(urljoin(base,x.replace('&amp;','&')) for x in re.findall(r'(?:href|src|action)=["\']([^"\']+)',src,re.I))
    for pat in (r'["\']([^"\']*(?:builderDownload|download|pdf|viewer|fulltext|original|article|file)[^"\']*)["\']',r'url\s*[:=]\s*["\']([^"\']+)["\']'):
        for x in re.findall(pat,src,re.I):
            if x.startswith('/') or x.startswith('http'): vals.add(urljoin(base,x.replace('&amp;','&')))
    return sorted(x.rstrip(').,;') for x in vals)

def save_text(label,b):
    t=dec(b); (OUT/f'{label}.txt').write_text(t,encoding='utf-8'); return t

def extract_pdf_text(b):
    result={'pageCount':0,'hits':[],'error':None}
    try:
        reader=PdfReader(io.BytesIO(b)); result['pageCount']=len(reader.pages)
        for i,page in enumerate(reader.pages,1):
            text=(page.extract_text() or '').replace('\x00',' ')
            if any(k in text for k in KEYWORDS):
                lines=[x.strip() for x in text.splitlines() if x.strip()]
                matched=[]
                for n,line in enumerate(lines):
                    if any(k in line for k in KEYWORDS):
                        lo=max(0,n-2); hi=min(len(lines),n+3)
                        matched.append(' / '.join(lines[lo:hi])[:1800])
                result['hits'].append({'physicalPdfPage':i,'snippets':matched[:12]})
        return result
    except Exception as e:
        result['error']=f'{type(e).__name__}: {e}'; return result

def main():
    rep={'purpose':'public Lee Ockhwa 2024 fulltext acquisition only; no auth/paywall bypass','candidate':{'author':'이옥화','year':2024,'title':TITLE,'kciArticleId':KCI_ARTICLE,'doi':DOI,'kyoboArticleId':KY_ARTICLE_ID},'probes':[],'issueRecords':[],'targetRecords':[],'pdfs':[]}
    m,b=fetch(KY_ARTICLE); m['label']='kyobo-detail'; t=save_text('kyobo-detail',b) if b else ''; m['containsTarget']=TITLE in t and ('이옥화' in t or KY_ARTICLE_ID in t); m['candidateUrls']=links(t,m.get('finalUrl') or KY_ARTICLE)[:500]; rep['probes'].append(m)
    candidate=[]
    for u in m.get('candidateUrls',[]):
        if any(k in u.lower() for k in ('builderdownload','download','pdf','viewer','fulltext','original')): candidate.append(('kyobo-html',u))

    referer=PUBLISHER+'/subList/32000003815'
    common={'pageIndex':'1','strQuery':"@ws { IDX_PUBC_NUM(HASALL|'3444'|0|0) }",'searchCd':'A','trgtIsuInsttCd':'20885','trgtUseLangCode':'SC00000016','searchCondition':'productNm','reFlag':'Y','searchKeyword':TITLE,'journalCd':'3444','bookYear':'2024','bookCd':''}
    ep_book=PUBLISHER+'/module/thesis/selectKyoboThesisBookListAjax.ink'
    ep_list=PUBLISHER+'/module/thesis/selectKyoboThesisNttListAjax.ink'
    mm,bb=fetch(ep_book,urlencode(common).encode(),referer,True); tt=save_text('publisher-book-list-2024',bb) if bb else ''; mm['label']='publisher-book-list-2024'; rep['probes'].append(mm)
    try:
        j=json.loads(tt); records=j.get('result',j if isinstance(j,list) else []); rep['issueRecords']=records if isinstance(records,list) else []
    except Exception: rep['bookParseError']=True
    books=[]
    for row in rep['issueRecords']:
        code=str(row.get('BOOK_CD') or row.get('bookCd') or ''); name=str(row.get('BOOK_NM') or row.get('bookNm') or '')
        if code: books.append((code,name))
    for code,name in books[:30]:
        form={**common,'bookCd':code}
        pm,pb=fetch(ep_list,urlencode(form).encode(),referer,True); pt=save_text(f'publisher-issue-{code}',pb) if pb else ''; pm['label']=f'publisher-issue-{code}'; pm['bookName']=name; pm['containsTarget']=TITLE in pt and ('이옥화' in pt or KY_ARTICLE_ID in pt); rep['probes'].append(pm)
        if pm['containsTarget']:
            idx=pt.find(TITLE); frag=pt[max(0,idx-14000):idx+22000]; (OUT/f'target-fragment-{code}.html').write_text(frag,encoding='utf-8')
            for vm in re.findall(r"fnViewPdf\('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'",frag):
                rec={'bookCd':code,'bookName':name,'barcode':vm[0],'artId':vm[1],'kyoboKey':vm[2],'scholarBase':vm[3]}
                rec['viewUrl']=f'{vm[3]}/builderDownload?artId={vm[1]}&barcode={vm[0]}&kyoboKey={vm[2]}&gb=view'
                rec['downloadUrl']=f'{vm[3]}/builderDownload?artId={vm[1]}&barcode={vm[0]}&kyoboKey={vm[2]}&gb=down'
                rep['targetRecords'].append(rec); candidate.extend([('publisher-view',rec['viewUrl']),('publisher-download',rec['downloadUrl'])])
            for u in links(frag,referer):
                if 'scholar.kyobobook.co.kr' in u and any(k in u.lower() for k in ('download','pdf','viewer','article')): candidate.append(('publisher-link',u))

    seen=set()
    for i,(origin,u) in enumerate(candidate[:100]):
        if u in seen: continue
        seen.add(u); fm,fb=fetch(u,referer=KY_ARTICLE); fm['label']=f'followup-{i:03d}'; fm['origin']=origin; fm['directPdf']=pdf(fm,fb)
        if fm['directPdf']:
            p=PRIVATE/f'candidate-{len(rep["pdfs"])+1:02d}.pdf'; p.write_bytes(fb)
            tx=extract_pdf_text(fb)
            rec={'sourceUrl':fm.get('finalUrl') or u,'sha256':hashlib.sha256(fb).hexdigest(),'bytes':len(fb),'savedAs':p.name,'origin':origin,'pageCount':tx['pageCount'],'textExtractionError':tx['error'],'keywordHits':tx['hits']}
            rep['pdfs'].append(rec); fm['savedAs']=p.name
        elif fb:
            ft=dec(fb); fm['accessBoundary']={'login':bool(re.search(r'로그인|login|sign.?in',ft,re.I)),'purchase':bool(re.search(r'구매|결제|purchase|paywall|이용권',ft,re.I)),'containsTarget':TITLE in ft or KY_ARTICLE_ID in ft}
        rep['probes'].append(fm)

    rep['directPdfAcquired']=len(rep['pdfs'])>0
    (OUT/'report.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[f'directPdfAcquired={rep["directPdfAcquired"]}',f'issueRecords={[(r.get("BOOK_CD"),r.get("BOOK_NM")) for r in rep["issueRecords"]]}',f'targetRecords={rep["targetRecords"]}']
    for p in rep['pdfs']:
        lines.append(f'PDF sha={p["sha256"]} bytes={p["bytes"]} pages={p["pageCount"]} origin={p["origin"]} url={p["sourceUrl"]}')
        for hit in p['keywordHits']:
            lines.append(f'PAGE {hit["physicalPdfPage"]}: ' + ' || '.join(hit['snippets'][:6]))
    for x in rep['probes']:
        if x.get('containsTarget') or x.get('directPdf') or x.get('accessBoundary') or x.get('error'): lines.append(f'PROBE {x["label"]} status={x["status"]} type={x["contentType"]} bytes={x["bodyBytes"]} pdf={x.get("directPdf")} target={x.get("containsTarget")} boundary={x.get("accessBoundary")} final={x["finalUrl"]} err={x["error"]}')
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8'); print('\n'.join(lines)); return 0

if __name__=='__main__': raise SystemExit(main())
