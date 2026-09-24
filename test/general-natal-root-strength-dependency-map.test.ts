import { describe, expect, it } from 'vitest';
import {
  R121_AUTHORITY,
  R121_DISPOSITION_RULES,
  R121_ROOT_STRENGTH_DEPENDENCY_MAP_VERSION,
  R121_STRENGTH_DEPENDENCY_ROWS,
  R121_SUMMARY,
} from '../src/research/general-natal-root-strength-dependency-map.js';

describe('R121 root-strength dependency map after R011 closure', () => {
  it('publishes the post-R011 dependency map without creating a strength resolver', () => {
    expect(R121_ROOT_STRENGTH_DEPENDENCY_MAP_VERSION).toBe('0.2.0-research');
    expect(R121_STRENGTH_DEPENDENCY_ROWS).toHaveLength(18);
    expect(new Set(R121_STRENGTH_DEPENDENCY_ROWS.map((row) => row.capabilityId)).size).toBe(18);
    expect(R121_AUTHORITY.r011DirectVisualClosureComplete).toBe(true);
    expect(R121_AUTHORITY.finalQiangRuoClassifierAuthorized).toBe(false);
    expect(R121_AUTHORITY.canonicalSizhuRootResolverAuthorized).toBe(false);
  });

  it('keeps nine bounded primitives independent of R011 and routed to Authority Bridge', () => {
    const expected = [
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

    expect(R121_SUMMARY.authorityReviewRowIds).toEqual(expected);
    for (const capabilityId of expected) {
      const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
        (candidate) => candidate.capabilityId === capabilityId,
      );
      expect(row).toMatchObject({
        researchState: 'SUPPORTED_BOUNDED',
        disposition: 'AUTHORITY_REVIEW_REQUIRED',
        r011Dependency: 'NOT_REQUIRED',
        r011NecessaryButNotSufficient: false,
        handoff: 'AUTHORITY_BRIDGE',
      });
    }
  });

  it('records R011 as a satisfied prerequisite for three global surfaces', () => {
    expect(R121_SUMMARY.r011SatisfiedPrerequisiteRowIds).toEqual([
      'TONGGEN_GLOBAL_NEGATIVE_ABSENCE_RESOLVER',
      'CANONICAL_SIZHU_HAS_ROOT_RESOLVER',
      'FINAL_WHOLE_CHART_QIANG_RUO_CLASSIFIER',
    ]);
    expect(R121_SUMMARY.currentlyBlockedByR011RowIds).toEqual([]);

    for (const capabilityId of R121_SUMMARY.r011SatisfiedPrerequisiteRowIds) {
      const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
        (candidate) => candidate.capabilityId === capabilityId,
      );
      expect(row).toMatchObject({
        disposition: 'BLOCKED_BY_OTHER_RESEARCH',
        r011Dependency: 'SATISFIED_PREREQUISITE',
        r011NecessaryButNotSufficient: true,
        handoff: 'RESEARCH',
      });
      expect(row?.evidenceRefs).toContain(
        'commit:0eaf5eae84aebfde142d68651418537ffe620098',
      );
    }
  });

  it('keeps the remaining research blockers explicit after R011 closure', () => {
    expect(R121_SUMMARY.blockedByOtherResearchRowIds).toEqual([
      'TONGGEN_GLOBAL_NEGATIVE_ABSENCE_RESOLVER',
      'MUKU_YIN_EARTH_UNIVERSAL_TREATMENT',
      'YUQI_TEMPORAL_WEIGHT_OR_CLASSIFIER',
      'YIN_CHANGSHENG_UNIVERSAL_ROOT',
      'SUPPORT_AGGREGATION_DANGZHONG_ZHUGUA',
      'CANONICAL_SIZHU_HAS_ROOT_RESOLVER',
      'FINAL_WHOLE_CHART_QIANG_RUO_CLASSIFIER',
    ]);

    for (const capabilityId of R121_SUMMARY.blockedByOtherResearchRowIds) {
      const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
        (candidate) => candidate.capabilityId === capabilityId,
      );
      expect(row?.otherResearchDependencies.length).toBeGreaterThan(0);
    }
  });

  it('does not silently bridge Twelve-Growth stages to root-class authority', () => {
    const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
      (candidate) =>
        candidate.capabilityId === 'LINGUAN_LU_DIWANG_WANG_UNIVERSAL_BRIDGE',
    );
    expect(row).toMatchObject({
      researchState: 'NOT_SUPPORTED',
      disposition: 'NOT_AUTHORIZED',
      r011Dependency: 'NOT_REQUIRED',
      handoff: 'NONE',
    });
    expect(row?.prohibitedExtensions).toContain(
      'LINGUAN_EQUALS_LU_EXECUTABLE_BRIDGE',
    );
    expect(row?.prohibitedExtensions).toContain(
      'DIWANG_EQUALS_WANG_EXECUTABLE_BRIDGE',
    );
  });

  it('rejects universal numeric strength regardless of R011 closure', () => {
    const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
      (candidate) => candidate.capabilityId === 'UNIVERSAL_NUMERIC_STRENGTH_SCORE',
    );
    expect(row).toMatchObject({
      researchState: 'NOT_SUPPORTED',
      disposition: 'NOT_AUTHORIZED',
      r011Dependency: 'NOT_REQUIRED',
      handoff: 'NONE',
    });
    expect(R121_AUTHORITY.numericStrengthScoreAuthorized).toBe(false);
  });

  it('keeps zero pure Engine implementation gaps before Authority admission', () => {
    expect(R121_SUMMARY.engineImplementationGapRowIds).toEqual([]);
    expect(R121_DISPOSITION_RULES).toContain(
      'RESEARCH_SUPPORTED_DOES_NOT_EQUAL_ENGINE_IMPLEMENTATION_GAP_UNTIL_AUTHORITY_ADMISSION_EXISTS',
    );
    expect(R121_DISPOSITION_RULES).toContain(
      'AUTHORITY_REVIEW_REQUIRED_PRECEDES_ENGINE_HANDOFF_FOR_RESEARCH_ONLY_PRIMITIVES',
    );
    expect(R121_AUTHORITY.researchSupportAutoCreatesEngineImplementationGap).toBe(false);
  });

  it('keeps global negative Tonggen unresolved despite R011 closure', () => {
    const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
      (candidate) =>
        candidate.capabilityId === 'TONGGEN_GLOBAL_NEGATIVE_ABSENCE_RESOLVER',
    );
    expect(row?.otherResearchDependencies).toContain(
      'GLOBAL_NEGATIVE_SEMANTICS_BEYOND_BOUNDED_EXCLUSIONS',
    );
    expect(row?.otherResearchDependencies).toContain(
      'YIN_AND_EARTH_ROOT_SCOPE_GAPS',
    );
    expect(row?.prohibitedExtensions).toContain(
      'R011_CLOSURE_EQUALS_GLOBAL_NEGATIVE_RESOLVER',
    );
    expect(R121_AUTHORITY.r011ClosureSufficientForGlobalNegativeRootResolver).toBe(false);
  });

  it('keeps final whole-chart strength blocked by non-R011 dependencies', () => {
    const row = R121_STRENGTH_DEPENDENCY_ROWS.find(
      (candidate) =>
        candidate.capabilityId === 'FINAL_WHOLE_CHART_QIANG_RUO_CLASSIFIER',
    );
    expect(row?.otherResearchDependencies).toContain(
      'CANONICAL_SIZHU_HAS_ROOT_RESOLVER',
    );
    expect(row?.otherResearchDependencies).toContain(
      'SUPPORT_AGGREGATION_DANGZHONG_ZHUGUA',
    );
    expect(row?.otherResearchDependencies).toContain(
      'METHODOLOGY_COMPOSITION_AUTHORITY',
    );
    expect(row?.otherResearchDependencies).toContain(
      'CROSS_SCHOOL_TEXTUAL_DEPENDENCY_RISK',
    );
    expect(row?.prohibitedExtensions).toContain(
      'R011_CLOSURE_EQUALS_FINAL_STRENGTH_CLASSIFIER',
    );
    expect(R121_AUTHORITY.r011ClosureSufficientForFinalStrength).toBe(false);
  });

  it('preserves the exact post-R011 research-only authority boundary', () => {
    expect(R121_AUTHORITY).toEqual({
      status: 'RESEARCH_DEPENDENCY_MAP_CANDIDATE_POST_R011_CLOSURE',
      researchOnly: true,
      r011ClosureMergeSha:
        '0eaf5eae84aebfde142d68651418537ffe620098',
      r011DirectVisualClosureComplete: true,
      r011CurrentlyBlocksMappedCapability: false,
      r011ClosureCreatesUniversalTonggenDefinition: false,
      r011ClosureSufficientForGlobalNegativeRootResolver: false,
      r011ClosureSufficientForCanonicalSizhuRootResolver: false,
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
