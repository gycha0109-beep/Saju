import { FACE_TRADITIONAL_T6_PACK_CANDIDATE } from './traditional-three-divisions-methodology-pack-t6.js';

export type TraditionalAnchorBindingStatusT7 =
  | 'blocked_observation_missing'
  | 'blocked_semantic_vertical_reference_missing'
  | 'blocked_candidate_not_equivalent';

export type TraditionalAnchorOwnerT7 =
  | 'face-observation-engine'
  | 'face-reading-binding';

export interface TraditionalAnchorBindingHandoffT7 {
  readonly observationRef: string;
  readonly traditionalLabel: string;
  readonly status: TraditionalAnchorBindingStatusT7;
  readonly neutralCandidateRefs: readonly string[];
  readonly currentEvidenceRefs: readonly string[];
  readonly rejectionReason: string;
  readonly requiredNextCapability: string;
  readonly implementationOwner: TraditionalAnchorOwnerT7;
  readonly bindingOwner: 'face-reading-binding';
  readonly traditionalBindingAuthorized: false;
}

export interface TraditionalMethodologyBindingAcceptanceT7 {
  readonly methodologyRef: string;
  readonly requiredObservationRefs: readonly string[];
  readonly topology:
    | 'contiguous_chain'
    | 'noncontiguous_three_spans';
  readonly bindingStatus: 'blocked_until_all_required_anchors_governed';
  readonly sameGeometryAllowsSemanticMerge: false;
  readonly missingAnchorPolicy: 'fail_closed';
}

export const FACE_TRADITIONAL_T7_BASELINE = Object.freeze({
  baselinePackRef: `${FACE_TRADITIONAL_T6_PACK_CANDIDATE.packId}@${FACE_TRADITIONAL_T6_PACK_CANDIDATE.version}`,
  sourceReady: true as const,
  methodologyReady: true as const,
  methodologySideOperationalizationSpecified: true as const,
  observationBindingReady: false as const,
  executableReadingReady: false as const,
  productionReady: false as const,
});

