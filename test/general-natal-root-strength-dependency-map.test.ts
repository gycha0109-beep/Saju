import { describe, expect, it } from 'vitest';
import {
  R121_AUTHORITY,
  R121_DISPOSITION_RULES,
  R121_ROOT_STRENGTH_DEPENDENCY_MAP_VERSION,
  R121_STRENGTH_DEPENDENCY_ROWS,
  R121_SUMMARY,
} from '../src/research/general-natal-root-strength-dependency-map.js';

describe('R121 root-strength dependency map', () => {
  it('publishes a bounded research dependency map rather than a strength resolver', () => {
    expect(R121_ROOT_STRENGTH_DEPENDENCY_MAP_VERSION).toBe('0.1.0-research');
    expect(R121_STRENGTH_DEPENDENCY_ROWS).toHaveLength(18);
    expect(new Set(R121_STRENGTH_DEPENDENCY_ROWS.map((row) => row.capabilityId)).size).toBe(18);
    expect(R121_AUTHORITY.finalQiangRuoClassifierAuthorized).toBe(false);
    expect(R121_AUTHORITY.canonicalSizhuRootResolverAuthorized).toBe(false);
  });

  it('does not let unresolved R011 block already bounded positive primitives', () => {
    const expectedIndependentOfR011 = [
      'MONTH_BRANCH_IMPORTANCE_IN_STRENGTH_CONTEXT',
      'TONGGEN_POSITIVE_BOUNDED_EVIDENCE',
      'TOUGAN_VS_TONGGEN_NON_EQUIVALENCE',
      'MUKU_NON_EARTH_POSITIVE_ROOT',
      'YUQI_NON_EARTH_POSITIVE_ROOT',
      'YANG_CHANGSHENG_POSITIVE_ROOT',
      'LU_WANG_BOUNDED_POSITIVES',
      'BIJIE_SUPPORT_CONSTITUENT',
      'DE_SHI_SHI_SHI_ANTI_DETERMINISM',
    ];

    for (const capabilityId of expectedIndependentOfR011) {
      const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
        (candidate) => candidate.capabilityId === capabilityId,
      );
      expect(row).toMatchObject({
        researchState: 'SUPPORTED_BOUNDED',
        disposition: 'AUTHORITY_REVIEW_REQUIRED',
        r011Required: false,
        handoff: 'AUTHORITY_BRIDGE',
      });
    }
  });

  it('limits R011 dependency to global root/absence and final-strength surfaces', () => {
    expect(R121_SUMMARY.r011RequiredRowIds).toEqual([
      'TONGGEN_GLOBAL_NEGATIVE_ABSENCE_RESOLVER',
      'CANONICAL_SIZHU_HAS_ROOT_RESOLVER',
      'FINAL_WHOLE_CHART_QIANG_RUO_CLASSIFIER',
    ]);

    for (const capabilityId of R121_SUMMARY.r011RequiredRowIds) {
      const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
        (candidate) => candidate.capabilityId === capabilityId,
      );
      expect(row).toMatchObject({
        disposition: 'BLOCKED_BY_R011',
        r011Required: true,
        r011NecessaryButNotSufficient: true,
        handoff: 'RESEARCH',
      });
    }
  });

  it('preserves other research blockers independently of R011', () => {
    const blockedElsewhere = [
      'MUKU_YIN_EARTH_UNIVERSAL_TREATMENT',
      'YUQI_TEMPORAL_WEIGHT_OR_CLASSIFIER',
      'YIN_CHANGSHENG_UNIVERSAL_ROOT',
      'SUPPORT_AGGREGATION_DANGZHONG_ZHUGUA',
    ];

    for (const capabilityId of blockedElsewhere) {
      const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
        (candidate) => candidate.capabilityId === capabilityId,
      );
      expect(row?.disposition).toBe('BLOCKED_BY_OTHER_RESEARCH');
      expect(row?.r011Required).toBe(false);
      expect(row?.otherResearchDependencies.length).toBeGreaterThan(0);
    }
  });

  it('does not silently bridge separate Twelve-Growth and root-class authorities', () => {
    const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
      (candidate) =>
        candidate.capabilityId === 'LINGUAN_LU_DIWANG_WANG_UNIVERSAL_BRIDGE',
    );
    expect(row).toMatchObject({
      researchState: 'NOT_SUPPORTED',
      disposition: 'NOT_AUTHORIZED',
      r011Required: false,
      handoff: 'NONE',
    });
    expect(row?.prohibitedExtensions).toContain(
      'LINGUAN_EQUALS_LU_EXECUTABLE_BRIDGE',
    );
    expect(row?.prohibitedExtensions).toContain(
      'DIWANG_EQUALS_WANG_EXECUTABLE_BRIDGE',
    );
  });

  it('rejects a universal numeric strength score regardless of R011 closure', () => {
    const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
      (candidate) => candidate.capabilityId === 'UNIVERSAL_NUMERIC_STRENGTH_SCORE',
    );
    expect(row).toMatchObject({
      researchState: 'NOT_SUPPORTED',
      disposition: 'NOT_AUTHORIZED',
      r011Required: false,
      handoff: 'NONE',
    });
    expect(R121_AUTHORITY.numericStrengthScoreAuthorized).toBe(false);
  });

  it('routes evidence-sufficient research primitives to Authority Bridge before Engine', () => {
    expect(R121_SUMMARY.authorityReviewRowIds).toHaveLength(9);
    expect(R121_SUMMARY.engineImplementationGapRowIds).toEqual([]);
    expect(R121_DISPOSITION_RULES).toContain(
      'RESEARCH_SUPPORTED_DOES_NOT_EQUAL_ENGINE_IMPLEMENTATION_GAP_UNTIL_AUTHORITY_ADMISSION_EXISTS',
    );
    expect(R121_DISPOSITION_RULES).toContain(
      'AUTHORITY_REVIEW_REQUIRED_PRECEDES_ENGINE_HANDOFF_FOR_RESEARCH_ONLY_PRIMITIVES',
    );
    expect(R121_AUTHORITY.researchSupportAutoCreatesEngineImplementationGap).toBe(false);
  });

  it('keeps final whole-chart strength blocked by multiple dependencies, not R011 alone', () => {
    const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
      (candidate) =>
        candidate.capabilityId === 'FINAL_WHOLE_CHART_QIANG_RUO_CLASSIFIER',
    );
    expect(row?.r011NecessaryButNotSufficient).toBe(true);
    expect(row?.otherResearchDependencies).toContain(
      'CANONICAL_SIZHU_HAS_ROOT_RESOLVER',
    );
    expect(row?.otherResearchDependencies).toContain(
      'SUPPORT_AGGREGATION_DANGZHONG_ZHUGUA',
    );
    expect(row?.otherResearchDependencies).toContain(
      'METHODOLOGY_COMPOSITION_AUTHORITY',
    );
    expect(R121_AUTHORITY.r011ClosureSufficientForFinalStrength).toBe(false);
  });

  it('preserves the research-only authority boundary', () => {
    expect(R121_AUTHORITY).toEqual({
      status: 'RESEARCH_DEPENDENCY_MAP_CANDIDATE',
      researchOnly: true,
      r011BlocksAllStrengthReasoning: false,
      r011ClosureSufficientForFinalStrength: false,
      boundedPositivePrimitivesMayProceedToAuthorityReview: true,
      researchSupportAutoAdmitsEngineRule: false,
      researchSupportAutoCreatesEngineImplementationGap: false,
      globalNegativeTonggenResolverAuthorized: false,
      canonicalSizhuRootResolverAuthorized: false,
      finalQiangRuoClassifierAuthorized: false,
      numericStrengthScoreAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
