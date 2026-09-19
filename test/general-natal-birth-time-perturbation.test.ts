import { describe, expect, it } from 'vitest';
import {
  R087_AUTHORITY,
  R087_BIRTH_TIME_PERTURBATION_VERSION,
  R087_PERTURBATION_FAMILIES,
  R087_PRECONDITIONS,
  R087_REQUIRED_OUTPUTS,
} from '../src/research/general-natal-birth-time-perturbation.js';

describe('R087 birth-time perturbation sensitivity protocol', () => {
  it('pins calculator and time-boundary provenance before execution', () => {
    expect(R087_BIRTH_TIME_PERTURBATION_VERSION).toBe('0.1.0-research');
    expect(R087_PRECONDITIONS).toContain('DAY_BOUNDARY_POLICY');
    expect(R087_PRECONDITIONS).toContain('SOLAR_TERM_BOUNDARY_POLICY');
    expect(R087_PRECONDITIONS).toContain('CALCULATOR_EPHEMERIS_VERSION');
  });

  it('covers hour, day, solar-term, and interior-control perturbations', () => {
    expect(R087_PERTURBATION_FAMILIES.map((x)=>x.id)).toEqual([
      'HOUR_BRANCH_BOUNDARY','DAY_BOUNDARY','SOLAR_TERM_BOUNDARY','INTERIOR_CONTROL',
    ]);
  });

  it('requires calculation and interpretation deltas to be recorded separately', () => {
    expect(R087_REQUIRED_OUTPUTS).toEqual([
      'TIMESTAMP_DELTA',
      'FOUR_PILLAR_DELTA',
      'RESEARCH_CANDIDATE_STATE_DELTA',
      'INTERPRETATION_CLAIM_DELTA',
      'EXPECTED_UNDER_PINNED_POLICY',
    ]);
  });

  it('does not claim robustness before actual execution', () => {
    expect(R087_AUTHORITY).toEqual({
      status:'TEST_MANIFEST_READY_EXECUTION_PENDING',
      executionPending:true,
      robustnessClaimAuthorized:false,
      calculatorAuthorityPromoted:false,
      productionAuthorityPromoted:false,
    });
  });
});
