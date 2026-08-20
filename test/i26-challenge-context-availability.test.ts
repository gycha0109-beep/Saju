import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  buildI25ChallengeEffectMethodologyReview,
  buildI26ChallengeContextAvailability,
} from '../src/index.js';

function reviewAllMechanisms() {
  return buildI25ChallengeEffectMethodologyReview(
    buildI24ChallengeMechanismComposition([
      { evidenceId: 'output', relation: 'output' },
      { evidenceId: 'wealth', relation: 'wealth' },
      { evidenceId: 'officer', relation: 'officer' },
    ]),
  );
}

describe('I26 challenge context evidence availability matrix', () => {
  test('identifies mechanism-effective force as the shared missing substrate', () => {
    const report = buildI26ChallengeContextAvailability(reviewAllMechanisms());

    expect(report.mechanisms).toHaveLength(3);
    for (const mechanism of report.mechanisms) {
      expect(mechanism.missingDependencies).toEqual(['MECHANISM_EFFECTIVE_FORCE_CONTEXT']);
      expect(mechanism.effectReady).toBe(false);
    }
    expect(report.allRequiredContextsHaveSubstrate).toBe(false);
    expect(report.methodologyReadyForEffectResolution).toBe(false);
  });

  test('marks peer and resource support as evidence-available but effect-unresolved', () => {
    const report = buildI26ChallengeContextAvailability(reviewAllMechanisms());
    const wealth = report.mechanisms.find(
      (mechanism) => mechanism.mechanism === 'WEALTH_EXPENDITURE_CONTROL',
    );
    const officer = report.mechanisms.find(
      (mechanism) => mechanism.mechanism === 'OFFICER_CONTROL_PRESSURE',
    );

    expect(wealth?.evidenceAvailableDependencies).toEqual(
      expect.arrayContaining(['PEER_SUPPORT_CONTEXT', 'RESOURCE_SUPPORT_CONTEXT']),
    );
    expect(officer?.evidenceAvailableDependencies).toContain('RESOURCE_SUPPORT_CONTEXT');
  });

  test('preserves root, structural-target, relation, and preclassification force as partial substrates', () => {
    const report = buildI26ChallengeContextAvailability(reviewAllMechanisms());
    const output = report.mechanisms.find(
      (mechanism) => mechanism.mechanism === 'OUTPUT_LEAKAGE',
    );

    expect(output?.partialDependencies).toEqual(
      expect.arrayContaining([
        'DAY_MASTER_PRECLASSIFICATION_FORCE_CONTEXT',
        'ROOT_SUPPORT_CONTEXT',
        'STRUCTURAL_TARGET_CONTEXT',
        'RELATION_INTERACTION_CONTEXT',
      ]),
    );
  });

  test('availability never authorizes effect resolution, scoring, or classification', () => {
    const report = buildI26ChallengeContextAvailability(reviewAllMechanisms());

    expect(report.challengeEffectVerdict).toBe('not_determined');
    expect(report.methodologyReadyForEffectResolution).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(
      report.capabilityCatalog.every((capability) => capability.effectResolutionAuthorized === false),
    ).toBe(true);
  });

  test('report identity is deterministic for the same upstream review', () => {
    const review = reviewAllMechanisms();
    expect(buildI26ChallengeContextAvailability(review).reportId).toBe(
      buildI26ChallengeContextAvailability(review).reportId,
    );
  });
});
