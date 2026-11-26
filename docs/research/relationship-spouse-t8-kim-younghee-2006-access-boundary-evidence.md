# Relationship / Spouse T8 — 김영희 2006 RISS / Kongju dCollection TLS access-boundary evidence

## Disposition

`宮合理論硏究` (김영희, 2006, 공주대학교 대학원 국내석사)는 현재 **direct-body semantic level에서 미해결** 상태다.

Disposable acquisition PR #443에서 current public RISS 검색부터 시작해 exact thesis search-result card 자체가 다음 identity를 직접 작성한 경우만 최종 authority identity로 채택했다.

```text
title        = 宮合理論 硏究
author       = 김영희
school       = 公州大學校 大學院
year         = 2006
degree type  = 국내석사
RISS ID      = T10989354
RISS control = 1e310f1b3e5a7214ffe0bdc3ef48d419
```

그 exact search card가 작성한 detail route와 fulltext tuple을 그대로 재생한 결과 RISS dispatcher는 다음 Kongju dCollection route를 직접 작성했다.

```text
https://kongju.dcollection.net/common/orgView/200000993078
```

해당 literal route를 표준 TLS 검증으로 따라갔을 때 hosted runner는 HTTPS certificate chain을 검증하지 못해 `CERTIFICATE_VERIFY_FAILED`에서 중단됐다. TLS verification은 비활성화하지 않았다. 완전한 논문 body를 얻지 못했으므로 body-level spouse-selector admission verdict를 내리지 않는다.

## Exact identity and resolution provenance

```text
author       = 김영희
year         = 2006
title        = 宮合理論硏究
school       = 공주대학교 대학원
degree       = 국내석사
RISS ID      = T10989354
RISS control = 1e310f1b3e5a7214ffe0bdc3ef48d419
acquisition  = PR #443
```

Final identity resolution rule:

```text
CURRENT_PUBLIC_RISS_SEARCH
→ exact site-authored thesis search-result card only
→ same card must contain title + 김영희 + 公州大學校/공주대학교 + 2006 + 국내석사
→ accept only that card's literal detail URL/control/fulltext tuple
→ returned detail must preserve exact control/title/author/year signals
```

Title-search response:

```text
HTTP             = 200
response bytes   = 204,142
response SHA-256 = c1d788981c765304655e722238923aac9da8ef4a3fcb1b09f31c3edb6b981e81
exact thesis search card found = YES
```

Accepted site-authored detail URL:

```text
https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=1e310f1b3e5a7214ffe0bdc3ef48d419&keyword=宮合理論硏究
```

Exact detail response:

```text
HTTP             = 200
response bytes   = 210,836
response SHA-256 = 26db2be61a0853010c81efd3dfb449ce2336063e7f947f722ac4f704c5031dd9
control literal  = present
title literal    = present
author literal   = present
year literal     = present
observed T ID    = T10989354
```

## Acquisition correction history

PR #443의 초기 세 acquisition 결과는 최종 authority evidence가 아니다.

```text
Run #1 = DISCARD — FALSE POSITIVE
reason = page-wide matcher가 이수동 2023 학술논문의 reference list에 포함된 김영희 2006을 보고 잘못 채택

Run #2 = DISCARD — FAIL CLOSED
reason = non-authoritative page UI field에서 bib_t를 읽도록 한 matcher가 exact thesis primary identity를 재현하지 못함

Run #3 = DISCARD — FAIL CLOSED
reason = thesis detail의 primary-record markup regex가 지나치게 brittle하여 exact candidate를 재현하지 못함

Run #4 = FINAL / ACCEPTED
resolution authority = exact site-authored thesis search-result card
```

따라서 Run #1의 `이수동 2023` false positive 또는 Run #2/#3의 실패 결과는 어떤 semantic/authority claim에도 사용하지 않는다. Final permanent evidence는 Run #4에만 바인딩된다.

## Current RISS fulltext tuple

```text
control_no     = 1e310f1b3e5a7214ffe0bdc3ef48d419
p_mat_type     = be54d9b8bc7cdb09
p_submat_type  = f1a8c7a1de0e08b8
fulltext_kind  = a8cb3aaead67ab5b
```

