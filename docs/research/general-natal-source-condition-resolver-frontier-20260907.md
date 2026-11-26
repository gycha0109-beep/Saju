# General Natal — source-condition resolver authority frontier (2026-09-07)

## Decision

Saju PR #339 added a strict research lower-tier normalizer for four source-conditioned General Natal states. The next question is whether the current canonical calculation substrate is authorized to derive those source-condition facts from a real chart.

Current answer:

```text
RESEARCH_SOURCE_CONDITION_CLAIM_PRODUCER = EXISTS
CANONICAL_SOURCE_CONDITION_RESOLVER      = NOT_AUTHORIZED
SOURCE_CONDITION_FACTS_FROM_REAL_CHART   = UNAVAILABLE
GENERAL_NATAL_PRODUCTION_AUTHORITY       = BLOCKED
P0-CM-03                                 = OPEN
Production Payment                       = HOLD
```

This frontier deliberately does **not** implement a classical Gyeokguk establishment algorithm without repository authority.

---

## 1. Target facts from PR #339

The downstream research T3 producer requires four exact fact paths:

```text
derivedFacts.generalNatalSourceConditions.pianCaiGe
derivedFacts.generalNatalSourceConditions.yinShouGeApplicable
derivedFacts.generalNatalSourceConditions.shangGuanShangJin
derivedFacts.generalNatalSourceConditions.shiShenGeQualified
```

The required values are materially stronger than generic Ten-God presence:

```text
偏財格:
  patternEstablished = true
  applicableContext  = true

印綬 applicable context:
  patternEstablished = true
  applicableContext  = true

傷官傷盡:
  qualificationSatisfied = true

qualified 食神格:
  patternEstablished    = true
  dayMasterFlourishing  = true
  foodGodFlourishing    = true
  noClashBreak          = true
```

A canonical resolver may not emit these values until each predicate is governed by an explicit source/methodology contract.

---

## 2. What the current canonical substrate actually provides

The calculation engine currently enriches the canonical snapshot with:

```text
pillars
Ten-God relation identity
hidden-stem membership
five-element counts
structural relation candidates
branch-clash contexts / qualifier observations
solar-term context
```

These are useful inputs. They do not themselves authorize the four target source conditions.

### 2.1 Ten-God relation identity

`derivedFacts.tenGods` is deterministic relation identity. PR #335 already establishes that:

```text
generic 偏財/正財 presence != 偏財格 established/applicable

generic 偏印/正印 presence != applicable 印綬格 context

generic 傷官/食神 presence != 傷官傷盡

generic 食神 presence      != 食神格 + 日主食神俱生旺 + 無衝破
```

Therefore Ten-God presence cannot be used as a resolver shortcut.

### 2.2 Hidden-stem membership

`src/calculation/hidden-stems.ts` explicitly limits the canonical dataset to branch-to-hidden-stem membership and states that array order is storage order only. The order must not be interpreted as:

```text
main / secondary / residual qi
strength order
month-command duration
```

Therefore hidden-stem membership alone cannot establish a month-order Gyeokguk predicate.

### 2.3 Structural relations

`src/calculation/structural-relations.ts` models only:

```text
stem_five_combination
branch_six_combination
branch_clash
branch_three_combination
```

Every emitted candidate carries:

```text
structuralMatchOnly        = true
transformationEstablished  = false
```

There is no `branch_break` relation kind. Consequently the current substrate cannot silently turn:

```text
no observed branch clash
```

into the stronger source condition:

```text
無衝破
```

Nor does mere clash detection establish its contextual effect on 食神格.

### 2.4 Day-master flourishing

The current strength-readiness research graph still explicitly reports:

```text
ordinaryStrengthClassificationAuthorized = false
numericScoringAuthorized                  = false
strongWeakVerdict                         = not_emitted
```

Therefore `日主生旺` cannot be manufactured from existing provisional strength evidence.

No equivalent governed `食神生旺` classifier was identified in the current canonical execution path.

---

## 3. Per-condition missing authority

### 偏財格

```text
GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING
SOURCE_APPLICABLE_CONTEXT_PREDICATE_AUTHORITY_MISSING
```

### 印綬 applicable source context

```text
GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING
SOURCE_APPLICABLE_CONTEXT_PREDICATE_AUTHORITY_MISSING
```

### 傷官傷盡

```text
SHANG_GUAN_SHANG_JIN_QUALIFICATION_AUTHORITY_MISSING
```

The classical locator establishes that `傷官傷盡` is the qualifier for the bounded proposition. It does not, by itself, supply a complete executable predicate for when a chart satisfies `傷盡`.

### 食神格 + 日主食神俱生旺 + 無衝破

```text
GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING
DAY_MASTER_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING
FOOD_GOD_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING
NO_CLASH_BREAK_QUALIFICATION_AUTHORITY_MISSING
BRANCH_BREAK_RELATION_NOT_MODELED
```

---

## 4. Executable frontier behavior

`src/research/general-natal-source-condition-resolver-frontier.ts` records the current boundary as executable research evidence.

For every canonical snapshot, including one with a known birth time and resolved day master / Ten Gods / month hidden stems / structural relations:

```text
canonicalResolverAuthorized = false
sourceConditionFactsEmitted = false
```

and all four target facts remain `FactState.status = unavailable` with condition-specific reason codes.

This is not a negative classification.

```text
unavailable
!= false
!= condition disproven
```

Downstream code must not convert missing predicate authority into a negative source-condition fact.

---

## 5. What would close this frontier

A future resolver PR must supply proposition-specific authority rather than a heuristic patch.

Minimum requirements:

```text
1. Exact governed methodology for Gyeokguk candidate derivation.
2. Exact governed establishment predicate for 偏財格 / 印綬格 / 食神格 as required.
3. Explicit applicable-context semantics where the source proposition depends on 此格/context.
4. Explicit executable definition of 傷官傷盡.
5. Authorized 日主生旺 classifier for the required source sense.
6. Authorized 食神生旺 classifier for the required source sense.
7. Governed 衝/破 vocabulary and a source-condition effect predicate sufficient for 無衝破.
8. Positive, negative, ambiguity, and adversarial fixtures pinned to the exact methodology/source content.
9. Scenario-preserving behavior for unresolved/disputed states.
10. Exact-content domain review before any production admission.
```

If source traditions disagree, the resolver must preserve alternatives/scenarios. It must not collapse disagreement into an undocumented repository default.

---

## 6. Production / Product / Commerce boundary

This frontier creates no product authority.

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
General Natal saleable             = NO
P0-CM-03                           = OPEN
Production Payment                 = HOLD
Decision                           = NO_BUILD
```

Forbidden shortcuts remain:

```text
raw Ten-God presence -> source condition
hidden-stem storage order -> month-command establishment
structural clash presence/absence -> qualified effect verdict
provisional strength evidence -> 日主生旺
LLM or Product Layer -> fill missing resolver predicates
research unavailable -> false condition
```

No SKU, price, PSP, payment, entitlement, refund, or Commerce behavior is authorized by this research frontier.
