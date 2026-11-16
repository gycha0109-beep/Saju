export const BROW_PIXEL_TEXTURE_VERSION: 'engineering.visible-brow-pixel-texture@0.1.0';
type Side =
  | Readonly<{
      status: 'available' | 'partial';
      horizontalMeanAbsoluteSrgbBrightnessChange: number;
      verticalMeanAbsoluteSrgbBrightnessChange: number;
      validImagePixelPairs: number;
      interiorModelMaskPixelsConsidered: number;
      originalImageNeighborDistancePx: 1;
      localTextureOnly: true;
    }>
  | Readonly<{ status: 'unavailable'; reason: string }>;
export type BrowPixelTexture = Readonly<{
  methodVersion: typeof BROW_PIXEL_TEXTURE_VERSION;
  status: 'available' | 'partial' | 'unavailable';
  reason?: string | null;
  imageLeft?: Side;
  imageRight?: Side;
  candidateOnly: true;
  screenedModelMaskOnly: true;
  individualHairFibresIdentified: false;
  individualHairWidthMeasured: false;
  hairDensityMeasured: false;
  independentAccuracyValidated: false;
  canonicalF0Admitted: false;
  traditionalBindingAuthorized: false;
  productInterpretationAuthorized: false;
  modelTrainingAuthorized: false;
}>;
export function measureVisibleBrowPixelTexture(input: {
  mask: ArrayLike<number>;
  width: number;
  height: number;
  rgba: ArrayLike<number>;
  imageWidth: number;
  imageHeight: number;
  viewRole?: 'frontal' | 'profile';
  browsScreened?: boolean;
}): BrowPixelTexture;
