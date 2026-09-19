import { describe, expect, it } from 'vitest';
import {
  R073_AUTHORITY,
  R073_EXECUTION_GAPS,
  R073_REJECTED_SHORTCUTS,
  R073_STATE_MODEL,
  R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
} from '../src/research/general-natal-temporal-latent-activation.js';

describe('R073 temporal activation vs natal latent interaction', () => {
  it('preserves latent, activation, temporary, and context states separately', () => {
    expect(R073_TEMPORAL_LATENT_ACTIVATION_VERSION).toBe('0.1.0-research');
    expect(R073_STATE_MODEL.map((x) => x.state)).toEqual([
      'NATAL_LATENT',
      'ACTIVATED_BY_TRANSPARENCY',
      'ACTIVATED_BY_NATAL_LUCK_MEETING',
      'TEMPORARY_OPERATIVE_STATE',
      'POSITION_CONTEXT_MODULATED',
    ]);
    expect(R073_STATE_MODEL.every(
      (x) => x.eventAuthorized === false && x.executable === false,
    )).toBe(true);
  });

  it('rejects latent-equals-active and permanent-mutation shortcuts', () => {
    expect(R073_REJECTED_SHORTCUTS).toContain('LATENT_EQUALS_ACTIVE');
    expect(R073_REJECTED_SHORTCUTS).toContain('ACTIVATION_EQUALS_PERMANENT_NATAL_CHANGE');
    expect(R073_REJECTED_SHORTCUTS).toContain('HIDDEN_STEM_GUARANTEES_FUTURE_ACTIVATION');
  });

  it('does not bridge activation directly to a concrete event', () => {
    expect(R073_REJECTED_SHORTCUTS).toContain('ANY_LUCK_MATCH_IMPLIES_EVENT');
    expect(R073_EXECUTION_GAPS).toContain('EVENT_BRIDGE');
  });

  it('keeps duration, structural threshold, and polarity unresolved', () => {
    expect(R073_EXECUTION_GAPS).toContain('ACTIVATION_DURATION');
    expect(R073_EXECUTION_GAPS).toContain('STRUCTURAL_CHANGE_THRESHOLD');
    expect(R073_EXECUTION_GAPS).toContain('POLARITY_SETTLEMENT');
  });

  it('keeps the frontier research-only', () => {
    expect(R073_AUTHORITY).toEqual({
      status: 'VERIFIED_LATENT_ACTIVATION_STATE_SEPARATION',
      stateCount: 5,
      activationImpliesPermanentNatalChange: false,
      activationImpliesConcreteEvent: false,
      executableTimingResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
