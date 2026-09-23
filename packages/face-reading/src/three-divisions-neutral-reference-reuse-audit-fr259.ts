import {
  MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33,
} from './mayi-three-divisions-boundary-variants-fr33.js';
import {
  MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR34,
  MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_REQUIREMENTS_FR34,
  type MayiThreeDivisionsTraditionalAnchorFR34V1,
} from './mayi-three-divisions-neutral-anchor-requirements-fr34.js';
import {
  THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35,
} from './three-divisions-neutral-surface-extension-fr35.js';
import {
  THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36,
} from './three-divisions-vertical-reference-derivations-fr36.js';
import {
  FR209_STATIC_UNAVAILABLE_SLOTS,
} from './governed-geometry-to-fr208-adapter-fr209.js';
import {
  FR216_CONTRACT_VERSION,
} from './canonical-visible-lower-face-contour-fr216.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR259_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr259-three-divisions-neutral-reference-reuse-audit.md' as const;

export type ThreeDivisionsNeutralReuseStateFR259 =
  | 'no_current_reuse_candidate'
  | 'existing_neutral_dependency_still_blocked'
  | 'bounded_successor_candidate_not_equivalent';

export interface ThreeDivisionsNeutralReuseEntryFR259 {
  readonly traditionalAnchorRef: MayiThreeDivisionsTraditionalAnchorFR34V1;
  readonly fr34NeutralRequirementRef: string;
  readonly fr34RequirementState:
    | 'blocked_no_existing_neutral_surface'
    | 'blocked_existing_derivation_dependency'
    | 'blocked_traditional_neutral_equivalence';
  readonly fr36DerivationId: string;
  readonly reuseState: ThreeDivisionsNeutralReuseStateFR259;
  readonly postFr208EvidenceRefs: readonly string[];
  readonly directFR35SurfaceSatisfied: false;
  readonly directFR36DerivationSatisfied: false;
  readonly traditionalNeutralEquivalenceAuthorized: false;
  readonly providerIndexSemanticBindingAuthorized: false;
  readonly note: string;
}

