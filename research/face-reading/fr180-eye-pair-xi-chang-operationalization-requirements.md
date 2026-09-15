# FR180 — Eye-Pair `細 / 長` Source-Authorized Operationalization Requirements

## Status

FR180 defines the **minimum authority/evidence prerequisites** that must exist before the current neutral Eye-Pair geometry can be mapped to traditional `細`, `長`, or the compound `細而長`.

Verdict:

`OPERATIONALIZATION_REQUIREMENTS_DEFINED_TRADITIONAL_BINDING_NOT_ADMITTED`

This is a requirements review only. It does not issue a traditional binding, threshold, classifier, calibration result, morphology state, structured claim, narrative, or Production rule.

Production remains **HOLD**.

## Upstream authority

FR175 directly reviewed the `監察官` passage:

`眼須要含藏不露。黑白分明。瞳子端定。光彩射人。或細長極寸。乃為監察官成。`

The direct body is reviewed, but the exact eye-passage scan page is still not pinned and scan-checked promotion is not authorized.

FR176 reviewed selected `卷三 / 達摩相眼` witness clauses, including:

- `細而長`
- `目長一寸`

Those clauses remain selected PDF-indexed text with OCR uncertainty. The exact Daruma Eye scan page is not pinned and scan-checked promotion is not authorized.

FR178 issued research-only role-invariant neutral geometry that makes both geometric dimensions observable:

- `neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0`
- `neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`

FR179 then concluded:

`NEUTRAL_GEOMETRY_REPRESENTABILITY_EXPANDED_TRADITIONAL_BINDING_NOT_ADMITTED`

FR180 starts from that exact boundary.

## Key distinction

Neutral geometry availability and traditional semantic operationalization are separate authorities.

FR180 therefore does **not** infer:

- lower or higher Y:X ratio = `細`,
- larger relative X-span = `長`,
- any percentile = traditional category boundary,
- any population distribution = the correct reference population,
- any source wording = a machine threshold,
- `細` threshold AND `長` threshold = `細而長`,
- normalized X-span ratio = absolute traditional `寸`.

The source words constrain the research target, but they do not themselves define a numeric classifier.

## Existing calibration framework reused

The repository already defines calibration authority. FR180 reuses it rather than inventing a new Face Reading threshold process.

For a future production calibration, the existing framework requires evidence classes including:

1. `repeat_capture_stability`
2. `blinded_expert_operationalization`
3. `threshold_selection_result`

The protocol framework also requires participant-level dataset separation, blinded reviewers, and a threshold-selection process that cannot read the holdout partition.

At FR180, current registries contain:

- Eye-Pair `細/長` calibration evidence: **0**
- Eye-Pair capture protocols: **0**
- Eye-Pair labeling protocols: **0**
- Eye-Pair calibration studies: **0**

FR180 does not add any of them.

## Source promotion prerequisites

Before any Production-oriented calibration can be considered, source provenance must first be promoted through the existing source authority discipline.

Required:

- exact FR175 `監察官` eye passage scan page pinned,
- exact FR176 `達摩相眼` scan page pinned,
- direct text visually checked against the selected witness,
- no translation substituted for direct source,
- no secondary source substituted for direct source.

Current status:

- source identity: resolved,
- FR175 exact eye page: not pinned,
- FR176 exact Daruma Eye page: not pinned,
- scan-checked promotion: not authorized.

## `細` operationalization prerequisites

Candidate neutral metric:

`neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0`

This metric is available, but the following are not:

- source-authorized relation from the neutral ratio to traditional `細`,
- governed directionality of the relation,
- stable traditional criterion identity in the authority surface,
- criterion-specific calibration evidence,
- criterion-specific calibration protocol,
- calibrated decision rule.

Therefore:

`Y:X ratio != traditional 細`

and no `細` criterion state is issued.

## `長` operationalization prerequisites

Candidate neutral metric:

`neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`

This metric is available, but the following are not:

- source-authorized relation from the neutral relative span to traditional `長`,
- governed directionality of the relation,
- stable traditional criterion identity,
- criterion-specific calibration evidence,
- criterion-specific calibration protocol,
- calibrated decision rule.

The metric is a normalized ratio. It is not a traditional absolute unit and does not operationalize `目長一寸`.

Therefore:

`relative X-span != traditional 長`

and no `長` criterion state is issued.

## `細而長` compound prerequisite

The compound clause is not created by mechanically combining two future numeric thresholds.

Before a compound binding could be admitted, all of the following would be required:

1. an admitted `細` binding,
2. an admitted `長` binding,
3. source-authorized composition semantics for the compound clause,
4. a governed rule defining how the admitted individual states compose.

Current state:

- `細` binding: not admitted,
- `長` binding: not admitted,
- composition rule: not issued,
- boolean-AND shortcut: not authorized,
- selective semantic decomposition: not authorized.

## `極` and `寸`

FR180 intentionally does not operationalize either term.

`極` remains without a governed degree/intensity classifier.

`寸` remains without a source-authorized mapping to the normalized canonical geometry used by the current runtime.

No normalized ratio is converted to an absolute historical unit.

## Unresolved authority requirements

FR180 records the following as still open:

- FR175 exact eye passage scan page,
- FR176 exact Daruma Eye scan page,
- `細` metric-to-source-concept mapping,
- `細` metric directionality,
- stable `細` criterion identity,
- `細` calibration evidence,
- `細` calibration protocol,
- `細` calibrated decision rule,
- `長` metric-to-source-concept mapping,
- `長` metric directionality,
- stable `長` criterion identity,
- `長` calibration evidence,
- `長` calibration protocol,
- `長` calibrated decision rule,
- `細而長` composition authority.

## Prohibited shortcuts

FR180 explicitly forbids:

- Y:X ratio → `細` without governed mapping,
- relative X-span → `長` without governed mapping,
- inferring metric directionality from wording alone,
- inventing a percentile threshold,
- inventing a reference population,
- source wording → machine threshold,
- two unbound neutral metrics → `細而長`,
- partial clause geometry → full clause binding,
- neutral geometry → `極`,
- normalized ratio → `寸`,
- individual-eye asymmetry from role-invariant pair metrics.

## Privacy / biometric boundary

FR180 collects no participant data. It accepts or persists no participant image, provider response, landmark set, metric values, face embedding, or identity template. It performs no biometric identity matching.

Any later calibration phase involving human data must use the existing consent, pseudonymization, reviewer-blinding, retention, dataset-split, and no-identity-matching requirements of the calibration framework; FR180 itself does not authorize data collection.

## Next frontier

`acquire_and_pin_exact_fr175_monitoring_officer_eye_passage_scan_page_before_any_xi_chang_calibration`

The next step is source provenance closure, not threshold creation. The FR175 page is chosen first because FR175 already narrows the relevant scan window to pages 87–88 while its exact eye-passage page remains unresolved.
