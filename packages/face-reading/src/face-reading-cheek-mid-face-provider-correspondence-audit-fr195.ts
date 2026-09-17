import {
  FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194,
  assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194,
} from './face-reading-cheek-mid-face-neutral-target-feasibility-fr194.js';

export interface ProviderZygionCorrespondenceEvidenceFR195 {
  readonly evidenceId: 'evidence.fr195.dat_2025_mediapipe_width_proxy';
  readonly title: 'AI-Assisted Fusion Technique for Orthodontic Diagnosis Between Cone-Beam Computed Tomography and Face Scan Data';
  readonly year: 2025;
  readonly doi: '10.3390/bioengineering12090975';
  readonly pmcid: 'PMC12467118';
  readonly providerPairUsed: readonly [234, 454];
  readonly providerPairUse: 'bilateral_facial_width_proxy_for_pose_scale_normalization';
  readonly peerReviewedProviderPairUseSupplied: true;
  readonly anthropometricZygionGroundTruthSupplied: false;
  readonly providerToZygionValidationSupplied: false;
  readonly providerSideSemanticValidationSupplied: false;
  readonly universalAnthropometricMappingSupplied: false;
  readonly limitations: readonly string[];
}

export interface ProviderPairRuntimeInspectionFR195 {
  readonly faceOvalEdgeCount: number;
  readonly faceOvalVertexCount: number;
  readonly providerPair: readonly [234, 454];
  readonly pairOrderHasSemanticMeaning: false;
  readonly firstPairMemberPresent: true;
  readonly secondPairMemberPresent: true;
  readonly bothPairMembersPresent: true;
  readonly zygionCorrespondenceObserved: false;
  readonly providerSideSemanticsObserved: false;
}

