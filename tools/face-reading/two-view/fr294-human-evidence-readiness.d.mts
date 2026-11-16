export const FR294_HUMAN_EVIDENCE_VERSION: 'local-fr294-human-evidence-readiness@0.1.0';
export type HumanEvidenceItem = Readonly<{
  featureKey: string;
  lane: 'new_image_model' | 'ear_visibility_then_image_model';
  reviewPath: 'no_dedicated_human_review' | 'eye_fold_and_lid_contour' | 'ear_outline_review';
  recordedHumanReview: boolean;
  visibleSingleReviewerAnnotation: boolean;
  qualitativeEyeFoldReviewed: boolean;
  eyelidContourReviewed: boolean;
  earOutlineReviewed: boolean;
  independentHumanReferenceValidated: false;
  repeatCaptureAgreementValidated: false;
  canonicalObservationAdmitted: false;
}>;
export type HumanEvidenceReadiness =
  | Readonly<{
      schemaVersion: typeof FR294_HUMAN_EVIDENCE_VERSION;
      status: 'withheld';
      reason: string;
      independentHumanReferenceValidated: false;
      repeatCaptureAgreementValidated: false;
      canonicalObservationAdmitted: false;
    }>
  | Readonly<{
      schemaVersion: typeof FR294_HUMAN_EVIDENCE_VERSION;
      status: 'available';
      captureCount: number;
      sourceHumanReviewRecords: Readonly<{ eyeFold: number; eyelidContour: number; ear: number }>;
      featureCounts: Readonly<
        Record<
          string,
          Readonly<{
            reviewRecordedPhotos: number;
            visibleAnnotationPhotos: number;
          }>
        >
      >;
      independentHumanReferenceValidated: false;
      repeatCaptureAgreementValidated: false;
      canonicalObservationAdmitted: false;
      captures: Readonly<Record<string, readonly HumanEvidenceItem[]>>;
    }>;
export function traceFr294HumanEvidenceReadiness(
  gapReport: unknown,
  captures: readonly { captureRef: string; viewRole: 'frontal' | 'profile' }[],
  foldReviews?: Readonly<Record<string, unknown>>,
  eyelidReviews?: Readonly<Record<string, unknown>>,
  earReviews?: Readonly<Record<string, unknown>>,
  reviewState?: Readonly<Record<string, unknown>>,
): HumanEvidenceReadiness;
