import { describe, expect, it } from 'vitest';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import { FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS } from './eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.js';
import { FR187_NEXT_FRONTIER } from './eye-pair-xi-chang-blinded-expert-operationalization-protocol-fr187.js';
import {
  assertFR188AuthorityBoundary,
  assertFR188CaptureProtocol,
  assertFR188SplitPolicy,
  assertIssuedEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188,
  FR188_CAPTURE_PROTOCOL,
  FR188_NEXT_FRONTIER,
  FR188_SPLIT_POLICY,
  FR188_UNRESOLVED_SUPPORT_REQUIREMENTS,
  FR188_VERDICT,
  issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188,
  type EyePairXiChangRepeatCaptureDatasetSplitProtocolFR188V1,
  type FR188AuthorityBoundaryV1,
  type FR188CaptureProtocolV1,
  type FR188SplitPolicyV1,
} from './eye-pair-xi-chang-repeat-capture-dataset-split-protocol-fr188.js';

const forged = Object.freeze({}) as unknown as EyePairXiChangRepeatCaptureDatasetSplitProtocolFR188V1;

describe('FR188 repeat-capture and dataset-split protocol', () => {
  it('consumes the exact FR187 frontier and defines protocol only', () => {
    const result = issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188();
    expect(FR187_NEXT_FRONTIER).toBe('define_governed_xi_chang_repeat_capture_and_dataset_split_protocol_before_any_evidence_collection_directionality_or_calibration');
    expect(result.captureProtocol).toBe(FR188_CAPTURE_PROTOCOL);
    expect(result.captureProtocol.sessionsPerParticipant).toBe(2);
    expect(result.captureProtocol.acceptedCapturesPerSession).toBe(2);
    expect(result.captureProtocol.independentRecaptureRequired).toBe(true);
    expect(result.authorityBoundary.evidenceCollectionAuthorized).toBe(false);
    expect(result.authorityBoundary.repeatCaptureStabilityEvidenceIssued).toBe(false);
  });

  it('rejects weakened capture protocol', () => {
    const invalid = [
      { ...FR188_CAPTURE_PROTOCOL, sessionsPerParticipant: 1 },
      { ...FR188_CAPTURE_PROTOCOL, acceptedCapturesPerSession: 0 },
      { ...FR188_CAPTURE_PROTOCOL, independentRecaptureRequired: false },
      { ...FR188_CAPTURE_PROTOCOL, postHocMutationAuthorized: true },
      { ...FR188_CAPTURE_PROTOCOL, executionAuthorized: true },
    ] as unknown as FR188CaptureProtocolV1[];
    for (const value of invalid) expect(() => assertFR188CaptureProtocol(value)).toThrow(/weakening|widening/u);
  });

  it('freezes split isolation and rejects leakage permissions', () => {
    expect(FR188_SPLIT_POLICY.partitions).toEqual(['selection', 'holdout']);
    expect(FR188_SPLIT_POLICY.participantLeakageAllowed).toBe(false);
    expect(FR188_SPLIT_POLICY.captureFamilyLeakageAllowed).toBe(false);
    expect(FR188_SPLIT_POLICY.thresholdSelectionMayReadHoldout).toBe(false);
    expect(FR188_SPLIT_POLICY.finalEvaluationMayReadSelectionLabels).toBe(false);
    const invalid = [
      { ...FR188_SPLIT_POLICY, partitions: ['selection'] },
      { ...FR188_SPLIT_POLICY, participantLeakageAllowed: true },
      { ...FR188_SPLIT_POLICY, captureFamilyLeakageAllowed: true },
      { ...FR188_SPLIT_POLICY, thresholdSelectionMayReadHoldout: true },
      { ...FR188_SPLIT_POLICY, finalEvaluationMayReadSelectionLabels: true },
      { ...FR188_SPLIT_POLICY, postHocReassignmentAuthorized: true },
    ] as unknown as FR188SplitPolicyV1[];
    for (const value of invalid) expect(() => assertFR188SplitPolicy(value)).toThrow(/weakening|mutation/u);
  });

  it('keeps support and evidence prerequisites unresolved', () => {
    const result = issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188();
    expect(result.unresolvedSupportRequirements).toBe(FR188_UNRESOLVED_SUPPORT_REQUIREMENTS);
    expect(result.remainingUnsatisfiedMappingEvidenceRequirements).toBe(FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS);
    expect(result.remainingUnsatisfiedMappingEvidenceRequirements).toContain('repeat_capture_stability');
    expect(result.remainingBlockers).toBe(FR183_REMAINING_BLOCKERS);
    expect(result.remainingBlockers).toHaveLength(13);
  });

  it('rejects semantic, calibration, study, and Production widening', () => {
    const base = issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188().authorityBoundary;
    const invalid = [
      { ...base, supportAuthorityIssued: true },
      { ...base, studyProtocolIssued: true },
      { ...base, evidenceCollectionAuthorized: true },
      { ...base, mappingAuthorized: true },
      { ...base, directionalityAuthorized: true },
      { ...base, calibrationAuthorized: true },
      { ...base, productionRuleAuthorized: true },
    ] as unknown as FR188AuthorityBoundaryV1[];
    for (const value of invalid) expect(() => assertFR188AuthorityBoundary(value)).toThrow(/widening/u);
  });

  it('issues the governed artifact and advances to support authority', () => {
    const result = issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188();
    expect(result.verdict).toBe(FR188_VERDICT);
    expect(result.nextFrontier).toBe(FR188_NEXT_FRONTIER);
    expect(FR188_NEXT_FRONTIER).toBe('define_governed_xi_chang_capture_quality_and_review_artifact_retention_support_before_study_registration_or_evidence_collection');
    expect(() => assertIssuedEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188(result)).not.toThrow();
    expect(() => assertIssuedEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188(forged)).toThrow(/not issued/u);
  });
});
