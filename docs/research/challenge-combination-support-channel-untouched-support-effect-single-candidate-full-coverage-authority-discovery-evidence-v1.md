# I95 — Untouched Support Effect Single-Candidate Full-Coverage Authority Discovery Evidence

## Status

STRICT CLOSED

## Decision

`ONE_PLAUSIBLE_FULL_COVERAGE_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED`

## Discovery result

I95 performed external discovery under the exact I94 single-candidate admission contract and registered one research-only candidate:

```text
陈园
《邵伟华四柱预测学入门》
广州出版社
1995
ISBN 7805922519 / 9787805922515
```

The normalized source identity uses the published book edition. Bibliographic identity was cross-verified against catalog records, while exact text was inspected through a web transcription. The transcription is discovery/evidence-access infrastructure only and is not registered as a second authority candidate.

## Reproducible locator

```text
chapter = 第十一章 富贵贫贱
section = 第三节 论吉凶
anchor  = 用神在天干不受克合；用神在地支不受克、合、刑、冲
```

The edition identity plus author/publisher/year/ISBN/chapter/section/anchor is treated as the I94 equivalent reproducible locator.

## Why admitted for evaluation

One coherent source contains material relevant to all six frozen I84 evaluation topics:

- post-interaction integrity of a useful/supporting factor under tracked stem/branch relations;
- distinction between support/useful-factor presence and later damage/protection/rescue effect;
- separate heavenly-stem and earthly-branch interaction conditions;
- weak-body support through both 印 and 比劫;
- explicit undamaged versus damaged/protected/rescued state language;
- independent published-book provenance.

This is **discovery admission relevance only**.

```text
all-six topics represented != six requirements satisfied
```

## Registration state

```text
registrationStatus = RESEARCH_CANDIDATE_ONLY
methodologyOrRuleApproval = NOT_GRANTED
executableAuthorityStatus = NOT_AUTHORIZED
candidateSatisfiesAllI84Requirements = not_evaluated
all six I84 slots = NOT_EVALUATED
```

The candidate is registered through the existing I87/I88 contract path. No parallel source registry is created.

## Preserved non-equivalences

```text
discovery topic representation != I84 satisfaction
published practitioner source != approved methodology
useful-factor not damaged != automatically authorized NO_TRACKED_RELATION_TOUCH runtime rule
book transcription != separate authority candidate
bibliographic cross-verification != coverage evaluation
```

## Hard guards

```text
candidateAcceptedForUntouchedSupportAuthority = false
priorI88CandidateCoverageBorrowed = false
priorI91CandidateCoverageBorrowed = false
crossCandidateCompositionPerformed = false
crossCandidateCompositionAuthorized = false
centralExecutableRegistryMutationPerformed = false
methodologyOrRulePromotionAuthorized = false
executableAuthorityAuthorized = false
untouchedSupportEffectRuleImplementationAuthorized = false
sourceActivationVerdictAuthorized = false
sourcePersistenceVerdictAuthorized = false
sourceEffectiveSupportVerdictAuthorized = false
relativeForceVerdictAuthorized = false
crossRelationPrecedenceAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

## Verification

Initial I95 exact-head CI #810 failed only because a negative-test fixture bound an unused `_locator` variable under ESLint. Production/research logic was unchanged.

Final code/test/export HEAD:

`232518dea9d8cdb64bdbd291ee004fa288494207`

CI #811:

```text
lint      PASS
typecheck PASS
test      PASS — 153 files / 870 tests
I95       PASS — 8/8
build     PASS
```

## Next gate

`I96 — Untouched Support Effect Single-Candidate I84 Full-Coverage Evaluation Evidence`

I96 must evaluate all six I84 requirements independently using only the registered I95 candidate. It must not borrow I88/I91 evidence, treat discovery relevance as satisfaction, weaken a requirement, or promote any runtime support-effect rule merely because the candidate passes coverage review.