export interface ThreeDivisionsNeutralReferenceReuseAuditFR259 {
  readonly schemaVersion: 'fr259-three-divisions-neutral-reference-reuse-audit-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractId: 'three_divisions_neutral_reference_reuse_audit_fr259';
  readonly baselineMainSha: 'bc7f63c0c5f6bc2d2f83f4d03eabe144814e844e';
  readonly watchtowerTrack: 'face-research';
  readonly upstream: {
    readonly fr33State: 'scan_checked_multiple_boundary_variants_unresolved';
    readonly fr34State: 'provider_independent_requirements_defined_operationalization_blocked';
    readonly fr35SurfaceCount: 3;
    readonly fr36State: 'derivation_contracts_defined_algorithms_unreviewed';
    readonly fr36ContractCount: 7;
    readonly sourceVariantSelected: false;
  };
  readonly entries: readonly ThreeDivisionsNeutralReuseEntryFR259[];
  readonly selectedSmallestNextPrimitive: {
    readonly traditionalAnchorContext: 'dige';
    readonly candidateRef:
      'candidate.neutral.face.visible_lower_face_inferior_vertical_reference.fr259';
    readonly candidateSourceRef:
      'packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts';
    readonly sourceContractVersion: typeof FR216_CONTRACT_VERSION;
    readonly sourceAuthorityState:
      'canonical_visible_soft_tissue_lower_face_contour_only';
    readonly candidateRole:
      'product_neutral_visible_lower_face_inferior_reference_only';
    readonly exactFR35SlotReplacementAuthorized: false;
    readonly coordinateFrameCompatibilityEstablished: false;
    readonly anatomicalChinIdentityAuthorized: false;
    readonly traditionalDigeEquivalenceAuthorized: false;
    readonly derivationAlgorithmIssued: false;
    readonly metricIssued: false;
    readonly empiricalValidationIssued: false;
    readonly rationale: string;
  };
  readonly rejectedShortcuts: readonly [
    'fr216_visible_lower_face_contour_equals_dige',
    'fr216_metric_xy_directly_satisfies_fr35_canonical_image_normalized_2d',
    'fr209_unavailable_brow_slot_is_treated_as_brow_reference',
    'nose_shape_metrics_are_reused_as_shangen_or_zhuntou_vertical_points',
    'source_variant_selected_to_fit_available_geometry',
  ];
  readonly authorityBoundary: {
    readonly fr33VariantSelectionPromoted: false;
    readonly fr35ProviderBindingPromoted: false;
    readonly fr36AlgorithmPromoted: false;
    readonly traditionalNeutralEquivalencePromoted: false;
    readonly providerIndexSemanticBindingPromoted: false;
    readonly threeDivisionsMetricPromoted: false;
    readonly calibrationOrThresholdPromoted: false;
    readonly F1ClaimIssued: false;
    readonly F6ClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR259_RESEARCH_NOTE_REF;
  readonly nextFrontier:
    'review_product_neutral_visible_lower_face_inferior_vertical_reference_from_fr216_without_dige_equivalence_or_fr35_frame_collapse';
}

const EXPECTED_ANCHOR_ORDER = Object.freeze([
  'hairline',
  'brow',
  'yintang',
  'shangen',
  'zhuntou',
  'renzhong',
  'dige',
] as const);

const EXPECTED_REUSE_STATE: Readonly<
  Record<MayiThreeDivisionsTraditionalAnchorFR34V1, ThreeDivisionsNeutralReuseStateFR259>
> = Object.freeze({
  hairline: 'no_current_reuse_candidate',
  brow: 'existing_neutral_dependency_still_blocked',
  yintang: 'existing_neutral_dependency_still_blocked',
  shangen: 'existing_neutral_dependency_still_blocked',
  zhuntou: 'existing_neutral_dependency_still_blocked',
  renzhong: 'no_current_reuse_candidate',
  dige: 'bounded_successor_candidate_not_equivalent',
});

function evidenceRefsFor(
  anchor: MayiThreeDivisionsTraditionalAnchorFR34V1,
): readonly string[] {
  if (anchor === 'brow' || anchor === 'yintang') {
    return Object.freeze([
      'packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts',
      'packages/face-reading/src/governed-geometry-to-fr208-adapter-fr209.ts',
    ]);
  }
  if (anchor === 'shangen' || anchor === 'zhuntou') {
    return Object.freeze([
      'packages/face-reading/src/nose-geometry.ts',
      'packages/face-reading/src/governed-geometry-to-fr208-adapter-fr209.ts',
    ]);
  }
  if (anchor === 'dige') {
    return Object.freeze([
      'packages/face-reading/src/visible-lower-face-width-fr213.ts',
      'packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts',
    ]);
  }
  return Object.freeze([] as string[]);
}

function noteFor(anchor: MayiThreeDivisionsTraditionalAnchorFR34V1): string {
  switch (anchor) {
    case 'hairline':
      return 'No post-FR208 governed hairline boundary or vertical reference exists; FR35 remains an unbound neutral surface contract.';
    case 'brow':
      return 'FR208 defines eyebrow-neutral measurements, but FR209 still marks the governed eyebrow adapter unavailable because a neutral brow curve is not authorized; this cannot satisfy the FR36 brow vertical reference.';
    case 'yintang':
      return 'No post-FR208 governed interbrow/brow-midline point supersedes the blocked FR17 brow-midline dependency, so the Yintang-context neutral reference remains blocked and non-equivalent.';
    case 'shangen':
      return 'Existing nose geometry measures bridge straightness/circularity, not a governed nasal-root vertical point; shape metrics cannot be substituted for the FR36 vertical reference.';
    case 'zhuntou':
      return 'Existing nose-tip circularity is a shape metric, not a governed nose-tip vertical point; it cannot satisfy the FR36 vertical-reference contract.';
    case 'renzhong':
      return 'No post-FR208 governed philtrum-region surface or midline vertical reference exists; FR35 remains unbound.';
    case 'dige':
      return 'FR216 now provides a governed product-neutral visible soft-tissue lower-face contour. It materially narrows the neutral-observable gap, but it is not an anatomical chin boundary, not Dige, and its canonical metric XY frame does not directly satisfy the older FR35 canonical-image-normalized-2D slot.';
  }
}

function buildEntry(
  anchor: MayiThreeDivisionsTraditionalAnchorFR34V1,
): ThreeDivisionsNeutralReuseEntryFR259 {
  const requirement = MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_REQUIREMENTS_FR34.find(
    (entry) => entry.traditionalAnchorRef === anchor,
  );
  const derivation = THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36.contracts.find(
    (entry) => entry.traditionalAnchorRef === anchor,
  );
  if (requirement === undefined || derivation === undefined) {
    throw new FaceAuthorityValidationError(`FR-259 missing FR34/FR36 anchor: ${anchor}`);
  }

  return Object.freeze({
    traditionalAnchorRef: anchor,
    fr34NeutralRequirementRef: requirement.neutralRequirementRef,
    fr34RequirementState: requirement.requirementState,
    fr36DerivationId: derivation.derivationId,
    reuseState: EXPECTED_REUSE_STATE[anchor],
    postFr208EvidenceRefs: evidenceRefsFor(anchor),
    directFR35SurfaceSatisfied: false as const,
    directFR36DerivationSatisfied: false as const,
    traditionalNeutralEquivalenceAuthorized: false as const,
    providerIndexSemanticBindingAuthorized: false as const,
    note: noteFor(anchor),
  });
}

export const FR259_THREE_DIVISIONS_NEUTRAL_REUSE_ENTRIES:
readonly ThreeDivisionsNeutralReuseEntryFR259[] = Object.freeze(
  EXPECTED_ANCHOR_ORDER.map(buildEntry),
);

export const THREE_DIVISIONS_NEUTRAL_REFERENCE_REUSE_AUDIT_FR259:
ThreeDivisionsNeutralReferenceReuseAuditFR259 = Object.freeze({
  schemaVersion: 'fr259-three-divisions-neutral-reference-reuse-audit-v1' as const,
  artifactVersion: '0.1.0' as const,
  contractId: 'three_divisions_neutral_reference_reuse_audit_fr259' as const,
  baselineMainSha: 'bc7f63c0c5f6bc2d2f83f4d03eabe144814e844e' as const,
  watchtowerTrack: 'face-research' as const,
  upstream: Object.freeze({
    fr33State: 'scan_checked_multiple_boundary_variants_unresolved' as const,
    fr34State: 'provider_independent_requirements_defined_operationalization_blocked' as const,
    fr35SurfaceCount: 3 as const,
    fr36State: 'derivation_contracts_defined_algorithms_unreviewed' as const,
    fr36ContractCount: 7 as const,
    sourceVariantSelected: false as const,
  }),
  entries: FR259_THREE_DIVISIONS_NEUTRAL_REUSE_ENTRIES,
  selectedSmallestNextPrimitive: Object.freeze({
    traditionalAnchorContext: 'dige' as const,
    candidateRef:
      'candidate.neutral.face.visible_lower_face_inferior_vertical_reference.fr259' as const,
    candidateSourceRef:
      'packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts' as const,
    sourceContractVersion: FR216_CONTRACT_VERSION,
    sourceAuthorityState: 'canonical_visible_soft_tissue_lower_face_contour_only' as const,
    candidateRole:
      'product_neutral_visible_lower_face_inferior_reference_only' as const,
    exactFR35SlotReplacementAuthorized: false as const,
    coordinateFrameCompatibilityEstablished: false as const,
    anatomicalChinIdentityAuthorized: false as const,
    traditionalDigeEquivalenceAuthorized: false as const,
    derivationAlgorithmIssued: false as const,
    metricIssued: false as const,
    empiricalValidationIssued: false as const,
    rationale:
      'Among the seven FR36 dependencies, only the lower-face path has a newer governed contour surface that materially narrows the observable gap. FR216 can therefore seed a new product-neutral inferior-reference review, while remaining explicitly non-equivalent to anatomical chin or traditional Dige and without pretending to satisfy the older FR35 coordinate contract.',
  }),
  rejectedShortcuts: Object.freeze([
    'fr216_visible_lower_face_contour_equals_dige',
    'fr216_metric_xy_directly_satisfies_fr35_canonical_image_normalized_2d',
    'fr209_unavailable_brow_slot_is_treated_as_brow_reference',
    'nose_shape_metrics_are_reused_as_shangen_or_zhuntou_vertical_points',
    'source_variant_selected_to_fit_available_geometry',
  ] as const),
  authorityBoundary: Object.freeze({
    fr33VariantSelectionPromoted: false as const,
    fr35ProviderBindingPromoted: false as const,
    fr36AlgorithmPromoted: false as const,
    traditionalNeutralEquivalencePromoted: false as const,
    providerIndexSemanticBindingPromoted: false as const,
    threeDivisionsMetricPromoted: false as const,
    calibrationOrThresholdPromoted: false as const,
    F1ClaimIssued: false as const,
    F6ClaimIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  researchNoteRef: FR259_RESEARCH_NOTE_REF,
  nextFrontier:
    'review_product_neutral_visible_lower_face_inferior_vertical_reference_from_fr216_without_dige_equivalence_or_fr35_frame_collapse' as const,
});

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-259 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

export function assertThreeDivisionsNeutralReferenceReuseAuditFR259(
  value: ThreeDivisionsNeutralReferenceReuseAuditFR259,
): void {
  if (
    value.schemaVersion !== 'fr259-three-divisions-neutral-reference-reuse-audit-v1' ||
    value.artifactVersion !== '0.1.0' ||
    value.contractId !== 'three_divisions_neutral_reference_reuse_audit_fr259' ||
    value.baselineMainSha !== 'bc7f63c0c5f6bc2d2f83f4d03eabe144814e844e' ||
    value.watchtowerTrack !== 'face-research'
  ) fail('identity/baseline drift.');

  if (
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityState !==
      'scan_checked_multiple_boundary_variants_unresolved' ||
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.selectionPolicy.status !== 'unresolved' ||
    MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.selectionPolicy.selectedVariantId !== null ||
    MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR34.authorityState !==
      'provider_independent_requirements_defined_operationalization_blocked' ||
    THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35.length !== 3 ||
    THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36.authorityState !==
      'derivation_contracts_defined_algorithms_unreviewed' ||
    THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36.contracts.length !== 7
  ) fail('FR33-FR36 upstream boundary drift.');

  if (
    value.upstream.fr33State !== MAYI_THREE_DIVISIONS_BOUNDARY_AUTHORITY_FR33.authorityState ||
    value.upstream.fr34State !== MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR34.authorityState ||
    value.upstream.fr35SurfaceCount !== THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35.length ||
    value.upstream.fr36State !== THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36.authorityState ||
    value.upstream.fr36ContractCount !== THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36.contracts.length ||
    value.upstream.sourceVariantSelected !== false
  ) fail('upstream receipt drift.');

  if (!sameSequence(value.entries.map((entry) => entry.traditionalAnchorRef), EXPECTED_ANCHOR_ORDER)) {
    fail('seven-anchor audit order/coverage drift.');
  }
  if (new Set(value.entries.map((entry) => entry.traditionalAnchorRef)).size !== 7) {
    fail('duplicate audited anchor.');
  }

  for (const entry of value.entries) {
    const requirement = MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_REQUIREMENTS_FR34.find(
      (candidate) => candidate.traditionalAnchorRef === entry.traditionalAnchorRef,
    );
    const derivation = THREE_DIVISIONS_VERTICAL_REFERENCE_DERIVATION_AUTHORITY_FR36.contracts.find(
      (candidate) => candidate.traditionalAnchorRef === entry.traditionalAnchorRef,
    );
    if (
      requirement === undefined ||
      derivation === undefined ||
      entry.fr34NeutralRequirementRef !== requirement.neutralRequirementRef ||
      entry.fr34RequirementState !== requirement.requirementState ||
      entry.fr36DerivationId !== derivation.derivationId ||
      entry.reuseState !== EXPECTED_REUSE_STATE[entry.traditionalAnchorRef] ||
      entry.directFR35SurfaceSatisfied !== false ||
      entry.directFR36DerivationSatisfied !== false ||
      entry.traditionalNeutralEquivalenceAuthorized !== false ||
      entry.providerIndexSemanticBindingAuthorized !== false
    ) fail(`anchor audit drift: ${entry.traditionalAnchorRef}`);
  }

  if (
    FR209_STATIC_UNAVAILABLE_SLOTS.eyebrow.reason !== 'neutral_brow_curve_not_authorized'
  ) fail('FR209 eyebrow-unavailable boundary drift.');

  const dige = value.entries.find((entry) => entry.traditionalAnchorRef === 'dige');
  if (
    dige?.reuseState !== 'bounded_successor_candidate_not_equivalent' ||
    !dige.postFr208EvidenceRefs.includes(
      'packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts',
    )
  ) fail('Dige-context bounded successor selection drift.');

  const selected = value.selectedSmallestNextPrimitive;
  if (
    selected.traditionalAnchorContext !== 'dige' ||
    selected.candidateRef !==
      'candidate.neutral.face.visible_lower_face_inferior_vertical_reference.fr259' ||
    selected.sourceContractVersion !== FR216_CONTRACT_VERSION ||
    selected.exactFR35SlotReplacementAuthorized !== false ||
    selected.coordinateFrameCompatibilityEstablished !== false ||
    selected.anatomicalChinIdentityAuthorized !== false ||
    selected.traditionalDigeEquivalenceAuthorized !== false ||
    selected.derivationAlgorithmIssued !== false ||
    selected.metricIssued !== false ||
    selected.empiricalValidationIssued !== false
  ) fail('selected smallest next primitive boundary drift.');

  if (THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35.find(
    (surface) => surface.consumerSlot === 'neutral.face.chin_inferior_contour',
  )?.coordinateFrame !== 'canonical_image_normalized_2d') {
    fail('FR35 chin-inferior coordinate frame drift.');
  }

  if (!sameSequence(value.rejectedShortcuts, [
    'fr216_visible_lower_face_contour_equals_dige',
    'fr216_metric_xy_directly_satisfies_fr35_canonical_image_normalized_2d',
    'fr209_unavailable_brow_slot_is_treated_as_brow_reference',
    'nose_shape_metrics_are_reused_as_shangen_or_zhuntou_vertical_points',
    'source_variant_selected_to_fit_available_geometry',
  ])) fail('rejected shortcuts drift.');

  if (Object.values(value.authorityBoundary).some((entry) => entry !== false)) {
    fail('authority boundary widened.');
  }
  if (value.researchNoteRef !== FR259_RESEARCH_NOTE_REF) fail('research note ref drift.');
  if (
    value.nextFrontier !==
      'review_product_neutral_visible_lower_face_inferior_vertical_reference_from_fr216_without_dige_equivalence_or_fr35_frame_collapse'
  ) fail('next frontier drift.');
}

export function issueThreeDivisionsNeutralReferenceReuseAuditFR259():
ThreeDivisionsNeutralReferenceReuseAuditFR259 {
  assertThreeDivisionsNeutralReferenceReuseAuditFR259(
    THREE_DIVISIONS_NEUTRAL_REFERENCE_REUSE_AUDIT_FR259,
  );
  ISSUED.add(THREE_DIVISIONS_NEUTRAL_REFERENCE_REUSE_AUDIT_FR259);
  return THREE_DIVISIONS_NEUTRAL_REFERENCE_REUSE_AUDIT_FR259;
}

export function assertIssuedThreeDivisionsNeutralReferenceReuseAuditFR259(
  value: ThreeDivisionsNeutralReferenceReuseAuditFR259,
): void {
  assertThreeDivisionsNeutralReferenceReuseAuditFR259(value);
  if (!ISSUED.has(value)) fail('unissued reuse audit.');
}
