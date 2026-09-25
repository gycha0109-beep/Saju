import type {
  CanonicalMetricPoint3DFR265,
} from './full-face-neutral-canonical-metric-xy-projection-rule-fr265.js';
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
import { FaceAuthorityValidationError } from './validation.js';

export const FR297_NASAL_BRIDGE_ROOT_REFERENCE_CONTRACT_VERSION =
  'FR297-PROVIDER-INDEPENDENT-NEUTRAL-NASAL-BRIDGE-ROOT-REFERENCE-v1' as const;

export const FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF =
  'neutral.face.nasal_bridge_root.curvature_reference@0.1.0' as const;

export const FR297_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr297-provider-independent-neutral-nasal-bridge-root-reference.md' as const;

export interface FR297NasalBridgeRootEvidence {
  readonly evidenceId: string;
  readonly sourceRef:
    | 'PMCID:PMC4832301'
    | 'PMCID:PMC8036493'
    | 'PMCID:PMC3819161';
  readonly supportsProviderIndependentSoftTissueBridgeRootReference:
    true;
  readonly supportsSellionNasionEquivalence: false;
  readonly supportsTraditionalBinding: false;
  readonly note: string;
}

export interface FR297ProviderIndependentNasalBridgeRootAnnotation {
  readonly schemaVersion:
    'fr297-provider-independent-nasal-bridge-root-annotation-v1';
  readonly subjectId: string;
  readonly captureId: string;
  readonly annotatorId: string;
  readonly coordinateFrame:
    'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'centimeter';
  readonly point: CanonicalMetricPoint3DFR265;
  readonly annotationDefinition:
    'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end';
  readonly independentReferenceSurfaceVerified: true;
  readonly providerOutputVisibleDuringAnnotation: false;
  readonly providerIndicesVisibleDuringAnnotation: false;
  readonly traditionalLabelVisibleDuringAnnotation: false;
  readonly annotationFrozenBeforeRgbCandidateScoring: true;
}

