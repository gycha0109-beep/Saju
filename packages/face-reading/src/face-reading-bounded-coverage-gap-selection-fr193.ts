export type FaceReadingCoverageGapCandidateKeyFR193 =
  | 'forehead'
  | 'ear'
  | 'cheek_mid_face';

export type FaceReadingCoverageGapDecisionFR193 = 'blocked_pending_prerequisite';

export interface FaceReadingCoverageGapBoundaryFR193 {
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
}

export interface FaceReadingCoverageGapCandidateFR193 {
  readonly layer: 'physical_observable';
  readonly componentKey: FaceReadingCoverageGapCandidateKeyFR193;
  readonly fr192CoverageState: 'coverage_target_unverified';
  readonly existingNeutralAuthorityRefs: readonly string[];
  readonly disallowedTraditionalShortcutRefs: readonly string[];
  readonly blockers: readonly string[];
  readonly decision: FaceReadingCoverageGapDecisionFR193;
  readonly note: string;
  readonly boundary: FaceReadingCoverageGapBoundaryFR193;
}

export interface FaceReadingBoundedCoverageGapSelectionFR193 {
  readonly schemaVersion: 'fr193-v1';
  readonly contractId: 'face_reading_bounded_coverage_gap_selection_fr193';
  readonly contractVersion: 'FR193-BOUNDED-COVERAGE-GAP-SELECTION-v1';
  readonly baselineMainSha: '739baee761a776586a38c34ca587e19ce968c0a1';
  readonly upstreamCoverageAuthority: {
    readonly moduleRef: 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts';
    readonly contractId: 'face_reading_master_region_coverage_skeleton_fr192';
    readonly contractVersion: 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1';
    readonly requiredCandidateState: 'coverage_target_unverified';
    readonly nextFrontier: 'select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice';
  };
  readonly layerSeparation: {
    readonly traditionalMethodologyEqualsNeutralPhysicalGeometry: false;
    readonly traditionalRegionEqualsInterpretation: false;
    readonly missingProviderSupportMayBeInferredFromTraditionalMaps: false;
  };
  readonly candidates: readonly FaceReadingCoverageGapCandidateFR193[];
  readonly selection: {
    readonly mode: 'prerequisite';
    readonly selectedPhysicalCandidate: null;
    readonly prerequisiteKey: 'establish_provider_independent_whole_face_neutral_outline_support_before_selecting_unverified_component_slice';
    readonly unlockTargets: readonly ['forehead', 'cheek_mid_face'];
    readonly stillIndependentlyBlocked: readonly ['ear'];
    readonly rationale: 'No FR192-unverified candidate can be promoted from current repository authority. A provider-independent neutral whole-face outline is the smallest shared non-semantic prerequisite for re-evaluating forehead and cheek/mid-face, while ear remains independently blocked.';
  };
  readonly authorityBoundary: FaceReadingCoverageGapBoundaryFR193;
  readonly nextFrontier: 'establish_provider_independent_whole_face_neutral_outline_support_without_promoting_component_or_traditional_semantics';
}

const CLOSED_BOUNDARY: FaceReadingCoverageGapBoundaryFR193 = Object.freeze({
  selectionIssuesGeometryAuthority: false,
  selectionIssuesCaptureSufficiencyAuthority: false,
  selectionIssuesProviderLandmarkBindingAuthority: false,
  selectionIssuesTraditionalSemanticAuthority: false,
  selectionIssuesMetricAuthority: false,
  selectionIssuesThresholdAuthority: false,
  selectionIssuesCalibrationAuthority: false,
  selectionIssuesClassifierAuthority: false,
  participantOrExpertEvidenceCollectionAuthorized: false,
  selectionIssuesProductionActivation: false,
  selectionIssuesCommerceActivation: false,
});

function candidate(
  componentKey: FaceReadingCoverageGapCandidateKeyFR193,
  disallowedTraditionalShortcutRefs: readonly string[],
  blockers: readonly string[],
  note: string,
): FaceReadingCoverageGapCandidateFR193 {
  return Object.freeze({
    layer: 'physical_observable' as const,
    componentKey,
    fr192CoverageState: 'coverage_target_unverified' as const,
    existingNeutralAuthorityRefs: Object.freeze([] as string[]),
    disallowedTraditionalShortcutRefs: Object.freeze([...disallowedTraditionalShortcutRefs]),
    blockers: Object.freeze([...blockers]),
    decision: 'blocked_pending_prerequisite' as const,
    note,
    boundary: CLOSED_BOUNDARY,
  });
}

