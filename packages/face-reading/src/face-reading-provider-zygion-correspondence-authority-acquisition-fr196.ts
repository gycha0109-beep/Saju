import {
  FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195,
  assertFaceReadingProviderZygionCorrespondenceAuditFR195,
} from './face-reading-cheek-mid-face-provider-correspondence-audit-fr195.js';

export type ProviderZygionAuthorityEvidenceClassFR196 =
  | 'provider_source'
  | 'official_documentation'
  | 'peer_reviewed_provider_use'
  | 'neutral_anatomy';

export interface ProviderZygionAuthorityAcquisitionEvidenceFR196 {
  readonly evidenceId: string;
  readonly evidenceClass: ProviderZygionAuthorityEvidenceClassFR196;
  readonly title: string;
  readonly sourceRef: string;
  readonly reviewedOn: '2026-09-18';
  readonly supportsProviderPairCandidate: boolean;
  readonly supportsNeutralZygionConcept: boolean;
  readonly sourceGovernedProviderZygionSemanticsSupplied: boolean;
  readonly independentlyValidatedProviderToZygionCorrespondenceSupplied: boolean;
  readonly providerSideSemanticValidationSupplied: boolean;
  readonly authorityContribution: string;
  readonly limitations: readonly string[];
}

export interface FaceReadingProviderZygionAuthorityAcquisitionFR196 {
  readonly schemaVersion: 'fr196-v1';
  readonly contractId: 'face_reading_provider_zygion_authority_acquisition_fr196';
  readonly contractVersion: 'FR196-PROVIDER-ZYGION-AUTHORITY-ACQUISITION-v1';
  readonly baselineMainSha: '06cb490a931da5e1d01c902c1db3a0aed31e7645';
  readonly authorityState: 'external_authority_exhausted_candidate_supported_direct_validation_required';
  readonly upstreamFR195: {
    readonly moduleRef: 'packages/face-reading/src/face-reading-cheek-mid-face-provider-correspondence-audit-fr195.ts';
    readonly contractId: 'face_reading_provider_zygion_correspondence_audit_fr195';
    readonly contractVersion: 'FR195-PROVIDER-ZYGION-CORRESPONDENCE-AUDIT-v1';
    readonly authorityState: 'provider_pair_candidate_supported_zygion_correspondence_unresolved';
    readonly nextFrontier: 'obtain_source_governed_or_independently_validated_provider_to_zygion_correspondence_before_any_provider_index_admission';
  };
  readonly reviewedSearchScope: {
    readonly providerRepository: 'google-ai-edge/mediapipe';
    readonly providerTag: 'v0.10.35';
    readonly providerSourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts';
    readonly providerTopologySymbol: 'FACE_LANDMARKS_FACE_OVAL';
    readonly officialFaceLandmarkerDocumentationReviewed: true;
    readonly repositoryWideZygionSemanticSearchFoundMapping: false;
    readonly peerReviewedProviderUseReviewed: true;
    readonly neutralAnthropometryReviewed: true;
  };
  readonly evidence: readonly ProviderZygionAuthorityAcquisitionEvidenceFR196[];
  readonly candidatePair: {
    readonly providerIndices: readonly [234, 454];
    readonly providerRole: 'bilateral_lateral_facial_width_proxy_candidate';
    readonly pairOrderHasSemanticMeaning: false;
    readonly inheritedFromFR195: true;
    readonly providerIndexAdmissionAuthorized: false;
    readonly providerSideAssignmentAuthorized: false;
  };
  readonly verdict: {
    readonly authorityAcquisitionVerdict: 'candidate_evidence_found_but_validation_insufficient';
    readonly sourceGovernedZygionMappingFound: false;
    readonly independentProviderToZygionValidationFound: false;
    readonly peerReviewedProviderWidthCandidateEvidenceExists: true;
    readonly neutralZygionAnatomyEvidenceExists: true;
    readonly providerToNeutralZygionCorrespondence: 'blocked';
  };
  readonly authorityBoundary: {
    readonly provider234IsZygion: false;
    readonly provider454IsZygion: false;
    readonly providerPairOrderMeansAnatomicalLaterality: false;
    readonly providerIndexAdmissionAuthorized: false;
    readonly providerSideAssignmentAuthorized: false;
    readonly bizygomaticMetricAuthorized: false;
    readonly cheekBoundaryAuthorized: false;
    readonly cheekSubgraphAuthorized: false;
    readonly cheekGeometryAuthorized: false;
    readonly thresholdAuthorized: false;
    readonly calibrationAuthorized: false;
    readonly classifierAuthorized: false;
    readonly captureSufficiencyAuthorized: false;
    readonly participantOrExpertCollectionAuthorized: false;
    readonly traditionalProjectionAuthorized: false;
    readonly productionActivationAuthorized: false;
    readonly commerceActivationAuthorized: false;
  };
  readonly readiness: {
    readonly reviewedExternalAuthoritySearchClosed: true;
    readonly providerCandidateEvidenceReady: true;
    readonly directCorrespondenceAuthorityReady: false;
    readonly providerIndexAdmissionReady: false;
    readonly executableCheekGeometryReady: false;
    readonly coverageStateRemains: 'coverage_target_unverified';
    readonly nextRequiredGate: 'independent_provider_to_neutral_zygion_validation_protocol_definition';
  };
  readonly nextFrontier: 'define_independent_provider_to_neutral_zygion_validation_protocol_before_any_provider_index_admission';
}

