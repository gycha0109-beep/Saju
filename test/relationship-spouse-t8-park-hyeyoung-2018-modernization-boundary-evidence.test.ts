import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidence } from '../src/research/relationship-spouse-t8-song-sangseop-2022-functional-husband-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ParkHyeyoung2018ModernizationBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-park-hyeyoung-2018-modernization-boundary-evidence.js';

describe('Relationship spouse T8 Park Hyeyoung 2018 modernization boundary evidence', () => {
  test('pins exact identity, public repository route, and complete PDF', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('박혜영');
    expect(c.publicationYear).toBe(2018);
    expect(c.rissId).toBe('T14752312');
    expect(c.rissControl).toBe('90b96055ae1e4289ffe0bdc3ef48d419');
    expect(c.nationalLibraryLocalBibno).toBe('KDM201900838');
    expect(c.priorAccessBoundaryPr).toBe(378);
    expect(c.directBodyAcquisitionPr).toBe(403);
    expect(c.dcollectionItemId).toBe('000000052956');
    expect(c.dcollectionDrm).toBe('N');
    expect(c.dcollectionAgree).toBe('Y');
    expect(c.pdfSha256).toBe('55c0d5b5be9e2f5b6b49e4ccc9a2322e261a3d0235d05fe238a82f10cf219046');
    expect(c.pdfBytes).toBe(1_637_531);
    expect(c.pdfPageCount).toBe(91);
    expect(c.pdfEncrypted).toBe(false);
    expect(c.pdfVersion).toBe('1.4');
    expect(c.materialPagesVisuallyReviewed).toBe(true);
  });

  test('pins the rendered modernization and conclusion locators', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_CANDIDATE;
    expect(c.printedBodyPageOffset).toBe(9);
    expect(c.printedToPhysicalPageMap).toContainEqual({
      printedPage: 57,
      physicalPdfPage: 66,
      topic:
        'women economic participation, educational equality, economic independence and changed marriage attitudes are used to demand modernized Mingli interpretation',
    });
    expect(c.printedToPhysicalPageMap).toContainEqual({
      printedPage: 75,
      physicalPdfPage: 84,
      topic:
        'conclusion explicitly states that for a man wife is Direct Wealth while the adopted modernization remedies are intrinsic Stem-Branch properties and Heoja expansion',
    });
  });

  test('recognizes substantive modernization rather than dismissing it as a fixed-rule source', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_CANDIDATE;
    expect(c.changedFamilyRelationsCritiqueExplicit).toBe(true);
    expect(c.changedWomenRoleCritiqueExplicit).toBe(true);
    expect(c.womenEconomicIndependenceAndMarriageAttitudeChangeExplicit).toBe(true);
    expect(c.explicitDemandForModernizedInterpretation).toBe(true);
    expect(c.intrinsicStemBranchPropertiesPrioritizedOverMechanicalYukchin).toBe(true);
    expect(c.heojaExpansionProposedAsInternalRemedy).toBe(true);
    expect(c.tarotFusionProposedAsExternalRemedy).toBe(true);
    expect(c.femaleFunctionalHusbandRemappingReported).toBe(true);
    expect(c.femaleHusbandYongshinRuleReported).toBe(true);
    expect(c.exactPositiveBoundary).toMatch(/economic independence and changed marriage attitudes/i);
  });

  test('does not promote modernization into a role-neutral spouse selector', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_CANDIDATE;
    expect(c.maleWifeDirectWealthExplicitInConclusion).toBe(true);
    expect(c.sexConditionedRelationshipBranchingExplicitInConclusion).toBe(true);
    expect(c.modernizationRemedyPublishesSpouseSpecificReplacementSelector).toBe(false);
    expect(c.modernizationCritiqueIsNativeSexIndependentOperationalSelector).toBe(false);
    expect(c.modernizationCritiqueIsPartnerSexIndependentOperationalSelector).toBe(false);
    expect(c.spouseSpecificOperationalRoleNeutralSelectorPublished).toBe(false);
    expect(c.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(c.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(c.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(c.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(c.exactNegativeBoundary).toMatch(/wife is Direct Wealth/i);
  });

  test('chains from Song Sangseop and preserves the exact two-of-five ledger', () => {
    const upstream = buildRelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidence();
    const report = buildRelationshipSpouseT8ParkHyeyoung2018ModernizationBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.modernFamilyAndWomenRoleCritiqueConfirmed).toBe(true);
    expect(report.diversificationRemediesConfirmed).toBe(true);
    expect(report.sexConditionedSpouseSemanticsConfirmed).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps no-stitching and deterministic content addressing', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_CANDIDATE;
    const first = buildRelationshipSpouseT8ParkHyeyoung2018ModernizationBoundaryEvidence();
    const second = buildRelationshipSpouseT8ParkHyeyoung2018ModernizationBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(c.noStitchingBoundary).toMatch(/not combined with Song Sangseop/i);
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_CONTROL_IDS);
    expect(first.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_CONTROL_IDS.length);
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_PARK_HYEYOUNG_2018_MODERNIZATION_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe('DIRECT_FULLTEXT_CONFIRMS_MODERN_FAMILY_CRITIQUE_WITHOUT_ROLE_NEUTRAL_SPOUSE_SELECTOR');
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_park_hyeyoung_2018_modernization_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED',
    );
  });
});
