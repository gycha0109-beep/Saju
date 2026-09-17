import { describe, expect, test } from 'vitest';
import type { EarthlyBranch, StemFact } from '../src/contracts/calculation.js';
import * as authorityModule from '../src/research/general-natal-jia-yi-wood-bounded-root-presence-authority.js';
import {
  evaluateJiaYiWoodBoundedRootPresenceEvidence,
  GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_AUTHORITY,
  GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_DECISION,
  GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SOURCE_OBSERVATIONS,
  GENERAL_NATAL_JIA_YI_WOOD_EXPLICIT_ROOT_BRANCH_DISPOSITION,
  GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-jia-yi-wood-bounded-root-presence-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
} from '../src/research/general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';
import {
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH,
  GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
} from '../src/research/general-natal-yin-changsheng-minggen-source-strata-conflict-authority.js';
import {
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION,
} from '../src/research/general-natal-root-term-binding-authority.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_VERSION,
} from '../src/research/general-natal-bounded-sizhu-root-presence-completeness-authority-review.js';

const JIA = Object.freeze({ value: '갑', yinYang: '양', element: '목' }) satisfies Pick<
  StemFact,
  'value' | 'yinYang' | 'element'
>;
const YI = Object.freeze({ value: '을', yinYang: '음', element: '목' }) satisfies Pick<
  StemFact,
  'value' | 'yinYang' | 'element'
>;
const BING = Object.freeze({ value: '병', yinYang: '양', element: '화' }) satisfies Pick<
  StemFact,
  'value' | 'yinYang' | 'element'
>;

const WOOD_ROOT_BRANCHES = ['인', '묘', '해', '진', '미'] as const satisfies readonly EarthlyBranch[];

function woodObservations(
  evaluation: ReturnType<typeof evaluateJiaYiWoodBoundedRootPresenceEvidence>,
) {
  return evaluation.observations.filter(
    (observation) =>
      observation.sourceRootKind === 'selected_source_explicit_wood_root_presence',
  );
}

