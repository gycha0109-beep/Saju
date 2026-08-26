import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_TASKS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport,
  type CareerT8TargetedRemediationEvidenceCheckId,
} from './career-personalization-t8-current-method-residual-authority-targeted-remediation-readiness-review.js';
import { I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION } from './i253-qianli-primary-witness-provenance-correction-evidence.js';
import { I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION } from './i254-qianli-season-plurality-primary-page-binding-hold-record.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-targeted-remediation-evidence-v1' as const;

export type CareerT8B23ActiveTaskId =
  | 'QIN_LUNSHI_P464_BODY_ACQUISITION'
  | 'T5_FAMILY_RELATION_DIRECT_CAREER_SOURCE_DISCOVERY'
  | 'T6_BRANCH_CLASH_TO_T5_SEMANTIC_BINDING_SOURCE_DISCOVERY'
  | 'T6_POSITION_VISIBILITY_PLURALITY_CURRENT_METHOD_SOURCE_DISCOVERY';

export type CareerT8B23EvidenceRecordId =
  | 'QIN_LUNSHI_P464_BODY_TARGETED_ATTEMPT'
  | 'QIANLI_1936_P49_FAMILY_RELATION_CAREER_PRIMARY_EVALUATION'
  | 'BRANCH_CLASH_TO_SPECIFIC_T5_CAREER_MODIFIER_TARGETED_ATTEMPT'
  | 'POSITION_VISIBILITY_PLURALITY_TO_T5_CAREER_TARGETED_ATTEMPT';

export type CareerT8B23EvidenceCoverageClass =
  | 'LEAD_ONLY'
  | 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE'
  | 'NO_NEW_REQUIREMENT_COVERAGE';

export type CareerT8B23EvidenceDisposition =
  | 'BODY_NOT_ACQUIRED_FAIL_CLOSED'
  | 'PRIMARY_BOUND_MATERIAL_PARTIAL_ONLY'
  | 'NO_QUALIFYING_SINGLE_SOURCE_BRIDGE_FOUND'
  | 'POSITION_PARTIAL_VISIBILITY_UNBOUND_PLURALITY_HELD';

export interface CareerT8B23TargetedEvidenceRecord {
  recordId: CareerT8B23EvidenceRecordId;
  taskId: CareerT8B23ActiveTaskId;
  targetGapId: CareerT8SynthesisAuthorityGapId;
  sourceIdentity: string;
  sourceLocator: string;
  acquisitionSurface: string;
  disposition: CareerT8B23EvidenceDisposition;
  coverageClass: CareerT8B23EvidenceCoverageClass;
  exactSourceIdentityConfirmed: boolean;
  stableReproducibleLocatorConfirmed: boolean;
  originalOrVerifiedLocalContextInspected: boolean;
  independentNormativeProvenanceConfirmed: boolean;
  explicitCareerOrWorkSemanticBindingObserved: boolean;
  currentMethodCompatibilityEstablished: boolean;
  explicitContextLimitsOrExceptionsObserved: boolean;
  specificCurrentT5CareerSemanticModifierBindingObserved: boolean;
  newEvidenceSinceB22: boolean;
  newPassageAcquiredByB23: boolean;
  satisfiedCheckIds: readonly CareerT8TargetedRemediationEvidenceCheckId[];
  unsatisfiedCheckIds: readonly CareerT8TargetedRemediationEvidenceCheckId[];
  crossSourceStitchingUsed: false;
  relativeForceOrAutomaticPrecedenceImported: false;
  historicalOccupationModernized: false;
  qualifyingAuthorityCandidate: false;
  authorityAdmissionAuthorized: false;
  gapClosureAuthorized: false;
  t8AuthoringAuthorized: false;
  evidenceNote: string;
}

