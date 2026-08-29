import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW_VERSION,
  CAREER_T8_B56_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGERS,
  CAREER_T8_B56_TARGET_BODY_HOLD_CONTROL_IDS,
  type CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReviewReport,
} from './career-personalization-t8-branch-2023-chen-zezhen-target-clash-body-acquisition-hold-review.js';

export const CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT_VERSION =
  'myeonghwa-career-personalization-t8-source-family-coverage-audit-v1' as const;

export const CAREER_T8_B57_ACADEMIC_CANONICAL_BENCHMARK = Object.freeze({
  benchmarkIdentity:
    '張新智, 子平學之理論研究, 國立政治大學中國文學系博士論文, 2002, chapter 3 section 1 related Zi-Ping classics',
  benchmarkRole:
    'ACADEMIC_HISTORIOGRAPHIC_SOURCE_FAMILY_BENCHMARK_NOT_NORMATIVE_INTERPRETATION_AUTHORITY' as const,
  titles: Object.freeze([
    '李虛中命書',
    '珞琭子賦註',
    '珞琭子三命消息賦註',
    '淵海子平',
    '三命通會',
    '神峰通考命理正宗',
    '精選命理約言',
    '子平真詮評註',
    '滴天髓闡微',
  ] as const),
  titleCount: 9 as const,
} as const);

export type CareerT8B57CoverageState =
  | 'DIRECT_REPOSITORY_RESEARCH_RECORD_OBSERVED'
  | 'NO_DIRECT_REPOSITORY_RESEARCH_RECORD_LOCATED_IN_AUDIT';

export type CareerT8B57CurrentQuestionMateriality =
  | 'LOW_GENEALOGICAL'
  | 'MATERIAL_STRUCTURAL_CONTEXT'
  | 'HIGH_CONDITIONAL_CLASH_METHOD'
  | 'CRITICAL_CONDITIONAL_ZHENGGUAN_CLASH_EFFECT';

export interface CareerT8B57CanonicalCoverageRecord {
  title: (typeof CAREER_T8_B57_ACADEMIC_CANONICAL_BENCHMARK.titles)[number];
  repositoryCoverageState: CareerT8B57CoverageState;
  currentQuestionMateriality: CareerT8B57CurrentQuestionMateriality;
  directExternalBodyInspectedInThisAudit: boolean;
  exactHistoricalEditionOrMechanicalScanBoundInThisAudit: boolean;
  auditNote: string;
}

