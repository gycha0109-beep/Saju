#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition-kim-sanghan-kci-stage2')
OUT.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/3.1; public-route-verification)'
ARTI = 'ART003370620'
MAX = 45 * 1024 * 1024

class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url: str, data: bytes | None = None, headers: dict | None = None) -> tuple[dict, bytes]:
    rd=Redirects(); op=build_opener(rd)
    h={'User-Agent':UA,'Accept':'text/html,application/xml,text/xml,application/pdf,*/*;q=0.5'}
    if headers: h.update(headers)
    req=Request(url,data=data,headers=h)
    meta={'requestedUrl':url,'method':'POST' if data is not None else 'GET','status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bodyBytes':0,'sha256':None,'error':None}
    try:
        with op.open(req,timeout=35) as r:
            b=r.read(MAX)
            meta.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirectChain=rd.chain,contentType=r.headers.get('Content-Type'),bodyBytes=len(b),sha256=hashlib.sha256(b).hexdigest())
            return meta,b
    except Exception as e:
        meta['redirectChain']=rd.chain; meta['error']=f'{type(e).__name__}: {e}'; return meta,b''


def is_pdf(meta,b): return b.startswith(b'%PDF-') or 'pdf' in (meta.get('contentType') or '').lower()
def dec(b): return b.decode('utf-8',errors='replace')

def links(src,base):
    vals=set(re.findall(r'https?://[^\s"\'<>]+',src))
    vals.update(urljoin(base,x.replace('&amp;','&')) for x in re.findall(r'(?:href|src|action)=["\']([^"\']+)["\']',src,re.I))
    for pat in (r'["\']([^"\']*(?:pdf|download|file|viewer|preview|orte|fulltext|original)[^"\']*)["\']',r'url\s*[:=]\s*["\']([^"\']+)["\']'):
        for x in re.findall(pat,src,re.I):
            if x.startswith('/') or x.startswith('http'): vals.add(urljoin(base,x.replace('&amp;','&')))
    return sorted(vals)


def record(label,url,data=None,headers=None):
    m,b=fetch(url,data,headers); m['label']=label; m['directPdf']=is_pdf(m,b)
    if m['directPdf']:
        p=OUT/f'{label}.pdf'; p.write_bytes(b); m['savedAs']=p.name
    elif b:
        t=dec(b); p=OUT/f'{label}.txt'; p.write_text(t,encoding='utf-8'); m['savedAs']=p.name
        m['interestingLines']=[{'line':n,'text':line[:3000]} for n,line in enumerate(t.splitlines(),1) if re.search(r'ART003370620|김상한|여명론|orte|pdf|download|file|viewer|원문|RISS|riss|image|631|665',line,re.I)][:300]
        m['candidateUrls']=links(t,m.get('finalUrl') or url)[:500]
    return m,b


def main():
    base='https://www.kci.go.kr'
    report={'purpose':'exact KCI preview/RISS-link route inspection only; no auth/paywall bypass','probes':[],'followups':[]}
    probes=[
      ('kci-preview',f'{base}/kciportal/ci/sereArticleSearch/ciSereArtiOrteView.kci?sereArticleSearchBean.artiId={ARTI}',None,None),
      ('kci-riss-info',f'{base}/kciportal/ci/sereArticleSearch/ciSereArtiRissInfo.kci',urlencode({'sereArticleSearchBean.artiId':ARTI}).encode(),{'Content-Type':'application/x-www-form-urlencoded','Referer':f'{base}/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTI}'}),
    ]
    candidate=[]
    for label,url,data,headers in probes:
        m,b=record(label,url,data,headers); report['probes'].append(m)
        if not m['directPdf'] and b:
            t=dec(b)
            for u in links(t,m.get('finalUrl') or url):
                low=u.lower()
                if any(k in low for k in ('370620','pdf','download','file','orte','fulltext','original','riss.kr')):
                    candidate.append(u)
    seen=set()
    for i,u in enumerate(candidate[:80]):
        if u in seen: continue
        seen.add(u)
        m,b=record(f'followup-{i:03d}',u)
        report['followups'].append(m)
        if m['directPdf']:
            break
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[]
    for m in report['probes']+report['followups']:
        lines.append(f'[{m["label"]}] status={m["status"]} type={m["contentType"]} bytes={m["bodyBytes"]} pdf={m["directPdf"]} final={m["finalUrl"]} err={m["error"]}')
        if m.get('directPdf'): lines.append(f'  PDF sha={m["sha256"]} saved={m.get("savedAs")}')
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8'); print('\n'.join(lines))
    return 0
if __name__=='__main__': raise SystemExit(main())
