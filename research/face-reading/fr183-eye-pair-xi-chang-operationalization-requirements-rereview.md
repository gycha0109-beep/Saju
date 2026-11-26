# FR183 — Eye-Pair Xi/Chang Operationalization Requirements Re-review

## Decision

FR183 re-reviews the FR180 Eye-Pair Xi/Chang operationalization requirements after both direct-source exact-page locator prerequisites were closed by FR181 and FR182.

The result is deliberately narrow:

- FR175 monitoring-officer eye passage exact fixed-witness PDF page is now pinned at `88`.
- FR176 `卷三 / 達摩相眼` exact fixed-witness PDF page is now pinned at `146`.
- The two historical locator blockers from FR180 are therefore resolved.
- The active Eye-Pair calibration/evidence registries still contain no Xi/Chang criterion-specific evidence, capture protocol, labeling protocol, or study.
- No governed metric-to-source concept mapping or metric directionality has been issued for `細` or `長`.
- No stable criterion identity, threshold, calibration protocol, calibrated decision rule, or compound `細而長` composition authority has been issued.

Verdict:

`SOURCE_PAGE_PREREQUISITES_SATISFIED_OPERATIONALIZATION_REQUIREMENTS_REVIEWED_TRADITIONAL_BINDING_NOT_ADMITTED`

Production remains `HOLD`.

## Upstream authority

FR180 defined the operationalization requirements and left 15 unresolved authority requirements. Its first two were provenance locator gaps:

1. `fr175_exact_eye_passage_scan_page_not_pinned`
2. `fr176_exact_daruma_eye_scan_page_not_pinned`

FR181 closed the first gap as locator-only authority:

- exact page: `88`
- frozen ref: `packages/face-reading/evidence/fr103/nlc-1925-page-88.png`
- SHA-256: `5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce`
- verdict: `FR175_EYE_PASSAGE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY`

FR182 closed the second gap as locator-only authority:

- exact page: `146`
- frozen ref: `packages/face-reading/evidence/fr182/nlc-1925-page-146.png`
- SHA-256: `522e5cc94a1fbd885a298cedd8aea94e7a95dd4877d93afa10129e707e8059c7`
- verdict: `FR176_DARUMA_EYE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY`

Both remain tied to the fixed NLC 1925 `神相全編` PDF identity used upstream.

## What changed since FR180

Exactly two requirements changed state: the exact-page locator prerequisites are now satisfied.

FR183 does not edit the historical FR180 artifact. It issues a new authority record that consumes FR180 + FR181 + FR182 and records the new prerequisite state.

The following 13 blockers remain unchanged:

- `xi_metric_to_source_concept_mapping_not_authorized`
- `xi_metric_directionality_not_governed`
- `xi_stable_criterion_identity_not_issued`
- `xi_criterion_specific_calibration_evidence_absent`
- `xi_criterion_specific_calibration_protocol_absent`
- `xi_calibrated_decision_rule_absent`
- `chang_metric_to_source_concept_mapping_not_authorized`
- `chang_metric_directionality_not_governed`
- `chang_stable_criterion_identity_not_issued`
- `chang_criterion_specific_calibration_evidence_absent`
- `chang_criterion_specific_calibration_protocol_absent`
- `chang_calibrated_decision_rule_absent`
- `compound_xi_er_chang_composition_rule_not_authorized`

## Active calibration re-audit

FR183 deliberately re-enters the FR180 issuance path, which re-audits the active calibration/evidence registries for the two neutral Eye-Pair candidate metric refs.

Current governed result remains:

- Eye-Pair covered evidence count: `0`
- Eye-Pair capture protocol count: `0`
- Eye-Pair labeling protocol count: `0`
- Eye-Pair study count: `0`

Required future evidence classes remain:

- `repeat_capture_stability`
- `blinded_expert_operationalization`
- `threshold_selection_result`

This zero-coverage result is a fail-closed prerequisite check, not permission to invent a mapping or threshold.

## Semantic boundary

Pinned source pages prove where the selected source wording occurs. They do not prove how neutral geometry must operationalize that wording.

FR183 therefore does **not** authorize any of the following:

- `細 = neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0`
- `長 = neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`
- directionality for either metric
- a threshold, percentile, or reference population
- a stable Xi or Chang criterion identity
- calibration evidence or a calibration protocol
- a calibrated decision rule
- classifier, score, or rank output
- `極` operationalization
- `寸` mapping from normalized geometry
- `細而長` as a Boolean AND of future thresholds
- scan-checked or double-checked registry promotion
- morphology output, criterion state, structured semantic claim, or bounded narrative
- Production rule activation
- biometric identity matching

`traditionalSemanticAuthority=false` remains mandatory.

## Why exact-page closure is insufficient

FR181 and FR182 resolve provenance. FR180 requires additional authority classes for operationalization:

1. source-authorized metric-to-concept relation;
2. governed metric directionality;
3. stable criterion identity;
4. criterion-specific calibration evidence;
5. criterion-specific calibration protocol;
6. calibrated decision rule;
7. for `細而長`, an independently authorized composition rule after both component bindings exist.

None of these follows merely from the existence of the words `細`, `長`, `極`, or `寸` on a verified scan page.

## Next frontier

`review_source_authorized_xi_chang_metric_to_concept_mapping_feasibility_before_directionality_or_calibration`

The next review must determine whether the direct-source authority plus the current neutral geometry surface can support any governed relation between the traditional concepts `細` / `長` and candidate neutral metrics. It must remain prior to directionality, thresholds, calibration, or Production admission and must fail closed if the source does not support such a relation.
