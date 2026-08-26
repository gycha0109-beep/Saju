import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T5_SUBTYPE_CLAIM_TYPE } from './career-personalized-t5-substrate.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION,
  CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS,
  CAREER_T8_B31_TRIGGER_READINESS_CONTROL_IDS,
  type CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport,
  type CareerT8B31TriggerId,
} from './career-personalization-t8-post-i257-new-evidence-trigger-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-post-i257-external-evidence-trigger-activation-evidence-v1' as const;

export type CareerT8B32TriggerActivationRecordId =
  | 'QIN_P464_ADDITIONAL_FULL_COPY_BODY_STILL_UNAVAILABLE'
  | 'QIANLI_EXACT_ORIGINAL_FILE_DIRECT_URL_TARGET_PAGES_STILL_UNAVAILABLE'
  | 'BRANCH_CLASH_AUTHORED_METHOD_LINEAGE_IMPROVED_CURRENT_T5_BINDING_STILL_MISSING'
  | 'POSITION_CHEN_YUAN_1995_MONTH_OFFICER_FORMAL_RESPONSIBILITY_TRIGGER_ACTIVATED';

export interface CareerT8B32TriggerActivationRecord {
  recordId: CareerT8B32TriggerActivationRecordId;
  triggerId: CareerT8B31TriggerId;
  triggerSatisfied: boolean;
  newEvidenceSurfaceMaterial: boolean;
  sourceIdentity: string;
  stableLocator: string;
  directOrVerifiedLocalContextAvailable: boolean;
  independentNormativeProvenanceAdequateForTrigger: boolean;
  natalScopeConfirmed: boolean;
  specificCurrentT5SemanticBindingObserved: boolean;
  explicitScopeOrLimitsObserved: boolean;
  currentMethodCompatibilityEstablished: boolean;
  authorityAdmissionAuthorized: false;
  gapClosureAuthorized: false;
  t8AuthoringAuthorized: false;
  evidenceNote: string;
}

