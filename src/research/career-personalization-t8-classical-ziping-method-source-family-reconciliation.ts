import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES } from './career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-discovery-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT_VERSION,
  CAREER_T8_B57_CANONICAL_COVERAGE_RECORDS,
  CAREER_T8_B57_COVERAGE_AUDIT_CONTROL_IDS,
  CAREER_T8_B57_MINGLI_YUEYAN_1935_EXACT_BODY_EVIDENCE,
  type CareerPersonalizationT8SourceFamilyCoverageAuditReport,
} from './career-personalization-t8-source-family-coverage-audit.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-method-source-family-reconciliation-v1' as const;

export type CareerT8B58ClassicalSurfaceId =
  | 'SANMING_TONGHUI_LUN_CHONGJI'
  | 'ZIPING_ZHENQUAN_ZHENGGUAN_CLASH_CONTEXT'
  | 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT'
  | 'SHENFENG_TONGKAO_CONDITIONAL_CLASH'
  | 'MINGLI_YUEYAN_KAN_ZHENGGUAN'
  | 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH';

export type CareerT8B58EvidenceState =
  | 'REPOSITORY_DIRECT_RESEARCH_RECORD'
  | 'INSTITUTIONAL_EXACT_WITNESS_DIRECT'
  | 'DIRECT_BODY_INSPECTED_PROVENANCE_GAP';

export type CareerT8B58InputDimension =
  | 'INTERACTION_RELATION_TYPE'
  | 'AFFECTED_TARGET_OR_STORED_MATERIAL'
  | 'AFFECTED_TARGET_ROLE_OR_USEFULNESS'
  | 'DAY_MASTER_STRENGTH'
  | 'AFFECTED_ENTITY_STRENGTH'
  | 'ROOT_OR_SUPPORT_STATE'
  | 'MONTH_COMMAND_OR_TIMING'
  | 'FINANCE_OR_SEAL_SUPPORT_CONFIGURATION'
  | 'WHOLE_CHART_OR_PATTERN_CONFIGURATION'
  | 'INTERACTION_EFFECTIVENESS_OR_RECOVERY';

export type CareerT8B58EffectClass =
  | 'CONTEXT_DEPENDENT_CHANGE'
  | 'PATTERN_INTEGRITY_DAMAGE_OR_CHANGE'
  | 'ACTIVATION_OR_DAMAGE_BY_TOUCHED_MATERIAL'
  | 'QUALITATIVE_ATTENUATION'
  | 'QUALITATIVE_BREAK_OR_FAILURE'
  | 'BENEFICIAL_REMOVAL_OR_RESOLUTION'
  | 'SEVERE_ROOT_DAMAGE';

export interface CareerT8B58ClassicalMethodSurface {
  surfaceId: CareerT8B58ClassicalSurfaceId;
  title: string;
  evidenceState: CareerT8B58EvidenceState;
  exactWitnessOrRepositoryResearchBound: boolean;
  interactionGranularity:
    | 'BRANCH_CLASH_EXPLICIT'
    | 'CLASH_WITHIN_PATTERN_INTEGRITY_CONTEXT'
    | 'CLASH_BREAK_HARM_GROUPED'
    | 'CLASH_OR_BREAK_GROUPED_NOT_ISOLATED';
  establishedInputDimensions: readonly CareerT8B58InputDimension[];
  provisionalInputDimensions: readonly CareerT8B58InputDimension[];
  establishedEffectClasses: readonly CareerT8B58EffectClass[];
  provisionalEffectClasses: readonly CareerT8B58EffectClass[];
  sourceSpecificDependencyNote: string;
  flatUnaryEffectSupported: false;
  numericScalarAuthorized: false;
  modernCareerSemanticBridgeEstablished: false;
}

const b17Sanming = CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES.find(
  (candidate) => candidate.candidateId === 'SANMING_TONGHUI_VOL2_LUN_CHONGJI',
);
const b17Ziping = CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES.find(
  (candidate) => candidate.candidateId === 'ZIPING_ZHENQUAN_OFFICIAL_PATTERN_CLASH_CONTEXT',
);
const b57Yuanhai = CAREER_T8_B57_CANONICAL_COVERAGE_RECORDS.find((record) => record.title === '淵海子平');
const b57Shenfeng = CAREER_T8_B57_CANONICAL_COVERAGE_RECORDS.find(
  (record) => record.title === '神峰通考命理正宗',
);
const b57Ditian = CAREER_T8_B57_CANONICAL_COVERAGE_RECORDS.find((record) => record.title === '滴天髓闡微');

