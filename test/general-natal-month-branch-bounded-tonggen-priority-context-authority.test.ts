import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-month-branch-bounded-tonggen-priority-context-authority.js';
import {
  evaluateCanonicalMonthBranchBoundedTonggenPriorityContext,
  GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_AUTHORITY,
  GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_DECISION,
  GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_SOURCE_TEXT,
  GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-month-branch-bounded-tonggen-priority-context-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
} from '../src/research/general-natal-muku-yuqi-light-root-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
} from '../src/research/general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DEFINITION_HASH,
  GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_VERSION,
} from '../src/research/general-natal-month-branch-tonggen-priority-observation-authority.js';
import type { EarthlyBranch, FiveElement } from '../src/contracts/calculation.js';

const positiveCases: readonly {
  element: Exclude<FiveElement, '토'>;
  branch: EarthlyBranch;
  sourceRootKind: '墓庫' | '餘氣';
}[] = [
  { element: '목', branch: '미', sourceRootKind: '墓庫' },
  { element: '목', branch: '진', sourceRootKind: '餘氣' },
  { element: '화', branch: '술', sourceRootKind: '墓庫' },
  { element: '화', branch: '미', sourceRootKind: '餘氣' },
  { element: '금', branch: '축', sourceRootKind: '墓庫' },
  { element: '금', branch: '술', sourceRootKind: '餘氣' },
  { element: '수', branch: '진', sourceRootKind: '墓庫' },
  { element: '수', branch: '축', sourceRootKind: '餘氣' },
];

describe('canonical month-branch bounded Tonggen priority context authority', () => {
  test('authorizes only the bounded research bridge and preserves the exact source phrase', () => {
    expect(GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_SOURCE_TEXT).toBe(
      '總之干多不如支重，而通根之中，尤以月令之支為最重也。',
    );
  });

  test.each(positiveCases)(
    '$element + canonical month branch $branch admits only bounded priority-context evidence',
    ({ element, branch, sourceRootKind }) => {
      const result = evaluateCanonicalMonthBranchBoundedTonggenPriorityContext(
        { element },
        branch,
      );

      expect(result).toEqual({
        state: 'month_branch_bounded_tonggen_priority_context_observed',
        element,
        monthBranch: branch,
        upstreamTonggenState: 'bounded_tonggen_observed',
        sourceRootKind,
        sourceContext: '通根之中',
        sourcePriorityTarget: '月令之支',
        sourcePriorityPhrase: '尤以月令之支為最重',
        monthBranchTonggenObserved: true,
        priorityContextObserved: true,
        numericWeightAssigned: false,
        nonNumericScalarAssigned: false,
        chartComparisonPerformed: false,
        dangZhongEstablished: false,
        qiangRuoEstablished: false,
        wangShuaiEstablished: false,
        authority: 'research_only',
      });
    },
  );

  test('a nonmatching canonical month branch emits no evidence rather than a negative root verdict', () => {
    const result = evaluateCanonicalMonthBranchBoundedTonggenPriorityContext(
      { element: '목' },
      '자',
    );

    expect(result.state).toBe('no_month_branch_bounded_tonggen_priority_evidence');
    expect(result.upstreamTonggenState).toBe('no_bounded_tonggen_evidence');
    expect(result.sourceRootKind).toBeNull();
    expect(result.monthBranchTonggenObserved).toBe(false);
    expect(result.priorityContextObserved).toBe(false);
    expect(result.numericWeightAssigned).toBe(false);
    expect(result.nonNumericScalarAssigned).toBe(false);
    expect(result.chartComparisonPerformed).toBe(false);
  });

  test.each(['자', '진', '미', '술'] as const)(
    'Earth + canonical month branch %s remains unresolved',
    (branch) => {
      const result = evaluateCanonicalMonthBranchBoundedTonggenPriorityContext(
        { element: '토' },
        branch,
      );

      expect(result.state).toBe('unresolved_outside_governed_month_branch_tonggen_scope');
      expect(result.upstreamTonggenState).toBe('unresolved_outside_governed_tonggen_scope');
      expect(result.monthBranchTonggenObserved).toBe(false);
      expect(result.priorityContextObserved).toBe(false);
    },
  );

  test('exposes only a month-specific two-input evaluator, not an arbitrary precomputed Tonggen bridge', () => {
    const exportedFunctions = Object.entries(authorityModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([key]) => key);

    expect(exportedFunctions).toEqual([
      'evaluateCanonicalMonthBranchBoundedTonggenPriorityContext',
    ]);
    expect(evaluateCanonicalMonthBranchBoundedTonggenPriorityContext.length).toBe(2);
    expect(
      GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_AUTHORITY
        .arbitraryPrecomputedTonggenEvaluationAccepted,
    ).toBe(false);
    expect(
      GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_UNAUTHORIZED_DERIVATIONS,
    ).toContain('arbitrary_precomputed_tonggen_to_month_provenance');
  });

  test('pins the exact upstream root, bounded Tonggen, and source-priority authorities', () => {
    const authority = GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_AUTHORITY;
    expect(authority.upstreamLightRootVersion).toBe(GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION);
    expect(authority.upstreamLightRootDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
    );
    expect(authority.upstreamBoundedTonggenVersion).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
    );
    expect(authority.upstreamBoundedTonggenDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
    );
    expect(authority.upstreamMonthBranchPriorityVersion).toBe(
      GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_VERSION,
    );
    expect(authority.upstreamMonthBranchPriorityDefinitionHash).toBe(
      GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DEFINITION_HASH,
    );
  });

  test('keeps weighting, generalized resolvers, strength, Gyeokguk, and Production fail-closed', () => {
    const authority = GENERAL_NATAL_MONTH_BRANCH_BOUNDED_TONGGEN_PRIORITY_CONTEXT_AUTHORITY;
    expect(authority.yearDayHourPriorityMatcherAuthorized).toBe(false);
    expect(authority.canonicalMonthBranchRootPriorityEvaluatorAuthorized).toBe(false);
    expect(authority.generalizedRootPositionRankingAuthorized).toBe(false);
    expect(authority.numericRootPositionWeightAuthorized).toBe(false);
    expect(authority.nonNumericRootPositionScalarAuthorized).toBe(false);
    expect(authority.canonicalTonggenResolverAuthorized).toBe(false);
    expect(authority.canonicalSizhuHasRootResolverAuthorized).toBe(false);
    expect(authority.monthBranchTonggenToDangZhongAuthorized).toBe(false);
    expect(authority.monthBranchTonggenToQiangAuthorized).toBe(false);
    expect(authority.monthBranchTonggenToBuRuoAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
