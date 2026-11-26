# Relationship / Spouse T8 — 음종희 2019 direct-body boundary

## Decision

음종희 2019 `四柱命理 宮星에 관한 硏究 : 宮에 따른 十星작용을 중심으로`의 실제 공개 PDF 본문을 확보하고 render-first로 직접 검토했다.

이 논문은 십성의 실질적 역할과 작용 궁을 생애 단계·음양·강약·계절·합·격국/용신 등에 따라 재해석하는 현대적 유연성을 제시한다. 그러나 배우자 의미에서는 남명 재성=아내, 여명 관성/편관=남편이라는 성별 조건부 의미를 직접 유지한다.

따라서 다음 authority 상태는 변하지 않는다.

```text
QUALIFYING_PRIMARY_WITNESS                  = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE            = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING         = OPEN
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE    = OPEN
RELATIONSHIP_T6_INPUT                        = OPEN

authorityGapsClosed = 2/5
authorityGapsOpen   = 3/5
authorityAdmissionReady = false
Production = HOLD
```

## Exact scholarly identity

```text
author       = 음종희
year         = 2019
title        = 四柱命理 宮星에 관한 硏究 : 宮에 따른 十星작용을 중심으로
institution  = 경기대학교 예술대학원
degree       = 석사
DBpia        = T15047469
RISS control = b3c06fb77553c27dffe0bdc3ef48d419
```

과거 disposable acquisition PR #369는 국립중앙도서관 anonymous login/session boundary까지 확인한 뒤 full body 미획득으로 CLOSED UNMERGED 처리됐다.

이후 전수현·박외숙 조사에서 확인된 별도 RISS public fulltext 경로를 동일 논문의 exact RISS record에 다시 적용했고, disposable PR #399에서 실제 body acquisition에 성공했다.

## Public acquisition route

페이지가 직접 작성한 public relation만 따라갔다.

```text
RISS exact detail
→ page-authored fulltextDownload() form
→ /search/download/FullTextDownload.do
→ popup-authored Downloading.do
→ RISS-authored 경기대학교 dCollection item 000000053810
→ same-target HTTPS canonicalization
→ dCollection-authored /public_resource/pdf/...pdf
→ exact PDF body
```

dCollection item은 다음 상태를 직접 노출했다.

```text
drm   = N
agree = Y
```

불투명 식별자 추측, 로그인/session 우회, 기관인증 우회, paywall 우회, DRM 요청 또는 복호화는 사용하지 않았다.

## Content-addressed PDF

```text
SHA-256   = d6970955349eb775c3095be0b13617b812ff51c7d99cb09eeb21cf344f29e9d3
bytes     = 629,616
pages     = 68
encrypted = false
PDF       = 1.4
```

Acquisition evidence:

```text
PR          = #399 / CLOSED UNMERGED
exact head  = 76e843ca16ceca61089189f837eeb6991118e6b7
run         = 34440786554 / Acquisition #1
artifact ID = 10137845748
artifact SHA-256 = b934aef1f88c989e4d26729357c6997f880ff0bbeb1e4abfba7bc1e97d11b12d
```

## Render-first direct-body review

전체 68-page PDF를 먼저 렌더하고 관련 페이지를 육안 검토했다. 본문 printed page와 physical PDF page의 대응은 다음과 같다.

```text
physical PDF page = printed body page + 8
```

### printed 37 / physical 45

저자는 `正財=妻` 분류를 현대 가족관계와 연결하면서 剋관계 육친을 배우자 관계로 일반화한다. 하지만 일반화 방식 자체가 role-neutral partner가 아니라 다음과 같은 남편/아내 방향성을 유지한다.

```text
내가 간섭·통제하는 육친 → 아내
나를 간섭·통제하는 육친 → 남편
```

같은 페이지의 남명 설명 역시 日支/財星을 아내 의미로 사용한다.

### printed 41 / physical 49

여성 명조 사례에서 월간 劫財의 작용 궁을 생애 단계에 따라 재해석하여 결혼 후 `남편 궁`으로 설명한다. 이는 작용 위치의 동적 해석을 보여주지만 배우자 selector를 성별 중립적으로 교체하는 규칙은 아니다.

