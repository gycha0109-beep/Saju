export interface VisibleNoseMaskSection {
  readonly visibleMaskWidthToBoundingXSpan: number;
  readonly imagePlaneCentreOffsetToBoundingXSpan: number;
}
export type VisibleNoseMaskProfile =
  | Readonly<{
      methodVersion: string;
      source: string;
      status: 'unavailable';
      reason: string;
      candidateOnly: true;
      anatomicalNoseSubregionsObserved: false;
      accuracyValidated: false;
      traditionalBindingAuthorized: false;
    }>
  | Readonly<{
      methodVersion: string;
      source: string;
      status: 'available';
      sections: Readonly<{
        upper: Readonly<VisibleNoseMaskSection>;
        middle: Readonly<VisibleNoseMaskSection>;
        lower: Readonly<VisibleNoseMaskSection>;
      }>;
      lowerVsUpperImagePlaneCentreShiftToBoundingXSpan: number;
      apparentMaskXSpanToYSpan: number;
      candidateOnly: true;
      anatomicalNoseSubregionsObserved: false;
      accuracyValidated: false;
      traditionalBindingAuthorized: false;
    }>;
export declare const VISIBLE_NOSE_MASK_PROFILE_VERSION:
  'engineering.visible-nose-mask-width-profile@0.1.0';
export declare function noseBinaryFromOverlayRGBA(
  rgba: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
): Uint8Array;
export declare function measureVisibleNoseMaskProfile(
  mask: Uint8Array,
  width: number,
  height: number,
  dimensions?: { readonly imageWidth?: number; readonly imageHeight?: number },
): VisibleNoseMaskProfile;
