import { describe, expect, it } from 'vitest';
import {
  R088_AUTHORITY,
  R088_REJECTED_SHORTCUTS,
  R088_REQUIRED_OUTPUTS,
  R088_SENSITIVITY_DIMENSIONS,
  R088_TIMEZONE_SOLAR_BOUNDARY_VERSION,
  R088_TRANSFORMATION_LAYERS,
} from '../src/research/general-natal-timezone-solar-boundary.js';

describe('R088 timezone / solar-time boundary sensitivity protocol', () => {
  it('keeps civil-time, optional solar-time, and pillar calculation as separate layers', () => {
    expect(R088_TIMEZONE_SOLAR_BOUNDARY_VERSION).toBe('0.1.0-research');
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

  it('records exact transformation cause with pillar and research-state deltas', () => {
    expect(R088_REQUIRED_OUTPUTS).toContain('FOUR_PILLAR_DELTA');
    expect(R088_REQUIRED_OUTPUTS).toContain('DOWNSTREAM_RESEARCH_STATE_DELTA');
    expect(R088_REQUIRED_OUTPUTS).toContain('BOUNDARY_AND_CAUSE');
  });

  it('rejects historical-offset guessing and silent solar correction', () => {
    expect(R088_REJECTED_SHORTCUTS).toContain('CURRENT_OFFSET_FOR_HISTORICAL_DATE');
    expect(R088_REJECTED_SHORTCUTS).toContain('SOLAR_CORRECTION_BY_DEFAULT');
    expect(R088_REJECTED_SHORTCUTS).toContain('DOUBLE_APPLY_SOLAR_CORRECTION');
  });

  it('keeps execution and Production authority pending', () => {
    expect(R088_AUTHORITY).toEqual({
      status:'TEST_MANIFEST_READY_EXECUTION_PENDING',
      executionPending:true,
      defaultSolarCorrectionAuthorized:false,
      historicalTimezoneGuessAuthorized:false,
      robustnessClaimAuthorized:false,
      productionAuthorityPromoted:false,
    });
  });
});
