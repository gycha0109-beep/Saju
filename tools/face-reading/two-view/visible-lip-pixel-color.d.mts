export const VISIBLE_LIP_PIXEL_COLOR_VERSION: 'engineering.visible-lip-pixel-color@0.1.0';
export type PixelLipColorPart =
  | Readonly<{
      status: 'available' | 'partial';
      meanEncodedSrgbChannels: readonly [number, number, number];
      imagePixelsSampled: number;
      interiorClassPixelsConsidered: number;
      extremeChannelPixelFraction: number;
      encodedSrgbOnly: true;
    }>
  | Readonly<{ status: 'unavailable'; reason: string }>;
export interface VisibleLipPixelColor {
  readonly methodVersion: typeof VISIBLE_LIP_PIXEL_COLOR_VERSION;
  readonly status: 'available' | 'partial' | 'unavailable';
  readonly reason?: string | null;
  readonly upper?: PixelLipColorPart;
  readonly lower?: PixelLipColorPart;
  readonly candidateOnly: true;
  readonly sourceRgbResampledToParsingSize: true;
  readonly colorCalibrated: false;
  readonly whiteBalanceVerified: false;
  readonly illuminationControlled: false;
  readonly makeupExcluded: false;
  readonly trueAnatomicalLipColorValidated: false;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modelTrainingAuthorized: false;
}
export function measureVisibleLipPixelColor(input: {
  mask: ArrayLike<number>;
  rgba: ArrayLike<number>;
  size: number;
  viewRole: string;
  lipsScreened: boolean;
}): VisibleLipPixelColor;