export const CAREER_T8_B23_TARGETED_EVIDENCE_RECORDS = Object.freeze([
  Object.freeze({
    recordId: 'QIN_LUNSHI_P464_BODY_TARGETED_ATTEMPT',
    taskId: 'QIN_LUNSHI_P464_BODY_ACQUISITION',
    targetGapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    sourceIdentity:
      '秦倫詩, 中國易學博覽·八字應用經驗學, 內蒙古人民出版社, 2010, ISBN 9787204098774',
    sourceLocator:
      'printed p.464, 第十八章 職業篇, 第三節 按十神組合選職業; public bibliographic and searchable mirror surfaces rechecked 2026-08-26',
    acquisitionSurface:
      'Independent current bibliographic surfaces confirm ISBN 9787204098774 and public searchable mirrors reproduce the p.464 section heading. The p.464 section body and sufficient surrounding local text could not be directly acquired and inspected during the targeted attempt; a public mirror download attempt remained unavailable. The historical B20 typo 9787504098774 is not carried forward.',
    disposition: 'BODY_NOT_ACQUIRED_FAIL_CLOSED',
    coverageClass: 'LEAD_ONLY',
    exactSourceIdentityConfirmed: true,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: false,
    independentNormativeProvenanceConfirmed: true,
    explicitCareerOrWorkSemanticBindingObserved: true,
    currentMethodCompatibilityEstablished: false,
    explicitContextLimitsOrExceptionsObserved: false,
    specificCurrentT5CareerSemanticModifierBindingObserved: false,
    newEvidenceSinceB22: false,
    newPassageAcquiredByB23: false,
    satisfiedCheckIds: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING',
    ] as const),
    unsatisfiedCheckIds: Object.freeze([
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'EXACT_TEN_GOD_SUBTYPE_ROLE_PRESERVATION',
      'DIRECT_MULTI_CLAIM_CAREER_COMPOSITION',
      'DEPENDENCY_ON_WANGSHUAI_GEJU_YONGSHEN_XIJI_INVENTORY',
    ] as const),
    crossSourceStitchingUsed: false,
    relativeForceOrAutomaticPrecedenceImported: false,
    historicalOccupationModernized: false,
    qualifyingAuthorityCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    t8AuthoringAuthorized: false,
    evidenceNote:
      'B22 already corrected the canonical ISBN target to 9787204098774. B23 preserves the negative acquisition outcome: a table-of-contents heading and bibliographic confirmation cannot replace direct inspection of the p.464 body. The exact subtype, composition, dependency, exception, and method-compatibility checks therefore remain unsatisfied.',
  }),
  Object.freeze({
    recordId: 'QIANLI_1936_P49_FAMILY_RELATION_CAREER_PRIMARY_EVALUATION',
    taskId: 'T5_FAMILY_RELATION_DIRECT_CAREER_SOURCE_DISCOVERY',
    targetGapId: 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    sourceIdentity: '韋千里, 韋千里命學講義, 韋氏命苑, 1936; NLC nlc:data_416,01jh000368,10155',
    sourceLocator: 'corrected 1936 NLC primary scan, printed p.49 / PDF p.336, section 事業',
    acquisitionSurface:
      'I253 directly inspected the corrected primary page and recorded named Ten-God relation patterns under 事業, including 殺印相生 → 宜武備 and 傷食生財 → 宜貿遷. B23 evaluates that primary-bound passage against the B22 family-relation evidence contract without modernizing the historical occupation labels.',
    disposition: 'PRIMARY_BOUND_MATERIAL_PARTIAL_ONLY',
    coverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    exactSourceIdentityConfirmed: true,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: true,
    independentNormativeProvenanceConfirmed: true,
    explicitCareerOrWorkSemanticBindingObserved: true,
    currentMethodCompatibilityEstablished: false,
    explicitContextLimitsOrExceptionsObserved: false,
    specificCurrentT5CareerSemanticModifierBindingObserved: false,
    newEvidenceSinceB22: true,
    newPassageAcquiredByB23: false,
    satisfiedCheckIds: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING',
      'NAMED_TEN_GOD_FAMILY_RELATION_BINDING',
    ] as const),
    unsatisfiedCheckIds: Object.freeze([
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'STRUCTURE_VERSUS_SEMANTIC_EFFECT_DISTINCTION',
    ] as const),
    crossSourceStitchingUsed: false,
    relativeForceOrAutomaticPrecedenceImported: false,
    historicalOccupationModernized: false,
    qualifyingAuthorityCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    t8AuthoringAuthorized: false,
    evidenceNote:
      'This materially advances the family-relation gap from no direct evidence to primary-bound partial coverage. It does not by itself state the B22-required limits/exceptions, establish compatibility with the governed current method, or explicitly separate structural relation presence from the semantic Career effect. No modern 武備/貿遷 occupation mapping is inferred.',
  }),
  Object.freeze({
    recordId: 'BRANCH_CLASH_TO_SPECIFIC_T5_CAREER_MODIFIER_TARGETED_ATTEMPT',
    taskId: 'T6_BRANCH_CLASH_TO_T5_SEMANTIC_BINDING_SOURCE_DISCOVERY',
    targetGapId: 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    sourceIdentity:
      'Existing bounded anchors: 徐丙昕, 四柱學教程 (2009) for clash-to-Career; 韋千里命學講義 (1936) p.14 for relation-local 支冲 hidden-stem interaction',
    sourceLocator:
      'Xu 2009 published full-text section 地支六沖; Qianli 1936 NLC printed p.14 / PDF p.301; targeted current-method bridge search rechecked 2026-08-26',
    acquisitionSurface:
      'Xu remains direct clash-to-Career partial evidence and Qianli p.14 remains direct relation-local 支冲 evidence. Targeted re-search exposed derivative or scope-mismatched examples but did not acquire one independently adequate source passage that binds an identified clash and participants to a specific governed current-T5 Career semantic with an explicit qualitative modification mode and exceptions.',
    disposition: 'NO_QUALIFYING_SINGLE_SOURCE_BRIDGE_FOUND',
    coverageClass: 'NO_NEW_REQUIREMENT_COVERAGE',
    exactSourceIdentityConfirmed: true,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: true,
    independentNormativeProvenanceConfirmed: true,
    explicitCareerOrWorkSemanticBindingObserved: true,
    currentMethodCompatibilityEstablished: false,
    explicitContextLimitsOrExceptionsObserved: false,
    specificCurrentT5CareerSemanticModifierBindingObserved: false,
    newEvidenceSinceB22: false,
    newPassageAcquiredByB23: false,
    satisfiedCheckIds: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING',
      'RELATION_LOCAL_BRANCH_CLASH_PARTICIPANT_BINDING',
    ] as const),
    unsatisfiedCheckIds: Object.freeze([
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING',
      'QUALITATIVE_MODIFICATION_MODE_SOURCE_EXPLICIT',
      'NO_RELATIVE_FORCE_WEIGHTING_OR_PRECEDENCE_IMPORT',
    ] as const),
    crossSourceStitchingUsed: false,
    relativeForceOrAutomaticPrecedenceImported: false,
    historicalOccupationModernized: false,
    qualifyingAuthorityCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    t8AuthoringAuthorized: false,
    evidenceNote:
      'The two strong anchors answer different questions. B22 forbids stitching Qianli relation-local mechanics to Xu Career semantics to invent the missing current-T5 modifier bridge. Xu also contains relative-force/method dependencies that may not be imported. The gap therefore receives no new requirement coverage in B23.',
  }),
  Object.freeze({
    recordId: 'POSITION_VISIBILITY_PLURALITY_TO_T5_CAREER_TARGETED_ATTEMPT',
    taskId: 'T6_POSITION_VISIBILITY_PLURALITY_CURRENT_METHOD_SOURCE_DISCOVERY',
    targetGapId: 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    sourceIdentity:
      'Existing bounded anchors: 徐丙昕, 四柱學教程 (2009) for qualitative position/separation Career evidence; 韋千里命學講義 (1936) p.14 for 明暗/地位; I254 hold for unresolved plurality primary binding',
    sourceLocator:
      'Xu 2009 地支六沖 section; Qianli 1936 NLC printed p.14 / PDF p.301; I254 corrected 1936 continuation-page hold',
    acquisitionSurface:
      'Position remains materially anchored only at a general clash-to-Career level in Xu. Qianli p.14 directly verifies 明暗 and 地位 but not a Career/current-T5 semantic effect. I254 explicitly keeps 多寡 unavailable as corrected primary authority and allows B23 to continue only with season/plurality excluded. No source-bound specific current-T5 modifier bridge was acquired for position or visibility.',
    disposition: 'POSITION_PARTIAL_VISIBILITY_UNBOUND_PLURALITY_HELD',
    coverageClass: 'NO_NEW_REQUIREMENT_COVERAGE',
    exactSourceIdentityConfirmed: true,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: true,
    independentNormativeProvenanceConfirmed: true,
    explicitCareerOrWorkSemanticBindingObserved: true,
    currentMethodCompatibilityEstablished: false,
    explicitContextLimitsOrExceptionsObserved: false,
    specificCurrentT5CareerSemanticModifierBindingObserved: false,
    newEvidenceSinceB22: true,
    newPassageAcquiredByB23: false,
    satisfiedCheckIds: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'POSITION_CAREER_BINDING',
    ] as const),
    unsatisfiedCheckIds: Object.freeze([
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'VISIBILITY_CAREER_BINDING_IF_CONSUMED',
      'PLURALITY_CAREER_BINDING_IF_CONSUMED',
      'SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING',
      'NO_RELATIVE_FORCE_WEIGHTING_OR_PRECEDENCE_IMPORT',
    ] as const),
    crossSourceStitchingUsed: false,
    relativeForceOrAutomaticPrecedenceImported: false,
    historicalOccupationModernized: false,
    qualifyingAuthorityCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    t8AuthoringAuthorized: false,
    evidenceNote:
      'B23 preserves dimensions separately. Position partial evidence cannot substitute for visibility. Qianli generic 明暗/地位 cannot be stitched to a separate Career passage to create a Career modifier. Plurality is held by I254 rather than silently inferred from transcription. This task therefore remains unresolved.',
  }),
] as const satisfies readonly CareerT8B23TargetedEvidenceRecord[]);

