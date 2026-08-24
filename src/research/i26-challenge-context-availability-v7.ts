import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV6,
  type ChallengeContextAvailabilityV6Report,
} from './i26-challenge-context-availability-v6.js';
import type { ChallengeMechanismForceEvidenceReport } from './i27-challenge-mechanism-force-evidence.js';
import type { ChallengeTargetIntrinsicRootEvidenceReport } from './i29-challenge-target-intrinsic-root-evidence.js';
import type { ChallengeTargetRelationParticipationEvidenceReport } from './i31-challenge-target-relation-participation-evidence.js';
import type { ChallengeTargetClashDependencyEvidenceReport } from './i33-challenge-target-clash-dependency-evidence.js';
import type { ChallengeTargetCombinationDependencyEvidenceReport } from './i35-challenge-target-combination-dependency-evidence.js';
import type { ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport } from './i36-challenge-target-combination-transformation-policy-methodology-review.js';
import type {
  ChallengeTargetCombinationTransformationReferenceReport,
  ChallengeTargetTransformationReferenceItem,
} from './i37-challenge-target-combination-transformation-reference.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V7_VERSION =
  'myeonghwa-challenge-context-availability-v7';

export interface ChallengeContextAvailabilityV7Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV6ReportId: string;
  forceEvidenceReportId: string;
  rootEvidenceReportId: string;
  relationEvidenceReportId: string;
  clashDependencyEvidenceReportId: string;
  combinationDependencyEvidenceReportId: string;
  transformationPolicyReviewId: string;
  transformationReferenceReportId: string;
  transformationReferenceStatus: ChallengeTargetCombinationTransformationReferenceReport['status'];
  transformationReferenceAlignedWithCombinationEvidence: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function referenceCapability(
  references: readonly ChallengeTargetTransformationReferenceItem[],
): string {
  const stemCount = references.filter(
    (item) => item.referenceKind === 'STEM_DAY_MASTER_SCOPED_TRADITIONAL_REFERENCE',
  ).length;
  const threeCount = references.filter(
    (item) => item.referenceKind === 'THREE_COMBINATION_BUREAU_REFERENCE',
  ).length;
  const sixUnresolvedCount = references.filter(
    (item) => item.referenceKind === 'SIX_COMBINATION_REFERENCE_MAPPING_UNRESOLVED',
  ).length;
  return `I37 aligned transformation-reference metadata: ${stemCount} day-stem-scoped stem reference(s), ${threeCount} full-three-bureau reference(s), ${sixUnresolvedCount} unresolved six-combination mapping(s)`;
}

