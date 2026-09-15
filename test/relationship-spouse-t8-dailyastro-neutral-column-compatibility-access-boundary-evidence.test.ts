import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8Whisper2026DayMasterPolarityDirectBodyEvidence } from '../src/research/relationship-spouse-t8-whisper-2026-day-master-polarity-direct-body-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-dailyastro-neutral-column-compatibility-access-boundary-evidence.js';

describe('Relationship spouse T8 DailyAstro neutral-column compatibility access-boundary evidence', () => {
  test('pins the current public methodology identity and exact frontier', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.publisher).toBe('DailyAstro');
    expect(candidate.title).toBe('Methodology');
    expect(candidate.frontierIssue).toBe(586);
    expect(candidate.sourceClass).toBe('current_public_app_methodology_compatibility_scoring_rules');
    expect(candidate.publicUrl).toBe('https://dailyastro.ai/en/methodology/');
  });

  test('preserves indexed operational neutral-column routing as discovery evidence', () => {
    const signal =
      RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE
        .indexedDiscoveryEvidence;
    expect(signal.exactPageIdentityObserved).toBe(true);
    expect(signal.methodologyClaimsPublishedRulesAreActuallyRun).toBe(true);
    expect(signal.sevenRelationshipLensesObserved).toBe(true);
    expect(signal.spouseLensObserved).toBe(true);
    expect(signal.datingLensObserved).toBe(true);
    expect(signal.maleSpouseColumnObserved).toBe(true);
    expect(signal.femaleSpouseColumnObserved).toBe(true);
    expect(signal.neutralSpouseColumnObserved).toBe(true);
    expect(signal.bothKnownDifferentRoutesMaleWealthFemaleOfficer).toBe(true);
    expect(signal.eitherGenderMissingUsesNeutralColumnOnBothSides).toBe(true);
    expect(signal.sameGenderUsesNeutralColumnOnBothSides).toBe(true);
    expect(signal.sameSexClassicalBidirectionalRuleDeclaredUnsatisfiable).toBe(true);
    expect(signal.genderFreeFallbackIdentifiedAsNayinMarriageCompatibility).toBe(true);
    expect(signal.neutralFallbackOrderingGenerationSameElementControlObserved).toBe(true);
    expect(signal.neutralFallbackIndexedWeights).toEqual({ generation: 6, sameElement: 4, control: -2 });
    expect(signal.operationalRoutingAndScoringSignalObserved).toBe(true);
    expect(signal.indexedExcerptsTreatedAsCompleteDirectBody).toBe(false);
  });

  test('keeps DailyAstro in two-chart compatibility scope', () => {
    const signal =
      RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE
        .indexedDiscoveryEvidence;
    const candidate = RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE;
    expect(signal.compatibilityUsesTwoPeopleSignalObserved).toBe(true);
    expect(signal.pairUsesBothPeopleYearBranchDayStemAndDayBranch).toBe(true);
    expect(signal.spouseAndDatingAreMutualTwoPersonLenses).toBe(true);
    expect(signal.twoChartCompatibilityScopeSignalObserved).toBe(true);
    expect(candidate.selectorBoundary).toMatch(/two-chart compatibility evidence/i);
    expect(candidate.selectorBoundary).toMatch(/Removing the second chart/i);
    expect(candidate.selectorBoundary).toMatch(/repository-owned natal semantics/i);
  });

  test('freezes the public retrieval boundary without a body-level verdict', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.currentAccessBoundary.publicSearchIndexRecoveredTargetSpecificContent).toBe(true);
    expect(candidate.currentAccessBoundary.directPageFetchAttempted).toBe(true);
    expect(candidate.currentAccessBoundary.directPageFetchDisposition).toBe('CACHE_MISS');
    expect(candidate.currentAccessBoundary.completeDirectHtmlBodyAcquired).toBe(false);
    expect(candidate.currentAccessBoundary.fullPageDirectTraversalPerformed).toBe(false);
    expect(candidate.currentAccessBoundary.completePdfAcquired).toBe(false);
    expect(candidate.currentAccessBoundary.renderedPageCount).toBe(0);
    expect(candidate.directBodySemanticReviewPerformed).toBe(false);
    expect(candidate.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(candidate.semanticDisposition).toBe(
      'PUBLIC_INDEXED_OPERATIONAL_ROLE_NEUTRAL_TWO_CHART_COMPATIBILITY_SIGNAL_NO_FULL_BODY_NO_SINGLE_NATIVE_ADMISSION_DECISION',
    );
  });

  test('chains from Whisper and preserves the three-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8Whisper2026DayMasterPolarityDirectBodyEvidence();
    const report = buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence();
    expect(upstream.status).toBe(
      'DIRECT_BODY_DAY_MASTER_POLARITY_SPOUSE_SELECTOR_POSITIVE_EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING',
    );
    expect(upstream.explicitRoleNeutralNatalMappingEstablished).toBe(true);
    expect(upstream.authorityGapsClosedCount).toBe(3);
    expect(upstream.authorityGapsOpenCount).toBe(2);
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamThreeOfFiveStateAccepted).toBe(true);
    expect(report.targetSpecificIndexedBodyEvidenceInspected).toBe(true);
    expect(report.indexedOperationalRoleNeutralCompatibilitySignalObserved).toBe(true);
    expect(report.indexedTwoChartCompatibilityScopeObserved).toBe(true);
    expect(report.completeDirectHtmlBodyInspected).toBe(false);
    expect(report.fullPageDirectTraversalPerformed).toBe(false);
    expect(report.directBodySemanticReviewPerformed).toBe(false);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(report.dailyAstroAdditionalAuthorityGapsClosedCount).toBe(0);
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

  test('does not manufacture repository semantic correspondence or T6 authority', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence();
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(candidate.relationshipT6InputGapClosedByThisEvidence).toBe(false);
    expect(candidate.crossSourceSemanticStitching).toBe(false);
    expect(candidate.opaqueIdentifierGuessingPerformed).toBe(false);
    expect(candidate.accessControlCircumventionPerformed).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.dailyAstroAdditionalAuthorityGapsClosedCount).toBe(0);
  });

  test('keeps the control set and deterministic content address', () => {
    const first = buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence();
    const second = buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CONTROL_IDS.length,
    );
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(first.status).toBe(
      'PUBLIC_INDEXED_OPERATIONAL_ROLE_NEUTRAL_TWO_CHART_COMPATIBILITY_SIGNAL_NO_FULL_BODY_NO_SINGLE_NATIVE_ADMISSION_DECISION',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_dailyastro_neutral_column_compatibility_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'GOVERN_REPOSITORY_OWNED_SEMANTIC_CORRESPONDENCE_FOR_ADMITTED_ROLE_NEUTRAL_SELECTOR',
    );
  });
});
