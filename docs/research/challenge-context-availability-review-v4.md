# I26 Challenge Context Availability Review v4

## Purpose

I26 v4 integrates I31 challenge-target relation participation evidence into the existing mechanism-effective-force availability graph.

It is an availability refinement only. It does **not** resolve target post-relation root state, effective mechanism force, relation-specific usefulness/harmfulness, day-master strength, or numeric scoring.

## Input chain

```text
I25 methodology dependency review
  -> I27 structural force evidence
  -> I29 intrinsic root candidate evidence
  -> I31 tracked relation participation evidence
  -> I26 v4 availability projection
```

I26 v4 requires the alignment chain:

```text
I29 aligned to current I27
AND
I31.status == RESOLVED_ROUTING_EVIDENCE
AND
I31.upstreamI29ReportId == current I29.reportId
```

If I31 is absent or misaligned, its evidence is not consumed.

## Availability behavior

The force context remains:

```text
MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE
```

I31 does not authorize an upgrade to effect-ready or resolved.

Instead, I26 v4 replaces the generic v3 post-relation gap with mechanism-specific unresolved capabilities.

### Tracked relation review required

Possible unresolved capabilities include:

```text
target post-relation root-state verdict
target-stem combination transformation/effect resolution
root-candidate clash effect resolution
root-candidate combination transformation/effect resolution
```

### No tracked relation candidate

```text
target post-relation root-state verdict; no tracked relation does not establish preservation
```

### No visible target stem anchor

```text
non-visible target post-relation treatment policy
```

### Visible target stem with no intrinsic root candidate

```text
visible target without intrinsic root candidate post-relation treatment
```

### Earth target

```text
earth target post-relation root-state resolution
```

## Preserved downstream blockers

Regardless of routing state, the graph continues to preserve:

```text
effective mechanism force verdict
relation-specific usefulness/harmfulness
```

and any unresolved intrinsic root-quality capability inherited from I26 v3.

## Fail-closed alignment

A relation-evidence report bound to different I29 material is ignored.

The v4 report records:

```text
relationEvidenceAlignedWithRootEvidence = false
```

and requests a resolved aligned I31 report instead of mixing evidence from different pillar material.

Non-force dependencies inherited from v3 remain unchanged.

## Implementation

- `src/research/i26-challenge-context-availability-v4.ts`
- `src/research/index.ts`
- `test/i26-challenge-context-availability-v4.test.ts`

## Verification

```text
HEAD:          2a1a9c59a264dbdce41acaecb1d0b81ea1ca5965
CI run number: 484
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        69 files / 373 tests PASS
build:         PASS
```

The v4 regression suite contains 5 passing tests covering:

- aligned I31 integration while preserving `PARTIAL_SUBSTRATE`,
- tracked target-stem combination and root-clash gaps,
- no-tracked-relation without preservation inference,
- cross-root-material relation-evidence rejection,
- preservation of non-force v3 dependencies,
- effect/classification/scoring guards and deterministic identity.

## Result

```text
RELATION_PARTICIPATION_EVIDENCE            = AVAILABLE WHERE TRACKED
POST_RELATION_ROOT_STATE                   = NOT DETERMINED
MECHANISM_EFFECTIVE_FORCE_CONTEXT           = PARTIAL_SUBSTRATE
EFFECTIVE_MECHANISM_FORCE                  = NOT DETERMINED
RELATION_SPECIFIC_USEFULNESS_HARMFULNESS   = NOT DETERMINED
METHODOLOGY_READY_FOR_EFFECT_RESOLUTION    = false
STRENGTH_CLASSIFICATION                    = NOT AUTHORIZED
NUMERIC_SCORING                            = NOT AUTHORIZED
```

## Next gate

```text
I32 — Challenge Target Clash Dependency Methodology Review
```

I32 must audit whether the existing I20/I20B/I20C/I20D day-master/root clash substrate can be adapted to a challenge-target root candidate. It must not mechanically reuse those reports or resolve clash/root effects.

The review must distinguish at minimum:

- source-backed seasonal phase comparison,
- positional same-element/resource support context,
- combination/meeting rescue candidate routing,
- the difference between candidate substrate and a relative-force/clash-winner verdict,
- upstream target identity/alignment requirements,
- hidden-only and earth boundaries.
