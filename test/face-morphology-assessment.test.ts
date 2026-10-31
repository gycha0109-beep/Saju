import { describe, it, expect } from 'vitest';
import {
  computeMorphology,
  validateMorphology,
  unavailableMorphology,
} from '../tools/face-reading/two-view/morphology-geometry.mjs';
import { assessMorphology } from '../tools/face-reading/two-view/morphology-assessment.mjs';
import { readingCatalogue } from '../tools/face-reading/two-view/reading-catalogue.mjs';
import {
  validateParsingSummary,
  PARSING_EYE_VERSION,
} from '../tools/face-reading/two-view/parsing-contract.mjs';
import { unavailableEyeDirection } from '../tools/face-reading/two-view/eye-direction.mjs';
function fixture() {
  const landmarks = Array.from({ length: 478 }, () => ({ x: 0.5, y: 0.5 }));
  let next = 0;
  function cycle(ps: number[][]) {
    const ids = ps.map(([x, y]) => {
      const id = next++;
      landmarks[id] = { x: x!, y: y! };
      return id;
    });
    return ids.map((start, i) => ({ start, end: ids[(i + 1) % ids.length]! }));
  }
  const eyeA = cycle([
      [0.2, 0.4],
      [0.3, 0.36],
      [0.4, 0.4],
      [0.3, 0.44],
    ]),
    eyeB = cycle([
      [0.6, 0.4],
      [0.7, 0.36],
      [0.8, 0.4],
      [0.7, 0.44],
    ]);
  const browA = cycle([
      [0.18, 0.3],
      [0.3, 0.28],
      [0.42, 0.3],
      [0.3, 0.32],
    ]),
    browB = cycle([
      [0.58, 0.3],
      [0.7, 0.28],
      [0.82, 0.3],
      [0.7, 0.32],
    ]);
  const mouth = [
    ...cycle([
      [0.3, 0.7],
      [0.5, 0.6],
      [0.7, 0.7],
      [0.5, 0.8],
    ]),
    ...cycle([
      [0.35, 0.7],
      [0.5, 0.64],
      [0.65, 0.7],
      [0.5, 0.72],
    ]),
  ];
  return {
    landmarks,
    width: 1000,
    height: 1000,
    topology: { eyeA, eyeB, browA, browB, mouth },
    viewRole: 'frontal' as const,
    checks: { eyes: true, brows: true, lips: true, nose: true },
    nosePoints: [
      { x: 450, y: 450, clipped: false },
      { x: 550, y: 580, clipped: false },
    ],
  };
}
describe('visible morphology measurements and item-first assessment', () => {
  it('measures two paired brows and separates upper/lower lip from mouth opening', () => {
    const result = computeMorphology(fixture());
    expect(result.browSpan).toMatchObject({ status: 'available', ratios: [1.2, 1.2] });
    expect(result.lipBalance.status).toBe('available');
    if (result.lipBalance.status !== 'available') throw Error();
    expect(result.lipBalance.upper).toBeCloseTo(0.1);
    expect(result.lipBalance.lower).toBeCloseTo(0.2);
    expect(result.lipBalance.opening).toBeCloseTo(0.2);
    expect(result.noseExtent).toEqual({
      status: 'available',
      widthToEyeSpacing: 0.25,
      heightToEyeSpacing: 0.325,
    });
  });
  it('preserves geometry across translation, rotation and uniform pixel scale', () => {
    const base = fixture(),
      expected = computeMorphology(base);
    const transform = (x: number, y: number) => ({
      x: 200 + 0.6 * (x * Math.cos(0.2) - y * Math.sin(0.2)),
      y: 100 + 0.6 * (x * Math.sin(0.2) + y * Math.cos(0.2)),
    });
    const changed = computeMorphology({
      ...base,
      landmarks: base.landmarks.map((p) => {
        const n = transform(p.x * 1000, p.y * 1000);
        return { x: n.x / 1000, y: n.y / 1000 };
      }),
      nosePoints: base.nosePoints.map((p) => ({ ...transform(p.x, p.y), clipped: false })),
    });
    if (
      changed.lipBalance.status !== 'available' ||
      expected.lipBalance.status !== 'available' ||
      changed.browSpan.status !== 'available'
    )
      throw Error();
    expect(changed.lipBalance.upper).toBeCloseTo(expected.lipBalance.upper);
    expect(changed.lipBalance.lower).toBeCloseTo(expected.lipBalance.lower);
    expect(changed.browSpan.ratios[0]).toBeCloseTo(1.2);
  });
  it('withholds incompatible views/classes, clipped boundaries and nonnested lip loops', () => {
    const f = fixture();
    expect(computeMorphology({ ...f, viewRole: 'profile' }).lipBalance).toMatchObject({
      reason: 'PROFILE_VIEW',
    });
    expect(
      computeMorphology({ ...f, checks: { ...f.checks, lips: false } }).lipBalance,
    ).toMatchObject({ reason: 'CLASS_DISAGREEMENT' });
    expect(
      computeMorphology({ ...f, checks: { ...f.checks, eyes: false } }).browSpan,
    ).toMatchObject({ reason: 'CLASS_DISAGREEMENT' });
    f.landmarks[f.topology.browA[0]!.start]!.x = 0;
    expect(computeMorphology(f).browSpan).toMatchObject({ reason: 'CLIPPED' });
    f.landmarks[f.topology.mouth[4]!.start]!.y = 0.1;
    expect(computeMorphology(f).lipBalance).toMatchObject({ reason: 'SECTION_UNAVAILABLE' });
  });
  it('rejects forged role/authority/negative/nonfinite evidence and strips coordinates', () => {
    const result = computeMorphology(fixture());
    expect(() => validateMorphology(result, { viewRole: 'profile' })).toThrow();
    expect(() => validateMorphology({ ...result, traditionalBindingAuthorized: true })).toThrow();
    expect(() =>
      validateMorphology({
        ...result,
        lipBalance: { status: 'available', upper: NaN, lower: 0.2, opening: 0 },
      }),
    ).toThrow();
    expect(() =>
      validateMorphology({ ...result, browSpan: { status: 'available', ratios: [-1, 1] } }),
    ).toThrow();
    expect(JSON.stringify(validateMorphology({ ...result, rawPoints: [1, 2] }))).not.toContain(
      'rawPoints',
    );
  });
  it('withholds lip thickness when the inner contour exits the outer polygon inside its bounds', () => {
    const f = fixture();
    // Still inside the outer bounding box and ordered at the centre section,
    // but above the diamond's actual upper-left edge.
    f.landmarks[f.topology.mouth[4]!.start] = { x: 0.35, y: 0.64 };
    expect(computeMorphology(f).lipBalance).toMatchObject({
      status: 'unavailable',
      reason: 'SECTION_UNAVAILABLE',
    });
  });
  it('rejects incomplete brow pairs before assessment can display them', () => {
    const result = computeMorphology(fixture());
    const ratios = Array<number>(2);
    ratios[0] = 1.2;
    expect(() =>
      validateMorphology({ ...result, browSpan: { status: 'available', ratios } }),
    ).toThrow('PARSING_SUMMARY_INVALID');
  });
  it.each([
    [
      'an edge crossing a concave outer boundary',
      [
        [0.3, 0.6],
        [0.7, 0.6],
        [0.7, 0.8],
        [0.3, 0.8],
        [0.3, 0.74],
        [0.43, 0.74],
        [0.43, 0.66],
        [0.3, 0.66],
      ],
      [
        [0.35, 0.62],
        [0.65, 0.62],
        [0.65, 0.78],
        [0.35, 0.78],
      ],
    ],
    [
      'a self-crossing inner boundary',
      [
        [0.3, 0.6],
        [0.7, 0.6],
        [0.7, 0.8],
        [0.3, 0.8],
      ],
      [
        [0.35, 0.65],
        [0.65, 0.75],
        [0.65, 0.65],
        [0.35, 0.75],
      ],
    ],
    [
      'a touching inner boundary',
      [
        [0.3, 0.6],
        [0.7, 0.6],
        [0.7, 0.8],
        [0.3, 0.8],
      ],
      [
        [0.3, 0.7],
        [0.5, 0.65],
        [0.65, 0.7],
        [0.5, 0.75],
      ],
    ],
  ])('withholds ambiguous nested lips: %s', (_name, outer, inner) => {
    const f = fixture();
    let next = 100;
    f.topology.mouth = [outer, inner].flatMap((ring) => {
      const ids = ring.map(([x, y]) => {
        const id = next++;
        f.landmarks[id] = { x: x!, y: y! };
        return id;
      });
      return ids.map((start, i) => ({ start, end: ids[(i + 1) % ids.length]! }));
    });
    const result = computeMorphology(f);
    expect(result.lipBalance).toMatchObject({
      status: 'unavailable',
      reason: 'SECTION_UNAVAILABLE',
    });
    // A malformed mouth does not suppress independently supported regions.
    expect(result.browSpan.status).toBe('available');
    expect(result.noseExtent.status).toBe('available');
  });
  it('preserves nested lip measurements under reflection and topology permutation', () => {
    const f = fixture(),
      expected = computeMorphology(f);
    f.landmarks = f.landmarks.map((p) => ({ ...p, x: 1 - p.x }));
    f.topology.mouth = f.topology.mouth
      .toReversed()
      .map(({ start, end }) => ({ start: end, end: start }));
    const actual = computeMorphology(f);
    expect(actual.lipBalance.status).toBe('available');
    if (actual.lipBalance.status !== 'available' || expected.lipBalance.status !== 'available')
      throw Error();
    expect(actual.lipBalance.upper).toBeCloseTo(expected.lipBalance.upper);
    expect(actual.lipBalance.lower).toBeCloseTo(expected.lipBalance.lower);
    expect(actual.lipBalance.opening).toBeCloseTo(expected.lipBalance.opening);
  });
  it('classifies observable comparisons and keeps all eight distinct items with missing requirements', () => {
    const cards = assessMorphology({
      record: { captureRef: 'one', viewRole: 'frontal' },
      result: { parsing: { morphology: computeMorphology(fixture()) } },
      catalogue: readingCatalogue(),
    });
    expect(cards).toHaveLength(8);
    expect(new Set(cards.map((c) => c.id)).size).toBe(8);
    expect(cards.find((c) => c.id === 'brows')).toMatchObject({
      status: 'observed',
      classification: 'both_model_brows_wider_than_eyes',
    });
    expect(cards.find((c) => c.id === 'lips')).toMatchObject({
      status: 'observed',
      classification: 'lower_central_model_lip_thicker',
    });
    for (const id of ['forehead', 'cheeks'])
      expect(cards.find((c) => c.id === id)).toMatchObject({
        status: 'unavailable',
        classification: null,
      });
    expect(
      cards.every((c) => c.traditionalBindingAuthorized === false && c.missing.length > 0),
    ).toBe(true);
    expect(JSON.stringify(cards)).not.toMatch(
      /matchedRuleIds|meaningSummary|personalityFact|wealth|temperament/,
    );
  });
  it('does not reuse a metric from another photo/view or invent history/new evidence', () => {
    const record = { captureRef: 'one', viewRole: 'frontal' as const },
      catalogue = readingCatalogue();
    const cards = assessMorphology({
      record,
      result: {
        metrics: [
          {
            captureRef: 'other',
            viewRole: 'frontal',
            methodVersion: 'frontal-image-plane-model-geometry@0.1.0',
            metricKey: 'engineering.frontal.lower_oval_band_ratio',
            status: 'available',
            value: 0.6,
          },
        ],
      },
      catalogue,
    });
    expect(cards.find((c) => c.id === 'jaw')?.status).toBe('unavailable');
    const old = assessMorphology({
      record,
      result: { parsing: { morphology: computeMorphology(fixture()) }, previousParsing: {} },
      catalogue,
      previous: true,
    });
    expect(old.find((c) => c.id === 'lips')?.observation).toContain('이전 분할 결과');
    expect(old.every((c) => c.status === 'unavailable')).toBe(true);
  });
  it('retains 0.6 eye evidence read-only without inventing 0.7 geometry', () => {
    const old = {
      methodVersion: PARSING_EYE_VERSION,
      candidateOnly: true,
      status: 'completed',
      counts: [512 * 512, ...Array<number>(18).fill(0)],
      interfacePixels: 0,
      earRefinement: { status: 'unavailable', pixels: 0, reason: 'NO_SINGLE_FACE' },
      instanceRefinement: { status: 'unavailable', reason: 'NO_FACES' },
      regionScreening: {
        backgroundRemoved: 0,
        regions: Object.fromEntries(
          ['skin', 'nose', 'lips', 'brows', 'ears'].map((id) => [
            id,
            { status: 'unchecked', removedPixels: 0 },
          ]),
        ),
      },
      profile: { status: 'not_requested' },
      eyeDirection: unavailableEyeDirection('NO_SINGLE_FACE'),
    };
    const restored = validateParsingSummary(old, { allowLegacy: true, viewRole: 'frontal' });
    if (restored.status !== 'completed') throw Error();
    expect(restored.eyeDirection).toEqual(old.eyeDirection);
    expect(restored.morphology).toBeUndefined();
    expect(() => validateParsingSummary(old)).toThrow();
    expect(() =>
      validateMorphology(unavailableMorphology('PROFILE_VIEW'), { viewRole: 'frontal' }),
    ).toThrow();
  });
});
