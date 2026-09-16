export type FaceReadingCoverageStateFR192 =
  | 'existing_governed'
  | 'existing_research_only'
  | 'coverage_target_unverified'
  | 'deferred';

export interface FaceReadingCoverageBoundaryFR192 {
  readonly skeletonIssuesGeometryAuthority: false;
  readonly skeletonIssuesCaptureSufficiencyAuthority: false;
  readonly skeletonIssuesMetricAuthority: false;
  readonly skeletonIssuesTraditionalSemanticAuthority: false;
  readonly skeletonIssuesThresholdAuthority: false;
  readonly skeletonIssuesCalibrationAuthority: false;
  readonly skeletonIssuesClassifierAuthority: false;
  readonly skeletonIssuesProductionActivation: false;
}

export interface PhysicalObservableCoverageEntryFR192 {
  readonly layer: 'physical_observable';
  readonly componentKey:
    | 'face'
    | 'forehead'
    | 'eyebrow'
    | 'eye_pair'
    | 'nose'
    | 'mouth'
    | 'ear'
    | 'cheek_mid_face'
    | 'chin_lower_face';
  readonly label: string;
  readonly coverageState: FaceReadingCoverageStateFR192;
  readonly authorityRefs: readonly string[];
  readonly note: string;
  readonly boundary: FaceReadingCoverageBoundaryFR192;
}

export interface TraditionalMethodologyCoverageEntryFR192 {
  readonly layer: 'traditional_methodology';
  readonly systemKey:
    | 'three_divisions'
    | 'five_officers'
    | 'six_fus'
    | 'twelve_palaces'
    | 'thirteen_positions_family'
    | 'hundred_year_age_map';
  readonly traditionalLabel: string;
  readonly coverageState: FaceReadingCoverageStateFR192;
  readonly authorityRefs: readonly string[];
  readonly methodologyRefs: readonly string[];
  readonly lineageKeys: readonly string[];
  readonly note: string;
  readonly boundary: FaceReadingCoverageBoundaryFR192;
}

export interface FaceReadingMasterRegionCoverageSkeletonFR192 {
  readonly schemaVersion: 'fr192-v1';
  readonly contractId: 'face_reading_master_region_coverage_skeleton_fr192';
  readonly contractVersion: 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1';
  readonly baselineMainSha: '191047aab14e79ecfcb1fe55299ef06b2e1eade1';
  readonly upstreamCaptureAuthority: {
    readonly moduleRef: 'packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts';
    readonly contractId: 'face_reading_product_capture_view_contract_fr191';
    readonly contractVersion: 'FR191-FRONTAL-PROFILE-PRODUCT-CAPTURE-VIEW-CONTRACT-v1';
    readonly requiredViewRoles: readonly ['frontal', 'profile'];
    readonly profileSideSemantics: 'side_agnostic_profile';
    readonly declaresUniversalOrganCaptureSufficiency: false;
  };
  readonly layerSeparation: {
    readonly physicalObservableEqualsTraditionalRegion: false;
    readonly traditionalRegionEqualsInterpretation: false;
    readonly sourceLineagesMayBeAutoMerged: false;
  };
  readonly physicalObservableCoverage: readonly PhysicalObservableCoverageEntryFR192[];
  readonly traditionalMethodologyCoverage: readonly TraditionalMethodologyCoverageEntryFR192[];
  readonly authorityBoundary: FaceReadingCoverageBoundaryFR192 & {
    readonly participantOrExpertEvidenceCollectionAuthorized: false;
    readonly automaticTraditionalRegionToProviderLandmarkBindingAuthorized: false;
    readonly additionalMandatoryCaptureViewsAuthorized: false;
  };
  readonly nextFrontier: 'select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice';
}

const CLOSED_BOUNDARY: FaceReadingCoverageBoundaryFR192 = Object.freeze({
  skeletonIssuesGeometryAuthority: false,
  skeletonIssuesCaptureSufficiencyAuthority: false,
  skeletonIssuesMetricAuthority: false,
  skeletonIssuesTraditionalSemanticAuthority: false,
  skeletonIssuesThresholdAuthority: false,
  skeletonIssuesCalibrationAuthority: false,
  skeletonIssuesClassifierAuthority: false,
  skeletonIssuesProductionActivation: false,
});

