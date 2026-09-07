import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8DyadicCompatibilityBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-dyadic-compatibility-boundary-evidence.js';
import { buildRelationshipSpouseT8KweonModernFamilyFrontierEvidence } from '../src/research/relationship-spouse-t8-kweon-modern-family-frontier-evidence.js';

describe('Relationship spouse T8 dyadic compatibility boundary evidence', () => {
  test('keeps Nam Gi-dong below actual-body evidence', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CANDIDATE;

    expect(candidate.inspectedPublicSurface).toBe('RISS_SCHOLARLY_METADATA_ABSTRACT_TOC');
    expect(candidate.directFullTextObjectInspected).toBe(false);
    expect(candidate.pdfScreenshotReviewed).toBe(false);
  });

  test('records the spouse-specific dyadic method without relabeling it as a single-native rule', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CANDIDATE;

    expect(candidate.spouseSpecificMethodExplicitOnPublicSurface).toBe(true);
    expect(candidate.dyadicPartnerNatalChartRequiredByProposedMethod).toBe(true);
    expect(candidate.operationalAccumulationLogicExplicitOnPublicSurface).toBe(true);
    expect(candidate.modernCompatibilityComponents).toEqual([
      'spouse palace',
      'spouse star',
      'neutralization compatibility',
      'modern sinsal compatibility',
    ]);
    expect(candidate.exactMethodBoundary).toMatch(/both natal charts/i);
    expect(candidate.exactMethodBoundary).toMatch(/dyadic/i);
  });

  test('keeps the gender-conditioned source below role-neutral spouse mapping', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CANDIDATE;

    expect(candidate.explicitGenderConditionPresentOnPublicSurface).toBe(true);
    expect(candidate.explicitRoleNeutralNatalSpouseSelectorEstablished).toBe(false);
    expect(candidate.singleNatalInputContractEstablished).toBe(false);
    expect(candidate.exactRoleNeutralBoundary).toMatch(/female-chart-specific/i);
    expect(candidate.exactRoleNeutralBoundary).toMatch(/man and a woman/i);
  });

  test('records the non-current input and semantic contract rather than inventing it', () => {
    const required =
      RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CANDIDATE.requiredNonCurrentInputOrSemantics;

    expect(required).toContain('partner natal chart');
    expect(required).toContain('Johu');
    expect(required).toContain('Jung-hwa / neutralization');
    expect(required).toContain('Wonjin');
    expect(required).toContain('Baekho');
    expect(required).toContain('Goegang');
    expect(required).toContain('Ipmyo');
    expect(required).toContain('Byeongyak');
    expect(required).toContain('Poguk');
    expect(required).toContain('Cheoneul nobleman');
    expect(
      RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CANDIDATE.canonicalLosslessFitEstablished,
    ).toBe(false);
  });

  test('keeps every post-primary authority and production gate fail-closed', () => {
    const report = buildRelationshipSpouseT8DyadicCompatibilityBoundaryEvidence();

    expect(report.spouseSpecificOperationalMethodSurfaceFound).toBe(true);
    expect(report.dyadicPartnerNatalChartRequired).toBe(true);
    expect(report.roleNeutralNatalMappingEstablished).toBe(false);
    expect(report.singleNatalInputPathEstablished).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.partnerChartInferenceAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('chains deterministically from the Kweon frontier layer', () => {
    const upstream = buildRelationshipSpouseT8KweonModernFamilyFrontierEvidence();
    const first = buildRelationshipSpouseT8DyadicCompatibilityBoundaryEvidence();
    const second = buildRelationshipSpouseT8DyadicCompatibilityBoundaryEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_dyadic_compatibility_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_DYADIC_COMPATIBILITY_BOUNDARY_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(13);
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_KWEON_ROLE_NEUTRAL_BODY_ACQUISITION_AND_ACQUIRE_NAM_GIDONG_BODY_ONLY_TO_BOUND_EXACT_DYADIC_METHOD_SEMANTICS',
    );
  });
});
