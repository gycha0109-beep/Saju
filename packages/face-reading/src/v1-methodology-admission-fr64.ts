import type { FaceTier, PassageVerificationStatus, ReviewStatus } from './contracts.js';
import {
  FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
  FACE_FR3_METHOD_REFS_V0,
  FACE_FR3_RESEARCH_PACK_V0,
} from './five-officers-six-fus-research-v0.js';
import type { MorphologyAdmissionReportFR63V1 } from './morphology-admission-fr63.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

export type V1MethodologyAdmissionBlockerFR64V1 =
  | 'upstream_morphology_input_not_ready'
  | 'no_automatic_morphology_classifications'
  | 'no_automatic_criterion_states'
  | 'five_officer_assessment_input_not_issued'
  | 'methodology_research_only'
  | 'methodology_sources_not_scan_checked'
  | 'pack_enablement_is_not_execution_authority'
  | 'diagnosis_runtime_requires_explicit_assertion_authority';

export interface V1MethodologySourceVerificationFR64V1 {
  readonly passageRef: string;
  readonly verificationStatus: PassageVerificationStatus;
}

export interface V1MethodologyPackSnapshotFR64V1 {
  readonly packRef: string;
  readonly registryValidated: true;
  readonly f1EnabledByPack: true;
  readonly enabledTiers: readonly FaceTier[];
  readonly targetMethodologyRef: string;
  readonly targetMethodologyIncluded: true;
  readonly targetMethodologyReviewStatus: ReviewStatus;
  readonly forbiddenObservationInputs: readonly string[];
}