export interface FR297NeutralNasalBridgeRootReference {
  readonly schemaVersion:
    'fr297-neutral-nasal-bridge-root-reference-v1';
  readonly artifactVersion: '0.1.0';
  readonly referenceDefinitionRef:
    typeof FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF;
  readonly watchtowerTrack: 'face-engine';
  readonly authorityState:
    'provider_independent_neutral_3d_bridge_root_reference_instance';
  readonly coordinateFrame:
    'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'centimeter';
  readonly point: CanonicalMetricPoint3DFR265;
  readonly source: {
    readonly subjectId: string;
    readonly captureId: string;
    readonly annotatorId: string;
    readonly annotationDefinition:
      'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end';
    readonly independentReferenceSurfaceVerified: true;
    readonly providerBlind: true;
    readonly providerIndexBlind: true;
    readonly traditionalLabelBlind: true;
    readonly frozenBeforeRgbCandidateScoring: true;
  };
  readonly authorityBoundary: {
    readonly benchmarkReferenceComponentOnly: true;
    readonly anthropometricSellionIdentityPromotedToProduct: false;
    readonly nasionEquivalenceIssued: false;
    readonly automatedExtractionIssued: false;
    readonly rgbCandidateIssued: false;
    readonly tipBridgeProjectionAxisIssued: false;
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

const EVIDENCE: readonly FR297NasalBridgeRootEvidence[] =
  Object.freeze([
    Object.freeze({
      evidenceId:
        'evidence.fr297.curve_based_sellion_definition',
      sourceRef: 'PMCID:PMC4832301' as const,
      supportsProviderIndependentSoftTissueBridgeRootReference:
        true as const,
      supportsSellionNasionEquivalence: false as const,
      supportsTraditionalBinding: false as const,
      note:
        'Defines sellion by maximal curvature of the mid-line nasal profile curve at the nasal-root end and reports validation against manual identification.',
    }),
    Object.freeze({
      evidenceId:
        'evidence.fr297.frontonasal_soft_tissue_sellion_definition',
      sourceRef: 'PMCID:PMC8036493' as const,
      supportsProviderIndependentSoftTissueBridgeRootReference:
        true as const,
      supportsSellionNasionEquivalence: false as const,
      supportsTraditionalBinding: false as const,
      note:
        'Defines sellion on the frontonasal soft-tissue contour at the midline nasal-root base.',
    }),
    Object.freeze({
      evidenceId:
        'evidence.fr297.mesh_localizable_sellion_distinct_from_nasion',
      sourceRef: 'PMCID:PMC3819161' as const,
      supportsProviderIndependentSoftTissueBridgeRootReference:
        true as const,
      supportsSellionNasionEquivalence: false as const,
      supportsTraditionalBinding: false as const,
      note:
        'Uses sellion as a 3D-mesh-localizable support point while explicitly distinguishing it from nasion in that surface-mesh method.',
    }),
  ]);

export const FR297_PROVIDER_INDEPENDENT_NASAL_BRIDGE_ROOT_AUTHORITY =
  Object.freeze({
    schemaVersion:
      'fr297-provider-independent-neutral-nasal-bridge-root-authority-v1' as const,
    contractVersion:
      FR297_NASAL_BRIDGE_ROOT_REFERENCE_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    authorityState:
      'provider_independent_neutral_3d_bridge_root_definition_governed' as const,
    targetFeatureKey:
      'nose.tip_bridge_relative_projection' as const,
    referenceDefinitionRef:
      FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
    evidence: EVIDENCE,
    protocol: Object.freeze({
      target:
        'provider_independent_soft_tissue_nasal_bridge_root_reference_for_relative_3d_benchmark' as const,
      coordinateFrame:
        'canonical_aligned_right_handed_metric_3d' as const,
      annotationDefinition:
        'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end' as const,
      independentReferenceSurfaceRequired: true as const,
      providerBlindAnnotationRequired: true as const,
      providerIndexBlindAnnotationRequired: true as const,
      traditionalLabelBlindAnnotationRequired: true as const,
      freezeBeforeRgbCandidateScoringRequired: true as const,
    }),
    authorityBoundary: Object.freeze({
      literatureSupportsNeutralSoftTissueBridgeRootDefinition:
        true as const,
      literatureEstablishesSellionNasionEquivalence: false as const,
      literatureEstablishesTraditionalBinding: false as const,
      realAnnotationInstanceIssuedByStaticAuthority: false as const,
      automatedExtractionIssued: false as const,
      tipBridgeProjectionAxisIssued: false as const,
      rgbCandidateIssued: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR297_RESEARCH_NOTE_REF,
  });

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-297 ${message}`);
}

function nonEmpty(value: string, label: string): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    fail(`${label} must be non-empty.`);
  }
  return trimmed;
}

function assertFinitePoint(
  point: CanonicalMetricPoint3DFR265,
): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y) ||
    !Number.isFinite(point.z)
  ) {
    fail('annotation point must contain finite x/y/z.');
  }
}

export function assertFR297NasalBridgeRootAuthority(): void {
  assertFR295RgbRelative3DBenchmarkProtocol();
  assertFR296NoseProjectionReferenceReadiness();
  assertFR293ProductColumnMap();

  const authority =
    FR297_PROVIDER_INDEPENDENT_NASAL_BRIDGE_ROOT_AUTHORITY;

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
    !FR296_NOSE_PROJECTION_REFERENCE_READINESS
      .referenceAxis.blockers.includes(
        'provider_independent_3d_bridge_reference_definition_missing',
      )
  ) {
    fail('FR296 predecessor blocker drift.');
  }

  if (
    authority.evidence.length !== 3 ||
    authority.evidence.some(
      (entry) =>
        entry.supportsProviderIndependentSoftTissueBridgeRootReference !==
          true ||
        entry.supportsSellionNasionEquivalence !== false ||
        entry.supportsTraditionalBinding !== false ||
        entry.note.trim().length === 0,
    )
  ) {
    fail('literature evidence boundary drift.');
  }

  if (
    authority.protocol.coordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    authority.protocol.annotationDefinition !==
      'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end' ||
    authority.protocol.independentReferenceSurfaceRequired !== true ||
    authority.protocol.providerBlindAnnotationRequired !== true ||
    authority.protocol.providerIndexBlindAnnotationRequired !== true ||
    authority.protocol.traditionalLabelBlindAnnotationRequired !== true ||
    authority.protocol.freezeBeforeRgbCandidateScoringRequired !== true
  ) {
    fail('annotation protocol drift.');
  }

  if (
    authority.authorityBoundary
      .literatureSupportsNeutralSoftTissueBridgeRootDefinition !==
      true ||
    Object.entries(authority.authorityBoundary)
      .filter(
        ([key]) =>
          key !==
          'literatureSupportsNeutralSoftTissueBridgeRootDefinition',
      )
      .some(([, value]) => value !== false)
  ) {
    fail('static authority widened beyond neutral reference definition.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR297 must not promote an FR293 product column.');
  }
}

export function deriveFR297NeutralNasalBridgeRootReference(
  annotation: FR297ProviderIndependentNasalBridgeRootAnnotation,
): FR297NeutralNasalBridgeRootReference {
  assertFR297NasalBridgeRootAuthority();

  if (
    annotation.schemaVersion !==
      'fr297-provider-independent-nasal-bridge-root-annotation-v1' ||
    annotation.coordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    annotation.unit !== 'centimeter' ||
    annotation.annotationDefinition !==
      'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end' ||
    annotation.independentReferenceSurfaceVerified !== true ||
    annotation.providerOutputVisibleDuringAnnotation !== false ||
    annotation.providerIndicesVisibleDuringAnnotation !== false ||
    annotation.traditionalLabelVisibleDuringAnnotation !== false ||
    annotation.annotationFrozenBeforeRgbCandidateScoring !== true
  ) {
    fail('annotation authority boundary drift.');
  }

  const subjectId = nonEmpty(annotation.subjectId, 'subjectId');
  const captureId = nonEmpty(annotation.captureId, 'captureId');
  const annotatorId = nonEmpty(annotation.annotatorId, 'annotatorId');
  assertFinitePoint(annotation.point);

  return Object.freeze({
    schemaVersion:
      'fr297-neutral-nasal-bridge-root-reference-v1' as const,
    artifactVersion: '0.1.0' as const,
    referenceDefinitionRef:
      FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
    watchtowerTrack: 'face-engine' as const,
    authorityState:
      'provider_independent_neutral_3d_bridge_root_reference_instance' as const,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_3d' as const,
    unit: 'centimeter' as const,
    point: Object.freeze({
      x: annotation.point.x,
      y: annotation.point.y,
      z: annotation.point.z,
    }),
    source: Object.freeze({
      subjectId,
      captureId,
      annotatorId,
      annotationDefinition:
        annotation.annotationDefinition,
      independentReferenceSurfaceVerified: true as const,
      providerBlind: true as const,
      providerIndexBlind: true as const,
      traditionalLabelBlind: true as const,
      frozenBeforeRgbCandidateScoring: true as const,
    }),
    authorityBoundary: Object.freeze({
      benchmarkReferenceComponentOnly: true as const,
      anthropometricSellionIdentityPromotedToProduct: false as const,
      nasionEquivalenceIssued: false as const,
      automatedExtractionIssued: false as const,
      rgbCandidateIssued: false as const,
      tipBridgeProjectionAxisIssued: false as const,
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

assertFR297NasalBridgeRootAuthority();
