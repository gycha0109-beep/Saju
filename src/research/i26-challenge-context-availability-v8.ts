import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeEffectMethodologyReviewReport } from './i25-challenge-effect-methodology-review.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import {
  buildI26ChallengeContextAvailabilityV7,
  type ChallengeContextAvailabilityV7Report,
} from './i26-challenge-context-availability-v7.js';
import type { ChallengeMechanismForceEvidenceReport } from './i27-challenge-mechanism-force-evidence.js';
import type { ChallengeTargetIntrinsicRootEvidenceReport } from './i29-challenge-target-intrinsic-root-evidence.js';
import type { ChallengeTargetRelationParticipationEvidenceReport } from './i31-challenge-target-relation-participation-evidence.js';
import type { ChallengeTargetClashDependencyEvidenceReport } from './i33-challenge-target-clash-dependency-evidence.js';
import type { ChallengeTargetCombinationDependencyEvidenceReport } from './i35-challenge-target-combination-dependency-evidence.js';
import type { ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport } from './i36-challenge-target-combination-transformation-policy-methodology-review.js';
import type { ChallengeTargetCombinationTransformationReferenceReport } from './i37-challenge-target-combination-transformation-reference.js';
import type { ChallengeTargetCombinationConditionApplicabilityMethodologyReviewReport } from './i38-challenge-target-combination-condition-applicability-methodology-review.js';
import type {
  ChallengeTargetCombinationConditionEvidenceItem,
  ChallengeTargetCombinationConditionEvidenceReport,
} from './i39-challenge-target-combination-condition-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V8_VERSION =
  'myeonghwa-challenge-context-availability-v8';

