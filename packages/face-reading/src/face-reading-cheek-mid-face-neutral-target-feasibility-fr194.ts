import {
  FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193,
  assertFaceReadingBoundedCoverageGapSelectionFR193,
} from './face-reading-bounded-coverage-gap-selection-fr193.js';

export type CheekMidFaceNeutralEvidenceScopeFR194 =
  | 'neutral_facial_anthropometry'
  | 'midface_dense_surface_morphometrics'
  | 'landmark_selected_3d_surface_roi';

export interface CheekMidFaceNeutralEvidenceFR194 {
  readonly evidenceId: string;
  readonly title: string;
  readonly year: number;
  readonly doi: string;
  readonly pmcid: string;
  readonly sourceScope: CheekMidFaceNeutralEvidenceScopeFR194;
  readonly reviewedObservation: string;
  readonly supportsBilateralZygionCheekAnchor: boolean;
  readonly supportsMidfaceSoftTissueSurfaceStudy: boolean;
  readonly supportsLandmarkSelectedSurfaceRoi: boolean;
  readonly universalCheekBoundarySupplied: false;
  readonly providerMappingSupplied: false;
  readonly providerIndexAuthoritySupplied: false;
  readonly traditionalPhysiognomyAuthoritySupplied: false;
  readonly limitations: readonly string[];
}

export interface CheekMidFaceProviderSurfaceFeasibilityFR194 {
  readonly packageName: '@mediapipe/tasks-vision';
  readonly packageVersion: '0.10.35';
  readonly sourceRepository: 'google-ai-edge/mediapipe';
  readonly sourceTag: 'v0.10.35';
  readonly sourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts';
  readonly tessellationSymbol: 'FACE_LANDMARKS_TESSELATION';
  readonly faceOvalSymbol: 'FACE_LANDMARKS_FACE_OVAL';
  readonly runtimeInspectionRequired: true;
  readonly faceSurfaceStudyFeasible: true;
  readonly semanticCheekSubgraphDefined: false;
  readonly providerToZygionMappingDefined: false;
  readonly providerIndexSelectionAuthorized: false;
  readonly providerSubgraphSelectionAuthorized: false;
  readonly packageUpgradeAuthorized: false;
}

export interface CheekMidFaceProviderSurfaceInspectionFR194 {
  readonly tessellationEdgeCount: number;
  readonly tessellationVertexCount: number;
  readonly faceOvalEdgeCount: number;
  readonly faceOvalVertexCount: number;
  readonly maxObservedProviderIndex: number;
  readonly tessellationStructurallyAvailable: true;
  readonly faceOvalStructurallyAvailable: true;
  readonly semanticCheekMappingObserved: false;
}

export type CheekMidFaceAdmissionGateIdFR194 =
  | 'external_neutral_target_model'
  | 'pinned_provider_surface_feasibility'
  | 'provider_to_neutral_zygion_correspondence'
  | 'cheek_boundary_correspondence'
  | 'controlled_capture_sufficiency'
  | 'deterministic_cheek_geometry';

export interface CheekMidFaceAdmissionGateFR194 {
  readonly gateId: CheekMidFaceAdmissionGateIdFR194;
  readonly state: 'satisfied' | 'blocked';
  readonly evidenceRefs: readonly string[];
  readonly rationale: string;
}

