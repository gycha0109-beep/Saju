import { describe, expect, test } from 'vitest';
import type { I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport } from '../src/research/i249-multi-track-terminal-evidence-access-boundary-reconciliation-active-frontier-selection-review.js';
import { buildI250PublicClassicHiddenStemInteractionFrontierReadinessReview } from '../src/research/i250-public-classic-hidden-stem-interaction-frontier-readiness-review.js';
import { buildI251PublicClassicHiddenStemInteractionSourceEvidence } from '../src/research/i251-public-classic-hidden-stem-interaction-source-evidence.js';
import {
  type I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport,
  buildI252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReview,
} from '../src/research/i252-public-classic-hidden-stem-interaction-evidence-adequacy-methodology-review.js';
import {
  I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_CONTROL_IDS,
  I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION,
  buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence,
} from '../src/research/i253-qianli-primary-witness-provenance-correction-evidence.js';

function validI249(): I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport {
  return {
    reviewId: 'i249_valid_i253_fixture',
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

function acceptedI252(): I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport {
  const i250 = buildI250PublicClassicHiddenStemInteractionFrontierReadinessReview(validI249());
  const i251 = buildI251PublicClassicHiddenStemInteractionSourceEvidence(i250);
  return buildI252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReview(i251);
}

describe('I253 Qianli primary-witness provenance correction evidence', () => {
  test('accepts the exact historical I252 boundary and records an audit-preserving correction', () => {
    const report = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(acceptedI252());

    expect(report.evidenceVersion).toBe(I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION);
    expect(report.status).toBe('RESOLVED_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE');
    expect(report.exactHistoricalI252BoundaryRecognized).toBe(true);
    expect(report.historicalI251I252PreservedAsAuditRecords).toBe(true);
    expect(report.implementationEffects.historicalArtifactsRewritten).toBe(0);
  });

  test('supersedes the false 1935 Qianli Minggao plus CText same-work assertion without erasing the 1935 witness', () => {
    const report = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(acceptedI252());

    expect(report.prior1935QianliMinggaoScanPlusCtextSameWorkBindingValid).toBe(false);
    expect(report.priorSameWorkAssertionSupersededForFutureAuthorityEvaluation).toBe(true);
    expect(report.provenanceLaunderingPrevented).toBe(true);
    expect(report.distinct1935QianliMinggaoWorkRetainedAsSeparateWitness).toBe(true);
    expect(report.distinct1935QianliMinggaoNlcIdentity).toBe('nlc:data_416,01jh000372,10197');
  });

  test('binds the corrected theoretical primary work to the exact 1936 NLC witness', () => {
    const report = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(acceptedI252());

    expect(report.correctedWorkIdentityBound).toBe(true);
    expect(report.correctedWorkTitle).toBe('韋千里命學講義');
    expect(report.correctedAuthor).toBe('韋千里');
    expect(report.correctedPublisher).toBe('韋氏命苑');
    expect(report.correctedPublicationYear).toBe(1936);
    expect(report.correctedNlcIdentity).toBe('nlc:data_416,01jh000368,10155');
    expect(report.correctedPrimaryPdfPageCount).toBe(368);
    expect(report.earlier1934NlcVariantRetainedForVariantComparison).toBe(true);
  });

  test('revalidates the visible-hidden distinction from printed p14 of the corrected primary witness', () => {
    const report = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(acceptedI252());
    const item = report.correctedCoverageRecords.find(
      (record) => record.questionId === 'VISIBLE_HIDDEN_MANIFESTATION_DISTINCTION',
    );

    expect(item?.coverage).toBe('PRIMARY_PAGE_BOUND');
    expect(item?.printedPage).toBe('14');
    expect(item?.pdfPageOneBased).toBe(301);
    expect(item?.directPrimaryTextObserved).toBe(true);
    expect(report.visibleHiddenPrimaryBound).toBe(true);
  });

  test('revalidates position/separation from the same printed p14 without numeric distance semantics', () => {
    const report = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(acceptedI252());
    const item = report.correctedCoverageRecords.find(
      (record) => record.questionId === 'POSITION_OR_SEPARATION_QUALIFIER',
    );

    expect(item?.coverage).toBe('PRIMARY_PAGE_BOUND');
    expect(item?.printedPage).toBe('14');
    expect(report.positionPrimaryBound).toBe(true);
    expect(report.numericWeightingAuthorized).toBe(false);
  });

  test('revalidates explicit relation-local branch-clash hidden-stem interaction from printed p14 only', () => {
    const report = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(acceptedI252());
    const item = report.correctedCoverageRecords.find(
      (record) => record.questionId === 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION',
    );

    expect(item?.coverage).toBe('PRIMARY_PAGE_BOUND');
    expect(item?.printedPage).toBe('14');
    expect(report.branchClashHiddenStemPrimaryBound).toBe(true);
    expect(report.universalHiddenStemInteractionAuthorized).toBe(false);
    expect(report.arbitraryHiddenStemCoPresenceInteractionAuthorized).toBe(false);
  });

  test('fails closed on season/plurality until the continuation page itself is primary-page bound', () => {
    const report = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(acceptedI252());
    const item = report.correctedCoverageRecords.find(
      (record) => record.questionId === 'SEASON_OR_PLURALITY_QUALIFIER',
    );

    expect(item?.coverage).toBe('PRIMARY_PAGE_BINDING_PENDING');
    expect(item?.printedPage).toBeNull();
    expect(item?.directPrimaryTextObserved).toBe(false);
    expect(report.primaryPageBoundCoverageCount).toBe(3);
    expect(report.primaryPageBindingPendingCoverageCount).toBe(1);
    expect(report.seasonPluralityPrimaryBound).toBe(false);
    expect(report.priorI252FullFourClassAdequacyCurrentlyRevalidated).toBe(false);
    expect(report.seasonPluralityQualifierMayBeReliedOnAsCorrectedPrimaryAuthority).toBe(false);
    expect(report.transcriptionMayReplaceMissingPrimaryPage).toBe(false);
  });

  test('records printed p49 Career relations as a candidate only and forbids modernization or gap closure', () => {
    const report = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(acceptedI252());

    expect(report.printedP49CareerPassagePrimaryBound).toBe(true);
    expect(report.familyRelationCareerCandidateDiscovered).toBe(true);
    expect(report.careerCandidate?.section).toBe('事業');
    expect(report.careerCandidate?.printedPage).toBe('49');
    expect(report.careerCandidate?.pdfPageOneBased).toBe(336);
    expect(report.careerCandidate?.namedTenGodRelationCareerBindingObserved).toBe(true);
    expect(report.careerCandidate?.historicalOccupationModernizationAuthorized).toBe(false);
    expect(report.familyRelationCareerAuthorityAdmitted).toBe(false);
    expect(report.familyRelationCareerGapClosed).toBe(false);
  });

  test('creates no methodology expansion, Sohu rebinding, T8, narrative, or production authority', () => {
    const report = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(acceptedI252());

    expect(report.i232SohuTrackReopened).toBe(false);
    expect(report.i232ProvenanceGapClosed).toBe(false);
    expect(report.damageMagnitudeAuthorized).toBe(false);
    expect(report.winnerSettlementAuthorized).toBe(false);
    expect(report.methodologyScopeExpansionAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.controlIds).toEqual(I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_CONTROL_IDS);
  });

  test('fails closed on a tampered historical I252 boundary and is deterministic for exact input', () => {
    const valid = acceptedI252();
    const tampered = {
      ...valid,
      boundedResearchMethodologyCandidateMayProceed: false,
    } as unknown as I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport;

    const rejected = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(tampered);
    const first = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(valid);
    const second = buildI253QianliPrimaryWitnessProvenanceCorrectionEvidence(valid);

    expect(rejected.status).toBe('HISTORICAL_I252_BOUNDARY_INVALID');
    expect(rejected.correctedWorkIdentityBound).toBe(false);
    expect(rejected.correctedCoverageRecordCount).toBe(0);
    expect(rejected.careerCandidate).toBeNull();
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.recommendedNextGate).toBe(
      'PUBLIC_CLASSIC_QIANLI_MINGXUE_JIANGYI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_EVIDENCE',
    );
  });
});
