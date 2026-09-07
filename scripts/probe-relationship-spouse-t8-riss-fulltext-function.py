#!/usr/bin/env python3
from __future__ import annotations
import json,re
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request,urlopen

OUT=Path('acquisition-riss-fulltext-function');OUT.mkdir(exist_ok=True)
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/2.3; public-resource-verification)'
TARGETS={
 'song-jaewoo-2023':'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=105b810f6d2f3decffe0bdc3ef48d419',
 'jung-sua-2025':'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=e25c256113db7c44ffe0bdc3ef48d419',
}
def get(u):
 try:
  with urlopen(Request(u,headers={'User-Agent':UA}),timeout=15) as r:return r.read(3_000_000).decode('utf-8',errors='replace')
 except Exception as e:return f'__ERROR__ {type(e).__name__}: {e}'
def around(t,pat,before=1200,after=7000):
 out=[]
 for m in re.finditer(pat,t,re.I|re.S):out.append(t[max(0,m.start()-before):min(len(t),m.start()+after)])
 return out

def main():
 report={}
 for k,u in TARGETS.items():
  html=get(u)
  scripts=[urljoin(u,s) for s in re.findall(r'<script[^>]+src=["\']([^"\']+)',html,re.I)]
  records=[]
  inline=around(html,r'(?:function\s+fulltextDownload\s*\(|fulltextDownload\s*=)')
  if inline:records.append({'source':u,'kind':'inline','matches':inline})
  for s in scripts:
   tx=get(s)
   if 'fulltextDownload' not in tx:continue
   matches=around(tx,r'(?:function\s+fulltextDownload\s*\(|fulltextDownload\s*=|fulltextDownload\s*:\s*function)')
   if not matches:matches=around(tx,r'fulltextDownload')
   records.append({'source':s,'kind':'external-script','matches':matches[:8]})
  report[k]={'detail':u,'scriptCount':len(scripts),'records':records}
  (OUT/f'{k}.txt').write_text('\n\n===== SOURCE =====\n\n'.join('\n\n'.join(r['matches']) for r in records),encoding='utf-8')
 (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
 for k,r in report.items():
  print(k,'scripts=',r['scriptCount'],'functionSources=',[(x['source'],len(x['matches'])) for x in r['records']])
if __name__=='__main__':main()
