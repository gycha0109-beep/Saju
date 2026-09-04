import { describe, expect, it } from 'vitest';
import {
  READING_PROFILE_SELECTION_AUTHORIZATIONS,
  READING_PROFILE_SELECTION_AUTHORIZATION_POLICY_VERSION,
  buildReadingCompositionEvidence,
  calculateCanonicalSajuSnapshot,
  createI7SeasonalSupportRegistry,
  resolveDomainReadingProfile,
  resolveReadingProfileSelectionAuthorization,
  runInterpretation,
  type CalculationPolicySnapshot,
  type ReadingIntent,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/reading-profile-authorization-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

const AUTHORIZED_INTENTS: readonly ReadingIntent[] = [
  { domain: 'general', temporalScope: 'natal' },
  { domain: 'general', temporalScope: 'annual' },
  { domain: 'general', temporalScope: 'monthly' },
  { domain: 'family', temporalScope: 'natal', relationshipScope: 'parents' },
  { domain: 'family', temporalScope: 'natal', relationshipScope: 'children' },
  { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' },
  { domain: 'relationship', temporalScope: 'annual', relationshipScope: 'general' },
  { domain: 'relationship', temporalScope: 'monthly', relationshipScope: 'general' },
  { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'spouse' },
  { domain: 'compatibility', temporalScope: 'natal' },
  { domain: 'career', temporalScope: 'natal' },
  { domain: 'career', temporalScope: 'annual' },
  { domain: 'career', temporalScope: 'monthly' },
  { domain: 'business', temporalScope: 'natal' },
  { domain: 'business', temporalScope: 'annual' },
  { domain: 'business', temporalScope: 'monthly' },
  { domain: 'wealth', temporalScope: 'natal' },
  { domain: 'wealth', temporalScope: 'annual' },
  { domain: 'wealth', temporalScope: 'monthly' },
  { domain: 'life_stage', temporalScope: 'life_stage' },
  { domain: 'question_specific', temporalScope: 'natal' },
];

function snapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-23T14:30:00.000Z') },
  );
}

describe('Reading profile content authorization', () => {
  it('authorizes exactly the frozen v1 profile contents for all supported intent shapes', () => {
    expect(READING_PROFILE_SELECTION_AUTHORIZATIONS).toHaveLength(AUTHORIZED_INTENTS.length);

    for (const intent of AUTHORIZED_INTENTS) {
      const resolved = resolveDomainReadingProfile(intent);
      expect(resolved).toBeDefined();
      if (resolved === undefined) throw new Error('authorized intent must resolve a profile');

      const authorization = resolveReadingProfileSelectionAuthorization(resolved.profileRef);
      expect(authorization.state).toBe('authorized');
      expect(authorization.authorization?.profileRef).toEqual(resolved.profileRef);
      expect(authorization.authorization?.scope).toBe('reading_evidence_selection_only');
      expect(authorization.authorization?.policyVersion).toBe(
        READING_PROFILE_SELECTION_AUTHORIZATION_POLICY_VERSION,
      );
    }
  });

  it('fails closed when a known profile id/version has different selector content hash', () => {
    const resolved = resolveDomainReadingProfile({ domain: 'career', temporalScope: 'annual' });
    if (resolved === undefined) throw new Error('career annual profile must exist');

    const authorization = resolveReadingProfileSelectionAuthorization({
      ...resolved.profileRef,
      contentHash: '0'.repeat(64),
    });

    expect(authorization).toEqual({ state: 'content_mismatch' });
  });

  it('does not authorize an unregistered profile id or version', () => {
    expect(
      resolveReadingProfileSelectionAuthorization({
        id: 'myeonghwa-reading-profile-unregistered',
        version: '1.0.0',
        contentHash: '1'.repeat(64),
      }),
    ).toEqual({ state: 'not_authorized' });
  });

  it('binds the authorization policy and content-addressed authorization record into runtime selection identity', () => {
    const canonical = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const execution = runInterpretation(canonical, registry, {
      now: new Date('2026-08-23T14:31:00.000Z'),
    });

    const first = buildReadingCompositionEvidence(
      canonical,
      execution,
      registry,
      {
        requestId: 'authorized-career-natal',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'reading-profile-authorization-test-v1' },
    );
    const second = buildReadingCompositionEvidence(
      canonical,
      execution,
      registry,
      {
        requestId: 'authorized-career-natal',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'reading-profile-authorization-test-v1' },
    );

    expect(first.selection.profileAuthorization.state).toBe('authorized');
    expect(first.selection.profileAuthorization.policyVersion).toBe(
      READING_PROFILE_SELECTION_AUTHORIZATION_POLICY_VERSION,
    );
    expect(first.selection.profileAuthorization.authorizationRef).toBeDefined();
    expect(first.profileAuthorization?.decision).toBe('authorized_for_selection');
    expect(first.selection.selectionId).toBe(second.selection.selectionId);
    expect(first.selection.coverageState).toBe('insufficient_evidence');
    expect(first.evidence).toBeUndefined();
  });

  it('keeps request-shape failures unsupported even when the underlying profile content is authorized', () => {
    const canonical = snapshot();
    const registry = createI7SeasonalSupportRegistry();
    const execution = runInterpretation(canonical, registry, {
      now: new Date('2026-08-23T14:32:00.000Z'),
    });

    const result = buildReadingCompositionEvidence(
      canonical,
      execution,
      registry,
      {
        requestId: 'question-without-question',
        intent: { domain: 'question_specific', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'reading-profile-authorization-test-v1' },
    );

    expect(result.selection.coverageState).toBe('unsupported_intent');
    expect(result.selection.missingRequirements).toEqual([
      'QUESTION_TEXT_REQUIRED_FOR_QUESTION_SPECIFIC_INTENT',
    ]);
    expect(result.selection.profileAuthorization.state).toBe('authorized');
    expect(result.selection.profileRef).toBeDefined();
    expect(result.evidence).toBeUndefined();
  });

  it('selection authorization explicitly grants no interpretation, claim-generation or research-promotion authority', () => {
    for (const authorization of READING_PROFILE_SELECTION_AUTHORIZATIONS) {
      expect(authorization.decision).toBe('authorized_for_selection');
      expect(authorization.scope).toBe('reading_evidence_selection_only');
      expect(authorization.constraints).toEqual({
        mayAuthorizeInterpretationRules: false,
        mayAuthorizeClaimGeneration: false,
        mayAuthorizeDomainSemantics: false,
        mayPromoteResearchAuthority: false,
        mayOverrideInterpretationAuthorization: false,
      });
    }
  });
});
