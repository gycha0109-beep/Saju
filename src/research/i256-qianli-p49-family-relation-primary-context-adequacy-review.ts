import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE_VERSION,
  I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTROL_IDS,
  type I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport,
} from './i255-qianli-p49-family-relation-primary-context-adequacy-evidence.js';

export const I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_VERSION =
  'myeonghwa-i256-qianli-p49-family-relation-primary-context-adequacy-review-v1' as const;

export type I256FamilyResidualCheckId =
  | 'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS'
  | 'CURRENT_METHOD_COMPATIBILITY';

export type I256FamilyResidualCheckDisposition =
  | 'UNRESOLVED_REQUIRES_NEW_RELATION_SPECIFIC_CONTEXT_EVIDENCE'
  | 'UNRESOLVED_REQUIRES_BROADER_METHOD_CONTEXT_OR_INDEPENDENT_COMPATIBLE_SOURCE';

export interface I256FamilyResidualCheckAssessment {
  checkId: I256FamilyResidualCheckId;
  satisfiedByI255: false;
  disposition: I256FamilyResidualCheckDisposition;
  sameP49ReinspectionMaySatisfyWithoutNewEvidenceSurface: false;
  requirement: string;
  evidenceBoundary: string;
}

export const I256_QIANLI_P49_FAMILY_RESIDUAL_CHECK_ASSESSMENTS = Object.freeze([
  Object.freeze({
    checkId: 'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS' as const,
    satisfiedByI255: false as const,
    disposition: 'UNRESOLVED_REQUIRES_NEW_RELATION_SPECIFIC_CONTEXT_EVIDENCE' as const,
    sameP49ReinspectionMaySatisfyWithoutNewEvidenceSurface: false as const,
    requirement:
      'A source-explicit limit, exception, or applicability condition must govern the named 殺印相生 / 傷食生財 Career relation semantics themselves rather than being imported from a different section.',
    evidenceBoundary:
      'I255 directly inspected printed p.49 and found no relation-specific Career limit/exception in the rendered context. The preceding 性情 disclaimer terminates before 事業 and may not be transferred across the section boundary.',
  }),
  Object.freeze({
    checkId: 'CURRENT_METHOD_COMPATIBILITY' as const,
    satisfiedByI255: false as const,
    disposition: 'UNRESOLVED_REQUIRES_BROADER_METHOD_CONTEXT_OR_INDEPENDENT_COMPATIBLE_SOURCE' as const,
    sameP49ReinspectionMaySatisfyWithoutNewEvidenceSurface: false as const,
    requirement:
      'The relation-to-Career semantics must be shown compatible with the governed current method without importing historical strength/balance, 用神/喜忌, or automatic precedence assumptions.',
    evidenceBoundary:
      'I255 observed 身財兩停 in the same Career opening and therefore correctly refused to infer relation-pattern independence from historical strength/balance methodology. The direct p.49 syntax alone cannot establish current-method compatibility.',
  }),
] as const satisfies readonly I256FamilyResidualCheckAssessment[]);