function physical(
  componentKey: PhysicalObservableCoverageEntryFR192['componentKey'],
  label: string,
  coverageState: FaceReadingCoverageStateFR192,
  authorityRefs: readonly string[],
  note: string,
): PhysicalObservableCoverageEntryFR192 {
  return Object.freeze({
    layer: 'physical_observable' as const,
    componentKey,
    label,
    coverageState,
    authorityRefs: Object.freeze([...authorityRefs]),
    note,
    boundary: CLOSED_BOUNDARY,
  });
}

function traditional(
  systemKey: TraditionalMethodologyCoverageEntryFR192['systemKey'],
  traditionalLabel: string,
  coverageState: FaceReadingCoverageStateFR192,
  authorityRefs: readonly string[],
  methodologyRefs: readonly string[],
  lineageKeys: readonly string[],
  note: string,
): TraditionalMethodologyCoverageEntryFR192 {
  return Object.freeze({
    layer: 'traditional_methodology' as const,
    systemKey,
    traditionalLabel,
    coverageState,
    authorityRefs: Object.freeze([...authorityRefs]),
    methodologyRefs: Object.freeze([...methodologyRefs]),
    lineageKeys: Object.freeze([...lineageKeys]),
    note,
    boundary: CLOSED_BOUNDARY,
  });
}

export const FR192_PHYSICAL_OBSERVABLE_COVERAGE: readonly PhysicalObservableCoverageEntryFR192[] = Object.freeze([
  physical(
    'face',
    'Whole face observation envelope',
    'existing_governed',
    [
      'packages/face-reading/src/neutral-observation-schema-fr15.ts',
      'packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts',
    ],
    'Whole-face observation and capture envelopes exist; this does not make every subregion observable or sufficient.',
  ),
  physical(
    'forehead',
    'Forehead',
    'coverage_target_unverified',
    [],
    'Traditional anchors touch the forehead/hairline, but no general physical forehead observation authority is promoted by this skeleton.',
  ),
  physical(
    'eyebrow',
    'Eyebrow / brow',
    'existing_governed',
    [
      'packages/face-reading/src/neutral-observation-schema-fr15.ts',
      'packages/face-reading/src/eyebrow-neutral-anatomical-evidence-admission-fr41.ts',
      'packages/face-reading/src/mediapipe-published-eyebrow-component-decomposition-fr39.ts',
    ],
    'Neutral bilateral brow regions and brow-related anatomical research authority exist independently of traditional brow semantics.',
  ),
  physical(
    'eye_pair',
    'Eye / eye-pair',
    'existing_governed',
    [
      'packages/face-reading/src/neutral-observation-schema-fr15.ts',
      'packages/face-reading/src/face-eye-pair-research-bridge-fr24.ts',
      'packages/face-reading/src/mediapipe-eye-landmark-adapter-fr25.ts',
    ],
    'Neutral bilateral eye regions and a dedicated Eye-Pair research bridge exist; Xi/Chang semantics are not widened here.',
  ),
  physical(
    'nose',
    'Nose / nose bridge / nose tip',
    'existing_governed',
    [
      'packages/face-reading/src/neutral-observation-schema-fr15.ts',
      'packages/face-reading/src/nose-geometry.ts',
    ],
    'Neutral nose region and bounded neutral geometry metrics exist; their own code explicitly blocks automatic traditional classification.',
  ),
  physical(
    'mouth',
    'Mouth / lips',
    'coverage_target_unverified',
    [],
    'Traditional 五官 research mentions the mouth, but a general physical mouth observation authority is not established by current neutral coverage.',
  ),
  physical(
    'ear',
    'Ear',
    'coverage_target_unverified',
    [],
    'Traditional 五官 research mentions the ear, but a general physical ear observation authority is not established by current neutral coverage.',
  ),
  physical(
    'cheek_mid_face',
    'Cheek / mid-face',
    'coverage_target_unverified',
    [],
    'Traditional 六府 research mentions cheekbone regions, but no generic physical cheek/mid-face observation authority is promoted here.',
  ),
  physical(
    'chin_lower_face',
    'Chin / lower face',
    'existing_governed',
    [
      'packages/face-reading/src/chin-inferior-neutral-validation-fr46.ts',
      'packages/face-reading/src/provider-independent-chin-contour-geometry-fr50.ts',
      'packages/face-reading/src/central-chin-reference-trace-protocol-fr54.ts',
    ],
    'Chin/lower-face neutral geometry and central-chin research lineage exist without granting a whole lower-face traditional interpretation.',
  ),
]);