export interface FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194 {
  readonly schemaVersion: 'fr194-v1';
  readonly contractId: 'face_reading_cheek_mid_face_neutral_target_feasibility_fr194';
  readonly contractVersion: 'FR194-CHEEK-MID-FACE-NEUTRAL-TARGET-FEASIBILITY-v1';
  readonly baselineMainSha: '09fe9d15d74d53014c605478bb46f2534a059b32';
  readonly authorityState: 'neutral_target_model_supported_provider_surface_feasible_mapping_blocked';
  readonly upstreamFR193: {
    readonly moduleRef: 'packages/face-reading/src/face-reading-bounded-coverage-gap-selection-fr193.ts';
    readonly contractId: 'face_reading_bounded_coverage_gap_selection_fr193';
    readonly contractVersion: 'FR193-BOUNDED-COVERAGE-GAP-SELECTION-v1';
    readonly selectedPhysicalCandidate: 'cheek_mid_face';
    readonly requiredNextEvidence: 'neutral_anatomical_target_model_and_pinned_provider_surface_feasibility';
  };
  readonly evidence: readonly CheekMidFaceNeutralEvidenceFR194[];
  readonly neutralTargetModel: {
    readonly layer: 'physical_observable';
    readonly componentKey: 'cheek_mid_face';
    readonly laterality: 'bilateral';
    readonly representation: 'bilateral_lateral_midface_soft_tissue_surface';
    readonly zygionAnchorConceptSupported: true;
    readonly midfaceSurfaceStudySupported: true;
    readonly landmarkSelectedSurfaceRoiSupported: true;
    readonly coverageStateRemains: 'coverage_target_unverified';
    readonly closedBoundaryDefined: false;
    readonly polygonDefined: false;
    readonly centroidAlgorithmDefined: false;
    readonly metricDefined: false;
  };
  readonly providerSurfaceFeasibility: CheekMidFaceProviderSurfaceFeasibilityFR194;
  readonly admissionGates: readonly CheekMidFaceAdmissionGateFR194[];
  readonly authorityBoundary: {
    readonly literatureZygionMeansProviderIndex: false;
    readonly literatureMiddleThirdRoiMeansUniversalCheekBoundary: false;
    readonly providerTessellationMeansCheekGeometry: false;
    readonly providerFaceOvalMeansCheekBoundary: false;
    readonly providerIndexMayBeAssigned: false;
    readonly providerSubgraphMayBeSelected: false;
    readonly sixFusMayDefineNeutralCheekGeometry: false;
    readonly captureSufficiencyIssued: false;
    readonly metricAuthorityIssued: false;
    readonly thresholdAuthorityIssued: false;
    readonly calibrationAuthorityIssued: false;
    readonly classifierAuthorityIssued: false;
    readonly productionActivationIssued: false;
    readonly commerceActivationIssued: false;
  };
  readonly readiness: {
    readonly neutralTargetModelReady: true;
    readonly pinnedProviderSurfaceFeasibilityReady: true;
    readonly providerToNeutralAnchorMappingReady: false;
    readonly closedCheekBoundaryReady: false;
    readonly executableCheekGeometryReady: false;
    readonly nextRequiredGate: 'provider_to_neutral_zygion_correspondence';
  };
  readonly nextFrontier: 'establish_provider_to_neutral_cheek_anchor_correspondence_evidence_before_any_provider_index_selection';
}