export const CAREER_T8_B58_CLASSICAL_METHOD_SURFACES = Object.freeze([
  Object.freeze({
    surfaceId: 'SANMING_TONGHUI_LUN_CHONGJI' as const,
    title: '三命通會 卷二 論沖擊',
    evidenceState: 'REPOSITORY_DIRECT_RESEARCH_RECORD' as const,
    exactWitnessOrRepositoryResearchBound: true,
    interactionGranularity: 'BRANCH_CLASH_EXPLICIT' as const,
    establishedInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'AFFECTED_TARGET_OR_STORED_MATERIAL',
      'WHOLE_CHART_OR_PATTERN_CONFIGURATION',
    ] as const),
    provisionalInputDimensions: Object.freeze([] as CareerT8B58InputDimension[]),
    establishedEffectClasses: Object.freeze([
      'ACTIVATION_OR_DAMAGE_BY_TOUCHED_MATERIAL',
      'CONTEXT_DEPENDENT_CHANGE',
    ] as const),
    provisionalEffectClasses: Object.freeze([] as CareerT8B58EffectClass[]),
    sourceSpecificDependencyNote:
      'B17 directly records branch clash as conditional and as capable of activating or damaging stored 財官印綬 material according to broader chart conditions. The classical status language is not a modern Career bridge.',
    flatUnaryEffectSupported: false,
    numericScalarAuthorized: false,
    modernCareerSemanticBridgeEstablished: false,
  }),
  Object.freeze({
    surfaceId: 'ZIPING_ZHENQUAN_ZHENGGUAN_CLASH_CONTEXT' as const,
    title: '子平真詮 / 子平真詮評注 正官格·刑沖脈絡',
    evidenceState: 'REPOSITORY_DIRECT_RESEARCH_RECORD' as const,
    exactWitnessOrRepositoryResearchBound: true,
    interactionGranularity: 'CLASH_WITHIN_PATTERN_INTEGRITY_CONTEXT' as const,
    establishedInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'WHOLE_CHART_OR_PATTERN_CONFIGURATION',
    ] as const),
    provisionalInputDimensions: Object.freeze([] as CareerT8B58InputDimension[]),
    establishedEffectClasses: Object.freeze(['PATTERN_INTEGRITY_DAMAGE_OR_CHANGE'] as const),
    provisionalEffectClasses: Object.freeze([] as CareerT8B58EffectClass[]),
    sourceSpecificDependencyNote:
      'B17 directly records clash as able to impair or alter 正官-pattern integrity. Using that 格局成敗 doctrine as the current T6 Career modifier would import a separate pattern methodology and still require a Career semantic bridge.',
    flatUnaryEffectSupported: false,
    numericScalarAuthorized: false,
    modernCareerSemanticBridgeEstablished: false,
  }),
  Object.freeze({
    surfaceId: 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT' as const,
    title: '淵海子平',
    evidenceState: 'DIRECT_BODY_INSPECTED_PROVENANCE_GAP' as const,
    exactWitnessOrRepositoryResearchBound: false,
    interactionGranularity: 'CLASH_BREAK_HARM_GROUPED' as const,
    establishedInputDimensions: Object.freeze([] as CareerT8B58InputDimension[]),
    provisionalInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'DAY_MASTER_STRENGTH',
      'MONTH_COMMAND_OR_TIMING',
      'FINANCE_OR_SEAL_SUPPORT_CONFIGURATION',
      'WHOLE_CHART_OR_PATTERN_CONFIGURATION',
    ] as const),
    establishedEffectClasses: Object.freeze([] as CareerT8B58EffectClass[]),
    provisionalEffectClasses: Object.freeze(['CONTEXT_DEPENDENT_CHANGE'] as const),
    sourceSpecificDependencyNote:
      'B57 directly inspected a relevant body surface tying 正官 judgment to month-command, strength, seal/support, balance and 刑沖破害, but did not bind an exact historical witness/passage provenance. These dimensions remain provisional for reconciliation.',
    flatUnaryEffectSupported: false,
    numericScalarAuthorized: false,
    modernCareerSemanticBridgeEstablished: false,
  }),
  Object.freeze({
    surfaceId: 'SHENFENG_TONGKAO_CONDITIONAL_CLASH' as const,
    title: '神峰通考命理正宗',
    evidenceState: 'DIRECT_BODY_INSPECTED_PROVENANCE_GAP' as const,
    exactWitnessOrRepositoryResearchBound: false,
    interactionGranularity: 'BRANCH_CLASH_EXPLICIT' as const,
    establishedInputDimensions: Object.freeze([] as CareerT8B58InputDimension[]),
    provisionalInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'AFFECTED_TARGET_ROLE_OR_USEFULNESS',
    ] as const),
    establishedEffectClasses: Object.freeze([] as CareerT8B58EffectClass[]),
    provisionalEffectClasses: Object.freeze([
      'BENEFICIAL_REMOVAL_OR_RESOLUTION',
      'CONTEXT_DEPENDENT_CHANGE',
    ] as const),
    sourceSpecificDependencyNote:
      'B57 observed a direct valence flip according to what the clash removes or affects. Exact witness/passage provenance is still absent, so target-role/usefulness may not be promoted into a universal methodology input.',
    flatUnaryEffectSupported: false,
    numericScalarAuthorized: false,
    modernCareerSemanticBridgeEstablished: false,
  }),
  Object.freeze({
    surfaceId: 'MINGLI_YUEYAN_KAN_ZHENGGUAN' as const,
    title: '精選命理約言 卷一 看正官法',
    evidenceState: 'INSTITUTIONAL_EXACT_WITNESS_DIRECT' as const,
    exactWitnessOrRepositoryResearchBound: true,
    interactionGranularity: 'CLASH_OR_BREAK_GROUPED_NOT_ISOLATED' as const,
    establishedInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'DAY_MASTER_STRENGTH',
      'AFFECTED_ENTITY_STRENGTH',
      'MONTH_COMMAND_OR_TIMING',
      'FINANCE_OR_SEAL_SUPPORT_CONFIGURATION',
    ] as const),
    provisionalInputDimensions: Object.freeze([] as CareerT8B58InputDimension[]),
    establishedEffectClasses: Object.freeze([
      'QUALITATIVE_ATTENUATION',
      'QUALITATIVE_BREAK_OR_FAILURE',
    ] as const),
    provisionalEffectClasses: Object.freeze([] as CareerT8B58EffectClass[]),
    sourceSpecificDependencyNote:
      'The exact 1935 NLC witness distinguishes a reduced 貴氣 outcome for strong 官 from a break/failure outcome for weak 官 after listed adverse conditions including 沖破. Because 沖破 is grouped, this passage does not by itself isolate a branch-clash-only operator.',
    flatUnaryEffectSupported: false,
    numericScalarAuthorized: false,
    modernCareerSemanticBridgeEstablished: false,
  }),
  Object.freeze({
    surfaceId: 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH' as const,
    title: '滴天髓闡微',
    evidenceState: 'DIRECT_BODY_INSPECTED_PROVENANCE_GAP' as const,
    exactWitnessOrRepositoryResearchBound: false,
    interactionGranularity: 'BRANCH_CLASH_EXPLICIT' as const,
    establishedInputDimensions: Object.freeze([] as CareerT8B58InputDimension[]),
    provisionalInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'AFFECTED_ENTITY_STRENGTH',
      'ROOT_OR_SUPPORT_STATE',
      'AFFECTED_TARGET_ROLE_OR_USEFULNESS',
    ] as const),
    establishedEffectClasses: Object.freeze([] as CareerT8B58EffectClass[]),
    provisionalEffectClasses: Object.freeze([
      'BENEFICIAL_REMOVAL_OR_RESOLUTION',
      'SEVERE_ROOT_DAMAGE',
      'CONTEXT_DEPENDENT_CHANGE',
    ] as const),
    sourceSpecificDependencyNote:
      'B57 directly inspected strength/root/usefulness-sensitive clash language, including beneficial and severe-damage outcomes, but exact witness/passage provenance is not yet bound. No dimension from this row is authority-grade yet.',
    flatUnaryEffectSupported: false,
    numericScalarAuthorized: false,
    modernCareerSemanticBridgeEstablished: false,
  }),
] as const satisfies readonly CareerT8B58ClassicalMethodSurface[]);

