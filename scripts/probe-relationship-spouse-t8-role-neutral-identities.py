#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition-role-neutral-identities')
OUT.mkdir(exist_ok=True)
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/2.1; public-resource-verification)'
TARGETS = {
    'song-jaewoo-2023': {
        'rissId': 'T16680125',
        'lod': 'https://data.riss.kr/resource/Thesis/000016680125',
        'riss': 'https://www.riss.kr/link?id=T16680125',
        'knownUci': 'I804:44032-200000668457',
    },
    'jung-sua-2025': {
        'rissId': 'T17210085',
        'lod': 'https://data.riss.kr/resource/Thesis/000017210085',
        'riss': 'https://www.riss.kr/link?id=T17210085',
        'knownUci': None,
    },
}

class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl); return super().redirect_request(req, fp, code, msg, headers, newurl)


def get(url: str, limit: int = 8_000_000) -> dict:
    rd=Redirects(); opener=build_opener(rd)
    try:
        req=Request(url, headers={'User-Agent':UA,'Accept':'text/html,application/ld+json,application/rdf+xml,application/pdf,*/*;q=0.5'})
        with opener.open(req, timeout=12) as r:
            body=r.read(limit)
            return {'url':url,'status':getattr(r,'status',None),'final':r.geturl(),'type':r.headers.get('Content-Type'),'redirects':rd.chain,'sha256':hashlib.sha256(body).hexdigest(),'bytes':len(body),'body':body,'error':None}
    except Exception as e:
        return {'url':url,'status':None,'final':None,'type':None,'redirects':rd.chain,'sha256':None,'bytes':0,'body':b'','error':f'{type(e).__name__}: {e}'}


def urls(text: str) -> list[str]:
    vals=re.findall(r'https?://[^\s"\'<>]+', text)
    return sorted(set(v.replace('&amp;','&').rstrip(').,;') for v in vals if 'dcollection' in v.lower()))


def uci_values(text: str) -> list[str]:
    return sorted(set(re.findall(r'I804:[0-9]+-[0-9]+', text)))


def main():
    agg={'purpose':'fast public identity/fulltext-route probe; no access-control bypass','targets':{}}
    for key,cfg in TARGETS.items():
        rec={'rissId':cfg['rissId'],'knownUci':cfg['knownUci'],'initial':[],'discoveredDcollectionUrls':[],'discoveredUcis':[],'exactOrgViewProbes':[],'pdf':None}
        bodies=[]
        for u in (cfg['lod'], cfg['riss']):
            r=get(u); body=r.pop('body'); rec['initial'].append(r); bodies.append((r.get('final') or u,body))
        all_text='\n'.join(b.decode('utf-8',errors='replace') for _,b in bodies)
        dc=urls(all_text); ucis=uci_values(all_text)
        if cfg['knownUci']: ucis=sorted(set(ucis+[cfg['knownUci']]))
        rec['discoveredDcollectionUrls']=dc
        rec['discoveredUcis']=ucis
        hosts=sorted(set((urlparse(u).scheme or 'https', urlparse(u).netloc) for u in dc if urlparse(u).netloc.endswith('dcollection.net')))
        item_ids=sorted(set(u.split('-',1)[-1] for u in ucis if '-' in u))
        # Also harvest item ids from dCollection detail URLs.
        for u in dc:
            m=re.search(r'/(?:srchDetail|orgView)/([0-9A-Za-z_-]+)',u)
            if m: item_ids.append(m.group(1))
        item_ids=sorted(set(item_ids))
        for scheme,host in hosts:
            for item in item_ids:
                u=f'{scheme}://{host}/common/orgView/{item}'
                r=get(u); body=r.pop('body'); rec['exactOrgViewProbes'].append(r)
                ctype=(r.get('type') or '').lower()
                if 'pdf' in ctype or body.startswith(b'%PDF-'):
                    p=OUT/f'{key}.pdf'; p.write_bytes(body)
                    rec['pdf']={'url':r.get('final') or u,'sha256':hashlib.sha256(body).hexdigest(),'bytes':len(body)}
                    break
                txt=body.decode('utf-8',errors='replace')
                pdf_urls=sorted(set(re.findall(r'https?://[^\s"\'<>]*public_resource/pdf/[^\s"\'<>]+',txt)))
                for pu in pdf_urls:
                    pr=get(pu,40_000_000); pb=pr.pop('body')
                    if 'pdf' in (pr.get('type') or '').lower() or pb.startswith(b'%PDF-'):
                        p=OUT/f'{key}.pdf'; p.write_bytes(pb)
                        rec['pdf']={'url':pr.get('final') or pu,'sha256':hashlib.sha256(pb).hexdigest(),'bytes':len(pb)}
                        break
                if rec['pdf']: break
            if rec['pdf']: break
        agg['targets'][key]=rec
    (OUT/'report.json').write_text(json.dumps(agg,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({k:{'dcollection':v['discoveredDcollectionUrls'],'ucis':v['discoveredUcis'],'pdf':v['pdf']} for k,v in agg['targets'].items()},ensure_ascii=False,indent=2))

if __name__=='__main__': main()
