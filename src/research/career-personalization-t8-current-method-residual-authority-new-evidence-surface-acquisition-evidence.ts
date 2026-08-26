import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS,
  CAREER_T8_B27_NEW_SURFACE_ACQUISITION_READINESS_CONTROL_IDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReviewReport,
  type CareerT8B27NewSurfaceAcquisitionLaneId,
} from './career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-evidence-v1' as const;

export type CareerT8B28AcquisitionRecordId =
  | 'QIN_P464_FULL_DOCUMENT_SURFACE_BODY_PENDING'
  | 'QIANLI_CAREER_DISCLAIMER_DERIVATIVE_LEAD_PRIMARY_BINDING_PENDING'
  | 'BRANCH_CLASH_TENGOD_CAREER_WEB_LEAD_PROVENANCE_INADEQUATE'
  | 'POSITION_NEW_QUALIFYING_SURFACE_NOT_FOUND';

export type CareerT8B28SurfaceDisposition =
  | 'GENUINELY_NEW_DOCUMENT_SURFACE_TARGET_BODY_NOT_ACQUIRED'
  | 'GENUINELY_NEW_DERIVATIVE_CONTEXT_LEAD_PRIMARY_PAGE_BINDING_REQUIRED'
  | 'GENUINELY_NEW_DIRECT_SEMANTIC_WEB_LEAD_NORMATIVE_PROVENANCE_INADEQUATE'
  | 'NO_GENUINELY_NEW_QUALIFYING_SURFACE_ACQUIRED';

export type CareerT8B28CoverageDelta = 'NONE';

export interface CareerT8B28AcquisitionRecord {
  recordId: CareerT8B28AcquisitionRecordId;
  laneId: CareerT8B27NewSurfaceAcquisitionLaneId;
  targetGapId: CareerT8SynthesisAuthorityGapId;
  sourceIdentity: string;
  sourceLocator: string;
  acquisitionSurface: string;
  disposition: CareerT8B28SurfaceDisposition;
  genuinelyNewSurfaceDiscovered: boolean;
  targetBodyOrPassageDirectlyAcquired: boolean;
  exactSourceIdentityConfirmed: boolean;
  stableReproducibleLocatorConfirmed: boolean;
  originalOrVerifiedLocalContextInspected: boolean;
  independentNormativeProvenanceAdequate: boolean;
  explicitCareerOrWorkSemanticBindingObserved: boolean;
  specificCurrentT5CareerSemanticModifierBindingObserved: boolean;
  explicitContextLimitsOrExceptionsObserved: boolean;
  currentMethodCompatibilityEstablished: boolean;
  coverageDelta: CareerT8B28CoverageDelta;
  qualifyingAuthorityCandidate: false;
  authorityAdmissionAuthorized: false;
  gapClosureAuthorized: false;
  t8AuthoringAuthorized: false;
  negativeOutcomePreserved: true;
  evidenceNote: string;
}