export const FACE_TRADITIONAL_T7_ANCHOR_HANDOFFS = [
  {
    observationRef: 'trad.anchor.hairline',
    traditionalLabel: '髮際',
    status: 'blocked_observation_missing',
    neutralCandidateRefs: [
      'forehead.visible_hairline_boundary',
    ],
    currentEvidenceRefs: [
      'FRB003',
      'FR287 remaining-column inventory',
    ],
    rejectionReason:
      'The product vocabulary names a visible hairline boundary, but no admitted materialized extractor currently supplies the governed vertical reference required by the traditional methodology.',
    requiredNextCapability:
      'Materialize a governed product-neutral visible hairline boundary and expose a reviewable vertical-reference contract without traditional semantics.',
    implementationOwner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    traditionalBindingAuthorized: false,
  },
  {
    observationRef: 'trad.anchor.brow',
    traditionalLabel: '眉',
    status: 'blocked_semantic_vertical_reference_missing',
    neutralCandidateRefs: [
      'FR292 visible eyebrow pair geometry',
      'neutral.eyebrow.visible_pair.mean_span_to_face_width_ratio@0.1.0',
      'neutral.eyebrow.visible_pair.mean_arch_amplitude_to_span_ratio@0.1.0',
      'neutral.eyebrow.visible_pair.mean_lateral_endpoint_tilt_degrees@0.1.0',
    ],
    currentEvidenceRefs: [
      'FRB003',
      'FR292',
    ],
    rejectionReason:
      'FR292 materially improves visible eyebrow geometry but explicitly issues no anatomical brow boundary and no traditional binding. Span, arch, and tail-orientation axes do not define the methodology-required vertical 眉 reference.',
    requiredNextCapability:
      'Govern an observation-side brow vertical reference policy over admitted visible eyebrow geometry, then bind that policy explicitly to each methodology that requires 眉.',
    implementationOwner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    traditionalBindingAuthorized: false,
  },
  {
    observationRef: 'trad.anchor.yintang',
    traditionalLabel: '印堂',
    status: 'blocked_observation_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: [
      'FRB003',
    ],
    rejectionReason:
      'No admitted canonical interbrow/Yintang vertical-reference observation exists.',
    requiredNextCapability:
      'Define a product-neutral governed interbrow reference surface independently of the traditional 印堂 label, with explicit visibility and coordinate-frame semantics.',
    implementationOwner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    traditionalBindingAuthorized: false,
  },
  {
    observationRef: 'trad.anchor.shangen',
    traditionalLabel: '山根',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR287 canonical RGB nose morphology',
      'neutral.nose.bridge.centerline_rms_deviation@0.1.0',
    ],
    currentEvidenceRefs: [
      'FRB003',
      'FR287',
    ],
    rejectionReason:
      'The governed nose bridge morphology describes centerline shape/deviation. It does not identify a source-governed vertical 山根 anchor.',
    requiredNextCapability:
      'Provide a neutral, governed nose-root/bridge vertical reference contract whose semantic extent is independently reviewable before traditional binding.',
    implementationOwner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    traditionalBindingAuthorized: false,
  },
  {
    observationRef: 'trad.anchor.zhuntou',
    traditionalLabel: '準頭',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR287 canonical RGB nose morphology',
      'neutral.nose.tip.contour_circularity@0.1.0',
    ],
    currentEvidenceRefs: [
      'FRB003',
      'FR287',
    ],
    rejectionReason:
      'Visible nose-tip contour circularity is a shape metric and does not define the methodology-required vertical 準頭 reference.',
    requiredNextCapability:
      'Provide a governed neutral visible nose-tip vertical reference with explicit observation authority and no traditional interpretation.',
    implementationOwner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    traditionalBindingAuthorized: false,
  },
  {
    observationRef: 'trad.anchor.renzhong',
    traditionalLabel: '人中',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR291 visible philtrum neutral axes',
      'neutral.mouth.visible_central_groove.axis_length_to_mouth_width_ratio@0.1.0',
      'neutral.mouth.visible_central_groove.corridor_width_to_mouth_width_ratio@0.1.0',
    ],
    currentEvidenceRefs: [
      'FRB003',
      'FR291',
    ],
    rejectionReason:
      'FR291 now materializes governed visible central-groove geometry, but it explicitly avoids named anatomical landmarks and traditional semantics. Length/width axes are not a vertical 人中 anchor.',
    requiredNextCapability:
      'Adjudicate a neutral vertical reference over governed visible central-groove geometry, then create an explicit traditional 人中 binding without relabeling the existing ratios.',
    implementationOwner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    traditionalBindingAuthorized: false,
  },
  {
    observationRef: 'trad.anchor.dige',
    traditionalLabel: '地閣',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR216 canonical visible soft-tissue lower-face contour',
      'FR289 visible lower-face dimensions',
      'neutral.lower_face.visible_height_to_width_ratio@0.1.0',
    ],
    currentEvidenceRefs: [
      'FRB003',
      'FR289',
    ],
    rejectionReason:
      'FR289 exposes visible lower-face dimensions and an inferior visible-envelope center candidate, but explicitly issues neither anatomical chin identity nor traditional 地閣 identity.',
    requiredNextCapability:
      'Adjudicate a governed neutral inferior lower-face vertical reference and separately justify any traditional 地閣 binding.',
    implementationOwner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    traditionalBindingAuthorized: false,
  },
] as const satisfies readonly TraditionalAnchorBindingHandoffT7[];

