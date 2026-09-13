import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeNamyeonKimKiseung2022AccessBoundaryEvidence } from '../src/research/relationship-spouse-t8-lee-namyeon-kim-kiseung-2022-access-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-jeon-jeonghun-training-manual-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Jeon Jeonghun training-manual direct-body boundary evidence', () => {
  test('pins the public institutional training-manual identity without upgrading its source class', () => {
    const candidate =
      RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.authorInstructor).toBe('전정훈');
    expect(candidate.title).toBe('명리심리상담사 강의교안');
    expect(candidate.distributor).toBe('사회교육중앙회 / 한국평생교육인증원');
    expect(candidate.course).toBe('명리심리상담사 4주 과정');
    expect(candidate.sourceClass).toBe('PUBLIC_INSTITUTIONAL_TRAINING_MANUAL');
    expect(candidate.peerReviewed).toBe(false);
    expect(candidate.independentNormativeScholarlyAuthority).toBe(false);
    expect(candidate.frontierIssue).toBe(515);
    expect(candidate.courseIdentityEvidence.instructorIdentifiedAsJeonJeonghun).toBe(true);
    expect(candidate.courseIdentityEvidence.lesson8YukchinClassificationAndPsychologyObserved).toBe(true);
    expect(candidate.courseIdentityEvidence.lesson11PalacePsychologyObserved).toBe(true);
  });

  test('pins complete 132-page render coverage while refusing to invent binary hash provenance', () => {
    const candidate =
      RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.physicalPdfPageCount).toBe(132);
    expect(candidate.printedPageRange).toBe('1-131');
    expect(candidate.publicViewerCompletePdfOpened).toBe(true);
    expect(candidate.directBodyTextIndexed).toBe(true);
    expect(candidate.renderFirstReviewCompleted).toBe(true);
    expect(candidate.renderedPhysicalPageCount).toBe(132);
    expect(candidate.remainingRenderMissPhysicalPages).toEqual([]);
    expect(candidate.decisivePagesVisuallyReviewed).toBe(true);
    expect(candidate.contentAddressedBinaryAcquisitionReproducedInConnectedContainer).toBe(false);
    expect(candidate.pdfSha256).toBeNull();
    expect(candidate.pdfBytes).toBeNull();
    expect(candidate.binaryHashOrByteLengthInvented).toBe(false);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate =
      RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.decisivePageMap).toContainEqual({
      printedPage: 72,
      physicalPdfPage: 73,
      topic:
        'Yukchin chapter defines spouse/family roles and explicitly directs judging palace success or failure before Star/Yukchin while warning against palace-only judgment',
    });
    expect(candidate.decisivePageMap).toContainEqual({
      printedPage: 104,
      physicalPdfPage: 105,
      topic:
        'palace chapter explicitly identifies Day Branch as spouse palace without a native-sex branch',
    });
    expect(candidate.decisivePageMap).toContainEqual({
      printedPage: 118,
      physicalPdfPage: 119,
      topic:
        'late summary table still maps Wealth to father/wife and Officer to husband/child, preserving sex-conditioned spouse semantics after the palace chapter',
    });
  });

  test('preserves the sex-common spouse-palace location and operational layer as positive evidence', () => {
    const candidate =
      RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.dayBranchExplicitlySpousePalace).toBe(true);
    expect(candidate.sexCommonSpousePalaceLocationLayer).toBe(true);
    expect(candidate.operationalSpousePalaceReadingObserved).toBe(true);
    expect(candidate.spousePalaceClashOperationalReadingObserved).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/Day Branch is spouse palace/i);
  });

  test('preserves the source-authored palace plus Yukchin boundary and sex-conditioned blockers', () => {
    const candidate =
      RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.palaceAndYukchinDeclaredSeparateCombinedLayers).toBe(true);
    expect(candidate.palaceOnlyJudgmentDeclaredInsufficient).toBe(true);
    expect(candidate.maleWealthWifeMappingObserved).toBe(true);
    expect(candidate.femaleOfficerHusbandMappingObserved).toBe(true);
    expect(candidate.sexConditionedYukchinLayerRetained).toBe(true);
    expect(candidate.laterAppliedMaterialRetainsSexConditionedSpouseSemantics).toBe(true);
    expect(candidate.palaceDeclaredReplacementForYukchinLayer).toBe(false);
    expect(candidate.neutralReplacementSpouseSelectorFound).toBe(false);
    expect(candidate.nativeSexIndependentCompleteSpouseSelector).toBe(false);
    expect(candidate.partnerSexIndependentCompleteSpouseSelector).toBe(false);
    expect(candidate.singleNativeNatalFactsOnlyCompleteSpouseSelector).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/sex-conditioned Yukchin spouse roles/i);
  });

  test('chains from the latest closed Spouse T8 boundary without changing the two-of-five ledger', () => {
    const upstream = buildRelationshipSpouseT8LeeNamyeonKimKiseung2022AccessBoundaryEvidence();
    const report = buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.directFulltextPdfInspected).toBe(true);
    expect(report.renderFirstReviewCompleted).toBe(true);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(true);
    expect(report.roleNeutralSpousePalaceLocationLayerConfirmed).toBe(true);
    expect(report.operationalSpousePalaceReadingConfirmed).toBe(true);
    expect(report.sexConditionedYukchinLayerConfirmed).toBe(true);
    expect(report.completeRoleNeutralSpouseSelectorRejectedForThisSource).toBe(true);
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

  test('keeps no-bypass, no-stitching, and all production gates fail-closed', () => {
    const candidate =
      RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence();
    expect(candidate.guessedOpaqueIdentifierCount).toBe(0);
    expect(candidate.loginBypass).toBe(false);
    expect(candidate.institutionAuthBypass).toBe(false);
    expect(candidate.paywallBypass).toBe(false);
    expect(candidate.drmRequestExecuted).toBe(false);
    expect(candidate.decryptionActionExecuted).toBe(false);
    expect(candidate.tlsVerificationDisabled).toBe(false);
    expect(candidate.crossSourceSemanticStitching).toBe(false);
    expect(candidate.noStitchingBoundary).toMatch(/evaluated only within this manual/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length,
    );
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_JEON_JEONGHUN_TRAINING_MANUAL_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.status).toBe(
      'DIRECT_BODY_POSITIVE_SPOUSE_PALACE_OPERATIONAL_LAYER_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_jeon_jeonghun_training_manual_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_COMPLETE_ROLE_NEUTRAL_SPOUSE_SELECTOR_DISCOVERY_WITHOUT_REPEATING_DAY_BRANCH_ONLY_CANDIDATES',
    );
  });
});
