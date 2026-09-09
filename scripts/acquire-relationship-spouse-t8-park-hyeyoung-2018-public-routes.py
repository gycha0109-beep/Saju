#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

OUT = Path("acquisition-park-hyeyoung-2018")
OUT.mkdir(exist_ok=True)

TITLE = "명리학 통변의 다양성 모색에 관한 연구 : 육친론을 중심으로"
AUTHOR = "박혜영"
RISS_ID = "T14752312"
EXPECTED_RISS_CONTROL = "90b96055ae1e4289ffe0bdc3ef48d419"
EXPECTED_DOC_CONTROL = "14752312"
DIGITAL_KNOWLEDGE_URL = "https://k-knowledge.kr/srch/read.jsp?id=281095634"

ctx = ssl.create_default_context()
jar = CookieJar()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(jar))
UA = "Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; +https://github.com/gycha0109-beep/Saju)"


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def decode_body(data: bytes, content_type: str = "") -> str:
    candidates = []
    m = re.search(r"charset=([A-Za-z0-9._-]+)", content_type or "", re.I)
    if m:
        candidates.append(m.group(1))
    candidates += ["utf-8", "cp949", "euc-kr"]
    for enc in candidates:
        try:
            return data.decode(enc)
        except Exception:
            pass
    return data.decode("utf-8", errors="replace")


def fetch(url: str, *, method: str = "GET", data: dict[str, str] | None = None, timeout: int = 30):
    payload = None
    headers = {"User-Agent": UA, "Accept": "*/*"}
    if data is not None:
        payload = urlencode(data).encode("utf-8")
        headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8"
    req = Request(url, data=payload, headers=headers, method=method)
    with opener.open(req, timeout=timeout) as resp:
        body = resp.read()
        return {
            "status": getattr(resp, "status", 200),
            "url": resp.geturl(),
            "contentType": resp.headers.get("Content-Type", ""),
            "body": body,
        }


def save_text(name: str, text: str):
    (OUT / name).write_text(text, encoding="utf-8")


def save_bytes(name: str, data: bytes):
    (OUT / name).write_bytes(data)


def extract_links(base_url: str, text: str) -> list[str]:
    found: list[str] = []
    for raw in re.findall(r"(?:href|src)\s*=\s*['\"]([^'\"]+)['\"]", text, re.I):
        raw = html.unescape(raw.strip())
        if raw.lower().startswith(("javascript:", "mailto:", "#")):
            continue
        found.append(urljoin(base_url, raw))
    for raw in re.findall(r"https?://[^\s'\"<>]+", text, re.I):
        found.append(html.unescape(raw.rstrip("),.;")))
    out: list[str] = []
    seen = set()
    for u in found:
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out


def parse_fulltext_tuples(text: str) -> list[dict[str, str]]:
    tuples = []
    pat = re.compile(
        r"ButtonSet\.fulltextDownload\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]\s*,\s*['\"]([^'\"]*)['\"]",
        re.I,
    )
    for m in pat.finditer(text):
        tuples.append({
            "control_no": m.group(1),
            "p_mat_type": m.group(2),
            "p_submat_type": m.group(3),
            "fulltext_kind": m.group(4),
        })
    return tuples


def find_doc_control(text: str) -> str | None:
    patterns = [
        r"name=['\"]docControlNo['\"][^>]*value=['\"](\d+)['\"]",
        r"name=['\"]controlNo['\"][^>]*value=['\"](\d+)['\"]",
        r"docControlNo\s*[:=]\s*['\"]?(\d+)",
        r"controlNo\s*[:=]\s*['\"]?(\d+)",
    ]
    for p in patterns:
        m = re.search(p, text, re.I)
        if m:
            return m.group(1)
    return None


def find_uci(text: str) -> str | None:
    m = re.search(r"I804:[0-9A-Za-z-]+", text)
    return m.group(0) if m else None


def direct_pdf_links(base_url: str, text: str) -> list[str]:
    links = []
    for u in extract_links(base_url, text):
        lu = u.lower()
        if ".pdf" in lu and not any(x in lu for x in ["login", "signin", "purchase", "paywall"]):
            links.append(u)
    # raw public_resource references can appear in JS rather than href attributes
    for raw in re.findall(r"(?:https?://[^\s'\"<>]+\.pdf(?:\?[^\s'\"<>]*)?|/public_resource/pdf/[^\s'\"<>]+\.pdf(?:\?[^\s'\"<>]*)?)", text, re.I):
        u = urljoin(base_url, html.unescape(raw))
        if u not in links:
            links.append(u)
    return links


