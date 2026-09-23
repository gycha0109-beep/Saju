import {
  MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR34,
  MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_REQUIREMENTS_FR34,
  validateMayiThreeDivisionsNeutralAnchorAuthorityFR34,
  type MayiThreeDivisionsNeutralRequirementStateFR34V1,
} from './mayi-three-divisions-neutral-anchor-requirements-fr34.js';
import {
  THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35,
  validateThreeDivisionsNeutralSurfaceExtensionAuthorityFR35,
} from './three-divisions-neutral-surface-extension-fr35.js';
import {
  FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS,
  FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES,
  FR261_RECORD_ID,
  FR261_VERDICT,
  issueMayiThreeDivisionsSourceContextAdjudicationFR261,
} from './mayi-three-divisions-source-context-adjudication-fr261.js';
import { FR260_REFERENCE_REF } from './visible-lower-face-inferior-vertical-reference-fr260.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR262_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr262-mayi-contiguous-four-anchor-requirements.md' as const;
export const FR262_AUTHORITY_REF =
  'authority.face.mayi_contiguous_three_divisions_neutral_anchor_requirements.fr262' as const;
export const FR262_NEXT_FRONTIER =
  'review_four_anchor_vertical_reference_coordinate_frame_and_derivation_successor_without_fr34_fr35_frame_collapse' as const;

export type MayiContiguousAnchorFR262 =
  (typeof FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS)[number];

export type MayiContiguousSectionFR262 =
  (typeof FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES)[number]['section'];

export type MayiContiguousSuccessorRequirementStateFR262 =
  | 'blocked_no_existing_neutral_surface'
  | 'blocked_existing_derivation_dependency'
  | 'blocked_candidate_reference_frame_and_equivalence_review';

export interface MayiContiguousAnchorRequirementFR262 {
  readonly traditionalAnchorRef: MayiContiguousAnchorFR262;
  readonly sourceSections: readonly MayiContiguousSectionFR262[];
  readonly neutralRequirementRef: string;
  readonly measurementRole: 'vertical_reference_coordinate';
  readonly historicalFR34RequirementState: MayiThreeDivisionsNeutralRequirementStateFR34V1;
  readonly successorRequirementState: MayiContiguousSuccessorRequirementStateFR262;
  readonly existingNeutralAnchorDependencyRefs: readonly string[];
  readonly existingDerivationDependencyRefs: readonly string[];
  readonly candidateNeutralReferenceRefs: readonly string[];
  readonly candidateNeutralReferenceConsumptionAuthorized: false;
  readonly traditionalNeutralEquivalenceState: 'unreviewed_not_authorized';
  readonly providerLandmarkRefs: readonly number[];
  readonly qualityPrerequisites: readonly string[];
  readonly productionBindingAllowed: false;
}

export interface MayiContiguousSpanRequirementFR262 {
  readonly section: MayiContiguousSectionFR262;
  readonly sourceText: string;
  readonly fromTraditionalAnchor: MayiContiguousAnchorFR262;
  readonly toTraditionalAnchor: MayiContiguousAnchorFR262;
  readonly fromNeutralRequirementRef: string;
  readonly toNeutralRequirementRef: string;
}

