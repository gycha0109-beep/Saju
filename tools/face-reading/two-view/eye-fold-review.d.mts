export const EYE_FOLD_REVIEW_SCHEMA_VERSION: 'myeongha-eye-fold-human-review-v1';

export type EyeFoldReviewState =
  'visible' | 'hooded' | 'no_visible_crease' | 'partial' | 'occluded' | 'out_of_frame' | 'unknown';

export const EYE_FOLD_REVIEW_STATES: readonly EyeFoldReviewState[];

export interface EyeFoldReviewRecord {
  readonly schemaVersion: typeof EYE_FOLD_REVIEW_SCHEMA_VERSION;
  readonly captureRef: string;
  readonly sourceSha256: string;
  readonly imageLeft: EyeFoldReviewState;
  readonly imageRight: EyeFoldReviewState;
  readonly coordinateFrame: 'image_left_right_not_anatomical_laterality';
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
}

export function createEyeFoldReviewRecord(
  input: {
    imageLeft: EyeFoldReviewState;
    imageRight: EyeFoldReviewState;
  },
  options: {
    captureRef: string;
    sourceSha256: string;
    revision: number;
    reviewedAt: string;
  },
): EyeFoldReviewRecord;

export function validateEyeFoldReviewStore(
  store: unknown,
  knownCaptureRefs: readonly string[],
): {
  readonly schemaVersion: typeof EYE_FOLD_REVIEW_SCHEMA_VERSION;
  readonly records: Readonly<Record<string, EyeFoldReviewRecord>>;
};

export function projectEyeFoldReviewForUi(record: EyeFoldReviewRecord): {
  readonly imageLeft: EyeFoldReviewState;
  readonly imageRight: EyeFoldReviewState;
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
};
