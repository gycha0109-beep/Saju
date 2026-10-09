import {
  NEUTRAL_ANCHOR_BINDING_REQUIREMENTS_FR14,
} from './neutral-provider-bindings-fr14.js';
import {
  MEDIAPIPE_RELEASE_TAG_PROVENANCE_FR29,
} from './mediapipe-release-tag-provenance-fr29.js';
import {
  MEDIAPIPE_PUBLISHED_FACE_LANDMARKER_NAMED_TOPOLOGIES_FR37,
  MEDIAPIPE_PUBLISHED_TOPOLOGY_SURFACE_GAP_AUTHORITY_FR37,
} from './mediapipe-published-topology-surface-gap-fr37.js';

export interface NeutralEarSurfaceFeasibilityFR99V1 {
  readonly schemaVersion: 'fr99-neutral-ear-surface-feasibility-v1';
  readonly authorityRef: 'authority.face.neutral_ear_surface_feasibility.fr99';
  readonly authorityVersion: '0.1.0';
  readonly authorityState:
    'negative_direct_named_topology_result_provider_independent_research_required';
  readonly providerPin: {
    readonly packageName: '@mediapipe/tasks-vision';
    readonly packageVersion: '0.10.35';
    readonly releaseTag: 'v0.10.35';
    readonly releaseCommit: string;
    readonly topologySourcePath: string;
    readonly topologySourceBlobSha: string;
  };
  readonly observedNeutralContract: {
    readonly currentConsumerSlots: readonly string[];
    readonly earConsumerSlotPresent: false;
    readonly earCapabilityPresent: false;
  };
  readonly publishedTopologyAudit: {
    readonly namedTopologyRefs: readonly string[];
    readonly earSpecificNamedTopologyPresent: false;
    readonly faceOvalPresent: true;
    readonly contoursPresent: true;
    readonly tessellationPresent: true;
    readonly arbitraryFaceOvalSubgraphMayBeCalledEar: false;
    readonly arbitraryContoursSubgraphMayBeCalledEar: false;
    readonly arbitraryTessellationSubgraphMayBeCalledEar: false;
    readonly namedTopologyAbsenceMeansEarExtractionImpossible: false;
  };
  readonly neutralEarSurfaceCandidateIssued: false;
  readonly providerLandmarkRefsIssued: readonly [];
  readonly requiredNextEvidence: readonly string[];
  readonly viewQualityRequirementsForFutureCandidate: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly traditionalSemanticAuthority: false;
  readonly productionNeutralObservationAuthorized: false;
  readonly productionAuthorization: false;
}

const namedTopologies = new Set<string>(
  MEDIAPIPE_PUBLISHED_FACE_LANDMARKER_NAMED_TOPOLOGIES_FR37,
);

const consumerSlots =
  NEUTRAL_ANCHOR_BINDING_REQUIREMENTS_FR14.map(
    (binding) => binding.consumerSlot,
  );

