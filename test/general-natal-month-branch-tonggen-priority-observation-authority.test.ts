import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-month-branch-tonggen-priority-observation-authority.js';
import {
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_AUTHORITY,
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DECISION,
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_OBSERVATIONS,
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SOURCE_TEXT,
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-month-branch-tonggen-priority-observation-authority.js';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
} from '../src/research/general-natal-geju-root-weight-classification-primitive-authority-review.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
} from '../src/research/general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
} from '../src/research/general-natal-sizhu-has-root-capacity-observation-authority.js';

describe('month-branch Tonggen priority source observation authority', () => {
  test('preserves exactly one immutable direct-source observation', () => {
    expect(GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DECISION).toBe(
      'AUTHORIZED_OBSERVATION_ONLY',
    );
    expect(GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_OBSERVATIONS).toHaveLength(1);
    expect(Object.isFrozen(GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_OBSERVATIONS)).toBe(true);
    expect(Object.isFrozen(GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_OBSERVATIONS[0])).toBe(true);
    expect(GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SOURCE_TEXT).toBe(
      '總之干多不如支重，而通根之中，尤以月令之支為最重也。',
    );
  });

  test('retains the exact Tonggen context and month-branch priority language', () => {
    const observation = GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_OBSERVATIONS[0];
    expect(observation.sourceContext).toBe('通根之中');
    expect(observation.sourcePriorityTarget).toBe('月令之支');
    expect(observation.sourcePriorityPhrase).toBe('尤以月令之支為最重');
    expect(observation.priorityObserved).toBe(true);
    expect(observation.executablePriorityEvaluatorAuthorized).toBe(false);
  });

  test('requires no canonical input and exports no executable chart evaluator', () => {
    expect(GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalInputRequired: false,
      chartFactsConsumed: false,
      monthBranchFactConsumed: false,
      rootWeightEvaluationConsumed: false,
      boundedTonggenEvaluationConsumed: false,
      sizhuHasRootObservationConsumed: false,
      status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY',
    });
    expect(Object.values(authorityModule).some((value) => typeof value === 'function')).toBe(false);
  });

  test('pins adjacent root/Tonggen authorities without consuming them', () => {
    const authority = GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_AUTHORITY;
    expect(authority.upstreamRootWeightReviewVersion).toBe(
      GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    );
    expect(authority.upstreamRootWeightReviewDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
    );
    expect(authority.upstreamBoundedTonggenVersion).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
    );
    expect(authority.upstreamBoundedTonggenDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
    );
    expect(authority.upstreamSizhuHasRootCapacityVersion).toBe(
      GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
    );
    expect(authority.upstreamSizhuHasRootCapacityDefinitionHash).toBe(
      GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
    );
  });

  test('keeps positional weighting, root resolution, strength, and production fail-closed', () => {
    const authority = GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_AUTHORITY;
    expect(authority.canonicalMonthBranchRootPriorityEvaluatorAuthorized).toBe(false);
    expect(authority.canonicalTonggenResolverAuthorized).toBe(false);
    expect(authority.canonicalSizhuHasRootResolverAuthorized).toBe(false);
    expect(authority.monthBranchAutomaticRootAuthorized).toBe(false);
    expect(authority.monthBranchAutomaticTonggenAuthorized).toBe(false);
    expect(authority.monthBranchTonggenGlobalStrongestAuthorized).toBe(false);
    expect(authority.monthBranchPositionNumericMultiplierAuthorized).toBe(false);
    expect(authority.monthBranchPositionNonNumericWeightAuthorized).toBe(false);
    expect(authority.monthBranchRootToDangZhongAuthorized).toBe(false);
    expect(authority.monthBranchRootToQiangAuthorized).toBe(false);
    expect(authority.monthBranchRootToBuRuoAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
    expect(GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_UNAUTHORIZED_DERIVATIONS).toContain(
      'month_branch_position_to_numeric_multiplier',
    );
    expect(GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_UNAUTHORIZED_DERIVATIONS).toContain(
      'bounded_tonggen_to_sizhu_has_root',
    );
  });
});
