import { describe, expect, it } from 'vitest';
import {
  R035_AUTHORITY,
  R035_DIRECT_SOURCE_PHRASES,
  R035_EXECUTION_GAPS,
  R035_FORBIDDEN_SHORTCUTS,
  R035_FUIYI_PROPOSITIONS,
  R035_FUIYI_YONGSHEN_VERSION,
} from '../src/research/general-natal-fuyi-yongshen-conditions.js';

describe('R035 Fuyi Yong-Shen decision conditions', () => {
  it('preserves the bounded source-side support/suppression families', () => {
    expect(R035_FUIYI_YONGSHEN_VERSION).toBe('0.1.0-research');
    expect(R035_FUIYI_PROPOSITIONS.map((p) => [p.sourceCondition, p.direction])).toEqual([
      ['日元強', 'SUPPRESS'],
      ['日元弱', 'SUPPORT'],
      ['月令之神太強', 'SUPPRESS'],
      ['月令之神太弱', 'SUPPORT'],
    ]);
    expect(R035_FUIYI_PROPOSITIONS[0].candidateFamilies).toEqual(['官煞以剋之', '食傷以洩之']);
    expect(R035_FUIYI_PROPOSITIONS[1].candidateFamilies).toEqual(['印以生之', '劫以助之']);
  });

  it('keeps every proposition non-executable while strength/applicability remain unresolved', () => {
    expect(R035_FUIYI_PROPOSITIONS.every((p) => p.executable === false)).toBe(true);
    expect(R035_EXECUTION_GAPS).toContain('FINAL_BODY_STRENGTH');
    expect(R035_EXECUTION_GAPS).toContain('MONTH_ORDER_RELATIVE_STRENGTH');
    expect(R035_EXECUTION_GAPS).toContain('CROSS_METHOD_RECONCILIATION');
  });

  it('forbids presence shortcuts and universal Yong-Shen promotion', () => {
    expect(R035_DIRECT_SOURCE_PHRASES).toHaveLength(4);
    expect(R035_FORBIDDEN_SHORTCUTS).toContain('RESOURCE_OR_PEER_PRESENCE_AS_AUTOMATIC_SUPPORT_YONGSHEN');
    expect(R035_FORBIDDEN_SHORTCUTS).toContain('CROSS_METHOD_FORCE_SINGLE_WINNER');
    expect(R035_AUTHORITY).toEqual({
      sourceFamily: 'XU_COMMENTARY_STRENGTH_FUIYI',
      status: 'VERIFIED_BOUNDED_PROPOSITION_FAMILY',
      executableFuyiResolverAuthorized: false,
      canonicalUniversalYongShenResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
