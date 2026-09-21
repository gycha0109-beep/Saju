import { describe, expect, it } from 'vitest';
import {
  R058_AUTHORITY,
  R058_EFFECT_BOUNDARY,
  R058_EXECUTION_GAPS,
  R058_LATER_COMMON_VARIANT,
  R058_PO_SOURCE_VARIANCE_VERSION,
  R058_SELECTED_SOURCE_EXCLUSIONS,
  R058_SELECTED_SOURCE_PAIRS,
} from '../src/research/general-natal-po-source-variance.js';

describe('R058 Po source variance and evidentiary weight', () => {
  it('preserves exactly the four selected-source Po pairs', () => {
    expect(R058_PO_SOURCE_VARIANCE_VERSION).toBe('0.1.0-research');
    expect(R058_SELECTED_SOURCE_PAIRS).toEqual([
      ['卯', '午'],
      ['丑', '辰'],
      ['子', '酉'],
      ['未', '戌'],
    ]);
  });

  it('does not silently import the later/common extra pairs', () => {
    expect(R058_SELECTED_SOURCE_EXCLUSIONS).toEqual([
      {
        sourcePhraseFamily: '寅申巳亥',
        excludedFromSelectedPoShaRule: true,
        laterCommonPoPairsAutoImported: false,
      },
    ]);
    expect(R058_LATER_COMMON_VARIANT).toEqual({
      pairsOftenAdded: [
        ['寅', '亥'],
        ['巳', '申'],
      ],
      treatedAsSelectedSourceAuthority: false,
      crossSourceReconciliationRequired: true,
    });
  });

  it('preserves the direct warning against automatic harmful effect', () => {
    expect(R058_EFFECT_BOUNDARY).toEqual({
      sourceWarningObserved: true,
      warningMeaning: 'CLASH_OR_BREAK_RELATION_DOES_NOT_IMPLY_ALWAYS_INAUSPICIOUS',
      automaticHarmAuthorized: false,
      fixedSeverityAuthorized: false,
      numericWeightAuthorized: false,
    });
  });

  it('keeps taxonomy reconciliation, effect, and precedence unresolved', () => {
    expect(R058_EXECUTION_GAPS).toContain('PO_CROSS_SOURCE_PAIR_RECONCILIATION');
    expect(R058_EXECUTION_GAPS).toContain('PO_CONTEXT_EFFECT');
    expect(R058_EXECUTION_GAPS).toContain('CROSS_RELATION_PRECEDENCE');
  });

  it('does not promote universal registry or Production authority', () => {
    expect(R058_AUTHORITY).toEqual({
      status: 'VERIFIED_SELECTED_SOURCE_VARIANT_ONLY',
      selectedSourcePairCount: 4,
      universalPairRegistryAuthorized: false,
      automaticHarmAuthorized: false,
      numericWeightAuthorized: false,
      executableEffectResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
