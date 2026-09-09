#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

ROOT=Path('acquisition-noh-kim-2019')
DETAIL_URL='https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002459146'
UA='Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; Noh-Kim-2019-concrete-KCI-file)'


def host_ok(url:str)->bool:
    return (urlparse(url).hostname or '').lower() in {'www.kci.go.kr','kci.go.kr'}


def fetch(opener,url,referer,max_bytes=12_000_000):
    assert host_ok(url), f'non-KCI URL rejected: {url}'
    req=Request(url,headers={'User-Agent':UA,'Referer':referer,'Accept':'application/pdf,text/html,*/*;q=0.8'})
    with opener.open(req,timeout=30) as resp:
        final=resp.geturl()
        assert host_ok(final), f'cross-host redirect rejected: {final}'
        body=resp.read(max_bytes+1)
        assert len(body)<=max_bytes
        return {
            'requestedUrl':url,'finalUrl':final,'status':getattr(resp,'status',None),
            'contentType':resp.headers.get('Content-Type',''),
            'contentDisposition':resp.headers.get('Content-Disposition',''),
            'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),
            'pdfMagic':body.startswith(b'%PDF-')
        },body


def decode(body,content_type=''):
    m=re.search(r'charset=([A-Za-z0-9._-]+)',content_type,re.I)
    for enc in ([m.group(1)] if m else [])+['utf-8','euc-kr','cp949']:
        try:return body.decode(enc)
        except Exception:pass
    return body.decode('utf-8',errors='replace')


def main():
    detail=(ROOT/'detail.html').read_text(encoding='utf-8')
    report=json.loads((ROOT/'report.json').read_text(encoding='utf-8'))

    ids=[]
    for m in re.finditer(r"fncDown\(\s*['\"](KCI_FI\d+)['\"]\s*\)",detail,re.I):
        if m.group(1) not in ids: ids.append(m.group(1))
    assert ids==['KCI_FI002459146'], f'unexpected current concrete file IDs: {ids}'

    route_match=re.search(
        r'orteDownFrame\.location\.href\s*=\s*["\']([^"\']*ciSereArtiOrteServHistIFrame\.kci\?[^"\']*orteFileId=)["\']\s*\+\s*orteFileId',
        detail,re.I
    )
    assert route_match, 'current site-authored fncDown route contract not observed'
    prefix=html.unescape(route_match.group(1))
    concrete=urljoin(DETAIL_URL,prefix+ids[0])

    opener=build_opener(HTTPSHandler(context=ssl.create_default_context()),HTTPCookieProcessor(CookieJar()))
    attempts=[]
    meta,body=fetch(opener,concrete,DETAIL_URL)
    attempts.append(meta)
    selected=None
    if meta['pdfMagic']:
        (ROOT/'candidate.pdf').write_bytes(body)
        selected=meta
    else:
        text=decode(body,meta['contentType'])
        (ROOT/'download-service.html').write_text(text,encoding='utf-8')
        literal_urls=[]
        for m in re.finditer(r'''["']([^"']+)["']''',text):
            raw=html.unescape(m.group(1).strip())
            low=raw.lower()
            if not ('download' in low or 'orte' in low or '.pdf' in low):
                continue
            if '+' in raw or '${' in raw or raw.startswith('javascript:'):
                continue
            u=urljoin(concrete,raw)
            if host_ok(u) and u not in literal_urls:
                literal_urls.append(u)
        for u in literal_urls[:20]:
            try:
                m2,b2=fetch(opener,u,concrete)
                attempts.append(m2)
                if m2['pdfMagic']:
                    (ROOT/'candidate.pdf').write_bytes(b2)
                    selected=m2
                    break
            except Exception as exc:
                attempts.append({'requestedUrl':u,'error':f'{type(exc).__name__}: {exc}'})
        report['downloadServiceLiteralUrls']=literal_urls

    report['concreteSiteAuthoredOrteFileId']=ids[0]
    report['concreteFileIdSource']='current KCI detail onclick fncDown literal'
    report['siteAuthoredDownloadServicePrefix']=prefix
    report['siteAuthoredConcreteDownloadServiceUrl']=concrete
    report['concreteDownloadAttempts']=attempts
    report['pdfFile']='candidate.pdf' if selected else report.get('pdfFile')
    report['pdfMeta']=selected if selected else report.get('pdfMeta')
    report['contentDownloadExecuted']=True
    report['fallbackOrteFileIdsTried']=[]
    report['guessedOpaqueIdentifierCount']=0
    (ROOT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({
        'concreteFileId':ids[0],
        'serviceUrl':concrete,
        'attempts':attempts,
        'pdfAcquired':selected is not None,
    },ensure_ascii=False,indent=2))

if __name__=='__main__':
    main()
