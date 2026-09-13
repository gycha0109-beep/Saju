import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeNamyeonKimKiseung2022AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-namyeon-kim-kiseung-2022-access-boundary-evidence.js';

describe('Relationship spouse T8 Lee Namyeon Kim Kiseung 2022 access boundary evidence', () => {
  test('pins exact scholarly identity and provider identifiers', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.authors).toEqual(['이남연', '김기승']);
    expect(c.publicationYear).toBe(2022);
    expect(c.title).toBe('명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구');
    expect(c.journal).toBe('산업진흥연구');
    expect(c.kciArticleId).toBe('ART002810441');
    expect(c.doi).toBe('10.21186/IPR.2022.7.1.025');
    expect(c.rissControlNo).toBe('6fdd5367a44d74fcb7998d826d417196');
    expect(c.kissKey).toBe('3931264');
    expect(c.frontierIssue).toBe(511);
  });

  test('pins only site-authored free-provider and DOI redirect evidence', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.providerEvidence.rissScienceOnProviderObserved).toBe(true);
    expect(c.providerEvidence.rissScienceOnMarkedFreeProvider).toBe(true);
    expect(c.providerEvidence.kciPublisherSearchPdfScienceOnObserved).toBe(true);
    expect(c.providerEvidence.doiRedirectObserved).toBe(true);
    expect(c.providerEvidence.doiAuthoredKoreaScienceRecord).toBe(
      'http://koreascience.or.kr/journal/view.jsp?kj=SOJHB6&py=2022&vnc=v7n1&sp=25',
    );
    expect(c.providerEvidence.koreaScienceJournalCode).toBe('SOJHB6');
    expect(c.providerEvidence.koreaScienceVolumeIssue).toBe('v7n1');
    expect(c.providerEvidence.koreaScienceStartPage).toBe(25);
    expect(c.providerEvidence.koreaScienceIdentifiersGuessed).toBe(false);
    expect(c.providerEvidence.jamsExactArticleRowObserved).toBe(true);
  });

  test('pins current provider tooling boundary without claiming body acquisition', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.currentAccessBoundary.rissScienceOnProviderClickCompleted).toBe(false);
    expect(c.currentAccessBoundary.rissScienceOnProviderClickFailureClass).toBe('SCIENCEON_HOST_TIMEOUT');
    expect(c.currentAccessBoundary.doiExactKoreaScienceRedirectResolved).toBe(true);
    expect(c.currentAccessBoundary.webHttpRedirectFollowed).toBe(false);
    expect(c.currentAccessBoundary.webHttpsTransportEquivalentOpened).toBe(false);
    expect(c.currentAccessBoundary.containerExternalDnsAvailableForKoreaScience).toBe(false);
    expect(c.currentAccessBoundary.kciConcreteOriginalFileIdentifierObserved).toBe(false);
    expect(c.currentAccessBoundary.jamsArticleSpecificBodyHrefObservedOnInspectedPublicText).toBe(false);
    expect(c.currentAccessBoundary.currentDirectCompleteBodyAcquired).toBe(false);
  });

  test('keeps abstract and provider metadata below body-evidence level', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.discoveryScopeSignal.tenGodsYukchinHistoricalFormationStudied).toBe(true);
    expect(c.discoveryScopeSignal.modernTenGodConceptExpansionStudied).toBe(true);
    expect(c.discoveryScopeSignal.psychologyAndNatalAptitudeExpansionObservedInAbstract).toBe(true);
    expect(c.discoveryScopeSignal.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.discoveryScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
  });

  test('records strict no-guess no-bypass and no-stitching boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.tlsVerificationDisabled).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('preserves exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8LeeNamyeonKimKiseung2022AccessBoundaryEvidence();
    expect(report.status).toBe('PUBLIC_FREE_PROVIDER_TOOLING_TRANSPORT_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION');
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.exactPublicIdentityAndProviderBoundaryInspected).toBe(true);
    expect(report.directFulltextPdfInspected).toBe(false);
    expect(report.directBodySemanticReviewPerformed).toBe(false);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(false);
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
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CONTROL_IDS,
    );
  });

  test('is content-addressed from exact permanent material', () => {
    const report = buildRelationshipSpouseT8LeeNamyeonKimKiseung2022AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_namyeon_kim_kiseung_2022_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_ACCESS_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
