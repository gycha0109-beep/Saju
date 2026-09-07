#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import io
import json
import re
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import unquote
from urllib.request import Request, build_opener, HTTPCookieProcessor, HTTPRedirectHandler

import pymupdf
from pypdf import PdfReader

ARTI = 'ART002630397'
DOI = '10.33645/cnc.2020.09.42.9.755'
TITLE = '명리학 육친론의 이론체계 고찰 - 궁위론과 십성론을 중심으로-'
KCI_BASE = 'https://www.kci.go.kr/kciportal/'
KCI_DETAIL = f'{KCI_BASE}ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'
KCI_ORIGINAL = f'{KCI_BASE}ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}'
KCI_PREVIEW = f'{KCI_BASE}ci/sereArticleSearch/artiPreView.kci?sereArticleSearchBean.artiId={ARTI}&v=2019'
KY_BARCODE = '4010027924050'
KY_DETAIL = f'https://scholar.kyobobook.co.kr/article/detail/{KY_BARCODE}'
RISS_ID = 'A107064519'
OUT = Path('acquisition-lee-sudong-2020')
PRIVATE = Path('acquisition-lee-sudong-2020-private')
OUT.mkdir(exist_ok=True)
PRIVATE.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/11.0; public-resource-verification)'
MAX_BYTES = 45 * 1024 * 1024
KEYWORDS = (
    '배우자','배우자궁','부부','남편','아내','妻','夫','처','남명','여명','남자','여자',
    '재성','관성','정재','편재','정관','편관','십성','육친','궁위','일지','일주','용신','희신','기신'
)
SIGNAL_RE = re.compile(r'원문|pdf|download|builderDownload|fnViewPdf|orteFileId|KCI_FI|ART002630397|4010027924050|artId|kyoboKey', re.I)


