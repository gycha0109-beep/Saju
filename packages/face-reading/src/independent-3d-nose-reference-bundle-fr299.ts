import type {
  FR295IndependentReferenceSourceClass,
} from './rgb-relative-3d-benchmark-protocol-fr295.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  deriveNeutralNasalApexVerticalReferenceFR266,
  type ProviderIndependentNasalApexAnnotationFR266V1,
} from './provider-independent-nasal-apex-reference-fr266.js';
import {
  deriveFR297NeutralNasalBridgeRootReference,
  type FR297ProviderIndependentNasalBridgeRootAnnotation,
} from './provider-independent-neutral-nasal-bridge-root-reference-fr297.js';
import {
  FR298_REFERENCE_AXIS_DEFINITION_REF,
  assertFR298NeutralNoseRelativeProjectionAxisAuthority,
  deriveFR298NeutralTipBridgeRelativeProjectionReference,
} from './neutral-nose-tip-bridge-relative-projection-axis-fr298.js';
import {
  FR272_RESEARCH_NOTE_REF,
} from './independent-3d-nasal-apex-acquisition-preflight-fr272.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION =
  'FR299-INDEPENDENT-3D-NOSE-REFERENCE-BUNDLE-v1' as const;

export const FR299_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr299-independent-3d-nose-reference-bundle.md' as const;

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,511}$/u;

export interface FR299Independent3DSourceProvenance {
  readonly referenceSourceClass:
    FR295IndependentReferenceSourceClass;
  readonly datasetRef: string;
  readonly subjectId: string;
  readonly captureId: string;
  readonly source3DArtifactRef: string;
  readonly source3DArtifactDigest: string;
  readonly metricScaleVerified: true;
  readonly independentFromCandidateProvider: true;
  readonly candidateProviderOutputUsedAsReference: false;
  readonly candidateProviderIndicesUsedAsReference: false;
}

export interface FR299ExternalCanonicalRegistrationReceipt {
  readonly schemaVersion:
    'fr299-external-canonical-registration-receipt-v1';
  readonly source3DArtifactRef: string;
  readonly source3DArtifactDigest: string;
  readonly sourceCoordinateFrameRef: string;
  readonly targetCoordinateFrame:
    'canonical_aligned_right_handed_metric_3d';
  readonly targetUnit: 'centimeter';
  readonly registrationMethodRef: string;
  readonly registrationArtifactDigest: string;
  readonly registrationValidationRef: string;
  readonly registrationValidated: true;
  readonly metricScalePreservedOrCalibrated: true;
  readonly independentFromCandidateProvider: true;
  readonly candidateProviderOutputUsedDuringRegistration: false;
  readonly candidateProviderIndicesUsedDuringRegistration: false;
  readonly traditionalLabelsUsedDuringRegistration: false;
  readonly registrationFrozenBeforeReferenceDerivation: true;
  readonly registrationFrozenBeforeRgbCandidateScoring: true;
}

export interface FR299RgbReferenceCorrespondenceReceipt {
  readonly schemaVersion:
    'fr299-rgb-reference-correspondence-receipt-v1';
  readonly rgbObservationRef: string;
  readonly correspondenceValidationRef: string;
  readonly sameCaptureBindingEstablished: boolean;
  readonly validatedRegistrationBindingEstablished: boolean;
  readonly correspondenceVerified: true;
  readonly candidateOutputVisibleDuringBinding: false;
  readonly traditionalLabelVisibleDuringBinding: false;
  readonly frozenBeforeRgbCandidateScoring: true;
}

export interface FR299FrozenTipAnnotationInput {
  readonly artifactRef: string;
  readonly artifactDigest: string;
  readonly annotation:
    ProviderIndependentNasalApexAnnotationFR266V1;
}

export interface FR299FrozenBridgeRootAnnotationInput {
  readonly artifactRef: string;
  readonly artifactDigest: string;
  readonly annotation:
    FR297ProviderIndependentNasalBridgeRootAnnotation;
}

