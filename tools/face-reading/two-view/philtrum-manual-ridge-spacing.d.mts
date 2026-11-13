export const PHILTRUM_MANUAL_SPACING_VERSION:
  'engineering.philtrum-manual-ridge-spacing@0.1.0';
export interface PhiltrumResearchFlags {
  readonly candidateOnly: true;
  readonly manualDrawingOnly: true;
  readonly singleReviewerUnverified: true;
  readonly actualPhiltrumWidthValidated: false;
  readonly actualPhiltrumLengthMeasured: false;
  readonly independentAccuracyValidated: false;
  readonly anatomicalLateralityAssigned: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
}
export type ManualPhiltrumRidgeSpacing =
  | (PhiltrumResearchFlags &
      Readonly<{
        methodVersion: typeof PHILTRUM_MANUAL_SPACING_VERSION;
        status: 'unavailable';
        reason: string;
      }>)
  | (PhiltrumResearchFlags &
      Readonly<{
        methodVersion: typeof PHILTRUM_MANUAL_SPACING_VERSION;
        status: 'available';
        sampledPositionsInSharedDrawnYRange: readonly number[];
        drawnRidgeSpacingToMarkedMouthWidth: readonly number[];
        sharedDrawnYRangeToImageHeight: number;
        actualSubnasaleOrUpperLipEndpointIdentified: false;
        drawingCoverageCertified: false;
      }>);
export function measureManualPhiltrumRidgeSpacing(review: unknown): ManualPhiltrumRidgeSpacing;
