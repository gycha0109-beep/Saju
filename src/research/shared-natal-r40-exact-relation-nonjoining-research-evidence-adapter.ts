import type { CanonicalSajuSnapshot, PillarSlot } from '../contracts/calculation.js';
import type { StructuralPillarInput } from '../calculation/structural-relations.js';
import { deriveStructuralRelationCandidates } from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  createResearchEvidenceEnvelope,
  validateResearchEvidenceEnvelope,
  type ResearchEvidenceDefinition,
  type ResearchEvidenceEnvelope,
  type ResearchEvidenceValidationResult,
} from '../interpretation/research-evidence.js';
import type { ResearchEvidenceRuntimeAdapter } from '../interpretation/research-evidence-runtime.js';
import {
  projectSajuR38RemoteNonjoining,
  SAJU_R38_REMOTE_NONJOINING_AUTHORITY,
  SAJU_R38_SOURCE,
} from './shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';
import { buildResolvedI29ChallengeTargetIntrinsicRootEvidence as b29 } from './i29-challenge-target-intrinsic-root-evidence.js';
import { buildResolvedI31ChallengeTargetRelationParticipationEvidence as b31 } from './i31-challenge-target-relation-participation-evidence.js';
import { buildResolvedI33ChallengeTargetClashDependencyEvidence as b33 } from './i33-challenge-target-clash-dependency-evidence.js';
import { buildResolvedI35ChallengeTargetCombinationDependencyEvidence as b35 } from './i35-challenge-target-combination-dependency-evidence.js';
import { buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview as b36 } from './i36-challenge-target-combination-transformation-policy-methodology-review.js';
import { buildI37ChallengeTargetCombinationTransformationReference as b37 } from './i37-challenge-target-combination-transformation-reference.js';
import { buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview as b38 } from './i38-challenge-target-combination-condition-applicability-methodology-review.js';
import { buildResolvedI39ChallengeTargetCombinationConditionEvidence as b39 } from './i39-challenge-target-combination-condition-evidence.js';
import { buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview as b44 } from './i44-challenge-root-three-combination-effective-bureau-qualification-methodology-review.js';
import { buildI45ChallengeRootThreeCombinationBureauFormationEvidence as b45 } from './i45-challenge-root-three-combination-bureau-formation-evidence.js';
import { buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview as b46 } from './i46-challenge-root-three-combination-clash-break-damage-settlement-methodology-review.js';
import { buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence as b47 } from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';
import { buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview as b51 } from './i51-challenge-combination-support-interference-effect-methodology-review.js';
import { buildI52ChallengeCombinationSupportChannelEvidence as b52 } from './i52-challenge-combination-support-channel-evidence.js';
import { buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview as b53 } from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import { buildI54ChallengeCombinationSupportChannelContestTopologyEvidence as b54 } from './i54-challenge-combination-support-channel-contest-topology-evidence.js';
import { buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence as b61 } from './i61-challenge-combination-support-channel-relation-identity-pair-evidence.js';
import { buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview as b62 } from './i62-challenge-combination-support-channel-touch-specific-settlement-dispatch-methodology-review.js';
import { buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence as b63 } from './i63-challenge-combination-support-channel-touch-specific-settlement-dispatch-evidence.js';
import { buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview as b64 } from './i64-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-methodology-review.js';
import { buildI65ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidence as b65 } from './i65-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-evidence.js';

export const SAJU_R40_VERSION = '0.1.0-research' as const;
const policy = Object.freeze({
  primitiveId: 'SAJU_R40_EXACT_R38_I61_I65_NONJOINING_RELATION_ALIGNMENT',
  version: SAJU_R40_VERSION,
  issueRef: 'GH-2444',
  r38PolicyHash: SAJU_R38_REMOTE_NONJOINING_AUTHORITY.definitionHash,
  sourceId: SAJU_R38_SOURCE.sourceId,
  scope: 'validated_year_hour_remote_stem_relation_touching_i61_support_source_and_i65_dispatch_only',
  exactRelationAndSourceIdentityRequired: true,
  replayI29ToI65Independently: true,
  noMatchingSupportSourceIsNotNegativeSupport: true,
  noGenericSettlementOutcomeAuthorized: true,
  i65SettlementOutcomePromotionAuthorized: false,
  r39JealousRivalryChangesJoiningState: false,
  fullJoiningDenialAuthorizedForExactRelation: true,
  partialEffectAuthorized: false,
  zeroEffectAuthorized: false,
  channelActivationAuthorized: false,
  channelPersistenceAuthorized: false,
  channelDestructionAuthorized: false,
  multiTouchPrecedenceAuthorized: false,
  postRelationRootStateAuthorized: false,
  effectiveMechanismForceAuthorized: false,
  numericScoringAuthorized: false,
  strengthClassificationAuthorized: false,
  narrativeMaterialityAuthorized: false,
  productionAuthorityAuthorized: false,
} as const);
export const SAJU_R40_AUTHORITY = Object.freeze({ ...policy, definitionHash: deterministicContentHash(policy) });
export const SAJU_R40_EVIDENCE_DEFINITION = {
  definitionId: 'RESEARCH-EVIDENCE-SAJU-R40-EXACT-RELATION-NONJOINING',
  version: '1.0.0-research',
  evidenceType: 'SAJU_R40_EXACT_RELATION_NONJOINING_EVIDENCE',
  evidenceVersion: 'saju-r40-relation-nonjoining-v1',
  producerRef: { id: 'BUILD-SAJU-R40-EXACT-RELATION-NONJOINING', version: '1.0.0-research' },
  payloadContractRef: { id: 'CONTRACT-SAJU-R40-EXACT-RELATION-NONJOINING', version: '1.0.0-research' },
  sourceIds: [SAJU_R38_SOURCE.sourceId],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
} as const satisfies ResearchEvidenceDefinition;