class RedirectRecorder(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append((code,newurl))
        return super().redirect_request(req,fp,code,msg,headers,newurl)


def decode(data: bytes) -> str:
    for enc in ('utf-8','euc-kr','cp949'):
        try: return data.decode(enc)
        except UnicodeDecodeError: pass
    return data.decode('utf-8', errors='replace')


def bounded_signals(text: str, limit: int = 60) -> list[str]:
    out=[]
    for line in text.splitlines():
        if SIGNAL_RE.search(line):
            s=re.sub(r'\s+',' ',line).strip()
            if s and s not in out: out.append(s[:2600])
            if len(out)>=limit: break
    return out


def fetch(opener, rd, url: str, referer: str | None = None, limit: int = 3_000_000) -> tuple[dict,bytes,str]:
    rd.chain.clear(); headers={'User-Agent':UA,'Accept':'text/html,application/pdf,*/*;q=0.7'}
    if referer: headers['Referer']=referer
    try:
        with opener.open(Request(url,headers=headers),timeout=40) as r:
            data=r.read(limit)
            meta={'requestedUrl':url,'status':getattr(r,'status',None),'finalUrl':r.geturl(),'redirectChain':rd.chain.copy(),'contentType':r.headers.get('Content-Type'),'contentDisposition':r.headers.get('Content-Disposition'),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'error':None}
    except Exception as e:
        return {'requestedUrl':url,'status':None,'finalUrl':None,'redirectChain':rd.chain.copy(),'contentType':None,'contentDisposition':None,'bytes':0,'sha256':None,'error':f'{type(e).__name__}: {e}'},b'', ''
    text='' if data.startswith(b'%PDF-') else decode(data)
    meta['signals']=bounded_signals(text)
    return meta,data,text


def extract_kci_ids(text: str) -> set[str]:
    ids=set(re.findall(r'(KCI_FI\d+)',text))
    ids.update(re.findall(r"orteFileId[=:\"'\s]+([A-Za-z0-9_-]+)",text,flags=re.I))
    return {x for x in ids if x.startswith('KCI_FI')}


def extract_site_authored_pdf_urls(text: str) -> list[dict]:
    out=[]
    for m in re.finditer(r"fnViewPdf\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'",text):
        barcode, art_id, key, base=m.groups()
        if base.startswith('https://scholar.kyobobook.co.kr'):
            out.append({'source':'fnViewPdf','barcode':barcode,'artId':art_id,'kyoboKey':key,'base':base,'url':f'{base}/builderDownload?artId={art_id}&barcode={barcode}&kyoboKey={key}&gb=view'})
            out.append({'source':'fnViewPdf','barcode':barcode,'artId':art_id,'kyoboKey':key,'base':base,'url':f'{base}/builderDownload?artId={art_id}&barcode={barcode}&kyoboKey={key}&gb=down'})
    for raw in re.findall(r'''(?:href|src)=["']([^"']*builderDownload\?[^"']+)["']''',text,flags=re.I):
        url=unquote(raw.replace('&amp;','&'))
        if url.startswith('/'):
            url='https://scholar.kyobobook.co.kr'+url
        if url.startswith('https://scholar.kyobobook.co.kr/'):
            out.append({'source':'builderDownload-html','url':url})
    dedup=[]; seen=set()
    for x in out:
        if x['url'] not in seen:
            seen.add(x['url']); dedup.append(x)
    return dedup


def inspect_pdf(data: bytes, label: str, url: str) -> dict:
    rec={'label':label,'sourceUrl':url,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data),'pageCount':0,'encrypted':None,'textHealthy':False,'keywordHits':[],'renderedPages':[],'error':None}
    try:
        reader=PdfReader(io.BytesIO(data)); rec['pageCount']=len(reader.pages); rec['encrypted']=bool(reader.is_encrypted)
        korean=0; hit_pages=[]
        for i,p in enumerate(reader.pages,1):
            try: text=(p.extract_text() or '').replace('\x00',' ')
            except Exception: text=''
            korean+=len(re.findall(r'[가-힣]',text)); lines=[x.strip() for x in text.splitlines() if x.strip()]; snippets=[]
            for n,line in enumerate(lines):
                if any(k in line for k in KEYWORDS):
                    snippets.append(' / '.join(lines[max(0,n-2):min(len(lines),n+3)])[:1900])
            if snippets:
                hit_pages.append(i); rec['keywordHits'].append({'physicalPdfPage':i,'snippets':snippets[:12]})
        rec['textHealthy']=korean>=150
        n=rec['pageCount']; targets=[]
        if n<=3: targets=list(range(1,n+1))
        elif rec['textHealthy'] and hit_pages:
            for p in hit_pages:
                for q in (p-1,p,p+1):
                    if 1<=q<=n and q not in targets: targets.append(q)
            targets=targets[:20]
        else:
            targets=sorted({1,2,3,5,8,11,14,17,20,23,26,n})[:14]
        doc=pymupdf.open(stream=data,filetype='pdf')
        try:
            for p in targets:
                pix=doc.load_page(p-1).get_pixmap(matrix=pymupdf.Matrix(1.25,1.25),alpha=False)
                f=OUT/f'rendered-{label}-p{p:03d}.png'; pix.save(f)
                rec['renderedPages'].append({'physicalPdfPage':p,'file':f.name,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'bytes':f.stat().st_size})
        finally: doc.close()
    except Exception as e: rec['error']=f'{type(e).__name__}: {e}'
    return rec