export interface ChallengeContextAvailabilityV8Report {
  reportId: string;
  reportVersion: string;
  upstreamReviewId: string;
  upstreamAvailabilityV7ReportId: string;
  forceEvidenceReportId: string;
  rootEvidenceReportId: string;
  relationEvidenceReportId: string;
  clashDependencyEvidenceReportId: string;
  combinationDependencyEvidenceReportId: string;
  transformationPolicyReviewId: string;
  transformationReferenceReportId: string;
  conditionApplicabilityReviewId: string;
  conditionEvidenceReportId: string;
  conditionEvidenceStatus: ChallengeTargetCombinationConditionEvidenceReport['status'];
  conditionEvidenceAlignedWithCombinationChain: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function conditionCapability(
  items: readonly ChallengeTargetCombinationConditionEvidenceItem[],
): string {
  const three = items.filter((item) => item.relationKind === 'branch_three_combination');
  const separated = three.filter(
    (item) => item.threeBranchCondition?.adjacencyState === 'SEPARATED_WITH_GAP',
  ).length;
  const clashTopology = three.reduce(
    (total, item) => total + (item.threeBranchCondition?.clashTopology.length ?? 0),
    0,
  );
  const leadOut = three.filter(
    (item) => item.threeBranchCondition?.leadOutState === 'VISIBLE_REFERENCE_ELEMENT_STEM_PRESENT',
  ).length;
  const six = items.filter(
    (item) =>
      item.sixCombinationConventionState ===
      'UNIFORM_TRANSFORMATION_CONVENTION_UNRESOLVED_SCOPE_MISMATCH',
  ).length;
  return `I39 aligned combination condition evidence: ${items.length} item(s), ${three.length} three-combination item(s), ${separated} separated placement(s), ${clashTopology} clash-topology candidate(s), ${leadOut} visible lead-out candidate(s), ${six} unresolved six-combination convention item(s)`;
}

function refineConditionPolicy(
  base: ChallengeContextCapability,
  aligned: boolean,
  items: readonly ChallengeTargetCombinationConditionEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasStemConditionGap = base.unresolvedCapabilities.includes(
    'challenge-target stem-combination transformation-condition policy',
  );
  const hasRootConditionGap = base.unresolvedCapabilities.includes(
    'challenge-root combination transformation-condition policy',
  );
  const hasThreeQualificationGap = base.unresolvedCapabilities.includes(
    'challenge-root three-combination effective-bureau qualification policy',
  );
  if (!hasStemConditionGap && !hasRootConditionGap && !hasThreeQualificationGap) return base;

  if (!aligned) {
    return {
      ...base,
      unresolvedCapabilities: [
        ...base.unresolvedCapabilities,
        'resolved I39 combination condition evidence aligned to current I35/I37/I38 identity',
      ].sort(),
    };
  }

  const current = items ?? [];
  const stemItems = current.filter((item) => item.relationKind === 'stem_five_combination');
  const threeItems = current.filter((item) => item.relationKind === 'branch_three_combination');
  const sixItems = current.filter((item) => item.relationKind === 'branch_six_combination');
  const unresolved = base.unresolvedCapabilities.filter(
    (capability) =>
      capability !== 'challenge-target stem-combination transformation-condition policy' &&
      capability !== 'challenge-root combination transformation-condition policy' &&
      capability !== 'challenge-root three-combination effective-bureau qualification policy',
  );

  if (hasStemConditionGap) {
    unresolved.push(
      stemItems.length > 0
        ? 'challenge-target stem-combination condition-composition decision policy'
        : 'I39 aligned stem condition evidence for the routed target-stem combination',
    );
  }

  if (hasRootConditionGap) {
    if (threeItems.length > 0) {
      unresolved.push(
        'challenge-root three-combination condition-composition decision policy',
        'challenge-root three-combination adjacency/spacing effect policy',
        'challenge-root three-combination lead-out sufficiency/effect policy',
        'challenge-root three-combination effective-bureau verdict policy',
      );
      if (
        threeItems.some((item) => (item.threeBranchCondition?.clashTopology.length ?? 0) > 0)
      ) {
        unresolved.push('challenge-root three-combination clash-topology impact/settlement policy');
      }
    }
    if (sixItems.length > 0) {
      unresolved.push('challenge-root six-combination condition-composition decision policy');
    }
    if (threeItems.length === 0 && sixItems.length === 0) {
      unresolved.push('I39 aligned root condition evidence for the routed root-candidate combination');
    }
  } else if (hasThreeQualificationGap && threeItems.length > 0) {
    unresolved.push(
      'challenge-root three-combination condition-composition decision policy',
      'challenge-root three-combination adjacency/spacing effect policy',
      'challenge-root three-combination lead-out sufficiency/effect policy',
      'challenge-root three-combination effective-bureau verdict policy',
    );
    if (threeItems.some((item) => (item.threeBranchCondition?.clashTopology.length ?? 0) > 0)) {
      unresolved.push('challenge-root three-combination clash-topology impact/settlement policy');
    }
  }

  return {
    ...base,
    existingCapabilities:
      current.length === 0
        ? base.existingCapabilities
        : [...base.existingCapabilities, conditionCapability(current)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV8(
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
): ChallengeContextAvailabilityV8Report {
  const v7: ChallengeContextAvailabilityV7Report = buildI26ChallengeContextAvailabilityV7(
    review,
    forceEvidence,
    rootEvidence,
    relationEvidence,
    clashDependencyEvidence,
    combinationDependencyEvidence,
    transformationPolicy,
    transformationReference,
  );

  const conditionEvidenceAlignedWithCombinationChain =
    v7.transformationReferenceAlignedWithCombinationEvidence &&
    conditionApplicability.decision ===
      'PARTIAL_CONDITION_APPLICABILITY_ONLY_RESULT_VERDICTS_BLOCKED' &&
    conditionApplicability.challengeSpecificConditionEvidenceAdapterAuthorized &&
    conditionApplicability.challengeTransformationStateEmissionAuthorized === false &&
    conditionEvidence.status === 'RESOLVED_CONDITION_EVIDENCE' &&
    conditionEvidence.upstreamI35ReportId === combinationDependencyEvidence.reportId &&
    conditionEvidence.upstreamI37ReportId === transformationReference.reportId &&
    conditionEvidence.upstreamI38ReviewId === conditionApplicability.reviewId &&
    conditionEvidence.challengeTransformationStateEmissionAuthorized === false &&
    conditionEvidence.combinationBindingStateEmissionAuthorized === false;

  const itemsByMechanism = new Map<string, ChallengeTargetCombinationConditionEvidenceItem[]>();
  if (conditionEvidenceAlignedWithCombinationChain) {
    for (const item of conditionEvidence.items) {
      const current = itemsByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      itemsByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = v7.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      context.dependency === 'MECHANISM_EFFECTIVE_FORCE_CONTEXT'
        ? refineConditionPolicy(
            context,
            conditionEvidenceAlignedWithCombinationChain,
            itemsByMechanism.get(mechanism.mechanism),
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V8_VERSION,
    upstreamReviewId: review.reviewId,
    upstreamAvailabilityV7ReportId: v7.reportId,
    forceEvidenceReportId: forceEvidence.reportId,
    rootEvidenceReportId: rootEvidence.reportId,
    relationEvidenceReportId: relationEvidence.reportId,
    clashDependencyEvidenceReportId: clashDependencyEvidence.reportId,
    combinationDependencyEvidenceReportId: combinationDependencyEvidence.reportId,
    transformationPolicyReviewId: transformationPolicy.reviewId,
    transformationReferenceReportId: transformationReference.reportId,
    conditionApplicabilityReviewId: conditionApplicability.reviewId,
    conditionEvidenceReportId: conditionEvidence.reportId,
    conditionEvidenceStatus: conditionEvidence.status,
    conditionEvidenceAlignedWithCombinationChain,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v8 consumes I39 only when the condition evidence is resolved and bound to the exact I35/I37/I38 chain already accepted by v7.',
      'Aligned I39 evidence replaces generic transformation-condition gaps with explicit condition-composition and three-combination adjacency, lead-out, clash-impact, and effective-bureau verdict policies where applicable.',
      'I39 evidence does not resolve seasonal-command effect, support/interference effect, competing-relation precedence, transformation target adoption, post-combination subject identity, or post-relation root state.',
      'Six-combination condition evidence retains the unresolved scope-mismatched convention and cannot produce a transformed element.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE and no mechanism becomes effectReady.',
      'No availability state is converted to transformation, binding, effective bureau, effective force, usefulness/harmfulness, points, confidence, or strong/weak classification.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v8_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
