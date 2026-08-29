import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION,
  CAREER_T8_B58_CLASSICAL_METHOD_SURFACES,
  type CareerT8B58ClassicalSurfaceId,
  type CareerT8B58InputDimension,
} from './career-personalization-t8-classical-ziping-method-source-family-reconciliation.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_VISUAL_SCAN_CONFIRMATION_HOLD_VERSION,
  CAREER_T8_B61_VISUAL_ACCESS_ATTEMPT_RECORDS,
  CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS,
  CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS,
  type CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport,
} from './career-personalization-t8-classical-ziping-visual-scan-confirmation-hold.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-text-bound-method-authority-reassessment-v1' as const;

export type CareerT8B62EvidenceClass =
  | 'REPOSITORY_DIRECT_CLASSICAL_RESEARCH'
  | 'INSTITUTIONAL_EXACT_WITNESS_DIRECT'
  | 'INSTITUTIONAL_HISTORICAL_PDF_TEXT_BOUND'
  | 'EXACT_WITNESS_INDEXED_TARGET_BODY';

export interface CareerT8B62TextBoundMethodEvidenceRecord {
  surfaceId: CareerT8B58ClassicalSurfaceId;
  evidenceClass: CareerT8B62EvidenceClass;
  sourceIdentity: string;
  textBoundMethodReassessmentEligible: true;
  reassessedInputDimensions: readonly CareerT8B58InputDimension[];
  contextRequirement: string;
  interactionPresenceAloneSufficient: false;
  contextFreeUniformDamageSupported: false;
  fixedNumericClashScalarSupported: false;
  sourceRequiredContextMayBeDropped: false;
  affectedTargetOrConfigurationParticipates: true;
  modernCareerSemanticBridgeEstablished: false;
  note: string;
}

