export type FaceReadingCoverageGapCandidateKeyFR193 =
  | 'forehead'
  | 'ear'
  | 'cheek_mid_face';

export type FaceReadingCoverageGapDecisionFR193 =
  | 'blocked_pending_candidate_specific_prerequisite'
  | 'selected_bounded_research_frontier';

export interface FaceReadingCoverageGapCandidateFR193 {
  readonly layer: 'physical_observable';
  readonly componentKey: FaceReadingCoverageGapCandidateKeyFR193;
  readonly fr192CoverageState: 'coverage_target_unverified';
  readonly existingNeutralAuthorityRefs: readonly string[];
  readonly blockers: readonly string[];
  readonly decision: FaceReadingCoverageGapDecisionFR193;
  readonly coveragePromoted: false;
}

export interface FaceReadingBoundedCoverageGapSelectionFR193 {
  readonly schemaVersion: 'fr193-v1';
  readonly contractId: 'face_reading_bounded_coverage_gap_selection_fr193';
  readonly contractVersion: 'FR193-BOUNDED-COVERAGE-GAP-SELECTION-v1';
  readonly baselineMainSha: 'b92a0f1d98e7bddd4554432f1c79191a92b728c8';
  readonly upstreamCoverageAuthority: {
    readonly moduleRef: 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts';
    readonly contractId: 'face_reading_master_region_coverage_skeleton_fr192';
    readonly contractVersion: 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1';
    readonly requiredCandidateState: 'coverage_target_unverified';
    readonly nextFrontier: 'select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice';
  };
  readonly providerPin: {
    readonly packageName: '@mediapipe/tasks-vision';
    readonly packageVersion: '0.10.35';
    readonly packageUpgradeAuthorized: false;
  };
  readonly providerEvidenceBoundary: {
    readonly publishedFacialSurfaceMeshMayBeInvestigated: true;
    readonly publishedFaceOvalTopologyMayBeInvestigated: true;
    readonly facialSurfaceMeshEqualsCheekAuthority: false;
    readonly faceOvalEqualsForeheadHairlineAuthority: false;
    readonly providerTopologyEqualsEarAuthority: false;
    readonly providerIndicesMayBeAssignedToCheek: false;
  };
  readonly layerSeparation: {
    readonly traditionalMethodologyEqualsNeutralPhysicalGeometry: false;
    readonly traditionalRegionEqualsInterpretation: false;
    readonly providerSurfaceEqualsAnatomicalComponentAuthority: false;
  };
  readonly candidates: readonly FaceReadingCoverageGapCandidateFR193[];
  readonly selection: {
    readonly mode: 'bounded_research_frontier';
    readonly selectedPhysicalCandidate: 'cheek_mid_face';
    readonly selectedCandidateCoverageStateRemains: 'coverage_target_unverified';
    readonly selectionPromotesCoverage: false;
    readonly requiredNextEvidence: 'neutral_anatomical_target_model_and_pinned_provider_surface_feasibility';
    readonly providerIndicesMayBeAssigned: false;
    readonly componentGeometryMayBeIssued: false;
    readonly rationale: 'Cheek/mid-face is selected only for a bounded neutral-target and pinned-provider surface-feasibility audit. Published facial-surface topology makes that audit meaningful, but does not itself define cheek anatomy or authorize provider indices. Forehead remains blocked by its upper-boundary/hairline problem and ear remains blocked by provider/capture prerequisites.';
  };
  readonly authorityBoundary: {
    readonly selectionIssuesGeometryAuthority: false;
    readonly selectionIssuesCaptureSufficiencyAuthority: false;
    readonly selectionIssuesProviderLandmarkBindingAuthority: false;
    readonly selectionIssuesTraditionalSemanticAuthority: false;
    readonly selectionIssuesMetricAuthority: false;
    readonly selectionIssuesThresholdAuthority: false;
    readonly selectionIssuesCalibrationAuthority: false;
    readonly selectionIssuesClassifierAuthority: false;
    readonly participantOrExpertEvidenceCollectionAuthorized: false;
    readonly selectionIssuesProductionActivation: false;
    readonly selectionIssuesCommerceActivation: false;
  };
  readonly nextFrontier: 'establish_cheek_mid_face_neutral_target_model_and_pinned_provider_surface_feasibility_without_assigning_provider_indices';
}