이 값은 exact thesis search-result card가 작성한 current fulltext tuple이며 opaque identifier를 추측하지 않았다.

## Exact bounded acquisition evidence

Disposable acquisition final exact head:

```text
a4d9d846d359071ab333da1eed262dcdd5fa099b
```

Final exact-head evidence:

```text
Acquisition #4 / run 34683340442 = SUCCESS
artifact ID = 10294338068
artifact digest = sha256:3206bc72e20be4ff23eaac5c6ccfaaac5614e88f6a762774be54f8ebfc2829f8

CI #2632 / run 34683340443 = actual Verify SUCCESS
PCC #687 / run 34683340444 = build + production container verify SUCCESS
PIE #986 / run 34683340725 = exact-head/read-only evidence SUCCESS
```

RISS dispatcher response:

```text
HTTP             = 200
Content-Type     = text/html; charset=utf-8
response bytes   = 7,803
response SHA-256 = 422b90a7c32d4f7f6e300891e6f4dcaf205a6d0d8a3ecec62320b6a8f9ae26c5
direct PDF       = NO
```

## Exact Kongju dCollection transport boundary

RISS-authored exact route:

```text
https://kongju.dcollection.net/common/orgView/200000993078
```

Site-authored opaque item id:

```text
200000993078
```

이 값은 RISS dispatcher에서 직접 관측한 값이며 추측하지 않았다.

표준 TLS certificate verification 하에서 연결은 다음 오류로 중단됐다.

```text
CERTIFICATE_VERIFY_FAILED
unable to get local issuer certificate
```

따라서 이 지점이 acquisition boundary다. TLS verification disable, untrusted-certificate workaround, alternate item-id guessing, login/session/institution authentication bypass, paywall bypass, DRM/decryption은 수행하지 않았다.

## Direct-body status

```text
complete PDF acquired             = NO
direct body rendered              = NO
direct body semantically reviewed = NO
body-level admission verdict      = NO
```

따라서 김영희 2006의 body가 다음을 실제로 출판하는지는 현재 evidence로 판정하지 않는다.

```text
native-sex-independent spouse selector        = NOT EVALUATED FROM BODY
partner-sex-independent spouse selector       = NOT EVALUATED FROM BODY
single-native natal-only spouse selector      = NOT EVALUATED FROM BODY
complete role-neutral natal input contract    = NOT EVALUATED FROM BODY
```

`NOT EVALUATED FROM BODY`를 semantic negative로 바꾸면 안 된다.

## Metadata boundary

Public RISS search card/detail/dispatcher metadata는 정확한 thesis identity와 transport route를 확정하는 데만 사용한다. 이 metadata는 direct-body authority가 아니며 operational input contract, native-sex independence, partner-sex independence, single-native natal spouse selector의 존재를 증명하지 않는다.

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

김영희 2006의 search/catalog/detail/dispatcher/transport metadata를 김인순 2014, 박병근 2021, 남직호 2019, 남기동 2020, 홍승필 2017, 이창임 2016 또는 다른 partial authority와 결합해 하나의 qualifying source가 직접 출판하지 않은 single-native role-neutral natal spouse selector를 만들어내지 않는다.

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

이 evidence는 spouse producer/rule/claim/pack/narrative/preview/compatibility activation/production activation을 허용하지 않는다.

## Disposable acquisition status

PR #443은 acquisition-only Draft이며 final permanent evidence 작성 전에 **CLOSED UNMERGED** 상태로 확정됐다. Acquisition workflow/script/transient HTML/report/artifact는 permanent main에 들어가지 않는다.

Permanent main에는 bounded `src + test + docs` evidence contract만 남긴다.

## Next authority action

Single-source fulltext discovery를 계속한다. 목표는 동시에 spouse-specific, natal-facts-only, operational/executable, native-sex-independent, partner-sex-independent, complete한 mapping을 한 qualifying source에서 직접 확보하는 것이다. Public acquisition은 normal TLS validation과 site-authored public routes만 사용하며 TLS/security bypass와 cross-source semantic stitching은 금지한다.