export const CAREER_T8_B23_TARGETED_REMEDIATION_EVIDENCE_CONTROL_IDS = Object.freeze([
  'B23_CONSUMES_ONLY_EXACT_B22_TARGETED_REMEDIATION_READINESS',
  'ONLY_THE_FOUR_B22_EXECUTABLE_TASKS_ARE_EVALUATED_BY_B23',
  'B20_QIN_ISBN_TYPO_9787504098774_IS_PRESERVED_HISTORICALLY_BUT_NOT_CARRIED_FORWARD',
  'CANONICAL_QIN_TARGET_IS_9787204098774_AND_P464_BODY_REMAINS_NOT_ACQUIRED',
  'QIN_TOC_OR_SEARCHABLE_MIRROR_HEADING_MAY_NOT_SUBSTITUTE_FOR_P464_BODY_CONTEXT',
  'I253_QIANLI_P49_PRIMARY_CANDIDATE_MATERIALLY_ADVANCES_FAMILY_RELATION_COVERAGE_WITHOUT_AUTHORITY_ADMISSION',
  'QIANLI_HISTORICAL_OCCUPATION_LABELS_ARE_NOT_MODERNIZED_AND_LIMITS_METHOD_COMPATIBILITY_REMAIN_UNRESOLVED',
  'QIANLI_P14_AND_XU_CAREER_EVIDENCE_MAY_NOT_BE_CROSS_SOURCE_STITCHED_INTO_A_BRANCH_CLASH_T5_MODIFIER',
  'POSITION_VISIBILITY_AND_PLURALITY_REMAIN_SEPARATE_AND_MAY_NOT_SUBSTITUTE_FOR_ONE_ANOTHER',
  'I254_PLURALITY_AND_SEASON_HOLD_IS_PRESERVED_AND_CONDITIONAL_SEASONAL_REMEDIATION_IS_NOT_ACTIVATED',
  'NO_RELATIVE_FORCE_NUMERIC_WEIGHT_PRECEDENCE_WINNER_DAMAGE_OR_CONFLICT_POLICY_IS_IMPORTED',
  'ALL_SIX_GAPS_REMAIN_OPEN_NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE'
    | 'UPSTREAM_B22_BOUNDARY_INVALID';
  decision:
    | 'FOUR_ACTIVE_TASKS_EVALUATED_FAMILY_RELATION_ADVANCED_TO_MATERIAL_PARTIAL_QIN_BODY_AND_TWO_T6_BRIDGES_REMAIN_UNSATISFIED_SEASON_PLURALITY_EXCLUDED_NO_AUTHORITY_ADMISSION'
    | 'TARGETED_REMEDIATION_EVIDENCE_NOT_ESTABLISHED';
  upstreamB22ReviewId: string;
  exactB22BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  upstreamI253EvidenceVersion: typeof I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION;
  upstreamI254HoldVersion: typeof I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION;
  historicalB20QinIsbnRetainedAsAuditRecord: '9787504098774';
  canonicalQinIsbn: '9787204098774';
  historicalB20ArtifactRewritten: false;
  records: readonly CareerT8B23TargetedEvidenceRecord[];
  recordCount: 4 | 0;
  evaluatedActiveTaskCount: 4 | 0;
  familyRelationCoverageAdvancedFromNone: boolean;
  familyRelationCoverageNow: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' | 'NONE';
  familyRelationAuthorityAdmitted: false;
  qinP464BodyAcquired: false;
  qinP464BodyStillRequired: boolean;
  branchClashSpecificT5ModifierBridgeAcquired: false;
  positionSpecificT5ModifierBridgeAcquired: false;
  visibilityCareerBindingAcquired: false;
  pluralityCareerBindingAcquired: false;
  pluralityExplicitlyExcludedByI254: boolean;
  seasonalCareerDimensionConsumed: false;
  conditionalSeasonalRemediationActivated: false;
  conflictPolicyTaskActivated: false;
  crossSourceRequirementStitchingUsed: false;
  relativeForceOrAutomaticPrecedenceImported: false;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  methodologyChoiceMadeByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B23_TARGETED_REMEDIATION_EVIDENCE_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    targetedTaskEvaluationsPerformed: 4 | 0;
    targetedEvidenceRecordsCreated: 4 | 0;
    gapsMateriallyAdvancedWithoutClosure: 1 | 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW';
}

function contentAddressedB22IdentityValid(
  b22: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b22;
  return (
    reviewId ===
    `career_t8_current_method_residual_authority_targeted_remediation_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB22Accepted(
  b22: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport,
): boolean {
  const executableTaskIds = b22.tasks
    .filter((task) => task.executionAuthorizedForNextGate)
    .map((task) => task.taskId);

  return (
    contentAddressedB22IdentityValid(b22) &&
    b22.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW_VERSION &&
    b22.status === 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS' &&
    b22.decision ===
      'FOUR_TARGETED_REMEDIATION_TASKS_EXECUTABLE_ONE_CONDITIONAL_ONE_PACK_DEFERRED_NO_ACQUISITION_OR_AUTHORITY_ADMISSION' &&
    b22.exactB21BoundaryAccepted &&
    b22.domain === 'career' &&
    b22.temporalScope === 'natal' &&
    b22.statusClass === 'research' &&
    b22.taskCount === 6 &&
    b22.executableTaskCount === 4 &&
    b22.conditionalTaskCount === 1 &&
    b22.deferredTaskCount === 1 &&
    deterministicContentHash(b22.tasks) === deterministicContentHash(CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_TASKS) &&
    deterministicContentHash(executableTaskIds) ===
      deterministicContentHash([
        'QIN_LUNSHI_P464_BODY_ACQUISITION',
        'T5_FAMILY_RELATION_DIRECT_CAREER_SOURCE_DISCOVERY',
        'T6_BRANCH_CLASH_TO_T5_SEMANTIC_BINDING_SOURCE_DISCOVERY',
        'T6_POSITION_VISIBILITY_PLURALITY_CURRENT_METHOD_SOURCE_DISCOVERY',
      ]) &&
    b22.allB21RemediationPathsRepresentedExactlyOnce &&
    b22.targetedEvidenceAcquisitionAuthorizedForNextGate &&
    b22.broadDiscoveryLoopAuthorized === false &&
    b22.broadCurrentMethodSearchRestartAuthorized === false &&
    b22.crossSourceRequirementStitchingAuthorized === false &&
    b22.qinP464TargetFrozen &&
    b22.qinTableOfContentsMaySatisfyPassageRequirement === false &&
    b22.xuAnchorUseBoundedToExistingPartialEvidence &&
    b22.positionVisibilityPluralityMayUseSeparateSourceBoundEvidence &&
    b22.seasonalTaskExecutableNow === false &&
    b22.conflictPolicyTaskExecutableNow === false &&
    b22.successfulAcquisitionRequiresLaterAdequacyReview &&
    b22.successfulAcquisitionRequiresLaterAuthorityAdmissionReview &&
    b22.allSixGapsRemainOpen &&
    deterministicContentHash(b22.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b22.authorityAdmittedByThisGate === false &&
    b22.authorityGapClosedByThisGate === false &&
    b22.methodologyChoiceMadeByThisGate === false &&
    b22.controlCount === 12 &&
    b22.controlsFrozen &&
    deterministicContentHash(b22.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_READINESS_CONTROL_IDS) &&
    b22.t8RuleAuthoringAuthorized === false &&
    b22.t8ClaimTypeCreationAuthorized === false &&
    b22.personalizedT8PackCreationAuthorized === false &&
    b22.consumerNarrativeAuthorized === false &&
    b22.previewDefaultSwitchAuthorized === false &&
    b22.productionPromotionAuthorized === false &&
    b22.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE'
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport {
  return {
    evidenceId: `career_t8_current_method_residual_authority_targeted_remediation_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(
  b22: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport {
  const accepted = exactB22Accepted(b22);

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE'
      : 'UPSTREAM_B22_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_ACTIVE_TASKS_EVALUATED_FAMILY_RELATION_ADVANCED_TO_MATERIAL_PARTIAL_QIN_BODY_AND_TWO_T6_BRIDGES_REMAIN_UNSATISFIED_SEASON_PLURALITY_EXCLUDED_NO_AUTHORITY_ADMISSION'
      : 'TARGETED_REMEDIATION_EVIDENCE_NOT_ESTABLISHED',
    upstreamB22ReviewId: b22.reviewId,
    exactB22BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    upstreamI253EvidenceVersion: I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION,
    upstreamI254HoldVersion: I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION,
    historicalB20QinIsbnRetainedAsAuditRecord: '9787504098774',
    canonicalQinIsbn: '9787204098774',
    historicalB20ArtifactRewritten: false,
    records: accepted ? CAREER_T8_B23_TARGETED_EVIDENCE_RECORDS : Object.freeze([]),
    recordCount: accepted ? 4 : 0,
    evaluatedActiveTaskCount: accepted ? 4 : 0,
    familyRelationCoverageAdvancedFromNone: accepted,
    familyRelationCoverageNow: accepted ? 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' : 'NONE',
    familyRelationAuthorityAdmitted: false,
    qinP464BodyAcquired: false,
    qinP464BodyStillRequired: accepted,
    branchClashSpecificT5ModifierBridgeAcquired: false,
    positionSpecificT5ModifierBridgeAcquired: false,
    visibilityCareerBindingAcquired: false,
    pluralityCareerBindingAcquired: false,
    pluralityExplicitlyExcludedByI254: accepted,
    seasonalCareerDimensionConsumed: false,
    conditionalSeasonalRemediationActivated: false,
    conflictPolicyTaskActivated: false,
    crossSourceRequirementStitchingUsed: false,
    relativeForceOrAutomaticPrecedenceImported: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyChoiceMadeByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B23_TARGETED_REMEDIATION_EVIDENCE_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      targetedTaskEvaluationsPerformed: accepted ? 4 : 0,
      targetedEvidenceRecordsCreated: accepted ? 4 : 0,
      gapsMateriallyAdvancedWithoutClosure: accepted ? 1 : 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW',
  });
}
