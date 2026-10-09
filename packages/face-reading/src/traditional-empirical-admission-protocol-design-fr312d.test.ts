import { describe, expect, it } from 'vitest';
import {
  FR311Z_RESEARCH_CLOSURE_SUMMARY,
} from './traditional-static-research-closure-fr311z.js';
import {
  FR312C_DIRECT_RULE_EQUIVALENCE_STUDY,
} from './traditional-direct-rule-equivalence-study-fr312c.js';
import {
  FR312D_ADMISSION_SUMMARY,
  FR312D_AUTHORITY_BOUNDARY,
  FR312D_EMPIRICAL_ADMISSION_MATRIX,
  FR312D_EXPANDED_STATIC_ADMISSION,
  FR312D_LEGACY_ADMISSION,
  FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL,
  assertEmpiricalAdmissionProtocolDesignFR312D,
} from './traditional-empirical-admission-protocol-design-fr312d.js';

describe('FR312D empirical admission protocol design', () => {
  it('requires FR311Z research closure before any admission design is valid', () => {
    expect(FR311Z_RESEARCH_CLOSURE_SUMMARY).toMatchObject({
      totalExpandedStaticTargets: 46,
      totalResearchClosures: 46,
      unresolvedResearchTargets: 0,
    });
    expect(() => assertEmpiricalAdmissionProtocolDesignFR312D()).not.toThrow();
  });

  it('covers the full 114-target admission universe exactly once', () => {
    expect(FR312D_LEGACY_ADMISSION).toHaveLength(68);
    expect(FR312D_EXPANDED_STATIC_ADMISSION).toHaveLength(46);
    expect(FR312D_EMPIRICAL_ADMISSION_MATRIX).toHaveLength(114);

    const ids = FR312D_EMPIRICAL_ADMISSION_MATRIX
      .map((item) => item.admissionId);
    expect(new Set(ids).size).toBe(114);
  });

  it('admits only the ten legacy morphology candidates to pilot design', () => {
    const expected = FR312C_DIRECT_RULE_EQUIVALENCE_STUDY
      .filter((item) => item.researchReadiness === 'empirical_protocol_candidate')
      .map((item) => item.ruleId)
      .sort();

    expect(expected).toHaveLength(10);
    expect(
      FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL.candidateRuleIds,
    ).toEqual(expected);

    expect(
      FR312D_EXPANDED_STATIC_ADMISSION
        .filter((item) => item.morphologyOnlyPilotEligible),
    ).toHaveLength(0);
  });

  it('freezes the current admission distribution', () => {
    expect(FR312D_ADMISSION_SUMMARY).toMatchObject({
      legacyTargets: 68,
      expandedStaticTargets: 46,
      totalAdmissionTargets: 114,

      morphologyOnlyPilotCandidates: 10,
      legacyConstructDefinitionBlocked: 18,
      totalAdditionalExtractorBlocked: 36,
      legacySourceDefinitionBlocked: 16,
      legacyManualOnly: 3,

      expandedRegisteredSurfaceNotMaterialized: 3,
      expandedSourceToVisibleEquivalenceBlocked: 0,
      expandedOutsideV1StaticGeometry: 1,
      expandedOrdinaryRgbSkeletalProxyRejected: 3,
      expandedRegionMapOperationalizationBlocked: 17,
      expandedCaptureScopeBlocked: 4,
      expandedManualOnlyFinal: 1,
      expandedSemanticOnlyFinal: 2,
      expandedImmediatePilotCandidates: 0,

      empiricalExecutionStartedTargets: 0,
      semanticClaimValidationsAuthorized: 0,
      thresholdDiscoveriesAuthorized: 0,
      thresholdValuesAuthorized: 0,
      populationNormsAuthorized: 0,
      automaticTraditionalBindingsAuthorized: 0,
      productInterpretationsAuthorized: 0,
    });
  });

  it('makes every non-pilot admission fail closed with an explicit reason', () => {
    for (const item of FR312D_EMPIRICAL_ADMISSION_MATRIX) {
      if (item.morphologyOnlyPilotEligible) {
        expect(item.blockingReasons, item.targetId).toHaveLength(0);
      } else {
        expect(
          item.blockingReasons.length,
          item.targetId,
        ).toBeGreaterThan(0);
      }
    }
  });

  it('keeps semantic claims hidden from the morphology annotation design', () => {
    const pilot = FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL;

    expect(pilot.annotationContract)
      .toBe('source_bounded_morphology_predicate_only');
    expect(pilot.semanticClaimVisibleToAnnotator).toBe(false);
    expect(pilot.neutralMetricVisibleToAnnotator).toBe(false);
    expect(pilot.productOutcomeVisibleToAnnotator).toBe(false);
    expect(pilot.requiredPartitions).toEqual([
      'development',
      'calibration',
      'holdout',
    ]);
  });

  it('does not authorize threshold discovery, sampling rules, or acceptance cutoffs', () => {
    const pilot = FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL;

    expect(pilot.partitionRatiosAuthorized).toBe(false);
    expect(pilot.participantSamplingRuleAuthorized).toBe(false);
    expect(pilot.thresholdDiscoveryAuthorized).toBe(false);
    expect(pilot.thresholdValueAuthorized).toBe(false);
    expect(pilot.minimumAcceptanceValuesAuthorized).toBe(false);
    expect(pilot.empiricalExecutionStarted).toBe(false);
    expect(pilot.productionPromotionRequiresSeparateReview).toBe(true);
  });

  it('keeps every semantic and production authority gate closed', () => {
    for (const item of FR312D_EMPIRICAL_ADMISSION_MATRIX) {
      expect(item.empiricalExecutionStarted, item.targetId).toBe(false);
      expect(item.semanticClaimValidationAuthorized, item.targetId).toBe(false);
      expect(item.thresholdDiscoveryAuthorizedByThisStage, item.targetId)
        .toBe(false);
      expect(item.thresholdValueAuthorized, item.targetId).toBe(false);
      expect(item.populationNormAuthorized, item.targetId).toBe(false);
      expect(item.automaticTraditionalBindingAuthorized, item.targetId)
        .toBe(false);
      expect(item.providerLandmarkDirectBindingAuthorized, item.targetId)
        .toBe(false);
      expect(item.productInterpretationAuthorized, item.targetId).toBe(false);
      expect(item.modernScientificFactAuthorized, item.targetId).toBe(false);
    }

    for (const [key, value] of Object.entries(FR312D_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
