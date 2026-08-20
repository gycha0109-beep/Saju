import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV5,
  type ChallengeContextAvailabilityV5Report,
} from './i26-challenge-context-availability-v5.js';
import type { ChallengeMechanismForceEvidenceReport } from './i27-challenge-mechanism-force-evidence.js';
import type { ChallengeTargetIntrinsicRootEvidenceReport } from './i29-challenge-target-intrinsic-root-evidence.js';
import type { ChallengeTargetRelationParticipationEvidenceReport } from './i31-challenge-target-relation-participation-evidence.js';
import type { ChallengeTargetClashDependencyEvidenceReport } from './i33-challenge-target-clash-dependency-evidence.js';
import type {
  ChallengeTargetCombinationDependencyEvidenceCandidate,
  ChallengeTargetCombinationDependencyEvidenceReport,
} from './i35-challenge-target-combination-dependency-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V6_VERSION =
  'myeonghwa-challenge-context-availability-v6';

export interface ChallengeContextAvailabilityV6Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV5ReportId: string;
  forceEvidenceReportId: string;
  rootEvidenceReportId: string;
  relationEvidenceReportId: string;
  clashDependencyEvidenceReportId: string;
  combinationDependencyEvidenceReportId: string;
  combinationDependencyEvidenceStatus: ChallengeTargetCombinationDependencyEvidenceReport['status'];
  combinationDependencyEvidenceAlignedWithRelationEvidence: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function combinationCapability(
  candidates: readonly ChallengeTargetCombinationDependencyEvidenceCandidate[],
): string {
  const stemCount = candidates.filter((item) => item.subjectKind === 'VISIBLE_TARGET_STEM').length;
  const rootCount = candidates.filter((item) => item.subjectKind === 'TARGET_ROOT_CANDIDATE').length;
  const competingCount = candidates.reduce(
    (total, candidate) => total + candidate.competingRelationTopology.length,
    0,
  );
  return `I35 aligned challenge-target combination dependency evidence: ${stemCount} stem candidate(s), ${rootCount} root candidate(s), ${competingCount} competing-topology candidate(s)`;
}

function stemCombinationGaps(): readonly string[] {
  return [
    'challenge-target stem-combination transformation-condition policy',
    'challenge-target stem-combination transformation target-element policy',
    'challenge-target stem-combination seasonal-command effect',
    'challenge-target stem-combination support/interference effect',
    'challenge-target stem-combination competing-relation precedence',
    'challenge-target stem post-combination state verdict',
  ];
}

function rootCombinationGaps(): readonly string[] {
  return [
    'challenge-root combination transformation-condition policy',
    'challenge-root combination transformation target-element policy',
    'challenge-root combination seasonal-command effect',
    'challenge-root combination support/interference effect',
    'challenge-root combination competing-relation precedence',
    'challenge-root combination post-relation root-state verdict',
  ];
}

