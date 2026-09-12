# Relationship / Spouse T8 — 박병근 2021 RISS / Kongju dCollection TLS access-boundary evidence

## Disposition

`宮合의 吉凶 분석방법 연구` (박병근, 2021)는 현재 **direct-body semantic level에서 미해결** 상태다.

Disposable acquisition PR #438에서 opaque identifier를 미리 주입하지 않고 current public RISS 제목검색부터 시작했다. 검색 결과가 작성한 detail link들 가운데 반환 페이지 자체가 exact title, author, year를 만족하는 항목만 채택하여 다음 identity를 직접 재현했다.

```text
RISS ID      = T15747226
RISS control = 3fb62c8e8f683132ffe0bdc3ef48d419
```

그 exact detail form 및 current site-authored dispatcher를 재생한 결과 RISS는 다음 institutional route를 직접 작성했다.

```text
https://kongju.dcollection.net/common/orgView/200001001101
```

해당 literal route를 표준 TLS 검증으로 따라갔을 때 hosted runner는 HTTPS certificate chain을 검증하지 못해 `CERTIFICATE_VERIFY_FAILED`에서 중단됐다. TLS verification은 비활성화하지 않았다. 완전한 논문 body를 얻지 못했으므로 body-level spouse-selector admission verdict를 내리지 않는다.

## Exact identity and resolution provenance

```text
author       = 박병근
year         = 2021
title        = 宮合의 吉凶 분석방법 연구
school       = 공주대학교 일반대학원
RISS ID      = T15747226
RISS control = 3fb62c8e8f683132ffe0bdc3ef48d419
acquisition  = PR #438
```

Identity resolution rule:

```text
CURRENT_PUBLIC_RISS_TITLE_SEARCH
→ site-authored detail links only
→ returned detail must itself match exact title + author + year
→ accept that detail's own control/form values
```

Title-search response:

```text
HTTP             = 200
response bytes   = 195,564
response SHA-256 = 9d856f27a71fbfb014917e6b712714b19fb25e7bc34561b56756e2e46f4d1087
site-authored detail links observed = 6
```

Accepted site-authored detail URL:

```text
https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=3fb62c8e8f683132ffe0bdc3ef48d419&keyword=宮合의 吉凶 분석방법 연구
```

The query was percent-encoded only to make the authored URL syntactically valid for the HTTP client. No identifier value was changed or inferred.

Exact detail response:

```text
HTTP             = 200
response bytes   = 243,643
response SHA-256 = 7c32656397f4cb918fdc1947ddc0a0be8b8c85c92317fd28db7ac07d46b88964
```

## Current RISS fulltext tuple

```text
control_no     = 3fb62c8e8f683132ffe0bdc3ef48d419
p_mat_type     = be54d9b8bc7cdb09
p_submat_type  = f1a8c7a1de0e08b8
fulltext_kind  = a8cb3aaead67ab5b
```

These values were read from the accepted exact detail's current `document.f` form. No opaque identifier was guessed.

## Exact bounded acquisition evidence

Disposable acquisition exact head:

```text
8700973bc52987d759dc74df5ac93f7d5b8d6204
```

Exact-head evidence:

```text
Acquisition #2 / run 34680473197 = SUCCESS
artifact ID = 10293242746
artifact digest = sha256:f2b2c1b7c42908fd250f7162914555e240371bf5753d48f2e0849e080734c50b

CI #2614 / run 34680473217 = exact-head CI gate
PCC #669 / run 34680473138 = SUCCESS; build + production container verify = SUCCESS
PIE #970 / run 34680473459 = SUCCESS; exact-head/read-only evidence = SUCCESS
```

RISS dispatcher response:

```text
HTTP             = 200
Content-Type     = text/html; charset=utf-8
response bytes   = 7,885
response SHA-256 = 214672728493ff227b759bc271049631ddb0ed46070ce49640db9073d1eb8ae5
direct PDF       = NO
```

## Exact Kongju dCollection transport boundary

RISS-authored exact route:

```text
https://kongju.dcollection.net/common/orgView/200001001101
```

Site-authored opaque item id:

```text
200001001101
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

따라서 박병근 2021의 body가 다음을 실제로 출판하는지는 현재 evidence로 판정하지 않는다.

```text
native-sex-independent spouse selector        = NOT EVALUATED FROM BODY
partner-sex-independent spouse selector       = NOT EVALUATED FROM BODY
single-native natal-only spouse selector      = NOT EVALUATED FROM BODY
complete role-neutral natal input contract    = NOT EVALUATED FROM BODY
```

`NOT EVALUATED FROM BODY`를 semantic negative로 바꾸면 안 된다.

## Abstract / metadata boundary

Public abstract/catalog metadata describes single-form versus complex-form marital compatibility and favors complex compatibility for accuracy. This is discovery relevance only. It is not direct-body authority for the exact operational input contract, native-sex independence, partner-sex independence, or a single-native natal spouse selector.

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

박병근 2021의 abstract/catalog/search/detail/dispatcher/transport metadata를 남직호 2019, 남기동 2020, 홍승필 2017, 이창임 2016 또는 다른 partial authority와 결합해 하나의 qualifying source가 직접 출판하지 않은 single-native role-neutral natal spouse selector를 만들어내지 않는다.

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

PR #438은 acquisition-only Draft이며 final evidence publication 전에 **CLOSED UNMERGED** 상태여야 한다. Network workflow/script/transient HTML/report/artifact는 permanent main에 들어가지 않는다.

Permanent main에는 bounded `src + test + docs` evidence contract만 남긴다.

## Next authority action

Single-source fulltext discovery를 계속한다. 목표는 동시에 spouse-specific, natal-facts-only, operational/executable, native-sex-independent, partner-sex-independent, complete한 mapping을 한 qualifying source에서 직접 확보하는 것이다. Public acquisition은 normal TLS validation과 site-authored public routes만 사용하며 TLS/security bypass와 cross-source semantic stitching은 금지한다.
