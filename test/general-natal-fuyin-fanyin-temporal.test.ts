import { describe, expect, it } from 'vitest';
import {
  R078_AUTHORITY,
  R078_EFFECT_BOUNDARY,
  R078_EXECUTION_GAPS,
  R078_FUYIN_FANYIN_TEMPORAL_VERSION,
  R078_REJECTED_SHORTCUTS,
  R078_SELECTED_SOURCE_DEFINITIONS,
} from '../src/research/general-natal-fuyin-fanyin-temporal.js';

describe('R078 Fuyin/Fanyin temporal definitions', () => {
  it('preserves selected-source wording and Day-target scope', () => {
    expect(R078_FUYIN_FANYIN_TEMPORAL_VERSION).toBe('0.1.0-research');
    expect(R078_SELECTED_SOURCE_DEFINITIONS).toEqual([
      expect.objectContaining({
        term: 'FANYIN',
        sourceSurface: '若歲運與日相對，謂之返吟',
        temporalActors: ['SUIYUN', 'DAY'],
      }),
      expect.objectContaining({
        term: 'FUYIN',
        sourceSurface: '歲運壓日，謂之伏吟',
        temporalActors: ['SUIYUN', 'DAY'],
      }),
    ]);
    expect(R078_SELECTED_SOURCE_DEFINITIONS.every(
      (x) => x.universalModernAlgorithmAuthorized === false && x.executable === false,
    )).toBe(true);
  });

  it('does not turn adverse source language into guaranteed events', () => {
    expect(R078_EFFECT_BOUNDARY).toEqual({
      adverseFamilyLanguageObserved: true,
      adverseWealthLanguageObserved: true,
      guaranteedDisasterAuthorized: false,
      guaranteedDeathAuthorized: false,
      guaranteedFinancialLossAuthorized: false,
      fixedSeverityScoreAuthorized: false,
    });
  });

  it('rejects unsourced universal modern algorithms', () => {
    expect(R078_REJECTED_SHORTCUTS).toContain(
      'FUYIN_EQUALS_IDENTICAL_GANZHI_UNIVERSALLY_WITHOUT_SOURCE_MAPPING',
    );
    expect(R078_REJECTED_SHORTCUTS).toContain(
      'FANYIN_EQUALS_EXACT_OPPOSITE_GANZHI_UNIVERSALLY_WITHOUT_SOURCE_MAPPING',
    );
    expect(R078_REJECTED_SHORTCUTS).toContain('FUYIN_FANYIN_AUTO_APPLY_TO_ALL_NATAL_PILLARS');
  });

  it('keeps operational mapping and event bridge unresolved', () => {
    expect(R078_EXECUTION_GAPS).toContain('XIANGDUI_OPERATIONAL_MAPPING');
    expect(R078_EXECUTION_GAPS).toContain('STEM_BRANCH_COMPONENT_REQUIREMENTS');
    expect(R078_EXECUTION_GAPS).toContain('EVENT_BRIDGE');
  });

  it('keeps the frontier research-only', () => {
    expect(R078_AUTHORITY).toEqual({
      status: 'VERIFIED_SELECTED_SOURCE_DEFINITIONS_ONLY',
      definitionCount: 2,
      universalModernAlgorithmAuthorized: false,
      deterministicEventSemanticsAuthorized: false,
      executableTemporalResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
