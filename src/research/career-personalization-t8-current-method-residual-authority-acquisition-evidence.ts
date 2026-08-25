import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
  type CareerT8CurrentMethodResidualAcquisitionTaskId,
} from './career-personalization-t8-current-method-residual-authority-acquisition-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-acquisition-evidence-v1' as const;

export type CareerT8CurrentMethodAcquisitionCandidateId =
  | 'YANG_YIYUN_FULL_TEXT_REINSPECTION'
  | 'QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD'
  | 'WANG_YUANTANG_2022_DIRECT_TENGOD_CAREER_WEB_LEAD'
  | 'XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION'
  | 'SIX_CLASH_CAREER_DERIVATIVE_WEB_CLUSTER';

export type CareerT8CurrentMethodAcquisitionSourceClass =
  | 'METHOD_TEXT_FULL_TEXT_MIRROR_FORMAL_PUBLICATION_UNCONFIRMED'
  | 'FORMAL_PUBLISHED_BOOK_TOC_AND_BIBLIOGRAPHY'
  | 'MODERN_WEB_METHOD_ARTICLE'
  | 'FORMAL_PUBLISHED_BOOK_FULL_TEXT_MIRROR'
  | 'DERIVATIVE_WEB_TEXT_CLUSTER';

export type CareerT8CurrentMethodAcquisitionDisposition =
  | 'PARTIAL_CURRENT_METHOD_ACQUISITION_EVIDENCE'
  | 'FORMAL_PROVENANCE_PASSAGE_NOT_ACQUIRED'
  | 'DIRECT_SEMANTICS_PROVENANCE_OR_METHOD_INADEQUATE';

export interface CareerT8CurrentMethodAcquisitionCandidateEvidence {
  candidateId: CareerT8CurrentMethodAcquisitionCandidateId;
  taskId: CareerT8CurrentMethodResidualAcquisitionTaskId;
  sourceClass: CareerT8CurrentMethodAcquisitionSourceClass;
  sourceIdentity: string;
  sourceLocator: string;
  inspectedSurface: string;
  disposition: CareerT8CurrentMethodAcquisitionDisposition;
  exactSourceIdentityConfirmed: boolean;
  formalPublicationProvenanceConfirmed: boolean;
  stableReproducibleLocatorConfirmed: boolean;
  originalOrVerifiedLocalContextInspected: boolean;
  explicitCareerWorkSemantics: boolean;
  tenGodCombinationSemanticsExplicit: boolean;
  directMultiClaimCareerCompositionExplicit: boolean;
  branchClashCareerSemanticsExplicit: boolean;
  positionCareerSemanticsExplicit: boolean;
  visibilityCareerSemanticsExplicit: boolean;
  pluralityCareerSemanticsExplicit: boolean;
  seasonalCareerSemanticsExplicit: boolean;
  exactCurrentT5SemanticModifierCorrespondenceEstablished: boolean;
  conflictTensionPolicyExplicit: boolean;
  independentNormativeProvenanceAdequate: boolean;
  currentGovernedMethodCompatibilityEstablished: boolean;
  competingMethodDependencyDetected: boolean;
  relativeForceOrStrengthHierarchyDetected: boolean;
  derivativeLineageRiskDetected: boolean;
  searchSnippetOnly: boolean;
  qualifyingCurrentMethodAuthorityCandidate: false;
  authorityAdmissionAuthorized: false;
  gapClosureAuthorized: false;
  evidenceNote: string;
}

