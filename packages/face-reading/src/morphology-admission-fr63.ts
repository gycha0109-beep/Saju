import {
  FACE_FR3_METHODOLOGIES_V0,
  FACE_FR3_METHOD_REFS_V0,
  FIVE_OFFICER_CRITERIA_V0,
  type FiveOfficerCriterionModality,
} from './five-officers-six-fus-research-v0.js';
import type { GovernedNeutralGeometryCandidateFR62V1 } from './governed-neutral-geometry-fr62.js';
import { FaceAuthorityValidationError } from './validation.js';

export type MorphologyAdmissionBlockerFR63V1 =
  | 'source_geometry_has_no_anatomical_laterality'
  | 'source_geometry_has_no_fr15_consumer_slot_assignment'
  | 'eye_criteria_require_capture_sensitive_or_dynamic_observation'
  | 'no_static_v1_eye_criterion_operationalization'
  | 'methodology_remains_research_only';

export type MorphologyCriterionAdmissionStateFR63V1 =
  | 'blocked_capture_sensitive'
  | 'blocked_dynamic_appearance';

export interface MorphologyCriterionAdmissionFR63V1 {
  readonly criterionId: string;
  readonly sourceConcept: string;
  readonly modality: Extract<FiveOfficerCriterionModality, 'capture_sensitive' | 'dynamic_appearance'>;
  readonly staticV1Eligible: false;
  readonly admissionState: MorphologyCriterionAdmissionStateFR63V1;
  readonly automaticState: 'not_evaluated';
  readonly operationalizationRef: null;
  readonly calibrationRef: null;
}

export interface MorphologyAdmissionProvenanceFR63V1 {
  readonly providerRunRef: string;
  readonly canonicalAssetDigest: string;
  readonly sourceGeometrySchemaVersion: 'fr62-governed-neutral-geometry-candidate-v1';
  readonly sourceGeometryArtifactVersion: '0.1.0';
  readonly methodologyRef: string;
  readonly methodologyReviewStatus: 'research';
  readonly rawSourcePersisted: false;
  readonly rawProviderResponsePersisted: false;
  readonly biometricEmbeddingPersisted: false;
}

export interface MorphologyAdmissionReportFR63V1 {
  readonly schemaVersion: 'fr63-morphology-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly tier: 'F1';
  readonly authorityState: 'blocked_no_authorized_eye_morphology_operationalization';
  readonly anatomicalTarget: 'eye';
  readonly sourceGeometryCandidateCount: 2;
  readonly sourceGeometryKind: 'region';
  readonly pairConsumptionState: 'unordered_provider_labeled_pair_only';
  readonly criterionAdmissions: readonly MorphologyCriterionAdmissionFR63V1[];
  readonly automaticMorphologyClassifications: readonly [];
  readonly automaticCriterionStatesIssued: 0;
  readonly fiveOfficerAssessmentInputIssued: false;
  readonly researchAssertionSubstitutionAllowed: false;
  readonly captureSensitiveObservationConsumed: false;
  readonly dynamicAppearanceConsumed: false;
  readonly productionMorphologyAuthorized: false;
  readonly v1MethodologyInputReady: false;
  readonly blockers: readonly MorphologyAdmissionBlockerFR63V1[];
  readonly prohibitedShortcuts: readonly [
    'eye_outline_to_contained_not_exposed',
    'eye_outline_to_pupil_stable_center',
    'eye_outline_to_black_white_distinct',
    'eye_outline_to_radiant_appearance',
    'provider_side_to_anatomical_side',
    'empty_static_criteria_to_complete_assessment',
    'geometry_to_human_label_assertion',
  ];
  readonly provenance: MorphologyAdmissionProvenanceFR63V1;
}

const EXPECTED_PROVIDER_TOPOLOGY_SYMBOLS = new Set([
  'FACE_LANDMARKS_LEFT_EYE',
  'FACE_LANDMARKS_RIGHT_EYE',
]);

