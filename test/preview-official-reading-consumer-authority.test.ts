import { describe, expect, it } from 'vitest';
import type { ReadingIntent } from '../src/contracts/reading.js';
import {
  PREVIEW_E2E_APPROVAL,
  type PreviewE2eSupportedReadingSection,
} from '../src/preview/preview-authority.js';
import {
  PREVIEW_OFFICIAL_READING_CONSUMER_AUTHORITY_VERSION,
  readingSectionForIntentV1,
  resolvePreviewConsumerReadingAuthorityV1,
} from '../src/preview/preview-official-reading-consumer-authority.js';

const CASES: readonly {
  section: PreviewE2eSupportedReadingSection;
  intent: ReadingIntent;
}[] = [
  {
    section: 'general:natal',
    intent: { domain: 'general', temporalScope: 'natal' },
  },
  {
    section: 'career:natal',
    intent: { domain: 'career', temporalScope: 'natal' },
  },
  {
    section: 'wealth:natal',
    intent: { domain: 'wealth', temporalScope: 'natal' },
  },
  {
    section: 'relationship:natal:general',
    intent: {
      domain: 'relationship',
      temporalScope: 'natal',
      relationshipScope: 'general',
    },
  },
  {
    section: 'business:natal',
    intent: { domain: 'business', temporalScope: 'natal' },
  },
];

function sorted(values: readonly string[]): readonly string[] {
  return [...values].sort();
}

describe('Preview Official Reading consumer authority V1', () => {
  it('derives its Official authority surface exactly from the existing Preview approval', () => {
    expect(sorted(CASES.map((candidate) => candidate.section))).toEqual(
      sorted(PREVIEW_E2E_APPROVAL.supportedReadingSections),
    );

    for (const candidate of CASES) {
      expect(readingSectionForIntentV1(candidate.intent)).toBe(candidate.section);
      expect(resolvePreviewConsumerReadingAuthorityV1(candidate.intent)).toEqual({
        authorityVersion: PREVIEW_OFFICIAL_READING_CONSUMER_AUTHORITY_VERSION,
        readingSection: candidate.section,
        authority: 'official_reading',
        supportedOfficialReadingSection: candidate.section,
        constraints: {
          mayPromoteProductionInterpretationAuthority: false,
          mayGrantPersistenceAuthority: false,
          mayGrantPublicGeneralAvailabilityAuthority: false,
          mayTreatUnsupportedSectionAsOfficialReading: false,
        },
      });
    }
  });

  it('keeps unapproved surfaces on legacy Narrative authority without widening Preview approval', () => {
    const unsupported: readonly ReadingIntent[] = [
      { domain: 'career', temporalScope: 'annual' },
      { domain: 'wealth', temporalScope: 'monthly' },
      {
        domain: 'relationship',
        temporalScope: 'natal',
        relationshipScope: 'spouse',
      },
      { domain: 'compatibility', temporalScope: 'natal' },
      { domain: 'life_stage', temporalScope: 'life_stage' },
    ];

    for (const intent of unsupported) {
      const resolution = resolvePreviewConsumerReadingAuthorityV1(intent);
      expect(resolution.authority).toBe('legacy_narrative');
      expect(resolution.supportedOfficialReadingSection).toBeUndefined();
      expect(PREVIEW_E2E_APPROVAL.supportedReadingSections).not.toContain(
        resolution.readingSection as PreviewE2eSupportedReadingSection,
      );
    }

    expect(PREVIEW_E2E_APPROVAL.productionInterpretationAuthorityGranted).toBe(false);
    expect(PREVIEW_E2E_APPROVAL.persistenceAuthorityGranted).toBe(false);
    expect(PREVIEW_E2E_APPROVAL.publicGeneralAvailabilityAuthorityGranted).toBe(false);
  });
});