const EVIDENCE: readonly CheekMidFaceNeutralEvidenceFR194[] = Object.freeze([
  Object.freeze({
    evidenceId: 'evidence.fr194.anas_2019_2d_3d_facial_morphology',
    title: 'A comparison between 2D and 3D methods of quantifying facial morphology',
    year: 2019,
    doi: '10.1016/j.heliyon.2019.e01880',
    pmcid: 'PMC6579906',
    sourceScope: 'neutral_facial_anthropometry' as const,
    reviewedObservation: 'The protocol defines bilateral zygion as the most lateral point on the cheek, supporting zygion as a neutral cheek-side anatomical anchor concept.',
    supportsBilateralZygionCheekAnchor: true,
    supportsMidfaceSoftTissueSurfaceStudy: false,
    supportsLandmarkSelectedSurfaceRoi: false,
    universalCheekBoundarySupplied: false as const,
    providerMappingSupplied: false as const,
    providerIndexAuthoritySupplied: false as const,
    traditionalPhysiognomyAuthoritySupplied: false as const,
    limitations: Object.freeze([
      'The source defines anthropometric landmarks and measurements, not a closed cheek region.',
      'The source does not map zygion or any other landmark to MediaPipe indices.',
      'The paper reports non-interchangeability between 2D and 3D measurement methods, so modality-specific numeric calibration cannot be imported.',
    ]),
  }),
  Object.freeze({
    evidenceId: 'evidence.fr194.ibrahim_2016_midface_dense_surface',
    title: 'Combined soft and skeletal tissue modelling of normal and dysmorphic midface postnatal development',
    year: 2016,
    doi: '10.1016/j.jcms.2016.08.020',
    pmcid: 'PMC5682025',
    sourceScope: 'midface_dense_surface_morphometrics' as const,
    reviewedObservation: 'The study defines soft-tissue zygion and analyzes extracted midface soft-tissue surfaces with dense surface correspondence, supporting a neutral midface surface as a research target.',
    supportsBilateralZygionCheekAnchor: true,
    supportsMidfaceSoftTissueSurfaceStudy: true,
    supportsLandmarkSelectedSurfaceRoi: false,
    universalCheekBoundarySupplied: false as const,
    providerMappingSupplied: false as const,
    providerIndexAuthoritySupplied: false as const,
    traditionalPhysiognomyAuthoritySupplied: false as const,
    limitations: Object.freeze([
      'The clinical midface model is not a MediaPipe semantic component.',
      'Dense correspondence in the source is produced by that study protocol and does not authorize provider-index equivalence.',
      'The pediatric control/dysmorphic study population cannot establish MyeongHa runtime thresholds or general-population calibration.',
    ]),
  }),
  Object.freeze({
    evidenceId: 'evidence.fr194.cappella_2024_middle_third_surface_roi',
    title: 'Comparison of Different 3D Surface Registration-Based Methods to Assess Facial Asymmetry',
    year: 2024,
    doi: '10.3390/diagnostics14222573',
    pmcid: 'PMC11593128',
    sourceScope: 'landmark_selected_3d_surface_roi' as const,
    reviewedObservation: 'The study selects explicit 3D facial-third surfaces from anatomical landmarks, demonstrating that a middle-face surface ROI can be defined for morphometric analysis.',
    supportsBilateralZygionCheekAnchor: true,
    supportsMidfaceSoftTissueSurfaceStudy: true,
    supportsLandmarkSelectedSurfaceRoi: true,
    universalCheekBoundarySupplied: false as const,
    providerMappingSupplied: false as const,
    providerIndexAuthoritySupplied: false as const,
    traditionalPhysiognomyAuthoritySupplied: false as const,
    limitations: Object.freeze([
      'The paper compares multiple ROI methods and reports that methods are not fully interchangeable.',
      'Its middle-third ROI is broader than cheek/mid-face and must not be copied as a universal cheek boundary.',
      'The source supplies no MediaPipe index mapping and no MyeongHa runtime geometry algorithm.',
    ]),
  }),
]);

const PROVIDER_SURFACE_FEASIBILITY: CheekMidFaceProviderSurfaceFeasibilityFR194 = Object.freeze({
  packageName: '@mediapipe/tasks-vision' as const,
  packageVersion: '0.10.35' as const,
  sourceRepository: 'google-ai-edge/mediapipe' as const,
  sourceTag: 'v0.10.35' as const,
  sourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts' as const,
  tessellationSymbol: 'FACE_LANDMARKS_TESSELATION' as const,
  faceOvalSymbol: 'FACE_LANDMARKS_FACE_OVAL' as const,
  runtimeInspectionRequired: true as const,
  faceSurfaceStudyFeasible: true as const,
  semanticCheekSubgraphDefined: false as const,
  providerToZygionMappingDefined: false as const,
  providerIndexSelectionAuthorized: false as const,
  providerSubgraphSelectionAuthorized: false as const,
  packageUpgradeAuthorized: false as const,
});

const GATES: readonly CheekMidFaceAdmissionGateFR194[] = Object.freeze([
  Object.freeze({
    gateId: 'external_neutral_target_model' as const,
    state: 'satisfied' as const,
    evidenceRefs: Object.freeze(EVIDENCE.map((entry) => entry.evidenceId)),
    rationale: 'Peer-reviewed neutral anthropometry and 3D morphometrics support bilateral zygion as a cheek anchor concept and midface soft-tissue surface analysis without defining an executable cheek polygon.',
  }),
  Object.freeze({
    gateId: 'pinned_provider_surface_feasibility' as const,
    state: 'satisfied' as const,
    evidenceRefs: Object.freeze(['provider.mediapipe.tasks_vision@0.10.35:v0.10.35:FACE_LANDMARKS_TESSELATION', 'provider.mediapipe.tasks_vision@0.10.35:v0.10.35:FACE_LANDMARKS_FACE_OVAL']),
    rationale: 'The exact pinned provider publishes face tessellation and face-oval connection surfaces that can be inspected for neutral feasibility.',
  }),
  Object.freeze({
    gateId: 'provider_to_neutral_zygion_correspondence' as const,
    state: 'blocked' as const,
    evidenceRefs: Object.freeze([]),
    rationale: 'No reviewed authority maps any provider index to the neutral zygion concept.',
  }),
  Object.freeze({
    gateId: 'cheek_boundary_correspondence' as const,
    state: 'blocked' as const,
    evidenceRefs: Object.freeze([]),
    rationale: 'No source-governed closed cheek boundary or provider-to-boundary correspondence exists.',
  }),
  Object.freeze({
    gateId: 'controlled_capture_sufficiency' as const,
    state: 'blocked' as const,
    evidenceRefs: Object.freeze([]),
    rationale: 'FR191 does not declare universal cheek/mid-face capture sufficiency and no FR194 evidence supplies it.',
  }),
  Object.freeze({
    gateId: 'deterministic_cheek_geometry' as const,
    state: 'blocked' as const,
    evidenceRefs: Object.freeze([]),
    rationale: 'Provider correspondence and cheek boundary remain unresolved, so no deterministic cheek geometry may be issued.',
  }),
]);

