# Saju Engine Capability Inventory v1

Status: observational implementation audit  
Issue: #1476  
Track: `saju`  
Authority effect: **none**

## 1. Purpose

This document records what the current Saju repository can prove today. It is not a new authority registry and must not be used to promote Research, Preview, Production, persistence, or public-GA authority.

The audit keeps these statements separate:

```text
Reading Profile exists
!= Interpretation / Claim authority exists

Claim producer exists
!= producer is admitted beyond Research

Reading Profile selection is authorized
!= claim generation or domain semantics are authorized

Official consumer authority exists
!= Production interpretation authority exists
```

The code explicitly enforces the second distinction in
`src/reading/reading-profile-authorization.ts`: profile authorization is scoped to
`reading_evidence_selection_only` and may not authorize interpretation rules, claim generation,
domain semantics, Research promotion, or interpretation authorization overrides.

The current Official consumer boundary is independently owned by
`src/preview/preview-authority.ts` and
`src/preview/preview-official-reading-consumer-authority.ts`. It remains Preview-only and grants
neither Production interpretation authority, persistence authority, nor public-GA authority.

## 2. Observation vocabulary

Implementation evidence:

- **PROVEN** — direct implementation plus a focused or shared regression path was found.
- **PARTIAL** — implementation evidence exists, but the complete consumer/runtime path is not proven by a dedicated test.
- **RESEARCH_RUNTIME** — executable producer/runtime exists only inside a Research lifecycle.
- **CORPUS_ONLY** — research corpus/evidence exists but executable producer authority is explicitly absent.
- **ABSENT_EVIDENCE** — this audit found no dedicated producer implementation; this does not authorize filling the gap by inference.
- **UNKNOWN** — repository evidence reviewed here is insufficient to make a stronger statement.

Primary routing:

- **READY** — current bounded Preview/consumer scope is already complete enough for its present contract.
- **RESEARCH_GAP** — upstream traditional/research basis is insufficient for an executable governed capability.
- **AUTHORITY_GAP** — executable or candidate runtime evidence exists, but admission/lifecycle authority is the first blocker.
- **ENGINE_GAP** — governed authority and required inputs are available, but engine runtime/composition is missing.
- **PRODUCT_GAP** — engine/Official artifact is ready and only consumer packaging/Reader/entitlement remains.
- **BOUNDED_OUT** — intentionally outside the current bounded scope.

## 3. Global repository observations

### 3.1 Reading Profile surface

`src/reading/reading-intent-composition.ts` resolves profiles for all 21 inventory rows below.

`src/reading/reading-profile-authorization.ts` contains matching content-addressed selection authorizations for all 21 profiles.

That authorization has a deliberately narrow scope:

```text
scope = reading_evidence_selection_only
mayAuthorizeInterpretationRules = false
mayAuthorizeClaimGeneration = false
mayAuthorizeDomainSemantics = false
mayPromoteResearchAuthority = false
mayOverrideInterpretationAuthorization = false
```

Therefore profile presence is never counted as proof of semantic or claim authority.

### 3.2 Current Official consumer surface

`src/preview/preview-authority.ts` permits exactly these five Preview Official Reading sections:

```text
general:natal
career:natal
wealth:natal
relationship:natal:general
business:natal
```

All other inventory rows resolve to `legacy_narrative` in
`src/preview/preview-official-reading-consumer-authority.ts`.

The Preview approval simultaneously fixes these constraints to false:

```text
productionInterpretationAuthorityGranted
persistenceAuthorityGranted
publicGeneralAvailabilityAuthorityGranted
```

### 3.3 Temporal candidate pattern

General/Career/Wealth/Business/Relationship annual and monthly producer modules exist under
`src/research/*-annual-reading-candidate.ts` and
`src/research/*-monthly-reading-candidate.ts`.

Their candidate versions and methodologies remain Research lifecycle artifacts. Dedicated Product Host E2E coverage exists for Career, Wealth, Business, and Relationship annual/monthly. General Monthly has a Product Host E2E; General Annual has candidate/runtime tests plus temporal-fact Product Host coverage, but this audit did not find a dedicated General Annual consumer E2E file.