const EVIDENCE: readonly ProviderZygionAuthorityAcquisitionEvidenceFR196[] = Object.freeze([
  Object.freeze({
    evidenceId: 'evidence.fr196.mediapipe_v0_10_35_face_oval_source',
    evidenceClass: 'provider_source' as const,
    title: 'MediaPipe v0.10.35 FACE_LANDMARKS_FACE_OVAL source',
    sourceRef: 'https://github.com/google-ai-edge/mediapipe/blob/v0.10.35/mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts',
    reviewedOn: '2026-09-18' as const,
    supportsProviderPairCandidate: true,
    supportsNeutralZygionConcept: false,
    sourceGovernedProviderZygionSemanticsSupplied: false,
    independentlyValidatedProviderToZygionCorrespondenceSupplied: false,
    providerSideSemanticValidationSupplied: false,
    authorityContribution: 'Confirms only that provider vertices 234 and 454 are release-exact members of the published face-oval topology.',
    limitations: Object.freeze([
      'The source labels the structure as face oval, not anthropometric zygion.',
      'No per-index zygion semantic assignment is published for 234 or 454.',
      'Topology membership does not establish anatomical correspondence.',
    ]),
  }),
  Object.freeze({
    evidenceId: 'evidence.fr196.official_face_landmarker_documentation',
    evidenceClass: 'official_documentation' as const,
    title: 'Google MediaPipe Face Landmarker official documentation',
    sourceRef: 'https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker',
    reviewedOn: '2026-09-18' as const,
    supportsProviderPairCandidate: false,
    supportsNeutralZygionConcept: false,
    sourceGovernedProviderZygionSemanticsSupplied: false,
    independentlyValidatedProviderToZygionCorrespondenceSupplied: false,
    providerSideSemanticValidationSupplied: false,
    authorityContribution: 'Documents dense 3D face-mesh output and broad facial-region semantics without publishing an anthropometric zygion mapping for provider indices 234 or 454.',
    limitations: Object.freeze([
      'The documentation does not enumerate 234 or 454 as zygion.',
      'Broad semantic regions and rendered keypoint maps are not per-index anthropometric authority.',
      'Current documentation cannot widen the pinned v0.10.35 source semantics.',
    ]),
  }),
  Object.freeze({
    evidenceId: 'evidence.fr196.dat_2025_provider_width_proxy',
    evidenceClass: 'peer_reviewed_provider_use' as const,
    title: 'AI-Assisted Fusion Technique for Orthodontic Diagnosis Between Cone-Beam Computed Tomography and Face Scan Data',
    sourceRef: 'doi:10.3390/bioengineering12090975;pmcid:PMC12467118',
    reviewedOn: '2026-09-18' as const,
    supportsProviderPairCandidate: true,
    supportsNeutralZygionConcept: false,
    sourceGovernedProviderZygionSemanticsSupplied: false,
    independentlyValidatedProviderToZygionCorrespondenceSupplied: false,
    providerSideSemanticValidationSupplied: false,
    authorityContribution: 'Supports use of MediaPipe 234 and 454 as a bilateral facial-width proxy for pose/scale normalization.',
    limitations: Object.freeze([
      'The study does not compare 234 or 454 against independently labelled zygion ground truth.',
      'Facial-width proxy use is not anthropometric zygion validation.',
      'The study does not authorize provider-side anatomical semantics for MyeongHa.',
    ]),
  }),
  Object.freeze({
    evidenceId: 'evidence.fr196.anas_2019_neutral_zygion',
    evidenceClass: 'neutral_anatomy' as const,
    title: 'A comparison between 2D and 3D methods of quantifying facial morphology',
    sourceRef: 'doi:10.1016/j.heliyon.2019.e01880;pmcid:PMC6579906',
    reviewedOn: '2026-09-18' as const,
    supportsProviderPairCandidate: false,
    supportsNeutralZygionConcept: true,
    sourceGovernedProviderZygionSemanticsSupplied: false,
    independentlyValidatedProviderToZygionCorrespondenceSupplied: false,
    providerSideSemanticValidationSupplied: false,
    authorityContribution: 'Supplies neutral anthropometric zygion anatomy independently of MediaPipe provider semantics.',
    limitations: Object.freeze([
      'The study does not use MediaPipe indices 234 or 454.',
      'Neutral landmark definition alone cannot create provider correspondence.',
      'No reproducible cross-system provider-to-zygion validation is supplied.',
    ]),
  }),
]);