export const CAREER_T8_B57_CANONICAL_COVERAGE_RECORDS = Object.freeze([
  Object.freeze({
    title: '李虛中命書' as const,
    repositoryCoverageState: 'NO_DIRECT_REPOSITORY_RESEARCH_RECORD_LOCATED_IN_AUDIT' as const,
    currentQuestionMateriality: 'LOW_GENEALOGICAL' as const,
    directExternalBodyInspectedInThisAudit: false,
    exactHistoricalEditionOrMechanicalScanBoundInThisAudit: false,
    auditNote:
      'A material historiographic genealogy gap, but not treated as a direct Zhengguan-to-branch-clash blocker for the present bounded Career question.',
  }),
  Object.freeze({
    title: '珞琭子賦註' as const,
    repositoryCoverageState: 'NO_DIRECT_REPOSITORY_RESEARCH_RECORD_LOCATED_IN_AUDIT' as const,
    currentQuestionMateriality: 'LOW_GENEALOGICAL' as const,
    directExternalBodyInspectedInThisAudit: false,
    exactHistoricalEditionOrMechanicalScanBoundInThisAudit: false,
    auditNote:
      'Foundational genealogy is not yet represented by a direct repository research record; no current semantic bridge is inferred from that absence.',
  }),
  Object.freeze({
    title: '珞琭子三命消息賦註' as const,
    repositoryCoverageState: 'NO_DIRECT_REPOSITORY_RESEARCH_RECORD_LOCATED_IN_AUDIT' as const,
    currentQuestionMateriality: 'LOW_GENEALOGICAL' as const,
    directExternalBodyInspectedInThisAudit: false,
    exactHistoricalEditionOrMechanicalScanBoundInThisAudit: false,
    auditNote:
      'Important to source genealogy, but not used here to manufacture a Ten-God or Career modifier it has not been inspected to supply.',
  }),
  Object.freeze({
    title: '淵海子平' as const,
    repositoryCoverageState: 'NO_DIRECT_REPOSITORY_RESEARCH_RECORD_LOCATED_IN_AUDIT' as const,
    currentQuestionMateriality: 'HIGH_CONDITIONAL_CLASH_METHOD' as const,
    directExternalBodyInspectedInThisAudit: true,
    exactHistoricalEditionOrMechanicalScanBoundInThisAudit: false,
    auditNote:
      'The inspected canonical text directly says Zhengguan dislikes clash/break/harm while simultaneously requiring month-command, strength, seal/support, balance and flexible whole-chart judgment. It materially bears on the current flat-modifier assumption.',
  }),
  Object.freeze({
    title: '三命通會' as const,
    repositoryCoverageState: 'DIRECT_REPOSITORY_RESEARCH_RECORD_OBSERVED' as const,
    currentQuestionMateriality: 'MATERIAL_STRUCTURAL_CONTEXT' as const,
    directExternalBodyInspectedInThisAudit: false,
    exactHistoricalEditionOrMechanicalScanBoundInThisAudit: false,
    auditNote:
      'B17 already records direct inspection of volume 2 branch-clash context and preserves it as high-provenance structural context without translating classical status semantics into modern Career authority.',
  }),
  Object.freeze({
    title: '神峰通考命理正宗' as const,
    repositoryCoverageState: 'NO_DIRECT_REPOSITORY_RESEARCH_RECORD_LOCATED_IN_AUDIT' as const,
    currentQuestionMateriality: 'HIGH_CONDITIONAL_CLASH_METHOD' as const,
    directExternalBodyInspectedInThisAudit: true,
    exactHistoricalEditionOrMechanicalScanBoundInThisAudit: false,
    auditNote:
      'The inspected text differentiates clash outcome by what is being used: clash of the useful factor is harmful while clash occurring in another role may be beneficial. This is a direct challenge to Boolean clash-as-uniform-damage semantics.',
  }),
  Object.freeze({
    title: '精選命理約言' as const,
    repositoryCoverageState: 'NO_DIRECT_REPOSITORY_RESEARCH_RECORD_LOCATED_IN_AUDIT' as const,
    currentQuestionMateriality: 'CRITICAL_CONDITIONAL_ZHENGGUAN_CLASH_EFFECT' as const,
    directExternalBodyInspectedInThisAudit: true,
    exactHistoricalEditionOrMechanicalScanBoundInThisAudit: true,
    auditNote:
      'The exact 1935 NLC mechanical scan directly exposes 看正官法 and distinguishes a reduced-expression outcome for strong Guan from a break/failure outcome for weak Guan after the listed adverse conditions including clash/break. This is the strongest newly identified coverage gap in this audit.',
  }),
  Object.freeze({
    title: '子平真詮評註' as const,
    repositoryCoverageState: 'DIRECT_REPOSITORY_RESEARCH_RECORD_OBSERVED' as const,
    currentQuestionMateriality: 'MATERIAL_STRUCTURAL_CONTEXT' as const,
    directExternalBodyInspectedInThisAudit: false,
    exactHistoricalEditionOrMechanicalScanBoundInThisAudit: false,
    auditNote:
      'B17 already records Zhengguan-pattern clash context and deliberately keeps it as classical pattern-integrity evidence rather than a modern Career modifier.',
  }),
  Object.freeze({
    title: '滴天髓闡微' as const,
    repositoryCoverageState: 'NO_DIRECT_REPOSITORY_RESEARCH_RECORD_LOCATED_IN_AUDIT' as const,
    currentQuestionMateriality: 'HIGH_CONDITIONAL_CLASH_METHOD' as const,
    directExternalBodyInspectedInThisAudit: true,
    exactHistoricalEditionOrMechanicalScanBoundInThisAudit: false,
    auditNote:
      'The inspected text makes clash outcome depend on strength, support/root and usefulness; it explicitly allows beneficial clash in strong contexts and severe root damage in weak contexts. That is methodologically incompatible with a context-free unary attenuation rule.',
  }),
] as const satisfies readonly CareerT8B57CanonicalCoverageRecord[]);

