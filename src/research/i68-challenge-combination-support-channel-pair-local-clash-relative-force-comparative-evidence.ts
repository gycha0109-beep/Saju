import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeTargetClashDependencyEvidenceReport } from './i33-challenge-target-clash-dependency-evidence.js';
import type { ClashSupportContextReport, ClashSupportContextSignal } from './i20c-clash-support-context.js';
import type { SeasonalElementPhase } from './i20-relative-force-evidence.js';
import type { ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport } from './i65-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-evidence.js';
import {
  buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview,
  type ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReviewReport,
  type I67SupportSignalSetRelation,
  type I67TrackedClashEvidencePartialOrderState,
} from './i67-challenge-combination-support-channel-pair-local-clash-relative-force-settlement-methodology-review.js';

export const I68_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_RELATIVE_FORCE_COMPARATIVE_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-pair-local-clash-relative-force-comparative-evidence-v1';

export type I68SeasonalComparison =
  | 'FIRST_SEASONAL_PHASE_ADVANTAGE'
  | 'SECOND_SEASONAL_PHASE_ADVANTAGE'
  | 'TIED_SEASONAL_PHASE';

export interface I68TrackedClashParticipantEvidence {
  role: 'TARGET_ROOT_CANDIDATE' | 'CLASH_COUNTERPART';
  position: 'year' | 'month' | 'day' | 'hour';
  branch: string;
  seasonalPhase: SeasonalElementPhase;
  trackedSupportSignals: readonly Exclude<ClashSupportContextSignal, 'NO_TRACKED_SUPPORT_CONTEXT'>[];
  supportEffect: 'not_resolved';
  relativeForceVerdict: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface I68PairLocalClashRelativeForceComparativeEvidenceItem {
  mechanism: string;
  relationId: string;
  sourcePillar: 'year' | 'month' | 'day' | 'hour';
  sourceBranch: string;
  participants: readonly [I68TrackedClashParticipantEvidence, I68TrackedClashParticipantEvidence];
  seasonalComparison: I68SeasonalComparison;
  supportSignalSetRelation: I67SupportSignalSetRelation;
  trackedEvidencePartialOrderState: I67TrackedClashEvidencePartialOrderState;
  relativeForceVerdict: 'not_determined';
  clashWinnerVerdict: 'not_determined';
  supportEffectVerdict: 'not_resolved';
  rescueEffectVerdict: 'not_resolved';
  clashSettlementVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_TRACKED_EVIDENCE_PARTIAL_ORDER'
    | 'I65_UNRESOLVED_OR_INVALID'
    | 'I33_UNRESOLVED_OR_MISALIGNED'
    | 'I20C_UNRESOLVED_OR_MISALIGNED'
    | 'I67_METHODOLOGY_NOT_AUTHORIZED';
  upstreamI65ReportId: string;
  upstreamI33ReportId: string;
  upstreamI20cReportId: string;
  upstreamI67ReviewId: string;
  items: readonly I68PairLocalClashRelativeForceComparativeEvidenceItem[];
  trackedEvidencePartialOrderEvidenceAvailable: boolean;
  trackedEvidencePartialOrderClassificationAuthorized: boolean;
  trackedEvidenceDominanceCandidateIsRelativeForceVerdict: false;
  trackedEvidenceEquivalentIsRelativeForceTieVerdict: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  supportEffectResolutionAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const PHASE_ORDER: Readonly<Record<SeasonalElementPhase, number>> = Object.freeze({
  旺: 5,
  相: 4,
  休: 3,
  囚: 2,
  死: 1,
});

function finalized(
  material: Omit<ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport, 'reportId'>,
): ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_pair_local_clash_relative_force_comparative_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport['status'],
    'RESOLVED_TRACKED_EVIDENCE_PARTIAL_ORDER'
  >,
  i65: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i20c: ClashSupportContextReport,
  methodology: ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport {
  return finalized({
    evidenceVersion:
      I68_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_RELATIVE_FORCE_COMPARATIVE_EVIDENCE_VERSION,
    status,
    upstreamI65ReportId: i65.reportId,
    upstreamI33ReportId: i33.reportId,
    upstreamI20cReportId: i20c.reportId,
    upstreamI67ReviewId: methodology.reviewId,
    items: [],
    trackedEvidencePartialOrderEvidenceAvailable: false,
    trackedEvidencePartialOrderClassificationAuthorized: false,
    trackedEvidenceDominanceCandidateIsRelativeForceVerdict: false,
    trackedEvidenceEquivalentIsRelativeForceTieVerdict: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    supportEffectResolutionAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

function methodologyAccepted(
  methodology: ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReviewReport,
): boolean {
  const canonical =
    buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview();
  return (
    methodology.reviewId === canonical.reviewId &&
    methodology.decision ===
      'TRACKED_EVIDENCE_PARTIAL_ORDER_COMPARISON_AUTHORIZED_FINAL_RELATIVE_FORCE_VERDICT_BLOCKED' &&
    methodology.exactPairLocalClashIdentityRequired &&
    methodology.seasonalPhaseOrdinalComparisonAuthorized &&
    methodology.supportSignalSetInclusionComparisonAuthorized &&
    methodology.trackedEvidencePartialOrderClassificationAuthorized &&
    methodology.seasonalAdvantageAloneSufficientForRelativeForceVerdict === false &&
    methodology.supportSignalCategoryWeightingAuthorized === false &&
    methodology.supportPositionCountComparisonAuthorized === false &&
    methodology.supportMagnitudeInferenceAuthorized === false &&
    methodology.supportEffectResolutionAuthorized === false &&
    methodology.trackedEvidenceDominanceCandidateIsRelativeForceVerdict === false &&
    methodology.trackedEvidenceEquivalentIsRelativeForceTieVerdict === false &&
    methodology.trackedEvidenceIncomparableMayBeForcedToWinner === false &&
    methodology.relativeForceVerdictAuthorized === false &&
    methodology.clashWinnerVerdictAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function i65Accepted(
  i65: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
): boolean {
  return (
    i65.status ===
      'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE' &&
    i65.dispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceAvailable &&
    i65.i33ReportId === i33.reportId &&
    i65.anyRoutedSettlementOutcomeResolved === false &&
    i65.crossRelationPrecedenceAuthorized === false &&
    i65.supportChannelActivationVerdictAuthorized === false &&
    i65.supportChannelPersistenceVerdictAuthorized === false &&
    i65.supportChannelNetEffectVerdictAuthorized === false &&
    i65.effectiveMechanismForceVerdict === 'not_determined' &&
    i65.classificationAuthorized === false &&
    i65.numericScoringAuthorized === false
  );
}

function i33Accepted(i33: ChallengeTargetClashDependencyEvidenceReport): boolean {
  return (
    i33.status === 'RESOLVED_DEPENDENCY_EVIDENCE' &&
    i33.relativeBranchForceVerdict === 'not_determined' &&
    i33.clashWinnerVerdict === 'not_determined' &&
    i33.targetPostRelationRootState === 'not_determined' &&
    i33.effectiveMechanismForceVerdict === 'not_determined' &&
    i33.classificationAuthorized === false &&
    i33.numericScoringAuthorized === false
  );
}

function i20cAccepted(i20c: ClashSupportContextReport): boolean {
  return (
    i20c.status === 'RESOLVED_SUPPORT_CONTEXT' &&
    i20c.supportEffectAuthorized === false &&
    i20c.relativeForceVerdictAuthorized === false &&
    i20c.rootEffectResolutionAuthorized === false &&
    i20c.classificationAuthorized === false &&
    i20c.numericScoringAuthorized === false
  );
}

function normalizedSignals(
  signals: readonly ClashSupportContextSignal[],
): readonly Exclude<ClashSupportContextSignal, 'NO_TRACKED_SUPPORT_CONTEXT'>[] {
  return [...new Set(signals.filter(
    (signal): signal is Exclude<ClashSupportContextSignal, 'NO_TRACKED_SUPPORT_CONTEXT'> =>
      signal !== 'NO_TRACKED_SUPPORT_CONTEXT',
  ))].sort();
}

function setRelation(
  first: readonly Exclude<ClashSupportContextSignal, 'NO_TRACKED_SUPPORT_CONTEXT'>[],
  second: readonly Exclude<ClashSupportContextSignal, 'NO_TRACKED_SUPPORT_CONTEXT'>[],
): I67SupportSignalSetRelation {
  const firstSet = new Set(first);
  const secondSet = new Set(second);
  const firstContainsSecond = second.every((signal) => firstSet.has(signal));
  const secondContainsFirst = first.every((signal) => secondSet.has(signal));
  if (firstContainsSecond && secondContainsFirst) return 'EQUAL_TRACKED_SUPPORT_SIGNAL_SET';
  if (firstContainsSecond) return 'FIRST_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET';
  if (secondContainsFirst) return 'SECOND_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET';
  return 'INCOMPARABLE_TRACKED_SUPPORT_SIGNAL_SETS';
}

function seasonalComparison(
  first: SeasonalElementPhase,
  second: SeasonalElementPhase,
): I68SeasonalComparison {
  if (PHASE_ORDER[first] === PHASE_ORDER[second]) return 'TIED_SEASONAL_PHASE';
  return PHASE_ORDER[first] > PHASE_ORDER[second]
    ? 'FIRST_SEASONAL_PHASE_ADVANTAGE'
    : 'SECOND_SEASONAL_PHASE_ADVANTAGE';
}

function partialOrderState(
  firstPhase: SeasonalElementPhase,
  secondPhase: SeasonalElementPhase,
  supportRelation: I67SupportSignalSetRelation,
): I67TrackedClashEvidencePartialOrderState {
  const firstSeasonalNoLower = PHASE_ORDER[firstPhase] >= PHASE_ORDER[secondPhase];
  const secondSeasonalNoLower = PHASE_ORDER[secondPhase] >= PHASE_ORDER[firstPhase];
  const firstSupportNoLower =
    supportRelation === 'EQUAL_TRACKED_SUPPORT_SIGNAL_SET' ||
    supportRelation === 'FIRST_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET';
  const secondSupportNoLower =
    supportRelation === 'EQUAL_TRACKED_SUPPORT_SIGNAL_SET' ||
    supportRelation === 'SECOND_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET';
  const firstStrict =
    PHASE_ORDER[firstPhase] > PHASE_ORDER[secondPhase] ||
    supportRelation === 'FIRST_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET';
  const secondStrict =
    PHASE_ORDER[secondPhase] > PHASE_ORDER[firstPhase] ||
    supportRelation === 'SECOND_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET';

  if (firstSeasonalNoLower && firstSupportNoLower && firstStrict) {
    return 'FIRST_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE';
  }
  if (secondSeasonalNoLower && secondSupportNoLower && secondStrict) {
    return 'SECOND_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE';
  }
  if (
    PHASE_ORDER[firstPhase] === PHASE_ORDER[secondPhase] &&
    supportRelation === 'EQUAL_TRACKED_SUPPORT_SIGNAL_SET'
  ) {
    return 'TRACKED_EVIDENCE_EQUIVALENT';
  }
  return 'TRACKED_EVIDENCE_INCOMPARABLE';
}

function exactI20cParticipant(
  candidate: ClashSupportContextReport['candidates'][number],
  position: 'year' | 'month' | 'day' | 'hour',
  branch: string,
) {
  return candidate.participants.find(
    (participant) => participant.position === position && String(participant.branch) === branch,
  );
}

export function buildI68ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidence(
  i65: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i20c: ClashSupportContextReport,
  methodology: ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReviewReport,
): ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport {
  if (!methodologyAccepted(methodology)) {
    return unresolved('I67_METHODOLOGY_NOT_AUTHORIZED', i65, i33, i20c, methodology, [
      'The supplied I67 review must exactly match the canonical tracked-evidence partial-order methodology.',
    ]);
  }
  if (!i65Accepted(i65, i33)) {
    return unresolved('I65_UNRESOLVED_OR_INVALID', i65, i33, i20c, methodology, [
      'Resolved I65 pair-local current-chart settlement substrate evidence aligned to the exact I33 report is required.',
    ]);
  }
  if (!i33Accepted(i33)) {
    return unresolved('I33_UNRESOLVED_OR_MISALIGNED', i65, i33, i20c, methodology, [
      'Resolved I33 clash evidence with all force/outcome guards closed is required.',
    ]);
  }
  if (!i20cAccepted(i20c)) {
    return unresolved('I20C_UNRESOLVED_OR_MISALIGNED', i65, i33, i20c, methodology, [
      'Resolved canonical I20c support-context evidence with support/force verdicts withheld is required.',
    ]);
  }

  const items: I68PairLocalClashRelativeForceComparativeEvidenceItem[] = [];

  for (const supportItem of i65.items) {
    for (const relation of supportItem.dispatchedRelationVerification) {
      if (relation.relationKind !== 'branch_clash') continue;
      const relativeForceDependency = relation.dependencyVerification.find(
        (dependency) => dependency.dependency === 'CLASH_RELATIVE_FORCE_SETTLEMENT',
      );
      if (!relativeForceDependency?.currentChartSettlementSubstrateVerified) continue;

      const i33Candidates = i33.candidates.filter(
        (candidate) =>
          candidate.mechanism === supportItem.mechanism &&
          candidate.clashRelationId === relation.relationId,
      );
      const i20cCandidates = i20c.candidates.filter(
        (candidate) => candidate.relationId === relation.relationId,
      );
      if (i33Candidates.length !== 1 || i20cCandidates.length !== 1) {
        return unresolved('I33_UNRESOLVED_OR_MISALIGNED', i65, i33, i20c, methodology, [
          `Exact unique I33/I20c candidate identity is required for dispatched clash ${relation.relationId}.`,
        ]);
      }

      const clash = i33Candidates[0];
      const support = i20cCandidates[0];
      if (clash === undefined || support === undefined) continue;
      const [first, second] = clash.participants;
      const firstSupport = exactI20cParticipant(support, first.position, String(first.branch));
      const secondSupport = exactI20cParticipant(support, second.position, String(second.branch));
      if (firstSupport === undefined || secondSupport === undefined) {
        return unresolved('I20C_UNRESOLVED_OR_MISALIGNED', i65, i33, i20c, methodology, [
          `I20c participants must match both exact I33 participants for dispatched clash ${relation.relationId}.`,
        ]);
      }

      const firstSignals = normalizedSignals(firstSupport.signals);
      const secondSignals = normalizedSignals(secondSupport.signals);
      const supportSignalSetRelation = setRelation(firstSignals, secondSignals);

      items.push({
        mechanism: supportItem.mechanism,
        relationId: relation.relationId,
        sourcePillar: supportItem.sourcePillar,
        sourceBranch: supportItem.sourceValue,
        participants: [
          {
            role: first.role,
            position: first.position,
            branch: String(first.branch),
            seasonalPhase: first.seasonalPhase,
            trackedSupportSignals: firstSignals,
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
          {
            role: second.role,
            position: second.position,
            branch: String(second.branch),
            seasonalPhase: second.seasonalPhase,
            trackedSupportSignals: secondSignals,
            supportEffect: 'not_resolved',
            relativeForceVerdict: 'not_determined',
            numericWeight: 'not_assigned',
          },
        ],
        seasonalComparison: seasonalComparison(first.seasonalPhase, second.seasonalPhase),
        supportSignalSetRelation,
        trackedEvidencePartialOrderState: partialOrderState(
          first.seasonalPhase,
          second.seasonalPhase,
          supportSignalSetRelation,
        ),
        relativeForceVerdict: 'not_determined',
        clashWinnerVerdict: 'not_determined',
        supportEffectVerdict: 'not_resolved',
        rescueEffectVerdict: 'not_resolved',
        clashSettlementVerdict: 'not_determined',
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      });
    }
  }

  return finalized({
    evidenceVersion:
      I68_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_RELATIVE_FORCE_COMPARATIVE_EVIDENCE_VERSION,
    status: 'RESOLVED_TRACKED_EVIDENCE_PARTIAL_ORDER',
    upstreamI65ReportId: i65.reportId,
    upstreamI33ReportId: i33.reportId,
    upstreamI20cReportId: i20c.reportId,
    upstreamI67ReviewId: methodology.reviewId,
    items,
    trackedEvidencePartialOrderEvidenceAvailable: items.length > 0,
    trackedEvidencePartialOrderClassificationAuthorized: true,
    trackedEvidenceDominanceCandidateIsRelativeForceVerdict: false,
    trackedEvidenceEquivalentIsRelativeForceTieVerdict: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    supportEffectResolutionAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I68 materializes only the I67 tracked-evidence partial order for exact I65-verified CLASH_RELATIVE_FORCE_SETTLEMENT substrates.',
      'Seasonal phase comes from exact I33 participant evidence; qualitative support signals come from the canonical I20c candidate matched by exact clash relation id and participant position/branch identity.',
      'NO_TRACKED_SUPPORT_CONTEXT is normalized to an empty support-signal set. Supporting-position multiplicity is not counted and support categories are not weighted.',
      'Dominance/equivalence/incomparability are tracked-evidence topology only. Final relative force, clash winner, rescue, settlement, support effect, post-relation root state, effective force, scoring, and classification remain unresolved.',
    ],
  });
}
