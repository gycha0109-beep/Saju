import { describe, expect, it } from 'vitest';

import {
  OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1,
} from '../src/reading/official-reading-detailed-presentation-registry.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY,
} from '../src/production/production-spouse-official-reading-candidate-authority.js';
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
  GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
} from '../src/research/general-monthly-reading-candidate.js';
import {
  CAREER_MONTHLY_READING_CANDIDATE_VERSION,
} from '../src/research/career-monthly-reading-candidate.js';
import {
  WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
} from '../src/research/wealth-monthly-reading-candidate.js';
import {
  RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
} from '../src/research/relationship-monthly-reading-candidate.js';
import {
  BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
} from '../src/research/business-monthly-reading-candidate.js';
import {
  buildGeneralAnnualAuthorityBridgeReview,
} from '../src/research/general-annual-authority-bridge-review.js';
import {
  R075_AUTHORITY,
  R075_DIRECT_BOUNDARY,
  R075_EXECUTION_GAPS,
  R075_REQUIRED_CONTEXT_LAYERS,
} from '../src/research/general-natal-monthly-luck-boundary.js';

const CURRENT_DETAILED_SCOPE = [
  'general:natal',
  'career:natal',
  'wealth:natal',
  'relationship:natal:general',
  'business:natal',
] as const;

const FUTURE_SCOPE = [
  'relationship:natal:spouse',
  'general:annual',
  'career:annual',
  'wealth:annual',
  'relationship:annual:general',
  'business:annual',
  'general:monthly',
  'career:monthly',
  'wealth:monthly',
  'relationship:monthly:general',
  'business:monthly',
] as const;

describe('SA-7A detailed Official Reading expansion roadmap audit', () => {
  it('keeps every roadmap candidate outside the SA-6X frozen detailed scope', () => {
    expect(OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1).toEqual(
      CURRENT_DETAILED_SCOPE,
    );

    for (const scope of FUTURE_SCOPE) {
      expect(
        (OFFICIAL_READING_DETAILED_SUPPORTED_DOMAIN_KEYS_V1 as readonly string[]).includes(
          scope,
        ),
      ).toBe(false);
    }
  });

  it('identifies spouse natal as an implemented model-free Official Reading candidate that is not public production authority', () => {
    expect(PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY).toMatchObject({
      lifecycle: 'production_candidate',
      implementationAuthorized: true,
      maximumSpouseModelCalls: 0,
      productionTransportAuthorityAuthorized: false,
      productionSemanticDeliveryAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
      commerceAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  it('keeps every annual and monthly expansion candidate research-versioned', () => {
    const researchVersions = [
      GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
      CAREER_ANNUAL_READING_CANDIDATE_VERSION,
      WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
      RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
      BUSINESS_ANNUAL_READING_CANDIDATE_VERSION,
      GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
      CAREER_MONTHLY_READING_CANDIDATE_VERSION,
      WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
      RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
      BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
    ];

    expect(new Set(researchVersions)).toEqual(new Set(['0.1.0-research']));
  });

  it('requires an annual authority/cutover step before detailed annual presentation', () => {
    const review = buildGeneralAnnualAuthorityBridgeReview();

    expect(review.authorityState).toMatchObject({
      annualSpecificSourceAuthorityEstablished: false,
      engineAuthorityPromotionAuthorized: false,
      previewExpansionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAdmissionAuthority: false,
      production: 'HOLD',
    });
  });

  it('keeps monthly interpretation subordinate to higher temporal layers and out of production authority', () => {
    expect(R075_REQUIRED_CONTEXT_LAYERS).toContain('ANNUAL_CONTEXT');
    expect(R075_DIRECT_BOUNDARY.monthlyStandaloneOracleAuthorized).toBe(false);
    expect(R075_AUTHORITY.productionAuthorityPromoted).toBe(false);
    expect(R075_EXECUTION_GAPS.length).toBeGreaterThan(0);
  });
});
