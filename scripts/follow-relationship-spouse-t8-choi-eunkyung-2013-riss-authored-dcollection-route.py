#!/usr/bin/env python3
from __future__ import annotations

import json
import runpy
from pathlib import Path
from urllib.error import URLError

HERE = Path(__file__).parent
ROOT = Path('acquisition-choi-eunkyung-2013')
PDF = ROOT / 'choi-eunkyung-2013.pdf'

runpy.run_path(str(HERE / 'follow-relationship-spouse-t8-choi-eunkyung-2013-riss-authored-downloading-route.py'), run_name='__main__')
if PDF.exists():
    raise SystemExit(0)

try:
    runpy.run_path(str(HERE / 'follow-relationship-spouse-t8-choi-eunkyung-2013-riss-authored-wonkwang-route.py'), run_name='__main__')
except URLError as exc:
    message = str(exc)
    if 'CERTIFICATE_VERIFY_FAILED' not in message:
        raise
    report = {
        'rissAuthoredDcollectionUrl': 'http://wonkwang.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000001991979',
        'dcollectionHost': 'wonkwang.dcollection.net',
        'siteAuthoredItemId': '000001991979',
        'directPdfAcquired': False,
        'contentDownloadExecuted': True,
        'guessedOpaqueIdentifierCount': 0,
        'loginBypass': False,
        'institutionAuthBypass': False,
        'paywallBypass': False,
        'drmRequestExecuted': False,
        'decryptionActionExecuted': False,
        'transportError': message,
        'disposition': 'DCOLLECTION_TLS_CERTIFICATE_VERIFICATION_BOUNDARY_STOP_NO_BYPASS',
    }
    (ROOT / 'dcollection-route-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
