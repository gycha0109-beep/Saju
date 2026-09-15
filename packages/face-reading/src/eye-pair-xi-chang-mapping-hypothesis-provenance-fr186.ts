import {
  FR182_PAGE_146_IMAGE_SHA256,
  FR182_PAGE_146_REF,
} from './eye-pair-fr176-daruma-eye-exact-scan-page-pinning-fr182.js';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import {
  FR184_CHANG_METRIC_REF,
  FR184_XI_METRIC_REF,
} from './eye-pair-xi-chang-metric-to-concept-mapping-feasibility-fr184.js';
import {
  assertIssuedEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185,
  FR185_NEXT_FRONTIER,
  FR185_REQUIRED_MAPPING_EVIDENCE_KEYS,
  FR185_VERDICT,
  issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185,
} from './eye-pair-xi-chang-metric-to-concept-mapping-evidence-requirements-fr185.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR186_RECORD_ID =
  'research.face_reading.eye_pair.xi_chang_mapping_hypothesis_provenance.fr186' as const;
export const FR186_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr186-eye-pair-xi-chang-mapping-hypothesis-provenance.md' as const;
export const FR186_METHOD_REF =
  'repo:research/face-reading/fr186-eye-pair-xi-chang-mapping-hypothesis-provenance.md#governed-hypothesis-method' as const;
export const FR186_VERDICT =
  'GOVERNED_XI_CHANG_MAPPING_HYPOTHESIS_PROVENANCE_ESTABLISHED_MAPPING_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED' as const;
export const FR186_NEXT_FRONTIER =
  'define_governed_blinded_expert_operationalization_protocol_for_xi_chang_mapping_hypotheses_before_evidence_collection_directionality_or_calibration' as const;

export const FR186_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT =
  'explicit_mapping_hypothesis_provenance' as const;
export const FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS = Object.freeze([
  'independent_blinded_expert_operationalization',
  'repeat_capture_stability',
  'source_grounded_construct_correspondence',
  'alternative_metric_and_confound_rejection',
  'end_to_end_evidence_traceability',
  'explicit_mapping_acceptance_or_rejection_decision',
  'fail_closed_completeness',
] as const);

export interface FR186MappingHypothesisV1 {
  readonly hypothesisId:
    | 'research.face_reading.xi_mapping_hypothesis.fr186.v1'
    | 'research.face_reading.chang_mapping_hypothesis.fr186.v1';
  readonly traditionalConcept: '細' | '長';
  readonly candidateMetricRef: typeof FR184_XI_METRIC_REF | typeof FR184_CHANG_METRIC_REF;
  readonly sourceWorkRef: 'work.shenxiang_quanbian';
  readonly sourceWitnessId: 'witness.shenxiang_quanbian.nlc_1925';
  readonly sourceClauses: readonly string[];
  readonly exactSourcePage: 146;
  readonly exactSourcePageImageRef: typeof FR182_PAGE_146_REF;
  readonly exactSourcePageImageSha256: typeof FR182_PAGE_146_IMAGE_SHA256;
  readonly methodologyRef: typeof FR186_METHOD_REF;
  readonly provenanceState: 'governed_pre_evidence_hypothesis';
  readonly rationale: string;
  readonly falsifiableNonDirectionalClaim: string;
  readonly rejectionConditions: readonly string[];
  readonly frozenBeforeEvidenceCollection: true;
  readonly postHocMutationAuthorized: false;
  readonly directionality: null;
  readonly stableCriterionId: null;
  readonly thresholdRef: null;
  readonly percentileRef: null;
  readonly referencePopulationRef: null;
  readonly calibrationRef: null;
  readonly classifierRef: null;
  readonly mappingRelationRef: null;
  readonly traditionalBindingRef: null;
  readonly evidenceCollected: false;
  readonly expertLabelsCollected: false;
  readonly metricValuesObserved: false;
  readonly mappingAuthorized: false;
}

