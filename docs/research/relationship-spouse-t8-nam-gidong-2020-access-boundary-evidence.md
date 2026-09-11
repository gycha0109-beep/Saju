# Relationship / Spouse T8 — 남기동 2020 RISS / Dongbang dCollection TLS access-boundary evidence

## Disposition

`부부 궁합(宮合)에 관한 명리학적 연구` (남기동, 2020)는 현재 **direct-body semantic level에서 미해결** 상태다.

Disposable acquisition PR #433에서 current exact RISS identity, fulltext form tuple, site-authored dispatcher, RISS-authored Dongbang dCollection item route를 opaque identifier 추측 없이 재현했다. RISS dispatcher는 HTML을 반환했고, 그 HTML이 다음 exact external route를 직접 작성했다.

```text
http://dongbang.dcollection.net/common/orgView/200000300166
```

해당 literal route를 표준 TLS 검증으로 따라갔을 때 hosted runner는 HTTPS certificate chain을 검증하지 못해 `CERTIFICATE_VERIFY_FAILED`에서 중단됐다. TLS verification은 비활성화하지 않았다. 완전한 논문 body를 얻지 못했으므로 body-level spouse-selector admission verdict를 내리지 않는다.

## Exact identity

```text
author       = 남기동
year         = 2020
title        = 부부 궁합(宮合)에 관한 명리학적 연구
school       = 동방문화대학원대학교 미래예측학과 명리학전공
RISS ID      = T15540056
RISS control = 6e314e369d786dffffe0bdc3ef48d419
acquisition  = PR #433
```

Current RISS detail에서 관측한 fulltext tuple:

```text
control_no     = 6e314e369d786dffffe0bdc3ef48d419
p_mat_type     = be54d9b8bc7cdb09
p_submat_type  = b51fa0b5ced94fec
fulltext_kind  = a8cb3aaead67ab5b
```

관측된 form 값을 그대로 current site-authored `FullTextDownload.do` contract에 재생했으며 임의의 opaque identifier를 구성하지 않았다.

## Exact bounded acquisition evidence

Disposable acquisition exact head:

```text
6de16595e837ac3a44ad301a8ad00d0e393a4c84
```

Exact-head evidence:

```text
Acquisition #1 / run 34547598969 = SUCCESS
artifact ID = 10179601703
artifact digest = sha256:71f9506b60d632aff45a3ead9a3d1690035ad8be7a35ea5f118b3c076365d897

CI #2604 / run 34547598885 = SUCCESS
actual CI Verify / Verify = SUCCESS
PCC #659 / run 34547598872 = SUCCESS
PIE #960 / run 34547599332 = SUCCESS
```

RISS dispatcher response:

```text
HTTP             = 200
Content-Type     = text/html; charset=utf-8
response bytes   = 7,993
response SHA-256 = 0e6ecac7f6f0deb3d970852791d4db8e56312f68354c6d8af29a524c160cdbca
direct PDF       = NO
```

Dispatcher body에는 Adobe reader 및 analytics URL도 있었지만, acquisition은 RISS가 작성한 dCollection route만 fulltext authority route로 취급했다.

## Exact Dongbang dCollection transport boundary

RISS-authored exact route:

```text
http://dongbang.dcollection.net/common/orgView/200000300166
```

Site-authored opaque item id:

```text
200000300166
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

따라서 남기동 2020의 body가 다음을 실제로 출판하는지는 현재 evidence로 판정하지 않는다.

```text
native-sex-independent spouse selector        = NOT EVALUATED FROM BODY
partner-sex-independent spouse selector       = NOT EVALUATED FROM BODY
single-native natal-only spouse selector      = NOT EVALUATED FROM BODY
complete role-neutral natal input contract    = NOT EVALUATED FROM BODY
```

`NOT EVALUATED FROM BODY`를 semantic negative로 바꾸면 안 된다.

## Abstract / metadata boundary

RISS abstract는 spouse palace, spouse star, separated couples, long-married couples, neutralization, 그리고 sex-conditioned 사례 언어를 포함한다. 이것은 후보 relevance를 높이는 discovery signal일 뿐, body proposition이나 executable selector authority로 승격하지 않는다.

특히 abstract의 `女命` 및 부부 양쪽 명조 관련 서술을 근거로 role-neutral 여부를 body-level에서 확정하지 않는다.

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

남기동 2020의 abstract/catalog/dispatcher/transport metadata를 홍승필 2017, 이창임 2016, 최은경 2013, 조만섭 2007 또는 다른 partial authority와 결합해 하나의 qualifying source가 직접 출판하지 않은 single-native role-neutral natal spouse selector를 만들어내지 않는다.

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

PR #433은 **Draft / CLOSED / unmerged**로 종료됐다. Network workflow/script/transient HTML/report/artifact는 permanent main에 들어가지 않는다.

Permanent main에는 bounded `src + test + docs` evidence contract만 남긴다.

## Next authority action

Single-source fulltext discovery를 계속한다. 목표는 동시에 spouse-specific, natal-facts-only, operational/executable, native-sex-independent, partner-sex-independent, complete한 mapping을 한 qualifying source에서 직접 확보하는 것이다. Public acquisition은 normal TLS validation과 site-authored public routes만 사용하며 TLS/security bypass와 cross-source semantic stitching은 금지한다.
