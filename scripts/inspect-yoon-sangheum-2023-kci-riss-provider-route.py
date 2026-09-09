#!/usr/bin/env python3
from __future__ import annotations

import hashlib, json, re, ssl, xml.etree.ElementTree as ET
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

ROOT=Path('acquisition-yoon-sangheum-2023')
ARTICLE_ID='ART003042567'
DETAIL_URL=f'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTICLE_ID}'
KCI_RISS_ENDPOINT='https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiRissInfo.kci'
UA='Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Yoon-2023-KCI-RISS-provider)'


def kci_host(url:str)->bool:
    return (urlparse(url).hostname or '').lower() in {'www.kci.go.kr','kci.go.kr'}

def riss_host(url:str)->bool:
    h=(urlparse(url).hostname or '').lower()
    return h in {'www.riss.kr','riss.kr','m.riss.kr','www.riss4u.net','riss4u.net'}

def decode(body,ctype=''):
    m=re.search(r'charset=([A-Za-z0-9._-]+)',ctype,re.I)
    for enc in ([m.group(1)] if m else [])+['utf-8','euc-kr','cp949']:
        try:return body.decode(enc)
        except Exception:pass
    return body.decode('utf-8',errors='replace')

def fetch(opener,url,referer=None,max_bytes=6_000_000):
    assert kci_host(url) or riss_host(url),f'unapproved host: {url}'
    h={'User-Agent':UA,'Accept':'text/html,application/xhtml+xml,application/xml,text/xml,*/*;q=0.8'}
    if referer:h['Referer']=referer
    with opener.open(Request(url,headers=h),timeout=30) as resp:
        final=resp.geturl(); assert kci_host(final) or riss_host(final),f'unapproved redirect: {final}'
        body=resp.read(max_bytes+1); assert len(body)<=max_bytes
        return {'requestedUrl':url,'finalUrl':final,'status':getattr(resp,'status',None),'contentType':resp.headers.get('Content-Type',''),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest()},body

def main():
    detail=(ROOT/'detail.html').read_text(encoding='utf-8')
    report=json.loads((ROOT/'report.json').read_text(encoding='utf-8'))
    contract_ok=(
        '/kciportal/ci/sereArticleSearch/ciSereArtiRissInfo.kci' in detail and
        'sereArticleSearchBean.artiId=ART003042567' in detail and
        'fncSearchArtiRissOrte' in detail
    )
    assert contract_ok,'current KCI detail does not author exact RISS provider POST contract'

    opener=build_opener(HTTPSHandler(context=ssl.create_default_context()),HTTPCookieProcessor(CookieJar()))
    data=urlencode({'sereArticleSearchBean.artiId':ARTICLE_ID}).encode()
    req=Request(KCI_RISS_ENDPOINT,data=data,headers={'User-Agent':UA,'Referer':DETAIL_URL,'Content-Type':'application/x-www-form-urlencoded','Accept':'application/xml,text/xml,*/*;q=0.8'})
    with opener.open(req,timeout=30) as resp:
        body=resp.read(3_000_001); assert len(body)<=3_000_000
        kmeta={'requestedUrl':KCI_RISS_ENDPOINT,'finalUrl':resp.geturl(),'status':getattr(resp,'status',None),'contentType':resp.headers.get('Content-Type',''),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest()}
    (ROOT/'kci-riss-provider.xml').write_bytes(body)
    text=decode(body,kmeta['contentType'])

    urls=[]; metadata=[]
    try:
        root=ET.fromstring(text)
        for md in root.iter():
            if md.tag.lower().endswith('metadata'):
                row={}
                for child in list(md):
                    tag=child.tag.split('}')[-1]
                    row[tag]=(child.text or '').strip()
                metadata.append(row)
                u=row.get('url','').strip()
                if u and riss_host(u) and u not in urls:urls.append(u)
    except Exception:
        for m in re.finditer(r'<url>(.*?)</url>',text,re.I|re.S):
            u=re.sub(r'\s+','',m.group(1))
            if riss_host(u) and u not in urls:urls.append(u)

    assert len(urls)<=5,'unexpectedly broad RISS provider result set'
    target_url=urls[0] if len(urls)==1 else None
    riss_meta=None; riss_text=''; controls=[]
    if target_url:
        riss_meta,rbody=fetch(opener,target_url,DETAIL_URL)
        riss_text=decode(rbody,riss_meta['contentType']); (ROOT/'riss-target.html').write_text(riss_text,encoding='utf-8')
        for source in [target_url,riss_meta['finalUrl'],riss_text]:
            for m in re.finditer(r'control_no=([0-9a-f]{16,64})',source,re.I):
                if m.group(1) not in controls:controls.append(m.group(1))

    fulltext_signals={
      'FullTextDownload.do':'FullTextDownload.do' in riss_text,
      'originalCheck':'originalCheck' in riss_text,
      '원문보기':'원문보기' in riss_text,
      '무료':'무료' in riss_text,
      '코리아스칼라':'코리아스칼라' in riss_text,
      'KoreaScholar':'koreascholar' in riss_text.lower(),
    }
    out={
      'kciRissContractObserved':contract_ok,'kciProviderResponse':kmeta,'providerMetadata':metadata,
      'siteAuthoredRissUrls':urls,'uniqueTargetRissUrl':target_url,'rissTarget':riss_meta,
      'rissControlCandidates':controls,'rissFulltextSignals':fulltext_signals,
      'contentDownloadExecuted':False,'guessedOpaqueIdentifierCount':0,'loginBypass':False,'institutionAuthBypass':False,'paywallBypass':False,'drmRequestExecuted':False,'decryptionActionExecuted':False,
    }
    (ROOT/'riss-provider-report.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
    report['rissProvider']=out
    (ROOT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(out,ensure_ascii=False,indent=2))

if __name__=='__main__':main()
