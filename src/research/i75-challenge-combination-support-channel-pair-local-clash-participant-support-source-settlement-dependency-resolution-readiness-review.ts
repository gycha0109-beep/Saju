import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport,
  I74ParticipantSupportSourceSettlementDependencyEvidence,
} from './i74-challenge-combination-support-channel-pair-local-clash-participant-support-source-settlement-dependency-evidence.js';

export const I75_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_RESOLUTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-pair-local-clash-participant-support-source-settlement-dependency-resolution-readiness-review-v1';

export type I75SupportSourceDependencyResolutionReadiness =
  | 'NO_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_METHODOLOGY_REQUIRED'
  | 'SAME_RELATION_CYCLE_POLICY_REQUIRED'
  | 'SUPPORT_SOURCE_SPECIFIC_CLASH_SETTLEMENT_AUTHORITY_REQUIRED'
  | 'SUPPORT_SOURCE_SPECIFIC_COMBINATION_SETTLEMENT_AUTHORITY_REQUIRED'
  | 'MULTI_TOUCH_SAME_RELATION_CYCLE_AND_PRECEDENCE_REQUIRED'
  | 'MULTI_TOUCH_SETTLEMENT_AND_PRECEDENCE_REQUIRED';

export interface I75SupportSourceDependencyResolutionReadinessItem {
  mechanism: string;
  evaluatedClashRelationId: string;
  participantRole: I74ParticipantSupportSourceSettlementDependencyEvidence['participantRole'];
  participantPosition: I74ParticipantSupportSourceSettlementDependencyEvidence['participantPosition'];
  participantBranch: string;
  sourcePillar: I74ParticipantSupportSourceSettlementDependencyEvidence['sourcePillar'];
  sourceComponent: I74ParticipantSupportSourceSettlementDependencyEvidence['sourceComponent'];
  sourceValue: string;
  dependencyClass: I74ParticipantSupportSourceSettlementDependencyEvidence['dependencyClass'];
  readiness: I75SupportSourceDependencyResolutionReadiness;
  relationSettlementDependencyCleared: boolean;
  sameRelationCyclePolicyRequired: boolean;
  supportSourceSpecificSettlementAuthorityRequired: boolean;
  crossRelationPrecedenceRequired: boolean;
  currentAuthoritySufficientForEffectiveSupportResolution: false;
  sourceActivationOrPersistenceResolved: false;
  effectiveSupportResolved: false;
  relativeForceVerdict: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status: 'RESOLVED_DEPENDENCY_RESOLUTION_READINESS' | 'I74_UNRESOLVED_OR_INVALID';
  decision: 'DEPENDENCY_RESOLUTION_PATHS_SEPARATED_NO_GENERIC_RESOLVER_AUTHORIZED';
  upstreamI74ReportId: string;
  items: readonly I75SupportSourceDependencyResolutionReadinessItem[];
  dependencyResolutionPathsSeparated: boolean;
  relationSettlementIndependentPathObserved: boolean;
  sameRelationCyclePathObserved: boolean;
  supportSourceSpecificSettlementPathObserved: boolean;
  multiTouchPrecedencePathObserved: boolean;
  genericDependencyResolverAuthorized: false;
  sameRelationCyclePolicyAuthorized: false;
  iterativeFixedPointResolutionAuthorized: false;
  numericConvergenceResolutionAuthorized: false;
  preInteractionSupportStateSubstitutionAuthorized: false;
  arbitrarySupportSourceClashSettlementAuthorized: false;
  arbitrarySupportSourceCombinationSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate: 'NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS_REVIEW';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_pair_local_clash_support_source_dependency_resolution_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i74Accepted(
  i74: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport,
): boolean {
  return (
    i74.status === 'RESOLVED_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_EVIDENCE' &&
    i74.supportSourceSettlementDependencyEvidenceAvailable &&
    i74.perTouchDependencyEvidenceAvailable &&
    i74.iterativeFixedPointResolutionAuthorized === false &&
    i74.numericConvergenceResolutionAuthorized === false &&
    i74.preInteractionSupportStateSubstitutionAuthorized === false &&
    i74.sourceActivationVerdictAuthorized === false &&
    i74.sourcePersistenceVerdictAuthorized === false &&
    i74.sourceEffectiveSupportVerdictAuthorized === false &&
    i74.relativeForceVerdictAuthorized === false &&
    i74.clashWinnerVerdictAuthorized === false &&
    i74.rescueEffectAuthorized === false &&
    i74.clashSettlementAuthorized === false &&
    i74.crossRelationPrecedenceAuthorized === false &&
    i74.effectiveMechanismForceVerdict === 'not_determined' &&
    i74.classificationAuthorized === false &&
    i74.numericScoringAuthorized === false &&
    i74.items.every((item) =>
      item.participantSupportSources.every(
        (source) =>
          source.sourceActive === 'not_determined' &&
          source.sourcePersisted === 'not_determined' &&
          source.effectiveSupportEffect === 'not_resolved' &&
          source.relativeForceVerdict === 'not_determined' &&
          source.numericWeight === 'not_assigned' &&
          source.touchDependencies.every(
            (touch) =>
              touch.settlementOutcome === 'not_determined' &&
              touch.sourceActivationOrPersistenceResolved === false &&
              touch.effectiveSupportResolved === false,
          ),
      ),
    )
  );
}

function readinessFor(
  source: I74ParticipantSupportSourceSettlementDependencyEvidence,
): I75SupportSourceDependencyResolutionReadiness {
  if (
    source.dependencyClass ===
    'NO_TRACKED_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_STILL_UNRESOLVED'
  ) {
    return 'NO_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_METHODOLOGY_REQUIRED';
  }
  if (source.dependencyClass === 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY') {
    return 'SAME_RELATION_CYCLE_POLICY_REQUIRED';
  }
  if (source.dependencyClass === 'OTHER_CLASH_SETTLEMENT_DEPENDENCY') {
    return 'SUPPORT_SOURCE_SPECIFIC_CLASH_SETTLEMENT_AUTHORITY_REQUIRED';
  }
  if (source.dependencyClass === 'COMBINATION_BINDING_SETTLEMENT_DEPENDENCY') {
    return 'SUPPORT_SOURCE_SPECIFIC_COMBINATION_SETTLEMENT_AUTHORITY_REQUIRED';
  }
  return source.sameEvaluatedClashCircularity
    ? 'MULTI_TOUCH_SAME_RELATION_CYCLE_AND_PRECEDENCE_REQUIRED'
    : 'MULTI_TOUCH_SETTLEMENT_AND_PRECEDENCE_REQUIRED';
}

function readinessItem(
  mechanism: string,
  evaluatedClashRelationId: string,
  source: I74ParticipantSupportSourceSettlementDependencyEvidence,
): I75SupportSourceDependencyResolutionReadinessItem {
  const readiness = readinessFor(source);
  const relationSettlementDependencyCleared =
    readiness === 'NO_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_METHODOLOGY_REQUIRED';
  const sameRelationCyclePolicyRequired =
    readiness === 'SAME_RELATION_CYCLE_POLICY_REQUIRED' ||
    readiness === 'MULTI_TOUCH_SAME_RELATION_CYCLE_AND_PRECEDENCE_REQUIRED';
  const supportSourceSpecificSettlementAuthorityRequired =
    readiness === 'SUPPORT_SOURCE_SPECIFIC_CLASH_SETTLEMENT_AUTHORITY_REQUIRED' ||
    readiness === 'SUPPORT_SOURCE_SPECIFIC_COMBINATION_SETTLEMENT_AUTHORITY_REQUIRED' ||
    readiness === 'MULTI_TOUCH_SAME_RELATION_CYCLE_AND_PRECEDENCE_REQUIRED' ||
    readiness === 'MULTI_TOUCH_SETTLEMENT_AND_PRECEDENCE_REQUIRED';
  const crossRelationPrecedenceRequired =
    readiness === 'MULTI_TOUCH_SAME_RELATION_CYCLE_AND_PRECEDENCE_REQUIRED' ||
    readiness === 'MULTI_TOUCH_SETTLEMENT_AND_PRECEDENCE_REQUIRED';

  return {
    mechanism,
    evaluatedClashRelationId,
    participantRole: source.participantRole,
    participantPosition: source.participantPosition,
    participantBranch: source.participantBranch,
    sourcePillar: source.sourcePillar,
    sourceComponent: source.sourceComponent,
    sourceValue: source.sourceValue,
    dependencyClass: source.dependencyClass,
    readiness,
    relationSettlementDependencyCleared,
    sameRelationCyclePolicyRequired,
    supportSourceSpecificSettlementAuthorityRequired,
    crossRelationPrecedenceRequired,
    currentAuthoritySufficientForEffectiveSupportResolution: false,
    sourceActivationOrPersistenceResolved: false,
    effectiveSupportResolved: false,
    relativeForceVerdict: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

export function buildI75ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReview(
  i74: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport,
): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport {
  if (!i74Accepted(i74)) {
    return finalized({
      reviewVersion:
        I75_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_RESOLUTION_READINESS_REVIEW_VERSION,
      status: 'I74_UNRESOLVED_OR_INVALID',
      decision: 'DEPENDENCY_RESOLUTION_PATHS_SEPARATED_NO_GENERIC_RESOLVER_AUTHORIZED',
      upstreamI74ReportId: i74.reportId,
      items: [],
      dependencyResolutionPathsSeparated: false,
      relationSettlementIndependentPathObserved: false,
      sameRelationCyclePathObserved: false,
      supportSourceSpecificSettlementPathObserved: false,
      multiTouchPrecedencePathObserved: false,
      genericDependencyResolverAuthorized: false,
      sameRelationCyclePolicyAuthorized: false,
      iterativeFixedPointResolutionAuthorized: false,
      numericConvergenceResolutionAuthorized: false,
      preInteractionSupportStateSubstitutionAuthorized: false,
      arbitrarySupportSourceClashSettlementAuthorized: false,
      arbitrarySupportSourceCombinationSettlementAuthorized: false,
      crossRelationPrecedenceAuthorized: false,
      sourceActivationVerdictAuthorized: false,
      sourcePersistenceVerdictAuthorized: false,
      sourceEffectiveSupportVerdictAuthorized: false,
      relativeForceVerdictAuthorized: false,
      clashWinnerVerdictAuthorized: false,
      rescueEffectAuthorized: false,
      clashSettlementAuthorized: false,
      targetPostRelationRootState: 'not_determined',
      effectiveMechanismForceVerdict: 'not_determined',
      relationSpecificUsefulnessHarmfulness: 'not_determined',
      classificationAuthorized: false,
      numericScoringAuthorized: false,
      recommendedNextGate: 'NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS_REVIEW',
      notes: [
        'Resolved fail-closed I74 dependency evidence is required before resolution-path readiness can be reviewed.',
      ],
    });
  }

  const items = i74.items
    .flatMap((item) =>
      item.participantSupportSources.map((source) =>
        readinessItem(item.mechanism, item.evaluatedClashRelationId, source),
      ),
    )
    .sort((left, right) =>
      [
        left.mechanism,
        left.evaluatedClashRelationId,
        left.participantPosition,
        left.sourcePillar,
        left.sourceComponent,
        left.sourceValue,
      ]
        .join('|')
        .localeCompare(
          [
            right.mechanism,
            right.evaluatedClashRelationId,
            right.participantPosition,
            right.sourcePillar,
            right.sourceComponent,
            right.sourceValue,
          ].join('|'),
        ),
    );

  return finalized({
    reviewVersion:
      I75_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_RESOLUTION_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_DEPENDENCY_RESOLUTION_READINESS',
    decision: 'DEPENDENCY_RESOLUTION_PATHS_SEPARATED_NO_GENERIC_RESOLVER_AUTHORIZED',
    upstreamI74ReportId: i74.reportId,
    items,
    dependencyResolutionPathsSeparated: true,
    relationSettlementIndependentPathObserved: items.some(
      (item) => item.relationSettlementDependencyCleared,
    ),
    sameRelationCyclePathObserved: items.some((item) => item.sameRelationCyclePolicyRequired),
    supportSourceSpecificSettlementPathObserved: items.some(
      (item) => item.supportSourceSpecificSettlementAuthorityRequired,
    ),
    multiTouchPrecedencePathObserved: items.some((item) => item.crossRelationPrecedenceRequired),
    genericDependencyResolverAuthorized: false,
    sameRelationCyclePolicyAuthorized: false,
    iterativeFixedPointResolutionAuthorized: false,
    numericConvergenceResolutionAuthorized: false,
    preInteractionSupportStateSubstitutionAuthorized: false,
    arbitrarySupportSourceClashSettlementAuthorized: false,
    arbitrarySupportSourceCombinationSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS_REVIEW',
    notes: [
      'I75 separates support-source dependency resolution paths; it does not resolve any dependency or support effect.',
      'No-touch sources are the only relation-settlement-independent path, but their activation/persistence/effective-support methodology is still unresolved.',
      'Same-evaluated-clash sources require a dedicated cycle policy before their persistence can feed the same clash relative-force decision.',
      'Other-clash and combination sources require support-source-specific settlement authority rather than borrowed challenge-target authority.',
      'Multi-touch sources additionally require per-relation settlement and cross-relation precedence, while preserving any same-relation cycle.',
    ],
  });
}