### printed 44 / physical 52

正財의 실제 작용을 설명하면서 `乾命`에서 正財와의 合을 아내와의 결합 및 안정적인 부부관계로 직접 해석한다.

따라서 male chart에서 Wealth→wife 의미는 실제 body에서 유지된다.

### printed 46 / physical 54

`坤命` 사례에서 甲木 偏官을 실제 `남편`으로 지칭하고 가장/생계 역할과 연결한다.

### printed 47 / physical 55

여성 사례에서 正官을 남편으로 직접 사용하며 다음 관계 설명을 제시한다.

```text
육친관계에서 남편 = 陽
남편 = 나를 剋하는 관계
남편 = 윗자리 / 어른 자리
```

즉 practical-role language가 등장하지만 남편 selector 자체는 여전히 성별·음양 관계에 직접 묶여 있다.

### printed 51 / physical 59

결론에서 배우자와 자식은 성장 후 만나게 되는 관계라는 이유로 日支와 時柱 등 후반 생애 작용 궁을 강조한다. 이는 배우자에 대한 sex-common positional layer로 사용할 수 있는 연구 결과이지만 spouse-star neutrality를 의미하지 않는다.

### printed 52-53 / physical 60-61

결론은 十星의 실질적 역할을 음양, 계절, 강약, 합, 格局/用神, 運 등과 연계해 더 세밀하게 연구해야 한다고 제안한다.

그러나 남명/여명 배우자 selection을 폐기하거나 native sex와 partner sex에 독립적인 단일 배우자 selector를 새로 정의하지 않는다.

## Admission test

```text
modern practical-role / palace reinterpretation            = YES
sex-common post-growth spouse-position layer                = YES
male Wealth / wife application                              = YES
female Officer or Seven-Killings / husband application      = YES
female husband as Yang / controlling relation               = YES
native-sex-independent operational spouse selector          = NO
partner-sex-independent operational spouse selector         = NO
role-neutral replacement spouse selector                    = NO
complete natal-facts-only role-neutral spouse input contract = NO
```

따라서:

```text
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING = OPEN
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE = OPEN
RELATIONSHIP_T6_INPUT = OPEN
authorityGapsClosed = 2/5
Production = HOLD
```

## Why practical-role flexibility is insufficient

이 논문이 제공하는 중요한 새 정보는 **십성의 의미가 고정 위치에서만 작동한다고 보지 않고 실제 역할·생애 단계·음양 조건·작용 궁에 따라 달리 해석할 수 있다**는 점이다.

하지만 다음 변환은 허용되지 않는다.

```text
practical-role reinterpretation
+ sex-common spouse position
= role-neutral spouse selector
```

논문이 실제로 배우자에 대해 사용하는 규칙은 남명 재성/아내와 여명 관성/남편의 조건을 유지한다. 위치 유연성과 의미 유연성은 selector neutrality와 다른 문제다.

## No-stitching boundary

다음 결합으로 누락된 배우자 규칙을 만들어서는 안 된다.

```text
Eum practical-role / palace reinterpretation
+ Park sex-common spouse-palace location
+ Song actual-role language
+ Hong social-role critique
+ Shin functional substitution
+ modern equality / partner terminology
= invented role-neutral spouse selector
```

같은 admissible source가 요구된 neutral spouse selection contract를 직접 제공하지 않는 한 gap은 열린 상태로 유지한다.

## Production boundary

이 evidence는 연구 경계를 고정하기 위한 것이다. 다음을 승인하지 않는다.

- spouse T8 producer/rule/claim activation
- sex/gender/partner-sex/orientation inference from natal chart
- practical role or household role inference from natal chart
- Gyeokguk/Yongsin 등 비권위 상태의 임의 생성
- cross-source semantic completion
- production promotion

## Next frontier

다음 scholarly candidate는 반드시 동일 기준으로 검증한다.

```text
same source
+ spouse specific
+ native-sex independent
+ partner-sex independent
+ natal-facts-only
+ operational selector
+ complete input contract
```

이 조건이 직접 본문에서 충족되지 않으면 `EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING`은 계속 OPEN이다.