const CLOSED_AUTHORITY_BOUNDARY = Object.freeze({
  selectionIssuesGeometryAuthority: false as const,
  selectionIssuesCaptureSufficiencyAuthority: false as const,
  selectionIssuesProviderLandmarkBindingAuthority: false as const,
  selectionIssuesTraditionalSemanticAuthority: false as const,
  selectionIssuesMetricAuthority: false as const,
  selectionIssuesThresholdAuthority: false as const,
  selectionIssuesCalibrationAuthority: false as const,
  selectionIssuesClassifierAuthority: false as const,
  participantOrExpertEvidenceCollectionAuthorized: false as const,
  selectionIssuesProductionActivation: false as const,
  selectionIssuesCommerceActivation: false as const,
});

function candidate(
  componentKey: FaceReadingCoverageGapCandidateKeyFR193,
  blockers: readonly string[],
  decision: FaceReadingCoverageGapDecisionFR193,
): FaceReadingCoverageGapCandidateFR193 {
  return Object.freeze({
    layer: 'physical_observable' as const,
    componentKey,
    fr192CoverageState: 'coverage_target_unverified' as const,
    existingNeutralAuthorityRefs: Object.freeze([] as string[]),
    blockers: Object.freeze([...blockers]),
    decision,
    coveragePromoted: false as const,
  });
}

export const FR193_COVERAGE_GAP_CANDIDATES: readonly FaceReadingCoverageGapCandidateFR193[] = Object.freeze([
  candidate(
    'forehead',
    Object.freeze([
      'no_general_physical_forehead_observation_authority',
      'hairline_or_upper_face_boundary_not_governed',
      'published_face_oval_is_not_forehead_hairline_authority',
    ]),
    'blocked_pending_candidate_specific_prerequisite',
  ),
  candidate(
    'ear',
    Object.freeze([
      'no_independent_physical_ear_observation_or_geometry_authority',
      'no_governed_ear_provider_landmark_binding',
      'fr191_profile_view_does_not_declare_universal_ear_capture_sufficiency',
    ]),
    'blocked_pending_candidate_specific_prerequisite',
  ),
  candidate(
    'cheek_mid_face',
    Object.freeze([
      'no_neutral_cheek_mid_face_anatomical_target_model',
      'no_governed_provider_to_cheek_mid_face_mapping',
      'six_fus_is_traditional_methodology_not_neutral_physical_geometry',
    ]),
    'selected_bounded_research_frontier',
  ),
]);

