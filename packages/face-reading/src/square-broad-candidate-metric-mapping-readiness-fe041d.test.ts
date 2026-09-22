import { describe, expect, it } from 'vitest';
import {
  assertIssuedSquareBroadCandidateMetricMappingReadinessFE041D,
  issueSquareBroadCandidateMetricMappingReadinessFE041D,
} from './square-broad-candidate-metric-mapping-readiness-fe041d.js';

describe('FE041D candidate metric mapping readiness', () => {
  it('proves exact FE035B canonical overlap is zero', () => {
    const result = issueSquareBroadCandidateMetricMappingReadinessFE041D();
    assertIssuedSquareBroadCandidateMetricMappingReadinessFE041D(result);
    expect(result.candidateMetricRefs).toHaveLength(3);
    expect(result.canonicalRegistryMetricCount).toBe(13);
    expect(result.canonicalRegistryIntersection).toEqual([]);
    expect(result.mappingDecision.traditionalFangBindingAuthorized).toBe(false);
  });
  it('keeps semantic promotion and calibration closed', () => {
    const result = issueSquareBroadCandidateMetricMappingReadinessFE041D();
    expect(result.candidateEvidence.constructValidityEstablished).toBe(false);
    expect(result.authorityBoundary).toMatchObject({
      empiricalSemanticEvidenceAdmitted: false,
      calibrationAuthorityIssued: false,
      numericThresholdAuthorityIssued: false,
      deterministicCriterionStateIssued: false,
      structuredClaimIssued: false,
      narrativeAuthorityIssued: false,
      productionSemanticExecutionAuthorized: false,
    });
  });
  it('rejects structural clones as issued authority', () => {
    const result = issueSquareBroadCandidateMetricMappingReadinessFE041D();
    expect(() => assertIssuedSquareBroadCandidateMetricMappingReadinessFE041D(
      JSON.parse(JSON.stringify(result)),
    )).toThrow();
  });
});
