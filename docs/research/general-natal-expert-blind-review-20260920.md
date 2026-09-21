# R090 — human-expert blind-review protocol

Date: 2026-09-22  
Issue: #1039  
Status: BLIND-REVIEW PROTOCOL READY / REVIEWER EXECUTION PENDING

## Purpose

Evaluate bounded research claims without priming reviewers with the engine's preferred answer, rule identity, or source conclusion.

This protocol gathers independent review evidence. It does **not** create calculation authority, interpretation authority, predictive validation, or Production authority.

## Pre-registration packet

Every review case must be locked before reviewer exposure.

Required packet fields:
- packet ID and protocol version;
- bounded question;
- immutable case-fact reference;
- exact fact provenance kind;
- applicable calculation-policy / engine reference when facts came from governed calculation;
- hidden research-claim reference;
- reviewer-facing disclosure manifest;
- randomization batch/order manifest reference;
- deterministic packet hash.

Allowed fact provenance kinds:
- `GOVERNED_CALCULATION`;
- `SOURCE_PROVIDED_RECORD`;
- `RESEARCH_FIXTURE`.

Normalization may make facts comparable, but it must not upgrade provenance.

In particular:
- a source-provided chart is not independent calculation evidence;
- a research fixture is not a historical ground-truth case;
- a calculation-policy disagreement is not an interpretation disagreement.

## Stage A — blind structural judgment

Reviewer-facing packet reveals only:
- normalized case facts whose provenance is explicitly retained;
- the bounded question.

Hide:
- person identity;
- historical outcome narrative;
- engine answer;
- rule ID;
- source excerpt;
- source conclusion;
- hidden research claim.

Stage A response states:

`SUPPORTED | REJECTED | INDETERMINATE | OUT_OF_SCOPE`

The reviewer records free-text rationale and may cite a rule/source if they can do so without being prompted by the hidden target claim.

Stage A is immutable once submitted. It cannot be edited after Stage B material is revealed.

## Stage B — source-grounding review

Stage B opens only after Stage A is locked.

Reveal:
- exact source excerpt;
- edition / source identity;
- provenance;
- bounded research claim derived from that source.

Stage B answers a different question from Stage A:

> Is the bounded research claim a faithful reading of the disclosed source passage, regardless of whether the reviewer's own school adopts that rule?

Stage B source-fidelity states:

`FAITHFUL_BOUNDED_READING | OVERSTATED | UNDERSTATED | SOURCE_AMBIGUOUS | OUT_OF_SCOPE`

Do not reuse Stage A `SUPPORTED/REJECTED` as source-fidelity labels.

## Reviewer metadata

Record:
- lineage / school;
- practice-duration band;
- source-language readability;
- calculation convention.

These are descriptive strata only.

They are **not**:
- voting weights;
- seniority scores;
- authority multipliers;
- tie-breakers.

## Randomization

- lock all packet hashes before the review batch starts;
- randomize case order using a recorded batch/order manifest;
- do not manually reorder cases after review starts to improve agreement;
- preserve the original order manifest for audit.

## Disagreement classification

Reviewer disagreement must be classified without collapsing distinct causes:

- `CALCULATION_INPUT_OR_POLICY`
- `INTERPRETATION`
- `SOURCE_READING`
- `OUT_OF_SCOPE`

A calculation disagreement must not be counted as interpretation rejection until the calculation input/policy difference is resolved or explicitly held constant.

## Adjudication

- preserve reviewer disagreement;
- preserve abstention / `INDETERMINATE`;
- preserve school divergence;
- no majority vote automatically becomes truth;
- no seniority label overrides source provenance;
- agreement-rate metrics are descriptive only and do not promote a claim;
- Stage B source fidelity does not prove predictive validity;
- worked-example agreement does not become real-world outcome validation.

## Execution boundary

`reviewerExecutionPending = true` until reviewers are recruited and concrete packets are pre-registered.

Protocol existence alone does not authorize:
- Production promotion;
- rule activation;
- source-provided chart replay as independent calculation;
- predictive validation;
- forced TRUE/FALSE resolution of unresolved claims.
