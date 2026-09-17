# General Natal — bounded 四柱 root-presence completeness authority review

Date: 2026-09-17  
Issue: #746  
Scope: `bounded_sizhu_root_presence_completeness_before_canonical_has_root_settlement_review`

## Decision

```text
INCOMPLETE_SETTLEMENT_BLOCKED
```

This artifact does not implement a canonical `四柱有根` resolver. It audits whether the currently governed bounded positive root-presence surface is complete enough to authorize canonical settlement.

## Fresh implementation base

```text
b92a0f1d98e7bddd4554432f1c79191a92b728c8
```

## Selected source

Selected source remains:

```text
子平真詮 / 子平真詮評註
論十幹得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh revalidation on 2026-09-17 confirms that the same passage contains the `四柱有根` context and root-class discussion, while the attached commentary also preserves context-sensitive Tonggen/Yuqi treatment and explicitly disputes part of the Yin 長生 root claim.

This review therefore consumes existing governed source observations rather than creating a new interpretation of the source text.

## Current bounded positive surface

Merged #739 currently provides provenance-aware research-only positive evidence for:

```text
旺
non-Earth 墓庫
non-Earth 餘氣
Yang 長生 established
four governed non-Earth Yang 祿 positives
```

The upstream aggregate deliberately keeps:

```text
sizhuHasRootSettled = false
absenceMeansNoRoot = false
root observation count semantics = false
root position weighting = false
```

Positive evidence availability is therefore not canonical settlement authority.

## Exact upstream pins

This review pins exact version/hash identities for:

```text
#739 bounded four-pillar positive root-presence surface
#741 Yin 長生 source-strata conflict
#560 Lu/Linguan term binding and Yin-Lu ambiguity
#570 Lu-location observations and Earth attachment boundary
#558 Muku/Yuqi light-root authority and Earth boundary
#711 四柱有根 source-capacity observation
```

No upstream matcher is reimplemented or widened.

## Completeness blockers

### Yin 長生

#741 records both source strata and concludes:

```text
source conflict = observed
source-strata precedence rule = missing
resolution = unresolved
positive-root promotion = unauthorized
no-root promotion = unauthorized
```

A completeness review cannot choose one source stratum on behalf of the repository.

### Yin 祿

#560 preserves:

```text
source-internal Yin-Lu interpretation = AMBIGUOUS
complete selected-source Lu branch matcher = unauthorized
bounded examples -> general mapping = false
```

The four governed Yang Lu matches cannot be generalized to Yin stems.

### Earth 祿

#570 preserves two selected-source Earth attachment observations while keeping:

```text
single fixed Earth Lu location = unresolved
canonical element+branch sufficient to select attachment = false
attachment selection rule = unauthorized
```

No guessed single Earth Lu branch is allowed.

### Earth 墓庫 / 餘氣

#558 directly records Earth 墓庫 non-applicability in its selected framing and leaves:

```text
Earth Yuqi mapping = unresolved
complete five-element Muku/Yuqi mapping = unauthorized
```

Hidden-stem order and a foreign Twelve-Growth table remain forbidden shortcuts.

### Negative / absence semantics

The bounded four-pillar chain is intentionally positive-only and accepts partial pillar maps.

Therefore:

```text
zero bounded evidence != 四柱無根
missing pillar != negative root evidence
partial pillar map != complete absence proof
```

No governed negative-completeness rule currently exists.

## Canonical representability

Raw canonical identities are available:

```text
StemFact.value
StemFact.yinYang
StemFact.element
PillarSlot
EarthlyBranch
```

The blocker is not data availability. It is semantic completeness and authority.

This review consumes no chart facts and exports no evaluator.

## Final authority verdict

```text
DIRECT_SOURCE_SIZHU_HAS_ROOT_CONTEXT                         = OBSERVED
CURRENT_BOUNDED_POSITIVE_ROOT_SURFACE                        = AVAILABLE_RESEARCH_ONLY
CANONICAL_ROOT_INPUT_IDENTITIES                              = AVAILABLE

YIN_CHANGSHENG_ROOT_STATUS_COMPLETENESS                      = UNRESOLVED_SOURCE_CONFLICT
YIN_LU_COMPLETENESS                                          = AMBIGUOUS
EARTH_LU_ATTACHMENT_COMPLETENESS                             = UNRESOLVED
EARTH_YUQI_COMPLETENESS                                      = UNRESOLVED
NEGATIVE_ROOT_ABSENCE_SEMANTICS                              = MISSING
PARTIAL_PILLAR_OMISSION_TO_NEGATIVE                         = UNAUTHORIZED

BOUNDED_ROOT_PRESENCE_SURFACE_COMPLETE_FOR_CANONICAL_SETTLEMENT = false
CANONICAL_SIZHU_HAS_ROOT_RESOLVER                            = UNAUTHORIZED
ROOT_EVIDENCE_TO_SIZHU_HAS_ROOT_SETTLEMENT                   = UNAUTHORIZED
NO_BOUNDED_EVIDENCE_TO_SIZHU_NO_ROOT                        = UNAUTHORIZED
```

## Non-executable implementation boundary

The source artifact exports no function.

It contains only:

```text
immutable source metadata
current positive-surface registry
completeness blocker registry
canonical representability metadata
exact upstream version/hash pins
fail-closed authority flags
definition hash
```

It does not contain:

```text
chart evaluator
root matcher
canonical 四柱有根 resolver
negative-root resolver
source-strata precedence resolver
```

## Explicit non-authority

Do not infer or implement:

```text
current positive observation -> canonical 四柱有根=true
zero current observations -> 四柱無根 / hasRoot=false
missing pillar slot -> negative root evidence
classical Yin 長生 stratum wins
commentary Yin 長生 stratum wins
same-element Yin stem inherits Yang 祿 branch
Earth gets one guessed 祿 attachment
Earth 餘氣 from hidden-stem storage order
foreign Twelve-Growth stage -> selected-source Lu/root completion
bounded Tonggen -> canonical 四柱有根
root observation count -> completeness or strength
pillar position -> numeric/non-numeric weight
month root -> automatic strongest-root settlement
黨眾 / 助寡
強 / 不弱 / final 強弱 / 旺衰
Gyeokguk candidate / establishment
Production fact / SKU / Commerce
```

## Test contract

Tests prove:

- the decision is `INCOMPLETE_SETTLEMENT_BLOCKED`;
- all known completeness blockers remain explicit;
- all six exact upstream version/hash pairs are pinned;
- no executable function is exported;
- raw canonical identities remain representable without chart-fact consumption by this review;
- positive, zero, missing, and partial evidence never become canonical settlement;
- no source-strata precedence is assigned;
- count/position weighting, strength, Gyeokguk, Production, SKU, and Commerce remain fail-closed.

## Production invariant

Unchanged:

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```
