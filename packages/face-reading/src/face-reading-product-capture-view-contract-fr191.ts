import {
  CAPTURE_ORIENTATION_AUTHORITY_FR19,
  validateCaptureOrientationAuthorityFR19,
} from './capture-orientation-authority-fr19.js';
import { FR188_CAPTURE_PROTOCOL_REF } from './eye-pair-xi-chang-repeat-capture-dataset-split-protocol-fr188.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR191_RECORD_ID =
  'research.face_reading.product_capture_view_contract.fr191' as const;
export const FR191_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr191-frontal-profile-product-capture-view-contract.md' as const;
export const FR191_CAPTURE_VIEW_CONTRACT_REF =
  'research.face_reading.frontal_profile_product_capture_view_contract.fr191.v1' as const;
export const FR191_VERDICT =
  'FRONTAL_PLUS_PROFILE_PRODUCT_CAPTURE_VIEW_CONTRACT_DEFINED_ORGAN_SPECIFIC_SUFFICIENCY_AND_PRODUCTION_NOT_ADMITTED' as const;
export const FR191_NEXT_FRONTIER =
  'inventory_and_define_governed_face_reading_master_region_coverage_skeleton_before_additional_vertical_slice_expansion' as const;

export const FR191_REQUIRED_VIEW_ROLES = Object.freeze([
  'frontal',
  'profile',
] as const);

export interface FR191AuthorityBoundaryV1 {
  readonly productCaptureViewContractDefined: true;
  readonly frontalViewRoleDefined: true;
  readonly profileViewRoleDefined: true;
  readonly profileViewSideAgnostic: true;
  readonly bilateralProfileRequired: false;
  readonly obliqueViewRequired: false;
  readonly anatomicalLateralityBindingAuthorized: false;
  readonly organSpecificViewSufficiencyIssued: false;
  readonly organSpecificCaptureProtocolIssued: false;
  readonly organSpecificLandmarkAuthorityIssued: false;
  readonly organSpecificMetricAuthorityIssued: false;
  readonly organSpecificConfoundAuthorityIssued: false;
  readonly participantCaptureAuthorized: false;
  readonly evidenceCollectionAuthorized: false;
  readonly traditionalRegionMappingAuthorized: false;
  readonly traditionalSemanticAuthorityPromoted: false;
  readonly thresholdIssued: false;
  readonly calibrationEvidenceIssued: false;
  readonly classifierIssued: false;
  readonly productionActivationAuthorized: false;
}

