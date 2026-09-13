import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8YangSoyong2025AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-yang-soyong-2025-access-boundary-evidence.js';

describe('Relationship spouse T8 Yang Soyong 2025 access boundary evidence', () => {
  test('pins exact doctoral-thesis identity and public discovery identifiers', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('양소용');
    expect(c.publicationYear).toBe(2025);
    expect(c.title).toBe('간지의 상징성과 운동성에 근거한 사주팔자 해석');
    expect(c.institution).toBe('영남대학교 대학원');
    expect(c.degreeType).toBe('학위논문(박사)');
    expect(c.dbpiaNodeId).toBe('T17189731');
    expect(c.frontierIssue).toBe(506);
  });

  test('pins the strongest discovery-only methodology signals without promoting them to body evidence', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.discoverySignals.dayStemToAllEightGanjiInterpretiveSubjectExpansionObservedInPublicAbstract).toBe(true);
    expect(c.discoverySignals.yukchinRelationalInterpretationChapterObservedInPublicToc).toBe(true);
    expect(c.discoverySignals.yukchinFixedElementSectionPrintedPage).toBe(152);
    expect(c.discoverySignals.yukchinInstabilityAndBranchRelationSectionPrintedPage).toBe(155);
    expect(c.discoverySignals.ganjiMobilityYukchinRelationSectionPrintedPage).toBe(160);
    expect(c.discoverySignals.annualYukchinChangeInterpretationSectionPrintedPage).toBe(186);
    expect(c.discoverySignals.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.discoverySignals.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
  });

  test('pins the current public access boundary without invoking login or guessing a body target', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.currentAccessBoundary.dbpiaExternalLinkObserved).toBe(true);
    expect(c.currentAccessBoundary.dbpiaExternalLinkRequiresPersonalLogin).toBe(true);
    expect(c.currentAccessBoundary.dbpiaPersonalLoginInvoked).toBe(false);
    expect(c.currentAccessBoundary.digitalJiphyeonjeonExactRecordObserved).toBe(true);
    expect(c.currentAccessBoundary.digitalJiphyeonjeonSourceButtonObserved).toBe(true);
    expect(c.currentAccessBoundary.digitalJiphyeonjeonDirectCompleteBodyTargetExposedByInspectedPublicText).toBe(false);
    expect(c.currentAccessBoundary.nationalAssemblyExactDoctoralHoldingObserved).toBe(true);
    expect(c.currentAccessBoundary.nationalAssemblyCallNumber).toBe('TD 951 -25-28');
    expect(c.currentAccessBoundary.nationalAssemblyDirectPublicElectronicBodyObserved).toBe(false);
    expect(c.currentAccessBoundary.currentSiteAuthoredDirectCompleteBodyUrlObserved).toBe(false);
  });

  test('records strict no-bypass and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.tlsVerificationDisabled).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
    expect(c.laterCommercialMonographUsedAsBodyEvidence).toBe(false);
  });

  test('makes no body-level semantic decision because no complete body was acquired', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(c.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(c.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(c.relationshipT6InputGapClosedByThisEvidence).toBe(false);
  });

  test('preserves the exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8YangSoyong2025AccessBoundaryEvidence();
    expect(report.status).toBe('PUBLIC_DISCOVERY_EXTERNAL_LINK_LOGIN_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION');
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.exactPublicIdentityAndAccessBoundaryInspected).toBe(true);
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact permanent material', () => {
    const report = buildRelationshipSpouseT8YangSoyong2025AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_YANG_SOYONG_2025_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_yang_soyong_2025_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_ACCESS_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
