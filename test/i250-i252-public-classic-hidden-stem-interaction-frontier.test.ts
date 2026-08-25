import { describe, expect, it } from 'vitest';
import type { I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport } from '../src/research/i249-multi-track-terminal-evidence-access-boundary-reconciliation-active-frontier-selection-review.js';
import {
  I250_FRONTIER_CONTROL_IDS,
  I250_RESEARCH_QUESTION_IDS,
  I250_SOURCE_TARGET_IDS,
  buildI250PublicClassicHiddenStemInteractionFrontierReadinessReview,
} from '../src/research/i250-public-classic-hidden-stem-interaction-frontier-readiness-review.js';
import { buildI251PublicClassicHiddenStemInteractionSourceEvidence } from '../src/research/i251-public-classic-hidden-stem-interaction-source-evidence.js';
import {
  I252_REQUIREMENT_IDS,
  buildI252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReview,
} from '../src/research/i252-public-classic-hidden-stem-interaction-evidence-adequacy-methodology-review.js';

function validI249(): I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport {
  return {
    reviewId: 'i249_valid',
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

function validChain() {
  const i250 = buildI250PublicClassicHiddenStemInteractionFrontierReadinessReview(validI249());
  const i251 = buildI251PublicClassicHiddenStemInteractionSourceEvidence(i250);
  const i252 = buildI252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReview(i251);
  return { i250, i251, i252 };
}

describe('I250-I252 public classic hidden-stem interaction frontier', () => {
  it('opens a genuinely new non-equivalent frontier without reopening any terminal hold', () => {
    const { i250 } = validChain();
    expect(i250.status).toBe('RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW');
    expect(i250.frontierClass).toBe('GENUINELY_NEW_NON_EQUIVALENT_METHODOLOGICAL_FRONTIER');
    expect(i250.sourceTargetIds).toEqual(I250_SOURCE_TARGET_IDS);
    expect(i250.researchQuestionIds).toEqual(I250_RESEARCH_QUESTION_IDS);
    expect(i250.frontierControlIds).toEqual(I250_FRONTIER_CONTROL_IDS);
    expect(i250.i232SohuTrackReopened).toBe(false);
    expect(i250.i248YudingTrackMutated).toBe(false);
    expect(i250.i211QuWeiTrackMutated).toBe(false);
  });

  it('fails closed when the I249 terminal boundary is not accepted', () => {
    const bad = { ...validI249(), genuinelyNewNonEquivalentMethodologicalFrontierMayProceedUnderSeparateGate: false };
    const report = buildI250PublicClassicHiddenStemInteractionFrontierReadinessReview(bad);
    expect(report.status).toBe('I249_TERMINAL_BOUNDARY_INVALID');
    expect(report.sourceTargetCount).toBe(0);
    expect(report.sourceAcquisitionMayProceed).toBe(false);
  });

  it('records Qianli scan identity and direct transcription as one authority family', () => {
    const { i251 } = validChain();
    expect(i251.status).toBe('RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE');
    expect(i251.sourceRecordCount).toBe(6);
    expect(i251.independentWorkFamilyCount).toBe(4);
    expect(i251.sameWorkScanAndTranscriptionDoubleCounted).toBe(false);
    const qianli = i251.sourceRecords.filter((record) => record.sameWorkFamilyId === 'QIANLI_MINGGAO');
    expect(qianli).toHaveLength(3);
    expect(qianli.reduce((sum, record) => sum + record.independentAuthorityCountContribution, 0)).toBe(1);
  });

  it('accepts only four directly observed bounded question classes and leaves two expansion targets open', () => {
    const { i251 } = validChain();
    expect(i251.directCoverageCount).toBe(4);
    expect(i251.targetedNotYetBoundCount).toBe(2);
    expect(i251.coverageRecords.filter((record) => record.coverage === 'DIRECT').map((record) => record.questionId)).toEqual([
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION',
      'VISIBLE_HIDDEN_MANIFESTATION_DISTINCTION',
      'POSITION_OR_SEPARATION_QUALIFIER',
      'SEASON_OR_PLURALITY_QUALIFIER',
    ]);
  });

  it('does not pretend that public NLC identity automatically gives exact-page binding', () => {
    const { i251 } = validChain();
    expect(i251.qianliPublicationIdentityBound).toBe(true);
    expect(i251.qianliDirectRuleTextObserved).toBe(true);
    expect(i251.qianliExactNlcPageBound).toBe(false);
    expect(i251.shenfengExactRulePageBound).toBe(false);
    expect(i251.jingxuanRestrictivePassagePageBound).toBe(false);
    expect(i251.zipingManifestationPassagePageBound).toBe(false);
  });

  it('finds the bounded Qianli frontier adequate for methodology review but not for universal hidden-stem interaction', () => {
    const { i252 } = validChain();
    expect(i252.status).toBe(
      'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW',
    );
    expect(i252.requirementAssessments.map((item) => item.requirementId)).toEqual(I252_REQUIREMENT_IDS);
    expect(i252.satisfiedRequirementCount).toBe(8);
    expect(i252.boundedResearchMethodologyCandidateMayProceed).toBe(true);
    expect(i252.boundedMethodologyScope).toBe(
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_WITH_VISIBILITY_POSITION_SEASON_AND_PLURALITY_QUALIFIERS',
    );
    expect(i252.universalHiddenStemInteractionAuthorized).toBe(false);
    expect(i252.arbitraryHiddenStemCoPresenceInteractionAuthorized).toBe(false);
    expect(i252.hiddenStemInteractionOutsideExplicitRelationAuthorized).toBe(false);
  });

  it('keeps season, plurality and position qualitative rather than converting them to scores or automatic winners', () => {
    const { i252 } = validChain();
    expect(i252.branchClashWinnerMayBeDerivedFromSeasonOrPluralityAutomatically).toBe(false);
    expect(i252.numericSeasonWeightAuthorized).toBe(false);
    expect(i252.numericPluralityWeightAuthorized).toBe(false);
    expect(i252.numericPositionWeightAuthorized).toBe(false);
    expect(i252.damageMagnitudeAuthorized).toBe(false);
  });

  it('keeps existing provenance tracks frozen and creates no Career or production authority', () => {
    const { i252 } = validChain();
    expect(i252.i232SohuTrackReopened).toBe(false);
    expect(i252.i232ProvenanceGapClosed).toBe(false);
    expect(i252.i248YudingTrackMutated).toBe(false);
    expect(i252.i211QuWeiTrackMutated).toBe(false);
    expect(i252.careerT6RuleAuthoringAuthorizedByThisGate).toBe(false);
    expect(i252.careerT8SynthesisAuthorizedByThisGate).toBe(false);
    expect(i252.productionPromotionAuthorized).toBe(false);
    expect(i252.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    );
  });
});
