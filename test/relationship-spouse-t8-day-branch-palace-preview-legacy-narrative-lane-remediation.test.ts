import { describe, expect, test } from 'vitest';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_LEGACY_NARRATIVE_LANE_REMEDIATION_VERSION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-preview-legacy-narrative-lane-remediation.js';

describe('SA-5T spouse position-only legacy Narrative Preview lane remediation', () => {
  test('admits the exact spouse Preview lane without Official or Production promotion', async () => {
    const remediation =
      await buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation();

    expect(remediation.remediationVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_LEGACY_NARRATIVE_LANE_REMEDIATION_VERSION,
    );
    expect(remediation.issue).toBe('#2017');
    expect(remediation.capabilityKey).toBe('relationship:natal:spouse');
    expect(remediation.semanticScope).toBe('position_only');
    expect(remediation.checks).toEqual({
      upstreamHoldExact: true,
      previewAuthorityDecoupled: true,
      spouseAuthorityExact: true,
      semanticAdmissionExact: true,
      previewDeliveryExact: true,
      prohibitedExpansionAbsent: true,
      officialProductionBoundaryClosed: true,
    });
    expect(remediation.blockers).toEqual([]);
    expect(remediation.remediationEstablished).toBe(true);
    expect(remediation.decision).toBe(
      'POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATED',
    );

    expect(remediation.authorityBoundary).toEqual({
      exactPositionOnlyPreviewAdmissionAuthorized: true,
      legacyNarrativePreviewLaneAuthorized: true,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      persistenceAuthorityAuthorized: false,
      publicGeneralAvailabilityAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerTrustContextRequired: false,
      reviewerTrustGrantRequired: false,
      production: 'HOLD',
    });
    expect(remediation.nextDisposition).toBe(
      'RUN_SA_5U_POSITION_ONLY_PREVIEW_DELIVERY_AUTHORITY_REVIEW',
    );

    expect(remediation.authority).toMatchObject({
      readingSection: 'relationship:natal:spouse',
      authority: 'legacy_narrative',
    });
    expect(remediation.authority.supportedOfficialReadingSection).toBeUndefined();
    expect(remediation.response.state).toBe('delivered');
    expect(remediation.response.reading?.readingId).not.toMatch(/^official_reading_/u);
  });
});
