export type FaceTopicFamily =
  | 'DISCOVER'
  | 'SELF_READING'
  | 'LOVE'
  | 'CAREER_MONEY'
  | 'RELATIONSHIP'
  | 'FULL_REPORT'
  | 'HISTORY_REPEAT';

export type FaceTopicReadingMode =
  | 'neutral_observation'
  | 'traditional_reading';

export type FaceTopicReadinessState =
  | 'available'
  | 'partial'
  | 'blocked';

export interface FaceTopicBindingRequirement {
  bindingGroupRef: string;
  minimumAdmittedBindings: number;
  requireReady: boolean;
}

export interface FaceTopicRequirementManifest {
  requiredObservationCapabilities: readonly string[];
  optionalObservationCapabilities: readonly string[];
  requiredMethodologyRefs: readonly string[];
  optionalMethodologyRefs: readonly string[];
  requiredSemanticClaimFamilies: readonly string[];
  optionalSemanticClaimFamilies: readonly string[];
  requiredBindingGroups: readonly FaceTopicBindingRequirement[];
  requestedInferenceKeys: readonly string[];
  prohibitedInferenceKeys: readonly string[];
  partialAllowed: boolean;
}

export interface FaceTopicDefinition {
  topicKey: string;
  version: string;
  family: FaceTopicFamily;
  userQuestion: string;
  readingMode: FaceTopicReadingMode;
  inputKinds: readonly ['rgb_selfie'];
  subjectPolicy: 'single_face_only';
  requirements: FaceTopicRequirementManifest;
  unavailableBehavior: 'fail_closed';
  shareability: 'none' | 'result_only';
  repeatability: 'none' | 'new_capture';
  commerceEligibility: 'eligible' | 'not_eligible';
  renderingProfileRef: string;
  provenanceVisibility: 'summary' | 'detailed';
  publicationState: 'internal' | 'coming_soon' | 'published';
}

export interface FaceTopicDefinitionRef {
  id: string;
  version: string;
  contentHash: string;
}

export interface FaceBindingCoverage {
  bindingGroupRef: string;
  requiredBindingCount: number;
  admittedBindingCount: number;
  bindingReady: boolean;
  provenanceRefs: readonly string[];
}

export interface FaceAuthorityCoverageSnapshot {
  snapshotId: string;
  observationAuthorityRef: string;
  bridgeAuthorityRef: string;
  traditionalAuthorityRef: string;
  availableObservationCapabilities: readonly string[];
  availableMethodologyRefs: readonly string[];
  availableSemanticClaimFamilies: readonly string[];
  bindingGroups: readonly FaceBindingCoverage[];
  prohibitedInferenceKeys: readonly string[];
  provenanceRefs: readonly string[];
}

export type FaceTopicReadinessBlockerCode =
  | 'TOPIC_NOT_REGISTERED'
  | 'REQUIRED_OBSERVATION_CAPABILITY_MISSING'
  | 'REQUIRED_METHODOLOGY_MISSING'
  | 'REQUIRED_SEMANTIC_CLAIM_FAMILY_MISSING'
  | 'REQUIRED_BINDING_GROUP_MISSING'
  | 'REQUIRED_BINDING_GROUP_NOT_READY'
  | 'PROHIBITED_INFERENCE_REQUESTED';

export interface FaceTopicReadinessBlocker {
  code: FaceTopicReadinessBlockerCode;
  ref: string;
  detail: string;
}

export interface FaceTopicReadinessResult {
  topicKey: string;
  definitionRef?: FaceTopicDefinitionRef;
  state: FaceTopicReadinessState;
  blockers: readonly FaceTopicReadinessBlocker[];
  missingOptionalRequirements: readonly string[];
  evaluatedAgainstSnapshotId: string;
  provenanceRefs: readonly string[];
  constraints: {
    mayGenerateClaims: false;
    mayPromoteObservationToTraditionalClaim: false;
    mayPromoteResearchAuthority: false;
    mayOverrideProhibitedInference: false;
    renderingMayAlterSemanticReadiness: false;
    commerceMayAlterSemanticReadiness: false;
    characterMayAlterSemanticReadiness: false;
  };
}
