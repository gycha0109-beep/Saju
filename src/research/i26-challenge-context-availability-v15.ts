import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV13Report } from './i26-challenge-context-availability-v13.js';
import type { ChallengeContextAvailabilityV14Report } from './i26-challenge-context-availability-v14.js';
import type { ChallengeTargetCombinationConditionEvidenceReport } from './i39-challenge-target-combination-condition-evidence.js';
import type { ChallengeRootThreeCombinationBureauFormationEvidenceReport } from './i45-challenge-root-three-combination-bureau-formation-evidence.js';
import type { ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport } from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';
import type { ChallengeCombinationSeasonalCommandEffectMethodologyReviewReport } from './i49-challenge-combination-seasonal-command-effect-methodology-review.js';
import {
  buildI50ChallengeCombinationSeasonalDispositionEvidence,
  type ChallengeCombinationSeasonalDispositionEvidenceItem,
  type ChallengeCombinationSeasonalDispositionEvidenceReport,
} from './i50-challenge-combination-seasonal-disposition-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V15_VERSION =
  'myeonghwa-challenge-context-availability-v15';

export interface ChallengeContextAvailabilityV15Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV14ReportId: string;
  upstreamAvailabilityV13ReportId: string;
  conditionEvidenceReportId: string;
  bureauFormationEvidenceReportId: string;
  clashSettlementEvidenceReportId: string;
  seasonalMethodologyReviewId: string;
  seasonalDispositionEvidenceReportId: string;
  seasonalDispositionClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const STEM_SEASONAL_GAP = 'challenge-target stem-combination seasonal-command effect';
const ROOT_SEASONAL_GAP = 'challenge-root combination seasonal-command effect';
const ALIGNMENT_GAP =
  'resolved I50 seasonal-disposition evidence aligned to current I39/I45/I47/v14 identity';

function chainAligned(
  availabilityV14: ChallengeContextAvailabilityV14Report,
  availabilityV13: ChallengeContextAvailabilityV13Report,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  bureauFormationEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  clashSettlementEvidence: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  seasonalMethodology: ChallengeCombinationSeasonalCommandEffectMethodologyReviewReport,
  seasonalEvidence: ChallengeCombinationSeasonalDispositionEvidenceReport,
): boolean {
  if (availabilityV14.upstreamAvailabilityV13ReportId !== availabilityV13.reportId) return false;
  if (availabilityV13.clashSettlementEvidenceReportId !== clashSettlementEvidence.reportId) return false;
  if (clashSettlementEvidence.upstreamI45ReportId !== bureauFormationEvidence.reportId) return false;
  if (bureauFormationEvidence.upstreamI39ReportId !== conditionEvidence.reportId) return false;
  if (seasonalEvidence.upstreamI39ReportId !== conditionEvidence.reportId) return false;
  if (seasonalEvidence.upstreamI45ReportId !== bureauFormationEvidence.reportId) return false;
  if (seasonalEvidence.upstreamI49ReviewId !== seasonalMethodology.reviewId) return false;

  const expected = buildI50ChallengeCombinationSeasonalDispositionEvidence(
    conditionEvidence,
    bureauFormationEvidence,
    seasonalMethodology,
  );
  return expected.reportId === seasonalEvidence.reportId;
}

function evidenceContractAccepted(
  seasonalEvidence: ChallengeCombinationSeasonalDispositionEvidenceReport,
): boolean {
  return (
    seasonalEvidence.status === 'RESOLVED_SEASONAL_DISPOSITION_EVIDENCE' &&
    seasonalEvidence.seasonalDispositionEvidenceAvailable &&
    seasonalEvidence.seasonalCommandConditionEffectResolvedCategorically &&
    seasonalEvidence.participantSeasonalDispositionAggregationAuthorized === false &&
    seasonalEvidence.transformedResultSeasonalDispositionEmissionAuthorized === false &&
    seasonalEvidence.postInteractionBureauStateEmissionAuthorized === false &&
    seasonalEvidence.targetPostRelationRootState === 'not_determined' &&
    seasonalEvidence.effectiveMechanismForceVerdict === 'not_determined' &&
    seasonalEvidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    seasonalEvidence.classificationAuthorized === false &&
    seasonalEvidence.numericScoringAuthorized === false &&
    seasonalEvidence.items.every(
      (item) =>
        item.seasonalCommandConditionEffect === 'RESOLVED_CATEGORICAL_DISPOSITION' &&
        item.participantSeasonalDispositionAggregation === 'not_performed' &&
        item.transformedResultSeasonalDisposition === 'not_emitted' &&
        item.transformationConditionVerdict === 'not_determined' &&
        item.bindingState === 'not_determined' &&
        item.targetPostRelationRootState === 'not_determined' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
        item.numericScore === 'not_assigned'
    )
  );
}

