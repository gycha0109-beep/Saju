import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
} from '../src/index.js';

describe('I25 relation-specific challenge effect methodology review', () => {
  test('routes output leakage to relation-specific contexts without a fixed weakening direction', () => {
    const report = buildI25ChallengeEffectMethodologyReview(
      buildI24ChallengeMechanismComposition([{ evidenceId: 'output', relation: 'output' }]),
    );
    const item = report.items[0];

    expect(item?.state).toBe('OUTPUT_EFFECT_REVIEW_REQUIRED');
    expect(item?.requiredContexts).toEqual(
      expect.arrayContaining([
        'DAY_MASTER_PRECLASSIFICATION_FORCE_CONTEXT',
        'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
        'ROOT_SUPPORT_CONTEXT',
        'STRUCTURAL_TARGET_CONTEXT',
        'RELATION_INTERACTION_CONTEXT',
      ]),
    );
    expect(item?.fixedWeakeningDirectionAuthorized).toBe(false);
    expect(item?.effectiveState).toBe('not_determined');
  });

  test('wealth effect review requires peer and resource support contexts', () => {
    const report = buildI25ChallengeEffectMethodologyReview(
      buildI24ChallengeMechanismComposition([{ evidenceId: 'wealth', relation: 'wealth' }]),
    );
    const item = report.items[0];

    expect(item?.state).toBe('WEALTH_EFFECT_REVIEW_REQUIRED');
    expect(item?.requiredContexts).toContain('PEER_SUPPORT_CONTEXT');
    expect(item?.requiredContexts).toContain('RESOURCE_SUPPORT_CONTEXT');
    expect(item?.numericMagnitude).toBe('not_assigned');
  });

  test('officer/control effect review preserves resource mediation and structural context requirements', () => {
    const report = buildI25ChallengeEffectMethodologyReview(
      buildI24ChallengeMechanismComposition([{ evidenceId: 'officer', relation: 'officer' }]),
    );
    const item = report.items[0];

    expect(item?.state).toBe('OFFICER_EFFECT_REVIEW_REQUIRED');
    expect(item?.requiredContexts).toContain('RESOURCE_SUPPORT_CONTEXT');
    expect(item?.requiredContexts).toContain('STRUCTURAL_TARGET_CONTEXT');
    expect(item?.fixedWeakeningDirectionAuthorized).toBe(false);
  });

  test('mixed mechanisms remain separate and never produce a challenge verdict or cross-mechanism order', () => {
    const report = buildI25ChallengeEffectMethodologyReview(
      buildI24ChallengeMechanismComposition([
        { evidenceId: 'output', relation: 'output' },
        { evidenceId: 'wealth', relation: 'wealth' },
        { evidenceId: 'officer', relation: 'officer' },
      ]),
    );

    expect(report.items).toHaveLength(3);
    expect(report.mixedMechanismPrecedence).toBe('not_authorized');
    expect(report.challengeEffectVerdict).toBe('not_determined');
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('review identity is deterministic for the same composition report', () => {
    const composition = buildI24ChallengeMechanismComposition([
      { evidenceId: 'output', relation: 'output' },
      { evidenceId: 'officer', relation: 'officer' },
    ]);

    expect(buildI25ChallengeEffectMethodologyReview(composition).reviewId).toBe(
      buildI25ChallengeEffectMethodologyReview(composition).reviewId,
    );
  });
});
