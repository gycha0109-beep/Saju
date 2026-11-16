export const BROW_CENTERLINE_REVIEW_SCHEMA_VERSION: 'myeongha-brow-centerline-human-review-v1';

export const BROW_CENTERLINE_REVIEW_STATES: readonly BrowCenterlineReviewState[];

export type BrowCenterlineReviewState =
  'marked' | 'partial' | 'occluded' | 'out_of_frame' | 'no_visible_brow' | 'unknown';

export type BrowCenterlinePoint = readonly number[];
export type BrowCenterlineSegment = readonly BrowCenterlinePoint[];

export interface BrowCenterlineReviewSide {
  readonly status: BrowCenterlineReviewState;
  readonly segments: readonly BrowCenterlineSegment[];
}

export interface BrowCenterlineReviewRecord {
  readonly schemaVersion: typeof BROW_CENTERLINE_REVIEW_SCHEMA_VERSION;
  readonly captureRef: string;
  readonly sourceSha256: string;
  readonly coordinateFrame: 'normalized_image_coordinates';
  readonly imageLeft: BrowCenterlineReviewSide;
  readonly imageRight: BrowCenterlineReviewSide;
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
}

export function createBrowCenterlineReviewRecord(
  input: {
    imageLeft: BrowCenterlineReviewSide;
    imageRight: BrowCenterlineReviewSide;
  },
  options: {
    captureRef: string;
    sourceSha256: string;
    revision: number;
    reviewedAt: string;
  },
): BrowCenterlineReviewRecord;

export function validateBrowCenterlineReviewStore(
  store: unknown,
  knownCaptureRefs: readonly string[],
): {
  readonly schemaVersion: typeof BROW_CENTERLINE_REVIEW_SCHEMA_VERSION;
  readonly records: Readonly<Record<string, BrowCenterlineReviewRecord>>;
};

export function projectBrowCenterlineReviewForUi(record: BrowCenterlineReviewRecord): {
  readonly imageLeft: BrowCenterlineReviewSide;
  readonly imageRight: BrowCenterlineReviewSide;
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly modelTrainingAuthorized: false;
  readonly revision: number;
  readonly reviewedAt: string;
};
