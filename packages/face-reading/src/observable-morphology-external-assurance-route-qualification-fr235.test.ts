import { describe, expect, it } from 'vitest';
import {
  FR235_OFFICIAL_SOURCES,
  assertExternalAssuranceRouteQualificationFR235,
  qualifyExternalAssuranceRoutesFR235,
} from './observable-morphology-external-assurance-route-qualification-fr235.js';

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('FR235 external assurance route qualification', () => {
  it('selects AI+ for system-level inquiry and ISO 42001 for governance without claiming interpretation validity', () => {
    const result = qualifyExternalAssuranceRoutesFR235();

    expect(result.routes.productServiceQuality.scheme).toBe('KSA AI+ certification');
    expect(result.routes.productServiceQuality.targetIncludesAiSoftwareServicesAndIctProducts).toBe(true);
    expect(result.routes.productServiceQuality.productTestingReferencesISOIEC25059And25051).toBe(true);
    expect(result.routes.productServiceQuality.eligibilityForMyeongHaConfirmed).toBe(false);
    expect(result.routes.productServiceQuality.certifiesPhysiognomyTruth).toBe(false);
    expect(result.routes.productServiceQuality.certifiesInterpretationAccuracy).toBe(false);

    expect(result.routes.aiGovernance.standard).toBe('ISO/IEC 42001:2023');
    expect(result.routes.aiGovernance.candidateCertificationBodies).toEqual([
      {
        name: 'Korean Standards Association (KSA)',
        kabAccreditation: 'KAB-AI-02',
      },
      {
        name: 'Korean Foundation for Quality (KFQ)',
        kabAccreditation: 'KAB-AI-07',
      },
    ]);
    expect(result.routes.empiricalValidation.substitutedByAIPlus).toBe(false);
    expect(result.routes.empiricalValidation.substitutedByISO42001).toBe(false);
    expect(result.routes.processServiceConformity.applicableSchemeForMyeongHaConfirmed).toBe(false);
    expect(Object.values(result.authorityBoundary).every((entry) => entry === false)).toBe(true);
    expect(() => assertExternalAssuranceRouteQualificationFR235(result)).not.toThrow();
  });

  it('pins official route references rather than treating certification as already obtained', () => {
    expect(FR235_OFFICIAL_SOURCES.iso42001).toContain('iso.org');
    expect(FR235_OFFICIAL_SOURCES.kabKsa).toContain('kab.or.kr');
    expect(FR235_OFFICIAL_SOURCES.kabKfq).toContain('kab.or.kr');
    expect(FR235_OFFICIAL_SOURCES.ksaAiPlus).toContain('ksa.or.kr');
    expect(FR235_OFFICIAL_SOURCES.kolas17065).toContain('knab.go.kr');

    const result = qualifyExternalAssuranceRoutesFR235();
    expect(result.authorityBoundary.aiPlusCertified).toBe(false);
    expect(result.authorityBoundary.iso42001Certified).toBe(false);
    expect(result.authorityBoundary.externalAuditCompleted).toBe(false);
    expect(result.authorityBoundary.externalProductTestingCompleted).toBe(false);
  });

  it('rejects reconstructed route artifacts as active authority', () => {
    const result = qualifyExternalAssuranceRoutesFR235();
    expect(() => assertExternalAssuranceRouteQualificationFR235(
      persisted(result),
    )).toThrow(/active FR235 runtime/u);
  });
});
