export const FR294_QUALITY_HUMAN_CROSSCHECK_VERSION: 'local-fr294-quality-human-crosscheck@0.1.0';
export type FR294JointEvidenceStatus =
  | 'no_direct_human_review_path'
  | 'review_pending_model_screened'
  | 'review_pending_model_not_screened'
  | 'single_review_model_screened'
  | 'single_review_model_not_screened';
export type FR294JointEvidenceRow = Readonly<{
  featureKey: string;
  jointEvidenceStatus: FR294JointEvidenceStatus;
  modelRegionScreening: string;
  modelRegionEvidence: string;
  singleHumanReviewRecorded: boolean;
  visibleSingleReviewerAnnotation: boolean;
  independentHumanReferenceValidated: false;
  modelHumanAgreementValidated: false;
  anatomicalFeatureVisibilityVerified: false;
  canonicalF0Admitted: false;
  traditionalBindingAuthorized: false;
  productInterpretationAuthorized: false;
}>;
export type FR294QualityHumanCrosscheck =
  | Readonly<{
      schemaVersion: typeof FR294_QUALITY_HUMAN_CROSSCHECK_VERSION;
      status: 'available';
      captureCount: number;
      mappedFeatureCount: 6;
      summary: Readonly<Record<string, Readonly<Record<FR294JointEvidenceStatus, number>>>>;
      captures: Readonly<Record<string, readonly FR294JointEvidenceRow[]>>;
      modelHumanAgreementValidated: false;
      independentHumanReferenceValidated: false;
      anatomicalFeatureVisibilityVerified: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>
  | Readonly<{
      schemaVersion: typeof FR294_QUALITY_HUMAN_CROSSCHECK_VERSION;
      status: 'withheld';
      reason: string;
      modelHumanAgreementValidated: false;
      independentHumanReferenceValidated: false;
      anatomicalFeatureVisibilityVerified: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>;
export function crosscheckFr294QualityAndHumanReview(
  quality: unknown,
  human: unknown,
): FR294QualityHumanCrosscheck;
export function withheldFr294QualityHumanCrosscheck(
  reason:
    | 'MODEL_QUALITY_UNAVAILABLE'
    | 'HUMAN_REVIEW_UNAVAILABLE'
    | 'SOURCE_EVIDENCE_MISMATCH'
    | 'HUMAN_REVIEW_UPDATED_RELOAD_REQUIRED',
): FR294QualityHumanCrosscheck;
