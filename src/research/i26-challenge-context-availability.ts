import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeEffectDependency,
  ChallengeEffectMethodologyReviewReport,
} from './i25-challenge-effect-methodology-review.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_VERSION =
  'myeonghwa-challenge-context-availability-v1';

export type ChallengeContextAvailability =
  | 'EVIDENCE_AVAILABLE_EFFECT_UNRESOLVED'
  | 'PARTIAL_SUBSTRATE'
  | 'MISSING_SUBSTRATE';

export interface ChallengeContextCapability {
  dependency: ChallengeEffectDependency;
  availability: ChallengeContextAvailability;
  existingCapabilities: readonly string[];
  unresolvedCapabilities: readonly string[];
  effectResolutionAuthorized: false;
}

export interface ChallengeMechanismContextAvailability {
  mechanism: ChallengeMechanism;
  requiredContexts: readonly ChallengeContextCapability[];
  missingDependencies: readonly ChallengeEffectDependency[];
  partialDependencies: readonly ChallengeEffectDependency[];
  evidenceAvailableDependencies: readonly ChallengeEffectDependency[];
  effectReady: false;
}

export interface ChallengeContextAvailabilityReport {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  capabilityCatalog: readonly ChallengeContextCapability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const CAPABILITY_CATALOG: readonly ChallengeContextCapability[] = Object.freeze([
  {
    dependency: 'DAY_MASTER_PRECLASSIFICATION_FORCE_CONTEXT',
    availability: 'PARTIAL_SUBSTRATE',
    existingCapabilities: [
      'I20 seasonal 旺/相/休/囚/死 evidence',
      'I21 source-bounded support partial order',
      'I22 maximal support frontier',
      'I23 deterministic readiness blockers',
    ],
    unresolvedCapabilities: [
      'support-effect verdict',
      'challenge-effect verdict',
      'post-relation root effect where routed',
      'ordinary strength classifier policy',
    ],
    effectResolutionAuthorized: false,
  },
  {
    dependency: 'MECHANISM_EFFECTIVE_FORCE_CONTEXT',
    availability: 'MISSING_SUBSTRATE',
    existingCapabilities: [
      'I18B hidden challenge relation membership',
      'I24 challenge mechanism identity/composition',
    ],
    unresolvedCapabilities: [
      'mechanism-specific visible and hidden force context',
      'mechanism-specific seasonal/root context',
      'mechanism-specific post-relation force state',
    ],
    effectResolutionAuthorized: false,
  },
  {
    dependency: 'ROOT_SUPPORT_CONTEXT',
    availability: 'PARTIAL_SUBSTRATE',
    existingCapabilities: [
      'I18C intrinsic root-class candidates',
      'I18D root relation review routing',
      'I19 post-relation root-effect dependency review',
    ],
    unresolvedCapabilities: [
      'earth-root convention',
      'effective post-relation root state where routed',
    ],
    effectResolutionAuthorized: false,
  },
  {
    dependency: 'PEER_SUPPORT_CONTEXT',
    availability: 'EVIDENCE_AVAILABLE_EFFECT_UNRESOLVED',
    existingCapabilities: [
      'visible peer-support evidence',
      'I21 peer/root partial precedence',
      'I22 support frontier preservation',
    ],
    unresolvedCapabilities: ['peer-support effective contribution in full context'],
    effectResolutionAuthorized: false,
  },
  {
    dependency: 'RESOURCE_SUPPORT_CONTEXT',
    availability: 'EVIDENCE_AVAILABLE_EFFECT_UNRESOLVED',
    existingCapabilities: [
      'visible resource-stem positions',
      'resource-branch positions',
      'I22 incomparable resource-support frontier preservation',
    ],
    unresolvedCapabilities: [
      'resource-support precedence relative to root/peer support',
      'resource-support effective contribution in full context',
    ],
    effectResolutionAuthorized: false,
  },
  {
    dependency: 'STRUCTURAL_TARGET_CONTEXT',
    availability: 'PARTIAL_SUBSTRATE',
    existingCapabilities: [
      'deterministic stem/branch structural relation candidates',
      'special-pattern candidate routing',
    ],
    unresolvedCapabilities: [
      'target-specific effective vulnerability or usefulness',
      'combination transformation conditions',
    ],
    effectResolutionAuthorized: false,
  },
  {
    dependency: 'RELATION_INTERACTION_CONTEXT',
    availability: 'PARTIAL_SUBSTRATE',
    existingCapabilities: [
      'I18D clash/six-combination/three-combination root routing',
      'I20D clash rescue-relation candidates',
    ],
    unresolvedCapabilities: [
      'clash settlement',
      'rescue strength/effect',
      'combination transformation effect',
    ],
    effectResolutionAuthorized: false,
  },
]);

const CATALOG_BY_DEPENDENCY = new Map(
  CAPABILITY_CATALOG.map((capability) => [capability.dependency, capability] as const),
);

export const I26_CHALLENGE_CONTEXT_CAPABILITY_CATALOG = CAPABILITY_CATALOG;

function capabilityFor(dependency: ChallengeEffectDependency): ChallengeContextCapability {
  const capability = CATALOG_BY_DEPENDENCY.get(dependency);
  if (capability === undefined) {
    throw new Error(`No I26 challenge-context capability mapping for ${dependency}`);
  }
  return capability;
}

export function buildI26ChallengeContextAvailability(
  review: ChallengeEffectMethodologyReviewReport,
): ChallengeContextAvailabilityReport {
  const mechanisms = review.items.map((item) => {
    const requiredContexts = item.requiredContexts.map(capabilityFor);
    return {
      mechanism: item.mechanism,
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_VERSION,
    upstreamReviewId: review.reviewId,
    mechanisms,
    capabilityCatalog: CAPABILITY_CATALOG,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'Availability describes whether a research evidence substrate exists; it does not mean the contextual effect has been resolved.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains missing for every challenge mechanism and is the primary shared gap.',
      'Partial substrates preserve unresolved post-relation, transformation, rescue, or root-convention dependencies rather than guessing through them.',
      'No availability state is converted to a magnitude, confidence, or strong/weak result.',
    ],
  };

  return {
    reportId: `challenge_context_availability_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