export const CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS = Object.freeze([
  Object.freeze({
    recordId: 'QIN_P464_FULL_DOCUMENT_SURFACE_BODY_PENDING' as const,
    laneId: 'QIN_P464_DIRECT_BODY_NEW_SURFACE_ACQUISITION' as const,
    targetGapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING' as const,
    sourceIdentity:
      '秦倫詩, 中國易學博覽·八字應用經驗學, 內蒙古人民出版社, 2010 first edition, ISBN 9787204098774',
    sourceLocator:
      'PDFCoffee full-document surface /八字应用经验学 by 秦伦诗, 40 MB, 2010-01 first-edition and first-printing imprint; public TOC locates printed p.464 第十八章職業篇 第三節 按十神組合選職業',
    acquisitionSurface:
      'A genuinely new full-document/download surface was discovered rather than another catalog-only page. The surface directly exposes the book imprint, 2010 first-edition metadata, ISBN 978-7-204-09877-4, early full-text body, a 40 MB document record, and a download endpoint. However, the download endpoint remained unavailable to the acquisition client and the printed p.464 section body itself was not directly extracted or rendered.',
    disposition: 'GENUINELY_NEW_DOCUMENT_SURFACE_TARGET_BODY_NOT_ACQUIRED' as const,
    genuinelyNewSurfaceDiscovered: true,
    targetBodyOrPassageDirectlyAcquired: false,
    exactSourceIdentityConfirmed: true,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: false,
    independentNormativeProvenanceAdequate: true,
    explicitCareerOrWorkSemanticBindingObserved: true,
    specificCurrentT5CareerSemanticModifierBindingObserved: false,
    explicitContextLimitsOrExceptionsObserved: false,
    currentMethodCompatibilityEstablished: false,
    coverageDelta: 'NONE' as const,
    qualifyingAuthorityCandidate: false as const,
    authorityAdmissionAuthorized: false as const,
    gapClosureAuthorized: false as const,
    t8AuthoringAuthorized: false as const,
    negativeOutcomePreserved: true as const,
    evidenceNote:
      'B28 materially improves access-surface discovery but does not satisfy the B27 body contract. The exact p.464 body, subtype-role semantics, direct multi-claim Career composition, local limits, and dependency inventory remain uninspected. The same book visibly contains 旺衰、格局、用神、喜忌 methodology, so compatibility cannot be assumed even if the body is later acquired.',
  }),
  Object.freeze({
    recordId: 'QIANLI_CAREER_DISCLAIMER_DERIVATIVE_LEAD_PRIMARY_BINDING_PENDING' as const,
    laneId: 'FAMILY_RELATION_LIMITS_COMPATIBILITY_NEW_SURFACE_ACQUISITION' as const,
    targetGapId: 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING' as const,
    sourceIdentity:
      'Derivative transcription cluster attributed to 韋千里, exposing the continuation of the 事業 section after the already-primary-bound relation clauses',
    sourceLocator:
      'Chinese Text Project chapter 497083 lines 525-531 and matching derivative mirrors; target corrected primary witness remains 韋千里命學講義 1936 NLC nlc:data_416,01jh000368,10155, printed p.50-p.53 / PDF zero-based 336-339 bounded by directly rendered printed p.49 and printed p.54',
    acquisitionSurface:
      'A genuinely new context lead was found after the known p.49 Career relation clauses. The derivative transcription ends the 事業 section with a Career-specific caution that the method is not singular, the listed rules are examples, and 性情/環境 relations require flexible reading. This is materially different from the previously rejected preceding 性情 disclaimer because it appears inside the 事業 sequence after the Career rules. However, the transcription surface is provenance-confused as 千里命稿 and may not replace direct binding in the corrected 1936 primary witness. Direct screenshot attempts for the bounded continuation pages repeatedly cache-missed.',
    disposition: 'GENUINELY_NEW_DERIVATIVE_CONTEXT_LEAD_PRIMARY_PAGE_BINDING_REQUIRED' as const,
    genuinelyNewSurfaceDiscovered: true,
    targetBodyOrPassageDirectlyAcquired: false,
    exactSourceIdentityConfirmed: false,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: false,
    independentNormativeProvenanceAdequate: false,
    explicitCareerOrWorkSemanticBindingObserved: true,
    specificCurrentT5CareerSemanticModifierBindingObserved: false,
    explicitContextLimitsOrExceptionsObserved: false,
    currentMethodCompatibilityEstablished: false,
    coverageDelta: 'NONE' as const,
    qualifyingAuthorityCandidate: false as const,
    authorityAdmissionAuthorized: false as const,
    gapClosureAuthorized: false as const,
    t8AuthoringAuthorized: false as const,
    negativeOutcomePreserved: true as const,
    evidenceNote:
      'This lead is high-value because it narrows the exact primary target for the remaining limits/exception check to the continuation of the 1936 Career section. It still cannot satisfy that check until the corresponding corrected primary page is directly inspected. Current-method compatibility remains a separate unresolved requirement even if the disclaimer is later primary-bound.',
  }),
  Object.freeze({
    recordId: 'BRANCH_CLASH_TENGOD_CAREER_WEB_LEAD_PROVENANCE_INADEQUATE' as const,
    laneId: 'BRANCH_CLASH_SINGLE_SOURCE_CURRENT_T5_NEW_SURFACE_ACQUISITION' as const,
    targetGapId: 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING' as const,
    sourceIdentity:
      '易象乾坤易學網, 地支六沖究竟是好是壞？深度解析六沖的吉凶與應事, contemporary web method article',
    sourceLocator:
      'yixiangqiankun.com/130704.htm, section 從十神看六沖',
    acquisitionSurface:
      'A genuinely new direct semantic surface states that a branch clash affecting 印星 may correspond to unstable work and job/position changes. It therefore co-locates a Ten-God subtype, clash participation, and work semantics in one passage. The source is a recent web article, not independently established normative publication authority, and it conditions clash interpretation through broader traditional good/bad and role semantics without demonstrating compatibility with the governed current method or the exact required qualitative modification contract.',
    disposition: 'GENUINELY_NEW_DIRECT_SEMANTIC_WEB_LEAD_NORMATIVE_PROVENANCE_INADEQUATE' as const,
    genuinelyNewSurfaceDiscovered: true,
    targetBodyOrPassageDirectlyAcquired: true,
    exactSourceIdentityConfirmed: true,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: true,
    independentNormativeProvenanceAdequate: false,
    explicitCareerOrWorkSemanticBindingObserved: true,
    specificCurrentT5CareerSemanticModifierBindingObserved: true,
    explicitContextLimitsOrExceptionsObserved: false,
    currentMethodCompatibilityEstablished: false,
    coverageDelta: 'NONE' as const,
    qualifyingAuthorityCandidate: false as const,
    authorityAdmissionAuthorized: false as const,
    gapClosureAuthorized: false as const,
    t8AuthoringAuthorized: false as const,
    negativeOutcomePreserved: true as const,
    evidenceNote:
      'The passage is a stronger semantic lead than generic six-clash occupational movement text because clash + 印星 + work instability appear together. B27 nevertheless requires independent normative provenance, limits, and current-method compatibility. The new web lead therefore does not advance formal requirement coverage.',
  }),
  Object.freeze({
    recordId: 'POSITION_NEW_QUALIFYING_SURFACE_NOT_FOUND' as const,
    laneId: 'POSITION_SPECIFIC_CURRENT_T5_NEW_SURFACE_ACQUISITION' as const,
    targetGapId: 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING' as const,
    sourceIdentity:
      'Targeted search across formal/public method-text surfaces for position or separation to a specific Ten-God/current-T5 Career semantic',
    sourceLocator:
      'B28 bounded targeted acquisition search; existing Xu 2009 position/separation partial and Qianli 1936 明暗/地位 anchors explicitly excluded from being re-counted',
    acquisitionSurface:
      'The bounded search surfaced modern web explanations of pillar position, branch clash, and work change, but no genuinely new independently adequate formal source passage was acquired that binds position/separation to a specific governed current-T5 Career semantic while preserving the B27 unconsumed visibility/plurality/seasonal boundary.',
    disposition: 'NO_GENUINELY_NEW_QUALIFYING_SURFACE_ACQUIRED' as const,
    genuinelyNewSurfaceDiscovered: false,
    targetBodyOrPassageDirectlyAcquired: false,
    exactSourceIdentityConfirmed: false,
    stableReproducibleLocatorConfirmed: false,
    originalOrVerifiedLocalContextInspected: false,
    independentNormativeProvenanceAdequate: false,
    explicitCareerOrWorkSemanticBindingObserved: false,
    specificCurrentT5CareerSemanticModifierBindingObserved: false,
    explicitContextLimitsOrExceptionsObserved: false,
    currentMethodCompatibilityEstablished: false,
    coverageDelta: 'NONE' as const,
    qualifyingAuthorityCandidate: false as const,
    authorityAdmissionAuthorized: false as const,
    gapClosureAuthorized: false as const,
    t8AuthoringAuthorized: false as const,
    negativeOutcomePreserved: true as const,
    evidenceNote:
      'No existing partial anchor was recycled as a new acquisition. Visibility, plurality, and seasonal dimensions remain unconsumed, and no numeric position/distance weighting is introduced.',
  }),
] as const satisfies readonly CareerT8B28AcquisitionRecord[]);

