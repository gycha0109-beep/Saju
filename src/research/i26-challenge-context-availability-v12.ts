import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV11,
  type ChallengeContextAvailabilityV11Report,
} from './i26-challenge-context-availability-v11.js';
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
import type {
  ChallengeRootThreeCombinationBureauFormationEvidenceItem,
  ChallengeRootThreeCombinationBureauFormationEvidenceReport,
} from './i45-challenge-root-three-combination-bureau-formation-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V12_VERSION =
  'myeonghwa-challenge-context-availability-v12';

export interface ChallengeContextAvailabilityV12Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV11ReportId: string;
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
  threeCombinationBureauQualificationReviewId: string;
  threeCombinationBureauFormationEvidenceReportId: string;
  threeCombinationBureauFormationClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const THREE_FORMATION_GAPS = new Set([
  'challenge-root three-combination dependency-graph composition evaluation policy',
  'challenge-root three-combination effective-bureau dependency-graph evaluation policy',
  'challenge-root three-combination adjacency/spacing effect policy',
  'challenge-root three-combination lead-out sufficiency/effect policy',
  'challenge-root three-combination clash-topology impact/settlement policy',
]);

function evidenceIdentityAligned(
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  formationEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
): boolean {
  const threeConditions = conditionEvidence.items.filter(
    (item) => item.relationKind === 'branch_three_combination',
  );
  if (threeConditions.length !== formationEvidence.items.length) return false;

  return threeConditions.every((condition) => {
    const formation = formationEvidence.items.find(
      (item) =>
        item.relationId === condition.relationId &&
        item.mechanism === condition.mechanism &&
        item.subjectPosition === condition.subjectPosition &&
        item.subjectValue === String(condition.subjectValue),
    );
    return (
      formation !== undefined &&
      formation.formationState === 'STRUCTURAL_BUREAU_FORMED' &&
      formation.formationBasis === 'FULL_THREE_BRANCH_MEMBERSHIP' &&
      formation.fullMembershipObserved &&
      formation.traditionalBureauElement ===
        condition.threeBranchCondition?.traditionalBureauReferenceElement &&
      formation.adjacencyRequiredForFormation === false &&
      formation.visibleLeadOutRequiredForFormation === false &&
      formation.clashBreakDamageSettlement === 'not_determined' &&
      formation.postInteractionBureauState === 'not_determined' &&
      formation.postInteractionEffectiveBureauVerdict === 'not_determined' &&
      formation.effectiveMechanismForceVerdict === 'not_determined'
    );
  });
}

function formationCapability(
  items: readonly ChallengeRootThreeCombinationBureauFormationEvidenceItem[],
): string {
  const clashObserved = items.filter((item) => item.clashTopology.length > 0).length;
  const separated = items.filter((item) => item.adjacencyState === 'SEPARATED_WITH_GAP').length;
  const noLeadOut = items.filter(
    (item) => item.leadOutState === 'NO_VISIBLE_REFERENCE_ELEMENT_STEM',
  ).length;
  return `I45 structural three-combination bureau formation: ${items.length} formed bureau(s), ${clashObserved} with observed clash topology, ${separated} separated placement(s), ${noLeadOut} without visible bureau-element lead-out; adjacency/lead-out are not formation prerequisites`;
}