export interface MayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262 {
  readonly schemaVersion: 'fr262-mayi-contiguous-four-anchor-requirements-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityRef: typeof FR262_AUTHORITY_REF;
  readonly authorityVersion: '0.1.0';
  readonly authorityState:
    'four_anchor_provider_independent_requirements_defined_operationalization_blocked';
  readonly baselineMainSha: 'ab4841818ce6ea15509e341f07d546f2a2d43698';
  readonly watchtowerTrack: 'face-research';
  readonly predecessor: {
    readonly fr261RecordId: typeof FR261_RECORD_ID;
    readonly fr261Verdict: typeof FR261_VERDICT;
    readonly contiguousFormula:
      'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige';
    readonly historicalFR34AuthorityRef:
      'authority.face.mayi_three_divisions_neutral_anchor_requirements.fr34@0.1.0';
    readonly historicalFR34Preserved: true;
    readonly historicalFR34MayBeUsedAsSuccessor: false;
  };
  readonly coordinateFrameDecision:
    'unresolved_successor_frame_no_cross_frame_collapse';
  readonly requirements: readonly MayiContiguousAnchorRequirementFR262[];
  readonly spans: readonly MayiContiguousSpanRequirementFR262[];
  readonly excludedHistoricalAnchors: readonly ['yintang', 'shangen', 'renzhong'];
  readonly surfaceImpact: {
    readonly hairlineSurfaceStillRelevant: true;
    readonly philtrumSurfaceRequired: false;
    readonly historicalChinInferiorSurfaceStillCandidateOnly: true;
  };
  readonly fr260DigeAdjacentCandidate: {
    readonly candidateRef: typeof FR260_REFERENCE_REF;
    readonly relation: 'candidate_neutral_reference_only';
    readonly sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_xy';
    readonly historicalFR35TargetCoordinateFrame: 'canonical_image_normalized_2d';
    readonly exactCoordinateFrameCompatibilityEstablished: false;
    readonly traditionalDigeEquivalenceAuthorized: false;
    readonly successorRequirementConsumptionAuthorized: false;
  };
  readonly authorityBoundary: {
    readonly providerIndependentRequirementsOnly: true;
    readonly mutateFR34Allowed: false;
    readonly mutateFR35Allowed: false;
    readonly providerSpecificLandmarkIndicesAllowed: false;
    readonly directTraditionalToNeutralEquivalenceAllowed: false;
    readonly crossFrameCollapseAllowed: false;
    readonly FR260DigeBindingAllowed: false;
    readonly extractionAlgorithmIssued: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly F1ClaimIssued: false;
    readonly F6ClaimIssued: false;
    readonly fortuneClaimIssued: false;
    readonly productionMetricAllowed: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR262_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR262_NEXT_FRONTIER;
}

const ANCHORS = FR261_MAYI_CONTIGUOUS_REQUIRED_ANCHORS;
const EXCLUDED = Object.freeze(['yintang', 'shangen', 'renzhong'] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-262 ${message}`);
}

function historicalRequirement(anchor: MayiContiguousAnchorFR262) {
  const requirement = MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_REQUIREMENTS_FR34.find(
    (entry) => entry.traditionalAnchorRef === anchor,
  );
  if (requirement === undefined) fail(`missing historical FR34 requirement: ${anchor}`);
  return requirement;
}

function sourceSections(anchor: MayiContiguousAnchorFR262): readonly MayiContiguousSectionFR262[] {
  return Object.freeze(
    FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES
      .filter(
        (clause) =>
          clause.fromTraditionalAnchor === anchor ||
          clause.toTraditionalAnchor === anchor,
      )
      .map((clause) => clause.section),
  );
}

function successorState(
  anchor: MayiContiguousAnchorFR262,
  historicalState: MayiThreeDivisionsNeutralRequirementStateFR34V1,
): MayiContiguousSuccessorRequirementStateFR262 {
  if (anchor === 'dige') {
    return 'blocked_candidate_reference_frame_and_equivalence_review';
  }
  if (
    historicalState === 'blocked_no_existing_neutral_surface' ||
    historicalState === 'blocked_existing_derivation_dependency'
  ) {
    return historicalState;
  }
  fail(`unexpected historical requirement state for retained anchor ${anchor}: ${historicalState}`);
}

function buildRequirement(
  anchor: MayiContiguousAnchorFR262,
): MayiContiguousAnchorRequirementFR262 {
  const historical = historicalRequirement(anchor);
  return Object.freeze({
    traditionalAnchorRef: anchor,
    sourceSections: sourceSections(anchor),
    neutralRequirementRef: historical.neutralRequirementRef,
    measurementRole: 'vertical_reference_coordinate' as const,
    historicalFR34RequirementState: historical.requirementState,
    successorRequirementState: successorState(anchor, historical.requirementState),
    existingNeutralAnchorDependencyRefs: Object.freeze([
      ...historical.existingNeutralAnchorDependencyRefs,
    ]),
    existingDerivationDependencyRefs: Object.freeze([
      ...historical.existingDerivationDependencyRefs,
    ]),
    candidateNeutralReferenceRefs: Object.freeze(
      anchor === 'dige' ? [FR260_REFERENCE_REF] : ([] as string[]),
    ),
    candidateNeutralReferenceConsumptionAuthorized: false as const,
    traditionalNeutralEquivalenceState: 'unreviewed_not_authorized' as const,
    providerLandmarkRefs: Object.freeze([] as number[]),
    qualityPrerequisites: Object.freeze([...historical.qualityPrerequisites]),
    productionBindingAllowed: false as const,
  });
}

export const FR262_MAYI_CONTIGUOUS_ANCHOR_REQUIREMENTS:
readonly MayiContiguousAnchorRequirementFR262[] = Object.freeze(
  ANCHORS.map(buildRequirement),
);

const REQUIREMENT_BY_ANCHOR = new Map(
  FR262_MAYI_CONTIGUOUS_ANCHOR_REQUIREMENTS.map(
    (entry) => [entry.traditionalAnchorRef, entry] as const,
  ),
);

export const FR262_MAYI_CONTIGUOUS_SPAN_REQUIREMENTS:
readonly MayiContiguousSpanRequirementFR262[] = Object.freeze(
  FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES.map((clause) => {
    const from = REQUIREMENT_BY_ANCHOR.get(clause.fromTraditionalAnchor);
    const to = REQUIREMENT_BY_ANCHOR.get(clause.toTraditionalAnchor);
    if (from === undefined || to === undefined) {
      fail(`missing successor requirement for ${clause.section} span`);
    }
    return Object.freeze({
      section: clause.section,
      sourceText: clause.sourceText,
      fromTraditionalAnchor: clause.fromTraditionalAnchor,
      toTraditionalAnchor: clause.toTraditionalAnchor,
      fromNeutralRequirementRef: from.neutralRequirementRef,
      toNeutralRequirementRef: to.neutralRequirementRef,
    });
  }),
);

export const MAYI_CONTIGUOUS_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR262:
MayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262 = Object.freeze({
  schemaVersion: 'fr262-mayi-contiguous-four-anchor-requirements-v1' as const,
  artifactVersion: '0.1.0' as const,
  authorityRef: FR262_AUTHORITY_REF,
  authorityVersion: '0.1.0' as const,
  authorityState:
    'four_anchor_provider_independent_requirements_defined_operationalization_blocked' as const,
  baselineMainSha: 'ab4841818ce6ea15509e341f07d546f2a2d43698' as const,
  watchtowerTrack: 'face-research' as const,
  predecessor: Object.freeze({
    fr261RecordId: FR261_RECORD_ID,
    fr261Verdict: FR261_VERDICT,
    contiguousFormula:
      'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige' as const,
    historicalFR34AuthorityRef:
      'authority.face.mayi_three_divisions_neutral_anchor_requirements.fr34@0.1.0' as const,
    historicalFR34Preserved: true as const,
    historicalFR34MayBeUsedAsSuccessor: false as const,
  }),
  coordinateFrameDecision:
    'unresolved_successor_frame_no_cross_frame_collapse' as const,
  requirements: FR262_MAYI_CONTIGUOUS_ANCHOR_REQUIREMENTS,
  spans: FR262_MAYI_CONTIGUOUS_SPAN_REQUIREMENTS,
  excludedHistoricalAnchors: EXCLUDED,
  surfaceImpact: Object.freeze({
    hairlineSurfaceStillRelevant: true as const,
    philtrumSurfaceRequired: false as const,
    historicalChinInferiorSurfaceStillCandidateOnly: true as const,
  }),
  fr260DigeAdjacentCandidate: Object.freeze({
    candidateRef: FR260_REFERENCE_REF,
    relation: 'candidate_neutral_reference_only' as const,
    sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
    historicalFR35TargetCoordinateFrame: 'canonical_image_normalized_2d' as const,
    exactCoordinateFrameCompatibilityEstablished: false as const,
    traditionalDigeEquivalenceAuthorized: false as const,
    successorRequirementConsumptionAuthorized: false as const,
  }),
  authorityBoundary: Object.freeze({
    providerIndependentRequirementsOnly: true as const,
    mutateFR34Allowed: false as const,
    mutateFR35Allowed: false as const,
    providerSpecificLandmarkIndicesAllowed: false as const,
    directTraditionalToNeutralEquivalenceAllowed: false as const,
    crossFrameCollapseAllowed: false as const,
    FR260DigeBindingAllowed: false as const,
    extractionAlgorithmIssued: false as const,
    thresholdIssued: false as const,
    calibrationIssued: false as const,
    classifierIssued: false as const,
    F1ClaimIssued: false as const,
    F6ClaimIssued: false as const,
    fortuneClaimIssued: false as const,
    productionMetricAllowed: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  researchNoteRef: FR262_RESEARCH_NOTE_REF,
  nextFrontier: FR262_NEXT_FRONTIER,
});

const ISSUED = new WeakSet<object>();

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

export function assertMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262(
  authority: MayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262,
): void {
  const fr261 = issueMayiThreeDivisionsSourceContextAdjudicationFR261();
  validateMayiThreeDivisionsNeutralAnchorAuthorityFR34();
  validateThreeDivisionsNeutralSurfaceExtensionAuthorityFR35();

  if (
    authority.schemaVersion !== 'fr262-mayi-contiguous-four-anchor-requirements-v1' ||
    authority.artifactVersion !== '0.1.0' ||
    authority.authorityRef !== FR262_AUTHORITY_REF ||
    authority.authorityVersion !== '0.1.0' ||
    authority.authorityState !==
      'four_anchor_provider_independent_requirements_defined_operationalization_blocked' ||
    authority.baselineMainSha !== 'ab4841818ce6ea15509e341f07d546f2a2d43698' ||
    authority.watchtowerTrack !== 'face-research'
  ) fail('identity/baseline drift.');

  if (
    fr261.verdict !== FR261_VERDICT ||
    fr261.methodologyDecision.mayiThreeDivisionsResearchFormula !==
      'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige' ||
    fr261.methodologyDecision.sourceVariantWinnerSelectionStillRequiredForMayi !== false ||
    fr261.impactOnExistingResearch.fr34CurrentSevenAnchorUnionMayBeUsedAsMayiSuccessor !== false ||
    fr261.impactOnExistingResearch.yintangRequiredForMayiContiguousFormula !== false ||
    fr261.impactOnExistingResearch.shangenRequiredForMayiContiguousFormula !== false ||
    fr261.impactOnExistingResearch.renzhongRequiredForMayiContiguousFormula !== false
  ) fail('FR261 predecessor boundary drift.');

  if (
    authority.predecessor.fr261RecordId !== FR261_RECORD_ID ||
    authority.predecessor.fr261Verdict !== FR261_VERDICT ||
    authority.predecessor.contiguousFormula !==
      'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige' ||
    authority.predecessor.historicalFR34AuthorityRef !==
      'authority.face.mayi_three_divisions_neutral_anchor_requirements.fr34@0.1.0' ||
    authority.predecessor.historicalFR34Preserved !== true ||
    authority.predecessor.historicalFR34MayBeUsedAsSuccessor !== false
  ) fail('predecessor receipt drift.');

  if (
    MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR34.requirements.length !== 7 ||
    !EXCLUDED.every((anchor) =>
      MAYI_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR34.requirements.some(
        (entry) => entry.traditionalAnchorRef === anchor,
      ),
    )
  ) fail('historical FR34 seven-anchor coverage drift.');

  if (
    authority.coordinateFrameDecision !==
      'unresolved_successor_frame_no_cross_frame_collapse' ||
    !sameSequence(
      authority.requirements.map((entry) => entry.traditionalAnchorRef),
      ANCHORS,
    ) ||
    authority.requirements.length !== 4 ||
    authority.spans.length !== 3 ||
    !sameSequence(authority.excludedHistoricalAnchors, EXCLUDED)
  ) fail('four-anchor successor coverage drift.');

  if (
    authority.requirements.some((entry) =>
      EXCLUDED.includes(entry.traditionalAnchorRef as never),
    )
  ) fail('excluded historical anchor leaked into successor.');

  for (const requirement of authority.requirements) {
    const historical = historicalRequirement(requirement.traditionalAnchorRef);
    const expectedSections = sourceSections(requirement.traditionalAnchorRef);
    if (
      requirement.neutralRequirementRef !== historical.neutralRequirementRef ||
      requirement.measurementRole !== 'vertical_reference_coordinate' ||
      requirement.historicalFR34RequirementState !== historical.requirementState ||
      requirement.successorRequirementState !==
        successorState(requirement.traditionalAnchorRef, historical.requirementState) ||
      !sameSequence(requirement.sourceSections, expectedSections) ||
      !sameSequence(
        requirement.existingNeutralAnchorDependencyRefs,
        historical.existingNeutralAnchorDependencyRefs,
      ) ||
      !sameSequence(
        requirement.existingDerivationDependencyRefs,
        historical.existingDerivationDependencyRefs,
      ) ||
      requirement.candidateNeutralReferenceConsumptionAuthorized !== false ||
      requirement.traditionalNeutralEquivalenceState !== 'unreviewed_not_authorized' ||
      requirement.providerLandmarkRefs.length !== 0 ||
      requirement.productionBindingAllowed !== false ||
      requirement.qualityPrerequisites.length === 0
    ) {
      fail(`requirement drift: ${requirement.traditionalAnchorRef}`);
    }

    if (
      requirement.traditionalAnchorRef === 'dige'
        ? !sameSequence(requirement.candidateNeutralReferenceRefs, [FR260_REFERENCE_REF])
        : requirement.candidateNeutralReferenceRefs.length !== 0
    ) {
      fail(`candidate neutral reference drift: ${requirement.traditionalAnchorRef}`);
    }
  }

  authority.spans.forEach((span, index) => {
    const clause = FR261_MAYI_CONTIGUOUS_THREE_DIVISIONS_CLAUSES[index];
    if (
      clause === undefined ||
      span.section !== clause.section ||
      span.sourceText !== clause.sourceText ||
      span.fromTraditionalAnchor !== clause.fromTraditionalAnchor ||
      span.toTraditionalAnchor !== clause.toTraditionalAnchor ||
      span.fromNeutralRequirementRef !==
        REQUIREMENT_BY_ANCHOR.get(clause.fromTraditionalAnchor)?.neutralRequirementRef ||
      span.toNeutralRequirementRef !==
        REQUIREMENT_BY_ANCHOR.get(clause.toTraditionalAnchor)?.neutralRequirementRef
    ) {
      fail(`span drift at index ${index}`);
    }
  });

  const philtrumSurface = THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35.find(
    (entry) => entry.consumerSlot === 'neutral.face.philtrum_region',
  );
  const hairlineSurface = THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35.find(
    (entry) => entry.consumerSlot === 'neutral.face.hairline_boundary',
  );
  const chinSurface = THREE_DIVISIONS_NEUTRAL_SURFACE_DEFINITIONS_FR35.find(
    (entry) => entry.consumerSlot === 'neutral.face.chin_inferior_contour',
  );
  if (
    philtrumSurface === undefined ||
    hairlineSurface === undefined ||
    chinSurface === undefined ||
    authority.surfaceImpact.hairlineSurfaceStillRelevant !== true ||
    authority.surfaceImpact.philtrumSurfaceRequired !== false ||
    authority.surfaceImpact.historicalChinInferiorSurfaceStillCandidateOnly !== true
  ) fail('FR35 surface-impact boundary drift.');

  if (
    authority.fr260DigeAdjacentCandidate.candidateRef !== FR260_REFERENCE_REF ||
    authority.fr260DigeAdjacentCandidate.relation !==
      'candidate_neutral_reference_only' ||
    authority.fr260DigeAdjacentCandidate.sourceCoordinateFrame !==
      'canonical_aligned_right_handed_metric_xy' ||
    authority.fr260DigeAdjacentCandidate.historicalFR35TargetCoordinateFrame !==
      'canonical_image_normalized_2d' ||
    authority.fr260DigeAdjacentCandidate.exactCoordinateFrameCompatibilityEstablished !== false ||
    authority.fr260DigeAdjacentCandidate.traditionalDigeEquivalenceAuthorized !== false ||
    authority.fr260DigeAdjacentCandidate.successorRequirementConsumptionAuthorized !== false
  ) fail('FR260 candidate boundary drift.');

  if (
    authority.authorityBoundary.providerIndependentRequirementsOnly !== true ||
    Object.entries(authority.authorityBoundary)
      .filter(([key]) => key !== 'providerIndependentRequirementsOnly')
      .some(([, value]) => value !== false)
  ) fail('authority widened beyond provider-independent requirements.');

  if (
    authority.researchNoteRef !== FR262_RESEARCH_NOTE_REF ||
    authority.nextFrontier !== FR262_NEXT_FRONTIER
  ) fail('research continuation boundary drift.');
}

export function issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262():
MayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262 {
  assertMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262(
    MAYI_CONTIGUOUS_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR262,
  );
  ISSUED.add(MAYI_CONTIGUOUS_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR262);
  return MAYI_CONTIGUOUS_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR262;
}

export function assertIssuedMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262(
  authority: MayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262,
): void {
  assertMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262(authority);
  if (!ISSUED.has(authority)) fail('artifact was not issued by FR262.');
}
