import { describe, expect, it } from 'vitest';
import {
  R040_AUTHORITY,
  R040_FORBIDDEN_COLLAPSES,
  R040_NONCOLLAPSING_EVIDENCE_VERSION,
  type R040YongXiEvidenceEnvelope,
} from '../src/research/general-natal-noncollapsing-yongxi-evidence.js';

describe('R040 non-collapsing Yong/Xi evidence envelope', () => {
  it('keeps method-specific roles separate in one envelope', () => {
    expect(R040_NONCOLLAPSING_EVIDENCE_VERSION).toBe('0.1.0-research');

    const envelope: R040YongXiEvidenceEnvelope = {
      envelopeId: 'r040-example',
      items: [
        {
          evidenceId: 'support-use',
          methodologyFamily: 'STRENGTH_FUIYI',
          sourceStratum: '徐樂吾評註',
          sourceRef: 'R035',
          role: 'PRIMARY_USE',
          value: '酉金扶身',
          applicabilityState: 'UNRESOLVED',
          authorityState: 'RESEARCH_ONLY',
          evidenceRefs: ['R039:C1'],
        },
        {
          evidenceId: 'climate-fire',
          methodologyFamily: 'CLIMATE_TIAOHOU',
          sourceStratum: '徐樂吾評註',
          sourceRef: 'R034',
          role: 'CLIMATE_REQUIREMENT',
          value: '火不可缺',
          applicabilityState: 'UNRESOLVED',
          authorityState: 'RESEARCH_ONLY',
          evidenceRefs: ['R039:C1'],
        },
      ],
      relation: 'COEXISTING_DIFFERENT_ROLES',
      forceSingleWinner: false,
      executable: false,
    };

    expect(envelope.items.map((item) => item.role)).toEqual([
      'PRIMARY_USE',
      'CLIMATE_REQUIREMENT',
    ]);
    expect(envelope.forceSingleWinner).toBe(false);
    expect(envelope.executable).toBe(false);
    expect('finalYongShen' in envelope).toBe(false);
  });

  it('forbids hidden ranking and semantic-role collapse', () => {
    expect(R040_FORBIDDEN_COLLAPSES).toContain('ARRAY_ORDER_AS_WINNER');
    expect(R040_FORBIDDEN_COLLAPSES).toContain('CLIMATE_REQUIREMENT_AS_PRIMARY_USE');
    expect(R040_FORBIDDEN_COLLAPSES).toContain('XI_SHEN_AS_FINAL_YONGSHEN');
    expect(R040_FORBIDDEN_COLLAPSES).toContain('NUMERIC_METHOD_PRIORITY_SCORE');
  });

  it('does not create chart-role or Production authority', () => {
    expect(R040_AUTHORITY).toEqual({
      status: 'RESEARCH_EVIDENCE_MODEL_DEFINED',
      finalYongShenFieldAuthorized: false,
      methodWinnerResolverAuthorized: false,
      chartRoleAssignmentAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