function refineTransformationTargetPolicy(
  base: ChallengeContextCapability,
  aligned: boolean,
  references: readonly ChallengeTargetTransformationReferenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasStemTargetPolicy = base.unresolvedCapabilities.includes(
    'challenge-target stem-combination transformation target-element policy',
  );
  const hasRootTargetPolicy = base.unresolvedCapabilities.includes(
    'challenge-root combination transformation target-element policy',
  );
  if (!hasStemTargetPolicy && !hasRootTargetPolicy) return base;

  if (!aligned) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'resolved I37 transformation-reference metadata aligned to current I35/I36 identity',
      ].sort(),
    };
  }

  const current = references ?? [];
  const hasStemReference = current.some(
    (item) => item.referenceKind === 'STEM_DAY_MASTER_SCOPED_TRADITIONAL_REFERENCE',
  );
  const hasThreeReference = current.some(
    (item) => item.referenceKind === 'THREE_COMBINATION_BUREAU_REFERENCE',
  );
  const hasSixUnresolved = current.some(
    (item) => item.referenceKind === 'SIX_COMBINATION_REFERENCE_MAPPING_UNRESOLVED',
  );
  const unresolved = base.unresolvedCapabilities.filter(
    (capability) =>
      capability !== 'challenge-target stem-combination transformation target-element policy' &&
      capability !== 'challenge-root combination transformation target-element policy',
  );

  if (hasStemTargetPolicy) {
    if (hasStemReference) {
      unresolved.push(
        'challenge-target stem-combination day-stem reference scope-transfer policy',
        'challenge-target stem-combination challenge-specific transformation target-element adoption policy',
      );
    } else {
      unresolved.push(
        'I37 aligned stem transformation-reference metadata for the routed target-stem combination',
      );
    }
  }

  if (hasRootTargetPolicy) {
    if (hasThreeReference) {
      unresolved.push(
        'challenge-root three-combination bureau-reference-to-current-state adoption policy',
        'challenge-root three-combination effective-bureau qualification policy',
      );
    }
    if (hasSixUnresolved) {
      unresolved.push(
        'challenge-root six-combination transformed-element reference convention',
        'challenge-root six-combination transformation target-element policy',
      );
    }
    if (!hasThreeReference && !hasSixUnresolved) {
      unresolved.push(
        'I37 aligned root transformation-reference metadata for the routed root-candidate combination',
      );
    }
  }

  return {
    ...base,
    existingCapabilities:
      current.length === 0
        ? base.existingCapabilities
        : [...base.existingCapabilities, referenceCapability(current)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV7(
  review: ChallengeEffectMethodologyReviewReport,
  forceEvidence: ChallengeMechanismForceEvidenceReport,
  rootEvidence: ChallengeTargetIntrinsicRootEvidenceReport,
  relationEvidence: ChallengeTargetRelationParticipationEvidenceReport,
  clashDependencyEvidence: ChallengeTargetClashDependencyEvidenceReport,
  combinationDependencyEvidence: ChallengeTargetCombinationDependencyEvidenceReport,
  transformationPolicy: ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport,
  transformationReference: ChallengeTargetCombinationTransformationReferenceReport,
): ChallengeContextAvailabilityV7Report {
  const v6: ChallengeContextAvailabilityV6Report = buildI26ChallengeContextAvailabilityV6(
    review,
    forceEvidence,
    rootEvidence,
    relationEvidence,
    clashDependencyEvidence,
    combinationDependencyEvidence,
  );

  const transformationReferenceAlignedWithCombinationEvidence =
    v6.combinationDependencyEvidenceAlignedWithRelationEvidence &&
    transformationReference.status === 'RESOLVED_REFERENCE_METADATA' &&
    transformationReference.upstreamI35ReportId === combinationDependencyEvidence.reportId &&
    transformationReference.upstreamI36ReviewId === transformationPolicy.reviewId &&
    transformationPolicy.decision === 'REFERENCE_MAPPINGS_ONLY_TRANSFORMATION_STATE_BLOCKED' &&
    transformationPolicy.challengeTransformationStateEmissionAuthorized === false &&
    transformationReference.challengeTransformationStateEmissionAuthorized === false &&
    transformationReference.transformationTargetElementEmissionAuthorized === false;

  const referencesByMechanism = new Map<string, ChallengeTargetTransformationReferenceItem[]>();
  if (transformationReferenceAlignedWithCombinationEvidence) {
    for (const reference of transformationReference.references) {
      const current = referencesByMechanism.get(reference.mechanism) ?? [];
      current.push(reference);
      referencesByMechanism.set(reference.mechanism, current);
    }
  }

  const mechanisms = v6.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? refineTransformationTargetPolicy(
            context,
            transformationReferenceAlignedWithCombinationEvidence,
            referencesByMechanism.get(mechanism.mechanism),
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V7_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV6ReportId: v6.reportId,
    forceEvidenceReportId: forceEvidence.reportId,
    rootEvidenceReportId: rootEvidence.reportId,
    relationEvidenceReportId: relationEvidence.reportId,
    clashDependencyEvidenceReportId: clashDependencyEvidence.reportId,
    combinationDependencyEvidenceReportId: combinationDependencyEvidence.reportId,
    transformationPolicyReviewId: transformationPolicy.reviewId,
    transformationReferenceReportId: transformationReference.reportId,
    transformationReferenceStatus: transformationReference.status,
    transformationReferenceAlignedWithCombinationEvidence,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v7 consumes I37 only when the reference report is resolved, bound to the exact I35 report already accepted by v6, and bound to the exact I36 fail-closed transformation policy.',
      'Aligned I37 metadata refines transformation-target policy gaps into day-stem scope-transfer, challenge-specific adoption, three-combination effective-bureau qualification, and unresolved six-combination convention dependencies.',
      'Traditional reference elements remain metadata only and are never promoted to the current challenge-target transformation state.',
      'I26 v7 preserves all I33 clash and I35 combination-condition/support/precedence dependencies from v6.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; transformation, binding, post-combination subject identity, post-relation root state, effective force, and usefulness/harmfulness remain unresolved.',
      'No availability state is converted to points, confidence, usefulness, or a strong/weak category.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v7_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