export const CAREER_T8_B62_TEXT_BOUND_METHOD_EVIDENCE_RECORDS = Object.freeze([
  Object.freeze({
    surfaceId: 'SANMING_TONGHUI_LUN_CHONGJI' as const,
    evidenceClass: 'REPOSITORY_DIRECT_CLASSICAL_RESEARCH' as const,
    sourceIdentity: '三命通會 卷二 論沖擊 — repository-direct classical research record',
    textBoundMethodReassessmentEligible: true as const,
    reassessedInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'AFFECTED_TARGET_OR_STORED_MATERIAL',
      'WHOLE_CHART_OR_PATTERN_CONFIGURATION',
    ] as const),
    contextRequirement:
      'What material is touched and the surrounding chart configuration participate in whether clash activates or damages stored material.',
    interactionPresenceAloneSufficient: false as const,
    contextFreeUniformDamageSupported: false as const,
    fixedNumericClashScalarSupported: false as const,
    sourceRequiredContextMayBeDropped: false as const,
    affectedTargetOrConfigurationParticipates: true as const,
    modernCareerSemanticBridgeEstablished: false as const,
    note:
      'This record supports a conditional interaction method shape only. 財官印綬/status language is not translated into current modern Career meaning.',
  }),
  Object.freeze({
    surfaceId: 'ZIPING_ZHENQUAN_ZHENGGUAN_CLASH_CONTEXT' as const,
    evidenceClass: 'REPOSITORY_DIRECT_CLASSICAL_RESEARCH' as const,
    sourceIdentity: '子平真詮 / 子平真詮評注 正官格·刑沖脈絡 — repository-direct classical research record',
    textBoundMethodReassessmentEligible: true as const,
    reassessedInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'WHOLE_CHART_OR_PATTERN_CONFIGURATION',
    ] as const),
    contextRequirement:
      'Clash is interpreted inside pattern integrity and surrounding 格局 conditions rather than as an isolated unary operator.',
    interactionPresenceAloneSufficient: false as const,
    contextFreeUniformDamageSupported: false as const,
    fixedNumericClashScalarSupported: false as const,
    sourceRequiredContextMayBeDropped: false as const,
    affectedTargetOrConfigurationParticipates: true as const,
    modernCareerSemanticBridgeEstablished: false as const,
    note:
      'Pattern-integrity doctrine remains a classical methodology context and is not silently imported as a current Career effect rule.',
  }),
  Object.freeze({
    surfaceId: 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT' as const,
    evidenceClass: 'INSTITUTIONAL_HISTORICAL_PDF_TEXT_BOUND' as const,
    sourceIdentity:
      '淵海子平 — institutional historical PDF text-bound 正官論 surface; B60 independently anchors the target at printed p.15 while preserving the separate B59 exact-witness visual hold',
    textBoundMethodReassessmentEligible: true as const,
    reassessedInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'DAY_MASTER_STRENGTH',
      'MONTH_COMMAND_OR_TIMING',
      'FINANCE_OR_SEAL_SUPPORT_CONFIGURATION',
      'WHOLE_CHART_OR_PATTERN_CONFIGURATION',
    ] as const),
    contextRequirement:
      'Month-command, balance/strength, support and broader configuration are part of the Zhengguan judgment; clash/break/harm cannot be evaluated safely as a context-free effect.',
    interactionPresenceAloneSufficient: false as const,
    contextFreeUniformDamageSupported: false as const,
    fixedNumericClashScalarSupported: false as const,
    sourceRequiredContextMayBeDropped: false as const,
    affectedTargetOrConfigurationParticipates: true as const,
    modernCareerSemanticBridgeEstablished: false as const,
    note:
      'Institutional historical text binding is used only for method reassessment. It does not substitute for B61 exact-edition visual corroboration and does not modernize 正官 status semantics.',
  }),
  Object.freeze({
    surfaceId: 'SHENFENG_TONGKAO_CONDITIONAL_CLASH' as const,
    evidenceClass: 'INSTITUTIONAL_HISTORICAL_PDF_TEXT_BOUND' as const,
    sourceIdentity:
      '神峰通考 — National Library of China 1929 institutional mechanical witness, conditional clash target body anchored at printed p.47',
    textBoundMethodReassessmentEligible: true as const,
    reassessedInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'AFFECTED_TARGET_ROLE_OR_USEFULNESS',
      'DAY_MASTER_STRENGTH',
      'WHOLE_CHART_OR_PATTERN_CONFIGURATION',
    ] as const),
    contextRequirement:
      'Whether the affected material is useful or harmful and whether the structure can carry 財官 changes the qualitative effect; clash may help or harm.',
    interactionPresenceAloneSufficient: false as const,
    contextFreeUniformDamageSupported: false as const,
    fixedNumericClashScalarSupported: false as const,
    sourceRequiredContextMayBeDropped: false as const,
    affectedTargetOrConfigurationParticipates: true as const,
    modernCareerSemanticBridgeEstablished: false as const,
    note:
      'The direct valence reversal is especially strong counter-evidence to a universal clash-damage operator. The 1929 witness is not substituted for B61 exact-1936 visual corroboration.',
  }),
  Object.freeze({
    surfaceId: 'MINGLI_YUEYAN_KAN_ZHENGGUAN' as const,
    evidenceClass: 'INSTITUTIONAL_EXACT_WITNESS_DIRECT' as const,
    sourceIdentity: '陳素庵《精選命理約言》1935 NLC exact mechanical witness, 卷一 看正官法',
    textBoundMethodReassessmentEligible: true as const,
    reassessedInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'DAY_MASTER_STRENGTH',
      'AFFECTED_ENTITY_STRENGTH',
      'MONTH_COMMAND_OR_TIMING',
      'FINANCE_OR_SEAL_SUPPORT_CONFIGURATION',
    ] as const),
    contextRequirement:
      'Day-master strength, 官 strength/timing and 財/印 support distinguish qualitative attenuation from break/failure under grouped adverse interaction conditions.',
    interactionPresenceAloneSufficient: false as const,
    contextFreeUniformDamageSupported: false as const,
    fixedNumericClashScalarSupported: false as const,
    sourceRequiredContextMayBeDropped: false as const,
    affectedTargetOrConfigurationParticipates: true as const,
    modernCareerSemanticBridgeEstablished: false as const,
    note:
      'The source groups 沖破 and therefore still does not isolate a branch-clash-only positive operator. Its divergent outcomes reject uniform flattening.',
  }),
  Object.freeze({
    surfaceId: 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH' as const,
    evidenceClass: 'EXACT_WITNESS_INDEXED_TARGET_BODY' as const,
    sourceIdentity:
      '滴天髓闡微 — SSID-11335994, 上海大東書局 1947 exact B59 witness indexed to 地生天者，天衰怕沖 and 任氏 strength/root commentary',
    textBoundMethodReassessmentEligible: true as const,
    reassessedInputDimensions: Object.freeze([
      'INTERACTION_RELATION_TYPE',
      'AFFECTED_ENTITY_STRENGTH',
      'ROOT_OR_SUPPORT_STATE',
      'AFFECTED_TARGET_ROLE_OR_USEFULNESS',
      'WHOLE_CHART_OR_PATTERN_CONFIGURATION',
    ] as const),
    contextRequirement:
      'Strength, root/support and surrounding configuration can reverse the practical reading of clash; weak/rootless states can suffer while sufficiently strong states need not fear or may welcome clash.',
    interactionPresenceAloneSufficient: false as const,
    contextFreeUniformDamageSupported: false as const,
    fixedNumericClashScalarSupported: false as const,
    sourceRequiredContextMayBeDropped: false as const,
    affectedTargetOrConfigurationParticipates: true as const,
    modernCareerSemanticBridgeEstablished: false as const,
    note:
      'The exact 1947 witness is text-index bound but remains visually uncorroborated under B61. The text binding is sufficient only for this bounded method-shape reassessment.',
  }),
] as const satisfies readonly CareerT8B62TextBoundMethodEvidenceRecord[]);

