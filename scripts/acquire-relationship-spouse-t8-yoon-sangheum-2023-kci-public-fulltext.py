#!/usr/bin/env python3
from __future__ import annotations

import hashlib, html, json, re, ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

OUT=Path('acquisition-yoon-sangheum-2023'); OUT.mkdir(exist_ok=True)
ARTICLE_ID='ART003042567'
TITLE_STEM='성역할과 유전자 관점의 육친론'
AUTHOR='윤상흠'
DOI='10.35203/EACT.2023.15.33'
DETAIL=f'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId={ARTICLE_ID}'
UA='Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Yoon-Sangheum-2023-public-contract)'


def host_ok(url:str)->bool:
    return (urlparse(url).hostname or '').lower() in {'www.kci.go.kr','kci.go.kr'}


def decode(body:bytes,ctype='')->str:
    m=re.search(r'charset=([A-Za-z0-9._-]+)',ctype,re.I)
    for enc in ([m.group(1)] if m else [])+['utf-8','euc-kr','cp949']:
        try:return body.decode(enc)
        except Exception:pass
    return body.decode('utf-8',errors='replace')


def fetch(opener,url,referer=None,max_bytes=6_000_000):
    assert host_ok(url), f'non-KCI URL rejected: {url}'
    h={'User-Agent':UA,'Accept':'text/html,application/xhtml+xml,application/pdf,*/*;q=0.8'}
    if referer:h['Referer']=referer
    with opener.open(Request(url,headers=h),timeout=30) as resp:
        final=resp.geturl(); assert host_ok(final),f'cross-host redirect rejected: {final}'
        body=resp.read(max_bytes+1); assert len(body)<=max_bytes
        return {'requestedUrl':url,'finalUrl':final,'status':getattr(resp,'status',None),'contentType':resp.headers.get('Content-Type',''),'contentDisposition':resp.headers.get('Content-Disposition',''),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'pdfMagic':body.startswith(b'%PDF-')},body


def main():
    opener=build_opener(HTTPSHandler(context=ssl.create_default_context()),HTTPCookieProcessor(CookieJar()))
    meta,body=fetch(opener,DETAIL)
    text=decode(body,meta['contentType']); (OUT/'detail.html').write_text(text,encoding='utf-8')
    assert AUTHOR in text, 'exact author not observed'
    assert TITLE_STEM in text, 'exact title stem not observed'
    assert DOI in text, 'exact DOI not observed'

    ids=[]
    for pat in [r"fncDown\(\s*['\"](KCI_FI\d+)['\"]\s*\)",r"['\"](KCI_FI\d+)['\"]"]:
        for m in re.finditer(pat,text,re.I):
            if m.group(1) not in ids:ids.append(m.group(1))

    route_match=re.search(r'orteDownFrame\.location\.href\s*=\s*["\']([^"\']*ciSereArtiOrteServHistIFrame\.kci\?[^"\']*orteFileId=)["\']\s*\+\s*orteFileId',text,re.I)
    prefix=html.unescape(route_match.group(1)) if route_match else None
    snippets=[]
    for term in [ARTICLE_ID,'KCI_FI','fncDown','orteFileId','ciSereArtiOrteServHistIFrame.kci','poDownload.kci','남명','재성','관성']:
        for m in list(re.finditer(re.escape(term),text,re.I))[:8]:
            snippets.append({'term':term,'context':re.sub(r'\s+',' ',text[max(0,m.start()-450):min(len(text),m.end()+900)])})

    report={
      'candidate':{'author':AUTHOR,'year':2023,'title':'성역할과 유전자 관점의 육친론 ― 남명 기준의 財星과 官星을 위주로 ―','kci':ARTICLE_ID,'doi':DOI,'printedPages':'33-55'},
      'detail':meta,'htmlDiscoveredOrteFileIds':ids,'siteAuthoredDownloadServicePrefix':prefix,
      'fallbackOrteFileIdsTried':[],'contentDownloadExecuted':False,'fullLengthPdfAcquired':False,
      'guessedOpaqueIdentifierCount':0,'loginBypass':False,'institutionAuthBypass':False,'paywallBypass':False,'drmRequestExecuted':False,'decryptionActionExecuted':False,
      'semanticDisposition':'PENDING_DIRECT_BODY_OR_ACCESS_BOUNDARY'
    }
    (OUT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    (OUT/'contract-snippets.json').write_text(json.dumps(snippets,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2))

if __name__=='__main__':main()
