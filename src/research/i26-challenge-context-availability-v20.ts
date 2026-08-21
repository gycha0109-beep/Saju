import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV19Report } from './i26-challenge-context-availability-v19.js';
import type { ChallengeTargetClashDependencyEvidenceReport } from './i33-challenge-target-clash-dependency-evidence.js';
import type { ChallengeTargetCombinationDependencyEvidenceReport } from './i35-challenge-target-combination-dependency-evidence.js';
import type { ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport } from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';
import type { ChallengeCombinationSupportChannelContestSettlementDependency } from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';
import type { ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport } from './i58-challenge-combination-support-channel-existing-settlement-authority-applicability-evidence.js';
import type { ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport } from './i59-challenge-combination-support-channel-current-chart-settlement-substrate-verification-methodology-review.js';
import {
  buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence,
  type ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceItem,
  type ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport,
} from './i60-challenge-combination-support-channel-current-chart-settlement-substrate-verification-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V20_VERSION =
  'myeonghwa-challenge-context-availability-v20';

export interface ChallengeContextAvailabilityV20Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV19ReportId: string;
  authorityApplicabilityEvidenceReportId: string;
  currentChartSubstrateMethodologyReviewId: string;
  currentChartSubstrateEvidenceReportId: string;
  currentChartSubstrateClosureAccepted: boolean;
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
  'resolved I60 current-chart settlement substrate evidence aligned to exact I58/I59/I33/I35/I47/I26-v19 identity';

function familyForItem(
  item: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceItem,
): CombinationFamily {
  return item.currentCombinationRelationKind === 'stem_five_combination' ? 'stem' : 'root';
}

function familyPrefix(family: CombinationFamily): string {
  return family === 'stem' ? 'challenge-target stem-combination' : 'challenge-root combination';
}

function substrateVerificationGap(
  family: CombinationFamily,
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency,
): string {
  return `${familyPrefix(family)} support-channel current-chart relation-specific settlement substrate verification unresolved: ${dependency}`;
}

function verifiedOutcomeGap(
  family: CombinationFamily,
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency,
): string {
  return `${familyPrefix(family)} support-channel settlement outcome unresolved after verified current-chart substrate: ${dependency}`;
}

function chainAligned(
  availabilityV19: ChallengeContextAvailabilityV19Report,
  applicabilityEvidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
  methodology: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  substrateEvidence: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport,
): boolean {
  if (!availabilityV19.authorityApplicabilityClosureAccepted) return false;
  if (
    availabilityV19.existingSettlementAuthorityApplicabilityEvidenceReportId !==
    applicabilityEvidence.reportId
  ) {
    return false;
  }
  if (substrateEvidence.upstreamI58ReportId !== applicabilityEvidence.reportId) return false;
  if (substrateEvidence.upstreamI59ReviewId !== methodology.reviewId) return false;
  if (substrateEvidence.i33ReportId !== i33.reportId) return false;
  if (substrateEvidence.i35ReportId !== i35.reportId) return false;
  if (substrateEvidence.i47ReportId !== i47.reportId) return false;

  const expected =
    buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
      applicabilityEvidence,
      methodology,
      i33,
      i35,
      i47,
    );
  return expected.reportId === substrateEvidence.reportId;
}

