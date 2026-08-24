import type { StructuralPillarInput } from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV20Report } from './i26-challenge-context-availability-v20.js';
import type { ChallengeCombinationSupportChannelContestTopologyEvidenceReport } from './i54-challenge-combination-support-channel-contest-topology-evidence.js';
import type { ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport } from './i56-challenge-combination-support-channel-settlement-dependency-evidence.js';
import type { ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport } from './i58-challenge-combination-support-channel-existing-settlement-authority-applicability-evidence.js';
import {
  buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence,
  type ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem,
  type ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
} from './i61-challenge-combination-support-channel-relation-identity-pair-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V21_VERSION =
  'myeonghwa-challenge-context-availability-v21';

export interface ChallengeContextAvailabilityV21Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV20ReportId: string;
  relationIdentityPairEvidenceReportId: string;
  relationIdentityPairClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

type CombinationFamily = 'stem' | 'root';

const ALIGNMENT_GAP =
  'resolved I61 relation-id/kind pair evidence aligned to exact I54/I56/I58/I26-v20 identity';

function familyForItem(
  item: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem,
): CombinationFamily {
  return item.currentCombinationRelationKind === 'stem_five_combination' ? 'stem' : 'root';
}

function familyPrefix(family: CombinationFamily): string {
  return family === 'stem' ? 'challenge-target stem-combination' : 'challenge-root combination';
}

function pairingGap(family: CombinationFamily): string {
  return `${familyPrefix(family)} support-channel touch-specific relation identity pairing unresolved: TOUCH_SPECIFIC_RELATION_SETTLEMENT`;
}

function postPairGap(family: CombinationFamily): string {
  return `${familyPrefix(family)} support-channel touch-specific relation settlement methodology/dispatch unresolved after verified relation identity pairs: TOUCH_SPECIFIC_RELATION_SETTLEMENT`;
}

function chainAligned(
  pillars: StructuralPillarInput,
  availabilityV20: ChallengeContextAvailabilityV20Report,
  applicabilityEvidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
  topologyEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
): boolean {
  if (!availabilityV20.currentChartSubstrateClosureAccepted) return false;
  if (availabilityV20.authorityApplicabilityEvidenceReportId !== applicabilityEvidence.reportId) {
    return false;
  }
  if (applicabilityEvidence.upstreamI56ReportId !== settlementEvidence.reportId) return false;
  if (settlementEvidence.upstreamI54ReportId !== topologyEvidence.reportId) return false;
  if (pairEvidence.upstreamI54ReportId !== topologyEvidence.reportId) return false;

  const expected = buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
    pillars,
    topologyEvidence,
  );
  return expected.reportId === pairEvidence.reportId;
}

function pairEvidenceContractAccepted(
  evidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
): boolean {
  return (
    evidence.status === 'RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE' &&
    evidence.relationIdKindPairEvidenceAvailable &&
    evidence.pairReconstructionFromSeparateI54ArraysUsed === false &&
    evidence.touchSpecificSettlementDispatchAuthorized === false &&
    evidence.crossRelationPrecedenceAuthorized === false &&
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
        item.relationIdKindPairEvidenceAvailable &&
        item.touchSpecificSettlementDispatchAuthorized === false &&
        item.crossRelationPrecedenceAuthorized === false &&
        item.touchingRelations.every(
          (touch) =>
            touch.precedence === 'not_determined' && touch.settlementOutcome === 'not_determined',
        ) &&
        item.supportChannelActive === 'not_determined' &&
        item.supportChannelPersisted === 'not_determined' &&
        item.supportChannelNeutralized === 'not_determined' &&
        item.supportChannelDestroyed === 'not_determined' &&
        item.supportChannelNetEffect === 'not_resolved' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
        item.numericScore === 'not_assigned',
    )
  );
}

