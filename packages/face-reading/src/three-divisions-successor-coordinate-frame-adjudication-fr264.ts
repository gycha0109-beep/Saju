import {
  FR262_AUTHORITY_REF,
  issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262,
} from './mayi-contiguous-three-divisions-neutral-anchor-requirements-fr262.js';
import {
  getPoseNormalizedLipsProjectionRuleFR79,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  FR208_CONTRACT_VERSION,
  FACE_READING_NEUTRAL_OBSERVABLE_PRIMITIVE_PACK_FR208,
  assertFaceReadingNeutralObservablePrimitivePackFR208,
} from './cross-face-neutral-observable-primitives-fr208.js';
import {
  FR209_STATIC_UNAVAILABLE_SLOTS,
} from './governed-geometry-to-fr208-adapter-fr209.js';
import {
  FR216_CONTRACT_VERSION,
} from './canonical-visible-lower-face-contour-fr216.js';
import {
  FR260_REFERENCE_REF,
} from './visible-lower-face-inferior-vertical-reference-fr260.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR264_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr264-three-divisions-successor-coordinate-frame-adjudication.md' as const;
export const FR264_RECORD_ID =
  'research.face_reading.mayi_contiguous_three_divisions.coordinate_frame_adjudication.fr264' as const;
export const FR264_NEXT_FRONTIER =
  'issue_full_face_canonical_metric_xy_projection_rule_without_anchor_anatomy_or_traditional_semantics' as const;

export type ThreeDivisionsSuccessorFrameCandidateFR264 =
  | 'canonical_image_normalized_2d'
  | 'canonical_aligned_right_handed_metric_xy'
  | 'mixed_coordinate_frames';

export interface ThreeDivisionsSuccessorFrameCandidateAssessmentFR264 {
  readonly frame: ThreeDivisionsSuccessorFrameCandidateFR264;
  readonly status:
    | 'historical_compatibility_not_selected'
    | 'selected_research_target_execution_blocked'
    | 'rejected';
  readonly reasons: readonly string[];
}