export const CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS = Object.freeze([
  Object.freeze({
    recordId: 'QIN_P464_ADDITIONAL_FULL_COPY_BODY_STILL_UNAVAILABLE' as const,
    triggerId: 'QIN_P464_DIRECT_BODY_TRIGGER' as const,
    triggerSatisfied: false,
    newEvidenceSurfaceMaterial: true,
    sourceIdentity:
      '秦倫詩, 中國易學博覽·八字應用經驗學, 內蒙古人民出版社, ISBN 9787204098774; additional 569-page full-copy surfaces including DOKUMEN, Scribd, 書葵網 and archive/resource mirrors',
    stableLocator:
      'Printed p.464, 第十八章 職業篇, 第三節 按十神組合選職業; multiple 537-marked/569-file-page copies independently preserve the same locator and ISBN.',
    directOrVerifiedLocalContextAvailable: false,
    independentNormativeProvenanceAdequateForTrigger: true,
    natalScopeConfirmed: true,
    specificCurrentT5SemanticBindingObserved: false,
    explicitScopeOrLimitsObserved: false,
    currentMethodCompatibilityEstablished: false,
    authorityAdmissionAuthorized: false as const,
    gapClosureAuthorized: false as const,
    t8AuthoringAuthorized: false as const,
    evidenceNote:
      'The search materially broadened copy availability and re-confirmed the exact p.464 locator, but none of the accessible surfaces exposed the p.464 body itself. The Qin trigger therefore remains closed. TOC/body substitution remains prohibited.',
  }),
  Object.freeze({
    recordId: 'QIANLI_EXACT_ORIGINAL_FILE_DIRECT_URL_TARGET_PAGES_STILL_UNAVAILABLE' as const,
    triggerId: 'QIANLI_EXACT_1936_TARGET_PAGE_ACCESS_TRIGGER' as const,
    triggerSatisfied: false,
    newEvidenceSurfaceMaterial: true,
    sourceIdentity:
      '韋千里, 韋千里命學講義, 韋氏命苑, 民國25[1936], exact NLC witness nlc:data_416,01jh000368,10155',
    stableLocator:
      'Wikimedia Commons exact NLC mechanical scan and direct upload.wikimedia.org original-file URL; printed p.50-p.53 / PDF zero-based 336-339 remain the bounded target.',
    directOrVerifiedLocalContextAvailable: false,
    independentNormativeProvenanceAdequateForTrigger: true,
    natalScopeConfirmed: true,
    specificCurrentT5SemanticBindingObserved: false,
    explicitScopeOrLimitsObserved: false,
    currentMethodCompatibilityEstablished: false,
    authorityAdmissionAuthorized: false as const,
    gapClosureAuthorized: false as const,
    t8AuthoringAuthorized: false as const,
    evidenceNote:
      'The exact original-file URL is now directly resolved, and a separate Qianli-lineage PDF independently reproduces the Career disclaimer sequence. However all four exact-witness target-page render attempts still fail at the page-access layer. B31 requires direct exact-witness target-page access, so the family trigger remains closed.',
  }),
  Object.freeze({
    recordId: 'BRANCH_CLASH_AUTHORED_METHOD_LINEAGE_IMPROVED_CURRENT_T5_BINDING_STILL_MISSING' as const,
    triggerId: 'BRANCH_CLASH_NORMATIVE_NATAL_BRIDGE_TRIGGER' as const,
    triggerSatisfied: false,
    newEvidenceSurfaceMaterial: true,
    sourceIdentity:
      '羅茗浦 (醉酒老仙), 形意子平命理學 authored-methodology lineage, including 2013 course/manuscript lineage and first-party methodology pages mirrored by 太乙書局',
    stableLocator:
      '事業職業論斷 / 工作持續性 passage: 有印先論印、無印再論庫沖; 印星 seriously clashed/controlled -> work instability; 四庫沖 without 印 involvement -> primarily奔波操勞.',
    directOrVerifiedLocalContextAvailable: true,
    independentNormativeProvenanceAdequateForTrigger: false,
    natalScopeConfirmed: true,
    specificCurrentT5SemanticBindingObserved: false,
    explicitScopeOrLimitsObserved: true,
    currentMethodCompatibilityEstablished: false,
    authorityAdmissionAuthorized: false as const,
    gapClosureAuthorized: false as const,
    t8AuthoringAuthorized: false as const,
    evidenceNote:
      'The lead is substantially stronger than an anonymous modern web article: author/system lineage, natal examples, qualitative clash effect and a same-source exception are now identifiable. It still fails B31 because it binds 印 to a separate work-stability semantic rather than to the governed current T5 resource facets exploratory_learning/structured_learning, and conventional independent publication provenance was not established.',
  }),
  Object.freeze({
    recordId: 'POSITION_CHEN_YUAN_1995_MONTH_OFFICER_FORMAL_RESPONSIBILITY_TRIGGER_ACTIVATED' as const,
    triggerId: 'POSITION_CURRENT_T5_BRIDGE_TRIGGER' as const,
    triggerSatisfied: true,
    newEvidenceSurfaceMaterial: true,
    sourceIdentity:
      '陳園編著, 邵偉華審訂, 邵偉華四柱預測學入門, 廣州出版社, 1995 first edition, 244 pages, ISBN 7805922519 / 9787805922515',
    stableLocator:
      '第六章 十神之性, 第五節 十神旺事主事, 正官旺衰; repeated full-text witnesses preserve 官現月柱 -> 為人正直盡責, with adjacent 喜官 scope definition.',
    directOrVerifiedLocalContextAvailable: true,
    independentNormativeProvenanceAdequateForTrigger: true,
    natalScopeConfirmed: true,
    specificCurrentT5SemanticBindingObserved: true,
    explicitScopeOrLimitsObserved: true,
    currentMethodCompatibilityEstablished: false,
    authorityAdmissionAuthorized: false as const,
    gapClosureAuthorized: false as const,
    t8AuthoringAuthorized: false as const,
    evidenceNote:
      `The source is independently bibliographically established by Google Books/WorldCat and multiple full-text witnesses reproduce the same local passage. The position condition is month-pillar 正官, and the local semantic phrase 正直盡責 directly corresponds to ${CAREER_T5_SUBTYPE_CLAIM_TYPE} semantic TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY. The same subsection supplies limits: 月干喜透官星/官星喜在月支 and 喜官 is defined through 身官相當 and not being over-constrained, plus a warning against mechanical application. This satisfies the B31 position trigger conditions sufficiently to reopen that lane for adequacy review, but those strength/喜忌 dependencies mean current-method compatibility is not yet established and authority is not admitted.`,
  }),
] as const satisfies readonly CareerT8B32TriggerActivationRecord[]);

