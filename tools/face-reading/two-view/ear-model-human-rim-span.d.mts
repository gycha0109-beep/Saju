export const EAR_MODEL_HUMAN_SPAN_VERSION: 'engineering.ear-mask-human-rim-span@0.1.0';
export interface EarModelHumanSpanSide {
  readonly imageSide: 'imageLeft' | 'imageRight';
  readonly drawnOuterRimXSpanToImageWidth: number;
  readonly drawnOuterRimYSpanToImageHeight: number;
  readonly modelRegionXSpanToImageWidth: number;
  readonly modelRegionYSpanToImageHeight: number;
  readonly signedDrawnMinusModelXSpan: number;
  readonly signedDrawnMinusModelYSpan: number;
  readonly drawingCoverageCertified: false;
}
export type EarModelHumanSpanComparison =
  | Readonly<{
      methodVersion: typeof EAR_MODEL_HUMAN_SPAN_VERSION;
      status: 'unavailable';
      reason: string;
      candidateOnly: true;
      singleReviewerUnverified: true;
      modelHumanAgreementValidated: false;
      anatomicalOuterRimValidated: false;
      independentAccuracyValidated: false;
      anatomicalLateralityAssigned: false;
      earProjectionMeasured: false;
      earThicknessMeasured: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>
  | Readonly<{
      methodVersion: typeof EAR_MODEL_HUMAN_SPAN_VERSION;
      status: 'available';
      sides: readonly EarModelHumanSpanSide[];
      candidateOnly: true;
      singleReviewerUnverified: true;
      modelHumanAgreementValidated: false;
      anatomicalOuterRimValidated: false;
      independentAccuracyValidated: false;
      anatomicalLateralityAssigned: false;
      earProjectionMeasured: false;
      earThicknessMeasured: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>;
export function compareEarMaskToHumanOuterRim(
  model: unknown,
  human: unknown,
): EarModelHumanSpanComparison;
