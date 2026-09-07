# General Natal T8 — source-conditioned semantic topology (2026-09-07)

## Decision

This record closes the next semantic-topology question raised after the primary-witness acquisition pass.

Baseline inspected:

```text
Saju/main = cfdd43ef9ed2516435bb1d08e1bfea42f154a3e3
```

Decision:

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
CURRENT_WHOLE_CHART_TEN_GOD_PRESENCE_TO_T8_PROMOTION = NOT_ADMISSIBLE_AS_IS
SOURCE_CONDITIONED_LOWER_TIER_TOPOLOGY_REQUIRED = true
GEJU_PRODUCER_AUTHORITY_READY = false
P0-CM-03 = OPEN
Production Payment = HOLD
```

This document promotes no methodology, rule, claim type, pack, reviewer, Reading Profile, runtime, Product Host registry, or Commerce behavior.

---

## 1. Repository state being evaluated

The current General Natal minimum-useful candidate explicitly projects resolved whole-chart Ten-God presence into consumer theme families:

```text
derivedFacts.tenGods
→ T5 TEN_GOD_*_THEME
→ T8 GENERAL_NATAL_*_THEME
```

The candidate itself states that it:

- uses `derivedFacts.tenGods` as the required fact input for the Ten-God theme methodology;
- checks year/month/hour visible stems and year/month/day/hour branch Ten-God slots for family presence;
- embeds consumer-facing `headline`, `summary`, and `consumerSection` fields in semantic claim values;
- remains `status: research` with `reviewerStatus: unreviewed`.

The conclusion-synthesis candidate similarly materializes whole-chart Ten-God family presence directly from `derivedFacts.tenGods`, then emits General-category conclusions including `work`, `money`, and `relationship` conclusion kinds. It is also research-only and unreviewed.

These candidates remain useful research fixtures. They are not a safe production-promotion topology merely by changing lifecycle metadata.

---

## 2. Exact classical-condition evidence

The Kanripo 四庫全書 text surface for `三命通會` volume 5 (`KR3g0042/WYG/005`) contains temperament-like statements, but the relevant statements are attached to specific pattern/qualification conditions rather than arbitrary whole-chart Ten-God presence.

### 2.1 偏財 — `[005-49a]`

The section states, in context:

```text
偏財格主人慷慨不甚吝財與人有情而多詐...
```

The semantic subject is `偏財格`, not the proposition "a Wealth-family Ten-God occurs somewhere in the chart".

### 2.2 印綬 — `[005-56b]`

The section first gives month-context examples such as `甲乙在亥子月`, then states:

```text
此格主聰明多智慧性慈恵語善良...
```

The text therefore binds the proposition to `此格` in the preceding 印綬 structural context. It does not justify projecting generic Resource-family presence anywhere in the chart into the same temperament proposition.

The same passage mixes temperament language with body, health, office, and fortune statements. Those adjacent claims are not imported into General Natal by textual proximity.

### 2.3 傷官 — `[005-81b]` / `[005-82a]`

The text reports:

```text
相心賦云傷官傷盡多藝多能使心機而傲物氣髙...
```

The qualifier is `傷官傷盡`. The surrounding section also repeatedly distinguishes 傷盡 from non-傷盡 states and warns that the structure changes with 官, 印, 財, strength, and other conditions.

Therefore a generic Output-family presence claim is not losslessly equivalent to this source condition.

### 2.4 食神 — `[005-84b]`

The text states:

```text
此格要日主食神俱生旺無衝破...
```

This is an explicit compound condition:

```text
pattern context
+ day master flourishing
+ Food God flourishing
+ no clash/break condition
```

It cannot be represented by the current rule predicate "a 食神/傷官-family value appears in one tracked Ten-God slot" without losing source conditions.

---

## 3. Architecture consequence

The source-compatible candidate topology is therefore:

```text
exact source condition
→ governed lower-tier structural/pattern/qualification claim
→ bounded semantic proposition
→ General Natal T8 synthesis
```

Not:

```text
raw whole-chart Ten-God family presence
→ consumer personality/work/money/relationship meaning
```

A lower-tier producer does not need to be named T3 merely because T3 is available in the taxonomy. The implementation must use the lowest governed claim layer that can losslessly encode the actual source conditions and ambiguity behavior.

No new lower-tier authority is created by this record.

---

## 4. Existing `gyeokguk` substrate

The current research methodology catalog contains:

```text
M-GEJU-MONTH-ORDER@0.1.0-research
family = gyeokguk
status = research
```

Its declared allowed claim namespace is:

```text
GEJU_CANDIDATE
GEJU_ESTABLISHMENT_STATE
GEJU_TRANSFORMATION_STATE
GEJU_FUNCTIONAL_USE
```

Its assumptions already distinguish a pattern candidate from an established pattern and require whole-chart inspection beyond month-order alone. This is directionally compatible with source-conditioned General Natal semantics.

However, the current inspected execution/export surfaces do not establish a governed producer for those `GEJU_*` claims:

- the methodology catalog defines the namespace and semantic question;
- `test/interpretation-methodology-catalog.test.ts` verifies namespace separation and candidate-vs-established semantics;
- `src/research/i18e-special-pattern-review-router.ts` emits routing signals only and explicitly sets `finalSpecialPatternClassificationAuthorized: false`;
- `src/research/index.ts` exports the methodology catalog and research review/evidence modules but does not export any General Natal candidate module;
- `src/production-runtime.ts` exposes governed production composition/calculation entrypoints, not a built-in General Natal or `GEJU_*` production registry.

GitHub code search is not treated as authoritative for absence in this repository because known catalog symbols have returned empty search results. The operational conclusion is therefore narrower and fail-closed:

```text
A governed GEJU_* producer sufficient for these classical conditions
has not been identified in the current production/execution path.

