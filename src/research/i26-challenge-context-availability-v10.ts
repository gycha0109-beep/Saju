import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV9,
  type ChallengeContextAvailabilityV9Report,
} from './i26-challenge-context-availability-v9.js';
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

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V10_VERSION =
  'myeonghwa-challenge-context-availability-v10';

export interface ChallengeContextAvailabilityV10Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV9ReportId: string;
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
  stemTransformationScopeClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function scopeClosureCapability(review: ChallengeTargetStemTransformationScopeMethodologyReviewReport): string {
  return `I42 stem transformation scope closure: ${review.decision}; day-stem HuaQi result transfer blocked; challenge transformed-target adoption blocked; binding/interaction effect unresolved`;
}

function refineStemScopeClosure(
  base: ChallengeContextCapability,
  scopeAccepted: boolean,
  scopeReview: ChallengeTargetStemTransformationScopeMethodologyReviewReport,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const scopeGap = base.unresolvedCapabilities.includes(
    'challenge-target stem-combination day-stem reference scope-transfer policy',
  );
  const adoptionGap = base.unresolvedCapabilities.includes(
    'challenge-target stem-combination challenge-specific transformation target-element adoption policy',
  );
  const graphEvaluationGap = base.unresolvedCapabilities.includes(
    'challenge-target stem-combination dependency-graph composition evaluation policy',
  );

  if (!scopeGap && !adoptionGap && !graphEvaluationGap) return base;

  if (!scopeAccepted) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'resolved I42 challenge-target stem transformation scope closure',
      ].sort(),
    };
  }

  const unresolved = base.unresolvedCapabilities.filter(
    (capability) =>
      capability !== 'challenge-target stem-combination day-stem reference scope-transfer policy' &&
      capability !== 'challenge-target stem-combination challenge-specific transformation target-element adoption policy' &&
      capability !== 'challenge-target stem-combination dependency-graph composition evaluation policy',
  );

  unresolved.push('challenge-target stem-combination binding/interaction effect policy');

  return {
    ...base,
    existingCapabilities: [
      ...base.existingCapabilities,
      scopeClosureCapability(scopeReview),
    ],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV10(
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
): ChallengeContextAvailabilityV10Report {
  const v9: ChallengeContextAvailabilityV9Report = buildI26ChallengeContextAvailabilityV9(
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
  );

  const stemTransformationScopeClosureAccepted =
    v9.dependencyGraphAlignedWithConditionChain &&
    stemTransformationScope.decision ===
      'NON_DAY_MASTER_CHALLENGE_STEM_TRANSFORMATION_SCOPE_TRANSFER_BLOCKED' &&
    stemTransformationScope.challengeTargetMechanismsAreNonSelfRelations &&
    stemTransformationScope.visibleChallengeTargetStemCannotBeDayMasterStem &&
    stemTransformationScope.traditionalHuaQiResultSubjectIsDayStem &&
    stemTransformationScope.dayStemHuaQiResultContractDirectTransferAuthorized === false &&
    stemTransformationScope.dayStemTransformationConditionSetDirectResultReuseAuthorized === false &&
    stemTransformationScope.traditionalStemTransformationReferenceMetadataMayRemain &&
    stemTransformationScope.challengeTargetStemTransformationStateEmissionAuthorized === false &&
    stemTransformationScope.challengeTargetStemTransformationTargetElementAdoptionAuthorized === false &&
    stemTransformationScope.challengeTargetStemNoTransformationConclusionAuthorized === false &&
    stemTransformationScope.genericChallengeTargetBindingVerdictTransferAuthorized === false &&
    stemTransformationScope.challengeTargetStemBindingEffectEmissionAuthorized === false &&
    stemTransformationScope.combinationStructuralInteractionEvidenceStillRelevant &&
    stemTransformationScope.combinationInteractionSettlementPolicyStillRequired;

  const mechanisms = v9.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? refineStemScopeClosure(context, stemTransformationScopeClosureAccepted, stemTransformationScope)
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V10_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV9ReportId: v9.reportId,
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
    stemTransformationScopeClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v10 accepts I42 only after the I41 graph chain is aligned and only when I42 preserves every negative-scope and no-binding-result guard.',
      'For visible challenge-target stem combinations, day-stem HuaQi result scope transfer and challenge transformed-target adoption are closed as blocked rather than retained as live unresolved routes.',
      'The former stem transformation graph-evaluation dependency is redirected to a dedicated challenge-target binding/interaction effect policy because blocked transformation scope is not evidence of no effect.',
      'Traditional stem transformation elements remain reference metadata only and do not replace the challenge-target subject identity.',
      'Stem seasonal-command effect, support/interference effect, competing-relation interaction/settlement, binding/interaction effect, post-combination subject identity, and effective force remain unresolved.',
      'Branch three-combination and branch six-combination policy dependencies are not modified by the stem-only I42 scope closure.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE and no mechanism becomes effectReady.',
      'No negative scope closure is converted to preservation, no-effect, usefulness/harmfulness, points, confidence, or strong/weak classification.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v10_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