report: dict = {
    "candidate": {
        "author": AUTHOR,
        "year": 2018,
        "title": TITLE,
        "institution": "경기대학교 예술대학원",
        "riss": RISS_ID,
        "expectedRissControl": EXPECTED_RISS_CONTROL,
        "digitalKnowledge": DIGITAL_KNOWLEDGE_URL,
    },
    "riss": {},
    "digitalKnowledge": {},
    "institutional": {"followedLinks": [], "pdfCandidates": []},
    "fullLengthPdfAcquired": False,
    "pdf": None,
    "guessedOpaqueIdentifierCount": 0,
    "loginBypass": False,
    "institutionAuthBypass": False,
    "paywallBypass": False,
    "drmRequestExecuted": False,
    "decryptionActionExecuted": False,
    "crossSourceSemanticStitching": False,
}

# 1) Canonical public RISS identity.
riss_link = f"https://www.riss.kr/link?id={RISS_ID}"
r = fetch(riss_link)
riss_detail_text = decode_body(r["body"], r["contentType"])
save_text("riss-detail.html", riss_detail_text)
report["riss"]["canonicalEntry"] = riss_link
report["riss"]["resolvedUrl"] = r["url"]
report["riss"]["status"] = r["status"]
report["riss"]["detailSha256"] = sha256_bytes(r["body"])
report["riss"]["titleObserved"] = TITLE in riss_detail_text
report["riss"]["authorObserved"] = AUTHOR in riss_detail_text

resolved_q = urlparse(r["url"]).query
control_from_url = None
m = re.search(r"(?:^|&)control_no=([^&]+)", resolved_q)
if m:
    control_from_url = m.group(1)
if not control_from_url and EXPECTED_RISS_CONTROL in riss_detail_text:
    control_from_url = EXPECTED_RISS_CONTROL
report["riss"]["control"] = control_from_url
report["riss"]["docControlNo"] = find_doc_control(riss_detail_text)
report["riss"]["uci"] = find_uci(riss_detail_text)

# 2) Exact-title public RISS search; inspect only site-authored row tuple.
q = urlencode({
    "colName": "bib_t",
    "isDetailSearch": "Y",
    "queryText": f"znTitle,{TITLE}",
    "searchGubun": "true",
})
riss_search_url = "https://www.riss.kr/search/Search.do?" + q
rs = fetch(riss_search_url)
riss_search_text = decode_body(rs["body"], rs["contentType"])
save_text("riss-title-search.html", riss_search_text)
all_tuples = parse_fulltext_tuples(riss_search_text)
exact_tuples = [t for t in all_tuples if t["control_no"] == EXPECTED_RISS_CONTROL]
report["riss"]["exactTitleSearchUrl"] = riss_search_url
report["riss"]["exactTitleSearchStatus"] = rs["status"]
report["riss"]["exactTitleObserved"] = TITLE in riss_search_text
report["riss"]["fulltextTuples"] = exact_tuples

# 3) Inspect current public RISS page/static-script union for originalCheck contract.
script_urls = []
for base_url, text in [(r["url"], riss_detail_text), (rs["url"], riss_search_text)]:
    for u in extract_links(base_url, text):
        host = urlparse(u).netloc.lower()
        if host.endswith("riss.kr") and (u.lower().endswith(".js") or ".js?" in u.lower()):
            if u not in script_urls:
                script_urls.append(u)
script_union = riss_detail_text + "\n" + riss_search_text
fetched_scripts = 0
for u in script_urls[:45]:
    try:
        sr = fetch(u, timeout=20)
        st = decode_body(sr["body"], sr["contentType"])
        script_union += "\n" + st
        fetched_scripts += 1
    except Exception:
        continue
report["riss"]["referencedScriptCount"] = len(script_urls)
report["riss"]["fetchedScriptCount"] = fetched_scripts
original_contract = (
    "originalCheck.do" in script_union
    and "controlNo" in script_union
    and "docType" in script_union
)
report["riss"]["originalCheckContractObserved"] = original_contract
if original_contract:
    oc = fetch(
        "https://www.riss.kr/detail/originalCheck.do",
        method="POST",
        data={"controlNo": EXPECTED_DOC_CONTROL, "docType": "T"},
    )
    octext = decode_body(oc["body"], oc["contentType"])
    save_text("riss-original-check.txt", octext)
    report["riss"]["originalCheck"] = {
        "status": oc["status"],
        "body": octext.strip(),
        "sha256": sha256_bytes(oc["body"]),
    }
else:
    report["riss"]["originalCheck"] = None

# 4) Exact public Digital Knowledge bibliographic record; only follow URLs it actually authors.
dk = fetch(DIGITAL_KNOWLEDGE_URL)
dk_text = decode_body(dk["body"], dk["contentType"])
save_text("digital-knowledge.html", dk_text)
report["digitalKnowledge"] = {
    "url": DIGITAL_KNOWLEDGE_URL,
    "status": dk["status"],
    "sha256": sha256_bytes(dk["body"]),
    "titleObserved": TITLE in dk_text,
    "authorObserved": AUTHOR in dk_text,
}

