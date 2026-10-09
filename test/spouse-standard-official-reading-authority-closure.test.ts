import { describe, expect, it } from 'vitest';

import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY,
  resolveProductionSpouseOfficialReadingDeliveryAuthorityV1,
} from '../src/production/production-spouse-official-reading-delivery-authority.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_ALLOWED_SECTIONS,
} from '../src/production/production-spouse-official-reading-scope.js';
import {
  OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1,
} from '../src/reading/official-reading-detailed-presentation-registry.js';

describe('SA-7B spouse standard Official Reading authority closure', () => {
  it('confirms the spouse position-only standard Official Reading lane is already active in bounded Production', () => {
    expect(PRODUCTION_SPOUSE_OFFICIAL_READING_ALLOWED_SECTIONS).toEqual([
      'relationship:natal:spouse',
    ]);

    expect(PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY).toMatchObject({
      lifecycle: 'production',
      allowedReadingSections: ['relationship:natal:spouse'],
      productionTransportAuthorityActive: true,
      productionSemanticDeliveryAuthorityActive: true,
      nonSpouseProductionSemanticAuthorityAuthorized: false,
      legacyNarrativeRuntimeAllowedForSpouse: false,
      maximumSpouseModelCalls: 0,
      production: 'ACTIVE_BOUNDED',
    });

    const resolved =
      resolveProductionSpouseOfficialReadingDeliveryAuthorityV1({
        domain: 'relationship',
        temporalScope: 'natal',
        relationshipScope: 'spouse',
      });

    expect(resolved).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'official_reading',
      supportedOfficialReadingSection: 'relationship:natal:spouse',
    });
  });

  it('keeps broader product-owned authorities closed instead of silently promoting them', () => {
    expect(PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY).toMatchObject({
      publicSemanticAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      commerceAuthorityAuthorized: false,
    });

    const resolved =
      resolveProductionSpouseOfficialReadingDeliveryAuthorityV1({
        domain: 'relationship',
        temporalScope: 'natal',
        relationshipScope: 'spouse',
      });

    expect(resolved.constraints).toEqual({
      mayPromoteProductionInterpretationAuthority: false,
      mayGrantPersistenceAuthority: false,
      mayGrantPublicGeneralAvailabilityAuthority: false,
      mayTreatUnsupportedSectionAsOfficialReading: false,
    });
  });

  it('recognizes the later SA-7C detailed presentation authority without widening product-owned authorities', () => {
    expect(
      (OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1 as readonly string[]).includes(
        'relationship:natal:spouse',
      ),
    ).toBe(true);
    expect(PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_AUTHORITY).toMatchObject({
      publicSemanticAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      commerceAuthorityAuthorized: false,
    });
  });

  it('fails non-spouse sections out of the bounded Official Reading authority', () => {
    const intents = [
      {
        domain: 'relationship',
        temporalScope: 'natal',
        relationshipScope: 'general',
      },
      { domain: 'general', temporalScope: 'natal' },
      {
        domain: 'relationship',
        temporalScope: 'annual',
        relationshipScope: 'general',
      },
    ] as const;

    for (const intent of intents) {
      const resolved =
        resolveProductionSpouseOfficialReadingDeliveryAuthorityV1(intent);

      expect(resolved.authority).toBe('legacy_narrative');
      expect(resolved.supportedOfficialReadingSection).toBeUndefined();
    }
  });
});
