import { describe, expect, it } from 'vitest';
import {
  R079_AUTHORITY,
  R079_CONFLICT_DIMENSIONS,
  R079_DIRECT_PROPOSITIONS,
  R079_EXECUTION_GAPS,
  R079_MULTICYCLE_CONFLICT_CORPUS_VERSION,
  R079_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-multicycle-conflict-corpus.js';

describe('R079 multi-cycle conflict-resolution corpus', () => {
  it('preserves seven conflict dimensions without a total order', () => {
    expect(R079_MULTICYCLE_CONFLICT_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R079_CONFLICT_DIMENSIONS).toEqual([
      'NATAL_CONTEXT',
      'DAYUN_STATE',
      'ANNUAL_STATE',
      'STEM_BRANCH_ROOT_SUPPORT',
      'CLASH_CONTROL_COMBINATION',
      'RESCUE_BLOCKING',
      'DEVELOPED_STATE_TIMING_CONTEXT',
    ]);
  });

  it('keeps direct propositions contextual and non-executable', () => {
    expect(R079_DIRECT_PROPOSITIONS).toHaveLength(4);
    expect(R079_DIRECT_PROPOSITIONS.every(
      (x) => x.fixedPrecedenceAuthorized === false && x.executable === false,
    )).toBe(true);
  });

  it('rejects fixed layer precedence and numeric weighting', () => {
    expect(R079_REJECTED_SHORTCUTS).toContain('ANNUAL_ALWAYS_BEATS_DAYUN');
    expect(R079_REJECTED_SHORTCUTS).toContain('DAYUN_ALWAYS_BEATS_ANNUAL');
    expect(R079_REJECTED_SHORTCUTS).toContain('FIXED_LAYER_NUMERIC_WEIGHTS');
    expect(R079_REJECTED_SHORTCUTS).toContain('FIRST_MATCH_WINS');
  });

  it('keeps settlement and event bridge unresolved', () => {
    expect(R079_EXECUTION_GAPS).toContain('CLASH_CONTROL_WINNER_SETTLEMENT');
    expect(R079_EXECUTION_GAPS).toContain('RESCUE_BLOCKING_PRECEDENCE');
    expect(R079_EXECUTION_GAPS).toContain('EVENT_BRIDGE');
  });

  it('keeps the frontier research-only', () => {
    expect(R079_AUTHORITY).toEqual({
      status: 'VERIFIED_MULTILAYER_CONFLICT_CORPUS',
      dimensionCount: 7,
      propositionCount: 4,
      totalLayerOrderAuthorized: false,
      numericLayerWeightsAuthorized: false,
      executableMultiCycleResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
