import {
  FACE_READING_MASTER_REGION_COVERAGE_SKELETON_FR192,
} from './face-reading-master-region-coverage-skeleton-fr192.js';
import {
  FACE_READING_WHOLE_FACE_MINIMUM_MEASUREMENT_INVENTORY_FR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';
import {
  assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
} from './five-officers-intake-mouth-semantic-execution-admission-fr122.js';
import {
  FR190_NEXT_FRONTIER,
  FR190_STUDY_ARMS,
  FR190_VERDICT,
} from './eye-pair-xi-chang-mapping-evidence-study-registration-fr190.js';
import {
  THREE_DIVISIONS_NEUTRAL_SURFACE_EXTENSION_AUTHORITY_FR35,
} from './three-divisions-neutral-surface-extension-fr35.js';
import {
  THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36,
} from './three-divisions-vertical-reference-derivations-fr36.js';
import {
  FACE_RESEARCH_PACK_FR12,
} from './twelve-palaces-authority-fr12.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR258_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr258-face-research-master-frontier.md' as const;

export type FaceResearchFrontierAxisFR258 =
  | 'source_authority'
  | 'concept_authority'
  | 'neutral_observable'
  | 'metric'
  | 'empirical_evidence'
  | 'metric_concept_mapping'
  | 'semantic_claim';

export type FaceResearchFrontierAxisStateFR258 =
  | 'established_research_authority'
  | 'partial_research_authority'
  | 'blocked_pending_evidence'
  | 'missing_governed_authority'
  | 'deferred';

export type FaceResearchFrontierSliceKeyFR258 =
  | 'five_officers_intake_fang_da'
  | 'five_officers_inspection_xi_chang'
  | 'five_officers_remaining_organs'
  | 'three_divisions_mayi'
  | 'six_fus_lineage_maps'
  | 'twelve_palaces'
  | 'thirteen_positions_family'
  | 'hundred_year_age_map';

export type FaceResearchFrontierLaneFR258 =
  | 'active_empirical_lane_do_not_duplicate'
  | 'active_precollection_lane_do_not_duplicate'
  | 'selected_non_overlapping_next_frontier'
  | 'queued_research_frontier'
  | 'deferred';

export interface FaceResearchFrontierAxisAssessmentFR258 {
  readonly state: FaceResearchFrontierAxisStateFR258;
  readonly authorityRefs: readonly string[];
  readonly note: string;
}

export interface FaceResearchFrontierSliceFR258 {
  readonly sliceKey: FaceResearchFrontierSliceKeyFR258;
  readonly label: string;
  readonly systemKey:
    | 'five_officers'
    | 'three_divisions'
    | 'six_fus'
    | 'twelve_palaces'
    | 'thirteen_positions_family'
    | 'hundred_year_age_map';
  readonly lane: FaceResearchFrontierLaneFR258;
  readonly axes: Readonly<Record<FaceResearchFrontierAxisFR258, FaceResearchFrontierAxisAssessmentFR258>>;
  readonly blockers: readonly string[];
  readonly nextResearchAction: string;
  readonly handoffReady: false;
}

export interface FaceResearchMasterFrontierFR258 {
  readonly schemaVersion: 'fr258-face-research-master-frontier-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractId: 'face_research_master_frontier_fr258';
  readonly baselineMainSha: '883d7e0e3ab35e8b037d2d4c5cbae28ec4e3fad1';
  readonly watchtowerTrack: 'face-research';
  readonly auditAxes: readonly [
    'source_authority',
    'concept_authority',
    'neutral_observable',
    'metric',
    'empirical_evidence',
    'metric_concept_mapping',
    'semantic_claim',
  ];
  readonly slices: readonly FaceResearchFrontierSliceFR258[];
  readonly parallelActiveSlices: readonly [
    'five_officers_intake_fang_da',
    'five_officers_inspection_xi_chang',
  ];
  readonly recommendedNextFrontier: {
    readonly sliceKey: 'three_divisions_mayi';
    readonly selectionMode: 'highest_leverage_non_overlapping_research_frontier';
    readonly rationale: string;
    readonly requiredNextResearch: readonly string[];
  };
  readonly authorityBoundary: {
    readonly sourceVerificationPromoted: false;
    readonly traditionalConceptPromoted: false;
    readonly providerBindingPromoted: false;
    readonly metricBindingPromoted: false;
    readonly empiricalSufficiencyPromoted: false;
    readonly thresholdOrCalibrationPromoted: false;
    readonly criterionStateIssued: false;
    readonly structuredClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR258_RESEARCH_NOTE_REF;
  readonly nextFrontier:
    'resolve_three_divisions_neutral_vertical_reference_operationalization_without_duplicating_active_fang_da_or_xi_chang_evidence_lanes';
}

const AXES = Object.freeze([
  'source_authority',
  'concept_authority',
  'neutral_observable',
  'metric',
  'empirical_evidence',
  'metric_concept_mapping',
  'semantic_claim',
] as const);

function axis(
  state: FaceResearchFrontierAxisStateFR258,
  authorityRefs: readonly string[],
  note: string,
): FaceResearchFrontierAxisAssessmentFR258 {
  return Object.freeze({
    state,
    authorityRefs: Object.freeze([...authorityRefs]),
    note,
  });
}

function slice(input: Omit<FaceResearchFrontierSliceFR258, 'handoffReady'>): FaceResearchFrontierSliceFR258 {
  return Object.freeze({
    ...input,
    blockers: Object.freeze([...input.blockers]),
    axes: Object.freeze(input.axes),
    handoffReady: false as const,
  });
}

export const FR258_FACE_RESEARCH_FRONTIER_SLICES:
readonly FaceResearchFrontierSliceFR258[] = Object.freeze([
  slice({
    sliceKey: 'five_officers_intake_fang_da',
    label: '五官 / 出納官 / 方大',
    systemKey: 'five_officers',
    lane: 'active_empirical_lane_do_not_duplicate',
    axes: {
      source_authority: axis(
        'established_research_authority',
        [
          'packages/face-reading/src/five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.ts',
          'packages/face-reading/src/five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.ts',
        ],
        'The intake passage is witness-qualified and scan-checked, while FR141 preserves the unresolved Fang lineage/taxonomy conflict rather than flattening it.',
      ),
      concept_authority: axis(
        'partial_research_authority',
        ['packages/face-reading/src/five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.ts'],
        'Fang and Da are analytically separated and candidate construct families are defined, but no direct traditional metric proxy is authorized.',
      ),
      neutral_observable: axis(
        'established_research_authority',
        [
          'packages/face-reading/src/pose-normalized-lips-geometry-fr79.ts',
          'packages/face-reading/src/five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.ts',
        ],
        'Pose-normalized lips contours and three role-invariant Fang candidate measurements exist without traditional semantics.',
      ),
      metric: axis(
        'established_research_authority',
        ['packages/face-reading/src/five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.ts'],
        'Three exact neutral candidate metric definitions and deterministic runtime values exist.',
      ),
      empirical_evidence: axis(
        'blocked_pending_evidence',
        [
          'packages/face-reading/src/five-officers-square-broad-fang-independent-multi-session-evidence-acquisition-protocol-fr152.ts',
          'packages/face-reading/src/observable-morphology-empirical-study-readiness-fr224.ts',
        ],
        'Repeat-capture and capture-quality evidence remain insufficient for empirical repeatability or construct validity promotion.',
      ),
      metric_concept_mapping: axis(
        'blocked_pending_evidence',
        [
          'packages/face-reading/src/five-officers-square-broad-fang-semantic-annotation-protocol-fr138.ts',
          'packages/face-reading/src/five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.ts',
        ],
        'Candidate hypotheses exist, but no metric is admitted as traditional Fang and no directionality or threshold is authorized.',
      ),
      semantic_claim: axis(
        'blocked_pending_evidence',
        ['packages/face-reading/src/five-officers-intake-mouth-semantic-execution-admission-fr122.ts'],
        'FR122 intentionally issues zero machine criterion states, structured claims, or bounded narratives for the mouth semantic vertical slice.',
      ),
    },
    blockers: [
      'empirical_repeatability_not_established',
      'capture_quality_evidence_not_sufficient',
      'metric_to_fang_mapping_not_admitted',
      'directionality_and_threshold_not_authorized',
    ],
    nextResearchAction:
      'Consume the active repeat-capture/capture-quality evidence lane when it produces governed evidence, then continue mapping and semantic admission; do not create a duplicate capture campaign here.',
  }),
  slice({
    sliceKey: 'five_officers_inspection_xi_chang',
    label: '五官 / 監察官 / 細長',
    systemKey: 'five_officers',
    lane: 'active_precollection_lane_do_not_duplicate',
    axes: {
      source_authority: axis(
        'established_research_authority',
        [
          'packages/face-reading/src/eye-pair-traditional-source-lineage-direct-passage-binding-fr175.ts',
          'packages/face-reading/src/eye-pair-fr175-exact-scan-page-pinning-fr181.ts',
          'packages/face-reading/src/eye-pair-fr176-daruma-eye-exact-scan-page-pinning-fr182.ts',
        ],
        'Direct source passages and exact scan pages are pinned for the Xi/Chang research lineage.',
      ),
      concept_authority: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/eye-pair-xi-chang-operationalization-requirements-rereview-fr183.ts',
          'packages/face-reading/src/eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.ts',
        ],
        'Concept hypotheses are explicit, but stable criterion identity and correspondence evidence are not admitted.',
      ),
      neutral_observable: axis(
        'established_research_authority',
        [
          'packages/face-reading/src/role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.ts',
          'packages/face-reading/src/eye-pair-geometric-y-span-runtime-fr178.ts',
        ],
        'Role-invariant eye-pair shape measurements exist independently of traditional Xi/Chang semantics.',
      ),
      metric: axis(
        'established_research_authority',
        [
          'packages/face-reading/src/role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.ts',
          'packages/face-reading/src/eye-pair-geometric-y-span-runtime-fr178.ts',
        ],
        'Candidate eye geometry metrics exist with no automatic traditional classification.',
      ),
      empirical_evidence: axis(
        'blocked_pending_evidence',
        [
          'packages/face-reading/src/eye-pair-xi-chang-repeat-capture-dataset-split-protocol-fr188.ts',
          'packages/face-reading/src/eye-pair-xi-chang-mapping-evidence-study-registration-fr190.ts',
        ],
        'The study is registered but collection and empirical evidence are not admitted.',
      ),
      metric_concept_mapping: axis(
        'blocked_pending_evidence',
        [
          'packages/face-reading/src/eye-pair-xi-chang-metric-to-concept-mapping-evidence-requirements-fr185.ts',
          'packages/face-reading/src/eye-pair-xi-chang-mapping-evidence-study-registration-fr190.ts',
        ],
        'Mapping evidence requirements are governed, but relation, directionality, reference population and thresholds remain unset.',
      ),
      semantic_claim: axis(
        'blocked_pending_evidence',
        ['packages/face-reading/src/research-diagnosis-runtime.ts'],
        'The generic research diagnosis runtime can render asserted criterion states, but no machine Xi/Chang criterion state is admitted.',
      ),
    },
    blockers: [
      'construct_correspondence_protocol_not_defined',
      'alternative_metric_and_confound_rejection_plan_not_defined',
      'evidence_collection_not_authorized',
      'stable_criterion_identity_not_issued',
    ],
    nextResearchAction:
      'Continue the already registered Xi/Chang pre-collection mapping lane; FR258 must not fork another eye capture or mapping study.',
  }),
  slice({
    sliceKey: 'five_officers_remaining_organs',
    label: '五官 / 採聽官·保壽官·審辨官 remaining coverage',
    systemKey: 'five_officers',
    lane: 'queued_research_frontier',
    axes: {
      source_authority: axis(
        'partial_research_authority',
        ['packages/face-reading/src/five-officers-six-fus-research-v0.ts'],
        'Lineage-preserved Five-Officer research exists, but witness qualification is not uniformly advanced to the intake level across the remaining organs.',
      ),
      concept_authority: axis(
        'partial_research_authority',
        ['packages/face-reading/src/five-officers-six-fus-research-v0.ts'],
        'Traditional criterion sets exist as research definitions but cannot be treated as executable machine semantics.',
      ),
      neutral_observable: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/mediapipe-published-eyebrow-component-decomposition-fr39.ts',
          'packages/face-reading/src/nose-geometry.ts',
          'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
        ],
        'Brow and nose have reusable neutral geometry; ear remains unavailable in the current whole-face measurement inventory.',
      ),
      metric: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/nose-geometry.ts',
          'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
        ],
        'Some neutral metrics exist, but there is no complete governed metric surface across the remaining Five-Officer organs.',
      ),
      empirical_evidence: axis(
        'missing_governed_authority',
        [],
        'No unified empirical evidence package establishes repeatability and construct validity for the remaining Five-Officer criteria.',
      ),
      metric_concept_mapping: axis(
        'missing_governed_authority',
        [],
        'No complete machine mapping from reusable brow/nose/ear observables to the remaining traditional criteria is admitted.',
      ),
      semantic_claim: axis(
        'partial_research_authority',
        ['packages/face-reading/src/research-diagnosis-runtime.ts'],
        'Research assertions can be rendered, but machine criterion issuance remains missing.',
      ),
    },
    blockers: [
      'remaining_officer_witness_qualification_not_uniform',
      'ear_neutral_observable_unavailable',
      'criterion_specific_metric_mapping_missing',
      'empirical_construct_validity_missing',
    ],
    nextResearchAction:
      'Split this broad queue into organ-specific source/observable slices after the current higher-leverage Three Divisions frontier is resolved.',
  }),
  slice({
    sliceKey: 'three_divisions_mayi',
    label: '三停 / 麻衣 lineage',
    systemKey: 'three_divisions',
    lane: 'selected_non_overlapping_next_frontier',
    axes: {
      source_authority: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/mayi-three-divisions-boundary-variants-fr33.ts',
          'packages/face-reading/src/mayi-three-divisions-neutral-anchor-requirements-fr34.ts',
        ],
        'Scan-checked boundary variants and explicit neutral requirements exist, but source-variant selection remains unresolved.',
      ),
      concept_authority: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/mayi-three-divisions-boundary-variants-fr33.ts',
          'packages/face-reading/src/mayi-three-divisions-neutral-anchor-requirements-fr34.ts',
        ],
        'The research concept and required anchors are defined without promoting a single canonical production variant.',
      ),
      neutral_observable: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/three-divisions-neutral-surface-extension-fr35.ts',
          'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
        ],
        'Required neutral surfaces are enumerated, but hairline/philtrum/chin extension surfaces are not all provider-bound.',
      ),
      metric: axis(
        'blocked_pending_evidence',
        ['packages/face-reading/src/three-divisions-vertical-reference-derivations-fr36.ts'],
        'Seven vertical-reference contracts exist, but reviewed extraction algorithms/formulas and provider bindings are absent.',
      ),
      empirical_evidence: axis(
        'missing_governed_authority',
        [],
        'No empirical validation is authorized until the neutral vertical references become executable.',
      ),
      metric_concept_mapping: axis(
        'blocked_pending_evidence',
        [
          'packages/face-reading/src/mayi-three-divisions-neutral-anchor-requirements-fr34.ts',
          'packages/face-reading/src/three-divisions-vertical-reference-derivations-fr36.ts',
        ],
        'Traditional-neutral equivalence and source-variant selection remain unresolved.',
      ),
      semantic_claim: axis(
        'blocked_pending_evidence',
        ['packages/face-reading/src/three-divisions-vertical-reference-derivations-fr36.ts'],
        'No production F1/F6 Three Divisions claim is authorized while derivation and calibration remain unresolved.',
      ),
    },
    blockers: [
      'source_variant_selection_unresolved',
      'vertical_reference_algorithms_unreviewed',
      'hairline_philtrum_chin_provider_bindings_missing',
      'traditional_neutral_equivalence_unresolved',
      'three_divisions_calibration_unresolved',
    ],
    nextResearchAction:
      'Resolve the smallest executable neutral vertical-reference derivation path using existing FR34-FR36 contracts, without inventing provider indices or duplicating active mouth/eye evidence collection.',
  }),
  slice({
    sliceKey: 'six_fus_lineage_maps',
    label: '六府 / 神相·柳莊 lineage maps',
    systemKey: 'six_fus',
    lane: 'queued_research_frontier',
    axes: {
      source_authority: axis(
        'partial_research_authority',
        ['packages/face-reading/src/five-officers-six-fus-research-v0.ts'],
        'Two source lineages are preserved and explicitly conflict on upper/lower region mapping.',
      ),
      concept_authority: axis(
        'partial_research_authority',
        ['packages/face-reading/src/five-officers-six-fus-research-v0.ts'],
        'Each lineage has a research map, but a cross-lineage canonical Six-Fus map is forbidden.',
      ),
      neutral_observable: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
          'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts',
        ],
        'Mid-face and lower-face observable work exists, but it does not establish Six-Fus region equivalence.',
      ),
      metric: axis(
        'missing_governed_authority',
        [],
        'No lineage-specific Six-Fus metric contract is admitted.',
      ),
      empirical_evidence: axis(
        'missing_governed_authority',
        [],
        'No empirical Six-Fus region/metric validation package exists.',
      ),
      metric_concept_mapping: axis(
        'blocked_pending_evidence',
        ['packages/face-reading/src/five-officers-six-fus-research-v0.ts'],
        'The open lineage conflict must be preserved before any neutral-to-traditional mapping.',
      ),
      semantic_claim: axis(
        'missing_governed_authority',
        [],
        'No governed machine Six-Fus semantic claim path is admitted.',
      ),
    },
    blockers: [
      'shenxiang_liuzhuang_region_mapping_conflict_open',
      'lineage_specific_neutral_region_binding_missing',
      'metric_contract_missing',
      'empirical_validation_missing',
    ],
    nextResearchAction:
      'Treat Shenxiang and Liuzhuang as separate research slices and operationalize only one lineage at a time after Three Divisions.',
  }),
  slice({
    sliceKey: 'twelve_palaces',
    label: '十二宮 / 神相·柳莊',
    systemKey: 'twelve_palaces',
    lane: 'queued_research_frontier',
    axes: {
      source_authority: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/twelve-palaces-research-v0.ts',
          'packages/face-reading/src/twelve-palaces-authority-fr12.ts',
        ],
        'Lineage-specific locator passages and research methodology packs exist, but the current locator corpus remains research-level and includes unverified OCR passages.',
      ),
      concept_authority: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/twelve-palaces-research-v0.ts',
          'packages/face-reading/src/semantic-anchor-registry-fr13.ts',
        ],
        'Palace locator semantics are separated by lineage, but some anchor identities and conflicts remain unresolved.',
      ),
      neutral_observable: axis(
        'partial_research_authority',
        [
          'packages/face-reading/src/semantic-anchor-registry-fr13.ts',
          'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
        ],
        'Some neutral anchor surfaces exist, but many traditional anchors have no exact provider geometry.',
      ),
      metric: axis(
        'missing_governed_authority',
        [],
        'No complete Twelve-Palace metric/region execution contract exists.',
      ),
      empirical_evidence: axis(
        'missing_governed_authority',
        [],
        'No empirical validation package establishes Twelve-Palace region execution.',
      ),
      metric_concept_mapping: axis(
        'blocked_pending_evidence',
        ['packages/face-reading/src/semantic-anchor-registry-fr13.ts'],
        'Exact region/provider bindings are blocked for unresolved or research-only anchors.',
      ),
      semantic_claim: axis(
        'missing_governed_authority',
        [],
        'Locator authority does not authorize palace fortune, relationship, health, or life-outcome claims.',
      ),
    },
    blockers: [
      'locator_passages_not_uniformly_scan_checked',
      'exact_region_geometry_missing',
      'open_anchor_conflicts_present',
      'palace_interpretation_claim_authority_missing',
    ],
    nextResearchAction:
      'After higher-readiness systems, pick one palace and one lineage for exact source verification and region operationalization; do not build a synthetic universal 12-zone face map.',
  }),
  slice({
    sliceKey: 'thirteen_positions_family',
    label: '十三部位 계열',
    systemKey: 'thirteen_positions_family',
    lane: 'queued_research_frontier',
    axes: {
      source_authority: axis(
        'partial_research_authority',
        ['packages/face-reading/src/semantic-anchor-registry-fr13.ts'],
        'A central thirteen-position source sequence is preserved, but FR192 found no governed methodology coverage for the system as a whole.',
      ),
      concept_authority: axis(
        'missing_governed_authority',
        [],
        'No complete versioned Thirteen-Positions methodology is admitted.',
      ),
      neutral_observable: axis(
        'missing_governed_authority',
        [],
        'Individual anchors cannot be treated as a complete operationalized Thirteen-Positions system.',
      ),
      metric: axis('missing_governed_authority', [], 'No system metric contract exists.'),
      empirical_evidence: axis('missing_governed_authority', [], 'No system empirical validation exists.'),
      metric_concept_mapping: axis('missing_governed_authority', [], 'No system mapping authority exists.'),
      semantic_claim: axis('missing_governed_authority', [], 'No system semantic claim path exists.'),
    },
    blockers: [
      'methodology_definition_missing',
      'source_verification_incomplete',
      'region_operationalization_missing',
      'semantic_claim_scope_missing',
    ],
    nextResearchAction:
      'Start from source/methodology definition only after Five Officers, Three Divisions, Six Fus, and Twelve Palaces higher-value frontiers are stabilized.',
  }),
  slice({
    sliceKey: 'hundred_year_age_map',
    label: '百歲流年 계열',
    systemKey: 'hundred_year_age_map',
    lane: 'deferred',
    axes: {
      source_authority: axis('deferred', [], 'Explicitly deferred by current Face Reading research scope.'),
      concept_authority: axis('deferred', [], 'Explicitly deferred by current Face Reading research scope.'),
      neutral_observable: axis('deferred', [], 'Explicitly deferred by current Face Reading research scope.'),
      metric: axis('deferred', [], 'Explicitly deferred by current Face Reading research scope.'),
      empirical_evidence: axis('deferred', [], 'Explicitly deferred by current Face Reading research scope.'),
      metric_concept_mapping: axis('deferred', [], 'Explicitly deferred by current Face Reading research scope.'),
      semantic_claim: axis('deferred', [], 'Explicitly deferred by current Face Reading research scope.'),
    },
    blockers: ['explicitly_deferred'],
    nextResearchAction: 'No current action.',
  }),
]);

