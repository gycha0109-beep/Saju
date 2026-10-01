import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104,
} from './neutral-ear-mirror-independent-fixture-protocol-fr104.js';
import {
  NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-provider-compensated-output-frame-empirical-evidence-fr104.js';
import {
  inverseNeutralEarProviderRotationDegreesFR104,
} from './neutral-ear-makehuman-provider-rotation-dependence-fr104.js';

export type NeutralEarProspectiveComposedRotationCaseIdFR104V1 =
  | 'R90' | 'R180' | 'R270'
  | 'M90' | 'M180' | 'M270';

export type NeutralEarProspectiveComposedNormalizationStateFR104V1 =
  | 'prospective_composed_normalization_supported'
  | 'prospective_composed_normalization_partially_supported'
  | 'prospective_composed_normalization_refuted'
  | 'prospective_composed_normalization_unresolved';

export interface NeutralEarProspectiveComposedRotationObservationFR104V1 {
  readonly id: NeutralEarProspectiveComposedRotationCaseIdFR104V1;
  readonly available: boolean;
  readonly composedUnorderedPairCost: number | null;
  readonly identityUnorderedPairCost: number | null;
  readonly oppositeUnorderedPairCost: number | null;
}

export interface NeutralEarProspectiveComposedAssessmentFR104V1 {
  readonly state: NeutralEarProspectiveComposedNormalizationStateFR104V1;
  readonly evaluatedCaseIds: readonly NeutralEarProspectiveComposedRotationCaseIdFR104V1[];
  readonly unavailableCaseIds: readonly NeutralEarProspectiveComposedRotationCaseIdFR104V1[];
  readonly failedCaseIds: readonly NeutralEarProspectiveComposedRotationCaseIdFR104V1[];
  readonly quarterTurnStrictDominanceSatisfiedForEveryAvailableCase: boolean;
  readonly halfTurnIdentityRejectedForEveryAvailableCase: boolean;
  readonly allSixRotatedCasesAvailable: boolean;
  readonly numericAcceptanceThresholdApplied: false;
  readonly providerLabelsUsedForDecision: false;
  readonly anatomicalInterpretationUsed: false;
}

const ROTATED_CASE_IDS = Object.freeze([
  'R90',
  'R180',
  'R270',
  'M90',
  'M180',
  'M270',
] as const);

const QUARTER_TURN_CASE_IDS =
  new Set<NeutralEarProspectiveComposedRotationCaseIdFR104V1>([
    'R90',
    'R270',
    'M90',
    'M270',
  ]);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 prospective composed normalization ${message}`,
  );
}

function finiteCost(
  value: number | null,
  label: string,
): number {
  if (
    value === null
    || !Number.isFinite(value)
    || value < 0
  ) {
    fail(`${label} must be finite and non-negative when available.`);
  }
  return value;
}

export function assessNeutralEarProspectiveComposedNormalizationFR104(
  input: Readonly<{
    nonMirroredBaselineAvailable: boolean;
    mirroredBaselineAvailable: boolean;
    rotatedCases:
      readonly NeutralEarProspectiveComposedRotationObservationFR104V1[];
  }>,
): NeutralEarProspectiveComposedAssessmentFR104V1 {
  if (input.rotatedCases.length !== ROTATED_CASE_IDS.length) {
    fail('requires exactly six rotated cases.');
  }

  const byId = new Map<
    NeutralEarProspectiveComposedRotationCaseIdFR104V1,
    NeutralEarProspectiveComposedRotationObservationFR104V1
  >();
  for (const item of input.rotatedCases) {
    if (!ROTATED_CASE_IDS.includes(item.id)) {
      fail('contains an unknown rotated case.');
    }
    if (byId.has(item.id)) {
      fail(`contains duplicate case ${item.id}.`);
    }
    byId.set(item.id, item);
  }
  for (const id of ROTATED_CASE_IDS) {
    if (!byId.has(id)) {
      fail(`is missing case ${id}.`);
    }
  }

  const evaluatedCaseIds:
    NeutralEarProspectiveComposedRotationCaseIdFR104V1[] = [];
  const unavailableCaseIds:
    NeutralEarProspectiveComposedRotationCaseIdFR104V1[] = [];
  const failedCaseIds:
    NeutralEarProspectiveComposedRotationCaseIdFR104V1[] = [];
  let quarterPass = true;
  let halfPass = true;

  for (const id of ROTATED_CASE_IDS) {
    const item = byId.get(id);
    if (item === undefined) {
      fail(`is missing case ${id}.`);
    }
    if (!item.available) {
      if (
        item.composedUnorderedPairCost !== null
        || item.identityUnorderedPairCost !== null
        || item.oppositeUnorderedPairCost !== null
      ) {
        fail(`${id} unavailable case must not carry comparison costs.`);
      }
      unavailableCaseIds.push(id);
      continue;
    }

    const composed = finiteCost(
      item.composedUnorderedPairCost,
      `${id}.composedUnorderedPairCost`,
    );
    const identity = finiteCost(
      item.identityUnorderedPairCost,
      `${id}.identityUnorderedPairCost`,
    );
    const opposite = finiteCost(
      item.oppositeUnorderedPairCost,
      `${id}.oppositeUnorderedPairCost`,
    );

    evaluatedCaseIds.push(id);

    const passes = QUARTER_TURN_CASE_IDS.has(id)
      ? composed < identity && composed < opposite
      : composed < identity;

    if (!passes) failedCaseIds.push(id);
    if (QUARTER_TURN_CASE_IDS.has(id) && !passes) quarterPass = false;
    if (!QUARTER_TURN_CASE_IDS.has(id) && !passes) halfPass = false;
  }

  const baselinesAvailable =
    input.nonMirroredBaselineAvailable
    && input.mirroredBaselineAvailable;
  const allSixRotatedCasesAvailable =
    unavailableCaseIds.length === 0;

  let state:
    NeutralEarProspectiveComposedNormalizationStateFR104V1 =
      'prospective_composed_normalization_unresolved';

  if (baselinesAvailable && failedCaseIds.length > 0) {
    state = 'prospective_composed_normalization_refuted';
  } else if (
    baselinesAvailable
    && allSixRotatedCasesAvailable
    && evaluatedCaseIds.length === ROTATED_CASE_IDS.length
  ) {
    state = 'prospective_composed_normalization_supported';
  } else if (
    baselinesAvailable
    && evaluatedCaseIds.length > 0
    && failedCaseIds.length === 0
  ) {
    state =
      'prospective_composed_normalization_partially_supported';
  }

  return Object.freeze({
    state,
    evaluatedCaseIds: Object.freeze([...evaluatedCaseIds]),
    unavailableCaseIds: Object.freeze([...unavailableCaseIds]),
    failedCaseIds: Object.freeze([...failedCaseIds]),
    quarterTurnStrictDominanceSatisfiedForEveryAvailableCase:
      quarterPass,
    halfTurnIdentityRejectedForEveryAvailableCase:
      halfPass,
    allSixRotatedCasesAvailable,
    numericAcceptanceThresholdApplied: false,
    providerLabelsUsedForDecision: false,
    anatomicalInterpretationUsed: false,
  });
}

const independentFixture =
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104.fixture;
const predecessor =
  NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_EMPIRICAL_EVIDENCE_FR104;

export const NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-prospective-composed-orientation-normalization-protocol-v1' as const,
    phase:
      'FR104_PROSPECTIVE_COMPOSED_ORIENTATION_NORMALIZATION_U3_3A' as const,
    studyKind:
      'prospective_preregistered_independent_fixture_validation' as const,
    authorityState:
      'preregistered_no_prospective_result_observed_or_admitted' as const,

    predecessor: Object.freeze({
      phase:
        'FR104_PROVIDER_COMPENSATED_OUTPUT_FRAME_U3_2_1' as const,
      derivedResultSha256:
        predecessor.derivedResultSha256,
      selectedHypothesis:
        predecessor.summary.selectedHypothesis,
      providerCompensatedOutputFrame:
        predecessor.interpretation.providerCompensatedOutputFrame,
      retrospectiveStudyExplicit:
        predecessor.interpretation.studyKind
          === 'retrospective_coordinate_frame_audit',
      prospectiveValidationStillRequired:
        predecessor.interpretation.prospectiveValidationStillRequired,
    }),

    fixture: Object.freeze({
      fixtureRef: independentFixture.fixtureRef,
      sourceRepository: independentFixture.sourceRepository,
      sourceCommit: independentFixture.sourceCommit,
      assetUrl: independentFixture.assetUrl,
      sha256: independentFixture.sha256,
      expectedWidth: independentFixture.expectedWidth,
      expectedHeight: independentFixture.expectedHeight,
      sourceRepositoryDistinctFromMediaPipeFixtureSource:
        independentFixture.sourceRepositoryDistinctFromMediaPipeFixtureSource,
      previouslyUsedForControlledMirrorStudy: true as const,
      novelToEntireFr104: false as const,
      usedInU3_2OrU3_2_1Development: false as const,
      priorMirrorResultMaySelectOrRetuneOrientationRule:
        false as const,
      depictedPersonIdentityUsedForRuntimeDecision:
        false as const,
      repositoryPersistence: false as const,
    }),

    runtime:
      NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104.runtime,

    transformOrder:
      'horizontal_mirror_then_clockwise_physical_rotation' as const,

    frozenComposedRule: Object.freeze({
      providerInferenceCompensation:
        'rotationDegrees_equals_inverse_physical_rotation' as const,
      providerOutputCoordinateFrame:
        'original_input_image_frame' as const,
      outputCoordinateNormalization:
        'explicit_inverse_physical_rotation_of_returned_provider_coordinates' as const,
      ruleMayBeRetunedAfterProspectiveObservation:
        false as const,
      parallelPoseNormalizationStackAuthorized:
        false as const,
    }),

    familyBaselines: Object.freeze({
      non_mirrored: 'R0' as const,
      mirrored: 'M0' as const,
    }),

    cases: Object.freeze([
      Object.freeze({
        id:'R0', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:0,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(0),
      }),
      Object.freeze({
        id:'R90', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:90,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(90),
      }),
      Object.freeze({
        id:'R180', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:180,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(180),
      }),
      Object.freeze({
        id:'R270', family:'non_mirrored',
        horizontalMirror:false,
        physicalClockwiseRotationDegrees:270,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(270),
      }),
      Object.freeze({
        id:'M0', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:0,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(0),
      }),
      Object.freeze({
        id:'M90', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:90,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(90),
      }),
      Object.freeze({
        id:'M180', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:180,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(180),
      }),
      Object.freeze({
        id:'M270', family:'mirrored',
        horizontalMirror:true,
        physicalClockwiseRotationDegrees:270,
        compensationDegrees:
          inverseNeutralEarProviderRotationDegreesFR104(270),
      }),
    ] as const),

    decisionRule: Object.freeze({
      labelIndependentPrimaryMetric:
        'unordered_pair_cost_min_same_cross' as const,
      quarterTurnCaseIds: Object.freeze([
        'R90','R270','M90','M270',
      ] as const),
      quarterTurnRequires:
        'composed_cost_strictly_less_than_identity_and_opposite_controls' as const,
      halfTurnCaseIds: Object.freeze([
        'R180','M180',
      ] as const),
      halfTurnRequires:
        'composed_cost_strictly_less_than_identity_control' as const,
      zeroDegreeControlCaseIds: Object.freeze([
        'R0','M0',
      ] as const),
      numericAcceptanceThresholdAuthorized: false as const,
      providerLabelsUsedForDecision: false as const,
      aggregateCostMayOverridePerCaseFailure: false as const,
    }),

    scientificStates: Object.freeze([
      'prospective_composed_normalization_supported',
      'prospective_composed_normalization_partially_supported',
      'prospective_composed_normalization_refuted',
      'prospective_composed_normalization_unresolved',
    ] as const),

    preregistration: Object.freeze({
      prospectiveResultObservedAtDefinitionTime:
        false as const,
      empiricalResultSha256PinnedAtDefinitionTime:
        null,
      empiricalResultValuesBundledAtDefinitionTime:
        0 as const,
      decisionRuleFrozenBeforeProspectiveExecution:
        true as const,
      fixtureFrozenBeforeProspectiveExecution:
        true as const,
      runtimeFrozenBeforeProspectiveExecution:
        true as const,
    }),

    privacy: Object.freeze({
      userImageConsumed: false as const,
      cameraAccessed: false as const,
      rawProviderLandmarksReturned: false as const,
      rawProviderLandmarksPersisted: false as const,
      transformedRasterPersisted: false as const,
      biometricEmbeddingProduced: false as const,
      identityTemplateProduced: false as const,
    }),

    authority: Object.freeze({
      prospectiveComposedNormalizationValidated:
        false as const,
      providerCompensatedOutputFrameProspectivelyValidated:
        false as const,
      providerLabelMappedToAnatomicalSide: false as const,
      globalProviderAnatomicalSemanticsEstablished:
        false as const,
      anatomicalReferenceAdmitted: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),

    nextGate:
      'execute_frozen_u3_3_rule_once_after_preregistration_merge_then_admit_exact_result_without_retuning' as const,
  });
