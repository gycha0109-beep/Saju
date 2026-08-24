import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV2,
  type ChallengeContextAvailabilityV2Report,
} from './i26-challenge-context-availability-v2.js';
import type { ChallengeMechanismForceEvidenceReport } from './i27-challenge-mechanism-force-evidence.js';
import type {
  ChallengeTargetIntrinsicRootEvidenceItem,
  ChallengeTargetIntrinsicRootEvidenceReport,
} from './i29-challenge-target-intrinsic-root-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V3_VERSION =
  'myeonghwa-challenge-context-availability-v3';

export interface ChallengeContextAvailabilityV3Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV2ReportId: string;
  forceEvidenceReportId: string;
  forceEvidenceStatus: ChallengeMechanismForceEvidenceReport['status'];
  rootEvidenceReportId: string;
  rootEvidenceStatus: ChallengeTargetIntrinsicRootEvidenceReport['status'];
  rootEvidenceAlignedWithForceEvidence: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function rootStateCapability(item: ChallengeTargetIntrinsicRootEvidenceItem): string {
  switch (item.evidenceState) {
    case 'NO_VISIBLE_TARGET_STEM_ANCHOR':
      return 'I29 no-visible-target-stem anchor state; hidden-only target presence not promoted to root quality';
    case 'NON_EARTH_ROOT_CANDIDATE_EVIDENCE':
      return 'I29 challenge-specific non-earth intrinsic root candidate evidence';
    case 'VISIBLE_TARGET_STEM_NO_ROOT_CANDIDATE':
      return 'I29 visible target-stem anchor with no source-bounded intrinsic root candidate';
    case 'EARTH_ROOT_CLASS_UNRESOLVED':
      return 'I29 earth target intrinsic root candidate evidence with class unresolved';
  }
}

function rootStateUnresolvedCapabilities(
  item: ChallengeTargetIntrinsicRootEvidenceItem,
): readonly string[] {
  switch (item.evidenceState) {
    case 'NO_VISIBLE_TARGET_STEM_ANCHOR':
      return ['non-visible target-element intrinsic force treatment'];
    case 'NON_EARTH_ROOT_CANDIDATE_EVIDENCE':
    case 'VISIBLE_TARGET_STEM_NO_ROOT_CANDIDATE':
      return ['target-element intrinsic root-quality verdict'];
    case 'EARTH_ROOT_CLASS_UNRESOLVED':
      return [
        'earth target-element root-class convention',
        'target-element intrinsic root-quality verdict',
      ];
  }
}

function enrichForceCapability(
  base: ChallengeContextCapability,
  rootItem: ChallengeTargetIntrinsicRootEvidenceItem | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const downstreamUnresolved = base.unresolvedCapabilities.filter(
    (capability) => capability !== 'target-element intrinsic root quality',
  );

  if (rootItem === undefined) {
    return {
      ...base,
      unresolvedCapabilities: [
        'resolved I29 mechanism-specific intrinsic root candidate evidence aligned to current I27 force evidence',
        ...downstreamUnresolved,
      ],
    };
  }

  return {
    ...base,
    existingCapabilities: [...base.existingCapabilities, rootStateCapability(rootItem)],
    unresolvedCapabilities: [
      ...rootStateUnresolvedCapabilities(rootItem),
      ...downstreamUnresolved,
    ],
  };
}

export function buildI26ChallengeContextAvailabilityV3(
  review: ChallengeEffectMethodologyReviewReport,
  forceEvidence: ChallengeMechanismForceEvidenceReport,
  rootEvidence: ChallengeTargetIntrinsicRootEvidenceReport,
): ChallengeContextAvailabilityV3Report {
  const v2: ChallengeContextAvailabilityV2Report = buildI26ChallengeContextAvailabilityV2(
    review,
    forceEvidence,
  );
  const rootEvidenceAlignedWithForceEvidence =
    rootEvidence.status === 'RESOLVED_EVIDENCE' &&
    rootEvidence.upstreamI27ReportId === forceEvidence.reportId;
  const rootByMechanism = new Map(
    rootEvidenceAlignedWithForceEvidence
      ? rootEvidence.mechanisms.map((item) => [item.mechanism, item] as const)
      : [],
  );

  const mechanisms = v2.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? enrichForceCapability(context, rootByMechanism.get(mechanism.mechanism))
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V3_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV2ReportId: v2.reportId,
    forceEvidenceReportId: forceEvidence.reportId,
    forceEvidenceStatus: forceEvidence.status,
    rootEvidenceReportId: rootEvidence.reportId,
    rootEvidenceStatus: rootEvidence.status,
    rootEvidenceAlignedWithForceEvidence,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v3 integrates I29 only when the root-evidence report is resolved and explicitly bound to the current I27 force-evidence report.',
      'I29 evidence enriches MECHANISM_EFFECTIVE_FORCE_CONTEXT but does not upgrade it beyond PARTIAL_SUBSTRATE.',
      'A root candidate is not a root-quality verdict; a no-candidate state is not a rootless verdict; hidden-only target presence is not promoted to root quality.',
      'Target post-relation force state, effective mechanism force, and relation-specific usefulness/harmfulness remain unresolved for every mechanism.',
      'No availability state is converted to points, confidence, usefulness, or a strong/weak category.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v3_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
