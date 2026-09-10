import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-park-oe-suk-2023-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-eum-jonghee-2019-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Eum Jonghee 2019 direct-body boundary evidence', () => {
  test('pins exact scholarly identity and the newly recovered public repository route', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('음종희');
    expect(candidate.publicationYear).toBe(2019);
    expect(candidate.dbpiaId).toBe('T15047469');
    expect(candidate.rissControl).toBe('b3c06fb77553c27dffe0bdc3ef48d419');
    expect(candidate.priorAccessBoundaryPr).toBe(369);
    expect(candidate.directBodyAcquisitionPr).toBe(399);
    expect(candidate.dcollectionItemId).toBe('000000053810');
    expect(candidate.exactRissIdentityDirectlyObserved).toBe(true);
    expect(candidate.rissPublicFulltextObserved).toBe(true);
    expect(candidate.rissAuthoredDcollectionRouteFollowed).toBe(true);
    expect(candidate.dcollectionPublicPdfRouteDirectlyAuthored).toBe(true);
    expect(candidate.dcollectionDrm).toBe('N');
    expect(candidate.dcollectionAgree).toBe('Y');
  });

  test('pins the exact complete PDF body and render-first review', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.pdfSha256).toBe('d6970955349eb775c3095be0b13617b812ff51c7d99cb09eeb21cf344f29e9d3');
    expect(candidate.pdfBytes).toBe(629_616);
    expect(candidate.pdfPageCount).toBe(68);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.pdfVersion).toBe('1.4');
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextExtracted).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('pins decisive printed-to-physical direct-body coordinates', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedBodyPageOffset).toBe(8);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 37,
      physicalPdfPage: 45,
      topic:
        'author states that the Direct-Wealth wife classification matches modern family relations and generalizes control relations as what I control equals wife and what controls me equals husband',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 44,
      physicalPdfPage: 52,
      topic:
        'Direct-Wealth section explicitly says that in a male chart combination with Direct Wealth means combination with the wife and stable marital relation',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 47,
      physicalPdfPage: 55,
      topic:
        'female worked cases explicitly use Direct Officer as husband and the text describes husband as Yang and the controlling superior kinship relation',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 53,
      physicalPdfPage: 61,
      topic:
        'conclusion and future-work section extends Yin-Yang Five-Element Gyeokguk Yongsin combination and luck research without publishing a replacement spouse selector',
    });
  });

  test('confirms practical-role flexibility while preserving explicit sex-conditioned spouse semantics', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.modernPracticalRoleAndPalaceReinterpretationExplicit).toBe(true);
    expect(candidate.sexCommonPostGrowthSpousePositionLayerExplicit).toBe(true);
    expect(candidate.maleWealthAsWifeExplicit).toBe(true);
    expect(candidate.femaleOfficerAsHusbandExplicit).toBe(true);
    expect(candidate.femaleHusbandIsYangControllingSuperiorRelationExplicit).toBe(true);
    expect(candidate.femaleCasePostMarriageHusbandPalaceReinterpretationExplicit).toBe(true);
    expect(candidate.yinYangDependentTenStarPracticalRoleExplicit).toBe(true);
    expect(candidate.exactNegativeBoundary).toMatch(/what the native controls is wife/i);
    expect(candidate.exactNegativeBoundary).toMatch(/Officer or Seven-Killings as husband in female charts/i);
  });

  test('does not convert practical-role or sex-common position semantics into a role-neutral spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.practicalRoleReinterpretationReplacesSpouseSelector).toBe(false);
    expect(candidate.sexCommonPositionLayerReplacesSpouseStarSelector).toBe(false);
    expect(candidate.spouseSpecificOperationalReplacementSelectorPublished).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(candidate.relationshipT6InputGapClosedByThisEvidence).toBe(false);
  });

  test('chains from Park Oe-suk 2023 without changing the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.practicalRoleAndPalaceReinterpretationConfirmed).toBe(true);
    expect(report.sexCommonPostGrowthSpousePositionConfirmed).toBe(true);
    expect(report.sexConditionedSpouseSemanticsConfirmed).toBe(true);
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

  test('keeps no-stitching and all production gates fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Park Oe-suk 2023 spouse-palace location/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_EUM_JONGHEE_2019_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_PRACTICAL_ROLE_AND_PALACE_REINTERPRETATION_WITH_EXPLICIT_SEX_CONDITIONED_SPOUSE_SEMANTICS',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_eum_jonghee_2019_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED',
    );
  });
});
