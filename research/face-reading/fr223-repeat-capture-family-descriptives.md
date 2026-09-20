# FR223 — Declared Repeat-Capture Family Descriptives

Status: implementation candidate  
Contract: `FR223-DECLARED-REPEAT-CAPTURE-FAMILY-DESCRIPTIVES-v1`

## Purpose

FR222 provides a durable candidate-to-human-annotation correspondence, but it does not answer whether the neutral metric is stable across repeated captures.

FR223 adds the missing **descriptive repeat-family assembly** for the FR218 metric:

`neutral.eye.outer_corner_tilt.mean_degrees@0.1.0`

This is deliberately weaker than a repeatability evaluation.

## Input authority

FR223 accepts only an active-runtime FR221 verified candidate-provenance object.

FR221 has already checked candidate integrity, selection/holdout separation, capture-family ownership consistency, and candidate evidence digests. FR223 rechecks the family-level ownership/partition assumptions relevant to its output.

## Declared family semantics

`captureFamilyKey` means only:

> protocol-local declared grouping intended to represent related captures.

It does **not** mean:

- independently verified participant identity;
- independently verified fresh capture events;
- biometric identity matching;
- validated capture quality.

FR223 also requires distinct `captureAdmissionRef` values within a repeated family. This blocks literal reuse of one admitted capture reference, but distinct refs still do not prove distinct real-world capture events.

## Repeat-family eligibility

A family is emitted as a repeat-family summary only when it contains at least two candidates.

Singleton families are counted separately and excluded from repeat summaries.

At least one repeated family is required to materialize FR223 evidence.

## Allowed descriptive statistics

For each repeated family FR223 reports only:

- count;
- min;
- max;
- mean;
- range.

The metric remains in degrees.

No acceptance threshold is applied.

## Selection / holdout

The original candidate partition remains attached to every family.

FR223 reports selection and holdout repeat-family counts separately. It does not use either partition to select a threshold or transition zone.

## Evidence identity

The output records the exact FR221 source evidence ref/digest and computes a deterministic FR223 evidence digest/ref over the repeated-family descriptive summaries.

This supports reproducibility of the software transformation. It does not prove external capture facts.

## Authority boundary

FR223 fixes all of the following as unresolved/false:

- `captureFamilyKey` means identity proof;
- distinct capture admission refs mean distinct fresh capture events;
- same-participant identity independently verified;
- freshness independently verified;
- capture quality validated;
- descriptive variation means empirical repeatability established;
- empirical repeatability established;
- repeat-capture stability established;
- empirical sufficiency established;
- numeric repeatability acceptance threshold;
- transition zone issued;
- threshold issued;
- classifier issued;
- traditional binding issued;
- production activated;
- commerce activated.

## CI meaning

CI uses synthetic/mechanics-only FR218 candidates and persisted FR221 evidence to verify:

- grouping mechanics;
- descriptive statistics;
- singleton exclusion;
- duplicate capture-admission rejection;
- active FR221 verification requirement;
- authority-boundary preservation.

CI does not establish real-world repeatability.

## Next frontier

After FR223, FR222 human-label correspondence and FR223 repeat-family descriptives can be assembled into a preregistered empirical-study readiness artifact.

That later stage must still distinguish:

1. self-attested human review from independently verified reviewer status;
2. declared capture families from independently verified participant/capture identity;
3. descriptive within-family variation from an accepted repeatability criterion;
4. selection evidence from untouched holdout evaluation.

No transition zone, threshold, classifier, or traditional interpretation should be authorized merely because both evidence types are present.
