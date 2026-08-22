import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV8,
  type ChallengeContextAvailabilityV8Report,
} from './i26-challenge-context-availability-v8.js';
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
import type {
  ChallengeCombinationConditionDependencyGraphItem,
  ChallengeCombinationConditionDependencyGraphReport,
} from './i41-challenge-combination-condition-dependency-graph.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V9_VERSION =
  'myeonghwa-challenge-context-availability-v9';

export interface ChallengeContextAvailabilityV9Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV8ReportId: string;
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
  dependencyGraphStatus: ChallengeCombinationConditionDependencyGraphReport['status'];
  dependencyGraphAlignedWithConditionChain: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function graphCapability(
  graphs: readonly ChallengeCombinationConditionDependencyGraphItem[],
): string {
  const stem = graphs.filter((graph) => graph.relationKind === 'stem_five_combination').length;
  const three = graphs.filter((graph) => graph.relationKind === 'branch_three_combination').length;
  const six = graphs.filter((graph) => graph.relationKind === 'branch_six_combination').length;
  const activeScopeGates = graphs.reduce(
    (total, graph) =>
      total + graph.nodes.filter((node) => node.state === 'SCOPE_GATE_ACTIVE').length,
    0,
  );
  const unresolvedPolicyNodes = graphs.reduce(
    (total, graph) =>
      total + graph.nodes.filter((node) => node.state === 'POLICY_UNRESOLVED_WITH_SUBSTRATE').length,
    0,
  );
  const blockedResultNodes = graphs.reduce(
    (total, graph) => total + graph.nodes.filter((node) => node.state === 'RESULT_BLOCKED').length,
    0,
  );
  return `I41 aligned condition dependency graph: ${graphs.length} graph(s), ${stem} stem-five, ${three} branch-three, ${six} branch-six, ${activeScopeGates} active scope gate(s), ${unresolvedPolicyNodes} unresolved policy node(s), ${blockedResultNodes} blocked result node(s)`;
}

