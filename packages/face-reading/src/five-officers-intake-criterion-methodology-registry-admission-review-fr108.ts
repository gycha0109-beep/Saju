import type { FaceAuthorityRegistry, FaceMethodologyDefinition } from './contracts.js';
import { FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0 } from './five-officers-six-fus-research-v0.js';
import {
  validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107,
  type FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1,
} from './five-officers-intake-criterion-methodology-definition-review-fr107.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const CANDIDATE_REF = 'method.shenxiang.five_officers.intake_criteria@0.1.0' as const;
const INTAKE_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const CTEXT_WITNESS = 'witness.shenxiang_quanbian.ctext' as const;
const NLC_WITNESS = 'witness.shenxiang_quanbian.nlc_1925' as const;

export interface FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1 {
  readonly schemaVersion: 'fr108-five-officers-intake-criterion-methodology-registry-admission-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted';
  readonly upstream: {
    readonly fr107SchemaVersion: 'fr107-five-officers-intake-criterion-methodology-definition-review-v1';
    readonly fr107AuthorityState: 'intake_criterion_research_methodology_definition_admitted_registry_unmodified';
    readonly candidateMethodologyRef: typeof CANDIDATE_REF;
    readonly candidateReviewStatus: 'research';
    readonly candidateSourceRefs: readonly [typeof INTAKE_PASSAGE_REF];
    readonly criterionResearchMethodologyDefinitionAdmitted: true;
    readonly methodologyDefinitionsIssued: 1;
    readonly persistentRegistryDefinitionsIssued: 0;
    readonly sourceAuthorityScanCheckedByGovernedOverlay: true;
    readonly registryAdmissionAuthorizedBefore: false;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly faceRegistrySnapshot: {
    readonly registryValidated: true;
    readonly candidateAlreadyRegistered: false;
    readonly nlcWitnessRegistered: true;
    readonly nlcWitnessStatus: 'verified';
    readonly intakePassageRegistered: true;
    readonly intakePassageWitnessId: typeof CTEXT_WITNESS;
    readonly intakePassageVerificationStatus: 'unverified_ocr';
    readonly intakePassageUsesNlcWitness: false;
    readonly sourceAuthorityOverlayCollectionSupportedByContract: false;
  };
  readonly admissionReview: {
    readonly structuralResearchRegistryAppendValid: true;
    readonly candidateSourceRefResolves: true;
    readonly candidateSourceRefResolvesToHistoricalCtextPassage: true;
    readonly governedScanCheckedAuthorityPresentUpstream: true;
    readonly governedScanCheckedAuthorityPersistedInFaceRegistry: false;
    readonly scanCheckedWitnessAuthoritySurvivesCandidateSourceRefResolution: false;
    readonly provenancePreservingRegistryAdmissionValid: false;
    readonly registryAdmissionAuthorized: false;
    readonly candidatePersisted: false;
    readonly methodologyDefinitionsPersisted: 0;
    readonly methodologyPackMutationAuthorized: false;
  };
  readonly passageIdentityConstraint: {
    readonly passageIdsUniqueWithinRegistry: true;
    readonly samePassageIdNlcAppendWithoutReplacingHistoricalEntryAuthorized: false;
    readonly replaceHistoricalCtextPassageWithNlcAuthorized: false;
    readonly introduceVersionedNlcPassageIdAuthorized: false;
    readonly candidateSourceRefRewriteAuthorized: false;
    readonly explicitPersistenceDesignReviewRequired: true;
  };
  readonly execution: {
    readonly methodologyExecutionIssued: false;
    readonly methodologyProductionPromotionAuthorized: false;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalFormationAuthorized: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly structuralAppendValidityMeansGovernedAdmission: false;
    readonly verifiedWitnessPresenceMeansPassageAuthorityPersisted: false;
    readonly samePassageTextMeansWitnessAuthorityInterchangeable: false;
    readonly researchMethodologyMeansSourceProvenanceMayBeDropped: false;
    readonly registryAdmissionMeansMethodologyExecution: false;
    readonly registryAdmissionReviewMeansMetricBinding: false;
    readonly registryAdmissionReviewMeansThreshold: false;
    readonly registryAdmissionReviewMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_scan_checked_passage_registry_identity_persistence_review';
  readonly remainingBlockers: readonly [
    'scan_checked_intake_passage_authority_not_persisted_in_face_registry',
    'intake_passage_identity_rebind_or_versioning_not_reviewed',
    'intake_criterion_methodology_not_registered',
    'intake_officer_mapping_dependency_not_re_reviewed',
    'intake_metric_to_source_concept_mapping_not_authorized',
    'intake_calibration_and_thresholds_not_authorized',
    'fr64_methodology_execution_and_claim_gates_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'structural_registry_append_to_governed_admission',
    'verified_witness_presence_to_passage_authority_persistence',
    'same_passage_text_to_witness_authority_equivalence',
    'governed_overlay_to_implicit_face_registry_mutation',
    'research_methodology_to_source_provenance_drop',
    'registry_review_to_metric_binding',
    'registry_review_to_numeric_threshold',
    'registry_review_to_traditional_semantics',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'scan_checked_intake_passage_authority_not_persisted_in_face_registry',
  'intake_passage_identity_rebind_or_versioning_not_reviewed',
  'intake_criterion_methodology_not_registered',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);
const REQUIRED_SHORTCUTS = Object.freeze([
  'structural_registry_append_to_governed_admission',
  'verified_witness_presence_to_passage_authority_persistence',
  'same_passage_text_to_witness_authority_equivalence',
  'governed_overlay_to_implicit_face_registry_mutation',
  'research_methodology_to_source_provenance_drop',
  'registry_review_to_metric_binding',
  'registry_review_to_numeric_threshold',
  'registry_review_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-108 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1): void {
  validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107(source);
  if (
    source.schemaVersion !== 'fr107-five-officers-intake-criterion-methodology-definition-review-v1' ||
    source.authorityState !== 'intake_criterion_research_methodology_definition_admitted_registry_unmodified' ||
    source.definitionReview.methodologyRef !== CANDIDATE_REF ||
    source.candidateDefinition.reviewStatus !== 'research' ||
    !sameSequence(source.candidateDefinition.sourceRefs, [INTAKE_PASSAGE_REF]) ||
    source.definitionReview.criterionResearchMethodologyDefinitionAdmitted !== true ||
    source.definitionReview.methodologyDefinitionsIssued !== 1 ||
    source.definitionReview.persistentRegistryDefinitionsIssued !== 0 ||
    source.definitionReview.sourceAuthorityScanCheckedByGovernedOverlay !== true ||
    source.registry.registryAdmissionAuthorized !== false ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-107 upstream authority drift.');
}

function inspectRegistry(candidate: FaceMethodologyDefinition): FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1['faceRegistrySnapshot'] {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0);
  const candidateAlreadyRegistered = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies.some(
    (methodology) => `${methodology.methodologyId}@${methodology.version}` === CANDIDATE_REF,
  );
  if (candidateAlreadyRegistered) fail('candidate methodology unexpectedly already registered.');

  const nlcWitness = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.witnesses.find((witness) => witness.witnessId === NLC_WITNESS);
  if (nlcWitness === undefined || nlcWitness.witnessStatus !== 'verified') fail('NLC witness registry state drift.');

  const intakePassages = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.filter(
    (passage) => passage.passageId === INTAKE_PASSAGE_REF,
  );
  if (
    intakePassages.length !== 1 ||
    intakePassages[0]?.witnessId !== CTEXT_WITNESS ||
    intakePassages[0]?.verificationStatus !== 'unverified_ocr'
  ) fail('historical intake passage registry identity drift.');

  const ephemeralRegistry: FaceAuthorityRegistry = {
    ...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
    methodologies: [...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies, candidate],
  };
  validateFaceAuthorityRegistry(ephemeralRegistry);

  if ('sourceAuthorityOverlays' in FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0) {
    fail('Face authority registry gained a source-authority overlay collection and requires re-review.');
  }

  return Object.freeze({
    registryValidated: true as const,
    candidateAlreadyRegistered: false as const,
    nlcWitnessRegistered: true as const,
    nlcWitnessStatus: 'verified' as const,
    intakePassageRegistered: true as const,
    intakePassageWitnessId: CTEXT_WITNESS,
    intakePassageVerificationStatus: 'unverified_ocr' as const,
    intakePassageUsesNlcWitness: false as const,
    sourceAuthorityOverlayCollectionSupportedByContract: false as const,
  });
}

export function reviewFiveOfficerIntakeCriterionMethodologyRegistryAdmissionFR108(
  source: FiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107V1,
): FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1 {
  validateUpstream(source);
  const registrySnapshot = inspectRegistry(source.candidateDefinition);

  return Object.freeze({
    schemaVersion: 'fr108-five-officers-intake-criterion-methodology-registry-admission-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted' as const,
    upstream: Object.freeze({
      fr107SchemaVersion: source.schemaVersion,
      fr107AuthorityState: source.authorityState,
      candidateMethodologyRef: source.definitionReview.methodologyRef,
      candidateReviewStatus: source.candidateDefinition.reviewStatus,
      candidateSourceRefs: source.candidateDefinition.sourceRefs as readonly [typeof INTAKE_PASSAGE_REF],
      criterionResearchMethodologyDefinitionAdmitted: source.definitionReview.criterionResearchMethodologyDefinitionAdmitted,
      methodologyDefinitionsIssued: source.definitionReview.methodologyDefinitionsIssued,
      persistentRegistryDefinitionsIssued: source.definitionReview.persistentRegistryDefinitionsIssued,
      sourceAuthorityScanCheckedByGovernedOverlay: source.definitionReview.sourceAuthorityScanCheckedByGovernedOverlay,
      registryAdmissionAuthorizedBefore: source.registry.registryAdmissionAuthorized,
      metricBindingsIssued: source.execution.metricBindingsIssued,
      thresholdsIssued: source.execution.thresholdsIssued,
      criterionStatesIssued: source.execution.criterionStatesIssued,
      claimsIssued: source.execution.claimsIssued,
      traditionalSemanticAuthority: source.execution.traditionalSemanticAuthority,
    }),
    faceRegistrySnapshot: registrySnapshot,
    admissionReview: Object.freeze({
      structuralResearchRegistryAppendValid: true as const,
      candidateSourceRefResolves: true as const,
      candidateSourceRefResolvesToHistoricalCtextPassage: true as const,
      governedScanCheckedAuthorityPresentUpstream: true as const,
      governedScanCheckedAuthorityPersistedInFaceRegistry: false as const,
      scanCheckedWitnessAuthoritySurvivesCandidateSourceRefResolution: false as const,
      provenancePreservingRegistryAdmissionValid: false as const,
      registryAdmissionAuthorized: false as const,
      candidatePersisted: false as const,
      methodologyDefinitionsPersisted: 0 as const,
      methodologyPackMutationAuthorized: false as const,
    }),
    passageIdentityConstraint: Object.freeze({
      passageIdsUniqueWithinRegistry: true as const,
      samePassageIdNlcAppendWithoutReplacingHistoricalEntryAuthorized: false as const,
      replaceHistoricalCtextPassageWithNlcAuthorized: false as const,
      introduceVersionedNlcPassageIdAuthorized: false as const,
      candidateSourceRefRewriteAuthorized: false as const,
      explicitPersistenceDesignReviewRequired: true as const,
    }),
    execution: Object.freeze({
      methodologyExecutionIssued: false as const,
      methodologyProductionPromotionAuthorized: false as const,
      metricBindingsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalFormationAuthorized: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      structuralAppendValidityMeansGovernedAdmission: false as const,
      verifiedWitnessPresenceMeansPassageAuthorityPersisted: false as const,
      samePassageTextMeansWitnessAuthorityInterchangeable: false as const,
      researchMethodologyMeansSourceProvenanceMayBeDropped: false as const,
      registryAdmissionMeansMethodologyExecution: false as const,
      registryAdmissionReviewMeansMetricBinding: false as const,
      registryAdmissionReviewMeansThreshold: false as const,
      registryAdmissionReviewMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_scan_checked_passage_registry_identity_persistence_review' as const,
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108(
  source: FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1,
): FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1 {
  if (
    source.schemaVersion !== 'fr108-five-officers-intake-criterion-methodology-registry-admission-review-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted'
  ) fail('schema or authority state drift.');
  if (
    source.upstream.fr107SchemaVersion !== 'fr107-five-officers-intake-criterion-methodology-definition-review-v1' ||
    source.upstream.fr107AuthorityState !== 'intake_criterion_research_methodology_definition_admitted_registry_unmodified' ||
    source.upstream.candidateMethodologyRef !== CANDIDATE_REF ||
    source.upstream.candidateReviewStatus !== 'research' ||
    !sameSequence(source.upstream.candidateSourceRefs, [INTAKE_PASSAGE_REF]) ||
    source.upstream.criterionResearchMethodologyDefinitionAdmitted !== true ||
    source.upstream.methodologyDefinitionsIssued !== 1 ||
    source.upstream.persistentRegistryDefinitionsIssued !== 0 ||
    source.upstream.sourceAuthorityScanCheckedByGovernedOverlay !== true ||
    source.upstream.registryAdmissionAuthorizedBefore !== false ||
    source.upstream.metricBindingsIssued !== 0 ||
    source.upstream.thresholdsIssued !== 0 ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) fail('upstream authority snapshot drift.');
  if (
    source.faceRegistrySnapshot.registryValidated !== true ||
    source.faceRegistrySnapshot.candidateAlreadyRegistered !== false ||
    source.faceRegistrySnapshot.nlcWitnessRegistered !== true ||
    source.faceRegistrySnapshot.nlcWitnessStatus !== 'verified' ||
    source.faceRegistrySnapshot.intakePassageRegistered !== true ||
    source.faceRegistrySnapshot.intakePassageWitnessId !== CTEXT_WITNESS ||
    source.faceRegistrySnapshot.intakePassageVerificationStatus !== 'unverified_ocr' ||
    source.faceRegistrySnapshot.intakePassageUsesNlcWitness !== false ||
    source.faceRegistrySnapshot.sourceAuthorityOverlayCollectionSupportedByContract !== false
  ) fail('Face registry snapshot drift.');
  if (
    source.admissionReview.structuralResearchRegistryAppendValid !== true ||
    source.admissionReview.candidateSourceRefResolves !== true ||
    source.admissionReview.candidateSourceRefResolvesToHistoricalCtextPassage !== true ||
    source.admissionReview.governedScanCheckedAuthorityPresentUpstream !== true ||
    source.admissionReview.governedScanCheckedAuthorityPersistedInFaceRegistry !== false ||
    source.admissionReview.scanCheckedWitnessAuthoritySurvivesCandidateSourceRefResolution !== false ||
    source.admissionReview.provenancePreservingRegistryAdmissionValid !== false ||
    source.admissionReview.registryAdmissionAuthorized !== false ||
    source.admissionReview.candidatePersisted !== false ||
    source.admissionReview.methodologyDefinitionsPersisted !== 0 ||
    source.admissionReview.methodologyPackMutationAuthorized !== false
  ) fail('registry admission review drift.');
  if (
    source.passageIdentityConstraint.passageIdsUniqueWithinRegistry !== true ||
    source.passageIdentityConstraint.samePassageIdNlcAppendWithoutReplacingHistoricalEntryAuthorized !== false ||
    source.passageIdentityConstraint.replaceHistoricalCtextPassageWithNlcAuthorized !== false ||
    source.passageIdentityConstraint.introduceVersionedNlcPassageIdAuthorized !== false ||
    source.passageIdentityConstraint.candidateSourceRefRewriteAuthorized !== false ||
    source.passageIdentityConstraint.explicitPersistenceDesignReviewRequired !== true
  ) fail('passage identity constraint drift.');
  if (
    Object.values(source.execution).some((value) => value !== false && value !== 0) ||
    Object.values(source.authorityBoundary).some((value) => value !== false) ||
    source.recommendedNextFrontier !== 'intake_scan_checked_passage_registry_identity_persistence_review' ||
    !sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('execution, authority boundary, or next-frontier drift.');
  return source;
}
