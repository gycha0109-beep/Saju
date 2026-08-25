import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport,
  type CareerT8BridgeExecutionResultDisposition,
  type CareerT8BridgeExecutionTaskId,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence-v1' as const;

export type CareerT8BridgeExecutionSourceClass =
  | 'published_book_retail_metadata'
  | 'modern_practitioner_web_article'
  | 'modern_educational_web_article';

export interface CareerT8BridgeExecutionSourceAttempt {
  attemptId: string;
  taskId: CareerT8BridgeExecutionTaskId;
  title: string;
  authorOrPublisher: string;
  sourceClass: CareerT8BridgeExecutionSourceClass;
  stableUrl: string;
  inspectedSurface: string;
  inspectedAt: '2026-08-26';
  faithfulEvidenceNote: string;
  sourceIdentityConfirmed: boolean;
  reproducibleLocatorConfirmed: boolean;
  exactTargetPassageAvailable: boolean;
  fullLocalContextAvailable: boolean;
  explicitNatalCareerSemanticObserved: boolean;
  explicitDynamicCareerChangeSemanticObserved: boolean;
  explicitNumericOrStrengthMethodObserved: boolean;
  competingMethodDependenceObserved: boolean;
  independentNormativeProvenanceEstablished: boolean;
  currentClaimSemanticCorrespondenceEstablished: boolean;
  qualifyingCandidate: boolean;
  rejectionReasons: readonly string[];
}

