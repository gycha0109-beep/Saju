import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV13Report } from './i26-challenge-context-availability-v13.js';
import type { ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReviewReport } from './i48-challenge-root-three-combination-contextual-damage-settlement-methodology-review.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V14_VERSION =
  'myeonghwa-challenge-context-availability-v14';

export interface ChallengeContextAvailabilityV14Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV13ReportId: string;
  contextualSettlementMethodologyReviewId: string;
  contextualSettlementMethodologyClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const CONTEXTUAL_SETTLEMENT_GAP =
  'challenge-root three-combination contextual intact-vs-damaged settlement policy';
const CONTEXTUAL_AMBIGUITY_CAPABILITY =
  'I48 source-bounded contextual bureau-state ambiguity: placement alone cannot select INTACT or DAMAGED';

function refineContextualSettlement(
  base: ChallengeContextCapability,
  accepted: boolean,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE' ||
    !base.unresolvedCapabilities.includes(CONTEXTUAL_SETTLEMENT_GAP)
  ) {
    return base;
  }

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'authorized I48 source-bounded contextual ambiguity methodology',
      ].sort(),
    };
  }

  return {
    ...base,
    existingCapabilities: [...base.existingCapabilities, CONTEXTUAL_AMBIGUITY_CAPABILITY],
    unresolvedCapabilities: base.unresolvedCapabilities
      .filter((capability) => capability !== CONTEXTUAL_SETTLEMENT_GAP)
      .sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV14(
  availabilityV13: ChallengeContextAvailabilityV13Report,
  contextualSettlementMethodology: ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReviewReport,
): ChallengeContextAvailabilityV14Report {
  const contextualSettlementMethodologyClosureAccepted =
    availabilityV13.clashPlacementSettlementClosureAccepted &&
    contextualSettlementMethodology.decision ===
      'PLACEMENT_ONLY_CONTEXTUAL_SETTLEMENT_NOT_DETERMINISTIC_SOURCE_BOUNDED_AMBIGUITY' &&
    contextualSettlementMethodology.tightEmbeddedDirectBreakRuleReopened === false &&
    contextualSettlementMethodology.tightEmbeddedDirectBreakRuleRemainsAuthorized &&
    contextualSettlementMethodology.contextualPlacementEvidenceAvailable &&
    contextualSettlementMethodology.placementOnlyIntactVerdictAuthorized === false &&
    contextualSettlementMethodology.placementOnlyDamagedVerdictAuthorized === false &&
    contextualSettlementMethodology.deterministicDamageMagnitudeAuthorized === false &&
    contextualSettlementMethodology.deterministicDamageSeverityClassAuthorized === false &&
    contextualSettlementMethodology.deterministicContextPrecedenceRuleResolved === false &&
    contextualSettlementMethodology.sourceProvidesCompleteAdditionalContextDecisionRule === false &&
    contextualSettlementMethodology.contextualAmbiguityStateAuthorized &&
    contextualSettlementMethodology.contextualAmbiguityState ===
      'SOURCE_BOUNDED_CONTEXTUAL_INTACT_OR_DAMAGED_AMBIGUITY' &&
    contextualSettlementMethodology.additionalIndependentEffectMethodologyRequiredForFurtherResolution &&
    contextualSettlementMethodology.noTrackedClashIntactVerdictAuthorized === false &&
    contextualSettlementMethodology.outsideNonTightIntactVerdictAuthorized === false &&
    contextualSettlementMethodology.genericPostInteractionBureauStateEmissionAuthorized === false &&
    contextualSettlementMethodology.targetPostRelationRootState === 'not_determined' &&
    contextualSettlementMethodology.effectiveMechanismForceVerdict === 'not_determined' &&
    contextualSettlementMethodology.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    contextualSettlementMethodology.classificationAuthorized === false &&
    contextualSettlementMethodology.numericScoringAuthorized === false;

  const mechanisms = availabilityV13.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineContextualSettlement(context, contextualSettlementMethodologyClosureAccepted),
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V14_VERSION,
    upstreamAvailabilityV13ReportId: availabilityV13.reportId,
    contextualSettlementMethodologyReviewId: contextualSettlementMethodology.reviewId,
    contextualSettlementMethodologyClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v14 closes the open placement-only contextual intact-versus-damaged methodology question only when the exact I48 source-bounded ambiguity contract is accepted.',
      'For affected mechanisms, the contextual settlement policy gap is replaced by an existing capability that records the source-bounded inability to choose INTACT or DAMAGED from placement alone.',
      'The broader post-interaction bureau-state dependency remains unresolved because a source-bounded ambiguity marker is not a bureau-state verdict.',
      'The I46/I47 BROKEN_BY_TIGHT_EMBEDDED_CLASH route is preserved and not reopened by I48/v14.',
      'Outside-non-tight and no-clash routes remain without an intactness conclusion; v14 does not manufacture an ambiguity capability unless v13 actually routed the contextual settlement gap.',
      'Further resolution must come from independently authorized effect methodologies rather than repeated placement-only refinement.',
      'Seasonal-command effect, support/interference effect, generic competing-relation settlement, post-relation root state, and effective mechanism force remain unresolved.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; all mechanisms remain effectReady=false and no scoring or classification is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v14_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