export const CAREER_T8_B57_MINGLI_YUEYAN_1935_EXACT_BODY_EVIDENCE = Object.freeze({
  sourceIdentity:
    '[清]陳素庵原著, 精選命理約言, 韋氏命苑發行, 民國二十四年 [1935], National Library of China nlc:data_416,17jh002578,109774, 185-page mechanical scan',
  inspectedLocator:
    '卷一 看正官法, printed pp.19-20, PDF zero-based indices 35-36 of the NLC mechanical scan',
  exactHistoricalScanIdentityBound: true as const,
  targetBodyDirectlyInspected: true as const,
  exactTenGod: '정관' as const,
  directZhengguanMethodBodyObserved: true as const,
  dayMasterStrengthRequiredBeforeGuanJudgment: true as const,
  guanStrengthAndTimingRequired: true as const,
  financeSealSupportConfigurationRequired: true as const,
  clashOrBreakListedAsDirectAdverseCondition: true as const,
  strongGuanEffectClass: 'QUALITATIVE_ATTENUATION_REDUCES_GUIQI' as const,
  weakGuanEffectClass: 'QUALITATIVE_BREAK_OR_FAILURE' as const,
  sourceDefinesOneUniformClashEffectAcrossStrengthStates: false as const,
  modernCareerWorkSemanticBridgeEstablished: false as const,
  currentT5FormalResponsibilitySemanticBridgeEstablished: false as const,
  independentCompleteCurrentMethodPathEstablished: false as const,
  methodInputCandidateDimensions: Object.freeze([
    'day_master_strength',
    'guan_strength_or_weakness',
    'timing_or_month_command',
    'finance_or_seal_support_configuration',
    'interaction_relation_type',
  ] as const),
  evidenceBoundary:
    'This audit treats the passage as exact historical method evidence about Zhengguan/clash state dependence. It does not modernize 貴氣 into Career success, responsibility, promotion probability, or any consumer-facing claim.',
} as const);

export const CAREER_T8_B57_SUPPLEMENTARY_COVERAGE_FINDINGS = Object.freeze([
  Object.freeze({
    sourceFamily: 'QIONGTONG_BAOJIAN_SEASONAL_ADJUSTMENT' as const,
    repositoryDirectResearchRecordObserved: false as const,
    currentBranchMateriality: 'LOW_FOR_CURRENT_BRANCH_DIRECTLY_RELEVANT_TO_SEASONAL_LANE' as const,
    note: 'A recognized classical source family that is absent from the current repository audit, but the current Branch continuation does not consume the seasonal dimension.',
  }),
  Object.freeze({
    sourceFamily: 'YUAN_SHUSHAN_MINGLI_TANYUAN_REPUBLICAN_SYNTHESIS' as const,
    repositoryDirectResearchRecordObserved: false as const,
    currentBranchMateriality: 'MATERIAL_METHOD_SYNTHESIS' as const,
    note: 'A Republican synthesis with dedicated clash, strength, Yongshen and compatibility-oriented chapters; its absence is a secondary method-coverage gap rather than an independent vote.',
  }),
  Object.freeze({
    sourceFamily: 'QIANLI_1936_PRIMARY_REPUBLICAN_WITNESS' as const,
    repositoryDirectResearchRecordObserved: true as const,
    currentBranchMateriality: 'MATERIAL_ALREADY_PARTIALLY_COVERED' as const,
    note: 'I253-I258 provide corrected 1936 primary-witness work and explicit access holds; this family is not counted as an uncovered modern/Republican hole.',
  }),
  Object.freeze({
    sourceFamily: 'MODERN_MAINLAND_HK_TW_PUBLISHED_BRANCH_PATHS' as const,
    repositoryDirectResearchRecordObserved: true as const,
    currentBranchMateriality: 'SUBSTANTIAL_MODERN_COVERAGE' as const,
    note: 'The repository has substantial recent published coverage across 1995-2023 including Li Shunxiang, Xu Bingxin, Lu Zhiji, Chen Zezhen, Shishen Chanwei, Qin Lunshi and related paths, plus bounded academic and alternative-method sources.',
  }),
] as const);