export const FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193: FaceReadingBoundedCoverageGapSelectionFR193 = Object.freeze({
  schemaVersion: 'fr193-v1' as const,
  contractId: 'face_reading_bounded_coverage_gap_selection_fr193' as const,
  contractVersion: 'FR193-BOUNDED-COVERAGE-GAP-SELECTION-v1' as const,
  baselineMainSha: 'b92a0f1d98e7bddd4554432f1c79191a92b728c8' as const,
  upstreamCoverageAuthority: Object.freeze({
    moduleRef: 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts' as const,
    contractId: 'face_reading_master_region_coverage_skeleton_fr192' as const,
    contractVersion: 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1' as const,
    requiredCandidateState: 'coverage_target_unverified' as const,
    nextFrontier: 'select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice' as const,
  }),
  providerPin: Object.freeze({
    packageName: '@mediapipe/tasks-vision' as const,
    packageVersion: '0.10.35' as const,
    packageUpgradeAuthorized: false as const,
  }),
  providerEvidenceBoundary: Object.freeze({
    publishedFacialSurfaceMeshMayBeInvestigated: true as const,
    publishedFaceOvalTopologyMayBeInvestigated: true as const,
    facialSurfaceMeshEqualsCheekAuthority: false as const,
    faceOvalEqualsForeheadHairlineAuthority: false as const,
    providerTopologyEqualsEarAuthority: false as const,
    providerIndicesMayBeAssignedToCheek: false as const,
  }),
  layerSeparation: Object.freeze({
    traditionalMethodologyEqualsNeutralPhysicalGeometry: false as const,
    traditionalRegionEqualsInterpretation: false as const,
    providerSurfaceEqualsAnatomicalComponentAuthority: false as const,
  }),
  candidates: FR193_COVERAGE_GAP_CANDIDATES,
  selection: Object.freeze({
    mode: 'bounded_research_frontier' as const,
    selectedPhysicalCandidate: 'cheek_mid_face' as const,
    selectedCandidateCoverageStateRemains: 'coverage_target_unverified' as const,
    selectionPromotesCoverage: false as const,
    requiredNextEvidence: 'neutral_anatomical_target_model_and_pinned_provider_surface_feasibility' as const,
    providerIndicesMayBeAssigned: false as const,
    componentGeometryMayBeIssued: false as const,
    rationale: 'Cheek/mid-face is selected only for a bounded neutral-target and pinned-provider surface-feasibility audit. Published facial-surface topology makes that audit meaningful, but does not itself define cheek anatomy or authorize provider indices. Forehead remains blocked by its upper-boundary/hairline problem and ear remains blocked by provider/capture prerequisites.' as const,
  }),
  authorityBoundary: CLOSED_AUTHORITY_BOUNDARY,
  nextFrontier: 'establish_cheek_mid_face_neutral_target_model_and_pinned_provider_surface_feasibility_without_assigning_provider_indices' as const,
});

const EXPECTED_KEYS: readonly FaceReadingCoverageGapCandidateKeyFR193[] = Object.freeze([
  'forehead',
  'ear',
  'cheek_mid_face',
]);

function sameStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function assertCandidate(candidateValue: FaceReadingCoverageGapCandidateFR193): void {
  const expected = FR193_COVERAGE_GAP_CANDIDATES.find((entry) => entry.componentKey === candidateValue.componentKey);
  if (expected === undefined) throw new Error(`fr193_unknown_candidate:${candidateValue.componentKey}`);
  if (candidateValue.layer !== 'physical_observable') throw new Error(`fr193_candidate_layer_drift:${candidateValue.componentKey}`);
  if (candidateValue.fr192CoverageState !== 'coverage_target_unverified') throw new Error(`fr193_coverage_promotion:${candidateValue.componentKey}`);
  if (candidateValue.coveragePromoted !== false) throw new Error(`fr193_coverage_promotion:${candidateValue.componentKey}`);
  if (candidateValue.existingNeutralAuthorityRefs.length !== 0) throw new Error(`fr193_neutral_authority_ref_drift:${candidateValue.componentKey}`);
  if (!sameStrings(candidateValue.blockers, expected.blockers)) throw new Error(`fr193_blocker_drift:${candidateValue.componentKey}`);
  if (candidateValue.decision !== expected.decision) throw new Error(`fr193_candidate_decision_drift:${candidateValue.componentKey}`);
}

