# FR186 — Eye-Pair Xi/Chang governed mapping-hypothesis provenance

## Scope

FR186 closes exactly one FR185 prerequisite: `explicit_mapping_hypothesis_provenance`.

It freezes reviewable pre-evidence hypotheses for the existing neutral Xi/Chang candidate metrics. It does not admit a mapping, issue directionality, define a criterion, select a threshold, collect expert or participant evidence, calibrate a classifier, compose `細而長`, produce morphology, or authorize Production.

## Upstream authority

FR184 found no source-authorized metric-to-concept mapping. It preserved only two neutral candidates for future review:

- `細`: `neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0`
- `長`: `neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`

FR185 then defined ten mapping-evidence requirements and made `explicit_mapping_hypothesis_provenance` the first unsatisfied prerequisite after source identity and neutral metric identity.

FR186 does not modify FR185's historical artifact. Instead it supplies a separate governed provenance artifact satisfying that prerequisite prospectively.

## Direct-source anchor

The hypotheses remain tied to the fixed NLC 1925 `神相全編` witness:

- work: `work.shenxiang_quanbian`
- witness: `witness.shenxiang_quanbian.nlc_1925`
- exact visually pinned scan page: `146`
- immutable page image SHA-256: `522e5cc94a1fbd885a298cedd8aea94e7a95dd4877d93afa10129e707e8059c7`

Relevant page-146 clauses used only as source-concept identity:

- `細`: `細而長`
- `長`: `細而長`, `目長一寸`

The wording itself does not define a modern metric formula, denominator, pair aggregation, directionality, or threshold.

## Governed hypothesis method

The hypothesis method is deliberately pre-evidence and non-directional.

For each concept, FR186 freezes before evidence collection:

1. exact traditional concept identity;
2. exact source witness/page/clauses;
3. exact neutral candidate metric ref;
4. the rationale for selecting that already-governed neutral candidate for testing;
5. one falsifiable non-directional correspondence claim;
6. explicit rejection conditions;
7. a prohibition on post-hoc rewriting after labels or metric results are observed.

The hypothesis may later be rejected. It may also produce evidence sufficient for a later mapping review. It cannot self-promote into an admitted mapping.

### Xi hypothesis

`細` is paired only as a **candidate under test** with:

`neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0`

Falsifiable claim: future governed blinded source-grounded `細` labels may show reproducible correspondence with this exact metric. The hypothesis is rejected if labels are not reproducible, the metric fails repeat-capture stability, or prespecified alternatives/confounds explain the correspondence equally or better.

No prediction is made that lower or higher values mean more `細`.

### Chang hypothesis

`長` is paired only as a **candidate under test** with:

`neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`

Falsifiable claim: future governed blinded source-grounded `長` labels may show reproducible correspondence with this exact metric. The hypothesis is rejected if labels are not reproducible, the metric fails repeat-capture stability, or prespecified alternatives/confounds explain the correspondence equally or better.

No prediction is made that lower or higher values mean more `長`. Traditional `寸` is not converted into this normalized ratio.

## Freeze-before-evidence boundary

At FR186 issuance:

```text
participant data      = not collected
participant images    = not accepted
expert labels         = not collected
metric values         = not observed
provider output       = not accepted
landmarks             = not accepted
mapping result        = not issued
directionality        = null
threshold             = null
calibration           = null
```

Changing the candidate metric, source anchor, rationale, claim, or rejection conditions after evidence observation requires a new governed hypothesis version. The FR186 hypothesis cannot be silently rewritten post hoc.

## Evidence progression

FR186 newly satisfies only:

`explicit_mapping_hypothesis_provenance`

The remaining FR185 evidence prerequisites are:

1. `independent_blinded_expert_operationalization`
2. `repeat_capture_stability`
3. `source_grounded_construct_correspondence`
4. `alternative_metric_and_confound_rejection`
5. `end_to_end_evidence_traceability`
6. `explicit_mapping_acceptance_or_rejection_decision`
7. `fail_closed_completeness`

Directionality and calibration remain separate later authorities.

## Blocker accounting

FR186 resolves none of the 13 FR183/FR184 blockers. In particular, it does not resolve either metric-to-source-concept mapping blocker because a hypothesis is not a binding decision.

All mapping, directionality, stable-criterion, calibration, calibrated-decision-rule, and compound-composition blockers remain exactly preserved.

## Hard boundary

FR186 does not authorize:

- `細 =` the Xi candidate metric;
- `長 =` the Chang candidate metric;
- lower/higher directionality for either metric;
- stable criterion identity;
- threshold, percentile, reference population, calibration protocol/result, calibrated decision rule, classifier, score, or rank;
- expert-label or participant evidence collection;
- traditional `寸` conversion;
- `細而長` Boolean/composition semantics;
- morphology output, criterion state, semantic claim, or narrative;
- Production rule or traditional semantic promotion.

`traditionalSemanticAuthority=false`; Production remains HOLD.

## Verdict

`GOVERNED_XI_CHANG_MAPPING_HYPOTHESIS_PROVENANCE_ESTABLISHED_MAPPING_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED`

## Next frontier

`define_governed_blinded_expert_operationalization_protocol_for_xi_chang_mapping_hypotheses_before_evidence_collection_directionality_or_calibration`

The next work must define the blinded expert operationalization protocol before any labels or other participant-derived evidence are collected.
