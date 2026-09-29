import {
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104,
} from './neutral-ear-makehuman-transform-empirical-evidence-fr104.js';

export type NeutralEarProviderRotationCaseIdFR104V1 =
  | 'R0' | 'R90' | 'R180' | 'R270'
  | 'M0' | 'M90' | 'M180' | 'M270';

export type NeutralEarProviderRotationDegreesFR104V1 =
  0 | 90 | 180 | 270;

export type NeutralEarProviderRotationFamilyFR104V1 =
  'non_mirrored' | 'mirrored';

export type NeutralEarProviderLabelRelationFR104V1 =
  | 'provider_same_label_closer'
  | 'provider_cross_label_closer'
  | 'equal_or_unresolved';

export type NeutralEarProviderPointFR104V1 =
  Readonly<{ x: number; y: number }>;

const predecessor =
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104;

function requirePredecessorCase(
  index: number,
  expectedId: NeutralEarProviderRotationCaseIdFR104V1,
) {
  const item = predecessor.cases[index];
  if (item === undefined || item.id !== expectedId) {
    throw new Error(
      `FR104 U3.1 predecessor case ${expectedId} is unavailable.`,
    );
  }
  return item;
}

const r0 = requirePredecessorCase(0, 'R0');
const r90 = requirePredecessorCase(1, 'R90');
const r180 = requirePredecessorCase(2, 'R180');
const r270 = requirePredecessorCase(3, 'R270');
const m0 = requirePredecessorCase(4, 'M0');
const m90 = requirePredecessorCase(5, 'M90');
const m180 = requirePredecessorCase(6, 'M180');
const m270 = requirePredecessorCase(7, 'M270');

if (
  r0.providerEyeCentroids === null
  || m0.providerEyeCentroids === null
) {
  throw new Error(
    'FR104 U3.1 requires admitted R0 and M0 provider baselines.',
  );
}

export function inverseNeutralEarProviderRotationDegreesFR104(
  degrees: NeutralEarProviderRotationDegreesFR104V1,
): NeutralEarProviderRotationDegreesFR104V1 {
  switch (degrees) {
    case 0: return 0;
    case 90: return 270;
    case 180: return 180;
    case 270: return 90;
  }
}

export function rotateNeutralEarProviderPointFR104(
  point: NeutralEarProviderPointFR104V1,
  clockwiseRotationDegrees:
    NeutralEarProviderRotationDegreesFR104V1,
): NeutralEarProviderPointFR104V1 {
  const { x, y } = point;
  if (
    !Number.isFinite(x) || !Number.isFinite(y)
    || x < 0 || x > 1 || y < 0 || y > 1
  ) {
    throw new RangeError(
      'FR104 U3.1 provider point must be finite within [0,1].',
    );
  }
  switch (clockwiseRotationDegrees) {
    case 0:
      return Object.freeze({ x, y });
    case 90:
      return Object.freeze({ x: 1 - y, y: x });
    case 180:
      return Object.freeze({ x: 1 - x, y: 1 - y });
    case 270:
      return Object.freeze({ x: y, y: 1 - x });
  }
}

export function classifyNeutralEarProviderLabelRelationFR104(
  sameLabelCost: number,
  crossLabelCost: number,
): NeutralEarProviderLabelRelationFR104V1 {
  if (
    !Number.isFinite(sameLabelCost)
    || !Number.isFinite(crossLabelCost)
    || sameLabelCost < 0
    || crossLabelCost < 0
  ) {
    throw new RangeError(
      'FR104 U3.1 provider label costs must be finite and non-negative.',
    );
  }
  if (sameLabelCost < crossLabelCost) {
    return 'provider_same_label_closer';
  }
  if (crossLabelCost < sameLabelCost) {
    return 'provider_cross_label_closer';
  }
  return 'equal_or_unresolved';
}