export const CAREER_T8_B62_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE = Object.freeze({
  candidateId: 'CLASSICAL_ZIPING_CONTEXT_REQUIRED_CLASH_NEGATIVE_METHOD_CONSTRAINT' as const,
  evidenceAdequateForSeparateScopeAuthorityReview: true as const,
  constraints: Object.freeze([
    'CLASH_PRESENCE_ALONE_MAY_NOT_RESOLVE_SEMANTIC_EFFECT',
    'CONTEXT_FREE_UNIFORM_DAMAGE_MAY_NOT_BE_ASSUMED',
    'FIXED_NUMERIC_CLASH_OFFSET_MULTIPLIER_OR_SCALAR_MAY_NOT_BE_INFERRED',
    'SOURCE_REQUIRED_CONTEXT_OR_AFFECTED_TARGET_ROLE_MAY_NOT_BE_DROPPED_FOR_CURRENT_METHOD_COMPATIBILITY',
    'QUALITATIVELY_DIVERGENT_SOURCE_OUTCOMES_MAY_NOT_BE_FLATTENED_TO_ONE_UNARY_EFFECT_CLASS',
  ] as const),
  scopeAuthorityAdmittedByThisGate: false as const,
  methodologyDefinitionCreatedByThisGate: false as const,
});

export const CAREER_T8_B62_TEXT_BOUND_METHOD_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'B62_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B61_TEXT_BOUND_REASSESSMENT_AUTHORIZATION',
  'B58_SIX_CLASSICAL_METHOD_SURFACES_REMAIN_THE_NORMALIZED_COMPARISON_UNIVERSE',
  'B61_VISUAL_CORROBORATION_HOLD_REMAINS_ACTIVE_AND_IS_NOT_WEAKENED_BY_TEXT_BOUND_METHOD_REASSESSMENT',
  'INSTITUTIONAL_HISTORICAL_TEXT_BINDING_MAY_SUPPORT_METHOD_SHAPE_REASSESSMENT_WITHOUT_BEING_SILENTLY_SUBSTITUTED_AS_EXACT_EDITION_VISUAL_PROOF',
  'ALL_SIX_REASSESSED_SURFACES_REJECT_INTERACTION_PRESENCE_AS_A_SUFFICIENT_EFFECT_RESOLVER',
  'SHENFENG_AND_DITIANSHUI_PRESERVE_QUALITATIVE_VALENCE_REVERSAL_OR_CONTEXT_SENSITIVITY_AGAINST_UNIFORM_DAMAGE',
  'MINGLI_YUEYAN_PRESERVES_DIVERGENT_STRENGTH_CONDITIONED_OUTCOMES_AND_GROUPED_CHONG_PO_GRANULARITY',
  'NO_STABLE_UNIFORM_TYPED_POSITIVE_T6_INPUT_SET_IS_ESTABLISHED_ACROSS_THE_SIX_METHOD_SURFACES',
  'THE_FIVE_NEGATIVE_METHOD_CONSTRAINTS_ARE_EVIDENCE_ADEQUATE_ONLY_FOR_A_SEPARATE_GOVERNED_SCOPE_AUTHORITY_REVIEW',
  'B62_ITSELF_DOES_NOT_ADMIT_METHODOLOGY_AUTHORITY_OR_CREATE_A_METHODOLOGY_DEFINITION',
  'NO_BRANCH_AUTHORITY_TRIGGER_IS_ACTIVATED_MERELY_BY_EVIDENCE_ADEQUACY_REASSESSMENT',
  'CLASSICAL_STATUS_PATTERN_GUIQI_GUANGUI_KEJIA_SEMANTICS_REMAIN_UNBRIDGED_TO_CURRENT_FORMAL_RESPONSIBILITY_OR_MODERN_CAREER',
  'ALL_SIX_HISTORICAL_CAREER_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'B56_CHEN_ZEZHEN_EXACT_TARGET_BODY_HOLD_REMAINS_UNCHANGED',
  'NO_T5_T6_T8_RULE_CLAIM_TYPE_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
  'THE_ONLY_IMMEDIATE_CONTINUATION_IS_A_SEPARATE_NEGATIVE_METHOD_CONSTRAINT_SCOPE_AUTHORITY_REVIEW',
] as const);

