# FR181 — FR175 監察官 eye passage exact scan-page pinning

Date: 2026-09-15  
Issue: #621  
Scope: locator/provenance closure only  
Verdict: `FR175_EYE_PASSAGE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY`

## Predecessor frontier

FR180 closed with:

```text
acquire_and_pin_exact_fr175_monitoring_officer_eye_passage_scan_page_before_any_xi_chang_calibration
```

FR181 resolves only that exact-page provenance gap. It does not operationalize `細`, `長`, `極`, `寸`, or `細而長`.

## Frozen source identity

No new scan witness was acquired. The existing NLC 1925 source identity remains fixed:

```text
workRef: work.shenxiang_quanbian
witnessId: witness.shenxiang_quanbian.nlc_1925
editionLabel: 文明書局 民國十四年本 — NLC scan
publicationYear: 1925
holdingInstitution: 國家圖書館
sourceFilePageRef: https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf
sourcePdfSha256: sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af
sourcePdfPageCount: 576
```

The historical FR175 locator remained intentionally unresolved:

```text
scanPageWindow = [87, 88]
exactEyePassageScanPage = null
exactEyePassageScanPageResolved = false
scanCheckedEyePassagePromotionAuthorized = false
```

FR181 does not mutate that historical artifact. It emits a new locator-only authority record.

## Immutable page evidence

FR103 already froze the required page renders from the same PDF identity:

```text
page 87
packages/face-reading/evidence/fr103/nlc-1925-page-87.png
sha256:9a3cbda77616c6c359e2aaca173d8f4d3c7ef867449247d9d3887847d9882073

page 88
packages/face-reading/evidence/fr103/nlc-1925-page-88.png
sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce
```

The page bytes were independently exported through diagnostic run `34940110746`; the diagnostic workflow verified both SHA-256 values before export. Artifact `10385430126` had archive digest:

```text
sha256:73ecb0776cb64ac64c89d5b10b1faf58040d0fc944f42faf8985292103486121
```

The diagnostic branch was evidence transport only and is not merge authority.

## Direct visual review

Admission basis:

```text
direct_interactive_visual_review_of_repository_frozen_page_images
```

No OCR, search index, translation, or secondary source was used as evidence authority.

### Page 87

Visual finding:

```text
five_officer_introduction_and_officer_sequence_without_full_fr175_target_passage
```

It contains the `五官總論 / 五官說` introduction and the officer sequence including `三曰眼為監察官`, but not the full FR175 target passage.

### Page 88

Visual finding:

```text
exact_fr175_monitoring_officer_direct_passage_visible
```

The page visibly contains the `○監察官` column followed by the exact FR175 passage:

```text
眼須要含藏不露。黑白分明。瞳子端定。光彩射人。或細長極寸。乃為監察官成。
```

Therefore:

```text
exactEyePassageScanPage = 88
exactEyePassageScanPageResolved = true
locatorGapResolved = true
selectedImmutablePageImageRef = packages/face-reading/evidence/fr103/nlc-1925-page-88.png#sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce
visualPassageMatchConfirmed = true
```

The FR103 mouth passage's earlier visual-review result is not reused as proof of the eye passage. FR181 has its own visual checker identity:

```text
checker.fr181.interactive_visual_review.primary
```

## Authority boundary

The following are explicitly **not** authorized by exact-page closure:

```text
細 -> neutral Y:X metric binding
長 -> relative X-span metric binding
metric directionality
machine threshold
percentile or reference population
criterion-specific calibration evidence
criterion-specific calibration protocol
calibrated decision rule
極 operationalization
寸 mapping
細而長 compound composition rule
scan_checked registry promotion
double_checked source status
methodology Production promotion
morphology output
criterion state
structured claim
bounded narrative
classifier
score
rank
Production rule
traditional semantic authority
anatomical laterality
individual-eye asymmetry
biometric identity matching
```

The exact visual match is provenance authority only.

## Resolved and remaining blockers

Resolved by FR181:

```text
fr175_exact_eye_passage_scan_page_not_pinned
```

Still unresolved:

```text
fr176_exact_daruma_eye_scan_page_not_pinned
xi_metric_to_source_concept_mapping_not_authorized
xi_metric_directionality_not_governed
xi_stable_criterion_identity_not_issued
xi_criterion_specific_calibration_evidence_absent
xi_criterion_specific_calibration_protocol_absent
xi_calibrated_decision_rule_absent
chang_metric_to_source_concept_mapping_not_authorized
chang_metric_directionality_not_governed
chang_stable_criterion_identity_not_issued
chang_criterion_specific_calibration_evidence_absent
chang_criterion_specific_calibration_protocol_absent
chang_calibrated_decision_rule_absent
compound_xi_er_chang_composition_rule_not_authorized
```

## Next frontier

FR181 advances only to:

```text
acquire_and_pin_exact_fr176_daruma_eye_scan_page_before_any_xi_chang_calibration
```

Production remains HOLD.
