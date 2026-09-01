import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
  issueFaceEyePairResearchArtifactFR24,
  type FaceEyePairResearchProjectionInputFR24V1,
  type ProviderEyeTopologySymbolFR24,
} from './face-eye-pair-research-bridge-fr24.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  NEUTRAL_DERIVATION_REGISTRY_FR17,
  assessNeutralDerivationReadinessFR17,
} from './neutral-derivation-registry-fr17.js';
import {
  FACELAB_NEUTRAL_BINDING_PROFILE_FR14,
  type NeutralAnchorConsumerSlotV1,
} from './neutral-provider-bindings-fr14.js';
import type {
  NeutralObservationGeometryV1,
  NormalizedPoint2DV1,
} from './neutral-observation-schema-fr15.js';
import {
  runProductionNeutralObservationProviderFR61,
  type ProductionNeutralObservationProviderRequestFR61V1,
  type ProductionNeutralObservationProviderRunFR61V1,
  type ProviderNormalizedLandmarkFrameFR61V1,
} from './production-neutral-observation-provider-fr61.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface GovernedNeutralGeometryRegionCandidateFR62V1 {
  readonly candidateRef: string;
  readonly providerTopologySymbol: ProviderEyeTopologySymbolFR24;
  readonly geometry: Extract<NeutralObservationGeometryV1, { readonly kind: 'region' }>;
  readonly sideAuthority: 'provider_label_only';
  readonly consumerSlotAssignment: null;
}

export interface GovernedNeutralGeometryBlockedBindingFR62V1 {
  readonly consumerSlot: NeutralAnchorConsumerSlotV1;
  readonly reason:
    | 'anatomical_laterality_unresolved'
    | 'neutral_derivation_not_reviewed';
  readonly derivationRef: string | null;
}

export interface GovernedNeutralGeometryProvenanceFR62V1 {
  readonly providerKey: 'visually_facelab';
  readonly providerRunRef: string;
  readonly canonicalAssetDigest: string;
  readonly sourceFrameSchemaVersion: 'fr61-provider-normalized-landmark-frame-v1';
  readonly eyeProjectionArtifactVersion: '0.1.0';
  readonly neutralDerivationRegistryRef: string;
  readonly neutralObservationContractVersion: 'myeongha-neutral-observation-v1';
  readonly rawSourcePersisted: false;
  readonly rawProviderResponsePersisted: false;
  readonly providerDepthPersisted: false;
  readonly biometricEmbeddingPersisted: false;
}

export interface GovernedNeutralGeometryCandidateFR62V1 {
  readonly schemaVersion: 'fr62-governed-neutral-geometry-candidate-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'research_neutral_geometry_candidate_only';
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly geometryCandidates: readonly GovernedNeutralGeometryRegionCandidateFR62V1[];
  readonly blockedBindings: readonly GovernedNeutralGeometryBlockedBindingFR62V1[];
  readonly pairConsumptionState: 'unordered_provider_labeled_pair_only';
  readonly fr15ConsumerSlotAssignmentsIssued: 0;
  readonly productionNeutralObservationIssued: false;
  readonly anatomicalLateralityResolved: false;
  readonly traditionalSemanticAuthority: false;
  readonly morphologyProduced: false;
  readonly provenance: GovernedNeutralGeometryProvenanceFR62V1;
}

const POINT_KEYS = new Set(['x', 'y']);
const EYE_SLOTS = new Set<NeutralAnchorConsumerSlotV1>([
  'neutral.face.left_eye_region',
  'neutral.face.right_eye_region',
]);

function exactPoint(point: NormalizedPoint2DV1, path: string): NormalizedPoint2DV1 {
  if (typeof point !== 'object' || point === null) {
    throw new FaceAuthorityValidationError(`${path} must be a normalized 2D point.`);
  }
  const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
  if (unexpected !== undefined) {
    throw new FaceAuthorityValidationError(`${path} contains unauthorized field: ${unexpected}`);
  }
  if (!Number.isFinite(point.x) || point.x < 0 || point.x > 1) {
    throw new FaceAuthorityValidationError(`${path}.x must be finite within [0,1].`);
  }
  if (!Number.isFinite(point.y) || point.y < 0 || point.y > 1) {
    throw new FaceAuthorityValidationError(`${path}.y must be finite within [0,1].`);
  }
  return point;
}