const AUTHORITY_BOUNDARY = Object.freeze({
  literatureZygionMeansProviderIndex: false as const,
  literatureMiddleThirdRoiMeansUniversalCheekBoundary: false as const,
  providerTessellationMeansCheekGeometry: false as const,
  providerFaceOvalMeansCheekBoundary: false as const,
  providerIndexMayBeAssigned: false as const,
  providerSubgraphMayBeSelected: false as const,
  sixFusMayDefineNeutralCheekGeometry: false as const,
  captureSufficiencyIssued: false as const,
  metricAuthorityIssued: false as const,
  thresholdAuthorityIssued: false as const,
  calibrationAuthorityIssued: false as const,
  classifierAuthorityIssued: false as const,
  productionActivationIssued: false as const,
  commerceActivationIssued: false as const,
});

export const FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194: FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194 = Object.freeze({
  schemaVersion: 'fr194-v1' as const,
  contractId: 'face_reading_cheek_mid_face_neutral_target_feasibility_fr194' as const,
  contractVersion: 'FR194-CHEEK-MID-FACE-NEUTRAL-TARGET-FEASIBILITY-v1' as const,
  baselineMainSha: '09fe9d15d74d53014c605478bb46f2534a059b32' as const,
  authorityState: 'neutral_target_model_supported_provider_surface_feasible_mapping_blocked' as const,
  upstreamFR193: Object.freeze({
    moduleRef: 'packages/face-reading/src/face-reading-bounded-coverage-gap-selection-fr193.ts' as const,
    contractId: 'face_reading_bounded_coverage_gap_selection_fr193' as const,
    contractVersion: 'FR193-BOUNDED-COVERAGE-GAP-SELECTION-v1' as const,
    selectedPhysicalCandidate: 'cheek_mid_face' as const,
    requiredNextEvidence: 'neutral_anatomical_target_model_and_pinned_provider_surface_feasibility' as const,
  }),
  evidence: EVIDENCE,
  neutralTargetModel: Object.freeze({
    layer: 'physical_observable' as const,
    componentKey: 'cheek_mid_face' as const,
    laterality: 'bilateral' as const,
    representation: 'bilateral_lateral_midface_soft_tissue_surface' as const,
    zygionAnchorConceptSupported: true as const,
    midfaceSurfaceStudySupported: true as const,
    landmarkSelectedSurfaceRoiSupported: true as const,
    coverageStateRemains: 'coverage_target_unverified' as const,
    closedBoundaryDefined: false as const,
    polygonDefined: false as const,
    centroidAlgorithmDefined: false as const,
    metricDefined: false as const,
  }),
  providerSurfaceFeasibility: PROVIDER_SURFACE_FEASIBILITY,
  admissionGates: GATES,
  authorityBoundary: AUTHORITY_BOUNDARY,
  readiness: Object.freeze({
    neutralTargetModelReady: true as const,
    pinnedProviderSurfaceFeasibilityReady: true as const,
    providerToNeutralAnchorMappingReady: false as const,
    closedCheekBoundaryReady: false as const,
    executableCheekGeometryReady: false as const,
    nextRequiredGate: 'provider_to_neutral_zygion_correspondence' as const,
  }),
  nextFrontier: 'establish_provider_to_neutral_cheek_anchor_correspondence_evidence_before_any_provider_index_selection' as const,
});

