# I115 — Source 克 Visible-Stem Positional Applicability Evidence

## Status

STRICT CLOSED

## Exact verified implementation

- code/test/export HEAD: `fffa7ee53bdae64babc14fb74f4b4cfe435348eb`
- CI: `#894` — SUCCESS
- verification: 173 test files / 1030 tests
- I115 tests: 8/8
- lint/typecheck/test/build: PASS

## Decision

`CURRENT_CHART_VISIBLE_STEM_KE_POSITIONAL_APPLICABILITY_EVIDENCE_MATERIALIZED_EFFECT_UNRESOLVED`

## Materialized evidence boundary

I115 consumes exact I111 directional `克` binding evidence and the exact I114 visible-stem positional adapter contract.

Only bindings satisfying both conditions are admitted:

- source component scope = `VISIBLE_STEM`
- target component scope = `VISIBLE_STEM`

Hidden-stem and mixed visible/hidden directional bindings remain valid I111 directional evidence but are excluded from I115.

## Deterministic position mapping

For each eligible visible-visible directional `克` binding, I115 derives absolute pillar-slot distance over:

```text
year -> month -> day -> hour
```

and applies the exact I114 mapping:

```text
distance 1 -> 邻干 -> 力大 -> ADJACENT_PILLAR_STEMS
distance 2 -> 隔干 -> 次之 -> ONE_INTERVENING_PILLAR_STEM
distance 3 -> 远干 -> 无力 -> TWO_INTERVENING_PILLAR_STEMS
```

The evidence preserves:

- I111 directional binding identity;
- source and target component identities;
- source and target pillar slots;
- source and target stems/elements;
- source-to-target `克` direction;
- slot distance as topology only;
- source positional vocabulary;
- source qualitative force vocabulary.

## Semantic ceiling for every evidence item

```text
interactionEligibility = not_determined
damageOutcome = not_determined
damageMagnitude = not_determined
settlementOutcome = not_determined
relativeForceVerdict = not_determined
countsAsPositionalApplicabilityEvidence = true
countsAsInteractionEffectOrSettlement = false
```

## Empty-set semantics

Zero eligible visible-visible bindings is a valid I115 evidence-layer result.

It must not imply:

- no effective interaction;
- no damage;
- no hidden-stem interaction;
- no support effect.

## Hidden-stem authority gap

The following remains open:

`SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

I115 does not emit any hidden-stem participant and does not alter the I113 hidden-stem authority boundary.

## Non-equivalences preserved

```text
visible-visible directional 克 binding + position != effective interaction
slot distance != numeric force
力大 / 次之 / 无力 != numeric weight
远干无力 != no interaction
positional applicability evidence != damage outcome
positional applicability evidence != damage magnitude
positional applicability evidence != settlement outcome
positional applicability evidence != relative-force verdict
zero eligible visible-visible bindings != no interaction
zero eligible visible-visible bindings != no damage
```

## Downstream guards

```text
visibleStemEffectiveInteractionEligibilityResolved = false
effectiveInteractionSetResolved = false
i98KeDamageVocabularyEvaluationResolved = false
i98ResearchMethodologyMaterializationAuthorized = false
sourceActivationVerdictAuthorized = false
sourcePersistenceVerdictAuthorized = false
sourceEffectiveSupportVerdictAuthorized = false
relativeForceVerdictAuthorized = false
clashWinnerVerdictAuthorized = false
rescueEffectAuthorized = false
clashSettlementAuthorized = false
crossRelationPrecedenceAuthorized = false
structuralRelationKindMutationPerformed = false
targetPostRelationRootState = not_determined
effectiveMechanismForceVerdict = not_determined
relationSpecificUsefulnessHarmfulness = not_determined
classificationAuthorized = false
numericScoringAuthorized = false
```

## Verification note

The initial I115 exact-head run failed at TypeScript compile time because `Math.abs()` retained the broad `number` type after the runtime 1/2/3 guard. The remediation only narrowed the verified value to the already-guarded `1 | 2 | 3` union. No semantic guard, mapping, test expectation, or authority boundary was weakened.

## Next gate

`UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_POSITIONAL_APPLICABILITY_PROMOTION_READINESS_REVIEW`

I116 must decide whether I115 closes only the visible-stem positional-evidence substrate or authorizes any further research evaluation. It must not promote positional evidence into effective interaction, damage, magnitude, settlement, relative force, numeric scoring, or production interpretation.
