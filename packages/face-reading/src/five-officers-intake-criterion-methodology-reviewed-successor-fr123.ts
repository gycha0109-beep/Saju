import {
  assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
} from './five-officers-intake-mouth-semantic-execution-admission-fr122.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED } from './five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const METHODOLOGY_ID = 'method.shenxiang.five_officers.intake_criteria' as const;
const RESEARCH_REF = `${METHODOLOGY_ID}@0.2.0` as const;
const PROPOSED_REVIEWED_REF = `${METHODOLOGY_ID}@0.3.0` as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const SQUARE_BROAD = 'criterion.intake.square_broad' as const;

export interface FiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123V1 {
  readonly schemaVersion: 'fr123-five-officers-intake-criterion-methodology-review-promotion-admission-v1';
  readonly artifactVersion: '0.2.0';
  readonly authorityState: 'witness_qualified_intake_methodology_review_promotion_blocked_no_governed_review_decision';
  readonly predecessor: {
    readonly fr122AuthorityState: 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state';
    readonly executableCriterionId: null;
    readonly closestStaticCandidateCriterionId: typeof SQUARE_BROAD;
    readonly researchMethodologyRef: typeof RESEARCH_REF;
    readonly researchMethodologyReviewStatus: 'research';
    readonly witnessQualifiedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly witnessQualifiedSourceVerificationStatus: 'scan_checked';
  };
  readonly persistedState: {
    readonly registryValidated: true;
    readonly historicalPassageRetained: true;
    readonly witnessQualifiedPassageRetained: true;
    readonly researchMethodologyRetained: true;
    readonly researchMethodologyUnchanged: true;
    readonly reviewedSuccessorRefCandidate: typeof PROPOSED_REVIEWED_REF;
    readonly reviewedSuccessorDefinitionIssued: false;
    readonly reviewedSuccessorPersisted: false;
    readonly methodologyDefinitionsPersisted: 0;
    readonly methodologyPackMutations: 0;
    readonly fr121CriterionDefinitionsUnchanged: true;
  };
  readonly promotionAssessment: {
    readonly sourceGate: {
      readonly requiredMinimumVerificationStatus: 'scan_checked';
      readonly currentVerificationStatus: 'scan_checked';
      readonly prerequisiteSatisfied: true;
    };
    readonly currentMethodologyGate: {
      readonly methodologyRef: typeof RESEARCH_REF;
      readonly currentReviewStatus: 'research';
      readonly reviewedStatusRequiredForCalibrationCollection: true;
      readonly open: false;
    };
    readonly governedReviewDecision: {
      readonly decisionArtifactConsumed: false;
      readonly decisionArtifactRef: null;
      readonly reviewedPromotionAuthorized: false;
      readonly reviewedSuccessorRegistryAppendAuthorized: false;
    };
    readonly structuralValidationBoundary: {
      readonly scanCheckedSourceIsNecessaryForReviewedAuthority: true;
      readonly scanCheckedSourceAloneIsSufficientForReviewedPromotion: false;
      readonly registryStructuralAcceptanceMeansReviewAuthority: false;
    };
  };
  readonly execution: {
    readonly methodologyReviewPromotionsIssued: 0;
    readonly reviewedMethodologyDefinitionsIssued: 0;
    readonly metricBindingsIssued: 0;
    readonly operationalizationsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly calibrationEvidenceIssued: 0;
    readonly thresholdsIssued: 0;
    readonly deterministicCriterionEvaluatorsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly blockers: readonly [
    'intake_methodology_governed_review_decision_not_admitted',
    'intake_methodology_review_promotion_authority_not_established',
    'square_broad_metric_to_source_concept_mapping_not_authorized',
    'square_broad_calibration_evidence_absent',
    'square_broad_threshold_not_calibrated',
  ];
  readonly authorityBoundary: {
    readonly witnessQualifiedSourceMeansReviewedMethodology: false;
    readonly structuralValidatorAcceptanceMeansReviewPromotionAuthority: false;
    readonly methodologyReviewPromotionMayBeInferredFromSourceVerification: false;
    readonly proposedVersionMeansDefinitionIssued: false;
    readonly reviewPromotionMeansMetricBinding: false;
    readonly reviewPromotionMeansNumericThreshold: false;
    readonly reviewPromotionMeansCriterionState: false;
    readonly reviewPromotionMeansClaim: false;
    readonly historicalArtifactMutated: false;
  };
  readonly nextFrontier: 'intake_methodology_review_promotion_criteria_and_decision_authority';
}

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-123 ${message}`);
}

function sameJson(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function validatePersistedAuthority(): FiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123V1['persistedState'] {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY);

  const research = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (method) => `${method.methodologyId}@${method.version}` === RESEARCH_REF,
  );
  const reviewedCandidateAlreadyPersisted = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (method) => `${method.methodologyId}@${method.version}` === PROPOSED_REVIEWED_REF,
  );
  const witnessQualified = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === WITNESS_QUALIFIED_PASSAGE_REF,
  );
  const historical = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );

  if (
    research === undefined ||
    research.reviewStatus !== 'research' ||
    research.sourceRefs.length !== 1 ||
    research.sourceRefs[0] !== WITNESS_QUALIFIED_PASSAGE_REF ||
    reviewedCandidateAlreadyPersisted !== undefined ||
    witnessQualified === undefined ||
    witnessQualified.verificationStatus !== 'scan_checked' ||
    witnessQualified.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
    historical === undefined
  ) fail('persisted witness-qualified methodology authority drift.');

  const intake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');
  if (
    intake.length !== 5 ||
    intake.some((criterion) => criterion.sourceRefs.length !== 1 || criterion.sourceRefs[0] !== WITNESS_QUALIFIED_PASSAGE_REF)
  ) fail('FR-121 witness-qualified criterion definition drift.');

  const researchSnapshot = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (method) => `${method.methodologyId}@${method.version}` === RESEARCH_REF,
  );
  if (researchSnapshot === undefined || !sameJson(research, researchSnapshot)) fail('research predecessor mutation detected.');

  return Object.freeze({
    registryValidated: true as const,
    historicalPassageRetained: true as const,
    witnessQualifiedPassageRetained: true as const,
    researchMethodologyRetained: true as const,
    researchMethodologyUnchanged: true as const,
    reviewedSuccessorRefCandidate: PROPOSED_REVIEWED_REF,
    reviewedSuccessorDefinitionIssued: false as const,
    reviewedSuccessorPersisted: false as const,
    methodologyDefinitionsPersisted: 0 as const,
    methodologyPackMutations: 0 as const,
    fr121CriterionDefinitionsUnchanged: true as const,
  });
}

export function assessFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123(): FiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123V1 {
  if (CACHED !== null) return CACHED;

  const fr122 = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122(fr122);
  if (
    fr122.authorityState !== 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state' ||
    fr122.executableCriterionId !== null ||
    fr122.closestStaticCandidateCriterionId !== SQUARE_BROAD ||
    fr122.provenance.successorMethodologyRef !== RESEARCH_REF ||
    fr122.provenance.successorMethodologyReviewStatus !== 'research' ||
    fr122.provenance.witnessQualifiedPassageRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    fr122.provenance.witnessQualifiedPassageVerificationStatus !== 'scan_checked'
  ) fail('FR-122 predecessor authority drift.');

  const persistedState = validatePersistedAuthority();
  const result: FiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123V1 = Object.freeze({
    schemaVersion: 'fr123-five-officers-intake-criterion-methodology-review-promotion-admission-v1' as const,
    artifactVersion: '0.2.0' as const,
    authorityState: 'witness_qualified_intake_methodology_review_promotion_blocked_no_governed_review_decision' as const,
    predecessor: Object.freeze({
      fr122AuthorityState: fr122.authorityState,
      executableCriterionId: null,
      closestStaticCandidateCriterionId: SQUARE_BROAD,
      researchMethodologyRef: RESEARCH_REF,
      researchMethodologyReviewStatus: 'research' as const,
      witnessQualifiedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      witnessQualifiedSourceVerificationStatus: 'scan_checked' as const,
    }),
    persistedState,
    promotionAssessment: Object.freeze({
      sourceGate: Object.freeze({
        requiredMinimumVerificationStatus: 'scan_checked' as const,
        currentVerificationStatus: 'scan_checked' as const,
        prerequisiteSatisfied: true as const,
      }),
      currentMethodologyGate: Object.freeze({
        methodologyRef: RESEARCH_REF,
        currentReviewStatus: 'research' as const,
        reviewedStatusRequiredForCalibrationCollection: true as const,
        open: false as const,
      }),
      governedReviewDecision: Object.freeze({
        decisionArtifactConsumed: false as const,
        decisionArtifactRef: null,
        reviewedPromotionAuthorized: false as const,
        reviewedSuccessorRegistryAppendAuthorized: false as const,
      }),
      structuralValidationBoundary: Object.freeze({
        scanCheckedSourceIsNecessaryForReviewedAuthority: true as const,
        scanCheckedSourceAloneIsSufficientForReviewedPromotion: false as const,
        registryStructuralAcceptanceMeansReviewAuthority: false as const,
      }),
    }),
    execution: Object.freeze({
      methodologyReviewPromotionsIssued: 0 as const,
      reviewedMethodologyDefinitionsIssued: 0 as const,
      metricBindingsIssued: 0 as const,
      operationalizationsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      calibrationEvidenceIssued: 0 as const,
      thresholdsIssued: 0 as const,
      deterministicCriterionEvaluatorsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    blockers: Object.freeze([
      'intake_methodology_governed_review_decision_not_admitted',
      'intake_methodology_review_promotion_authority_not_established',
      'square_broad_metric_to_source_concept_mapping_not_authorized',
      'square_broad_calibration_evidence_absent',
      'square_broad_threshold_not_calibrated',
    ] as const),
    authorityBoundary: Object.freeze({
      witnessQualifiedSourceMeansReviewedMethodology: false as const,
      structuralValidatorAcceptanceMeansReviewPromotionAuthority: false as const,
      methodologyReviewPromotionMayBeInferredFromSourceVerification: false as const,
      proposedVersionMeansDefinitionIssued: false as const,
      reviewPromotionMeansMetricBinding: false as const,
      reviewPromotionMeansNumericThreshold: false as const,
      reviewPromotionMeansCriterionState: false as const,
      reviewPromotionMeansClaim: false as const,
      historicalArtifactMutated: false as const,
    }),
    nextFrontier: 'intake_methodology_review_promotion_criteria_and_decision_authority' as const,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123(
  value: FiveOfficerIntakeCriterionMethodologyReviewPromotionAdmissionFR123V1,
): void {
  if (!ISSUED.has(value)) fail('methodology review-promotion admission artifact was not issued by FR-123.');
  if (
    value.authorityState !== 'witness_qualified_intake_methodology_review_promotion_blocked_no_governed_review_decision' ||
    value.predecessor.researchMethodologyReviewStatus !== 'research' ||
    value.predecessor.witnessQualifiedSourceVerificationStatus !== 'scan_checked' ||
    value.persistedState.reviewedSuccessorDefinitionIssued !== false ||
    value.persistedState.reviewedSuccessorPersisted !== false ||
    value.promotionAssessment.sourceGate.prerequisiteSatisfied !== true ||
    value.promotionAssessment.currentMethodologyGate.open !== false ||
    value.promotionAssessment.governedReviewDecision.reviewedPromotionAuthorized !== false ||
    value.execution.methodologyReviewPromotionsIssued !== 0 ||
    value.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.boundedNarrativesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false ||
    value.nextFrontier !== 'intake_methodology_review_promotion_criteria_and_decision_authority'
  ) fail('issued methodology review-promotion admission artifact drift.');
}
