export type VisibleLipClassProfile =
  | Readonly<{
      methodVersion: string;
      status: 'unavailable';
      reason: string;
      source: string;
      candidateOnly: true;
      actualAnatomicalLipBorderValidated: false;
      accuracyValidated: false;
      traditionalBindingAuthorized: false;
    }>
  | Readonly<{
      methodVersion: string;
      status: 'available';
      source: string;
      upperClassXMinToImageWidth: number;
      upperClassXMaxToImageWidth: number;
      upperClassTopToImageHeight: number;
      lowerClassXMinToImageWidth: number;
      lowerClassXMaxToImageWidth: number;
      lowerClassBottomToImageHeight: number;
      upperToLowerVisibleClassAreaRatio: number;
      upperVisibleWidthToCombinedXSpan: number;
      lowerVisibleWidthToCombinedXSpan: number;
      upperVisibleHeightToCombinedXSpan: number;
      lowerVisibleHeightToCombinedXSpan: number;
      centreYSeparationToCombinedXSpan: number;
      lowerVsUpperCentreXOffsetToCombinedXSpan: number;
      candidateOnly: true;
      actualAnatomicalLipBorderValidated: false;
      accuracyValidated: false;
      traditionalBindingAuthorized: false;
    }>;
export declare const VISIBLE_LIP_CLASS_PROFILE_VERSION: 'engineering.visible-upper-lower-lip-class@0.1.0';
export declare function measureVisibleLipClassProfile(
  mask: Uint8Array,
  size: number,
  imageDimensions?: { readonly imageWidth?: number; readonly imageHeight?: number },
): VisibleLipClassProfile;
