# FR188 — Xi / Chang Repeat-Capture and Dataset-Split Protocol

## Scope

FR188 consumes the exact FR187 frontier and defines only the governed research protocol needed before future Xi/Chang repeat-capture stability work.

It does not collect evidence and does not authorize mapping, directionality, threshold selection, calibration, study execution, compound `細而長` semantics, or Production.

## Upstream boundary

FR187 already defines the blinded expert operationalization protocol and leaves repeat-capture and dataset split unissued. FR188 therefore adds only those protocol prerequisites.

Candidate metrics remain unchanged and unbound:

- `neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0`
- `neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`

No traditional semantic binding is created by using these metric refs in a capture protocol.

## Repeat-capture protocol

FR188 freezes:

- `single_frontal` capture mode with the `frontal` view key;
- 2 independent sessions per participant;
- 2 accepted captures per session;
- explicit rejection reasons for rejected captures;
- rejected captures cannot become review items;
- protocol freeze before evidence collection;
- no post-hoc protocol mutation;
- no execution authority.

The repository-wide calibration contract requires at least two independent sessions and at least one accepted capture per session. FR188 uses two accepted captures per session as a research protocol choice; this is not a traditional-source claim.

## Dataset split

FR188 freezes participant-level `selection` / `holdout` separation:

- participant leakage: forbidden;
- capture-family leakage: forbidden;
- threshold selection may not read holdout;
- final evaluation may not read selection labels;
- assignment must be frozen before metric values or expert labels are observed;
- post-hoc reassignment is forbidden.

No dataset assignment is executed in FR188.

## Support authority remains unresolved

The existing repository capture-quality artifact is housed in the Nose-Bridge calibration registry and explicitly checks `nose_bridge_visibility`. FR188 therefore does not reuse it for Eye-Pair work.

The following remain unresolved:

- `xi_chang_capture_quality_policy_not_issued`
- `xi_chang_review_artifact_retention_policy_not_issued`

Until governed Xi/Chang support authority exists, the capture protocol is not ready for common calibration-registry registration or study execution.

## Evidence and blocker accounting

Protocol existence does not satisfy `repeat_capture_stability` evidence. FR188 satisfies none of the remaining FR185 mapping-evidence requirements and resolves none of the 13 FR183/FR184 blockers.

## Verdict

`GOVERNED_XI_CHANG_REPEAT_CAPTURE_AND_DATASET_SPLIT_PROTOCOL_DEFINED_SUPPORT_AUTHORITY_AND_EVIDENCE_COLLECTION_NOT_ADMITTED`

## Next frontier

`define_governed_xi_chang_capture_quality_and_review_artifact_retention_support_before_study_registration_or_evidence_collection`

`traditionalSemanticAuthority=false`; Production remains HOLD.