This means the first visible blocker for temporal expansion is not “no code at all”; it is the lack of admitted non-Research semantic authority and subsequent bounded consumer promotion.

## 4. Capability matrix

| Capability | Profile selection | Claim producer/runtime evidence | Interpretation lifecycle evidence | Consumer authority | E2E/runtime proof | Primary blocker | Owner |
|---|---|---|---|---|---|---|---|
| `general:natal` | PROVEN | PROVEN | bounded Preview Official path; Production authority still false | Official | PROVEN | READY | Saju current bounded scope |
| `general:annual` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PARTIAL | AUTHORITY_GAP | Saju Bridge |
| `general:monthly` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PROVEN | AUTHORITY_GAP | Saju Bridge |
| `career:natal` | PROVEN | RESEARCH_RUNTIME | consumer admitted only in bounded Preview; Production authority still false | Official | PARTIAL/shared Official path | READY | Saju current bounded scope |
| `career:annual` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PROVEN | AUTHORITY_GAP | Saju Bridge |
| `career:monthly` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PROVEN | AUTHORITY_GAP | Saju Bridge |
| `wealth:natal` | PROVEN | RESEARCH_RUNTIME | consumer admitted only in bounded Preview; Production authority still false | Official | PARTIAL/shared Official path | READY | Saju current bounded scope |
| `wealth:annual` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PROVEN | AUTHORITY_GAP | Saju Bridge |
| `wealth:monthly` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PROVEN | AUTHORITY_GAP | Saju Bridge |
| `business:natal` | PROVEN | RESEARCH_RUNTIME | consumer admitted only in bounded Preview; Production authority still false | Official | PARTIAL/shared Official path | READY | Saju current bounded scope |
| `business:annual` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PROVEN | AUTHORITY_GAP | Saju Bridge |
| `business:monthly` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PROVEN | AUTHORITY_GAP | Saju Bridge |
| `relationship:natal:general` | PROVEN | RESEARCH_RUNTIME | consumer admitted only in bounded Preview; Production authority still false | Official | PARTIAL/shared Official path | READY | Saju current bounded scope |
| `relationship:annual:general` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PROVEN | AUTHORITY_GAP | Saju Bridge |
| `relationship:monthly:general` | PROVEN | RESEARCH_RUNTIME | Research candidate | Legacy | PROVEN | AUTHORITY_GAP | Saju Bridge |
| `relationship:natal:spouse` | PROVEN | isolated RESEARCH_RUNTIME exists | explicit `isolated_research_only`; Production HOLD | Legacy | PROVEN isolated runtime only | AUTHORITY_GAP | Saju Bridge |
| `family:natal:parents` | PROVEN | CORPUS_ONLY | executable family classifier explicitly not authorized | Legacy | ABSENT | RESEARCH_GAP | Traditional Saju Research |
| `family:natal:children` | PROVEN | CORPUS_ONLY | executable family classifier explicitly not authorized | Legacy | ABSENT | RESEARCH_GAP | Traditional Saju Research |
| `compatibility:natal` | PROVEN | ABSENT_EVIDENCE | no dedicated governed T10 producer found in this audit | Legacy | ABSENT | RESEARCH_GAP | Traditional Saju Research |
| `life_stage:life_stage` | PROVEN | ABSENT_EVIDENCE | no dedicated governed life-stage producer found in this audit | Legacy | ABSENT | RESEARCH_GAP | Traditional Saju Research |
| `question_specific:natal` | PROVEN | ABSENT_EVIDENCE | no dedicated governed T11 producer found in this audit | Legacy | ABSENT | RESEARCH_GAP | Traditional Saju Research |

## 5. Evidence by capability family

### 5.1 General Natal reference capability

Primary implementation evidence:

- `src/research/general-natal-useful-reading-candidate.ts`
- `src/reading/reading-intent-composition.ts`
- `src/reading/reading-profile-authorization.ts`
- `test/general-natal-product-vertical-slice.test.ts`
- `src/preview/preview-authority.ts`

