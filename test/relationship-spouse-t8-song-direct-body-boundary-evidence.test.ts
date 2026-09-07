import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8SongDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-song-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8KweonDirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-kweon-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Song direct-body boundary evidence', () => {
  test('pins the directly inspected institutional PDF and page coordinates', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.directInstitutionalPdfObjectInspected).toBe(true);
    expect(candidate.pdfScreenshotReviewed).toBe(true);
    expect(candidate.pdfSha256).toBe('fb71da7de3fd1b511fc071d7d360173e63a134191c6fd10f6b8955cd151917c');
    expect(candidate.pdfBytes).toBe(2_867_892);
    expect(candidate.pdfPageCount).toBe(165);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 60,
      physicalPdfPage: 74,
      topic: 'proposal: choose Yukchin system according to relationship-analysis purpose and household situation',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 63,
      physicalPdfPage: 77,
      topic: 'conclusion: social/era/extrinsic-variable limitations',
    });
  });

  test('records the actual-role meta-rule without relabeling it as a spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.yeonhaejapyeongSexAndGenealogyCenteredRelationshipMappingExplicit).toBe(true);
    expect(candidate.jeokcheonsuActualRoleOrInfluenceCenteredRelationshipMappingExplicit).toBe(true);
    expect(candidate.proposalChoosesDifferentYukchinSystemsBySituationExplicit).toBe(true);
    expect(candidate.conclusionSexOrGenealogyVersusActualRoleMetaRuleExplicit).toBe(true);
    expect(candidate.onePartnerGenderIndependentOperationalSpouseSelectorFound).toBe(false);
    expect(candidate.spouseSpecificRoleNeutralRuleFound).toBe(false);
    expect(candidate.exactSpouseBoundary).toMatch(/not one spouse-specific, partner-gender-independent natal selector/i);
  });

  test('preserves the explicit unresolved husband criterion and source-specific branch limits', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.jeokcheonsuHusbandCriterionExplicitlyUnclear).toBe(true);
    expect(candidate.gungtongbogamWifeAndChildYongsinHuisinMappingExplicit).toBe(true);
    expect(candidate.sourceSpecificYongsinOrHuisinSemanticsRequiredForOneBranch).toBe(true);
    expect(candidate.explicitRoleNeutralNatalSpouseSelectorEstablished).toBe(false);
  });

  test('keeps the contextual meta-rule outside a pure natal input contract', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.marriedWomanOrOnePersonHouseholdJeokcheonsuBranchExplicit).toBe(true);
    expect(candidate.ruralOrChildEconomicProviderGungtongbogamBranchExplicit).toBe(true);
    expect(candidate.socialEraFamilyStructureExternalVariablesExplicit).toBe(true);
    expect(candidate.contextualMetaRuleRequiresNonNatalFacts).toBe(true);
    expect(candidate.pureSingleNatalInputContractFound).toBe(false);
    expect(candidate.completeRoleNeutralSingleNatalInputContractEstablished).toBe(false);
    expect(candidate.canonicalLosslessFitEstablished).toBe(false);
    expect(candidate.exactInputBoundary).toMatch(/not computable from a single CanonicalSajuSnapshot alone/i);
  });

  test('keeps all post-primary authority and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8SongDirectBodyBoundaryEvidence();

    expect(report.directInstitutionalPdfCandidateCount).toBe(1);
    expect(report.directInstitutionalPdfInspected).toBe(true);
    expect(report.pdfScreenshotReviewed).toBe(true);
    expect(report.contextualYukchinSystemMetaRuleConfirmed).toBe(true);
    expect(report.actualRoleOrInfluenceBranchConfirmed).toBe(true);
    expect(report.oneRoleNeutralSpouseSelectorFound).toBe(false);
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

  test('chains deterministically from the merged Kweon direct-body boundary', () => {
    const upstream = buildRelationshipSpouseT8KweonDirectBodyBoundaryEvidence();
    const first = buildRelationshipSpouseT8SongDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8SongDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_song_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(first.controlCount).toBe(16);
    expect(first.recommendedNextAction).toBe(
      'FREEZE_JUNG_SUA_2025_DIRECT_BODY_GENDERED_STAR_COUPLING_BOUNDARY',
    );
  });
});
