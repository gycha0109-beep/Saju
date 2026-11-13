export const LIP_VERTICAL_ENVELOPE_COMPARISON_VERSION: 'engineering.lip-class-human-border-vertical-envelope@0.1.0';
export type LipVerticalEnvelopeSide =
  | Readonly<{ status: 'unavailable'; reason: string }>
  | Readonly<{
      status: 'available';
      drawnBorderExtremeToImageHeight: number;
      modelClassExtremeToImageHeight: number;
      signedDrawnMinusModelExtremeToImageHeight: number;
      fullModelHorizontalRangeCompared: true;
      anatomicalBorderCoverageCertified: false;
    }>;
export interface LipVerticalEnvelopeComparison {
  readonly methodVersion: typeof LIP_VERTICAL_ENVELOPE_COMPARISON_VERSION;
  readonly status: 'available' | 'partial' | 'unavailable';
  readonly reason?: string | null;
  readonly upperBorder: LipVerticalEnvelopeSide;
  readonly lowerBorder: LipVerticalEnvelopeSide;
  readonly candidateOnly: true;
  readonly singleReviewerUnverified: true;
  readonly anatomicalLipBordersValidated: false;
  readonly lipThicknessMeasured: false;
  readonly modelHumanAgreementValidated: false;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
}
export function compareLipClassVerticalEnvelopesToHumanBorders(
  model: unknown,
  human: unknown,
): Readonly<LipVerticalEnvelopeComparison>;
