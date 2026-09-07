#!/usr/bin/env python3
from __future__ import annotations

import hashlib, json, re
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler

OUT=Path('acquisition-kim-sanghan-publisher-stage4'); OUT.mkdir(exist_ok=True)
UA='Mozilla/5.0 (compatible; MyeongHa-Research-Acquisition/3.3; public-publisher-form-verification)'
BASE='https://brhistory.re.kr'
SCHOLAR='https://scholar.kyobobook.co.kr'
MAX=45*1024*1024

class RD(HTTPRedirectHandler):
    def __init__(self): super().__init__(); self.chain=[]
    def redirect_request(self,req,fp,code,msg,headers,newurl): self.chain.append(newurl); return super().redirect_request(req,fp,code,msg,headers,newurl)

def fetch(url,data=None,referer=None):
    rd=RD(); op=build_opener(rd)
    h={'User-Agent':UA,'Accept':'text/html,application/json,application/pdf,*/*;q=0.5','X-Requested-With':'XMLHttpRequest'}
    if data is not None:h['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8'
    if referer:h['Referer']=referer
    m={'requestedUrl':url,'method':'POST' if data is not None else 'GET','status':None,'finalUrl':None,'redirectChain':[],'contentType':None,'bodyBytes':0,'sha256':None,'error':None}
    try:
        with op.open(Request(url,data=data,headers=h),timeout=35) as r:
            b=r.read(MAX);m.update(status=getattr(r,'status',None),finalUrl=r.geturl(),redirectChain=rd.chain,contentType=r.headers.get('Content-Type'),bodyBytes=len(b),sha256=hashlib.sha256(b).hexdigest());return m,b
    except Exception as e:m['redirectChain']=rd.chain;m['error']=f'{type(e).__name__}: {e}';return m,b''
def dec(b):
    for enc in ('utf-8','euc-kr','cp949'):
        try:return b.decode(enc)
        except:pass
    return b.decode('utf-8',errors='replace')
def pdf(m,b):return b.startswith(b'%PDF-') or 'pdf' in (m.get('contentType') or '').lower()

def post(path,form,label):
    m,b=fetch(BASE+path,urlencode(form).encode(),BASE+'/subList/32000003815');m['label']=label;m['form']=form
    t=dec(b) if b else ''
    (OUT/f'{label}.txt').write_text(t,encoding='utf-8')
    return m,t

def main():
    common={
      'pageIndex':'1',
      'strQuery':"@ws { IDX_PUBC_NUM(HASALL|'3444'|0|0) }",
      'searchCd':'A',
      'trgtIsuInsttCd':'20885',
      'trgtUseLangCode':'SC00000016',
      'searchCondition':'productNm',
      'reFlag':'Y',
      'searchKeyword':'명리 고전 여명론',
      'journalCd':'3444',
      'bookYear':'2026',
      'bookCd':'',
    }
    rep={'purpose':'exact public publisher form reproduction; no auth/paywall bypass','probes':[],'bookRecords':[],'targetRecords':[],'downloadProbes':[]}

    # Reproduce dynamic 2026 issue selector.
    m,t=post('/module/thesis/selectKyoboThesisBookListAjax.ink',common,'book-list-2026');rep['probes'].append(m)
    try:
        j=json.loads(t); rep['bookRecords']=j.get('result',j if isinstance(j,list) else [])
    except Exception: rep['bookParseError']=True

    # Search all 2026 issues using full serialized browser form.
    m,t=post('/module/thesis/selectKyoboThesisNttListAjax.ink',common,'search-title-all-2026');rep['probes'].append(m)
    target='명리 고전 여명론' in t or '김상한' in t
    m['containsTarget']=target

    # If issue 33 is exposed, query it explicitly. Otherwise query every 2026 book code returned.
    books=[]
    for row in rep['bookRecords'] if isinstance(rep['bookRecords'],list) else []:
        code=str(row.get('BOOK_CD') or row.get('bookCd') or '')
        name=str(row.get('BOOK_NM') or row.get('bookNm') or '')
        if code: books.append((code,name))
    for code,name in books[:20]:
        form={**common,'bookCd':code}
        mm,tt=post('/module/thesis/selectKyoboThesisNttListAjax.ink',form,f'issue-{code}')
        mm['bookName']=name;mm['containsTarget']='명리 고전 여명론' in tt or '김상한' in tt;rep['probes'].append(mm)
        if mm['containsTarget']:
            target=True;t+='\n'+tt

    # Parse exact target card(s) and Kyobo ids.
    cards=re.findall(r'<div class="schr00">(.*?)</div>\s*</div>\s*(?=<div class="schr00">|$)',t,re.S|re.I)
    for card in cards:
        if '명리 고전 여명론' not in card and '김상한' not in card: continue
        plain=re.sub(r'<[^>]+>',' ',card); plain=re.sub(r'\s+',' ',plain)
        rec={'text':plain[:5000]}
        vm=re.search(r"fnViewPdf\('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'",card)
        if vm:
            rec.update(barcode=vm.group(1),artId=vm.group(2),kyoboKey=vm.group(3),scholarUrl=vm.group(4))
            rec['downloadUrl']=f'{vm.group(4)}/builderDownload?artId={vm.group(2)}&barcode={vm.group(1)}&kyoboKey={vm.group(3)}&gb=down'
            rec['viewUrl']=f'{vm.group(4)}/builderDownload?artId={vm.group(2)}&barcode={vm.group(1)}&kyoboKey={vm.group(3)}&gb=view'
        dm=re.search(r'https://doi\.org/[^"<]+',card)
        if dm:rec['doiUrl']=dm.group(0)
        rep['targetRecords'].append(rec)

    # Fallback regex across complete response if card split fails.
    if target and not rep['targetRecords']:
        idx=t.find('명리 고전 여명론')
        if idx<0:idx=t.find('김상한')
        frag=t[max(0,idx-9000):idx+14000]
        (OUT/'target-fragment.html').write_text(frag,encoding='utf-8')
        vms=re.findall(r"fnViewPdf\('([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'",frag)
        for vm in vms:
            rep['targetRecords'].append({'barcode':vm[0],'artId':vm[1],'kyoboKey':vm[2],'scholarUrl':vm[3],'downloadUrl':f'{vm[3]}/builderDownload?artId={vm[1]}&barcode={vm[0]}&kyoboKey={vm[2]}&gb=down','viewUrl':f'{vm[3]}/builderDownload?artId={vm[1]}&barcode={vm[0]}&kyoboKey={vm[2]}&gb=view'})

    for i,rec in enumerate(rep['targetRecords'][:5]):
        for mode in ('downloadUrl','viewUrl'):
            u=rec.get(mode)
            if not u:continue
            mm,b=fetch(u,referer=BASE+'/subList/32000003815');mm['label']=f'target-{i}-{mode}';mm['directPdf']=pdf(mm,b)
            if mm['directPdf']:
                p=OUT/f'target-{i}-{mode}.pdf';p.write_bytes(b);mm['savedAs']=p.name
            elif b:(OUT/f'target-{i}-{mode}.txt').write_text(dec(b)[:1000000],encoding='utf-8')
            rep['downloadProbes'].append(mm)

    (OUT/'report.json').write_text(json.dumps(rep,ensure_ascii=False,indent=2),encoding='utf-8')
    lines=[f'bookRecords={rep["bookRecords"]}',f'targetRecords={rep["targetRecords"]}']
    for m in rep['probes']:lines.append(f'PROBE {m["label"]} status={m["status"]} bytes={m["bodyBytes"]} target={m.get("containsTarget")} book={m.get("bookName")} err={m["error"]}')
    for m in rep['downloadProbes']:lines.append(f'DOWN {m["label"]} status={m["status"]} type={m["contentType"]} bytes={m["bodyBytes"]} pdf={m["directPdf"]} final={m["finalUrl"]} err={m["error"]}')
    (OUT/'summary.txt').write_text('\n'.join(lines)+'\n',encoding='utf-8');print('\n'.join(lines));return 0
if __name__=='__main__':raise SystemExit(main())