const slots = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

function resolvedPillars(snapshot: CanonicalSajuSnapshot): StructuralPillarInput | null {
  if (slots.some((slot) => snapshot.pillars?.[slot]?.status !== 'resolved')) return null;
  const year = snapshot.pillars.year;
  const month = snapshot.pillars.month;
  const day = snapshot.pillars.day;
  const hour = snapshot.pillars.hour;
  if (year.status !== 'resolved' || month.status !== 'resolved' ||
      day.status !== 'resolved' || hour.status !== 'resolved') return null;
  return { year: year.value, month: month.value, day: day.value, hour: hour.value };
}

function fullReplay(pillars: StructuralPillarInput, snapshotId: string) {
  const i29 = b29(pillars, snapshotId);
  const i31 = b31(pillars, i29);
  const i33 = b33(pillars, i29, i31);
  const i35 = b35(pillars, i29, i31);
  const i36 = b36();
  const i37 = b37(i35, i36);
  const i38 = b38();
  const i39 = b39(pillars, i35, i37, i38);
  const i44 = b44();
  const i45 = b45(i39, i44);
  const i46 = b46();
  const i47 = b47(pillars, i45, i46);
  const i51 = b51();
  const i52 = b52(i39, i51);
  const i53 = b53();
  const i54 = b54(pillars, i39, i52, i53);
  const i61 = b61(pillars, i54);
  const i62 = b62();
  const i63 = b63(i61, i62);
  const i64 = b64();
  const i65 = b65(i61, i62, i63, i64, i33, i35, i47);
  return { i61, i65 };
}

