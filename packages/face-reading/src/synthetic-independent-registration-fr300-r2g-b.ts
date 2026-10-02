import { createHash } from 'node:crypto';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  assessASTControlledPilotIntake,
  type FR300R2EPREPControlledPilotInput,
} from './ast-controlled-pilot-intake-readiness-fr300-r2e-prep.js';
import {
  FR300_R2F_AST_RGB_3D_REGISTRATION_CONTRACT_VERSION,
  assessFR300R2FRegistration,
  assertFR300R2FRegistrationContract,
} from './ast-rgb-3d-registration-contract-fr300-r2f.js';
import {
  FR300_R2G_A_CURRENT_GATE,
  FR300_R2G_A_SYNTHETIC_CALIBRATED_REGISTRATION_CONTRACT_VERSION,
  assertFR300R2GASyntheticCalibratedRegistrationContract,
} from './synthetic-calibrated-registration-fr300-r2g-a.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2G_B_SYNTHETIC_INDEPENDENT_REGISTRATION_CONTRACT_VERSION =
  'FR300-R2G-B-SYNTHETIC-INDEPENDENT-REGISTRATION-v1' as const;

type Vec3 = readonly [number, number, number];
type Vec4 = readonly [number, number, number, number];
type Mat3 = readonly [
  readonly [number, number, number],
  readonly [number, number, number],
  readonly [number, number, number],
];
type Mat4 = readonly [
  readonly [number, number, number, number],
  readonly [number, number, number, number],
  readonly [number, number, number, number],
  readonly [number, number, number, number],
];

export interface FR300R2GBCorrespondence {
  readonly pointRef: string;
  readonly role: 'fit' | 'held_out';
  readonly rgbMetricPoint: Vec3;
  readonly raw3DPoint: Vec3;
}

export interface FR300R2GBExecutionInput {
  readonly schemaVersion:
    'fr300-r2g-b-independent-registration-input-v1';
  readonly correspondences:
    readonly FR300R2GBCorrespondence[];
  readonly providerLandmarksUsedAsRegistrationTruth: boolean;
  readonly providerLandmarksUsedAsFR266Truth: boolean;
  readonly providerLandmarksUsedAsFR297Truth: boolean;
}

