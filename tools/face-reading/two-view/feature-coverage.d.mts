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

export interface SourceTraceAuthority {
  readonly featureKey: string;
  readonly regionKey: string;
  readonly observationClass: string;
  readonly readiness: string;
  readonly note: string;
  readonly reusableRefs: readonly string[];
  readonly traditionalBindingIssued: false;
  readonly specialDepthHardwareRequired: false;
  readonly metric3DRequired: false;
}
export interface SourceTraceColumn extends CoverageColumn {
  readonly sourcePrimitives: readonly string[];
}
export interface SourceTraceFeature {
  readonly featureKey: string;
  readonly regionKey: string;
  readonly requiredObservation: string;
  readonly observationClass: string;
  readonly captureRequirement: string;
  readonly visibilityAndQualityRequirement: string;
  readonly calculatorState: string;
  readonly canonicalCalculatorMaterialized: boolean;
  readonly implementationSourcePaths: readonly string[];
  readonly requiredExtractor: string;
  readonly localEngineeringProxySources: readonly string[];
  readonly localPhotoProxyCount: number;
  readonly photoEvidenceState: 'unavailable' | 'candidate_only' | 'calculation_only' | 'not_observed';
  readonly canonicalPhotoMeasurementVerified: false;
  readonly traditionalSourcePredicateMapped: false;
  readonly traditionalBindingIssued: false;
  readonly interpretationAuthorized: false;
  readonly independentAccuracyState: 'not_evaluated';
  readonly nextMissingEvidence: string;
}
export interface SourceTraceReport {
  readonly schemaVersion: typeof SOURCE_TRACE_VERSION;
  readonly canonicalFeatureCount: number;
  readonly calculatedOnlyOrUnverifiedCount: number;
  readonly featuresWithLocalEngineeringProxy: number;
  readonly sourcePredicateMappingsAdmitted: 0;
  readonly privacy: 'repository_source_paths_and_aggregate_counts_only';
  readonly features: readonly SourceTraceFeature[];
}
export declare const SOURCE_TRACE_VERSION: 'local-whole-face-source-trace@0.1.0';
export declare function traceWholeFaceSourceGaps(
  columns: readonly SourceTraceColumn[],
  authorityEntries: readonly SourceTraceAuthority[],
  captures: readonly CoverageCapture[],
): SourceTraceReport;

export interface ExtensionTraceFeature {
  readonly requirement: string;
  readonly existingCanonicalFeatureKeys: readonly string[];
  readonly mappingReference: string;
  readonly initialObservationRoute: string;
  readonly missingObservationEvidence: string;
  readonly studyTechniqueFromSpecification: string;
  readonly requiredIndependentEvidence: string;
  readonly authorityState: 'extension_candidate_not_admitted';
  readonly independentAccuracyState: 'not_evaluated';
  readonly traditionalBindingIssued: false;
  readonly productInterpretationAuthorized: false;
}
export interface ExtensionTraceReport {
  readonly schemaVersion: 'local-whole-face-extension-trace@0.1.0';
  readonly extensionRequirementCount: number;
  readonly canonicalKeyCountUnchanged: number;
  readonly sourceDocument: 'research/face-reading/whole-face-feature-mapping-20261105.md';
  readonly allExtensionsUnapproved: true;
  readonly features: readonly ExtensionTraceFeature[];
}
export declare function traceWholeFaceExtensionRequirements(
  sourceMarkdown: string,
  canonicalFeatureKeys: readonly string[],
): ExtensionTraceReport;