def main() -> int:
    jar=CookieJar(); rd=RedirectRecorder(); opener=build_opener(HTTPCookieProcessor(jar),rd)
    report={'purpose':'public KCI/Kyobo acquisition only; no login/paywall/auth bypass','candidate':{'author':'이수동','year':2020,'title':TITLE,'kciArticleId':ARTI,'doi':DOI,'kyoboArticleBarcode':KY_BARCODE,'rissId':RISS_ID,'printedPages':'755-780','expectedPages':26},'surfaces':[],'htmlDiscoveredKciFileIds':[],'fallbackKciFileIdsTried':[],'siteAuthoredPdfRoutes':[],'downloadAttempts':[],'pdfs':[],'fullLengthPdfAcquired':False}

    texts=[]
    for label,url,referer in [('kci-detail',KCI_DETAIL,None),('kci-original',KCI_ORIGINAL,KCI_DETAIL),('kyobo-detail',KY_DETAIL,None)]:
        m,d,t=fetch(opener,rd,url,referer,MAX_BYTES if label=='kyobo-detail' else 3_000_000); m['label']=label; report['surfaces'].append(m); texts.append(t)
        if d.startswith(b'%PDF-') or 'pdf' in (m.get('contentType') or '').lower():
            report['pdfs'].append(inspect_pdf(d,label,m.get('finalUrl') or url))

    joined='\n'.join(texts)
    html_ids=extract_kci_ids(joined); fallback={'KCI_FI002630397'}-html_ids
    report['htmlDiscoveredKciFileIds']=sorted(html_ids); report['fallbackKciFileIdsTried']=sorted(fallback)
    for fid in sorted(html_ids|fallback):
        url=f'{KCI_BASE}ci/sereArticleSearch/ciSereArtiOrteServHistIFrame.kci?sereArticleSearchBean.artiId={ARTI}&sereArticleSearchBean.orteFileId={fid}'
        m,d,t=fetch(opener,rd,url,KCI_DETAIL,MAX_BYTES); m.update({'origin':'html-discovered' if fid in html_ids else 'deterministic-fallback','orteFileId':fid,'startsPdf':d.startswith(b'%PDF-')})
        if d.startswith(b'%PDF-') or 'pdf' in (m.get('contentType') or '').lower():
            (PRIVATE/f'{fid}.pdf').write_bytes(d); report['pdfs'].append(inspect_pdf(d,fid.lower(),m.get('finalUrl') or url))
        elif t: m['bodySample']=re.sub(r'\s+',' ',t).strip()[:4000]
        report['downloadAttempts'].append(m)

    pm,pd,pt=fetch(opener,rd,KCI_PREVIEW,KCI_DETAIL,MAX_BYTES)
    pm['label']='kci-preview'; report['surfaces'].append(pm)
    if pd.startswith(b'%PDF-') or 'pdf' in (pm.get('contentType') or '').lower(): report['pdfs'].append(inspect_pdf(pd,'preview-control',pm.get('finalUrl') or KCI_PREVIEW))

    routes=extract_site_authored_pdf_urls(joined)
    report['siteAuthoredPdfRoutes']=routes
    for i,route in enumerate(routes[:16],1):
        m,d,t=fetch(opener,rd,route['url'],KY_DETAIL,MAX_BYTES); m.update({'origin':route['source'],'startsPdf':d.startswith(b'%PDF-')})
        if d.startswith(b'%PDF-') or 'pdf' in (m.get('contentType') or '').lower() or 'octet-stream' in (m.get('contentType') or '').lower():
            if d.startswith(b'%PDF-'):
                label=f'kyobo-{i:02d}'; (PRIVATE/f'{label}.pdf').write_bytes(d); report['pdfs'].append(inspect_pdf(d,label,m.get('finalUrl') or route['url']))
        elif t:
            m['bodySample']=re.sub(r'\s+',' ',t).strip()[:4000]
            m['accessBoundary']={'login':bool(re.search(r'로그인|login|sign.?in',t,re.I)),'purchase':bool(re.search(r'구매|결제|이용권|유료|purchase|paywall',t,re.I))}
        report['downloadAttempts'].append(m)

    report['fullLengthPdfAcquired']=any(p.get('pageCount',0)>=22 for p in report['pdfs'])
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[f'candidate={report["candidate"]}',f'htmlDiscoveredKciFileIds={report["htmlDiscoveredKciFileIds"]}',f'fallbackKciFileIdsTried={report["fallbackKciFileIdsTried"]}',f'siteAuthoredPdfRoutes={report["siteAuthoredPdfRoutes"]}',f'fullLengthPdfAcquired={report["fullLengthPdfAcquired"]}']
    for s in report['surfaces']: lines.append('SURFACE '+json.dumps(s,ensure_ascii=False,sort_keys=True))
    for a in report['downloadAttempts']: lines.append('ATTEMPT '+json.dumps(a,ensure_ascii=False,sort_keys=True))
    for p in report['pdfs']:
        lines.append(f'PDF sha={p["sha256"]} bytes={p["bytes"]} pages={p["pageCount"]} encrypted={p["encrypted"]} textHealthy={p["textHealthy"]} url={p["sourceUrl"]}')
        for h in p.get('keywordHits',[])[:24]: lines.append(f'PAGE {h["physicalPdfPage"]}: '+' || '.join(h['snippets'][:8]))
        lines.append(f'RENDERED={p.get("renderedPages",[])}')
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8'); print('\n'.join(lines))
    assert report['candidate']['kciArticleId']==ARTI
    assert report['candidate']['doi']==DOI
    assert report['candidate']['kyoboArticleBarcode']==KY_BARCODE
    return 0

if __name__=='__main__': raise SystemExit(main())
