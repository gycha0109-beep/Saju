#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT=Path('acquisition-kim-sanghan-publisher-stage3'); OUT.mkdir(exist_ok=True)
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/3.2; public-publisher-verification)'
BASE='https://brhistory.re.kr'
MAX=45*1024*1024
TITLE_TOKENS=('김상한','여명론','성별 비대칭','2026','33','631','665')

class RD(HTTPRedirectHandler):
    def __init__(self): super().__init__(); self.chain=[]
    def redirect_request(self,req,fp,code,msg,headers,newurl): self.chain.append(newurl); return super().redirect_request(req,fp,code,msg,headers,newurl)

def fetch(url,data=None,referer=None):
    rd=RD(); op=build_opener(rd)
    h={'User-Agent':UA,'Accept':'text/html,application/json,application/pdf,*/*;q=0.5','X-Requested-With':'XMLHttpRequest'}
    if data is not None: h['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
    if referer: h['Referer']=referer
    m={'requestedUrl':url,'method':'POST' if data is not None else 'GET','status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bodyBytes':0,'sha256':None,'error':None}
    try:
        with op.open(Request(url,data=data,headers=h),timeout=35) as r:
            b=r.read(MAX); m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirectChain=rd.chain,contentType=r.headers.get('Content-Type'),bodyBytes=len(b),sha256=hashlib.sha256(b).hexdigest()); return m,b
    except Exception as e: m['redirectChain']=rd.chain; m['error']=f'{type(e).__name__}: {e}'; return m,b''

def dec(b):
    for enc in ('utf-8','euc-kr','cp949'):
        try:return b.decode(enc)
        except:pass
    return b.decode('utf-8',errors='replace')
def pdf(m,b): return b.startswith(b'%PDF-') or 'pdf' in (m.get('contentType') or '').lower()
def extract(src,base):
    vals=set(re.findall(r'https?://[^\s"\'<>]+',src))
    vals.update(urljoin(base,x.replace('&amp;','&')) for x in re.findall(r'(?:href|src|action)=["\']([^"\']+)',src,re.I))
    for pat in (
        r'["\']([^"\']*(?:thesis|ntt|file|attach|download|pdf|select|view)[^"\']*)["\']',
        r'url\s*[:=]\s*["\']([^"\']+)["\']',
    ):
        for x in re.findall(pat,src,re.I):
            if x.startswith('/') or x.startswith('http'): vals.add(urljoin(base,x.replace('&amp;','&')))
    return sorted(x.rstrip(').,;') for x in vals if (urlparse(x).hostname or '').endswith('brhistory.re.kr'))

def main():
    referer=BASE+'/subList/32000003815'
    endpoint=BASE+'/module/thesis/selectKyoboThesisNttListAjax.ink'
    payloads=[
      {'journalCd':'','sysmoduleSeq':'10000000221','pubcNumYsno':'N'},
      {'journalCd':'','sysmoduleSeq':'10000000221','pubcNumYsno':'N','searchWrd':'김상한'},
      {'journalCd':'','sysmoduleSeq':'10000000221','pubcNumYsno':'N','searchKeyword':'김상한'},
      {'journalCd':'','sysmoduleSeq':'10000000221','pubcNumYsno':'N','searchCondition':'TITLE','searchKeyword':'명리 고전 여명론'},
    ]
    rep={'purpose':'public publisher thesis-list inspection only; no login/auth bypass','posts':[],'followups':[]}
    candidates=[]
    for i,p in enumerate(payloads):
        m,b=fetch(endpoint,urlencode(p).encode(),referer); t=dec(b); m['payload']=p; m['containsTarget']=any(tok in t for tok in TITLE_TOKENS[:3]); m['interestingLines']=[{'line':n,'text':line[:3500]} for n,line in enumerate(t.splitlines(),1) if any(tok in line for tok in TITLE_TOKENS) or re.search(r'file|download|pdf|thesis|ntt|attach|원문',line,re.I)][:500]
        (OUT/f'post-{i:02d}.html').write_text(t,encoding='utf-8'); rep['posts'].append(m)
        if m['containsTarget']:
            for u in extract(t,m.get('finalUrl') or endpoint): candidates.append(u)
            # JS function calls often carry article/file ids rather than hrefs.
            for argline in re.findall(r'(?:onclick|href)=["\']([^"\']+)["\']',t,re.I):
                if 'javascript' in argline.lower() or '(' in argline:
                    (OUT/f'post-{i:02d}-js-calls.txt').write_text('\n'.join(re.findall(r'[^;]+\([^;]+\)',t))[:1000000],encoding='utf-8')
    seen=set()
    for idx,u in enumerate(candidates[:100]):
        if u in seen: continue
        seen.add(u); m,b=fetch(u,referer=referer); m['label']=f'followup-{idx:03d}'; m['directPdf']=pdf(m,b)
        if m['directPdf']:
            p=OUT/f'followup-{idx:03d}.pdf'; p.write_bytes(b); m['savedAs']=p.name
        elif b:
            t=dec(b); p=OUT/f'followup-{idx:03d}.txt'; p.write_text(t[:2000000],encoding='utf-8'); m['savedAs']=p.name; m['containsTarget']=any(tok in t for tok in TITLE_TOKENS[:3])
        rep['followups'].append(m)
    (OUT/'report.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[]
    for m in rep['posts']: lines.append(f'POST target={m["containsTarget"]} status={m["status"]} bytes={m["bodyBytes"]} type={m["contentType"]} err={m["error"]} payload={m["payload"]}')
    for m in rep['followups']:
        if m.get('directPdf') or m.get('containsTarget') or m.get('status') not in (200,None): lines.append(f'FOLLOW {m["label"]} target={m.get("containsTarget")} pdf={m.get("directPdf")} status={m["status"]} bytes={m["bodyBytes"]} final={m["finalUrl"]} err={m["error"]}')
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8'); print('\n'.join(lines)); return 0
if __name__=='__main__': raise SystemExit(main())
