import { describe, expect, it } from 'vitest';
import {
  R077_AUTHORITY,
  R077_EXECUTION_GAPS,
  R077_LUCK_YONGXI_SHIFT_VERSION,
  R077_REJECTED_SHORTCUTS,
  R077_ROLE_STATES,
} from '../src/research/general-natal-luck-yongxi-shift.js';

describe('R077 luck-cycle Yong/Xi support vs shift boundary', () => {
  it('separates natal roles, luck interaction, natal rescue, and structural change', () => {
    expect(R077_LUCK_YONGXI_SHIFT_VERSION).toBe('0.1.0-research');
    expect(R077_ROLE_STATES.map((x) => x.state)).toEqual([
      'NATAL_ROLE_BASIS',
      'LUCK_SUPPORT_OR_OPPOSITION',
      'NATAL_RESCUE_OR_BLOCKING',
      'STRUCTURAL_COMPLETION_OR_CHANGE',
    ]);
    expect(R077_ROLE_STATES.every(
      (x) => x.automaticTemporalReselection === false && x.executable === false,
    )).toBe(true);
  });

  it('rejects automatic period-by-period Yongshen reselection', () => {
    expect(R077_REJECTED_SHORTCUTS).toContain('EVERY_DAYUN_RESELECTS_YONGSHEN');
    expect(R077_REJECTED_SHORTCUTS).toContain('EVERY_YEAR_RESELECTS_FINAL_YONGSHEN');
    expect(R077_REJECTED_SHORTCUTS).toContain('EVERY_MONTH_RESELECTS_FINAL_YONGSHEN');
  });

  it('rejects nominal-match and permanent-replacement shortcuts', () => {
    expect(R077_REJECTED_SHORTCUTS).toContain('NOMINAL_XI_YONG_MATCH_ALWAYS_FAVORABLE');
    expect(R077_REJECTED_SHORTCUTS).toContain('STRUCTURAL_CHANGE_PERMANENTLY_REPLACES_NATAL_YONGXI');
  });

  it('keeps transition threshold, duration, and provenance unresolved', () => {
    expect(R077_EXECUTION_GAPS).toContain('STRUCTURAL_TRANSITION_THRESHOLD');
    expect(R077_EXECUTION_GAPS).toContain('TEMPORAL_ROLE_DURATION');
    expect(R077_EXECUTION_GAPS).toContain('ROLE_PROVENANCE_CHAIN');
  });

  it('keeps the frontier research-only', () => {
    expect(R077_AUTHORITY).toEqual({
      status: 'VERIFIED_NATAL_ROLE_LUCK_INTERACTION_BOUNDARY',
      roleStateCount: 4,
      automaticTemporalYongshenReselectionAuthorized: false,
      permanentYongxiReplacementAuthorized: false,
      executableTemporalYongxiSwitcherAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
