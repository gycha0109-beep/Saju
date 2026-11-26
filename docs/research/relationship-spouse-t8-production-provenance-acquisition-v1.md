# Relationship / Spouse T8 Production Provenance Acquisition v1

Issue: #1829

Watchtower-Track: saju-bridge

## Purpose

SA-4B1 + SA-4B2 defines a strict acquisition contract for Production-grade
selector provenance and records an auditable candidate survey.

The governed selector remains exactly:

```text
resolved Yang Day Master
→ INDIRECT_WEALTH
→ 편재
→ 偏財

resolved Yin Day Master
→ INDIRECT_POWER
→ 편관
→ 偏官
```

The semantic output is a role-neutral natal spouse-star marker.

This research does not mutate the runtime source manifest, does not promote
`provenanceQuality`, and does not create Production or human-review authority.

## Upstream boundary

SA-4A established:

```text
Gate 14                         PASS
Regression coverage             PASS
Production source-tier check    PASS

primary_supported               NOT ESTABLISHED
multi_source_supported          NOT ESTABLISHED
trusted domain review           NOT ESTABLISHED

Production                      HOLD
```

SA-4B addresses only the provenance portion of that boundary.

## Admissible provenance routes

Two routes are allowed.

### Route A — primary_supported

One primary source must itself publish the complete bounded selector.

Required source-local evidence:

- direct reproducible body;
- complete source review;
- Yang Day Master → 偏財 explicitly;
- Yin Day Master → 偏官 explicitly;
- spouse semantics explicitly;
- one complete selector in that same source;
- Day Master polarity is the selector input;
- no native-sex input;
- no partner-sex input;
- no lived/described relationship-role input;
- no second chart.

A classical source merely discussing 財 as wife or 官殺 as husband does not
satisfy this route.

### Route B — multi_source_supported

The existing Whisper direct basis may be paired only with an independent second
source that itself publishes the same complete bounded selector.

Fragments cannot be stitched.

For example, these two sources would not qualify:

```text
Source A: Yang → 偏財
Source B: Yin  → 偏官
```

unless one source independently contains the complete selector contract.

## Survey method

The survey deliberately includes positive baseline, negative classical
witnesses, divergent modern witnesses, and partial structural evidence.

A negative result is preserved rather than discarded.

### Existing baseline

Whisper 2026 remains the current exact direct basis.

It publishes the complete role-neutral polarity selector, but remains
conservatively classified as `cross_reference`.

It cannot count as its own independent second witness.

### Classical primary-witness audit

The following public text witnesses were inspected as adversarial candidates.

#### 淵海子平

Public locator:

```text
https://zh.wikisource.org/zh-hant/淵海子平
```

Observed boundary:

- Wealth is tied to wife/concubine semantics;
- female charts are separately directed to Officer / Seven Killings for husband;
- the inspected text does not publish the governed role-neutral polarity selector;
- the public transcription carries source-verification limitations.

Disposition:

```text
NEGATIVE_PRIMARY_WITNESS
```

#### 三命通會

Public locator:

```text
https://zh.wikisource.org/zh-hant/三命通會/卷七
```

Observed boundary:

- inspected female-chart material uses 克我 / 官煞 as husband semantics;
- other inspected material names 我克 as 妻財;
- native sex remains part of the spouse-star framework.

Disposition:

```text
NEGATIVE_PRIMARY_WITNESS
```

#### 滴天髓闡微

Public locator:

```text
https://zh.wikisource.org/zh-hant/滴天髓闡微
```

Observed boundary:

- inspected 夫妻 material treats 財 as wife semantics;
- 女命 has a distinct husband-star treatment;
- contextual 用神/喜忌 substitutions are discussed;
- no single role-neutral Day-Master-polarity spouse selector is published.

Disposition:

```text
NEGATIVE_PRIMARY_WITNESS
```

These sources are valuable precisely because they prevent a false
`primary_supported` promotion.

## Independent modern-source audit

### AskLingxi — Palace Positions and the Six Relations

The inspected source explicitly separates:

- female spouse → Officer / Seven Killings;
- male spouse → Wealth.

It is independent from Whisper, but native sex remains a selector input.

Disposition:

```text
SEX_DEPENDENT_DIVERGENT_WITNESS
```

### SajuApp — Spouse Element in Saju & BaZi

The inspected source likewise preserves:

```text
men   → Wealth
women → Officer / Power
```

The Direct/Indirect distinction does not remove that native-sex branch.

Disposition:

```text
SEX_DEPENDENT_DIVERGENT_WITNESS
```

### Tao and Form — Indirect Wealth structure

The inspected source is useful for the structural definition of Indirect
Wealth, but it does not provide the complete spouse-star proposition.

Disposition:

```text
NON_QUALIFYING
```

## Survey result

Current result:

```text
Whisper exact baseline                         PRESENT

qualifying primary direct basis               0
qualifying independent second direct basis    0

primary_supported                             NOT ESTABLISHED
multi_source_supported                        NOT ESTABLISHED

Production provenance ready                   false
Production                                    HOLD
```

No existing candidate is promoted into the runtime source manifest.

## No-stitching boundary

The survey explicitly rejects:

- combining one source's Yang half with another source's Yin half;
- combining a classical sex-dependent spouse rule with a modern neutral framing;
- using a Ten-God polarity table as spouse semantics;
- relabeling spouse-palace evidence as spouse-star evidence;
- treating derivative/copied material as an independent witness;
- inferring authority from search snippets.

## Authority boundary

SA-4B establishes no authority to:

- mutate runtime source bindings;
- promote `provenanceQuality`;
- promote `reviewerStatus`;
- create ReviewAttestations;
- create ReviewerTrustGrant;
- activate Preview;
- activate Official Reading;
- create or activate Production lifecycle material.

## Next disposition

Because neither admissible provenance route is established:

```text
CONTINUE_TARGETED_INDEPENDENT_DIRECT_BASIS_DISCOVERY_OR_KEEP_PRODUCTION_HOLD
```

A future discovery may be admitted only after its full direct body and exact
selector proposition are separately inspected and content-addressed.

Failure to find a qualifying source is a valid research outcome and must not be
converted into a metadata promotion.