const EXPECTED_EYE_CRITERIA = Object.freeze([
  'criterion.inspection.contained_not_exposed',
  'criterion.inspection.pupil_stable_center',
  'criterion.inspection.black_white_distinct',
  'criterion.inspection.radiant_appearance',
] as const);

const BLOCKERS = Object.freeze([
  'source_geometry_has_no_anatomical_laterality',
  'source_geometry_has_no_fr15_consumer_slot_assignment',
  'eye_criteria_require_capture_sensitive_or_dynamic_observation',
  'no_static_v1_eye_criterion_operationalization',
  'methodology_remains_research_only',
] as const satisfies readonly MorphologyAdmissionBlockerFR63V1[]);

function validateFR62Source(source: GovernedNeutralGeometryCandidateFR62V1): void {
  if (
    source.schemaVersion !== 'fr62-governed-neutral-geometry-candidate-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'research_neutral_geometry_candidate_only' ||
    source.coordinateFrame !== 'canonical_image_normalized_2d'
  ) {
    throw new FaceAuthorityValidationError('FR-63 requires the exact FR-62 governed neutral geometry candidate boundary.');
  }
  if (
    source.fr15ConsumerSlotAssignmentsIssued !== 0 ||
    source.productionNeutralObservationIssued !== false ||
    source.anatomicalLateralityResolved !== false ||
    source.traditionalSemanticAuthority !== false ||
    source.morphologyProduced !== false
  ) {
    throw new FaceAuthorityValidationError('FR-63 cannot consume FR-62 geometry that claims widened downstream authority.');
  }
  if (source.pairConsumptionState !== 'unordered_provider_labeled_pair_only') {
    throw new FaceAuthorityValidationError('FR-63 requires the FR-62 unordered provider-labeled eye pair.');
  }
  if (source.geometryCandidates.length !== 2) {
    throw new FaceAuthorityValidationError('FR-63 v0.1 requires exactly the two FR-62 eye region candidates.');
  }

  const symbols = new Set<string>();
  for (const candidate of source.geometryCandidates) {
    if (candidate.geometry.kind !== 'region') {
      throw new FaceAuthorityValidationError('FR-63 v0.1 accepts only FR-62 eye region geometry.');
    }
    if (candidate.consumerSlotAssignment !== null || candidate.sideAuthority !== 'provider_label_only') {
      throw new FaceAuthorityValidationError('FR-63 cannot consume eye geometry with anatomical/consumer-slot promotion.');
    }
    if (!EXPECTED_PROVIDER_TOPOLOGY_SYMBOLS.has(candidate.providerTopologySymbol)) {
      throw new FaceAuthorityValidationError(`FR-63 received unexpected provider topology symbol: ${candidate.providerTopologySymbol}`);
    }
    symbols.add(candidate.providerTopologySymbol);
  }
  if (symbols.size !== EXPECTED_PROVIDER_TOPOLOGY_SYMBOLS.size) {
    throw new FaceAuthorityValidationError('FR-63 requires one candidate for each governed FR-62 eye topology.');
  }

  const eyeBlockedBindings = source.blockedBindings.filter((binding) =>
    binding.consumerSlot === 'neutral.face.left_eye_region' ||
    binding.consumerSlot === 'neutral.face.right_eye_region',
  );
  if (
    eyeBlockedBindings.length !== 2 ||
    eyeBlockedBindings.some((binding) => binding.reason !== 'anatomical_laterality_unresolved')
  ) {
    throw new FaceAuthorityValidationError('FR-63 requires both FR14 eye slots to remain blocked by unresolved anatomical laterality.');
  }
}

function methodologyReviewStatus(): 'research' {
  const methodology = FACE_FR3_METHODOLOGIES_V0.find(
    (candidate) => `${candidate.methodologyId}@${candidate.version}` === FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers,
  );
  if (methodology === undefined) {
    throw new FaceAuthorityValidationError('FR-63 cannot resolve the Shenxiang Five Officers methodology.');
  }
  if (methodology.reviewStatus !== 'research') {
    throw new FaceAuthorityValidationError(
      `FR-63 v0.1 requires the Five Officers methodology to remain research-only; got ${methodology.reviewStatus}.`,
    );
  }
  return methodology.reviewStatus;
}

