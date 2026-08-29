import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION,
  CAREER_T8_B58_CLASSICAL_METHOD_SURFACES,
  CAREER_T8_B58_RECONCILIATION_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliationReport,
  type CareerT8B58ClassicalSurfaceId,
} from './career-personalization-t8-classical-ziping-method-source-family-reconciliation.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_PRIMARY_WITNESS_VERIFICATION_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-primary-witness-verification-v1' as const;

export type CareerT8B59WitnessVerificationState =
  | 'EXACT_WITNESS_IDENTITY_LOCATED_TARGET_TEXT_COUNTERPART_LOCATED_SCAN_PAGE_BINDING_OPEN';

export interface CareerT8B59PrimaryWitnessVerificationRecord {
  surfaceId: Extract<
    CareerT8B58ClassicalSurfaceId,
    | 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT'
    | 'SHENFENG_TONGKAO_CONDITIONAL_CLASH'
    | 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH'
  >;
  title: string;
  verificationState: CareerT8B59WitnessVerificationState;
  witnessIdentity: string;
  witnessRepositoryOrHolding: string;
  witnessEditionOrPublication: string;
  mechanicalScanPageCount: number;
  witnessFileIdentity: string;
  exactWitnessIdentityLocated: true;
  mechanicalScanConfirmed: true;
  targetTextCounterpartLocated: true;
  targetTextLocator: string;
  targetMethodSignal: string;
  targetPassageScanPageBound: false;
  scanPageNumber: null;
  scanPageVisualInspectionCompleted: false;
  sourcePassagePromotionAuthorized: false;
  inputDimensionPromotionAuthorized: false;
  effectClassPromotionAuthorized: false;
  modernCareerSemanticBridgeEstablished: false;
  verificationNote: string;
}

