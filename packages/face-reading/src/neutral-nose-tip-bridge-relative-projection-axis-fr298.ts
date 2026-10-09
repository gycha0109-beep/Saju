import {
  FR265_RULE_REF,
  issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
  type CanonicalMetricPoint3DFR265,
} from './full-face-neutral-canonical-metric-xy-projection-rule-fr265.js';
import {
  PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
  assertProviderIndependentNasalApexAuthorityFR266,
  deriveNeutralNasalApexVerticalReferenceFR266,
  type ProviderIndependentNasalApexAnnotationFR266V1,
} from './provider-independent-nasal-apex-reference-fr266.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR295_RGB_RELATIVE_3D_TARGETS,
  assertFR295RgbRelative3DBenchmarkProtocol,
} from './rgb-relative-3d-benchmark-protocol-fr295.js';
import {
  FR296_NOSE_PROJECTION_REFERENCE_READINESS,
  assertFR296NoseProjectionReferenceReadiness,
} from './nose-tip-bridge-projection-reference-readiness-fr296.js';
import {
  FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
  FR297_PROVIDER_INDEPENDENT_NASAL_BRIDGE_ROOT_AUTHORITY,
  assertFR297NasalBridgeRootAuthority,
  deriveFR297NeutralNasalBridgeRootReference,
  type FR297ProviderIndependentNasalBridgeRootAnnotation,
} from './provider-independent-neutral-nasal-bridge-root-reference-fr297.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR298_NOSE_RELATIVE_PROJECTION_AXIS_CONTRACT_VERSION =
  'FR298-NEUTRAL-NOSE-TIP-BRIDGE-RELATIVE-PROJECTION-AXIS-v1' as const;

export const FR298_REFERENCE_AXIS_DEFINITION_REF =
  'neutral.nose.tip_bridge.relative_depth_component_ratio@0.1.0' as const;

export const FR298_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr298-neutral-nose-tip-bridge-relative-projection-axis.md' as const;

export interface FR298ProjectionAxisEvidence {
  readonly evidenceId: string;
  readonly sourceRef: 'PMCID:PMC3819161' | 'PMID:17561054';
  readonly supportsPoseNormalizedZAsFacialDepthAxis: true;
  readonly supportsZDepthAxisForNeutralConstruction: true;
  readonly supportsTraditionalBinding: false;
  readonly note: string;
}

export interface FR298IndependentTipBridgeReferenceInput {
  readonly schemaVersion:
    'fr298-independent-tip-bridge-reference-input-v1';
  readonly tipAnnotation:
    ProviderIndependentNasalApexAnnotationFR266V1;
  readonly bridgeRootAnnotation:
    FR297ProviderIndependentNasalBridgeRootAnnotation;
  readonly binding: {
    readonly tipIndependentReferenceSurfaceVerified: true;
    readonly bridgeRootIndependentReferenceSurfaceVerified: true;
    readonly sameCaptureBindingEstablished: boolean;
    readonly validatedRegistrationBindingEstablished: boolean;
    readonly referenceFrozenBeforeRgbCandidateScoring: true;
    readonly candidateOutputVisibleDuringReferenceConstruction: false;
    readonly traditionalLabelVisibleDuringReferenceConstruction: false;
  };
}

