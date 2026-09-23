import {
  FR104_NLC_INTAKE_PAGE_VERIFICATION,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';
import {
  FR117_NLC_WITNESS_QUALIFIED_PASSAGE,
} from './five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-fr117.js';
import {
  assertIssuedSquareBroadFangApprovedGovernanceFR140,
  materializeSquareBroadFangApprovedGovernanceFR140,
} from './five-officers-square-broad-fang-approved-governance-materialization-fr140.js';
import {
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141,
  assessSquareBroadFangSourceLineageConstructRefinementFR141,
} from './five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.js';
import {
  getSquareBroadFangNeutralCandidateMetricDefinitionsFR142,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import {
  FE041F_CANDIDATE_METRIC_REFS,
  FE041F_SATISFIED_MAPPING_EVIDENCE_KEYS,
  FE041F_UNSATISFIED_MAPPING_EVIDENCE_KEYS,
  FE041F_NEXT_FRONTIER,
  assertIssuedSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F,
  issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F,
} from './square-broad-fang-mapping-evidence-governance-reuse-review-fe041f.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE041G_RECORD_ID =
  'research.face_reading.square_broad_fang.mapping_hypothesis_provenance.fe041g' as const;
export const FE041G_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fe041g-square-broad-fang-mapping-hypothesis-provenance.md' as const;
export const FE041G_METHOD_REF =
  'repo:research/face-reading/fe041g-square-broad-fang-mapping-hypothesis-provenance.md#governed-hypothesis-method' as const;
export const FE041G_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT =
  'explicit_mapping_hypothesis_provenance' as const;
export const FE041G_NEXT_FRONTIER =
  'define_square_broad_fang_blinded_expert_operationalization_protocol_and_neutral_candidate_canonicalization_policy_as_separate_lanes_before_evidence_collection_directionality_or_calibration' as const;

const CRITERION_REF = 'criterion.intake.square_broad' as const;
const SOURCE_CONCEPT = '方大' as const;
const FOCAL_TRADITIONAL_TERM = '方' as const;
const SOURCE_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const SOURCE_WITNESS_ID = 'witness.shenxiang_quanbian.nlc_1925' as const;
const SOURCE_CHAPTER = '出納官' as const;
const SOURCE_SCAN_PAGE = 88 as const;
const SOURCE_TEXT = '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' as const;
const SOURCE_CLAUSE = '口須要方大' as const;
const REVIEWED_METHODOLOGY_REF =
  'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;

export const FE041G_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS = Object.freeze([
  'independent_blinded_expert_operationalization',
  'repeat_capture_stability',
  'source_grounded_construct_correspondence',
  'alternative_metric_and_confound_rejection',
  'end_to_end_evidence_traceability',
  'explicit_mapping_acceptance_or_rejection_decision',
  'fail_closed_completeness',
] as const);

export type FE041GCandidateMetricRef =
  typeof FE041F_CANDIDATE_METRIC_REFS[number];

export interface SquareBroadFangMappingHypothesisFE041GV1 {
  readonly hypothesisId:
    | 'research.face_reading.square_broad_fang.mapping_hypothesis.horizontal_reflection.fe041g.v1'
    | 'research.face_reading.square_broad_fang.mapping_hypothesis.orthogonal_orientation.fe041g.v1'
    | 'research.face_reading.square_broad_fang.mapping_hypothesis.turning_concentration.fe041g.v1';
  readonly criterionRef: typeof CRITERION_REF;
  readonly sourceConcept: typeof SOURCE_CONCEPT;
  readonly focalTraditionalTerm: typeof FOCAL_TRADITIONAL_TERM;
  readonly constructFacet:
    | 'structural_regularity_and_alignment'
    | 'rectilinear_segment_persistence'
    | 'localized_corner_distinctness_supporting_later_commentary';
  readonly candidateMetricRef: FE041GCandidateMetricRef;
  readonly candidateMetricFamily:
    | 'structural_regularity_and_alignment'
    | 'rectilinear_segment_persistence_continuous_surrogate'
    | 'localized_corner_distinctness_supporting_later_commentary';
  readonly sourcePassageRef: typeof SOURCE_PASSAGE_REF;
  readonly sourceWitnessId: typeof SOURCE_WITNESS_ID;
  readonly sourceChapter: typeof SOURCE_CHAPTER;
  readonly sourceScanPage: typeof SOURCE_SCAN_PAGE;
  readonly sourceVerificationStatus: 'scan_checked';
  readonly sourceText: typeof SOURCE_TEXT;
  readonly sourceClause: typeof SOURCE_CLAUSE;
  readonly reviewedMethodologyRef: typeof REVIEWED_METHODOLOGY_REF;
  readonly methodologyRef: typeof FE041G_METHOD_REF;
  readonly sourceLineageConflictPreserved: true;
  readonly provenanceState: 'governed_pre_evidence_hypothesis';
  readonly rationale: string;
  readonly falsifiableNonDirectionalClaim: string;
  readonly rejectionConditions: readonly string[];
  readonly frozenBeforeEvidenceCollection: true;
  readonly postHocMutationAuthorized: false;
  readonly directionality: null;
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
  readonly candidateCanonicalized: false;
}

const SHARED_REJECTION_CONDITIONS = Object.freeze([
  'blinded_source_grounded_operationalization_does_not_yield_reproducible_fang_labels',
  'candidate_metric_fails_governed_repeat_capture_stability',
  'prespecified_alternative_metric_or_confound_explains_correspondence_equally_or_better',
] as const);

export const FE041G_MAPPING_HYPOTHESES: readonly SquareBroadFangMappingHypothesisFE041GV1[] =
  Object.freeze([
    Object.freeze({
      hypothesisId:
        'research.face_reading.square_broad_fang.mapping_hypothesis.horizontal_reflection.fe041g.v1' as const,
      criterionRef: CRITERION_REF,
      sourceConcept: SOURCE_CONCEPT,
      focalTraditionalTerm: FOCAL_TRADITIONAL_TERM,
      constructFacet: 'structural_regularity_and_alignment' as const,
      candidateMetricRef: FE041F_CANDIDATE_METRIC_REFS[0],
      candidateMetricFamily: 'structural_regularity_and_alignment' as const,
      sourcePassageRef: SOURCE_PASSAGE_REF,
      sourceWitnessId: SOURCE_WITNESS_ID,
      sourceChapter: SOURCE_CHAPTER,
      sourceScanPage: SOURCE_SCAN_PAGE,
      sourceVerificationStatus: 'scan_checked' as const,
      sourceText: SOURCE_TEXT,
      sourceClause: SOURCE_CLAUSE,
      reviewedMethodologyRef: REVIEWED_METHODOLOGY_REF,
      methodologyRef: FE041G_METHOD_REF,
      sourceLineageConflictPreserved: true as const,
      provenanceState: 'governed_pre_evidence_hypothesis' as const,
      rationale:
        'FR141 recommends contour correspondence only as a 方 research candidate facet, and FR142 implements this exact role-invariant horizontal-reflection residual as neutral geometry. FE041G freezes that exact metric for later testing; source-grounded design and geometric plausibility are not traditional binding authority.',
      falsifiableNonDirectionalClaim:
        'Under a future governed blinded source-grounded operationalization, labels for 方 may show reproducible correspondence with this exact structural-regularity candidate metric. No higher-or-lower direction is asserted. Failure of label reproducibility, repeat-capture stability, or prespecified alternative/confound rejection rejects the hypothesis.',
      rejectionConditions: SHARED_REJECTION_CONDITIONS,
      frozenBeforeEvidenceCollection: true as const,
      postHocMutationAuthorized: false as const,
      directionality: null,
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
      candidateCanonicalized: false as const,
    }),
    Object.freeze({
      hypothesisId:
        'research.face_reading.square_broad_fang.mapping_hypothesis.orthogonal_orientation.fe041g.v1' as const,
      criterionRef: CRITERION_REF,
      sourceConcept: SOURCE_CONCEPT,
      focalTraditionalTerm: FOCAL_TRADITIONAL_TERM,
      constructFacet: 'rectilinear_segment_persistence' as const,
      candidateMetricRef: FE041F_CANDIDATE_METRIC_REFS[1],
      candidateMetricFamily: 'rectilinear_segment_persistence_continuous_surrogate' as const,
      sourcePassageRef: SOURCE_PASSAGE_REF,
      sourceWitnessId: SOURCE_WITNESS_ID,
      sourceChapter: SOURCE_CHAPTER,
      sourceScanPage: SOURCE_SCAN_PAGE,
      sourceVerificationStatus: 'scan_checked' as const,
      sourceText: SOURCE_TEXT,
      sourceClause: SOURCE_CLAUSE,
      reviewedMethodologyRef: REVIEWED_METHODOLOGY_REF,
      methodologyRef: FE041G_METHOD_REF,
      sourceLineageConflictPreserved: true as const,
      provenanceState: 'governed_pre_evidence_hypothesis' as const,
      rationale:
        'FR141 recommends rectilinear-segment persistence only as a 方 research candidate facet, and FR142 implements this exact continuous orthogonal edge-orientation concentration surrogate. FE041G freezes the surrogate for testing only; it is not a traditional definition of 方.',
      falsifiableNonDirectionalClaim:
        'Under a future governed blinded source-grounded operationalization, labels for 方 may show reproducible correspondence with this exact rectilinear-persistence surrogate. No higher-or-lower direction is asserted. Failure of label reproducibility, repeat-capture stability, or prespecified alternative/confound rejection rejects the hypothesis.',
      rejectionConditions: SHARED_REJECTION_CONDITIONS,
      frozenBeforeEvidenceCollection: true as const,
      postHocMutationAuthorized: false as const,
      directionality: null,
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
      candidateCanonicalized: false as const,
    }),
    Object.freeze({
      hypothesisId:
        'research.face_reading.square_broad_fang.mapping_hypothesis.turning_concentration.fe041g.v1' as const,
      criterionRef: CRITERION_REF,
      sourceConcept: SOURCE_CONCEPT,
      focalTraditionalTerm: FOCAL_TRADITIONAL_TERM,
      constructFacet: 'localized_corner_distinctness_supporting_later_commentary' as const,
      candidateMetricRef: FE041F_CANDIDATE_METRIC_REFS[2],
      candidateMetricFamily:
        'localized_corner_distinctness_supporting_later_commentary' as const,
      sourcePassageRef: SOURCE_PASSAGE_REF,
      sourceWitnessId: SOURCE_WITNESS_ID,
      sourceChapter: SOURCE_CHAPTER,
      sourceScanPage: SOURCE_SCAN_PAGE,
      sourceVerificationStatus: 'scan_checked' as const,
      sourceText: SOURCE_TEXT,
      sourceClause: SOURCE_CLAUSE,
      reviewedMethodologyRef: REVIEWED_METHODOLOGY_REF,
      methodologyRef: FE041G_METHOD_REF,
      sourceLineageConflictPreserved: true as const,
      provenanceState: 'governed_pre_evidence_hypothesis' as const,
      rationale:
        'FR141 permits localized-corner distinctness only as a supporting research facet under preserved source-lineage conflict, and FR142 implements this exact turning-angle concentration metric without naming traditional mouth corners. FE041G freezes it for testing only; later commentary does not override the primary passage.',
      falsifiableNonDirectionalClaim:
        'Under a future governed blinded source-grounded operationalization, labels for 方 may show reproducible correspondence with this exact localized-direction-change candidate metric. No higher-or-lower direction or named-corner equivalence is asserted. Failure of label reproducibility, repeat-capture stability, or prespecified alternative/confound rejection rejects the hypothesis.',
      rejectionConditions: SHARED_REJECTION_CONDITIONS,
      frozenBeforeEvidenceCollection: true as const,
      postHocMutationAuthorized: false as const,
      directionality: null,
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
      candidateCanonicalized: false as const,
    }),
  ]);

export interface SquareBroadFangMappingHypothesisProvenanceFE041GV1 {
  readonly schemaVersion:
    'fe041g-square-broad-fang-mapping-hypothesis-provenance-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FE041G_RECORD_ID;
  readonly authorityState:
    'governed_pre_evidence_fang_mapping_hypotheses_established_no_mapping_or_canonicalization_admitted';
  readonly target: Readonly<{
    criterionRef: typeof CRITERION_REF;
    sourceConcept: typeof SOURCE_CONCEPT;
    focalTraditionalTerm: typeof FOCAL_TRADITIONAL_TERM;
  }>;
  readonly upstreamAuthority: Readonly<{
    fe041fNextFrontier: typeof FE041F_NEXT_FRONTIER;
    sourcePassageRef: typeof SOURCE_PASSAGE_REF;
    sourceWitnessId: typeof SOURCE_WITNESS_ID;
    sourceScanPage: typeof SOURCE_SCAN_PAGE;
    sourceVerificationStatus: 'scan_checked';
    reviewedMethodologyRef: typeof REVIEWED_METHODOLOGY_REF;
    sourceLineageConflictPreserved: true;
  }>;
  readonly hypotheses: typeof FE041G_MAPPING_HYPOTHESES;
  readonly evidenceProgression: Readonly<{
    newlySatisfiedRequirement:
      typeof FE041G_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT;
    satisfiedRequirementKeys: readonly [
      'source_concept_identity_and_pinned_provenance',
      'candidate_neutral_metric_identity_and_versioned_definition',
      'explicit_mapping_hypothesis_provenance',
    ];
    remainingUnsatisfiedRequirements:
      typeof FE041G_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS;
    mappingEvidenceRequirementCount: 10;
    satisfiedRequirementCount: 3;
    unsatisfiedRequirementCount: 7;
    actualMappingAdmitted: false;
  }>;
  readonly neutralCanonicalizationLane: Readonly<{
    currentCanonicalRegistryContract:
      'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1';
    candidateCanonicalIntersectionCount: 0;
    mutateCurrentRegistryInPlaceAuthorized: false;
    newNeutralMetricRequiresNewContractVersion: true;
    candidateCanonicalizationPolicyDefined: false;
    candidateCanonicalizationAuthorized: false;
    successorRegistryIssued: false;
  }>;
  readonly authorityBoundary: Readonly<{
    mappingHypothesisProvenanceEstablished: true;
    hypothesisProvenanceCountsAsEvidenceRequirementSatisfaction: true;
    hypothesisProvenanceAloneAuthorizesMapping: false;
    evidenceCollectionAuthorized: false;
    blindedExpertOperationalizationProtocolIssued: false;
    mappingRelationIssued: false;
    traditionalFangBindingIssued: false;
    metricDirectionalityIssued: false;
    thresholdIssued: false;
    percentileIssued: false;
    referencePopulationIssued: false;
    calibrationEvidenceIssued: false;
    calibrationProtocolIssued: false;
    classifierIssued: false;
    scoreIssued: false;
    rankIssued: false;
    candidateCanonicalizationIssued: false;
    deterministicCriterionStateIssued: false;
    ruleAuthorityIssued: false;
    structuredClaimIssued: false;
    narrativeAuthorityIssued: false;
    productionSemanticExecutionAuthorized: false;
    traditionalSemanticAuthorityPromoted: false;
  }>;
  readonly privacyBoundary: Readonly<{
    participantDataCollected: false;
    participantImagesAccepted: false;
    expertLabelsCollected: false;
    rawLandmarksAccepted: false;
    metricValuesObserved: false;
    faceEmbeddingAccepted: false;
    identityTemplateAccepted: false;
    biometricIdentityMatchingPerformed: false;
  }>;
  readonly researchNoteRef: typeof FE041G_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FE041G_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FE041G ' + message);
}

function sameStrings(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  return actual.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

function validateUpstream(): void {
  const fe041f =
    issueSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F();
  assertIssuedSquareBroadFangMappingEvidenceGovernanceReuseReviewFE041F(
    fe041f,
  );
  if (
    fe041f.nextFrontier !== FE041F_NEXT_FRONTIER ||
    fe041f.evidenceProgression.satisfiedRequirementCount !== 2 ||
    fe041f.evidenceProgression.unsatisfiedRequirementCount !== 8 ||
    !sameStrings(
      fe041f.evidenceProgression.satisfiedRequirementKeys,
      FE041F_SATISFIED_MAPPING_EVIDENCE_KEYS,
    ) ||
    !sameStrings(
      fe041f.evidenceProgression.unsatisfiedRequirementKeys,
      FE041F_UNSATISFIED_MAPPING_EVIDENCE_KEYS,
    ) ||
    !fe041f.evidenceProgression.unsatisfiedRequirementKeys.includes(
      FE041G_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT,
    ) ||
    fe041f.mappingAuthorityBoundary.mappingRelationIssued !== false ||
    fe041f.mappingAuthorityBoundary.traditionalFangBindingIssued !== false ||
    fe041f.neutralCanonicalizationLane.candidateCanonicalizationAuthorized !==
      false
  ) {
    fail('FE041F predecessor boundary drift.');
  }

  const fr140 = materializeSquareBroadFangApprovedGovernanceFR140();
  assertIssuedSquareBroadFangApprovedGovernanceFR140(fr140);
  if (
    fr140.target.criterionRef !== CRITERION_REF ||
    fr140.target.sourceConcept !== SOURCE_CONCEPT ||
    fr140.methodologyDecision.reviewedSuccessorRef !==
      REVIEWED_METHODOLOGY_REF ||
    fr140.methodologyDecision.sourceRefsSnapshot.length !== 1 ||
    fr140.methodologyDecision.sourceRefsSnapshot[0] !== SOURCE_PASSAGE_REF ||
    fr140.collectionGate.humanSemanticCollectionAuthorized !== false ||
    fr140.execution.empiricalSemanticLabelsIssued !== 0 ||
    fr140.execution.traditionalMetricBindingsIssued !== 0
  ) {
    fail('FR140 reviewed-methodology or collection boundary drift.');
  }

  if (
    FR104_NLC_INTAKE_PAGE_VERIFICATION.witnessId !== SOURCE_WITNESS_ID ||
    FR104_NLC_INTAKE_PAGE_VERIFICATION.chapter !== SOURCE_CHAPTER ||
    FR104_NLC_INTAKE_PAGE_VERIFICATION.scanPage !== SOURCE_SCAN_PAGE ||
    FR104_NLC_INTAKE_PAGE_VERIFICATION.originalText !== SOURCE_TEXT ||
    FR104_NLC_INTAKE_PAGE_VERIFICATION.state !== 'scan_checked' ||
    !FR104_NLC_INTAKE_PAGE_VERIFICATION.originalText.includes(SOURCE_CLAUSE)
  ) {
    fail('FR104 direct-source passage provenance drift.');
  }
  if (
    FR117_NLC_WITNESS_QUALIFIED_PASSAGE.passageId !== SOURCE_PASSAGE_REF ||
    FR117_NLC_WITNESS_QUALIFIED_PASSAGE.witnessId !== SOURCE_WITNESS_ID ||
    FR117_NLC_WITNESS_QUALIFIED_PASSAGE.chapter !== SOURCE_CHAPTER ||
    FR117_NLC_WITNESS_QUALIFIED_PASSAGE.scanPage !== SOURCE_SCAN_PAGE ||
    FR117_NLC_WITNESS_QUALIFIED_PASSAGE.originalText !== SOURCE_TEXT ||
    FR117_NLC_WITNESS_QUALIFIED_PASSAGE.verificationStatus !== 'scan_checked'
  ) {
    fail('FR117 witness-qualified source passage drift.');
  }

  const fr141 = assessSquareBroadFangSourceLineageConstructRefinementFR141();
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141(fr141);
  if (
    fr141.target.authoritativeSourceRef !== SOURCE_PASSAGE_REF ||
    fr141.sourceLineageFindings.taxonomyConflictPresent !== true ||
    fr141.sourceLineageFindings.fangEqualsSiziKouEstablished !== false ||
    fr141.sourceLineageFindings.fourCornerFangLengIsPrimaryTargetDefinition !==
      false ||
    fr141.constructRefinement.upperLowerContourCorrespondenceCandidateRecommended !==
      true ||
    fr141.constructRefinement.rectilinearSegmentPersistenceCandidateRecommended !==
      true ||
    fr141.constructRefinement.localizedCornerGeometryCandidateRecommended !==
      true ||
    fr141.constructRefinement.directAspectRatioProxyForFangAuthorized !==
      false ||
    fr141.constructRefinement.directMouthWidthProxyForFangAuthorized !== false
  ) {
    fail('FR141 source-lineage or candidate-facet boundary drift.');
  }

  const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
  if (
    definitions.length !== 3 ||
    !sameStrings(
      definitions.map((entry) => entry.metricRef),
      FE041F_CANDIDATE_METRIC_REFS,
    ) ||
    definitions[0]?.candidateFamily !==
      'structural_regularity_and_alignment' ||
    definitions[1]?.candidateFamily !==
      'rectilinear_segment_persistence_continuous_surrogate' ||
    definitions[2]?.candidateFamily !==
      'localized_corner_distinctness_supporting_later_commentary' ||
    definitions.some(
      (entry) =>
        entry.traditionalCriterionBindingRef !== null ||
        entry.calibrationRef !== null ||
        entry.numericClassificationThreshold !== null,
    )
  ) {
    fail('FR142 exact candidate metric definitions drift.');
  }
}

export function assertFE041GMappingHypothesis(
  actual: SquareBroadFangMappingHypothesisFE041GV1,
  expected: SquareBroadFangMappingHypothesisFE041GV1,
): void {
  if (
    actual.hypothesisId !== expected.hypothesisId ||
    actual.criterionRef !== expected.criterionRef ||
    actual.sourceConcept !== expected.sourceConcept ||
    actual.focalTraditionalTerm !== expected.focalTraditionalTerm ||
    actual.constructFacet !== expected.constructFacet ||
    actual.candidateMetricRef !== expected.candidateMetricRef ||
    actual.candidateMetricFamily !== expected.candidateMetricFamily ||
    actual.sourcePassageRef !== expected.sourcePassageRef ||
    actual.sourceWitnessId !== expected.sourceWitnessId ||
    actual.sourceChapter !== expected.sourceChapter ||
    actual.sourceScanPage !== expected.sourceScanPage ||
    actual.sourceVerificationStatus !== expected.sourceVerificationStatus ||
    actual.sourceText !== expected.sourceText ||
    actual.sourceClause !== expected.sourceClause ||
    actual.reviewedMethodologyRef !== expected.reviewedMethodologyRef ||
    actual.methodologyRef !== expected.methodologyRef ||
    actual.sourceLineageConflictPreserved !== true ||
    actual.provenanceState !== 'governed_pre_evidence_hypothesis' ||
    actual.rationale !== expected.rationale ||
    actual.falsifiableNonDirectionalClaim !==
      expected.falsifiableNonDirectionalClaim ||
    !sameStrings(actual.rejectionConditions, expected.rejectionConditions) ||
    actual.frozenBeforeEvidenceCollection !== true ||
    actual.postHocMutationAuthorized !== false ||
    actual.directionality !== null ||
    actual.thresholdRef !== null ||
    actual.percentileRef !== null ||
    actual.referencePopulationRef !== null ||
    actual.calibrationRef !== null ||
    actual.classifierRef !== null ||
    actual.mappingRelationRef !== null ||
    actual.traditionalBindingRef !== null ||
    actual.evidenceCollected !== false ||
    actual.expertLabelsCollected !== false ||
    actual.metricValuesObserved !== false ||
    actual.mappingAuthorized !== false ||
    actual.candidateCanonicalized !== false
  ) {
    fail('hypothesis provenance drift or authority widening.');
  }
}

export function issueSquareBroadFangMappingHypothesisProvenanceFE041G():
SquareBroadFangMappingHypothesisProvenanceFE041GV1 {
  validateUpstream();
  for (const hypothesis of FE041G_MAPPING_HYPOTHESES) {
    assertFE041GMappingHypothesis(hypothesis, hypothesis);
  }

  const result: SquareBroadFangMappingHypothesisProvenanceFE041GV1 =
    Object.freeze({
      schemaVersion:
        'fe041g-square-broad-fang-mapping-hypothesis-provenance-v1' as const,
      artifactVersion: '0.1.0' as const,
      recordId: FE041G_RECORD_ID,
      authorityState:
        'governed_pre_evidence_fang_mapping_hypotheses_established_no_mapping_or_canonicalization_admitted' as const,
      target: Object.freeze({
        criterionRef: CRITERION_REF,
        sourceConcept: SOURCE_CONCEPT,
        focalTraditionalTerm: FOCAL_TRADITIONAL_TERM,
      }),
      upstreamAuthority: Object.freeze({
        fe041fNextFrontier: FE041F_NEXT_FRONTIER,
        sourcePassageRef: SOURCE_PASSAGE_REF,
        sourceWitnessId: SOURCE_WITNESS_ID,
        sourceScanPage: SOURCE_SCAN_PAGE,
        sourceVerificationStatus: 'scan_checked' as const,
        reviewedMethodologyRef: REVIEWED_METHODOLOGY_REF,
        sourceLineageConflictPreserved: true as const,
      }),
      hypotheses: FE041G_MAPPING_HYPOTHESES,
      evidenceProgression: Object.freeze({
        newlySatisfiedRequirement:
          FE041G_NEWLY_SATISFIED_EVIDENCE_REQUIREMENT,
        satisfiedRequirementKeys: Object.freeze([
          'source_concept_identity_and_pinned_provenance',
          'candidate_neutral_metric_identity_and_versioned_definition',
          'explicit_mapping_hypothesis_provenance',
        ] as const),
        remainingUnsatisfiedRequirements:
          FE041G_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
        mappingEvidenceRequirementCount: 10 as const,
        satisfiedRequirementCount: 3 as const,
        unsatisfiedRequirementCount: 7 as const,
        actualMappingAdmitted: false as const,
      }),
      neutralCanonicalizationLane: Object.freeze({
        currentCanonicalRegistryContract:
          'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1' as const,
        candidateCanonicalIntersectionCount: 0 as const,
        mutateCurrentRegistryInPlaceAuthorized: false as const,
        newNeutralMetricRequiresNewContractVersion: true as const,
        candidateCanonicalizationPolicyDefined: false as const,
        candidateCanonicalizationAuthorized: false as const,
        successorRegistryIssued: false as const,
      }),
      authorityBoundary: Object.freeze({
        mappingHypothesisProvenanceEstablished: true as const,
        hypothesisProvenanceCountsAsEvidenceRequirementSatisfaction:
          true as const,
        hypothesisProvenanceAloneAuthorizesMapping: false as const,
        evidenceCollectionAuthorized: false as const,
        blindedExpertOperationalizationProtocolIssued: false as const,
        mappingRelationIssued: false as const,
        traditionalFangBindingIssued: false as const,
        metricDirectionalityIssued: false as const,
        thresholdIssued: false as const,
        percentileIssued: false as const,
        referencePopulationIssued: false as const,
        calibrationEvidenceIssued: false as const,
        calibrationProtocolIssued: false as const,
        classifierIssued: false as const,
        scoreIssued: false as const,
        rankIssued: false as const,
        candidateCanonicalizationIssued: false as const,
        deterministicCriterionStateIssued: false as const,
        ruleAuthorityIssued: false as const,
        structuredClaimIssued: false as const,
        narrativeAuthorityIssued: false as const,
        productionSemanticExecutionAuthorized: false as const,
        traditionalSemanticAuthorityPromoted: false as const,
      }),
      privacyBoundary: Object.freeze({
        participantDataCollected: false as const,
        participantImagesAccepted: false as const,
        expertLabelsCollected: false as const,
        rawLandmarksAccepted: false as const,
        metricValuesObserved: false as const,
        faceEmbeddingAccepted: false as const,
        identityTemplateAccepted: false as const,
        biometricIdentityMatchingPerformed: false as const,
      }),
      researchNoteRef: FE041G_RESEARCH_NOTE_REF,
      nextFrontier: FE041G_NEXT_FRONTIER,
    });

  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadFangMappingHypothesisProvenanceFE041G(
  value: SquareBroadFangMappingHypothesisProvenanceFE041GV1,
): void {
  if (!ISSUED.has(value)) {
    fail('artifact was not issued by FE041G authority.');
  }
  if (
    value.hypotheses !== FE041G_MAPPING_HYPOTHESES ||
    value.evidenceProgression.satisfiedRequirementCount !== 3 ||
    value.evidenceProgression.unsatisfiedRequirementCount !== 7 ||
    value.evidenceProgression.actualMappingAdmitted !== false ||
    value.neutralCanonicalizationLane.candidateCanonicalizationAuthorized !==
      false ||
    value.authorityBoundary.mappingRelationIssued !== false ||
    value.authorityBoundary.traditionalFangBindingIssued !== false ||
    value.authorityBoundary.metricDirectionalityIssued !== false ||
    value.authorityBoundary.thresholdIssued !== false ||
    value.authorityBoundary.productionSemanticExecutionAuthorized !== false ||
    value.nextFrontier !== FE041G_NEXT_FRONTIER
  ) {
    fail('issued artifact authority drift.');
  }
}
