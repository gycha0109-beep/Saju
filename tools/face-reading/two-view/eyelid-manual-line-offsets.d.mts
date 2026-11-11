export const EYELID_MANUAL_LINE_OFFSETS_VERSION: 'engineering.manual-eyelid-line-offsets@0.1.0';
type Withheld = Readonly<{ status: 'unavailable'; reason: string }>;
type Measured = Readonly<{
  status: 'available' | 'partial';
  sharedXSpanToImageWidth: number;
  signedOtherMinusUpperAtSharedQuartilesToImageHeight: readonly number[];
  fullBothLinesHorizontalCoverage: boolean;
}>;
type LineComparison = Measured | Withheld;
type Side = Readonly<{
  creaseToUpperMargin: LineComparison;
  hoodingToUpperMargin: LineComparison;
}>;
export type ManualEyelidLineOffsets = Readonly<{
  methodVersion: typeof EYELID_MANUAL_LINE_OFFSETS_VERSION;
  candidateOnly: true;
  manualDrawingOnly: true;
  singleReviewerUnverified: true;
  anatomicalFoldTypeIdentified: false;
  eyelidProjectionMeasured: false;
  independentAccuracyValidated: false;
  canonicalF0Admitted: false;
  traditionalBindingAuthorized: false;
  productInterpretationAuthorized: false;
  modelTrainingAuthorized: false;
  status: 'available' | 'partial' | 'unavailable';
  reason?: string | null;
  imageLeft?: Side;
  imageRight?: Side;
}>;
export function measureManualEyelidLineOffsets(review: unknown): ManualEyelidLineOffsets;
