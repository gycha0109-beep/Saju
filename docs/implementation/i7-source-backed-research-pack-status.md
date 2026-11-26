# I7 — Source-Backed Research Rule Pack Status

- Date: 2026-08-19
- Branch: `agent/architecture-foundation`
- Status: **STRICT CLOSED (RESEARCH ONLY)**

## Purpose

I7 introduces the first non-synthetic interpretation rules into the deterministic runtime.

This is **not production Saju authority** and does not produce life predictions.

The purpose is narrower:

1. prove that source metadata can travel through the Rule Registry,
2. prove that real domain-oriented rules can execute without bypassing provenance,
3. prove that ambiguous calculation scenarios remain isolated,
4. prove that a partial structural signal cannot silently become an overall conclusion,
5. keep research content technically impossible to promote to production merely by changing one pack flag.

---

## Research Sources

I7 registers two classical-text references as `cross_reference` provenance.

### `SRC-I7-DITIANSUI-WIKISOURCE`

```text
Title: 滴天髓
Attribution: 傳劉基
Locator: 體用論 / 精神論 / 衰旺論 / 月令論
Reference: Chinese Wikisource transcription
```

Research use:

- month-order context is treated as material,
- strength/body-use analysis is not reduced to one factor,
- the runtime scope guard is grounded in that anti-reduction principle.

The Wikisource transcription is **not treated as a verified critical edition**. The source remains `cross_reference`, not `primary`.

### `SRC-I7-WUXING-DAYI-WIKISOURCE`

```text
Title: 五行大義
Author: 蕭吉
Locator: 卷二 — 第四論相生 / 三者論四時休王
Reference: Chinese Wikisource transcription
```

Research use:

- five-element generating sequence,
- seasonal flourishing/context framework.

This source is also retained as `cross_reference` until an edition/scan verification workflow is completed.

### Reuse policy

Runtime source records use:

```text
reusePolicy = metadata_only
```

No classical-text passages are embedded into generated user narrative by this stage.

---

## Explicitly Excluded Candidate

`淵海子平` was reviewed as a possible corroborating source but was **not added to the I7 source registry**.

Reason:

- the current Chinese Wikisource page marks the document incomplete,
- the page also marks its source as unknown / insufficiently verified.

It may be reconsidered only after a traceable edition or scan is identified.

---

## Methodology

Implemented:

```text
METHOD-I7-SEASONAL-SUPPORT-SIGNAL@0.1.0-research
```

Family:

```text
day_master_strength
```

Scope:

```text
month branch elemental context
+
day stem element
-> narrow seasonal support signal
```

It explicitly does **not** calculate:

```text
overall strong / weak day master
useful god (用神)
格局
career
wealth
relationship
health
future events
```

The methodology remains:

```text
status = research
reviewerStatus = unreviewed
methodologyStability = contested
```

---

## Rules

### Same-element signal

```text
RULE-I7-SEASONAL-SAME-ELEMENT@0.1.0-research
```

When:

```text
month branch element == day stem element
```

it emits only:

```text
CLAIM-DAY-MASTER-SEASONAL-SUPPORT-SIGNAL
kind = same_element
overallStrength = not_determined
```

### Generating-element signal

```text
RULE-I7-SEASONAL-GENERATING-ELEMENT@0.1.0-research
```

Research mapping:

```text
Water -> Wood
Wood  -> Fire
Fire  -> Earth
Earth -> Metal
Metal -> Water
```

When the month-branch element generates the day-stem element, it emits:

```text
CLAIM-DAY-MASTER-SEASONAL-SUPPORT-SIGNAL
kind = generating_element
overallStrength = not_determined
```

### Mandatory scope guard

```text
RULE-I7-SEASONAL-SCOPE-GUARD@0.1.0-research
```

Whenever the required day/month facts are resolved in the active scenario, it emits:

```text
CLAIM-DAY-MASTER-STRENGTH-SCOPE-GUARD
status = undetermined
reason = month_order_signal_is_partial_evidence
```

This claim is intentionally `major` materiality relative to the minor support signal.

The intent is to make it difficult for later narrative composition to convert a narrow research signal into an unsupported strong/weak conclusion.

---

## Nested Rule Operand Projection

I7 required the evaluator to inspect fields inside already-resolved canonical inputs without introducing shortcut derived facts.

`RuleOperand` now supports:

```ts
{ kind: 'input', key: string, path?: string }
```

Examples:

```text
day.stem.element
month.branch.element
```

Projection uses own-property traversal only.

Forbidden segments:

```text
__proto__
prototype
constructor
```

Missing or forbidden paths are treated as absent rather than traversed.

This preserves the original fact reference in emitted claims:

```text
pillars.day
pillars.month
```

rather than pretending the projected field is a separately calculated fact.

---

## Ambiguity / Scenario Behavior

Both day and month inputs use:

```text
ambiguityBehavior = scenario_preserving
```

The Lichun + `jasi` unknown-time fixture is used to verify the behavior.

Each observed CalculationScenario receives its own evaluation context and scope guard.

No cross-scenario claim aggregation is performed.

---

## Production Fail-Closed Gate

Research rules remain:

```text
status = research
```

A test changes only the InterpretationPack status to `production` and confirms execution fails with:

```text
RULE_NOT_EXECUTABLE_FOR_PACK
```

Therefore this corpus cannot become production-authorized through a single pack-status edit.

Actual promotion requires explicit rule review/status changes and therefore a content-addressed Registry Snapshot change.

---

## Tests

Primary I7 tests:

```text
test/rule-operand-projection.test.ts
test/i7-research-pack.test.ts
```

Coverage includes:

- nested resolved-input projection,
- missing nested field behavior,
- prototype-path rejection,
- fact-reference preservation,
- research-only source / rule / methodology statuses,
- conservative source reuse metadata,
- production promotion fail-closed,
- 20-day known-date matrix,
- observation of both same-element and generating-element cases,
- mandatory scope guard,
- no unsupported overall-strength conclusion,
- Lichun + jasi unknown-time scenario preservation,
- allowlisted research claim types only,
- explicit exclusion of user-life prediction claim categories.

---

## Hosted Verification

```text
CI run number: 166
run id:        32209491607
npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        PASS
build:         PASS

Test files:    13 passed
Tests:         86 passed
Job:           SUCCESS
```

---

## Explicit Non-Claims

I7 does **not** establish that Saju predicts real-world outcomes.

I7 does **not** establish one authoritative Saju school.

I7 does **not** establish overall day-master strength.

I7 does **not** authorize user-facing statements about:

- wealth,
- career,
- marriage / relationships,
- health,
- death,
- success,
- future fortune.

I7 establishes only that a narrow, source-linked, research-status domain signal can pass through the governed interpretation runtime without losing provenance or ambiguity.

---

## Closure

```text
NESTED_INPUT_PROJECTION = VERIFIED
PROJECTION_PATH_SAFETY = VERIFIED
SOURCE_REGISTRY = VERIFIED
RESEARCH_STATUS_GATING = VERIFIED
KNOWN_DATE_SIGNAL_MATRIX = VERIFIED
SCENARIO_PRESERVATION = VERIFIED
MANDATORY_SCOPE_GUARD = VERIFIED
PRODUCTION_PROMOTION_FAIL_CLOSED = VERIFIED
LIFE_PREDICTION_SCOPE = EXCLUDED

I7 = STRICT CLOSED (RESEARCH ONLY)
```
