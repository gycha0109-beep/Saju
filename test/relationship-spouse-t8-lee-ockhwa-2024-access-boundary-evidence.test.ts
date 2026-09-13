import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence } from '../src/research/relationship-spouse-t8-yoon-sangheum-2023-access-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-ockhwa-2024-access-boundary-evidence.js';

describe('Relationship spouse T8 Lee Ockhwa 2024 access-boundary evidence', () => {
  test('pins exact article identity', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('이옥화');
    expect(candidate.publicationYear).toBe(2024);
    expect(candidate.title).toBe('명리사상에 나타난 육친가변성');
    expect(candidate.journal).toBe('역사와 융합');
    expect(candidate.volume).toBe(8);
    expect(candidate.issue).toBe(6);
    expect(candidate.serialIssue).toBe(23);
    expect(candidate.printedPages).toBe('177-208');
    expect(candidate.physicalPageCountExpected).toBe(32);
    expect(candidate.doi).toBe('10.55793/jkhc.2024.23.177');
    expect(candidate.kciArticleId).toBe('ART003150783');
    expect(candidate.frontierIssue).toBe(528);
  });

  test('keeps Yukchin variability and spouse language at discovery level only', () => {
    const signal = RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CANDIDATE.candidateDiscoverySignal;
    expect(signal.yukchinVariabilityExplicitlyStudied).toBe(true);
    expect(signal.positionFunctionAndActionVariabilityObservedInAbstract).toBe(true);
    expect(signal.englishAbstractContainsSelfAndSpouseIlmyeongSignal).toBe(true);
    expect(signal.paperStatedFocusParentsAndChildren).toBe(true);
    expect(signal.titleAbstractKeywordsOrMetadataTreatedAsBodyEvidence).toBe(false);
    expect(signal.spouseSelectorAdmissionOrRejectionInferredFromDiscoveryMetadata).toBe(false);
  });

  test('pins public provider boundaries without manufacturing access', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.providerEvidence.kciExactArticleIdentityObserved).toBe(true);
    expect(candidate.providerEvidence.kciCompletePublicBodyObserved).toBe(false);
    expect(candidate.providerEvidence.researchGateNoFullTextAvailableObserved).toBe(true);
    expect(candidate.providerEvidence.researchGateRequestFullTextPdfObserved).toBe(true);
    expect(candidate.providerEvidence.kyoboScholarPaidPdfOrSubscriptionObserved).toBe(true);
    expect(candidate.providerEvidence.rissPaidFulltextLabelObserved).toBe(true);
    expect(candidate.providerEvidence.rissConcreteArticleControlNumberObserved).toBe(false);
    expect(candidate.providerEvidence.nationalAssemblyLibraryRemotePublicCompleteBodyObserved).toBe(false);
    expect(candidate.providerEvidence.digitalJiphyeonjeonCompletePublicBodyObserved).toBe(false);
    expect(candidate.currentAccessBoundary.publicSearchRecoveredCompletePdf).toBe(false);
    expect(candidate.currentAccessBoundary.publicSearchRecoveredCompleteHtmlBody).toBe(false);
  });

  test('freezes no-body disposition without semantic inference', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.completePdfAcquired).toBe(false);
    expect(candidate.renderedPageCount).toBe(0);
    expect(candidate.directBodySemanticReviewPerformed).toBe(false);
    expect(candidate.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(candidate.semanticDisposition).toBe('PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION');
    expect(candidate.exactBoundary).toMatch(/No complete body was acquired/i);
  });

  test('preserves no-guess, no-bypass and no-stitching controls', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.guessedOpaqueIdentifierCount).toBe(0);
    expect(candidate.loginBypass).toBe(false);
    expect(candidate.sessionBypass).toBe(false);
    expect(candidate.institutionAuthBypass).toBe(false);
    expect(candidate.paywallBypass).toBe(false);
    expect(candidate.drmRequestExecuted).toBe(false);
    expect(candidate.decryptionActionExecuted).toBe(false);
    expect(candidate.tlsVerificationDisabled).toBe(false);
    expect(candidate.crossSourceSemanticStitching).toBe(false);
  });

  test('chains from Yoon #523 and preserves the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence();
    const report = buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
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

  test('keeps the complete control set active', () => {
    const report = buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence();
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_CONTROL_IDS.length);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence();
    const second = buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe('PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION');
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_ockhwa_2024_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_COMPLETE_ROLE_NEUTRAL_SPOUSE_SELECTOR_DISCOVERY_WITH_PUBLIC_DIRECT_BODY_PRIORITY',
    );
  });
});
