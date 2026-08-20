import { describe, expect, test } from 'vitest';
import { buildI28ChallengeTargetRootQualityMethodologyReview } from '../src/index.js';

describe('I28 challenge target root-quality methodology review', () => {
  test('requires challenge-specific modified reuse instead of direct I18C reuse', () => {
    const report = buildI28ChallengeTargetRootQualityMethodologyReview();

    expect(report.decision).toBe('CHALLENGE_SPECIFIC_MODIFIED_REUSE_REQUIRED');
    expect(report.generalRootSemanticsBeyondDayMasterSupported).toBe(true);
    expect(report.i18cDirectReuseAuthorized).toBe(false);
    expect(report.challengeSpecificCandidateEvidenceImplementationAuthorized).toBe(true);
  });

  test('requires a visible target-stem anchor and does not promote hidden-only membership to root quality', () => {
    const report = buildI28ChallengeTargetRootQualityMethodologyReview();

    expect(report.visibleTargetStemAnchorRequired).toBe(true);
    expect(report.hiddenOnlyTargetMembershipIsRootQuality).toBe(false);
    expect(
      report.reuseAudit.find((item) => item.capability === 'HIDDEN_ONLY_TARGET_ELEMENT_PRESENCE')
        ?.disposition,
    ).toBe('DO_NOT_REUSE_DIRECTLY');
  });

  test('allows non-earth branch locators only through a challenge-specific adapter', () => {
    const report = buildI28ChallengeTargetRootQualityMethodologyReview();

    expect(report.nonEarthBranchLocatorReuseAuthorized).toBe(true);
    expect(
      report.reuseAudit.find(
        (item) => item.capability === 'NON_EARTH_STRONG_AND_RESIDUAL_BRANCH_LOCATORS',
      )?.disposition,
    ).toBe('ADAPT_UNDER_CHALLENGE_NAMESPACE');
    expect(
      report.reuseAudit.find((item) => item.capability === 'I18C_ROOT_CLASS_LABELS_AND_CLAIM_TYPES')
        ?.disposition,
    ).toBe('DO_NOT_REUSE_DIRECTLY');
  });

  test('preserves the unresolved earth convention and all downstream force guards', () => {
    const report = buildI28ChallengeTargetRootQualityMethodologyReview();

    expect(report.earthRootConventionResolved).toBe(false);
    expect(report.targetIntrinsicRootQualityVerdict).toBe('not_determined');
    expect(report.targetPostRelationForceState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('records explicit next-implementation guards and deterministic identity', () => {
    const report = buildI28ChallengeTargetRootQualityMethodologyReview();
    const repeated = buildI28ChallengeTargetRootQualityMethodologyReview();

    expect(report.requiredNextImplementationGuards).toEqual(
      expect.arrayContaining([
        expect.stringContaining('visible heavenly stem'),
        expect.stringContaining('challenge-specific methodology ID'),
        expect.stringContaining('earth root class as unresolved'),
      ]),
    );
    expect(report.reviewId).toBe(repeated.reviewId);
  });
});