export const FR186_MAPPING_HYPOTHESES: readonly FR186MappingHypothesisV1[] = Object.freeze([
  Object.freeze({
    hypothesisId: 'research.face_reading.xi_mapping_hypothesis.fr186.v1' as const,
    traditionalConcept: '細' as const,
    candidateMetricRef: FR184_XI_METRIC_REF,
    sourceWorkRef: 'work.shenxiang_quanbian' as const,
    sourceWitnessId: 'witness.shenxiang_quanbian.nlc_1925' as const,
    sourceClauses: Object.freeze(['細而長'] as const),
    exactSourcePage: 146 as const,
    exactSourcePageImageRef: FR182_PAGE_146_REF,
    exactSourcePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
    methodologyRef: FR186_METHOD_REF,
    provenanceState: 'governed_pre_evidence_hypothesis' as const,
    rationale: 'FR184 identified this exact versioned neutral Y-to-X span ratio only as a geometrically relevant candidate for future review. FR186 freezes it for testing because the candidate identity already exists in governed neutral geometry; this rationale is not source-authorized semantic binding.',
    falsifiableNonDirectionalClaim: 'Under a future governed blinded source-grounded operationalization, labels for 細 may show reproducible correspondence with this exact neutral candidate metric. Failure to obtain reproducible correspondence, failure of metric stability, or an equal-or-better explanation by prespecified alternatives or confounds rejects this hypothesis.',
    rejectionConditions: Object.freeze([
      'blinded_source_grounded_operationalization_does_not_yield_reproducible_xi_labels',
      'candidate_metric_fails_governed_repeat_capture_stability',
      'prespecified_alternative_metric_or_confound_explains_correspondence_equally_or_better',
    ] as const),
    frozenBeforeEvidenceCollection: true as const,
    postHocMutationAuthorized: false as const,
    directionality: null,
    stableCriterionId: null,
    thresholdRef: null,
    percentileRef: null,
    referencePopulationRef: null,
    calibrationRef: null,
    classifierRef: null,
    mappingRelationRef: null,
    traditionalBindingRef: null,
    evidenceCollected: false as const,
    expertLabelsCollected: false as const,
    metricValuesObserved: false as const,
    mappingAuthorized: false as const,
  }),
  Object.freeze({
    hypothesisId: 'research.face_reading.chang_mapping_hypothesis.fr186.v1' as const,
    traditionalConcept: '長' as const,
    candidateMetricRef: FR184_CHANG_METRIC_REF,
    sourceWorkRef: 'work.shenxiang_quanbian' as const,
    sourceWitnessId: 'witness.shenxiang_quanbian.nlc_1925' as const,
    sourceClauses: Object.freeze(['細而長', '目長一寸'] as const),
    exactSourcePage: 146 as const,
    exactSourcePageImageRef: FR182_PAGE_146_REF,
    exactSourcePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
    methodologyRef: FR186_METHOD_REF,
    provenanceState: 'governed_pre_evidence_hypothesis' as const,
    rationale: 'FR184 identified this exact versioned neutral normalized X-span metric only as a geometrically relevant candidate for future review. FR186 freezes it for testing because the candidate identity already exists in governed neutral geometry; neither the wording 長 nor traditional 寸 authorizes the normalized metric as a semantic binding.',
    falsifiableNonDirectionalClaim: 'Under a future governed blinded source-grounded operationalization, labels for 長 may show reproducible correspondence with this exact neutral candidate metric. Failure to obtain reproducible correspondence, failure of metric stability, or an equal-or-better explanation by prespecified alternatives or confounds rejects this hypothesis.',
    rejectionConditions: Object.freeze([
      'blinded_source_grounded_operationalization_does_not_yield_reproducible_chang_labels',
      'candidate_metric_fails_governed_repeat_capture_stability',
      'prespecified_alternative_metric_or_confound_explains_correspondence_equally_or_better',
    ] as const),
    frozenBeforeEvidenceCollection: true as const,
    postHocMutationAuthorized: false as const,
    directionality: null,
    stableCriterionId: null,
    thresholdRef: null,
    percentileRef: null,
    referencePopulationRef: null,
    calibrationRef: null,
    classifierRef: null,
    mappingRelationRef: null,
    traditionalBindingRef: null,
    evidenceCollected: false as const,
    expertLabelsCollected: false as const,
    metricValuesObserved: false as const,
    mappingAuthorized: false as const,
  }),
] as const);

