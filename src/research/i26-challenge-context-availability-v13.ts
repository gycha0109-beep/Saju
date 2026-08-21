import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV12,
  type ChallengeContextAvailabilityV12Report,
} from './i26-challenge-context-availability-v12.js';
import type { ChallengeMechanismForceEvidenceReport } from './i27-challenge-mechanism-force-evidence.js';
import type { ChallengeTargetIntrinsicRootEvidenceReport } from './i29-challenge-target-intrinsic-root-evidence.js';
import type { ChallengeTargetRelationParticipationEvidenceReport } from './i31-challenge-target-relation-participation-evidence.js';
import type { ChallengeTargetClashDependencyEvidenceReport } from './i33-challenge-target-clash-dependency-evidence.js';
import type { ChallengeTargetCombinationDependencyEvidenceReport } from './i35-challenge-target-combination-dependency-evidence.js';
import type { ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport } from './i36-challenge-target-combination-transformation-policy-methodology-review.js';
import type { ChallengeTargetCombinationTransformationReferenceReport } from './i37-challenge-target-combination-transformation-reference.js';
import type { ChallengeTargetCombinationConditionApplicabilityMethodologyReviewReport } from './i38-challenge-target-combination-condition-applicability-methodology-review.js';
import type { ChallengeTargetCombinationConditionEvidenceReport } from './i39-challenge-target-combination-condition-evidence.js';
import type { ChallengeCombinationConditionCompositionPrecedenceMethodologyReviewReport } from './i40-challenge-combination-condition-composition-precedence-methodology-review.js';
import type { ChallengeCombinationConditionDependencyGraphReport } from './i41-challenge-combination-condition-dependency-graph.js';
import type { ChallengeTargetStemTransformationScopeMethodologyReviewReport } from './i42-challenge-target-stem-transformation-scope-methodology-review.js';
import type { ChallengeRootSixCombinationTransformationConventionScopeMethodologyReviewReport } from './i43-challenge-root-six-combination-transformation-convention-scope-methodology-review.js';
import type { ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReviewReport } from './i44-challenge-root-three-combination-effective-bureau-qualification-methodology-review.js';
import type { ChallengeRootThreeCombinationBureauFormationEvidenceReport } from './i45-challenge-root-three-combination-bureau-formation-evidence.js';
import type { ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReviewReport } from './i46-challenge-root-three-combination-clash-break-damage-settlement-methodology-review.js';
import type {
  ChallengeRootThreeCombinationClashPlacementSettlementEvidenceItem,
  ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
} from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V13_VERSION =
  'myeonghwa-challenge-context-availability-v13';

export interface ChallengeContextAvailabilityV13Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV12ReportId: string;
  clashSettlementMethodologyReviewId: string;
  clashSettlementEvidenceReportId: string;
  clashPlacementSettlementClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const GENERIC_CLASH_SETTLEMENT_GAP =
  'challenge-root three-combination clash break/damage settlement policy';
const POST_INTERACTION_STATE_GAP =
  'challenge-root three-combination post-interaction bureau-state policy';
const CONTEXTUAL_DAMAGE_GAP =
  'challenge-root three-combination contextual intact-vs-damaged settlement policy';

function settlementIdentityAligned(
  formationEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  settlementEvidence: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): boolean {
  if (formationEvidence.items.length !== settlementEvidence.items.length) return false;
  return formationEvidence.items.every((formation) => {
    const settlement = settlementEvidence.items.find(
      (item) =>
        item.formationRelationId === formation.relationId &&
        item.mechanism === formation.mechanism &&
        item.formationState === formation.formationState,
    );
    return (
      settlement !== undefined &&
      settlement.targetPostRelationRootState === 'not_determined' &&
      settlement.effectiveMechanismForceVerdict === 'not_determined' &&
      settlement.relationSpecificUsefulnessHarmfulness === 'not_determined'
    );
  });
}

