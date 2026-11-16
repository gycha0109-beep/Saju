export const HARD_GAP_BRIDGE_VERSION: 'local-fr294-per-photo-gap-bridge@0.1.0';
export type FR294GapLane =
  | 'new_image_model'
  | 'rgb_relative_3d_benchmark'
  | 'ear_visibility_then_image_model'
  | 'remain_unavailable';
export type FR294GapStatus = 'unavailable' | 'candidate_only' | 'partial' | 'not_evaluated';
export interface FR294GapRow {
  readonly featureKey: string;
  readonly lane: FR294GapLane;
  readonly status: FR294GapStatus;
  readonly nextEvidenceRequirement: string;
  readonly canonicalMaterializationAllowedNow: false;
}
export interface FR294GapReadiness {
  readonly schemaVersion: typeof HARD_GAP_BRIDGE_VERSION;
  readonly captureCount: number;
  readonly canonicalHardGapCount: 11;
  readonly laneCount: Readonly<Record<FR294GapLane, number>>;
  readonly statusByLane: Readonly<Record<FR294GapLane, Readonly<Record<FR294GapStatus, number>>>>;
  readonly unresolvedNonFr294UnavailableCount: 0;
  readonly canonicalObservationAdmitted: false;
  readonly independentAccuracyValidated: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly captures: Readonly<Record<string, readonly FR294GapRow[]>>;
}
export function traceFr294PhotoHardGaps(
  source: string,
  photoReadiness: unknown,
  expectedFeatureKeys: readonly string[],
): FR294GapReadiness;
