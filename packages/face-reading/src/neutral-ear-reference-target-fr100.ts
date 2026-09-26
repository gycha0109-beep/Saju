import {
  NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99,
} from './neutral-ear-surface-feasibility-fr99.js';

export interface NeutralEarReferenceTargetFR100V1 {
  readonly schemaVersion: 'fr100-neutral-ear-reference-target-v1';
  readonly authorityRef: 'authority.face.neutral_ear_reference_target.fr100';
  readonly authorityVersion: '0.1.0';
  readonly authorityState:
    'product_neutral_provider_derived_reference_target_admitted_runtime_observation_blocked';
  readonly predecessorRef: string;
  readonly sourceAsset: {
    readonly assetId: 'google-gnm-head-v3.0-fe31d4e';
    readonly repository: 'google/GNM';
    readonly upstreamCommit: 'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690';
    readonly sourcePath: 'gnm/shape/data/versions/v3_0/gnm_head.npz';
    readonly gitBlobSha: 'ae49903ad7d50ce1d64e464a0407441f2781873c';
    readonly license: 'Apache-2.0';
    readonly productNeutral: true;
  };
  readonly sourceEvidenceRefs: readonly string[];
  readonly providerRegionDefinition: {
    readonly aggregateGroup: 'ears';
    readonly sideGroups: readonly ['left', 'right'];
    readonly leftEarDerivation: 'ears ∩ left';
    readonly rightEarDerivation: 'ears ∩ right';
    readonly bilateralCoveragePolicy:
      'non_empty_non_overlapping_complete_cover_of_provider_ears_group';
  };
  readonly targetSemantics: {
    readonly targetKind:
      'external_ear_reference_surface_for_neutral_geometry_research';
    readonly providerDerived: true;
    readonly providerIndependent: false;
    readonly productInterpretationIncluded: false;
    readonly traditionalSemanticsIncluded: false;
    readonly anatomicalDiagnosticClaim: false;
  };
  readonly runtimeBoundary: {
    readonly mediaPipe468EarSupported: false;
    readonly mediaPipe468EarIndices: readonly [];
    readonly gnmRuntimeRequired: false;
    readonly subjectSpecificRegistrationImplemented: false;
    readonly subjectPhotoEarObservationAvailable: false;
    readonly segmentationOrExtractionImplemented: false;
  };
  readonly nextEvidenceRequired: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly neutralReferenceTargetAuthorized: true;
  readonly neutralRuntimeObservationAuthorized: false;
  readonly traditionalBindingAuthorized: false;
  readonly productionAuthorization: false;
}

export const NEUTRAL_EAR_REFERENCE_TARGET_FR100:
  NeutralEarReferenceTargetFR100V1 = Object.freeze({
    schemaVersion: 'fr100-neutral-ear-reference-target-v1',
    authorityRef: 'authority.face.neutral_ear_reference_target.fr100',
    authorityVersion: '0.1.0',
    authorityState:
      'product_neutral_provider_derived_reference_target_admitted_runtime_observation_blocked',
    predecessorRef:
      `${NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.authorityRef}@${NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.authorityVersion}`,
    sourceAsset: Object.freeze({
      assetId: 'google-gnm-head-v3.0-fe31d4e',
      repository: 'google/GNM',
      upstreamCommit: 'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690',
      sourcePath: 'gnm/shape/data/versions/v3_0/gnm_head.npz',
      gitBlobSha: 'ae49903ad7d50ce1d64e464a0407441f2781873c',
      license: 'Apache-2.0',
      productNeutral: true as const,
    }),
    sourceEvidenceRefs: Object.freeze([
      'packages/face-geometry/assets/full-head/gnm-head-v3.manifest.json',
      'packages/face-geometry/assets/regions/gnm-provider-region-ontology-v1.json',
      'packages/face-geometry/assets/bridge/gnm-to-mediapipe468-region-projection-v1.json',
      'packages/face-geometry/README.md#ear-surface',
    ]),
    providerRegionDefinition: Object.freeze({
      aggregateGroup: 'ears',
      sideGroups: ['left', 'right'] as const,
      leftEarDerivation: 'ears ∩ left',
      rightEarDerivation: 'ears ∩ right',
      bilateralCoveragePolicy:
        'non_empty_non_overlapping_complete_cover_of_provider_ears_group',
    }),
    targetSemantics: Object.freeze({
      targetKind:
        'external_ear_reference_surface_for_neutral_geometry_research',
      providerDerived: true as const,
      providerIndependent: false as const,
      productInterpretationIncluded: false as const,
      traditionalSemanticsIncluded: false as const,
      anatomicalDiagnosticClaim: false as const,
    }),
    runtimeBoundary: Object.freeze({
      mediaPipe468EarSupported: false as const,
      mediaPipe468EarIndices: [] as const,
      gnmRuntimeRequired: false as const,
      subjectSpecificRegistrationImplemented: false as const,
      subjectPhotoEarObservationAvailable: false as const,
      segmentationOrExtractionImplemented: false as const,
    }),
    nextEvidenceRequired: Object.freeze([
      'subject-photo external-ear extraction or segmentation candidate whose output target is explicitly compatible with the neutral GNM-derived external-ear reference concept',
      'exact model/provider/version/license provenance for any proposed runtime ear extractor',
      'left/right laterality provenance and one-ear-visible/two-ear-visible policy',
      'crop, hair, hand, clothing, accessory, and truncation visibility/occlusion quality gates',
      'validation evidence that the runtime output represents visible external ear rather than generic lateral face or head pixels',
      'separate controlled appearance protocol before ear color/appearance evidence is admitted',
      'separate depth or multi-view evidence before attachment/projection/fullness evidence is admitted',
    ]),
    prohibitedInferences: Object.freeze([
      'GNM reference ear -> observed subject ear',
      'GNM vertex index -> MediaPipe vertex index',
      'MediaPipe lateral face -> ear',
      'offline GNM authoring surface -> runtime segmentation',
      'neutral external-ear reference -> 採聽官',
      'neutral ear-region reference -> 命門',
      '2D reference geometry -> 貼肉/敦厚',
      'uncontrolled pixel appearance -> 色明',
      'missing or occluded ear -> negative traditional criterion',
    ]),
    neutralReferenceTargetAuthorized: true as const,
    neutralRuntimeObservationAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const NEUTRAL_EAR_REFERENCE_TARGET_READINESS_FR100 =
  Object.freeze({
    mediaPipeNamedEarTopologyFound:
      NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit
        .earSpecificNamedTopologyPresent,
    gnmProductNeutralEarReferenceFound: true as const,
    gnmBilateralEarReferenceFound: true as const,
    providerIndependentTargetClaimed: false as const,
    subjectPhotoExtractionReady: false as const,
    runtimeEarObservationReady: false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
    nextGate:
      'runtime_subject_photo_external_ear_extraction_or_segmentation_candidate' as const,
  });
