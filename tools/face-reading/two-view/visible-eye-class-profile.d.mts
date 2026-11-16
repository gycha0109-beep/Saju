export const EYE_CLASS_PROFILE_VERSION: 'engineering.visible-eye-classes@0.1.0';
export type EyeClassProfile =
  | Readonly<{
      methodVersion: typeof EYE_CLASS_PROFILE_VERSION;
      status: 'unavailable';
      reason: string;
      candidateOnly: true;
      actualEyelidValidated: false;
      traditionalBindingAuthorized: false;
    }>
  | Readonly<{
      methodVersion: typeof EYE_CLASS_PROFILE_VERSION;
      status: 'available';
      source: 'pinned_parser_classes_4_5';
      imageLeftXMinToImageWidth: number;
      imageLeftXMaxToImageWidth: number;
      imageLeftTopToImageHeight: number;
      imageRightXMinToImageWidth: number;
      imageRightXMaxToImageWidth: number;
      imageRightTopToImageHeight: number;
      imageLeftHeightToWidth: number;
      imageRightHeightToWidth: number;
      imageLeftToRightWidthRatio: number;
      imageLeftToRightClassAreaRatio: number;
      centreSpacingToMeanWidth: number;
      imageRightVsLeftCentreHeightToMeanWidth: number;
      candidateOnly: true;
      actualEyelidValidated: false;
      anatomicalLateralityAuthorized: false;
      traditionalBindingAuthorized: false;
      accuracyValidated: false;
    }>;
export function measureVisibleEyeClassProfile(
  mask: ArrayLike<number>,
  size: number,
  frame?: { imageWidth?: number; imageHeight?: number },
): EyeClassProfile;
