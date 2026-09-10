#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT = Path('acquisition-go-jaemin-2016-stage2')
OUT.mkdir(exist_ok=True)
DETAIL = 'https://www.riss.kr/search/detail/DetailView.do?control_no=01535e75dd09ae73ffe0bdc3ef48d419&p_mat_type=be54d9b8bc7cdb09'
EXPECTED_RISS_ID = 'T14040293'
UA = 'Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/1.0; public-route-verification)'
MAX = 4 * 1024 * 1024
INTEREST = re.compile(r'fulltextDownload|originalCheck|nationalLibraryLocalBibno|fulltext_kind|p_submat_type|docType|controlNo|원문', re.I)


class Redirects(HTTPRedirectHandler):
    def __init__(self):
        super().__init__(); self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url: str):
    red=Redirects(); op=build_opener(red)
    req=Request(url,headers={'User-Agent':UA,'Accept':'text/html,application/javascript,text/javascript,*/*;q=0.5'})
    meta={'requestedUrl':url,'status':None,'finalUrl':None,'contentType':None,'redirectChain':[],'bytes':0,'sha256':None,'error':None}
    try:
        with op.open(req,timeout=25) as r:
            body=r.read(MAX)
            meta.update(status=getattr(r,'status',None),finalUrl=r.geturl(),contentType=r.headers.get('Content-Type'),redirectChain=red.chain,bytes=len(body),sha256=hashlib.sha256(body).hexdigest())
            return meta,body
    except Exception as e:
        meta['redirectChain']=red.chain; meta['error']=f'{type(e).__name__}: {e}'; return meta,b''


def text(body:bytes, ctype:str|None):
    for enc in ('utf-8','euc-kr','cp949'):
        try:return body.decode(enc)
        except Exception:pass
    return body.decode('utf-8',errors='replace')


def main():
    dm,db=fetch(DETAIL)
    if not db: raise RuntimeError(dm)
    html=text(db,dm.get('contentType'))
    assert '四柱命理의 宮星과 格局用神論' in html
    assert ('고재민' in html or '高在民' in html)
    assert EXPECTED_RISS_ID in html
    assert 'onclick="javascript:fulltextDownload();"' in html or 'fulltextDownload()' in html
    assert 'id="docType" value="T"' in html
    assert 'id="controlNo" value="14040293"' in html
    assert 'id="nationalLibraryLocalBibno" name="nationalLibraryLocalBibno" type="hidden" value="KDM201705404"' in html
    assert 'goOri = "/detail/originalCheck.do"' in html

    scripts=[]
    for raw in re.findall(r'<script[^>]+src=["\']([^"\']+)["\']',html,re.I):
        u=urljoin(dm.get('finalUrl') or DETAIL,raw.replace('&amp;','&'))
        p=urlparse(u); host=(p.hostname or '').lower()
        if host in {'www.riss.kr','riss.kr'} and (p.path.startswith('/search/js/') or p.path.startswith('/commons/js/')):
            scripts.append(u)
    scripts=list(dict.fromkeys(scripts))

    report={
        'purpose':'recover exact candidate-page-authored RISS JavaScript contract for fulltextDownload without executing content route',
        'candidatePage':dm,
        'observedCandidateInputs':{
            'docType':'T','controlNo':'14040293','rissId':'T14040293','nationalLibraryLocalBibno':'KDM201705404',
            'pSubmatType':'b51fa0b5ced94fec','fulltextKind':'a8cb3aaead67ab5b'
        },
        'pageAuthoredOriginalCheckEndpoint':'/detail/originalCheck.do',
        'pageAuthoredFulltextCall':'fulltextDownload()',
        'scriptSources':scripts,
        'fetchedScripts':[],
        'matchingScripts':[],
        'policy':{
            'contentRouteExecuted':False,'guessedOpaqueIdentifierCount':0,'loginBypass':False,'institutionAuthBypass':False,'paywallBypass':False,'drmRequestExecuted':False,'decryptionActionExecuted':False
        }
    }
    for idx,u in enumerate(scripts,1):
        m,b=fetch(u)
        rec={**m,'index':idx}
        report['fetchedScripts'].append(rec)
        if not b: continue
        s=text(b,m.get('contentType'))
        if INTEREST.search(s):
            name=f'script-{idx:02d}.js.txt'
            (OUT/name).write_text(s,encoding='utf-8')
            hits=[]
            lines=s.splitlines()
            for n,line in enumerate(lines,1):
                if INTEREST.search(line):
                    hits.append({'line':n,'text':line[:2500]})
            report['matchingScripts'].append({'url':u,'savedAs':name,'hits':hits[:500]})

    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[f'scriptSources={len(scripts)}',f'matchingScripts={len(report["matchingScripts"])}']
    for r in report['matchingScripts']:
        lines.append(f"match {r['url']} saved={r['savedAs']} hits={len(r['hits'])}")
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print('\n'.join(lines))
    return 0

if __name__=='__main__':
    raise SystemExit(main())
