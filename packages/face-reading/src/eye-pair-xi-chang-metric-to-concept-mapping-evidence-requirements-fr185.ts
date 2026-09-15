import {
  assertIssuedDarumaEyeMorphologySourceReviewFR176,
  FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
  FR176_VERDICT,
  issueDarumaEyeMorphologySourceReviewFR176,
} from './daruma-eye-morphology-source-review-fr176.js';
import {
  assertIssuedEyePairXiChangOperationalizationRequirementsFR180,
  FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES,
  FR180_VERDICT,
  issueEyePairXiChangOperationalizationRequirementsFR180,
} from './eye-pair-xi-chang-operationalization-requirements-fr180.js';
import {
  assertIssuedEyePairFR176DarumaEyeExactScanPagePinningFR182,
  FR182_FROZEN_EVIDENCE_MANIFEST,
  FR182_PAGE_146_IMAGE_SHA256,
  FR182_PAGE_146_REF,
  FR182_VERDICT,
  issueEyePairFR176DarumaEyeExactScanPagePinningFR182,
} from './eye-pair-fr176-daruma-eye-exact-scan-page-pinning-fr182.js';
import {
  assertIssuedEyePairXiChangOperationalizationRequirementsRereviewFR183,
  FR183_REMAINING_BLOCKERS,
  FR183_VERDICT,
  issueEyePairXiChangOperationalizationRequirementsRereviewFR183,
} from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import {
  assertIssuedEyePairXiChangMetricToConceptMappingFeasibilityFR184,
  FR184_CHANG_METRIC_REF,
  FR184_MAPPING_GAPS,
  FR184_NEXT_FRONTIER,
  FR184_VERDICT,
  FR184_XI_METRIC_REF,
  issueEyePairXiChangMetricToConceptMappingFeasibilityFR184,
} from './eye-pair-xi-chang-metric-to-concept-mapping-feasibility-fr184.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR185_RECORD_ID =
  'research.face_reading.eye_pair.xi_chang_metric_to_concept_mapping_evidence_requirements.fr185' as const;
export const FR185_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr185-eye-pair-xi-chang-metric-to-concept-mapping-evidence-requirements.md' as const;
export const FR185_VERDICT =
  'METRIC_TO_CONCEPT_MAPPING_EVIDENCE_REQUIREMENTS_DEFINED_MAPPING_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED' as const;
export const FR185_NEXT_FRONTIER =
  'establish_governed_xi_chang_mapping_hypothesis_provenance_before_blinded_operationalization_directionality_or_calibration' as const;

export const FR185_REQUIRED_MAPPING_EVIDENCE_KEYS = Object.freeze([
  'source_concept_identity_and_pinned_provenance',
  'candidate_neutral_metric_identity_and_versioned_definition',
  'explicit_mapping_hypothesis_provenance',
  'independent_blinded_expert_operationalization',
  'repeat_capture_stability',
  'source_grounded_construct_correspondence',
  'alternative_metric_and_confound_rejection',
  'end_to_end_evidence_traceability',
  'explicit_mapping_acceptance_or_rejection_decision',
  'fail_closed_completeness',
] as const);

export type FR185MappingEvidenceRequirementKey = typeof FR185_REQUIRED_MAPPING_EVIDENCE_KEYS[number];
export type FR185RequirementState = 'satisfied_upstream' | 'required_not_satisfied';

export interface FR185MappingEvidenceRequirementV1 {
  readonly key: FR185MappingEvidenceRequirementKey;
  readonly state: FR185RequirementState;
  readonly requiredBeforeMappingAdmission: true;
  readonly requirement: string;
}

