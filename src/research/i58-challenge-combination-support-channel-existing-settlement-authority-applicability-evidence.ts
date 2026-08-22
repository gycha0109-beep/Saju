import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem,
  ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
} from './i56-challenge-combination-support-channel-settlement-dependency-evidence.js';
import {
  buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview,
  type ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport,
  type ExistingSettlementAuthorityApplicabilityStatus,
} from './i57-challenge-combination-support-channel-existing-settlement-authority-applicability-review.js';
import type { ChallengeCombinationSupportChannelContestSettlementDependency } from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';

export const I58_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-existing-settlement-authority-applicability-evidence-v1';

export interface ChallengeCombinationSupportChannelSettlementAuthorityApplicabilityEvidence {
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency;
  applicabilityStatus: ExistingSettlementAuthorityApplicabilityStatus;
  authorityRefs: readonly string[];
  reusableSubstrateAvailable: boolean;
  currentChartSettlementSubstrateVerified: false;
  settlementOutcomeResolved: false;
}

export interface ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem {
  mechanism: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['mechanism'];
  currentCombinationRelationId: string;
  currentCombinationRelationKind: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['currentCombinationRelationKind'];
  targetParticipantPillar: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['targetParticipantPillar'];
  targetParticipantComponent: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['targetParticipantComponent'];
  targetParticipantValue: string;
  supportChannelKind: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['supportChannelKind'];
  sourcePillar: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['sourcePillar'];
  sourceComponent: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['sourceComponent'];
  sourceValue: string;
  contestTopologyState: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['contestTopologyState'];
  touchingRelationIds: readonly string[];
  touchingRelationKinds: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['touchingRelationKinds'];
  touchCount: number;
  directContestSettlementRequired: boolean;
  requiredSettlementDependencies: readonly ChallengeCombinationSupportChannelContestSettlementDependency[];
  dependencyApplicability: readonly ChallengeCombinationSupportChannelSettlementAuthorityApplicabilityEvidence[];
  allRequiredSettlementDependenciesHaveApplicabilityEvidence: true;
  anySettlementOutcomeResolved: false;
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelNeutralized: 'not_determined';
  supportChannelDestroyed: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE'
    | 'I56_UNRESOLVED_OR_INVALID'
    | 'I57_METHODOLOGY_NOT_AUTHORIZED'
    | 'DEPENDENCY_APPLICABILITY_MISMATCH';
  upstreamI56ReportId: string;
  upstreamI57ReviewId: string;
  items: readonly ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem[];
  authorityApplicabilityEvidenceAvailable: boolean;
  currentChartRelationSpecificSettlementEvidenceVerified: false;
  anyRoutedSettlementOutcomeResolved: false;
  contestOutcomeVerdictAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelNeutralizationVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<
    ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
    'reportId'
  >,
): ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_existing_settlement_authority_applicability_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport['status'],
    'RESOLVED_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE'
  >,
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
  applicabilityReview: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport {
  return finalized({
    evidenceVersion:
      I58_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE_VERSION,
    status,
    upstreamI56ReportId: settlementEvidence.reportId,
    upstreamI57ReviewId: applicabilityReview.reviewId,
    items: [],
    authorityApplicabilityEvidenceAvailable: false,
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
    notes,
  });
}

function i56ContractAccepted(
  evidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
): boolean {
  return (
    evidence.status === 'RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE' &&
    evidence.settlementDependencyEvidenceAvailable &&
    evidence.contestOutcomeVerdictAuthorized === false &&
    evidence.supportChannelActivationVerdictAuthorized === false &&
    evidence.supportChannelPersistenceVerdictAuthorized === false &&
    evidence.supportChannelNeutralizationVerdictAuthorized === false &&
    evidence.supportChannelDestructionVerdictAuthorized === false &&
    evidence.supportChannelNetEffectVerdictAuthorized === false &&
    evidence.effectiveMechanismForceVerdict === 'not_determined' &&
    evidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    evidence.classificationAuthorized === false &&
    evidence.numericScoringAuthorized === false &&
    evidence.items.every(
      (item) =>
        item.settlementDependenciesResolved === false &&
        item.supportChannelActive === 'not_determined' &&
        item.supportChannelPersisted === 'not_determined' &&
        item.supportChannelNeutralized === 'not_determined' &&
        item.supportChannelDestroyed === 'not_determined' &&
        item.supportChannelNetEffect === 'not_resolved' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
        item.numericScore === 'not_assigned' &&
        new Set(item.requiredSettlementDependencies).size ===
          item.requiredSettlementDependencies.length,
    )
  );
}

function i57MethodologyAccepted(
  review: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport,
): boolean {
  const canonical =
    buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
  return (
    review.reviewId === canonical.reviewId &&
    review.decision ===
      'EXISTING_RELATION_SPECIFIC_SUBSTRATE_REUSE_AUTHORIZED_GENERIC_SETTLEMENT_RESOLUTION_BLOCKED' &&
    review.existingRelationSpecificSubstrateReuseAuthorized &&
    review.routedDependencyOutcomeResolutionAuthorized === false &&
    review.bureauBreakToSupportSourceDestroyedAuthorized === false &&
    review.seasonalAdvantageToRelativeForceVerdictAuthorized === false &&
    review.rescueTopologyToRescueEffectAuthorized === false &&
    review.combinationParticipationToBindingVerdictAuthorized === false &&
    review.multiTouchIdKindPairingSufficient === false &&
    review.crossRelationPrecedenceAuthorized === false &&
    review.supportChannelActivationVerdictAuthorized === false &&
    review.supportChannelPersistenceVerdictAuthorized === false &&
    review.supportChannelNeutralizationVerdictAuthorized === false &&
    review.supportChannelDestructionVerdictAuthorized === false &&
    review.supportChannelNetEffectVerdictAuthorized === false &&
    review.classificationAuthorized === false &&
    review.numericScoringAuthorized === false
  );
}