type ProviderConnection = Readonly<{ start: number; end: number }>;

function readConnections(runtimeClass: object, symbol: string): readonly ProviderConnection[] {
  const value = Reflect.get(runtimeClass, symbol) as unknown;
  if (!Array.isArray(value) || value.length === 0) throw new Error(`fr194_missing_or_empty_provider_surface:${symbol}`);
  const connections: ProviderConnection[] = [];
  for (const item of value) {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) throw new Error(`fr194_invalid_provider_connection:${symbol}`);
    const record = item as Record<string, unknown>;
    if (!Number.isInteger(record.start) || !Number.isInteger(record.end) || (record.start as number) < 0 || (record.end as number) < 0 || record.start === record.end) {
      throw new Error(`fr194_invalid_provider_connection:${symbol}`);
    }
    connections.push(Object.freeze({ start: record.start as number, end: record.end as number }));
  }
  return Object.freeze(connections);
}

export function inspectMediaPipeCheekMidFaceSurfaceFeasibilityFR194(
  faceLandmarkerRuntimeClass: object,
): CheekMidFaceProviderSurfaceInspectionFR194 {
  const tessellation = readConnections(faceLandmarkerRuntimeClass, PROVIDER_SURFACE_FEASIBILITY.tessellationSymbol);
  const faceOval = readConnections(faceLandmarkerRuntimeClass, PROVIDER_SURFACE_FEASIBILITY.faceOvalSymbol);
  const tessellationVertices = new Set(tessellation.flatMap((edge) => [edge.start, edge.end]));
  const faceOvalVertices = new Set(faceOval.flatMap((edge) => [edge.start, edge.end]));
  const maxObservedProviderIndex = Math.max(...tessellationVertices, ...faceOvalVertices);
  if (tessellation.length <= faceOval.length || tessellationVertices.size <= faceOvalVertices.size || maxObservedProviderIndex > 477) {
    throw new Error('fr194_provider_surface_structure_unexpected');
  }
  return Object.freeze({
    tessellationEdgeCount: tessellation.length,
    tessellationVertexCount: tessellationVertices.size,
    faceOvalEdgeCount: faceOval.length,
    faceOvalVertexCount: faceOvalVertices.size,
    maxObservedProviderIndex,
    tessellationStructurallyAvailable: true as const,
    faceOvalStructurallyAvailable: true as const,
    semanticCheekMappingObserved: false as const,
  });
}

