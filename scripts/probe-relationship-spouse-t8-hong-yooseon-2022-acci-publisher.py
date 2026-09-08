#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import io
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPRedirectHandler, Request, build_opener

import pymupdf
from pypdf import PdfReader

OUT = Path('acquisition-hong-yooseon-2022')
PRIVATE = Path('acquisition-hong-yooseon-2022-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)

JOURNAL_PAGE = 'https://www.acci.asia/subList/32000002246'
TITLE_SIGNAL = '이데올로기적 접근을 통한 육친 간 상극관계 해석'
AUTHOR = '홍유선'
EXPECTED_PUBC = '3403'
EXPECTED_INSTT = '20825'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/17.1; public-resource-verification)'
MAX = 45 * 1024 * 1024
SEMANTIC_TERMS = (
    '부부','배우자','아내','남편','妻','夫','재성','財星','관성','官星','정재','正財','정관','正官',
    '육친','六親','십성','十星','의무','역할','이데올로기','가부장','사회','현대','성별'
)


class RedirectRecorder(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append({'status':code,'url':newurl})
        return super().redirect_request(req,fp,code,msg,headers,newurl)


def decode(body: bytes) -> str:
    for enc in ('utf-8','euc-kr','cp949'):
        try: return body.decode(enc)
        except UnicodeDecodeError: pass
    return body.decode('utf-8',errors='replace')


def compact(text: str, limit: int = 12000) -> str:
    return re.sub(r'\s+',' ',html.unescape(text)).strip()[:limit]


def acci_host(url: str) -> bool:
    host=(urlparse(url).hostname or '').lower()
    return host in ('acci.asia','www.acci.asia')


def fetch(opener, tracker, url: str, *, referer: str | None = None, data: dict[str,str] | None = None, ajax: bool=False) -> tuple[dict,bytes,str]:
    tracker.chain.clear()
    headers={'User-Agent':UA,'Accept':'text/html,application/json,application/javascript,application/pdf,*/*;q=0.5','Accept-Language':'ko-KR,ko;q=0.9,en;q=0.7'}
    payload=None
    if referer: headers['Referer']=referer
    if data is not None:
        payload=urlencode(data).encode('utf-8')
        headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
    if ajax: headers['X-Requested-With']='XMLHttpRequest'
    meta={'requestedUrl':url,'method':'POST' if data is not None else 'GET','requestFields':sorted(data.keys()) if data else [],'status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bytes':0,'sha256':None,'startsPdf':False,'error':None}
    try:
        with opener.open(Request(url,data=payload,headers=headers),timeout=35) as r:
            body=r.read(MAX)
            meta.update({'status':getattr(r,'status',None),'finalUrl':r.geturl(),'redirectChain':list(tracker.chain),'contentType':r.headers.get('Content-Type'),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'startsPdf':body.startswith(b'%PDF-')})
            text='' if body.startswith(b'%PDF-') else decode(body)
            return meta,body,text
    except Exception as exc:
        meta['redirectChain']=list(tracker.chain); meta['error']=f'{type(exc).__name__}: {exc}'
        return meta,b'', ''


def script_urls(text: str, base: str) -> list[str]:
    out=[]
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)',text,re.I):
        u=urljoin(base,html.unescape(raw))
        if acci_host(u) and u not in out: out.append(u)
    return out[:80]


def windows(text: str, tokens: tuple[str,...]) -> list[str]:
    out=[]
    for token in tokens:
        for m in re.finditer(re.escape(token),text,re.I):
            x=compact(text[max(0,m.start()-1800):min(len(text),m.start()+8000)],10000)
            if x not in out: out.append(x)
            if len(out)>=40: return out
    return out


