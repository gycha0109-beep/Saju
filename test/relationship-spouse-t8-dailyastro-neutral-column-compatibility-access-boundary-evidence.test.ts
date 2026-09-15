import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8SajuAtelier2026SpousePalaceDirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-saju-atelier-2026-spouse-palace-direct-body-boundary-evidence.js';
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

  test('preserves the indexed operational neutral-column routing signal without promoting it', () => {
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

  test('keeps the observed method in two-chart compatibility scope rather than single-native natal scope', () => {
    const signal =
      RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE
        .indexedDiscoveryEvidence;
    expect(signal.compatibilityUsesTwoPeopleSignalObserved).toBe(true);
    expect(signal.pairUsesBothPeopleYearBranchDayStemAndDayBranch).toBe(true);
    expect(signal.spouseAndDatingAreMutualTwoPersonLenses).toBe(true);
    expect(signal.twoChartCompatibilityScopeSignalObserved).toBe(true);
    expect(signal.singleNativeRoleNeutralNatalSelectorEstablishedFromIndexedExcerpts).toBe(false);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE
        .selectorBoundary,
    ).toMatch(/two-chart compatibility engine/i);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE
        .selectorBoundary,
    ).toMatch(/single-native natal selector/i);
  });

  test('freezes the current public retrieval boundary', () => {
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

  test('does not invent a natal selector, body verdict, bypass, or cross-source stitch', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_DAILYASTRO_NEUTRAL_COLUMN_COMPATIBILITY_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(candidate.relationshipT6InputGapClosedByThisEvidence).toBe(false);
    expect(candidate.opaqueIdentifierGuessingPerformed).toBe(false);
    expect(candidate.accessControlCircumventionPerformed).toBe(false);
    expect(candidate.crossSourceSemanticStitching).toBe(false);
    expect(candidate.selectorBoundary).toMatch(/Removing the second chart/i);
    expect(candidate.selectorBoundary).toMatch(/neither positive admission nor a complete-body negative rejection/i);
  });

  test('chains from Saju Atelier #580 and preserves the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8SajuAtelier2026SpousePalaceDirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.targetSpecificIndexedBodyEvidenceInspected).toBe(true);
    expect(report.indexedOperationalRoleNeutralCompatibilitySignalObserved).toBe(true);
    expect(report.indexedTwoChartCompatibilityScopeObserved).toBe(true);
    expect(report.completeDirectHtmlBodyInspected).toBe(false);
    expect(report.fullPageDirectTraversalPerformed).toBe(false);
    expect(report.directBodySemanticReviewPerformed).toBe(false);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(report.singleNativeRoleNeutralNatalSelectorEstablished).toBe(false);
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

  test('keeps the complete control set and deterministic content address', () => {
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
      'RECOVER_DIRECT_COMPLETE_DAILYASTRO_METHODOLOGY_OR_CONTINUE_SINGLE_SOURCE_PUBLIC_COMPLETE_BODY_DISCOVERY_FOR_SINGLE_NATIVE_ROLE_NEUTRAL_SELECTOR',
    );
  });
});