function settlementCapability(
  items: readonly ChallengeRootThreeCombinationClashPlacementSettlementEvidenceItem[],
): string {
  const directBreaks = items.filter(
    (item) => item.postInteractionBureauState === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
  ).length;
  const contextual = items.filter((item) =>
    item.clashes.some(
      (clash) => clash.settlement === 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
    ),
  ).length;
  const noDirect = items.filter(
    (item) =>
      item.trackedClashCount === 0 ||
      item.clashes.every((clash) => clash.settlement === 'NO_DIRECT_SETTLEMENT_FROM_THIS_RULE'),
  ).length;
  return `I47 three-combination clash placement settlement: ${directBreaks} direct broken bureau item(s), ${contextual} contextual intact-vs-damaged item(s), ${noDirect} no-direct-settlement item(s)`;
}

function refineClashSettlement(
  base: ChallengeContextCapability,
  aligned: boolean,
  items: readonly ChallengeRootThreeCombinationClashPlacementSettlementEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasRelevantGap =
    base.unresolvedCapabilities.includes(GENERIC_CLASH_SETTLEMENT_GAP) ||
    base.unresolvedCapabilities.includes(POST_INTERACTION_STATE_GAP);
  if (!hasRelevantGap) return base;

  if (!aligned) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'resolved I47 clash placement settlement evidence aligned to current I45/I46 identity',
      ].sort(),
    };
  }

  const current = items ?? [];
  if (current.length === 0) return base;

  const unresolved = base.unresolvedCapabilities.filter(
    (capability) => capability !== GENERIC_CLASH_SETTLEMENT_GAP,
  );
  const allBureauStatesResolvedByDirectBreak = current.every(
    (item) => item.postInteractionBureauState === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
  );
  const hasContextualSettlement = current.some((item) =>
    item.clashes.some(
      (clash) => clash.settlement === 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED',
    ),
  );

  if (allBureauStatesResolvedByDirectBreak) {
    const index = unresolved.indexOf(POST_INTERACTION_STATE_GAP);
    if (index >= 0) unresolved.splice(index, 1);
  }
  if (hasContextualSettlement) unresolved.push(CONTEXTUAL_DAMAGE_GAP);

  return {
    ...base,
    existingCapabilities: [...base.existingCapabilities, settlementCapability(current)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV13(
  review: ChallengeEffectMethodologyReviewReport,
  forceEvidence: ChallengeMechanismForceEvidenceReport,
  rootEvidence: ChallengeTargetIntrinsicRootEvidenceReport,
  relationEvidence: ChallengeTargetRelationParticipationEvidenceReport,
  clashDependencyEvidence: ChallengeTargetClashDependencyEvidenceReport,
  combinationDependencyEvidence: ChallengeTargetCombinationDependencyEvidenceReport,
  transformationPolicy: ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport,
  transformationReference: ChallengeTargetCombinationTransformationReferenceReport,
  conditionApplicability: ChallengeTargetCombinationConditionApplicabilityMethodologyReviewReport,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  conditionComposition: ChallengeCombinationConditionCompositionPrecedenceMethodologyReviewReport,
  dependencyGraph: ChallengeCombinationConditionDependencyGraphReport,
  stemTransformationScope: ChallengeTargetStemTransformationScopeMethodologyReviewReport,
  sixCombinationConventionScope: ChallengeRootSixCombinationTransformationConventionScopeMethodologyReviewReport,
  threeCombinationBureauQualification: ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReviewReport,
  threeCombinationBureauFormationEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  clashSettlementMethodology: ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReviewReport,
  clashSettlementEvidence: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): ChallengeContextAvailabilityV13Report {
  const v12: ChallengeContextAvailabilityV12Report = buildI26ChallengeContextAvailabilityV12(
    review,
    forceEvidence,
    rootEvidence,
    relationEvidence,
    clashDependencyEvidence,
    combinationDependencyEvidence,
    transformationPolicy,
    transformationReference,
    conditionApplicability,
    conditionEvidence,
    conditionComposition,
    dependencyGraph,
    stemTransformationScope,
    sixCombinationConventionScope,
    threeCombinationBureauQualification,
    threeCombinationBureauFormationEvidence,
  );

  const clashPlacementSettlementClosureAccepted =
    v12.threeCombinationBureauFormationClosureAccepted &&
    clashSettlementMethodology.decision ===
      'TIGHT_EMBEDDED_CLASH_BREAK_AUTHORIZED_OTHER_SETTLEMENT_STATES_CONTEXTUAL' &&
    clashSettlementMethodology.structuralBureauFormationRequiredBeforeSettlement &&
    clashSettlementMethodology.trackedClashTopologyRequiredForClashSettlement &&
    clashSettlementMethodology.placementClassificationAuthorized &&
    clashSettlementMethodology.tightEmbeddedClashBreakVerdictAuthorized &&
    clashSettlementMethodology.tightEmbeddedClashBreakVerdict ===
      'BROKEN_BY_TIGHT_EMBEDDED_CLASH' &&
    clashSettlementMethodology.embeddedNonTightDeterministicDamageVerdictAuthorized === false &&
    clashSettlementMethodology.outsideTightDeterministicDamageVerdictAuthorized === false &&
    clashSettlementMethodology.noTrackedClashIntactVerdictAuthorized === false &&
    clashSettlementMethodology.multipleClashAggregationAuthorized === false &&
    clashSettlementMethodology.clashForceWeightingAuthorized === false &&
    clashSettlementMethodology.genericPostInteractionBureauStateEmissionAuthorized === false &&
    clashSettlementMethodology.classificationAuthorized === false &&
    clashSettlementMethodology.numericScoringAuthorized === false &&
    clashSettlementEvidence.status === 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE' &&
    clashSettlementEvidence.upstreamI45ReportId === threeCombinationBureauFormationEvidence.reportId &&
    clashSettlementEvidence.upstreamI46ReviewId === clashSettlementMethodology.reviewId &&
    clashSettlementEvidence.placementClassificationAvailable &&
    clashSettlementEvidence.tightEmbeddedBreakStateEmissionAuthorized &&
    clashSettlementEvidence.genericPostInteractionBureauStateEmissionAuthorized === false &&
    clashSettlementEvidence.damagedBureauMagnitudeClassificationAuthorized === false &&
    clashSettlementEvidence.multipleClashAggregationAuthorized === false &&
    clashSettlementEvidence.targetPostRelationRootState === 'not_determined' &&
    clashSettlementEvidence.effectiveMechanismForceVerdict === 'not_determined' &&
    clashSettlementEvidence.classificationAuthorized === false &&
    clashSettlementEvidence.numericScoringAuthorized === false &&
    settlementIdentityAligned(threeCombinationBureauFormationEvidence, clashSettlementEvidence);

  const settlementByMechanism = new Map<
    string,
    ChallengeRootThreeCombinationClashPlacementSettlementEvidenceItem[]
  >();
  if (clashPlacementSettlementClosureAccepted) {
    for (const item of clashSettlementEvidence.items) {
      const current = settlementByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      settlementByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = v12.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? refineClashSettlement(
            context,
            clashPlacementSettlementClosureAccepted,
            settlementByMechanism.get(mechanism.mechanism),
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V13_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV12ReportId: v12.reportId,
    clashSettlementMethodologyReviewId: clashSettlementMethodology.reviewId,
    clashSettlementEvidenceReportId: clashSettlementEvidence.reportId,
    clashPlacementSettlementClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v13 accepts I46/I47 only when settlement evidence is bound to the exact I45 formation report and preserves the no-force/no-scoring guards.',
      'The generic three-combination clash break/damage settlement blocker is removed once every tracked clash has an I47 placement classification.',
      'A mechanism loses the generic post-interaction bureau-state blocker only when every routed I47 bureau item for that mechanism has the source-bounded BROKEN_BY_TIGHT_EMBEDDED_CLASH state.',
      'Embedded non-tight and outside tight clashes are refined to a contextual intact-versus-damaged settlement dependency; no deterministic damaged magnitude is emitted.',
      'Outside non-tight and no-clash cases receive no intactness conclusion from I46/I47 and therefore retain the broader post-interaction bureau-state dependency.',
      'Bureau breakage is not converted to root destruction, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric score, confidence, or strength classification.',
      'Seasonal-command effect, support/interference effect, and generic competing-relation interaction/settlement remain independently unresolved.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE and effectReady remains false for all mechanisms.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v13_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
