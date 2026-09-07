import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8JungSuaDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-jung-sua-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8SongDirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-song-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Jung Su-a direct-body boundary evidence', () => {
  test('pins the directly inspected institutional PDF and critical page coordinates', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.directInstitutionalPdfObjectInspected).toBe(true);
    expect(candidate.pdfScreenshotReviewed).toBe(true);
    expect(candidate.pdfSha256).toBe('43b8ed24cb8b358b2a450a83a89c1299e905d044652274e17190ac18a108be31');
    expect(candidate.pdfBytes).toBe(1_944_006);
    expect(candidate.pdfPageCount).toBe(107);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 56,
      physicalPdfPage: 62,
      topic: 'both male and female charts use Day Branch as spouse palace; gender-conditioned favorable contents immediately follow',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 83,
      physicalPdfPage: 89,
      topic: 'male case reads same-element Day-Branch spouse palace as supportive spouse relationship',
    });
  });

  test('recognizes the genuinely role-neutral spouse-palace location and its operational case use', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.dayBranchSpousePositionExplicit).toBe(true);
    expect(candidate.bothMaleAndFemaleUseDayBranchAsSpousePalaceExplicit).toBe(true);
    expect(candidate.arbitraryDayBranchTenGodOperationallyReadAsSpouseRelationshipInCases).toBe(true);
    expect(candidate.femalePeerDayBranchReadAsSpousePalaceRelationshipExplicit).toBe(true);
    expect(candidate.maleSameElementDayBranchReadAsSupportiveSpouseExplicit).toBe(true);
    expect(candidate.roleNeutralSpousePalaceLocationOperationalized).toBe(true);
    expect(candidate.exactDirectBodyFinding).toMatch(/stronger than a merely nominal Day-Branch label/i);
  });

  test('does not promote the role-neutral location into a complete method while sex-conditioned layers remain', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.maleFavorableSpousePalaceContentGenderConditioned).toMatch(/財星/);
    expect(candidate.femaleFavorableSpousePalaceContentGenderConditioned).toMatch(/官星/);
    expect(candidate.femaleHusbandOfficerSelectorUsedInWorkedCases).toBe(true);
    expect(candidate.maleWifeWealthSelectorUsedInWorkedCases).toBe(true);
    expect(candidate.genderConditionedSpouseStarLayerRetained).toBe(true);
    expect(candidate.genderConditionedSpousePalaceEvaluationLayerRetained).toBe(true);
    expect(candidate.onePartnerGenderIndependentCompleteSpouseMethodFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalSpouseMethodEstablished).toBe(false);
    expect(candidate.exactGenderCouplingBoundary).toMatch(/still branches by native sex/i);
  });

  test('keeps incomplete source semantics outside a governed canonical correspondence', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.sourceSpecificYongsinJisinAndAdditionalInterpretiveSemanticsUsed).toBe(true);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.completeRoleNeutralSingleNatalInputContractEstablished).toBe(false);
    expect(candidate.canonicalLosslessFitEstablished).toBe(false);
    expect(candidate.exactCanonicalBoundary).toMatch(/does not close current governed semantic correspondence/i);
  });

  test('keeps all post-primary authority and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8JungSuaDirectBodyBoundaryEvidence();

    expect(report.directInstitutionalPdfCandidateCount).toBe(1);
    expect(report.directInstitutionalPdfInspected).toBe(true);
    expect(report.pdfScreenshotReviewed).toBe(true);
    expect(report.roleNeutralSpousePalaceLocationOperationalized).toBe(true);
    expect(report.genderConditionedSpouseStarLayerRetained).toBe(true);
    expect(report.genderConditionedSpousePalaceEvaluationLayerRetained).toBe(true);
    expect(report.completeRoleNeutralSpouseMethodFound).toBe(false);
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

  test('chains deterministically from the merged Song direct-body boundary', () => {
    const upstream = buildRelationshipSpouseT8SongDirectBodyBoundaryEvidence();
    const first = buildRelationshipSpouseT8JungSuaDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8JungSuaDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_jung_sua_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(first.controlCount).toBe(16);
    expect(first.recommendedNextAction).toBe(
      'SEARCH_ONLY_COMPLETE_SAME_SOURCE_ROLE_NEUTRAL_SPOUSE_METHOD_WITH_NO_SEX_BRANCHING',
    );
  });
});
