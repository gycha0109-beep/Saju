export const EAR_DETAIL_REVIEW_SCHEMA_VERSION: 'myeongha-ear-detail-human-review-v1';
export const EAR_DETAIL_STATES: readonly [
  'marked',
  'partial',
  'occluded',
  'out_of_frame',
  'not_visible',
  'unknown',
];
export const EAR_DETAIL_CONTOURS: readonly ['outerRim', 'lobe'];
export const EAR_DETAIL_SIDES: readonly ['imageLeft', 'imageRight'];
export type EarState =
  'marked' | 'partial' | 'occluded' | 'out_of_frame' | 'not_visible' | 'unknown';
export type EarPoint = readonly number[];
export interface EarContour {
  readonly status: EarState;
  readonly segments: readonly (readonly EarPoint[])[];
}
export interface EarAttachment {
  readonly status: Exclude<EarState, 'partial'>;
  readonly point: EarPoint | null;
}
export interface EarSide {
  readonly outerRim: EarContour;
  readonly lobe: EarContour;
  readonly attachment: EarAttachment;
}
export interface EarDetailInput {
  readonly imageLeft: EarSide;
  readonly imageRight: EarSide;
}
export type EarDetailRecord = EarDetailInput & {
  readonly schemaVersion: typeof EAR_DETAIL_REVIEW_SCHEMA_VERSION;
  readonly captureRef: string;
  readonly sourceSha256: string;
  readonly viewRole: 'frontal' | 'profile';
  readonly coordinateFrame: 'normalized_original_image_screen_sides';
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly earProjectionMeasured: false;
  readonly earThicknessMeasured: false;
  readonly revision: number;
  readonly reviewedAt: string;
};
export function createEarDetailReviewRecord(
  input: EarDetailInput,
  options: {
    captureRef: string;
    sourceSha256: string;
    viewRole: 'frontal' | 'profile';
    revision: number;
    reviewedAt: string;
  },
): EarDetailRecord;
export function validateEarDetailReviewStore(
  store: unknown,
  availableRecords: readonly { captureRef: string; viewRole: 'frontal' | 'profile' }[],
): {
  readonly schemaVersion: typeof EAR_DETAIL_REVIEW_SCHEMA_VERSION;
  readonly records: Readonly<Record<string, EarDetailRecord>>;
};
export function projectEarDetailReviewForUi(record: EarDetailRecord): EarDetailInput & {
  readonly viewRole: 'frontal' | 'profile';
  readonly revision: number;
  readonly reviewedAt: string;
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly earProjectionMeasured: false;
  readonly earThicknessMeasured: false;
};
