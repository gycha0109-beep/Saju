import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import {
  buildI26ChallengeContextAvailability,
  type ChallengeContextCapability,
  type ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeMechanismForceEvidenceReport } from './i27-challenge-mechanism-force-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V2_VERSION =
  'myeonghwa-challenge-context-availability-v2';

export interface ChallengeContextAvailabilityV2Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityReportId: string;
  forceEvidenceReportId: string;
  forceEvidenceStatus: ChallengeMechanismForceEvidenceReport['status'];
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function upgradedForceCapability(
  mechanismPresent: boolean,
): ChallengeContextCapability {
  return mechanismPresent
    ? {
        dependency: 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
        availability: 'PARTIAL_SUBSTRATE',
        existingCapabilities: [
          'I27 mechanism target-element seasonal phase',
          'I27 visible target-element stem positions',
          'I27 target-element branch-main-element positions',
          'I27 target-element hidden-membership positions',
        ],
        unresolvedCapabilities: [
          'target-element intrinsic root quality',
          'target-element post-relation force state',
          'effective mechanism force verdict',
          'relation-specific usefulness/harmfulness',
        ],
        effectResolutionAuthorized: false,
      }
    : {
        dependency: 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
        availability: 'MISSING_SUBSTRATE',
        existingCapabilities: [],
        unresolvedCapabilities: ['resolved I27 mechanism-specific structural force evidence'],
        effectResolutionAuthorized: false,
      };
}

export function buildI26ChallengeContextAvailabilityV2(
  review: ChallengeEffectMethodologyReviewReport,
  forceEvidence: ChallengeMechanismForceEvidenceReport,
): ChallengeContextAvailabilityV2Report {
  const base = buildI26ChallengeContextAvailability(review);
  const forceMechanisms = new Set(
    forceEvidence.status === 'RESOLVED_EVIDENCE'
      ? forceEvidence.mechanisms.map((item) => item.mechanism)
      : [],
  );

  const mechanisms = base.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? upgradedForceCapability(forceMechanisms.has(mechanism.mechanism))
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V2_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityReportId: base.reportId,
    forceEvidenceReportId: forceEvidence.reportId,
    forceEvidenceStatus: forceEvidence.status,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'Resolved I27 evidence upgrades MECHANISM_EFFECTIVE_FORCE_CONTEXT from missing to partial structural substrate only.',
      'A partial substrate is not an effective-force verdict: target root quality, post-relation state, and relation-specific effect remain unresolved.',
      'Even when every required context has some substrate, methodologyReadyForEffectResolution remains false until the unresolved contextual effects are reviewed.',
      'No availability upgrade is converted to points, confidence, or a strong/weak category.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v2_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