function validateSourceRunFR62(run: ProductionNeutralObservationProviderRunFR61V1): void {
  if (typeof run !== 'object' || run === null) {
    throw new FaceAuthorityValidationError('FR-62 requires an issued FR-61 provider candidate run.');
  }
  if (
    run.schemaVersion !== 'fr61-production-neutral-observation-provider-run-v1' ||
    run.authorityState !== 'provider_observation_candidate_only'
  ) {
    throw new FaceAuthorityValidationError('FR-62 source must remain the FR-61 provider candidate boundary.');
  }
  if (
    run.productionNeutralObservationIssued !== false ||
    run.anatomicalLateralityResolved !== false ||
    run.traditionalSemanticAuthority !== false
  ) {
    throw new FaceAuthorityValidationError('FR-62 cannot consume an FR-61 source that claims widened authority.');
  }
  if (
    run.publicationGate.productionNeutralObservationAllowed ||
    run.publicationGate.providerActivationAllowed
  ) {
    throw new FaceAuthorityValidationError('FR-62 v0.1 requires FR-61 production publication and provider activation to remain blocked.');
  }

  const frame = run.frame;
  if (
    frame.schemaVersion !== 'fr61-provider-normalized-landmark-frame-v1' ||
    frame.authorityState !== 'provider_observation_candidate_only' ||
    frame.coordinateFrame !== 'canonical_image_normalized_2d' ||
    frame.providerKey !== 'visually_facelab' ||
    frame.providerOrderingAuthority !== 'internal_provider_order_only_not_fr15_output'
  ) {
    throw new FaceAuthorityValidationError('FR-62 source frame identity or authority boundary is invalid.');
  }
  if (
    frame.productionNeutralObservationIssued !== false ||
    frame.anatomicalLateralityResolved !== false ||
    frame.traditionalSemanticAuthority !== false ||
    frame.rawSourcePersisted !== false ||
    frame.rawProviderResponsePersisted !== false ||
    frame.providerDepthPersisted !== false ||
    frame.biometricEmbeddingPersisted !== false
  ) {
    throw new FaceAuthorityValidationError('FR-62 source frame must preserve FR-61 non-persistence and non-semantic authority.');
  }
  if (!Array.isArray(frame.providerOrderedPoints) || frame.providerOrderedPoints.length === 0) {
    throw new FaceAuthorityValidationError('FR-62 source frame requires provider-ordered normalized points.');
  }
  frame.providerOrderedPoints.forEach((point, index) => {
    exactPoint(point, `fr62.source.providerOrderedPoints[${index}]`);
  });
}

function topologyVertices(symbol: ProviderEyeTopologySymbolFR24): readonly number[] {
  return Object.freeze(Array.from(new Set(
    FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol].flatMap((edge) => [edge.start, edge.end]),
  )).sort((left, right) => left - right));
}

function projectFrameTopologyInputFR62(
  frame: ProviderNormalizedLandmarkFrameFR61V1,
  symbol: ProviderEyeTopologySymbolFR24,
): { readonly pointsByProviderVertex: Readonly<Record<number, NormalizedPoint2DV1>> } {
  const pointsByProviderVertex: Record<number, NormalizedPoint2DV1> = {};
  for (const vertex of topologyVertices(symbol)) {
    const point = frame.providerOrderedPoints[vertex];
    if (point === undefined) {
      throw new FaceAuthorityValidationError(
        `FR-62 source frame is missing required internal provider vertex for ${symbol}.`,
      );
    }
    pointsByProviderVertex[vertex] = exactPoint(
      point,
      `fr62.internalProviderTopology.${symbol}`,
    );
  }
  return Object.freeze({ pointsByProviderVertex: Object.freeze(pointsByProviderVertex) });
}

function buildEyeProjectionInputFR62(
  frame: ProviderNormalizedLandmarkFrameFR61V1,
): FaceEyePairResearchProjectionInputFR24V1 {
  const topologyInputs = Object.freeze(Object.fromEntries(
    FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) => [
      symbol,
      projectFrameTopologyInputFR62(frame, symbol),
    ]),
  ) as FaceEyePairResearchProjectionInputFR24V1['topologyInputs']);

  return Object.freeze({
    providerRunRef: frame.providerRunRef,
    canonicalAssetDigest: frame.canonicalAssetDigest,
    topologyInputs,
  });
}

