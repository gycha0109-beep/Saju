import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TARGET_PASSAGE_SCAN_LOCALIZATION_VERSION,
  CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS,
  CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_RECORDS,
  type CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport,
} from './career-personalization-t8-classical-ziping-target-passage-scan-localization.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_VISUAL_SCAN_CONFIRMATION_HOLD_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-visual-scan-confirmation-hold-v1' as const;

export type CareerT8B61VisualAccessState =
  | 'EXACT_WITNESS_FILE_SURFACE_AVAILABLE_TARGET_PAGE_IMAGE_NOT_REPRODUCIBLY_INSPECTABLE'
  | 'EXACT_WITNESS_TARGET_TEXT_INDEXED_PAGE_ORDINAL_AND_IMAGE_NOT_REPRODUCIBLY_INSPECTABLE';

export interface CareerT8B61VisualAccessAttemptRecord {
  surfaceId:
    | 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT'
    | 'SHENFENG_TONGKAO_CONDITIONAL_CLASH'
    | 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH';
  exactWitnessFileIdentity: string;
  visualAccessState: CareerT8B61VisualAccessState;
  exactWitnessMetadataSurfaceAccessible: true;
  exactTargetTextLocalizedByB60: true;
  exactWitnessTargetBodyIndexed: boolean;
  exactWitnessTargetPageOrdinalKnown: false;
  exactWitnessTargetPageImageAcquired: false;
  exactWitnessTargetPageVisuallyInspected: false;
  sameFailedSurfaceRetryAuthorized: false;
  note: string;
}

export const CAREER_T8_B61_VISUAL_ACCESS_ATTEMPT_RECORDS = Object.freeze([
  Object.freeze({
    surfaceId: 'YUANHAI_ZIPING_ZHENGGUAN_CONTEXT' as const,
    exactWitnessFileIdentity: 'NCL-06593 刻京臺增補淵海子平大全.pdf',
    visualAccessState:
      'EXACT_WITNESS_FILE_SURFACE_AVAILABLE_TARGET_PAGE_IMAGE_NOT_REPRODUCIBLY_INSPECTABLE' as const,
    exactWitnessMetadataSurfaceAccessible: true,
    exactTargetTextLocalizedByB60: true,
    exactWitnessTargetBodyIndexed: false,
    exactWitnessTargetPageOrdinalKnown: false,
    exactWitnessTargetPageImageAcquired: false,
    exactWitnessTargetPageVisuallyInspected: false,
    sameFailedSurfaceRetryAuthorized: false,
    note:
      'The exact NCL rare-book witness is available as a 160-page 165.12 MB scan and B60 narrowed the same-work target to volume three plus an independent printed-page-15 anchor. No reproducible exact-witness target page ordinal or page image was obtained in this execution.',
  }),
  Object.freeze({
    surfaceId: 'SHENFENG_TONGKAO_CONDITIONAL_CLASH' as const,
    exactWitnessFileIdentity: 'NLC511-027032013013877-17378 銅版精印神峰通考命理正宗.pdf',
    visualAccessState:
      'EXACT_WITNESS_FILE_SURFACE_AVAILABLE_TARGET_PAGE_IMAGE_NOT_REPRODUCIBLY_INSPECTABLE' as const,
    exactWitnessMetadataSurfaceAccessible: true,
    exactTargetTextLocalizedByB60: true,
    exactWitnessTargetBodyIndexed: false,
    exactWitnessTargetPageOrdinalKnown: false,
    exactWitnessTargetPageImageAcquired: false,
    exactWitnessTargetPageVisuallyInspected: false,
    sameFailedSurfaceRetryAuthorized: false,
    note:
      'The exact 1936 220-page witness remains available. An independent 1929 NLC witness supplies the target text and printed-page-47 anchor, and its cover can be visually rendered, but target-range page fetches were not reproducibly available and cannot substitute for visual inspection of the B59 exact 1936 witness.',
  }),
  Object.freeze({
    surfaceId: 'DITIANSHUI_CHANWEI_ROOT_STRENGTH_CLASH' as const,
    exactWitnessFileIdentity: 'SSID-11335994 滴天髓闡微.pdf',
    visualAccessState:
      'EXACT_WITNESS_TARGET_TEXT_INDEXED_PAGE_ORDINAL_AND_IMAGE_NOT_REPRODUCIBLY_INSPECTABLE' as const,
    exactWitnessMetadataSurfaceAccessible: true,
    exactTargetTextLocalizedByB60: true,
    exactWitnessTargetBodyIndexed: true,
    exactWitnessTargetPageOrdinalKnown: false,
    exactWitnessTargetPageImageAcquired: false,
    exactWitnessTargetPageVisuallyInspected: false,
    sameFailedSurfaceRetryAuthorized: false,
    note:
      'The exact 1947 上海大東書局 witness is indexed to the target 地生天者，天衰怕沖 / 任氏 strength-root commentary. The indexed body still does not expose a reproducible scan-page ordinal or target page image in the current access surface, so visual confirmation remains open.',
  }),
] as const satisfies readonly CareerT8B61VisualAccessAttemptRecord[]);

