import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-jeon-jeonghun-training-manual-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-yoon-sangheum-2023-access-boundary-evidence.js';

describe('Relationship spouse T8 Yoon Sangheum 2023 access-boundary evidence', () => {
  test('pins exact scholarly candidate identity and public provider identifiers', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('윤상흠');
    expect(candidate.publicationYear).toBe(2023);
    expect(candidate.title).toBe(
      '성역할과 유전자 관점의 육친론 ― 남명 기준의 財星과 官星을 위주로 ―',
    );
    expect(candidate.journal).toBe('동방문화와 사상');
    expect(candidate.issue).toBe(15);
    expect(candidate.printedPages).toBe('33-55');
    expect(candidate.doi).toBe('10.35203/EACT.2023.15.33');
    expect(candidate.kciArticleId).toBe('ART003042567');
    expect(candidate.rissControlNo).toBe('37b95c18ae24bef64884a65323211ff0');
    expect(candidate.koreascholarDetailKey).toBe('428909');
    expect(candidate.frontierIssue).toBe(523);
  });

  test('uses gender-role Yukchin metadata only to prioritize discovery, never as body evidence', () => {
    const signal =
      RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CANDIDATE.candidateDiscoverySignal;
    expect(signal.yukchinTheoryExplicitlyStudied).toBe(true);
    expect(signal.genderRoleExplicitlyStudied).toBe(true);
    expect(signal.jaesungAndKwansungPlacementExplicitlyStudied).toBe(true);
    expect(signal.titleExplicitlyScopesStudyToMaleNative).toBe(true);
    expect(signal.candidatePrioritizedBeyondSpousePalaceOnlyMaterial).toBe(true);
    expect(signal.titleAbstractOrKeywordsTreatedAsBodyEvidence).toBe(false);
    expect(signal.spouseSelectorAdmissionOrRejectionInferredFromTitleOrAbstract).toBe(false);
  });

  test('pins the legitimate provider chain and the public-access stop points', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.providerEvidence.kciExactArticleIdentityObserved).toBe(true);
    expect(candidate.providerEvidence.kciPreviewControlLabelObserved).toBe(true);
    expect(candidate.providerEvidence.kciArticleSpecificStaticPublicPreviewHrefObserved).toBe(false);
    expect(candidate.providerEvidence.kciArticleSpecificConcreteOriginalFileIdentifierObserved).toBe(false);
    expect(candidate.providerEvidence.rissExactArticleIdentityObserved).toBe(true);
    expect(candidate.providerEvidence.rissProviderKoreascholarObserved).toBe(true);
    expect(candidate.providerEvidence.rissPaidFulltextLabelObservedOnPublicSearchSurface).toBe(true);
    expect(candidate.providerEvidence.koreascholarInstitutionSubscriptionOrIndividualPurchaseRequired).toBe(true);
    expect(candidate.providerEvidence.dbpiaCompletePublicBodyObserved).toBe(false);
    expect(candidate.providerEvidence.nationalAssemblyLibraryRemotePublicCompleteBodyObserved).toBe(false);
    expect(candidate.currentAccessBoundary.publicSearchRecoveredCompletePdf).toBe(false);
    expect(candidate.currentAccessBoundary.publicSearchRecoveredCompleteHtmlBody).toBe(false);
    expect(candidate.currentAccessBoundary.connectedContainerExternalDnsAvailableForKci).toBe(false);
    expect(candidate.currentAccessBoundary.publisherProviderRequiresInstitutionOrPurchase).toBe(true);
  });

  test('freezes no-body disposition without semantic inference', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.completePdfAcquired).toBe(false);
    expect(candidate.renderedPageCount).toBe(0);
    expect(candidate.directBodySemanticReviewPerformed).toBe(false);
    expect(candidate.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(candidate.semanticDisposition).toBe('PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION');
    expect(candidate.exactBoundary).toMatch(/No complete body was acquired/i);
  });

  test('preserves no-guess, no-bypass, and no-stitching controls', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.guessedOpaqueIdentifierCount).toBe(0);
    expect(candidate.loginBypass).toBe(false);
    expect(candidate.sessionBypass).toBe(false);
    expect(candidate.institutionAuthBypass).toBe(false);
    expect(candidate.paywallBypass).toBe(false);
    expect(candidate.drmRequestExecuted).toBe(false);
    expect(candidate.decryptionActionExecuted).toBe(false);
    expect(candidate.tlsVerificationDisabled).toBe(false);
    expect(candidate.crossSourceSemanticStitching).toBe(false);
    expect(candidate.noStitchingBoundary).toMatch(/not combined/i);
  });

  test('chains from Jeon #515 without changing the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
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
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps the full control set active', () => {
    const report = buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence();
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CONTROL_IDS.length,
    );
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence();
    const second = buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.status).toBe('PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION');
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_yoon_sangheum_2023_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_COMPLETE_ROLE_NEUTRAL_SPOUSE_SELECTOR_DISCOVERY_WITH_PUBLIC_DIRECT_BODY_PRIORITY',
    );
  });
});