export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-makehuman-provider-rotation-dependence-protocol-v1' as const,
    phase:
      'FR104_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_U3_1' as const,
    authorityState:
      'exact_fixture_provider_rotation_dependence_admitted_no_anatomical_mapping' as const,

    predecessorEvidence:
      'NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104' as const,

    fixture: Object.freeze({
      route:
        '/fr104-makehuman-provider-rotation-dependence/fixture.png' as const,
      pngSha256: predecessor.canonicalFixture.pngSha256,
      canonicalRgbaSha256:
        predecessor.canonicalFixture.canonicalRgbaSha256,
      width: predecessor.canonicalFixture.width,
      height: predecessor.canonicalFixture.height,
      repositoryPersistence: false as const,
    }),

    runtime: predecessor.runtime,

    familyBaselines: Object.freeze({
      non_mirrored: Object.freeze({
        family: 'non_mirrored' as const,
        caseId: 'R0' as const,
        rgbaSha256: r0.transformedRgbaSha256,
        providerLeft: r0.providerEyeCentroids.providerLeft,
        providerRight: r0.providerEyeCentroids.providerRight,
      }),
      mirrored: Object.freeze({
        family: 'mirrored' as const,
        caseId: 'M0' as const,
        rgbaSha256: m0.transformedRgbaSha256,
        providerLeft: m0.providerEyeCentroids.providerLeft,
        providerRight: m0.providerEyeCentroids.providerRight,
      }),
    }),

    cases: Object.freeze([
      Object.freeze({ id:'R0', family:'non_mirrored', horizontalMirror:false, clockwiseRotationDegrees:0, predecessorNativeRgbaSha256: r0.transformedRgbaSha256 }),
      Object.freeze({ id:'R90', family:'non_mirrored', horizontalMirror:false, clockwiseRotationDegrees:90, predecessorNativeRgbaSha256: r90.transformedRgbaSha256 }),
      Object.freeze({ id:'R180', family:'non_mirrored', horizontalMirror:false, clockwiseRotationDegrees:180, predecessorNativeRgbaSha256: r180.transformedRgbaSha256 }),
      Object.freeze({ id:'R270', family:'non_mirrored', horizontalMirror:false, clockwiseRotationDegrees:270, predecessorNativeRgbaSha256: r270.transformedRgbaSha256 }),
      Object.freeze({ id:'M0', family:'mirrored', horizontalMirror:true, clockwiseRotationDegrees:0, predecessorNativeRgbaSha256: m0.transformedRgbaSha256 }),
      Object.freeze({ id:'M90', family:'mirrored', horizontalMirror:true, clockwiseRotationDegrees:90, predecessorNativeRgbaSha256: m90.transformedRgbaSha256 }),
      Object.freeze({ id:'M180', family:'mirrored', horizontalMirror:true, clockwiseRotationDegrees:180, predecessorNativeRgbaSha256: m180.transformedRgbaSha256 }),
      Object.freeze({ id:'M270', family:'mirrored', horizontalMirror:true, clockwiseRotationDegrees:270, predecessorNativeRgbaSha256: m270.transformedRgbaSha256 }),
    ] as const),

    comparison: Object.freeze({
      nativePointMapping:
        'inverse_rotate_provider_centroids_to_same_family_baseline_frame' as const,
      sameLabelCost:
        'd(mapped_provider_left,baseline_provider_left)+d(mapped_provider_right,baseline_provider_right)' as const,
      crossLabelCost:
        'd(mapped_provider_left,baseline_provider_right)+d(mapped_provider_right,baseline_provider_left)' as const,
      unorderedPairCost:
        'min(same_label_cost,cross_label_cost)' as const,
      pairMidpointErrorRecorded: true as const,
      interEyeDistanceAbsoluteDifferenceRecorded: true as const,
      numericAcceptanceThresholdAuthorized: false as const,
    }),

    rotationCanonicalizedControl: Object.freeze({
      operation:
        'inverse_rotate_native_rgba_only_preserve_mirror_family' as const,
      nonMirroredMustRecoverR0Bytes: true as const,
      mirroredMustRecoverM0Bytes: true as const,
      exactFamilyBaselineProviderScalarsRequired: true as const,
      providerSideRotationHintUsed: false as const,
    }),

    scientificStates: Object.freeze([
      'exact_fixture_rotation_dependence_observed',
      'no_rotation_dependence_observed',
      'unresolved',
    ] as const),

    interpretationBoundary: Object.freeze({
      anatomicalGroundTruthUsed: false as const,
      anatomicalSideSemanticsUsed: false as const,
      detectorStageFailureMayBeClaimed: false as const,
      boundedClaim:
        'provider_pipeline_rotation_dependence_on_exact_tested_fixture_only' as const,
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
      providerRotationDependenceInvestigated: true as const,
      providerRotationEquivarianceRefutedForExactFixture:
        true as const,
      providerLabelMappedToAnatomicalSide: false as const,
      globalProviderAnatomicalSemanticsEstablished: false as const,
      anatomicalReferenceAdmitted: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),

    empiricalEvidenceRef:
      'NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_EVIDENCE_FR104' as const,

    admittedOutcome: Object.freeze({
      state: 'exact_fixture_rotation_dependence_observed' as const,
      providerCrossLabelCaseIds: Object.freeze([
        'R180',
      ] as const),
      nativeUnavailableControlRecoveredCaseIds: Object.freeze([
        'R270',
        'M180',
        'M270',
      ] as const),
      anatomicalMappingReviewOutcome: 'hold' as const,
    }),

    nextGate:
      'audit_exact_runtime_provider_side_rotation_compensation_semantics_before_any_anatomical_mapping_review' as const,
  });
