import { describe, expect, it } from 'vitest';
import {
  FR312G14_AIHUB71539_DOCUMENTED_COUNTS,
  FR312G14_AIHUB71539_SOURCE,
  probeAihub71539PublicMetadataShapeFR312G14,
} from './aihub71539-public-metadata-probe-fr312g14.js';

function syntheticPublicFieldFixture() {
  return {
    category: { type: 'Face', type_id: 2 },
    mesh: {
      mesh_id: 101,
      actor_id: 7,
      expression_id: 0,
      obj_file_name: 'synthetic-face.obj',
      map_file_name: 'synthetic-face.png',
    },
    actors: { id: 7 },
    expressions: { id: 0, name: 'neutral' },
    Camera: { filename: 'synthetic-camera.txt' },
    annotation: { num_landmarks: 68 },
    landmarks: Array.from({ length: 68 }, (_, id) => ({
      id,
      name: id,
      x: id / 4,
      y: id / 5,
      z: -id / 6,
    })),
  };
}

describe('FR312G14 AI-Hub 71539 public documentary metadata field probe', () => {
  it('pins the official dataset counts without inflating observations into participants', () => {
    expect(FR312G14_AIHUB71539_SOURCE).toContain('dataSetSn=71539');
    expect(FR312G14_AIHUB71539_DOCUMENTED_COUNTS).toEqual({
      independentActors: 530,
      expressionsPerActor: 26,
      meshSets: 13_780,
      raw2DImages: 551_200,
      landmarkCount: 68,
      neutralExpressionId: 0,
    });
  });

  it('accepts only synthetic documentary field shape, never promotes missing FR299 or FR312G evidence', () => {
    const result = probeAihub71539PublicMetadataShapeFR312G14(
      syntheticPublicFieldFixture(),
    );
    expect(result.structuralFieldsConsistent).toBe(true);
    expect(result.eligibleNeutralMetadataCandidate).toBe(true);
    expect(result.issues).toEqual([]);
    expect(result.sourceSchemaArrangementVerifiedFromOriginalFiles).toBe(false);
    expect(Object.values(result.authority).every((flag) => flag === false)).toBe(true);
    expect(JSON.stringify(result)).not.toContain('synthetic-face');
    expect(JSON.stringify(result)).not.toContain('"actor_id"');
    expect(JSON.stringify(result)).not.toContain('"landmarks"');
  });

  it('rejects actor, expression, and neutral mismatches without inventing capture sessions', () => {
    const actorMismatch = syntheticPublicFieldFixture();
    actorMismatch.actors.id = 9;
    expect(
      probeAihub71539PublicMetadataShapeFR312G14(actorMismatch).issues,
    ).toContain('actor_reference_mismatch');

    const expressionMismatch = syntheticPublicFieldFixture();
    expressionMismatch.mesh.expression_id = 9;
    expect(
      probeAihub71539PublicMetadataShapeFR312G14(expressionMismatch).issues,
    ).toContain('expression_reference_mismatch');

    const nonNeutral = syntheticPublicFieldFixture();
    nonNeutral.mesh.expression_id = 1;
    nonNeutral.expressions.id = 1;
    expect(
      probeAihub71539PublicMetadataShapeFR312G14(nonNeutral).issues,
    ).toContain('non_neutral_expression');
  });

  it('rejects duplicate, missing and nonfinite landmarks without substituting the 468-point canonical map', () => {
    const duplicate = syntheticPublicFieldFixture();
    const last = duplicate.landmarks.at(-1);
    if (last === undefined) throw new Error('synthetic landmark fixture empty');
    last.id = 0;
    expect(probeAihub71539PublicMetadataShapeFR312G14(duplicate).issues).toContain(
      'landmark_id_invalid_or_duplicate',
    );

    const missing = syntheticPublicFieldFixture();
    missing.landmarks.pop();
    expect(probeAihub71539PublicMetadataShapeFR312G14(missing).issues).toContain(
      'landmark_count_invalid',
    );

    const nonfinite = syntheticPublicFieldFixture();
    const first = nonfinite.landmarks.at(0);
    if (first === undefined) throw new Error('synthetic landmark fixture empty');
    first.z = Number.NaN;
    expect(
      probeAihub71539PublicMetadataShapeFR312G14(nonfinite).issues,
    ).toContain('landmark_coordinate_invalid');
  });

  it('rejects absent camera reference, unsafe names, and non-record inputs', () => {
    const invalid = syntheticPublicFieldFixture();
    invalid.mesh.obj_file_name = '../private-face.obj';
    invalid.Camera.filename = '';
    const issues = probeAihub71539PublicMetadataShapeFR312G14(invalid).issues;
    expect(issues).toContain('obj_filename_invalid');
    expect(issues).toContain('camera_filename_invalid');
    expect(
      probeAihub71539PublicMetadataShapeFR312G14(null).issues,
    ).toContain('record_not_object');
  });

  it('never allows caller-provided scale, approval, or synthetic session claims to bypass external authority', () => {
    const injected = {
      ...syntheticPublicFieldFixture(),
      metricScaleVerified: true,
      commercialProductDevelopmentStatus: 'explicitly_allowed',
      twoSessionsTwoFreshCaptures: true,
      actualSourceBytesInspected: true,
      fr299IndependentReferenceAuthorized: true,
    };
    const result = probeAihub71539PublicMetadataShapeFR312G14(injected);
    expect(result.structuralFieldsConsistent).toBe(true);
    expect(Object.values(result.authority).every((flag) => flag === false)).toBe(true);
    expect(result.assessmentScope).toBe('public_documentary_field_shape_only');
  });
});
