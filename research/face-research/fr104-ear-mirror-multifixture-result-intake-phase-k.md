# FR104 Phase K — Multi-fixture mirror result intake

Issue: #1810

## Purpose

Phase J emits one scalar-only JSON document containing four controlled public-fixture attempts.

Phase K defines the fail-closed intake boundary before any real Phase J result is admitted.

## Exact fixture set

The intake requires the exact four fixture refs from the Phase J protocol and rejects:

- missing fixture refs;
- duplicate fixture refs;
- unknown fixture refs;
- changed fixture metadata.

A reported fixture SHA mismatch invalidates the controlled fixture and causes intake failure. It is not treated as ordinary empirical unavailability.

## Successful fixture admission

For a `paired_scalar_evidence` fixture, Phase K rechecks:

- file name;
- evidence role;
- expected and observed SHA-256;
- digest verification;
- decoded dimensions;
- no raw-fixture persistence;
- normalized eye-centroid X values;
- same-label reflection error by recomputation;
- cross-label reflection error by recomputation;
- closer pattern by recomputation;
- no numeric acceptance threshold.

Copied summary values are therefore not trusted.

## Unavailable fixture admission

A fixture may remain bounded unavailable when:

- the public fixture could not be fetched;
- decoded dimensions were invalid;
- the runtime failed closed;
- one original/mirror member did not yield exactly one valid provider face.

A digest mismatch is excluded from this class and invalidates intake.

For a digest-verified `unavailable_pair`, only bounded member status and face-count evidence is retained.

Unavailable fixtures are not provider-semantics counterexamples.

## Aggregate

Phase K recomputes:

- successful fixture count;
- unavailable fixture count;
- same-label-closer count;
- cross-label-closer count;
- equal count.

The harness aggregate is accepted only when it exactly matches the recomputation.

## Authority boundary

Even a unanimous pattern across all successful fixtures does not automatically become:

- universal provider mirror semantics;
- anatomical provider-side meaning;
- anatomical ear laterality;
- a numeric threshold;
- validated neutral external-ear observation;
- traditional binding;
- Production.

A later review must decide what semantic statement, if any, the multi-fixture evidence supports.

Watchtower-Track: face-observation-engine
