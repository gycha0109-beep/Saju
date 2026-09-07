#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import io
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
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
OUT = Path('acquisition-hong-yooseon-2022')
PRIVATE = Path('acquisition-hong-yooseon-2022-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/10.0; public-resource-verification)'
MAX_BYTES = 30 * 1024 * 1024
KEYWORDS = (
    '배우자','부부','남편','아내','처','妻','夫','혼인','결혼','재성','관성','정재','편재','정관','편관',
    '의무','역할','이데올로기','가부장','현대','재설정','재해석','십성','육친','성별','남녀'
)
SIGNAL_RE = re.compile(r'원문|orte|file|download|preview|pdf|KCI_FI|ART003089059', re.I)


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


def bounded_signals(text: str, limit: int = 40) -> list[str]:
    out=[]
    for line in text.splitlines():
        if SIGNAL_RE.search(line):
            compact=re.sub(r'\s+',' ',line).strip()
            if compact and compact not in out: out.append(compact[:2400])
            if len(out)>=limit: break
    return out


def extract_file_ids(text: str) -> set[str]:
    ids=set(re.findall(r'(KCI_FI\d+)',text))
    ids.update(re.findall(r"orteFileId[=:\"'\s]+([A-Za-z0-9_\-]+)",text,flags=re.I))
    return {x for x in ids if x.startswith('KCI_FI')}


def fetch_surface(opener, rd, url: str, referer: str | None = None) -> tuple[dict,bytes,str]:
    rd.chain.clear(); headers={'User-Agent':UA,'Accept':'text/html,application/pdf,*/*;q=0.7'}
    if referer: headers['Referer']=referer
    with opener.open(Request(url,headers=headers),timeout=35) as r:
        data=r.read(2_500_000)
        meta={'status':getattr(r,'status',None),'finalUrl':r.geturl(),'redirectChain':rd.chain.copy(),'contentType':r.headers.get('Content-Type'),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
    text=decode_html(data) if not data.startswith(b'%PDF-') else ''
    meta['signals']=bounded_signals(text)
    return meta,data,text


def inspect_pdf(data: bytes, label: str, url: str, file_id: str | None) -> dict:
    rec={'label':label,'orteFileId':file_id,'sourceUrl':url,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data),'pageCount':0,'encrypted':None,'textHealthy':False,'keywordHits':[],'renderedPages':[],'error':None}
    try:
        reader=PdfReader(io.BytesIO(data)); rec['pageCount']=len(reader.pages); rec['encrypted']=bool(reader.is_encrypted)
        korean=0; hit_pages=[]
        for i,page in enumerate(reader.pages,1):
            text=(page.extract_text() or '').replace('\x00',' '); korean += len(re.findall(r'[가-힣]',text))
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
    report={'purpose':'public KCI exact-backend acquisition only; no login/paywall/auth bypass','candidate':{'author':'홍유선','year':2022,'title':TITLE,'kciArticleId':ARTI,'doi':DOI,'printedPages':'75-89','expectedArticlePages':15},'detail':{},'originalView':{},'htmlDiscoveredOrteFileIds':[],'fallbackOrteFileIdsTried':[],'downloadAttempts':[],'pdfs':[],'fullLengthPdfAcquired':False}

    dm,_,dt=fetch_surface(opener,rd,DETAIL); report['detail']=dm
    om,_,ot=fetch_surface(opener,rd,ORIGINAL_VIEW,DETAIL); report['originalView']=om
    html_ids=extract_file_ids(dt)|extract_file_ids(ot)
    fallback_ids={'KCI_FI003089059'}-html_ids
    report['htmlDiscoveredOrteFileIds']=sorted(html_ids); report['fallbackOrteFileIdsTried']=sorted(fallback_ids)

    for file_id in sorted(html_ids|fallback_ids):
        rd.chain.clear()
        url=f'{BASE}ci/sereArticleSearch/ciSereArtiOrteServHistIFrame.kci?sereArticleSearchBean.artiId={ARTI}&sereArticleSearchBean.orteFileId={file_id}'
        meta={'orteFileId':file_id,'origin':'html-discovered' if file_id in html_ids else 'deterministic-fallback','requestedUrl':url}
        try:
            with opener.open(Request(url,headers={'User-Agent':UA,'Referer':DETAIL,'Accept':'application/pdf,text/html,*/*;q=0.7'}),timeout=40) as r:
                data=r.read(MAX_BYTES)
                meta.update({'status':getattr(r,'status',None),'finalUrl':r.geturl(),'redirectChain':rd.chain.copy(),'contentType':r.headers.get('Content-Type'),'contentDisposition':r.headers.get('Content-Disposition'),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'startsPdf':data.startswith(b'%PDF-')})
            if data.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower():
                (PRIVATE/f'{file_id}.pdf').write_bytes(data); report['pdfs'].append(inspect_pdf(data,file_id.lower(),meta['finalUrl'],file_id))
            elif data:
                text=decode_html(data); meta['bodySample']=re.sub(r'\s+',' ',text).strip()[:4000]; meta['signals']=bounded_signals(text)
        except Exception as e: meta['error']=f'{type(e).__name__}: {e}'
        report['downloadAttempts'].append(meta)

    try:
        with opener.open(Request(PREVIEW,headers={'User-Agent':UA,'Referer':DETAIL}),timeout=35) as r:
            data=r.read(MAX_BYTES)
            if data.startswith(b'%PDF-') or 'pdf' in (r.headers.get('Content-Type') or '').lower():
                report['pdfs'].append(inspect_pdf(data,'preview-control',r.geturl(),None))
    except Exception as e: report['previewError']=f'{type(e).__name__}: {e}'

    report['fullLengthPdfAcquired']=any(p.get('pageCount',0)>=12 for p in report['pdfs'])
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[f'candidate={report["candidate"]}',f'htmlDiscoveredOrteFileIds={report["htmlDiscoveredOrteFileIds"]}',f'fallbackOrteFileIdsTried={report["fallbackOrteFileIdsTried"]}',f'detailSignals={report["detail"].get("signals",[])}',f'originalViewSignals={report["originalView"].get("signals",[])}',f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}']
    for a in report['downloadAttempts']: lines.append('ATTEMPT '+json.dumps(a,ensure_ascii=False,sort_keys=True))
    for p in report['pdfs']:
        lines.append(f'PDF fileId={p.get("orteFileId")} sha={p["sha256"]} bytes={p["bytes"]} pages={p["pageCount"]} encrypted={p["encrypted"]} textHealthy={p["textHealthy"]} url={p["sourceUrl"]}')
        for hit in p.get('keywordHits',[])[:24]: lines.append(f'PAGE {hit["physicalPdfPage"]}: '+' || '.join(hit['snippets'][:8]))
        lines.append(f'RENDERED={p.get("renderedPages",[])}')
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8'); print('\n'.join(lines))
    assert report['candidate']['kciArticleId']==ARTI and report['candidate']['doi']==DOI
    return 0

if __name__=='__main__': raise SystemExit(main())
