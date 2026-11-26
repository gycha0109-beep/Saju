# I33 Challenge Target Clash Dependency Evidence Adapter v1

## Purpose

I33 implements only the clash dependency substrate authorized by I32 for challenge-target intrinsic root candidates already routed by I31.

It does **not** resolve clash victory, root destruction/preservation, rescue effectiveness, target post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.

## Identity chain

I33 accepts only evidence bound to the same resolved pillar material:

```text
resolved pillars
  -> I29 challenge-target intrinsic root evidence
  -> I31 challenge-target relation participation evidence
  -> I33 challenge-target clash dependency evidence
```

The adapter independently recomputes the expected I29 and I31 identities before materialization.

Fail-closed states include:

```text
PILLARS_UNRESOLVED
ROOT_EVIDENCE_UNRESOLVED
ROOT_EVIDENCE_MISALIGNED
RELATION_EVIDENCE_UNRESOLVED
RELATION_EVIDENCE_MISALIGNED
```

## Materialized dependency evidence

For each I31 root candidate with a routed `branch_clash`, I33 records both clash participants separately.

Each participant preserves:

```text
position
branch
branch element
seasonal phase (旺/相/休/囚/死)
visible same-element stem positions
visible resource stem positions
same-element branch positions
additional same-element branch support positions
resource branch positions
```

Support locations remain named evidence only:

```text
supportEffect       = not_resolved
relativeForceVerdict = not_determined
numericWeight        = not_assigned
```

## Seasonal advantage

The source-backed seasonal phase ordering is used only to emit one of:

```text
TARGET_ROOT_CANDIDATE
CLASH_COUNTERPART
TIED_SEASONAL_PHASE
```

This is a seasonal-advantage **candidate**, not a complete relative-force verdict and not a clash winner.

## Rescue topology

I33 also routes structural six-/three-combination relations that share a participant with the clash:

```text
SIX_COMBINATION_RESCUE_CANDIDATE
THREE_COMBINATION_RESCUE_CANDIDATE
```

Each rescue candidate remains:

```text
rescueStrength = not_evaluated
rescueEffect   = not_resolved
clashSettlement = not_determined
```

No combination presence is treated as proof that the clash is neutralized or redirected.

## Subject boundaries

I33 does not reuse I20/I20B/I20C/I20D report identities or day-master/root report contracts.

```text
lowerLevelI20ReportContractReused  = false
lowerLevelI20bReportContractReused = false
lowerLevelI20cReportContractReused = false
lowerLevelI20dReportContractReused = false
```

Hidden-only targets cannot acquire a manufactured root-effect subject.

Earth target dependency evidence may still be observed structurally, but root-effect resolution remains blocked:

```text
earthTargetRootEffectResolutionAuthorized = false
```

## Hard guards

```text
relativeBranchForceVerdict              = not_determined
supportEffectVerdict                     = not_resolved
clashWinnerVerdict                       = not_determined
rescueEffectVerdict                      = not_resolved
clashSettlementVerdict                   = not_determined
targetPostRelationRootState              = not_determined
effectiveMechanismForceVerdict           = not_determined
relationSpecificUsefulnessHarmfulness     = not_determined
classificationAuthorized                 = false
numericScoringAuthorized                 = false
```

## Implementation

- `src/research/i33-challenge-target-clash-dependency-evidence.ts`
- `src/research/index.ts`
- `test/i33-challenge-target-clash-dependency-evidence.test.ts`

## Verification

```text
I33 code HEAD: 4caf3304e5240101d9e9c94b5d99a86ee144a970
CI run:        #492
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        71 files / 383 tests PASS
build:         PASS
```

The dedicated I33 regression suite contains 5 passing tests covering:

- seasonal phase and positional support projection for aligned challenge-root clashes,
- six-combination rescue topology,
- three-combination rescue topology,
- no-clash mechanism behavior,
- cross-material I29/I31 rejection,
- earth and downstream verdict guards,
- deterministic report identity.

## Conclusion

```text
CLASH_DEPENDENCY_SUBSTRATE     = IMPLEMENTED
CLASH_EFFECT                   = NOT RESOLVED
CLASH_WINNER                   = NOT DETERMINED
ROOT_EFFECT                    = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE      = NOT DETERMINED
NUMERIC_SCORING                = NOT AUTHORIZED
STRENGTH_CLASSIFICATION        = NOT AUTHORIZED
```