describe('Jia/Yi Wood bounded root-presence authority', () => {
  test('records the exact selected-source root context and Wood branch-set statement', () => {
    expect(GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_SOURCE_OBSERVATIONS).toEqual([
      {
        id: 'root_classes_context',
        observation: '天干通根，不僅祿旺為美，長生、餘氣、墓庫皆其根也。',
        authority: 'direct_selected_source_root_context',
      },
      {
        id: 'jia_yi_wood_explicit_root_set',
        observation: '如甲乙木見寅卯，固為身旺，而見亥辰未，亦為有根也。',
        authority: 'direct_selected_source_stem_group_branch_set',
      },
    ]);
  });

  test('freezes the exact source-language disposition split', () => {
    expect(GENERAL_NATAL_JIA_YI_WOOD_EXPLICIT_ROOT_BRANCH_DISPOSITION).toEqual({
      인: 'source_describes_shen_wang',
      묘: 'source_describes_shen_wang',
      해: 'source_describes_you_gen',
      진: 'source_describes_you_gen',
      미: 'source_describes_you_gen',
    });
  });

  for (const [stemName, dayMaster] of [
    ['甲', JIA],
    ['乙', YI],
  ] as const) {
    for (const branch of WOOD_ROOT_BRANCHES) {
      test(`${stemName} + ${branch} emits source-native positive root evidence`, () => {
        const evaluation = evaluateJiaYiWoodBoundedRootPresenceEvidence(dayMaster, {
          year: branch,
        });
        const observations = woodObservations(evaluation);

        expect(evaluation.state).toBe(
          'bounded_positive_root_presence_for_sizhu_context_observed',
        );
        expect(evaluation.rootPresenceObserved).toBe(true);
        expect(evaluation.jiaYiWoodEvidenceObserved).toBe(true);
        expect(observations).toEqual([
          {
            pillarSlot: 'year',
            branch,
            sourceRootKind: 'selected_source_explicit_wood_root_presence',
            sourceStemScope: '甲乙木',
            sourceDisposition:
              GENERAL_NATAL_JIA_YI_WOOD_EXPLICIT_ROOT_BRANCH_DISPOSITION[branch],
            authority: 'research_only',
          },
        ]);
      });
    }
  }

  test('乙+寅 becomes positive without assigning a Lu class', () => {
    const evaluation = evaluateJiaYiWoodBoundedRootPresenceEvidence(YI, { day: '인' });

    expect(evaluation.upstreamBoundedEvidenceObserved).toBe(false);
    expect(evaluation.jiaYiWoodEvidenceObserved).toBe(true);
    expect(evaluation.yiYinPositiveObservedWithoutLuClassAssignment).toBe(true);
    expect(evaluation.observations.some((observation) => observation.sourceRootKind === '祿')).toBe(
      false,
    );
  });

  test('乙+亥 becomes positive without assigning a Changsheng class', () => {
    const evaluation = evaluateJiaYiWoodBoundedRootPresenceEvidence(YI, { hour: '해' });

    expect(evaluation.upstreamBoundedEvidenceObserved).toBe(false);
    expect(evaluation.jiaYiWoodEvidenceObserved).toBe(true);
    expect(evaluation.yiHaiPositiveObservedWithoutChangshengClassAssignment).toBe(true);
    expect(
      evaluation.observations.some((observation) => observation.sourceRootKind === '長生'),
    ).toBe(false);
  });

  test('other 乙 branches produce no Wood-set positive and never become no-root', () => {
    const evaluation = evaluateJiaYiWoodBoundedRootPresenceEvidence(YI, { month: '자' });

    expect(woodObservations(evaluation)).toEqual([]);
    expect(evaluation.jiaYiWoodEvidenceObserved).toBe(false);
    expect(evaluation.rootPresenceObserved).toBe(false);
    expect(evaluation.state).toBe('no_bounded_root_presence_evidence');
    expect(evaluation.sizhuHasRootSettled).toBe(false);
    expect(evaluation.absenceMeansNoRoot).toBe(false);
  });

  test('non-Jia/Yi stems add no Wood-set observation while upstream evidence is preserved', () => {
    const evaluation = evaluateJiaYiWoodBoundedRootPresenceEvidence(BING, { year: '인' });

    expect(woodObservations(evaluation)).toEqual([]);
    expect(evaluation.jiaYiWoodEvidenceObserved).toBe(false);
    expect(evaluation.upstreamBoundedEvidenceObserved).toBe(true);
    expect(evaluation.rootPresenceObserved).toBe(true);
  });

  test('partial pillar maps preserve explicit provenance and do not imply negative omitted pillars', () => {
    const evaluation = evaluateJiaYiWoodBoundedRootPresenceEvidence(YI, {
      month: '인',
      hour: '해',
    });

    expect(woodObservations(evaluation)).toEqual([
      {
        pillarSlot: 'month',
        branch: '인',
        sourceRootKind: 'selected_source_explicit_wood_root_presence',
        sourceStemScope: '甲乙木',
        sourceDisposition: 'source_describes_shen_wang',
        authority: 'research_only',
      },
      {
        pillarSlot: 'hour',
        branch: '해',
        sourceRootKind: 'selected_source_explicit_wood_root_presence',
        sourceStemScope: '甲乙木',
        sourceDisposition: 'source_describes_you_gen',
        authority: 'research_only',
      },
    ]);
    expect(evaluation.absenceMeansNoRoot).toBe(false);
    expect(evaluation.observationCountSemanticsAssigned).toBe(false);
    expect(evaluation.positionWeightAssigned).toBe(false);
  });

  test('pins exact upstream authority versions and definition hashes', () => {
    const authority = GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_AUTHORITY;

    expect(authority.upstreamBoundedSizhuVersion).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_VERSION,
    );
    expect(authority.upstreamBoundedSizhuDefinitionHash).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_DEFINITION_HASH,
    );
    expect(authority.upstreamYinChangshengConflictVersion).toBe(
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_VERSION,
    );
    expect(authority.upstreamYinChangshengConflictDefinitionHash).toBe(
      GENERAL_NATAL_YIN_CHANGSHENG_MINGGEN_SOURCE_STRATA_CONFLICT_DEFINITION_HASH,
    );
    expect(authority.upstreamLuLinguanVersion).toBe(
      GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_VERSION,
    );
    expect(authority.upstreamLuLinguanDefinitionHash).toBe(
      GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_DEFINITION_HASH,
    );
    expect(authority.upstreamCompletenessReviewVersion).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_VERSION,
    );
    expect(authority.upstreamCompletenessReviewDefinitionHash).toBe(
      GENERAL_NATAL_BOUNDED_SIZHU_ROOT_PRESENCE_COMPLETENESS_REVIEW_DEFINITION_HASH,
    );
  });

  test('keeps Yin Lu and Yin Changsheng class boundaries unresolved', () => {
    const authority = GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_AUTHORITY;

    expect(authority.yiYinPositiveRootPresenceAuthorizedWithoutLuClassAssignment).toBe(true);
    expect(authority.yiHaiPositiveRootPresenceAuthorizedWithoutChangshengClassAssignment).toBe(
      true,
    );
    expect(authority.yiYinLuClassAssigned).toBe(false);
    expect(authority.yiHaiChangshengClassAssigned).toBe(false);
    expect(authority.sourceInternalYinLuInterpretation).toBe('AMBIGUOUS');
    expect(authority.yinLuAmbiguityResolved).toBe(false);
    expect(authority.yinChangshengSourceStrataResolutionState).toBe('UNRESOLVED');
    expect(authority.yinChangshengSourceStrataResolved).toBe(false);
    expect(authority.foreignTwelveGrowthMappingConsumed).toBe(false);
    expect(authority.hiddenStemOrderConsumed).toBe(false);
  });

  test('exports only the intended executable evaluator', () => {
    const exportedFunctions = Object.entries(authorityModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name);

    expect(exportedFunctions).toEqual(['evaluateJiaYiWoodBoundedRootPresenceEvidence']);
  });

  test('keeps Sizhu settlement, absence, weighting, strength, Gyeokguk and Production fail-closed', () => {
    const authority = GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_AUTHORITY;

    expect(authority.canonicalSizhuHasRootResolverAuthorized).toBe(false);
    expect(authority.rootEvidenceToSizhuHasRootSettlementAuthorized).toBe(false);
    expect(authority.noBoundedEvidenceToSizhuNoRootAuthorized).toBe(false);
    expect(authority.rootObservationCountSemanticsAuthorized).toBe(false);
    expect(authority.rootPositionWeightingAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
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
    expect(authority.nextProductionSku).toBe('NONE');
    expect(authority.commerce).toBe('HOLD');
  });

  test('explicitly forbids class invention and settlement escalation', () => {
    expect(GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'yi_yin_to_yi_lu',
    );
    expect(GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'yi_hai_to_yi_changsheng',
    );
    expect(GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'wood_you_gen_source_phrase_to_canonical_sizhu_has_root_true',
    );
    expect(GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'zero_wood_set_observations_to_sizhu_no_root',
    );
    expect(GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE_UNAUTHORIZED_DERIVATIONS).toContain(
      'root_presence_to_production_fact',
    );
  });
});