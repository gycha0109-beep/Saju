import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION,
  type I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport,
} from './i253-qianli-primary-witness-provenance-correction-evidence.js';

export const I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION =
  'myeonghwa-i254-qianli-season-plurality-primary-page-binding-hold-record-v1' as const;

export const I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_CONTROL_IDS = Object.freeze([
  'I254_CONSUMES_ONLY_THE_EXACT_CORRECTED_I253_PROVENANCE_BOUNDARY',
  'THE_1936_NLC_PRIMARY_WITNESS_REMAINS_THE_TARGET_WITNESS',
  'PRINTED_P14_REMAINS_DIRECTLY_INSPECTED_AND_PRIMARY_PAGE_BOUND',
  'THE_IMMEDIATE_CONTINUATION_PAGE_COULD_NOT_BE_DIRECTLY_RENDERED_DURING_REPEATED_PRIMARY_PDF_ATTEMPTS',
  'PUBLIC_TRANSCRIPTION_TEXT_FOR_BENQI_SHILING_DUOGUA_IS_LOCATOR_EVIDENCE_ONLY',
  'TRANSCRIPTION_OR_DERIVATIVE_MIRRORS_MAY_NOT_REPLACE_THE_MISSING_PRIMARY_PAGE',
  'THE_1934_NLC_VARIANT_IS_A_VARIANT_LEAD_NOT_A_SUBSTITUTE_WITHOUT_EXACT_PAGE_INSPECTION',
  'SEASON_AND_PLURALITY_REMAIN_UNAVAILABLE_AS_CORRECTED_PRIMARY_AUTHORITY',
  'THE_EXISTING_SEASONAL_CAREER_T8_DIMENSION_REMAINS_EXPLICITLY_UNCONSUMED',
  'THE_HOLD_DOES_NOT_INVALIDATE_THE_THREE_I253_PRIMARY_PAGE_BOUND_CLASSES_OR_THE_P49_CAREER_CANDIDATE',
  'NO_NUMERIC_WEIGHT_WINNER_DAMAGE_SETTLEMENT_OR_HISTORICAL_OCCUPATION_MODERNIZATION',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface I254QianliSeasonPluralityPrimaryPageBindingHoldRecord {
  holdId: string;
  holdVersion: typeof I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION;
  status:
    | 'RESOLVED_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD'
    | 'UPSTREAM_I253_BOUNDARY_INVALID';
  decision:
    | 'CORRECTED_1936_PRIMARY_CONTINUATION_PAGE_NOT_DIRECTLY_ACCESSIBLE_SEASON_PLURALITY_REMAIN_HELD_TRANSCRIPTION_LOCATOR_ONLY_CAREER_B23_MAY_CONTINUE_WITH_DIMENSION_EXCLUDED'
    | 'QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_NOT_ESTABLISHED';
  upstreamI253EvidenceId: string;
  exactI253BoundaryAccepted: boolean;
  targetWorkTitle: '韋千里命學講義';
  targetPublicationYear: 1936;
  targetNlcIdentity: 'nlc:data_416,01jh000368,10155';
  targetPrimaryPdfPageCount: 368;
  directlyReinspectedPrecedingPage: {
    pdfPageZeroBased: 300;
    pdfPageOneBased: 301;
    printedPage: '14';
    renderSucceeded: boolean;
    branchClashOpeningObserved: boolean;
  };
  continuationPageAttempt: {
    pdfPageZeroBased: 301;
    pdfPageOneBased: 302;
    renderSucceeded: false;
    failureClass: 'PRIMARY_PDF_PAGE_CACHE_MISS';
    repeatedAttempted: boolean;
  };
  neighboringPrimaryPageAttemptsAlsoUnavailable: boolean;
  transcriptionContinuationLocated: boolean;
  transcriptionTokensLocated: readonly ['本氣', '時令', '多寡'];
  transcriptionMayServeAsPrimaryEvidence: false;
  derivativeMirrorMayServeAsPrimaryEvidence: false;
  earlier1934VariantMetadataConfirmed: boolean;
  earlier1934VariantNlcIdentity: 'nlc:data_416,17jh007058,102955';
  earlier1934VariantExactTargetPageInspected: false;
  earlier1934VariantMaySubstituteAutomatically: false;
  seasonPluralityPrimaryPageBound: false;
  seasonPluralityCorrectedPrimaryAuthorityAvailable: false;
  seasonPluralityCarryForwardFromHistoricalI252Authorized: false;
  priorThreePrimaryBoundClassesPreserved: boolean;
  printedP49CareerCandidatePreserved: boolean;
  careerB23MayContinueWithSeasonPluralityExcluded: boolean;
  seasonalCareerT8DimensionConsumed: false;
  conditionalSeasonalRemediationActivated: false;
  universalHiddenStemInteractionAuthorized: false;
  numericSeasonWeightAuthorized: false;
  numericPluralityWeightAuthorized: false;
  winnerSettlementAuthorized: false;
  damageMagnitudeAuthorized: false;
  methodologyScopeExpansionAuthorized: false;
  t8RuleAuthoringAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    primaryPagesNewlyBound: 0;
    heldQuestionClasses: 1 | 0;
    authorityCandidatesAdmitted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  holdReleaseTrigger: string;
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE'
    | 'QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD';
}

function exactI253Accepted(i253: I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport): boolean {
  return (
    i253.evidenceVersion === I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION &&
    i253.status === 'RESOLVED_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE' &&
    i253.decision ===
      '1935_QIANLI_MINGGAO_PLUS_CTEXT_SAME_WORK_BINDING_SUPERSEDED_1936_MINGXUE_JIANGYI_PRIMARY_REBINDS_THREE_DIRECT_CLASSES_SEASON_PLURALITY_PAGE_BINDING_PENDING_CAREER_P49_CANDIDATE_RECORDED_NO_AUTHORITY_PROMOTION' &&
    i253.exactHistoricalI252BoundaryRecognized &&
    i253.prior1935QianliMinggaoScanPlusCtextSameWorkBindingValid === false &&
    i253.priorSameWorkAssertionSupersededForFutureAuthorityEvaluation &&
    i253.correctedWorkIdentityBound &&
    i253.correctedWorkTitle === '韋千里命學講義' &&
    i253.correctedPublicationYear === 1936 &&
    i253.correctedNlcIdentity === 'nlc:data_416,01jh000368,10155' &&
    i253.correctedPrimaryPdfPageCount === 368 &&
    i253.primaryPageBoundCoverageCount === 3 &&
    i253.primaryPageBindingPendingCoverageCount === 1 &&
    i253.visibleHiddenPrimaryBound &&
    i253.positionPrimaryBound &&
    i253.branchClashHiddenStemPrimaryBound &&
    i253.seasonPluralityPrimaryBound === false &&
    i253.priorI252FullFourClassAdequacyCurrentlyRevalidated === false &&
    i253.seasonPluralityQualifierMayBeReliedOnAsCorrectedPrimaryAuthority === false &&
    i253.printedP49CareerPassagePrimaryBound &&
    i253.familyRelationCareerCandidateDiscovered &&
    i253.familyRelationCareerAuthorityAdmitted === false &&
    i253.productionPromotionAuthorized === false &&
    i253.productionImpact === 'NONE' &&
    i253.recommendedNextGate ===
      'PUBLIC_CLASSIC_QIANLI_MINGXUE_JIANGYI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_EVIDENCE'
  );
}

function finalized(
  material: Omit<I254QianliSeasonPluralityPrimaryPageBindingHoldRecord, 'holdId'>,
): I254QianliSeasonPluralityPrimaryPageBindingHoldRecord {
  return {
    holdId: `i254_qianli_season_plurality_primary_page_binding_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(
  i253: I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport,
): I254QianliSeasonPluralityPrimaryPageBindingHoldRecord {
  const accepted = exactI253Accepted(i253);

  return finalized({
    holdVersion: I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION,
    status: accepted
      ? 'RESOLVED_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD'
      : 'UPSTREAM_I253_BOUNDARY_INVALID',
    decision: accepted
      ? 'CORRECTED_1936_PRIMARY_CONTINUATION_PAGE_NOT_DIRECTLY_ACCESSIBLE_SEASON_PLURALITY_REMAIN_HELD_TRANSCRIPTION_LOCATOR_ONLY_CAREER_B23_MAY_CONTINUE_WITH_DIMENSION_EXCLUDED'
      : 'QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_NOT_ESTABLISHED',
    upstreamI253EvidenceId: i253.evidenceId,
    exactI253BoundaryAccepted: accepted,
    targetWorkTitle: '韋千里命學講義',
    targetPublicationYear: 1936,
    targetNlcIdentity: 'nlc:data_416,01jh000368,10155',
    targetPrimaryPdfPageCount: 368,
    directlyReinspectedPrecedingPage: {
      pdfPageZeroBased: 300,
      pdfPageOneBased: 301,
      printedPage: '14',
      renderSucceeded: accepted,
      branchClashOpeningObserved: accepted,
    },
    continuationPageAttempt: {
      pdfPageZeroBased: 301,
      pdfPageOneBased: 302,
      renderSucceeded: false,
      failureClass: 'PRIMARY_PDF_PAGE_CACHE_MISS',
      repeatedAttempted: accepted,
    },
    neighboringPrimaryPageAttemptsAlsoUnavailable: accepted,
    transcriptionContinuationLocated: accepted,
    transcriptionTokensLocated: ['本氣', '時令', '多寡'],
    transcriptionMayServeAsPrimaryEvidence: false,
    derivativeMirrorMayServeAsPrimaryEvidence: false,
    earlier1934VariantMetadataConfirmed: accepted,
    earlier1934VariantNlcIdentity: 'nlc:data_416,17jh007058,102955',
    earlier1934VariantExactTargetPageInspected: false,
    earlier1934VariantMaySubstituteAutomatically: false,
    seasonPluralityPrimaryPageBound: false,
    seasonPluralityCorrectedPrimaryAuthorityAvailable: false,
    seasonPluralityCarryForwardFromHistoricalI252Authorized: false,
    priorThreePrimaryBoundClassesPreserved: accepted,
    printedP49CareerCandidatePreserved: accepted,
    careerB23MayContinueWithSeasonPluralityExcluded: accepted,
    seasonalCareerT8DimensionConsumed: false,
    conditionalSeasonalRemediationActivated: false,
    universalHiddenStemInteractionAuthorized: false,
    numericSeasonWeightAuthorized: false,
    numericPluralityWeightAuthorized: false,
    winnerSettlementAuthorized: false,
    damageMagnitudeAuthorized: false,
    methodologyScopeExpansionAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      primaryPagesNewlyBound: 0,
      heldQuestionClasses: accepted ? 1 : 0,
      authorityCandidatesAdmitted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    holdReleaseTrigger:
      'Release only after direct inspection of the exact continuation page in the corrected 1936 NLC witness or an exact corresponding page in a provenance-equivalent primary edition, with 本氣/時令/多寡 visible in page context.',
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE'
      : 'QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD',
  });
}
