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
DETAIL_URL = "https://www.nld.go.kr/home/dataDetailSojang.do?target=SJ&unicno=162263&key_id=CAT-000168477&org_id=cef199863d474b0d82031fd214432e7a"
METADATA_URL = "https://www.nld.go.kr/home/getDetailInfo.do"

ctx = ssl.create_default_context()
jar = CookieJar()
opener = build_opener(HTTPSHandler(context=ctx), HTTPCookieProcessor(jar))
UA = "Mozilla/5.0 (compatible; SajuResearchEvidence/1.0; +https://github.com/gycha0109-beep/Saju)"


def sha256_bytes(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def decode(b: bytes, ctype: str = "") -> str:
    encs = []
    m = re.search(r"charset=([A-Za-z0-9._-]+)", ctype or "", re.I)
    if m:
        encs.append(m.group(1))
    encs += ["utf-8", "cp949", "euc-kr"]
    for enc in encs:
        try:
            return b.decode(enc)
        except Exception:
            pass
    return b.decode("utf-8", errors="replace")


def fetch(url: str, *, method: str = "GET", data: dict[str, str] | None = None, timeout: int = 30):
    payload = None
    headers = {"User-Agent": UA, "Accept": "*/*"}
    if data is not None:
        payload = urlencode(data).encode("utf-8")
        headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8"
        headers["X-Requested-With"] = "XMLHttpRequest"
        headers["Referer"] = DETAIL_URL
    req = Request(url, data=payload, headers=headers, method=method)
    with opener.open(req, timeout=timeout) as resp:
        body = resp.read()
        return {
            "status": getattr(resp, "status", 200),
            "url": resp.geturl(),
            "contentType": resp.headers.get("Content-Type", ""),
            "body": body,
        }


def flatten_strings(obj):
    if isinstance(obj, str):
        yield obj
    elif isinstance(obj, dict):
        for v in obj.values():
            yield from flatten_strings(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from flatten_strings(v)


def extract_urls_from_strings(obj) -> list[str]:
    urls = []
    seen = set()
    for s in flatten_strings(obj):
        for raw in re.findall(r"https?://[^\s'\"<>]+", s):
            u = html.unescape(raw.rstrip("),.;"))
            if u not in seen:
                seen.add(u)
                urls.append(u)
    return urls


def find_first(d, names):
    if not isinstance(d, dict):
        return None
    for n in names:
        if n in d and d[n] not in (None, ""):
            return d[n]
    return None


report = {
    "candidate": {"author": AUTHOR, "title": TITLE},
    "detailUrl": DETAIL_URL,
    "metadataContract": None,
    "metadata": None,
    "observedExternalUrls": [],
    "followedPublicExternalUrls": [],
    "directPdfCandidates": [],
    "fullLengthPdfAcquired": False,
    "pdf": None,
    "anonymousSession": {},
    "contentActionExecuted": False,
    "accessAuthorityRequestExecuted": False,
    "guessedOpaqueIdentifierCount": 0,
    "loginBypass": False,
    "institutionAuthBypass": False,
    "paywallBypass": False,
    "drmRequestExecuted": False,
    "decryptionActionExecuted": False,
}

# Exact target page was directly authored by the exact Digital Knowledge record.
d = fetch(DETAIL_URL)
dtext = decode(d["body"], d["contentType"])
(OUT / "nld-detail.html").write_text(dtext, encoding="utf-8")
report["detailStatus"] = d["status"]
report["detailSha256"] = sha256_bytes(d["body"])

# Confirm the exact site-authored metadata AJAX contract before reproducing it.
contract_observed = (
    'url : "/home/getDetailInfo.do"' in dtext
    and "target : 'SJ'" in dtext
    and "var unicno = '162263';" in dtext
    and "uccno = '';" in dtext
)
report["metadataContract"] = {
    "observed": contract_observed,
    "method": "POST" if contract_observed else None,
    "url": METADATA_URL if contract_observed else None,
    "data": {
        "target": "SJ",
        "unicno": "162263",
        "uccno": "",
        "rowCnt": "1",
        "searchWd": "",
        "reQuery": "",
    } if contract_observed else None,
}
assert contract_observed, "NLD exact target page no longer authors expected metadata contract"

m = fetch(
    METADATA_URL,
    method="POST",
    data={
        "target": "SJ",
        "unicno": "162263",
        "uccno": "",
        "rowCnt": "1",
        "searchWd": "",
        "reQuery": "",
    },
)
mtext = decode(m["body"], m["contentType"])
(OUT / "nld-metadata-response.json").write_text(mtext, encoding="utf-8")
try:
    mj = json.loads(mtext)
except Exception as e:
    raise AssertionError(f"NLD metadata response is not JSON: {e}")

lst = mj.get("list") if isinstance(mj, dict) else None
assert isinstance(lst, list) and lst, "NLD metadata list missing"
item = lst[0]
# Prefer exact target record if the response contains several entries.
for x in lst:
    if not isinstance(x, dict):
        continue
    combined = " ".join(str(v) for v in x.values() if isinstance(v, (str, int, float)))
    if TITLE in combined or AUTHOR in combined or str(x.get("ucCno", "")) in {"162263", "CAT-000168477"}:
        item = x
        break

item_title = str(find_first(item, ["title", "TITLE", "titleName"]) or "")
item_author = str(find_first(item, ["author100", "author", "AUTHOR", "creator"]) or "")
uc_cno = find_first(item, ["ucCno", "uccno", "uc_cno"])
data_type = find_first(item, ["dataTypeCode", "data_type_code", "dataType"])
target_div = find_first(item, ["targetDivCode", "target_div_code", "targetDiv", "target_div"])
content_type_code = find_first(item, ["contentTypeCode", "content_type_code"])

report["metadata"] = {
    "status": m["status"],
    "sha256": sha256_bytes(m["body"]),
    "listCount": len(lst),
    "title": item_title,
    "author": item_author,
    "ucCno": uc_cno,
    "dataTypeCode": data_type,
    "targetDivCode": target_div,
    "contentTypeCode": content_type_code,
    "selectedRecord": item,
}
assert TITLE in item_title or TITLE in mtext, "NLD metadata did not reproduce exact title"
assert AUTHOR in item_author or AUTHOR in mtext, "NLD metadata did not reproduce exact author"

# The exact anonymous target page itself determines the action boundary.
user_id_blank = bool(re.search(r"var\s+USER_ID\s*=\s*['\"]\s*['\"]", dtext))
userid_blank = bool(re.search(r"var\s+userid\s*=\s*['\"]\s*['\"]", dtext))
check_session_pos = dtext.find("function checkSession")
check_access_pos = dtext.find("return checkAccessAuthority", check_session_pos if check_session_pos >= 0 else 0)
login_msg_pos = dtext.find("로그인 후 이용하실 수 있습니다", check_session_pos if check_session_pos >= 0 else 0)
return_false_pos = dtext.find("return false", check_session_pos if check_session_pos >= 0 else 0)
requires_login = (
    user_id_blank
    and userid_blank
    and check_session_pos >= 0
    and login_msg_pos >= check_session_pos
    and return_false_pos >= login_msg_pos
    and check_access_pos > return_false_pos
)
report["anonymousSession"] = {
    "USER_IDBlank": user_id_blank,
    "useridBlank": userid_blank,
    "checkSessionObserved": check_session_pos >= 0,
    "loginMessageObserved": login_msg_pos >= 0,
    "returnsFalseBeforeAuthorityCheck": requires_login,
    "requiresLogin": requires_login,
}
assert requires_login, "anonymous NLD session boundary not reproduced"

# Record the target actions but do NOT execute them. The page builds these from server metadata.
report["targetActions"] = {
    "downloadShapeObserved": "'01|'" in dtext and "doActionExt" in dtext,
    "viewShapeObserved": "'08|'" in dtext and "doActionExt" in dtext,
    "effectiveUcCno": uc_cno,
    "effectiveDataTypeCode": data_type,
    "effectiveTargetDivCode": target_div,
    "executed": False,
}

# Metadata may itself publish a separate institutional/public URL. Follow only explicit URLs.
all_urls = extract_urls_from_strings(mj)
report["observedExternalUrls"] = all_urls
allowed = []
for u in all_urls:
    host = urlparse(u).netloc.lower()
    lu = u.lower()
    if any(token in host for token in ["dcollection", "kyonggi.ac.kr"]):
        allowed.append(u)
    elif ".pdf" in lu and not any(x in lu for x in ["login", "signin", "purchase", "paywall"]):
        allowed.append(u)

seen = set()
for u in allowed[:8]:
    if u in seen:
        continue
    seen.add(u)
    try:
        r = fetch(u, timeout=30)
    except Exception as e:
        report["followedPublicExternalUrls"].append({"url": u, "error": str(e)[:300]})
        continue
    rec = {
        "url": u,
        "resolvedUrl": r["url"],
        "status": r["status"],
        "contentType": r["contentType"],
        "bytes": len(r["body"]),
        "sha256": sha256_bytes(r["body"]),
    }
    report["followedPublicExternalUrls"].append(rec)
    if r["body"].startswith(b"%PDF") or "application/pdf" in (r["contentType"] or "").lower():
        report["directPdfCandidates"].append(rec)
        (OUT / "park-hyeyoung-2018.pdf").write_bytes(r["body"])
        report["fullLengthPdfAcquired"] = True
        report["pdf"] = rec
        break
    else:
        rt = decode(r["body"], r["contentType"])
        # Only target-specific directly authored public PDF URLs may be followed.
        if TITLE in rt or AUTHOR in rt:
            pdf_urls = []
            for raw in re.findall(r"https?://[^\s'\"<>]+\.pdf(?:\?[^\s'\"<>]*)?", rt, re.I):
                pu = html.unescape(raw.rstrip("),.;"))
                if pu not in pdf_urls:
                    pdf_urls.append(pu)
            for pu in pdf_urls[:2]:
                try:
                    pr = fetch(pu, timeout=30)
                except Exception:
                    continue
                if pr["body"].startswith(b"%PDF") or "application/pdf" in (pr["contentType"] or "").lower():
                    prec = {
                        "url": pu,
                        "resolvedUrl": pr["url"],
                        "status": pr["status"],
                        "contentType": pr["contentType"],
                        "bytes": len(pr["body"]),
                        "sha256": sha256_bytes(pr["body"]),
                        "source": r["url"],
                    }
                    report["directPdfCandidates"].append(prec)
                    (OUT / "park-hyeyoung-2018.pdf").write_bytes(pr["body"])
                    report["fullLengthPdfAcquired"] = True
                    report["pdf"] = prec
                    break
    if report["fullLengthPdfAcquired"]:
        break

# Hard safety assertions.
assert report["contentActionExecuted"] is False
assert report["accessAuthorityRequestExecuted"] is False
assert report["guessedOpaqueIdentifierCount"] == 0
assert report["loginBypass"] is False
assert report["institutionAuthBypass"] is False
assert report["paywallBypass"] is False
assert report["drmRequestExecuted"] is False
assert report["decryptionActionExecuted"] is False

(OUT / "nld-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({
    "metadata": report["metadata"],
    "anonymousSession": report["anonymousSession"],
    "observedExternalUrls": report["observedExternalUrls"],
    "followedPublicExternalUrls": report["followedPublicExternalUrls"],
    "fullLengthPdfAcquired": report["fullLengthPdfAcquired"],
    "pdf": report["pdf"],
}, ensure_ascii=False, indent=2))