export const FR193_COVERAGE_GAP_CANDIDATES: readonly FaceReadingCoverageGapCandidateFR193[] = Object.freeze([
  candidate(
    'forehead',
    [
      'packages/face-reading/src/three-divisions.ts',
      'packages/face-reading/src/mayi-three-divisions-boundary-variants-fr33.ts',
      'packages/face-reading/src/twelve-palaces-authority-fr12.ts',
      'packages/face-reading/src/twelve-palaces-research-v0.ts',
    ],
    [
      'no_general_physical_forehead_observation_authority',
      'no_provider_independent_whole_face_outline_authority',
      'hairline_or_upper_face_boundary_not_governed',
    ],
    '三停 and 十二宮 contain traditional-methodology locators, but they cannot be reused as neutral physical forehead geometry.',
  ),
  candidate(
    'ear',
    ['packages/face-reading/src/five-officers-six-fus-research-v0.ts'],
    [
      'no_independent_physical_ear_observation_or_geometry_authority',
      'no_governed_ear_provider_landmark_binding',
      'fr191_profile_view_does_not_declare_universal_ear_capture_sufficiency',
    ],
    '五官 research can mention the ear, but current repository authority does not establish a neutral physical ear component or provider mapping.',
  ),
  candidate(
    'cheek_mid_face',
    ['packages/face-reading/src/five-officers-six-fus-research-v0.ts'],
    [
      'no_independent_physical_cheek_mid_face_geometry_authority',
      'no_provider_independent_whole_face_outline_authority',
      'six_fus_is_traditional_methodology_not_neutral_physical_geometry',
    ],
    '六府 research remains lineage-specific methodology authority and cannot establish neutral cheek or mid-face geometry.',
  ),
]);

export const FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193: FaceReadingBoundedCoverageGapSelectionFR193 = Object.freeze({
  schemaVersion: 'fr193-v1',
  contractId: 'face_reading_bounded_coverage_gap_selection_fr193',
  contractVersion: 'FR193-BOUNDED-COVERAGE-GAP-SELECTION-v1',
  baselineMainSha: '739baee761a776586a38c34ca587e19ce968c0a1',
  upstreamCoverageAuthority: Object.freeze({
    moduleRef: 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts',
    contractId: 'face_reading_master_region_coverage_skeleton_fr192',
    contractVersion: 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1',
    requiredCandidateState: 'coverage_target_unverified',
    nextFrontier: 'select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice',
  }),
  layerSeparation: Object.freeze({
    traditionalMethodologyEqualsNeutralPhysicalGeometry: false,
    traditionalRegionEqualsInterpretation: false,
    missingProviderSupportMayBeInferredFromTraditionalMaps: false,
  }),
  candidates: FR193_COVERAGE_GAP_CANDIDATES,
  selection: Object.freeze({
    mode: 'prerequisite' as const,
    selectedPhysicalCandidate: null,
    prerequisiteKey: 'establish_provider_independent_whole_face_neutral_outline_support_before_selecting_unverified_component_slice' as const,
    unlockTargets: Object.freeze(['forehead', 'cheek_mid_face'] as const),
    stillIndependentlyBlocked: Object.freeze(['ear'] as const),
    rationale: 'No FR192-unverified candidate can be promoted from current repository authority. A provider-independent neutral whole-face outline is the smallest shared non-semantic prerequisite for re-evaluating forehead and cheek/mid-face, while ear remains independently blocked.' as const,
  }),
  authorityBoundary: CLOSED_BOUNDARY,
  nextFrontier: 'establish_provider_independent_whole_face_neutral_outline_support_without_promoting_component_or_traditional_semantics',
});

const REQUIRED_CANDIDATE_KEYS = ['forehead', 'ear', 'cheek_mid_face'] as const;
const EXPECTED_PREREQUISITE = 'establish_provider_independent_whole_face_neutral_outline_support_before_selecting_unverified_component_slice' as const;

function sameStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function assertClosedBoundary(boundary: FaceReadingCoverageGapBoundaryFR193, label: string): void {
  for (const [key, value] of Object.entries(boundary)) {
    if (value !== false) throw new Error(`fr193_authority_widening:${label}:${key}`);
  }
}

