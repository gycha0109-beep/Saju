import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8HongYooseonDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-hong-yooseon-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

describe('Relationship spouse T8 Hong Yooseon direct-body boundary evidence', () => {
  test('pins the exact ACCI/Kyobo fulltext object', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.kciArticleId).toBe('ART003089059');
    expect(candidate.doi).toBe('10.54385/cbt.2022.2.2.75');
    expect(candidate.kciBibliographicPages).toBe('75-89');
    expect(candidate.acciJournalPubcNum).toBe('3403');
    expect(candidate.acciInstitutionCode).toBe('20825');
    expect(candidate.acciIssueBookCode).toBe('268938');
    expect(candidate.kyoboArtId).toBe('13195170');
    expect(candidate.kyoboBarcode).toBe('4010037001651');
    expect(candidate.pdfSha256).toBe('bc98fae0c248dcfcf80df3457714551d1fe6fd2757fad3ecbd0373cd0812c1d5');
    expect(candidate.pdfBytes).toBe(3_867_529);
    expect(candidate.pdfPageCount).toBe(15);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.publicPublisherFeedExposedExactPdfRoute).toBe(true);
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.boundedRelevantPagesRenderedAndReviewed).toBe(true);
  });

  test('preserves the genuine modern reinterpretation finding', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.paperCritiquesRigidTraditionalFamilyFormulaExplicitly).toBe(true);
    expect(candidate.ideologyDutyRoleReinterpretationCriterionExplicit).toBe(true);
    expect(candidate.socialIdeologyIsIndependentVariableExplicit).toBe(true);
    expect(candidate.yukchinTenGodMeaningChangesWithIdeologyExplicit).toBe(true);
    expect(candidate.authorProposesSocietyRoleDependentReassignment).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/ideology-required duty and role/i);
  });

  test('preserves explicit sex-conditioned spouse semantics', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.nativeSexConditionedBaselineTableExplicit).toBe(true);
    expect(candidate.maleProperWealthAsWifeExplicit).toBe(true);
    expect(candidate.femaleProperOfficerAsHusbandExplicit).toBe(true);
    expect(candidate.husbandWifeBinaryFramingPersists).toBe(true);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 80,
      physicalPdfPage: 6,
      topic: 'sex-conditioned Yukchin table directly assigns male Proper Wealth to wife and female Proper Officer to husband',
    });
  });

  test('does not relabel social-role reinterpretation as a pure-natal role-neutral selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.reinterpretationCriterionDependsOnExternalSocialDutyAndRole).toBe(true);
    expect(candidate.authorProposesRoleNeutralSpouseReplacement).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/external social ideology, duty, right, and household role/i);
    expect(candidate.exactNegativeBoundary).toMatch(/natal chart inputs alone/i);
  });

  test('pins the strongest direct visual locators for the external-role criterion', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 86,
      physicalPdfPage: 12,
      topic: 'states that duty and role change with ideology over time and that family-star relations should be reset using those external ideological criteria',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 87,
      physicalPdfPage: 13,
      topic: 'conclusion makes the ideology-required duty and role the reinterpretation standard and says ideology is the independent variable while Yukchin Ten-God meaning changes with it',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 89,
      physicalPdfPage: 15,
      topic: 'English abstract restates husband-wife interpretation through patriarchal ideology and identifies obligation according to ideology as the consistent standard',
    });
  });

  test('chains from the accepted two-of-five state without reopening closed gaps', () => {
    const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const report = buildRelationshipSpouseT8HongYooseonDirectBodyBoundaryEvidence();
    expect(report.upstreamReviewId).toBe(upstream.reviewId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8HongYooseonDirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Lee Youngeun, Lee Ockhwa, Lee Myengjae, Jung Su-a, Kweon Sujeong/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(20);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8HongYooseonDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8HongYooseonDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_hong_yooseon_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_PURE_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_HONG_YOOSEON_SOCIAL_ROLE_REINTERPRETATION',
    );
  });
});