export const CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES = Object.freeze([
  Object.freeze({
    candidateId: 'YANG_YIYUN_FULL_TEXT_REINSPECTION',
    taskId: 'T5_CURRENT_METHOD_DIRECT_BRIDGE_AUTHORITY_ACQUISITION',
    sourceClass: 'METHOD_TEXT_FULL_TEXT_MIRROR_FORMAL_PUBLICATION_UNCONFIRMED',
    sourceIdentity: '楊逸雲, 十神含義闡微 / 十神闡微',
    sourceLocator:
      'Scribd searchable full-text mirror document 864589417; Chapter 4 怎樣分析十神間組合後其含義的變化 and Chapter 7 section 7 職業的看法',
    inspectedSurface:
      'The full-text mirror confirms one coherent work attributed to 楊逸雲, an explicit Ten-God combination chapter, and a separate Career chapter. The combination chapter explains patterns such as 食神制殺, 傷官佩印, 殺印相生 and 食傷生財; the Career chapter separately lists occupations associated with individual Ten Gods.',
    disposition: 'PARTIAL_CURRENT_METHOD_ACQUISITION_EVIDENCE',
    exactSourceIdentityConfirmed: true,
    formalPublicationProvenanceConfirmed: false,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: true,
    explicitCareerWorkSemantics: true,
    tenGodCombinationSemanticsExplicit: true,
    directMultiClaimCareerCompositionExplicit: false,
    branchClashCareerSemanticsExplicit: false,
    positionCareerSemanticsExplicit: false,
    visibilityCareerSemanticsExplicit: false,
    pluralityCareerSemanticsExplicit: false,
    seasonalCareerSemanticsExplicit: false,
    exactCurrentT5SemanticModifierCorrespondenceEstablished: false,
    conflictTensionPolicyExplicit: false,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodCompatibilityEstablished: false,
    competingMethodDependencyDetected: true,
    relativeForceOrStrengthHierarchyDetected: true,
    derivativeLineageRiskDetected: false,
    searchSnippetOnly: false,
    qualifyingCurrentMethodAuthorityCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'B20 improves the B17 evidence surface from disconnected excerpts to a searchable full-text witness, but the desired multi-Ten-God-to-Career bridge remains unstated. Formal publisher/edition provenance is still unconfirmed and the text uses 身旺/喜用 and related strength semantics elsewhere. The separate chapters may not be stitched into a new Career rule.',
  }),
  Object.freeze({
    candidateId: 'QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD',
    taskId: 'T5_CURRENT_METHOD_DIRECT_BRIDGE_AUTHORITY_ACQUISITION',
    sourceClass: 'FORMAL_PUBLISHED_BOOK_TOC_AND_BIBLIOGRAPHY',
    sourceIdentity: '秦倫詩, 中國易學博覽·八字應用經驗學, 內蒙古人民出版社, 2010, ISBN 9787204098774',
    sourceLocator:
      'WorldCat title 654936533 / printed first edition metadata; public TOC: Chapter 18 職業篇, section 3 按十神組合選職業, printed p.464',
    inspectedSurface:
      'Independent catalog and bookseller metadata confirm a formally published book. Public TOCs expose a dedicated section titled 按十神組合選職業, but B20 did not obtain and inspect the section body. The surrounding book explicitly contains 旺衰, 格局, 用神 and 喜忌 methodology.',
    disposition: 'FORMAL_PROVENANCE_PASSAGE_NOT_ACQUIRED',
    exactSourceIdentityConfirmed: true,
    formalPublicationProvenanceConfirmed: true,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: false,
    explicitCareerWorkSemantics: true,
    tenGodCombinationSemanticsExplicit: true,
    directMultiClaimCareerCompositionExplicit: false,
    branchClashCareerSemanticsExplicit: false,
    positionCareerSemanticsExplicit: false,
    visibilityCareerSemanticsExplicit: false,
    pluralityCareerSemanticsExplicit: false,
    seasonalCareerSemanticsExplicit: false,
    exactCurrentT5SemanticModifierCorrespondenceEstablished: false,
    conflictTensionPolicyExplicit: false,
    independentNormativeProvenanceAdequate: true,
    currentGovernedMethodCompatibilityEstablished: false,
    competingMethodDependencyDetected: true,
    relativeForceOrStrengthHierarchyDetected: true,
    derivativeLineageRiskDetected: false,
    searchSnippetOnly: false,
    qualifyingCurrentMethodAuthorityCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'This is a materially stronger provenance lead than a web article because the edition, publisher, author and ISBN are independently identifiable and the TOC names a Ten-God-combination Career section. However, a TOC heading is not passage authority. The section body and its dependencies were not acquired, so no current-method semantic correspondence or authority is admitted.',
  }),
  Object.freeze({
    candidateId: 'WANG_YUANTANG_2022_DIRECT_TENGOD_CAREER_WEB_LEAD',
    taskId: 'T5_CURRENT_METHOD_DIRECT_BRIDGE_AUTHORITY_ACQUISITION',
    sourceClass: 'MODERN_WEB_METHOD_ARTICLE',
    sourceIdentity: '汪緣堂, 十神組合與職業選擇（上）, 2022-05-04',
    sourceLocator: 'Sohu article https://www.sohu.com/a/543696130_120557164, published 2022-05-04',
    inspectedSurface:
      'The article directly maps multi-Ten-God combinations to occupational categories, including 食傷 with 比劫 and several official/wealth combinations, but repeatedly conditions results on relative strength between Ten-God groups.',
    disposition: 'DIRECT_SEMANTICS_PROVENANCE_OR_METHOD_INADEQUATE',
    exactSourceIdentityConfirmed: true,
    formalPublicationProvenanceConfirmed: false,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: true,
    explicitCareerWorkSemantics: true,
    tenGodCombinationSemanticsExplicit: true,
    directMultiClaimCareerCompositionExplicit: true,
    branchClashCareerSemanticsExplicit: false,
    positionCareerSemanticsExplicit: false,
    visibilityCareerSemanticsExplicit: false,
    pluralityCareerSemanticsExplicit: false,
    seasonalCareerSemanticsExplicit: false,
    exactCurrentT5SemanticModifierCorrespondenceEstablished: false,
    conflictTensionPolicyExplicit: false,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodCompatibilityEstablished: false,
    competingMethodDependencyDetected: true,
    relativeForceOrStrengthHierarchyDetected: true,
    derivativeLineageRiskDetected: false,
    searchSnippetOnly: false,
    qualifyingCurrentMethodAuthorityCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'Direct Career-composition semantics are present, but the evidence is a modern web article rather than an independently established normative source and the rule logic depends on relative-strength comparison. It is a semantic lead only and cannot satisfy B19 current-method authority requirements.',
  }),
  Object.freeze({
    candidateId: 'XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION',
    taskId: 'T6_CURRENT_METHOD_DIRECT_CAREER_BRIDGE_AUTHORITY_ACQUISITION',
    sourceClass: 'FORMAL_PUBLISHED_BOOK_FULL_TEXT_MIRROR',
    sourceIdentity: '徐丙昕, 四柱學教程, 中國商業出版社, 2009-07, ISBN 9787504464903',
    sourceLocator:
      'Scribd searchable full-text mirror document 744314994, section 第三節 地支相合、沖、刑、害, lines corresponding to 地支六沖; independent bibliographic confirmation via Beijing Bookstore ISBN record',
    inspectedSurface:
      'The published text states that adjacent branch clashes have greater clash force than separated or remote clashes; 日沖月支 is associated with work/residence change; 子午卯酉 clashes may change residence without profession, 辰戌丑未 clashes may change profession without residence, and 寅申巳亥 clashes may change both.',
    disposition: 'PARTIAL_CURRENT_METHOD_ACQUISITION_EVIDENCE',
    exactSourceIdentityConfirmed: true,
    formalPublicationProvenanceConfirmed: true,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: true,
    explicitCareerWorkSemantics: true,
    tenGodCombinationSemanticsExplicit: false,
    directMultiClaimCareerCompositionExplicit: false,
    branchClashCareerSemanticsExplicit: true,
    positionCareerSemanticsExplicit: true,
    visibilityCareerSemanticsExplicit: false,
    pluralityCareerSemanticsExplicit: false,
    seasonalCareerSemanticsExplicit: false,
    exactCurrentT5SemanticModifierCorrespondenceEstablished: false,
    conflictTensionPolicyExplicit: false,
    independentNormativeProvenanceAdequate: true,
    currentGovernedMethodCompatibilityEstablished: false,
    competingMethodDependencyDetected: true,
    relativeForceOrStrengthHierarchyDetected: true,
    derivativeLineageRiskDetected: false,
    searchSnippetOnly: false,
    qualifyingCurrentMethodAuthorityCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'This is B20’s strongest T6 source. It materially improves provenance and provides direct natal clash-to-Career and position-sensitive text. It still does not bind the clash or positional statement to the existing T5 Career semantic claims, does not cover visibility/plurality/seasonal qualifiers, and the same methodology uses relative-force and 喜用/忌 semantics. It is therefore partial evidence, not a qualifying full bridge authority.',
  }),
  Object.freeze({
    candidateId: 'SIX_CLASH_CAREER_DERIVATIVE_WEB_CLUSTER',
    taskId: 'T6_CURRENT_METHOD_DIRECT_CAREER_BRIDGE_AUTHORITY_ACQUISITION',
    sourceClass: 'DERIVATIVE_WEB_TEXT_CLUSTER',
    sourceIdentity:
      'Repeated modern web corpus of 地支六沖職業/宮位 text, including Sina 2017, Sohu 2021, Hanyun, Shenjige, Datangzixun and later mirrors',
    sourceLocator:
      'Exact repeated phrases include 辰戌之沖…工作職業方面為辦公地方變動 / 職業多變動 and 月支…也主工作環境、同事的信息 across multiple mirrors',
    inspectedSurface:
      'Multiple sites directly associate six-clash categories and month-branch position with work or occupational changes. The wording is substantially duplicated across sites and commonly adds 喜/忌, 旺衰 or related method assumptions.',
    disposition: 'DIRECT_SEMANTICS_PROVENANCE_OR_METHOD_INADEQUATE',
    exactSourceIdentityConfirmed: false,
    formalPublicationProvenanceConfirmed: false,
    stableReproducibleLocatorConfirmed: true,
    originalOrVerifiedLocalContextInspected: true,
    explicitCareerWorkSemantics: true,
    tenGodCombinationSemanticsExplicit: false,
    directMultiClaimCareerCompositionExplicit: false,
    branchClashCareerSemanticsExplicit: true,
    positionCareerSemanticsExplicit: true,
    visibilityCareerSemanticsExplicit: false,
    pluralityCareerSemanticsExplicit: false,
    seasonalCareerSemanticsExplicit: false,
    exactCurrentT5SemanticModifierCorrespondenceEstablished: false,
    conflictTensionPolicyExplicit: false,
    independentNormativeProvenanceAdequate: false,
    currentGovernedMethodCompatibilityEstablished: false,
    competingMethodDependencyDetected: true,
    relativeForceOrStrengthHierarchyDetected: true,
    derivativeLineageRiskDetected: true,
    searchSnippetOnly: false,
    qualifyingCurrentMethodAuthorityCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'The cluster confirms that direct occupational clash language is widespread, but repeated wording does not create independent provenance. The origin is not securely established and the shared text typically imports 喜忌/旺衰 assumptions. The cluster is retained as lineage evidence only, not multiplied into several independent authorities.',
  }),
] as const satisfies readonly CareerT8CurrentMethodAcquisitionCandidateEvidence[]);

