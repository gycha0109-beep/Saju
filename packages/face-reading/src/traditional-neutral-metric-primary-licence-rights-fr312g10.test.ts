import { describe, expect, it } from 'vitest';
import {
  FR312G10_PRIMARY_LICENCE_FINDINGS,
  assertPrimaryLicenceRightsFR312G10,
  reviewSourceRightsFR312G10,
  type IntendedSourceRightsReviewFR312G10,
} from './traditional-neutral-metric-primary-licence-rights-fr312g10.js';
import {
  FR312G6_NUMERIC_GOVERNANCE_REVIEW,
} from './traditional-neutral-metric-numeric-governance-review-fr312g6.js';
import {
  FR312G8_FEASIBILITY_VERDICT,
} from './traditional-neutral-metric-source-feasibility-fr312g8.js';

describe('FR312G10 actual FRGC v2 licence and CMU owner-route restrictions', () => {
  it('retains two source IDs and the original UND contract provenance', () => {
    expect(() => assertPrimaryLicenceRightsFR312G10()).not.toThrow();
    expect(FR312G10_PRIMARY_LICENCE_FINDINGS.map((entry) => entry.sourceId))
      .toEqual(['FR312G7-S01', 'FR312G7-S02']);
    const cmu = FR312G10_PRIMARY_LICENCE_FINDINGS[0]!;
    const frgc = FR312G10_PRIMARY_LICENCE_FINDINGS[1]!;
    expect(cmu.governingLicenceUrl).toBeNull();
    expect(cmu.distributionContact).toBeNull();
    expect(cmu.organisationSignatureRequired).toBeNull();
    expect(frgc.primarySourceUrl).toBe('https://cvrl.nd.edu/projects/data/');
    expect(frgc.governingLicenceUrl).toMatch(/cvrl\.nd\.edu\/.*\.pdf$/);
    expect(frgc.distributionContact).toBe('cvrl@nd.edu');
    expect(frgc.organisationSignatureRequired).toBe(true);
    expect(frgc.commercialRight).toBe('express_prior_written_permission_required');
    expect(frgc.imageModificationRight).toBe('express_prior_written_permission_required');
    expect(frgc.dataRedistributionRight).toBe('prior_owner_approval_required');
  });

  it('never treats internal-research licence as commercial processing permission', () => {
    for (const source of FR312G10_PRIMARY_LICENCE_FINDINGS) {
      expect(source.rawRecordsAccessibleNow).toBe(false);
      expect(source.commercialUseApproved).toBe(false);
      expect(source.derivativeMetricUseApproved).toBe(false);
      expect(source.cloudProcessingApproved).toBe(false);
      expect(source.ownerReplyReceived).toBe(false);
      expect(source.empiricalEvidenceAdmitted).toBe(false);
      for (const intendedUse of [
        'commercial_product_research',
        'derived_neutral_ratio_statistics',
        'third_party_or_cloud_processing',
        'internal_research_only',
      ] as const) {
        const result = reviewSourceRightsFR312G10({ sourceId: source.sourceId, intendedUse });
        expect(result.permittedToAcquireImages).toBe(false);
        expect(result.permittedToComputeFromExternalFaces).toBe(false);
        expect(result.permittedAsNumericPrior).toBe(false);
        expect(result.blockers.length).toBeGreaterThan(1);
        expect(result.rightsState).toBe(source.sourceId === 'FR312G7-S02'
          ? 'explicit_restriction' : 'unverified');
      }
    }
  });

  it('does not accept caller-asserted signed licence or commercial approval flags', () => {
    const normal: IntendedSourceRightsReviewFR312G10 = {
      sourceId: 'FR312G7-S02',
      intendedUse: 'commercial_product_research',
    };
    expect(() => reviewSourceRightsFR312G10({
      ...normal,
      licenceSigned: true,
    } as IntendedSourceRightsReviewFR312G10)).toThrow('fr312g10_untrusted_permission_claim_or_unknown_field');
    expect(() => reviewSourceRightsFR312G10({
      ...normal,
      rightsApprovedByOwner: true,
    } as IntendedSourceRightsReviewFR312G10)).toThrow('fr312g10_untrusted_permission_claim_or_unknown_field');
    expect(() => reviewSourceRightsFR312G10({
      ...normal,
      facialImageUrl: 'https://example.org/private-face.jpg',
    } as IntendedSourceRightsReviewFR312G10)).toThrow('fr312g10_untrusted_permission_claim_or_unknown_field');
  });

  it('rejects unknown sources and requested uses and keeps FR312G6 closed', () => {
    expect(() => reviewSourceRightsFR312G10({
      sourceId: 'FR312G7-S03' as IntendedSourceRightsReviewFR312G10['sourceId'],
      intendedUse: 'commercial_product_research',
    })).toThrow('fr312g10_unregistered_source');
    expect(() => reviewSourceRightsFR312G10({
      sourceId: 'FR312G7-S02',
      intendedUse: 'download_and_train' as IntendedSourceRightsReviewFR312G10['intendedUse'],
    })).toThrow('fr312g10_unregistered_use');
    expect(FR312G6_NUMERIC_GOVERNANCE_REVIEW.participantCount).toBeNull();
    expect(FR312G6_NUMERIC_GOVERNANCE_REVIEW.partitionRatios).toBeNull();
    expect(FR312G6_NUMERIC_GOVERNANCE_REVIEW.evidencePacketIssued).toBe(false);
    expect(FR312G8_FEASIBILITY_VERDICT.verifiedExactAxisNumericEvidenceCount).toBe(0);
    expect(FR312G8_FEASIBILITY_VERDICT.dataRightsVerifiedSources).toBe(0);
  });
});
