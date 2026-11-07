export const FR294_INDEPENDENT_PAIR_LEDGER_VERSION: 'myeongha-fr294-independent-screen-review-pairs-v1';
export const FR294_INDEPENDENT_PAIR_AUDIT_VERSION: 'local-fr294-independent-pair-audit@0.1.0';
export type FR294PairEntry = Readonly<{
  captureRef: string;
  sourceSha256: string;
  featureKey: 'eye.eyelid_crease_or_hooded_category' | 'ear.visible_boundary_height_shape';
  viewRole: 'frontal' | 'profile';
  reviews: readonly [
    Readonly<{
      reviewerRef: string;
      sessionRef: string;
      reviewedAt: string;
      blindToOtherReviewAttested: true;
      originalViewedAttested: true;
      imageLeft: string;
      imageRight: string;
    }>,
    Readonly<{
      reviewerRef: string;
      sessionRef: string;
      reviewedAt: string;
      blindToOtherReviewAttested: true;
      originalViewedAttested: true;
      imageLeft: string;
      imageRight: string;
    }>,
  ];
  sameOriginalImageAttested: true;
  reviewerSeparationAttested: true;
  researchConsentAttested: true;
  usedForModelTraining: false;
}>;
export type FR294PairLedger = Readonly<{
  schemaVersion: typeof FR294_INDEPENDENT_PAIR_LEDGER_VERSION;
  pairs: readonly FR294PairEntry[];
}>;
export type FR294PairAudit =
  | Readonly<{
      schemaVersion: typeof FR294_INDEPENDENT_PAIR_AUDIT_VERSION;
      status: 'withheld';
      reason: string;
      distinctRealHumanReviewersProven: false;
      reviewerBlindnessIndependentlyVerified: false;
      independentGroundTruthValidated: false;
      accuracyValidated: false;
      prospectiveRepeatCaptureValidated: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
      modelTrainingAuthorized: false;
    }>
  | Readonly<{
      schemaVersion: typeof FR294_INDEPENDENT_PAIR_AUDIT_VERSION;
      status: 'not_collected' | 'descriptive_pairs_only';
      captureCount: number;
      reviewerCodePairsRecorded: number;
      featureCounts: Readonly<
        Record<
          string,
          Readonly<{
            pairedCaptures: number;
            agreementSides: number;
            disagreementSides: number;
            notComparableSides: number;
          }>
        >
      >;
      perCapture: Readonly<
        Record<
          string,
          readonly Readonly<{
            featureKey: string;
            reviewerCodePairRecorded: true;
            matchingComparableSides: number;
            differingComparableSides: number;
            notComparableSides: number;
            distinctRealHumanReviewersProven: false;
            reviewerBlindnessIndependentlyVerified: false;
            independentGroundTruthValidated: false;
            accuracyValidated: false;
            prospectiveRepeatCaptureValidated: false;
            canonicalF0Admitted: false;
            traditionalBindingAuthorized: false;
            productInterpretationAuthorized: false;
            modelTrainingAuthorized: false;
          }>[]
        >
      >;
      distinctRealHumanReviewersProven: false;
      reviewerBlindnessIndependentlyVerified: false;
      independentGroundTruthValidated: false;
      accuracyValidated: false;
      prospectiveRepeatCaptureValidated: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
      modelTrainingAuthorized: false;
    }>;
export function auditFr294IndependentScreenReviewPairs(
  ledger: FR294PairLedger,
  inventory: Map<string, { sourceSha256: string; viewRole: 'frontal' | 'profile' }>,
  humanReadiness: unknown,
): FR294PairAudit;
export function withheldFr294IndependentPairs(
  reason:
    | 'LEDGER_RESTORE_FAILED'
    | 'STALE_SOURCE_OR_INVALID_LEDGER'
    | 'HUMAN_READINESS_UNAVAILABLE'
    | 'PROTOCOL_NOT_COLLECTED',
): FR294PairAudit;
