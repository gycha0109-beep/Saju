import { describe, expect, test } from 'vitest';
import { buildI32ChallengeTargetClashDependencyMethodologyReview } from '../src/index.js';

describe('I32 challenge target clash dependency methodology review', () => {
  test('requires a challenge-specific adapter and rejects direct I20-series report contract reuse', () => {
    const report = buildI32ChallengeTargetClashDependencyMethodologyReview();

    expect(report.decision).toBe('CHALLENGE_SPECIFIC_CLASH_DEPENDENCY_ADAPTER_REQUIRED');
    expect(report.i20ReportContractDirectReuseAuthorized).toBe(false);
    expect(report.i20bReportContractDirectReuseAuthorized).toBe(false);
    expect(report.i20cReportContractDirectReuseAuthorized).toBe(false);
    expect(report.i20dReportContractDirectReuseAuthorized).toBe(false);
    expect(report.challengeSpecificClashDependencyEvidenceImplementationAuthorized).toBe(true);
  });

  test('authorizes generic seasonal and support substrate without authorizing force or support effects', () => {
    const report = buildI32ChallengeTargetClashDependencyMethodologyReview();

    expect(report.seasonalElementPhaseReuseAuthorized).toBe(true);
    expect(report.positionalSupportLocatorReuseAuthorized).toBe(true);
    expect(report.seasonalAdvantageCandidateReuseAuthorized).toBe(true);
    expect(report.seasonalAdvantageIsClashWinner).toBe(false);
    expect(report.supportPresenceDeterminesSupportEffect).toBe(false);
    expect(
      report.reuseAudit.find(
        (item) => item.capability === 'SEASONAL_ELEMENT_PHASE_BY_COMMAND_RELATION',
      )?.disposition,
    ).toBe('REUSE_AS_GENERIC_STRUCTURAL_SUBSTRATE');
  });

  test('authorizes rescue topology only as a candidate and never as settlement', () => {
    const report = buildI32ChallengeTargetClashDependencyMethodologyReview();

    expect(report.rescueCandidateTopologyReuseAuthorized).toBe(true);
    expect(report.rescueCandidateDeterminesSettlement).toBe(false);
    expect(
      report.reuseAudit.find((item) => item.capability === 'CLASH_RESCUE_RELATION_TOPOLOGY')
        ?.disposition,
    ).toBe('ADAPT_UNDER_CHALLENGE_NAMESPACE');
  });

  test('preserves target identity, hidden-only, and earth fail-closed boundaries', () => {
    const report = buildI32ChallengeTargetClashDependencyMethodologyReview();

    expect(report.challengeRootCandidateIdentityAlignmentRequired).toBe(true);
    expect(report.hiddenOnlyTargetClashRootEffectAuthorized).toBe(false);
    expect(report.earthRootEffectResolutionAuthorized).toBe(false);
    expect(
      report.reuseAudit.find((item) => item.capability === 'HIDDEN_ONLY_TARGET_ROOT_CLASH_EFFECT')
        ?.disposition,
    ).toBe('DO_NOT_REUSE_REPORT_CONTRACT');
    expect(
      report.reuseAudit.find((item) => item.capability === 'EARTH_TARGET_CLASH_ROOT_EFFECT')
        ?.disposition,
    ).toBe('DO_NOT_REUSE_REPORT_CONTRACT');
  });

  test('keeps all verdicts unauthorized and review identity deterministic', () => {
    const report = buildI32ChallengeTargetClashDependencyMethodologyReview();
    const repeated = buildI32ChallengeTargetClashDependencyMethodologyReview();

    expect(report.relativeBranchForceVerdict).toBe('not_determined');
    expect(report.clashWinnerVerdict).toBe('not_determined');
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.requiredNextImplementationGuards).toEqual(
      expect.arrayContaining([
        expect.stringContaining('I31 root-candidate branch clash participation'),
        expect.stringContaining('seasonalElementPhase'),
        expect.stringContaining('rescue candidates'),
      ]),
    );
    expect(report.reviewId).toBe(repeated.reviewId);
  });
});
