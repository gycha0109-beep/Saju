import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1S_Q_CURRENT_GATE,
  FR300_R1S_Q_INQUIRY_PACKET,
  FR300_R1S_Q_OFFICIAL_CONTACT_ROUTES,
  FR300_R1S_Q_PUBLIC_SEARCH_ADJUDICATION,
  assertFR300R1SQMindsRightsInquiryContract,
} from './minds-libras-rights-inquiry-fr300-r1s-q.js';

describe('FR300-R1S-Q MINDS rights inquiry preparation', () => {
  it('freezes the public search as exhausted without claiming consent never existed', () => {
    expect(FR300_R1S_Q_PUBLIC_SEARCH_ADJUDICATION).toMatchObject({
      searchState: 'public_source_search_exhausted_for_current_surface',
      participantCommercialProductDevelopmentScope:
        'unresolved_after_additional_public_search',
      consentNeverExistedClaimed: false,
      publicDatasetReleaseEqualsCommercialParticipantConsent: false,
    });
  });

  it('uses only institutionally published contact routes', () => {
    expect(FR300_R1S_Q_OFFICIAL_CONTACT_ROUTES).toHaveLength(2);
    expect(FR300_R1S_Q_OFFICIAL_CONTACT_ROUTES.map((item) => item.contactId)).toEqual([
      'silvia_almeida_ifmg',
      'frederico_guimaraes_ufmg',
    ]);
    expect(
      FR300_R1S_Q_OFFICIAL_CONTACT_ROUTES.every((item) =>
        item.email.endsWith('.edu.br'),
      ),
    ).toBe(true);
  });

  it('prepares exactly the five rights questions needed before subject-data inspection', () => {
    expect(FR300_R1S_Q_INQUIRY_PACKET.questions.map((item) => item.id)).toEqual([
      'Q1',
      'Q2',
      'Q3',
      'Q4',
      'Q5',
    ]);
    expect(
      FR300_R1S_Q_INQUIRY_PACKET.questions.every((item) => item.required),
    ).toBe(true);
  });

  it('does not send, inspect subject artifacts, spend, or promote MINDS', () => {
    expect(FR300_R1S_Q_INQUIRY_PACKET.sendAuthorized).toBe(false);
    expect(FR300_R1S_Q_INQUIRY_PACKET.sendPerformed).toBe(false);
    expect(FR300_R1S_Q_CURRENT_GATE.paidSpendAuthorized).toBe(false);
    expect(FR300_R1S_Q_CURRENT_GATE.externalContactAuthorized).toBe(false);
    expect(FR300_R1S_Q_CURRENT_GATE.externalContactPerformed).toBe(false);
    expect(FR300_R1S_Q_CURRENT_GATE.subjectArtifactInspectionAuthorized).toBe(
      false,
    );
    expect(FR300_R1S_Q_CURRENT_GATE.subjectArtifactDownloadPerformed).toBe(
      false,
    );
    expect(FR300_R1S_Q_CURRENT_GATE.fr299EligibleCandidateCount).toBe(0);
    expect(FR300_R1S_Q_CURRENT_GATE.fr300R2EligibleCandidateCount).toBe(0);
  });

  it('preserves product 18/29 and the complete authority contract', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (item) =>
          item.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(() => assertFR300R1SQMindsRightsInquiryContract()).not.toThrow();
  });
});
