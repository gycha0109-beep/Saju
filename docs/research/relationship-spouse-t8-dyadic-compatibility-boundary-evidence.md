# Relationship / Spouse T8 — Dyadic compatibility boundary

## Decision

남기동(2020) `부부 궁합(宮合)에 관한 명리학적 연구`는 지금까지 발견된 scholarly public surface 중 **배우자/부부 관계에 대한 실제 operational compatibility procedure를 가장 구체적으로 노출하는 자료**다.

그러나 현재 직접 검수한 범위는 RISS scholarly metadata / authored abstract / table of contents이며 actual thesis body가 아니다.

```text
directFullTextObjectInspected = false
pdfScreenshotReviewed        = false
```

따라서 본문 세부 정의나 임계값을 확정하지 않는다.

더 중요한 점은 공개 초록만으로도 이 방법이 현재 Relationship T6/T8 입력 계약과 구조적으로 다르다는 것이다.

```text
single-native spouse interpretation = NO
second partner natal chart required = YES
role-neutral mapping established    = NO
canonical lossless fit              = NO
```

Authority ledger는 변하지 않는다.

```text
QUALIFYING_PRIMARY_WITNESS                  = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE            = OPEN
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING         = OPEN
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE    = OPEN
RELATIONSHIP_T6_INPUT                        = OPEN

authorityGapsClosed = 1/5
authorityAdmissionReady = false
Relationship / Spouse T8 = NOT_ESTABLISHED
Production = HOLD
```

## Source

- 남기동, `부부 궁합(宮合)에 관한 명리학적 연구`
- 동방문화대학원대학교 미래예측학과 명리학전공 박사학위논문, 2020
- RISS `T15540056`
- RISS control number `6e314e369d786dffffe0bdc3ef48d419`

## Material operational finding

The authored RISS abstract presents a modern marital-compatibility method with four components:

1. spouse palace;
2. spouse star;
3. neutralization compatibility;
4. modern sinsal compatibility.

It further describes an operational comparison procedure rather than merely listing symbolic associations. Positive and negative factors are calculated for **each spouse from both natal charts**. A negative factor in one native can be resolved when the partner supplies a corresponding neutralizing factor; accumulated negative factors across the pair indicate unfavorable compatibility.

This materially differs from the current Relationship T6/T8 target, which is a governed interpretation from a single native's canonical natal snapshot.

## Dyadic input boundary

The method requires two persons' natal charts.

```text
native natal chart  + partner natal chart
        ↓
positive / negative factors for each person
        ↓
cross-partner neutralization / accumulation judgment
```

Therefore a missing partner chart must never be fabricated, inferred, simulated, or derived from the native's chart.

A method that requires both natal charts cannot be silently relabeled as a single-native spouse reading merely because both concern marriage or spouse semantics.

## Gender-neutrality boundary

The inspected public surface also contains explicitly gender-conditioned material. The abstract includes a female-chart-specific condition involving excess Inseong and frames the base comparison data as those of a man and a woman.

Accordingly:

```text
spouse-specific methodology         = explicit
operational pairwise method         = explicit
partner-gender-independent selector = NOT_ESTABLISHED
role-neutral natal mapping          = NOT_ESTABLISHED
```

No gender-conditioned rule may be silently neutralized for production.

## Exposed negative / judgment states

The public abstract identifies or discusses conditions including:

- Yin-Yang / Five-Element imbalance or destruction of neutralization;
- spouse-palace `刑沖破害`;
- `怨嗔`;
- `白虎`;
- `魁罡`;
- spouse-palace or spouse-star `入墓`;
- `干與支同`;
- repeated occurrence of the same Five Element as the Day Branch / spouse palace;
- weak spouse star;
- spouse-star `刑沖破害`;
- insufficient `調候`;
- 比肩/劫財 count conditions;
- 正位正星 合/沖/刑/破/害;
- a female-chart-specific 印星-excess condition.

These are source-level method terms, not authorizations to calculate them from raw chart data in the current engine.

## Exposed resolving / positive states

The abstract also identifies resolution or favorable factors involving:

- partner-level Yin-Yang / Five-Element supplementation;
- `病藥` Five Element;
- defect/missing Five Element;
- `調候` Five Element;
- `調候` season;
- `包局` concerning spouse palace or spouse star;
- 正氣神 preparation;
- the partner possessing the native's `天乙貴人`.

## Canonical boundary

Current `CanonicalSajuSnapshot` can represent raw pillars, the Day Branch location, exact Ten-God observations, hidden-stem membership, optional Five-Element counts, and a limited governed relation set.

It does **not** currently provide governed source semantics for the complete method above, including:

```text
partner natal chart in the Relationship T6 single-native contract
source-governed spouse-palace semantics
source-governed spouse-star semantics
complete 刑沖破害 relation semantics
怨嗔
白虎
魁罡
入墓
source-defined weakness
調候
中和
病藥
包局
正位正星
正氣神
天乙貴人
source-defined positive/negative accumulation and resolution thresholds
```

Raw stems, branches, Ten-God observations, or partial relation facts cannot be used to invent these missing semantic states.

## No-stitching boundary

The following composition is forbidden:

```text
Nam dyadic compatibility accumulation logic
+ Kweon same-sex family / Day-Branch spouse-palace signal
+ Hong role/duty reinterpretation
+ Song actual-role language
+ traditional gendered spouse-star mappings
= invented current spouse methodology
```

No same source authorizes that composed method.

Likewise, Nam's operational detail does not close provenance for a different current single-native spouse method merely because both are spouse-related.

## Actual-body targets

The thesis table of contents provides concrete next targets:

```text
II.2 신법(新法)명리 궁합론                 — p.38
III.1 신법명리 궁합론의 사례분석          — p.83
IV.1 이별 부부 궁합의 명리적 특성         — p.168
IV.2 해로 부부 궁합의 명리적 특성         — p.172
IV.3 명리적 특성의 시사점                 — p.174
V.2 현대적 궁합론 모색                    — p.181
```

Actual-body acquisition should answer:

1. the exact definitions of each positive and negative factor;
2. exact thresholds and precedence rules;
3. whether any apparently gendered condition is generalized elsewhere in the thesis;
4. whether the full procedure always requires both partners' charts;
5. which semantic states, if any, could be mapped losslessly to governed canonical facts.

Until those pages are directly inspected, abstract wording must not be promoted into exact formulas or thresholds.

## Next action

Continue Kweon 2021 actual-body acquisition because it remains the strongest role-neutral spouse-palace frontier. Acquire Nam 2020 actual body only to bound its dyadic method precisely; do not use it to unlock the current single-native Relationship T6/T8 production path without a separately governed input and semantic architecture.
