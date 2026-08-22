import { describe, expect, test } from 'vitest';
import {
  INTERPRETATION_METHODOLOGY_SOURCES,
  RESEARCH_INTERPRETATION_METHODOLOGIES,
  getResearchInterpretationMethodology,
} from '../src/index.js';

describe('research interpretation methodology catalog', () => {
  test('methodology IDs and semantic questions are unique', () => {
    const ids = RESEARCH_INTERPRETATION_METHODOLOGIES.map((item) => item.methodologyId);
    const questions = RESEARCH_INTERPRETATION_METHODOLOGIES.map((item) => item.semanticQuestion);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(questions).size).toBe(questions.length);
  });

  test('every methodology remains research-only and forbids a global YONGSHIN claim', () => {
    for (const methodology of RESEARCH_INTERPRETATION_METHODOLOGIES) {
      expect(methodology.status).toBe('research');
      expect(methodology.forbiddenClaimTypes).toContain('YONGSHIN');
      expect(methodology.allowedClaimTypes).not.toContain('YONGSHIN');
      expect(methodology.allowedClaimTypes.length).toBeGreaterThan(0);
      expect(methodology.sourceLayerNotes.length).toBeGreaterThan(0);
    }
  });

  test('all methodology source references resolve to the source catalog', () => {
    const sourceIds = new Set(Object.values(INTERPRETATION_METHODOLOGY_SOURCES).map((source) => source.sourceId));
    for (const methodology of RESEARCH_INTERPRETATION_METHODOLOGIES) {
      expect(methodology.sourceIds.length).toBeGreaterThan(0);
      for (const sourceId of methodology.sourceIds) {
        expect(sourceIds.has(sourceId), `${methodology.methodologyId} missing ${sourceId}`).toBe(true);
      }
    }
  });

  test('strength, climate, flow, and geju output namespaces stay disjoint', () => {
    const geju = getResearchInterpretationMethodology('M-GEJU-MONTH-ORDER');
    const strength = getResearchInterpretationMethodology('M-STRENGTH-FUYI');
    const climate = getResearchInterpretationMethodology('M-CLIMATE-TIAOHOU');
    const flow = getResearchInterpretationMethodology('M-FLOW-TONGGUAN');

    const sets = [geju, strength, climate, flow].map((methodology) => new Set(methodology.allowedClaimTypes));
    for (let leftIndex = 0; leftIndex < sets.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < sets.length; rightIndex += 1) {
        const left = sets[leftIndex];
        const right = sets[rightIndex];
        if (left === undefined || right === undefined) throw new Error('methodology set missing');
        expect([...left].filter((claimType) => right.has(claimType))).toEqual([]);
      }
    }
  });

  test('climate methodology is not modeled as day-master strength', () => {
    const climate = getResearchInterpretationMethodology('M-CLIMATE-TIAOHOU');
    expect(climate.family).toBe('yongshin');
    expect(climate.allowedClaimTypes).toEqual(['CLIMATE_BALANCE_NEED', 'TIAOHOU_CLIMATE_USE']);
    expect(climate.allowedClaimTypes).not.toContain('DAY_MASTER_STRENGTH_CLASSIFICATION');
  });

  test('month-order methodology separates candidate state from established pattern state', () => {
    const geju = getResearchInterpretationMethodology('M-GEJU-MONTH-ORDER');
    expect(geju.allowedClaimTypes).toContain('GEJU_CANDIDATE');
    expect(geju.allowedClaimTypes).toContain('GEJU_ESTABLISHMENT_STATE');
  });
});
