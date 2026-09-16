# General Natal — Governed 印綬 Member → 黨眾 Support-Constituent Evidence

- Issue: #685
- Track: General Natal / 旺衰·強弱 authority
- Date: 2026-09-16
- Decision: `AUTHORIZED_RESEARCH_ONLY`
- Scope: `governed_yinshou_member_to_dang_zhong_support_constituent_evidence`

## 1. Purpose

This artifact governs exactly one narrow semantic bridge.

Already-governed upstream work now provides a single-fact research-only evaluation in which an already-resolved canonical `정인` or `편인` fact can be admitted into the source-side `印綬` category.

Separately, the selected classical source directly states:

```text
比劫印綬通根扶助為黨眾
```

The current review asks only whether a positive governed `印綬` member may be preserved as one bounded source-named support constituent associated with `黨眾`.

It does not ask whether that constituent is sufficient to establish `黨眾`.

## 2. Exact fresh-main basis

Issue #685 was opened from fresh main:

```text
cb919e756d8f5d06d2f6f5a48234198d40f2b5ae
```

The implementation branch is required to start from that exact main unless a later fresh-main race is detected before PR creation or merge.

## 3. Direct source

Selected source:

```text
子平真詮 / 子平真詮評註
論十干得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Fresh verification on 2026-09-16 confirms the relevant passage:

```text
旺衰強弱四字，昔人論命，每籠統互用，不知須分別看也。
大致得時為旺，失時為衰；黨眾為強，助寡為弱。
春木夏火秋金冬水為得時，比劫印綬通根扶助為黨眾。
```

The existing governed context-observation artifact records this narrowly as:

```text
比劫 / 印綬 / 通根扶助 are source-associated with 黨眾
```

and explicitly does not normalize that sentence into a complete executable chart-level predicate.

## 4. Upstream canonical authority

Merged #678 / PR #680 governs exactly one upstream evaluator:

```text
admitResolvedCanonicalYinToYinshouCategory(
  fact: FactState<TenGod>
)
```

Its bounded positive outputs are:

```text
resolved 정인
→ sourceLabel = 正印
→ sourceCategory = 印綬
→ membershipObserved = true

resolved 편인
→ sourceLabel = 偏印
→ sourceCategory = 印綬
→ membershipObserved = true
```

Ambiguous or unavailable Ten-God facts fail closed. Other resolved Ten-Gods are only outside that authority's bounded Yin scope; they do not become generalized `非印綬` verdicts.

The current bridge does not consume `FactState<TenGod>` itself. It consumes only the upstream `CanonicalYinshouCategoryMemberEvaluation`.

## 5. Precedent

#645 / #646 already governs an analogous but separate bridge:

```text
governed visible 比肩 evidence
→ bounded source-named 比劫 support constituent evidence
```

That artifact preserves `dangZhongEstablished=false` even when positive constituent evidence exists.

The current `印綬` bridge follows the same non-escalation principle.

It does not combine the two constituent families.

## 6. Duplicate audit

Fresh searches were performed for:

```text
印綬 黨眾 support constituent
yinshou support constituent
yinshou_support_constituent
```

No dedicated issue, PR, branch, or default-branch authority artifact was found.

Existing relevant work stops at different boundaries:

- #642/#644: source context observations only.
- #645/#646: visible `比肩` → `比劫` support constituent only.
- #655/#661: source-side `印綬` 正/偏 category observation only.
- #672/#677: canonical `정인/편인` ↔ `正印/偏印` lexical provenance only.
- #678/#680: single resolved canonical Yin fact → `印綬` source-category member only.

Therefore #685 is a new unresolved semantic primitive rather than a duplicate.

## 7. Canonical representability

No new raw canonical chart input is required.

The bridge input is exactly:

```text
CanonicalYinshouCategoryMemberEvaluation
```

The bridge must not accept or inspect:

```text
FactState<TenGod>
DerivedFacts
FourPillarsFact
pillar positions
branch Ten-God facts
hidden stems
whole-chart arrays
counts
```

It must not recompute Ten-Gods.

## 8. Positive admission

Only an upstream evaluation satisfying all governed positive invariants may emit support-constituent evidence:

```text
state = yinshou_source_category_member_observed
inputStatus = resolved
membershipObserved = true
sourceCategory = 印綬
authority = research_only
```

with one of the exact canonical/source-label pairs:

```text
정인 / 正印
편인 / 偏印
```

The bounded positive result is:

```text
state = yinshou_support_constituent_observed
canonicalConstituent = 정인 | 편인
sourceMemberLabel = 正印 | 偏印
sourceSupportCategory = 印綬
supportConstituentObserved = true