export function projectSajuR40ExactRelationNonjoining(snapshot: CanonicalSajuSnapshot) {
  const unavailable = (reason: string) => ({ status: 'unavailable' as const, reasonCode: 'saju-r40-' + reason });
  if (!snapshot.snapshotId?.trim() || !snapshot.calculationHash?.trim())
    return unavailable('snapshot-binding-missing');
  if (!Array.isArray(snapshot.scenarios) || snapshot.scenarios.length !== 0)
    return unavailable('scenario-materialization-required');
  const pillars = resolvedPillars(snapshot);
  if (pillars === null) return unavailable('four-pillars-unresolved');

  const remote = projectSajuR38RemoteNonjoining(snapshot);
  if (remote.status !== 'resolved') return unavailable('r38-' + remote.reasonCode);
  const { i61, i65 } = fullReplay(pillars, snapshot.snapshotId);
  if (i61.status !== 'RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE' ||
      i65.status !== 'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE')
    return unavailable('i61-i65-graph-unresolved');

  const remoteParticipantRelation = deriveStructuralRelationCandidates(pillars).find((relation) =>
    relation.kind === 'stem_five_combination' &&
    relation.participants.length === 2 &&
    relation.participants.some((participant) =>
      participant.pillar === 'year' && participant.component === 'stem' &&
      participant.value === pillars.year?.stem.value
    ) &&
    relation.participants.some((participant) =>
      participant.pillar === 'hour' && participant.component === 'stem' &&
      participant.value === pillars.hour?.stem.value
    ),
  );

  const aligned = [];
  if (
    remote.projection.state === 'remote_nonjoining' &&
    remote.projection.fullJoining === false &&
    remoteParticipantRelation !== undefined
  ) {
    for (const channel of i61.items) {
      if (channel.sourceComponent !== 'stem' ||
          (channel.sourcePillar !== 'year' && channel.sourcePillar !== 'hour')) continue;
      const touch = channel.touchingRelations.find((relation) =>
        relation.relationId === remoteParticipantRelation.relationId &&
        relation.relationKind === 'stem_five_combination',
      );
      if (touch === undefined) continue;

      const exactI65 = i65.items.find((item) =>
        item.mechanism === channel.mechanism &&
        item.currentCombinationRelationId === channel.currentCombinationRelationId &&
        item.supportChannelKind === channel.supportChannelKind &&
        item.sourcePillar === channel.sourcePillar &&
        item.sourceComponent === channel.sourceComponent &&
        item.sourceValue === channel.sourceValue &&
        item.targetParticipantPillar === channel.targetParticipantPillar &&
        item.targetParticipantComponent === channel.targetParticipantComponent &&
        item.targetParticipantValue === channel.targetParticipantValue &&
        item.dispatchedRelationVerification.some((dispatch) =>
          dispatch.relationId === touch.relationId &&
          dispatch.relationKind === touch.relationKind &&
          dispatch.settlementOutcome === 'not_determined',
        ),
      );
      if (exactI65 === undefined) continue;
      aligned.push({
        relationId: touch.relationId,
        relationKind: touch.relationKind,
        pairId: remote.projection.pairId,
        yearStem: remote.projection.stems.year,
        hourStem: remote.projection.stems.hour,
        mechanism: channel.mechanism,
        currentCombinationRelationId: channel.currentCombinationRelationId,
        supportChannelKind: channel.supportChannelKind,
        supportSourcePillar: channel.sourcePillar,
        supportSourceComponent: channel.sourceComponent,
        supportSourceValue: channel.sourceValue,
        targetParticipantPillar: channel.targetParticipantPillar,
        targetParticipantComponent: channel.targetParticipantComponent,
        targetParticipantValue: channel.targetParticipantValue,
        i65DispatchedIdentityVerified: true as const,
        fullJoining: false as const,
        partialEffect: 'not_determined' as const,
        supportChannelActive: 'not_determined' as const,
        supportChannelPersisted: 'not_determined' as const,
        supportChannelDestroyed: 'not_determined' as const,
        settlementOutcome: 'not_determined' as const,
      });
    }
  }

  aligned.sort((a,b)=>
    [a.relationId,a.currentCombinationRelationId,a.mechanism,a.supportSourcePillar,a.supportChannelKind].join('|')
    .localeCompare([b.relationId,b.currentCombinationRelationId,b.mechanism,b.supportSourcePillar,b.supportChannelKind].join('|'))
  );
  return {
    status: 'resolved' as const,
    projection: {
      version: SAJU_R40_VERSION,
      snapshotId: snapshot.snapshotId,
      snapshotHash: snapshot.calculationHash,
      remoteR38ProjectionHash: deterministicContentHash(remote.projection),
      upstreamI61ReportId: i61.reportId,
      upstreamI65ReportId: i65.reportId,
      exactStructuralRelationId: remoteParticipantRelation?.relationId ?? null,
      alignedItems: aligned,
      exactSourceRelationFullJoiningDenied: aligned.length > 0,
      noAlignedItemsMeansNoSupport: false as const,
      partialEffect: 'not_determined' as const,
      effectiveSupport: 'not_determined' as const,
      strongWeak: 'not_determined' as const,
      constraints: SAJU_R40_AUTHORITY,
    },
  } as const;
}

export function buildSajuR40ExactRelationNonjoiningResearchEvidence(snapshot: CanonicalSajuSnapshot) {
  const result = projectSajuR40ExactRelationNonjoining(snapshot);
  if (result.status !== 'resolved') return result;
  return {
    status: 'resolved' as const,
    envelope: createResearchEvidenceEnvelope(SAJU_R40_EVIDENCE_DEFINITION,snapshot,result.projection),
  };
}

export function validateSajuR40ExactRelationNonjoiningResearchEvidence(
  envelope: ResearchEvidenceEnvelope,
  snapshot: CanonicalSajuSnapshot,
): ResearchEvidenceValidationResult {
  const base = validateResearchEvidenceEnvelope(envelope,snapshot,SAJU_R40_EVIDENCE_DEFINITION);
  const errors = [...base.errors];
  const replay = projectSajuR40ExactRelationNonjoining(snapshot);
  if (replay.status !== 'resolved') errors.push(replay.reasonCode);
  if (replay.status !== 'resolved' ||
      deterministicContentHash(replay.projection) !== deterministicContentHash(envelope.payload))
    errors.push('r40_full_i61_i65_exact_relation_replay_mismatch');
  return { valid: errors.length===0, errors: [...new Set(errors)].sort() };
}

export const SAJU_R40_RUNTIME_ADAPTER = {
  definition: SAJU_R40_EVIDENCE_DEFINITION,
  validate: validateSajuR40ExactRelationNonjoiningResearchEvidence,
} satisfies ResearchEvidenceRuntimeAdapter;
