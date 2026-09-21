import { describe, expect, it } from 'vitest';
import {
  R088_AUTHORITY,
  R088_PINNED_PRODUCTION_BASELINE,
  R088_REJECTED_SHORTCUTS,
  R088_REQUIRED_OUTPUTS,
  R088_SENSITIVITY_DIMENSIONS,
  R088_TIMEZONE_SOLAR_BOUNDARY_VERSION,
  R088_TRANSFORMATION_LAYERS,
} from '../src/research/general-natal-timezone-solar-boundary.js';

describe('R088 timezone / solar-time boundary sensitivity protocol', () => {
  it('pins the existing Production calculation baseline without promoting variants', () => {
    expect(R088_TIMEZONE_SOLAR_BOUNDARY_VERSION).toBe('0.2.0-research');
    expect(R088_PINNED_PRODUCTION_BASELINE).toEqual(expect.objectContaining({
      calculationPolicyId:'myeonghwa-production-civil-midnight-v1',
      engineVersion:'2.0.0',
      adapterVersion:'0.1.0',
      timeZone:'Asia/Seoul',
      dayBoundary:'midnight',
      trueSolarCorrection:false,
      productionCalculationAuthorityPinned:true,
    }));
  });

  it('keeps civil-time, optional solar-time, and pillar calculation as separate layers', () => {
    expect(R088_TRANSFORMATION_LAYERS).toEqual([
      'SOURCE_LOCAL_WALL_CLOCK',
      'HISTORICAL_CIVIL_TIME_RESOLUTION',
      'OPTIONAL_GOVERNED_SOLAR_TIME_TRANSFORMATION',
      'CALENDAR_PILLAR_CALCULATION',
    ]);
  });

  it('tests timezone, civil regime, solar policy, and boundary crossing separately', () => {
    expect(R088_SENSITIVITY_DIMENSIONS).toEqual([
      'TIMEZONE_AUTHORITY_VARIANT',
      'HISTORICAL_CIVIL_TIME_REGIME',
      'LONGITUDE_CORRECTION_POLICY',
      'APPARENT_SOLAR_COMPONENT',
      'BOUNDARY_CROSSING',
    ]);
  });

  it('records exact transformation cause with policy, pillar, and research-state deltas', () => {
    expect(R088_REQUIRED_OUTPUTS).toContain('CALCULATION_POLICY_ID_VERSION');
    expect(R088_REQUIRED_OUTPUTS).toContain('FOUR_PILLAR_DELTA');
    expect(R088_REQUIRED_OUTPUTS).toContain('DOWNSTREAM_RESEARCH_STATE_DELTA');
    expect(R088_REQUIRED_OUTPUTS).toContain('BOUNDARY_AND_CAUSE');
  });

  it('rejects historical-offset guessing, silent solar correction, and variant promotion', () => {
    expect(R088_REJECTED_SHORTCUTS).toContain('CURRENT_OFFSET_FOR_HISTORICAL_DATE');
    expect(R088_REJECTED_SHORTCUTS).toContain('SOLAR_CORRECTION_BY_DEFAULT');
    expect(R088_REJECTED_SHORTCUTS).toContain('DOUBLE_APPLY_SOLAR_CORRECTION');
    expect(R088_REJECTED_SHORTCUTS).toContain('TREAT_SENSITIVITY_POLICY_AS_PRODUCTION_DEFAULT');
  });

  it('keeps only the sensitivity experiment pending', () => {
    expect(R088_AUTHORITY).toEqual({
      status:'TEST_MANIFEST_READY_PRODUCTION_BASELINE_PINNED_VARIANT_EXECUTION_PENDING',
      executionPending:true,
      executionPendingReasons:[
        'HISTORICAL_TIMEZONE_DATA_RUNTIME_PROVENANCE_NOT_PINNED_FOR_VARIANTS',
        'SENSITIVITY_SOLAR_TIME_POLICY_NOT_PINNED',
        'GOVERNED_REPRODUCIBLE_INPUT_FIXTURES_NOT_PINNED',
        'INTERPRETATION_COMPARISON_AUTHORITY_NOT_PINNED',
      ],
      productionCalculationBaselinePinned:true,
      defaultSolarCorrectionAuthorized:false,
      historicalTimezoneGuessAuthorized:false,
      alternatePolicyPromotionAuthorized:false,
      robustnessClaimAuthorized:false,
      productionInterpretationAuthorityPromoted:false,
    });
  });
});