export interface FaceReadingProviderZygionCorrespondenceAuditFR195 {
  readonly schemaVersion: 'fr195-v1';
  readonly contractId: 'face_reading_provider_zygion_correspondence_audit_fr195';
  readonly contractVersion: 'FR195-PROVIDER-ZYGION-CORRESPONDENCE-AUDIT-v1';
  readonly baselineMainSha: '2d3f06d7a1f58b82d7ec7aa59d5991a18ff42e1c';
  readonly authorityState: 'provider_pair_candidate_supported_zygion_correspondence_unresolved';
  readonly upstreamFR194: {
    readonly moduleRef: 'packages/face-reading/src/face-reading-cheek-mid-face-neutral-target-feasibility-fr194.ts';
    readonly contractId: 'face_reading_cheek_mid_face_neutral_target_feasibility_fr194';
    readonly contractVersion: 'FR194-CHEEK-MID-FACE-NEUTRAL-TARGET-FEASIBILITY-v1';
    readonly nextRequiredGate: 'provider_to_neutral_zygion_correspondence';
  };
  readonly providerSource: {
    readonly packageName: '@mediapipe/tasks-vision';
    readonly packageVersion: '0.10.35';
    readonly sourceRepository: 'google-ai-edge/mediapipe';
    readonly sourceTag: 'v0.10.35';
    readonly sourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts';
    readonly topologySymbol: 'FACE_LANDMARKS_FACE_OVAL';
    readonly exactPairMembershipExpected: true;
    readonly semanticZygionLabelsPublished: false;
  };
  readonly evidence: readonly [ProviderZygionCorrespondenceEvidenceFR195];
  readonly candidatePair: {
    readonly providerIndices: readonly [234, 454];
    readonly providerRole: 'bilateral_lateral_facial_width_proxy_candidate';
    readonly pairOrderHasSemanticMeaning: false;
    readonly faceOvalMembershipSupported: true;
    readonly peerReviewedFacialWidthProxyUseSupported: true;
    readonly neutralZygionCorrespondenceEstablished: false;
    readonly anatomicalLeftRightAssignmentEstablished: false;
    readonly admittedProviderIndices: readonly [];
  };
  readonly admissionGates: readonly [
    { readonly gateId: 'release_exact_provider_pair_membership'; readonly state: 'satisfied'; readonly evidenceRefs: readonly string[]; readonly rationale: string },
    { readonly gateId: 'peer_reviewed_facial_width_proxy_use'; readonly state: 'satisfied'; readonly evidenceRefs: readonly string[]; readonly rationale: string },
    { readonly gateId: 'provider_to_neutral_zygion_correspondence'; readonly state: 'blocked'; readonly evidenceRefs: readonly string[]; readonly rationale: string },
    { readonly gateId: 'provider_side_assignment'; readonly state: 'blocked'; readonly evidenceRefs: readonly string[]; readonly rationale: string },
    { readonly gateId: 'cheek_boundary_correspondence'; readonly state: 'blocked'; readonly evidenceRefs: readonly string[]; readonly rationale: string },
    { readonly gateId: 'deterministic_cheek_geometry'; readonly state: 'blocked'; readonly evidenceRefs: readonly string[]; readonly rationale: string },
  ];
  readonly authorityBoundary: {
    readonly provider234IsZygion: false;
    readonly provider454IsZygion: false;
    readonly providerPairOrderMeansAnatomicalLaterality: false;
    readonly facialWidthProxyMeansBizygomaticAuthority: false;
    readonly faceOvalMembershipMeansZygionCorrespondence: false;
    readonly providerIndexSelectionAuthorized: false;
    readonly providerSubgraphSelectionAuthorized: false;
    readonly cheekBoundaryAuthorized: false;
    readonly cheekMetricAuthorized: false;
    readonly thresholdAuthorized: false;
    readonly calibrationAuthorized: false;
    readonly classifierAuthorized: false;
    readonly captureSufficiencyAuthorized: false;
    readonly participantOrExpertCollectionAuthorized: false;
    readonly traditionalProjectionAuthorized: false;
    readonly productionActivationAuthorized: false;
    readonly commerceActivationAuthorized: false;
  };
  readonly readiness: {
    readonly releaseExactPairMembershipReady: true;
    readonly peerReviewedFacialWidthProxyEvidenceReady: true;
    readonly providerToNeutralZygionCorrespondenceReady: false;
    readonly providerIndexAdmissionReady: false;
    readonly executableCheekGeometryReady: false;
    readonly coverageStateRemains: 'coverage_target_unverified';
    readonly nextRequiredGate: 'direct_provider_to_neutral_zygion_correspondence_validation';
  };
  readonly nextFrontier: 'obtain_source_governed_or_independently_validated_provider_to_zygion_correspondence_before_any_provider_index_admission';
}

const EVIDENCE: ProviderZygionCorrespondenceEvidenceFR195 = Object.freeze({
  evidenceId: 'evidence.fr195.dat_2025_mediapipe_width_proxy' as const,
  title: 'AI-Assisted Fusion Technique for Orthodontic Diagnosis Between Cone-Beam Computed Tomography and Face Scan Data' as const,
  year: 2025 as const,
  doi: '10.3390/bioengineering12090975' as const,
  pmcid: 'PMC12467118' as const,
  providerPairUsed: Object.freeze([234, 454] as const),
  providerPairUse: 'bilateral_facial_width_proxy_for_pose_scale_normalization' as const,
  peerReviewedProviderPairUseSupplied: true as const,
  anthropometricZygionGroundTruthSupplied: false as const,
  providerToZygionValidationSupplied: false as const,
  providerSideSemanticValidationSupplied: false as const,
  universalAnthropometricMappingSupplied: false as const,
  limitations: Object.freeze([
    'The study uses landmarks 234 and 454 as a facial-width proxy; it does not validate either index against independently labeled anthropometric zygion ground truth.',
    'The study does not authorize MyeongHa anatomical left/right assignment from provider numbering or serialization.',
    'A facial-width normalization proxy is not equivalent to bizygomatic metric or neutral cheek-anchor authority.',
  ]),
});

