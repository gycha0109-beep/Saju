# General Natal Gyeokguk — Transparency + Branch-Meeting Co-Use / Affinity Source Evidence

Date: 2026-09-12  
Status: research-only source-exemplar boundary  
Production authority: BLOCKED

## Purpose

This frontier follows:

- PR #441 — canonical month-hidden-stem / visible-stem observation substrate;
- PR #444 — selected mixed-qi month scope `{辰, 戌, 丑, 未}`;
- PR #446 — non-exhaustive positive transparency slot evidence `{year, month, hour}`;
- PR #447 — exact source-aligned full-three `會支` structural evidence.

PR #447 deliberately stopped before treating a structural meeting as a final selection-effect verdict. The selected `子平真詮 / 論雜氣如何取用` text, however, supplies one additional narrow layer of authority:

```text
一透則一用，兼透則兼用，透而又會，則透與會並用
```

It then distinguishes directly cited combinations as:

```text
有情 -> 順而相成
無情 -> 逆而相背
```

This frontier binds those statements conservatively.

It authorizes only:

```text
positive source-scoped transparency evidence
+
source-aligned full-three meeting evidence
-> transparency-and-meeting co-use source evidence
```

and, for a small set of **exact direct source exemplars only**:

```text
exact source exemplar match
-> source-direct 有情 / 無情 evidence
```

It does not authorize a generalized compatibility predicate, branch-meeting post-interaction effectiveness, candidate construction, or establishment judgment.

## Source boundary: plural/coexisting use

Selected source anchor:

```text
一透則一用，兼透則兼用，透而又會，則透與會並用
```

Narrow authority gained:

```text
transparency and branch meeting are not source-required to collapse to one winner
multiple transparency surfaces can coexist in the source discussion
transparency + meeting can coexist in the source discussion
```

Therefore:

```text
SOURCE_PLURAL_CO_USE_BOUNDARY = OBSERVED
SINGLE_WINNER_REQUIREMENT = NOT_AUTHORIZED
```

This is still not a production candidate multiplicity contract.

The system must not infer:

```text
one canonical winner
priority order
numeric strength
candidate ranking
candidate deduplication semantics
```

from the current source boundary.

## Source boundary: 有情 / 無情

Selected source states:

```text
其合而有情者吉，其合而無情者則不吉
何謂有情？順而相成者是也
何謂無情？逆而相背者是也
```

These statements establish that compatibility/ opposition matters after plural source surfaces are identified.

They do **not**, by themselves, supply a complete executable predicate for every possible chart.

Accordingly this frontier does not encode:

```text
GENERAL_AFFINITY_PREDICATE
GENERAL_DISAFFINITY_PREDICATE
```

Instead it pins only direct examples whose canonical facts can be matched without inventing extra rules.

## Direct exemplar 1 — 甲辰 / 癸 + 申子 / 有情

Selected source anchor:

```text
甲生辰月，透癸為印，而又會子會申以成局，印綬之格也，清而不雜，是透干與會支，合而有情也
```

Exact research match requires:

```text
day master = 甲
month branch = 辰
positive source-scoped transparency evidence contains 癸
source-aligned meeting evidence contains 辰申子
```

Then the research report may record:

```text
source_direct_having_affinity
```

It may **not** generalize this to:

```text
all 印 + 水局 combinations are established 印綬格
all same-axis transparency + meeting combinations are 有情
```

Those would require separate authority.

## Direct exemplar 2 — 壬未 / 己 + 亥卯 / 無情

Selected source anchor:

```text
壬生未月，透己為官，而地支會亥卯以成傷官之局，是透官與會支，合而無情者也
```

Exact research match requires:

```text
day master = 壬
month branch = 未
positive source-scoped transparency evidence contains 己
source-aligned meeting evidence contains 未亥卯
```

Then the report may record:

```text
source_direct_lacking_affinity
```

It may not generalize this into a universal 官/傷官 conflict predicate or automatic 敗格 verdict.

## Direct exemplar 3 — 甲戌 / 辛丁 + 寅午 / 無情

Selected source anchor:

```text
甲生戌月，透辛為官，而又透丁以傷官，月支又會寅會午以成傷官之局，是兩干並透，與會支合而無情也
```

Exact research match requires:

```text
day master = 甲
month branch = 戌
positive source-scoped transparency evidence contains both 辛 and 丁
source-aligned meeting evidence contains 戌寅午
```

Then the report may record:

```text
source_direct_lacking_affinity
```

If only one of 辛 / 丁 is observed, this exact exemplar is **not** matched.

No missing transparency is guessed and no generalized precedence rule is introduced.

## Why the 丑 example is not generalized here

The selected chapter also contains a 丑 / 辛 / 巳酉 / 己 example classified as 有情.

Its wording combines alternatives and multiple source surfaces in a way that would require an additional canonical interpretation decision before treating it as a stable generalized executable pattern.