function assertPinnedCandidate(entry: FaceReadingCoverageGapCandidateFR193): void {
  const expected = FR193_COVERAGE_GAP_CANDIDATES.find((candidateEntry) => candidateEntry.componentKey === entry.componentKey);
  if (expected === undefined) throw new Error(`fr193_unknown_candidate:${entry.componentKey}`);
  if (entry.layer !== 'physical_observable') throw new Error(`fr193_wrong_layer:${entry.componentKey}`);
  if (entry.fr192CoverageState !== 'coverage_target_unverified') throw new Error(`fr193_fr192_state_drift:${entry.componentKey}`);
  if (entry.decision !== 'blocked_pending_prerequisite') throw new Error(`fr193_candidate_promotion:${entry.componentKey}`);
  if (!sameStrings(entry.existingNeutralAuthorityRefs, expected.existingNeutralAuthorityRefs)) {
    throw new Error(`fr193_neutral_authority_ref_drift:${entry.componentKey}`);
  }
  if (!sameStrings(entry.disallowedTraditionalShortcutRefs, expected.disallowedTraditionalShortcutRefs)) {
    throw new Error(`fr193_traditional_shortcut_ref_drift:${entry.componentKey}`);
  }
  if (!sameStrings(entry.blockers, expected.blockers)) throw new Error(`fr193_blocker_drift:${entry.componentKey}`);
  if (entry.note !== expected.note) throw new Error(`fr193_note_drift:${entry.componentKey}`);
  assertClosedBoundary(entry.boundary, entry.componentKey);
}

export function assertFaceReadingBoundedCoverageGapSelectionFR193(
  contract: FaceReadingBoundedCoverageGapSelectionFR193,
): void {
  if (contract.schemaVersion !== 'fr193-v1') throw new Error('fr193_schema_version_mismatch');
  if (contract.contractId !== 'face_reading_bounded_coverage_gap_selection_fr193') throw new Error('fr193_contract_id_mismatch');
  if (contract.contractVersion !== 'FR193-BOUNDED-COVERAGE-GAP-SELECTION-v1') throw new Error('fr193_contract_version_mismatch');
  if (contract.baselineMainSha !== '739baee761a776586a38c34ca587e19ce968c0a1') throw new Error('fr193_baseline_main_sha_mismatch');

  const upstream = contract.upstreamCoverageAuthority;
  if (upstream.moduleRef !== 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts') throw new Error('fr193_upstream_module_ref_mismatch');
  if (upstream.contractId !== 'face_reading_master_region_coverage_skeleton_fr192') throw new Error('fr193_upstream_contract_id_mismatch');
  if (upstream.contractVersion !== 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1') throw new Error('fr193_upstream_contract_version_mismatch');
  if (upstream.requiredCandidateState !== 'coverage_target_unverified') throw new Error('fr193_upstream_candidate_state_mismatch');
  if (upstream.nextFrontier !== 'select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice') {
    throw new Error('fr193_upstream_frontier_mismatch');
  }

  for (const [key, value] of Object.entries(contract.layerSeparation)) {
    if (value !== false) throw new Error(`fr193_layer_collapse:${key}`);
  }

  if (!sameStrings(contract.candidates.map((entry) => entry.componentKey), REQUIRED_CANDIDATE_KEYS)) {
    throw new Error('fr193_candidate_order_or_membership_mismatch');
  }
  for (const entry of contract.candidates) assertPinnedCandidate(entry);

  if (contract.selection.mode !== 'prerequisite') throw new Error('fr193_selection_mode_mismatch');
  if (contract.selection.selectedPhysicalCandidate !== null) throw new Error('fr193_physical_candidate_selected_without_authority');
  if (contract.selection.prerequisiteKey !== EXPECTED_PREREQUISITE) throw new Error('fr193_prerequisite_drift');
  if (!sameStrings(contract.selection.unlockTargets, ['forehead', 'cheek_mid_face'])) throw new Error('fr193_unlock_target_drift');
  if (!sameStrings(contract.selection.stillIndependentlyBlocked, ['ear'])) throw new Error('fr193_still_blocked_drift');
  if (contract.selection.rationale !== FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193.selection.rationale) {
    throw new Error('fr193_selection_rationale_drift');
  }

  assertClosedBoundary(contract.authorityBoundary, 'contract');
  if (contract.nextFrontier !== 'establish_provider_independent_whole_face_neutral_outline_support_without_promoting_component_or_traditional_semantics') {
    throw new Error('fr193_next_frontier_mismatch');
  }
}

const ISSUED_CONTRACTS = new WeakSet<object>();

export function issueFaceReadingBoundedCoverageGapSelectionFR193(): FaceReadingBoundedCoverageGapSelectionFR193 {
  const contract = FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193;
  assertFaceReadingBoundedCoverageGapSelectionFR193(contract);
  ISSUED_CONTRACTS.add(contract);
  return contract;
}

export function assertIssuedFaceReadingBoundedCoverageGapSelectionFR193(
  contract: FaceReadingBoundedCoverageGapSelectionFR193,
): void {
  if (!ISSUED_CONTRACTS.has(contract)) throw new Error('fr193_unissued_bounded_coverage_gap_selection');
  assertFaceReadingBoundedCoverageGapSelectionFR193(contract);
}