export interface CareerT8CurrentMethodAcquisitionTaskEvidence {
  taskId: CareerT8CurrentMethodResidualAcquisitionTaskId;
  acquisitionPerformed: true;
  candidateIds: readonly CareerT8CurrentMethodAcquisitionCandidateId[];
  candidateCount: number;
  formalPublicationCandidateCount: number;
  directCareerSemanticLeadCount: number;
  partialEvidenceCandidateCount: number;
  qualifyingCurrentMethodAuthorityCandidateCount: 0;
  authorityCandidatesAccepted: 0;
  gapsClosed: 0;
}

export const CAREER_T8_CURRENT_METHOD_ACQUISITION_TASK_EVIDENCE = Object.freeze([
  Object.freeze({
    taskId: 'T5_CURRENT_METHOD_DIRECT_BRIDGE_AUTHORITY_ACQUISITION',
    acquisitionPerformed: true,
    candidateIds: Object.freeze([
      'YANG_YIYUN_FULL_TEXT_REINSPECTION',
      'QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD',
      'WANG_YUANTANG_2022_DIRECT_TENGOD_CAREER_WEB_LEAD',
    ] as const),
    candidateCount: 3,
    formalPublicationCandidateCount: 1,
    directCareerSemanticLeadCount: 1,
    partialEvidenceCandidateCount: 2,
    qualifyingCurrentMethodAuthorityCandidateCount: 0,
    authorityCandidatesAccepted: 0,
    gapsClosed: 0,
  }),
  Object.freeze({
    taskId: 'T6_CURRENT_METHOD_DIRECT_CAREER_BRIDGE_AUTHORITY_ACQUISITION',
    acquisitionPerformed: true,
    candidateIds: Object.freeze([
      'XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION',
      'SIX_CLASH_CAREER_DERIVATIVE_WEB_CLUSTER',
    ] as const),
    candidateCount: 2,
    formalPublicationCandidateCount: 1,
    directCareerSemanticLeadCount: 2,
    partialEvidenceCandidateCount: 1,
    qualifyingCurrentMethodAuthorityCandidateCount: 0,
    authorityCandidatesAccepted: 0,
    gapsClosed: 0,
  }),
] as const satisfies readonly CareerT8CurrentMethodAcquisitionTaskEvidence[]);