export interface CareerT8BridgeTaskExecutionEvidenceRecord {
  evidenceRecordId: string;
  taskId: CareerT8BridgeExecutionTaskId;
  primaryDisposition: CareerT8BridgeExecutionResultDisposition;
  secondaryDispositions: readonly CareerT8BridgeExecutionResultDisposition[];
  sourceAttempts: readonly CareerT8BridgeExecutionSourceAttempt[];
  sourceAttemptCount: number;
  qualifyingCandidateCount: 0;
  authorityAccepted: false;
  authorityGapClosed: false;
  fallbackAuthoritySynthesized: false;
  evidenceStitchedAcrossTasks: false;
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS = Object.freeze([
  'EXECUTION_EVIDENCE_RECORDS_POSITIVE_PARTIAL_BLOCKED_AND_NEGATIVE_RESULTS',
  'CHEONBU_IDENTITY_AND_RELEVANT_TOC_EXISTENCE_CONFIRMED_ON_TWO_PUBLIC_RETAIL_SURFACES',
  'CHEONBU_EXACT_TARGET_PASSAGE_PAGE_AND_LOCAL_CONTEXT_NOT_ACQUIRED',
  'CHEONBU_PARTIAL_ACCESS_DOES_NOT_ESTABLISH_METHOD_COMPATIBILITY_OR_CURRENT_T5_CORRESPONDENCE',
  'T6_TARGETED_DISCOVERY_INSPECTED_NATAL_AND_DYNAMIC_CAREER_LEADS',
  'MODERN_NATAL_CAREER_WEB_LEADS_ARE_NOT_INDEPENDENT_NORMATIVE_AUTHORITY',
  'DYNAMIC_CAREER_CHANGE_LEADS_ARE_NOT_NATAL_QUALITATIVE_MODIFIER_AUTHORITY',
  'YONGSHIN_XIJI_OR_STRENGTH_DEPENDENT_LEADS_REMAIN_METHOD_INCOMPATIBLE',
  'NO_QUALIFYING_T6_CANDIDATE_FOUND_NO_FALLBACK_SYNTHESIS',
  'NO_CROSS_SOURCE_OR_CROSS_TASK_STITCHING_TO_SIMULATE_AUTHORITY',
  'ALL_SIX_CAREER_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE'
    | 'UPSTREAM_B13_BOUNDARY_INVALID';
  decision:
    | 'CHEONBU_PARTIAL_IDENTITY_TOC_EVIDENCE_EXACT_PASSAGE_ACCESS_BLOCKED_T6_NO_QUALIFYING_CANDIDATE_NO_AUTHORITY_ACQUIRED'
    | 'ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_NOT_ESTABLISHED';
  upstreamB13ReviewId: string;
  exactB13BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  executionPerformed: boolean;
  taskEvidenceRecords: readonly CareerT8BridgeTaskExecutionEvidenceRecord[];
  taskEvidenceRecordCount: 2 | 0;
  totalSourceAttemptCount: 6 | 0;
  cheonbuSourceAttemptCount: 2 | 0;
  t6SourceAttemptCount: 4 | 0;
  cheonbuPrimaryDisposition: 'PARTIAL_EVIDENCE_ACQUIRED' | null;
  cheonbuAccessBlocked: boolean;
  cheonbuSourceIdentityCrossConfirmed: boolean;
  cheonbuRelevantCareerSectionsExistenceConfirmed: boolean;
  cheonbuExactPassagePageAcquired: false;
  cheonbuFullLocalContextAcquired: false;
  cheonbuMethodologyFullyClassified: false;
  cheonbuCurrentT5SemanticCorrespondenceEstablished: false;
  cheonbuIndependentNormativeCorroborationAcquired: false;
  t6PrimaryDisposition: 'NO_QUALIFYING_CANDIDATE_FOUND' | null;
  t6TargetedDiscoveryPerformed: boolean;
  t6NatalCareerLeadCount: 2 | 0;
  t6DynamicCareerChangeLeadCount: 2 | 0;
  t6QualifyingCandidateCount: 0;
  t6IndependentNormativeAuthorityCandidateCount: 0;
  t6CurrentClaimSemanticCorrespondenceEstablishedCount: 0;
  t6DynamicEventLeadsRejected: boolean;
  t6CompetingMethodOrStrengthLeadRejected: boolean;
  negativeEvidencePreserved: boolean;
  fallbackAuthoritySynthesized: false;
  crossSourceStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  registeredCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityGapClosedCount: 0;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly string[];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceAttemptsRecorded: 6 | 0;
    evidenceRecordsCreated: 2 | 0;
    registeredSourcesCreated: 0;
    registeredCandidatesCreated: 0;
    authorityCandidatesAccepted: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW';
}

const CHEONBU_ATTEMPTS = Object.freeze([
  Object.freeze({
    attemptId: 'cheonbu_yes24_2026_08_26',
    taskId: 'CHEONBU_PRIMARY_SOURCE_ACCESS_EXECUTION',
    title: '천부명리학 : 통변론',
    authorOrPublisher: '김용혁 / 내하출판사 / YES24 retail surface',
    sourceClass: 'published_book_retail_metadata',
    stableUrl: 'https://m.yes24.com/goods/detail/91729012',
    inspectedSurface: 'Public bibliographic metadata, publisher description, and table of contents',
    inspectedAt: '2026-08-26',
    faithfulEvidenceNote:
      'The public surface confirms the 2020 김용혁/내하출판사 volume and exposes Career chapter entries including 십신의 직업적성 and 십신구조에 따른 직업특성, but not the target body passage, page locator, or bounded local context.',
    sourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    exactTargetPassageAvailable: false,
    fullLocalContextAvailable: false,
    explicitNatalCareerSemanticObserved: true,
    explicitDynamicCareerChangeSemanticObserved: true,
    explicitNumericOrStrengthMethodObserved: false,
    competingMethodDependenceObserved: false,
    independentNormativeProvenanceEstablished: false,
    currentClaimSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    rejectionReasons: Object.freeze([
      'Retail table of contents is discovery/access evidence, not the exact Career semantic passage required by B10-B13.',
      'No page-bound body text or surrounding local context is publicly exposed.',
      'Method ingredients and correspondence to the governed current T5 semantic primitives therefore remain unestablished.',
    ]),
  }),
  Object.freeze({
    attemptId: 'cheonbu_aladin_2026_08_26',
    taskId: 'CHEONBU_PRIMARY_SOURCE_ACCESS_EXECUTION',
    title: '천부명리학 : 통변론',
    authorOrPublisher: '김용혁 / 내하출판사 / Aladin retail surface',
    sourceClass: 'published_book_retail_metadata',
    stableUrl: 'https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=248651396',
    inspectedSurface: 'Public bibliographic metadata for the exact retail edition',
    inspectedAt: '2026-08-26',
    faithfulEvidenceNote:
      'The Aladin product surface independently confirms title, author, publisher, publication date, 386-page extent, and ISBN 9788957175262, but does not expose the target body passage or exact Career section pages.',
    sourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    exactTargetPassageAvailable: false,
    fullLocalContextAvailable: false,
    explicitNatalCareerSemanticObserved: false,
    explicitDynamicCareerChangeSemanticObserved: false,
    explicitNumericOrStrengthMethodObserved: false,
    competingMethodDependenceObserved: false,
    independentNormativeProvenanceEstablished: false,
    currentClaimSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    rejectionReasons: Object.freeze([
      'This second retailer corroborates source identity but supplies no exact semantic passage.',
      'Identity corroboration cannot substitute for original passage inspection or independent normative corroboration of the proposed Career mapping.',
    ]),
  }),
] as const satisfies readonly CareerT8BridgeExecutionSourceAttempt[]);

const T6_ATTEMPTS = Object.freeze([
  Object.freeze({
    attemptId: 't6_sajuclass_natal_clash_2026_08_26',
    taskId: 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    title: '원국 충 해석의 다양한 관점',
    authorOrPublisher: '사주클래스',
    sourceClass: 'modern_practitioner_web_article',
    stableUrl: 'https://sajuclass.com/%EC%9B%90%EA%B5%AD-%EC%B6%A9-%ED%95%B4%EC%84%9D/',
    inspectedSurface: 'Public web article discussing original-chart clash interpretation',
    inspectedAt: '2026-08-26',
    faithfulEvidenceNote:
      'The article explicitly distinguishes original-chart clash from event-first reading and links clash placement to internal conditions, including occupational/social adaptation, but also uses broader whole-chart strength/context concepts and supplies no independent source-bound normative passage for the current T6 claim semantics.',
    sourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    exactTargetPassageAvailable: true,
    fullLocalContextAvailable: true,
    explicitNatalCareerSemanticObserved: true,
    explicitDynamicCareerChangeSemanticObserved: false,
    explicitNumericOrStrengthMethodObserved: true,
    competingMethodDependenceObserved: false,
    independentNormativeProvenanceEstablished: false,
    currentClaimSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    rejectionReasons: Object.freeze([
      'Modern practitioner article is not independent normative provenance for a new interpretation authority.',
      'No source-bound mapping to the governed branch-clash qualifier or seasonal-phase claim semantics is established.',
      'The article relies on broader strength/context judgments outside the narrow current T6 qualifier contract.',
    ]),
  }),
  Object.freeze({
    attemptId: 't6_sazasaju_hyungchung_2026_08_26',
    taskId: 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    title: '사주 형충파해 뜻: 충·형이 내 사주에 있다면',
    authorOrPublisher: '사자사주 편집부',
    sourceClass: 'modern_educational_web_article',
    stableUrl: 'https://www.sazasaju.com/blog/hyungchungpahae-guide',
    inspectedSurface: 'Public educational web article with pillar and occupation-oriented clash interpretations',
    inspectedAt: '2026-08-26',
    faithfulEvidenceNote:
      'The article gives natal-position and occupation-oriented interpretations for clash and combines 형/충 with modern occupational examples, but it does not provide an exact source-bound traditional passage that establishes the current T6 qualifier-to-Career modifier correspondence.',
    sourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    exactTargetPassageAvailable: true,
    fullLocalContextAvailable: true,
    explicitNatalCareerSemanticObserved: true,
    explicitDynamicCareerChangeSemanticObserved: false,
    explicitNumericOrStrengthMethodObserved: true,
    competingMethodDependenceObserved: false,
    independentNormativeProvenanceEstablished: false,
    currentClaimSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    rejectionReasons: Object.freeze([
      'Modern educational synthesis is not sufficient normative provenance for T8-authorizing Career semantics.',
      'It mixes 형 and 충 and general occupation categories rather than the governed current T6 branch-clash qualifier primitives.',
      'No exact independent source passage binds visibility, position, plurality, or categorical seasonal phase to a Career modifier.',
    ]),
  }),
  Object.freeze({
    attemptId: 't6_sohu_job_change_2026_08_26',
    taskId: 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    title: '从八字如何看出一个人住所和职业的变动？',
    authorOrPublisher: '王炳森周易工作室 / Sohu',
    sourceClass: 'modern_practitioner_web_article',
    stableUrl: 'https://www.sohu.com/a/360868183_100209262',
    inspectedSurface: 'Public practitioner article about timing residence and profession changes',
    inspectedAt: '2026-08-26',
    faithfulEvidenceNote:
      'The article classifies clash groups as indicators of residence or profession change and frames the rule around predicting when movement occurs, including clash-year realization, rather than a natal qualitative Career modifier.',
    sourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    exactTargetPassageAvailable: true,
    fullLocalContextAvailable: true,
    explicitNatalCareerSemanticObserved: false,
    explicitDynamicCareerChangeSemanticObserved: true,
    explicitNumericOrStrengthMethodObserved: false,
    competingMethodDependenceObserved: false,
    independentNormativeProvenanceEstablished: false,
    currentClaimSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    rejectionReasons: Object.freeze([
      'Dynamic profession-change timing semantics do not satisfy the natal Career qualitative-modifier lane.',
      'Practitioner web publication does not establish independent normative provenance or current T6 correspondence.',
    ]),
  }),
  Object.freeze({
    attemptId: 't6_fude99_job_change_2026_08_26',
    taskId: 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    title: '八字怎么体现一个人工作或事业的变化',
    authorOrPublisher: '闾山道䇾学院',
    sourceClass: 'modern_educational_web_article',
    stableUrl: 'https://www.fude99.cn/article-228.html',
    inspectedSurface: 'Public educational article about career-change prediction',
    inspectedAt: '2026-08-26',
    faithfulEvidenceNote:
      'The article treats clash as a sign used to predict occupational change and explicitly evaluates whether the change is good or bad through 流年喜忌/喜用神, which is both dynamic and dependent on a competing methodology excluded from the current acquisition track.',
    sourceIdentityConfirmed: true,
    reproducibleLocatorConfirmed: true,
    exactTargetPassageAvailable: true,
    fullLocalContextAvailable: true,
    explicitNatalCareerSemanticObserved: false,
    explicitDynamicCareerChangeSemanticObserved: true,
    explicitNumericOrStrengthMethodObserved: true,
    competingMethodDependenceObserved: true,
    independentNormativeProvenanceEstablished: false,
    currentClaimSemanticCorrespondenceEstablished: false,
    qualifyingCandidate: false,
    rejectionReasons: Object.freeze([
      'Dynamic luck-based Career change prediction is outside the natal modifier scope.',
      '喜用神/喜忌 dependence is a competing foundational methodology that B10-B13 explicitly defer.',
      'No adaptation or stripping of that method is authorized.',
    ]),
  }),
] as const satisfies readonly CareerT8BridgeExecutionSourceAttempt[]);

function evidenceRecord(
  taskId: CareerT8BridgeExecutionTaskId,
  primaryDisposition: CareerT8BridgeExecutionResultDisposition,
  secondaryDispositions: readonly CareerT8BridgeExecutionResultDisposition[],
  sourceAttempts: readonly CareerT8BridgeExecutionSourceAttempt[],
): CareerT8BridgeTaskExecutionEvidenceRecord {
  const material = {
    taskId,
    primaryDisposition,
    secondaryDispositions,
    sourceAttempts,
    sourceAttemptCount: sourceAttempts.length,
    qualifyingCandidateCount: 0 as const,
    authorityAccepted: false as const,
    authorityGapClosed: false as const,
    fallbackAuthoritySynthesized: false as const,
    evidenceStitchedAcrossTasks: false as const,
  };
  return Object.freeze({
    evidenceRecordId: `career_t8_bridge_execution_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_RECORDS =
  Object.freeze([
    evidenceRecord(
      'CHEONBU_PRIMARY_SOURCE_ACCESS_EXECUTION',
      'PARTIAL_EVIDENCE_ACQUIRED',
      Object.freeze(['ACCESS_BLOCKED'] as const),
      CHEONBU_ATTEMPTS,
    ),
    evidenceRecord(
      'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
      'NO_QUALIFYING_CANDIDATE_FOUND',
      Object.freeze(['CANDIDATE_METHOD_INCOMPATIBLE', 'CANDIDATE_SEMANTIC_MISMATCH'] as const),
      T6_ATTEMPTS,
    ),
  ] as const satisfies readonly CareerT8BridgeTaskExecutionEvidenceRecord[]);

function contentAddressedB13IdentityValid(
  b13: CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b13;
  return (
    reviewId ===
    `career_t8_current_t5_t6_bridge_active_remediation_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB13Accepted(
  b13: CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport,
): boolean {
  return (
    contentAddressedB13IdentityValid(b13) &&
    b13.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION &&
    b13.status ===
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS' &&
    b13.decision ===
      'TWO_ACTIVE_PRIMARY_REMEDIATION_TASKS_EXECUTION_READY_EVIDENCE_ONLY_NO_AUTHORITY_ACQUIRED' &&
    b13.exactB12BoundaryAccepted &&
    b13.executionTaskCount === 2 &&
    deterministicContentHash(b13.executionTasks) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS) &&
    b13.cheonbuSourceAccessExecutionReady &&
    b13.t6NewCandidateDiscoveryExecutionReady &&
    b13.negativeEvidencePreservedAsFirstClassResult &&
    b13.crossTaskStitchingAuthorized === false &&
    b13.allSixGapsRemainOpen &&
    deterministicContentHash(b13.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b13.authorityAcquiredByThisGate === false &&
    b13.authorityGapClosedByThisGate === false &&
    b13.t8RuleAuthoringAuthorized === false &&
    b13.productionPromotionAuthorized === false &&
    b13.controlsFrozen &&
    b13.controlCount === 12 &&
    deterministicContentHash(b13.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS) &&
    b13.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE'
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
    'evidenceId'
  >,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport {
  return {
    evidenceId: `career_t8_current_t5_t6_bridge_active_remediation_execution_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
  b13: CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport {
  const accepted = exactB13Accepted(b13);

  return finalized({
    evidenceVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE'
      : 'UPSTREAM_B13_BOUNDARY_INVALID',
    decision: accepted
      ? 'CHEONBU_PARTIAL_IDENTITY_TOC_EVIDENCE_EXACT_PASSAGE_ACCESS_BLOCKED_T6_NO_QUALIFYING_CANDIDATE_NO_AUTHORITY_ACQUIRED'
      : 'ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_NOT_ESTABLISHED',
    upstreamB13ReviewId: b13.reviewId,
    exactB13BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    executionPerformed: accepted,
    taskEvidenceRecords: accepted
      ? CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_RECORDS
      : Object.freeze([]),
    taskEvidenceRecordCount: accepted ? 2 : 0,
    totalSourceAttemptCount: accepted ? 6 : 0,
    cheonbuSourceAttemptCount: accepted ? 2 : 0,
    t6SourceAttemptCount: accepted ? 4 : 0,
    cheonbuPrimaryDisposition: accepted ? 'PARTIAL_EVIDENCE_ACQUIRED' : null,
    cheonbuAccessBlocked: accepted,
    cheonbuSourceIdentityCrossConfirmed: accepted,
    cheonbuRelevantCareerSectionsExistenceConfirmed: accepted,
    cheonbuExactPassagePageAcquired: false,
    cheonbuFullLocalContextAcquired: false,
    cheonbuMethodologyFullyClassified: false,
    cheonbuCurrentT5SemanticCorrespondenceEstablished: false,
    cheonbuIndependentNormativeCorroborationAcquired: false,
    t6PrimaryDisposition: accepted ? 'NO_QUALIFYING_CANDIDATE_FOUND' : null,
    t6TargetedDiscoveryPerformed: accepted,
    t6NatalCareerLeadCount: accepted ? 2 : 0,
    t6DynamicCareerChangeLeadCount: accepted ? 2 : 0,
    t6QualifyingCandidateCount: 0,
    t6IndependentNormativeAuthorityCandidateCount: 0,
    t6CurrentClaimSemanticCorrespondenceEstablishedCount: 0,
    t6DynamicEventLeadsRejected: accepted,
    t6CompetingMethodOrStrengthLeadRejected: accepted,
    negativeEvidencePreserved: accepted,
    fallbackAuthoritySynthesized: false,
    crossSourceStitchingAuthorized: false,
    crossTaskStitchingAuthorized: false,
    registeredCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityGapClosedCount: 0,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? CAREER_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      sourceAttemptsRecorded: accepted ? 6 : 0,
      evidenceRecordsCreated: accepted ? 2 : 0,
      registeredSourcesCreated: 0,
      registeredCandidatesCreated: 0,
      authorityCandidatesAccepted: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW',
  });
}
