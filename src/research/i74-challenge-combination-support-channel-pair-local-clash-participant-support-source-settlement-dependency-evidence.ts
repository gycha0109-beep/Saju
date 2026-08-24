import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport,
  I72ParticipantSupportSourceContestEvidence,
  I72SupportSourceRelationTouchEvidence,
} from './i72-challenge-combination-support-channel-pair-local-clash-participant-support-source-contest-topology-evidence.js';
import {
  buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview,
  type ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReviewReport,
  type I73SupportSourceSettlementDependencyClass,
} from './i73-challenge-combination-support-channel-pair-local-clash-participant-support-source-settlement-dependency-circularity-methodology-review.js';

export const I74_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-pair-local-clash-participant-support-source-settlement-dependency-evidence-v1';

export type I74PerTouchSettlementDependencyClass =
  | 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY'
  | 'OTHER_CLASH_SETTLEMENT_DEPENDENCY'
  | 'COMBINATION_BINDING_SETTLEMENT_DEPENDENCY';

export interface I74SupportSourceTouchSettlementDependencyEvidence {
  relationId: string;
  relationKind: I72SupportSourceRelationTouchEvidence['relationKind'];
  isEvaluatedClashRelation: boolean;
  dependencyClass: I74PerTouchSettlementDependencyClass;
  sameEvaluatedClashCircularity: boolean;
  settlementOutcome: 'not_determined';
  sourceActivationOrPersistenceResolved: false;
  effectiveSupportResolved: false;
}