export const FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195: FaceReadingProviderZygionCorrespondenceAuditFR195 = Object.freeze({
  schemaVersion: 'fr195-v1' as const,
  contractId: 'face_reading_provider_zygion_correspondence_audit_fr195' as const,
  contractVersion: 'FR195-PROVIDER-ZYGION-CORRESPONDENCE-AUDIT-v1' as const,
  baselineMainSha: '2d3f06d7a1f58b82d7ec7aa59d5991a18ff42e1c' as const,
  authorityState: 'provider_pair_candidate_supported_zygion_correspondence_unresolved' as const,
  upstreamFR194: Object.freeze({
    moduleRef: 'packages/face-reading/src/face-reading-cheek-mid-face-neutral-target-feasibility-fr194.ts' as const,
    contractId: 'face_reading_cheek_mid_face_neutral_target_feasibility_fr194' as const,
    contractVersion: 'FR194-CHEEK-MID-FACE-NEUTRAL-TARGET-FEASIBILITY-v1' as const,
    nextRequiredGate: 'provider_to_neutral_zygion_correspondence' as const,
  }),
  providerSource: Object.freeze({
    packageName: '@mediapipe/tasks-vision' as const,
    packageVersion: '0.10.35' as const,
    sourceRepository: 'google-ai-edge/mediapipe' as const,
    sourceTag: 'v0.10.35' as const,
    sourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts' as const,
    topologySymbol: 'FACE_LANDMARKS_FACE_OVAL' as const,
    exactPairMembershipExpected: true as const,
    semanticZygionLabelsPublished: false as const,
  }),
  evidence: Object.freeze([EVIDENCE]) as readonly [ProviderZygionCorrespondenceEvidenceFR195],
  candidatePair: Object.freeze({
    providerIndices: Object.freeze([234, 454] as const),
    providerRole: 'bilateral_lateral_facial_width_proxy_candidate' as const,
    pairOrderHasSemanticMeaning: false as const,
    faceOvalMembershipSupported: true as const,
    peerReviewedFacialWidthProxyUseSupported: true as const,
    neutralZygionCorrespondenceEstablished: false as const,
    anatomicalLeftRightAssignmentEstablished: false as const,
    admittedProviderIndices: Object.freeze([]) as readonly [],
  }),
  admissionGates: Object.freeze([
    Object.freeze({ gateId: 'release_exact_provider_pair_membership' as const, state: 'satisfied' as const, evidenceRefs: Object.freeze(['provider.mediapipe.tasks_vision@0.10.35:v0.10.35:FACE_LANDMARKS_FACE_OVAL']), rationale: 'Exact v0.10.35 provider source places both 234 and 454 in the published face-oval topology.' }),
    Object.freeze({ gateId: 'peer_reviewed_facial_width_proxy_use' as const, state: 'satisfied' as const, evidenceRefs: Object.freeze([EVIDENCE.evidenceId]), rationale: 'Peer-reviewed 2025 work uses the 234/454 pair as a facial-width proxy for normalization.' }),
    Object.freeze({ gateId: 'provider_to_neutral_zygion_correspondence' as const, state: 'blocked' as const, evidenceRefs: Object.freeze([EVIDENCE.evidenceId]), rationale: 'Neither provider source nor peer-reviewed proxy use validates 234 or 454 against independently labeled neutral zygion ground truth.' }),
    Object.freeze({ gateId: 'provider_side_assignment' as const, state: 'blocked' as const, evidenceRefs: Object.freeze([]), rationale: 'Provider numbering/order alone cannot establish anatomical left/right role.' }),
    Object.freeze({ gateId: 'cheek_boundary_correspondence' as const, state: 'blocked' as const, evidenceRefs: Object.freeze([]), rationale: 'A bilateral pair does not define a closed cheek boundary or provider cheek subgraph.' }),
    Object.freeze({ gateId: 'deterministic_cheek_geometry' as const, state: 'blocked' as const, evidenceRefs: Object.freeze([]), rationale: 'Provider-to-neutral correspondence and cheek boundary remain unresolved.' }),
  ]) as FaceReadingProviderZygionCorrespondenceAuditFR195['admissionGates'],
  authorityBoundary: Object.freeze({
    provider234IsZygion: false as const,
    provider454IsZygion: false as const,
    providerPairOrderMeansAnatomicalLaterality: false as const,
    facialWidthProxyMeansBizygomaticAuthority: false as const,
    faceOvalMembershipMeansZygionCorrespondence: false as const,
    providerIndexSelectionAuthorized: false as const,
    providerSubgraphSelectionAuthorized: false as const,
    cheekBoundaryAuthorized: false as const,
    cheekMetricAuthorized: false as const,
    thresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    classifierAuthorized: false as const,
    captureSufficiencyAuthorized: false as const,
    participantOrExpertCollectionAuthorized: false as const,
    traditionalProjectionAuthorized: false as const,
    productionActivationAuthorized: false as const,
    commerceActivationAuthorized: false as const,
  }),
  readiness: Object.freeze({
    releaseExactPairMembershipReady: true as const,
    peerReviewedFacialWidthProxyEvidenceReady: true as const,
    providerToNeutralZygionCorrespondenceReady: false as const,
    providerIndexAdmissionReady: false as const,
    executableCheekGeometryReady: false as const,
    coverageStateRemains: 'coverage_target_unverified' as const,
    nextRequiredGate: 'direct_provider_to_neutral_zygion_correspondence_validation' as const,
  }),
  nextFrontier: 'obtain_source_governed_or_independently_validated_provider_to_zygion_correspondence_before_any_provider_index_admission' as const,
});

