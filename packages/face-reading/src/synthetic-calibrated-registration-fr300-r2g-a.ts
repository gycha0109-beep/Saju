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
  FR300_R2F_CURRENT_GATE,
  assessFR300R2FRegistration,
  assertFR300R2FRegistrationContract,
} from './ast-rgb-3d-registration-contract-fr300-r2f.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2G_A_SYNTHETIC_CALIBRATED_REGISTRATION_CONTRACT_VERSION =
  'FR300-R2G-A-SYNTHETIC-CALIBRATED-REGISTRATION-v1' as const;

type Vec3 = readonly [number, number, number];
type Mat3 = readonly [
  readonly [number, number, number],
  readonly [number, number, number],
  readonly [number, number, number],
];

export interface FR300R2GACameraIntrinsics {
  readonly fx: number;
  readonly fy: number;
  readonly cx: number;
  readonly cy: number;
}

export interface FR300R2GARigidTransform {
  readonly rotation: Mat3;
  readonly translation: Vec3;
}

export interface FR300R2GAReleasedImageTransform {
  readonly scaleX: number;
  readonly scaleY: number;
  readonly offsetX: number;
  readonly offsetY: number;
}

export interface FR300R2GAProjectionExecutionInput {
  readonly schemaVersion: 'fr300-r2g-a-projection-execution-input-v1';
  readonly intrinsics: FR300R2GACameraIntrinsics;
  readonly extrinsics: FR300R2GARigidTransform;
  readonly releasedImageTransform:
    FR300R2GAReleasedImageTransform;
}

export interface FR300R2GAProjectionPointReceipt {
  readonly pointRef: string;
  readonly projectedU: number;
  readonly projectedV: number;
  readonly expectedU: number;
  readonly expectedV: number;
  readonly residualPx: number;
}

