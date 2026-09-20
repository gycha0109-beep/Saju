import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  type PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  computeEyeNeutralAxisBundleFR210,
  type FR210EyeNeutralAxisBundle,
} from './eye-neutral-axis-bundle-fr210.js';
import {
  computeVisibleMidfaceBandFR211,
  type FR211VisibleMidfaceBandResult,
} from './visible-midface-band-fr211.js';
import {
  computeVisibleMouthCornerOrientationFR212,
  type FR212MouthCornerOrientationResult,
} from './visible-mouth-corner-orientation-fr212.js';
import {
  computeVisibleLowerFaceWidthFR213,
  type FR213VisibleLowerFaceWidthResult,
} from './visible-lower-face-width-fr213.js';
import {
  computeRoleFreeMouthOutlineAngularityFR214,
  type FR214MouthOutlineAngularityResult,
} from './role-free-mouth-outline-angularity-fr214.js';
import {
  computeEyeAsymmetrySurfaceFR215,
  type FR215EyeAsymmetrySurface,
} from './eye-asymmetry-surface-fr215.js';
import {
  computeCanonicalVisibleLowerFaceContourFR216,
  type FR216VisibleLowerFaceContourResult,
} from './canonical-visible-lower-face-contour-fr216.js';
import {
  computeVisibleCheekContourProminenceFR217,
  type FR217VisibleCheekContourProminenceResult,
} from './visible-cheek-contour-prominence-fr217.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE001_CONTRACT_VERSION =
  'FE001-PREVIEW-OBSERVABLE-ENGINE-SNAPSHOT-v1' as const;

export interface FE001Availability {
  readonly state: 'complete' | 'partial';
  readonly unavailableRefs: readonly string[];
  readonly fallbackInvented: false;
}

