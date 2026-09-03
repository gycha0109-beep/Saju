import { describe, expect, it } from 'vitest';
import { FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0 } from './five-officers-six-fus-research-v0.js';
import { FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101 } from './lips-substantial-role-free-separation-construct-validity-protocol-review-fr101.js';
import {
  assertIssuedLipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102,
  reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102,
} from './lips-substantial-construct-validity-collection-authorization-gate-review-fr102.js';

describe('FR102 collection authorization gate authority hardening', () => {
  it('rejects a lookalike artifact that was not issued by FR102', () => {
    const issued = reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102();
    const lookalike = { ...issued };

    expect(() =>
      assertIssuedLipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102(lookalike),
    ).toThrow(/FR-102 artifact is not an issued FR-102 review/u);
  });

  it('confirms the active Five Officers source and methodology remain below collection gates', () => {
    const source = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.find(
      (item) => item.passageId === 'passage.shenxiang.five_officers.intake',
    );
    const method = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies.find(
      (item) => `${item.methodologyId}@${item.version}` === 'method.shenxiang.five_officers@0.1.0',
    );

    expect(source?.verificationStatus).toBe('unverified_ocr');
    expect(method?.reviewStatus).toBe('research');
  });

  it('does not infer protocol review from the existence of materialized FR101 definitions', () => {
    const registry = FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101;
    const statuses = [
      ...registry.captureProtocols.map((item) => item.status),
      ...registry.labelingProtocols.map((item) => item.status),
      ...registry.splitPolicies.map((item) => item.status),
      ...registry.supportArtifacts.map((item) => item.status),
    ];

    expect(statuses.length).toBe(6);
    expect(statuses.every((status) => status === 'research')).toBe(true);
    expect(registry.studies).toHaveLength(1);
    expect(registry.studies[0]?.executionState).toBe('blocked');
  });

  it('keeps scan-image acquisition distinct from scan-checked source authority', () => {
    const review = reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102();

    expect(review.nextExternalAuthorityRemediation.acquisitionResearchAuthorized).toBe(true);
    expect(review.nextExternalAuthorityRemediation.sourceAcquisitionMeansScanChecked).toBe(false);
    expect(review.nextExternalAuthorityRemediation.exactScanPageCurrentlyAuthorized).toBe(false);
    expect(review.nextExternalAuthorityRemediation.visualPassageMatchCurrentlyConfirmed).toBe(false);
    expect(review.authorityBoundary.scanImageRequirementsMeanScanImageEvidenceExists).toBe(false);
    expect(review.authorityBoundary.sourceScanCheckedMeansTraditionalBindingAutomaticallyValid).toBe(false);
  });

  it('keeps all downstream semantic authority closed after the gate review', () => {
    const review = reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102();

    expect(Object.values(review.authorityBoundary).every((value) => value === false)).toBe(true);
    expect(review.humanDataCollectionAuthorized).toBe(false);
    expect(review.constructValidityEvidenceIssued).toBe(0);
    expect(review.thresholdRefsIssued).toBe(0);
    expect(review.traditionalMetricBindingsIssued).toBe(0);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
  });
});