export interface FR186AuthorityBoundaryV1 {
  readonly mappingHypothesisProvenanceEstablished: true;
  readonly hypothesisProvenanceCountsAsMappingEvidenceRequirementSatisfaction: true;
  readonly hypothesisProvenanceAloneAuthorizesMapping: false;
  readonly evidenceCollectionAuthorized: false;
  readonly blindedExpertOperationalizationProtocolIssued: false;
  readonly xiMetricBindingAuthorized: false;
  readonly changMetricBindingAuthorized: false;
  readonly metricDirectionalityAuthorized: false;
  readonly stableCriterionIdentityIssued: false;
  readonly thresholdIssued: false;
  readonly percentileIssued: false;
  readonly referencePopulationIssued: false;
  readonly calibrationEvidenceIssued: false;
  readonly calibrationProtocolIssued: false;
  readonly calibratedDecisionRuleIssued: false;
  readonly classifierIssued: false;
  readonly scoreIssued: false;
  readonly rankIssued: false;
  readonly traditionalCunMappingAuthorized: false;
  readonly compoundXiErChangRuleAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly structuredClaimsIssued: 0;
  readonly boundedNarrativesIssued: 0;
  readonly productionRuleAuthorized: false;
  readonly traditionalSemanticAuthorityPromoted: false;
}

