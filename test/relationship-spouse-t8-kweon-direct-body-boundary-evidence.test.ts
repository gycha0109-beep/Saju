import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KweonDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kweon-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-kim-youngjin-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Kweon direct-body boundary evidence', () => {
  test('pins the directly inspected institutional PDF and page coordinates', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.directInstitutionalPdfObjectInspected).toBe(true);
    expect(candidate.pdfScreenshotReviewed).toBe(true);
    expect(candidate.pdfSha256).toBe('004a7740d416adcfb2c237f63d93dc9e63a919a3758c34cae25740bb1f7d36a0');
    expect(candidate.pdfBytes).toBe(1_374_595);
    expect(candidate.pdfPageCount).toBe(106);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 82,
      physicalPdfPage: 94,
      topic: 'same-sex cohabitation family context',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 85,
      physicalPdfPage: 97,
      topic: 'conclusion: reinterpretability and relationship-analysis demand',
    });
  });

  test('records the same-sex family and Day-Branch alternative without inventing a role-neutral selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.sameSexCohabitationFamilyExplicit).toBe(true);
    expect(candidate.sameSexMarriageOutsideTraditionalWealthOfficerScopeExplicit).toBe(true);
    expect(candidate.nonTraditionalMarriageRequiresExpandedYukchinDefinitionExplicit).toBe(true);
    expect(candidate.dayBranchSpousePalaceAlternativeForNonTraditionalMarriageExplicit).toBe(true);
    expect(candidate.thesisAuthoredPartnerGenderIndependentOperationalSpouseSelectorFound).toBe(false);
    expect(candidate.thesisAuthoredCompleteRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalSpouseSelectorEstablished).toBe(false);
  });

  test('rejects the cited gender-conditioned orientation-inference example as product authority', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.citedSameSexOperationalExamplePresent).toBe(true);
    expect(candidate.citedSameSexOperationalExampleGenderConditioned).toBe(true);
    expect(candidate.citedSameSexOperationalExampleInfersHomosexualTendencyFromChartPattern).toBe(true);
    expect(candidate.citedSameSexOperationalExampleAdmissibleForProductIdentityInference).toBe(false);
    expect(candidate.exactOperationalBoundary).toMatch(/neither a thesis-authored role-neutral selector nor an admissible product rule/i);
  });

  test('keeps raw Day-Branch and Ten-God facts separate from governed spouse semantics', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.dayBranchSpousePalaceExplicit).toBe(true);
    expect(candidate.traditionalMarriageUsesWealthOfficerAndSpousePalaceExplicit).toBe(true);
    expect(candidate.canonicalLosslessFitEstablished).toBe(false);
    expect(candidate.completeRoleNeutralSingleNatalInputContractEstablished).toBe(false);
    expect(candidate.exactCanonicalBoundary).toMatch(/cannot establish current governed spouse-method correspondence/i);
  });

  test('keeps all post-primary authority and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8KweonDirectBodyBoundaryEvidence();

    expect(report.directInstitutionalPdfCandidateCount).toBe(1);
    expect(report.directInstitutionalPdfInspected).toBe(true);
    expect(report.pdfScreenshotReviewed).toBe(true);
    expect(report.sameSexFamilyScopeConfirmed).toBe(true);
    expect(report.dayBranchSpousePalaceAlternativeConfirmed).toBe(true);
    expect(report.roleNeutralReplacementSelectorFound).toBe(false);
    expect(report.citedOrientationInferenceExampleAdmissible).toBe(false);
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

  test('chains deterministically from the merged Kim Young-jin direct-body boundary', () => {
    const upstream = buildRelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidence();
    const first = buildRelationshipSpouseT8KweonDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8KweonDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kweon_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_KWEON_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(first.controlCount).toBe(16);
    expect(first.recommendedNextAction).toBe(
      'SEARCH_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_SPOUSE_SELECTOR_WITH_COMPLETE_INPUT_CONTRACT',
    );
  });
});
