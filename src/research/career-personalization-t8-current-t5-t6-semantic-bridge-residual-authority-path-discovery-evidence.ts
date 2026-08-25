import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
  type CareerT8BridgeResidualExecutionDisposition,
  type CareerT8BridgeResidualExecutionTaskId,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-discovery-evidence-v1' as const;

export type CareerT8BridgeResidualDiscoveryCandidateId =
  | 'SHIM_GWANGSUK_2018_JOB_APTITUDE_THESIS'
  | 'YANG_YIYUN_SHISHEN_CHANWEI'
  | 'WANG_QING_XUE_GEJU_SECOND_BOOK_CAREER_COMPOSITION'
  | 'SANMING_TONGHUI_VOL2_LUN_CHONGJI'
  | 'ZIPING_ZHENQUAN_OFFICIAL_PATTERN_CLASH_CONTEXT';

export type CareerT8BridgeResidualDiscoverySourceClass =
  | 'ACADEMIC_DOCTORAL_THESIS'
  | 'MODERN_METHOD_TEXT_UNCLEAR_FORMAL_PUBLICATION_PROVENANCE'
  | 'MODERN_METHOD_TEXT_COMPETING_FOUNDATIONAL_METHOD'
  | 'PUBLIC_CLASSIC_CANONICAL_TEXT';

