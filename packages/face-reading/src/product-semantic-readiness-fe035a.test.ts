import { describe, expect, it } from 'vitest';
import {
  FACE_PRODUCT_SEMANTIC_READINESS_VERSION_FE035A,
  assessFaceProductSemanticReadinessFE035A,
} from './product-semantic-readiness-fe035a.js';

describe('FE035A product semantic readiness', () => {
  it('fails closed while traditional semantic execution authority is absent', () => {
    const result = assessFaceProductSemanticReadinessFE035A();

    expect(result).toEqual({
      schemaVersion: 'fe035a-face-product-semantic-readiness-v1',
      contractVersion: FACE_PRODUCT_SEMANTIC_READINESS_VERSION_FE035A,
      status: 'blocked',
      observationRuntimeReady: true,
      semanticRuntimeReady: false,
      interpretationAllowed: false,
      evidence: {
        mouthAdmissionSchemaVersion:
          'fr122-five-officers-intake-mouth-semantic-execution-admission-v1',
        mouthMethodologyReviewStatus: 'research',
        mouthWitnessVerificationStatus: 'scan_checked',
        executableCriterionId: null,
        machineCriterionStatesIssued: 0,
        structuredClaimsIssued: 0,
        boundedNarrativesIssued: 0,
        traditionalSemanticAuthority: false,
        masterRegionContractVersion:
          'FR192-MASTER-REGION-COVERAGE-SKELETON-v1',
        productionAuthorizedTraditionalSystems: 0,
      },
      blockers: [
        'no_production_authorized_traditional_methodology',
        'no_authoritative_machine_criterion_state',
        'no_structured_claim_authority',
        'no_bounded_narrative_authority',
        'traditional_region_coverage_not_production_authorized',
      ],
      authorityBoundary: {
        issuesTraditionalClaim: false,
        issuesConsumerNarrative: false,
        convertsNeutralMetricToTraditionalMeaning: false,
        inventsThresholdOrCalibration: false,
        ranksTraditionalRegions: false,
        allowsLlmSemanticInference: false,
        widensPreviewEnginePublicExport: false,
      },
      nextFrontier:
        'square_broad_metric_to_source_operationalization_and_calibration_authority',
    });
  });

  it('returns the same immutable readiness artifact', () => {
    const first = assessFaceProductSemanticReadinessFE035A();
    const second = assessFaceProductSemanticReadinessFE035A();

    expect(second).toBe(first);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.evidence)).toBe(true);
    expect(Object.isFrozen(first.blockers)).toBe(true);
    expect(Object.isFrozen(first.authorityBoundary)).toBe(true);
  });

  it('contains no traditional claim or consumer prose fields', () => {
    const serialized = JSON.stringify(assessFaceProductSemanticReadinessFE035A());

    expect(serialized).not.toContain('headline');
    expect(serialized).not.toContain('narrativeText');
    expect(serialized).not.toContain('claimValue');
    expect(serialized).not.toContain('fortuneScore');
  });
});