function refineThreeCombinationFormation(
  base: ChallengeContextCapability,
  aligned: boolean,
  items: readonly ChallengeRootThreeCombinationBureauFormationEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const relevantGaps = base.unresolvedCapabilities.filter((capability) =>
    THREE_FORMATION_GAPS.has(capability),
  );
  if (relevantGaps.length === 0) return base;

  if (!aligned) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'resolved I45 structural bureau-formation evidence aligned to current I39/I44 identity',
      ].sort(),
    };
  }

  const current = items ?? [];
  if (current.length === 0) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'I45 aligned structural bureau-formation evidence for the routed three-combination',
      ].sort(),
    };
  }

  const unresolved = base.unresolvedCapabilities.filter(
    (capability) => !THREE_FORMATION_GAPS.has(capability),
  );

  unresolved.push('challenge-root three-combination post-interaction bureau-state policy');
  if (current.some((item) => item.clashTopology.length > 0)) {
    unresolved.push('challenge-root three-combination clash break/damage settlement policy');
  }

  return {
    ...base,
    existingCapabilities: [...base.existingCapabilities, formationCapability(current)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV12(
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
): ChallengeContextAvailabilityV12Report {
  const v11: ChallengeContextAvailabilityV11Report = buildI26ChallengeContextAvailabilityV11(
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
  );

  const threeCombinationBureauFormationClosureAccepted =
    v11.sixCombinationConventionClosureAccepted &&
    threeCombinationBureauQualification.decision ===
      'FULL_MEMBERSHIP_BUREAU_FORMATION_AUTHORIZED_POST_INTERACTION_STATE_BLOCKED' &&
    threeCombinationBureauQualification.fullThreeMembershipRequiredForTraditionalBureau &&
    threeCombinationBureauQualification.missingOneBranchBlocksFullThreeBureauFormation &&
    threeCombinationBureauQualification.fullThreeMembershipAuthorizesStructuralBureauFormation &&
    threeCombinationBureauQualification.structuralBureauFormationStateEmissionAuthorized &&
    threeCombinationBureauQualification.traditionalBureauElementReferenceMayBeUsedForFormationIdentity &&
    threeCombinationBureauQualification.structuralBureauFormationEqualsPostInteractionEffectiveBureau === false &&
    threeCombinationBureauQualification.fullThreeAdjacencyRequiredForFormation === false &&
    threeCombinationBureauQualification.fullThreeVisibleLeadOutRequiredForFormation === false &&
    threeCombinationBureauQualification.twoBranchAdjacencyRuleTransferToFullThreeAuthorized === false &&
    threeCombinationBureauQualification.twoBranchLeadOutRuleTransferToFullThreeAuthorized === false &&
    threeCombinationBureauQualification.deterministicClashBreakDamageSettlementPolicyResolved === false &&
    threeCombinationBureauQualification.postInteractionBureauStateEmissionAuthorized === false &&
    threeCombinationBureauQualification.postInteractionEffectiveBureauVerdictAuthorized === false &&
    threeCombinationBureauFormationEvidence.status === 'RESOLVED_STRUCTURAL_BUREAU_FORMATION' &&
    threeCombinationBureauFormationEvidence.upstreamI39ReportId === conditionEvidence.reportId &&
    threeCombinationBureauFormationEvidence.upstreamI44ReviewId ===
      threeCombinationBureauQualification.reviewId &&
    threeCombinationBureauFormationEvidence.allThreeCombinationItemsHaveFormationEvidence &&
    threeCombinationBureauFormationEvidence.structuralBureauFormationStateEmissionAuthorized &&
    threeCombinationBureauFormationEvidence.postInteractionBureauStateEmissionAuthorized === false &&
    threeCombinationBureauFormationEvidence.postInteractionEffectiveBureauVerdictAuthorized === false &&
    threeCombinationBureauFormationEvidence.adjacencyRequiredForFullThreeFormation === false &&
    threeCombinationBureauFormationEvidence.visibleLeadOutRequiredForFullThreeFormation === false &&
    threeCombinationBureauFormationEvidence.postCombinationSubjectIdentityPolicyResolved === false &&
    threeCombinationBureauFormationEvidence.targetPostRelationRootState === 'not_determined' &&
    threeCombinationBureauFormationEvidence.effectiveMechanismForceVerdict === 'not_determined' &&
    evidenceIdentityAligned(conditionEvidence, threeCombinationBureauFormationEvidence);

  const evidenceByMechanism = new Map<
    string,
    ChallengeRootThreeCombinationBureauFormationEvidenceItem[]
  >();
  if (threeCombinationBureauFormationClosureAccepted) {
    for (const item of threeCombinationBureauFormationEvidence.items) {
      const current = evidenceByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      evidenceByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = v11.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? refineThreeCombinationFormation(
            context,
            threeCombinationBureauFormationClosureAccepted,
            evidenceByMechanism.get(mechanism.mechanism),
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V12_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV11ReportId: v11.reportId,
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
    threeCombinationBureauQualificationReviewId: threeCombinationBureauQualification.reviewId,
    threeCombinationBureauFormationEvidenceReportId: threeCombinationBureauFormationEvidence.reportId,
    threeCombinationBureauFormationClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v12 accepts I44/I45 only when the structural bureau-formation evidence is bound to the exact I39 condition evidence and preserves every post-interaction/effective-force guard.',
      'For routed full three-combinations, structural bureau formation is now an existing capability rather than a live condition-composition or effective-bureau-qualification blocker.',
      'Adjacency/spacing and visible lead-out are removed as full-three formation blockers because I44 does not authorize two-branch prerequisite rules to be transferred to complete three-branch formation.',
      'Observed clash topology is redirected to deterministic break/damage settlement, and post-interaction bureau state remains unresolved; no intact/broken/damaged verdict is emitted.',
      'Seasonal-command effect, support/interference effect, and competing-relation interaction/settlement remain unresolved and continue to block effective challenge force.',
      'Stem and six-combination closures from I42/I43 remain unchanged.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE and no mechanism becomes effectReady.',
      'Structural bureau formation is not converted to subject replacement, post-relation root state, effective force, usefulness/harmfulness, points, confidence, or strong/weak classification.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v12_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