export const CAREER_T8_CURRENT_METHOD_ACQUISITION_EVIDENCE_CONTROL_IDS = Object.freeze([
  'B20_EXECUTES_EXACTLY_THE_TWO_B19_CURRENT_METHOD_ACQUISITION_TASKS',
  'YANG_FULL_TEXT_REINSPECTION_DOES_NOT_STITCH_COMBINATION_AND_CAREER_CHAPTERS',
  'QIN_FORMAL_PUBLICATION_AND_TOC_DO_NOT_SUBSTITUTE_FOR_UNINSPECTED_PASSAGE_AUTHORITY',
  'MODERN_T5_DIRECT_CAREER_COMBINATION_WEB_LEADS_REMAIN_NON_NORMATIVE_AND_METHOD_BOUND',
  'XU_2009_IS_RECORDED_AS_FORMAL_PUBLISHED_PARTIAL_T6_CAREER_POSITION_EVIDENCE_ONLY',
  'XU_CLASH_CAREER_TEXT_DOES_NOT_CREATE_AN_UNSTATED_T5_SEMANTIC_MODIFIER_BRIDGE',
  'DERIVATIVE_SIX_CLASH_WEB_TEXT_IS_NOT_MULTIPLIED_INTO_INDEPENDENT_PROVENANCE',
  'NO_VISIBILITY_PLURALITY_OR_SEASONAL_CAREER_SEMANTICS_ARE_INFERRED_FROM_POSITION_EVIDENCE',
  'CHEONBU_AND_WANG_QING_HOLDS_ARE_NOT_EXECUTED_OR_RECLASSIFIED',
  'NO_COMPETING_METHOD_OR_RELATIVE_FORCE_HIERARCHY_IS_ADOPTED_BY_THIS_EVIDENCE_GATE',
  'ZERO_QUALIFYING_CURRENT_METHOD_AUTHORITY_CANDIDATES_ZERO_GAPS_CLOSED',
  'ALL_SIX_GAPS_REMAIN_OPEN_NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
    | 'UPSTREAM_B19_BOUNDARY_INVALID';
  decision:
    | 'TWO_CURRENT_METHOD_ACQUISITIONS_EXECUTED_PARTIAL_DIRECT_EVIDENCE_FOUND_ZERO_QUALIFYING_AUTHORITY_ALL_SIX_GAPS_OPEN'
    | 'CURRENT_METHOD_ACQUISITION_EVIDENCE_NOT_EXECUTED';
  upstreamB19ReviewId: string;
  exactB19BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  acquisitionTaskEvidence: readonly CareerT8CurrentMethodAcquisitionTaskEvidence[];
  acquisitionExecutionCount: 2 | 0;
  candidateEvidence: readonly CareerT8CurrentMethodAcquisitionCandidateEvidence[];
  candidateEvidenceCount: 5 | 0;
  t5AcquisitionExecuted: boolean;
  t6AcquisitionExecuted: boolean;
  yangFullTextReinspectionCompleted: boolean;
  yangDirectMultiClaimCareerBridgeConfirmed: false;
  qinFormalPublishedCareerCombinationChapterLeadConfirmed: boolean;
  qinTargetPassageBodyInspected: false;
  xuBingxinFormalPublicationConfirmed: boolean;
  xuBingxinDirectBranchClashCareerSemanticsConfirmed: boolean;
  xuBingxinPositionCareerSemanticsConfirmed: boolean;
  xuBingxinExactCurrentT5ModifierBridgeConfirmed: false;
  visibilityCareerModifierAuthorityConfirmed: false;
  pluralityCareerModifierAuthorityConfirmed: false;
  seasonalCareerModifierAuthorityConfirmed: false;
  derivativeWebClusterTreatedAsIndependentAuthorities: false;
  qualifyingCurrentMethodAuthorityCandidateCount: 0;
  authorityCandidatesAcceptedByThisGate: 0;
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  gapClosureCount: 0;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][];
  cheonbuHoldExecuted: false;
  cheonbuHoldReclassified: false;
  wangQingHoldExecuted: false;
  wangQingHoldReclassified: false;
  methodologyChoiceMadeByThisGate: false;
  competingMethodAdoptedByThisGate: false;
  relativeForceHierarchyAdoptedByThisGate: false;
  crossSourceStitchingAuthorized: false;
  globalCurrentMethodSourceAbsenceInferred: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_METHOD_ACQUISITION_EVIDENCE_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    acquisitionExecutionsPerformed: 2 | 0;
    candidateEvidenceRecordsCreated: 5 | 0;
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
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW';
}