export const FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196: FaceReadingProviderZygionAuthorityAcquisitionFR196 = Object.freeze({
  schemaVersion: 'fr196-v1' as const,
  contractId: 'face_reading_provider_zygion_authority_acquisition_fr196' as const,
  contractVersion: 'FR196-PROVIDER-ZYGION-AUTHORITY-ACQUISITION-v1' as const,
  baselineMainSha: '06cb490a931da5e1d01c902c1db3a0aed31e7645' as const,
  authorityState: 'external_authority_exhausted_candidate_supported_direct_validation_required' as const,
  upstreamFR195: Object.freeze({
    moduleRef: 'packages/face-reading/src/face-reading-cheek-mid-face-provider-correspondence-audit-fr195.ts' as const,
    contractId: 'face_reading_provider_zygion_correspondence_audit_fr195' as const,
    contractVersion: 'FR195-PROVIDER-ZYGION-CORRESPONDENCE-AUDIT-v1' as const,
    authorityState: 'provider_pair_candidate_supported_zygion_correspondence_unresolved' as const,
    nextFrontier: 'obtain_source_governed_or_independently_validated_provider_to_zygion_correspondence_before_any_provider_index_admission' as const,
  }),
  reviewedSearchScope: Object.freeze({
    providerRepository: 'google-ai-edge/mediapipe' as const,
    providerTag: 'v0.10.35' as const,
    providerSourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts' as const,
    providerTopologySymbol: 'FACE_LANDMARKS_FACE_OVAL' as const,
    officialFaceLandmarkerDocumentationReviewed: true as const,
    repositoryWideZygionSemanticSearchFoundMapping: false as const,
    peerReviewedProviderUseReviewed: true as const,
    neutralAnthropometryReviewed: true as const,
  }),
  evidence: EVIDENCE,
  candidatePair: Object.freeze({
    providerIndices: Object.freeze([234, 454] as const),
    providerRole: 'bilateral_lateral_facial_width_proxy_candidate' as const,
    pairOrderHasSemanticMeaning: false as const,
    inheritedFromFR195: true as const,
    providerIndexAdmissionAuthorized: false as const,
    providerSideAssignmentAuthorized: false as const,
  }),
  verdict: Object.freeze({
    authorityAcquisitionVerdict: 'candidate_evidence_found_but_validation_insufficient' as const,
    sourceGovernedZygionMappingFound: false as const,
    independentProviderToZygionValidationFound: false as const,
    peerReviewedProviderWidthCandidateEvidenceExists: true as const,
    neutralZygionAnatomyEvidenceExists: true as const,
    providerToNeutralZygionCorrespondence: 'blocked' as const,
  }),
  authorityBoundary: Object.freeze({
    provider234IsZygion: false as const,
    provider454IsZygion: false as const,
    providerPairOrderMeansAnatomicalLaterality: false as const,
    providerIndexAdmissionAuthorized: false as const,
    providerSideAssignmentAuthorized: false as const,
    bizygomaticMetricAuthorized: false as const,
    cheekBoundaryAuthorized: false as const,
    cheekSubgraphAuthorized: false as const,
    cheekGeometryAuthorized: false as const,
    thresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    classifierAuthorized: false as const,
    captureSufficiencyAuthorized: false as const,
    participantOrExpertCollectionAuthorized: false as const,
    traditionalProjectionAuthorized: false as const,
    productionActivationAuthorized: false as const,
    commerceActivationAuthorized: false as const,
  }),
  readiness: Object.freeze({
    reviewedExternalAuthoritySearchClosed: true as const,
    providerCandidateEvidenceReady: true as const,
    directCorrespondenceAuthorityReady: false as const,
    providerIndexAdmissionReady: false as const,
    executableCheekGeometryReady: false as const,
    coverageStateRemains: 'coverage_target_unverified' as const,
    nextRequiredGate: 'independent_provider_to_neutral_zygion_validation_protocol_definition' as const,
  }),
  nextFrontier: 'define_independent_provider_to_neutral_zygion_validation_protocol_before_any_provider_index_admission' as const,
});

