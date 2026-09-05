import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  type RelationshipSpouseT8AuthorityGapId,
} from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import type { RelationshipSpouseT8CurrentMethodResidualAcquisitionTaskId } from './relationship-spouse-t8-current-method-residual-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_RECORDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION,
  type RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
} from './relationship-spouse-t8-current-method-residual-authority-acquisition-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-current-method-residual-authority-acquisition-evidence-adequacy-reassessment-review-v1' as const;

export type RelationshipSpouseT8CurrentMethodResidualAuthorityRequirementAdequacyStatus =
  | 'PARTIAL_EVIDENCE_NOT_ADEQUATE'
  | 'NO_QUALIFYING_EVIDENCE';

export interface RelationshipSpouseT8CurrentMethodResidualAuthorityRequirementAdequacyAssessment {
  gapId: RelationshipSpouseT8AuthorityGapId;
  status: RelationshipSpouseT8CurrentMethodResidualAuthorityRequirementAdequacyStatus;
  evidenceTaskIds: readonly RelationshipSpouseT8CurrentMethodResidualAcquisitionTaskId[];
  adequateForRequirement: false;
  gapClosureAuthorized: false;
  rationale: string;
}

function assessment(
  value: RelationshipSpouseT8CurrentMethodResidualAuthorityRequirementAdequacyAssessment,
): RelationshipSpouseT8CurrentMethodResidualAuthorityRequirementAdequacyAssessment {
  return Object.freeze(value);
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_REQUIREMENT_ADEQUACY_ASSESSMENTS =
  Object.freeze([
    assessment({
      gapId: 'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
      status: 'PARTIAL_EVIDENCE_NOT_ADEQUATE',
      evidenceTaskIds: Object.freeze([
        'WYG_DIRECT_PRIMARY_IMAGE_AUTHORITY_ACQUISITION',
        'YUANHAI_PRIMARY_PASSAGE_AUTHORITY_ACQUISITION',
        'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_ACQUISITION',
      ]),
      adequateForRequirement: false,
      gapClosureAuthorized: false,
      rationale:
        'Historical spouse-role and 六親 material is directly inspectable in part, but no source-bound rule maps the exact current governed T5 family_presence claim classes to spouse-specific T8 semantics. Historical role correspondence cannot supply the missing current-method semantic bridge.',
    }),
    assessment({
      gapId: 'SPOUSE_APPLICABILITY_BOUNDARY_MISSING',
      status: 'NO_QUALIFYING_EVIDENCE',
      evidenceTaskIds: Object.freeze([
        'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_ACQUISITION',
      ]),
      adequateForRequirement: false,
      gapClosureAuthorized: false,
      rationale:
        'The higher-provenance modern source is compatibility-scoped and uses a male/female marriage frame. It does not establish a gender-neutral spouse-natal contract, a no-user-or-partner-sex inference boundary, or a no-partner-orientation inference boundary. Practitioner/editorial policy cannot be stitched in as normative authority.',
    }),
    assessment({
      gapId: 'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
      status: 'PARTIAL_EVIDENCE_NOT_ADEQUATE',
      evidenceTaskIds: Object.freeze([
        'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_ACQUISITION',
      ]),
      adequateForRequirement: false,
      gapClosureAuthorized: false,
      rationale:
        '子平真詮 supplies a genuine multi-factor spouse method, but its governed inputs are 妻宮, 妻星/財, 月令用神, 喜忌 and 格局 rather than the current five broad family_presence T5 classes. The current relationship T6 direct-input path remains absent. This is a semantic-substrate mismatch, not current-claim-class composition authority.',
    }),
    assessment({
      gapId: 'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
      status: 'PARTIAL_EVIDENCE_NOT_ADEQUATE',
      evidenceTaskIds: Object.freeze([
        'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_ACQUISITION',
        'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_ACQUISITION',
      ]),
      adequateForRequirement: false,
      gapClosureAuthorized: false,
      rationale:
        'Traditional contextual qualifications are visible, but the current governed claim substrate is not semantically matched and modern spouse-natal applicability is not established. They therefore cannot define current production scope. Partner attributes, marriage/divorce/breakup/fidelity/children/timing and compatibility remain unauthorized.',
    }),
    assessment({
      gapId: 'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
      status: 'PARTIAL_EVIDENCE_NOT_ADEQUATE',
      evidenceTaskIds: Object.freeze([
        'WYG_DIRECT_PRIMARY_IMAGE_AUTHORITY_ACQUISITION',
        'YUANHAI_PRIMARY_PASSAGE_AUTHORITY_ACQUISITION',
        'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_ACQUISITION',
      ]),
      adequateForRequirement: false,
      gapClosureAuthorized: false,
      rationale:
        'The Yuanhai institutional primary-image locator is a material provenance upgrade, but work identity is not sufficient normative independence. The WYG exact target-page binding is still missing and the modern higher-provenance source is scope-incompatible. No independently governed provenance chain supports the proposed current spouse-natal method.',
    }),
  ] as const satisfies readonly RelationshipSpouseT8CurrentMethodResidualAuthorityRequirementAdequacyAssessment[]);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_CONTROL_IDS =
  Object.freeze([
    'ACQUISITION_EVIDENCE_IS_VALID_AS_RESEARCH_EXECUTION_EVIDENCE_ONLY',
    'YUANHAI_DIRECT_PRIMARY_IMAGE_UPGRADE_IS_REAL_BUT_NOT_AUTHORITY_ADMISSION',
    'WYG_EXACT_TARGET_PAGE_IMAGE_BINDING_REMAINS_UNRESOLVED',
    'WORK_IDENTITY_INDEPENDENCE_DOES_NOT_EQUAL_INDEPENDENT_NORMATIVE_PROVENANCE',
    'MODERN_COMPATIBILITY_SCHOLARSHIP_CANNOT_SUBSTITUTE_FOR_SPOUSE_NATAL_APPLICABILITY',
    'GENDER_NEUTRAL_PRODUCT_POLICY_REQUIRES_QUALIFYING_NORMATIVE_AUTHORITY',
    'ZIPING_MULTI_FACTOR_METHOD_CANNOT_BE_RETROFITTED_ONTO_DIFFERENT_CURRENT_T5_CLAIM_CLASSES',
    'CURRENT_FIVE_T5_FAMILY_PRESENCE_CLAIM_CLASSES_REMAIN_WITHOUT_EXPLICIT_SPOUSE_COMPOSITION_AUTHORITY',
    'CURRENT_RELATIONSHIP_T6_DIRECT_INPUT_PATH_REMAINS_ABSENT',
    'NO_CROSS_SOURCE_OR_CROSS_TASK_STITCHING_TO_CLOSE_REQUIREMENTS',
    'NO_HISTORICAL_GENDER_ROLE_UNIVERSALIZATION_OR_USER_PARTNER_SEX_OR_ORIENTATION_INFERENCE',
    'ZERO_OF_FIVE_MANDATORY_AUTHORITY_REQUIREMENTS_ADEQUATE',
    'SPOUSE_T8_AUTHORITY_IS_NOT_ADMISSION_READY',
    'NO_SEMANTIC_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_IMPLEMENTATION',
  ] as const);

export interface RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT'
    | 'UPSTREAM_ACQUISITION_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'ACQUISITION_EVIDENCE_VALID_RESEARCH_PROGRESS_ZERO_OF_FIVE_REQUIREMENTS_ADEQUATE_AUTHORITY_NOT_ADMISSION_READY'
    | 'ACQUISITION_EVIDENCE_ADEQUACY_NOT_ESTABLISHED';
  upstreamAcquisitionEvidenceId: string;
  exactAcquisitionEvidenceBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  acquisitionEvidenceAdequateForResearchOutcome: boolean;
  acquisitionEvidenceAdequateForAuthorityAdmission: false;
  acquisitionEvidenceAdequateForAnyGapClosure: false;
  authorityAdmissionReady: false;
  semanticProducerImplementationAuthorized: false;
  requirementAssessments: readonly RelationshipSpouseT8CurrentMethodResidualAuthorityRequirementAdequacyAssessment[];
  requirementAssessmentCount: 5 | 0;
  mandatoryRequirementCount: 5;
  adequateMandatoryRequirementCount: 0;
  partialButInadequateRequirementCount: 4 | 0;
  noQualifyingEvidenceRequirementCount: 1 | 0;
  qualifyingAuthorityCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  yuanhaiPrimaryImageProgressRecognized: boolean;
  yuanhaiPrimaryImageProgressClosesSemanticBindingGap: false;
  yuanhaiPrimaryImageProgressClosesProvenanceGap: false;
  wygExactTargetPrimaryImageStillRequired: boolean;
  independentNormativeProvenanceEstablished: false;
  explicitGenderNeutralSpouseNatalApplicabilityEstablished: false;
  exactCurrentClaimClassCompositionAuthorityEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  competingFoundationalMethodAdopted: false;
  humanMethodologyChoiceMade: false;
  crossSourceStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  historicalGenderRoleUniversalizationAuthorized: false;
  userOrPartnerSexInferenceAuthorized: false;
  partnerSexualOrientationInferenceAuthorized: false;
  partnerAttributeOrOutcomePromotionAuthorized: false;
  compatibilityOrTimingPromotionAuthorized: false;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    adequacyReviewsPerformed: 1 | 0;
    authorityRequirementsSatisfied: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextAction:
    | 'CONTINUE_EXTERNAL_SOURCE_ACQUISITION_UNTIL_NEW_QUALIFYING_EVIDENCE_EXISTS_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
    | 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE';
}

