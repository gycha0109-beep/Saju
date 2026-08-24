import { describe, expect, test } from 'vitest';
import {
  buildI26ChallengeContextAvailabilityV19,
  buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview,
  buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence,
  type ChallengeCombinationSupportChannelContestSettlementDependency,
  type ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem,
  type ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
  type ChallengeContextAvailabilityV18Report,
  type ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
} from '../src/index.js';

type Family = 'stem' | 'root';

function prefix(family: Family): string {
  return family === 'stem' ? 'challenge-target stem-combination' : 'challenge-root combination';
}

function baseItem(
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency,
  family: Family = 'root',
): ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem {
  const multi = dependency === 'TOUCH_SPECIFIC_RELATION_SETTLEMENT';
  return {
    mechanism: 'OUTPUT_LEAKAGE',
    currentCombinationRelationId: 'relation-current',
    currentCombinationRelationKind: family === 'stem' ? 'stem_five_combination' : 'branch_six_combination',
    targetParticipantPillar: 'day',
    targetParticipantComponent: family === 'stem' ? 'stem' : 'branch',
    targetParticipantValue: family === 'stem' ? '갑' : '술',
    supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
    sourcePillar: 'month',
    sourceComponent: 'branch',
    sourceValue: '해',
    contestTopologyState: multi ? 'MULTIPLE_TRACKED_RELATION_TOUCHES' : 'COMPETING_CLASH_TOUCH',
    touchingRelationIds: multi ? ['relation-a', 'relation-b'] : ['relation-touch'],
    touchingRelationKinds: multi ? ['branch_clash', 'branch_six_combination'] : ['branch_clash'],
    touchCount: multi ? 2 : 1,
    directContestSettlementRequired: true,
    requiredSettlementDependencies: [dependency],
    settlementDependenciesResolved: false,
    supportChannelActive: 'not_determined',
    supportChannelPersisted: 'not_determined',
    supportChannelNeutralized: 'not_determined',
    supportChannelDestroyed: 'not_determined',
    supportChannelNetEffect: 'not_resolved',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

function i56(
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency,
  family: Family = 'root',
): ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport {
  return {
    reportId: `i56-${dependency}-${family}`,
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE',
    upstreamI54ReportId: 'i54-fixture',
    upstreamI55ReviewId: 'i55-fixture',
    items: [baseItem(dependency, family)],
    settlementDependencyEvidenceAvailable: true,
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

function v18(
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency,
  family: Family = 'root',
): ChallengeContextAvailabilityV18Report {
  const activation = `${prefix(family)} support-channel activation/persistence`;
  const routed = `${prefix(family)} support-channel routed settlement dependency unresolved: ${dependency}`;
  return {
    reportId: `v18-${dependency}-${family}`,
    reportVersion: 'fixture',
    upstreamAvailabilityV17ReportId: 'v17-fixture',
    contestTopologyEvidenceReportId: 'i54-fixture',
    contestSettlementMethodologyReviewId: 'i55-fixture',
    settlementDependencyEvidenceReportId: settlementEvidence.reportId,
    settlementDependencyClosureAccepted: true,
    mechanisms: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        requiredContexts: [
          {
            dependency: 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
            availability: 'PARTIAL_SUBSTRATE',
            existingCapabilities: ['I56 routed settlement dependency evidence'],
            unresolvedCapabilities: [activation, routed],
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

function build(
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency,
  family: Family = 'root',
) {
  const settlement = i56(dependency, family);
  const review = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
  const evidence = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
    settlement,
    review,
  );
  const availability = v18(settlement, dependency, family);
  return {
    settlement,
    review,
    evidence,
    report: buildI26ChallengeContextAvailabilityV19(
      availability,
      settlement,
      review,
      evidence,
    ),
  };
}

function forceContext(report: ReturnType<typeof build>['report']) {
  return report.mechanisms[0]?.requiredContexts[0];
}

describe('I26 v19 challenge context availability with existing settlement authority applicability', () => {
  test('refines reusable clash relative-force authority into current-chart substrate verification without resolving outcome', () => {
    const built = build('CLASH_RELATIVE_FORCE_SETTLEMENT');
    const context = forceContext(built.report);

    expect(built.report.authorityApplicabilityClosureAccepted).toBe(true);
    expect(context?.unresolvedCapabilities).not.toContain(
      'challenge-root combination support-channel routed settlement dependency unresolved: CLASH_RELATIVE_FORCE_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel current-chart relation-specific settlement substrate verification unresolved: CLASH_RELATIVE_FORCE_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel activation/persistence',
    );
  });

  test('preserves the narrow bureau-only clash authority as a generic support-source settlement blocker', () => {
    const built = build('CLASH_INTERACTION_SETTLEMENT');
    const context = forceContext(built.report);

    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel generic support-source settlement unresolved despite narrow bureau-state authority: CLASH_INTERACTION_SETTLEMENT',
    );
    expect(context?.existingCapabilities.some((item) => item.includes('I58 root existing settlement authority applicability'))).toBe(true);
  });

  test('refines multi-touch identity pairing and competing precedence to their exact unresolved authority boundaries', () => {
    const touch = build('TOUCH_SPECIFIC_RELATION_SETTLEMENT');
    const competing = build('COMPETING_RELATION_SETTLEMENT');

    expect(forceContext(touch.report)?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel touch-specific relation identity pairing unresolved: TOUCH_SPECIFIC_RELATION_SETTLEMENT',
    );
    expect(forceContext(competing.report)?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT',
    );
  });

  test('supports stem-family refinement without changing the separate activation/persistence blocker', () => {
    const built = build('CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT', 'stem');
    const context = forceContext(built.report);

    expect(context?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination support-channel current-chart relation-specific settlement substrate verification unresolved: CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-target stem-combination support-channel activation/persistence',
    );
  });

  test('fails closed on stale I58 identity and preserves PARTIAL_SUBSTRATE/effect/scoring/classification guards', () => {
    const settlement = i56('CLASH_RELATIVE_FORCE_SETTLEMENT');
    const review = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const canonical = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      settlement,
      review,
    );
    const stale = {
      ...canonical,
      reportId: `${canonical.reportId}_stale`,
    } as ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport;
    const availability = v18(settlement, 'CLASH_RELATIVE_FORCE_SETTLEMENT');
    const report = buildI26ChallengeContextAvailabilityV19(
      availability,
      settlement,
      review,
      stale,
    );
    const context = forceContext(report);

    expect(report.authorityApplicabilityClosureAccepted).toBe(false);
    expect(context?.unresolvedCapabilities).toContain(
      'challenge-root combination support-channel routed settlement dependency unresolved: CLASH_RELATIVE_FORCE_SETTLEMENT',
    );
    expect(context?.unresolvedCapabilities).toContain(
      'resolved I58 authority-applicability evidence aligned to exact I56/I57/I26-v18 identity',
    );
    expect(context?.availability).toBe('PARTIAL_SUBSTRATE');
    expect(report.mechanisms.every((item) => item.effectReady === false)).toBe(true);
    expect(report.methodologyReadyForEffectResolution).toBe(false);
    expect(report.challengeEffectVerdict).toBe('not_determined');
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and does not reinterpret reusable authority as settlement resolution', () => {
    const first = build('CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE');
    const second = build('CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE');

    expect(first.report.reportId).toBe(second.report.reportId);
    expect(first.evidence.currentChartRelationSpecificSettlementEvidenceVerified).toBe(false);
    expect(first.evidence.anyRoutedSettlementOutcomeResolved).toBe(false);
    expect(first.report.mechanisms[0]?.partialDependencies).toContain('MECHANISM_EFFECTIVE_FORCE_CONTEXT');
  });
});