function evidenceContractAccepted(
  evidence: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport,
): boolean {
  return (
    evidence.status === 'RESOLVED_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE' &&
    evidence.currentChartSettlementSubstrateVerificationEvidenceAvailable &&
    evidence.anyRoutedSettlementOutcomeResolved === false &&
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
        item.anySettlementOutcomeResolved === false &&
        item.dependencyVerification.every(
          (verification) => verification.settlementOutcomeResolved === false,
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

function verificationCapability(
  items: readonly ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceItem[],
): string {
  const dependencies = items.flatMap((item) => item.dependencyVerification);
  const verified = dependencies.filter(
    (verification) => verification.currentChartSettlementSubstrateVerified,
  ).length;
  const blocked = dependencies.filter(
    (verification) =>
      verification.verificationStatus === 'BLOCKED_MULTI_TOUCH_PAIRING' ||
      verification.verificationStatus === 'BLOCKED_COMPETING_RELATION_PRECEDENCE',
  ).length;
  const narrowBureau = dependencies.filter(
    (verification) =>
      verification.narrowBureauContextStatus === 'VERIFIED_BROKEN_BY_TIGHT_EMBEDDED_CLASH' ||
      verification.narrowBureauContextStatus === 'VERIFIED_BUREAU_CONTEXT_NO_DETERMINISTIC_BREAK',
  ).length;
  return [
    `I60 current-chart settlement substrate verification: ${dependencies.length} routed dependency item(s)`,
    `${verified} substrate-verified`,
    `${blocked} structurally blocked`,
    `${narrowBureau} narrow bureau-context annotation(s)`,
    'all settlement outcomes unresolved',
  ].join(', ');
}

function refineCurrentChartSubstrate(
  base: ChallengeContextCapability,
  accepted: boolean,
  items: readonly ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const relevant = base.unresolvedCapabilities.some(
    (capability) =>
      capability.includes('current-chart relation-specific settlement substrate verification unresolved:') ||
      capability.includes('generic support-source settlement unresolved despite narrow bureau-state authority:') ||
      capability.includes('touch-specific relation identity pairing unresolved:') ||
      capability.includes('competing-relation precedence/settlement unresolved:'),
  );
  if (!relevant) return base;

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set([...base.unresolvedCapabilities, ALIGNMENT_GAP])].sort(),
    };
  }

  const currentItems = items ?? [];
  const unresolved = [...base.unresolvedCapabilities];
  let refinedAny = false;

  for (const item of currentItems) {
    const family = familyForItem(item);
    for (const verification of item.dependencyVerification) {
      if (!verification.currentChartSettlementSubstrateVerified) continue;
      const prior = substrateVerificationGap(family, verification.dependency);
      const index = unresolved.indexOf(prior);
      if (index < 0) continue;
      unresolved.splice(index, 1);
      unresolved.push(verifiedOutcomeGap(family, verification.dependency));
      refinedAny = true;
    }
  }

  const existingCapabilities = refinedAny || currentItems.length > 0
    ? [...new Set([...base.existingCapabilities, verificationCapability(currentItems)])]
    : base.existingCapabilities;

  return {
    ...base,
    existingCapabilities,
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV20(
  availabilityV19: ChallengeContextAvailabilityV19Report,
  applicabilityEvidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
  methodology: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  substrateEvidence: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport,
): ChallengeContextAvailabilityV20Report {
  const currentChartSubstrateClosureAccepted =
    chainAligned(
      availabilityV19,
      applicabilityEvidence,
      methodology,
      i33,
      i35,
      i47,
      substrateEvidence,
    ) && evidenceContractAccepted(substrateEvidence);

  const evidenceByMechanism = new Map<
    string,
    ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceItem[]
  >();
  if (currentChartSubstrateClosureAccepted) {
    for (const item of substrateEvidence.items) {
      const current = evidenceByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      evidenceByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV19.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineCurrentChartSubstrate(
        context,
        currentChartSubstrateClosureAccepted,
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V20_VERSION,
    upstreamAvailabilityV19ReportId: availabilityV19.reportId,
    authorityApplicabilityEvidenceReportId: applicabilityEvidence.reportId,
    currentChartSubstrateMethodologyReviewId: methodology.reviewId,
    currentChartSubstrateEvidenceReportId: substrateEvidence.reportId,
    currentChartSubstrateClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v20 accepts I60 only through the exact I58/I59/I33/I35/I47 identity chain and deterministic I60 recomputation.',
      'When I60 verifies an exact chart-specific settlement substrate, v20 replaces only the substrate-verification blocker with a settlement-outcome-unresolved blocker; the dependency is not removed.',
      'Narrow I47 bureau context does not remove the generic support-source settlement blocker, and multi-touch pairing / competing-relation precedence blockers remain unchanged.',
      'The separate support-channel activation/persistence blocker remains unresolved regardless of chart-substrate verification.',
      'Verified I33 seasonal/support/rescue substrate remains below relative-force, rescue-effect, clash-settlement, and persistence outcomes; verified I35 substrate remains below binding/neutralization outcomes.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no relative-force, challenge-effect, numeric-scoring, or strong/weak classification verdict is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v20_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