export const FR192_TRADITIONAL_METHODOLOGY_COVERAGE: readonly TraditionalMethodologyCoverageEntryFR192[] = Object.freeze([
  traditional(
    'three_divisions',
    '三停',
    'existing_research_only',
    [
      'packages/face-reading/src/three-divisions.ts',
      'packages/face-reading/src/mayi-three-divisions-boundary-variants-fr33.ts',
      'packages/face-reading/src/mayi-three-divisions-neutral-anchor-requirements-fr34.ts',
    ],
    ['method.mayi.face_three_divisions@0.1.0'],
    ['mayi'],
    'Scan-checked Mayi boundary variants exist but variant selection, neutral-anchor completion, calibration, and Production region-map authority remain unresolved.',
  ),
  traditional(
    'five_officers',
    '五官',
    'existing_research_only',
    ['packages/face-reading/src/five-officers-six-fus-research-v0.ts'],
    [
      'method.shenxiang.five_officers@0.1.0',
      'method.liuzhuang.five_officers@0.1.0',
    ],
    ['shenxiang', 'liuzhuang'],
    'Five-Officer mappings are source-lineage-preserved research; static support does not authorize 官成 or merged lineage semantics.',
  ),
  traditional(
    'six_fus',
    '六府',
    'existing_research_only',
    ['packages/face-reading/src/five-officers-six-fus-research-v0.ts'],
    [
      'method.shenxiang.six_fus@0.1.0',
      'method.liuzhuang.six_fus@0.1.0',
    ],
    ['shenxiang', 'liuzhuang'],
    'Source lineages expose different upper/lower mappings; current conflict authority explicitly forbids collapsing them into one canonical map.',
  ),
  traditional(
    'twelve_palaces',
    '十二宮',
    'existing_research_only',
    [
      'packages/face-reading/src/twelve-palaces-authority-fr12.ts',
      'packages/face-reading/src/twelve-palaces-research-v0.ts',
    ],
    [
      'method.shenxiang.twelve_palaces@0.1.0',
      'method.liuzhuang.twelve_palaces@0.1.0',
    ],
    ['shenxiang', 'liuzhuang'],
    'Locator maps exist as research-only lineage-specific definitions; this skeleton does not promote exact geometry or interpretation.',
  ),
  traditional(
    'thirteen_positions_family',
    '十三部位 계열',
    'coverage_target_unverified',
    [],
    [],
    [],
    'Coverage target retained because whole-face inventories commonly need position-system coverage, but no repository authority was found in the FR192 fresh audit.',
  ),
  traditional(
    'hundred_year_age_map',
    '百歲流年 계열',
    'deferred',
    [],
    [],
    [],
    'Explicitly deferred by current Face Reading architecture and FR192 non-scope; no age-point map is authorized here.',
  ),
]);

export const FACE_READING_MASTER_REGION_COVERAGE_SKELETON_FR192: FaceReadingMasterRegionCoverageSkeletonFR192 = Object.freeze({
  schemaVersion: 'fr192-v1',
  contractId: 'face_reading_master_region_coverage_skeleton_fr192',
  contractVersion: 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1',
  baselineMainSha: '191047aab14e79ecfcb1fe55299ef06b2e1eade1',
  upstreamCaptureAuthority: Object.freeze({
    moduleRef: 'packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts',
    contractId: 'face_reading_product_capture_view_contract_fr191',
    contractVersion: 'FR191-FRONTAL-PROFILE-PRODUCT-CAPTURE-VIEW-CONTRACT-v1',
    requiredViewRoles: Object.freeze(['frontal', 'profile'] as const),
    profileSideSemantics: 'side_agnostic_profile',
    declaresUniversalOrganCaptureSufficiency: false,
  }),
  layerSeparation: Object.freeze({
    physicalObservableEqualsTraditionalRegion: false,
    traditionalRegionEqualsInterpretation: false,
    sourceLineagesMayBeAutoMerged: false,
  }),
  physicalObservableCoverage: FR192_PHYSICAL_OBSERVABLE_COVERAGE,
  traditionalMethodologyCoverage: FR192_TRADITIONAL_METHODOLOGY_COVERAGE,
  authorityBoundary: Object.freeze({
    ...CLOSED_BOUNDARY,
    participantOrExpertEvidenceCollectionAuthorized: false,
    automaticTraditionalRegionToProviderLandmarkBindingAuthorized: false,
    additionalMandatoryCaptureViewsAuthorized: false,
  }),
  nextFrontier: 'select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice',
});

