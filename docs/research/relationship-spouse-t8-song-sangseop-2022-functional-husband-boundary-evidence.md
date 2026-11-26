# Relationship / Spouse T8 — Song Sangseop 2022 functional-husband direct-body boundary

## Decision

송상섭 2022 `命理學의 六親論 硏究 : -滴天隨闡微를 中心으로-`의 실제 원문을 공개 RISS → 원광대 dCollection 체인으로 획득하고 직접 검토했다.

이 논문은 단순한 `여명 官星=남편` 고정 규칙보다 훨씬 유연한 배우자 판단을 실제로 제시한다. 특히 여명에서 官星이 지나치게 강하거나 약하거나 부재할 때 傷官·食神·財星·印星 등 원국 균형에 필요한 다른 十神을 남편 판단의 기능적 기준으로 사용할 수 있다고 설명하고, 최종적으로 `여자의 명조에서 남편의 별자리는 바로 용신`이라는 주장을 수용한다.

그러나 이 remapping은 끝까지 **여자 명조의 남편 판단 branch** 안에서만 성립한다. 남자 명조의 배우자는 별도의 財星/妻 체계로 다뤄진다. 따라서 이것은 role-neutral spouse selector가 아니다.

```text
QUALIFYING_PRIMARY_WITNESS                  = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE            = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING         = OPEN
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE    = OPEN
RELATIONSHIP_T6_INPUT                        = OPEN

authorityGapsClosed = 2/5
authorityGapsOpen = 3/5
authorityAdmissionReady = false
Production = HOLD
```

## Source identity

```text
author       = 송상섭
year         = 2022
title        = 命理學의 六親論 硏究 : -滴天隨闡微를 中心으로-
institution  = 원광대학교 일반대학원
degree       = 박사
RISS ID      = T16377357
RISS control = 6188af0cf49b0838ffe0bdc3ef48d419
UCI          = I804:45008-200000631721
dCollection  = 200000631721
```

Prior acquisition boundary: #374.

Direct-body re-acquisition: #401.

## Why #374 could be revisited without bypassing its boundary

#374 correctly stopped because the then-inspected source union did not directly expose the implementation of the global RISS `fulltextDownload()` function. Calling an inferred hidden dispatcher was therefore not authorized.

The current RISS detail page directly authors a `searchCommon.js` script reference. The script was fetched and directly inspected before any dispatcher call. It explicitly contains:

```text
function fulltextDownload(...)
loginFlag.value = "1"
/search/download/FullTextDownload.do
```

This turned the previously unknown dispatcher into a site-authored public contract rather than a guessed route.

The exact public chain was then:

```text
RISS exact detail
→ detail-page-authored searchCommon.js
→ verified fulltextDownload() implementation
→ FullTextDownload.do
→ popup-authored Downloading.do
→ RISS-authored Wonkwang dCollection item 200000631721
→ active non-DRM public PDF redirect authored by that item page
→ exact PDF body
```

The Wonkwang item page directly authored:

```text
drm = N
msg = ''
active location.replace('/public_resource/pdf/...pdf'+sPage)
fileSize = 1895533
```

The page did not define an `agree` variable. That absence was not treated as permission by itself. The decisive evidence was the page's own active non-DRM execution branch, which redirects to the exact public PDF path, plus the empty message gate and exact server file size.

No opaque identifier guessing, login/session bypass, institutional authentication bypass, paywall bypass, DRM request, or decryption occurred.

## Content address

```text
RISS searchCommon.js SHA-256 = d00f2205c1e40ef8ff0d499b938f2c9f782f5d0a52a082e459127b77bf40f9b8
PDF SHA-256                 = 9df71be1ff471d329a58af2ccb88d01aa71fa6a4f0aaed81762f28c2761e5988
PDF bytes                   = 1,895,533
PDF pages                   = 208
encrypted                   = false
PDF version                 = 1.4
```

Acquisition #3 exact-head artifact:

```text
run      = 34445438774
artifact = 10139470113
digest   = sha256:54f13245e4a8402792b0708dc2cee73e2bc5d067573fa0b59ea8ae2d6d75234d
```

## Render-first body inspection

Text extraction was used only to locate relevant pages. The decisive pages were rendered and visually inspected. Main-body page mapping is:

```text
physical PDF page = printed page + 19
```

### Printed 84 / physical 103 — male spouse branch

The male-chart discussion accepts the traditional principle that Wealth represents the wife. The criticism on this page is directed at extending Wealth to the father, not at the wife assignment itself.

This establishes that the source has not replaced the male-wife branch with a generic partner selector.

### Printed 89 / physical 108 — female husband substitution begins

The female-chart chapter states that clear Officer normally corresponds to a good husband, but immediately provides functional substitutions:

```text
Officer too strong  → Injury Officer may be used as husband
Officer too weak    → Wealth may be used as husband
strong Peer/no Officer → Injury Officer may be used as husband
strong Injury Officer/no Wealth/Officer → Resource may be used as husband
```

The exact details vary with chart balance. The important methodological fact is that this is not a fixed Officer-only rule.

### Printed 91 / physical 110 — fixed Officer-only rule explicitly rejected

The source directly states that one should not insist on discussing the husband only through Officer. It instead emphasizes the whole chart's stable and favorable configuration.

This is a genuine functional-remapping result and is preserved as positive evidence.

### Printed 93 / physical 112 — multiple husband substitutions

The Ren Tieqiao discussion supplies multiple female-chart conditions under which Resource, Food God/Injury Officer, or Wealth functions as the husband indicator according to what balances the chart.

The author's explanation says the relevant kinship action should be judged through the required balancing function rather than merely by the nominal Officer label.

### Printed 97 / physical 116 — husband star is Yongsin

The source states that in a female chart the husband's star is the `用神`, while the child's star is the `喜神`, and therefore it is wrong to discuss husband only as Officer and children only as Food God/Injury Officer.

The author then interprets this as a chart-balance rule for judging the woman's husband relationship.

This is the strongest body-level spouse remapping found in this source.

### Printed 125 / physical 144 — comparative husband/wife table

The author's comparative table still has separate `夫` and `妻妾` columns.

Across the compared literature:

```text
夫     = 官星 / 正官 / 喜神 / 用神 according to source
妻妾   = 財星 / 正財·偏財
```

The same page separately summarizes spouse location as Day Pillar or Day Branch. A sex-common spouse location does not remove the sex-separated star framework.

### Printed 140 / physical 159 — female branch remains explicit

The text explicitly begins from `女命` and states that what controls the native is taken as husband. Officer or Seven-Killings is then chosen inside that female/husband rule.

Thus even after functional remapping is recognized, the semantic target remains sex-specific `female → husband`.

### Printed 177-181 / physical 196-200 — conclusion

The conclusion makes two important points simultaneously.

First, Yukchin theory has changed while reflecting social convention and value systems. The author accepts Ren Tieqiao's revisions as practically useful and explicitly approves the claim that in a female chart husband may be judged through Yongsin rather than Officer alone.

Second, the conclusion continues to describe kinship allocation through differentiated male/female relations. It does not publish one spouse relation that can be evaluated without choosing the native-sex/partner-role branch.

## Admission analysis

The direct body therefore establishes all of the following:

```text
fixed Officer-only female husband selector rejected        = YES
female chart functional husband substitution               = YES
female husband = Yongsin formulation                       = YES
social-value-conditioned theory evolution                  = YES
sex-common spouse location layer                           = YES
male Wealth/wife framework                                 = YES
female husband framework remains separately explicit       = YES
```

But the required authority property is stronger:

```text
same source
+ spouse-specific
+ native-sex-independent
+ partner-sex-independent
+ natal-only
+ operationally complete
```

Song Sangseop 2022 does not provide that contract.

```text
native-sex-independent spouse selector       = NO
partner-sex-independent spouse selector      = NO
role-neutral replacement spouse selector     = NO
```

The thesis demonstrates that **a traditional spouse star may be functionally substituted without becoming role-neutral**. This distinction is the permanent value of the source.

## Canonical correspondence boundary

Even if the female/husband branch were otherwise admissible, the proposed functional selection relies on semantics such as:

```text
用神
喜神
格局
日主 strength
whole-chart balancing requirement
source-specific favorable/adverse functional relation
```

Those are not currently admitted as lossless Relationship T6 canonical facts. Raw stems, branches, and Ten-God labels cannot be used to invent them.

Therefore:

```text
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE = OPEN
RELATIONSHIP_T6_INPUT = OPEN
```

## No-stitching boundary

Forbidden synthesis examples include:

```text
Song Sangseop female Yongsin husband remapping
+ sex-common spouse palace from another source
= invented partner-neutral spouse selector
```

or:

```text
Song functional substitution
+ modern actual-role / equality language from another source
= invented role-neutral natal mapping
```

or:

```text
raw CanonicalSajuSnapshot facts
+ generic balancing arithmetic
= fabricated Yongsin / Heesin / Gyeokguk semantics
```

Each missing semantic layer requires its own admitted authority.

## Frozen result

```text
functional spouse remapping materially established         = YES
role-neutral spouse selection established                  = NO
native-sex independence established                        = NO
partner-sex independence established                       = NO
lossless governed natal input contract established         = NO
cross-source stitching authorized                          = NO
spouse T8 producer ready                                   = NO
Production                                                 = HOLD
```

The next research target must publish, in one source, an operational spouse selector whose selection does not depend on native sex or partner sex and whose required natal semantics can be represented without inventing ungoverned method states.