export interface V1MethodologyAdmissionReportFR64V1 {
  readonly schemaVersion: 'fr64-v1-methodology-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'blocked_upstream_morphology_not_ready';
  readonly target: 'shenxiang_five_officers_static_v1';
  readonly pack: V1MethodologyPackSnapshotFR64V1;
  readonly sourceVerification: readonly V1MethodologySourceVerificationFR64V1[];
  readonly scanCheckedSourceCount: 0;
  readonly upstream: {
    readonly morphologyAdmissionSchemaVersion: 'fr63-morphology-admission-v1';
    readonly morphologyInputReady: false;
    readonly automaticMorphologyClassificationCount: 0;
    readonly automaticCriterionStatesIssued: 0;
    readonly fiveOfficerAssessmentInputIssued: false;
    readonly researchAssertionSubstitutionAllowed: false;
  };
  readonly execution: {
    readonly methodologyExecutionIssued: false;
    readonly researchDiagnosisRuntimeInvoked: false;
    readonly explicitAssertionAuthorityInjected: false;
    readonly claimsIssued: 0;
    readonly narrativeIssued: false;
    readonly productionMethodologyAuthorized: false;
    readonly v1ClaimInputReady: false;
  };
  readonly blockers: readonly V1MethodologyAdmissionBlockerFR64V1[];
  readonly prohibitedShortcuts: readonly [
    'pack_f1_enabled_to_methodology_execution',
    'empty_morphology_to_five_officer_assessment',
    'geometry_to_assertion_authority',
    'research_methodology_to_production_authority',
    'blocked_methodology_to_claims',
    'blocked_methodology_to_narrative',
  ];
  readonly provenance: {
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly sourceMorphologyArtifactVersion: '0.1.0';
    readonly methodologyPackRef: string;
    readonly methodologyRef: string;
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const TARGET_METHOD_REF = FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers;
const PACK_REF = `${FACE_FR3_RESEARCH_PACK_V0.packId}@${FACE_FR3_RESEARCH_PACK_V0.version}`;

const REQUIRED_FR63_BLOCKERS = Object.freeze([
  'source_geometry_has_no_anatomical_laterality',
  'source_geometry_has_no_fr15_consumer_slot_assignment',
  'eye_criteria_require_capture_sensitive_or_dynamic_observation',
  'no_static_v1_eye_criterion_operationalization',
  'methodology_remains_research_only',
] as const);

const REQUIRED_FR63_SHORTCUT_BLOCKS = Object.freeze([
  'provider_side_to_anatomical_side',
  'empty_static_criteria_to_complete_assessment',
  'geometry_to_human_label_assertion',
] as const);

const BLOCKERS = Object.freeze([
  'upstream_morphology_input_not_ready',
  'no_automatic_morphology_classifications',
  'no_automatic_criterion_states',
  'five_officer_assessment_input_not_issued',
  'methodology_research_only',
  'methodology_sources_not_scan_checked',
  'pack_enablement_is_not_execution_authority',
  'diagnosis_runtime_requires_explicit_assertion_authority',
] as const satisfies readonly V1MethodologyAdmissionBlockerFR64V1[]);

function validateFR63Source(source: MorphologyAdmissionReportFR63V1): void {
  if (
    source.schemaVersion !== 'fr63-morphology-admission-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.tier !== 'F1' ||
    source.authorityState !== 'blocked_no_authorized_eye_morphology_operationalization'
  ) {
    throw new FaceAuthorityValidationError('FR-64 requires the exact FR-63 F1 morphology admission boundary.');
  }
  if (
    source.anatomicalTarget !== 'eye' ||
    source.sourceGeometryCandidateCount !== 2 ||
    source.sourceGeometryKind !== 'region' ||
    source.pairConsumptionState !== 'unordered_provider_labeled_pair_only'
  ) {
    throw new FaceAuthorityValidationError('FR-64 received an unsupported FR-63 morphology target or geometry state.');
  }
  if (
    source.automaticMorphologyClassifications.length !== 0 ||
    source.automaticCriterionStatesIssued !== 0 ||
    source.fiveOfficerAssessmentInputIssued !== false ||
    source.researchAssertionSubstitutionAllowed !== false ||
    source.captureSensitiveObservationConsumed !== false ||
    source.dynamicAppearanceConsumed !== false ||
    source.productionMorphologyAuthorized !== false ||
    source.v1MethodologyInputReady !== false
  ) {
    throw new FaceAuthorityValidationError('FR-64 v0.1 requires FR-63 morphology input to remain explicitly blocked and empty.');
  }
  if (
    source.criterionAdmissions.length !== 4 ||
    source.criterionAdmissions.some((criterion) =>
      criterion.staticV1Eligible !== false ||
      criterion.automaticState !== 'not_evaluated' ||
      criterion.operationalizationRef !== null ||
      criterion.calibrationRef !== null
    )
  ) {
    throw new FaceAuthorityValidationError('FR-64 requires FR-63 eye criteria to remain non-evaluated and non-operationalized.');
  }
  if (REQUIRED_FR63_BLOCKERS.some((blocker) => !source.blockers.includes(blocker))) {
    throw new FaceAuthorityValidationError('FR-64 requires FR-63 laterality, slot, observation, and research blockers to remain intact.');
  }
  if (REQUIRED_FR63_SHORTCUT_BLOCKS.some((shortcut) => !source.prohibitedShortcuts.includes(shortcut))) {
    throw new FaceAuthorityValidationError('FR-64 requires FR-63 anti-shortcut authority restrictions to remain intact.');
  }
  if (
    source.provenance.methodologyRef !== TARGET_METHOD_REF ||
    source.provenance.methodologyReviewStatus !== 'research'
  ) {
    throw new FaceAuthorityValidationError('FR-64 requires the FR-63 Shenxiang Five Officers research methodology pin.');
  }
  if (
    source.provenance.rawSourcePersisted !== false ||
    source.provenance.rawProviderResponsePersisted !== false ||
    source.provenance.biometricEmbeddingPersisted !== false
  ) {
    throw new FaceAuthorityValidationError('FR-64 requires FR-63 non-persistence provenance to remain intact.');
  }
}

function buildPackSnapshot(): {
  readonly pack: V1MethodologyPackSnapshotFR64V1;
  readonly sourceVerification: readonly V1MethodologySourceVerificationFR64V1[];
} {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0);

  const registeredPack = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologyPacks.find(
    (candidate) => `${candidate.packId}@${candidate.version}` === PACK_REF,
  );
  if (registeredPack === undefined) {
    throw new FaceAuthorityValidationError(`FR-64 cannot resolve methodology pack: ${PACK_REF}`);
  }
  if (!registeredPack.enabledTiers.includes('F1')) {
    throw new FaceAuthorityValidationError('FR-64 requires the selected methodology pack to declare F1 as an enabled tier.');
  }
  if (!registeredPack.methodologyDefinitionRefs.includes(TARGET_METHOD_REF)) {
    throw new FaceAuthorityValidationError(`FR-64 methodology pack does not include target method: ${TARGET_METHOD_REF}`);
  }
  if (!registeredPack.forbiddenObservationInputs.includes('observations.colorAppearance')) {
    throw new FaceAuthorityValidationError('FR-64 static V1 pack must continue to forbid observations.colorAppearance.');
  }

  const methodology = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies.find(
    (candidate) => `${candidate.methodologyId}@${candidate.version}` === TARGET_METHOD_REF,
  );
  if (methodology === undefined) {
    throw new FaceAuthorityValidationError(`FR-64 cannot resolve target methodology: ${TARGET_METHOD_REF}`);
  }
  if (methodology.reviewStatus !== 'research') {
    throw new FaceAuthorityValidationError(
      `FR-64 v0.1 requires target methodology to remain research-only; got ${methodology.reviewStatus}.`,
    );
  }

  const passageById = new Map(
    FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.map((passage) => [passage.passageId, passage] as const),
  );
  const sourceVerification = Object.freeze(methodology.sourceRefs.map((passageRef) => {
    const passage = passageById.get(passageRef);
    if (passage === undefined) {
      throw new FaceAuthorityValidationError(`FR-64 methodology sourceRef does not resolve: ${passageRef}`);
    }
    if (passage.verificationStatus === 'scan_checked' || passage.verificationStatus === 'double_checked') {
      throw new FaceAuthorityValidationError(
        `FR-64 v0.1 source verification state changed and requires a new admission review: ${passageRef}=${passage.verificationStatus}.`,
      );
    }
    return Object.freeze({
      passageRef,
      verificationStatus: passage.verificationStatus,
    });
  }));

  return Object.freeze({
    pack: Object.freeze({
      packRef: PACK_REF,
      registryValidated: true as const,
      f1EnabledByPack: true as const,
      enabledTiers: Object.freeze([...registeredPack.enabledTiers]),
      targetMethodologyRef: TARGET_METHOD_REF,
      targetMethodologyIncluded: true as const,
      targetMethodologyReviewStatus: methodology.reviewStatus,
      forbiddenObservationInputs: Object.freeze([...registeredPack.forbiddenObservationInputs]),
    }),
    sourceVerification,
  });
}

export function assessV1MethodologyAdmissionFR64(
  source: MorphologyAdmissionReportFR63V1,
): V1MethodologyAdmissionReportFR64V1 {
  validateFR63Source(source);
  const snapshot = buildPackSnapshot();
  const scanCheckedSourceCount = snapshot.sourceVerification.filter(
    (entry) => entry.verificationStatus === 'scan_checked' || entry.verificationStatus === 'double_checked',
  ).length;
  if (scanCheckedSourceCount !== 0) {
    throw new FaceAuthorityValidationError('FR-64 v0.1 must be reviewed before consuming newly scan-checked methodology sources.');
  }

  return Object.freeze({
    schemaVersion: 'fr64-v1-methodology-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'blocked_upstream_morphology_not_ready' as const,
    target: 'shenxiang_five_officers_static_v1' as const,
    pack: snapshot.pack,
    sourceVerification: snapshot.sourceVerification,
    scanCheckedSourceCount: 0 as const,
    upstream: Object.freeze({
      morphologyAdmissionSchemaVersion: source.schemaVersion,
      morphologyInputReady: false as const,
      automaticMorphologyClassificationCount: 0 as const,
      automaticCriterionStatesIssued: source.automaticCriterionStatesIssued,
      fiveOfficerAssessmentInputIssued: source.fiveOfficerAssessmentInputIssued,
      researchAssertionSubstitutionAllowed: source.researchAssertionSubstitutionAllowed,
    }),
    execution: Object.freeze({
      methodologyExecutionIssued: false as const,
      researchDiagnosisRuntimeInvoked: false as const,
      explicitAssertionAuthorityInjected: false as const,
      claimsIssued: 0 as const,
      narrativeIssued: false as const,
      productionMethodologyAuthorized: false as const,
      v1ClaimInputReady: false as const,
    }),
    blockers: BLOCKERS,
    prohibitedShortcuts: Object.freeze([
      'pack_f1_enabled_to_methodology_execution',
      'empty_morphology_to_five_officer_assessment',
      'geometry_to_assertion_authority',
      'research_methodology_to_production_authority',
      'blocked_methodology_to_claims',
      'blocked_methodology_to_narrative',
    ] as const),
    provenance: Object.freeze({
      providerRunRef: source.provenance.providerRunRef,
      canonicalAssetDigest: source.provenance.canonicalAssetDigest,
      sourceMorphologyArtifactVersion: source.artifactVersion,
      methodologyPackRef: PACK_REF,
      methodologyRef: TARGET_METHOD_REF,
      rawSourcePersisted: source.provenance.rawSourcePersisted,
      rawProviderResponsePersisted: source.provenance.rawProviderResponsePersisted,
      biometricEmbeddingPersisted: source.provenance.biometricEmbeddingPersisted,
    }),
  });
}
