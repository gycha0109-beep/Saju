import { describe, expect, it } from 'vitest';
import {
  R060_AUTHORITY,
  R060_BOUNDED_COUNTEREXAMPLE,
  R060_EXECUTION_GAPS,
  R060_HIDDEN_STEM_INTERACTION_VERSION,
  R060_MECHANISMS,
  R060_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-hidden-stem-interaction-boundary.js';

describe('R060 hidden-stem interaction boundary', () => {
  it('keeps membership, manifestation, meeting, and clash distinct', () => {
    expect(R060_HIDDEN_STEM_INTERACTION_VERSION).toBe('0.1.0-research');
    expect(R060_MECHANISMS.map((x) => x.mechanism)).toEqual([
      'HIDDEN_MEMBERSHIP',
      'STEM_MANIFESTATION_TOU_GAN',
      'BRANCH_MEETING_CONFIGURATION',
      'CLASH_MOVEMENT_OR_DISRUPTION',
    ]);
    expect(R060_MECHANISMS.every((x) => x.executable === false)).toBe(true);
  });

  it('preserves a direct counterexample to clash-equals-activation', () => {
    expect(R060_BOUNDED_COUNTEREXAMPLE).toEqual({
      sourceSurface: '辰戌沖 -> 土動; exposed 壬 connection to month command can fail',
      clashRevealsAllHiddenStems: false,
      clashEqualsTouGan: false,
      executable: false,
    });
  });

  it('rejects generic interaction activation shortcuts', () => {
    expect(R060_REJECTED_SHORTCUTS).toContain('ANY_INTERACTION_ACTIVATES_ALL_HIDDEN_STEMS');
    expect(R060_REJECTED_SHORTCUTS).toContain('CLASH_MAKES_HIDDEN_STEM_VISIBLE');
    expect(R060_REJECTED_SHORTCUTS).toContain('MEETING_ACTIVATES_EACH_HIDDEN_STEM_INDEPENDENTLY');
  });

  it('keeps role selection and effect settlement unresolved', () => {
    expect(R060_EXECUTION_GAPS).toContain('HIDDEN_STEM_ROLE_SELECTION');
    expect(R060_EXECUTION_GAPS).toContain('ROOT_CONNECTION_EFFECT');
    expect(R060_EXECUTION_GAPS).toContain('INTERACTION_EVENT_SETTLEMENT');
  });

  it('does not promote a generic or Production resolver', () => {
    expect(R060_AUTHORITY).toEqual({
      status: 'VERIFIED_DISTINCT_MECHANISMS_ONLY',
      hiddenMembershipDistinctFromManifestation: true,
      meetingDistinctFromTouGan: true,
      clashDistinctFromManifestation: true,
      genericInteractionActivationAuthorized: false,
      executableResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
