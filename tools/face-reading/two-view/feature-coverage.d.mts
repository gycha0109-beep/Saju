export interface CoverageColumn {
  readonly featureKey: string;
  readonly regionKey: string;
  readonly implementationState: string;
  readonly requiredExtractor: string;
  readonly qualityDependency: string;
}
export interface CoverageCapture {
  readonly captureRef: string;
  readonly viewRole: 'frontal' | 'profile';
  readonly metrics: readonly Record<string, unknown>[];
  readonly parsing?: unknown;
  readonly [extra: string]: unknown;
}
export interface CoverageFeature {
  readonly featureKey: string;
  readonly regionKey: string;
  readonly canonicalCalculatorMaterialized: boolean;
  readonly candidatePhotoCount: number;
  readonly localEvidenceState:
    | 'unavailable_by_current_authority'
    | 'partial_engineering_proxy_only'
    | 'no_local_photo_evidence';
  readonly requiredExtractor: string;
  readonly qualityDependency: string;
  readonly canonicalPhotoMeasurementVerified: false;
  readonly accuracyValidated: false;
  readonly traditionalBindingApplied: false;
  readonly productInterpretationAuthorized: false;
}
export interface CoverageReport {
  readonly schemaVersion: string;
  readonly lifecycle: 'local_research_only';
  readonly totalCaptureCount: number;
  readonly frontalCaptureCount: number;
  readonly profileCaptureCount: number;
  readonly canonicalFeatureCount: number;
  readonly canonicalCalculatorMaterializedCount: number;
  readonly unresolvedCanonicalCount: number;
  readonly featuresWithLocalPhotoProxy: number;
  readonly actualHumanAccuracyVerified: false;
  readonly traditionalBindingApplied: false;
  readonly productionAuthorized: false;
  readonly rawSourcePersistedOrEmitted: false;
  readonly features: readonly CoverageFeature[];
}
export declare const COVERAGE_VERSION: 'local-whole-face-coverage@0.1.0';
export declare function summarizeWholeFaceCoverage(
  columns: readonly CoverageColumn[],
  captures: readonly CoverageCapture[],
): CoverageReport;
