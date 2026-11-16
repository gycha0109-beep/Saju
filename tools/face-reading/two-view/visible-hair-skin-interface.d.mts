export const VISIBLE_HAIR_SKIN_INTERFACE_VERSION: 'engineering.hair-skin-visible-contact@0.1.0';
export interface HairSkinContactSegment {
  readonly startXToImageWidth: number;
  readonly endXToImageWidth: number;
  readonly minContactYToImageHeight: number;
  readonly maxContactYToImageHeight: number;
  readonly meanContactYToImageHeight: number;
  readonly visibleColumns: number;
}
export interface HairSkinContactSummary {
  readonly methodVersion: typeof VISIBLE_HAIR_SKIN_INTERFACE_VERSION;
  readonly status: 'available' | 'partial' | 'unavailable';
  readonly reason: string | null;
  readonly visibleColumns: number;
  readonly coverageFractionOfImageWidth: number;
  readonly segments: readonly HairSkinContactSegment[];
  readonly source: 'existing_pinned_hair_skin_contact_overlay';
  readonly candidateOnly: true;
  readonly anatomicalHairlineAuthorized: false;
  readonly foreheadHeightMeasured: false;
  readonly validatedHumanAccuracy: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalF1BindingAuthorized: false;
}
export function interfaceBinaryFromOverlayRGBA(
  rgba: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
): Uint8Array;
export function measureVisibleHairSkinInterface(
  binary: Uint8Array,
  width: number,
  height: number,
): HairSkinContactSummary;

export function toExistingHairlineBoundaryCandidate(
  mask: Uint8Array,
  width: number,
  height: number,
  imageWidth: number,
  imageHeight: number,
): {
  readonly candidateBoundaryExposed: boolean;
  readonly boundaryPoints: readonly (readonly number[])[];
  readonly engineeringPreviewState: 'visible_interface_candidate' | 'withheld';
  readonly automaticAdmissionAuthorized: false;
  readonly neutralRuntimeHairlineObservationAuthorized: false;
};
