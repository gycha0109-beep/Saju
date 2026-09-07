#!/usr/bin/env python3
from __future__ import annotations

import html as htmlmod
import json
import re
from pathlib import Path
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT=Path('acquisition-riss-route-inspection'); OUT.mkdir(exist_ok=True)
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/2.2; public-resource-verification)'
TARGETS={
 'song-jaewoo-2023':[
   'https://data.riss.kr/resource/Thesis/000016680125',
   'https://www.riss.kr/link?id=T16680125',
 ],
 'jung-sua-2025':[
   'https://data.riss.kr/resource/Thesis/000017210085',
   'https://www.riss.kr/link?id=T17210085',
 ],
}
PATTERNS=['dcollection','isBasedOnUrl','orgView','fulltext','fullText','원문보기','original','provider','uci','UCI','200000668457','200000872706']

class RD(HTTPRedirectHandler):
 def __init__(self): super().__init__(); self.chain=[]
 def redirect_request(self,req,fp,code,msg,headers,newurl): self.chain.append(newurl); return super().redirect_request(req,fp,code,msg,headers,newurl)

def fetch(url):
 rd=RD(); op=build_opener(rd)
 try:
  with op.open(Request(url,headers={'User-Agent':UA}),timeout=15) as r:
   b=r.read(4_000_000); return {'status':getattr(r,'status',None),'final':r.geturl(),'redirects':rd.chain,'body':b,'error':None}
 except Exception as e:
  return {'status':None,'final':None,'redirects':rd.chain,'body':b'','error':f'{type(e).__name__}: {e}'}

def snippets(text):
 t=htmlmod.unescape(text)
 rows=[]
 lower=t.lower()
 for p in PATTERNS:
  start=0; pl=p.lower()
  while True:
   i=lower.find(pl,start)
   if i<0: break
   lo=max(0,i-450); hi=min(len(t),i+900)
   s=re.sub(r'\s+',' ',t[lo:hi])
   if s not in rows: rows.append(s)
   start=i+len(p)
   if len(rows)>=80: break
  if len(rows)>=80: break
 return rows

def main():
 report={}
 for key,urls in TARGETS.items():
  item=[]
  for idx,u in enumerate(urls):
   r=fetch(u); b=r.pop('body'); tx=b.decode('utf-8',errors='replace')
   ss=snippets(tx)
   absurls=sorted(set(htmlmod.unescape(x).rstrip(').,;') for x in re.findall(r'https?://[^\s"\'<>]+',tx)))
   relevant=[x for x in absurls if any(k in x.lower() for k in ('dcollection','riss','full','origin','pdf'))]
   item.append({'url':u,**r,'snippets':ss,'relevantUrls':relevant[:120]})
   (OUT/f'{key}-{idx}-snippets.txt').write_text('\n\n---\n\n'.join(ss),encoding='utf-8')
  report[key]=item
 (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
 for k,arr in report.items():
  print('['+k+']')
  for r in arr:
   print(r['url'],'->',r['status'],r['final'],'snippets',len(r['snippets']))
   for u in r['relevantUrls'][:20]: print(' ',u)

if __name__=='__main__': main()