export const NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99:
  NeutralEarSurfaceFeasibilityFR99V1 = Object.freeze({
    schemaVersion: 'fr99-neutral-ear-surface-feasibility-v1',
    authorityRef: 'authority.face.neutral_ear_surface_feasibility.fr99',
    authorityVersion: '0.1.0',
    authorityState:
      'negative_direct_named_topology_result_provider_independent_research_required',
    providerPin: Object.freeze({
      packageName:
        MEDIAPIPE_RELEASE_TAG_PROVENANCE_FR29.packageIdentity.packageName,
      packageVersion:
        MEDIAPIPE_RELEASE_TAG_PROVENANCE_FR29.packageIdentity.packageVersion,
      releaseTag:
        MEDIAPIPE_RELEASE_TAG_PROVENANCE_FR29.officialRelease.tagName,
      releaseCommit:
        MEDIAPIPE_RELEASE_TAG_PROVENANCE_FR29.officialRelease.tagCommitSha,
      topologySourcePath:
        MEDIAPIPE_RELEASE_TAG_PROVENANCE_FR29.topologyWitness.path,
      topologySourceBlobSha:
        MEDIAPIPE_RELEASE_TAG_PROVENANCE_FR29.topologyWitness.releaseTagBlobSha,
    }),
    observedNeutralContract: Object.freeze({
      currentConsumerSlots: Object.freeze([...consumerSlots]),
      earConsumerSlotPresent: false,
      earCapabilityPresent: false,
    }),
    publishedTopologyAudit: Object.freeze({
      namedTopologyRefs: Object.freeze([
        ...MEDIAPIPE_PUBLISHED_FACE_LANDMARKER_NAMED_TOPOLOGIES_FR37,
      ]),
      earSpecificNamedTopologyPresent: false,
      faceOvalPresent: namedTopologies.has('FACE_LANDMARKS_FACE_OVAL') as true,
      contoursPresent: namedTopologies.has('FACE_LANDMARKS_CONTOURS') as true,
      tessellationPresent: namedTopologies.has('FACE_LANDMARKS_TESSELATION') as true,
      arbitraryFaceOvalSubgraphMayBeCalledEar: false,
      arbitraryContoursSubgraphMayBeCalledEar: false,
      arbitraryTessellationSubgraphMayBeCalledEar: false,
      namedTopologyAbsenceMeansEarExtractionImpossible: false,
    }),
    neutralEarSurfaceCandidateIssued: false,
    providerLandmarkRefsIssued: [] as const,
    requiredNextEvidence: Object.freeze([
      'provider-independent neutral external-ear target definition with explicit anatomical scope and no physiognomy semantics',
      'reviewed extraction or segmentation evidence that identifies the visible external-ear surface without assigning provider landmark roles by convenience',
      'source/provenance evidence for any provider component or landmark set proposed as an ear candidate',
      'visibility and occlusion protocol that handles hair, accessories, crop, and side-of-head truncation',
      'bilateral view/laterality policy for one-ear-visible and two-ear-visible captures',
      'separate controlled-appearance protocol before any ear color/appearance observation can be considered',
      'separate depth or multi-view evidence before attachment/projection/fullness observations can be considered',
    ]),
    viewQualityRequirementsForFutureCandidate: Object.freeze([
      'ear target is inside the image crop',
      'ear target is not materially occluded by hair, hand, clothing, or accessory',
      'pose/view is sufficient for the proposed neutral geometry',
      'left/right evidence preserves laterality provenance',
      'missing or occluded ear evidence fails closed as unavailable',
    ]),
    prohibitedInferences: Object.freeze([
      'FACE_LANDMARKS_FACE_OVAL -> ear',
      'FACE_LANDMARKS_CONTOURS subset -> ear',
      'FACE_LANDMARKS_TESSELATION subset -> ear',
      'provider landmark index -> ear semantic role without reviewed source evidence',
      'neutral ear surface -> 採聽官',
      'neutral ear-region geometry -> 命門',
      '2D ear geometry -> 貼肉/敦厚',
      'uncontrolled pixel appearance -> 色明',
      'missing ear evidence -> negative traditional criterion',
    ]),
    traditionalSemanticAuthority: false,
    productionNeutralObservationAuthorized: false,
    productionAuthorization: false,
  });

export const NEUTRAL_EAR_SURFACE_FEASIBILITY_READINESS_FR99 =
  Object.freeze({
    providerReleasePinned: true as const,
    currentNeutralContractAudited: true as const,
    publishedNamedTopologyAudited: true as const,
    directNamedEarTopologyFound: false as const,
    currentNeutralEarConsumerSlotFound: false as const,
    currentNeutralEarCapabilityFound: false as const,
    arbitraryProviderSubgraphSelectionAuthorized:
      MEDIAPIPE_PUBLISHED_TOPOLOGY_SURFACE_GAP_AUTHORITY_FR37
        .authorityBoundary.arbitraryFaceOvalSubgraphSelectionAllowed,
    neutralEarSurfaceCandidateReady: false as const,
    nextGate:
      'provider_independent_neutral_external_ear_target_and_extraction_evidence' as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });
