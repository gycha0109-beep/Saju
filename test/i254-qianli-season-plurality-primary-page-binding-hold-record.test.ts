import { describe, expect, test } from 'vitest';
import type { I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport } from '../src/research/i249-multi-track-terminal-evidence-access-boundary-reconciliation-active-frontier-selection-review.js';
import { buildI250PublicClassicHiddenStemInteractionFrontierReadinessReview } from '../src/research/i250-public-classic-hidden-stem-interaction-frontier-readiness-review.js';
import { buildI251PublicClassicHiddenStemInteractionSourceEvidence } from '../src/research/i251-public-classic-hidden-stem-interaction-source-evidence.js';
import { buildI252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReview } from '../src/research/i252-public-classic-hidden-stem-interaction-evidence-adequacy-methodology-review.js';
import {
  type I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport,
  buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence,
} from '../src/research/i253-qianli-primary-witness-provenance-correction-evidence.js';
import {
  I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_CONTROL_IDS,
  I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION,
  buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord,
} from '../src/research/i254-qianli-season-plurality-primary-page-binding-hold-record.js';

function validI249(): I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport {
  return {
    reviewId: 'i249_valid_i254_fixture',
    status:
      'RESOLVED_MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW',
    decision:
      'NO_CURRENTLY_ACTIONABLE_EQUIVALENT_PUBLIC_OR_REPOSITORY_ONLY_AUTHORITY_REMEDIATION_FRONTIER_FOUR_TRACKS_TRIGGER_GATED_ONE_SUSPENDED_THREE_HOLD_NO_EXHAUSTION_NO_NEGATIVE_FINDING_NO_AUTHORITY_PROMOTION',
    allTerminalTrackBoundariesAccepted: true,
    actionableEquivalentPublicRemediationFrontierCount: 0,
    actionableRepositoryOnlyAuthorityFrontierCount: 0,
    authorityProgressViaEquivalentRepeatAvailable: false,
    authorityProgressViaRepositoryOnlyRepackagingAvailable: false,
    crossTrackEvidencePoolingAuthorized: false,
    crossTrackAuthorityLaunderingAuthorized: false,
    newStageCreationRequiresMateriallyNewEvidenceOrGenuinelyNewNonEquivalentMethodologicalFrontier: true,
    genuinelyNewNonEquivalentMethodologicalFrontierMayProceedUnderSeparateGate: true,
    hiddenStemI232HoldPreserved: true,
    hiddenStemTrackReopenedByThisGate: false,
    yudingSuijinluI248HoldPreserved: true,
    quWei2001HoldPreserved: true,
    candidateSetMutatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    productionPolicyExecutionAuthorized: false,
  } as unknown as I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport;
}

function acceptedI253(): I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport {
  const i250 = buildI250PublicClassicHiddenStemInteractionFrontierReadinessReview(validI249());
  const i251 = buildI251PublicClassicHiddenStemInteractionSourceEvidence(i250);
  const i252 = buildI252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReview(i251);
  return buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(i252);
}

