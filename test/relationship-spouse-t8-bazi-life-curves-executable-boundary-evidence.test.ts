import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8SajuWorks2026DirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-saju-works-2026-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8BaziLifeCurvesExecutableBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-bazi-life-curves-executable-boundary-evidence.js';

describe('Relationship spouse T8 bazi-life-curves executable boundary evidence', () => {
  test('pins the exact external repository commit and provenance blobs', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CANDIDATE;
    expect(candidate.sourceRepository).toBe('XiaoChu-1208/bazi-life-curves');
    expect(candidate.frontierIssue).toBe(540);
    expect(candidate.license).toBe('MIT');
    expect(candidate.exactUpstreamMainSha).toBe(
      'ad8fdeceac3d74b9682ce1df362e7a497dc91d2c',
    );
    expect(candidate.provenance.citationBlobSha).toBe(
      'ef8f0e605bc7cf8a9a3df629907476015950b215',
    );
    expect(candidate.provenance.fairnessProtocolBlobSha).toBe(
      'caf3b33f0a265bb9e441050fdeca7f7a4e3aead0',
    );
    expect(candidate.provenance.scoreCurvesBlobSha).toBe(
      '710c37899b77b9583d265e32f9a6b3f004a59159',
    );
    expect(candidate.provenance.solveBaziBlobSha).toBe(
      '13a3b43e37b8d7ea0e5cfe8ce2d5a49540da0b6a',
    );
    expect(candidate.provenance.orientationCoverageTestBlobSha).toBe(
      'dfa4a34bfc286f4627de0c5b59b0b9ec07676a36',
    );
    expect(candidate.provenance.genderSymmetryTestBlobSha).toBe(
      'f466b4307cabcb3c3dd0dd5fa1c7a276f545bb78',
    );
  });

  test('fails closed on mutable version metadata and uses immutable provenance identity', () => {
    const provenance =
      RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CANDIDATE.provenance;
    expect(provenance.citationVersion).toBe('7.4');
    expect(provenance.citationReleaseDate).toBe('2026-04-20');
    expect(provenance.upstreamCommitLabelObserved).toBe('v9.6');
    expect(provenance.versionMetadataConsistent).toBe(false);
    expect(provenance.exactCommitAndBlobIdentityControlsAuthority).toBe(true);
  });

  test('pins the executable gender and orientation conditioned spouse selector', () => {
    const body =
      RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CANDIDATE.directCodeEvidence;
    expect(body.publicSourceCodeDirectlyInspected).toBe(true);
    expect(body.executableSpouseSelectorObserved).toBe(true);
    expect(body.externalOrientationInputAcceptedAndOperational).toBe(true);
    expect(body.externalOrientationInputIsNatalFact).toBe(false);
    expect(body.nativeGenderUsedBySpouseSelector).toBe(true);
    expect(body.orientationUsedBySpouseSelector).toBe(true);
    expect(body.heteroMaleWealthFemaleOfficerKillings).toBe(true);
    expect(body.homoMaleOfficerKillingsFemaleWealth).toBe(true);
    expect(body.biInspectsWealthAndOfficerKillings).toBe(true);
    expect(body.polyInspectsWealthAndOfficerKillings).toBe(true);
    expect(body.noneDisablesSpouseStarSelector).toBe(true);
  });

  test('pins propagation into relationship mode and timing', () => {
    const body =
      RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CANDIDATE.directCodeEvidence;
    expect(body.orientationUsedByEmotionBaseline).toBe(true);
    expect(body.orientationUsedByRelationshipMode).toBe(true);
    expect(body.orientationUsedByDecadeLuckRelationshipTiming).toBe(true);
    expect(body.orientationUsedByAnnualLuckRelationshipTiming).toBe(true);
    expect(body.fairnessTestsExerciseAllOrientationGenderCombinations).toBe(true);
    expect(body.fairnessTestsIntentionallyPermitEmotionGenderDifference).toBe(true);
  });

  test('preserves inclusive semantics without promoting them to natal-only authority', () => {
    const body =
      RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CANDIDATE.directCodeEvidence;
    expect(body.modernNeutralRelationshipLanguageObserved).toBe(true);
    expect(body.discriminatoryValueJudgmentRulesRemoved).toBe(true);
    expect(body.partnerBiologicalSexInferenceForbiddenByMethod).toBe(true);
    expect(body.marriageStatusInferenceForbiddenByMethod).toBe(true);
    expect(body.natalFactsOnlyCompleteSelectorObserved).toBe(false);
    expect(body.nativeSexIndependentCompleteSelectorObserved).toBe(false);
    expect(body.partnerContextIndependentCompleteSelectorObserved).toBe(false);
    expect(body.completeRoleNeutralReplacementSelectorObserved).toBe(false);
  });

  test('preserves no-guess, no-bypass, and no-stitching controls', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CANDIDATE;
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

  test('chains from Saju Works and preserves the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8SajuWorks2026DirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8BaziLifeCurvesExecutableBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.publicExecutableSourceDirectlyInspected).toBe(true);
    expect(report.exactExternalCommitAndBlobsPinned).toBe(true);
    expect(report.executableSpouseSelectorObserved).toBe(true);
    expect(report.externalOrientationInputIsOperational).toBe(true);
    expect(report.externalOrientationInputIsNatalFact).toBe(false);
    expect(report.nativeGenderRemainsSelectorInput).toBe(true);
    expect(report.timingReusesConditionedSpouseSelector).toBe(true);
    expect(report.natalFactsOnlyCompleteSelectorEstablished).toBe(false);
    expect(report.nativeSexIndependentCompleteSelectorEstablished).toBe(false);
    expect(report.partnerContextIndependentCompleteSelectorEstablished).toBe(false);
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
    const first = buildRelationshipSpouseT8BaziLifeCurvesExecutableBoundaryEvidence();
    const second = buildRelationshipSpouseT8BaziLifeCurvesExecutableBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_CONTROL_IDS.length,
    );
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_BAZI_LIFE_CURVES_EXECUTABLE_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.status).toBe(
      'DIRECT_CODE_EXECUTABLE_ORIENTATION_AND_GENDER_CONDITIONED_SPOUSE_SELECTOR_NEGATIVE_NATAL_FACTS_ONLY_ROLE_NEUTRAL_SELECTOR',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_bazi_life_curves_executable_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_EXECUTABLE_OR_COMPLETE_BODY_DISCOVERY_FOR_NATAL_FACTS_ONLY_ROLE_NEUTRAL_SELECTOR',
    );
  });
});
