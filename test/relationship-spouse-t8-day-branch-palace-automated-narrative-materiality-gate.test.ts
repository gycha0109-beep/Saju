import { describe, expect, test } from 'vitest';
import {
  buildRelationshipSpouseT8DayBranchPalaceAutomatedNarrativeMaterialityGate,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AUTOMATED_MATERIALITY_APPROVAL,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
} from '../src/research/relationship-spouse-t8-day-branch-palace-automated-narrative-materiality-gate.js';

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5L automated narrative-materiality gate', () => {
  test('approves exact position-only narrative materiality without external expert review', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceAutomatedNarrativeMaterialityGate();

    expect(result.issue).toBe('#1925');
    expect(result.semanticVersion).toBe('2.0.0');
    expect(result.semanticScope).toBe('position_only');
    expect(result.blockers).toEqual([]);
    expect(result.automatedMaterialityApproved).toBe(true);
    expect(result.decision).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AUTOMATED_MATERIALITY_APPROVAL,
    );
    expect(result.nextDisposition).toBe(
      'RUN_SA_5M_POSITION_ONLY_NARRATIVE_MATERIALIZATION',
    );
    expect(result.gateId).toMatch(/^[a-f0-9]{64}$/u);
  });

  test('requires no external expert, reviewer identity, attestation, or trust grant', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceAutomatedNarrativeMaterialityGate();

    expect(result.reviewPolicy).toEqual({
      externalExpertReviewRequired: false,
      humanDomainReviewRequired: false,
      reviewAttestationRequired: false,
      reviewerIdentityRequired: false,
      reviewerTrustGrantRequired: false,
    });
  });

  test('keeps the narrative proposition strictly position-only', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceAutomatedNarrativeMaterialityGate();

    expect(result.allowedNarrativeProposition).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
    expect(result.prohibitedExtensions).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
    );
    expect(result.prohibitedExtensions).toContain('partner_personality');
    expect(result.prohibitedExtensions).toContain('marriage_outcome');
    expect(result.prohibitedExtensions).toContain('second_chart_compatibility');
  });

  test('authorizes only the later materialForNarrative mutation and no broader consumer authority', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceAutomatedNarrativeMaterialityGate();

    expect(result.authorityBoundary).toEqual({
      exactCandidateOnly: true,
      narrativeMaterialityAuthorized: true,
      materialForNarrativeMutationAuthorized: true,
      narrativeProfileAuthorityEstablished: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      deliveryAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });
});
