import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV4,
  type ChallengeContextAvailabilityV4Report,
} from './i26-challenge-context-availability-v4.js';
import type { ChallengeMechanismForceEvidenceReport } from './i27-challenge-mechanism-force-evidence.js';
import type { ChallengeTargetIntrinsicRootEvidenceReport } from './i29-challenge-target-intrinsic-root-evidence.js';
import type { ChallengeTargetRelationParticipationEvidenceReport } from './i31-challenge-target-relation-participation-evidence.js';
import type {
  ChallengeTargetClashDependencyEvidenceCandidate,
  ChallengeTargetClashDependencyEvidenceReport,
} from './i33-challenge-target-clash-dependency-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V5_VERSION =
  'myeonghwa-challenge-context-availability-v5';

export interface ChallengeContextAvailabilityV5Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV4ReportId: string;
  forceEvidenceReportId: string;
  rootEvidenceReportId: string;
  relationEvidenceReportId: string;
  clashDependencyEvidenceReportId: string;
  clashDependencyEvidenceStatus: ChallengeTargetClashDependencyEvidenceReport['status'];
  clashDependencyEvidenceAlignedWithRelationEvidence: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function clashCapability(
  candidates: readonly ChallengeTargetClashDependencyEvidenceCandidate[],
): string {
  const rescueCount = candidates.reduce(
    (total, candidate) => total + candidate.rescueTopologyCandidates.length,
    0,
  );
  return `I33 aligned challenge-root clash dependency evidence: ${candidates.length} clash candidate(s), ${rescueCount} rescue-topology candidate(s)`;
}

function detailedClashUnresolvedCapabilities(
  candidates: readonly ChallengeTargetClashDependencyEvidenceCandidate[],
): readonly string[] {
  if (candidates.length === 0) return [];
  const unresolved = new Set<string>([
    'challenge-root clash relative branch force verdict',
    'challenge-root clash support effect',
    'challenge-root clash winner verdict',
    'challenge-root clash target post-relation root-state verdict',
  ]);
  if (candidates.some((candidate) => candidate.rescueTopologyCandidates.length > 0)) {
    unresolved.add('challenge-root clash rescue strength/effect');
    unresolved.add('challenge-root clash settlement');
  }
  return [...unresolved].sort();
}

function enrichForceCapability(
  base: ChallengeContextCapability,
  aligned: boolean,
  candidates: readonly ChallengeTargetClashDependencyEvidenceCandidate[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasRoutedClashGap = base.unresolvedCapabilities.includes('root-candidate clash effect resolution');
  if (!hasRoutedClashGap) return base;

  if (!aligned) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'resolved I33 challenge-root clash dependency evidence aligned to current I31/I29 identity',
      ].sort(),
    };
  }

  if (candidates === undefined || candidates.length === 0) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'I33 aligned clash dependency evidence for the routed root-candidate clash',
      ].sort(),
    };
  }

  return {
    ...base,
    existingCapabilities: [
      ...base.existingCapabilities,
      clashCapability(candidates),
    ],
    unresolvedCapabilities: [
      ...base.unresolvedCapabilities.filter(
        (capability) => capability !== 'root-candidate clash effect resolution',
      ),
      ...detailedClashUnresolvedCapabilities(candidates),
    ].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV5(
  review: ChallengeEffectMethodologyReviewReport,
  forceEvidence: ChallengeMechanismForceEvidenceReport,
  rootEvidence: ChallengeTargetIntrinsicRootEvidenceReport,
  relationEvidence: ChallengeTargetRelationParticipationEvidenceReport,
  clashDependencyEvidence: ChallengeTargetClashDependencyEvidenceReport,
): ChallengeContextAvailabilityV5Report {
  const v4: ChallengeContextAvailabilityV4Report = buildI26ChallengeContextAvailabilityV4(
    review,
    forceEvidence,
    rootEvidence,
    relationEvidence,
  );
  const clashDependencyEvidenceAlignedWithRelationEvidence =
    v4.relationEvidenceAlignedWithRootEvidence &&
    clashDependencyEvidence.status === 'RESOLVED_DEPENDENCY_EVIDENCE' &&
    clashDependencyEvidence.upstreamI29ReportId === rootEvidence.reportId &&
    clashDependencyEvidence.upstreamI31ReportId === relationEvidence.reportId;

  const clashByMechanism = new Map<string, ChallengeTargetClashDependencyEvidenceCandidate[]>();
  if (clashDependencyEvidenceAlignedWithRelationEvidence) {
    for (const candidate of clashDependencyEvidence.candidates) {
      const current = clashByMechanism.get(candidate.mechanism) ?? [];
      current.push(candidate);
      clashByMechanism.set(candidate.mechanism, current);
    }
  }

  const mechanisms = v4.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? enrichForceCapability(
            context,
            clashDependencyEvidenceAlignedWithRelationEvidence,
            clashByMechanism.get(mechanism.mechanism),
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V5_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV4ReportId: v4.reportId,
    forceEvidenceReportId: forceEvidence.reportId,
    rootEvidenceReportId: rootEvidence.reportId,
    relationEvidenceReportId: relationEvidence.reportId,
    clashDependencyEvidenceReportId: clashDependencyEvidence.reportId,
    clashDependencyEvidenceStatus: clashDependencyEvidence.status,
    clashDependencyEvidenceAlignedWithRelationEvidence,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v5 integrates I33 only when the clash-dependency report is resolved and explicitly aligned to the same I31 relation evidence and I29 root evidence already accepted by v4.',
      'Aligned I33 evidence refines the generic root-candidate clash gap into relative-force, support-effect, clash-winner, rescue/settlement, and post-relation-root-state dependencies.',
      'I33 dependency evidence does not upgrade MECHANISM_EFFECTIVE_FORCE_CONTEXT beyond PARTIAL_SUBSTRATE.',
      'Seasonal advantage, support locations, and rescue topology remain evidence candidates and are not promoted to clash settlement or effective mechanism force.',
      'Effective mechanism force and relation-specific usefulness/harmfulness remain unresolved for every mechanism.',
      'No availability state is converted to points, confidence, usefulness, or a strong/weak category.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v5_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