export function assertFaceReadingProviderZygionAuthorityAcquisitionFR196(
  value: FaceReadingProviderZygionAuthorityAcquisitionFR196,
): FaceReadingProviderZygionAuthorityAcquisitionFR196 {
  assertFaceReadingProviderZygionCorrespondenceAuditFR195(FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195);

  if (
    value.schemaVersion !== 'fr196-v1' ||
    value.contractId !== 'face_reading_provider_zygion_authority_acquisition_fr196' ||
    value.contractVersion !== 'FR196-PROVIDER-ZYGION-AUTHORITY-ACQUISITION-v1' ||
    value.baselineMainSha !== '06cb490a931da5e1d01c902c1db3a0aed31e7645' ||
    value.authorityState !== 'external_authority_exhausted_candidate_supported_direct_validation_required'
  ) throw new Error('fr196_identity_or_baseline_drift');

  if (
    value.upstreamFR195.contractId !== 'face_reading_provider_zygion_correspondence_audit_fr195' ||
    value.upstreamFR195.contractVersion !== 'FR195-PROVIDER-ZYGION-CORRESPONDENCE-AUDIT-v1' ||
    value.upstreamFR195.authorityState !== 'provider_pair_candidate_supported_zygion_correspondence_unresolved' ||
    value.upstreamFR195.nextFrontier !== 'obtain_source_governed_or_independently_validated_provider_to_zygion_correspondence_before_any_provider_index_admission'
  ) throw new Error('fr196_upstream_fr195_drift');

  const scope = value.reviewedSearchScope;
  if (
    scope.providerRepository !== 'google-ai-edge/mediapipe' ||
    scope.providerTag !== 'v0.10.35' ||
    scope.providerSourcePath !== 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts' ||
    scope.providerTopologySymbol !== 'FACE_LANDMARKS_FACE_OVAL' ||
    scope.officialFaceLandmarkerDocumentationReviewed !== true ||
    scope.repositoryWideZygionSemanticSearchFoundMapping !== false ||
    scope.peerReviewedProviderUseReviewed !== true ||
    scope.neutralAnthropometryReviewed !== true
  ) throw new Error('fr196_search_scope_drift_or_promotion');

  const expectedEvidence = [
    ['evidence.fr196.mediapipe_v0_10_35_face_oval_source', 'provider_source'],
    ['evidence.fr196.official_face_landmarker_documentation', 'official_documentation'],
    ['evidence.fr196.dat_2025_provider_width_proxy', 'peer_reviewed_provider_use'],
    ['evidence.fr196.anas_2019_neutral_zygion', 'neutral_anatomy'],
  ] as const;

  if (value.evidence.length !== expectedEvidence.length) throw new Error('fr196_evidence_membership_drift');
  value.evidence.forEach((entry, index) => {
    const expected = expectedEvidence[index];
    if (
      expected === undefined ||
      entry.evidenceId !== expected[0] ||
      entry.evidenceClass !== expected[1] ||
      entry.reviewedOn !== '2026-09-18' ||
      entry.sourceGovernedProviderZygionSemanticsSupplied !== false ||
      entry.independentlyValidatedProviderToZygionCorrespondenceSupplied !== false ||
      entry.providerSideSemanticValidationSupplied !== false ||
      entry.limitations.length < 3
    ) throw new Error('fr196_evidence_drift_or_authority_promotion');
  });

  if (
    value.evidence[0]?.supportsProviderPairCandidate !== true || value.evidence[0]?.supportsNeutralZygionConcept !== false ||
    value.evidence[1]?.supportsProviderPairCandidate !== false || value.evidence[1]?.supportsNeutralZygionConcept !== false ||
    value.evidence[2]?.supportsProviderPairCandidate !== true || value.evidence[2]?.supportsNeutralZygionConcept !== false ||
    value.evidence[3]?.supportsProviderPairCandidate !== false || value.evidence[3]?.supportsNeutralZygionConcept !== true
  ) throw new Error('fr196_evidence_scope_conflation');

  const candidate = value.candidatePair;
  if (
    candidate.providerIndices.length !== 2 || candidate.providerIndices[0] !== 234 || candidate.providerIndices[1] !== 454 ||
    candidate.providerRole !== 'bilateral_lateral_facial_width_proxy_candidate' ||
    candidate.pairOrderHasSemanticMeaning !== false || candidate.inheritedFromFR195 !== true ||
    candidate.providerIndexAdmissionAuthorized !== false || candidate.providerSideAssignmentAuthorized !== false
  ) throw new Error('fr196_candidate_pair_drift_or_promotion');

  const verdict = value.verdict;
  if (
    verdict.authorityAcquisitionVerdict !== 'candidate_evidence_found_but_validation_insufficient' ||
    verdict.sourceGovernedZygionMappingFound !== false ||
    verdict.independentProviderToZygionValidationFound !== false ||
    verdict.peerReviewedProviderWidthCandidateEvidenceExists !== true ||
    verdict.neutralZygionAnatomyEvidenceExists !== true ||
    verdict.providerToNeutralZygionCorrespondence !== 'blocked'
  ) throw new Error('fr196_verdict_drift_or_authority_promotion');

  if (Object.values(value.authorityBoundary).some((flag) => flag !== false)) {
    throw new Error('fr196_authority_widening');
  }

  if (
    value.readiness.reviewedExternalAuthoritySearchClosed !== true ||
    value.readiness.providerCandidateEvidenceReady !== true ||
    value.readiness.directCorrespondenceAuthorityReady !== false ||
    value.readiness.providerIndexAdmissionReady !== false ||
    value.readiness.executableCheekGeometryReady !== false ||
    value.readiness.coverageStateRemains !== 'coverage_target_unverified' ||
    value.readiness.nextRequiredGate !== 'independent_provider_to_neutral_zygion_validation_protocol_definition'
  ) throw new Error('fr196_readiness_drift');

  if (
    value.nextFrontier !== 'define_independent_provider_to_neutral_zygion_validation_protocol_before_any_provider_index_admission'
  ) throw new Error('fr196_next_frontier_drift');

  return value;
}

const ISSUED = new WeakSet<object>();

export function issueFaceReadingProviderZygionAuthorityAcquisitionFR196(): FaceReadingProviderZygionAuthorityAcquisitionFR196 {
  const issued = Object.freeze({ ...FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196 });
  ISSUED.add(issued);
  return issued;
}

export function assertIssuedFaceReadingProviderZygionAuthorityAcquisitionFR196(
  value: FaceReadingProviderZygionAuthorityAcquisitionFR196,
): FaceReadingProviderZygionAuthorityAcquisitionFR196 {
  assertFaceReadingProviderZygionAuthorityAcquisitionFR196(value);
  if (!ISSUED.has(value)) throw new Error('fr196_unissued_provider_zygion_authority_acquisition');
  return value;
}