export const FR185_MAPPING_EVIDENCE_REQUIREMENTS: readonly FR185MappingEvidenceRequirementV1[] = Object.freeze([
  Object.freeze({
    key: 'source_concept_identity_and_pinned_provenance' as const,
    state: 'satisfied_upstream' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'Traditional concept identity must be tied to the fixed direct-source witness and exact visually pinned source-page provenance; translation or secondary-source wording cannot substitute for that identity.',
  }),
  Object.freeze({
    key: 'candidate_neutral_metric_identity_and_versioned_definition' as const,
    state: 'satisfied_upstream' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'The candidate neutral metric must be an exact versioned metric ref with its coordinate frame, unit, denominator, aggregation rule, and semantic prohibitions frozen before semantic correspondence is reviewed.',
  }),
  Object.freeze({
    key: 'explicit_mapping_hypothesis_provenance' as const,
    state: 'required_not_satisfied' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'A governed hypothesis artifact must explicitly name the traditional concept, candidate metric ref, source refs, methodology ref, rationale, and falsifiable correspondence claim; geometric plausibility or shared wording alone is not provenance.',
  }),
  Object.freeze({
    key: 'independent_blinded_expert_operationalization' as const,
    state: 'required_not_satisfied' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'Independent reviewers using source-grounded instructions must operationalize the traditional concept while blinded from metric values, candidate thresholds, peer labels, and fortune output; the evidence must satisfy the repository blinded_expert_operationalization contract.',
  }),
  Object.freeze({
    key: 'repeat_capture_stability' as const,
    state: 'required_not_satisfied' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'The exact candidate metric must have repeat_capture_stability evidence from governed independent recapture and quality-control protocol before semantic mapping admission can be considered.',
  }),
  Object.freeze({
    key: 'source_grounded_construct_correspondence' as const,
    state: 'required_not_satisfied' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'The mapping review must show that blinded source-grounded concept labels correspond to the candidate metric as the hypothesized construct rather than merely asserting geometric resemblance; abstention and disagreement must remain observable.',
  }),
  Object.freeze({
    key: 'alternative_metric_and_confound_rejection' as const,
    state: 'required_not_satisfied' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'The evidence must test plausible alternative neutral metrics and documented capture or geometry confounds so that admission cannot rest on an arbitrary correlated metric or a nuisance factor.',
  }),
  Object.freeze({
    key: 'end_to_end_evidence_traceability' as const,
    state: 'required_not_satisfied' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'Every mapping-review input must be traceable through exact traditional source refs, methodology or hypothesis ref, neutral metric ref, protocol refs, dataset version, provenance refs, and reviewed evidence refs without free-text substitution.',
  }),
  Object.freeze({
    key: 'explicit_mapping_acceptance_or_rejection_decision' as const,
    state: 'required_not_satisfied' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'A dedicated reviewed mapping decision must explicitly accept or reject the exact concept-to-metric relation and cite the complete admitted evidence set; evidence presence alone cannot self-promote the binding.',
  }),
  Object.freeze({
    key: 'fail_closed_completeness' as const,
    state: 'required_not_satisfied' as const,
    requiredBeforeMappingAdmission: true as const,
    requirement: 'If any required evidence, provenance link, independent review, alternative/confound check, or explicit decision authority is missing or not reviewed, the mapping decision must remain not_admitted.',
  }),
] as const);

export interface FR185MappingCandidateBoundaryV1 {
  readonly traditionalConcept: '細' | '長';
  readonly candidateMetricRef: typeof FR184_XI_METRIC_REF | typeof FR184_CHANG_METRIC_REF;
  readonly candidateOnly: true;
  readonly mappingRelationRef: null;
  readonly traditionalBindingRef: null;
  readonly directionality: null;
  readonly stableCriterionId: null;
  readonly thresholdRef: null;
  readonly calibrationRef: null;
  readonly classifierRef: null;
  readonly mappingAuthorized: false;
}

export interface FR185AuthorityBoundaryV1 {
  readonly mappingEvidenceRequirementsDefined: true;
  readonly requirementsDefinitionAloneAuthorizesMappingReviewOutcome: false;
  readonly xiMetricBindingAuthorized: false;
  readonly changMetricBindingAuthorized: false;
  readonly metricDirectionalityAuthorized: false;
  readonly stableCriterionIdentityIssued: false;
  readonly thresholdIssued: false;
  readonly percentileIssued: false;
  readonly referencePopulationIssued: false;
  readonly calibrationEvidenceIssued: false;
  readonly calibrationProtocolIssued: false;
  readonly thresholdSelectionResultIssued: false;
  readonly calibratedDecisionRuleIssued: false;
  readonly classifierIssued: false;
  readonly scoreIssued: false;
  readonly rankIssued: false;
  readonly traditionalJiOperationalizationAuthorized: false;
  readonly traditionalCunMappingAuthorized: false;
  readonly compoundXiErChangRuleAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly structuredClaimsIssued: 0;
  readonly boundedNarrativesIssued: 0;
  readonly productionRuleAuthorized: false;
  readonly traditionalSemanticAuthorityPromoted: false;
}