describe('I254 Qianli season/plurality primary-page binding hold', () => {
  test('accepts only the exact corrected I253 provenance boundary', () => {
    const report = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(acceptedI253());

    expect(report.holdVersion).toBe(I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION);
    expect(report.status).toBe('RESOLVED_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD');
    expect(report.exactI253BoundaryAccepted).toBe(true);
    expect(report.targetWorkTitle).toBe('韋千里命學講義');
    expect(report.targetNlcIdentity).toBe('nlc:data_416,01jh000368,10155');
  });

  test('records the directly reinspected preceding p14 and the unavailable continuation page separately', () => {
    const report = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(acceptedI253());

    expect(report.directlyReinspectedPrecedingPage).toEqual({
      pdfPageZeroBased: 300,
      pdfPageOneBased: 301,
      printedPage: '14',
      renderSucceeded: true,
      branchClashOpeningObserved: true,
    });
    expect(report.continuationPageAttempt.pdfPageZeroBased).toBe(301);
    expect(report.continuationPageAttempt.pdfPageOneBased).toBe(302);
    expect(report.continuationPageAttempt.renderSucceeded).toBe(false);
    expect(report.continuationPageAttempt.failureClass).toBe('PRIMARY_PDF_PAGE_CACHE_MISS');
    expect(report.continuationPageAttempt.repeatedAttempted).toBe(true);
  });

  test('preserves transcription as locator evidence only', () => {
    const report = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(acceptedI253());

    expect(report.transcriptionContinuationLocated).toBe(true);
    expect(report.transcriptionTokensLocated).toEqual(['本氣', '時令', '多寡']);
    expect(report.transcriptionMayServeAsPrimaryEvidence).toBe(false);
    expect(report.derivativeMirrorMayServeAsPrimaryEvidence).toBe(false);
  });

  test('retains the 1934 NLC variant as a lead without substituting an uninspected page', () => {
    const report = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(acceptedI253());

    expect(report.earlier1934VariantMetadataConfirmed).toBe(true);
    expect(report.earlier1934VariantNlcIdentity).toBe('nlc:data_416,17jh007058,102955');
    expect(report.earlier1934VariantExactTargetPageInspected).toBe(false);
    expect(report.earlier1934VariantMaySubstituteAutomatically).toBe(false);
  });

  test('keeps season/plurality unavailable rather than carrying forward historical I252', () => {
    const report = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(acceptedI253());

    expect(report.seasonPluralityPrimaryPageBound).toBe(false);
    expect(report.seasonPluralityCorrectedPrimaryAuthorityAvailable).toBe(false);
    expect(report.seasonPluralityCarryForwardFromHistoricalI252Authorized).toBe(false);
    expect(report.implementationEffects.primaryPagesNewlyBound).toBe(0);
    expect(report.implementationEffects.heldQuestionClasses).toBe(1);
  });

  test('does not invalidate the three corrected p14 classes or the separate p49 Career candidate', () => {
    const report = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(acceptedI253());

    expect(report.priorThreePrimaryBoundClassesPreserved).toBe(true);
    expect(report.printedP49CareerCandidatePreserved).toBe(true);
  });

  test('allows B23 to continue only with season/plurality excluded from Career T8 consumption', () => {
    const report = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(acceptedI253());

    expect(report.careerB23MayContinueWithSeasonPluralityExcluded).toBe(true);
    expect(report.seasonalCareerT8DimensionConsumed).toBe(false);
    expect(report.conditionalSeasonalRemediationActivated).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE',
    );
  });

  test('keeps all strength, winner, damage and methodology-expansion semantics forbidden', () => {
    const report = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(acceptedI253());

    expect(report.universalHiddenStemInteractionAuthorized).toBe(false);
    expect(report.numericSeasonWeightAuthorized).toBe(false);
    expect(report.numericPluralityWeightAuthorized).toBe(false);
    expect(report.winnerSettlementAuthorized).toBe(false);
    expect(report.damageMagnitudeAuthorized).toBe(false);
    expect(report.methodologyScopeExpansionAuthorized).toBe(false);
  });

  test('creates no T8, narrative, preview or production artifacts', () => {
    const report = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(acceptedI253());

    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.controlIds).toEqual(I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_CONTROL_IDS);
  });

  test('fails closed on tampered I253 input and remains deterministic for exact input', () => {
    const valid = acceptedI253();
    const tampered = {
      ...valid,
      seasonPluralityPrimaryBound: true,
    } as unknown as I253QianliPrimaryWitnessProvenanceCorrectionEvidenceReport;

    const rejected = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(tampered);
    const first = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(valid);
    const second = buildI254QianliSeasonPluralityPrimaryPageBindingHoldRecord(valid);

    expect(rejected.status).toBe('UPSTREAM_I253_BOUNDARY_INVALID');
    expect(rejected.exactI253BoundaryAccepted).toBe(false);
    expect(rejected.priorThreePrimaryBoundClassesPreserved).toBe(false);
    expect(rejected.careerB23MayContinueWithSeasonPluralityExcluded).toBe(false);
    expect(first.holdId).toBe(second.holdId);
  });
});
