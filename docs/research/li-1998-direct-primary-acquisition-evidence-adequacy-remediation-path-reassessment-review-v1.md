# I187 — Li 1998 Direct-Primary Acquisition Evidence Adequacy & Remediation-Path Reassessment Review

## Status

```text
STRICT SUCCESS / CLOSED
```

## Purpose

I187 reassesses the zero-qualifying-gain result from I186 without turning failed acquisition into negative evidence or corpus exhaustion.

The gate decides only whether immediate equivalent same-target repetition is methodologically justified and which readiness review may proceed next. It does not execute third-wave discovery, select a candidate, mutate the candidate set, perform rebinding, adjudicate provenance independence, relax I132, create a threshold, classify, score numerically, or authorize production interpretation.

## Repository artifacts

```text
source:
src/research/i187-li-1998-direct-primary-acquisition-evidence-adequacy-remediation-path-reassessment-review.ts

test:
test/i187-li-1998-direct-primary-acquisition-evidence-adequacy-remediation-path-reassessment-review.test.ts
```

## Accepted I186 boundary

```text
five frozen paths executed                = true
qualifying acquisition count              = 0
direct target registry record             = 0
direct 1998 publication binding           = 0
direct comparable full witness set        = false
stable file identity / hash               = 0
complete variant normalization            = 0
publication-medium/entity gap             = UNRESOLVED
canonical-witness normalization gap       = UNRESOLVED
negative finding count                    = 0
targeted discovery exhaustion             = false
corpus exhaustion                         = false
```

## Adequacy decision

I186 is adequate to record a bounded acquisition result. It is not adequate to establish absence, negative provenance, targeted exhaustion, corpus exhaustion, rebinding readiness, or independent normative provenance.

The Li 1998 same-target direct-primary path therefore remains:

```text
methodologically open = true
exhausted             = false
retired               = false
immediate equivalent repeat justified = false
state                 = SUSPENDED_UNTIL_MATERIALLY_NEW_DIRECT_LEAD
```

A materially new direct lead may return work to this path later.

## Third-wave routing

The next procedural step is authorized as a readiness review only:

```text
Third-Wave New Provenance Candidate Discovery Readiness Review
```

This routing is conclusion-neutral. I187 itself:

```text
third-wave discovery executed = false
candidate acquired             = false
candidate selected             = false
candidate-set mutation         = false
```

Any later third-wave discovery must reapply the existing I132 provenance controls:

```text
explicit derivative relationship check required = true
derivative retransmission counts as independent authority = false
source class alone sufficient = false
source count may become numeric weight = false
provenance tier may become numeric weight = false
unresolved lineage cannot establish independence
```

## Decision

```text
I186_EVIDENCE_ADEQUATE_ZERO_QUALIFYING_GAIN_TWO_GAPS_UNRESOLVED_SAME_TARGET_NOT_EXHAUSTED_EQUIVALENT_REPEAT_NOT_JUSTIFIED_THIRD_WAVE_NEW_PROVENANCE_DISCOVERY_READINESS_MAY_PROCEED_NO_REBINDING_NO_POLICY_RELAXATION
```

## Verification

Exact implementation/test HEAD:

```text
b87f9200c8785a44c38d0c185d64750d0e29352b
```

CI:

```text
run #1181 = SUCCESS
lint      = PASS
typecheck = PASS
test      = PASS
build     = PASS

Test Files = 245 passed
Tests      = 1606 passed
I187       = 8 / 8 passed
```

## Preserved Li lineage state

```text
2004 presumed origin retired              = true
1998 prior same-author witness confirmed  = true
1998 witness independently normative      = false
1998 → 2004 same-author derivative chain  = PRESERVED
external lineage unresolved questions     = 3
```

## Preserved authority ceiling

```text
evidenceRebindingMethodologicallyReady         = false
evidenceRebindingAuthorizedByThisGate          = false
provenanceIndependenceAdjudicatedByThisGate    = false
independentNormativeProvenanceEstablishedCount = 0
I132 policy relaxation                         = false
candidateSetReevaluationAuthorizedByThisGate   = false
candidateSetAdmissibilityEstablishedByThisGate = false
candidateSetMutatedByThisGate                  = false
actualCompositionPerformedByThisGate           = false
multiSourceCompositionAuthorized               = false
visibleStemBinaryEffectiveInteractionEligibilityResolved = false
thresholdRuleCreatedByThisGate                 = false
classificationAuthorized                       = false
numericScoringAuthorized                       = false
productionPolicyExecutionAuthorized            = false
```

The hidden-stem authority gap remains exactly:

```text
SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED
```

## Next gate

```text
I188 — Third-Wave New Provenance Candidate Discovery Readiness Review
```

I188 must freeze a conclusion-neutral search protocol for genuinely new provenance candidates before any third-wave evidence is collected. It may not treat aliases, republications, same-author retransmissions, source-class labels, or source counts as independent authority.
