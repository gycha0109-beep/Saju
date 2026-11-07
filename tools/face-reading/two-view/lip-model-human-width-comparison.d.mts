export const LIP_MODEL_HUMAN_WIDTH_VERSION: 'engineering.lip-class-human-border-span@0.1.0';
export type LipModelHumanWidthComparison =
  | Readonly<{
      methodVersion: typeof LIP_MODEL_HUMAN_WIDTH_VERSION;
      status: 'unavailable';
      reason: string;
      candidateOnly: true;
      singleReviewerUnverified: true;
      anatomicalLipBordersValidated: false;
      modelHumanAgreementValidated: false;
      independentAccuracyValidated: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>
  | Readonly<{
      methodVersion: typeof LIP_MODEL_HUMAN_WIDTH_VERSION;
      status: 'available';
      drawnUpperToLowerHorizontalSpanRatio: number;
      modelClassUpperToLowerHorizontalSpanRatio: number;
      signedDrawnMinusModelRatio: number;
      fullAnatomicalBorderCoverageCertified: false;
      candidateOnly: true;
      singleReviewerUnverified: true;
      anatomicalLipBordersValidated: false;
      modelHumanAgreementValidated: false;
      independentAccuracyValidated: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>;
export function compareLipClassWidthsToHumanBorders(
  model: unknown,
  human: unknown,
): LipModelHumanWidthComparison;
