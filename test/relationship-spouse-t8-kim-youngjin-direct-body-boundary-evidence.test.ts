import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kim-youngjin-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidence } from '../src/research/relationship-spouse-t8-current-scholarly-method-boundary-evidence.js';

describe('Relationship spouse T8 Kim Young-jin direct-body boundary evidence', () => {
  test('content-addresses the directly inspected institutional PDF and page coordinates', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.directInstitutionalPdfObjectInspected).toBe(true);
    expect(candidate.pdfScreenshotReviewed).toBe(true);
    expect(candidate.pdfSha256).toBe('88d82fab599bea08d5778fdd488d8d614af9d26071768a64a9bce63a6433e526');
    expect(candidate.pdfBytes).toBe(1_115_446);
    expect(candidate.pdfPageCount).toBe(94);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 55,
      physicalPdfPage: 66,
      topic: 'female-chart palace/star table and explicit spouse-star selector',
    });
  });

  test('directly confirms the gender-conditioned spouse selector rather than a role-neutral selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.dayPillarSelfAndSpousePalaceExplicit).toBe(true);
    expect(candidate.explicitGenderConditionedSpouseSelector).toEqual({
      maleChart: 'Direct Wealth / 正財',
      femaleChart: 'Direct Officer / 正官',
    });
    expect(candidate.genderConditionedSelectorDirectlyReviewedOnPrintedPage55).toBe(true);
    expect(candidate.genderConditionedSelectorRepeatedElsewhereInBody).toBe(true);
    expect(candidate.explicitRoleNeutralNatalSpouseSelectorEstablished).toBe(false);
  });

  test('does not convert the social-change chapter into a replacement spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.socialChangeReinterpretationChapterDirectlyReviewed).toBe(true);
    expect(candidate.modernGenderRoleChangeExplicitlyDiscussed).toBe(true);
    expect(candidate.modernFamilyAndSocialRelationshipExpansionExplicitlyDiscussed).toBe(true);
    expect(candidate.roleNeutralOperationalSpouseSelectorIntroducedInReviewedSocialChangeOrConclusionPages).toBe(false);
    expect(candidate.traditionalGenderDistinctionCritiquedOrCautionedWithoutReplacementSelector).toBe(true);
    expect(candidate.exactRoleNeutralBoundary).toMatch(/cannot be converted into an executable role-neutral spouse rule/i);
  });

  test('keeps source-specific family, relation, and social semantics outside canonical correspondence', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.sourceMethodInputsOrSemantics).toContain('male/female chart branch for spouse and other Yukchin assignments');
    expect(candidate.sourceMethodInputsOrSemantics).toContain('Sixty-Jiazi placement logic');
    expect(candidate.sourceMethodInputsOrSemantics).toContain('source-defined ideal family palace/star relationship chart');
    expect(candidate.sourceMethodInputsOrSemantics).toContain('branch relation interpretations including Hap/Hyeong/Chung/Pa and Wonjin');
    expect(candidate.sourceMethodInputsOrSemantics).toContain('expanded family/social-role meanings used in the modern reinterpretation chapter');
    expect(candidate.completeRoleNeutralSingleNatalInputContractEstablished).toBe(false);
    expect(candidate.canonicalLosslessFitEstablished).toBe(false);
  });

  test('keeps all four post-primary authority gaps and production fail-closed', () => {
    const report = buildRelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidence();

    expect(report.directInstitutionalPdfCandidateCount).toBe(1);
    expect(report.directInstitutionalPdfInspected).toBe(true);
    expect(report.pdfScreenshotReviewed).toBe(true);
    expect(report.genderConditionedSpouseSelectorConfirmed).toBe(true);
    expect(report.socialChangeReinterpretationReviewed).toBe(true);
    expect(report.roleNeutralReplacementSelectorFound).toBe(false);
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

  test('chains deterministically from the latest current scholarly method boundary', () => {
    const upstream = buildRelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidence();
    const first = buildRelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_youngjin_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(15);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_KWEON_2021_ACTUAL_BODY_AS_HIGHEST_PRIORITY_ROLE_NEUTRAL_FRONTIER',
    );
  });
});
