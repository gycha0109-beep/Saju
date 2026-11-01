import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { SharedFaceObservationBundleV3 } from './contracts.js';
import {
  evaluateStaticFaceResearchRules,
  type FaceStaticResearchRuleInput,
} from './static-research-rule-runtime.js';

function fixture(): FaceStaticResearchRuleInput {
  return JSON.parse(
    readFileSync(
      new URL('../../../test/fixtures/face-static-research-snapshot.json', import.meta.url),
      'utf8',
    ),
  ) as FaceStaticResearchRuleInput;
}
type Metric = SharedFaceObservationBundleV3['geometry']['metrics'][number];
function withMetrics(
  input: FaceStaticResearchRuleInput,
  metrics: readonly Metric[],
): FaceStaticResearchRuleInput {
  return { ...input, observation: { ...input.observation, geometry: { metrics } } };
}

describe('static research snapshot -> existing operation -> registered rules', () => {
  it.each([
    [[0.4, 0.35, 0.25], 'upper_longest', 'upper_longest'],
    [[0.25, 0.4, 0.35], 'middle_longest', 'middle_longest'],
    [[0.25, 0.35, 0.4], 'lower_longest', 'lower_longest'],
    [[0.4, 0.4, 0.2], 'upper_middle_tie_longest', 'no_unique_longest'],
    [[0.4, 0.2, 0.4], 'upper_lower_tie_longest', 'no_unique_longest'],
    [[0.2, 0.4, 0.4], 'middle_lower_tie_longest', 'no_unique_longest'],
    [[0.3, 0.3, 0.3], 'all_equal_exact', 'exact_equal_measurement'],
  ] as const)('connects %j to the existing %s rule', (lengths, relation, pattern) => {
    const input = fixture();
    const metrics = input.observation.geometry.metrics.map((metric, index) => ({
      ...metric,
      value: lengths[index]!,
    }));
    const result = evaluateStaticFaceResearchRules(withMetrics(input, metrics));
    expect(result.operationalization.relation).toBe(relation);
    expect(result.evaluations).toHaveLength(5);
    const matches = result.evaluations.filter((entry) => entry.outcome === 'matched');
    expect(matches).toHaveLength(1);
    expect(matches[0]!.output!.pattern).toBe(pattern);
    expect(matches[0]!.methodologyPackRef).toBe('pack.face.research_v0@0.2.0');
    expect(matches[0]!.sourceRefs.length).toBeGreaterThan(0);
  });

  it('retains snapshot/version/evidence provenance without retaining the mutable source', () => {
    const input = fixture();
    const result = evaluateStaticFaceResearchRules(input);
    expect(result.sourceSnapshotRef).toBe(input.sourceSnapshotRef);
    expect(result.observationVersions).toEqual({
      schemaVersion: input.observation.schemaVersion,
      capabilityVersion: input.observation.capabilityVersion,
      extractorVersion: input.observation.extractorVersion,
      modelVersion: input.observation.modelVersion,
    });
    expect(result.evidenceRefs).toEqual(input.observation.evidenceRefs);
    expect(result).toEqual(evaluateStaticFaceResearchRules(input));
    const reordered = withMetrics(input, [...input.observation.geometry.metrics].reverse());
    expect(evaluateStaticFaceResearchRules(reordered)).toEqual(result);
    expect(Object.isFrozen(result.operationalization)).toBe(true);
    expect(Object.isFrozen(result.evaluations)).toBe(true);
    expect(Object.isFrozen(result.observationVersions)).toBe(true);
    (input.observation.evidenceRefs as string[]).push('later.reference');
    expect(result.evidenceRefs).toHaveLength(1);
  });

  it('withholds the operation on missing or wrong-version metrics; never aliases a neutral metric', () => {
    const input = fixture();
    for (const metrics of [
      input.observation.geometry.metrics.slice(1),
      input.observation.geometry.metrics.map((metric, index) =>
        index === 0 ? { ...metric, metricVersion: '9.0.0' } : metric,
      ),
      input.observation.geometry.metrics.map((metric, index) =>
        index === 0 ? { ...metric, metricKey: 'neutral.face.upper_span' } : metric,
      ),
    ]) {
      const result = evaluateStaticFaceResearchRules(withMetrics(input, metrics));
      expect(result.operationalization.relation).toBeNull();
      expect(result.operationalization.missingMetricRefs).toEqual([
        'metric.shenxiang.three_divisions.upper_length@0.1.0',
      ]);
      expect(
        result.evaluations.every(
          (entry) => entry.outcome === 'unavailable' && entry.output === null,
        ),
      ).toBe(true);
    }
  });

  it('honors declared region unavailability while preserving other-region availability', () => {
    const input = fixture();
    const limited = (regions: string[]): FaceStaticResearchRuleInput => ({
      ...input,
      observation: {
        ...input.observation,
        eligibility: { ...input.observation.eligibility, status: 'section_limited' },
        quality: { ...input.observation.quality, occludedRegions: regions },
      },
    });
    const upperHidden = evaluateStaticFaceResearchRules(limited(['upper']));
    expect(upperHidden.observationState).toBe('section_limited');
    expect(upperHidden.operationalization.unavailableRegionKeys).toEqual(['upper']);
    expect(upperHidden.operationalization.relation).toBeNull();
    const unrelated = evaluateStaticFaceResearchRules(limited(['ear']));
    expect(unrelated.observationState).toBe('section_limited');
    expect(unrelated.operationalization.relation).toBe('upper_longest');
    expect(unrelated.operationalization.unavailableRegionKeys).toEqual([]);
  });

  it('preserves producer ineligibility instead of executing present values', () => {
    const input = fixture();
    const result = evaluateStaticFaceResearchRules({
      ...input,
      observation: {
        ...input.observation,
        eligibility: { ...input.observation.eligibility, status: 'ineligible' },
      },
    });
    expect(result.observationState).toBe('recapture_required');
    expect(result.operationalization.missingMetricRefs).toHaveLength(3);
    expect(result.evaluations.every((entry) => entry.outcome === 'unavailable')).toBe(true);
  });

  it('does not create a quality threshold, near-equal band, rank or production authority', () => {
    const input = fixture();
    const metrics = input.observation.geometry.metrics.map((metric, index) => ({
      ...metric,
      value: index === 0 ? 0.3500000001 : index === 1 ? 0.35 : 0.3,
      confidence: 0,
      viewAgreement: 0,
    }));
    const result = evaluateStaticFaceResearchRules(withMetrics(input, metrics));
    expect(result.operationalization.relation).toBe('upper_longest');
    expect(result).toMatchObject({
      status: 'research_only',
      assertionAuthority: 'research_fixture',
      productionExecutionAuthorized: false,
      traditionalBindingIssued: false,
      characterPublicationAuthorized: false,
    });
    expect(result.evaluations.every((entry) => entry.executionStatus === 'research')).toBe(true);
    expect(result).not.toHaveProperty('claims');
    expect(result).not.toHaveProperty('narrative');
    expect(result).not.toHaveProperty('ranking');
  });

  it('does not serialize unrelated observations, color, raw landmarks or numeric measurements', () => {
    const input = fixture();
    const marker = 'PRIVATE_SOURCE_MARKER';
    const result = evaluateStaticFaceResearchRules({
      ...withMetrics(
        input,
        input.observation.geometry.metrics.map((metric) => ({
          ...metric,
          sourceLandmarks: [911, 912],
        })),
      ),
      observation: {
        ...input.observation,
        geometry: {
          metrics: input.observation.geometry.metrics.map((metric) => ({
            ...metric,
            sourceLandmarks: [911, 912],
          })),
        },
        observations: { outline: { raw: marker }, colorAppearance: { text: marker } },
      },
    });
    const serialized = JSON.stringify(result);
    expect(serialized).not.toContain(marker);
    expect(serialized).not.toContain('sourceLandmarks');
    expect(serialized).not.toContain('confidence');
    expect(serialized).not.toContain('0.35');
  });

  it('rejects unit drift, duplicate metrics, invalid numbers and aggregation overflow', () => {
    const input = fixture();
    const first = input.observation.geometry.metrics[0]!;
    expect(() =>
      evaluateStaticFaceResearchRules(
        withMetrics(input, [...input.observation.geometry.metrics, first]),
      ),
    ).toThrow(/duplicate/u);
    expect(() =>
      evaluateStaticFaceResearchRules(
        withMetrics(input, [
          { ...first, unit: 'ratio' },
          ...input.observation.geometry.metrics.slice(1),
        ]),
      ),
    ).toThrow(/unit/u);
    for (const value of [NaN, Infinity, 0, -1]) {
      expect(() =>
        evaluateStaticFaceResearchRules(
          withMetrics(input, [{ ...first, value }, ...input.observation.geometry.metrics.slice(1)]),
        ),
      ).toThrow();
    }
    expect(() =>
      evaluateStaticFaceResearchRules(
        withMetrics(
          input,
          input.observation.geometry.metrics.map((metric) => ({
            ...metric,
            value: Number.MAX_VALUE,
          })),
        ),
      ),
    ).toThrow(/overflow/u);
  });

  it('rejects injected authority/registry/operation, empty provenance and executable input', () => {
    const input = fixture();
    for (const extra of [
      { executionStatus: 'production_authorized' },
      { registry: {} },
      { operation: () => 'upper_longest' },
    ]) {
      expect(() => evaluateStaticFaceResearchRules({ ...input, ...extra })).toThrow(/unexpected/u);
    }
    expect(() =>
      evaluateStaticFaceResearchRules({
        ...input,
        assertionAuthority: 'production_authorized',
      } as unknown as FaceStaticResearchRuleInput),
    ).toThrow(/authority/u);
    expect(() => evaluateStaticFaceResearchRules({ ...input, sourceSnapshotRef: '' })).toThrow();
    expect(() =>
      evaluateStaticFaceResearchRules({
        ...input,
        observation: { ...input.observation, evidenceRefs: [] },
      }),
    ).toThrow(/evidence/u);
    let called = false;
    const accessor = Object.defineProperty({ ...input }, 'observation', {
      enumerable: true,
      get() {
        called = true;
        return input.observation;
      },
    });
    expect(() => evaluateStaticFaceResearchRules(accessor)).toThrow(/executable/u);
    expect(called).toBe(false);
    expect(() => evaluateStaticFaceResearchRules(withMetrics(input, Array(3) as Metric[]))).toThrow(
      /array/u,
    );
  });
});
