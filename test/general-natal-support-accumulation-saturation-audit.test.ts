import { describe, expect, it } from 'vitest';
import {
  R124_AUTHORITY,
  R124_REJECTED_DERIVATIONS,
  R124_SUPPORT_ACCUMULATION_SATURATION_VERSION,
  R124_SUPPORT_CLAIM_AUDIT_ROWS,
  R124_SUMMARY,
} from '../src/research/general-natal-support-accumulation-saturation-audit.js';

describe('R124 support accumulation and saturation audit', () => {
  it('publishes a sufficiently large claim-audit matrix', () => {
    expect(R124_SUPPORT_ACCUMULATION_SATURATION_VERSION).toBe('0.1.0-research');
    expect(R124_SUPPORT_CLAIM_AUDIT_ROWS).toHaveLength(17);
    expect(R124_SUMMARY.claimCount).toBe(17);
    expect(new Set(R124_SUPPORT_CLAIM_AUDIT_ROWS.map((row) => row.claimId)).size).toBe(17);
  });

  it('meets the planned evidence-family coverage', () => {
    expect(R124_SUMMARY.repeatedOrAccumulationRowCount).toBeGreaterThanOrEqual(4);
    expect(R124_SUMMARY.mixedSupportRowCount).toBeGreaterThanOrEqual(3);
    expect(R124_SUMMARY.explicitCardinalityComparisonRowCount).toBeGreaterThanOrEqual(3);
    expect(R124_SUMMARY.excessOrReversalRowCount).toBeGreaterThanOrEqual(3);
  });

  it('separates source statement, interpretation, and research inference for every row', () => {
    for (const row of R124_SUPPORT_CLAIM_AUDIT_ROWS) {
      expect(row.sourceStatement.length).toBeGreaterThan(0);
      expect(row.interpretiveReading.length).toBeGreaterThan(0);
      expect(row.researchInference.length).toBeGreaterThan(0);
      expect(row.sourceRefs.length).toBeGreaterThan(0);
      expect(row.prohibitedExtensions.length).toBeGreaterThan(0);
    }
  });

  it('preserves mixed-family support as qualitative evidence without a count threshold', () => {
    const association = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (row) => row.claimId === 'R124-C01-SUPPORT-FAMILIES-DANGZHONG',
    );
    const repeated = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (row) => row.claimId === 'R124-C02-BIYIN-REPETITION-PLUS-TONGGEN',
    );

    expect(association).toMatchObject({
      supportFamily: 'MIXED_SUPPORT',
      relation: 'PRESENCE_ASSOCIATION',
      qualitativeAccumulationObserved: false,
      thresholdAuthorized: false,
    });
    expect(repeated).toMatchObject({
      supportFamily: 'MIXED_SUPPORT',
      relation: 'QUALITATIVE_ACCUMULATION',
      qualitativeAccumulationObserved: true,
      exactNumericBoundaryPresent: false,
      thresholdAuthorized: false,
      linearAccumulationAuthorized: false,
    });
  });

  it('keeps explicit one/two/three-peer comparisons qualitative and non-numeric', () => {
    const ids = [
      'R124-C03-ONE-BIJIAN-VS-ONE-MUKU',
      'R124-C04-TWO-BIJIAN-VS-ONE-YUQI',
      'R124-C05-THREE-BIJIAN-VS-ONE-CHANGSHENG-LU',
    ];

    for (const claimId of ids) {
      const row = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
        (candidate) => candidate.claimId === claimId,
      );
      expect(row).toMatchObject({
        relation: 'EXPLICIT_CARDINAL_COMPARISON',
        exactCardinalityComparisonPresent: true,
        exactNumericBoundaryPresent: false,
        thresholdAuthorized: false,
        linearAccumulationAuthorized: false,
        numericMappingAuthorized: false,
      });
    }
  });

  it('keeps contextual Yuqi equivalence from becoming an exchange rate', () => {
    const row = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (candidate) => candidate.claimId === 'R124-C06-YUQI-CONTEXT-CAN-MATCH-ONE-BIJIE',
    );

    expect(row).toMatchObject({
      exactCardinalityComparisonPresent: true,
      exactNumericBoundaryPresent: false,
      thresholdAuthorized: false,
      numericMappingAuthorized: false,
    });
    expect(row?.prohibitedExtensions).toContain(
      'ONE_YUQI_ALWAYS_EQUALS_ONE_BIJIE',
    );
  });

  it('uses four-Xin-Mao and four-Bing-Shen as anti-monotonic counterexamples', () => {
    for (const claimId of [
      'R124-C08-FOUR-XIN-MAO-STILL-WEAK',
      'R124-C09-FOUR-BING-SHEN-STILL-WEAK',
    ]) {
      const row = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
        (candidate) => candidate.claimId === claimId,
      );
      expect(row).toMatchObject({
        supportFamily: 'BIJIE',
        relation: 'ANTI_MONOTONIC_COUNTEREXAMPLE',
        exactCardinalityComparisonPresent: true,
        qualitativeAccumulationObserved: true,
        thresholdAuthorized: false,
        saturationCurveAuthorized: false,
      });
    }
  });

  it('preserves positive and adverse many-Yinshou language as context-dependent rather than monotonic', () => {
    const positive = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (row) => row.claimId === 'R124-C10-SANMING-MORE-YINSHOU-CAN-BE-SUPERIOR',
    );
    const adverse = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (row) => row.claimId === 'R124-C11-SANMING-YINSHOU-MANY-CLEAR-LONELY',
    );

    expect(positive).toMatchObject({
      supportFamily: 'YINSHOU',
      relation: 'QUALITATIVE_ACCUMULATION',
      reversalOrExcessObserved: false,
    });
    expect(adverse).toMatchObject({
      supportFamily: 'YINSHOU',
      relation: 'EXCESS_REVERSAL',
      reversalOrExcessObserved: true,
    });
    expect(R124_AUTHORITY.monotonicSupportGrowthEstablished).toBe(false);
  });

  it('treats 太過 and 根多 language as qualitative excess rather than an exact saturation point', () => {
    const taiguo = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (row) => row.claimId === 'R124-C12-SANMING-YINSHOU-TAIGUO',
    );
    const genDuo = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (row) => row.claimId === 'R124-C13-SIYAN-YINSHOU-ROOT-MANY-NOT-DEVELOP',
    );

    expect(taiguo).toMatchObject({
      relation: 'SATURATION_CANDIDATE',
      reversalOrExcessObserved: true,
      exactNumericBoundaryPresent: false,
      saturationCurveAuthorized: false,
    });
    expect(genDuo).toMatchObject({
      relation: 'EXCESS_REVERSAL',
      reversalOrExcessObserved: true,
      exactNumericBoundaryPresent: false,
      saturationCurveAuthorized: false,
    });
  });

  it('records elemental resource excess examples without universalizing them', () => {
    const metal = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (row) => row.claimId === 'R124-C14-SANMING-RESOURCE-EXCESS-METAL-BURIED',
    );
    const wood = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (row) => row.claimId === 'R124-C15-SANMING-RESOURCE-EXCESS-WOOD-FLOATS',
    );

    expect(metal?.reversalOrExcessObserved).toBe(true);
    expect(wood?.reversalOrExcessObserved).toBe(true);
    expect(metal?.numericMappingAuthorized).toBe(false);
    expect(wood?.numericMappingAuthorized).toBe(false);
  });

  it('keeps incomplete constituent coverage separate from aggregation mathematics', () => {
    const row = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (candidate) => candidate.claimId === 'R124-C16-CURRENT-COLLECTION-STILL-INCOMPLETE',
    );

    expect(row).toMatchObject({
      relation: 'COMPOSITION_BOUNDARY',
      qualitativeAccumulationObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
    });
    expect(row?.unresolvedFactors).toContain('general 比劫 coverage incomplete');
    expect(row?.unresolvedFactors).toContain('whole-chart 印綬 coverage incomplete');
    expect(row?.unresolvedFactors).toContain('通根 coverage incomplete');
  });

  it('deduplicates quoted textual lineage instead of treating repeated wording as votes', () => {
    const row = R124_SUPPORT_CLAIM_AUDIT_ROWS.find(
      (candidate) => candidate.claimId === 'R124-C17-TEXTUAL-DEPENDENCY-NOT-MULTIPLE-VOTES',
    );

    expect(row).toMatchObject({
      relation: 'TEXTUAL_DEPENDENCY_BOUNDARY',
      textualDependency: 'QUOTED_LINEAGE_NOT_INDEPENDENT',
    });
    expect(row?.prohibitedExtensions).toContain(
      'DUPLICATED_QUOTE_EQUALS_MULTIPLE_VOTES',
    );
  });

  it('finds no exact numeric support threshold, saturation curve, or numeric mapping', () => {
    expect(R124_SUMMARY.exactNumericBoundaryRowCount).toBe(0);
    expect(R124_SUMMARY.thresholdAuthorizedRowCount).toBe(0);
    expect(R124_SUMMARY.saturationCurveAuthorizedRowCount).toBe(0);
    expect(R124_SUMMARY.numericMappingAuthorizedRowCount).toBe(0);
  });

  it('locks all scalar and final-strength shortcuts closed', () => {
    expect(R124_REJECTED_DERIVATIONS).toContain(
      'SUPPORT_ARRAY_LENGTH_EQUALS_STRENGTH',
    );
    expect(R124_REJECTED_DERIVATIONS).toContain(
      'REPEATED_SUPPORT_EQUALS_LINEAR_ACCUMULATION',
    );
    expect(R124_REJECTED_DERIVATIONS).toContain(
      'TAIGUO_EQUALS_EXACT_SATURATION_POINT',
    );
    expect(R124_REJECTED_DERIVATIONS).toContain(
      'MANY_SUPPORT_EQUALS_FINAL_QIANG',
    );

    expect(R124_AUTHORITY).toEqual({
      status: 'RESEARCH_SUPPORT_ACCUMULATION_SATURATION_AUDIT_COMPLETE',
      researchOnly: true,
      supportPresenceObserved: true,
      qualitativeAccumulationObserved: true,
      explicitCardinalComparisonsObserved: true,
      qualitativeExcessOrReversalObserved: true,
      monotonicSupportGrowthEstablished: false,
      crossFamilyCommensurabilityEstablished: false,
      completeSupportCollectionAuthorized: false,
      supportCountAuthorized: false,
      exactDangZhongThresholdAuthorized: false,
      exactSaturationPointAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericSupportScoreAuthorized: false,
      nonNumericSupportScalarAuthorized: false,
      finalQiangRuoClassifierAuthorized: false,
      finalWangShuaiClassifierAuthorized: false,
      automaticAuthorityAdmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
