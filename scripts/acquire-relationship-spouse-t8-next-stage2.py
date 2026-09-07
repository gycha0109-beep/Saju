#!/usr/bin/env python3
from __future__ import annotations
import hashlib,json,re
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request,build_opener,HTTPRedirectHandler

OUT=Path('acquisition-next-stage2');OUT.mkdir(exist_ok=True)
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/2.4; public-route-verification)'
MAX=40*1024*1024
PROBES={
 'song-ube-detail':'https://ube.dcollection.net/srch/srchDetail/200000668457',
 'song-ube-orgview':'https://ube.dcollection.net/common/orgView/200000668457',
 'song-ube-handler':'http://www.dcollection.net/handler/ube/200000668457',
 'song-ube-search-js':'https://ube.dcollection.net/script/search/search.js',
 'song-ube-common-js':'https://ube.dcollection.net/script/commons/common.js',
 'jung-dhu-detail':'https://dhu.dcollection.net/srch/srchDetail/200000872706',
 'jung-dhu-orgview':'https://dhu.dcollection.net/common/orgView/200000872706',
 'jung-dhu-handler':'http://www.dcollection.net/handler/dhu/200000872706',
 'jung-dhu-search-js':'https://dhu.dcollection.net/script/search/search.js',
 'jung-dhu-common-js':'https://dhu.dcollection.net/script/commons/common.js',
}
INTEREST=re.compile(r'orgView|fulltext|original|download|pdf|viewer|handler|fileDown|원문',re.I)
class RD(HTTPRedirectHandler):
 def __init__(self):super().__init__();self.chain=[]
 def redirect_request(self,req,fp,code,msg,headers,newurl):self.chain.append(newurl);return super().redirect_request(req,fp,code,msg,headers,newurl)
def fetch(u):
 rd=RD();op=build_opener(rd)
 meta={'requestedUrl':u,'status':None,'finalUrl':None,'redirects':[],'contentType':None,'sha256':None,'bytes':0,'error':None}
 try:
  with op.open(Request(u,headers={'User-Agent':UA,'Accept':'text/html,application/javascript,application/pdf,*/*;q=0.5'}),timeout=20) as r:
   b=r.read(MAX);meta.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirects=rd.chain,contentType=r.headers.get('Content-Type'),sha256=hashlib.sha256(b).hexdigest(),bytes=len(b));return meta,b
 except Exception as e:meta['redirects']=rd.chain;meta['error']=f'{type(e).__name__}: {e}';return meta,b''
def links(t,base):
 vals=set(re.findall(r'https?://[^\s"\'<>]+',t));vals.update(urljoin(base,v) for v in re.findall(r'(?:href|src)=["\']([^"\']+)',t,re.I))
 for pat in (r'["\']([^"\']*(?:download|original|viewer|handler|fulltext|pdf)[^"\']*)["\']',r'url\s*[:=]\s*["\']([^"\']+)["\']'):
  for v in re.findall(pat,t,re.I):
   if v.startswith('/') or v.startswith('http'):vals.add(urljoin(base,v))
 return sorted(x.replace('&amp;','&').rstrip(').,;') for x in vals)
def main():
 rep={'purpose':'targeted public dCollection route probe only; no auth/paywall bypass','probes':{},'followups':[]}
 queue=[]
 for label,u in PROBES.items():
  m,b=fetch(u);t=b.decode('utf-8',errors='replace');m['directPdf']=bool(b.startswith(b'%PDF-') or 'pdf' in (m['contentType'] or '').lower());m['interestingLines']=[{'line':n,'text':line[:2400]} for n,line in enumerate(t.splitlines(),1) if INTEREST.search(line)][:700];m['candidateUrls']=links(t,m['finalUrl'] or u)[:500]
  if m['directPdf']:(OUT/f'{label}.pdf').write_bytes(b)
  elif b:(OUT/f'{label}.txt').write_text(t,encoding='utf-8')
  rep['probes'][label]=m
  for i,x in enumerate(m['candidateUrls']):
   if any(k in x.lower() for k in ('download','original','viewer','handler','fulltext','.pdf')):queue.append((f'{label}-candidate-{i:03d}',x))
 seen=set()
 for label,u in queue[:100]:
  if u in seen:continue
  seen.add(u);m,b=fetch(u);m['label']=label;m['directPdf']=bool(b.startswith(b'%PDF-') or 'pdf' in (m['contentType'] or '').lower())
  if m['directPdf']:
   p=OUT/f'{label}.pdf';p.write_bytes(b);m['savedAs']=p.name
  rep['followups'].append(m)
 (OUT/'report.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
 lines=[]
 for k,m in rep['probes'].items():lines.append(f'[{k}] status={m["status"]} final={m["finalUrl"]} type={m["contentType"]} pdf={m["directPdf"]} error={m["error"]}')
 for m in rep['followups']:
  if m['directPdf'] or m['status'] not in (200,None):lines.append(f'[followup] status={m["status"]} final={m["finalUrl"]} type={m["contentType"]} pdf={m["directPdf"]} error={m["error"]}')
 (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8');print('\n'.join(lines))
if __name__=='__main__':main()
