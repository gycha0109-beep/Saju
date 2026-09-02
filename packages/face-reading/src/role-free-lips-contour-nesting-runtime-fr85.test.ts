import { describe, expect, it } from 'vitest';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedGovernedRoleFreeLipsContourNestingFR85,
  classifyRoleFreeClosedContourRelationFR85,
  evaluateIssuedPoseNormalizedLipsContourNestingFR85,
  type GovernedRoleFreeLipsContourNestingFR85V1,
} from './role-free-lips-contour-nesting-runtime-fr85.js';

const OUTER = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
] as const;

const INNER = [
  { x: 3, y: 3 },
  { x: 7, y: 3 },
  { x: 7, y: 7 },
  { x: 3, y: 7 },
] as const;

describe('FR85 role-free lips contour nesting runtime', () => {
  it('issues only role-free enclosing/enclosed geometry when strict nesting is established', () => {
    const relation = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'contour-a', points: OUTER },
      { contourRef: 'contour-b', points: INNER },
    );

    expect(relation).toMatchObject({
      schemaVersion: 'fr85-role-free-contour-relation-computation-v1',
      authorityState: 'pure_coordinate_geometry_predicate_only_not_anatomical_or_traditional',
      numericPolicy: 'ieee754_double_exact_predicates_no_empirical_tolerance',
      empiricalToleranceApplied: false,
      calibrationThresholdApplied: false,
      mutualBoundaryIntersectionOrTouch: false,
      relationState: 'strictly_nested',
      strictNestingValidated: true,
      geometricRolesIssued: 2,
      anatomicalRolesIssued: 0,
      crossContourPointCorrespondenceIssued: false,
      thicknessMetricIssued: false,
      traditionalSemanticAuthority: false,
    });
    expect(relation.geometricRoles).toEqual([
      {
        contourRef: 'contour-a',
        geometricRole: 'enclosing_cycle',
        anatomicalRole: null,
        traditionalRole: null,
      },
      {
        contourRef: 'contour-b',
        geometricRole: 'enclosed_cycle',
        anatomicalRole: null,
        traditionalRole: null,
      },
    ]);
  });

  it('fails closed when the two valid simple cycles are disjoint rather than nested', () => {
    const relation = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'left', points: OUTER },
      {
        contourRef: 'right',
        points: [
          { x: 20, y: 20 },
          { x: 30, y: 20 },
          { x: 30, y: 30 },
          { x: 20, y: 30 },
        ],
      },
    );

    expect(relation.relationState).toBe('disjoint_non_nested');
    expect(relation.strictNestingValidated).toBe(false);
    expect(relation.geometricRolesIssued).toBe(0);
    expect(relation.geometricRoles).toEqual([]);
  });

  it('fails closed on mutual crossing or boundary contact', () => {
    const crossing = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'outer', points: OUTER },
      {
        contourRef: 'crossing',
        points: [
          { x: -1, y: 4 },
          { x: 5, y: 4 },
          { x: 5, y: 6 },
          { x: -1, y: 6 },
        ],
      },
    );
    expect(crossing.relationState).toBe('rejected_mutual_intersection_or_touch');
    expect(crossing.mutualBoundaryIntersectionOrTouch).toBe(true);
    expect(crossing.geometricRolesIssued).toBe(0);

    const touching = classifyRoleFreeClosedContourRelationFR85(
      { contourRef: 'outer', points: OUTER },
      {
        contourRef: 'touching',
        points: [
          { x: 0, y: 5 },
          { x: 2, y: 4 },
          { x: 2, y: 6 },
        ],
      },
    );
    expect(touching.relationState).toBe('rejected_mutual_intersection_or_touch');
    expect(touching.geometricRolesIssued).toBe(0);
  });

  it('rejects self-intersecting and degenerate cycles before any role issuance', () => {
    const selfIntersecting = classifyRoleFreeClosedContourRelationFR85(
      {
        contourRef: 'self-crossing',
        points: [
          { x: 0, y: 0 },
          { x: 4, y: 4 },
          { x: 0, y: 4 },
          { x: 4, y: 0 },
          { x: 5, y: 2 },
        ],
      },
      { contourRef: 'other', points: INNER },
    );
    expect(selfIntersecting.relationState).toBe('rejected_self_intersection');
    expect(selfIntersecting.geometricRolesIssued).toBe(0);

    const degenerate = classifyRoleFreeClosedContourRelationFR85(
      {
        contourRef: 'degenerate',
        points: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      },
      { contourRef: 'other', points: OUTER },
    );
    expect(degenerate.relationState).toBe('rejected_degenerate_cycle');
    expect(degenerate.geometricRolesIssued).toBe(0);
  });

  it('requires an actually issued FR79 source before the governed authority wrapper can run', () => {
    const forged = {
      schemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
      artifactVersion: '0.1.0',
      authorityState: 'governed_pose_normalized_lips_geometry_candidate_only',
    } as unknown as PoseNormalizedLipsGeometryFR79V1;

    expect(() => evaluateIssuedPoseNormalizedLipsContourNestingFR85(forged))
      .toThrow(/not issued by the active FR-79 projection boundary/u);
  });

  it('rejects structurally plausible but unissued governed FR85 output', () => {
    const forged = {
      schemaVersion: 'fr85-governed-role-free-lips-contour-nesting-v1',
      authorityState: 'governed_role_free_per_sample_contour_relation_only',
    } as unknown as GovernedRoleFreeLipsContourNestingFR85V1;

    expect(() => assertIssuedGovernedRoleFreeLipsContourNestingFR85(forged))
      .toThrow(/not issued by the active FR-85 boundary/u);
  });
});
