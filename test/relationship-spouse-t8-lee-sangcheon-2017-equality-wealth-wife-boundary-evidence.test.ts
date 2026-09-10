import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8NaHyukjin2017SexConditionedScoringBoundaryEvidence } from '../src/research/relationship-spouse-t8-na-hyukjin-2017-sex-conditioned-scoring-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-sangcheon-2017-equality-wealth-wife-boundary-evidence.js';

describe('Relationship spouse T8 Lee Sangcheon 2017 equality/Wealth-wife boundary evidence', () => {
  test('pins exact scholarly identity and current public acquisition provenance', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('이상천');
    expect(candidate.publicationYear).toBe(2017);
    expect(candidate.title).toBe('『적천수천미』 「육친론」에 관한 연구');
    expect(candidate.institution).toBe('국제뇌교육종합대학원대학교');
    expect(candidate.rissControl).toBe('7dedd951a2b45b77ffe0bdc3ef48d419');
    expect(candidate.nationalLibraryLocalBibno).toBe('KDM201800827');
    expect(candidate.nanetControl).toBe('KDMT1201802346');
    expect(candidate.priorAccessBoundaryPr).toBe(368);
    expect(candidate.directBodyAcquisitionPr).toBe(408);
    expect(candidate.dcollectionItemId).toBe('000002321524');
    expect(candidate.dcollectionDrm).toBe('N');
    expect(candidate.dcollectionMessageGate).toBe('');
    expect(candidate.dcollectionExpectedFileSize).toBe(1_243_256);
  });

  test('pins the exact artifact PDF and render-first review', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CANDIDATE;
    expect(candidate.dispatcherScriptSha256).toBe('d00f2205c1e40ef8ff0d499b938f2c9f782f5d0a52a082e459127b77bf40f9b8');
    expect(candidate.pdfSha256).toBe('b79b9e1635787ebffca08538627780314656f0d3999d4d63ef9428580df636ec');
    expect(candidate.pdfBytes).toBe(1_243_256);
    expect(candidate.pdfPageCount).toBe(72);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.pdfVersion).toBe('1.4');
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextIndexedForLocators).toBe(true);
    expect(candidate.materialPagesVisuallyReviewedFromExactArtifactPdf).toBe(true);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CANDIDATE;
    expect(candidate.printedBodyPageOffset).toBe(10);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 29,
      physicalPdfPage: 39,
      topic:
        'Ren Tieqiao commentary explicitly states the Ziping rule that Wealth is wife and assigns Direct and Indirect Wealth to wife and concubine roles',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 45,
      physicalPdfPage: 55,
      topic:
        'comparison says modern spouse relations are equal and mutually coexisting while retaining a male-native Direct-Wealth wife interpretation rather than publishing one sex-independent spouse selector',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 54,
      physicalPdfPage: 64,
      topic:
        'conclusion calls for future re-examination and improvement of Yukchin theory in light of changing social phenomena and family composition but does not supply the missing replacement selector',
    });
  });

  test('recognizes the explicit modernization and equality critique as positive evidence', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CANDIDATE;
    expect(candidate.patriarchalMaleSuperiorSpouseStructureCritiqueExplicit).toBe(true);
    expect(candidate.modernMaleFemaleEqualityFramingExplicit).toBe(true);
    expect(candidate.mutualCoexistenceSpouseRelationFramingExplicit).toBe(true);
    expect(candidate.futureTheoryReexaminationAndImprovementRequested).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/modern male-female equality/i);
  });

  test('pins the modern male Wealth-wife application instead of inferring a replacement selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CANDIDATE;
    expect(candidate.modernMalePositiveCaseUsesDirectWealthAsWife).toBe(true);
    expect(candidate.modernMaleNegativeCaseUsesWealthAsWife).toBe(true);
    expect(candidate.equalityCritiquePublishesSpouseSpecificReplacementSelector).toBe(false);
    expect(candidate.futureImprovementRequestPublishesReplacementSelector).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/male-native Wealth-wife readings/i);
  });

  test('preserves the source internal mapping tension without silently reconciling it', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CANDIDATE;
    expect(candidate.modernComparisonDistinguishesDirectWealthWifeFromIndirectWealthFather).toBe(true);
    expect(candidate.conclusionRestatesWifeAsDirectAndIndirectWealth).toBe(true);
    expect(candidate.internalModernizationMappingTensionPreservedWithoutReconciliation).toBe(true);
    expect(candidate.exactInternalTensionBoundary).toMatch(/preserves that source-level tension/i);
    expect(candidate.exactInternalTensionBoundary).toMatch(/does not silently reconcile/i);
  });

  test('chains from Na Hyukjin without changing the accepted two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8NaHyukjin2017SexConditionedScoringBoundaryEvidence();
    const report = buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.modernEqualityCritiqueConfirmed).toBe(true);
    expect(report.maleWealthWifeApplicationConfirmed).toBe(true);
    expect(report.sourceInternalMappingTensionPreserved).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps no-stitching and production fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Na Hyukjin scoring/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_CONTROL_IDS.length);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence();
    const second = buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_LEE_SANGCHEON_2017_EQUALITY_WEALTH_WIFE_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_EQUALITY_MODERNIZATION_WITH_WEALTH_WIFE_MAPPING_WITHOUT_ROLE_NEUTRAL_SPOUSE_SELECTOR',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_sangcheon_2017_equality_wealth_wife_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED',
    );
  });
});
