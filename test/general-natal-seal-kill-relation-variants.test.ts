import { describe, expect, it } from 'vitest';
import {
  R049_AUTHORITY,
  R049_EXECUTION_GAPS,
  R049_SEAL_KILL_VARIANTS,
  R049_SEAL_KILL_VARIANTS_VERSION,
} from '../src/research/general-natal-seal-kill-relation-variants.js';

describe('R049 Seal/Kill relation variants', () => {
  it('preserves materially different source configurations', () => {
    expect(R049_SEAL_KILL_VARIANTS_VERSION).toBe('0.1.0-research');
    expect(new Set(R049_SEAL_KILL_VARIANTS.map((v) => v.role))).toEqual(new Set([
      'SUPPORT_OR_GENERATION',
      'FAILURE_CONTEXT',
      'CONTAMINATION',
      'PROTECTION_AGAINST_CONTROL',
      'RESCUE_CHAIN',
    ]));
    expect(R049_SEAL_KILL_VARIANTS.every((v) => v.executable === false)).toBe(true);
  });

  it('keeps effect and precedence predicates unresolved', () => {
    expect(R049_EXECUTION_GAPS).toContain('KILL_GENERATES_SEAL_EFFECT');
    expect(R049_EXECUTION_GAPS).toContain('SEAL_PROTECTS_KILL_EFFECT');
    expect(R049_EXECUTION_GAPS).toContain('WEALTH_REMOVES_SEAL_EFFECT');
    expect(R049_EXECUTION_GAPS).toContain('RESCUE_PRECEDENCE');
  });

  it('rejects universal Seal+Kill transform/favorability shortcuts', () => {
    expect(R049_AUTHORITY).toEqual({
      status: 'VERIFIED_VARIANT_CORPUS',
      universalSealTransformsKillRuleAuthorized: false,
      presenceOnlyFavorabilityAuthorized: false,
      executableRelationResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
