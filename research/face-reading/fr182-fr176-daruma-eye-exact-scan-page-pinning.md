# FR182 — FR176 達摩相眼 Exact Scan Page Pinning

## Decision

FR182 closes exactly one provenance gap left by FR176/FR180/FR181: the exact fixed-witness scan page for `卷三 / 達摩相眼`.

Verdict:

`FR176_DARUMA_EYE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY`

This is locator/provenance authority only. Production remains **HOLD**.

## Fixed source identity

- work: `work.shenxiang_quanbian`
- witness: `witness.shenxiang_quanbian.nlc_1925`
- edition: `文明書局 民國十四年本 — NLC scan`
- publication year: `1925`
- holding institution: `國家圖書館`
- source file: `NLC416-13jh001662-59167_神相全編.pdf`
- source PDF SHA-256: `94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af`
- source PDF page count: `576`

FR176 remains historical and unmodified. Its historical locator stays `exactDarumaEyeScanPage=null`, `exactDarumaEyeScanPageResolved=false`.

## Acquisition and direct visual review

The first pages 88–90 hypothesis was rejected by direct visual review: those pages are the earlier `五官說 / 監察官` material, not `達摩相眼`.

A full indexed-text locator attempt was also rejected as authority because the fixed PDF did not yield usable matching text through `pdftotext`.

A broad visual locator render of PDF pages 100–220 established:

- PDF page 135: `神相全編卷三` begins;
- PDF page 145: preceding `相目論` context;
- PDF page 146: `達摩相眼` heading and the FR176 target clauses are directly visible;
- PDF page 147: subsequent eye-interpretation continuation.

Pages 145–147 were then rendered again from the fixed PDF at 320 DPI. Direct interactive visual review confirmed that PDF page **146** contains the `達摩相眼` heading and all six FR176 selected clauses on the same scan page:

- `秀而正`
- `細而長`
- `目大而光`
- `目有三角`
- `目長一寸`
- `目尾相垂`

OCR and search-index text were not used for evidence admission.

## Frozen immutable evidence

The final repository evidence is:

`packages/face-reading/evidence/fr182/nlc-1925-page-146.png`

Expected SHA-256:

`522e5cc94a1fbd885a298cedd8aea94e7a95dd4877d93afa10129e707e8059c7`

The dedicated FR182 CI verifies the actual repository PNG bytes against this digest before running the authority regression.

## Resolved blocker

FR182 resolves exactly:

- `fr176_exact_daruma_eye_scan_page_not_pinned`

It does not rewrite FR176 and does not convert a visual locator into semantic or production authority.

## Remaining blockers

The FR180 operationalization blockers remain, excluding only the exact FR176 page locator now resolved:

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

## Hard authority boundary

Page 146 does **not** authorize any of the following:

- `細` metric binding or directionality;
- `長` metric binding or directionality;
- threshold, percentile, reference population, calibration evidence, calibration protocol, decision rule, classifier, score, or rank;
- `極` operationalization;
- `寸` mapping;
- `細而長` composition;
- morphology output or criterion state;
- structured semantic claim or bounded narrative;
- `scan_checked` or `double_checked` registry promotion;
- anatomical laterality or individual-eye asymmetry output;
- biometric identity matching;
- Production rule or traditional semantic promotion.

`traditionalSemanticAuthorityPromoted=false` and `productionRuleAuthorized=false` remain invariant.

## Next frontier

Return to the FR180 Xi/Chang operationalization requirements with both exact source-page locator gaps now pinned, while traditional binding remains unadmitted:

`review_fr180_xi_chang_operationalization_requirements_with_both_exact_source_pages_pinned_while_traditional_binding_remains_not_admitted`