const REQUIRED_PHYSICAL_KEYS = [
  'face', 'forehead', 'eyebrow', 'eye_pair', 'nose', 'mouth', 'ear', 'cheek_mid_face', 'chin_lower_face',
] as const;
const REQUIRED_TRADITIONAL_KEYS = [
  'three_divisions', 'five_officers', 'six_fus', 'twelve_palaces', 'thirteen_positions_family', 'hundred_year_age_map',
] as const;

function assertUnique(values: readonly string[], label: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr192_duplicate_${label}`);
}

function assertClosedBoundary(boundary: FaceReadingCoverageBoundaryFR192, label: string): void {
  for (const [key, value] of Object.entries(boundary)) {
    if (value !== false) throw new Error(`fr192_authority_widening:${label}:${key}`);
  }
}

function assertCoverageRefs(
  state: FaceReadingCoverageStateFR192,
  authorityRefs: readonly string[],
  label: string,
): void {
  if (state === 'existing_governed' || state === 'existing_research_only') {
    if (authorityRefs.length === 0) throw new Error(`fr192_missing_authority_refs:${label}`);
    if (authorityRefs.some((ref) => ref.trim().length === 0)) throw new Error(`fr192_empty_authority_ref:${label}`);
    return;
  }
  if (authorityRefs.length !== 0) throw new Error(`fr192_unverified_or_deferred_cannot_claim_authority:${label}`);
}

export function assertFaceReadingMasterRegionCoverageSkeletonFR192(
  value: FaceReadingMasterRegionCoverageSkeletonFR192,
): void {
  if (value.schemaVersion !== 'fr192-v1') throw new Error('fr192_schema_version_mismatch');
  if (value.contractId !== 'face_reading_master_region_coverage_skeleton_fr192') throw new Error('fr192_contract_id_mismatch');
  if (value.contractVersion !== 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1') throw new Error('fr192_contract_version_mismatch');
  if (value.baselineMainSha !== '191047aab14e79ecfcb1fe55299ef06b2e1eade1') throw new Error('fr192_baseline_main_mismatch');

  const capture = value.upstreamCaptureAuthority;
  if (capture.moduleRef !== 'packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts') throw new Error('fr192_fr191_module_ref_mismatch');
  if (capture.contractId !== 'face_reading_product_capture_view_contract_fr191') throw new Error('fr192_fr191_contract_id_mismatch');
  if (capture.contractVersion !== 'FR191-FRONTAL-PROFILE-PRODUCT-CAPTURE-VIEW-CONTRACT-v1') throw new Error('fr192_fr191_contract_version_mismatch');
  if (capture.requiredViewRoles.length !== 2 || capture.requiredViewRoles[0] !== 'frontal' || capture.requiredViewRoles[1] !== 'profile') throw new Error('fr192_capture_roles_widened');
  if (capture.profileSideSemantics !== 'side_agnostic_profile') throw new Error('fr192_profile_side_semantics_widened');
  if (capture.declaresUniversalOrganCaptureSufficiency !== false) throw new Error('fr192_universal_capture_sufficiency_forbidden');

  if (value.layerSeparation.physicalObservableEqualsTraditionalRegion !== false) throw new Error('fr192_physical_traditional_layer_collapse');
  if (value.layerSeparation.traditionalRegionEqualsInterpretation !== false) throw new Error('fr192_region_interpretation_layer_collapse');
  if (value.layerSeparation.sourceLineagesMayBeAutoMerged !== false) throw new Error('fr192_source_lineage_merge_forbidden');

  const physicalKeys = value.physicalObservableCoverage.map((entry) => entry.componentKey);
  assertUnique(physicalKeys, 'physical_key');
  if (physicalKeys.length !== REQUIRED_PHYSICAL_KEYS.length || REQUIRED_PHYSICAL_KEYS.some((key) => !physicalKeys.includes(key))) {
    throw new Error('fr192_physical_master_coverage_incomplete');
  }
  for (const entry of value.physicalObservableCoverage) {
    if (entry.layer !== 'physical_observable') throw new Error(`fr192_wrong_physical_layer:${entry.componentKey}`);
    assertCoverageRefs(entry.coverageState, entry.authorityRefs, entry.componentKey);
    assertUnique(entry.authorityRefs, `physical_authority_ref:${entry.componentKey}`);
    assertClosedBoundary(entry.boundary, entry.componentKey);
  }

  const traditionalKeys = value.traditionalMethodologyCoverage.map((entry) => entry.systemKey);
  assertUnique(traditionalKeys, 'traditional_key');
  if (traditionalKeys.length !== REQUIRED_TRADITIONAL_KEYS.length || REQUIRED_TRADITIONAL_KEYS.some((key) => !traditionalKeys.includes(key))) {
    throw new Error('fr192_traditional_master_coverage_incomplete');
  }
  for (const entry of value.traditionalMethodologyCoverage) {
    if (entry.layer !== 'traditional_methodology') throw new Error(`fr192_wrong_traditional_layer:${entry.systemKey}`);
    assertCoverageRefs(entry.coverageState, entry.authorityRefs, entry.systemKey);
    assertUnique(entry.authorityRefs, `traditional_authority_ref:${entry.systemKey}`);
    assertUnique(entry.methodologyRefs, `traditional_methodology_ref:${entry.systemKey}`);
    assertUnique(entry.lineageKeys, `traditional_lineage_key:${entry.systemKey}`);
    if (entry.coverageState === 'existing_research_only' && (entry.methodologyRefs.length === 0 || entry.lineageKeys.length === 0)) {
      throw new Error(`fr192_research_system_requires_methodology_and_lineage:${entry.systemKey}`);
    }
    if ((entry.coverageState === 'coverage_target_unverified' || entry.coverageState === 'deferred') &&
        (entry.methodologyRefs.length !== 0 || entry.lineageKeys.length !== 0)) {
      throw new Error(`fr192_unverified_or_deferred_traditional_authority_forbidden:${entry.systemKey}`);
    }
    assertClosedBoundary(entry.boundary, entry.systemKey);
  }

  assertClosedBoundary(value.authorityBoundary, 'master');
  if (value.authorityBoundary.participantOrExpertEvidenceCollectionAuthorized !== false) throw new Error('fr192_participant_collection_forbidden');
  if (value.authorityBoundary.automaticTraditionalRegionToProviderLandmarkBindingAuthorized !== false) throw new Error('fr192_automatic_binding_forbidden');
  if (value.authorityBoundary.additionalMandatoryCaptureViewsAuthorized !== false) throw new Error('fr192_additional_capture_views_forbidden');
}

const ISSUED = new WeakSet<object>();

export function issueFaceReadingMasterRegionCoverageSkeletonFR192(): FaceReadingMasterRegionCoverageSkeletonFR192 {
  assertFaceReadingMasterRegionCoverageSkeletonFR192(FACE_READING_MASTER_REGION_COVERAGE_SKELETON_FR192);
  ISSUED.add(FACE_READING_MASTER_REGION_COVERAGE_SKELETON_FR192);
  return FACE_READING_MASTER_REGION_COVERAGE_SKELETON_FR192;
}

export function assertIssuedFaceReadingMasterRegionCoverageSkeletonFR192(
  value: FaceReadingMasterRegionCoverageSkeletonFR192,
): void {
  assertFaceReadingMasterRegionCoverageSkeletonFR192(value);
  if (!ISSUED.has(value as object)) throw new Error('fr192_unissued_master_region_coverage_skeleton');
}