export const CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_RECORDS = Object.freeze([
  Object.freeze({
    surfaceId: 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT' as const,
    title: '刻京臺增補淵海子平大全 / 淵海子平',
    verificationState:
      'EXACT_WITNESS_IDENTITY_LOCATED_TARGET_TEXT_COUNTERPART_LOCATED_SCAN_PAGE_BINDING_OPEN' as const,
    witnessIdentity:
      '(明)李欽撰, 刻京臺增補淵海子平大全, National Central Library (Taiwan) rare-book scan',
    witnessRepositoryOrHolding: 'National Central Library, Taipei; Rare Books & Special Collections',
    witnessEditionOrPublication: '明萬曆庚子(二十八年)閩書林劉龍田喬山堂刊本',
    mechanicalScanPageCount: 160,
    witnessFileIdentity: 'NCL-06593 刻京臺增補淵海子平大全.pdf',
    exactWitnessIdentityLocated: true,
    mechanicalScanConfirmed: true,
    targetTextCounterpartLocated: true,
    targetTextLocator: 'public canonical transcription, 正官論',
    targetMethodSignal:
      'The located Zhengguan discussion requires month-command, chart context, balance/strength and support context while treating punishment/clash/break/harm as adverse conditions; it warns against rigid one-path judgment.',
    targetPassageScanPageBound: false,
    scanPageNumber: null,
    scanPageVisualInspectionCompleted: false,
    sourcePassagePromotionAuthorized: false,
    inputDimensionPromotionAuthorized: false,
    effectClassPromotionAuthorized: false,
    modernCareerSemanticBridgeEstablished: false,
    verificationNote:
      'The rare-book witness identity is now concrete and reproducible, and a matching target textual surface is located. This gate does not claim that the target 正官論 body has been visually located on a specific scan page yet.',
  }),
  Object.freeze({
    surfaceId: 'SHENFENG_TONGKAO_CONDITIONAL_CLASH' as const,
    title: '銅版精印神峰通考命理正宗',
    verificationState:
      'EXACT_WITNESS_IDENTITY_LOCATED_TARGET_TEXT_COUNTERPART_LOCATED_SCAN_PAGE_BINDING_OPEN' as const,
    witnessIdentity:
      '星命學社重校, 銅版精印神峰通考命理正宗, National Library of China mechanical scan',
    witnessRepositoryOrHolding: 'National Library of China batch nlc:data_511,027032013013877,17378',
    witnessEditionOrPublication: '星命學社, 民國二十五年三月 [1936-03]',
    mechanicalScanPageCount: 220,
    witnessFileIdentity: 'NLC511-027032013013877-17378 銅版精印神峰通考命理正宗.pdf',
    exactWitnessIdentityLocated: true,
    mechanicalScanConfirmed: true,
    targetTextCounterpartLocated: true,
    targetTextLocator: 'public canonical transcription, 專祿格 and 雜氣財官格 conditional clash passages',
    targetMethodSignal:
      'The located text distinguishes clash outcomes by whether clash removes a harmful factor or affects a useful 財官 configuration and by strength/balance context; additional clash can become more harmful when the structure does not support it.',
    targetPassageScanPageBound: false,
    scanPageNumber: null,
    scanPageVisualInspectionCompleted: false,
    sourcePassagePromotionAuthorized: false,
    inputDimensionPromotionAuthorized: false,
    effectClassPromotionAuthorized: false,
    modernCareerSemanticBridgeEstablished: false,
    verificationNote:
      'The exact 1936 mechanical witness is identified, but the target passages are not yet bound to exact scan page numbers and visually checked in that witness. Usefulness/target-role remains provisional.',
  }),
  Object.freeze({
    surfaceId: 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH' as const,
    title: '滴天髓闡微',
    verificationState:
      'EXACT_WITNESS_IDENTITY_LOCATED_TARGET_TEXT_COUNTERPART_LOCATED_SCAN_PAGE_BINDING_OPEN' as const,
    witnessIdentity: '滴天髓闡微, 上海大東書局 1947 mechanical scan',
    witnessRepositoryOrHolding: 'public mechanical-scan preservation surface; SSID-11335994',
    witnessEditionOrPublication: '上海大東書局, 1947',
    mechanicalScanPageCount: 516,
    witnessFileIdentity: 'SSID-11335994 滴天髓闡微.pdf',
    exactWitnessIdentityLocated: true,
    mechanicalScanConfirmed: true,
    targetTextCounterpartLocated: true,
    targetTextLocator: 'public canonical transcription, 地生天者天衰怕沖 and commentary/examples',
    targetMethodSignal:
      'The located text makes clash effect depend on day-master strength, root/support condition and surrounding configuration, including cases where strong contexts can welcome clash and weak-root contexts suffer severe damage.',
    targetPassageScanPageBound: false,
    scanPageNumber: null,
    scanPageVisualInspectionCompleted: false,
    sourcePassagePromotionAuthorized: false,
    inputDimensionPromotionAuthorized: false,
    effectClassPromotionAuthorized: false,
    modernCareerSemanticBridgeEstablished: false,
    verificationNote:
      'A concrete 1947 mechanical-scan witness is located together with the target textual counterpart. Root/strength dimensions remain non-promotable until the exact target body is visually scan-page bound.',
  }),
] as const satisfies readonly CareerT8B59PrimaryWitnessVerificationRecord[]);