export const I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_CONTROL_IDS = Object.freeze([
  'I256_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_I255_EVIDENCE_BOUNDARY',
  'I255_DIRECT_P49_STRUCTURE_EFFECT_DISTINCTION_IS_ACCEPTED_AS_ONE_SATISFIED_FAMILY_REQUIREMENT',
  'EXPLICIT_RELATION_SPECIFIC_LIMITS_OR_EXCEPTIONS_REMAIN_UNSATISFIED',
  'CURRENT_METHOD_COMPATIBILITY_REMAINS_UNSATISFIED_AND_MAY_NOT_BE_ASSUMED_FROM_P49_SYNTAX',
  'THE_XINGQING_DISCLAIMER_MAY_NOT_BE_TRANSFERRED_ACROSS_THE_SHIYE_SECTION_BOUNDARY',
  'SHEN_CAI_LIANG_TING_PREVENTS_ASSUMING_RELATION_PATTERN_INDEPENDENCE_FROM_STRENGTH_BALANCE_METHOD',
  'REPEATED_INSPECTION_OF_THE_SAME_P49_SURFACE_WITHOUT_NEW_CONTEXT_IS_NOT_AUTHORIZED_AS_PROGRESS',
  'FAMILY_REMEDIATION_NOW_REQUIRES_A_GENUINELY_NEW_EVIDENCE_SURFACE_FOR_THE_TWO_RESIDUAL_CHECKS',
  'FAMILY_COVERAGE_REMAINS_MATERIAL_PARTIAL_AND_IS_NOT_AUTHORITY_ADMISSION_OR_GAP_CLOSURE',
  'HISTORICAL_OCCUPATION_LABELS_WUBEI_AND_MAOQIAN_REMAIN_NON_MODERNIZED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport {
  reviewId: string;
  reviewVersion: typeof I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_VERSION;
  status:
    | 'RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW'
    | 'UPSTREAM_I255_BOUNDARY_INVALID';
  decision:
    | 'I255_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_ONLY_TWO_FAMILY_REQUIREMENTS_REMAIN_NEW_EVIDENCE_SURFACE_REQUIRED_NO_AUTHORITY_ADMISSION'
    | 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_REVIEW_NOT_ESTABLISHED';
  upstreamI255EvidenceId: string;
  exactI255BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE';
  familyRequirementCheckCount: 3;
  satisfiedFamilyRequirementCheckCount: 1 | 0;
  remainingFamilyRequirementCheckCount: 2 | 0;
  structureVersusSemanticEffectDistinctionSatisfied: boolean;
  residualCheckAssessments: readonly I256FamilyResidualCheckAssessment[];
  residualCheckAssessmentCount: 2 | 0;
  explicitRelationSpecificLimitsOrExceptionsSatisfied: false;
  currentMethodCompatibilitySatisfied: false;
  p49SourceLocalInspectionAdequateForOneRequirement: boolean;
  p49SourceLocalInspectionAdequateForFullFamilyRequirement: false;
  sameP49ReinspectionWithoutNewContextAuthorized: false;
  familyPathImmediatelyExecutableNow: false;
  familyPathWaitingForNewEvidenceSurface: boolean;
  requiredNewEvidenceSurfaces: readonly [
    'RELATION_SPECIFIC_LIMIT_OR_EXCEPTION_CONTEXT',
    'CURRENT_METHOD_COMPATIBILITY_CONTEXT_OR_INDEPENDENT_COMPATIBLE_SOURCE',
  ] | readonly [];
  accessMirrorProvenancePromoted: false;
  crossSectionDisclaimerTransferAuthorized: false;
  historicalOccupationModernizationAuthorized: false;
  authorityAdmissionReady: false;
  gapClosureReady: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  methodologyScopeExpandedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    adequacyReviewsCreated: 1 | 0;
    familyRequirementChecksSatisfied: 1 | 0;
    familyRequirementChecksRemaining: 2 | 0;
    immediatelyExecutableFamilyTasks: 0;
    familyTasksWaitingForNewEvidenceSurface: 1 | 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW'
    | 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW';
}

function contentAddressedI255IdentityValid(
  i255: I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport,
): boolean {
  const { evidenceId, ...material } = i255;
  return (
    evidenceId ===
    `i255_qianli_p49_family_relation_primary_context_adequacy_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactI255Accepted(i255: I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport): boolean {
  return (
    contentAddressedI255IdentityValid(i255) &&
    i255.evidenceVersion === I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE_VERSION &&
    i255.status === 'RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE' &&
    i255.decision ===
      'P49_DIRECT_CONTEXT_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_BUT_NOT_RELATION_SPECIFIC_LIMITS_OR_CURRENT_METHOD_COMPATIBILITY_FAMILY_GAP_REMAINS_MATERIAL_PARTIAL_NO_AUTHORITY_ADMISSION' &&
    i255.exactB25BoundaryAccepted &&
    i255.domain === 'career' &&
    i255.temporalScope === 'natal' &&
    i255.statusClass === 'research' &&
    i255.provenanceAuthority.workTitle === '韋千里命學講義' &&
    i255.provenanceAuthority.publicationYear === 1936 &&
    i255.provenanceAuthority.nlcIdentity === 'nlc:data_416,01jh000368,10155' &&
    i255.accessSurface.mayReplaceProvenanceAuthority === false &&
    i255.accessSurface.transcriptionAuthority === false &&
    i255.inspectedPage.printedPage === '49' &&
    i255.inspectedPage.pdfPageOneBased === 336 &&
    i255.inspectedPage.renderSucceeded &&
    i255.inspectedPage.careerHeadingObserved &&
    i255.directCareerRelationObservations.length === 2 &&
    i255.directCareerRelationObservations.every((observation) => observation.directStructureToEffectSyntaxObserved) &&
    i255.structureVersusSemanticEffectDistinctionSatisfied &&
    i255.explicitRelationSpecificCareerLimitsOrExceptionsObserved === false &&
    i255.precedingXingqingDisclaimerMayTransferToCareerRelationRule === false &&
    i255.samePageShenCaiLiangTingCareerAlternativeObserved &&
    i255.currentMethodCompatibilityEstablished === false &&
    i255.relationPatternIndependenceFromStrengthBalanceMethodEstablished === false &&
    i255.historicalOccupationModernizationAuthorized === false &&
    i255.familyRelationCoverageClass === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' &&
    i255.familyRelationPreviouslyMissingCheckCount === 3 &&
    i255.familyRelationNewlySatisfiedCheckCount === 1 &&
    i255.familyRelationRemainingMissingCheckCount === 2 &&
    deterministicContentHash(i255.remainingMissingChecks) ===
      deterministicContentHash(['EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS', 'CURRENT_METHOD_COMPATIBILITY']) &&
    i255.authorityAdmissionReady === false &&
    i255.gapClosureReady === false &&
    i255.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(i255.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    i255.controlCount === 12 &&
    i255.controlsFrozen &&
    deterministicContentHash(i255.controlIds) ===
      deterministicContentHash(I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTROL_IDS) &&
    i255.t8RuleAuthoringAuthorized === false &&
    i255.personalizedT8PackCreationAuthorized === false &&
    i255.productionPromotionAuthorized === false &&
    i255.productionImpact === 'NONE' &&
    i255.recommendedNextGate === 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW'
  );
}

function finalized(
  material: Omit<I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport, 'reviewId'>,
): I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport {
  return {
    reviewId: `i256_qianli_p49_family_relation_primary_context_adequacy_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(
  i255: I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport,
): I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport {
  const accepted = exactI255Accepted(i255);

  return finalized({
    reviewVersion: I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW'
      : 'UPSTREAM_I255_BOUNDARY_INVALID',
    decision: accepted
      ? 'I255_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_ONLY_TWO_FAMILY_REQUIREMENTS_REMAIN_NEW_EVIDENCE_SURFACE_REQUIRED_NO_AUTHORITY_ADMISSION'
      : 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_REVIEW_NOT_ESTABLISHED',
    upstreamI255EvidenceId: i255.evidenceId,
    exactI255BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    familyRequirementCheckCount: 3,
    satisfiedFamilyRequirementCheckCount: accepted ? 1 : 0,
    remainingFamilyRequirementCheckCount: accepted ? 2 : 0,
    structureVersusSemanticEffectDistinctionSatisfied: accepted,
    residualCheckAssessments: accepted ? I256_QIANLI_P49_FAMILY_RESIDUAL_CHECK_ASSESSMENTS : Object.freeze([]),
    residualCheckAssessmentCount: accepted ? 2 : 0,
    explicitRelationSpecificLimitsOrExceptionsSatisfied: false,
    currentMethodCompatibilitySatisfied: false,
    p49SourceLocalInspectionAdequateForOneRequirement: accepted,
    p49SourceLocalInspectionAdequateForFullFamilyRequirement: false,
    sameP49ReinspectionWithoutNewContextAuthorized: false,
    familyPathImmediatelyExecutableNow: false,
    familyPathWaitingForNewEvidenceSurface: accepted,
    requiredNewEvidenceSurfaces: accepted
      ? [
          'RELATION_SPECIFIC_LIMIT_OR_EXCEPTION_CONTEXT',
          'CURRENT_METHOD_COMPATIBILITY_CONTEXT_OR_INDEPENDENT_COMPATIBLE_SOURCE',
        ]
      : Object.freeze([]),
    accessMirrorProvenancePromoted: false,
    crossSectionDisclaimerTransferAuthorized: false,
    historicalOccupationModernizationAuthorized: false,
    authorityAdmissionReady: false,
    gapClosureReady: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyScopeExpandedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted
      ? I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      adequacyReviewsCreated: accepted ? 1 : 0,
      familyRequirementChecksSatisfied: accepted ? 1 : 0,
      familyRequirementChecksRemaining: accepted ? 2 : 0,
      immediatelyExecutableFamilyTasks: 0,
      familyTasksWaitingForNewEvidenceSurface: accepted ? 1 : 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW'
      : 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW',
  });
}
