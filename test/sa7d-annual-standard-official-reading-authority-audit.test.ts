import { describe, expect, it } from 'vitest';

import {
  OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1,
} from '../src/reading/official-reading-detailed-presentation-registry.js';
import {
  PREVIEW_E2E_APPROVAL,
  isPreviewOfficialReadingSection,
} from '../src/preview/preview-authority.js';
import {
  GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
} from '../src/research/general-annual-reading-candidate.js';
import {
  CAREER_ANNUAL_READING_CANDIDATE_VERSION,
} from '../src/research/career-annual-reading-candidate.js';
import {
  WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
} from '../src/research/wealth-annual-reading-candidate.js';
import {
  RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
} from '../src/research/relationship-annual-reading-candidate.js';
import {
  BUSINESS_ANNUAL_READING_CANDIDATE_VERSION,
} from '../src/research/business-annual-reading-candidate.js';
import {
  buildGeneralAnnualAuthorityBridgeReview,
} from '../src/research/general-annual-authority-bridge-review.js';

const ANNUAL_READING_SECTIONS = [
  'general:annual',
  'career:annual',
  'wealth:annual',
  'relationship:annual:general',
  'business:annual',
] as const;

describe('SA-7D annual standard Official Reading authority audit', () => {
  it('classifies General Annual as a semantic-prerequisite repair case', () => {
    const review = buildGeneralAnnualAuthorityBridgeReview();

    expect(review.decision.disposition).toBe('RETURN_TO_RESEARCH');
    expect(review.authorityState).toMatchObject({
      annualSpecificSourceAuthorityEstablished: false,
      domainReviewAuthorityEstablished: false,
      trustedDomainAttestationEstablished: false,
      provenanceQualityPromotionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      engineAuthorityPromotionAuthorized: false,
      previewExpansionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthority: false,
      production: 'HOLD',
    });
  });

  it('keeps all current annual domain candidates research-versioned', () => {
    expect(
      new Set([
        GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
        CAREER_ANNUAL_READING_CANDIDATE_VERSION,
        WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
        RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
        BUSINESS_ANNUAL_READING_CANDIDATE_VERSION,
      ]),
    ).toEqual(new Set(['0.1.0-research']));
  });

  it('keeps annual sections outside the default Preview Official Reading authority', () => {
    for (const section of ANNUAL_READING_SECTIONS) {
      expect(isPreviewOfficialReadingSection(section)).toBe(false);
      expect(
        (PREVIEW_E2E_APPROVAL.officialReadingSections as readonly string[]).includes(
          section,
        ),
      ).toBe(false);
    }
  });

  it('keeps annual sections outside the detailed presentation registry', () => {
    for (const section of ANNUAL_READING_SECTIONS) {
      expect(
        (OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1 as readonly string[]).includes(
          section,
        ),
      ).toBe(false);
    }
  });
});
