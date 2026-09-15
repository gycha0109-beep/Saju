# FR184 — Eye-Pair Xi/Chang metric-to-concept mapping feasibility

## Scope

FR184 reviews only whether the currently governed direct-source eye passages authorize an exact semantic mapping from traditional `細` / `長` concepts to the existing neutral Eye-Pair geometry metrics.

This phase starts after:

- FR181 pinned the FR175 monitoring-officer eye passage to NLC 1925 PDF page 88;
- FR182 pinned the FR176 `卷三 / 達摩相眼` passage to NLC 1925 PDF page 146;
- FR183 re-reviewed FR180 and confirmed that both provenance prerequisites are satisfied while all 13 Xi/Chang semantic/calibration/composition blockers remain.

No new source witness, translation, secondary interpretation, participant material, calibration dataset, threshold, or classifier is introduced here.

## Governed direct-source observations

FR175 direct passage:

`眼須要含藏不露。黑白分明。瞳子端定。光彩射人。或細長極寸。乃為監察官成。`

Relevant FR175 clause:

`或細長極寸`

FR176 selected NLC 1925 clauses include:

- `細而長`
- `目長一寸`

The direct source therefore contains traditional morphology/extent wording involving `細`, `長`, and `寸`. It does **not** contain the implementation metric identifiers, coordinate-frame definition, role-invariant two-eye aggregation rule, full-mesh normalization denominator, or an explicit mathematical relation from those source concepts to the runtime geometry metrics.

## Current neutral geometry

The two candidate metrics already exist only as neutral research geometry:

### Xi candidate

`neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0`

FR178 defines it as a role-invariant mean geometric Y:X span ratio over the two exact eye cycles. Its governed definition explicitly keeps:

- `traditionalCriterionBindingRef = null`;
- physiological-aperture interpretation disallowed;
- eye-height semantic interpretation disallowed;
- individual-eye semantic roles unissued.

This makes it potentially relevant geometry for a future `細` operationalization review, but relevance is not source-authorized binding authority.

### Chang candidate

`neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`

This metric is a normalized relative horizontal extent observation. The source wording `目長一寸` is a traditional extent expression using `寸`. No governed authority converts `寸` to the full-mesh-normalized ratio, and no source text defines the runtime denominator or role-invariant aggregation.

Therefore a normalized X-span ratio cannot be promoted to traditional `長` merely because both concern a notion of extent.

## Feasibility verdict

### `細`

No source-authorized mapping relation is currently issued between `細` and the Y:X candidate metric.

Missing relation semantics include:

- direct-source definition of Y:X ratio as `細`;
- source-defined coordinate axes or denominator;
- source-defined role-invariant aggregation over two eye cycles;
- a governed bridge from neutral geometry to the traditional criterion.

Decision: `not_admitted`.

### `長`

No source-authorized mapping relation is currently issued between `長` and the normalized X-span candidate metric.

Missing relation semantics include:

- direct-source definition of full-mesh-normalized X span as `長`;
- governed conversion from traditional `寸` wording to the normalized metric;
- source-defined role-invariant aggregation over two eye cycles;
- a governed bridge from candidate geometric relevance to traditional criterion identity.

Decision: `not_admitted`.

### `細而長`

The direct conjunction does not authorize a machine Boolean `AND`. Neither component mapping is admitted, and no source-authorized composition rule has been issued.

Decision: `not_admitted`.

## Blocker accounting

FR184 resolves **zero** FR183 blockers.

All 13 remain, including:

- `xi_metric_to_source_concept_mapping_not_authorized`;
- `xi_metric_directionality_not_governed`;
- Xi criterion/calibration/decision-rule blockers;
- `chang_metric_to_source_concept_mapping_not_authorized`;
- `chang_metric_directionality_not_governed`;
- Chang criterion/calibration/decision-rule blockers;
- `compound_xi_er_chang_composition_rule_not_authorized`.

The key conclusion is that exact source-page provenance plus plausible neutral geometric relevance still does not produce semantic binding authority.

## Hard boundary

FR184 does not authorize:

- `細 = Y:X ratio`;
- `長 = X span / full-mesh X span`;
- metric directionality;
- stable criterion identity;
- `寸` conversion;
- `細而長` Boolean composition;
- threshold, percentile, reference population, calibration evidence/protocol, calibrated decision rule, classifier, score, or rank;
- morphology output, criterion state, structured claim, bounded narrative, or Production rule.

`traditionalSemanticAuthority=false` and Production remains HOLD.

## Verdict

`SOURCE_AUTHORIZED_XI_CHANG_METRIC_TO_CONCEPT_MAPPING_NOT_FOUND_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED`

## Next frontier

`define_source_authorized_xi_chang_metric_to_concept_mapping_evidence_requirements_before_directionality_or_calibration`

The next phase must define what evidence would be sufficient to establish a governed source-to-metric relation before any directionality, threshold, or calibration work is allowed.
