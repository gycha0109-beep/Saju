export const LIP_BORDER_REVIEW_SCHEMA_VERSION: 'myeongha-lip-border-human-review-v1';
export const LIP_BORDER_LINES: readonly [
  'upperLipBorder',
  'lowerLipBorder',
  'philtrumImageLeft',
  'philtrumImageRight',
];
export const LIP_BORDER_POINTS: readonly ['imageLeftMouthCorner', 'imageRightMouthCorner'];
export const LIP_BORDER_STATES: readonly [
  'marked',
  'partial',
  'occluded',
  'out_of_frame',
  'not_visible',
  'unknown',
];
export type LipBorderState =
  'marked' | 'partial' | 'occluded' | 'out_of_frame' | 'not_visible' | 'unknown';
export type LipBorderVertex = readonly number[];
export type LipBorderLine = {
  readonly status: LipBorderState;
  readonly segments: readonly (readonly LipBorderVertex[])[];
};
export type LipBorderPoint = {
  readonly status: Exclude<LipBorderState, 'partial'>;
  readonly point: LipBorderVertex | null;
};
export interface LipBorderHumanInput {
  readonly upperLipBorder: LipBorderLine;
  readonly lowerLipBorder: LipBorderLine;
  readonly philtrumImageLeft: LipBorderLine;
  readonly philtrumImageRight: LipBorderLine;
  readonly imageLeftMouthCorner: LipBorderPoint;
  readonly imageRightMouthCorner: LipBorderPoint;
}
export type LipBorderHumanRecord = LipBorderHumanInput & {
  readonly schemaVersion: typeof LIP_BORDER_REVIEW_SCHEMA_VERSION;
  readonly captureRef: string;
  readonly sourceSha256: string;
  readonly coordinateFrame: 'normalized_original_image_screen_sides';
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
};
export function createLipBorderHumanReviewRecord(
  input: LipBorderHumanInput,
  options: { captureRef: string; sourceSha256: string; revision: number; reviewedAt: string },
): LipBorderHumanRecord;
export function validateLipBorderHumanReviewStore(
  store: unknown,
  knownRefs: readonly string[],
): {
  readonly schemaVersion: typeof LIP_BORDER_REVIEW_SCHEMA_VERSION;
  readonly records: Readonly<Record<string, LipBorderHumanRecord>>;
};
export function projectLipBorderHumanReviewForUi(
  record: LipBorderHumanRecord,
): LipBorderHumanInput & {
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
};
