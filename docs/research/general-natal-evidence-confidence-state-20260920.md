# R096 — non-numeric evidence confidence/state model

Date: 2026-09-22  
Issue: #1049  
Status: QUALITATIVE EVIDENCE-STATE CONTRACT DEFINED / NO NUMERIC AGGREGATION

## Purpose

Represent verified, variant, divergent, partial, inconclusive, contradicted, unverified, and execution-pending research states without collapsing heterogeneous provenance into a scalar confidence score.

R096 is a research evidence-state contract. It is not a ranking model.

## Primary evidence states

- `VERIFIED_BOUNDED`
- `VERIFIED_VARIANT`
- `DIVERGENT_BY_SOURCE_OR_SCHOOL`
- `PARTIALLY_SUPPORTED`
- `INCONCLUSIVE`
- `UNVERIFIED`
- `CONTRADICTED_WITHIN_SCOPE`
- `EXECUTION_PENDING`

These labels have no ordinal order.

There is no implied progression such as:

`UNVERIFIED < INCONCLUSIVE < PARTIALLY_SUPPORTED < VERIFIED_BOUNDED`

and no state is converted into a percentage.

## State semantics

### VERIFIED_BOUNDED

Verified only for the recorded proposition, provenance, methodology/calculation convention, and scope.

It never means universal truth outside that scope.

### VERIFIED_VARIANT

A bounded variant is evidenced as a distinct supported form.

It does not mean the variant is semantically interchangeable with another variant.

### DIVERGENT_BY_SOURCE_OR_SCHOOL

Multiple scoped positions remain materially divergent.

This is unresolved plurality, not "low confidence."

### PARTIALLY_SUPPORTED

Evidence supports only a bounded portion of the proposition or scope.

Unsupported remainder must stay explicit.

### INCONCLUSIVE

Available evidence cannot resolve the bounded question.

It is neither false nor rejected.

### UNVERIFIED

Required verification has not been established.

Absence of verification is not contradiction.

### CONTRADICTED_WITHIN_SCOPE

Contradictory evidence is established inside the recorded scope.

It does not invalidate unrelated scopes automatically.

### EXECUTION_PENDING

The research proposition may have source/review evidence, but required execution or implementation verification is still pending.

It is not a semantic confidence score.

## Orthogonal dimensions

These dimensions remain inspectable independently:

1. `PROVENANCE_QUALITY`
2. `PASSAGE_BINDING_COMPLETENESS`
3. `PROPOSITION_SCOPE_MATCH`
4. `SOURCE_INDEPENDENCE_OR_DERIVATION`
5. `CROSS_SOURCE_AGREEMENT_OR_DIVERGENCE`
6. `IMPLEMENTATION_EXECUTION_VERIFICATION`
7. `EXPERT_REVIEW_STATUS`
8. `TEMPORAL_CALCULATION_CONVENTION_STABILITY`

A dimension snapshot records qualitative observations and evidence refs.

Dimensions are not:
- summed;
- averaged;
- weighted;
- converted to stars;
- converted to percentages;
- used as an implicit lexicographic ranking.

## State assignment record

Every state assignment must record:

- `stateAssignmentId`
- `subjectClaimRef`
- `state`
- `scopeRef`
- `evidenceEventRefs`
- `provenanceRefs`
- `dimensionSnapshotRef`
- `recordedAt`
- `previousStateAssignmentRef` when transitioning
- `transitionReasonRef` when transitioning

R093 provenance graph references may be used, but graph connectivity alone does not determine a state.

R094 counterexample references may be used, but counterexample count alone does not determine a state.

R095 lineage tags may be used to scope divergence, but lineage popularity or seniority does not determine a state.

## Transition model

Transitions are explicit evidence events, not arithmetic threshold crossings.

Rules:

- every transition points to the previous assignment;
- every transition cites the evidence event(s) that justify reassessment;
- history is append-only;
- no state is silently overwritten;
- no transition is automatically monotonic;
- a later state may be more resolved, less resolved, or divergent if new evidence warrants it;
- `VERIFIED_BOUNDED` may return to `INCONCLUSIVE` or `DIVERGENT_BY_SOURCE_OR_SCHOOL` if scoped contradictory evidence is admitted;
- `INCONCLUSIVE` does not automatically become `UNVERIFIED` or `CONTRADICTED_WITHIN_SCOPE`.

## No automatic derivation from dimensions

The primary state is a governed qualitative assertion with evidence.

No hidden rule such as "7 of 8 dimensions positive = VERIFIED_BOUNDED" is authorized.

Likewise:
- source count does not yield state;
- reviewer count does not yield state;
- school agreement count does not yield state;
- counterexample count does not yield state.

## Future calibration boundary

A future numeric calibration model, if ever proposed, requires a separately governed calibration study defining:

- target outcome;
- labeled population;
- measurement validity;
- calibration method;
- error/uncertainty analysis;
- scope;
- versioning;
- admission and retirement rules.

R096 authorizes none of those numeric models.

## Rejected shortcuts

- `NUMERIC_CONFIDENCE_PERCENTAGE`
- `STAR_RATING`
- `SOURCE_COUNT_SCORE`
- `REVIEWER_COUNT_SCORE`
- `HIDDEN_WEIGHTED_SUM`
- `HIDDEN_LEXICOGRAPHIC_RANKING`
- `PRIMARY_STATES_HAVE_IMPLICIT_ORDINAL_ORDER`
- `DIMENSION_SNAPSHOT_AUTO_DERIVES_PRIMARY_STATE`
- `DIVERGENT_EQUALS_LOW_CONFIDENCE`
- `INCONCLUSIVE_EQUALS_FALSE`
- `UNVERIFIED_EQUALS_CONTRADICTED`
- `VERIFIED_BOUNDED_EQUALS_UNIVERSAL`
- `STATE_CHANGE_WITHOUT_EVIDENCE_EVENT`
- `STATE_HISTORY_OVERWRITTEN`

## Authority boundary

Evidence-state labels do not by themselves:
- activate rules;
- resolve school conflicts;
- promote research evidence;
- authorize Production behavior.

No Production authority promotion follows from R096.
