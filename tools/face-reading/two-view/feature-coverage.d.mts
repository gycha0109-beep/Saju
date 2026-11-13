export type EyeFoldReviewState =
  'visible' | 'hooded' | 'no_visible_crease' | 'partial' | 'occluded' | 'out_of_frame' | 'unknown';

export interface HumanReviewLabelCounts {
  readonly imageLeft: Readonly<Record<EyeFoldReviewState, number>>;
  readonly imageRight: Readonly<Record<EyeFoldReviewState, number>>;
}

export interface CoverageHumanReview {
  readonly captureRef: string;
  readonly imageLeft: EyeFoldReviewState;
  readonly imageRight: EyeFoldReviewState;
  readonly humanReviewed: true;
  readonly independentAccuracyValidated: false;
  readonly modelTrainingAuthorized: false;
}

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
  readonly humanReviewPhotoCount: number;
  readonly humanReviewState: 'not_started' | 'single_reviewer_unverified';
  readonly humanReviewLabelCounts: HumanReviewLabelCounts;
  readonly humanReviewAccuracyValidated: false;
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
  readonly humanReviewedCaptureCount: number;
  readonly humanReviewFeatureCount: number;
  readonly humanReviewAccuracyValidated: false;
  readonly actualHumanAccuracyVerified: false;
  readonly traditionalBindingApplied: false;
  readonly productionAuthorized: false;
  readonly rawSourcePersistedOrEmitted: false;
  readonly features: readonly CoverageFeature[];
}
export declare const COVERAGE_VERSION: 'local-whole-face-coverage@0.2.0';
export function summarizeWholeFaceCoverage(
  columns: readonly CoverageColumn[],
  captures: readonly CoverageCapture[],
  humanReviews?: readonly CoverageHumanReview[],
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
  readonly photoEvidenceState:
    'unavailable' | 'candidate_only' | 'calculation_only' | 'not_observed';
  readonly localHumanReviewCount: number;
  readonly humanReviewState: 'not_started' | 'single_reviewer_unverified';
  readonly humanReviewLabelCounts: HumanReviewLabelCounts;
  readonly humanReviewAccuracyValidated: false;
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
  readonly humanReviewedCaptureCount: number;
  readonly humanReviewFeatureCount: number;
  readonly humanReviewAccuracyValidated: false;
  readonly sourcePredicateMappingsAdmitted: 0;
  readonly privacy: 'repository_source_paths_and_aggregate_counts_only';
  readonly features: readonly SourceTraceFeature[];
}
export declare const SOURCE_TRACE_VERSION: 'local-whole-face-source-trace@0.2.0';
export function traceWholeFaceSourceGaps(
  columns: readonly SourceTraceColumn[],
  authorityEntries: readonly SourceTraceAuthority[],
  captures: readonly CoverageCapture[],
  humanReviews?: readonly CoverageHumanReview[],
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

export declare const PER_CAPTURE_READINESS_VERSION: 'local-whole-face-per-capture-readiness@0.1.0';
export interface PerCaptureReadinessFeature {
  readonly featureKey: string;
  readonly regionKey: string;
  readonly state:
    | 'not_evaluated'
    | 'calculation_only'
    | 'candidate_only'
    | 'partial'
    | 'observed'
    | 'unavailable';
  readonly reason: string;
  readonly canonicalCalculatorMaterialized: boolean;
  readonly engineeringProxyMatched: boolean;
  readonly singleReviewerLabelPresent: boolean;
  readonly independentHumanGroundTruthPresent: false;
  readonly canonicalObservationAdmitted: false;
  readonly traditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
}
export interface PerCaptureReadinessReport {
  readonly schemaVersion: typeof PER_CAPTURE_READINESS_VERSION;
  readonly lifecycle: 'private_local_research_only';
  readonly photoCount: number;
  readonly canonicalFeatureCount: number;
  readonly canonicalCalculatorCount: number;
  readonly canonicalHardGapCount: number;
  readonly statusCounts: Readonly<Record<PerCaptureReadinessFeature['state'], number>>;
  readonly independentAccuracyValidated: false;
  readonly admittedCanonicalMeasurements: 0;
  readonly traditionalBindingAuthorized: false;
  readonly productionAuthorized: false;
  readonly containsRawBiometricMeasurements: false;
  readonly captures: readonly {
    readonly captureRef: string;
    readonly viewRole: 'frontal' | 'profile';
    readonly hasPersistedExecutionEvidence: boolean;
    readonly canonicalFeatureCount: number;
    readonly features: readonly PerCaptureReadinessFeature[];
  }[];
}
export function traceWholeFacePerCaptureReadiness(
  columns: readonly CoverageColumn[],
  captures: readonly CoverageCapture[],
  humanReviews?: readonly CoverageHumanReview[],
): PerCaptureReadinessReport;

export declare const WHOLE_FACE_READINESS_ROLLUP_VERSION:
  'local-whole-face-feature-readiness-rollup@0.1.0';

export interface WholeFacePerFeatureReadinessFeature {
  readonly featureKey: string;
  readonly statusCounts: Readonly<Record<PerCaptureReadinessFeature['state'], number>>;
  readonly reasonCounts: Readonly<Record<string, number>>;
}
export interface WholeFacePerFeatureReadinessReport {
  readonly schemaVersion: typeof WHOLE_FACE_READINESS_ROLLUP_VERSION;
  readonly lifecycle: 'local_research_only';
  readonly photoCount: number;
  readonly canonicalFeatureCount: number;
  readonly canonicalCalculatorCount: number;
  readonly canonicalHardGapCount: number;
  readonly statusCounts: Readonly<Record<PerCaptureReadinessFeature['state'], number>>;
  readonly independentAccuracyValidated: false;
  readonly traditionalBindingAuthorized: false;
  readonly productionAuthorized: false;
  readonly sourcePhotoOrCaptureRefsEmitted: false;
  readonly features: readonly WholeFacePerFeatureReadinessFeature[];
}
export declare function summarizeWholeFacePerFeatureReadiness(
  columns: readonly CoverageColumn[],
  captures: readonly CoverageCapture[],
  humanReviews?: readonly CoverageHumanReview[],
): WholeFacePerFeatureReadinessReport;
