# General Natal Gyeokguk — Branch-Meeting Source Evidence

Date: 2026-09-12  
Status: research-only source-to-canonical evidence bridge  
Production authority: BLOCKED

## Purpose

This frontier follows:

- PR #441 — canonical month-hidden-stem / visible-stem observation substrate;
- PR #444 — selected mixed-qi month scope `{辰, 戌, 丑, 未}`;
- PR #446 — partial positive `透干` slot evidence.

The selected `子平真詮 / 論雜氣如何取用` passage defines `會支` as another mixed-qi selection axis. The remaining architectural problem is to bind that source axis to a canonical chart observation without pretending that a structural three-combination has already survived every competing interaction or become an established Gyeokguk.

This frontier therefore authorizes only:

```text
canonical source-aligned full-three structural match
-> source-aligned 會支 evidence
```

It does not authorize:

```text
structural match
-> transformation
-> effective bureau
-> GEJU_CANDIDATE
-> established Gyeokguk
```

## Selected source examples

The selected mixed-qi chapter contains branch-meeting examples across the four tomb/storehouse month branches.

### 辰

```text
何謂會支？如甲生辰月，逢申與子會局，則用水印是也
```

Bounded branch set:

```text
辰 + 申 + 子
```

### 丑

```text
又如甲生丑月，辛透為官，或巳酉會成金局
```

The current bridge deliberately requires an already resolved canonical **full-three** structural relation:

```text
丑 + 巳 + 酉
```

The wording of this example is not used to weaken the canonical full-three requirement or to invent a partial-combination production rule.

### 未

```text
如壬生未月，透己為官，而地支會亥卯以成傷官之局
```

Bounded branch set:

```text
未 + 亥 + 卯
```

### 戌

```text
如甲生戌月，透辛為官，而又透丁以傷官，月支又會寅會午以成傷官之局
```

Bounded branch set:

```text
戌 + 寅 + 午
```

These examples establish that the selected source treats the aligned branch-meeting bureau as semantically relevant to mixed-qi selection. They do not make the later `有情 / 無情`, clash/damage, precedence, candidate, or establishment stages disappear.

## Canonical substrate

The canonical snapshot can expose:

```text
derivedFacts.structuralRelations
```

with relation kind:

```text
branch_three_combination
```

The canonical contract explicitly fixes every such relation to:

```text
semantics.structuralMatchOnly       = true
semantics.transformationEstablished = false
```

This distinction is mandatory for the General Natal bridge.

## Authorized bridge

The bridge applies only when all of the following hold:

```text
1. month pillar is resolved
2. month branch is one of 辰戌丑未
3. structuralRelations is resolved
4. a branch_three_combination relation exists
5. that relation includes the month pillar
6. its three branch values exactly cover the selected source example for that month
7. canonical relation semantics remain structuralMatchOnly=true
8. transformationEstablished=false
```

Then the system may record:

```text
sourceAlignedFullThreeMeetingObserved = true
sourceMeetingUseAxisEvidenceEstablished = true
```

This is a source-evidence fact, not a final selection verdict.

## Exact source-aligned map

```text
辰 -> {辰, 申, 子}
丑 -> {丑, 巳, 酉}
未 -> {未, 亥, 卯}
戌 -> {戌, 寅, 午}
```

The map is not applied outside the selected mixed-qi month scope.

A three-combination relation that does not match the source-aligned set for the resolved month does not qualify.

## Authority gained

New research-layer authority:

```text
STRUCTURAL_MATCH_TO_SOURCE_MEETING_EVIDENCE_BRIDGE = AUTHORIZED
SOURCE_MEETING_USE_AXIS_EVIDENCE = AUTHORIZED
```

This means the system can now deterministically distinguish:

```text
source-aligned full-three meeting observed
vs
no source-aligned full-three meeting observed
vs
outside selected source scope
vs
canonical substrate unavailable
```

without inventing a transformation or Gyeokguk outcome.

## Authority not gained

The following remain unauthorized:

```text
transformation predicate
post-interaction effective bureau
clash/damage settlement for this General Natal use path
清 / 濁 settlement
有情 / 無情 settlement
branch-meeting precedence versus transparent stems
zero/one/multiple candidate representation
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE=true/false
General Natal production authority
Commerce
```

In particular:

```text
branch_three_combination structural match
!= transformation established
```

and:

```text
source-aligned 會支 evidence
!= branch-meeting selection effect fully settled
```

## Relationship to existing three-combination research

Existing Saju three-combination research already maintains a compatible boundary:

```text
full three-branch membership
-> source-bounded structural bureau formation can be recognized

but

structural bureau formation
!= post-interaction effective bureau
```

It also keeps clash break/damage settlement and post-interaction effectiveness separate.

This General Natal frontier does not import challenge-root product semantics. It only preserves the same authority separation while binding the selected mixed-qi source examples to canonical `branch_three_combination` observations.

## Predicate ledger

Narrow authority gained:

```text
SOURCE_ALIGNED_BRANCH_MEETING_STRUCTURAL_EVIDENCE = AUTHORIZED
```

Still open:

```text
BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING
```

The coarse gap remains open because structural meeting evidence is not yet a complete effective-selection predicate after conflicts and interactions.

All five coarse gaps therefore remain:

```text
MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING
VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING
BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING
MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING
```

## Fail-closed invariant

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03 = OPEN

transformationPredicateAuthorized          = false
postInteractionEffectiveBureauAuthorized   = false
branchMeetingSelectionEffectAuthorized     = false
multipleCandidateRepresentationAuthorized  = false
candidateDerivationAuthorized              = false
establishmentPredicateAuthorized           = false
candidateFactsEmitted                      = false
establishmentFactsEmitted                  = false

General Natal saleable = NO
Commerce = HOLD
Decision = NO_BUILD
```

ProductHost, Character, LLM, API presentation, browser UX, SKU, price, payment, entitlement, and refund layers must not manufacture the missing interaction or candidate semantics.

## Next frontier

After this evidence bridge, the remaining branch-meeting question becomes much narrower:

```text
Given source-aligned 會支 structural evidence,
what source-backed conditions make that meeting effective or ineffective
for mixed-qi selection after clashes and competing interactions?
```

Until that settlement is governed, `BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING` stays open.

The system must not skip directly to candidate representation or establishment judgment.
