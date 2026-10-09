/**
 * FR312G14: PUBLIC-DOCUMENTARY 71539 metadata shape probe.
 *
 * The public AI-Hub page documents the field names below, but does not
 * establish that these fields are arranged in one per-capture JSON record.
 * This probe accepts a normalized one-record *hypothesis*, not raw biometric
 * data. Any mismatch must be checked against an authorized original schema.
 *
 * No input can grant licence rights, metric scale, camera calibration,
 * same-capture 2D/3D correspondence, or temporal repeatability authority.
 */
export const FR312G14_AIHUB71539_SOURCE =
  'https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&dataSetSn=71539&topMenu=100' as const;

export const FR312G14_AIHUB71539_DOCUMENTED_COUNTS = Object.freeze({
  independentActors: 530,
  expressionsPerActor: 26,
  meshSets: 13_780,
  raw2DImages: 551_200,
  landmarkCount: 68,
  neutralExpressionId: 0,
});

export type FR312G14MetadataIssue =
  | 'record_not_object'
  | 'category_not_face'
  | 'mesh_metadata_missing'
  | 'mesh_id_invalid'
  | 'actor_reference_invalid'
  | 'actor_reference_mismatch'
  | 'expression_reference_invalid'
  | 'expression_reference_mismatch'
  | 'non_neutral_expression'
  | 'obj_filename_invalid'
  | 'texture_filename_invalid'
  | 'camera_filename_invalid'
  | 'landmark_declaration_invalid'
  | 'landmark_count_invalid'
  | 'landmark_id_invalid_or_duplicate'
  | 'landmark_coordinate_invalid';

export interface FR312G14PublicMetadataProbeResult {
  readonly schemaVersion: 'fr312g14-aihub71539-public-metadata-probe-v1';
  readonly datasetId: '71539';
  readonly assessmentScope: 'public_documentary_field_shape_only';
  readonly sourceSchemaArrangementVerifiedFromOriginalFiles: false;
  readonly structuralFieldsConsistent: boolean;
  readonly eligibleNeutralMetadataCandidate: boolean;
  readonly issues: readonly FR312G14MetadataIssue[];
  readonly authority: {
    readonly actualSourceBytesInspected: false;
    readonly independentPhysical3DScaleVerified: false;
    readonly cameraIntrinsicsExtrinsicsVerified: false;
    readonly rgb3DSameCaptureCorrespondenceVerified: false;
    readonly fr299IndependentReferenceAuthorized: false;
    readonly fr312gTwoSessionTwoCaptureProven: false;
    readonly commercialBenchmarkRightsVerified: false;
    readonly realEmpiricalEvidenceAdmitted: false;
  };
}

function record(value: unknown): Record<string, unknown> | null {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

function identifier(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

function documentedBasename(value: unknown, extension?: string): boolean {
  if (typeof value !== 'string' || value.length === 0 || value.length > 200) {
    return false;
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(value) || value.includes('..')) {
    return false;
  }
  return extension === undefined || value.toLowerCase().endsWith(extension);
}

/**
 * Pure, privacy-minimal metadata inspection. Returns no actor identifier,
 * coordinates, raw filename, digest, or face measurements.
 *
 * "structuralFieldsConsistent" is deliberately not an FR299 admission and
 * is never grounds to infer a scan unit, RGB pair, consent, or session count.
 */
export function probeAihub71539PublicMetadataShapeFR312G14(
  input: unknown,
): FR312G14PublicMetadataProbeResult {
  const issues: FR312G14MetadataIssue[] = [];
  const root = record(input);
  if (root === null) {
    issues.push('record_not_object');
  }

  const category = record(root?.category);
  if (category?.type !== 'Face' || category.type_id !== 2) {
    issues.push('category_not_face');
  }

  const mesh = record(root?.mesh);
  if (mesh === null) {
    issues.push('mesh_metadata_missing');
  }
  if (!identifier(mesh?.mesh_id)) {
    issues.push('mesh_id_invalid');
  }

  const actors = record(root?.actors);
  if (!identifier(mesh?.actor_id) || !identifier(actors?.id)) {
    issues.push('actor_reference_invalid');
  } else if (mesh.actor_id !== actors.id) {
    issues.push('actor_reference_mismatch');
  }

  const expressions = record(root?.expressions);
  if (!identifier(mesh?.expression_id) || !identifier(expressions?.id)) {
    issues.push('expression_reference_invalid');
  } else if (mesh.expression_id !== expressions.id) {
    issues.push('expression_reference_mismatch');
  } else if (expressions.id !== 0) {
    issues.push('non_neutral_expression');
  }

  if (!documentedBasename(mesh?.obj_file_name, '.obj')) {
    issues.push('obj_filename_invalid');
  }
  if (!documentedBasename(mesh?.map_file_name, '.png')) {
    issues.push('texture_filename_invalid');
  }

  const camera = record(root?.Camera);
  if (!documentedBasename(camera?.filename)) {
    issues.push('camera_filename_invalid');
  }

  const annotation = record(root?.annotation);
  if (annotation?.num_landmarks !== 68) {
    issues.push('landmark_declaration_invalid');
  }

  const landmarks = root?.landmarks;
  if (!Array.isArray(landmarks) || landmarks.length !== 68) {
    issues.push('landmark_count_invalid');
  } else {
    const seen = new Set<number>();
    let invalidId = false;
    let invalidCoordinate = false;

    for (const item of landmarks as unknown[]) {
      const point = record(item);
      const id = point?.id;
      if (!identifier(id) || id >= 68 || seen.has(id)) {
        invalidId = true;
      } else {
        seen.add(id);
      }
      for (const axis of ['x', 'y', 'z'] as const) {
        const coordinate = point?.[axis];
        if (typeof coordinate !== 'number' || !Number.isFinite(coordinate)) {
          invalidCoordinate = true;
        }
      }
    }
    if (invalidId || seen.size !== 68) {
      issues.push('landmark_id_invalid_or_duplicate');
    }
    if (invalidCoordinate) {
      issues.push('landmark_coordinate_invalid');
    }
  }

  return {
    schemaVersion: 'fr312g14-aihub71539-public-metadata-probe-v1',
    datasetId: '71539',
    assessmentScope: 'public_documentary_field_shape_only',
    sourceSchemaArrangementVerifiedFromOriginalFiles: false,
    structuralFieldsConsistent: issues.length === 0,
    eligibleNeutralMetadataCandidate: issues.length === 0,
    issues,
    authority: {
      actualSourceBytesInspected: false,
      independentPhysical3DScaleVerified: false,
      cameraIntrinsicsExtrinsicsVerified: false,
      rgb3DSameCaptureCorrespondenceVerified: false,
      fr299IndependentReferenceAuthorized: false,
      fr312gTwoSessionTwoCaptureProven: false,
      commercialBenchmarkRightsVerified: false,
      realEmpiricalEvidenceAdmitted: false,
    },
  };
}