dangZhongEstablished = false
zhuGuaEstablished = false
qiangRuoEstablished = false
authority = research_only
```

## 9. Fail-closed behavior

Every non-positive upstream state returns:

```text
state = no_yinshou_support_constituent_evidence
supportConstituentObserved = false
canonicalConstituent = null
sourceMemberLabel = null
sourceSupportCategory = null

dangZhongEstablished = false
zhuGuaEstablished = false
qiangRuoEstablished = false
```

This includes upstream states representing:

```text
resolved non-Yin Ten-God outside bounded scope
ambiguous canonical Ten-God
unavailable canonical Ten-God
```

Absence of this bounded constituent is not authority for `助寡`, `黨眾=false`, or absence of other support.

## 10. Authorized research-only semantic

The exact new authority is:

```text
positive governed single-fact 印綬 member
→ bounded 黨眾-associated 印綬 support-constituent evidence
```

This is evidence composition only.

It is not a chart verdict.

## 11. Explicit non-authority

The following remain unauthorized:

```text
one 印綬 constituent -> 黨眾
multiple 印綬 constituents -> 黨眾
absence of 印綬 constituent -> 助寡
absence of 印綬 constituent -> no other support
whole-chart 정인/편인 scan
印綬 count
比劫 + 印綬 aggregation
通根 support composition
constituent count threshold
黨眾 counter
黨眾 threshold
黨眾 boolean resolver
助寡 counter
助寡 boolean resolver
support constituent -> final 強
support constituent -> final 弱
ordinary 旺衰/強弱 classification
numeric strength
non-numeric strength scalar
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
Production fact emission
SKU activation
Commerce activation
```

## 12. Why no 黨眾 boolean is authorized

The source sentence names `印綬` in a support context associated with `黨眾`, but it does not provide a complete cardinality rule such as:

```text
one 印綬 is sufficient
N 印綬 are sufficient
比劫 + 印綬 >= N is sufficient
```

Nor does it provide a complete composition rule for how `比劫`, `印綬`, and `通根扶助` interact.

Therefore this artifact may preserve category-level constituent evidence only.

## 13. Why no chart scan is authorized

The upstream #678/#680 primitive intentionally consumes one supplied `FactState<TenGod>` and does not select a pillar or scan the chart.

If this bridge were to scan the chart itself, it would silently create new authority for:

```text
position selection
whole-chart Yin recognition
counting
aggregation
```

None of those primitives is established here.

Therefore the current bridge consumes only the upstream evaluation object.

## 14. Pinned upstream authorities

The implementation pins exact version/hash provenance for:

```text
GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_VERSION
GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DEFINITION_HASH

GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION
GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH
```

It also pins the direct source component text:

```text
比劫印綬通根扶助為黨眾
```

This prevents later upstream drift from being silently absorbed into the current authority.

## 15. Required regression coverage

Tests must prove:

1. governed positive `정인 / 正印 / 印綬` admission becomes support-constituent evidence only;
2. governed positive `편인 / 偏印 / 印綬` admission becomes support-constituent evidence only;
3. resolved non-Yin upstream output emits no constituent evidence;
4. ambiguous upstream output emits no constituent evidence;
5. unavailable upstream output emits no constituent evidence;
6. direct source text is pinned;
7. exact upstream version/hash values are pinned;
8. raw `FactState` and chart facts are not consumed by the new authority;
9. whole-chart scan/count is unauthorized;
10. `比劫 + 印綬` aggregation is unauthorized;
11. `通根` composition is unauthorized;
12. 黨眾/助寡 counter, threshold, and boolean resolver remain unauthorized;
13. final 旺衰/強弱 and strength scalars remain unauthorized;
14. Gyeokguk and Production remain unauthorized;
15. only one evaluator function is exported, preventing hidden scanner/counter APIs.

## 16. Production invariant

This work does not change the production boundary:

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed by this artifact.

## 17. Closure rule

The issue is complete only after:

```text
exact fresh-main branch
→ exactly one clean commit
→ exactly three added research-only files
→ exact-head CI / PCC / PIE all terminal green
→ fresh-main race check
→ ahead / behind check
→ mergeable check
→ reviews / comments / unresolved threads check
→ expected_head_sha squash merge
→ actual main SHA readback
→ issue closed/completed readback
→ exact merged-SHA push CI / PCC terminal green
```

Until that sequence completes, the authority must not be reported as fully closed.
