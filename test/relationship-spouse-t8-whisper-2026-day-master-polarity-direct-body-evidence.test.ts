import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8SajuAtelier2026SpousePalaceDirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-saju-atelier-2026-spouse-palace-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8Whisper2026DayMasterPolarityDirectBodyEvidence,
} from '../src/research/relationship-spouse-t8-whisper-2026-day-master-polarity-direct-body-evidence.js';

describe('Relationship spouse T8 Whisper 2026 Day-Master-polarity direct-body evidence', () => {
  test('pins exact source identity and complete 99-line HTML traversal', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE;
    expect(candidate.publisher).toBe('Whisper');
    expect(candidate.title).toBe('BaZi and the Spouse Star: What the Chart Says About Relationships');
    expect(candidate.publicationDate).toBe('2026-06-08');
    expect(candidate.frontierIssue).toBe(585);
    expect(candidate.publicUrl).toBe('https://blog.whisper.day/divination/bazi/bazi-spouse-star-relationships/');
    expect(candidate.directBodyAcquisition.completeDirectHtmlBodyAcquired).toBe(true);
    expect(candidate.directBodyAcquisition.fullPageDirectTraversalPerformed).toBe(true);
    expect(candidate.directBodyAcquisition.observedHtmlLineStart).toBe(0);
    expect(candidate.directBodyAcquisition.observedHtmlLineEnd).toBe(98);
    expect(candidate.directBodyAcquisition.observedHtmlLineCount).toBe(99);
  });

  test('pins the executable Day-Master-polarity spouse-star selector', () => {
    const body = RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE.directBodyEvidence;
    expect(body.spouseStarSelectorLines).toBe('41-48');
    expect(body.yangDayMasters).toEqual(['甲', '丙', '戊', '庚', '壬']);
    expect(body.yinDayMasters).toEqual(['乙', '丁', '己', '辛', '癸']);
    expect(body.yangDayMasterSpouseStar).toBe('INDIRECT_WEALTH');
    expect(body.yangDayMasterSpouseStarChinese).toBe('偏財');
    expect(body.yinDayMasterSpouseStar).toBe('INDIRECT_POWER');
    expect(body.yinDayMasterSpouseStarChinese).toBe('偏官');
    expect(body.dayMasterPolaritySelectorExplicit).toBe(true);
    expect(body.selectorDerivedFromNativeDayMaster).toBe(true);
    expect(body.selectorLocatedAcrossSameNatalChart).toBe(true);
  });

  test('proves selector independence from native sex, partner sex, orientation, and second-chart input', () => {
    const body = RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE.directBodyEvidence;
    expect(body.singleNativeSelector).toBe(true);
    expect(body.natalFactsOnlySelector).toBe(true);
    expect(body.nativeSexInputRequired).toBe(false);
    expect(body.partnerSexInputRequired).toBe(false);
    expect(body.orientationInputRequired).toBe(false);
    expect(body.secondChartInputRequired).toBe(false);
  });

  test('pins operational reuse in timing and no complete-body return to a required male/female selector', () => {
    const body = RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE.directBodyEvidence;
    expect(body.timingLines).toBe('49-55');
    expect(body.selectorReusedInTimingProcedure).toBe(true);
    expect(body.completeBodyReactivatesMaleWealthFemaleOfficerBranch).toBe(false);
    expect(body.modernCloseRomanticPartnershipScopeObserved).toBe(true);
    expect(body.schoolDependentConventionCaveatObserved).toBe(true);
    expect(body.scientificallyValidatedByThisEvidence).toBe(false);
    expect(body.universallyClassicalByThisEvidence).toBe(false);
  });

  test('preserves no-guess, no-bypass and no-stitching controls', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE;
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

  test('chains from Saju Atelier two-of-five state and closes only explicit role-neutral natal mapping', () => {
    const upstream = buildRelationshipSpouseT8SajuAtelier2026SpousePalaceDirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8Whisper2026DayMasterPolarityDirectBodyEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.completeDirectHtmlBodyInspected).toBe(true);
    expect(report.fullPageDirectTraversalPerformed).toBe(true);
    expect(report.directBodySemanticReviewPerformed).toBe(true);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(true);
    expect(report.operationalDayMasterPolaritySelectorObserved).toBe(true);
    expect(report.singleNativeSelectorEstablished).toBe(true);
    expect(report.natalFactsOnlySelectorEstablished).toBe(true);
    expect(report.nativeSexIndependentCompleteSelectorEstablished).toBe(true);
    expect(report.partnerSexIndependentCompleteSelectorEstablished).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(true);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(3);
    expect(report.authorityGapsOpenCount).toBe(2);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps the full control set and deterministic content address', () => {
    const first = buildRelationshipSpouseT8Whisper2026DayMasterPolarityDirectBodyEvidence();
    const second = buildRelationshipSpouseT8Whisper2026DayMasterPolarityDirectBodyEvidence();
    const { evidenceId, ...material } = first;
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CONTROL_IDS);
    expect(first.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CONTROL_IDS.length);
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_EVIDENCE_VERSION);
    expect(first.status).toBe(
      'DIRECT_BODY_DAY_MASTER_POLARITY_SPOUSE_SELECTOR_POSITIVE_EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_whisper_2026_day_master_polarity_direct_body_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'GOVERN_REPOSITORY_OWNED_SEMANTIC_CORRESPONDENCE_FOR_ADMITTED_ROLE_NEUTRAL_SELECTOR',
    );
  });
});
