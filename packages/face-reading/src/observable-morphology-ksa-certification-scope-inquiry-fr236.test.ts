import { describe, expect, it } from 'vitest';
import { qualifyExternalAssuranceRoutesFR235 } from './observable-morphology-external-assurance-route-qualification-fr235.js';
import {
  assertKsaCertificationScopeInquiryFR236,
  prepareKsaCertificationScopeInquiryFR236,
} from './observable-morphology-ksa-certification-scope-inquiry-fr236.js';

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('FR236 KSA certification scope inquiry package', () => {
  it('prepares a send-ready KSA inquiry without promoting certification authority', () => {
    const fr235 = qualifyExternalAssuranceRoutesFR235();
    const inquiry = prepareKsaCertificationScopeInquiryFR236(fr235);

    expect(inquiry.recipient.organization).toBe('Korean Standards Association (KSA)');
    expect(inquiry.recipient.email).toBe('aicert01@ksa.or.kr');
    expect(inquiry.subject).toContain('AI+');
    expect(inquiry.subject).toContain('ISO/IEC 42001');
    expect(inquiry.questions).toHaveLength(10);
    expect(Object.values(inquiry.nonClaims).every((entry) => entry === false)).toBe(true);
    expect(Object.values(inquiry.responseCapture).every((entry) => entry === 'unconfirmed')).toBe(true);
    expect(() => assertKsaCertificationScopeInquiryFR236(inquiry)).not.toThrow();
  });

  it('binds the inquiry to the active FR235 route qualification', () => {
    const fr235 = qualifyExternalAssuranceRoutesFR235();
    const inquiry = prepareKsaCertificationScopeInquiryFR236(fr235);

    expect(inquiry.sourceFR235QualificationRef).toBe(fr235.qualificationRef);
    expect(inquiry.sourceFR235QualificationDigest).toBe(fr235.qualificationDigest);
    expect(inquiry.packageRef).toMatch(/^evidence\.fr236\.ksa_certification_scope_inquiry:[0-9a-f]{64}$/u);
  });

  it('rejects reconstructed inquiry packages as active authority', () => {
    const fr235 = qualifyExternalAssuranceRoutesFR235();
    const inquiry = prepareKsaCertificationScopeInquiryFR236(fr235);

    expect(() => assertKsaCertificationScopeInquiryFR236(
      persisted(inquiry),
    )).toThrow(/active FR236 runtime/u);
  });
});