export interface FR300R2GASyntheticRegistrationReceipt {
  readonly schemaVersion:
    'fr300-r2g-a-synthetic-registration-receipt-v1';
  readonly artifactClass: 'synthetic_fixture';
  readonly pointCount: number;
  readonly raw3DArtifactDigest: string;
  readonly rgbEvidenceDigest: string;
  readonly outputFinite: boolean;
  readonly rmsePx: number;
  readonly maxResidualPx: number;
  readonly acceptance: {
    readonly preregistered: true;
    readonly maxResidualPxThreshold: number;
    readonly rmsePxThreshold: number;
    readonly thresholdSatisfied: boolean;
  };
  readonly binding: {
    readonly exact3DCoordinateFrameBound: true;
    readonly exactRgbCameraIntrinsicsBound: boolean;
    readonly exactRgbTo3DExtrinsicsBound: boolean;
    readonly exactReleasedImageTransformChainBound: boolean;
    readonly rgbArtifactDigestBoundToRegistrationEvidence: true;
  };
  readonly points: readonly FR300R2GAProjectionPointReceipt[];
  readonly r2fDisposition:
    | 'predecessor_not_ready'
    | 'calibrated_projection_evidence_incomplete'
    | 'independent_registration_evidence_incomplete'
    | 'registration_validated_for_materialization_review';
  readonly r2fRegistrationValidatedForFR299Review: boolean;
  readonly syntheticRegistrationValidated: boolean;
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

const IDENTITY_ROTATION: Mat3 = Object.freeze([
  Object.freeze([1, 0, 0] as const),
  Object.freeze([0, 1, 0] as const),
  Object.freeze([0, 0, 1] as const),
] as const);

export const FR300_R2G_A_CANONICAL_INTRINSICS =
  Object.freeze({
    fx: 820,
    fy: 815,
    cx: 320,
    cy: 240,
  } as const);

export const FR300_R2G_A_CANONICAL_EXTRINSICS =
  Object.freeze({
    rotation: IDENTITY_ROTATION,
    translation: Object.freeze([5, -3, 20] as const),
  } as const);

export const FR300_R2G_A_CANONICAL_RELEASE_TRANSFORM =
  Object.freeze({
    scaleX: 0.75,
    scaleY: 0.75,
    offsetX: -12,
    offsetY: 8,
  } as const);

export const FR300_R2G_A_ACCEPTANCE = Object.freeze({
  pointCount: 6 as const,
  maxResidualPxThreshold: 1e-9,
  rmsePxThreshold: 1e-9,
});

const SYNTHETIC_POINTS = Object.freeze([
  Object.freeze({
    pointRef: 'p0',
    xyz: Object.freeze([-40, -30, 500] as const),
    expected: Object.freeze({
      u: 186.60576923076923,
      v: 149.2091346153846,
    }),
  }),
  Object.freeze({
    pointRef: 'p1',
    xyz: Object.freeze([40, -30, 500] as const),
    expected: Object.freeze({
      u: 281.2211538461538,
      v: 149.2091346153846,
    }),
  }),
  Object.freeze({
    pointRef: 'p2',
    xyz: Object.freeze([0, 35, 500] as const),
    expected: Object.freeze({
      u: 233.91346153846152,
      v: 225.61538461538458,
    }),
  }),
  Object.freeze({
    pointRef: 'p3',
    xyz: Object.freeze([-20, 15, 600] as const),
    expected: Object.freeze({
      u: 213.1209677419355,
      v: 199.83064516129033,
    }),
  }),
  Object.freeze({
    pointRef: 'p4',
    xyz: Object.freeze([25, 20, 650] as const),
    expected: Object.freeze({
      u: 255.53731343283584,
      v: 203.50932835820896,
    }),
  }),
  Object.freeze({
    pointRef: 'p5',
    xyz: Object.freeze([0, 0, 550] as const),
    expected: Object.freeze({
      u: 233.39473684210526,
      v: 184.7828947368421,
    }),
  }),
] as const);

const SYNTHETIC_OBJ = [
  '# FR300-R2G-A non-human synthetic geometry fixture',
  'v -40 -30 500',
  'v 40 -30 500',
  'v 0 35 500',
  'v -20 15 600',
  'v 25 20 650',
  'v 0 0 550',
  'f 1 2 3',
  'f 3 4 5',
  'f 1 5 6',
].join('\n');

const RGB_EVIDENCE_PAYLOAD = JSON.stringify({
  schemaVersion:
    'fr300-r2g-a-synthetic-rgb-evidence-v1',
  coordinateConvention: 'released_image_pixels',
  points: SYNTHETIC_POINTS.map((point) => ({
    pointRef: point.pointRef,
    u: point.expected.u,
    v: point.expected.v,
  })),
});

function sha256Utf8(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

export const FR300_R2G_A_SYNTHETIC_RAW_3D_DIGEST =
  sha256Utf8(SYNTHETIC_OBJ);

export const FR300_R2G_A_SYNTHETIC_RGB_EVIDENCE_DIGEST =
  sha256Utf8(RGB_EVIDENCE_PAYLOAD);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2G-A ${message}`,
  );
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) {
    fail(`${label} must be finite.`);
  }
  return value;
}

function transformPoint(
  point: Vec3,
  transform: FR300R2GARigidTransform,
): Vec3 {
  const [x, y, z] = point;
  const [r0, r1, r2] = transform.rotation;
  const [tx, ty, tz] = transform.translation;

  const cameraX =
    r0[0] * x + r0[1] * y + r0[2] * z + tx;
  const cameraY =
    r1[0] * x + r1[1] * y + r1[2] * z + ty;
  const cameraZ =
    r2[0] * x + r2[1] * y + r2[2] * z + tz;

  if (
    !Number.isFinite(cameraX) ||
    !Number.isFinite(cameraY) ||
    !Number.isFinite(cameraZ) ||
    cameraZ <= 0
  ) {
    fail('projection requires finite camera coordinates with z > 0.');
  }

  return [cameraX, cameraY, cameraZ];
}

function projectPoint(
  point: Vec3,
  intrinsics: FR300R2GACameraIntrinsics,
  extrinsics: FR300R2GARigidTransform,
  released: FR300R2GAReleasedImageTransform,
): readonly [number, number] {
  const [x, y, z] = transformPoint(point, extrinsics);

  const rawU =
    finite(intrinsics.fx, 'intrinsics.fx') * x / z +
    finite(intrinsics.cx, 'intrinsics.cx');
  const rawV =
    finite(intrinsics.fy, 'intrinsics.fy') * y / z +
    finite(intrinsics.cy, 'intrinsics.cy');

  const u =
    finite(released.scaleX, 'released.scaleX') * rawU +
    finite(released.offsetX, 'released.offsetX');
  const v =
    finite(released.scaleY, 'released.scaleY') * rawV +
    finite(released.offsetY, 'released.offsetY');

  if (!Number.isFinite(u) || !Number.isFinite(v)) {
    fail('projection output must be finite.');
  }

  return [u, v];
}

function sameIntrinsics(
  value: FR300R2GACameraIntrinsics,
): boolean {
  return (
    value.fx === FR300_R2G_A_CANONICAL_INTRINSICS.fx &&
    value.fy === FR300_R2G_A_CANONICAL_INTRINSICS.fy &&
    value.cx === FR300_R2G_A_CANONICAL_INTRINSICS.cx &&
    value.cy === FR300_R2G_A_CANONICAL_INTRINSICS.cy
  );
}

function sameMat3(a: Mat3, b: Mat3): boolean {
  return (
    a[0][0] === b[0][0] &&
    a[0][1] === b[0][1] &&
    a[0][2] === b[0][2] &&
    a[1][0] === b[1][0] &&
    a[1][1] === b[1][1] &&
    a[1][2] === b[1][2] &&
    a[2][0] === b[2][0] &&
    a[2][1] === b[2][1] &&
    a[2][2] === b[2][2]
  );
}

function sameExtrinsics(
  value: FR300R2GARigidTransform,
): boolean {
  const expected = FR300_R2G_A_CANONICAL_EXTRINSICS;
  return (
    sameMat3(value.rotation, expected.rotation) &&
    value.translation[0] === expected.translation[0] &&
    value.translation[1] === expected.translation[1] &&
    value.translation[2] === expected.translation[2]
  );
}

function sameReleasedImageTransform(
  value: FR300R2GAReleasedImageTransform,
): boolean {
  const expected = FR300_R2G_A_CANONICAL_RELEASE_TRANSFORM;
  return (
    value.scaleX === expected.scaleX &&
    value.scaleY === expected.scaleY &&
    value.offsetX === expected.offsetX &&
    value.offsetY === expected.offsetY
  );
}

function syntheticPilotAssessment() {
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
      artifactRef: 'synthetic/r2g-a/raw3d.obj',
      expectedDigest: FR300_R2G_A_SYNTHETIC_RAW_3D_DIGEST,
      observedDigest: FR300_R2G_A_SYNTHETIC_RAW_3D_DIGEST,
      byteLength: Buffer.byteLength(SYNTHETIC_OBJ, 'utf8'),
    },
    obj: {
      schemaVersion:
        'fr300-r2e-prep-obj-structure-input-v1',
      artifactClass: 'synthetic_fixture',
      objText: SYNTHETIC_OBJ,
    },
    metric: {
      schemaVersion:
        'fr300-r2e-prep-metric-authority-input-v1',
      artifactRef: 'synthetic/r2g-a/raw3d.obj',
      artifactDigest: FR300_R2G_A_SYNTHETIC_RAW_3D_DIGEST,
      coordinateUnit: 'millimeter',
      unitEvidenceClass: 'provider_manifest',
      exactArtifactBoundToEvidence: true,
      preprocessingBeforeRawExport: 'none',
    },
    pairing: {
      schemaVersion:
        'fr300-r2e-prep-pairing-authority-input-v1',
      raw3DArtifactRef: 'synthetic/r2g-a/raw3d.obj',
      rgbArtifactRef: 'synthetic/r2g-a/frontal.rgb.json',
      sameSubjectBound: true,
      sameSessionBound: true,
      neutralConditionBound: true,
      exactArtifactPairManifestBound: true,
      exactCaptureBound: true,
      temporalSynchronizationBound: true,
      scannerRgbExtrinsicsBound: true,
      validatedRegistrationAlternativeAvailable: false,
    },
  };

  return assessASTControlledPilotIntake(input);
}

export function executeFR300R2GASyntheticCalibratedRegistration(
  input: FR300R2GAProjectionExecutionInput,
): FR300R2GASyntheticRegistrationReceipt {
  if (
    input.schemaVersion !==
    'fr300-r2g-a-projection-execution-input-v1'
  ) {
    fail('projection execution schemaVersion drift.');
  }

  const points = SYNTHETIC_POINTS.map((point) => {
    const [projectedU, projectedV] = projectPoint(
      point.xyz,
      input.intrinsics,
      input.extrinsics,
      input.releasedImageTransform,
    );
    const dx = projectedU - point.expected.u;
    const dy = projectedV - point.expected.v;
    const residualPx = Math.hypot(dx, dy);

    return Object.freeze({
      pointRef: point.pointRef,
      projectedU,
      projectedV,
      expectedU: point.expected.u,
      expectedV: point.expected.v,
      residualPx,
    });
  });

  const outputFinite = points.every(
    (point) =>
      Number.isFinite(point.projectedU) &&
      Number.isFinite(point.projectedV) &&
      Number.isFinite(point.residualPx),
  );

  const squaredResidualSum = points.reduce(
    (sum, point) => sum + point.residualPx ** 2,
    0,
  );
  const rmsePx = Math.sqrt(
    squaredResidualSum / points.length,
  );
  const maxResidualPx = Math.max(
    ...points.map((point) => point.residualPx),
  );

  const thresholdSatisfied =
    points.length === FR300_R2G_A_ACCEPTANCE.pointCount &&
    outputFinite &&
    rmsePx <= FR300_R2G_A_ACCEPTANCE.rmsePxThreshold &&
    maxResidualPx <=
      FR300_R2G_A_ACCEPTANCE.maxResidualPxThreshold;

  const exactRgbCameraIntrinsicsBound =
    sameIntrinsics(input.intrinsics);
  const exactRgbTo3DExtrinsicsBound =
    sameExtrinsics(input.extrinsics);
  const exactReleasedImageTransformChainBound =
    sameReleasedImageTransform(input.releasedImageTransform);

  const pilotAssessment = syntheticPilotAssessment();
  const r2f = assessFR300R2FRegistration({
    schemaVersion: 'fr300-r2f-registration-input-v1',
    artifactClass: 'synthetic_fixture',
    pilotAssessment,
    method: 'exact_calibrated_projection',
    raw3DArtifactRef: 'synthetic/r2g-a/raw3d.obj',
    raw3DArtifactDigest:
      FR300_R2G_A_SYNTHETIC_RAW_3D_DIGEST,
    rgbArtifactRef: 'synthetic/r2g-a/frontal.rgb.json',
    rgbArtifactDigest:
      FR300_R2G_A_SYNTHETIC_RGB_EVIDENCE_DIGEST,
    exact3DCoordinateFrameBound: true,
    exactRgbCameraIntrinsicsBound:
      exactRgbCameraIntrinsicsBound &&
      thresholdSatisfied,
    exactRgbTo3DExtrinsicsBound:
      exactRgbTo3DExtrinsicsBound &&
      thresholdSatisfied,
    exactReleasedImageTransformChainBound:
      exactReleasedImageTransformChainBound &&
      thresholdSatisfied,
    rgbArtifactDigestBoundToRegistrationEvidence: true,
    registrationExecutionObserved: true,
    registrationOutputFinite: outputFinite,
    independentCorrespondenceEvidenceBound: false,
    sourceIndependentCorrespondences: false,
    heldOutValidationExecuted: false,
    acceptanceThresholdPreregistered: true,
    acceptanceThresholdSatisfied: thresholdSatisfied,
    providerLandmarksUsedAsRegistrationTruth: false,
    providerLandmarksUsedAsFR266Truth: false,
    providerLandmarksUsedAsFR297Truth: false,
  });

  const syntheticRegistrationValidated =
    thresholdSatisfied &&
    exactRgbCameraIntrinsicsBound &&
    exactRgbTo3DExtrinsicsBound &&
    exactReleasedImageTransformChainBound &&
    r2f.registrationValidatedForFR299Review;

  return Object.freeze({
    schemaVersion:
      'fr300-r2g-a-synthetic-registration-receipt-v1' as const,
    artifactClass: 'synthetic_fixture' as const,
    pointCount: points.length,
    raw3DArtifactDigest:
      FR300_R2G_A_SYNTHETIC_RAW_3D_DIGEST,
    rgbEvidenceDigest:
      FR300_R2G_A_SYNTHETIC_RGB_EVIDENCE_DIGEST,
    outputFinite,
    rmsePx,
    maxResidualPx,
    acceptance: Object.freeze({
      preregistered: true as const,
      maxResidualPxThreshold:
        FR300_R2G_A_ACCEPTANCE.maxResidualPxThreshold,
      rmsePxThreshold:
        FR300_R2G_A_ACCEPTANCE.rmsePxThreshold,
      thresholdSatisfied,
    }),
    binding: Object.freeze({
      exact3DCoordinateFrameBound: true as const,
      exactRgbCameraIntrinsicsBound,
      exactRgbTo3DExtrinsicsBound,
      exactReleasedImageTransformChainBound,
      rgbArtifactDigestBoundToRegistrationEvidence:
        true as const,
    }),
    points: Object.freeze(points),
    r2fDisposition: r2f.disposition,
    r2fRegistrationValidatedForFR299Review:
      r2f.registrationValidatedForFR299Review,
    syntheticRegistrationValidated,
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

export const FR300_R2G_A_CANONICAL_RECEIPT =
  executeFR300R2GASyntheticCalibratedRegistration({
    schemaVersion:
      'fr300-r2g-a-projection-execution-input-v1',
    intrinsics: FR300_R2G_A_CANONICAL_INTRINSICS,
    extrinsics: FR300_R2G_A_CANONICAL_EXTRINSICS,
    releasedImageTransform:
      FR300_R2G_A_CANONICAL_RELEASE_TRANSFORM,
  });

export const FR300_R2G_A_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2g-a-synthetic-calibrated-registration-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'synthetic_calibrated_registration_validated_provider_response_pending' as const,
  providerResponseState: 'pending' as const,
  syntheticProjectionExecutionPerformed: true as const,
  syntheticProjectionValidated: true as const,
  realParticipantArtifactUsed: false as const,
  realRegistrationValidatedForFR299Review: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextPreApprovalAction:
    'exercise_independent_geometric_registration_with_preregistered_held_out_synthetic_fixture' as const,
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

export function assertFR300R2GASyntheticCalibratedRegistrationContract(): void {
  assertFR300R2FRegistrationContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2F_AST_RGB_3D_REGISTRATION_CONTRACT_VERSION !==
      'FR300-R2F-AST-RGB-3D-REGISTRATION-CONTRACT-v1' ||
    FR300_R2F_CURRENT_GATE.disposition !==
      'registration_contract_ready_provider_response_pending' ||
    FR300_R2F_CURRENT_GATE.providerResponseState !== 'pending' ||
    !FR300_R2F_CURRENT_GATE.registrationContractReady ||
    !FR300_R2F_CURRENT_GATE.syntheticFixtureValidationOnly
  ) {
    fail('R2F predecessor drift.');
  }

  const receipt = FR300_R2G_A_CANONICAL_RECEIPT;
  if (
    receipt.pointCount !== FR300_R2G_A_ACCEPTANCE.pointCount ||
    !receipt.outputFinite ||
    !receipt.acceptance.preregistered ||
    !receipt.acceptance.thresholdSatisfied ||
    !receipt.binding.exact3DCoordinateFrameBound ||
    !receipt.binding.exactRgbCameraIntrinsicsBound ||
    !receipt.binding.exactRgbTo3DExtrinsicsBound ||
    !receipt.binding.exactReleasedImageTransformChainBound ||
    !receipt.binding
      .rgbArtifactDigestBoundToRegistrationEvidence ||
    !receipt.r2fRegistrationValidatedForFR299Review ||
    !receipt.syntheticRegistrationValidated ||
    receipt.authorityBoundary.realParticipantArtifactUsed ||
    receipt.authorityBoundary.realRegistrationAuthorityIssued ||
    receipt.authorityBoundary.fr299ReferenceMaterialized ||
    receipt.authorityBoundary.fr300R2Authorized ||
    receipt.authorityBoundary.productColumnMaterialized ||
    receipt.authorityBoundary.productionActivated ||
    receipt.authorityBoundary.commerceActivated
  ) {
    fail('canonical synthetic registration receipt drift.');
  }

  const current = FR300_R2G_A_CURRENT_GATE;
  if (
    current.disposition !==
      'synthetic_calibrated_registration_validated_provider_response_pending' ||
    current.providerResponseState !== 'pending' ||
    !current.syntheticProjectionExecutionPerformed ||
    !current.syntheticProjectionValidated ||
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
    fail('R2G-A current gate widened real-data or product authority.');
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
    fail('R2G-A must preserve Product 18/29.');
  }
}

assertFR300R2GASyntheticCalibratedRegistrationContract();
