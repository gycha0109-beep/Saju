import { describe, expect, test } from 'vitest';
import {
  buildI26ChallengeContextAvailabilityV20,
  buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview,
  buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence,
  type ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
  type ChallengeContextAvailabilityV19Report,
  type ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  type ChallengeTargetClashDependencyEvidenceReport,
  type ChallengeTargetCombinationDependencyEvidenceReport,
} from '../src/index.js';

function i58(): ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport {
  return {
    reportId: 'i58-current',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE',
    upstreamI56ReportId: 'i56-current',
    upstreamI57ReviewId: 'i57-current',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        currentCombinationRelationId: 'current-combination',
        currentCombinationRelationKind: 'branch_six_combination',
        targetParticipantPillar: 'day',
        targetParticipantComponent: 'branch',
        targetParticipantValue: '술',
        supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
        sourcePillar: 'month',
        sourceComponent: 'branch',
        sourceValue: '해',
        contestTopologyState: 'CURRENT_COMBINATION_PARTICIPATION',
        touchingRelationIds: ['current-combination'],
        touchingRelationKinds: ['branch_six_combination'],
        touchCount: 1,
        directContestSettlementRequired: true,
        requiredSettlementDependencies: ['CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'],
        dependencyApplicability: [
          {
            dependency: 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
            applicabilityStatus: 'SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED',
            authorityRefs: ['I35'],
            reusableSubstrateAvailable: true,
            currentChartSettlementSubstrateVerified: false,
            settlementOutcomeResolved: false,
          },
        ],
        allRequiredSettlementDependenciesHaveApplicabilityEvidence: true,
        anySettlementOutcomeResolved: false,
        supportChannelActive: 'not_determined',
        supportChannelPersisted: 'not_determined',
        supportChannelNeutralized: 'not_determined',
        supportChannelDestroyed: 'not_determined',
        supportChannelNetEffect: 'not_resolved',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    authorityApplicabilityEvidenceAvailable: true,
    currentChartRelationSpecificSettlementEvidenceVerified: false,
    anyRoutedSettlementOutcomeResolved: false,
    contestOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

function i33(): ChallengeTargetClashDependencyEvidenceReport {
  return { reportId: 'i33-current', status: 'RESOLVED_DEPENDENCY_EVIDENCE', candidates: [] } as unknown as ChallengeTargetClashDependencyEvidenceReport;
}

function i35(exact = true): ChallengeTargetCombinationDependencyEvidenceReport {
  return {
    reportId: exact ? 'i35-current' : 'i35-mismatch',
    status: 'RESOLVED_DEPENDENCY_EVIDENCE',
    candidates: exact
      ? [
          {
            mechanism: 'OUTPUT_LEAKAGE',
            relationId: 'current-combination',
            relationKind: 'branch_six_combination',
            participants: [
              { pillar: 'month', component: 'branch', value: '해' },
              { pillar: 'day', component: 'branch', value: '술' },
            ],
          },
        ]
      : [],
  } as unknown as ChallengeTargetCombinationDependencyEvidenceReport;
}

function i47(): ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport {
  return { reportId: 'i47-current', status: 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE', items: [] } as unknown as ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport;
}

function v19(applicability: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport): ChallengeContextAvailabilityV19Report {
  return {
    reportId: 'v19-current',
    reportVersion: 'fixture',
    upstreamAvailabilityV18ReportId: 'v18-current',
    settlementDependencyEvidenceReportId: 'i56-current',
    existingSettlementAuthorityApplicabilityReviewId: 'i57-current',
    existingSettlementAuthorityApplicabilityEvidenceReportId: applicability.reportId,
    authorityApplicabilityClosureAccepted: true,
    mechanisms: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        requiredContexts: [
          {
            dependency: 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
            availability: 'PARTIAL_SUBSTRATE',
            existingCapabilities: ['I58 applicability evidence'],
            unresolvedCapabilities: [
              'challenge-root combination support-channel activation/persistence',
              'challenge-root combination support-channel current-chart relation-specific settlement substrate verification unresolved: CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
            ],
            effectResolutionAuthorized: false,
          },
        ],
        missingDependencies: [],
        partialDependencies: ['MECHANISM_EFFECTIVE_FORCE_CONTEXT'],
        evidenceAvailableDependencies: [],
        effectReady: false,
      },
    ],
    allRequiredContextsHaveSubstrate: true,
    methodologyReadyForEffectResolution: false,
    challengeEffectVerdict: 'not_determined',
    relativeForceVerdictAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

const methodology =
  buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();

function build(exactI35 = true) {
  const applicability = i58();
  const clash = i33();
  const combinations = i35(exactI35);
  const bureau = i47();
  const substrate =
    buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      applicability,
      methodology,
      clash,
      combinations,
      bureau,
    );
  const availability = v19(applicability);
  return {
    applicability,
    clash,
    combinations,
    bureau,
    substrate,
    report: buildI26ChallengeContextAvailabilityV20(
      availability,
      applicability,
      methodology,
      clash,
      combinations,
      bureau,
      substrate,
    ),
  };
}

function forceContext(report: ReturnType<typeof build>['report']) {
  return report.mechanisms[0]?.requiredContexts[0];
}

describe('I26 v20 challenge context availability with current-chart settlement substrate verification', () => {
  test('replaces only the substrate-verification blocker with an explicit settlement-outcome blocker when I60 verifies exact I35 substrate', () => {
    const built = build(true);
    const context = forceContext(built.report);

    expect(built.report.currentChartSubstrateClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root combination support-channel current-chart relation-specific settlement substrate verification unresolved: CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel settlement outcome unresolved after verified current-chart substrate: CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    );
  });

  test('keeps the separate activation/persistence blocker after chart substrate verification', () => {
    const context = forceContext(build(true).report);

    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel activation/persistence',
    );
  });

  test('does not refine the substrate-verification blocker when exact chart authority identity is unavailable', () => {
    const built = build(false);
    const context = forceContext(built.report);

    expect(built.substrate.anyCurrentChartSettlementSubstrateVerified).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel current-chart relation-specific settlement substrate verification unresolved: CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    );
    expect(
      context?.unresolvedCapabilities.some((item) => item.includes('settlement outcome unresolved after verified current-chart substrate')),
    ).toBe(false);
  });

  test('fails closed on stale I60 identity and preserves the original blocker plus alignment gap', () => {
    const built = build(true);
    const stale = { ...built.substrate, reportId: `${built.substrate.reportId}_stale` };
    const report = buildI26ChallengeContextAvailabilityV20(
      v19(built.applicability),
      built.applicability,
      methodology,
      built.clash,
      built.combinations,
      built.bureau,
      stale,
    );
    const context = forceContext(report);

    expect(report.currentChartSubstrateClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel current-chart relation-specific settlement substrate verification unresolved: CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I60 current-chart settlement substrate evidence aligned to exact I58/I59/I33/I35/I47/I26-v19 identity',
    );
  });

  test('keeps PARTIAL_SUBSTRATE, effect readiness, force, scoring and classification guards closed', () => {
    const first = build(true);
    const second = build(true);
    const context = forceContext(first.report);

    expect(first.report.reportId).toBe(second.report.reportId);
    expect(context?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(first.report.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(first.report.methodologyReadyForEffectResolution).toBe(false);
    expect(first.report.challengeEffectVerdict).toBe('not_determined');
    expect(first.report.relativeForceVerdictAuthorized).toBe(false);
    expect(first.report.classificationAuthorized).toBe(false);
    expect(first.report.numericScoringAuthorized).toBe(false);
    expect(first.substrate.anyRoutedSettlementOutcomeResolved).toBe(false);
  });
});
