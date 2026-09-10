import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-jeon-suhyun-2016-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-park-oe-suk-2023-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Park Oe-suk 2023 direct-body boundary evidence', () => {
  test('pins exact scholarly identity and public fulltext provenance', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('박외숙');
    expect(candidate.publicationYear).toBe(2023);
    expect(candidate.rissId).toBe('T16818829');
    expect(candidate.rissControl).toBe('b4338a3915d9039bffe0bdc3ef48d419');
    expect(candidate.nanetControl).toBe('KDMT12023000053361');
    expect(candidate.dcollectionItemId).toBe('000000057593');
    expect(candidate.exactRissIdentityDirectlyObserved).toBe(true);
    expect(candidate.nanetExactIdentityDirectlyObserved).toBe(true);
    expect(candidate.rissPublicFulltextObserved).toBe(true);
    expect(candidate.rissAuthoredDcollectionRouteFollowed).toBe(true);
    expect(candidate.dcollectionPublicPdfRouteDirectlyAuthored).toBe(true);
    expect(candidate.dcollectionDrm).toBe('N');
    expect(candidate.dcollectionAgree).toBe('Y');
  });

  test('pins the exact complete PDF body and visual-review boundary', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.pdfSha256).toBe('94f975f3e22041886fd20507b50c73a5565aed15bdbd02a8894c427719e84d6d');
    expect(candidate.pdfBytes).toBe(1_823_802);
    expect(candidate.pdfPageCount).toBe(200);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.pdfVersion).toBe('1.4');
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextExtracted).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
    expect(candidate.printedBodyPageOffset).toBe(10);
  });

  test('pins the decisive sex-split spouse selector pages', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 84,
      physicalPdfPage: 94,
      topic: 'separate male-chart and female-chart Yukchin allocation diagrams explicitly publish sex-split kinship assignments',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 144,
      physicalPdfPage: 154,
      topic:
        'author synthesis explicitly assigns Wealth as wife for men and Officer as husband for women while explaining Yin-Yang and Five-Element family construction',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 179,
      physicalPdfPage: 189,
      topic: 'proposal again states that Yin and Yang combine to set marital relations and derive family relations',
    });
  });

  test('confirms semantic flexibility without role-neutral spouse replacement', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.sexSplitYukchinAllocationExplicit).toBe(true);
    expect(candidate.maleWealthAsWifeExplicit).toBe(true);
    expect(candidate.femaleOfficerAsHusbandExplicit).toBe(true);
    expect(candidate.crossRelativeInterpretationExplicit).toBe(true);
    expect(candidate.socialAndInstitutionalMeaningExpansionExplicit).toBe(true);
    expect(candidate.sexCommonSpousePalaceLocationExplicit).toBe(true);
    expect(candidate.wifePalaceDayBranchAndWifeStarWealthExplicit).toBe(true);
    expect(candidate.crossRelativeExpansionReplacesSpouseSelector).toBe(false);
    expect(candidate.spousePalaceNeutralityReplacesSpouseStarSelector).toBe(false);
  });

  test('keeps the female functional-substitution case bounded to sex-conditioned Officer semantics', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.femaleCaseSpecificFunctionalSubstitutionDiscussionExplicit).toBe(true);
    expect(candidate.authorReanchorsFemaleHusbandToHiddenDirectOfficer).toBe(true);
    expect(candidate.caseSpecificFunctionalSubstitutionIsRoleNeutralSelector).toBe(false);
    expect(candidate.maleCaseWealthWifeAndOfficerChildExplicit).toBe(true);
    expect(candidate.conclusionMaleFemaleUnionFamilySystemExplicit).toBe(true);
    expect(candidate.proposalYinYangCombinationSetsMaritalRelationExplicit).toBe(true);
    expect(candidate.exactNegativeBoundary).toMatch(/Wealth to wife for men and Officer to husband for women/i);
  });

  test('does not close role-neutral mapping, semantic correspondence, or T6 input gaps', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.spouseSpecificOperationalReplacementSelectorPublished).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(candidate.relationshipT6InputGapClosedByThisEvidence).toBe(false);
  });

  test('chains from Jeon Suhyun 2016 without changing the two-of-five ledger', () => {
    const upstream = buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.directFulltextPdfInspected).toBe(true);
    expect(report.sexSplitSpouseStarMappingConfirmed).toBe(true);
    expect(report.crossRelativeSemanticExpansionConfirmed).toBe(true);
    expect(report.sexCommonSpousePalaceLocationConfirmed).toBe(true);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with other scholarly or editorial sources/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8ParkOeSuk2023DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_PARK_OE_SUK_2023_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_SEX_SPLIT_SPOUSE_STAR_MAPPING_DESPITE_CROSS_RELATIVE_AND_SPOUSE_PALACE_EXPANSION',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_park_oe_suk_2023_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED',
    );
  });
});
