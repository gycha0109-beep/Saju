import { validateFaceAuthorityRegistry } from './validation.js';
import {
  FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
  FACE_FR3_METHOD_REFS_V0,
} from './five-officers-six-fus-research-v0.js';
import {
  validateFiveOfficerMouthDirectSourcePageVerificationFR104,
  type FiveOfficerMouthDirectSourcePageVerificationFR104V1,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

const TARGET_METHOD_REF = FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers;
const TARGET_SOURCE_REFS = Object.freeze([
  'passage.shenxiang.five_officers.mapping',
  'passage.shenxiang.five_officers.listening',
  'passage.shenxiang.five_officers.longevity',
  'passage.shenxiang.five_officers.inspection',
  'passage.shenxiang.five_officers.discernment',
  'passage.shenxiang.five_officers.intake',
] as const);
const INTAKE_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const CTEXT_WITNESS = 'witness.shenxiang_quanbian.ctext' as const;
const NLC_WITNESS = 'witness.shenxiang_quanbian.nlc_1925' as const;

export interface FiveOfficerMethodologySourceSlotFR105V1 {
  readonly passageRef: string;
  readonly beforeWitnessId: string;
  readonly beforeVerificationStatus: 'unverified_ocr';
  readonly afterWitnessId: string;
  readonly afterVerificationStatus: 'unverified_ocr' | 'scan_checked';
  readonly authorityRebound: boolean;
}

export interface FiveOfficerMethodologySourceRebindReviewFR105V1 {
  readonly schemaVersion: 'fr105-five-officers-methodology-source-rebind-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'intake_source_scan_checked_rebound_methodology_research_only';
  readonly upstream: {
    readonly fr104SchemaVersion: 'fr104-five-officers-mouth-direct-source-page-verification-v1';
    readonly fr104AuthorityState: 'single_checker_scan_checked_passage_issued_in_governed_extension';
    readonly verifiedSourcePassagesIssued: 1;
    readonly passageScanCheckedPromotionAuthorized: true;
    readonly doubleCheckedPromotionAuthorized: false;
    readonly methodologyProductionPromotionAuthorized: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly targetMethodology: {
    readonly methodologyRef: 'method.shenxiang.five_officers@0.1.0';
    readonly methodologyId: 'method.shenxiang.five_officers';
    readonly methodologyVersion: '0.1.0';
    readonly traditionalTerm: '五官';
    readonly reviewStatusBefore: 'research';
    readonly reviewStatusAfter: 'research';
    readonly sourceRefCount: 6;
    readonly sourceRefsChanged: false;
    readonly historicalRegistryMutated: false;
  };
  readonly sourceAuthorityOverlay: {
    readonly overlayRef: 'source-authority-overlay.shenxiang.five_officers.intake@0.1.0';
    readonly mode: 'same_passage_id_witness_authority_rebind';
    readonly passageRef: 'passage.shenxiang.five_officers.intake';
    readonly previousWitnessId: 'witness.shenxiang_quanbian.ctext';
    readonly previousVerificationStatus: 'unverified_ocr';
    readonly reboundWitnessId: 'witness.shenxiang_quanbian.nlc_1925';
    readonly reboundVerificationStatus: 'scan_checked';
    readonly exactScanPage: 88;
    readonly originalTextExactMatch: true;
    readonly singleCheckerOnly: true;
  };
  readonly sourceSlots: readonly FiveOfficerMethodologySourceSlotFR105V1[];
  readonly sourceSlotCount: 6;
  readonly scanCheckedSourceCountBefore: 0;
  readonly scanCheckedSourceCountAfter: 1;
  readonly unresolvedSourceSlotCountAfter: 5;
  readonly intakeSourceAuthorityRebindAuthorized: true;
  readonly methodologySourceAuthorityOverlayIssued: 1;
  readonly methodologyRegistryMutationAuthorized: false;
  readonly methodologyReviewPromotionAuthorized: false;
  readonly methodologyExecutionIssued: false;
  readonly methodologyProductionPromotionAuthorized: false;
  readonly metricBindingsIssued: 0;
  readonly thresholdsIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalFormationAuthorized: false;
  readonly traditionalSemanticAuthority: false;
  readonly authorityBoundary: {
    readonly oneScanCheckedSlotMeansMethodologyReviewed: false;
    readonly sourceRebindMeansMethodologyExecution: false;
    readonly scanCheckedTextMeansMetricBinding: false;
    readonly scanCheckedTextMeansNumericThreshold: false;
    readonly intakeSourceAuthorityMeansTraditionalCriterionState: false;
    readonly intakeSourceAuthorityMeansTraditionalFormation: false;
    readonly intakeSourceAuthorityMeansTraditionalSemantics: false;
    readonly partialOverlayMeansHistoricalRegistryMutation: false;
  };
  readonly remainingBlockers: readonly [
    'five_officers_remaining_source_slots_unverified',
    'five_officers_methodology_research_only',
    'intake_metric_to_source_concept_mapping_not_authorized',
    'intake_calibration_and_thresholds_not_authorized',
    'fr64_methodology_execution_and_claim_gates_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'one_scan_checked_source_to_methodology_reviewed',
    'source_rebind_to_methodology_execution',
    'scan_checked_text_to_metric_binding',
    'scan_checked_text_to_numeric_threshold',
    'intake_source_authority_to_traditional_criterion_state',
    'intake_source_authority_to_traditional_formation',
    'intake_source_authority_to_traditional_semantics',
    'partial_overlay_to_historical_registry_mutation',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'five_officers_remaining_source_slots_unverified',
  'five_officers_methodology_research_only',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'one_scan_checked_source_to_methodology_reviewed',
  'source_rebind_to_methodology_execution',
  'scan_checked_text_to_metric_binding',
  'scan_checked_text_to_numeric_threshold',
  'intake_source_authority_to_traditional_criterion_state',
  'intake_source_authority_to_traditional_formation',
  'intake_source_authority_to_traditional_semantics',
  'partial_overlay_to_historical_registry_mutation',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-105 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateHistoricalMethodology(): {
  readonly sourceSlots: readonly FiveOfficerMethodologySourceSlotFR105V1[];
  readonly intakeOriginalText: string;
} {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0);

  const methodology = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies.find(
    (candidate) => `${candidate.methodologyId}@${candidate.version}` === TARGET_METHOD_REF,
  );
  if (
    methodology === undefined ||
    methodology.methodologyId !== 'method.shenxiang.five_officers' ||
    methodology.version !== '0.1.0' ||
    methodology.traditionalTerm !== '五官' ||
    methodology.scope !== 'static_face' ||
    methodology.reviewStatus !== 'research' ||
    !sameSequence(methodology.sourceRefs, TARGET_SOURCE_REFS)
  ) {
    fail('historical Shenxiang Five Officers methodology drift.');
  }

  const passageById = new Map(
    FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.map((passage) => [passage.passageId, passage] as const),
  );
  const sourceSlots = methodology.sourceRefs.map((passageRef): FiveOfficerMethodologySourceSlotFR105V1 => {
    const passage = passageById.get(passageRef);
    if (
      passage === undefined ||
      passage.witnessId !== CTEXT_WITNESS ||
      passage.verificationStatus !== 'unverified_ocr'
    ) {
      fail(`historical methodology source slot changed and requires re-review: ${passageRef}.`);
    }
    const isIntake = passageRef === INTAKE_PASSAGE_REF;
    return Object.freeze({
      passageRef,
      beforeWitnessId: passage.witnessId,
      beforeVerificationStatus: 'unverified_ocr' as const,
      afterWitnessId: isIntake ? NLC_WITNESS : passage.witnessId,
      afterVerificationStatus: isIntake ? 'scan_checked' as const : 'unverified_ocr' as const,
      authorityRebound: isIntake,
    });
  });
  const intake = passageById.get(INTAKE_PASSAGE_REF);
  if (intake === undefined) fail('historical intake passage is absent.');
  return Object.freeze({ sourceSlots: Object.freeze(sourceSlots), intakeOriginalText: intake.originalText });
}

function validateUpstream(source: FiveOfficerMouthDirectSourcePageVerificationFR104V1): void {
  validateFiveOfficerMouthDirectSourcePageVerificationFR104(source);
  if (
    source.schemaVersion !== 'fr104-five-officers-mouth-direct-source-page-verification-v1' ||
    source.authorityState !== 'single_checker_scan_checked_passage_issued_in_governed_extension' ||
    source.materializedPassage.passageId !== INTAKE_PASSAGE_REF ||
    source.materializedPassage.witnessId !== NLC_WITNESS ||
    source.materializedPassage.scanPage !== 88 ||
    source.materializedPassage.verificationStatus !== 'scan_checked' ||
    source.pageVerification.checkerRefs.length !== 1 ||
    source.verifiedSourcePassagesIssued !== 1 ||
    source.passageScanCheckedPromotionAuthorized !== true ||
    source.doubleCheckedPromotionAuthorized !== false ||
    source.methodologyProductionPromotionAuthorized !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalSemanticAuthority !== false
  ) {
    fail('FR-104 upstream source authority drift.');
  }
}

export function reviewFiveOfficerMethodologySourceRebindFR105(
  source: FiveOfficerMouthDirectSourcePageVerificationFR104V1,
): FiveOfficerMethodologySourceRebindReviewFR105V1 {
  validateUpstream(source);
  const historical = validateHistoricalMethodology();
  if (historical.intakeOriginalText !== source.materializedPassage.originalText) {
    fail('scan-checked intake text does not exactly match the historical methodology intake text.');
  }
  const scanCheckedAfter = historical.sourceSlots.filter(
    (slot) => slot.afterVerificationStatus === 'scan_checked',
  ).length;
  const reboundSlots = historical.sourceSlots.filter((slot) => slot.authorityRebound);
  if (
    historical.sourceSlots.length !== 6 ||
    scanCheckedAfter !== 1 ||
    reboundSlots.length !== 1 ||
    reboundSlots[0]?.passageRef !== INTAKE_PASSAGE_REF
  ) {
    fail('partial source-authority overlay cardinality drift.');
  }

  return Object.freeze({
    schemaVersion: 'fr105-five-officers-methodology-source-rebind-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'intake_source_scan_checked_rebound_methodology_research_only' as const,
    upstream: Object.freeze({
      fr104SchemaVersion: source.schemaVersion,
      fr104AuthorityState: source.authorityState,
      verifiedSourcePassagesIssued: source.verifiedSourcePassagesIssued,
      passageScanCheckedPromotionAuthorized: source.passageScanCheckedPromotionAuthorized,
      doubleCheckedPromotionAuthorized: source.doubleCheckedPromotionAuthorized,
      methodologyProductionPromotionAuthorized: source.methodologyProductionPromotionAuthorized,
      criterionStatesIssued: source.criterionStatesIssued,
      claimsIssued: source.claimsIssued,
      traditionalSemanticAuthority: source.traditionalSemanticAuthority,
    }),
    targetMethodology: Object.freeze({
      methodologyRef: 'method.shenxiang.five_officers@0.1.0' as const,
      methodologyId: 'method.shenxiang.five_officers' as const,
      methodologyVersion: '0.1.0' as const,
      traditionalTerm: '五官' as const,
      reviewStatusBefore: 'research' as const,
      reviewStatusAfter: 'research' as const,
      sourceRefCount: 6 as const,
      sourceRefsChanged: false as const,
      historicalRegistryMutated: false as const,
    }),
    sourceAuthorityOverlay: Object.freeze({
      overlayRef: 'source-authority-overlay.shenxiang.five_officers.intake@0.1.0' as const,
      mode: 'same_passage_id_witness_authority_rebind' as const,
      passageRef: INTAKE_PASSAGE_REF,
      previousWitnessId: CTEXT_WITNESS,
      previousVerificationStatus: 'unverified_ocr' as const,
      reboundWitnessId: NLC_WITNESS,
      reboundVerificationStatus: 'scan_checked' as const,
      exactScanPage: 88 as const,
      originalTextExactMatch: true as const,
      singleCheckerOnly: true as const,
    }),
    sourceSlots: historical.sourceSlots,
    sourceSlotCount: 6 as const,
    scanCheckedSourceCountBefore: 0 as const,
    scanCheckedSourceCountAfter: 1 as const,
    unresolvedSourceSlotCountAfter: 5 as const,
    intakeSourceAuthorityRebindAuthorized: true as const,
    methodologySourceAuthorityOverlayIssued: 1 as const,
    methodologyRegistryMutationAuthorized: false as const,
    methodologyReviewPromotionAuthorized: false as const,
    methodologyExecutionIssued: false as const,
    methodologyProductionPromotionAuthorized: false as const,
    metricBindingsIssued: 0 as const,
    thresholdsIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalFormationAuthorized: false as const,
    traditionalSemanticAuthority: false as const,
    authorityBoundary: Object.freeze({
      oneScanCheckedSlotMeansMethodologyReviewed: false as const,
      sourceRebindMeansMethodologyExecution: false as const,
      scanCheckedTextMeansMetricBinding: false as const,
      scanCheckedTextMeansNumericThreshold: false as const,
      intakeSourceAuthorityMeansTraditionalCriterionState: false as const,
      intakeSourceAuthorityMeansTraditionalFormation: false as const,
      intakeSourceAuthorityMeansTraditionalSemantics: false as const,
      partialOverlayMeansHistoricalRegistryMutation: false as const,
    }),
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerMethodologySourceRebindReviewFR105(
  source: FiveOfficerMethodologySourceRebindReviewFR105V1,
): FiveOfficerMethodologySourceRebindReviewFR105V1 {
  if (
    source.schemaVersion !== 'fr105-five-officers-methodology-source-rebind-review-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'intake_source_scan_checked_rebound_methodology_research_only'
  ) fail('schema or authority state drift.');
  if (
    source.upstream.fr104SchemaVersion !== 'fr104-five-officers-mouth-direct-source-page-verification-v1' ||
    source.upstream.fr104AuthorityState !== 'single_checker_scan_checked_passage_issued_in_governed_extension' ||
    source.upstream.verifiedSourcePassagesIssued !== 1 ||
    source.upstream.passageScanCheckedPromotionAuthorized !== true ||
    source.upstream.doubleCheckedPromotionAuthorized !== false ||
    source.upstream.methodologyProductionPromotionAuthorized !== false ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) fail('FR-104 upstream authority widened.');
  if (
    source.targetMethodology.methodologyRef !== TARGET_METHOD_REF ||
    source.targetMethodology.methodologyId !== 'method.shenxiang.five_officers' ||
    source.targetMethodology.methodologyVersion !== '0.1.0' ||
    source.targetMethodology.traditionalTerm !== '五官' ||
    source.targetMethodology.reviewStatusBefore !== 'research' ||
    source.targetMethodology.reviewStatusAfter !== 'research' ||
    source.targetMethodology.sourceRefCount !== 6 ||
    source.targetMethodology.sourceRefsChanged !== false ||
    source.targetMethodology.historicalRegistryMutated !== false
  ) fail('target methodology authority drift.');
  if (
    source.sourceAuthorityOverlay.overlayRef !== 'source-authority-overlay.shenxiang.five_officers.intake@0.1.0' ||
    source.sourceAuthorityOverlay.mode !== 'same_passage_id_witness_authority_rebind' ||
    source.sourceAuthorityOverlay.passageRef !== INTAKE_PASSAGE_REF ||
    source.sourceAuthorityOverlay.previousWitnessId !== CTEXT_WITNESS ||
    source.sourceAuthorityOverlay.previousVerificationStatus !== 'unverified_ocr' ||
    source.sourceAuthorityOverlay.reboundWitnessId !== NLC_WITNESS ||
    source.sourceAuthorityOverlay.reboundVerificationStatus !== 'scan_checked' ||
    source.sourceAuthorityOverlay.exactScanPage !== 88 ||
    source.sourceAuthorityOverlay.originalTextExactMatch !== true ||
    source.sourceAuthorityOverlay.singleCheckerOnly !== true
  ) fail('source authority overlay drift.');
  if (
    source.sourceSlots.length !== 6 ||
    !sameSequence(source.sourceSlots.map((slot) => slot.passageRef), TARGET_SOURCE_REFS) ||
    source.sourceSlots.filter((slot) => slot.authorityRebound).length !== 1 ||
    source.sourceSlots.filter((slot) => slot.afterVerificationStatus === 'scan_checked').length !== 1 ||
    source.sourceSlots.find((slot) => slot.authorityRebound)?.passageRef !== INTAKE_PASSAGE_REF
  ) fail('source slot snapshot drift.');
  if (
    source.sourceSlotCount !== 6 ||
    source.scanCheckedSourceCountBefore !== 0 ||
    source.scanCheckedSourceCountAfter !== 1 ||
    source.unresolvedSourceSlotCountAfter !== 5 ||
    source.intakeSourceAuthorityRebindAuthorized !== true ||
    source.methodologySourceAuthorityOverlayIssued !== 1 ||
    source.methodologyRegistryMutationAuthorized !== false ||
    source.methodologyReviewPromotionAuthorized !== false ||
    source.methodologyExecutionIssued !== false ||
    source.methodologyProductionPromotionAuthorized !== false ||
    source.metricBindingsIssued !== 0 ||
    source.thresholdsIssued !== 0 ||
    source.morphologyProduced !== false ||
    source.criterionStatesIssued !== 0 ||
    source.claimsIssued !== 0 ||
    source.traditionalFormationAuthorized !== false ||
    source.traditionalSemanticAuthority !== false
  ) fail('authority widened.');
  if (!Object.values(source.authorityBoundary).every((value) => value === false)) {
    fail('authority boundary must remain fully fail-closed.');
  }
  if (!sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS)) fail('remaining blockers drift.');
  if (!sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)) fail('prohibited shortcuts drift.');
  return source;
}
