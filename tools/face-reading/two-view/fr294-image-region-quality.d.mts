export const FR294_REGION_QUALITY_VERSION: 'local-fr294-parsing-region-quality@0.1.0';
export type FR294RegionQualityState =
  | 'screened_region_proxy'
  | 'unscreened_region_proxy'
  | 'unspecific_region_proxy'
  | 'no_region_proxy'
  | 'profile_not_frontal_evidence'
  | 'parsing_unavailable';
export interface FR294RegionQualityEntry {
  readonly featureKey: string;
  readonly channel: string;
  readonly modelRegionScreening: FR294RegionQualityState;
  readonly anatomicalFeatureVisibilityVerified: false;
  readonly independentHumanReferenceValidated: false;
  readonly colorCalibrationValidated: false;
  readonly canonicalF0Admitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
}
export interface FR294RegionQualityReport {
  readonly schemaVersion: typeof FR294_REGION_QUALITY_VERSION;
  readonly captureCount: number;
  readonly mappedFeatureCount: 6;
  readonly modelRegionScreeningOnly: true;
  readonly anatomicalFeatureVisibilityVerified: false;
  readonly colorCalibrationValidated: false;
  readonly independentAccuracyValidated: false;
  readonly canonicalF0Admitted: false;
  readonly productInterpretationAuthorized: false;
  readonly aggregate: Readonly<Record<string, Readonly<Record<FR294RegionQualityState, number>>>>;
  readonly captures: Readonly<Record<string, readonly FR294RegionQualityEntry[]>>;
}
export function traceFr294ImageRegionQuality(
  gaps: unknown,
  captures: readonly { captureRef: string; viewRole: 'frontal' | 'profile' }[],
  parsingRecords: readonly { captureRef: string; parsing: unknown }[],
): FR294RegionQualityReport;
