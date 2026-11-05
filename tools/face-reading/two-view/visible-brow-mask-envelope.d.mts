export interface BrowEnvelopeSide {
  readonly imageSide: 'left' | 'right';
  readonly apparentMaskThicknessToLongSpan: number;
  readonly visibleMaskAreaToImageArea: number;
}
export type BrowEnvelopeResult =
  | Readonly<{
      methodVersion: string;
      source: string;
      status: 'unavailable';
      reason: string;
      candidateOnly: true;
      individualHairThicknessMeasured: false;
      hairDensityMeasured: false;
      anatomicalLateralityAssigned: false;
      accuracyValidated: false;
      traditionalBindingAuthorized: false;
    }>
  | Readonly<{
      methodVersion: string;
      source: string;
      status: 'available';
      brows: readonly BrowEnvelopeSide[];
      candidateOnly: true;
      individualHairThicknessMeasured: false;
      hairDensityMeasured: false;
      anatomicalLateralityAssigned: false;
      accuracyValidated: false;
      traditionalBindingAuthorized: false;
    }>;
export declare const VISIBLE_BROW_MASK_ENVELOPE_VERSION: 'engineering.visible-brow-mask-envelope@0.1.0';
export declare function eyebrowBinaryFromOverlayRGBA(
  rgba: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
): Uint8Array;
export declare function measureVisibleBrowMaskEnvelope(
  mask: Uint8Array,
  width: number,
  height: number,
  dimensions?: { readonly imageWidth?: number; readonly imageHeight?: number },
): BrowEnvelopeResult;