export interface FR298NeutralTipBridgeRelativeProjectionReference {
  readonly schemaVersion:
    'fr298-neutral-tip-bridge-relative-projection-reference-v1';
  readonly artifactVersion: '0.1.0';
  readonly referenceAxisDefinitionRef:
    typeof FR298_REFERENCE_AXIS_DEFINITION_REF;
  readonly watchtowerTrack: 'face-engine';
  readonly authorityState:
    'provider_independent_descriptive_relative_projection_reference_only';
  readonly targetFeatureKey:
    'nose.tip_bridge_relative_projection';
  readonly coordinateFrame:
    'canonical_aligned_right_handed_metric_3d';
  readonly value: number;
  readonly unit: 'ratio';
  readonly components: {
    readonly absoluteDepthComponentCentimeter: number;
    readonly tipBridgeEuclideanDistanceCentimeter: number;
    readonly signDiscarded: true;
  };
  readonly source: {
    readonly subjectId: string;
    readonly tipCaptureId: string;
    readonly bridgeRootCaptureId: string;
    readonly tipAnnotationDefinition:
      'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d';
    readonly bridgeRootAnnotationDefinition:
      'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end';
    readonly tipAuthorityRef:
      typeof PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266.researchNoteRef;
    readonly bridgeRootDefinitionRef:
      typeof FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF;
    readonly sameCaptureBindingEstablished: boolean;
    readonly validatedRegistrationBindingEstablished: boolean;
    readonly independentReferenceSurfacesVerified: true;
    readonly providerBlind: true;
    readonly providerIndexBlind: true;
    readonly traditionalLabelBlind: true;
    readonly frozenBeforeRgbCandidateScoring: true;
  };
  readonly authorityBoundary: {
    readonly referenceAxisDefinitionIssued: true;
    readonly descriptiveBenchmarkReferenceScalarIssued: true;
    readonly anatomicalPositiveZSignIssued: false;
    readonly physicalMillimeterProductOutputIssued: false;
    readonly rgbCandidateIssued: false;
    readonly candidateWinnerIssued: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const EVIDENCE: readonly FR298ProjectionAxisEvidence[] = Object.freeze([
  Object.freeze({
    evidenceId: 'evidence.fr298.pose_normalized_mesh_z_depth',
    sourceRef: 'PMCID:PMC3819161' as const,
    supportsPoseNormalizedZAsFacialDepthAxis: true as const,
    supportsZDepthAxisForNeutralConstruction: true as const,
    supportsTraditionalBinding: false as const,
    note:
      'Pose-normalized 3D face meshes define face width on X, height on Y, and depth on Z; pronasale is found at maximal Z and sellion at a local Z minimum on the same midline.',
  }),
  Object.freeze({
    evidenceId: 'evidence.fr298.korean_3d_soft_tissue_axis_convention',
    sourceRef: 'PMID:17561054' as const,
    supportsPoseNormalizedZAsFacialDepthAxis: true as const,
    supportsZDepthAxisForNeutralConstruction: true as const,
    supportsTraditionalBinding: false as const,
    note:
      '3D facial soft-tissue analysis uses left/right X, superior/inferior Y, and anterior/posterior Z reference axes and reports dimensionless facial distance ratios.',
  }),
]);

export const FR298_NEUTRAL_NOSE_RELATIVE_PROJECTION_AXIS_AUTHORITY =
  Object.freeze({
    schemaVersion:
      'fr298-neutral-nose-tip-bridge-relative-projection-axis-authority-v1' as const,
    contractVersion:
      FR298_NOSE_RELATIVE_PROJECTION_AXIS_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    authorityState:
      'neutral_unsigned_depth_component_axis_and_scale_free_reference_ratio_governed' as const,
    targetFeatureKey:
      'nose.tip_bridge_relative_projection' as const,
    referenceAxisDefinitionRef:
      FR298_REFERENCE_AXIS_DEFINITION_REF,
    evidence: EVIDENCE,
    predecessor: Object.freeze({
      canonicalProjectionRuleRef: FR265_RULE_REF,
      tipAuthorityRef:
        PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266.researchNoteRef,
      bridgeRootDefinitionRef:
        FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
      fr296AxisBlocker:
        'tip_bridge_relative_projection_axis_definition_missing' as const,
    }),
    axis: Object.freeze({
      coordinateFrame:
        'canonical_aligned_right_handed_metric_3d' as const,
      depthCoordinate: 'z' as const,
      signTreatment:
        'unsigned_absolute_tip_minus_bridge_root_depth_component' as const,
      anatomicalPositiveZSignIssued: false as const,
      numerator:
        'abs(tip.z-bridgeRoot.z)' as const,
      denominator:
        'sqrt((tip.x-bridgeRoot.x)^2+(tip.y-bridgeRoot.y)^2+(tip.z-bridgeRoot.z)^2)' as const,
      formula:
        'abs(tip.z-bridgeRoot.z)/euclideanDistance3D(tip,bridgeRoot)' as const,
      outputUnit: 'ratio' as const,
      outputRangeInclusive: Object.freeze([0, 1] as const),
      zeroLengthInputAllowed: false as const,
      engineeringInterpretation:
        'fraction_of_provider_independent_tip_bridge_3d_separation_expressed_on_canonical_depth_axis' as const,
      anthropometricStandardClaimed: false as const,
    }),
    requiredReferenceBoundary: Object.freeze({
      independentReferenceSurfaceForBothPointsRequired: true as const,
      sameSubjectRequired: true as const,
      sameCaptureOrValidatedRegistrationRequired: true as const,
      providerBlindRequired: true as const,
      providerIndexBlindRequired: true as const,
      traditionalLabelBlindRequired: true as const,
      freezeBeforeRgbCandidateScoringRequired: true as const,
    }),
    authorityBoundary: Object.freeze({
      referenceAxisDefinitionIssued: true as const,
      descriptiveBenchmarkReferenceScalarIssued: true as const,
      anatomicalPositiveZSignIssued: false as const,
      anthropometricStandardClaimed: false as const,
      physicalMillimeterProductOutputIssued: false as const,
      rgbCandidateIssued: false as const,
      candidateWinnerIssued: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      classifierIssued: false as const,
      traditionalBindingIssued: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR298_RESEARCH_NOTE_REF,
  });

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-298 ${message}`);
}

function finitePoint(
  point: CanonicalMetricPoint3DFR265,
  label: string,
): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y) ||
    !Number.isFinite(point.z)
  ) {
    fail(`${label} must contain finite x/y/z.`);
  }
}

export function assertFR298NeutralNoseRelativeProjectionAxisAuthority():
void {
  assertFR295RgbRelative3DBenchmarkProtocol();
  assertFR296NoseProjectionReferenceReadiness();
  assertProviderIndependentNasalApexAuthorityFR266(
    PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
  );
  assertFR297NasalBridgeRootAuthority();
  assertFR293ProductColumnMap();

  const projectionRule =
    issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();
  const authority =
    FR298_NEUTRAL_NOSE_RELATIVE_PROJECTION_AXIS_AUTHORITY;

  if (
    !FR295_RGB_RELATIVE_3D_TARGETS.includes(
      authority.targetFeatureKey,
    ) ||
    authority.targetFeatureKey !==
      'nose.tip_bridge_relative_projection'
  ) {
    fail('target must remain the FR295 nose relative-3D gap.');
  }

  if (
    projectionRule.ruleRef !== FR265_RULE_REF ||
    projectionRule.sourceCoordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    projectionRule.depthTreatment !==
      'drop_z_only_after_canonical_inverse_pose_alignment'
  ) {
    fail('FR265 canonical depth-coordinate predecessor drift.');
  }

  if (
    !FR296_NOSE_PROJECTION_REFERENCE_READINESS.referenceAxis.blockers
      .includes('tip_bridge_relative_projection_axis_definition_missing')
  ) {
    fail('FR296 projection-axis blocker drift.');
  }

  if (
    authority.evidence.length !== 2 ||
    authority.evidence.some(
      (entry) =>
        entry.supportsPoseNormalizedZAsFacialDepthAxis !== true ||
        entry.supportsZDepthAxisForNeutralConstruction !== true ||
        entry.supportsTraditionalBinding !== false ||
        entry.note.trim().length === 0,
    )
  ) {
    fail('projection-axis evidence boundary drift.');
  }

  if (
    authority.axis.coordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    authority.axis.depthCoordinate !== 'z' ||
    authority.axis.signTreatment !==
      'unsigned_absolute_tip_minus_bridge_root_depth_component' ||
    authority.axis.anatomicalPositiveZSignIssued !== false ||
    authority.axis.formula !==
      'abs(tip.z-bridgeRoot.z)/euclideanDistance3D(tip,bridgeRoot)' ||
    authority.axis.outputUnit !== 'ratio' ||
    authority.axis.outputRangeInclusive[0] !== 0 ||
    authority.axis.outputRangeInclusive[1] !== 1 ||
    authority.axis.zeroLengthInputAllowed !== false ||
    authority.axis.anthropometricStandardClaimed !== false
  ) {
    fail('reference-axis definition drift.');
  }

  if (
    authority.requiredReferenceBoundary
      .independentReferenceSurfaceForBothPointsRequired !== true ||
    authority.requiredReferenceBoundary.sameSubjectRequired !== true ||
    authority.requiredReferenceBoundary
      .sameCaptureOrValidatedRegistrationRequired !== true ||
    authority.requiredReferenceBoundary.providerBlindRequired !== true ||
    authority.requiredReferenceBoundary.providerIndexBlindRequired !==
      true ||
    authority.requiredReferenceBoundary.traditionalLabelBlindRequired !==
      true ||
    authority.requiredReferenceBoundary
      .freezeBeforeRgbCandidateScoringRequired !== true
  ) {
    fail('reference evidence boundary drift.');
  }

  if (
    authority.authorityBoundary.referenceAxisDefinitionIssued !== true ||
    authority.authorityBoundary
      .descriptiveBenchmarkReferenceScalarIssued !== true ||
    Object.entries(authority.authorityBoundary)
      .filter(
        ([key]) =>
          key !== 'referenceAxisDefinitionIssued' &&
          key !== 'descriptiveBenchmarkReferenceScalarIssued',
      )
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond descriptive benchmark reference.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR298 must not promote an FR293 product column.');
  }
}

export function deriveFR298NeutralTipBridgeRelativeProjectionReference(
  input: FR298IndependentTipBridgeReferenceInput,
): FR298NeutralTipBridgeRelativeProjectionReference {
  assertFR298NeutralNoseRelativeProjectionAxisAuthority();

  if (
    input.schemaVersion !==
      'fr298-independent-tip-bridge-reference-input-v1'
  ) {
    fail('reference input schemaVersion drift.');
  }

  deriveNeutralNasalApexVerticalReferenceFR266(input.tipAnnotation);
  deriveFR297NeutralNasalBridgeRootReference(
    input.bridgeRootAnnotation,
  );

  if (
    input.binding.tipIndependentReferenceSurfaceVerified !== true ||
    input.binding.bridgeRootIndependentReferenceSurfaceVerified !==
      true ||
    input.binding.referenceFrozenBeforeRgbCandidateScoring !== true ||
    input.binding.candidateOutputVisibleDuringReferenceConstruction !==
      false ||
    input.binding.traditionalLabelVisibleDuringReferenceConstruction !==
      false
  ) {
    fail('independent reference binding boundary drift.');
  }

  const tipSubjectId = input.tipAnnotation.subjectId.trim();
  const bridgeSubjectId = input.bridgeRootAnnotation.subjectId.trim();
  if (
    tipSubjectId.length === 0 ||
    bridgeSubjectId.length === 0 ||
    tipSubjectId !== bridgeSubjectId
  ) {
    fail('tip and bridge-root annotations must belong to the same subject.');
  }

  const tipCaptureId = input.tipAnnotation.captureId.trim();
  const bridgeRootCaptureId =
    input.bridgeRootAnnotation.captureId.trim();
  const sameCapture =
    input.binding.sameCaptureBindingEstablished;
  const registered =
    input.binding.validatedRegistrationBindingEstablished;

  if (!sameCapture && !registered) {
    fail('same-capture or validated-registration binding is required.');
  }
  if (sameCapture && tipCaptureId !== bridgeRootCaptureId) {
    fail('same-capture binding requires matching captureId values.');
  }

  const tip = input.tipAnnotation.point;
  const bridgeRoot = input.bridgeRootAnnotation.point;
  finitePoint(tip, 'tip point');
  finitePoint(bridgeRoot, 'bridge-root point');

  const dx = tip.x - bridgeRoot.x;
  const dy = tip.y - bridgeRoot.y;
  const dz = tip.z - bridgeRoot.z;
  const distance = Math.hypot(dx, dy, dz);

  if (!Number.isFinite(distance) || distance <= 0) {
    fail('tip and bridge-root points require non-zero finite 3D separation.');
  }

  const absoluteDepth = Math.abs(dz);
  const value = absoluteDepth / distance;
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    fail('derived relative depth component ratio is outside [0,1].');
  }

  return Object.freeze({
    schemaVersion:
      'fr298-neutral-tip-bridge-relative-projection-reference-v1' as const,
    artifactVersion: '0.1.0' as const,
    referenceAxisDefinitionRef:
      FR298_REFERENCE_AXIS_DEFINITION_REF,
    watchtowerTrack: 'face-engine' as const,
    authorityState:
      'provider_independent_descriptive_relative_projection_reference_only' as const,
    targetFeatureKey:
      'nose.tip_bridge_relative_projection' as const,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_3d' as const,
    value,
    unit: 'ratio' as const,
    components: Object.freeze({
      absoluteDepthComponentCentimeter: absoluteDepth,
      tipBridgeEuclideanDistanceCentimeter: distance,
      signDiscarded: true as const,
    }),
    source: Object.freeze({
      subjectId: tipSubjectId,
      tipCaptureId,
      bridgeRootCaptureId,
      tipAnnotationDefinition:
        input.tipAnnotation.annotationDefinition,
      bridgeRootAnnotationDefinition:
        input.bridgeRootAnnotation.annotationDefinition,
      tipAuthorityRef:
        PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266.researchNoteRef,
      bridgeRootDefinitionRef:
        FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
      sameCaptureBindingEstablished: sameCapture,
      validatedRegistrationBindingEstablished: registered,
      independentReferenceSurfacesVerified: true as const,
      providerBlind: true as const,
      providerIndexBlind: true as const,
      traditionalLabelBlind: true as const,
      frozenBeforeRgbCandidateScoring: true as const,
    }),
    authorityBoundary: Object.freeze({
      referenceAxisDefinitionIssued: true as const,
      descriptiveBenchmarkReferenceScalarIssued: true as const,
      anatomicalPositiveZSignIssued: false as const,
      physicalMillimeterProductOutputIssued: false as const,
      rgbCandidateIssued: false as const,
      candidateWinnerIssued: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      classifierIssued: false as const,
      traditionalBindingIssued: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

assertFR298NeutralNoseRelativeProjectionAxisAuthority();