type ProviderConnection = Readonly<{ start: number; end: number }>;

function readFaceOvalConnections(runtimeClass: object): readonly ProviderConnection[] {
  const value = Reflect.get(runtimeClass, 'FACE_LANDMARKS_FACE_OVAL') as unknown;
  if (!Array.isArray(value) || value.length === 0) throw new Error('fr195_missing_face_oval');
  return Object.freeze(value.map((item) => {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) throw new Error('fr195_invalid_face_oval_connection');
    const record = item as Record<string, unknown>;
    if (!Number.isInteger(record.start) || !Number.isInteger(record.end) || (record.start as number) < 0 || (record.end as number) < 0) {
      throw new Error('fr195_invalid_face_oval_connection');
    }
    return Object.freeze({ start: record.start as number, end: record.end as number });
  }));
}

export function inspectMediaPipeProviderZygionCandidatePairFR195(runtimeClass: object): ProviderPairRuntimeInspectionFR195 {
  const edges = readFaceOvalConnections(runtimeClass);
  const vertices = new Set(edges.flatMap((edge) => [edge.start, edge.end]));
  if (!vertices.has(234) || !vertices.has(454)) throw new Error('fr195_candidate_pair_not_in_face_oval');
  return Object.freeze({
    faceOvalEdgeCount: edges.length,
    faceOvalVertexCount: vertices.size,
    providerPair: Object.freeze([234, 454] as const),
    pairOrderHasSemanticMeaning: false as const,
    firstPairMemberPresent: true as const,
    secondPairMemberPresent: true as const,
    bothPairMembersPresent: true as const,
    zygionCorrespondenceObserved: false as const,
    providerSideSemanticsObserved: false as const,
  });
}

