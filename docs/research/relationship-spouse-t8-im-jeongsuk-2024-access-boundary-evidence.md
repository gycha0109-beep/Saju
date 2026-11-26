# Relationship / Spouse T8 — 임정숙 2024 RISS → UBE dCollection TLS access-boundary evidence

## Disposition

`사주日支 유형과 궁합에 대한 인식이 부부갈등에 미치는 영향 : 이혼의도를 포함하여` (임정숙, 2024)는 현재 **direct-body semantic level에서 미해결** 상태다.

Current public RISS의 exact thesis search-result card 하나 안에서 다음 identity가 함께 확인됐다.

```text
author       = 임정숙
year         = 2024
title        = 사주日支 유형과 궁합에 대한 인식이 부부갈등에 미치는 영향 : - 이혼의도를 포함하여 -
school       = 국제뇌교육종합대학원대학교 전문대학원
degree type  = 국내박사
RISS ID      = T16938426
RISS control = ba3f016fe89d898dffe0bdc3ef48d419
```

해당 card가 작성한 literal detail route와 exact detail/form만 따라 current RISS dispatcher를 재생했다. Dispatcher는 UBE dCollection item route를 직접 작성했지만, 그 route를 표준 TLS certificate verification 아래에서 따라가는 단계에서 certificate chain 검증이 실패했다.

TLS 검증을 비활성화하지 않았고 완전한 PDF/body도 획득하지 않았으므로 body-level spouse-selector admission verdict를 내리지 않는다.

## Exact identity and resolution provenance

Disposable acquisition:

```text
PR #454 = Draft / CLOSED / unmerged
exact head = c3480bcfc53ed69849a8ce0664b4a92424e88ba6
```

Identity resolution rule:

```text
CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD
→ one card title matches spouse/compatibility/conflict thesis
→ same card author = 임정숙
→ same card school = 국제뇌교육종합대학원대학교 전문대학원
→ same card year = 2024
→ same card degree type = 국내박사
→ follow only that card's literal site-authored DetailView.do URL
→ exact detail must preserve control/title/author/year signals
```

Exact search response:

```text
HTTP             = 200
response bytes   = 187,106
response SHA-256 = 378ca91b26586303be91c5aeba79575e8d87281b4d435d8632f86251b99f7e6a
```

Accepted site-authored detail URL:

```text
https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=ba3f016fe89d898dffe0bdc3ef48d419&keyword=사주日支 유형과 궁합에 대한 인식이 부부갈등에 미치는 영향 : 이혼의도를 포함하여
```

Exact detail response:

```text
HTTP             = 200
response bytes   = 241,349
response SHA-256 = ddc56e91553ca7df42b43dd8e1cd4994a45272469b275aa16f504707aba56344
single RISS ID   = T16938426
```

No RISS ID, control number, or dCollection item identifier was guessed or injected into discovery.

## Current RISS form tuple

```text
control_no     = ba3f016fe89d898dffe0bdc3ef48d419
p_mat_type     = be54d9b8bc7cdb09
p_submat_type  = b51fa0b5ced94fec
fulltext_kind  = a8cb3aaead67ab5b
```

These values came from the exact candidate detail form. They are not copied from another thesis.

## Exact bounded acquisition evidence

```text
Acquisition #1 / run 34686640187 = SUCCESS
artifact ID = 10295309141
artifact digest = sha256:5b999ca4767560087f29844fae8ed76167412c426c3e12ba7fccd90fd1674aa4

CI #2649 / run 34686639924 = SUCCESS
  CI Verify / actual Verify = SUCCESS

PCC #704 / run 34686640012 = SUCCESS
  Build production calculation image = SUCCESS
  Verify production calculation container = SUCCESS

PIE #998 / run 34686640386 = SUCCESS
  PIE profile preflight = SUCCESS
  pie / PIE prospective evidence = SUCCESS
```

The earlier branch head `edb9d0db...` used file paths that did not match the already-authored workflow/script `im-jeongsuk` contract and is not evidence. The final sibling one-commit head `c3480bcf...` was rebuilt from the then-fresh main using the same two blobs at their correct paths. Only workflows bound to `c3480bcf...` are retained.

## Current RISS dispatcher and dCollection boundary

The current RISS `document.f` plus current site-authored JS dispatcher implementation were observed. The exact dispatcher request returned:

```text
HTTP             = 200
Content-Type     = text/html; charset=utf-8
response bytes   = 8,474
response SHA-256 = 51e2e7933f6dd63c8573278d7ad63c1b8068d1b0bb8523986a8d87c00b00c9f7
```

The dispatcher itself authored exactly this external route:

```text
http://ube.dcollection.net/common/orgView/200000729734
```

The `200000729734` item identifier is preserved because it was literally authored by the matched RISS record's dispatcher response. It was not inferred from neighboring records or guessed.

Following only that route with normal certificate verification stopped at:

```text
RISS_AUTHORED_DCOLLECTION_TLS_CERT_VERIFICATION_BOUNDARY_STOP_NO_BYPASS

SSLCertVerificationError:
[SSL: CERTIFICATE_VERIFY_FAILED]
certificate verify failed: unable to get local issuer certificate (_ssl.c:1010)
```

No TLS verification bypass was attempted.

## Direct-body status

```text
complete PDF acquired             = NO
direct body rendered              = NO
direct body semantically reviewed = NO
body-level admission verdict      = NO
```

Therefore current evidence does not decide whether the thesis directly publishes any of the following:

```text
native-sex-independent spouse selector        = NOT EVALUATED FROM BODY
partner-sex-independent spouse selector       = NOT EVALUATED FROM BODY
single-native natal-only spouse selector      = NOT EVALUATED FROM BODY
complete role-neutral natal input contract    = NOT EVALUATED FROM BODY
```

`NOT EVALUATED FROM BODY` must not be converted into a semantic negative.

The table-of-contents discovery signal that motivated the candidate is not promoted to body authority.

## No-bypass / no-stitching boundary

```text
guessedOpaqueIdentifierCount = 0
loginBypass                   = false
institutionAuthBypass         = false
paywallBypass                 = false
drmRequestExecuted            = false
decryptionActionExecuted      = false
tlsVerificationDisabled       = false
crossSourceSemanticStitching  = false
```

임정숙 2024의 search/catalog/detail/dispatcher/transport metadata를 김인순 2010, 김영희 2006, 김인순 2014, 박병근 2021, 남직호 2019, 남기동 2020, 홍승필 2017, 이창임 2016 또는 다른 partial authority와 결합해 하나의 qualifying source가 직접 출판하지 않은 single-native role-neutral natal spouse selector를 만들어내지 않는다.

## Authority ledger

변경 없음:

```text
QUALIFYING_PRIMARY_WITNESS                  = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE            = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING         = OPEN
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE    = OPEN
RELATIONSHIP_T6_INPUT                        = OPEN

authorityGapsClosed = 2/5
authorityGapsOpen = 3/5
authorityAdmissionReady = false
spouseT8ProducerReady = false
productionPromotionReady = false
Production = HOLD
```

This evidence does not authorize spouse producer/rule/claim/pack/narrative/preview/compatibility activation/production activation.

## Permanent shape

Disposable workflow/script/transient HTML/artifacts are not promoted to main. Permanent main contains only bounded:

```text
src + test + docs
```

evidence.

## Next authority action

Continue single-source public fulltext discovery. The target remains one qualifying source that itself publishes a spouse-specific, natal-facts-only, operational/executable, native-sex-independent, partner-sex-independent, complete mapping. TLS/login/institution/paywall/DRM bypass and cross-source semantic stitching remain prohibited.