export interface I74ParticipantSupportSourceSettlementDependencyEvidence {
  participantRole: I72ParticipantSupportSourceContestEvidence['participantRole'];
  participantPosition: I72ParticipantSupportSourceContestEvidence['participantPosition'];
  participantBranch: string;
  sourcePillar: I72ParticipantSupportSourceContestEvidence['sourcePillar'];
  sourceComponent: I72ParticipantSupportSourceContestEvidence['sourceComponent'];
  sourceValue: string;
  supportSignals: I72ParticipantSupportSourceContestEvidence['supportSignals'];
  contestTopologyState: I72ParticipantSupportSourceContestEvidence['contestTopologyState'];
  dependencyClass: I73SupportSourceSettlementDependencyClass;
  touchDependencies: readonly I74SupportSourceTouchSettlementDependencyEvidence[];
  sameEvaluatedClashCircularity: boolean;
  independentRelationSettlementRequired: boolean;
  crossRelationPrecedenceMayBeRequired: boolean;
  sourceActive: 'not_determined';
  sourcePersisted: 'not_determined';
  effectiveSupportEffect: 'not_resolved';
  relativeForceVerdict: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface I74PairLocalClashParticipantSupportSourceSettlementDependencyEvidenceItem {
  mechanism: string;
  evaluatedClashRelationId: string;
  participantSupportSources: readonly I74ParticipantSupportSourceSettlementDependencyEvidence[];
  anySameEvaluatedClashCircularity: boolean;
  anyIndependentRelationSettlementDependency: boolean;
  anyCrossRelationPrecedenceDependency: boolean;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdict: 'not_determined';
  clashWinnerVerdict: 'not_determined';
  rescueEffectVerdict: 'not_resolved';
  clashSettlementVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_EVIDENCE'
    | 'I72_UNRESOLVED_OR_INVALID'
    | 'I73_METHODOLOGY_NOT_AUTHORIZED'
    | 'TOPOLOGY_TOUCH_METADATA_MISMATCH';
  upstreamI72ReportId: string;
  upstreamI73ReviewId: string;
  items: readonly I74PairLocalClashParticipantSupportSourceSettlementDependencyEvidenceItem[];
  supportSourceSettlementDependencyEvidenceAvailable: boolean;
  perTouchDependencyEvidenceAvailable: boolean;
  sameEvaluatedClashCircularityEvidenceAvailable: boolean;
  iterativeFixedPointResolutionAuthorized: false;
  numericConvergenceResolutionAuthorized: false;
  preInteractionSupportStateSubstitutionAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
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

function finalized(
  material: Omit<ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport, 'reportId'>,
): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_pair_local_clash_support_source_settlement_dependency_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport['status'],
    'RESOLVED_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_EVIDENCE'
  >,
  i72: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport,
  methodology: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport {
  return finalized({
    evidenceVersion:
      I74_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_EVIDENCE_VERSION,
    status,
    upstreamI72ReportId: i72.reportId,
    upstreamI73ReviewId: methodology.reviewId,
    items: [],
    supportSourceSettlementDependencyEvidenceAvailable: false,
    perTouchDependencyEvidenceAvailable: false,
    sameEvaluatedClashCircularityEvidenceAvailable: false,
    iterativeFixedPointResolutionAuthorized: false,
    numericConvergenceResolutionAuthorized: false,
    preInteractionSupportStateSubstitutionAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
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
  methodology: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReviewReport,
): boolean {
  const canonical =
    buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview();
  return (
    methodology.reviewId === canonical.reviewId &&
    methodology.decision ===
      'SOURCE_LOCAL_SETTLEMENT_DEPENDENCY_CLASSIFICATION_AUTHORIZED_RECURSIVE_EFFECT_RESOLUTION_BLOCKED' &&
    methodology.exactI72SourceTopologyEvidenceRequired &&
    methodology.sourceLocalDependencyClassificationAuthorized &&
    methodology.evaluatedClashSelfDependencyDetectionAuthorized &&
    methodology.evaluatedClashSelfDependencyMayBeIgnored === false &&
    methodology.evaluatedClashPersistenceMayFeedSameClashRelativeForceWithoutCyclePolicy === false &&
    methodology.iterativeFixedPointResolutionAuthorized === false &&
    methodology.numericConvergenceResolutionAuthorized === false &&
    methodology.preInteractionSupportStateSubstitutionAuthorized === false &&
    methodology.multiTouchPerRelationDependencyPreservationRequired &&
    methodology.multiTouchFixedPrecedenceAuthorized === false &&
    methodology.noTrackedRelationTouchMeansEffectiveSupport === false &&
    methodology.sourceActivationVerdictAuthorized === false &&
    methodology.sourcePersistenceVerdictAuthorized === false &&
    methodology.sourceEffectiveSupportVerdictAuthorized === false &&
    methodology.relativeForceVerdictAuthorized === false &&
    methodology.crossRelationPrecedenceAuthorized === false &&
    methodology.classificationAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function i72Accepted(
  i72: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport,
): boolean {
  return (
    i72.status === 'RESOLVED_SUPPORT_SOURCE_CONTEST_TOPOLOGY_EVIDENCE' &&
    i72.supportSourceIdentityEvidenceAvailable &&
    i72.supportSourceContestTopologyEvidenceAvailable &&
    i72.authoritativeRelationIdKindPairEvidenceAvailable &&
    i72.sourceActivationVerdictAuthorized === false &&
    i72.sourcePersistenceVerdictAuthorized === false &&
    i72.sourceEffectiveSupportVerdictAuthorized === false &&
    i72.relativeForceVerdictAuthorized === false &&
    i72.clashWinnerVerdictAuthorized === false &&
    i72.rescueEffectAuthorized === false &&
    i72.clashSettlementAuthorized === false &&
    i72.crossRelationPrecedenceAuthorized === false &&
    i72.effectiveMechanismForceVerdict === 'not_determined' &&
    i72.classificationAuthorized === false &&
    i72.numericScoringAuthorized === false &&
    i72.items.every((item) =>
      item.participantSupportSources.every(
        (source) =>
          source.sourceActive === 'not_determined' &&
          source.sourcePersisted === 'not_determined' &&
          source.effectiveSupportEffect === 'not_resolved' &&
          source.relativeForceVerdict === 'not_determined' &&
          source.numericWeight === 'not_assigned',
      ),
    )
  );
}

function expectedTopologyState(
  evaluatedClashRelationId: string,
  touches: readonly I72SupportSourceRelationTouchEvidence[],
): I72ParticipantSupportSourceContestEvidence['contestTopologyState'] {
  if (touches.length === 0) return 'NO_TRACKED_RELATION_TOUCH';
  if (touches.length > 1) return 'MULTIPLE_TRACKED_RELATION_TOUCHES';
  const touch = touches[0];
  if (touch === undefined) return 'NO_TRACKED_RELATION_TOUCH';
  if (touch.relationId === evaluatedClashRelationId && touch.relationKind === 'branch_clash') {
    return 'EVALUATED_CLASH_PARTICIPATION';
  }
  if (touch.relationKind === 'branch_clash') return 'OTHER_CLASH_TOUCH';
  return 'COMBINATION_TOUCH';
}

function touchMetadataAligned(
  evaluatedClashRelationId: string,
  source: I72ParticipantSupportSourceContestEvidence,
): boolean {
  if (source.touchCount !== source.touchingRelations.length) return false;
  if (source.contestTopologyState !== expectedTopologyState(evaluatedClashRelationId, source.touchingRelations)) {
    return false;
  }
  return source.touchingRelations.every((touch) => {
    const shouldBeEvaluated =
      touch.relationId === evaluatedClashRelationId && touch.relationKind === 'branch_clash';
    return touch.isEvaluatedClashRelation === shouldBeEvaluated;
  });
}

function touchDependency(
  touch: I72SupportSourceRelationTouchEvidence,
): I74SupportSourceTouchSettlementDependencyEvidence {
  const dependencyClass: I74PerTouchSettlementDependencyClass = touch.isEvaluatedClashRelation
    ? 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY'
    : touch.relationKind === 'branch_clash'
      ? 'OTHER_CLASH_SETTLEMENT_DEPENDENCY'
      : 'COMBINATION_BINDING_SETTLEMENT_DEPENDENCY';
  return {
    relationId: touch.relationId,
    relationKind: touch.relationKind,
    isEvaluatedClashRelation: touch.isEvaluatedClashRelation,
    dependencyClass,
    sameEvaluatedClashCircularity:
      dependencyClass === 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY',
    settlementOutcome: 'not_determined',
    sourceActivationOrPersistenceResolved: false,
    effectiveSupportResolved: false,
  };
}

function aggregateDependencyClass(
  topologyState: I72ParticipantSupportSourceContestEvidence['contestTopologyState'],
): I73SupportSourceSettlementDependencyClass {
  if (topologyState === 'NO_TRACKED_RELATION_TOUCH') {
    return 'NO_TRACKED_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_STILL_UNRESOLVED';
  }
  if (topologyState === 'EVALUATED_CLASH_PARTICIPATION') {
    return 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY';
  }
  if (topologyState === 'OTHER_CLASH_TOUCH') return 'OTHER_CLASH_SETTLEMENT_DEPENDENCY';
  if (topologyState === 'COMBINATION_TOUCH') return 'COMBINATION_BINDING_SETTLEMENT_DEPENDENCY';
  return 'MULTI_TOUCH_COMPOSITE_SETTLEMENT_DEPENDENCY';
}

function sourceEvidence(
  source: I72ParticipantSupportSourceContestEvidence,
): I74ParticipantSupportSourceSettlementDependencyEvidence {
  const touchDependencies = source.touchingRelations.map(touchDependency);
  const sameEvaluatedClashCircularity = touchDependencies.some(
    (touch) => touch.sameEvaluatedClashCircularity,
  );
  const independentRelationSettlementRequired = touchDependencies.some(
    (touch) => !touch.sameEvaluatedClashCircularity,
  );
  return {
    participantRole: source.participantRole,
    participantPosition: source.participantPosition,
    participantBranch: source.participantBranch,
    sourcePillar: source.sourcePillar,
    sourceComponent: source.sourceComponent,
    sourceValue: source.sourceValue,
    supportSignals: source.supportSignals,
    contestTopologyState: source.contestTopologyState,
    dependencyClass: aggregateDependencyClass(source.contestTopologyState),
    touchDependencies,
    sameEvaluatedClashCircularity,
    independentRelationSettlementRequired,
    crossRelationPrecedenceMayBeRequired: touchDependencies.length > 1,
    sourceActive: 'not_determined',
    sourcePersisted: 'not_determined',
    effectiveSupportEffect: 'not_resolved',
    relativeForceVerdict: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

export function buildI74ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidence(
  i72: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport,
  methodology: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReviewReport,
): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport {
  if (!methodologyAccepted(methodology)) {
    return unresolved('I73_METHODOLOGY_NOT_AUTHORIZED', i72, methodology, [
      'The supplied I73 review must exactly match the canonical fail-closed support-source settlement dependency methodology.',
    ]);
  }
  if (!i72Accepted(i72)) {
    return unresolved('I72_UNRESOLVED_OR_INVALID', i72, methodology, [
      'Resolved I72 support-source identity and contest-topology evidence with all effect verdicts withheld is required.',
    ]);
  }

  for (const item of i72.items) {
    for (const source of item.participantSupportSources) {
      if (!touchMetadataAligned(item.evaluatedClashRelationId, source)) {
        return unresolved('TOPOLOGY_TOUCH_METADATA_MISMATCH', i72, methodology, [
          'An I72 source topology state, touch count, evaluated-clash flag, or relation kind is inconsistent with exact touch metadata.',
        ]);
      }
    }
  }

  const items = i72.items.map((item) => {
    const participantSupportSources = item.participantSupportSources.map(sourceEvidence);
    return {
      mechanism: item.mechanism,
      evaluatedClashRelationId: item.evaluatedClashRelationId,
      participantSupportSources,
      anySameEvaluatedClashCircularity: participantSupportSources.some(
        (source) => source.sameEvaluatedClashCircularity,
      ),
      anyIndependentRelationSettlementDependency: participantSupportSources.some(
        (source) => source.independentRelationSettlementRequired,
      ),
      anyCrossRelationPrecedenceDependency: participantSupportSources.some(
        (source) => source.crossRelationPrecedenceMayBeRequired,
      ),
      sourceActivationVerdictAuthorized: false as const,
      sourcePersistenceVerdictAuthorized: false as const,
      sourceEffectiveSupportVerdictAuthorized: false as const,
      relativeForceVerdict: 'not_determined' as const,
      clashWinnerVerdict: 'not_determined' as const,
      rescueEffectVerdict: 'not_resolved' as const,
      clashSettlementVerdict: 'not_determined' as const,
      targetPostRelationRootState: 'not_determined' as const,
      effectiveMechanismForceVerdict: 'not_determined' as const,
      relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
      numericScore: 'not_assigned' as const,
    };
  });

  return finalized({
    evidenceVersion:
      I74_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_EVIDENCE_VERSION,
    status: 'RESOLVED_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_EVIDENCE',
    upstreamI72ReportId: i72.reportId,
    upstreamI73ReviewId: methodology.reviewId,
    items,
    supportSourceSettlementDependencyEvidenceAvailable: true,
    perTouchDependencyEvidenceAvailable: true,
    sameEvaluatedClashCircularityEvidenceAvailable: items.some(
      (item) => item.anySameEvaluatedClashCircularity,
    ),
    iterativeFixedPointResolutionAuthorized: false,
    numericConvergenceResolutionAuthorized: false,
    preInteractionSupportStateSubstitutionAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I74 materializes I73 settlement-dependency classes from exact I72 support-source topology evidence without resolving any relation outcome or support effect.',
      'Multi-touch aggregate classification never erases per-touch dependencies. If one touch is the evaluated clash itself, sameEvaluatedClashCircularity remains explicitly true even though the aggregate class is MULTI_TOUCH_COMPOSITE_SETTLEMENT_DEPENDENCY.',
      'NO_TRACKED_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_STILL_UNRESOLVED means only that no tracked direct relation settlement is required for that source; it does not establish activation, persistence, or effective support.',
      'Relative force, clash winner, rescue effect, clash settlement, source persistence, effective support, effective mechanism force, scoring, and classification remain unauthorized.',
    ],
  });
}