function applicabilityMap(
  review: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport,
): ReadonlyMap<
  ChallengeCombinationSupportChannelContestSettlementDependency,
  ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport['applicability'][number]
> | undefined {
  const map = new Map<
    ChallengeCombinationSupportChannelContestSettlementDependency,
    ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport['applicability'][number]
  >();
  for (const item of review.applicability) {
    if (map.has(item.dependency)) return undefined;
    map.set(item.dependency, item);
  }
  return map;
}

function evidenceItem(
  item: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem,
  map: ReadonlyMap<
    ChallengeCombinationSupportChannelContestSettlementDependency,
    ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport['applicability'][number]
  >,
): ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem | undefined {
  const dependencyApplicability: ChallengeCombinationSupportChannelSettlementAuthorityApplicabilityEvidence[] = [];
  for (const dependency of item.requiredSettlementDependencies) {
    const applicability = map.get(dependency);
    if (applicability === undefined || applicability.settlementOutcomeResolved) return undefined;
    dependencyApplicability.push({
      dependency,
      applicabilityStatus: applicability.status,
      authorityRefs: applicability.authorityRefs,
      reusableSubstrateAvailable: applicability.reusableSubstrateAvailable,
      currentChartSettlementSubstrateVerified: false,
      settlementOutcomeResolved: false,
    });
  }

  return {
    mechanism: item.mechanism,
    currentCombinationRelationId: item.currentCombinationRelationId,
    currentCombinationRelationKind: item.currentCombinationRelationKind,
    targetParticipantPillar: item.targetParticipantPillar,
    targetParticipantComponent: item.targetParticipantComponent,
    targetParticipantValue: item.targetParticipantValue,
    supportChannelKind: item.supportChannelKind,
    sourcePillar: item.sourcePillar,
    sourceComponent: item.sourceComponent,
    sourceValue: item.sourceValue,
    contestTopologyState: item.contestTopologyState,
    touchingRelationIds: item.touchingRelationIds,
    touchingRelationKinds: item.touchingRelationKinds,
    touchCount: item.touchCount,
    directContestSettlementRequired: item.directContestSettlementRequired,
    requiredSettlementDependencies: item.requiredSettlementDependencies,
    dependencyApplicability,
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
  };
}

export function buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
  applicabilityReview: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport,
): ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport {
  if (!i56ContractAccepted(settlementEvidence)) {
    return unresolved('I56_UNRESOLVED_OR_INVALID', settlementEvidence, applicabilityReview, [
      'Resolved I56 settlement-dependency evidence with every outcome/activation/persistence/net-effect/force/scoring guard closed is required.',
    ]);
  }
  if (!i57MethodologyAccepted(applicabilityReview)) {
    return unresolved('I57_METHODOLOGY_NOT_AUTHORIZED', settlementEvidence, applicabilityReview, [
      'The supplied I57 review must match the canonical existing-authority-applicability-only contract.',
    ]);
  }

  const map = applicabilityMap(applicabilityReview);
  if (map === undefined) {
    return unresolved('DEPENDENCY_APPLICABILITY_MISMATCH', settlementEvidence, applicabilityReview, [
      'I57 must provide exactly one applicability item per routed dependency kind.',
    ]);
  }

  const items: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem[] = [];
  for (const item of settlementEvidence.items) {
    const mapped = evidenceItem(item, map);
    if (mapped === undefined) {
      return unresolved('DEPENDENCY_APPLICABILITY_MISMATCH', settlementEvidence, applicabilityReview, [
        'Every I56 required settlement dependency must have one unresolved I57 applicability classification.',
      ]);
    }
    items.push(mapped);
  }

  return finalized({
    evidenceVersion:
      I58_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE_VERSION,
    status: 'RESOLVED_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE',
    upstreamI56ReportId: settlementEvidence.reportId,
    upstreamI57ReviewId: applicabilityReview.reviewId,
    items,
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
    notes: [
      'I58 binds each exact I56 routed dependency to the canonical I57 existing-authority applicability classification without claiming that current-chart relation-specific settlement evidence has been verified.',
      'reusableSubstrateAvailable denotes methodology-level authority reuse potential only; currentChartSettlementSubstrateVerified remains false for every dependency applicability item.',
      'The I47 narrow three-combination bureau break authority remains bureau-local and is not converted to support-source destruction or generic clash settlement.',
      'Multi-touch touch-specific settlement remains pairing-insufficient, and competing-relation settlement remains precedence-unresolved.',
      'No routed settlement outcome, support activation/persistence/net effect, post-relation root state, effective force, usefulness/harmfulness, scoring, or strength classification is emitted.',
    ],
  });
}
