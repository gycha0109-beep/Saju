import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8Cheonmyeonggwan2026DirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-cheonmyeonggwan-2026-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8SajuWorks2026DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-saju-works-2026-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Saju Works 2026 direct-body boundary evidence', () => {
  test('pins exact source identity and complete HTML traversal', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.publisher).toBe('Saju Works');
    expect(candidate.title).toBe('Love & Marriage in Saju — Wealth, Officer, the Spouse Palace & Peach Blossom');
    expect(candidate.publicationDate).toBe('2026-07-02');
    expect(candidate.frontierIssue).toBe(536);
    expect(candidate.publicUrl).toBe('https://www.sajuworks.com/en/learn/love-marriage-saju');
    expect(candidate.directBodyAcquisition.completeDirectHtmlBodyAcquired).toBe(true);
    expect(candidate.directBodyAcquisition.fullPageDirectTraversalPerformed).toBe(true);
    expect(candidate.directBodyAcquisition.observedHtmlLineStart).toBe(0);
    expect(candidate.directBodyAcquisition.observedHtmlLineEnd).toBe(102);
    expect(candidate.directBodyAcquisition.observedHtmlLineCount).toBe(103);
  });

  test('pins the operative sex-conditioned spouse-star selector', () => {
    const body = RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.spouseStarAndPalaceLines).toBe('26-31');
    expect(body.maleWealthSpouseRuleExplicit).toBe(true);
    expect(body.femaleOfficerSpouseRuleExplicit).toBe(true);
    expect(body.roleNeutralReplacementSelectorObserved).toBe(false);
    expect(body.nativeSexIndependentCompleteSpouseSelectorObserved).toBe(false);
    expect(body.partnerSexIndependentCompleteSpouseSelectorObserved).toBe(false);
  });

  test('keeps Day Branch spouse palace as positional evidence only', () => {
    const body = RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.dayBranchDefinedAsSpousePalace).toBe(true);
    expect(body.spousePalaceIsSexCommonPositionalLayer).toBe(true);
    expect(body.spousePalaceReplacesSexConditionedSpouseStarSelector).toBe(false);
  });

  test('pins timing, worked examples, and final self-reading as surviving operational sex branches', () => {
    const body = RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.marriageTimingLines).toBe('45-51');
    expect(body.workedExamplesLines).toBe('52-56');
    expect(body.selfReadingProcedureLines).toBe('57-59');
    expect(body.maleWealthLuckFemaleOfficerLuckTimingBranchPreserved).toBe(true);
    expect(body.maleWealthWorkedExampleObserved).toBe(true);
    expect(body.femaleOfficerSevenKillingsWorkedExampleObserved).toBe(true);
    expect(body.finalSelfReadingProcedureRequiresWealthIfMaleOfficerIfFemale).toBe(true);
  });

  test('preserves no-guess, no-bypass and no-stitching controls', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
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

  test('chains from Cheonmyeonggwan and preserves the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8Cheonmyeonggwan2026DirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8SajuWorks2026DirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.completeDirectHtmlBodyInspected).toBe(true);
    expect(report.fullPageDirectTraversalPerformed).toBe(true);
    expect(report.directBodySemanticReviewPerformed).toBe(true);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(true);
    expect(report.sexConditionedSpouseStarSelectorStillOperational).toBe(true);
    expect(report.sexConditionedTimingBranchStillOperational).toBe(true);
    expect(report.sexConditionedFinalSelfReadingProcedureStillOperational).toBe(true);
    expect(report.dayBranchSpousePalaceOperationalLayerObserved).toBe(true);
    expect(report.nativeSexIndependentCompleteSelectorEstablished).toBe(false);
    expect(report.partnerSexIndependentCompleteSelectorEstablished).toBe(false);
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

  test('keeps the full control set and deterministic content address', () => {
    const first = buildRelationshipSpouseT8SajuWorks2026DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8SajuWorks2026DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(first.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length);
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_SAJU_WORKS_2026_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe(
      'DIRECT_BODY_OPERATIONAL_GENDERED_SPOUSE_STAR_AND_TIMING_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_saju_works_2026_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_COMPLETE_BODY_DISCOVERY_FOR_ROLE_NEUTRAL_OPERATIONAL_SELECTOR',
    );
  });
});
