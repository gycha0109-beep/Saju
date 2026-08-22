import { describe, expect, test } from 'vitest';
import type {
  ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport,
  ChallengeContextAvailabilityV23Report,
} from '../src/index.js';
import { buildI26ChallengeContextAvailabilityV24 } from '../src/research/i26-challenge-context-availability-v24.js';
import { buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview } from '../src/research/i81-challenge-combination-support-channel-branch-three-narrow-post-interaction-bureau-state-routed-combination-settlement-outcome-promotion-readiness-review.js';

const PREFIX = 'challenge-root combination support-channel';
const CURRENT_ID = 'branch_three_combination:year:branch:신|month:branch:자|day:branch:진';
const COMPETING_ID = 'branch_three_combination:month:branch:해|day:branch:묘|hour:branch:미';

function outcomeGap(
  relationId: string,
  dependency:
    | 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
    | 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
): string {
  return `${PREFIX} dispatched relation settlement outcome unresolved after verified current-chart substrate: ${relationId}|branch_three_combination|${dependency}`;
}

function narrowedGap(
  relationId: string,
  dependency:
    | 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
    | 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
): string {
  return `${PREFIX} dispatched relation narrow branch-three post-interaction bureau state verified but routed combination settlement outcome unresolved: ${relationId}|branch_three_combination|${dependency}|BROKEN_BY_TIGHT_EMBEDDED_CLASH`;
}

