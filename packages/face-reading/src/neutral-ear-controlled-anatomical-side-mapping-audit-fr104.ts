import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104,
} from './neutral-ear-makehuman-transform-empirical-evidence-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-makehuman-provider-rotation-compensation-empirical-evidence-fr104.js';
import {
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-prospective-composed-orientation-empirical-evidence-fr104.js';

export type NeutralEarControlledAnatomicalMappingCaseIdFR104V1 =
  | 'R0' | 'R90' | 'R180' | 'R270'
  | 'M0' | 'M90' | 'M180' | 'M270';

export type NeutralEarControlledAnatomicalMappingReflectionParityFR104V1 =
  | 'orientation_preserving'
  | 'orientation_reversing';

export type NeutralEarControlledAnatomicalMappingStateFR104V1 =
  | 'reflection_parity_conditional_mapping_supported'
  | 'reflection_parity_conditional_mapping_refuted'
  | 'reflection_parity_conditional_mapping_unresolved';

export interface NeutralEarControlledAnatomicalMappingObservationFR104V1 {
  readonly id:
    NeutralEarControlledAnatomicalMappingCaseIdFR104V1;
  readonly available: boolean;
  readonly reflectionParity:
    NeutralEarControlledAnatomicalMappingReflectionParityFR104V1;
  readonly directCost: number | null;
  readonly swappedCost: number | null;
}

export interface NeutralEarControlledAnatomicalMappingAssessmentFR104V1 {
  readonly state:
    NeutralEarControlledAnatomicalMappingStateFR104V1;
  readonly evaluatedCaseIds:
    readonly NeutralEarControlledAnatomicalMappingCaseIdFR104V1[];
  readonly unavailableCaseIds:
    readonly NeutralEarControlledAnatomicalMappingCaseIdFR104V1[];
  readonly failedCaseIds:
    readonly NeutralEarControlledAnatomicalMappingCaseIdFR104V1[];
  readonly orientationPreservingDirectForEveryAvailableCase:
    boolean;
  readonly orientationReversingSwappedForEveryAvailableCase:
    boolean;
  readonly allEightCasesAvailable: boolean;
  readonly numericAcceptanceThresholdApplied: false;
  readonly providerPublishedSideNamesUsedAsAnatomicalAuthority:
    false;
  readonly imageSpaceXSignUsedAsAnatomicalAuthority: false;
}

const CASE_IDS = Object.freeze([
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const);

const ORIENTATION_PRESERVING_IDS =
  new Set<NeutralEarControlledAnatomicalMappingCaseIdFR104V1>([
    'R0','R90','R180','R270',
  ]);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 U4A controlled anatomical mapping ${message}`,
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

export function assessNeutralEarControlledAnatomicalMappingFR104(
  observations:
    readonly NeutralEarControlledAnatomicalMappingObservationFR104V1[],
): NeutralEarControlledAnatomicalMappingAssessmentFR104V1 {
  if (observations.length !== CASE_IDS.length) {
    fail('requires exactly eight cases.');
  }

  const byId = new Map<
    NeutralEarControlledAnatomicalMappingCaseIdFR104V1,
    NeutralEarControlledAnatomicalMappingObservationFR104V1
  >();

  for (const item of observations) {
    if (!CASE_IDS.includes(item.id)) {
      fail('contains an unknown case.');
    }
    if (byId.has(item.id)) {
      fail(`contains duplicate case ${item.id}.`);
    }
    const expectedParity =
      ORIENTATION_PRESERVING_IDS.has(item.id)
        ? 'orientation_preserving'
        : 'orientation_reversing';
    if (item.reflectionParity !== expectedParity) {
      fail(`${item.id} reflection parity drift.`);
    }
    byId.set(item.id, item);
  }

  for (const id of CASE_IDS) {
    if (!byId.has(id)) fail(`is missing case ${id}.`);
  }

  const evaluatedCaseIds:
    NeutralEarControlledAnatomicalMappingCaseIdFR104V1[] = [];
  const unavailableCaseIds:
    NeutralEarControlledAnatomicalMappingCaseIdFR104V1[] = [];
  const failedCaseIds:
    NeutralEarControlledAnatomicalMappingCaseIdFR104V1[] = [];

  let preservingPass = true;
  let reversingPass = true;

  for (const id of CASE_IDS) {
    const item = byId.get(id);
    if (item === undefined) fail(`is missing case ${id}.`);

    if (!item.available) {
      if (item.directCost !== null || item.swappedCost !== null) {
        fail(`${id} unavailable case must not carry costs.`);
      }
      unavailableCaseIds.push(id);
      continue;
    }

    const direct = finiteCost(
      item.directCost,
      `${id}.directCost`,
    );
    const swapped = finiteCost(
      item.swappedCost,
      `${id}.swappedCost`,
    );
    evaluatedCaseIds.push(id);

    const preserving =
      item.reflectionParity === 'orientation_preserving';
    const passes = preserving
      ? direct < swapped
      : swapped < direct;

    if (!passes) failedCaseIds.push(id);
    if (preserving && !passes) preservingPass = false;
    if (!preserving && !passes) reversingPass = false;
  }

  const allEightCasesAvailable =
    unavailableCaseIds.length === 0;
  let state:
    NeutralEarControlledAnatomicalMappingStateFR104V1 =
      'reflection_parity_conditional_mapping_unresolved';

  if (failedCaseIds.length > 0) {
    state =
      'reflection_parity_conditional_mapping_refuted';
  } else if (
    allEightCasesAvailable
    && evaluatedCaseIds.length === CASE_IDS.length
  ) {
    state =
      'reflection_parity_conditional_mapping_supported';
  }

  return Object.freeze({
    state,
    evaluatedCaseIds: Object.freeze([...evaluatedCaseIds]),
    unavailableCaseIds: Object.freeze([...unavailableCaseIds]),
    failedCaseIds: Object.freeze([...failedCaseIds]),
    orientationPreservingDirectForEveryAvailableCase:
      preservingPass,
    orientationReversingSwappedForEveryAvailableCase:
      reversingPass,
    allEightCasesAvailable,
    numericAcceptanceThresholdApplied: false,
    providerPublishedSideNamesUsedAsAnatomicalAuthority:
      false,
    imageSpaceXSignUsedAsAnatomicalAuthority: false,
  });
}

const transformEvidence =
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104;
const compensationEvidence =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104;
const prospectiveEvidence =
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_EMPIRICAL_EVIDENCE_FR104;

export const NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-controlled-anatomical-side-mapping-audit-protocol-v1' as const,
    phase:
      'FR104_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_U4A' as const,
    studyKind:
      'retrospective_controlled_anatomical_reference_mapping_audit' as const,
    authorityState:
      'audit_defined_result_not_admitted' as const,

    predecessors: Object.freeze({
      u3_2CompensationResultSha256:
        compensationEvidence.resultSha256,
      u3_3ProspectiveResultSha256:
        prospectiveEvidence.prospectiveResultSha256,
      u3_3ProspectiveComposedNormalizationValidated:
        prospectiveEvidence.interpretation
          .prospectiveComposedNormalizationValidated,
      providerCompensatedOutputFrameProspectivelyValidated:
        prospectiveEvidence.interpretation
          .providerCompensatedOutputFrameProspectivelyValidated,
    }),

    controlledReference: Object.freeze({
      fixturePngSha256:
        transformEvidence.canonicalFixture.pngSha256,
      canonicalRgbaSha256:
        transformEvidence.canonicalFixture.canonicalRgbaSha256,
      width: transformEvidence.canonicalFixture.width,
      height: transformEvidence.canonicalFixture.height,
      independentAnatomicalGroundTruthSource:
        'MakeHuman eye.L____head and eye.R____head projected by the exact render camera' as const,
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
      anatomicalIdentityPreservedAcrossTransforms: true as const,
    }),

    normalization: Object.freeze({
      providerInferenceCompensation:
        'rotationDegrees_equals_inverse_physical_rotation' as const,
      returnedProviderCoordinateNormalization:
        'explicit_inverse_physical_rotation' as const,
      anatomicalGroundTruthCoordinateNormalization:
        'explicit_inverse_physical_rotation' as const,
      mirrorFamilyPreservedDuringRotationNormalization:
        true as const,
      parallelPoseNormalizationStackAuthorized: false as const,
    }),

    mappingHypothesis: Object.freeze({
      orientationPreserving:
        'providerLeft_to_anatomicalLeft_and_providerRight_to_anatomicalRight' as const,
      orientationReversing:
        'providerLeft_to_anatomicalRight_and_providerRight_to_anatomicalLeft' as const,
      directCost:
        'd(providerLeft,anatomicalLeft)+d(providerRight,anatomicalRight)' as const,
      swappedCost:
        'd(providerLeft,anatomicalRight)+d(providerRight,anatomicalLeft)' as const,
      numericAcceptanceThresholdAuthorized: false as const,
      everyAvailableCaseMustSatisfyItsReflectionParityRule:
        true as const,
    }),

    cases: Object.freeze(
      transformEvidence.cases.map((item) =>
        Object.freeze({
          id: item.id,
          family:
            item.horizontalMirror
              ? 'mirrored' as const
              : 'non_mirrored' as const,
          horizontalMirror: item.horizontalMirror,
          physicalClockwiseRotationDegrees:
            item.clockwiseRotationDegrees,
          reflectionParity: item.reflectionParity,
          transformedRgbaSha256:
            item.transformedRgbaSha256,
        }),
      ),
    ),

    interpretationBoundary: Object.freeze({
      exactControlledFixtureRuntimeOnly: true as const,
      providerPublishedSideNamesUsedAsAnatomicalAuthority:
        false as const,
      imageSpaceXSignUsedAsAnatomicalAuthority:
        false as const,
      florencePromptSideUsedAsAnatomicalAuthority:
        false as const,
      sourceSemanticConflictDeclaredResolved:
        false as const,
      globalProviderAnatomicalSemanticsMayBeEstablished:
        false as const,
      prospectiveIndependentAnatomicalValidationStillRequired:
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
      controlledAnatomicalMappingAudited: false as const,
      reflectionParityConditionalMappingSupportedOnExactFixture:
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
      'execute_retrospective_u4a_audit_then_admit_exact_derived_result_without_expanding_to_global_anatomical_semantics' as const,
  });
