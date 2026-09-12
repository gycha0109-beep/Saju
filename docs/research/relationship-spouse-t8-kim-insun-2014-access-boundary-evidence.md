# Relationship / Spouse T8 — 김인순 2014 RISS / UBE dCollection TLS access-boundary evidence

## Disposition

`命理學의 宮合論 比較硏究 - 宮合論의 論爭點을 중심으로 -` (김인순, 2014)는 현재 **direct-body semantic level에서 미해결** 상태다.

Disposable acquisition PR #440에서 opaque identifier를 미리 주입하지 않고 current public RISS 제목검색부터 시작했다. 검색 결과가 작성한 detail link 가운데 반환 페이지 자체가 candidate author, year, compatibility-comparison title을 만족하는 항목만 채택하여 다음 identity를 직접 재현했다.

```text
RISS ID      = T14317928
RISS control = 3020e7280620761dffe0bdc3ef48d419
```

그 exact detail form 및 current site-authored dispatcher를 재생한 결과 RISS는 다음 UBE dCollection route를 직접 작성했다.

```text
http://ube.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000002322906
```

해당 literal route를 표준 redirect/TLS 검증으로 따라갔을 때 hosted runner는 HTTPS certificate chain을 검증하지 못해 `CERTIFICATE_VERIFY_FAILED`에서 중단됐다. TLS verification은 비활성화하지 않았다. 완전한 논문 body를 얻지 못했으므로 body-level spouse-selector admission verdict를 내리지 않는다.

## Exact identity and resolution provenance

```text
author       = 김인순
year         = 2014
title        = 命理學의 宮合論 比較硏究 - 宮合論의 論爭點을 중심으로 -
school       = 국제뇌교육종합대학원대학교 국학과
RISS ID      = T14317928
RISS control = 3020e7280620761dffe0bdc3ef48d419
acquisition  = PR #440
```

Identity resolution rule:

```text
CURRENT_PUBLIC_RISS_TITLE_SEARCH
→ site-authored detail links only
→ returned detail must itself match candidate author + year + compatibility-comparison title
→ accept that detail's own control/form values
```

Title-search response:

```text
HTTP             = 200
response bytes   = 185,981
response SHA-256 = eb583a54df6563daab5093785ca5b703f7702c782de6635dac6f168465b34756
site-authored detail links observed = 1
```

Accepted site-authored detail URL:

```text
https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=3020e7280620761dffe0bdc3ef48d419&keyword=命理學의 宮合論 比較硏究 - 宮合論의 論爭點을 중심으로 -
```

The query was percent-encoded only for HTTP-client syntax. No opaque identifier value was changed or inferred.

Exact detail response:

```text
HTTP             = 200
response bytes   = 238,948
response SHA-256 = b6efb332ab33bcb8f3c64a7b328d2f405414c7b64c4816d217d089b9e60f3c70
```

## Current RISS fulltext tuple

```text
control_no     = 3020e7280620761dffe0bdc3ef48d419
p_mat_type     = be54d9b8bc7cdb09
p_submat_type  = b51fa0b5ced94fec
fulltext_kind  = a8cb3aaead67ab5b
```

These values were read from the accepted exact detail's current `document.f` form. No opaque identifier was guessed.

Site-authored national-library local bib number:

```text
KDM201502546
```

이 값도 current detail form/dispatcher request에서 직접 관측했으며 추측하지 않았다.

## Exact bounded acquisition evidence

Disposable acquisition exact head:

```text
771f690c878ea2dcd38dd0ec39b2610c49643204
```

Exact-head evidence:

```text
Acquisition #1 / run 34681591787 = SUCCESS
artifact ID = 10293879851
artifact digest = sha256:5ce2b785ee7b1723895df823aaec77cab4368a26e03ba9d5303a12cf0542f84f

CI #2618 / run 34681591776 = exact-head CI gate
PCC #673 / run 34681591772 = SUCCESS; build + production container verify = SUCCESS
PIE #972 / run 34681592014 = SUCCESS; exact-head/read-only evidence = SUCCESS
```

RISS dispatcher response:

```text
HTTP             = 200
Content-Type     = text/html; charset=utf-8
response bytes   = 8,335
response SHA-256 = c448060be0965f54a5c6a83adb4f16705166da8853f81cbbafbdd9ef7d03cd4f
direct PDF       = NO
```

## Exact UBE dCollection transport boundary

RISS-authored exact route:

```text
http://ube.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000002322906
```

Site-authored opaque item id:

```text
000002322906
```

이 값은 RISS dispatcher에서 직접 관측한 값이며 추측하지 않았다.

표준 redirect/certificate verification 하에서 연결은 다음 오류로 중단됐다.

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

따라서 김인순 2014의 body가 다음을 실제로 출판하는지는 현재 evidence로 판정하지 않는다.

```text
native-sex-independent spouse selector        = NOT EVALUATED FROM BODY
partner-sex-independent spouse selector       = NOT EVALUATED FROM BODY
single-native natal-only spouse selector      = NOT EVALUATED FROM BODY
complete role-neutral natal input contract    = NOT EVALUATED FROM BODY
```

`NOT EVALUATED FROM BODY`를 semantic negative로 바꾸면 안 된다.

## Abstract / metadata boundary

Public catalog/search/abstract metadata makes this dissertation highly relevant to compatibility-theory comparison. That relevance is discovery-only. It is not direct-body authority for the exact operational input contract, native-sex independence, partner-sex independence, or a single-native natal spouse selector.

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

김인순 2014의 catalog/search/detail/dispatcher/transport metadata를 박병근 2021, 남직호 2019, 남기동 2020, 홍승필 2017, 이창임 2016 또는 다른 partial authority와 결합해 하나의 qualifying source가 직접 출판하지 않은 single-native role-neutral natal spouse selector를 만들어내지 않는다.

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

PR #440은 acquisition-only Draft이며 final evidence publication 전에 **CLOSED UNMERGED** 상태여야 한다. Network workflow/script/transient HTML/report/artifact는 permanent main에 들어가지 않는다.

Permanent main에는 bounded `src + test + docs` evidence contract만 남긴다.

## Next authority action

Single-source fulltext discovery를 계속한다. 목표는 동시에 spouse-specific, natal-facts-only, operational/executable, native-sex-independent, partner-sex-independent, complete한 mapping을 한 qualifying source에서 직접 확보하는 것이다. Public acquisition은 normal TLS validation과 site-authored public routes만 사용하며 TLS/security bypass와 cross-source semantic stitching은 금지한다.