This is the reference vertical slice because it is demonstrably connected from a resolved intent through profile selection and the Official consumer path. Its Official status is still bounded to Preview and does not imply Production interpretation authority.

### 5.2 Career / Wealth / Business / Relationship Natal Canary

Producer evidence:

- `src/research/career-natal-reading-candidate.ts`
- `src/research/wealth-natal-reading-candidate.ts`
- `src/research/business-natal-reading-candidate.ts`
- `src/research/relationship-natal-reading-candidate.ts`

Focused candidate tests:

- `test/career-natal-reading-candidate.test.ts`
- `test/wealth-natal-reading-candidate.test.ts`
- `test/business-natal-reading-candidate.test.ts`
- `test/relationship-natal-reading-candidate.test.ts`

Consumer authority evidence:

- `src/preview/preview-authority.ts`
- `src/preview/preview-official-reading-consumer-authority.ts`

The producer modules remain Research-lifecycle implementations, while the consumer boundary separately permits these four natal sections inside the bounded Preview Official surface. The inventory does not reinterpret that Preview consumer approval as Production semantic authority.

### 5.3 Annual / Monthly capabilities

General:

- `src/research/general-annual-reading-candidate.ts`
- `src/research/general-monthly-reading-candidate.ts`
- `test/general-annual-reading-candidate.test.ts`
- `test/general-monthly-reading-candidate.test.ts`
- `test/product-host-annual-temporal-facts.test.ts`
- `test/product-host-monthly-reading-e2e.test.ts`

Career:

- `src/research/career-annual-reading-candidate.ts`
- `src/research/career-monthly-reading-candidate.ts`
- `test/product-host-career-annual-reading-e2e.test.ts`
- `test/product-host-career-monthly-reading-e2e.test.ts`

Wealth:

- `src/research/wealth-annual-reading-candidate.ts`
- `src/research/wealth-monthly-reading-candidate.ts`
- `test/product-host-wealth-annual-reading-e2e.test.ts`
- `test/product-host-wealth-monthly-reading-e2e.test.ts`

Business:

- `src/research/business-annual-reading-candidate.ts`
- `src/research/business-monthly-reading-candidate.ts`
- `test/product-host-business-annual-reading-e2e.test.ts`
- `test/product-host-business-monthly-reading-e2e.test.ts`

Relationship General:

- `src/research/relationship-annual-reading-candidate.ts`
- `src/research/relationship-monthly-reading-candidate.ts`
- `test/product-host-relationship-annual-reading-e2e.test.ts`
- `test/product-host-relationship-monthly-reading-e2e.test.ts`

These are not classified as ENGINE_GAP because executable Research candidate paths already exist. The first unresolved boundary is admission/lifecycle authority.

### 5.4 Relationship / Spouse

Evidence:

- `src/research/general-natal-spouse-claim-corpus.ts`
- `src/research/relationship-spouse-t8-runtime-admission-readiness-review.ts`
- `src/research/relationship-spouse-t8-runtime-admission.ts`
- `test/relationship-spouse-t8-runtime-admission-readiness-review.test.ts`
- `test/relationship-spouse-t8-runtime-admission.test.ts`

The runtime admission module explicitly records:

```text
authorityAdmissionReady = true
spouseT8ProducerReady = true
runtimeScope = isolated_research_only
consumerNarrativeActivated = false
compatibilityConsumerActivated = false
previewDefaultRouteChanged = false
productionPromotionReady = false
productionState = HOLD
```

Therefore the current first blocker is AUTHORITY_GAP, not an Engine implementation gap.

### 5.5 Family / Parents / Children

Evidence:

- `src/research/general-natal-family-domain-claim-corpus.ts`
- `test/general-natal-family-domain-claim-corpus.test.ts`

The corpus explicitly records unresolved execution gaps including method selection, sex-scope selection, pillar-vs-star reconciliation, hidden-vs-visible handling, configuration settlement, and historical-to-modern translation.

It also explicitly sets:

```text
executableFamilyClassifierAuthorized = false
productionAuthorityPromoted = false
```

