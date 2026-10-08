#!/usr/bin/env python3
"""SA-7D-B1 one-shot acquisition of the public NLC Ming volume-five scan.

Historical descendant of scripts/research/acquire_general_annual_ming_scans.py
at 2e265df8c51bafc44604b2dc15b38b19e41ea804. Evidence only, no promotion.
"""
import hashlib
import io
import json
from pathlib import Path
import time
import urllib.error
import urllib.parse
import urllib.request

OUT = Path(".scan-evidence")
OUT.mkdir(exist_ok=True)
FILE = "NLC892-411999029701-67240_三命通會_第9冊.pdf"
SRC = "https://upload.wikimedia.org/wikipedia/commons/8/8f/" + urllib.parse.quote(FILE)
HEADERS = {"User-Agent": "MyeongHa-Saju-SA7D-B1/1.0 (archival source verification)", "Accept": "application/pdf"}
MAX_BYTES = 55_000_000

def fetch(url):
    last = None
    for i in range(2):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=55) as resp:
                code = resp.status
                ctype = resp.headers.get("Content-Type", "")
                declared = resp.headers.get("Content-Length")
                if declared and int(declared) > MAX_BYTES:
                    raise ValueError("Oversize Content-Length")
                raw = resp.read(MAX_BYTES + 1)
            if code != 200 or not raw.startswith(b"%PDF-") or len(raw) > MAX_BYTES or len(raw) < 10000:
                raise ValueError(f"Invalid PDF response status={code} type={ctype} bytes={len(raw)}")
            if declared and len(raw) != int(declared):
                raise ValueError(f"Truncated Content-Length expected={declared} actual={len(raw)}")
            return raw, {"status": code, "contentType": ctype, "declaredContentLength": declared}
        except Exception as e:
            last = f"{type(e).__name__}: {e}"
            print(f"RETRY {i+1}/2 {last}", flush=True)
            if i == 0: time.sleep(4)
    raise RuntimeError(f"DOWNLOAD_FAILED url={url} reason={last}")

def metadata():
    args = urllib.parse.urlencode({
        "action": "query", "format": "json", "prop": "imageinfo",
        "iiprop": "sha1|size|url", "titles": "File:" + FILE
    })
    url = "https://commons.wikimedia.org/w/api.php?" + args
    req = urllib.request.Request(url, headers={"User-Agent": HEADERS["User-Agent"]})
    with urllib.request.urlopen(req, timeout=25) as response:
        obj = json.load(response)
    pages = obj["query"]["pages"]
    info = next(iter(pages.values()))["imageinfo"][0]
    return {"sha1":info["sha1"],"size":info["size"],"url":info["url"]}

def render(doc):
    from PIL import Image, ImageDraw
    import fitz
    sheets=[]
    for first in range(0, len(doc), 6):
        canvas=Image.new("RGB",(1850,2240),"white")
        pen=ImageDraw.Draw(canvas)
        for j in range(min(6,len(doc)-first)):
            idx=first+j
            pix=doc[idx].get_pixmap(matrix=fitz.Matrix(0.8,0.8),alpha=False)
            img=Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
            img.thumbnail((600,1030))
            x=(j%3)*615+5; y=(j//3)*1100+35
            pen.text((x+5,y-22),f"PDF page {idx+1}/{len(doc)} (zero-based={idx})",fill="black")
            canvas.paste(img,(x+max(0,(600-img.width)//2),y))
        path=OUT/f"contact_{first//6+1:02}.jpg"
        canvas.save(path,"JPEG",quality=78,optimize=True)
        sheets.append({"file":path.name,"sha256":hashlib.sha256(path.read_bytes()).hexdigest(),"pagesOneBased":list(range(first+1,min(first+7,len(doc)+1)))})
    focus=[]
    for idx in range(min(len(doc),12)):
        pix=doc[idx].get_pixmap(matrix=fitz.Matrix(1.6,1.6),alpha=False)
        img=Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        path=OUT/f"page_{idx+1:02}.jpg"
        img.save(path,"JPEG",quality=80,optimize=True)
        focus.append({"file":path.name,"sha256":hashlib.sha256(path.read_bytes()).hexdigest(),"pdfPageOneBased":idx+1,"pdfIndexZeroBased":idx})
    return sheets,focus

def main():
    record={"task":"SA-7D-B1","sourceId":"NLC892-411999029701-67240","volumeCatalog":"卷之五上","sourceUrl":SRC,"expectedPdfPages":45,"scanPageVerified":False,"annualDirectWitnessVerified":False,"bridgeReentryReady":False,"production":"HOLD"}
    try:
        import fitz
        raw,http=fetch(SRC)
        sha1=hashlib.sha1(raw).hexdigest();sha256=hashlib.sha256(raw).hexdigest()
        record.update({"http":http,"downloadedBytes":len(raw),"sha1":sha1,"sha256":sha256})
        (OUT/"source-original.pdf").write_bytes(raw)
        try:
            info=metadata()
            record["commonsMetadata"]=info
            record["commonsSha1Verified"]=sha1.lower()==info["sha1"].lower()
            record["commonsSizeVerified"]=len(raw)==info["size"]
            if not record["commonsSha1Verified"] or not record["commonsSizeVerified"]:
                raise ValueError("Wikimedia Commons original SHA1/size mismatch")
        except ValueError:
            raise
        except Exception as exc:
            record["commonsMetadataError"]=f"{type(exc).__name__}: {exc}"
            record["commonsSha1Verified"]=False
            record["commonsSizeVerified"]=False
        doc=fitz.open(stream=raw,filetype="pdf")
        record["actualPdfPages"]=len(doc)
        if len(doc)!=45: raise ValueError(f"Expected 45 pages; got {len(doc)}")
        record["pageDimensions"]= [{"pdfPageOneBased":i+1,"width":round(doc[i].rect.width,2),"height":round(doc[i].rect.height,2)} for i in range(len(doc))]
        record["contactSheets"],record["focusPages"]=render(doc)
        doc.close()
        record["acquisitionStatus"]="ACQUIRED_UNDER_REVIEW"
        print(f"SCAN_ACQUIRED bytes={len(raw)} pages=45 sha1={sha1} sha256={sha256} commonsSha1Verified={record['commonsSha1Verified']}",flush=True)
    except Exception as exc:
        record["acquisitionStatus"]="FAILED_HOLD"
        record["error"]=f"{type(exc).__name__}: {exc}"
        print(f"SCAN_FAILED {record['error']}",flush=True)
        raise
    finally:
        (OUT/"manifest.json").write_text(json.dumps(record,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
if __name__=="__main__": main()
