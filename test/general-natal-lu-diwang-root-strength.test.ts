import { describe, expect, it } from 'vitest';
import {
  R017_AUTHORITY,
  R017_AUTHORITY_SURFACES,
  R017_COMMENTARY_BINDINGS,
  R017_CROSS_SOURCE_BRIDGES,
  R017_LU_DIWANG_VERSION,
  R017_SCOPE_GAPS,
} from '../src/research/general-natal-lu-diwang-root-strength.js';

describe('R017 Lu / Wang / Diwang root-strength workbench', () => {
  it('keeps source-native Wang separate from Twelve-Growth Diwang', () => {
    expect(R017_LU_DIWANG_VERSION).toBe('0.1.0-research');
    expect(R017_AUTHORITY_SURFACES).toContainEqual(
      expect.objectContaining({
        term: 'WANG',
        semanticClass: 'HEAVY_ROOT_CLASS',
        state: 'GOVERNED_RESEARCH_ONLY',
      }),
    );
    expect(R017_AUTHORITY_SURFACES).toContainEqual(
      expect.objectContaining({
        term: 'DIWANG',
        semanticClass: 'TWELVE_GROWTH_STAGE',
        state: 'GOVERNED_RESEARCH_ONLY',
      }),
    );
    expect(R017_CROSS_SOURCE_BRIDGES.twelveGrowthDiwangToWangHeavyRoot).toBe(false);
  });

  it('records commentary associations without silently making executable bridges', () => {
    expect(R017_COMMENTARY_BINDINGS).toContainEqual(
      expect.objectContaining({
        proposition: '祿臨官也',
        sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
        executableBridgeAuthorized: false,
      }),
    );
    expect(R017_CROSS_SOURCE_BRIDGES.twelveGrowthLinguanToLuHeavyRoot).toBe(false);
    expect(R017_SCOPE_GAPS.yinLuResolved).toBe(false);
    expect(R017_SCOPE_GAPS.earthLuResolved).toBe(false);
  });

  it('fails closed on strength and production escalation', () => {
    expect(R017_AUTHORITY).toEqual(
      expect.objectContaining({
        status: 'research',
        luHeavyRootSupportedBounded: true,
        wangHeavyRootGovernedResearchOnly: true,
        diwangStageGovernedResearchOnly: true,
        diwangEqualsWangRootClass: false,
        linguanEqualsLuExecutableBridge: false,
        numericRootStrengthAuthorized: false,
        finalQiangRuoAuthorized: false,
        finalWangShuaiAuthorized: false,
        productionAuthorityPromoted: false,
      }),
    );
  });
});
