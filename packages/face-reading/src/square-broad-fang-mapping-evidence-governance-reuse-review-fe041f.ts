import {
  FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT,
  assertProductNeutralObservationContractFE035B,
} from './product-neutral-observation-contract-fe035b.js';
import {
  assertIssuedSquareBroadFangApprovedGovernanceFR140,
  materializeSquareBroadFangApprovedGovernanceFR140,
} from './five-officers-square-broad-fang-approved-governance-materialization-fr140.js';
import {
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141,
  assessSquareBroadFangSourceLineageConstructRefinementFR141,
} from './five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.js';
import {
  getSquareBroadFangNeutralCandidateMetricDefinitionsFR142,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import {
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
  assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
} from './five-officers-square-broad-fang-neutral-candidate-metric-synthetic-verification-fr143.js';
import {
  getSquareBroadFangCaptureQualityPerturbationEvidenceReviewContractFR151,
} from './five-officers-square-broad-fang-capture-quality-perturbation-evidence-review-fr151.js';
import {
  getSquareBroadFangExternalTrustRootMaterialIntakeContractFR157,
} from './five-officers-square-broad-fang-external-trust-root-material-intake-fr157.js';
import {
  FR185_MAPPING_EVIDENCE_REQUIREMENTS,
  FR185_REQUIRED_MAPPING_EVIDENCE_KEYS,
  assertIssuedEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185,
  issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185,
  type FR185MappingEvidenceRequirementKey,
} from './eye-pair-xi-chang-metric-to-concept-mapping-evidence-requirements-fr185.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE041F_RECORD_ID =
  'research.face_reading.square_broad_fang.mapping_evidence_governance_reuse_review.fe041f' as const;
export const FE041F_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fe041f-square-broad-fang-mapping-evidence-governance-reuse-review.md' as const;
export const FE041F_NEXT_FRONTIER =
  'define_square_broad_fang_mapping_hypotheses_and_neutral_candidate_canonicalization_policy_as_separate_lanes' as const;

export const FE041F_CANDIDATE_METRIC_REFS = Object.freeze([
  'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0',
  'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0',
  'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0',
] as const);

export const FE041F_SATISFIED_MAPPING_EVIDENCE_KEYS = Object.freeze([
  'source_concept_identity_and_pinned_provenance',
  'candidate_neutral_metric_identity_and_versioned_definition',
] as const);

export const FE041F_UNSATISFIED_MAPPING_EVIDENCE_KEYS = Object.freeze([
  'explicit_mapping_hypothesis_provenance',
  'independent_blinded_expert_operationalization',
  'repeat_capture_stability',
  'source_grounded_construct_correspondence',
  'alternative_metric_and_confound_rejection',
  'end_to_end_evidence_traceability',
  'explicit_mapping_acceptance_or_rejection_decision',
  'fail_closed_completeness',
] as const);

export interface SquareBroadFangMappingEvidenceRequirementFE041FV1 {
  readonly key: FR185MappingEvidenceRequirementKey;
  readonly state: 'satisfied_upstream' | 'required_not_satisfied';
  readonly requiredBeforeMappingAdmission: true;
  readonly requirement: string;
  readonly reuseBasis: 'fr185_governance_structure_only';
  readonly squareBroadEvidenceRef: string | null;
}

export interface SquareBroadFangMappingEvidenceGovernanceReuseReviewFE041FV1 {
  readonly schemaVersion:
    'fe041f-square-broad-fang-mapping-evidence-governance-reuse-review-v1';
  readonly recordId: typeof FE041F_RECORD_ID;
  readonly authorityState:
    'fr185_mapping_evidence_governance_reuse_reviewed_for_square_broad_two_requirements_satisfied_mapping_not_admitted';
  readonly target: Readonly<{
    criterionRef: 'criterion.intake.square_broad';
    sourceConcept: '方大';
    focalTraditionalTerm: '方';
    activeConstructScope: 'fang_shape_candidate_features_only';
  }>;
  readonly candidateMetricRefs: typeof FE041F_CANDIDATE_METRIC_REFS;
  readonly governanceReuse: Readonly<{
    fr185RequirementKeysReused: typeof FR185_REQUIRED_MAPPING_EVIDENCE_KEYS;
    evidenceGovernanceStructureReusable: true;
    criterionSpecificEvidenceStillRequired: true;
    xiChangMetricIdentityReuseAuthorized: false;
    xiChangMappingRelationReuseAuthorized: false;
    xiChangDirectionalityReuseAuthorized: false;
    xiChangThresholdReuseAuthorized: false;
    xiChangCalibrationReuseAuthorized: false;
  }>;
  readonly evidenceRequirements:
    readonly SquareBroadFangMappingEvidenceRequirementFE041FV1[];
  readonly evidenceProgression: Readonly<{
    satisfiedRequirementKeys:
      typeof FE041F_SATISFIED_MAPPING_EVIDENCE_KEYS;
    unsatisfiedRequirementKeys:
      typeof FE041F_UNSATISFIED_MAPPING_EVIDENCE_KEYS;
    mappingEvidenceRequirementCount: 10;
    satisfiedRequirementCount: 2;
    unsatisfiedRequirementCount: 8;
    explicitMappingHypothesesIssued: 0;
    independentHumanSemanticLabelsIssued: 0;
    empiricalRepeatabilityEstablished: false;
    constructValidityEstablished: false;
  }>;
  readonly neutralCanonicalizationLane: Readonly<{
    currentCanonicalRegistryContract:
      'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1';
    currentCanonicalRegistryMetricCount: 13;
    candidateCanonicalIntersectionCount: 0;
    mutateCurrentRegistryInPlaceAuthorized: false;
    newNeutralMetricRequiresNewContractVersion: true;
    fr185DefinesNeutralRegistryCanonicalizationPolicy: false;
    candidateCanonicalizationPolicyDefined: false;
    candidateCanonicalizationAuthorized: false;
    successorRegistryIssued: false;
  }>;
  readonly mappingAuthorityBoundary: Readonly<{
    mappingRequirementsDefinitionMeansMappingAdmission: false;
    mappingRelationIssued: false;
    traditionalFangBindingIssued: false;
    metricDirectionalityIssued: false;
    thresholdSelectionRequiredBeforeMappingAdmission: false;
    thresholdIssued: false;
    calibrationEvidenceIssued: false;
    calibrationProtocolIssued: false;
    deterministicCriterionStateIssued: false;
    ruleAuthorityIssued: false;
    structuredClaimIssued: false;
    narrativeAuthorityIssued: false;
    productionSemanticExecutionAuthorized: false;
    traditionalSemanticAuthorityPromoted: false;
  }>;
  readonly nextFrontier: typeof FE041F_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FE041F ' + message);
}

function exactStrings(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  return actual.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

function evidenceRefFor(
  key: FR185MappingEvidenceRequirementKey,
): string | null {
  if (key === 'source_concept_identity_and_pinned_provenance') {
    return 'passage.shenxiang.five_officers.intake.nlc_1925';
  }
  if (key === 'candidate_neutral_metric_identity_and_versioned_definition') {
    return 'research.face_reading.shenxiang.five_officers.square_broad_fang_neutral_candidate_metric_runtime.fr142';
  }
  return null;
}

export function issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F():
SquareBroadFangMappingEvidenceGovernanceReuseReviewFE041FV1 {
  const fr185 =
    issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();
  assertIssuedEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185(
    fr185,
  );
  if (
    !exactStrings(
      FR185_REQUIRED_MAPPING_EVIDENCE_KEYS,
      fr185.evidenceRequirements.map((entry) => entry.key),
    ) ||
    fr185.evidenceRequirements.length !== 10 ||
    fr185.mappingBoundary.thresholdSelectionResultIsLaterCalibrationEvidence !==
      true ||
    fr185.mappingBoundary
      .thresholdSelectionResultRequiredToDefineMappingRequirements !== false ||
    fr185.authorityBoundary.mappingEvidenceRequirementsDefined !== true ||
    fr185.authorityBoundary
      .requirementsDefinitionAloneAuthorizesMappingReviewOutcome !== false ||
    fr185.authorityBoundary.metricDirectionalityAuthorized !== false ||
    fr185.authorityBoundary.thresholdIssued !== false ||
    fr185.authorityBoundary.calibrationProtocolIssued !== false ||
    fr185.authorityBoundary.productionRuleAuthorized !== false ||
    fr185.authorityBoundary.traditionalSemanticAuthorityPromoted !== false
  ) {
    fail('FR185 reusable evidence-governance boundary drift.');
  }

  const fr140 = materializeSquareBroadFangApprovedGovernanceFR140();
  assertIssuedSquareBroadFangApprovedGovernanceFR140(fr140);
  if (
    fr140.target.criterionRef !== 'criterion.intake.square_broad' ||
    fr140.target.sourceConcept !== '方大' ||
    fr140.methodologyDecision.reviewedSuccessorIssued !== true ||
    fr140.methodologyDecision.sourceRefsSnapshot.length !== 1 ||
    fr140.methodologyDecision.sourceRefsSnapshot[0] !==
      'passage.shenxiang.five_officers.intake.nlc_1925' ||
    fr140.annotationGovernance.independentHumanReviewerRequired !== true ||
    fr140.annotationGovernance.concreteReviewerActorRefs.length !== 0 ||
    fr140.collectionGate.humanSemanticCollectionAuthorized !== false ||
    fr140.execution.empiricalSemanticLabelsIssued !== 0 ||
    fr140.execution.traditionalMetricBindingsIssued !== 0
  ) {
    fail('FR140 square-broad source or annotation governance drift.');
  }

  const fr141 = assessSquareBroadFangSourceLineageConstructRefinementFR141();
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141(fr141);
  if (
    fr141.sourceLineageFindings.taxonomyConflictPresent !== true ||
    fr141.sourceLineageFindings.fangEqualsSiziKouEstablished !== false ||
    fr141.constructRefinement.directAspectRatioProxyForFangAuthorized !== false ||
    fr141.constructRefinement.directMouthWidthProxyForFangAuthorized !== false ||
    fr141.execution.traditionalMetricBindingsIssued !== 0
  ) {
    fail('FR141 source-lineage conflict or anti-proxy boundary drift.');
  }

  const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
  const metricRefs = definitions.map((entry) => entry.metricRef);
  if (
    !exactStrings(metricRefs, FE041F_CANDIDATE_METRIC_REFS) ||
    definitions.some((entry) =>
      entry.traditionalCriterionBindingRef !== null ||
      entry.calibrationRef !== null ||
      entry.numericClassificationThreshold !== null)
  ) {
    fail('FR142 candidate metric identity or authority boundary drift.');
  }

  const fr143 =
    assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143(
    fr143,
  );
  if (
    fr143.syntheticRelations.deterministicRepeatabilityObserved !== true ||
    fr143.evidenceBoundary.syntheticDiscriminationMeansConstructValidity !==
      false ||
    fr143.evidenceBoundary
      .syntheticRepeatabilityMeansEmpiricalCaptureRepeatability !== false ||
    fr143.execution.empiricalCaptureRecordsIssued !== 0 ||
    fr143.execution.humanSemanticLabelsIssued !== 0
  ) {
    fail('FR143 synthetic-only evidence boundary drift.');
  }

  const fr151 =
    getSquareBroadFangCaptureQualityPerturbationEvidenceReviewContractFR151();
  if (
    fr151.reviewBoundary.constructValidationPerformedByThisArtifact !== false ||
    fr151.reviewBoundary.independentMultiSessionEvidenceAdmitted !== false ||
    fr151.reviewBoundary.captureQualityThresholdsDefined !== false ||
    fr151.reviewBoundary.repeatabilityThresholdsDefined !== false ||
    fr151.reviewBoundary.traditionalSemanticAuthority !== false
  ) {
    fail('FR151 empirical review boundary drift.');
  }

  const fr157 = getSquareBroadFangExternalTrustRootMaterialIntakeContractFR157();
  if (
    fr157.externalTrustRootProvisionedByThisArtifact !== false ||
    fr157.semanticTrustEvidenceVerificationPerformedByThisArtifact !== false ||
    fr157.independentSessionEvidenceAdmittedByThisArtifact !== false ||
    fr157.constructValidationPerformedByThisArtifact !== false ||
    fr157.thresholdDefinitionPerformedByThisArtifact !== false ||
    fr157.repeatabilityInterpretationPerformedByThisArtifact !== false
  ) {
    fail('FR157 trust or independent-session boundary drift.');
  }

  assertProductNeutralObservationContractFE035B(
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT,
  );
  const canonicalRefs = new Set(
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.metrics.map(
      (metric) => metric.metricRef,
    ),
  );
  const canonicalIntersection = metricRefs.filter((ref) => canonicalRefs.has(ref));
  if (canonicalIntersection.length !== 0) {
    fail('FR142 candidates unexpectedly overlap FE035B canonical registry.');
  }
  if (
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.evolutionPolicy
      .mutateV1InPlace !== false ||
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.evolutionPolicy
      .newNeutralMetricRequiresNewContractVersion !== true ||
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT.evolutionPolicy
      .semanticAuthorityMayBeInferredFromRegistryMembership !== false
  ) {
    fail('FE035B evolution policy drift.');
  }

  const evidenceRequirements = Object.freeze(
    FR185_MAPPING_EVIDENCE_REQUIREMENTS.map((template) =>
      Object.freeze({
        key: template.key,
        state: (
          FE041F_SATISFIED_MAPPING_EVIDENCE_KEYS as readonly string[]
        ).includes(template.key)
          ? 'satisfied_upstream' as const
          : 'required_not_satisfied' as const,
        requiredBeforeMappingAdmission: true as const,
        requirement: template.requirement,
        reuseBasis: 'fr185_governance_structure_only' as const,
        squareBroadEvidenceRef: evidenceRefFor(template.key),
      }),
    ),
  );

  const result: SquareBroadFangMappingEvidenceGovernanceReuseReviewFE041FV1 =
    Object.freeze({
      schemaVersion:
        'fe041f-square-broad-fang-mapping-evidence-governance-reuse-review-v1' as const,
      recordId: FE041F_RECORD_ID,
      authorityState:
        'fr185_mapping_evidence_governance_reuse_reviewed_for_square_broad_two_requirements_satisfied_mapping_not_admitted' as const,
      target: Object.freeze({
        criterionRef: 'criterion.intake.square_broad' as const,
        sourceConcept: '方大' as const,
        focalTraditionalTerm: '方' as const,
        activeConstructScope: 'fang_shape_candidate_features_only' as const,
      }),
      candidateMetricRefs: FE041F_CANDIDATE_METRIC_REFS,
      governanceReuse: Object.freeze({
        fr185RequirementKeysReused: FR185_REQUIRED_MAPPING_EVIDENCE_KEYS,
        evidenceGovernanceStructureReusable: true as const,
        criterionSpecificEvidenceStillRequired: true as const,
        xiChangMetricIdentityReuseAuthorized: false as const,
        xiChangMappingRelationReuseAuthorized: false as const,
        xiChangDirectionalityReuseAuthorized: false as const,
        xiChangThresholdReuseAuthorized: false as const,
        xiChangCalibrationReuseAuthorized: false as const,
      }),
      evidenceRequirements,
      evidenceProgression: Object.freeze({
        satisfiedRequirementKeys: FE041F_SATISFIED_MAPPING_EVIDENCE_KEYS,
        unsatisfiedRequirementKeys: FE041F_UNSATISFIED_MAPPING_EVIDENCE_KEYS,
        mappingEvidenceRequirementCount: 10 as const,
        satisfiedRequirementCount: 2 as const,
        unsatisfiedRequirementCount: 8 as const,
        explicitMappingHypothesesIssued: 0 as const,
        independentHumanSemanticLabelsIssued: 0 as const,
        empiricalRepeatabilityEstablished: false as const,
        constructValidityEstablished: false as const,
      }),
      neutralCanonicalizationLane: Object.freeze({
        currentCanonicalRegistryContract:
          'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1' as const,
        currentCanonicalRegistryMetricCount: 13 as const,
        candidateCanonicalIntersectionCount: 0 as const,
        mutateCurrentRegistryInPlaceAuthorized: false as const,
        newNeutralMetricRequiresNewContractVersion: true as const,
        fr185DefinesNeutralRegistryCanonicalizationPolicy: false as const,
        candidateCanonicalizationPolicyDefined: false as const,
        candidateCanonicalizationAuthorized: false as const,
        successorRegistryIssued: false as const,
      }),
      mappingAuthorityBoundary: Object.freeze({
        mappingRequirementsDefinitionMeansMappingAdmission: false as const,
        mappingRelationIssued: false as const,
        traditionalFangBindingIssued: false as const,
        metricDirectionalityIssued: false as const,
        thresholdSelectionRequiredBeforeMappingAdmission: false as const,
        thresholdIssued: false as const,
        calibrationEvidenceIssued: false as const,
        calibrationProtocolIssued: false as const,
        deterministicCriterionStateIssued: false as const,
        ruleAuthorityIssued: false as const,
        structuredClaimIssued: false as const,
        narrativeAuthorityIssued: false as const,
        productionSemanticExecutionAuthorized: false as const,
        traditionalSemanticAuthorityPromoted: false as const,
      }),
      nextFrontier: FE041F_NEXT_FRONTIER,
    });
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F(
  value: SquareBroadFangMappingEvidenceGovernanceReuseReviewFE041FV1,
): void {
  if (!ISSUED.has(value)) fail('reuse review was not issued by FE041F.');
  if (
    value.evidenceProgression.satisfiedRequirementCount !== 2 ||
    value.evidenceProgression.unsatisfiedRequirementCount !== 8 ||
    value.neutralCanonicalizationLane.candidateCanonicalizationAuthorized !==
      false ||
    value.mappingAuthorityBoundary.mappingRelationIssued !== false ||
    value.mappingAuthorityBoundary.traditionalFangBindingIssued !== false ||
    value.mappingAuthorityBoundary.thresholdIssued !== false ||
    value.mappingAuthorityBoundary.productionSemanticExecutionAuthorized !==
      false ||
    value.nextFrontier !== FE041F_NEXT_FRONTIER
  ) {
    fail('issued reuse review authority drift.');
  }
}
