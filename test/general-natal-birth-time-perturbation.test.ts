import { describe, expect, it } from 'vitest';
import {
  R087_AUTHORITY,
  R087_BIRTH_TIME_PERTURBATION_VERSION,
  R087_PERTURBATION_FAMILIES,
  R087_PINNED_CALCULATION_BASELINE,
  R087_PRECONDITIONS,
  R087_REQUIRED_OUTPUTS,
} from '../src/research/general-natal-birth-time-perturbation.js';

describe('R087 birth-time perturbation sensitivity protocol', () => {
  it('pins the currently authorized production calculation baseline', () => {
    expect(R087_BIRTH_TIME_PERTURBATION_VERSION).toBe('0.2.0-research');
    expect(R087_PINNED_CALCULATION_BASELINE).toEqual(expect.objectContaining({
      calculationPolicyId: 'myeonghwa-production-civil-midnight-v1',
      engineName: 'manseryeok',
      engineVersion: '2.0.0',
      adapterVersion: '0.1.0',
      timeZone: 'Asia/Seoul',
      dayBoundary: 'midnight',
      trueSolarCorrection: false,
      productionCalculationAuthorityPinned: true,
    }));
  });

  it('keeps full replay gated by reproducible input and interpretation authority', () => {
    expect(R087_PRECONDITIONS).toContain('INDEPENDENTLY_REPRODUCIBLE_TIMESTAMP');
    expect(R087_PRECONDITIONS).toContain('CALCULATION_POLICY_ID_VERSION');
    expect(R087_PRECONDITIONS).toContain('CALCULATOR_ENGINE_ADAPTER_VERSION');
    expect(R087_PRECONDITIONS).toContain('INTERPRETATION_COMPARISON_AUTHORITY');
  });

  it('covers hour, day, solar-term, and interior-control perturbations', () => {
    expect(R087_PERTURBATION_FAMILIES.map((x)=>x.id)).toEqual([
      'HOUR_BRANCH_BOUNDARY','DAY_BOUNDARY','SOLAR_TERM_BOUNDARY','INTERIOR_CONTROL',
    ]);
    expect(R087_PERTURBATION_FAMILIES.find((x)=>x.id === 'DAY_BOUNDARY')).toEqual(
      expect.objectContaining({ productionBaseline:'MIDNIGHT', alternatePolicyMustRemainSeparate:true }),
    );
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

  it('does not claim robustness or promote interpretation authority before execution', () => {
    expect(R087_AUTHORITY).toEqual({
      status:'TEST_MANIFEST_READY_CALCULATION_AUTHORITY_PINNED_FULL_EXECUTION_PENDING',
      executionPending:true,
      executionPendingReasons:[
        'GOVERNED_REPRODUCIBLE_INPUT_FIXTURES_NOT_PINNED',
        'INTERPRETATION_COMPARISON_AUTHORITY_NOT_PINNED',
      ],
      calculationAuthorityPinned:true,
      robustnessClaimAuthorized:false,
      historicalInputImputationAuthorized:false,
      alternatePolicyPromotionAuthorized:false,
      productionInterpretationAuthorityPromoted:false,
    });
  });
});
