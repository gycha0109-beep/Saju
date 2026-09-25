import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceTopicDefinition,
  FaceTopicDefinitionRef,
  FaceTopicRequirementManifest,
} from './contracts.js';

export const FACE_TOPIC_REGISTRY_VERSION =
  'myeongha-face-topic-registry-v0.1';

const DEFAULT_PROHIBITED_INFERENCES = Object.freeze([
  'objective_personality_diagnosis',
  'intelligence_inference',
  'morality_inference',
  'guaranteed_future_outcome',
  'exact_marriage_age_without_authority',
  'exact_wealth_amount_without_authority',
] as const);

function manifest(
  input: Omit<
    FaceTopicRequirementManifest,
    'requestedInferenceKeys' | 'prohibitedInferenceKeys'
  > & {
    requestedInferenceKeys?: readonly string[];
    prohibitedInferenceKeys?: readonly string[];
  },
): FaceTopicRequirementManifest {
  return Object.freeze({
    ...input,
    requestedInferenceKeys: Object.freeze([
      ...(input.requestedInferenceKeys ?? []),
    ]),
    prohibitedInferenceKeys: Object.freeze([
      ...(input.prohibitedInferenceKeys ?? DEFAULT_PROHIBITED_INFERENCES),
    ]),
  });
}

export function assertFaceTopicDefinition(
  definition: FaceTopicDefinition,
): void {
  if (
    definition.topicKey.trim().length === 0 ||
    definition.version.trim().length === 0 ||
    definition.userQuestion.trim().length === 0 ||
    definition.renderingProfileRef.trim().length === 0
  ) {
    throw new Error('FACE_TOPIC_INVALID_IDENTITY');
  }

  if (
    definition.inputKinds.length !== 1 ||
    definition.inputKinds[0] !== 'rgb_selfie' ||
    definition.subjectPolicy !== 'single_face_only' ||
    definition.unavailableBehavior !== 'fail_closed'
  ) {
    throw new Error('FACE_TOPIC_SCOPE_BOUNDARY_VIOLATION');
  }

  const requiredOptionalPairs = [
    [
      definition.requirements.requiredObservationCapabilities,
      definition.requirements.optionalObservationCapabilities,
    ],
    [
      definition.requirements.requiredMethodologyRefs,
      definition.requirements.optionalMethodologyRefs,
    ],
    [
      definition.requirements.requiredSemanticClaimFamilies,
      definition.requirements.optionalSemanticClaimFamilies,
    ],
  ] as const;

  for (const [required, optional] of requiredOptionalPairs) {
    if (required.some((ref) => optional.includes(ref))) {
      throw new Error('FACE_TOPIC_REQUIRED_OPTIONAL_OVERLAP');
    }
  }

  const prohibited = new Set(
    definition.requirements.prohibitedInferenceKeys,
  );
  if (
    definition.requirements.requestedInferenceKeys.some((key) =>
      prohibited.has(key),
    )
  ) {
    throw new Error('FACE_TOPIC_PROHIBITED_INFERENCE_REQUESTED');
  }

  for (const binding of definition.requirements.requiredBindingGroups) {
    if (
      binding.bindingGroupRef.trim().length === 0 ||
      !Number.isInteger(binding.minimumAdmittedBindings) ||
      binding.minimumAdmittedBindings < 1
    ) {
      throw new Error('FACE_TOPIC_INVALID_BINDING_REQUIREMENT');
    }
  }
}

export function createFaceTopicDefinitionRef(
  definition: FaceTopicDefinition,
): FaceTopicDefinitionRef {
  assertFaceTopicDefinition(definition);
  return Object.freeze({
    id: definition.topicKey,
    version: definition.version,
    contentHash: deterministicContentHash(definition),
  });
}

const DISCOVER_STRUCTURE: FaceTopicDefinition = Object.freeze({
  topicKey: 'face.discover.structure',
  version: '0.1.0',
  family: 'DISCOVER',
  userQuestion: '사진에서 현재 근거 있게 확인할 수 있는 얼굴 구조 특징은 무엇인가?',
  readingMode: 'neutral_observation',
  inputKinds: Object.freeze(['rgb_selfie'] as const),
  subjectPolicy: 'single_face_only',
  requirements: manifest({
    requiredObservationCapabilities: Object.freeze([
      'eye.width_height_ratio',
      'mouth.width_and_relative_size',
      'chin_lower_face.visible_width_ratio',
      'nose.alar_width_and_nostril_geometry',
    ]),
    optionalObservationCapabilities: Object.freeze([]),
    requiredMethodologyRefs: Object.freeze([]),
    optionalMethodologyRefs: Object.freeze([]),
    requiredSemanticClaimFamilies: Object.freeze([]),
    optionalSemanticClaimFamilies: Object.freeze([]),
    requiredBindingGroups: Object.freeze([]),
    partialAllowed: false,
  }),
  unavailableBehavior: 'fail_closed',
  shareability: 'result_only',
  repeatability: 'new_capture',
  commerceEligibility: 'not_eligible',
  renderingProfileRef: 'face.rendering.discover.structure.v1',
  provenanceVisibility: 'summary',
  publicationState: 'internal',
});

