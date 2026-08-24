import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV10,
  type ChallengeContextAvailabilityV10Report,
} from './i26-challenge-context-availability-v10.js';
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

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V11_VERSION =
  'myeonghwa-challenge-context-availability-v11';

export interface ChallengeContextAvailabilityV11Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV10ReportId: string;
  forceEvidenceReportId: string;
  rootEvidenceReportId: string;
  relationEvidenceReportId: string;
  clashDependencyEvidenceReportId: string;
  combinationDependencyEvidenceReportId: string;
  transformationPolicyReviewId: string;
  transformationReferenceReportId: string;
  conditionApplicabilityReviewId: string;
  conditionEvidenceReportId: string;
  conditionCompositionReviewId: string;
  dependencyGraphReportId: string;
  stemTransformationScopeReviewId: string;
  sixCombinationConventionScopeReviewId: string;
  sixCombinationConventionClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function sixClosureCapability(
  review: ChallengeRootSixCombinationTransformationConventionScopeMethodologyReviewReport,
): string {
  return `I43 six-combination convention closure: ${review.decision}; structural Liuhe retained; uniform transformed-element route blocked; binding/interaction settlement unresolved`;
}

function refineSixCombinationClosure(
  base: ChallengeContextCapability,
  closureAccepted: boolean,
  review: ChallengeRootSixCombinationTransformationConventionScopeMethodologyReviewReport,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const referenceConventionGap = base.unresolvedCapabilities.includes(
    'challenge-root six-combination transformed-element reference convention',
  );
  const transformationTargetGap = base.unresolvedCapabilities.includes(
    'challenge-root six-combination transformation target-element policy',
  );
  const graphEvaluationGap = base.unresolvedCapabilities.includes(
    'challenge-root six-combination dependency-graph composition evaluation policy',
  );

  if (!referenceConventionGap && !transformationTargetGap && !graphEvaluationGap) return base;

  if (!closureAccepted) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'resolved I43 challenge-root six-combination convention scope closure',
      ].sort(),
    };
  }

  const unresolved = base.unresolvedCapabilities.filter(
    (capability) =>
      capability !== 'challenge-root six-combination transformed-element reference convention' &&
      capability !== 'challenge-root six-combination transformation target-element policy' &&
      capability !== 'challenge-root six-combination dependency-graph composition evaluation policy',
  );

  unresolved.push('challenge-root six-combination binding/interaction effect policy');

  return {
    ...base,
    existingCapabilities: [
      ...base.existingCapabilities,
      sixClosureCapability(review),
    ],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV11(
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
): ChallengeContextAvailabilityV11Report {
  const v10: ChallengeContextAvailabilityV10Report = buildI26ChallengeContextAvailabilityV10(
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
  );

  const sixCombinationConventionClosureAccepted =
    v10.stemTransformationScopeClosureAccepted &&
    sixCombinationConventionScope.decision ===
      'UNIFORM_CHALLENGE_ROOT_SIX_COMBINATION_TRANSFORMED_ELEMENT_ROUTE_BLOCKED' &&
    sixCombinationConventionScope.sixCombinationStructuralPairingSourceResolved &&
    sixCombinationConventionScope.sixCombinationStructuralParticipationRemainsValid &&
    sixCombinationConventionScope.sanmingUniformTransformedElementResultContractAvailable === false &&
    sixCombinationConventionScope.externalMappingLikeReferenceObserved &&
    sixCombinationConventionScope.externalMappingLikeReferenceCompleteUniformElementSet === false &&
    sixCombinationConventionScope.externalMappingLikeReferenceDomainMatchesChallengeRootBazi === false &&
    sixCombinationConventionScope.externalMappingLikeReferenceDirectAdoptionAuthorized === false &&
    sixCombinationConventionScope.sixCombinationTraditionalReferenceElementEmissionAuthorized === false &&
    sixCombinationConventionScope.sixCombinationChallengeRootTransformationStateEmissionAuthorized === false &&
    sixCombinationConventionScope.sixCombinationChallengeRootTransformationTargetElementAdoptionAuthorized === false &&
    sixCombinationConventionScope.sixCombinationNoEffectConclusionAuthorized === false &&
    sixCombinationConventionScope.sixCombinationStructuralInteractionEvidenceStillRelevant &&
    sixCombinationConventionScope.sixCombinationInteractionSettlementPolicyStillRequired;

  const mechanisms = v10.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? refineSixCombinationClosure(
            context,
            sixCombinationConventionClosureAccepted,
            sixCombinationConventionScope,
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V11_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV10ReportId: v10.reportId,
    forceEvidenceReportId: forceEvidence.reportId,
    rootEvidenceReportId: rootEvidence.reportId,
    relationEvidenceReportId: relationEvidence.reportId,
    clashDependencyEvidenceReportId: clashDependencyEvidence.reportId,
    combinationDependencyEvidenceReportId: combinationDependencyEvidence.reportId,
    transformationPolicyReviewId: transformationPolicy.reviewId,
    transformationReferenceReportId: transformationReference.reportId,
    conditionApplicabilityReviewId: conditionApplicability.reviewId,
    conditionEvidenceReportId: conditionEvidence.reportId,
    conditionCompositionReviewId: conditionComposition.reviewId,
    dependencyGraphReportId: dependencyGraph.reportId,
    stemTransformationScopeReviewId: stemTransformationScope.reviewId,
    sixCombinationConventionScopeReviewId: sixCombinationConventionScope.reviewId,
    sixCombinationConventionClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v11 accepts I43 only after the I42 stem-scope closure chain is accepted and only when I43 preserves structural Liuhe while blocking transformed-element adoption and no-effect inference.',
      'For branch six-combination root candidates, the transformed-element reference convention, transformation-target policy, and transformation graph-evaluation route are closed rather than retained as live unresolved paths.',
      'The remaining six-combination question is redirected to binding/interaction effect and relation-specific interaction/settlement, with seasonal and support/interference effects still unresolved.',
      'Structural branch six-combination participation remains valid evidence; the negative convention closure does not imply subject preservation, root preservation, or no effect.',
      'Stem scope closure from I42 and branch three-combination policy dependencies remain unchanged.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE and no mechanism becomes effectReady.',
      'No closure is converted to effective force, usefulness/harmfulness, points, confidence, post-relation root state, or strong/weak classification.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v11_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