export interface EyePairXiChangMappingHypothesisProvenanceFR186V1 {
  readonly schemaVersion: 'fr186-eye-pair-xi-chang-mapping-hypothesis-provenance-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR186_RECORD_ID;
  readonly authorityState: 'governed_mapping_hypothesis_provenance_established_no_mapping_admitted';
  readonly upstreamAuthority: {
    readonly fr185Verdict: typeof FR185_VERDICT;
    readonly fr185NextFrontier: typeof FR185_NEXT_FRONTIER;
    readonly fr185RequirementsRemainImmutable: true;
    readonly exactSourcePage: 146;
    readonly exactSourcePageImageRef: typeof FR182_PAGE_146_REF;
    readonly exactSourcePageImageSha256: typeof FR182_PAGE_146_IMAGE_SHA256;
  };
  readonly evidenceProgression: {
    readonly newlySatisfiedRequirement: typeof FR186_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT;
    readonly remainingUnsatisfiedRequirements: typeof FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS;
    readonly directionalityStillSeparate: true;
    readonly calibrationStillSeparate: true;
  };
  readonly hypotheses: typeof FR186_MAPPING_HYPOTHESES;
  readonly blockerAccounting: {
    readonly resolvedExistingFR184Blockers: readonly [];
    readonly remainingBlockers: typeof FR183_REMAINING_BLOCKERS;
    readonly hypothesisProvenanceDoesNotResolveMappingBlocker: true;
    readonly hypothesisProvenanceDoesNotResolveDirectionalityBlocker: true;
    readonly hypothesisProvenanceDoesNotResolveCalibrationBlockers: true;
    readonly hypothesisProvenanceDoesNotResolveCompoundBlocker: true;
  };
  readonly authorityBoundary: FR186AuthorityBoundaryV1;
  readonly privacyBoundary: {
    readonly participantDataCollected: false;
    readonly participantImageAccepted: false;
    readonly expertLabelsCollected: false;
    readonly rawProviderResponseAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly metricValuesObserved: false;
    readonly metricValuesPersisted: false;
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly verdict: typeof FR186_VERDICT;
  readonly researchNoteRef: typeof FR186_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR186_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-186 ${message}`);
}

function assertStringArrayEqual(actual: readonly string[], expected: readonly string[]): void {
  if (actual.length !== expected.length || actual.some((value, index) => value !== expected[index])) {
    fail('hypothesis list content drift.');
  }
}

export function assertFR186MappingHypothesis(
  actual: FR186MappingHypothesisV1,
  expected: FR186MappingHypothesisV1,
): void {
  if (
    actual.hypothesisId !== expected.hypothesisId
    || actual.traditionalConcept !== expected.traditionalConcept
    || actual.candidateMetricRef !== expected.candidateMetricRef
    || actual.sourceWorkRef !== expected.sourceWorkRef
    || actual.sourceWitnessId !== expected.sourceWitnessId
    || actual.exactSourcePage !== expected.exactSourcePage
    || actual.exactSourcePageImageRef !== expected.exactSourcePageImageRef
    || actual.exactSourcePageImageSha256 !== expected.exactSourcePageImageSha256
    || actual.methodologyRef !== expected.methodologyRef
    || actual.provenanceState !== expected.provenanceState
    || actual.rationale !== expected.rationale
    || actual.falsifiableNonDirectionalClaim !== expected.falsifiableNonDirectionalClaim
    || actual.frozenBeforeEvidenceCollection !== true
    || actual.postHocMutationAuthorized !== false
    || actual.directionality !== null
    || actual.stableCriterionId !== null
    || actual.thresholdRef !== null
    || actual.percentileRef !== null
    || actual.referencePopulationRef !== null
    || actual.calibrationRef !== null
    || actual.classifierRef !== null
    || actual.mappingRelationRef !== null
    || actual.traditionalBindingRef !== null
    || actual.evidenceCollected !== false
    || actual.expertLabelsCollected !== false
    || actual.metricValuesObserved !== false
    || actual.mappingAuthorized !== false
  ) fail('hypothesis authority widening or provenance drift.');
  assertStringArrayEqual(actual.sourceClauses, expected.sourceClauses);
  assertStringArrayEqual(actual.rejectionConditions, expected.rejectionConditions);
}

export function assertFR186AuthorityBoundary(boundary: FR186AuthorityBoundaryV1): void {
  if (
    boundary.mappingHypothesisProvenanceEstablished !== true
    || boundary.hypothesisProvenanceCountsAsMappingEvidenceRequirementSatisfaction !== true
    || boundary.hypothesisProvenanceAloneAuthorizesMapping !== false
    || boundary.evidenceCollectionAuthorized !== false
    || boundary.blindedExpertOperationalizationProtocolIssued !== false
    || boundary.xiMetricBindingAuthorized !== false
    || boundary.changMetricBindingAuthorized !== false
    || boundary.metricDirectionalityAuthorized !== false
    || boundary.stableCriterionIdentityIssued !== false
    || boundary.thresholdIssued !== false
    || boundary.percentileIssued !== false
    || boundary.referencePopulationIssued !== false
    || boundary.calibrationEvidenceIssued !== false
    || boundary.calibrationProtocolIssued !== false
    || boundary.calibratedDecisionRuleIssued !== false
    || boundary.classifierIssued !== false
    || boundary.scoreIssued !== false
    || boundary.rankIssued !== false
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
  const fr185 = issueEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185();
  assertIssuedEyePairXiChangMetricToConceptMappingEvidenceRequirementsFR185(fr185);
  const hypothesisRequirement = fr185.evidenceRequirements.find(
    (item) => item.key === FR186_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT,
  );
  if (
    fr185.verdict !== FR185_VERDICT
    || fr185.nextFrontier !== FR185_NEXT_FRONTIER
    || fr185.upstreamAuthority.exactFR176DarumaEyeScanPage !== 146
    || fr185.upstreamAuthority.exactFR176DarumaEyePageImageRef !== FR182_PAGE_146_REF
    || fr185.upstreamAuthority.exactFR176DarumaEyePageImageSha256 !== FR182_PAGE_146_IMAGE_SHA256
    || hypothesisRequirement?.state !== 'required_not_satisfied'
    || fr185.mappingCandidates[0].candidateMetricRef !== FR184_XI_METRIC_REF
    || fr185.mappingCandidates[1].candidateMetricRef !== FR184_CHANG_METRIC_REF
    || fr185.mappingCandidates.some((candidate) => candidate.mappingAuthorized !== false)
    || fr185.blockerAccounting.remainingBlockers !== FR183_REMAINING_BLOCKERS
    || fr185.authorityBoundary.metricDirectionalityAuthorized !== false
    || fr185.authorityBoundary.productionRuleAuthorized !== false
  ) fail('FR-185 prerequisite boundary drift.');
  if (!FR185_REQUIRED_MAPPING_EVIDENCE_KEYS.includes(FR186_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT)) {
    fail('FR-185 hypothesis provenance requirement missing.');
  }
}

export function issueEyePairXiChangMappingHypothesisProvenanceFR186(): EyePairXiChangMappingHypothesisProvenanceFR186V1 {
  validateUpstreamAuthority();
  for (let index = 0; index < FR186_MAPPING_HYPOTHESES.length; index += 1) {
    const hypothesis = FR186_MAPPING_HYPOTHESES[index];
    if (hypothesis === undefined) fail('canonical hypothesis missing.');
    assertFR186MappingHypothesis(hypothesis, hypothesis);
  }

  const result: EyePairXiChangMappingHypothesisProvenanceFR186V1 = Object.freeze({
    schemaVersion: 'fr186-eye-pair-xi-chang-mapping-hypothesis-provenance-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR186_RECORD_ID,
    authorityState: 'governed_mapping_hypothesis_provenance_established_no_mapping_admitted' as const,
    upstreamAuthority: Object.freeze({
      fr185Verdict: FR185_VERDICT,
      fr185NextFrontier: FR185_NEXT_FRONTIER,
      fr185RequirementsRemainImmutable: true as const,
      exactSourcePage: 146 as const,
      exactSourcePageImageRef: FR182_PAGE_146_REF,
      exactSourcePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
    }),
    evidenceProgression: Object.freeze({
      newlySatisfiedRequirement: FR186_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT,
      remainingUnsatisfiedRequirements: FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
      directionalityStillSeparate: true as const,
      calibrationStillSeparate: true as const,
    }),
    hypotheses: FR186_MAPPING_HYPOTHESES,
    blockerAccounting: Object.freeze({
      resolvedExistingFR184Blockers: Object.freeze([] as const),
      remainingBlockers: FR183_REMAINING_BLOCKERS,
      hypothesisProvenanceDoesNotResolveMappingBlocker: true as const,
      hypothesisProvenanceDoesNotResolveDirectionalityBlocker: true as const,
      hypothesisProvenanceDoesNotResolveCalibrationBlockers: true as const,
      hypothesisProvenanceDoesNotResolveCompoundBlocker: true as const,
    }),
    authorityBoundary: Object.freeze({
      mappingHypothesisProvenanceEstablished: true as const,
      hypothesisProvenanceCountsAsMappingEvidenceRequirementSatisfaction: true as const,
      hypothesisProvenanceAloneAuthorizesMapping: false as const,
      evidenceCollectionAuthorized: false as const,
      blindedExpertOperationalizationProtocolIssued: false as const,
      xiMetricBindingAuthorized: false as const,
      changMetricBindingAuthorized: false as const,
      metricDirectionalityAuthorized: false as const,
      stableCriterionIdentityIssued: false as const,
      thresholdIssued: false as const,
      percentileIssued: false as const,
      referencePopulationIssued: false as const,
      calibrationEvidenceIssued: false as const,
      calibrationProtocolIssued: false as const,
      calibratedDecisionRuleIssued: false as const,
      classifierIssued: false as const,
      scoreIssued: false as const,
      rankIssued: false as const,
      traditionalCunMappingAuthorized: false as const,
      compoundXiErChangRuleAuthorized: false as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      productionRuleAuthorized: false as const,
      traditionalSemanticAuthorityPromoted: false as const,
    }),
    privacyBoundary: Object.freeze({
      participantDataCollected: false as const,
      participantImageAccepted: false as const,
      expertLabelsCollected: false as const,
      rawProviderResponseAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      metricValuesObserved: false as const,
      metricValuesPersisted: false as const,
      faceEmbeddingAccepted: false as const,
      identityTemplateAccepted: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    verdict: FR186_VERDICT,
    researchNoteRef: FR186_RESEARCH_NOTE_REF,
    nextFrontier: FR186_NEXT_FRONTIER,
  });
  assertFR186AuthorityBoundary(result.authorityBoundary);
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairXiChangMappingHypothesisProvenanceFR186(
  value: EyePairXiChangMappingHypothesisProvenanceFR186V1,
): void {
  if (!ISSUED.has(value)) fail('artifact was not issued by FR-186 authority.');
  if (
    value.verdict !== FR186_VERDICT
    || value.nextFrontier !== FR186_NEXT_FRONTIER
    || value.hypotheses !== FR186_MAPPING_HYPOTHESES
    || value.blockerAccounting.remainingBlockers !== FR183_REMAINING_BLOCKERS
  ) fail('issued hypothesis provenance artifact drift.');
  assertFR186AuthorityBoundary(value.authorityBoundary);
}
