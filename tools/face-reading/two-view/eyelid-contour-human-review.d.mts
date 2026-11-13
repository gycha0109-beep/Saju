export const EYELID_CONTOUR_REVIEW_VERSION: 'myeongha-eyelid-contour-human-review-v1';
export const EYELID_CONTOUR_SIDES: readonly ['imageLeft', 'imageRight'];
export const EYELID_CONTOUR_PARTS: readonly ['upperLidMargin', 'creaseLine', 'hoodingBoundary'];
export const EYELID_CONTOUR_STATES: readonly [
  'marked',
  'partial',
  'occluded',
  'out_of_frame',
  'not_visible',
  'unknown',
];
export type EyelidContourState =
  'marked' | 'partial' | 'occluded' | 'out_of_frame' | 'not_visible' | 'unknown';
export interface EyelidPart {
  readonly status: EyelidContourState;
  readonly segments: readonly (readonly (readonly number[])[])[];
}
export interface EyelidSide {
  readonly upperLidMargin: EyelidPart;
  readonly creaseLine: EyelidPart;
  readonly hoodingBoundary: EyelidPart;
}
export interface EyelidContourInput {
  readonly imageLeft: EyelidSide;
  readonly imageRight: EyelidSide;
}
export type EyelidContourRecord = EyelidContourInput & {
  readonly schemaVersion: typeof EYELID_CONTOUR_REVIEW_VERSION;
  readonly captureRef: string;
  readonly sourceSha256: string;
  readonly coordinateFrame: 'normalized_original_image_screen_sides';
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly actualAnatomicalContourValidated: false;
  readonly anatomicalLateralityAssigned: false;
  readonly eyelidProjectionMeasured: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
};
export function createEyelidContourReviewRecord(
  input: EyelidContourInput,
  options: { captureRef: string; sourceSha256: string; revision: number; reviewedAt: string },
): EyelidContourRecord;
export function validateEyelidContourReviewStore(
  store: unknown,
  knownRefs: readonly string[],
): {
  readonly schemaVersion: typeof EYELID_CONTOUR_REVIEW_VERSION;
  readonly records: Readonly<Record<string, EyelidContourRecord>>;
};
export function projectEyelidContourReviewForUi(record: EyelidContourRecord): EyelidContourInput & {
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly actualAnatomicalContourValidated: false;
  readonly anatomicalLateralityAssigned: false;
  readonly eyelidProjectionMeasured: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
};
