import { describe, expect, it } from 'vitest';
import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import {
  createSyntheticMechanicsPrimaryMetricBindingFR246,
  prepareDigestlessSameFramePrimaryMetricBindingFR246,
} from './observable-morphology-digestless-same-frame-primary-metric-binding-fr246.js';

function eyeFixture() {
  const points = Array.from({ length: 468 }, () => ({ x: 0, y: 0, z: 0 }));
  points[1] = { x: -5, y: 0, z: 0 };
  points[2] = { x: 5, y: 0, z: 0 };

  const cycles = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]),
  );
  const negative = cycles[0]!;
  const positive = cycles[1]!;

  negative.forEach((vertex, index) => {
    const t = index / (negative.length - 1);
    points[vertex] = {
      x: -2 + t,
      y: index === 0 ? 1 : index === negative.length - 1 ? 0 : 0.4,
      z: 0,
    };
  });
  positive.forEach((vertex, index) => {
    const t = index / (positive.length - 1);
    points[vertex] = {
      x: 1 + t,
      y: index === 0 ? 0 : index === positive.length - 1 ? 1 : 0.4,
      z: 0,
    };
  });

  return points;
}

describe('FR246 digestless same-frame primary metric binding', () => {
  it('defers the frozen primary metric until extractor invocation and binds exact JPEG bytes', () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 1, 2, 3, 0xff, 0xd9]);
    const binding = createSyntheticMechanicsPrimaryMetricBindingFR246({
      providerRunRef: 'provider:fr246:test',
      expectedJpegBytes: jpeg,
      metricLandmarks: eyeFixture(),
    });

    expect(binding.empiricalEvidenceEligible).toBe(false);
    expect(binding.realParticipantExecutionEligible).toBe(false);

    const metric = binding.primaryMetricExtractor(Uint8Array.from(jpeg));
    expect(metric.metricRef)
      .toBe('neutral.eye.outer_corner_tilt.mean_degrees@0.1.0');
    expect(metric.unit).toBe('degree');
    expect(Number.isFinite(metric.value)).toBe(true);

    expect(() => binding.primaryMetricExtractor(Uint8Array.from(jpeg)))
      .toThrow(/single-use/u);
  });

  it('rejects a different JPEG without hashing either payload', () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 1, 2, 0xff, 0xd9]);
    const binding = createSyntheticMechanicsPrimaryMetricBindingFR246({
      providerRunRef: 'provider:fr246:mismatch',
      expectedJpegBytes: jpeg,
      metricLandmarks: eyeFixture(),
    });

    expect(() => binding.primaryMetricExtractor(
      new Uint8Array([0xff, 0xd8, 9, 9, 0xff, 0xd9]),
    )).toThrow(/do not match the exact FR244 JPEG/u);
    binding.dispose();
  });

  it('disposal prevents later extraction and releases ephemeral state', () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 1, 0xff, 0xd9]);
    const binding = createSyntheticMechanicsPrimaryMetricBindingFR246({
      providerRunRef: 'provider:fr246:dispose',
      expectedJpegBytes: jpeg,
      metricLandmarks: eyeFixture(),
    });

    binding.dispose();
    expect(() => binding.primaryMetricExtractor(Uint8Array.from(jpeg)))
      .toThrow(/already been disposed/u);
  });

  it('fails closed before provider execution when exact FR77 metadata is absent', async () => {
    await expect(prepareDigestlessSameFramePrimaryMetricBindingFR246({
      image: Object.freeze({ frame: true }),
      frameWidth: 640,
      frameHeight: 480,
      providerRunRef: 'provider:fr246:invalid-metadata',
      jpegBytes: new Uint8Array([0xff, 0xd8, 0xff, 0xd9]),
      geometryMetadataPbtxt: 'not-the-release-exact-metadata',
      parity: {} as never,
    })).rejects.toThrow();
  });
});