function pairCapability(
  family: CombinationFamily,
  items: readonly ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem[],
): string {
  const multi = items.filter((item) => item.touchCount > 1);
  const pairCount = multi.reduce((count, item) => count + item.touchingRelations.length, 0);
  return `I61 ${family} relation identity pairs: ${multi.length} multi-touch source route(s), ${pairCount} exact relation pair(s); dispatch/precedence/outcomes unresolved`;
}

function refinePairing(
  base: ChallengeContextCapability,
  accepted: boolean,
  items: readonly ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasPairingGap = base.unresolvedCapabilities.some((capability) =>
    capability.includes('touch-specific relation identity pairing unresolved: TOUCH_SPECIFIC_RELATION_SETTLEMENT'),
  );
  if (!hasPairingGap) return base;

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set([...base.unresolvedCapabilities, ALIGNMENT_GAP])].sort(),
    };
  }

  const currentItems = items ?? [];
  const unresolved = [...base.unresolvedCapabilities];
  const existing = [...base.existingCapabilities];

  for (const family of ['stem', 'root'] as const) {
    const familyItems = currentItems.filter(
      (item) => familyForItem(item) === family && item.touchCount > 1,
    );
    if (familyItems.length === 0) continue;
    if (!familyItems.every((item) => item.multiTouchPairingResolvedWhereObserved)) continue;

    const prior = pairingGap(family);
    const index = unresolved.indexOf(prior);
    if (index < 0) continue;
    unresolved.splice(index, 1);
    unresolved.push(postPairGap(family));
    existing.push(pairCapability(family, familyItems));
  }

  return {
    ...base,
    existingCapabilities: [...new Set(existing)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV21(
  pillars: StructuralPillarInput,
  availabilityV20: ChallengeContextAvailabilityV20Report,
  applicabilityEvidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
  topologyEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
): ChallengeContextAvailabilityV21Report {
  const relationIdentityPairClosureAccepted =
    chainAligned(
      pillars,
      availabilityV20,
      applicabilityEvidence,
      settlementEvidence,
      topologyEvidence,
      pairEvidence,
    ) && pairEvidenceContractAccepted(pairEvidence);

  const evidenceByMechanism = new Map<
    string,
    ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem[]
  >();
  if (relationIdentityPairClosureAccepted) {
    for (const item of pairEvidence.items) {
      const current = evidenceByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      evidenceByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV20.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refinePairing(
        context,
        relationIdentityPairClosureAccepted,
        evidenceByMechanism.get(mechanism.mechanism),
      ),
    );
    return {
      mechanism: mechanism.mechanism,
      requiredContexts,
      missingDependencies: requiredContexts
        .filter((context) => context.availability === 'MISSING_SUBSTRATE')
        .map((context) => context.dependency),
      partialDependencies: requiredContexts
        .filter((context) => context.availability === 'PARTIAL_SUBSTRATE')
        .map((context) => context.dependency),
      evidenceAvailableDependencies: requiredContexts
        .filter((context) => context.availability === 'EVIDENCE_AVAILABLE_EFFECT_UNRESOLVED')
        .map((context) => context.dependency),
      effectReady: false as const,
    };
  });

  const allRequiredContextsHaveSubstrate = mechanisms.every(
    (mechanism) => mechanism.missingDependencies.length === 0,
  );

  const material = {
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V21_VERSION,
    upstreamAvailabilityV20ReportId: availabilityV20.reportId,
    relationIdentityPairEvidenceReportId: pairEvidence.reportId,
    relationIdentityPairClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v21 accepts I61 only through the exact I54/I56/I58/I26-v20 identity chain and deterministic I61 recomputation from the same resolved pillars.',
      'Aligned I61 pair evidence removes only the multi-touch relation-id/kind pairing blocker and replaces it with an explicit touch-specific settlement methodology/dispatch blocker.',
      'COMPETING_RELATION_SETTLEMENT precedence remains unresolved; exact relation pairs do not authorize fixed precedence, settlement dispatch, or settlement outcomes.',
      'I60-verified settlement-outcome blockers and the separate support-channel activation/persistence blocker remain unchanged.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no relative-force, challenge-effect, scoring, or strong/weak classification verdict is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v21_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