function v23(): ChallengeContextAvailabilityV23Report {
  return {
    reportId: 'i26_v23_v24_fixture',
    reportVersion: 'fixture',
    upstreamAvailabilityV22ReportId: 'v22',
    dispatchedRelationCurrentChartSettlementSubstrateEvidenceReportId: 'i65',
    dispatchedRelationCurrentChartSettlementSubstrateClosureAccepted: true,
    mechanisms: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        requiredContexts: [
          {
            dependency: 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
            availability: 'PARTIAL_SUBSTRATE',
            existingCapabilities: ['I65 pair-local current-chart settlement substrate verified'],
            unresolvedCapabilities: [
              `${PREFIX} activation/persistence`,
              `${PREFIX} competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT`,
              outcomeGap(CURRENT_ID, 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'),
              outcomeGap(COMPETING_ID, 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT'),
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

function evidenceItem(
  role: 'CURRENT_COMBINATION' | 'COMPETING_COMBINATION',
  evidenceState: 'NARROW_DIRECT_BREAK_STATE_VERIFIED' | 'I47_MATCH_PRESENT_NO_DETERMINISTIC_BREAK',
) {
  const verified = evidenceState === 'NARROW_DIRECT_BREAK_STATE_VERIFIED';
  return {
    mechanism: 'OUTPUT_LEAKAGE',
    role,
    relationId: role === 'CURRENT_COMBINATION' ? CURRENT_ID : COMPETING_ID,
    relationKind: 'branch_three_combination',
    applicability: 'EXACT_I47_BUREAU_IDENTITY_AND_STATE_MATCH_REQUIRED',
    evidenceState,
    i47ExactMatchCount: 1,
    i47ExactBureauIdentityMatched: true,
    i47DeterministicBreakStateMatched: verified,
    narrowPostInteractionBureauState: verified
      ? 'BROKEN_BY_TIGHT_EMBEDDED_CLASH'
      : 'not_determined',
    narrowPostInteractionBureauStateBasis: verified
      ? 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH'
      : 'NO_DETERMINISTIC_STATE_FROM_I46',
    contextualAmbiguityPreserved: !verified,
    bindingVerdict: 'not_determined',
    transformationVerdict: 'not_determined',
    interactionOutcome: 'not_determined',
    neutralizationVerdict: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    precedenceWithinMultiTouch: 'not_determined',
    supportChannelActive: 'not_determined',
    supportChannelPersisted: 'not_determined',
    supportChannelDestroyed: 'not_determined',
    supportChannelNetEffect: 'not_resolved',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

function i80(
  items = [
    evidenceItem('CURRENT_COMBINATION', 'NARROW_DIRECT_BREAK_STATE_VERIFIED'),
    evidenceItem('COMPETING_COMBINATION', 'NARROW_DIRECT_BREAK_STATE_VERIFIED'),
  ],
): ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport {
  return {
    reportId: 'i80_i26_v24_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE',
    upstreamI78ReviewId: 'i78',
    upstreamI79ReviewId: 'i79',
    i47ReportId: 'i47',
    items,
    narrowPostInteractionSettlementEvidenceAvailable: true,
    anyNarrowDirectBreakStateVerified: items.some(
      (item) => item.evidenceState === 'NARROW_DIRECT_BREAK_STATE_VERIFIED',
    ),
    allEligibleBranchThreeCandidatesHaveUniqueI47Match: true,
    i48ContextualAmbiguityPreserved: true,
    narrowBreakStateIsBureauLevelOnly: true,
    narrowBreakStateMayBePromotedToBindingOutcome: false,
    narrowBreakStateMayBePromotedToTransformationOutcome: false,
    narrowBreakStateMayBePromotedToGenericInteractionOutcome: false,
    narrowBreakStateMayBePromotedToNeutralizationOutcome: false,
    narrowBreakStateMayBePromotedToSupportSourceDestroyed: false,
    absenceOfNarrowBreakMeansIntactAuthorized: false,
    absenceOfNarrowBreakMeansDamagedAuthorized: false,
    genericCombinationSettlementResolverAuthorized: false,
    directBindingOutcomeAuthorized: false,
    transformationOutcomeAuthorized: false,
    neutralizationOutcomeAuthorized: false,
    noEffectOutcomeAuthorized: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  } as unknown as ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport;
}

function build(e80 = i80(), availability = v23()) {
  const readiness =
    buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(
      e80,
    );
  return buildI26ChallengeContextAvailabilityV24(availability, e80, readiness);
}

function forceContext(report: ReturnType<typeof buildI26ChallengeContextAvailabilityV24>) {
  return report.mechanisms[0]?.requiredContexts[0];
}

describe('I26 v24 challenge context availability narrow branch-three settlement refinement', () => {
  test('replaces exact verified current and competing branch-three outcome blockers with narrower bureau-state-verified blockers', () => {
    const report = build();
    const context = forceContext(report);
    expect(report.narrowBranchThreeSettlementRefinementAccepted).toBe(true);
    for (const [relationId, dependency] of [
      [CURRENT_ID, 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'],
      [COMPETING_ID, 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT'],
    ] as const) {
      expect(context?.unresolvedCapabilities).not.toContain(outcomeGap(relationId, dependency));
      expect(context?.unresolvedCapabilities).toContain(narrowedGap(relationId, dependency));
    }
  });

  test('adds positive bureau-state substrate capability without resolving the routed outcome', () => {
    const context = forceContext(build());
    expect(
      context?.existingCapabilities.some(
        (capability) =>
          capability.includes('I80/I81 branch-three narrow post-interaction bureau state verified:') &&
          capability.includes('BROKEN_BY_TIGHT_EMBEDDED_CLASH') &&
          capability.includes('routed binding/interaction settlement outcome unresolved'),
      ),
    ).toBe(true);
    expect(context?.availability).toBe('PARTIAL_SUBSTRATE');
  });

  test('does not refine a contextually unresolved I47 branch-three item', () => {
    const evidence = i80([
      evidenceItem('CURRENT_COMBINATION', 'I47_MATCH_PRESENT_NO_DETERMINISTIC_BREAK'),
      evidenceItem('COMPETING_COMBINATION', 'NARROW_DIRECT_BREAK_STATE_VERIFIED'),
    ]);
    const report = build(evidence);
    const context = forceContext(report);
    expect(context?.unresolvedCapabilities).toContain(
      outcomeGap(CURRENT_ID, 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'),
    );
    expect(context?.unresolvedCapabilities).not.toContain(
      narrowedGap(CURRENT_ID, 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'),
    );
  });

  test('requires an exact unique I26-v23 blocker match before refinement', () => {
    const availability = v23();
    const context = availability.mechanisms[0]!.requiredContexts[0]!;
    const modified = {
      ...availability,
      mechanisms: [
        {
          ...availability.mechanisms[0]!,
          requiredContexts: [
            {
              ...context,
              unresolvedCapabilities: context.unresolvedCapabilities.filter(
                (capability) =>
                  !capability.includes(
                    `${CURRENT_ID}|branch_three_combination|CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT`,
                  ),
              ),
            },
          ],
        },
      ],
    } as ChallengeContextAvailabilityV23Report;
    const report = build(i80(), modified);
    expect(
      forceContext(report)?.existingCapabilities.some((capability) => capability.includes(CURRENT_ID)),
    ).toBe(false);
  });

  test('fails closed on a non-canonical I81 review and adds an alignment gap', () => {
    const evidence = i80();
    const canonical =
      buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(
        evidence,
      );
    const report = buildI26ChallengeContextAvailabilityV24(
      v23(),
      evidence,
      { ...canonical, reviewId: 'stale_i81' },
    );
    expect(report.narrowBranchThreeSettlementRefinementAccepted).toBe(false);
    expect(forceContext(report)?.unresolvedCapabilities).toContain(
      'resolved canonical I80/I81 narrow branch-three post-interaction settlement evidence/readiness aligned to I26-v23 pair-local outcome blockers',
    );
  });

  test('is deterministic and preserves precedence, support-effect, force, scoring, and classification guards', () => {
    const first = build();
    const second = build();
    const context = forceContext(first);
    expect(first.reportId).toBe(second.reportId);
    expect(context?.unresolvedCapabilities).toContain(
      `${PREFIX} competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT`,
    );
    expect(context?.unresolvedCapabilities).toContain(`${PREFIX} activation/persistence`);
    expect(first.mechanisms.every((mechanism) => mechanism.effectReady === false)).toBe(true);
    expect(first.methodologyReadyForEffectResolution).toBe(false);
    expect(first.challengeEffectVerdict).toBe('not_determined');
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
