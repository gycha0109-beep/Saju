# FR189 — Xi / Chang Capture-Quality and Review-Artifact Retention Support

## Scope

FR189 consumes the exact FR188 frontier and issues only the two research support policies that FR188 intentionally left unresolved before any Xi/Chang study registration or evidence collection.

It does not register or execute a study. It does not collect participant data, face images, review artifacts, expert labels, landmarks, or candidate metric values. It does not authorize mapping, directionality, stable criterion identity, threshold selection, calibration, compound `細而長` semantics, or Production.

## Upstream boundary

FR188 defined the repeat-capture and participant-level dataset-split protocol while leaving exactly:

- `xi_chang_capture_quality_policy_not_issued`
- `xi_chang_review_artifact_retention_policy_not_issued`

The repository common calibration contract already defines generic support-artifact shapes. Its existing frontal capture-quality artifact, however, requires `nose_bridge_visibility`, so that artifact is criterion-specific to the Nose-Bridge calibration path and is not authority for Eye-Pair Xi/Chang work.

FR189 therefore issues new Eye-Pair-specific research support refs without mutating the common calibration registry:

- `quality.face.eye_pair.xi_chang.frontal@0.1.0`
- `retention.face.eye_pair.xi_chang.review_artifact@0.1.0`

## Eye-Pair capture-quality policy

The governed quality checks are neutral capture-integrity checks:

- `single_face`
- `frontal_pose`
- `sharpness`
- `bilateral_eye_region_visibility`
- `bilateral_eye_landmark_coverage`
- `major_eye_region_occlusion`

Both eyes are required. `nose_bridge_visibility` is explicitly not required and is not imported from the existing Nose-Bridge policy.

Quality acceptance must be decided before candidate Xi/Chang metric values or expert concept labels are observed. Candidate metric values, expert labels, candidate directionality, mapping outcomes, and fortune outputs are forbidden quality-decision inputs. Every rejected capture requires a reason.

This prevents circular inclusion/exclusion decisions from manufacturing apparent metric-to-concept correspondence.

## Review-artifact retention policy

The review artifact is treated as potentially identifying face material and is restricted to `consented_pseudonymous` research use.

FR189 freezes:

- access to assigned reviewers and auditors;
- purpose to blinded expert review only;
- deletion trigger at `labeling_and_audit_complete`;
- deletion of the original source image after review-artifact creation;
- no candidate metric values or candidate directionality inside the blinded review artifact;
- no raw-provider-response or raw-landmark retention under this review-artifact policy;
- no training reuse;
- no identity matching;
- no face embedding;
- no identity template.

The common research retention contract permits `maxRetentionDays=null`. FR189 preserves that research-only state rather than inventing a calendar duration without authority, but adds a fail-closed rule: a finite calendar retention window must be fixed before any evidence collection, and collection is not authorized while the maximum remains null.

Thus support policy issuance is not study execution authority.

## Support progression

FR189 resolves the two FR188 support-policy issuance requirements as policy-definition prerequisites only. It does not mutate the common calibration registry and it does not register a study.

The next governed step is a pre-collection Xi/Chang mapping-evidence study registration that binds the already frozen hypothesis, reviewer, repeat-capture, split, quality, and retention authorities while remaining fail-closed for any still-missing collection authorization.

## Evidence and blocker accounting

Support policy issuance is not empirical evidence.

FR189 satisfies none of the remaining FR185 mapping-evidence requirements. In particular it does not produce:

- independent blinded expert operationalization evidence;
- repeat-capture stability evidence;
- source-grounded construct correspondence evidence;
- alternative-metric/confound rejection evidence;
- end-to-end evidence traceability;
- an explicit mapping acceptance/rejection decision;
- fail-closed completeness evidence.

FR189 resolves none of the fixed 13 FR183/FR184 blockers. Stable Xi/Chang criterion identities, directionality, calibration protocol/evidence/rules, and compound composition remain absent.

## Privacy boundary

No participant, image, review-artifact, expert-label, provider-response, raw-landmark, metric-value, embedding, identity-template, or biometric-matching data is accepted or produced by FR189. The policy merely acknowledges that a future review artifact may be potentially identifying and constrains that future artifact before collection is considered.

## Verdict

`GOVERNED_XI_CHANG_CAPTURE_QUALITY_AND_REVIEW_ARTIFACT_RETENTION_SUPPORT_ISSUED_STUDY_REGISTRATION_AND_EVIDENCE_COLLECTION_NOT_ADMITTED`

## Next frontier

`register_governed_xi_chang_mapping_evidence_study_before_any_participant_capture_expert_label_or_metric_evidence_collection`

`traditionalSemanticAuthority=false`; Production remains HOLD.