Therefore the first blocker remains RESEARCH_GAP.

### 5.6 Compatibility

The Reading Profile and profile-selection authorization exist, but this audit found no dedicated compatibility producer implementation under `src/` and no dedicated T10 compatibility claim producer through repository code search.

Existing spouse research explicitly keeps pairwise compatibility separate and unauthorized:

- `src/research/general-natal-spouse-claim-corpus.ts`
- `src/research/relationship-spouse-t8-dyadic-compatibility-boundary-evidence.ts`

The inventory therefore records ABSENT_EVIDENCE rather than inventing a producer from the existence of the profile.

### 5.7 Life Stage

The `life_stage:life_stage` Reading Profile and profile selection authorization exist. This audit found no dedicated `src/` life-stage producer implementation.

The capability remains RESEARCH_GAP until a separately supported semantic/authority basis is identified. The inventory does not treat the T9 selector in the profile as proof that a T9 producer exists.

### 5.8 Question Specific

The `question_specific:natal` Reading Profile and profile selection authorization exist. This audit found no dedicated `src/` question-specific/T11 producer implementation.

The capability remains RESEARCH_GAP. A generic question route must not synthesize new Saju meaning merely because the profile exists.

## 6. Engine-only backlog after G1

### P0 — governed authority exists, runtime implementation missing

**None proven by this audit.**

No capability reviewed here has sufficient evidence to say “the upstream semantic authority is already admitted and only the engine implementation is missing.”

### P1 — runtime exists, composition integration only missing

**None proven by this audit.**

The temporal and spouse paths that look closest to implementation completion are still blocked earlier by lifecycle/authority boundaries.

### P2 — runtime complete, only guard/E2E hardening missing

No standalone Engine-owned P2 is promoted from this audit. General Annual has less consumer-E2E evidence than the other temporal candidates, but its earlier Research/authority boundary means additional E2E work would not remove the first blocker.

## 7. Handoffs

### Saju Bridge — highest-value handoff family

The following capabilities have executable Research candidate/runtime evidence and should be evaluated by the Bridge before new Engine semantics are written:

```text
general:annual
general:monthly
career:annual
career:monthly
wealth:annual
wealth:monthly
business:annual
business:monthly
relationship:annual:general
relationship:monthly:general
relationship:natal:spouse
```

Bridge questions:

1. Which Research candidate semantics, if any, are admissible as governed engine authority?
2. What exact input/qualifier/prohibited-extension bounds survive admission?
3. Is admission limited to Research/Preview, or can a separate consumer promotion be considered?
4. For Spouse, what additional step is required after the existing isolated research runtime admission while Production remains HOLD?

### Traditional Saju Research

The following capabilities lack a sufficiently established executable semantic basis in the current audit:

```text
family:natal:parents
family:natal:children
compatibility:natal
life_stage:life_stage
question_specific:natal
```

Research must not be bypassed by generic claim generation.

### Product / Design

No new Product-only blocker is promoted by G1. The current five Official Canary sections already have their bounded Preview consumer route. Non-Canary rows are blocked earlier by Research or Authority.

## 8. Decision

G1 does **not** justify immediately adding a new Saju interpretation feature in the Engine track.

The current evidence says:

```text
Canary 5
  -> current bounded Preview scope READY

Annual / Monthly family
  -> executable Research runtime exists
  -> AUTHORITY_GAP first

Relationship / Spouse
  -> isolated Research runtime exists
  -> AUTHORITY_GAP first

Family
  -> research execution gaps remain
  -> RESEARCH_GAP first

Compatibility / Life Stage / Question Specific
  -> profile exists but producer evidence is absent
  -> RESEARCH_GAP first
```

The next Engine implementation should be selected only after the Research or Bridge tracks return a capability with an admitted authority contract and a concrete runtime gap.

## 9. Guardrail

This inventory is observational. It may be refreshed when repository evidence changes, but it must never itself become the source of:

- interpretation rule authority,
- claim generation authority,
- domain semantic authority,
- Research promotion,
- Preview expansion,
- Production interpretation authority,
- persistence authority,
- public-GA authority.
