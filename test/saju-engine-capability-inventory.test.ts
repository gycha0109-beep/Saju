import { describe, expect, it } from 'vitest';
import type { ReadingIntent } from '../src/contracts/reading.js';
import { resolveDomainReadingProfile } from '../src/reading/reading-intent-composition.js';
import { resolveReadingProfileSelectionAuthorization } from '../src/reading/reading-profile-authorization.js';
import { PREVIEW_E2E_APPROVAL } from '../src/preview/preview-authority.js';
import {
  readingSectionForIntentV1,
  resolvePreviewConsumerReadingAuthorityV1,
} from '../src/preview/preview-official-reading-consumer-authority.js';

type ConsumerAuthority = 'official_reading' | 'legacy_narrative';

interface CapabilityObservation {
  key: string;
  intent: ReadingIntent;
  profileId: string;
  consumerAuthority: ConsumerAuthority;
}

const CAPABILITIES: readonly CapabilityObservation[] = Object.freeze([
  {
    key: 'general:natal',
    intent: { domain: 'general', temporalScope: 'natal' },
    profileId: 'myeonghwa-reading-profile-general-natal-v2',
    consumerAuthority: 'official_reading',
  },
  {
    key: 'general:annual',
    intent: { domain: 'general', temporalScope: 'annual' },
    profileId: 'myeonghwa-reading-profile-general-annual-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'general:monthly',
    intent: { domain: 'general', temporalScope: 'monthly' },
    profileId: 'myeonghwa-reading-profile-general-monthly-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'career:natal',
    intent: { domain: 'career', temporalScope: 'natal' },
    profileId: 'myeonghwa-reading-profile-career-natal-v1',
    consumerAuthority: 'official_reading',
  },
  {
    key: 'career:annual',
    intent: { domain: 'career', temporalScope: 'annual' },
    profileId: 'myeonghwa-reading-profile-career-annual-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'career:monthly',
    intent: { domain: 'career', temporalScope: 'monthly' },
    profileId: 'myeonghwa-reading-profile-career-monthly-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'wealth:natal',
    intent: { domain: 'wealth', temporalScope: 'natal' },
    profileId: 'myeonghwa-reading-profile-wealth-natal-v1',
    consumerAuthority: 'official_reading',
  },
  {
    key: 'wealth:annual',
    intent: { domain: 'wealth', temporalScope: 'annual' },
    profileId: 'myeonghwa-reading-profile-wealth-annual-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'wealth:monthly',
    intent: { domain: 'wealth', temporalScope: 'monthly' },
    profileId: 'myeonghwa-reading-profile-wealth-monthly-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'business:natal',
    intent: { domain: 'business', temporalScope: 'natal' },
    profileId: 'myeonghwa-reading-profile-business-natal-v1',
    consumerAuthority: 'official_reading',
  },
  {
    key: 'business:annual',
    intent: { domain: 'business', temporalScope: 'annual' },
    profileId: 'myeonghwa-reading-profile-business-annual-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'business:monthly',
    intent: { domain: 'business', temporalScope: 'monthly' },
    profileId: 'myeonghwa-reading-profile-business-monthly-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'relationship:natal:general',
    intent: { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' },
    profileId: 'myeonghwa-reading-profile-relationship-general-natal-v1',
    consumerAuthority: 'official_reading',
  },
  {
    key: 'relationship:annual:general',
    intent: { domain: 'relationship', temporalScope: 'annual', relationshipScope: 'general' },
    profileId: 'myeonghwa-reading-profile-relationship-general-annual-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'relationship:monthly:general',
    intent: { domain: 'relationship', temporalScope: 'monthly', relationshipScope: 'general' },
    profileId: 'myeonghwa-reading-profile-relationship-general-monthly-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'relationship:natal:spouse',
    intent: { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'spouse' },
    profileId: 'myeonghwa-reading-profile-relationship-spouse-natal-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'family:natal:parents',
    intent: { domain: 'family', temporalScope: 'natal', relationshipScope: 'parents' },
    profileId: 'myeonghwa-reading-profile-family-parents-natal-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'family:natal:children',
    intent: { domain: 'family', temporalScope: 'natal', relationshipScope: 'children' },
    profileId: 'myeonghwa-reading-profile-family-children-natal-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'compatibility:natal',
    intent: { domain: 'compatibility', temporalScope: 'natal' },
    profileId: 'myeonghwa-reading-profile-compatibility-natal-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'life_stage:life_stage',
    intent: { domain: 'life_stage', temporalScope: 'life_stage' },
    profileId: 'myeonghwa-reading-profile-life-stage-general-v1',
    consumerAuthority: 'legacy_narrative',
  },
  {
    key: 'question_specific:natal',
    intent: { domain: 'question_specific', temporalScope: 'natal' },
    profileId: 'myeonghwa-reading-profile-question-specific-v1',
    consumerAuthority: 'legacy_narrative',
  },
]);

const OFFICIAL_CANARY = Object.freeze([
  'general:natal',
  'career:natal',
  'wealth:natal',
  'relationship:natal:general',
  'business:natal',
] as const);

describe('Saju engine capability inventory observations', () => {
  it('tracks exactly 21 unique known Reading capabilities', () => {
    expect(CAPABILITIES).toHaveLength(21);
    expect(new Set(CAPABILITIES.map((item) => item.key)).size).toBe(21);
  });

  it('observes an authorized Reading Profile selection contract for every inventory row', () => {
    for (const capability of CAPABILITIES) {
      const resolved = resolveDomainReadingProfile(capability.intent);
      expect(resolved?.profile.profileId, capability.key).toBe(capability.profileId);
      expect(resolved?.profileRef.id, capability.key).toBe(capability.profileId);
      if (resolved === undefined) throw new Error(`Missing profile for ${capability.key}`);

      const authorization = resolveReadingProfileSelectionAuthorization(resolved.profileRef);
      expect(authorization.state, capability.key).toBe('authorized');
      expect(authorization.authorization?.scope, capability.key).toBe(
        'reading_evidence_selection_only',
      );
      expect(authorization.authorization?.constraints, capability.key).toEqual({
        mayAuthorizeInterpretationRules: false,
        mayAuthorizeClaimGeneration: false,
        mayAuthorizeDomainSemantics: false,
        mayPromoteResearchAuthority: false,
        mayOverrideInterpretationAuthorization: false,
      });
    }
  });

  it('keeps Official consumer authority bounded to the existing Canary five only', () => {
    const official = CAPABILITIES.filter(
      (item) => resolvePreviewConsumerReadingAuthorityV1(item.intent).authority === 'official_reading',
    ).map((item) => readingSectionForIntentV1(item.intent));

    expect([...official].sort()).toEqual([...OFFICIAL_CANARY].sort());
    expect(PREVIEW_E2E_APPROVAL.supportedReadingSections).toEqual(OFFICIAL_CANARY);

    for (const capability of CAPABILITIES) {
      const resolution = resolvePreviewConsumerReadingAuthorityV1(capability.intent);
      expect(resolution.authority, capability.key).toBe(capability.consumerAuthority);
      expect(resolution.constraints).toEqual({
        mayPromoteProductionInterpretationAuthority: false,
        mayGrantPersistenceAuthority: false,
        mayGrantPublicGeneralAvailabilityAuthority: false,
        mayTreatUnsupportedSectionAsOfficialReading: false,
      });
    }
  });

  it('does not infer semantic or claim authority from Reading Profile selection authorization', () => {
    for (const capability of CAPABILITIES) {
      const resolved = resolveDomainReadingProfile(capability.intent);
      if (resolved === undefined) throw new Error(`Missing profile for ${capability.key}`);
      const authorization = resolveReadingProfileSelectionAuthorization(resolved.profileRef);
      expect(authorization.authorization?.constraints.mayAuthorizeInterpretationRules).toBe(false);
      expect(authorization.authorization?.constraints.mayAuthorizeClaimGeneration).toBe(false);
      expect(authorization.authorization?.constraints.mayAuthorizeDomainSemantics).toBe(false);
      expect(authorization.authorization?.constraints.mayPromoteResearchAuthority).toBe(false);
    }
  });
});