export const CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS = Object.freeze([
  'B59_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B58_RECONCILIATION_BOUNDARY',
  'THE_THREE_B58_PROVENANCE_GAP_SURFACES_RECEIVE_CONCRETE_REPRODUCIBLE_WITNESS_IDENTITIES',
  'WITNESS_IDENTITY_DISCOVERY_IS_NOT_EQUIVALENT_TO_TARGET_PASSAGE_SCAN_PAGE_BINDING',
  'PUBLIC_TEXT_COUNTERPARTS_MAY_GUIDE_SCAN_LOCALIZATION_BUT_DO_NOT_REPLACE_VISUAL_PRIMARY_WITNESS_INSPECTION',
  'YUANHAI_ZIPING_TARGET_DIMENSIONS_REMAIN_PROVISIONAL_UNTIL_THE_ZHENGGUAN_TARGET_BODY_IS_SCAN_PAGE_BOUND',
  'SHENFENG_USEFULNESS_TARGET_ROLE_AND_STRENGTH_SIGNALS_REMAIN_PROVISIONAL_UNTIL_TARGET_PASSAGES_ARE_SCAN_PAGE_BOUND',
  'DITIANSHUI_ROOT_STRENGTH_AND_BENEFICIAL_OR_DAMAGING_CLASH_SIGNALS_REMAIN_PROVISIONAL_UNTIL_TARGET_PASSAGES_ARE_SCAN_PAGE_BOUND',
  'NO_PRIMARY_SOURCE_PASSAGE_IS_PROMOTED_BY_WITNESS_METADATA_ALONE',
  'NO_COMMON_T6_METHOD_CONTRACT_OR_METHODOLOGY_INPUT_CONTRACT_IS_AUTHORIZED',
  'NO_FLAT_UNARY_CLASH_MODIFIER_UNIFORM_DAMAGE_EFFECT_NUMERIC_OFFSET_OR_MULTIPLIER_IS_AUTHORIZED',
  'CLASSICAL_STATUS_PATTERN_AND_GUIQI_SEMANTICS_REMAIN_UNBRIDGED_TO_CURRENT_FORMAL_RESPONSIBILITY_AND_MODERN_CAREER',
  'B56_CHEN_ZEZHEN_EXACT_TARGET_BODY_HOLD_REMAINS_UNCHANGED',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_AUTHORITY_TRIGGER_IS_ACTIVATED_BY_PARTIAL_PRIMARY_WITNESS_VERIFICATION',
  'THE_ONLY_EXECUTABLE_CONTINUATION_IS_EXACT_SCAN_PAGE_BINDING_FOR_THE_THREE_TARGET_PASSAGES',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport {
  verificationId: string;
  verificationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_PRIMARY_WITNESS_VERIFICATION_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION'
    | 'UPSTREAM_B58_BOUNDARY_INVALID';
  decision:
    | 'THREE_EXACT_WITNESS_IDENTITIES_AND_TARGET_TEXT_COUNTERPARTS_LOCATED_ZERO_SCAN_PAGE_BINDINGS_AUTHORITY_REMAINS_CLOSED'
    | 'PRIMARY_WITNESS_VERIFICATION_NOT_ESTABLISHED';
  upstreamB58ReconciliationId: string;
  exactB58BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  verificationRecords: readonly CareerT8B59PrimaryWitnessVerificationRecord[];
  verificationRecordCount: 3 | 0;
  exactWitnessIdentityLocatedCount: 3 | 0;
  targetTextCounterpartLocatedCount: 3 | 0;
  targetPassageScanPageBoundCount: 0;
  scanPageVisualInspectionCompletedCount: 0;
  primaryWitnessVerificationComplete: false;
  commonT6MethodContractEstablished: false;
  methodologyInputContractAuthoringAuthorized: false;
  currentCareerSemanticBridgeEstablished: false;
  branchAuthorityTriggerActivationCount: 0;
  immediatelyExecutableScanPageBindingLaneCount: 1 | 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING'
    | null;
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
  controlIds: readonly (typeof CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    primaryWitnessVerificationReportsCreated: 1 | 0;
    exactWitnessIdentitiesLocated: 3 | 0;
    targetTextCounterpartsLocated: 3 | 0;
    targetPassagesScanPageBound: 0;
    sourcePassagesPromoted: 0;
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
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING'
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION';
}

function contentAddressedB58IdentityValid(
  b58: CareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliationReport,
): boolean {
  const { reconciliationId, ...material } = b58;
  return (
    reconciliationId ===
    `career_personalization_t8_classical_ziping_method_source_family_reconciliation_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB58Accepted(
  b58: CareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliationReport,
): boolean {
  return (
    contentAddressedB58IdentityValid(b58) &&
    b58.reconciliationVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_METHOD_SOURCE_FAMILY_RECONCILIATION_VERSION &&
    b58.status === 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_METHOD_SOURCE_FAMILY_RECONCILIATION' &&
    b58.decision ===
      'PROVISIONAL_COMMON_CONDITIONAL_META_SHAPE_VISIBLE_PRIMARY_WITNESS_GAPS_BLOCK_COMMON_T6_METHOD_AUTHORITY_ZERO_SEMANTIC_PROMOTIONS' &&
    b58.exactB57BoundaryAccepted &&
    b58.domain === 'career' &&
    b58.temporalScope === 'natal' &&
    b58.statusClass === 'research' &&
    b58.methodSurfaceCount === 6 &&
    b58.authorityGradeSurfaceCount === 3 &&
    b58.provenanceGapSurfaceCount === 3 &&
    deterministicContentHash(b58.methodSurfaces) === deterministicContentHash(CAREER_T8_B58_CLASSICAL_METHOD_SURFACES) &&
    b58.provisionalCommonMetaShapeObserved &&
    b58.flatUnaryClashModifierSupported === false &&
    b58.uniformDamageEffectSupported === false &&
    b58.numericScalarEffectAuthorized === false &&
    b58.commonT6MethodContractEstablished === false &&
    b58.methodologyInputContractAuthoringAuthorized === false &&
    b58.currentCareerSemanticBridgeEstablished === false &&
    b58.branchAuthorityTriggerActivationCount === 0 &&
    b58.immediatelyExecutablePrimaryWitnessVerificationLaneCount === 1 &&
    b58.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION' &&
    b58.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b58.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b58.b56ChenZezhenHoldPreserved &&
    b58.controlCount === 16 &&
    b58.controlsFrozen &&
    deterministicContentHash(b58.controlIds) === deterministicContentHash(CAREER_T8_B58_RECONCILIATION_CONTROL_IDS) &&
    b58.productionImpact === 'NONE' &&
    b58.recommendedNextGate === 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION'
  );
}

function witnessVerificationEvidenceValid(): boolean {
  const records = CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_RECORDS;
  return (
    records.length === 3 &&
    records.every((record) => record.exactWitnessIdentityLocated) &&
    records.every((record) => record.mechanicalScanConfirmed) &&
    records.every((record) => record.targetTextCounterpartLocated) &&
    records.every((record) => record.targetPassageScanPageBound === false) &&
    records.every((record) => record.scanPageVisualInspectionCompleted === false) &&
    records.every((record) => record.sourcePassagePromotionAuthorized === false) &&
    records.every((record) => record.inputDimensionPromotionAuthorized === false) &&
    records.every((record) => record.effectClassPromotionAuthorized === false) &&
    records.every((record) => record.modernCareerSemanticBridgeEstablished === false) &&
    CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS.length === 16
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport, 'verificationId'>,
): CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport {
  return {
    verificationId: `career_personalization_t8_classical_ziping_primary_witness_verification_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8ClassicalZipingPrimaryWitnessVerification(
  b58: CareerPersonalizationT8ClassicalZipingMethodSourceFamilyReconciliationReport,
): CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport {
  const accepted = exactB58Accepted(b58) && witnessVerificationEvidenceValid();

  return finalized({
    verificationVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_PRIMARY_WITNESS_VERIFICATION_VERSION,
    status: accepted
      ? 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION'
      : 'UPSTREAM_B58_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_EXACT_WITNESS_IDENTITIES_AND_TARGET_TEXT_COUNTERPARTS_LOCATED_ZERO_SCAN_PAGE_BINDINGS_AUTHORITY_REMAINS_CLOSED'
      : 'PRIMARY_WITNESS_VERIFICATION_NOT_ESTABLISHED',
    upstreamB58ReconciliationId: b58.reconciliationId,
    exactB58BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    verificationRecords: accepted ? CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_RECORDS : Object.freeze([]),
    verificationRecordCount: accepted ? 3 : 0,
    exactWitnessIdentityLocatedCount: accepted ? 3 : 0,
    targetTextCounterpartLocatedCount: accepted ? 3 : 0,
    targetPassageScanPageBoundCount: 0,
    scanPageVisualInspectionCompletedCount: 0,
    primaryWitnessVerificationComplete: false,
    commonT6MethodContractEstablished: false,
    methodologyInputContractAuthoringAuthorized: false,
    currentCareerSemanticBridgeEstablished: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutableScanPageBindingLaneCount: accepted ? 1 : 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: accepted
      ? 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING'
      : null,
    b56ChenZezhenHoldPreserved: accepted && b58.b56ChenZezhenHoldPreserved,
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
    controlIds: accepted ? CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      primaryWitnessVerificationReportsCreated: accepted ? 1 : 0,
      exactWitnessIdentitiesLocated: accepted ? 3 : 0,
      targetTextCounterpartsLocated: accepted ? 3 : 0,
      targetPassagesScanPageBound: 0,
      sourcePassagesPromoted: 0,
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
      ? 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING'
      : 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION',
  });
}
