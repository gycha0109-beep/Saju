export const NOSE_DETAIL_REVIEW_SCHEMA_VERSION: 'myeongha-nose-detail-human-review-v1';
export const NOSE_CONTOUR_PARTS: readonly [
  'imageLeftAlar',
  'imageRightAlar',
  'imageLeftNostril',
  'imageRightNostril',
];
export type NoseReviewState =
  'marked' | 'partial' | 'occluded' | 'out_of_frame' | 'not_visible' | 'unknown';
export const NOSE_REVIEW_STATES: readonly NoseReviewState[];
export type NosePoint = readonly number[];
export interface NoseContour {
  readonly status: NoseReviewState;
  readonly segments: readonly (readonly NosePoint[])[];
}
export interface NoseTip {
  readonly status: Exclude<NoseReviewState, 'partial'>;
  readonly point: NosePoint | null;
}
export interface NoseDetailInput {
  readonly tip: NoseTip;
  readonly imageLeftAlar: NoseContour;
  readonly imageRightAlar: NoseContour;
  readonly imageLeftNostril: NoseContour;
  readonly imageRightNostril: NoseContour;
}
export type NoseDetailReviewRecord = NoseDetailInput & {
  readonly schemaVersion: typeof NOSE_DETAIL_REVIEW_SCHEMA_VERSION;
  readonly captureRef: string;
  readonly sourceSha256: string;
  readonly coordinateFrame: 'normalized_image_coordinates_not_anatomical_laterality';
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
};
export function createNoseDetailReviewRecord(
  input: NoseDetailInput,
  options: { captureRef: string; sourceSha256: string; revision: number; reviewedAt: string },
): NoseDetailReviewRecord;
export function validateNoseDetailReviewStore(
  store: unknown,
  knownRefs: readonly string[],
): {
  readonly schemaVersion: typeof NOSE_DETAIL_REVIEW_SCHEMA_VERSION;
  readonly records: Readonly<Record<string, NoseDetailReviewRecord>>;
};
export function projectNoseDetailReviewForUi(record: NoseDetailReviewRecord): NoseDetailInput & {
  readonly revision: number;
  readonly reviewedAt: string;
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
};
