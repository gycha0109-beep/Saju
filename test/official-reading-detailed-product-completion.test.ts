import { describe, expect, it } from 'vitest';

import {
  OFFICIAL_READING_APPROVED_DETAILED_REGISTRY_VERSION,
  OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1,
  APPROVED_OFFICIAL_READING_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-registry.js';
import {
  BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-business.js';
import {
  CAREER_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-career.js';
import {
  GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-general.js';
import {
  RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-relationship.js';
import {
  WEALTH_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
} from '../src/reading/official-reading-detailed-presentation-wealth.js';
import {
  OFFICIAL_READING_DETAIL_CAPABILITY_V1,
  OFFICIAL_READING_DETAILED_PRODUCT_ACTIVATION_STATE_V1,
  resolveOfficialReadingDetailPreferenceV1,
} from '../src/reading/official-reading-detail-presentation.js';
import {
  OFFICIAL_READING_DETAILED_ROLE_ORDER_V1,
} from '../src/reading/official-reading-detailed-realization.js';

const SUPPORTED_DOMAINS = [
  'general:natal',
  'career:natal',
  'wealth:natal',
  'relationship:natal:general',
  'business:natal',
] as const;

const PROFILE_COUNTS = {
  'general:natal': 20,
  'career:natal': 20,
  'wealth:natal': 11,
  'relationship:natal:general': 11,
  'business:natal': 11,
} as const;

const APPROVED_ROLES = new Set([
  'clarification',
  'condition',
  'boundary',
]);

describe('SA-6X detailed Official Reading product completion contract', () => {
  it('freezes the completed product scope to the five governed natal domains', () => {
    expect(OFFICIAL_READING_APPROVED_DETAILED_REGISTRY_VERSION).toBe(
      'myeonghwa-official-reading-approved-detailed-registry-v3',
    );
    expect(OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1).toEqual(
      SUPPORTED_DOMAINS,
    );

    const grouped = {
      'general:natal': GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
      'career:natal': CAREER_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
      'wealth:natal': WEALTH_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
      'relationship:natal:general':
        RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
      'business:natal': BUSINESS_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1,
    } as const;

    for (const domain of SUPPORTED_DOMAINS) {
      expect(grouped[domain]).toHaveLength(PROFILE_COUNTS[domain]);
      expect(grouped[domain].every((profile) => profile.owner === domain)).toBe(
        true,
      );
    }

    expect(APPROVED_OFFICIAL_READING_DETAILED_SOURCE_PROFILES_V1).toHaveLength(
      Object.values(PROFILE_COUNTS).reduce((sum, count) => sum + count, 0),
    );
    expect(
      APPROVED_OFFICIAL_READING_DETAILED_SOURCE_PROFILES_V1.every((profile) =>
        SUPPORTED_DOMAINS.includes(profile.owner),
      ),
    ).toBe(true);
  });

  it('keeps detailed product activation enabled while preserving fail-closed fallback', () => {
    expect(OFFICIAL_READING_DETAILED_PRODUCT_ACTIVATION_STATE_V1).toBe(
      'enabled',
    );
    expect(OFFICIAL_READING_DETAIL_CAPABILITY_V1.detailed).toEqual({
      materialState: 'conditional',
      productState: 'enabled',
      missingMaterialFallbackReason: 'missing_expansion_material',
      inactiveFallbackReason: 'detailed_not_activated',
    });

    expect(
      resolveOfficialReadingDetailPreferenceV1('detailed', {
        detailedAvailable: true,
      }),
    ).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'detailed',
      resolution: 'exact',
    });

    expect(
      resolveOfficialReadingDetailPreferenceV1('detailed', {
        detailedAvailable: false,
      }),
    ).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'missing_expansion_material',
    });

    expect(
      resolveOfficialReadingDetailPreferenceV1('detailed', {
        detailedAvailable: true,
        detailedProductActivation: 'pre_activation',
      }),
    ).toEqual({
      requestedDetail: 'detailed',
      resolvedDetail: 'standard',
      resolution: 'fallback_to_standard',
      fallbackReason: 'detailed_not_activated',
    });
  });

  it('freezes the currently approved material-role surface without inventing expansion roles', () => {
    expect(OFFICIAL_READING_DETAILED_ROLE_ORDER_V1).toEqual([
      'clarification',
      'rationale',
      'structural_evidence',
      'condition',
      'scenario_note',
      'tension_note',
      'boundary',
    ]);

    const observedRoles = new Set<string>();
    for (const profile of APPROVED_OFFICIAL_READING_DETAILED_SOURCE_PROFILES_V1) {
      for (const [role, text] of Object.entries(profile.approvedTextByRole)) {
        if (typeof text === 'string' && text.trim().length > 0) {
          observedRoles.add(role);
        }
      }
    }

    expect(observedRoles).toEqual(APPROVED_ROLES);
    expect(observedRoles.has('rationale')).toBe(false);
    expect(observedRoles.has('structural_evidence')).toBe(false);
    expect(observedRoles.has('scenario_note')).toBe(false);
    expect(observedRoles.has('tension_note')).toBe(false);
  });

  it('keeps unsupported detailed scope out of the completion declaration', () => {
    for (const unsupported of [
      'relationship:natal:spouse',
      'general:annual',
      'career:annual',
      'wealth:monthly',
      'business:monthly',
    ]) {
      expect(
        (OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1 as readonly string[]).includes(
          unsupported,
        ),
      ).toBe(false);
    }
  });
});