export interface FR300R2GBRegistrationReceipt {
  readonly schemaVersion:
    'fr300-r2g-b-independent-registration-receipt-v1';
  readonly artifactClass: 'synthetic_fixture';
  readonly solver: 'horn_quaternion_rigid_v1';
  readonly fitCount: number;
  readonly heldOutCount: number;
  readonly correspondenceManifestDigest: string;
  readonly raw3DArtifactDigest: string;
  readonly rgbMetricEvidenceDigest: string;
  readonly rotation: Mat3;
  readonly translation: Vec3;
  readonly rotationDeterminant: number;
  readonly orthonormalityMaxError: number;
  readonly fitRmseMm: number;
  readonly fitMaxResidualMm: number;
  readonly heldOutRmseMm: number;
  readonly heldOutMaxResidualMm: number;
  readonly outputFinite: boolean;
  readonly scaleFittingPerformed: false;
  readonly heldOutValidationExecuted: boolean;
  readonly acceptance: {
    readonly preregistered: true;
    readonly fitRmseMmThreshold: number;
    readonly heldOutRmseMmThreshold: number;
    readonly heldOutMaxResidualMmThreshold: number;
    readonly determinantTolerance: number;
    readonly orthonormalityTolerance: number;
    readonly thresholdSatisfied: boolean;
  };
  readonly r2fDisposition:
    | 'predecessor_not_ready'
    | 'calibrated_projection_evidence_incomplete'
    | 'independent_registration_evidence_incomplete'
    | 'registration_validated_for_materialization_review';
  readonly r2fRegistrationValidatedForFR299Review: boolean;
  readonly syntheticIndependentRegistrationValidated: boolean;
  readonly authorityBoundary: {
    readonly syntheticFixtureOnly: true;
    readonly realParticipantArtifactUsed: false;
    readonly realRegistrationAuthorityIssued: false;
    readonly fr299ReferenceMaterialized: false;
    readonly fr300R2Authorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$/u;

export const FR300_R2G_B_ACCEPTANCE = Object.freeze({
  fitCount: 8 as const,
  heldOutCount: 4 as const,
  fitRmseMmThreshold: 1e-6,
  heldOutRmseMmThreshold: 1e-6,
  heldOutMaxResidualMmThreshold: 1e-6,
  determinantTolerance: 1e-9,
  orthonormalityTolerance: 1e-9,
});

export const FR300_R2G_B_CANONICAL_CORRESPONDENCES =
  Object.freeze([
    Object.freeze({
      pointRef: 'p0',
      role: 'fit' as const,
      rgbMetricPoint: Object.freeze([-35, -22, 470] as const),
      raw3DPoint: Object.freeze([
        -3.174680849024236,
        -239.70175780273209,
        443.2797639107993,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p1',
      role: 'fit' as const,
      rgbMetricPoint: Object.freeze([28, -31, 515] as const),
      raw3DPoint: Object.freeze([
        52.0396080449072,
        -230.1534998483752,
        497.45737064988055,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p2',
      role: 'fit' as const,
      rgbMetricPoint: Object.freeze([12, 44, 530] as const),
      raw3DPoint: Object.freeze([
        -6.528354960224334,
        -191.3897060867467,
        531.7088232122971,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p3',
      role: 'fit' as const,
      rgbMetricPoint: Object.freeze([-48, 17, 610] as const),
      raw3DPoint: Object.freeze([
        -37.736441292929044,
        -277.6173309382846,
        579.8736657835429,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p4',
      role: 'fit' as const,
      rgbMetricPoint: Object.freeze([37, 26, 655] as const),
      raw3DPoint: Object.freeze([
        23.87816666557584,
        -242.93876961932844,
        645.691881126768,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p5',
      role: 'fit' as const,
      rgbMetricPoint: Object.freeze([5, -12, 575] as const),
      raw3DPoint: Object.freeze([
        22.039530484910514,
        -254.41564571041272,
        552.2418905853824,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p6',
      role: 'fit' as const,
      rgbMetricPoint: Object.freeze([-18, 53, 590] as const),
      raw3DPoint: Object.freeze([
        -35.95213362097266,
        -226.7198518422895,
        581.3779489365878,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p7',
      role: 'fit' as const,
      rgbMetricPoint: Object.freeze([46, -8, 625] as const),
      raw3DPoint: Object.freeze([
        51.88180543694336,
        -249.80772333169054,
        609.5586043523016,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p8',
      role: 'held_out' as const,
      rgbMetricPoint: Object.freeze([-27, -41, 545] as const),
      raw3DPoint: Object.freeze([
        14.544834678641887,
        -280.40503652441555,
        507.14886340945947,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p9',
      role: 'held_out' as const,
      rgbMetricPoint: Object.freeze([31, 49, 680] as const),
      raw3DPoint: Object.freeze([
        4.989983705438277,
        -240.21813913436603,
        674.4292211955471,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p10',
      role: 'held_out' as const,
      rgbMetricPoint: Object.freeze([-55, 6, 640] as const),
      raw3DPoint: Object.freeze([
        -36.64019115726542,
        -301.9942949237484,
        601.6581066184934,
      ] as const),
    }),
    Object.freeze({
      pointRef: 'p11',
      role: 'held_out' as const,
      rgbMetricPoint: Object.freeze([19, -57, 605] as const),
      raw3DPoint: Object.freeze([
        60.5427540406014,
        -291.6031625974343,
        568.2290843228079,
      ] as const),
    }),
  ] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2G-B ${message}`,
  );
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    fail(`${label} must be finite.`);
  }
  return value;
}

function finiteVec3(value: Vec3, label: string): Vec3 {
  return Object.freeze([
    finite(value[0], `${label}[0]`),
    finite(value[1], `${label}[1]`),
    finite(value[2], `${label}[2]`),
  ]);
}

function sha256Utf8(value: string): string {
  return `sha256:${createHash('sha256')
    .update(value, 'utf8')
    .digest('hex')}`;
}

function add3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub3(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale3(a: Vec3, scale: number): Vec3 {
  return [a[0] * scale, a[1] * scale, a[2] * scale];
}

function dot3(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross3(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function norm3(a: Vec3): number {
  return Math.hypot(a[0], a[1], a[2]);
}

function centroid(
  points: readonly Vec3[],
  label: string,
): Vec3 {
  if (points.length === 0) {
    fail(`${label} must not be empty.`);
  }

  let sum: Vec3 = [0, 0, 0];
  for (const point of points) {
    sum = add3(sum, finiteVec3(point, label));
  }
  return scale3(sum, 1 / points.length);
}

function hasNonCollinearGeometry(
  points: readonly Vec3[],
): boolean {
  const anchor = points[0];
  if (!anchor) {
    return false;
  }
  const rest = points.slice(1);
  let maxCrossNorm = 0;

  for (const a of rest) {
    const va = sub3(a, anchor);
    for (const b of rest) {
      const vb = sub3(b, anchor);
      maxCrossNorm = Math.max(
        maxCrossNorm,
        norm3(cross3(va, vb)),
      );
    }
  }

  return maxCrossNorm > 1e-9;
}

function mulMat4Vec4(matrix: Mat4, vector: Vec4): Vec4 {
  const [v0, v1, v2, v3] = vector;
  const r0 = matrix[0];
  const r1 = matrix[1];
  const r2 = matrix[2];
  const r3 = matrix[3];
  return [
    r0[0] * v0 + r0[1] * v1 + r0[2] * v2 + r0[3] * v3,
    r1[0] * v0 + r1[1] * v1 + r1[2] * v2 + r1[3] * v3,
    r2[0] * v0 + r2[1] * v1 + r2[2] * v2 + r2[3] * v3,
    r3[0] * v0 + r3[1] * v1 + r3[2] * v2 + r3[3] * v3,
  ];
}

function dot4(a: Vec4, b: Vec4): number {
  return (
    a[0] * b[0] +
    a[1] * b[1] +
    a[2] * b[2] +
    a[3] * b[3]
  );
}

function normalize4(vector: Vec4): Vec4 {
  const norm = Math.hypot(
    vector[0],
    vector[1],
    vector[2],
    vector[3],
  );
  if (!Number.isFinite(norm) || norm <= 1e-15) {
    fail('Horn eigenvector normalization failed.');
  }
  return [
    vector[0] / norm,
    vector[1] / norm,
    vector[2] / norm,
    vector[3] / norm,
  ];
}

function shiftedHornMatrix(matrix: Mat4): Mat4 {
  const rowBounds = matrix.map((row) =>
    Math.abs(row[0]) +
    Math.abs(row[1]) +
    Math.abs(row[2]) +
    Math.abs(row[3]),
  );
  const shift = Math.max(...rowBounds) + 1;

  return [
    [matrix[0][0] + shift, matrix[0][1], matrix[0][2], matrix[0][3]],
    [matrix[1][0], matrix[1][1] + shift, matrix[1][2], matrix[1][3]],
    [matrix[2][0], matrix[2][1], matrix[2][2] + shift, matrix[2][3]],
    [matrix[3][0], matrix[3][1], matrix[3][2], matrix[3][3] + shift],
  ];
}

function dominantEigenvectorSymmetric4(
  matrix: Mat4,
): Vec4 {
  const shifted = shiftedHornMatrix(matrix);
  const starts: readonly Vec4[] = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  let best: Vec4 | null = null;
  let bestRayleigh = Number.NEGATIVE_INFINITY;

  for (const start of starts) {
    let vector = start;
    for (let iteration = 0; iteration < 128; iteration += 1) {
      vector = normalize4(mulMat4Vec4(shifted, vector));
    }

    const rayleigh = dot4(
      vector,
      mulMat4Vec4(matrix, vector),
    );
    if (rayleigh > bestRayleigh) {
      bestRayleigh = rayleigh;
      best = vector;
    }
  }

  if (!best || !Number.isFinite(bestRayleigh)) {
    fail('Horn dominant eigenvector solve failed.');
  }

  return best[0] < 0
    ? [-best[0], -best[1], -best[2], -best[3]]
    : best;
}

function quaternionToRotation(
  quaternion: Vec4,
): Mat3 {
  const [w, x, y, z] = normalize4(quaternion);
  return [
    [
      1 - 2 * (y * y + z * z),
      2 * (x * y - z * w),
      2 * (x * z + y * w),
    ],
    [
      2 * (x * y + z * w),
      1 - 2 * (x * x + z * z),
      2 * (y * z - x * w),
    ],
    [
      2 * (x * z - y * w),
      2 * (y * z + x * w),
      1 - 2 * (x * x + y * y),
    ],
  ];
}

function applyRotation(rotation: Mat3, point: Vec3): Vec3 {
  const [x, y, z] = point;
  return [
    dot3(rotation[0], [x, y, z]),
    dot3(rotation[1], [x, y, z]),
    dot3(rotation[2], [x, y, z]),
  ];
}

function determinant3(matrix: Mat3): number {
  const [a, b, c] = matrix[0];
  const [d, e, f] = matrix[1];
  const [g, h, i] = matrix[2];
  return (
    a * (e * i - f * h) -
    b * (d * i - f * g) +
    c * (d * h - e * g)
  );
}

function orthonormalityMaxError(rotation: Mat3): number {
  const rows = rotation;
  return Math.max(
    Math.abs(dot3(rows[0], rows[0]) - 1),
    Math.abs(dot3(rows[1], rows[1]) - 1),
    Math.abs(dot3(rows[2], rows[2]) - 1),
    Math.abs(dot3(rows[0], rows[1])),
    Math.abs(dot3(rows[0], rows[2])),
    Math.abs(dot3(rows[1], rows[2])),
  );
}

function estimateRigidTransform(
  fit: readonly FR300R2GBCorrespondence[],
): {
  readonly rotation: Mat3;
  readonly translation: Vec3;
} {
  if (fit.length < FR300_R2G_B_ACCEPTANCE.fitCount) {
    fail('independent registration requires at least 8 fit correspondences.');
  }

  const sourcePoints = fit.map((item) => item.rgbMetricPoint);
  const targetPoints = fit.map((item) => item.raw3DPoint);

  if (
    !hasNonCollinearGeometry(sourcePoints) ||
    !hasNonCollinearGeometry(targetPoints)
  ) {
    fail('fit correspondences must contain non-collinear 3D geometry.');
  }

  const sourceCentroid = centroid(sourcePoints, 'fit.rgbMetricPoint');
  const targetCentroid = centroid(targetPoints, 'fit.raw3DPoint');

  let sxx = 0;
  let sxy = 0;
  let sxz = 0;
  let syx = 0;
  let syy = 0;
  let syz = 0;
  let szx = 0;
  let szy = 0;
  let szz = 0;

  for (const item of fit) {
    const source = sub3(item.rgbMetricPoint, sourceCentroid);
    const target = sub3(item.raw3DPoint, targetCentroid);

    sxx += source[0] * target[0];
    sxy += source[0] * target[1];
    sxz += source[0] * target[2];
    syx += source[1] * target[0];
    syy += source[1] * target[1];
    syz += source[1] * target[2];
    szx += source[2] * target[0];
    szy += source[2] * target[1];
    szz += source[2] * target[2];
  }

  const trace = sxx + syy + szz;
  const horn: Mat4 = [
    [trace, syz - szy, szx - sxz, sxy - syx],
    [
      syz - szy,
      sxx - syy - szz,
      sxy + syx,
      szx + sxz,
    ],
    [
      szx - sxz,
      sxy + syx,
      -sxx + syy - szz,
      syz + szy,
    ],
    [
      sxy - syx,
      szx + sxz,
      syz + szy,
      -sxx - syy + szz,
    ],
  ];

  const quaternion = dominantEigenvectorSymmetric4(horn);
  const rotation = quaternionToRotation(quaternion);
  const translation = sub3(
    targetCentroid,
    applyRotation(rotation, sourceCentroid),
  );

  if (
    !Number.isFinite(determinant3(rotation)) ||
    !translation.every(Number.isFinite)
  ) {
    fail('rigid registration produced non-finite transform output.');
  }

  return Object.freeze({
    rotation: Object.freeze([
      Object.freeze(rotation[0]),
      Object.freeze(rotation[1]),
      Object.freeze(rotation[2]),
    ] as const),
    translation: Object.freeze(translation),
  });
}

function transformedPoint(
  rotation: Mat3,
  translation: Vec3,
  point: Vec3,
): Vec3 {
  return add3(applyRotation(rotation, point), translation);
}

function residuals(
  correspondences: readonly FR300R2GBCorrespondence[],
  rotation: Mat3,
  translation: Vec3,
): readonly number[] {
  return correspondences.map((item) => {
    const projected = transformedPoint(
      rotation,
      translation,
      item.rgbMetricPoint,
    );
    return norm3(sub3(projected, item.raw3DPoint));
  });
}

function rmse(values: readonly number[]): number {
  if (values.length === 0) {
    fail('residual set must not be empty.');
  }
  return Math.sqrt(
    values.reduce((sum, value) => sum + value * value, 0) /
      values.length,
  );
}

function maxResidual(values: readonly number[]): number {
  if (values.length === 0) {
    fail('residual set must not be empty.');
  }
  return Math.max(...values);
}

function validateCorrespondences(
  input: readonly FR300R2GBCorrespondence[],
): {
  readonly fit: readonly FR300R2GBCorrespondence[];
  readonly heldOut: readonly FR300R2GBCorrespondence[];
} {
  const refs = new Set<string>();
  const normalized: FR300R2GBCorrespondence[] = [];

  for (const item of input) {
    const pointRef = item.pointRef.trim();
    if (!SAFE_REF.test(pointRef)) {
      fail('correspondence pointRef must be a bounded opaque reference.');
    }
    if (refs.has(pointRef)) {
      fail('fit and held-out correspondence identities must be disjoint.');
    }
    refs.add(pointRef);

    normalized.push(
      Object.freeze({
        pointRef,
        role: item.role,
        rgbMetricPoint: finiteVec3(
          item.rgbMetricPoint,
          `${pointRef}.rgbMetricPoint`,
        ),
        raw3DPoint: finiteVec3(
          item.raw3DPoint,
          `${pointRef}.raw3DPoint`,
        ),
      }),
    );
  }

  const fit = normalized.filter((item) => item.role === 'fit');
  const heldOut = normalized.filter(
    (item) => item.role === 'held_out',
  );

  if (fit.length !== FR300_R2G_B_ACCEPTANCE.fitCount) {
    fail('canonical synthetic fixture requires exactly 8 fit correspondences.');
  }
  if (heldOut.length !== FR300_R2G_B_ACCEPTANCE.heldOutCount) {
    fail('canonical synthetic fixture requires exactly 4 held-out correspondences.');
  }

  return Object.freeze({
    fit: Object.freeze(fit),
    heldOut: Object.freeze(heldOut),
  });
}

function manifestDigest(
  correspondences: readonly FR300R2GBCorrespondence[],
): string {
  return sha256Utf8(
    JSON.stringify(
      correspondences.map((item) => ({
        pointRef: item.pointRef,
        role: item.role,
        rgbMetricPoint: item.rgbMetricPoint,
        raw3DPoint: item.raw3DPoint,
      })),
    ),
  );
}

function syntheticRawObj(
  correspondences: readonly FR300R2GBCorrespondence[],
): string {
  const vertices = correspondences.map(
    (item) =>
      `v ${item.raw3DPoint[0]} ${item.raw3DPoint[1]} ${item.raw3DPoint[2]}`,
  );
  return [
    '# FR300-R2G-B non-human synthetic raw 3D fixture',
    ...vertices,
    'f 1 2 3',
    'f 3 4 5',
    'f 5 6 7',
    'f 7 8 9',
    'f 9 10 11',
    'f 10 11 12',
  ].join('\n');
}

function syntheticRgbMetricPayload(
  correspondences: readonly FR300R2GBCorrespondence[],
): string {
  return JSON.stringify({
    schemaVersion:
      'fr300-r2g-b-synthetic-rgb-metric-evidence-v1',
    unit: 'millimeter',
    providerCameraExtrinsicsAvailable: false,
    points: correspondences.map((item) => ({
      pointRef: item.pointRef,
      xyz: item.rgbMetricPoint,
    })),
  });
}

function syntheticPilotAssessment(
  correspondences: readonly FR300R2GBCorrespondence[],
) {
  const obj = syntheticRawObj(correspondences);
  const raw3DArtifactDigest = sha256Utf8(obj);

  const input: FR300R2EPREPControlledPilotInput = {
    schemaVersion:
      'fr300-r2e-prep-controlled-pilot-input-v1',
    artifactClass: 'synthetic_fixture',
    providerAccessState: 'pending',
    duaScopeBound: false,
    artifactHandlingEnvironmentApproved: false,
    integrity: {
      schemaVersion:
        'fr300-r2e-prep-artifact-integrity-input-v1',
      artifactRef: 'synthetic/r2g-b/raw3d.obj',
      expectedDigest: raw3DArtifactDigest,
      observedDigest: raw3DArtifactDigest,
      byteLength: Buffer.byteLength(obj, 'utf8'),
    },
    obj: {
      schemaVersion:
        'fr300-r2e-prep-obj-structure-input-v1',
      artifactClass: 'synthetic_fixture',
      objText: obj,
    },
    metric: {
      schemaVersion:
        'fr300-r2e-prep-metric-authority-input-v1',
      artifactRef: 'synthetic/r2g-b/raw3d.obj',
      artifactDigest: raw3DArtifactDigest,
      coordinateUnit: 'millimeter',
      unitEvidenceClass: 'provider_manifest',
      exactArtifactBoundToEvidence: true,
      preprocessingBeforeRawExport: 'none',
    },
    pairing: {
      schemaVersion:
        'fr300-r2e-prep-pairing-authority-input-v1',
      raw3DArtifactRef: 'synthetic/r2g-b/raw3d.obj',
      rgbArtifactRef: 'synthetic/r2g-b/rgb-metric.json',
      sameSubjectBound: true,
      sameSessionBound: true,
      neutralConditionBound: true,
      exactArtifactPairManifestBound: true,
      exactCaptureBound: true,
      temporalSynchronizationBound: true,
      scannerRgbExtrinsicsBound: false,
      validatedRegistrationAlternativeAvailable: false,
    },
  };

  return Object.freeze({
    assessment: assessASTControlledPilotIntake(input),
    raw3DArtifactDigest,
    rgbMetricEvidenceDigest: sha256Utf8(
      syntheticRgbMetricPayload(correspondences),
    ),
  });
}

function assertR2GBPredecessors(): void {
  assertFR300R2FRegistrationContract();
  assertFR300R2GASyntheticCalibratedRegistrationContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2F_AST_RGB_3D_REGISTRATION_CONTRACT_VERSION !==
      'FR300-R2F-AST-RGB-3D-REGISTRATION-CONTRACT-v1' ||
    FR300_R2G_A_SYNTHETIC_CALIBRATED_REGISTRATION_CONTRACT_VERSION !==
      'FR300-R2G-A-SYNTHETIC-CALIBRATED-REGISTRATION-v1' ||
    FR300_R2G_A_CURRENT_GATE.disposition !==
      'synthetic_calibrated_registration_validated_provider_response_pending' ||
    FR300_R2G_A_CURRENT_GATE.providerResponseState !== 'pending' ||
    !FR300_R2G_A_CURRENT_GATE.syntheticProjectionValidated ||
    FR300_R2G_A_CURRENT_GATE.realParticipantArtifactUsed ||
    FR300_R2G_A_CURRENT_GATE.realRegistrationValidatedForFR299Review
  ) {
    fail('R2F/R2G-A predecessor drift.');
  }
}

export function executeFR300R2GBSyntheticIndependentRegistration(
  input: FR300R2GBExecutionInput,
): FR300R2GBRegistrationReceipt {
  assertR2GBPredecessors();

  if (
    input.schemaVersion !==
    'fr300-r2g-b-independent-registration-input-v1'
  ) {
    fail('execution input schemaVersion drift.');
  }

  if (
    input.providerLandmarksUsedAsRegistrationTruth ||
    input.providerLandmarksUsedAsFR266Truth ||
    input.providerLandmarksUsedAsFR297Truth
  ) {
    fail(
      'provider landmarks may not issue registration, FR266, or FR297 truth.',
    );
  }

  const { fit, heldOut } = validateCorrespondences(
    input.correspondences,
  );
  const all = Object.freeze([...fit, ...heldOut]);
  const transform = estimateRigidTransform(fit);

  const fitResiduals = residuals(
    fit,
    transform.rotation,
    transform.translation,
  );
  const heldOutResiduals = residuals(
    heldOut,
    transform.rotation,
    transform.translation,
  );

  const fitRmseMm = rmse(fitResiduals);
  const fitMaxResidualMm = maxResidual(fitResiduals);
  const heldOutRmseMm = rmse(heldOutResiduals);
  const heldOutMaxResidualMm =
    maxResidual(heldOutResiduals);
  const rotationDeterminant =
    determinant3(transform.rotation);
  const orthonormalityError =
    orthonormalityMaxError(transform.rotation);

  const outputFinite = [
    fitRmseMm,
    fitMaxResidualMm,
    heldOutRmseMm,
    heldOutMaxResidualMm,
    rotationDeterminant,
    orthonormalityError,
    ...transform.rotation.flat(),
    ...transform.translation,
  ].every(Number.isFinite);

  const determinantValid =
    Math.abs(rotationDeterminant - 1) <=
    FR300_R2G_B_ACCEPTANCE.determinantTolerance;
  const orthonormalityValid =
    orthonormalityError <=
    FR300_R2G_B_ACCEPTANCE.orthonormalityTolerance;
  const thresholdSatisfied =
    outputFinite &&
    determinantValid &&
    orthonormalityValid &&
    fitRmseMm <=
      FR300_R2G_B_ACCEPTANCE.fitRmseMmThreshold &&
    heldOutRmseMm <=
      FR300_R2G_B_ACCEPTANCE.heldOutRmseMmThreshold &&
    heldOutMaxResidualMm <=
      FR300_R2G_B_ACCEPTANCE.heldOutMaxResidualMmThreshold;

  const pilot = syntheticPilotAssessment(all);
  const correspondenceManifestDigest = manifestDigest(all);

  const r2f = assessFR300R2FRegistration({
    schemaVersion: 'fr300-r2f-registration-input-v1',
    artifactClass: 'synthetic_fixture',
    pilotAssessment: pilot.assessment,
    method: 'independent_geometric_registration',
    raw3DArtifactRef: 'synthetic/r2g-b/raw3d.obj',
    raw3DArtifactDigest: pilot.raw3DArtifactDigest,
    rgbArtifactRef: 'synthetic/r2g-b/rgb-metric.json',
    rgbArtifactDigest: pilot.rgbMetricEvidenceDigest,
    exact3DCoordinateFrameBound: true,
    exactRgbCameraIntrinsicsBound: false,
    exactRgbTo3DExtrinsicsBound: false,
    exactReleasedImageTransformChainBound: false,
    rgbArtifactDigestBoundToRegistrationEvidence: true,
    registrationExecutionObserved: true,
    registrationOutputFinite: outputFinite,
    independentCorrespondenceEvidenceBound: true,
    sourceIndependentCorrespondences: true,
    heldOutValidationExecuted: true,
    acceptanceThresholdPreregistered: true,
    acceptanceThresholdSatisfied: thresholdSatisfied,
    providerLandmarksUsedAsRegistrationTruth: false,
    providerLandmarksUsedAsFR266Truth: false,
    providerLandmarksUsedAsFR297Truth: false,
  });

  const syntheticIndependentRegistrationValidated =
    thresholdSatisfied &&
    r2f.registrationValidatedForFR299Review;

  return Object.freeze({
    schemaVersion:
      'fr300-r2g-b-independent-registration-receipt-v1' as const,
    artifactClass: 'synthetic_fixture' as const,
    solver: 'horn_quaternion_rigid_v1' as const,
    fitCount: fit.length,
    heldOutCount: heldOut.length,
    correspondenceManifestDigest,
    raw3DArtifactDigest: pilot.raw3DArtifactDigest,
    rgbMetricEvidenceDigest: pilot.rgbMetricEvidenceDigest,
    rotation: transform.rotation,
    translation: transform.translation,
    rotationDeterminant,
    orthonormalityMaxError: orthonormalityError,
    fitRmseMm,
    fitMaxResidualMm,
    heldOutRmseMm,
    heldOutMaxResidualMm,
    outputFinite,
    scaleFittingPerformed: false as const,
    heldOutValidationExecuted: true,
    acceptance: Object.freeze({
      preregistered: true as const,
      fitRmseMmThreshold:
        FR300_R2G_B_ACCEPTANCE.fitRmseMmThreshold,
      heldOutRmseMmThreshold:
        FR300_R2G_B_ACCEPTANCE.heldOutRmseMmThreshold,
      heldOutMaxResidualMmThreshold:
        FR300_R2G_B_ACCEPTANCE.heldOutMaxResidualMmThreshold,
      determinantTolerance:
        FR300_R2G_B_ACCEPTANCE.determinantTolerance,
      orthonormalityTolerance:
        FR300_R2G_B_ACCEPTANCE.orthonormalityTolerance,
      thresholdSatisfied,
    }),
    r2fDisposition: r2f.disposition,
    r2fRegistrationValidatedForFR299Review:
      r2f.registrationValidatedForFR299Review,
    syntheticIndependentRegistrationValidated,
    authorityBoundary: Object.freeze({
      syntheticFixtureOnly: true as const,
      realParticipantArtifactUsed: false as const,
      realRegistrationAuthorityIssued: false as const,
      fr299ReferenceMaterialized: false as const,
      fr300R2Authorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export const FR300_R2G_B_CANONICAL_RECEIPT =
  executeFR300R2GBSyntheticIndependentRegistration({
    schemaVersion:
      'fr300-r2g-b-independent-registration-input-v1',
    correspondences: FR300_R2G_B_CANONICAL_CORRESPONDENCES,
    providerLandmarksUsedAsRegistrationTruth: false,
    providerLandmarksUsedAsFR266Truth: false,
    providerLandmarksUsedAsFR297Truth: false,
  });

export const FR300_R2G_B_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2g-b-synthetic-independent-registration-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'synthetic_independent_registration_validated_provider_response_pending' as const,
  providerResponseState: 'pending' as const,
  syntheticIndependentRegistrationExecuted: true as const,
  syntheticHeldOutValidationPassed: true as const,
  scaleFittingPerformed: false as const,
  realParticipantArtifactUsed: false as const,
  realRegistrationValidatedForFR299Review: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextPreApprovalAction:
    'prepare_isolated_controlled_artifact_lifecycle_and_deletion_receipts' as const,
  authority: Object.freeze({
    providerApprovalIssued: false as const,
    realControlledArtifactIntakeAuthorized: false as const,
    realRegistrationAuthorityIssued: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

export function assertFR300R2GBSyntheticIndependentRegistrationContract(): void {
  assertR2GBPredecessors();

  {
    const receipt = FR300_R2G_B_CANONICAL_RECEIPT;
    if (
      receipt.fitCount !== FR300_R2G_B_ACCEPTANCE.fitCount ||
      receipt.heldOutCount !==
        FR300_R2G_B_ACCEPTANCE.heldOutCount ||
      !receipt.outputFinite ||
      receipt.scaleFittingPerformed ||
      !receipt.heldOutValidationExecuted ||
      !receipt.acceptance.preregistered ||
      !receipt.acceptance.thresholdSatisfied ||
      !receipt.r2fRegistrationValidatedForFR299Review ||
      !receipt.syntheticIndependentRegistrationValidated ||
      Math.abs(receipt.rotationDeterminant - 1) >
        FR300_R2G_B_ACCEPTANCE.determinantTolerance ||
      receipt.orthonormalityMaxError >
        FR300_R2G_B_ACCEPTANCE.orthonormalityTolerance ||
      receipt.authorityBoundary.realParticipantArtifactUsed ||
      receipt.authorityBoundary.realRegistrationAuthorityIssued ||
      receipt.authorityBoundary.fr299ReferenceMaterialized ||
      receipt.authorityBoundary.fr300R2Authorized ||
      receipt.authorityBoundary.productColumnMaterialized ||
      receipt.authorityBoundary.productionActivated ||
      receipt.authorityBoundary.commerceActivated
    ) {
      fail('canonical synthetic independent registration receipt drift.');
    }
  }

  const current = FR300_R2G_B_CURRENT_GATE;
  if (
    current.disposition !==
      'synthetic_independent_registration_validated_provider_response_pending' ||
    current.providerResponseState !== 'pending' ||
    !current.syntheticIndependentRegistrationExecuted ||
    !current.syntheticHeldOutValidationPassed ||
    current.scaleFittingPerformed ||
    current.realParticipantArtifactUsed ||
    current.realRegistrationValidatedForFR299Review ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    current.authority.providerApprovalIssued ||
    current.authority.realControlledArtifactIntakeAuthorized ||
    current.authority.realRegistrationAuthorityIssued ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2G-B current gate widened real-data or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;

  if (
    materializedCount !== 18 ||
    current.productMaterialization !== '18/29'
  ) {
    fail('R2G-B must preserve Product 18/29.');
  }
}

assertFR300R2GBSyntheticIndependentRegistrationContract();
