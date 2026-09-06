import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARIES,
  RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ExternalContextBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-external-context-boundary-evidence.js';
import { buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence } from '../src/research/relationship-spouse-t8-post-ha-scholarly-candidate-disposition-evidence.js';

describe('Relationship spouse T8 external-context boundary evidence', () => {
  test('keeps abstract evidence separate from direct body/PDF inspection', () => {
    expect(RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARIES).toHaveLength(2);

    for (const boundary of RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARIES) {
      expect(boundary.inspectedPublicSurface).toBe('SCHOLARLY_ABSTRACT_METADATA');
      expect(boundary.directFullTextObjectInspected).toBe(false);
      expect(boundary.pdfScreenshotReviewed).toBe(false);
      expect(boundary.roleNeutralNatalSpouseMappingEstablished).toBe(false);
      expect(boundary.completeDescribedWorkflowCanonicalSnapshotOnlyFit).toBe(false);
      expect(boundary.authorityImpact).toBe('NO_AUTHORITY_GAP_CLOSED');
    }
  });

  test('records Shin external life-history inputs without turning them into spouse semantics', () => {
    const shin = RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARIES.find(
      (candidate) => candidate.candidateId === 'SHIN_JAEEOK_2024_DBPIA_T16939654',
    );

    expect(shin?.disposition).toBe('EXTERNAL_LIFE_FACT_REQUIRED_BY_SOURCE_WORKFLOW');
    expect(shin?.externalContextKinds).toEqual(['marriage_history', 'child_count']);
    expect(shin?.spouseSpecificPublicSurface).toBe(false);
    expect(shin?.exactBoundary).toMatch(/confirm the birth hour/i);
    expect(shin?.exactBoundary).toMatch(/does not establish a spouse selector/i);
  });

  test('records Hong social-role reassignment as non-snapshot and still gender-framed', () => {
    const hong = RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARIES.find(
      (candidate) => candidate.candidateId === 'HONG_YOOSEON_2022_KCI_ART003089059',
    );

    expect(hong?.disposition).toBe('SOCIAL_ROLE_DUTY_REASSIGNMENT_NOT_NATAL_SNAPSHOT_ONLY');
    expect(hong?.spouseSpecificPublicSurface).toBe(true);
    expect(hong?.sourceLocator).toContain('10.54385/cbt.2022.2.2.75');
    expect(hong?.externalContextKinds).toEqual([
      'social_ideology',
      'imposed_duties',
      'social_roles',
    ]);
    expect(hong?.exactBoundary).toMatch(/wife=Wealth/i);
    expect(hong?.exactBoundary).toMatch(/husband=Officer/i);
    expect(hong?.exactBoundary).toMatch(/not an explicit role-neutral natal spouse selector/i);
  });

  test('keeps all post-primary authority and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8ExternalContextBoundaryEvidence();

    expect(report.boundaryCount).toBe(2);
    expect(report.directFullTextObjectCount).toBe(0);
    expect(report.pdfScreenshotReviewedCount).toBe(0);
    expect(report.roleNeutralNatalMappingEstablished).toBe(false);
    expect(report.canonicalSnapshotOnlySpouseMethodEstablished).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('chains deterministically from the post-Ha candidate disposition evidence', () => {
    const upstream = buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence();
    const first = buildRelationshipSpouseT8ExternalContextBoundaryEvidence();
    const second = buildRelationshipSpouseT8ExternalContextBoundaryEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_external_context_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_EXTERNAL_CONTEXT_BOUNDARY_CONTROL_IDS);
    expect(first.controlCount).toBe(14);
    expect(first.recommendedNextAction).toMatch(/ACQUIRE_KIM_YOUNGJIN_2020_ACTUAL_BODY/);
  });
});