export interface FaceReadingProductCaptureViewContractFR191V1 {
  readonly schemaVersion: 'fr191-face-reading-product-capture-view-contract-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR191_RECORD_ID;
  readonly authorityState: 'product_capture_view_roles_defined_execution_blocked';
  readonly contractRef: typeof FR191_CAPTURE_VIEW_CONTRACT_REF;
  readonly requiredCaptureCount: 2;
  readonly requiredViewRoles: typeof FR191_REQUIRED_VIEW_ROLES;
  readonly capturesPerRole: {
    readonly frontal: 1;
    readonly profile: 1;
  };
  readonly orientationBoundary: {
    readonly fr19AuthorityVersion: string;
    readonly canonicalPixelOrientationState: 'exif_transform_normalized';
    readonly anatomicalMirrorState: 'unresolved_source_pixels';
    readonly imageXAxisMayDefineAnatomicalSide: false;
    readonly productionLateralityBindingAllowed: false;
  };
  readonly profileRole: {
    readonly sideSemantics: 'side_agnostic_profile';
    readonly anatomicalSideRequired: false;
    readonly anatomicalSideBindingAuthorized: false;
    readonly bilateralCaptureRequired: false;
  };
  readonly downstreamMethodPackBoundary: {
    readonly sharedViewsMayBeConsumedOnlyUnderIndependentMethodPackAuthority: true;
    readonly sharedViewsProveSufficiencyForEveryOrgan: false;
    readonly additionalViewRequirementsMayBeIssuedOnlyBySeparateGovernedAuthority: true;
    readonly eyePairXiChangResearchCaptureProtocolRef: typeof FR188_CAPTURE_PROTOCOL_REF;
    readonly supersedesEyePairXiChangResearchCaptureProtocol: false;
  };
  readonly authorityBoundary: FR191AuthorityBoundaryV1;
  readonly privacyAndExecutionBoundary: {
    readonly participantImageAccepted: false;
    readonly participantCaptureExecuted: false;
    readonly rawImagePersisted: false;
    readonly landmarkSetAccepted: false;
    readonly metricValuesObserved: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly verdict: typeof FR191_VERDICT;
  readonly researchNoteRef: typeof FR191_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR191_NEXT_FRONTIER;
}

const AUTHORITY_BOUNDARY: FR191AuthorityBoundaryV1 = Object.freeze({
  productCaptureViewContractDefined: true,
  frontalViewRoleDefined: true,
  profileViewRoleDefined: true,
  profileViewSideAgnostic: true,
  bilateralProfileRequired: false,
  obliqueViewRequired: false,
  anatomicalLateralityBindingAuthorized: false,
  organSpecificViewSufficiencyIssued: false,
  organSpecificCaptureProtocolIssued: false,
  organSpecificLandmarkAuthorityIssued: false,
  organSpecificMetricAuthorityIssued: false,
  organSpecificConfoundAuthorityIssued: false,
  participantCaptureAuthorized: false,
  evidenceCollectionAuthorized: false,
  traditionalRegionMappingAuthorized: false,
  traditionalSemanticAuthorityPromoted: false,
  thresholdIssued: false,
  calibrationEvidenceIssued: false,
  classifierIssued: false,
  productionActivationAuthorized: false,
});

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-191 ${message}`);
}

function exactStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

export function assertFR191AuthorityBoundary(value: FR191AuthorityBoundaryV1): void {
  if (
    value.productCaptureViewContractDefined !== true
    || value.frontalViewRoleDefined !== true
    || value.profileViewRoleDefined !== true
    || value.profileViewSideAgnostic !== true
    || value.bilateralProfileRequired !== false
    || value.obliqueViewRequired !== false
    || value.anatomicalLateralityBindingAuthorized !== false
    || value.organSpecificViewSufficiencyIssued !== false
    || value.organSpecificCaptureProtocolIssued !== false
    || value.organSpecificLandmarkAuthorityIssued !== false
    || value.organSpecificMetricAuthorityIssued !== false
    || value.organSpecificConfoundAuthorityIssued !== false
    || value.participantCaptureAuthorized !== false
    || value.evidenceCollectionAuthorized !== false
    || value.traditionalRegionMappingAuthorized !== false
    || value.traditionalSemanticAuthorityPromoted !== false
    || value.thresholdIssued !== false
    || value.calibrationEvidenceIssued !== false
    || value.classifierIssued !== false
    || value.productionActivationAuthorized !== false
  ) fail('authority widening detected.');
}

export function assertFaceReadingProductCaptureViewContractFR191(
  value: FaceReadingProductCaptureViewContractFR191V1,
): void {
  validateCaptureOrientationAuthorityFR19();

  if (
    CAPTURE_ORIENTATION_AUTHORITY_FR19.canonicalization.canonicalPixelOrientationState !== 'exif_transform_normalized'
    || CAPTURE_ORIENTATION_AUTHORITY_FR19.anatomicalLaterality.sourcePixelMirrorState !== 'unresolved_source_pixels'
    || CAPTURE_ORIENTATION_AUTHORITY_FR19.anatomicalLaterality.imageXAxisMayDefineAnatomicalSide !== false
    || CAPTURE_ORIENTATION_AUTHORITY_FR19.anatomicalLaterality.productionLateralityBindingAllowed !== false
  ) fail('FR19 orientation/laterality fail-closed boundary drift detected.');

  if (
    value.schemaVersion !== 'fr191-face-reading-product-capture-view-contract-v1'
    || value.artifactVersion !== '0.1.0'
    || value.recordId !== FR191_RECORD_ID
    || value.authorityState !== 'product_capture_view_roles_defined_execution_blocked'
    || value.contractRef !== FR191_CAPTURE_VIEW_CONTRACT_REF
    || value.requiredCaptureCount !== 2
    || !exactStrings(value.requiredViewRoles, FR191_REQUIRED_VIEW_ROLES)
    || value.capturesPerRole.frontal !== 1
    || value.capturesPerRole.profile !== 1
  ) fail('product capture-view role contract drift detected.');

  if (
    value.orientationBoundary.fr19AuthorityVersion !== CAPTURE_ORIENTATION_AUTHORITY_FR19.authorityVersion
    || value.orientationBoundary.canonicalPixelOrientationState !== 'exif_transform_normalized'
    || value.orientationBoundary.anatomicalMirrorState !== 'unresolved_source_pixels'
    || value.orientationBoundary.imageXAxisMayDefineAnatomicalSide !== false
    || value.orientationBoundary.productionLateralityBindingAllowed !== false
  ) fail('orientation/laterality boundary widening detected.');

  if (
    value.profileRole.sideSemantics !== 'side_agnostic_profile'
    || value.profileRole.anatomicalSideRequired !== false
    || value.profileRole.anatomicalSideBindingAuthorized !== false
    || value.profileRole.bilateralCaptureRequired !== false
  ) fail('profile role must remain one side-agnostic view without anatomical laterality authority.');

  if (
    value.downstreamMethodPackBoundary.sharedViewsMayBeConsumedOnlyUnderIndependentMethodPackAuthority !== true
    || value.downstreamMethodPackBoundary.sharedViewsProveSufficiencyForEveryOrgan !== false
    || value.downstreamMethodPackBoundary.additionalViewRequirementsMayBeIssuedOnlyBySeparateGovernedAuthority !== true
    || value.downstreamMethodPackBoundary.eyePairXiChangResearchCaptureProtocolRef !== FR188_CAPTURE_PROTOCOL_REF
    || value.downstreamMethodPackBoundary.supersedesEyePairXiChangResearchCaptureProtocol !== false
  ) fail('organ/method-pack separation or FR188 preservation drift detected.');

  assertFR191AuthorityBoundary(value.authorityBoundary);

  if (
    value.privacyAndExecutionBoundary.participantImageAccepted !== false
    || value.privacyAndExecutionBoundary.participantCaptureExecuted !== false
    || value.privacyAndExecutionBoundary.rawImagePersisted !== false
    || value.privacyAndExecutionBoundary.landmarkSetAccepted !== false
    || value.privacyAndExecutionBoundary.metricValuesObserved !== false
    || value.privacyAndExecutionBoundary.biometricIdentityMatchingPerformed !== false
  ) fail('participant/evidence execution widening detected.');

  if (
    value.verdict !== FR191_VERDICT
    || value.researchNoteRef !== FR191_RESEARCH_NOTE_REF
    || value.nextFrontier !== FR191_NEXT_FRONTIER
  ) fail('verdict or frontier drift detected.');
}

export function issueFaceReadingProductCaptureViewContractFR191(): FaceReadingProductCaptureViewContractFR191V1 {
  const value: FaceReadingProductCaptureViewContractFR191V1 = Object.freeze({
    schemaVersion: 'fr191-face-reading-product-capture-view-contract-v1',
    artifactVersion: '0.1.0',
    recordId: FR191_RECORD_ID,
    authorityState: 'product_capture_view_roles_defined_execution_blocked',
    contractRef: FR191_CAPTURE_VIEW_CONTRACT_REF,
    requiredCaptureCount: 2,
    requiredViewRoles: FR191_REQUIRED_VIEW_ROLES,
    capturesPerRole: Object.freeze({ frontal: 1 as const, profile: 1 as const }),
    orientationBoundary: Object.freeze({
      fr19AuthorityVersion: CAPTURE_ORIENTATION_AUTHORITY_FR19.authorityVersion,
      canonicalPixelOrientationState: 'exif_transform_normalized' as const,
      anatomicalMirrorState: 'unresolved_source_pixels' as const,
      imageXAxisMayDefineAnatomicalSide: false as const,
      productionLateralityBindingAllowed: false as const,
    }),
    profileRole: Object.freeze({
      sideSemantics: 'side_agnostic_profile' as const,
      anatomicalSideRequired: false as const,
      anatomicalSideBindingAuthorized: false as const,
      bilateralCaptureRequired: false as const,
    }),
    downstreamMethodPackBoundary: Object.freeze({
      sharedViewsMayBeConsumedOnlyUnderIndependentMethodPackAuthority: true as const,
      sharedViewsProveSufficiencyForEveryOrgan: false as const,
      additionalViewRequirementsMayBeIssuedOnlyBySeparateGovernedAuthority: true as const,
      eyePairXiChangResearchCaptureProtocolRef: FR188_CAPTURE_PROTOCOL_REF,
      supersedesEyePairXiChangResearchCaptureProtocol: false as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
    privacyAndExecutionBoundary: Object.freeze({
      participantImageAccepted: false as const,
      participantCaptureExecuted: false as const,
      rawImagePersisted: false as const,
      landmarkSetAccepted: false as const,
      metricValuesObserved: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    verdict: FR191_VERDICT,
    researchNoteRef: FR191_RESEARCH_NOTE_REF,
    nextFrontier: FR191_NEXT_FRONTIER,
  });

  assertFaceReadingProductCaptureViewContractFR191(value);
  ISSUED.add(value);
  return value;
}

export function assertIssuedFaceReadingProductCaptureViewContractFR191(
  value: FaceReadingProductCaptureViewContractFR191V1,
): void {
  if (!ISSUED.has(value)) fail('artifact must be actively issued by FR191.');
  assertFaceReadingProductCaptureViewContractFR191(value);
}
