import {
  assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
} from './five-officers-intake-mouth-semantic-execution-admission-fr122.js';
import {
  issueFaceReadingMasterRegionCoverageSkeletonFR192,
  assertIssuedFaceReadingMasterRegionCoverageSkeletonFR192,
} from './face-reading-master-region-coverage-skeleton-fr192.js';

export const FACE_PRODUCT_SEMANTIC_READINESS_VERSION_FE035A =
  'FE035A-FACE-PRODUCT-SEMANTIC-READINESS-v1' as const;

export type FaceProductSemanticReadinessBlockerFE035A =
  | 'no_production_authorized_traditional_methodology'
  | 'no_authoritative_machine_criterion_state'
  | 'no_structured_claim_authority'
  | 'no_bounded_narrative_authority'
  | 'traditional_region_coverage_not_production_authorized';

export interface FaceProductSemanticReadinessFE035A {
  readonly schemaVersion: 'fe035a-face-product-semantic-readiness-v1';
  readonly contractVersion: typeof FACE_PRODUCT_SEMANTIC_READINESS_VERSION_FE035A;
  readonly status: 'blocked';
  readonly observationRuntimeReady: true;
  readonly semanticRuntimeReady: false;
  readonly interpretationAllowed: false;
  readonly evidence: {
    readonly mouthAdmissionSchemaVersion:
      'fr122-five-officers-intake-mouth-semantic-execution-admission-v1';
    readonly mouthMethodologyReviewStatus: 'research';
    readonly mouthWitnessVerificationStatus: 'scan_checked';
    readonly executableCriterionId: null;
    readonly machineCriterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
    readonly masterRegionContractVersion:
      'FR192-MASTER-REGION-COVERAGE-SKELETON-v1';
    readonly productionAuthorizedTraditionalSystems: 0;
  };
  readonly blockers: readonly FaceProductSemanticReadinessBlockerFE035A[];
  readonly authorityBoundary: {
    readonly issuesTraditionalClaim: false;
    readonly issuesConsumerNarrative: false;
    readonly convertsNeutralMetricToTraditionalMeaning: false;
    readonly inventsThresholdOrCalibration: false;
    readonly ranksTraditionalRegions: false;
    readonly allowsLlmSemanticInference: false;
    readonly widensPreviewEnginePublicExport: false;
  };
  readonly nextFrontier:
    'square_broad_metric_to_source_operationalization_and_calibration_authority';
}

const BLOCKERS = Object.freeze([
  'no_production_authorized_traditional_methodology',
  'no_authoritative_machine_criterion_state',
  'no_structured_claim_authority',
  'no_bounded_narrative_authority',
  'traditional_region_coverage_not_production_authorized',
] as const satisfies readonly FaceProductSemanticReadinessBlockerFE035A[]);

let cached: FaceProductSemanticReadinessFE035A | null = null;

export function assessFaceProductSemanticReadinessFE035A(): FaceProductSemanticReadinessFE035A {
  if (cached !== null) return cached;

  const mouth = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122(mouth);

  const coverage = issueFaceReadingMasterRegionCoverageSkeletonFR192();
  assertIssuedFaceReadingMasterRegionCoverageSkeletonFR192(coverage);

  const productionAuthorizedTraditionalSystems =
    coverage.traditionalMethodologyCoverage.filter(
      (entry) => entry.coverageState === 'existing_governed',
    ).length;

  if (
    mouth.provenance.successorMethodologyReviewStatus !== 'research' ||
    mouth.executableCriterionId !== null ||
    mouth.execution.criterionStatesIssued !== 0 ||
    mouth.execution.structuredClaimsIssued !== 0 ||
    mouth.execution.boundedNarrativesIssued !== 0 ||
    mouth.execution.traditionalSemanticAuthority !== false
  ) {
    throw new Error('fe035a_upstream_semantic_authority_changed_requires_new_review');
  }

  if (productionAuthorizedTraditionalSystems !== 0) {
    throw new Error('fe035a_traditional_methodology_coverage_changed_requires_new_review');
  }

  cached = Object.freeze({
    schemaVersion: 'fe035a-face-product-semantic-readiness-v1' as const,
    contractVersion: FACE_PRODUCT_SEMANTIC_READINESS_VERSION_FE035A,
    status: 'blocked' as const,
    observationRuntimeReady: true as const,
    semanticRuntimeReady: false as const,
    interpretationAllowed: false as const,
    evidence: Object.freeze({
      mouthAdmissionSchemaVersion: mouth.schemaVersion,
      mouthMethodologyReviewStatus: mouth.provenance.successorMethodologyReviewStatus,
      mouthWitnessVerificationStatus: mouth.provenance.witnessQualifiedPassageVerificationStatus,
      executableCriterionId: mouth.executableCriterionId,
      machineCriterionStatesIssued: mouth.execution.criterionStatesIssued,
      structuredClaimsIssued: mouth.execution.structuredClaimsIssued,
      boundedNarrativesIssued: mouth.execution.boundedNarrativesIssued,
      traditionalSemanticAuthority: mouth.execution.traditionalSemanticAuthority,
      masterRegionContractVersion: coverage.contractVersion,
      productionAuthorizedTraditionalSystems,
    }),
    blockers: BLOCKERS,
    authorityBoundary: Object.freeze({
      issuesTraditionalClaim: false as const,
      issuesConsumerNarrative: false as const,
      convertsNeutralMetricToTraditionalMeaning: false as const,
      inventsThresholdOrCalibration: false as const,
      ranksTraditionalRegions: false as const,
      allowsLlmSemanticInference: false as const,
      widensPreviewEnginePublicExport: false as const,
    }),
    nextFrontier: mouth.nextFrontier,
  });

  return cached;
}