export interface ThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264 {
  readonly schemaVersion:
    'fr264-three-divisions-successor-coordinate-frame-adjudication-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR264_RECORD_ID;
  readonly baselineMainSha: 'b9cb766917e54fc7180278b417ea78aba3a17266';
  readonly watchtowerTrack: 'face-research';
  readonly authorityState:
    'research_successor_coordinate_frame_selected_projection_and_anchor_execution_blocked';
  readonly predecessor: {
    readonly fr262AuthorityRef: typeof FR262_AUTHORITY_REF;
    readonly fr262FrameDecision:
      'unresolved_successor_frame_no_cross_frame_collapse';
    readonly fourAnchorOrder: readonly ['hairline', 'brow', 'zhuntou', 'dige'];
    readonly historicalNormalizedFramePreserved: true;
  };
  readonly candidates: readonly ThreeDivisionsSuccessorFrameCandidateAssessmentFR264[];
  readonly decision: {
    readonly selectedTargetFrame:
      'canonical_aligned_right_handed_metric_xy';
    readonly selectedTargetUnit: 'centimeter';
    readonly selectionScope:
      'research_successor_target_only_no_executable_anchor_derivation';
    readonly historicalNormalizedFrameRetiredFromSuccessor: true;
    readonly historicalNormalizedArtifactsPreserved: true;
    readonly mixedFrameSpanComputationAuthorized: false;
    readonly imageNormalizedToMetricBridgeIssued: false;
    readonly metricToImageNormalizedBridgeIssued: false;
  };
  readonly evidence: {
    readonly fr77SourceFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly fr77GenericReviewed2DProjectionIssued: false;
    readonly fr79ProjectionRuleRef:
      'fr79:canonical-metric-xy-orthographic@0.1.0';
    readonly fr79ProjectionTargetFrame: 'pose_normalized_face_2d';
    readonly fr79ProjectionFormula: 'x2d=x3d;y2d=y3d';
    readonly fr79ProjectionScope:
      'reviewed_inside_lips_specific_geometry_contract_not_globalized';
    readonly fr208ContractVersion: typeof FR208_CONTRACT_VERSION;
    readonly fr208MetricXYObservableFamilyPresent: true;
    readonly fr216ContractVersion: typeof FR216_CONTRACT_VERSION;
    readonly fr260ReferenceRef: typeof FR260_REFERENCE_REF;
    readonly fr260AlreadyUsesSelectedMetricXYFrame: true;
  };
  readonly anchorReadiness: readonly [
    {
      readonly anchor: 'hairline';
      readonly state:
        'blocked_no_metric_frame_hairline_surface_or_registration_authority';
    },
    {
      readonly anchor: 'brow';
      readonly state:
        'blocked_neutral_brow_curve_not_authorized';
    },
    {
      readonly anchor: 'zhuntou';
      readonly state:
        'blocked_exact_neutral_nose_tip_vertical_reference_not_authorized';
    },
    {
      readonly anchor: 'dige';
      readonly state:
        'candidate_metric_xy_reference_exists_traditional_equivalence_blocked';
    },
  ];
  readonly projectionGap: {
    readonly fullFaceMetricXYProjectionAuthorityExists: false;
    readonly fr79MayBeSilentlyGeneralized: false;
    readonly requiredNextAuthority:
      'full_face_neutral_canonical_metric_xy_projection_rule';
    readonly requiredRuleScope:
      'coordinate_projection_only_no_anchor_identity_no_anatomy_no_traditional_semantics';
  };
  readonly authorityBoundary: {
    readonly coordinateFrameSelectionOnly: true;
    readonly executableProjectionIssued: false;
    readonly anchorDerivationIssued: false;
    readonly hairlineRegistrationIssued: false;
    readonly browBindingIssued: false;
    readonly zhuntouBindingIssued: false;
    readonly digeBindingIssued: false;
    readonly traditionalNeutralEquivalenceIssued: false;
    readonly providerSemanticBindingIssued: false;
    readonly crossFrameConversionIssued: false;
    readonly mixedFrameSpanAuthorized: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly F1ClaimIssued: false;
    readonly F6ClaimIssued: false;
    readonly fortuneClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR264_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR264_NEXT_FRONTIER;
}

const CANDIDATES: readonly ThreeDivisionsSuccessorFrameCandidateAssessmentFR264[] =
  Object.freeze([
    Object.freeze({
      frame: 'canonical_image_normalized_2d' as const,
      status: 'historical_compatibility_not_selected' as const,
      reasons: Object.freeze([
        'FR34/FR35 inherited this frame from the historical FR15 neutral-observation contract.',
        'The newer governed cross-face observable stack does not converge on this frame.',
        'Keeping it as the successor would require a parallel normalized-image derivation path for newer metric-frame candidates.',
        'Historical compatibility is preserved without making it the new successor target.',
      ]),
    }),
    Object.freeze({
      frame: 'canonical_aligned_right_handed_metric_xy' as const,
      status: 'selected_research_target_execution_blocked' as const,
      reasons: Object.freeze([
        'FR208 defines cross-face neutral observable inputs and metrics in canonical aligned metric XY.',
        'FR216 and FR260 already use canonical aligned metric XY for lower-face neutral geometry.',
        'The frame inherits canonical pose compensation from the governed metric-geometry stack.',
        'Execution remains blocked because FR77 does not itself issue a generic reviewed 2D projection rule.',
      ]),
    }),
    Object.freeze({
      frame: 'mixed_coordinate_frames' as const,
      status: 'rejected' as const,
      reasons: Object.freeze([
        'Three-Divisions span lengths require endpoints in one common coordinate frame.',
        'Subtracting normalized-image and metric-XY vertical coordinates is dimensionally invalid.',
        'No cross-frame conversion authority exists.',
      ]),
    }),
  ]);

const ANCHOR_READINESS =
  Object.freeze([
    Object.freeze({
      anchor: 'hairline' as const,
      state:
        'blocked_no_metric_frame_hairline_surface_or_registration_authority' as const,
    }),
    Object.freeze({
      anchor: 'brow' as const,
      state: 'blocked_neutral_brow_curve_not_authorized' as const,
    }),
    Object.freeze({
      anchor: 'zhuntou' as const,
      state:
        'blocked_exact_neutral_nose_tip_vertical_reference_not_authorized' as const,
    }),
    Object.freeze({
      anchor: 'dige' as const,
      state:
        'candidate_metric_xy_reference_exists_traditional_equivalence_blocked' as const,
    }),
  ] as const);

export const THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264:
ThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264 = Object.freeze({
  schemaVersion:
    'fr264-three-divisions-successor-coordinate-frame-adjudication-v1' as const,
  artifactVersion: '0.1.0' as const,
  recordId: FR264_RECORD_ID,
  baselineMainSha: 'b9cb766917e54fc7180278b417ea78aba3a17266' as const,
  watchtowerTrack: 'face-research' as const,
  authorityState:
    'research_successor_coordinate_frame_selected_projection_and_anchor_execution_blocked' as const,
  predecessor: Object.freeze({
    fr262AuthorityRef: FR262_AUTHORITY_REF,
    fr262FrameDecision:
      'unresolved_successor_frame_no_cross_frame_collapse' as const,
    fourAnchorOrder: Object.freeze([
      'hairline',
      'brow',
      'zhuntou',
      'dige',
    ] as const),
    historicalNormalizedFramePreserved: true as const,
  }),
  candidates: CANDIDATES,
  decision: Object.freeze({
    selectedTargetFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    selectedTargetUnit: 'centimeter' as const,
    selectionScope:
      'research_successor_target_only_no_executable_anchor_derivation' as const,
    historicalNormalizedFrameRetiredFromSuccessor: true as const,
    historicalNormalizedArtifactsPreserved: true as const,
    mixedFrameSpanComputationAuthorized: false as const,
    imageNormalizedToMetricBridgeIssued: false as const,
    metricToImageNormalizedBridgeIssued: false as const,
  }),
  evidence: Object.freeze({
    fr77SourceFrame:
      'canonical_aligned_right_handed_metric_3d' as const,
    fr77GenericReviewed2DProjectionIssued: false as const,
    fr79ProjectionRuleRef:
      'fr79:canonical-metric-xy-orthographic@0.1.0' as const,
    fr79ProjectionTargetFrame: 'pose_normalized_face_2d' as const,
    fr79ProjectionFormula: 'x2d=x3d;y2d=y3d' as const,
    fr79ProjectionScope:
      'reviewed_inside_lips_specific_geometry_contract_not_globalized' as const,
    fr208ContractVersion: FR208_CONTRACT_VERSION,
    fr208MetricXYObservableFamilyPresent: true as const,
    fr216ContractVersion: FR216_CONTRACT_VERSION,
    fr260ReferenceRef: FR260_REFERENCE_REF,
    fr260AlreadyUsesSelectedMetricXYFrame: true as const,
  }),
  anchorReadiness: ANCHOR_READINESS,
  projectionGap: Object.freeze({
    fullFaceMetricXYProjectionAuthorityExists: false as const,
    fr79MayBeSilentlyGeneralized: false as const,
    requiredNextAuthority:
      'full_face_neutral_canonical_metric_xy_projection_rule' as const,
    requiredRuleScope:
      'coordinate_projection_only_no_anchor_identity_no_anatomy_no_traditional_semantics' as const,
  }),
  authorityBoundary: Object.freeze({
    coordinateFrameSelectionOnly: true as const,
    executableProjectionIssued: false as const,
    anchorDerivationIssued: false as const,
    hairlineRegistrationIssued: false as const,
    browBindingIssued: false as const,
    zhuntouBindingIssued: false as const,
    digeBindingIssued: false as const,
    traditionalNeutralEquivalenceIssued: false as const,
    providerSemanticBindingIssued: false as const,
    crossFrameConversionIssued: false as const,
    mixedFrameSpanAuthorized: false as const,
    thresholdIssued: false as const,
    calibrationIssued: false as const,
    classifierIssued: false as const,
    F1ClaimIssued: false as const,
    F6ClaimIssued: false as const,
    fortuneClaimIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  researchNoteRef: FR264_RESEARCH_NOTE_REF,
  nextFrontier: FR264_NEXT_FRONTIER,
});

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-264 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

export function assertThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264(
  value: ThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264,
): void {
  const fr262 = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();
  const fr79 = getPoseNormalizedLipsProjectionRuleFR79();
  assertFaceReadingNeutralObservablePrimitivePackFR208();

  if (
    value.schemaVersion !==
      'fr264-three-divisions-successor-coordinate-frame-adjudication-v1' ||
    value.artifactVersion !== '0.1.0' ||
    value.recordId !== FR264_RECORD_ID ||
    value.baselineMainSha !== 'b9cb766917e54fc7180278b417ea78aba3a17266' ||
    value.watchtowerTrack !== 'face-research' ||
    value.authorityState !==
      'research_successor_coordinate_frame_selected_projection_and_anchor_execution_blocked'
  ) fail('identity/baseline drift.');

  if (
    fr262.authorityRef !== FR262_AUTHORITY_REF ||
    fr262.coordinateFrameDecision !==
      'unresolved_successor_frame_no_cross_frame_collapse' ||
    !sameSequence(
      fr262.requirements.map((entry) => entry.traditionalAnchorRef),
      ['hairline', 'brow', 'zhuntou', 'dige'] as const,
    )
  ) fail('FR262 predecessor boundary drift.');

  if (
    value.predecessor.fr262AuthorityRef !== FR262_AUTHORITY_REF ||
    value.predecessor.fr262FrameDecision !==
      'unresolved_successor_frame_no_cross_frame_collapse' ||
    !sameSequence(
      value.predecessor.fourAnchorOrder,
      ['hairline', 'brow', 'zhuntou', 'dige'] as const,
    ) ||
    value.predecessor.historicalNormalizedFramePreserved !== true
  ) fail('predecessor receipt drift.');

  if (
    !sameSequence(
      value.candidates.map((entry) => entry.frame),
      [
        'canonical_image_normalized_2d',
        'canonical_aligned_right_handed_metric_xy',
        'mixed_coordinate_frames',
      ] as const,
    ) ||
    value.candidates[0]?.status !==
      'historical_compatibility_not_selected' ||
    value.candidates[1]?.status !==
      'selected_research_target_execution_blocked' ||
    value.candidates[2]?.status !== 'rejected'
  ) fail('frame candidate assessment drift.');

  if (
    value.decision.selectedTargetFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    value.decision.selectedTargetUnit !== 'centimeter' ||
    value.decision.selectionScope !==
      'research_successor_target_only_no_executable_anchor_derivation' ||
    value.decision.historicalNormalizedFrameRetiredFromSuccessor !== true ||
    value.decision.historicalNormalizedArtifactsPreserved !== true ||
    value.decision.mixedFrameSpanComputationAuthorized !== false ||
    value.decision.imageNormalizedToMetricBridgeIssued !== false ||
    value.decision.metricToImageNormalizedBridgeIssued !== false
  ) fail('coordinate-frame decision drift.');

  if (
    fr79.authorityState !== 'reviewed_neutral_orthographic_projection_rule' ||
    fr79.projectionRuleRef !==
      'fr79:canonical-metric-xy-orthographic@0.1.0' ||
    fr79.sourceCoordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    fr79.targetCoordinateFrame !== 'pose_normalized_face_2d' ||
    fr79.targetCoordinateUnit !== 'centimeter' ||
    fr79.formula !== 'x2d=x3d;y2d=y3d' ||
    fr79.semanticAuthority !== false
  ) fail('FR79 projection witness drift.');

  if (
    value.evidence.fr77SourceFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    value.evidence.fr77GenericReviewed2DProjectionIssued !== false ||
    value.evidence.fr79ProjectionRuleRef !== fr79.projectionRuleRef ||
    value.evidence.fr79ProjectionTargetFrame !== fr79.targetCoordinateFrame ||
    value.evidence.fr79ProjectionFormula !== fr79.formula ||
    value.evidence.fr79ProjectionScope !==
      'reviewed_inside_lips_specific_geometry_contract_not_globalized' ||
    value.evidence.fr208ContractVersion !== FR208_CONTRACT_VERSION ||
    FACE_READING_NEUTRAL_OBSERVABLE_PRIMITIVE_PACK_FR208.contractVersion !==
      FR208_CONTRACT_VERSION ||
    value.evidence.fr208MetricXYObservableFamilyPresent !== true ||
    value.evidence.fr216ContractVersion !== FR216_CONTRACT_VERSION ||
    value.evidence.fr260ReferenceRef !== FR260_REFERENCE_REF ||
    value.evidence.fr260AlreadyUsesSelectedMetricXYFrame !== true
  ) fail('metric-frame evidence drift.');

  if (
    FR209_STATIC_UNAVAILABLE_SLOTS.eyebrow.reason !==
      'neutral_brow_curve_not_authorized'
  ) fail('FR209 brow blocker drift.');

  if (
    !sameSequence(
      value.anchorReadiness.map((entry) => entry.anchor),
      ['hairline', 'brow', 'zhuntou', 'dige'] as const,
    ) ||
    value.anchorReadiness[0]?.state !==
      'blocked_no_metric_frame_hairline_surface_or_registration_authority' ||
    value.anchorReadiness[1]?.state !==
      'blocked_neutral_brow_curve_not_authorized' ||
    value.anchorReadiness[2]?.state !==
      'blocked_exact_neutral_nose_tip_vertical_reference_not_authorized' ||
    value.anchorReadiness[3]?.state !==
      'candidate_metric_xy_reference_exists_traditional_equivalence_blocked'
  ) fail('anchor readiness drift.');

  if (
    value.projectionGap.fullFaceMetricXYProjectionAuthorityExists !== false ||
    value.projectionGap.fr79MayBeSilentlyGeneralized !== false ||
    value.projectionGap.requiredNextAuthority !==
      'full_face_neutral_canonical_metric_xy_projection_rule' ||
    value.projectionGap.requiredRuleScope !==
      'coordinate_projection_only_no_anchor_identity_no_anatomy_no_traditional_semantics'
  ) fail('projection gap drift.');

  if (
    value.authorityBoundary.coordinateFrameSelectionOnly !== true ||
    Object.entries(value.authorityBoundary)
      .filter(([key]) => key !== 'coordinateFrameSelectionOnly')
      .some(([, boundaryValue]) => boundaryValue !== false)
  ) fail('authority widened beyond coordinate-frame selection.');

  if (
    value.researchNoteRef !== FR264_RESEARCH_NOTE_REF ||
    value.nextFrontier !== FR264_NEXT_FRONTIER
  ) fail('research continuation drift.');
}

export function issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264():
ThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264 {
  assertThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264(
    THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264,
  );
  ISSUED.add(THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264);
  return THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264;
}

export function assertIssuedThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264(
  value: ThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264,
): void {
  assertThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264(value);
  if (!ISSUED.has(value)) fail('artifact was not issued by FR264.');
}
