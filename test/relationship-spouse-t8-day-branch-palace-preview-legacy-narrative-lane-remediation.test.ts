import { describe, expect, test } from 'vitest';
import {
  buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_LEGACY_NARRATIVE_LANE_REMEDIATION_VERSION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-preview-legacy-narrative-lane-remediation.js';

describe('SA-5T historical spouse legacy Narrative Preview remediation', () => {
  test('preserves the exact pre-SA-5W remediation decision', async () => {
    const remediation =
      await buildRelationshipSpouseT8DayBranchPalacePreviewLegacyNarrativeLaneRemediation();

    expect(remediation.remediationVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PREVIEW_LEGACY_NARRATIVE_LANE_REMEDIATION_VERSION,
    );
    expect(remediation.issue).toBe('#2017');
    expect(remediation.capabilityKey).toBe('relationship:natal:spouse');
    expect(remediation.semanticScope).toBe('position_only');
    expect(remediation.blockers).toEqual([]);
    expect(remediation.remediationEstablished).toBe(true);
    expect(remediation.decision).toBe(
      'POSITION_ONLY_LEGACY_NARRATIVE_PREVIEW_LANE_REMEDIATED',
    );
    expect(remediation.nextDisposition).toBe(
      'RUN_SA_5U_POSITION_ONLY_PREVIEW_DELIVERY_AUTHORITY_REVIEW',
    );
    expect(remediation.historicalState).toEqual({
      recordedAtStage: 'SA-5T',
      previewApprovalId: 'owner-provisional-preview-2026-10-03-sa5t',
      previewAuthorityVersion: 'myeonghwa-preview-e2e-authority-v2',
      previewRuntimeVersion: 'myeonghwa-preview-e2e-runtime-v2',
      readingSection: 'relationship:natal:spouse',
      consumerAuthority: 'legacy_narrative',
      officialReadingSection: false,
      semanticAdmissionBoundaries: [
        'POSITION_ONLY',
        'LEGACY_NARRATIVE_PREVIEW_ONLY',
        'NO_OFFICIAL_READING_PROMOTION',
      ],
      deliveryState: 'delivered',
      officialReadingIdObserved: false,
    });
    expect(remediation.authorityBoundary.officialReadingAuthorityAuthorized).toBe(false);
    expect(remediation.authorityBoundary.productionAuthorityAuthorized).toBe(false);
  });
});
