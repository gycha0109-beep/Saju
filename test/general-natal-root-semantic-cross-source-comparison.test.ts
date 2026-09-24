import { describe, expect, it } from 'vitest';
import {
  R011_AUTHORITY,
  R011_DIRECT_VISUAL_LOCATORS,
  R011_PAIRWISE_VERDICTS,
  R011_REJECTED_NORMALIZATIONS,
  R011_ROOT_SEMANTICS_COMPARISON_VERSION,
  R011_SOURCE_SURFACES,
} from '../src/research/general-natal-root-semantic-cross-source-comparison.js';

describe('R011 root / Tonggen cross-source comparison', () => {
  it('records direct visual closure for the exact Yuanhai and Sanming target pages', () => {
    expect(R011_ROOT_SEMANTICS_COMPARISON_VERSION).toBe('0.2.0-research');
    expect(R011_DIRECT_VISUAL_LOCATORS).toHaveLength(2);

    const yuanhai = R011_DIRECT_VISUAL_LOCATORS.find(
      (row) => row.sourceKey === 'yuanhai_ntl_1926',
    );
    expect(yuanhai).toMatchObject({
      witnessId: 'NTL-9900014380',
      pageCount: 164,
      humanFilePageNumber: 34,
      zeroBasedFilePageIndex: 33,
      printedPageLabel: '三三',
    });
    expect(yuanhai?.visualAnchors).toContain('身弱論');
    expect(yuanhai?.visualAnchors).toContain('陽木無根');
    expect(yuanhai?.evidenceCaptureSha256).toMatch(/^[a-f0-9]{64}$/u);

    const sanming = R011_DIRECT_VISUAL_LOCATORS.find(
      (row) => row.sourceKey === 'sanming_nlc_1926_juan12',
    );
    expect(sanming).toMatchObject({
      witnessId: 'NLC416-13jh000624-42998',
      pageCount: 345,
      humanFilePageNumber: 341,
      zeroBasedFilePageIndex: 340,
      printedPageLabel: '四四',
      originalFileSha256:
        'b90f9e722407fed6d564300eb71cbae55014f6a35a849ce9e2b940fae4b915bd',
      renderDimensions: [1084, 1500],
      renderDpi: 200,
    });
    expect(sanming?.visualAnchors).toContain('陽木無根');
    expect(sanming?.visualAnchors).toContain('有根南旺');
    expect(sanming?.visualAnchors).toContain('會逢根氣');
  });

  it('keeps all three source families distinct instead of normalizing root semantics', () => {
    expect(R011_SOURCE_SURFACES).toHaveLength(3);
    expect(new Set(R011_SOURCE_SURFACES.map((source) => source.sourceKey)).size).toBe(3);

    const ziping = R011_SOURCE_SURFACES.find(
      (source) => source.sourceKey === 'ziping_zhenquan_pingzhu',
    );
    const yuanhai = R011_SOURCE_SURFACES.find(
      (source) => source.sourceKey === 'yuanhai_ntl_1926',
    );
    const sanming = R011_SOURCE_SURFACES.find(
      (source) => source.sourceKey === 'sanming_nlc_1926_juan12',
    );

    expect(ziping?.explicitlyDefinesTonggen).toBe(true);
    expect(ziping?.admitsWeightedRootClasses).toBe(true);
    expect(ziping?.statesMonthBranchPriority).toBe(true);

    expect(yuanhai?.explicitlyDefinesTonggen).toBe(false);
    expect(yuanhai?.admitsWeightedRootClasses).toBe(false);
    expect(yuanhai?.evidenceMode).toBe('DIRECT_VISUAL_REGISTERED_SCAN');

    expect(sanming?.explicitlyDefinesTonggen).toBe(false);
    expect(sanming?.evidenceMode).toBe('DIRECT_VISUAL_REGISTERED_SCAN');
  });

  it('treats Yuanhai/Sanming overlap as suspected inheritance with mechanism inconclusive', () => {
    expect(R011_PAIRWISE_VERDICTS).toContainEqual(
      expect.objectContaining({
        left: 'yuanhai_ntl_1926',
        right: 'sanming_nlc_1926_juan12',
        verdict: 'TEXTUAL_INHERITANCE_SUSPECTED',
        lineageMechanism: 'INCONCLUSIVE_DIRECT_OR_COMMON_SOURCE',
      }),
    );
  });

  it('preserves partial overlap and different-scope judgments for Ziping comparison', () => {
    expect(R011_PAIRWISE_VERDICTS).toContainEqual(
      expect.objectContaining({
        left: 'yuanhai_ntl_1926',
        right: 'ziping_zhenquan_pingzhu',
        verdict: 'PARTIAL_OVERLAP',
      }),
    );
    expect(R011_PAIRWISE_VERDICTS).toContainEqual(
      expect.objectContaining({
        left: 'sanming_nlc_1926_juan12',
        right: 'ziping_zhenquan_pingzhu',
        verdict: 'DIFFERENT_SCOPE',
      }),
    );
  });

  it('closes only the direct-visual research gate and keeps universal semantics fail-closed', () => {
    expect(R011_AUTHORITY).toMatchObject({
      status: 'VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE',
      researchOnly: true,
      crossSourceUniversalTonggenDefinition: false,
      universalRootResolverAuthorized: false,
      globalNegativeRootResolverAuthorized: false,
      rootWeightClassifierAuthorized: false,
      numericRootWeightsAuthorized: false,
      strengthClassifierAuthorized: false,
      productionAuthorityPromoted: false,
      directScanClosureComplete: true,
      yuanHaiDirectVisualPinned: true,
      sanmingDirectVisualPinned: true,
      exactLineageMechanismResolved: false,
      lineageDisposition: 'TEXTUAL_INHERITANCE_SUSPECTED_MECHANISM_INCONCLUSIVE',
      remainingClosureBlockers: [],
    });
  });

  it('rejects semantic and authority shortcuts after closure', () => {
    expect(R011_REJECTED_NORMALIZATIONS).toContain(
      'THREE_SOURCE_FAMILIES_EQUAL_ONE_UNIVERSAL_TONGGEN_PREDICATE',
    );
    expect(R011_REJECTED_NORMALIZATIONS).toContain(
      'YUANHAI_SANMING_SHARED_WORDING_EQUALS_INDEPENDENT_CORROBORATION',
    );
    expect(R011_REJECTED_NORMALIZATIONS).toContain(
      'DIRECT_VISUAL_CLOSURE_EQUALS_GLOBAL_NEGATIVE_ROOT_RESOLVER',
    );
    expect(R011_REJECTED_NORMALIZATIONS).toContain(
      'DIRECT_VISUAL_CLOSURE_EQUALS_FINAL_QIANG_RUO_CLASSIFIER',
    );
    expect(R011_REJECTED_NORMALIZATIONS).toContain(
      'RESEARCH_CLOSURE_EQUALS_PRODUCTION_AUTHORITY',
    );
  });

  it('keeps R097 reproducibility hardening separate from semantic closure', () => {
    expect(R011_AUTHORITY.optionalFollowUp.some((item) => item.includes('R097'))).toBe(true);
    expect(R011_AUTHORITY.remainingClosureBlockers).toHaveLength(0);
  });
});
