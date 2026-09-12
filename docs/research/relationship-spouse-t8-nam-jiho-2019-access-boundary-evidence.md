# Relationship / Spouse T8 — 남직호 2019 RISS / UBE dCollection TLS access-boundary evidence

## Disposition

`宮合과 離婚에 미치는 命理변수의 영향` (남직호, 2019)는 현재 **direct-body semantic level에서 미해결** 상태다.

Disposable acquisition PR #435에서 current exact RISS identity, fulltext form tuple, site-authored dispatcher, RISS-authored UBE dCollection item route를 opaque identifier 추측 없이 재현했다. RISS dispatcher는 HTML을 반환했고, 그 HTML이 다음 exact external route를 직접 작성했다.

```text
http://ube.dcollection.net/common/orgView/200000182751
```

해당 literal route를 표준 TLS 검증으로 따라갔을 때 hosted runner는 HTTPS certificate chain을 검증하지 못해 `CERTIFICATE_VERIFY_FAILED`에서 중단됐다. TLS verification은 비활성화하지 않았다. 완전한 논문 body를 얻지 못했으므로 body-level spouse-selector admission verdict를 내리지 않는다.

## Exact identity

```text
author       = 남직호
year         = 2019
title        = 宮合과 離婚에 미치는 命理변수의 영향
school       = 국제뇌교육종합대학원대학교 동양학과
RISS ID      = T15169258
RISS control = c357150c3e5609c7ffe0bdc3ef48d419
local bibno  = KDM201955654
acquisition  = PR #435
```

Current RISS detail에서 관측한 fulltext tuple:

```text
control_no     = c357150c3e5609c7ffe0bdc3ef48d419
p_mat_type     = be54d9b8bc7cdb09
p_submat_type  = b51fa0b5ced94fec
fulltext_kind  = a8cb3aaead67ab5b
```

관측된 form 값을 그대로 current site-authored `FullTextDownload.do` contract에 재생했으며 임의의 opaque identifier를 구성하지 않았다.

## Exact bounded acquisition evidence

Disposable acquisition exact head:

```text
89b90edc7970ff27fcd1a880f41f92960c6f97ca
```

Exact-head evidence:

```text
Acquisition #1 / run 34548857316 = SUCCESS
artifact ID = 10180055145
artifact digest = sha256:5ba6c302063baaf1faf39233ce52ba5249abca69abe1dd3b14db50d3e847ec27

CI #2607 / run 34548857228 = SUCCESS; actual Verify = SUCCESS
PCC #662 / run 34548857217 = SUCCESS; build + production container verify = SUCCESS
PIE #963 / run 34548861778 = SUCCESS; exact-head/read-only evidence = SUCCESS
```

RISS dispatcher response:

```text
HTTP             = 200
Content-Type     = text/html; charset=utf-8
response bytes   = 7,917
response SHA-256 = 723808b5411314cf818eb839799bd9f1b761e04239e55153a383675f358aff6b
direct PDF       = NO
```

Dispatcher body에는 Adobe reader 및 analytics URL도 있었지만, acquisition은 RISS가 작성한 dCollection route만 fulltext authority route로 취급했다.

## Exact UBE dCollection transport boundary

RISS-authored exact route:

```text
http://ube.dcollection.net/common/orgView/200000182751
```

Site-authored opaque item id:

```text
200000182751
```

이 값은 RISS dispatcher에서 직접 관측한 값이며 추측하지 않았다.

표준 certificate verification 하에서 연결은 다음 오류로 중단됐다.

```text
CERTIFICATE_VERIFY_FAILED
unable to get local issuer certificate
```

따라서 이 지점이 acquisition boundary다. TLS verification disable, untrusted certificate workaround, alternate item-id guessing, login/session/institution authentication bypass, paywall bypass, DRM/decryption은 수행하지 않았다.

## Direct-body status

```text
complete PDF acquired             = NO
direct body rendered              = NO
direct body semantically reviewed = NO
body-level admission verdict      = NO
```

따라서 남직호 2019의 body가 다음을 실제로 출판하는지는 현재 evidence로 판정하지 않는다.

```text
native-sex-independent spouse selector        = NOT EVALUATED FROM BODY
partner-sex-independent spouse selector       = NOT EVALUATED FROM BODY
single-native natal-only spouse selector      = NOT EVALUATED FROM BODY
complete role-neutral natal input contract    = NOT EVALUATED FROM BODY
```

`NOT EVALUATED FROM BODY`를 semantic negative로 바꾸면 안 된다.

## Abstract / metadata boundary

RISS abstract 및 catalog metadata는 궁합, 이혼, 개인 사주 변수, 남녀 두 사주의 결합 변수를 연구 대상으로 제시한다. 이것은 후보 relevance를 높이는 discovery signal일 뿐, body proposition이나 executable selector authority로 승격하지 않는다.

특히 abstract-level 통계 결과나 남녀 결합변수 언어를 근거로 native-sex-independent / partner-sex-independent 여부를 body-level에서 확정하지 않는다.

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

남직호 2019의 abstract/catalog/dispatcher/transport metadata를 남기동 2020, 홍승필 2017, 이창임 2016, 최은경 2013 또는 다른 partial authority와 결합해 하나의 qualifying source가 직접 출판하지 않은 single-native role-neutral natal spouse selector를 만들어내지 않는다.

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

PR #435는 acquisition-only Draft이며 **CLOSED UNMERGED** 상태다. Network workflow/script/transient HTML/report/artifact는 permanent main에 들어가지 않는다.

Permanent main에는 bounded `src + test + docs` evidence contract만 남긴다.

## Next authority action

Single-source fulltext discovery를 계속한다. 목표는 동시에 spouse-specific, natal-facts-only, operational/executable, native-sex-independent, partner-sex-independent, complete한 mapping을 한 qualifying source에서 직접 확보하는 것이다. Public acquisition은 normal TLS validation과 site-authored public routes만 사용하며 TLS/security bypass와 cross-source semantic stitching은 금지한다.