export function assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(
  value: FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194,
): FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194 {
  assertFaceReadingBoundedCoverageGapSelectionFR193(FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193);
  if (
    value.schemaVersion !== 'fr194-v1' ||
    value.contractId !== 'face_reading_cheek_mid_face_neutral_target_feasibility_fr194' ||
    value.contractVersion !== 'FR194-CHEEK-MID-FACE-NEUTRAL-TARGET-FEASIBILITY-v1' ||
    value.baselineMainSha !== '09fe9d15d74d53014c605478bb46f2534a059b32' ||
    value.authorityState !== 'neutral_target_model_supported_provider_surface_feasible_mapping_blocked'
  ) throw new Error('fr194_identity_or_baseline_drift');

  if (
    value.upstreamFR193.moduleRef !== 'packages/face-reading/src/face-reading-bounded-coverage-gap-selection-fr193.ts' ||
    value.upstreamFR193.contractId !== 'face_reading_bounded_coverage_gap_selection_fr193' ||
    value.upstreamFR193.contractVersion !== 'FR193-BOUNDED-COVERAGE-GAP-SELECTION-v1' ||
    value.upstreamFR193.selectedPhysicalCandidate !== 'cheek_mid_face' ||
    value.upstreamFR193.requiredNextEvidence !== 'neutral_anatomical_target_model_and_pinned_provider_surface_feasibility'
  ) throw new Error('fr194_upstream_fr193_drift');

  const expectedEvidenceIds = EVIDENCE.map((entry) => entry.evidenceId);
  if (value.evidence.length !== 3 || value.evidence.some((entry, index) => entry.evidenceId !== expectedEvidenceIds[index])) throw new Error('fr194_evidence_membership_drift');
  for (const evidence of value.evidence) {
    if (evidence.doi.trim().length === 0 || evidence.pmcid.trim().length === 0 || evidence.limitations.length === 0) throw new Error(`fr194_invalid_evidence:${evidence.evidenceId}`);
    if (evidence.universalCheekBoundarySupplied !== false || evidence.providerMappingSupplied !== false || evidence.providerIndexAuthoritySupplied !== false || evidence.traditionalPhysiognomyAuthoritySupplied !== false) {
      throw new Error(`fr194_evidence_authority_widening:${evidence.evidenceId}`);
    }
  }
  if (!value.evidence.some((entry) => entry.supportsBilateralZygionCheekAnchor) || !value.evidence.some((entry) => entry.supportsMidfaceSoftTissueSurfaceStudy) || !value.evidence.some((entry) => entry.supportsLandmarkSelectedSurfaceRoi)) {
    throw new Error('fr194_neutral_target_support_missing');
  }

  const target = value.neutralTargetModel;
  if (
    target.layer !== 'physical_observable' || target.componentKey !== 'cheek_mid_face' || target.laterality !== 'bilateral' ||
    target.representation !== 'bilateral_lateral_midface_soft_tissue_surface' || target.zygionAnchorConceptSupported !== true ||
    target.midfaceSurfaceStudySupported !== true || target.landmarkSelectedSurfaceRoiSupported !== true ||
    target.coverageStateRemains !== 'coverage_target_unverified' || target.closedBoundaryDefined !== false ||
    target.polygonDefined !== false || target.centroidAlgorithmDefined !== false || target.metricDefined !== false
  ) throw new Error('fr194_neutral_target_model_drift');

  const provider = value.providerSurfaceFeasibility;
  if (
    provider.packageName !== '@mediapipe/tasks-vision' || provider.packageVersion !== '0.10.35' ||
    provider.sourceRepository !== 'google-ai-edge/mediapipe' || provider.sourceTag !== 'v0.10.35' ||
    provider.sourcePath !== 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts' ||
    provider.tessellationSymbol !== 'FACE_LANDMARKS_TESSELATION' || provider.faceOvalSymbol !== 'FACE_LANDMARKS_FACE_OVAL' ||
    provider.runtimeInspectionRequired !== true || provider.faceSurfaceStudyFeasible !== true ||
    provider.semanticCheekSubgraphDefined !== false || provider.providerToZygionMappingDefined !== false ||
    provider.providerIndexSelectionAuthorized !== false || provider.providerSubgraphSelectionAuthorized !== false || provider.packageUpgradeAuthorized !== false
  ) throw new Error('fr194_provider_feasibility_drift');

  const expectedGateStates: readonly ['satisfied', 'satisfied', 'blocked', 'blocked', 'blocked', 'blocked'] = ['satisfied', 'satisfied', 'blocked', 'blocked', 'blocked', 'blocked'];
  if (value.admissionGates.length !== 6 || value.admissionGates.some((gate, index) => gate.state !== expectedGateStates[index])) throw new Error('fr194_gate_state_drift');
  if (Object.values(value.authorityBoundary).some((flag) => flag !== false)) throw new Error('fr194_authority_widening');
  if (
    value.readiness.neutralTargetModelReady !== true || value.readiness.pinnedProviderSurfaceFeasibilityReady !== true ||
    value.readiness.providerToNeutralAnchorMappingReady !== false || value.readiness.closedCheekBoundaryReady !== false ||
    value.readiness.executableCheekGeometryReady !== false || value.readiness.nextRequiredGate !== 'provider_to_neutral_zygion_correspondence'
  ) throw new Error('fr194_readiness_drift');
  if (value.nextFrontier !== 'establish_provider_to_neutral_cheek_anchor_correspondence_evidence_before_any_provider_index_selection') throw new Error('fr194_next_frontier_drift');
  return value;
}

const ISSUED = new WeakSet<object>();

export function issueFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(): FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194 {
  const issued = Object.freeze({ ...FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194 });
  ISSUED.add(issued);
  return issued;
}

export function assertIssuedFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(
  value: FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194,
): FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194 {
  assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(value);
  if (!ISSUED.has(value)) throw new Error('fr194_unissued_cheek_mid_face_neutral_target_feasibility');
  return value;
}
