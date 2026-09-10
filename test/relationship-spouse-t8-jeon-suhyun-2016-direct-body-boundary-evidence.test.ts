import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-yang-jihun-2025-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-jeon-suhyun-2016-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Jeon Suhyun 2016 direct-body boundary evidence', () => {
  test('pins exact scholarly identity and public repository route', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('전수현');
    expect(candidate.publicationYear).toBe(2016);
    expect(candidate.rissId).toBe('T14205413');
    expect(candidate.rissControl).toBe('648380763c455520ffe0bdc3ef48d419');
    expect(candidate.nanetCallNumber).toBe('TM 181 -16-52');
    expect(candidate.dcollectionItemId).toBe('000000043819');
    expect(candidate.exactRissIdentityDirectlyObserved).toBe(true);
    expect(candidate.rissPublicFulltextObserved).toBe(true);
    expect(candidate.rissAuthoredDcollectionRouteFollowed).toBe(true);
    expect(candidate.dcollectionPublicPdfRouteDirectlyAuthored).toBe(true);
    expect(candidate.dcollectionDrm).toBe('N');
    expect(candidate.dcollectionAgree).toBe('Y');
  });

  test('pins the exact complete PDF body and direct visual review', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.pdfSha256).toBe('980564548e5e8a354013f2ac2388f608f784b566a297bd8ef93d690919013f6f');
    expect(candidate.pdfBytes).toBe(1_252_987);
    expect(candidate.pdfPageCount).toBe(124);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.pdfVersion).toBe('1.4');
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextExtracted).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedBodyPageOffset).toBe(10);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 86,
      physicalPdfPage: 96,
      topic: 'dedicated spouse-and-Officer section begins with a female natal chart',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 100,
      physicalPdfPage: 110,
      topic:
        'modern-significance section explicitly maps Officer to husband or lover for women, children for men, and society or workplace for both sexes',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 105,
      physicalPdfPage: 115,
      topic: 'conclusion repeats that Officer kinship maps to spouse for women and children for men',
    });
  });

  test('confirms modern sex-conditioned Officer semantics in the body', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.femaleOfficerSpouseApplicationExplicit).toBe(true);
    expect(candidate.modernSectionNativeSexConditionedOfficerMappingExplicit).toBe(true);
    expect(candidate.femaleOfficerAsHusbandOrLoverExplicit).toBe(true);
    expect(candidate.maleOfficerAsChildExplicit).toBe(true);
    expect(candidate.bothSexesOfficerAsSocietyOrOccupationExplicit).toBe(true);
    expect(candidate.conclusionRepeatsSexConditionedKinshipMapping).toBe(true);
    expect(candidate.exactNegativeBoundary).toMatch(/husband or lover for women, children for men/i);
  });

  test('does not convert modern counseling expansion into a role-neutral spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.modernCounselingScopeExpansionExplicit).toBe(true);
    expect(candidate.futureResearchCallsForSpouseAndChildRoleValidation).toBe(true);
    expect(candidate.modernExpansionReplacesSpouseSelector).toBe(false);
    expect(candidate.spouseSpecificOperationalReplacementSelectorPublished).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(candidate.relationshipT6InputGapClosedByThisEvidence).toBe(false);
  });

  test('chains from Yang Jihun 2025 without changing the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.femaleOfficerSpouseApplicationConfirmed).toBe(true);
    expect(report.modernNativeSexConditionedOfficerMappingConfirmed).toBe(true);
    expect(report.modernCounselingScopeExpansionConfirmed).toBe(true);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Yang Jihun 2025 marriage-as-choice critique/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(27);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_MODERN_SEX_CONDITIONED_OFFICER_SPOUSE_USAGE_WITHOUT_ROLE_NEUTRAL_REPLACEMENT_SELECTOR',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_jeon_suhyun_2016_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED',
    );
  });
});
