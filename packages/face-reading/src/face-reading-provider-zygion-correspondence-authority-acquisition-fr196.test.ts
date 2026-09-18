import { describe, expect, it } from 'vitest';
import {
  FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196,
  assertFaceReadingProviderZygionAuthorityAcquisitionFR196,
  assertIssuedFaceReadingProviderZygionAuthorityAcquisitionFR196,
  issueFaceReadingProviderZygionAuthorityAcquisitionFR196,
  type FaceReadingProviderZygionAuthorityAcquisitionFR196,
} from './face-reading-provider-zygion-correspondence-authority-acquisition-fr196.js';

function cloneAuthority(): FaceReadingProviderZygionAuthorityAcquisitionFR196 {
  return structuredClone(
    FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196,
  ) as FaceReadingProviderZygionAuthorityAcquisitionFR196;
}

describe('FR196 provider-to-neutral zygion authority acquisition audit', () => {
  it('consumes FR195 and pins the exact v0.10.35 provider search scope', () => {
    const authority = assertFaceReadingProviderZygionAuthorityAcquisitionFR196(
      FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196,
    );
    expect(authority.upstreamFR195.contractVersion).toBe(
      'FR195-PROVIDER-ZYGION-CORRESPONDENCE-AUDIT-v1',
    );
    expect(authority.reviewedSearchScope.providerRepository).toBe('google-ai-edge/mediapipe');
    expect(authority.reviewedSearchScope.providerTag).toBe('v0.10.35');
    expect(authority.reviewedSearchScope.providerTopologySymbol).toBe('FACE_LANDMARKS_FACE_OVAL');
    expect(authority.reviewedSearchScope.repositoryWideZygionSemanticSearchFoundMapping).toBe(false);
  });

  it('keeps evidence classes separate and admits no source beyond its scope', () => {
    const evidence = FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196.evidence;
    expect(evidence.map((entry) => entry.evidenceClass)).toEqual([
      'provider_source',
      'official_documentation',
      'peer_reviewed_provider_use',
      'neutral_anatomy',
    ]);
    expect(evidence).toHaveLength(4);
    expect(evidence.every((entry) => entry.sourceGovernedProviderZygionSemanticsSupplied === false)).toBe(true);
    expect(evidence.every((entry) => entry.independentlyValidatedProviderToZygionCorrespondenceSupplied === false)).toBe(true);
    expect(evidence.every((entry) => entry.providerSideSemanticValidationSupplied === false)).toBe(true);
  });

  it('preserves 234/454 only as the unordered FR195 candidate pair', () => {
    const candidate = FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196.candidatePair;
    expect(candidate.providerIndices).toEqual([234, 454]);
    expect(candidate.providerRole).toBe('bilateral_lateral_facial_width_proxy_candidate');
    expect(candidate.pairOrderHasSemanticMeaning).toBe(false);
    expect(candidate.inheritedFromFR195).toBe(true);
    expect(candidate.providerIndexAdmissionAuthorized).toBe(false);
    expect(candidate.providerSideAssignmentAuthorized).toBe(false);
  });

  it('records candidate evidence but keeps direct zygion validation unresolved', () => {
    const verdict = FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196.verdict;
    expect(verdict.authorityAcquisitionVerdict).toBe('candidate_evidence_found_but_validation_insufficient');
    expect(verdict.peerReviewedProviderWidthCandidateEvidenceExists).toBe(true);
    expect(verdict.neutralZygionAnatomyEvidenceExists).toBe(true);
    expect(verdict.sourceGovernedZygionMappingFound).toBe(false);
    expect(verdict.independentProviderToZygionValidationFound).toBe(false);
    expect(verdict.providerToNeutralZygionCorrespondence).toBe('blocked');
  });

  it('rejects repository-search promotion into source-governed zygion mapping', () => {
    const drift = cloneAuthority() as unknown as {
      reviewedSearchScope: { repositoryWideZygionSemanticSearchFoundMapping: boolean };
    };
    drift.reviewedSearchScope.repositoryWideZygionSemanticSearchFoundMapping = true;
    expect(() => assertFaceReadingProviderZygionAuthorityAcquisitionFR196(
      drift as unknown as FaceReadingProviderZygionAuthorityAcquisitionFR196,
    )).toThrow('fr196_search_scope_drift_or_promotion');
  });

  it('rejects evidence promotion into independently validated correspondence', () => {
    const drift = cloneAuthority() as unknown as {
      evidence: Array<{ independentlyValidatedProviderToZygionCorrespondenceSupplied: boolean }>;
    };
    drift.evidence[2]!.independentlyValidatedProviderToZygionCorrespondenceSupplied = true;
    expect(() => assertFaceReadingProviderZygionAuthorityAcquisitionFR196(
      drift as unknown as FaceReadingProviderZygionAuthorityAcquisitionFR196,
    )).toThrow('fr196_evidence_drift_or_authority_promotion');
  });

  it('rejects conflation of neutral anatomy with provider-pair evidence', () => {
    const drift = cloneAuthority() as unknown as {
      evidence: Array<{ supportsProviderPairCandidate: boolean }>;
    };
    drift.evidence[3]!.supportsProviderPairCandidate = true;
    expect(() => assertFaceReadingProviderZygionAuthorityAcquisitionFR196(
      drift as unknown as FaceReadingProviderZygionAuthorityAcquisitionFR196,
    )).toThrow('fr196_evidence_scope_conflation');
  });

  it('rejects authority verdict promotion without new validation evidence', () => {
    const drift = cloneAuthority() as unknown as {
      verdict: {
        authorityAcquisitionVerdict: string;
        sourceGovernedZygionMappingFound: boolean;
        independentProviderToZygionValidationFound: boolean;
      };
    };
    drift.verdict.authorityAcquisitionVerdict = 'correspondence_authority_found';
    drift.verdict.sourceGovernedZygionMappingFound = true;
    drift.verdict.independentProviderToZygionValidationFound = true;
    expect(() => assertFaceReadingProviderZygionAuthorityAcquisitionFR196(
      drift as unknown as FaceReadingProviderZygionAuthorityAcquisitionFR196,
    )).toThrow('fr196_verdict_drift_or_authority_promotion');
  });

  it('rejects arbitrary provider pair drift or index admission', () => {
    const drift = cloneAuthority() as unknown as {
      candidatePair: {
        providerIndices: number[];
        providerIndexAdmissionAuthorized: boolean;
      };
    };
    drift.candidatePair.providerIndices[0] = 235;
    drift.candidatePair.providerIndexAdmissionAuthorized = true;
    expect(() => assertFaceReadingProviderZygionAuthorityAcquisitionFR196(
      drift as unknown as FaceReadingProviderZygionAuthorityAcquisitionFR196,
    )).toThrow('fr196_candidate_pair_drift_or_promotion');
  });

  it('keeps geometry, metrics, traditional projection, Production, and Commerce fail-closed', () => {
    expect(Object.values(
      FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196.authorityBoundary,
    ).every((flag) => flag === false)).toBe(true);

    const drift = cloneAuthority() as unknown as {
      authorityBoundary: {
        bizygomaticMetricAuthorized: boolean;
        cheekGeometryAuthorized: boolean;
        traditionalProjectionAuthorized: boolean;
        productionActivationAuthorized: boolean;
        commerceActivationAuthorized: boolean;
      };
    };
    drift.authorityBoundary.bizygomaticMetricAuthorized = true;
    drift.authorityBoundary.cheekGeometryAuthorized = true;
    drift.authorityBoundary.traditionalProjectionAuthorized = true;
    drift.authorityBoundary.productionActivationAuthorized = true;
    drift.authorityBoundary.commerceActivationAuthorized = true;
    expect(() => assertFaceReadingProviderZygionAuthorityAcquisitionFR196(
      drift as unknown as FaceReadingProviderZygionAuthorityAcquisitionFR196,
    )).toThrow('fr196_authority_widening');
  });

  it('requires issued artifacts for issued-authority validation', () => {
    const issued = issueFaceReadingProviderZygionAuthorityAcquisitionFR196();
    expect(assertIssuedFaceReadingProviderZygionAuthorityAcquisitionFR196(issued)).toBe(issued);
    expect(() => assertIssuedFaceReadingProviderZygionAuthorityAcquisitionFR196(
      FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196,
    )).toThrow('fr196_unissued_provider_zygion_authority_acquisition');
  });

  it('moves only to independent validation protocol definition', () => {
    expect(FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196.readiness.nextRequiredGate).toBe(
      'independent_provider_to_neutral_zygion_validation_protocol_definition',
    );
    expect(FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196.nextFrontier).toBe(
      'define_independent_provider_to_neutral_zygion_validation_protocol_before_any_provider_index_admission',
    );
  });
});
