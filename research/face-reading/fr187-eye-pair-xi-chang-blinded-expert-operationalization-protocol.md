# FR187 — Xi / Chang Governed Blinded Expert Operationalization Protocol

## Scope

FR187 defines the blinded-expert operationalization protocol that must exist before any Xi/Chang human-derived mapping evidence may be collected. It is a protocol-definition phase only.

FR187 does **not** collect participant data, review artifacts, labels, metric values, landmarks, embeddings, or provider output. It does not authorize metric-to-concept binding, directionality, thresholding, calibration, classifier logic, `細而長` composition, semantic output, or Production use.

## Upstream authority

FR180 already requires future reviewer blinding and participant-level split discipline. The repository calibration contract requires at least three independent reviewers, `met / not_met / abstain`, independent initial labels, abstention, and blinding from metric values, candidate thresholds, peer labels, and fortune output.

FR185 requires `independent_blinded_expert_operationalization` as evidence before mapping admission. FR186 then froze two exact non-directional pre-evidence hypotheses and explicitly left that evidence requirement unsatisfied.

FR186 next frontier is:

`define_governed_blinded_expert_operationalization_protocol_for_xi_chang_mapping_hypotheses_before_evidence_collection_directionality_or_calibration`

## Protocol authority

FR187 freezes one protocol ref:

`research.face_reading.xi_chang_blinded_expert_operationalization_protocol.fr187.v1`

and exactly two tasks, one for the FR186 `細` hypothesis and one for the FR186 `長` hypothesis.

Each task is tied internally to the exact FR186 hypothesis and candidate neutral metric, but reviewers must not see the candidate metric identity. Reviewer presentation is source-grounded and concept-only.

### Label set

Exactly:

- `met`
- `not_met`
- `abstain`

Abstention is mandatory. Ambiguous or insufficient review material must remain observable rather than being coerced into a positive or negative label.

### Reviewer plan

Each item requires exactly three independent initial labels under this protocol version. Reviewers must be blind to:

- metric values;
- candidate thresholds;
- peer labels;
- fortune output;
- candidate directionality;
- mapping outcome.

Initial labels remain auditable. Later adjudication is not allowed to overwrite them.

### Consensus

Consensus is a fail-closed `supermajority_non_abstain` rule:

- at least two non-abstain labels are required;
- at least two-thirds of non-abstain labels must agree;
- otherwise the state is `no_consensus`.

`no_consensus` is not converted into `met` or `not_met` by narrative judgment.

## Xi reviewer instruction

Using only the cited direct-source concept wording and a future quality-approved review artifact, independently label whether the review item supports the traditional concept `細` as `met`, `not_met`, or `abstain`.

Do not infer or use a metric formula, metric direction, threshold, percentile, fortune output, peer judgment, or mapping outcome.

## Chang reviewer instruction

Using only the cited direct-source concept wording and a future quality-approved review artifact, independently label whether the review item supports the traditional concept `長` as `met`, `not_met`, or `abstain`.

Do not convert traditional `寸` into a normalized ratio. Do not infer or use a metric formula, metric direction, threshold, percentile, fortune output, peer judgment, or mapping outcome.

## Explicitly prohibited reviewer inference

FR187 forbids reviewers from deriving any of the following from source wording or review material:

- implementation metric formulas;
- metric directionality;
- machine thresholds;
- `寸` to normalized-ratio conversion;
- `極` operationalization;
- Boolean semantics for compound `細而長`.

## Evidence accounting

Protocol definition does **not** satisfy `independent_blinded_expert_operationalization`. FR187 issues zero operationalization evidence and resolves zero of the existing 13 FR183/FR184 blockers.

The FR186 mapping-evidence requirement list therefore remains unchanged.

## Execution gate

FR187 does not authorize evidence collection or review-artifact ingestion. Before any human-derived evidence collection, the repository still needs governed repeat-capture and participant/capture-family split protocol authority compatible with the existing calibration framework.

## Verdict

`GOVERNED_XI_CHANG_BLINDED_EXPERT_OPERATIONALIZATION_PROTOCOL_DEFINED_EVIDENCE_COLLECTION_MAPPING_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED`

## Next frontier

`define_governed_xi_chang_repeat_capture_and_dataset_split_protocol_before_any_evidence_collection_directionality_or_calibration`

Production remains HOLD and `traditionalSemanticAuthority=false`.