export interface FE001PreviewObservableEngineSnapshot {
  readonly schemaVersion: 'fe001-preview-observable-engine-snapshot-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE001_CONTRACT_VERSION;
  readonly engineState: 'preview_observable_only';
  readonly source: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly metricGeometrySchemaVersion: 'fr77-governed-metric-geometry-candidate-v1';
    readonly lipsGeometrySchemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
    readonly sameProviderRunVerified: true;
    readonly sameCanonicalAssetDigestVerified: true;
  };
  readonly regions: {
    readonly eyePair: {
      readonly neutralAxes: FR210EyeNeutralAxisBundle;
      readonly asymmetry: FR215EyeAsymmetrySurface;
    };
    readonly cheekMidFace: {
      readonly visibleWidth: FR211VisibleMidfaceBandResult;
      readonly visibleContourProminence: FR217VisibleCheekContourProminenceResult;
    };
    readonly mouthLips: {
      readonly visibleCornerOrientation: FR212MouthCornerOrientationResult;
      readonly visibleOutlineAngularity: FR214MouthOutlineAngularityResult;
    };
    readonly chinLowerFace: {
      readonly visibleWidth: FR213VisibleLowerFaceWidthResult;
      readonly visibleContour: FR216VisibleLowerFaceContourResult;
    };
  };
  readonly availability: FE001Availability;
  readonly authorityBoundary: {
    readonly consumesUpstreamAuthorityOnly: true;
    readonly performsResearchDecision: false;
    readonly performsValidationDecision: false;
    readonly anatomicalInferenceAllowed: false;
    readonly thresholdOrClassifierAllowed: false;
    readonly traditionalInterpretationAllowed: false;
    readonly physiognomyClaimGenerationAllowed: false;
    readonly fortuneClaimGenerationAllowed: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const AUTHORITY_BOUNDARY = Object.freeze({
  consumesUpstreamAuthorityOnly: true as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  anatomicalInferenceAllowed: false as const,
  thresholdOrClassifierAllowed: false as const,
  traditionalInterpretationAllowed: false as const,
  physiognomyClaimGenerationAllowed: false as const,
  fortuneClaimGenerationAllowed: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-001 ${message}`);
}

function collectUnavailableRefs(input: {
  readonly eye: FR210EyeNeutralAxisBundle;
  readonly midface: FR211VisibleMidfaceBandResult;
  readonly cheek: FR217VisibleCheekContourProminenceResult;
  readonly mouthCorner: FR212MouthCornerOrientationResult;
  readonly lowerWidth: FR213VisibleLowerFaceWidthResult;
  readonly lowerContour: FR216VisibleLowerFaceContourResult;
}): readonly string[] {
  const unavailable: string[] = [];
  if ('status' in input.eye.axes.outerCornerTilt && input.eye.axes.outerCornerTilt.status === 'unavailable') {
    unavailable.push('eye_pair.outer_corner_tilt');
  }
  if (input.midface.status === 'unavailable') unavailable.push('cheek_mid_face.visible_width');
  if (input.cheek.status === 'unavailable') unavailable.push('cheek_mid_face.visible_contour_prominence');
  if (input.mouthCorner.status === 'unavailable') unavailable.push('mouth_lips.visible_corner_orientation');
  if (input.lowerWidth.status === 'unavailable') unavailable.push('chin_lower_face.visible_width');
  if (input.lowerContour.status === 'unavailable') unavailable.push('chin_lower_face.visible_contour');
  return Object.freeze(unavailable);
}

export function runPreviewObservableEngineFE001(
  metricGeometry: GovernedMetricGeometryCandidateFR77V1,
  lipsGeometry: PoseNormalizedLipsGeometryFR79V1,
): FE001PreviewObservableEngineSnapshot {
  assertIssuedGovernedMetricGeometryFR77(metricGeometry);
  assertIssuedPoseNormalizedLipsGeometryFR79(lipsGeometry);

  if (
    metricGeometry.provider.providerRunRef !== lipsGeometry.provenance.providerRunRef ||
    metricGeometry.provider.canonicalAssetDigest !== lipsGeometry.provenance.canonicalAssetDigest
  ) {
    fail('FR77 and FR79 inputs must belong to the same provider run and canonical asset.');
  }

  const eye = computeEyeNeutralAxisBundleFR210(metricGeometry);
  const asymmetry = computeEyeAsymmetrySurfaceFR215(metricGeometry);
  const midface = computeVisibleMidfaceBandFR211(metricGeometry, lipsGeometry);
  const cheek = computeVisibleCheekContourProminenceFR217(metricGeometry, lipsGeometry);
  const mouthCorner = computeVisibleMouthCornerOrientationFR212(lipsGeometry);
  const mouthAngularity = computeRoleFreeMouthOutlineAngularityFR214(lipsGeometry);
  const lowerWidth = computeVisibleLowerFaceWidthFR213(metricGeometry, lipsGeometry);
  const lowerContour = computeCanonicalVisibleLowerFaceContourFR216(metricGeometry, lipsGeometry);

  const unavailableRefs = collectUnavailableRefs({
    eye,
    midface,
    cheek,
    mouthCorner,
    lowerWidth,
    lowerContour,
  });

  const snapshot: FE001PreviewObservableEngineSnapshot = Object.freeze({
    schemaVersion: 'fe001-preview-observable-engine-snapshot-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE001_CONTRACT_VERSION,
    engineState: 'preview_observable_only' as const,
    source: Object.freeze({
      providerRunRef: metricGeometry.provider.providerRunRef,
      canonicalAssetDigest: metricGeometry.provider.canonicalAssetDigest,
      metricGeometrySchemaVersion: metricGeometry.schemaVersion,
      lipsGeometrySchemaVersion: lipsGeometry.schemaVersion,
      sameProviderRunVerified: true as const,
      sameCanonicalAssetDigestVerified: true as const,
    }),
    regions: Object.freeze({
      eyePair: Object.freeze({
        neutralAxes: eye,
        asymmetry,
      }),
      cheekMidFace: Object.freeze({
        visibleWidth: midface,
        visibleContourProminence: cheek,
      }),
      mouthLips: Object.freeze({
        visibleCornerOrientation: mouthCorner,
        visibleOutlineAngularity: mouthAngularity,
      }),
      chinLowerFace: Object.freeze({
        visibleWidth: lowerWidth,
        visibleContour: lowerContour,
      }),
    }),
    availability: Object.freeze({
      state: unavailableRefs.length === 0 ? 'complete' as const : 'partial' as const,
      unavailableRefs,
      fallbackInvented: false as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertPreviewObservableEngineSnapshotFE001(snapshot);
  return snapshot;
}

export function assertPreviewObservableEngineSnapshotFE001(
  snapshot: FE001PreviewObservableEngineSnapshot,
): void {
  if (
    snapshot.schemaVersion !== 'fe001-preview-observable-engine-snapshot-v1' ||
    snapshot.artifactVersion !== '0.1.0' ||
    snapshot.contractVersion !== FE001_CONTRACT_VERSION ||
    snapshot.engineState !== 'preview_observable_only' ||
    snapshot.source.sameProviderRunVerified !== true ||
    snapshot.source.sameCanonicalAssetDigestVerified !== true ||
    snapshot.availability.fallbackInvented !== false
  ) {
    fail('snapshot identity/source boundary drift.');
  }

  const unavailable = snapshot.availability.unavailableRefs;
  if (
    new Set(unavailable).size !== unavailable.length ||
    unavailable.some((ref) => ref.trim().length === 0) ||
    snapshot.availability.state !== (unavailable.length === 0 ? 'complete' : 'partial')
  ) {
    fail('availability summary drift.');
  }

  if (
    snapshot.authorityBoundary.consumesUpstreamAuthorityOnly !== true ||
    Object.entries(snapshot.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamAuthorityOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('engine authority widened beyond preview observable composition.');
  }
}
