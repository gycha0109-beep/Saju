export const FOREHEAD_SKIN_BAND_VERSION: 'engineering.visible-forehead-skin-band@0.1.0';
interface ForeheadAuthority {
  readonly candidateOnly: true;
  readonly independentAccuracyValidated: false;
  readonly anatomicalForeheadBoundaryValidated: false;
  readonly anatomicalHairlineAuthorized: false;
  readonly hiddenForeheadCompleted: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
}
interface Sector {
  readonly visibleModelSkinFraction: number;
  readonly modelHairFraction: number;
  readonly unknownOtherFraction: number;
  readonly modelSkinPresent: boolean;
}
type Contact =
  | Readonly<{ status: 'unavailable' | 'partial'; reason: string }>
  | Readonly<{
      status: 'available';
      contact: 'model_hair_skin_boundary_candidate';
      visibleSkinContactYToOriginalImageHeight: number;
    }>;
export type ForeheadSkinBand =
  | (ForeheadAuthority &
      Readonly<{
        methodVersion: typeof FOREHEAD_SKIN_BAND_VERSION;
        source: string;
        status: 'unavailable';
        reason: string;
      }>)
  | (ForeheadAuthority &
      Readonly<{
        methodVersion: typeof FOREHEAD_SKIN_BAND_VERSION;
        source: string;
        status: 'available' | 'partial';
        reason: string | null;
        sampledHorizontalFractions: readonly number[];
        sectors: readonly Sector[];
        modelContacts: readonly Contact[];
        maskCropFrameOnly: true;
      }>);
export function measureVisibleForeheadSkinBand(input: {
  mask: ArrayLike<number>;
  size: number;
  landmarks: readonly { x: number; y: number }[];
  topology: {
    browA: readonly { start: number; end: number }[];
    browB: readonly { start: number; end: number }[];
    oval: readonly { start: number; end: number }[];
  };
  frame: { left: number; top: number; side: number };
  imageWidth: number;
  imageHeight: number;
  viewRole: 'frontal' | 'profile';
  browsAligned: boolean;
}): ForeheadSkinBand;
