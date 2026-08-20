import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  RootPositionRelationReview,
  RootRelationEffectReviewReport,
  RootRelationReviewRequirement,
} from './i18d-root-relation-review.js';

export const I19_POST_RELATION_ROOT_EFFECT_REVIEW_VERSION =
  'myeonghwa-post-relation-root-effect-review-v1';

export type RootEffectReviewState =
  | 'NO_TRACKED_RELATION_CANDIDATE'
  | 'UNRESOLVED_CLASH_RELATIVE_FORCE'
  | 'UNRESOLVED_COMBINATION_CONDITIONS'
  | 'UNRESOLVED_MULTIPLE_RELATIONS'
  | 'INPUT_INDETERMINATE';

export type RootEffectDependency =
  | 'RELATIVE_BRANCH_FORCE'
  | 'SEASONAL_COMMAND_CONTEXT'
  | 'EXTERNAL_SUPPORT_RESCUE'
  | 'COMBINATION_TRANSFORMATION_CONDITIONS'
  | 'COMPETING_RELATION_PRECEDENCE'
  | 'SCENARIO_MATERIALIZATION';

export interface RootEffectMethodologyReviewItem {
  position: RootPositionRelationReview['position'];
  branch: RootPositionRelationReview['branch'];
  state: RootEffectReviewState;
  requirements: readonly RootRelationReviewRequirement[];
  dependencies: readonly RootEffectDependency[];
  effectiveRootState: 'not_determined';
  finalEffectAuthorized: false;
  numericWeight: 'not_assigned';
}

export interface PostRelationRootEffectReviewReport {
  reviewId: string;
  reviewVersion: string;
  upstreamReviewId: string;
  upstreamStatus: RootRelationEffectReviewReport['status'];
  terminalDecision:
    | 'ROOT_EFFECT_RESOLUTION_BLOCKED_BY_PRECLASSIFICATION_DEPENDENCIES'
    | 'INPUT_INDETERMINATE';
  items: readonly RootEffectMethodologyReviewItem[];
  preClassificationDependencyRequired: boolean;
  circularityRiskDetected: boolean;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    finding: string;
  }[];
  notes: readonly string[];
}

export const I19_ROOT_EFFECT_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-I19-DITIANSUI-ORIGINAL-WIKISOURCE',
    finding:
      'Clash effect is conditional on relative flourishing/decline: a flourishing side can uproot a declining side, while a declining side clashing with a flourishing side can instead stimulate the flourishing side.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    finding:
      'Root uprooting under clash is context-dependent; season, additional roots, peer support, and surrounding force can change whether a clash damages the root.',
  },
  {
    sourceId: 'SRC-I19-DITIANSUI-ZHANHE-WIKISOURCE',
    finding:
      'Combination can help, restrain, settle a clash, or alter flow depending on context; combination presence is not itself proof of transformation or beneficial effect.',
  },
] as const);

function dependenciesFor(requirements: readonly RootRelationReviewRequirement[]): readonly RootEffectDependency[] {
  const dependencies = new Set<RootEffectDependency>();

  if (requirements.includes('CLASH_EFFECT_REVIEW_REQUIRED')) {
    dependencies.add('RELATIVE_BRANCH_FORCE');
    dependencies.add('SEASONAL_COMMAND_CONTEXT');
    dependencies.add('EXTERNAL_SUPPORT_RESCUE');
  }

  if (
    requirements.includes('SIX_COMBINATION_EFFECT_REVIEW_REQUIRED') ||
    requirements.includes('THREE_COMBINATION_EFFECT_REVIEW_REQUIRED')
  ) {
    dependencies.add('COMBINATION_TRANSFORMATION_CONDITIONS');
    dependencies.add('COMPETING_RELATION_PRECEDENCE');
    dependencies.add('SEASONAL_COMMAND_CONTEXT');
  }

  return [...dependencies].sort();
}

function stateFor(requirements: readonly RootRelationReviewRequirement[]): RootEffectReviewState {
  if (requirements.length === 0) return 'NO_TRACKED_RELATION_CANDIDATE';

  const clash = requirements.includes('CLASH_EFFECT_REVIEW_REQUIRED');
  const combination =
    requirements.includes('SIX_COMBINATION_EFFECT_REVIEW_REQUIRED') ||
    requirements.includes('THREE_COMBINATION_EFFECT_REVIEW_REQUIRED');

  if (clash && combination) return 'UNRESOLVED_MULTIPLE_RELATIONS';
  if (clash) return 'UNRESOLVED_CLASH_RELATIVE_FORCE';
  return 'UNRESOLVED_COMBINATION_CONDITIONS';
}

function itemFor(root: RootPositionRelationReview): RootEffectMethodologyReviewItem {
  return {
    position: root.position,
    branch: root.branch,
    state: stateFor(root.reviewRequirements),
    requirements: [...root.reviewRequirements],
    dependencies: dependenciesFor(root.reviewRequirements),
    effectiveRootState: 'not_determined',
    finalEffectAuthorized: false,
    numericWeight: 'not_assigned',
  };
}

function finalized(
  material: Omit<PostRelationRootEffectReviewReport, 'reviewId'>,
): PostRelationRootEffectReviewReport {
  return {
    reviewId: `post_relation_root_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI19PostRelationRootEffectReview(
  upstream: RootRelationEffectReviewReport,
): PostRelationRootEffectReviewReport {
  if (upstream.status !== 'RESOLVED_BASIS_ROUTED') {
    return finalized({
      reviewVersion: I19_POST_RELATION_ROOT_EFFECT_REVIEW_VERSION,
      upstreamReviewId: upstream.reviewId,
      upstreamStatus: upstream.status,
      terminalDecision: 'INPUT_INDETERMINATE',
      items: [],
      preClassificationDependencyRequired: true,
      circularityRiskDetected: false,
      classificationAuthorized: false,
      numericScoringAuthorized: false,
      sourceBasis: I19_ROOT_EFFECT_SOURCE_BASIS,
      notes: [
        'Relation-effect review requires a materialized resolved scenario or resolved base snapshot.',
        'No root effect is inferred from an unresolved base snapshot.',
      ],
    });
  }

  const items = upstream.rootPositions.map(itemFor);
  const hasClashDependency = items.some((item) =>
    item.dependencies.includes('RELATIVE_BRANCH_FORCE'),
  );
  const hasUnresolvedRelation = items.some((item) => item.requirements.length > 0);

  return finalized({
    reviewVersion: I19_POST_RELATION_ROOT_EFFECT_REVIEW_VERSION,
    upstreamReviewId: upstream.reviewId,
    upstreamStatus: upstream.status,
    terminalDecision: 'ROOT_EFFECT_RESOLUTION_BLOCKED_BY_PRECLASSIFICATION_DEPENDENCIES',
    items,
    preClassificationDependencyRequired: hasUnresolvedRelation,
    circularityRiskDetected: hasClashDependency,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    sourceBasis: I19_ROOT_EFFECT_SOURCE_BASIS,
    notes: [
      'Clash presence alone cannot establish root disruption because the cited methodology makes the result depend on relative force, season, and surrounding support.',
      'Combination presence alone cannot establish transformation, preservation, strengthening, or neutralization.',
      'Using a final strength classifier to resolve these dependencies would create circular reasoning because post-relation root state is itself intended as an input to strength classification.',
      'A root with no tracked relation candidate is not automatically declared preserved; it only has no tracked relation candidate in the current structural router.',
    ],
  });
}
