import { describe, expect, it } from 'vitest';
import {
  R011_AUTHORITY,
  R011_PAIRWISE_VERDICTS,
  R011_ROOT_SEMANTICS_COMPARISON_VERSION,
  R011_SOURCE_SURFACES,
} from '../src/research/general-natal-root-semantic-cross-source-comparison.js';

describe('R011 root / Tonggen cross-source comparison workbench', () => {
  it('keeps all three source families distinct instead of normalizing root semantics', () => {
    expect(R011_ROOT_SEMANTICS_COMPARISON_VERSION).toBe('0.1.0-research');
    expect(R011_SOURCE_SURFACES).toHaveLength(3);
    expect(new Set(R011_SOURCE_SURFACES.map((source) => source.sourceKey)).size).toBe(3);

    const ziping = R011_SOURCE_SURFACES.find(
      (source) => source.sourceKey === 'ziping_zhenquan_pingzhu',
    );
    const yuanhai = R011_SOURCE_SURFACES.find(
      (source) => source.sourceKey === 'yuanhai_ntl_1926',
    );
    expect(ziping?.explicitlyDefinesTonggen).toBe(true);
    expect(ziping?.admitsWeightedRootClasses).toBe(true);
    expect(ziping?.statesMonthBranchPriority).toBe(true);
    expect(yuanhai?.explicitlyDefinesTonggen).toBe(false);
    expect(yuanhai?.admitsWeightedRootClasses).toBe(false);
  });

  it('treats the Yuanhai/Sanming wording overlap as a lineage question, not independent votes', () => {
    expect(R011_PAIRWISE_VERDICTS).toContainEqual(
      expect.objectContaining({
        left: 'yuanhai_ntl_1926',
        right: 'sanming_siku_juan12',
        verdict: 'TEXTUAL_INHERITANCE_SUSPECTED',
      }),
    );
  });

  it('fails closed on universal root/Tonggen and production authority', () => {
    expect(R011_AUTHORITY).toEqual(
      expect.objectContaining({
        status: 'research',
        crossSourceUniversalTonggenDefinition: false,
        universalRootResolverAuthorized: false,
        rootWeightClassifierAuthorized: false,
        numericRootWeightsAuthorized: false,
        strengthClassifierAuthorized: false,
        productionAuthorityPromoted: false,
        directScanClosureComplete: false,
      }),
    );
    expect(R011_AUTHORITY.remainingVerification).toHaveLength(3);
  });
});
