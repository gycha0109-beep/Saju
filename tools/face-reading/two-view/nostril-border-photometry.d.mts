export const NOSTRIL_BORDER_PHOTOMETRY_VERSION: 'engineering.manual-nostril-rim-photometric-contrast@0.1.0';
type Side =
  | Readonly<{
      status: 'available' | 'partial';
      comparedPairs: number;
      totalAttemptedPairs: 4;
      meanOutsideMinusInsideSrgbLuma: number;
      meanAbsoluteSrgbLumaDifference: number;
      photoSamplingOnly: true;
    }>
  | Readonly<{ status: 'unavailable'; reason: string }>;
export interface NostrilBorderPhotometry {
  readonly methodVersion: typeof NOSTRIL_BORDER_PHOTOMETRY_VERSION;
  readonly status: 'available' | 'partial' | 'unavailable';
  readonly reason?: string | null;
  readonly imageLeft?: Side;
  readonly imageRight?: Side;
  readonly candidateOnly: true;
  readonly manualContourRequired: true;
  readonly anatomicalNostrilInteriorIdentified: false;
  readonly anatomicalNostrilExteriorIdentified: false;
  readonly anatomicalBoundaryAccuracyValidated: false;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
}
export function measureHumanMarkedNostrilBorderPhotometry(input: {
  rgba: ArrayLike<number>;
  width: number;
  height: number;
  human: unknown;
}): Readonly<NostrilBorderPhotometry>;
