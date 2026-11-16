export const EYELID_UPPER_EDGE_COMPARISON_VERSION: 'engineering.eyelid-upper-margin-to-eye-class-envelope@0.1.0';
export interface EyelidUpperEdgeSide {
  readonly status: 'available';
  readonly drawnUpperMarginTopToImageHeight: number;
  readonly modelEyeClassTopToImageHeight: number;
  readonly signedDrawnMinusModelTopToImageHeight: number;
  readonly overlappingXSpanToImageWidth: number;
  readonly drawingCoverageCertified: false;
}
export interface EyelidUpperEdgeUnavailable {
  readonly status: 'unavailable';
  readonly reason: string;
}
export interface EyelidUpperEdgeComparison {
  readonly methodVersion: typeof EYELID_UPPER_EDGE_COMPARISON_VERSION;
  readonly status: 'available' | 'partial' | 'unavailable';
  readonly reason?: string | null;
  readonly imageLeft: EyelidUpperEdgeSide | EyelidUpperEdgeUnavailable;
  readonly imageRight: EyelidUpperEdgeSide | EyelidUpperEdgeUnavailable;
  readonly candidateOnly: true;
  readonly singleReviewerUnverified: true;
  readonly modelHumanAgreementValidated: false;
  readonly actualAnatomicalUpperLidValidated: false;
  readonly eyelidCreaseDetected: false;
  readonly hoodingBoundaryDetected: false;
  readonly anatomicalLateralityAssigned: false;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
}
export function compareEyeClassEnvelopeToHumanUpperMargin(
  model: unknown,
  human: unknown,
): Readonly<EyelidUpperEdgeComparison>;