export interface FR299Independent3DNoseReferenceBundleInput {
  readonly schemaVersion:
    'fr299-independent-3d-nose-reference-bundle-input-v1';
  readonly bundleId: string;
  readonly source: FR299Independent3DSourceProvenance;
  readonly registration:
    FR299ExternalCanonicalRegistrationReceipt;
  readonly rgbBinding:
    FR299RgbReferenceCorrespondenceReceipt;
  readonly tip: FR299FrozenTipAnnotationInput;
  readonly bridgeRoot: FR299FrozenBridgeRootAnnotationInput;
  readonly referenceFrozenBeforeRgbCandidateScoring: true;
}

export interface FR299Independent3DNoseReferenceBundle {
  readonly schemaVersion:
    'fr299-independent-3d-nose-reference-bundle-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion:
    typeof FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION;
  readonly watchtowerTrack: 'face-engine';
  readonly authorityState:
    'independent_3d_nose_reference_bundle_materialized_for_descriptive_benchmark_only';
  readonly bundleId: string;
  readonly targetFeatureKey:
    'nose.tip_bridge_relative_projection';
  readonly source: {
    readonly referenceSourceClass:
      FR295IndependentReferenceSourceClass;
    readonly datasetRef: string;
    readonly subjectId: string;
    readonly captureId: string;
    readonly source3DArtifactRef: string;
    readonly source3DArtifactDigest: string;
    readonly metricScaleVerified: true;
    readonly independentFromCandidateProvider: true;
  };
  readonly registration: {
    readonly sourceCoordinateFrameRef: string;
    readonly targetCoordinateFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly targetUnit: 'centimeter';
    readonly registrationMethodRef: string;
    readonly registrationArtifactDigest: string;
    readonly registrationValidationRef: string;
    readonly externallyValidated: true;
    readonly transformIssuedByFR299: false;
    readonly candidateProviderIndependent: true;
    readonly frozenBeforeReferenceDerivation: true;
    readonly frozenBeforeRgbCandidateScoring: true;
  };
  readonly rgbBinding: {
    readonly rgbObservationRef: string;
    readonly correspondenceValidationRef: string;
    readonly sameCaptureBindingEstablished: boolean;
    readonly validatedRegistrationBindingEstablished: boolean;
    readonly correspondenceVerified: true;
    readonly frozenBeforeRgbCandidateScoring: true;
  };
  readonly frozenAnnotations: {
    readonly tipArtifactRef: string;
    readonly tipArtifactDigest: string;
    readonly bridgeRootArtifactRef: string;
    readonly bridgeRootArtifactDigest: string;
    readonly subjectAndCaptureBoundToSource: true;
    readonly rawAnnotationCoordinatesPersistedInBundle: false;
  };
  readonly reference: {
    readonly referenceAxisDefinitionRef:
      typeof FR298_REFERENCE_AXIS_DEFINITION_REF;
    readonly value: number;
    readonly unit: 'ratio';
    readonly coordinateFrame:
      'canonical_aligned_right_handed_metric_3d';
    readonly referenceFrozenBeforeRgbCandidateScoring: true;
  };
  readonly readiness: {
    readonly realSourceEvidenceRequiredAtRuntime: true;
    readonly externalRegistrationReceiptRequired: true;
    readonly fr295ReferenceComponentReady: true;
    readonly fr295CandidateIssued: false;
    readonly fr295CandidateReferenceAdmissionIssued: false;
  };
  readonly privacyBoundary: {
    readonly raw3DMeshPersistedInBundle: false;
    readonly rawRgbPersistedInBundle: false;
    readonly rawAnnotationCoordinatesPersistedInBundle: false;
    readonly annotationArtifactRefsAndDigestsPersisted: true;
    readonly derivedReferenceScalarPersisted: true;
  };
  readonly authorityBoundary: {
    readonly externalRegistrationTransformIssued: false;
    readonly realSubjectEvidenceIssuedByStaticContract: false;
    readonly rgbCandidateIssued: false;
    readonly benchmarkWinnerIssued: false;
    readonly acceptanceThresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR299_RESEARCH_NOTE_REF;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-299 ${message}`);
}

function nonEmptyRef(value: string, label: string): string {
  const trimmed = value.trim();
  if (!SAFE_REF.test(trimmed)) {
    fail(`${label} must be a bounded opaque reference without whitespace.`);
  }
  return trimmed;
}

function digest(value: string, label: string): string {
  if (!SHA256.test(value)) {
    fail(`${label} must be sha256:<64 lowercase hex>.`);
  }
  return value;
}

function assertSource(
  source: FR299Independent3DSourceProvenance,
): void {
  if (
    source.referenceSourceClass !== 'independent_calibrated_3d' &&
    source.referenceSourceClass !== 'independent_validated_depth'
  ) {
    fail('reference source class is outside the FR295 independent reference lane.');
  }
  nonEmptyRef(source.datasetRef, 'datasetRef');
  nonEmptyRef(source.subjectId, 'subjectId');
  nonEmptyRef(source.captureId, 'captureId');
  nonEmptyRef(source.source3DArtifactRef, 'source3DArtifactRef');
  digest(source.source3DArtifactDigest, 'source3DArtifactDigest');
  if (
    source.metricScaleVerified !== true ||
    source.independentFromCandidateProvider !== true ||
    source.candidateProviderOutputUsedAsReference !== false ||
    source.candidateProviderIndicesUsedAsReference !== false
  ) {
    fail('independent 3D source boundary drift.');
  }
}

function assertRegistration(
  source: FR299Independent3DSourceProvenance,
  registration: FR299ExternalCanonicalRegistrationReceipt,
): void {
  if (
    registration.schemaVersion !==
      'fr299-external-canonical-registration-receipt-v1'
  ) {
    fail('registration receipt schemaVersion drift.');
  }
  if (
    registration.source3DArtifactRef !== source.source3DArtifactRef ||
    registration.source3DArtifactDigest !== source.source3DArtifactDigest
  ) {
    fail('registration receipt must bind the exact independent 3D source artifact.');
  }
  nonEmptyRef(
    registration.sourceCoordinateFrameRef,
    'sourceCoordinateFrameRef',
  );
  nonEmptyRef(registration.registrationMethodRef, 'registrationMethodRef');
  digest(
    registration.registrationArtifactDigest,
    'registrationArtifactDigest',
  );
  nonEmptyRef(
    registration.registrationValidationRef,
    'registrationValidationRef',
  );
  if (
    registration.targetCoordinateFrame !==
      'canonical_aligned_right_handed_metric_3d' ||
    registration.targetUnit !== 'centimeter' ||
    registration.registrationValidated !== true ||
    registration.metricScalePreservedOrCalibrated !== true ||
    registration.independentFromCandidateProvider !== true ||
    registration.candidateProviderOutputUsedDuringRegistration !== false ||
    registration.candidateProviderIndicesUsedDuringRegistration !== false ||
    registration.traditionalLabelsUsedDuringRegistration !== false ||
    registration.registrationFrozenBeforeReferenceDerivation !== true ||
    registration.registrationFrozenBeforeRgbCandidateScoring !== true
  ) {
    fail('external canonical registration boundary drift.');
  }
}

function assertRgbBinding(
  binding: FR299RgbReferenceCorrespondenceReceipt,
): void {
  if (
    binding.schemaVersion !==
      'fr299-rgb-reference-correspondence-receipt-v1'
  ) {
    fail('RGB/reference correspondence receipt schemaVersion drift.');
  }
  nonEmptyRef(binding.rgbObservationRef, 'rgbObservationRef');
  nonEmptyRef(
    binding.correspondenceValidationRef,
    'correspondenceValidationRef',
  );
  if (
    binding.sameCaptureBindingEstablished !== true &&
    binding.validatedRegistrationBindingEstablished !== true
  ) {
    fail('RGB/reference correspondence requires same-capture or validated-registration binding.');
  }
  if (
    binding.correspondenceVerified !== true ||
    binding.candidateOutputVisibleDuringBinding !== false ||
    binding.traditionalLabelVisibleDuringBinding !== false ||
    binding.frozenBeforeRgbCandidateScoring !== true
  ) {
    fail('RGB/reference correspondence boundary drift.');
  }
}

function assertAnnotationArtifact(
  artifactRef: string,
  artifactDigest: string,
  label: string,
): void {
  nonEmptyRef(artifactRef, `${label}.artifactRef`);
  digest(artifactDigest, `${label}.artifactDigest`);
}

export function assertFR299Independent3DNoseReferenceBundleContract():
void {
  assertFR298NeutralNoseRelativeProjectionAxisAuthority();
  assertFR293ProductColumnMap();

  if (
    FR272_RESEARCH_NOTE_REF !==
      'repo:research/face-reading/fr272-independent-3d-nasal-apex-acquisition-preflight.md'
  ) {
    fail('FR272 acquisition/registration predecessor drift.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR299 must preserve 18/29 product materialization.');
  }
}

export function buildFR299Independent3DNoseReferenceBundle(
  input: FR299Independent3DNoseReferenceBundleInput,
): FR299Independent3DNoseReferenceBundle {
  assertFR299Independent3DNoseReferenceBundleContract();

  if (
    input.schemaVersion !==
      'fr299-independent-3d-nose-reference-bundle-input-v1'
  ) {
    fail('bundle input schemaVersion drift.');
  }

  const bundleId = nonEmptyRef(input.bundleId, 'bundleId');
  assertSource(input.source);
  assertRegistration(input.source, input.registration);
  assertRgbBinding(input.rgbBinding);
  assertAnnotationArtifact(
    input.tip.artifactRef,
    input.tip.artifactDigest,
    'tip',
  );
  assertAnnotationArtifact(
    input.bridgeRoot.artifactRef,
    input.bridgeRoot.artifactDigest,
    'bridgeRoot',
  );

  if (input.referenceFrozenBeforeRgbCandidateScoring !== true) {
    fail('reference bundle must be frozen before RGB candidate scoring.');
  }

  const tipReference =
    deriveNeutralNasalApexVerticalReferenceFR266(
      input.tip.annotation,
    );
  const bridgeRootReference =
    deriveFR297NeutralNasalBridgeRootReference(
      input.bridgeRoot.annotation,
    );

  const sourceSubjectId = input.source.subjectId.trim();
  const sourceCaptureId = input.source.captureId.trim();
  if (
    tipReference.source.subjectId !== sourceSubjectId ||
    bridgeRootReference.source.subjectId !== sourceSubjectId
  ) {
    fail('both frozen annotations must bind the exact source subject.');
  }
  if (
    tipReference.source.captureId !== sourceCaptureId ||
    bridgeRootReference.source.captureId !== sourceCaptureId
  ) {
    fail('both frozen annotations must bind the exact independent 3D source capture.');
  }

  const reference =
    deriveFR298NeutralTipBridgeRelativeProjectionReference({
      schemaVersion:
        'fr298-independent-tip-bridge-reference-input-v1',
      tipAnnotation: input.tip.annotation,
      bridgeRootAnnotation: input.bridgeRoot.annotation,
      binding: {
        tipIndependentReferenceSurfaceVerified: true,
        bridgeRootIndependentReferenceSurfaceVerified: true,
        sameCaptureBindingEstablished: true,
        validatedRegistrationBindingEstablished: false,
        referenceFrozenBeforeRgbCandidateScoring: true,
        candidateOutputVisibleDuringReferenceConstruction: false,
        traditionalLabelVisibleDuringReferenceConstruction: false,
      },
    });

  return Object.freeze({
    schemaVersion:
      'fr299-independent-3d-nose-reference-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    authorityState:
      'independent_3d_nose_reference_bundle_materialized_for_descriptive_benchmark_only' as const,
    bundleId,
    targetFeatureKey:
      'nose.tip_bridge_relative_projection' as const,
    source: Object.freeze({
      referenceSourceClass: input.source.referenceSourceClass,
      datasetRef: input.source.datasetRef.trim(),
      subjectId: sourceSubjectId,
      captureId: sourceCaptureId,
      source3DArtifactRef: input.source.source3DArtifactRef.trim(),
      source3DArtifactDigest: input.source.source3DArtifactDigest,
      metricScaleVerified: true as const,
      independentFromCandidateProvider: true as const,
    }),
    registration: Object.freeze({
      sourceCoordinateFrameRef:
        input.registration.sourceCoordinateFrameRef.trim(),
      targetCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d' as const,
      targetUnit: 'centimeter' as const,
      registrationMethodRef:
        input.registration.registrationMethodRef.trim(),
      registrationArtifactDigest:
        input.registration.registrationArtifactDigest,
      registrationValidationRef:
        input.registration.registrationValidationRef.trim(),
      externallyValidated: true as const,
      transformIssuedByFR299: false as const,
      candidateProviderIndependent: true as const,
      frozenBeforeReferenceDerivation: true as const,
      frozenBeforeRgbCandidateScoring: true as const,
    }),
    rgbBinding: Object.freeze({
      rgbObservationRef: input.rgbBinding.rgbObservationRef.trim(),
      correspondenceValidationRef:
        input.rgbBinding.correspondenceValidationRef.trim(),
      sameCaptureBindingEstablished:
        input.rgbBinding.sameCaptureBindingEstablished,
      validatedRegistrationBindingEstablished:
        input.rgbBinding.validatedRegistrationBindingEstablished,
      correspondenceVerified: true as const,
      frozenBeforeRgbCandidateScoring: true as const,
    }),
    frozenAnnotations: Object.freeze({
      tipArtifactRef: input.tip.artifactRef.trim(),
      tipArtifactDigest: input.tip.artifactDigest,
      bridgeRootArtifactRef: input.bridgeRoot.artifactRef.trim(),
      bridgeRootArtifactDigest: input.bridgeRoot.artifactDigest,
      subjectAndCaptureBoundToSource: true as const,
      rawAnnotationCoordinatesPersistedInBundle: false as const,
    }),
    reference: Object.freeze({
      referenceAxisDefinitionRef:
        FR298_REFERENCE_AXIS_DEFINITION_REF,
      value: reference.value,
      unit: 'ratio' as const,
      coordinateFrame:
        'canonical_aligned_right_handed_metric_3d' as const,
      referenceFrozenBeforeRgbCandidateScoring: true as const,
    }),
    readiness: Object.freeze({
      realSourceEvidenceRequiredAtRuntime: true as const,
      externalRegistrationReceiptRequired: true as const,
      fr295ReferenceComponentReady: true as const,
      fr295CandidateIssued: false as const,
      fr295CandidateReferenceAdmissionIssued: false as const,
    }),
    privacyBoundary: Object.freeze({
      raw3DMeshPersistedInBundle: false as const,
      rawRgbPersistedInBundle: false as const,
      rawAnnotationCoordinatesPersistedInBundle: false as const,
      annotationArtifactRefsAndDigestsPersisted: true as const,
      derivedReferenceScalarPersisted: true as const,
    }),
    authorityBoundary: Object.freeze({
      externalRegistrationTransformIssued: false as const,
      realSubjectEvidenceIssuedByStaticContract: false as const,
      rgbCandidateIssued: false as const,
      benchmarkWinnerIssued: false as const,
      acceptanceThresholdIssued: false as const,
      calibrationIssued: false as const,
      classifierIssued: false as const,
      traditionalBindingIssued: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR299_RESEARCH_NOTE_REF,
  });
}

assertFR299Independent3DNoseReferenceBundleContract();