function buildEyeCriterionAdmissions(): readonly MorphologyCriterionAdmissionFR63V1[] {
  const criteria = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.anatomicalTarget === 'eye');
  const actualIds = [...criteria.map((criterion) => criterion.criterionId)].sort();
  const expectedIds = [...EXPECTED_EYE_CRITERIA].sort();
  if (actualIds.join('|') !== expectedIds.join('|')) {
    throw new FaceAuthorityValidationError('FR-63 eye criterion registry changed and requires a new reviewed morphology admission version.');
  }

  return Object.freeze(criteria.map((criterion) => {
    if (criterion.staticV1Eligible !== false) {
      throw new FaceAuthorityValidationError(
        `FR-63 v0.1 must not auto-classify newly static-eligible eye criterion: ${criterion.criterionId}.`,
      );
    }
    if (criterion.modality !== 'capture_sensitive' && criterion.modality !== 'dynamic_appearance') {
      throw new FaceAuthorityValidationError(
        `FR-63 eye criterion has unexpected modality requiring review: ${criterion.criterionId}=${criterion.modality}.`,
      );
    }
    return Object.freeze({
      criterionId: criterion.criterionId,
      sourceConcept: criterion.sourceConcept,
      modality: criterion.modality,
      staticV1Eligible: false as const,
      admissionState: criterion.modality === 'capture_sensitive'
        ? 'blocked_capture_sensitive' as const
        : 'blocked_dynamic_appearance' as const,
      automaticState: 'not_evaluated' as const,
      operationalizationRef: null,
      calibrationRef: null,
    });
  }));
}

export function assessGeometryToMorphologyAdmissionFR63(
  source: GovernedNeutralGeometryCandidateFR62V1,
): MorphologyAdmissionReportFR63V1 {
  validateFR62Source(source);
  const reviewStatus = methodologyReviewStatus();
  const criterionAdmissions = buildEyeCriterionAdmissions();

  return Object.freeze({
    schemaVersion: 'fr63-morphology-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    tier: 'F1' as const,
    authorityState: 'blocked_no_authorized_eye_morphology_operationalization' as const,
    anatomicalTarget: 'eye' as const,
    sourceGeometryCandidateCount: 2 as const,
    sourceGeometryKind: 'region' as const,
    pairConsumptionState: source.pairConsumptionState,
    criterionAdmissions,
    automaticMorphologyClassifications: Object.freeze([]) as readonly [],
    automaticCriterionStatesIssued: 0 as const,
    fiveOfficerAssessmentInputIssued: false as const,
    researchAssertionSubstitutionAllowed: false as const,
    captureSensitiveObservationConsumed: false as const,
    dynamicAppearanceConsumed: false as const,
    productionMorphologyAuthorized: false as const,
    v1MethodologyInputReady: false as const,
    blockers: BLOCKERS,
    prohibitedShortcuts: Object.freeze([
      'eye_outline_to_contained_not_exposed',
      'eye_outline_to_pupil_stable_center',
      'eye_outline_to_black_white_distinct',
      'eye_outline_to_radiant_appearance',
      'provider_side_to_anatomical_side',
      'empty_static_criteria_to_complete_assessment',
      'geometry_to_human_label_assertion',
    ] as const),
    provenance: Object.freeze({
      providerRunRef: source.provenance.providerRunRef,
      canonicalAssetDigest: source.provenance.canonicalAssetDigest,
      sourceGeometrySchemaVersion: source.schemaVersion,
      sourceGeometryArtifactVersion: source.artifactVersion,
      methodologyRef: FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers,
      methodologyReviewStatus: reviewStatus,
      rawSourcePersisted: source.provenance.rawSourcePersisted,
      rawProviderResponsePersisted: source.provenance.rawProviderResponsePersisted,
      biometricEmbeddingPersisted: source.provenance.biometricEmbeddingPersisted,
    }),
  });
}
