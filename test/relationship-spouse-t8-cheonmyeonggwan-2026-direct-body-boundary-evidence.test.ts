import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8OpenFate2026AccessBoundaryEvidence } from '../src/research/relationship-spouse-t8-openfate-2026-access-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8Cheonmyeonggwan2026DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-cheonmyeonggwan-2026-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Cheonmyeonggwan 2026 direct-body boundary evidence', () => {
  test('pins exact public source identity and complete HTML traversal', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.publisher).toBe('천명관(天命館) / 준비스튜디오');
    expect(candidate.editorialAuthor).toBe('천명관 편집팀');
    expect(candidate.title).toBe('사주로 보는 연애운');
    expect(candidate.subtitle).toBe('배우자성·배우자궁·도화살로 읽는 인연의 흐름');
    expect(candidate.lastUpdated).toBe('2026-04-08');
    expect(candidate.frontierIssue).toBe(534);
    expect(candidate.publicUrl).toBe('https://joonbi.co.kr/guide/saju-love');
    expect(candidate.directBodyAcquisition.completeDirectHtmlBodyAcquired).toBe(true);
    expect(candidate.directBodyAcquisition.fullPageDirectTraversalPerformed).toBe(true);
    expect(candidate.directBodyAcquisition.observedHtmlLineStart).toBe(0);
    expect(candidate.directBodyAcquisition.observedHtmlLineEnd).toBe(123);
    expect(candidate.directBodyAcquisition.observedHtmlLineCount).toBe(124);
  });

  test('preserves the source modern-flexibility statement without erasing its operative sex branch', () => {
    const body = RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.modernFlexibilityAcknowledged).toBe(true);
    expect(body.traditionalMaleWealthFemaleOfficerSelectorExplicit).toBe(true);
    expect(body.modernDirectionalReframingOfWealthAndOfficerObserved).toBe(true);
    expect(body.sexConditionedSelectorReplacedByCompleteNeutralFormula).toBe(false);
    expect(body.maleWealthFemaleOfficerSummaryPreserved).toBe(true);
  });

  test('pins the relationship-timing branch as operational sex-conditioned evidence', () => {
    const body = RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.relationshipTimingLines).toBe('49-57');
    expect(body.maleWealthLuckFemaleOfficerLuckTimingBranchPreserved).toBe(true);
    expect(body.nativeSexIndependentCompleteSpouseSelectorObserved).toBe(false);
    expect(body.partnerSexIndependentCompleteSpouseSelectorObserved).toBe(false);
  });

  test('keeps Day Branch spouse palace as a sex-common positional layer only', () => {
    const body = RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.dayBranchDefinedAsSpousePalace).toBe(true);
    expect(body.spousePalaceIsSexCommonPositionalLayer).toBe(true);
    expect(body.spousePalaceReplacesSexConditionedSpouseStarSelector).toBe(false);
  });

  test('distinguishes one-person love reading from two-chart compatibility', () => {
    const body = RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.singleNativeVsCompatibilityLines).toBe('82-94');
    expect(body.singlePersonLoveReadingDistinguishedFromTwoChartCompatibility).toBe(true);
  });

  test('preserves no-guess, no-bypass and no-stitching controls', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
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

  test('chains from OpenFate and preserves the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8OpenFate2026AccessBoundaryEvidence();
    const report = buildRelationshipSpouseT8Cheonmyeonggwan2026DirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.completeDirectHtmlBodyInspected).toBe(true);
    expect(report.fullPageDirectTraversalPerformed).toBe(true);
    expect(report.directBodySemanticReviewPerformed).toBe(true);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(true);
    expect(report.modernFlexibleInterpretationObserved).toBe(true);
    expect(report.sexConditionedSpouseStarSelectorStillOperational).toBe(true);
    expect(report.sexConditionedTimingBranchStillOperational).toBe(true);
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
    const first = buildRelationshipSpouseT8Cheonmyeonggwan2026DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8Cheonmyeonggwan2026DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(first.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length);
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_CHEONMYEONGGWAN_2026_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe('DIRECT_BODY_POSITIVE_MODERN_FLEXIBLE_INTERPRETATION_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR');
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_cheonmyeonggwan_2026_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_COMPLETE_BODY_DISCOVERY_FOR_ROLE_NEUTRAL_OPERATIONAL_SELECTOR',
    );
  });
});
