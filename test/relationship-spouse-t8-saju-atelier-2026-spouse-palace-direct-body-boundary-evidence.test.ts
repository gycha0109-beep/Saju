import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8SajunareumAdvanced17AccessBoundaryEvidence } from '../src/research/relationship-spouse-t8-sajunareum-advanced-17-access-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8SajuAtelier2026SpousePalaceDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-saju-atelier-2026-spouse-palace-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Saju Atelier 2026 spouse-palace direct-body boundary evidence', () => {
  test('pins exact source identity and complete 120-line HTML traversal', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.publisher).toBe('Saju Atelier');
    expect(candidate.title).toBe(
      'Your Future Spouse Is Already in Your Chart: The Spouse Palace and the Marriage Star',
    );
    expect(candidate.observedCopyrightYear).toBe(2026);
    expect(candidate.publicationDateObserved).toBe(false);
    expect(candidate.frontierIssue).toBe(580);
    expect(candidate.publicUrl).toBe(
      'https://sajuatelier.com/library/journal/spouse-palace-marriage-star-saju',
    );
    expect(candidate.directBodyAcquisition.completeDirectHtmlBodyAcquired).toBe(true);
    expect(candidate.directBodyAcquisition.fullPageDirectTraversalPerformed).toBe(true);
    expect(candidate.directBodyAcquisition.observedHtmlLineStart).toBe(0);
    expect(candidate.directBodyAcquisition.observedHtmlLineEnd).toBe(119);
    expect(candidate.directBodyAcquisition.observedHtmlLineCount).toBe(120);
  });

  test('pins spouse palace plus spouse star as the source complete-reading structure', () => {
    const body =
      RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.twoThreadCompleteReadingLines).toBe('22-27');
    expect(body.completeReadingRequiresPalaceAndStar).toBe(true);
    expect(body.spousePalaceLines).toBe('31-37');
    expect(body.dayBranchDefinedAsSpousePalace).toBe(true);
    expect(body.spousePalaceIsSexCommonPositionalLayer).toBe(true);
    expect(body.spousePalaceReplacesSexConditionedSpouseStarSelector).toBe(false);
  });

  test('preserves the explicit male-Wealth female-Officer calculation base', () => {
    const body =
      RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.spouseStarCalculationLines).toBe('39-47');
    expect(body.maleWealthSpouseRuleExplicit).toBe(true);
    expect(body.femaleOfficerSpouseRuleExplicit).toBe(true);
    expect(body.genderedCalculationBaseExplicitlyStaysFixed).toBe(true);
    expect(body.faqSpouseStarLines).toBe('84-92');
    expect(body.faqRepeatsGenderedCalculationBaseStaysSame).toBe(true);
    expect(body.nativeSexIndependentCompleteSpouseSelectorObserved).toBe(false);
    expect(body.partnerSexIndependentCompleteSpouseSelectorObserved).toBe(false);
    expect(body.roleNeutralReplacementSelectorObserved).toBe(false);
  });

  test('keeps flexible modern partner language distinct from role-neutral selector authority', () => {
    const body =
      RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.flexiblePartnerLanguageAcrossGendersAndOrientationsObserved).toBe(true);
    expect(body.genderedCalculationBaseExplicitlyStaysFixed).toBe(true);
    expect(body.roleNeutralReplacementSelectorObserved).toBe(false);
  });

  test('pins the single-native reading boundary separately from two-chart compatibility', () => {
    const body =
      RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE.directBodyEvidence;
    expect(body.singleChartBoundaryLines).toBe('66-72');
    expect(body.faqSingleChartBoundaryLines).toBe('100-101');
    expect(body.singleNativeMarriageReadingExplicitlyDistinguishedFromCompatibility).toBe(true);
  });

  test('preserves no-guess, no-bypass and no-stitching controls', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CANDIDATE;
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

  test('chains from Sajunareum and preserves the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8SajunareumAdvanced17AccessBoundaryEvidence();
    const report = buildRelationshipSpouseT8SajuAtelier2026SpousePalaceDirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.completeDirectHtmlBodyInspected).toBe(true);
    expect(report.fullPageDirectTraversalPerformed).toBe(true);
    expect(report.directBodySemanticReviewPerformed).toBe(true);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(true);
    expect(report.completeReadingRequiresPalaceAndStar).toBe(true);
    expect(report.dayBranchSpousePalaceOperationalLayerObserved).toBe(true);
    expect(report.flexiblePartnerLanguageObserved).toBe(true);
    expect(report.sexConditionedSpouseStarCalculationBaseStillOperational).toBe(true);
    expect(report.faqRepeatsGenderedCalculationBase).toBe(true);
    expect(report.singleNativeMarriageReadingBoundaryObserved).toBe(true);
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
    const first = buildRelationshipSpouseT8SajuAtelier2026SpousePalaceDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8SajuAtelier2026SpousePalaceDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length,
    );
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_SAJU_ATELIER_2026_SPOUSE_PALACE_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.status).toBe(
      'DIRECT_BODY_FLEXIBLE_PARTNER_LANGUAGE_BUT_GENDERED_CALCULATION_BASE_PRESERVED_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_saju_atelier_2026_spouse_palace_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_COMPLETE_BODY_DISCOVERY_FOR_ROLE_NEUTRAL_OPERATIONAL_SELECTOR',
    );
  });
});
