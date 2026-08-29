import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_PRIMARY_WITNESS_VERIFICATION_VERSION,
  CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS,
  CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_RECORDS,
  type CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport,
} from './career-personalization-t8-classical-ziping-primary-witness-verification.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TARGET_PASSAGE_SCAN_LOCALIZATION_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-target-passage-scan-localization-v1' as const;

export type CareerT8B60LocalizationClass =
  | 'SAME_WORK_VOLUME_NARROWING_PLUS_INDEPENDENT_PRINTED_PAGE_ANCHOR'
  | 'INDEPENDENT_HISTORICAL_WITNESS_PRINTED_PAGE_ANCHOR'
  | 'SAME_EDITION_INDEXED_TARGET_BODY_MATCH_PAGE_ORDINAL_OPEN';

export interface CareerT8B60TargetPassageLocalizationRecord {
  surfaceId:
    | 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT'
    | 'SHENFENG_TONGKAO_CONDITIONAL_CLASH'
    | 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH';
  localizationClass: CareerT8B60LocalizationClass;
  b59WitnessFileIdentity: string;
  b59SameEditionPreserved: boolean;
  localizationEvidence: readonly string[];
  exactTargetTextMatched: true;
  sameEditionTargetBodyIndexed: boolean;
  sameEditionScanPageOrdinalKnown: false;
  sameEditionVisualScanInspectionCompleted: false;
  independentHistoricalWitnessLocated: boolean;
  independentWitnessPrintedPageAnchor: number | null;
  sourcePassagePromotionAuthorized: false;
  inputDimensionPromotionAuthorized: false;
  effectClassPromotionAuthorized: false;
  evidenceNote: string;
}

export const CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_RECORDS = Object.freeze([
  Object.freeze({
    surfaceId: 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT' as const,
    localizationClass: 'SAME_WORK_VOLUME_NARROWING_PLUS_INDEPENDENT_PRINTED_PAGE_ANCHOR' as const,
    b59WitnessFileIdentity: 'NCL-06593 刻京臺增補淵海子平大全.pdf',
    b59SameEditionPreserved: true,
    localizationEvidence: Object.freeze([
      'NLC892-2642-210288 刻京臺增補淵海子平大全 第2冊 is a 30-page mechanical scan containing 卷之三 only, narrowing the same-work target surface to one short volume.',
      'A separate National Taiwan Library mechanical PDF indexed as NTL-9900014379 評註淵海子平子平真詮 v.1 directly exposes 正官論 and the target 正官乃貴氣之物...大忌刑沖破害 / 通變 context with printed-page marker 一五.',
    ] as const),
    exactTargetTextMatched: true,
    sameEditionTargetBodyIndexed: false,
    sameEditionScanPageOrdinalKnown: false,
    sameEditionVisualScanInspectionCompleted: false,
    independentHistoricalWitnessLocated: true,
    independentWitnessPrintedPageAnchor: 15,
    sourcePassagePromotionAuthorized: false,
    inputDimensionPromotionAuthorized: false,
    effectClassPromotionAuthorized: false,
    evidenceNote:
      'The B59 NCL-06593 edition is not silently replaced. Same-work volume narrowing and an independent historical printed-page witness substantially reduce localization uncertainty, but exact B59-edition scan-page visual binding remains open.',
  }),
  Object.freeze({
    surfaceId: 'SHENFENG_TONGKAO_CONDITIONAL_CLASH' as const,
    localizationClass: 'INDEPENDENT_HISTORICAL_WITNESS_PRINTED_PAGE_ANCHOR' as const,
    b59WitnessFileIdentity: 'NLC511-027032013013877-17378 銅版精印神峰通考命理正宗.pdf',
    b59SameEditionPreserved: true,
    localizationEvidence: Object.freeze([
      'NLC511-027032013020556-10360 神峰通考 第1卷, 中華書局/文明書局 1929.11, is a 170-page NLC mechanical scan.',
      'The direct PDF index exposes the conditional 雜氣財官 passage: if 財官 is not the operative structure, clash may become harmful; only 身旺有財官 supports 喜沖開. The indexed block terminates with printed-page marker 四七.',
    ] as const),
    exactTargetTextMatched: true,
    sameEditionTargetBodyIndexed: false,
    sameEditionScanPageOrdinalKnown: false,
    sameEditionVisualScanInspectionCompleted: false,
    independentHistoricalWitnessLocated: true,
    independentWitnessPrintedPageAnchor: 47,
    sourcePassagePromotionAuthorized: false,
    inputDimensionPromotionAuthorized: false,
    effectClassPromotionAuthorized: false,
    evidenceNote:
      'The 1929 NLC witness independently anchors the exact conditional-clash method text at printed page 47. It does not prove the page location in the B59 1936 星命學社 witness, so B59 same-edition visual binding remains open.',
  }),
  Object.freeze({
    surfaceId: 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH' as const,
    localizationClass: 'SAME_EDITION_INDEXED_TARGET_BODY_MATCH_PAGE_ORDINAL_OPEN' as const,
    b59WitnessFileIdentity: 'SSID-11335994 滴天髓闡微.pdf',
    b59SameEditionPreserved: true,
    localizationEvidence: Object.freeze([
      'The direct SSID-11335994 1947 上海大東書局 mechanical-PDF index exposes 地生天者，天衰怕沖 and 任氏 commentary in the same preserved witness.',
      'The indexed target body includes 日主不得令/少幫扶 -> 沖則根拔 and the contrast that 得時當令 or otherwise strongly supported structures need not fear 沖破, summarized as 旺相者喜沖，休囚者怕沖.',
    ] as const),
    exactTargetTextMatched: true,
    sameEditionTargetBodyIndexed: true,
    sameEditionScanPageOrdinalKnown: false,
    sameEditionVisualScanInspectionCompleted: false,
    independentHistoricalWitnessLocated: true,
    independentWitnessPrintedPageAnchor: null,
    sourcePassagePromotionAuthorized: false,
    inputDimensionPromotionAuthorized: false,
    effectClassPromotionAuthorized: false,
    evidenceNote:
      'This is stronger than B59 metadata-only witness discovery because the exact 1947 witness itself is text-index matched to the target body. The page ordinal and visual scan confirmation are still absent, so no provenance or method authority is promoted.',
  }),
] as const satisfies readonly CareerT8B60TargetPassageLocalizationRecord[]);