export const CAREER_T8_B32_TRIGGER_ACTIVATION_CONTROL_IDS = Object.freeze([
  'B32_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B31_TRIGGER_READINESS_BOUNDARY',
  'BROAD_RESEARCH_MAY_DISCOVER_NEW_SURFACES_BUT_A_TRIGGER_ACTIVATES_ONLY_IF_ALL_ITS_B31_CONDITIONS_ARE_MET',
  'QIN_ADDITIONAL_FULL_COPIES_DO_NOT_ACTIVATE_WITHOUT_DIRECT_P464_BODY_AND_LOCAL_CONTEXT',
  'QIANLI_DIRECT_ORIGINAL_FILE_RESOLUTION_DOES_NOT_ACTIVATE_WHILE_EXACT_TARGET_PAGES_REMAIN_UNREADABLE',
  'BRANCH_AUTHOR_AND_METHOD_LINEAGE_IMPROVEMENT_DOES_NOT_SUBSTITUTE_FOR_A_SPECIFIC_GOVERNED_CURRENT_T5_SEMANTIC_BINDING',
  'POSITION_TRIGGER_ACTIVATES_ON_CHEN_YUAN_1995_MONTH_ZHENGGUAN_TO_FORMAL_RESPONSIBILITY_POSITION_BINDING_WITH_SAME_SOURCE_LIMITS',
  'POSITION_TRIGGER_ACTIVATION_IS_NOT_AUTHORITY_ADMISSION_AND_CURRENT_METHOD_COMPATIBILITY_REMAINS_UNRESOLVED',
  'NO_STRENGTH_XIJI_HIERARCHY_IS_IMPORTED_INTO_CURRENT_T5_BY_TRIGGER_ACTIVATION',
  'NO_CROSS_SOURCE_REQUIREMENT_STITCHING_IS_USED_TO_ACTIVATE_ANY_TRIGGER',
  'ONLY_ONE_OF_FOUR_B31_TRIGGERS_IS_ACTIVATED_AND_THE_OTHER_THREE_REMAIN_CLOSED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN_PENDING_ADEQUACY_AND_ADMISSION_REVIEW',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE'
    | 'UPSTREAM_B31_BOUNDARY_INVALID';
  decision:
    | 'ONE_POSITION_TRIGGER_ACTIVATED_THREE_TRIGGERS_REMAIN_CLOSED_NO_AUTHORITY_ADMISSION_CURRENT_METHOD_COMPATIBILITY_REVIEW_REQUIRED'
    | 'EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_NOT_ESTABLISHED';
  upstreamB31ReviewId: string;
  exactB31BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  records: readonly CareerT8B32TriggerActivationRecord[];
  recordCount: 4 | 0;
  materialNewSurfaceCount: 4 | 0;
  activatedTriggerCount: 1 | 0;
  activatedTriggerIds: readonly ['POSITION_CURRENT_T5_BRIDGE_TRIGGER'] | readonly [];
  qinTriggerActivated: false;
  qianliTriggerActivated: false;
  branchTriggerActivated: false;
  positionTriggerActivated: boolean;
  positionCandidateExactTenGod: '정관' | null;
  positionCandidateCurrentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' | null;
  positionCandidateFacet: 'formal_responsibility' | null;
  positionCandidatePillar: 'month' | null;
  positionCurrentMethodCompatibilityEstablished: false;
  authorityAdmissionReadyGapCount: 0;
  gapClosureReadyCount: 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B32_TRIGGER_ACTIVATION_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    triggerEvaluationsPerformed: 4 | 0;
    triggersActivated: 1 | 0;
    authorityCandidatesAdmitted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW';
}

function contentAddressedB31IdentityValid(
  b31: CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b31;
  return reviewId === `career_t8_post_i257_new_evidence_trigger_readiness_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB31Accepted(
  b31: CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport,
): boolean {
  return (
    contentAddressedB31IdentityValid(b31) &&
    b31.reviewVersion === CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION &&
    b31.status === 'RESOLVED_CAREER_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW' &&
    b31.decision ===
      'FOUR_TRIGGER_CONTRACTS_FROZEN_ZERO_CURRENTLY_SATISFIED_RESUME_ONLY_ON_LANE_SPECIFIC_EVIDENCE_CHANGE_AND_LATER_ADEQUACY_REVIEW_NO_AUTHORITY_ADMISSION' &&
    b31.exactB30BoundaryAccepted &&
    b31.domain === 'career' &&
    b31.temporalScope === 'natal' &&
    b31.statusClass === 'research' &&
    b31.triggerContractCount === 4 &&
    deterministicContentHash(b31.triggerContracts) === deterministicContentHash(CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS) &&
    b31.currentlySatisfiedTriggerCount === 0 &&
    b31.currentlyExecutableLaneCount === 0 &&
    b31.activationRequiresAllConditions &&
    b31.activationAutomaticallyAdmitsAuthority === false &&
    b31.activationAutomaticallyClosesGap === false &&
    b31.activationAlwaysRequiresAdequacyReview &&
    b31.broadSearchRestartAuthorized === false &&
    b31.repeatedExhaustedSurfaceSearchAuthorized === false &&
    b31.crossSourceRequirementStitchingAuthorized === false &&
    b31.authorityAdmissionReadyGapCount === 0 &&
    b31.gapClosureReadyCount === 0 &&
    b31.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b31.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b31.controlCount === 12 &&
    b31.controlsFrozen &&
    deterministicContentHash(b31.controlIds) === deterministicContentHash(CAREER_T8_B31_TRIGGER_READINESS_CONTROL_IDS) &&
    b31.t8RuleAuthoringAuthorized === false &&
    b31.personalizedT8PackCreationAuthorized === false &&
    b31.productionPromotionAuthorized === false &&
    b31.productionImpact === 'NONE' &&
    b31.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function activationRecordsValid(): boolean {
  const triggerIds = CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS.map((record) => record.triggerId);
  const activated = CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS.filter((record) => record.triggerSatisfied);
  const position = activated[0];
  return (
    triggerIds.length === 4 &&
    new Set(triggerIds).size === 4 &&
    CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS.every((record) => record.newEvidenceSurfaceMaterial) &&
    activated.length === 1 &&
    position?.triggerId === 'POSITION_CURRENT_T5_BRIDGE_TRIGGER' &&
    position.independentNormativeProvenanceAdequateForTrigger &&
    position.natalScopeConfirmed &&
    position.specificCurrentT5SemanticBindingObserved &&
    position.explicitScopeOrLimitsObserved &&
    position.currentMethodCompatibilityEstablished === false &&
    CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS.every(
      (record) => record.authorityAdmissionAuthorized === false && record.gapClosureAuthorized === false && record.t8AuthoringAuthorized === false,
    )
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport {
  return {
    evidenceId: `career_t8_post_i257_external_evidence_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(
  b31: CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport,
): CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport {
  const upstreamAccepted = exactB31Accepted(b31);
  const accepted = upstreamAccepted && activationRecordsValid();
  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE'
      : 'UPSTREAM_B31_BOUNDARY_INVALID',
    decision: accepted
      ? 'ONE_POSITION_TRIGGER_ACTIVATED_THREE_TRIGGERS_REMAIN_CLOSED_NO_AUTHORITY_ADMISSION_CURRENT_METHOD_COMPATIBILITY_REVIEW_REQUIRED'
      : 'EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_NOT_ESTABLISHED',
    upstreamB31ReviewId: b31.reviewId,
    exactB31BoundaryAccepted: upstreamAccepted,
    domain: 'career', temporalScope: 'natal', statusClass: 'research',
    records: accepted ? CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS : Object.freeze([]),
    recordCount: accepted ? 4 : 0,
    materialNewSurfaceCount: accepted ? 4 : 0,
    activatedTriggerCount: accepted ? 1 : 0,
    activatedTriggerIds: accepted ? ['POSITION_CURRENT_T5_BRIDGE_TRIGGER'] : Object.freeze([]),
    qinTriggerActivated: false,
    qianliTriggerActivated: false,
    branchTriggerActivated: false,
    positionTriggerActivated: accepted,
    positionCandidateExactTenGod: accepted ? '정관' : null,
    positionCandidateCurrentT5SemanticKey: accepted ? 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' : null,
    positionCandidateFacet: accepted ? 'formal_responsibility' : null,
    positionCandidatePillar: accepted ? 'month' : null,
    positionCurrentMethodCompatibilityEstablished: false,
    authorityAdmissionReadyGapCount: 0,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B32_TRIGGER_ACTIVATION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      triggerEvaluationsPerformed: accepted ? 4 : 0,
      triggersActivated: accepted ? 1 : 0,
      authorityCandidatesAdmitted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW',
  });
}
