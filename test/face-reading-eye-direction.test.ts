import { describe, it, expect } from 'vitest';
import {
  computeEyeDirection,
  validateEyeDirection,
  describeEyeDirection,
  unavailableEyeDirection,
  eyeClassAgreement,
} from '../tools/face-reading/two-view/eye-direction.mjs';
import { readingCatalogue } from '../tools/face-reading/two-view/reading-catalogue.mjs';
import { TRADITIONAL_MORPHOLOGY_TERMS_FR311 } from '../packages/face-reading/src/traditional-eyebrow-eye-interpretation-fr311.js';
import {
  validateParsingSummary,
  PARSING_SCREENED_VERSION,
} from '../tools/face-reading/two-view/parsing-contract.mjs';
function fixture() {
  const landmarks = Array.from({ length: 478 }, () => ({ x: 0.5, y: 0.5 }));
  let next = 0;
  function cycle(points: number[][]) {
    const ids = points.map(([x, y]) => {
      const i = next++;
      landmarks[i] = { x: x!, y: y! };
      return i;
    });
    return ids.map((start, i) => ({ start, end: ids[(i + 1) % ids.length]! }));
  }
  const topology = {
    eyeA: cycle([
      [0.25, 0.44],
      [0.325, 0.39],
      [0.4, 0.4],
      [0.325, 0.45],
    ]),
    eyeB: cycle([
      [0.6, 0.4],
      [0.675, 0.39],
      [0.75, 0.44],
      [0.675, 0.45],
    ]),
  };
  return { landmarks, topology, width: 1000, height: 1000, viewRole: 'frontal' as const };
}
describe('source-linked model eye direction observation', () => {
  it('requires class support for both eyes instead of letting one eye support the pair', () => {
    const f = fixture(),
      size = 512,
      mask = new Uint8Array(size * size),
      frame = { left: 0, top: 0, side: 1000 };
    for (const edge of f.topology.eyeA) {
      const p = f.landmarks[edge.start]!;
      mask[Math.floor(p.y * size) * size + Math.floor(p.x * size)] = 4;
    }
    expect(eyeClassAgreement(mask, size, f.landmarks, f.topology, frame, 1000, 1000)).toBe(false);
    for (const edge of f.topology.eyeB) {
      const p = f.landmarks[edge.start]!;
      mask[Math.floor(p.y * size) * size + Math.floor(p.x * size)] = 5;
    }
    expect(eyeClassAgreement(mask, size, f.landmarks, f.topology, frame, 1000, 1000)).toBe(true);
  });
  it('keeps exactly aligned synthetic endpoints aligned after floating-point rotation', () => {
    const f = fixture();
    for (const i of [0, 2, 4, 6]) f.landmarks[i]!.y = 0.4;
    for (const angle of [0, 0.2, -0.3]) {
      const landmarks = f.landmarks.map((p) => {
        const x = p.x - 0.5,
          y = p.y - 0.5;
        return {
          x: 0.5 + x * Math.cos(angle) - y * Math.sin(angle),
          y: 0.5 + x * Math.sin(angle) + y * Math.cos(angle),
        };
      });
      const result = computeEyeDirection({ ...f, landmarks });
      expect(describeEyeDirection(result).text).toContain('높이가 같습니다');
    }
  });
  it('uses image pixel geometry and never admits a traditional binding', () => {
    const f = fixture(),
      result = computeEyeDirection(f);
    expect(result.status).toBe('available');
    if (result.status !== 'available') throw Error('fixture');
    expect(result.eyes.map((e) => e.outerMinusInnerHeightRatio)).toEqual([40 / 150, 40 / 150]);
    expect(describeEyeDirection(result).text).toContain('아래');
    expect(result.traditionalBindingAuthorized).toBe(false);
    const wide = computeEyeDirection({ ...f, width: 2000 });
    if (wide.status !== 'available') throw Error('fixture');
    expect(wide.eyes[0]!.outerMinusInnerHeightRatio).toBeCloseTo(40 / 300);
  });
  it('preserves geometry under translation, uniform scaling, upright rotation and topology permutation', () => {
    const f = fixture(),
      base = computeEyeDirection(f);
    if (base.status !== 'available') throw Error('fixture');
    for (const angle of [0, 0.2, -0.3]) {
      const landmarks = f.landmarks.map((p) => {
        const x = p.x - 0.5,
          y = p.y - 0.5;
        return {
          x: 0.5 + 0.8 * (x * Math.cos(angle) - y * Math.sin(angle)),
          y: 0.5 + 0.8 * (x * Math.sin(angle) + y * Math.cos(angle)),
        };
      });
      const topology = {
        eyeA: [...f.topology.eyeA].reverse().map((e) => ({ start: e.end, end: e.start })),
        eyeB: [...f.topology.eyeB].reverse(),
      };
      const got = computeEyeDirection({ ...f, landmarks, topology });
      if (got.status !== 'available') throw Error('fixture');
      got.eyes.forEach((e, i) =>
        expect(e.outerMinusInnerHeightRatio).toBeCloseTo(
          base.eyes[i]!.outerMinusInnerHeightRatio,
          12,
        ),
      );
    }
  });
  it('swaps image positions under reflection and does not assign anatomical laterality', () => {
    const f = fixture();
    f.landmarks[4]!.y = 0.44;
    f.landmarks[6]!.y = 0.4;
    const base = computeEyeDirection(f),
      mirror = computeEyeDirection({
        ...f,
        landmarks: f.landmarks.map((p) => ({ x: 1 - p.x, y: p.y })),
      });
    if (base.status !== 'available' || mirror.status !== 'available') throw Error('fixture');
    expect(mirror.eyes[0]!.outerMinusInnerHeightRatio).toBeCloseTo(
      base.eyes[1]!.outerMinusInnerHeightRatio,
      12,
    );
    expect(describeEyeDirection(base).text).toContain('서로 다릅니다');
  });
  it('withholds profiles, clipped/collapsed boundaries, bad topology and tied endpoints', () => {
    const f = fixture();
    expect(computeEyeDirection({ ...f, viewRole: 'profile' })).toMatchObject({
      status: 'unavailable',
      reason: 'PROFILE_VIEW',
    });
    f.landmarks[0]!.x = 0;
    expect(computeEyeDirection(f)).toMatchObject({ reason: 'EYE_BOUNDARY_CLIPPED' });
    const tied = fixture();
    tied.landmarks[1]!.x = 0.25;
    expect(computeEyeDirection(tied)).toMatchObject({ reason: 'ENDPOINT_AMBIGUOUS' });
    const bad = fixture();
    bad.topology.eyeA = [];
    expect(computeEyeDirection(bad)).toMatchObject({ reason: 'TOPOLOGY_INVALID' });
  });
  it('rejects forged authority, role, side identities or angle inconsistency and discards geometry', () => {
    const result = computeEyeDirection(fixture());
    if (result.status !== 'available') throw Error('fixture');
    expect(() => validateEyeDirection({ ...result, traditionalBindingAuthorized: true })).toThrow();
    expect(() => validateEyeDirection(result, { viewRole: 'profile' })).toThrow();
    expect(() =>
      validateEyeDirection({ ...result, eyes: [result.eyes[1], result.eyes[0]] }),
    ).toThrow();
    expect(() =>
      validateEyeDirection({
        ...result,
        eyes: result.eyes.map((e) => ({ ...e, angleDegrees: 70 })),
      }),
    ).toThrow();
    expect(
      JSON.stringify(validateEyeDirection({ ...result, rawCoordinates: [1, 2] })),
    ).not.toContain('rawCoordinates');
    expect(() =>
      validateEyeDirection(unavailableEyeDirection('PROFILE_VIEW'), { viewRole: 'frontal' }),
    ).toThrow();
  });
  it('projects the existing source term only, with no historical outcome claim in the photo catalogue', () => {
    const item = readingCatalogue().items[0]!,
      source = TRADITIONAL_MORPHOLOGY_TERMS_FR311.find((t) => t.termKey === item.termKey)!;
    expect(item.sourceExpression).toBe(source.sourceExpression);
    expect(item.sourceDescription).toBe(source.neutralGloss);
    expect(item.sourceRefs).toEqual(source.sourceRefs);
    expect(item.traditionalBindingAuthorized).toBe(false);
    expect(JSON.stringify(item)).not.toMatch(
      /traditionalMeaningSummary|wealth|intelligence|temperament|matchedRuleIds/,
    );
  });
  it('restores screened history without inventing new observation evidence', () => {
    const old = {
      methodVersion: PARSING_SCREENED_VERSION,
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
    };
    const got = validateParsingSummary(old, { allowLegacy: true, viewRole: 'frontal' });
    if (got.status !== 'completed') throw Error('fixture');
    expect(got.methodVersion).toBe(PARSING_SCREENED_VERSION);
    expect(got.profile).toEqual(old.profile);
    expect(got.regionScreening).toEqual(old.regionScreening);
    expect(got.eyeDirection).toBeUndefined();
    expect(() => validateParsingSummary(old)).toThrow();
  });
});
