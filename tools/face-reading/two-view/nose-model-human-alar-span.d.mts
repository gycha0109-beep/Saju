export const NOSE_MODEL_HUMAN_SPAN_VERSION: 'engineering.nose-mask-human-alar-span@0.1.0';
export type NoseModelHumanAlarSpan =
  | Readonly<{
      methodVersion: typeof NOSE_MODEL_HUMAN_SPAN_VERSION;
      status: 'unavailable';
      reason: string;
      candidateOnly: true;
      singleReviewerUnverified: true;
      anatomicalAlarBoundaryValidated: false;
      anatomicalNoseSubregionsObserved: false;
      modelHumanAgreementValidated: false;
      independentAccuracyValidated: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>
  | Readonly<{
      methodVersion: typeof NOSE_MODEL_HUMAN_SPAN_VERSION;
      status: 'available';
      drawnOuterAlarXSpanToImageWidth: number;
      modelWholeNoseClassXSpanToImageWidth: number;
      signedDrawnMinusModelXSpan: number;
      humanTipReviewRecorded: boolean;
      humanNostrilContoursRecorded: boolean;
      drawingCoverageCertified: false;
      candidateOnly: true;
      singleReviewerUnverified: true;
      anatomicalAlarBoundaryValidated: false;
      anatomicalNoseSubregionsObserved: false;
      modelHumanAgreementValidated: false;
      independentAccuracyValidated: false;
      canonicalF0Admitted: false;
      traditionalBindingAuthorized: false;
      productInterpretationAuthorized: false;
    }>;
export function compareNoseMaskToHumanAlarSpans(
  model: unknown,
  mask: Uint8Array,
  width: number,
  height: number,
  human: unknown,
): NoseModelHumanAlarSpan;