function enrichCombinationCapability(
  base: ChallengeContextCapability,
  aligned: boolean,
  candidates: readonly ChallengeTargetCombinationDependencyEvidenceCandidate[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasStemGap = base.unresolvedCapabilities.includes(
    'target-stem combination transformation/effect resolution',
  );
  const hasRootGap = base.unresolvedCapabilities.includes(
    'root-candidate combination transformation/effect resolution',
  );
  if (!hasStemGap && !hasRootGap) return base;

  if (!aligned) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'resolved I35 challenge-target combination dependency evidence aligned to current I31/I29 identity',
      ].sort(),
    };
  }

  const stemCandidates = (candidates ?? []).filter(
    (candidate) => candidate.subjectKind === 'VISIBLE_TARGET_STEM',
  );
  const rootCandidates = (candidates ?? []).filter(
    (candidate) => candidate.subjectKind === 'TARGET_ROOT_CANDIDATE',
  );
  const unresolved = base.unresolvedCapabilities.filter(
    (capability) =>
      capability !== 'target-stem combination transformation/effect resolution' &&
      capability !== 'root-candidate combination transformation/effect resolution',
  );

  if (hasStemGap) {
    if (stemCandidates.length === 0) {
      unresolved.push('I35 aligned stem-combination dependency evidence for the routed target-stem combination');
    } else {
      unresolved.push(...stemCombinationGaps());
    }
  }
  if (hasRootGap) {
    if (rootCandidates.length === 0) {
      unresolved.push('I35 aligned root-combination dependency evidence for the routed root-candidate combination');
    } else {
      unresolved.push(...rootCombinationGaps());
    }
  }

  return {
    ...base,
    existingCapabilities: candidates === undefined || candidates.length === 0
      ? base.existingCapabilities
      : [...base.existingCapabilities, combinationCapability(candidates)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV6(
  review: ChallengeEffectMethodologyReviewReport,
  forceEvidence: ChallengeMechanismForceEvidenceReport,
  rootEvidence: ChallengeTargetIntrinsicRootEvidenceReport,
  relationEvidence: ChallengeTargetRelationParticipationEvidenceReport,
  clashDependencyEvidence: ChallengeTargetClashDependencyEvidenceReport,
  combinationDependencyEvidence: ChallengeTargetCombinationDependencyEvidenceReport,
): ChallengeContextAvailabilityV6Report {
  const v5: ChallengeContextAvailabilityV5Report = buildI26ChallengeContextAvailabilityV5(
    review,
    forceEvidence,
    rootEvidence,
    relationEvidence,
    clashDependencyEvidence,
  );

  const combinationDependencyEvidenceAlignedWithRelationEvidence =
    combinationDependencyEvidence.status === 'RESOLVED_DEPENDENCY_EVIDENCE' &&
    relationEvidence.status === 'RESOLVED_ROUTING_EVIDENCE' &&
    relationEvidence.upstreamI29ReportId === rootEvidence.reportId &&
    combinationDependencyEvidence.upstreamI29ReportId === rootEvidence.reportId &&
    combinationDependencyEvidence.upstreamI31ReportId === relationEvidence.reportId;

  const combinationByMechanism = new Map<string, ChallengeTargetCombinationDependencyEvidenceCandidate[]>();
  if (combinationDependencyEvidenceAlignedWithRelationEvidence) {
    for (const candidate of combinationDependencyEvidence.candidates) {
      const current = combinationByMechanism.get(candidate.mechanism) ?? [];
      current.push(candidate);
      combinationByMechanism.set(candidate.mechanism, current);
    }
  }

  const mechanisms = v5.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? enrichCombinationCapability(
            context,
            combinationDependencyEvidenceAlignedWithRelationEvidence,
            combinationByMechanism.get(mechanism.mechanism),
          )
        : context,
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V6_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV5ReportId: v5.reportId,
    forceEvidenceReportId: forceEvidence.reportId,
    rootEvidenceReportId: rootEvidence.reportId,
    relationEvidenceReportId: relationEvidence.reportId,
    clashDependencyEvidenceReportId: clashDependencyEvidence.reportId,
    combinationDependencyEvidenceReportId: combinationDependencyEvidence.reportId,
    combinationDependencyEvidenceStatus: combinationDependencyEvidence.status,
    combinationDependencyEvidenceAlignedWithRelationEvidence,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v6 integrates I35 only when the combination-dependency report is resolved and bound to the same I31/I29 identity already used by the challenge context graph.',
      'Aligned I35 evidence refines generic stem/root combination gaps into transformation-condition, target-element-policy, seasonal-command-effect, support/interference-effect, competing-precedence, and post-combination-state dependencies.',
      'I35 structural membership, including a complete three-combination set, does not establish transformation, an effective bureau, binding, preservation, or post-relation root state.',
      'I26 v6 preserves all I33/I26 v5 clash dependency refinements and does not collapse clash and combination effects into one verdict.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE for every mechanism carrying unresolved force context.',
      'No availability state is converted to effective mechanism force, usefulness/harmfulness, points, confidence, or a strong/weak category.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v6_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