export const FACE_RESEARCH_MASTER_FRONTIER_FR258: FaceResearchMasterFrontierFR258 = Object.freeze({
  schemaVersion: 'fr258-face-research-master-frontier-v1' as const,
  artifactVersion: '0.1.0' as const,
  contractId: 'face_research_master_frontier_fr258' as const,
  baselineMainSha: '883d7e0e3ab35e8b037d2d4c5cbae28ec4e3fad1' as const,
  watchtowerTrack: 'face-research' as const,
  auditAxes: AXES,
  slices: FR258_FACE_RESEARCH_FRONTIER_SLICES,
  parallelActiveSlices: Object.freeze([
    'five_officers_intake_fang_da',
    'five_officers_inspection_xi_chang',
  ] as const),
  recommendedNextFrontier: Object.freeze({
    sliceKey: 'three_divisions_mayi' as const,
    selectionMode: 'highest_leverage_non_overlapping_research_frontier' as const,
    rationale:
      'Fang/Da and Xi/Chang already have active evidence/pre-collection lanes. Three Divisions has source/anchor research and explicit FR34-FR36 contracts but remains blocked at neutral vertical-reference execution, making it the highest-leverage non-overlapping slice that can advance without duplicating current capture work.',
    requiredNextResearch: Object.freeze([
      'choose_one_FR36_vertical_reference_dependency_with_existing_neutral_surface_support',
      'define_or_admit_the_smallest_reviewable_extraction_algorithm_without_invented_provider_semantics',
      'preserve_FR33_source_variant_non_selection_until_governed',
      'keep_traditional_neutral_equivalence_false_until_separately_supported',
      'do_not_issue_three_divisions_calibration_or_semantic_claims',
    ]),
  }),
  authorityBoundary: Object.freeze({
    sourceVerificationPromoted: false as const,
    traditionalConceptPromoted: false as const,
    providerBindingPromoted: false as const,
    metricBindingPromoted: false as const,
    empiricalSufficiencyPromoted: false as const,
    thresholdOrCalibrationPromoted: false as const,
    criterionStateIssued: false as const,
    structuredClaimIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  researchNoteRef: FR258_RESEARCH_NOTE_REF,
  nextFrontier:
    'resolve_three_divisions_neutral_vertical_reference_operationalization_without_duplicating_active_fang_da_or_xi_chang_evidence_lanes' as const,
});

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-258 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

export function assertFaceResearchMasterFrontierFR258(
  value: FaceResearchMasterFrontierFR258,
): void {
  const fr122 = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
  const fr192 = FACE_READING_MASTER_REGION_COVERAGE_SKELETON_FR192;
  const fr207 = FACE_READING_WHOLE_FACE_MINIMUM_MEASUREMENT_INVENTORY_FR207;

  if (
    value.schemaVersion !== 'fr258-face-research-master-frontier-v1' ||
    value.artifactVersion !== '0.1.0' ||
    value.contractId !== 'face_research_master_frontier_fr258' ||
    value.baselineMainSha !== '883d7e0e3ab35e8b037d2d4c5cbae28ec4e3fad1' ||
    value.watchtowerTrack !== 'face-research'
  ) fail('identity or baseline drift.');

  if (!sameSequence(value.auditAxes, AXES)) fail('seven-axis audit order drift.');
  if (value.slices.length !== 8) fail('master frontier must contain exactly eight audited slices.');
  if (new Set(value.slices.map((entry) => entry.sliceKey)).size !== value.slices.length) {
    fail('duplicate slice key.');
  }
  if (value.slices.some((entry) => entry.handoffReady !== false)) fail('FR258 cannot mark any slice handoff-ready.');

  const traditionalByKey = new Map(
    fr192.traditionalMethodologyCoverage.map((entry) => [entry.systemKey, entry] as const),
  );
  if (
    traditionalByKey.get('five_officers')?.coverageState !== 'existing_research_only' ||
    traditionalByKey.get('six_fus')?.coverageState !== 'existing_research_only' ||
    traditionalByKey.get('twelve_palaces')?.coverageState !== 'existing_research_only' ||
    traditionalByKey.get('thirteen_positions_family')?.coverageState !== 'coverage_target_unverified' ||
    traditionalByKey.get('hundred_year_age_map')?.coverageState !== 'deferred'
  ) fail('FR192 traditional methodology coverage drift.');

  const measurementByRegion = new Map(fr207.entries.map((entry) => [entry.regionKey, entry] as const));
  if (
    measurementByRegion.get('ear')?.currentReadiness !== 'unavailable' ||
    measurementByRegion.get('eye_pair')?.currentReadiness !== 'existing_research_metric' ||
    measurementByRegion.get('mouth_lips')?.currentReadiness !== 'existing_governed_neutral_metric' ||
    measurementByRegion.get('nose')?.currentReadiness !== 'existing_governed_neutral_metric'
  ) fail('FR207 neutral measurement readiness drift.');

  if (
    fr122.authorityState !== 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state' ||
    fr122.execution.criterionStatesIssued !== 0 ||
    fr122.execution.structuredClaimsIssued !== 0 ||
    fr122.execution.boundedNarrativesIssued !== 0
  ) fail('FR122 mouth semantic execution boundary drift.');

  if (
    FR190_VERDICT !== 'GOVERNED_XI_CHANG_MAPPING_EVIDENCE_STUDY_REGISTERED_COLLECTION_AND_EMPIRICAL_EVIDENCE_NOT_ADMITTED' ||
    FR190_NEXT_FRONTIER !==
      'define_governed_xi_chang_construct_correspondence_and_alternative_metric_confound_preregistration_before_evidence_collection' ||
    FR190_STUDY_ARMS.some((arm) =>
      arm.registrationState !== 'registered_blocked_pre_collection' ||
      arm.empiricalEvidenceIssued !== false ||
      arm.evidenceCollectionAuthorized !== false ||
      arm.stableCriterionId !== null ||
      arm.directionality !== null ||
      arm.thresholdRef !== null
    )
  ) fail('FR190 Xi/Chang pre-collection boundary drift.');

  if (
    THREE_DIVISIONS_NEUTRAL_SURFACE_EXTENSION_AUTHORITY_FR35.authorityState !==
      'neutral_surface_contract_defined_provider_binding_blocked' ||
    THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36.authorityState !==
      'derivation_contracts_defined_algorithms_unreviewed' ||
    THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36.contracts.length !== 7
  ) fail('FR35/FR36 Three Divisions readiness drift.');

  if (
    !FACE_RESEARCH_PACK_FR12.methodologyDefinitionRefs.includes('method.shenxiang.twelve_palaces@0.1.0') ||
    !FACE_RESEARCH_PACK_FR12.methodologyDefinitionRefs.includes('method.liuzhuang.twelve_palaces@0.1.0')
  ) fail('FR12 Twelve Palaces methodology-pack coverage drift.');

  if (!sameSequence(value.parallelActiveSlices, [
    'five_officers_intake_fang_da',
    'five_officers_inspection_xi_chang',
  ])) fail('parallel active lane declaration drift.');

  if (value.recommendedNextFrontier.sliceKey !== 'three_divisions_mayi') {
    fail('recommended frontier must remain non-overlapping Three Divisions.');
  }
  if (value.parallelActiveSlices.includes(value.recommendedNextFrontier.sliceKey as never)) {
    fail('recommended frontier duplicates an active empirical/pre-collection lane.');
  }

  const threeDivisions = value.slices.find((entry) => entry.sliceKey === 'three_divisions_mayi');
  if (
    threeDivisions?.lane !== 'selected_non_overlapping_next_frontier' ||
    threeDivisions.axes.metric.state !== 'blocked_pending_evidence' ||
    threeDivisions.axes.semantic_claim.state !== 'blocked_pending_evidence'
  ) fail('Three Divisions selection/readiness drift.');

  const hundredYear = value.slices.find((entry) => entry.sliceKey === 'hundred_year_age_map');
  if (
    hundredYear?.lane !== 'deferred' ||
    Object.values(hundredYear.axes).some((entry) => entry.state !== 'deferred')
  ) fail('Hundred-Year age map must remain fully deferred.');

  if (Object.values(value.authorityBoundary).some((entry) => entry !== false)) {
    fail('authority boundary widened.');
  }
  if (value.researchNoteRef !== FR258_RESEARCH_NOTE_REF) fail('research note ref drift.');
  if (
    value.nextFrontier !==
      'resolve_three_divisions_neutral_vertical_reference_operationalization_without_duplicating_active_fang_da_or_xi_chang_evidence_lanes'
  ) fail('next frontier drift.');
}

export function issueFaceResearchMasterFrontierFR258(): FaceResearchMasterFrontierFR258 {
  assertFaceResearchMasterFrontierFR258(FACE_RESEARCH_MASTER_FRONTIER_FR258);
  ISSUED.add(FACE_RESEARCH_MASTER_FRONTIER_FR258);
  return FACE_RESEARCH_MASTER_FRONTIER_FR258;
}

export function assertIssuedFaceResearchMasterFrontierFR258(
  value: FaceResearchMasterFrontierFR258,
): void {
  assertFaceResearchMasterFrontierFR258(value);
  if (!ISSUED.has(value)) fail('unissued master frontier.');
}