export interface CareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessmentReport {
  reassessmentId: string;
  reassessmentVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT'
    | 'UPSTREAM_B61_BOUNDARY_INVALID';
  decision:
    | 'SIX_TEXT_BOUND_SURFACES_SUPPORT_COMMON_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE_POSITIVE_T6_INPUT_CONTRACT_UNRESOLVED_SEPARATE_SCOPE_AUTHORITY_REVIEW_REQUIRED'
    | 'TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_NOT_ESTABLISHED';
  upstreamB61HoldId: string;
  exactB61BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  b58ReconciliationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION;
  evidenceRecords: readonly CareerT8B62TextBoundMethodEvidenceRecord[];
  evidenceRecordCount: 6 | 0;
  textBoundMethodReassessmentEligibleCount: 6 | 0;
  commonPositiveT6InputContractEstablished: false;
  commonNegativeMethodConstraintCandidateObserved: boolean;
  commonNegativeMethodConstraintEvidenceAdequateForScopeReview: boolean;
  negativeMethodConstraintCandidate: typeof CAREER_T8_B62_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE | null;
  flatUnaryClashModifierSupported: false;
  contextFreeUniformDamageSupported: false;
  fixedNumericClashScalarSupported: false;
  sourceRequiredContextDroppingAuthorized: false;
  effectClassFlatteningAuthorized: false;
  commonT6MethodContractEstablished: false;
  methodologyInputContractAuthoringAuthorized: false;
  currentCareerSemanticBridgeEstablished: false;
  branchAuthorityTriggerActivationCount: 0;
  immediatelyExecutableMethodScopeAuthorityReviewLaneCount: 1 | 0;
  immediatelyExecutableMethodologyDefinitionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW' | null;
  visualCorroborationHoldPreserved: boolean;
  b56ChenZezhenHoldPreserved: boolean;
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
  controlIds: readonly (typeof CAREER_T8_B62_TEXT_BOUND_METHOD_REASSESSMENT_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    reassessmentReportsCreated: 1 | 0;
    textBoundMethodEvidenceRecordsCreated: 6 | 0;
    negativeMethodConstraintCandidatesCreated: 1 | 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW'
    | 'BRANCH_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT';
}

function contentAddressedB61IdentityValid(
  b61: CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport,
): boolean {
  const { holdId, ...material } = b61;
  return (
    holdId ===
    `career_personalization_t8_classical_ziping_visual_scan_confirmation_hold_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB61Accepted(
  b61: CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport,
): boolean {
  return (
    contentAddressedB61IdentityValid(b61) &&
    b61.holdVersion === CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_VISUAL_SCAN_CONFIRMATION_HOLD_VERSION &&
    b61.status === 'RESOLVED_CLASSICAL_ZIPING_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION_HOLD' &&
    b61.decision ===
      'VISUAL_CORROBORATION_HELD_ZERO_EXACT_VISUAL_BINDINGS_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_REMAINS_OPEN' &&
    b61.exactB60BoundaryAccepted &&
    b61.domain === 'career' &&
    b61.temporalScope === 'natal' &&
    b61.statusClass === 'research' &&
    b61.visualAccessAttemptRecordCount === 3 &&
    deterministicContentHash(b61.visualAccessAttemptRecords) ===
      deterministicContentHash(CAREER_T8_B61_VISUAL_ACCESS_ATTEMPT_RECORDS) &&
    b61.exactWitnessTargetPageImageAcquiredCount === 0 &&
    b61.exactWitnessTargetPageVisuallyInspectedCount === 0 &&
    b61.targetPassageVisualConfirmationHoldActive &&
    b61.reopenTriggerCount === 3 &&
    deterministicContentHash(b61.reopenTriggers) ===
      deterministicContentHash(CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS) &&
    b61.satisfiedReopenTriggerCount === 0 &&
    b61.sameFailedSurfaceRetryAuthorized === false &&
    b61.broadClassicalSearchRestartAuthorized === false &&
    b61.textBoundHistoricalWitnessMethodReassessmentAuthorized &&
    b61.commonT6MethodContractEstablished === false &&
    b61.methodologyInputContractAuthoringAuthorized === false &&
    b61.currentCareerSemanticBridgeEstablished === false &&
    b61.branchAuthorityTriggerActivationCount === 0 &&
    b61.immediatelyExecutableVisualScanConfirmationLaneCount === 0 &&
    b61.immediatelyExecutableTextBoundMethodReassessmentLaneCount === 1 &&
    b61.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b61.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b61.selectedImmediateNextLane === 'BRANCH_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT' &&
    b61.b56ChenZezhenHoldPreserved &&
    b61.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b61.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b61.authorityAdmittedByThisGate === false &&
    b61.authorityGapClosedByThisGate === false &&
    b61.methodologyDefinitionCreatedByThisGate === false &&
    b61.controlCount === 16 &&
    b61.controlsFrozen &&
    deterministicContentHash(b61.controlIds) ===
      deterministicContentHash(CAREER_T8_B61_VISUAL_SCAN_CONFIRMIRMATION_HOLD_CONTROL_IDS_COMPAT()) &&
    b61.productionImpact === 'NONE' &&
    b61.recommendedNextGate === 'BRANCH_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT'
  );
}

function CAREER_T8_B61_VISUAL_SCAN_CONFIRMIRMATION_HOLD_CONTROL_IDS_COMPAT(): readonly string[] {
  return CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS;
}

function reassessmentEvidenceValid(): boolean {
  const records = CAREER_T8_B62_TEXT_BOUND_METHOD_EVIDENCE_RECORDS;
  const b58Ids = new Set(CAREER_T8_B58_CLASSICAL_METHOD_SURFACES.map((surface) => surface.surfaceId));
  return (
    CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION ===
      'myeonghwa-career-personalization-t8-classical-ziping-method-source-family-reconciliation-v1' &&
    CAREER_T8_B58_CLASSICAL_METHOD_SURFACES.length === 6 &&
    records.length === 6 &&
    records.every((record) => b58Ids.has(record.surfaceId)) &&
    new Set(records.map((record) => record.surfaceId)).size === 6 &&
    records.every((record) => record.textBoundMethodReassessmentEligible) &&
    records.every((record) => record.reassessedInputDimensions.length >= 2) &&
    records.every((record) => record.interactionPresenceAloneSufficient === false) &&
    records.every((record) => record.contextFreeUniformDamageSupported === false) &&
    records.every((record) => record.fixedNumericClashScalarSupported === false) &&
    records.every((record) => record.sourceRequiredContextMayBeDropped === false) &&
    records.every((record) => record.affectedTargetOrConfigurationParticipates) &&
    records.every((record) => record.modernCareerSemanticBridgeEstablished === false) &&
    CAREER_T8_B62_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE.constraints.length === 5 &&
    CAREER_T8_B62_TEXT_BOUND_METHOD_REASSESSMENT_CONTROL_IDS.length === 16
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessmentReport, 'reassessmentId'>,
): CareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessmentReport {
  return {
    reassessmentId: `career_personalization_t8_classical_ziping_text_bound_method_authority_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessment(
  b61: CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport,
): CareerPersonalizationT8ClassicalZipingTextBoundMethodAuthorityReassessmentReport {
  const accepted = exactB61Accepted(b61) && reassessmentEvidenceValid();

  return finalized({
    reassessmentVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_VERSION,
    status: accepted
      ? 'RESOLVED_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT'
      : 'UPSTREAM_B61_BOUNDARY_INVALID',
    decision: accepted
      ? 'SIX_TEXT_BOUND_SURFACES_SUPPORT_COMMON_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE_POSITIVE_T6_INPUT_CONTRACT_UNRESOLVED_SEPARATE_SCOPE_AUTHORITY_REVIEW_REQUIRED'
      : 'TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT_NOT_ESTABLISHED',
    upstreamB61HoldId: b61.holdId,
    exactB61BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    b58ReconciliationVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION,
    evidenceRecords: accepted ? CAREER_T8_B62_TEXT_BOUND_METHOD_EVIDENCE_RECORDS : Object.freeze([]),
    evidenceRecordCount: accepted ? 6 : 0,
    textBoundMethodReassessmentEligibleCount: accepted ? 6 : 0,
    commonPositiveT6InputContractEstablished: false,
    commonNegativeMethodConstraintCandidateObserved: accepted,
    commonNegativeMethodConstraintEvidenceAdequateForScopeReview: accepted,
    negativeMethodConstraintCandidate: accepted ? CAREER_T8_B62_NEGATIVE_METHOD_CONSTRAINT_CANDIDATE : null,
    flatUnaryClashModifierSupported: false,
    contextFreeUniformDamageSupported: false,
    fixedNumericClashScalarSupported: false,
    sourceRequiredContextDroppingAuthorized: false,
    effectClassFlatteningAuthorized: false,
    commonT6MethodContractEstablished: false,
    methodologyInputContractAuthoringAuthorized: false,
    currentCareerSemanticBridgeEstablished: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutableMethodScopeAuthorityReviewLaneCount: accepted ? 1 : 0,
    immediatelyExecutableMethodologyDefinitionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: accepted ? 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW' : null,
    visualCorroborationHoldPreserved: accepted && b61.targetPassageVisualConfirmationHoldActive,
    b56ChenZezhenHoldPreserved: accepted && b61.b56ChenZezhenHoldPreserved,
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
    controlIds: accepted ? CAREER_T8_B62_TEXT_BOUND_METHOD_REASSESSMENT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      reassessmentReportsCreated: accepted ? 1 : 0,
      textBoundMethodEvidenceRecordsCreated: accepted ? 6 : 0,
      negativeMethodConstraintCandidatesCreated: accepted ? 1 : 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW'
      : 'BRANCH_CLASSICAL_ZIPING_TEXT_BOUND_METHOD_AUTHORITY_REASSESSMENT',
  });
}