function buildBlockedBindingsFR62(): readonly GovernedNeutralGeometryBlockedBindingFR62V1[] {
  const readiness = assessNeutralDerivationReadinessFR17();
  if (readiness.executableDerivationRefs.length !== 0) {
    throw new FaceAuthorityValidationError(
      'FR-62 v0.1 requires the FR-17 neutral derivation registry to remain non-executable.',
    );
  }

  return Object.freeze(FACELAB_NEUTRAL_BINDING_PROFILE_FR14.bindings.map((binding) => {
    if (EYE_SLOTS.has(binding.consumerSlot)) {
      return Object.freeze({
        consumerSlot: binding.consumerSlot,
        reason: 'anatomical_laterality_unresolved' as const,
        derivationRef: null,
      });
    }

    const derivation = NEUTRAL_DERIVATION_REGISTRY_FR17.definitions.find(
      (definition) => definition.consumerSlot === binding.consumerSlot,
    );
    if (
      derivation === undefined ||
      !readiness.blockedDerivationRefs.includes(derivation.derivationId)
    ) {
      throw new FaceAuthorityValidationError(
        `FR-62 requires a blocked FR-17 derivation for ${binding.consumerSlot}.`,
      );
    }
    return Object.freeze({
      consumerSlot: binding.consumerSlot,
      reason: 'neutral_derivation_not_reviewed' as const,
      derivationRef: derivation.derivationId,
    });
  }));
}

export function projectFR61RunToGovernedNeutralGeometryFR62(
  run: ProductionNeutralObservationProviderRunFR61V1,
): GovernedNeutralGeometryCandidateFR62V1 {
  validateSourceRunFR62(run);
  const eyeArtifact = issueFaceEyePairResearchArtifactFR24(
    buildEyeProjectionInputFR62(run.frame),
  );

  const geometryCandidates = Object.freeze(eyeArtifact.regions.map((region, index) => Object.freeze({
    candidateRef: `fr62:eye-region:${index + 1}`,
    providerTopologySymbol: region.providerTopologySymbol,
    geometry: Object.freeze({
      kind: 'region' as const,
      boundary: Object.freeze(region.boundary.map((point) => Object.freeze({ x: point.x, y: point.y }))),
    }),
    sideAuthority: 'provider_label_only' as const,
    consumerSlotAssignment: null,
  })));

  return Object.freeze({
    schemaVersion: 'fr62-governed-neutral-geometry-candidate-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'research_neutral_geometry_candidate_only' as const,
    coordinateFrame: 'canonical_image_normalized_2d' as const,
    geometryCandidates,
    blockedBindings: buildBlockedBindingsFR62(),
    pairConsumptionState: 'unordered_provider_labeled_pair_only' as const,
    fr15ConsumerSlotAssignmentsIssued: 0 as const,
    productionNeutralObservationIssued: false as const,
    anatomicalLateralityResolved: false as const,
    traditionalSemanticAuthority: false as const,
    morphologyProduced: false as const,
    provenance: Object.freeze({
      providerKey: run.frame.providerKey,
      providerRunRef: run.frame.providerRunRef,
      canonicalAssetDigest: run.frame.canonicalAssetDigest,
      sourceFrameSchemaVersion: run.frame.schemaVersion,
      eyeProjectionArtifactVersion: eyeArtifact.artifactVersion,
      neutralDerivationRegistryRef:
        `${NEUTRAL_DERIVATION_REGISTRY_FR17.registryId}@${NEUTRAL_DERIVATION_REGISTRY_FR17.version}`,
      neutralObservationContractVersion: 'myeongha-neutral-observation-v1' as const,
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      providerDepthPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });
}

export async function runPhotoToGovernedNeutralGeometryFR62(
  request: ProductionNeutralObservationProviderRequestFR61V1,
  factory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
): Promise<GovernedNeutralGeometryCandidateFR62V1> {
  const run = factory === undefined
    ? await runProductionNeutralObservationProviderFR61(request)
    : await runProductionNeutralObservationProviderFR61(request, factory);
  return projectFR61RunToGovernedNeutralGeometryFR62(run);
}
