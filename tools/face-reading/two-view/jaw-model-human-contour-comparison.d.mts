export const JAW_MODEL_HUMAN_COMPARISON_VERSION: 'engineering.lower-face-oval-vs-human-visible-contour@0.1.0';
export const JAW_MODEL_ENVELOPE_VERSION: 'engineering.pinned-oval-lower-envelope@0.1.0';
interface CandidateFlags {
  readonly candidateOnly: true;
  readonly anatomicalJawValidated: false;
  readonly boneShapeInferred: false;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
}
export type ModelJawEnvelope =
  | (CandidateFlags &
      Readonly<{
        methodVersion: typeof JAW_MODEL_ENVELOPE_VERSION;
        status: 'unavailable';
        reason: string;
      }>)
  | (CandidateFlags &
      Readonly<{
        methodVersion: typeof JAW_MODEL_ENVELOPE_VERSION;
        status: 'available';
        source: 'pinned_face_landmarker_face_oval';
        coordinateFrame: 'normalized_original_image_screen_plane';
        points: readonly (readonly [number, number])[];
        sampledOnlyNotRawLandmarks: true;
      }>);
export type JawHumanComparison =
  | (CandidateFlags &
      Readonly<{
        methodVersion: typeof JAW_MODEL_HUMAN_COMPARISON_VERSION;
        status: 'unavailable';
        reason: string;
      }>)
  | (CandidateFlags &
      Readonly<{
        methodVersion: typeof JAW_MODEL_HUMAN_COMPARISON_VERSION;
        status: 'available' | 'partial';
        comparedSampleCount: number;
        totalModelSampleCount: 5;
        signedMeanHumanMinusModelToImageHeight: number;
        meanAbsoluteOffsetToImageHeight: number;
        maximumAbsoluteOffsetToImageHeight: number;
        humanFullModelCoverageConfirmed: boolean;
      }>);
export function sampleModelLowerOvalEnvelope(input: {
  landmarks: Array<{ x: number; y: number }>;
  topology: {
    oval: Array<{ start: number; end: number }>;
    mouth: Array<{ start: number; end: number }>;
  };
  width: number;
  height: number;
  viewRole: 'frontal' | 'profile';
}): ModelJawEnvelope;
export function compareModelJawEnvelopeWithHumanContour(
  model: unknown,
  human: unknown,
): JawHumanComparison;
