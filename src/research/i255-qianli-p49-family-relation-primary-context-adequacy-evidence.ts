import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW_VERSION,
  CAREER_T8_B25_CONTINUATION_READINESS_CONTROL_IDS,
  CAREER_T8_B25_CONTINUATION_TASKS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport,
} from './career-personalization-t8-current-method-residual-authority-targeted-remediation-continuation-readiness-review.js';
import { I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION } from './i253-qianli-primary-witness-provenance-correction-evidence.js';

export const I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE_VERSION =
  'myeonghwa-i255-qianli-p49-family-relation-primary-context-adequacy-evidence-v1' as const;

export const I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTROL_IDS = Object.freeze([
  'I255_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B25_CONTINUATION_READINESS_BOUNDARY',
  'PROVENANCE_AUTHORITY_REMAINS_THE_I253_CORRECTED_1936_NLC_WITNESS_NOT_THE_ACCESS_MIRROR',
  'THE_WIKIMEDIA_FILE_IS_USED_ONLY_AS_A_MECHANICAL_SCAN_ACCESS_SURFACE_FOR_THE_ALREADY_BOUND_NLC_WITNESS',
  'PRINTED_P49_PDF_P336_IS_DIRECTLY_RENDERED_AND_THE_CAREER_SECTION_OPENING_IS_VISIBLE',
  'SALYIN_XIANGSHENG_AND_SHANGSHI_SHENGCAI_ARE_DIRECTLY_SEPARATED_FROM_THEIR_YI_CAREER_EFFECT_PHRASES',
  'THE_DIRECT_STRUCTURE_TO_EFFECT_SYNTAX_SATISFIES_STRUCTURE_VERSUS_SEMANTIC_EFFECT_DISTINCTION_ONLY',
  'THE_PRECEDING_XINGQING_DISCLAIMER_ENDS_BEFORE_THE_SHIYE_HEADING_AND_MAY_NOT_BE_TRANSFERRED_AS_A_CAREER_EXCEPTION_RULE',
  'NO_RELATION_SPECIFIC_CAREER_LIMIT_OR_EXCEPTION_IS_OBSERVED_ON_THE_DIRECTLY_RENDERED_P49_CONTEXT',
  'SAME_PAGE_CAREER_TEXT_ALSO_USES_SHEN_CAI_LIANG_TING_SO_CURRENT_METHOD_COMPATIBILITY_MAY_NOT_BE_ASSUMED',
  'HISTORICAL_OCCUPATION_LABELS_WUBEI_AND_MAOQIAN_MAY_NOT_BE_MODERNIZED_AUTOMATICALLY',
  'FAMILY_RELATION_COVERAGE_REMAINS_MATERIAL_PARTIAL_NO_AUTHORITY_ADMISSION_OR_GAP_CLOSURE',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE'
    | 'UPSTREAM_B25_BOUNDARY_INVALID';
  decision:
    | 'P49_DIRECT_CONTEXT_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_BUT_NOT_RELATION_SPECIFIC_LIMITS_OR_CURRENT_METHOD_COMPATIBILITY_FAMILY_GAP_REMAINS_MATERIAL_PARTIAL_NO_AUTHORITY_ADMISSION'
    | 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_NOT_ESTABLISHED';
  upstreamB25ReviewId: string;
  exactB25BoundaryAccepted: boolean;
  upstreamI253EvidenceVersion: typeof I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  provenanceAuthority: {
    workTitle: '韋千里命學講義';
    author: '韋千里';
    publisher: '韋氏命苑';
    publicationYear: 1936;
    nlcIdentity: 'nlc:data_416,01jh000368,10155';
    primaryPdfPageCount: 368;
  };
  accessSurface: {
    kind: 'MECHANICAL_SCAN_MIRROR_OF_ALREADY_BOUND_NLC_WITNESS';
    provider: 'Wikimedia Commons';
    fileIdentity: 'NLC416-01jh000368-10155 韋千里命學講義.pdf';
    pageCountObserved: 368;
    mayReplaceProvenanceAuthority: false;
    transcriptionAuthority: false;
  };
  inspectedPage: {
    printedPage: '49';
    pdfPageOneBased: 336;
    pdfPageZeroBased: 335;
    renderSucceeded: boolean;
    printedPageMarkerObserved: boolean;
    careerHeadingObserved: boolean;
    precedingSectionHeadingContext: '性情';
  };
  directCareerRelationObservations: readonly [
    {
      structuralPattern: '殺印相生';
      semanticMarker: '宜';
      historicalCareerLabel: '武備';
      directStructureToEffectSyntaxObserved: boolean;
    },
    {
      structuralPattern: '傷食生財';
      semanticMarker: '宜';
      historicalCareerLabel: '貿遷';
      directStructureToEffectSyntaxObserved: boolean;
    },
  ];
  structureVersusSemanticEffectDistinctionSatisfied: boolean;
  explicitRelationSpecificCareerLimitsOrExceptionsObserved: false;
  precedingXingqingGeneralDisclaimerObserved: boolean;
  precedingXingqingDisclaimerMayTransferToCareerRelationRule: false;
  samePageShenCaiLiangTingCareerAlternativeObserved: boolean;
  currentMethodCompatibilityEstablished: false;
  relationPatternIndependenceFromStrengthBalanceMethodEstablished: false;
  historicalOccupationModernizationAuthorized: false;
  familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE';
  familyRelationPreviouslyMissingCheckCount: 3 | 0;
  familyRelationNewlySatisfiedCheckCount: 1 | 0;
  familyRelationRemainingMissingCheckCount: 2 | 0;
  remainingMissingChecks: readonly [
    'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
    'CURRENT_METHOD_COMPATIBILITY',
  ] | readonly [];
  authorityAdmissionReady: false;
  gapClosureReady: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  methodologyScopeExpandedByThisGate: false;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    primaryPagesReinspected: 1 | 0;
    familyAdequacyChecksNewlySatisfied: 1 | 0;
    familyAdequacyChecksRemaining: 2 | 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW';
}

function contentAddressedB25IdentityValid(
  b25: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b25;
  return (
    reviewId ===
    `career_t8_current_method_residual_authority_targeted_remediation_continuation_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB25Accepted(
  b25: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport,
): boolean {
  const executableTasks = b25.tasks.filter((task) => task.immediatelyExecutable);
  return (
    contentAddressedB25IdentityValid(b25) &&
    b25.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW_VERSION &&
    b25.status ===
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS' &&
    b25.decision ===
      'FOUR_ACTIVE_PATHS_TRACKED_ONLY_QIANLI_P49_CONTEXT_EXECUTABLE_THREE_PATHS_WAIT_FOR_NEW_EVIDENCE_SURFACES_SEASON_VISIBILITY_PLURALITY_UNCONSUMED_CONFLICT_DEFERRED_NO_AUTHORITY_ADMISSION' &&
    b25.exactB24BoundaryAccepted &&
    b25.domain === 'career' &&
    b25.temporalScope === 'natal' &&
    b25.statusClass === 'research' &&
    b25.taskCount === 4 &&
    deterministicContentHash(b25.tasks) === deterministicContentHash(CAREER_T8_B25_CONTINUATION_TASKS) &&
    b25.immediatelyExecutableTaskCount === 1 &&
    b25.evidenceSurfaceBlockedTaskCount === 3 &&
    executableTasks.length === 1 &&
    executableTasks[0]?.taskId === 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTINUATION' &&
    b25.onlyFamilyPrimaryContextExecutableNow &&
    b25.qinWaitingForNewBodyAccessSurface &&
    b25.branchClashWaitingForNewSingleSourceCandidate &&
    b25.positionWaitingForNewSpecificT5Bridge &&
    b25.visibilityConsumedByCurrentContinuation === false &&
    b25.pluralityConsumedByCurrentContinuation === false &&
    b25.pluralityHeldUnderI254 &&
    b25.seasonalConsumedByCurrentContinuation === false &&
    b25.seasonalConditionalRemediationActivated === false &&
    b25.conflictPolicyRemediationActivated === false &&
    b25.broadSearchRestartAuthorized === false &&
    b25.repeatedNegativeSearchAuthorized === false &&
    b25.crossSourceRequirementStitchingAuthorized === false &&
    b25.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b25.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b25.authorityAdmittedByThisGate === false &&
    b25.authorityGapClosedByThisGate === false &&
    b25.controlCount === 12 &&
    b25.controlsFrozen &&
    deterministicContentHash(b25.controlIds) === deterministicContentHash(CAREER_T8_B25_CONTINUATION_READINESS_CONTROL_IDS) &&
    b25.t8RuleAuthoringAuthorized === false &&
    b25.personalizedT8PackCreationAuthorized === false &&
    b25.productionPromotionAuthorized === false &&
    b25.productionImpact === 'NONE' &&
    b25.recommendedNextGate === 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE'
  );
}

function finalized(
  material: Omit<I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport, 'evidenceId'>,
): I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport {
  return {
    evidenceId: `i255_qianli_p49_family_relation_primary_context_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(
  b25: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport,
): I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport {
  const accepted = exactB25Accepted(b25);

  return finalized({
    evidenceVersion: I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE'
      : 'UPSTREAM_B25_BOUNDARY_INVALID',
    decision: accepted
      ? 'P49_DIRECT_CONTEXT_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_BUT_NOT_RELATION_SPECIFIC_LIMITS_OR_CURRENT_METHOD_COMPATIBILITY_FAMILY_GAP_REMAINS_MATERIAL_PARTIAL_NO_AUTHORITY_ADMISSION'
      : 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_NOT_ESTABLISHED',
    upstreamB25ReviewId: b25.reviewId,
    exactB25BoundaryAccepted: accepted,
    upstreamI253EvidenceVersion: I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    provenanceAuthority: {
      workTitle: '韋千里命學講義',
      author: '韋千里',
      publisher: '韋氏命苑',
      publicationYear: 1936,
      nlcIdentity: 'nlc:data_416,01jh000368,10155',
      primaryPdfPageCount: 368,
    },
    accessSurface: {
      kind: 'MECHANICAL_SCAN_MIRROR_OF_ALREADY_BOUND_NLC_WITNESS',
      provider: 'Wikimedia Commons',
      fileIdentity: 'NLC416-01jh000368-10155 韋千里命學講義.pdf',
      pageCountObserved: 368,
      mayReplaceProvenanceAuthority: false,
      transcriptionAuthority: false,
    },
    inspectedPage: {
      printedPage: '49',
      pdfPageOneBased: 336,
      pdfPageZeroBased: 335,
      renderSucceeded: accepted,
      printedPageMarkerObserved: accepted,
      careerHeadingObserved: accepted,
      precedingSectionHeadingContext: '性情',
    },
    directCareerRelationObservations: [
      {
        structuralPattern: '殺印相生',
        semanticMarker: '宜',
        historicalCareerLabel: '武備',
        directStructureToEffectSyntaxObserved: accepted,
      },
      {
        structuralPattern: '傷食生財',
        semanticMarker: '宜',
        historicalCareerLabel: '貿遷',
        directStructureToEffectSyntaxObserved: accepted,
      },
    ],
    structureVersusSemanticEffectDistinctionSatisfied: accepted,
    explicitRelationSpecificCareerLimitsOrExceptionsObserved: false,
    precedingXingqingGeneralDisclaimerObserved: accepted,
    precedingXingqingDisclaimerMayTransferToCareerRelationRule: false,
    samePageShenCaiLiangTingCareerAlternativeObserved: accepted,
    currentMethodCompatibilityEstablished: false,
    relationPatternIndependenceFromStrengthBalanceMethodEstablished: false,
    historicalOccupationModernizationAuthorized: false,
    familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    familyRelationPreviouslyMissingCheckCount: accepted ? 3 : 0,
    familyRelationNewlySatisfiedCheckCount: accepted ? 1 : 0,
    familyRelationRemainingMissingCheckCount: accepted ? 2 : 0,
    remainingMissingChecks: accepted
      ? ['EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS', 'CURRENT_METHOD_COMPATIBILITY']
      : Object.freeze([]),
    authorityAdmissionReady: false,
    gapClosureReady: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    methodologyScopeExpandedByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      primaryPagesReinspected: accepted ? 1 : 0,
      familyAdequacyChecksNewlySatisfied: accepted ? 1 : 0,
      familyAdequacyChecksRemaining: accepted ? 2 : 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW',
  });
}