Until such a producer is explicitly located, reviewed, tested, and bound
into an authorized registry, it is MISSING FOR AUTHORITY PURPOSES.
```

---

## 5. Required lower-tier representation

Before bounded temperament semantics can be proposed for production, the upstream graph must represent source conditions explicitly enough to distinguish at least:

```text
偏財格 established
!= generic 偏財/正財 presence

印綬格 established / applicable source context
!= generic 偏印/正印 presence

傷官傷盡
!= generic 傷官/食神 presence

食神格 with 日主食神俱生旺 and 無衝破
!= generic 食神 presence
```

If the existing `M-GEJU-MONTH-ORDER` architecture can encode these conditions losslessly, it may be used as a research upstream after its actual producer and claim contracts are implemented and reviewed.

If it cannot, the gap must be modeled explicitly rather than approximated with family presence.

---

## 6. Semantic proposition boundary

Even after a source condition is established, only the bounded proposition actually supported and admitted through review may flow upward.

The following are explicitly not inherited automatically from surrounding classical prose:

```text
health / illness
body or appearance
lifespan
wealth magnitude
rank / office
spouse or child outcome
future event or timing
fortune polarity
historical social-role assumptions
```

Likewise, consumer wording is not semantic authority. Production claim values should carry governed semantic facts; presentation copy belongs in the narrative/presentation layer unless an explicit contract requires otherwise.

---

## 7. Atomic General Natal boundary

The paid General Natal product remains atomic:

```text
General Natal
!= implicit Career + Wealth + Relationship bundle
```

Therefore the current conclusion-synthesis candidate's `work`, `money`, and `relationship` conclusion kinds cannot be promoted into the General atomic product merely because they are emitted under taxonomy category `general`.

Those semantics require either independently authorized domain readings or an explicit composite methodology/product authority.

---

## 8. Production wiring status

The production composition framework itself is correctly fail-closed:

```text
registry required
pack.status must equal production
authorization preflight must pass
reviewer trust context participates in preflight
```

The Reading execution path additionally forbids filling missing evidence with the LLM and forbids promotion of research authority.

This is the desired architecture. The blocker is semantic inventory, not missing fail-closed infrastructure.

There is currently no built-in General Natal production registry or authorized General Natal production pack supplied by `src/production-runtime.ts`. `createAuthorizedMyeonghwaProductionHost` accepts a resolved registry only after production preflight succeeds.

---

## 9. Exact unblock sequence

Do not promote the current useful-reading or conclusion-synthesis candidates as-is.

The next implementation sequence is:

```text
1. Locate or implement an explicit governed producer for the required source conditions.
2. Define exact lower-tier ClaimTypeDefinition + value schema.
3. Add positive, negative, ambiguity, and boundary fixtures for candidate vs established/applicable states.
4. Define bounded temperament semantic claim types separate from consumer prose.
5. Bind exact source locators and provenance to the rules.
6. Obtain genuine domain review and content-addressed ReviewAttestation.
7. Establish reviewer trust for the exact approved content.
8. Promote only the reviewed methodology/rules required by the atomic General Natal path.
9. Build a production pack with registered-required claim contracts.
10. Pass production execution preflight on the exact registry snapshot.
11. Verify ProductHost/API/browser E2E for the General Natal profile.
12. Only then reconsider P0-CM-03 and Commerce SKU work.
```

---

## 10. Final verdict

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
General Natal saleable             = NO
P0-CM-03                           = OPEN
Production Payment                 = HOLD
Decision                           = NO_BUILD
```

The next blocker is no longer "find any Ten-God meaning." It is narrower:

```text
source condition
→ governed structural/qualification claim
→ bounded reviewed semantic proposition
→ authorized T8 synthesis
```

That graph must exist before paid General Natal can be treated as production-authorized.
