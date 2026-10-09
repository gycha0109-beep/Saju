import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1S_RIGHTS_ADJUDICATION,
  FR300_R1S_RIGHTS_CURRENT_GATE,
  FR300_R1S_RIGHTS_PUBLIC_SOURCE_REVIEW,
  assertFR300R1SRightsMindsParticipantScopeContract,
} from './minds-libras-participant-scope-fr300-r1s-rights.js';

describe('FR300-R1S-RIGHTS MINDS participant-scope adjudication', () => {
  it('records the peer-reviewed compliance section without inventing consent authority', () => {
    const article = FR300_R1S_RIGHTS_PUBLIC_SOURCE_REVIEW.sources.find(
      (source) => source.sourceClass === 'peer_reviewed_dataset_article',
    );
    expect(article).toMatchObject({
      complianceWithEthicalStandardsSectionLocated: true,
      complianceSectionContainsConflictOfInterestStatement: true,
      informedConsentStatementLocated: false,
      ethicalApprovalStatementLocated: false,
      participantCommercialProductDevelopmentConsentStatementLocated: false,
    });
  });

  it('treats missing public consent authority as unresolved rather than proof of no consent', () => {
    expect(
      FR300_R1S_RIGHTS_PUBLIC_SOURCE_REVIEW.absenceFindingSemantics,
    ).toBe('no_public_source_authority_located_not_proof_consent_never_existed');
    expect(
      FR300_R1S_RIGHTS_ADJUDICATION.participantConsentNeverExistedClaimed,
    ).toBe(false);
    expect(
      FR300_R1S_RIGHTS_ADJUDICATION
        .participantCommercialProductDevelopmentScope,
    ).toBe('unresolved_after_public_source_review');
  });

  it('keeps copyright, public release, and participant consent as separate authorities', () => {
    expect(
      FR300_R1S_RIGHTS_ADJUDICATION.datasetCopyrightLicenseStatus,
    ).toBe('cc_by_4_0_bound');
    expect(
      FR300_R1S_RIGHTS_ADJUDICATION.publicReleaseEqualsCommercialProductConsent,
    ).toBe(false);
    expect(
      FR300_R1S_RIGHTS_ADJUDICATION
        .ccByCopyrightLicenseEqualsParticipantConsent,
    ).toBe(false);
  });

  it('does not authorize contact, subject artifact inspection, FR299, R2, or product expansion', () => {
    expect(
      FR300_R1S_RIGHTS_ADJUDICATION.authorOrInstitutionContactAuthorizedByThisTrack,
    ).toBe(false);
    expect(
      FR300_R1S_RIGHTS_ADJUDICATION.subjectArtifactInspectionAuthorized,
    ).toBe(false);
    expect(FR300_R1S_RIGHTS_CURRENT_GATE.authority.externalContactAuthorized).toBe(
      false,
    );
    expect(
      FR300_R1S_RIGHTS_CURRENT_GATE.authority.subjectArtifactInspectionAuthorized,
    ).toBe(false);
    expect(FR300_R1S_RIGHTS_CURRENT_GATE.fr299EligibleCandidateCount).toBe(0);
    expect(FR300_R1S_RIGHTS_CURRENT_GATE.fr300R2EligibleCandidateCount).toBe(0);
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (item) =>
          item.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(() =>
      assertFR300R1SRightsMindsParticipantScopeContract(),
    ).not.toThrow();
  });
});