const DISCOVER_EXTENDED: FaceTopicDefinition = Object.freeze({
  topicKey: 'face.discover.extended',
  version: '0.1.0',
  family: 'DISCOVER',
  userQuestion: '현재 관측 가능한 얼굴 구조를 확장해서 어디까지 확인할 수 있는가?',
  readingMode: 'neutral_observation',
  inputKinds: Object.freeze(['rgb_selfie'] as const),
  subjectPolicy: 'single_face_only',
  requirements: manifest({
    requiredObservationCapabilities: Object.freeze([
      'eye.width_height_ratio',
      'mouth.width_and_relative_size',
      'chin_lower_face.visible_width_ratio',
      'nose.alar_width_and_nostril_geometry',
    ]),
    optionalObservationCapabilities: Object.freeze([
      'forehead.visible_width_shape',
    ]),
    requiredMethodologyRefs: Object.freeze([]),
    optionalMethodologyRefs: Object.freeze([]),
    requiredSemanticClaimFamilies: Object.freeze([]),
    optionalSemanticClaimFamilies: Object.freeze([]),
    requiredBindingGroups: Object.freeze([]),
    partialAllowed: true,
  }),
  unavailableBehavior: 'fail_closed',
  shareability: 'result_only',
  repeatability: 'new_capture',
  commerceEligibility: 'not_eligible',
  renderingProfileRef: 'face.rendering.discover.extended.v1',
  provenanceVisibility: 'detailed',
  publicationState: 'internal',
});

const THREE_DIVISIONS: FaceTopicDefinition = Object.freeze({
  topicKey: 'face.reading.three_divisions',
  version: '0.1.0',
  family: 'SELF_READING',
  userQuestion: '전통 삼정 체계에서 얼굴의 세 구간은 어떻게 해석되는가?',
  readingMode: 'traditional_reading',
  inputKinds: Object.freeze(['rgb_selfie'] as const),
  subjectPolicy: 'single_face_only',
  requirements: manifest({
    requiredObservationCapabilities: Object.freeze([
      'face.vertical_reference.visible_hairline',
      'face.vertical_reference.brow',
      'face.vertical_reference.interbrow_surface',
      'face.vertical_reference.nose_root_bridge',
      'face.vertical_reference.visible_nose_tip',
      'face.vertical_reference.visible_central_groove',
      'face.vertical_reference.inferior_lower_face',
    ]),
    optionalObservationCapabilities: Object.freeze([]),
    requiredMethodologyRefs: Object.freeze([
      'method.mayi.face_three_divisions.fr261@0.2.0',
    ]),
    optionalMethodologyRefs: Object.freeze([]),
    requiredSemanticClaimFamilies: Object.freeze([
      'face.claim.three_divisions',
    ]),
    optionalSemanticClaimFamilies: Object.freeze([]),
    requiredBindingGroups: Object.freeze([
      Object.freeze({
        bindingGroupRef: 'face-bridge.frb005.three_divisions',
        minimumAdmittedBindings: 16,
        requireReady: true,
      }),
    ]),
    partialAllowed: false,
  }),
  unavailableBehavior: 'fail_closed',
  shareability: 'result_only',
  repeatability: 'new_capture',
  commerceEligibility: 'eligible',
  renderingProfileRef: 'face.rendering.traditional-reading.v1',
  provenanceVisibility: 'detailed',
  publicationState: 'coming_soon',
});

export const FACE_TOPIC_REGISTRY = Object.freeze([
  DISCOVER_STRUCTURE,
  DISCOVER_EXTENDED,
  THREE_DIVISIONS,
] as const);

for (const topic of FACE_TOPIC_REGISTRY) {
  assertFaceTopicDefinition(topic);
}

if (
  new Set(FACE_TOPIC_REGISTRY.map((topic) => topic.topicKey)).size !==
  FACE_TOPIC_REGISTRY.length
) {
  throw new Error('FACE_TOPIC_DUPLICATE_TOPIC_KEY');
}

export function getFaceTopicDefinition(
  topicKey: string,
): FaceTopicDefinition | undefined {
  return FACE_TOPIC_REGISTRY.find(
    (topic) => topic.topicKey === topicKey,
  );
}