const ALL_GAP_IDS = Object.freeze(
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
);

function contentAddressedAcquisitionEvidenceIdentityValid(
  evidence: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_current_method_residual_authority_acquisition_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactAcquisitionEvidenceBoundaryAccepted(
  evidence: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
): boolean {
  return (
    contentAddressedAcquisitionEvidenceIdentityValid(evidence) &&
    evidence.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION &&
    evidence.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE' &&
    evidence.decision ===
      'PARTIAL_EVIDENCE_ACQUIRED_ZERO_QUALIFYING_AUTHORITY_ALL_FIVE_GAPS_REMAIN_OPEN' &&
    evidence.exactReadinessBoundaryAccepted &&
    evidence.executionPerformed &&
    evidence.taskEvidenceRecordCount === 4 &&
    deterministicContentHash(evidence.taskEvidenceRecords) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_RECORDS,
      ) &&
    evidence.qualifyingAuthorityCandidateCount === 0 &&
    evidence.authorityAcceptedCandidateCount === 0 &&
    evidence.wygFolioTo0810ScanPageBindingEstablished === false &&
    evidence.wygDirectTargetPageImageInspected === false &&
    evidence.yuanhaiExactPrimaryPassagePageLocatorEstablished &&
    evidence.yuanhaiDirectPrimaryPassageImageInspected &&
    evidence.yuanhaiBoundedPrimaryContextInspected &&
    evidence.yuanhaiWorkIdentityIndependentFromSamyeong &&
    evidence.independentNormativeProvenanceEstablished === false &&
    evidence.higherProvenanceModernSourceLocated &&
    evidence.explicitGenderNeutralSpouseNatalApplicabilityEstablished === false &&
    evidence.explicitNoUserPartnerSexOrOrientationInferenceEstablished === false &&
    evidence.modernApplicabilityNormativeAuthorityAdequateCount === 0 &&
    evidence.zipingMultiFactorSpouseCompositionObserved &&
    evidence.exactCurrentClaimClassCompositionAuthorityEstablished === false &&
    evidence.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    evidence.negativePartialAndMismatchEvidencePreserved &&
    evidence.crossSourceStitchingAuthorized === false &&
    evidence.crossTaskStitchingAuthorized === false &&
    evidence.historicalGenderRoleUniversalizationAuthorized === false &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.relationshipT6ExecutionTaskCreated === false &&
    evidence.allFiveGapsRemainOpen &&
    deterministicContentHash(evidence.unresolvedGapIds) === deterministicContentHash(ALL_GAP_IDS) &&
    evidence.authorityAcquiredByThisGate === false &&
    evidence.authorityGapClosedByThisGate === false &&
    evidence.spouseT8RuleAuthoringAuthorized === false &&
    evidence.spouseT8ClaimTypeCreationAuthorized === false &&
    evidence.spouseInterpretationPackCreationAuthorized === false &&
    evidence.consumerNarrativeAuthorized === false &&
    evidence.compatibilityAuthorityAuthorized === false &&
    evidence.previewDefaultSwitchAuthorized === false &&
    evidence.productionPromotionAuthorized === false &&
    evidence.controlCount === 14 &&
    evidence.controlsFrozen &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_CONTROL_IDS,
      ) &&
    evidence.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport, 'reviewId'>,
): RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport {
  return {
    reviewId: `relationship_spouse_t8_current_method_acquisition_evidence_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
  evidence: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
): RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport {
  const accepted = exactAcquisitionEvidenceBoundaryAccepted(evidence);

  return finalized({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT'
      : 'UPSTREAM_ACQUISITION_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'ACQUISITION_EVIDENCE_VALID_RESEARCH_PROGRESS_ZERO_OF_FIVE_REQUIREMENTS_ADEQUATE_AUTHORITY_NOT_ADMISSION_READY'
      : 'ACQUISITION_EVIDENCE_ADEQUACY_NOT_ESTABLISHED',
    upstreamAcquisitionEvidenceId: evidence.evidenceId,
    exactAcquisitionEvidenceBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    acquisitionEvidenceAdequateForResearchOutcome: accepted,
    acquisitionEvidenceAdequateForAuthorityAdmission: false,
    acquisitionEvidenceAdequateForAnyGapClosure: false,
    authorityAdmissionReady: false,
    semanticProducerImplementationAuthorized: false,
    requirementAssessments: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_REQUIREMENT_ADEQUACY_ASSESSMENTS
      : Object.freeze([]),
    requirementAssessmentCount: accepted ? 5 : 0,
    mandatoryRequirementCount: 5,
    adequateMandatoryRequirementCount: 0,
    partialButInadequateRequirementCount: accepted ? 4 : 0,
    noQualifyingEvidenceRequirementCount: accepted ? 1 : 0,
    qualifyingAuthorityCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    yuanhaiPrimaryImageProgressRecognized: accepted,
    yuanhaiPrimaryImageProgressClosesSemanticBindingGap: false,
    yuanhaiPrimaryImageProgressClosesProvenanceGap: false,
    wygExactTargetPrimaryImageStillRequired: accepted,
    independentNormativeProvenanceEstablished: false,
    explicitGenderNeutralSpouseNatalApplicabilityEstablished: false,
    exactCurrentClaimClassCompositionAuthorityEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    currentRelationshipT6InputPathEstablished: false,
    competingFoundationalMethodAdopted: false,
    humanMethodologyChoiceMade: false,
    crossSourceStitchingAuthorized: false,
    crossTaskStitchingAuthorized: false,
    historicalGenderRoleUniversalizationAuthorized: false,
    userOrPartnerSexInferenceAuthorized: false,
    partnerSexualOrientationInferenceAuthorized: false,
    partnerAttributeOrOutcomePromotionAuthorized: false,
    compatibilityOrTimingPromotionAuthorized: false,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: accepted ? ALL_GAP_IDS : Object.freeze([]),
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      adequacyReviewsPerformed: accepted ? 1 : 0,
      authorityRequirementsSatisfied: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextAction: accepted
      ? 'CONTINUE_EXTERNAL_SOURCE_ACQUISITION_UNTIL_NEW_QUALIFYING_EVIDENCE_EXISTS_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
      : 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE',
  });
}