function seasonalCapability(
  items: readonly ChallengeCombinationSeasonalDispositionEvidenceItem[],
): string {
  const targetStates = [...new Set(items.map(
    (item) => `${item.targetSeasonalPhase}:${item.targetSeasonalDisposition}`,
  ))].sort();
  const participantCount = items.reduce(
    (sum, item) => sum + item.participantSeasonalDispositions.length,
    0,
  );
  const formedBureauCount = items.filter(
    (item) => item.formedThreeCombinationBureau !== undefined,
  ).length;
  return `I50 categorical seasonal disposition: ${items.length} combination item(s), target state(s) [${targetStates.join(', ')}], ${participantCount} identity-local participant disposition(s), ${formedBureauCount} formed-bureau disposition(s); no aggregation or force inference`;
}

function refineSeasonalCommand(
  base: ChallengeContextCapability,
  accepted: boolean,
  items: readonly ChallengeCombinationSeasonalDispositionEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasStemGap = base.unresolvedCapabilities.includes(STEM_SEASONAL_GAP);
  const hasRootGap = base.unresolvedCapabilities.includes(ROOT_SEASONAL_GAP);
  if (!hasStemGap && !hasRootGap) return base;

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set([...base.unresolvedCapabilities, ALIGNMENT_GAP])].sort(),
    };
  }

  const current = items ?? [];
  const hasStemEvidence = current.some((item) => item.relationKind === 'stem_five_combination');
  const hasRootEvidence = current.some(
    (item) =>
      item.relationKind === 'branch_six_combination' ||
      item.relationKind === 'branch_three_combination',
  );

  const unresolved = base.unresolvedCapabilities.filter((capability) => {
    if (capability === STEM_SEASONAL_GAP) return !hasStemEvidence;
    if (capability === ROOT_SEASONAL_GAP) return !hasRootEvidence;
    return true;
  });

  if (hasStemGap && !hasStemEvidence) {
    unresolved.push('I50 seasonal-disposition evidence for routed stem-combination identity');
  }
  if (hasRootGap && !hasRootEvidence) {
    unresolved.push('I50 seasonal-disposition evidence for routed root-combination identity');
  }

  if (current.length === 0) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set(unresolved)].sort(),
    };
  }

  return {
    ...base,
    existingCapabilities: [...new Set([...base.existingCapabilities, seasonalCapability(current)])],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV15(
  availabilityV14: ChallengeContextAvailabilityV14Report,
  availabilityV13: ChallengeContextAvailabilityV13Report,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  bureauFormationEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  clashSettlementEvidence: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  seasonalMethodology: ChallengeCombinationSeasonalCommandEffectMethodologyReviewReport,
  seasonalEvidence: ChallengeCombinationSeasonalDispositionEvidenceReport,
): ChallengeContextAvailabilityV15Report {
  const seasonalDispositionClosureAccepted =
    chainAligned(
      availabilityV14,
      availabilityV13,
      conditionEvidence,
      bureauFormationEvidence,
      clashSettlementEvidence,
      seasonalMethodology,
      seasonalEvidence,
    ) && evidenceContractAccepted(seasonalEvidence);

  const evidenceByMechanism = new Map<
    string,
    ChallengeCombinationSeasonalDispositionEvidenceItem[]
  >();
  if (seasonalDispositionClosureAccepted) {
    for (const item of seasonalEvidence.items) {
      const current = evidenceByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      evidenceByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV14.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineSeasonalCommand(
        context,
        seasonalDispositionClosureAccepted,
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V15_VERSION,
    upstreamAvailabilityV14ReportId: availabilityV14.reportId,
    upstreamAvailabilityV13ReportId: availabilityV13.reportId,
    conditionEvidenceReportId: conditionEvidence.reportId,
    bureauFormationEvidenceReportId: bureauFormationEvidence.reportId,
    clashSettlementEvidenceReportId: clashSettlementEvidence.reportId,
    seasonalMethodologyReviewId: seasonalMethodology.reviewId,
    seasonalDispositionEvidenceReportId: seasonalEvidence.reportId,
    seasonalDispositionClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v15 accepts I50 only when the exact v14/v13/I47/I45/I39 chain is aligned and the supplied I50 report equals deterministic recomputation from the same I39/I45/I49 inputs.',
      'The live seasonal-command-effect capability gap is removed only for the routed relation family that has aligned I50 categorical seasonal-disposition evidence.',
      'Target, participant, and formed-three-bureau seasonal dispositions become existing context; they are not aggregated and do not establish a relation result, post-relation root state, post-interaction bureau survival, or effective mechanism force.',
      'I42/I43 result-scope closures remain intact: no challenge-stem or six-combination transformed-result seasonal disposition is reconstructed by v15.',
      'Support/interference, competing-relation settlement, stem/six binding interaction, contextual three-combination bureau state, post-relation root state, and effective mechanism force remain independently unresolved where applicable.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no numeric scoring or strong/weak classification is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v15_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
