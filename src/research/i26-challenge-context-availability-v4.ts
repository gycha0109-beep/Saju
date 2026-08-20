import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV3,
  type ChallengeContextAvailabilityV3Report,
} from './i26-challenge-context-availability-v3.js';
import type { ChallengeMechanismForceEvidenceReport } from './i27-challenge-mechanism-force-evidence.js';
import type { ChallengeTargetIntrinsicRootEvidenceReport } from './i29-challenge-target-intrinsic-root-evidence.js';
import type {
  ChallengeTargetRelationParticipationEvidenceItem,
  ChallengeTargetRelationParticipationEvidenceReport,
} from './i31-challenge-target-relation-participation-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V4_VERSION =
  'myeonghwa-challenge-context-availability-v4';

export interface ChallengeContextAvailabilityV4Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV3ReportId: string;
  forceEvidenceReportId: string;
  rootEvidenceReportId: string;
  relationEvidenceReportId: string;
  relationEvidenceStatus: ChallengeTargetRelationParticipationEvidenceReport['status'];
  relationEvidenceAlignedWithRootEvidence: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function relationStateCapability(item: ChallengeTargetRelationParticipationEvidenceItem): string {
  return `I31 challenge-target relation participation routing state: ${item.routingState}`;
}

function relationStateUnresolvedCapabilities(
  item: ChallengeTargetRelationParticipationEvidenceItem,
): readonly string[] {
  const unresolved = new Set<string>();

  if (item.routingState === 'NO_VISIBLE_TARGET_STEM_ANCHOR') {
    unresolved.add('non-visible target post-relation treatment policy');
  } else if (item.routingState === 'VISIBLE_TARGET_STEM_NO_INTRINSIC_ROOT_CANDIDATE') {
    unresolved.add('visible target without intrinsic root candidate post-relation treatment');
  } else if (item.routingState === 'EARTH_ROOT_CONVENTION_UNRESOLVED') {
    unresolved.add('earth target post-relation root-state resolution');
  } else if (item.routingState === 'NO_TRACKED_RELATION_CANDIDATE') {
    unresolved.add('target post-relation root-state verdict; no tracked relation does not establish preservation');
  } else {
    unresolved.add('target post-relation root-state verdict');
  }

  if (item.visibleTargetStemRelations.length > 0) {
    unresolved.add('target-stem combination transformation/effect resolution');
  }

  for (const rootCandidate of item.rootCandidateRelations) {
    if (rootCandidate.reviewRequirements.includes('BRANCH_CLASH_EFFECT_REVIEW_REQUIRED')) {
      unresolved.add('root-candidate clash effect resolution');
    }
    if (
      rootCandidate.reviewRequirements.includes('BRANCH_SIX_COMBINATION_EFFECT_REVIEW_REQUIRED') ||
      rootCandidate.reviewRequirements.includes('BRANCH_THREE_COMBINATION_EFFECT_REVIEW_REQUIRED')
    ) {
      unresolved.add('root-candidate combination transformation/effect resolution');
    }
  }

  return [...unresolved].sort();
}

function enrichForceCapability(
  base: ChallengeContextCapability,
  relationItem: ChallengeTargetRelationParticipationEvidenceItem | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const downstreamUnresolved = base.unresolvedCapabilities.filter(
    (capability) => capability !== 'target-element post-relation force state',
  );

  if (relationItem === undefined) {
    return {
      ...base,
      unresolvedCapabilities: [
        'resolved I31 mechanism relation-participation evidence aligned to current I29 root evidence',
        ...downstreamUnresolved,
      ],
    };
  }

  return {
    ...base,
    existingCapabilities: [
      ...base.existingCapabilities,
      relationStateCapability(relationItem),
    ],
    unresolvedCapabilities: [
      ...relationStateUnresolvedCapabilities(relationItem),
      ...downstreamUnresolved,
    ],
  };
}

export function buildI26ChallengeContextAvailabilityV4(
  review: ChallengeEffectMethodologyReviewReport,
  forceEvidence: ChallengeMechanismForceEvidenceReport,
  rootEvidence: ChallengeTargetIntrinsicRootEvidenceReport,
  relationEvidence: ChallengeTargetRelationParticipationEvidenceReport,
): ChallengeContextAvailabilityV4Report {
  const v3: ChallengeContextAvailabilityV3Report = buildI26ChallengeContextAvailabilityV3(
    review,
    forceEvidence,
    rootEvidence,
  );
  const relationEvidenceAlignedWithRootEvidence =
    v3.rootEvidenceAlignedWithForceEvidence &&
    relationEvidence.status === 'RESOLVED_ROUTING_EVIDENCE' &&
    relationEvidence.upstreamI29ReportId === rootEvidence.reportId;
  const relationByMechanism = new Map(
    relationEvidenceAlignedWithRootEvidence
      ? relationEvidence.mechanisms.map((item) => [item.mechanism, item] as const)
      : [],
  );

  const mechanisms = v3.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? enrichForceCapability(context, relationByMechanism.get(mechanism.mechanism))
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V4_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV3ReportId: v3.reportId,
    forceEvidenceReportId: forceEvidence.reportId,
    rootEvidenceReportId: rootEvidence.reportId,
    relationEvidenceReportId: relationEvidence.reportId,
    relationEvidenceStatus: relationEvidence.status,
    relationEvidenceAlignedWithRootEvidence,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v4 integrates I31 only when the relation-participation report is resolved and explicitly bound to the current I29 root-evidence report, which must itself remain aligned to current I27 force evidence.',
      'I31 relation routing enriches MECHANISM_EFFECTIVE_FORCE_CONTEXT but does not upgrade it beyond PARTIAL_SUBSTRATE.',
      'Tracked relation participation replaces the generic post-relation gap with more specific unresolved transformation, clash-effect, root-state, or hidden/earth treatment capabilities.',
      'No tracked relation candidate is not converted into a preserved-root verdict, and tracked relation presence is not converted into damage, transformation, or effective force.',
      'Effective mechanism force and relation-specific usefulness/harmfulness remain unresolved for every mechanism.',
      'No availability state is converted to points, confidence, usefulness, or a strong/weak category.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v4_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
