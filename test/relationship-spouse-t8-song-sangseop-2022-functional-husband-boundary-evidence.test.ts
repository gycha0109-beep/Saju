import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-eum-jonghee-2019-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-song-sangseop-2022-functional-husband-boundary-evidence.js';

describe('Relationship spouse T8 Song Sangseop 2022 functional-husband boundary evidence', () => {
  test('pins exact scholarly identity and recovered public repository route', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('송상섭');
    expect(candidate.publicationYear).toBe(2022);
    expect(candidate.rissId).toBe('T16377357');
    expect(candidate.rissControl).toBe('6188af0cf49b0838ffe0bdc3ef48d419');
    expect(candidate.uci).toBe('I804:45008-200000631721');
    expect(candidate.priorAccessBoundaryPr).toBe(374);
    expect(candidate.directBodyAcquisitionPr).toBe(401);
    expect(candidate.dcollectionItemId).toBe('200000631721');
    expect(candidate.rissDetailAuthoredSearchCommonScript).toBe(true);
    expect(candidate.globalFulltextDownloadImplementationDirectlyObserved).toBe(true);
    expect(candidate.dispatcherLoginFlagOneDirectlyObserved).toBe(true);
    expect(candidate.rissAuthoredDcollectionRouteFollowed).toBe(true);
    expect(candidate.dcollectionActiveNonDrmPublicPdfRedirectDirectlyObserved).toBe(true);
    expect(candidate.dcollectionDrm).toBe('N');
    expect(candidate.dcollectionMessageGate).toBe('');
    expect(candidate.dcollectionAgreeVariablePresent).toBe(false);
  });

  test('pins exact complete PDF body and render-first review', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE;
    expect(candidate.dispatcherScriptSha256).toBe('d00f2205c1e40ef8ff0d499b938f2c9f782f5d0a52a082e459127b77bf40f9b8');
    expect(candidate.pdfSha256).toBe('9df71be1ff471d329a58af2ccb88d01aa71fa6a4f0aaed81762f28c2761e5988');
    expect(candidate.pdfBytes).toBe(1_895_533);
    expect(candidate.pdfPageCount).toBe(208);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.pdfVersion).toBe('1.4');
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextIndexedForLocators).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE;
    expect(candidate.printedBodyPageOffset).toBe(19);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 89,
      physicalPdfPage: 108,
      topic:
        'female-chart chapter states that overly strong or weak Officer can shift the husband indicator to Injury Officer, Wealth, Resource, or other balancing kinship stars',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 97,
      physicalPdfPage: 116,
      topic:
        'source explicitly states that the husband star in a female chart is the Yongsin and again rejects Officer-only husband analysis',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 181,
      physicalPdfPage: 200,
      topic:
        'conclusion endorses Yongsin-based husband judgment for female charts and says social values influence theory change without publishing a partner-neutral selector',
    });
  });

  test('recognizes real functional remapping instead of mislabeling the thesis as fixed Officer-only', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE;
    expect(candidate.socialValueConditionedTheoryEvolutionExplicit).toBe(true);
    expect(candidate.femaleOfficerAsHusbandBaselineExplicit).toBe(true);
    expect(candidate.femaleOfficerOnlyHusbandRuleExplicitlyRejected).toBe(true);
    expect(candidate.femaleFunctionalHusbandRemappingExplicit).toBe(true);
    expect(candidate.femaleHusbandYongshinRuleExplicit).toBe(true);
    expect(candidate.femaleHusbandCanShiftToBalancingKinshipStarExplicit).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/female-chart husband star is the Yongsin/i);
  });

  test('does not convert female husband remapping into a role-neutral spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE;
    expect(candidate.maleWealthAsWifeFrameworkExplicit).toBe(true);
    expect(candidate.husbandAndWifeFrameworkRemainsSexSeparated).toBe(true);
    expect(candidate.functionalHusbandRemappingIsNativeSexIndependent).toBe(false);
    expect(candidate.functionalHusbandRemappingIsPartnerSexIndependent).toBe(false);
    expect(candidate.spouseSpecificOperationalRoleNeutralSelectorPublished).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.sourceRequiresUngovernedYongshinHeesinGyeokgukSemantics).toBe(true);
    expect(candidate.exactNegativeBoundary).toMatch(/male wife analysis and female husband analysis as separate branches/i);
  });

  test('chains from Eum Jonghee without changing the accepted two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.femaleFunctionalHusbandRemappingConfirmed).toBe(true);
    expect(report.femaleHusbandYongshinRuleConfirmed).toBe(true);
    expect(report.sexSeparatedSpouseFrameworkConfirmed).toBe(true);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps no-stitching and production gates fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with sex-common spouse-palace evidence/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CONTROL_IDS.length);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidence();
    const second = buildRelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_FEMALE_FUNCTIONAL_HUSBAND_REMAPPING_WITHOUT_ROLE_NEUTRAL_SPOUSE_SELECTOR',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_song_sangseop_2022_functional_husband_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED',
    );
  });
});