export const CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS = Object.freeze([
  Object.freeze({
    triggerId: 'EXACT_B59_WITNESS_TARGET_PAGE_IMAGE_OR_PAGE_ORDINAL_BECOMES_DIRECTLY_INSPECTABLE' as const,
    satisfied: false as const,
    condition:
      'A B59 exact witness exposes a reproducible target scan-page ordinal and page image that can be directly visually inspected.',
  }),
  Object.freeze({
    triggerId: 'EXACT_B59_WITNESS_LOCAL_COPY_BECOMES_RENDERABLE' as const,
    satisfied: false as const,
    condition:
      'A local or connector-accessible copy of the exact B59 witness becomes available for deterministic PDF rendering and visual page inspection.',
  }),
  Object.freeze({
    triggerId: 'INSTITUTIONAL_SAME_EDITION_PAGE_LEVEL_WITNESS_BECOMES_ACCESSIBLE' as const,
    satisfied: false as const,
    condition:
      'The holding institution exposes a page-level image, split volume, or equivalent same-edition target-body witness that can be visually inspected without substituting another edition.',
  }),
] as const);

export const CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS = Object.freeze([
  'B61_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B60_LOCALIZATION_BOUNDARY',
  'B60_THREE_TARGET_TEXT_LOCALIZATIONS_ARE_PRESERVED_WITHOUT_PROMOTION',
  'VISUAL_CONFIRMATION_REQUIRES_THE_B59_EXACT_WITNESS_OR_A_VERIFIABLY_SAME_EDITION_PAGE_LEVEL_WITNESS',
  'INDEPENDENT_1929_SHENFENG_OR_OTHER_EDITION_VISUALS_MAY_NOT_SUBSTITUTE_FOR_THE_B59_1936_WITNESS',
  'INDEXED_TEXT_IS_NOT_VISUAL_SCAN_CONFIRMATION',
  'PRINTED_PAGE_ANCHORS_FROM_INDEPENDENT_WITNESSES_ARE_NOT_EXACT_WITNESS_SCAN_PAGE_ORDINALS',
  'ZERO_EXACT_WITNESS_TARGET_PAGE_IMAGES_ARE_CLAIMED_ACQUIRED',
  'ZERO_EXACT_WITNESS_TARGET_PAGES_ARE_CLAIMED_VISUALLY_INSPECTED',
  'REPEATED_RETRY_OF_THE_SAME_FAILED_VIEWER_OR_UNCHANGED_PAGE_FETCH_SURFACE_IS_NOT_AUTHORIZED',
  'REOPEN_REQUIRES_A_MATERIAL_PAGE_IMAGE_OR_LOCAL_RENDERABILITY_CHANGE',
  'NO_SOURCE_PASSAGE_INPUT_DIMENSION_OR_EFFECT_CLASS_IS_PROMOTED_BY_THIS_HOLD',
  'NO_COMMON_T6_METHOD_CONTRACT_OR_METHODOLOGY_INPUT_CONTRACT_IS_AUTHORIZED',
  'NO_FLAT_UNARY_CLASH_MODIFIER_UNIFORM_DAMAGE_EFFECT_NUMERIC_OFFSET_OR_MULTIPLIER_IS_AUTHORIZED',
  'B56_CHEN_ZEZHEN_HOLD_REMAINS_UNCHANGED',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport {
  holdId: string;
  holdVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_VISUAL_SCAN_CONFIRMATION_HOLD_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION_HOLD'
    | 'UPSTREAM_B60_BOUNDARY_INVALID';
  decision:
    | 'TARGET_TEXT_LOCALIZATION_PRESERVED_ZERO_EXACT_VISUAL_BINDINGS_PAGE_IMAGE_ACCESS_BLOCKED_REOPEN_ONLY_ON_MATERIAL_ACCESS_CHANGE'
    | 'VISUAL_SCAN_CONFIRMATION_HOLD_NOT_ESTABLISHED';
  upstreamB60LocalizationId: string;
  exactB60BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  visualAccessAttemptRecords: readonly CareerT8B61VisualAccessAttemptRecord[];
  visualAccessAttemptRecordCount: 3 | 0;
  exactWitnessTargetPageImageAcquiredCount: 0;
  exactWitnessTargetPageVisuallyInspectedCount: 0;
  targetPassageVisualConfirmationHoldActive: boolean;
  reopenTriggers: readonly (typeof CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS)[number][];
  reopenTriggerCount: 3 | 0;
  satisfiedReopenTriggerCount: 0;
  sameFailedSurfaceRetryAuthorized: false;
  broadClassicalSearchRestartAuthorized: false;
  commonT6MethodContractEstablished: false;
  methodologyInputContractAuthoringAuthorized: false;
  currentCareerSemanticBridgeEstablished: false;
  branchAuthorityTriggerActivationCount: 0;
  immediatelyExecutableVisualScanConfirmationLaneCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: null;
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
  controlIds: readonly (typeof CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_VISUAL_SCAN_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
    | 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION';
}

function exactB60Accepted(
  b60: CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport,
): boolean {
  const { localizationId, ...material } = b60;
  return (
    localizationId ===
      `career_personalization_t8_classical_ziping_target_passage_scan_localization_${deterministicContentHash(material).slice(0, 24)}` &&
    b60.localizationVersion === CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_TARGET_PASSAGE_SCAN_LOCALIZATION_VERSION &&
    b60.status === 'RESOLVED_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_SCAN_LOCALIZATION' &&
    b60.decision ===
      'THREE_TARGET_TEXTS_LOCALIZED_ONE_SAME_EDITION_INDEX_MATCH_TWO_INDEPENDENT_PRINTED_PAGE_ANCHORS_ZERO_VISUAL_BINDINGS_AUTHORITY_REMAINS_CLOSED' &&
    b60.exactB59BoundaryAccepted &&
    b60.domain === 'career' &&
    b60.temporalScope === 'natal' &&
    b60.statusClass === 'research' &&
    b60.localizationRecordCount === 3 &&
    deterministicContentHash(b60.localizationRecords) ===
      deterministicContentHash(CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_RECORDS) &&
    b60.exactTargetTextMatchedCount === 3 &&
    b60.sameEditionTargetBodyIndexedCount === 1 &&
    b60.independentPrintedPageAnchorCount === 2 &&
    b60.sameEditionVisualScanPageBoundCount === 0 &&
    b60.scanPageVisualInspectionCompletedCount === 0 &&
    b60.commonT6MethodContractEstablished === false &&
    b60.methodologyInputContractAuthoringAuthorized === false &&
    b60.currentCareerSemanticBridgeEstablished === false &&
    b60.branchAuthorityTriggerActivationCount === 0 &&
    b60.immediatelyExecutableVisualScanConfirmationLaneCount === 1 &&
    b60.selectedImmediateNextLane ===
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION' &&
    b60.b56ChenZezhenHoldPreserved &&
    b60.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b60.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b60.controlCount === 16 &&
    b60.controlsFrozen &&
    deterministicContentHash(b60.controlIds) ===
      deterministicContentHash(CAREER_T8_B60_TARGET_PASSAGE_LOCALIZATION_CONTROL_IDS) &&
    b60.productionImpact === 'NONE' &&
    b60.recommendedNextGate ===
      'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION'
  );
}

function holdEvidenceValid(): boolean {
  const records = CAREER_T8_B61_VISUAL_ACCESS_ATTEMPT_RECORDS;
  return (
    records.length === 3 &&
    records.every((record) => record.exactWitnessMetadataSurfaceAccessible) &&
    records.every((record) => record.exactTargetTextLocalizedByB60) &&
    records.filter((record) => record.exactWitnessTargetBodyIndexed).length === 1 &&
    records.every((record) => record.exactWitnessTargetPageOrdinalKnown === false) &&
    records.every((record) => record.exactWitnessTargetPageImageAcquired === false) &&
    records.every((record) => record.exactWitnessTargetPageVisuallyInspected === false) &&
    records.every((record) => record.sameFailedSurfaceRetryAuthorized === false) &&
    CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS.length === 3 &&
    CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS.every((trigger) => trigger.satisfied === false) &&
    CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS.length === 16
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport, 'holdId'>,
): CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport {
  return {
    holdId: `career_personalization_t8_classical_ziping_visual_scan_confirmation_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8ClassicalZipingVisualScanConfirmationHold(
  b60: CareerPersonalizationT8ClassicalZipingTargetPassageScanLocalizationReport,
): CareerPersonalizationT8ClassicalZipingVisualScanConfirmationHoldReport {
  const accepted = exactB60Accepted(b60) && holdEvidenceValid();

  return finalized({
    holdVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_VISUAL_SCAN_CONFIRMATION_HOLD_VERSION,
    status: accepted
      ? 'RESOLVED_CLASSICAL_ZIPING_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION_HOLD'
      : 'UPSTREAM_B60_BOUNDARY_INVALID',
    decision: accepted
      ? 'TARGET_TEXT_LOCALIZATION_PRESERVED_ZERO_EXACT_VISUAL_BINDINGS_PAGE_IMAGE_ACCESS_BLOCKED_REOPEN_ONLY_ON_MATERIAL_ACCESS_CHANGE'
      : 'VISUAL_SCAN_CONFIRMATION_HOLD_NOT_ESTABLISHED',
    upstreamB60LocalizationId: b60.localizationId,
    exactB60BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    visualAccessAttemptRecords: accepted ? CAREER_T8_B61_VISUAL_ACCESS_ATTEMPT_RECORDS : Object.freeze([]),
    visualAccessAttemptRecordCount: accepted ? 3 : 0,
    exactWitnessTargetPageImageAcquiredCount: 0,
    exactWitnessTargetPageVisuallyInspectedCount: 0,
    targetPassageVisualConfirmationHoldActive: accepted,
    reopenTriggers: accepted ? CAREER_T8_B61_VISUAL_SCAN_REOPEN_TRIGGERS : Object.freeze([]),
    reopenTriggerCount: accepted ? 3 : 0,
    satisfiedReopenTriggerCount: 0,
    sameFailedSurfaceRetryAuthorized: false,
    broadClassicalSearchRestartAuthorized: false,
    commonT6MethodContractEstablished: false,
    methodologyInputContractAuthoringAuthorized: false,
    currentCareerSemanticBridgeEstablished: false,
    branchAuthorityTriggerActivationCount: 0,
    immediatelyExecutableVisualScanConfirmationLaneCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    b56ChenZezhenHoldPreserved: accepted && b60.b56ChenZezhenHoldPreserved,
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
    controlIds: accepted ? CAREER_T8_B61_VISUAL_SCAN_CONFIRMATION_HOLD_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'BRANCH_CLASSICAL_ZIPING_VISUAL_SCAN_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
      : 'BRANCH_CLASSICAL_ZIPING_CONDITIONAL_CLASH_TARGET_PASSAGE_VISUAL_SCAN_CONFIRMATION',
  });
}
