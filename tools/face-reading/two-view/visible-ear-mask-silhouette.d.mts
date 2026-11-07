export const VISIBLE_EAR_MASK_SILHOUETTE_VERSION: 'engineering.visible-ear-mask-silhouette@0.1.0';
export interface VisibleEarRegion {
  readonly imageOrder: number;
  readonly status: 'available' | 'partial';
  readonly reason: string | null;
  readonly visibleMaskWidthToImageWidth: number;
  readonly visibleMaskHeightToImageHeight: number;
  readonly visibleMaskAreaToImageArea: number;
  readonly centerXToImageWidth: number;
  readonly centerYToImageHeight: number;
}
export interface VisibleEarMaskSummary {
  readonly methodVersion: typeof VISIBLE_EAR_MASK_SILHOUETTE_VERSION;
  readonly source: string;
  readonly status: 'available' | 'partial' | 'unavailable';
  readonly reason: string | null;
  readonly regions: readonly VisibleEarRegion[];
  readonly candidateOnly: true;
  readonly anatomicalLateralityAssigned: false;
  readonly helixIdentified: false;
  readonly lobeIdentified: false;
  readonly attachmentIdentified: false;
  readonly projectionMeasured: false;
  readonly thicknessMeasured: false;
  readonly independentAccuracyValidated: false;
  readonly traditionalBindingAuthorized: false;
}
export function earBinaryFromOverlayRGBA(
  rgba: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
): Uint8Array;
export function measureVisibleEarMaskSilhouette(
  mask: Uint8Array,
  width: number,
  height: number,
  options?: { imageWidth?: number; imageHeight?: number },
): VisibleEarMaskSummary;