function contentAddressedB19IdentityValid(
  b19: CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b19;
  return (
    reviewId ===
    `career_t8_current_method_residual_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB19Accepted(
  b19: CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
): boolean {
  return (
    contentAddressedB19IdentityValid(b19) &&
    b19.reviewVersion === CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION &&
    b19.status === 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS' &&
    b19.decision === 'TWO_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_HOLDS_EXCLUDED_NO_AUTHORITY_ACQUIRED' &&
    b19.exactB18BoundaryAccepted &&
    b19.acquisitionTaskCount === 2 &&
    deterministicContentHash(b19.acquisitionTasks) ===
      deterministicContentHash(CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS) &&
    b19.executableResidualClassCount === 2 &&
    b19.t5CurrentMethodAcquisitionReady &&
    b19.t6CurrentMethodAcquisitionReady &&
    b19.currentMethodDiscoveryMayContinueWithoutHumanMethodologyChoice &&
    b19.cheonbuHoldExcludedFromExecution &&
    b19.wangQingHoldExcludedFromExecution &&
    b19.wangQingHumanAdjudicationStillRequiredBeforeSemanticUse &&
    b19.acquisitionExecutionAuthorizedForNextGate &&
    b19.acquisitionPerformedByThisGate === false &&
    b19.authorityAcquiredByThisGate === false &&
    b19.authorityGapClosedByThisGate === false &&
    b19.crossSourceStitchingAuthorized === false &&
    b19.allSixGapsRemainOpen &&
    deterministicContentHash(b19.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b19.methodologyChoiceMadeByThisGate === false &&
    b19.t8RuleAuthoringAuthorized === false &&
    b19.productionPromotionAuthorized === false &&
    b19.controlsFrozen &&
    b19.controlCount === 12 &&
    deterministicContentHash(b19.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS) &&
    b19.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport {
  return {
    evidenceId: `career_t8_current_method_residual_authority_acquisition_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(
  b19: CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport {
  const accepted = exactB19Accepted(b19);

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
      : 'UPSTREAM_B19_BOUNDARY_INVALID',
    decision: accepted
      ? 'TWO_CURRENT_METHOD_ACQUISITIONS_EXECUTED_PARTIAL_DIRECT_EVIDENCE_FOUND_ZERO_QUALIFYING_AUTHORITY_ALL_SIX_GAPS_OPEN'
      : 'CURRENT_METHOD_ACQUISITION_EVIDENCE_NOT_EXECUTED',
    upstreamB19ReviewId: b19.reviewId,
    exactB19BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    acquisitionTaskEvidence: accepted ? CAREER_T8_CURRENT_METHOD_ACQUISITION_TASK_EVIDENCE : Object.freeze([]),
    acquisitionExecutionCount: accepted ? 2 : 0,
    candidateEvidence: accepted ? CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES : Object.freeze([]),
    candidateEvidenceCount: accepted ? 5 : 0,
    t5AcquisitionExecuted: accepted,
    t6AcquisitionExecuted: accepted,
    yangFullTextReinspectionCompleted: accepted,
    yangDirectMultiClaimCareerBridgeConfirmed: false,
    qinFormalPublishedCareerCombinationChapterLeadConfirmed: accepted,
    qinTargetPassageBodyInspected: false,
    xuBingxinFormalPublicationConfirmed: accepted,
    xuBingxinDirectBranchClashCareerSemanticsConfirmed: accepted,
    xuBingxinPositionCareerSemanticsConfirmed: accepted,
    xuBingxinExactCurrentT5ModifierBridgeConfirmed: false,
    visibilityCareerModifierAuthorityConfirmed: false,
    pluralityCareerModifierAuthorityConfirmed: false,
    seasonalCareerModifierAuthorityConfirmed: false,
    derivativeWebClusterTreatedAsIndependentAuthorities: false,
    qualifyingCurrentMethodAuthorityCandidateCount: 0,
    authorityCandidatesAcceptedByThisGate: 0,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    gapClosureCount: 0,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    cheonbuHoldExecuted: false,
    cheonbuHoldReclassified: false,
    wangQingHoldExecuted: false,
    wangQingHoldReclassified: false,
    methodologyChoiceMadeByThisGate: false,
    competingMethodAdoptedByThisGate: false,
    relativeForceHierarchyAdoptedByThisGate: false,
    crossSourceStitchingAuthorized: false,
    globalCurrentMethodSourceAbsenceInferred: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_CURRENT_METHOD_ACQUISITION_EVIDENCE_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      acquisitionExecutionsPerformed: accepted ? 2 : 0,
      candidateEvidenceRecordsCreated: accepted ? 5 : 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW',
  });
}
