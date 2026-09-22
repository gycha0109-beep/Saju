import { describe, expect, it } from 'vitest';
import {
  FE041B_AUTHORITY_SNAPSHOT_COMMIT,
  FE041B_SQUARE_BROAD_OPERATIONALIZATION_READINESS_VERSION,
  assertIssuedSquareBroadOperationalizationReadinessFE041B,
  assertSquareBroadOperationalizationReadinessFE041B,
  issueSquareBroadOperationalizationReadinessFE041B,
} from './square-broad-operationalization-readiness-fe041b.js';

describe('FE041B square-broad operationalization readiness', () => {
  it('publishes reviewed methodology while keeping operationalization closed', () => {
    const value = issueSquareBroadOperationalizationReadinessFE041B();

    expect(FE041B_AUTHORITY_SNAPSHOT_COMMIT)
      .toBe('50fd5b511326033861b3cab48028b989c4499b3c');
    expect(FE041B_SQUARE_BROAD_OPERATIONALIZATION_READINESS_VERSION)
      .toBe('FE041B-SQUARE-BROAD-OPERATIONALIZATION-READINESS-v1');
    expect(value.target).toMatchObject({
      criterionRef: 'criterion.intake.square_broad',
      sourceConcept: '方大',
      sourcePassageVerificationStatus: 'scan_checked',
      reviewedMethodologyRef:
        'method.shenxiang.five_officers.intake_criteria@0.3.0',
      methodologyReviewStatus: 'reviewed',
    });
    expect(value.operationalization).toEqual({
      state:
        'reviewed_methodology_present_operationalization_not_authorized',
      canonicalInputMetricRefs: [],
      classificationBands: null,
      numericThresholds: null,
      calibrationRef: null,
      ruleRef: null,
    });
    expect(value.authorityBoundary).toMatchObject({
      sourcePassageScanChecked: true,
      reviewedMethodologyAuthorityPresent: true,
      canonicalMetricBindingAuthorized: false,
      constructValidityEstablished: false,
      empiricalSemanticEvidenceAdmitted: false,
      calibrationAuthorityIssued: false,
      numericThresholdAuthorityIssued: false,
      classificationBandsIssued: false,
      deterministicCriterionStateIssued: false,
      ruleAuthorityIssued: false,
      structuredClaimIssued: false,
      narrativeAuthorityIssued: false,
      productionSemanticExecutionAuthorized: false,
    });
    expect(() =>
      assertIssuedSquareBroadOperationalizationReadinessFE041B(value),
    ).not.toThrow();
  });

  it('rejects semantic-authority widening', () => {
    const value = issueSquareBroadOperationalizationReadinessFE041B();
    const widened = JSON.parse(JSON.stringify(value));
    widened.authorityBoundary.canonicalMetricBindingAuthorized = true;

    expect(() =>
      assertSquareBroadOperationalizationReadinessFE041B(widened),
    ).toThrow(/authority boundary widened/);
  });

  it('rejects a structurally cloned artifact as issued authority', () => {
    const value = issueSquareBroadOperationalizationReadinessFE041B();
    const clone = JSON.parse(JSON.stringify(value));

    expect(() =>
      assertIssuedSquareBroadOperationalizationReadinessFE041B(clone),
    ).toThrow(/not issued/);
  });
});
