import { describe, expect, it } from 'vitest';
import { FaceLandmarker } from '@mediapipe/tasks-vision';
import {
  FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195,
  assertFaceReadingProviderZygionCorrespondenceAuditFR195,
  assertIssuedFaceReadingProviderZygionCorrespondenceAuditFR195,
  inspectMediaPipeProviderZygionCandidatePairFR195,
  issueFaceReadingProviderZygionCorrespondenceAuditFR195,
  type FaceReadingProviderZygionCorrespondenceAuditFR195,
} from './face-reading-cheek-mid-face-provider-correspondence-audit-fr195.js';

function cloneAuthority(): FaceReadingProviderZygionCorrespondenceAuditFR195 {
  return structuredClone(FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195) as FaceReadingProviderZygionCorrespondenceAuditFR195;
}

describe('FR195 provider-to-neutral zygion correspondence evidence audit', () => {
  it('pins one peer-reviewed provider-use evidence record without zygion promotion', () => {
    const authority = assertFaceReadingProviderZygionCorrespondenceAuditFR195(
      FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195,
    );
    expect(authority.evidence).toHaveLength(1);
    expect(authority.evidence[0].evidenceId).toBe('evidence.fr195.dat_2025_mediapipe_width_proxy');
    expect(authority.evidence[0].doi).toBe('10.3390/bioengineering12090975');
    expect(authority.evidence[0].pmcid).toBe('PMC12467118');
    expect(authority.evidence[0].providerPairUsed).toEqual([234, 454]);
    expect(authority.evidence[0].anthropometricZygionGroundTruthSupplied).toBe(false);
    expect(authority.evidence[0].providerToZygionValidationSupplied).toBe(false);
  });

  it('pins exactly one unordered provider candidate pair and admits no provider index', () => {
    const candidate = FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195.candidatePair;
    expect(candidate.providerIndices).toEqual([234, 454]);
    expect(candidate.providerRole).toBe('bilateral_lateral_facial_width_proxy_candidate');
    expect(candidate.pairOrderHasSemanticMeaning).toBe(false);
    expect(candidate.neutralZygionCorrespondenceEstablished).toBe(false);
    expect(candidate.anatomicalLeftRightAssignmentEstablished).toBe(false);
    expect(candidate.admittedProviderIndices).toEqual([]);
  });

  it('confirms release-exact face-oval membership only', () => {
    const inspection = inspectMediaPipeProviderZygionCandidatePairFR195(FaceLandmarker as unknown as object);
    expect(inspection.providerPair).toEqual([234, 454]);
    expect(inspection.firstPairMemberPresent).toBe(true);
    expect(inspection.secondPairMemberPresent).toBe(true);
    expect(inspection.bothPairMembersPresent).toBe(true);
    expect(inspection.pairOrderHasSemanticMeaning).toBe(false);
    expect(inspection.zygionCorrespondenceObserved).toBe(false);
    expect(inspection.providerSideSemanticsObserved).toBe(false);
  });

  it('keeps only provider membership and proxy-use gates satisfied', () => {
    expect(FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195.admissionGates.map((gate) => [gate.gateId, gate.state])).toEqual([
      ['release_exact_provider_pair_membership', 'satisfied'],
      ['peer_reviewed_facial_width_proxy_use', 'satisfied'],
      ['provider_to_neutral_zygion_correspondence', 'blocked'],
      ['provider_side_assignment', 'blocked'],
      ['cheek_boundary_correspondence', 'blocked'],
      ['deterministic_cheek_geometry', 'blocked'],
    ]);
  });

  it('rejects arbitrary provider pair drift', () => {
    const drift = cloneAuthority() as unknown as { candidatePair: { providerIndices: number[] } };
    drift.candidatePair.providerIndices[0] = 235;
    expect(() => assertFaceReadingProviderZygionCorrespondenceAuditFR195(drift as unknown as FaceReadingProviderZygionCorrespondenceAuditFR195)).toThrow('fr195_candidate_pair_drift_or_promotion');
  });

  it('rejects evidence promotion into zygion ground truth', () => {
    const drift = cloneAuthority() as unknown as {
      evidence: Array<{ anthropometricZygionGroundTruthSupplied: boolean; providerToZygionValidationSupplied: boolean }>;
    };
    drift.evidence[0]!.anthropometricZygionGroundTruthSupplied = true;
    drift.evidence[0]!.providerToZygionValidationSupplied = true;
    expect(() => assertFaceReadingProviderZygionCorrespondenceAuditFR195(drift as unknown as FaceReadingProviderZygionCorrespondenceAuditFR195)).toThrow('fr195_evidence_drift_or_authority_widening');
  });

  it('rejects provider side assignment and index admission', () => {
    const drift = cloneAuthority() as unknown as {
      candidatePair: { anatomicalLeftRightAssignmentEstablished: boolean; admittedProviderIndices: number[] };
    };
    drift.candidatePair.anatomicalLeftRightAssignmentEstablished = true;
    drift.candidatePair.admittedProviderIndices.push(234);
    expect(() => assertFaceReadingProviderZygionCorrespondenceAuditFR195(drift as unknown as FaceReadingProviderZygionCorrespondenceAuditFR195)).toThrow('fr195_candidate_pair_drift_or_promotion');
  });

  it('keeps every authority-widening path fail-closed', () => {
    expect(Object.values(FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195.authorityBoundary).every((flag) => flag === false)).toBe(true);
  });

  it('rejects Production, traditional, or cheek metric widening', () => {
    const drift = cloneAuthority() as unknown as {
      authorityBoundary: {
        cheekMetricAuthorized: boolean;
        traditionalProjectionAuthorized: boolean;
        productionActivationAuthorized: boolean;
      };
    };
    drift.authorityBoundary.cheekMetricAuthorized = true;
    drift.authorityBoundary.traditionalProjectionAuthorized = true;
    drift.authorityBoundary.productionActivationAuthorized = true;
    expect(() => assertFaceReadingProviderZygionCorrespondenceAuditFR195(drift as unknown as FaceReadingProviderZygionCorrespondenceAuditFR195)).toThrow('fr195_authority_widening');
  });

  it('requires issued artifacts for issued-authority validation', () => {
    const issued = issueFaceReadingProviderZygionCorrespondenceAuditFR195();
    expect(assertIssuedFaceReadingProviderZygionCorrespondenceAuditFR195(issued)).toBe(issued);
    expect(() => assertIssuedFaceReadingProviderZygionCorrespondenceAuditFR195(FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195)).toThrow('fr195_unissued_provider_zygion_correspondence_audit');
  });

  it('pins the next gate to direct correspondence validation before index admission', () => {
    expect(FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195.readiness.nextRequiredGate).toBe(
      'direct_provider_to_neutral_zygion_correspondence_validation',
    );
    expect(FACE_READING_PROVIDER_ZYGION_CORRESPONDENCE_AUDIT_FR195.nextFrontier).toBe(
      'obtain_source_governed_or_independently_validated_provider_to_zygion_correspondence_before_any_provider_index_admission',
    );
  });
});