export function assertFaceReadingProviderZygionCorrespondenceAuditFR195(
  value: FaceReadingProviderZygionCorrespondenceAuditFR195,
): FaceReadingProviderZygionCorrespondenceAuditFR195 {
  assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194);
  if (
    value.schemaVersion !== 'fr195-v1' ||
    value.contractId !== 'face_reading_provider_zygion_correspondence_audit_fr195' ||
    value.contractVersion !== 'FR195-PROVIDER-ZYGION-CORRESPONDENCE-AUDIT-v1' ||
    value.baselineMainSha !== '2d3f06d7a1f58b82d7ec7aa59d5991a18ff42e1c' ||
    value.authorityState !== 'provider_pair_candidate_supported_zygion_correspondence_unresolved'
  ) throw new Error('fr195_identity_or_baseline_drift');

  if (
    value.upstreamFR194.contractId !== 'face_reading_cheek_mid_face_neutral_target_feasibility_fr194' ||
    value.upstreamFR194.contractVersion !== 'FR194-CHEEK-MID-FACE-NEUTRAL-TARGET-FEASIBILITY-v1' ||
    value.upstreamFR194.nextRequiredGate !== 'provider_to_neutral_zygion_correspondence'
  ) throw new Error('fr195_upstream_fr194_drift');

  const provider = value.providerSource;
  if (
    provider.packageName !== '@mediapipe/tasks-vision' || provider.packageVersion !== '0.10.35' || provider.sourceTag !== 'v0.10.35' ||
    provider.topologySymbol !== 'FACE_LANDMARKS_FACE_OVAL' || provider.exactPairMembershipExpected !== true || provider.semanticZygionLabelsPublished !== false
  ) throw new Error('fr195_provider_source_drift');

  if (value.evidence.length !== 1) throw new Error('fr195_evidence_membership_drift');
  const evidence = value.evidence[0];
  if (
    evidence.evidenceId !== 'evidence.fr195.dat_2025_mediapipe_width_proxy' || evidence.doi !== '10.3390/bioengineering12090975' ||
    evidence.pmcid !== 'PMC12467118' || evidence.providerPairUsed[0] !== 234 || evidence.providerPairUsed[1] !== 454 ||
    evidence.peerReviewedProviderPairUseSupplied !== true || evidence.anthropometricZygionGroundTruthSupplied !== false ||
    evidence.providerToZygionValidationSupplied !== false || evidence.providerSideSemanticValidationSupplied !== false ||
    evidence.universalAnthropometricMappingSupplied !== false || evidence.limitations.length < 3
  ) throw new Error('fr195_evidence_drift_or_authority_widening');

  const candidate = value.candidatePair;
  if (
    candidate.providerIndices[0] !== 234 || candidate.providerIndices[1] !== 454 || candidate.providerIndices.length !== 2 ||
    candidate.providerRole !== 'bilateral_lateral_facial_width_proxy_candidate' || candidate.pairOrderHasSemanticMeaning !== false ||
    candidate.faceOvalMembershipSupported !== true || candidate.peerReviewedFacialWidthProxyUseSupported !== true ||
    candidate.neutralZygionCorrespondenceEstablished !== false || candidate.anatomicalLeftRightAssignmentEstablished !== false ||
    candidate.admittedProviderIndices.length !== 0
  ) throw new Error('fr195_candidate_pair_drift_or_promotion');

  const expectedStates = ['satisfied', 'satisfied', 'blocked', 'blocked', 'blocked', 'blocked'];
  if (value.admissionGates.length !== 6 || value.admissionGates.some((gate, index) => gate.state !== expectedStates[index])) throw new Error('fr195_gate_state_drift');
  if (Object.values(value.authorityBoundary).some((flag) => flag !== false)) throw new Error('fr195_authority_widening');
  if (
    value.readiness.releaseExactPairMembershipReady !== true || value.readiness.peerReviewedFacialWidthProxyEvidenceReady !== true ||
    value.readiness.providerToNeutralZygionCorrespondenceReady !== false || value.readiness.providerIndexAdmissionReady !== false ||
    value.readiness.executableCheekGeometryReady !== false || value.readiness.coverageStateRemains !== 'coverage_target_unverified' ||
    value.readiness.nextRequiredGate !== 'direct_provider_to_neutral_zygion_correspondence_validation'
  ) throw new Error('fr195_readiness_drift');
  if (value.nextFrontier !== 'obtain_source_governed_or_independently_validated_provider_to_zygion_correspondence_before_any_provider_index_admission') throw new Error('fr195_next_frontier_drift');
  return value;
}

const ISSUED = new WeakSet<object>();

export function issueFaceReadingProviderZygionCorrespondenceAuditFR195(): FaceReadingProviderZygionCorrespondenceAuditFR195 {
  const issued = Object.freeze({ ...FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195 });
  ISSUED.add(issued);
  return issued;
}

export function assertIssuedFaceReadingProviderZygionCorrespondenceAuditFR195(
  value: FaceReadingProviderZygionCorrespondenceAuditFR195,
): FaceReadingProviderZygionCorrespondenceAuditFR195 {
  assertFaceReadingProviderZygionCorrespondenceAuditFR195(value);
  if (!ISSUED.has(value)) throw new Error('fr195_unissued_provider_zygion_correspondence_audit');
  return value;
}