export const CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS = Object.freeze([
  'B60_CONSUMES_ONLY_THE_CONTENT_ADDRESSED_B59_PRIMARY_WITNESS_VERIFICATION_BOUNDARY',
  'B59_WITNESS_IDENTITIES_ARE_PRESERVED_AND_INDEPENDENT_WITNESSES_ARE_NEVER_SILENTLY_SUBSTITUTED',
  'YUANHAI_SAME_WORK_VOLUME_IS_NARROWED_TO_A_30_PAGE_VOLUME_THREE_SCAN_WITHOUT_CLAIMING_SAME_EDITION_PAGE_BINDING',
  'YUANHAI_INDEPENDENT_HISTORICAL_WITNESS_ANCHORS_THE_ZHENGGUAN_TARGET_TEXT_AT_PRINTED_PAGE_15',
  'SHENFENG_INDEPENDENT_1929_NLC_WITNESS_ANCHORS_THE_CONDITIONAL_CLASH_TARGET_TEXT_AT_PRINTED_PAGE_47',
  'DITIANSHUI_EXACT_1947_B59_WITNESS_IS_INDEXED_TO_THE_TARGET_BODY_WITHOUT_A_PAGE_ORDINAL',
  'INDEXED_PDF_TEXT_AND_PRINTED_PAGE_MARKERS_DO_NOT_SUBSTITUTE_FOR_VISUAL_SCAN_PAGE_INSPECTION',
  'ZERO_B59_SAME_EDITION_TARGET_PASSAGES_ARE_DECLARED_VISUALLY_SCAN_PAGE_BOUND',
  'NO_SOURCE_PASSAGE_INPUT_DIMENSION_OR_EFFECT_CLASS_IS_PROMOTED_BY_LOCALIZATION_EVIDENCE',
  'NO_COMMON_T6_METHOD_CONTRACT_OR_METHODOLOGY_INPUT_CONTRACT_IS_AUTHORIZED',
  'NO_FLAT_UNARY_CLASH_MODIFIER_UNIFORM_DAMAGE_EFFECT_NUMERIC_OFFSET_OR_MULTIPLIER_IS_AUTHORIZED',
  'CLASSICAL_STATUS_PATTERN_AND_GUIQI_SEMANTICS_REMAIN_UNBRIDGED_TO_CURRENT_FORMAL_RESPONSIBILITY_AND_MODERN_CAREER',
  'B56_CHEN_ZEZHEN_HOLD_REMAINS_UNCHANGED',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'THE_ONLY_EXECUTABLE_CONTINUATION_IS_VISUAL_SCAN_CONFIRMATION_USING_THE_NARROWED_TARGET_LOCATORS',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport {
  localizationId: string;
  localizationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TARGET_PASSAGE_SCAN_LOCALIZATION_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_LOCALIZATION'
    | 'UPSTREAM_B59_BOUNDARY_INVALID';
  decision:
    | 'THREE_TARGET_TEXTS_LOCALIZED_ONE_SAME_EDITION_INDEX_MATCH_TWO_INDEPENDENT_PRINTED_PAGE_ANCHORS_ZERO_VISUAL_BINDINGS_AUTHORITY_REMAINS_CLOSED'
    | 'TARGET_PASSAGE_SCAN_LOCALIZATION_NOT_ESTABLISHED';
  upstreamB59VerificationId: string;
  exactB59BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  localizationRecords: readonly CareerT8B60TargetPassageLocalizationRecord[];
  localizationRecordCount: 3 | 0;
  exactTargetTextMatchedCount: 3 | 0;
  sameEditionTargetBodyIndexedCount: 1 | 0;
  independentPrintedPageAnchorCount: 2 | 0;
  sameEditionVisualScanPageBoundCount: 0;
  scanPageVisualInspectionCompletedCount: 0;
  commonT6MethodContractEstablished: false;
  methodologyInputContractAuthoringAuthorized: false;
  currentCareerSemanticBridgeEstablished: false;
  branchAuthorityTriggerActivationCount: 0;
  immediatelyExecutableVisualScanConfirmationLaneCount: 1 | 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION'
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
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION'
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING';
}

function exactB59Accepted(b59: CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport): boolean {
  const { verificationId, ...material } = b59;
  return (
    verificationId ===
      `career_personalization_t8_classical_ziping_primary_witness_verification_${deterministicContentHash(material).slice(0, 24)}` &&
    b59.verificationVersion === CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_PRIMARY_WITNESS_VERIFICATION_VERSION &&
    b59.status === 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_PRIMARY_WITNESS_VERIFICATION' &&
    b59.decision ===
      'THREE_EXACT_WITNESS_IDENTITIES_AND_TARGET_TEXT_COUNTERPARTS_LOCATED_ZERO_SCAN_PAGE_BINDINGS_AUTHORITY_REMAINS_CLOSED' &&
    b59.exactB58BoundaryAccepted &&
    b59.domain === 'career' &&
    b59.temporalScope === 'natal' &&
    b59.statusClass === 'research' &&
    b59.verificationRecordCount === 3 &&
    deterministicContentHash(b59.verificationRecords) ===
      deterministicContentHash(CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_RECORDS) &&
    b59.exactWitnessIdentityLocatedCount === 3 &&
    b59.targetTextCounterpartLocatedCount === 3 &&
    b59.targetPassageScanPageBoundCount === 0 &&
    b59.scanPageVisualInspectionCompletedCount === 0 &&
    b59.primaryWitnessVerificationComplete === false &&
    b59.commonT6MethodContractEstablished === false &&
    b59.methodologyInputContractAuthoringAuthorized === false &&
    b59.currentCareerSemanticBridgeEstablished === false &&
    b59.branchAuthorityTriggerActivationCount === 0 &&
    b59.immediatelyExecutableScanPageBindingLaneCount === 1 &&
    b59.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING' &&
    b59.b56ChenZezhenHoldPreserved &&
    b59.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b59.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b59.controlCount === 16 &&
    b59.controlsFrozen &&
    deterministicContentHash(b59.controlIds) ===
      deterministicContentHash(CAREER_T8_B59_PRIMARY_WITNESS_VERIFICATION_CONTROL_IDS) &&
    b59.productionImpact === 'NONE'
  );
}

function localizationEvidenceValid(): boolean {
  const records = CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_RECORDS;
  return (
    records.length === 3 &&
    records.every((record) => record.exactTargetTextMatched) &&
    records.filter((record) => record.sameEditionTargetBodyIndexed).length === 1 &&
    records.filter((record) => record.independentWitnessPrintedPageAnchor !== null).length === 2 &&
    records.every((record) => record.sameEditionScanPageOrdinalKnown === false) &&
    records.every((record) => record.sameEditionVisualScanInspectionCompleted === false) &&
    records.every((record) => record.sourcePassagePromotionAuthorized === false) &&
    CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS.length === 16
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport, 'localizationId'>,
): CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport {
  return {
    localizationId: `career_personalization_t8_classical_ziping_target_passage_scan_localization_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8ClassicalZipingTargetPassageScanLocalization(
  b59: CareerPersonalizationT8ClassicalZipingPrimaryWitnessVerificationReport,
): CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport {
  const accepted = exactB59Accepted(b59) && localizationEvidenceValid();

  return finalized({
    localizationVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TARGET_PASSAGE_SCAN_LOCALIZATION_VERSION,
    status: accepted
      ? 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_LOCALIZATION'
      : 'UPSTREAM_B59_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_TARGET_TEXTS_LOCALIZED_ONE_SAME_EDITION_INDEX_MATCH_TWO_INDEPENDENT_PRINTED_PAGE_ANCHORS_ZERO_VISUAL_BINDINGS_AUTHORITY_REMAINS_CLOSED'
      : 'TARGET_PASSAGE_SCAN_LOCALIZATION_NOT_ESTABLISHED',
    upstreamB59VerificationId: b59.verificationId,
    exactB59BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    localizationRecords: accepted ? CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_RECORDS : Object.freeze([]),
    localizationRecordCount: accepted ? 3 : 0,
    exactTargetTextMatchedCount: accepted ? 3 : 0,
    sameEditionTargetBodyIndexedCount: accepted ? 1 : 0,
    independentPrintedPageAnchorCount: accepted ? 2 : 0,
    sameEditionVisualScanPageBoundCount: 0,
    scanPageVisualInspectionCompletedCount: 0,
    commonT6MethodContractEstablished: false,
    methodologyInputContractAuthoringAuthorized: false,
    currentCareerSemanticBridgeEstablished: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutableVisualScanConfirmationLaneCount: accepted ? 1 : 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: accepted
      ? 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION'
      : null,
    b56ChenZezhenHoldPreserved: accepted && b59.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION'
      : 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_PAGE_BINDING',
  });
}