export function assertFaceReadingBoundedCoverageGapSelectionFR193(
  value: FaceReadingBoundedCoverageGapSelectionFR193,
): FaceReadingBoundedCoverageGapSelectionFR193 {
  if (
    value.schemaVersion !== 'fr193-v1' ||
    value.contractId !== 'face_reading_bounded_coverage_gap_selection_fr193' ||
    value.contractVersion !== 'FR193-BOUNDED-COVERAGE-GAP-SELECTION-v1' ||
    value.baselineMainSha !== 'b92a0f1d98e7bddd4554432f1c79191a92b728c8'
  ) throw new Error('fr193_identity_or_baseline_drift');

  if (
    value.upstreamCoverageAuthority.moduleRef !== 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts' ||
    value.upstreamCoverageAuthority.contractId !== 'face_reading_master_region_coverage_skeleton_fr192' ||
    value.upstreamCoverageAuthority.contractVersion !== 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1' ||
    value.upstreamCoverageAuthority.requiredCandidateState !== 'coverage_target_unverified' ||
    value.upstreamCoverageAuthority.nextFrontier !== 'select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice'
  ) throw new Error('fr193_upstream_fr192_drift');

  if (
    value.providerPin.packageName !== '@mediapipe/tasks-vision' ||
    value.providerPin.packageVersion !== '0.10.35' ||
    value.providerPin.packageUpgradeAuthorized !== false
  ) throw new Error('fr193_provider_pin_drift');

  if (
    value.providerEvidenceBoundary.publishedFacialSurfaceMeshMayBeInvestigated !== true ||
    value.providerEvidenceBoundary.publishedFaceOvalTopologyMayBeInvestigated !== true ||
    value.providerEvidenceBoundary.facialSurfaceMeshEqualsCheekAuthority !== false ||
    value.providerEvidenceBoundary.faceOvalEqualsForeheadHairlineAuthority !== false ||
    value.providerEvidenceBoundary.providerTopologyEqualsEarAuthority !== false ||
    value.providerEvidenceBoundary.providerIndicesMayBeAssignedToCheek !== false
  ) throw new Error('fr193_provider_authority_widening');

  if (Object.values(value.layerSeparation).some((flag) => flag !== false)) {
    throw new Error('fr193_layer_collapse');
  }

  if (value.candidates.length !== EXPECTED_KEYS.length || value.candidates.some((entry, index) => entry.componentKey !== EXPECTED_KEYS[index])) {
    throw new Error('fr193_candidate_order_or_membership_mismatch');
  }
  value.candidates.forEach(assertCandidate);

  if (
    value.selection.mode !== 'bounded_research_frontier' ||
    value.selection.selectedPhysicalCandidate !== 'cheek_mid_face' ||
    value.selection.selectedCandidateCoverageStateRemains !== 'coverage_target_unverified' ||
    value.selection.selectionPromotesCoverage !== false ||
    value.selection.requiredNextEvidence !== 'neutral_anatomical_target_model_and_pinned_provider_surface_feasibility' ||
    value.selection.providerIndicesMayBeAssigned !== false ||
    value.selection.componentGeometryMayBeIssued !== false ||
    value.selection.rationale !== FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193.selection.rationale
  ) throw new Error('fr193_selection_drift');

  if (Object.values(value.authorityBoundary).some((flag) => flag !== false)) {
    throw new Error('fr193_authority_widening');
  }

  if (value.nextFrontier !== 'establish_cheek_mid_face_neutral_target_model_and_pinned_provider_surface_feasibility_without_assigning_provider_indices') {
    throw new Error('fr193_next_frontier_drift');
  }
  return value;
}

const ISSUED = new WeakSet<object>();

export function issueFaceReadingBoundedCoverageGapSelectionFR193(): FaceReadingBoundedCoverageGapSelectionFR193 {
  const issued = Object.freeze({ ...FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193 });
  ISSUED.add(issued);
  return issued;
}

export function assertIssuedFaceReadingBoundedCoverageGapSelectionFR193(
  value: FaceReadingBoundedCoverageGapSelectionFR193,
): FaceReadingBoundedCoverageGapSelectionFR193 {
  assertFaceReadingBoundedCoverageGapSelectionFR193(value);
  if (!ISSUED.has(value)) throw new Error('fr193_unissued_bounded_coverage_gap_selection');
  return value;
}
