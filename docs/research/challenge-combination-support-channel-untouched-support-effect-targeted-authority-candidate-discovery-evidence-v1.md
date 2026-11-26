# I91 — Untouched Support Effect Targeted Authority Candidate Discovery Evidence

## Status

```text
STRICT CLOSED
```

## Decision

```text
ONE_ADDITIONAL_VERIFIED_TARGETED_CANDIDATE_REGISTERED_RESEARCH_ONLY_LANES_REMAIN_UNRESOLVED
```

I91 executes the six I90 targeted discovery lanes and registers one additional exact-locator primary classical-text candidate under the I87 research-only registration contract. Candidate registration records verified relevance only; it does not evaluate I84 requirement coverage and does not combine the new candidate with the earlier I88 candidate.

## Registered candidate

```text
sourceId:
source_sanming_tonghui_vol6_yinshou_wikisource_2017_oldid845352

sourceType:
classical_text

title:
三命通會

locator:
卷六 / 論印綬

bounded anchors:
印綬不逢損傷
印綬有根，逢財則發，逢官則顯，逢合則晦，逢沖則災

historical source revision:
https://zh.wikisource.org/w/index.php?title=三命通會/卷六&oldid=845352

accessedAt:
2026-08-21

provenanceTier:
primary

copyrightStatus:
public_domain
```

The inspected passage distinguishes undamaged 印綬 from damage- or interaction-conditioned states and includes scoped position and exception language. It remains specific to 印綬 and cannot be generalized by registration into a universal no-touch support-source persistence or effective-support rule.

## Targeted lane relevance

Verified candidate relevance was recorded for four lanes:

```text
STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION
SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS
UNTOUCHED_PERSISTENCE_STATE_SEMANTICS
INDEPENDENT_PROVENANCE_BASIS
```

No additional exact-locator candidate was registered in this gate for:

```text
EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE
SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT
```

This is discovery relevance only. Every lane remains:

```text
requirementCoverageEvaluated = false
requirementSatisfied = false
```

## Registration boundary

```text
registrationStatus = RESEARCH_CANDIDATE_ONLY
methodologyOrRuleApproval = NOT_GRANTED
executableAuthorityStatus = NOT_AUTHORIZED
candidateRequirementEvaluationStatus = NOT_STARTED
centralExecutableRegistryMutationPerformed = false
sourceReferenceApprovedForMethodologyOrRuleUse = false
```

All six I84 requirement slots remain `NOT_EVALUATED`.

## Preserved non-equivalences

```text
印綬不逢損傷 != generic NO_TRACKED_RELATION_TOUCH settlement state
scoped no-damage language != universal PERSISTED
逢合則晦 / 逢沖則災 != generic relation precedence
position-specific 印綬 examples != universal source-position policy
primary provenance != I84 satisfaction
target-lane relevance != requirement satisfaction
candidate registration != executable authority
new candidate + previous candidate != authorized synthesized authority
```

## Verification

Code/test/export exact HEAD:

```text
23a605e51b598521f65966c953eb9b40e5a7c281
```

GitHub Actions:

```text
CI #794 SUCCESS
149 test files passed
838 tests passed
I91 8/8 passed
lint PASS
typecheck PASS
test PASS
build PASS
```

I90 closeout was independently verified at:

```text
cdaf5838fd2458c569d2cd8c9226a3c77a7f2b73
CI #791 SUCCESS
```

## Next gate

```text
I92 — Untouched Support Effect Targeted Candidate I84 Requirement Coverage Evidence
```

I92 must evaluate the new 三命通會 candidate independently against all six I84 requirements. It must not combine the new candidate with the I88/I89 滴天髓 candidate, promote scoped relevance to universal coverage, authorize candidate-set synthesis, or emit any activation, persistence, effective-support, relative-force, precedence, scoring, or production-classification outcome.
