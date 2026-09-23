import {
  FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT,
  assertProductNeutralObservationContractFE035B,
} from './product-neutral-observation-contract-fe035b.js';
import {
  getSquareBroadFangNeutralCandidateMetricDefinitionsFR142,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import {
  assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
} from './five-officers-square-broad-fang-neutral-candidate-metric-synthetic-verification-fr143.js';
import {
  FE041F_CANDIDATE_METRIC_REFS,
  assertIssuedSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F,
  issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F,
} from './square-broad-fang-mapping-evidence-governance-reuse-review-fe041f.js';
import {
  assertIssuedSquareBroadFangMappingHypothesisProvenanceFE041G,
  issueSquareBroadFangMappingHypothesisProvenanceFE041G,
} from './square-broad-fang-mapping-hypothesis-provenance-fe041g.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE041H_RECORD_ID =
  'research.face_reading.product_neutral_candidate_canonicalization_policy.fe041h' as const;
export const FE041H_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fe041h-neutral-candidate-canonicalization-policy.md' as const;
export const FE041H_PRODUCT_SURFACE_CONTRACT_REF =
  'research.face_reading.product_neutral_candidate_surface_contract.fe041h' as const;
export const FE041H_NEXT_FRONTIER =
  'collect_empirical_repeat_capture_evidence_and_review_candidate_redundancy_before_successor_registry_design' as const;

export const FE041H_CANONICALIZATION_REQUIREMENT_KEYS = Object.freeze([
  'exact_candidate_identity_and_versioned_neutral_definition',
  'closed_neutral_semantic_boundary',
  'deterministic_runtime_and_synthetic_verification',
  'explicit_product_region_unit_presence_and_unavailable_surface_contract',
  'empirical_repeat_capture_and_capture_quality_evidence',
  'duplicate_and_redundancy_review_against_current_registry',
  'successor_contract_version_and_migration_design',
  'explicit_registry_admission_decision_and_end_to_end_provenance',
] as const);

export type FE041HCanonicalizationRequirementKey =
  typeof FE041H_CANONICALIZATION_REQUIREMENT_KEYS[number];

export const FE041H_SATISFIED_REQUIREMENT_KEYS = Object.freeze([
  'exact_candidate_identity_and_versioned_neutral_definition',
  'closed_neutral_semantic_boundary',
  'deterministic_runtime_and_synthetic_verification',
  'explicit_product_region_unit_presence_and_unavailable_surface_contract',
] as const);

export const FE041H_UNSATISFIED_REQUIREMENT_KEYS = Object.freeze([
  'empirical_repeat_capture_and_capture_quality_evidence',
  'duplicate_and_redundancy_review_against_current_registry',
  'successor_contract_version_and_migration_design',
  'explicit_registry_admission_decision_and_end_to_end_provenance',
] as const);

export interface FE041HCanonicalizationRequirementV1 {
  readonly key: FE041HCanonicalizationRequirementKey;
  readonly state:
    | 'satisfied_upstream'
    | 'satisfied_in_fe041h'
    | 'required_not_satisfied';
  readonly requiredBeforeRegistryAdmission: true;
  readonly requirement: string;
  readonly evidenceRef: string | null;
}

export interface FE041HCandidateCanonicalizationAssessmentV1 {
  readonly metricRef: typeof FE041F_CANDIDATE_METRIC_REFS[number];
  readonly metricVersion: '0.1.0';
  readonly sourceSurfaceKey: 'neutral.face.lips_contour_set';
  readonly candidateUnit: 'ratio';
  readonly exactCurrentRegistryIdentityIntersection: false;
  readonly productRegionKey: 'mouth_lips';
  readonly productUnit: 'ratio';
  readonly productPresence: 'required';
  readonly productUnavailableSurfaceRef: null;
  readonly productSurfaceContractRef: typeof FE041H_PRODUCT_SURFACE_CONTRACT_REF;
  readonly productSurfaceContractIssued: true;
  readonly empiricalRepeatCaptureEstablished: false;
  readonly captureQualityAdmissionEvidenceIssued: false;
  readonly duplicateAndRedundancyReviewComplete: false;
  readonly successorContractVersion: null;
  readonly migrationDesignRef: null;
  readonly registryAdmissionDecisionRef: null;
  readonly endToEndAdmissionProvenanceComplete: false;
  readonly canonicalizationAuthorized: false;
}

export interface NeutralCandidateCanonicalizationPolicyFE041HV1 {
  readonly schemaVersion:
    'fe041h-neutral-candidate-canonicalization-policy-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FE041H_RECORD_ID;
  readonly authorityState:
    'neutral_candidate_canonicalization_policy_defined_current_candidates_not_admitted';
  readonly currentRegistry: Readonly<{
    contractVersion: 'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1';
    metricCount: 13;
    mutateV1InPlaceAuthorized: false;
    newNeutralMetricRequiresNewContractVersion: true;
    semanticAuthorityMayBeInferredFromRegistryMembership: false;
  }>;
  readonly policyRequirements:
    readonly FE041HCanonicalizationRequirementV1[];
  readonly policyProgression: Readonly<{
    requirementCount: 8;
    satisfiedRequirementKeys:
      typeof FE041H_SATISFIED_REQUIREMENT_KEYS;
    unsatisfiedRequirementKeys:
      typeof FE041H_UNSATISFIED_REQUIREMENT_KEYS;
    satisfiedRequirementCount: 4;
    unsatisfiedRequirementCount: 4;
  }>;
  readonly candidateAssessments:
    readonly FE041HCandidateCanonicalizationAssessmentV1[];
  readonly exactIdentityReview: Readonly<{
    candidateMetricCount: 3;
    currentCanonicalMetricCount: 13;
    exactIntersectionCount: 0;
    exactIdentityNonOverlapMeansAdmission: false;
    exactIdentityNonOverlapMeansNonRedundant: false;
  }>;
  readonly mappingEvidenceLane: Readonly<{
    fe041gSatisfiedRequirementCount: 3;
    fe041gUnsatisfiedRequirementCount: 7;
    neutralCanonicalizationPolicyChangesMappingEvidenceCount: false;
    mappingRelationIssued: false;
    traditionalFangBindingIssued: false;
  }>;
  readonly authorityBoundary: Readonly<{
    canonicalizationPolicyDefined: true;
    policyDefinitionMeansCandidateAdmission: false;
    structuralAppendValidityMeansGovernedAdmission: false;
    exactIdentityNonOverlapMeansGovernedAdmission: false;
    syntheticVerificationMeansProductStability: false;
    neutralRegistryMembershipMeansTraditionalBinding: false;
    currentRegistryMutationAuthorized: false;
    successorRegistryIssued: false;
    candidateCanonicalizationAuthorized: false;
    mappingRelationIssued: false;
    traditionalFangBindingIssued: false;
    metricDirectionalityIssued: false;
    thresholdIssued: false;
    calibrationIssued: false;
    classificationIssued: false;
    scoreIssued: false;
    rankIssued: false;
    deterministicCriterionStateIssued: false;
    ruleAuthorityIssued: false;
    structuredClaimIssued: false;
    narrativeAuthorityIssued: false;
    productionSemanticExecutionAuthorized: false;
  }>;
  readonly researchNoteRef: typeof FE041H_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FE041H_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FE041H ' + message);
}

function sameStrings(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  return actual.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

function requirement(
  key: FE041HCanonicalizationRequirementKey,
  state:
    | 'satisfied_upstream'
    | 'satisfied_in_fe041h'
    | 'required_not_satisfied',
  requirementText: string,
  evidenceRef: string | null,
): FE041HCanonicalizationRequirementV1 {
  return Object.freeze({
    key,
    state,
    requiredBeforeRegistryAdmission: true as const,
    requirement: requirementText,
    evidenceRef,
  });
}

export const FE041H_CANONICALIZATION_REQUIREMENTS:
readonly FE041HCanonicalizationRequirementV1[] = Object.freeze([
  requirement(
    'exact_candidate_identity_and_versioned_neutral_definition',
    'satisfied_upstream',
    'Each candidate must have an immutable metricRef, explicit version, neutral source surface, unit, formula, and implementation identity.',
    'research.face_reading.shenxiang.five_officers.square_broad_fang_neutral_candidate_metric_runtime.fr142',
  ),
  requirement(
    'closed_neutral_semantic_boundary',
    'satisfied_upstream',
    'The candidate definition and runtime must explicitly deny traditional binding, threshold, calibration, classification, and criterion-state authority.',
    'research.face_reading.shenxiang.five_officers.square_broad_fang_neutral_candidate_metric_runtime.fr142',
  ),
  requirement(
    'deterministic_runtime_and_synthetic_verification',
    'satisfied_upstream',
    'The exact candidate runtime must be deterministic under governed synthetic verification while synthetic evidence remains non-empirical.',
    'research.face_reading.shenxiang.five_officers.square_broad_fang_neutral_candidate_metric_synthetic_verification.fr143',
  ),
  requirement(
    'explicit_product_region_unit_presence_and_unavailable_surface_contract',
    'satisfied_in_fe041h',
    'The FE041H candidate product-surface contract assigns all three FR142 metrics to mouth_lips, preserves ratio units, requires them whenever the exact FR79 lips-contour source is admitted, and uses no conditional unavailable-surface reference.',
    FE041H_PRODUCT_SURFACE_CONTRACT_REF,
  ),
  requirement(
    'empirical_repeat_capture_and_capture_quality_evidence',
    'required_not_satisfied',
    'Product canonicalization requires governed empirical repeat-capture and capture-quality evidence appropriate to the metric surface; synthetic repeatability is insufficient.',
    null,
  ),
  requirement(
    'duplicate_and_redundancy_review_against_current_registry',
    'required_not_satisfied',
    'Exact metricRef non-overlap is insufficient; a governed review must establish that the candidate is not an accidental duplicate or redundant product surface relative to the current registry.',
    null,
  ),
  requirement(
    'successor_contract_version_and_migration_design',
    'required_not_satisfied',
    'Because FE035B v1 is immutable, admission requires an explicit successor contract version and compatibility/migration design rather than in-place mutation.',
    null,
  ),
  requirement(
    'explicit_registry_admission_decision_and_end_to_end_provenance',
    'required_not_satisfied',
    'A governed admission decision must bind the candidate evidence, product contract, successor version, and exact provenance before registry membership is issued.',
    null,
  ),
]);

function validateUpstream(): void {
  assertProductNeutralObservationContractFE035B(
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT,
  );
  if (
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.metrics.length !== 13 ||
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.evolutionPolicy
      .mutateV1InPlace !== false ||
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.evolutionPolicy
      .newNeutralMetricRequiresNewContractVersion !== true ||
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.evolutionPolicy
      .semanticAuthorityMayBeInferredFromRegistryMembership !== false
  ) {
    fail('FE035B evolution policy drift.');
  }

  const fe041f =
    issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F();
  assertIssuedSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F(
    fe041f,
  );
  if (
    fe041f.neutralCanonicalizationLane.currentCanonicalRegistryMetricCount !==
      13 ||
    fe041f.neutralCanonicalizationLane
      .candidateCanonicalIntersectionCount !== 0 ||
    fe041f.neutralCanonicalizationLane
      .mutateCurrentRegistryInPlaceAuthorized !== false ||
    fe041f.neutralCanonicalizationLane
      .newNeutralMetricRequiresNewContractVersion !== true ||
    fe041f.neutralCanonicalizationLane
      .candidateCanonicalizationPolicyDefined !== false ||
    fe041f.neutralCanonicalizationLane
      .candidateCanonicalizationAuthorized !== false ||
    fe041f.neutralCanonicalizationLane.successorRegistryIssued !== false
  ) {
    fail('FE041F canonicalization-lane boundary drift.');
  }

  const fe041g =
    issueSquareBroadFangMappingHypothesisProvenanceFE041G();
  assertIssuedSquareBroadFangMappingHypothesisProvenanceFE041G(fe041g);
  if (
    fe041g.evidenceProgression.satisfiedRequirementCount !== 3 ||
    fe041g.evidenceProgression.unsatisfiedRequirementCount !== 7 ||
    fe041g.authorityBoundary.mappingRelationIssued !== false ||
    fe041g.authorityBoundary.traditionalFangBindingIssued !== false ||
    fe041g.neutralCanonicalizationLane
      .candidateCanonicalizationAuthorized !== false
  ) {
    fail('FE041G mapping/canonicalization separation drift.');
  }

  const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
  if (
    definitions.length !== 3 ||
    !sameStrings(
      definitions.map((entry) => entry.metricRef),
      FE041F_CANDIDATE_METRIC_REFS,
    ) ||
    definitions.some(
      (entry) =>
        entry.metricVersion !== '0.1.0' ||
        entry.sourceSurfaceKey !== 'neutral.face.lips_contour_set' ||
        entry.unit !== 'ratio' ||
        entry.traditionalCriterionBindingRef !== null ||
        entry.calibrationRef !== null ||
        entry.numericClassificationThreshold !== null,
    )
  ) {
    fail('FR142 candidate definition drift.');
  }

  const fr143 =
    assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143(
    fr143,
  );
  if (
    fr143.syntheticRelations.deterministicRepeatabilityObserved !== true ||
    fr143.evidenceBoundary
      .syntheticRepeatabilityMeansEmpiricalCaptureRepeatability !== false ||
    fr143.evidenceBoundary.syntheticDiscriminationMeansConstructValidity !==
      false ||
    fr143.execution.empiricalCaptureRecordsIssued !== 0 ||
    fr143.execution.humanSemanticLabelsIssued !== 0
  ) {
    fail('FR143 synthetic verification boundary drift.');
  }
}

function buildCandidateAssessments():
readonly FE041HCandidateCanonicalizationAssessmentV1[] {
  const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
  const canonicalRefs = new Set(
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.metrics.map(
      (entry) => entry.metricRef,
    ),
  );
  return Object.freeze(definitions.map((definition) => {
    if (canonicalRefs.has(definition.metricRef)) {
      fail('candidate unexpectedly already exists in FE035B registry.');
    }
    return Object.freeze({
      metricRef:
        definition.metricRef as typeof FE041F_CANDIDATE_METRIC_REFS[number],
      metricVersion: '0.1.0' as const,
      sourceSurfaceKey: 'neutral.face.lips_contour_set' as const,
      candidateUnit: 'ratio' as const,
      exactCurrentRegistryIdentityIntersection: false as const,
      productRegionKey: 'mouth_lips' as const,
      productUnit: 'ratio' as const,
      productPresence: 'required' as const,
      productUnavailableSurfaceRef: null,
      productSurfaceContractRef: FE041H_PRODUCT_SURFACE_CONTRACT_REF,
      productSurfaceContractIssued: true as const,
      empiricalRepeatCaptureEstablished: false as const,
      captureQualityAdmissionEvidenceIssued: false as const,
      duplicateAndRedundancyReviewComplete: false as const,
      successorContractVersion: null,
      migrationDesignRef: null,
      registryAdmissionDecisionRef: null,
      endToEndAdmissionProvenanceComplete: false as const,
      canonicalizationAuthorized: false as const,
    });
  }));
}

export function issueNeutralCandidateCanonicalizationPolicyFE041H():
NeutralCandidateCanonicalizationPolicyFE041HV1 {
  validateUpstream();

  if (
    FE041H_CANONICALIZATION_REQUIREMENTS.length !== 8 ||
    !sameStrings(
      FE041H_CANONICALIZATION_REQUIREMENTS.map((entry) => entry.key),
      FE041H_CANONICALIZATION_REQUIREMENT_KEYS,
    ) ||
    !sameStrings(
      FE041H_CANONICALIZATION_REQUIREMENTS
        .filter((entry) => entry.state !== 'required_not_satisfied')
        .map((entry) => entry.key),
      FE041H_SATISFIED_REQUIREMENT_KEYS,
    ) ||
    !sameStrings(
      FE041H_CANONICALIZATION_REQUIREMENTS
        .filter((entry) => entry.state === 'required_not_satisfied')
        .map((entry) => entry.key),
      FE041H_UNSATISFIED_REQUIREMENT_KEYS,
    )
  ) {
    fail('canonicalization requirement policy drift.');
  }

  const candidateAssessments = buildCandidateAssessments();
  if (
    candidateAssessments.length !== 3 ||
    candidateAssessments.some(
      (entry) =>
        entry.productRegionKey !== 'mouth_lips' ||
        entry.candidateUnit !== 'ratio' ||
        entry.productUnit !== 'ratio' ||
        entry.productPresence !== 'required' ||
        entry.productUnavailableSurfaceRef !== null ||
        entry.productSurfaceContractRef !== FE041H_PRODUCT_SURFACE_CONTRACT_REF ||
        entry.productSurfaceContractIssued !== true ||
        entry.empiricalRepeatCaptureEstablished !== false ||
        entry.duplicateAndRedundancyReviewComplete !== false ||
        entry.successorContractVersion !== null ||
        entry.registryAdmissionDecisionRef !== null ||
        entry.canonicalizationAuthorized !== false,
    )
  ) {
    fail('candidate assessment unexpectedly widened.');
  }

  const result: NeutralCandidateCanonicalizationPolicyFE041HV1 =
    Object.freeze({
      schemaVersion:
        'fe041h-neutral-candidate-canonicalization-policy-v1' as const,
      artifactVersion: '0.1.0' as const,
      recordId: FE041H_RECORD_ID,
      authorityState:
        'neutral_candidate_canonicalization_policy_defined_current_candidates_not_admitted' as const,
      currentRegistry: Object.freeze({
        contractVersion:
          'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1' as const,
        metricCount: 13 as const,
        mutateV1InPlaceAuthorized: false as const,
        newNeutralMetricRequiresNewContractVersion: true as const,
        semanticAuthorityMayBeInferredFromRegistryMembership: false as const,
      }),
      policyRequirements: FE041H_CANONICALIZATION_REQUIREMENTS,
      policyProgression: Object.freeze({
        requirementCount: 8 as const,
        satisfiedRequirementKeys: FE041H_SATISFIED_REQUIREMENT_KEYS,
        unsatisfiedRequirementKeys: FE041H_UNSATISFIED_REQUIREMENT_KEYS,
        satisfiedRequirementCount: 4 as const,
        unsatisfiedRequirementCount: 4 as const,
      }),
      candidateAssessments,
      exactIdentityReview: Object.freeze({
        candidateMetricCount: 3 as const,
        currentCanonicalMetricCount: 13 as const,
        exactIntersectionCount: 0 as const,
        exactIdentityNonOverlapMeansAdmission: false as const,
        exactIdentityNonOverlapMeansNonRedundant: false as const,
      }),
      mappingEvidenceLane: Object.freeze({
        fe041gSatisfiedRequirementCount: 3 as const,
        fe041gUnsatisfiedRequirementCount: 7 as const,
        neutralCanonicalizationPolicyChangesMappingEvidenceCount:
          false as const,
        mappingRelationIssued: false as const,
        traditionalFangBindingIssued: false as const,
      }),
      authorityBoundary: Object.freeze({
        canonicalizationPolicyDefined: true as const,
        policyDefinitionMeansCandidateAdmission: false as const,
        structuralAppendValidityMeansGovernedAdmission: false as const,
        exactIdentityNonOverlapMeansGovernedAdmission: false as const,
        syntheticVerificationMeansProductStability: false as const,
        neutralRegistryMembershipMeansTraditionalBinding: false as const,
        currentRegistryMutationAuthorized: false as const,
        successorRegistryIssued: false as const,
        candidateCanonicalizationAuthorized: false as const,
        mappingRelationIssued: false as const,
        traditionalFangBindingIssued: false as const,
        metricDirectionalityIssued: false as const,
        thresholdIssued: false as const,
        calibrationIssued: false as const,
        classificationIssued: false as const,
        scoreIssued: false as const,
        rankIssued: false as const,
        deterministicCriterionStateIssued: false as const,
        ruleAuthorityIssued: false as const,
        structuredClaimIssued: false as const,
        narrativeAuthorityIssued: false as const,
        productionSemanticExecutionAuthorized: false as const,
      }),
      researchNoteRef: FE041H_RESEARCH_NOTE_REF,
      nextFrontier: FE041H_NEXT_FRONTIER,
    });

  ISSUED.add(result);
  return result;
}

export function assertIssuedNeutralCandidateCanonicalizationPolicyFE041H(
  value: NeutralCandidateCanonicalizationPolicyFE041HV1,
): void {
  if (!ISSUED.has(value)) {
    fail('artifact was not issued by FE041H authority.');
  }
  if (
    value.policyProgression.satisfiedRequirementCount !== 4 ||
    value.policyProgression.unsatisfiedRequirementCount !== 4 ||
    value.exactIdentityReview.exactIntersectionCount !== 0 ||
    value.exactIdentityReview.exactIdentityNonOverlapMeansAdmission !== false ||
    value.mappingEvidenceLane
      .neutralCanonicalizationPolicyChangesMappingEvidenceCount !== false ||
    value.authorityBoundary.currentRegistryMutationAuthorized !== false ||
    value.authorityBoundary.successorRegistryIssued !== false ||
    value.authorityBoundary.candidateCanonicalizationAuthorized !== false ||
    value.authorityBoundary.mappingRelationIssued !== false ||
    value.authorityBoundary.traditionalFangBindingIssued !== false ||
    value.authorityBoundary.productionSemanticExecutionAuthorized !== false ||
    value.nextFrontier !== FE041H_NEXT_FRONTIER
  ) {
    fail('issued canonicalization policy authority drift.');
  }
}
