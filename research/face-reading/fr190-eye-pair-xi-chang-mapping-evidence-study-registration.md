# FR190 — Xi / Chang Mapping-Evidence Study Registration

## Scope

FR190 consumes the exact FR189 frontier and registers only a research-only, fail-closed Xi/Chang mapping-evidence study contract before any participant capture, review artifact, expert label, or candidate metric evidence is collected.

It does not execute the study. It does not mutate the common calibration registry. It does not issue stable criterion identities, mapping directionality, thresholds, reference populations, calibration authority, compound `細而長` semantics, or Production authority.

## Why the common calibration study schema is not used directly

The common `FaceCalibrationStudyProtocolDefinition` requires a stable `criterionId`.

The Xi/Chang authority chain deliberately still has:

- `xi_stable_criterion_identity_not_issued`
- `chang_stable_criterion_identity_not_issued`

among the fixed blockers.

Creating synthetic Xi/Chang criterion IDs solely to fit the common calibration registry would resolve those blockers without authority. FR190 therefore registers an isolated mapping-evidence research study keyed by the already-governed FR186 mapping hypotheses and FR187 operationalization tasks, while explicitly keeping common calibration-registry mutation unauthorized.

This is a research registration boundary, not calibration admission.

## Registered study arms

FR190 registers exactly two arms:

1. Xi / `細`
   - frozen FR186 Xi hypothesis;
   - exact FR184 Xi candidate metric carried through the hypothesis;
   - FR187 Xi blinded operationalization task.

2. Chang / `長`
   - frozen FR186 Chang hypothesis;
   - exact FR184 Chang candidate metric carried through the hypothesis;
   - FR187 Chang blinded operationalization task.

Both arms bind the same governed support chain:

- FR187 blinded reviewer protocol;
- FR188 repeat-capture protocol;
- FR188 participant-level selection/holdout split policy;
- FR189 Eye-Pair capture-quality policy;
- FR189 review-artifact retention policy;
- exact pinned direct-source page/provenance already frozen in the hypotheses.

The arm registration state is:

`registered_blocked_pre_collection`

and is frozen before evidence collection. Post-hoc mutation is not authorized.

## Pre-collection blocking reasons

FR190 freezes these exact blockers:

- `finite_calendar_review_artifact_retention_window_not_issued`
- `source_grounded_construct_correspondence_analysis_protocol_not_defined`
- `alternative_metric_and_confound_rejection_plan_not_defined`
- `evidence_collection_authorization_not_issued`

### Retention duration

FR189 intentionally kept `maxRetentionDays=null` because the repository has no governed Xi/Chang-specific or generic finite calendar duration authority that can safely be imported here.

FR190 does not invent a number.

A future evidence-collection admission remains blocked until a governed finite retention window exists.

### Construct correspondence and alternative/confound analysis

FR185 requires both:

- `source_grounded_construct_correspondence`
- `alternative_metric_and_confound_rejection`

before mapping admission.

FR190 registers that these outputs are required, but it does not pretend that a study registration defines or satisfies their analysis protocols. Those protocols must be preregistered before collection so that correspondence tests, alternative metrics, nuisance factors, exclusion rules, and rejection semantics cannot be chosen after observing evidence.

## Evidence and blocker accounting

Study registration is not empirical evidence.

FR190 satisfies none of the remaining FR185 mapping-evidence requirements. The following remain unsatisfied:

- independent blinded expert operationalization;
- repeat-capture stability;
- source-grounded construct correspondence;
- alternative-metric/confound rejection;
- end-to-end evidence traceability;
- explicit mapping acceptance/rejection decision;
- fail-closed completeness.

FR190 resolves none of the fixed 13 FR183/FR184 blockers.

In particular:

- stable Xi/Chang criterion identity remains unissued;
- mapping directionality remains unissued;
- thresholds/percentiles/reference populations remain unissued;
- calibration protocol/evidence/rules remain unissued;
- compound Xi-and-Chang composition remains unauthorized.

## Privacy and execution boundary

FR190 accepts or produces no:

- participant data;
- face images;
- review artifacts;
- expert labels;
- raw provider responses;
- raw landmark sets;
- candidate metric observations;
- embeddings;
- identity templates;
- biometric matching outputs.

The study registration cannot self-promote to collection authority.

## Verdict

`GOVERNED_XI_CHANG_MAPPING_EVIDENCE_STUDY_REGISTERED_COLLECTION_AND_EMPIRICAL_EVIDENCE_NOT_ADMITTED`

## Next frontier

`define_governed_xi_chang_construct_correspondence_and_alternative_metric_confound_preregistration_before_evidence_collection`

The unresolved finite retention window remains an independent fail-closed blocker. No calendar duration is guessed.

`traditionalSemanticAuthority=false`; Production remains HOLD.
