#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import io
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

import pymupdf
from pypdf import PdfReader

ARTI = 'ART003089059'
DOI = '10.54385/cbt.2022.2.2.75'
TITLE = '이데올로기적 접근을 통한 육친 간 상극관계 해석: 부부, 부자, 고부를 중심으로'
BASE = 'https://www.kci.go.kr/kciportal/'
DETAIL = f'{BASE}ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'
ORIGINAL_VIEW = f'{BASE}ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}'
PREVIEW = f'{BASE}ci/sereArticleSearch/artiPreView.kci?sereArticleSearchBean.artiId={ARTI}&v=2019'
PUBLISHER_HOSTS = ('https://www.acci.asia', 'https://acci.asia')
KY_PUBC_NUM = '3403'
KY_INSTT_CD = '20825'
OUT = Path('acquisition-hong-yooseon-2022')
PRIVATE = Path('acquisition-hong-yooseon-2022-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/10.1; public-resource-verification)'
MAX_BYTES = 30 * 1024 * 1024
KEYWORDS = (
    '배우자','부부','남편','아내','처','妻','夫','혼인','결혼','재성','관성','정재','편재','정관','편관',
    '의무','역할','이데올로기','가부장','현대','재설정','재해석','십성','육친','성별','남녀'
)
SIGNAL_RE = re.compile(r'원문|orte|file|download|preview|pdf|KCI_FI|ART003089059|fnViewPdf|builderDownload|3403|20825', re.I)


class RedirectRecorder(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append((code,newurl))
        return super().redirect_request(req,fp,code,msg,headers,newurl)


def decode_html(data: bytes) -> str:
    for enc in ('utf-8','euc-kr','cp949'):
        try: return data.decode(enc)
        except UnicodeDecodeError: pass
    return data.decode('utf-8',errors='replace')


def bounded_signals(text: str, limit: int = 50) -> list[str]:
    out=[]
    for line in text.splitlines():
        if SIGNAL_RE.search(line):
            compact=re.sub(r'\s+',' ',line).strip()
            if compact and compact not in out: out.append(compact[:2600])
            if len(out)>=limit: break
    return out


def extract_file_ids(text: str) -> set[str]:
    ids=set(re.findall(r'(KCI_FI\d+)',text))
    ids.update(re.findall(r"orteFileId[=:\"'\s]+([A-Za-z0-9_\-]+)",text,flags=re.I))
    return {x for x in ids if x.startswith('KCI_FI')}


def fetch_surface(opener, rd, url: str, referer: str | None = None, data: bytes | None = None, ajax: bool = False, limit: int = 2_500_000) -> tuple[dict,bytes,str]:
    rd.chain.clear(); headers={'User-Agent':UA,'Accept':'text/html,application/json,application/pdf,*/*;q=0.7'}
    if referer: headers['Referer']=referer
    if data is not None: headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
    if ajax: headers['X-Requested-With']='XMLHttpRequest'
    try:
        with opener.open(Request(url,headers=headers,data=data),timeout=40) as r:
            body=r.read(limit)
            meta={'status':getattr(r,'status',None),'finalUrl':r.geturl(),'redirectChain':rd.chain.copy(),'contentType':r.headers.get('Content-Type'),'contentDisposition':r.headers.get('Content-Disposition'),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'error':None}
    except Exception as e:
        return {'status':None,'finalUrl':None,'redirectChain':rd.chain.copy(),'contentType':None,'contentDisposition':None,'bytes':0,'sha256':None,'error':f'{type(e).__name__}: {e}'},b'', ''
    text=decode_html(body) if not body.startswith(b'%PDF-') else ''
    meta['signals']=bounded_signals(text)
    return meta,body,text


def inspect_pdf(data: bytes, label: str, url: str, file_id: str | None) -> dict:
    rec={'label':label,'orteFileId':file_id,'sourceUrl':url,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data),'pageCount':0,'encrypted':None,'textHealthy':False,'keywordHits':[],'renderedPages':[],'error':None}
    try:
        reader=PdfReader(io.BytesIO(data)); rec['pageCount']=len(reader.pages); rec['encrypted']=bool(reader.is_encrypted)
        korean=0; hit_pages=[]
        for i,page in enumerate(reader.pages,1):
            try: text=(page.extract_text() or '').replace('\x00',' ')
            except Exception: text=''
            korean += len(re.findall(r'[가-힣]',text))
            lines=[x.strip() for x in text.splitlines() if x.strip()]; snippets=[]
            for n,line in enumerate(lines):
                if any(k in line for k in KEYWORDS):
                    snippets.append(' / '.join(lines[max(0,n-2):min(len(lines),n+3)])[:1900])
            if snippets:
                hit_pages.append(i); rec['keywordHits'].append({'physicalPdfPage':i,'snippets':snippets[:14]})
        rec['textHealthy']=korean>=120
        n=rec['pageCount']; targets=[]
        if n<=3: targets=list(range(1,n+1))
        elif rec['textHealthy'] and hit_pages:
            for p in hit_pages:
                for q in (p-1,p,p+1):
                    if 1<=q<=n and q not in targets: targets.append(q)
            targets=targets[:20]
        else:
            targets=list(range(1,n+1)) if n<=18 else sorted({1,2,3,5,8,11,14,17,n})
        doc=pymupdf.open(stream=data,filetype='pdf')
        try:
            for p in targets:
                pix=doc.load_page(p-1).get_pixmap(matrix=pymupdf.Matrix(1.3,1.3),alpha=False)
                f=OUT/f'rendered-{label}-p{p:03d}.png'; pix.save(f)
                rec['renderedPages'].append({'physicalPdfPage':p,'file':f.name,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size})
        finally: doc.close()
    except Exception as e: rec['error']=f'{type(e).__name__}: {e}'
    return rec


def main() -> int:
    jar=CookieJar(); rd=RedirectRecorder(); opener=build_opener(HTTPCookieProcessor(jar),rd)
    report={
        'purpose':'public KCI/ACCI/Kyobo exact-backend acquisition only; no login/paywall/auth bypass',
        'candidate':{'author':'홍유선','year':2022,'title':TITLE,'kciArticleId':ARTI,'doi':DOI,'printedPages':'75-89','expectedArticlePages':15,'kyoboJournalPubcNum':KY_PUBC_NUM,'kyoboInstitutionCode':KY_INSTT_CD},
        'detail':{},'originalView':{},'htmlDiscoveredOrteFileIds':[],'fallbackOrteFileIdsTried':[],
        'downloadAttempts':[],'publisherProbes':[],'publisherIssueRecords':[],'publisherTargetRecords':[],
        'pdfs':[],'fullLengthPdfAcquired':False
    }

    dm,_,dt=fetch_surface(opener,rd,DETAIL); report['detail']=dm
    om,_,ot=fetch_surface(opener,rd,ORIGINAL_VIEW,DETAIL); report['originalView']=om
    html_ids=extract_file_ids(dt)|extract_file_ids(ot)
    fallback_ids={'KCI_FI003089059'}-html_ids
    report['htmlDiscoveredOrteFileIds']=sorted(html_ids); report['fallbackOrteFileIdsTried']=sorted(fallback_ids)

    # KCI exposes no downloadable file id for this article today. The deterministic fallback is exploratory only.
    for file_id in sorted(html_ids|fallback_ids):
        url=f'{BASE}ci/sereArticleSearch/ciSereArtiOrteServHistIFrame.kci?sereArticleSearchBean.artiId={ARTI}&sereArticleSearchBean.orteFileId={file_id}'
        meta,data,text=fetch_surface(opener,rd,url,DETAIL,limit=MAX_BYTES)
        meta.update({'orteFileId':file_id,'origin':'html-discovered' if file_id in html_ids else 'deterministic-fallback','requestedUrl':url,'startsPdf':data.startswith(b'%PDF-')})
        if data.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower():
            (PRIVATE/f'{file_id}.pdf').write_bytes(data); report['pdfs'].append(inspect_pdf(data,file_id.lower(),meta.get('finalUrl') or url,file_id))
        elif text:
            meta['bodySample']=re.sub(r'\s+',' ',text).strip()[:4000]
        report['downloadAttempts'].append(meta)

    # KCI preview control: expected to be a one-page encrypted preview when full text is not publicly released.
    pm,pdata,_=fetch_surface(opener,rd,PREVIEW,DETAIL,limit=MAX_BYTES)
    if pdata.startswith(b'%PDF-') or 'pdf' in (pm.get('contentType') or '').lower():
        report['pdfs'].append(inspect_pdf(pdata,'preview-control',pm.get('finalUrl') or PREVIEW,None))
    elif pm.get('error'): report['previewError']=pm['error']

    # ACCI uses the same public WIZWIG/Kyobo issue-feed family that previously exposed exact fnViewPdf records.
    # Query only the journal's own 2022 public issue feed, then follow only builderDownload URLs explicitly emitted there.
    builder_candidates=[]
    for publisher in PUBLISHER_HOSTS:
        referer=publisher+'/subList/32000003815'
        common={
            'pageIndex':'1',
            'strQuery':f"@ws {{ IDX_PUBC_NUM(HASALL|'{KY_PUBC_NUM}'|0|0) }}",
            'searchCd':'A','trgtIsuInsttCd':KY_INSTT_CD,'trgtUseLangCode':'SC00000016',
            'searchCondition':'productNm','reFlag':'Y','searchKeyword':'이데올로기적 접근 육친',
            'journalCd':KY_PUBC_NUM,'bookYear':'2022','bookCd':''
        }
        ep_book=publisher+'/module/thesis/selectKyoboThesisBookListAjax.ink'
        ep_list=publisher+'/module/thesis/selectKyoboThesisNttListAjax.ink'
        bm,bb,bt=fetch_surface(opener,rd,ep_book,referer,urlencode(common).encode(),True)
        bm.update({'label':f'{publisher}-book-list-2022'}); report['publisherProbes'].append(bm)
        records=[]
        if bt:
            try:
                j=json.loads(bt); records=j.get('result',j if isinstance(j,list) else [])
                if not isinstance(records,list): records=[]
            except Exception:
                records=[]
        for row in records:
            row2=dict(row); row2['_publisherHost']=publisher; report['publisherIssueRecords'].append(row2)
        books=[]
        for row in records:
            code=str(row.get('BOOK_CD') or row.get('bookCd') or '')
            name=str(row.get('BOOK_NM') or row.get('bookNm') or '')
            if code: books.append((code,name))
        for code,name in books[:30]:
            lm,lb,lt=fetch_surface(opener,rd,ep_list,referer,urlencode({**common,'bookCd':code}).encode(),True)
            lm.update({'label':f'{publisher}-issue-{code}','bookName':name,'containsTarget':('이데올로기적 접근' in lt and '홍유선' in lt)})
            report['publisherProbes'].append(lm)
            if not lm['containsTarget']: continue
            frag=lt[max(0,lt.find('이데올로기적 접근')-16000):lt.find('이데올로기적 접근')+22000]
            for vm in re.findall(r"fnViewPdf\('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'",frag):
                rec={'publisherHost':publisher,'bookCd':code,'bookName':name,'barcode':vm[0],'artId':vm[1],'kyoboKey':vm[2],'scholarBase':vm[3]}
                rec['viewUrl']=f'{vm[3]}/builderDownload?artId={vm[1]}&barcode={vm[0]}&kyoboKey={vm[2]}&gb=view'
                rec['downloadUrl']=f'{vm[3]}/builderDownload?artId={vm[1]}&barcode={vm[0]}&kyoboKey={vm[2]}&gb=down'
                report['publisherTargetRecords'].append(rec)
                builder_candidates.extend([('publisher-view',rec['viewUrl']),('publisher-download',rec['downloadUrl'])])

    seen=set()
    for origin,url in builder_candidates[:20]:
        if url in seen: continue
        seen.add(url)
        mm,mb,mt=fetch_surface(opener,rd,url,referer='https://scholar.kyobobook.co.kr/',limit=MAX_BYTES)
        rec={**mm,'origin':origin,'requestedUrl':url,'startsPdf':mb.startswith(b'%PDF-')}
        if mb.startswith(b'%PDF-') or 'pdf' in (mm.get('contentType') or '').lower():
            label=f'publisher-{len(report["pdfs"])+1:02d}'
            (PRIVATE/f'{label}.pdf').write_bytes(mb)
            report['pdfs'].append(inspect_pdf(mb,label,mm.get('finalUrl') or url,None))
        elif mt:
            rec['bodySample']=re.sub(r'\s+',' ',mt).strip()[:4000]
            rec['accessBoundary']={
                'login':bool(re.search(r'로그인|login|sign.?in',mt,re.I)),
                'purchase':bool(re.search(r'구매|결제|purchase|paywall|이용권|유료',mt,re.I)),
                'containsTarget':('이데올로기적 접근' in mt or 'ART003089059' in mt)
            }
        report['downloadAttempts'].append(rec)

    report['fullLengthPdfAcquired']=any(p.get('pageCount',0)>=12 for p in report['pdfs'])
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[
        f'candidate={report["candidate"]}',
        f'htmlDiscoveredOrteFileIds={report["htmlDiscoveredOrteFileIds"]}',
        f'fallbackOrteFileIdsTried={report["fallbackOrteFileIdsTried"]}',
        f'publisherIssueRecords={[(x.get("BOOK_CD") or x.get("bookCd"), x.get("BOOK_NM") or x.get("bookNm"), x.get("_publisherHost")) for x in report["publisherIssueRecords"]]}',
        f'publisherTargetRecords={report["publisherTargetRecords"]}',
        f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}'
    ]
    for a in report['downloadAttempts']:
        lines.append('ATTEMPT '+json.dumps(a,ensure_ascii=False,sort_keys=True))
    for x in report['publisherProbes']:
        if x.get('containsTarget') or x.get('error'):
            lines.append('PUBLISHER_PROBE '+json.dumps(x,ensure_ascii=False,sort_keys=True))
    for p in report['pdfs']:
        lines.append(f'PDF fileId={p.get("orteFileId")} sha={p["sha256"]} bytes={p["bytes"]} pages={p["pageCount"]} encrypted={p["encrypted"]} textHealthy={p["textHealthy"]} url={p["sourceUrl"]}')
        for hit in p.get('keywordHits',[])[:24]: lines.append(f'PAGE {hit["physicalPdfPage"]}: '+' || '.join(hit['snippets'][:8]))
        lines.append(f'RENDERED={p.get("renderedPages",[])}')
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8'); print('\n'.join(lines))
    assert report['candidate']['kciArticleId']==ARTI and report['candidate']['doi']==DOI
    return 0

if __name__=='__main__': raise SystemExit(main())