export const CAREER_T8_B58_RECONCILIATION_CONTROL_IDS = Object.freeze([
  'B58_CONSUMES_ONLY_CONTENT_ADDRESSED_B57_AND_EXISTING_B17_DIRECT_CLASSICAL_RESEARCH_RECORDS',
  'SIX_RELEVANT_CLASSICAL_SURFACES_ARE_NORMALIZED_ON_ONE_INPUT_DIMENSION_MATRIX_WITHOUT_CROSS_SOURCE_RULE_STITCHING',
  'PROVENANCE_GAP_DIMENSIONS_REMAIN_PROVISIONAL_AND_ARE_EXCLUDED_FROM_AUTHORITY_GRADE_INTERSECTION',
  'NO_SOURCE_SPECIFIC_DIMENSION_IS_PROMOTED_TO_A_UNIVERSAL_REQUIRED_INPUT_MERELY_BECAUSE_IT_APPEARS_IN_ONE_OR_MORE_TEXTS',
  'MINGLI_YUEYAN_STRONG_GUAN_ATTENUATION_AND_WEAK_GUAN_BREAK_REMAIN_SOURCE_SECTION_SPECIFIC_QUALITATIVE_EFFECTS',
  'MINGLI_YUEYAN_GROUPED_CHONG_PO_LANGUAGE_DOES_NOT_AUTHORIZE_A_BRANCH_CLASH_ONLY_OPERATOR',
  'SHENFENG_TARGET_ROLE_OR_USEFULNESS_SIGNAL_IS_NOT_UNIVERSALIZED_BEFORE_PRIMARY_WITNESS_BINDING',
  'DITIANSHUI_ROOT_STRENGTH_SIGNAL_IS_NOT_UNIVERSALIZED_BEFORE_PRIMARY_WITNESS_BINDING',
  'CURRENT_INSPECTED_CLASSICAL_SURFACES_REJECT_CONTEXT_FREE_UNIFORM_CLASH_DAMAGE_AS_A_SAFE_COMMON_MODEL',
  'NO_NUMERIC_OFFSET_MULTIPLIER_OR_HIDDEN_SCORE_IS_AUTHORIZED_BY_THE_RECONCILIATION',
  'A_PROVISIONAL_CROSS_FAMILY_META_SHAPE_IS_OBSERVED_BUT_NO_COMMON_T6_METHOD_CONTRACT_IS_AUTHORIZED',
  'CLASSICAL_GUIQI_GUANGUI_KEJIA_PATTERN_STATUS_SEMANTICS_ARE_NOT_EQUATED_WITH_CURRENT_FORMAL_RESPONSIBILITY_OR_MODERN_CAREER_SEMANTICS',
  'PRIMARY_WITNESS_BINDING_FOR_YUANHAI_SHENFENG_AND_DITIANSHUI_IS_REQUIRED_BEFORE_ANY_METHOD_AUTHORITY_DECISION',
  'B56_CHEN_ZEZHEN_HOLD_IS_PRESERVED_AND_NOT_REOPENED_BY_CLASSICAL_RECONCILIATION',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T5_T6_T8_AUTHORING_CLAIM_TYPE_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliationReport {
  reconciliationId: string;
  reconciliationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION'
    | 'UPSTREAM_B57_BOUNDARY_INVALID';
  decision:
    | 'PROVISIONAL_COMMON_CONDITIONAL_META_SHAPE_VISIBLE_PRIMARY_WITNESS_GAPS_BLOCK_COMMON_T6_METHOD_AUTHORITY_ZERO_SEMANTIC_PROMOTIONS'
    | 'CLASSICAL_METHOD_SOURCE_FAMILY_RECONCILIATION_NOT_ESTABLISHED';
  upstreamB57AuditId: string;
  exactB57BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  methodSurfaces: readonly CareerT8B58ClassicalMethodSurface[];
  methodSurfaceCount: 6 | 0;
  authorityGradeSurfaceCount: 3 | 0;
  provenanceGapSurfaceCount: 3 | 0;
  unresolvedPrimaryWitnessSurfaceIds: readonly CareerT8B58ClassicalSurfaceId[];
  provisionalCommonMetaShapeObserved: boolean;
  provisionalCommonMetaShape: readonly string[];
  flatUnaryClashModifierSupported: false;
  uniformDamageEffectSupported: false;
  numericScalarEffectAuthorized: false;
  commonT6MethodContractEstablished: false;
  methodologyInputContractAuthoringAuthorized: false;
  currentCareerSemanticBridgeEstablished: false;
  crossSourceStitchingAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  effectClassFlatteningAuthorized: false;
  branchAuthorityTriggerActivationCount: 0;
  immediatelyExecutablePrimaryWitnessVerificationLaneCount: 1 | 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION'
    | null;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  b56ChenZezhenHoldPreserved: boolean;
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
  controlIds: readonly (typeof CAREER_T8_B58_RECONCILIATION_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    methodSourceFamilyReconciliationsCreated: 1 | 0;
    normalizedClassicalMethodSurfacesRecorded: 6 | 0;
    authorityGradeMethodSurfacesRecorded: 3 | 0;
    provenanceGapMethodSurfacesRecorded: 3 | 0;
    commonT6MethodContractsCreated: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION'
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION';
}

function contentAddressedB57IdentityValid(
  b57: CareerPersonalizationT8SourceFamilyCoverageAuditReport,
): boolean {
  const { auditId, ...material } = b57;
  return (
    auditId ===
    `career_personalization_t8_source_family_coverage_audit_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB57Accepted(b57: CareerPersonalizationT8SourceFamilyCoverageAuditReport): boolean {
  return (
    contentAddressedB57IdentityValid(b57) &&
    b57.auditVersion === CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT_VERSION &&
    b57.status === 'RESOLVED_CAREER_PERSONALIZATION_T8_SOURCE_FAMILY_COVERAGE_AUDIT' &&
    b57.decision ===
      'RESEARCH_VOLUME_SUBSTANTIAL_FIELD_COVERAGE_INCOMPLETE_MATERIAL_CLASSICAL_METHOD_GAPS_IDENTIFIED_ONE_BOUNDED_METHOD_RECONCILIATION_LANE_OPENED_ZERO_AUTHORITY_PROMOTIONS' &&
    b57.exactB56BoundaryAccepted &&
    b57.domain === 'career' &&
    b57.temporalScope === 'natal' &&
    b57.statusClass === 'research' &&
    b57.canonicalBenchmarkCount === 9 &&
    b57.repositoryDirectCanonicalCoverageCount === 2 &&
    b57.materiallyRelevantUncoveredCanonicalCount === 4 &&
    b57.newlyBoundExactHistoricalMaterialBodyCount === 1 &&
    b57.mingliYueyan1935Evidence?.exactHistoricalScanIdentityBound === true &&
    b57.mingliYueyan1935Evidence?.modernCareerWorkSemanticBridgeEstablished === false &&
    b57.evidenceSupportsKeepingFlatUnaryModifierUnauthorized &&
    b57.newGovernedMethodAuthorityEstablished === false &&
    b57.branchAuthorityTriggerActivationCount === 0 &&
    b57.immediatelyExecutableMethodologyAuditLaneCount === 1 &&
    b57.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION' &&
    b57.b56ChenZezhenHoldPreserved &&
    b57.crossSourceStitchingAuthorized === false &&
    b57.sourceMandatoryDependencyDroppingAuthorized === false &&
    b57.effectClassFlatteningAuthorized === false &&
    b57.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b57.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b57.controlCount === 14 &&
    b57.controlsFrozen &&
    deterministicContentHash(b57.controlIds) === deterministicContentHash(CAREER_T8_B57_COVERAGE_AUDIT_CONTROL_IDS) &&
    b57.productionImpact === 'NONE' &&
    b57.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION'
  );
}

function reconciliationEvidenceValid(): boolean {
  const surfaces = CAREER_T8_B58_CLASSICAL_METHOD_SURFACES;
  const authorityGrade = surfaces.filter(
    (surface) => surface.evidenceState !== 'DIRECT_BODY_INSPECTED_PROVENANCE_GAP',
  );
  const provenanceGap = surfaces.filter(
    (surface) => surface.evidenceState === 'DIRECT_BODY_INSPECTED_PROVENANCE_GAP',
  );
  const mingli = surfaces.find((surface) => surface.surfaceId === 'MINGLI_YUEYAN_KAN_ZHENGGUAN');

  return (
    b17Sanming?.branchClashStructuralEffectExplicit === true &&
    b17Sanming.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    b17Ziping?.branchClashStructuralEffectExplicit === true &&
    b17Ziping.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    b57Yuanhai?.directExternalBodyInspectedInThisAudit === true &&
    b57Yuanhai.exactHistoricalEditionOrMechanicalScanBoundInThisAudit === false &&
    b57Shenfeng?.directExternalBodyInspectedInThisAudit === true &&
    b57Shenfeng.exactHistoricalEditionOrMechanicalScanBoundInThisAudit === false &&
    b57Ditian?.directExternalBodyInspectedInThisAudit === true &&
    b57Ditian.exactHistoricalEditionOrMechanicalScanBoundInThisAudit === false &&
    CAREER_T8_B57_MINGLI_YUEYAN_1935_EXACT_BODY_EVIDENCE.exactHistoricalScanIdentityBound &&
    CAREER_T8_B57_MINGLI_YUEYAN_1935_EXACT_BODY_EVIDENCE.sourceDefinesOneUniformClashEffectAcrossStrengthStates === false &&
    surfaces.length === 6 &&
    authorityGrade.length === 3 &&
    provenanceGap.length === 3 &&
    surfaces.every((surface) => surface.flatUnaryEffectSupported === false) &&
    surfaces.every((surface) => surface.numericScalarAuthorized === false) &&
    surfaces.every((surface) => surface.modernCareerSemanticBridgeEstablished === false) &&
    mingli?.interactionGranularity === 'CLASH_OR_BREAK_GROUPED_NOT_ISOLATED' &&
    CAREER_T8_B58_RECONCILIATION_CONTROL_IDS.length === 16
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliationReport, 'reconciliationId'>,
): CareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliationReport {
  return {
    reconciliationId: `career_personalization_t8_classical_ziping_method_source_family_reconciliation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliation(
  b57: CareerPersonalizationT8SourceFamilyCoverageAuditReport,
): CareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliationReport {
  const accepted = exactB57Accepted(b57) && reconciliationEvidenceValid();

  return finalized({
    reconciliationVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION,
    status: accepted
      ? 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION'
      : 'UPSTREAM_B57_BOUNDARY_INVALID',
    decision: accepted
      ? 'PROVISIONAL_COMMON_CONDITIONAL_META_SHAPE_VISIBLE_PRIMARY_WITNESS_GAPS_BLOCK_COMMON_T6_METHOD_AUTHORITY_ZERO_SEMANTIC_PROMOTIONS'
      : 'CLASSICAL_METHOD_SOURCE_FAMILY_RECONCILIATION_NOT_ESTABLISHED',
    upstreamB57AuditId: b57.auditId,
    exactB57BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    methodSurfaces: accepted ? CAREER_T8_B58_CLASSICAL_METHOD_SURFACES : Object.freeze([]),
    methodSurfaceCount: accepted ? 6 : 0,
    authorityGradeSurfaceCount: accepted ? 3 : 0,
    provenanceGapSurfaceCount: accepted ? 3 : 0,
    unresolvedPrimaryWitnessSurfaceIds: accepted
      ? Object.freeze([
          'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT',
          'SHENFENG_TONGKAO_CONDITIONAL_CLASH',
          'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH',
        ] as const)
      : Object.freeze([]),
    provisionalCommonMetaShapeObserved: accepted,
    provisionalCommonMetaShape: accepted
      ? Object.freeze([
          'interaction presence alone is insufficient to resolve semantic effect',
          'the affected target or method-specific chart context participates in effect resolution',
          'qualitative outcomes may differ by contextual state instead of one uniform damage class',
          'no reviewed surface supplies a universal numeric attenuation scalar',
          'classical status or pattern semantics still require a separate bridge before modern Career use',
        ] as const)
      : Object.freeze([]),
    flatUnaryClashModifierSupported: false,
    uniformDamageEffectSupported: false,
    numericScalarEffectAuthorized: false,
    commonT6MethodContractEstablished: false,
    methodologyInputContractAuthoringAuthorized: false,
    currentCareerSemanticBridgeEstablished: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    effectClassFlatteningAuthorized: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutablePrimaryWitnessVerificationLaneCount: accepted ? 1 : 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: accepted
      ? 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION'
      : null,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    b56ChenZezhenHoldPreserved: accepted && b57.b56ChenZezhenHoldPreserved,
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
    controlIds: accepted ? CAREER_T8_B58_RECONCILIATION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      methodSourceFamilyReconciliationsCreated: accepted ? 1 : 0,
      normalizedClassicalMethodSurfacesRecorded: accepted ? 6 : 0,
      authorityGradeMethodSurfacesRecorded: accepted ? 3 : 0,
      provenanceGapMethodSurfacesRecorded: accepted ? 3 : 0,
      commonT6MethodContractsCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION'
      : 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION',
  });
}