This frontier therefore uses 丑 only to test the general `透與會並用` coexistence boundary and intentionally does not encode a direct 丑 affinity exemplar.

Fail-closed rule:

```text
ambiguous exemplar composition
-> no direct canonical affinity classification
```

## Canonical inputs reused

The implementation reuses the governed outputs of PR #446 and PR #447.

Transparency input:

```text
buildGeneralNatalGejuTransparencySlotSourceEvidence(snapshot)
```

Meeting input:

```text
buildGeneralNatalGejuBranchMeetingSourceEvidence(snapshot)
```

A transparency stem is eligible for this frontier only when PR #446 already records:

```text
positiveTransparencyExistenceOnObservedSlotsEstablished = true
```

A branch meeting is eligible only when PR #447 already records exact source-aligned full-three evidence.

No independent hidden-stem ranking, transparency slot expansion, or branch-combination inference is introduced here.

## Deterministic statuses

The report distinguishes:

```text
resolved_source_co_use_with_direct_exemplar_quality_evidence
resolved_source_co_use_observed_quality_unsettled
resolved_no_joint_transparency_meeting_evidence
outside_selected_mixed_qi_scope
canonical_substrate_unavailable
```

The `quality_unsettled` status is intentional.

It means:

```text
透 + 會 coexistence is source-supported
but this exact canonical combination is not one of the safely encoded direct 有情/無情 exemplars
```

No extrapolation is permitted.

## Authority gained

Research-only authority gained:

```text
TRANSPARENCY_AND_MEETING_CO_USE_SOURCE_BOUNDARY = AUTHORIZED
SOURCE_PLURAL_CO_USE_BOUNDARY = OBSERVED
DIRECT_SOURCE_EXEMPLAR_AFFINITY_EVIDENCE = AUTHORIZED
```

This materially narrows the source frontier by proving that future candidate representation must allow coexistence and by pinning exact positive/negative compatibility examples.

## Authority not gained

Still unauthorized:

```text
exhaustive transparency slot predicate
general transparency selection predicate
general branch-meeting selection-effect predicate
post-interaction effective bureau
general clash / break / damage settlement
general 清 / 濁 predicate
general 有情 / 無情 predicate
universal 官 / 傷官 conflict predicate
candidate ranking / precedence
zero/one/multiple canonical candidate contract
GEJU_CANDIDATE producer
GEJU_ESTABLISHMENT_STATE=true/false
General Natal production authority
Commerce
```

Direct source classification is evidence about the cited exemplar; it is not an establishment fact.

## Predicate ledger

Narrow authority gained:

```text
TRANSPARENCY_MEETING_SOURCE_CO_USE_EVIDENCE = AUTHORIZED
DIRECT_AFFINITY_EXEMPLAR_EVIDENCE = AUTHORIZED
DIRECT_DISAFFINITY_EXEMPLAR_EVIDENCE = AUTHORIZED
```

Still open:

```text
MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING
VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING
BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING
MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING
```

The fourth gap is narrowed by the source statement that plural/coexisting use exists, but it remains open because no canonical `GEJU_CANDIDATE[]` representation, deduplication, precedence, or identity contract is authorized yet.

The third gap remains open because co-use and direct compatibility examples do not settle generalized post-interaction meeting effectiveness.

## Fail-closed invariant

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03 = OPEN

singleWinnerRequirementAuthorized             = false
generalizedAffinityPredicateAuthorized         = false
generalizedDisaffinityPredicateAuthorized      = false
transparencySelectionPredicateAuthorized       = false
branchMeetingSelectionEffectAuthorized         = false
postInteractionEffectiveBureauAuthorized       = false
multipleCandidateRepresentationAuthorized      = false
candidateDerivationAuthorized                  = false
establishmentPredicateAuthorized               = false
candidateFactsEmitted                          = false
establishmentFactsEmitted                      = false
Commerce                                       = HOLD
```

## Verification intent

Tests must prove:

1. generic 透 + 會 evidence records co-use but no generalized quality;
2. exact 甲辰 / 癸 / 辰申子 matches only the direct 有情 exemplar;
3. exact 壬未 / 己 / 未亥卯 matches only the direct 無情 exemplar;
4. exact 甲戌 / 辛丁 / 戌寅午 requires both transparent stems before matching the direct 無情 exemplar;
5. absent meeting does not create co-use evidence;
6. outside mixed-qi scope is not broadened;
7. unavailable upstream substrate fails closed;
8. all generalized selection/candidate/establishment authorities remain false and all five coarse gaps remain open.

## Next frontier

If this research layer passes exact-head and merged-main verification, the next honest step is to decide whether the source corpus is sufficient to create a **canonical plural candidate representation contract** without first solving every success/failure predicate.

The source already establishes:

```text
一透則一用
兼透則兼用
透而又會，則透與會並用
```

That may justify a future research contract for zero/one/multiple **selection signals** while still keeping:

```text
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
production authority
Commerce
```

blocked until identity, precedence, and establishment semantics are separately governed.