export const CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS = Object.freeze([
  'B28_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B27_READINESS_BOUNDARY',
  'ALL_FOUR_B27_ACQUISITION_LANES_ARE_EXECUTED_OR_NEGATIVELY_RESOLVED_EXACTLY_ONCE',
  'QIN_NEW_FULL_DOCUMENT_SURFACE_IS_RECORDED_WITHOUT_FALSIFYING_P464_BODY_ACQUISITION',
  'QIANLI_CAREER_DISCLAIMER_TRANSCRIPTION_IS_A_PRIMARY_BINDING_LEAD_NOT_AUTHORITY_EVIDENCE',
  'THE_QIANLI_PRIMARY_TARGET_IS_BOUNDED_TO_THE_1936_CAREER_CONTINUATION_BETWEEN_PRINTED_P49_AND_P54',
  'BRANCH_CLASH_TENGOD_CAREER_WEB_TEXT_IS_A_DIRECT_SEMANTIC_LEAD_BUT_FAILS_NORMATIVE_PROVENANCE_AND_COMPATIBILITY',
  'POSITION_NEGATIVE_ACQUISITION_OUTCOME_IS_PRESERVED_WITHOUT_RECYCLING_EXISTING_PARTIALS',
  'ZERO_B28_RECORDS_ADVANCE_FORMAL_AUTHORITY_REQUIREMENT_COVERAGE',
  'NO_CROSS_SOURCE_STITCHING_REPEATED_PRIOR_SURFACE_PROGRESS_OR_HISTORICAL_OCCUPATION_MODERNIZATION',
  'VISIBILITY_PLURALITY_AND_SEASONAL_REMAIN_UNCONSUMED_AND_I254_REMAINS_CONTROLLING',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE'
    | 'UPSTREAM_B27_BOUNDARY_INVALID';
  decision:
    | 'FOUR_BOUNDED_LANES_EXECUTED_THREE_NEW_SURFACES_DISCOVERED_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_PRIMARY_AND_PROVENANCE_GAPS_PRESERVED'
    | 'NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_NOT_ESTABLISHED';
  upstreamB27ReviewId: string;
  exactB27BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  records: readonly CareerT8B28AcquisitionRecord[];
  recordCount: 4 | 0;
  acquisitionLaneExecutionCount: 4 | 0;
  genuinelyNewSurfaceDiscoveryCount: 3 | 0;
  targetBodyOrPassageDirectAcquisitionCount: 1 | 0;
  formalAuthorityCoverageAdvancementCount: 0;
  qinFullDocumentSurfaceDiscovered: boolean;
  qinP464BodyAcquired: false;
  familyCareerDisclaimerLeadDiscovered: boolean;
  familyCareerDisclaimerCorrectedPrimaryBound: false;
  familyLimitsRequirementSatisfied: false;
  familyCurrentMethodCompatibilitySatisfied: false;
  branchDirectTenGodClashCareerSemanticLeadDiscovered: boolean;
  branchIndependentNormativeProvenanceAdequate: false;
  branchCurrentMethodCompatibilitySatisfied: false;
  positionNewQualifyingSurfaceAcquired: false;
  crossSourceRequirementStitchingUsed: false;
  repeatedPriorSurfaceCountedAsProgress: false;
  visibilityConsumedByThisGate: false;
  pluralityConsumedByThisGate: false;
  seasonalConsumedByThisGate: false;
  pluralityHoldReclassified: false;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    acquisitionExecutionsPerformed: 4 | 0;
    genuinelyNewSurfacesDiscovered: 3 | 0;
    targetPassagesDirectlyAcquired: 1 | 0;
    formalCoverageAdvancements: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE';
}

function contentAddressedB27IdentityValid(
  b27: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b27;
  return (
    reviewId ===
    `career_t8_current_method_residual_authority_new_evidence_surface_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB27Accepted(
  b27: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReviewReport,
): boolean {
  return (
    contentAddressedB27IdentityValid(b27) &&
    b27.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW_VERSION &&
    b27.status ===
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS' &&
    b27.decision === 'FOUR_BOUNDED_NEW_SURFACE_ACQUISITION_LANES_READY_NO_BROAD_RESTART_NO_AUTHORITY_ADMISSION' &&
    b27.exactB26BoundaryAccepted &&
    b27.domain === 'career' &&
    b27.temporalScope === 'natal' &&
    b27.statusClass === 'research' &&
    b27.contractCount === 4 &&
    deterministicContentHash(b27.contracts) === deterministicContentHash(CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS) &&
    b27.executableNewSurfaceAcquisitionLaneCount === 4 &&
    b27.allB26WaitingPathsRepresentedExactlyOnce &&
    b27.targetedNewSurfaceAcquisitionAuthorizedForNextGate &&
    b27.broadDiscoveryRestartAuthorized === false &&
    b27.repeatedPriorSurfaceSearchAuthorized === false &&
    b27.crossSourceRequirementStitchingAuthorized === false &&
    b27.searchSnippetMayCountAsAuthorityEvidence === false &&
    b27.visibilityConsumedByPositionLane === false &&
    b27.pluralityConsumedByPositionLane === false &&
    b27.seasonalConsumedByPositionLane === false &&
    b27.pluralityHoldReclassified === false &&
    b27.seasonalConditionalRemediationActivated === false &&
    b27.conflictPolicyRemediationActivated === false &&
    b27.successfulAcquisitionRequiresLaterAdequacyReview &&
    b27.successfulAcquisitionRequiresLaterAuthorityAdmissionReview &&
    b27.newSurfaceAcquisitionPerformedByThisGate === false &&
    b27.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b27.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b27.controlCount === 12 &&
    b27.controlsFrozen &&
    deterministicContentHash(b27.controlIds) ===
      deterministicContentHash(CAREER_T8_B27_NEW_SURFACE_ACQUISITION_READINESS_CONTROL_IDS) &&
    b27.t8RuleAuthoringAuthorized === false &&
    b27.personalizedT8PackCreationAuthorized === false &&
    b27.productionPromotionAuthorized === false &&
    b27.productionImpact === 'NONE' &&
    b27.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE'
  );
}

function recordsCoverContractsExactly(): boolean {
  const recordLaneIds = CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS.map((record) => record.laneId);
  const contractLaneIds = CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS.map((contract) => contract.laneId);
  return (
    recordLaneIds.length === 4 &&
    new Set(recordLaneIds).size === 4 &&
    deterministicContentHash(recordLaneIds) === deterministicContentHash(contractLaneIds) &&
    CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS.every(
      (record) =>
        record.coverageDelta === 'NONE' &&
        !record.qualifyingAuthorityCandidate &&
        !record.authorityAdmissionAuthorized &&
        !record.gapClosureAuthorized &&
        !record.t8AuthoringAuthorized &&
        record.negativeOutcomePreserved,
    )
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport {
  return {
    evidenceId: `career_t8_current_method_residual_authority_new_evidence_surface_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
  b27: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReviewReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidenceReport {
  const upstreamAccepted = exactB27Accepted(b27);
  const coverageAccepted = recordsCoverContractsExactly();
  const accepted = upstreamAccepted && coverageAccepted;

  return finalized({
    evidenceVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE'
      : 'UPSTREAM_B27_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_BOUNDED_LANES_EXECUTED_THREE_NEW_SURFACES_DISCOVERED_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_PRIMARY_AND_PROVENANCE_GAPS_PRESERVED'
      : 'NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_NOT_ESTABLISHED',
    upstreamB27ReviewId: b27.reviewId,
    exactB27BoundaryAccepted: upstreamAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    records: accepted ? CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS : Object.freeze([]),
    recordCount: accepted ? 4 : 0,
    acquisitionLaneExecutionCount: accepted ? 4 : 0,
    genuinelyNewSurfaceDiscoveryCount: accepted ? 3 : 0,
    targetBodyOrPassageDirectAcquisitionCount: accepted ? 1 : 0,
    formalAuthorityCoverageAdvancementCount: 0,
    qinFullDocumentSurfaceDiscovered: accepted,
    qinP464BodyAcquired: false,
    familyCareerDisclaimerLeadDiscovered: accepted,
    familyCareerDisclaimerCorrectedPrimaryBound: false,
    familyLimitsRequirementSatisfied: false,
    familyCurrentMethodCompatibilitySatisfied: false,
    branchDirectTenGodClashCareerSemanticLeadDiscovered: accepted,
    branchIndependentNormativeProvenanceAdequate: false,
    branchCurrentMethodCompatibilitySatisfied: false,
    positionNewQualifyingSurfaceAcquired: false,
    crossSourceRequirementStitchingUsed: false,
    repeatedPriorSurfaceCountedAsProgress: false,
    visibilityConsumedByThisGate: false,
    pluralityConsumedByThisGate: false,
    seasonalConsumedByThisGate: false,
    pluralityHoldReclassified: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      acquisitionExecutionsPerformed: accepted ? 4 : 0,
      genuinelyNewSurfacesDiscovered: accepted ? 3 : 0,
      targetPassagesDirectlyAcquired: accepted ? 1 : 0,
      formalCoverageAdvancements: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE',
  });
}
