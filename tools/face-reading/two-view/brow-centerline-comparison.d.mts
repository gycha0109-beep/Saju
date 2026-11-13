export const BROW_CENTERLINE_COMPARISON_VERSION: 'engineering.brow-centerline-human-comparison@0.2.0';
export type BrowComparisonSide = {
  readonly status: 'available' | 'partial' | 'unavailable';
  readonly reason?: string;
  readonly meanMaskColumnToHumanLineDistancePx?: number;
  readonly maxMaskColumnToHumanLineDistancePx?: number;
  readonly comparedMaskColumns?: number;
  readonly totalMaskColumns?: number;
  readonly comparedMaskColumnFraction?: number;
  readonly humanReviewStatus?: 'marked' | 'partial';
};
export type BrowApparentGapComparison =
  | Readonly<{
      status: 'unavailable';
      reason: string;
      candidateOnly: true;
      singleReviewerUnverified: true;
      anatomicalInnerBrowEndsValidated: false;
      independentAccuracyValidated: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>
  | Readonly<{
      status: 'available';
      drawnCenterlineGapToMeanDrawnXSpan: number;
      modelMaskGapToMeanMaskXSpan: number;
      signedDrawnMinusModelRatio: number;
      drawingCoverageCertified: false;
      candidateOnly: true;
      singleReviewerUnverified: true;
      anatomicalInnerBrowEndsValidated: false;
      independentAccuracyValidated: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>;
export interface BrowComparisonResult {
  readonly methodVersion: typeof BROW_CENTERLINE_COMPARISON_VERSION;
  readonly status: 'available' | 'partial' | 'unavailable';
  readonly reason: string | null;
  readonly imageLeft: BrowComparisonSide;
  readonly imageRight: BrowComparisonSide;
  readonly apparentBrowGapComparison: BrowApparentGapComparison;
  readonly candidateOnly: true;
  readonly singleReviewerUnverified: true;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
}
export function compareBrowCenterlinesToHumanReview(input: {
  mask: Uint8Array;
  width: number;
  height: number;
  imageWidth: number;
  imageHeight: number;
  humanReview?: {
    humanReviewed: true;
    independentAccuracyValidated: false;
    modelTrainingAuthorized: false;
    imageLeft: {
      status: string;
      segments: readonly (readonly (readonly number[])[])[];
    };
    imageRight: {
      status: string;
      segments: readonly (readonly (readonly number[])[])[];
    };
  } | null;
}): BrowComparisonResult;