export const CAREER_T8_B57_COVERAGE_AUDIT_CONTROL_IDS = Object.freeze([
  'B57_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B56_CHEN_ZEZHEN_TARGET_BODY_HOLD_BOUNDARY',
  'ACADEMIC_HISTORIOGRAPHY_IS_USED_ONLY_AS_A_SOURCE_FAMILY_COVERAGE_BENCHMARK_NOT_AS_INTERPRETATION_AUTHORITY',
  'REPOSITORY_RESEARCH_VOLUME_IS_SUBSTANTIAL_BUT_FIELD_WIDE_SOURCE_FAMILY_COVERAGE_IS_NOT_CLAIMED',
  'THREE_MISSING_EARLY_GENEALOGICAL_TEXTS_ARE_NOT_TREATED_AS_DIRECT_CURRENT_BRANCH_BLOCKERS_WITHOUT_RELEVANT_BODY_INSPECTION',
  'YUANHAI_ZIPING_SHENFENG_TONGKAO_MINGLI_YUEYAN_AND_DITIANSHUI_CHANWEI_ARE_MATERIAL_UNCOVERED_CLASSICAL_METHOD_SURFACES_FOR_THE_CURRENT_BRANCH_QUESTION',
  'THE_1935_NLC_MINGLI_YUEYAN_SCAN_IS_DIRECTLY_INSPECTED_AND_RECORDED_AS_METHOD_EVIDENCE_NOT_MODERN_CAREER_AUTHORITY',
  'MINGLI_YUEYAN_STRONG_GUAN_ATTENUATION_AND_WEAK_GUAN_BREAK_OUTCOMES_MAY_NOT_BE_FLATTENED_INTO_ONE_UNARY_EFFECT',
  'YUANHAI_SHENFENG_AND_DITIANSHUI_CONTEXT_SENSITIVITY_MAY_NOT_BE_COUNTED_AS_INDEPENDENT_NUMERIC_VOTES_OR_CROSS_SOURCE_STITCHED_RULES',
  'THE_NEW_COVERAGE_FINDINGS_STRENGTHEN_THE_FAIL_CLOSED_REJECTION_OF_CONTEXT_FREE_FLAT_CLASH_PROMOTION_BUT_DO_NOT_ESTABLISH_A_NEW_GOVERNED_METHOD',
  'ONE_BOUNDED_CLASSICAL_METHOD_RECONCILIATION_RESEARCH_LANE_IS_JUSTIFIED_BEFORE_ANY_METHOD_AUTHORITY_DECISION',
  'B56_CHEN_ZEZHEN_EXACT_TARGET_BODY_HOLD_REMAINS_UNCHANGED_AND_IS_NOT_BYPASSED_BY_OTHER_CLASSICAL_SOURCES',
  'NO_BRANCH_AUTHORITY_TRIGGER_IS_DECLARED_SATISFIED_BY_THE_COVERAGE_AUDIT_ALONE',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_CROSS_SOURCE_STITCHING_DEPENDENCY_DROPPING_EFFECT_FLATTENING_T5_T6_T8_AUTHORING_PREVIEW_SWITCH_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8SourceFamilyCoverageAuditReport {
  auditId: string;
  auditVersion: typeof CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT_VERSION;
  status:
    | 'RESOLVED_CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT'
    | 'UPSTREAM_B56_BOUNDARY_INVALID';
  decision:
    | 'RESEARCH_VOLUME_SUBSTANTIAL_FIELD_COVERAGE_INCOMPLETE_MATERIAL_CLASSICAL_METHOD_GAPS_IDENTIFIED_ONE_BOUNDED_METHOD_RECONCILIATION_LANE_OPENED_ZERO_AUTHORITY_PROMOTIONS'
    | 'SOURCE_FAMILY_COVERAGE_AUDIT_NOT_ESTABLISHED';
  upstreamB56ReviewId: string;
  exactB56BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  academicBenchmark: typeof CAREER_T8_B57_ACADEMIC_CANONICAL_BENCHMARK | null;
  canonicalCoverageRecords: readonly CareerT8B57CanonicalCoverageRecord[];
  canonicalBenchmarkCount: 9 | 0;
  repositoryDirectCanonicalCoverageCount: 2 | 0;
  uncoveredCanonicalBenchmarkCount: 7 | 0;
  materiallyRelevantUncoveredCanonicalCount: 4 | 0;
  newlyInspectedMaterialClassicalSurfaceCount: 4 | 0;
  newlyBoundExactHistoricalMaterialBodyCount: 1 | 0;
  mingliYueyan1935Evidence: typeof CAREER_T8_B57_MINGLI_YUEYAN_1935_EXACT_BODY_EVIDENCE | null;
  supplementaryCoverageFindings: typeof CAREER_T8_B57_SUPPLEMENTARY_COVERAGE_FINDINGS;
  researchVolumeSubstantial: boolean;
  fieldWideCoverageClaimSupported: false;
  researchCoverageSufficientToPromoteFlatUnaryModifier: false;
  evidenceSupportsKeepingFlatUnaryModifierUnauthorized: boolean;
  materialClassicalMethodCoverageGapEstablished: boolean;
  sourceFamilyBiasObserved: boolean;
  sourceFamilyBiasDescription: string | null;
  newGovernedMethodAuthorityEstablished: false;
  branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied: false;
  branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false;
  branchAuthorityTriggerActivationCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  immediatelyExecutableMethodologyAuditLaneCount: 1 | 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION'
    | null;
  b56ChenZezhenHoldPreserved: boolean;
  broadBlindSourceSearchRestartAuthorized: false;
  crossSourceStitchingAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  effectClassFlatteningAuthorized: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  methodologyDefinitionCreatedByThisGate: false;
  t5RuleAuthoringAuthorized: false;
  t6RuleAuthoringAuthorized: false;
  t8RuleAuthoringAuthorized: false;
  claimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B57_COVERAGE_AUDIT_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceFamilyCoverageAuditsCreated: 1 | 0;
    materialClassicalCoverageGapsRecorded: 4 | 0;
    exactHistoricalMethodBodiesBound: 1 | 0;
    methodologyAuditLanesOpened: 1 | 0;
    authorityTriggersActivated: 0;
    authorityComponentsAdmitted: 0;
    authorityGapsClosed: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION'
    | 'CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT';
}

function contentAddressedB56IdentityValid(
  b56: CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReviewReport,
): boolean {
  const { reviewId, ...material } = b56;
  return (
    reviewId ===
    `career_personalization_t8_branch_2023_chen_zezhen_target_clash_body_acquisition_hold_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB56Accepted(
  b56: CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReviewReport,
): boolean {
  return (
    contentAddressedB56IdentityValid(b56) &&
    b56.reviewVersion ===
      CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW_VERSION &&
    b56.status === 'RESOLVED_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW' &&
    b56.decision ===
      'CHEN_ZEZHEN_2023_TARGET_BODY_ACQUISITION_HOLD_ZERO_REOPEN_TRIGGERS_SATISFIED_RESUME_ONLY_ON_EXACT_TARGET_BODY_CHANGE' &&
    b56.exactB55BoundaryAccepted &&
    b56.domain === 'career' &&
    b56.temporalScope === 'natal' &&
    b56.statusClass === 'research' &&
    b56.targetBodyAcquisitionHoldActive &&
    b56.b55TargetedAcquisitionCompleted &&
    b56.b55TargetBodyAcquired === false &&
    b56.supportingPreviewBodyPreserved &&
    b56.targetQ407ToQ422LocatorPreserved &&
    deterministicContentHash(b56.reopenTriggers) ===
      deterministicContentHash(CAREER_T8_B56_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGERS) &&
    b56.reopenTriggerCount === 2 &&
    b56.satisfiedReopenTriggerCount === 0 &&
    b56.immediatelyExecutableTargetAcquisitionLaneCount === 0 &&
    b56.immediatelyExecutableAuthorityResearchLaneCount === 0 &&
    b56.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b56.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b56.selectedImmediateNextLane === null &&
    b56.broadBranchSourceSearchRestartAuthorized === false &&
    b56.exactSameEditionTargetBodyChangeRequiredForReopen &&
    b56.branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied === false &&
    b56.branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied === false &&
    b56.branchAuthorityTriggerActivationCount === 0 &&
    b56.crossSourceStitchingAuthorized === false &&
    b56.sourceMandatoryDependencyDroppingAuthorized === false &&
    b56.effectClassFlatteningAuthorized === false &&
    b56.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b56.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b56.productionImpact === 'NONE' &&
    b56.controlCount === 12 &&
    b56.controlsFrozen &&
    deterministicContentHash(b56.controlIds) === deterministicContentHash(CAREER_T8_B56_TARGET_BODY_HOLD_CONTROL_IDS) &&
    b56.recommendedNextGate === 'BRANCH_2023_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function auditEvidenceValid(): boolean {
  const records = CAREER_T8_B57_CANONICAL_COVERAGE_RECORDS;
  const directRepositoryCoverage = records.filter(
    (record) => record.repositoryCoverageState === 'DIRECT_REPOSITORY_RESEARCH_RECORD_OBSERVED',
  );
  const uncovered = records.filter(
    (record) => record.repositoryCoverageState === 'NO_DIRECT_REPOSITORY_RESEARCH_RECORD_LOCATED_IN_AUDIT',
  );
  const materialUncovered = uncovered.filter(
    (record) =>
      record.currentQuestionMateriality === 'HIGH_CONDITIONAL_CLASH_METHOD' ||
      record.currentQuestionMateriality === 'CRITICAL_CONDITIONAL_ZHENGGUAN_CLASH_EFFECT',
  );
  const newlyInspectedMaterial = materialUncovered.filter((record) => record.directExternalBodyInspectedInThisAudit);
  const exactNewBody = materialUncovered.filter((record) => record.exactHistoricalEditionOrMechanicalScanBoundInThisAudit);
  const mingli = CAREER_T8_B57_MINGLI_YUEYAN_1935_EXACT_BODY_EVIDENCE;

  return (
    CAREER_T8_B57_ACADEMIC_CANONICAL_BENCHMARK.titleCount === 9 &&
    records.length === 9 &&
    directRepositoryCoverage.length === 2 &&
    uncovered.length === 7 &&
    materialUncovered.length === 4 &&
    newlyInspectedMaterial.length === 4 &&
    exactNewBody.length === 1 &&
    mingli.exactHistoricalScanIdentityBound &&
    mingli.targetBodyDirectlyInspected &&
    mingli.exactTenGod === '정관' &&
    mingli.dayMasterStrengthRequiredBeforeGuanJudgment &&
    mingli.guanStrengthAndTimingRequired &&
    mingli.financeSealSupportConfigurationRequired &&
    mingli.clashOrBreakListedAsDirectAdverseCondition &&
    mingli.strongGuanEffectClass === 'QUALITATIVE_ATTENUATION_REDUCES_GUIQI' &&
    mingli.weakGuanEffectClass === 'QUALITATIVE_BREAK_OR_FAILURE' &&
    mingli.sourceDefinesOneUniformClashEffectAcrossStrengthStates === false &&
    mingli.modernCareerWorkSemanticBridgeEstablished === false &&
    mingli.currentT5FormalResponsibilitySemanticBridgeEstablished === false &&
    mingli.independentCompleteCurrentMethodPathEstablished === false &&
    CAREER_T8_B57_SUPPLEMENTARY_COVERAGE_FINDINGS.length === 4 &&
    CAREER_T8_B57_COVERAGE_AUDIT_CONTROL_IDS.length === 14
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8SourceFamilyCoverageAuditReport, 'auditId'>,
): CareerPersonalizationT8SourceFamilyCoverageAuditReport {
  return {
    auditId: `career_personalization_t8_source_family_coverage_audit_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8SourceFamilyCoverageAudit(
  b56: CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReviewReport,
): CareerPersonalizationT8SourceFamilyCoverageAuditReport {
  const accepted = exactB56Accepted(b56) && auditEvidenceValid();

  return finalized({
    auditVersion: CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT'
      : 'UPSTREAM_B56_BOUNDARY_INVALID',
    decision: accepted
      ? 'RESEARCH_VOLUME_SUBSTANTIAL_FIELD_COVERAGE_INCOMPLETE_MATERIAL_CLASSICAL_METHOD_GAPS_IDENTIFIED_ONE_BOUNDED_METHOD_RECONCILIATION_LANE_OPENED_ZERO_AUTHORITY_PROMOTIONS'
      : 'SOURCE_FAMILY_COVERAGE_AUDIT_NOT_ESTABLISHED',
    upstreamB56ReviewId: b56.reviewId,
    exactB56BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    academicBenchmark: accepted ? CAREER_T8_B57_ACADEMIC_CANONICAL_BENCHMARK : null,
    canonicalCoverageRecords: accepted ? CAREER_T8_B57_CANONICAL_COVERAGE_RECORDS : Object.freeze([]),
    canonicalBenchmarkCount: accepted ? 9 : 0,
    repositoryDirectCanonicalCoverageCount: accepted ? 2 : 0,
    uncoveredCanonicalBenchmarkCount: accepted ? 7 : 0,
    materiallyRelevantUncoveredCanonicalCount: accepted ? 4 : 0,
    newlyInspectedMaterialClassicalSurfaceCount: accepted ? 4 : 0,
    newlyBoundExactHistoricalMaterialBodyCount: accepted ? 1 : 0,
    mingliYueyan1935Evidence: accepted ? CAREER_T8_B57_MINGLI_YUEYAN_1935_EXACT_BODY_EVIDENCE : null,
    supplementaryCoverageFindings: CAREER_T8_B57_SUPPLEMENTARY_COVERAGE_FINDINGS,
    researchVolumeSubstantial: accepted,
    fieldWideCoverageClaimSupported: false,
    researchCoverageSufficientToPromoteFlatUnaryModifier: false,
    evidenceSupportsKeepingFlatUnaryModifierUnauthorized: accepted,
    materialClassicalMethodCoverageGapEstablished: accepted,
    sourceFamilyBiasObserved: accepted,
    sourceFamilyBiasDescription: accepted
      ? 'Modern Mainland/Hong Kong/Taiwan and selected Republican/classical paths are substantial, but core classical Zi-Ping method-family coverage is uneven and omits multiple directly relevant texts.'
      : null,
    newGovernedMethodAuthorityEstablished: false,
    branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied: false,
    branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    immediatelyExecutableMethodologyAuditLaneCount: accepted ? 1 : 0,
    selectedImmediateNextLane: accepted
      ? 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION'
      : null,
    b56ChenZezhenHoldPreserved: accepted,
    broadBlindSourceSearchRestartAuthorized: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    effectClassFlatteningAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B57_COVERAGE_AUDIT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      sourceFamilyCoverageAuditsCreated: accepted ? 1 : 0,
      materialClassicalCoverageGapsRecorded: accepted ? 4 : 0,
      exactHistoricalMethodBodiesBound: accepted ? 1 : 0,
      methodologyAuditLanesOpened: accepted ? 1 : 0,
      authorityTriggersActivated: 0,
      authorityComponentsAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION'
      : 'CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT',
  });
}
