import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-current-scholarly-method-boundary-evidence.js';
import { buildRelationshipSpouseT8DyadicCompatibilityBoundaryEvidence } from '../src/research/relationship-spouse-t8-dyadic-compatibility-boundary-evidence.js';

describe('Relationship spouse T8 current scholarly method boundary evidence', () => {
  test('keeps author-hosted indexed body passages distinct from direct PDF inspection', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CANDIDATE;

    expect(candidate.kciBibliographicAndAbstractSurfaceInspected).toBe(true);
    expect(candidate.authorHostedIndexedBodyPassagesInspected).toBe(true);
    expect(candidate.directAuthorHostedPageOpenSucceeded).toBe(false);
    expect(candidate.directPdfObjectInspected).toBe(false);
    expect(candidate.pdfScreenshotReviewed).toBe(false);
    expect(candidate.exactEvidenceTierBoundary).toMatch(/must not be relabeled as direct PDF inspection/i);
  });

  test('records current spouse-palace priority and the explicit gendered spouse-star mapping', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CANDIDATE;

    expect(candidate.publicationYear).toBe(2025);
    expect(candidate.spousePalaceDayBranchExplicit).toBe(true);
    expect(candidate.spousePalacePrioritizedOverSpouseStarExplicit).toBe(true);
    expect(candidate.genderedSpouseStarMappingExplicit).toBe(true);
    expect(candidate.exposedGenderedMapping).toEqual({
      husbandCaseSpouseStar: 'Wealth / 財星',
      wifeCaseSpouseStar: 'Officer / 官星',
    });
    expect(candidate.explicitRoleNeutralNatalSpouseSelectorEstablished).toBe(false);
  });

  test('records both single-native features and dyadic full-chart comparison without collapsing them', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CANDIDATE;

    expect(candidate.singleNativeSpouseRelationshipFeatureListExposed).toBe(true);
    expect(candidate.dyadicFullChartComparisonExplicit).toBe(true);
    expect(candidate.exposedSingleNativeNegativeFeatures).toContain('weak spouse star');
    expect(candidate.exposedSingleNativeNegativeFeatures).toContain(
      'spouse star at Myojeol or rootless/weak through Seolgi or Pageuk',
    );
    expect(candidate.exposedDyadicCompatibilityFactors).toContain(
      'cross-examine both partners full year/month/day/hour natal charts',
    );
    expect(candidate.exposedDyadicCompatibilityFactors).toContain(
      'Jung-hwa as the ultimate compatibility objective',
    );
    expect(candidate.pureSingleNatalInputContractEstablished).toBe(false);
  });

  test('keeps ungoverned semantic states outside canonical correspondence', () => {
    const required =
      RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CANDIDATE.requiredNonCurrentInputOrSemantics;

    expect(required).toContain('partner natal chart for full compatibility comparison');
    expect(required).toContain('root / rootlessness');
    expect(required).toContain('source-defined weakness');
    expect(required).toContain('Myo/Jeol state');
    expect(required).toContain('Seolgi');
    expect(required).toContain('Pageuk');
    expect(required).toContain('Jung-hwa');
    expect(required).toContain('Yongsin');
    expect(
      RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CANDIDATE.canonicalLosslessFitEstablished,
    ).toBe(false);
  });

  test('keeps every post-primary authority and production gate fail-closed', () => {
    const report = buildRelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidence();

    expect(report.directPdfCandidateCount).toBe(0);
    expect(report.authorHostedIndexedBodyPassageCandidateCount).toBe(1);
    expect(report.currentSpouseSpecificMethodPassagesFound).toBe(true);
    expect(report.roleNeutralNatalMappingEstablished).toBe(false);
    expect(report.pureSingleNatalInputPathEstablished).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentRoleNeutralSpouseMethodEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.genderOrOrientationInferenceAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('chains deterministically from the dyadic compatibility boundary layer', () => {
    const upstream = buildRelationshipSpouseT8DyadicCompatibilityBoundaryEvidence();
    const first = buildRelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidence();
    const second = buildRelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_current_scholarly_method_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_SCHOLARLY_METHOD_BOUNDARY_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(15);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_KWEON_ACTUAL_BODY_FIRST_THEN_DIRECTLY_ACQUIRE_KIM_2025_PDF_TO_VERIFY_CURRENT_METHOD_CONTEXT_WITHOUT_NEUTRALIZING_GENDERED_RULES',
    );
  });
});
