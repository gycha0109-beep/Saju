import { describe, expect, it } from 'vitest';
import { summarizeResearchMURCoverage } from '../scripts/saju-500-evidence-audit.mjs';

describe('research MUR coverage audit', () => {
  it('summarizes existing per-domain MUR state without granting consumer completeness', () => {
    expect(
      summarizeResearchMURCoverage([
        {
          mur: {
            state: 'complete',
            usefulComplete: false,
            selectedSectionCount: 3,
            additionalVerifiedSectionCount: 0,
            coreClaimType: 'CORE',
            supportingClaimCount: 2,
            missingRequirements: [],
          },
        },
        {
          mur: {
            state: 'partial',
            usefulComplete: false,
            selectedSectionCount: 2,
            additionalVerifiedSectionCount: 1,
            coreClaimType: 'CORE',
            supportingClaimCount: 1,
            missingRequirements: ['support A'],
          },
        },
        {
          mur: {
            state: 'insufficient',
            usefulComplete: false,
            selectedSectionCount: 0,
            additionalVerifiedSectionCount: 2,
            coreClaimType: null,
            supportingClaimCount: 0,
            missingRequirements: ['core', 'support B'],
          },
        },
      ]),
    ).toEqual({
      covered: 3,
      researchStateCounts: { complete: 1, insufficient: 1, partial: 1 },
      selectedSectionCountDistribution: { 0: 1, 2: 1, 3: 1 },
      additionalVerifiedSectionCountDistribution: { 0: 1, 1: 1, 2: 1 },
      supportingClaimCountDistribution: { 0: 1, 1: 1, 2: 1 },
      coreSelectedCases: 2,
      casesWithMissingRequirements: 2,
      totalMissingRequirements: 3,
      uniqueMissingRequirementProfiles: 3,
      consumerMURCompleteCases: 0,
    });
  });

  it('does not invent MUR coverage for menus without a domain MUR report', () => {
    expect(summarizeResearchMURCoverage([{ text: 'annual menu' }])).toBeNull();
  });
});