allowed_external = []
for source_url, source_text in [(r["url"], riss_detail_text), (DIGITAL_KNOWLEDGE_URL, dk_text)]:
    for u in extract_links(source_url, source_text):
        host = urlparse(u).netloc.lower()
        if any(token in host for token in ["dcollection", "kyonggi.ac.kr", "nld.go.kr"]):
            if u not in allowed_external:
                allowed_external.append(u)
report["institutional"]["observedLinks"] = allowed_external

# 5) Follow only directly observed target-side institutional/library links.
page_records = []
pdf_candidates = []
for i, u in enumerate(allowed_external[:12], start=1):
    try:
        ir = fetch(u, timeout=25)
    except Exception as e:
        page_records.append({"url": u, "error": str(e)[:300]})
        continue
    ct = ir["contentType"]
    if "pdf" in ct.lower() or ir["body"].startswith(b"%PDF"):
        pdf_candidates.append({"url": ir["url"], "bytes": ir["body"], "contentType": ct, "source": "direct-observed-link"})
        page_records.append({"url": u, "resolvedUrl": ir["url"], "status": ir["status"], "contentType": ct, "directPdf": True})
        continue
    itext = decode_body(ir["body"], ct)
    save_text(f"institutional-{i}.html", itext)
    rec = {
        "url": u,
        "resolvedUrl": ir["url"],
        "status": ir["status"],
        "contentType": ct,
        "titleObserved": TITLE in itext,
        "authorObserved": AUTHOR in itext,
        "sha256": sha256_bytes(ir["body"]),
    }
    page_records.append(rec)
    # A direct PDF candidate is allowed only when the fetched target page itself authors it.
    if rec["titleObserved"] or rec["authorObserved"]:
        for pu in direct_pdf_links(ir["url"], itext):
            if pu not in [x["url"] for x in pdf_candidates]:
                pdf_candidates.append({"url": pu, "bytes": None, "contentType": None, "source": ir["url"]})

report["institutional"]["followedLinks"] = page_records
report["institutional"]["pdfCandidates"] = [
    {k: v for k, v in x.items() if k != "bytes"} for x in pdf_candidates
]

# 6) Fetch at most the first page-authored direct PDF URL. No viewer/DRM API replay.
for cand in pdf_candidates[:4]:
    try:
        if cand["bytes"] is not None:
            pr = {"body": cand["bytes"], "contentType": cand["contentType"], "url": cand["url"], "status": 200}
        else:
            pr = fetch(cand["url"], timeout=35)
        pdata = pr["body"]
        pct = pr["contentType"] or ""
        if pdata.startswith(b"%PDF") or "application/pdf" in pct.lower():
            save_bytes("park-hyeyoung-2018.pdf", pdata)
            report["fullLengthPdfAcquired"] = True
            report["pdf"] = {
                "url": pr["url"],
                "status": pr["status"],
                "contentType": pct,
                "bytes": len(pdata),
                "sha256": sha256_bytes(pdata),
                "source": cand["source"],
            }
            break
    except Exception:
        continue

# Hard identity / no-guess checks.
assert report["riss"]["titleObserved"], "RISS canonical detail did not expose exact title"
assert report["riss"]["authorObserved"], "RISS canonical detail did not expose exact author"
assert report["riss"]["control"] == EXPECTED_RISS_CONTROL, report["riss"]["control"]
if report["riss"]["docControlNo"] is not None:
    assert report["riss"]["docControlNo"] == EXPECTED_DOC_CONTROL
assert report["guessedOpaqueIdentifierCount"] == 0
assert report["loginBypass"] is False
assert report["institutionAuthBypass"] is False
assert report["paywallBypass"] is False
assert report["drmRequestExecuted"] is False
assert report["decryptionActionExecuted"] is False

(OUT / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
summary = {
    "candidate": report["candidate"],
    "riss": {
        "resolvedUrl": report["riss"].get("resolvedUrl"),
        "control": report["riss"].get("control"),
        "docControlNo": report["riss"].get("docControlNo"),
        "uci": report["riss"].get("uci"),
        "fulltextTuples": report["riss"].get("fulltextTuples"),
        "originalCheck": report["riss"].get("originalCheck"),
    },
    "digitalKnowledge": report["digitalKnowledge"],
    "institutional": report["institutional"],
    "fullLengthPdfAcquired": report["fullLengthPdfAcquired"],
    "pdf": report["pdf"],
    "guessedOpaqueIdentifierCount": report["guessedOpaqueIdentifierCount"],
    "drmRequestExecuted": report["drmRequestExecuted"],
}
(OUT / "summary.txt").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(summary, ensure_ascii=False, indent=2))