function refineGraphPolicy(
  base: ChallengeContextCapability,
  aligned: boolean,
  graphs: readonly ChallengeCombinationConditionDependencyGraphItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const stemCompositionGap = base.unresolvedCapabilities.includes(
    'challenge-target stem-combination condition-composition decision policy',
  );
  const threeCompositionGap = base.unresolvedCapabilities.includes(
    'challenge-root three-combination condition-composition decision policy',
  );
  const threeBureauGap = base.unresolvedCapabilities.includes(
    'challenge-root three-combination effective-bureau verdict policy',
  );
  const sixCompositionGap = base.unresolvedCapabilities.includes(
    'challenge-root six-combination condition-composition decision policy',
  );
  const stemCompetingPrecedenceGap = base.unresolvedCapabilities.includes(
    'challenge-target stem-combination competing-relation precedence',
  );
  const rootCompetingPrecedenceGap = base.unresolvedCapabilities.includes(
    'challenge-root combination competing-relation precedence',
  );

  if (
    !stemCompositionGap &&
    !threeCompositionGap &&
    !threeBureauGap &&
    !sixCompositionGap &&
    !stemCompetingPrecedenceGap &&
    !rootCompetingPrecedenceGap
  ) {
    return base;
  }

  if (!aligned) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'resolved I41 dependency graph aligned to current I39/I40 identity',
      ].sort(),
    };
  }

  const current = graphs ?? [];
  const stemGraphs = current.filter((graph) => graph.relationKind === 'stem_five_combination');
  const threeGraphs = current.filter((graph) => graph.relationKind === 'branch_three_combination');
  const sixGraphs = current.filter((graph) => graph.relationKind === 'branch_six_combination');
  const rootGraphs = [...threeGraphs, ...sixGraphs];

  const unresolved = base.unresolvedCapabilities.filter(
    (capability) =>
      capability !== 'challenge-target stem-combination condition-composition decision policy' &&
      capability !== 'challenge-root three-combination condition-composition decision policy' &&
      capability !== 'challenge-root three-combination effective-bureau verdict policy' &&
      capability !== 'challenge-root six-combination condition-composition decision policy' &&
      capability !== 'challenge-target stem-combination competing-relation precedence' &&
      capability !== 'challenge-root combination competing-relation precedence',
  );

  if (stemCompositionGap) {
    unresolved.push(
      stemGraphs.length > 0
        ? 'challenge-target stem-combination dependency-graph composition evaluation policy'
        : 'I41 aligned stem dependency graph for the routed target-stem combination',
    );
  }

  if (threeCompositionGap) {
    unresolved.push(
      threeGraphs.length > 0
        ? 'challenge-root three-combination dependency-graph composition evaluation policy'
        : 'I41 aligned three-combination dependency graph for the routed root-candidate combination',
    );
  }

  if (threeBureauGap) {
    unresolved.push(
      threeGraphs.length > 0
        ? 'challenge-root three-combination effective-bureau dependency-graph evaluation policy'
        : 'I41 aligned three-combination bureau-qualification graph substrate',
    );
  }

  if (sixCompositionGap) {
    unresolved.push(
      sixGraphs.length > 0
        ? 'challenge-root six-combination dependency-graph composition evaluation policy'
        : 'I41 aligned six-combination dependency graph for the routed root-candidate combination',
    );
  }

  if (stemCompetingPrecedenceGap) {
    unresolved.push(
      stemGraphs.length > 0
        ? 'challenge-target stem-combination competing-relation interaction/settlement policy'
        : 'I41 aligned stem competing-relation topology graph substrate',
    );
  }

  if (rootCompetingPrecedenceGap) {
    unresolved.push(
      rootGraphs.length > 0
        ? 'challenge-root combination competing-relation interaction/settlement policy'
        : 'I41 aligned root competing-relation topology graph substrate',
    );
  }

  return {
    ...base,
    existingCapabilities:
      current.length === 0
        ? base.existingCapabilities
        : [...base.existingCapabilities, graphCapability(current)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV9(
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
): ChallengeContextAvailabilityV9Report {
  const v8: ChallengeContextAvailabilityV8Report = buildI26ChallengeContextAvailabilityV8(
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
  );

  const dependencyGraphAlignedWithConditionChain =
    v8.conditionEvidenceAlignedWithCombinationChain &&
    conditionComposition.decision === 'PARTIAL_DEPENDENCY_ORDER_ONLY_GLOBAL_PRECEDENCE_BLOCKED' &&
    conditionComposition.conditionDependencyGraphAdapterAuthorized &&
    conditionComposition.globalConditionPrecedenceAuthorized === false &&
    conditionComposition.conditionWeightingAuthorized === false &&
    conditionComposition.additiveConditionAggregationAuthorized === false &&
    conditionComposition.shortCircuitTransformationVerdictAuthorized === false &&
    dependencyGraph.status === 'RESOLVED_DEPENDENCY_GRAPH' &&
    dependencyGraph.upstreamI39ReportId === conditionEvidence.reportId &&
    dependencyGraph.upstreamI40ReviewId === conditionComposition.reviewId &&
    dependencyGraph.allObservedRelationsHaveGraphs &&
    dependencyGraph.globalConditionPrecedenceAuthorized === false &&
    dependencyGraph.numericWeightingAuthorized === false &&
    dependencyGraph.additiveAggregationAuthorized === false &&
    dependencyGraph.shortCircuitTransformationAuthorized === false &&
    dependencyGraph.transformationConditionCompositionVerdict === 'not_determined' &&
    dependencyGraph.effectiveBureauVerdict === 'not_determined' &&
    dependencyGraph.transformationOrBindingVerdict === 'not_determined';

  const graphsByMechanism = new Map<string, ChallengeCombinationConditionDependencyGraphItem[]>();
  if (dependencyGraphAlignedWithConditionChain) {
    for (const graph of dependencyGraph.graphs) {
      const current = graphsByMechanism.get(graph.mechanism) ?? [];
      current.push(graph);
      graphsByMechanism.set(graph.mechanism, current);
    }
  }

  const mechanisms = v8.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? refineGraphPolicy(
            context,
            dependencyGraphAlignedWithConditionChain,
            graphsByMechanism.get(mechanism.mechanism),
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V9_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV8ReportId: v8.reportId,
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
    dependencyGraphStatus: dependencyGraph.status,
    dependencyGraphAlignedWithConditionChain,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v9 consumes I41 only when the dependency graph is resolved, bound to the exact I39/I40 chain already accepted by v8, and preserves every no-precedence/no-weight/no-result guard.',
      'Aligned I41 graphs refine condition-composition gaps into explicit graph-evaluation policies without evaluating graph nodes or edges.',
      'I40/I41 also clarify that generic competing-relation precedence must not become a global total order; the remaining dependency is relation-specific interaction/settlement.',
      'Seasonal-command effect, support/interference effect, three-combination adjacency/spacing effect, lead-out effect, clash impact/settlement, transformation target adoption, post-combination subject identity, and post-relation root state remain unresolved.',
      'Six-combination convention scope remains unresolved and continues to block transformed-element/result composition.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE and no mechanism becomes effectReady.',
      'No graph state is converted to transformation, binding, effective bureau, effective force, usefulness/harmfulness, points, confidence, or strong/weak classification.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v9_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
