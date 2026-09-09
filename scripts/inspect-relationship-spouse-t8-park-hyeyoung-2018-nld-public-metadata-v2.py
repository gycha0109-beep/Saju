#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import ssl
from http.cookiejar import CookieJar
from pathlib import Path
from urllib.parse import urlencode, urlparse
from urllib.request import HTTPCookieProcessor, HTTPSHandler, Request, build_opener

OUT = Path("acquisition-park-hyeyoung-2018")
OUT.mkdir(exist_ok=True)

TITLE_MAIN = "명리학 통변의 다양성 모색에 관한 연구"
TITLE_SUB = "육친론을 중심으로"
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


def extract_urls(obj) -> list[str]:
    out, seen = [], set()
    for s in flatten_strings(obj):
        for raw in re.findall(r"https?://[^\s'\"<>]+", s):
            u = html.unescape(raw.rstrip("),.;"))
            if u not in seen:
                seen.add(u)
                out.append(u)
    return out


report = {
    "candidate": {"author": AUTHOR, "title": TITLE_MAIN, "subTitle": TITLE_SUB},
    "detailUrl": DETAIL_URL,
    "metadataContract": {},
    "metadata": {},
    "observedExternalUrls": [],
    "allowedExternalFulltextUrls": [],
    "anonymousSession": {},
    "targetActions": {},
    "fullLengthPdfAcquired": False,
    "pdf": None,
    "contentActionExecuted": False,
    "accessAuthorityRequestExecuted": False,
    "guessedOpaqueIdentifierCount": 0,
    "loginBypass": False,
    "institutionAuthBypass": False,
    "paywallBypass": False,
    "drmRequestExecuted": False,
    "decryptionActionExecuted": False,
}

# This exact NLD URL was directly authored by the exact Digital Knowledge target page.
d = fetch(DETAIL_URL)
dtext = decode(d["body"], d["contentType"])
(OUT / "nld-detail.html").write_text(dtext, encoding="utf-8")
report["detailStatus"] = d["status"]
report["detailSha256"] = sha256_bytes(d["body"])

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
assert contract_observed, "NLD exact page no longer authors the expected metadata contract"

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
mj = json.loads(mtext)
lst = mj.get("list") if isinstance(mj, dict) else None
assert isinstance(lst, list) and lst, "NLD metadata list missing"

item = lst[0]
for x in lst:
    if not isinstance(x, dict):
        continue
    if str(x.get("uniCno", "")) == "162263":
        item = x
        break

title = str(item.get("title", ""))
sub_title = str(item.get("sub_title", ""))
author = str(item.get("author100") or item.get("author") or item.get("sortAuthor") or "")
gwon_list = item.get("gwonList") if isinstance(item.get("gwonList"), list) else []
gwon = gwon_list[0] if gwon_list and isinstance(gwon_list[0], dict) else {}
uc_cno = str(gwon.get("ucCno") or item.get("ucCno") or "")
data_type = str(gwon.get("dataTypeCode") or item.get("dataTypeCode") or "")
target_div = str(gwon.get("target_div_code") or item.get("targetDivCode") or "")

assert title == TITLE_MAIN, (title, TITLE_MAIN)
assert sub_title == TITLE_SUB, (sub_title, TITLE_SUB)
assert AUTHOR in author, author
assert str(item.get("uniCno", "")) == "162263"
assert uc_cno == "CAT-000168477", uc_cno

report["metadata"] = {
    "status": m["status"],
    "sha256": sha256_bytes(m["body"]),
    "listCount": len(lst),
    "title": title,
    "subTitle": sub_title,
    "author": author,
    "uniCno": str(item.get("uniCno", "")),
    "ucCno": uc_cno,
    "dataTypeCode": data_type,
    "targetDivCode": target_div,
    "contentTypeCode": item.get("contentTypeCode"),
    "contentTypeCodeName": item.get("contentTypeCodeName"),
    "dataDivCode": item.get("dataDivCode"),
    "dataDivCodeName": item.get("dataDivCodeName"),
    "publisher": item.get("publisher"),
    "rangePublishYear": item.get("rangePublishYear"),
}

# The exact target HTML itself blocks anonymous content actions before access-authority checking.
user_id_blank = bool(re.search(r"var\s+USER_ID\s*=\s*['\"]\s*['\"]", dtext))
userid_blank = bool(re.search(r"var\s+userid\s*=\s*['\"]\s*['\"]", dtext))
check_session_pos = dtext.find("function checkSession")
login_msg_pos = dtext.find("로그인 후 이용하실 수 있습니다", check_session_pos if check_session_pos >= 0 else 0)
return_false_pos = dtext.find("return false", login_msg_pos if login_msg_pos >= 0 else 0)
check_access_pos = dtext.find("return checkAccessAuthority", check_session_pos if check_session_pos >= 0 else 0)
requires_login = (
    user_id_blank and userid_blank and check_session_pos >= 0
    and login_msg_pos > check_session_pos
    and return_false_pos > login_msg_pos
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
assert requires_login, "anonymous NLD login boundary not reproduced"

report["targetActions"] = {
    "download": f"doActionExt('{data_type}','01|{uc_cno}','{target_div}')",
    "view": f"doActionExt('{data_type}','08|{uc_cno}','{target_div}')",
    "downloadShapeObservedInPage": "'01|'" in dtext and "doActionExt" in dtext,
    "viewShapeObservedInPage": "'08|'" in dtext and "doActionExt" in dtext,
    "executed": False,
}

# No content action is executed. Only record any separate public institutional/fulltext URL explicitly present in metadata.
all_urls = extract_urls(mj)
report["observedExternalUrls"] = all_urls
allowed = []
for u in all_urls:
    host = urlparse(u).netloc.lower()
    if any(token in host for token in ["dcollection", "kyonggi.ac.kr"]):
        allowed.append(u)
    elif ".pdf" in u.lower() and not any(x in u.lower() for x in ["login", "signin", "purchase", "paywall"]):
        allowed.append(u)
report["allowedExternalFulltextUrls"] = allowed

# If metadata does not itself publish an alternate public route, the login gate is the terminal NLD boundary.
report["disposition"] = (
    "PUBLIC_ALTERNATE_FULLTEXT_URL_OBSERVED_REQUIRES_FOLLOWUP"
    if allowed
    else "NLD_ANONYMOUS_LOGIN_GATE_NO_ALTERNATE_PUBLIC_FULLTEXT_URL"
)

assert report["contentActionExecuted"] is False
assert report["accessAuthorityRequestExecuted"] is False
assert report["guessedOpaqueIdentifierCount"] == 0
assert report["loginBypass"] is False
assert report["institutionAuthBypass"] is False
assert report["paywallBypass"] is False
assert report["drmRequestExecuted"] is False
assert report["decryptionActionExecuted"] is False

(OUT / "nld-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False, indent=2))