export const FACE_TRADITIONAL_T7_METHODOLOGY_BINDING_ACCEPTANCE = [
  {
    methodologyRef:
      'method.mayi.face_three_divisions.fr261@0.2.0',
    requiredObservationRefs: [
      'trad.anchor.hairline',
      'trad.anchor.brow',
      'trad.anchor.zhuntou',
      'trad.anchor.dige',
    ],
    topology: 'contiguous_chain',
    bindingStatus:
      'blocked_until_all_required_anchors_governed',
    sameGeometryAllowsSemanticMerge: false,
    missingAnchorPolicy: 'fail_closed',
  },
  {
    methodologyRef:
      'method.mayi.three_fus_three_governors.fr261@0.1.0',
    requiredObservationRefs: [
      'trad.anchor.hairline',
      'trad.anchor.yintang',
      'trad.anchor.shangen',
      'trad.anchor.zhuntou',
      'trad.anchor.renzhong',
      'trad.anchor.dige',
    ],
    topology: 'noncontiguous_three_spans',
    bindingStatus:
      'blocked_until_all_required_anchors_governed',
    sameGeometryAllowsSemanticMerge: false,
    missingAnchorPolicy: 'fail_closed',
  },
  {
    methodologyRef:
      'method.shenyi_fu.gujin_636.face_three_divisions@0.1.0',
    requiredObservationRefs: [
      'trad.anchor.hairline',
      'trad.anchor.yintang',
      'trad.anchor.shangen',
      'trad.anchor.zhuntou',
      'trad.anchor.renzhong',
      'trad.anchor.dige',
    ],
    topology: 'noncontiguous_three_spans',
    bindingStatus:
      'blocked_until_all_required_anchors_governed',
    sameGeometryAllowsSemanticMerge: false,
    missingAnchorPolicy: 'fail_closed',
  },
] as const satisfies readonly TraditionalMethodologyBindingAcceptanceT7[];

export const FACE_TRADITIONAL_T7_READINESS_DELTA = Object.freeze({
  sinceFRB003: [
    'FR289 materialized neutral visible lower-face dimensions, but not 地閣 authority.',
    'FR291 materialized neutral visible central-groove geometry, but not 人中 vertical-anchor authority.',
    'FR292 materialized neutral visible eyebrow-pair geometry, but not 眉 vertical-reference authority.',
    'FR287 materialized neutral nose bridge/tip morphology, but not 山根 or 準頭 vertical-anchor authority.',
  ] as const,
  newlyBoundTraditionalAnchors: [] as const,
  anchorsStillBlocked: FACE_TRADITIONAL_T7_ANCHOR_HANDOFFS.map(
    (handoff) => handoff.observationRef,
  ),
  verdict:
    'observation_capability_improved_but_no_traditional_anchor_binding_admitted' as const,
});

export const FACE_TRADITIONAL_T7_DOWNSTREAM_ACCEPTANCE_GATES =
  Object.freeze({
    observationEngineMustProvide: [
      'governed vertical-reference semantics for every required neutral observation',
      'coordinate-frame identity and visibility/fail-closed behavior',
      'source observation provenance without provider-index leakage',
      'no traditional interpretation inside the neutral observation contract',
    ] as const,
    faceReadingBindingMustProvide: [
      'explicit mapping from neutral observation reference to traditional anchor reference',
      'exact methodologyRef scope for every mapping',
      'binding provenance and review status',
      'separate binding identities even when endpoint geometry matches across lineages',
      'fail-closed behavior when any required anchor is unavailable',
    ] as const,
    prohibited: [
      'MediaPipe/provider index assignment by face-research',
      'shape metric substituted for a vertical anchor',
      'same geometry treated as same traditional concept',
      'legacy research-v0 region map or comparison bands silently inherited',
      'numeric tolerance invented for 平等',
      'universal age map inferred from Three-Divisions geometry',
      'FaceClaim or rule execution before binding review',
      'Production activation from this handoff',
    ] as const,
  });

export const FACE_TRADITIONAL_T7_CLOSEOUT = Object.freeze({
  phase: 'T7_BINDING_HANDOFF' as const,
  traditionalResearchStatus:
    'complete_for_current_three_divisions_slice' as const,
  downstreamBindingStatus: 'blocked' as const,
  sourceResearchReopened: false as const,
  methodologyReconstructionReopened: false as const,
  observationImplementationPerformedHere: false as const,
  faceReadingBindingPerformedHere: false as const,
  executableReadingAuthorized: false as const,
  productionAuthorization: false as const,
  nextOwners: [
    'face-observation-engine',
    'face-reading-binding',
  ] as const,
});
