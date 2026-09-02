import { describe, expect, it } from 'vitest';
import {
  classifyRoleFreeClosedContourRelationFR85,
} from './role-free-lips-contour-nesting-runtime-fr85.js';

const OUTER = [
  { x: 0, y: 0 },
  { x: 12, y: 0 },
  { x: 12, y: 8 },
  { x: 0, y: 8 },
] as const;

const INNER = [
  { x: 4, y: 2 },
  { x: 8, y: 2 },
  { x: 8, y: 6 },
  { x: 4, y: 6 },
] as const;

describe('FR85 role-free lips contour nesting hardening', () => {
  it('is invariant to provider component ordering and derives roles only from geometry', () => {
    const forward = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'provider-component-1', points: OUTER },
      { contourRef: 'provider-component-2', points: INNER },
    );
    const swapped = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'provider-component-2', points: INNER },
      { contourRef: 'provider-component-1', points: OUTER },
    );

    expect(forward.relationState).toBe('strictly_nested');
    expect(swapped.relationState).toBe('strictly_nested');
    expect(forward.geometricRoles).toEqual(swapped.geometricRoles);
    expect(forward.geometricRoles[0]?.contourRef).toBe('provider-component-1');
    expect(forward.geometricRoles[0]?.geometricRole).toBe('enclosing_cycle');
    expect(forward.geometricRoles[1]?.contourRef).toBe('provider-component-2');
    expect(forward.geometricRoles[1]?.geometricRole).toBe('enclosed_cycle');
  });

  it('is invariant to clockwise/counterclockwise winding', () => {
    const baseline = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'outer', points: OUTER },
      { contourRef: 'inner', points: INNER },
    );
    const reversed = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'outer', points: [...OUTER].reverse() },
      { contourRef: 'inner', points: [...INNER].reverse() },
    );

    expect(reversed.relationState).toBe(baseline.relationState);
    expect(reversed.geometricRoles).toEqual(baseline.geometricRoles);
  });

  it('does not introduce an empirical epsilon that could become a hidden product threshold', () => {
    const relation = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'outer', points: OUTER },
      {
        contourRef: 'near-boundary-but-distinct',
        points: [
          { x: Number.EPSILON, y: 1 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: Number.EPSILON, y: 2 },
        ],
      },
    );

    expect(relation.numericPolicy).toBe('ieee754_double_exact_predicates_no_empirical_tolerance');
    expect(relation.empiricalToleranceApplied).toBe(false);
    expect(relation.calibrationThresholdApplied).toBe(false);
    expect(relation.relationState).toBe('strictly_nested');
  });

  it('treats exact boundary contact as fail-closed rather than nested', () => {
    const relation = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'outer', points: OUTER },
      {
        contourRef: 'touching',
        points: [
          { x: 0, y: 1 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      },
    );

    expect(relation.relationState).toBe('rejected_mutual_intersection_or_touch');
    expect(relation.strictNestingValidated).toBe(false);
    expect(relation.geometricRolesIssued).toBe(0);
  });

  it('deep-freezes authority-bearing computation structures and keeps semantic widening fields closed', () => {
    const relation = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'outer', points: OUTER },
      { contourRef: 'inner', points: INNER },
    );

    expect(Object.isFrozen(relation)).toBe(true);
    expect(Object.isFrozen(relation.contourAssessments)).toBe(true);
    expect(Object.isFrozen(relation.contourAssessments[0])).toBe(true);
    expect(Object.isFrozen(relation.contourAssessments[1])).toBe(true);
    expect(Object.isFrozen(relation.geometricRoles)).toBe(true);
    expect(Object.isFrozen(relation.geometricRoles[0])).toBe(true);
    expect(Object.isFrozen(relation.geometricRoles[1])).toBe(true);

    expect(relation.anatomicalRolesIssued).toBe(0);
    expect(relation.crossContourPointCorrespondenceIssued).toBe(false);
    expect(relation.thicknessMetricIssued).toBe(false);
    expect(relation.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects duplicate contour identities and unauthorized point fields', () => {
    expect(() => classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'same', points: OUTER },
      { contourRef: 'same', points: INNER },
    )).toThrow(/contour references must be distinct/u);

    expect(() => classifyRoleFreeClosedContourRelationFR85(
      {
        contourRef: 'bad',
        points: [
          { x: 0, y: 0, z: 1 } as unknown as { x: number; y: number },
          { x: 1, y: 0 },
          { x: 0, y: 1 },
        ],
      },
      { contourRef: 'other', points: INNER },
    )).toThrow(/unauthorized field z/u);
  });
});
