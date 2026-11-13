export const JAW_CONTOUR_REVIEW_VERSION: 'myeongha-jaw-visible-contour-human-review-v1';
export const JAW_CONTOUR_STATES: ReadonlyArray<
  'marked' | 'partial' | 'occluded' | 'out_of_frame' | 'not_visible' | 'unknown'
>;
export interface JawContourSegment {
  readonly status: (typeof JAW_CONTOUR_STATES)[number];
  readonly segments: readonly (readonly (readonly [number, number])[])[];
}
export interface JawContourReview {
  readonly visibleLowerFaceOutline: JawContourSegment;
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly actualJawAnatomyValidated: false;
  readonly boneShapeInferred: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
}
export function createJawContourReviewRecord(
  input: { visibleLowerFaceOutline: JawContourSegment },
  options: {
    captureRef: string;
    sourceSha256: string;
    revision: number;
    reviewedAt: string;
  },
): JawContourReview;
export function validateJawContourReviewStore(
  store: unknown,
  knownRefs: string[],
): {
  schemaVersion: typeof JAW_CONTOUR_REVIEW_VERSION;
  records: Readonly<Record<string, JawContourReview>>;
};
export function projectJawContourReviewForUi(record: JawContourReview): JawContourReview;