export interface EyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185V1 {
  readonly schemaVersion: 'fr185-eye-pair-xi-chang-metric-to-concept-mapping-evidence-requirements-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR185_RECORD_ID;
  readonly authorityState: 'mapping_evidence_requirements_defined_no_mapping_admitted';
  readonly upstreamAuthority: {
    readonly fr176Verdict: typeof FR176_VERDICT;
    readonly fr180Verdict: typeof FR180_VERDICT;
    readonly fr182Verdict: typeof FR182_VERDICT;
    readonly fr183Verdict: typeof FR183_VERDICT;
    readonly fr184Verdict: typeof FR184_VERDICT;
    readonly fr184NextFrontier: typeof FR184_NEXT_FRONTIER;
    readonly exactFR176DarumaEyeScanPage: 146;
    readonly exactFR176DarumaEyePageImageRef: typeof FR182_PAGE_146_REF;
    readonly exactFR176DarumaEyePageImageSha256: typeof FR182_PAGE_146_IMAGE_SHA256;
  };
  readonly mappingCandidates: readonly [
    FR185MappingCandidateBoundaryV1,
    FR185MappingCandidateBoundaryV1,
  ];
  readonly evidenceRequirements: typeof FR185_MAPPING_EVIDENCE_REQUIREMENTS;
  readonly evidenceClassSeparation: {
    readonly existingCalibrationEvidenceClasses: typeof FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES;
    readonly repeatCaptureStabilityRequiredBeforeMappingAdmission: true;
    readonly blindedExpertOperationalizationRequiredBeforeMappingAdmission: true;
    readonly thresholdSelectionResultIsLaterCalibrationEvidence: true;
    readonly thresholdSelectionResultRequiredToDefineMappingRequirements: false;
    readonly thresholdSelectionResultIssuedByFR185: false;
    readonly metricDirectionalityMayBeInferredFromMappingEvidence: false;
    readonly calibrationMayBeginFromRequirementsDefinitionAlone: false;
  };
  readonly traceabilityRequirements: {
    readonly exactTraditionalSourceRefsRequired: true;
    readonly exactMethodologyOrHypothesisRefRequired: true;
    readonly exactNeutralMetricRefRequired: true;
    readonly protocolRefsRequiredForHumanDerivedEvidence: true;
    readonly datasetVersionRequiredForHumanDerivedEvidence: true;
    readonly provenanceRefsRequired: true;
    readonly reviewedEvidenceRefsRequiredForDecision: true;
    readonly translationMaySubstituteForDirectSource: false;
    readonly secondarySourceMaySubstituteForDirectSource: false;
  };
  readonly blockerAccounting: {
    readonly resolvedExistingFR184Blockers: readonly [];
    readonly remainingBlockers: typeof FR183_REMAINING_BLOCKERS;
    readonly mappingRequirementsDefinitionDoesNotResolveMappingBlocker: true;
    readonly mappingRequirementsDefinitionDoesNotResolveDirectionalityBlocker: true;
    readonly mappingRequirementsDefinitionDoesNotResolveCalibrationBlockers: true;
    readonly mappingRequirementsDefinitionDoesNotResolveCompoundBlocker: true;
  };
  readonly authorityBoundary: FR185AuthorityBoundaryV1;
  readonly privacyBoundary: {
    readonly participantDataCollected: false;
    readonly participantImageAccepted: false;
    readonly rawProviderResponseAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly metricValuesPersisted: false;
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly verdict: typeof FR185_VERDICT;
  readonly researchNoteRef: typeof FR185_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR185_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-185 ${message}`);
}

function exactStringArray(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

export function assertFR185EvidenceRequirementSet(
  requirements: readonly FR185MappingEvidenceRequirementV1[],
): void {
  if (requirements.length !== FR185_MAPPING_EVIDENCE_REQUIREMENTS.length) {
    fail('mapping evidence requirement count drift.');
  }
  for (let index = 0; index < FR185_MAPPING_EVIDENCE_REQUIREMENTS.length; index += 1) {
    const actual = requirements[index];
    const expected = FR185_MAPPING_EVIDENCE_REQUIREMENTS[index];
    if (
      actual === undefined
      || expected === undefined
      || actual.key !== expected.key
      || actual.state !== expected.state
      || actual.requiredBeforeMappingAdmission !== true
      || actual.requirement !== expected.requirement
    ) fail('mapping evidence requirement content drift.');
  }
}

export function assertFR185MappingCandidateBoundary(candidate: FR185MappingCandidateBoundaryV1): void {
  if (
    candidate.candidateOnly !== true
    || candidate.mappingRelationRef !== null
    || candidate.traditionalBindingRef !== null
    || candidate.directionality !== null
    || candidate.stableCriterionId !== null
    || candidate.thresholdRef !== null
    || candidate.calibrationRef !== null
    || candidate.classifierRef !== null
    || candidate.mappingAuthorized !== false
  ) fail('actual metric-to-concept mapping injection detected.');
}

export function assertFR185AuthorityBoundary(boundary: FR185AuthorityBoundaryV1): void {
  if (
    boundary.mappingEvidenceRequirementsDefined !== true
    || boundary.requirementsDefinitionAloneAuthorizesMappingReviewOutcome !== false
    || boundary.xiMetricBindingAuthorized !== false
    || boundary.changMetricBindingAuthorized !== false
    || boundary.metricDirectionalityAuthorized !== false
    || boundary.stableCriterionIdentityIssued !== false
    || boundary.thresholdIssued !== false
    || boundary.percentileIssued !== false
    || boundary.referencePopulationIssued !== false
    || boundary.calibrationEvidenceIssued !== false
    || boundary.calibrationProtocolIssued !== false
    || boundary.thresholdSelectionResultIssued !== false
    || boundary.calibratedDecisionRuleIssued !== false
    || boundary.classifierIssued !== false
    || boundary.scoreIssued !== false
    || boundary.rankIssued !== false
    || boundary.traditionalJiOperationalizationAuthorized !== false
    || boundary.traditionalCunMappingAuthorized !== false
    || boundary.compoundXiErChangRuleAuthorized !== false
    || boundary.morphologyProduced !== false
    || boundary.criterionStatesIssued !== 0
    || boundary.structuredClaimsIssued !== 0
    || boundary.boundedNarrativesIssued !== 0
    || boundary.productionRuleAuthorized !== false
    || boundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('authority widening detected.');
}

function validateUpstreamAuthority(): void {
  const fr176 = issueDarumaEyeMorphologySourceReviewFR176();
  assertIssuedDarumaEyeMorphologySourceReviewFR176(fr176);
  if (
    fr176.verdict !== FR176_VERDICT
    || fr176.source.workRef !== 'work.shenxiang_quanbian'
    || fr176.source.witnessId !== 'witness.shenxiang_quanbian.nlc_1925'
    || !FR176_DIRECT_SELECTED_WITNESS_CLAUSES.includes('細而長')
    || !FR176_DIRECT_SELECTED_WITNESS_CLAUSES.includes('目長一寸')
    || fr176.decisionBoundary.directBindingCandidateFound !== false
    || fr176.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('FR-176 direct-source boundary drift.');

  const fr182 = issueEyePairFR176DarumaEyeExactScanPagePinningFR182();
  assertIssuedEyePairFR176DarumaEyeExactScanPagePinningFR182(fr182);
  if (
    fr182.verdict !== FR182_VERDICT
    || fr182.locatorClosure.exactDarumaEyeScanPage !== 146
    || fr182.visualReview.selectedImmutablePageImageRef !== FR182_PAGE_146_REF
    || fr182.visualReview.selectedImmutablePageImageSha256 !== FR182_PAGE_146_IMAGE_SHA256
    || FR182_FROZEN_EVIDENCE_MANIFEST.exactScanPage !== 146
    || FR182_FROZEN_EVIDENCE_MANIFEST.visualPassageMatchConfirmed !== true
    || fr182.authorityBoundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('FR-182 exact-page provenance boundary drift.');

  const fr180 = issueEyePairXiChangOperationalizationRequirementsFR180();
  assertIssuedEyePairXiChangOperationalizationRequirementsFR180(fr180);
  if (
    fr180.verdict !== FR180_VERDICT
    || !exactStringArray(fr180.calibrationFramework.requiredEvidenceClasses, FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES)
    || fr180.calibrationFramework.eyePairCoveredEvidenceCount !== 0
    || fr180.calibrationFramework.eyePairCaptureProtocolCount !== 0
    || fr180.calibrationFramework.eyePairLabelingProtocolCount !== 0
    || fr180.calibrationFramework.eyePairStudyCount !== 0
    || fr180.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('FR-180 operationalization requirements boundary drift.');

  const fr183 = issueEyePairXiChangOperationalizationRequirementsRereviewFR183();
  assertIssuedEyePairXiChangOperationalizationRequirementsRereviewFR183(fr183);
  if (
    fr183.verdict !== FR183_VERDICT
    || fr183.remainingBlockers !== FR183_REMAINING_BLOCKERS
    || fr183.remainingBlockers.length !== 13
    || fr183.authorityBoundary.metricDirectionalityAuthorized !== false
    || fr183.authorityBoundary.productionRuleAuthorized !== false
  ) fail('FR-183 blocker or authority boundary drift.');

  const fr184 = issueEyePairXiChangMetricToConceptMappingFeasibilityFR184();
  assertIssuedEyePairXiChangMetricToConceptMappingFeasibilityFR184(fr184);
  if (
    fr184.verdict !== FR184_VERDICT
    || fr184.nextFrontier !== FR184_NEXT_FRONTIER
    || FR184_NEXT_FRONTIER !== 'define_source_authorized_xi_chang_metric_to_concept_mapping_evidence_requirements_before_directionality_or_calibration'
    || fr184.xiMappingReview.candidateMetricRef !== FR184_XI_METRIC_REF
    || fr184.changMappingReview.candidateMetricRef !== FR184_CHANG_METRIC_REF
    || fr184.xiMappingReview.sourceAuthorizedMetricRelationFound !== false
    || fr184.changMappingReview.sourceAuthorizedMetricRelationFound !== false
    || fr184.xiMappingReview.mappingGaps !== FR184_MAPPING_GAPS.xi
    || fr184.changMappingReview.mappingGaps !== FR184_MAPPING_GAPS.chang
    || fr184.resolvedByFR184.length !== 0
    || fr184.remainingBlockers !== FR183_REMAINING_BLOCKERS
    || fr184.authorityBoundary.metricDirectionalityAuthorized !== false
    || fr184.authorityBoundary.productionRuleAuthorized !== false
    || fr184.authorityBoundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('FR-184 mapping feasibility boundary drift.');
}

export function issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185(): EyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185V1 {
  validateUpstreamAuthority();

  const mappingCandidates = Object.freeze([
    Object.freeze({
      traditionalConcept: '細' as const,
      candidateMetricRef: FR184_XI_METRIC_REF,
      candidateOnly: true as const,
      mappingRelationRef: null,
      traditionalBindingRef: null,
      directionality: null,
      stableCriterionId: null,
      thresholdRef: null,
      calibrationRef: null,
      classifierRef: null,
      mappingAuthorized: false as const,
    }),
    Object.freeze({
      traditionalConcept: '長' as const,
      candidateMetricRef: FR184_CHANG_METRIC_REF,
      candidateOnly: true as const,
      mappingRelationRef: null,
      traditionalBindingRef: null,
      directionality: null,
      stableCriterionId: null,
      thresholdRef: null,
      calibrationRef: null,
      classifierRef: null,
      mappingAuthorized: false as const,
    }),
  ] as const);
  for (const candidate of mappingCandidates) assertFR185MappingCandidateBoundary(candidate);
  assertFR185EvidenceRequirementSet(FR185_MAPPING_EVIDENCE_REQUIREMENTS);

  const authorityBoundary: FR185AuthorityBoundaryV1 = Object.freeze({
    mappingEvidenceRequirementsDefined: true as const,
    requirementsDefinitionAloneAuthorizesMappingReviewOutcome: false as const,
    xiMetricBindingAuthorized: false as const,
    changMetricBindingAuthorized: false as const,
    metricDirectionalityAuthorized: false as const,
    stableCriterionIdentityIssued: false as const,
    thresholdIssued: false as const,
    percentileIssued: false as const,
    referencePopulationIssued: false as const,
    calibrationEvidenceIssued: false as const,
    calibrationProtocolIssued: false as const,
    thresholdSelectionResultIssued: false as const,
    calibratedDecisionRuleIssued: false as const,
    classifierIssued: false as const,
    scoreIssued: false as const,
    rankIssued: false as const,
    traditionalJiOperationalizationAuthorized: false as const,
    traditionalCunMappingAuthorized: false as const,
    compoundXiErChangRuleAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    structuredClaimsIssued: 0 as const,
    boundedNarrativesIssued: 0 as const,
    productionRuleAuthorized: false as const,
    traditionalSemanticAuthorityPromoted: false as const,
  });
  assertFR185AuthorityBoundary(authorityBoundary);

  const result: EyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185V1 = Object.freeze({
    schemaVersion: 'fr185-eye-pair-xi-chang-metric-to-concept-mapping-evidence-requirements-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR185_RECORD_ID,
    authorityState: 'mapping_evidence_requirements_defined_no_mapping_admitted' as const,
    upstreamAuthority: Object.freeze({
      fr176Verdict: FR176_VERDICT,
      fr180Verdict: FR180_VERDICT,
      fr182Verdict: FR182_VERDICT,
      fr183Verdict: FR183_VERDICT,
      fr184Verdict: FR184_VERDICT,
      fr184NextFrontier: FR184_NEXT_FRONTIER,
      exactFR176DarumaEyeScanPage: 146 as const,
      exactFR176DarumaEyePageImageRef: FR182_PAGE_146_REF,
      exactFR176DarumaEyePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
    }),
    mappingCandidates,
    evidenceRequirements: FR185_MAPPING_EVIDENCE_REQUIREMENTS,
    evidenceClassSeparation: Object.freeze({
      existingCalibrationEvidenceClasses: FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES,
      repeatCaptureStabilityRequiredBeforeMappingAdmission: true as const,
      blindedExpertOperationalizationRequiredBeforeMappingAdmission: true as const,
      thresholdSelectionResultIsLaterCalibrationEvidence: true as const,
      thresholdSelectionResultRequiredToDefineMappingRequirements: false as const,
      thresholdSelectionResultIssuedByFR185: false as const,
      metricDirectionalityMayBeInferredFromMappingEvidence: false as const,
      calibrationMayBeginFromRequirementsDefinitionAlone: false as const,
    }),
    traceabilityRequirements: Object.freeze({
      exactTraditionalSourceRefsRequired: true as const,
      exactMethodologyOrHypothesisRefRequired: true as const,
      exactNeutralMetricRefRequired: true as const,
      protocolRefsRequiredForHumanDerivedEvidence: true as const,
      datasetVersionRequiredForHumanDerivedEvidence: true as const,
      provenanceRefsRequired: true as const,
      reviewedEvidenceRefsRequiredForDecision: true as const,
      translationMaySubstituteForDirectSource: false as const,
      secondarySourceMaySubstituteForDirectSource: false as const,
    }),
    blockerAccounting: Object.freeze({
      resolvedExistingFR184Blockers: Object.freeze([] as const),
      remainingBlockers: FR183_REMAINING_BLOCKERS,
      mappingRequirementsDefinitionDoesNotResolveMappingBlocker: true as const,
      mappingRequirementsDefinitionDoesNotResolveDirectionalityBlocker: true as const,
      mappingRequirementsDefinitionDoesNotResolveCalibrationBlockers: true as const,
      mappingRequirementsDefinitionDoesNotResolveCompoundBlocker: true as const,
    }),
    authorityBoundary,
    privacyBoundary: Object.freeze({
      participantDataCollected: false as const,
      participantImageAccepted: false as const,
      rawProviderResponseAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      metricValuesPersisted: false as const,
      faceEmbeddingAccepted: false as const,
      identityTemplateAccepted: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    verdict: FR185_VERDICT,
    researchNoteRef: FR185_RESEARCH_NOTE_REF,
    nextFrontier: FR185_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185(
  result: EyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185V1,
): void {
  if (!ISSUED.has(result)) fail('mapping evidence requirements artifact was not issued by the active FR-185 boundary.');
  assertFR185EvidenceRequirementSet(result.evidenceRequirements);
  for (const candidate of result.mappingCandidates) assertFR185MappingCandidateBoundary(candidate);
  assertFR185AuthorityBoundary(result.authorityBoundary);
  if (
    result.schemaVersion !== 'fr185-eye-pair-xi-chang-metric-to-concept-mapping-evidence-requirements-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR185_RECORD_ID
    || result.authorityState !== 'mapping_evidence_requirements_defined_no_mapping_admitted'
    || result.mappingCandidates[0].traditionalConcept !== '細'
    || result.mappingCandidates[0].candidateMetricRef !== FR184_XI_METRIC_REF
    || result.mappingCandidates[1].traditionalConcept !== '長'
    || result.mappingCandidates[1].candidateMetricRef !== FR184_CHANG_METRIC_REF
    || result.evidenceClassSeparation.existingCalibrationEvidenceClasses !== FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES
    || result.evidenceClassSeparation.thresholdSelectionResultIsLaterCalibrationEvidence !== true
    || result.blockerAccounting.resolvedExistingFR184Blockers.length !== 0
    || result.blockerAccounting.remainingBlockers !== FR183_REMAINING_BLOCKERS
    || result.verdict !== FR185_VERDICT
    || result.researchNoteRef !== FR185_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR185_NEXT_FRONTIER
  ) fail('issued mapping evidence requirements artifact drift.');
}