export interface CareerT8BridgeResidualDiscoveryCandidateEvidence {
  candidateId: CareerT8BridgeResidualDiscoveryCandidateId;
  taskId: CareerT8BridgeResidualExecutionTaskId;
  sourceClass: CareerT8BridgeResidualDiscoverySourceClass;
  sourceIdentity: string;
  sourceLocator: string;
  inspectedSurface: string;
  disposition: CareerT8BridgeResidualExecutionDisposition;
  exactSourceIdentityConfirmed: boolean;
  reproducibleLocatorConfirmed: boolean;
  boundedLocalContextInspected: boolean;
  natalSemanticsRelevant: boolean;
  careerWorkSemanticsExplicit: boolean;
  tenGodCombinationSemanticsExplicit: boolean;
  directMultiClaimCareerCompositionExplicit: boolean;
  branchClashStructuralEffectExplicit: boolean;
  directCurrentT6CareerModifierExplicit: boolean;
  independentNormativeProvenanceAdequate: boolean;
  competingFoundationalMethodDependencyDetected: boolean;
  currentGovernedMethodSemanticCorrespondenceEstablished: boolean;
  qualifyingCandidate: false;
  authorityAdmissionAuthorized: false;
  gapClosureAuthorized: false;
  evidenceNote: string;
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES = Object.freeze([
  Object.freeze({
    candidateId: 'SHIM_GWANGSUK_2018_JOB_APTITUDE_THESIS',
    taskId: 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY_EXECUTION',
    sourceClass: 'ACADEMIC_DOCTORAL_THESIS',
    sourceIdentity:
      '심광숙, 직업적성에 대한 사주명리학적 연구, 대구한의대학교 대학원 동양사상학과 명리학 전공 박사학위논문, 2018',
    sourceLocator:
      'DBpia T14915303 / RISS controlNo=000014915303; abstract and table of contents, including IV.4 오행·간지·격을 통한 종합적 직업적성 분석',
    inspectedSurface:
      'The abstract and TOC explicitly argue that Saju Career aptitude should not be interpreted by a single dimension and propose a composite Ganji/Wollyeong/Gyeok framework, while also describing Gyeok/Yongshin as existing Career-aptitude approaches.',
    disposition: 'PARTIAL_CANDIDATE_DISCOVERED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    natalSemanticsRelevant: true,
    careerWorkSemanticsExplicit: true,
    tenGodCombinationSemanticsExplicit: false,
    directMultiClaimCareerCompositionExplicit: false,
    branchClashStructuralEffectExplicit: false,
    directCurrentT6CareerModifierExplicit: false,
    independentNormativeProvenanceAdequate: true,
    competingFoundationalMethodDependencyDetected: true,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'Useful higher-provenance evidence for the need for composite Career interpretation, but it does not expose the exact current T5 subtype/family multi-claim semantic bridge and explicitly includes Gyeok/Yongshin-oriented analysis. It cannot close a current-method T5 gap.',
  }),
  Object.freeze({
    candidateId: 'YANG_YIYUN_SHISHEN_CHANWEI',
    taskId: 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY_EXECUTION',
    sourceClass: 'MODERN_METHOD_TEXT_UNCLEAR_FORMAL_PUBLICATION_PROVENANCE',
    sourceIdentity: '楊逸雲, 十神闡微 / 十神含義闡微',
    sourceLocator:
      'Chapter 4 怎样分析十神间组合后其含义的变化; Chapter 7 section 7 职业的看法; public text mirrors at Dushu/Guoxuedashi/Scribd',
    inspectedSurface:
      'Chapter 4 explicitly treats interaction between multiple Ten-God meanings as producing changed or new meanings; the Career chapter separately enumerates Career associations for the Ten Gods.',
    disposition: 'PARTIAL_CANDIDATE_DISCOVERED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    natalSemanticsRelevant: true,
    careerWorkSemanticsExplicit: true,
    tenGodCombinationSemanticsExplicit: true,
    directMultiClaimCareerCompositionExplicit: false,
    branchClashStructuralEffectExplicit: false,
    directCurrentT6CareerModifierExplicit: false,
    independentNormativeProvenanceAdequate: false,
    competingFoundationalMethodDependencyDetected: true,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'This is the closest non-Wang candidate to the desired architecture because it has a dedicated Ten-God combination method and a dedicated Career section. The inspected surfaces do not directly bind a specific multi-Ten-God composition to a Career semantic pattern, formal publication provenance is not securely established, and the text also uses strength/喜用 concepts outside the bounded bridge. No current-method authority is admitted.',
  }),
  Object.freeze({
    candidateId: 'WANG_QING_XUE_GEJU_SECOND_BOOK_CAREER_COMPOSITION',
    taskId: 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY_EXECUTION',
    sourceClass: 'MODERN_METHOD_TEXT_COMPETING_FOUNDATIONAL_METHOD',
    sourceIdentity: '王慶, 學格局的第二本書',
    sourceLocator:
      'Publicly mirrored Career passages and resource catalogs identifying the title/author; passages describe Career through 五行十神组合 and primary/secondary roles within a combination',
    inspectedSurface:
      'The inspected passages explicitly state that Career is expressed through Five-Element/Ten-God combinations and give examples where the same Ten-God pair yields different Career meanings depending on which component is primary.',
    disposition: 'CANDIDATE_METHOD_INCOMPATIBLE',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: false,
    boundedLocalContextInspected: true,
    natalSemanticsRelevant: true,
    careerWorkSemanticsExplicit: true,
    tenGodCombinationSemanticsExplicit: true,
    directMultiClaimCareerCompositionExplicit: true,
    branchClashStructuralEffectExplicit: false,
    directCurrentT6CareerModifierExplicit: false,
    independentNormativeProvenanceAdequate: false,
    competingFoundationalMethodDependencyDetected: true,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'Semantically this is the strongest discovered T5 multi-claim Career composition lead. It is nevertheless embedded in an explicit 格局/太極點/得用十神/用神 methodology and the formal publication/provenance chain remains unclear. Adopting its composition semantics would require a separate competing-method adjudication rather than silent import.',
  }),
  Object.freeze({
    candidateId: 'SANMING_TONGHUI_VOL2_LUN_CHONGJI',
    taskId: 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY_EXECUTION',
    sourceClass: 'PUBLIC_CLASSIC_CANONICAL_TEXT',
    sourceIdentity: '明·萬民英, 三命通會, 卷二, 論沖擊',
    sourceLocator: 'Wikisource 三命通會/卷二, section 論沖擊',
    inspectedSurface:
      'The classic passage explicitly treats branch clash as context-sensitive, states that clash can activate or damage stored 財官印綬 material, and distinguishes outcomes by the pre-existing condition of the chart.',
    disposition: 'PARTIAL_CANDIDATE_DISCOVERED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    natalSemanticsRelevant: true,
    careerWorkSemanticsExplicit: false,
    tenGodCombinationSemanticsExplicit: false,
    directMultiClaimCareerCompositionExplicit: false,
    branchClashStructuralEffectExplicit: true,
    directCurrentT6CareerModifierExplicit: false,
    independentNormativeProvenanceAdequate: true,
    competingFoundationalMethodDependencyDetected: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'High-provenance structural authority confirms that clash effects are conditional and can interact with stored Ten-God material. Its outcomes are classical status/fortune semantics, not a direct generic Career/work modifier for the governed T6 claims. Translating 科甲/食禄/官贵 language into modern Career patterns would be an unsupported semantic jump.',
  }),
  Object.freeze({
    candidateId: 'ZIPING_ZHENQUAN_OFFICIAL_PATTERN_CLASH_CONTEXT',
    taskId: 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY_EXECUTION',
    sourceClass: 'PUBLIC_CLASSIC_CANONICAL_TEXT',
    sourceIdentity: '子平真詮 / 子平真詮評注, 正官格成敗與刑沖脈絡',
    sourceLocator:
      'Public classic text mirrors for 正官格成敗/格局高低 passages; official pattern is described as requiring absence of damaging 刑沖破害 and clash may alter pattern integrity',
    inspectedSurface:
      'The inspected classic passages provide a direct relation between clash and the integrity of a 正官-oriented pattern, but the semantic frame is 格局成敗/官貴 rather than a generic present-day Career modifier.',
    disposition: 'PARTIAL_CANDIDATE_DISCOVERED',
    exactSourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    boundedLocalContextInspected: true,
    natalSemanticsRelevant: true,
    careerWorkSemanticsExplicit: false,
    tenGodCombinationSemanticsExplicit: false,
    directMultiClaimCareerCompositionExplicit: false,
    branchClashStructuralEffectExplicit: true,
    directCurrentT6CareerModifierExplicit: false,
    independentNormativeProvenanceAdequate: true,
    competingFoundationalMethodDependencyDetected: true,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    authorityAdmissionAuthorized: false,
    gapClosureAuthorized: false,
    evidenceNote:
      'This is stronger than modern Career blogs for proving that clash can modify an official-pattern structure, but using that pattern-success/failure doctrine as the current T6 Career modifier would import a separate 格局 methodology and still require a modern Career semantic bridge.',
  }),
] as const satisfies readonly CareerT8BridgeResidualDiscoveryCandidateEvidence[]);

export interface CareerT8BridgeResidualDiscoveryTaskEvidence {
  taskId: CareerT8BridgeResidualExecutionTaskId;
  discoveryPerformed: true;
  candidateIds: readonly CareerT8BridgeResidualDiscoveryCandidateId[];
  candidateAttemptCount: number;
  primaryDisposition: CareerT8BridgeResidualExecutionDisposition;
  partialCandidateCount: number;
  qualifyingCandidateCount: 0;
  authorityCandidatesAccepted: 0;
  gapsClosed: 0;
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_TASK_EVIDENCE = Object.freeze([
  Object.freeze({
    taskId: 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY_EXECUTION',
    discoveryPerformed: true,
    candidateIds: Object.freeze([
      'SHIM_GWANGSUK_2018_JOB_APTITUDE_THESIS',
      'YANG_YIYUN_SHISHEN_CHANWEI',
      'WANG_QING_XUE_GEJU_SECOND_BOOK_CAREER_COMPOSITION',
    ] as const),
    candidateAttemptCount: 3,
    primaryDisposition: 'PARTIAL_CANDIDATE_DISCOVERED',
    partialCandidateCount: 2,
    qualifyingCandidateCount: 0,
    authorityCandidatesAccepted: 0,
    gapsClosed: 0,
  }),
  Object.freeze({
    taskId: 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY_EXECUTION',
    discoveryPerformed: true,
    candidateIds: Object.freeze([
      'SANMING_TONGHUI_VOL2_LUN_CHONGJI',
      'ZIPING_ZHENQUAN_OFFICIAL_PATTERN_CLASH_CONTEXT',
    ] as const),
    candidateAttemptCount: 2,
    primaryDisposition: 'PARTIAL_CANDIDATE_DISCOVERED',
    partialCandidateCount: 2,
    qualifyingCandidateCount: 0,
    authorityCandidatesAccepted: 0,
    gapsClosed: 0,
  }),
] as const satisfies readonly CareerT8BridgeResidualDiscoveryTaskEvidence[]);

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CONTROL_IDS = Object.freeze([
  'B17_EXECUTES_ONLY_THE_TWO_B16_DISCOVERY_TASKS',
  'CHEONBU_EXTERNAL_FULL_TEXT_HOLD_IS_NOT_RETRIED_OR_RECLASSIFIED',
  'ACADEMIC_COMPOSITE_CAREER_METHOD_EVIDENCE_DOES_NOT_SUBSTITUTE_FOR_EXACT_T5_BRIDGE_AUTHORITY',
  'YANG_COMBINATION_AND_CAREER_CHAPTERS_ARE_NOT_STITCHED_INTO_AN_UNSTATED_DIRECT_BRIDGE',
  'WANG_EXPLICIT_MULTI_CLAIM_CAREER_COMPOSITION_IS_RECORDED_BUT_COMPETING_METHOD_IMPORT_IS_NOT_AUTHORIZED',
  'CLASSIC_CLASH_EFFECT_CONTEXT_IS_NOT_TRANSLATED_FROM_OFFICIAL_STATUS_TO_GENERIC_MODERN_CAREER_SEMANTICS',
  'PUBLIC_CLASSIC_PROVENANCE_DOES_NOT_WAIVE_CURRENT_METHOD_SEMANTIC_CORRESPONDENCE',
  'PARTIAL_EVIDENCE_IS_NOT_A_QUALIFYING_AUTHORITY_CANDIDATE',
  'NO_CROSS_SOURCE_STITCHING_TO_CLOSE_ANY_GAP',
  'COMPETING_FOUNDATIONAL_METHOD_CHOICE_IS_SURFACED_NOT_DECIDED',
  'ALL_SIX_CAREER_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE'
    | 'UPSTREAM_B16_BOUNDARY_INVALID';
  decision:
    | 'T5_AND_T6_PARTIAL_CANDIDATES_DISCOVERED_ZERO_CURRENT_METHOD_QUALIFYING_AUTHORITY_COMPETING_METHOD_BOUNDARY_SURFACED_ALL_SIX_GAPS_OPEN'
    | 'RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE_NOT_ESTABLISHED';
  upstreamB16ReviewId: string;
  exactB16BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  discoveryPerformed: boolean;
  taskEvidence: readonly CareerT8BridgeResidualDiscoveryTaskEvidence[];
  taskEvidenceCount: 2 | 0;
  candidateEvidence: readonly CareerT8BridgeResidualDiscoveryCandidateEvidence[];
  candidateAttemptCount: 5 | 0;
  t5CandidateAttemptCount: 3 | 0;
  t5PrimaryDisposition: CareerT8BridgeResidualExecutionDisposition | null;
  t5AcademicCompositeCareerMethodEvidenceFound: boolean;
  t5TenGodCombinationMethodTextFound: boolean;
  t5DirectMultiClaimCareerCompositionLeadFound: boolean;
  t5CurrentMethodQualifyingCandidateCount: 0;
  t6CandidateAttemptCount: 2 | 0;
  t6PrimaryDisposition: CareerT8BridgeResidualExecutionDisposition | null;
  t6HighProvenanceClassicClashContextFound: boolean;
  t6DirectCurrentMethodCareerModifierFound: false;
  t6CurrentMethodQualifyingCandidateCount: 0;
  competingFoundationalMethodChoiceSurfaced: boolean;
  competingFoundationalMethodChoiceMadeByThisGate: false;
  crossSourceStitchingAuthorized: false;
  cheonbuExternalFullTextHoldPreserved: boolean;
  cheonbuRetriedByThisGate: false;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][];
  authorityAcquiredByThisGate: false;
  authorityCandidateAcceptedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    discoveryExecutionsPerformed: 2 | 0;
    candidateEvidenceRecordsCreated: 5 | 0;
    candidatesRegistered: 0;
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
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW';
}

function contentAddressedB16IdentityValid(
  b16: CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b16;
  return (
    reviewId ===
    `career_t8_current_t5_t6_bridge_residual_authority_path_execution_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB16Accepted(
  b16: CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
): boolean {
  return (
    contentAddressedB16IdentityValid(b16) &&
    b16.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION &&
    b16.status ===
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS' &&
    b16.decision ===
      'TWO_ACTIVE_RESIDUAL_DISCOVERY_TASKS_EXECUTION_READY_CHEONBU_EXTERNAL_HOLD_PRESERVED_NO_AUTHORITY_ACQUIRED' &&
    b16.exactB15BoundaryAccepted &&
    b16.executionTaskCount === 2 &&
    deterministicContentHash(b16.executionTasks) === deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS) &&
    b16.executablePathCount === 2 &&
    b16.cheonbuExternalFullTextHoldPreserved &&
    b16.cheonbuPublicWebRetryAuthorized === false &&
    b16.cheonbuPathExecutionAuthorized === false &&
    b16.t5AlternateNormativeDiscoveryExecutionReady &&
    b16.t6HigherProvenanceNatalDiscoveryExecutionReady &&
    b16.negativeDiscoveryPreservedAsFirstClassResult &&
    b16.fallbackAuthoritySynthesisAuthorized === false &&
    b16.crossSourceStitchingAuthorized === false &&
    b16.allSixGapsRemainOpen &&
    deterministicContentHash(b16.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b16.authorityAcquiredByThisGate === false &&
    b16.authorityGapClosedByThisGate === false &&
    b16.discoveryPerformedByThisGate === false &&
    b16.t8RuleAuthoringAuthorized === false &&
    b16.productionPromotionAuthorized === false &&
    b16.controlsFrozen &&
    b16.controlCount === 12 &&
    deterministicContentHash(b16.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS) &&
    b16.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE'
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport {
  return {
    evidenceId: `career_t8_current_t5_t6_bridge_residual_authority_path_discovery_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidence(
  b16: CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport {
  const accepted = exactB16Accepted(b16);

  return finalized({
    evidenceVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE'
      : 'UPSTREAM_B16_BOUNDARY_INVALID',
    decision: accepted
      ? 'T5_AND_T6_PARTIAL_CANDIDATES_DISCOVERED_ZERO_CURRENT_METHOD_QUALIFYING_AUTHORITY_COMPETING_METHOD_BOUNDARY_SURFACED_ALL_SIX_GAPS_OPEN'
      : 'RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE_NOT_ESTABLISHED',
    upstreamB16ReviewId: b16.reviewId,
    exactB16BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    discoveryPerformed: accepted,
    taskEvidence: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_TASK_EVIDENCE : Object.freeze([]),
    taskEvidenceCount: accepted ? 2 : 0,
    candidateEvidence: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES : Object.freeze([]),
    candidateAttemptCount: accepted ? 5 : 0,
    t5CandidateAttemptCount: accepted ? 3 : 0,
    t5PrimaryDisposition: accepted ? 'PARTIAL_CANDIDATE_DISCOVERED' : null,
    t5AcademicCompositeCareerMethodEvidenceFound: accepted,
    t5TenGodCombinationMethodTextFound: accepted,
    t5DirectMultiClaimCareerCompositionLeadFound: accepted,
    t5CurrentMethodQualifyingCandidateCount: 0,
    t6CandidateAttemptCount: accepted ? 2 : 0,
    t6PrimaryDisposition: accepted ? 'PARTIAL_CANDIDATE_DISCOVERED' : null,
    t6HighProvenanceClassicClashContextFound: accepted,
    t6DirectCurrentMethodCareerModifierFound: false,
    t6CurrentMethodQualifyingCandidateCount: 0,
    competingFoundationalMethodChoiceSurfaced: accepted,
    competingFoundationalMethodChoiceMadeByThisGate: false,
    crossSourceStitchingAuthorized: false,
    cheonbuExternalFullTextHoldPreserved: accepted,
    cheonbuRetriedByThisGate: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAcquiredByThisGate: false,
    authorityCandidateAcceptedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      discoveryExecutionsPerformed: accepted ? 2 : 0,
      candidateEvidenceRecordsCreated: accepted ? 5 : 0,
      candidatesRegistered: 0,
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
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW',
  });
}