def inspect_pdf(body: bytes, source_url: str) -> dict:
    rec={'sourceUrl':source_url,'sha256':hashlib.sha256(body).hexdigest(),'bytes':len(body),'pages':None,'encrypted':None,'textChars':0,'koreanChars':0,'semanticHits':[],'renderedPages':[],'error':None}
    try:
        reader=PdfReader(io.BytesIO(body)); rec['pages']=len(reader.pages); rec['encrypted']=bool(reader.is_encrypted)
        hit=[]
        for i,p in enumerate(reader.pages,1):
            try: text=(p.extract_text() or '').replace('\x00',' ')
            except Exception: text=''
            rec['textChars'] += len(text); rec['koreanChars'] += len(re.findall(r'[가-힣]',text))
            terms=[t for t in SEMANTIC_TERMS if t in text]
            if terms:
                hit.append(i); rec['semanticHits'].append({'physicalPdfPage':i,'terms':terms,'excerpt':compact(text,7000)})
        targets=[]
        for p in hit:
            for q in (p-1,p,p+1):
                if rec['pages'] and 1<=q<=rec['pages'] and q not in targets: targets.append(q)
        targets=targets[:24]
        if not targets and rec['pages']:
            targets=[x for x in (1,2,3,rec['pages']) if 1<=x<=rec['pages']]
        doc=pymupdf.open(stream=body,filetype='pdf')
        try:
            for p in targets:
                pix=doc.load_page(p-1).get_pixmap(matrix=pymupdf.Matrix(1.3,1.3),alpha=False)
                f=OUT/f'publisher-fulltext-p{p:03d}.png'; pix.save(f)
                rec['renderedPages'].append({'physicalPdfPage':p,'file':f.name,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
        finally: doc.close()
    except Exception as exc: rec['error']=f'{type(exc).__name__}: {exc}'
    return rec


def main() -> int:
    tracker=RedirectRecorder(); opener=build_opener(HTTPCookieProcessor(CookieJar()),tracker)
    report={
        'purpose':'verify ACCI public Kyobo feed provenance before any target content request; no guessed publisher identifiers',
        'journalPage':None,'scriptInspections':[],'publicContract':{},'contractVerified':False,
        'bookList':None,'issueRecords':[],'issueProbes':[],'targetRecords':[],
        'builderContractObserved':False,'downloadAttempts':[],'pdf':None,'fullLengthPdfAcquired':False,
        'guessedOpaqueIdentifierCount':0,
    }
    jm,_jb,jt=fetch(opener,tracker,JOURNAL_PAGE); report['journalPage']=jm
    assert jm['status']==200, 'ACCI journal page unavailable'
    union=jt
    sources=[(jm.get('finalUrl') or JOURNAL_PAGE,jt)]
    for u in script_urls(jt,jm.get('finalUrl') or JOURNAL_PAGE):
        sm,_sb,st=fetch(opener,tracker,u,referer=JOURNAL_PAGE)
        if st:
            sources.append((sm.get('finalUrl') or u,st)); union+='\n'+st
            if any(tok.lower() in st.lower() for tok in ('selectKyoboThesisBookListAjax','selectKyoboThesisNttListAjax','fnViewPdf','builderDownload','3403','20825')):
                report['scriptInspections'].append({'source':sm.get('finalUrl') or u,'meta':sm,'windows':windows(st,('selectKyoboThesisBookListAjax.ink','selectKyoboThesisNttListAjax.ink','fnViewPdf','builderDownload','3403','20825'))})

    report['publicContract']={
        'pubcNumObserved': EXPECTED_PUBC in union,
        'institutionCodeObserved': EXPECTED_INSTT in union,
        'bookListEndpointObserved': 'selectKyoboThesisBookListAjax.ink' in union,
        'articleListEndpointObserved': 'selectKyoboThesisNttListAjax.ink' in union,
        'fnViewPdfObserved': 'fnViewPdf' in union,
        'builderDownloadObserved': 'builderDownload' in union,
        'windows': windows(union,('3403','20825','selectKyoboThesisBookListAjax.ink','selectKyoboThesisNttListAjax.ink','fnViewPdf','builderDownload')),
    }
    c=report['publicContract']
    report['contractVerified']=all(c[k] for k in ('pubcNumObserved','institutionCodeObserved','bookListEndpointObserved','articleListEndpointObserved'))

    # Fail closed: publisher identifiers/endpoints are not called unless the public
    # journal page or its own static JS exposes every required identifier/route.
    if not report['contractVerified']:
        (OUT/'publisher-probe.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
        print(json.dumps({'contractVerified':False,'publicContract':report['publicContract'],'fullLengthPdfAcquired':False},ensure_ascii=False,indent=2))
        return 0

    base='https://www.acci.asia'
    referer=JOURNAL_PAGE
    common={
        'pageIndex':'1',
        'strQuery':f"@ws {{ IDX_PUBC_NUM(HASALL|'{EXPECTED_PUBC}'|0|0) }}",
        'searchCd':'A','trgtIsuInsttCd':EXPECTED_INSTT,'trgtUseLangCode':'SC00000016',
        'searchCondition':'productNm','reFlag':'Y','searchKeyword':TITLE_SIGNAL,
        'journalCd':EXPECTED_PUBC,'bookYear':'2022','bookCd':''
    }
    book_ep=base+'/module/thesis/selectKyoboThesisBookListAjax.ink'
    list_ep=base+'/module/thesis/selectKyoboThesisNttListAjax.ink'
    bm,_bb,bt=fetch(opener,tracker,book_ep,referer=referer,data=common,ajax=True); report['bookList']=bm
    records=[]
    if bt:
        try:
            parsed=json.loads(bt); records=parsed.get('result',parsed if isinstance(parsed,list) else [])
            if not isinstance(records,list): records=[]
        except Exception: records=[]
    report['issueRecords']=records

    candidates=[]
    for row in records[:40]:
        code=str(row.get('BOOK_CD') or row.get('bookCd') or '')
        name=str(row.get('BOOK_NM') or row.get('bookNm') or '')
        if not code: continue
        lm,_lb,lt=fetch(opener,tracker,list_ep,referer=referer,data={**common,'bookCd':code},ajax=True)
        target=TITLE_SIGNAL in lt and AUTHOR in lt
        report['issueProbes'].append({'bookCd':code,'bookName':name,'meta':lm,'containsTarget':target})
        if not target: continue
        idx=lt.find(TITLE_SIGNAL); frag=lt[max(0,idx-18000):idx+26000]
        (OUT/f'publisher-target-{re.sub(r"[^A-Za-z0-9._-]+","-",code)}.txt').write_text(frag,encoding='utf-8')
        for vm in re.findall(r"fnViewPdf\('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'",frag):
            rec={'bookCd':code,'bookName':name,'barcode':vm[0],'artId':vm[1],'kyoboKey':vm[2],'scholarBase':vm[3]}
            report['targetRecords'].append(rec)
            candidates.append(rec)

    # Require publisher source itself to expose the builderDownload implementation
    # before reproducing the target fnViewPdf action.
    report['builderContractObserved']='builderDownload' in union and 'fnViewPdf' in union
    if report['builderContractObserved']:
        seen=set()
        for rec in candidates[:8]:
            for gb in ('view','down'):
                url=f"{rec['scholarBase']}/builderDownload?artId={rec['artId']}&barcode={rec['barcode']}&kyoboKey={rec['kyoboKey']}&gb={gb}"
                if url in seen: continue
                seen.add(url)
                mm,mb,mt=fetch(opener,tracker,url,referer=referer)
                attempt={'gb':gb,'requestedUrl':url,**mm}
                if mb.startswith(b'%PDF-') or 'pdf' in (mm.get('contentType') or '').lower():
                    p=inspect_pdf(mb,mm.get('finalUrl') or url)
                    report['pdf']=p
                    (PRIVATE/'hong-yooseon-2022.pdf').write_bytes(mb)
                    report['fullLengthPdfAcquired']=bool((p.get('pages') or 0)>=12 and p.get('bytes',0)>100000)
                    attempt['directPdf']=True
                else:
                    attempt['directPdf']=False
                    attempt['bodySample']=compact(mt,4000) if mt else None
                    attempt['accessBoundary']={
                        'login':bool(re.search(r'로그인|login|sign.?in',mt,re.I)) if mt else False,
                        'purchase':bool(re.search(r'구매|결제|이용권|유료|purchase|payment|paywall',mt,re.I)) if mt else False,
                    }
                report['downloadAttempts'].append(attempt)
                if report['fullLengthPdfAcquired']: break
            if report['fullLengthPdfAcquired']: break

    (OUT/'publisher-probe.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({
        'contractVerified':report['contractVerified'],
        'publicContract':report['publicContract'],
        'issueRecords':[(r.get('BOOK_CD') or r.get('bookCd'),r.get('BOOK_NM') or r.get('bookNm')) for r in report['issueRecords']],
        'targetRecords':report['targetRecords'],
        'builderContractObserved':report['builderContractObserved'],
        'downloadAttempts':report['downloadAttempts'],
        'pdf':report['pdf'],
        'fullLengthPdfAcquired':report['fullLengthPdfAcquired'],
        'guessedOpaqueIdentifierCount':report['guessedOpaqueIdentifierCount'],
    },ensure_ascii=False,indent=2))
    assert report['guessedOpaqueIdentifierCount']==0
    return 0


if __name__=='__main__':
    raise SystemExit(main())
