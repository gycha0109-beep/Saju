export const EAR_RIM_CURVE_COMPARISON_VERSION: 'engineering.ear-rim-class-boundary-curve@0.1.0';
type Side =
  | Readonly<{
      status: 'available';
      comparedStrokeArcSamples: number;
      meanHumanStrokeToNearestModelClassEdgeOverImageDiagonal: number;
      maxHumanStrokeToNearestModelClassEdgeOverImageDiagonal: number;
      inspectedWholeEarClassOnly: true;
    }>
  | Readonly<{ status: 'unavailable'; reason: string }>;
export type EarRimCurveComparison = Readonly<{
  methodVersion: typeof EAR_RIM_CURVE_COMPARISON_VERSION;
  status: 'available' | 'partial' | 'unavailable';
  reason?: string | null;
  imageLeft?: Side;
  imageRight?: Side;
  candidateOnly: true;
  singleReviewerUnverified: true;
  drawingCoverageCertified: false;
  anatomicalOuterRimValidated: false;
  modelHumanAgreementValidated: false;
  independentAccuracyValidated: false;
  earThicknessMeasured: false;
  earProjectionMeasured: false;
  anatomicalLateralityAssigned: false;
  canonicalF0Admitted: false;
  traditionalBindingAuthorized: false;
  productInterpretationAuthorized: false;
  modelTrainingAuthorized: false;
}>;
export function compareEarMaskBoundaryToHumanOuterRim(input: {
  mask: ArrayLike<number>;
  width: number;
  height: number;
  imageWidth?: number;
  imageHeight?: number;
  human: unknown;
}): EarRimCurveComparison;
